# Nhật ký rà soát Bài 07 — ghi chú bài giảng viết lại theo tiêu chuẩn giáo trình

Tệp sản phẩm: `materials/lec-07/lecture-note.md` (viết lại hoàn toàn, ghi đè bản cũ 9 848 từ; bản cũ còn trong git). Lượt 2 sửa kèm đúng ba câu trong `materials/lec-02/lecture-note.md` theo quyết định A1 của điều phối viên (mục "Sửa kèm ở Bài 02"). Không vẽ SVG mới; ghi chú dùng 13 trong 14 SVG có sẵn của `img/lec-07/` (không dùng `standard-form-basis.svg`), không sửa hình nào. Bộ trang chiếu, CSS, viewer, `index.html` và `material-local-data.js` không bị sửa; chưa chạy `scripts/sync-local-materials.py` (điều phối viên chạy). Chưa commit. Tệp nhật ký này nằm dưới quy tắc bỏ qua `/2627-1/**/*.md` của `.gitignore`, nên khi commit cần `git add -f`.

Bài 07 không có `exercises.md`. Các bài tập trong mục và mục "Bài tập củng cố" là bộ bài tập duy nhất của chương; ánh xạ mục tiêu ở dưới cho thấy mỗi mục tiêu có ít nhất một bài, và mục củng cố có đủ ba mức.

## Tác tử

| Vai | Loại tác tử | Mô hình | Effort | Ghi chú |
|---|---|---|---|---|
| Soạn (authoring), lượt 1 | general-purpose | Claude Opus 5.5 (`claude-opus-5-5`) | high | Theo brief của điều phối viên Fable 5.1 ngày 2026-10-10; tác tử tự ghi dòng này, điều phối viên đối chiếu với lời gọi công cụ. |
| Rà toán (math accuracy), lượt 1 | general-purpose | Claude Opus 5.5 (`claude-opus-5-5`) | high | Chỉ đọc; theo ghi nhận của điều phối viên, báo cáo được đối chiếu và hợp nhất vào "Phát hiện lượt 1". |
| Rà mạch truyện (storyline), lượt 1 | general-purpose | Claude Opus 5.5 (`claude-opus-5-5`) | high | Chỉ đọc; như trên. |
| Chỉnh sửa (editor), lượt 2 | general-purpose (cùng tác tử soạn, tiếp tục qua tin nhắn của điều phối viên) | Claude Opus 5.5 (`claude-opus-5-5`) | high | Áp dụng quyết định "yêu cầu sửa" lượt 1 (A1, B1–B8, nhóm C, độ dài); tác tử tự ghi dòng này. |
| Rà lại lượt 2 (hai tác tử rà) | general-purpose | Claude Opus 5.5 (`claude-opus-5-5`) | high | Chỉ đọc; theo ghi nhận của điều phối viên, báo cáo được đối chiếu và hợp nhất vào "Phát hiện lượt 2". |
| Chỉnh sửa (editor), lượt 3 | general-purpose (cùng tác tử, tiếp tục qua tin nhắn của điều phối viên) | Claude Opus 5.5 (`claude-opus-5-5`) | high | Áp dụng quyết định "chấp nhận sau sửa nhẹ" lượt 2; tác tử tự ghi dòng này. |

Kỹ năng `no-ai-slop` được nạp bằng công cụ `Skill` (chế độ Edit) trước khi soạn và áp dụng lại khi sửa; tự đối chiếu `eval.md` ở mục "Tự kiểm `no-ai-slop`".

## Quyết định của điều phối viên

| Lượt | Đầu ra | Quyết định | Lý do |
|---|---|---|---|
| 1 | Bản soạn 32 013 từ (`wc -w`), 130 khối | yêu cầu sửa | A1 (vị trí phương pháp đơn hình trong học phần, sửa kèm ba câu ở Bài 02); B1–B8 trung bình; nhóm C nhẹ. Độ dài chấp nhận 31 500–32 500 từ với lý do của tác tử soạn; gói cắt trong nhật ký lượt 1 bị bác bỏ, trừ: rút "Hướng dẫn đọc thêm" khoảng 80–100 từ (giữ ánh xạ mục ↔ nguồn), cắt ý lặp "chuyển tiếp ngẫu nhiên thì lấy kỳ vọng" sau chứng minh Định lý Bellman và trong Nhận xét về giới hạn quy hoạch động (giữ ở Phạm vi định lý và kết chương); Bài tập 07.12(c) giữ. |
| 2 | Bản chỉnh sửa 32 498 từ, 132 khối | chấp nhận sau sửa nhẹ | Độ dài 32 498 từ chấp nhận. Năm mục trung bình (câu thứ tư ở Bài 02 dòng 2908, khôi phục mục "Ứng dụng", danh sách hai bước ở Tình huống 07.2, câu dẫn và quan hệ của Mệnh đề 07.29, Phạm vi Bổ đề 07.32) và nhóm nhẹ ở "Phát hiện lượt 2". |
| 3 | Bản sửa nhẹ 33 188 từ, 132 khối | chấp nhận | Điều phối viên Fable 5.1 xác nhận hai tác tử rà lại lượt 2 là general-purpose, Claude Opus 5.5 (`claude-opus-5-5`), effort high (theo lời gọi SendMessage); tự đọc lại chứng minh Định lý 07.23 và kiểm bốn câu sửa kèm ở Bài 02; Playwright 1600×900 và 390×844 cho ghi chú 07 và 02: 0 lỗi trang, 0 `.katex-error`, 0 chữ đỏ KaTeX, 132/132 và 150/150 khối, không tràn ngang; `sync --check` và `git diff --check` sạch. Độ dài 33 188 từ chấp nhận (phần tăng là các mục bắt buộc; Bài 07 không có exercises.md). Quyết định cách gọi: phương pháp đơn hình thuộc Buổi 8 (Chương 11) của đề cương; Bài 07 là bài cuối hiện có trong bộ học liệu; deck Z02 ghi "Bài 08" chờ sửa. Ghi chú này thay thế bản cũ `materials/lec-07/lecture-note.md` khi commit. |

## Số liệu của bản lượt 3

- 33 188 từ (`wc -w`), tăng khoảng 690 từ so với lượt 2, toàn bộ do các mục bắt buộc của lượt 2: khôi phục ba gạch của "Ứng dụng" (bị cắt nhầm ở lượt 2), đoạn quy về dạng chuẩn và hạng trong Phạm vi Bổ đề 07.32, câu dẫn và đoạn quan hệ sau Mệnh đề 07.29, định nghĩa giá bóng, Bài tập 07.4(d), 07.11(e). Không rút gọn thêm.
- 132 khối, không lồng; số hiệu không đổi so với lượt 2.
- Mỗi `##` sau một "Kết mục" có dòng trống trước nó (script ghép bản nháp nối các phần bằng một dòng trống).

## Phát hiện lượt 2 và cách xử lý

Các mục do điều phối viên hợp nhất từ hai báo cáo rà lại lượt 2. Vị trí ghi theo dòng của bản lượt 2. Không xóa phát hiện nào.

