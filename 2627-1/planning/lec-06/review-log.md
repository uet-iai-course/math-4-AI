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

**Đính chính (2026-10-12, vòng rà soát năm vai):** ở hàng hinge, lỗi kiểm thử là 6,02 % / 6,03 % / 6,02 % (SVMPerf 6,03 %; SNW tr. 363, pdftotext: `0.2275 0.2278 0.2275 | 6.02% 6.03% 6.02%`), không phải 6,02 % ở cả ba; kết luận “Khớp” ở dòng trên chỉ đúng cho các số còn lại. Dòng tương ứng trong `planning/lec-05/review-log.md` cần đính chính tương tự (thuộc Bài 05, chưa sửa).

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

## Vòng dựng deck (2026-10-12)

### Tác tử

| Vai trò | Loại tác tử | Mô hình | Effort | Ghi/đọc | Bằng chứng |
|---|---|---|---|---|---|
| Tác tử soạn deck Bài 06 | Công cụ Agent, `general-purpose` | `claude-opus-5-5` | high | Ghi: `lecture-06-mo-rong-mo-hinh-va-du-lieu.html`, `img/lec-06/`, `planning/lec-06/{outline,storyboard,review-log}.md` | Deck và hình trong kho; báo cáo `scratchpad/build/lec-06/author-report.md` của phiên |

Cột mô hình và effort ghi theo brief; điều phối viên xác nhận bằng lời gọi công cụ Agent. Không dùng OpenRouter, lệnh gọi mô hình trực tiếp hay tệp `.env`. Không sửa `lecture-style.css`; không có yêu cầu CSS riêng (`scratchpad/build/lec-06/css-requests.css` ghi rõ điều này). Không commit.

### Sản phẩm

- Deck `2627-1/lecture-06-mo-rong-mo-hinh-va-du-lieu.html`: 45 trang, 7 mạch (A 4, B 10, C 7, D 7, E 6, F 8, G 3), mã và tiêu đề khớp một-một với outline.md và storyboard.md; mỗi trang có ghi chú diễn giả. Khung HTML, khối `<script>` và cấu hình Reveal chép từ deck 05b (`data-lecture="06"`, `width:1200`, `height:675`, `controlsLayout:"edges"`, `slideNumber`, `hash`, `hashOneBasedIndex`, KaTeX cục bộ, Notes, Highlight, Math.KaTeX). Không `<style>`, không `style=""`, không tải gì ngoài `2627-1/`.
- Phụ đề tạm trên trang bìa: “Khả năng biểu diễn của mạng nơ ron và tối ưu ngẫu nhiên” (Q1 vẫn mở).

### Hình

Mười hai SVG mới và bốn bản cho màn hẹp, sinh bằng `scratchpad/build/lec-06/svg/gen.py` của phiên (không trong kho) từ số liệu outline.md mục 8; chữ tiếng Việt, dấu phẩy thập phân, lớp không phân biệt chỉ bằng màu (hình dạng điểm, kiểu nét).

| Tệp | Trang | Nội dung |
|---|---|---|
| `xor-points.svg` | B01 | Bốn điểm XOR, ô vuông rỗng cho $y=0$, hình tròn đặc cho $y=1$ |
| `xor-diagonals.svg` | B02 | Hai đường chéo (liền, nét đứt) và trung điểm chung $(\tfrac12,\tfrac12)$ |
| `xor-feature-map.svg`, `xor-feature-map-narrow.svg` | B04 | Không gian $x$ và không gian $h$; đường $h_1+h_2=\tfrac12$ |
| `two-layer-network.svg` | B06 | Mạng 2–2–1 với $W_1,b_1,w_2,b_2$, $z$, $h$, $f$ |
| `xor-symmetric-path.svg` | B09 | $F(\theta(t))$: $t^2$, $(1-t)^2$, đỉnh $\tfrac14$, dây cung $F=0$ |
| `backprop-forward.svg`, `backprop-forward-narrow.svg` | C02 | Đồ thị tính toán, giá trị truyền xuôi |
| `backprop-backward.svg`, `backprop-backward-narrow.svg` | C03 | Mũi tên ngược nét đứt với $e$, $\delta_h$, $\delta_z$; gradient theo tham số |
| `product-landscape.svg` | D02 | Đường mức $\tfrac12(uv-1)^2$, tập cực tiểu $uv=1$, điểm yên ngựa, $(\pm1,\pm1)$ |
| `descent-bound-product.svg` | D04 | $\varphi(\eta)$ và cận trên bậc hai $L=2$; tại $\eta=\tfrac12$: $0{,}2109$ và $0{,}1390$ |
| `saddle-plateau.svg`, `saddle-plateau-narrow.svg` | D06 | $F(\theta_k)$ và $\lVert\nabla F(\theta_k)\rVert^2$ (logarit), $k=0..15$ |
| `batch-gradients.svg` | E03 | Sáu gradient nhóm và $\nabla F(\theta_0)=(-2;-1{,}5)$ |
| `early-stopping-shrinkage.svg` | F07 | Tỉ lệ giữ của dừng sớm và chính quy hóa, $k$ logarit, ba trị riêng, đánh dấu $k=20$ |

Bản cho màn hẹp được chọn bằng `<picture><source media="(max-width:760px)">`, chỉ dùng HTML, không cần CSS mới.

Hình chép lại (quyết định Q4): `img/lec-05b/vda-sgd-bound-vs-exact.svg` → `img/lec-06/vda-sgd-bound-vs-exact.svg` (F01), giữ nguyên byte (SHA-256 bắt đầu `4beb1bb1e3dc94dd` ở cả hai tệp); `img/lec-06b/risk-curves.svg` → `img/lec-06/risk-curves.svg` (F06), trong bản chép dòng ghi chú “Sơ đồ minh họa; không phải quy luật cho mọi bài toán.” tách hai dòng, cỡ chữ 17 → 24, khung ghi chú rộng lại cho vừa; đường cong và nhãn khác không đổi (bản gốc `5e1b6108…`, bản chép `a536b26d…`). Lý do: ở nửa trang, chữ 17 hiển thị dưới 14 px. `step-halving-schedule.svg` (F02, tùy chọn) và `rates-log-error.svg` (F04, tùy chọn) không dùng nên không chép; `budget-bounds.svg` (F05, tùy chọn) không vẽ. Không có raster.

### Sai lệch so với kế hoạch và lý do

| # | Trang | Quyết định | Nội dung và lý do |
|---|---|---|---|
| 1 | E02, E04, F05, F06, G01; notes | sửa | Kế hoạch gọi các kết quả của Bài 05c là G.2, G.3, G.5, G.6, G.7; ghi chú Bài 05c hiện hành đánh số Định lý 05c.52 (rủi ro thực nghiệm tại tham số cố định), Định lý 05c.53 (gradient lô nhỏ), Mệnh đề 05c.56, Nhận xét 05c.58, Mục 6.7 và Nhận xét 05c.59. Deck dùng số hiệu hiện hành (brief: lấy đúng số hiệu từ ghi chú); outline.md và storyboard.md đã đổi theo |
| 2 | F07, F08(c) | sửa | Kế hoạch nêu hai tỉ lệ giữ gần nhau khi $\lambda\approx1/(\eta k)$ và $\eta\alpha$ nhỏ; DL §7.8 cho (7.44) cần cả $\eta\alpha\ll1$ và $\alpha\ll\lambda$. Số liệu xác nhận: $\alpha=0{,}01$ ($\alpha/\lambda=0{,}1$) cho $0{,}095$ và $0{,}091$, còn $\alpha=0{,}1=\lambda$ cho $0{,}642$ và $0{,}500$ dù $\eta\alpha=0{,}05$ nhỏ. Mặt trang F07 thêm điều kiện thứ hai; đáp án F08(c) giải thích sai khác bằng $\alpha/\lambda=1$ ($(0{,}95)^{20}\approx0{,}358$ gần $e^{-1}$, còn $0{,}5$ khác $e^{-1}$). Không đổi số. Cần tác tử rà toán xác nhận |
| 3 | B05, B06 | sửa | Sơ đồ mạng chỉ đặt ở B06 (định nghĩa); B05 đã có ma trận và bảng truyền xuôi, thêm hình làm chữ hình dưới 14 px |
| 4 | B02 | sửa | Biến thể hai đường chéo là tệp riêng `xor-diagonals.svg` |
| 5 | C03 | sửa | Bảng bảy dòng thay bằng hình truyền ngược (ghi đủ $e$, $\delta_h$, $\delta_z$ và gradient theo bốn khối) cộng một dòng $\nabla_{W_1}\ell$ dạng ma trận; bảng và hình cùng trang vượt khung 16:9 |
| 6 | E03 | sửa | Bảng sáu nhóm xoay thành ba hàng (nhóm, $\widehat g$, $F(\theta_1)$) dưới hai cột chữ–hình; thứ tự trực quan và ví dụ giữ nguyên |
| 7 | F02, F04, F05 | sửa | Không có hình (ba hình tùy chọn không dùng); trang đã đủ một định lý và số đối chiếu |
| 8 | G03 | sửa | Danh mục đọc trên mặt trang rút gọn (Goodfellow và cộng sự §6.1, §6.5, §7.8, §§8.1–8.3; SNW ch. 13; Bài 05b; Bài 05c Mục 6), bản đầy đủ và câu về ghi chú bài giảng Bài 06 trong ghi chú diễn giả (phương án R10) |
| 9 | A02 | sửa | Mục tiêu 3 viết “theo số mẫu, số tham số và tính lồi” thay cho $(n,p)$, vì $p$ chỉ được định nghĩa ở A04 |
| 10 | A03 | sửa | “Vấn đề của bài” là đoạn in đậm nhãn, không đặt trong khung, để trang không chạm nút điều hướng dưới |
| 11 | E01 | sửa | Chú thích bảng nêu SGD là hạ gradient ngẫu nhiên trên nhóm $b$ mẫu, vì đây là lần đầu chữ SGD xuất hiện trên mặt trang |
| 12 | E02 | sửa | “SVM” viết đầy đủ “máy vector hỗ trợ (SVM)” ở lần đầu |

Mọi trang giữ quyết định `thêm` của storyboard; không tách, không gộp; số trang 45, số mạch 7.

### Nguồn đã đối chiếu khi soạn

Không chép đoạn; chỉ dẫn trong ghi chú diễn giả. Goodfellow, Bengio và Courville (2016): §6.1 (XOR, (6.4)–(6.11)), §6.5 (đồ thị tính toán, Thuật toán 6.2, chi phí MLP tr. 220–221), §7.8 ((7.43)–(7.45) và điều kiện của (7.44)), §8.1.3 (xáo trộn theo lượt), §8.2.2–8.2.3 (đối xứng không gian trọng số, bình nguyên), §8.3.1 (Thuật toán 8.1, (8.12)–(8.14)). Sra, Nowozin và Wright (2011) ch. 13: §13.2.3, Bảng 13.2, Bảng 13.3 (số liệu như kế hoạch, điều phối viên đã đối chiếu). Boyd và Vandenberghe §3.2 (hợp thành). Deck và ghi chú Bài 05b (phát biểu T5–T8, nhãn H0–H6b), ghi chú Bài 05c Mục 6 (Định lý 05c.52, 05c.53, Mệnh đề 05c.56, Nhận xét 05c.58, Mục 6.7). Kế hoạch Bài 05 (`planning/lec-05/outline.md`) để gọi tên phần thay cho mã trang.

### Kiểm bằng mắt và kỹ thuật

Máy chủ `python3 -m reloadserver 8765` (đã chạy sẵn, trả 200). Playwright Chromium, tập lệnh `scratchpad/build/lec-06/check.py`: mỗi trang mở bằng `Reveal.getIndices` rồi `Reveal.slide(h, v, 99)`, chụp 1600×900 và 390×844 (màn hẹp chụp thêm khi đã cuộn `.lecture-viewport` tới cuối). Ảnh ở `scratchpad/build/lec-06/shots/`, ảnh ghép xem bằng mắt ở `scratchpad/build/lec-06/review/`.

- 45/45 trang ở cả hai kích thước; 0 lỗi console hoặc lỗi trang (kể cả lỗi phân tích KaTeX); 0 `.katex-error`.
- 16:9: chiều cao nội dung lớn nhất 634 px trên khung 675 (ngưỡng tự đặt 645 để không chạm chân trang); 0 phần tử vượt bề rộng 1200 (bảng và công thức dài nằm trong vùng cuộn ngang).
- Cỡ chữ thân trên mặt trang 28 px (lớp `dense`), không phần tử chữ ngoài KaTeX dưới 27 px; chữ trong mọi SVG hiển thị ≥ 14 px ở 16:9 (tính theo tỉ lệ hiển thị thật của ảnh).
- Màn hẹp: 0 tràn ngang tài liệu; công thức và bảng dài cuộn ngang trong vùng riêng như các deck 05b, 06b. Bốn hình rộng dùng bản xếp dọc; các hình nửa trang khác hiển thị chữ khoảng 10–12 px ở 390 px, ngang mức các deck hiện hành.
- 18 tệp trong `img/lec-06/` tải được (`naturalWidth>0`), mọi `<img>` có `alt` mô tả nội dung và số liệu.
- Bàn phím: phím cách đi qua đủ 45 trang theo thứ tự; mũi tên và Home hoạt động; địa chỉ trang trên thanh địa chỉ đánh số từ 1.
- Xem bằng mắt: mọi trang ở 1600×900; mọi trang ở 390×844 (đầu trang và cuối trang). Đã sửa trong lúc xem: chữ đè đường hoặc chữ quá nhỏ trong bảy SVG, ba trang cao quá ngưỡng (A03, F07, G03), bốn công thức nội dòng tràn ở màn hẹp (D05, E02, E04, F04), công thức rộng trong cột (A04, B02, B05, B08).
- `git diff --check` sạch trên các tệp đã theo dõi; tệp mới không có khoảng trắng cuối dòng, không ký tự tab.

### Tự kiểm văn phong

Kỹ năng `no-ai-slop` chế độ Edit trên toàn bộ tiêu đề, mặt trang và ghi chú; đối chiếu `eval.md`. Đã sửa: hai câu đối lập nhị phân (A03 ghi chú về SGD, F06 mặt trang về dừng sớm), hai mươi bảy câu lấy “trang sau / trang này” làm chủ ngữ thành câu có chủ ngữ là kết quả hoặc đối tượng toán học. Không câu cảm thán, câu hỏi tu từ, lời giảng viên, mã trang, nhãn quy trình hay thời lượng trên mặt trang và trong ghi chú (kiểm bằng biểu thức chính quy). Thuật ngữ tiếng Anh trong ngoặc ở lần đầu: linearly separable, ReLU, hidden unit, pre-activation, forward pass, computational graph, backpropagation, stationary point, saddle point, plateau, SGD, minibatch, epoch, weight space symmetry.

### Điểm cần điều phối viên quyết

1. Đổi nhãn G.2, G.3, G.5–G.7 sang số hiệu hiện hành của ghi chú Bài 05c (sai lệch 1); kế hoạch Bài 05 nếu còn dùng nhãn G cần đổi theo.
2. Điều kiện $\alpha\ll\lambda$ ở F07 và đáp án F08(c) (sai lệch 2): sửa toán so với kế hoạch đã duyệt, cần tác tử rà toán xác nhận.
3. Bản chép `risk-curves.svg` khác bản gốc ở dòng ghi chú; nếu muốn giữ nguyên byte, cần đổi bố cục F06 (hình cả trang) hoặc chấp nhận chữ ghi chú dưới 14 px.
4. Bản hình cho màn hẹp qua `<picture>` là cách mới so với các deck trước; không cần CSS.
5. Q1 (phụ đề) và Q2–Q6 vẫn mở; ghi chú bài giảng và bài tập Bài 06 mới chưa có (G03 nhắc tới chúng trong ghi chú diễn giả); `index.html` chưa đổi.

### Quyết định của điều phối viên

**Quyết định của điều phối viên (Fable 5.1, 2026-10-12, bản thảo deck):** chấp nhận bản thảo để đưa vào vòng rà soát năm vai. Kiểm độc lập: 45 trang đúng mã và thứ tự outline; không mã trang, thời lượng, nhãn quy trình trên mặt trang; 0 `style=`, 0 `<style>`, 0 tài nguyên ngoài; mọi trang có ghi chú; tiêu đề là cụm danh từ; ảnh C03, G01, F07 ở 16:9 xem bằng mắt đạt; bảng F07 tính lại khớp (0,642/0,500; 0,095/0,091) và điều kiện $\alpha\ll\lambda$ đúng theo Goodfellow §7.8 (7.44). Sai lệch của tác tử soạn: (1) dùng số hiệu thật của ghi chú 05c thay nhãn G.k: chấp nhận; (2) sửa điều kiện F07/F08(c): chấp nhận, giao vai kiểm toán xác nhận; (3) bản chép `risk-curves.svg` sửa cỡ chữ: chấp nhận (ghi nguồn); (4) `<picture>` cho bản màn hẹp: chấp nhận như sai lệch có chủ ý, không cần CSS; (5) bỏ ba hình F02/F04/F05: chấp nhận có điều kiện, vai sư phạm và mạch kể đánh giá. Tác tử soạn: general-purpose, claude-opus-5-5, effort high (theo lệnh gọi Agent).

## Sửa sau vòng rà soát năm vai (2026-10-12)

### Tác tử

| Vai trò | Loại tác tử | Mô hình | Effort | Ghi/đọc | Bằng chứng |
|---|---|---|---|---|---|
| Biên tập viên deck Bài 06 (cùng tác tử soạn deck, tiếp tục bằng tin nhắn) | Công cụ Agent, `general-purpose` | `claude-opus-5-5` | high | Ghi: deck, `img/lec-06/`, `planning/lec-06/{outline,storyboard,review-log}.md` | Deck, hình và mục này; đầu vào: `fix-list.md` và năm báo cáo `review-{sinh-vien,chuyen-gia,kiem-toan,su-pham,mach-ke}.md` trong `scratchpad/build/lec-06/` |

Mô hình và effort ghi theo brief; điều phối viên xác nhận bằng lời gọi công cụ. Không sửa `lecture-style.css` hay tệp Bài 05; không commit. Đã nạp `no-ai-slop` (Edit) và tự kiểm theo `eval.md`.

Vai gốc: SV = sinh viên, CG = chuyên gia, KT = kiểm toán, SP = sư phạm, MK = mạch kể.

### Mục nghiêm trọng

| Mục | Vai | Trang | Trạng thái và cách sửa |
|---|---|---|---|
| S1 | CG, KT | E02 | **đã sửa**: SVMPerf $6{,}03\,\%$; bảng tách cột “mục tiêu” và “lỗi kiểm thử”; dòng kết luận “lỗi kiểm thử gần như nhau”; ghi chú “$6{,}02\,\%$, $6{,}03\,\%$ và $6{,}02\,\%$”. Outline E02 sửa; dòng đính chính thêm ngay sau dòng 27 của tệp này. Dòng tương ứng ở `planning/lec-05/review-log.md` (khoảng dòng 47) chưa sửa, thuộc Bài 05, đã báo điều phối viên |
| S2 | SP, CG, SV | F05, G02, G03, A03, E01 | **đã sửa**: mặt F05 nói rõ so hai cận trên trên cùng tổng ngân sách $\mathcal B$, khác ngân sách mỗi bước; kết luận “cận SGD nhỏ hơn khi $\mathcal B&lt;(n-b)^2/2$; với $n=10^3$ hạ gradient đầy đủ vẫn chạy được, cận nhỏ hơn khi $\mathcal B&gt;4{,}9\cdot10^5$”. Kiểm lại: $2n/\mathcal B&lt;2b/\mathcal B+2\sqrt{2/\mathcal B}\iff\mathcal B&gt;(n-b)^2/2$; với $n=10^3$, $b=10$: $490\,050$. G02 dòng 5 “không lồi, $n$ nhỏ so với ngân sách”, căn cứ trong ghi chú. Điểm chuyển SNW ghi “cỡ $10^5$–$10^6$” (log tự nhiên $7{,}2\cdot10^5$, $\log_{10}$ $1{,}7\cdot10^6$), là phép so bậc; G03 1(b) dựa chính vào chi phí một bước $np=10^{14}$ |
| S3 | SP, MK, CG | toàn deck, outline, storyboard | **đã sửa**: sàn nhiễu → mức nhiễu nền (tiêu đề F02); tính tay, bằng tay → tính thủ công; phép kiểm, Kiểm → phép kiểm tra, Kiểm tra; cỡ nhóm → kích thước nhóm; cái giá, trả giá → hệ quả, điều phải đánh đổi, đổi lấy; mất mát hinge → mất mát bản lề (hinge loss); tiêu đề G03 “câu hỏi tự kiểm tra”. SVG không chứa các từ này. Rà bằng `findterms.py`: 0 chỗ còn lại |
| S4 | SP, MK | A01 và ghi chú 25 trang | **đã sửa**: bỏ “cách gọi tạm” ở A01; mọi “mạch A…G”, “câu hỏi cuối mạch” trong ghi chú thay bằng tên phần (phần mạng hai tầng, lan truyền ngược, điểm dừng, gradient nhóm nhỏ, tốc độ hội tụ dưới nhiễu, tổng hợp) hoặc số phần của bản đồ A02; grep “mạch” trong deck: 0 |
| S5 | MK | A02, A03 | **đã sửa**: A03 có dòng “Hai giới hạn của Bài 05: (i) chi phí; (ii) biểu diễn (XOR, đặc trưng thủ công)” và “Vấn đề của bài” bốn mục, mục (1) là biểu diễn XOR và hệ quả; bảng bốn dòng viết lại cùng thứ tự với G01; tiêu đề “Giả thiết lồi của Bài 01–04 …”. A02 “Vấn đề trung tâm” nêu biểu diễn XOR và ngân sách mỗi bước, không lặp danh sách của A03 |

