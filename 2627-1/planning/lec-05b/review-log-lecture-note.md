# Nhật ký rà soát Bài 05b — ghi chú bài giảng viết lại theo tiêu chuẩn giáo trình

Tệp sản phẩm: `materials/lec-05b/lecture-note.md` (viết lại hoàn toàn, ghi đè bản cũ 13 170 từ; bản cũ còn trong git). Không vẽ SVG mới; ghi chú dùng đủ 18 SVG có sẵn trong `img/lec-05b/` (dùng chung với bộ trang chiếu), không sửa hình nào. Lượt 2 sửa kèm chỉ nhãn và tham chiếu trong `materials/lec-05b/exercises.md`, `materials/lec-05/lecture-note.md`, `materials/lec-06/lecture-note.md` (mục "Sửa kèm"). Bộ trang chiếu, CSS, viewer, `index.html` và `material-local-data.js` không bị sửa; `sync-local-materials.py` chưa chạy (điều phối viên chạy). Chưa commit.

Bản thảo được soạn trong thư mục scratchpad của phiên bằng các tệp nguồn `src/p00…p11.md` có nhãn ký hiệu (`{#thm:…}`, `[[#…]]`); script `build.py` đánh số tự động và sinh tệp Markdown cuối cùng, nên không có tham chiếu treo. Script kiểm số liệu nằm ở `/tmp/claude-1000/chk05b/` (không thuộc kho).

## Tác tử

| Vai | Loại tác tử | Mô hình | Effort | Ghi chú |
|---|---|---|---|---|
| Soạn (authoring), lượt 1 | general-purpose | Claude Opus 5.5 (`claude-opus-5-5`) | high | Theo brief của điều phối viên Fable 5.1 ngày 2026-10-10; tác tử tự ghi dòng này, điều phối viên đối chiếu với lời gọi công cụ. |
| Rà toán (math accuracy), lượt 1 | general-purpose | Claude Opus 5.5 (`claude-opus-5-5`) | high | Chỉ đọc; theo ghi nhận của điều phối viên, báo cáo được đối chiếu và hợp nhất vào "Phát hiện lượt 1". |
| Rà mạch truyện (storyline), lượt 1 | general-purpose | Claude Opus 5.5 (`claude-opus-5-5`) | high | Chỉ đọc; như trên. |
| Chỉnh sửa (editor), lượt 2 | general-purpose (cùng tác tử soạn, tiếp tục qua SendMessage) | Claude Opus 5.5 (`claude-opus-5-5`) | high | Áp dụng quyết định "yêu cầu sửa" lượt 1; được phép sửa kèm nhãn trong `exercises.md` 05b và tham chiếu trong ghi chú Bài 05, 06; tác tử tự ghi dòng này. |
| Rà lại lượt 2 (rà toán, rà mạch truyện) | general-purpose | Claude Opus 5.5 (`claude-opus-5-5`) | high | Chỉ đọc; theo ghi nhận của điều phối viên, báo cáo được đối chiếu và hợp nhất vào "Phát hiện lượt 2". |
| Chỉnh sửa (editor), lượt 3 | general-purpose (cùng tác tử soạn, tiếp tục qua SendMessage) | Claude Opus 5.5 (`claude-opus-5-5`) | high | Áp dụng quyết định "chấp nhận sau sửa nhẹ" lượt 2; tác tử tự ghi dòng này. |

Kỹ năng `no-ai-slop` được nạp bằng công cụ `Skill` (chế độ Edit) trước khi soạn; tự đối chiếu `eval.md` ở mục "Tự kiểm `no-ai-slop`".

## Quyết định của điều phối viên

| Lượt | Đầu ra | Quyết định | Lý do |
|---|---|---|---|
| 1 | Bản soạn 32 308 từ, 137 khối | yêu cầu sửa | A1–A3 nghiêm trọng (bát giác bất biến thay cho quả cầu ở Tình huống 05b.2; số bước của bước hằng tốt nhất; nhãn cũ ở `exercises.md`, Bài 05, Bài 06); B1–B9 trung bình; nhóm C nhẹ. Độ dài chấp nhận khoảng 31 300–31 800 với gói cắt được duyệt; cấm cắt Bài tập 05b.2, 05b.7, Ví dụ 05b.19, 05b.29 (số hiệu lượt 1), Hệ quả 05b.17. |
| 2 | Bản chỉnh sửa 32 955 từ, 139 khối | chấp nhận sau sửa nhẹ | Độ dài 32 955 từ chấp nhận vì các phần thêm là bắt buộc, cùng mức các bài khác. Quyết định về T6: giữ chứng minh đầy đủ của Định lý 05b.39; quyết định "T6 chỉ phát biểu" ngày 2026-10-07 áp dụng cho bộ trang chiếu, còn ghi chú theo tiêu chuẩn giáo trình ngày 2026-10-09 ưu tiên chứng minh đầy đủ. Trùng Bài 6.1–6.2 của `exercises.md`: chấp nhận; đổi đề ở `exercises.md` là việc riêng, chưa giao. Một mục trung bình (Nhận xét 05b.42) và nhóm nhẹ ở "Phát hiện lượt 2". |
| 3 | | chấp nhận | Điều phối viên Fable 5.1 xác nhận hai tác tử rà lại lượt 2 là general-purpose, Claude Opus 5.5 (`claude-opus-5-5`), effort high; Playwright 1600×900 và 390×844 cho ghi chú 05b, exercises 05b, ghi chú Bài 05 và 06: 0 lỗi trang, 0 `.katex-error`, 0 chữ đỏ KaTeX, 139/139 khối, không tràn ngang; `git diff --check` sạch; `sync` chạy khi commit. Độ dài 33 140 từ chấp nhận. Giữ bốn quyết định người dùng 2026-10-07 về ký hiệu và cấu trúc; T6 có chứng minh theo tiêu chuẩn giáo trình (quyết định cũ 'chỉ phát biểu' áp dụng cho deck). Ghi chú này thay thế bản cũ `materials/lec-05b/lecture-note.md`; exercises 05b chỉ đổi nhãn; ghi chú Bài 05, 06 chỉ đổi tham chiếu nhãn cũ sang số hiệu 05b.k/05c.k. |

## Số liệu của bản lượt 3

- 33 140 từ (`wc -w`), tăng khoảng 185 từ so với lượt 2 (viết lại Nhận xét 05b.42, câu H4 và Polyak, tách nguồn của Định lý 05b.39, danh sách bất đẳng thức của bát giác, bốn giá trị đầu mút ở Ví dụ 05b.26).
- 139 khối mở = 139 đóng, không lồng; số hiệu không đổi so với lượt 2 (Nhận xét 05b.42 chuyển xuống sau Ví dụ 05b.25, không vượt khối đánh số chung nào).

## Phát hiện lượt 2 và cách xử lý

| # | Mức độ | Vị trí (lượt 2) | Vấn đề | Cách xử lý (lượt 3) | Trạng thái |
|---|---|---|---|---|---|
| 1 | trung bình | Nhận xét 05b.42 | "có một điểm lặp gần điểm dừng" sai; vị trí trước ví dụ | Viết lại: một điểm lặp có chuẩn gradient nhỏ (điểm dừng xấp xỉ), không nói gần điểm dừng hay cực tiểu; mất mát logistic của Ví dụ 05b.4 có $\phi'\to0$ nhưng không có điểm dừng; điểm dừng thật có thể là cực đại hay yên ngựa. Chuyển xuống sau Ví dụ 05b.25; số hiệu giữ 05b.42 | đã sửa |
| 2 | nhẹ | "Trong học máy" sau Định lý 05b.34, sau Định lý 05b.26; Ứng dụng | Thiếu H4; trung bình Polyak | Thêm "khi mất mát có điểm cực tiểu (H4), điều sai với logistic không chính quy trên dữ liệu tách được"; ba chỗ viết "trùng với trung bình Polyak của Bài 06, sai khác một chỉ số (Bài 06 bỏ điểm đầu)" | đã sửa |
| 3 | nhẹ | Định lý 05b.39 | Nguồn "mục 1" lệch "mục 2.1"; Phạm vi | Đoạn sau định lý dẫn "mục 2.1" cả hai chỗ; câu nguồn và câu "cận không chứa $D^2$" chuyển xuống đoạn sau chứng minh; Phạm vi nêu giới hạn: phải dùng đúng $\mu$, H6a chỉ trên vùng chứa dãy | đã sửa |
| 4 | nhẹ | Ví dụ 05b.3 (bảng), §3.3, toàn tệp | $(0,c)$ còn sót; $\vartheta$ giống $\theta$; $\varphi$ giống $\phi$ | $(0,c)\to(0,\upsilon)$ ở hai chỗ còn sót; $\vartheta\to\upsilon$ toàn tệp ($\varkappa$ không dùng vì giống $\kappa=L/\mu$; $\upsilon$ chưa dùng); $\varphi(Ax)\to\chi(Ax)$ ($\chi$ chưa dùng) | đã sửa |
| 5 | nhẹ | §2.2, §1.2, thiếu hụt 1 của Mục 3, mở Mục 7, Tình huống 05b.2, Ví dụ 05b.26, tài liệu | Câu chữ, trình bày | Thêm câu "Ví dụ 05b.6 ở Mục 2.3 kiểm Bổ đề 05b.6 và 05b.7 tại $x_0$"; "trong ba dạng tất định"; "trong thực hành thường chỉ biết"; mở Mục 7 ghi "với bước $\tfrac1L$"; tám bất đẳng thức của bát giác đưa lên `$$`, lập luận bất biến thành danh sách ba bước, bỏ "Nguyên nhân:"; Ví dụ 05b.26 ghi rõ bốn giá trị $2-5\eta$, $2-7\eta$, $-2+5\eta$, $-2+7\eta$; tài liệu thêm Bổ đề 04.21 | đã sửa |
| 6 | nhẹ | Nhật ký | Trỏ sai, số ví dụ | Bài 2.3 trỏ đoạn sau Bổ đề 05b.6; Bài 3.3 trỏ đoạn sau Định lý 05b.16; số ví dụ ghi 28; ghi quyết định T6 | đã sửa |

