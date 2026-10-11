# Nhật ký rà soát Bài 06

Nhật ký này bắt đầu từ vòng lập lại kế hoạch ngày 2026-10-11. Lịch sử của bộ trang chiếu và học liệu Bài 06 trước ngày đó (thiết kế cũ, nay là Bài 06c bổ trợ) nằm ở `planning/lec-06c/review-log.md` và `planning/lec-06c/review-log-lecture-note.md`. Ngày 2026-10-12 vòng dưới đây được chuyển nguyên văn từ nhật ký cũ sang tệp này; kế hoạch cũ nằm ở `planning/lec-06c/outline.md` và `storyboard.md`.

## Vòng lập lại kế hoạch theo Lecture B (2026-10-11)

### Chỉ dẫn của người dùng

- **Thiết kế hai bài (ảnh thiết kế người dùng gửi ngày 2026-10-11).** Bài 05 nhận Lecture A (*Scaling the Feature Space*), Bài 06 nhận Lecture B (*Scaling Models and Data*, 150 phút; phụ đề gốc “From neural-network expressiveness to stochastic optimization”). Lecture B gồm ba khối 50 phút, mỗi khối một câu hỏi trung tâm: B1 XOR và mạng hai tầng (“Why is linear prediction insufficient?”); B2 lan truyền ngược và tính không lồi (“What can gradients certify now?”); B3 SGD nhóm nhỏ (“What convergence rate remains when gradients are noisy?”). Người dùng không gửi đặc tả dài hơn.
- **Luận đề xuyên suốt (chỉ dẫn 2026-10-11).** Bức tranh của Bài 01–04 (mục tiêu lồi có nghiệm chính xác, phương pháp tất định có bảo đảm hội tụ tới nghiệm) không còn phù hợp khi mô hình và dữ liệu lớn, vì hai lý do phải được nêu sớm và nhắc lại: (1) chi phí tính toán không cho phép dùng toàn bộ dữ liệu ở mỗi bước, nên SGD nhóm nhỏ là phương án bị buộc bởi chi phí, nhiễu và tốc độ chậm hơn là cái giá; (2) khớp tập huấn luyện không phải mục tiêu, $F$ chỉ là đại lượng thay thế cho rủi ro trên dữ liệu mới, nên cực tiểu không chính xác của SGD là chấp nhận được, dừng sớm và chính quy hóa là một phần của phương pháp. Kết luận Bài 05 và mở đầu Bài 06 nêu lại luận đề ở dạng “mất gì (tính chính xác, bảo đảm tất định, gradient đầy đủ), giữ gì (tính giảm, điểm dừng, tốc độ theo kỳ vọng)”.

### Tác tử và bằng chứng chỉ định mô hình

| Vai trò | Loại tác tử | Mô hình | Effort | Ghi/đọc | Bằng chứng |
|---|---|---|---|---|---|
| Tác tử lập kế hoạch Bài 06 | Công cụ Agent, `general-purpose` | `claude-opus-5-5` | high | Chỉ đọc | `plan-lec-06.md` trong thư mục nháp `scratchpad/replan/` của phiên |
| Tác tử lập kế hoạch Bài 05 | Công cụ Agent, `general-purpose` | `claude-opus-5-5` | high | Chỉ đọc | `plan-lec-05.md` trong cùng thư mục nháp |
| Điều phối viên | Phiên hiện tại | `claude-fable-5-1` | medium | Duyệt | `master-decisions.md` trong cùng thư mục nháp |
| Tác tử soạn kế hoạch Bài 06 | Công cụ Agent, `general-purpose` | `claude-opus-5-5` | high | Ghi, chỉ trong `planning/lec-06/` | `outline.md`, `storyboard.md`, mục này của `review-log.md`; hai lệnh `git mv` lưu trữ kế hoạch cũ |

Cột mô hình và effort lấy theo lời gọi công cụ Agent của điều phối viên; điều phối viên đối chiếu lại với lời gọi khi duyệt vòng này. Không dùng OpenRouter, lệnh gọi mô hình trực tiếp hay tệp `.env`.

### Quyết định của điều phối viên về kế hoạch

