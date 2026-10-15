# Nhật ký rà soát Bài 05

Nhật ký này bắt đầu từ vòng lập lại kế hoạch ngày 2026-10-11. Lịch sử của bộ trang chiếu và học liệu Bài 05 trước ngày đó (thiết kế cũ, nay là Bài 06b bổ trợ) nằm ở `planning/lec-06b/review-log.md` và `planning/lec-06b/review-log-lecture-note.md`. Ngày 2026-10-12 vòng dưới đây được chuyển nguyên văn từ nhật ký cũ sang tệp này; kế hoạch cũ nằm ở `planning/lec-06b/outline.md` và `storyboard.md`.

## Vòng lập lại kế hoạch theo Lecture A (2026-10-11)

### Yêu cầu của người dùng

Ngày 2026-10-11 người dùng đưa ra thiết kế hai bài (gửi dưới dạng ảnh) thay cho Bài 05 và Bài 06 hiện hành. Bài 05 ứng với **Lecture A — Scaling the Feature Space** (150 phút), phụ đề "From convex regression to the limits of deterministic optimization", gồm ba phiên:

| Phiên | Tên | Câu hỏi trung tâm |
|---|---|---|
| A1 | High-dimensional regression | What breaks when d grows? |
| A2 | Logistic regression and regularization | Why can a convex learning problem have no minimizer? |
| A3 | Curvature and computational cost | What is the price of a faster update? |

Bài 06 ứng với Lecture B (B1 XOR và mạng hai lớp, B2 lan truyền ngược và tính không lồi, B3 SGD theo nhóm nhỏ). Thiết kế này là đặc tả duy nhất; chỗ thiết kế không quy định được quyết định và ghi lý do trong kế hoạch.

Cùng ngày người dùng bổ sung luận đề xuyên suốt hai bài: khung của Bài 01–04 (mục tiêu lồi có cực tiểu chính xác, phương pháp tất định hội tụ tới nó) không còn là bức tranh đúng khi mô hình và dữ liệu lớn, vì (1) tính toán không cho phép dùng gradient đầy đủ ở mỗi bước, nên chuyển sang SGD là bắt buộc do chi phí chứ không phải lựa chọn phong cách, và (2) mất mát huấn luyện chỉ là đại lượng thay thế cho rủi ro trên dữ liệu mới, nên khớp chính xác tập huấn luyện không phải đích; dừng sớm và chính quy hóa là một phần của phương pháp. Mở đầu Bài 05 phải nêu sự thay đổi bức tranh này; kết luận Bài 05 và mở đầu Bài 06 phát biểu lại dưới dạng điều không còn giữ được (tính chính xác, bảo đảm tất định, gradient đầy đủ) và điều còn giữ được (tính giảm, điểm dừng, tốc độ theo kỳ vọng).

Điều phối viên chốt thời lượng theo đề cương DOCX: Buổi 5 gồm 2 tiết LT + 1 tiết BT, mỗi phiên một khối 1 tiết; vòng này chỉ lập kế hoạch, không dựng deck, không sửa học liệu.

### Tác tử tham gia

| Vai trò | Loại tác tử | Mô hình | Effort | Ghi/đọc | Bằng chứng |
|---|---|---|---|---|---|
| Tác tử lập kế hoạch Bài 05 | Agent tool, general-purpose | claude-opus-5-5 | high | chỉ đọc | Lệnh gọi Agent của điều phối viên; đầu ra `plan-lec-05.md` trong thư mục nháp của phiên (`scratchpad/replan/`) |
| Tác tử lập kế hoạch Bài 06 | Agent tool, general-purpose | claude-opus-5-5 | high | chỉ đọc | Lệnh gọi Agent của điều phối viên; đầu ra `plan-lec-06.md` trong cùng thư mục nháp |
| Điều phối viên | phiên hiện tại | claude-fable-5-1 | medium | duyệt | Quyết định ghi trong `master-decisions.md` (thư mục nháp) và tóm tắt dưới đây |
| Tác tử soạn kế hoạch Bài 05 | Agent tool, general-purpose | claude-opus-5-5 | high | ghi, chỉ trong `planning/lec-05/` | Lệnh gọi Agent của điều phối viên; đầu ra: `outline.md`, `storyboard.md` mới, hai tệp lưu trữ, mục này của nhật ký |

Hai tác tử lập kế hoạch chạy song song (chỉ đọc). Tác tử soạn kế hoạch Bài 05 và tác tử soạn kế hoạch Bài 06 ghi đồng thời vào hai thư mục khác nhau (`planning/lec-05/`, `planning/lec-06/`), theo quy tắc chỉ tuần tự hóa khi cùng một tệp. Không tác tử nào commit.

### Quyết định của điều phối viên về kế hoạch Bài 05

**Chấp nhận** `plan-lec-05.md`. Điều phối viên đã tính lại độc lập bằng Python (Fraction/float) các số liệu sau và xác nhận khớp:

- bảng A1: $w$, MSE huấn luyện và kiểm thử, $\lambda_{\min}$, $\lambda_{\max}$, $\kappa$ cho $d=1..5$;
- bảng ridge $d=5$;
- dừng sớm: $k=79$ với MSE kiểm thử $0{,}001084$; $F\le10^{-6}$ từ $k=2509$; $L=1{,}571488$;
- LG10: $w_\lambda$, $P$, $L$, $\kappa$, $\lVert w_\lambda\rVert$ cho $\lambda=0{,}1$ và $0{,}01$;
- CP03: số bước hạ gradient 12/71/446; cận 106/917/9037; Newton 4/5/7; $F''_\lambda(w_\lambda)$;
- $F^*=\tfrac13\log\tfrac{27}4$;
- CP08: hòa vốn $\kappa\approx548$;
- CP09, CP10, KL05: các bậc chi phí.

Nguồn: Bảng 13.3 của Sra–Nowozin–Wright (ch. 13, Bottou–Bousquet, tr. 363) được đối chiếu bằng pdftotext. Hàng hinge $\lambda=10^{-4}$: 23 642 s / 66 s / 1,4 s; 0,2275 / 0,2278 / 0,2275; 6,02 %. Hàng logistic $\lambda=10^{-5}$: TRON 30 s / 44 s, SGD 2,3 s; 0,18907 / 0,18890 / 0,18893; 5,68 / 5,70 / 5,66 %. Khớp. Văn bản nguồn xác nhận các hàng TRON dùng mất mát logistic.

**Đính chính (2026-10-12):** pdftotext tr. 363 cho hàng hinge lỗi kiểm thử 6,02 % / 6,03 % / 6,02 % (SVMLight / SVMPerf / SGD), không phải 6,02 % cho cả ba như ghi ở trên. Deck Bài 05 không dùng hàng hinge nên không bị ảnh hưởng; deck Bài 06 (E02) đang được sửa.

### Mười điểm hòa giải giữa kế hoạch Bài 05 và Bài 06

1. **Hệ số chặn.** Không bài nào dùng $b$ cho hệ số chặn ($b$ là cỡ nhóm nhỏ như 05b/05c). Bài 05: hệ số chặn nằm trong $w$ qua tọa độ hằng $1$ của $x_i$. Bài 06: độ lệch mạng $b_1,b_2$ luôn có chỉ số; ví dụ tuyến tính E03 viết hệ số chặn $c$. Bài 06 A04 ghi một câu ánh xạ với quy ước của Bài 05.
2. **Newton và $\kappa$.** Cả hai bài dùng cách phát biểu của Bài 05 CP05/R1: chỉ giai đoạn hội tụ bậc hai ($\log_2\log_2(\varepsilon_0/\varepsilon)$) không chứa $\kappa$; $\varepsilon_0$ và giai đoạn tắt dần phụ thuộc $m$, $M$, $L_H$. Bài 06 (A03, E01, G02) không viết "Newton không phụ thuộc $\kappa$" vô điều kiện.
3. **Tốc độ không lồi.** Chấp nhận Q3 của Bài 06: T8 chặn trung bình kỳ vọng **bình phương** chuẩn gradient, $O(1/\sqrt K)$; chuyển sang chuẩn là $O(K^{-1/4})$ (ghi chú). Bài 05 KL04 chỉ nêu tên T5, T8.
4. **Mã hóa XOR.** Bài 05 KL03 dùng đúng bốn điểm $\{0,1\}^2$ như Bài 06 B01 (nhãn $+1$ cho $(0,1),(1,0)$, $-1$ cho $(0,0),(1,1)$ theo quy ước $\pm1$ của Bài 05); lập luận $g(1,0)+g(0,1)=g(0,0)+g(1,1)$. Bài 06 B01 nêu nhãn $\{0,1\}$ và mất mát bình phương là lựa chọn để tính tay; ghi chú B07 nói kết luận không lồi giữ nguyên với mất mát logistic (Q5 chấp nhận).
5. **Tập xác thực.** Bài 05 HQ05 định nghĩa trên mặt trang cả tập xác thực (chọn $d$, $\lambda$, bước dừng) và tập kiểm thử (báo cáo $R$); Bài 06 F05 chỉ dẫn lại, không định nghĩa lại (R3 của Bài 06 không kích hoạt).
6. **Thuật ngữ.** "hạ gradient" ở cả hai bài (D5 Bài 05); "nhóm nhỏ (minibatch)"; "lan truyền ngược (backpropagation)".
7. **Phụ đề.** Tạm dùng phụ đề danh từ do hai kế hoạch đề xuất; ghi là chờ người dùng xác nhận (D1/Q1).
8. **Hình dùng lại** (Bài 06 F01–F03, F05): ở giai đoạn dựng deck sẽ sao chép vào `img/lec-06/` kèm dòng xuất xứ trong review-log; storyboard ghi đường dẫn gốc (Q4).
9. **Deck và học liệu hiện hành** của Bài 05, 06 không đụng tới trong vòng này; `index.html` không đổi. Việc giữ chúng làm bài bổ trợ (06b) là quyết định của người dùng (D2/Q2), chưa thực hiện.
10. **Kế hoạch cũ.** `outline.md` và `storyboard.md` hiện có được đổi tên (git mv) thành `outline.old-<ngày>.md`, `storyboard.old-<ngày>.md` trong cùng thư mục; `review-log.md` giữ nguyên và được nối thêm một vòng mới.

### Tác tử soạn kế hoạch Bài 05: việc đã làm và chỗ khác kế hoạch

- `git mv` `outline.md` → `outline.old-2026-10-01.md`, `storyboard.md` → `storyboard.old-2026-10-01.md` (điểm 10). Hai tệp lưu trữ giữ nguyên nội dung; liên kết nội bộ của chúng tới `outline.md`, `storyboard.md` nay trỏ sang bản mới, chấp nhận vì đây là bản lưu.
- Viết `outline.md` mới (43 trang, 5 mạch) và `storyboard.md` mới (43 mục, cùng mã và tiêu đề với dàn bài; bản đồ hành trình KN1–KN8 và khái niệm hỗ trợ dừng sớm).
- **KL03 (điểm 4):** thay XOR $(\pm1,\pm1)$, $y=u_1u_2$ của kế hoạch bằng bốn điểm $\{0,1\}^2$ và lập luận $g(1,0)+g(0,1)=g(0,0)+g(1,1)$. Bổ sung một nghiệm tách được với đặc trưng $(1,u_1,u_2,u_1u_2)$: $\bar w=(-\tfrac12,1,1,-2)$, mọi biên bằng $\tfrac12$ (kiểm tra tay ở dàn bài, mục 6.4). Số liệu này không có trong kế hoạch; cần tác tử toán kiểm lại.
- **HQ05 (điểm 5):** chuyển định nghĩa tập xác thực và tập kiểm thử từ ghi chú lên mặt trang; ghi chú giải thích vì sao hai tập phải tách nhau và quy ước bốn điểm $u=\pm\tfrac14,\pm\tfrac34$ đóng vai tập xác thực khi chọn ở HQ09 và KL01. Ghi chú KL01 và dòng cuối bảng dừng sớm (mục 6.1) thêm cùng quy ước để con số $0{,}00108$ không bị đọc là báo cáo cuối về $R$. Giả thiết G3 thêm mẫu xác thực.
- **CP05 (điểm 2):** giữ cách phát biểu của kế hoạch, thêm tham chiếu điểm hòa giải.
- **Thời lượng từng trang:** kế hoạch chỉ cho thời lượng theo mạch và theo cụm khái niệm. Tác tử soạn phân bổ thời lượng cho từng trang sao cho tổng theo mạch (0,10 / 0,56+0,34 / 0,67+0,33 / 0,55+0,25 / 0,12+0,08) và tổng theo cụm khái niệm của kế hoạch giữ nguyên; phép cộng ghi ở cuối mục Dàn bài từng trang.
- **Bước hành trình:** đồng bộ dòng "Hành trình" của LG05, LG08, CP03, CP04, CP08 với bản đồ hành trình của kế hoạch (thêm bước nhu cầu hoặc ứng dụng của cụm kế tiếp mà bản đồ đã ghi).
- **Văn phong:** đổi liên kết HQ03 từ dạng câu hỏi trích dẫn sang câu nêu giới hạn; đổi tiêu đề KL04 từ "Điều cần bỏ và điều còn giữ" thành "Điều không còn giữ được và điều còn giữ được" theo cách nói của luận đề; thêm dòng "Điểm trung tâm" cho các trang kiểm tra (HQ10, LG11, CP10, KL05) và dòng "Hình", "Liên kết" cho các trang kế hoạch để trống. Mã trang của bài khác trong mục Ghi chú được đánh dấu là chỉ để truy nguyên, không đưa vào ghi chú diễn giả.
- **Phân công nguồn chung với Bài 06** (quyết định của điều phối viên sau khi duyệt, 2026-10-11): KL02 của Bài 05 trình bày các hàng mất mát logistic của SNW Bảng 13.3 (TRON 30 s / 44 s, SGD 2,3 s), E02 của Bài 06 trình bày các hàng mất mát hinge và dẫn lại KL02; về dừng sớm, KL01 của Bài 05 chỉ nêu quan sát số trên dữ liệu A1 và gọi tên Goodfellow §7.8 trong ghi chú, F05 của Bài 06 mang phép so sánh định lượng về độ co. Đã thêm một câu vào ghi chú KL01, KL02 trong `outline.md` và vào mục KL01, KL02 trong `storyboard.md`.
- Tự kiểm `no-ai-slop` (chế độ Edit, đối chiếu `eval.md`): không câu cảm thán, câu hỏi tu từ, lời giảng viên, khẩu hiệu; tiêu đề là cụm danh từ; không đổi giả thiết, ký hiệu, nguồn hay số liệu của kế hoạch.

### Nguồn đã tham khảo (theo kế hoạch đã duyệt)

| Nguồn | Vị trí đã đọc | Lấy gì |
|---|---|---|
| Đề cương `sources/đề cương-cơ sở toán học của AI-v2.docx` | Buổi 5, Buổi 6 (LLO11–LLO16), bảng CLO | Phạm vi, LLO, CLO, 2 LT + 1 BT |
| Boyd, Vandenberghe (2004), `sources/bv_cvxbook.pdf` | §6.3.1–6.3.2 (tr. 305–307); §7.1.1 (tr. 354–355); §9.1.2 (tr. 459–461); §9.3.1 (tr. 466–468); §9.5.1 (tr. 486); §9.5.3 (tr. 488–490); §9.7.1–9.7.2 (tr. 509–512) | Chính quy hóa như vô hướng hóa song tiêu chí; mô hình logistic; số điều kiện tập mức; cận số bước hạ gradient và Newton hai giai đoạn; chi phí Cholesky và cấu trúc đường chéo cộng hạng thấp |
| Goodfellow, Bengio, Courville (2016), `sources/Deep Learning … (z-lib.org).pdf` | §5.2 (tr. 110–117, hình 5.2); §5.2.2 (tr. 118); §5.7.1 (tr. 140); §7.1.1 (tr. 231); §7.3 (tr. 239–240); §7.8 (tr. 246–250); §8.1 (tr. 275–277); §8.2.1 | Thứ tự dung lượng → quá khớp → chính quy hóa; logistic trên dữ liệu tách được; dừng sớm; rủi ro và đại lượng thay thế |
| Sra, Nowozin, Wright (2011), ch. 13 Bottou, Bousquet | §13.1–13.2 (tr. 351–354); §13.3 Bảng 13.2 (tr. 360–362); §13.4.1 Bảng 13.3 (tr. 363) | Đánh đổi xấp xỉ–ước lượng–tối ưu; bảng chi phí GD/2GD/SGD; số liệu RCV1 |
| Giáo trình *Học máy thống kê* của người dùng (`../SML-textbook-main.zip`) | `chapters/05_regression/sec_linear_regression.tex`; `chapters/01_classification/sec_logistic_regression.tex` | Thứ tự trình bày hồi quy tuyến tính và hồi quy logistic |
| Bài 01, 02, 04, 05b, 05c (`planning/lec-NN/outline.md`, ghi chú bài giảng Bài 01, 02) | Các mệnh đề, ví dụ và định lý liệt kê ở dàn bài, mục Nguồn đã tham khảo | Kết quả dùng lại, ký hiệu, số liệu đối chiếu |

Nocedal–Wright không có trong `sources/`; không dùng nguồn MIT OCW bổ sung. Chỉ lấy thứ tự trình bày và cách tạo động cơ; không dịch, không chép đoạn văn.

### Quyết định chờ người dùng và rủi ro

| Mã | Nội dung | Phương án tạm dùng | Trạng thái |
|---|---|---|---|
| D1 | Phụ đề (dịch sát phụ đề gốc cho dạng "Từ … đến …" bị cấm) | "Hồi quy lồi và giới hạn của tối ưu tất định" (điểm 7) | mở |
| D2 | Deck, học liệu và hình Bài 05 hiện hành: (a) đổi thành bài bổ trợ "06b"; (b) lưu trữ, gỡ khỏi chỉ mục; (c) xóa | Kế hoạch đề xuất (a); vòng này không đụng tới (điểm 9) | mở |
| D3 | LLO12, LLO13, LLO14, LLO16 và phần còn lại của LLO11, LLO15 không được hai bài mới phủ | Bảng gợi ý nơi đặt ở dàn bài, mục Nội dung đề cương không còn | mở |
| D4 | Ký hiệu hệ số chặn | Gộp vào $w$, không dùng $b$ (điểm 1) | mở |
| D5 | "Hạ gradient" hay "giảm gradient" | "hạ gradient" ở cả hai bài (điểm 6) | mở |