| # | Mức độ | Vị trí (lượt 2) | Vấn đề | Cách xử lý (lượt 3) | Trạng thái |
|---|---|---|---|---|---|
| 1 | trung bình | Bài 02 dòng 2908 | Câu thứ tư còn gọi phương pháp đơn hình là nội dung Bài 07 | Sửa thành "Bài 07 trình bày quy hoạch tuyến tính, với kết quả điểm cực tối ưu ở Định lý 07.23; phương pháp đơn hình thuộc Buổi 8 (Chương 11) của đề cương." | đã sửa |
| 2 | trung bình | Mục "Ứng dụng" | Còn 2/5 gạch: lượt 2 thay một đoạn bằng hàm thay theo đoạn và cắt nhầm ba gạch sau | Khôi phục ba gạch: vận chuyển tối ưu rời rạc (Nhận xét 07.9, Hệ quả 07.16, Peyré và Cuturi 2019), giải mã chuỗi (Tình huống 07.3, Thuật toán 07.2), học tăng cường (Định lý 07.38, Sutton và Barto 2018) | đã sửa |
| 3 | trung bình | Tình huống 07.2, "Thuật toán đi qua đỉnh kề" | Hai bước gộp trong một đoạn | Danh sách hai bước, mỗi bước một dòng: hướng, $\bar c$, phép thử tỉ số, điểm mới | đã sửa |
| 4 | trung bình | Mệnh đề 07.29 | Thiếu câu dẫn nêu kết quả cần dùng và đoạn quan hệ | Câu dẫn nêu Định lý 07.15 và định lý số chiều; tiên quyết đại số tuyến tính thêm "hạng cộng số chiều không gian nghiệm bằng $n$"; sau chứng minh: chuyển Định nghĩa 07.28 từ hàng sang cột cơ sở, chiều ngược không phát biểu, ví dụ $\{s_1,s_2,s_3\}\to\{x_1,s_2,s_3\}$ cho $(0,0)$, $(30,0)$; "Kiểm tra lại" của Ví dụ 07.17 dẫn Mệnh đề 07.29 | đã sửa |
| 5 | trung bình | Bổ đề 07.32, Phạm vi | Phép quy về dạng chuẩn viết tắt, chưa nói vì sao quan hệ kề được giữ | Tách hai đoạn (quy về dạng chuẩn; trường hợp suy biến). $Q=\{s\in\mathbb R^m\mid s\ge0,\ Ws=Wb\}$ với $W$ có $m-n$ hàng là cơ sở của không gian nghiệm trái của $A$; dùng chữ $W$ thay $C$ đề xuất vì $C$ là tập lồi ở Định nghĩa 07.11, 07.18, và $\tilde d$ thay $\sigma$ vì $\sigma$ là véc-tơ chứng nhận ở Tình huống 07.1. Kiểm lập luận hạng: $W\tilde d=0$ khi và chỉ khi $\tilde d\in\operatorname{Im}A$, nên không gian nghiệm của các ràng buộc chung trong $Q$ là ảnh đơn ánh $\{-Ad\}$ của không gian nghiệm trong $P$; cùng số chiều, nên hạng $n-1$ trong $P$ khi và chỉ khi hạng $m-1$ trong $Q$ | đã sửa |
| 6 | nhẹ | Tiên quyết | Thiếu "lồi chặt (còn gọi là lồi nghiêm ngặt)" ở lần đầu | Đã thêm | đã sửa |
| 7 | nhẹ | Tình huống 07.2, "Diễn giải" | Thiếu định nghĩa giá bóng; câu kết khái quát; chữ "phân xử" | Định nghĩa giá bóng (shadow price), dẫn Hệ quả 03.24; kết bằng số liệu "tăng $b_1$: $z^*$ đổi $0$; giảm $b_1$: giảm $3{,}5$" và nêu $z^*$ không khả vi theo $b_1$ tại đó; bỏ "phân xử" | đã sửa |
| 8 | nhẹ | Chứng minh Hệ quả 07.4 | Nhãn bước lẫn "phần (a), (b)" của định lý với kết luận của hệ quả | Nhãn ghi "kết luận (a), (c) của hệ quả", "kết luận (b) của hệ quả"; thân bài ghi "phần (a), (b) của Định lý 02.15" | đã sửa |
| 9 | nhẹ | Ký hiệu | $U$, $(a,b)$, cờ $a$, $\theta^*$, $a_i$/$A_j$, $e$ với $e^x$ | Viết thẳng $B\cup B'$; Tình huống 07.4 mô tả chuyển trạng thái bằng lời; cờ $\iota$ ở Bài tập 07.12(d); bảng ghi $\theta^*\ge0$ và quy ước chữ thường là hàng, chữ hoa là cột; $\exp(x)$ ở Nhận xét 07.27 | đã sửa |
| 10 | nhẹ | Nhiều chỗ | Diễn đạt, đề cương, bài tập | "Một đỉnh là nghiệm duy nhất của $n$ ràng buộc chặt độc lập"; tách câu đầu "Trong học máy" §6.2; "Buổi 10 (Chương 13)", "Buổi 9 (Chương 12)"; Bài tập 07.4(d) (không nghiệm nào suy biến); Bài tập 07.11(e) chứng minh trực tiếp $(1,0,0)$ là điểm cực, chỉ chỗ dùng chiều (iii) kéo theo (i); dòng trống trước mỗi `##` sau "Kết mục" | đã sửa |

## Số liệu của bản lượt 2

- 32 498 từ theo `wc -w`, trong khoảng 31 500–32 500 điều phối viên chấp nhận. Lượt 2 thêm khoảng 1 800 từ theo yêu cầu bắt buộc (Mệnh đề 07.29 và chứng minh, B1, B2, B3, B4, B7) rồi rút gọn văn diễn giải ở các đoạn mở mục, kết mục, "Trong học máy", tiên quyết, mục tiêu, tóm tắt, Tình huống 07.2 và "Hướng dẫn đọc thêm" để về khoảng chấp nhận; không cắt khối nào của gói cắt bị bác bỏ.
- 132 khối mở = 132 khối đóng, không lồng: 12 định nghĩa, 6 định lý, 11 mệnh đề, 2 bổ đề, 5 hệ quả, 7 nhận xét (bộ đếm chung 07.1–07.43); 23 ví dụ (07.1–07.23); 12 bài tập (07.1–07.12), mỗi bài một `hint` và một `solution`; 4 tình huống; 2 thuật toán; 24 `proof`.
- 12 đoạn "Trong học máy" (thêm một đoạn sau Hệ quả 07.14 cho Định lý 07.13); 6 "Chuỗi suy luận của mục"; 6 "Kết mục"; 39 dòng "Kiểm tra lại"; 22 đoạn "Dữ kiện"; bảng ký hiệu 26 dòng.
- Công thức đánh số không đổi: (1.1)–(1.2), (2.1)–(2.3), (3.1)–(3.2), (4.1)–(4.2), (5.1)–(5.3), (6.1).
- Số hiệu sinh tự động từ nhãn; không có tham chiếu treo, mọi tham chiếu đúng loại khối.

## Phát hiện lượt 1 và cách xử lý

Các mục do điều phối viên hợp nhất từ báo cáo rà toán và rà mạch truyện. Vị trí ghi theo dòng của bản lượt 1. Không xóa phát hiện nào.