**Chấp nhận** `plan-lec-06.md` (cùng `plan-lec-05.md`). Điều phối viên tính lại độc lập bằng Python (`Fraction` và số thực) các số của Bài 06: B02 ($F=\tfrac18$), B09 ($F(\theta(t))=t^2$, $(1-t)^2$), B10c ($\tfrac{27}{32}$), C02–C03 ($\ell=\tfrac18$, $\lVert\nabla\ell\rVert^2=\tfrac{69}{16}$), C06 ($\eta=0{,}02$: $0{,}053628$; $\eta=0{,}25$: $\tfrac{2809}{2048}$; $\eta=0{,}5$: $\tfrac{3721}{512}$), C07, E06 (gradient nhóm, $\theta^+$, $\tfrac{37}{16}\to1{,}92017$), D04 ($0{,}28125$; $0{,}139046$), D06 (bảng bình nguyên), D07 ($K=113$; $\lVert\nabla F(\theta_3)\rVert^2=0{,}00453$; trị riêng $0$ và $4{,}25$), E03 (sáu nhóm, $\tfrac{503}{384}$, $\tfrac{133}{128}$), E04 ($\tfrac{59}{4}$, $\tfrac{59}{12}$), F01 ($\tfrac52$, $\tfrac56$), F03/F04/F06 ($0{,}30284$; $0{,}028484$; $0{,}0028304$; $K=80\,400$; $2{,}848\cdot10^{-5}$; $0{,}03028$), F05 ($0{,}6415$ và $0{,}5$ cùng các tỉ lệ giữ khác). Tất cả khớp. Với Bài 05, điều phối viên tính lại bảng A1, bảng ridge $d=5$, dừng sớm, LG10, CP03, $F^*$, điểm hòa vốn CP08 và các bậc chi phí CP09, CP10, KL05; tất cả khớp.

Kiểm nguồn: Bảng 13.3 của Sra–Nowozin–Wright, tr. 363, đối chiếu bằng `pdftotext`: hàng hinge $\lambda=10^{-4}$ (23 642 s / 66 s / 1,4 s; 0,2275 / 0,2278 / 0,2275; 6,02 %) và hàng logistic $\lambda=10^{-5}$ (TRON 30 s / 44 s; SGD 2,3 s; 0,18907 / 0,18890 / 0,18893; 5,68 / 5,70 / 5,66 %). Khớp. Văn bản nguồn xác nhận các hàng TRON dùng mất mát logistic.

### Mười điểm hòa giải giữa hai kế hoạch (bắt buộc cho hai tác tử soạn)

1. **Hệ số chặn.** Không bài nào dùng $b$ cho hệ số chặn ($b$ là cỡ nhóm như 05b, 05c). Bài 05: hệ số chặn nằm trong $w$ qua tọa độ hằng 1 của $x_i$. Bài 06: độ lệch mạng $b_1,b_2$ luôn có chỉ số; ví dụ tuyến tính E03 viết hệ số chặn $c$. A04 của Bài 06 ghi một câu ánh xạ với quy ước của Bài 05.
2. **Newton và $\kappa$.** Cả hai bài dùng cách phát biểu của Bài 05 CP05/R1: chỉ giai đoạn hội tụ bậc hai ($\log_2\log_2(\varepsilon_0/\varepsilon)$ bước) không chứa $\kappa$; $\varepsilon_0$ và giai đoạn tắt dần phụ thuộc $m,M,L_H$. A03, E01, G02 của Bài 06 không viết “Newton không phụ thuộc $\kappa$” vô điều kiện.
3. **Tốc độ không lồi.** Chấp nhận Q3 của Bài 06: T8 chặn trung bình kỳ vọng **bình phương** chuẩn gradient, $O(1/\sqrt K)$; chuyển sang chuẩn là $O(K^{-1/4})$ (ghi chú). Bài 05 KL04 chỉ nêu tên T5, T8.
4. **Mã hóa XOR.** Bài 05 KL03 dùng đúng bốn điểm $\{0,1\}^2$ như Bài 06 B01 (nhãn $+1$ cho $(0,1),(1,0)$, $-1$ cho $(0,0),(1,1)$ theo quy ước $\pm1$ của Bài 05); lập luận $g(1,0)+g(0,1)=g(0,0)+g(1,1)$. Bài 06 B01 nêu nhãn $\{0,1\}$ và mất mát bình phương là lựa chọn để tính tay; ghi chú B07 nói kết luận không lồi giữ nguyên với mất mát logistic (Q5 chấp nhận).
5. **Tập xác thực.** Bài 05 HQ05 định nghĩa trên mặt trang cả tập xác thực (chọn $d$, $\lambda$, bước dừng) và tập kiểm thử (báo cáo $R$); Bài 06 F05 chỉ dẫn lại, không định nghĩa lại (R3 của Bài 06 không kích hoạt).
6. **Thuật ngữ.** “hạ gradient” ở cả hai bài; “nhóm nhỏ (minibatch)”; “lan truyền ngược (backpropagation)”.
7. **Phụ đề.** Tạm dùng phụ đề danh từ do hai kế hoạch đề xuất; chờ người dùng xác nhận (D1 của Bài 05, Q1 của Bài 06).
8. **Hình dùng lại** (Bài 06 F01–F03, F05): ở giai đoạn dựng deck, sao chép vào `img/lec-06/` kèm dòng xuất xứ trong review-log; storyboard ghi đường dẫn gốc (Q4).
9. **Deck và học liệu hiện hành** của Bài 05, 06 không bị sửa trong vòng này; `index.html` không đổi. Việc giữ chúng làm bài bổ trợ (06b) là quyết định của người dùng (D2 của Bài 05, Q2 của Bài 06), chưa thực hiện.
10. **Kế hoạch cũ.** `outline.md` và `storyboard.md` hiện có được đổi tên (`git mv`) thành `outline.old-<ngày>.md`, `storyboard.old-<ngày>.md` trong cùng thư mục; `review-log.md` giữ nguyên và được nối thêm một vòng mới. Với Bài 06: `outline.old-2026-10-02.md`, `storyboard.old-2026-10-02.md`.