Sửa kèm lượt 3: `materials/lec-05b/exercises.md` dòng 258, "như hàm logistic một chiều ở phần B" → "ở Ví dụ 05b.4" (một nhãn; không đổi lời giải).

Kiểm kỹ thuật lượt 3: script cấu trúc (139 khối, 0 lồng, 0 tham chiếu treo, 0 chuỗi nội dòng từ ba dấu quan hệ), lệnh KaTeX đều có (thêm `\upsilon`, `\chi`), `git diff --check` sạch; Playwright 1600×900 và 390×844 cho ghi chú 05b và bài tập 05b: 0 lỗi trang, 0 `.katex-error`, 0 chữ đỏ, 0 cảnh báo KaTeX, 18/18 hình (ghi chú), không tràn ngang (1585 ≤ 1600, 375 ≤ 390), 3 647 và 622 nút KaTeX; lỗi CSP của viewer như các lượt trước. Đã xem ảnh chụp danh sách bát giác của Tình huống 05b.2 (`/tmp/claude-1000/shots05b/r3-oct.png`): khối `$$` và danh sách lồng trong mục 3 hiển thị đúng.

## Số liệu của bản lượt 2

- 32 955 từ (`wc -w`), tăng khoảng 650 từ so với lượt 1 dù đã thực hiện gói cắt được duyệt; lý do ở mục "Độ dài".
- 139 khối mở = 139 dòng `:::` đóng, không lồng: 10 định lý, 9 bổ đề, 5 mệnh đề, 7 hệ quả, 8 định nghĩa, 9 nhận xét, 2 thuật toán, 28 ví dụ, 3 tình huống, 9 bài tập, 9 gợi ý, 9 lời giải, 31 chứng minh (mọi định lý, mệnh đề, bổ đề, hệ quả đều có chứng minh; Định lý 05b.39 nay có chứng minh).
- Bộ đếm chung 05b.1–05b.48; Ví dụ 05b.1–05b.28; Bài tập 05b.1–05b.9; Tình huống 05b.1–05b.3; Thuật toán 05b.1–05b.2.
- Công thức đánh số thêm (5.6) (đệ quy của bước giảm dần) và (5.7) (cận của Định lý 05b.39).
- 36 tham chiếu `01.k`, `04.k`, `05.k`, `05c.k` khác nhau, đối chiếu loại khối và số hiệu với bốn tệp ghi chú: 36/36 đúng (số hiệu `05c.k` theo bản 05c hiện có trong cây làm việc).

## Phát hiện lượt 1 và cách xử lý

Các mục do điều phối viên hợp nhất từ báo cáo rà toán và rà mạch truyện. Vị trí ghi theo số hiệu và dòng của lượt 1. Không xóa phát hiện nào.

