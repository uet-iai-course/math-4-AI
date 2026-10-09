> Ngày 2026-10-10: bản ghi chú này đã thay thế `materials/lec-03/lecture-note.md` cũ theo yêu cầu người dùng; thư mục `lec-03b` bị gỡ và nhật ký được chuyển về đây. Các đường dẫn `lec-03b` dưới đây là đường dẫn tại thời điểm rà soát.

# Nhật ký rà soát Bài 03b — ghi chú bài giảng viết lại theo tiêu chuẩn giáo trình

Tệp sản phẩm: `materials/lec-03b/lecture-note.md` (tệp mới, để so sánh với `materials/lec-03/lecture-note.md`). Bộ trang chiếu, `materials/lec-03/*` và `exercises.md` không bị sửa. Bản đóng gói `material-local-data.js` được cập nhật bằng `scripts/sync-local-materials.py`. Chưa commit.

## Tác tử

| Vai | Loại tác tử | Mô hình | Effort | Ghi chú |
|---|---|---|---|---|
| Soạn (authoring), lượt 1 | general-purpose | Claude Opus 5.5 (`claude-opus-5-5`) | high | Theo brief của điều phối viên ngày 2026-10-09 và yêu cầu bổ sung "Trình bày sáng sủa" gửi giữa lượt; tác tử tự ghi dòng này, điều phối viên đối chiếu với lời gọi công cụ. |
| Rà toán (math accuracy), lượt 1 | general-purpose | Claude Opus 5.5 (`claude-opus-5-5`) | high | Theo ghi nhận của điều phối viên; chỉ đọc. |
| Rà mạch truyện (storyline), lượt 1 | general-purpose | Claude Opus 5.5 (`claude-opus-5-5`) | high | Theo ghi nhận của điều phối viên; chỉ đọc. |
| Chỉnh sửa (editor), lượt 2 | general-purpose (cùng tác tử soạn, tiếp tục qua SendMessage) | Claude Opus 5.5 (`claude-opus-5-5`) | high | Áp dụng quyết định "yêu cầu sửa" lượt 1 của điều phối viên. |
| Rà toán, rà lại lượt 2 | general-purpose (tiếp tục qua SendMessage) | Claude Opus 5.5 (`claude-opus-5-5`) | high | Theo ghi nhận của điều phối viên; chỉ đọc. |
| Rà mạch truyện, rà lại lượt 2 | general-purpose (tiếp tục qua SendMessage) | Claude Opus 5.5 (`claude-opus-5-5`) | high | Theo ghi nhận của điều phối viên; chỉ đọc. |
| Chỉnh sửa nhẹ, lượt 3 | general-purpose (cùng tác tử, tiếp tục qua SendMessage) | Claude Opus 5.5 (`claude-opus-5-5`) | high | Áp dụng 10 mục của quyết định lượt 2. |

Kỹ năng `no-ai-slop` được nạp bằng công cụ `Skill` (chế độ Edit) trước khi soạn; tự đối chiếu `eval.md` ở mục "Tự kiểm `no-ai-slop`".

## Quyết định của điều phối viên

| Lượt | Đầu ra | Quyết định | Lý do |
|---|---|---|---|
| 1 | Bản soạn 27 595 từ (`wc -w`), 131 khối | yêu cầu sửa | Ba phát hiện nghiêm trọng (A1–A3) và các phát hiện trung bình B4–B11, C12–C15 hợp nhất từ báo cáo rà toán và rà mạch truyện; xem bảng "Phát hiện lượt 1". |
| 2 | Bản chỉnh sửa 28 849 từ, 131 khối | chấp nhận sau sửa nhẹ | Mọi phát hiện nghiêm trọng đã đóng; còn các mục trung bình và nhẹ của bảng "Phát hiện lượt 2". |
| 3 | Bản sửa nhẹ (tệp hiện tại), 29 125 từ, 131 khối | chờ điều phối viên | Xem bảng "Phát hiện lượt 2" và kiểm tra kỹ thuật lượt 3. |

Các quyết định đi kèm lượt 1 của điều phối viên:

1. Giữ chứng minh Bổ đề 03.14 (số cũ 03.15), tách hai tập lồi dạng yếu.
2. Bài giao chính thức bị giải sẵn một phần trong ghi chú được chấp nhận, cùng loại với quyết định 2 của Bài 02b, vì `exercises.md` dựng từ ví dụ xuyên suốt của bộ trang chiếu: bài 1 (ý 4 và ý 6: phản ví dụ hoạt động mà nhân tử bằng 0 đã đổi dữ liệu; $p^*(1)=12-6\sqrt2$ ở Ví dụ 03.14 và Nhận xét 03.25 giữ), bài 3 một phần (cấu trúc nhân tử đẳng thức âm), bài 5 một phần (hai đường đỡ của Ví dụ 03.12). Bài 7 đã được tránh bằng cách đổi dữ liệu Ví dụ 03.18 sang $x_1+2x_2\ge5$.
3. Thứ tự lệch giáo trình được giữ có chủ ý: độ nhạy đặt trước KKT, vì nhân tử được đọc như hệ số góc của đường đỡ ngay trong Mục 4; trực giác Slater đặt trước định nghĩa theo hành trình khái niệm.
4. Lệch ký hiệu với bộ trang chiếu ($r$ hay $p$ cho số đẳng thức, $w$ hay $q$ cho pháp tuyến tách, $\rho$ cho hệ số phạt, $z_i$ cho đặc trưng): trạng thái "chờ sửa deck".