### Nguồn đã tham khảo (kế hoạch, mục 8; outline.md, mục 10)

Chỉ lấy thứ tự trình bày và động cơ; không dịch hay chép đoạn văn.

| Tệp | Mục, trang | Dùng cho |
|---|---|---|
| Goodfellow, Bengio, Courville, *Deep Learning* (DL) | §6.1 tr. 171–177 (XOR, (6.1)–(6.11), Hình 6.1–6.2) | Thứ tự: mô hình tuyến tính thất bại → học không gian đặc trưng → nghiệm tường minh; nghiệm DL dùng ở B10 |
| DL | §6.5 tr. 204–224; §6.5.1 tr. 205; Thuật toán 6.2 tr. 209; §6.5.7 tr. 218–221 | Đồ thị tính toán; chi phí lan truyền ngược cùng bậc truyền xuôi; chi phí MLP; bộ nhớ lưu kích hoạt |
| DL | §7.8 tr. 246–252, (7.35)–(7.45) | Dừng sớm tương đương chính quy hóa $\ell_2$ cho hàm bậc hai |
| DL | §8.1 tr. 275–281; §8.2.2 tr. 283–285; §8.2.3 tr. 285–287; §8.3.1 tr. 294–296, Thuật toán 8.1, (8.12)–(8.14) | Đại lượng thay thế, gradient nhóm, xáo trộn theo lượt; đối xứng không gian trọng số; điểm yên ngựa, bình nguyên; SGD, điều kiện bước |
| Sra, Nowozin, Wright (2011), *Optimization for Machine Learning* (SNW), ch. 13 | §13.2.3 tr. 354–355; §13.3.2 tr. 359–362, Bảng 13.2; §13.4.1, Bảng 13.3 tr. 363–364 | Sai số xấp xỉ–ước lượng–tối ưu; chi phí GD và SGD; thí nghiệm RCV1 |
| `sources/Chapter7-full1.pdf` (bài giảng tiếng Việt) | tr. 3–12, 13–17, 18–23 | Thứ tự và cách gọi tiếng Việt cho khác biệt tối ưu học máy và tối ưu thuần túy, SGD |
| `../SML-textbook-main.zip`, chương 2 (MLP, huấn luyện, bộ tối ưu, phân tích hội tụ) và bảng XOR ở chương 1 | | Thứ tự kể và thuật ngữ; không chép câu, không chạy mã |
| Boyd–Vandenberghe, `bv_cvxbook.pdf` | §3.2 | Phép hợp thành giữ tính lồi (B07) |
| Đề cương `sources/đề cương-cơ sở toán học của AI-v2.docx` | Buổi 5, 6; LLO11–16; CLO1–5 | Đối chiếu LLO và nội dung không còn |
| Kế hoạch trong kho | `planning/lec-05b/outline.md`, `planning/lec-05c/outline.md`, `planning/lec-04/outline.md`, kế hoạch Bài 05 và Bài 06 trước vòng này | Nhãn kết quả, ký hiệu, Ví dụ A, định dạng |

Nocedal–Wright không có trong `sources/`; bài này không cần. Không tải nguồn mới.

### Quyết định chờ người dùng và rủi ro

