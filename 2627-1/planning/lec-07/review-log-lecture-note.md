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

## Biên tập văn phong theo giáo trình của người dùng (2026-10-11)

Yêu cầu người dùng và quy tắc chung: xem nhật ký Bài 01 (mục cùng tên) và `style-guide.md` (scratchpad phiên). Phạm vi: `materials/lec-07/lecture-note.md`, chỉ lớp văn xuôi dẫn dắt; giữ nguyên toán, công thức, `\tag`, số hiệu, 132 khối, hình, bảng, thuật ngữ, bài tập. Điều phối viên: Claude Fable 5.1 (`claude-fable-5-1`, effort medium); các tác tử sửa tệp khác nhau chạy song song, mỗi tệp một tác tử ghi.

| Vai | Loại tác tử | Mô hình | Effort | Ghi tệp | Kết quả | Quyết định |
|---|---|---|---|---|---|---|
| Biên tập (editor), lượt 1 | general-purpose | Claude Opus 5.5 (`claude-opus-5-5`) | high | Có, chỉ lec-07/lecture-note.md | không đổi tiêu đề; 12 khối kết mục thành 6 cụm văn xuôi; 8 câu dẫn mới; 12 chỗ đổi chủ ngữ vật vô tri; mở chương nối Mệnh đề 06.3 và Bài 02, 03; 33 188 → 34 101 từ | yêu cầu sửa |
| Rà toán và mạch truyện, lượt 1 | general-purpose, chỉ đọc | Claude Opus 5.5 | high | Không | 135 hunk; 264 dòng `:::` và 44 `$$` trùng hash; số hiệu Bài 01, 02, 03, 06 đúng; 0 chặn, 0 nghiêm trọng, 4 trung bình, 11 nhẹ | chấp nhận báo cáo; điều phối viên kiểm trực tiếp Định nghĩa 07.35 (bốn giả thiết) và Bước 2 chứng minh Hệ quả 07.16 (dùng (ii)) |
| Biên tập, lượt 2 (cùng tác tử, SendMessage) | general-purpose | Claude Opus 5.5 | high | Có | Làm đủ 15 mục của `lec07-fixes.md`; 34 134 từ (+2,9 %) | chấp nhận |

### Phát hiện và trạng thái

| Mức độ | Vị trí | Vấn đề | Trạng thái |
|---|---|---|---|
| trung bình | kết Mục 6 | "cần ba giả thiết" trong khi Định nghĩa 07.35 có bốn (thiếu "hữu hạn") và chữ "cần" nói quá | đã sửa |
| trung bình | câu dẫn Hệ quả 07.16 | gán phép đếm cho khẳng định (iii) trong khi Bước 2 dùng (ii) | đã sửa |
| trung bình | kết Mục 2, kết Mục 3 | lượng từ tồn tại ("nghiệm tối ưu nằm trong tập này") và thiếu hụt cuối Mục 2 không phải điều Mục 3 giải quyết | đã sửa |
| trung bình | đoạn kể tóm tắt | số phép tính tuyến tính theo $N$ thiếu điều kiện số trạng thái, số điều khiển bị chặn (Mệnh đề 07.42) | đã sửa |
| nhẹ | 11 mục (giả thiết $c\ne0$ ở câu dẫn Mệnh đề 07.2, Hệ quả 07.21 nêu đủ (a) và (b), lặp ranh giới mục, "Hình trên" ×7, mở Mục 6 trả lại $J_0(\mathrm s)=5$) | | đã sửa toàn bộ |

### Kiểm tra của điều phối viên

- `invariants.py` so với HEAD: `headings`, `display_math`, `tags`, 132 khối, hình, bảng, nhãn bước, `\square` không đổi; `numbered_labels` chỉ đổi số lần nhắc; công thức nội dòng 3541 → 3545.
- grep: "Chuỗi suy luận", "Kết mục", "Mục này" đều 0; "bốn giả thiết của Định nghĩa 07.35" 2; "Tuy nhiên" 9; "Hình trên" 1.
- Playwright Chromium 1600×900 và 390×844 qua `material-viewer.html?doc=materials/lec-07/lecture-note.md&deck=lecture-07-quy-hoach-tuyen-tinh-va-dong.html`: 0 lỗi trang, 0 `.katex-error`, 0 chữ đỏ, 132/132 khối, 14 `h2`, không tràn ngang.
- `material-local-data.js` tạo lại với lec-05, 05b, 05c lấy từ HEAD. `git diff --check` sạch. Quyết định: chấp nhận, commit Bài 07.

## Rà tiêu đề và câu kiểu văn nói (2026-10-11, sau lượt văn phong)