| Mã | Rủi ro | Cách xử lý trong dàn bài | Trạng thái |
|---|---|---|---|
| R1 | Phát biểu Newton và $\kappa$ | CP05 chỉ nói giai đoạn bậc hai không chứa $\kappa$ (điểm 2) | mở |
| R2 | $O(nd^2+d^3)$ chỉ đúng với ma trận dày, $n\ge d$ | CP07 nêu trường hợp $d>n$ và dữ liệu thưa | mở |
| R3 | RCV1: TRON không phải Newton thuần; phần cứng 2008–2011 | KL02 dùng để so bậc, có chú thích | mở |
| R4 | Ví dụ năm điểm chỉ định tính; $\kappa$ phụ thuộc cơ sở đơn thức | Ghi chú HQ08 | mở |
| R5 | Cận số bước bi quan 9–20 lần | CP03, CP08 nêu rõ | mở |
| R6 | Trùng lặp với Bài 01 | LG chỉ phát biểu lại; phần mới là $d$ tổng quát, chế độ nội suy, cận $L$, $\kappa$ | mở |
| R7 | Quá tải trang ở khối 1 (15 trang) và khối 3 (16 trang) | Thứ tự cắt: bảng độ nhạy HQ08 vào ghi chú; KL02 vào ghi chú KL01; CP10(c) thành bài tập về nhà | mở |
| R8 | LG05, LG09, CP05 dày công thức, nguy cơ vượt khung 16:9 | Tách chứng minh LG05 sang trang kế nếu cần, ghi vào storyboard | mở |

### Cổng storyboard Bài 05 và lượt sửa (2026-10-11)

| Vai trò | Loại tác tử | Mô hình | Effort | Ghi/đọc | Bằng chứng |
|---|---|---|---|---|---|
| Tác tử kiểm định storyboard Bài 05 | Agent tool, general-purpose | claude-opus-5-5 | high | chỉ đọc | Lệnh gọi Agent của điều phối viên; báo cáo `scratchpad/replan/gate-lec-05.md`, mã kiểm số `scratchpad/gate05/a1.py`–`a5.py` |
| Tác tử soạn kế hoạch Bài 05 (cùng tác tử soạn ở bảng trên, tiếp tục bằng SendMessage) | Agent tool, general-purpose | claude-opus-5-5 | high | ghi, chỉ trong `planning/lec-05/` | Sửa `outline.md`, `storyboard.md`, nối mục này |
| Tác tử kiểm định storyboard Bài 05, tái kiểm (cùng tác tử kiểm định ở trên, tiếp tục bằng SendMessage) | Agent tool, general-purpose | claude-opus-5-5 | high | chỉ đọc | Báo cáo tái kiểm nối vào `scratchpad/replan/gate-lec-05.md` |

Kết luận của cổng: **đạt có điều kiện**; 0 chặn bàn giao, 2 nghiêm trọng, 13 trung bình, 11 nhẹ; hơn 60 con số tính lại đều khớp, trừ hai chỗ làm tròn. Điều phối viên đã kiểm các phát hiện bắt buộc sửa (mục 1–11 của lệnh sửa) và bổ sung một phát hiện từ cổng storyboard Bài 06.

**Số trang mới: 44** (43 + 1, do tách HQ08). Bảng đổi mã so với bản trước cổng (các mục trước trong vòng này dùng mã cũ):

| Mã cũ | Mã mới |
|---|---|
| HQ08 "Số điều kiện và độ nhạy của nghiệm" | HQ08 "Độ nhạy của nghiệm" + HQ09 "Số điều kiện" |
| HQ09 | HQ10 |
| HQ10 | HQ11 |
| HQ11 | HQ12 |
| LG12 "Cái giá của hệ số chính quy hóa nhỏ" | LG12 "Hệ số chính quy hóa và số điều kiện" |
| KL03 "Hai giới hạn của bài" | KL03 "Giới hạn của mô hình tuyến tính và phương pháp tất định" |
| HQ04 "Sai số kiểm thử theo số chiều" | HQ04 "Sai số ngoài mẫu theo số chiều" |

Thời lượng: KN3 $+0{,}01$ tiết LT (HQ08 $0{,}04$ + HQ09 $0{,}04$), HQ12 $0{,}08\to0{,}07$; CP09 $0{,}06\to0{,}04$, KL02 $0{,}02\to0{,}01$, KL03 $0{,}02\to0{,}05$. Mạch CP $0{,}53$ LT, KL $0{,}14$ LT; tổng vẫn 2 LT + 1 BT, mỗi khối 1 tiết.

Nhãn kết quả trên mặt trang (thay mã KQ): Mệnh đề 1 (HQ07), Mệnh đề 2 (LG04), Định lý 1 (LG05), Mệnh đề 3 (LG06), Định lý 2 (LG08), Mệnh đề 4 (LG09), Định lý 3 (CP04, T2b của Bài 05b), Định lý 4 (CP05), Mệnh đề 5 (CP07). Bảng Kết quả dùng lại của dàn bài có thêm cột "Nhãn trên trang".

| Mã | Mức độ | Trang (mã mới) | Phát hiện | Trạng thái | Cách xử lý hoặc lý do |
|---|---|---|---|---|---|
| G1 | nghiêm trọng | HQ11 | KN1 không có bài tập đo đúng sản phẩm của nó | đã sửa | Thêm câu (d): bảng MSE huấn luyện / xác thực $d=1..5$ (số A1), chọn $d$ và nêu tập báo cáo cuối; đáp án $d=2$, báo cáo trên tập kiểm thử riêng |
| G2 | nghiêm trọng | LG09, LG11(c), CP08, mục 6.4, bảng KQ | $\lVert x_i\rVert\le1$ mâu thuẫn với tọa độ hằng $1$ | đã sửa | Mệnh đề 4: $\lVert x_i\rVert\le r\Rightarrow L\le r^2/4+\lambda$, $\kappa\le1+r^2/(4\lambda)$, $r\ge1$; CP08 với $r^2=2$: $\kappa\le501$ ($\approx9{,}2\cdot10^{11}$), $\kappa\le50\,001$ ($\approx9{,}2\cdot10^{13}$); LG11(c): $L\le0{,}52$, $\kappa\le26$, cận chuẩn giữ $8{,}33$ |
| G3 | trung bình | HQ08, HQ09 | Bốn bước KN3 trên một trang, nhu cầu đứng sau định nghĩa | đã sửa | Tách: HQ08 nhu cầu (thí nghiệm $\delta y_3$) + trực quan (đường mức); HQ09 bảng $\kappa$ + định nghĩa + cận độ nhạy + nhận xét xen kẽ Cauchy |
| G4 | trung bình | LG09 | Ví dụ đứng sau mệnh đề | đã sửa | Ví dụ một chiều ($F_\lambda''\in(\lambda,\tfrac14+\lambda]$, bốn giá trị $\kappa$) đặt đầu trang, Mệnh đề 4 sau |
| G5 | trung bình | LG06, LG10 | Bước "ứng dụng" của KN4 là một mệnh đề mới | đã sửa | LG06 ghi là hình thức (đối chứng); ứng dụng của KN4 chuyển sang dòng $\lambda=0$ ở LG10 (chế độ $\operatorname{rank}X=n$ làm mất cực tiểu với mọi nhãn, gồm năm mẫu VD-A1 ở $d=5$) |
| G6 | trung bình | KL01, KL05 | Dừng sớm không có định nghĩa; kiểm tra khai báo nhưng không có câu hỏi | đã sửa | KL01 thêm dòng định nghĩa; KL05 thêm câu (c) về tập chọn bước dừng và tập báo cáo, có đáp án |
| G7 | trung bình | KL04 | Cột "còn giữ được" thiếu tính giảm và điểm dừng | đã sửa | Xem G27 cho cách viết cuối; thêm T6, T7 |
| G8 | trung bình | HQ04, HQ10, KL01, mục 6.1 | Bốn điểm gọi là "kiểm thử" nhưng dùng để chọn | đã sửa | Từ HQ05 trở đi gọi là tập xác thực; mọi cột "MSE kiểm thử" ở mục 6.1, bảng KL01 và mô tả SVG đổi thành "MSE xác thực"; ghi rõ ví dụ thu nhỏ không có tập kiểm thử riêng (HQ05, HQ10, KL01, Giới hạn áp dụng). HQ04 đặt tiêu đề "Sai số ngoài mẫu" vì thuật ngữ được định nghĩa ở HQ05; mặt trang HQ04 báo trước bốn điểm sẽ là tập xác thực |
| G9 | trung bình | CP03; storyboard KN7 | "Gần tỉ lệ với $\kappa$" không chính xác | đã sửa | Điểm trung tâm: $\kappa\times83{,}5$, số bước $\times37$, $L/F''_\lambda(w_\lambda)\times35{,}5$; cận theo $\kappa$ là cận trên; ghi chú giải thích hệ số co cục bộ $1-F''_\lambda(w_\lambda)/L$ |
| G10 | trung bình | HQ09, HQ12 | "$\kappa$ tăng" khẳng định không căn cứ | đã sửa | Nhận xét xen kẽ Cauchy ở HQ09 ($X_d^TX_d$ là ma trận con chính của $X_{d+1}^TX_{d+1}$); ghi chú phân biệt chiều tăng (chung) với mức tăng (phụ thuộc cơ sở); HQ12(c) đổi thành "không giảm" |
| G11 | trung bình | HQ07, LG04–LG09, CP04, CP05, CP07, MD02, MD03 | Mã nội bộ sắp lên mặt trang | đã sửa | Nhãn đánh số theo bài; CP05 bỏ "Bài 04 RN07" khỏi nhãn; MD03 gọi phần bằng tên; MD02 viết "Mục tiêu 1–3"; quy ước mã ở đầu dàn bài mở rộng (KQ, KN, MT, phiên A1–A3, điểm hòa giải, giao diện A–B chỉ dùng trong kế hoạch) |
| G12 | trung bình | HQ12, LG12, CP11, LG03, KL01, KL02 | Đặc tả ghi chú chỉ gồm siêu dữ liệu quy trình; LG12 có lời chỉ đường | đã sửa | HQ12: bình phương nhỏ nhất luôn có nghiệm vì là hình chiếu; LG12: độ gần bài toán gốc và $\kappa$ kéo ngược nhau, không dùng "tiếp theo"; CP11: tổng chi phí là tích hai thừa số, một lượt dữ liệu là đơn vị chi phí nhỏ nhất; LG03 bỏ câu nhãn KN; câu phân công nguồn với Bài 06 ở KL01, KL02 chuyển từ "Ghi chú" sang "Liên kết"; nhãn giao diện A–B chuyển sang "Liên kết" |
| G13 | trung bình | CP09, KL02, KL03, CP11 | KL03 0,02 tiết mà chứa chứng minh XOR trùng B02 của Bài 06; giới hạn (i) lặp nguyên văn | chấp nhận một phần | Đã sửa: KL03 nhận $0{,}05$ tiết (từ CP09 và KL02, theo quyết định của điều phối viên), chỉ phát biểu XOR và một đẳng thức, chứng minh để B02 của Bài 06; KL03(i) rút thành một dòng dẫn CP11. Không tăng thời lượng CP05 như cổng gợi ý, vì điều phối viên chỉ định nguồn bù là CP09 và KL02 và tổng khối 3 cố định |
| G14 | trung bình | MD04, bảng ký hiệu, KL03 | Thiếu ánh xạ $u\leftrightarrow x$ và nghĩa của $d$ giữa hai bài | đã sửa | MD04 thêm một dòng ánh xạ ($u$ ở đây là $x$ của Bài 06; $d$ ở đây bằng $p=d+1$ của Bài 06); bảng ký hiệu và ghi chú KL03 ghi cùng ánh xạ. Phía Bài 06 (A04) thuộc tác tử soạn Bài 06 |
| G15 | trung bình | HQ07, LG08 | Hai trang quá tải; LG08 dùng dữ liệu không nêu lại | chấp nhận một phần | HQ07: công thức $w_{\rm mn}$ chuyển xuống ghi chú, gạch đầu dòng ví dụ tách đôi. LG08: nêu dữ liệu một mẫu $x_1=1$, $y_1=+1$ trên trang. Bảng bốn dòng của LG08 giữ lại; chỉ chuyển sang LG09 nếu kiểm tra 16:9 khi dựng deck cho thấy vượt khung, vì LG09 đã nhận ví dụ một chiều ở đầu trang (R8) |
| G16 | nhẹ | HQ02, LG02 | Trang nhắc lại công cụ gắn nhãn bước "hình thức" | đã sửa | Đổi thành "tiên quyết nhắc lại (Bài 01), không tính vào sáu bước" |
| G17 | nhẹ | HQ09, HQ10 | Làm tròn sai | đã sửa | $8{,}39$ (từ $8{,}3946$); $0{,}007635$ theo chỉ định của điều phối viên |
| G18 | nhẹ | HQ09, bảng ký hiệu | $\kappa=\infty$ chưa ghi là quy ước | đã sửa | Ghi "quy ước $\kappa=\infty$ khi $\lambda_{\min}=0$" trên trang và trong bảng ký hiệu |
| G19 | nhẹ | MD02, HQ10, KL02, CP06, CP09 | Mã mục tiêu, viết tắt chưa viết đầy đủ | đã sửa | "Mục tiêu 1–3"; "Mệnh đề 02.21(c)"; "hạ gradient ngẫu nhiên (SGD)" lần đầu trên mặt trang KL02; IRLS và TF-IDF viết đầy đủ trong ghi chú |
| G20 | nhẹ | LG12, KL03 | Tiêu đề chưa gọi tên khái niệm | đã sửa | "Hệ số chính quy hóa và số điều kiện"; "Giới hạn của mô hình tuyến tính và phương pháp tất định" |
| G21 | nhẹ | KL04 | Thiếu T6 cho tốc độ $O(1/k)$ lồi mạnh | đã sửa | Ghi T5, T6, T8 (chỉ nêu tên) |
| G22 | nhẹ | CP02 | Bảng dùng bước Newton đầy đủ, định lý giả thiết quay lui | đã sửa | Ghi chú CP02: quay lui với $\alpha=0{,}25$ nhận $t=1$ ở mọi bước của cả ba $\lambda$ (số do cổng kiểm) |
| G23 | nhẹ | KL02 | Điểm trung tâm đặt SGD như phương pháp nhanh hơn; "không đổi lỗi kiểm thử" | đã sửa | Điểm trung tâm: chi phí mỗi bước không phụ thuộc $n$, cùng mức lỗi 5,66–5,70 %; ghi chú: SGD bị buộc bởi chi phí mỗi bước, lỗi chênh không quá 0,04 điểm phần trăm |
| G24 | nhẹ | CP11 | "Vượt ngân sách" không có số | đã sửa | Dẫn số RCV1: $3{,}7\cdot10^{10}$ phép nhân–cộng cho một gradient đầy đủ; $1{,}7\cdot10^{15}$ và 17,8 GB cho một bước Newton dày |
| G25 | nhẹ | HQ05 | Định nghĩa quá khớp chưa nêu khoảng cách | đã sửa | "$F(w)$ nhỏ nhưng khoảng cách $R(w)-F(w)$ lớn" |
| G26 | nhẹ | KL01 | Chưa phân biệt giới hạn với giá trị sau hữu hạn bước | đã sửa | "khi $k\to\infty$ sai số xác thực tiến tới $0{,}0487$"; ghi chú: tại $k=2509$ là $0{,}0476$ |
| G27 | trung bình (phát hiện của cổng storyboard Bài 06, áp dụng cho Bài 05) | KL04, MD03, Phạm vi (dàn bài, storyboard), nhật ký | "Tính giảm theo kỳ vọng" không phải tính chất SGD giữ được: trên dữ liệu bốn điểm của Bài 06, một bước SGD từ chính cực tiểu cho $\mathbb E\,F(\theta_1)=\tfrac{69}{128}>\tfrac12$ | đã sửa | Cột "còn giữ được" của KL04: tính giảm mỗi bước của hạ gradient dùng gradient đầy đủ (bổ đề giảm); với SGD, bất đẳng thức một bước có số hạng nhiễu và tốc độ theo kỳ vọng (T5, T6, T8); điểm dừng (T7, T8). Ghi chú KL04 nêu phản ví dụ của Bài 06; MD03 và mục Phạm vi của dàn bài, storyboard ghi cùng cách viết. Đoạn ghi yêu cầu người dùng ở đầu vòng này giữ nguyên câu chữ của người dùng ("tính giảm, điểm dừng, tốc độ theo kỳ vọng"); cách hiểu đúng là cách viết của KL04 ở trên |

**Đính chính G27 (vòng sửa sau rà soát năm vai, 2026-10-12, mục S1):** cách viết cột "còn giữ được" ở dòng G27 vẫn chứa "điểm dừng (T7, T8)" theo nghĩa chuẩn gradient tiến về $0$; điều này sai. T7 chỉ chặn $\min_{k<K}\lVert\nabla F\rVert^2\le2L\Delta_0/K$; T8 với bước hằng chặn trung bình $\mathbb E\lVert\nabla F\rVert^2$ bởi $\frac{2\Delta_0}{\eta K}+L\eta\sigma^2$, có mức nhiễu nền tỉ lệ với $\eta$. Hàng "cực tiểu toàn cục" chỉ mất khi mục tiêu không lồi (Bài 06). Cách viết đúng ở KL04 sau vòng sửa; dòng G27 giữ nguyên làm lịch sử.

