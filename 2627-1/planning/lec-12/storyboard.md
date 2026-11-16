# Storyboard bộ trang chiếu Bài 12 — Học máy, rủi ro thống kê và khả năng tổng quát hóa

Storyboard dựng ngày 2026-11-16 theo `deck-build/common-brief.md` (NT1–NT28) và `deck-build/brief-storyboard.md`. Nguồn nội dung duy nhất: `materials/lec-12/lecture-note.md` (gọi tắt "ghi chú"; số dòng trong storyboard là số dòng của tệp này) và `materials/lec-12/exercises.md`. Bản đồ mạch cũ của ghi chú giữ nguyên văn ở cuối tệp, mục "Phụ lục: bản đồ mạch của ghi chú". Mật độ đếm bằng script (`scratchpad/lec-12/storyboard/count.py`, cùng quy tắc với `deck_lint.py`: token cách nhau bởi khoảng trắng, bỏ KaTeX, bỏ số trong ô bảng, số trong câu có tính).

## 1. Tệp deck và tiêu đề

- **Tệp:** `2627-1/lecture-12-hoc-may-rui-ro-thong-ke-tong-quat-hoa.html`, `<html lang="vi" data-lecture="12">`.
- **Tiêu đề deck (`h1`, `<title>`):** "Học máy, rủi ro thống kê và khả năng tổng quát hóa"; `<title>`: "Bài 12: Học máy, rủi ro thống kê và khả năng tổng quát hóa".
- **Chân trang:** `Cơ sở toán học cho AI · Học kỳ 1, 2026–2027 · Bài 12`.
- **Liên kết trình xem:** `material-viewer.html?doc=materials/lec-12/lecture-note.md&deck=lecture-12-hoc-may-rui-ro-thong-ke-tong-quat-hoa.html`, tương tự cho `exercises.md`.
- **Số trang:** 60 trang (7 mạch), 120 phút. Vượt khoảng 45–55 của NT27, bằng trần 60; lý do ở mục 12, điểm Q1 (trang thứ 60 là bài tập cụm entropy chéo, thêm theo cổng duyệt T9).

## 2. Khung lý thuyết chung

- **Câu hỏi trung tâm** (đúng câu in đậm của ghi chú, dòng 3; dùng cho hộp "Vấn đề trung tâm"): **Tại sao một mô hình có thể khớp hoàn hảo dữ liệu huấn luyện nhưng dự đoán sai trên dữ liệu mới?**
- **Luận điểm bìa** (một câu, có điều kiện): "Khớp hoàn hảo tập huấn luyện cho rủi ro nhỏ trên dữ liệu mới, với xác suất cao, khi lớp giả thuyết đủ hẹp so với cỡ mẫu và dữ liệu mới cùng phân phối với tập huấn luyện." Cơ sở: §11 đoạn cuối (dòng 1542: "khi lớp giả thuyết quá linh hoạt so với cỡ mẫu") và giả thiết (G1); hai điều kiện ứng với hai giới hạn mà §9.4 (dòng 1295) nêu; "với xác suất cao" là loại bảo đảm của Định lý 12.13 và 12.20 (theo việc lấy tập huấn luyện).
- **Đối tượng và ký hiệu chung** (theo §1–2 của ghi chú): $\mathcal X$, $\mathcal Y$; phân phối đích $P$ của $(X,Y)$; tập huấn luyện $S\sim P^n$; quan sát mới $(X,Y)\sim P$; lớp giả thuyết $\mathcal H$, $h:\mathcal X\to\mathcal A$; mất mát $\ell(a,y)\ge0$; quy tắc học $S\mapsto\hat h_S$; $R(h)$, $\hat R_S(h)$, $R_{\mathcal H}^*$, $R^*$; $\Delta_S$; $\eta$, $\eta_S$; $\varepsilon$, $\delta$; $M$, $d_{\mathrm{VC}}$; $m_\theta(x)$ (trung bình có điều kiện, với nhãn nhị phân là $\mathbb P_\theta(Y=1\mid X=x)$, theo Q14); $A$ ma trận thiết kế, $\phi(x)$, $\operatorname{sigm}$; $h_t$, $\mathcal H_\uparrow$, $\mathcal H_{\mathrm{aff}}$, $\mathcal H_{\mathrm c}$, $\mathcal H_{\mathrm{all}}$; $\log$ tự nhiên; dấu thập phân là dấu phẩy (`0{,}15`).
- **Giả thiết** (nhãn của ghi chú, dòng 115–124): (G1) lấy mẫu i.i.d., quan sát mới cùng phân phối, độc lập với $S$; (G2) mất mát trong $[0,1]$; (G3) lớp chọn trước khi xem $S$; (E1) nhiễu Gaussian với $\sigma^2$ đã biết; (E2) nghiệm ERM gần đúng mức $\eta$. Deck nêu (G1)–(G3) ở L12-2-02, (E1) ở L12-3-03, (E2) ở L12-5-06.
- **Chuỗi định nghĩa → kết quả → phương pháp:**
  1. Định nghĩa 12.1 (hợp lý có điều kiện) → Mệnh đề 12.2 (mất mát bình phương) → Mệnh đề 12.3 (tập nghiệm, hạng);
  2. Định nghĩa 12.5 (Bernoulli có điều kiện, logistic) → Mệnh đề 12.6 (entropy chéo) → Nhận xét 12.7 (không có nghiệm hữu hạn khi tách được);
  3. Định nghĩa 12.8 (hai loại rủi ro, rủi ro Bayes) → Định nghĩa 12.10 (ERM, ERM gần đúng) → Mệnh đề 12.11 (rủi ro và tập nghiệm ERM của lớp ngưỡng);
  4. Định nghĩa 12.12 (độ lệch đều) → Định lý 12.13 (hội tụ đều cho lớp hữu hạn) → Bổ đề 12.14 → Hệ quả 12.15 (rủi ro dư của ERM) → Mệnh đề 12.16 (ba nguồn sai số);
  5. Định nghĩa 12.17 (học PAC) → Định nghĩa 12.18 (phá vỡ, số chiều VC) → Định lý 12.19 (số chiều VC của hai lớp ngưỡng) → Định lý 12.20 (đọc thêm: hội tụ đều theo số chiều VC) → Tình huống 12.1, 12.2.
- **Giới hạn áp dụng** (§9.4, dòng 1295): các cận của §7 cần mất mát bị chặn, không áp dụng trực tiếp cho mất mát bình phương hay entropy chéo; mọi bảo đảm cần (G1); Định lý 12.20 có hằng số $c_0$ không xác định, chỉ cho bậc phụ thuộc; lý thuyết VC chỉ làm trên đầu vào một chiều (chỉ đạo của người dùng, `outline.md`).

## 3. Bảng mạch

| Số | Tên mạch (cụm danh từ) | Mục ghi chú | Câu hỏi của mạch và phân rã | ID tiêu đề | Trang | Thời lượng |
|---|---|---|---|---|---|---|
| 1 | Mở đầu | đoạn mở đầu, Mục tiêu, Kiến thức tiên quyết | (vấn đề trung tâm của bài) | L12-1-01 (bìa, `id="mach-1"`) | 5 | 7 phút |
| 2 | Bài toán học có giám sát | Câu hỏi mở đầu, §1–3 | Cần những đối tượng nào để so sánh ba bộ phân loại trên sản phẩm mới? = phân phối, mẫu, quan sát mới + lớp, mất mát, quy tắc học + giả thiết | L12-2-00 | 4 | 7 phút |
| 3 | Mất mát từ hợp lý có điều kiện | §4–5 | Mất mát huấn luyện suy ra từ mô hình xác suất nào, và nghiệm của nó tồn tại, duy nhất khi nào? = nguồn gốc mất mát + tính duy nhất + sự tồn tại | L12-3-00 | 13 | 27 phút |
| 4 | Rủi ro kỳ vọng và tối thiểu hóa rủi ro thực nghiệm | §6 | Đại lượng nào đo sai số trên quan sát mới, và hàm chọn bằng rủi ro thực nghiệm nhỏ nhất có rủi ro đó nhỏ không? | L12-4-00 | 8 | 18,5 phút |
| 5 | Hội tụ đều và rủi ro dư | §7 | Khi nào hai rủi ro của hàm chọn từ mẫu gần nhau, và rủi ro dư của ERM bị chặn bao nhiêu? = độ lệch đều + cận lớp hữu hạn + rủi ro dư + ba nguồn sai số | L12-5-00 | 11 | 27 phút |
| 6 | Học gần đúng với xác suất cao và số chiều VC | §8–9 | Lớp vô hạn được bảo đảm thế nào? = độ chính xác/độ tin cậy + số chiều VC thay cho $M$ + giới hạn (G1) | L12-6-00 | 10 | 22 phút |
| 7 | Tổng kết | §9.4, §10–12 | (trả lời câu hỏi trung tâm cho cả bài) | L12-7-00 | 9 | 11,5 phút |
| | | | | | **60** | **120 phút** |

Chi tiết từng mạch (chức năng, đầu vào, đầu ra, dòng dẫn, từ khóa):

- **Mạch 1, Mở đầu.** Chức năng: đặt câu hỏi trung tâm, nhắc lại kết quả bài trước. Đầu vào: Bài 11 (Mệnh đề 11.3, Định lý 11.4), Mệnh đề 05.3, Hệ quả 10.7, Định lý 05c.47. Đầu ra: câu hỏi trung tâm trong một hộp. Không có trang tiêu đề mạch (bìa là tiêu đề).
- **Mạch 2, Bài toán học có giám sát.** Chức năng: khung chung và ví dụ xuyên suốt. Đầu vào: câu hỏi trung tâm. Đầu ra: $P$, $S$, $\mathcal H$, $\ell$, (G1)–(G3), ba lớp lồng nhau của ví dụ cảm biến. Dòng dẫn (18 âm tiết): "Quy tắc học chọn hàm dự đoán từ mẫu; chất lượng của hàm đo trên quan sát mới." Từ khóa: phân phối đích · lớp giả thuyết · mất mát · quy tắc học.
- **Mạch 3, Mất mát từ hợp lý có điều kiện.** Chức năng: suy ra hai mất mát huấn luyện và xét nghiệm. Đầu vào: Mệnh đề 11.3, Định lý 11.4, phương trình chuẩn. Đầu ra: (4.3), (5.1), hai hiện tượng "giá trị khớp duy nhất, dự đoán mới không duy nhất" và "khớp hoàn hảo làm hợp lý cực đại vô nghiệm". Dòng dẫn (16): "Mỗi mất mát huấn luyện là âm log-hợp lý của một mô hình cho đầu ra." Từ khóa: hồi quy Gaussian · phương trình chuẩn · mô hình logistic · entropy chéo.
- **Mạch 4, Rủi ro kỳ vọng và tối thiểu hóa rủi ro thực nghiệm.** Chức năng: đại lượng cho dữ liệu mới, quy tắc ERM, rủi ro chính xác trên ví dụ. Đầu vào: (4.3), (5.1) là trung bình trên mẫu. Đầu ra: $R$, $\hat R_S$, ERM, (6.6)–(6.7), hiện tượng khoảng cách tổng quát hóa $\tfrac12$. Dòng dẫn (24): "Sai số trên quan sát mới là một kỳ vọng theo phân phối, còn mẫu chỉ cho trung bình trên dữ liệu đã thấy." Từ khóa: rủi ro kỳ vọng · rủi ro thực nghiệm · rủi ro Bayes · lớp ngưỡng.
- **Mạch 5, Hội tụ đều và rủi ro dư.** Chức năng: kiểm soát đồng thời, cận rủi ro dư, phân rã. Đầu vào: (7.1) cho hàm cố định, hiện tượng của mạch 4. Đầu ra: (7.4)–(7.8), $\Delta_S=0;\ 0{,}15;\ 1$ trên ba lớp, giới hạn $M<\infty$. Dòng dẫn (22): "Khi mọi hàm của lớp có hai rủi ro gần nhau, hàm chọn từ mẫu cũng có hai rủi ro gần nhau." Từ khóa: độ lệch đều · lớp hữu hạn · rủi ro dư · ba nguồn sai số.
- **Mạch 6, Học gần đúng với xác suất cao và số chiều VC.** Chức năng: tách $\varepsilon$, $\delta$; đo độ phức tạp lớp vô hạn; giới hạn (G1). Đầu vào: dạng "xác suất $1-\delta$, sai số $\varepsilon$" của Hệ quả 12.15, lớp ngưỡng vô hạn. Đầu ra: (8.1)–(8.5), hai tình huống áp dụng. Dòng dẫn (23): "Số chiều VC đo độ linh hoạt của một lớp vô hạn bằng số điểm lớn nhất mà lớp gán được mọi nhãn." Từ khóa: độ chính xác · độ tin cậy · phá vỡ tập điểm · số chiều VC · dữ liệu triển khai.
- **Mạch 7, Tổng kết.** Chức năng: NT15. Đầu vào: mọi kết quả. Đầu ra: bảng, câu trả lời, bài tập. Dòng dẫn (18): "Mỗi bảo đảm của bài đúng dưới các giả thiết cụ thể về mẫu, mất mát và lớp." Từ khóa: giả thiết không được bỏ · ba nguồn sai số · bài tập.

Năm dòng dẫn mạch 2–6 có năm dạng câu khác nhau (mệnh đề ghép; định nghĩa "là"; đối chiếu "còn"; điều kiện "Khi …"; định nghĩa "đo … bằng"); không câu nào mở bằng "Muốn", "Nhu cầu:" hay "Người học".

Câu nối trên mặt trang giữa các mạch: L12-3-01 nêu "mất mát suy ra từ mô hình xác suất … quyết định nghiệm có tồn tại"; L12-4-02 nêu "hai mục tiêu huấn luyện quy về rủi ro thực nghiệm"; L12-5-01 nêu vì sao (7.1) không áp dụng cho $\hat h_S$; L12-5-06 nêu "độ lệch đều so mỗi hàm với chính nó; rủi ro dư so hàm chọn với hàm tốt nhất"; L12-3-07 nêu "nhãn 0, 1 … cần xác suất lỗi … thay cho mật độ Gaussian"; L12-6-01 nêu câu hỏi của mạch 6 và "Hệ quả 12.15 có hai mức"; L12-6-03 nêu "$\mathcal H_\uparrow$ vô hạn, nên $M$ trong (7.5) không dùng được"; L12-7-02 trả lời câu hỏi trung tâm.

## 4. Bảng kết quả chính

Kỹ thuật được kiểm bằng `grep` trên `2627-1/lecture-*.html` (Bài 00–11) và ghi chú Bài 10–11, 05c: "bất đẳng thức hợp" có ở deck 10 (Hệ quả 10.7); "Hoeffding" không có ở deck nào, chỉ ở ghi chú 05c (deck 05c không tồn tại); "phương trình chuẩn" và lập luận hạt nhân $\ker$ có ở deck 00, 01, 05; "lấy âm log giữ tập nghiệm" có ở deck 11 (HL07, Mệnh đề 11.3).

| Kết quả | (a) Trực quan | (b) Ý tưởng chứng minh: bước, mẹo, chỗ dùng giả thiết, bỏ giả thiết | (c) Kỹ thuật | (d) Ví dụ bổ trợ | (e) Ứng dụng AI |
|---|---|---|---|---|---|
| Mệnh đề 12.2 | đầu vào dời vị trí phân phối đầu ra, nhiễu dao động quanh (L12-3-02) | 3 bước (Nhắc lại đứng đầu trang): mật độ → tích và âm log → $c_1+c_2Q$ ở công thức hiển thị; (E1) ở bước 3 ($c_2>0$ không phụ thuộc $\theta$); bỏ (E1) khi SSE $=0$ → hợp lý không bị chặn (Nhận xét 12.4) (L12-3-04) | âm log giữ tập nghiệm: Nhắc lại (deck 11) | ba số đo (Nhắc lại kết quả Ví dụ 12.2); Bài tập 12.1 câu 4 | mất mát bình phương trung bình của mạng sâu (§9.3) |
| Mệnh đề 12.3 | phần dư vuông góc các cột của $A$ (ghi chú diễn giả) | một dòng "Chứng minh.": $J(\hat w+v)=J(\hat w)+\lVert Av\rVert^2$ vì $A^\top r=0$ (L12-3-05) | khai triển quanh nghiệm: Nhắc lại (deck 01, Hệ quả 01.5) | Ví dụ 12.3 hạng thiếu (L12-3-06) | thêm đặc trưng vượt hạng dữ liệu làm hệ số không duy nhất (dòng "Trong học máy" trên L12-3-06) |
| Mệnh đề 12.6 | sigmoid ép điểm số vào $(0,1)$ (L12-3-07) | 4 bước; giả thiết $m_\theta\in(0,1)$ ở bước 2 (log hữu hạn); hai tập nghiệm có thể rỗng (L12-3-09) | số mũ $y\in\{0,1\}$ chọn nhân tử: Nhắc lại (deck 11) | Ví dụ 12.5 + (5.2) + Nhận xét 12.7 (L12-3-10); Bài tập 12.2 câu 3 (L12-3-12); Ví dụ 12.4 trong ghi chú diễn giả | chính quy hóa $\lambda\lVert w\rVert^2$ (dòng "Trong học máy" trên L12-3-10) |
| Mệnh đề 12.11 | $h_t$ sai trên đoạn giữa $t$ và $0$, xác suất tỉ lệ độ dài (L12-4-04) | 4 bước: tích phân → điểm âm → điểm không âm → khoảng khác rỗng (giả thiết mẫu có hai loại điểm); bỏ giả thiết thì $x_-$ không xác định (L12-4-05) | — | Ví dụ 12.8, Hình 12.1 (L12-4-06); Bài tập 12.3 | quy tắc phá hòa giữa các nghiệm ERM không thêm thông tin (dòng "Trong học máy" trên L12-4-06) |
| Định lý 12.13 | lớp nhiều hàm → nhiều cơ hội có rủi ro thực nghiệm thấp do ngẫu nhiên (L12-5-01) | 4 bước: biến cố xấu → (7.1) cho từng $h$ (G3) → bất đẳng thức hợp → giải theo $\varepsilon$; bỏ (G3) thì lớp chọn sau khi xem $S$ có thể chứa $\tilde h$, $\Delta_S=1$ (L12-5-04) | Hoeffding: Nhắc lại (ghi chú 05c); bất đẳng thức hợp: Nhắc lại (deck 10); ghép "cận một hàm + bất đẳng thức hợp": mới, một dòng "Kỹ thuật." | Ví dụ 12.9 (L12-5-02), Ví dụ 12.10 (L12-5-05) | chọn siêu tham số trên lưới hữu hạn, giá $\log M$ (§9.3) |
| Hệ quả 12.15 (Bổ đề 12.14 là công cụ) | "Trực quan." trên L12-5-06: độ lệch đều so mỗi hàm với chính nó, rủi ro dư so hàm chọn với hàm tốt nhất | 4 bước: biến cố $G$ → chuỗi bốn bất đẳng thức của Bổ đề 12.14 với $\varepsilon=\varepsilon_n$ ((E2) ở bất đẳng thức thứ hai) → lấy inf được (7.7) → giải cỡ mẫu (L12-5-07) | "chèn một đại lượng trung gian rồi chuyển vế" và "so với phần tử bất kỳ rồi lấy cận dưới đúng": mới, một dòng "Kỹ thuật." (tên dùng chung với deck 13, Q8) | $n=1000$, $M=100$: $0{,}129$ (L12-5-06) | tách phần tối ưu $\eta$ khỏi phần lấy mẫu $2\varepsilon_n$ |
| Mệnh đề 12.16 | "Trực quan." trên L12-5-08: ba số hạng ứng với lớp, dữ liệu và bộ tối ưu | chứng minh một câu ở ghi chú diễn giả L12-5-08: Bổ đề 12.14 với $\varepsilon=\Delta_S$, $\eta=\eta_S$ | — | Ví dụ 12.11 (L12-5-09); Bài tập 12.17 | lý do thống kê để hạn chế lớp (§9.3) |
| Định lý 12.19 | lớp gán tùy ý nhãn lên nhiều điểm khớp nhiều cách giải thích (L12-6-04) | 4 bước, phép kéo theo của bước 2 ở công thức hiển thị: phá vỡ 1 điểm → thiếu 10 → phá vỡ 2 điểm với $c=\frac{x_1+x_2}2$ → thiếu 101 theo dấu $w$ (L12-6-06) | thứ tự trên trục thực: mới, một dòng "Kỹ thuật." | Ví dụ 12.12, Hình 12.2 (L12-6-03); Bài tập 12.11 | ngưỡng logistic một đặc trưng, độ dốc dương hay hai dấu |
| Định lý 12.20 (đọc thêm) | — | không có trang ý tưởng chứng minh: ghi chú ghi "nằm ngoài phạm vi học phần" (dòng 1228); ghi chú diễn giả nêu ý chung (đa thức bậc $d$ + tập trung xác suất) | — | Tình huống 12.1 (L12-6-08) | chọn lớp ngưỡng thay lớp mọi hàm |

**Kết quả phụ, quyết định:**

- Định nghĩa 12.12 phần (7.3) (tính hội tụ đều): nêu đủ ở câu "Nói riêng" của L12-5-03 (cổng duyệt T1) và ở ghi chú diễn giả L12-5-01; L12-5-01 chỉ định nghĩa $\Delta_S$, để giữ trần 60.
- Nhận xét 12.4 ý 1: một dòng "Bỏ (E1)" trên L12-3-04 và Bài tập 12.1 câu 4; ý 2, 3: ghi chú diễn giả L12-3-04 (không được dùng lại trên mặt trang).
- Mệnh đề 12.9 và Ví dụ 12.6 (mục "Mở rộng" của ghi chú): ghi chú diễn giả L12-4-01 và L12-6-02. Deck chỉ cần định nghĩa $R^*$; số $R^*=\tfrac15$ của Ví dụ 12.6 dùng ở ghi chú diễn giả L12-6-02.
- Ví dụ 12.2: không có trang riêng; một dòng "Nhắc lại:" trên L12-3-01 và phép tính trong ghi chú diễn giả, vì deck Bài 01 (trang "Ví dụ: hồi quy trên ba điểm") đã giải đúng hệ $A^\top A=\begin{pmatrix}3&3\\3&5\end{pmatrix}$, $A^\top y=(5,6)^\top$, $\hat w=(\tfrac76,\tfrac12)$, phần dư và tổng bình phương $\tfrac16$ (NT9: không dạy lại).
- Ví dụ 12.4: ghi chú diễn giả L12-3-08 (cùng ý "hai mô hình cùng nhãn, khác entropy chéo"; dùng lại ở Bài tập 12.12 về nhà).
- Bổ đề 12.14: là bước 2 của L12-5-07 (vai trò công cụ, Q3).
- Mệnh đề 12.3 và 12.16: chứng minh một dòng trên trang phát biểu, vì Mệnh đề 12.3 không thuộc danh sách chứng minh cốt lõi của Q4 và lập luận hạt nhân đã có ở deck Bài 01; Mệnh đề 12.16 là áp dụng trực tiếp Bổ đề 12.14.
- §9.3 "Ứng dụng trong học máy" và các đoạn "Trong học máy" của ghi chú: ba dòng không nhãn trên mặt trang (L12-3-06 thêm đặc trưng vượt hạng, L12-3-10 chính quy hóa, L12-4-06 phá hòa; cổng duyệt T8), các ý còn lại ở ghi chú diễn giả (L12-3-03, L12-4-03, L12-5-05, L12-5-08). Không có trang riêng.

## 5. Ví dụ bổ trợ và phép tính

Mọi ví dụ lấy từ ghi chú hoặc `exercises.md`; ví dụ mới duy nhất là phản ví dụ ở mục 20 (chỉ trong ghi chú diễn giả, theo cổng duyệt N11). Mọi con số dưới đây tính lại hai lần: bằng tay theo ghi chú và bằng script `scratchpad/lec-12/storyboard/verify.py` (numpy); kết quả khớp.

1. **Câu hỏi mở đầu / Ví dụ 12.1 (ví dụ cảm biến, xuyên suốt).** $X\sim\operatorname{Uniform}[-1,1]$, $Y=\mathbf 1_{\{X\ge0\}}$; mẫu $(-0{,}8;0)$, $(-0{,}2;0)$, $(0{,}3;1)$, $(0{,}7;1)$; ba bộ $h_0$, $h_{0{,}3}$, $g$; ba lớp $\mathcal H_{\mathrm c}\subset\mathcal H_\uparrow\subset\mathcal H_{\mathrm{all}}$ (hằng $1=h_{-1}$, hằng $0=h_2$ trên $[-1,1]$). Dùng ở L12-2-01, L12-2-03, L12-4-06, L12-5-02, L12-5-09, L12-6-08, L12-7-02, L12-7-04.
2. **Ví dụ 12.2 (chỉ Nhắc lại).** $A^\top A=\begin{pmatrix}3&3\\3&5\end{pmatrix}$, $\det=6$, $A^\top y=(5,6)^\top$; $2w_1=1$, $\hat w=(\tfrac76,\tfrac12)$; $\hat y=(\tfrac76,\tfrac53,\tfrac{13}6)$, $r=(-\tfrac16,\tfrac13,-\tfrac16)$, SSE $=\tfrac1{36}+\tfrac19+\tfrac1{36}=\tfrac16$; $\sum r_i=0$, $\sum x_ir_i=0$; $\hat\sigma^2=\tfrac16/3=\tfrac1{18}$.
3. **Ví dụ 12.3 (L12-3-06).** $(1,2)$, $(1,4)$; hạng $1$; $c=w_0+w_1$: $(2-c)^2+(4-c)^2=2(c-3)^2+2$, cực tiểu $2$ tại $c=3$; tập nghiệm $\{(3,0)+(v,-v)\}$, vector khớp $(3,3)$; tại $x=0$: $3$ và $0$. Câu hỏi tự làm (Bài tập 12.1 câu 6): $c=\tfrac73$, SSE $=\tfrac{16+1+25}9=\tfrac{14}3$, dự đoán tại $x=0$: $\tfrac73$ và $0$.
4. **Bài tập 12.1 câu 4 (L12-3-11).** $(0,1)$, $(1,3)$, $(2,5)$: $A^\top y=(9,13)^\top$, $\hat w=(1,2)$, SSE $=0$; tại $\hat w$, $-\log L=\tfrac32\log(2\pi\sigma^2)\to-\infty$ khi $\sigma^2\downarrow0$. Câu 2–3 (ghi chú diễn giả): $A^\top y=(7,10)^\top$, $\hat w=(\tfrac56,\tfrac32)$, $r=(\tfrac16,-\tfrac13,\tfrac16)$, SSE $=\tfrac16$, $\hat\sigma^2=\tfrac1{18}$.
5. **Định nghĩa 12.5, ví dụ số (L12-3-07).** $\phi(x)=x$, $w=\log3$: $m_w(1)=\tfrac1{1+1/3}=\tfrac34$, $m_w(-1)=\tfrac1{1+3}=\tfrac14$.
6. **Ví dụ 12.4 (ghi chú diễn giả L12-3-08).** $-\log0{,}6\approx0{,}511$; $-\log0{,}9\approx0{,}105$; nhãn đổi: $-\log0{,}4\approx0{,}916$, $-\log0{,}1\approx2{,}303$.
7. **Ví dụ 12.5, (5.2), Nhận xét 12.7 (L12-3-10).** $\hat L_2(0)=\log2\approx0{,}6931$; $\hat L_2(\log3)=-\log\tfrac34\approx0{,}2877$; $\hat L_2(w)=\log(1+e^{-w})$, $\hat L_2'(w)=-\tfrac1{1+e^w}<0$, $\to0$ khi $w\to+\infty$; tách được với $w=1$. ERM gần đúng (ghi chú diễn giả L12-4-02): $w\ge\log(1/\eta)$ cho $\hat L_2(w)\le e^{-w}\le\eta$.
8. **Ví dụ 12.7 (L12-4-03).** $\hat R_S(\hat h_S)=0$, $R(\hat h_S)=\tfrac12$; $\mathbb E_S[\hat R_S(\hat h_S)]=0$, $\mathbb E_S[R(\hat h_S)]=\tfrac12$; khoảng cách tổng quát hóa $\tfrac12$.
9. **Ví dụ trực quan của Mệnh đề 12.11 (ghi chú diễn giả L12-4-04).** $h_{0{,}3}$ sai khi $0\le X<0{,}3$: $0{,}3\cdot\tfrac12=0{,}15$, đúng (6.6). Không phải ví dụ mới: số $0{,}15$ có ở Ví dụ 12.8.
10. **Ví dụ 12.8 (L12-4-06).** $x_-=-0{,}2$, $x_+=0{,}3$; bảng: $t=-0{,}2$: $\hat R_S=\tfrac14$, $R=0{,}1$; $t=-0{,}1$: $0$, $0{,}05$; $t=0$: $0$, $0$; $t=0{,}3$: $0$, $0{,}15$; $t=0{,}4$: $\tfrac14$, $0{,}2$.
11. **Bài tập 12.3 câu 1–2 (L12-4-07).** $R(h_{-0{,}4})=0{,}2$, $R(h_{0{,}2})=0{,}1$; ERM: $-0{,}1<t\le0{,}4$; $t=0$: rủi ro $0$; $t=0{,}4$: $0{,}2$. Câu 3–4 (ghi chú diễn giả): $R_f(h_{-0{,}4})=\tfrac{0{,}4\cdot1{,}6}4=0{,}16$, $R_f(h_{0{,}2})=\tfrac{0{,}2\cdot2{,}2}4=0{,}11$, rủi ro của quy tắc ghi nhớ $\tfrac34$.
12. **Ví dụ 12.9 (L12-5-02).** $\mathcal H_{\mathrm c}$: $R=\hat R_S=\tfrac12$, $\Delta_S=0$; $\mathcal H_\uparrow$: $\Delta_S=0{,}15$ tại $t=0{,}3$ ($0{,}15-0$) và $t=-0{,}2$ ($\lvert0{,}1-0{,}25\rvert$); script quét lưới $t$ bước $0{,}0005$ cộng các điểm mẫu cho $\max=0{,}15$; $\mathcal H_{\mathrm{all}}$: $\tilde h$ cho $\hat R_S=1$, $R=0$, $\Delta_S=1$.
13. **Ví dụ 12.10 (L12-5-05).** $\log4000\approx8{,}2940$; $8{,}294/0{,}005\approx1658{,}81$, nên $1659$; $200e^{-2\cdot1659\cdot0{,}0025}\approx0{,}049953$; $n=1658$: $\approx0{,}050203$; $\sqrt{8{,}294/2000}\approx0{,}06440$; $\log10\approx2{,}3026$.
14. **Hệ quả 12.15, Ý nghĩa (L12-5-06).** $2\cdot0{,}064397\approx0{,}1288\approx0{,}129$.
15. **§8.1, ví dụ cỡ mẫu PAC (L12-6-02).** $2\cdot8{,}294/0{,}0025\approx6635{,}24$, nên $6636$.
16. **Ví dụ 12.11 (L12-5-09).** Vế phải: $0{,}5+0+0=0{,}5$; $0+0{,}3+0=0{,}3$; $0+0{,}3+0{,}25=0{,}55$; $0+2+0=2$; cột cuối $0{,}5$; $0{,}15$; $0{,}2$; $0{,}5$, mỗi dòng không vượt vế phải.
17. **Ví dụ 12.12 (L12-6-03).** Affine: $(0,-1)\to00$, $(1,0)\to01$, $(-1,0)\to10$, $(0,1)\to11$; ngưỡng: $t=2\to00$, $t=0\to01$, $t=-2\to11$, không có $10$.
18. **Tình huống 12.1, 12.2 (L12-6-08, L12-6-09).** Số lấy từ ví dụ 10, 12 ở trên; Tình huống 12.2: rủi ro triển khai $1$.
19. **Bài tập 12.2 câu 3 (L12-3-12).** $\hat L_2(w)=\tfrac12[\log(1+e^{-2w})+\log(1+e^{-w})]>0$, $\hat L_2'(w)=-\tfrac12[\tfrac2{1+e^{2w}}+\tfrac1{1+e^w}]<0$, $\to0$ khi $w\to+\infty$; với $w\ge0$: $\hat L_2(w)\le\tfrac12(e^{-2w}+e^{-w})\le e^{-w}$, nên $w\ge\log(1/\eta)$ đủ. Câu 2 (ghi chú diễn giả): $\hat L_2(0)=\log2\approx0{,}6931$, $\hat L_2(\log3)=\tfrac12\log\tfrac{40}{27}\approx0{,}1965$ (script: $0{,}19652$).
20. **Phản ví dụ khi bỏ (G3) (ghi chú diễn giả L12-5-04; dựng mới từ Ví dụ 12.9).** Cách dựng: chọn lớp $\mathcal H=\{\tilde h\}$ sau khi xem $S$, với $\tilde h$ trùng $\mathbf 1_{\{x\ge0\}}$ trừ các điểm mẫu và đổi nhãn tại đó. Khi đó $M=1$, $\hat R_S(\tilde h)=1$, $R(\tilde h)=0$, $\Delta_S=1$ với xác suất $1$, trong khi vế phải của (7.4) với $M=1$ là $2e^{-2n\varepsilon^2}$, nhỏ hơn $1$ khi $n>\log2/(2\varepsilon^2)$; do đó (7.4) sai khi bỏ (G3). Ký hiệu và hàm $\tilde h$ lấy từ ghi chú.
21. **Bài tập 12.10 (L12-5-10)**, **12.11 (L12-6-10)**, **12.17 (L12-7-03, L12-7-04):** lời giải như `exercises.md`; kiểm tra số $p_S(0)=-0{,}09\cdot0{,}49=-0{,}0441$.

