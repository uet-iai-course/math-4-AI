# Nhật ký rà soát Bài 06 — ghi chú bài giảng viết lại theo tiêu chuẩn giáo trình

Tệp sản phẩm: `materials/lec-06/lecture-note.md` (viết lại hoàn toàn, ghi đè bản cũ 7 695 từ; bản cũ còn trong git). Bản đóng gói `material-local-data.js` được cập nhật bằng `scripts/sync-local-materials.py`. Không vẽ SVG mới; bản lượt 2 dùng 9 SVG có sẵn trong `img/lec-06/` (lượt 1 dùng 10; hình `adaptive-optimizers-state.svg` bị bỏ khỏi ghi chú theo gói cắt, tệp SVG giữ nguyên), không sửa hình nào. Bộ trang chiếu, `exercises.md`, CSS, viewer và `index.html` không bị sửa. Chưa commit.

## Tác tử

| Vai | Loại tác tử | Mô hình | Effort | Ghi chú |
|---|---|---|---|---|
| Soạn (authoring), lượt 1 | general-purpose | Claude Opus 5.5 (`claude-opus-5-5`) | high | Theo brief của điều phối viên Fable 5.1 ngày 2026-10-10; tác tử tự ghi dòng này, điều phối viên đối chiếu với lời gọi công cụ. |
| Rà toán (math accuracy), lượt 1 | general-purpose | Claude Opus 5.5 (`claude-opus-5-5`) | high | Chỉ đọc; theo ghi nhận của điều phối viên, báo cáo được đối chiếu và hợp nhất vào "Phát hiện lượt 1". |
| Rà mạch truyện (storyline), lượt 1 | general-purpose | Claude Opus 5.5 (`claude-opus-5-5`) | high | Chỉ đọc; như trên. |
| Chỉnh sửa (editor), lượt 2 | general-purpose (cùng tác tử soạn, tiếp tục qua SendMessage) | Claude Opus 5.5 (`claude-opus-5-5`) | high | Áp dụng quyết định "yêu cầu sửa" lượt 1 và bổ sung của điều phối viên về ví dụ, bài tập tự chứa; tác tử tự ghi dòng này. |
| Rà lại lượt 2 (hai tác tử rà) | general-purpose | Claude Opus 5.5 (`claude-opus-5-5`) | high | Chỉ đọc; theo ghi nhận của điều phối viên, báo cáo được đối chiếu và hợp nhất vào "Phát hiện lượt 2". |
| Chỉnh sửa (editor), lượt 3 | general-purpose (cùng tác tử soạn, tiếp tục qua SendMessage) | Claude Opus 5.5 (`claude-opus-5-5`) | high | Áp dụng quyết định "chấp nhận sau sửa nhẹ" lượt 2; không cắt thêm; tác tử tự ghi dòng này. |

Kỹ năng `no-ai-slop` được nạp bằng công cụ `Skill` (chế độ Edit) trước khi soạn; tự đối chiếu `eval.md` ở mục "Tự kiểm `no-ai-slop`".

## Quyết định của điều phối viên

| Lượt | Đầu ra | Quyết định | Lý do |
|---|---|---|---|
| 1 | Bản soạn 32 134 từ (`wc -w`), 145 khối | yêu cầu sửa | A1, A2 nghiêm trọng; B1–B10 trung bình; nhóm C nhẹ. Độ dài chấp nhận khoảng 31 000–31 600 từ với gói cắt nêu ở "Phát hiện lượt 1"; bổ sung ngày 2026-10-10: mọi ví dụ, bài tập tự chứa dữ kiện (mức trung bình), độ dài được nới cho phần này. Hai dòng tự kiểm "đạt" về ký hiệu và trình bày sáng sủa không đúng thực tế. |
| 2 | Bản chỉnh sửa 33 574 từ, 146 khối | chấp nhận sau sửa nhẹ | Độ dài 33 575 từ chấp nhận, không cắt thêm. Các điểm sửa nhẹ ở "Phát hiện lượt 2". |
| 3 | Bản sửa nhẹ 33 796 từ, 146 khối | chấp nhận | Điều phối viên Fable 5.1 xác nhận hai tác tử rà lại lượt 2 là general-purpose, Claude Opus 5.5 (`claude-opus-5-5`), effort high (theo lời gọi SendMessage); tự tính lại $\lambda_{\min}(H)=-2{,}068$, $\det(H+2\mathrm I)=-1{,}005$ tại $\theta_1$ của Tình huống 06.2 và đọc lại chứng minh Định lý 06.23; Playwright 1600×900 và 390×844: 0 lỗi trang, 0 `.katex-error`, 0 chữ đỏ KaTeX, 146/146 khối, 9/9 hình, không tràn ngang; `sync --check` và `git diff --check` sạch. Độ dài 33 796 từ chấp nhận (mọi phần thêm là bắt buộc: tự chứa ví dụ theo yêu cầu người dùng 2026-10-10, tách câu). Ghi chú này thay thế bản cũ `materials/lec-06/lecture-note.md` khi commit. |

## Số liệu của bản lượt 3

- 33 796 từ (`wc -w`), tăng khoảng 220 từ so với lượt 2: tách câu theo B7, câu chặn chuẩn toán tử ở §5.4, ý mới trong chứng minh Định lý 06.18, câu góc $26{,}6^\circ$ ở mở §3, phát biểu lại (3.5) và các cận của Mệnh đề 06.36 trong đề bài. Không cắt thêm theo quyết định lượt 2.
- 146 khối mở = 146 đóng, không lồng; 9 hình; 16 đoạn "Trong học máy"; số hiệu không đổi so với lượt 2 (06.1–06.44, Ví dụ 06.1–06.29, Bài tập 06.1–06.13, Tình huống 06.1–06.3, Thuật toán 06.1–06.8).
- 467 tham chiếu `06.k` đúng khối, đúng loại.

## Phát hiện lượt 2 và cách xử lý

Các mục do điều phối viên hợp nhất từ hai báo cáo rà lại lượt 2. Vị trí ghi theo số hiệu lượt 2 (không đổi ở lượt 3). Không xóa phát hiện nào.