| # | Mức độ | Vị trí (lượt 1) | Vấn đề | Cách xử lý (lượt 2) | Trạng thái |
|---|---|---|---|---|---|
| A1 | nghiêm trọng | Tóm tắt "Giới hạn còn lại", Nhận xét 07.33; Bài 02 dòng 507, 668, 3158 | Vị trí phương pháp đơn hình mâu thuẫn giữa ghi chú, deck Z02 ("Bài 08") và Bài 02 ("Bài 07") | Theo quyết định: "phương pháp đơn hình là nội dung Buổi 8 (Chương 11) của đề cương; trong bộ học liệu này, Bài 07 là bài cuối hiện có". Sửa Nhận xét 07.34 (số hiệu mới), hai gạch đầu dòng và câu cuối của "Giới hạn còn lại" (thêm quy hoạch nguyên là Buổi 10, Chương 13), "Hướng dẫn đọc thêm". Ba câu ở Bài 02 sửa theo mục "Sửa kèm ở Bài 02". Lệch với deck Z02 ghi ở mục lệch số 6 | đã sửa |
| B1 | trung bình | Tình huống 07.2 "Diễn giải" | Bỏ qua tính không duy nhất của nghiệm đối ngẫu ở đỉnh suy biến; câu "thêm một giờ GPU tăng nhiều nhất 3,5" thiếu phân tích hai chiều | Phát biểu lại Mệnh đề 03.11; nêu hai bộ $\mu=(\tfrac72,\tfrac12,0)$ và $\mu'=(0,\tfrac53,\tfrac73)$ (kiểm $\tfrac53\cdot180+\tfrac73\cdot60=440$); tính lại: $b_1=101$ vẫn $z^*=440$ tại $(40,60)$, $b_1=99$ cho $(40{,}5;\,58{,}5)$ với $z=436{,}5$, giảm đúng $3{,}5$. Mọi số kiểm bằng liệt kê đỉnh với phân số chính xác | đã sửa |
| B2 | trung bình | Bài tập, bảng ánh xạ | Mục tiêu 5, 6 thiếu bài kiểm trạng thái đủ và phép đếm; thiếu bài tính $\bar c$; trực giác hướng cơ sở đặt sau định nghĩa | Thêm Bài tập 07.12(d) (mô hình 3 và 4 cùng chọn thì lợi ích giảm $2$; bộ nhớ còn lại không đủ; trạng thái cặp $(\xi,a)$; nghiệm $\{1,2\}$, lợi ích $11$, kiểm bằng liệt kê); Bài tập 07.9(e) (đếm $8$ biểu thức so với $4$ đường; với $N=10$: $36$ biểu thức, $512$ đường, $q^N=1\,024$); Bài tập 07.6(e) ($\bar c_{s_1}=-\tfrac25$, $\bar c_{s_2}=-\tfrac15$, khớp $\mu$ của câu (b)); đoạn trực giác có số "tăng $x_1$ từ $(0,0)$" trước Định nghĩa 07.30. Bảng ánh xạ cập nhật | đã sửa |
| B3 | trung bình | Bổ đề 07.31, đoạn sau Định nghĩa 07.28 | Điều kiện áp dụng trộn với phạm vi chứng minh; khẳng định "hai cơ sở khác một chỉ số là hai đỉnh kề" không có chứng minh | "Điều kiện áp dụng" thành "đa diện bất kỳ có điểm cực, giá trị hữu hạn"; câu về phạm vi chứng minh chuyển sang đoạn dẫn; Phạm vi thêm phép quy đa diện tổng quát về dạng chuẩn ($\operatorname{rank}A=n$, $x\mapsto s=b-Ax$ đơn ánh affine, giữ điểm cực và quan hệ kề) và ghi "dẫn số mục, chưa đối chiếu trang" vì không có bản cục bộ của Bertsimas–Tsitsiklis. Khẳng định về hai cơ sở thành Mệnh đề 07.29 với chứng minh bốn bước; Bước 5 của Bổ đề 07.32 dẫn Mệnh đề 07.29 | đã sửa |
| B4 | trung bình | Đoạn trước Hệ quả 07.4 và chứng minh | Định lý 02.15 phát biểu lại trong một câu; ký hiệu cục bộ $f$, $g_{ik}$, $C$, $k$ trùng ký hiệu chương; "chiều thứ nhất/thứ hai" mơ hồ | Khối hiển thị có nhãn $(\mathrm P)$, $(\mathrm Q)$, kết luận (a), (b) thành danh sách; đổi thành $\phi$, $\ell_{ij}$, $D$, $j$; chứng minh nói rõ chiều "từ nghiệm của (1.2) sang bài gốc" và "từ bài gốc sang (1.2)" | đã sửa |
| B5 | trung bình | Nhận xét 07.27, "Trong học máy" §4.3; §1.3; Bài tập 07.3 | "Trạng thái" lẫn "kết cục"; $t_i$ khi là "biến phụ", khi là biến khác; biến dư dùng chữ $s$ | "Kết cục" ở cả hai chỗ, nêu Nhận xét 02.8 gọi là "trạng thái"; $t_i$ gọi là "biến chặn" ở §1.3, Hệ quả 07.4, tiên quyết và đoạn sau bảng phép chuyển; biến dư viết $e$ (bảng phép chuyển, Bài tập 07.3 dùng $e_1$) | đã sửa |
| B6 | trung bình | Toàn tệp, bảng ký hiệu | Một chữ nhiều nghĩa | $u$, $w$ của hình điểm cực: văn bản gọi bằng tọa độ $(30,6)$, $(10,10)$ và nêu nhãn hình, không dùng $p$, $q'$ như đề xuất vì $p$ đã là véc-tơ trọng số ở §2.1, §3.3 và Bài tập 07.11, còn $q$ là số lựa chọn; số chiều ở Nhận xét 07.43 viết bằng lời ("sáu thành phần, mười mức"), không dùng $r$ vì $r_i$ là phần dư; biến dư $e$; chỉ số $k$ ở Định nghĩa 07.30 và Mệnh đề 07.29 thành $j'$, ở Định lý 02.15 thành $j$; chỉ số tổng $l$ của (5.1) thành $k'$ (giữ $l$ cho chỉ số rời cơ sở ở Bổ đề 07.32), chỉ số cơ sở $i$ trong Bổ đề 07.32 thành $j'$; tập dương là $\operatorname{supp}(x)$, $S$ chỉ còn là tập hàng; vô hướng $\mu$ ở Bài tập 07.12(c) thành $\pi_0$, $\pi_j$; bảng: $\theta\in\mathbb R$ (là độ dài bước khi $\theta\ge0$), $\theta^*$, $\lambda\in[0,1]$, thêm $G_k$, $\mathcal U_k(\xi)$, $P^*$, $\operatorname{supp}$, bỏ $\bar A$ (cục bộ ở Ví dụ 07.7), câu nêu $n$, $m$, $A$ khác nhau giữa (1.1) và (2.2). Quét KaTeX: không lệnh lạ, 0 chữ đỏ | đã sửa |
| B7 | trung bình | Dòng 783, Hệ quả 07.4, 321, 132, 1920, 2047, 2246–2247; câu nhiều ngoặc 323, 1647, 1861, 1904, 2093; Bài tập 07.10, 07.12(a); Tình huống 07.4 | Tự chứa, danh sách, ngoặc lồng | Chép ba ràng buộc chặt tại $(40,60)$ tại chỗ; kết luận Hệ quả 07.4 thành (a)(b)(c); hai nhầm lẫn thành danh sách; "Đọc chênh lệch" thành danh sách có kết quả trung gian; bảng năm đường ở Tình huống 07.1; bảng tám chuỗi ở Tình huống 07.3; bảng $\Lambda_k$ ở Bài tập 07.12; tách câu có nhiều ngoặc; Bài tập 07.10 câu 2, 6 chép hệ và chi phí cạnh; 07.12(a) kể đủ bốn giả thiết; Tình huống 07.4 có bảng dữ liệu như 07.3 | đã sửa |
| B8 | trung bình | Nhiều chỗ | Toán nhẹ, nguồn | Boyd–Vandenberghe §5.1.5 (tr. 219); câu mở Mục 1 "Bài toán sau có ràng buộc, và gradient của mục tiêu khác $0$ tại mọi điểm"; lý do điểm cực của đường tròn bằng tính lồi chặt của chuẩn Euclid (khối `aligned` hai dòng); "tại cơ sở tối ưu $\{x_1,x_2,s_2\}$" sau Mệnh đề 07.31; Ví dụ 07.13 "Bước 3–4"; Mục 6.2 "nhiều nhất một phép so sánh"; Bài tập 07.12(c) ghi nghiệm nới lỏng không duy nhất (mô hình 2, 3 cùng tỉ số, ví dụ $x=(1;\,0{,}75;\,1;\,0)$); Định lý 07.15 dẫn §2.2–2.3 | đã sửa |
| C | nhẹ | Nhiều chỗ | Thuật ngữ, khẩu ngữ, trình bày | Thêm so sánh và "Trong học máy" cho Định lý 07.13; "Trong học máy" §4.5 gắn với hồi quy $L_1$ của Ví dụ 07.4; Mệnh đề 03.11 phát biểu lại ở Tình huống 07.2; $\sigma\in\mathbb R^5$; "chuẩn Euclid" ở Mệnh đề 07.2; "không bảo đảm" sau Mệnh đề 07.25; "tỉ lệ với nhau" ở §3.4; hình `dp-layered-graph-new-costs` đưa vào đề Bài tập 07.9, `alt` đủ tám chi phí; "khẳng định (i)–(iii)" ở Định lý 07.15, 07.20, Hệ quả 07.16, 07.21, Bài tập 07.5, 07.11; ba thành phần của Định nghĩa 07.1 thành danh sách; Nhận xét về giả thiết mô hình chuyển xuống sau "Trong học máy" của Mệnh đề 07.2 (đổi số hiệu); thuật ngữ gốc (dynamic programming), (vertex), (least absolute deviations), (Q-learning), (graphics processing unit, GPU); "trang" thay "Slide", "bài giảng số 16 của MIT 15.093J"; đổi khuôn "… đọc như sau" ở ba chỗ (đẳng thức trị tuyệt đối, Định lý 07.13, công thức (4.1)); câu đối lập "Khó khăn không nằm ở…" và "Phương trình Bellman không sai…" viết trần thuật; bỏ khẩu ngữ ("phải cẩn thận", "liệt kê còn rẻ", "đi tới khi chạm tường", "bị ghim"); Bài tập 07.2(c), 07.3(b) dạng nhiệm vụ; lời giải 07.2(b) thêm hai khoảng ngoài (độ dốc $-3$, $3$); tài liệu thêm Buổi 9 (Chương 12); tiên quyết thêm Định nghĩa 01.13, Định lý 01.31, Hệ quả 01.34, Định lý 01.35; lệch thứ tự C04/C05, C06/C07 ghi ở mục lệch | đã sửa |
| D | quyết định độ dài | "Hướng dẫn đọc thêm", sau chứng minh Định lý Bellman, Nhận xét giới hạn quy hoạch động | Rút gọn được duyệt | "Hướng dẫn đọc thêm" rút khoảng 130 từ, giữ ánh xạ mục ↔ nguồn; bỏ câu "nếu chuyển tiếp ngẫu nhiên… lấy kỳ vọng" sau chứng minh Định lý 07.38 và trong Nhận xét 07.43 (mục còn lại nói lời giải là chính sách); giữ ở Phạm vi Định lý 07.38 và kết chương; Bài tập 07.12(c) giữ | đã sửa |