| # | Mức độ | Vị trí (lượt 1) | Vấn đề | Cách xử lý (lượt 2) | Trạng thái |
|---|---|---|---|---|---|
| A1 | nghiêm trọng | Tình huống 05b.2 | "Dãy ở lại quả cầu $\lVert\zeta\rVert\le2{,}1$" sai (rút liên tiếp quan sát 1 cho $\lVert\zeta_k\rVert^2\to\tfrac{40}9>4{,}41$) | Thay bằng bát giác $\mathcal O$ có tám đỉnh và tám bất đẳng thức; chứng minh bất biến: mỗi bước là ánh xạ affine, $32$ điểm ảnh của đỉnh (bước $0{,}2$) nằm trong $\mathcal O$, kiểm bằng phân số chính xác (`/tmp/claude-1000/chk05b/oct.py`); bước nhỏ hơn là tổ hợp lồi; $x_0$ là đỉnh. Phương sai lồi nên lớn nhất tại đỉnh, bằng $\tfrac72$ tại $(1,0)$ (kiểm lại bằng tay trong "Kiểm tra lại"); $\sigma^2=3{,}5$, sàn $0{,}9\overline3$, gấp khoảng $26$ lần giá trị đo $\tfrac8{225}$. Bỏ phần mô phỏng; "Giới hạn" không còn câu "kiểm bằng mô phỏng" | đã sửa |
| A2 | nghiêm trọng | Ví dụ 05b.21, đoạn trước Hệ quả 05b.37 | "2824 bước của bước hằng tốt nhất" sai | Ghi hai số đúng vai: bước $0{,}001875$ (chia đều sai số) cần $2824$; bước hằng tốt nhất $\eta\approx0{,}0032$ cần $2034$ (quét $\eta$ bằng script); lịch chia đôi $1763$ | đã sửa |
| A3 | nghiêm trọng | `exercises.md`, Bài 05, Bài 06 | Nhãn cũ T1–T9, BĐ1–BĐ6 | Sửa theo số hiệu lượt 2; xem "Sửa kèm" | đã sửa |
| B1 | trung bình | §2.3, sau Bổ đề 05b.8 | "(a)–(d) đều mất với $[x]_1^2$" sai với (b) | Viết: (a), (c), (d) mất với $[x]_1^2$; (b) vẫn đúng với $\mu=2$ (PL, Mục 6.5); (b) mất với $x^4$ vì $e/\lvert f'\rvert^2=1/(16x^2)\to\infty$ | đã sửa |
| B2 | trung bình | Bài tập củng cố | Trỏ tới nhật ký; mục tiêu 5 thiếu Markov và lịch bước | Bảng 6 dòng mục tiêu → bài tập trong ghi chú; thêm câu (d) Markov vào Bài tập 05b.5 ($\le0{,}19$; với giá trị chính xác $0{,}098$); thêm câu (e) lịch chia đôi vào Bài tập 05b.9 ($T_m=11,14,28,56,111$, tổng $220$; bất biến của đoạn khi bước nhỏ hơn) | đã sửa |
| B3 | trung bình | Hệ quả 05b.10, 05b.23 (Phạm vi); đoạn sau Định lý 05b.25; tiêu đề T1′–T9; §7.1 | "duy nhất"; nhãn T không giải thích; câu về hình sai | Bỏ "duy nhất", liệt kê chỗ dùng (kể cả dưới vi phân khác rỗng); thêm câu ở đầu Mục 3 về tên ngắn T1′–T9 (tên của bộ bài tập; trên hình chỉ có T1, T2a, T2b, T5); sửa câu ở §7.1 | đã sửa |
| B4 | trung bình | Sau Định nghĩa 05b.14; Bước 4 của Định lý 05b.16; câu dẫn Định lý 05b.16 | Thiếu móc nối Bổ đề 04.21 | Thêm câu: Bổ đề 04.21 là bất đẳng thức một bước với $u_k=d_k^2$, $q=1$, $v_k=\tfrac2Le_{k+1}$; Bước 4 ghi "với $\eta=\tfrac1L$ là Bổ đề 04.21"; câu dẫn nêu đúng phần mở rộng; thiếu hụt 1 ở đầu Mục 3 nhắc 04.21 | đã sửa |
| B5 | trung bình | §6.5, §5.1, mở Mục 3, hai đoạn nhầm lẫn | Tám bước | Ví dụ dương PL (ví dụ dẫn C, $\lVert\nabla f\rVert^2\ge6f$) và câu trực giác đặt trước Định nghĩa 05b.45; §5.1: đoạn vấn đề và Ví dụ 05b.15 trước Thuật toán 05b.2; mở Mục 3 thêm $70/k$, $7000$ so với $6$ bước; hai đoạn nhầm lẫn thành Nhận xét 05b.24 và 05b.42 (đánh số lại các khối sau) | đã sửa |
| B6 | trung bình | Các dòng điều phối viên liệt kê | Trình bày sáng sủa | Chuỗi nội dòng ở Ví dụ 05b.7, chứng minh Định lý 05b.20, Ví dụ 05b.21, Ví dụ 05b.27 đưa vào `aligned`; tách câu ở Ví dụ 05b.6, chứng minh Định lý 05b.36; lời giải Bài tập 05b.1(c) thành danh sách $k=100,101,102$; tách đoạn ở §1.3, §1.4, §2.2, sau Định lý 05b.20, "Trong học máy" §3.4 (sửa câu sau dấu hai chấm), §4.5; đoạn ý chứng minh của Định lý 05b.39 thay bằng chứng minh có đệ quy trên `$$`. Script: 0 chuỗi nội dòng từ ba dấu quan hệ, 0 đoạn diễn giải quá bốn câu | đã sửa |
| B7 | trung bình | Toàn tệp | Ký hiệu | Vectơ đặc trưng $u_i\to c_i$ (không dùng $a_i$ vì trùng $a_k=\mathbb Ed_k^2$); điểm cực tiểu $(0,c)\to(0,\vartheta)$ để $c$ chỉ còn là đặc trưng; phần dư $r_i\to\rho_i$, chỉ số trong nhóm $I_{k,r}\to I_{k,j}$ (để $r_k$ chỉ là nhiễu); biến phụ $u\to t$ (Mệnh đề 05b.3), $\varpi$ (Ví dụ 05b.26), bỏ $u,v$ ở chứng minh Bổ đề 05b.9; $t\to\eta$ ở đoạn sau Bổ đề 05b.6; $q_x\to m_x$; $h\to\psi$ ở Ví dụ 05b.27 và hàm tổng quát của Mệnh đề 05b.30 đổi thành $\Psi$; $g(Ax)\to\varphi(Ax)$; biến đường chéo ở Tình huống 05b.3 là $\varsigma_k$; bát giác $\mathcal O$ khác hình vuông $Q$. Bảng: $q\in[0,1]$, $\alpha$ ghi Định nghĩa 04.10 và Bổ đề 04.23, thêm $r_k$, $I_{k,j}$, $B_k$. Quét lệnh KaTeX lạ và chữ đỏ: 0 | đã sửa |
| B8 | trung bình | Nhận xét 05b.19; đệ quy trước Định lý 05b.39 | Giải sẵn bài chính thức | Nhận xét 05b.19 bỏ đáp số $\tfrac2{L+\mu}$, $\tfrac{L-\mu}{L+\mu}$, chỉ nêu tồn tại bước tốt hơn và dẫn bộ bài tập; đệ quy (5.6) giữ vì là Bước 1 của chứng minh Định lý 05b.39, ghi "chờ xử lý ở exercises.md". Bảng trùng lặp bổ sung Bài 1.2, 2.3, 3.3, 4.3–4.4, 6.1, 6.2, 8.5, 9.4, 10.2 | đã sửa |
| B9 | trung bình | Nhiều chỗ | Rà toán | Ví dụ 05b.9 "Kiểm tra lại" sửa thành $0{,}0140$ và $0{,}0080$; Định lý 05b.39: Phạm vi ghi "theo cùng lập luận với Nemirovski và cộng sự (2009, mục 2.1); bước đầu $\eta_0=\tfrac1\mu$ có hệ số $-1$ nên cận không chứa $D^2$", và viết đủ chứng minh bốn bước, gồm $\tfrac{k-1}{k(k+1)}+\tfrac1{(k+1)^2}=\tfrac{k^2+k-1}{k(k+1)^2}\le\tfrac1{k+1}$ (quyết định người dùng chỉ không bắt buộc chứng minh); Ví dụ 05b.26 thay "giả sử" bằng chứng minh dãy SGD ở lại $[-2,2]$ (đạo hàm $\ge1-11\eta\ge0$, ảnh đầu mút trong $[-1{,}899;\,1{,}899]$); Hệ quả 05b.27 Phạm vi: cận vẫn giảm khi $K'>K$ nhưng không xuống dưới $\tfrac{G^2\eta}2$; §1 ghi "Mục 2.6 của Bài 04 cho Định lý 04.22"; "Trong học máy" §1.2 (bỏ câu khái quát về "bài báo", nêu đúng đại lượng các định lý chặn), §4.4 (H5 chỉ đúng khi đặc trưng bị chặn và không có chính quy bậc hai; trung bình Polyak chỉ khi bước hằng), §5.4 (không còn khẳng định trung bình ổn định hơn điểm cuối), "Ứng dụng" (bước $\tfrac1L$ bảo đảm giảm, tuyến tính chỉ khi lồi mạnh; lịch bậc thang "cùng cấu trúc"). Người soạn không có văn bản bốn điểm (i)–(iv) của báo cáo rà toán, nên sửa theo cách hiểu ở trên; điều phối viên cần đối chiếu | đã sửa, cần đối chiếu (i)–(iv) |
| C | nhẹ | Nhiều chỗ | Câu chữ, tiêu đề, nguồn, thuật ngữ, tự chứa | Sửa câu ở thiếu hụt 1 của Mục 3, "Trong học máy" §2.5, Thuật toán 05b.2 ("ngược hướng"), §3.3 (công thức $L=\nu+\tfrac1{4N}\lambda_{\max}(\sum_ic_ic_i^T)$), đoạn trước Hệ quả 05b.38, mở Mục 6; tiêu đề Nhận xét 05b.19, 05b.37 thành tên khái niệm; câu "một số giáo trình" nêu Boyd và Vandenberghe mục 9.1.2, 9.3; "Mỗi giả thiết được dùng đúng một lần" thành "vào chứng minh ở một chỗ xác định"; câu về dạng tới điểm dừng; Mệnh đề 05b.3(a) ghi $q\in[0,1)$; thuật ngữ gốc: convergence rate, descent lemma, tower property, conditional expectation, Polyak averaging, step schedule (learning-rate schedule); câu dẫn trước Định lý 05b.41, 05b.47 và đoạn "Trong học máy" cho 05b.39, 05b.41; Bài tập 05b.7(e) chép dữ kiện ví dụ dẫn A; Gợi ý 05b.4 viết lại quy tắc tổng; Tình huống 05b.3 nêu lý do (đường chéo có diện tích $0$); tiên quyết dẫn Định nghĩa 05c.37, Mệnh đề 05c.38, Định lý 05c.39, 05c.28, Định nghĩa 05c.30; đoạn mở Mục 2–7 thêm một số liệu | đã sửa |
| D | quyết định độ dài | Toàn tệp | Gói cắt được duyệt | Đã cắt: bảng 7.2 (giữ bốn gạch và câu dẫn), rút tiên quyết, rút mô tả tài liệu, rút bảng và bỏ mô phỏng của Tình huống 05b.2, gộp Ví dụ 05b.6 lượt 1 vào Ví dụ 05b.7 lượt 1, bỏ đoạn logistic $z=\log k$, bỏ câu "$13$, $40$, $95$" ở đoạn đọc hình lịch chia đôi, bỏ đoạn bốn lịch bước trùng 7.1. Thêm: rút mục tiêu học tập, rút "Ngoài phạm vi" của Nhận xét 05b.48, rút "Giới hạn" của Tình huống 05b.3. Không cắt các khối bị cấm | đã sửa; độ dài vượt khoảng chấp nhận, xem "Độ dài" |

## Bảng đổi số hiệu (lượt 1 → lượt 2)

Hai nhận xét mới (05b.24, 05b.42) và việc gộp hai ví dụ làm dịch số hiệu. Các số hiệu không ghi dưới đây không đổi (Định nghĩa 05b.1–05b.21, Mệnh đề, Bổ đề, Hệ quả, Nhận xét đến 05b.23; Ví dụ 05b.1–05b.5; mọi Bài tập, Tình huống, Thuật toán).

| Lượt 1 | Lượt 2 |
|---|---|
| Ví dụ 05b.6, 05b.7 | Ví dụ 05b.6 (gộp) |
| Ví dụ 05b.8–05b.29 | Ví dụ 05b.7–05b.28 (trừ một) |
| (mới) | Nhận xét 05b.24 (hướng ngược dưới gradient) |
| Bổ đề 05b.24 (Jensen) | Bổ đề 05b.25 |
| Định lý 05b.25 (T3) | Định lý 05b.26 |
| Hệ quả 05b.26, 05b.27 | Hệ quả 05b.27, 05b.28 |
| Định nghĩa 05b.28, Mệnh đề 05b.29, Định nghĩa 05b.30, Bổ đề 05b.31, Nhận xét 05b.32 | Định nghĩa 05b.29, Mệnh đề 05b.30, Định nghĩa 05b.31, Bổ đề 05b.32, Nhận xét 05b.33 |
| Định lý 05b.33 (T4), Bổ đề 05b.34, Định lý 05b.35 (T5) | Định lý 05b.34, Bổ đề 05b.35, Định lý 05b.36 |
| Nhận xét 05b.36, Hệ quả 05b.37, Định lý 05b.38 (T6), Bổ đề 05b.39 (Markov) | Nhận xét 05b.37, Hệ quả 05b.38, Định lý 05b.39, Bổ đề 05b.40 |
| Định lý 05b.40 (T7) | Định lý 05b.41 |
| (mới) | Nhận xét 05b.42 (điểm dừng không phải cực tiểu) |
| Định lý 05b.41 (T8), Hệ quả 05b.42 | Định lý 05b.43, Hệ quả 05b.44 |
| Định nghĩa 05b.43 (H7), Mệnh đề 05b.44, Định lý 05b.45 (T9), Nhận xét 05b.46 | Định nghĩa 05b.45, Mệnh đề 05b.46, Định lý 05b.47, Nhận xét 05b.48 |