## Phát hiện lượt 1 và cách xử lý

Hai báo cáo (rà toán, rà mạch truyện) được điều phối viên hợp nhất thành các mục A–C. Vị trí ghi theo nội dung và số hiệu cũ. Không xóa phát hiện nào.

| # | Mức độ | Vị trí (số cũ) | Vấn đề | Quyết định | Trạng thái |
|---|---|---|---|---|---|
| A1 | nghiêm trọng | "Trong học máy" Mục 3; mục "Ứng dụng" | Với mạng sâu, giá trị từ một cực tiểu địa phương là ước lượng trên của $g(\lambda)$, không phải cận dưới của $p^*$ | Viết lại: Định lý 03.8 vẫn đúng nhưng $g(\lambda)$ không tính được; $L(\theta_k,\lambda)\ge g(\lambda)$ không phải cận dưới đã chứng nhận | đã sửa |
| A2 | nghiêm trọng | Sau Mệnh đề 03.23 | "theo nghĩa xấp xỉ bậc nhất" sai: (4.2) chính xác | Hai kết luận chính xác thành danh sách; nêu (4.2) không cho mức giảm tối thiểu; đạo hàm là nội dung Hệ quả 03.24 | đã sửa |
| A3 | nghiêm trọng | Ví dụ 03.18(a); Nhận xét 03.28; Nhận xét 03.25 | Ví dụ 03.18(a) giải trọn bài 7 của `exercises.md`; Nhận xét 03.28 trùng bài 1(4); Nhận xét 03.25 trùng bài 1(6) | Ví dụ 03.18 đổi sang $\min x_1^2+x_2^2$, $x_1+2x_2\ge5$: $\lambda=2$, $x=(1,2)$, $p^*=5$, $g=5\lambda-\tfrac54\lambda^2$; phần (b) $x_1+2x_2=5$: $\nu=-2$. Nhận xét 03.28 đổi sang $\min(x-1)^2$, $x\le1$. Nhận xét 03.25 giữ theo quyết định 2 | đã sửa |
| B4 | trung bình | Mệnh đề 03.36 | "khi và chỉ khi" chỉ chứng minh một chiều; viện dẫn 02.39(b) cần giả thiết hai nhãn | Thêm Bước 6 chiều ngược (β, ξ, ba trường hợp $m_i$, Định lý 03.32); bỏ viện dẫn 02.39(b) khỏi chứng minh; Kiến thức tiên quyết ghi giả thiết hai nhãn cho sự tồn tại | đã sửa |
| B5 | trung bình | Ví dụ 03.7 | Dẫn nguồn sai cách: B&V đưa $x_i(1-x_i)=0$ vào ràng buộc; câu mảnh | Ghi rõ hai cách viết và Bài tập 5.13(b) cho cùng cận; viết lại câu | đã sửa |
| B6 | trung bình | Nhận xét 03.37 | Hàm hạt nhân không có trong B&V 8.6.1; tiêu đề "hai nhầm lẫn" không khớp | Giữ 8.6.1 ở câu dẫn Mệnh đề 03.36; hạt nhân ghi "ngoài phạm vi" không kèm nguồn; tiêu đề "Ba điểm về vector hỗ trợ và hệ số $\rho$", danh sách | đã sửa |
| B7 | trung bình | Kết chương | Bài 05 không cập nhật nhân tử | Bài 05: bài không ràng buộc hoặc có phạt quy mô lớn; Bài 04: hệ tuyến tính như Ví dụ 03.18(b) | đã sửa |
| B8 | trung bình | Sau Mệnh đề 03.34 | Quy cho Mệnh đề 02.45 nội dung không có | "Khi miền không lồi như Mệnh đề 02.45, Mệnh đề 03.34 không áp dụng" | đã sửa |
| B9 | trung bình | Mệnh đề 03.35 | Dùng $\lambda$ thay $\rho$; hệ số 2 giữa hai cách viết; căn cứ duy nhất | Đổi sang $\rho$; đoạn dẫn nêu nhân tử không có ½ bằng hai lần nhân tử có ½; câu giải thích chuyển lên trước; Bước 1 dẫn Định lý 01.30(b), 01.35 | đã sửa |
| B10 | trung bình | Tình huống 03.2; Ví dụ 03.5 | $u$ trùng ký hiệu mức ràng buộc; "(2.1) của Bài 02" | Đặc trưng đổi thành $s$; "bài pha trộn của Ví dụ 02.5, có nghiệm ở Ví dụ 02.7" | đã sửa |
| B11 | trung bình | Nhiều chỗ | Thuật toán 03.1 thiếu lý do nhân tử; tiếp xúc và đối ngẫu mạnh; câu dẫn; Rudin; nguồn tr. 218; Ví dụ 03.8; Nhận xét 03.7; nghiệm khi bỏ mẫu; Bài tập 03.16(c), 03.15; alt hình; ràng buộc hộp | Thuật toán dùng $\lambda_{\mathrm{lo}},\lambda_{\mathrm{hi}}$ và Mệnh đề 03.27 phần 3; "đối ngẫu mạnh có nghiệm đối ngẫu là sự tiếp xúc"; câu dẫn khớp chứng minh; Rudin Định nghĩa 2.32 và Định lý 2.41; Ví dụ 03.8 "vi phạm Slater theo phiên bản miền tổng quát, tr. 226"; phần (b) Định lý 03.15 ghi dẫn không chứng minh; Nhận xét 03.7 tách ý và viết đẳng thức $x_i^2=1$ thành hai bất đẳng thức; "nghiệm cũ vẫn là nghiệm, $w$ không đổi"; 03.16(c) thêm chiều cần; 03.15 đổi sang $k=3$, $a=(0,1,2)$, $m=\tfrac47$; alt "parabol mở theo hướng chéo lên phải"; "bài đối ngẫu $N$ biến với ràng buộc hộp" | đã sửa |
| C12 | trung bình | Chứng minh và lời giải | Trình bày sáng sủa: bước có nhãn, chuỗi trong `aligned`, nhãn giai đoạn, nhánh thành danh sách, công thức dài ra `$$`, Định nghĩa 03.1 ba dòng | Áp dụng đủ; Mệnh đề 03.36 Kết luận dùng (5.3) | đã sửa |
| C13 | trung bình | Mạch truyện | Nhận xét 03.13 dẫn ví dụ chưa có; §3.2 nhắc đường cận thẳng đứng; §6 mở bằng danh sách; thiếu "Trong học máy" sau 03.20, 03.27; thiếu bài đọc hình và khoảng của cặp | Nhận xét chuyển xuống sau Ví dụ 03.11 (số mới 03.16); §3.2 chỉ giữ trực giác; §6 mở bằng bài chiếu; thêm hai đoạn "Trong học máy"; Bài tập 03.11 thêm (vii), (viii); bảng ánh xạ cập nhật | đã sửa |
| C14 | trung bình | Nguồn và thuật ngữ | Dẫn nguồn tại chỗ; thuật ngữ gốc; `\text{if}`; khuôn "Nó trả lời"; châm ngôn; câu hỏi gián tiếp; tiên quyết; ký hiệu tập hiệu | Dẫn B&V tại 03.6, 03.11, 03.19–03.20, 03.23, 03.27, 03.30, 03.32, 03.36; thêm LASSO, ridge, nhánh – cận, kiểm định chéo, phương pháp điểm trong, điểm yên ngựa, GPU; bỏ "epigraph", định nghĩa phần trong tương đối một câu; bỏ `\text{if}`; gộp sáu câu "Nó trả lời"; bỏ "càng nới, trần càng rẻ"; ba điểm của §4 thành danh sách; tiên quyết thêm Định lý 01.31(c), (7.3), Định lý 01.35; tập hiệu ký hiệu $\mathcal E$ | đã sửa |
| C15 | trung bình | Lặp | Đoạn sau Định nghĩa 03.1 trùng Nhận xét 03.3; Nhận xét 03.17 và 03.33; đẳng thức $3(x-2)^2+5$; bảng chia đôi; Ví dụ 03.9 phần pha trộn; danh sách "Kết quả" | Gộp; Nhận xét 03.33 rút ý ba và dẫn 03.17; đẳng thức chỉ tính ở Ví dụ 03.2; bảng còn 3 dòng; bỏ phần pha trộn; bỏ danh sách "Kết quả", chuỗi toàn chương thành danh sách 6 bước | đã sửa |