## Bảng đổi số hiệu (lượt 1 → lượt 2)

Ví dụ, Bài tập, Tình huống, Thuật toán và các số hiệu không ghi dưới đây không đổi. Định lý 07.23 (dẫn từ Bài 02) không đổi.

| Lượt 1 | Lượt 2 | Đối tượng |
|---|---|---|
| Nhận xét 07.2 | Nhận xét 07.3 | ba giả thiết mô hình (chuyển chỗ) |
| Mệnh đề 07.3 | Mệnh đề 07.2 | điểm trong không tối ưu |
| (mới) | Mệnh đề 07.29 | hai cơ sở khác một chỉ số cho hai đỉnh kề |
| Định nghĩa 07.29 | Định nghĩa 07.30 | hướng cơ sở, lợi ích rút gọn |
| Mệnh đề 07.30 | Mệnh đề 07.31 | tiêu chuẩn tối ưu theo lợi ích rút gọn |
| Bổ đề 07.31 | Bổ đề 07.32 | đỉnh kề cải thiện |
| Mệnh đề 07.32 | Mệnh đề 07.33 | thuật toán dừng tại điểm cực tối ưu |
| Nhận xét 07.33 | Nhận xét 07.34 | từ thuật toán ý niệm tới phương pháp đơn hình |
| Định nghĩa 07.34 | Định nghĩa 07.35 | bài toán quyết định hữu hạn tất định |
| Nhận xét 07.35 | Nhận xét 07.36 | trạng thái đủ |
| Định nghĩa 07.36 | Định nghĩa 07.37 | chi phí tối ưu còn lại |
| Định lý 07.37 | Định lý 07.38 | phương trình Bellman |
| Mệnh đề 07.38 | Mệnh đề 07.39 | nguyên lý tối ưu |
| Định nghĩa 07.39 | Định nghĩa 07.40 | chính sách |
| Mệnh đề 07.40, 07.41 | Mệnh đề 07.41, 07.42 | chính sách đạt cực tiểu; số phép tính |
| Nhận xét 07.42 | Nhận xét 07.43 | giới hạn quy hoạch động |

## Sửa kèm ở Bài 02

Theo quyết định A1 (lượt 2, ba câu) và quyết định lượt 2 (lượt 3, câu thứ tư), chỉ sửa bốn câu của `materials/lec-02/lecture-note.md`; không đổi số hiệu hay nội dung khác.