Người dùng phản hồi: tiêu đề "1.1 Biết đích nhưng chưa có cách tới" (Bài 04) và "những tiêu đề hoặc câu kiểu văn nói như thế này cần được viết lại", trong tất cả các bài. Quy tắc (ghi vào bộ nhớ và `style-guide.md`): tiêu đề `##`/`###` là cụm danh từ gọi tên khái niệm, không mệnh đề hay cấu trúc lựa chọn kiểu nói; thân bài không dùng khẩu ngữ hoặc ẩn dụ đời sống ("cái giá", "đổi lại", "chạy ra vô cùng", "dừng ở", "kéo/đẩy", "hai thứ", "lấp thiếu hụt", "Một cách dễ hình dung", "hỏng", "rẻ/tốn", "tốt nhất" thay cho "tối ưu"); nhãn chung "Giả thiết hay bị bỏ quên" đổi thành "Giả thiết thường bị bỏ qua". Giữ các thuật ngữ của chương (ca, điểm chạm, lợi ích rút gọn, sàn nhiễu, cầu nối, hàm thế, tính tay) và các từ "rất", "Thật vậy".

Tác tử: hai tác tử rà (general-purpose, Claude Opus 5.5 `claude-opus-5-5`, high, chỉ đọc) lập báo cáo `colloquial-A.md` (Bài 00–04: 232 tiêu đề rà, 8 không đạt, 223 câu) và `colloquial-B.md` (Bài 05–07, 05b, 05c: 211 tiêu đề rà, 22 không đạt, 163 câu); điều phối viên Fable 5.1 duyệt, quyết định các ngoại lệ ở trên, rồi giao mười tác tử biên tập (cùng tác tử của từng bài, Claude Opus 5.5, high, mỗi tệp một tác tử) áp dụng song song. Tổng cộng 36 tiêu đề `##`/`###` và 7 tên khối đổi sang cụm danh từ, khoảng 560 câu viết lại trên mười bài; các tiêu đề cũ không được tệp nào liên kết theo neo; vài trang chiếu (Bài 00 E01, 04, 05b D06, 06 A03, 07) vẫn mang tiêu đề trang cũ theo chữ, để lượt deck riêng.

Kiểm tra của điều phối viên: `invariants.py` so với HEAD cho mười bài chỉ khác `headings` và `block_open` ở đúng các tiêu đề và tên khối đã đổi, công thức, hình, số hiệu không đổi; grep các cụm khẩu ngữ về 0 (một kết quả còn lại ở Bài 02 là "đổi lại qua hàm mũ" nghĩa đổi ngược, trong bảng); Playwright 1600×900 và 390×844 cho mười bài: 0 lỗi KaTeX, số khối không đổi; `sync-local-materials.py --check` đạt; `git diff --check` sạch. Quyết định: chấp nhận, commit một lần cho mười bài.


Ghi chú biên tập bỏ khỏi thân bài Bài 07 (trong khối Bổ đề 07.32): "; dẫn số mục, chưa đối chiếu trang" (nguồn Bertsimas và Tsitsiklis 1997, §3.2 và §3.4 chưa đối chiếu số trang).

## Thay thuật ngữ học thuật (2026-10-11, sau lượt tiêu đề và câu văn nói)

Người dùng yêu cầu: thay "ca" bằng "trường hợp" và thay mọi thuật ngữ không học thuật tương tự ("điểm chạm", "sàn nhiễu", "tính tay"…) trong tất cả các bài. Bảng thay thế đã chốt (bộ nhớ `academic-terminology`, `terms-apply-brief.md`, `terms-B-decisions.md` trong scratchpad phiên): ca → trường hợp; điểm chạm/chạm → điểm tiếp xúc/tiếp xúc; sàn nhiễu → mức nhiễu nền (noise floor); tính tay → tính thủ công; bất đẳng thức cầu nối → bất đẳng thức liên hệ; phép kiểm/kiểm → kiểm tra; khuôn → sơ đồ (Bài 01 "khuôn chung" → "dạng tổng quát"); bài con/gốc/đối ngẫu/… → bài toán …; nhóm theo nghĩa mini-batch, cỡ nhóm → lô, kích thước lô (theo giáo trình của người dùng: "lô", "kích thước lô"); cỡ bước/kích thước bước → độ dài bước; giảm gradient → hạ gradient (thống nhất với bộ trang chiếu và bài tập); bình phương tối thiểu → bình phương nhỏ nhất; trần → ràng buộc chặn chuẩn/mức chặn; cải dạng → biến đổi bài toán/biến đổi tương đương (reformulation); hạng phạt → số hạng phạt; tung độ cắt → tung độ gốc; khoảng dư → độ dư (slack); điểm cực → điểm cực biên (extreme point); lợi ích rút gọn → chi phí rút gọn (reduced cost, công thức (4.2) đã đúng dấu chuẩn); ma trận phạt → ma trận tiền điều kiện (preconditioner); hai đáy → hai cực tiểu địa phương; ví dụ dẫn → ví dụ xuyên suốt; lặp tốt nhất → điểm lặp tốt nhất. Giữ: hàm thế, quay lui, dừng sớm, hàm bức, bổ đề giảm, cỡ mẫu, kết cục, véc-tơ (Bài 00).