### Mục trung bình

| Mục | Vai | Trang | Trạng thái và cách sửa |
|---|---|---|---|
| M1 | CG | F01 | **đã sửa**: “Khi $\operatorname{tr}\Sigma(\theta^*)&gt;0$, dãy SGD bước hằng dao động quanh $\theta^*$”; ghi chú nêu trường hợp $\theta_A$ của XOR (mọi gradient mẫu bằng 0) |
| M2 | CG, KT | E04, E02, F02, F04 | **đã sửa**: 05c.53 thêm “mọi $\ell_i$ khả vi tại $\theta$”, “các lần chọn độc lập”, “$n\ge2$, $b\le n$”; ghi chú về ReLU; 05c.52 thêm “phương sai hữu hạn”; T5, T8 thêm “$\theta_0$ tất định”; ghi chú E04 tách $\sigma^2$ có hoàn lại (Mục 6.7) và hệ số $\frac{n-b}{n-1}$ (kết luận 2 của 05c.53) |
| M3 | CG, KT | D01 | **đã sửa**: “không lồi: chứa $\theta^*$ và $P\theta^*$ nhưng không chứa đoạn nối (Mệnh đề 3)” |
| M4 | MK, CG, KT, SV | G01, A03 | **đã sửa**: G01 hai cột “Không còn giữ được / Còn giữ được (kết quả của bài)”, dòng (A)/(B), bốn dòng cùng thứ tự A03 và cùng câu chữ với Bài 05 KL04 (đọc deck 05 hiện hành): T7 với $\min_{k&lt;K}$, T8 bước hằng có mức nhiễu nền $L\eta\sigma^2$, không khẳng định dãy hội tụ; “T5, T8 cần $F$ trơn; T6 cần lồi mạnh và H6a” |
| M5 | SV | F01, F02, F08 | **đã sửa**: chú thích F01 nêu $F(\theta)=\tfrac16\sum(\theta-y_i)^2$, $y=(-1,1,3)$, rút một quan sát mỗi bước, $\widehat g=\theta-y_i$, $\sigma^2=\tfrac83$; F02 nêu truy hồi $\mathbb E(\theta_{k+1}-1)^2=0{,}81\,\mathbb E(\theta_k-1)^2+0{,}01\cdot\tfrac83$ (kiểm: $(1-0{,}1)^2=0{,}81$; giới hạn $0{,}01\cdot\tfrac83/0{,}19=\tfrac8{57}$); F08 câu 1 thêm so sánh với cận T5 |
| M6 | SV, SP, CG, KT | G03, F05 | **đã sửa**: bỏ $\kappa$, $\rho$ khỏi câu 1(b), câu trả lời được bằng bảng chi phí; ghi chú F05 định nghĩa $\rho$, $\nu$ |
| M7 | SP | F02, F04 | **đã sửa**: F02 ghi bất đẳng thức một bước là bước trong chứng minh T8 và giải thích phản ví dụ; F04 thêm dòng “Chứng minh (Bài 05b). Cộng bất đẳng thức một bước theo $k&lt;K$”, song song D04→D05; giữ bất đẳng thức ở F02 để không phải chuyển trang |
| M8 | SP | E06 | **đã sửa**: câu 5, dữ liệu bốn điểm tại $\theta^*$, $b=3$ không hoàn lại; đáp án $\operatorname{tr}\Sigma=\tfrac52$, $\mathbb E\lVert\widehat g\rVert^2=\tfrac52\cdot\tfrac13\cdot\tfrac13=\tfrac5{18}$, kiểm bằng liệt kê ($\widehat g=-g_j/3$) |
| M9 | SV, SP, MK | B02, A03, storyboard KN1, outline §11 | **đã sửa**: nhãn “Nhắc lại (Bài 05)” và “Mệnh đề 1 (nhắc lại Bài 05)”, dòng đối chiếu $y_{\pm,i}g(x_i)&gt;0$, $g=f-\tfrac12$; “Hệ quả” → “Ví dụ (bình phương nhỏ nhất)”; ghi chú A03 đặt XOR ở phần kết luận của Bài 05; KN1 và §11 sửa |
| M10 | SV, MK, KT | B03, D05, B09, E03, G02, A04 | **đã sửa**: B03 giữ $q$, ghi chú dẫn $\binom{r+q}{q}$ của Bài 05; D05 “H2 ($\nabla F$ là $L$-Lipschitz)”; B09 định nghĩa $P\theta$ trên mặt trang; E03 định nghĩa $\widehat g$ và $\theta_1=\theta_0-\tfrac14\widehat g$; G02 “T2, Định lý 05b.18”; A04 “Bài 05b viết $x_k\in\mathbb R^n$ (số chiều $n$, số mẫu $N$)” |
| M11 | MK | E01 | **đã sửa**: Hessian 8 byte như Bài 05 ($8\cdot10^{10}$, $8\cdot10^{18}$ byte, trong ghi chú); ghi chú dẫn bảng chi phí ba quy mô của Bài 05 và nêu khác biệt (cột SGD, tốc độ máy giả định); tiêu đề đổi “Chi phí một bước của ba phương pháp ở ba quy mô” để không trùng tên |
| M12 | SV, MK | F06, storyboard KN9 | **đã sửa**: mặt F06 “Bài 05 đã định nghĩa dừng sớm; quy tắc dưới đây thêm chu kỳ đánh giá và điều kiện dừng”; ghi chú dẫn ví dụ bước 79 ($0{,}00108$, gấp 45 lần nhỏ hơn $0{,}0487$); KN9 ghi KL01 của Bài 05 là bước ví dụ của quy tắc |
| M13 | MK | E01 | **đã sửa**: dòng đầu “Định lý T7 cần gradient đầy đủ $\nabla F(\theta_k)$ ở mỗi bước, mỗi lần $O(np)$” |
| M14 | SV, CG | F07 | **đã sửa**: thứ tự Thiết lập → Ví dụ (bảng) → Nhận xét; định nghĩa tỉ lệ giữ; ghi chú dẫn (7.40), (7.42), (7.43), (7.44)–(7.45) |
| M15 | SP, SV | E02, B03, B05, D06 | **đã sửa**: E02 hai cột, nhắc Bài 05 chuyển xuống ghi chú, chữ hoa “Máy vector hỗ trợ”, dòng kết luận; B03 câu kết viết lại; ReLU và điểm gãy định nghĩa trên mặt B05, bình nguyên trên mặt D06 |
| M16 | SP | B04, C03, D06; review-log | **đã sửa**: alt không còn “Trái/Phải”, “từ phải sang trái”, “phía trên” (dùng “khung thứ nhất/thứ hai”, “chiều ngược của đồ thị”, “ghi kèm”). **Quy ước:** mỗi hình rộng có bản `-narrow.svg` sinh cùng bộ sinh `gen.py` từ cùng số liệu; khi sửa số hoặc chữ của một bản phải sinh lại cả hai và so `<desc>` |
| M17 | CG | D06, D03, D02 | **đã sửa**: D06 ghi chú tách bình nguyên khỏi điểm yên ngựa và dẫn Goodfellow tr. 286 (hạ gradient thường thoát điểm yên ngựa trong thực nghiệm); D03 phân biệt đối xứng liên tục (sinh trị riêng 0) với đối xứng hoán vị; D02 hệ số co giãn $c&gt;0$ cho ReLU; D03 nhãn “Bài 00; mục 3 bổ sung” |
| M18 | MK | storyboard, outline | **đã sửa**: storyboard dòng trạng thái; outline §1.3; §3 đặt AdaGrad, Newton/BFGS, chuẩn hóa theo lô ở 06c và ghi quyết định 06b/06c; §9 cột trang của `xor-points.svg` (B01), `two-layer-network.svg` (B06); D06 “dòng bốn giá trị và hình”; bỏ $\kappa$ khỏi đầu ra E03 của storyboard |

### Mục nhẹ

| Mục | Vai | Trạng thái |
|---|---|---|
| N1 | KT | **đã sửa**: alt F07 và `<desc>` của `early-stopping-shrinkage.svg`: các đường tăng dần, cặp $\alpha$ nhỏ tăng muộn hơn; tại $k=1$ cặp $\alpha=1$ ở $0{,}5$ và $0{,}33$; tại $k=1000$ đường chính quy hóa của $\alpha=0{,}01$ ở $0{,}83$ |
| N2 | CG, KT | **đã sửa**: C05 ghi chú “Thuật toán 6.2, tr. 209–210” |
| N3 | KT | **đã sửa**: C03 “cho $-1$ (sai khác dưới $10^{-13}$)”, kèm công thức sai phân trung tâm |
| N4 | SV, SP, MK | **đã sửa**: G03 ghi chú dẫn chứng minh ở Bài 05b, 05c Mục 6; “lời giải chi tiết thuộc học liệu Bài 06”, không khẳng định học liệu đã có |
| N5 | năm vai | Đã làm: A03 “đại lượng thay thế”; A04 thêm $n$ của 05b, $w_k$ của Bài 05, $\theta_t$ của 06b (ghi chú); B01 nhãn $\pm1$; B02 ngưỡng $g=f-\tfrac12$; B03 chi phí Newton; B07 “tích tham số tầng ra với tham số tầng ẩn”; C01 $e_j$; C03 $\odot$; C05 bộ nhớ $2m$; C06 câu kết; D01 dòng nhu cầu; D04 $L=2$ và trùng giá trị $\tfrac9{32}$; D07, B04 bỏ khẩu ngữ; E02 dòng Bottou–Bousquet trên mặt trang, ghi chú về mất mát bản lề không khả vi; E02→E03 câu nối; E04 “Bài 05c gọi nhóm nhỏ là lô nhỏ”; E06 câu 4 viết lại; F01 bỏ đối lập nhị phân, hình nêu tên T5; F04 câu cân bằng hai số hạng, ghi chú dẫn Ví dụ D của 05b; F05 ghi chú nguồn chọn kích thước nhóm; F06 $\widehat R$, ngưỡng kiên nhẫn $r$ thay $K_{\rm stop}$, “có xu hướng giảm” (mặt trang, alt, `<desc>` của `risk-curves.svg`); F07 ghi chú về logistic; G01, G02, E02, B09, B03, C03, C05, F07 bỏ lời bình về trang; G02 tiêu đề, bước T6, bước của T8; G03 trích dẫn đủ tên tác giả, “chương 13”, đáp án 4 so sai số giá trị $\tfrac L2\eta\sigma^2/\mu$ với sai số ước lượng; E01 tiêu đề cột “SGD (ngẫu nhiên)”. Không làm: (a) đánh số lại “Mệnh đề 06.1–06.3” (MK), để dành cho lúc viết ghi chú bài giảng; (b) thống nhất ký hiệu chuyển vị $^\top$ với $^T$ của Bài 05, 05b (MK): giữ $^\top$, chỉ ghi ở đây; (c) đổi tiêu đề trùng G01 ↔ Bài 05 KL04 (SV): tiêu đề G01 do điều phối viên chốt, phía Bài 05 quyết; (d) dời phần 05b/05c của khung đối chiếu A04 vào ghi chú (SV): giữ trên mặt trang vì các định lý 05b, 05c được dẫn ngay sau đó, đã thêm $\mathbb R^n$ |

### Mục bỏ

| Mục | Vai | Lý do |
|---|---|---|
| B1 | SP | Không vẽ thêm hình cho F02, F04, F05. Vai sư phạm xác nhận bước trực quan của cụm đã có: F02 dùng hình Ví dụ A ở F01 (F02 nay trỏ về đường nét đứt của hình đó), F04 kế thừa D04, D06 và F01, F05 là bước ứng dụng. F04 có thêm câu giải thích cách chọn $\eta$ |

### Thay đổi kế hoạch

Outline mục 1.7 (mới) và các mục Mặt trang của A02, A03, B02, E02, E06, F01, F02, F04, F05, F06, F07, G01, G02, G03; năm tiêu đề đổi ở cả outline và storyboard (A03, E01, F02, G02, G03); storyboard thêm đoạn “Sửa sau vòng rà soát năm vai”. Mã và tiêu đề deck, outline, storyboard khớp một-một (45). SVG đã sửa: `early-stopping-shrinkage.svg` (`<desc>`), `risk-curves.svg` (`<desc>`); không đổi hình vẽ.

### Kiểm tra

Playwright, 45/45 trang ở 1600×900 và 390×844 (kèm ảnh cuộn cuối ở màn hẹp): 0 lỗi console hoặc trang, 0 lỗi KaTeX, chiều cao lớn nhất 637/675 px (C03; ngưỡng tự đặt 645), 0 tràn ngang tài liệu, chữ thân ≥ 27 px, chữ SVG hiển thị ≥ 14 px ở 16:9, mọi ảnh tải được và có alt. Đã xem bằng mắt mọi trang ở cả hai kích thước sau lượt sửa. `git diff --check` sạch; không khoảng trắng cuối dòng trong deck và SVG.

### Điểm báo điều phối viên

1. Đính chính $6{,}03\,\%$ cho `planning/lec-05/review-log.md` (khoảng dòng 47) và, nếu Bài 05 trình bày hàng hinge, cho deck Bài 05.
2. Ghi chú KL03 của Bài 05 nói Bài 06 “chứng minh đầy đủ” XOR; Bài 06 nay ghi đây là nhắc lại Bài 05.
3. G01 dùng cùng câu chữ với Bài 05 KL04 hiện hành; nếu KL04 đổi tiếp, G01 cần đổi theo.

### Quyết định của điều phối viên

## Đồng bộ G01 với Bài 05 KL04 sau tái kiểm (2026-10-12)

Yêu cầu của điều phối viên sau khi chấp nhận vòng sửa: KL04 của Bài 05 đã đổi sau tái kiểm, G01 phải khớp. Tác tử: biên tập viên deck Bài 06 (cùng tác tử, `general-purpose`, `claude-opus-5-5`, high).

- **G01 (mặt trang):** bỏ nhãn (A)/(B); dòng dẫn “Mất khi (i) chi phí: gradient nhóm nhỏ thay gradient đầy đủ, hoặc (ii) biểu diễn: mô hình phi tuyến, mục tiêu không lồi”; cột trái “Mất (khi nào)”; hàng bảo đảm tất định mất “khi (i) và (ii)”; cột phải hàng này viết như KL04: gradient đầy đủ giảm $F$ mỗi bước; SGD với $F_\lambda$ lồi mạnh, bước hằng tới lân cận cỡ $\eta\sigma^2/\mu$ (T5), bước giảm dần tới cực tiểu $O(1/k)$ (T6); bỏ câu chung “bảo đảm theo kỳ vọng cho dãy lặp (T5, T8)”. Hàng T7/T8 giữ nội dung. Bài 06 giữ $\sigma^2$ cho chặn phương sai.
- **G01 (ghi chú):** giải thích hai điều kiện, Định lý 3 của Bài 05 mất khi (i) và khi (ii), T5 so với T6; nêu Bài 05 viết $\tau^2$ vì $\sigma$ là sigmoid ở đó, còn trong Bài 06 $\sigma$ không bình phương là hàm kích hoạt.
- **A03:** cột phải hàng hai thành “SGD: bảo đảm theo kỳ vọng, có số hạng nhiễu”; nhãn (i) chi phí, (ii) biểu diễn đã có ở dòng “Hai giới hạn của Bài 05”.
- **Kế hoạch:** outline mục Mặt trang của G01 và A03, storyboard đoạn “Sửa sau vòng rà soát năm vai” cập nhật.
- **Kiểm tra:** A02–A04, F08, G01–G03 ở 1600×900 và 390×844: 0 lỗi console, 0 lỗi KaTeX, A03 cao 620 px, G01 586 px trên khung 675, 0 tràn ngang tài liệu (bảng cuộn ngang trong vùng riêng ở màn hẹp); xem bằng mắt A03, G01 ở hai kích thước. `git diff --check` sạch.

### Quyết định của điều phối viên

## Sửa sau tái kiểm (2026-10-12)

Đầu vào: `recheck-kiem-toan.md`, `recheck-mach-ke.md` (thư mục nháp `scratchpad/build/lec-06/`) và danh sách R1–R7 của điều phối viên. Tác tử: biên tập viên deck Bài 06 (cùng tác tử, `general-purpose`, `claude-opus-5-5`, high). Chỉ sửa tệp Bài 06; không commit.

| Mục | Mức | Trang | Trạng thái và cách sửa |
|---|---|---|---|
| R1 | nghiêm trọng | F05, G02; outline F05, G02 | **đã sửa**. Câu diễn giải “tức khi $n$ lớn so với ngân sách” và dòng G02 “$n$ nhỏ so với ngân sách” sai nghĩa; câu này bắt nguồn từ gợi ý ở mục S2 của danh sách sửa vòng trước, tác tử biên tập chép lại mà không đối chiếu với hàng $n=10^3$ của bảng ($\mathcal B=10n&gt;n$ mà cận SGD nhỏ hơn). Mặt F05: “Cận SGD nhỏ hơn khi $\mathcal B&lt;(n-b)^2/2$, tức số lượt dữ liệu $\mathcal B/n$ nhỏ hơn cỡ $n/2$ (cả hai hàng: 10 lượt). Với $n=10^3$, hạ gradient đầy đủ có cận nhỏ hơn khi $\mathcal B&gt;490\,050$ (khoảng 490 lượt).” Ghi chú F05 nêu dạng tương đương $n-b&gt;\sqrt{2\mathcal B}$ và ví dụ $n=10^4$, $b=10$, $\mathcal B=10^6$ (100 lượt): cận GD $0{,}02$, cận SGD $0{,}00285$, ngưỡng $4{,}99\cdot10^7$ (đã tính lại). G02 dòng 5: “không lồi, $\mathcal B&gt;(n-b)^2/2$ (F05)”; ghi chú G02 đọc thành “ngân sách đủ cho cỡ $n/2$ lượt trở lên” |
| R2 | trung bình | G01 | **đã sửa**: dòng 1 “Đích là nghiệm chính xác (đã mất ở Bài 05)”; dòng 2 “Tốc độ tuyến tính (Định lý 3, Bài 05; khi (i) hoặc (ii))” như KL04 Bài 05 hiện hành; mặt trang định nghĩa $F_\lambda=F+\tfrac\lambda2\lVert\theta\rVert^2$; ghi chú định nghĩa $e_k=F_\lambda(\theta_k)-\min F_\lambda$, nói rõ chỉ cần một trong hai điều kiện và dưới (ii) với gradient đầy đủ vẫn còn bổ đề giảm và T7 |
| R3 | trung bình | A03, E01, E02; outline §1.1 | **đã sửa**: bảng A03 gắn nhãn dòng theo Bài 05 MD03: **Đích** (lý do thống kê), **Biểu diễn** (ii), **Chi phí** (lý do tính toán; (i)); E01 “Lý do tính toán (chi phí, giới hạn (i))”, E02 “Lý do thống kê (đích)”; ghi chú E03 mở bằng câu “Hai lý do của luận đề …”; outline §1.1 thêm câu ánh xạ hai lý do với nhãn dòng |
| R4 | trung bình | B02 | **đã sửa**: “**Mệnh đề 1.**” (đánh số của Bài 06) và “**Chứng minh** (nhắc lại phần kết luận của Bài 05)”; ghi chú nói Bài 05 không đánh số kết quả này và Mệnh đề 1 của Bài 05 là kết quả khác |
| R5 | trung bình | D01, F01, E01 | **đã sửa**: D01 “có thể không lồi; với mạng (Mệnh đề 3): chứa $\theta^*$, $P\theta^*$ nhưng không chứa trọn đoạn nối”; F01 thêm “và $b&lt;n$ (nếu chọn không hoàn lại)”; ghi chú E01 nêu hai bảng chỉ trùng quy mô thứ nhất, Bài 05 dùng $(10^5,10^3)$ và RCV1, bảng ở đây dùng $(10^5,10^5)$, $(10^9,10^9)$, thêm cột SGD và tốc độ máy giả định; chỉ quy ước 8 byte là chung |
| R6 | trung bình | outline, storyboard | **đã sửa**: bỏ “phương án còn lại”, “bảo đảm còn lại”, “tốc độ còn lại”; ba vấn đề, ba câu hỏi → bốn vấn đề (A01, A02, A03, A04, G01, G03); G01 “bảng sáu dòng” → bốn dòng cùng thứ tự A03 và KL04; điểm chuyển $7\cdot10^5$ → cỡ $10^5$–$10^6$, chỉ báo bổ sung (outline F05, G03, §8.6; storyboard F05, G03); $K_{\text{stop}}$ → ngưỡng kiên nhẫn $r$ (KN9, F06); outline §11 bỏ B02 khỏi dòng “Mới”; “kiểm tay” → “kiểm tra thủ công”; “Cỡ nhóm” → “Kích thước nhóm” (R2 của outline); mục Mặt trang của A03, B02, F05, G01, G02 viết lại theo deck; storyboard KN1, KN3 bỏ “đổi lấy” |
| R7 | nhẹ | B09, D07, D03, F05, E06/F01, F02, B05, D06, E03, G02 | **đã sửa**: ghi chú B09 “đặc trưng thủ công khắc phục giới hạn bằng cách tăng số chiều; đặc trưng học được khắc phục nó nhưng làm mất tính lồi”; ghi chú D07 “giữ các giả thiết của T7 về $F$ (H0, H2), thay gradient đầy đủ bằng gradient nhóm; kết quả tương ứng là T8”; D03 “(Bài 00; điều kiện cần ở mục 3 là phần thêm)”; câu mở F05 viết lại thành câu có chủ ngữ; E06 câu 5 đổi sang $\theta=(1,0)$ để F01 không lộ đáp án (đáp án $\operatorname{tr}\Sigma=\tfrac{23}4$, $\mathbb E\lVert\widehat g-\nabla F\rVert^2=\tfrac{23}{36}$, đã kiểm bằng liệt kê); F02 thêm “Số hạng $\tfrac{\eta\sigma^2}{\mu}$ là mức nhiễu nền (noise floor)”; B05 “hàm tuyến tính chỉnh lưu, ReLU”; D06 định nghĩa bình nguyên khớp ghi chú (vùng gradient nhỏ, giá trị gần như không đổi, còn xa cực tiểu; ở ví dụ bao quanh điểm yên ngựa); ghi chú E03 đưa câu nối lên đầu; ghi chú G02 bỏ dấu phẩy thừa |