Kiểm tra sau sửa: 44 mục `####` trong `outline.md` và `storyboard.md`, mã và tiêu đề trùng nhau (so bằng `diff`); tổng thời lượng theo trang $2{,}00$ LT + $1{,}00$ BT; `git diff --check` sạch. Cần chạy lại cổng storyboard cho các trang bị ảnh hưởng và hai trang lân cận mỗi phía (HQ06–HQ12, LG04–LG12, CP01–CP11, KL01–KL05, MD02–MD04), và tác tử toán kiểm lại các số mới: $r^2=2$ ở CP08, LG11(c); câu HQ11(d); nhận xét xen kẽ Cauchy; hệ số co cục bộ ở ghi chú CP03.

### Tái kiểm cổng storyboard Bài 05 và lượt sửa cuối (2026-10-11)

Kết quả tái kiểm: **đạt có điều kiện**; 0 chặn bàn giao, 0 nghiêm trọng, 3 trung bình, 4 nhẹ. Điều phối viên giao sáu điểm sửa; tác tử soạn kế hoạch Bài 05 đã sửa trong `outline.md` và nhật ký:

| Mã | Trang | Vấn đề | Trạng thái | Cách xử lý |
|---|---|---|---|---|
| T1 | LG12 (ghi chú) | "phương pháp dùng độ cong là cách để số bước không tăng theo $\kappa$" trái điểm hòa giải 2 | đã sửa | Newton có giai đoạn hội tụ bậc hai mà số bước không chứa $\kappa$; giai đoạn tắt dần vẫn phụ thuộc độ cong qua $m$, $M$, $L_H$ (ký hiệu của CP05) |
| T2 | CP03 (ghi chú) | Hệ số co $1-F''_\lambda(w_\lambda)/L$ gán cho sai số giá trị | đã sửa | $1-F''/L$ là hệ số co của khoảng cách; sai số giá trị $e_k$ co theo $(1-F''/L)^2=0{,}267;\,0{,}819;\,0{,}973$, khớp tỉ số đo được $0{,}2667;\,0{,}8193;\,0{,}9727$; kết luận giữ nguyên |
| T3 | CP03 (mặt trang) | "không theo $\kappa$" mâu thuẫn với điểm trung tâm | đã sửa | Dòng dưới bảng: số bước theo sát $L/F''_\lambda(w_\lambda)$, tăng chậm hơn $\kappa$; số bước Newton gần như không đổi ($4$, $5$, $7$) |
| T4 | HQ07, LG04, LG09 (ghi chú) | Câu lịch sử quy trình trong đặc tả ghi chú diễn giả | đã sửa | Bỏ câu "chuyển từ mặt trang xuống ghi chú" (HQ07); "cầu nối A1 → A2" thành "mệnh đề nối hồi quy nhiều chiều với hồi quy logistic" (LG04); câu về giả thiết của kế hoạch ban đầu thành lý do toán học: tọa độ hằng $1$ cho $\lVert x_i\rVert\ge1$ (LG09) |
| T5 | KL04 | Hàng 2 giữ "gradient đầy đủ" trong khi hàng 4 bỏ nó | đã sửa | Hàng 2: "tính giảm mỗi bước của hạ gradient với gradient đầy đủ, khi còn tính được"; hàng 4: "gradient đầy đủ $O(nd)$ ở mỗi bước, không còn khả thi ở quy mô lớn"; điểm trung tâm viết theo |
| T6 | Nhật ký | Hàng tác tử chỉnh sửa dễ đọc thành tác tử kiểm định | đã sửa | Ghi rõ "cùng tác tử soạn ở bảng trên"; thêm hàng tái kiểm (cùng tác tử kiểm định, chỉ đọc) |

Các phát hiện nhẹ còn lại của tái kiểm nằm ngoài sáu điểm điều phối viên giao, không sửa trong lượt này. Số trang giữ 44. `git diff --check` sạch.

### Trạng thái

Deck, ghi chú và bài tập Bài 05 chưa dựng lại theo kế hoạch này; deck hiện hành vẫn được index.html liên kết.

Điều phối viên đã chấp nhận `outline.md` và `storyboard.md` (kể cả lời giải XOR ở KL03) và cổng storyboard đã chạy; bản hiện tại là bản sau lượt sửa theo cổng (44 trang). Bước tiếp theo: điều phối viên duyệt lượt sửa, tái kiểm cổng storyboard và toán trên các trang bị ảnh hưởng.

## Vòng dựng deck (2026-10-12)

### Tác tử tham gia

| Vai trò | Loại tác tử | Mô hình | Effort | Ghi/đọc | Bằng chứng |
|---|---|---|---|---|---|
| Tác tử soạn deck Bài 05 | Agent tool, general-purpose | claude-opus-5-5 | high | ghi: `lecture-05-khong-gian-dac-trung-nhieu-chieu.html`, `img/lec-05/`, `planning/lec-05/{outline,storyboard,review-log}.md` | Lệnh gọi Agent của điều phối viên (điều phối viên xác nhận); brief `scratchpad/build/brief-deck-author.md` và `brief-deck-05.md`; báo cáo `scratchpad/build/lec-05/author-report.md` |

Không sửa `lecture-style.css` (không thêm khối CSS riêng); deck dùng các lớp chung đã mở cho `data-lecture="05"`. Không commit.

### Kết quả dựng

- Deck `2627-1/lecture-05-khong-gian-dac-trung-nhieu-chieu.html`: 44 trang, 5 mạch ngoài (MD 4, HQ 12, LG 12, CP 11, KL 5), đúng mã, thứ tự và tiêu đề của dàn bài (so tự động: 44/44 mã và tiêu đề trùng). Khung HTML, `<head>`, footer và khối `<script>` chép từ deck 05b; `lang="vi"`, `data-lecture="05"`; Reveal: `controlsLayout: "edges"`, `slideNumber`, `hash`, `hashOneBasedIndex`, KaTeX cục bộ, plugin Notes, Highlight, Math.KaTeX. Không tải tài nguyên ngoài `2627-1/`.
- Mọi trang có ghi chú diễn giả (44/44). Ghi chú không chứa mã trang, mã KQ/KN/MT, tên phiên, thời lượng; các kết quả của bài khác được gọi bằng tên và số hiệu đã hiện trên mặt trang của bài đó (Mệnh đề 01.6, Định lý 05b.18 (T2b), T5–T8…). Nguồn ghi ở dòng "Nguồn" cuối ghi chú.
- Nhãn kết quả trên mặt trang đúng bảng của dàn bài: Mệnh đề 1 (HQ07), Mệnh đề 2 (LG04), Định lý 1 (LG05), Mệnh đề 3 (LG06), Định lý 2 (LG08), Mệnh đề 4 (LG09), Định lý 3 (CP04), Định lý 4 (CP05), Mệnh đề 5 (CP07).

### Sai lệch so với dàn bài và lý do

| Trang | Sai lệch | Quyết định | Lý do |
|---|---|---|---|
| LG08 | Kết luận của Định lý 2 viết $\lVert w_\lambda\rVert^2\le2F(0)/\lambda$, với mất mát logistic là $2\log2/\lambda$; dàn bài ghi $2\log2/\lambda$ cho cả mất mát bình phương | sửa (toán) | Chứng minh dùng $F_\lambda(w_\lambda)\le F_\lambda(0)=F(0)$; với mất mát bình phương $F(0)=\lVert y\rVert^2/(2n)$, khác $\log2$. Số liệu không đổi (bảng của trang là mất mát logistic). Đã sửa `outline.md` (LG08, bảng KQ7a). Cần tác tử toán xác nhận |
| LG03, LG07 | Dàn bài dùng một hình `lg-loss-along-ray.svg` cho cả hai trang; deck dùng hai hình: `lg-loss-along-ray.svg` (chỉ $\log(1+e^{-t})$, LG03) và `lg-penalty-along-ray.svg` (ba đường $\lambda=0;\ 0{,}01;\ 0{,}1$, LG07) | tách | LG03 đứng trước khi hạng phạt được đưa vào; một hình chung sẽ hiện $F_\lambda$ trước trang định nghĩa nó. Hình LG07 thêm đường $\lambda=0{,}1$ để cả hai số $t^*$ trên mặt trang có trên hình |
| LG09 | Thêm hình `lg-curvature-1d.svg` (dàn bài ghi "Hình: không") | thêm | Storyboard (KN6) ghi bước trực quan là "đồ thị độ cong một chiều" đặt đầu trang; hình cho bước này |
| MD03 | Bảng ba dòng phần → nhu cầu → đầu ra thay bằng danh sách ba phần A–C kèm nhu cầu; đầu ra từng phần nêu trong ghi chú | sửa bố cục | Bảng ba cột cùng khung, hai lý do và vấn đề trung tâm làm trang vượt khung 16:9; danh sách giữ được tên phần và nhu cầu. Đã ghi vào `outline.md` và `storyboard.md` (MD03) |
| HQ06 | Dòng kiểm tra tại $u=1$ viết bằng phân số ($\tfrac15+\tfrac{23}{20}-\tfrac{109}{60}-\tfrac15+\tfrac53=1$); dạng thập phân chuyển xuống ghi chú | sửa bố cục | Dòng thập phân vượt bề rộng cột ở 16:9. Cùng kết quả, kiểm tra được bằng tay |
| LG12 | Mặt trang có bảng ba hàng $\lambda$, $\sigma(w_\lambda)$, $\kappa$ (số của VD-A2b) thay cho hai dòng chỉ ghi khoảng | sửa | Số cụ thể theo từng $\lambda$; không thêm số mới |
| KL05 | "Danh sách bài tập (tệp `exercises.md`)" thay bằng hai bài tập về nhà nêu trên trang (KQ11 và chứng minh đầy đủ Mệnh đề 3) | sửa | `materials/lec-05/` chưa được viết lại; trang không trỏ tới tệp chưa có |
| HQ03, HQ04, HQ09, LG03, LG08, CP02, KL01 | Bảng số đặt ngang (cột theo $d$, $t$, $\lambda$ hoặc $k$) | bố cục | Giữ trang trong khung 16:9 mà không giảm cỡ chữ; số liệu giữ nguyên |
| HQ11, HQ12, LG11, CP10, KL05 | Câu hỏi và hệ quả đánh số 1, 2, 3… thay cho (a), (b), (c) | bố cục | Kiểu danh sách chung của các deck dùng số; đáp án trong ghi chú gọi "câu 1"… Mã (a)–(d) trong dàn bài giữ nguyên làm truy nguyên |
| CP06 | Thêm dòng 4 của giả mã hạ gradient, $w\leftarrow w-\tfrac1Lg$: $O(d)$ | thêm | Giả mã đủ một bước cập nhật |

Không đổi con số nào của dàn bài. Không tách hoặc gộp trang; số trang giữ 44.

### Hình

Mười một SVG mới trong `2627-1/img/lec-05/`, sinh bằng Python thuần từ số liệu của dàn bài (mục Ví dụ số), script lưu ngoài repo: `scratchpad/build/lec-05/make_svgs.py`; số liệu kiểm lại bằng `scratchpad/build/lec-05/compute.py` (khớp dàn bài: MSE huấn luyện/xác thực $d=1..5$; dừng sớm bước 79, $0{,}0010837$, $F\le10^{-6}$ từ bước 2509; Newton 5 bước, hạ gradient 71 bước với $\lambda=0{,}005$; đường đi hạ gradient $(1{,}760;\,1{,}016)$ sau 12 bước). Không dùng lại hình của bài khác (không cần `risk-curves.svg`). Không có ảnh raster.

| Tệp | Nội dung | Trang |
|---|---|---|
| `hq-data-points.svg` | năm mẫu huấn luyện, bốn điểm xác thực, đường $y=u$ | HQ01 |
| `hq-fits-d2-d5.svg` | đường $0{,}98u$ và đa thức bậc 4 nội suy | HQ03, HQ06 |
| `hq-errors-vs-d.svg` | MSE huấn luyện và ngoài mẫu theo $d$, trục logarit | HQ04 |
| `hq-level-sets-kappa.svg` | đường mức với $\kappa=2$ và $\kappa=50$ | HQ08 |
| `lg-three-points.svg` | ba điểm $-,+,-$ và điểm số $1-2u^2$ | LG01 |
| `lg-loss-along-ray.svg` | $\log(1+e^{-t})$, $t\in[0,10]$ | LG03 |
| `lg-penalty-along-ray.svg` | ba đường $\lambda=0;\ 0{,}01;\ 0{,}1$, hai cực tiểu dọc tia | LG07 |
| `lg-curvature-1d.svg` | $\sigma(w)\sigma(-w)+\lambda$, $\lambda=0{,}05$ | LG09 |
| `cp-gd-newton-paths.svg` | đường mức hàm bậc hai, 12 bước hạ gradient, một bước Newton | CP01 |
| `cp-error-vs-iteration.svg` | $e_k$ của Newton và hạ gradient, $\lambda=0{,}005$ | CP02 |
| `kl-early-stopping.svg` | MSE huấn luyện và xác thực theo $k$, đánh dấu $k=79$ | KL01 |

Mỗi SVG có `<title>`, `<desc>`, chữ tiếng Việt, dấu phẩy thập phân, phân biệt chuỗi bằng kiểu nét và kiểu điểm (không chỉ màu). Ở 16:9, tỉ lệ hiển thị thấp nhất là $0{,}81$, nên chữ $18$ px trong SVG hiển thị $\ge14{,}6$ px trên trang.

### Kiểm tra bằng trình duyệt

Playwright Chromium, máy chủ `reloadserver` cổng 8765, tắt hiệu ứng chuyển trang khi đo. Cả 44 trang ở 1600×900 và 390×844 (màn hẹp: chụp đầu và cuối vùng cuộn `.lecture-viewport`): 0 lỗi console và lỗi trang; 0 `.katex-error`; 0 trang cao quá khung 675 ở 16:9 (cao nhất HQ01, 664); 0 tràn ngang ở 16:9 (không công thức hay bảng nào phải cuộn ngang ở 16:9); ở màn hẹp không phần tử nào vượt mép phải ngoài các vùng `.table-scroll`, `.formula` cuộn ngang theo thiết kế chung (giống deck 05b); cỡ chữ thân nhỏ nhất $\ge21$ px trên khung 1200×675; mọi `<img>` tải được. Phím mũi tên phải chuyển trang. Đã xem bằng mắt ảnh chụp của mọi trang ở cả hai kích thước. Ảnh ở `scratchpad/build/lec-05/shots/`, script `check_deck.py`.

### Tự kiểm no-ai-slop

Chế độ Edit, đối chiếu `eval.md` trên tiêu đề, mặt trang và ghi chú: không câu cảm thán, câu hỏi tu từ, lời giảng viên, "chúng ta hãy", "tiếp theo"; tiêu đề là cụm danh từ, trùng dàn bài; không gạch ngang dài trong nội dung. Đã sửa ba câu: một câu chỉ đường thành câu nêu quan hệ (ghi chú CP03), một câu mở bằng dấu hai chấm kịch tính (ghi chú HQ03), một câu tham chiếu sai sau khi xoay bảng (ghi chú HQ04). Các câu tham chiếu "trang sau", "trang trước" còn lại đều nêu kết quả được dùng lại.

### Điểm cần điều phối viên quyết

1. Sửa cận chuẩn của Định lý 2 (LG08): $2F(0)/\lambda$ tổng quát, $2\log2/\lambda$ cho logistic. Cần tác tử toán xác nhận.
2. MD03: chấp nhận danh sách ba phần thay bảng ba dòng, hoặc yêu cầu tách MD03.
3. Hai SVG thêm (`lg-penalty-along-ray.svg`, `lg-curvature-1d.svg`).
4. KL05: hai bài tập về nhà nêu trên trang cho tới khi `exercises.md` được viết lại.
5. Phụ đề tạm "Hồi quy lồi và giới hạn của tối ưu tất định" vẫn chờ người dùng (D1).

### Quyết định của điều phối viên

**Quyết định của điều phối viên (Fable 5.1, 2026-10-12, bản thảo deck):** chấp nhận bản thảo để đưa vào vòng rà soát năm vai. Kiểm độc lập: 44 trang đúng mã và thứ tự outline; không mã trang, thời lượng hay nhãn quy trình trên mặt trang; 0 `style=`, 0 `<style>`, 0 tài nguyên ngoài; mọi trang có ghi chú; tiêu đề là cụm danh từ; ảnh chụp HQ09, CP03, KL04 ở 16:9 xem bằng mắt đạt. Bảy sai lệch của tác tử soạn: (1) cận $\lVert w_\lambda\rVert^2\le2F(0)/\lambda$ đúng (từ $F_\lambda(w_\lambda)\le F_\lambda(0)=F(0)$), chấp nhận và sửa outline theo; (2) hai SVG mới chấp nhận; (3) MD03 dùng danh sách, chấp nhận; (4)–(7) chấp nhận; KL05 nêu bài tập trên trang: tạm chấp nhận, đối chiếu lại khi `exercises.md` xong. Tác tử soạn: general-purpose, claude-opus-5-5, effort high (theo lệnh gọi Agent).

## Vòng sửa sau rà soát năm vai (2026-10-12)

### Tác tử

| Vai trò | Loại tác tử | Mô hình | Effort | Ghi/đọc | Bằng chứng |
|---|---|---|---|---|---|
| Biên tập viên (cùng tác tử soạn deck ở vòng dựng, tiếp tục bằng SendMessage) | Agent tool, general-purpose | claude-opus-5-5 | high | ghi: deck, `img/lec-05/`, `planning/lec-05/{outline,storyboard,review-log}.md` | Lệnh của điều phối viên; danh sách quyết định `scratchpad/build/lec-05/fix-list.md`; năm báo cáo `review-sinh-vien.md`, `review-chuyen-gia.md`, `review-kiem-toan.md`, `review-su-pham.md`, `review-mach-ke.md` |

Không sửa `lecture-style.css`, không commit. Vai phát hiện ghi tắt: SV sinh viên, CG chuyên gia, KT kiểm toán chính xác, SP sư phạm, MK mạch kể.

### Phát hiện và cách xử lý

