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