Kiểm tra: toàn deck 45 trang ở 1600×900 và 390×844 (kèm ảnh cuộn cuối): 0 lỗi console hoặc trang, 0 lỗi KaTeX, chiều cao lớn nhất dưới ngưỡng 645 px (A03 584, F05 624, G01 622), 0 tràn ngang tài liệu. Xem bằng mắt A03, B02, D01, F01, F02, F05, G01, G02 ở hai kích thước. Mã và tiêu đề deck, outline, storyboard khớp (45). `git diff --check` sạch.

### Quyết định của điều phối viên

**Quyết định của điều phối viên (Fable 5.1, 2026-10-12, sau hai vòng sửa):** chấp nhận vòng sửa năm vai (S1–S5, M1–M18, N1–N5; B1 bác bỏ có lý do), lượt đồng bộ G01 với KL04 và vòng sửa sau tái kiểm (R1–R7). Bằng chứng kiểm độc lập: pdftotext tr. 363 (6,02/6,03/6,02 %); bảng F05 tính lại (0,2; 2,85·10⁻⁵; 0,0303), điều kiện $\mathcal B<(n-b)^2/2$ suy từ $2b/\mathcal B+2\sqrt{2/\mathcal B}<2n/\mathcal B$, ngưỡng 490 050; E06 câu 5 với $\theta=(1,0)$: $\operatorname{tr}\Sigma=23/4$, phương sai nhóm $b=3$ không hoàn lại $23/36$; bảng F07 khớp Goodfellow (7.44); ảnh A03, F05 ở 16:9 do điều phối viên tự chụp đạt. Hai câu sai bắt nguồn từ gợi ý của điều phối viên (S2 "n lớn so với ngân sách"; S1(a) phía Bài 05) đã đính chính. Tác tử: soạn/biên tập general-purpose claude-opus-5-5 high; năm vai rà soát và hai vai tái kiểm cùng loại (theo lệnh gọi Agent). Chuyển sang kiểm cuối và viết học liệu.

## Sửa sau kiểm cuối (2026-10-12)

Đã thêm `tabindex="0"` cho 16 vùng `.table-scroll` (A03, B01, B03, B05, B07, B08, C05, D01, E01, E02, E03, F03, F05, F07, G01, G02): bảng ở màn hẹp nhận tiêu điểm và cuộn ngang bằng phím mũi tên (đã kiểm ở G02, 390×844). G02 dòng 5 bỏ mã trang “(F05)”, thay bằng “(so sánh dưới ngân sách cố định)”; outline sửa theo; rà toàn bộ mặt trang và ghi chú, không còn mã trang. `batch-gradients.svg`: nhãn ∇F(θ₀) dời khỏi đầu mũi tên, nhãn {2,3} dùng đường dẫn nét đứt, tách hai nhãn góc −3 và −5. Footer ẩn ở A01–A04 là hành vi đã biết, chung cho mọi deck của học kỳ (quy tắc chung ở dòng 79 của `lecture-style.css`); điều phối viên quyết giữ nguyên. Kiểm tra Playwright G02, E03, F05, A03: 0 lỗi console, 0 lỗi KaTeX, cao tối đa 624 px; `git diff --check` sạch.

**Quyết định của điều phối viên (Fable 5.1, 2026-10-12, kiểm cuối deck):** chấp nhận. Kiểm cuối (general-purpose, claude-opus-5-5, high) đạt: 45/45 trang ở 1600×900 (cao nhất 643/675) và 390×844, 0 lỗi, 0 `.katex-error`, 14/14 hình tải, `<picture>` chọn đúng bản hẹp, phím đi hết deck; planning khớp 45/45; `git diff --check` sạch. Hai mục kỹ thuật (tabindex 16 bảng cuộn; mã trang "(F05)" ở G02) đã sửa và kiểm lại, điều phối viên xác nhận 16 tabindex và không còn mã trang. Footer ẩn ở mạch đầu là luật chung của học kỳ (lecture-style.css dòng 79), giữ nguyên để nhất quán với mọi deck. Deck commit ở mốc này; thẻ index thêm khi học liệu xong.

Đồng bộ với Bài 05 KL04 (2026-10-12): G01 (mặt trang, ghi chú), outline và storyboard không còn gọi $\eta\sigma^2/\mu$ là bán kính; nay viết “tới lân cận, $\mathbb E\lVert\theta_k-\theta^*\rVert^2$ cỡ $\eta\sigma^2/\mu$ (T5)”, ghi chú thêm bán kính cỡ $\sqrt{\eta\sigma^2/\mu}$; rà F02, F03, F08 và toàn deck không còn chỗ nào khác; kiểm G01 ở 1600×900 và 390×844 không lỗi (cao 622 px); `git diff --check` sạch.

## Sửa theo nguyên tắc văn phong và mật độ (2026-10-12)

### Tác tử

| Vai trò | Loại tác tử | Mô hình | Effort | Ghi/đọc | Bằng chứng |
|---|---|---|---|---|---|
| Biên tập viên deck Bài 06 (đợt sửa văn phong MAT1101) | Công cụ Agent, `general-purpose` | `claude-opus-5-5` | high | Ghi: deck, `planning/lec-06/{outline,storyboard,review-log}.md`; không ghi `img/lec-06/`, `lecture-style.css`, `materials/`, `index.html` | Brief `brief-deck-editor.md` trong thư mục nháp của phiên; báo cáo phân tích `phan-tich-mat1101.md` (B.3, D.3, D.6, D.8, E); số đo cơ sở `baseline/lecture-06-mo-rong-mo-hinh-va-du-lieu.txt` |

Mô hình và effort ghi theo brief; điều phối viên xác nhận bằng lời gọi công cụ. Không commit.

### Phạm vi

Áp các mục “Trang tiêu đề mạch” và “Văn phong và mật độ mặt trang chiếu” của AGENTS.md cho deck Bài 06. Deck 45 → 72 trang, 7 mạch giữ nguyên. Thêm 6 trang tiêu đề mạch (`B00` “Biểu diễn phi tuyến và mạng hai tầng”, `C00` “Lan truyền ngược trên đồ thị tính toán”, `D00` “Điểm dừng và bảo đảm của gradient khi không lồi”, `E00` “Gradient nhóm nhỏ và chi phí mỗi bước”, `F00` “Tốc độ hội tụ dưới nhiễu và dừng sớm”, `G00` “Tổng hợp và lựa chọn phương pháp”; `id="mach-2"`…`mach-7"`), trang Nội dung `A02b` (mạch 1 “Bài toán huấn luyện khi mô hình và dữ liệu lớn”, bìa A01 là trang tiêu đề của mạch 1), 20 trang tách. D01 đổi tiêu đề để khác tên mạch 4. Lớp `.dense` gỡ khỏi cả 45 trang cũ (còn 0). Mã T1–T8 (77 lần) và H0–H6b (39 lần) không còn trong tệp deck, kể cả ghi chú. “Ví dụ A” của 05b gọi là “ví dụ ba quan sát”. Nhãn ngoài danh sách AGENTS.md đã bỏ: “Ví dụ dẫn nhập.”, “Mục tiêu.”, “Vấn đề trung tâm.”, “Ứng dụng.”, “Kiểm tra.”, “Không khẳng định:”, “Phạm vi:”, “Lý do thống kê/tính toán”, “Số liệu thực nghiệm”, “Thiết lập.”, “Quy tắc”, “Chi phí:”, “Bước:”. Ghi chú bỏ câu chỉ đường (“Lời giải ở trang kế”, “ở trang sau/trước”) và câu lấy tài liệu làm chủ ngữ ở đầu ghi chú.

### Bảng thay đổi theo trang

Số âm tiết đo bằng `tools/density.py` (không tính tiêu đề, KaTeX, ô số, ghi chú). “—”: trang mới.

| Trang | Trước | Sau | Quyết định | Thay đổi |
|---|---:|---:|---|---|
| A01 | 31 | 31 | `sửa` | ghi chú bỏ câu mô tả phụ đề |
| A02 | 133 | 52 | `tách` | chỉ còn ba mục tiêu; bản đồ → A02b; vấn đề trung tâm → A04 |
| A02b | — | 61 | `thêm` | trang Nội dung 1–7 (7 dòng, ngoại lệ) |
| A03 | 140 | 77 | `sửa` | bảng ba cột có nhãn dòng; bỏ “Vấn đề của bài”; trần 80 (bảng so sánh) |
| A04 | 74 | 29 | `sửa` | thành trang Ngữ cảnh 4 dòng; đối chiếu ký hiệu → ghi chú |
| B00 | — | 37 | `thêm` | tiêu đề mạch 2 |
| B01 | 31 | 27 | `sửa` | “Nhu cầu:” thay panel “Ví dụ dẫn nhập.” |
| B02 | 70 | 42 | `tách` | ví dụ bình phương nhỏ nhất → B02b |
| B02b | — | 46 | `thêm` | ví dụ bình phương nhỏ nhất |
| B03 | 54 | 33 | `sửa` | rút hai câu diễn giải |
| B04 | 11 | 11 | `giữ` | gỡ .dense |
| B05 | 23 | 21 | `sửa` | tiêu đề “Ví dụ: …” |
| B06 | 33 | 33 | `giữ` | gỡ .dense |
| B07 | 59 | 53 | `sửa` | bỏ nhãn “Ứng dụng.” |
| B08 | 45 | 45 | `giữ` | gỡ .dense |
| B09 | 69 | 59 | `tách` | Mệnh đề 3 + chứng minh một dòng; phép kiểm tra XOR → B09b |
| B09b | — | 16 | `thêm` | ví dụ đoạn nối hai cực tiểu |
| B10 | 48 | 38 | `tách` | “Bài tập: …”; đáp án → B10b |
| B10b | — | 18 | `thêm` | lời giải |
| C00 | — | 30 | `thêm` | tiêu đề mạch 3 |
| C01 | 54 | 48 | `sửa` | “Kết luận:” thay panel “Mục tiêu.” |
| C02 | 15 | 15 | `giữ` | gỡ .dense |
| C03 | 28 | 25 | `sửa` | “Ví dụ: …”; bỏ nhãn “Kiểm tra.” |
| C04 | 41 | 27 | `sửa` | bỏ panel; dạng chung → ghi chú |
| C05 | 67 | 39 | `sửa` | ô sai phân ghi số phép nhân; chi tiết → ghi chú |
| C06 | 40 | 24 | `sửa` | “Ví dụ: …”; bỏ hai panel; “Diễn giải:” |
| C07 | 40 | 40 | `tách` | “Bài tập: …”; đáp án → C07b |
| C07b | — | 30 | `thêm` | lời giải (khớp Bài 3) |
| D00 | — | 32 | `thêm` | tiêu đề mạch 4 |
| D01 | 94 | 46 | `tách` | đổi tiêu đề; định nghĩa → D01b |
| D01b | — | 46 | `thêm` | định nghĩa |
| D02 | 22 | 20 | `sửa` | “Ví dụ: …” |
| D03 | 77 | 50 | `sửa` | phát biểu rút gọn |
| D04 | 50 | 33 | `sửa` | (Bổ đề 05b.6); ví dụ hai dòng |
| D05 | 76 | 43 | `tách` | phát biểu bằng lời (Định lý 05b.41); phạm vi → D05b |
| D05b | — | 60 | `thêm` | phạm vi của định lý |
| D06 | 51 | 37 | `sửa` | đệ quy và dãy $F(\theta_k)$ → ghi chú; hết tràn |
| D07 | 46 | 49 | `tách` | “Bài tập: …”; đáp án → D07b |
| D07b | — | 43 | `thêm` | lời giải |
| E00 | — | 33 | `thêm` | tiêu đề mạch 5 |
| E01 | 98 | 56 | `sửa` | SGD viết đầy đủ; “Kết luận:” |
| E02 | 113 | 54 | `tách` | định lý bằng lời (05c.52); RCV1 → E02b |
| E02b | — | 47 | `thêm` | ví dụ RCV1 |
| E03 | 24 | 22 | `tách` | bảng sáu nhóm → E03b (hết tràn) |
| E03b | — | 32 | `thêm` | ví dụ, bước theo từng nhóm |
| E04 | 58 | 52 | `sửa` | định lý bằng lời (05c.53); bỏ panel |
| E05 | 78 | 57 | `sửa` | bỏ panel; gộp bước |
| E06 | 73 | 52 | `tách` | “Bài tập: …”; câu 5 → E06c; đáp án → E06b |
| E06b | — | 23 | `thêm` | lời giải (khớp Bài 7, câu 1–4) |
| E06c | — | 27 | `thêm` | bài tập có lời giải fragment (khớp Bài 7, câu 5) |
| F00 | — | 35 | `thêm` | tiêu đề mạch 6 |
| F01 | 61 | 31 | `tách` | hình → F02b |
| F01b | — | 28 | `thêm` | bất đẳng thức một bước |
| F02 | 91 | 36 | `tách` | định lý bằng lời (05b.36); ví dụ → F02b |
| F02b | — | 26 | `thêm` | ví dụ ba quan sát + hình |
| F03 | 41 | 36 | `sửa` | định lý bằng lời (05b.39) |
| F04 | 89 | 55 | `tách` | định lý bằng lời (05b.43); hệ quả → F04b |
| F04b | — | 32 | `thêm` | hệ quả chọn bước (05b.44) |
| F05 | 97 | 30 | `tách` | kết luận ngưỡng → F05b |
| F05b | — | 48 | `thêm` | ngưỡng $\mathcal B<(n-b)^2/2$ |
| F06 | 84 | 53 | `tách` | quy tắc → F06b |
| F06b | — | 46 | `thêm` | thuật toán dừng sớm |
| F07 | 59 | 45 | `tách` | thành trang ví dụ; nhận xét → F07b |
| F07b | — | 47 | `thêm` | nhận xét, phạm vi, hình |
| F08 | 63 | 41 | `tách` | “Bài tập: …”; đáp án → F08b |
| F08b | — | 26 | `thêm` | lời giải |
| G00 | — | 33 | `thêm` | tiêu đề mạch 7 |
| G01 | 134 | 75 | `tách` | dòng 1–2; trần 80 (bảng so sánh) |
| G01b | — | 47 | `thêm` | dòng 3–4 |
| G02 | 82 | 72 | `sửa` | bỏ mã T trong ô; 8 dòng theo ô chữ, ngoại lệ bảng |
| G03 | 123 | 74 | `tách` | bảng tổng kết ba cột; câu hỏi → G04 |
| G04 | — | 77 | `thêm` | câu hỏi tự kiểm tra, tài liệu đọc |

### Mật độ sau sửa

`density.py`: 72 trang; 0 trang vượt 60 âm tiết ngoài các trang có trần 80 (A02b 61, A03 77, G01 75, G02 72, G03 74, G04 77; đều ≤ 80); 0 dòng quá 20 âm tiết; 0 trang quá 3 khối công thức hiển thị; trang quá 6 dòng: A02b (7, phải liệt kê đủ 7 mạch) và G02 (bộ đo đếm 8 dòng theo ô chữ của bảng 5 hàng × 5 cột) — hai ngoại lệ ghi trong storyboard. Trước sửa: 22 trang > 60 âm tiết, 44/45 trang có `.dense`. Ghi chú diễn giả: 4 trang trên 250 âm tiết (A03 255, E04 267, G02 261, G04 281 là trang đáp án tự kiểm), mức `nhẹ`.

### Kiểm trình duyệt

`tools/deckcheck.py` chạy trên bản sao có chặn yêu cầu `/api-reloadserver/` (máy chủ tự tải lại trang khi tác tử khác ghi tệp, làm hỏng phiên đo; bản gốc dừng giữa chừng với lỗi “Execution context was destroyed”): 72/72 trang, 0 lỗi console hoặc trang, 0 `.katex-error`, 0 tràn dọc ở 1600×900, 0 cuộn ngang ở 390×844. Cờ `TRAN_NGANG` ở D05, E02, F04b, F05, F08b, G02 là dương tính giả: phần tử vượt khung là `path` của SVG căn bậc hai KaTeX nằm trong vùng `overflow:hidden` (đã kiểm phần tử); HEAD trước sửa có cùng loại cờ ở E02, F04, F05, G02. Trước khi tách, D06 (720 px) và E03 (741 px) tràn dọc sau khi gỡ `.dense`; đã sửa (D06 chuyển đệ quy và dãy giá trị xuống ghi chú; E03 tách E03b). Đã xem ảnh (chụp không hiệu ứng chuyển trang) ở 1600×900 và 390×844, kể cả ảnh cuộn cuối, của sáu trang tiêu đề mạch, A02, A02b, A03, A04 và mọi trang tách hoặc sửa nhiều: không chồng lấn, không cắt chữ. Ở 390×844, bảng ba cột G03 hẹp nhưng đọc được trong vùng cuộn; công thức hiển thị dài (F01b, F02) cuộn ngang trong `.formula` như bản trước. `git diff --check` sạch.

### Kiểm `no-ai-slop`

Đã nạp kỹ năng (Edit) và tự đối chiếu `eval.md` trên mọi câu mới hoặc viết lại (mặt trang và ghi chú). Đạt: không câu dẫn rỗng, không nhấn mạnh không căn cứ, không kết luận kịch tính; dòng dẫn của sáu trang tiêu đề mạch nêu đại lượng hoặc nhiệm vụ cụ thể ($O(p)$, $O(np)$, $K$ bước, $n$, $p$). Đã sửa trong lượt tự kiểm: “Bài trả lời ba việc” (tài liệu làm chủ ngữ) → “Ba việc được giải quyết”; ghi chú E01, G01, G03 mở bằng đối tượng thay cho “Bảng …”, “Ba dòng …”; năm câu “Lời giải ở trang kế.” bỏ; D05 “Ý nghĩa:” sửa “giảm theo $O(1/\sqrt K)$” thành “không vượt $O(1/\sqrt K)$” (cận, không phải đại lượng). Giữ: nhãn kết quả, phân biệt toán học, nguồn.

### Kiểm toán học trên nội dung mới

Tính lại: B02b $A^\top A$, $A^\top y$ và $F=\tfrac18$; C05 $(p+1)(md+m)=78\,602\cdot78\,500\approx6{,}17\cdot10^9$; D07b Hessian tại $(2,\tfrac12)$, trị riêng $0$ và $4{,}25$, $K=113$; E06b gradient nhóm $(-\tfrac54,\tfrac52)$, $(-\tfrac12,-\tfrac{17}8)$, $-\tfrac54$; E06c $\tfrac{23}{36}$; F01 $\tfrac1{16}\cdot\tfrac56$; F02b đệ quy $0{,}9(\theta_k-1)+0{,}1(y_i-1)$ cho hệ số $0{,}81$ và giới hạn $\tfrac8{57}$; E03b kỳ vọng $\tfrac{503}{384}$. Số liệu chốt không đổi: lân cận G01 theo $\mathbb E\lVert\theta_k-\theta^*\rVert^2$ cỡ $\eta\sigma^2/\mu$ (bán kính $\sqrt{\eta\sigma^2/\mu}$ trong ghi chú), SVMPerf $6{,}03\,\%$, $\mathcal B<(n-b)^2/2$, nhãn $\{0,1\}$ và $y_\pm=2y-1$.