| Mã | Nội dung tóm tắt | Trạng thái |
|---|---|---|
| Q1 | Phụ đề: dạng “Từ … đến …” bị cấm; tạm dùng “Khả năng biểu diễn của mạng nơ ron và tối ưu ngẫu nhiên” | mở |
| Q2 | LLO12 (momentum, Nesterov), LLO13, LLO14, LLO15 (gradient liên hợp, BFGS), LLO16 không còn trong Bài 05, 06; đề xuất giữ hai deck hiện hành làm bài bổ trợ 06b | mở |
| Q3 | Phát biểu tốc độ không lồi theo bình phương chuẩn gradient (điều phối viên đã chấp nhận, chờ người dùng xác nhận) | mở |
| Q4 | Vị trí hình dùng lại; tạm sao chép vào `img/lec-06/` ở giai đoạn dựng deck | mở |
| Q5 | Mất mát bình phương cho XOR thay cho mất mát logistic (điều phối viên đã chấp nhận) | mở |
| Q6 | Mạch mở đầu A (0,12 tiết) tính vào khối B1 | mở |
| R1 | Phụ thuộc kết luận Bài 05; đối chiếu lại khi kế hoạch Bài 05 được chốt | mở |
| R2 | Ký hiệu $b$ trùng chữ với độ lệch $b_1,b_2$; đã giảm nhờ điểm hòa giải 1 | mở |
| R3 | Thiếu tập xác thực ở Bài 05; không kích hoạt nhờ điểm hòa giải 5 | mở |
| R4 | Gradient tại điểm gãy ReLU phải có quy ước $\sigma'(0)=0$ | mở |
| R5 | H2 không đúng toàn cục với mạng; các trang dẫn T7, T8 phải nói “trên vùng chứa dãy lặp” | mở |
| R6 | Tải nội dung E03, F02, G02 có thể tràn khung 16:9; phương án tách đã có (44–45 trang) | mở |
| R7 | Số liệu RCV1 năm 2011; chỉ dùng tỉ lệ thời gian và sự trùng lỗi kiểm thử | mở |
| R8 | Quy mô $(10^9,10^9)$ và tốc độ $10^{12}$ phép/s là giả định minh họa | mở |
| R9 | Hằng số $L=\Delta_0=\sigma^2=1$ ở F03, F04, F06 là giả định để đọc bậc | mở |

Chi tiết và hướng tạm của từng mục nằm trong outline.md, mục 12.

### Ghi nhận của tác tử soạn kế hoạch Bài 06

- **Phạm vi ghi.** Chỉ `2627-1/planning/lec-06/`: `git mv` hai tệp kế hoạch cũ; viết mới `outline.md` (12 mục, 43 trang A01–G03) và `storyboard.md` (khung, bảng mạch, KN1–KN9, 43 mục trang); nối mục này vào `review-log.md`. Không sửa deck, học liệu, hình, `index.html` hay tệp dùng chung; không commit.
- **Áp dụng điểm hòa giải vào kế hoạch.** A04 (điểm 1); A03, E01, G02 (điểm 2); D05, F03, G02 giữ phát biểu bình phương chuẩn (điểm 3); B01, B07 (điểm 4); F05 và lý do KN9 (điểm 5); A01 và Q1 (điểm 7); F01, F02, F03, F05 và mục hình (điểm 8).
- **Thay đổi ngoài mười điểm, cần điều phối viên duyệt.** (a) Tiêu đề B02 và E02 viết lại thành cụm danh từ: “Tính không tách được tuyến tính của XOR”, “Rủi ro thực nghiệm như đại lượng thay thế”. (b) Bản đồ KN1 ghi bước ví dụ ở B01 (ví dụ dẫn nhập) và B02 (hệ quả bình phương nhỏ nhất); bản đồ KN3 ghi phép tính $F(\theta(t))$ trên B09 là ứng dụng của Mệnh đề 3 thay vì ví dụ, và yêu cầu bảng $\theta_A,\theta_B$ đứng trước Mệnh đề 2 trên B08, để thứ tự sáu bước không bị đảo. (c) Ghi chú B07 thêm phép kiểm số với mất mát logistic và nhãn $\pm1$: $F(\theta_A)=F(\theta_B)=\tfrac12(\log2+\log(1+e^{-1}))\approx0{,}503$, trung điểm $F=\log2\approx0{,}693$; số mới, tác tử soạn đã tính lại bằng Python; đã kiểm (điều phối viên). (d) Đổi cách gọi “Bài A” thành “Bài 05”, “Bài 05 cũ” thành “deck Bài 05 hiện hành”, “véc tơ” thành “vector”; đánh số lại tham chiếu mục (ví dụ số ở mục 8, rủi ro ở mục 12).
- **Điểm trùng với kế hoạch Bài 05, chưa thuộc mười điểm.** Kế hoạch Bài 05 KL02 cũng trình bày số liệu RCV1 của SNW Bảng 13.3, và KL01 nêu quan hệ dừng sớm với chính quy hóa bậc hai; Bài 06 E02 và F05 dùng cùng nguồn. Quyết định của điều phối viên: **chấp nhận**, với phân chia sau. Bài 05 KL02 trình bày các hàng mất mát logistic (TRON 30 s / 44 s, SGD 2,3 s); Bài 06 E02 trình bày các hàng mất mát hinge (SVMLight 23 642 s, SVMPerf 66 s, SGD 1,4 s) và ghi chú dẫn tới KL02 cho các hàng logistic. Bài 05 KL01 chỉ nêu quan sát số trên dữ liệu khối A1 và dẫn tên DL §7.8 trong ghi chú; Bài 06 F05 giữ phép so sánh định lượng tỉ lệ giữ. Đã ghi vào ghi chú E02, F05 của outline.md và trường “Đầu vào” của E02, F05 trong storyboard.md. Mục đóng.
- **Sửa theo duyệt của điều phối viên.** Tiêu đề G01 đổi thành “Điều không còn giữ được và điều còn giữ được”, cùng cách diễn đạt với Bài 05 KL04, trong outline.md và storyboard.md.
- **Tự kiểm.** Kỹ năng `no-ai-slop` ở chế độ Edit trên toàn bộ văn bản mới viết (mục 1 và các câu sửa của outline.md, toàn bộ storyboard.md, mục này), đối chiếu `eval.md`: không câu cảm thán, khẩu hiệu, câu hỏi tu từ hay lời giảng viên; tiêu đề là cụm danh từ; câu hỏi trung tâm của người dùng chỉ xuất hiện trong ngoặc kép như trích dẫn và được chuyển thành dòng nhu cầu. Văn bản lấy từ kế hoạch đã duyệt giữ nguyên trừ các chỗ nêu trên. Mã trang trong outline.md và storyboard.md khớp từng mã và từng tiêu đề (43 mục); mỗi mục storyboard có đủ tám trường; `git diff --check` sạch.