Ánh xạ mã gốc của hai báo cáo sang các mục trên, theo ghi chú của điều phối viên: N1 → A2, N2 → A3, T1–T2 → B10. Các mã gốc khác được điều phối viên hợp nhất trực tiếp vào A–C; tác tử chỉnh sửa không có bản báo cáo gốc nên không ghi ánh xạ đầy đủ. Trạng thái của mã T13 cần điều phối viên điền theo báo cáo gốc.

## Phát hiện lượt 2 và cách xử lý

| # | Mức độ | Vị trí | Vấn đề | Quyết định | Trạng thái |
|---|---|---|---|---|---|
| R1 | trung bình | Hình `kkt-active-projection.svg`, alt và đoạn đọc hình | Khung phải vẽ đúng bài 7 của `exercises.md`; alt nêu số | Giữ hình, bỏ số: alt và đoạn đọc hình mô tả cân bằng gradient tại một ràng buộc hoạt động cho bài chiếu tổng quát, nêu Ví dụ 03.18 dùng dữ liệu khác | đã sửa |
| R2 | trung bình | Đoạn sau Bổ đề 03.14 | Ba ý trong một đoạn; thiếu giả thiết $q>0$ | Tách ba đoạn; nêu $q>0$ suy từ $qz>0$ với $z>0$ | đã sửa |
| R3 | trung bình | Đoạn sau Định lý 03.8 | Hai ý trong một đoạn | Tách hai đoạn, phản ví dụ $\lambda=-\tfrac12$ thành hai câu | đã sửa |
| R4 | nhẹ | Sau Mệnh đề 03.34 | "một số mức trần không ứng với hệ số phạt nào" chưa có nguồn | Bỏ câu, chỉ giữ "chiều ngược không còn được bảo đảm" | đã sửa |
| R5 | nhẹ | "Trong học máy" sau Mệnh đề 03.20 và 03.27 | Thiếu căn cứ Định lý 03.15; "phương án vi phạm lề"; thiếu điều kiện nghiệm gốc tồn tại | Dẫn Định lý 03.15 rồi Mệnh đề 03.20; "điểm không khả thi"; thêm Mệnh đề 02.39(b), Định lý 01.36 | đã sửa |
| R6 | nhẹ | Câu dẫn Mệnh đề 03.36; đoạn sau mệnh đề | Trang 8.6.1; bỏ mẫu cần dữ liệu còn đủ hai nhãn | "dạng bài theo B&V 8.6.1, tr. 425–426"; thêm "khi dữ liệu còn lại có cả hai nhãn" | đã sửa |
| R7 | nhẹ | Nhiều chỗ | Bài tập 03.5(b) công thức nội dòng; chữ thường sau nhãn; câu lặp về $\mathcal A$; 03.11(vii); ngoặc ở §6; Tình huống 03.3 ý 2; Ví dụ 03.10 và Tình huống 03.1 hai giả thiết thử; câu nhân quả trước Ví dụ 03.8; tên Bài 04; tiên quyết 01.30(b); câu kết ở Nhận xét 03.33; "(4.2) cho hai kết luận" | Sửa đủ; tên Bài 04 theo `materials/lec-04/lecture-note.md`: "Tối ưu không ràng buộc và ràng buộc đẳng thức"; điều kiện của $\mathcal A$ là cả hai $u'\succeq u$ và $t'\ge t$ | đã sửa |
| R8 | trung bình | Tóm tắt chương | Thiếu danh sách kết quả | Khôi phục "Kết quả chính" một dòng mỗi kết quả, giữ chuỗi suy luận toàn chương | đã sửa |
| L14 | nhẹ | Bài tập 03.8 về bù trừ đặt sau cả Mục 5.2 | Bài tập không nằm ngay sau tiểu mục 5.1 | Giữ: bài tập của chương đặt cuối mục `##` để dùng cả bù trừ lẫn hệ KKT; mục tiêu 5 vẫn có bài tương ứng | giữ |
| R9 | nhẹ | Nhật ký | Thiếu ánh xạ mã, lượt rà lại 2, số dòng bảng ký hiệu | Bổ sung trong tệp này | đã sửa |