Tác tử: hai tác tử rà thuật ngữ (general-purpose, Claude Opus 5.5 `claude-opus-5-5`, high, chỉ đọc; lần đầu bị dừng vì giới hạn tuần, chạy lại) lập `terms-A.md` (Bài 00–04) và `terms-B.md` (Bài 05–07, 05b, 05c); điều phối viên Fable 5.1 chốt bảng, tra giáo trình của người dùng cho thuật ngữ lô; mười tác tử biên tập (cùng tác tử của từng bài, Claude Opus 5.5, high) áp dụng song song cho ghi chú và exercises.md của bài mình. Tiêu đề, tên khối, nhãn, bảng, alt đổi theo; công thức, số hiệu, số khối không đổi; thuật ngữ tiếng Anh thêm ở lần dùng đầu. Nhãn trong `index.html` cho Bài 05c cập nhật theo tiêu đề mới ("trên lô nhỏ").

Kiểm tra của điều phối viên: `invariants.py` so với HEAD cho mười bài chỉ khác `headings`, `block_open` ở chữ thuật ngữ; grep các từ cũ về 0 (ngoại lệ hợp lệ: "nhóm" nghĩa khác, "cỡ mẫu", "khoảng dương", "kiểm soát"); Playwright 1600×900 và 390×844 cho mười bài: 0 lỗi KaTeX, số khối không đổi; `sync-local-materials.py --check` đạt; `git diff --check` sạch. Quyết định: chấp nhận, commit một lần.

Còn lệch, để lượt riêng: bộ trang chiếu và SVG dùng chung vẫn mang thuật ngữ cũ (deck 01 "ca" 61; deck 02 "cải dạng" 51, "bài gốc" 32; deck 03 "điểm chạm" 12, "tung độ cắt" 11; deck 04 "giảm gradient" 14; deck 05b "sàn nhiễu" 30, "khuôn" 16; deck 06 "ma trận phạt" 8; deck 07 "điểm cực" 42 dòng; SVG ở img/lec-01, 02, 03, 04, 05, 05b, 05c, 07 còn chữ cũ); planning/ là bản ghi lịch sử.

## Bổ sung phương pháp đơn hình vào ghi chú và bài tập (2026-10-23)

Yêu cầu người dùng 2026-10-23: Bài 07 nhận thêm Chương 11 của đề cương (buổi 8). Master duyệt kế hoạch `plan.md` và `master-decisions.md` của phiên (phương án B cho ghi chú). Tác tử soạn học liệu (vai trò worker, Claude Opus 5.5 `claude-opus-5-5`, effort medium theo brief của master; master ghi bằng chứng từ lời gọi công cụ) sửa `materials/lec-07/lecture-note.md`, `materials/lec-07/exercises.md` và chạy lại `material-local-data.js`. Không commit.

### Cấu trúc mới

- §4.4 "Đỉnh kề" giữ Định nghĩa 07.28, Mệnh đề 07.29. §4.5 giữ phát biểu Bổ đề 07.30 (tạm chấp nhận, chứng minh ở §5.2 và §5.4), Thuật toán 07.1, Mệnh đề 07.31, Ví dụ 07.17 (chỉ phần giá trị đỉnh), Bài tập 07.6 (bỏ câu (e)), 07.7. Nhận xét 07.34 cũ thành đoạn bốn câu hỏi sau Ví dụ 07.17 và đoạn kết §4.
- Mục mới "## 5. Phương pháp đơn hình", 7 tiểu mục: 5.1 hướng cơ sở, chi phí rút gọn, điều kiện tối ưu (Ví dụ 07.18, Định nghĩa 07.32, Mệnh đề 07.33 có thêm phần (c) chiều ngược khi không suy biến, Ví dụ 07.19); 5.2 phép thử tỉ số, bước xoay, không bị chặn (Mệnh đề 07.34, chứng minh Bổ đề 07.30 trường hợp không suy biến, Ví dụ 07.20); 5.3 thuật toán và tính hữu hạn (Thuật toán 07.2, Định lý 07.35, Ví dụ 07.21, Nhận xét 07.36, "Trong học máy"); 5.4 suy biến, quay vòng, quy tắc Bland (Ví dụ 07.22, Định nghĩa 07.37, Định lý 07.38 chứng minh ngoài phạm vi kèm ý tưởng, chứng minh Bổ đề 07.30 trường hợp suy biến, Nhận xét 07.39); 5.5 bảng đơn hình (Định nghĩa 07.40, Mệnh đề 07.41 có chứng minh, Ví dụ 07.23, Nhận xét 07.42); 5.6 pha I (Định nghĩa 07.43, Mệnh đề 07.44 có chứng minh kể cả biến nhân tạo bằng 0 còn trong cơ sở, Thuật toán 07.3, Ví dụ 07.24, "Trong học máy"); 5.7 hiệu quả (Ví dụ 07.25 Klee–Minty $n=2$, Nhận xét 07.45, đoạn hình học cột, "Trong học máy", đoạn kết nối sang quy hoạch động). Bài tập 07.8–07.13 ở cuối §5.
- Quy hoạch động thành §6–§7; thẻ (5.x) → (6.x), (6.x) → (7.x); (4.1)–(4.2) → (5.1)–(5.2); thẻ mới (5.3) phép thử tỉ số, (5.4) bảng đơn hình, (5.5) bài toán phụ.
- Bảng ánh xạ số hiệu đầy đủ: `scratchpad/plan/renumber-map.md` của phiên (bản cuối). Áp dụng bằng script thay thế qua placeholder; kiểm bằng script đối chiếu mọi trích dẫn có nhãn với khối được định nghĩa (đúng loại, không trùng, không nhảy số): 54 số hiệu chung, 30 ví dụ, 18 bài tập trong ghi chú, 4 thuật toán, 4 tình huống, 0 trích dẫn hỏng trong cả hai tệp.