### Đồng bộ học liệu cần điều phối viên giao

- `materials/lec-06/exercises.md` (dòng 3, tiêu đề Bài 5) còn dùng tên ngắn T5–T8 và “theo T7”; deck không còn mã này. AGENTS.md không bắt buộc đổi học liệu trong đợt này; nếu đổi, câu “Trên trang chiếu, Mệnh đề 1, 2, 3 …” vẫn đúng.
- Lời giải trên mặt trang trùng bài tập: C07b = Bài 3; E06b = Bài 7 câu 1–4; E06c = Bài 7 câu 5 (trên deck tách thành bài riêng); G04 (đáp án trong ghi chú) = Bài 11. Đã đối chiếu, khớp. B10b, D07b, F08b dùng dữ kiện khác Bài 1, 5, 9 nên không trùng.
- Thứ tự ví dụ thay đổi một chỗ: hình ví dụ ba quan sát (Ví dụ A của 05b) chuyển từ trang nhiễu tại nghiệm (F01) sang trang ví dụ sau định lý mức nhiễu nền (F02b). Ghi chú bài giảng không cần đổi nếu không đối chiếu vị trí hình với deck.
- Không học liệu nào liên kết `#/h/v` hay `id` vào deck Bài 06 (đã kiểm `materials/`, `index.html`), nên các trang thêm không làm hỏng liên kết.

### Đề xuất CSS (không sửa, chờ điều phối viên)

Không bắt buộc. Lớp `.dense` và các luật `.dense …` trong khối dùng chung 05/05b/06/06b (`lecture-style.css`, khoảng dòng 833, 874–878) không còn được deck 06 dùng; chỉ gỡ được khi deck 05, 05b, 06b cũng không dùng.

## Sửa sau tái kiểm toán và mạch kể (2026-10-12, đợt văn phong)

### Tác tử

| Vai trò | Loại tác tử | Mô hình | Effort | Ghi/đọc | Bằng chứng |
|---|---|---|---|---|---|
| Biên tập viên deck Bài 06 (tiếp tục cùng tác tử, nhận vòng sửa qua tin nhắn của điều phối viên) | Công cụ Agent, `general-purpose` | `claude-opus-5-5` | high | Ghi: deck, `planning/lec-06/{outline,storyboard,review-log}.md` | Đầu vào: `recheck-06-math.md`, `recheck-06-story.md` trong thư mục nháp của phiên; danh sách bắt buộc của điều phối viên |

Không commit. Không sửa `materials/`, `lecture-style.css`, `img/`.

### Phát hiện của vai tái kiểm toán học

| Mức | Trang | Vấn đề | Trạng thái |
|---|---|---|---|
| nghiêm trọng | B09 | Giả thiết Mệnh đề 3 thành khẳng định | **đã sửa**: “Giả sử $\theta^*$ là cực tiểu toàn cục có hai đơn vị ẩn mang tham số khác nhau.” (bỏ “của $F$” để dòng không quá 20 âm tiết; $F$ đã nêu ở hai hệ quả); khớp G04 câu 2 |
| nghiêm trọng | F05b, G02 | Ngưỡng $(n-b)^2/2$ mất giả thiết hằng số | **đã sửa**: F05b dòng đầu $\mathcal B<L\Delta_0(n-b)^2/(2\sigma_1^2)$, dòng hai “Với $L=\Delta_0=\sigma_1^2=1$: $\mathcal B<(n-b)^2/2$”; G02 dòng 5 “không lồi, $\mathcal B>\mathcal B^*$ (so sánh dưới ngân sách cố định)” và chú thích $\mathcal B^*=L\Delta_0(n-b)^2/(2\sigma_1^2)$; ghi chú F05b, G02 nêu phép suy ngưỡng. Kiểm lại: $2L\Delta_0n/\mathcal B<2L\Delta_0b/\mathcal B+2\sqrt{2L\Delta_0\sigma_1^2/\mathcal B}$ ⇔ $\mathcal B>L\Delta_0(n-b)^2/(2\sigma_1^2)$ |
| nghiêm trọng | D05b | Gradient Lipschitz toàn cục | **đã sửa**: “Mạng tuyến tính, hàm kích hoạt trơn: gradient Lipschitz chỉ trên vùng bị chặn chứa dãy lặp.” (khớp ghi chú D04) |
| trung bình | F01b | “chỉ khi” | **đã sửa**: “bảo đảm giảm theo kỳ vọng khi …; gần nghiệm, số hạng nhiễu trội và bảo đảm này mất” |
| trung bình | G03 | Thiếu giả thiết | **đã sửa**: dòng 2 “$F$ bị chặn dưới; $\nabla F$ là $L$‑Lipschitz; $\eta\le1/L$; tiền kích hoạt khác 0”; dòng 3 “như dòng trên; nhóm chọn độc lập; phương sai $\le\sigma^2$” |
| nhẹ | D03 | Nguồn “(Bài 00)” | **đã sửa**: “(Bài 00; mục 3 bổ sung)” |
| nhẹ | C07b | “không phải gradient” | **đã sửa**: “$\ell$ không khả vi theo $W_1,b_1$; … $\delta_z=0$ là kết quả của quy ước” |
| nhẹ | E06b | Thiếu $\nabla_{W_1}$ trung bình, $\nabla_{b_1}\ell$ | **đã sửa**: thêm cả hai; khớp Bài 7 |
| nhẹ | F04 | “nhỏ dần”, $\Delta_0$, phương sai có điều kiện | **đã sửa**: nêu $\Delta_0=F(\theta_0)-F_{\inf}$, “phương sai có điều kiện”, “$K$ lớn đòi hỏi bước hằng nhỏ hơn” |
| nhẹ | F04b | Thiếu $\sigma>0$ | **đã sửa** |
| nhẹ | G01 | “F giảm mỗi bước” thiếu $\eta\le1/L$ | **đã sửa**: “Gradient đầy đủ, $\eta\le1/L$: $F$ không tăng (bổ đề giảm)” |
| nhẹ | D05 | “K dãy lặp” | **đã sửa**: “trong $K$ điểm lặp đầu” |
| nhẹ | G02 dòng 4 | Trung bình theo $k$ | **đã sửa**: “$O(1/\sqrt K)$, trung bình theo $k$” |
| nhẹ | B00, E00, F00 | Dòng dẫn “Muốn …” | **giữ** B00, E00 (điều phối viên: “Muốn …” và “Nhu cầu:” đều hợp lệ); F00 đổi thành “Muốn chặn sai số của hạ gradient ngẫu nhiên sau $K$ bước và chọn thời điểm dừng.” theo gợi ý của vai mạch kể |

### Phát hiện của vai tái kiểm mạch kể

| Mức | Trang | Vấn đề | Trạng thái |
|---|---|---|---|
| nghiêm trọng | B09 | Mất “Giả sử” | **đã sửa** (như trên) |
| trung bình | F01, F02b (KN8) | Trực quan đặt sau hình thức | **đã sửa**: câu cuối F01 thành “**Trực quan.**”; storyboard KN8 ghi F01 là trực quan, F02b là ứng dụng/kiểm tra Định lý 05b.36, bỏ “ngoại lệ thứ tự”; outline F01 (Mặt trang, Hình, Liên kết, Hành trình) khớp deck |
| trung bình | D01b (KN5) | Định nghĩa trước trực quan | **đã sửa** (cách 2): “Nhắc lại (Bài 00):” cho điểm dừng, điểm yên ngựa; “Định nghĩa.” chỉ cho điểm dừng $\varepsilon$-xấp xỉ (tên cho tiêu chí dừng của Bài 04); KN5 ghi quyết định, không còn ngoại lệ. Không đổi chỗ D02 vì D02 cần tên “điểm yên ngựa” |
| trung bình | F07b | Trực quan sau Nhận xét | **đã sửa**: “**Trực quan.**” đứng đầu, trước “**Nhận xét.**”; KN9 cập nhật |
| trung bình | B03 | Thiếu dòng nhu cầu | **đã sửa**: “**Nhu cầu:** phép biến đổi đặc trưng có tham số, học từ dữ liệu, thay cho liệt kê đơn thức.” |
| trung bình | ghi chú B00–G00, A01, A02b, D07 | Tài liệu làm chủ ngữ | **đã sửa**: mở bằng kết quả hoặc đối tượng kế thừa; không còn “Phần này …” |
| trung bình | G01 | Mất nhãn (i), (ii) của A03 | **đã sửa**: “(i) chi phí: …; (ii) biểu diễn: mục tiêu không lồi.” Ghi chú G01 nêu Bài 05 KL04 gọi (ii) là “không lồi”, cùng nội dung; “(đã mất ở Bài 05)” chuyển xuống ghi chú để giữ trần 80 |
| trung bình | E06 (C07) | Không nêu lại dữ kiện mạng | **đã sửa** ở E06 và C07: $W_1$, $b_1$, $w_2$, $b_2$ bằng KaTeX trên mặt trang |
| trung bình | storyboard | Chưa đồng bộ | **đã sửa**: “72 trang”, đường dẫn hình (F02b), KN1 (B02b là hệ quả số, ví dụ do B01), KN2 (B03 có “Nhu cầu:”), KN3 (B09b), KN5, KN8, KN9 (thêm F00), mục G03 viết lại cho bảng tổng kết; mỗi trang sửa có dòng “Sửa vòng tái kiểm 2026-10-12” |
| nhẹ | B02b | Vai trò | **đã sửa** trong KN1 |
| nhẹ | G01b | Ghi chú gọi “dòng thứ ba/tư” | **đã sửa**: “dòng cực tiểu toàn cục”, “dòng chi phí”; tiêu đề giữ nguyên (trang tiếp nối) |
| nhẹ | D04, C06 | Nhãn ngoài danh sách | **đã sửa**: D04 “Nhắc lại: bổ đề giảm (Bổ đề 05b.6)”; C06 bỏ đậm ở “Bước $\eta=\dots$” |
| nhẹ | B05, C03, C06, D02 | Thiếu dòng yêu cầu | **đã sửa**: thêm “Tính …”/“Xác định …” |
| nhẹ | F00 | Dòng dẫn khẩu ngữ | **đã sửa** (như trên) |
| nhẹ | A02b | Tên mục 1 khác bìa | **giữ**, ghi ngoại lệ trong storyboard A02b và ghi chú A02b |
| nhẹ | F03 | Trực quan chỉ trong ghi chú | **giữ**: trang gần đầy khung; storyboard KN8 ghi F03 dùng chu trình rút gọn hình thức → ví dụ kiểm tra, có lý do |
| nhẹ | E06/E06b câu 4 | Lặp câu 4 của C07 | **không sửa**: E06 trùng Bài 7 của `exercises.md`; đổi câu sẽ lệch học liệu |
| nhẹ | A04 ghi chú | Thiếu $\tau^2$ ↔ $\sigma^2$ | **đã sửa** (thêm ánh xạ); giữ dạng đoạn văn |
| nhẹ | G03 | Giả thiết | **đã sửa** (như trên) |
| nhẹ | outline | Vị trí trang tiêu đề mạch; Mặt trang B01, F01, G01 | **đã sửa**: XX00 đặt dưới “### Mạch X”; B01, F01, G01, F05b, G02 khớp deck; mục 1.8 thêm đoạn “Vòng tái kiểm” |
| nhẹ | E02, E05 ghi chú | Lặp mệnh đề; câu chỉ đường | **đã sửa** |

### Kiểm tra

`density.py`: 72 trang; trang trên 60 âm tiết chỉ còn các trang trần 80 (A02b 61, A03 77, G01 76, G02 78, G03 80, G04 77); 0 dòng quá 20 âm tiết; B09 59, B03 51, D05b 56, F04 58, F05b 50. Quá 6 dòng: A02b (7) và G02 (9 theo bộ đo: bảng 5 hàng và chú thích) — ngoại lệ đã ghi. `deckcheck.py --port 8790` (máy chủ tĩnh): 72/72 trang, 0 lỗi console hoặc trang, 0 `.katex-error`, 0 tràn dọc. Lần đầu G02 tràn dọc (744 px) khi ngưỡng tổng quát nằm trong ô bảng; đã chuyển ngưỡng xuống chú thích $\mathcal B^*$, nay 658/675 px. Cờ `TRAN_NGANG` ở D05, E02, F04b, F05, F08b, G02 vẫn là dương tính giả của SVG căn bậc hai KaTeX trong vùng `overflow:hidden`. Đã xem ảnh 1600×900 và 390×844 (đầu và cuộn cuối) của B03, B09, C03, C06, D01b, D02, D05b, E06, E06b, F01b, F05b, F07b, G01, G02, G03, F00 và sáu trang tiêu đề mạch: không chồng lấn, không cắt chữ. G03: “$L$‑Lipschitz” dùng gạch nối không ngắt dòng. Planning: 72/72 mã và tiêu đề khớp deck ở storyboard và outline. `git diff --check` sạch.

### Quyết định của master (Fable 5.1, effort medium) — 2026-10-12

Master đã tự chạy `density.py` (72 trang; A02b 61, A03 77, G01 76, G02 78, G03 80, G04 77 trong trần 80 của trang mục tiêu/nội dung/tổng kết/bảng so sánh; A02b 7 dòng vì bảy mạch, G02 đếm dòng theo ô bảng; không còn `.dense`, không còn mã T/H), `deckcheck.py` trên máy chủ tĩnh (0 lỗi console, 0 tràn dọc; cờ tràn ngang là dương tính giả KaTeX), đọc nguyên văn B09 ("Giả sử θ* là cực tiểu toàn cục có hai đơn vị ẩn mang tham số khác nhau"), F05b (ngưỡng tổng quát $\mathcal B<L\Delta_0(n-b)^2/(2\sigma_1^2)$, dạng rút gọn kèm giả thiết hằng số) và G02 (chú thích $\mathcal B^*$ dưới bảng, chấp nhận thay cho ghi trong ô vì tràn khung), xem ảnh các trang đã sửa, đối chiếu bảng trạng thái hai báo cáo tái kiểm. `git diff --check` sạch. Quyết định: `chấp nhận`, commit Bài 06. Việc còn treo (đợt học liệu): `materials/lec-06/exercises.md` dòng 3 và tiêu đề Bài 5 còn mã T5–T8/"theo T7".

## Đồng bộ học liệu với deck sau đợt văn phong (2026-10-12)

Tác tử chỉnh sửa học liệu (Agent tool, `general-purpose`, claude-opus-5-5, high, theo brief của điều phối viên Fable 5.1); ghi `materials/lec-06/{lecture-note,exercises}.md` và mục này; không chạy `sync-local-materials.py`, không commit. Đã nạp `no-ai-slop` (Edit) và tự kiểm theo `eval.md`.

| Tệp | Chỗ sửa |
|---|---|
| `exercises.md` | Dòng 3: bỏ bảng tên ngắn T5–T8, thay bằng phát biểu kèm số hiệu (Định lý 06.31/05b.36, 06.32/05b.39, 06.20/05b.41, 06.34/05b.43, Hệ quả 06.35/05b.44, đã đối chiếu tiêu đề trong ghi chú 05b); thêm câu: lời giải Bài 3, 7 có trên trang chiếu (C07b, E06b, E06c), đáp án Bài 11 trong ghi chú G04. Tiêu đề Bài 5 "… số bước của hạ gradient trên hàm không lồi"; mọi "T5", "T7", "T8", "hệ quả của T8" trong đề và lời giải Bài 5, 9, 10, 11 thay bằng số hiệu. Bài 10 câu 1: ngưỡng ghi dạng tổng quát $\mathcal B^*=L\Delta_0(n-b)^2/(2\sigma_1^2)$ rồi dạng rút gọn với $L=\Delta_0=\sigma_1^2=1$, như F05b. Bài 3 câu 4: bỏ "không phải gradient", viết "kết quả của quy ước $\sigma'(0)=0$" như C07b; gợi ý Bài 3 thêm câu 4. Đối chiếu Bài 3 ↔ C07/C07b, Bài 7 ↔ E06/E06b/E06c, Bài 11 ↔ G04: số liệu và kết luận khớp. |
| `lecture-note.md` | Mục tiên quyết: bỏ "gọi tắt là T5, T6, T7, T8"; nêu nơi phát biểu lại từng giả thiết có tên (H0, H2 ở Định lý 06.20; H3, H4 ở Định lý 06.31; H6, H6a, H6b ở Định nghĩa 06.26) và từng định lý (06.20, 06.31, 06.32, 06.34 kèm số hiệu 05b). Bỏ "(T5)", "(T6)", "(T7)", "(T8)" trong câu dẫn và tiêu đề bốn định lý; tiêu đề Ví dụ 06.15 "cận của Định lý 06.20"; tóm tắt chương, công thức cần nhớ và bảng mục tiêu–bài tập thay mã bằng tên kèm số hiệu. Ngưỡng ngân sách: bảng lựa chọn Mục 7.2 ghi $\mathcal B>L\Delta_0(n-b)^2/(2\sigma_1^2)$; Ví dụ 06.24 (đoạn "Ngưỡng") và lời giải Bài tập 06.6 nêu dạng tổng quát trước dạng rút gọn với các hằng số bằng $1$. Mệnh đề 06.9 đã có giả thiết "$F$ đạt cực tiểu toàn cục tại $\theta^*$" khớp "Giả sử" của B09, không sửa. Nhãn giả thiết H0–H6b giữ nguyên vì được định nghĩa trong chính ghi chú. |

Kiểm tra: `git diff --check` sạch; `grep -E '\bT[1-8]\b'` trong `materials/lec-06` không còn kết quả; trình xem `material-viewer.html?doc=materials/lec-06/{lecture-note,exercises}.md&deck=lecture-06-mo-rong-mo-hinh-va-du-lieu.html` trên máy chủ tĩnh cổng 8790 (Playwright Chromium): 0 lỗi console, 0 `.katex-error`, một `h1` mỗi tệp. Còn lại cho điều phối viên: chạy `sync-local-materials.py` và `--check`.

**Quyết định của điều phối viên:** (chờ duyệt)

Quyết định của master (Fable 5.1), đợt đồng bộ học liệu 2026-10-12: đã đọc diff, viewer (ghi chú và bài tập) trên máy chủ tĩnh 0 lỗi console, 0 `.katex-error`; `sync-local-materials.py --check` OK; `git diff --check` sạch. `chấp nhận`, commit.

## Đợt rà soát thuật ngữ và thứ tự định nghĩa 2026-10-12

### Tác tử

| Vai | Loại (Agent tool) | Mô hình | Effort | Ghi tệp |
|---|---|---|---|---|
| Rà soát thuật ngữ và thứ tự định nghĩa (Detect) | `general-purpose` | claude-opus-5-5 | high | không; báo cáo `report-06.md` do điều phối viên lưu |
| Biên tập (Edit, theo `decisions-common.md` và `decisions-06.md` của điều phối viên Fable 5.1) | `general-purpose` | claude-opus-5-5 | high | deck, `img/lec-06/two-layer-network.svg`, `outline.md`, `storyboard.md`, mục này, `materials/lec-06/{lecture-note,exercises}.md`; không chạy `sync-local-materials.py`, không commit |

Tác tử biên tập đã nạp `no-ai-slop` (SKILL.md, eval.md), dùng chế độ Edit và tự kiểm các câu mới theo eval.md (không từ cấm, không câu dẫn rỗng, không gạch ngang trang trí; một câu ghi chú D01b viết lại cho cụ thể).

### Thay đổi cấu trúc

- A04 “Ngữ cảnh” đứng trước A03 (B3); D01b đứng trước D01 (B7, phương án 1).
- D04 tách thành D04 (bổ đề giảm có định nghĩa gradient $L$-Lipschitz) và D04b “Ví dụ: bổ đề giảm trên mạng tuyến tính một đơn vị”: thêm định nghĩa làm trang hai cột vượt khung 16:9 (đáy nội dung 726 px logic, khung 675). Deck 72 → 73 trang, vẫn 7 mạch; trang “Nội dung” và `#/N` của các mạch không đổi.

### Phát hiện và quyết định