## Bảng đổi số hiệu (lượt 1 → lượt 2)

| Số cũ | Số mới | Đối tượng |
|---|---|---|
| Định nghĩa 03.14 | Định nghĩa 03.13 | Điều kiện Slater và dạng yếu |
| Bổ đề 03.15 | Bổ đề 03.14 | Tách hai tập lồi, dạng yếu |
| Định lý 03.16 | Định lý 03.15 | Định lý Slater |
| Nhận xét 03.13 | Nhận xét 03.16 | Ba mệnh đề cần tách biệt (chuyển xuống sau Ví dụ 03.11) |

Các số hiệu khác không đổi. Trong các bảng phía dưới, số hiệu theo bản lượt 2.

## Giáo trình đã tham khảo

Số trang là số trang in của Boyd và Vandenberghe (2004), đọc từ `sources/bv_cvxbook.pdf` (trang in = trang PDF − 14). Trang MIT là trang của `sources/dual.pdf` (MIT 6.079, Lecture 5, bản chuẩn theo `sources/MIT/README.md`). Không dịch hoặc chép đoạn văn nào; các ví dụ lấy ý từ giáo trình được dẫn tại chỗ.

| Mục của chương | Nguồn và mục | Điều học được và chuyển vào ghi chú |
|---|---|---|
| 1 (chứng nhận, cận dưới) | B&V Bài tập 5.1, tr. 273; mục 5.5.1, tr. 241–242 | Ví dụ xuyên suốt là Bài tập 5.1 (tính lại toàn bộ); cách đọc "cặp phương án – cận" như chặn sai số theo 5.5.1. Thứ tự đổi so với giáo trình: chương đặt nhu cầu chứng nhận trước định nghĩa hàm Lagrange (giáo trình làm ngược lại) để giữ hành trình nhu cầu → trực giác → định nghĩa. |
| 2 (Lagrange, hàm đối ngẫu, đối ngẫu yếu, bài đối ngẫu) | B&V 5.1.1–5.1.3, tr. 215–216; 5.1.5, tr. 217–219; 5.2, tr. 223–225; MIT tr. 2–5, 9–10 | Định nghĩa $g$ với miền $D$ và giá trị $-\infty$; chứng minh tính lõm qua "cận dưới của họ hàm affine"; đối ngẫu của quy hoạch tuyến tính (5.1.5, tr. 219) dùng cho Mệnh đề 03.11; ví dụ phân hoạch hai phần (tr. 219) nêu trong Nhận xét 03.7. |
| 3 (đối ngẫu mạnh, Slater) | B&V 5.2.3, tr. 226–227; 5.2.4, tr. 227–229; 5.3.2, tr. 234–236; 2.5.1, tr. 46–49; Bài tập 2.22, tr. 63; Bài tập 5.21, tr. 280; Bài tập 5.13, tr. 276; MIT tr. 10–11, 14 | Phát biểu Slater có đẳng thức affine và dạng yếu; cấu trúc chứng minh qua hai tập $\mathcal A$, $\mathcal B$ và trường hợp $\mu=0$; ví dụ bài lồi có khoảng dương (Bài tập 5.21); nới lỏng Lagrange cho bài nhị phân (Bài tập 5.13); bài toàn phương một ràng buộc có đối ngẫu mạnh (5.2.4, tr. 229; MIT tr. 14). Chứng minh bổ đề tách dạng yếu theo lối bao lồi hữu hạn và tính compact của mặt cầu, giữ từ bản ghi chú cũ, khai triển phần giáo trình để thành bài tập. |
| 4 (mặt phẳng giá trị, độ nhạy) | B&V 5.3.1, tr. 232–234; 5.4.4, tr. 240–241; 5.6.1–5.6.3, tr. 249–252; MIT tr. 15–16, 21–23 | Tập $G$ và tập $\mathcal A$, đường đỡ với hệ số góc $-\lambda$, đặc trưng đối ngẫu mạnh bằng siêu phẳng đỡ không thẳng đứng (tr. 234); bất đẳng thức độ nhạy toàn cục và địa phương, giá bóng. |
| 5 (bù trừ, KKT, hồi quy, SVM) | B&V 5.5.2–5.5.3, tr. 242–246; 8.6.1, tr. 423–426; MIT tr. 17–20; Nocedal và Wright (2006) mục 12.3 | Chuỗi đẳng thức sinh bù trừ (5.5.2); KKT cần khi có đối ngẫu mạnh, đủ khi lồi (5.5.3); câu "nhiều thuật toán là phương pháp giải KKT" (tr. 244) dùng trong đoạn "Trong học máy". |
| 6 và Tình huống | B&V 5.5.1, 5.5.3; Bài tập 5.13; ghi chú `lec-02b` (Tình huống 02.2, 02.3, Ví dụ 02.11, 02.17) | Quy trình chứng nhận, dữ liệu dùng lại của Bài 02 để nối hai chương. |