### Quyết định của tác tử soạn (chờ master duyệt)

| Quyết định | Lý do |
|---|---|
| Sáu bài tập đơn hình đặt cuối §5 (07.8–07.13), chép sang `exercises.md`; "Bài tập củng cố" nhận thêm câu 7–8 (đúng/sai về suy biến và quy tắc Bland) trong Bài tập 07.16 | Giữ quy ước hiện có: `exercises.md` chép các bài trong mục, không chép bài củng cố; tránh đánh số bài củng cố xen giữa bài trong mục |
| Bài tập không bị chặn và Klee–Minty dùng biến thể khác ví dụ (bỏ hai giới hạn hộp hạt; đổi đơn vị $y_1=20x_1$) | Ví dụ 07.20 (G6) và Ví dụ 07.25 (G8) đã chạy đúng hai bài đó; tránh trùng lặp |
| Ví dụ "70 giờ máy" của kế hoạch chuyển thành Bài tập 07.11 (G7) | Phản ví dụ chiều ngược của điều kiện tối ưu đã có ở Tình huống 07.2; bài tập kiểm tra cùng hiện tượng trên ví dụ xuyên suốt |
| Giá trị mục tiêu của bài toán phụ ký hiệu $\tilde z$, $\tilde z^*$ | $w$ đã dùng cho điểm cực biên; mỗi chữ một nghĩa |
| Chỉ số biến cơ sở trong (5.3) viết $i\in B$ thay $j'$ | Khớp ký hiệu kế hoạch mặt trang; bảng công thức cần nhớ sửa theo |
| Dùng ba SVG mới của deck (`reduced-cost-edge.svg`, `simplex-two-paths.svg`, `degenerate-vertex-boxes.svg`) trong §5.1, §5.3, §5.4, alt theo `desc` của tệp | Hình đọc trong văn bản; nếu tác tử deck đổi nội dung hình, alt và đoạn đọc hình phải sửa theo |
| Nguồn bài hộp hạt ghi theo Bài tập chương 8, câu 5 (giữ bộ số, đổi cách diễn giải đơn vị) ở đoạn sau bảng ký hiệu và trong `exercises.md` | Quyết định master |
| Không dùng chuỗi $\text{...}$ có chữ Việt trong công thức | KaTeX cảnh báo ký tự không có metric; câu "với các ràng buộc" chuyển ra văn bản |

### Giáo trình và nguồn đã tham khảo (không dịch, không chép)