### Kiểm định storyboard và lượt sửa (2026-10-11)

| Vai trò | Loại tác tử | Mô hình | Effort | Ghi/đọc | Bằng chứng |
|---|---|---|---|---|---|
| Tác tử kiểm định storyboard Bài 06 (AGENTS.md §5) | Công cụ Agent, `general-purpose` | `claude-opus-5-5` | high | Chỉ đọc | `gate-lec-06.md` trong thư mục nháp `scratchpad/replan/` của phiên; tập lệnh tính lại `scratchpad/gate06/check*.py` |
| Tác tử soạn kế hoạch Bài 06 (lượt sửa) | Công cụ Agent, `general-purpose` (cùng tác tử, tiếp tục bằng tin nhắn) | `claude-opus-5-5` | high | Ghi, chỉ trong `planning/lec-06/` | `outline.md` (mục 1.5), `storyboard.md`, mục này |

Kết luận của cổng: **đạt có điều kiện**; 0 chặn bàn giao, 4 nghiêm trọng, 9 trung bình, 13 nhẹ. Cổng tính lại hơn 25 nhóm số của kế hoạch, tất cả khớp. Điều phối viên xác nhận bốn phát hiện nghiêm trọng, tự tính lại $\mathbb EF(\theta_1)=\tfrac{69}{128}>\tfrac12$ từ $\theta^*$ trên dữ liệu E03, và quyết định cách sửa. Tác tử soạn cũng tính lại: sáu giá trị $\tfrac{131}{256},\tfrac{35}{64},\tfrac{143}{256},\tfrac{143}{256},\tfrac{35}{64},\tfrac{131}{256}$, trung bình $\tfrac{69}{128}$. Tác tử soạn kiểm thêm rằng dọc đoạn bước $\eta\in[0;0{,}25]$ của C06 mọi tiền kích hoạt của mẫu $(1,1)$ đều $\ge\tfrac12$, nên lập luận “hằng số Lipschitz trên đoạn lớn hơn 8” ở ghi chú D04 vẫn hợp lệ với ReLU.

**Số trang sau lượt sửa: 45** (7 mạch; F có 8 trang, G có 3). Mã đổi: F02 cũ → F02 (sàn nhiễu, T5) và F03 (bước giảm dần, T6); F03 cũ → F04; F04 cũ → F05; F05 cũ → F06 (quy tắc dừng sớm) và F07 (dừng sớm và chính quy hóa $\ell_2$); F06 cũ → F08. Câu hỏi vận dụng của G02 chuyển sang G03. Thời lượng vẫn 2,00 + 1,00 tiết, mỗi khối 1,00 tiết. Mã và tiêu đề của outline.md và storyboard.md khớp một-một (45 mục); mỗi mục storyboard đủ tám trường.

Trang đã sửa: A02, A03, A04, B08, B09, C04, D03, D04, D05, D06, E01 (ghi chú), E02, E04 (ghi chú), E05, F01–F08, G01, G02, G03. Mục khung của outline.md đã sửa: 1.1 (luận đề), 1.4, 1.5 (mới), 2, 4.2, 4.3, 4.4, 4.5, 5, 6 (quy ước ghi chú), 7, 8.5–8.7, 9, 11, 12. Storyboard: phạm vi (luận đề, giả thiết, chuỗi, giới hạn, hình), bảng mạch, KN5, KN7, KN8, KN9.