| Mã | Mức độ | Vai phát hiện | Trang | Trạng thái | Cách sửa |
|---|---|---|---|---|---|
| S1 | nghiêm trọng | SV, CG, KT, SP, MK | KL04 | đã sửa | Dòng mở bảng nêu hai thay đổi (A) gradient nhóm nhỏ thay gradient đầy đủ, (B) mô hình phi tuyến, mục tiêu không lồi (Bài 06); mỗi dòng cột trái ghi (A) hoặc (B). Hàng cực tiểu toàn cục chỉ mất ở (B); ghi chú nêu T5, T6 vẫn cho hội tụ theo kỳ vọng tới cực tiểu với $F_\lambda$ lồi mạnh. Hàng điểm dừng viết đúng T7 ($\min_{k<K}\lVert\nabla F\rVert^2\le2L\Delta_0/K$) và T8 (trung bình $\le\frac{2\Delta_0}{\eta K}+L\eta\sigma^2$, mức nhiễu nền tỉ lệ với $\eta$), theo câu chữ của Bài 06 G03. Hàng 2 ghi "gradient đầy đủ, khi còn tính được"; hàng 4 ghi là chi phí, dẫn Định lý 05c.53. Đồng bộ `outline.md` (KL04) và thêm đính chính dưới G27 |
| S2 | nghiêm trọng | SV, SP | CP07 (CP10 câu 3, KL05 câu 2) | đã sửa | Thêm Nhận xét ($d>n$) lên mặt CP07: $H=\lambda I+\tfrac1nX^TSX$, phần thứ hai hạng $\le n$, giải qua hệ $n\times n$ tốn $O(n^2d+n^3)$. Ghi chú nêu công thức Sherman–Morrison–Woodbury. Giữ hai câu hỏi |
| S3 | nghiêm trọng | SV, SP | HQ07 | đã sửa | Định nghĩa $w_{\rm mn}=X^T(XX^T)^{-1}y$ trên mặt trang; thêm dòng dưới bảng: dữ liệu huấn luyện không phân biệt được các nghiệm, cần tiêu chí ngoài dữ liệu huấn luyện |
| M1 | trung bình | CG | CP08 | đã sửa | Ngưỡng "$\kappa$ cỡ vài trăm ($548$ khi bỏ hằng số)"; $\lambda=10^{-3}$: hai cận cùng bậc, không kết luận; $\lambda=10^{-5}$: Newton có lợi theo cận khoảng $90$ lần. Ghi chú: với hằng số của giả mã ($2nd$; $2nd+nd^2/2+d^3/3$) tỉ số một bước khoảng $250$, ngưỡng $\approx137$, ở $\lambda=10^{-3}$ kết luận đổi chiều ($1{,}8\cdot10^{12}$ so với $5{,}1\cdot10^{11}$); ở $\lambda=10^{-5}$ chênh khoảng $360$ lần. Câu về Bảng 13.2 nói rõ phương pháp bậc hai của Bottou–Bousquet giả định biết trước nghịch đảo Hessian |
| M2 | trung bình | CG | CP07 | đã sửa | Bộ nhớ thêm $O(n+d)$ và $O(d^2+n)$; chứng minh liệt kê $z,r\in\mathbb R^n$, $g\in\mathbb R^d$, $H$; ghi chú nêu cách duyệt theo hàng cho bộ nhớ $O(d)$ |
| M3 | trung bình | CG, SV, SP | CP03 | đã sửa | Bảng thêm cột $e_0=0{,}4674;\ 0{,}6351;\ 0{,}6817$; cột cận ghi "(Định lý 3, trang sau)"; gọi tên "tỉ số độ cong toàn cục trên độ cong tại nghiệm". Ghi chú bỏ "không vì $\kappa$": mọi bước Newton là bước đầy đủ; giai đoạn bậc hai được bảo đảm khi $\lvert F'\rvert<m^2/L_H$ (Boyd–Vandenberghe tr. 488), $m=\lambda$, $L_H=1/(6\sqrt3)$, ngưỡng $2{,}6\cdot10^{-2};\ 2{,}6\cdot10^{-4};\ 2{,}6\cdot10^{-6}$ co theo $\lambda^2$; chỉ số bước của giai đoạn bậc hai không phụ thuộc $\kappa$ |
| M4 | trung bình | KT | MD04 (ghi chú) | đã sửa | $\lambda=\mu/n$ (hai mẫu của Tình huống 01.1: $\mu/2$); sửa `outline.md` MD04 |
| M5 | trung bình | KT | CP11 | đã sửa | "$nd^2+d^3\approx1{,}8\cdot10^{15}$"; sửa `outline.md` CP11 và `storyboard.md` CP11 |
| M6 | trung bình | SV, SP, MK | HQ01, HQ03, HQ06 | đã sửa | Chú giải `hq-data-points.svg` ("điểm ngoài mẫu, 4 điểm"), `hq-fits-d2-d5.svg` ("điểm ngoài mẫu"), `<title>`/`<desc>`, alt HQ01, HQ03, HQ06 dùng "điểm ngoài mẫu"; "tập xác thực" chỉ từ HQ05 |
| M7 | trung bình | CG, SV | HQ04, HQ05 | đã sửa | HQ04 thêm "(không nhiễu)"; ghi chú HQ05: bốn điểm là quy ước minh họa, nhãn từ hàm đích không nhiễu, $R(w)=s^2+\mathbb E_u(x^Tw-u)^2$ nên sai số xác thực ước lượng $R(w)-s^2$, thứ tự chọn không đổi. Không đổi số |
| M8 | trung bình | SV, SP, KT, MK | HQ08, HQ09, HQ10 | đã sửa | HQ08: chú thích dưới hình "minh họa với hai giá trị của $\kappa$ … định nghĩa ở trang sau; ở $d=5$, $\kappa=553{,}7$", alt thêm "Hình minh họa". HQ09: cận độ nhạy ghi điều kiện $\operatorname{rank}X=d$ và $1/\sqrt{\lambda_{\min}}=\sqrt{\kappa/\lambda_{\max}}$; ghi chú nối với nhu cầu của HQ08. HQ10: "Cột $\kappa$: số điều kiện của $X^TX+n\lambda I$; mọi trị riêng tăng thêm $n\lambda$" (đã kiểm khớp outline: $\kappa=(\lambda_{\max}/n+\lambda)/(\lambda_{\min}/n+\lambda)$) |
| M9 | trung bình | SV, SP, MK, KT | KL01 | đã sửa | Thứ tự ví dụ → nhu cầu → định nghĩa: câu dữ liệu (bình phương nhỏ nhất không chính quy hóa) và bảng lên đầu, khung nhu cầu nối với chi phí (dừng ở bước 79 thay vì 2701: ít hơn khoảng 34 lần số lượt qua dữ liệu; sai số xác thực nhỏ hơn 45 lần), rồi định nghĩa. Thống nhất đại lượng theo hình: MSE huấn luyện $\le10^{-6}$ từ bước $2701$ (tính lại: MSE xác thực tại đó $0{,}0480$); ghi chú nêu $F\le10^{-6}$ từ bước $2509$. Desc của `kl-early-stopping.svg` và alt cập nhật |
| M10 | trung bình | MK | MD03, CP11 | đã sửa | MD03 lý do (1) thêm "với ngân sách tính toán cố định, số lần cập nhật giảm theo $1/n$"; CP11 đưa câu này lên panel mặt trang |
| M11 | trung bình | CG, MK, SV, KT | KL02, CP09 | đã sửa | Mặt KL02 giải nghĩa TRON, $\rho$, SGD. Ghi chú: bảng minh họa điều phép đếm dự báo, lý do bỏ gradient đầy đủ nằm ở phép đếm; lỗi kiểm thử chênh $0{,}04$ điểm, nhỏ hơn sai số chuẩn khoảng $0{,}15$ điểm trên 23 149 mẫu kiểm thử; mục tiêu chênh không quá $1{,}7\cdot10^{-4}$; bỏ câu cụm danh từ "Hai quan sát.". CP09 dòng ba ghi "RCV1" |
| M12 | trung bình | CG | HQ12 | đã sửa | "với mất mát logistic, nghiệm không phải lúc nào cũng tồn tại" |
| M13 | trung bình | CG | LG05, LG10 (ghi chú) | đã sửa | $F(w_k)\to\inf F=0$ theo Hệ quả 05b.17 (bước $\le1/L$), rồi bước 3 cho $\lVert w_k\rVert\to\infty$; nêu rõ tính giảm đơn điệu chưa đủ |
| M14 | trung bình | SP | HQ05 | đã sửa | Khung "Định nghĩa (quá khớp)"; câu $\arg\min F$ khác $\arg\min R$ đặt sau |
| M15 | trung bình | SV, SP, MK, CG | MD04 | đã sửa | Dòng đối chiếu Bài 06 chuyển xuống ghi chú, viết "với đặc trưng tuyến tính $\varphi(u)=(1,u)$ … $d$ ở đây bằng số tham số $p=d_{06}+1$"; mặt trang giữ "Dãy lặp: $w_k$" |
| M16 | trung bình | SV, MK, SP | LG06 | đã sửa | "đã tính ở trang mất mát dọc một tia" |
| M17 | trung bình | SV | CP05 | đã sửa | Tập mức đổi thành $C_0=\{w:\ f(w)\le f(w_0)\}$; $S$ giữ nghĩa ma trận trọng số $\operatorname{diag}(\sigma(m_i)\sigma(-m_i))$ ở LG02, CP06, CP07. "Chỉ số bước" sửa thành "Số bước" |
| M18 | trung bình | SV, SP | CP06 | đã sửa | Giải nghĩa $\varepsilon_g$ (ngưỡng cho chuẩn gradient) và $\delta_N$ (bình phương độ giảm Newton, Bài 04) trên mặt trang; khung "Phần thêm của một bước Newton" |
| M19 | trung bình | SV, CG, SP | LG12, LG01, LG02 | đã sửa | "đặt chỉnh (well-posed: nghiệm tồn tại và duy nhất)"; LG01 "biên quyết định tuyến tính"; LG02 "biên có dấu (margin)", phân biệt với biên quyết định $\{x:\ x^Tw=0\}$; LG12 dòng $\lambda$ giảm viết cụ thể $\sigma(w_\lambda)\to1$, $\lVert w_\lambda\rVert$ tăng không bị chặn |
| N1 | nhẹ | KT, SV | LG12 | đã sửa | $0{,}663$ |
| N2 | nhẹ | KT | HQ07 (ghi chú) | đã sửa | Nguồn: định lý hạng–số chiều của đại số tuyến tính (Strang, *Introduction to Linear Algebra*), bỏ "(Bài 00)" |
| N3 | nhẹ | KT | CP01 (hình) | đã sửa | Nhãn "sau 12 bước: (1,76; 1,02)" dời xuống dưới điểm cuối, không còn bị nét đứt cắt (xem lại bằng mắt) |
| N4 | nhẹ | KT | CP06, CP07 (nguồn) | đã sửa | Boyd §9.7.1 tr. 508: "tr. 508–512" |
| N5 | nhẹ | KT | outline LG08 | đã sửa | Điểm trung tâm: $\sqrt{2F(0)/\lambda}$, với logistic $\sqrt{2\log2/\lambda}$ |
| N6 | nhẹ | MK | outline, storyboard | đã sửa | §8.6 (gradient liên hợp, BFGS) và §8.7 trỏ Bài bổ trợ 06c; ghi chú CP07 trong outline "Bài 06c"; storyboard dòng 3 trỏ `planning/lec-06b/storyboard.md` |
| N7 | nhẹ | SV, SP | HQ03 | đã sửa | $0{,}0197$, $0{,}0179$ như HQ04, HQ11 |
| N8 | nhẹ | SP | MD03, CP01, LG12, KL03 | đã sửa | "chi phí" thay "giá" (MD03 danh sách phần, ghi chú CP01, LG12; KL03 "làm $d$ tăng nhanh") |
| N9 | nhẹ | SP | MD02, MD04, CP02 (ghi chú) | đã sửa | MD02: mỗi mục tiêu dựa trên kết quả nào và tiên quyết nào; MD04: bỏ câu chỉ đường, thay bằng đối chiếu Bài 06 (M15); CP02: bỏ "(đã kiểm …)" |
| N10 | nhẹ | MK | KL03 | đã sửa | Bậc đơn thức $q$: $\binom{r+q}q$; ghi chú nêu lý do (tránh trùng $p$ của Bài 06) |
| N11 | nhẹ | MK | storyboard KN8, CP03, CP05 | đã sửa | Nhu cầu của KN8 đặt ở CP05 (ghi chú: mỗi bước Newton cần Hessian và hệ $d\times d$); sửa bản đồ KN8, mục CP03, CP05 trong storyboard và dòng Hành trình CP03, CP05 trong outline |
| B1 | (đề xuất tách KL05) | SP | KL05 | không sửa | Giữ một trang tổng kết gồm tổng kết, câu hỏi, bài tập và tài liệu đọc: cùng mẫu trang tổng kết của mọi deck trong học kỳ (quyết định của điều phối viên) |
| B2 | (đề xuất tách HQ05) | SP | HQ05 | không sửa | Giữ một trang: rủi ro thực nghiệm/kỳ vọng và tập xác thực/kiểm thử là một cặp khái niệm dùng cùng nhau; nhãn định nghĩa quá khớp đã sửa ở M14 (quyết định của điều phối viên) |

Sửa thêm ngoài danh sách, đều nhỏ và theo đề xuất của báo cáo gốc: HQ09 bỏ câu bố cục "Bảng là ví dụ, đặt trước định nghĩa" và đổi "khớp với" thành "không vượt cận" (MK); CP04 ghi chú thay câu thứ tự trình bày bằng quan hệ suy luận (MK); KL03 "với một bộ đặc trưng cố định" (CG); HQ05 dẫn Định lý 05c.52 (MK); KL01 ghi chú câu kết nối hai lý do của vấn đề trung tâm.

### Hình

Sửa bốn SVG bằng `scratchpad/build/lec-05/make_svgs.py` (sinh lại toàn bộ, chỉ bốn tệp đổi nội dung): `hq-data-points.svg` (tiêu đề, desc, chú giải "điểm ngoài mẫu"), `hq-fits-d2-d5.svg` (desc, chú giải), `cp-gd-newton-paths.svg` (vị trí nhãn), `kl-early-stopping.svg` (desc: bước 2701). Không đổi dữ liệu nào trên hình.

### Kiểm tra

Playwright, 44 trang, 1600×900 và 390×844: 0 lỗi console và lỗi trang, 0 `.katex-error`, 0 trang cao quá khung (cao nhất HQ01, 664; KL04 646 sau khi rút gọn), 0 tràn ngang ở 16:9, ảnh tải được, chữ SVG $\ge14{,}6$ px. Đã xem bằng mắt mọi trang ở 16:9 và các trang đã đổi ở màn hẹp (đầu và cuối vùng cuộn). Chú thích hình HQ08 dùng lớp `.caption` chung (21 px trên khung 1200×675). `git diff --check` sạch. Tự kiểm no-ai-slop trên các câu mới: không câu chỉ đường, không câu cụm danh từ rời, không "giá" thay "chi phí"; một câu lấy tài liệu làm chủ ngữ ("Trang này là chỗ …") đã viết lại.

Trang đã đổi (cho tái kiểm toán và tái kiểm mạch kể): MD02 (ghi chú), MD03, MD04, HQ01, HQ03, HQ04, HQ05, HQ06, HQ07, HQ08, HQ09, HQ10, HQ12, LG01, LG02, LG05 (ghi chú), LG06, LG10 (ghi chú), LG12, CP01, CP02 (ghi chú), CP03, CP04 (ghi chú), CP05, CP06, CP07, CP08, CP09, CP11, KL01, KL02, KL03, KL04.

### Quyết định của điều phối viên

## Vòng sửa sau tái kiểm (2026-10-12)

Cùng tác tử biên tập (Agent tool, general-purpose, claude-opus-5-5, high), tiếp tục bằng SendMessage. Đầu vào: `scratchpad/build/lec-05/recheck-kiem-toan.md`, `recheck-mach-ke.md` và quyết định R1–R12 của điều phối viên. Không sửa `lecture-style.css`, không commit. Trước vòng này đã đổi "tính tay"/"bằng tay" thành "tính thủ công" trong ba ghi chú (HQ01, HQ02, CP02) theo bảng thuật ngữ 2026-10-11.