| mức độ | trang | vấn đề | quyết định điều phối viên | trạng thái | cách sửa |
|---|---|---|---|---|---|
| trung bình | B04, ghi chú B00, B09b, SVG | “lớp ẩn” lẫn với “tầng”, “lớp” còn chỉ lớp nhãn (A1) | chấp nhận | đã sửa | “tầng ẩn (hidden layer)”; tiêu đề B04, nhãn và `desc` của `two-layer-network.svg` (`desc` cũng đổi “độ lệch b₁” → “độ chệch b₁”) |
| trung bình | E02, ghi chú E02, G04 | “sai số dư” cho excess error (A2) | chấp nhận | đã sửa | “sai số vượt”; “(excess error)” và định nghĩa trong ghi chú E02; phân rã ba thành phần không lên mặt trang vì E02 sẽ vượt 60 (58 sau sửa), giữ trong ghi chú |
| trung bình | G02 | “quét hết dữ liệu” (A3) | chấp nhận | đã sửa | “toàn bộ $n$ mẫu” (bản “… mỗi bước” làm ô ba dòng, bảng vượt khung; cột đã tên “Mỗi bước”) |
| nhẹ | F06 | “đạt đáy rồi tăng” (A4) | chấp nhận | đã sửa | “giảm tới cực tiểu rồi tăng” |
| nhẹ | D00, ghi chú A02 | “phép thử Hessian” (A5) | chấp nhận | đã sửa | “phép kiểm tra bậc hai” |
| nhẹ | ghi chú C02 | “không chạm điểm gãy” (A6) | chấp nhận | đã sửa | “không rơi vào điểm gãy” |
| nhẹ | ghi chú D05 | “triệt tiêu (tổng lồng)” (A7) | chấp nhận | đã sửa | “triệt tiêu liên tiếp (telescoping)” |
| nhẹ | ghi chú C01 | “sai số cắt” (A8) | chấp nhận | đã sửa | “sai số chặt cụt (truncation error)” |
| nhẹ | ghi chú C01, C03 | thiếu tiếng Anh (A9) | chấp nhận | đã sửa | “(finite difference)”, “(central difference)” |
| nhẹ | B05 | ReLU gọi là “hàm tuyến tính chỉnh lưu” (A10) | chấp nhận | đã sửa | mặt trang “hàm ReLU”; ghi chú “đơn vị tuyến tính chỉnh lưu (rectified linear unit, ReLU)” |
| nhẹ | A01, B06 | “nơ ron”; thiếu tiếng Anh (A11) | chấp nhận | đã sửa | “nơ-ron”; “(neural network)” ở ghi chú B06 |
| nhẹ | C00–C04 | tiếng Anh “backpropagation” chỉ ở C04 (A12) | chấp nhận | đã sửa | chuyển lên ghi chú C00 |
| nhẹ | A03, E02 | thiếu “(surrogate)” (A13) | chấp nhận | đã sửa | ghi chú A03 và E02 |
| nhẹ | F06b | thiếu “(patience)” (A14) | chấp nhận | đã sửa | ghi chú F06b |
| nhẹ | F07 | “tỉ lệ giữ” không có tên tiếng Anh (A15) | chấp nhận | đã sửa | ghi chú “hệ số co (shrinkage factor)” |
| nhẹ | E05 | “lỗi xác thực” lệch “sai số xác thực” (A16) | chấp nhận | đã sửa | “sai số xác thực” |
| nhẹ | F02b | “rút đều” (A17) | chấp nhận | đã sửa | “chọn đều” |
| nhẹ | E05 | trật tự từ bước 1 (A18) | chấp nhận | đã sửa | “Chọn đều ngẫu nhiên $b$ chỉ số làm $B_k$, …” |
| nhẹ | D07b | “không loại điểm gần yên ngựa” (A19) | chấp nhận | đã sửa | “không loại khả năng dừng gần điểm yên ngựa” |
| nhẹ | D03 | “mục 3” trùng cách gọi mạch (A20) | chấp nhận | đã sửa | “(Bài 00; ý 3 là phần bổ sung)”; ghi chú “Ý 3” |
| nhẹ | G04 | “ch. 13” (A21) | chấp nhận | đã sửa | “chương 13” |
| nhẹ | ghi chú A04, D02, E04, E06c | bias hai tên; “độ lệch” còn chỉ sai lệch (A22) | chấp nhận | đã sửa | “độ chệch (bias)” cho $b_1,b_2$, “hệ số chặn” cho mô hình tuyến tính, “sai lệch” cho độ lệch khỏi trung bình |
| nhẹ | A04 | “(minibatch)” muộn (A23) | chấp nhận | đã sửa | thêm vào ghi chú A04 (giữ trong bảng thuật ngữ ở ghi chú E05) |
| nhẹ | nhiều trang | thiếu tiếng Anh lần đầu (A24) | chấp nhận | đã sửa | ghi chú: empirical risk (mặt trang A04), expected risk, validation set (A04), activation function (B06), strongly convex (F02), early stopping (F06), step-size schedule (E05), descent lemma (D04), batch size (A04) |
| nghiêm trọng | D04 | gradient $L$-Lipschitz chưa định nghĩa (B1) | chấp nhận | đã sửa | “Nhắc lại:” D04 nêu $\lVert\nabla F(u)-\nabla F(v)\rVert\le L\lVert u-v\rVert$ với mọi $u,v\in C$; ví dụ tách sang D04b |
| nghiêm trọng | F02 | $\mu$-lồi mạnh chưa định nghĩa (B2) | chấp nhận | đã sửa | “tức $F-\tfrac\mu2\lVert\theta\rVert^2$ lồi”; ghi chú thêm dạng $\nabla^2F\succeq\mu I$ |
| trung bình | A03 | bốn khái niệm dùng trước định nghĩa (B3) | chấp nhận | đã sửa | A04 lên trước A03; ô “Đích”: “$F$ chỉ ước lượng $R$”; ô “Biểu diễn”: “không lồi: chỉ chặn được $\lVert\nabla F\rVert$”. 75 → 67 |
| trung bình | A04 | $F$, $R$ không có tên trên mặt trang (B4) | chấp nhận | đã sửa | dòng “$F$: rủi ro thực nghiệm (empirical risk); $R$: rủi ro kỳ vọng (Bài 05).” |
| trung bình | E05, F05b, F06, F06b, G01 | tập xác thực không nhắc lại (B5) | chấp nhận (phương án 1) | đã sửa | A04 thêm “Tập xác thực: mẫu tách riêng, không dùng tính gradient, dùng để ước lượng $R$.” A04 29 → 54, 6 dòng; storyboard F06 ghi nhận |
| trung bình | B05, B06 | đơn vị ẩn, tiền kích hoạt, hàm kích hoạt chỉ ở ghi chú (B6) | chấp nhận | đã sửa | B06 dòng “Ký hiệu:” (32 → 47); B05 “(mỗi hàng của $W_1$ là một đơn vị ẩn)” (26 → 30, dưới 40) |
| trung bình | D01 | điểm yên ngựa dùng trước “Nhắc lại” (B7) | chấp nhận (phương án 1) | đã sửa | D01b đứng trước D01; câu nối trong ghi chú hai trang đổi theo |
| trung bình | D02, D03 | xác định dương, trị riêng không nhắc lại (B8) | chấp nhận | đã sửa | D02 “Nhắc lại: $A$ đối xứng, $A\succ0$ (xác định dương) khi $v^\top Av>0$ mọi $v\ne0$, tức mọi trị riêng dương; $A\succeq0$ khi chúng không âm.” ở cột phải dưới hình (cột trái đã kín khung). 27 → 45 |
| trung bình | B08 | ma trận hoán vị chưa định nghĩa (B9) | chấp nhận | đã sửa | “(mỗi hàng, mỗi cột có đúng một số $1$)”; ghi chú nêu đủ. 44 → 52 |
| trung bình | F07 | $F_\lambda$ dùng trước G01 (B10) | chấp nhận | đã sửa | “với cực tiểu của mục tiêu cộng thêm $\tfrac\lambda2\lVert\theta\rVert^2$”. 44 → 46 |
| trung bình | G01 | hội tụ tuyến tính không nhắc lại (B11) | chấp nhận (nếu ≤ 80) | đã sửa | ô “Sai số giảm theo cấp số nhân (hội tụ tuyến tính), tất định …”; bỏ chữ “nhỏ” ở dòng mở và viết $\limsup_k\mathbb E\lVert\theta_k-\theta^*\rVert^2\le\eta\sigma^2/\mu$ thay “cỡ …” để giữ trần: 74 → 79 |
| ngoài phạm vi | ghi chú G01 | mã “Bài 05 KL04” | chấp nhận | đã sửa | “bảng kết luận của Bài 05” |
| ngoài phạm vi | ghi chú G04 | nhãn “Đáp án 1.” | chấp nhận | đã sửa | “Lời giải: câu 1, …”, “Câu 2–4” |
| ngoài phạm vi | ghi chú F02b, F04b | “Ví dụ A/D của Bài 05b” | chấp nhận | đã sửa | “ví dụ cùng tên của Bài 05b” (ví dụ ba quan sát), “ví dụ bậc bốn của Bài 05b” (tên theo deck 05b) |
| liên bài 1 | ghi chú B02 | “biên” cho margin | áp dụng quyết định chung | đã sửa | “biên có dấu (signed margin, còn gọi là lề có dấu)” |
| liên bài 8 | C01, E02, F05b, G01 (mặt trang); ghi chú B03, C01, F02, F05b, G01, G02, G04 | “cỡ” chỉ độ lớn | áp dụng quyết định chung | đã sửa | “khoảng” cho số cụ thể, “bậc”/“có bậc”/“cùng bậc với” cho bậc độ lớn; 21 chỗ trong deck, cả storyboard, outline, ghi chú bài giảng, bài tập; giữ “cỡ chữ” (cỡ phông) trong outline |
| liên bài 12 | ghi chú A02, E01 | LLO/CLO, RCV1 viết tắt | áp dụng quyết định chung | đã sửa | “chuẩn đầu ra bài học (LLO)”, “chuẩn đầu ra học phần (CLO)”; “RCV1 (Reuters Corpus Volume I, …)” |

Không có mục bị bác bỏ trong `decisions-06.md`.

### Học liệu cùng bài

`materials/lec-06/lecture-note.md` và `exercises.md` đổi cùng thuật ngữ: “cỡ” (22 + 5 chỗ), “nơ ron” → “nơ-ron”, tiêu đề mục 2.3 “Tầng ẩn …”, “sai số dư” → “sai số vượt (excess error)”, “độ lệch” → “độ chệch (bias)” cho $b_1,b_2$ và “sai lệch” cho độ lệch khỏi trung bình, “phép thử (Hessian)” → “phép kiểm tra (bậc hai)”, “tập mức” → “tập mức dưới (sublevel set)”, “Sai số cắt” → “Sai số chặt cụt (truncation error)”, “tổng lồng” → “triệt tiêu liên tiếp”, “rút đều” → “chọn đều”, “chạm” → “rơi vào”/“đạt”, “đạt đáy” → “đạt/giảm tới cực tiểu”. Giữ “độ lệch chuẩn” (standard deviation) và “biên tập”. Chưa chạy `sync-local-materials.py` (điều phối viên chạy một lần cuối).

### Mật độ sau sửa (bộ đếm token có chữ, bỏ tiêu đề, KaTeX, ghi chú)

A01 31 → 30; A03 75 → 67; A04 29 → 54; B05 26 → 30; B06 32 → 47; B08 44 → 52; D00 28 → 30; D02 27 → 45; D03 51 → 53; D04 35 → 24; D04b 32 (mới, 5 dòng); D07b 42 → 45; E02 54 → 58; E05 57 → 60; F02 36 → 38; F06 52 → 54; F07 44 → 46; G01 74 → 79; G02 77 → 76. Các trang khác không đổi mặt trang.

### Kiểm tra

- `deckcheck.py` trên 41 trang đã sửa hoặc thêm: `errors: none`; 7 FLAG `narrow … hover` (A03, B05, B08, E01, E04, G01, G02) đều có sẵn trên bản trước đợt này (chạy lại trên bản sao trước khi sửa cho cùng kết quả), không có FLAG mới.
- Ảnh chụp với chuyển trang tắt (Playwright, 1600×900 và 390×844, cuộn hết vùng `.lecture-viewport` khi có): đáy nội dung mọi trang đã sửa ≤ 675 px logic ở 16:9 (G02 658, F07 634, B08 626, D02 621, B06 616); không `.katex-error`, không tràn ngang trang. Đã xem ảnh A03, A04, B05, B06, B08, D02, D04, D04b, E05, F07, G01, G02 (rộng) và B06, D02, D04 (hẹp).
- Mỗi trang có đúng một mục trong `storyboard.md` và `outline.md`, cùng mã, cùng thứ tự với deck (73/73/73).
- `grep` từ cũ trong deck: “cỡ”, “nơ ron”, “lớp ẩn”, “sai số dư”, “độ lệch”, “lỗi xác thực”, “phép thử”, “Đáp án”, “KL0”, “Ví dụ A/D”, “quét hết”, “chạm”, “tổng lồng”, “sai số cắt”, “rút đều”, “ch. 13”, “đạt đáy”: 0.
- `git diff --check`: sạch.

**Quyết định của điều phối viên (Fable 5.1, 2026-10-12):** chấp nhận. Đã đối chiếu diff mặt trang với decisions-06 và decisions-common; kiểm định nghĩa gradient L-Lipschitz (D04), μ-lồi mạnh (F02), xác định dương qua trị riêng của ma trận đối xứng (D02), cận limsup E‖θ_k−θ*‖² ≤ ησ²/μ (G01) và số liệu trang tách mới D04b (∇F(θ₀) = (−3/8, −3/8), bảo đảm 9/128, F(θ₁) = 0,13905); chấp nhận tách D04b và đảo thứ tự A04/A03, D01b/D01; tự chạy deckcheck trên A03, A04, B06, B08, D02, D04, D04b, F02, G01, G02: 0 lỗi, không tràn ở 16:9, bốn cờ cuộn ngang khổ hẹp là bảng có sẵn; xem ảnh D04, D04b, A04 ở 1600×900. Gói học liệu cục bộ đồng bộ ở commit cuối đợt.

## Đồng bộ ghi chú với rà soát mạch 5 Bài 05 (2026-10-15)

Bài 05 bỏ KL02 (RCV1), KL03a (XOR), KL04, KL04a (bảng mất/còn và bốn bảo đảm) và tách mạch 6 (xem `planning/lec-05/review-log.md`, mục "Rà soát mạch 5, 2026-10-15"). Tác tử chỉnh sửa (general-purpose, opus, effort medium theo brief) chỉ sửa ghi chú diễn giả của deck Bài 06: A04 (bỏ "Bài 05 viết chặn phương sai là $\tau^2$"), A03 (hai giới hạn ở trang cuối mạch 5 Bài 05; XOR chứng minh ở mục 2), B01 (bốn điểm nhãn $\pm1$ dẫn Mệnh đề 05.40 của ghi chú bài giảng Bài 05), B02 (XOR chứng minh tại Bài 06), B03 ($\binom{d_0+q}q$ với $d_0$ biến), E02b (hàng logistic của Bảng 13.3 ở Ví dụ 05.25 của ghi chú bài giảng Bài 05), F06 ("mạch giới hạn của tối ưu tất định" thay "phần kết luận"), G01 (bỏ "cùng cách viết với bảng kết luận của Bài 05" và ánh xạ $\tau^2$). Mặt trang không đổi. Storyboard (B01, E02, F-cụm dừng sớm, G01, G01b) và outline (B01, G01, bảng kết quả dùng lại) thêm ghi chú ngày 2026-10-15 về các mã Bài 05 đã bỏ. `git diff --check` sạch.

Vòng 2 (2026-10-15, yêu cầu của điều phối viên): ghi chú B02 viết lại: định nghĩa là nhắc lại từ phần hồi quy logistic của Bài 05; Mệnh đề 1 ứng với Mệnh đề 05.40 của ghi chú bài giảng Bài 05, deck Bài 05 không chứng minh kết quả này; bỏ câu "Bài 05 không đánh số kết quả này".

Rà soát mạch 4 Bài 05 (2026-10-15): CP05 gộp vào CP04 "Số bước của hạ gradient và Newton" trong deck Bài 05; các dẫn "Bài 05 CP05" trong `outline.md` và `storyboard.md` đổi thành "Bài 05 CP04 (Định lý 4, số bước của Newton)". Deck Bài 06 không đổi.

Rà soát mạch 2 và mạch 3 Bài 05 (2026-10-15): tập xác thực và tập kiểm thử được định nghĩa ở trang HQ05a "Tập xác thực và tập kiểm thử" (HQ05 chỉ còn rủi ro kỳ vọng và quá khớp); các dẫn "Bài 05 HQ05" như nơi định nghĩa tập xác thực trong `outline.md` và `storyboard.md` đổi thành "Bài 05 HQ05a". Deck Bài 06 không đổi.
Rà soát mạch 2 và mạch 3 Bài 05, vòng 2 (2026-10-15): ghi chú F06 của deck Bài 06 đổi dẫn chiếu thành "Bài 05, trang tập xác thực và tập kiểm thử của phần hồi quy nhiều chiều" (trước: "phần rủi ro thực nghiệm và rủi ro kỳ vọng"). Mặt trang Bài 06 không đổi.

## Sửa trang mục tiêu học tập A02 theo yêu cầu người dùng (2026-10-21)

### Tác tử

- Tác tử chỉnh sửa (worker): `general-purpose`, model và effort do master ghi theo lệnh gọi `Agent` (brief yêu cầu Opus 5.5, effort medium); không commit.

### Thay đổi

- **A02, mặt trang:** ba mục tiêu gắn trực tiếp với ba năng lực toán học, mỗi mục mở bằng cụm động từ in đậm (`<b>`; vòng 3 bỏ: mục tiêu của Bài 01–05 là câu thường, và cụm động từ in đậm không phải nhãn trong danh sách của AGENTS.md): (1) chứng minh tính không lồi của rủi ro thực nghiệm của mạng XOR bằng phản ví dụ theo định nghĩa; (2) tính gradient bằng lan truyền ngược, chỉ ra điểm có gradient bằng không nhưng không là cực tiểu địa phương; (3) chọn phương pháp theo chi phí, giả thiết, bảo đảm giữa hạ gradient đầy đủ, Newton, hạ gradient ngẫu nhiên. Mật độ 52 → 66 âm tiết (trần 80), 4 dòng, mỗi dòng ≤ 20 âm tiết (7/20/20/19; vòng 2: 67, 7/20/20/20); mỗi gạch đầu dòng hai dòng hiển thị ở 1600×900.
- **A02, ghi chú diễn giả:** viết lại theo mục tiêu: mạch và bài tập đo từng mục tiêu (mục tiêu 1 ↔ mạch 2, câu 3 bài tập cuối mạch; mục tiêu 2 ↔ mạch 3 và 4, bài tập lan truyền ngược và câu 1–2 bài tập phân loại điểm dừng; mục tiêu 3 ↔ mạch 5, 6, bảng lựa chọn phương pháp và câu 1 của câu hỏi tự kiểm tra); tiêu chí đạt (phản ví dụ = hai cực tiểu đối xứng $\theta_A$, $\theta_B$ có $F=0$, trung điểm, bất đẳng thức lồi bị vi phạm $\tfrac14>0$; điểm yên ngựa tại gốc của $F(u,v)=\tfrac12(uv-1)^2$ với trị riêng Hessian $\pm1$, và trị riêng $0$, $\tfrac{17}4$ tại $(2,\tfrac12)$; lựa chọn phương pháp nêu đủ chi phí, giả thiết, bảo đảm hội tụ). Đối chiếu số liệu: B09b ($F(\theta(\tfrac12))=\tfrac14$), D02 (trị riêng $\pm1$ tại gốc), D07b (trị riêng $0$ và $4{,}25$). Giữ câu LLO/CLO và đoạn kiến thức cần có. Tên tiếng Anh “stochastic gradient descent, SGD” nêu trong ghi chú; mặt trang dùng tên tiếng Việt đầy đủ, chữ viết tắt SGD vẫn giới thiệu ở E01.
- **G03:** mặt trang không đổi; bảng ba dòng vẫn ứng từng dòng với ba mục tiêu. Ghi chú: câu cuối đổi thành “Phần chọn phương pháp của mục tiêu 3, theo chi phí, giả thiết và bảo đảm hội tụ, là bảng lựa chọn phương pháp; ví dụ cho phần ‘gradient bằng không nhưng không là cực tiểu’ của mục tiêu 2 là gốc của mạng tuyến tính một đơn vị.”
- **storyboard.md** (A02: nhu cầu và dòng `sửa` 2026-10-21) và **outline.md** (A02: mặt trang và ghi chú) cập nhật theo deck.

### Ghi nhận, chưa sửa

- `materials/lec-06/lecture-note.md` có sáu mục tiêu chi tiết hơn, cùng phạm vi nhưng khác cách chia (mục 1 ↔ mục tiêu 1; mục 2–3 ↔ mục tiêu 2; mục 4–6 ↔ mục tiêu 3), và bảng ánh xạ bài tập theo sáu mục tiêu. Không sửa học liệu theo brief.
- Ghi chú bài giảng nêu thêm LLO15 (phần so sánh chi phí với Newton); câu LLO/CLO của A02 giữ nguyên (LLO11, LLO12) theo brief. Mục tiêu 3 mới nêu Newton tường minh, nên master cân nhắc thêm LLO15.

### Kiểm tra