| Mục | Nguồn và vị trí | Điều lấy ý |
|---|---|---|
| 5.1 | Bertsimas và Tsitsiklis (1997), §3.1, Định lý 3.1 (chỉ theo mục, không có bản cục bộ); bài giảng Chương 8 phần 3 (Nguyễn Bích Vân 2025), mục 2.1–2.2 | thứ tự: chi phí rút gọn → điều kiện tối ưu hai chiều; chiều cực tiểu đổi dấu |
| 5.2 | B&T §3.2; bài giảng phần 3, mục 3–5 (cải thiện chi phí, không bị chặn, $\theta^*$); Vanderbei (2014) §2.4, tr. 18 | phép thử tỉ số, chứng minh $B'$ là cơ sở |
| 5.3 | B&T §3.2, Định lý 3.3 và các quy tắc chọn; bài giảng phần 3, mục 6–6.1; Kupferschmid (2023) §4.4.1, tr. 151–152 | thuật toán, tính hữu hạn khi không suy biến, quy tắc chọn cột (cạnh dốc nhất) |
| 5.4 | Vanderbei (2014) §3.1–3.2, tr. 25–28 (bước xoay suy biến, ví dụ quay vòng sáu bước), §3.3, tr. 28–30 (nhiễu, từ điển), §3.4, tr. 31–33 (Định lý 3.3, ý tưởng chứng minh); B&T §3.4; Kupferschmid §4.5.3, tr. 160–163; bài giảng phần 3, mục 6.2–6.3 | quay vòng, quy tắc Bland, cách bộ giải thực tế xử lý suy biến |
| 5.5 | bài giảng phần 4, mục 2–3 (đơn hình cải tiến, dạng bảng); B&T §3.3; Kupferschmid §2.2–2.6, tr. 57–71, §4.2, tr. 137–145 | bảng, phép xoay là biến đổi hàng, so sánh chi phí bảng và đơn hình cải tiến |
| 5.6 | Vanderbei §2.3, tr. 16–18 và §3.5, tr. 33; Kupferschmid §2.8.2, tr. 78–82; B&T §3.5; bài giảng phần 4, mục "Tìm BFS ban đầu" | bài toán phụ, khả thi ⇔ giá trị phụ bằng 0, đưa biến nhân tạo ra khỏi cơ sở, định lý cơ bản |
| 5.7 | Vanderbei §4.4, tr. 41–44 (Klee–Minty, $2^n-1$, không bất biến theo đơn vị), §4.5, tr. 44–50 (số bước thực nghiệm); B&T §3.6–3.7 và Chương 8–9 (chỉ theo mục) | trường hợp xấu nhất, hình học cột, thuật toán đa thức |
| Bài tập | Bài tập chương 8 (câu 5: hộp hạt, đơn hình dạng bảng) | ví dụ xuyên suốt |

`simplex-method 1.pdf` (MIT) không được trích theo điều kiện 4 của master.

### Kiểm số liệu

Mọi đáp số của §5 và Bài tập 07.8–07.13 tính lại bằng phân số chính xác: `python3 scratchpad/work/verify.py` (hộp hạt Dantzig và Bland; lợi ích $(2,4)$; 70 giờ máy với hai cách phá hòa; biến thể $x_1+x_2\le30$; Ví dụ 07.20; biến thể không bị chặn; bài đa giác của Bài tập 07.6; pha I với hợp đồng 40 và 60; pha II; Klee–Minty gốc và đổi đơn vị) cùng `scratchpad/plan/simplex.py`, `extra.py`, `extra2.py` của tác tử lập kế hoạch. Mọi bảng, tỉ số, chi phí rút gọn và giá trị trong ghi chú khớp đầu ra.

### Kiểm kỹ thuật

- `python3 2627-1/scripts/sync-local-materials.py` rồi `--check`: OK (23 tệp). `git diff --check`: sạch.
- Playwright Chromium qua `python3 -m reloadserver 8765` (máy chủ đang chạy), `material-viewer.html?doc=materials/lec-07/{lecture-note,exercises}.md&deck=lecture-07-quy-hoach-tuyen-tinh-va-dong.html`, 1600×900 và 390×844: 0 `.katex-error`, 0 cảnh báo KaTeX sau khi bỏ `\text{với}`, không tràn ngang; 15 `h2` (có "5. Phương pháp đơn hình", "6.", "7."); ba SVG mới tải được (naturalWidth > 0). Lỗi console duy nhất là CSP chặn script nội tuyến do máy chủ tải lại chèn vào, không thuộc tệp học liệu. Ảnh chụp ở `scratchpad/shots/`.
- Liên kết trang trong `exercises.md` đối chiếu bằng Playwright với deck hiện tại: `#/5/1` S00, `#/5/13` S11, `#/5/14` S11b, `#/6/1` D01, `#/6/9` D06, `#/6/10` D06b, `#/7/1` Z00; mạch 1–4 không đổi.

### Tự kiểm `no-ai-slop` (Edit mode, đối chiếu `eval.md`)

Giữ giọng giáo trình ("chúng ta" cho kế hoạch và giới hạn, "ta" trong phép tính), không "hãy", không câu hỏi tu từ, không tài liệu làm chủ ngữ; grep trong §5: "ta thấy", "rõ ràng", "Mục này", "dễ thấy", dấu "?", gạch ngang dài đều 0. Một câu "Đây mới là mô tả" sửa thành câu nêu rõ trực quan chưa phải định nghĩa. Mỗi tiểu mục mở bằng bài toán có số trên dữ liệu hộp hạt, kết bằng đoạn văn xuôi nêu kết quả, thiếu hụt và tiểu mục sau. Thuật ngữ theo bảng đã chốt ("tính thủ công", "biến bù/dư", "ràng buộc hoạt động").

### Việc còn mở