| Mã | Mức độ | Vai phát hiện | Trang | Trạng thái | Cách sửa |
|---|---|---|---|---|---|
| R1 | nghiêm trọng | KT, MK | KL04 (mặt trang, ghi chú), outline KL04, đoạn luận đề outline và storyboard | đã sửa | T5 bước hằng chỉ đưa SGD tới lân cận cỡ $\eta\tau^2/\mu$ (Định lý 05b.36); chỉ T6 bước giảm dần tới cực tiểu, $O(1/k)$. Mặt trang: "SGD, $F_\lambda$ lồi mạnh: bước hằng tới lân cận cỡ $\eta\tau^2/\mu$ (T5), bước giảm dần tới cực tiểu, $O(1/k)$ (T6)". **Đính chính:** câu sai "T5, T6 vẫn cho hội tụ theo kỳ vọng tới cực tiểu toàn cục" bắt nguồn từ câu chữ S1(a) của điều phối viên trong `fix-list.md` và đã được chép vào deck, outline và mục S1 của vòng trước; mục S1 giữ nguyên làm lịch sử, cách viết đúng là cách viết ở đây |
| R2 | trung bình | MK | KL04, KL03 | đã sửa | Nhãn (A)/(B) đổi thành (i) chi phí, (ii) biểu diễn, khớp hai giới hạn của KL03. Cột trái "Mất (khi nào)": hàng 1 "ngay trong bài", hàng 2 "(i) và (ii)", hàng 3 "(ii)", hàng 4 "(i)". Dòng đầu trang giải nghĩa $K$, $\eta$, $\Delta_0$, $\tau^2$; phương sai nhiễu viết $\tau^2$ vì $\sigma$ là sigmoid và $s^2$ đã dùng cho nhiễu nhãn ở HQ05; ghi chú nói Bài 05b viết $\sigma^2$. Câu luận đề "$n$ lớn với ngân sách cố định buộc thay gradient đầy đủ bằng SGD" đặt ở KL03 (i), vì KL04 không còn chỗ trong khung 16:9 |
| R3 | trung bình | KT | HQ05 (ghi chú) | đã sửa | Sai số bình phương $(x^Tw-y)^2$ có kỳ vọng $s^2+\mathbb E_u(x^Tw-u)^2=2R(w)$ với $\ell=\tfrac12(\cdot)^2$; MSE bốn điểm ước lượng $2R(w)-s^2$ |
| R4 | trung bình | KT, MK | outline, storyboard | đã sửa | Đồng bộ: KL01 (MSE huấn luyện $\le10^{-6}$ từ bước 2701, MSE xác thực $0{,}0480$, 34 lần; $F\le10^{-6}$ từ bước 2509 giữ làm số phụ), CP07 (bộ nhớ $O(n+d)$, $O(d^2+n)$; storyboard CP07), CP08 và KN8 ("$\kappa$ cỡ vài trăm, 548 khi bỏ hằng số"), KL03 ($q$; "Bài 06 nhắc lại và dùng"), LG12 ($0{,}663$; đặt chỉnh), MD04 (ánh xạ ở ghi chú, $p=d_{06}+1$; dòng ký hiệu chung của outline), KL04 (bảng mới, điều kiện mất), đoạn luận đề của outline và storyboard bỏ "điểm dừng (T7, T8)" theo nghĩa cũ, bảng Kết quả dùng lại (T5–T8). Thêm dòng "Sửa sau rà soát" cho MD02 và CP04. Bỏ "cái giá", "trả giá", "giá của mỗi bước", "tính tay" trong hai tệp kế hoạch |
| R5 | nhẹ | KT, MK | CP03 | đã sửa | Ghi chú: "Chỉ riêng số bước của giai đoạn bậc hai mới không phụ thuộc $\kappa$"; mặt trang: "số bước Newton chỉ tăng nhẹ ($4$, $5$, $7$)"; outline, storyboard theo |
| R6 | nhẹ | KT, MK | LG12 | đã sửa | "well-posed: nghiệm tồn tại, duy nhất và phụ thuộc liên tục vào dữ liệu" |
| R7 | nhẹ | MK | KL02 | đã sửa | "SGD: mỗi bước dùng gradient của một mẫu ngẫu nhiên, tức nhóm nhỏ có kích thước $b=1$ (Bài 06)" |
| R8 | nhẹ | MK | KL01 | đã sửa | Khung nhu cầu kết bằng "cần quy tắc chọn bước dừng theo sai số xác thực"; dòng dữ liệu rút gọn ($L=1{,}5715$ chuyển xuống ghi chú) để giữ trang trong khung |
| R9 | nhẹ | MK | LG06 (ghi chú) | đã sửa | "trường hợp ranh giới" |
| R10 | nhẹ | MK | KL03 (ghi chú) | đã sửa | "Bài 06 nhắc lại và dùng kết quả này" thay "chứng minh đầy đủ ở đó" |
| R11 | nhẹ | MK | KL04, HQ07 (ghi chú) | đã sửa | KL04: "tham số $\theta$ của Bài 06 là $w$ ở đây"; HQ07: bỏ câu lặp mặt trang, giữ ba loại tiêu chí và số $d=8$ |
| R12 | nhẹ | KT | `cp-gd-newton-paths.svg` | đã sửa | Viền trắng (`paint-order="stroke"`) cho nhãn "sau 12 bước" và "nghiệm 0"; đường mức không còn chạy qua chữ |

Kiểm tra: Playwright 44 trang ở 1600×900 và 390×844, 0 lỗi console/trang, 0 `.katex-error`, 0 trang cao quá khung (KL04 647, KL01 653), 0 tràn ngang ở 16:9. Đã xem bằng mắt KL01–KL04, HQ05, HQ07, CP03, LG12 ở hai kích thước và hình CP01. `git diff --check` sạch. Tự kiểm no-ai-slop trên các câu mới.

### Quyết định của điều phối viên

**Quyết định của điều phối viên (Fable 5.1, 2026-10-12, sau hai vòng sửa):** chấp nhận vòng sửa năm vai (S1–S3, M1–M19, N1–N11; B1, B2 bác bỏ có lý do) và vòng sửa sau tái kiểm (R1–R12). Bằng chứng kiểm độc lập: pdftotext tr. 363 xác nhận hàng hinge 6,02/6,03/6,02 %; $\lambda=\mu/n$; $nd^2+d^3=1{,}84\cdot10^{15}$; ngưỡng hòa vốn 548 (bỏ hằng số) và ≈137 (có hằng số) khiến kết luận ở $\lambda=10^{-3}$ phải bỏ; T5 bước hằng chỉ tới lân cận $\eta\tau^2/\mu$ (lỗi S1(a) do điều phối viên, đã đính chính ở R1); ảnh KL04, KL01 ở 16:9 do điều phối viên tự chụp đạt (hai nhãn (i)/(ii), T5/T6/T7/T8 đúng đại lượng, bước 2701, 34 lần). Hai chỗ biên tập viên làm khác lời giao ($\tau^2$ thay $s^2$; câu luận đề đặt ở KL03) chấp nhận. Tác tử: soạn/biên tập general-purpose claude-opus-5-5 high; năm vai rà soát và hai vai tái kiểm đều general-purpose claude-opus-5-5 high (theo lệnh gọi Agent). Chuyển sang kiểm cuối và viết học liệu.

### Vòng kiểm cuối: hai mục nhẹ đã sửa (2026-10-12)

Đã sửa cả hai mục: thêm `tabindex="0"` cho 19 vùng `.table-scroll` (bảng cuộn được bằng phím mũi tên ở màn hẹp; đã thử trên HQ04 ở 390×844: phím mũi tên phải cuộn bảng 87 px, trang không đổi); đưa chữ Việt ra khỏi `\text{}` ở LG02 (dòng "Với mọi $w$, $F(w)>0$; $F(0)=\log2$" thành HTML) và CP11 (công thức `aligned` thành danh sách HTML), giữ nguyên nghĩa; tải deck ở 1600×900 có 0 cảnh báo, 0 lỗi console; LG02, CP11 đạt ở hai kích thước; `git diff --check` sạch.

**Quyết định của điều phối viên (Fable 5.1, 2026-10-12, kiểm cuối deck):** chấp nhận. Kiểm cuối (tác tử general-purpose, claude-opus-5-5, high) đạt cả bốn nhóm: 44/44 trang ở 1600×900 (cao nhất 664/675) và 390×844, 0 lỗi, 0 `.katex-error`, 12/12 hình tải, phím đi hết deck; kỹ thuật và planning khớp; `git diff --check` sạch. Hai mục nhẹ (tabindex bảng cuộn, chữ Việt trong `\text{}`) đã sửa và kiểm lại. Deck commit ở mốc này; `index.html` thêm thẻ Bài 05 khi học liệu xong.

Sửa thêm sau tái kiểm toán Bài 06 (2026-10-12): KL04 hàng 2 đổi nhãn "Định lý 3 (khi (i) và (ii))" thành "Tốc độ tuyến tính của Định lý 3 (khi (i) hoặc (ii))", vì một trong hai điều kiện đã đủ làm mất tốc độ tuyến tính (dưới (ii) với gradient đầy đủ, bổ đề giảm và T7 vẫn là bảo đảm tất định); ghi chú KL04 và `outline.md` sửa theo, storyboard không có câu này; KL04 đạt ở 1600×900 và 390×844 (cao 647); `git diff --check` sạch.

Sửa thêm sau rà soát học liệu (2026-10-12): KL04 (mặt trang, ghi chú) viết T5 là lân cận với $\mathbb E\lVert w_k-w^*\rVert^2$ cỡ $\eta\tau^2/\mu$ (bán kính cỡ $\sqrt{\eta\tau^2/\mu}$), không gọi $\eta\tau^2/\mu$ là bán kính; CP09 (ghi chú) và CP11 (mặt trang): một tích với $X$ là $nd\approx3{,}7\cdot10^{10}$, một gradient đầy đủ (hai tích $Xw$, $X^Tr$) cần $\approx7{,}4\cdot10^{10}$ phép nhân–cộng; CP10 (ghi chú) câu 2: tính cả hằng số hai cận là $3{,}7\cdot10^{14}$ và $5{,}0\cdot10^{14}$, cùng bậc, chỉ kết luận về bậc độ lớn; outline và storyboard sửa theo; KL04, CP09–CP11 đạt ở 1600×900 và 390×844; `git diff --check` sạch.

Đồng bộ ký hiệu với ghi chú bài giảng (2026-10-12): KL03 (mặt trang, ghi chú) viết số biến đầu vào là $d_0$ thay $r$, số đơn thức $\binom{d_0+q}q$; $r$ giữ cho cận $\lVert x_i\rVert\le r$ (LG09, KL05); không SVG nào dùng ký hiệu này; outline, storyboard sửa theo; KL03 đạt ở 1600×900 và 390×844; `git diff --check` sạch.

## Vòng sửa văn phong MAT1101 và trang tiêu đề mạch (2026-10-12)

### Phạm vi và tác tử

Áp mục "Trang tiêu đề mạch" và "Văn phong và mật độ mặt trang chiếu" của AGENTS.md (commit a389f70) lên deck Bài 05. Tác tử biên tập: Agent tool, general-purpose, claude-opus-5-5, high (do điều phối viên Fable 5.1 giao, theo brief chung `brief-deck-editor.md` và báo cáo phân tích `phan-tich-mat1101.md`, mục B.3, D.8). Tệp đã ghi: `lecture-05-khong-gian-dac-trung-nhieu-chieu.html`, `planning/lec-05/{outline,storyboard,review-log}.md`. Không sửa `lecture-style.css`, `materials/`, `index.html`, `img/lec-05/`. Không commit.

### Kết quả

- Số trang: 44 → 67, vẫn 5 mạch. Thêm bốn trang tiêu đề mạch: HQ00 "2. Hồi quy nhiều chiều" (`mach-2`), LG00 "3. Hồi quy logistic và chính quy hóa" (`mach-3`), CP00 "4. Độ cong và chi phí tính toán" (`mach-4`), KL00 "5. Giới hạn của tối ưu tất định" (`mach-5`); `#/3` mở đúng LG00. Mạch 1 dùng bìa MD01. Tên năm mạch trùng giữa trang "Nội dung" MD03a, bốn trang tiêu đề và bảng mạch của storyboard; không tên mạch nào trùng tiêu đề trang nội dung đầu mạch.
- Lớp `.dense`: 43/44 trang → 0/67 trang.
- Trang vượt 60 âm tiết: 17 → 3, cả ba thuộc loại trang có trần 80 và được ghi ngoại lệ trong storyboard: MD02 (mục tiêu, 65), KL02 (bảng so sánh ba phương pháp, 78), KL04 (bảng so sánh mất/còn, 79). Không dòng nào quá 20 âm tiết trừ dòng dẫn KL00 (21, trần dòng dẫn 25). Không trang nào quá 6 dòng hay quá 3 khối công thức.
- Mã T2b, T5–T8, H2, H3 không còn trên mặt trang và trong ghi chú; thay bằng lời kèm Định lý 05b.18(b) (CP04), Hệ quả 05b.17 (LG05), Định lý 05b.36, 05b.39, 05b.41, 05b.43 (một dòng ở KL04a), Định lý 05c.52 (HQ05a), 05c.53 (KL04). Mỗi trang có nhiều nhất một chỗ dẫn số hiệu.
- Ba bài tập có lời giải mẫu trên mặt trang (trang kế cùng tiêu đề, nhãn "Lời giải:"): HQ11a, LG11a, CP10a; lời giải trùng Bài tập 1, 4, 8 của `materials/lec-05/exercises.md`. KL05b là bài tự làm, đáp án trong ghi chú (Bài tập 10). KL05c nêu Bài tập 7 và 5 làm bài về nhà.
- Ký hiệu đã chốt với học liệu giữ nguyên: $d_0$ (KL03a), bán kính lân cận $\sqrt{\eta\tau^2/\mu}$ (ghi chú KL04a), gradient RCV1 $\approx7{,}4\cdot10^{10}$ (CP11), nhãn "(i) hoặc (ii)" (KL04).

### Bảng thay đổi theo trang

| Trang | Âm tiết trước → sau | Quyết định | Việc chính |
|---|---|---|---|
| MD02 | 87 → 65 | sửa | mỗi mục ≤ 20 âm tiết (trang mục tiêu, trần 80) |
| MD03 | 186 → MD03a 47, MD03b 58, MD03c 52 | tách | Nội dung đánh số 1–5; Ngữ cảnh 4 dòng; hai lý do |
| MD04 | 59 → 53 | sửa | tiêu đề "Ký hiệu chung"; dòng $w_k$ xuống ghi chú |
| HQ00, LG00, CP00, KL00 | mới (38, 36, 33, 36) | thêm | trang tiêu đề mạch, ghi chú 92–110 âm tiết |
| HQ01 | 39 → 32 | sửa | "Nhu cầu:" lên đầu |
| HQ04 | 40 → 24 | sửa | bảng chỉ giữ hàng ngoài mẫu để vừa khung |
| HQ05 | 100 → HQ05 43, HQ05a 60 | tách | rủi ro và quá khớp / tập xác thực, tập kiểm thử |
| HQ07 | 77 → HQ07 33, HQ07a 46 | tách | mệnh đề và chứng minh / ví dụ $d=6$ |
| HQ08 | 74 → 58 | sửa | "Nhu cầu:" lên đầu, "Trực quan.", chú thích ngắn |
| HQ09 | 47 → 43 | sửa | cận độ nhạy thành "Nhận xét" |
| HQ11 | 29 → 28 (+ HQ11a 40) | sửa, thêm | "Bài tập: hạng, nghiệm và chọn số đặc trưng" + lời giải |
| HQ12 | 74 → 57 | sửa | hệ quả 2 viết bằng tỉ số; bỏ nhãn "Giới hạn." |
| LG01 | 67 → 45 | sửa | "Nhu cầu:" lên đầu |
| LG04 | 54 → 51 | sửa | một khung nhấn |
| LG05 | 56 → LG05 48, LG05a 34 | tách | định lý + "Ý nghĩa:" / "Chứng minh: …" bốn bước |
| LG06 | 58 → 48 | sửa | "Chứng minh (phác thảo)." |
| LG08 | 49 → LG08 43, LG08a 32 | tách | định lý / "Ví dụ: một mẫu có chính quy hóa" |
| LG09 | 34 → 24 | sửa | 7 → 6 dòng |
| LG10 | 44 → 42 | sửa | "Ví dụ: ba điểm có chính quy hóa", "Diễn giải:" |
| LG11 | 39 → 36 (+ LG11a 47) | sửa, thêm | "Bài tập: …" + lời giải |
| LG12 | 61 → 49 | sửa | khung kết luận tách hai dòng |
| CP01 | 47 → 38 | sửa | mô tả hình ngắn |
| CP02 | 16 → 16 | sửa | bỏ hàng $k=0$ (trang cao 701 px khi gỡ `.dense`) |
| CP03 | 61 → 42 | sửa | tiêu đề cột ngắn, ba gạch đầu dòng |
| CP04 | 53 → 43 | sửa | Định lý 05b.18(b); bỏ H2, H3, nhãn "Áp dụng." |
| CP05 | 92 → CP05 48, CP05a 48 | tách | Định lý 4 + "Ý nghĩa:" / bất biến affine + "Nhu cầu:" |
| CP06 | 50 → CP06 19, CP06a 28 | tách | giả mã hạ gradient / phần thêm của Newton |
| CP07 | 87 → CP07 52, CP07a 39 | tách | Mệnh đề 5 / tỉ số chi phí và $d>n$ |
| CP08 | 54 → CP08 33, CP08a 40 | tách | công thức và ngưỡng / bảng hai giá trị $\lambda$ |
| CP09 | 36 → 34 | sửa | câu kết tách hai dòng |
| CP10 | 38 → 38 (+ CP10a 18) | sửa, thêm | "Bài tập: …" + lời giải |
| CP11 | 77 → 58 | sửa | dòng RCV1 tách hai dòng |
| KL01 | 80 → KL01 51, KL01a 59 | tách | số liệu và nhu cầu / định nghĩa dừng sớm |
| KL02 | 99 → 78 | sửa | trang bảng so sánh, trần 80 |
| KL03 | 102 → KL03 53, KL03a 47 | tách | hai giới hạn / "Ví dụ: bài toán XOR" |
| KL04 | 134 (ghi chú 466) → KL04 79, KL04a 60 (ghi chú 200, khoảng 240) | tách | bảng mất/còn / bốn công thức với số hiệu 05b |
| KL05 | 143 → KL05 39, KL05a 47, KL05b 47, KL05c 46 | tách | hai bảng tổng kết theo mẫu AGENTS.md; bài tự kiểm tra; tài liệu đọc và bài về nhà |
| Các trang còn lại (MD01, HQ02, HQ03, HQ06, HQ10, LG02, LG03, LG07) | không đổi số âm tiết | giữ hoặc sửa nhãn | gỡ `.dense`; "Nhắc lại:", dòng kiểm tra HQ06 |

Ghi chú diễn giả: tham chiếu "trang sau/trang trước" và "phần A/B/C" được rà và sửa theo thứ tự trang mới (ví dụ LG07 trỏ tới "ví dụ một mẫu ở trang ví dụ sau Định lý 2", KL04 trỏ tới "trang giới hạn"); không ghi chú nào mở bằng "Trang này", không mã trang trong ghi chú.

### Tự kiểm no-ai-slop

Đã nạp `no-ai-slop` (Edit mode) và đối chiếu `eval.md` cho mọi câu mới trên mặt trang và trong ghi chú: không từ cấm, không câu dẫn rỗng, không khẩu hiệu hay kết luận kịch tính; mỗi trang một câu kết luận có điều kiện hoặc con số; dòng dẫn trang tiêu đề mạch nêu nhiệm vụ cụ thể (không đạt kiểm tra "dời được sang bài khác"). Đã thay cụm khó đọc "$d=2,$ $8{,}39$" bằng "khi $d=2$ và $8{,}39$ khi $d=5$" (HQ09).

### Kiểm tra