| # | Mức độ | Trang | Vấn đề (tóm tắt) | Trạng thái và cách xử lý |
|---|---|---|---|---|
| 1 | nghiêm trọng | A03, G01, luận đề | SGD không giữ tính giảm mỗi bước theo kỳ vọng | **đã sửa**: điều được giữ là giảm mỗi bước của hạ gradient đầy đủ (bổ đề giảm) và, với SGD, bất đẳng thức một bước có số hạng nhiễu $\tfrac{L\eta^2}2\sigma^2$ (F02), cùng T5, T6, T8; phản ví dụ $\tfrac{69}{128}$ trên F01; sửa outline mục 1.1, 4.5, A03, F01, F02, G01 và phạm vi storyboard. Câu tương ứng ở Bài 05 KL04 và trong common-brief nằm ngoài phạm vi ghi; điều phối viên xử lý |
| 2 | nghiêm trọng | mục 4.3, D04, D05, F04 (F03 cũ), G02, R5 | H2 “trên vùng bị chặn” sai với ReLU | **đã sửa**: M1 và giới hạn mục 4.3 viết lại; T7, T8 áp dụng cho hàm kích hoạt trơn (tanh, softplus) hoặc mạng tuyến tính (D02); với ReLU là định hướng, nêu trên mặt trang D05, F04, G02; ghi chú D04 và R5 sửa theo |
| 3 | nghiêm trọng | C04 | Nhận định sai về đạo hàm suy rộng | **đã sửa**: vector bằng gradient tại mọi điểm $F$ khả vi; tại điểm gãy, $\sigma'(0)=0$ là quy ước tính toán; phản ví dụ $\sigma(z)-\sigma(-z)=z$ nêu trong ghi chú |
| 4 | nghiêm trọng | E02, F05 (F04 cũ) | Phát biểu vượt quá G.2, T8 và Bottou–Bousquet | **đã sửa**: E02 nêu “tại $\theta$ cố định, sai số cỡ $1/\sqrt n$; với bài toán lồi, giảm sai số tối ưu dưới sai số ước lượng không đổi bậc của cận”; F05 nêu cận $O(1/\sqrt K)$ trên $\lVert\nabla F\rVert^2$ là bảo đảm còn lại và luận điểm “đủ” dựa trên E02, không dựa trên T8; luận đề giữ nguyên, phạm vi được nêu ở mục 1.1 và phạm vi storyboard |
| 5 | trung bình | D05, F04, G02 | Điều kiện vùng chưa có trên mặt trang | **đã sửa**: giả thiết “H2 trên một tập lồi chứa mọi dãy lặp” và dòng phạm vi trên mặt trang D05, F04; G02 dòng (4), (5) ghi điều kiện; ghi chú F04 nêu trường hợp dãy lặp ngẫu nhiên |
| 6 | trung bình | G02 dòng (2) | “Lồi trơn” ghép với tốc độ tuyến tính | **đã sửa**: “lồi mạnh và trơn” (T2); ghi chú nêu $O(1/k)$ của trường hợp lồi trơn (T1) |
| 7 | trung bình | F01, F02 (KN8) | Đứt mạch dữ kiện E03 → Ví dụ A | **đã sửa**: F01 giữ số của E03 và hình Ví dụ A có ghi rõ dữ liệu; ghi chú F01 và storyboard KN8 nêu lý do đổi dữ liệu (H6b chỉ đúng trên vùng với E03, đúng toàn cục với Ví dụ A); bỏ câu sai về chuyển $\operatorname{tr}\Sigma(\theta^*)$ sang F02 |
| 8 | trung bình | F05 cũ (KN9) | Trang quá tải; thứ tự lệch; gọi là “khái niệm phụ” | **đã sửa**: tách F06 (hình, rồi quy tắc) và F07 (bảng số, rồi nhận xét DL §7.8); bỏ cách gọi “khái niệm phụ”, lý do không có trang định nghĩa riêng viết lại trong KN9 |
| 9 | trung bình | F02 cũ, G02 | Hai định lý trên một trang; G02 quá tải | **đã sửa**: F02 (T5), F03 (T6); câu hỏi G02 chuyển sang G03 |
| 10 | trung bình | nhiều trang | Trùng ký hiệu $\sigma$, $\lambda$, $m$ | (a) **chấp nhận một phần**: giữ $\sigma^2$ như Bài 05b (điều phối viên cho phép), thêm câu nhắc ở A04, E04, F02 và bảng ký hiệu; (b) **đã sửa**: F07 viết trị riêng là $\alpha$, hệ số chính quy hóa là $\lambda$ (theo quyết định điều phối viên, khác đề xuất $s_j$ của cổng); (c) **đã sửa**: hằng số Hessian viết $m_H,M_H,L_H$ (theo quyết định điều phối viên, khác đề xuất $\mu,L,L_H$) |
| 11 | trung bình | A03 | Thiếu vế dừng sớm và chính quy hóa trên mặt trang | **đã sửa** |
| 12 | trung bình | ghi chú nhiều trang | Mã trang bài khác, chỉ dẫn điều phối trong kế hoạch ghi chú | **đã sửa**: thêm quy ước ở đầu mục 6 của outline: tác tử soạn deck chuyển mã trang thành tên kết quả hoặc tên phần và bỏ chỉ dẫn điều phối; các trang F viết lại đã dùng tên kết quả |
| 13 | trung bình | E05, F04, G01 | T8 bảo đảm cho dãy lặp, thuật toán trả về tham số chọn theo xác thực | **đã sửa**: ghi chú E05, F04, F06; G01 dòng bảo đảm; mục 4.5 |
| 14 | nhẹ | D05 | “điều duy nhất được chứng nhận” | **đã sửa** |
| 15 | nhẹ | C04 | Mặt trang thiếu quy ước $\sigma'(0)=0$ | **đã sửa** |
| 16 | nhẹ | F05 (F04 cũ) | Công thức xấp xỉ khác số trong bảng | **đã sửa**: mặt trang ghi cận hệ quả đầy đủ $\tfrac{2L\Delta_0b}{\mathcal B}+2\sqrt{2L\Delta_0\sigma_1^2/\mathcal B}$, khớp $2{,}85\cdot10^{-5}$ và $0{,}0303$ |
| 17 | nhẹ | B09 | Câu kết đối xứng | **đã sửa**: “lớp ẩn thay cho việc tăng số đặc trưng thủ công; đổi lại, $F$ không lồi (Mệnh đề 3)” |
| 18 | nhẹ | A03 | Nhãn “Câu hỏi của bài” | **đã sửa**: “Vấn đề của bài” với ba cụm danh từ |
| 19 | nhẹ | E02 | Nhãn “Bằng chứng thực nghiệm” | **đã sửa**: “Số liệu thực nghiệm” |
| 20 | nhẹ | A03, A04 | $p$ dùng trước định nghĩa; ánh xạ thiếu 05c | **đã sửa** |
| 21 | nhẹ | D06 | Câu về cận T7 với $K=1$ khó hiểu | **đã sửa** theo đề xuất |
| 22 | nhẹ | KN5, D03 | Thiếu Bài 00 trong lý do ngoại lệ | **đã sửa**: KN5 dẫn Bài 00; D03 ghi “nhắc lại Bài 00” |
| 23 | nhẹ | B08 | Thứ tự mặt trang lệch storyboard | **đã sửa**: ví dụ $\theta_A,\theta_B$ trước Mệnh đề 2 |
| 24 | nhẹ | G02 câu hỏi 2 | Thiếu $\kappa$, $\rho$ | **đã sửa**: câu hỏi ở G03 ghi $\kappa=10$, $\rho=10^{-6}$ |
| 25 | nhẹ | D04 | Nhãn BĐ1 | **đã sửa**: “Bài 05b, phần B: cận trên bậc hai BĐ1, rồi bổ đề giảm” |
| 26 | nhẹ | A02, G02 | Gạch đầu dòng dài | **đã sửa**: ba mục tiêu A02 rút gọn, kỹ năng con chuyển vào ghi chú; điều kiện Newton của G02 chuyển vào ghi chú |