- Playwright Chromium, A02 và G03 ở 1600×900 và 390×844: 0 lỗi console, 0 `.katex-error`, A02 không tràn dọc hay ngang, cỡ chữ thân nhỏ nhất 30 px (16:9) và 24 px (hẹp); phím mũi tên hoạt động. G03 ở khổ hẹp có cuộn ngang trong `.table-scroll` như trước (mặt trang không đổi).
- `git diff --check`: sạch.

### Trạng thái

- Chờ master rà soát (chưa có quyết định `chấp nhận | yêu cầu sửa | bác bỏ`).

### Vòng 2: yêu cầu sửa của master (2026-10-21)

- Master: `yêu cầu sửa`, hai điểm. (1) Mục tiêu 3 bỏ danh sách sau dấu hai chấm, thay bằng “**Chọn phương pháp** giữa hạ gradient đầy đủ, Newton, hạ gradient ngẫu nhiên theo chi phí, giả thiết, bảo đảm.” (đếm 20 token, trong trần 20, nên dùng phương án thứ nhất của master). (2) Câu LLO/CLO trong ghi chú thêm “phần so sánh chi phí của LLO15 (phương pháp Newton)” theo dòng 5 của ghi chú bài giảng.
- Mật độ sau sửa: 67 âm tiết (7/20/20/20), 4 dòng. Mục LLO/CLO của A02 trong storyboard.md và outline.md thêm LLO15; mục “Ghi nhận, chưa sửa” về LLO15 ở trên đã được xử lý.
- Kiểm tra lại A02 ở 1600×900 và 390×844; `git diff --check` sạch.
- Trạng thái: chờ master rà soát vòng 2.

### Tác tử của đợt 2026-10-21 (theo lệnh gọi `Agent` của master)

| Vai | Loại | Model | Effort |
|---|---|---|---|
| Tác tử chỉnh sửa (duy nhất ghi tệp) | general-purpose | opus (Claude Opus 5.5) | medium |
| Tái kiểm toán học | general-purpose | opus (Claude Opus 5.5) | high |
| Tái kiểm mạch kể | general-purpose | opus (Claude Opus 5.5) | high |

### Quyết định của master trên A02

- Vòng 1: `yêu cầu sửa` — cách viết mục tiêu 3 (bỏ danh sách sau dấu hai chấm); câu LLO/CLO thêm phần so sánh chi phí của LLO15.
- Vòng 2: `yêu cầu sửa` — theo hai báo cáo tái kiểm (toán học F1–F9, mạch kể 11 phát hiện).

### Phát hiện tái kiểm vòng 2 và cách xử lý (vòng 3)

Hai báo cáo tái kiểm vòng 2 (toán học: general-purpose, opus, effort high; mạch kể: general-purpose, opus, effort high), do master chuyển nguyên nội dung:

| Mã | Mức độ | Trang chiếu | Vấn đề | Trạng thái | Quyết định của master |
|---|---|---|---|---|---|
| F1 (toán học) | nghiêm trọng | A02 (ghi chú) | “$O(1/\sqrt K)$ cho chuẩn gradient” sai với SGD không lồi: cận là cho trung bình kỳ vọng bình phương chuẩn gradient (F04, F04b); với chính chuẩn chỉ có $O(K^{-1/4})$ | đã sửa | chấp nhận |
| F2 (toán học) | trung bình | A02 (ghi chú) | $\tfrac14$ là của ví dụ B09b, không phải của B10 câu 3 ($\tfrac{27}{32}$) | đã sửa | chấp nhận |
| F3 (toán học) | trung bình | A02 (ghi chú) | $(2,\tfrac12)$ là cực tiểu toàn cục mà phép kiểm tra bậc hai không kết luận; tiêu chí đạt thiếu “phân loại bằng giá trị $F$” | đã sửa | chấp nhận |
| F4 (toán học) | trung bình | A02 (ghi chú) | danh sách chi phí và danh sách bảo đảm dùng hai thứ tự phương pháp khác nhau | đã sửa | chấp nhận |
| F5 (toán học) | nhẹ | A02 (ghi chú) | G02 không có cột “giả thiết” | đã sửa | chấp nhận |
| F6 (toán học) | nhẹ | A02 (ghi chú) | Newton cần Hessian Lipschitz | đã sửa | chấp nhận |
| F7 (toán học) | nhẹ | A02 (ghi chú), D07 | D07 câu 1 không phân loại gốc | đã sửa | chấp nhận |
| F8 (toán học) | nhẹ | A02 (ghi chú) | thiếu “một phần” trước LLO11, LLO12 | đã sửa | chấp nhận |
| F9 (toán học) | nhẹ | G03 (ghi chú) | trích mục tiêu 2 không đúng nguyên văn | đã sửa | chấp nhận |
| S1 (mạch kể) | trung bình | A02, D07 | không bài tập nào đo “gradient bằng không nhưng không là cực tiểu”; sửa bằng D07 câu 1 | đã sửa | chấp nhận |
| S2 (mạch kể) | trung bình | A02 (mặt trang, mục tiêu 3) | ranh giới danh sách mơ hồ; “bảo đảm” thiếu “hội tụ” | đã sửa | chấp nhận |
| S3 (mạch kể) | nhẹ | A02 (mục tiêu 1) | “của … của” | đã sửa | chấp nhận |
| S4 (mạch kể) | nhẹ | A02 (mục tiêu 2) | “bằng không nhưng không”; sửa bằng $\nabla F=0$ | đã sửa | chấp nhận |
| S5 (mạch kể) | nhẹ | A02 (mặt trang) | cụm động từ in đậm không phải nhãn của AGENTS.md; đã bỏ | đã sửa | chấp nhận |
| S6 (mạch kể) | nhẹ | A02 (ghi chú) | cột của G02, bình phương chuẩn, “được viết tắt” | đã sửa | chấp nhận |
| S7 (mạch kể) | nhẹ | A02 (ghi chú) | tiêu chí phản ví dụ chặt hơn định nghĩa; $\tfrac{27}{32}$ | đã sửa | chấp nhận |
| S8 (mạch kể) | nhẹ | G04 (lời giải câu 1) | không nêu đủ ba tiêu chí cho từng trường hợp | đã sửa | chấp nhận |
| S9 (mạch kể) | nhẹ | G03 (ghi chú) | thứ tự câu và chữ “là” | đã sửa | chấp nhận |
| S10 (mạch kể) | nhẹ | G00, ghi chú bài giảng mục tiêu 6, dòng CLO4 của outline | cách gọi tiêu chí cũ; G00 đã sửa; ghi chú bài giảng: ghi nhận, chưa sửa | ghi nhận, chưa sửa (ghi chú bài giảng); đã sửa (G00) | chấp nhận |
| S11 (mạch kể) | nhẹ | planning | dòng A02 cũ trong outline/storyboard, thiếu dòng G03 trong storyboard, thiếu bản ghi tác tử | đã sửa | chấp nhận |

Bảng sửa đổi tương ứng (bản ghi theo brief vòng 3, giữ nguyên):

| Nguồn | Nội dung (theo brief) | Trạng thái | Quyết định của master |
|---|---|---|---|
| Toán học | Ghi chú A02: với SGD không lồi, $O(1/\sqrt K)$ là cho trung bình kỳ vọng bình phương chuẩn gradient (F04, F04b); chỉ hạ gradient đầy đủ (D05) có dạng chuẩn | đã sửa | chấp nhận |
| Toán học | Mục tiêu 1: phản ví dụ cần hai điểm vi phạm bất đẳng thức lồi; ở bài này là hai cực tiểu toàn cục đối xứng; $\tfrac14$ là của ví dụ B09b ($\theta_A$, $\theta_B$), câu 3 bài tập cuối mạch 2 cho $\tfrac{27}{32}$ | đã sửa | chấp nhận |
| Toán học | Mục tiêu 2: $(2,\tfrac12)$ là cực tiểu toàn cục ($F=0$) mà phép kiểm tra bậc hai không kết luận; tiêu chí đạt gồm dấu trị riêng và giá trị $F$ khi phép kiểm tra không kết luận | đã sửa | chấp nhận |
| Toán học | Mục tiêu 3: chi phí, giả thiết, bảo đảm nêu theo từng phương pháp cùng một thứ tự; Newton cần lồi mạnh và Hessian Lipschitz; SGD cần chặn phương sai | đã sửa | chấp nhận |
| Toán học / mạch kể | D07 câu 1 chưa đo phần “điểm có $\nabla F=0$ nhưng không là cực tiểu địa phương”: câu 1 thêm yêu cầu chỉ ra điểm đó; D07b dùng $F(t,t)=\tfrac12(t^2-1)^2<\tfrac12=F(0,0)$, không lặp Hessian của D02 | đã sửa | chấp nhận |
| Mạch kể | Mặt trang A02 bỏ in đậm; ba câu theo nguyên văn của master | đã sửa | chấp nhận |
| Mạch kể | Mục tiêu 2 có hai chữ “không” liền nhau (“gradient bằng không nhưng không là”) | đã sửa bằng $\nabla F=0$ | chấp nhận |
| Mạch kể | Ghi chú A02: “ba cột của bảng đó” thay bằng vị trí cụ thể (cột mỗi bước, cột tình huống và chú thích, cột bảo đảm); “được viết tắt từ mạch 5” → “chữ viết tắt SGD dùng từ mạch 5”; “bài tập cuối mạch 2” | đã sửa | chấp nhận |
| Mạch kể | Câu LLO: “một phần LLO11, một phần LLO12 và phần so sánh chi phí của LLO15 (phương pháp Newton)” | đã sửa | chấp nhận |
| Mạch kể | G03 ghi chú: hai câu riêng cho mục tiêu 2 (gốc của mạng tuyến tính một đơn vị, điểm yên ngựa) và mục tiêu 3 (bảng lựa chọn) | đã sửa | chấp nhận |
| Mạch kể | G04 câu 1: lời giải (a)–(c) nêu chi phí một bước, giả thiết, bảo đảm hội tụ; mặt trang không đổi | đã sửa | chấp nhận |
| Mạch kể | G00 dòng dẫn theo tiêu chí mới: “Nhu cầu: chọn phương pháp theo chi phí một bước, giả thiết và bảo đảm hội tụ.” (17 âm tiết); ghi chú G00 đồng bộ | đã sửa | chấp nhận |
| Mạch kể | outline A02: mục “Mặt trang” và “Điểm trung tâm … ba khối” cũ đánh dấu đã thay; Hình “không”; Liên kết A01 → A02b. storyboard A02: “Lý do tồn tại”, “Đầu ra” không còn bản đồ mạch; thêm dòng `sửa` 2026-10-21 cho G00, G03, G04, D07, D07b | đã sửa | chấp nhận |

Mặt trang A02 sau vòng 3: 62 âm tiết (7/18/17/20), 4 dòng. D07: 59 âm tiết, 6 dòng; D07b: 55 âm tiết, 5 dòng (công thức câu 1 tách thành hai khối nội dòng để xuống dòng ở khổ hẹp). Trạng thái: chờ master rà soát vòng 3.

## Tách A04 thành A04 và A04b (2026-10-21)

- Yêu cầu người dùng 2026-10-21: “tách làm hai, trình bày rõ ràng hơn”. Tác tử chỉnh sửa như trên.
- A04 “Ngữ cảnh: dữ liệu, mô hình và rủi ro”: ký hiệu $D$, $f(x;\theta)$; “Lưu ý:” $d$/$p$; công thức $F$ (giữ $\ell_i$ vì E04, E05 dùng $\nabla\ell_i$) và $R=\mathbb E_{(X,Y)\sim P}\ell$, mỗi công thức một dòng diễn giải. 53 âm tiết, 6 dòng, 2 công thức hiển thị.
- A04b “Ngữ cảnh: bài toán huấn luyện và dãy lặp”: câu bài toán huấn luyện; dãy lặp đóng khung bằng KaTeX `\boxed` (lecture-style.css không có lớp công thức trọng tâm cho Bài 06; `.formula.emphasis` chỉ thuộc Bài 04); $g_k$, $\eta_k$; tập xác thực; “Nhu cầu:” dẫn A03. 51 âm tiết, 5 dòng, 1 công thức hiển thị.
- Ngoại lệ: trang Ngữ cảnh 6 và 5 dòng (AGENTS.md: tối đa bốn dòng), lý do ghi trong storyboard.
- Ghi chú: đối chiếu ký hiệu Bài 05/05b/05c và mất mát bình phương ở A04; hai lựa chọn của $g_k$, tập xác thực, quy ước $b$/$\sigma$ ở A04b.
- Số trang 73 → 75 (cùng A03b); outline (quy mô, bảng mạch, tổng, thời lượng mạch A) và storyboard cập nhật.
- Liên kết băm: `grep` `#/` trỏ tới deck Bài 06 trong deck, `index.html`, `materials/`, `planning/`: không có liên kết nào; không cần sửa.
- Trạng thái: chờ master rà soát.

## Sửa A03 theo ngôn ngữ học thuật, tách A03b (2026-10-21)

- Yêu cầu người dùng 2026-10-21: “điều chỉnh, ngôn ngữ học thuật không văn nói”. Tiêu đề: “Giả thiết lồi và hai giới hạn khi mở rộng quy mô”.
- Chọn tách: bảng bốn dòng (khoảng 63 âm tiết) cộng hai dòng giới hạn (40 âm tiết) vượt trần 80 của bảng so sánh. A03 chỉ còn bảng; A03b “Hai giới hạn: biểu diễn và chi phí” giữ nhãn (ii, biểu diễn) và (i, chi phí) mà B00, E01, G01, G01b dùng.
- Ghi chú A03: một đoạn cho mỗi dòng Mục tiêu, Gradient, Bảo đảm, Chi phí; ghi chú A03b: hai giới hạn theo Bài 05, thứ tự xử lý.
- G01: sửa tối thiểu để khớp nhãn dòng mới: ô “Đích là nghiệm chính xác” → “Mục tiêu là nghiệm tối ưu của $F$”, “Đích là $R$ nhỏ” → “Mục tiêu là $R$ nhỏ”; ghi chú nêu thứ tự bốn dòng (mục tiêu, gradient, bảo đảm, chi phí) và đổi “Đích” → “Mục tiêu”. G01b không đổi.
- Lưu ý cho master: ô “thường chỉ điểm dừng xấp xỉ” và “nhóm nhỏ” dùng khái niệm định nghĩa ở D01b và mạch 5, trái với quyết định sau kiểm định 2026-10-12; giữ theo brief.
- Trạng thái: chờ master rà soát.

## B03: nhận xét về đặc trưng thủ công (2026-10-21)

- Yêu cầu người dùng 2026-10-21. Thêm “**Nhận xét.** Đặc trưng thủ công khắc phục giới hạn biểu diễn nhưng làm $p$ tăng nhanh, kéo theo chi phí và nguy cơ quá khớp (overfitting).” (nhãn `<b>Nhận xét.</b>` như B06, C05, F07). Lần đầu “quá khớp” trong deck nên tên tiếng Anh đặt tại đây.
- Ký hiệu theo quy ước A04: $p=\binom{d+q}{q}$ là số đặc trưng; dòng chi phí “Mỗi bước: $O(np)$ (hạ gradient), $O(np^2+p^3)$ (Newton, Bài 05).” (không lặp ý “chi phí tăng” của nhận xét).
- Dòng ví dụ $\varphi(x)=(x_1,x_2,x_1x_2)$ chuyển xuống ghi chú để giữ trần 60. Mật độ 60 âm tiết, 4 dòng chữ và một bảng, vừa khung 1600×900. Ngoại lệ: câu nhận xét 26 âm tiết, hai dòng hiển thị.
- Ghi chú thêm đoạn hai loại chi phí (tính toán, thống kê theo Bài 05).
- Trạng thái: chờ master rà soát.

## B04: tiêu đề học thuật (2026-10-21)

- Yêu cầu người dùng 2026-10-21: “Tầng ẩn như một phép biến đổi đặc trưng” (“như một” sao phỏng “as a”) → “Phép biến đổi đặc trưng bằng tầng ẩn”. Đổi ở deck, storyboard, outline và mục 2.3 của `materials/lec-06/lecture-note.md`; các chỗ dẫn “Mục 2.3” dẫn theo số nên không đổi; không có liên kết neo theo tiêu đề cũ. Chạy `sync-local-materials.py` và `--check`: OK.
- Mặt trang và ghi chú B04 không còn “như một”. Ngoài B04, deck còn một chỗ “như một” ở ghi chú E05 (“tốn tổng $O(np)$, như một bước hạ gradient đầy đủ”): đây là phép so sánh “bằng một bước”, không phải sao phỏng “as a”; không sửa.
- Trạng thái: chờ master rà soát.

## Quyết định của master vòng 3 và sửa vòng 4 (2026-10-21)

- Master, vòng 3: `chấp nhận` A02, A04, A04b, A03 (tách được chấp nhận vì bảng cộng hai giới hạn vượt trần), B04, D07/D07b, G00, G01, G03, G04. `yêu cầu sửa` bốn điểm: A03b, nhận xét B03, ghi chú G01b, bảng phát hiện trong review-log.
- **A03b:** theo bản phác của người dùng: “Nhắc lại: với $F$ lồi, khả vi trên $\mathbb R^p$, điểm dừng là cực tiểu toàn cục:”; công thức hiển thị $\nabla F(\theta^*)=0\Longrightarrow\theta^*\in\arg\min_{\theta\in\mathbb R^p}F(\theta)$; “Giới hạn (ii), biểu diễn: khi $F$ không lồi, kéo theo này không còn đúng.”; “Giới hạn (i), chi phí: một bước hạ gradient trên $n$ mẫu tốn $O(nd)$ với mô hình tuyến tính, $O(np)$ với mạng.” Khác bản phác: (1) “là cực tiểu toàn cục” không đặt trong `\text{}` của KaTeX vì chữ Việt gây sáu cảnh báo KaTeX (“Unrecognized Unicode character”, “No character metrics”); cụm này chuyển lên dòng “Nhắc lại:” và công thức viết bằng $\arg\min$; (2) bỏ “toàn bộ” và “$p$ tham số” để dòng chi phí ≤ 20 âm tiết (19); ghi chú nêu “mạng” là mạng $p$ tham số. Nhãn “Giới hạn (i)”, “Giới hạn (ii)” khớp ghi chú A03b và E01. Ghi chú: “suy luận” → “kéo theo”. 47 âm tiết, 4 dòng, 1 công thức hiển thị.
- **B03:** nhận xét thành “… nhưng làm $p$ tăng nhanh, tăng chi phí và nguy cơ quá khớp (overfitting).” Đếm lại: 59 âm tiết (trần 60).
- **G01b:** ghi chú, câu cuối: quy tắc chọn theo chi phí một bước, giả thiết và bảo đảm hội tụ; $n$, $p$ quyết định chi phí một bước, tính lồi là giả thiết.
- **review-log:** bảng phát hiện F1–F9, S1–S11 thay đoạn ghi chú chung; bảng sửa đổi cũ giữ nguyên.
- Kiểm tra: Playwright A03b, B03, G01b ở 1600×900 và 390×844 (cuộn `.lecture-viewport` tới cuối): 0 lỗi, 0 cảnh báo console, 0 `.katex-error`, không tràn ngang trang, cỡ chữ nhỏ nhất 30 px / 24 px; công thức A03b ở khổ hẹp cuộn ngang trong vùng `.formula`. `git diff --check` sạch.
- Trạng thái: chờ master rà soát vòng 4.

## Vòng 5: tái kiểm lần hai (2026-10-21)

- Master: `chấp nhận` vòng 4.
- Tác tử tái kiểm (theo lệnh gọi `Agent` của master): tái kiểm toán học vòng 2 (general-purpose, opus, effort high); tái kiểm mạch kể vòng 2 (general-purpose, opus, effort high). Tác tử chỉnh sửa: general-purpose, opus, effort medium. Mức độ của từng phát hiện nằm trong báo cáo gốc; master chuyển nội dung và số hiệu (T1–T14 theo thứ tự bảng của báo cáo mạch kể).