Lưu ý cho điều phối viên: thư yêu cầu sửa dẫn "Định lý 05b.35, 05b.41" và "Bổ đề 05b.24" theo số hiệu lượt 1; sau khi thêm hai nhận xét theo B5, các kết quả đó là Định lý 05b.36 (T5), Định lý 05b.43 (T8) và Bổ đề 05b.25 (Jensen). Các sửa kèm dùng số hiệu lượt 2.

## Sửa kèm (ngoài ghi chú 05b)

Chỉ đổi nhãn và tham chiếu; không đổi đề, số liệu hay lời giải.

| Tệp | Dòng | Nội dung |
|---|---|---|
| `materials/lec-05b/exercises.md` | 3 | Câu "bổ đề BĐ1–BĐ6 và định lý T1–T9 theo ghi chú bài giảng" thay bằng bảng tên ngắn → số hiệu (T1, T1′ → 05b.16; T2a, T2b → 05b.18(a), (b); T2′ → 05b.20; T3 → 05b.26; T4 → 05b.34; T5 → 05b.36; T6 → 05b.39; T7 → 05b.41; T8 → 05b.43; T9 → 05b.47; BĐ1 → Bổ đề 04.18; BĐ2–BĐ4 → Bổ đề 05b.7–05b.9; BĐ5 → 05b.25; BĐ6 → 05b.40) |
| `materials/lec-05b/exercises.md` | 17, 28, 36–39, 41, 51–53, 61, 65, 75, 85, 95, 105–106, 108, 116, 120, 126, 128, 138, 141, 149, 166, 171, 175, 181, 195, 208, 216, 220, 238, 256, 258, 260, 275, 279, 283, 285, 296–297, 313, 315 | T…, BĐ…, "hệ quả của H1" (→ Hệ quả 05b.23), "bổ đề giảm" (thêm "(Bổ đề 05b.6)"), "phần B" (→ Mục 2), "phần F" (→ Mục 6), "các phần C, E, F" (→ Mục 3, 5, 6) đổi theo bảng; "cận T…" viết "cận của Định lý …"; tên H0–H7 giữ nguyên |
| `materials/lec-05/lecture-note.md` | 22 | Câu "ghi chú bổ trợ Bài 05b, 05c dùng nhãn riêng…" thay bằng "Số hiệu `01.k`, `04.k`, `05b.k`, `05c.k` chỉ ghi chú Bài 01, 04, 05b, 05c" |
| `materials/lec-05/lecture-note.md` | 25, 210, 320, 651 | "Định lý E.9 (của Bài 05c)" → "Định lý 05c.35" |
| `materials/lec-05/lecture-note.md` | 754 | "Mệnh đề E.10 của Bài 05c" → "Mệnh đề 05c.36" |
| `materials/lec-05/lecture-note.md` | 980 | mục "Cỡ nhóm dưới ngân sách tính toán cố định" → "Mục 6.6 (Mệnh đề 05c.57, Ví dụ 05c.39)" |
| `materials/lec-05/lecture-note.md` | 1047, 1048, 1050, 1052 | "Định lý T5" → "Định lý 05b.36"; "Định lý T8" → "Định lý 05b.43" |
| `materials/lec-05/lecture-note.md` | 2978 | "(Định lý T5, T8)" → "(Định lý 05b.36, 05b.43)"; "(Định lý E.9, Mệnh đề E.10, …)" → "(Định lý 05c.35, Mệnh đề 05c.36, Mục 6.6 …)" |
| `materials/lec-06/lecture-note.md` | 24 | Câu "dùng nhãn riêng như "Bổ đề BĐ5"" → "Số hiệu `04.k`, `05.k` và `05b.k` chỉ ghi chú Bài 04, Bài 05 và ghi chú bổ trợ Bài 05b" |
| `materials/lec-06/lecture-note.md` | 35, 1776, 2625 | "Bổ đề BĐ5" → "Bổ đề 05b.25" |

Số hiệu 05c lấy theo `planning/lec-05c/review-log-lecture-note.md` và bản 05c trong cây làm việc (chưa commit); nếu 05c đổi số hiệu trước khi commit, các dòng 25, 210, 320, 651, 754, 980, 2978 của Bài 05 cần đổi theo.

## Số liệu của bản lượt 1

- 32 308 từ (`wc -w`), vượt đích 20 000–28 000 của brief; xem mục "Độ dài".
- 137 khối mở = 137 dòng `:::` đóng, không lồng: 10 định lý, 9 bổ đề, 5 mệnh đề, 7 hệ quả, 8 định nghĩa, 7 nhận xét, 2 thuật toán, 29 ví dụ, 3 tình huống, 9 bài tập, 9 gợi ý, 9 lời giải, 30 chứng minh.
- Bộ đếm chung 05b.1–05b.46; bộ đếm riêng Ví dụ 05b.1–05b.29, Bài tập 05b.1–05b.9 (6 trong mục, 3 củng cố, một bài mỗi mức), Tình huống 05b.1–05b.3, Thuật toán 05b.1–05b.2.
- Mỗi định lý, mệnh đề, bổ đề, hệ quả có bốn phần Giả thiết, Kết luận, Điều kiện áp dụng, Phạm vi (script kiểm). Mọi kết quả có `proof` ngay sau, kết thúc $\square$, trừ Định lý 05b.38 (T6) chỉ phát biểu theo quyết định người dùng, có nguồn và đoạn ý chứng minh.
- 18 hình, 14 đoạn "Trong học máy", 7 "Chuỗi suy luận của mục" và một chuỗi toàn bài, 7 "Kết mục". 29 khối có đoạn **Dữ kiện.** (khoảng 950 từ).
- Công thức đánh số: (1.1); (2.1)–(2.5); (3.1)–(3.5); (4.1)–(4.4); (5.1)–(5.6); (6.1)–(6.7).
- Tham chiếu ra ngoài: 30 số hiệu `01.k`, `04.k`, `05.k` khác nhau, script đối chiếu loại khối và số hiệu với ba tệp ghi chú: 30/30 đúng.

## Bảng đối chiếu nhãn cũ → số hiệu mới

Nhãn cũ là nhãn của bản ghi chú trước, của bộ trang chiếu 05b, của `exercises.md` 05b, của ghi chú Bài 05 (Nhận xét 05.16 dẫn "Định lý T5", "Định lý T8"; phần Kiến thức tiên quyết và tài liệu tham khảo dẫn "T5, T8") và của ghi chú Bài 06 ("Bổ đề BĐ5"). Hình SVG giữ nhãn cũ; ghi chú có câu đối chiếu tại chỗ đọc hình.