| Dòng | Trước | Sau |
|---|---|---|
| 507 | "phương pháp đơn hình (simplex method, Bài 07) chỉ làm việc với một dạng chuẩn…" | "phương pháp đơn hình (simplex method), thuộc Buổi 8 (Chương 11) của đề cương, chỉ làm việc với một dạng chuẩn…" |
| 668 (Nhận xét 02.12) | "Đó là cơ sở của phương pháp đơn hình ở Bài 07." | "Kết quả này được chứng minh ở Định lý 07.23; phương pháp đơn hình thuộc Buổi 8 (Chương 11) của đề cương." |
| 2908 (lượt 3) | "Bài 07 trình bày phương pháp đơn hình cho quy hoạch tuyến tính." | "Bài 07 trình bày quy hoạch tuyến tính, với kết quả điểm cực tối ưu ở Định lý 07.23; phương pháp đơn hình thuộc Buổi 8 (Chương 11) của đề cương." |
| 3158 | "…; Bài 07 cho phương pháp đơn hình." | "…; Bài 07 cho quy hoạch tuyến tính, với kết quả điểm cực tối ưu được chứng minh ở Định lý 07.23, còn phương pháp đơn hình thuộc Buổi 8 (Chương 11) của đề cương." |

Sau lượt 3, Bài 02 không còn câu nào gọi phương pháp đơn hình là nội dung Bài 07. `git diff --check` của Bài 02 sạch; Playwright Bài 02 ở hai cỡ: 0 lỗi trang, 0 `.katex-error`, 0 chữ đỏ, không tràn ngang.

## Cấu trúc chương và ánh xạ với bộ trang chiếu

| Mục | Mạch deck | Nội dung chính (số hiệu lượt 2) |
|---|---|---|
| Mở mục 1 | P00–P03 | Nối Bài 04–06 (Mệnh đề 06.3), Bài 02 (Định nghĩa 02.9, Mệnh đề 02.10), Bài 03 (Mệnh đề 03.11); hình `central-problem` |
| 1. Mô hình hóa quy hoạch tuyến tính | A01–A08 | Ví dụ 07.1–07.3, Định nghĩa 07.1, Mệnh đề 07.2, Nhận xét 07.3, Ví dụ 07.4, Hệ quả 07.4 (từ Định lý 02.15 phát biểu lại), Bài tập 07.1 (A08), 07.2 |
| 2. Đa diện, dạng chuẩn và nghiệm cơ sở | B01–B07 | Ví dụ 07.5–07.9, Định nghĩa 07.5, 07.7, 07.10, Mệnh đề 07.6, 07.8, Nhận xét 07.9, Bài tập 07.3, 07.4 |
| 3. Điểm cực và nghiệm cơ sở khả thi | C01–C05 | Định nghĩa 07.11, 07.12, 07.18, Định lý 07.13, 07.15, 07.20, Hệ quả 07.14, 07.16, 07.21, Bổ đề 07.19, Nhận xét 07.17, Ví dụ 07.10–07.13, Bài tập 07.5 |
| 4. Kết cục, điểm cực tối ưu và thuật toán đi qua đỉnh kề | C04, C06–C11 | Ví dụ 07.14–07.18, Mệnh đề 07.22, 07.25, 07.29, 07.31, 07.33, Định lý 07.23, 07.26, Hệ quả 07.24, Nhận xét 07.27, 07.34, Định nghĩa 07.28, 07.30, Bổ đề 07.32, Thuật toán 07.1, Bài tập 07.6 (C10), 07.7 (C11) |
| 5. Trạng thái và phương trình Bellman | D01–D04 | Ví dụ 07.19–07.21, Định nghĩa 07.35, 07.37, Nhận xét 07.36, Định lý 07.38, Mệnh đề 07.39, Bài tập 07.8 |
| 6. Giải ngược, chính sách và chi phí tính toán | D05–D06 | Định nghĩa 07.40, Thuật toán 07.2, Mệnh đề 07.41, 07.42, Ví dụ 07.22–07.23, Nhận xét 07.43, Bài tập 07.9 (D06) |
| Tình huống, tóm tắt, bài tập củng cố | Z01–Z02 | Tình huống 07.1–07.4, Ứng dụng, Tóm tắt (hình `lp-dp-decision-map`), Bài tập 07.10–07.12 |

Deck có bốn mạch nội dung A–D; ghi chú tách mạch C thành Mục 3 và Mục 4, mạch D thành Mục 5 và Mục 6, để có sáu mục `##` và mỗi mục có một kết quả đích.

## Tình huống áp dụng

| Tình huống | Bài toán | Kết quả dùng | Giả thiết |
|---|---|---|---|
| 07.1 | Hồi quy $L_1$ thời gian một lượt huấn luyện theo cỡ dữ liệu, năm số đo, một số đo hỏng | Hệ quả 07.4, Mệnh đề 07.25, chứng nhận Mệnh đề 02.11 | thỏa; nghiệm $x^*=(1,1)$ duy nhất, giá trị $5$; bình phương nhỏ nhất cho $(0,2)$ |
| 07.2 | Phân bổ giờ GPU giữa tinh chỉnh và sinh dữ liệu, ba giới hạn | Định lý 07.13, 07.20, 07.26, Mệnh đề 07.31, Thuật toán 07.1, Mệnh đề 03.11 | thỏa; đỉnh tối ưu $(40,60)$ suy biến, giá trị $440$; một cơ sở cho lợi ích rút gọn dương dù điểm tối ưu; hai bộ nhân tử, giá bóng một phía; chẩn đoán ba kết cục |
| 07.3 | Giải mã Viterbi hai nhãn, ba từ, chi phí bit | Định nghĩa 07.35, Định lý 07.38, Mệnh đề 07.41 | thỏa; chuỗi $\mathrm{NN\,VB\,NN}$, $14$ bit |
| 07.4 | Cùng bài với hiệu chỉnh bậc hai | Nhận xét 07.36, Định lý 07.38 | **không thỏa** giả thiết trạng thái đủ; Bellman theo nhãn đơn trả $\mathrm{NN\,VB\,NN}$ với chi phí thật $18$, nghiệm thật $\mathrm{NN\,NN\,NN}$ với $17$; sửa bằng trạng thái cặp |

Mọi số liệu của bốn tình huống, của Bài tập 07.4, 07.6, 07.7, 07.8, 07.9, 07.12 và của Ví dụ 07.5, 07.8, 07.17, 07.18 được tính lại bằng Python với phân số chính xác. Lượt 2 tính thêm: liệt kê đỉnh với $b_1=99,100,101$ (Tình huống 07.2), lợi ích rút gọn ở cả ba cơ sở của $(40,60)$, quy hoạch động cái túi có trạng thái mở rộng (Bài tập 07.12(d)), hướng cơ sở tại $(1{,}6;\,1{,}2)$ (Bài tập 07.6(e)).

## Giáo trình đã tham khảo

Có bản cục bộ và đã đọc: MIT OCW 15.093J *Optimization Methods* Bài 16 "Dynamic Programming" (`sources/MIT/...lec16.pdf`, trang 1–20), Bài 2 "The Geometry of LO" (`sources/geometry of LO.pdf`, trang 1–24), Boyd và Vandenberghe (`sources/bv_cvxbook.pdf`: §2.2.4 tr. 31–32, §4.3 tr. 146–151, §5.1.5 tr. 219, §5.2.1 tr. 224–225, số trang đọc từ mục lục và đầu trang), đề cương chính thức và `sources/part1.docx`. Không có bản cục bộ của Bertsimas và Tsitsiklis (1997), Bertsekas (2017), Cormen và cộng sự (2009), Sutton và Barto (2018), Rabiner (1989), Koenker và Bassett (1978), Klee và Minty (1972), Peyré và Cuturi (2019): các nguồn này dẫn theo cấu trúc chương đã biết và theo dẫn chiếu của deck; chưa kiểm số trang, nên ghi chú chỉ dẫn số mục, trừ hai bài báo có số trang tạp chí đã biết. Không dịch hoặc chép đoạn văn nào.