Bổ sung của điều phối viên trong cùng lượt: A04 (outline và storyboard) thêm dòng ánh xạ ký hiệu với Bài 05: Bài 05 viết đầu vào thô là $u$ và vector đặc trưng $x=\varphi(u)\in\mathbb R^d$ có tọa độ hằng 1, hệ số chặn nằm trong $w$, nên $d$ của Bài 05 bằng $p=d+1$ của Bài 06 với mô hình tuyến tính; Bài 06 viết đầu vào thô là $x\in\mathbb R^d$ và đếm tham số bằng $p$. Bài 05 MD04 mang dòng đối xứng. Ghi chú A04 nêu một lần rằng $\sigma$ là hàm kích hoạt ở mạch B–C và $\sigma^2$ là chặn phương sai ở mạch E–F (Bài 05 dùng $\sigma$ cho hàm sigmoid). Trạng thái: **đã sửa**.

Cập nhật trạng thái rủi ro: R5 và R6 đã xử lý trong lượt này (outline.md, mục 12); các mục Q1–Q6, R1–R4, R7–R9 giữ trạng thái mở. Cần chạy lại cổng storyboard cho A03, D04–D05, E02, F01–F08, G01–G03 và hai trang lân cận mỗi phía (AGENTS.md §5, do số lượng và thứ tự trang thay đổi).

Tự kiểm của tác tử soạn sau lượt sửa: `no-ai-slop` chế độ Edit trên các đoạn mới viết, đối chiếu `eval.md`; tổng thời lượng trong bảng mục 7 của outline là 2,00 + 1,00 tiết trên 45 trang; không còn dấu phân cách công thức lẻ; `git diff --check` sạch.

### Kiểm định lại storyboard và lượt sửa cuối (2026-10-11)