| Nhãn cũ | Số hiệu mới | Ghi chú |
|---|---|---|
| Định nghĩa (dạng hội tụ) | Định nghĩa 05b.1 | |
| Định nghĩa (tốc độ) | Định nghĩa 05b.2 | |
| bảng số bước; R-, Q-tuyến tính | Mệnh đề 05b.3 | (a) là "Mẫu 2 (co)" |
| H0, H1, H2, H3, H4 | Định nghĩa 05b.5 | tên H0–H4 giữ nguyên; điểm so sánh viết $z$ thay cho $y$ |
| H5 | giả thiết trong Định lý 05b.26 | tên giữ nguyên |
| H6, H6a, H6b | Định nghĩa 05b.31 | tên giữ nguyên |
| H7 (điều kiện PL) | Định nghĩa 05b.45 | tên giữ nguyên |
| BĐ1 (cận trên bậc hai) | Bổ đề 04.18, công thức (2.1) | không đánh số mới; phát biểu lại |
| Bổ đề giảm (descent lemma) | Bổ đề 05b.6 | mở rộng Bổ đề 04.20 sang mọi $\eta>0$ |
| BĐ2 (chặn chuẩn gradient) | Bổ đề 05b.7 | |
| BĐ3 (cận của hàm lồi mạnh) | Bổ đề 05b.8 | phần (c) dùng hằng số $\tfrac1\mu$ thay cho $\tfrac2\mu$; thêm (e) $e\le\tfrac L2d^2$ |
| BĐ4 (đồng nhất thức một bước) | Bổ đề 05b.9 | viết với điểm $z$ bất kỳ |
| Hệ quả của H1 | Hệ quả 05b.10(a); dạng dưới gradient: Hệ quả 05b.23 | 05b.10(b) thêm dạng lồi mạnh |
| Nhận xét (ý nghĩa hình học) | Nhận xét 05b.11 | |
| Chuỗi bản đồ dạng hội tụ | Mệnh đề 05b.12, công thức (2.5) | bảng phản ví dụ: Nhận xét 05b.13 |
| Hàm thế; khuôn một bước | Định nghĩa 05b.14 | |
| Mẫu 1 (tổng lồng) | Bổ đề 05b.15 | viết cả dạng có nhiễu |
| Mẫu 2 (co) | Mệnh đề 05b.3(a) | |
| Cách nối thứ ba (giải đệ quy) | Bổ đề 05b.35 | |
| T1 | Định lý 05b.16 với $\eta=\tfrac1L$ (= Định lý 04.22) | |
| T1′ | Định lý 05b.16 | |
| (mới) | Hệ quả 05b.17 | hội tụ theo giá trị khi không có H4 |
| T2a, T2b | Định lý 05b.18(a), (b) | (b) = Định lý 04.26 |
| T2′ | Định lý 05b.20 | nay có chứng minh |
| Dưới gradient, dưới vi phân | Định nghĩa 05b.21; tính chất: Mệnh đề 05b.22 | |
| Thuật toán dưới gradient | Thuật toán 05b.1 | |
| BĐ5 (Jensen hữu hạn) | Bổ đề 05b.25 | Bài 06 dẫn "Bổ đề BĐ5" |
| T3 | Định lý 05b.26 | |
| Hệ quả 1 (bước hằng theo $K$) | Hệ quả 05b.27 | |
| Hệ quả 2 (bước giảm dần, Robbins–Monro) | Hệ quả 05b.28 | |
| Thuật toán SGD (mới đánh số) | Thuật toán 05b.2 | |
| $\mathcal F_k$, kỳ vọng có điều kiện | Định nghĩa 05b.29 | |
| Tính chất tháp; rút đại lượng đã biết | Mệnh đề 05b.30 | |
| Bổ đề tách phương sai | Bổ đề 05b.32 | |
| T4 | Định lý 05b.34 | |
| T5 | Định lý 05b.36 | Bài 05, Nhận xét 05.16 dẫn "Định lý T5" |
| Hệ quả (lịch theo pha) | Hệ quả 05b.38 | |
| T6 | Định lý 05b.39 | có chứng minh từ lượt 2 |
| BĐ6 (Markov) | Bổ đề 05b.40 | |
| T7 | Định lý 05b.41 | |
| T8 | Định lý 05b.43 | Bài 05, Nhận xét 05.16 dẫn "Định lý T8" |
| Hệ quả (chọn bước cho T8) | Hệ quả 05b.44 | |
| (mới) quan hệ của PL | Mệnh đề 05b.46 | (c): PL kéo theo mọi điểm dừng là cực tiểu toàn cục |
| T9 | Định lý 05b.47 | nay có chứng minh |
| Ví dụ A, B, C, D | "ví dụ dẫn A–D" (không đánh số) | hình giữ tên "Ví dụ A–D" |

Các tham chiếu ở `materials/lec-05/lecture-note.md`, `materials/lec-06/lecture-note.md` và `materials/lec-05b/exercises.md` đã được đổi theo bảng này trong lượt 2 (mục "Sửa kèm").

## Cấu trúc chương và ánh xạ với bộ trang chiếu

| Mục | Mạch | Trang chiếu | Nội dung chính |
|---|---|---|---|
| 1. Các dạng hội tụ | A | A01–A05 | Ví dụ 05b.1, 05b.2; Định nghĩa 05b.1, 05b.2, 05b.5; Mệnh đề 05b.3; Nhận xét 05b.4; Ví dụ 05b.3 |
| 2. Bất đẳng thức cầu nối | B | B01–B07 | Ví dụ 05b.4, 05b.5; Bổ đề 05b.6–05b.9; Hệ quả 05b.10; Mệnh đề 05b.12; Nhận xét 05b.11, 05b.13 |
| 3. Hội tụ của hạ gradient | C | C01–C09 | Định nghĩa 05b.14; Bổ đề 05b.15; Định lý 05b.16, 05b.18, 05b.20; Hệ quả 05b.17; Nhận xét 05b.19 |
| 4. Dưới gradient và trung bình lặp | D | D01–D07 | Định nghĩa 05b.21; Mệnh đề 05b.22; Hệ quả 05b.23, 05b.27, 05b.28; Thuật toán 05b.1; Bổ đề 05b.25; Định lý 05b.26 |
| 5. SGD lồi và lồi mạnh | E | E01–E12 | Thuật toán 05b.2; Định nghĩa 05b.29, 05b.31; Mệnh đề 05b.30; Bổ đề 05b.32, 05b.35, 05b.40; Định lý 05b.34, 05b.36, 05b.39; Hệ quả 05b.38; Nhận xét 05b.33, 05b.37 |
| 6. Không lồi, chuẩn gradient | F | F01–F07 | Định lý 05b.41, 05b.43, 05b.47; Hệ quả 05b.44; Định nghĩa 05b.45; Mệnh đề 05b.46 |
| 7. Bảng tra và giới hạn | G | G01–G04 | bảng tra, khuôn chứng minh chung, Nhận xét 05b.48 |
| Tình huống | toàn bài | | 05b.1 hồi quy logistic có chính quy hóa (giả thiết thỏa); 05b.2 SGD bình phương nhỏ nhất (H6b chỉ đúng trên một vùng); 05b.3 mạng tuyến tính hai lớp (H1, H7 sai, H2 chỉ đúng trên một hình vuông) |

## Giáo trình đã tham khảo

Đọc từ PDF cục bộ bằng `pdftotext` (trang in): Boyd và Vandenberghe (2004) `sources/bv_cvxbook.pdf` (trang in = trang PDF − 14): mục 9.1.2 tr. 459–461, công thức (9.8)–(9.14); mục 9.3.1 tr. 466–468 (tìm bước chính xác, quay lui). Sra, Nowozin và Wright (2011) `sources/MIT-Optimization-for-Machine-Learning.2012.pdf` (trang in = trang PDF − 15): chương 4 Mệnh đề 4.6–4.8 tr. 109–110; chương 5 Mệnh đề 5.1 tr. 127–128, Mệnh đề 5.3–5.4 tr. 131–133, Mệnh đề 5.5 tr. 134, mục 5.8 tr. 145–146; chương 13 mục 13.3 tr. 355–361. Goodfellow, Bengio và Courville (2016) `sources/Deep Learning…pdf` (trang in = trang PDF − 16): mục 8.3.1 tr. 294–296. Niu (2024) `sources/optimization-methods-bimsa.pdf`: Định lý 26, 27 tr. 96–98, Bổ đề 28 tr. 105, Định lý 29 tr. 114, bình luận tr. 118–121.

Không có PDF cục bộ, dẫn theo cấu trúc đã biết, chưa kiểm số trang trong phiên này: Nesterov (2004) mục 2.1; Bubeck (2015) mục 3.1, 3.2, chương 6; Beck (2017) chương 3, Định lý 10.21 (số hiệu theo ghi chú Bài 04); Rockafellar (1970) Định lý 23.4 tr. 217, Định lý 23.8 tr. 223; Bottou, Curtis và Nocedal (2018) mục 4; Nemirovski, Juditsky, Lan và Shapiro (2009) mục 1, mục 2.1, công thức (2.8)–(2.10), tr. 1575–1577; Ghadimi và Lan (2013); Karimi, Nutini và Schmidt (2016) mục 2; Polyak (1963); Liu, Zhu và Belkin (2022); Robbins và Monro (1951). Điều phối viên cần lưu ý: số trang của Rockafellar và của Nemirovski và cộng sự là từ trí nhớ, cần kiểm khi có bản PDF. Không dịch hoặc chép đoạn văn nào.