- `density.py`: 67 trang, 3 trang > 60 âm tiết (MD02, KL02, KL04, ngoại lệ trần 80 đã ghi), 0 trang > 6 dòng, 0 `.dense`.
- `deckcheck.py` (Playwright, 1600×900 và 390×844): 0 lỗi console/trang, 0 `.katex-error`, 0 tràn dọc ở 16:9 (cao nhất HQ09 621/675 sau khi sửa HQ01 678, HQ04 688, CP02 701, KL05 814), 0 cuộn ngang ở màn hẹp. Bốn cờ "TRAN_NGANG" (HQ09, LG08a, LG10, LG11a) là SVG đuôi của dấu căn KaTeX (`\sqrt`, rộng 400em, cắt bởi `overflow:hidden`); đã xem ảnh, không có tràn thật.
- Đã xem ảnh cả 67 trang ở 1600×900 và 390×844 (đầu và cuối vùng cuộn), gồm bốn trang tiêu đề mạch và mọi trang tách. Bảng ở màn hẹp cuộn ngang trong `.table-scroll` như trước.
- Bàn phím: phím cách đi qua đủ 67 trang tới KL05c; `#/3` mở LG00.
- `git diff --check` sạch trên bốn tệp.

### Chỗ học liệu cần đồng bộ (đề xuất cho điều phối viên)

- `materials/lec-05/exercises.md`, đoạn đầu: "Các bài 1, 4, 8 và 10 là các câu hỏi trên trang chiếu" và "Bài 5 và Bài 7 là hai bài tập về nhà nêu ở trang tổng kết" vẫn đúng nội dung; trang tổng kết nay là trang "Tài liệu đọc và bài tập về nhà". Câu hỏi 3 của KL05b được viết gọn ("Dừng sớm: nêu tập chọn bước dừng, và lý do không báo cáo sai số trên tập đó"), nghĩa trùng Bài tập 10(3).
- Không đổi số liệu, ký hiệu hay thứ tự ví dụ; chỉ đổi thứ tự trình bày trong một số trang (định nghĩa tập xác thực tách khỏi rủi ro; ví dụ một mẫu đứng sau Định lý 2 như trước).

### Quyết định của điều phối viên

(chờ điều phối viên Fable 5.1 duyệt)

### Vòng sửa sau tái kiểm toán học và mạch kể (2026-10-12)

Cùng tác tử biên tập (general-purpose, claude-opus-5-5, high), theo lời giao của điều phối viên dựa trên `recheck-05-math.md` (KT) và `recheck-05-story.md` (MK). Điều phối viên chấp nhận cách đọc "tối đa một lần mỗi trang" là một chỗ trích dẫn mỗi trang; KL04a giữ một dòng ngoặc số hiệu.

| Mã | Mức độ | Vai | Trang | Trạng thái | Cách sửa |
|---|---|---|---|---|---|
| V1 | trung bình | KT | KL04a | đã sửa | dòng "Giả thiết:" ($F$ $L$-trơn, bị chặn dưới; $g_k$ không chệch, phương sai $\le\tau^2$); điều kiện bước trên từng dòng ($\eta\le1/L$ ở dòng 1 và 4; $\tfrac1{\mu(k+1)}$ và $\mathbb E\lVert g_k\rVert^2\le G^2$ ở dòng 2; $1/L$ ở dòng 3); dòng 4 viết $\tfrac1K\sum_{k<K}$; 42 âm tiết |
| V2 | trung bình | KT | KL05 | đã sửa | Định lý 1: "$F(w_k)\to0\Rightarrow\lVert w_k\rVert\to\infty$", giả thiết "mất mát logistic, dữ liệu tách được"; Mệnh đề 1: "mất mát bình phương"; cận $\kappa$: "mất mát logistic, $\lVert x_i\rVert\le r$" |
| V3 | trung bình | KT, MK | KL05a | đã sửa | tách hàng số bước: hạ gradient (bước $1/L$, $\kappa\log\frac{e_0}\varepsilon$) và Newton (quay lui Armijo, $\frac{f(w_0)-f^*}\gamma+\log_2\log_2\frac{\varepsilon_0}\varepsilon$) |
| V4 | trung bình | KT, MK | HQ00 (ghi chú) | đã sửa | "khi $\operatorname{rank}X=n$ (cần $d\ge n$), nghiệm nội suy; khi $d>n$, tập nghiệm có chiều $d-n$" |
| V5 | trung bình | MK | MD04 | đã sửa | mặt trang chỉ còn $(u_i,y_i)$ với $d_0$ biến, $x_i$, $X$, $y$, $w$ (và $n$, $d$); $F$, $R$, $F_\lambda$, $L$, $\mu$, $\kappa$, năm giả thiết và đối chiếu ký hiệu xuống ghi chú |
| V6 | trung bình | MK | KL03, KL04 | đã sửa | KL03: "(ii) Biểu diễn: với đặc trưng cố định $(1,u_1,u_2)$, không điểm số affine nào phân loại đúng bài toán XOR" và "Đặc trưng học được (Bài 06) bỏ giới hạn (ii) nhưng làm mục tiêu không lồi"; KL04: "(i) Chi phí; (ii) mục tiêu không lồi do đặc trưng học được"; "(khi (i) hoặc (ii))" giữ nguyên; ghi chú KL03 nêu mắt xích |
| V7 | trung bình | MK | CP03, CP04 | đã sửa | CP04 (Định lý 3 và hệ quả) đứng trước CP03 trên deck, mã giữ nguyên; CP03 ghi "cột cận theo hệ quả của Định lý 3"; ghi chú CP02, CP04 sửa mối nối; storyboard đổi thứ tự mục và KN7 |
| V8 | trung bình | MK | LG12 | đã sửa | một câu "Kết luận: $\lambda$ càng nhỏ, $w_\lambda$ càng gần bài toán gốc và cận $\kappa\le1+\frac{r^2}{4\lambda}$ càng lớn"; bỏ "liên tục theo dữ liệu"; gạch đầu dòng dẫn Định lý 2 cho tồn tại và duy nhất |
| V9 | trung bình | MK | storyboard | đã sửa | mục KL05 viết lại cho trang hiện hành; bỏ mục MD03 lịch sử (67 mục cho 67 trang); MD03 → MD03c ở luận đề, MD02, MD04, HQ04, KL02, KL04 (storyboard và outline); nhu cầu KN8 → CP05a; "KL05(c)" → KL05b(3); thêm câu 44 → 67 ở mục cuối; sáu tiêu đề mục đồng bộ với `h2` (MD04, HQ11, LG10, LG11, CP06, CP10) và KL05 viết lại |
| V10 | nhẹ | KT, MK | MD03b | đã sửa | "Bài 01–04 giả thiết $F$ lồi, trơn, có cực tiểu $w^*$; khi đó hạ gradient, Newton hội tụ" |
| V11 | nhẹ | KT, MK | KL04 | đã sửa | "Gradient đầy đủ, bước $\le1/L$: $F$ giảm; SGD, $F_\lambda$ lồi mạnh: lân cận hoặc $w^*$"; "Đích: nghiệm chính xác (mất ngay ở Bài 05)"; "Gradient đầy đủ $O(nd)$ (khi (i))"; 80 âm tiết |
| V12 | nhẹ | KT | LG10 (ghi chú) | đã sửa | "theo kết luận thứ hai của Định lý 1 (bước 4 của chứng minh)" |
| V13 | nhẹ | KT, MK | KL00, HQ00, LG00 | đã sửa | dòng dẫn KL00 nêu giới hạn và bảo đảm của khung tất định; HQ00 nêu ba đại lượng cần xác định; LG00 "Nhu cầu: điều kiện để mất mát logistic có cực tiểu…" (22, 20, 23 âm tiết; trần 25) |
| V14 | nhẹ | MK | ghi chú MD01, MD03a, HQ00, LG00, CP00, KL00, KL04, KL04a, CP04, KL05c, KL01a | đã sửa | mở bằng đối tượng hoặc kết quả kế thừa; bỏ "Bài 05b chứng minh…", "bài này không chứng minh lại"; ghi chú trang tiêu đề mạch 72–93 âm tiết |
| V15 | nhẹ | MK | CP01, LG08, KL01 | đã sửa | CP01 thêm "Nhu cầu:" đầu trang; LG08 thêm dòng "Nhu cầu:" (cận trên $L$); KL01 "Nhu cầu:" lên dòng đầu (trang cao 653 px) |
| V16 | nhẹ | MK | KL01a | đã sửa | "Ví dụ. Trên năm mẫu ở trang trước, quy tắc trả về $w_{79}$." |
| V17 | nhẹ | MK | MD02, MD03c, HQ12, LG01, LG03, LG10, CP01, KL03, KL05c | đã sửa | bỏ in đậm nhãn ngoài danh sách |
| V18 | nhẹ | MK | MD02, MD03a, KL05 | đã sửa | mục tiêu 3 mang tên mạch 4; ghi chú MD03a nối mạch 4 → 5; KL05 thêm dòng số điều kiện $\kappa(X^TX)$ không giảm theo $d$ |
| V19 | nhẹ | MK | LG04, HQ09, HQ10 | giữ, có lý do | mỗi trang một luận điểm, dưới trần; lý do gộp ghi trong storyboard |
| V20 | nhẹ | MK | KL04a | giữ | một dòng ngoặc bốn số hiệu, điều phối viên chấp nhận |
| V21 | nhẹ | MK | ghi chú MD02, MD04, KL04a, CP06 | đã sửa một phần | CP06 thêm lý do dòng 2 tốn $O(n)$; KL04a còn 238 âm tiết, MD04 212 (đối chiếu ký hiệu dồn từ mặt trang theo V5), MD02 khoảng 210; mức nhẹ, giữ |
| V22 | nhẹ | MK | ghi chú KL01a, KL03 | đã sửa | "Quan sát dừng sớm dùng cả ba mạch giữa…"; ghi chú KL03 viết lại thành một mạch câu |

Kiểm tra sau vòng sửa: `density.py` 67 trang, 4 trang > 60 âm tiết đều thuộc loại trần 80 (MD02 66, KL02 78, KL04 80, KL05 66), không trang > 6 dòng, không `.dense`, dòng > 20 âm tiết chỉ ở dòng dẫn LG00 (22) và KL00 (23), trần 25; `deckcheck.py --port 8790` (67 trang, 1600×900 và 390×844): 0 lỗi console/trang, 0 `.katex-error`, 0 tràn dọc (KL01 761 px ở lần chạy đầu, sửa bằng cách gộp dòng nhu cầu với dữ kiện), 0 cuộn ngang màn hẹp; bốn cờ "TRAN_NGANG" còn lại là đuôi SVG của `\sqrt` như vòng trước. Đã xem ảnh 1600×900 của MD03b, MD04, CP01, CP04, CP03, LG08, LG12, KL01, KL03, KL04, KL04a, KL05, KL05a và bốn trang tiêu đề mạch. `git diff --check` sạch.

**Quyết định của điều phối viên:** (chờ duyệt)

### Quyết định của master (Fable 5.1, effort medium) — 2026-10-12

Master đã tự chạy `density.py` (67 trang; MD02 66, KL02 78, KL04 80, KL05 66 dưới hoặc bằng trần 80, có ngoại lệ trong storyboard; không trang nào còn `.dense`; dòng dẫn LG00, KL00 22–23/25), `deckcheck.py` trên máy chủ tĩnh (0 lỗi console, 0 tràn; cờ tràn ngang là dương tính giả KaTeX), đọc nguyên văn KL04a (bốn cận đúng với giả thiết đi kèm: $\min_{k<K}\|\nabla F\|^2\le 2L\Delta_0/K$ với bước $1/L$; $\frac1K\sum\mathbb E\|\nabla F\|^2\le 2\Delta_0/(\eta K)+L\eta\tau^2$ với $\eta\le1/L$) và MD04 sau rút gọn, xem ảnh trang tiêu đề mạch và trang tách, đối chiếu bảng trạng thái V1–V22 của hai báo cáo tái kiểm. `git diff --check` sạch. Quyết định: `chấp nhận`, commit Bài 05. Việc còn treo (đợt học liệu): câu dẫn của `exercises.md` nói Bài 5 và 7 "ở trang tổng kết" nay là KL05c; mã T5–T8 trong học liệu giữ nguyên theo quyết định đợt này.

## Đổi thuật ngữ bức → cưỡng bức (coercive) và định nghĩa $F_\lambda$ trước lần dùng đầu, 2026-10-12, yêu cầu người dùng

Tác tử chỉnh sửa (`general-purpose`, Opus 5.5, effort high theo brief của điều phối viên). Hai yêu cầu của người dùng: (1) "bức" chưa đủ học thuật và Bài 05 dùng lại mà không định nghĩa; dùng thống nhất "cưỡng bức (coercive)" và định nghĩa lại tại chỗ dùng đầu, vì sinh viên đọc Bài 05 có thể không nhớ Bài 01; (2) ký hiệu $F_\lambda$ xuất hiện trên mặt trang (MD02, LG07) trước khi được định nghĩa (chỉ có trong giả thiết Định lý 2 ở LG08).

| Tệp | Chỗ sửa |
|---|---|
| `lecture-05-khong-gian-dac-trung-nhieu-chieu.html` | 5 chỗ "bức" → "cưỡng bức" (LG06 kết luận, LG11a lời giải câu 2, ghi chú LG06, LG11a, KL05). LG06 thêm trên mặt trang "**Định nghĩa.** $F$ cưỡng bức (coercive) nếu $F(w)\to+\infty$ khi $\lVert w\rVert\to\infty$" trước Mệnh đề 3; ghi chú nêu đây là Định nghĩa 01.37 nhắc lại, dạng $M$–$R$, Định lý 01.38 và phản ví dụ $F(t\bar w)\to0$ khi dữ liệu tách được. LG07 thay "Cộng $\frac\lambda2\lVert w\rVert^2$." bằng "**Định nghĩa.** Mất mát có chính quy hóa bậc hai: $F_\lambda(w)=F(w)+\frac\lambda2\lVert w\rVert^2$, $\lambda>0$." và "Dọc tia $t\bar w$, vì $\lVert\bar w\rVert^2=5$"; ghi chú nối với trang chính quy hóa HQ10. LG08 giả thiết Định lý 2 giữ công thức, thêm "như định nghĩa trên". MD02 mục tiêu 2 bỏ $F_\lambda$: "Hồi quy logistic. Chứng minh không có cực tiểu trên dữ liệu tách được; tính $\mu,$ $L,$ $\kappa$ sau chính quy hóa." (nhãn rút để dòng giữ 20 âm tiết); ghi chú MD02 và LG00 nêu $F_\lambda=F+\frac\lambda2\lVert w\rVert^2$. LG11a: "(Mệnh&nbsp;đề&nbsp;3)" để số hiệu không rơi xuống dòng riêng. |
| `materials/lec-05/lecture-note.md` | Mục kiến thức tiên quyết: thêm Định nghĩa 01.37 vào danh sách số hiệu, "cưỡng bức (coercive)". Mục 3.5: thêm khối `::: definition Hàm cưỡng bức (nhắc lại Định nghĩa 01.37)` trước Mệnh đề 05.24, kèm đoạn dẫn và đoạn nối (ví dụ $\lVert w\rVert^2$, phản ví dụ dữ liệu tách được, Định lý 01.38). Tiêu đề Mệnh đề 05.24, kết luận, Bước 4, Tình huống: "cưỡng bức". $F_\lambda$ đã có định nghĩa đánh số trước lần dùng đầu (Định nghĩa 05.1, mục "Bài toán học"; bảng ký hiệu), nên không sửa. |
| `materials/lec-05/exercises.md` | 5 chỗ; lời giải Bài 4 câu 2 (chỗ dùng đầu) viết "theo Mệnh đề 05.24, $F$ cưỡng bức (coercive), tức $F(w)\to+\infty$ khi $\lVert w\rVert\to\infty$ (Định nghĩa 01.37)". |
| `materials/lec-02/lecture-note.md` | 11 chỗ (dòng tiên quyết lần đầu "hàm cưỡng bức (coercive)"; Mệnh đề 02.18, 02.21, chứng minh SVM). Deck 02 không có chữ "bức". |
| `planning/lec-05/outline.md`, `storyboard.md` | Thuật ngữ; outline LG06, LG07 ghi dòng định nghĩa mới, danh sách định nghĩa: hàm cưỡng bức (LG06), $F_\lambda$ (LG07); storyboard MD02, LG06, LG07, LG08 thêm dòng "Sửa 2026-10-12". Không thêm hay tách trang: số trang giữ 67. |

Kiểm tra: `grep` không còn "bức" đứng riêng trong deck 01, 02, 05 và `materials/lec-*/*.md` (chỉ còn "cưỡng bức"; "bức tranh" chỉ có trong planning). `density.py`: LG06 48 → 55 âm tiết, 6 dòng; LG07 30 → 41, 6 dòng; LG08 50 → 54; MD02 66 → 65, dòng dài nhất 20; số trang > 60 âm tiết giữ 4 (đều trần 80). `deckcheck.py --port 8790` 67 trang, 0 lỗi console, không `.katex-error`; cờ TRAN_NGANG ở HQ09, LG08a, LG10, LG11a có sẵn ở bản HEAD (đối chiếu bằng bản sao HEAD tạm, đã xóa). Đã xem ảnh MD02, LG06, LG07, LG08, LG11a ở 1600×900 và 390×844. Trình xem `material-viewer.html?doc=materials/lec-05/lecture-note.md&deck=…` hiển thị khối "Hàm cưỡng bức (nhắc lại Định nghĩa 01.37)", 0 lỗi console, 0 `.katex-error`. `sync-local-materials.py` rồi `--check` khớp; `git diff --check` sạch.

**Quyết định của điều phối viên:** (chờ duyệt)

Quyết định của master (Fable 5.1): đã đọc diff, đối chiếu grep toàn kho (không còn "bức" đứng riêng), xem ảnh LG06/LG07/H07 ở 1600×900, `sync-local-materials.py --check` OK, `git diff --check` sạch. `chấp nhận`, commit cùng đợt đổi thuật ngữ 2026-10-12.

## Đồng bộ học liệu với deck sau đợt văn phong (2026-10-12)