| Mục của chương | Nguồn và mục | Điều học được và chuyển vào ghi chú |
|---|---|---|
| 1 (mô hình, $L_1$) | BT §1.1–1.3; B&V §4.3; Bài 02 Định lý 02.15 | Thứ tự dữ kiện → biến → ràng buộc → mục tiêu theo BT §1.1 và deck A01–A05; hồi quy $L_1$ viết thành hệ quả của Định lý 02.15 thay vì chứng minh lại; giả thiết tỉ lệ, cộng tính, chia được (BT §1.1) thành Nhận xét 07.3. |
| 2 (đa diện, dạng chuẩn, BFS) | BT §2.1, §2.3; B&V §2.2.4; MIT bài giảng số 2, trang 3–4, 9, 17–19 | Định nghĩa đa diện, bị chặn theo BT §2.1; dạng chuẩn viết ở chiều cực đại của deck và thêm giả thiết hạng như MIT trang 17; quy trình dựng nghiệm cơ sở theo MIT trang 18; ví dụ nghiệm cơ sở không khả thi theo kiểu MIT trang 19 nhưng với số liệu hộp hạt. |
| 3 (điểm cực, tồn tại) | BT §2.2–2.5 (định nghĩa điểm cực, đỉnh, BFS, tương đương, tồn tại); MIT bài giảng số 2, trang 10–16, 21–22 | Tiêu chuẩn hạng của BT §2.2 (BFS của đa diện tổng quát là điểm có $n$ ràng buộc chặt độc lập) thành Định lý 07.13; tương đương cho dạng chuẩn viết bằng cột dương (BT §2.3) thành Định lý 07.15; tồn tại điểm cực ⇔ không chứa đường thẳng (BT §2.5, MIT trang 22) thêm điều kiện thứ ba $\operatorname{rank}(A)=n$ và tách Bổ đề 07.19 (bước tăng hạng). Không dùng khái niệm "vertex theo mục tiêu" của MIT trang 11. |
| 4 (tối ưu, bốn kết cục, đỉnh kề) | BT §2.6 (tối ưu tại điểm cực, chứng minh bằng bước tăng hạng không làm giảm mục tiêu), §2.2 (đỉnh kề), §3.1 (hướng cơ sở, chi phí rút gọn), §3.2, §3.4 (đơn hình, quay vòng, quy tắc Bland); MIT bài giảng số 2, trang 8, 23–24 | Định lý 07.23 theo cách chứng minh của BT §2.6 (dạng cực tiểu đổi sang cực đại); bốn kết cục theo MIT trang 8 và chứng minh qua dạng chuẩn như BT §2.6; Bổ đề 07.32 chứng minh đầy đủ cho dạng chuẩn không suy biến bằng hướng cơ sở của BT §3.1, trường hợp tổng quát dẫn BT §3.2, §3.4 kèm ý tưởng. |
| 5–6 (quy hoạch động) | MIT bài giảng số 16, trang 6 (chọn trạng thái), 7 (khung), 9 (Bellman có kỳ vọng); Bertsekas §1.1–1.4, chương 2; Cormen chương 15 | Khung hữu hạn tất định là MIT trang 7 bỏ nhiễu; chứng minh Bellman bằng hai chiều bất đẳng thức như Bertsekas §1.3; mở rộng trạng thái (Bertsekas §1.4) thành Nhận xét 07.36 và Tình huống 07.4; cấu trúc con tối ưu và đếm bài toán con theo Cormen §15.3; ví dụ cái túi (Bài tập 07.12) theo MIT trang 2–3. |
| Tình huống, ứng dụng | Koenker và Bassett (1978); Rabiner (1989); Sutton và Barto (2018); Peyré và Cuturi (2019) | Hồi quy $L_1$ và phân vị; Viterbi; Bellman trong học tăng cường; vận chuyển tối ưu là LP. |

## Ánh xạ mục tiêu học tập – kết quả – bài tập (số hiệu lượt 2)

| Mục tiêu (LLO/CLO) | Kết quả và ví dụ | Bài tập |
|---|---|---|
| 1. Lập quy hoạch tuyến tính; hồi quy $L_1$ (LLO17; CLO1) | Định nghĩa 07.1, Mệnh đề 07.2, Nhận xét 07.3, Hệ quả 07.4; Ví dụ 07.1–07.4; Tình huống 07.1, 07.2 | 07.1, 07.2, 07.10 (câu 1) |
| 2. Đa diện, dạng chuẩn, nghiệm cơ sở (LLO18; CLO1) | Định nghĩa 07.5, 07.7, 07.10; Mệnh đề 07.6, 07.8; Nhận xét 07.9; Ví dụ 07.5–07.9 | 07.3, 07.4, 07.10 (câu 2), 07.11 (a) |
| 3. Điểm cực, tương đương, tồn tại (LLO18; CLO1) | Định nghĩa 07.11, 07.12, 07.18; Định lý 07.13, 07.15, 07.20; Hệ quả 07.14, 07.16, 07.21; Bổ đề 07.19; Ví dụ 07.10–07.13 | 07.5, 07.10 (câu 4), 07.11 (b) |
| 4. Kết cục, điểm cực tối ưu, thuật toán đi qua đỉnh kề (LLO18; CLO1) | Mệnh đề 07.22, 07.25, 07.29, 07.31, 07.33; Định lý 07.23, 07.26; Hệ quả 07.24; Bổ đề 07.32; Thuật toán 07.1; Ví dụ 07.14–07.18; Tình huống 07.2 | 07.6 (a–e), 07.7, 07.10 (câu 3, 5), 07.11 (c, d) |
| 5. Mô hình quyết định theo giai đoạn, trạng thái đủ (bổ trợ) | Định nghĩa 07.35, Nhận xét 07.36; Ví dụ 07.19, 07.20; Tình huống 07.3, 07.4 | 07.8 (a), 07.12 (a, d) |
| 6. Giải ngược Bellman, chính sách, số phép tính (bổ trợ) | Định nghĩa 07.37, 07.40; Định lý 07.38; Mệnh đề 07.39, 07.41, 07.42; Thuật toán 07.2; Ví dụ 07.21–07.23 | 07.8 (b, c), 07.9 (a–e), 07.10 (câu 6), 07.12 (b, d) |

Mức của mục "Bài tập củng cố": 07.10 nhận biết, 07.11 tính toán và chứng minh, 07.12 vận dụng vào AI.

## Tự kiểm theo bảng kiểm "Kiểm định ghi chú bài giảng" (lượt 2)