## 6. Danh sách trang

Mỗi trang một mục. "Mật độ" là số đếm bằng script trên văn bản dự kiến dưới đây. Nguồn là mục và số dòng của `lecture-note.md`, trừ khi ghi `exercises.md`. Ghi chú diễn giả là bản dự thảo cho người viết deck; mỗi ghi chú kết thúc bằng dòng `<p class="note-source"><strong>Nguồn:</strong> ghi chú bài giảng Bài 12, §k (khối); Murphy (2022), §a.b.</p>` theo NT22, chỉ dẫn nguồn mà ghi chú dẫn cho nội dung đó. Thời lượng chỉ ở storyboard. Các từ mở dòng "Dữ kiện:", "Kiểm tra:", "Bỏ (E1):", "Phương sai chưa biết:", "Cảm biến:", "Lớp affine:", "Lớp ngưỡng:", "Rủi ro:", "Trong học máy" viết thường, không in đậm (không thuộc danh sách nhãn NT19); chỉ các nhãn của NT19 được in đậm.

### 6.1. Mạch 1: Mở đầu (5 trang, 7 phút)

#### L12-1-01 · Học máy, rủi ro thống kê và khả năng tổng quát hóa

- **Loại:** bìa. **Thời lượng:** 1 phút. **Mật độ:** 60 âm tiết, 3 dòng, 0 công thức hiển thị.
- **Mặt trang dự kiến:**
  - `h3`: Mất mát từ hợp lý, rủi ro kỳ vọng, hội tụ đều và số chiều Vapnik–Chervonenkis · Bài 12
  - Khớp hoàn hảo tập huấn luyện cho rủi ro nhỏ trên dữ liệu mới, với xác suất cao, khi lớp giả thuyết đủ hẹp so với cỡ mẫu và dữ liệu mới cùng phân phối với tập huấn luyện.
  - Cơ sở toán học cho AI · Học kỳ 1, 2026–2027
  - Trường Đại học Công nghệ · Đại học Quốc gia Hà Nội
- **Ghi chú diễn giả (dự thảo, 83 âm tiết):** Bài 11 chọn tham số bằng hợp lý cực đại trên mẫu. Bài này hỏi tham số khớp tốt trên tập huấn luyện dự đoán quan sát mới tốt đến đâu. Bảo đảm là xác suất cao theo việc lấy tập huấn luyện. Luận điểm có hai điều kiện, ứng với hai giả thiết của bài: độ linh hoạt của lớp so với cỡ mẫu (hội tụ đều, số chiều VC) và quan sát mới cùng phân phối với tập huấn luyện (G1).
- **Lý do tồn tại:** Mở bài, nêu luận điểm có điều kiện của cả bài (NT11). **Khoảng trống được lấp:** Nối câu hỏi còn mở cuối Bài 11.
- **Nối:** → L12-1-02: các kết quả bài trước mà bài dùng. **Phần câu hỏi mạch:** ngoài hành trình; điểm vào mạch 1. **Mục tiêu học tập:** CLO2, CLO4 (tổng quan).
- **Nguồn:** đoạn mở đầu (dòng 3–9); §11 đoạn cuối (dòng 1542); giả thiết (G1) §2. **Quyết định:** thêm: bìa theo NT11.

#### L12-1-02 · Tiên quyết và quy ước

- **Loại:** tiên quyết. **Thời lượng:** 2 phút. **Mật độ:** 59 âm tiết, 6 dòng, 0 công thức hiển thị.
- **Mặt trang dự kiến:**
  - Nhắc lại:
  - cực đại hợp lý tương đương cực tiểu $-\frac1n\sum_i\log p_\theta(x_i)$ (Mệnh đề 11.3);
  - với $A\in\mathbb R^{n\times p}$, phương trình chuẩn $A^\top Aw=A^\top y$ có nghiệm duy nhất khi hạng cột đầy đủ (Mệnh đề 05.3);
  - bất đẳng thức hợp $\mathbb P(E\cup F)\le\mathbb P(E)+\mathbb P(F)$ (Hệ quả 10.7);
  - Hoeffding: $Z_1,\ldots,Z_n$ độc lập, nhận giá trị trong $[0,1]$, thì với mọi $\varepsilon>0$, $\mathbb P(\lvert\bar Z_n-\mathbb E\bar Z_n\rvert\ge\varepsilon)\le2e^{-2n\varepsilon^2}$ (Định lý 05c.47).
  - Ký hiệu: $\log$ là logarit tự nhiên; $\mathbf 1_{\{p\}}=1$ khi $p$ đúng, $=0$ khi sai.
- **Ghi chú diễn giả (dự thảo, 77 âm tiết):** Bốn kết quả được dùng lại nguyên dạng: Mệnh đề 11.3 ở hai phép suy ra mất mát; phương trình chuẩn ở hồi quy tuyến tính; bất đẳng thức hợp và Hoeffding ở hội tụ đều cho lớp hữu hạn. Hoeffding được nêu cho biến nhận giá trị trong [0,1], là trường hợp $l_i=0$, $u_i=1$, $V=n$ của Định lý 05c.47. Bài 05 viết $X$, $d$; bài này viết $A$, $p$ vì $X$ dành cho đầu vào ngẫu nhiên. Câu ôn nhanh: với $n=200$, $\varepsilon=0{,}1$, cận Hoeffding bằng $2e^{-4}\approx0{,}0366$.
- **Lý do tồn tại:** NT11: Nhắc lại các kết quả theo mục Kiến thức tiên quyết. **Khoảng trống được lấp:** Bảo đảm NT9: mọi kết quả bài trước dùng trên mặt trang đã được nhắc.
- **Nối:** ← bìa; → mục tiêu. **Phần câu hỏi mạch:** ngoài hành trình. **Mục tiêu học tập:** tiên quyết cho mục tiêu 1, 2, 4.
- **Nguồn:** Kiến thức tiên quyết (dòng 43–62). **Quyết định:** thêm; Định lý 11.4 và Định lý 05c.52 được "Nhắc lại:" tại chỗ dùng (L12-3-07, L12-5-01) để giữ trang trong trần.

#### L12-1-03 · Mục tiêu học tập

- **Loại:** mục tiêu. **Thời lượng:** 1,5 phút. **Mật độ:** 80 âm tiết, 6 dòng, 0 công thức hiển thị.
- **Mặt trang dự kiến:**
  - Suy ra hai mất mát từ hợp lý; nhận ra khi vô nghiệm hữu hạn.
  - Giải phương trình chuẩn; tách duy nhất của hệ số với giá trị khớp.
  - Định nghĩa hai loại rủi ro, ERM; tính rủi ro của ngưỡng.
  - Chứng minh hội tụ đều, chặn rủi ro dư cho lớp hữu hạn.
  - Phân biệt độ chính xác, độ tin cậy; chứng minh số chiều VC của ngưỡng.
  - Tách ba nguồn sai số; nhận ra giả thiết vi phạm.
- **Ghi chú diễn giả (dự thảo, 96 âm tiết):** Sáu mục tiêu cụ thể hóa CLO2 và CLO4 của đề cương. ERM là quy tắc tối thiểu hóa rủi ro thực nghiệm (empirical risk minimization). Mục tiêu 1 gồm hợp lý Gaussian và Bernoulli có điều kiện; mục tiêu 3 gồm rủi ro kỳ vọng, rủi ro thực nghiệm và tính chính xác rủi ro của bộ phân loại ngưỡng; mục tiêu 5 gồm học gần đúng với xác suất cao (PAC); mục tiêu 6 gồm sai số xấp xỉ, sai số ước lượng và sai số tối ưu hóa trên ví dụ cảm biến.
- **Lý do tồn tại:** NT11: đủ sáu mục tiêu của ghi chú. **Khoảng trống được lấp:** —
- **Nối:** → Nội dung. **Phần câu hỏi mạch:** ngoài hành trình. **Mục tiêu học tập:** mục tiêu 1–6.
- **Nguồn:** Mục tiêu học tập (dòng 32–41). **Quyết định:** thêm.

#### L12-1-04 · Nội dung