| Mục của chương | Nguồn và mục | Điều học được và chuyển vào ghi chú |
|---|---|---|
| 1 | B&V 9.3.1 (tr. 467: "linear convergence" theo đồ thị log); Niu tr. 119–121 | Định nghĩa tốc độ theo cận đúng với mọi $k$, đổi cận thành số bước như (9.19) của B&V; phân biệt dạng cận và dạng tỉ số. |
| 1.4, 2 | B&V 9.1.2 (tr. 459–461); Nesterov 2.1 | B&V suy (9.9), (9.11), (9.14) bằng cực tiểu hóa vế phải theo $y$; ghi chú dùng đúng cách này cho Bổ đề 05b.7, 05b.8(b), và chỉ ra hằng số $\tfrac1\mu$ chặt hơn (9.11). Giả thiết đặt toàn cục, không cần đạo hàm bậc hai, khác B&V (đặt trên tập mức). |
| 3.1–3.2 | Niu Định lý 26 (tr. 96); Beck Định lý 10.21; SNW ch. 4 | Tổng lồng của bất đẳng thức một bước với bước $\gamma\le\tfrac1L$; Niu chứng minh tính đơn điệu bằng cách thay $x^*$ bằng $x^k$, ghi chú lấy ý "điểm so sánh bất kỳ" để thu Hệ quả 05b.17 khi không có H4. |
| 3.3–3.4 | B&V 9.3.1 (tr. 466–468) | Định lý 05b.18(b) theo lập luận tìm bước chính xác; Định lý 05b.20 theo lập luận quay lui tr. 468 với $m,M$ thành $\mu,L$. |
| 4 | SNW Mệnh đề 5.1 (tr. 127–128); Bubeck 3.1; Beck ch. 3; Rockafellar 23.4, 23.8 | Cận của phương pháp gương trường hợp Euclid là Định lý 05b.26; hai đầu ra (lặp tốt nhất, trung bình có trọng số theo bước) theo (5.6) của SNW. Phản ví dụ "$-g$ không là hướng giảm" theo cách các bài giảng về phương pháp dưới gradient thường dùng ($\lvert[x]_1\rvert+2\lvert[x]_2\rvert$). |
| 5.1–5.4 | SNW Mệnh đề 5.5 (tr. 134); GBC 8.3.1 (tr. 294–296); Bottou–Curtis–Nocedal 4 | Định lý 05b.34 là phiên bản ngẫu nhiên của 05b.25; điều kiện Robbins–Monro và tốc độ $O(1/\sqrt k)$, $O(1/k)$ theo GBC. |
| 5.5–5.6 | Niu Định lý 29 (tr. 114) và bình luận tr. 119–121; SNW Mệnh đề 5.4 (tr. 133); Nemirovski và cộng sự 2009 | Cận co tới sàn nhiễu dạng $(1-\gamma\mu)^k\lVert x_0-x^*\rVert^2+\gamma C/\mu$ của Niu; lập luận khởi động lại theo pha của SNW cho Hệ quả 05b.38; bước $\theta/j$ và độ nhạy theo $\mu$ của Nemirovski và cộng sự cho Định lý 05b.39. |
| 5.7 | SNW Mệnh đề 4.8 (tr. 110) | Phát biểu hội tụ với xác suất 1 cho phương pháp gia tăng ngẫu nhiên, chỉ nêu, không chứng minh. |
| 6 | Ghadimi–Lan 2013; Bottou–Curtis–Nocedal 4.3; Karimi và cộng sự 2016 | Hàm thế $f-f_{\inf}$, cận trung bình chuẩn gradient, chỉ số ra ngẫu nhiên; điều kiện PL và ví dụ $x^2+3\sin^2x$. |
| 7 | — | Tổng hợp từ các mục trước. |

## Ánh xạ mục tiêu học tập – kết quả – bài tập

| Mục tiêu (LLO/CLO) | Kết quả và ví dụ | Bài tập |
|---|---|---|
| 1. Dạng hội tụ, tốc độ, số bước (LLO6; CLO1) | Định nghĩa 05b.1, 05b.2; Mệnh đề 05b.3; Nhận xét 05b.4; Ví dụ 05b.1, 05b.2 | 05b.1, 05b.7 |
| 2. Bất đẳng thức cầu nối, phản ví dụ (LLO6; CLO1) | Bổ đề 05b.6–05b.9; Hệ quả 05b.10; Mệnh đề 05b.12; Nhận xét 05b.13; Ví dụ 05b.4–05b.7 | 05b.2 |
| 3. Định lý GD theo khuôn một bước, tính cận (LLO6, LLO8; CLO1, CLO2) | Định lý 05b.16, 05b.18, 05b.20; Hệ quả 05b.17; Ví dụ 05b.8–05b.10; Tình huống 05b.1 | 05b.3, 05b.8 |
| 4. Dưới gradient (LLO6, LLO8; CLO1, CLO2) | Định nghĩa 05b.21; Mệnh đề 05b.22; Định lý 05b.26; Hệ quả 05b.27, 05b.28; Ví dụ 05b.11–05b.14 | 05b.4 |
| 5. SGD lồi, lồi mạnh, sàn nhiễu, lịch bước, xác suất (LLO12; CLO2) | Định lý 05b.34, 05b.36, 05b.39; Hệ quả 05b.38; Bổ đề 05b.40; Ví dụ 05b.15–05b.22; Tình huống 05b.2 | 05b.5, 05b.9 |
| 6. Không lồi, PL, giới hạn (LLO11, LLO12; CLO1, CLO2) | Định lý 05b.41, 05b.43, 05b.47; Mệnh đề 05b.46; Ví dụ 05b.23–05b.28; Tình huống 05b.3; Nhận xét 05b.48 | 05b.6, 05b.7 |

## Tự kiểm theo bảng kiểm "Kiểm định ghi chú bài giảng"

| Tiêu chí | Kết quả | Bằng chứng |
|---|---|---|
| Mỗi mục tiêu có kết quả hoặc ví dụ và bài tập | đạt | Bảng ánh xạ trên. |
| Tám bước cho mỗi khái niệm trọng tâm | đạt theo tự kiểm | Dạng hội tụ: Ví dụ 05b.1, 05b.2 (nhu cầu), đoạn trực giác §1.2, Định nghĩa 05b.1, áp dụng trên hai ví dụ, nhầm lẫn $\mathbb E\theta_k$, Nhận xét 05b.4, Bài tập 05b.1. Cầu nối: Ví dụ 05b.4, 05b.5, hình lát cắt, Bổ đề 05b.6–05b.8, Ví dụ 05b.6 (gộp từ hai ví dụ lượt 1), Nhận xét 05b.13, Bài tập 05b.2. Khuôn một bước và GD: bốn thiếu hụt của Định lý 04.22, hình cột, Định nghĩa 05b.14, Bổ đề 05b.15, Định lý 05b.16 + chứng minh, Ví dụ 05b.8, Nhận xét 05b.19, Bài tập 05b.3. Dưới gradient: Ví dụ 05b.11, hình đường tựa, Định nghĩa 05b.21, Mệnh đề 05b.22, Ví dụ 05b.12, Định lý 05b.26, Ví dụ 05b.14, nhầm lẫn "$-g$ là hướng giảm", Bài tập 05b.4. Kỳ vọng có điều kiện: Ví dụ 05b.15, hình cây, Định nghĩa 05b.29, Mệnh đề 05b.30, Ví dụ 05b.16. SGD lồi mạnh và sàn nhiễu: Ví dụ 05b.2 (nhu cầu từ §1), Định lý 05b.36, Ví dụ 05b.19, Nhận xét 05b.37, Bài tập 05b.5. Điểm dừng không lồi: Ví dụ 05b.23, 05b.24, Định lý 05b.41, Ví dụ 05b.25, nhầm lẫn "GD tới cực tiểu". PL: phản ví dụ $\theta=0$, Định nghĩa 05b.45, Mệnh đề 05b.46, Ví dụ 05b.27, Định lý 05b.47, Ví dụ 05b.28, Bài tập 05b.6. |
| Ký hiệu trong bảng, mỗi chữ một nghĩa | đạt theo tự kiểm, có hai chỗ cố ý | Bảng 22 dòng. Đã đổi để tránh trùng: điểm so sánh $z$ (vì $y$ là dữ liệu); tọa độ $[x]_i$ (vì $x_k$ là điểm lặp); $\exp(\cdot)$ thay cho $e^{(\cdot)}$ (vì $e_k$); hệ số chính quy $\nu$ (không dùng $\lambda$ ngoài trọng số Jensen); $\zeta=x-x^*$ trong Tình huống 05b.2 và Bài tập 05b.9 (không dùng $\epsilon$ cạnh $\varepsilon$); điểm dừng $x^\circ$; giới hạn $s_\infty$; chỉ số ngẫu nhiên $\tilde k$ khác chỉ số lặp tốt nhất $\hat k$; hệ số quay lui $q_{\rm A}$; sàn pha $\omega_m$. Chỗ cố ý: $\mu$ dùng cho cả hằng số lồi mạnh (H3) và hằng số PL (H7), theo deck F06 và có câu giải thích (Mệnh đề 05b.46(a)); biến phụ $\tau$ dùng làm biến tích phân khi nhắc chứng minh Bổ đề 04.18 và làm vô hướng phụ ở §4. |
| Định lý đủ bốn phần, có chứng minh | đạt | Lượt 2: script kiểm 31 khối định lý, mệnh đề, bổ đề, hệ quả đều có bốn nhãn và có `proof` ngay sau, kết thúc $\square$. Mệnh đề 05b.22(c), (d) ghi rõ "không chứng minh" kèm nguồn có trang. |
| Ví dụ có kết quả số và "Kiểm tra lại" | đạt | Script: 29 ví dụ, 3 tình huống, 9 lời giải có nhãn "Kiểm tra lại". Mọi số tính lại bằng Python với phân số chính xác hoặc đệ quy chính xác (`/tmp/claude-1000/chk05b/c1.py`–`c4.py`, `s1.py`–`s3b.py`, `ex.py`, `sim.py`). |
| Bài tập có `hint` và `solution` | đạt | 9 bài, mỗi bài một `hint` rồi một `solution`. |
| Không chuỗi cấm, không câu hỏi tu từ | đạt | Script: "trang chiếu", "xem bài giảng", "dễ thấy", "suy ra ngay", "chúng ta", "hãy", "ta", mã trang A01–G04, dấu "?": 0 lần. "hiển nhiên" đã thay. |
| Trình bày sáng sủa | đạt theo tự kiểm | Chứng minh dài chia **Bước k (…)** trên dòng riêng; chuỗi nhiều hơn hai dấu quan hệ đặt trong `aligned` (script quét công thức nội dòng sau khi bỏ chỉ số: 0 chuỗi có từ ba dấu trở lên); trường hợp và kết luận thành danh sách; đoạn diễn giải tối đa bốn câu (script: 0 đoạn vượt sau khi tách 7 đoạn). |
| Số hiệu liên tục, tham chiếu đúng | đạt | Số hiệu sinh tự động; 0 tham chiếu treo; 30/30 tham chiếu ra ngoài đúng loại. |
| Móc nối | đạt theo tự kiểm | Sau mỗi định nghĩa có đoạn quan hệ (dạng tới điểm dừng với Định nghĩa 05.7; H3 với Định nghĩa 01.39; dưới gradient với H1 và Định lý 01.26; PL với H3). Trước và sau mỗi định lý có câu nêu kết quả dùng và quan hệ với kết quả trước (ví dụ Định lý 05b.16 mở rộng 04.22, trả giá $\tfrac1{L\eta}$; 05b.25 bỏ H2 trả giá $G^2\sum\eta_k^2$; 05b.41 là dạng dãy của Mệnh đề 05.14). Mở chương nối Định lý 04.22, Ví dụ 05.14; kết chương nối Bài 05c và Bài 06. |
| Kết mục ba ý, câu dẫn trước công thức | đạt theo tự kiểm | 7 đoạn "Kết mục"; đầu mỗi mục nhắc thiếu hụt của mục trước. |
| Giáo trình theo mục | đạt, có giới hạn | Bảng "Giáo trình đã tham khảo"; các nguồn không có PDF cục bộ được ghi rõ. |
| Nhất quán với bộ trang chiếu | đạt, có lệch ghi dưới đây | Mục "Lệch so với bộ trang chiếu". |