## Tự kiểm theo bảng kiểm "Kiểm định ghi chú bài giảng" (bản lượt 2)

| Tiêu chí | Kết quả | Bằng chứng |
|---|---|---|
| Mỗi mục tiêu có định lý hoặc ví dụ và bài tập | đạt | Bảng ánh xạ ở đầu "Bài tập củng cố": mục tiêu 1–6 đều có ít nhất một bài trong mục và một bài củng cố. |
| Tám bước cho mỗi khái niệm trọng tâm | đạt | Hàm Lagrange và hàm đối ngẫu: §1.1–1.2, Định nghĩa 03.4–03.5, Mệnh đề 03.6, Ví dụ 03.3, Nhận xét 03.7, Bài tập 03.2. Đối ngẫu yếu: Ví dụ 03.2, Định lý 03.8, Hệ quả 03.10, Ví dụ 03.4–03.6, Bài tập 03.3. Đối ngẫu mạnh và Slater: Ví dụ 03.7–03.8, §3.2, Định nghĩa 03.12, 03.13, Bổ đề 03.14, Định lý 03.15, Ví dụ 03.9–03.11, Nhận xét 03.16, 03.17, Bài tập 03.4–03.5. Hình học: §4.1, Định nghĩa 03.18, Mệnh đề 03.19–03.20, Ví dụ 03.12–03.13, Nhận xét 03.21, Bài tập 03.6. Bù trừ: §5.1, Định nghĩa 03.26, Mệnh đề 03.27, Ví dụ 03.16, Nhận xét 03.28, Bài tập 03.8. KKT: §5.2, Định nghĩa 03.29, Định lý 03.30, 03.32, Ví dụ 03.17–03.18, Nhận xét 03.33, Bài tập 03.7. |
| Ký hiệu trong bảng | đạt | Bảng 19 dòng; ký hiệu một ví dụ (như $\alpha_i$, $\beta_i$, $m_i$, $E$, $\varphi$, $\mathcal C$, $\mathcal B$) giới thiệu tại chỗ. |
| Định lý đủ bốn phần, có chứng minh hoặc nguồn | đạt | Script: 18 khối định lý/mệnh đề/bổ đề/hệ quả đều có bốn phần; 18 khối `proof` đều kết thúc bằng $\square$ và đứng ngay sau kết quả. Định lý 03.15(b) và phiên bản miền tổng quát dẫn B&V tr. 226–227, 234–236; KKT cần dưới điều kiện chính quy khác dẫn Nocedal và Wright mục 12.3. |
| Ví dụ có kết quả số và "Kiểm tra lại" | đạt | 20 ví dụ và 3 tình huống đều có nhãn "Kiểm tra lại" (script). Số liệu được tính lại bằng script Python độc lập (mục "Kiểm tra kỹ thuật"). |
| Bài tập có `hint` và `solution` | đạt | 17 bài, mỗi bài theo sau đúng một `hint` rồi một `solution` (script). |
| Không "xem trang chiếu", không câu mảnh, không bước bỏ | đạt | Script tìm "trang chiếu", "chúng ta", "dễ thấy", "suy ra ngay": không có. Dấu ba chấm chỉ xuất hiện trong ký hiệu chỉ số $f_0,\ldots,f_m$. |
| Số hiệu liên tục, tham chiếu chéo đúng loại | đạt | Bộ đếm chung 03.1–03.37, Ví dụ 03.1–03.20, Bài tập 03.1–03.17, Tình huống 03.1–03.3, Thuật toán 03.1–03.2 liên tục. 515 tham chiếu `03.k` và 98 tham chiếu `01.k`/`02.k` đều trỏ tới khối thật đúng loại trong `lec-03b`, `lec-01b`, `lec-02b`. |
| Móc nối khái niệm, định lý, "Trong học máy", chuỗi suy luận, mở và kết chương | đạt | Đoạn móc nối sau mỗi định nghĩa; câu dẫn trước và đoạn so sánh sau mỗi định lý; bảy đoạn "Trong học máy" (sau Định lý 03.8, sau §2.5, §3.4, sau Mệnh đề 03.20, §4.3, sau Mệnh đề 03.27, §5.2); mỗi mục có "Chuỗi suy luận của mục" dạng danh sách và "Kết mục"; mở chương nối Mệnh đề 02.11, 02.26; kết chương nối Bài 04 và Bài 05. |
| Đoạn kết ba ý, công thức có câu dẫn và câu đọc, ký hiệu gọi tên lần đầu | đạt | Kiểm thủ công theo từng mục. |
| Giáo trình ghi theo mục, dẫn tại chỗ | đạt | Bảng "Giáo trình đã tham khảo". |
| Nhất quán với bộ trang chiếu | đạt, có lệch có chủ ý | Ví dụ xuyên suốt, $\lambda^*=2$, ví dụ hai chiều, hồi quy $y=(3,4)$, $\lambda^*=2$ trùng deck. Lệch: xem "Chỗ lệch có chủ ý". |
| Trình bày sáng sủa (tiêu chí mới, AGENTS.md mục "Trình bày sáng sủa") | đạt | Mọi chứng minh dài hơn ba câu chia bước có nhãn in đậm trên dòng riêng; chuỗi nhiều hơn hai dấu trong chứng minh đặt trong `aligned` mỗi dấu một dòng, căn cứ ở câu sau; phân trường hợp và kết luận (a), (b), (c) thành danh sách; nhãn giai đoạn của ví dụ, lời giải, tình huống trên dòng riêng. Lượt 2 rà lại theo bảng C12, lượt 3 tách thêm các đoạn R2, R3, R7. Script đếm câu chạy sau lượt 3: không đoạn văn nào quá bốn câu; lời giải và ví dụ tách giả thiết thử thành đoạn riêng. Script đếm ngoặc: các câu còn hơn một cặp ngoặc chỉ là số hiệu công thức như "(2.1)", tọa độ trong `alt` hoặc danh sách tóm tắt. |