Tác tử chỉnh sửa học liệu (Agent tool, `general-purpose`, claude-opus-5-5, high, theo brief của điều phối viên Fable 5.1); ghi `materials/lec-05/{lecture-note,exercises}.md` và mục này; không chạy `sync-local-materials.py`, không commit. Đã nạp `no-ai-slop` (Edit) và tự kiểm theo `eval.md`.

| Tệp | Chỗ sửa |
|---|---|
| `exercises.md` | Đoạn dẫn: Bài 1, 4, 8 có lời giải mẫu trên trang chiếu (HQ11a, LG11a, CP10a); Bài 10 là bài tự kiểm tra (KL05b), câu 3 trên trang chiếu là bản rút gọn của câu 3; Bài 7 và 5 nêu ở trang "Tài liệu đọc và bài tập về nhà" (KL05c), thay "trang tổng kết". Gợi ý Bài 1 thêm câu 4, gợi ý Bài 4 thêm câu 1 và Định lý 05.26, Mệnh đề 05.28 ở câu 3, như ghi chú HQ11, LG11. Lời giải Bài 1, 4, 8 đối chiếu với HQ11a, LG11a, CP10a: khớp số liệu và kết luận, không sửa. |
| `lecture-note.md` | Mục 5.4: câu dẫn gán nhãn (i) chi phí, (ii) mục tiêu không lồi do đặc trưng học được, khớp KL03, KL04 và nối với giới hạn biểu diễn của Mục 5.3. Nhận xét 05.42 bỏ bốn mã T5–T8 sau số hiệu 05b. Bảng tương ứng nhãn trang chiếu bỏ dòng "T5, T6, T7, T8" (deck không còn các mã này), thêm câu: kết quả 05b, 05c được trang chiếu dẫn trực tiếp bằng số hiệu. Thứ tự Định lý 05.30 → Ví dụ 05.19 đã trùng thứ tự mới CP04 → CP03; ghi chú không có tham chiếu thứ tự trang, không sửa. Mã H2, H3 (giả thiết của Bài 05b, có dẫn Định nghĩa 05b.5) giữ nguyên. |

Kiểm tra: `git diff --check` sạch; trình xem `material-viewer.html?doc=materials/lec-05/{lecture-note,exercises}.md&deck=lecture-05-khong-gian-dac-trung-nhieu-chieu.html` trên máy chủ tĩnh cổng 8790 (Playwright Chromium): 0 lỗi console, 0 `.katex-error`, một `h1` mỗi tệp. Còn lại cho điều phối viên: chạy `sync-local-materials.py` và `--check`.

**Quyết định của điều phối viên:** (chờ duyệt)

Quyết định của master (Fable 5.1), đợt đồng bộ học liệu 2026-10-12: đã đọc diff, viewer (ghi chú và bài tập) trên máy chủ tĩnh 0 lỗi console, 0 `.katex-error`; `sync-local-materials.py --check` OK; `git diff --check` sạch. `chấp nhận`, commit.

## Đợt rà soát thuật ngữ và thứ tự định nghĩa 2026-10-12

### Tác tử

- Tác tử rà soát (chỉ đọc): Agent tool, `general-purpose`, claude-opus-5-5, effort high; báo cáo `report-05.md` (Detect mode no-ai-slop, bảng A thuật ngữ, bảng B thứ tự định nghĩa), điều phối viên lưu nguyên văn.
- Tác tử biên tập (ghi tệp): Agent tool, `general-purpose`, claude-opus-5-5, effort high; áp dụng `decisions-common.md` rồi `decisions-05.md` của điều phối viên Fable 5.1. Phạm vi ghi: deck Bài 05, `img/lec-05/lg-loss-along-ray.svg` (`desc`), `img/lec-05/lg-penalty-along-ray.svg` (`title`), `planning/lec-05/{outline,storyboard,review-log}.md`, `materials/lec-05/{lecture-note,exercises}.md`. Không chạy `sync-local-materials.py`, không commit.

### Bảng phát hiện

| mức độ | trang | vấn đề | quyết định điều phối viên | trạng thái | cách sửa |
|---|---|---|---|---|---|
| trung bình | LG07 (tiêu đề, mặt trang); ghi chú MD02, LG00, LG07, LG08a | "hạng phạt" dễ nhầm với hạng ma trận (A1) | chấp nhận | đã sửa | "số hạng phạt" cả 6 chỗ; "(penalty term)" ở ghi chú LG07; `title` của `lg-penalty-along-ray.svg`; outline, storyboard; ghi chú bài giảng (lần đầu kèm "(penalty term)") và bài tập |
| trung bình | MD03c; ghi chú HQ00, KL04 | "$F$ chỉ thay cho rủi ro" (A2, gộp B3) | chấp nhận | đã sửa | "$F$ chỉ đại diện cho sai số trên dữ liệu mới"; ghi chú "chỉ đại diện cho $R$"; outline và ghi chú bài giảng cùng câu |
| trung bình | LG08a | "cận đúng nhưng không chặt" dùng sai nghĩa "cận đúng" (A3) | chấp nhận | đã sửa | "bất đẳng thức đúng nhưng không chặt"; giữ "cận đúng" ở ghi chú LG05a (nghĩa infimum, cố ý) |
| trung bình | CP08, KL04a; ghi chú KL04a | khẩu ngữ "cỡ" (A4) | chấp nhận | đã sửa | "có bậc vài trăm", "về mức có bậc $\eta\tau^2/\mu$", "bán kính có bậc"; outline, storyboard (trừ hai dòng lịch sử outline "Sửa sau rà soát năm vai", giữ nguyên văn), ghi chú bài giảng (8 chỗ), bài tập (4 chỗ: "khoảng", "cùng bậc số phép tính", "kích thước") |
| trung bình | CP11 | "bước Newton dày" (A5) | chấp nhận | đã sửa | "RCV1: bước Newton với Hessian dày đặc cần …"; bỏ chữ "một" thay vì bỏ nhãn "RCV1:" để dòng giữ ngữ cảnh; 60 âm tiết |
| trung bình | CP09, KL02 | RCV1 chưa viết đầy đủ (A6) | chấp nhận | đã sửa một phần | ghi chú CP09: "RCV1 (Reuters Corpus Volume 1, kho văn bản tin tức của hãng Reuters)"; "(kho tin Reuters)" không thêm vào KL02 vì trang thành 82 > 80 |
| nhẹ | CP07, KL05a; ghi chú MD04, CP07, CP09, KL02 | "dày" thiếu tiếng Anh, lệch "dày đặc" của outline (A7) | chấp nhận | đã sửa | "dày đặc (dense)" ở CP07 (mặt trang) và MD04 (ghi chú), sau đó "dày đặc" (7 chỗ trong deck); outline, storyboard, ghi chú bài giảng (21 chỗ) |
| nhẹ | MD03c, HQ05, KL04 | "đích" hai nghĩa (A8) | bác bỏ (không bắt buộc, tránh sửa lan) | giữ nguyên | không sửa |
| nhẹ | KL02; ghi chú KL00 | "một bậc" nhầm với "bậc hai" (A9) | chấp nhận | đã sửa | "một bậc độ lớn"; outline, ghi chú bài giảng (2 chỗ) |
| nhẹ | CP05 | $m, M$ lệch $\mu, L$ của CP04 (A10) | chấp nhận | đã sửa | mặt trang viết $\mu I\preceq\nabla^2f\preceq LI$, $\varepsilon_0=2\mu^3/L_H^2$, $\gamma$ phụ thuộc $\mu, L, L_H$; ghi chú giữ đối chiếu $m, M$; ghi chú CP03 viết $\mu^2/L_H$ |
| nhẹ | CP06 ↔ KL04a | $g$ và $g_k$ (A11) | chấp nhận, giải quyết bằng B10 | đã sửa | xem B10 |
| nhẹ | LG03 (`alt`) | "chạm" (A12) | chấp nhận | đã sửa | "giảm về 0 nhưng không đạt 0"; `desc` của SVG và `alt` trong ghi chú bài giảng sửa theo |
| nhẹ | MD03c, LG01 | chữ hoa sau dấu hai chấm (A13) | chấp nhận | đã sửa | "gradient", "điểm số" |
| nhẹ | HQ12, KL04a | thiếu "(conditioning)", "(minibatch)" (A14) | chấp nhận | đã sửa | HQ12 "Điều kiện hóa (conditioning)."; KL04a "nhóm nhỏ (minibatch)" |
| nhẹ | HQ05, HQ07, HQ07a, HQ09, HQ10, CP05a, CP06a, KL02 | thiếu tiếng Anh lần đầu (A15) | chấp nhận | đã sửa | mặt trang: HQ07a "(minimum-norm solution)", CP06a "(Newton decrement)"; ghi chú (mặt trang hết chỗ hoặc thêm quá 3 từ): HQ05 empirical/expected risk, HQ07 interpolation regime, rank–nullity theorem, HQ09 condition number, HQ10 $\ell_2$ regularization (hồi quy ridge), CP05a affine invariance, KL02 stochastic gradient descent |
| nghiêm trọng | MD04 (định nghĩa); dùng ở MD03b, HQ09, LG05, LG08, CP04 | $L$-trơn, $\mu$-lồi mạnh chỉ định nghĩa trong ghi chú (B1) | chấp nhận | đã sửa | MD04 thêm dòng bảng "$L,\mu,\kappa$ / Nhắc lại: $\mu I\preceq\nabla^2F\preceq LI$, tức $\mu\lVert v\rVert^2\le v^T\nabla^2F\,v\le L\lVert v\rVert^2$; $L$ hằng số trơn, $\mu$ hằng số lồi mạnh, $\kappa=L/\mu$ số điều kiện" (dạng toàn phương cũng là dòng nhắc lại nghĩa của $\preceq$, quyết định chung 10); ghi chú MD04 bỏ câu hứa "trang số điều kiện", nhắc định nghĩa và tương đương với điều kiện Hessian; 33 → 46 âm tiết |
| trung bình | MD03b, MD03c | $F$ dùng trước công thức (B2) | chấp nhận | đã sửa | MD03b: "Giả thiết:" lên trước "Nhắc lại:", thêm $F(w)=\frac1n\sum_i\ell_i(w)$ (59 → 59). Dòng tùy chọn ở MD04 không giữ: bảng chạm mép dưới khung 16:9 và che chân trang (đã chụp kiểm) |
| trung bình | MD03c; HQ05 | "rủi ro" trước định nghĩa (B3) | chấp nhận, gộp A2 | đã sửa | xem A2 |
| trung bình | HQ09 | $\kappa_F$ trước $\kappa=L/\mu$ (B4) | chấp nhận | đã sửa | "$\kappa_F=L/\mu=\kappa(X^TX)$" |
| trung bình | HQ09 | $\lambda_{\max}, \lambda_{\min}$ chưa nêu là trị riêng (B5) | chấp nhận | đã sửa | định nghĩa: "Với $A$ đối xứng nửa xác định dương có trị riêng lớn nhất $\lambda_{\max}(A)$, nhỏ nhất $\lambda_{\min}(A)$: …" |
| trung bình | HQ09, KL05 | định lý xen kẽ Cauchy không phát biểu (B6) | chấp nhận (HQ09 ≤ 60) | đã sửa | khung nhận xét tách hai câu: "Theo định lý xen kẽ Cauchy, $\lambda_{\min}$ không tăng, $\lambda_{\max}$ không giảm, nên $\kappa$ không giảm theo $d$"; ghi chú phát biểu đầy đủ $\lambda_j(A)\le\lambda_j(B)\le\lambda_{j+1}(A)$; HQ09 43 → 55, 6 dòng |
| trung bình | CP05, KL05a | Hessian Lipschitz chưa nhắc lại; Armijo (B7) | chấp nhận | đã sửa | CP05 dòng "Nhắc lại: Hessian Lipschitz nghĩa là $\lVert\nabla^2f(w)-\nabla^2f(v)\rVert\le L_H\lVert w-v\rVert$"; "quay lui Armijo (Bài 04)" |
| trung bình | CP05, CP11 | hai giai đoạn Newton chỉ trong ghi chú (B8) | chấp nhận | đã sửa | CP05 "Ý nghĩa: số hạng đầu đếm giai đoạn tắt dần; số hạng sau đếm giai đoạn bậc hai, không chứa $\kappa$"; "(damped)" ở ghi chú; CP05 48 → 60 (bỏ chữ "Newton" lặp ở dòng kết luận và "với hằng số $L_H$" trong giả thiết) |
| trung bình | KL04, KL04a | "nhóm nhỏ" chưa nhắc lại (B9) | chấp nhận (đặt ở KL04a) | đã sửa | KL04a giả thiết: "$g_k$ gradient ngẫu nhiên trên nhóm nhỏ (minibatch) $b$ mẫu, ở đây $b=1$" |
| trung bình | KL04a | $g_k$, $K$ chưa định nghĩa (B10) | chấp nhận | đã sửa | "$\mathbb Eg_k=\nabla F(w_k)$, phương sai $\le\tau^2$; … $K$ bước"; KL04a 42 → 54 |
| trung bình | KL03 | "bài toán XOR" trước dữ kiện (B11) | chấp nhận "(bốn điểm $\{0,1\}^2$, trang sau)" | đã sửa, lệch nhỏ | thêm "(bốn điểm $\{0,1\}^2$)"; bỏ "trang sau" vì dòng (ii) sẽ 21 > 20 âm tiết, và KL03a liền sau mang tiêu đề "Ví dụ: bài toán XOR" |
| nhẹ | LG02 | thiếu "Nhắc lại:"; margin (B12, quyết định chung 1) | chấp nhận | đã sửa | "Nhắc lại: biên có dấu (signed margin, còn gọi là lề có dấu) …"; 15 → 24, dòng đầu 20 âm tiết |
| nhẹ | KL04a | "điểm dừng" chưa nhắc lại (B13) | chấp nhận | đã sửa | dòng ba thêm "(điểm dừng: $\nabla F=0$)" |
| nhẹ | HQ07 | định lý hạng–số chiều chưa phát biểu (B14) | chấp nhận | đã sửa | "định lý hạng–số chiều ($\dim\ker X=d-\operatorname{rank}X$)" |

Quyết định chung áp dụng thêm: "tập mức" (nghĩa sublevel set) thành "tập mức dưới" ở ghi chú HQ08, outline (Định lý 4, nguồn) và ghi chú bài giảng (3 chỗ) theo quyết định chung 6. "giảm gradient" chỉ còn trong dòng D5 của bảng quyết định outline (trích dẫn lịch sử, giữ). Không có "véc-tơ", "cỡ", "hình phạt", "đồng mức", "ràng buộc chặt" trong deck.

### Tự kiểm no-ai-slop (Edit mode, đối chiếu `eval.md`)

Các câu thêm vào mặt trang là mệnh đề toán ngắn với nhãn được phép ("Nhắc lại:", "Ý nghĩa:", "Định nghĩa."); không câu dẫn rỗng, không lời nhấn mạnh, không câu kết kịch tính, không đổi từ đồng nghĩa (một thuật ngữ cho một khái niệm: "số hạng phạt", "dày đặc", "có bậc"). Ghi chú thêm câu có nội dung (định nghĩa, tương đương, phát biểu định lý), không mở bằng "Trang này". Đạt.

### Kiểm tra

- Âm tiết (token khoảng trắng, bỏ tiêu đề, KaTeX, ô số, hình, ghi chú), trước → sau: MD03b 59 → 59, MD03c 52 → 53, MD04 33 → 46, HQ07 32 → 32, HQ07a 46 → 48, HQ09 43 → 55, HQ12 57 → 58, LG02 15 → 24, LG07 41 → 42, LG08a 32 → 34, CP05 48 → 60, CP06a 28 → 31, CP07 52 → 54, CP08 32 → 33, CP11 58 → 60, KL02 77 → 79 (trần 80), KL03 55 → 57, KL04a 42 → 54, KL05a 58 → 59 (trần 80). Không trang nào vượt trần; mọi dòng thêm ≤ 20 âm tiết; không trang mới, không đổi số mạch hay trang "Nội dung"; 67 trang, 67 mục storyboard.
- `deckcheck.py` (Playwright Chromium, 1600×900 và 390×844) trên 21 trang có mặt trang thay đổi: `errors: none`, 0 `.katex-error`, không FLAG ở khổ rộng. Sáu FLAG khổ hẹp `hover` (MD04, HQ07a, HQ09, LG03, LG08a, KL02) là bảng cuộn ngang trong `.table-scroll`, có sẵn: chạy cùng công cụ trên bản deck trước khi sửa cho đúng sáu FLAG đó. Đã xem ảnh từng trang ở cả hai khổ; MD04 ở lần thử đầu (có dòng $F$) chạm mép dưới, đã sửa như ghi ở B2.
- `git diff --check` sạch trên các tệp của Bài 05.

**Quyết định của điều phối viên (Fable 5.1, 2026-10-12):** chấp nhận. Đã đối chiếu diff mặt trang với decisions-05 và decisions-common; kiểm dòng L, μ, κ ở MD04 (μ‖v‖² ≤ vᵀ∇²F v ≤ L‖v‖²) và hệ quả xen kẽ Cauchy ở HQ09 (ma trận con chính: λ_min không tăng, λ_max không giảm); chấp nhận các chỗ làm khác đề xuất vì trần mật độ (dòng F ở MD04, 'kho tin Reuters', 'trang sau'); tự chạy deckcheck trên MD03b, MD04, HQ09, LG02, LG07, CP05, CP11, KL02, KL04a: 0 lỗi, không tràn ở 16:9, ba cờ cuộn ngang khổ hẹp là bảng có sẵn; xem ảnh MD04, CP05 ở 1600×900. Gói học liệu cục bộ đồng bộ ở commit cuối đợt.

## Rà soát mạch 5, 2026-10-15

Người dùng nhận xét mạch 5 "Giới hạn của tối ưu tất định" có nhiều trang không rõ vì sao có mặt.

### Tác tử

| Vai | Loại | Mô hình | Effort | Ghi tệp |
|---|---|---|---|---|
| Rà soát mạch 5, tác tử 1 (chỉ đọc) | general-purpose | opus | high | không |
| Rà soát mạch 5, tác tử 2 (chỉ đọc) | general-purpose | opus | high | không |
| Chỉnh sửa (tác tử ghi duy nhất) | general-purpose | opus | medium | có |