- **Loại:** nội dung. **Thời lượng:** 0,5 phút. **Mật độ:** 57 âm tiết, 8 dòng, 0 công thức hiển thị.
- **Mặt trang dự kiến:**
  - Mở đầu (#/1)
  - Bài toán học có giám sát (#/2)
  - Mất mát từ hợp lý có điều kiện (#/3)
  - Rủi ro kỳ vọng và tối thiểu hóa rủi ro thực nghiệm (#/4)
  - Hội tụ đều và rủi ro dư (#/5)
  - Học gần đúng với xác suất cao và số chiều VC (#/6)
  - Tổng kết (#/7)
  - Đọc trước: Murphy (2022), §4.2.3, §4.2.7, §4.3.
- **Ghi chú diễn giả (dự thảo, 80 âm tiết):** Phần 2 đặt khung chung: phân phối đích, lớp giả thuyết, mất mát, ba giả thiết. Phần 3 suy ra mất mát huấn luyện. Phần 4 định nghĩa rủi ro kỳ vọng và cho thấy hàm chọn từ mẫu có thể có rủi ro khác xa rủi ro thực nghiệm. Phần 5 kiểm soát đồng thời mọi hàm của lớp hữu hạn. Phần 6 đo độ phức tạp của lớp vô hạn và nêu giới hạn khi phân phối đổi.
- **Lý do tồn tại:** NT11: danh sách đánh số mọi mạch, liên kết #/N. **Khoảng trống được lấp:** —
- **Nối:** → Vấn đề trung tâm. **Phần câu hỏi mạch:** ngoài hành trình. **Mục tiêu học tập:** —.
- **Nguồn:** Tài liệu đọc, Trước buổi học (dòng 1550). **Quyết định:** thêm.

#### L12-1-05 · Vấn đề trung tâm

- **Loại:** vấn đề trung tâm. **Thời lượng:** 2 phút. **Mật độ:** 24 âm tiết, 1 dòng, 0 công thức hiển thị.
- **Mặt trang dự kiến:**
  - Hộp: Câu hỏi: Tại sao một mô hình có thể khớp hoàn hảo dữ liệu huấn luyện nhưng dự đoán sai trên dữ liệu mới?
- **Ghi chú diễn giả (dự thảo, 87 âm tiết):** Câu trả lời theo phần: phần 3 cho thấy mất mát huấn luyện chỉ dùng dữ liệu đã thấy; phần 4 cho thấy hàm chọn bằng rủi ro thực nghiệm có thể có rủi ro kỳ vọng khác xa (hàm ghi nhớ, rủi ro 1/2); phần 5 cho cận khi lớp hữu hạn và tách rủi ro dư thành ba nguồn; phần 6 đo độ phức tạp của lớp vô hạn bằng số chiều VC và chỉ ra bảo đảm mất hiệu lực khi phân phối đổi.
- **Lý do tồn tại:** NT11: một hộp nêu đúng câu hỏi in đậm của ghi chú. **Khoảng trống được lấp:** —
- **Nối:** → mạch 2: ví dụ cụ thể của câu hỏi. **Phần câu hỏi mạch:** vấn đề (cả bài). **Mục tiêu học tập:** mục tiêu 3, 6.
- **Nguồn:** đoạn mở đầu (dòng 3). **Quyết định:** thêm.


### 6.2. Mạch 2: Bài toán học có giám sát (4 trang, 7 phút)

#### L12-2-00 · 2. Bài toán học có giám sát

- **Loại:** tiêu đề mạch. **Thời lượng:** 0,5 phút. **Mật độ:** 0 âm tiết, 0 dòng, 0 công thức hiển thị.
- **Mặt trang dự kiến:**
  - Dòng dẫn (`p.strand-lead`, 18 âm tiết): Quy tắc học chọn hàm dự đoán từ mẫu; chất lượng của hàm đo trên quan sát mới.
  - Từ khóa (`p.strand-keys`): phân phối đích · lớp giả thuyết · mất mát · quy tắc học
- **Ghi chú diễn giả (dự thảo, 70 âm tiết):** Bài 11 đo tham số trên chính mẫu đã thấy. Để nói về sản phẩm mới, cần các đối tượng của bài toán học có giám sát: phân phối đích chưa biết, tập huấn luyện, quan sát mới, lớp giả thuyết, mất mát, quy tắc học, cùng ba giả thiết thống kê. Kết quả là ví dụ cảm biến với ba lớp giả thuyết lồng nhau, dùng cho cả bài.
- **Lý do tồn tại:** NT12: trang tiêu đề mạch. **Khoảng trống được lấp:** —
- **Nối:** ← Vấn đề trung tâm; → ví dụ bốn sản phẩm. **Phần câu hỏi mạch:** điểm vào mạch 2; ngoài hành trình khái niệm. **Mục tiêu học tập:** mục tiêu 3.
- **Nguồn:** §1–3. **Quyết định:** thêm.

#### L12-2-01 · Ví dụ: bốn sản phẩm và ba bộ phân loại

- **Loại:** vấn đề + ví dụ. **Thời lượng:** 2,5 phút. **Mật độ:** 60 âm tiết, 6 dòng, 0 công thức hiển thị.
- **Mặt trang dự kiến:**
  - Giá trị đo $x\in[-1,1]$ có phân phối đều; sản phẩm lỗi ($y=1$) khi và chỉ khi $x\ge0$.
  - Bảng (mỗi dòng dưới đây là một hàng, ô ngăn bằng |):
    - $x_i$: $-0{,}8$; $-0{,}2$; $0{,}3$; $0{,}7$
    - $y_i$: $0$; $0$; $1$; $1$
  - $h_0(x)=\mathbf 1_{\{x\ge0\}}$: báo lỗi khi giá trị đo từ $0$ trở lên;
  - $h_{0{,}3}(x)=\mathbf 1_{\{x\ge0{,}3\}}$: báo lỗi khi giá trị đo từ $0{,}3$ trở lên;
  - hàm ghi nhớ $g$: đúng nhãn tại $x_1,\ldots,x_4$, bằng $0$ tại mọi điểm khác.
  - Câu hỏi: Ba bộ phân loại dự đoán tốt đến mức nào trên một sản phẩm mới?
- **Ghi chú diễn giả (dự thảo, 109 âm tiết):** Câu trả lời hấp dẫn: ba bộ tốt như nhau vì cả ba đúng bốn sản phẩm. Câu trả lời này sai vì hai lý do. Tỉ lệ sai trên tập huấn luyện chỉ nhìn bốn giá trị đo, còn sản phẩm mới có giá trị đo bất kỳ trên [-1,1], và ba bộ khác nhau trên những đoạn có xác suất dương. Hàm g được dựng sau khi xem nhãn của chính bốn sản phẩm, nên việc nó khớp không cho thông tin về các giá trị đo khác. Cần một đại lượng đo sai số trên sản phẩm mới; đại lượng đó là rủi ro kỳ vọng.
- **Lý do tồn tại:** NT13: trang nội dung đầu của mạch nêu câu hỏi; NT14: liệt kê ngay dữ kiện. **Khoảng trống được lấp:** Biến câu hỏi trung tâm thành phép so sánh cụ thể.
- **Nối:** → L12-2-02: các đối tượng cần để trả lời. **Phần câu hỏi mạch:** vấn đề của mạch 2 (cần những đối tượng nào). **Mục tiêu học tập:** mục tiêu 3.
- **Nguồn:** Câu hỏi mở đầu (dòng 11–30). **Quyết định:** thêm: ví dụ xuyên suốt của ghi chú.

#### L12-2-02 · Các thành phần của bài toán học

- **Loại:** định nghĩa (khung). **Thời lượng:** 2,5 phút. **Mật độ:** 57 âm tiết, 5 dòng, 0 công thức hiển thị.
- **Mặt trang dự kiến:**
  - So sánh trên sản phẩm mới cần $P$, $\mathcal H$, $\ell$ và quy tắc học.
  - (G1) $S\sim P^n$: $n$ cặp độc lập cùng phân phối (i.i.d.) theo $P$ chưa biết; quan sát mới $(X,Y)\sim P$ độc lập với $S$.
  - Mất mát (loss) $\ell(a,y)\ge0$: mức phạt cho dự đoán $a$; (G2) $\ell\in[0,1]$.
  - (G3) Lớp giả thuyết (hypothesis class) $\mathcal H$ gồm các $h:\mathcal X\to\mathcal A$ đo được, cố định trước khi xem $S$.
  - Quy tắc học $S\mapsto\hat h_S\in\mathcal H$ chỉ dùng $S$.
- **Ghi chú diễn giả (dự thảo, 133 âm tiết):** Mục tiêu: rủi ro của $\hat h_S$ trên quan sát mới nhỏ; tài nguyên là cỡ mẫu n. (G1)–(G3) là nhãn giả thiết của ghi chú, dùng lại ở mọi cận hội tụ đều và bảo đảm PAC. Đại lượng cố định: P, lớp, mất mát, rủi ro của một h cho trước. Đại lượng ngẫu nhiên theo S: chính S, hàm chọn được, rủi ro thực nghiệm, độ lệch đều. Phần 3 dùng thiết kế cố định (giữ đầu vào cố định); mất mát bình phương và entropy chéo không bị chặn, nên (G2) chỉ dùng cho các cận hội tụ đều. Giả thiết (E1), (E2) được nêu tại chỗ dùng. Bài 11 viết $\ell(\theta;D)$ cho log-hợp lý; từ bài này $\ell(a,y)$ là mất mát, và rủi ro thực nghiệm viết theo hàm dự đoán h.
- **Lý do tồn tại:** Khung lý thuyết chung (NT9) trước khi dùng các ký hiệu P, S, H, ℓ. **Khoảng trống được lấp:** Định nghĩa các đối tượng mà câu hỏi ở trang trước cần.
- **Nối:** ← ví dụ bốn sản phẩm; → ba lớp giả thuyết trên ví dụ. **Phần câu hỏi mạch:** đối tượng (phần 1 của câu hỏi mạch 2). **Mục tiêu học tập:** mục tiêu 3.
- **Nguồn:** §1 (dòng 64–84), §2 giả thiết (dòng 115–119). **Quyết định:** thêm.

#### L12-2-03 · Ví dụ: ba lớp giả thuyết cho bộ phân loại cảm biến

- **Loại:** ví dụ (Ví dụ 12.1). **Thời lượng:** 1,5 phút. **Mật độ:** 56 âm tiết, 6 dòng, 0 công thức hiển thị.
- **Mặt trang dự kiến:**
  - Dữ kiện: $X\sim\operatorname{Uniform}[-1,1]$, $Y=\mathbf 1_{\{X\ge0\}}$, bốn sản phẩm $(-0{,}8;0)$, $(-0{,}2;0)$, $(0{,}3;1)$, $(0{,}7;1)$; mất mát $0$–$1$ (0–1 loss) $\ell(a,y)=\mathbf 1_{\{a\ne y\}}$.
  - $\mathcal H_{\mathrm c}=\{x\mapsto0,\ x\mapsto1\}$: hai hàm hằng, không dùng đặc trưng;
  - $\mathcal H_\uparrow=\{h_t:\ t\in\mathbb R\}$, $h_t(x)=\mathbf 1_{\{x\ge t\}}$: các ngưỡng trên một đặc trưng;
  - $\mathcal H_{\mathrm{all}}$: mọi hàm đo được $[-1,1]\to\{0,1\}$, chứa hàm ghi nhớ $g$.
  - Trên $[-1,1]$, hằng $1$ trùng $h_{-1}$ và hằng $0$ trùng $h_2$, nên $\mathcal H_{\mathrm c}\subset\mathcal H_\uparrow\subset\mathcal H_{\mathrm{all}}$.
  - Diễn giải: ba lớp lồng nhau trên cùng một mẫu, nên so được tác động của độ linh hoạt.
- **Ghi chú diễn giả (dự thảo, 97 âm tiết):** Ví dụ 12.1 có ba đặc điểm thuận lợi: phân phối đích đã biết nên mọi rủi ro kỳ vọng tính được bằng tích phân; nhãn là hàm tất định của đầu vào nên quy tắc tốt nhất có rủi ro 0; ba lớp lồng nhau. Ba giả thiết thỏa: bốn quan sát i.i.d. cùng phân phối với sản phẩm mới (G1), mất mát 0–1 thuộc [0,1] (G2), ba lớp cố định trước khi xem nhãn (G3). Ví dụ được dùng lại khi tính rủi ro, độ lệch đều, ba nguồn sai số và số chiều VC.
- **Lý do tồn tại:** Ví dụ xuyên suốt của ghi chú (§3), đặt ký hiệu ba lớp. **Khoảng trống được lấp:** Kiểm (G1)–(G3) trên một bài toán cụ thể.
- **Nối:** ← khung; → mạch 3 (mất mát huấn luyện). **Phần câu hỏi mạch:** đối tượng cụ thể (phần 2 của câu hỏi mạch 2). **Mục tiêu học tập:** mục tiêu 3, 6.
- **Nguồn:** §3, Ví dụ 12.1 (dòng 126–154). **Quyết định:** thêm.


### 6.3. Mạch 3: Mất mát từ hợp lý có điều kiện (13 trang, 27 phút)

#### L12-3-00 · 3. Mất mát từ hợp lý có điều kiện

- **Loại:** tiêu đề mạch. **Thời lượng:** 0,5 phút. **Mật độ:** 0 âm tiết, 0 dòng, 0 công thức hiển thị.
- **Mặt trang dự kiến:**
  - Dòng dẫn (`p.strand-lead`, 16 âm tiết): Mỗi mất mát huấn luyện là âm log-hợp lý của một mô hình cho đầu ra.
  - Từ khóa (`p.strand-keys`): hồi quy Gaussian · phương trình chuẩn · mô hình logistic · entropy chéo
- **Ghi chú diễn giả (dự thảo, 68 âm tiết):** Bài 11 suy ra tổng bình phương và entropy chéo khi mọi quan sát dùng chung một tham số. Ở đây phân phối của đầu ra phụ thuộc đầu vào qua một tham số chung; từ đó suy ra hai mất mát huấn luyện và xét nghiệm có tồn tại, duy nhất không. Hai mục tiêu thu được đều là trung bình mất mát trên mẫu đã thấy.
- **Lý do tồn tại:** NT12. **Khoảng trống được lấp:** —
- **Nối:** ← ba lớp giả thuyết; → ba số đo cảm biến. **Phần câu hỏi mạch:** điểm vào mạch 3; dòng dẫn nêu ý cốt lõi, ngoài hành trình khái niệm. **Mục tiêu học tập:** mục tiêu 1, 2.
- **Nguồn:** §4–5. **Quyết định:** thêm.

#### L12-3-01 · Ba số đo cảm biến

- **Loại:** vấn đề. **Thời lượng:** 2 phút. **Mật độ:** 45 âm tiết, 6 dòng, 0 công thức hiển thị.
- **Mặt trang dự kiến:**
  - $(x_1,y_1)=(0,1)$
  - $(x_2,y_2)=(1,2)$
  - $(x_3,y_3)=(2,2)$
  - Không đường thẳng $w_0+w_1x$ nào đi qua cả ba điểm.
  - Nhắc lại: bình phương nhỏ nhất trên ba điểm này cho $\hat w=(\tfrac76,\tfrac12)$, tổng bình phương phần dư $\tfrac16$.
  - Mất mát suy ra từ mô hình của đầu ra; mô hình quyết định nghiệm có tồn tại, duy nhất.
- **Ghi chú diễn giả (dự thảo, 82 âm tiết):** Bài 01 đã giải phương trình chuẩn trên đúng ba điểm này (Ví dụ 12.2 của ghi chú lặp lại phép tính: $A^\top A$ có định thức 6, phần dư $(-\frac16,\frac13,-\frac16)$ vuông góc với hai cột của $A$). Ở đây tiêu chuẩn tổng bình phương không cho trước: ta nêu mô hình xác suất của đầu ra rồi suy ra đại lượng cần tối ưu bằng hợp lý cực đại. Nếu học thêm phương sai trong cùng mô hình, phép tối ưu theo phương sai cho $\hat\sigma^2=\frac16/3=\frac1{18}$.
- **Lý do tồn tại:** NT13: câu hỏi của mạch trên trang nội dung đầu, dạng câu khẳng định. **Khoảng trống được lấp:** Tách việc tối ưu (đã biết) khỏi nguồn gốc của mất mát (chưa biết).
- **Nối:** → L12-3-02: mô hình đầu ra có điều kiện. **Phần câu hỏi mạch:** vấn đề của mạch 3. **Mục tiêu học tập:** mục tiêu 1.
- **Nguồn:** §4 mở đầu (dòng 156–166); Ví dụ 12.2 (dòng 309–342). **Quyết định:** thêm; Ví dụ 12.2 chỉ ở dòng Nhắc lại và ghi chú diễn giả vì deck Bài 01 đã giải đúng phép tính này.

#### L12-3-02 · Mô hình đầu ra có điều kiện

- **Loại:** trực quan + định nghĩa (Định nghĩa 12.1). **Thời lượng:** 2,5 phút. **Mật độ:** 59 âm tiết, 5 dòng, 1 công thức hiển thị.
- **Mặt trang dự kiến:**
  - Trực quan. Đầu vào dời vị trí của phân phối đầu ra; nhiễu dao động quanh vị trí đó.
  - Định nghĩa. Mỗi $\theta\in\Theta$ và đầu vào $x$ cho phân phối $p_\theta(\cdot\mid x)$; $\theta$ dùng chung cho mọi $x$.
  - Đầu ra độc lập có điều kiện cho hàm hợp lý có điều kiện
  - Công thức hiển thị: $$L(\theta)=\prod_{i=1}^n p_\theta(y_i\mid x_i)\quad(4.1)$$
  - Hồi quy Gaussian: $Y_i=m_\theta(x_i)+\xi_i$, trung bình $m_\theta$, nhiễu $\xi_i$ i.i.d. $\mathcal N(0,\sigma^2)$ độc lập với đầu vào (4.2).
- **Ghi chú diễn giả (dự thảo, 82 âm tiết):** Mỗi nhân tử của (4.1) là mật độ khi Y liên tục và là xác suất khi Y rời rạc. Định nghĩa 12.1 mở rộng hàm hợp lý của Định nghĩa 11.2: ở Bài 11 mọi quan sát có cùng phân phối, ở đây mỗi quan sát có phân phối riêng nhưng sinh từ cùng một quy tắc $x\mapsto p_\theta(\cdot\mid x)$. Khi mọi $x_i$ bằng nhau, (4.1) trở về hàm hợp lý của mẫu i.i.d. Khác Định lý 11.9, trung bình $m_\theta(x_i)$ thay đổi theo quan sát.
- **Lý do tồn tại:** NT8: trực quan rồi định nghĩa. **Khoảng trống được lấp:** Đối tượng mới: hàm hợp lý khi tham số đi qua đầu vào.
- **Nối:** ← ba số đo; → Mệnh đề 12.2. **Phần câu hỏi mạch:** trực quan + định nghĩa. **Mục tiêu học tập:** mục tiêu 1.
- **Nguồn:** §4.1, Định nghĩa 12.1 (dòng 168–194). **Quyết định:** thêm.

#### L12-3-03 · Hợp lý Gaussian và mất mát bình phương

- **Loại:** kết quả (Mệnh đề 12.2). **Thời lượng:** 2 phút. **Mật độ:** 46 âm tiết, 5 dòng, 1 công thức hiển thị.
- **Mặt trang dự kiến:**
  - Giả thiết: mô hình (4.2); (E1) phương sai $\sigma^2>0$ đã biết, không phụ thuộc $\theta$.
  - Kết luận:
  - Công thức hiển thị: $$-\log L(\theta)=\frac n2\log(2\pi\sigma^2)+\frac1{2\sigma^2}\sum_{i=1}^n\bigl(y_i-m_\theta(x_i)\bigr)^2\quad(4.3)$$
  - nên tập nghiệm hợp lý cực đại trùng tập nghiệm cực tiểu của $\sum_i(y_i-m_\theta(x_i))^2$ (Mệnh đề 12.2).
  - Ý nghĩa: chọn mất mát bình phương là chọn nhiễu Gaussian có phương sai chung.
- **Ghi chú diễn giả (dự thảo, 85 âm tiết):** Hiệu $y_i-m_\theta(x_i)$ là phần dư (residual). Trong học máy, $m_\theta$ là bộ dự đoán đầu ra liên tục, và mất mát bình phương trung bình là mất mát huấn luyện thông dụng của mạng sâu; mỗi mất mát mang theo một mô hình xác suất của đầu ra. Nếu thay nhiễu Gaussian bằng nhiễu có mật độ tỉ lệ với $e^{-|\xi|/\beta}$, cùng phép suy diễn cho tổng trị tuyệt đối, như Ví dụ 11.6. Murphy (2022), §4.2.7 và §11.2.2, trình bày cùng phép suy diễn với $\sigma^2$ cố định.
- **Lý do tồn tại:** Kết quả chính 1 (NT5). **Khoảng trống được lấp:** Trả lời phần 'mất mát bình phương đến từ đâu'.
- **Nối:** ← định nghĩa; → ý tưởng chứng minh. **Phần câu hỏi mạch:** phát biểu. **Mục tiêu học tập:** mục tiêu 1.
- **Nguồn:** §4.2, Mệnh đề 12.2 (dòng 196–213), §9.3 ý 1. **Quyết định:** thêm.

#### L12-3-04 · Ý tưởng chứng minh: hợp lý Gaussian và mất mát bình phương

- **Loại:** ý tưởng chứng minh. **Thời lượng:** 2,5 phút. **Mật độ:** 57 âm tiết, 6 dòng, 1 công thức hiển thị.
- **Mặt trang dự kiến:**
  - Nhắc lại: $\log$ tăng chặt nên giữ tập nghiệm (Mệnh đề 11.3).
  - 1. Mật độ một đầu ra: $p_\theta(y\mid x_i)=(2\pi\sigma^2)^{-1/2}e^{-(y-m_\theta(x_i))^2/(2\sigma^2)}$.
  - 2. Các $\xi_i$ độc lập nên $L(\theta)>0$ là tích (4.1); âm log biến tích thành tổng (4.3).
  - 3. Với $c_2=\frac1{2\sigma^2}>0$ không phụ thuộc $\theta$ (giả thiết (E1)):
  - Công thức hiển thị: $$-\log L(\theta)=c_1+c_2\sum_{i=1}^n\bigl(y_i-m_\theta(x_i)\bigr)^2$$
  - Bỏ (E1): học thêm $\sigma^2$ khi khớp hoàn hảo thì hợp lý không bị chặn (Nhận xét 12.4).
- **Ghi chú diễn giả (dự thảo, 111 âm tiết):** Bước 4 là chỗ dùng (E1): nếu $\sigma^2$ phụ thuộc θ hoặc được học, $c_1$ và $c_2$ không còn là hằng số và tập nghiệm có thể đổi. Nhận xét 12.4: khi học thêm một phương sai chung và tổng bình phương phần dư tối ưu SSE dương, $\hat\sigma^2=\mathrm{SSE}/n$; khi SSE bằng 0 và phương sai được phép tiến về 0, hợp lý Gaussian không bị chặn trên, nên không có nghiệm hợp lý cực đại chung với phương sai dương. Khi phương sai đã biết nhưng đổi theo quan sát, âm log-hợp lý cho tổng bình phương có trọng số $\sum_i(y_i-m_\theta(x_i))^2/(2\sigma_i^2)$. Lập luận của Mệnh đề 11.3 không cần các quan sát cùng phân phối.
- **Lý do tồn tại:** NT6: ý tưởng chứng minh trên trang riêng, nơi giả thiết vào. **Khoảng trống được lấp:** Cho thấy (E1) quyết định tập nghiệm.
- **Nối:** ← Mệnh đề 12.2; → tập nghiệm bình phương tối thiểu. **Phần câu hỏi mạch:** ý tưởng chứng minh + phản ví dụ khi bỏ giả thiết. **Mục tiêu học tập:** mục tiêu 1.
- **Nguồn:** Chứng minh Mệnh đề 12.2 (dòng 215–244); Nhận xét 12.4 (dòng 371–375). **Quyết định:** thêm.

#### L12-3-05 · Tập nghiệm bình phương tối thiểu

- **Loại:** kết quả (Mệnh đề 12.3). **Thời lượng:** 2 phút. **Mật độ:** 57 âm tiết, 5 dòng, 0 công thức hiển thị.
- **Mặt trang dự kiến:**
  - Giả thiết: ma trận thiết kế (design matrix) $A\in\mathbb R^{n\times p}$, $y\in\mathbb R^n$, $\hat w$ là một nghiệm của (4.4).
  - Nhắc lại: (4.4) $A^\top Aw=A^\top y$ là điều kiện cực tiểu của $J(w)=\lVert Aw-y\rVert_2^2$, luôn có nghiệm.
  - Kết luận: tập nghiệm là $\{\hat w+v:\ v\in\ker A\}$, và mọi nghiệm có cùng vector khớp $A\hat w$.
  - Nếu $A$ có hạng cột đầy đủ, nghiệm duy nhất là $\hat w=(A^\top A)^{-1}A^\top y$ (4.5) (Mệnh đề 12.3).
  - Chứng minh. Với $r=y-A\hat w$, (4.4) cho $A^\top r=0$, nên $J(\hat w+v)=J(\hat w)+\lVert Av\rVert^2$.
- **Ghi chú diễn giả (dự thảo, 116 âm tiết):** Hàng thứ i của A chứa các đặc trưng của $x_i$, có thể kèm tọa độ 1 cho hệ số tự do; theo (4.3), mục tiêu là $J(w)$, và $J=2nF$ với $F$ của Bài 05 nên cùng tập nghiệm. Về hình học, (4.4) nói phần dư vuông góc với mọi cột của A. Đẳng thức trong dòng Chứng minh cho $J(\hat w+v)=J(\hat w)$ khi và chỉ khi $Av=0$. Dữ liệu luôn xác định duy nhất giá trị khớp trên các đầu vào đã thấy, kể cả khi hệ số không duy nhất. Trong học máy: thêm đặc trưng không làm tăng tổng bình phương phần dư huấn luyện, nhưng khi số đặc trưng vượt hạng của dữ liệu, hệ số không còn duy nhất.
- **Lý do tồn tại:** Kết quả của §4.3, nối hạng với tính duy nhất (mục tiêu 2). **Khoảng trống được lấp:** Phân biệt duy nhất của hệ số với duy nhất của giá trị khớp.
- **Nối:** ← ý tưởng chứng minh 12.2; → ví dụ hạng thiếu. **Phần câu hỏi mạch:** phát biểu (phần 'nghiệm duy nhất khi nào'). **Mục tiêu học tập:** mục tiêu 2.
- **Nguồn:** §4.3, Nhắc lại Mệnh đề 05.3, Mệnh đề 12.3 và chứng minh (dòng 248–305). **Quyết định:** thêm; chứng minh một dòng vì Mệnh đề 12.3 nằm ngoài danh sách chứng minh cốt lõi và deck Bài 01 đã có lập luận hạt nhân.

#### L12-3-06 · Ví dụ: hai số đo tại cùng một đầu vào

- **Loại:** ví dụ (Ví dụ 12.3), phản ví dụ. **Thời lượng:** 1,5 phút. **Mật độ:** 57 âm tiết, 6 dòng, 0 công thức hiển thị.
- **Mặt trang dự kiến:**
  - Dữ kiện: $(x_1,y_1)=(1,2)$, $(x_2,y_2)=(1,4)$; trung bình $w_0+w_1x$, phương sai Gaussian cố định.
  - Hai hàng của $A$ cùng bằng $(1,1)$, nên hạng bằng $1<2$.
  - Đặt $c=w_0+w_1$: mục tiêu $(2-c)^2+(4-c)^2=2(c-3)^2+2$, cực tiểu tại $c=3$.
  - Tập nghiệm $\{(3,0)+(v,-v):\ v\in\mathbb R\}$, cùng vector khớp $(3,3)^\top$; $\ker A=\{(v,-v)\}$.
  - Diễn giải: tại đầu vào mới $x=0$, nghiệm $(3,0)$ dự đoán $3$, nghiệm $(0,3)$ dự đoán $0$.
  - Trong học máy, thêm đặc trưng vượt hạng của dữ liệu làm hệ số không duy nhất.
- **Ghi chú diễn giả (dự thảo, 65 âm tiết):** Kiểm tra: tập nghiệm đúng dạng $\hat w+\ker A$ của Mệnh đề 12.3. Giá trị khớp duy nhất trên dữ liệu đã thấy chưa xác định duy nhất dự đoán trên dữ liệu mới. Câu hỏi tự làm (Bài tập 12.1, câu 6): ba đầu vào $x_1=x_2=x_3=1$, đầu ra $(1,2,4)$. Gợi ý: đặt $c=w_0+w_1$; đáp số $c=\frac73$, tổng bình phương phần dư $\frac{14}3$, tập nghiệm $\{(\frac73,0)+(v,-v)\}$, hai nghiệm $(\frac73,0)$ và $(0,\frac73)$ dự đoán $\frac73$ và 0 tại $x=0$.
- **Lý do tồn tại:** Phản ví dụ cho tính duy nhất (NT4). **Khoảng trống được lấp:** Dự đoán trên đầu vào mới không được mẫu xác định.
- **Nối:** ← Mệnh đề 12.3; → nhãn nhị phân. **Phần câu hỏi mạch:** ví dụ/kiểm tra phần 'duy nhất'. **Mục tiêu học tập:** mục tiêu 2.
- **Nguồn:** Ví dụ 12.3 (dòng 344–367); Bài tập 12.1 câu 6 (dòng 1316, 1365–1377). **Quyết định:** thêm.

#### L12-3-07 · Mô hình Bernoulli có điều kiện

- **Loại:** vấn đề + trực quan + định nghĩa (Định nghĩa 12.5). **Thời lượng:** 2,5 phút. **Mật độ:** 59 âm tiết, 6 dòng, 0 công thức hiển thị.
- **Mặt trang dự kiến:**
  - Nhãn $0$, $1$ của $(-1,0)$, $(1,1)$ cần xác suất lỗi theo đầu vào thay cho mật độ Gaussian.
  - Nhắc lại: với một xác suất chung $p$, hợp lý cực đại Bernoulli cho $\hat p=\frac1n\sum_iy_i$ (Định lý 11.4).
  - Trực quan. Tham số chung điều khiển xác suất lỗi theo đặc trưng; sigmoid ép điểm số vào $(0,1)$.
  - Định nghĩa. $\mathbb P_\theta(Y=y\mid X=x)=m_\theta(x)^y[1-m_\theta(x)]^{1-y}$, $y\in\{0,1\}$.
  - Mô hình logistic (logistic regression), đặc trưng $\phi(x)\in\mathbb R^p$: $m_w(x)=\operatorname{sigm}(w^\top\phi(x))$, $\operatorname{sigm}(z)=\frac1{1+e^{-z}}$.
  - Ví dụ. $\phi(x)=x$, $w=\log3$: $m_w(1)=\tfrac34$, $m_w(-1)=\tfrac14$.
- **Ghi chú diễn giả (dự thảo, 101 âm tiết):** Mô hình Gaussian gán mật độ dương cho mọi giá trị thực, không phù hợp với nhãn 0 và 1; hai quan sát là $(x_1,y_1)=(-1,0)$ và $(x_2,y_2)=(1,1)$. Với mọi w hữu hạn, $0<m_w(x)<1$, nên cả hai nhãn có xác suất dương. Đẳng thức $\log\frac{m_w(x)}{1-m_w(x)}=w^\top\phi(x)$ nói mô hình logistic giả thiết log-tỉ số xác suất (log-odds) tuyến tính theo đặc trưng. Một tọa độ của $\phi(x)$ có thể bằng 1 để chứa hệ số tự do. Ở Định lý 11.4 mọi quan sát có chung xác suất p; ở đây xác suất thay đổi theo đầu vào nhưng bị ràng buộc bởi một vector tham số chung.
- **Lý do tồn tại:** NT8: vấn đề và trực quan trước định nghĩa. **Khoảng trống được lấp:** Thay mật độ Gaussian bằng xác suất Bernoulli.
- **Nối:** ← ví dụ hạng thiếu; → Mệnh đề 12.6. **Phần câu hỏi mạch:** vấn đề + trực quan + định nghĩa (phần 'mất mát cho nhãn nhị phân'). **Mục tiêu học tập:** mục tiêu 1.
- **Nguồn:** §5 mở đầu, §5.1, Định nghĩa 12.5 (dòng 377–415). **Quyết định:** thêm.

#### L12-3-08 · Hợp lý Bernoulli và entropy chéo

- **Loại:** kết quả (Mệnh đề 12.6). **Thời lượng:** 2 phút. **Mật độ:** 58 âm tiết, 5 dòng, 1 công thức hiển thị.
- **Mặt trang dự kiến:**
  - Giả thiết: $y_i\in\{0,1\}$ độc lập có điều kiện khi biết đầu vào; $m_\theta(x_i)\in(0,1)$ với mọi $\theta\in\Theta$.
  - Kết luận: âm log-hợp lý chia cho $n$ bằng
  - Công thức hiển thị: $$\hat L_n(\theta)=-\frac1n\sum_{i=1}^n\bigl[y_i\log m_\theta(x_i)+(1-y_i)\log\bigl(1-m_\theta(x_i)\bigr)\bigr]\quad(5.1)$$
  - là entropy chéo nhị phân (binary cross-entropy, log loss); hai tập nghiệm trùng nhau, có thể rỗng (Mệnh đề 12.6).
  - Ý nghĩa: số hạng thứ $i$ là âm log của xác suất mô hình gán cho nhãn thật.
- **Ghi chú diễn giả (dự thảo, 97 âm tiết):** Khác Bài 11, xác suất ở đây đổi theo đầu vào. Số hạng thứ i bằng $-\log m_\theta(x_i)$ khi $y_i=1$ và $-\log(1-m_\theta(x_i))$ khi $y_i=0$. Lấy ngưỡng $h_\theta(x)=\mathbf 1_{\{m_\theta(x)\ge1/2\}}$ cho nhãn; với mô hình logistic, đó là $\mathbf 1_{\{w^\top\phi(x)\ge0\}}$. Ví dụ 12.4: một quan sát nhãn 1, hai mô hình gán 0,6 và 0,9; sau ngưỡng 1/2 cả hai dự đoán 1, mất mát 0–1 bằng 0, còn entropy chéo bằng $-\log0{,}6\approx0{,}511$ và $-\log0{,}9\approx0{,}105$; nếu nhãn thật là 0, hai mất mát là 0,916 và 2,303. Do đó tăng hợp lý và giảm số lần phân loại sai là hai tiêu chuẩn khác nhau. Murphy (2022), §4.2.3 và §10.2.3.1.
- **Lý do tồn tại:** Kết quả chính 2 (NT5). **Khoảng trống được lấp:** Trả lời phần 'entropy chéo đến từ đâu'.
- **Nối:** ← mô hình Bernoulli; → ý tưởng chứng minh. **Phần câu hỏi mạch:** phát biểu. **Mục tiêu học tập:** mục tiêu 1.
- **Nguồn:** §5.2, Mệnh đề 12.6 (dòng 417–437); đoạn sau chứng minh và Ví dụ 12.4 (dòng 465–482). **Quyết định:** thêm; Ví dụ 12.4 chỉ ở ghi chú diễn giả (cùng ý với Ví dụ 12.5 ở trang sau, giữ deck trong trần số trang).

#### L12-3-09 · Ý tưởng chứng minh: hợp lý Bernoulli và entropy chéo

- **Loại:** ý tưởng chứng minh. **Thời lượng:** 2 phút. **Mật độ:** 52 âm tiết, 6 dòng, 1 công thức hiển thị.
- **Mặt trang dự kiến:**
  - Nhắc lại: $m^y(1-m)^{1-y}$ bằng $m$ khi $y=1$, bằng $1-m$ khi $y=0$ (Bài 11).
  - 1. Theo (4.1) và tính độc lập có điều kiện, $L(\theta)=\prod_i m_\theta(x_i)^{y_i}[1-m_\theta(x_i)]^{1-y_i}$.
  - 2. Mỗi nhân tử dương vì $m_\theta(x_i)\in(0,1)$ (giả thiết), nên mọi log hữu hạn.
  - 3. $\log(a^yb^{1-y})=y\log a+(1-y)\log b$; nhân với $-\frac1n<0$ được (5.1) và đảo thứ tự:
  - Công thức hiển thị: $$L(\theta)\ge L(\theta')\iff\hat L_n(\theta)\le\hat L_n(\theta')$$
  - 4. Hai tập nghiệm trùng nhau, kể cả khi cả hai rỗng.
- **Ghi chú diễn giả (dự thảo, 96 âm tiết):** Cùng lộ trình với Mệnh đề 12.2: lập hàm hợp lý theo (4.1), lấy log từng nhân tử, dùng tính tăng chặt của log. Hai điểm khác: số mũ $y_i$ gộp hai trường hợp nhãn vào một công thức (đã dùng ở Bài 11 cho mẫu Bernoulli), và giả thiết $m_\theta(x_i)\in(0,1)$ cần để mọi log hữu hạn; nếu một nhân tử bằng 0 thì log bằng $-\infty$. Mệnh đề không khẳng định có nghiệm: phép so sánh thứ tự đúng cả khi không tham số nào đạt cực tiểu; dữ liệu tách được là một trường hợp như vậy.
- **Lý do tồn tại:** NT6; nội dung khác 12.2 ở tập nghiệm có thể rỗng. **Khoảng trống được lấp:** Chỗ dùng giả thiết $m_\theta\in(0,1)$.
- **Nối:** ← Mệnh đề 12.6; → hai nhãn đối xứng. **Phần câu hỏi mạch:** ý tưởng chứng minh. **Mục tiêu học tập:** mục tiêu 1.
- **Nguồn:** Chứng minh Mệnh đề 12.6 (dòng 439–466). **Quyết định:** thêm.

#### L12-3-10 · Ví dụ: hai nhãn đối xứng

- **Loại:** ví dụ (Ví dụ 12.5, (5.2), Nhận xét 12.7), phản ví dụ. **Thời lượng:** 2,5 phút. **Mật độ:** 57 âm tiết, 6 dòng, 0 công thức hiển thị.
- **Mặt trang dự kiến:**
  - Dữ kiện: $(x_1,y_1)=(-1,0)$, $(x_2,y_2)=(1,1)$; $m_w(x)=\operatorname{sigm}(wx)$, không có hệ số tự do.
  - $w=0$: mỗi nhãn thật nhận xác suất $\tfrac12$, $\hat L_2(0)=\log2\approx0{,}6931$.
  - $w=\log3$: hai nhãn thật cùng nhận $\tfrac34$, $\hat L_2(\log3)=-\log\tfrac34\approx0{,}2877$.
  - Với mọi $w$: $\hat L_2(w)=\log(1+e^{-w})$ (5.2) giảm chặt về $0$, không đạt $0$.
  - Diễn giải: $w=1$ cho $wx_i>0$ khi $y_i=1$, $wx_i<0$ khi $y_i=0$ (tách được tuyến tính, linearly separable), nên hợp lý cực đại không có nghiệm hữu hạn.
  - Trong học máy, thêm $\lambda\lVert w\rVert^2$, $\lambda>0$, cho bài toán có nghiệm.
- **Ghi chú diễn giả (dự thảo, 103 âm tiết):** Xác suất mô hình gán cho nhãn thật tại $x=1$ là sigm(w), tại $x=-1$ là $1-\mathrm{sigm}(-w)=\mathrm{sigm}(w)$, nên (5.2); đạo hàm $-1/(1+e^w)<0$. Nhận xét 12.7: dữ liệu tách được tuyến tính nếu có w với $w^\top\phi(x_i)>0$ khi $y_i=1$ và $<0$ khi $y_i=0$; ở đây $w=1$. Khi đó thay w bằng cw với $c\to\infty$ đẩy mọi xác suất của nhãn thật về 1. Tính lồi của entropy chéo không bảo đảm tồn tại cực tiểu trên miền không bị chặn; thêm $\lambda\lVert w\rVert^2$, $\lambda>0$, tạo bài toán khác có nghiệm (Murphy (2022), §10.2.7), một lý do tối ưu để chính quy hóa. Với mọi $w>0$ nhãn sau ngưỡng đều đúng; tăng w chỉ làm mô hình tự tin hơn.
- **Lý do tồn tại:** NT4: phản ví dụ cho sự tồn tại nghiệm. **Khoảng trống được lấp:** Mục tiêu 1, phần 'không có nghiệm hữu hạn'.
- **Nối:** ← ý tưởng chứng minh; → bài tập của mạch. **Phần câu hỏi mạch:** ví dụ + phản ví dụ (phần 'tồn tại'). **Mục tiêu học tập:** mục tiêu 1.
- **Nguồn:** Ví dụ 12.5 (dòng 486–507); §5.3, (5.2), Nhận xét 12.7 (dòng 509–527); §9.3 ý 4. **Quyết định:** thêm; gộp Ví dụ 12.5 với §5.3 vì cùng dữ liệu.

#### L12-3-11 · Bài tập: hợp lý Gaussian khi khớp hoàn hảo (khi biên tập: đặt ngay sau L12-3-06, giữ ID)

- **Loại:** bài tập (lời giải bằng fragment). **Thời lượng:** 2,5 phút. **Mật độ:** 60 âm tiết, 4 dòng, 0 công thức hiển thị.
- **Mặt trang dự kiến:**
  - Câu hỏi: $(0,1)$, $(1,3)$, $(2,5)$; $Y_i\mid x_i\sim\mathcal N(w_0+w_1x_i,\sigma^2)$ độc lập có điều kiện (Bài tập 12.1, câu 4).
  - So sánh sự tồn tại nghiệm theo hệ số khi phương sai đã biết với sự tồn tại nghiệm hợp lý cực đại chung khi phương sai chưa biết.
  - Lời giải: $1+2x$ qua cả ba điểm, $A$ có hạng $2$: $\hat w=(1,2)$ duy nhất, $\sum_ir_i^2=0$.
  - Phương sai chưa biết: $-\log L=\tfrac32\log(2\pi\sigma^2)\to-\infty$ khi $\sigma^2\downarrow0$; không có nghiệm chung.
- **Ghi chú diễn giả (dự thảo, 126 âm tiết):** Câu 4 của Bài tập 12.1; dữ liệu thay đầu ra $(1,2,4)$ của đề bằng $(1,3,5)$. Gợi ý: dùng Nhận xét 12.4, ý 1, và Mệnh đề 12.3 cho hạng. Với phương sai đã biết, bài toán theo hệ số có nghiệm duy nhất; với phương sai chưa biết, hợp lý theo cả hệ số và phương sai không bị chặn trên, cùng hiện tượng với dữ liệu tách được của mô hình logistic. Tự làm: câu 2 cho $A^\top A=\begin{pmatrix}3&3\\3&5\end{pmatrix}$, $A^\top y=(7,10)^\top$, $\hat w=(\frac56,\frac32)$, phần dư $(\frac16,-\frac13,\frac16)$, SSE $=\frac16$; câu 3 cho $\hat\sigma^2=\mathrm{SSE}/3=\frac1{18}$. SSE là tổng bình phương phần dư (sum of squared errors). Bài 11 gặp cùng hiện tượng khi mọi số đo bằng nhau; ở đây khớp hoàn hảo đến từ một đường thẳng qua ba điểm, trong khi hệ số vẫn duy nhất.
- **Lý do tồn tại:** NT24: bài tập cụm mất mát từ hợp lý, kiểm mục tiêu 1, 2. **Khoảng trống được lấp:** Kiểm (E1) và sự tồn tại nghiệm chung.
- **Nối:** ← hai nhãn đối xứng; → bài tập entropy chéo. **Phần câu hỏi mạch:** kiểm tra. **Mục tiêu học tập:** mục tiêu 1, 2.
- **Nguồn:** Bài tập 12.1 câu 4 và lời giải (dòng 1314, 1361). **Quyết định:** thêm; chọn câu 4 vì kiểm đúng hiện tượng không có nghiệm hữu hạn của mục tiêu 1; đề giữ nguyên câu chữ, dòng dữ liệu viết lại đầu ra $(1,3,5)$ như câu 4.

#### L12-3-12 · Bài tập: entropy chéo khi cực tiểu không đạt được

- **Loại:** bài tập (lời giải bằng fragment). **Thời lượng:** 2,5 phút. **Mật độ:** 59 âm tiết, 5 dòng, 0 công thức hiển thị.
- **Mặt trang dự kiến:**
  - Câu hỏi: Hai cặp $(x_1,y_1)=(-2,0)$, $(x_2,y_2)=(1,1)$, độc lập có điều kiện; $m_w(x)=1/(1+e^{-wx})$, không có hệ số tự do (Bài tập 12.2, câu 3).
  - Chứng minh không có tham số hữu hạn đạt cực tiểu entropy chéo. Với $\eta\in(0,1)$, tìm một điều kiện đủ theo $w$ để mất mát không quá $\eta$.
  - Lời giải: theo (5.1), $\hat L_2(w)=\tfrac12\bigl[\log(1+e^{-2w})+\log(1+e^{-w})\bigr]>0$.
  - $\hat L_2'(w)<0$ và $\hat L_2(w)\to0$ khi $w\to+\infty$: cận dưới $0$ không đạt.
  - Với $w\ge0$, $\log(1+u)\le u$ cho $\hat L_2(w)\le e^{-w}$, nên $w\ge\log(1/\eta)$ đủ.
- **Ghi chú diễn giả (dự thảo, 42 âm tiết):** Gợi ý: dùng Mệnh đề 12.6 và $1-\operatorname{sigm}(z)=\operatorname{sigm}(-z)$; điểm $(-2,0)$ đóng góp $-\log\operatorname{sigm}(2w)=\log(1+e^{-2w})$, điểm $(1,1)$ đóng góp $\log(1+e^{-w})$. Đạo hàm $\hat L_2'(w)=-\frac12\bigl[\frac2{1+e^{2w}}+\frac1{1+e^w}\bigr]<0$. Với $w\ge0$: $\hat L_2(w)\le\frac12(e^{-2w}+e^{-w})\le e^{-w}$; $\log(1/\eta)>0$ vì $\eta<1$. Tự làm câu 2: $\hat L_2(0)=\log2\approx0{,}6931$, $\hat L_2(\log3)=\frac12\log\frac{40}{27}\approx0{,}1965$; với mọi $w>0$ rủi ro thực nghiệm 0–1 bằng 0, tại $w=0$ bằng $\frac12$. Mọi $w\ge\log(1/\eta)$ là nghiệm ERM gần đúng mức η của (6.5).
- **Lý do tồn tại:** NT24: bài tập có lời giải trên mặt trang cho cụm entropy chéo. **Khoảng trống được lấp:** Kiểm mục tiêu 1, vế 'không có nghiệm hữu hạn', trên dữ liệu khác ví dụ.
- **Nối:** ← bài tập Gaussian; → mạch 4: hai mục tiêu huấn luyện chỉ dùng dữ liệu đã thấy. **Phần câu hỏi mạch:** kiểm tra (cụm entropy chéo). **Mục tiêu học tập:** mục tiêu 1.
- **Nguồn:** Bài tập 12.2 câu 3 và lời giải (dòng 1384–1450). **Quyết định:** thêm theo cổng duyệt (T9); deck lên 60 trang, trần NT27.


### 6.4. Mạch 4: Rủi ro kỳ vọng và tối thiểu hóa rủi ro thực nghiệm (8 trang, 18,5 phút)

#### L12-4-00 · 4. Rủi ro kỳ vọng và tối thiểu hóa rủi ro thực nghiệm

- **Loại:** tiêu đề mạch. **Thời lượng:** 0,5 phút. **Mật độ:** 0 âm tiết, 0 dòng, 0 công thức hiển thị.
- **Mặt trang dự kiến:**
  - Dòng dẫn (`p.strand-lead`, 24 âm tiết): Sai số trên quan sát mới là một kỳ vọng theo phân phối, còn mẫu chỉ cho trung bình trên dữ liệu đã thấy.
  - Từ khóa (`p.strand-keys`): rủi ro kỳ vọng · rủi ro thực nghiệm · rủi ro Bayes · lớp ngưỡng
- **Ghi chú diễn giả (dự thảo, 74 âm tiết):** Hai mục tiêu huấn luyện của phần trước chỉ dùng dữ liệu đã thấy. Để nói về dữ liệu mới, đặt kỳ vọng theo phân phối đích, định nghĩa quy tắc tối thiểu hóa rủi ro thực nghiệm và tính chính xác hai loại rủi ro trên ví dụ cảm biến. Kết quả cần kiểm soát tiếp: hàm chọn từ mẫu có thể có rủi ro kỳ vọng khác xa rủi ro thực nghiệm.
- **Lý do tồn tại:** NT12. **Khoảng trống được lấp:** —
- **Nối:** ← lời giải bài tập Gaussian; → định nghĩa hai loại rủi ro. **Phần câu hỏi mạch:** điểm vào mạch 4; ngoài hành trình khái niệm. **Mục tiêu học tập:** mục tiêu 3.
- **Nguồn:** §6. **Quyết định:** thêm.

#### L12-4-01 · Rủi ro kỳ vọng và rủi ro thực nghiệm

- **Loại:** vấn đề + trực quan + định nghĩa (Định nghĩa 12.8). **Thời lượng:** 2,5 phút. **Mật độ:** 58 âm tiết, 6 dòng, 1 công thức hiển thị.
- **Mặt trang dự kiến:**
  - Ba bộ $h_0$, $h_{0{,}3}$, $g$ đúng bốn nhãn, khác nhau trên sản phẩm mới.
  - Trực quan. Kỳ vọng theo $P$ đo sai số trên dữ liệu mới, trung bình mẫu đo trên mẫu.
  - Định nghĩa. Rủi ro kỳ vọng (expected risk, population risk), rủi ro thực nghiệm (empirical risk):
  - Công thức hiển thị: $$R(h)=\mathbb E\bigl[\ell(h(X),Y)\bigr],\ (X,Y)\sim P\ (6.1);\qquad \hat R_S(h)=\frac1n\sum_{i=1}^n\ell\bigl(h(x_i),y_i\bigr)\ (6.2)$$
  - $R_{\mathcal H}^*=\inf_{h\in\mathcal H}R(h)$; rủi ro Bayes (Bayes risk) $R^*=\inf_hR(h)$, $h$ đo được.
  - Với $h$ chọn trước, $\mathbb E_S[\hat R_S(h)]=R(h)$; với $\hat h_S$ thì không.
- **Ghi chú diễn giả (dự thảo, 126 âm tiết):** Rủi ro kỳ vọng còn gọi là rủi ro tổng thể. Trong (6.1), h cố định và kỳ vọng lấy theo quan sát mới, nên R(h) là một số; khi S ngẫu nhiên, $\hat R_S(h)$ là biến ngẫu nhiên. $R_{\mathcal H}^*$ là rủi ro tốt nhất trong lớp. Với mất mát 0–1, $R(h)=\mathbb P(h(X)\ne Y)$. Trên ví dụ cảm biến, $R(h_0)=0$ nên $R^*=R_{\mathcal H_\uparrow}^*=0$, còn hai hàm hằng có rủi ro 1/2, nên $R_{\mathcal H_{\mathrm c}}^*=\frac12$. Đẳng thức kỳ vọng dùng tính tuyến tính của kỳ vọng và việc mỗi $(X_i,Y_i)$ có phân phối P; với $\hat h_S$ đẳng thức không còn áp dụng vì các số hạng $\ell(\hat h_S(X_i),Y_i)$ phụ thuộc S qua cả hàm dự đoán. Mệnh đề 12.9 (mở rộng): dưới mất mát 0–1, $h^*(x)=\mathbf 1_{\{q(x)\ge1/2\}}$ đạt rủi ro Bayes $\mathbb E[\min\{q(X),1-q(X)\}]$, với $q(x)=\mathbb P(Y=1\mid X=x)$; quy tắc này cần biết q nên chỉ là chuẩn so sánh.
- **Lý do tồn tại:** NT8: vấn đề + trực quan + định nghĩa của khái niệm trung tâm. **Khoảng trống được lấp:** Đại lượng đo sai số trên sản phẩm mới mà câu hỏi mở đầu cần.
- **Nối:** ← mạch 3; → ERM. **Phần câu hỏi mạch:** vấn đề + định nghĩa (phần 'đại lượng nào'). **Mục tiêu học tập:** mục tiêu 3.
- **Nguồn:** §6 mở đầu, §6.1, Định nghĩa 12.8 (dòng 531–579); §6.2 Mệnh đề 12.9 (dòng 581–626). **Quyết định:** thêm; Mệnh đề 12.9 và Ví dụ 12.6 (mục Mở rộng) chỉ ở ghi chú diễn giả.

#### L12-4-02 · Tối thiểu hóa rủi ro thực nghiệm

- **Loại:** định nghĩa (Định nghĩa 12.10). **Thời lượng:** 2,5 phút. **Mật độ:** 57 âm tiết, 5 dòng, 1 công thức hiển thị.
- **Mặt trang dự kiến:**
  - Hai mục tiêu huấn luyện quy về rủi ro thực nghiệm: (4.3) với $\ell(a,y)=(y-a)^2$, (5.1) với entropy chéo.
  - Định nghĩa. Với $\mathcal H$ chọn trước, tối thiểu hóa rủi ro thực nghiệm (empirical risk minimization, ERM) chọn
  - Công thức hiển thị: $$\hat h_S\in\operatorname*{argmin}_{h\in\mathcal H}\hat R_S(h)\quad(6.4)$$
  - Nghiệm ERM gần đúng mức $\eta\ge0$: $\hat R_S(\hat h_S)\le\inf_{h\in\mathcal H}\hat R_S(h)+\eta$ (6.5).
  - (6.5) có nghĩa cả khi cực tiểu không đạt, như entropy chéo trên dữ liệu tách được.
- **Ghi chú diễn giả (dự thảo, 88 âm tiết):** Với mất mát bình phương, (4.3) bằng $\frac n2\log(2\pi\sigma^2)+\frac n{2\sigma^2}\hat R_S(m_\theta)$; với entropy chéo, (5.1) chính là $\hat R_S(m_\theta)$. Như vậy cực đại hợp lý là tối thiểu hóa một rủi ro thực nghiệm; Mệnh đề 11.3 là trường hợp riêng với mất mát $-\log p_\theta(x)$. Với mất mát 0–1, ERM cực tiểu hóa tỉ lệ phân loại sai trên mẫu, một bài toán khác cực tiểu hóa entropy chéo. Trên hai nhãn đối xứng và $\eta>0$, mọi $w\ge\log(1/\eta)$ cho $\hat L_2(w)\le e^{-w}\le\eta$, nên là nghiệm gần đúng mức η dù không có nghiệm chính xác. Murphy (2022), §4.3 và §5.4.1.
- **Lý do tồn tại:** Định nghĩa quy tắc học trung tâm của bài. **Khoảng trống được lấp:** Nối mạch 3 (mục tiêu huấn luyện) với rủi ro thực nghiệm.
- **Nối:** ← hai loại rủi ro; → hàm ghi nhớ trên nhãn nhiễu. **Phần câu hỏi mạch:** định nghĩa (phần 'hàm chọn bằng rủi ro thực nghiệm nhỏ nhất'). **Mục tiêu học tập:** mục tiêu 3.
- **Nguồn:** §6.1 đoạn cuối (dòng 568), §6.3, Định nghĩa 12.10 (dòng 646–665). **Quyết định:** thêm.

#### L12-4-03 · Ví dụ: hàm ghi nhớ trên nhãn nhiễu

- **Loại:** ví dụ (Ví dụ 12.7). **Thời lượng:** 2,5 phút. **Mật độ:** 59 âm tiết, 5 dòng, 0 công thức hiển thị.
- **Mặt trang dự kiến:**
  - Câu hỏi: Tại sao không đo chất lượng của hàm trên tập huấn luyện đã dùng để chọn nó?
  - $X\sim\operatorname{Uniform}[0,1]$, $Y\sim\operatorname{Bernoulli}(\tfrac12)$ độc lập với $X$; mọi hàm đo được; mất mát $0$–$1$.
  - $\hat h_S$: nhãn đã thấy tại $x_i$, $0$ ở điểm khác; $\hat R_S(\hat h_S)=0$.
  - Nhãn mới là đồng xu công bằng khi biết $X$, $S$: $R(\hat h_S)=\tfrac12$.
  - Diễn giải: khoảng cách tổng quát hóa (generalization gap) $R(\hat h_S)-\hat R_S(\hat h_S)=\tfrac12$ do dùng nhãn để chọn hàm.
- **Ghi chú diễn giả (dự thảo, 86 âm tiết):** Với xác suất 1 các đầu vào huấn luyện khác nhau, nên $\hat h_S$ xác định và đo được. Với mọi h cố định, $\mathbb E_S[\hat R_S(h)]=R(h)=\frac12$. Mọi bộ phân loại ở đây có rủi ro 1/2, bằng rủi ro Bayes, nên sai lệch nằm ở phép đánh giá trên tập huấn luyện, không ở hàm được chọn. Ứng dụng: báo cáo rủi ro trên một tập kiểm thử không dùng khi huấn luyện; cận Hoeffding cho một hàm cố định là căn cứ của cách làm này. Murphy (2022), §5.4.1.1.
- **Lý do tồn tại:** Trả lời câu hỏi 'Câu hỏi.' của ghi chú bằng phép tính. **Khoảng trống được lấp:** Hàm chọn từ mẫu có độ lệch giữa hai rủi ro bằng 1/2.
- **Nối:** ← ERM; → lớp ngưỡng (rủi ro tính chính xác). **Phần câu hỏi mạch:** ví dụ (phần 'hàm chọn có rủi ro nhỏ không'). **Mục tiêu học tập:** mục tiêu 3.
- **Nguồn:** §6.1 Câu hỏi (dòng 570); Ví dụ 12.7 (dòng 667–679); §9.3 ý 2. **Quyết định:** thêm.

#### L12-4-04 · Rủi ro và tập nghiệm ERM của lớp ngưỡng

- **Loại:** trực quan + kết quả (Mệnh đề 12.11). **Thời lượng:** 2,5 phút. **Mật độ:** 60 âm tiết, 6 dòng, 1 công thức hiển thị.
- **Mặt trang dự kiến:**
  - Trực quan. $h_t$ sai trên đoạn giữa $t$ và $0$, xác suất của đoạn tỉ lệ độ dài.
  - Giả thiết: $X\sim\operatorname{Uniform}[-1,1]$, $Y=\mathbf 1_{\{X\ge0\}}$, lớp $\mathcal H_\uparrow$, mất mát $0$–$1$; mẫu có điểm âm và không âm, $x_-=\max\{x_i:x_i<0\}$, $x_+=\min\{x_i:x_i\ge0\}$.
  - Kết luận:
  - Công thức hiển thị: $$R(h_t)=\frac{\min\{\lvert t\rvert,1\}}2,\quad t\in\mathbb R\quad(6.6)$$
  - và tập nghiệm ERM $\{h_t:\ x_-<t\le x_+\}$ (6.7), rủi ro thực nghiệm cực tiểu $0$ (Mệnh đề 12.11).
  - Ý nghĩa: ERM chỉ xác định ngưỡng đến một khoảng có rủi ro kỳ vọng khác nhau.
- **Ghi chú diễn giả (dự thảo, 92 âm tiết):** Ví dụ trực quan: $h_{0{,}3}$ sai đúng khi $0\le X<0{,}3$, xác suất $0{,}3\cdot\frac12=0{,}15$. Trên mẫu hữu hạn, dấu ≥ trong $h_t$ quyết định nhãn của điểm mẫu nằm đúng tại t, nên hai đầu của tập nghiệm phải xét riêng: đầu phải $x_+$ thuộc tập nghiệm, đầu trái $x_-$ không thuộc. Trong học máy, đây là trường hợp tối ưu thực nghiệm đã giải trọn vẹn nhưng lựa chọn giữa các nghiệm vẫn ảnh hưởng chất lượng dự đoán; quy tắc phá hòa (chọn t nhỏ nhất hay lớn nhất) không tạo thêm thông tin về vị trí ngưỡng thật.
- **Lý do tồn tại:** Kết quả chính 3, rủi ro tính chính xác (Q4 cốt lõi). **Khoảng trống được lấp:** Lượng hóa 'cùng rủi ro thực nghiệm, khác rủi ro kỳ vọng'.
- **Nối:** ← hàm ghi nhớ; → ý tưởng chứng minh. **Phần câu hỏi mạch:** trực quan + phát biểu. **Mục tiêu học tập:** mục tiêu 3.
- **Nguồn:** §6.4, Mệnh đề 12.11 (dòng 681–705). **Quyết định:** thêm.

#### L12-4-05 · Ý tưởng chứng minh: rủi ro và tập nghiệm ERM của lớp ngưỡng

- **Loại:** ý tưởng chứng minh. **Thời lượng:** 2,5 phút. **Mật độ:** 57 âm tiết, 6 dòng, 1 công thức hiển thị.
- **Mặt trang dự kiến:**
  - 1. Rủi ro: tích phân mật độ $\tfrac12$ trên $[0,t)$ hoặc $[t,0)$; $\lvert t\rvert>1$ cho hàm hằng.
  - 2. Điểm âm có nhãn $0$; mọi điểm âm đúng khi và chỉ khi $t>x_-$.
  - 3. Điểm không âm có nhãn $1$; mọi điểm đó đúng khi và chỉ khi $t\le x_+$.
  - 4. Mẫu có cả hai loại điểm (giả thiết), nên $x_-<0\le x_+$ và
  - Công thức hiển thị: $$\{h_t:\ \hat R_S(h_t)=0\}=\{h_t:\ x_-<t\le x_+\}\ne\varnothing$$
  - Ngoài khoảng, ít nhất một nhãn sai: $\hat R_S(h_t)\ge\tfrac1n$.
- **Ghi chú diễn giả (dự thảo, 77 âm tiết):** Bước 1 xét ba trường hợp và gộp thành (6.6): với $0<t\le1$ sai khi $0\le x<t$, rủi ro $t/2$; với $-1\le t<0$ sai khi $t\le x<0$, rủi ro $-t/2$; $t=0$ trùng nhãn thật. Khi $t>1$, $h_t\equiv0$ trên [-1,1]; khi $t<-1$, $h_t\equiv1$. Bước 4 là chỗ dùng giả thiết về mẫu: nếu mẫu không có điểm âm thì $x_-$ không xác định, tập nghiệm thành $\{t\le x_+\}$. Mỗi t trong khoảng cho rủi ro thực nghiệm 0, giá trị nhỏ nhất vì mất mát không âm; mỗi t ngoài khoảng sai ít nhất một nhãn.
- **Lý do tồn tại:** NT6. **Khoảng trống được lấp:** Chỉ chỗ dùng giả thiết mẫu có hai loại điểm.
- **Nối:** ← Mệnh đề 12.11; → bảng trên bốn sản phẩm. **Phần câu hỏi mạch:** ý tưởng chứng minh. **Mục tiêu học tập:** mục tiêu 3.
- **Nguồn:** Chứng minh Mệnh đề 12.11 (dòng 707–724). **Quyết định:** thêm.

#### L12-4-06 · Ví dụ: hai loại rủi ro của các ngưỡng trên bốn sản phẩm

- **Loại:** ví dụ (Ví dụ 12.8, Hình 12.1). **Thời lượng:** 3 phút. **Mật độ:** 35 âm tiết, 4 dòng, 0 công thức hiển thị.
- **Mặt trang dự kiến:**
  - Dữ kiện: $X\sim\operatorname{Uniform}[-1,1]$, $Y=\mathbf 1_{\{X\ge0\}}$, bốn sản phẩm $(-0{,}8;0)$, $(-0{,}2;0)$, $(0{,}3;1)$, $(0{,}7;1)$; $x_-=-0{,}2$, $x_+=0{,}3$.
  - Bảng (mỗi dòng dưới đây là một hàng, ô ngăn bằng |):
    - Ngưỡng $t$ | $\hat R_S(h_t)$ | $R(h_t)$
    - $-0{,}2$ | $\frac14$ | $0{,}1$
    - $-0{,}1$ | $0$ | $0{,}05$
    - $0$ | $0$ | $0$
    - $0{,}3$ | $0$ | $0{,}15$
    - $0{,}4$ | $\frac14$ | $0{,}2$
  - Hình: `img/lec-12/deck-threshold-risks.svg (mới)` (xem mục 8)
  - Diễn giải: $t=-0{,}1;\ 0;\ 0{,}3$ cùng có $\hat R_S=0$ nhưng $R=0{,}05;\ 0;\ 0{,}15$; mẫu không phân biệt được chúng.
  - Trong học máy, quy tắc phá hòa giữa các nghiệm ERM không thêm thông tin về ngưỡng thật.
- **Ghi chú diễn giả (dự thảo, 78 âm tiết):** Tập nghiệm ERM gồm $h_t$ với $-0{,}2<t\le0{,}3$. Tại $t=-0{,}2$, điểm $x_2=-0{,}2$ thỏa $x_2\ge t$ nên bị dự đoán thành 1: đầu trái không thuộc tập nghiệm. Tại $t=0{,}3$, điểm $x_3=0{,}3$ vẫn được dự đoán 1: đầu phải thuộc tập nghiệm. Hình: rủi ro kỳ vọng dạng chữ V với đỉnh tại $t=0$; rủi ro thực nghiệm là hàm bậc thang, bằng 0 trên $(-0{,}2;\,0{,}3]$, trong khi đường chữ V trên khoảng đó thay đổi từ 0 đến 0,15. Hàm $h_{0{,}3}$ của câu hỏi mở đầu có rủi ro 0,15.
- **Lý do tồn tại:** Áp Mệnh đề 12.11 lên ví dụ xuyên suốt (NT23). **Khoảng trống được lấp:** Trả lời một phần câu hỏi mở đầu: $h_0$ và $h_{0{,}3}$ khác nhau 0,15.
- **Nối:** ← ý tưởng chứng minh; → bài tập. **Phần câu hỏi mạch:** ví dụ (phần 'hàm chọn có rủi ro nhỏ không', lớp ngưỡng). **Mục tiêu học tập:** mục tiêu 3.
- **Nguồn:** Ví dụ 12.8 (dòng 726–748); Hình 12.1 (dòng 750–754); hình mới vẽ lại Hình 12.1. **Quyết định:** thêm; bảng và hình chung một trang (lưới hai cột).

#### L12-4-07 · Bài tập: rủi ro chính xác của bộ phân loại ngưỡng

- **Loại:** bài tập (lời giải bằng fragment). **Thời lượng:** 2,5 phút. **Mật độ:** 60 âm tiết, 6 dòng, 0 công thức hiển thị.
- **Mặt trang dự kiến:**
  - Câu hỏi: $X\sim\operatorname{Uniform}[-1,1]$, $Y=\mathbf 1_{\{X\ge0\}}$, $h_t(x)=\mathbf 1_{\{x\ge t\}}$ với $t\in[-1,1]$, mất mát $0$–$1$ (Bài tập 12.3).
  - (a) Dùng (6.6), tính $R(h_{-0{,}4})$ và $R(h_{0{,}2})$.
  - (b) Với tập huấn luyện $(-0{,}9;0)$, $(-0{,}1;0)$, $(0{,}4;1)$, $(0{,}8;1)$, tìm toàn bộ nghiệm ERM, xác định đúng hai đầu khoảng, cho hai nghiệm có rủi ro kỳ vọng khác nhau.
  - Lời giải: (a) $R(h_{-0{,}4})=\tfrac{0{,}4}2=0{,}2$, $R(h_{0{,}2})=\tfrac{0{,}2}2=0{,}1$.
  - (b) $x_-=-0{,}1$, $x_+=0{,}4$: nghiệm ERM là $h_t$ với $-0{,}1<t\le0{,}4$.
  - $t=0$ có rủi ro $0$, $t=0{,}4$ có rủi ro $0{,}2$; cả hai có rủi ro thực nghiệm $0$.
- **Ghi chú diễn giả (dự thảo, 70 âm tiết):** Câu 3 và 4 của Bài tập 12.3 để tự làm. Gợi ý: xác định đoạn mà $h_t$ khác nhãn thật rồi tích phân mật độ trên đoạn đó. Đáp số câu 3: với mật độ $f_X(x)=\frac{x+1}2$, $R_f(h_t)=\frac{t(t+2)}4$ khi $t\ge0$ và $\frac{|t|(2-|t|)}4$ khi $t<0$; $R_f(h_{-0{,}4})=0{,}16$, $R_f(h_{0{,}2})=0{,}11$; công thức $|t|/2$ dùng mật độ hằng 1/2. Câu 4: quy tắc ghi nhớ có rủi ro thực nghiệm 0 và rủi ro kỳ vọng $\mathbb P_f(X\ge0)=\frac34$; ngưỡng $t=0$ có cả hai rủi ro bằng 0.
- **Lý do tồn tại:** NT24: bài tập cụm rủi ro và ERM, lời giải trên mặt trang (fragment). **Khoảng trống được lấp:** Kiểm mục tiêu 3 trên dữ liệu khác ví dụ.
- **Nối:** ← bảng bốn sản phẩm; → mạch 5: kiểm soát đồng thời. **Phần câu hỏi mạch:** kiểm tra. **Mục tiêu học tập:** mục tiêu 3.
- **Nguồn:** Bài tập 12.3 và lời giải (dòng 1454–1509). **Quyết định:** thêm; câu (a), (b) hai dòng riêng, trang sáu dòng; dòng (b) giữ câu chữ đề (ngoại lệ độ dài dòng, mục 12).


### 6.5. Mạch 5: Hội tụ đều và rủi ro dư (11 trang, 27 phút)

#### L12-5-00 · 5. Hội tụ đều và rủi ro dư

- **Loại:** tiêu đề mạch. **Thời lượng:** 0,5 phút. **Mật độ:** 0 âm tiết, 0 dòng, 0 công thức hiển thị.
- **Mặt trang dự kiến:**
  - Dòng dẫn (`p.strand-lead`, 22 âm tiết): Khi mọi hàm của lớp có hai rủi ro gần nhau, hàm chọn từ mẫu cũng có hai rủi ro gần nhau.
  - Từ khóa (`p.strand-keys`): độ lệch đều · lớp hữu hạn · rủi ro dư · ba nguồn sai số
- **Ghi chú diễn giả (dự thảo, 81 âm tiết):** Hàm chọn bằng ERM có thể có rủi ro kỳ vọng khác xa rủi ro thực nghiệm, còn cận cho một hàm cố định không áp dụng cho hàm chọn từ mẫu. Bước tiếp theo là kiểm soát đồng thời mọi hàm của một lớp hữu hạn, chuyển kiểm soát đó thành cận rủi ro dư của ERM gần đúng, rồi tách rủi ro dư thành ba nguồn sai số. Giới hạn còn lại: cận cần số hàm M hữu hạn.
- **Lý do tồn tại:** NT12. **Khoảng trống được lấp:** —
- **Nối:** ← bài tập ngưỡng; → độ lệch đều. **Phần câu hỏi mạch:** điểm vào mạch 5; ngoài hành trình khái niệm. **Mục tiêu học tập:** mục tiêu 4.
- **Nguồn:** §7. **Quyết định:** thêm.

#### L12-5-01 · Độ lệch đều

- **Loại:** vấn đề + trực quan + định nghĩa (Định nghĩa 12.12). **Thời lượng:** 2,5 phút. **Mật độ:** 53 âm tiết, 6 dòng, 1 công thức hiển thị.
- **Mặt trang dự kiến:**
  - Nhắc lại: với $h$ chọn trước, (G1), (G2): $\mathbb P_S(\lvert\hat R_S(h)-R(h)\rvert\ge\varepsilon)\le2e^{-2n\varepsilon^2}$ (7.1).
  - Với $h=\hat h_S$, các mất mát phụ thuộc mọi quan sát qua $\hat h_S$, nên không độc lập.
  - Trực quan. Lớp càng nhiều hàm, càng dễ có hàm có rủi ro thực nghiệm thấp do ngẫu nhiên.
  - Định nghĩa. Độ lệch đều (uniform deviation):
  - Công thức hiển thị: $$\Delta_S=\sup_{h\in\mathcal H}\bigl\lvert R(h)-\hat R_S(h)\bigr\rvert\quad(7.2)$$
  - Trên $\{\Delta_S\le\varepsilon\}$, mọi $h\in\mathcal H$, kể cả $\hat h_S$, có $\lvert R(h)-\hat R_S(h)\rvert\le\varepsilon$.
- **Ghi chú diễn giả (dự thảo, 80 âm tiết):** (7.1) là Định lý 05c.52 viết theo ký hiệu rủi ro: đặt $Z_i=\ell(h(X_i),Y_i)$; vì h cố định, các $Z_i$ độc lập, cùng phân phối, thuộc [0,1], và Hoeffding với $V=n$ cho $2e^{-2n\varepsilon^2}$. Lập luận hỏng khi $h=\hat h_S$. Tính hội tụ đều (uniform convergence): với mọi $\varepsilon,\delta\in(0,1)$ có cỡ mẫu $N_{\mathcal H}(\varepsilon,\delta)$ không phụ thuộc P sao cho với mọi P và mọi $n\ge N_{\mathcal H}$, $\mathbb P_S(\Delta_S\le\varepsilon)\ge1-\delta$ (7.3); P cố định trước, xác suất lấy theo $S\sim P^n$. Các biến cố được giả sử đo được. Shalev-Shwartz và Ben-David (2014), Định nghĩa 4.1 và 4.3.
- **Lý do tồn tại:** NT8: vấn đề (giới hạn của cận một hàm) → trực quan → định nghĩa. **Khoảng trống được lấp:** Đại lượng kiểm soát được cả hàm chọn từ mẫu.
- **Nối:** ← mạch 4; → độ lệch đều của ba lớp. **Phần câu hỏi mạch:** vấn đề + định nghĩa (phần 'khi nào hai rủi ro gần nhau'). **Mục tiêu học tập:** mục tiêu 4.
- **Nguồn:** §7 mở đầu, §7.1 Nhắc lại Định lý 05c.52 và (7.1), §7.2 Định nghĩa 12.12 (dòng 760–816). **Quyết định:** thêm; (7.3) chỉ ở ghi chú diễn giả và trang Định lý 12.13 — xem ngoại lệ mật độ.

#### L12-5-02 · Ví dụ: độ lệch đều của ba lớp trên bốn sản phẩm

- **Loại:** ví dụ (Ví dụ 12.9). **Thời lượng:** 2,5 phút. **Mật độ:** 53 âm tiết, 6 dòng, 0 công thức hiển thị.
- **Mặt trang dự kiến:**
  - Dữ kiện: $X\sim\operatorname{Uniform}[-1,1]$, $Y=\mathbf 1_{\{X\ge0\}}$, mất mát $0$–$1$, bốn sản phẩm $(-0{,}8;0)$, $(-0{,}2;0)$, $(0{,}3;1)$, $(0{,}7;1)$.
  - $\mathcal H_{\mathrm c}$: mỗi hàm hằng có $R=\hat R_S=\tfrac12$, nên $\Delta_S=0$.
  - $\mathcal H_\uparrow$: $\lvert R-\hat R_S\rvert$ lớn nhất bằng $0{,}15$, tại $t=0{,}3$ ($0{,}15-0$) và $t=-0{,}2$ ($\lvert0{,}1-0{,}25\rvert$), nên $\Delta_S=0{,}15$.
  - $\mathcal H_{\mathrm{all}}$: $\tilde h$ trùng $\mathbf 1_{\{x\ge0\}}$ trừ bốn điểm mẫu, đổi nhãn tại đó: $\hat R_S(\tilde h)=1$, $R(\tilde h)=0$; mọi rủi ro thuộc $[0,1]$, nên $\Delta_S=1$.
  - Kiểm tra: $\mathcal H_{\mathrm c}\subset\mathcal H_\uparrow\subset\mathcal H_{\mathrm{all}}$ cho $0\le0{,}15\le1$.
  - Diễn giải: lớp mọi hàm đo được chứa hàm có rủi ro thực nghiệm sai lệch hoàn toàn.
- **Ghi chú diễn giả (dự thảo, 79 âm tiết):** Lớp ngưỡng: giữa hai điểm mẫu liên tiếp, $\hat R_S(h_t)$ không đổi, còn $R(h_t)$ đơn điệu trên mỗi khoảng không chứa 0 và có dạng chữ V trên khoảng chứa 0, nên cận trên đúng của $|R-\hat R_S|$ trên mỗi khoảng đạt hoặc được tiến tới tại một đầu mút. Năm khoảng của t (Phụ lục A): $t\le-0{,}8$ cho 0,1; $(-0{,}8;-0{,}2]$ cho 0,15 tại $-0{,}2$; $(-0{,}2;0{,}3]$ cho 0,15 tại 0,3; $(0{,}3;0{,}7]$ cho 0,1; $t>0{,}7$ tiến tới 0,15, không đạt. Hàm $\tilde h$ chỉ khác nhãn thật trên một tập xác suất 0.
- **Lý do tồn tại:** Ví dụ xuyên suốt cho định nghĩa (NT23); số dùng lại ở Ví dụ 12.11 và Tổng kết. **Khoảng trống được lấp:** Δ_S tăng theo độ linh hoạt của lớp.
- **Nối:** ← độ lệch đều; → Định lý 12.13. **Phần câu hỏi mạch:** ví dụ. **Mục tiêu học tập:** mục tiêu 4, 6.
- **Nguồn:** Ví dụ 12.9 (dòng 818–839); Phụ lục A (dòng 1563–1577). **Quyết định:** thêm.

#### L12-5-03 · Hội tụ đều cho lớp hữu hạn

- **Loại:** kết quả (Định lý 12.13). **Thời lượng:** 2,5 phút. **Mật độ:** 47 âm tiết, 5 dòng, 1 công thức hiển thị.
- **Mặt trang dự kiến:**
  - Giả thiết: (G1) $S\sim P^n$; (G2) $\ell(a,y)\in[0,1]$; (G3) $\mathcal H$ gồm $M\ge1$ hàm đo được, cố định trước khi lấy mẫu.
  - Bảo đảm: với mọi $\varepsilon>0$,
  - Công thức hiển thị: $$\mathbb P_S(\Delta_S>\varepsilon)\le2Me^{-2n\varepsilon^2}\quad(7.4)$$
  - Với $\delta\in(0,1)$ và $\varepsilon_n(M,\delta)=\sqrt{\log(2M/\delta)/(2n)}$ (7.5): với xác suất ít nhất $1-\delta$ theo $S$, mọi $h\in\mathcal H$ có $\lvert R(h)-\hat R_S(h)\rvert\le\varepsilon_n$ (Định lý 12.13).
  - Nói riêng, với mọi $P$ và mọi $n\ge N_{\mathcal H}(\varepsilon,\delta)=\lceil\log(2M/\delta)/(2\varepsilon^2)\rceil$, $\mathbb P_S(\Delta_S\le\varepsilon)\ge1-\delta$ (7.3): $\mathcal H$ có tính hội tụ đều (uniform convergence).
- **Ghi chú diễn giả (dự thảo, 91 âm tiết):** Loại bảo đảm: xác suất cao theo việc lấy tập huấn luyện, đồng thời cho mọi hàm của lớp. Trong (7.3), P cố định trước, xác suất lấy theo $S\sim P^n$, và $N_{\mathcal H}$ không phụ thuộc P. Cận phụ thuộc n, log M và log(1/δ), không phụ thuộc P. Với M = 1, (7.4) trở về (7.1) với dấu >; với M > 1 cận lớn hơn một thừa số M. Murphy (2022), §5.4.4.1 (Định lý 5.4.1), chứng minh cùng cận cho mất mát 0–1; Shalev-Shwartz và Ben-David (2014), §4.2, cho mất mát bị chặn tổng quát.
- **Lý do tồn tại:** Kết quả chính 4 (Q4 cốt lõi). **Khoảng trống được lấp:** Cận đồng thời cho lớp hữu hạn.
- **Nối:** ← ba lớp; → ý tưởng chứng minh. **Phần câu hỏi mạch:** phát biểu. **Mục tiêu học tập:** mục tiêu 4.
- **Nguồn:** §7.3, Định lý 12.13 (dòng 841–866). **Quyết định:** thêm; ngoại lệ mật độ nếu vượt 60 (xem bảng).

#### L12-5-04 · Ý tưởng chứng minh: hội tụ đều cho lớp hữu hạn

- **Loại:** ý tưởng chứng minh. **Thời lượng:** 3 phút. **Mật độ:** 59 âm tiết, 6 dòng, 1 công thức hiển thị.
- **Mặt trang dự kiến:**
  - 1. Biến cố xấu $E_h=\{\lvert R(h)-\hat R_S(h)\rvert>\varepsilon\}$; lớp hữu hạn nên $\{\Delta_S>\varepsilon\}=\bigcup_{h\in\mathcal H}E_h$.
  - 2. Mỗi $h$ cố định trước khi lấy mẫu (giả thiết (G3)), nên (7.1) cho $\mathbb P_S(E_h)\le2e^{-2n\varepsilon^2}$.
  - 3. Bất đẳng thức hợp cho $M$ biến cố (Hệ quả 10.7, quy nạp):
  - Công thức hiển thị: $$\mathbb P_S(\Delta_S>\varepsilon)\le\sum_{h\in\mathcal H}\mathbb P_S(E_h)\le2Me^{-2n\varepsilon^2}$$
  - 4. Giải $2Me^{-2n\varepsilon^2}=\delta$ theo $\varepsilon$ được (7.5).
  - Kỹ thuật. Cận một hàm cố định cộng bất đẳng thức hợp; cận cho cả lớp lớn gấp $M$ lần.
- **Ghi chú diễn giả (dự thảo, 93 âm tiết):** Bước 2 là chỗ dùng (G3). Phản ví dụ khi bỏ (G3): chọn lớp $\{\tilde h\}$ sau khi xem S, với $\tilde h$ đổi nhãn tại các điểm mẫu như ở ví dụ ba lớp; M = 1 nhưng $\Delta_S=1$, trong khi vế phải của (7.4) bằng $2e^{-2n\varepsilon^2}<1$. Bước 3 không cần các biến cố độc lập. Bước 4: $2Me^{-2n\varepsilon^2}\le\delta$ khi và chỉ khi $n\ge\log(2M/\delta)/(2\varepsilon^2)$; với $\varepsilon=\varepsilon_n$, vế phải của (7.4) bằng δ. Chọn trong M hàm định trước chỉ làm cận tăng theo log M. Kỹ thuật này dùng lại ở Bài tập 12.10 (mất mát trong [a,b]) và Bài tập 12.15.
- **Lý do tồn tại:** NT6; NT7: kỹ thuật lần đầu trong các deck của học phần (Hoeffding và bất đẳng thức hợp đã có, cách ghép là mới). **Khoảng trống được lấp:** Chỗ dùng (G3).
- **Nối:** ← Định lý 12.13; → cỡ mẫu cho 100 bộ phân loại. **Phần câu hỏi mạch:** ý tưởng chứng minh. **Mục tiêu học tập:** mục tiêu 4.
- **Nguồn:** Chứng minh Định lý 12.13 (dòng 868–908). **Quyết định:** thêm.

#### L12-5-05 · Ví dụ: cỡ mẫu cho một lớp 100 bộ phân loại

- **Loại:** ví dụ (Ví dụ 12.10), ứng dụng. **Thời lượng:** 2,5 phút. **Mật độ:** 39 âm tiết, 6 dòng, 0 công thức hiển thị.
- **Mặt trang dự kiến:**
  - Dữ kiện: $M=100$ bộ phân loại cố định, mất mát $0$–$1$, dữ liệu i.i.d.; $\varepsilon=0{,}05$, $\delta=0{,}05$.
  - Tính $\log(2M/\delta)=\log4000\approx8{,}294$.
  - Cỡ mẫu đủ: $n\ge\dfrac{8{,}294}{2\cdot0{,}05^2}\approx1658{,}8$, nên $N_{\mathcal H}(0{,}05;0{,}05)=1659$.
  - Kiểm tra: $n=1659$ cho vế phải (7.4) $\approx0{,}04995\le0{,}05$; $n=1658$ cho $\approx0{,}05020$.
  - Cỡ mẫu cho trước $n=1000$: $\varepsilon_{1000}(100;0{,}05)=\sqrt{8{,}294/2000}\approx0{,}0644$.
  - Diễn giải: cận giảm theo $1/\sqrt n$; nhân $M$ lên $10$ lần chỉ cộng $\log10\approx2{,}30$ vào $\log(2M/\delta)$.
- **Ghi chú diễn giả (dự thảo, 70 âm tiết):** Ứng dụng: chọn siêu tham số trên một lưới hữu hạn M điểm là chọn trong một lớp hữu hạn định trước; Định lý 12.13 cho cái giá log M của việc chọn mà vẫn kiểm soát độ lệch của mô hình được chọn. Số 1659 đủ cho bất đẳng thức này; cỡ mẫu nhỏ nhất cần thiết có thể nhỏ hơn. Vế phải của (7.4) tại n = 1659 là $200e^{-2\cdot1659\cdot0{,}0025}$.
- **Lý do tồn tại:** Đọc Định lý 12.13 bằng số; ứng dụng AI (lưới siêu tham số). **Khoảng trống được lấp:** Độ lớn của n và vai trò của log M.
- **Nối:** ← ý tưởng chứng minh; → rủi ro dư. **Phần câu hỏi mạch:** ví dụ + ứng dụng. **Mục tiêu học tập:** mục tiêu 4.
- **Nguồn:** §7.3 đoạn sau định lý (dòng 910); Ví dụ 12.10 (dòng 912–934); §9.3 ý 3. **Quyết định:** thêm.

#### L12-5-06 · Rủi ro dư của ERM trên lớp hữu hạn

- **Loại:** kết quả (Hệ quả 12.15; Bổ đề 12.14 làm công cụ). **Thời lượng:** 2,5 phút. **Mật độ:** 55 âm tiết, 5 dòng, 1 công thức hiển thị.
- **Mặt trang dự kiến:**
  - Trực quan. Độ lệch đều so mỗi hàm với chính nó; rủi ro dư (excess risk) $R(\hat h_S)-R_{\mathcal H}^*$ so hàm chọn với hàm tốt nhất.
  - Giả thiết: giả thiết của Định lý 12.13; (E2) với mọi mẫu $S$, $\hat h_S$ là nghiệm ERM gần đúng mức $\eta\ge0$.
  - Bảo đảm: với xác suất ít nhất $1-\delta$ theo $S\sim P^n$,
  - Công thức hiển thị: $$R(\hat h_S)-R_{\mathcal H}^*\le2\varepsilon_n(M,\delta)+\eta\quad(7.7)$$
  - Nếu $\eta=0$ và $n\ge2\log(2M/\delta)/\varepsilon^2$ thì $\mathbb P_S(R(\hat h_S)\le R_{\mathcal H}^*+\varepsilon)\ge1-\delta$ (Hệ quả 12.15).
- **Ghi chú diễn giả (dự thảo, 67 âm tiết):** Hệ quả tách phần do tối ưu hóa (η) khỏi phần do lấy mẫu ($2\varepsilon_n$): giải tối ưu chính xác hơn làm giảm η nhưng không làm giảm $\varepsilon_n$; giảm η hay $\varepsilon_n$ đều không đổi $R_{\mathcal H}^*$. Ví dụ: với n = 1000, M = 100, δ = 0,05, ERM chính xác có rủi ro dư không quá 0,129 với xác suất ít nhất 0,95; số 0,129 là $2\cdot0{,}0644$, với $\varepsilon_{1000}(100;0{,}05)\approx0{,}0644$ từ ví dụ cỡ mẫu.
- **Lý do tồn tại:** Kết quả chính 5 (Q4: hệ quả rủi ro dư của ERM). **Khoảng trống được lấp:** Từ độ lệch đều sang chất lượng của hàm chọn.
- **Nối:** ← cỡ mẫu; → ý tưởng chứng minh. **Phần câu hỏi mạch:** phát biểu (phần 'rủi ro dư bị chặn bao nhiêu'). **Mục tiêu học tập:** mục tiêu 4.
- **Nguồn:** §7.4 mở đầu, Hệ quả 12.15 (dòng 936–1011); §11 Lời giải câu hỏi phụ (dòng 1537–1539). **Quyết định:** thêm; ngoại lệ mật độ nếu vượt 60 (xem bảng).

#### L12-5-07 · Ý tưởng chứng minh: rủi ro dư của ERM trên lớp hữu hạn

- **Loại:** ý tưởng chứng minh (gồm Bổ đề 12.14). **Thời lượng:** 3 phút. **Mật độ:** 59 âm tiết, 6 dòng, 1 công thức hiển thị.
- **Mặt trang dự kiến:**
  - 1. Biến cố $G=\{\Delta_S\le\varepsilon_n(M,\delta)\}$ có xác suất $\ge1-\delta$ (Định lý 12.13).
  - 2. Trên $G$ (Bổ đề 12.14 với $\varepsilon=\varepsilon_n$; (E2) ở bất đẳng thức thứ hai), mọi $h$:
  - Công thức hiển thị: $$R(\hat h_S)\le\hat R_S(\hat h_S)+\varepsilon_n\le\inf_{h'}\hat R_S(h')+\eta+\varepsilon_n\le\hat R_S(h)+\eta+\varepsilon_n\le R(h)+2\varepsilon_n+\eta$$
  - 3. Lấy cận dưới đúng theo $h$ được (7.7).
  - 4. Với $\eta=0$: $2\varepsilon_n\le\varepsilon$ khi và chỉ khi $n\ge2\log(2M/\delta)/\varepsilon^2$.
  - Kỹ thuật. Chèn một đại lượng trung gian rồi chuyển vế; so với phần tử bất kỳ rồi lấy cận dưới đúng.
- **Ghi chú diễn giả (dự thảo, 119 âm tiết):** Đại lượng trung gian là rủi ro thực nghiệm. Chuỗi ở bước 2 dùng độ lệch đều hai lần (cho $\hat h_S$ ở bất đẳng thức đầu, cho h ở bất đẳng thức cuối), nên hệ số 2 trước $\varepsilon_n$. So với một h bất kỳ rồi mới lấy cận dưới đúng, nên không cần $R_{\mathcal H}^*$ đạt được. Bất đẳng thức thứ hai dùng (6.5), tức giả thiết (E2); bất đẳng thức thứ ba dùng định nghĩa cận dưới đúng. Bổ đề 12.14 là phát biểu tất định: trên mọi mẫu có $\Delta_S\le\varepsilon$ và hàm chọn là nghiệm gần đúng mức η. Xác suất chỉ vào ở bước 1. Bước 4 bình phương hai vế không âm: $\frac{\log(2M/\delta)}{2n}\le\frac{\varepsilon^2}4$. Shalev-Shwartz và Ben-David (2014), Bổ đề 4.2.
- **Lý do tồn tại:** NT6; Bổ đề 12.14 là công cụ nên đặt làm bước 2. **Khoảng trống được lấp:** Nguồn gốc hệ số 2 và chỗ dùng (E2).
- **Nối:** ← Hệ quả 12.15; → ba nguồn sai số. **Phần câu hỏi mạch:** ý tưởng chứng minh. **Mục tiêu học tập:** mục tiêu 4.
- **Nguồn:** Bổ đề 12.14 và chứng minh (dòng 940–970); chứng minh Hệ quả 12.15 (dòng 991–1009). **Quyết định:** thêm; công thức bước 2 ngắt bằng aligned ở 390 px.

#### L12-5-08 · Ba nguồn sai số

- **Loại:** kết quả (Mệnh đề 12.16). **Thời lượng:** 2,5 phút. **Mật độ:** 59 âm tiết, 6 dòng, 1 công thức hiển thị.
- **Mặt trang dự kiến:**
  - Giả thiết: (G2); $\hat h_S\in\mathcal H$ có sai số tối ưu hóa (optimization error) $\eta_S=\hat R_S(\hat h_S)-\inf_{h\in\mathcal H}\hat R_S(h)$.
  - Bảo đảm: tất định, trên mọi mẫu $S$,
  - Công thức hiển thị: $$R(\hat h_S)-R^*\le\bigl(R_{\mathcal H}^*-R^*\bigr)+2\Delta_S+\eta_S\quad(7.8)$$
  - $R_{\mathcal H}^*-R^*$: sai số xấp xỉ (approximation error) của lớp;
  - $2\Delta_S$: cận của sai số ước lượng (estimation error, còn gọi là sai số do lấy mẫu) (Mệnh đề 12.16).
  - Trực quan. Ba số hạng ứng với lớp, dữ liệu và bộ tối ưu.
- **Ghi chú diễn giả (dự thảo, 146 âm tiết):** Chứng minh: Bổ đề 12.14 với $\varepsilon=\Delta_S$ và $\eta=\eta_S$, rồi trừ $R^*$; ba số hạng không âm vì $R_{\mathcal H}^*\ge R^*$, $\Delta_S\ge0$, $\eta_S\ge0$. Mỗi số hạng ứng với một câu hỏi: lớp có biểu diễn được lời giải tốt không, dữ liệu có đủ để chọn lời giải tốt không, bộ tối ưu có đạt mục tiêu thực nghiệm không. Sai số ước lượng là phần rủi ro dư sinh ra vì hàm được chọn từ một mẫu hữu hạn thay vì từ phân phối đích. Mở rộng lớp không làm tăng sai số xấp xỉ và không làm giảm $\Delta_S$; tối ưu chính xác hơn chỉ làm giảm $\eta_S$. Murphy (2022), §5.4.1.1, tách thành sai số xấp xỉ và sai số ước lượng; ở đây là cận trên trên từng mẫu, thêm sai số tối ưu hóa. Ứng dụng: Mệnh đề 12.16 cho một lý do thống kê để hạn chế lớp (chính quy hóa).
- **Lý do tồn tại:** Kết quả tổng hợp của mạch, dùng ở Tổng kết. **Khoảng trống được lấp:** Mục tiêu 6: tách rủi ro dư.
- **Nối:** ← ý tưởng chứng minh; → ví dụ cảm biến. **Phần câu hỏi mạch:** phát biểu (phần 'rủi ro dư gồm những gì'). **Mục tiêu học tập:** mục tiêu 6.
- **Nguồn:** §7.5, Mệnh đề 12.16 và chứng minh (dòng 1013–1052); §9.3 ý 4. **Quyết định:** thêm; chứng minh một câu ở ghi chú diễn giả, mặt trang mang dòng "Trực quan." (cổng duyệt T7).

#### L12-5-09 · Ví dụ: ba nguồn sai số trên ví dụ cảm biến

- **Loại:** ví dụ (Ví dụ 12.11). **Thời lượng:** 3 phút. **Mật độ:** 54 âm tiết, 4 dòng, 0 công thức hiển thị.
- **Mặt trang dự kiến:**
  - Dữ kiện: ví dụ cảm biến, $R^*=R(h_0)=0$; $\Delta_S=0;\ 0{,}15;\ 1$ trên $\mathcal H_{\mathrm c}$, $\mathcal H_\uparrow$, $\mathcal H_{\mathrm{all}}$.
  - Bảng (mỗi dòng dưới đây là một hàng, ô ngăn bằng |):
    - Lớp, hàm chọn | $R_{\mathcal H}^*-R^*$ | $2\Delta_S$ | $\eta_S$ | Vế phải | $R(\hat h_S)-R^*$
    - $\mathcal H_{\mathrm c}$, hàm hằng | $0{,}5$ | $0$ | $0$ | $0{,}5$ | $0{,}5$
    - $\mathcal H_\uparrow$, $h_{0{,}3}$ | $0$ | $0{,}3$ | $0$ | $0{,}3$ | $0{,}15$
    - $\mathcal H_\uparrow$, $h_{0{,}4}$ | $0$ | $0{,}3$ | $0{,}25$ | $0{,}55$ | $0{,}2$
    - $\mathcal H_{\mathrm{all}}$, $g$ | $0$ | $2$ | $0$ | $2$ | $0{,}5$
  - Kiểm tra: mỗi dòng có cột cuối không vượt vế phải; dòng đầu đạt dấu bằng.
  - Diễn giải: lớp hằng chịu sai số xấp xỉ $\tfrac12$; với $\mathcal H_{\mathrm{all}}$, cận sai số ước lượng $2$ không cho thông tin và $g$ có rủi ro dư $\tfrac12$.
- **Ghi chú diễn giả (dự thảo, 102 âm tiết):** Sai số xấp xỉ: $R_{\mathcal H_{\mathrm c}}^*=\frac12$, còn $\mathcal H_\uparrow$ và $\mathcal H_{\mathrm{all}}$ chứa $h_0$. Bốn hàm được chọn: trên lớp hằng ERM chọn một trong hai hàm hằng; trên lớp ngưỡng ERM phá hòa bằng ngưỡng lớn nhất chọn $h_{0{,}3}$; một bộ tối ưu dừng sớm tại $h_{0{,}4}$ có $\hat R_S=\frac14$ nên $\eta_S=\frac14$ và R = 0,2; trên lớp mọi hàm đo được ERM chọn g. Dòng đầu đạt dấu bằng vì lớp hằng không có sai số do lấy mẫu trên mẫu này. Bộ tối ưu tốt hơn đưa $\eta_S$ về 0 và không đổi hai cột đầu; khi đó hàm chọn là một nghiệm ERM như dòng thứ hai, rủi ro không quá 0,15.
- **Lý do tồn tại:** Ví dụ xuyên suốt cho Mệnh đề 12.16; dùng lại ở bài tập tổng hợp. **Khoảng trống được lấp:** Mục tiêu 6 trên một ví dụ cụ thể.
- **Nối:** ← ba nguồn sai số; → bài tập. **Phần câu hỏi mạch:** ví dụ (phần 'rủi ro dư gồm những gì'). **Mục tiêu học tập:** mục tiêu 6.
- **Nguồn:** Ví dụ 12.11 (dòng 1054–1077). **Quyết định:** thêm.

#### L12-5-10 · Bài tập: cỡ mẫu cho mất mát trong một khoảng

- **Loại:** bài tập (lời giải bằng fragment). **Thời lượng:** 2,5 phút. **Mật độ:** 47 âm tiết, 6 dòng, 0 công thức hiển thị.
- **Mặt trang dự kiến:**
  - Câu hỏi: $\mathcal H$ hữu hạn gồm $M$ hàm chọn trước, mẫu i.i.d., mất mát $\ell\in[a,b]$, $a<b$ (Bài tập 12.10).
  - Chứng minh $\mathcal H$ có tính hội tụ đều với $N_{\mathcal H}(\varepsilon,\delta)=\lceil\log(2M/\delta)(b-a)^2/(2\varepsilon^2)\rceil$;
  - với ERM chính xác và $n\ge N_{\mathcal H}(\varepsilon/2,\delta)$, $\mathbb P_S(R(\hat h_S)\le R_{\mathcal H}^*+\varepsilon)\ge1-\delta$.
  - Lời giải: Hoeffding với $V=n(b-a)^2$ cho mỗi hàm cận $2\exp(-2n\varepsilon^2/(b-a)^2)$.
  - Bất đẳng thức hợp: $\mathbb P_S(\Delta_S>\varepsilon)\le2M\exp(-2n\varepsilon^2/(b-a)^2)\le\delta$ khi $n\ge N_{\mathcal H}(\varepsilon,\delta)$.
  - Trên $\{\Delta_S\le\varepsilon/2\}$, Bổ đề 12.14 với $\eta=0$ cho $R(\hat h_S)\le R_{\mathcal H}^*+\varepsilon$.
- **Ghi chú diễn giả (dự thảo, 75 âm tiết):** Gợi ý: lặp lại chứng minh Định lý 12.13, thay V = n bằng $V=n(b-a)^2$. Với ε/2 thay cho ε, cỡ mẫu đủ là $2\log(2M/\delta)(b-a)^2/\varepsilon^2$. Cỡ mẫu tăng theo $(b-a)^2$: nhân độ rộng khoảng giá trị của mất mát lên 2 lần thì cỡ mẫu đủ tăng 4 lần. Bài này cho thấy cận hội tụ đều chỉ cần mất mát bị chặn; mất mát bình phương và entropy chéo không bị chặn nên không áp dụng trực tiếp.
- **Lý do tồn tại:** NT24: bài tập cụm hội tụ đều, lời giải trên mặt trang. **Khoảng trống được lấp:** Kiểm mục tiêu 4 và vai trò của (G2).
- **Nối:** ← ví dụ ba nguồn; → mạch 6: lớp vô hạn. **Phần câu hỏi mạch:** kiểm tra. **Mục tiêu học tập:** mục tiêu 4.
- **Nguồn:** Bài tập 12.10 và lời giải (exercises.md dòng 302–377); §9.4 đoạn cuối (dòng 1295). **Quyết định:** thêm.


### 6.6. Mạch 6: Học gần đúng với xác suất cao và số chiều VC (10 trang, 22 phút; L12-6-05 gộp vào L12-6-04 khi biên tập)

#### L12-6-00 · 6. Học gần đúng với xác suất cao và số chiều VC

- **Loại:** tiêu đề mạch. **Thời lượng:** 0,5 phút. **Mật độ:** 0 âm tiết, 0 dòng, 0 công thức hiển thị.
- **Mặt trang dự kiến:**
  - Dòng dẫn (`p.strand-lead`, 23 âm tiết): Số chiều VC đo độ linh hoạt của một lớp vô hạn bằng số điểm lớn nhất mà lớp gán được mọi nhãn.
  - Từ khóa (`p.strand-keys`): độ chính xác · độ tin cậy · phá vỡ tập điểm · số chiều VC · dữ liệu triển khai
- **Ghi chú diễn giả (dự thảo, 73 âm tiết):** Cận rủi ro dư có dạng 'với xác suất ít nhất 1 − δ, rủi ro dư không quá ε', nhưng cần lớp hữu hạn, còn lớp ngưỡng có vô hạn phần tử. Tiếp theo: tách hai mức ε, δ trong định nghĩa học PAC, đếm các cách gán nhãn của hai lớp ngưỡng trên trục thực, tính số chiều VC, rồi xét hai tình huống áp dụng, một tình huống vi phạm (G1).
- **Lý do tồn tại:** NT12. **Khoảng trống được lấp:** —
- **Nối:** ← bài tập cỡ mẫu; → độ chính xác và độ tin cậy. **Phần câu hỏi mạch:** điểm vào mạch 6; ngoài hành trình khái niệm. **Mục tiêu học tập:** mục tiêu 5, 6.
- **Nguồn:** §8–9. **Quyết định:** thêm.

#### L12-6-01 · Học gần đúng với xác suất cao

- **Loại:** vấn đề + định nghĩa (Định nghĩa 12.17). **Thời lượng:** 2,5 phút. **Mật độ:** 60 âm tiết, 6 dòng, 1 công thức hiển thị.
- **Mặt trang dự kiến:**
  - Câu hỏi: Lớp vô hạn được bảo đảm thế nào?
  - Hệ quả 12.15 có hai mức: sai số $\varepsilon$, xác suất $1-\delta$.
  - Định nghĩa. Lớp $\mathcal H$ các bộ phân loại, mất mát $0$–$1$; $P$ khả thực (realizable) nếu có $h^\circ\in\mathcal H$, $R(h^\circ)=0$.
  - Quy tắc học là học PAC (probably approximately correct) nếu mọi $\varepsilon,\delta\in(0,1)$ có $N(\varepsilon,\delta)$: mọi $P$ khả thực, mọi $n\ge N$,
  - Công thức hiển thị: $$\mathbb P_S\bigl(R(\hat h_S)\le\varepsilon\bigr)\ge1-\delta\quad(8.1)$$
  - Không giả định khả thực (agnostic): mọi $P$ trên $\mathcal X\times\{0,1\}$ thỏa $\mathbb P_S(R(\hat h_S)\le R_{\mathcal H}^*+\varepsilon)\ge1-\delta$ (8.2).
- **Ghi chú diễn giả (dự thảo, 95 âm tiết):** Học PAC là viết tắt của học gần đúng với xác suất cao. Định nghĩa viết cho lớp các bộ phân loại $\mathcal X\to\{0,1\}$, mất mát 0–1, và một quy tắc học nhận tập huấn luyện i.i.d. Xác suất lấy theo $S\sim P^n$; $R(\hat h_S)$ là biến ngẫu nhiên vì $\hat h_S$ phụ thuộc S. Với phân phối khả thực, $R_{\mathcal H}^*=0$, nên (8.2) trở thành (8.1); một quy tắc học PAC không giả định khả thực cũng là học PAC trong thiết lập khả thực. Shalev-Shwartz và Ben-David định nghĩa tính học được cho một lớp; ghi chú viết cho một quy tắc học.
- **Lý do tồn tại:** NT8: vấn đề (dạng của Hệ quả 12.15) → định nghĩa. **Khoảng trống được lấp:** Mục tiêu 5: phân biệt ε với δ.
- **Nối:** ← mạch 5; → các cách gán nhãn trên hai điểm. **Phần câu hỏi mạch:** vấn đề của mạch 6 + định nghĩa. **Mục tiêu học tập:** mục tiêu 5.
- **Nguồn:** §8 mở đầu, §8.1, Định nghĩa 12.17 (dòng 1081–1117). **Quyết định:** thêm; thứ tự của ghi chú (khả thực trước), theo Q4 bác bỏ; dòng đầu là câu hỏi của mạch (cổng duyệt G1, G3).

#### L12-6-02 · Độ chính xác và độ tin cậy

- **Loại:** diễn giải + ví dụ (Định nghĩa 12.17, §8.1). **Thời lượng:** 2 phút. **Mật độ:** 60 âm tiết, 5 dòng, 0 công thức hiển thị.
- **Mặt trang dự kiến:**
  - $\varepsilon$: tham số độ chính xác (accuracy parameter) của hàm học được.
  - $1-\delta$: độ tin cậy (confidence); $\delta$: xác suất mẫu cho hàm kém.
  - Thứ tự lượng từ: $\varepsilon,\delta$, rồi một cỡ mẫu chung, rồi mọi $P$.
  - Ví dụ. $M=100$, $\varepsilon=\delta=0{,}05$: $6636$ quan sát đủ cho ERM chính xác.
  - Diễn giải: với $\delta=0{,}05$, khoảng 95 trong 100 lần học lại trên tập huấn luyện mới cho rủi ro dư $\le\varepsilon$.
- **Ghi chú diễn giả (dự thảo, 109 âm tiết):** Cỡ mẫu không phụ thuộc P chưa biết. Với lớp hữu hạn, Hệ quả 12.15 cho thấy ERM chính xác là học PAC không giả định khả thực với $N(\varepsilon,\delta)=\lceil2\log(2M/\delta)/\varepsilon^2\rceil$; $2\cdot8{,}294/0{,}0025\approx6635{,}2$, nên 6636 quan sát là đủ; cỡ mẫu nhỏ nhất cần thiết có thể nhỏ hơn. Cận này cũng dùng được trong thiết lập khả thực nhưng chưa khai thác $R_{\mathcal H}^*=0$. Khi nhãn có nhiễu, ví dụ $\mathbb P(X=\pm1)=\frac12$, $q(-1)=\frac15$, $q(1)=\frac45$ (Ví dụ 12.6), rủi ro Bayes bằng $\frac15>0$, không lớp nào khả thực, chỉ thiết lập không giả định khả thực áp dụng được. Xác suất dự đoán đúng một sản phẩm mới là $1-R(\hat h_S)$; số 0,95 là xác suất theo việc lấy tập huấn luyện.
- **Lý do tồn tại:** Tách hai mức ε, δ (mục tiêu 5); cách đọc dương của bảo đảm (giọng tác giả). **Khoảng trống được lấp:** Nhầm lẫn 'đúng với xác suất 95%'.
- **Nối:** ← định nghĩa học PAC; → các cách gán nhãn trên hai điểm. **Phần câu hỏi mạch:** diễn giải + ví dụ. **Mục tiêu học tập:** mục tiêu 5.
- **Nguồn:** §8.1 đoạn sau định nghĩa (dòng 1106–1117); Ví dụ 12.6 (dòng 630–644); §11 lời giải câu hỏi phụ (dòng 1539). **Quyết định:** tách từ trang định nghĩa để giữ trần mật độ.

#### L12-6-03 · Ví dụ: các cách gán nhãn của hai lớp trên hai điểm

- **Loại:** ví dụ (Ví dụ 12.12, Hình 12.2). **Thời lượng:** 2,5 phút. **Mật độ:** 57 âm tiết, 5 dòng, 0 công thức hiển thị.
- **Mặt trang dự kiến:**
  - $\mathcal H_\uparrow$ vô hạn, nên $M$ trong (7.5) không dùng được; trên hai điểm, lớp chỉ tạo hữu hạn vector nhãn.
  - Dữ kiện: $x_1=-1$, $x_2=1$; $\mathcal H_\uparrow=\{\mathbf 1_{\{x\ge t\}}\}$ và $\mathcal H_{\mathrm{aff}}=\{\mathbf 1_{\{wx+b\ge0\}}:\ w,b\in\mathbb R\}$ (8.3); vector nhãn $(h(x_1),h(x_2))$ viết gọn $00$, $01$, $10$, $11$.
  - Lớp affine: $(w,b)=(0,-1),(1,0),(-1,0),(0,1)$ cho $00,01,10,11$.
  - Lớp ngưỡng: $t=2,0,-2$ cho $00,01,11$; $h_t(-1)=1$ kéo theo $1\ge t$, nên không ngưỡng nào cho $10$.
  - Hình: `img/lec-12/deck-labelings-two-points.svg (mới)` (xem mục 8)
  - Diễn giải: cùng đầu vào một số thực, lớp affine tạo đủ $4$ cách gán nhãn, lớp ngưỡng chỉ $3$.
- **Ghi chú diễn giả (dự thảo, 84 âm tiết):** Kiểm tra: với các tham số trên, không điểm nào nằm đúng trên biên quyết định ($wx+b\ne0$ tại ±1 và $\pm1\ne t$), nên nhãn không phụ thuộc quy ước tại dấu bằng. Hình vẽ hai điểm và bốn vector nhãn; điểm đặc mang nhãn 1, điểm rỗng mang nhãn 0, mũi tên chỉ phía nhận nhãn 1. Lớp ngưỡng thiếu 10. Trong học máy, lấy ngưỡng một mô hình logistic trên một đặc trưng với độ dốc dương cho $\mathcal H_\uparrow$; cho phép độ dốc hai dấu và $w=0$ cho $\mathcal H_{\mathrm{aff}}$.
- **Lý do tồn tại:** NT8: ví dụ trước định nghĩa phá vỡ. **Khoảng trống được lấp:** Cùng số chiều đầu vào, khác khả năng gán nhãn.
- **Nối:** ← học PAC; → định nghĩa phá vỡ và số chiều VC. **Phần câu hỏi mạch:** ví dụ (phần 'đo độ phức tạp lớp vô hạn'). **Mục tiêu học tập:** mục tiêu 5.
- **Nguồn:** §8.2 mở đầu, (8.3), Ví dụ 12.12, Hình 12.2 (dòng 1119–1151); §8.2 đoạn 'Trong học máy' (dòng 1206); hình mới vẽ lại dữ kiện của Hình 12.2. **Quyết định:** thêm.

#### L12-6-04 · Phá vỡ tập điểm và số chiều VC

- **Loại:** trực quan + định nghĩa (Định nghĩa 12.18). **Thời lượng:** 2,5 phút. **Mật độ:** 49 âm tiết, 5 dòng, 1 công thức hiển thị.
- **Mặt trang dự kiến:**
  - Trực quan. Lớp gán được mọi nhãn trên nhiều điểm thì khớp được nhiều mẫu nhỏ.
  - Định nghĩa. Với $C=\{x_1,\ldots,x_k\}$ gồm $k$ điểm phân biệt,
  - Công thức hiển thị: $$\mathcal H|_C=\bigl\{(h(x_1),\ldots,h(x_k)):\ h\in\mathcal H\bigr\}$$
  - $\mathcal H$ phá vỡ (shatter) $C$ nếu $\mathcal H|_C=\{0,1\}^k$.
  - Số chiều Vapnik–Chervonenkis (VC dimension) $d_{\mathrm{VC}}(\mathcal H)$: kích thước lớn nhất của một tập bị phá vỡ; $+\infty$ nếu kích thước đó không bị chặn.
- **Ghi chú diễn giả (dự thảo, 102 âm tiết):** $\mathcal H|_C$ là tập các vector nhãn tạo được trên C. Định nghĩa đo độ phức tạp của lớp hàm bằng kích thước lớn nhất của một tập điểm mà lớp phá vỡ được, không bằng số tham số hay số chiều đầu vào. $\mathcal H_\uparrow$ phá vỡ $\{x_0\}$ vì $t\le x_0$ cho nhãn 1 và $t>x_0$ cho nhãn 0. $\mathcal H_{\mathrm{all}}$ phá vỡ mọi tập hữu hạn điểm phân biệt trong [-1,1], vì mọi cách gán nhãn trên tập đó là thu hẹp của một hàm đo được. Để chứng minh $d_{\mathrm{VC}}=d$ cần hai việc: một tập d điểm bị phá vỡ, và không tập d + 1 điểm nào bị phá vỡ.
- **Lý do tồn tại:** Định nghĩa trung tâm của mạch. **Khoảng trống được lấp:** Số đo độ phức tạp thay cho M.
- **Nối:** ← ví dụ hai điểm; → Định lý 12.19. **Phần câu hỏi mạch:** trực quan + định nghĩa. **Mục tiêu học tập:** mục tiêu 5.
- **Nguồn:** §8.2 Định nghĩa 12.18 và đoạn sau (dòng 1153–1168). **Quyết định:** thêm.

#### L12-6-05 · Số chiều VC của hai lớp ngưỡng một chiều (đã bỏ khi biên tập: phát biểu gộp vào L12-6-04)

- **Loại:** kết quả (Định lý 12.19). **Thời lượng:** 1 phút. **Mật độ:** 31 âm tiết, 5 dòng, 1 công thức hiển thị.
- **Mặt trang dự kiến:**
  - Giả thiết: miền đầu vào $\mathcal X=\mathbb R$; hai lớp $\mathcal H_\uparrow$ và $\mathcal H_{\mathrm{aff}}$ cho bởi (8.3).
  - Kết luận:
  - Công thức hiển thị: $$d_{\mathrm{VC}}(\mathcal H_\uparrow)=1,\qquad d_{\mathrm{VC}}(\mathcal H_{\mathrm{aff}})=2\quad(8.4)$$
  - (Định lý 12.19)
  - Ý nghĩa: độ dốc hai dấu và hàm hằng nâng số chiều VC từ $1$ lên $2$.
- **Ghi chú diễn giả (dự thảo, 73 âm tiết):** Đầu vào vẫn có một tọa độ. Số chiều VC có thể khác số tham số: Shalev-Shwartz và Ben-David (2014), §6.3.5, nêu lớp $\{x\mapsto\lceil0{,}5\sin(\theta x)\rceil\}$ có một tham số nhưng số chiều VC vô hạn; vì vậy số chiều VC của một mạng phi tuyến nhận đầu vào một chiều phải tính từ lớp hàm của mạng. Ghi chú dùng ngưỡng $\mathbf 1_{\{x\ge t\}}$; Shalev-Shwartz và Ben-David, §6.3.1, dùng $\mathbf 1_{\{x<a\}}$, nên vector nhãn thiếu là 01 thay cho 10.
- **Lý do tồn tại:** Kết quả chính 6 (Q4: số chiều VC của hai lớp ngưỡng). **Khoảng trống được lấp:** Mục tiêu 5.
- **Nối:** ← định nghĩa; → ý tưởng chứng minh. **Phần câu hỏi mạch:** phát biểu. **Mục tiêu học tập:** mục tiêu 5.
- **Nguồn:** Định lý 12.19 (dòng 1170–1181); đoạn sau (dòng 1203–1206); Tài liệu đọc, Quan hệ với giáo trình (dòng 1559). **Quyết định:** thêm.

#### L12-6-06 · Ý tưởng chứng minh: số chiều VC của hai lớp ngưỡng một chiều

- **Loại:** ý tưởng chứng minh. **Thời lượng:** 2,5 phút. **Mật độ:** 46 âm tiết, 6 dòng, 1 công thức hiển thị.
- **Mặt trang dự kiến:**
  - 1. $\mathcal H_\uparrow$ phá vỡ $\{x_0\}$: $t\le x_0$ cho $1$, $t>x_0$ cho $0$.
  - 2. Với $x_1<x_2$, nhãn $10$ không xuất hiện, nên $d_{\mathrm{VC}}(\mathcal H_\uparrow)=1$:
  - Công thức hiển thị: $$h_t(x_1)=1\ \Rightarrow\ x_2>x_1\ge t\ \Rightarrow\ h_t(x_2)=1$$
  - 3. $\mathcal H_{\mathrm{aff}}$ phá vỡ $\{x_1,x_2\}$: với $c=\frac{x_1+x_2}2$, $(w,b)=(0,-1),(1,-c),(-1,c),(0,1)$ cho $00,01,10,11$.
  - 4. Với $x_1<x_2<x_3$, vector $101$: $w>0$ cho nhãn không giảm, $w<0$ không tăng, $w=0$ hằng; $d_{\mathrm{VC}}(\mathcal H_{\mathrm{aff}})=2$.
  - Kỹ thuật. Thứ tự trên trục: nhãn đơn điệu theo $x$, nên vector nhãn đổi chiều không biểu diễn được.
- **Ghi chú diễn giả (dự thảo, 90 âm tiết):** Mỗi lớp cần hai việc: chỉ ra một tập bị phá vỡ có kích thước d, rồi dùng thứ tự trên trục để chỉ ra một vector nhãn không biểu diễn được trên mọi tập d + 1 điểm. Ở bước 3: $x_1-c<0\le x_2-c$ cho 01 và $-x_1+c>0>-x_2+c$ cho 10. Ở bước 4, ba trường hợp theo dấu của w phủ mọi hàm của lớp. Cùng kỹ thuật cho lớp khoảng có dấu (Bài tập 12.11), với vector 1010 trên bốn điểm. Shalev-Shwartz và Ben-David (2014), §6.3.1 và lập luận nhãn 101 của §6.3.2.
- **Lý do tồn tại:** NT6. **Khoảng trống được lấp:** Kỹ thuật thứ tự trên trục dùng lại ở Bài tập 12.11.
- **Nối:** ← Định lý 12.19; → Định lý 12.20. **Phần câu hỏi mạch:** ý tưởng chứng minh. **Mục tiêu học tập:** mục tiêu 5.
- **Nguồn:** Chứng minh Định lý 12.19 (dòng 1183–1204). **Quyết định:** thêm.

#### L12-6-07 · Hội tụ đều theo số chiều VC

- **Loại:** kết quả đọc thêm (Định lý 12.20). **Thời lượng:** 2 phút. **Mật độ:** 48 âm tiết, 5 dòng, 1 công thức hiển thị.
- **Mặt trang dự kiến:**
  - Giả thiết: $\mathcal H$ cố định, $d_{\mathrm{VC}}(\mathcal H)=d$, $1\le d<\infty$, đo được; (G1) với $P$ bất kỳ; mất mát $0$–$1$.
  - Bảo đảm: có hằng số tuyệt đối $c_0>0$ sao cho với mọi $\varepsilon,\delta\in(0,1)$,
  - Công thức hiển thị: $$n\ge c_0\,\frac{d+\log(1/\delta)}{\varepsilon^2}\ \Longrightarrow\ \mathbb P_S(\Delta_S\le\varepsilon)\ge1-\delta\quad(8.5)$$
  - (Định lý 12.20, đọc thêm)
  - Lưu ý: số vector nhãn trên chính tập huấn luyện phụ thuộc mẫu, không thay được $M$ của Định lý 12.13.
- **Ghi chú diễn giả (dự thảo, 144 âm tiết):** Kết quả đọc thêm: Định lý 6.8, phần 1, của Shalev-Shwartz và Ben-David (2014), §6.4. Chứng minh nằm ngoài phạm vi học phần; §28.1 của sách chứng minh một cận yếu hơn, với $d\log(d/\varepsilon)$ thay cho d và hằng số tường minh; bản không có thừa số log cần kỹ thuật xích (chaining). Ý tưởng chung: chặn số vector nhãn trên k điểm bằng một đa thức bậc d theo k, rồi kết hợp với lập luận tập trung xác suất. $c_0$ không được xác định, nên (8.5) cho bậc phụ thuộc vào d, ε, δ, không cho một cỡ mẫu bằng số. $c_0$ không phụ thuộc lớp, P, n, ε, δ. Lớp có số chiều VC vô hạn không có tính hội tụ đều (Định lý 6.7). Murphy (2022), §5.4.4.2: số chiều VC khó tính cho nhiều mô hình và các cận theo VC thường lỏng.
- **Lý do tồn tại:** Nối số chiều VC với hội tụ đều; NT5 (đọc thêm nói rõ ở ghi chú diễn giả). **Khoảng trống được lấp:** Thay M bằng d cho lớp vô hạn.
- **Nối:** ← ý tưởng chứng minh; → tình huống cảm biến. **Phần câu hỏi mạch:** phát biểu (đọc thêm). **Mục tiêu học tập:** mục tiêu 5.
- **Nguồn:** §8.3, Định lý 12.20 và hai đoạn sau (dòng 1208–1230). **Quyết định:** thêm; không có trang ý tưởng chứng minh vì ghi chú không chứng minh (ngoài phạm vi).

#### L12-6-08 · Chọn lớp giả thuyết cho bộ phân loại cảm biến

- **Loại:** ứng dụng (Tình huống 12.1). **Thời lượng:** 2,5 phút. **Mật độ:** 58 âm tiết, 6 dòng, 0 công thức hiển thị.
- **Mặt trang dự kiến:**
  - Chọn giữa $\mathcal H_\uparrow$ và $\mathcal H_{\mathrm{all}}$ trên bốn sản phẩm; (G1)–(G3) thỏa.
  - Chọn nghiệm ERM $h_{0{,}3}$ với $R=0{,}15$; $g$ với $R=\tfrac12$.
  - Hai lớp chứa $h_0$: sai số xấp xỉ $0$; rủi ro dư của $g$ là sai số ước lượng.
  - $d_{\mathrm{VC}}(\mathcal H_\uparrow)=1$: với mọi $P$, $n\ge c_0(1+\log(1/\delta))/\varepsilon^2$ cho $\mathbb P_S(\Delta_S\le\varepsilon)\ge1-\delta$ (8.5).
  - $d_{\mathrm{VC}}(\mathcal H_{\mathrm{all}})=+\infty$; với mọi $n$, $\Delta_S=1$ với xác suất $1$ (dùng $\tilde h$).
  - Diễn giải: hai quy tắc đều giải chính xác ERM; chỉ lớp ngưỡng có cận (8.5) cho mọi $P$.
- **Ghi chú diễn giả (dự thảo, 107 âm tiết):** Mọi $t\in(-0{,}2;0{,}3]$ là nghiệm ERM trong lớp ngưỡng; chọn $t=0{,}3$. Bốn đầu vào có xác suất 0, nên g dự đoán 0 gần chắc chắn trên sản phẩm mới và có rủi ro 1/2. Khác hàm ghi nhớ trên nhãn nhiễu, ở đây nhãn không có nhiễu, nên rủi ro 1/2 của g là rủi ro dư thật so với Bayes. Với $\mathcal H_{\mathrm{all}}$, luôn có một hàm sai mọi nhãn huấn luyện nhưng có rủi ro 0, nên tăng n không làm $\Delta_S$ giảm. Các con số 0,15 và 1/2 dựa trên phân phối đều và ngưỡng thật bằng 0; nếu phân phối của cảm biến khác, chúng phải tính lại.
- **Lý do tồn tại:** NT4: ứng dụng dùng thật Định lý 12.19, 12.20 và Mệnh đề 12.16. **Khoảng trống được lấp:** Quyết định chọn lớp.
- **Nối:** ← Định lý 12.20; → tình huống vi phạm (G1). **Phần câu hỏi mạch:** ứng dụng. **Mục tiêu học tập:** mục tiêu 5, 6.
- **Nguồn:** §9.1, Tình huống 12.1 (dòng 1238–1254). **Quyết định:** thêm.

#### L12-6-09 · Dữ liệu triển khai khác phân phối huấn luyện

- **Loại:** ứng dụng, giả thiết bị vi phạm (Tình huống 12.2). **Thời lượng:** 2 phút. **Mật độ:** 58 âm tiết, 5 dòng, 0 công thức hiển thị.
- **Mặt trang dự kiến:**
  - Nhãn thật $Y=\mathbf 1_{\{X\ge0\}}$; huấn luyện: $X\sim\operatorname{Uniform}[-1,0]$; triển khai: $X\sim\operatorname{Uniform}[0,1]$.
  - Tập huấn luyện: đầu vào $-0{,}8$; $-0{,}6$; $-0{,}4$; $-0{,}2$, cả bốn nhãn bằng $0$.
  - $(w,b)=(0,-1)$ luôn dự đoán $0$: rủi ro thực nghiệm $0$, rủi ro trên phân phối huấn luyện $0$.
  - Khi triển khai, nhãn bằng $1$ gần chắc chắn, nên rủi ro bằng $1$.
  - Diễn giải: mẫu vẫn i.i.d. và $d_{\mathrm{VC}}(\mathcal H_{\mathrm{aff}})=2$, nhưng quan sát mới khác phân phối huấn luyện, trái (G1).
- **Ghi chú diễn giả (dự thảo, 68 âm tiết):** Hội tụ đều theo phân phối huấn luyện chỉ kiểm soát rủi ro trên chính phân phối đó. Thêm quan sát trong nửa âm không cung cấp thông tin về nhãn trên nửa dương. Mọi cận hội tụ đều và bảo đảm PAC của bài cần (G1); Bài tập 12.15 xét mẫu độc lập nhưng không cùng phân phối và cho bảo đảm theo phân phối trung bình.
- **Lý do tồn tại:** Tình huống có giả thiết bị vi phạm (mục tiêu 6). **Khoảng trống được lấp:** Giới hạn áp dụng của khung chung.
- **Nối:** ← tình huống chọn lớp; → bài tập của mạch. **Phần câu hỏi mạch:** ứng dụng + giới hạn (phần 'bảo đảm còn đúng đến đâu'). **Mục tiêu học tập:** mục tiêu 6.
- **Nguồn:** §9.2, Tình huống 12.2 (dòng 1256–1268). **Quyết định:** thêm.

#### L12-6-10 · Bài tập: số chiều VC của lớp khoảng có dấu

- **Loại:** bài tập (lời giải bằng fragment). **Thời lượng:** 2,5 phút. **Mật độ:** 45 âm tiết, 5 dòng, 0 công thức hiển thị.
- **Mặt trang dự kiến:**
  - Câu hỏi: Trên $\mathbb R$, với $a\le b$, $s\in\{0,1\}$: $h_{a,b,s}(x)=s$ khi $x\in[a,b]$, $1-s$ khi $x\notin[a,b]$. Tính $d_{\mathrm{VC}}$ của lớp khoảng có dấu $\{h_{a,b,s}\}$ (Bài tập 12.11).
  - Lời giải: trên $C=\{1,2,3\}$, $s=1$ với khoảng chứa đúng các điểm nhãn $1$ cho bảy vector; $s=0$, $[a,b]=[2,2]$ cho $101$.
  - Do đó $d_{\mathrm{VC}}\ge3$.
  - Với $x_1<x_2<x_3<x_4$ và vector $1010$: $s=1$ kéo theo $x_2\in[a,b]$, nhãn $1$; $s=0$ kéo theo $x_3\in[a,b]$, nhãn $0$.
  - Không hàm nào cho $1010$, nên $d_{\mathrm{VC}}=3$.
- **Ghi chú diễn giả (dự thảo, 75 âm tiết):** Bảy vector với s = 1: $[5,5]$ cho 000; $[1,1]$, $[2,2]$, $[3,3]$ cho 100, 010, 001; $[1,2]$, $[2,3]$, $[1,3]$ cho 110, 011, 111. Gợi ý: với s = 1, các điểm mang nhãn 1 nằm liền nhau theo thứ tự trên trục; với s = 0, các điểm mang nhãn 0 nằm liền nhau. Kiểm tra: lớp con với s = 1 là lớp khoảng; trên ba điểm nó thiếu đúng vector 101; thêm s = 0 bù vector đó, và vector thiếu chuyển lên bốn điểm.
- **Lý do tồn tại:** NT24: bài tập cụm PAC–VC, lời giải trên mặt trang. **Khoảng trống được lấp:** Kiểm mục tiêu 5 bằng hai bước của Định lý 12.19.
- **Nối:** ← tình huống vi phạm; → Tổng kết. **Phần câu hỏi mạch:** kiểm tra. **Mục tiêu học tập:** mục tiêu 5.
- **Nguồn:** Bài tập 12.11 và lời giải (exercises.md dòng 378–409). **Quyết định:** thêm.


### 6.7. Mạch 7: Tổng kết (9 trang, 11,5 phút; thêm L12-7-01b khi biên tập)

#### L12-7-00 · 7. Tổng kết

- **Loại:** tiêu đề mạch. **Thời lượng:** 0,5 phút. **Mật độ:** 0 âm tiết, 0 dòng, 0 công thức hiển thị.
- **Mặt trang dự kiến:**
  - Dòng dẫn (`p.strand-lead`, 18 âm tiết): Mỗi bảo đảm của bài đúng dưới các giả thiết cụ thể về mẫu, mất mát và lớp.
  - Từ khóa (`p.strand-keys`): giả thiết không được bỏ · ba nguồn sai số · bài tập
- **Ghi chú diễn giả (dự thảo, 72 âm tiết):** Các phần trước cho hai mất mát huấn luyện, hai loại rủi ro, cận hội tụ đều và rủi ro dư cho lớp hữu hạn, số chiều VC của hai lớp ngưỡng. Phần kết gom các kết quả cùng giả thiết không được bỏ, trả lời câu hỏi trung tâm trên ví dụ cảm biến, giải một bài tập tổng hợp và nêu bài tập về nhà cùng tài liệu tham khảo.
- **Lý do tồn tại:** NT15. **Khoảng trống được lấp:** —
- **Nối:** ← bài tập lớp khoảng; → bảng tổng kết. **Phần câu hỏi mạch:** điểm vào mạch 7. **Mục tiêu học tập:** mục tiêu 1–6.
- **Nguồn:** §9.4, §10–12. **Quyết định:** thêm.

#### L12-7-01 · Bảng tổng kết (khi biên tập: tách thành L12-7-01 và L12-7-01b "Bảng tổng kết (tiếp)")

- **Loại:** tổng kết. **Thời lượng:** 2 phút. **Mật độ:** 80 âm tiết, 1 dòng, 0 công thức hiển thị.
- **Mặt trang dự kiến:**
  - Bảng (mỗi dòng dưới đây là một hàng, ô ngăn bằng |):
    - Kết quả | Giả thiết không được bỏ | Công thức hoặc thuật toán
    - Mất mát bình phương (Mệnh đề 12.2) | (4.2), (E1) | (4.3)
    - Bình phương tối thiểu (Mệnh đề 12.3) | hạng cột đầy đủ | (4.4), (4.5)
    - Entropy chéo (Mệnh đề 12.6) | $m_\theta\in(0,1)$, độc lập có điều kiện | (5.1)
    - Rủi ro ngưỡng (Mệnh đề 12.11) | phân phối đều; mẫu hai loại điểm | (6.6), (6.7)
    - Hội tụ đều (Định lý 12.13) | (G1)–(G3); $\mathbb P\ge1-\delta$ | (7.4), (7.5)
    - Rủi ro dư (Hệ quả 12.15) | như trên, (E2) | (7.7)
    - Ba nguồn sai số (Mệnh đề 12.16) | (G2); tất định | (7.8)
    - Số chiều VC (Định lý 12.19) | trục thực | (8.4)
- **Ghi chú diễn giả (dự thảo, 79 âm tiết):** Các cận hội tụ đều cần mất mát bị chặn, nên không áp dụng trực tiếp cho mất mát bình phương hay entropy chéo không bị chặn; mọi bảo đảm cần quan sát mới cùng phân phối với tập huấn luyện. Định lý 12.20 (đọc thêm) nối số chiều VC hữu hạn với hội tụ đều cho mất mát 0–1, với hằng số $c_0$ không xác định. Các công thức cần nhớ: (4.3), (5.1), (6.1)–(6.2), (6.6), (7.4)–(7.5), (7.7)–(7.8) và (8.4).
- **Lý do tồn tại:** NT15: bảng kết quả, giả thiết, công thức. **Khoảng trống được lấp:** —
- **Nối:** → Vấn đề trung tâm. **Phần câu hỏi mạch:** tổng kết. **Mục tiêu học tập:** mục tiêu 1–6.
- **Nguồn:** §9.4 bảng và đoạn cuối (dòng 1277–1295). **Quyết định:** thêm; ngoại lệ mật độ nếu vượt 80 (xem bảng).

#### L12-7-02 · Vấn đề trung tâm

- **Loại:** tổng kết (câu trả lời cả bài). **Thời lượng:** 2 phút. **Mật độ:** 57 âm tiết, 4 dòng, 0 công thức hiển thị.
- **Mặt trang dự kiến:**
  - $h_0$, $h_{0{,}3}$, $g$ cùng đúng bốn nhãn: rủi ro thực nghiệm chỉ nhìn các điểm mẫu.
  - Lớp ngưỡng: $\Delta_S=0{,}15$, mọi nghiệm ERM có rủi ro $\le0{,}15$; $h_{0{,}3}$ đạt đúng cận.
  - Lớp mọi hàm đo được: $\Delta_S=1$, rủi ro thực nghiệm $0$ không bảo đảm gì; $R(g)=\tfrac12$.
  - Khớp hoàn hảo vẫn dự đoán sai khi lớp quá linh hoạt so với cỡ mẫu hoặc phân phối đổi.
- **Ghi chú diễn giả (dự thảo, 89 âm tiết):** Câu trả lời của cả bài: tối ưu tốt chưa chắc học tốt. Bộ tối ưu chỉ làm giảm sai số tối ưu hóa $\eta_S$, còn sai số xấp xỉ và sai số ước lượng phụ thuộc lớp giả thuyết và cỡ mẫu (Mệnh đề 12.16). Với hàm ghi nhớ, $\eta_S=0$ và toàn bộ rủi ro dư 1/2 là sai số ước lượng; thu hẹp lớp làm giảm số hạng này. Vế thứ hai của câu kết đến từ tình huống tập huấn luyện chỉ phủ một vùng của cảm biến.
- **Lý do tồn tại:** NT15: câu trả lời cho câu hỏi trung tâm của cả bài. **Khoảng trống được lấp:** —
- **Nối:** ← bảng; → bài tập tổng hợp. **Phần câu hỏi mạch:** tổng kết (vấn đề). **Mục tiêu học tập:** mục tiêu 3, 6.
- **Nguồn:** §11 đoạn sau lời giải (dòng 1542); §9.4 (dòng 1279); Tình huống 12.2. **Quyết định:** thêm.

#### L12-7-03 · Bài tập: hàm ghi nhớ là một đa thức lấy ngưỡng

- **Loại:** bài tập tổng hợp. **Thời lượng:** 1,5 phút. **Mật độ:** 49 âm tiết, 3 dòng, 0 công thức hiển thị.
- **Mặt trang dự kiến:**
  - Câu hỏi: Cho $S=\{(x_i,f(x_i))\}_{i=1}^n\subseteq\mathbb R^d\times\{0,1\}$ và hàm ghi nhớ $h_S(x)=y_i$ khi $x=x_i$, $h_S(x)=0$ khi $x\notin\{x_1,\ldots,x_n\}$ (Bài tập 12.17).
  - Chứng minh có một đa thức $p_S$ theo các tọa độ của $x$ sao cho $h_S(x)=1$ khi và chỉ khi $p_S(x)\ge0$.
  - Suy ra ERM trên lớp mọi đa thức lấy ngưỡng $\{x\mapsto\mathbf 1_{\{p(x)\ge0\}}\}$ có thể chọn hàm ghi nhớ và quá khớp (overfitting).
- **Ghi chú diễn giả (dự thảo, 80 âm tiết):** Gợi ý: lấy $p_S$ là âm của tích các bình phương khoảng cách từ x tới các điểm mang nhãn 1. Vì $y_i=f(x_i)$, hai lần xuất hiện của cùng một điểm có cùng nhãn, nên $h_S$ xác định. Hàm g của ví dụ cảm biến là trường hợp $d=1$. Bài dùng ERM, phân rã (7.8) và rủi ro của g trên ví dụ cảm biến. Quá khớp ở đây nghĩa là rủi ro thực nghiệm bằng 0 trong khi rủi ro kỳ vọng bằng $\frac12$.
- **Lý do tồn tại:** NT15: bài tập tổng hợp từ exercises.md, dùng mạch 4, 5, 6. **Khoảng trống được lấp:** Nối hàm ghi nhớ của câu hỏi mở đầu với một lớp quen thuộc.
- **Nối:** ← Vấn đề trung tâm; → câu hỏi tự kiểm tra. **Phần câu hỏi mạch:** tổng kết (bài tập). **Mục tiêu học tập:** mục tiêu 6.
- **Nguồn:** Bài tập 12.17 và lời giải (exercises.md dòng 634–669). **Quyết định:** thêm; đề và lời giải trên hai trang (L12-7-03, L12-7-04).

#### L12-7-04 · Bài tập: hàm ghi nhớ là một đa thức lấy ngưỡng, lời giải

- **Loại:** lời giải (bài tập tổng hợp). **Thời lượng:** 2 phút. **Mật độ:** 41 âm tiết, 5 dòng, 0 công thức hiển thị.
- **Mặt trang dự kiến:**
  - Lời giải: với $I_1=\{i:\ y_i=1\}\ne\varnothing$, đặt $p_S(x)=-\prod_{i\in I_1}\lVert x-x_i\rVert^2$; nếu $I_1=\varnothing$, đặt $p_S\equiv-1$.
  - $p_S\le0$, và $p_S(x)=0$ khi và chỉ khi $x=x_i$ với $i\in I_1$, tức $h_S(x)=1$.
  - $h_S=\mathbf 1_{\{p_S\ge0\}}$ thuộc lớp và $\hat R_S(h_S)=0$, nên $h_S$ là một nghiệm ERM.
  - Cảm biến: $p_S(x)=-(x-0{,}3)^2(x-0{,}7)^2$, $p_S(0)=-0{,}0441<0$.
  - Lớp chứa $h_0$: sai số xấp xỉ $0$, nên toàn bộ rủi ro dư $\tfrac12$ của $g$ là sai số ước lượng.
- **Ghi chú diễn giả (dự thảo, 73 âm tiết):** Mỗi thừa số $\lVert x-x_i\rVert^2=\sum_j(x_j-x_{ij})^2$ là đa thức bậc 2, nên $p_S$ có bậc $2|I_1|$ và không dương. Tích bằng 0 khi và chỉ khi có một thừa số bằng 0, và $\lVert x-x_i\rVert=0$ khi và chỉ khi $x=x_i$. Trên ví dụ cảm biến, $I_1$ gồm hai điểm 0,3 và 0,7; $p_S(0{,}3)=0$ cho nhãn 1, $p_S(0)=-0{,}09\cdot0{,}49$ cho nhãn 0, đúng với g. Theo (7.8), thu hẹp lớp làm giảm số hạng sai số ước lượng; bộ tối ưu tốt hơn không giúp vì $\eta_S=0$.
- **Lý do tồn tại:** NT15: lời giải trên mặt trang. **Khoảng trống được lấp:** —
- **Nối:** ← đề; → câu hỏi tự kiểm tra. **Phần câu hỏi mạch:** tổng kết (lời giải). **Mục tiêu học tập:** mục tiêu 6.
- **Nguồn:** Lời giải Bài tập 12.17 (exercises.md dòng 648–669). **Quyết định:** tách thành trang lời giải riêng để giữ trần mật độ.

#### L12-7-05 · Câu hỏi tự kiểm tra

- **Loại:** câu hỏi. **Thời lượng:** 1 phút. **Mật độ:** 55 âm tiết, 4 dòng, 0 công thức hiển thị.
- **Mặt trang dự kiến:**
  - Câu hỏi: Nhiễu Gaussian với phương sai đã biết cho mất mát nào? Giả thiết nào giữ tập nghiệm?
  - Câu hỏi: Với $h$ chọn trước, $\mathbb E_S[\hat R_S(h)]$ bằng gì? Còn đúng cho $\hat h_S$ không?
  - Câu hỏi: $M=100$, $n=1000$, $\delta=0{,}05$: bộ phân loại học được có dự đoán đúng với xác suất $95\%$ không?
  - Câu hỏi: Vì sao $\mathcal H_\uparrow$ không phá vỡ tập hai điểm?
- **Ghi chú diễn giả (dự thảo, 84 âm tiết):** Trả lời: (1) tổng bình phương phần dư; giả thiết (E1) phương sai đã biết, không phụ thuộc θ (Mệnh đề 12.2). (2) Bằng R(h); không, vì các số hạng phụ thuộc mẫu qua hàm chọn (hàm ghi nhớ trên nhãn nhiễu: 0 so với 1/2). (3) Không: 0,95 là xác suất theo việc lấy tập huấn luyện; trên một lần học tốt, rủi ro dư không quá 0,129, và xác suất dự đoán đúng là $1-R(\hat h_S)$. (4) Với $x_1<x_2$, $h_t(x_1)=1$ kéo theo $h_t(x_2)=1$, nên thiếu vector 10.
- **Lý do tồn tại:** NT15: 2–4 câu, đáp án trong ghi chú diễn giả. **Khoảng trống được lấp:** —
- **Nối:** → bài tập về nhà. **Phần câu hỏi mạch:** kiểm tra. **Mục tiêu học tập:** mục tiêu 1, 3, 4, 5.
- **Nguồn:** Mệnh đề 12.2; §6.1; §11 câu hỏi phụ và lời giải (dòng 1532–1539); Định lý 12.19. **Quyết định:** thêm.

#### L12-7-06 · Bài tập về nhà

- **Loại:** bài tập về nhà. **Thời lượng:** 1 phút. **Mật độ:** 57 âm tiết, 2 dòng, 0 công thức hiển thị.
- **Mặt trang dự kiến:**
  - Bảng (mỗi dòng dưới đây là một hàng, ô ngăn bằng |):
    - Mục | Bài tập
    - 3. Mất mát từ hợp lý có điều kiện | 12.1 (câu 4 trên lớp), 12.6, 12.7, 12.8, 12.9
    - 4. Rủi ro kỳ vọng và tối thiểu hóa rủi ro thực nghiệm | 12.2 (câu 3 trên lớp), 12.3 (câu 1–2 trên lớp), 12.12
    - 5. Hội tụ đều và rủi ro dư | 12.10 (trên lớp)
    - 6. Học gần đúng với xác suất cao và số chiều VC | 12.4, 12.5, 12.11 (trên lớp), 12.13, 12.14, 12.15, 12.16, 12.17 (trên lớp)
  - Ghi chú bài giảng · Bài tập
- **Ghi chú diễn giả (dự thảo, 112 âm tiết):** Thứ tự tự học theo các phần của bài. Phần 3: Bài tập 12.1 (các câu còn lại), 12.6, 12.7, 12.8 luyện phương trình chuẩn và tính duy nhất (mục tiêu 2), 12.9 luyện gradient và Hessian của entropy chéo (mục tiêu 1). Phần 4: Bài tập 12.2, 12.3 (câu 3, 4) và 12.12 tách entropy chéo khỏi tỉ lệ phân loại sai và tính rủi ro dưới mật độ khác (mục tiêu 1, 3, 6). Phần 6: Bài tập 12.4, 12.5, 12.13, 12.14 luyện học PAC và số chiều VC (mục tiêu 5); 12.15 và 12.16 xét giả thiết bị vi phạm và chọn lớp theo cỡ mẫu (mục tiêu 6).
- **Lý do tồn tại:** NT15: bảng Mục | Bài tập, liên kết trình xem. **Khoảng trống được lấp:** —
- **Nối:** → tài liệu tham khảo. **Phần câu hỏi mạch:** tổng kết. **Mục tiêu học tập:** mục tiêu 1–6.
- **Nguồn:** §10 danh sách bài tập (dòng 1297–1526); exercises.md bảng mục tiêu (dòng 10–17). **Quyết định:** thêm.

#### L12-7-07 · Tài liệu tham khảo

- **Loại:** tài liệu. **Thời lượng:** 1 phút. **Mật độ:** 57 âm tiết, 3 dòng, 0 công thức hiển thị.
- **Mặt trang dự kiến:**
  - Kevin P. Murphy (2022), Probabilistic Machine Learning: An Introduction, MIT Press: §4.2.3, §4.2.7, §4.3, §5.1, §5.4.1, §5.4.4, §10.2.3, §11.2.2.
  - Shai Shalev-Shwartz, Shai Ben-David (2014), Understanding Machine Learning: From Theory to Algorithms, Cambridge University Press: Chương 2–6, §28.1.
  - Bài 13: hành động đổi phân phối của trạng thái kế tiếp, nên dữ liệu không còn i.i.d. theo một $P$.
- **Ghi chú diễn giả (dự thảo, 65 âm tiết):** Trước buổi học: Murphy §4.2.3 và §4.2.7 (hợp lý Bernoulli và Gaussian), §4.3 (tối thiểu hóa rủi ro thực nghiệm). Sau buổi học: Murphy §11.2.2, §10.2.3, §5.1, §5.4.1, §5.4.4.1; Shalev-Shwartz và Ben-David, Chương 2–4. Mở rộng: Shalev-Shwartz và Ben-David §5.2, Chương 6, §28.1; Murphy §5.4.4.2. Bài 13 mô hình hóa sự phụ thuộc giữa hành động và trạng thái bằng xác suất chuyển trạng thái.
- **Lý do tồn tại:** NT15: trang cuối 'Tài liệu tham khảo' và dòng nối sang bài sau. **Khoảng trống được lấp:** —
- **Nối:** ← bài tập về nhà; hết deck. **Phần câu hỏi mạch:** tổng kết. **Mục tiêu học tập:** —.
- **Nguồn:** §12 Tài liệu đọc (dòng 1546–1552); §11 đoạn cuối (dòng 1544). **Quyết định:** thêm.


## 7. Hành trình khái niệm

Bước theo NT8: vấn đề → trực quan → ví dụ → phát biểu → ý tưởng chứng minh → ứng dụng → kiểm tra.

| Cụm | Vấn đề | Trực quan | Ví dụ | Phát biểu | Ý tưởng chứng minh | Ứng dụng | Kiểm tra | Thời lượng |
|---|---|---|---|---|---|---|---|---|
| A. Mất mát bình phương, tập nghiệm (Định nghĩa 12.1, Mệnh đề 12.2, 12.3) | L12-3-01 | L12-3-02 | L12-3-01 (ba số đo, Nhắc lại nghiệm) | L12-3-03, L12-3-05 | L12-3-04; Mệnh đề 12.3: dòng "Chứng minh." trên L12-3-05 | dòng "Trong học máy" trên L12-3-06 (thêm đặc trưng vượt hạng); ghi chú diễn giả L12-3-03 (mạng sâu) | L12-3-06 (phản ví dụ hạng thiếu), L12-3-11 | 14,5 phút |
| B. Entropy chéo (Định nghĩa 12.5, Mệnh đề 12.6, Nhận xét 12.7) | L12-3-07 (dòng đầu) | L12-3-07 | L12-3-07 (dòng "Ví dụ.") | L12-3-08 | L12-3-09 | dòng "Trong học máy" trên L12-3-10 (chính quy hóa); ghi chú diễn giả L12-3-08 (ngưỡng nhãn) | L12-3-10 (phản ví dụ tồn tại), L12-3-12 (Bài tập 12.2 câu 3, lời giải trên mặt trang) | 11,5 phút |
| C. Rủi ro, ERM, lớp ngưỡng (Định nghĩa 12.8, 12.10, Mệnh đề 12.11) | L12-2-01, L12-4-01 (dòng đầu) | L12-4-01, L12-4-04 | L12-2-01 (ba bộ phân loại), L12-4-03 | L12-4-01, L12-4-02, L12-4-04 | L12-4-05 | dòng "Trong học máy" trên L12-4-06 (phá hòa); ghi chú diễn giả L12-4-03 (tập kiểm thử) | L12-4-06, L12-4-07 | 21 phút |
| D. Hội tụ đều, rủi ro dư, ba nguồn sai số (Định nghĩa 12.12, Định lý 12.13, Bổ đề 12.14, Hệ quả 12.15, Mệnh đề 12.16) | L12-5-01 (hai dòng đầu) | L12-5-01; dòng "Trực quan." trên L12-5-06 (rủi ro dư) và L12-5-08 (ba số hạng) | L12-5-02 | L12-5-03, L12-5-06, L12-5-08 | L12-5-04, L12-5-07; Mệnh đề 12.16: chứng minh một câu ở ghi chú diễn giả | L12-5-05 (lưới siêu tham số) | L12-5-09, L12-5-10 | 26,5 phút |
| E. Học PAC, số chiều VC (Định nghĩa 12.17, 12.18, Định lý 12.19, 12.20) | L12-6-01 (dòng "Câu hỏi:"), L12-6-03 (trước khi biên tập, dòng đầu: $M$ không dùng được) | L12-6-04 | L12-6-03 (trước định nghĩa phá vỡ) | L12-6-01, L12-6-04 (Định lý 12.19), L12-6-07 | L12-6-06; Định lý 12.20: không áp dụng (ghi chú không chứng minh) | L12-6-08, L12-6-09 | L12-6-02 (diễn giải), L12-6-10 | 22 phút |

Ký hiệu và dữ kiện chuyển từ ví dụ sang phát biểu:

- **Cụm A:** ba số đo $(x_i,y_i)$, $w_0+w_1x$ → $m_\theta(x_i)$, $A$, $J(w)$; Ví dụ 12.3 dùng đúng $\ker A$ của Mệnh đề 12.3.
- **Cụm B:** hai quan sát $(\mp1)$, $w=\log3$ → $m_w$, $\hat L_n$; (5.2) là (5.1) với $n=2$.
- **Cụm C:** $h_0$, $h_{0{,}3}$, $g$ và bốn sản phẩm của L12-2-01 → $R$, $\hat R_S$ (L12-4-01) → $x_-=-0{,}2$, $x_+=0{,}3$ (L12-4-06).
- **Cụm D:** ba lớp của L12-2-03 → $\Delta_S=0;\ 0{,}15;\ 1$ (L12-5-02) → cột $2\Delta_S$ của Ví dụ 12.11 (L12-5-09).
- **Cụm E:** điểm $\pm1$ và hai lớp (8.3) (L12-6-03) → $\mathcal H|_C$, vector $10$ trong bước 2 của L12-6-06.

Bước gộp và lý do:

- Cụm A gộp bước ví dụ vào bước vấn đề (L12-3-01), vì phép tính bình phương nhỏ nhất đã có ở deck Bài 01; phần mới là mô hình xác suất.
- Cụm B gộp vấn đề, trực quan, định nghĩa trên L12-3-07 (sáu dòng, trong trần); dòng đầu L12-3-07 là câu nối từ cụm A (nhãn $0$, $1$ thay cho mật độ Gaussian).
- Cụm A và B có bài tập riêng (L12-3-11, L12-3-12), theo cổng duyệt T9.
- Cụm C có trực quan ở hai nơi: phép trung bình (L12-4-01) và đoạn sai của ngưỡng (L12-4-04).
- Cụm E đặt ví dụ trước định nghĩa phá vỡ, theo thứ tự §8.2 của ghi chú.

## 8. Hình

**SVG có sẵn trong `img/lec-12/`:**

- `threshold-risks.svg` (Hình 12.1) và `vc-one-dimensional.svg` (Hình 12.2). Cả hai có `role="img"`, `<title>`, `<desc>`, nhưng chữ $10$–$13$ px theo viewBox ($656\times440$ và $728\times340$). Ở cột rộng khoảng 700 px của lưới hai cột, chữ hiển thị khoảng 10–13 px, dưới mức 16 px của NT25. `threshold-risks.svg` còn ghi "rủi ro mẫu" và $\widehat R_4$ thay cho "rủi ro thực nghiệm" và $\hat R_S$.
- Quyết định: deck không dùng hai tệp này. Người viết deck vẽ hai SVG mới cho deck (điểm Q5 ở mục 12); ghi chú giữ hình cũ.

**SVG mới cần vẽ:**

1. **`img/lec-12/deck-threshold-risks.svg`** (trang L12-4-06, cột phải của `lec-grid`).
   - Nội dung: trục ngang $t\in[-1,1]$ với vạch tại $-1;\ -0{,}8;\ -0{,}2;\ 0;\ 0{,}3;\ 0{,}7;\ 1$; trục đứng rủi ro $[0;\ 0{,}5]$ với vạch $0;\ 0{,}1;\ 0{,}15;\ 0{,}25;\ 0{,}5$.
   - Đường liền: $R(h_t)=\lvert t\rvert/2$ (chữ V, đỉnh $(0,0)$, hai đầu $(\pm1;\ 0{,}5)$).
   - Đường đứt nét: bậc thang $\hat R_S(h_t)$: $\tfrac12$ khi $t\le-0{,}8$; $\tfrac14$ trên $(-0{,}8;-0{,}2]$; $0$ trên $(-0{,}2;0{,}3]$; $\tfrac14$ trên $(0{,}3;0{,}7]$; $\tfrac12$ khi $t>0{,}7$. Điểm đóng ở đầu mút thuộc khoảng (bên phải của mỗi bậc), điểm mở ở đầu mút không thuộc.
   - Dải tô nhạt kèm gạch chéo trên $(-0{,}2;0{,}3]$ (màu không là tín hiệu duy nhất). Đánh dấu điểm $(0{,}3;\ 0{,}15)$ trên đường chữ V, nhãn "0,15".
   - Chữ trong hình ≥ 16 px khi hiển thị ở cả 1600×900 (cột phải ≈ 700 px) và 390×844 (hình dưới bảng, rộng ≈ 358 px): viewBox rộng 720 thì chữ ≥ 32 px. Rút số nhãn: chỉ "rủi ro kỳ vọng", "rủi ro thực nghiệm", "t", bốn đầu vào mẫu trên trục ngang và "0,15"; các vạch trục đứng khác không ghi số (số đã có trong bảng). Không vẽ công thức. Người viết deck đo cỡ chữ hiển thị bằng Playwright ở hai kích thước.
   - `<title>`: "Hai loại rủi ro của ngưỡng trên bốn sản phẩm". `alt` dự kiến: "Rủi ro kỳ vọng dạng chữ V bằng trị tuyệt đối của t chia 2 và rủi ro thực nghiệm dạng bậc thang trên bốn đầu vào âm 0,8; âm 0,2; 0,3; 0,7. Rủi ro thực nghiệm bằng 0 trên khoảng từ âm 0,2 (không kể) đến 0,3 (kể cả), trong khi rủi ro kỳ vọng trên khoảng đó thay đổi từ 0 đến 0,15."
   - Số trên hình mà mặt trang dùng ($0{,}15$, $-0{,}2$, $0{,}3$) đều có trong bảng và dòng "Diễn giải:" của L12-4-06.
2. **`img/lec-12/deck-labelings-two-points.svg`** (trang L12-6-03).
   - Nội dung: bốn ô xếp lưới $2\times2$ (viewBox $480\times360$), mỗi ô một trục số từ $-2$ đến $2$ có hai điểm $-1$ và $1$.
   - Điểm nhãn $1$: hình tròn đặc; nhãn $0$: hình tròn rỗng (hình dạng, không chỉ màu).
   - Ô "00": vạch ngưỡng tại $t=2$, mũi tên sang phải. Ô "01": vạch tại $t=0$, mũi tên sang phải. Ô "11": vạch tại $t=-2$, mũi tên sang phải. Ô "10": vạch tại $0$ với mũi tên sang trái, nhãn "chỉ lớp affine: w = −1, b = 0", và dấu gạch chéo ở dòng "lớp ngưỡng".
   - Chữ ≥ 22 px theo viewBox 480 (hiển thị ≥ 16 px khi hình rộng ≥ 350 px, đúng ở 390×844; ở 1600×900 hình rộng ≤ 600 px nên chữ ≈ 27 px): "00", "01", "10", "11", "t = 2", "t = 0", "t = −2", "w = −1". Ô "10" ghi "chỉ lớp affine". Mũi tên chỉ phía nhận nhãn $1$. Người viết deck đo cỡ chữ hiển thị ở hai kích thước.
   - `<title>`: "Bốn cách gán nhãn trên hai điểm". `alt` dự kiến: "Bốn cách gán nhãn 00, 01, 10, 11 trên hai điểm âm 1 và 1. Lớp ngưỡng tạo 00, 01, 11 với ngưỡng 2, 0, âm 2 và không tạo 10; lớp affine một chiều tạo cả 10 với độ dốc âm."
   - Không vẽ ba điểm nhãn $101$ (ở ghi chú diễn giả L12-6-06), để hình chỉ mang dữ kiện của Ví dụ 12.12.

## 9. Mạch Tổng kết

**Bảng tổng kết (L12-7-01)** `Kết quả | Giả thiết không được bỏ | Công thức hoặc thuật toán`:

| Kết quả | Giả thiết không được bỏ | Công thức hoặc thuật toán |
|---|---|---|
| Mất mát bình phương (Mệnh đề 12.2) | mô hình (4.2); (E1) $\sigma^2>0$ đã biết | (4.3) |
| Bình phương tối thiểu (Mệnh đề 12.3) | hạng cột đầy đủ khi cần nghiệm duy nhất | (4.4), (4.5) |
| Entropy chéo (Mệnh đề 12.6) | nhãn độc lập có điều kiện; $m_\theta(x_i)\in(0,1)$ | (5.1) |
| Rủi ro ngưỡng (Mệnh đề 12.11) | $X$ đều trên $[-1,1]$; mẫu có điểm âm và không âm | (6.6), (6.7) |
| Hội tụ đều (Định lý 12.13) | (G1)–(G3); xác suất $\ge1-\delta$ theo $S$ | (7.4), (7.5) |
| Rủi ro dư (Hệ quả 12.15) | như trên và (E2); xác suất $\ge1-\delta$ | (7.7) |
| Ba nguồn sai số (Mệnh đề 12.16) | (G2); tất định trên mọi mẫu | (7.8) |
| Số chiều VC (Định lý 12.19) | đầu vào trên trục thực | (8.4) |

Ô giả thiết trên mặt trang rút gọn như danh sách trang (80 âm tiết, trần 80); ghi chú diễn giả nêu đủ.

**Câu trả lời cho câu hỏi trung tâm (L12-7-02):**

- $h_0$, $h_{0{,}3}$, $g$ cùng có rủi ro thực nghiệm $0$, vì rủi ro thực nghiệm chỉ nhìn bốn điểm mẫu;
- trên lớp ngưỡng, $\Delta_S=0{,}15$, nên mọi nghiệm ERM có rủi ro không quá $0{,}15$, và $h_{0{,}3}$ đạt đúng cận;
- trên lớp mọi hàm đo được, $\Delta_S=1$, nên rủi ro thực nghiệm $0$ không bảo đảm gì, và $R(g)=\tfrac12$;
- khớp hoàn hảo vẫn dự đoán sai khi lớp quá linh hoạt so với cỡ mẫu (sai số ước lượng lớn) hoặc khi phân phối triển khai khác phân phối huấn luyện (vi phạm (G1)).

**Bài tập tổng hợp (L12-7-03, L12-7-04):** Bài tập 12.17 (`exercises.md` dòng 636–669), hàm ghi nhớ là một đa thức lấy ngưỡng; mặt trang ghi "quá khớp (overfitting)". Lời giải trên mặt trang: $p_S(x)=-\prod_{i\in I_1}\lVert x-x_i\rVert^2$ ($p_S\equiv-1$ khi $I_1=\varnothing$); $p_S\le0$, $p_S(x)=0$ khi và chỉ khi $x=x_i$, $i\in I_1$; $h_S=\mathbf 1_{\{p_S\ge0\}}$ thuộc lớp, $\hat R_S(h_S)=0$; trên ví dụ cảm biến $p_S(x)=-(x-0{,}3)^2(x-0{,}7)^2$, $p_S(0)=-0{,}0441$; sai số xấp xỉ $0$, rủi ro dư $\tfrac12$ là sai số ước lượng.

**Câu hỏi tự kiểm tra (L12-7-05)** và trả lời (ghi chú diễn giả):

1. Nhiễu Gaussian với phương sai đã biết cho mất mát nào? Giả thiết nào giữ tập nghiệm? Trả lời: tổng bình phương phần dư; (E1) phương sai đã biết, không phụ thuộc $\theta$ (Mệnh đề 12.2).
2. Với $h$ chọn trước, $\mathbb E_S[\hat R_S(h)]$ bằng gì? Còn đúng cho $\hat h_S$ không? Trả lời: bằng $R(h)$; không (hàm ghi nhớ trên nhãn nhiễu: $0$ so với $\tfrac12$).
3. $M=100$, $n=1000$, $\delta=0{,}05$: bộ phân loại học được có dự đoán đúng với xác suất $95\%$ không? Trả lời: không; $0{,}95$ là xác suất theo việc lấy tập huấn luyện, rủi ro dư $\le0{,}129$, xác suất dự đoán đúng là $1-R(\hat h_S)$ (§11, dòng 1532–1539).
4. Vì sao $\mathcal H_\uparrow$ không phá vỡ tập hai điểm? Trả lời: với $x_1<x_2$, $h_t(x_1)=1$ kéo theo $h_t(x_2)=1$, thiếu $10$.

**Bài tập về nhà (L12-7-06)** `Mục | Bài tập`, mỗi bài vào mạch cung cấp kiến thức cuối cùng bài đó cần:

| Mục | Bài tập |
|---|---|
| 3. Mất mát từ hợp lý có điều kiện | 12.1 (câu 4 giải trên lớp), 12.6, 12.7, 12.8, 12.9 |
| 4. Rủi ro kỳ vọng và tối thiểu hóa rủi ro thực nghiệm | 12.2 (câu 3 giải trên lớp; câu 5 cần rủi ro kỳ vọng), 12.3 (câu 1–2 giải trên lớp), 12.12 (dùng Ví dụ 12.8) |
| 5. Hội tụ đều và rủi ro dư | 12.10 (giải trên lớp) |
| 6. Học gần đúng với xác suất cao và số chiều VC | 12.4, 12.5, 12.11 (giải trên lớp), 12.13, 12.14, 12.15 (vi phạm (G1)), 12.16 (số chiều VC của hình chữ nhật), 12.17 (giải trên lớp) |

Mục 2 không có bài vì mọi bài đều cần ít nhất một mất mát hay một loại rủi ro. Liên kết dưới bảng: "Ghi chú bài giảng · Bài tập" tới `material-viewer.html?doc=materials/lec-12/lecture-note.md&deck=lecture-12-hoc-may-rui-ro-thong-ke-tong-quat-hoa.html` và `…doc=materials/lec-12/exercises.md&deck=…`.

**Tài liệu tham khảo (L12-7-07)** theo §12 của ghi chú: Murphy (2022), *Probabilistic Machine Learning: An Introduction*, §4.2.3, §4.2.7, §4.3, §5.1, §5.4.1, §5.4.4, §10.2.3, §11.2.2; Shalev-Shwartz và Ben-David (2014), *Understanding Machine Learning: From Theory to Algorithms*, Chương 2–6, §28.1. Dòng nối sang Bài 13 (§11, dòng 1544): "Bài 13: hành động đổi phân phối của trạng thái kế tiếp, nên dữ liệu không còn i.i.d. theo một $P$." Không dùng ký hiệu của Bài 13.

## 10. Bảng thuật ngữ

| Tiếng Việt (theo ghi chú) | Tiếng Anh trong ngoặc ở lần đầu | Trang lần đầu |
|---|---|---|
| bất đẳng thức hợp | union bound (ghi chú diễn giả) | L12-1-02 |
| hàm chỉ báo $\mathbf 1_{\{p\}}$ | indicator function (ghi chú diễn giả) | L12-1-02 |
| mất mát | loss | L12-2-02 |
| lớp giả thuyết (còn gọi là lớp mô hình) | hypothesis class | L12-2-02 |
| độc lập cùng phân phối | i.i.d. (dùng từ Bài 10–11) | L12-2-02 |
| mất mát $0$–$1$ | 0–1 loss | L12-2-03 |
| ma trận thiết kế | design matrix | L12-3-05 |
| phần dư; tổng bình phương phần dư | residual; sum of squared errors, SSE | ghi chú diễn giả L12-3-03; L12-3-11 |
| mô hình logistic | logistic regression | L12-3-07 |
| log-tỉ số xác suất | log-odds (ghi chú diễn giả) | L12-3-07 |
| entropy chéo nhị phân | binary cross-entropy, log loss | L12-3-08 |
| tách được tuyến tính | linearly separable | L12-3-10 |
| rủi ro kỳ vọng (còn gọi là rủi ro tổng thể) | expected risk, population risk | L12-4-01 |
| rủi ro thực nghiệm | empirical risk | L12-4-01 |
| rủi ro Bayes | Bayes risk | L12-4-01 |
| tối thiểu hóa rủi ro thực nghiệm | empirical risk minimization, ERM | L12-4-02 |
| khoảng cách tổng quát hóa | generalization gap | L12-4-03 |
| độ lệch đều | uniform deviation | L12-5-01 |
| tính hội tụ đều | uniform convergence | L12-5-03 |
| rủi ro dư | excess risk | L12-5-06 |
| sai số tối ưu hóa | optimization error | L12-5-08 |
| sai số xấp xỉ | approximation error | L12-5-08 |
| sai số ước lượng (còn gọi là sai số do lấy mẫu) | estimation error | L12-5-08 |
| học gần đúng với xác suất cao (tiêu đề trang), học PAC | probably approximately correct, PAC | L12-6-01 |
| không giả định khả thực; khả thực | agnostic; realizable | L12-6-01 |
| tham số độ chính xác; độ tin cậy | accuracy parameter; confidence | L12-6-02 |
| phá vỡ | shatter | L12-6-04 |
| số chiều Vapnik–Chervonenkis (số chiều VC) | VC dimension | L12-6-04 |
| kỹ thuật xích | chaining (ghi chú diễn giả) | L12-6-07 |
| quá khớp | overfitting | L12-7-03 |

Thuật ngữ theo `planning/notes-10-14-slt-template.md` Q8, Q13, Q14: "rủi ro kỳ vọng" (không "rủi ro tổng thể" sau lần đầu), "hàm mất mát"/"mất mát", "hợp lý cực đại", "tập huấn luyện", "phân phối"; $m_\theta$ cho xác suất nhãn 1; $L$ cho hàm hợp lý; dấu thập phân là dấu phẩy.

## 11. Danh sách kỹ thuật đã giới thiệu đến hết Bài 12

| Kỹ thuật | Bài và trang giới thiệu | Ở Bài 12 |
|---|---|---|
| Biến phụ đưa cực đại của hàm affine về quy hoạch tuyến tính | deck Bài 02 | không dùng |
| Phương trình chuẩn; cộng phần tử hạt nhân giữ nghiệm | deck Bài 00, 01 (Hệ quả 01.5), 05 | Nhắc lại: L12-1-02, L12-3-05 |
| Bất đẳng thức Jensen | deck Bài 05b, 06, 06c | không dùng |
| Kỳ vọng toàn phần, tuyến tính của kỳ vọng | deck Bài 06, 10, 11 | dùng ở ghi chú diễn giả L12-4-01 (không nêu thành kỹ thuật) |
| Bất đẳng thức hợp | deck Bài 10 (Hệ quả 10.7) | Nhắc lại: L12-1-02, L12-5-04 |
| Bất đẳng thức Hoeffding | ghi chú Bài 05c (Định lý 05c.47, 05c.52); chưa có deck | Nhắc lại: L12-1-02, L12-5-01 |
| Lấy âm log: log tăng chặt giữ tập nghiệm | deck Bài 11 (HL07, Mệnh đề 11.3) | Nhắc lại: L12-3-04 |
| Số mũ $y\in\{0,1\}$ gộp hai trường hợp nhãn | deck Bài 11 (TS01 ghi chú diễn giả, TS07) | Nhắc lại: L12-3-09 (cổng duyệt N6); dùng lại ở Bài tập 12.9 |
| Cận một hàm cố định cộng bất đẳng thức hợp trên lớp hữu hạn | **mới**, L12-5-04 (một dòng "Kỹ thuật.") | dùng lại ở L12-5-10 (Bài tập 12.10), Bài tập 12.15 |
| "Chèn một đại lượng trung gian rồi chuyển vế" | **mới**, L12-5-07 (dòng "Kỹ thuật."; tên dùng chung với deck 13, Q8) | deck 13 nhắc lại |
| "So với phần tử bất kỳ rồi lấy cận dưới đúng" | **mới**, L12-5-07 (cùng dòng "Kỹ thuật."; tên dùng chung với deck 13, Q8) | dùng ở ghi chú diễn giả L12-5-08; deck 13 nhắc lại |
| Thứ tự trên trục thực: vector nhãn đổi chiều không biểu diễn được | **mới**, L12-6-06 (một dòng "Kỹ thuật.") | dùng lại ở L12-6-10 (Bài tập 12.11) |

Không có trang "Kỹ thuật." riêng: bốn kỹ thuật mới (ghép cận một hàm với bất đẳng thức hợp; hai mẹo của L12-5-07; thứ tự trên trục thực) là một dòng trên trang ý tưởng chứng minh (NT7, Q6). Hai mẹo của L12-5-07 dùng lại ở deck 13 với đúng tên trên.

## 12. Rủi ro, đề xuất sửa ghi chú, điểm cần quyết định

**Ngoại lệ mật độ và độ dài dòng** (NT17; mọi trang nội dung ≤ 60 âm tiết, trang mục tiêu, nội dung, bảng tổng kết, bài tập về nhà ≤ 80, đếm bằng script):

| Trang | Dòng vượt 20 âm tiết | Số âm tiết của dòng | Lý do |
|---|---|---|---|
| L12-1-01 | luận điểm bìa | 39 | NT11 đòi đúng một câu có hai điều kiện và loại bảo đảm (cổng duyệt T11) |
| L12-1-05 | hộp câu hỏi | 24 | câu in đậm của ghi chú, giữ nguyên |
| L12-3-10 | dòng "Diễn giải:" | 21 | chứa định nghĩa tách được tuyến tính (cổng duyệt T10) |
| L12-3-11 | đề Bài tập 12.1 câu 4 | 29 | NT24: giữ câu chữ đề |
| L12-3-12 | đề Bài tập 12.2 câu 3 | 25 | NT24: giữ câu chữ đề |
| L12-4-07 | đề Bài tập 12.3 câu (b) | 26 | NT24: giữ câu chữ đề |
| L12-5-06 | dòng "Trực quan." | 23 | câu nối độ lệch đều → rủi ro dư kèm định nghĩa rủi ro dư (cổng duyệt T7) |
| L12-5-07 | dòng "Kỹ thuật." | 22 | hai tên kỹ thuật cố định theo Q8 |
| L12-5-09 | dòng "Diễn giải:" | 24 | đối chiếu hai lớp trong một câu, như dòng cuối Ví dụ 12.11 |
| L12-6-04 | dòng định nghĩa số chiều VC | 22 | tên đầy đủ và tên tiếng Anh (NT21) |

Trang sát trần (≥ 58 âm tiết): L12-1-02 (59), L12-2-01 (60), L12-3-02 (59), L12-3-07 (59), L12-3-08 (58), L12-3-11 (60), L12-3-12 (59), L12-4-01 (58), L12-4-03 (59), L12-4-04 (60), L12-4-07 (60), L12-5-04 (59), L12-5-07 (59), L12-5-08 (59), L12-6-01 (60), L12-6-02 (60), L12-6-08 (58), L12-6-09 (58); Mục tiêu học tập 80/80, Bảng tổng kết 80/80. Người viết deck không thêm chữ vào các trang này.

**Rủi ro:**

- R1. Các công thức hiển thị dài có thể tràn ở 390 px: (6.1)–(6.2) trên L12-4-01, chuỗi bốn bất đẳng thức trên L12-5-07, (5.1) trên L12-3-08, (4.3) trên L12-3-03, (8.5) có "$\Longrightarrow$" trên L12-6-07; hai dòng đề của L12-5-10 chứa công thức dài (đã tách thành hai dòng). Người viết deck đo ở 390 px và ngắt bằng `aligned`, một quan hệ mỗi dòng.
- R2. L12-4-06 đặt bảng năm hàng và hình mới cạnh nhau (`lec-grid`); ở 1600×900 có thể chạm chân trang. Phương án: hình ở dưới bảng trên màn hẹp (mặc định của `lec-grid`), kiểm `footer_check.py`.
- R3. Lời giải bằng `fragment` trên L12-3-11, L12-3-12, L12-4-07, L12-5-10, L12-6-10: kiểm tra `Reveal.slide(h, v, 99)` để chụp ảnh đủ fragment.
- R4. Ví dụ 12.2 chỉ còn dòng "Nhắc lại:"; nếu người duyệt coi đây là bỏ ví dụ của ghi chú, trả lời bằng NT9 (deck Bài 01 đã giải) và Q2 dưới đây.
- R5. (Đã xử lý theo cổng duyệt T6: dòng "Mục tiêu:" của L12-2-02 chuyển vào ghi chú diễn giả.) Từ "rủi ro" xuất hiện trên mặt trang lần đầu ở mục tiêu học tập và L12-4-01.
- R6. Từ khóa mạch 4 và tiêu đề L12-4-04, L12-4-05 dùng "ERM" sau khi L12-4-02 nêu tên đầy đủ; dòng dẫn mạch 4 và mục tiêu học tập không dùng chữ viết tắt này.

**Đề xuất sửa ghi chú (NT3; không tác tử nào sửa ghi chú):**

- N1. `img/lec-12/threshold-risks.svg` (Hình 12.1): phần `<desc>` viết "rủi ro mẫu", nhãn trong hình viết $\widehat R_4(h_t)$; ghi chú dùng "rủi ro thực nghiệm" và $\hat R_S$ (Q13, Q14). Đề xuất đổi chữ trong SVG cho thống nhất.
- N2. Cả hai SVG của ghi chú có chữ 10–13 px theo viewBox và một nhãn 5,85 px; ở trình xem ghi chú hẹp 390 px chữ còn nhỏ hơn. Đề xuất vẽ lại với chữ lớn hơn, hoặc dùng chung hai SVG mới của deck (mục 8) nếu tác giả đồng ý.
- N3. `vc-one-dimensional.svg` ghi "Nhãn (0, 0)", còn Ví dụ 12.12 viết gọn "00". Đề xuất dùng một cách viết.
- Không thấy lỗi toán học trong ghi chú và bài tập: mọi số của mục 5 tính lại khớp.

**Điểm cần điều phối viên quyết định:**

- Q1. **60 trang** (bằng trần 60; trước cổng duyệt là 59). Lý do: chín kết quả chính có trang phát biểu, sáu kết quả cốt lõi có trang ý tưởng chứng minh riêng (NT6), sáu bài tập có lời giải trên mặt trang (năm cụm A–E và bài tổng hợp, NT24, NT15; bài cụm entropy chéo thêm theo cổng duyệt T9), bảy trang tiêu đề mạch. Thời lượng cân lại: L12-3-12 2,5 phút, bù bằng L12-2-03, L12-3-06, L12-6-02, L12-6-05, L12-7-05 mỗi trang bớt 0,5 phút; tổng 120 phút. Phương án rút về 55 nếu cần: bỏ L12-6-07 (Định lý 12.20, đọc thêm) và đưa (8.5) vào L12-6-08; gộp L12-7-03 và L12-7-04 bằng `fragment`; bỏ L12-5-05 và đưa Ví dụ 12.10 vào ghi chú diễn giả L12-5-03; gộp L12-6-01 và L12-6-02 sau khi chuyển dòng diễn giải vào ghi chú diễn giả.
- Q2. Ví dụ 12.2 không có trang riêng (deck Bài 01 đã giải đúng phép tính); bài tập trên lớp của cụm Gaussian là Bài tập 12.1 câu 4 (hiện tượng vô nghiệm khi khớp hoàn hảo), không phải câu 2 (lặp lại phép giải phương trình chuẩn).
- Q3. Ví dụ 12.4, Mệnh đề 12.9, Ví dụ 12.6, Nhận xét 12.4 ý 2–3 chỉ ở ghi chú diễn giả.
- Q4. (Điều phối viên bác bỏ.) L12-6-01 nay theo thứ tự ghi chú: thiết lập khả thực với (8.1) và lượng từ "mọi $P$ khả thực", rồi thiết lập không giả định khả thực với (8.2) cho mọi $P$ trên $\mathcal X\times\{0,1\}$; dòng thứ hai là câu nối với Hệ quả 12.15.
- Q5. Hai SVG mới (`deck-threshold-risks.svg`, `deck-labelings-two-points.svg`) do người viết deck vẽ trong `img/lec-12/`; không cần lớp CSS mới (dùng `lec-grid`, `figure`, `table-scroll`, `fragment`, `box` có sẵn).
- Q6. Không có trang "Kỹ thuật." riêng (mục 11).
- Q7. Mệnh đề 12.3 có dòng "Chứng minh." trên trang phát biểu, Mệnh đề 12.16 có chứng minh một câu ở ghi chú diễn giả (mặt trang mang dòng "Trực quan.", cổng duyệt T7), thay cho trang ý tưởng chứng minh riêng; Bổ đề 12.14 là bước 2 của trang ý tưởng chứng minh Hệ quả 12.15.

## Sửa theo cổng duyệt (2026-11-16)

Báo cáo: `planning/lec-12/reviews/deck-storyboard-gate.md`. Điều phối viên chấp nhận mọi phát hiện. Mật độ của mọi trang đã đổi đếm lại bằng `count.py`; số mới ở mục 6. Sau khi sửa: 60 trang, 120 phút, mọi trang nội dung ≤ 60 âm tiết, Mục tiêu học tập 80, Bảng tổng kết 80, ≤ 6 dòng mỗi trang (trừ trang Nội dung, 8 mục), ghi chú diễn giả ≤ 150 âm tiết.

| # | Trang | Kết quả |
|---|---|---|
| G1 | L12-6-01 | đã sửa: thứ tự ghi chú (khả thực, (8.1) với "mọi $P$ khả thực"; rồi không giả định khả thực, (8.2) với "mọi $P$ trên $\mathcal X\times\{0,1\}$"); giả thiết "lớp các bộ phân loại, mất mát $0$–$1$" trên mặt trang; câu nối Hệ quả 12.15 ở dòng hai; 60 âm tiết |
| G2 | L12-6-02 | đã sửa: "$6636$ quan sát đủ cho ERM chính xác"; ghi chú diễn giả thêm "cỡ mẫu nhỏ nhất cần thiết có thể nhỏ hơn" |
| G3 | L12-6-01, L12-6-03 | đã sửa: dòng "Câu hỏi: Lớp vô hạn được bảo đảm thế nào?" mở L12-6-01; dòng đầu L12-6-03 "$\mathcal H_\uparrow$ vô hạn, nên $M$ trong (7.5) không dùng được …"; bảng mạch ghi câu hỏi mới |
| T1 | L12-5-03 | đã sửa: câu "Nói riêng" chứa (7.3); mục 4 sửa dòng (7.3) |
| T2 | L12-5-07 | đã sửa: chuỗi viết $\varepsilon_n$, bước 3 kết bằng (7.7); $\varepsilon$ chỉ cho độ chính xác ở bước 4 |
| T3 | L12-3-07 | đã sửa: $\hat p=\frac1n\sum_iy_i$ |
| T4 | L12-6-08 | đã sửa: nêu loại bảo đảm của (8.5); $\Delta_S=1$ "dùng $\tilde h$" |
| T5 | L12-4-01 | đã sửa: "… đúng bốn nhãn, khác nhau trên sản phẩm mới"; rút gọn dòng "Trực quan." và hai dòng cuối, 58 âm tiết |
| T6 | L12-2-02 | đã sửa: dòng đầu nêu các đối tượng cần ($P$, $\mathcal H$, $\ell$, quy tắc học); dòng "Mục tiêu:" chuyển vào ghi chú diễn giả |
| T7 | L12-5-06, L12-5-08 | đã sửa: dòng "Trực quan." trên cả hai trang; dòng "Ý nghĩa: … 0,129" của L12-5-06 và dòng chứng minh của L12-5-08 chuyển vào ghi chú diễn giả |
| T8 | L12-3-06, L12-3-10, L12-4-06 | đã sửa: ba dòng "Trong học máy" trên mặt trang; L12-4-03 không thêm (59 âm tiết), tập kiểm thử giữ ở ghi chú diễn giả |
| T9 | L12-3-12 (mới) | đã sửa: thêm "Bài tập: entropy chéo khi cực tiểu không đạt được" (Bài tập 12.2 câu 3, lời giải bằng fragment); deck lên 60 trang; thời lượng cân lại (mục 12, Q1) |
| T10 | L12-3-10 | đã sửa: dòng "Diễn giải:" chứa điều kiện tách được với $w=1$ |
| T11 | L12-1-01 | đã sửa: thêm "với xác suất cao"; 39 âm tiết, ghi ngoại lệ |
| T12 | L12-6-00 | đã sửa: "Số chiều VC đo độ linh hoạt của một lớp vô hạn bằng số điểm lớn nhất mà lớp gán được mọi nhãn." (23) |
| T13 | mục 8 | đã sửa: chữ ≥ 16 px khi hiển thị ở 1600×900 và 390×844 (viewBox 720 → chữ ≥ 32 px, bớt nhãn; hình hai điểm thành lưới $2\times2$, viewBox 480, chữ ≥ 22 px); người viết đo bằng Playwright |
| N1 | L12-1-02 | đã sửa: $A\in\mathbb R^{n\times p}$, "nhận giá trị trong $[0,1]$", "với mọi $\varepsilon>0$"; lý do nhắc 11.4, 05c.52 tại chỗ ghi ở trường "Quyết định" |
| N2 | L12-1-03 | đã sửa một phần: mục 1 "vô nghiệm hữu hạn", mục 2 "tách duy nhất của hệ số với giá trị khớp", mục 5 "chứng minh số chiều VC của ngưỡng"; mục 3 dùng "ERM" (tên đầy đủ ở ghi chú diễn giả và trang Nội dung) để giữ trần 80 |
| N3 | L12-2-02 | đã sửa: tiêu đề "Các thành phần của bài toán học"; "độc lập cùng phân phối (i.i.d.)"; bỏ câu quy trình trong ghi chú diễn giả |
| N4 | L12-3-04, L12-3-09, L12-4-05, L12-6-06 | đã sửa: mỗi trang một công thức hiển thị then chốt; "Nhắc lại:" của L12-3-04 lên đầu trang (bước 2–3 gộp để giữ 6 dòng) |
| N5 | L12-3-05 | đã sửa: "Giả thiết:" trước "Nhắc lại:"; dòng nhắc lại rút gọn; gắn nhãn (4.5) |
| N6 | L12-3-09 | đã sửa: "Nhắc lại: $m^y(1-m)^{1-y}$ … (Bài 11)" ở đầu trang; mục 4, 11 sửa theo |
| N7 | L12-3-11 | đã sửa: ghi chú diễn giả nối với hiện tượng ở Bài 11 |
| N8 | L12-4-03 | đã sửa: công thức của khoảng cách tổng quát hóa tại chỗ gọi tên |
| N9 | L12-4-07, L12-7-03 | đã sửa: trường "Quyết định" khớp mặt trang |
| N10 | L12-5-02 | đã sửa: "mọi rủi ro thuộc $[0,1]$, nên $\Delta_S=1$" |
| N11 | mục 5 | đã sửa: phản ví dụ bỏ (G3) ghi cách dựng ở mục 5, điểm 20 |
| N12 | L12-5-06, L12-6-02 | đã sửa: bỏ đoạn đọc số 0,95 ở L12-5-06; câu dạng dương ở L12-6-02 |
| N13 | L12-6-08 | đã sửa: "Chọn nghiệm ERM $h_{0{,}3}$"; "chỉ lớp ngưỡng có cận (8.5) cho mọi $P$" |
| N14 | L12-6-09 | đã sửa: tiêu đề "Dữ liệu triển khai khác phân phối huấn luyện" |
| N15 | L12-7-01 | đã sửa: cột "Công thức hoặc thuật toán"; bù bằng "hạng cột đầy đủ", "mẫu hai loại điểm" (80 âm tiết) |
| N16 | L12-7-03 | đã sửa: "quá khớp (overfitting)"; ghi chú diễn giả nêu nghĩa trên ví dụ |
| N17 | L12-7-06 | đã sửa: ghi chú diễn giả thành hướng dẫn tự học theo mục tiêu |
| N18 | L12-1-04, L12-1-05, L12-5-00, L12-5-10, L12-6-06 | đã sửa: "phần" thay "mạch", "Bước tiếp theo là" thay "Lời giải là" |
| N19 | mục 6 | đã sửa: câu mở mục 6 ghi các từ mở dòng viết thường, không in đậm |
| N20 | L12-4-01, L12-5-04, L12-5-07 | đã sửa: dòng "Trực quan." có động từ; bỏ hai dấu hai chấm kiểu "colon reveal" |
| N21 | mục 12, L12-5-10 | đã sửa: R1 bổ sung (4.3), (8.5); đề L12-5-10 tách thành hai dòng |
| N22 | L12-2-02 | đã sửa: ghi chú diễn giả nêu chỗ đổi nghĩa của $\ell$ so với Bài 11 |
| N23 | L12-6-04, L12-6-05, L12-7-00, L12-3-01 | đã sửa: rút hai dòng ≤ 20 âm tiết ("đầu vào vẫn một tọa độ" chuyển vào ghi chú diễn giả); dòng dẫn mạch 7 "các giả thiết"; L12-3-01 thêm "duy nhất" |
| N24 | L12-3-07 | đã sửa: dòng đầu là câu nối Gaussian → Bernoulli |
| Q8 | L12-5-07 | đã sửa: dòng "Kỹ thuật." gọi đúng hai tên "chèn một đại lượng trung gian rồi chuyển vế" và "so với phần tử bất kỳ rồi lấy cận dưới đúng" |

Không có phát hiện nào bị bác. N2 sửa một phần (mục 3 của Mục tiêu học tập dùng chữ viết tắt ERM) vì trần 80 âm tiết; cả sáu mục vẫn giữ ý của ghi chú. Đề xuất sửa ghi chú D1, D2 của báo cáo thuộc phạm vi `review-log.md` (điều phối viên).

## Quyết định của điều phối viên (2026-11-16, sau khi duyệt storyboard)

- Q1 **chấp nhận:** 59 trang, trong trần 60 của NT27; lý do ở mục 12. Sau cổng duyệt: 60 trang (thêm L12-3-12 theo T9), bằng trần, chấp nhận.
- Q2 **chấp nhận:** Ví dụ 12.2 chỉ "Nhắc lại:" (NT9, deck Bài 01 đã giải); bài tập trên lớp cụm Gaussian là Bài tập 12.1 câu 4.
- Q3 **chấp nhận.**
- Q4 **bác bỏ:** L12-6-01 giữ thứ tự của ghi chú (thiết lập khả thực trước, không giả định khả thực sau), theo NT2; câu nối với Hệ quả 12.15 đặt ở dòng thứ hai.
- Q5 **chấp nhận:** hai SVG mới của deck do người viết vẽ; SVG của ghi chú giữ nguyên.
- Q6 **chấp nhận:** Hoeffding đã dạy ở ghi chú 05c, bất đẳng thức hợp ở deck 10, nên chỉ "Nhắc lại:" (NT7); bốn mẹo một-chứng-minh là một dòng "Kỹ thuật." trên trang ý tưởng chứng minh.
- Q7 **chấp nhận.**
- Q8 (thêm sau khi duyệt storyboard Bài 13): dòng "Kỹ thuật." trên L12-5-07 gọi tên đúng hai mẹo mà deck 13 sẽ nhắc lại: "so với phần tử bất kỳ rồi lấy cận dưới đúng" và "chèn một đại lượng trung gian rồi chuyển vế". Tên này dùng chung cho hai deck.
- N1–N3 ghi vào `review-log.md` làm đề xuất sửa ghi chú cho tác giả.


## Lệch khi dựng deck (người viết deck, 2026-11-16)

Deck: `2627-1/lecture-12-hoc-may-rui-ro-thong-ke-tong-quat-hoa.html`, 60 trang, đúng thứ tự và ID của mục 6. Các chỗ lệch so với mặt trang dự kiến:

| Trang | Lệch | Lý do |
|---|---|---|
| L12-1-03 | Mục 3 viết "tối thiểu hóa rủi ro thực nghiệm" thay "ERM"; mục 1 "nhận ra khi nghiệm không tồn tại", mục 2 "tách duy nhất hệ số, giá trị khớp", mục 3 "Định nghĩa rủi ro, …; tính rủi ro ngưỡng", mục 4 "Chứng minh hội tụ đều, chặn rủi ro dư …", mục 5 "số chiều Vapnik–Chervonenkis của ngưỡng", mục 6 "nhận ra vi phạm giả thiết" | chỉ thị của điều phối viên (tên đầy đủ trước định nghĩa); rút chữ để giữ 80 âm tiết (`deck_lint`: 80) |
| L12-4-06 | Tiêu đề "Ví dụ: rủi ro của các ngưỡng trên bốn sản phẩm"; bảng xoay ngang (3 hàng × 5 ngưỡng), $1/4$ thay $\frac14$; hình ở cột phải của `responsive`, "Diễn giải:" và dòng "Trong học máy" ở cột trái | bảng dọc năm hàng cùng hình chạm chân trang ở 1600×900; `lec-grid` không có luật cho Bài 12, dùng `responsive` + `figure.visual` như deck 11 |
| L12-4-07 | Nhãn câu "1.", "2." thay "(a)", "(b)" như đề Bài tập 12.3; lời giải câu 2 gộp thành một dòng | đúng số câu của đề; trang chạm chân trang |
| L12-5-07 | Tiêu đề "Ý tưởng chứng minh: rủi ro dư của ERM"; $\inf\nolimits_{h'}$; chuỗi bốn bất đẳng thức một quan hệ mỗi dòng | chuỗi bốn dòng làm trang chạm chân trang; tiêu đề một dòng |
| L12-6-03 | Tiêu đề "Ví dụ: các cách gán nhãn trên hai điểm"; dòng đầu "… trên hai điểm chỉ có $4$ vector nhãn"; dòng lớp ngưỡng "$h_t(-1)=1$ kéo theo $h_t(1)=1$"; "Diễn giải:" đặt dưới lưới, "4 vector nhãn" | chữ và hình vượt khung ở 1600×900 |
| L12-6-06 | Dòng "Kỹ thuật." viết "Thứ tự trên trục: nhãn đơn điệu theo $x$ không tạo được vector đổi chiều."; công thức bước 2 ngắt hai dòng | chạm chân trang; công thức tràn ở 390 px |
| L12-3-09 | Bước 1 viết "$L(\theta)$ là tích các nhân tử …"; công thức tương đương ngắt hai dòng | công thức nội dòng không xuống dòng được ở 390 px |
| Nhiều trang | Số hiệu công thức viết `\qquad(4.3)` thay `\tag{4.3}`; (4.3), (5.1), (6.1)–(6.2), (8.5) và công thức của L12-3-04 ngắt bằng `aligned` | `\tag` chồng lên công thức trong vùng cuộn ở 390 px; vài công thức vẫn cuộn ngang ở 390 px (vùng cuộn có dấu ↔ của deck 11) |
| L12-7-01 | `<colgroup>` với `width` 44/40/16 % | không có luật độ rộng cột cho Bài 12; không có cột cố định thì bảng chạm chân trang |
| L12-1-04 | "Đọc trước" là đoạn riêng dưới danh sách | `deck_lint` đếm mục `li` bằng số mạch |
| Ghi chú diễn giả | Bỏ câu nhắc ERM gần đúng ở L12-3-12 (ERM định nghĩa ở mạch 4); dòng `note-source` của L12-5-10, L12-6-10, L12-7-03 dẫn nguồn sách như tiêu đề bài tập trong `exercises.md` | NT9, NT22 |

**Hình** (mục 8):

- `deck-threshold-risks.svg`: viewBox $780\times356$ (tọa độ dữ liệu $x=385+300t$, $y=440-600r$), chữ 38 đơn vị, chú giải đặt giữa hai nhánh chữ V, dải gạch chéo từ $r\approx0{,}33$ xuống trục. Đo bằng Playwright: hình rộng 593 px ở 1600×900 (chữ ≈ 29 px), 336 px ở 390×844 (chữ ≈ 16,4 px). ViewBox 720 và chữ 32 của mục 8 cho 13,8 px ở 390 px.
- `deck-labelings-two-points.svg`: viewBox $560\times400$, chữ 28–30 đơn vị; ở 390×844 hình rộng 336 px (chữ ≥ 16,8 px). Không vẽ dấu gạch chéo ở dòng "lớp ngưỡng"; ô 10 ghi "chỉ lớp affine" và "w = −1, b = 0".

**Kiểm tra máy còn lại** (CSS thật, máy chủ tĩnh): `deck_lint` 0 phát hiện; `footer_check` 0 trang; `deck_check` console 0, pageerrors 0, failed 0, không `.katex-error`; OVERFLOW/NARROW-H trên L12-5-03, L12-5-05 là đuôi SVG của `\sqrt` (báo động giả đã biết); SYLL của L12-1-01 là bìa (luận điểm 39 âm tiết, ngoại lệ mục 12); SYLL của L12-7-01 do `deck_check` so khớp "Tổng kết" phân biệt hoa thường, `deck_lint` dùng trần 80 (78 âm tiết); LINES của L12-1-04 là trang Nội dung; các dòng LINE20 đều nằm trong bảng ngoại lệ mục 12.

## Biên tập sau năm báo cáo duyệt (2026-11-16)

Theo bảng quyết định F1–F11 trong `review-log.md`. Deck vẫn 60 trang, 120 phút. Mục này thắng các mục trước khi khác nhau.

**Thứ tự và ID.** L12-3-11 đứng ngay sau L12-3-06 (bài tập cụm Gaussian liền cụm Gaussian; ID giữ nguyên để đối chiếu với báo cáo duyệt). L12-6-05 bỏ: Định lý 12.19 phát biểu ở dòng cuối L12-6-04 ("Định lý 12.19. Giả thiết: … Kết luận: … (8.4)"), ý nghĩa và ví dụ $\lceil0{,}5\sin(\theta x)\rceil$ vào ghi chú diễn giả L12-6-04. Bảng tổng kết tách hai trang: L12-7-01 (Mệnh đề 12.2, 12.3, 12.6, 12.11) và L12-7-01b "Bảng tổng kết (tiếp)" (Định lý 12.13, Hệ quả 12.15, Mệnh đề 12.16, Định lý 12.19); cột thứ ba ghi công thức gọn và loại bảo đảm (F1).

**Tiêu đề đổi.** L12-2-03 "Ví dụ: ba lớp giả thuyết trên bốn sản phẩm"; L12-3-01 "Ví dụ: hồi quy trên ba số đo"; L12-5-09 "Ví dụ: ba nguồn sai số trên bốn sản phẩm"; L12-6-02 "Tham số độ chính xác và độ tin cậy"; L12-6-09 "Phân phối triển khai khác phân phối huấn luyện"; L12-7-04 cùng tiêu đề L12-7-03; L12-1-04 mục 6 "Học gần đúng với xác suất cao (PAC) và số chiều VC". Tên ví dụ phân loại xuyên suốt trên mặt trang: "bốn sản phẩm".

**Thời lượng.** L12-6-04 3 phút (nhận 1 phút của L12-6-05 trừ 0,5), L12-7-01 1,5 phút, L12-7-01b 1,5 phút, L12-7-05 0,5 phút; mạch 6: 22 phút, mạch 7: 11,5 phút; tổng 120 phút.

**Ngoại lệ mật độ và độ dài dòng** (đếm bằng `deck_lint.py`/`deck_check.py`; thay bảng ở mục 12):

| Trang | Ngoại lệ | Lý do |
|---|---|---|
| L12-1-01 | luận điểm bìa 47 âm tiết một câu | F4 và báo cáo: thêm "chọn trước" (G3) và điều kiện định lượng "số hàm hoặc số chiều VC" |
| L12-1-03 | 110 âm tiết (trần 80); một mục 21 âm tiết | F9: sáu mục tiêu đúng nghĩa ghi chú, đủ động từ; trần 110 do điều phối viên chốt |
| L12-1-05 | hộp câu hỏi 24 | câu in đậm của ghi chú |
| L12-2-02 | dòng (G1) 21 | phân phối đích, tập huấn luyện, (G1) và i.i.d. trên một dòng song song |
| L12-3-01 | dòng cuối 24 | câu nối mạch 2 → 3 và điều kiện tồn tại/duy nhất (chuyen-gia, mach-truyen) |
| L12-3-10 | "Diễn giải:" 23 | định nghĩa tách được tuyến tính kèm tên tiếng Anh |
| L12-3-11, L12-3-12, L12-4-07 | đề bài tập 29, 25, 25 | NT24: giữ câu chữ đề |
| L12-5-01 | "Trực quan." 23 | câu trực quan theo ghi chú ("nhiều cách giải thích dữ liệu") |
| L12-5-06 | "Trực quan." 23 | so độ lệch đều với rủi ro dư (S6) |
| L12-5-09 | "Diễn giải:" 24 | đối chiếu hai lớp như dòng cuối Ví dụ 12.11 |
| L12-6-01 | dòng định nghĩa học PAC 21 | tên đầy đủ và tên tiếng Anh (F4) |
| L12-7-01 | `deck_check` báo SYLL | so khớp "Tổng kết" phân biệt hoa thường; `deck_lint` dùng trần 80, trang 63 âm tiết |

**Công thức ở 390 px.** Số hiệu (4.1), (4.3), (5.1), (6.1)–(6.2), (6.4), (6.6), (7.2), (7.4), (7.7), (7.8), (8.1), (8.5) đặt trong câu dẫn, không trong công thức; mọi `.formula` và `.table-scroll` đo bằng Playwright ở 390×844 không còn cuộn ngang (F3). Ký hiệu mới trên mặt trang: $Q(\theta)=\sum_i(y_i-m_\theta(x_i))^2$ (L12-3-03, dùng ở L12-3-04, L12-7-01) và $m_i=m_\theta(x_i)$ (L12-3-08, dùng ở L12-3-09). Bảng L12-2-01, L12-4-06 dùng `stack-table`.

**Hình.** `deck-threshold-risks.svg` thêm nhãn trục "0,5", "0,25" và "0" (toan-hoc), chữ 38 đơn vị; nhãn "−0,2" dời sang trái để không chạm "0".

**Lượt sửa sau kiểm lại 1 (K1–K16).** Tên mạch 6 thống nhất "Học gần đúng với xác suất cao và số chiều VC" (L12-1-04, L12-6-00, L12-7-06); PAC chỉ đi kèm tên đầy đủ ở L12-6-01. L12-3-02 khôi phục "mỗi đầu vào $x$"; L12-4-02 khôi phục "Với $\mathcal H$ chọn trước (G3)"; L12-4-01 trả "population risk"; L12-2-02 ghi tên tiếng Anh của i.i.d.; L12-6-01 câu hỏi có vế phân phối đổi; L12-6-03 mở bằng "Dữ kiện:". Ngoại lệ thêm: L12-7-06 62 âm tiết (bảng `Mục | Bài tập` có tên đủ của mạch, trần 80 của trang bài tập về nhà theo mục 12; `deck_lint` dùng trần 60 cho tiêu đề này). L12-1-03: ngoại lệ đã duyệt tới 120 âm tiết (1,5 × 80) để giữ đúng nghĩa mục tiêu của ghi chú; `deck_lint` đếm 120 sau khi thêm "của" ở mục 5 (R4). Dòng mục 3 dài 27 âm tiết (vượt 20): câu chữ điều phối viên chốt để giữ đúng nghĩa mục tiêu 3 của ghi chú. Mục 3 và 4 do điều phối viên chốt: "Định nghĩa rủi ro kỳ vọng, rủi ro thực nghiệm, tối thiểu hóa rủi ro thực nghiệm; tính chính xác rủi ro của bộ phân loại ngưỡng." và "Chứng minh hội tụ đều, cận rủi ro dư của nghiệm gần đúng cho lớp hữu hạn." (trang tổng quan không dùng chữ ERM). Dòng vượt 20 âm tiết mới: L12-2-02 dòng (G1) 25 (tên tiếng Anh đầy đủ của i.i.d., K6), L12-4-02 dòng định nghĩa 23 ("Với $\mathcal H$ chọn trước (G3)", K3), L12-7-04 dòng cuối 21 ("$h_S=g$", K10). Công thức L12-3-09 giữ hai dòng: một dòng cuộn 14 px ở 390 px (đo bằng Playwright).

## Phụ lục: bản đồ mạch của ghi chú

Nội dung cũ của `storyboard.md` (bản đồ mạch của ghi chú), giữ nguyên văn:

# Mạch khái niệm Bài 12

Ghi chú có4mạch, không có trang chiếu.

| Mạch | Nhu cầu→trực quan→ví dụ | Hình thức và chứng minh | Ứng dụng/giới hạn và bài tập |
|---|---|---|---|
|12.1|Dự đoán đầu ra thực từx; nhiễu quanhmean;3cặp(0,1),(1,2),(2,2)|Hợp lý có điều kiện→NLLGaussian→squaredloss; phương trìnhchuẩn vàfullrank|Thay mô hình nhiễu đổi mất mát;SSE0+varianceunknown không cóMLE; củng cố/E12.1|
|12.2|Nhãn0/1; đầu vào ảnh hưởngprobability;2điểm±1|Hợp lýBernoulli→BCE, sigmoid;separability nofiniteMLE|Confidence khác decisionthreshold; giảmtrainCE không chứng minh giảmtestrisk; củng cố/E12.2|
|12.3|Nhiều nghiệmkhớp4mẫu nhưng dự đoánkhác|Populationrisk vs empiricalrisk,ERM;R(ht)=abs(t)/2,zeroERM(-.2,.3]|Hìnhthreshold-risks.svg; cố địnhh khác hchọn bằng dữliệu; củng cố/E12.3|
|12.4|Chọnh trênmẫu cần kiểmsoát nhiều ứngviên; classcomplexity|PAC,finiteH Hoeffding+union,2epsilon+eta;shattering vàVC1D1/2|Hìnhvc-one-dimensional.svg, cùnginput1D nhưng lớp khác; boundchỉ cho loss có điều kiện; approximation+estimation+optimization; củng cố/E12.4|

Mở bài nhắc Mệnh đề11.3: tối ưu likelihood xác định mục tiêu tính được. Hồi quy/logistic mở rộng sang tham số có điều kiện. Ví dụthreshold dẫn đến nhu cầu hội tụ đều;VC1D mô tả độ linh hoạt của lớp thay vì số chiều dữ liệu. Kết nối tối ưu các bài03–06 với thống kê: giảm sai số tối ưu thực nghiệm chỉ xử lý một thành phần. Bài13 trong kế hoạch tiếp tục sang quyết định có hậu quả dài hạn.

Hai tình huống ứng dụng cuối nội dung cần giải trọnvẹn; một tình huống có giả thiết bị vi phạm. Bốn dạng homework: suy diễn,tính toán,kết nốiAI,phảnbiện; ba mức nhận biết/tính-toán-chứng-minh/vận-dụng. Hình tự tạo và nội dung tiếng Việt; mọi ví dụ/tình huống nhắc dữ kiện tại chỗ.