### Tự kiểm `no-ai-slop` (eval.md)

| Nhóm kiểm | Kết quả | Ghi chú |
|---|---|---|
| Nguyên tắc biên tập | đạt | Không thêm khẳng định không chứng minh; mọi số liệu tính lại được; câu chủ động, động từ cụ thể. |
| Từ cần cắt | đạt | Không có từ đệm rỗng; câu "mỗi tổ hợp quan trọng" ở Nhận xét 03.16 (số cũ 03.13) đã được thay bằng phát biểu cụ thể. |
| Mẫu cần cắt | đạt | Không câu hỏi tu từ, không mở đầu rào đón, không câu kết kịch tính, không siêu bình luận kiểu "điều này rất quan trọng"; gạch dài chỉ ở tiêu đề chương theo mẫu. |
| Đọc lại toàn bài | đạt | Văn phong học thuật ưu tiên hơn gợi ý giọng nói của kỹ năng, theo AGENTS.md. |

## Kiểm tra kỹ thuật đã chạy (lượt 3)

- Script cấu trúc và tham chiếu chéo: 131 khối, không lồng; số hiệu liên tục; bốn phần, $\square$, "Kiểm tra lại", hint rồi solution đạt; 515 tham chiếu `03.k`, 98 tham chiếu `01.k`/`02.k` trỏ đúng.
- Đếm câu: không đoạn nào quá bốn câu. Bảng ký hiệu 19 dòng.
- `sync-local-materials.py` rồi `--check`: OK. `git diff --check`: OK.
- Playwright Chromium 1600×900 và 390×844: không `pageerror`; `.katex-error` = 0, kể cả khi mở mọi khối gập; không tràn ngang; 11/11 hình nạp; 131 `.material-block`.

## Kiểm tra kỹ thuật đã chạy (lượt 2)