| Tiêu chí | Kết quả | Bằng chứng |
|---|---|---|
| Mỗi mục tiêu có kết quả hoặc ví dụ và bài tập | đạt | Bảng ánh xạ trên; mục tiêu 5, 6 có thêm Bài tập 07.12(d), 07.9(e). |
| Tám bước cho mỗi khái niệm trọng tâm | đạt theo tự kiểm | Như lượt 1, cộng: hướng cơ sở có nhu cầu ($\binom{40}{20}$), trực giác có số (tăng $x_1$ từ $(0,0)$) trước Định nghĩa 07.30, ví dụ 07.17–07.18, bài tập 07.6(e); quan hệ kề có Mệnh đề 07.29 với chứng minh. |
| Ký hiệu trong bảng, mỗi chữ một nghĩa | đạt theo tự kiểm | Đổi tên theo B6; ký hiệu cục bộ giới thiệu tại chỗ: $\alpha$, $\beta$, $K$, $\varphi$, $\psi$, $\tilde A$, $\tilde c$, $\tilde x$, $\bar A$, $\rho$, $\zeta$, $\delta$, $\tau$, $Z$, $V$, $U$ (tập chỉ số ở Mệnh đề 07.29), $\Omega$, $\Pi_k$, $\sigma$, $\eta_\pm$, $H$, $P_1$–$P_3$, $D$, $\phi$, $\ell_{ij}$, $\gamma_i$, $e$, $j'$, $k'$, $\omega_j$, $\kappa_j$, $\Lambda_k$, $\pi_j$, $\mathrm o$, $\mathrm{NN}$, $\mathrm{VB}$. |
| Định lý đủ bốn phần, có chứng minh | đạt | 24 khối định lý, mệnh đề, bổ đề, hệ quả có bốn nhãn và `proof` ngay sau, kết thúc $\square$. Bổ đề 07.32 chứng minh cho dạng chuẩn không suy biến; Phạm vi nêu phép quy đa diện tổng quát về dạng chuẩn và dẫn nguồn cho trường hợp suy biến. |
| Ví dụ có kết quả số và "Kiểm tra lại" | đạt | 23 ví dụ, 4 tình huống, 12 lời giải đều có dòng "Kiểm tra lại". |
| Bài tập có `hint` và `solution` | đạt | 12 bài. |
| Không chuỗi cấm, không câu hỏi tu từ | đạt | Script: "trang chiếu", "xem bài giảng", "dễ thấy", "suy ra ngay", "chúng ta", "hãy", "ta có", "Slide": 0; mã trang: 0. Dấu "?" chỉ còn trong `alt` trích nhãn hình và tên bài báo Klee–Minty. |
| Trình bày sáng sủa | đạt theo tự kiểm | Đoạn diễn giải không quá bốn câu; sáu đoạn năm câu là một bước chứng minh. Chuỗi nội dòng từ ba dấu quan hệ chỉ còn dãy mũi tên đường đi và định nghĩa tập $P^*$; chuỗi ở lý do điểm cực của đường tròn đặt trong `aligned`. |
| Số hiệu, tham chiếu, khối | đạt | 132 khối, không lồng; 20 số hiệu bài trước kiểm lại với cây làm việc: Định nghĩa 01.12, 01.13, 01.18, Mệnh đề 01.19, 01.20, Định lý 01.31, 01.35, Hệ quả 01.34, Định nghĩa 02.9, 02.13, Mệnh đề 02.10, 02.11, Bổ đề 02.14, Định lý 02.15, Nhận xét 02.8, 02.12, Mệnh đề 03.11, Định lý 03.15, Định nghĩa 06.2, Mệnh đề 06.3. |
| Móc nối, "Trong học máy", chuỗi suy luận, mở và kết chương | đạt theo tự kiểm | 12 đoạn "Trong học máy"; kết chương theo cách gọi A1. |
| Giáo trình ghi theo mục | đạt, có giới hạn | Số trang chỉ có cho Boyd và Vandenberghe; Bertsimas–Tsitsiklis dẫn số mục. |
| Nhất quán với deck | có lệch, ghi dưới | Mọi bộ số của deck giữ nguyên. |

## Ví dụ, tình huống và bài tập tự chứa

| Khối | Khối được nhắc | Cách xử lý |
|---|---|---|
| Ví dụ 07.2, 07.3, 07.7, 07.15, 07.18 | Ví dụ 07.1–07.3, 07.5, 07.11, 07.17 | Dữ kiện chép mô hình hoặc dạng chuẩn hộp hạt; tham chiếu còn lại chỉ để đối chiếu |
| Ví dụ 07.11 | Ví dụ 07.10, Bài tập 07.4 | Dữ kiện chép năm hàng; tham chiếu để đối chiếu |
| Ví dụ 07.21, 07.22, 07.23 | Ví dụ 07.19, 07.21 | Dữ kiện chép tám chi phí cạnh, năm giá trị $J$; Ví dụ 07.23 nêu lại cấu trúc đồ thị |
| Tình huống 07.1 | Ví dụ 07.4 | Chỉ ở "Giới hạn" |
| Tình huống 07.4 | Tình huống 07.3 | Bảng dữ liệu chép lại đầy đủ (lượt 2) |
| Bài tập 07.1–07.12 | | Đề tự nêu đủ dữ kiện; Bài tập 07.9 có hình và tám chi phí; Bài tập 07.10 câu 2, 6 chép hệ và chi phí cạnh trong lời giải (lượt 2) |

## Lệch với bộ trang chiếu: chờ sửa deck

1. **Ký hiệu trạng thái.** Deck D04–D05 viết trạng thái $x_k$; ghi chú viết $\xi_k$.
2. **Biến ngoài cơ sở.** Deck B06 viết $N=\{1,\ldots,n\}\setminus B$, trùng số giai đoạn $N$; ghi chú viết $B^{\mathrm c}$.
3. **Chi phí cạnh, tên nút.** Deck D06 viết $c(s,B)$; ghi chú viết $g(\mathrm s,\mathrm B)$, tên nút chữ đứng.
4. **Định nghĩa điểm cực.** Deck C02 viết $v=\lambda y+(1-\lambda)z$; ghi chú viết $x'$, $x''$. Hình `extreme-point-def` giữ nhãn $u$, $w$; văn bản gọi hai điểm đó bằng tọa độ.
5. **Hồi quy $L_1$.** Deck A07 viết $a_i$, $b_i$, $m$ mẫu; ghi chú viết $h_i$, $y_i$, $M$, và gọi $t_i$ là biến chặn.
6. **Chuyển tiếp bài sau.** Deck Z02 và `outline.md` gọi phương pháp đơn hình là "Bài 08". Theo quyết định A1 của điều phối viên, ghi chú viết "phương pháp đơn hình là nội dung Buổi 8 (Chương 11) của đề cương; trong bộ học liệu này, Bài 07 là bài cuối hiện có". Deck Z02 cần sửa theo cách gọi này.
7. **Đỉnh kề.** Deck C07 nêu bổ đề kèm "tính chất (không chứng minh)"; ghi chú chứng minh cho dạng chuẩn không suy biến, thêm Mệnh đề 07.29 (hai cơ sở khác một chỉ số), hướng cơ sở và lợi ích rút gọn.
8. **Đếm phép tính.** Deck D05 ghi "cỡ $Nq^2$", "$q=2$, $N=20$: cỡ $80$"; ghi chú cho số chính xác $q+(N-1)q^2=78$.
9. **Định lý tồn tại.** Deck C05 nêu hai khẳng định tương đương; ghi chú thêm $\operatorname{rank}(A)=n$ và tiêu chuẩn hạng.
10. **Thứ tự trang.** Ghi chú đặt nhiều nghiệm tối ưu (deck C04) sau tồn tại điểm cực (deck C05), ở đầu Mục 4, để Mục 3 chỉ xét điểm cực và Mục 4 mở bằng câu hỏi tối ưu; đặt bốn kết cục (deck C06) sau định lý điểm cực tối ưu (deck C07) vì chứng minh bốn kết cục dùng định lý đó qua dạng chuẩn.
11. **Biến dư.** Deck B04 viết biến dư bằng $s$; ghi chú viết $e$.
12. **Tình huống và bài tập mới.** Tình huống 07.1–07.4 và Bài tập 07.2, 07.3, 07.4, 07.5, 07.8, 07.10–07.12, cùng câu (e) của Bài tập 07.6 và 07.9, không có trên deck; mọi bài của deck có trong ghi chú với cùng số liệu.