| Mã | Trang chiếu | Vấn đề | Trạng thái | Quyết định của master |
|---|---|---|---|---|
| N1 (toán học, vòng 2) | G04 (lời giải câu 1b) | bảo đảm $O(1/k)$ của Định lý 05b.39 cần $\mu$-lồi mạnh, gradient nhóm không chệch, chặn $\mathbb E[\lVert\widehat g_k\rVert^2\mid\theta_k]\le G^2$ trên vùng chứa dãy lặp và đúng bước $\tfrac1{\mu(k+1)}$; không dùng chặn phương sai hay gradient Lipschitz; với $\lambda,k_0$: chỉ đúng khi $\lambda=\mu$, $k_0=1$ | đã sửa | chấp nhận |
| N2 (toán học, vòng 2) | A02 (ghi chú, mục tiêu 3) | giả thiết của SGD: lồi mạnh cần chặn mômen bậc hai và bước $\tfrac1{\mu(k+1)}$; không lồi cần gradient Lipschitz, chặn phương sai, bước hằng chọn theo $K$ | đã sửa (đoạn 3: 173 → 159 âm tiết) | chấp nhận |
| N3 (toán học, vòng 2) | A03b | giới hạn (ii) là đặc trưng cố định không biểu diễn được XOR; tính không lồi là hệ quả của cách khắc phục | đã sửa | chấp nhận |
| N4 (toán học, vòng 2) | G04 (lời giải câu 1c) | $O(1/\sqrt K)$ là cho bước hằng chọn theo $K$ (Hệ quả 05b.44); lịch bước, dừng sớm là thực hành; thiếu “gradient nhóm không chệch” | đã sửa | chấp nhận |
| N5 (toán học, vòng 2) | A04 (ghi chú) | câu mất mát logistic: phản ví dụ trung điểm vẫn dùng được dù không có cực tiểu khi không chính quy hóa | đã sửa | chấp nhận |
| N6 (toán học, vòng 2) | B03 | $\binom{d+q}{q}$ đếm cả đơn thức hằng $1$, nên là số tham số tính cả hệ số chặn | đã sửa (mặt trang “Số tham số”, quy ước đếm trong ghi chú và storyboard) | chấp nhận |
| T1 (mạch kể, vòng 2) | A03b | dòng (ii) gán tính không lồi là giới hạn biểu diễn | đã sửa (gộp với N3) | chấp nhận |
| T2 (mạch kể, vòng 2) | A03 | đổi tiêu đề hoặc thứ tự A03/A03b | không sửa | bác bỏ: tiêu đề và bố cục theo thiết kế của người dùng |
| T3 (mạch kể, vòng 2) | G01 | vượt trần 80 | đã sửa (80 âm tiết; dòng dẫn giữ) | chấp nhận |
| T4 (mạch kể, vòng 2) | D01b (ghi chú) | khái niệm điểm dừng xấp xỉ không mới; dạng $\varepsilon$ mới | đã sửa; ô A03 “thường chỉ điểm dừng xấp xỉ” giữ theo người dùng | chấp nhận |
| T5 (mạch kể, vòng 2) | A03 | “(nhóm nhỏ)” lặp hai lần trong bảng | không sửa | bác bỏ: cách viết bảng của người dùng |
| T6 (mạch kể, vòng 2) | A03b (ghi chú) | thiếu lý do nêu (ii) trước (i) | đã sửa | chấp nhận |
| T7 (mạch kể, vòng 2) | A03 (ghi chú) | thiếu câu chuyển sang A03b | đã sửa | chấp nhận |
| T8 (mạch kể, vòng 2) | A04 / F02 | $D$ trùng nghĩa: dữ liệu ở A04, khoảng cách $\lVert\theta_0-\theta^*\rVert$ | đã sửa (vòng 6): A04 bỏ “$D=$”, viết “dữ liệu $\{(x_i,y_i)\}_{i=1}^n$”; F02 giữ $D$. Đính chính: báo cáo vòng 5 của tác tử chỉnh sửa ghi sai “F02 không có $D$”; mặt trang F02 có $D=\lVert\theta_0-\theta^*\rVert$ và cận chứa $D^2$ (lệnh `grep` khi đó không bắt mẫu `{D=`); $D$, $D_k$ cũng có ở ghi chú bài giảng Bài 06 và Bài 05b | chấp nhận (quyết định của master vòng 6) |
| T9 (mạch kể, vòng 2) | A04 | dòng $R$ thiếu tên tiếng Anh | đã sửa (55 âm tiết) | chấp nhận |
| T10 (mạch kể, vòng 2) | A04b | dòng 1 văn kể | đã sửa | chấp nhận |
| T11 (mạch kể, vòng 2) | B03 | hai dấu hai chấm ở dòng đầu | đã sửa | chấp nhận |
| T12 (mạch kể, vòng 2) | G03 (ghi chú) | trích mục tiêu 2 không đúng nguyên văn | đã sửa | chấp nhận |
| T13 (mạch kể, vòng 2) | planning | dòng cũ ở outline A04, A03; vào/ra của storyboard A04; tiêu chí cũ ở dòng G bảng mạch, G00 “Đầu ra”, dòng CLO4 §2; thời lượng A02; liên kết A03 ↔ A03b | đã sửa; mục tiêu 6 của ghi chú bài giảng: ghi nhận, chưa sửa | chấp nhận |
| T14 (mạch kể, vòng 2) | A02 (ghi chú, mục tiêu 3) | độ dài đoạn 3 (khuyến nghị 40–150 âm tiết) | rút 173 → 161 âm tiết sau vòng 6, vẫn trên khuyến nghị; giữ vì cần đủ tiêu chí (nhẹ) | chấp nhận |

Mật độ sau vòng 5: A03b 60 (5 dòng, 1 công thức hiển thị); A04 55 (6 dòng, 2 công thức); A04b 49 (5 dòng, 1 công thức); B03 59; G01 80. Khác brief ở A03b: bỏ “trên $\mathbb R^p$”, “điều này”, “không còn được bảo đảm” → “mất bảo đảm”, dòng chi phí viết chung $O(np)$, để giữ trần 60 (bản theo đúng brief: khoảng 72 âm tiết). B03: “kể cả hằng số $1$” làm mặt trang 63 âm tiết nên chuyển xuống ghi chú, như brief cho phép.

Trạng thái: chờ master rà soát vòng 5.

## Vòng 6: tái kiểm vòng 3 và sửa cuối (2026-10-21)

- Master: `chấp nhận` vòng 5, trừ các điểm dưới đây.
- Tái kiểm vòng 3 (theo master): toán học 1 phát hiện `trung bình` và 3 `nhẹ`; mạch kể 4 `nhẹ`. Master chuyển nội dung dưới dạng các điểm sửa của vòng 6; bảng ghi theo các điểm đó, không theo nguyên văn từng mã.

| Nguồn | Trang chiếu | Vấn đề | Trạng thái | Quyết định của master |
|---|---|---|---|---|
| Toán học (1 trung bình, 3 nhẹ) và mạch kể (4 nhẹ), gộp theo brief vòng 6 | A03b | giới hạn (ii) phải nói về đầu vào gốc: B03 cho thấy đặc trưng thủ công biểu diễn được XOR; tính không lồi đến từ mô hình phi tuyến theo $\theta$ | đã sửa | chấp nhận |
| như trên | G01 | “Mục tiêu:” lặp ở ô phải; ô bước hằng thiếu điều kiện $\eta\le1/L$ | đã sửa | chấp nhận |
| như trên | B03 (ghi chú) | “số đặc trưng là $p=501\,501$” không theo quy ước $p$ là số tham số | đã sửa (cả câu chi phí thống kê) | chấp nhận |
| như trên | A02 (ghi chú) | “cho $O(1/\sqrt K)$ cho trung bình …” | đã sửa: “cho cận $O(1/\sqrt K)$ đối với trung bình …” | chấp nhận |
| như trên | A04 / F02 | đính chính T8; A04 bỏ tên $D$ | đã sửa | chấp nhận |

- Mật độ: A03b 56 (5 dòng, mỗi dòng ≤ 20, 1 công thức hiển thị); A04 55; G01 78; B03 59.
- Trạng thái: chờ master rà soát vòng 6.

### Quyết định của master vòng 6 và nghiệm thu đợt 2026-10-21 (A02, A04/A04b, A03/A03b, B03, B04)

- Vòng 6: `chấp nhận`. Master tự kiểm tra bằng Playwright Chromium (1600×900 và 390×844) trên A02, A04, A04b, A03, A03b, B03, B04, D01b, D07, D07b, G00, G01, G01b, G03, G04: 75 trang, 0 lỗi hay cảnh báo console, 0 `.katex-error`, không tràn ngang; xem ảnh chụp A03b, G01. `git diff --check` sạch; `sync-local-materials.py --check` đạt.
- Ghi nhận, chưa sửa: G03 cao 683/675 px ở 16:9 (mặt trang không đổi trong đợt này, có từ trước); xử lý khi người dùng rà tới G03. Sáu mục tiêu của `lecture-note.md` chưa đồng bộ với ba mục tiêu mới của A02.

## Vòng 7: tiêu đề E02 (2026-10-22)

- Yêu cầu người dùng 2026-10-22: đổi tiêu đề E02 thành “Ước lượng Rủi ro kì vọng bằng Rủi ro thực nghiệm”; master chuẩn hóa thành “Ước lượng rủi ro kỳ vọng bằng rủi ro thực nghiệm” (chữ thường, “kỳ” theo chính tả của deck).
- Tác tử (theo lệnh gọi `Agent` của master):

| Vai | Mã tác tử | Loại | Model | Effort | Kết quả |
|---|---|---|---|---|---|
| Tác tử chỉnh sửa | `ae2473aa8fba08f3b` | general-purpose | opus | medium | các sửa dưới đây |
| Tái kiểm toán học | `aadb8dcf7d8cb7e47` | general-purpose | opus | high | không có phát hiện |
| Tái kiểm mạch kể | `af9ad99875b2e8cb7` | general-purpose | opus | high | 2 phát hiện `nhẹ` (U1, U2) |
- Sửa:
  - deck: `<h2>` của E02; mặt trang và ghi chú không đổi, ghi chú giữ “đại lượng thay thế (surrogate)”;
  - deck: từ khóa E00 “đại lượng thay thế” → “ước lượng rủi ro kỳ vọng”;
  - storyboard: tiêu đề mục E02, dòng `sửa` 2026-10-22 ở E02 và E00;
  - outline: tiêu đề mục E02 và dòng `sửa` 2026-10-22; câu lịch sử ở mục 1 thêm “đổi 2026-10-22 thành …”;
  - `materials/lec-06/lecture-note.md`: tiêu đề mục 5.2; thân mục không đổi (đoạn dẫn “… bản thân $F$ chỉ là ước lượng của $R$” vẫn khớp tiêu đề mới); chạy `sync-local-materials.py` và `--check`.
- Kiểm tra: `git diff --check` sạch.
- Phát hiện tái kiểm mạch kể:

| Mã | Mức độ | Trang chiếu | Vấn đề | Trạng thái | Quyết định của master |
|---|---|---|---|---|---|
| U1 | nhẹ | E00 (ghi chú) | “tính chất thay thế của $F$” còn dùng cách gọi cũ sau khi E02 đổi tiêu đề | đã sửa: “Việc $F$ chỉ ước lượng $R$, tại $\theta$ cố định với sai lệch bậc $1/\sqrt n$, giải thích vì sao không cần cực tiểu hóa $F$ chính xác.” | chấp nhận |
| U2 | nhẹ | G01 (mặt trang, ghi chú) | “$F$ chỉ thay thế cho $R$” còn dùng cách gọi cũ | đã sửa: “$F$ chỉ ước lượng $R$” ở ô phải và ghi chú; 77 âm tiết (trần 80) | chấp nhận |

- Quyết định của master: sửa tiêu đề E02 `chấp nhận`; U1, U2 `chấp nhận`, đã sửa như trên.

## Vòng 8: chứng minh bất đẳng thức một bước, trang F01c (2026-10-22)

- Yêu cầu người dùng 2026-10-22, trang F01b “Bất đẳng thức một bước có số hạng nhiễu”: “Thêm gợi ý chứng minh”, kèm bản phác bốn bước (bổ đề giảm, kỳ vọng có điều kiện, tách $\mathbb E\lVert\widehat g\rVert^2$, thế vào).
- Quyết định bố cục của master: chứng minh đặt ở trang mới F01c “Chứng minh: bất đẳng thức một bước có số hạng nhiễu”, ngay sau F01b. Lý do: CLAUDE.md đặt chứng minh dài hơn một dòng trên trang “Chứng minh: <kết quả>”; thêm bốn dòng vào F01b sẽ vượt trần 3 công thức hiển thị, 6 dòng và khung 675 px.
- Tác tử chỉnh sửa: `ae2473aa8fba08f3b`, general-purpose, opus, medium; không commit.
- Sửa:
  - deck: thêm F01c theo thứ tự bản phác, với hai chỉnh của master: bước 1 gọi là “cận trên bậc hai” (thuật ngữ đã chốt ở D04: bổ đề giảm là hệ quả cho gradient đầy đủ); điều kiện viết “$\mid\theta_k$” như F01b, gradient nhóm $\widehat g_k$ như E05. 25 âm tiết, 6 dòng, 3 công thức hiển thị (dòng cuối là bất đẳng thức đóng khung); 605/675 px ở 1600×900;
  - deck: ghi chú F01b bỏ phần kể lại chứng minh, giữ phép kiểm tra số; mặt trang F01b không đổi;
  - storyboard: mục F01c mới, dòng `sửa` 2026-10-22 ở F01b, bản đồ hành trình KN8 thêm F01c, số trang 75 → 76;
  - outline: dòng F01c trong bảng trang, mục F01c, số trang 76 (F 17), tổng 76; thời lượng F01b 0,02 → 0,01, F01c 0,01 (tổng mạch F không đổi).
- Ghi chú bài giảng: chứng minh Mệnh đề 06.29 (`materials/lec-06/lecture-note.md`) dùng đúng ba bước và đúng thuật ngữ (“cận trên bậc hai cho từng lần chọn”, kỳ vọng có điều kiện, tách phương sai rồi dùng H6b, ghép). Khác biệt duy nhất là ký hiệu điều kiện: ghi chú viết $\mid\mathcal F_k$, deck viết $\mid\theta_k$ như F01b; không phải lệch thuật ngữ nên không sửa học liệu.
- Kiểm tra: `git diff --check` sạch; Playwright F01b, F01c ở 1600×900 và 390×844: 0 lỗi, 0 cảnh báo console, 0 `.katex-error`; vừa khung ở 16:9; ở khổ hẹp các công thức cuộn ngang trong vùng `.formula`.
- Tái kiểm vòng 8 (theo lệnh gọi `Agent` của master): toán học `aadb8dcf7d8cb7e47` (general-purpose, opus, high): 1 phát hiện `nhẹ` (M1); mạch kể `af9ad99875b2e8cb7` (general-purpose, opus, high): 5 phát hiện `nhẹ` (S1–S5) kèm bảng kiểm toán tập trung mạch 6. Tác tử chỉnh sửa không nhận bảng kiểm toán mạch 6 qua brief; master chép bảng vào đây từ báo cáo gốc.

| Mã | Mức độ | Trang chiếu | Vấn đề | Trạng thái | Quyết định của master |
|---|---|---|---|---|---|
| M1 (toán học) | nhẹ | F01b (ghi chú) | ánh xạ giả thiết → số hạng sai: tính trơn không chỉ cho hệ số $1-\tfrac{L\eta}2$, tính không chệch bị bỏ sót | đã sửa (gộp với S3) | chấp nhận |
| S1 (mạch kể) | nhẹ | F01c | “số hạng chéo” dùng cho hai đại lượng | đã sửa: mặt trang gọi tên $-\eta\nabla F(\theta_k)^\top\widehat g_k$; “số hạng chéo” chỉ dùng cho phép tách | chấp nhận |
| S2 (mạch kể) | nhẹ | F01c | nguồn của cận trên bậc hai chưa nêu | đã sửa trong ghi chú (Bổ đề 04.18; dạng tổng quát đứng sau bổ đề giảm ở D04); mặt trang không đổi; storyboard “Đầu vào” sửa theo | chấp nhận |
| S3 (mạch kể) | nhẹ | F01b (ghi chú) | câu về vị trí trang, câu chỉ trang sau, liên hệ cộng theo $k$ trùng F01c | đã sửa | chấp nhận |
| S4 (mạch kể) | nhẹ | F02 | “gradient nhóm như trên” không còn chỉ đúng trang sau khi chèn F01c | đã sửa theo cách viết của master: “gradient nhóm không chệch, phương sai không quá $\sigma^2$” (bản trung gian “như ở bất đẳng thức một bước” làm dòng định lý 21 âm tiết, vượt trần 20); 42 âm tiết, dòng định lý 20 âm tiết | chấp nhận |
| S5 (mạch kể) | nhẹ | F01 | thiếu dòng “Nhu cầu:” (có từ trước) | không sửa | hoãn: chuyển master và người dùng quyết định |

- Bảng kiểm toán tập trung mạch 6 (báo cáo `af9ad99875b2e8cb7`, master chuyển):

| Trang | Chức năng | Phần trả lời | Đầu vào | Đầu ra | Đề xuất |
|---|---|---|---|---|---|
| F00 | tiêu đề mạch | câu hỏi | đầu ra mạch 5 | — | giữ |
| F01 | nhiễu tại nghiệm (ví dụ, trực quan) | vì sao cận cần số hạng nhiễu | dữ liệu bốn điểm, $\operatorname{tr}\Sigma$ | $\tfrac{69}{128}>\tfrac12$ | giữ; thiếu "Nhu cầu:" (S5, hoãn) |
| F01b | bất đẳng thức một bước | cơ chế sai số | giả thiết từ mạch 5 | số hạng nhiễu $\tfrac{L\eta^2}2\sigma^2$ | giữ |
| F01c | chứng minh F01b | giả thiết dùng ở đâu | F01b, cận trên bậc hai | cùng bất đẳng thức | giữ (S1, S2) |
| F02 | định lý mức nhiễu nền, bước hằng | cận sai số (lồi mạnh) | giả thiết F01b | $\eta\sigma^2/\mu$ | giữ (S4) |
| F02b | ví dụ ba quan sát | cận so với giá trị chính xác | F02 | 0,140 so với 0,267 | giữ |
| F03 | bước giảm dần | cận $O(1/k)$ | F02 | tốc độ | giữ |
| F04 | định lý không lồi | cận chuẩn gradient | F01b/F01c | cận chuẩn gradient | giữ |
| F04b | hệ quả chọn $\eta$ theo $K$ | $O(1/\sqrt K)$ | F04 | quy tắc bước | giữ |
| F05, F05b | so sánh cùng ngân sách | GD đầy đủ so với nhóm nhỏ | F04b | ngưỡng ngân sách | giữ |
| F06, F06b | dừng sớm theo tập xác thực | khi nào dừng | F05b | thuật toán | giữ |
| F07, F07b | dừng sớm và chính quy hóa $\ell_2$ | ý nghĩa của dừng | F06b | tỉ số giữ lại | giữ |
| F08, F08b | bài tập và lời giải | kiểm tra đích của mạch | F01–F07 | — | giữ |

Kết luận kiểm toán: câu hỏi trung tâm (chặn sai số của SGD sau $K$ bước và chọn thời điểm dừng) có ở lời dẫn F00; không có phát hiện nghiêm trọng hay trung bình.
- Mật độ sau sửa: F01b 34; F01c 22 (6 dòng, 3 công thức hiển thị); F02 42.
- Quyết định của master: F01c `chấp nhận` sau các sửa trên; M1, S1–S4 `chấp nhận`; S5 `hoãn`.

## Vòng 9: bỏ F02, F02b, F03 (2026-10-22)

- Yêu cầu người dùng 2026-10-22: “bỏ từ slide Mức nhiễu nền của bước hằng đến slide Bước giảm dần cho hàm lồi mạnh vì hàm lồi không quan trọng ở đây nữa.” Deck 76 → 73 trang, mạch 6 từ 17 xuống 14 trang; SGD chỉ còn bảo đảm không lồi (F04, F04b).
- Tác tử chỉnh sửa: `ae2473aa8fba08f3b`, general-purpose, opus, medium; không commit.
- Quyết định của master và cách thực hiện:
  1. Xóa ba `<section>` F02, F02b, F03.
  2. F00: từ khóa “Bất đẳng thức một bước · cận không lồi · ngân sách cố định · dừng sớm”; ghi chú nêu bất đẳng thức một bước và chứng minh, định lý không lồi của Bài 05b, so sánh ngân sách và dừng sớm.
  3. F04, F04b: không có “như trên” hay dẫn ngược tới F02; không sửa.
  4. F08, F08b: tiêu đề “Bài tập: bất đẳng thức một bước, cận không lồi và dừng sớm” (một dòng ở 1600×900); câu 1 mới về điều kiện $\eta<\tfrac23$; lời giải 1 trên F08b; ghi chú: gợi ý và phép biến đổi $\tfrac\eta2(\tfrac{3\eta}2-1)$ thay phần ví dụ ba quan sát. Câu 2, 3 giữ.
  5. G01: ô gradient nhóm chỉ còn bất đẳng thức một bước với số hạng nhiễu; ghi chú đoạn 2 bỏ Định lý 05b.39, 05b.36, mức nhiễu nền. 76 âm tiết.
  6. G02: bỏ dòng SGD lồi mạnh; chú thích “dòng 3–4”; ghi chú đánh số lại, bỏ câu Định lý 05b.39. Dòng Newton và hạ gradient đầy đủ giữ “lồi mạnh”.
  7. Câu hỏi “Nêu khi nào bước hằng hợp lý dù có mức nhiễu nền.” nằm ở G04 (trang “Câu hỏi tự kiểm tra và tài liệu đọc”), không ở G03 như brief ghi; đã thay ở G04 bằng “Nêu giới hạn của cận không lồi khi $K\to\infty$ với $\eta$ cố định và cách chọn $\eta$ theo $K$.”, lời giải trong ghi chú. G04 cao 474 px; G03 (bảng tổng kết) chỉ sửa ghi chú, vẫn 683 px như trước.
  8. G04 lời giải câu 1(b): chuyển sang bảo đảm không lồi (Hệ quả 05b.44) với đủ giả thiết, thêm $F-F^*\le\lVert\nabla F\rVert^2/(2\mu)$ cho mục tiêu lồi mạnh. Mặt trang G04 không dùng bảo đảm lồi mạnh.
  9. Ghi chú khác: A02 (mục tiêu 3 chỉ nêu bảo đảm không lồi), A03 (dẫn thẳng Định lý 05b.39), E02b (dẫn thẳng Định lý 05b.39), E05 (“Định lý hội tụ không lồi ở phần tốc độ hội tụ dưới nhiễu”). F05, F05b, G01b không dẫn tới ba trang đã bỏ; đoạn so bậc lồi mạnh của Sra, Nowozin và Wright ở F05b giữ vì dẫn nguồn ngoài, và lời giải G04 câu 1(b) dùng nó.
  10. Hình `img/lec-06/vda-sgd-bound-vs-exact.svg`: deck không còn dùng; `materials/lec-06/lecture-note.md` vẫn dẫn (một chỗ). Deck và ghi chú Bài 05b dùng bản `img/lec-05b/`. Không xóa tệp.
  11. Planning: storyboard và outline chuyển ba mục vào “Trang đã bỏ (2026-10-22)” với quyết định `bỏ`; số trang 73; dòng mạch F; luận đề bỏ T5, T6; bản đồ hành trình KN8; dòng `sửa 2026-10-22` trên A02, A03, E02b, E05, F00, F08, F08b, G01, G02, G03, G04; thời lượng của ba trang (0,06 LT + 0,01 BT) trừ đi, không phân bổ lại (mạch F 0,24 + 0,12; tổng 1,94 + 0,99). Thứ tự mục của storyboard và outline khớp 73 trang của deck.