| # | Mức độ | Vị trí | Vấn đề | Cách xử lý (lượt 3) | Trạng thái |
|---|---|---|---|---|---|
| 1 | nhẹ | §5.4, "Trong học máy" | "chỉ khi" sai chiều: chuẩn của tích bị chặn bởi $(1+c_{\rm s})^L$ khi các chuẩn Jacobi không vượt $c_{\rm s}$ | Viết "chuẩn toán tử … bị chặn trên bởi $(1+c_{\rm s})^L$ khi …", kèm lý do: chuẩn toán tử có tính nhân dưới và $\lVert\mathrm I+J\rVert\le1+\lVert J\rVert$; giữ câu sau | đã sửa |
| 2 | nhẹ | Toàn tệp | Ký hiệu còn trùng sau B3 | Độ trễ trong Mệnh đề 06.7, chứng minh, đoạn RMSProp và câu đọc hình đổi $k\to\Delta$ ("trục $k$ trên hình là $\Delta$"); trọng số Adam trong Mệnh đề 06.9, chứng minh, Ví dụ 06.8 đổi $w_i\to\varrho_i$; trọng số Jensen đổi $w_t\to\upsilon_t$ (Kiến thức tiên quyết dùng $\upsilon_k$, $z_k$), trung bình Polyak mô tả bằng lời không dùng $\varrho$; lịch tiếp diễn $c^{(0)},\ldots,c^{(\bar n)}$ với chỉ số giai đoạn $n$, phân phối theo giai đoạn $\mathcal D_n$, $\mathcal D_{\bar n}$; Bài tập 06.5(d) dùng $P^\circ$; dòng $h_l$ của bảng ký hiệu ghi "$\mathbb R^{n_{\rm in}}$, vô hướng trong Mục 5.4". Quét lệnh KaTeX lạ và chữ đỏ: 0 | đã sửa |
| 3 | trung bình | Ví dụ 06.13 vòng 1; Ví dụ 06.17 gạch "Bước"; Bài tập 06.5(b); Ví dụ 06.20 "Tính"; Tình huống 06.1 vòng 1, 2; Tình huống 06.2 gạch Armijo và đoạn "Vòng ngoài thứ hai"; Tình huống 06.3 hai gạch thống kê nhóm | B7 sót: câu hoặc gạch gộp từ ba phép tính | Tách thành gạch đầu dòng tối đa hai đại lượng theo mẫu Ví dụ 06.17; Armijo của Tình huống 06.2 thành hai gạch theo $\alpha$; đoạn "Vòng ngoài thứ hai" bỏ $w_1w_2$ khỏi câu đầu, gradient một câu riêng; Tình huống 06.3 ghi nhóm $a$, hai thống kê, rồi $z$ ở câu sau | đã sửa |
| 4 | nhẹ | Nhật ký | Bảng trùng lặp và tự kiểm còn số hiệu lượt 1; mô tả bài tập cũ | Cập nhật bảng trùng lặp (Định nghĩa 06.21, Ví dụ 06.21, Định nghĩa 06.38, Mệnh đề 06.40, 06.42), mô tả bài tập của ghi chú, đề xuất đổi dữ liệu thêm Bài 1 và Bài 12(3), dòng KN6 và "Móc nối" của bảng tự kiểm, điểm 12 của mục lệch deck | đã sửa |
| 5 | nhẹ | Tình huống 06.2, "Diễn giải" ý 3 | Lý do hội tụ tuyến tính gán sai cho Hessian suy biến | Hội tụ tuyến tính vì $\tau$ cố định giữ hệ số $\tau/(\lambda+\tau)$ theo hướng pháp tuyến; Hessian suy biến chỉ làm hướng tiếp tuyến không co, và sai số theo hướng đó không ảnh hưởng tới $F$ | đã sửa |
| 6 | trung bình | Định lý 06.18(d), Bước 5 của chứng minh | Bước 5 dùng $r_{k+1}^Tq_i=0$ khi $j=k+1$, nhưng (d) chỉ phát biểu tới $j\le k$ | (d) mở rộng thành $0\le i<j\le k+1$; cuối Bước 3 thêm câu: ý 1, 2 chỉ dùng $\mathcal I_j$, không dùng $r_{j+1}\ne0$, nên áp với $j=k$ cho (d) khi $j=k+1$; Bước 5 ghi "với $j\le k+1$". Lời giải Bài tập 06.12(b) dùng (f) với $j=2$, $k=1$ và (c) với $k=1$: khớp phát biểu mới, không sửa | đã sửa |
| 7 | nhẹ | Nhiều chỗ | Trình bày, nguồn, tự chứa | Tách câu trực giác của chuẩn hóa theo lô; mở §3 thêm "từ $\theta_0=(1,0)^T$, hướng $-g=(-2,-1)^T$ lệch $26{,}6^\circ$ so với hướng tới nghiệm $(-1,0)^T$"; chuỗi suy luận §4 theo thứ tự Ví dụ 06.15 → Định nghĩa 06.21 → Mệnh đề 06.22 → Định lý 06.23 → Định nghĩa 06.25, Mệnh đề 06.26 → Thuật toán 06.6 → Ví dụ 06.18, Thuật toán 06.7, Mệnh đề 06.27; phép kiểm sau Mệnh đề 06.27 rút còn một câu dẫn Ví dụ 06.18 ($\vartheta_1=\tfrac12$, $\vartheta'=\tfrac14$, đầu ra $(\tfrac14,\tfrac12)^T$); "zigzag" → "zích zắc" ở câu đọc hình `cg-path`; Yosinski và cộng sự (2014) "dẫn qua Goodfellow, Bengio và Courville 2016, tr. 325"; Tình huống 06.1 dẫn Kingma và Ba (2015, mục 4) cho lịch $\eta_t=\eta/\sqrt t$ thay cho "thực hành"; kết chương "khi có nghiệm tối ưu và miền có đỉnh, có một nghiệm tối ưu nằm ở một đỉnh"; Định nghĩa 06.35: khối nối tắt, còn gọi là khối phần dư (residual block), đường cộng thẳng gọi là kết nối tắt (skip connection); Bài tập 06.3(c) và "Kiểm tra lại" của Ví dụ 06.14 viết lại (3.5) $g^Td_k<-\tfrac12d_k^TAd_k$; Bài tập 06.8(b) ghi ba cận $(1-c_{\rm s})^L$, $(1+c_{\rm s})^L$, $c_{\rm s}^L$ ngay trong đề | đã sửa |

## Số liệu của bản lượt 2

- 33 574 từ (`wc -w`), tăng 1 440 từ so với lượt 1 dù đã thực hiện gói cắt; lý do ở mục "Độ dài".
- 146 khối mở = 146 đóng, không lồng; 9 hình; 16 đoạn "Trong học máy".
- Bộ đếm chung 06.1–06.44: 13 định nghĩa (thêm Định nghĩa 06.35, khối nối tắt), 2 định lý, 20 mệnh đề, 1 hệ quả, 8 nhận xét.
- Bộ đếm riêng: Ví dụ 06.1–06.29 (bỏ Ví dụ 06.21 lượt 1, thêm Ví dụ 06.18 về tích $Pg$); Bài tập 06.1–06.13 (không đổi số hiệu); Tình huống 06.1–06.3; Thuật toán 06.1–06.8.
- 23 `proof`, 13 `hint`, 13 `solution`; 466 tham chiếu `06.k` đúng khối, đúng loại.

## Phát hiện lượt 1 và cách xử lý

Các mục do điều phối viên hợp nhất từ báo cáo rà toán và rà mạch truyện, đã đối chiếu với tệp. Vị trí ghi theo số hiệu lượt 1. Không xóa phát hiện nào.

| # | Mức độ | Vị trí (lượt 1) | Vấn đề | Cách xử lý (lượt 2) | Trạng thái |
|---|---|---|---|---|---|
| A1 | nghiêm trọng | Tình huống 06.2, "Các vòng sau" | Tại $\theta_1$, $H+2\mathrm I$ bất định ($\lambda_{\min}\approx-2{,}069$, định thức $\approx-1{,}01$); dãy $F$ chỉ khớp khi gradient liên hợp dừng vì độ cong âm | Chọn phương án (i), viết đúng điều đã xảy ra. Thêm đoạn "Vòng ngoài thứ hai": Hessian tại $\theta_1$, vòng trong 0 cho $d_1\approx(-0{,}375;\,-0{,}286)$, vòng trong 1 có $q_1^TAq_1\approx-0{,}0048$, dừng theo bước 2 của Thuật toán 06.5 và trả $d_1$, $g^Td_1\approx-3{,}26$, Armijo nhận $\alpha=1$. Tỷ số giảm của $F$ ghi $9{,}4$; $13{,}9$; $16{,}9$; $18{,}3$ tới $18{,}8$, giải thích bằng $\bigl((\lambda+\tau)/\tau\bigr)^2$ với $\lambda=w_1^2+w_2^2\approx6{,}67$. "Diễn giải" ba ý: $\tau$ cố định không bảo đảm giả thiết ở mọi vòng; hướng tính trước khi gặp độ cong âm vẫn giảm. Thuật toán 06.5 bước 2 nói rõ trả $d_k$ hiện có. Mọi số tính lại bằng Python (`chk/c10.py`) | đã sửa |
| A2 | nghiêm trọng | §5.1 (đoạn trực giác, đoạn sau Định nghĩa 06.28, "Trong học máy"), mở §5.4 | Đối tượng chuẩn hóa không nhất quán ($h$ hay $a=Wh$) | Thống nhất: chuẩn hóa áp lên tiền kích hoạt lớp $l$, sau hàm kích hoạt thành đầu vào $h$ của lớp $l+1$ trong (5.1); bỏ chữ "luôn", nêu $\gamma$ vẫn đổi thang; mở §5.4 viết lại theo câu điều phối viên đề xuất | đã sửa |
| B1 | trung bình | Tình huống 06.1 "Diễn giải"; "Trong học máy" §2.4 | Câu "Adam dao động ở biên độ cỡ $\eta$" sai với gradient đầy đủ | Thay bằng sai số mỗi tọa độ $1{,}3\cdot10^{-3}$ (vòng 121), $7\cdot10^{-6}$ (200), $4\cdot10^{-12}$ (500), bằng $0$ từ khoảng vòng 1000 (tính lại); dao động chỉ với gradient nhóm. Thêm "$\kappa=10^4$: từ vòng 162". §2.4 dẫn Kingma và Ba (mục 4, $\eta_t=\eta/\sqrt t$) và DL tr. 309 | đã sửa |
| B2 | trung bình | "Ứng dụng" | Mô tả Martens, Mệnh đề 06.10 quá mạnh | Viết lại theo đề xuất | đã sửa |
| B3 | trung bình | Toàn tệp | Một chữ nhiều nghĩa | $P$ phân phối → $\mathcal D$; lịch tiếp diễn → $c^{(0)},\ldots,c^{(\bar k)}$, chỉ số giai đoạn $k$; số cặp L-BFGS trong Thuật toán 06.7 → $n_{\rm m}$; chiều của $h$ → $n_{\rm in}$; $L_{\mathcal B}$ → $\ell_{\mathcal B}$; $S$ trong Kiến thức tiên quyết → $A$, số khối → $n_{\rm b}$; chỉ số tổng $s$ (Mệnh đề 06.34) → $i$; trọng số Jensen → $w_t$; $\varphi$ hàm dọc tia (Bài tập 06.6) → $F_d$; $W$ của Bài 04 → "ma trận $M/\eta$"; mã $H$, từ điển $W$ bỏ ký hiệu; biến tích phân $\vartheta$ → $\varsigma$ (giữ $\vartheta_i$ cho L-BFGS); $P^0$ của L-BFGS → $P^\circ$; bảng ghi $h\in\mathbb R^{n_{\rm in}}$, $h_l\in\mathbb R$; $[\delta]_k=0{,}5$; ma trận $D^{-1/2}QD^{-1/2}$ trong chứng minh Mệnh đề 06.12 đổi tên từ $S$ thành $\widetilde Q$ ($S$ chỉ còn là phép đổi biến của Mệnh đề 06.13); $\mu$ của Bài 04 bỏ; $\underline\lambda$ cho cận dưới giá trị riêng. Quét lệnh KaTeX dính chữ: không có | đã sửa |
| B4 | trung bình | §4 | Thứ tự KN6 và thiếu ví dụ | Định nghĩa 06.21 (cát tuyến) lên ngay sau Ví dụ 06.15, có câu trực giác; dòng số trước Định nghĩa 06.25 trên hàm $\tfrac12\theta^TQ\theta$ ($\alpha=0{,}01$ được Armijo nhận, bị điều kiện độ dốc loại); Ví dụ 06.18 mới (tích $Pg$ từ một cặp, $g=(1,1)^T$) trước Thuật toán 06.7; câu dẫn "Thuật toán sau…; Mệnh đề 06.27 chứng minh…"; phép kiểm đệ quy hai vòng đổi sang $g=(1,1)^T$ | đã sửa |
| B5 | trung bình | §2.3, §2.5, §5.4, §2.4 | Thiếu "Trong học máy", định nghĩa, trực giác | Thêm "Trong học máy" cho RMSProp (hệ số $0{,}9$ của Hinton và cộng sự, mặc định $0{,}99$ của PyTorch, giả thiết cùng vùng trong độ dài bộ nhớ) và cho §2.5 (đặc trưng tương quan cho Hessian không chéo); Định nghĩa 06.35 khối nối tắt; câu về tích ma trận $\prod(\mathrm I+J_{f_l})$; câu trực giác cho Adam | đã sửa |
| B6 | trung bình | Ví dụ 06.17; lời giải 06.13(c) | Thiếu đại lượng trung gian; tham chiếu sai | Ghi $y^Ty$, hệ số $\tfrac{11}5$, phần tử $\tfrac{34}{49}$, $g^Td=-\tfrac{45}{196}$, $d^TQd=\tfrac{675}{2744}$; lời giải 06.13(c) dẫn phản ví dụ $(\theta^2-1)^2$ sau Hệ quả 06.33, "tệ" → "có mất mát lớn hơn" | đã sửa |
| B7 | trung bình | Các dòng điều phối viên liệt kê | Trình bày sáng sủa | Bảng theo vòng cho Ví dụ 06.14, Bài tập 06.3, Tình huống 06.2 và lời giải Bài tập 06.2(a); gạch đầu dòng tối đa hai đại lượng ở Ví dụ 06.17, Bài tập 06.5(d), 06.6(a), 06.7(a), 06.9, 06.10, 06.13; tách câu và đoạn ở các dòng nêu; chứng minh Định lý 06.18 tách ý 4 và 5, khối `$$` thụt lề trong danh sách (đã kiểm render); câu dẫn giữa ba khối công thức của Tóm tắt; §3.1, §4.1 mở bằng một câu | đã sửa |
| B8 | trung bình | Bài tập 06.10, 06.8(c), 06.9 | Gần trùng bài chính thức | 06.10 đổi dữ kiện (có tích Hessian–vectơ, ngân sách $10p$, đáp án Newton–CG, $n_{\rm m}\le5$); 06.8(c) hỏi $T$ nhỏ nhất ($T=30$); 06.9(b) hỏi $\pi$ nhỏ nhất để phần thừa $\le10^{-3}$ ($\approx0{,}458$), 06.9(c) tiền huấn luyện với khối $w_1$ đóng băng; bảng trùng cập nhật | đã sửa |
| B9 | trung bình | Nhiều chỗ | Toán nhẹ | Định lý 06.18 tách lượng từ và thêm $K\ge p$ vào (g); "$\tfrac13p^3$ phép tính dấu phẩy động"; Kiến thức tiên quyết nêu Định nghĩa 04.10 lấy $c_1\in(0,\tfrac12)$, Mệnh đề 04.11 cần $c_1\in(0,1)$; bỏ "vài trăm tham số"; Mệnh đề 06.22(b) chứng minh qua $F_s$ lồi; Tình huống 06.3 nối $\sigma_{\mathcal B}^2=2J(\widehat\theta)$; "trên mô hình này" ở §5.3; Bài tập 06.13 ghi hạng $\tfrac{\mu_0}2\lVert\theta\rVert^2$; Shewchuk: giữ mục 8–9 và phụ lục B2 theo dẫn chiếu đã kiểm trong `outline.md`, bỏ số mục ở hai câu không chắc. Đoạn "Phi tuyến" của Nhận xét 06.19 bị cắt nên không còn dẫn trang | đã sửa |
| B10 | trung bình | Các bước nhảy | Thiếu phát biểu lại | Phát biểu lại Mệnh đề 04.29(c) một câu; Tình huống 06.3 thêm "$2J(\widehat\theta)$ là phương sai mẫu với mẫu số $N$"; Ví dụ 06.23 định nghĩa $\zeta_t$ và tính $V_\zeta=\tfrac{4+0+4}3$; "ghi chú này không chứng minh" | đã sửa |
| C | nhẹ | Nhiều chỗ | Thuật ngữ, no-ai-slop, nguồn | Đã sửa: CG, SGD, giải thích tên; thuật ngữ gốc (skip connection, exponential moving average, pre-activation, automatic differentiation, two-loop recursion, transfer learning, autoencoder, alternating least squares, online convex optimization, validation loss, recurrent neural network); định nghĩa "kênh"; "zích zắc"; định nghĩa tìm bước chính xác; bỏ colon reveal và lời bình ở các dòng nêu; bỏ hai câu "Định lý đọc theo từng phần"; "hỏng", "sụp đổ", "không cứu được", "tồi", "tệ" thay bằng "không thỏa", "bị vi phạm", "không còn đúng"; khẳng định không nguồn dẫn nguồn hoặc bỏ; thêm Yosinski và cộng sự (2014), Zaremba và Sutskever (2014); dẫn B&V 9.5.1 cho Mệnh đề 06.13, Nocedal–Wright 6.1, 3.1, 7.2; thống nhất thước đo bộ nhớ ($\beta_i/(1-\beta_i)$ so với $1/(1-\beta_i)$, lệch $1$); mở chương nhắc Nhận xét 04.36, Tình huống 04.3; kết chương nêu giới hạn không ràng buộc, liên tục, bước cục bộ; "nơ-ron"; ví dụ số trước Mệnh đề 06.10, 06.11, 06.26; câu "cần gì" trước 06.29, 06.31; nhắc lại Ví dụ 06.5 sau 06.6 và Ví dụ 06.22 sau Hệ quả 06.33 | đã sửa |
| D | quyết định độ dài | Toàn tệp | Gói cắt được duyệt | Đã cắt: hình `adaptive-optimizers-state` và đoạn đọc; Ví dụ 06.21; chứng minh Mệnh đề 06.27 thay bằng dẫn Nocedal–Wright mục 7.2 cùng ý quy nạp, giữ phép kiểm số; Bài tập 06.12(c); gộp đoạn "Mục này…" của Mục 1–6 vào đoạn mở; đoạn "Phi tuyến" của Nhận xét 06.19; rút đoạn mở §3 và "Hội tụ cục bộ" của Nhận xét 06.14. Thêm: bỏ câu 4, 5 của Bài tập 06.11. Không cắt Mệnh đề 06.13, 06.7(c), Ví dụ 06.29, Bài tập 06.12(a)(b), "Giới hạn" và "Dẫn ngược" của tình huống | đã sửa; độ dài vượt khoảng chấp nhận, xem "Độ dài" |
| E | trung bình (bổ sung 2026-10-10) | Mọi khối ví dụ, tình huống, bài tập | Ví dụ, bài tập phải tự chứa dữ kiện | Bảng "Ví dụ và bài tập tự chứa" dưới đây | đã sửa |

## Ví dụ và bài tập tự chứa (bổ sung lượt 2)

Quy tắc mới trong `AGENTS.md` (yêu cầu người dùng 2026-10-10). Script liệt kê mọi khối `example`, `application`, `exercise`, `hint`, `solution` có dẫn khối khác; các khối dùng dữ kiện của khối khác được mở bằng đoạn **Dữ kiện** chép lại giá trị cần dùng, kèm số hiệu nguồn.

| Khối (lượt 2) | Khối bị tham chiếu | Cách xử lý |
|---|---|---|
| Ví dụ 06.2 | Ví dụ 06.1 | Chép $F$, $\theta_0=(1,1)^T$, $g=(1,9)^T$ |
| Ví dụ 06.6 | Ví dụ 06.4 | Đã chép $g_1$, $g_2$ từ lượt 1; giữ |
| Ví dụ 06.8 | Ví dụ 06.7 | Chép $\beta_1$, $\beta_2$, $m_1$, $v_1$, $g_2$ |
| Ví dụ 06.10 | Ví dụ 06.9 | Chép ma trận $Q$, điểm đầu, nghiệm |
| Ví dụ 06.11 | Ví dụ 06.10 | Chép $F$, $Q$, $\theta_0$, $g$ |
| Bài tập 06.4 | Ví dụ 06.12 | Chép $g=(0,-1)^T$, $H=\operatorname{diag}(1,-1)$, $\tau=2$ |
| Ví dụ 06.15 | Ví dụ 06.9 | Chép $Q$ |
| Ví dụ 06.16 | Ví dụ 06.15 | Đã chép $s$, $y$; giữ |
| Ví dụ 06.17 | Ví dụ 06.9 | Chép $Q$ |
| Ví dụ 06.18 (mới) | Ví dụ 06.15, 06.16 | Chép $s$, $y$, $y^Ts$, $P_1$, công thức (4.1) dạng $V^TV+ss^T/(y^Ts)$ |
| Ví dụ 06.21 | Ví dụ 06.9 | "Kiểm tra lại" chép $Q$ |
| Ví dụ 06.23 | Ví dụ 05.1, 05.14 | Chép ba quan sát, mô hình, mất mát, $F$, cách lấy mẫu, $\zeta_t$, $V_\zeta$ |
| Ví dụ 06.25 | Mệnh đề 06.37 | Chép mục tiêu đích và gradient |
| Ví dụ 06.28 | Ví dụ 06.1, 06.2, 06.9, 06.11 | $F$ đã chép; chép $Q$ ở phần "Đổi dữ kiện" |
| Bài tập 06.8(a) | Mệnh đề 06.34 | Chép đệ quy sai số và ba công thức được áp dụng |
| Bài tập 06.9(a) | Mệnh đề 06.40(e) | Viết bước $\theta^+=\theta-\eta G_0'(\theta)$ trong đề |
| Tình huống 06.1 | Tình huống 05.2 | Đã chép dữ liệu từ lượt 1; giữ |
| Tình huống 06.2 | Mệnh đề 06.37, Tình huống 04.3 | Chép công thức gradient và Hessian của mạng |
| Gợi ý Bài tập 06.9, lời giải Bài tập 06.13 | Ví dụ 06.27, Tình huống 06.3 | Dẫn phương pháp, không dùng số liệu; giữ |

## Bảng đổi số hiệu (lượt 1 → lượt 2)

Bài tập 06.1–06.13, Tình huống, Thuật toán và các số hiệu không ghi dưới đây không đổi.

| Lượt 1 | Lượt 2 | Đối tượng |
|---|---|---|
| Định nghĩa 06.22 | Định nghĩa 06.21 | phương trình cát tuyến (đổi chỗ) |
| Mệnh đề 06.21 | Mệnh đề 06.22 | Hessian trung bình |
| (mới) | Định nghĩa 06.35 | khối nối tắt |
| Mệnh đề 06.35 | Mệnh đề 06.36 | hệ số truyền qua nối tắt |
| Mệnh đề 06.36 | Mệnh đề 06.37 | mạng tuyến tính hai lớp |
| Định nghĩa 06.37, 06.38 | Định nghĩa 06.38, 06.39 | tiền huấn luyện, tiếp diễn |
| Mệnh đề 06.39 | Mệnh đề 06.40 | họ bậc bốn |
| Định nghĩa 06.40 | Định nghĩa 06.41 | học theo chương trình |
| Mệnh đề 06.41 | Mệnh đề 06.42 | nghiệm theo lịch |
| Nhận xét 06.42, 06.43 | Nhận xét 06.43, 06.44 | ba chiến lược; bảng chọn |
| (mới) | Ví dụ 06.18 | tích $Pg$ từ một cặp |
| Ví dụ 06.18, 06.19 | Ví dụ 06.19, 06.20 | chuẩn hóa theo lô |
| Ví dụ 06.20 | Ví dụ 06.21 | hạ theo tọa độ |
| Ví dụ 06.21 | (bỏ) | hai biến ghép mạnh; nội dung rút thành một câu sau Mệnh đề 06.31 |

## Số liệu của bản lượt 1

- 32 134 từ (`wc -w`); 145 khối mở bằng `::: <loại>`, 145 dòng `:::` đóng, không lồng.
- Bộ đếm chung 06.1–06.43: 12 định nghĩa, 2 định lý, 20 mệnh đề, 1 hệ quả, 8 nhận xét.
- Bộ đếm riêng: Ví dụ 06.1–06.29; Bài tập 06.1–06.13 (10 trong mục, 3 củng cố, một bài cho mỗi mức); Tình huống 06.1–06.3; Thuật toán 06.1–06.8.
- 23 khối `proof` (mỗi định lý, mệnh đề, hệ quả có chứng minh ngay sau), 13 `hint`, 13 `solution`; 10 hình; 14 đoạn "Trong học máy"; 7 "Chuỗi suy luận của mục" cùng một chuỗi toàn chương; 7 "Kết mục".
- Bảng ký hiệu 21 dòng. Công thức đánh số: (1.1)–(1.4), (2.1)–(2.2), (3.1)–(3.5), (4.1)–(4.2), (5.1)–(5.3), (6.1)–(6.2).
- Script nhận 457 tham chiếu `06.k`, mọi tham chiếu trỏ đúng khối đúng loại (số hiệu sinh tự động từ nhãn, nên không có tham chiếu treo).

## Cấu trúc chương và ánh xạ với bộ trang chiếu

Bảng dưới ghi số hiệu lượt 1; đổi sang lượt 2 theo "Bảng đổi số hiệu".

| Mục | Mạch | Nội dung chính |
|---|---|---|
| 1. Bài toán và mô hình bước cập nhật | A | Định nghĩa 06.1 (bốn thành phần), Ví dụ 06.1 (độ cong $1$ và $9$), Định nghĩa 06.2, Mệnh đề 06.3 (nghiệm, hướng giảm, bất định thì không bị chặn dưới) |
| 2. Thống kê gradient theo tọa độ | B | Định nghĩa 06.5, Thuật toán 06.1–06.3, Mệnh đề 06.6 (AdaGrad), 06.7 (trung bình mũ), 06.9 (hiệu chỉnh moment), 06.10 (bước Adam không nhất thiết giảm), 06.11 (bất biến theo thang chéo), 06.12 (thang chéo không cải thiện $\kappa(Q)$) |
| 3. Độ cong và hệ Newton | C | Mệnh đề 06.13 (bất biến affine của Newton), Định nghĩa 06.15, Mệnh đề 06.16 (giảm chấn), Định nghĩa 06.17, Thuật toán 06.4, Định lý 06.18 (tính chất gradient liên hợp, kết thúc sau $\le p$ vòng), Mệnh đề 06.20, Thuật toán 06.5 (Newton–CG) |
| 4. Thông tin độ cong từ sai phân gradient | D | Mệnh đề 06.21 (Hessian trung bình), Định nghĩa 06.22, Định lý 06.23 (BFGS), Định nghĩa 06.25, Mệnh đề 06.26 (Wolfe), Thuật toán 06.6–06.7, Mệnh đề 06.27 (đệ quy hai vòng) |
| 5. Phép tính mô hình, khối biến và quy tắc trả về | E | Định nghĩa 06.28, Mệnh đề 06.29 (chuẩn hóa theo lô), Thuật toán 06.8, Mệnh đề 06.31 (hạ theo khối), Định nghĩa 06.32, Hệ quả 06.33, Mệnh đề 06.34 (Polyak trên hàm bậc hai có nhiễu), Mệnh đề 06.35 (nối tắt) |
| 6. Huấn luyện theo giai đoạn | F | Mệnh đề 06.36 (mạng tuyến tính hai lớp), Định nghĩa 06.37, 06.38, 06.40, Mệnh đề 06.39 (họ bậc bốn), 06.41 (học theo chương trình), Nhận xét 06.42 |
| 7. Lựa chọn phương pháp theo dữ kiện | G | Nhận xét 06.43 (bảng chọn), Ví dụ 06.28, 06.29 |
| Tình huống | G02 và toàn bài | 06.1 Adam trên hồi quy của Tình huống 05.2, giả thiết hỏng khi dữ liệu quay; 06.2 Newton–CG giảm chấn trên mạng tuyến tính hai lớp, Hessian bất định; 06.3 chuẩn hóa theo lô khi suy luận một quan sát, giả thiết hỏng |

## Giáo trình đã tham khảo

Số trang Goodfellow, Bengio và Courville (2016) là trang in, đọc từ `sources/Deep Learning by Ian Goodfellow, Yoshua Bengio, Aaron Courville (z-lib.org).pdf` bằng `pdftotext` (trang in = trang PDF − 16): mục 8.5 bắt đầu tr. 306, 8.5.1 và 8.5.2 tr. 307, thuật toán 8.4 tr. 308, thuật toán 8.5 tr. 309, 8.5.3 tr. 308, thuật toán 8.7 tr. 311, 8.5.4 tr. 309–310, 8.6 và 8.6.1 tr. 310, công thức 8.28 tr. 312, 8.6.2 tr. 313, hình 8.6 tr. 314, công thức 8.30–8.31 tr. 314–315, 8.6.3 tr. 316, bộ nhớ $O(n^2)$ và L-BFGS tr. 317, 8.7.1 tr. 317–321 (công thức 8.35–8.37 tr. 318–319, ví dụ mạng tuyến tính tr. 319–320, khuyến nghị chuẩn hóa $XW$ tr. 320–321), 8.7.2 tr. 321–322 (công thức 8.38 tr. 321, hàm $(x_1-x_2)^2+\alpha(\cdot)$ tr. 322), 8.7.3 tr. 322 (công thức 8.39), 8.7.4 tr. 323–325 (hình 8.7 tr. 324), 8.7.5 tr. 326–327, 8.7.6 tr. 327–329 (công thức 8.40 tr. 327, Zaremba và Sutskever tr. 329). Martens (2010) đọc từ `sources/Deep_HessianFree.pdf`: mục 3, 4.1 (quy tắc chỉnh $\lambda$ với ngưỡng $\tfrac14$, $\tfrac34$ và hệ số $\tfrac32$, $\tfrac23$), 4.2 (Gauss–Newton), 4.3 (nhóm cố định trong một lần chạy CG), 4.4 (phần dư dao động, $\phi$ giảm đều). Không có PDF cục bộ của Nocedal và Wright (2006), Shewchuk (1994), Kingma và Ba (2015), Ioffe và Szegedy (2015), Duchi và cộng sự (2011), Reddi và cộng sự (2018), Polyak và Juditsky (1992), Powell (1973), Pearlmutter (1994), Santurkar và cộng sự (2018), He và cộng sự (2016), Bengio và cộng sự (2009); các nguồn này dẫn theo cấu trúc đã biết hoặc theo dẫn chiếu của deck, chưa kiểm số trang. Không dịch hoặc chép đoạn văn nào.

| Mục của chương | Nguồn và mục | Điều học được và chuyển vào ghi chú |
|---|---|---|
| 1 (khung, bước có phạt) | DL 8.5 (tr. 306), 8.6.1; B&V 9.4.1; Bài 04 Định nghĩa 04.8, Mệnh đề 04.9 | DL mở 8.5 bằng nhận xét mặt mất mát nhạy theo một số hướng; ghi chú lượng hóa bằng Ví dụ 06.1 và viết mọi bộ tối ưu thành bài toán con có phạt (khung sư phạm của deck A04), thêm phần (c) của Mệnh đề 06.3 cho ma trận bất định. |
| 2.1–2.3 (AdaGrad, RMSProp) | DL 8.5.1–8.5.2 (tr. 307–309, thuật toán 8.4, 8.5); Duchi và cộng sự (2011); Hinton và cộng sự (2012) | Thứ tự AdaGrad → RMSProp theo DL; cách đọc "giảm sớm và quá mức" của AdaGrad (tr. 307) thành Mệnh đề 06.6(c); "loại bỏ lịch sử xa" thành Mệnh đề 06.7(b), (c). Vị trí $\delta$ dưới căn của thuật toán 8.5 ghi ở Nhận xét 06.8. |
| 2.4 (Adam) | DL 8.5.3 (tr. 308–309, thuật toán 8.7 tr. 311); Kingma và Ba (2015) | DL đọc Adam như RMSProp cộng momentum với hiệu chỉnh độ chệch hai moment; ghi chú chứng minh hiệu chỉnh cho trọng số tổng $1$ (Mệnh đề 06.9) và nêu phạm vi của "không chệch". Mệnh đề 06.10 và phản ví dụ hội tụ dẫn Reddi và cộng sự (2018). |
| 2.5 (giới hạn chéo) | DL 8.5 (tr. 306, giả thiết "hướng nhạy song song trục"), 8.5.4 | Câu "nếu các hướng nhạy song song trục tọa độ" của DL được phát biểu chính xác thành Mệnh đề 06.11 và mặt ngược lại thành Mệnh đề 06.12. |
| 3.1–3.3 (Newton, giảm chấn) | DL 8.6.1 (tr. 310–313, công thức 8.26–8.28); B&V 9.5.1 (bất biến affine); Nocedal và Wright 3.4; Bài 04 Định lý 04.34, Nhận xét 04.36 | DL nêu Newton chỉ hợp khi Hessian xác định dương và cách cộng $\alpha I$ cùng cái giá khi giá trị riêng âm lớn; ghi chú đổi ký hiệu thành $\tau$ và chứng minh Mệnh đề 06.16. Mệnh đề 06.13 theo cách B&V trình bày tính bất biến affine. |
| 3.4–3.5 (CG, Newton–CG) | DL 8.6.2 (tr. 313–316, hình 8.6); Shewchuk (1994) mục 7–9, phụ lục B2; Nocedal và Wright 5.1, 7.1; Martens (2010) mục 3–4 | Dẫn nhu cầu bằng zigzag của hạ dốc nhất (DL hình 8.6); chứng minh Định lý 06.18 theo cách quy nạp chuẩn của Shewchuk và Nocedal–Wright; Mệnh đề 06.20 là lập luận dấu của deck C07 viết đủ; các chi tiết Martens (nhóm cố định, phần dư dao động, Gauss–Newton) đưa vào "Trong học máy" và Tình huống 06.2. |
| 4 (BFGS, L-BFGS) | DL 8.6.3 (tr. 316–317); Nocedal và Wright 6.1, 7.2 (đệ quy hai vòng); Tibshirani (2019) theo deck | DL chỉ nêu ý tưởng và bộ nhớ; ghi chú chứng minh Định lý 06.23, thêm Mệnh đề 06.21 (Hessian trung bình) và 06.26 (Wolfe), và chứng minh đệ quy hai vòng (Mệnh đề 06.27) bằng quy nạp. Ví dụ 06.17 minh họa kết thúc hữu hạn trên hàm bậc hai. |
| 5.1 (chuẩn hóa theo lô) | DL 8.7.1 (tr. 317–321); Ioffe và Szegedy (2015) thuật toán 1–2 | DL gọi chuẩn hóa là tái tham số hóa thích ứng và nêu biểu diễn được hàm cũ nhờ $\gamma,\beta$; chuyển thành Mệnh đề 06.29(d). Thừa số $\tfrac{m}{m-1}$ khi suy luận theo thuật toán 2 của bài báo. |
| 5.2 (hạ theo khối) | DL 8.7.2 (tr. 321–322); Powell (1973) | Ví dụ mã hóa thưa và hàm ghép mạnh của DL; DL viết "bảo đảm tới cực tiểu (địa phương)", ghi chú chỉ phát biểu tính không tăng và dẫn phản ví dụ Powell cho phạm vi. Mệnh đề 06.31(b) lượng hóa câu "tiến rất chậm" của DL: hệ số $1/1{,}01^2$. |
| 5.3 (Polyak) | DL 8.7.3 (tr. 322, công thức 8.39); Polyak và Juditsky (1992); Bài 05b Bổ đề BĐ5 | Định nghĩa trung bình đều theo DL; Mệnh đề 06.34 là tính toán chính xác trên mô hình một chiều, nối với Ví dụ 05.14. |
| 5.4 (nối tắt) | DL 8.7.5 (tr. 326); He và cộng sự (2016); Bài 05 Mệnh đề 05.32 | Cách đọc "rút ngắn đường ngắn nhất" của DL; ghi chú cho cận hai phía (Mệnh đề 06.35). |
| 6 (theo giai đoạn) | DL 8.7.4 (tr. 323–325, hình 8.7), 8.7.6 (tr. 327–329); Bengio và cộng sự (2009); Bài 04 Tình huống 04.3 | Định nghĩa tiền huấn luyện, tiếp diễn, học theo chương trình theo DL; các cách hỏng của tiếp diễn theo DL tr. 328; ghi chú thêm cách hỏng do đối xứng (Mệnh đề 06.39(d)). Tiếp diễn làm trơn của DL (8.40) được nêu, họ phạt $c\theta^2$ của deck được giữ. |
| 7 và tình huống | DL 8.5.4 (tr. 309–310); Tình huống 05.2 của Bài 05 | DL ghi nhận chưa có đồng thuận về bộ tối ưu; Nhận xét 06.43 xếp theo dữ kiện, không xếp hạng. |

## Ánh xạ mục tiêu học tập – kết quả – bài tập (số hiệu lượt 2)

| Mục tiêu (LLO/CLO) | Kết quả và ví dụ | Bài tập |
|---|---|---|
| 1. Bước có phạt (LLO14; CLO2) | Định nghĩa 06.1, 06.2; Mệnh đề 06.3; Ví dụ 06.1–06.3; Nhận xét 06.4 | 06.1 |
| 2. AdaGrad, RMSProp, Adam (LLO14; CLO2, CLO3) | Định nghĩa 06.5; Thuật toán 06.1–06.3; Mệnh đề 06.6, 06.7, 06.9–06.12; Ví dụ 06.4–06.9; Tình huống 06.1 | 06.2, 06.11 (câu 1, 2, 5) |
| 3. Newton, giảm chấn (LLO15; CLO2, CLO3) | Mệnh đề 06.13, 06.16; Định nghĩa 06.15; Nhận xét 06.14; Ví dụ 06.10–06.12 | 06.3, 06.11 (câu 3) |
| 4. Gradient liên hợp, Newton–CG (LLO15; CLO2, CLO3) | Định nghĩa 06.17; Thuật toán 06.4, 06.5; Định lý 06.18; Mệnh đề 06.20; Ví dụ 06.13, 06.14; Tình huống 06.2 | 06.3, 06.4, 06.10, 06.12 |
| 5. BFGS, L-BFGS (LLO15; CLO2, CLO3) | Định nghĩa 06.21, 06.25; Mệnh đề 06.22, 06.26, 06.27; Định lý 06.23; Thuật toán 06.6, 06.7; Ví dụ 06.15–06.18 | 06.5, 06.6, 06.13 (b) |
| 6. Chuẩn hóa theo lô, hạ theo khối, Polyak, nối tắt (LLO16; CLO3, CLO4) | Định nghĩa 06.28, 06.32, 06.35; Mệnh đề 06.29, 06.31, 06.34, 06.36; Hệ quả 06.33; Thuật toán 06.8; Ví dụ 06.19–06.24; Tình huống 06.3 | 06.7, 06.8, 06.11 (câu 4, 5), 06.13 (c) |
| 7. Tiền huấn luyện, tiếp diễn, học theo chương trình (LLO16; CLO3, CLO4) | Mệnh đề 06.37, 06.40, 06.42; Định nghĩa 06.38, 06.39, 06.41; Nhận xét 06.43; Ví dụ 06.25–06.27 | 06.9, 06.11 (câu 6) |
| 8. Chọn phương pháp (LLO14–LLO16; CLO2–CLO4) | Nhận xét 06.44; Ví dụ 06.28, 06.29; ba tình huống | 06.10, 06.13 |

## Tự kiểm theo bảng kiểm "Kiểm định ghi chú bài giảng"

| Tiêu chí | Kết quả | Bằng chứng |
|---|---|---|
| Mỗi mục tiêu có kết quả hoặc ví dụ và bài tập | đạt | Bảng ánh xạ trên. |
| Tám bước cho mỗi khái niệm trọng tâm | đạt theo tự kiểm | KN0: Ví dụ 06.1 (nhu cầu), trực giác §1.3, Ví dụ 06.2, Định nghĩa 06.2, Mệnh đề 06.3 + chứng minh, Ví dụ 06.3, Nhận xét 06.4, Bài tập 06.1. KN1 AdaGrad: Ví dụ 06.4, trực giác, Ví dụ 06.5, Định nghĩa 06.5, Thuật toán 06.1, Mệnh đề 06.6 + chứng minh, đoạn nhầm lẫn (Newton chéo), Bài tập 06.2. KN2 RMSProp: nhu cầu đầu §2.3, Ví dụ 06.6, Thuật toán 06.2, Mệnh đề 06.7, hình, Nhận xét 06.8, Bài tập 06.2. KN3 Adam: nhu cầu đầu §2.4, Ví dụ 06.7, Thuật toán 06.3, Mệnh đề 06.9, Ví dụ 06.8, Mệnh đề 06.10, Bài tập 06.2. KN4 Newton: Ví dụ 06.10, trực giác §3.2, Ví dụ 06.11, (3.1), Mệnh đề 06.13, Nhận xét 06.14, Ví dụ 06.12, Định nghĩa 06.15, Mệnh đề 06.16, Bài tập 06.3. KN5 CG: nhu cầu và trực giác đầu §3.4, Ví dụ 06.13, Định nghĩa 06.17, Thuật toán 06.4, Định lý 06.18, Nhận xét 06.19, Mệnh đề 06.20, Ví dụ 06.14, Bài tập 06.3, 06.4. KN6 BFGS: Ví dụ 06.15, Định nghĩa 06.21, Mệnh đề 06.22, Ví dụ 06.16, Định lý 06.23, Nhận xét 06.24, Định nghĩa 06.25, Mệnh đề 06.26, Thuật toán 06.6, Ví dụ 06.17, Ví dụ 06.18, Thuật toán 06.7, Mệnh đề 06.27, Bài tập 06.5, 06.6. KN7–KN10: §5.1–5.4, mỗi tiểu mục có nhu cầu, câu trực giác, ví dụ, định nghĩa hoặc thuật toán, mệnh đề + chứng minh, ví dụ sau phát biểu hoặc nhận xét, Bài tập 06.7, 06.8. KN11–KN13: §6.1–6.3, tương tự, Bài tập 06.9. Bước "Nhận xét" của AdaGrad, Adam, hạ theo khối, Polyak, nối tắt viết thành đoạn "Nhầm lẫn thường gặp" hoặc đoạn phạm vi, không thành khối `remark`. |
| Ký hiệu trong bảng, mỗi chữ một nghĩa | lượt 1: không đạt (điều phối viên, mục B3: $P$, $c_1$, $n$, $L$, $S$, $s$, $\lambda$, $\varphi$, $W$, $H$, $\vartheta$, $P_0$/$P^0$, $h$, $\delta$ mang nhiều nghĩa); lượt 2: đạt theo tự kiểm sau đổi tên ở B3 | Bảng 21 dòng. Script quét $\beta$ không chỉ số (chỉ độ dịch của chuẩn hóa), $\rho$ (chỉ RMSProp), $\lambda$ (giá trị riêng, và độ cong của hàm một chiều ở Mệnh đề 06.34), $c$ (chỉ họ tiếp diễn), $\mu$ (chỉ $\mu_{\mathcal B}$). Ký hiệu cục bộ giới thiệu tại chỗ: $u$ (vectơ riêng), $\varsigma$ (vô hướng phụ), $\varpi$, $\nu$, $\zeta_t$, $V_\zeta$, $e_t$, $\vartheta_i$, $\chi$, $\chi'$, $\Phi$, $\upsilon$, $\mathcal I_j$, $w_1,w_2$, $W$, $h$, $\delta$, $a$, $\underline\lambda$, $c_1,c_2$, $c_{\rm s}$, $\varrho$. Chữ $z$ không chỉ số là vectơ tùy ý, ghi chú trong bảng. |
| Định lý đủ bốn phần, có chứng minh | đạt | Script: 23 khối định lý, mệnh đề, hệ quả đều có bốn nhãn; mỗi khối có `proof` ngay sau, kết thúc $\square$. Kết quả ngoài phạm vi (tốc độ CG theo $\sqrt\kappa$, kết thúc hữu hạn của BFGS, siêu tuyến tính, vùng tin cậy, Polyak–Juditsky, phản ví dụ Powell) chỉ được nêu trong nhận xét hoặc đoạn văn kèm nguồn, không phát biểu như đã chứng minh. |
| Ví dụ có kết quả số và "Kiểm tra lại" | đạt | Script: 29 ví dụ, 3 tình huống, 13 lời giải đều có nhãn "Kiểm tra lại". |
| Bài tập có `hint` và `solution` | đạt | 13 bài, mỗi bài một `hint` rồi một `solution`. |
| Không chuỗi cấm, không câu hỏi tu từ | đạt | Script: "trang chiếu", "xem bài giảng", "dễ thấy", "suy ra ngay", "chúng ta", "hãy", mã trang A01–G03: 0 lần. Dấu "?" chỉ còn trong tên bài báo của Santurkar và cộng sự (2018). |
| Trình bày sáng sủa | lượt 1: không đạt (điều phối viên, mục B7: nhiều câu và gạch đầu dòng gộp từ ba phép tính, câu nhiều ý); lượt 2: đạt theo tự kiểm | Chứng minh dài chia bước có nhãn; script quét chuỗi nội dòng từ ba dấu quan hệ: chỉ còn các khoảng chỉ số $0\le i<j\le k$ và $0<c_1<c_2<1$; bảng theo vòng thay gạch đầu dòng dày; script đếm câu: một đoạn năm câu là danh sách trong chứng minh Định lý 06.18 (ý 5 và ý 6 nối với khối công thức thụt lề), các đoạn văn còn lại không quá bốn câu. Script lượt 1 không đếm số phép tính trong một câu hay một gạch đầu dòng, nên không bắt được lỗi B7. |
| Số hiệu, tham chiếu, khối | đạt | Số hiệu sinh tự động theo thứ tự xuất hiện từ nhãn trong bản nháp; 467 tham chiếu (lượt 3; lượt 1: 457) `06.k` đúng khối, đúng loại; 32 số hiệu của bài trước kiểm bằng script với `lec-01`, `lec-04`, `lec-05` (Hệ quả 01.27, Định lý 01.30, Định nghĩa 04.6, 04.8, 04.10, 04.28, Mệnh đề 04.7, 04.9, 04.11, 04.29, Nhận xét 04.13, 04.16, 04.36, Thuật toán 04.2, Định lý 04.34, Tình huống 04.1, 04.3, Định nghĩa 05.1, 05.10, Định lý 05.11, 05.23, Mệnh đề 05.2, 05.17, 05.18, 05.31, 05.32, Thuật toán 05.1, 05.2, Ví dụ 05.1, 05.14, 05.18, Tình huống 05.2); Bài 05b dẫn nguyên nhãn "Bổ đề BĐ5". |
| Móc nối, "Trong học máy", chuỗi suy luận, mở và kết chương | đạt theo tự kiểm | 16 đoạn "Trong học máy" (lượt 1: 14; lượt 2 thêm §2.3 và §2.5); mở chương nối Mệnh đề 05.17 (Bài 05) và Định nghĩa 04.28, Định lý 04.34 (Bài 04); kết chương nối Bài 07 (quy hoạch tuyến tính, quy hoạch động). |
| Giáo trình ghi theo mục, dẫn tại chỗ | đạt | Bảng "Giáo trình đã tham khảo". |
| Nhất quán với deck | có lệch, ghi dưới | Mọi ví dụ của các trang ví dụ được giữ số liệu; ký hiệu đổi theo mục "Lệch với bộ trang chiếu". |

## Lệch với bộ trang chiếu: chờ sửa deck

Ghi chú đổi một số ký hiệu để mỗi chữ có một nghĩa trong cả chương. Sáu hình dùng chung giữ nhãn của deck; ghi chú có câu đối chiếu ký hiệu sau mỗi hình. Lượt 2 thêm: phân phối đích là $\mathcal D$, lịch tiếp diễn $c^{(n)}$ và phân phối theo giai đoạn $\mathcal D_n$ (lượt 3 đổi chỉ số giai đoạn từ $k$ sang $n$), khối nối tắt có định nghĩa riêng (Định nghĩa 06.35) mà deck E07 chỉ nêu bằng công thức.

1. **Tọa độ.** Deck viết $\theta_1,\theta_2$ cho tọa độ (A03, B08, C01–C04 và các hình `scale-step`, `newton-direction`, `tilted-curvature`), trùng chỉ số vòng; ghi chú viết $[\theta]_1$, $[\theta]_2$ như Bài 05.
2. **Giảm chấn.** Deck C04, C07, C08, G02 dùng $\lambda$, trùng giá trị riêng; ghi chú dùng $\tau$ (cách đặt tên của Nocedal và Wright 2006, mục 3.4).
3. **Họ tiếp diễn.** Deck F03–F07 và hình `continuation-quartic` dùng $\lambda$, $F_\lambda$; ghi chú dùng $c$, $F_c$.
4. **Gradient liên hợp.** Deck C05–C08 dùng $p_k$ cho hướng (trùng số tham số $p$), $\beta_k$ cho hệ số (trùng $\beta_1$, $\beta_2$, $\beta$), $\tau$ cho ngưỡng, $q(d)$ cho hàm cực tiểu (hình `cg-path`); ghi chú dùng $q_k$, $\omega_k$, $\varepsilon_{\rm r}$, $\phi(d)$.
5. **BFGS.** Deck D02–D04 dùng $\rho=1/(y^Ts)$, trùng hệ số nhớ của RMSProp; ghi chú viết $y^Ts$ trực tiếp. Deck dùng $m$ cho số cặp của L-BFGS, trùng moment Adam; ghi chú dùng $n_{\rm m}$. Ngưỡng $\epsilon_g$, $\epsilon_c$ thành $\varepsilon_{\rm g}$, $\varepsilon_{\rm c}$.
6. **Chuẩn hóa theo lô.** Deck E03 dùng $m$ cho cỡ lô; ghi chú dùng $\lvert\mathcal B\rvert$. Deck gọi gradient trên một phần dữ liệu là "gradient lô"; ghi chú giữ "gradient nhóm" của Bài 05 và giải thích "lô" trong tên phương pháp.
7. **Tiền huấn luyện.** Deck F01–F02, F07 dùng $(a,b)$ (trùng $a_i$ của chuẩn hóa và $b$ của hệ $Ad=b$) và $T$ cho phép chuyển (trùng ngân sách); ghi chú dùng $(w_1,w_2)$ và $\mathcal T$.
8. **Hạ theo tọa độ.** Deck E04–E05, E08 và hình `coordinate-path` dùng $(u,v)$, trùng $v_t$; ghi chú dùng $[\theta]_1,[\theta]_2$.
9. **Học theo chương trình.** Deck F05–F07, G02 dùng $q$ và hai mẫu $E$, $H$ ($H$ trùng Hessian); ghi chú dùng $\pi$ và "quan sát dễ", "quan sát khó".
10. **Thuật ngữ.** Deck dùng "tốc độ học", "tốc độ học hiệu dụng"; ghi chú dùng "bước học", "bước học hiệu dụng" như ghi chú Bài 05. Deck dùng "quy tắc sinh bước" (E01, E08) và "gradient lô" (A04 trở đi); ghi chú dùng "quy tắc cập nhật" (Định nghĩa 06.1) và "gradient nhóm" (Bài 05).
11. **Số trang Goodfellow.** Deck dẫn trang khác bản in MIT Press trong `sources/`: §8.7.3 "tr.318" (bản in: tr. 322), §8.7.4 "tr.319–321" (tr. 323–325), §8.7.5 "tr.322–323" (tr. 326), §8.7.6 "tr.323–325" (tr. 327–329), "Chương 8, tr.302–325" (mục 8.5–8.7 là tr. 306–329). Độ lệch đều khoảng 4 trang; cần kiểm bản nguồn deck đã dùng.
12. **Nội dung thêm so với deck.** Mệnh đề 06.11, 06.12, 06.13, 06.22, 06.27, 06.34, 06.36; Định nghĩa 06.35; 16 đoạn "Trong học máy"; Định lý 06.18 với chứng minh đầy đủ; ba tình huống. Deck có thể thêm một trang tự học về bất biến theo thang (Mệnh đề 06.11) để giải thích kết quả của Tình huống 06.1.

## Trùng lặp với `exercises.md`

`exercises.md` dựng các bài giao trên chính các ví dụ của deck, mà ghi chú bắt buộc bao trùm; các trang câu hỏi của deck (A05, B09, C08, D05, E08, F07, G02) không bị chép dữ kiện, trừ ghi chú ở dòng Bài 3.

| Bài giao | Chỗ trong ghi chú | Mức |
|---|---|---|
| Bài 1 (thành phần; đúng sai) | Bảng thành phần §1.1; Nhận xét 06.4, Mệnh đề 06.9(b), 06.16(b), Định lý 06.18(g), đoạn sau Hệ quả 06.33 (cùng hàm $(\theta^2-1)^2$), Mệnh đề 06.29(a), 06.31(a), 06.36 | toàn bộ cả hai phần (theo rà mạch truyện lượt 1) |
| Bài 2 (AdaGrad, RMSProp) | Ví dụ 06.5, 06.6 (cùng dữ kiện), Mệnh đề 06.6(c), 06.7(b) | toàn bộ |
| Bài 3 (Adam, $g_1=2$, $g_2=0$) | Ví dụ 06.8: tọa độ thứ hai cho đúng các đại lượng của bài sau phép chia cho $2$ (bước $-\sqrt{21}/9$); Mệnh đề 06.9(b); Mệnh đề 06.10 (dạng tổng quát của câu 4) | toàn bộ |
| Bài 4 (Newton, giảm chấn) | Ví dụ 06.11, 06.12; Mệnh đề 06.16; Nhận xét 06.14 | toàn bộ |
| Bài 5 (CG hai vòng) | Ví dụ 06.13 (cùng dữ kiện); Định lý 06.18; khởi tạo của Thuật toán 06.4 | (1)–(3), (5) toàn bộ; (4) phương pháp có sẵn (Mệnh đề 06.20) |
| Bài 6 (BFGS) | Ví dụ 06.16; Định nghĩa 06.21; Mệnh đề 06.22(c); Định lý 06.23 | (1), (3), (4) toàn bộ; (2) với $g=(1,0)$: lượt 1 giải sẵn ở phép kiểm đệ quy hai vòng (cột thứ nhất của $P_1$), lượt 2 đổi sang $g=(1,1)^T$ nên không còn |
| Bài 7 (chuẩn hóa) | Mệnh đề 06.29(a), Ví dụ 06.19 (dữ kiện khác), Nhận xét 06.30 | (2), (4) toàn bộ; (1), (3) phương pháp, dữ kiện khác |
| Bài 8 (hạ theo khối, Polyak) | Ví dụ 06.21, Mệnh đề 06.31; Ví dụ 06.22 (cùng bốn điểm); đoạn sau Hệ quả 06.33 | (2), (3), (4) toàn bộ; (1) chỉ dãy sai số, không có $F(3/4,5/8)$ |
| Bài 9 (tiền huấn luyện) | Ví dụ 06.25, Mệnh đề 06.37, Định nghĩa 06.38 | toàn bộ |
| Bài 10 (tiếp diễn) | Ví dụ 06.26, Mệnh đề 06.40 | toàn bộ, kể cả trường hợp $c=2$ |
| Bài 11 (học theo chương trình) | Ví dụ 06.27, Mệnh đề 06.42 | toàn bộ |
| Bài 12 (phương án) | Nhận xét 06.44, Ví dụ 06.29 (dữ kiện khác), Thuật toán 06.5, Tình huống 06.3 | (1), (2) phương pháp có sẵn; (3) gần toàn bộ (Tình huống 06.3, lời giải Bài tập 06.13(c)); Bài tập 06.10 lượt 1 gần trùng (1), lượt 2 đã đổi dữ kiện |

Đề xuất xử lý: đổi dữ liệu các bài 1, 2, 3, 4, 5, 8(3), 9, 10, 11, 12(3) trong `exercises.md` ở một lượt khác; trạng thái: chờ xử lý ở `exercises.md` (tiền lệ quyết định E1 của Bài 04 và bảng trùng lặp của Bài 05).

Bài tập trong ghi chú không trùng đề với bài giao: $g=(3,-6)$, $\eta=\tfrac13$; dãy vô hướng $3,-1,0$ với $\rho=0{,}8$, $\beta_1=0{,}5$, $\beta_2=0{,}8$; $H=\begin{bmatrix}2&3\\3&2\end{bmatrix}$, $g=(2,0)$, $\tau=2$; gradient liên hợp một vòng khi $b$ là vectơ riêng; BFGS với $s=(0,1)$, $y=(1,3)$; điều kiện Wolfe trên $\operatorname{diag}(1,4)$; nhóm $(1,3,3,5)$ với $\varepsilon=2$; hạ theo tọa độ trên $A=\begin{bmatrix}4&2\\2&2\end{bmatrix}$; Polyak với $\lambda=2$, $\eta=0{,}25$, và câu (c) của Bài tập 06.8 hỏi số vòng $T$ nhỏ nhất ($T=30$); họ $(\theta^2-4)^2+c\theta^2$; hai quan sát đầu vào $1$, $2$, Bài tập 06.9(b) hỏi $\pi$ nhỏ nhất để phần mất mát thừa không vượt $10^{-3}$ ($\pi\approx0{,}458$); mục tiêu $\tfrac12(w_1w_2-4)^2$ với khối $w_1$ đóng băng (Bài tập 06.9(c)); Bài tập 06.10 với $p=5\cdot10^6$, gradient đầy đủ và tích Hessian–vectơ, ngân sách $10p$, đáp án Newton–CG và $n_{\rm m}\le5$; đúng sai sáu câu mới (Bài tập 06.11); gradient liên hợp với hai giá trị riêng; kế hoạch cho hai mô hình.

## Hình

- Dùng 10 SVG có sẵn, không sửa: 9 hình của deck (`scale-step`, `rms-weights`, `tilted-curvature`, `newton-direction`, `cg-path`, `batch-shift`, `coordinate-path`, `gradient-chain`, `continuation-quartic`) và `adaptive-optimizers-state` (không dùng trong deck; số liệu trên hình được tính lại bằng Python và khớp tới bốn chữ số).
- Mỗi hình có đoạn đọc hình và câu đối chiếu ký hiệu khi nhãn trên hình khác ghi chú; `alt` viết theo nhãn trên hình.
- Không dùng: `adaptive-scaling` (ký hiệu $a_{t,j}$ không khớp), `batch-normalization` ($Z\in\mathbb R^{m\times d}$, $m$ trùng), `continuation-curriculum` (họ $J^{(k)}$ khác chương), `coordinate-polyak-geometry` (biến $x$, hệ số $\alpha$ trùng), `curvature-toolchain` ($p$ cho hướng, $d$ cho số chiều, ngược ký hiệu chương).
- Không vẽ hình mới.

## Tự kiểm `no-ai-slop` (eval.md)

| Nhóm kiểm | Kết quả | Ghi chú |
|---|---|---|
| Nguyên tắc biên tập | đạt | Mọi khẳng định có chứng minh, phép tính hoặc nguồn; số liệu tính lại được; động từ cụ thể. Khẳng định về thư viện chỉ giữ các điều chắc chắn: mặc định của `torch.optim.Adam`, vị trí $\varepsilon$ của `torch.optim.RMSprop`, `torch.autograd.functional.hvp`, `torch.optim.LBFGS` (`history_size` mặc định 100), `BatchNorm1d` ($\varepsilon=10^{-5}$, hệ số 0,1), `swa_utils.AveragedModel`, `update_bn`, bộ giải `lbfgs` của scikit-learn. |
| Từ cần cắt | đạt | Quét "quan trọng", "rõ ràng", "hiển nhiên", "nói cách khác", "tóm lại", "đáng chú ý", "then chốt", "thực chất", "chính xác nhất", "khác hẳn", "đúng nghĩa": đã sửa các chỗ còn lại. |
| Mẫu cần cắt | đạt | Không câu hỏi tu từ, không dấu chấm than, không câu kết kịch tính; không đoạn "So với … Cái giá …" lặp khuôn (bốn chỗ "So với" mở các câu khác nhau). Nhãn "Trực giác, chưa phải phát biểu hình thức" lặp có chủ ý theo tiêu chuẩn. Gạch dài chỉ ở tiêu đề chương theo mẫu. |
| Lượt 2 | đạt theo tự kiểm | Các câu mới viết theo chế độ Edit; bỏ colon reveal và lời bình ở các dòng điều phối viên nêu; bỏ "Định lý đọc theo từng phần như sau"; khẩu ngữ "hỏng", "sụp đổ", "không cứu được", "tồi", "tệ" thay bằng "không thỏa", "bị vi phạm", "không còn đúng"; quét lại: 0 lần. Lượt 1 tự đánh giá "đạt" nhưng bỏ sót các mẫu này. |
| Đọc lại toàn bài | đạt theo tự kiểm | Văn phong học thuật ưu tiên hơn gợi ý giọng nói của kỹ năng, theo AGENTS.md. |

## Kiểm tra kỹ thuật đã chạy (lượt 3)

- Script cấu trúc: 146 khối mở = 146 đóng, không lồng; năm bộ đếm liên tục, không đổi so với lượt 2; 467 tham chiếu `06.k` đúng khối, đúng loại; 9/9 hình; không chuỗi cấm; lệnh KaTeX ngoài danh sách chỉ có `\square`, `\big`, `\widetilde`, `\underline`, `\leftarrow` (đều có trong KaTeX) và một dấu ngắt dòng `\\` trước chữ $a$ trong ma trận; không ký tự tiếng Việt trong `\text` hay `\rm`; chuỗi nội dòng từ ba dấu quan hệ chỉ còn các khoảng chỉ số $0\le i<j\le k$, $0\le i<j\le k+1$ và $0<c_1<c_2<1$; một "đoạn" năm câu là danh sách ý 5–6 trong chứng minh Định lý 06.18, như lượt 2.
- Số liệu mới kiểm lại tay: Ví dụ 06.13 vòng 1; Ví dụ 06.20 ($\sqrt{\sigma_{\mathcal B}^2+\varepsilon}=\sqrt6$); Tình huống 06.3 nhóm $a=(8,8,8,2)$ có $\mu_{\mathcal B}=6{,}5$, $\sigma_{\mathcal B}^2=\tfrac{3\cdot2{,}25+20{,}25}4=6{,}75$; đệ quy hai vòng trên $s=(1,0)^T$, $y=(2,1)^T$, $g=(1,1)^T$: $\vartheta_1=\tfrac12$, $\chi=(0,\tfrac12)^T$, $\vartheta'=\tfrac14$, đầu ra $(\tfrac14,\tfrac12)^T$; góc giữa $(-2,-1)$ và $(-1,0)$ là $\arccos(2/\sqrt5)\approx26{,}57^\circ$.
- `sync-local-materials.py` rồi `--check`: OK (18 tệp). `git diff --check`: sạch.
- Playwright 1600×900 và 390×844, mở mọi khối gập: 0 pageerror, 0 cảnh báo console, 0 `.katex-error`, 0 phần tử chữ đỏ, 3 626 `.katex`, 146 khối, 9/9 hình, không tràn ngang (1585/1600, 375/390), không `$` hay `:::` thô. Ảnh đã xem: "Vòng ngoài thứ hai" và gạch Armijo của Tình huống 06.2 (1600×900), hai gạch thống kê nhóm của Tình huống 06.3 (390×844), Định lý 06.18 (390×844).

## Kiểm tra kỹ thuật đã chạy (lượt 2)

- Script cấu trúc: 146 khối mở = 146 đóng, không lồng; năm bộ đếm liên tục (06.1–06.44, Ví dụ 06.1–06.29, Bài tập 06.1–06.13, Tình huống 06.1–06.3, Thuật toán 06.1–06.8); 466 tham chiếu `06.k` đúng khối, đúng loại, sinh lại tự động sau mọi đổi chỗ; 9/9 hình; không chuỗi cấm; dấu "?" chỉ trong tên hai bài báo; không lệnh KaTeX lạ (thêm `\widetilde`, `\underline`, đều có trong KaTeX); không ký tự tiếng Việt trong `\text` hay `\rm`; không còn ký hiệu nhiều nghĩa nêu ở B3 (quét $\beta$, $\rho$, $\mu$, $\lambda$, $c$, $P$, $n$, $S$, $W$).
- Số liệu mới tính lại bằng Python: Tình huống 06.2 vòng ngoài thứ hai và tỷ số giảm (`chk/c10.py`); sai số của Adam ở vòng 121, 200, 500, 1000; Ví dụ 06.17 ($y^Ty=\tfrac{1025}{196}$, $g^Td=-\tfrac{45}{196}$, $d^TQd=\tfrac{675}{2744}$); dòng số Wolfe trên $Q$ ($0{,}9507$; $-4{,}86$); Ví dụ 06.18 ($P_1g=(\tfrac14,\tfrac12)$); Bài tập 06.8(c) ($T=30$), 06.9(b) ($\pi\approx0{,}458$), 06.9(c) ($3{,}645$), 06.10 ($n_{\rm m}\le5$).
- `sync-local-materials.py` rồi `--check`: OK (18 tệp). `git diff --check`: sạch.
- Playwright 1600×900 và 390×844, mở mọi khối gập: 0 pageerror, 0 cảnh báo console, 0 `.katex-error`, 0 phần tử chữ đỏ, 3 603 `.katex`, 146 khối, 9/9 hình, không tràn ngang (1585/1600, 375/390), không `$` hay `:::` thô. Ảnh đã xem: chứng minh Định lý 06.18 với khối công thức thụt lề trong danh sách (1600×900), "Vòng ngoài thứ hai" của Tình huống 06.2 (390×844), Ví dụ 06.18 (390×844).

## Kiểm tra kỹ thuật đã chạy (lượt 1)

- Script cấu trúc (`/tmp/claude-1000/lec06/check.py`): 145 khối mở = 145 đóng, không lồng; năm bộ đếm liên tục; 457 tham chiếu `06.k` đúng; 10/10 hình tồn tại; không đoạn quá bốn câu; không lệnh KaTeX lạ (ngoài `\square`, `\big`, `\underline`, `\leftarrow`, đều có trong KaTeX); không ký tự tiếng Việt trong `\text` hay `\rm`.
- Số liệu tính lại bằng Python thuần với `fractions.Fraction` (`/tmp/claude-1000/lec06/chk/c1.py`–`c9.py`): AdaGrad, RMSProp, Adam hai vòng (vectơ và vô hướng), hình `adaptive-optimizers-state`; cực tiểu của $\kappa(D^{-1/2}QD^{-1/2})$ trên lưới bằng $3$; Adam trên Tình huống 05.2 (vòng 1–4, ngưỡng $10^{-4}$ ở vòng 82 lần đầu và mãi từ vòng 121; $\kappa=10^4$: từ vòng 162; dữ liệu quay $45^\circ$: từ vòng 388), giảm gradient $42\,584$ bước với $\kappa=10^4$; Newton–CG Tình huống 06.2 bằng phân số (hai vòng CG, $d_2=(\tfrac{65}{22},\tfrac{35}{11})$, $g^Td_2=-\tfrac{125}{11}$, Newton $d=(-\tfrac56,-\tfrac53)$) và 20 vòng ngoài; CG trên $\operatorname{diag}(1,4)$, $\operatorname{diag}(1,4,4)$, ma trận nghiêng bất định; BFGS $P_1$, cặp âm, hai vòng BFGS với tìm bước chính xác ($P_2=Q^{-1}$), đệ quy hai vòng; Polyak (phương sai chính xác, mô phỏng 20 000 lần chạy với $T=100$: $0{,}0311$ và $0{,}139$); hạ theo tọa độ ba lượt; tiếp diễn ($22$ và $72$ bước); học theo chương trình; chuẩn hóa theo lô cho năm nhóm.
- `python3 2627-1/scripts/sync-local-materials.py` rồi `--check`: OK (18 tệp). `git diff --check`: sạch.
- Playwright Chromium, `file://…/material-viewer.html?doc=materials/lec-06/lecture-note.md&deck=lecture-06-toi-uu-mang-sau.html`, 1600×900 và 390×844, mở mọi khối gập: 0 pageerror, 0 lỗi hay cảnh báo console, 0 `.katex-error`, 0 phần tử chữ đỏ (`.katex [style*="rgb(204, 0, 0)"]`), 3 374 `.katex`, 145 khối, 10/10 hình, không tràn ngang (1585/1600, 375/390), không `$` hay `:::` thô. Lượt đầu bắt một cảnh báo KaTeX về chữ "mới" trong `\rm` (chứng minh Mệnh đề 06.31), đã sửa. Ảnh đã xem trong `/tmp/claude-1000/lec06/`: `s-w-Định_lý_06_18.png`, `s-n-Tình_huống_06_2.png`, `s-n-Nhận_xét_06_43.png` (bảng năm cột cuộn ngang trong khung ở màn hẹp), `s-w-Mệnh_đề_06_34.png`.

## Độ dài

Lượt 3: 33 796 từ. Điều phối viên chấp nhận độ dài lượt 2 (33 575 từ) và yêu cầu không cắt thêm; phần tăng khoảng 220 từ đến từ các sửa của "Phát hiện lượt 2".

Lượt 2: 33 574 từ, vượt khoảng 31 000–31 600 được duyệt khoảng 2 000 từ. Gói cắt được duyệt (mục D) bỏ khoảng 1 100 từ. Phần tăng đến từ các bổ sung bắt buộc của lượt 2:

- đoạn **Dữ kiện** chép lại trong 15 khối (mục E), khoảng 450 từ, phần được nới theo bổ sung 2026-10-10;
- A1 (vòng ngoài thứ hai và giải thích tỷ số), khoảng 300 từ;
- B4 (câu trực giác, dòng số Wolfe, Ví dụ 06.18 mới), khoảng 450 từ;
- B5 (hai đoạn "Trong học máy", Định nghĩa 06.35, câu về tích ma trận, câu trực giác Adam), khoảng 450 từ;
- B6, B7, B10 (đại lượng trung gian, bảng theo vòng, tách gạch đầu dòng, các câu phát biểu lại), khoảng 600 từ;
- C (thuật ngữ gốc, câu dẫn, ví dụ số trước ba mệnh đề), khoảng 300 từ.

Ứng viên cắt thêm nếu điều phối viên giữ khoảng 31 600 (khoảng 2 000 từ), không chạm các mục được giữ:

1. Nhận xét 06.30, gộp "Cơ chế" vào một câu (khoảng 80 từ).
2. Rút các đoạn "Trong học máy" của Mục 2.4, 4.4, 5.3 còn hai câu mỗi đoạn (khoảng 250 từ).
3. Mệnh đề 06.16(d) và Bước 4 (khoảng 80 từ; phần (c) đã cho bước ngắn dần).
4. Ví dụ 06.20 (chuẩn hóa với $\varepsilon=1$, khoảng 150 từ; Bài tập 06.7(a) cùng loại).
5. Đoạn "So với momentum" sau Mệnh đề 06.9 (khoảng 80 từ).
6. Bài tập 06.12 rút còn (b) (khoảng 200 từ).
7. Dòng "Kiểm tra lại" dài của Tình huống 06.1, 06.2 (khoảng 150 từ).
8. Hướng dẫn đọc thêm: rút phần mô tả sau dấu hai chấm (khoảng 200 từ).
9. Phần "Ví dụ đọc ma trận phạt" sau Mệnh đề 06.3 (đoạn so sánh với Mệnh đề 04.9, khoảng 60 từ).

Lượt 1: 32 134 từ, vượt đích 30 000 của brief khoảng 7%, cùng mức Bài 04 (31 727) và Bài 05 (33 604) đã được chấp nhận. Bản nháp đầu có 32 559 từ; lượt tự kiểm đã cắt một bài tập về độ chệch của RMSProp, rút danh mục ứng dụng, đoạn ví dụ của giáo trình trong Nhận xét 06.30, đoạn vùng tin cậy, chuỗi suy luận toàn chương, các đoạn "Trong học máy" của Polyak và tiếp diễn.

## Điểm còn phân vân (chuyển điều phối viên và tác tử rà toán)

1. **Mệnh đề 06.11.** Kết luận chính xác khi $\varepsilon=0$; với $\varepsilon=10^{-8}$ trong Tình huống 06.1, mô phỏng xác nhận hai tọa độ trùng tới khoảng $10^{-9}$.
2. **Tình huống 06.1.** Số vòng của Adam nhạy với $\eta$ do dao động (lần đầu đạt ngưỡng không đơn điệu theo $\eta$); ghi chú báo số vòng "mãi dưới ngưỡng", ổn định hơn. Cần rà toán xác nhận cách báo này.
3. **Mệnh đề 06.34.** Cận phương sai dùng $0\le\nu<1$; trường hợp $\nu<0$ ($1<\eta\lambda<2$) bị loại khỏi phát biểu.
4. **Nguồn chưa kiểm số trang.** Nocedal và Wright (mục 3.4, 4.3, 5.1, 6.1, 6.4, 7.1, 7.2, bổ đề 3.1), kết luận kết thúc hữu hạn của BFGS trên hàm bậc hai (chương 6), phản ví dụ Powell (1973), tính chất "chương trình ngẫu nhiên" của Zaremba và Sutskever dẫn qua giáo trình, Yosinski và cộng sự (2014) dẫn qua giáo trình.
5. **Khẳng định về PyTorch.** Lỗi khi `BatchNorm` ở chế độ huấn luyện nhận một giá trị mỗi kênh (Tình huống 06.3) dẫn theo hiểu biết về thư viện, chưa chạy thử trong môi trường này (không cài PyTorch).
6. **Trùng lặp với `exercises.md`.** Như bảng trên; chờ quyết định.
7. **Độ dài.** 32 134 từ; xem mục "Độ dài".