## Lệch so với bộ trang chiếu

1. **Bốn kết quả "chỉ phát biểu" trên deck nay đều có chứng minh.** Deck A01 ghi bốn kết quả chỉ phát biểu: quay lui (C08), lịch theo pha (E09), $\tfrac1{\mu(k+1)}$ (E10), PL cho SGD (F06). Ghi chú chứng minh cả bốn: Định lý 05b.20 (theo brief), Hệ quả 05b.38 (theo quyết định người dùng), Định lý 05b.39 (lượt 2, theo B9 của điều phối viên; quyết định người dùng chỉ không bắt buộc chứng minh) và Định lý 05b.47. Ghi chú diễn giả deck A01, E09, E10 cần cập nhật câu "chỉ phát biểu".
8. **Hội tụ với xác suất 1 (E11).** Deck E11 viết hội tụ gần như chắc chắn; ghi chú chỉ nêu $\liminf_kf(x_k)=f^*$ với xác suất $1$ cho phương pháp gia tăng ngẫu nhiên với bước giảm dần (Bertsekas trong Sra, Nowozin và Wright 2011, Mệnh đề 4.8, tr. 110), đúng với phát biểu của nguồn đã đọc.
9. **Ký hiệu đặc trưng.** Ghi chú viết vectơ đặc trưng là $c_i$ (deck và `exercises.md` Bài 8 viết $u_i$), vì $u_k$ là hàm thế trên hình `telescoping-stack.svg`.
2. **Hằng số của BĐ3.** Deck B04 và hình `convergence-map.svg` ghi $d\le\tfrac2\mu\lVert\nabla f\rVert$; Bổ đề 05b.8(c) phát biểu $\mu d\le\lVert\nabla f\rVert$, chặt hơn hai lần, và có câu đối chiếu với hình.
3. **Ký hiệu.** Deck viết $f(x)=\tfrac12(3x_1^2+7x_2^2)$ và $y$ cho điểm so sánh trong H1–H3; ghi chú viết $[x]_1$, $[x]_2$ và $z$, có câu giải thích ở bảng ký hiệu. Deck viết $\log(1+e^{-s})$; ghi chú viết $\exp(-s)$.
4. **Quay lui.** Deck C08 lấy $\alpha<\tfrac12$; Định lý 05b.20 lấy $\alpha\in(0,\tfrac12]$ theo Bổ đề 04.23, và đặt H2, H3 trên toàn $\mathbb R^n$ thay cho tập mức (có câu nêu phiên bản tập mức của B&V).
5. **Ví dụ trên deck được thay dữ liệu để không trùng `exercises.md`.** Quay lui dùng $\alpha=\beta=\tfrac12$ (deck C09 và Bài 2 dùng $\alpha=\tfrac14$); ví dụ bước nhỏ hơn $\tfrac1L$ dùng $\tfrac1{10}$ (Bài 3 dùng $\tfrac1{14}$); T6 dùng nhóm hai mẫu (deck E10 và Bài 6 dùng một mẫu); Markov dùng ngưỡng $0{,}9$ (Bài 9 dùng $1$).
6. **Kết quả mới không có trên deck.** Hệ quả 05b.17 (hội tụ theo giá trị khi không có H4), Bổ đề 05b.6 cho mọi $\eta>0$, Mệnh đề 05b.46(c), ví dụ PL không lồi $x^2+3\sin^2x$, ba tình huống áp dụng.
7. **Câu hỏi tự kiểm của G04** được thay bằng ba bài tập củng cố và Tình huống 05b.1–05b.3.

## Trùng lặp với `exercises.md` (chờ xử lý ở `exercises.md`)

| Khối của ghi chú | Bài của `exercises.md` | Mức trùng |
|---|---|---|
| Ví dụ 05b.16 (bảng chín lá) và 05b.23 (Markov tại $k=2$) | Bài 5.1 (chín giá trị $(\theta_2-1)^2$, $a_1$, $a_2$), Bài 9.2 | dữ liệu chín lá trùng; câu hỏi khác (tháp; ngưỡng $0{,}9$ thay cho $1$) |
| Ví dụ 05b.18 (gradient dấu, kiểm H6, H6a) | Bài 5.4 | phần kiểm H6, H6a trùng; ghi chú dùng $K=400$ và mô phỏng thay cho $K=100$ |
| Ví dụ 05b.9 (ba cận trên ví dụ dẫn C) | Bài 2.2 (kiểm T2a tại $k=2,3$) | cùng dãy, khác điểm kiểm |
| Ví dụ 05b.24–05b.26 (ví dụ dẫn D, $L=11$, $\Delta_0=\tfrac94$, $\sigma^2=1$) | Bài 7.3 | cùng hằng số; ghi chú dùng $K=1000$ và đích $0{,}1$ thay cho $K=100$ |
| Chứng minh Định lý 05b.39 (lượt 2) | Bài 6.1, 6.2 | trùng toàn bộ: Bước 1 là Bài 6.1, Bước 3–4 là Bài 6.2; điều phối viên chấp nhận (lượt 2); đổi đề ở `exercises.md` là việc riêng, chưa giao |
| Ví dụ 05b.6 (cận tại $x_0$ của ví dụ dẫn C) | Bài 1.2 | cùng chuỗi, khác điểm ($x_0$ so với $(1,-1)$) |
| Bài tập 05b.3 ($\eta=\tfrac14$) và đoạn sau Bổ đề 05b.6 (ngưỡng $\tfrac2L$, Ví dụ 04.7) | Bài 2.3 ($\eta=0{,}3$) | cùng dạng (bước vượt $\tfrac1L$), khác kết luận (hội tụ so với phân kỳ) |
| Ví dụ 05b.8 ($\eta=\tfrac1{10}$) và đoạn sau Định lý 05b.16 (hằng số $\tfrac{D^2}{2\eta}$ gấp $\tfrac1{L\eta}$ lần) | Bài 3.3 | cùng dạng so sánh hằng số $\tfrac1{L\eta}$ |
| Hệ quả 05b.27, 05b.28 và đoạn sau | Bài 4.3, 4.4 | Bài 4.3 (Robbins–Monro) và 4.4 (chỗ dùng tính lồi) được trả lời trong văn bản sau Định lý 05b.26 và Hệ quả 05b.28 |
| Nhận xét 05b.33 (logistic: H6b toàn cục) | Bài 8.5 | nêu kết luận, không tính $\sigma^2$ |
| Tình huống 05b.3, Nhận xét 05b.42, Bài tập 05b.7(b) | Bài 9.4 | cùng câu hỏi "định lý nói gì về mạng nơ ron" |
| Nhận xét 05b.19 | Bài 10.2 | lượt 2 bỏ đáp số $\tfrac2{L+\mu}$, $\tfrac{L-\mu}{L+\mu}$ |
| Tình huống 05b.1 | Bài 8 | cùng dạng (tính $\mu$, $L$ thô và theo giá trị riêng, số bước, trường hợp $\nu=0$), khác dữ liệu |
| Bài tập 05b.7 | Bài 1.3 | cùng dạng (phân loại phát biểu), khác phát biểu |