- Ghi chú bài giảng `materials/lec-06/lecture-note.md` không đổi: các mục lồi mạnh giữ làm nội dung giáo trình (quyết định của master).
- Kiểm tra: `grep` toàn deck các mẫu “nhiễu nền”, “giảm dần”, “05b.36”, “05b.39”, “ba quan sát”, “8/57”, “0,267”, “\mu(k+1)”, “như trên”: chỉ còn A03 và E02b dẫn thẳng “Định lý 05b.39” của Bài 05b, E02b nói “bước giảm dần cho hàm lồi mạnh của Định lý 05b.39”, và “như trên” ở ghi chú D03 (không liên quan). Playwright: 73 trang; F00, F01c, F04, F04b, F08, F08b, G01, G02, G03, G04 ở 1600×900 và 390×844: 0 lỗi, 0 cảnh báo, 0 `.katex-error`, vừa khung 16:9 (G03 683 px như trước). `git diff --check` sạch.
- Tái kiểm vòng 9 (theo lệnh gọi `Agent` của master): toán học `aadb8dcf7d8cb7e47` (general-purpose, opus, high); mạch kể `af9ad99875b2e8cb7` (general-purpose, opus, high).

| Mã | Mức độ | Trang chiếu / tệp | Vấn đề | Trạng thái | Quyết định của master |
|---|---|---|---|---|---|
| M9-1 = S9-1 | trung bình | G02 dòng 3; G04 câu 1(b) | dòng 3 của bảng lựa chọn chỉ ghi “không lồi”, không có trường hợp cho logistic lồi mạnh, $n$ lớn ở G04 1(b) | đã sửa: ô “Tình huống” thành “$n$ lớn (lồi hoặc không lồi)”; ghi chú G02 thêm $F-F^*\le\lVert\nabla F\rVert^2/(2\mu)$ cho mục tiêu $\mu$-lồi mạnh; chú thích giữ “dòng 3–4 cần $F$ trơn” | chấp nhận |
| S9-2 | trung bình | `materials/lec-06/exercises.md` | Bài 9 câu 1 (ví dụ ba quan sát) và Bài 11 câu 4 (mức nhiễu nền) lệch deck | đã sửa (chi tiết dưới) | chấp nhận |
| M9-2, S9-3 | nhẹ | G01 (ghi chú) | $F_\lambda$ dùng trước khi định nghĩa; “không còn lồi mạnh (ii)” lẫn hai trường hợp | đã sửa: định nghĩa $F_\lambda=F+\tfrac\lambda2\lVert\theta\rVert^2$ ở lần đầu; “… và cũng mất khi mục tiêu không lồi (ii), hoặc lồi nhưng không lồi mạnh” | chấp nhận |
| M9-3 | nhẹ | A03 (ghi chú) | dẫn Định lý 05b.39 không nêu lịch bước | đã sửa: “(Định lý 05b.39, bước giảm dần $\tfrac1{\mu(k+1)}$)” | chấp nhận |
| M9-4, S9-4 | nhẹ | F00 (ghi chú) | “phương sai $\operatorname{tr}\Sigma/b$” chỉ đúng khi chọn có hoàn lại; mạch làm chủ ngữ | đã sửa: “phương sai không quá $\operatorname{tr}\Sigma/b$ (bằng khi chọn có hoàn lại)”; “Bất đẳng thức một bước và chứng minh của nó dẫn tới định lý hội tụ cho hàm không lồi của Bài 05b, phát biểu lại với ký hiệu chung; …” | chấp nhận |
| S9-5 | nhẹ | outline, dòng LLO12 | phạm vi và bằng chứng cũ | đã sửa: “Một phần: không có momentum, Nesterov; lịch bước chỉ có bước hằng chọn theo $K$ (F04b)”, bằng chứng “E03–E06, F01–F05b”. Mục tiêu 5 của ghi chú bài giảng rộng hơn deck có chủ ý (theo quyết định giữ ghi chú) | chấp nhận |
| S9-6 | nhẹ | G04 câu 4 | câu hỏi dạng nhớ lại | không sửa | bác bỏ: G04 là câu hỏi tự kiểm tra, dạng nhớ lại là đúng chủ đích; F08 câu 2 đã luyện áp dụng hệ quả chọn bước |
| S9-7 | nhẹ | storyboard luận đề | “lập luận đại lượng thay thế (E02)” không khớp tiêu đề mới của E02 | đã sửa: “ước lượng rủi ro kỳ vọng bằng rủi ro thực nghiệm (E02)” trong storyboard và ba chỗ cùng cụm của outline (mục 1, mục 2, mục E02) | chấp nhận |

- `materials/lec-06/exercises.md` (S9-2):
  - đoạn mở: bỏ câu ghi Định lý 06.31, 06.32 (SGD lồi mạnh) “như trên trang chiếu”; thêm Mệnh đề 06.29 (bất đẳng thức một bước); nêu hai định lý lồi mạnh chỉ có trong ghi chú bài giảng, bộ bài tập không dùng;
  - Bài 9: tiêu đề “Bất đẳng thức một bước, cận không lồi và dừng sớm”; câu 1 thay bằng câu 1 mới của F08 (Mệnh đề 06.29, $\eta<\tfrac23$); gợi ý câu 1 mới; lời giải câu 1 có đủ phép biến đổi và nhận xét về $\eta\ge\tfrac23$; dòng **Kiểm tra** thay bằng phép thử $\eta=\tfrac12$ ($-\tfrac1{16}$) và $\eta=1$ ($\tfrac14$). Đã bỏ: ví dụ ba quan sát, công thức $0{,}81^k+\tfrac8{57}(1-0{,}81^k)$, $\tfrac8{3k}$ (Ví dụ 06.23), cận $0{,}9^k+0{,}267$ của Định lý 06.31, giới hạn $\tfrac8{57}$ và mức nhiễu nền;
  - Bài 11: câu 4 và gợi ý, lời giải câu 4 thay bằng câu 4 mới của G04 (giới hạn $L\eta\sigma^2$, Hệ quả 06.35, $O(1/\sqrt K)$); lời giải 1(b) chuyển từ Định lý 06.32 sang Hệ quả 06.35 cùng giả thiết và $F-F^*\le\lVert\nabla F\rVert^2/(2\mu)$, khớp ghi chú G04. Đã bỏ: mức nhiễu nền, Nhận xét 06.23, so sánh Bottou–Bousquet ở câu 4;
  - sau sửa, câu hỏi G04 khớp Bài 11 và lời giải khớp; câu “Lời giải chi tiết nằm trong bài tập của Bài 06” ở ghi chú G04 và khẳng định trong storyboard G04 đúng. `grep` “ba quan sát”, “nhiễu nền”, “8}{57”, “06.31”, “06.32” trong `exercises.md`: chỉ còn câu ở đoạn mở nói hai định lý lồi mạnh không dùng;
  - chạy `sync-local-materials.py` và `--check`: OK.
- Bảng kiểm toán tập trung mạch 6 (báo cáo `af9ad99875b2e8cb7`, sau khi bỏ F02, F02b, F03):

| Trang | Chức năng | Phần trả lời | Đầu vào | Đầu ra | Đề xuất |
|---|---|---|---|---|---|
| F00 | tiêu đề mạch | câu hỏi | đầu ra mạch 5 | — | giữ |
| F01 | nhiễu tại nghiệm (ví dụ, trực quan) | vì sao cận cần số hạng nhiễu | dữ liệu bốn điểm, $\operatorname{tr}\Sigma$ | $\tfrac{69}{128}>\tfrac12$ | giữ; thiếu "Nhu cầu:" (S5, hoãn) |
| F01b | bất đẳng thức một bước | cơ chế sai số | giả thiết từ mạch 5 | số hạng nhiễu $\tfrac{L\eta^2}2\sigma^2$ | giữ |
| F01c | chứng minh F01b | giả thiết dùng ở đâu | F01b, cận trên bậc hai | cùng bất đẳng thức | giữ |
| F04 | định lý không lồi | cận chuẩn gradient | F01b/F01c | cận chuẩn gradient | giữ |
| F04b | hệ quả chọn $\eta$ theo $K$ | $O(1/\sqrt K)$ | F04 | quy tắc bước | giữ |
| F05, F05b | so sánh cùng ngân sách | GD đầy đủ so với nhóm nhỏ | F04b | ngưỡng ngân sách | giữ |
| F06, F06b | dừng sớm theo tập xác thực | khi nào dừng | F05b | thuật toán | giữ |
| F07, F07b | dừng sớm và chính quy hóa $\ell_2$ | ý nghĩa của dừng | F06b | tỉ số giữ lại | giữ |
| F08, F08b | bài tập và lời giải | kiểm tra đích của mạch | F01–F07 | — | giữ |

- Bảng kiểm toán tập trung mạch 7:

| Trang | Chức năng | Phần trả lời |
|---|---|---|
| G00 | tiêu đề mạch | câu hỏi |
| G01, G01b | điều mất và điều giữ | giả thiết và bảo đảm |
| G02 | bảng lựa chọn | câu trả lời |
| G03 | tổng kết theo mục tiêu | khép lại |
| G04 | tự kiểm tra và tài liệu | đo mục tiêu 3 |

Kết luận kiểm toán: không có phát hiện `nghiêm trọng`; phát hiện `trung bình` duy nhất ở mặt trang là S9-1, đã sửa.

- Quyết định của master: chấp nhận sau các sửa trên; S9-6 bác bỏ.

## Vòng 10: tiêu đề F07 (2026-10-22)

- Yêu cầu người dùng 2026-10-22: trang F07 “Ví dụ: tỉ lệ giữ của dừng sớm và chính quy hóa $\ell_2$” đổi tiêu đề thành “Dừng sớm so với chính quy hóa” (đúng nguyên văn; không có $\ell_2$ và tiền tố “Ví dụ:”).
- Tác tử chỉnh sửa: `ae2473aa8fba08f3b`, general-purpose, opus, medium; không commit.
- Sửa: `<h2>` của F07 trong deck; tiêu đề mục F07 và dòng `sửa 2026-10-22` trong storyboard (ghi rõ trang vẫn là trang ví dụ về chức năng, kết bằng “Diễn giải:”) và outline. Không mục nào khác, kể cả bản đồ hành trình, dẫn tiêu đề cũ. Ghi chú bài giảng và bài tập không có tiêu đề chép tiêu đề cũ của trang.
- Kiểm tra: `git diff --check` sạch; Playwright F07 ở 1600×900.
- Quyết định của master: (chờ).

## Vòng 11: tái kiểm toán học và mạch kể sau vòng 9–10 (2026-10-22)

- Tác tử: tái kiểm toán học `a7589d9c0ff72402d` (general-purpose, opus, high); tái kiểm mạch kể `a848c33854f70c8e8` (general-purpose, opus, high); tác tử chỉnh sửa `ae2473aa8fba08f3b` (general-purpose, opus, medium), không commit. Nội dung phát hiện ghi theo brief của master; mức độ ghi theo brief, các ô không có mức trong brief ghi “nhẹ” theo master.

| Mã | Mức độ | Trang chiếu / tệp | Vấn đề | Trạng thái | Quyết định của master |
|---|---|---|---|---|---|
| M11-1 = S11-7 | trung bình | `exercises.md` Bài 11 | gợi ý dẫn bảng Mục 7.2 (có dòng SGD lồi mạnh) nhưng lời giải không dùng | đã sửa (phương án 2): lời giải 1(b) thêm “Cách khác: … Định lý 06.32, dòng 3 của bảng ở Mục 7.2; trang chiếu không trình bày định lý này”; đoạn mở: “chỉ dùng Định lý 06.32 như cách khác ở Bài 11” | chấp nhận |
| M11-2 | nhẹ | G02, G04 (ghi chú); Bài 11 1(b) | $F-F^*\le\lVert\nabla F\rVert^2/(2\mu)$ thiếu nguồn | đã sửa: “(Bổ đề 05b.8(b))”; ở bài tập thêm “tức Mệnh đề 04.25(b)” (ghi chú Bài 06 không phát biểu lại) | chấp nhận |
| M11-3 = S11-15 | nhẹ | F08b (ghi chú câu 1) | câu về $F$ giảm trên một lần chạy không đúng điều cận nói | đã sửa: “Khi đó $\mathbb E[F(\theta_{k+1})\mid\theta_k]$ vẫn có thể nhỏ hơn $F(\theta_k)$, vì bất đẳng thức chỉ là một cận trên.” | chấp nhận |
| M11-4 | nhẹ | G04 (ghi chú 1(b)); Bài 11 1(b) | so bậc Bottou–Bousquet thiếu phạm vi | đã sửa: “(so bậc cho SGD trên hàm lồi mạnh)” | chấp nhận |
| M11-5 | nhẹ | F00 (dòng dẫn) | “chặn sai số” không khớp bảo đảm có được (chuẩn gradient) | đã sửa: “Muốn chặn chuẩn gradient của hạ gradient ngẫu nhiên sau $K$ bước và chọn thời điểm dừng.”; câu hỏi trung tâm mạch 6 trong bảng mạch storyboard, bảng mạch outline và dòng nhu cầu mạch F của outline sửa theo | chấp nhận |
| M11-6 = S11-8 | nhẹ | `exercises.md` Bài 9 câu 1 | trùng dữ kiện F08 | đã sửa: $\lVert\nabla F\rVert^2=1$, $\Delta=\eta(\eta-1)$, đáp án $\eta<1$; kiểm tra $\eta=\tfrac12\to-\tfrac14$, $\eta=2\to2$; câu kết theo M11-3 | chấp nhận |
| S11-1 | trung bình | F07b | tiêu đề F07b gần trùng tiêu đề mới của F07 | đã sửa: “Tương ứng giữa số bước dừng và hệ số chính quy hóa”, khớp nhận xét $\lambda\approx1/(\eta k)$ và lưu ý $k\leftrightarrow1/(\eta\lambda)$ | chấp nhận |
| S11-2 | nhẹ | F07 | thiếu nhãn ví dụ sau khi bỏ “Ví dụ:” ở tiêu đề | đã sửa: “<b>Ví dụ.</b> Tính hai tỉ lệ …” | chấp nhận |
| S11-3 | nhẹ | F07 | “Diễn giải:” không nối với câu hỏi của mạch | đã sửa: “với $\alpha=0{,}01$, dừng sau $20$ bước co như $\lambda=0{,}1$; chọn $k$ đóng vai chọn $\lambda$” (rút gọn từ câu của master để trang còn 671/675 px; bản đầy đủ cho 712 px) | chấp nhận |
| S11-4 | nhẹ | F06b, F07b (ghi chú) | còn gọi F07 là “ví dụ tỉ lệ giữ” | đã sửa | chấp nhận |
| S11-5 | nhẹ | F04 | dòng chứng minh thiếu bước $1-\tfrac{L\eta}2\ge\tfrac12$; ghi chú “không chứng minh lại” | đã sửa; F04 60 âm tiết, 569 px | chấp nhận |
| S11-6 | nhẹ | F08 câu 3 | trùng hàng giữa của F07 | đã sửa: $k=10$; đáp án $1-0{,}95^{10}\approx0{,}40126$ và $0{,}5$ | chấp nhận |
| S11-9 | trung bình | storyboard, outline | tham chiếu cũ tới F02, F03, T5, T6, Ví dụ A, G03, F08c, kiểm tổng, hình SVG | đã sửa (chi tiết dưới) | chấp nhận |
| S11-10 | nhẹ | vòng 10 | chưa kiểm khổ hẹp | không sửa ở đây | master tự chạy |
| S11-11 | nhẹ | A02 (ghi chú) | câu đo mục tiêu 3 gộp hai loại bài tập | đã sửa | chấp nhận |
| S11-12 | nhẹ | G04 câu 4 | “giới hạn của cận” mơ hồ | đã sửa: “Nêu giá trị giới hạn của vế phải cận không lồi …”; Bài 11 câu 4 đổi theo | chấp nhận |
| S11-13 | nhẹ | F00 (ghi chú) | “hai cận” không có chỗ dựa | đã sửa | chấp nhận |
| S11-14 | nhẹ | F01 | thiếu “Nhu cầu:” (đóng S5 của vòng 8) | đã sửa; F01 41 âm tiết, 6 dòng, 452 px | chấp nhận |
| M11-7 | nhẹ | F08b (ghi chú câu 3) | “Tương ứng của trang trước” chỉ sai trang: ba điều kiện nằm ở F07b, không ở trang ngay trước | đã sửa: “Tương ứng giữa số bước dừng và hệ số chính quy hóa cần …” | chấp nhận |
| M11-8 = S11-17 | nhẹ | `exercises.md` Bài 9 lời giải 1 | hai câu liền nhau cùng mở bằng “Khi $\eta\ge1$,” | đã sửa: câu thứ hai mở bằng “Dù vậy,”; đồng bộ, `--check` OK | chấp nhận |
| S11-16 | nhẹ | F07 (“Diễn giải:”) | “co như” không chính xác | đã sửa: “giữ gần như” | chấp nhận |
| S11-18 | nhẹ | storyboard F07 | “Bước hành trình” còn ghi hình thức và ứng dụng đã chuyển sang F07b | đã sửa: “KN9 ví dụ dẫn nhập (nhận xét và phạm vi ở F07b).” | chấp nhận |

- S11-9, chi tiết: storyboard khung (5) “T5 (F02), T6 (F03)” → F01b, F01c, T8 (F04, F04b), giữ dấu vết “đã thay 2026-10-22”; storyboard F08 (Nhu cầu, Đầu ra), F08b (Nhu cầu, Đầu ra, dữ kiện của Quyết định), F07 (Đầu vào, Đầu ra: hình và nhận xét thuộc F07b); outline §1.1 “(T5, T6, T8)” → “(T8; T5, T6 đã thay 2026-10-22)”; §8.6 tiêu đề “E01, F04–F05b, G04”, gạch “Ví dụ A của 05b” ghi không còn trên deck, “G03, câu hỏi 1” → G04; §8.7 “(F07, F07b, F08 câu 3)”; §5 Kiểm tổng tính lại 1,94 / 0,99 với F = 0,24 / 0,12, B3 = 0,93; §9: hình `vda-sgd-bound-vs-exact.svg` không còn dùng trên deck, ghi chú bài giảng vẫn dùng.
- Đính chính vòng 9: mục 11 của vòng 9 viết “luận đề bỏ T5, T6” như áp dụng cho cả storyboard và outline; thực tế vòng 9 chỉ sửa luận đề của storyboard, còn mục 1.1 của outline vẫn ghi “(T5, T6, T8)” đến vòng 11.
- `exercises.md`: đồng bộ bằng `sync-local-materials.py`; `--check` OK.
- Kiểm tra: `git diff --check` sạch; Playwright F00, F01, F04, F07, F07b, F08, F08b, G02, G04 ở 1600×900 và 390×844: 0 lỗi, 0 cảnh báo console, 0 `.katex-error`; chiều cao ở 1600: F00 564, F01 452, F04 569, F07 671, F07b 493, F08 371, F08b 384, G02 609, G04 514 (khung 675).
- Kiểm toán tập trung mạch 6: đạt (S5 đóng nhờ S11-14).
- Quyết định của master: Vòng 9–11 `chấp nhận`; S9-6 bác bỏ.