## Tự kiểm `no-ai-slop`

Chế độ Edit, áp dụng khi soạn và khi rà lại; văn phong học thuật ưu tiên hơn gợi ý về giọng nói của kỹ năng.

| Mục của `eval.md` | Kết quả | Ghi chú |
|---|---|---|
| Giữ ý, không thêm khẳng định không nguồn | đạt | Các khẳng định về thực hành (HiGHS là bộ giải của `linprog` trong SciPy, Viterbi, học tăng cường, hồi quy phân vị, Klee–Minty) có nguồn hoặc là sự kiện phần mềm đã biết; số liệu ghi "sư phạm". |
| Từ cấm, trạng từ rỗng, cụm rỗng | đạt | Quét "then chốt", "quan trọng", "đóng vai trò", "rõ ràng", "không chỉ… mà còn", "hiệu quả": đã thay ba chỗ ("bổ đề then chốt", "bước quan trọng nhất", "hiệu quả giảm"). |
| Đối lập nhị phân, câu hỏi tu từ, mở đầu rỗng | đạt | Không có "không phải X mà là Y" làm khung; câu dạng "Phương trình Bellman không sai; mô hình trạng thái sai" ở Tình huống 07.4 giữ vì nêu đúng chẩn đoán. |
| Dấu hai chấm kịch tính, phân tích hời hợt, siêu ngôn ngữ | đạt | Dấu hai chấm chỉ dùng trước danh sách, công thức hoặc nhãn; không có câu "điều đáng chú ý là". |
| Kết luận tóm tắt lặp, câu chốt kiểu châm ngôn | đạt | "Kết mục" theo mẫu bắt buộc (kết quả, thiếu hụt, mục sau); không có câu chốt ẩn dụ. |
| Định dạng | đạt | In đậm chỉ ở nhãn bước, nhãn giai đoạn và đầu mục; danh sách chỉ cho mục song song. |
| Gạch ngang dài | đạt | Một dấu gạch ngang dài duy nhất, ở tiêu đề `#` theo quy ước; dấu gạch nối ngắn chỉ dùng trong khoảng số (Bài 04–06) và tên ghép (Klee–Minty). |
| Nhịp câu đều, đổi từ đồng nghĩa | đạt theo tự kiểm | Thuật ngữ cố định: "điểm cực" (đỉnh là tên gọi khác, nêu ở Định nghĩa 07.11), "nghiệm cơ sở khả thi", "kết cục", "trạng thái", "chi phí tối ưu còn lại". |

Lượt 2 áp dụng lại chế độ Edit trên mọi đoạn sửa: bỏ ba khẩu ngữ và một ẩn dụ ("đi tới khi chạm tường", "bị ghim", "liệt kê còn rẻ", "phải cẩn thận"), hai câu đối lập nhị phân, ba khuôn "… đọc như sau"; rút gọn văn diễn giải không làm mất giả thiết, ký hiệu hay số hiệu.

## Kiểm kỹ thuật (lượt 3)

- `git diff --check` cho `materials/lec-07/` và `materials/lec-02/`: sạch. Script cấu trúc: 132 khối, không lồng, không tham chiếu treo, chuỗi cấm bằng 0, không lệnh KaTeX lạ, không tiếng Việt trong công thức.
- Playwright 1600×900 và 390×844, mở mọi khối gập: ghi chú 07: 0 lỗi trang, 0 `.katex-error`, 0 chữ đỏ, 3 585 phần tử `.katex`, không tràn ngang; ghi chú 02: 0 lỗi trang, 0 `.katex-error`, 0 chữ đỏ, 3 611 phần tử `.katex`, không tràn ngang. Ảnh chụp đã xem: Phạm vi Bổ đề 07.32, hai bước ở Tình huống 07.2, mục "Ứng dụng", đoạn sau Mệnh đề 07.29.

## Kiểm kỹ thuật (lượt 2)

- `git diff --check` cho `materials/lec-07/` và `materials/lec-02/`: sạch.
- Playwright Chromium qua `http://localhost:8765/2627-1/material-viewer.html?...`, cỡ 1600×900 và 390×844, mở mọi khối gập:
  - ghi chú 07: 0 lỗi trang, 0 `.katex-error`, 0 chữ đỏ KaTeX, 3 522 phần tử `.katex`, 13/13 hình, `scrollWidth` 1585 ≤ 1600 và 375 ≤ 390;
  - ghi chú 02: 0 lỗi trang, 0 `.katex-error`, 0 chữ đỏ, 3 611 phần tử `.katex`, không tràn ngang.
  - Ở màn hẹp, hình 900 px cuộn ngang trong đoạn chứa nó theo `material-viewer.css`. Console có lỗi CSP của script nạp lại `reloadserver`, giống mọi bài khác.
  - Ảnh chụp đã xem: Tình huống 07.2 "Diễn giải", phát biểu lại Định lý 02.15, bảng ký hiệu màn hẹp, Mệnh đề 07.29, câu sửa ở Nhận xét 02.12.
- Quét lệnh KaTeX: chỉ lệnh chuẩn (thêm `\phi`, `\ell`, `\forall`, `\mapsto`, `\Lambda`, `\kappa`, `\omega`, `\pi`); không có tiếng Việt trong công thức.
- Chưa chạy `scripts/sync-local-materials.py` theo brief.

## Số liệu của bản lượt 1

- 32 013 từ; 130 khối; bộ đếm chung 07.1–07.42 (12 định nghĩa, 6 định lý, 10 mệnh đề, 2 bổ đề, 5 hệ quả, 7 nhận xét); 23 ví dụ, 12 bài tập, 4 tình huống, 2 thuật toán, 23 `proof`; 11 đoạn "Trong học máy".
- Bài tập vận dụng về bài toán vận chuyển (khoảng 550 từ) đã bỏ trong lúc soạn lượt 1; ý còn ở mục "Ứng dụng".

## Chỗ chưa chắc

- Số trang của Bertsimas và Tsitsiklis (1997), Bertsekas (2017), Cormen và cộng sự (2009), Sutton và Barto (2018) chưa kiểm vì không có bản cục bộ.
- Trường hợp suy biến của Bổ đề 07.32 chỉ nêu ý tưởng qua phương pháp đơn hình với quy tắc Bland.