Đề xuất cho `exercises.md` (không sửa trong lượt này): đổi dữ liệu Bài 5.1 sang bước $0{,}2$, Bài 9.2 sang $k=3$, Bài 7.3 sang $\sigma^2=4$.

## Ví dụ và bài tập tự chứa

Mỗi khối `example`, `application`, `exercise` dùng số liệu của khối khác đều mở bằng đoạn **Dữ kiện.** (cả 28 ví dụ của lượt 2 và 3) hoặc nêu dữ liệu ở đoạn **Bài toán và dữ liệu** (3 tình huống), chép lại hàm, điểm đầu, hằng số, công thức được áp dụng và kết quả của bước trước, kèm số hiệu nguồn trong ngoặc. Script liệt kê các khối có dẫn khối khác: mọi khối đều có đoạn dữ kiện. Ví dụ: Ví dụ 05b.19 chép $J$, $\mu=L=1$, $\sigma^2=\tfrac83$, $D=1$ và công thức đóng của $a_k$ (từ Ví dụ 05b.2, 05b.17); Ví dụ 05b.28 chép $\Delta_0$, $\sigma^2$ và $a_k$; Bài tập 05b.5 chép $J$ và phương sai một mẫu.

## Độ dài

Lượt 1: 32 308 từ. Lượt 2: 32 955 từ, vượt khoảng chấp nhận 31 300–31 800 của điều phối viên khoảng 1 150 từ. Gói cắt được duyệt đã thực hiện đủ (khoảng 950 từ) và thêm ba chỗ rút (mục tiêu học tập, "Ngoài phạm vi", "Giới hạn" của Tình huống 05b.3; khoảng 200 từ). Phần tăng đến từ các sửa bắt buộc: chứng minh bốn bước của Định lý 05b.39 (khoảng 300 từ), bát giác bất biến và kiểm phương sai ở Tình huống 05b.2 (khoảng 250), bảng mục tiêu và câu (d), (e) của Bài tập 05b.5, 05b.9 (khoảng 450), hai nhận xét mới, móc nối 04.21, câu dẫn và đoạn "Trong học máy" bổ sung, câu số liệu ở đầu các mục, chứng minh dãy ở lại $[-2,2]$ (khoảng 600), các chuỗi chuyển sang `aligned` và danh sách. Người soạn không cắt thêm khối nào ngoài gói được duyệt; nếu cần về khoảng chấp nhận, ứng viên là Ví dụ 05b.3 (kiểm năm giả thiết, khoảng 220 từ), Nhận xét 05b.11 (khoảng 110), đoạn đọc hình lát cắt ở §2.2 (khoảng 100), phần "Kiểm tra lại" dài của Tình huống 05b.1 và 05b.3 (khoảng 120), mục Ứng dụng (khoảng 170).

## Tự kiểm `no-ai-slop`

| Mục eval.md | Kết quả | Ghi chú |
|---|---|---|
| Giữ ý, không thêm khẳng định không nguồn | đạt | Các khẳng định về thực hành (lịch bậc thang, PL cục bộ cho mạng rộng) có nguồn hoặc được viết như mô tả định tính; câu "kết quả cho mạng rất rộng" dẫn Liu, Zhu và Belkin (2022). |
| Từ cấm, trạng từ rỗng | đạt | Quét: không "quan trọng", "đáng chú ý", "rõ ràng", "thực chất", "nói cách khác", "lưu ý". |
| Đối lập nhị phân, câu dẫn rỗng, mở đầu rào đón | đạt | Không có "không phải X mà là Y" làm nhịp câu; câu "Trực giác, chưa phải định nghĩa" giữ vì AGENTS.md yêu cầu ghi rõ. |
| Câu lặp khuôn | đạt sau sửa | "đọc như sau" giảm từ 3 xuống 1 lần; các đoạn "Trong học máy" mở bằng đối tượng cụ thể, không bằng câu khung. |
| Lời bình về mức quan trọng, ẩn dụ kết đoạn | đạt | Không có câu kết kiểu khẩu hiệu; mỗi "Kết mục" kết bằng việc mục sau làm. |
| Định dạng | đạt | In đậm chỉ dùng cho nhãn bước và nhãn đoạn theo mẫu của AGENTS.md; danh sách chỉ cho các mục song song. |
| Gạch ngang dài | đạt | Một lần, trong tiêu đề chương theo quy ước tên bài. |
| Ưu tiên giọng học thuật | đạt | Theo AGENTS.md, văn phong học thuật ưu tiên hơn gợi ý về giọng cá nhân của kỹ năng. |

## Kiểm kỹ thuật

Lượt 2:

- `git diff --check` sạch cho bốn tệp (`materials/lec-05b/lecture-note.md`, `materials/lec-05b/exercises.md`, `materials/lec-05/lecture-note.md`, `materials/lec-06/lecture-note.md`).
- Script cấu trúc trên ghi chú 05b: 139 khối mở = 139 đóng, không lồng; số hiệu sinh tự động, 0 tham chiếu treo; 36/36 tham chiếu ra ngoài đúng loại; 0 chuỗi cấm; 0 chuỗi nội dòng từ ba dấu quan hệ; 0 đoạn diễn giải quá bốn câu; 31 kết quả bốn phần có chứng minh; 28 ví dụ có **Dữ kiện.** và "Kiểm tra lại"; mọi lệnh KaTeX đều có trong KaTeX (gồm `\varsigma`, `\vartheta`, `\varpi`, `\mp`, `\Psi`).
- Playwright Chromium qua `http://localhost:8765/2627-1/material-viewer.html`, cỡ 1600×900 và 390×844, cho bốn trang: ghi chú 05b, bài tập 05b, ghi chú 05, ghi chú 06. Ở cả tám lượt: 0 lỗi trang, 0 `.katex-error`, 0 chữ đỏ KaTeX, 0 cảnh báo KaTeX, 0 lệnh `\…` thô trong văn bản hiển thị, mọi hình tải được (18, 0, 18, 9 hình), `scrollWidth` 1585 ≤ 1600 và 375 ≤ 390. Mỗi trang có một lỗi console về Content Security Policy của script nội dòng, thuộc hạ tầng viewer (có ở mọi trang). Số nút KaTeX: 3 642; 622; 3 523; 3 626. Đã xem ảnh chụp ghi chú 05b (Định lý 05b.36, màn rộng) và bài tập 05b (Bài 7, màn hẹp); ảnh ở `/tmp/claude-1000/shots05b/r2-*.png`.
- Chưa chạy `sync-local-materials.py`; chưa commit.

Lượt 1:

- `git diff --check -- 2627-1/materials/lec-05b/lecture-note.md`: sạch.
- Playwright Chromium qua `http://localhost:8765/2627-1/material-viewer.html?doc=materials/lec-05b/lecture-note.md&deck=lecture-05b-hoi-tu-ha-gradient-va-sgd.html`, cỡ 1600×900 và 390×844: 0 `.katex-error`; 0 phần tử chữ đỏ KaTeX (`.katex [style*="rgb(204, 0, 0)"]`); 0 cảnh báo KaTeX về ký tự Unicode sau khi bỏ chữ Việt có dấu khỏi `\text{}` (lượt chạy đầu có 10 cảnh báo, đã sửa ba công thức); 3 528 nút KaTeX; 18/18 hình tải được; 48 khối gập (`details` = 30 chứng minh + 9 gợi ý + 9 lời giải); không còn chuỗi `$…$` hay lệnh `\…` thô trong văn bản hiển thị; `scrollWidth` 1585 ≤ 1600 và 375 ≤ 390, không tràn ngang trang (các phần tử vượt khung ở màn hẹp là công thức trong khung cuộn riêng). Một lỗi console "Executing inline script violates the following Content Security Policy directive" xuất hiện; lỗi này cũng có khi mở ghi chú Bài 05 trong cùng viewer, nên thuộc hạ tầng viewer, không do tệp này.
- Đã xem ảnh chụp ở vị trí 30 % màn rộng (Mục 3.1, hình tổng lồng, mục lục) và 50 % màn hẹp (Ví dụ 05b.14); công thức, bảng và khối hiển thị đúng. Ảnh ở `/tmp/claude-1000/shots05b/`.
- Tiêu đề Mục 3.2 ban đầu chứa công thức, hiển thị xấu trong mục lục ("η≤L1"); đã bỏ công thức khỏi tiêu đề.
- Lệnh KaTeX dùng trong tệp (quét `\[a-zA-Z]+`): đều là lệnh có sẵn của KaTeX.
- Chưa chạy `sync-local-materials.py` (theo brief).