- Ghi chú dài khoảng 49 300 từ (trước đợt khoảng 35 600), vượt mức thường 8 000–20 000 từ; cần master quyết có tách §5 thành ghi chú bổ trợ hay chấp nhận, và ghi lý do.
- Chưa có rà toán và rà mạch truyện độc lập cho §5.
- Câu nối Z02 của deck và đoạn "Giới hạn còn lại" của ghi chú cùng nêu luồng mạng (Buổi 9); tác tử deck cần đối chiếu câu chữ.

## Vòng chỉnh sửa sau năm vai rà soát (2026-10-23)

Tác tử chỉnh sửa học liệu (worker, Claude Opus 5.5 `claude-opus-5-5`, effort medium theo brief của master; master ghi bằng chứng từ lời gọi công cụ). Nguồn: `scratchpad/review/master-revise-decisions.md` (ghi đè), `gate-findings.md`, `r1-report.md` … `r5-report.md`. Phạm vi ghi: `materials/lec-07/lecture-note.md`, `materials/lec-07/exercises.md`, tệp này, `material-local-data.js` (qua script). Không đổi số khối nào; `renumber-map.md` không đổi. Không commit.

### Bảng phát hiện của đợt (phần học liệu)

| mức độ | mục | vấn đề | nguồn (vai) | quyết định master | trạng thái |
|---|---|---|---|---|---|
| nghiêm trọng | Mục tiêu học tập | câu quy trình nội bộ "Theo yêu cầu người dùng…", số mục 11.x | R4#1, R1 | QĐ 1: chấp nhận | đã sửa: "Bài 07 gồm nội dung Buổi 7 và Buổi 8 (Chương 11) của đề cương." |
| trung bình | §4.5 kết, mở §5 | đếm câu hỏi 4 so với 5 | R4#2, R5 T2, R2, R1 | QĐ 2 | đã sửa: khung bốn câu hỏi, câu 1 tách ba phép tính, ánh xạ tới 5.1–5.7 |
| trung bình | §5.3 sau hình hai đường | lý do hai đường cùng đỉnh dừng (G-1, phần ghi chú) | gate G-1, R3 | QĐ 3 | đã sửa: nghiệm duy nhất vì mọi $\bar c_j<0$ chặt; khi $\bar c_j=0$ đỉnh dừng có thể khác; Bài tập 07.8(c) nêu đỉnh dừng của Bland |
| trung bình | Bảng ký hiệu, §5 | $u$, $y$, $r$, $t$ trái cam kết "mỗi chữ một nghĩa" | R1 | QĐ 10 | đã sửa: $u\to\alpha$, $y\to x^+$ (Mệnh đề 07.34) và $\eta$ (Mệnh đề 07.41, 07.44), hàng xoay $r\to p$, $t,r\to j_{\max},j_0$; câu cam kết đổi thành "mỗi ký hiệu trong bảng…; ký hiệu cục bộ chỉ mang nghĩa trong khối" |
| trung bình | §5.4, Mệnh đề 07.33, §5.3 | tham chiếu tiến tới Tình huống 07.2 với số liệu chưa có | R1, R4#9 | QĐ 10 | đã sửa: bỏ đoạn Tình huống 07.2 ở §5.4; Phạm vi 07.33 dẫn Bài tập 07.11(d); sau Định lý 07.35 dẫn đỉnh $(30,0)$ của Ví dụ 07.22 |
| trung bình | §5.6 Mệnh đề 07.44, Thuật toán 07.3 | thiếu trường hợp hàng thừa | R2 | mặc định chấp nhận | đã sửa: đoạn hàng thừa trong chứng minh (c), Phạm vi, đầu vào Thuật toán 07.3 không cần biết hạng, bước 4 bỏ hàng thừa |
| trung bình | §5.4 | quay vòng dùng trước khi định nghĩa | R4#7 | QĐ 10 | đã sửa: Định nghĩa 07.37 thành "(Quay vòng, quy tắc Bland)" có phần định nghĩa quay vòng; không đổi số |
| trung bình | §5.3 "Trong học máy" và ba đoạn `linprog` | ghi chú phần mềm, lặp | R4#8, R4#13, R2 | QĐ 10 | đã sửa: viết lại đoạn 5.3 theo đối tượng hồi quy $L_1$; gộp `linprog`, mã `status`, đơn hình đối ngẫu (giữ $\bar c\le0$, khôi phục $x_B\ge0$) vào một đoạn ở 5.7; bỏ mã `status` ở 5.6 |
| trung bình | ranh giới §5/§6 | đoạn kết §5 đứng trước bài tập; câu nối hai phía | R5 T5, R4#10 | QĐ 10 (giữ vị trí bài tập) | đã sửa: đoạn kết chuyển xuống sau Bài tập 07.13; câu cuối rút, phần nhu cầu theo giai đoạn để §6 mở |
| trung bình | chứng minh 07.33, Bổ đề 07.30 | trình bày chưa sáng sủa; $m$, $A$ hai nghĩa | R4#11, R2, R1 | QĐ 10 (không tách bổ đề mới) | đã sửa: Bước 1 của 07.33 thành `aligned` một quan hệ một dòng, công thức (a) trên dòng riêng; Bước 1 Bổ đề 07.30 chia 1a–1c, $G\in\mathbb R^{p\times n}$, $h$, $\eta$, câu "khi $P$ đã ở dạng chuẩn, bỏ qua" |
| trung bình | 1493, 1549, 1973, Nhận xét 07.42 | nhiều ý một đoạn | R4#12 | chấp nhận | đã sửa: tách đoạn; quy ước dấu chuyển sau Định nghĩa 07.32; Nhận xét 07.42 rút gọn |
| trung bình | Mục 5 độ dài | cần rút ~1 000 từ | R4#13 | QĐ 10 | một phần: rút lộ trình mở mục, đoạn Tình huống 07.2, câu Bài tập chương 8, Nhận xét 07.42, hình học cột; thêm nội dung bắt buộc (hàng thừa, 07.12(d), Bảng 1 của 07.8) bù lại, số từ ghi ở dưới |
| nhẹ | Bài tập mạch 5 | thiếu mức vận dụng vào AI | R4#14 | QĐ 11 | đã thêm Bài tập 07.12(d) (phân bổ giờ GPU, yêu cầu $x_1\ge70$) ở cả hai tệp; đáp số kiểm bằng script |
| nhẹ | Định nghĩa 07.43 | câu tự mâu thuẫn $b\ge0$ / $b_i<0$ | R3, R4#15 | chấp nhận | đã sửa |
| nhẹ | Nhận xét 07.39 | "ví dụ nhỏ nhất thường được trích" sai nguồn; câu ba vị ngữ | R2, R4#16 | chấp nhận | đã sửa theo Vanderbei tr. 26–27 (ít nhất bốn biến, hai ràng buộc); câu ba cách xử lý suy biến song song |
| nhẹ | Nhận xét 07.36 | cạnh dốc nhất so sai đối tượng | R2 | chấp nhận | đã sửa: so với quy tắc chọn cột đầu tiên (Kupferschmid tr. 152) |
| nhẹ | §5.7 "luôn kèm"; "cơ sở cũ thường chỉ cần vài bước" | nói quá, không nguồn | R2, R4#16 | chấp nhận | đã sửa: "phần lớn bộ giải thực tế"; "điểm xuất phát gần nghiệm mới" |
| nhẹ | tài liệu tham khảo Vanderbei §2.3 | pha I dùng một biến $x_0$ | R2 | chấp nhận | đã ghi |
| nhẹ | "từ điển" hai nghĩa | lexicographic / dictionary | R2 | chấp nhận | đã sửa: "quy tắc thứ tự từ điển"; "từ điển (dictionary)" cho Vanderbei |
| nhẹ | Nhận xét 07.42 | "đơn hình sửa đổi" | R2 | chấp nhận | đã thêm "còn gọi là đơn hình sửa đổi" |
| nhẹ | Tình huống 07.2 bước 2 | thiếu tỉ số $x_1$: 180, biến ra, cơ sở | R3 | chấp nhận | đã sửa; câu về cơ sở thứ ba viết lại |
| nhẹ | §4.5 đoạn đầu | phạm vi chứng minh Mục 5.2 | R3 | chấp nhận | đã sửa ("trường hợp điểm cực biên không suy biến") |
| nhẹ | Ví dụ 07.22 | đánh số bước 1–4 lệch S07 (0–3) | R3 | chấp nhận | đã sửa thành Bước 0–3 và các chỗ dẫn ("bước 1" suy biến, "bước 0" chọn $x_1$) |
| nhẹ | Ví dụ 07.22 / S07 | ví dụ dùng thứ tự Bland trước khi gọi tên; Diễn giải chưa nêu tỉ số hòa | G-3, R4#5 | QĐ 7 | đã sửa: câu "Đây là quy tắc Bland…"; Diễn giải nêu tỉ số hòa ở bước 0; đoạn "Quy tắc Bland không tránh bước xoay suy biến" sau định nghĩa |
| nhẹ | Ví dụ 07.24 | không nói vì sao pha II dùng Dantzig | R1, R3 | chấp nhận | đã sửa: nêu đường Bland qua $(26,14)$, $z=94$ |
| nhẹ | Bài tập 07.8(a) | "bảng" hai nghĩa; thiếu Bảng 1 | R1, R4#28 | QĐ 9 | đã sửa đề và thêm Bảng 1 đầy đủ |
| nhẹ | Bài tập 07.10(c), (d) | "bước 4" mơ hồ; lập luận bị chặn chưa đủ | R1, R3, R4#27 | chấp nhận | đã sửa |
| nhẹ | exercises.md 07.9 | "thay câu (e) cũ" | R1, R3, R4#18 | QĐ 1 | đã bỏ |
| nhẹ | LLO21 dòng mục tiêu | không song song | R4#18 | chấp nhận | đã sửa |
| nhẹ | §5 câu dẫn lấy tài liệu làm chủ ngữ | "Ví dụ sau…", "Mệnh đề sau…" | R4#25 | chấp nhận | đã sửa 7 chỗ |
| nhẹ | §5.7, §5.6, Ví dụ 07.23 | câu mơ hồ, ngoặc kép, hai chấm kiểu tiết lộ | R4#26 | chấp nhận | đã sửa |
| nhẹ | nguồn hộp hạt, tham chiếu "bài giảng Chương 8" | nguồn nêu hai kiểu, ở đoạn ký hiệu | R4#17 | chấp nhận | đã sửa: dẫn Nguyễn Bích Vân (2025); nguồn hộp hạt chỉ ở mục tài liệu tham khảo; bỏ câu ở mở §5.5 |
| nhẹ | Tiêu đề §5.6 | "cơ sở khả thi ban đầu" lệch "cơ sở xuất phát" | R4#20 | chấp nhận | đã đổi "5.6 Cơ sở khả thi xuất phát và pha I" |
| — | R4#10 phân bố bài tập vào từng tiểu mục | | R4#10 | QĐ 10: bác bỏ | không sửa |
| — | R4#11(b) tách bổ đề có số | | R4#11 | QĐ 10: bác bỏ (tránh đánh số lại) | chia bước con thay thế |
| — | R4#29, R4#30, R4#3–#6, #19, #21–#24; R5 N1–N8, T1, T3, T4; R1/R2/R3 phần deck, Z01 | thuộc deck/planning | — | — | chuyển tác tử deck |