| Vai trò | Loại tác tử | Mô hình | Effort | Ghi/đọc | Bằng chứng |
|---|---|---|---|---|---|
| Tác tử kiểm định storyboard Bài 06, lượt kiểm lại | Công cụ Agent, `general-purpose` (cùng tác tử, tiếp tục bằng SendMessage) | `claude-opus-5-5` | high | Chỉ đọc | Báo cáo kiểm lại gửi điều phối viên |
| Tác tử soạn kế hoạch Bài 06 (lượt sửa cuối) | Công cụ Agent, `general-purpose` (cùng tác tử, tiếp tục bằng tin nhắn) | `claude-opus-5-5` | high | Ghi, chỉ trong `planning/lec-06/` | `outline.md`, `storyboard.md`, mục này |

Kết luận kiểm lại: **đạt có điều kiện**; 0 chặn bàn giao, 0 nghiêm trọng, 1 trung bình, 8 nhẹ. Số trang giữ 45; mã và tiêu đề outline/storyboard khớp một-một.

| # | Mức độ | Vấn đề | Trạng thái và cách xử lý |
|---|---|---|---|
| M1 | trung bình | Mã trang xuất hiện trên mặt trang (tham chiếu chéo) | **đã sửa**: quy ước ở đầu mục 6 của outline mở rộng sang mặt trang (mã trang không xuất hiện trên mặt trang và trong ghi chú diễn giả; Mệnh đề 1–3, T5–T8, G.2, G.3 là tên kết quả, được giữ). Viết lại mọi tham chiếu chéo bằng mã trên mặt trang: A04 (bỏ “MD04” khỏi mặt trang, chuyển vào ghi chú), B06 (“Mệnh đề 1”), B07 (“mạng hai đơn vị ẩn biểu diễn XOR”), C01 (“$d=784$, $m=100$”), C06, C07, E06 (“mạng của ví dụ đồ thị tính toán”), D03, D04, D05, D06 (“ví dụ mạng tuyến tính một đơn vị”), E04, F01 (“dữ liệu bốn điểm”), F03, F05 (“quy tắc dừng sớm”), G01 (cột nhãn: “định nghĩa điểm dừng; điều kiện bậc hai”, “phản ví dụ $\tfrac{69}{128}$; bất đẳng thức một bước”, “Định lý G.2; quy tắc dừng sớm”), G03 (“ba mục tiêu học tập”, “bảng lựa chọn phương pháp”). Quét lại: không còn mã trang trong mục Mặt trang của outline. Storyboard G01 ghi nhãn kết quả bằng tên |
| N1 | nhẹ | Trang kiểm tra của mạch G ghi G02 | **đã sửa**: G03 ở bảng mạch outline và storyboard |
| N2 | nhẹ | Câu cũ “cận T7 với $K=1$” ở storyboard D06 | **đã sửa** theo câu mới của mặt trang D06 |
| N3 | nhẹ | Tiêu đề F01 | **đã sửa**: “Nhiễu của gradient nhóm tại nghiệm” (outline và storyboard) |
| N4 | nhẹ | Thiếu dòng kiểm bất đẳng thức một bước | **đã sửa**: ghi chú F02 kiểm trên dữ liệu bốn điểm, $b=2$ không hoàn lại, $\eta=\tfrac14$, $L=\tfrac{5+\sqrt5}4$: tại $\theta^*$ cần $\sigma^2\ge\tfrac56$, vế phải $0{,}547\ge\tfrac{69}{128}=0{,}539$; tại $\theta_0$ cần $\sigma^2\ge\tfrac{59}{12}$, vế phải $1{,}3188\ge\tfrac{503}{384}=1{,}3099$. Tác tử soạn tính lại: $0{,}54711$ và $1{,}31877$ |
| N5 | nhẹ | Nguy cơ tràn khung G03 | **đã sửa**: thêm R10 ở outline mục 12 (trạng thái mở, phương án xử lý khi dựng deck) |
| N6 | nhẹ | KN9 ghi E05 là bước ứng dụng đứng trước nhu cầu và trực quan | **đã sửa**: ứng dụng của KN9 là F07 và G02; bước lưu tham số tốt nhất của E05 thuộc phần hình thức của KN7 |
| N7 | nhẹ | Outline mục 4.1 nói “tốc độ đủ” không nêu phạm vi | **đã sửa**: nêu như dòng kết luận F05 (bảo đảm còn lại là cận T8; luận điểm “đủ” dựa trên E02 và tập xác thực, không dựa trên T8) |
| N8 | nhẹ | Nhu cầu của A02 trong storyboard chưa theo mục tiêu mới | **đã sửa** theo ba mục tiêu hiện hành |

Kiểm tra sau lượt sửa: mã outline/storyboard khớp (45); `git diff --check` sạch.

### Trạng thái

Deck, ghi chú và bài tập Bài 06 chưa dựng lại theo kế hoạch này; deck hiện hành vẫn được index.html liên kết.