Loại, mô hình và effort ghi theo brief của điều phối viên; bằng chứng là lệnh gọi `Agent` của điều phối viên, không phải lời tự khai của tác tử.

### Phát hiện chính và trạng thái

| Mức độ | Trang chiếu | Vấn đề | Quyết định | Trạng thái |
|---|---|---|---|---|
| nghiêm trọng | KL02, KL04, KL04a | Gọi tên và dùng SGD, gradient nhóm nhỏ, mục tiêu không lồi trước khi định nghĩa; trùng E02b, F02–F04, G01–G01b của Bài 06 | bỏ ba trang | đã sửa |
| nghiêm trọng | KL03, KL03a, KL04 | Nhãn (ii) hai nghĩa ("biểu diễn" ở KL03, "không lồi" ở KL04); chứng minh XOR trùng B02 của Bài 06 | bỏ KL03a; KL03 mỗi nhãn một nghĩa, (ii) dùng ba điểm của LG01 | đã sửa |
| trung bình | KL00 | Dòng dẫn hai nhiệm vụ, dùng "dừng sớm" trước định nghĩa, hứa "bảo đảm còn giữ được" | dòng dẫn một nhiệm vụ, từ khóa mới, ghi chú kế thừa tổng chi phí | đã sửa |
| trung bình | KL01 | "Nhu cầu:" gộp dữ kiện và lời giải; "34 lần" không nói so với bước nào | tiêu đề mới, "Nhu cầu:" chỉ nêu khoảng trống, so sánh nói rõ mốc | đã sửa |
| trung bình | KL01a | Dòng "Ví dụ." lặp số liệu KL01; thiếu bước trực quan của dừng sớm | dòng "Trực quan." định tính theo độ cong | đã sửa |
| trung bình | KL05–KL05c | Tổng kết và bài tập trộn vào mạch giới hạn; bài tập tổng hợp không có lời giải trên mặt trang | tách mạch 6, thêm TK00, TK03a | đã sửa |
| nhẹ | ghi chú MD03a, MD03c, HQ05a, LG01, CP00, CP11, KL01a | Dẫn tới "mạch kết luận", RCV1, XOR, "điều còn giữ được"; câu ẩn dụ "gặp nhau" | sửa dẫn chiếu theo cấu trúc mới | đã sửa |

### Quyết định của điều phối viên (đã chốt trước khi giao chỉnh sửa)

1. Sáu mạch: mạch 5 = KL00, KL01, KL01a, KL03; mạch 6 "Tổng hợp và chuyển giao" = TK00, TK01 (KL05), TK02 (KL05a), TK03 (KL05b), TK03a (mới), TK04 (KL05c).
2. Bỏ KL02, KL03a, KL04, KL04a. Không SVG nào chỉ do bốn trang này dùng (cả bốn không có hình), nên không có tệp hình mồ côi.
3–6. KL00, KL01, KL01a, KL03 sửa theo brief (dòng dẫn, tiêu đề, trực quan, hai giới hạn mỗi nhãn một nghĩa, dòng đích, nhu cầu bằng lời không gọi tên SGD).
7–12. TK00 đúng markup trang tiêu đề mạch; TK01 đổi tiêu đề; TK02 sửa ghi chú; TK03 câu 1 cụ thể; TK03a lời giải trên mặt trang; TK04 sửa dẫn chiếu.
13–14. MD02, MD03a, MD03c và ghi chú CP11 theo cấu trúc mới.
15. Deck Bài 06 chỉ sửa ghi chú có dẫn tới nội dung Bài 05 vừa bỏ.

Các mục cũ được đóng (tham chiếu, không xóa): R7 (quá tải trang khối 3, "gộp KL02 vào ghi chú KL01") đóng theo hướng bỏ KL02, KL03a, KL04, KL04a; R3 (TRON không phải Newton thuần) đóng vì KL02 bỏ, ghi chú KL03 chỉ dẫn Bảng 13.3 như minh họa bậc độ lớn; G13 (KL03 trùng chứng minh XOR của Bài 06) đóng vì KL03a bỏ và XOR chỉ còn ở ghi chú.

### Việc tác tử chỉnh sửa đã làm

- Deck Bài 05: 65 trang (từ 67), 6 section ngoài; TK00 `id="mach-6"`, số "6."; MD03a thêm mục 6.
- Deck Bài 06, chỉ ghi chú: A04 (bỏ ánh xạ $\tau^2$), A03 (hai giới hạn nêu ở trang cuối mạch 5 Bài 05; giới hạn (ii) bằng ba điểm, XOR chứng minh ở mục 2), B01 (bốn điểm $\pm1$ của Mệnh đề 05.40 trong ghi chú bài giảng), B02 (XOR chứng minh tại đây), B03 ($\binom{d_0+q}q$ với $d_0$ biến), E02b (Ví dụ 05.25), F06 ("mạch giới hạn của tối ưu tất định" thay "phần kết luận"), G01 (bỏ "bảng kết luận của Bài 05" và $\tau^2$).
- Kế hoạch: storyboard (phạm vi, bảng mạch, ranh giới CP11 → KL00 và KL03 → TK00, KN1, KN8, cụm dừng sớm, mục từng trang, tiểu mục "Trang đã bỏ 2026-10-15"), outline (bản đồ mạch, kiểm tra cộng, giới hạn áp dụng, R3, R7, mục cập nhật cuối tệp). Thời lượng: KL01/KL01a và KL03 mỗi nơi $+0{,}01$, mạch 6 $+0{,}01$ LT (từ KL02 $0{,}01$ và KL04 $0{,}02$); tổng 2,00 LT + 1,00 BT không đổi.
- Học liệu không sửa. Ghi chú bài giảng Mục 5.2–5.4 vẫn trình bày RCV1, XOR và Nhận xét 05.42; không mâu thuẫn với deck, chỉ đầy đủ hơn.

### Mật độ mặt trang (token có chữ, bỏ tiêu đề, KaTeX, ghi chú)

MD02 65 → 62 (trần 80), MD03a 47 → 52 (trần 80, 7 dòng: danh sách sáu mạch và dòng tài liệu đọc), KL00 38, KL01 51 → 51 (5 dòng, dòng dài nhất 20), KL01a 59 → 60 (chạm trần cứng, 6 dòng), KL03 57 → 60 (chạm trần cứng, 5 dòng), TK00 34, TK01 65 (trần 80), TK02 59 (trần 80), TK03 47 → 59, TK03a 45, TK04 46. KL01a và KL03 vượt mục tiêu 40 vì brief yêu cầu đủ các thành phần (trực quan hai dòng, định nghĩa hai bước, lưu ý; (i), (ii), số đơn thức, đích, nhu cầu); lý do ghi ở storyboard.

### Tự kiểm no-ai-slop (Edit mode, đối chiếu `eval.md`)

Câu mới trên mặt trang là mệnh đề toán ngắn với nhãn được phép ("Trực quan.", "Định nghĩa.", "Lưu ý:", "Nhu cầu:", "Lời giải:"); không câu dẫn rỗng, không nhấn mạnh, không câu kết kịch tính; câu "Hai lý do … gặp nhau" thay bằng câu khẳng định. Ghi chú không mở bằng "Trang này", không có "ta thấy", "chúng ta". Đạt.

### Kiểm tra

- Cấu trúc HTML: 6 section ngoài, cân thẻ; năm trang tiêu đề mạch (HQ00, LG00, CP00, KL00, TK00) đúng markup và số 2–6; mã trang deck khớp 65 mục storyboard.
- Playwright Chromium (1600×900 và 390×844) trên MD02, MD03a, KL00, KL01, KL01a, KL03, TK00–TK04, TK03a: 0 lỗi console, 0 `.katex-error`, tổng 65 trang. Đáy nội dung ở 16:9: KL01 676 px logic, bằng bản trước đợt này (cùng hình, đo cùng công cụ); các trang khác ≤ 607. Bản gộp hai gạch đầu dòng so sánh của KL01 thành một vì bản hai dòng làm chữ chạm chân trang (đã xem ảnh). Kiểm tra hình ảnh đầy đủ do điều phối viên giao riêng.
- `git diff --check` sạch.

### Vòng tái kiểm và sửa vòng 2 (2026-10-15)

| Vai | Loại | Mô hình | Effort | Ghi tệp |
|---|---|---|---|---|
| Tái kiểm mạch kể và toán (chỉ đọc) | general-purpose | opus | high | không |
| Kiểm định hiển thị (chỉ đọc) | general-purpose | opus | high | không |
| Chỉnh sửa (cùng tác tử ghi của vòng 1) | general-purpose | opus | medium | có |

Ghi theo brief của điều phối viên. Không có phát hiện chặn bàn giao hay nghiêm trọng.

| Mức độ | Trang chiếu | Vấn đề | Trạng thái sau sửa |
|---|---|---|---|
| trung bình | TK03a | Lời giải đánh số 1–4, lệch ba câu của TK03 | đã sửa: nhãn "Câu 1:" (hai dòng), "Câu 2:", "Câu 3:"; storyboard ghi TK03a (câu 3) |
| trung bình | Bài 06 B02 (ghi chú) | "Bài 05 không đánh số kết quả này" sai sự thật | đã sửa: định nghĩa nhắc lại từ phần hồi quy logistic Bài 05; Mệnh đề 1 ứng với Mệnh đề 05.40 của ghi chú bài giảng; deck Bài 05 không chứng minh |
| trung bình | KL01 (16:9) | `.cols` đáy 676,1 > 675; hình đáy 666 lấn dải chân trang (đỉnh 652,6) | đã sửa: chiều cao do hình quyết định (định cỡ theo bề rộng cột), nên thêm quy tắc có phạm vi trong `lecture-style.css`, chỉ ở màn rộng hơn 760 px: `:where(html[data-lecture="05"]) .reveal section[data-slide-id="KL01"] figure img { max-height:320px; }`. Đáy nội dung đo lại 632 px logic (chờ 1600 ms sau `Reveal.slide`), hình 320 px, đáy hình 622. Cần kiểm hồi quy CSS chung (quy tắc chỉ khớp KL01 của Bài 05) |
| nhẹ | TK00 | Từ khóa trùng dòng dẫn; chữ "đọc" lẻ ở dòng cuối | đã sửa: ba cụm từ khóa |
| nhẹ | KL01a | KaTeX ngắt sau "(κ =" | đã sửa: $\kappa=553{,}7$ chuyển sang câu thứ hai |
| nhẹ | TK01, TK02 | Cụm "Mệnh đề 1", "Định lý 3", "tập báo cáo", "sai số xác thực" bị tách dòng | đã sửa: `&nbsp;` |
| nhẹ | KL03 | "cần chọn trước $u^2$"; dòng số đơn thức không rõ là hệ quả của (ii) | đã sửa: "cần thêm $u^2$", "Thêm mọi đơn thức …"; "Đích:" giữ (đổi thành "Nhắc lại:" làm trang 61 > 60) |
| nhẹ | KL03 (ghi chú) | Thiếu câu nối với KL01a; đoạn RCV1 dài; "dòng đích" không gọi tên kết quả | đã sửa; ghi chú khoảng 175 âm tiết |
| nhẹ | MD02, TK03, KL00 (ghi chú) | thiếu dẫn mạch 5 cho bước dừng; câu dẫn sang lời giải; "thật sự" | đã sửa |
| nhẹ | outline, storyboard | quy mô 65 trang / 6 mạch; "năm mạch"; luận đề xuyên suốt; lý do vượt mục tiêu 40 | đã sửa |

Phát hiện ngoài phạm vi, để mở:

- CP02: chú thích sát chân trang ở 16:9.
- Bài 06 F03, G02: nội dung sát chân trang.
- `.katex-mathml` trong `.table-scroll` làm `.lecture-viewport` có scrollWidth > clientWidth ở màn hẹp (CSS chung).
- Nút mũi tên lên đè tiêu đề dài (bố cục chung).
- Ghi chú bài giảng Bài 05, Nhận xét 05.42 nêu định lý SGD trước khi chương định nghĩa SGD.

Mật độ sau vòng 2: KL00 38, KL01 51, KL01a 60, KL03 60, TK00 29, TK01 65, TK02 59, TK03 59, TK03a 48, TK04 46, MD02 62. Kiểm tra: Playwright 1600×900 và 390×844, 0 lỗi console, 0 `.katex-error`; `git diff --check` sạch.

**Vòng 3 (2026-10-15, quyết định của điều phối viên):** nhãn "Câu k:" không thuộc danh sách nhãn được phép, nên TK03a dùng lại `<ol>` đúng ba mục ứng ba câu của TK03 (mục 1 rút gọn; cận $\lVert w_\lambda\rVert$ và "mọi cách gán nhãn tách được" ở ghi chú); TK00 dùng `&nbsp;·` trong dòng từ khóa. TK03a 35 âm tiết, đáy nội dung 329 px logic ở 16:9, ba mục lần lượt 2, 1, 1 dòng; Playwright 1600×900 và 390×844: 0 lỗi console, 0 `.katex-error`; `git diff --check` sạch.

### Quyết định của điều phối viên (Opus 5.5 high, 2026-10-15)

| Đầu ra | Tác tử (lời gọi `Agent`) | Quyết định | Lý do |
|---|---|---|---|
| Báo cáo rà soát mạch kể mạch 5 | general-purpose, model opus, effort high, chỉ đọc | chấp nhận | Đối chiếu trùng lặp với Bài 06 (A03, B01–B03, E02b, F02–F04, G01–G01b) bằng grep; chấp nhận tách mạch 6; chọn mã TK00–TK04 |
| Báo cáo rà soát học thuật–sư phạm mạch 5 | general-purpose, model opus, effort high, chỉ đọc | chấp nhận một phần | Chấp nhận bỏ KL04, KL04a, KL03a; không giữ KL02 như đề xuất (bỏ vì SGD và TRON chưa dạy, bảng đã có ở Bài 06 E02b) |
| Sửa vòng 1 (tái cấu trúc) | general-purpose, model opus, effort medium | yêu cầu sửa | Tái kiểm và kiểm định hiển thị nêu TK03a lệch đánh số, ghi chú B02 Bài 06 sai, KL01 lấn footer, các mục nhẹ |
| Tái kiểm mạch kể và toán | general-purpose, model opus, effort high, chỉ đọc | chấp nhận | Tự kiểm lại chi phí Newton $2{,}8\cdot10^7$ / $1{,}75\cdot10^8$ và cận $\kappa\le1+\lambda_{\max}/(800\lambda)$ |
| Kiểm định hiển thị (hai lượt) | general-purpose, model opus, effort high, chỉ đọc | chấp nhận | Lượt cuối: 11 deck 0 lỗi console, 0 `.katex-error`; quy tắc CSS mới khớp đúng một phần tử (KL01, deck 05, khổ rộng) |
| Sửa vòng 2 (gồm quy tắc CSS có phạm vi KL01) | general-purpose, model opus, effort medium | yêu cầu sửa | Nhãn "Câu k:" ở TK03a không thuộc danh sách nhãn được phép; dấu "·" đầu dòng ở TK00 màn hẹp |
| Sửa vòng 3 | general-purpose, model opus, effort medium | chấp nhận | Đã đọc mặt trang TK03a (ba mục khớp ba câu); `--check` đồng bộ học liệu và `git diff --check` sạch |

Phát hiện ngoài phạm vi để mở: chú thích CP02 sát footer; Bài 06 F03, G02 sát footer; `.katex-mathml` trong `.table-scroll` ở màn hẹp; nút mũi tên lên đè tiêu đề dài; ghi chú bài giảng Nhận xét 05.42 nêu định lý SGD trước khi định nghĩa SGD; nhãn SVG KL01 nhỏ ở màn hẹp.

**Vòng 4 (2026-10-15, KL03, quyết định của điều phối viên):** người dùng nhận xét KL03 trộn ví dụ với lý thuyết. Mặt trang chỉ còn hai giới hạn phát biểu tổng quát cùng cấp ((i) chi phí mỗi bước $\propto n$; (ii) với $\varphi$ cố định, dữ liệu không tách được thì thêm đặc trưng thủ công, $d=\binom{d_0+q}q$) và panel "Nhu cầu:"; ví dụ ba điểm và dòng "Đích:" chuyển vào ghi chú. 53 âm tiết, 4 dòng; Playwright 1600×900 và 390×844: 0 lỗi console, 0 `.katex-error`, đáy 328 px logic ở 16:9; `git diff --check` sạch. Trạng thái: đã sửa.

**Vòng 5 (2026-10-15, KL03, yêu cầu sửa của điều phối viên):** phát hiện trung bình: (i), (ii) chưa song song, cụm cụt, "$d^2, d^3$" mất $n$ và $O$, "quá khớp" viết như kết quả chắc chắn. Đã sửa: hai giới hạn theo dạng giới hạn trước, hệ quả sau; (ii) "với $\varphi$ cố định, $\varphi(u)^Tw$ có thể không biểu diễn được quan hệ cần học"; dòng ba "nguy cơ quá khớp, bước Newton $O(nd^2+d^3)$"; ghi chú thêm câu giải thích dòng ba, bỏ câu RCV1 (khoảng 170 âm tiết). Mặt trang 57 âm tiết, 4 dòng (16, 16, 12, 13). Playwright 1600×900 và 390×844: 0 lỗi console, 0 `.katex-error`, đáy 328 px logic ở 16:9; `git diff --check` sạch.

**Quyết định của điều phối viên về KL03 (vòng 4–5, 2026-10-15):** vòng 4 yêu cầu sửa (tái kiểm: general-purpose, opus, effort high, nêu (i)/(ii) chưa song song và cụm cụt); vòng 5 chấp nhận. Đã đọc mặt trang: chỉ phát biểu tổng quát, ký hiệu $x=\varphi(u)$ của MD04, ví dụ ba điểm và dòng đích ở ghi chú; 57 âm tiết, 4 dòng ≤ 16; tác tử sửa chạy Playwright hai kích thước, 0 lỗi, đáy 328 px logic ở 16:9.