- Script cấu trúc chạy lại sau khi `lec-01b`, `lec-02b` được bố cục lại: 131 khối, 131 dấu mở, 131 dấu đóng; bộ đếm chung 03.1–03.37, Ví dụ 03.1–03.20, Bài tập 03.1–03.17, Tình huống 03.1–03.3, Thuật toán 03.1–03.2 liên tục; bốn phần, $\square$, "Kiểm tra lại", hint rồi solution đạt; 496 tham chiếu `03.k` và 96 tham chiếu `01.k`/`02.k` trỏ đúng khối, đúng loại.
- Số liệu mới tính lại bằng Python: Ví dụ 03.18(a) $x=(1,2)$, $p^*=5$, $\max_\lambda(5\lambda-\tfrac54\lambda^2)=5$ tại $\lambda=2$, cực tiểu lưới của $L(\cdot,2)$ bằng $5$; Bài tập 03.15 $p=(\tfrac47,\tfrac27,\tfrac17)$, kỳ vọng $\tfrac47$, $\theta=\log2\approx0{,}6931$, $\nu\approx-0{,}4404$; Nhận xét 03.28 $g=-\lambda^2/4$, $\lambda^*=0$.
- Đếm câu mỗi đoạn: không đoạn nào quá bốn câu. `sync-local-materials.py` rồi `--check`: OK. `git diff --check`: OK; không có khoảng trắng cuối dòng trong tệp mới.
- Playwright Chromium, 1600×900 và 390×844: không `pageerror`; `.katex-error` = 0 cả khi mở mọi khối gập; không tràn ngang; 11/11 hình nạp đủ; 131 `.material-block`. Ảnh đã xem: `r2-svm.png`, `r2-svm-proof.png`, `r2-narrow-vd318.png` trong cùng thư mục scratchpad. Ảnh `r2-svm.png` cho thấy danh sách Kết luận của Mệnh đề 03.36 bị vỡ khi chèn công thức hiển thị vào mục danh sách; đã sửa bằng cách đưa công thức ra (5.3) trước danh sách và chạy lại kiểm tra.

## Kiểm tra kỹ thuật đã chạy (lượt 1)

- Script cấu trúc (`struct_check.py` trong scratchpad): 131 khối, 131 dấu mở, 131 dấu đóng, không lồng; số hiệu liên tục; bốn phần; $\square$; "Kiểm tra lại"; hint rồi solution; tham chiếu chéo nội bộ và tới `01.k`, `02.k` đều đúng.
- Kiểm số liệu độc lập bằng Python thuần: $g(0),g(1),g(2),g(3),g(-\tfrac12)=1;\,4{,}5;\,5;\,4{,}75;\,-7{,}5$ (so với cực tiểu trên lưới); $d^*=3$ của bài chọn gói; $d^*=-\tfrac{34}3$ tại $\lambda=\tfrac53$ của bài ba lô; $p^*(u)$ tại $0,1,-0{,}75,8$; nghiệm SVM $(1,0)$ giá trị $0{,}5$ và $(0{,}5;0)$ giá trị $1{,}5$; Bài tập 03.7, 03.8, 03.9, 03.10, 03.16, 03.17; Ví dụ 03.20; bảng chia đôi của Tình huống 03.2.
- `python3 2627-1/scripts/sync-local-materials.py` rồi `--check`: "OK: material-local-data.js is up to date (21 file(s))".
- `git diff --check`: không lỗi (tệp mới kiểm thêm bằng `grep " $"`: không có khoảng trắng cuối dòng).
- Playwright Chromium, `http://localhost:8765/2627-1/material-viewer.html?doc=materials/lec-03b/lecture-note.md`, 1600×900 và 390×844: không `pageerror`; `.katex-error` = 0 cả khi mở mọi khối gập; 3 093 phần tử `.katex`; không cảnh báo KaTeX; không tràn ngang trang ở cả hai kích thước; 11/11 hình nạp đủ, có `alt`; 131 `.material-block` khớp 131 khối `:::`. Bảng điều khiển có một lỗi CSP do script nạp lại tự động mà `reloadserver` chèn vào trang, không thuộc viewer. Trên màn hẹp, hình rộng 900 px cuộn ngang trong đoạn chứa theo thiết kế của `material-viewer.css`.
- Ảnh chụp (đã xem): `/tmp/claude-1000/-data-tqlong-math-4-AI/500318c0-ff0f-4b30-936e-14ef25625c46/scratchpad/lec03b/shot-{wide,narrow}-{top,mid,end}.png` và `shot-wide-proof-open.png`.

## Hình thiếu hoặc hạn chế

- Không tạo hình mới. Dùng lại 11 trong 14 SVG của `img/lec-03/`; không dùng `cone-induced-orders.svg` (ngoài phạm vi), `value-sensitivity.svg` (trùng nội dung với `sensitivity-value.svg`) và `bound-family.svg` (trùng với `lagrangian-family.svg`).
- Thiếu hình tập trên $\mathcal A$ của Ví dụ 03.13 (biên $t=-\sqrt{2u}$, đường đỡ thẳng đứng tại gốc) và hình tám điểm của bài ba lô trên mặt phẳng giá trị ở Tình huống 03.3; cả hai được mô tả bằng lời và bảng tọa độ.
- `kkt-active-projection.svg` ghi điều kiện dừng dạng $0\in\nabla_xL+N_D(x^*)$ với nón pháp tuyến, ký hiệu không có trong chương; đoạn đọc hình giải thích rằng với $D=\mathbb R^n$ nón này chỉ gồm vector $0$.