### Kiểm

- Số liệu: `python3 scratchpad/work/verify.py` (như vòng trước) và `python3 scratchpad/work/verify2.py` (pha II theo Bland qua $(26,14)$, $z=94$; Bài tập 07.12(d): một bước xoay, $\tilde z^*=-10$, $\bar c=(x_2{:}-\tfrac13,\ s_2{:}-\tfrac13,\ s_4{:}-1)$; Tình huống 07.2 tỉ số $x_1$: 180; Bài tập 07.8 theo Bland dừng $(30,12)$ với $\bar c_{s_1}=0$). Khớp.
- Trích dẫn: `scratchpad/work/cites.py`: 839 trích dẫn có nhãn trong hai tệp, 0 hỏng; số hiệu liên tục (54 chung, 30 ví dụ, 18 bài tập, 4 thuật toán, 4 tình huống); Bài tập 07.8–07.13 trùng khớp giữa hai tệp.
- Liên kết `exercises.md`: deck hiện có 17 trang mạch 5 (thêm S08b, S09c, S10b); tạm trỏ S11 = `#/5/16`, S11b = `#/5/17` (đối chiếu Playwright với deck lúc sửa); chờ master xác nhận vị trí cuối.
- Kỹ thuật: `sync-local-materials.py` và `--check` OK; `git diff --check` sạch. Playwright 1600×900 và 390×844, ghi chú và bài tập: 0 `.katex-error`, 0 cảnh báo KaTeX, không tràn ngang; đã xem ảnh Định nghĩa 07.37 mới. Lỗi console duy nhất vẫn là CSP chặn script nội tuyến của máy chủ tải lại.
- Số từ (`wc -w`): ghi chú 49 321 → 50 137 (+816), `exercises.md` 10 521 → 10 963. Phần rút gọn theo R4#13 bị bù bởi nội dung bắt buộc thêm (hàng thừa của pha I, Bài tập 07.12(d), Bảng 1 của 07.8, đoạn nghiệm duy nhất, định nghĩa quay vòng). Việc rút sâu hơn hoặc tách §5 chờ master.

### Tái kiểm toán (R3 recheck, 2026-10-23)

| mức độ | mục | vấn đề | nguồn (vai) | quyết định master | trạng thái |
|---|---|---|---|---|---|
| nhẹ | Chứng minh Mệnh đề 07.44, Bước 4 (không có giả thiết hạng); Thuật toán 07.3 bước 4 | câu "với một $k$ có $\eta_k\ne0$ … pha I tiếp tục" chưa chỉ phương trình nào thừa và gợi ý chạy lại pha I | R3 recheck (`r3-recheck.md`) | chấp nhận | đã sửa: chọn $k=r$ là chỉ số của $\tilde s_r$ ở hàng $p$, $\eta_r=1$; bỏ hàng $p$ và cột $\tilde s_r$, tiếp tục đưa biến nhân tạo còn lại ra với $m-1$ phương trình; Thuật toán 07.3 bước 4 viết khớp. `exercises.md` không có câu tương ứng |