## Chỗ lệch có chủ ý

- Brief ghi "chứng nhận bằng tổ hợp không âm ràng buộc Mệnh đề 02.10"; trong `lec-02b`, khối đó là Mệnh đề 02.11 (Mệnh đề 02.10 là tính lồi của quy hoạch tuyến tính). Ghi chú dẫn đúng Mệnh đề 02.11.
- Mục 4 có tiểu mục độ nhạy (Định nghĩa 03.22 – Hệ quả 03.24), phần mà bộ trang chiếu đã bỏ theo yêu cầu người dùng trước đây; brief yêu cầu đoạn "Trong học máy" về giá bóng và phân tích độ nhạy, và `exercises.md` bài 1(6) vẫn dùng $p'(0)=-\lambda^*$.
- Ví dụ thiếu Slater dùng biến thể hai chiều $\min x_1+x_2$ với $x_1^2+x_2^2\le0$ thay cho $\min x$ với $x^2\le0$ của bộ trang chiếu, để không trùng đề bài 4 của `exercises.md`.
- Ký hiệu hệ số chính quy hóa là $\rho$ (Bài 02 viết $\lambda$) và đặc trưng máy vector hỗ trợ là $z_i$ (Bài 02 viết $u_i$), vì $\lambda$ và $u$ đã dành cho nhân tử và mức ràng buộc; bảng ký hiệu ghi rõ.
- Số từ lượt 1: 27 595; lượt 2: 28 849; lượt 3 (cuối): 29 125. Vượt trần 28 000 của brief khoảng 4% do các bổ sung được yêu cầu. Quyết định của điều phối viên lượt 2: giữ độ dài, không cắt thêm; ghi là ngoại lệ.

## Điểm còn phân vân (chuyển điều phối viên)

- Bài giao bị giải sẵn một phần: đã được điều phối viên chấp nhận ở lượt 1, quyết định 2.
- Hình `kkt-active-projection.svg`, khung phải, vẽ đúng bài 7 của `exercises.md`. Quyết định lượt 2 của điều phối viên: giữ hình, bỏ số khỏi alt và đoạn đọc hình (R1).
- Số trang Rudin (1976) Định lý 4.14, tr. 89, ghi theo trí nhớ, không có PDF cục bộ để kiểm; Định lý 2.41, tr. 40, khớp số trang Bài 01b đã dùng; Định nghĩa 2.32 được dẫn không kèm trang. Nocedal và Wright (2006) chỉ dẫn mục 12.3 và Định lý 12.1, không có số trang vì không có PDF cục bộ. Platt (1998) dẫn theo số báo cáo kỹ thuật, chưa đối chiếu bản gốc.
- Bổ đề 03.14 dùng chứng minh qua bao lồi hữu hạn và tính compact của mặt cầu (giữ từ bản cũ); giáo trình chứng minh khác (khoảng cách dương). Có thể thay bằng dẫn nguồn nếu muốn rút ngắn.

## Ánh xạ mã gốc bổ sung (điều phối viên Fable 5.1, 2026-10-09)

| Mã gốc (rà mạch truyện lượt 1) | Mục xử lý | Trạng thái |
|---|---|---|
| T3 (ρ, hệ số 2, câu dẫn 03.35) | B9 | đã sửa |
| T4 (Bài 05), T5–T6 (Nhận xét 03.7), T7 (Nhận xét 03.16), T8 (§3.2), T9 (chứng minh 03.11), T10 (aligned), T11 (nhãn giai đoạn), T12 (nhánh bù trừ) | B7, B11, C12, C13 | đã sửa |
| T13 (một ý một đoạn: ~147, 374, 442, 801; đoạn sau Bổ đề 03.14) | C12 lượt 1; mục 2 lượt 2 | đã sửa ở lượt 3 |
| T14 (ngoặc lồng ~883), T15 (dẫn nguồn tại chỗ), T16 (thứ tự độ nhạy), T17 (phản ví dụ trùng bài giao), T18 (bài tập đọc hình), T19 (§6 mở bằng danh sách), T20 (công thức nội dòng) | B11, C14, D(iii), A3, C13, C13, C12 + mục 7 lượt 2 | đã sửa |
| L1–L13, L15, L16 | C12, C14, D | đã sửa |
| L14 (bài tập bù trừ sau mục KKT) | mục 9 lượt 2 | giữ, có lý do |
| M1, M2 (rà lại 2) | mục 3, 1 lượt 2 | đã sửa |

Quyết định cuối của điều phối viên: chấp nhận bản lượt 3 (29 125 từ; ngoại lệ độ dài giữ nguyên). Kiểm tra cuối do điều phối viên chạy: sync `--check` OK, `git diff --check` sạch, Playwright 1600×900 và 390×844: 131 khối, 0 lỗi KaTeX, 11/11 hình, không tràn ngang, không lỗi trang.
