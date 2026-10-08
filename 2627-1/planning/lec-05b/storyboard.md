# Storyboard Bài 05b — Hội tụ của hạ gradient và hạ gradient ngẫu nhiên

Bản đầu ngày 2026-10-07; bản sửa cùng ngày theo cổng kiểm định storyboard (SB01–SB15) và tái kiểm (SB16–SB29); bản sửa ngày 2026-10-08 theo năm vai rà soát (R01–R54) và tái kiểm (R55–R72). Deck dự kiến có **51 trang, 7 phần ngoài** (A5, B7, C9, D7, E12, F7, G4). [Dàn bài](outline.md) chứa công thức, dữ kiện, đáp án, nguồn và quy ước nhãn; [nhật ký](review-log.md) ghi quyết định và trạng thái kiểm định. Deck HTML đã triển khai đủ 51 trang (xem review-log, mục kiểm định trình duyệt).

Quy ước thuật ngữ: chuẩn đầu ra bài học (LLO), chuẩn đầu ra học phần (CLO), phương pháp hạ gradient (GD), phương pháp hạ gradient ngẫu nhiên (SGD), điều kiện Polyak–Łojasiewicz (PL), khái niệm cốt lõi (KN). Ký hiệu, giả thiết H0–H7, bổ đề BĐ1–BĐ6, định lý T1–T9 và kỹ thuật KT1–KT16 theo outline. Mã trang, KN, KT, KH, J, MT chỉ dùng trong tài liệu lập kế hoạch.

**Thời lượng.** Bài bổ trợ không có buổi riêng trong đề cương DOCX, nên không gán thời lượng cho bài, phần, cụm hay trang. Các cột "thời lượng" mà AGENTS.md yêu cầu ghi "không gán (không có buổi trong đề cương)".

## Vấn đề trung tâm và các kết nối lớn

Với $x_{k+1}=x_k-\eta_kg_k$, cần xác định kèm chứng minh dãy hội tụ theo nghĩa nào, nhanh đến đâu, dưới giả thiết nào và với bước nào. Luận đề: mọi chứng minh hội tụ trong bài dùng một khuôn: lập bất đẳng thức giữa $x_k$ và $x_{k+1}$, nối các bất đẳng thức đó qua mọi bước, rồi chọn $\eta_k$. Giả thiết quyết định bất đẳng thức đó và cách nối. (Tên gọi "khuôn một bước" và "bất đẳng thức một bước" nêu trước trong ghi chú A02; C02 đặt tên hai cách nối tổng lồng và co; giải đệ quy xuất hiện ở chứng minh SGD cho hàm lồi mạnh.) A đặt thước đo; B xây công cụ chuyển giữa các thước đo; C, D, E, F áp khuôn cho bốn tập giả thiết; G tổng hợp và kiểm luận đề.

| Phần | Nhận từ trước | Chức năng riêng | Đầu ra được phần sau dùng |
|---|---|---|---|
| A — Các dạng hội tụ của một dãy lặp | Định lý $O(1/k)$ và tuyến tính của Bài 04; dao động SGD của Bài 05 | Đặt tên bốn dạng, ba tốc độ; chốt ký hiệu và H0–H4 | Định nghĩa dạng và tốc độ chưa có mũi tên suy ra |
| B — Bất đẳng thức cầu nối giữa các dạng hội tụ | Định nghĩa A; lồi bậc nhất (Bài 01); $L$, $\mu$ (Bài 04) | Xây BĐ1–BĐ4 và bản đồ ba dạng tất định | Công cụ cho mọi chứng minh C–F |
| C — Hội tụ của hạ gradient | BĐ1–BĐ4; VD-C | Chứng minh T1, T2; lập hai mẫu khuôn; đối chiếu cận | Khuôn tổng lồng và co; giới hạn "cần $L$" |
| D — Dưới gradient và trung bình lặp | Khuôn C, BĐ4; giới hạn "cần $L$" | Bỏ trơn; T3; lặp tốt nhất, trung bình lặp, Jensen; chọn bước | Dòng chứng minh tổng lồng có trọng số; giới hạn "cần toàn bộ dữ liệu" |
| E — Hạ gradient ngẫu nhiên cho hàm lồi và lồi mạnh | T3; gradient nhóm và lịch bước của Bài 05 | $\mathcal F_k$, tháp; T4, T5, T5-pha, T6; sàn nhiễu; Markov | KT12, KT13; giới hạn "cần lồi và $x^*$" |
| F — Mục tiêu không lồi và chuẩn gradient | KT12, KT13, BĐ1–BĐ3 | Hàm thế; T7, T8; PL và T9 | Bảo đảm điểm dừng; điều kiện khôi phục tuyến tính |
| G — Bảng tra và giới hạn | T1–T9 | Bảng tra theo mục tiêu; kiểm luận đề; giới hạn; câu hỏi tự kiểm | Bảng tra cho Bài 06 và Buổi 15 |

## Khung lý thuyết chung

Khung đầy đủ ở outline, mục "Khung lý thuyết chung" và "Sợi chỉ chứng minh" (sáu bậc). Vị trí của từng trang trong khung được ghi ở cột "Vị trí trong khung" của bảng theo trang, dùng năm nhãn:

- **VĐ**: vấn đề trung tâm, thước đo, ký hiệu, giả thiết;
- **CC**: công cụ cầu nối (BĐ1–BĐ6, kỳ vọng có điều kiện);
- **KH**: một bậc của sợi chỉ chứng minh (bất đẳng thức một bước, cách giải, kết quả);
- **ĐC**: đối chiếu cận với giá trị thật hoặc chọn bước;
- **GH**: giới hạn tạo nhu cầu cho bậc sau, hoặc tổng hợp.

## Liên kết giữa các phần

| Ranh giới | Kết quả kế thừa | Giả thiết đổi | Giới hạn tạo nhu cầu | Câu nối dự kiến (ghi chú diễn giả trang đầu phần sau) |
|---|---|---|---|---|
| A → B | Bốn dạng hội tụ, ký hiệu, H0–H4 | Chưa đổi; B bắt đầu dùng H1–H3 riêng lẻ | Định nghĩa chưa nói dạng nào suy ra dạng nào; logistic cho $e_k\to0$ với $x_k\to\infty$ | "Định nghĩa ở A tách bốn đại lượng; với $\phi(s)=\log(1+e^{-s})$ hai trong số đó tách rời nhau." |
| B → C | BĐ1–BĐ4, bản đồ mũi tên | Cố định $g_k=\nabla f(x_k)$, bước $1/L$; dùng H1, H2, H4 rồi thêm H3 | Bất đẳng thức B đúng tại một điểm, chưa cho cả dãy | "BĐ3 và BĐ4 đúng tại một điểm; ghép chúng dọc dãy lặp cần một khuôn cộng hoặc nhân." |
| C → D | Khuôn một bước, BĐ4, hệ quả của H1 | Bỏ H2, H3; thêm H5; bước biến $\eta_k$ | T1, T2, T2' cần $L$ hữu hạn; trị tuyệt đối, hinge không có | "Hằng số $L$ vào chứng minh định lý $O(1/k)$ qua bổ đề giảm; hàm trị tuyệt đối không có hằng số này." |
| D → E | T3, BĐ5, dòng chứng minh tổng lồng có trọng số | H5 → H6 + H6a; $g_k$ ngẫu nhiên | T3 cần một dưới gradient của toàn bộ $f$, tức $N$ phép tính mỗi bước | "Chứng minh của T3 chỉ dùng $g_k$ qua hai đại lượng $g_k^T(x_k-x^*)$ và $\lVert g_k\rVert^2$; kỳ vọng của hai đại lượng này là đủ." |
| E → F | Tính chất tháp, bổ đề tách phương sai, BĐ1 với $\eta\le1/L$ | Bỏ H1, H3 | T4–T6 cần lồi và $x^*$; mục tiêu mạng sâu không lồi | "Các bất đẳng thức cho SGD lồi dùng $x^*$ qua hệ quả của H1; khi $f$ không lồi hệ quả này sai, chỉ còn bổ đề giảm." |
| F → G | T7–T9 cùng T1–T6 | Không đổi; tổng hợp | Bảo đảm không lồi chỉ về điểm dừng; PL hiếm khi kiểm được | "Mười hai phát biểu khác nhau ở giả thiết và đại lượng được chặn; bảng tra xếp chúng theo hai trục này." |

## Bản đồ hành trình khái niệm

Thứ tự trong mỗi dòng là thứ tự xuất hiện. Khi ví dụ dẫn nhập đứng cùng nhu cầu (trước trực quan), cột "Ví dụ" ghi "dẫn nhập" và nêu nhu cầu được làm cụ thể. Không bước nào bị bỏ hoặc đảo.

| KN | Nhu cầu | Trực quan | Ví dụ | Hình thức | Ứng dụng | Bài tập |
|---|---|---|---|---|---|---|
| KN1 — Dạng và tốc độ hội tụ | A03 | A04 (hình ba tốc độ trên thang log) | A03, dẫn nhập: VD-C và VD-A làm cụ thể nhu cầu "phải nói đại lượng nào" | A04 (định nghĩa dạng, tốc độ), A05 (ký hiệu, H0–H4) | B06 (bản đồ dạng), C07 (số bước đạt $\varepsilon$) | B07 câu (3) |
| KN2 — Bất đẳng thức cầu nối | B01 | B02 (parabol kẹp) | B01, dẫn nhập: logistic và $x_1^2$ làm cụ thể nhu cầu "hội tụ giá trị không kéo theo hội tụ dãy lặp"; kiểm số VD-C ở B03–B05 sau mỗi phát biểu | B02–B05 (BĐ1–BĐ4, bổ đề giảm, hệ quả của H1) | B06 (bản đồ có mũi tên, phản ví dụ $x^4$) | B07 câu (1), (2) |
| KN3 — Khuôn một bước → tổng lồng / co | C01 | C02 (tổng lồng xếp chồng) | C01, dẫn nhập: bảng VD-C của A03 với ba khoảng trống chứng minh | C03–C04 (T1, T1'), C05–C06 (T2a, T2b) | C07 (đối chiếu ba cận trên VD-C), C08 (T2') | C09 |
| KN4 — Dưới gradient, lặp tốt nhất, trung bình lặp | D01 | D02 (chùm đường tựa); D03 (hình trung bình lặp nằm gần nghiệm hơn mọi điểm lặp, trực quan cho Jensen) | D01, dẫn nhập: VD-B làm cụ thể nhu cầu "không có gradient, không có $L$"; D02 ($\partial f(1)$), D03 (lượt bước $4{,}5$ của VD-B) | D02 (định nghĩa, H1 dạng dưới gradient, sau hình và ví dụ), D04 (T3, H5), D05 (BĐ5, chứng minh) | D06 (chọn bước, kiểm cận bằng lượt bước $\frac12$ của VD-B) | D07 |
| KN5 — Gradient ngẫu nhiên và kỳ vọng có điều kiện | E01 | E02 (cây lịch sử) | E01, dẫn nhập: ba giá trị của $\theta_1$ ở VD-A làm cụ thể nhu cầu "điểm lặp là ngẫu nhiên"; E02 (tính $\mathbb E[g_1\mid\mathcal F_1]$ và $\mathbb E(\theta_1-1)^2$ trên cây) | E02 ($\mathcal F_k$, tháp, sau cây), E03 (H6, H6a, H6b, bổ đề tách phương sai), E04–E07 (T4, T5) | E08 (đối chiếu VD-A), E09 (lịch theo pha), E10 (T6), E11 (Markov, xác suất) | E12 |
| KN6 — Chuẩn gradient và PL cho mục tiêu không lồi | F01 | F02 (mặt bậc bốn hai đáy, hàm thế); F06 (gradient chỉ nhỏ khi giá trị gần tối ưu, sai tại $\theta=0$ của VD-D) | F01, dẫn nhập: VD-D làm cụ thể nhu cầu "$d_k$, $e_k$ mất nghĩa"; F02 (một bước GD trên VD-D); F06 (phép tính $\lVert\nabla f\rVert^2\ge6e$ trên VD-C; VD-A trong ghi chú) | F03 (T7), F04–F05 (T8), F06 (H7, T9) | F03 cuối trang (cận $49{,}5/K$), F04 (hệ quả chọn bước), F06 (T9) | F07 |

Trong KN6, tiểu khái niệm PL đi đủ sáu bước trên F06 theo thứ tự nhu cầu (giới hạn dưới tuyến tính của T7, T8) → trực quan (điểm dừng $\theta=0$ của VD-D) → ví dụ dương (phép tính trên VD-C, đặt trước H7 và không gọi tên PL; VD-A trong ghi chú) → H7 → ứng dụng (T9) → bài tập F07 câu (2) (PL trên tập $\{\lvert\theta\rvert\ge c\}$ của VD-D, không đúng toàn cục).

| KN | Đầu vào bắt buộc | Ký hiệu, dữ kiện truyền từ ví dụ sang hình thức | Sản phẩm học tập; LLO/CLO | Bước gộp và lý do | Câu nối giữa các bước | Thời lượng |
|---|---|---|---|---|---|---|
| KN1 | Định lý $O(1/k)$, tuyến tính (Bài 04); dao động SGD (Bài 05) | $e_k=6(16/49)^k$, $d_k^2$ của VD-C; $\mathbb E(\theta_k-1)^2$ của VD-A → $u_k\le Cq^k$, $C/k$ | Phân loại một khẳng định hội tụ theo đại lượng và tốc độ; LLO6/CLO1 | A04 gộp trực quan và định nghĩa: hình chỉ có ba đường, định nghĩa đọc trực tiếp từ hình | A03 → A04: "ở Ví dụ C, $e_k$ và $d_k^2$ cùng giảm theo tỉ số $\tfrac{16}{49}$, cận chỉ như $1/k$; ở Ví dụ A kỳ vọng dừng ở mức dương"; A04 → A05: "cận cần hằng số, hằng số cần giả thiết" | Không gán |
| KN2 | Lồi bậc nhất (Bài 01); H2, H3 (Bài 04) | Logistic $L=\frac14$; VD-C $L=7$, $\mu=3$, $\nabla f(x_0)=(6,28)$ dùng xuyên B03–B05 | Chứng minh và áp BĐ1–BĐ4; LLO6/CLO1 | B02 gộp trực quan và BĐ1 vì parabol kẹp chính là phát biểu; mỗi trang B03–B05 gộp hình thức với kiểm số | B01 → B02: "Cận trên bậc hai và bổ đề giảm chặn từ trên; lồi mạnh cho chiều ngược lại"; B05 → B06: "BĐ1–BĐ3 là các mũi tên của bản đồ; BĐ4 so sánh hai điểm lặp nên là đầu vào của bất đẳng thức một bước" (R16, R63) | Không gán |
| KN3 | BĐ1–BĐ4; GD Bài 04 | VD-C: $L=7$, $D^2=20$, $e_0=62$ → $70/k$, $62(4/7)^k$, $20(4/7)^k$ (chỉ so ở C07) | Tái tạo chứng minh T1, T2; tính số bước; LLO6/CLO1, LLO8/CLO2 | C02 chỉ trực quan và nhận xét; C03/C04 và C05/C06 tách phát biểu và chứng minh; C07 gộp đối chiếu T1 với so ba cận | C02 → C03: "mẫu 1 với $u_k=\frac L2d_k^2$"; đầu C05, sau chứng minh C04: "cận của T1 phải đúng cho $x_1^2$ nên không chứa $\mu$"; C07 → C08: "T1 và T2 dùng bước $1/L$, tức phải biết $L$" | Không gán |
| KN4 | Hệ quả của H1, BĐ4; giới hạn C08 | VD-B: bước $4{,}5$ (D03) → $\bar x_4=0{,}75$, sai số $\frac1{12}$; $D=G=1$, bước $\frac12$ (D06) → $x_k=0,\frac16,\frac13,\frac12$, cận $0{,}5$, $\frac16$, $\frac14$ | Chạy phương pháp dưới gradient, chọn bước, giải thích vai trò trung bình lặp; LLO6/CLO1, LLO8/CLO2 | D02 gộp trực quan, ví dụ, định nghĩa (thứ tự hình → số → định nghĩa); D03 gộp ví dụ thuật toán với nhu cầu của hai đầu ra và trực quan cho Jensen; D05 gộp BĐ5 với chứng minh dùng nó, phép kiểm Jensen trong ghi chú | D03 → D04: "giá trị không đơn điệu nên cận đặt cho lặp tốt nhất và trung bình lặp" | Không gán |
| KN5 | T3; gradient nhóm, lịch bước (Bài 05); kỳ vọng rời rạc (Bài 00) | VD-A: $\eta=0{,}1$, $\sigma^2=\frac83$, $\theta_0=0$ → $\mathbb E(\theta_1-1)^2=0{,}837$ trên cây → đệ quy $a_{k+1}=0{,}81a_k+\frac8{300}$ ở E08 | Tính kỳ vọng có điều kiện; phát biểu, áp dụng T4, T5; giải thích sàn nhiễu, lịch bước; LLO12/CLO2 | E02 gộp trực quan, ví dụ, định nghĩa $\mathcal F_k$ vì cây là định nghĩa cụ thể; E04/E05, E06/E07 tách phát biểu và chứng minh; E11 gộp BĐ6 với ứng dụng | E02 → E03: "giả thiết về $g_k$ phát biểu bằng kỳ vọng tại nút"; E05 → E06: "T4 chỉ chặn trung bình lặp với tốc độ $1/\sqrt K$"; E08 → E09: "sàn nhiễu tỉ lệ $\eta$" | Không gán |
| KN6 | BĐ1–BĐ3, tháp, bổ đề tách phương sai; điểm dừng không lồi (Bài 05) | VD-D: $L=11$ trên $[-2,2]$, $\Delta_0=\frac94$ → $49{,}5/K$; bước $1/11$ cho $\theta_1=\frac{16}{11}$; VD-C (phép tính trên trang) và VD-A (ghi chú) cho ví dụ dương của PL; $\frac12F'^2=2\theta^2F$ cho bài tập PL | Chứng minh T7, áp T8, kiểm PL trên một tập con; LLO12/CLO2, LLO11/CLO1 | F03 gộp phát biểu, chứng minh ba dòng và ứng dụng VD-D; F04 gộp T8 với hệ quả chọn bước; F06 gộp năm bước đầu của tiểu khái niệm PL, bài tập ở F07 | F02 → F03: "cộng các mức giảm"; F05 → F06: "khi nào lấy lại tốc độ tuyến tính" | Không gán |

**Khái niệm phụ dùng chu trình rút gọn** (nhu cầu → hình thức → kiểm tra):

- Quay lui và T2' (C07 → C08 → C09 câu (1)); lịch theo pha và T6 (E08 → E09/E10 → E12 câu (2)); điều kiện Robbins–Monro (D06 → D06 → D07 câu (2b)). Lý do: đây là biến thể của một định lý đã đi đủ sáu bước (T2, T3, T5), hoặc chỉ phát biểu theo quyết định người dùng số 3; chu trình đầy đủ sẽ lặp lại hành trình KN3, KN4 hoặc KN5.
- Bất đẳng thức Markov (E10 → E11 → G04 câu hỏi (3)). Lý do riêng: đây là công cụ xác suất tiên quyết (Bài 00), chứng minh một dòng và chỉ dùng ở E11; không có ví dụ hay trực quan nào làm rõ thêm phép chứng minh đó.
- Bất đẳng thức Jensen (BĐ5) không dùng chu trình rút gọn mà nằm trong hành trình KN4: nhu cầu ở D03 (trung bình lặp tốt hơn mọi điểm lặp), trực quan là hình của D03, phát biểu và dùng ở D05, kiểm số trong ghi chú D05, bài tập D07 câu (3).

**Phần G** dùng chu trình rút gọn: không có khái niệm mới; G01–G03 tổng hợp, G04 gồm câu hỏi tự kiểm và bài tập chuyển giao.

## Bảng theo từng trang

Mọi trang mang quyết định **thêm** vì đây là bài mới. Cột cuối ghi thêm quyết định của bản sửa theo cổng storyboard (`giữ`, `sửa`, `gộp`, `tách`, `bỏ`) và mã phát hiện. Không có trang chiếu mẫu do người dùng cung cấp cho bài này.

| Trang và tiêu đề | Lý do tồn tại; nhu cầu hoặc khoảng trống được lấp | Đầu vào → đầu ra | Vị trí trong khung | LLO/CLO | Quyết định và lý do |
|---|---|---|---|---|---|
| A01 — Hội tụ của hạ gradient và hạ gradient ngẫu nhiên | Định vị bài 05b trong học phần | Bài 04, Bài 05 → chủ đề | VĐ | LLO6, LLO8, LLO12 | Thêm; trang tiêu đề bắt buộc. Giữ ở bản sửa. Rà từng trang 2026-10-08: giữ mặt trang; sửa ghi chú (nêu tên hai định lý của Bài 04, khoảng trống của Bài 05, liên kết Bài 06 cụ thể) |
| A02 — Vấn đề trung tâm và nội dung bài | Người học cần biết câu hỏi trung tâm, luận đề và vai trò bảy phần trước khi vào chi tiết | Chủ đề → vấn đề trung tâm, luận đề, bản đồ bảy phần, mục tiêu | VĐ | LLO6, LLO8, LLO11, LLO12 | Thêm. Sửa: luận đề nói "mọi bảo đảm được chứng minh trong bài" (SB15). Sửa (R56, R72): luận đề hai vế mới; R74: chuỗi bước ghi "tổng lồng, co hoặc giải đệ quy". Rà từng trang 2026-10-08: sửa — luận đề bằng lời thường (thuật ngữ để C02), vấn đề trung tâm trước lộ trình, "gradient trên một nhóm mẫu (Bài 05)"; ghi chú nêu trước tên gọi |
| A03 — Thước đo tiến triển của dãy lặp | Bài 04 chỉ đo $e_k$, Bài 05 chỉ mô tả dao động; chưa có lý do để phân biệt thước đo | Hai dãy số VD-C, VD-A → nhu cầu đặt tên thước đo; bảng được C01 dẫn lại | VĐ | LLO6/CLO1 | Thêm; nhu cầu và ví dụ dẫn nhập KN1. Sửa: bỏ mã trang khỏi ý chính (SB09). Rà từng trang 2026-10-08: sửa — định nghĩa $e_k$, $d_k$ lên đầu trang; hai bảng số thay bằng hai hình (`vdc-measures.svg`, `vda-sgd-path.svg`); dữ kiện ví dụ tự chứa; số cụ thể và quy tắc tên Ví dụ A–D vào ghi chú |
| A04 — Dạng hội tụ và tốc độ hội tụ | J4, J6: Bài 04 dùng "tuyến tính", "$O(1/k)$" chưa định nghĩa | Số A03 → định nghĩa bốn dạng, ba tốc độ | VĐ | LLO6/CLO1 | Thêm; gộp trực quan và định nghĩa. Sửa: công thức số bước chuyển vào ghi chú (SB11). Rà từng trang 2026-10-08: sửa — chú thích trực quan dưới hình, định nghĩa đủ hằng số ($C>0$, $p>0$), bullet kỳ vọng chính xác hơn; ghi chú áp dụng định nghĩa cho Ví dụ A, C |
| A05 — Ký hiệu và giả thiết | Ba bài trước dùng ba bộ ký hiệu; Bài 05 dùng $D$ cho tập dữ liệu | Ký hiệu Bài 04/05 → bộ ký hiệu cho A–C, H0–H4 | VĐ | LLO6/CLO1 | Thêm. Sửa: H1 dạng khả vi, bỏ H5–H7 và các ký hiệu của D–F, thêm chú thích $D$, cặp $K$/$T$ (SB01, SB02, SB04, SB10). Tách thành hai trang chỉ khi vẫn tràn. Rà từng trang 2026-10-08: sửa — bảng sáu dòng hai cột, cách viết ở bài trước vào ghi chú, H3 khối hiển thị hai dòng, H4 "giá trị nhỏ nhất", câu nối nêu H5–H7 ở D, E, F; ghi chú đối chiếu Boyd–Vandenberghe §9.1 |
| B01 — Hội tụ giá trị và hội tụ dãy lặp | J4: "$\inf$ không đạt" và nghiệm không duy nhất chưa được xét | Định nghĩa A04 → hai phản ví dụ; $f_{\inf}$; nhu cầu giả thiết nối | GH | LLO6/CLO1 | Thêm; nhu cầu và ví dụ dẫn nhập KN2. Sửa: tiêu đề bao cả hai phản ví dụ; đặt $f_{\inf}$; câu nối sang B02 (SB04, SB15). Rà từng trang 2026-10-08: sửa — hình thêm $s_{10},s_{100},s_{1000}$; nhãn ví dụ; định nghĩa $f_{\inf}$ (infimum); khung nêu chiều của H2, H3, H4 |
| B02 — Cận trên bậc hai | J1: Bài 04 RG12 chỉ phát biểu | H2 → BĐ1 có chứng minh | CC | LLO6/CLO1 | Thêm. Giữ. Rà từng trang 2026-10-08: sửa — chú thích trực quan tự chứa, nhãn BĐ1 đủ giả thiết, chứng minh ba dòng với $u=y-x$, ghi chú bỏ tham chiếu trang |
| B03 — Bổ đề giảm và cận chuẩn gradient | J2, J7: bổ đề giảm mới có dạng $1/L$; ngưỡng $2/L$ chưa phát biểu chung | BĐ1 → bổ đề giảm, BĐ2 | CC | LLO6/CLO1 | Thêm. Giữ; tham chiếu bài tập ngưỡng đổi sang C09. Rà từng trang 2026-10-08: sửa — câu luận điểm chung, công thức hai dòng, Ví dụ C tự chứa, ghi chú nêu cách suy BV (9.14) |
| B04 — Cận của hàm lồi mạnh | J6, J8: các cận lồi mạnh chưa được đặt cạnh nhau | H3 → BĐ3 | CC | LLO6/CLO1 | Thêm. Giữ. Rà từng trang 2026-10-08: sửa — câu mở chiều ngược, tính duy nhất vào phát biểu, bước 3 một dòng, Ví dụ C tự chứa, bỏ câu "lồi chặt" |
| B05 — Đồng nhất thức một bước | J3: đồng nhất thức chưa tách thành bổ đề; mọi định lý C–E dùng nó | Khai triển chuẩn, H1 → BĐ4, hệ quả của H1 | CC | LLO6/CLO1 | Thêm. Giữ. Rà từng trang 2026-10-08: sửa — chú thích hình tự chứa, ngưỡng bước trong câu trực quan, ví dụ số vào chú thích và ghi chú |
| B06 — Bản đồ các dạng hội tụ | Bảng dạng hội tụ A04 chưa có mũi tên | BĐ1–BĐ3 → sơ đồ ba nút có mũi tên, phản ví dụ (BĐ4 so sánh hai điểm lặp nên là đầu vào của bất đẳng thức một bước, không là mũi tên; R16) | CC | LLO6/CLO1 | Thêm; ứng dụng KN1, KN2. Sửa: chỉ ba dạng tất định; hai nút trung bình lặp và xác suất thêm trong ghi chú D05, ghi chú E11 và dòng gom G01 (SB05, SB25). Rà từng trang 2026-10-08: sửa — nhãn bổ đề trên chuỗi và trong hình, phản ví dụ có công thức |
| B07 — Bất đẳng thức cầu nối trên hai ví dụ | Cần minh chứng đánh giá sau cụm B | Toàn bộ B → bài làm | CC | LLO6/CLO1 | Thêm; bài tập KN1, KN2. Sửa: câu (2) dùng điểm $(1,-1)$ (SB12); câu (c) dùng hằng $C$. Rà từng trang 2026-10-08: sửa — đề tự chứa, chuỗi $(\ast)$ và bốn phát biểu tách khỏi danh sách câu hỏi, đáp án (d) thêm chiều suy ra |
| C01 — Bảo đảm cho hạ gradient bước cố định | J4: định lý $O(1/k)$ của Bài 04 chưa có cận và tính không tăng của $d_k$, chưa có dạng bước $\eta\le1/L$, chưa chỉ ra bước dùng H4; trên trang Bài 04 chứng minh chỉ ở mức ý chính | Bảng A03 → ba khoảng trống chứng minh | KH | LLO6/CLO1 | Thêm. Sửa: bỏ bảng số và cận $62(4/7)^k$, dẫn lại A03 (SB03); viết lại ba khoảng trống cho khớp Bài 04 (SB16). Rà từng trang 2026-10-08: sửa — hình `vdc-measures.svg` thay tham chiếu bảng đầu bài, khung ba khoảng trống mỗi mục một dòng |
| C02 — Khuôn một bước: tổng lồng và co | Luận đề A02 cần một hình thức cụ thể trước định lý đầu tiên | Nhu cầu C01 → hai mẫu khuôn, nhận xét hàm thế | KH | LLO6/CLO1 | Thêm. Sửa: luận điểm bao cả hai mẫu (SB15). Rà từng trang 2026-10-08: sửa — tiêu đề bao hai mẫu, đặt tên "bất đẳng thức một bước" trên mặt trang, $V,P,N$ vào ghi chú, chú thích hình |
| C03 — Định lý hội tụ dưới tuyến tính của hạ gradient | J4: cần phát biểu đủ giả thiết, thêm $d_{k+1}\le d_k$ và T1' | Mẫu 1 → T1, T1' | KH | LLO6/CLO1 | Thêm. Giữ; số bước chuyển vào ghi chú. Rà từng trang 2026-10-08: sửa — phát biểu chính cho bước $0<\eta\le1/L$ (T1'), T1 là trường hợp riêng; câu dẫn nêu nội dung thêm so với Bài 04 |
| C04 — Chứng minh định lý dưới tuyến tính | J3, J4: chứng minh trên trang, đánh dấu bước dùng H4 | BĐ1, BĐ4, H1, H4 → chứng minh T1 | KH | LLO6/CLO1 | Thêm. Sửa: chỉ chứng minh; dòng nhu cầu với $x_1^2$ chuyển lên đầu C05 (SB21). Rà từng trang 2026-10-08: sửa — chứng minh cho bước $\eta$ tổng quát (T1'), đánh dấu H4, ghi chú kiểm hệ số |
| C05 — Định lý hội tụ tuyến tính của hạ gradient | J6: thiếu dạng dãy lặp T2a; cận của T1 không thể chứa $\mu$ | T1, ví dụ $x_1^2$, BĐ3 → nhu cầu dùng $\mu$, T2a, T2b | KH, GH | LLO6/CLO1 | Thêm. Sửa: mở bằng nhu cầu với $x_1^2$ trước phát biểu T2 (SB21); số bước vào ghi chú. Rà từng trang 2026-10-08: sửa — câu mở dùng T1', đầu vào nêu $D$, $e_0$, dòng hệ số $q$, ghi chú nguồn BV (9.18) |
| C06 — Chứng minh định lý tuyến tính | Chứng minh trên trang | BĐ2, BĐ3, BĐ4 → chứng minh T2a, T2b | KH | LLO6/CLO1 | Thêm. Sửa: T2b một dòng; nhận xét PL vào ghi chú (SB11). Rà từng trang 2026-10-08: sửa — đánh dấu chỗ dùng H3, H4, $\eta=1/L$, bước 4 viết rõ phép thế |
| C07 — Ba cận trên ví dụ bậc hai (Ví dụ C) | Rủi ro nhầm cận với hành vi thật; kế hoạch bắt buộc trang đối chiếu | T1, T2, VD-C → bảng ba cận, số bước $7000/16/6$ | ĐC | LLO8/CLO2 | Thêm. Gộp: đối chiếu T1 và so ba cận trên một trang; "7000 so với 6" và "16" chỉ nêu tại đây (SB03); câu nối sang C08 nêu giới hạn "phải biết $L$" (SB28). Rà từng trang 2026-10-08: sửa — dòng dữ kiện tự chứa, bảng số bước đạt $0{,}01$ thay bảng giá trị, câu kết nêu cận có thể bi quan |
| C08 — Hội tụ tuyến tính với bước quay lui | J5; giới hạn "cần $L$" là nhu cầu của D | T2 → T2' (phát biểu), giới hạn | GH | LLO8/CLO2 | Thêm. Sửa: bỏ ví dụ ngưỡng (chuyển sang C09 câu (3)); tiêu đề gọi tên T2' (SB07). Rà từng trang 2026-10-08: sửa — câu mở nêu nhu cầu, quy tắc Armijo bằng công thức, giới hạn có công thức mất mát bản lề |
| C09 — Quay lui, co và ngưỡng bước | Minh chứng đánh giá cụm C | C01–C08 → bài làm | KH, ĐC | LLO6/CLO1, LLO8/CLO2 | Thêm. Sửa: câu (1) áp T2' trên VD-C; câu (2) dùng $k=2,3$; tiêu đề phân biệt với C07 (SB07, SB12, SB15). Rà từng trang 2026-10-08: sửa — dòng dữ kiện tự chứa, định nghĩa $[x]_2$ trên trang, câu (3) dùng T1' |
| D01 — Mục tiêu không khả vi | Giới hạn C08; cần ví dụ không trơn có cùng dữ liệu VD-A | Giới hạn "cần $L$" → VD-B, nhu cầu thay gradient | GH | LLO6/CLO1 | Thêm. Giữ. Rà từng trang 2026-10-08: sửa — câu mở nêu nhu cầu, câu kết nêu công cụ còn dùng được, hình có nhãn điểm gãy |
| D02 — Dưới gradient | Chưa bài nào dạy dưới gradient | VD-B → định nghĩa $\partial f$, H1 dạng dưới gradient | CC | LLO6/CLO1 | Thêm. Sửa: mở rộng H1 cho $\partial f$ tại đây (SB01). Rà từng trang 2026-10-08: sửa — trực quan tự chứa trước định nghĩa, nhãn độ dốc trong hình, nhận xét điểm khả vi |
| D03 — Phương pháp dưới gradient | Thuật toán và lý do cần lặp tốt nhất, trung bình lặp | Định nghĩa D02 → thuật toán, lượt bước $4{,}5$ của VD-B, trực quan cho Jensen | KH | LLO8/CLO2 | Thêm. Sửa: lượt bước $4{,}5$ cắt qua điểm gãy, $f$ tăng, trung bình nhỏ hơn sai số của mọi điểm lặp (SB06, SB23); chỉ giữ lượt này, lượt bước $\frac12$ sang D06 (SB22). Rà từng trang 2026-10-08: sửa — hộp thuật toán ba dòng, Ví dụ B tự chứa, ghi chú bỏ "hai trang sau" |
| D04 — Định lý hội tụ của phương pháp dưới gradient | Phát biểu T3 đủ giả thiết | H1 dạng dưới gradient, H4, H5 → T3 | KH | LLO6/CLO1 | Thêm. Sửa: H5 được đặt tên trong phát biểu (SB01). Rà từng trang 2026-10-08: sửa — câu dẫn, mẫu Đầu vào–Bước–Kết luận, tên H5, Ví dụ B tự chứa, ghi chú bỏ "trang chọn bước" |
| D05 — Chứng minh định lý dưới gradient | Chứng minh trên trang; Jensen cần cho trung bình lặp | BĐ4, BĐ5, H1 → chứng minh T3 | KH, CC | LLO6/CLO1 | Thêm. Sửa: nhận BĐ5 (Jensen) từ B06 cũ (SB05); phép kiểm Jensen vào ghi chú (SB22). Rà từng trang 2026-10-08: sửa — dòng Ý tưởng, sáu bước một dòng, bỏ tham chiếu "So với chứng minh T1" |
| D06 — Chọn bước cho phương pháp dưới gradient | J14: Robbins–Monro chưa có; cần bước tối ưu | T3 → bước $D/(G\sqrt K)$, Robbins–Monro, kiểm cận bằng lượt bước $\frac12$ của VD-B | ĐC | LLO8/CLO2 | Thêm. Sửa: nhận lượt bước $\frac12$ từ D03 (SB22). Rà từng trang 2026-10-08: sửa — hai hệ quả có nhãn, Ví dụ B tự chứa, ghi chú đạo hàm |
| D07 — Phương pháp dưới gradient trên ví dụ trị tuyệt đối | Minh chứng đánh giá cụm D | D01–D06 → bài làm | KH, ĐC | LLO6/CLO1, LLO8/CLO2 | Thêm. Sửa: câu (2b) về Robbins–Monro (SB08). Phần D giữ 7 trang theo quyết định người dùng số 4. Rà từng trang 2026-10-08: sửa — dòng dữ kiện tự chứa, bốn câu một dòng (2(a), 2(b) tách), đáp án theo số bước chứng minh T3 |
| E01 — Gradient ngẫu nhiên trong bảo đảm hội tụ | J12, J13: Bài 05 cố ý không có định lý SGD; một bước có thể tăng $J$ | T3, ví dụ một bước của Bài 05 → nhu cầu phát biểu theo kỳ vọng | GH | LLO12/CLO2 | Thêm. Sửa: viết "tập dữ liệu" bằng chữ; ghi chú về $D$ (SB10). Rà từng trang 2026-10-08: sửa — định nghĩa $\ell_i$, $N$, $b$, $I_{k,r}$ trên trang, Ví dụ A tự chứa với số $0{,}5\to0{,}605$, ghi chú cầu nối không chệch |
| E02 — Lịch sử và kỳ vọng có điều kiện | J11: "độc lập với lịch sử" chưa hình thức | VD-A → $\mathcal F_k$, tháp | CC | LLO12/CLO2 | Thêm. Giữ. Rà từng trang 2026-10-08: sửa — chú thích cây tự chứa, bốn khối một ý, tính chất rút đại lượng đã biết lên mặt trang |
| E03 — Giả thiết về gradient ngẫu nhiên | J11: chưa có bổ đề tách phương sai, $\sigma^2$; H6a và H6b cần phân biệt | $\mathcal F_k$ → H6, H6a, H6b, bổ đề | VĐ, CC | LLO12/CLO2 | Thêm. Sửa: bỏ ví dụ VD-B ngẫu nhiên để không lộ đáp án E12 (SB11, SB12) |
| E04 — Định lý hội tụ của SGD cho hàm lồi | J13, J15: định lý SGD lồi chưa có; nguồn cục bộ thay EE364b | T3, H6a → T4 | KH | LLO12/CLO2 | Thêm. Sửa: Bài 06 chỉ là liên kết về sau (SB13); ghi "H1 (dạng dưới gradient)" (SB18) |
| E05 — Chứng minh định lý SGD lồi | Chứng minh trên trang; dòng D05 giữ nguyên dưới kỳ vọng | D05, tháp → chứng minh T4; đặt $a_k$ | KH, GH | LLO12/CLO2 | Thêm. Sửa: câu nối nêu ba giới hạn của T4 (SB15) |
| E06 — Định lý hội tụ của SGD cho hàm lồi mạnh | J14: sàn nhiễu của bước hằng chưa có | Giới hạn E05, H6b → T5 | KH | LLO12/CLO2 | Thêm. Giữ |
| E07 — Chứng minh định lý SGD lồi mạnh | Chứng minh trên trang | Bổ đề E03, BĐ2, BĐ3 → bất đẳng thức một bước của T5 | KH | LLO12/CLO2 | Thêm. Sửa: phần giải đệ quy vào ghi chú (SB11) |
| E08 — Đối chiếu cận lồi mạnh trên ví dụ ba quan sát | Rủi ro nhầm cận với hành vi thật; kế hoạch bắt buộc | T5, VD-A → $0{,}267$ so với $0{,}140$ | ĐC | LLO12/CLO2 | Thêm. Giữ |
| E09 — Lịch giảm bước theo pha | J14: lịch $0{,}1\to0{,}05$ của Bài 05 chưa có lý do | E08 → T5-pha (phát biểu) | ĐC | LLO12/CLO2 | Thêm; quyết định người dùng số 3. Giữ |
| E10 — Bước giảm dần cho hàm lồi mạnh | Hoàn tất bức tranh bước giảm; T6 cần nêu với điều kiện vùng | E09 → T6 (phát biểu), $\frac8{3k}$ | ĐC | LLO12/CLO2 | Thêm; quyết định người dùng số 3. Giữ |
| E11 — Bảo đảm theo xác suất | Kỳ vọng không phải một lần chạy; Markov cần nơi phát biểu và dùng | T4, T5 → BĐ6, cận xác suất | CC, ĐC | LLO12/CLO2 | Thêm. Sửa: nhận BĐ6 (Markov) từ B06 cũ (SB05) |
| E12 — Hạ gradient ngẫu nhiên trên hai ví dụ | Minh chứng đánh giá cụm E | E01–E11 → bài làm | KH, ĐC | LLO12/CLO2 | Thêm. Giữ; đề ghi rõ giá trị so sánh (kế hoạch [SỬA]) |
| F01 — Mục tiêu không lồi | Giới hạn E; điểm dừng không lồi của Bài 05 | VD-D → nhu cầu thước đo chuẩn gradient | GH | LLO12/CLO2, LLO11/CLO1 | Thêm. Sửa: nguồn VD-D là hàm $r$ của Bài 05; thêm LLO11 (SB13, SB15) |
| F02 — Hàm thế và điểm dừng | Cần trực quan trước T7 | Bổ đề giảm, VD-D → hàm thế, $\Delta_0$, một bước | CC | LLO12/CLO2 | Thêm. Sửa: đặt $\Delta_0$ tại đây (SB04) |
| F03 — Hội tụ tới điểm dừng của hạ gradient | Định lý không lồi tất định chưa có | F02 → T7, cận VD-D | KH | LLO6/CLO1, LLO12/CLO2 | Thêm. Giữ |
| F04 — Định lý SGD cho hàm không lồi | J13: bảo đảm SGD cho mục tiêu học sâu | T7, H6b → T8 và hệ quả chọn bước | KH, ĐC | LLO12/CLO2 | Thêm. Sửa: nhận hệ quả chọn bước (SB11) |
| F05 — Chứng minh định lý SGD không lồi | Chứng minh trên trang | Tháp, bổ đề tách phương sai → chứng minh T8 | KH | LLO12/CLO2 | Thêm. Sửa: chỉ còn chứng minh (SB11) |
| F06 — Điều kiện Polyak–Łojasiewicz | Cần nêu khi nào khôi phục tốc độ tuyến tính | Ghi chú C06, BĐ3 → H7, T9 (phát biểu) | KH, GH | LLO12/CLO2, LLO11/CLO1 | Thêm. Sửa: đổi tiêu đề; thêm trực quan và ví dụ dương; chuyển giới hạn "cực tiểu nào, điểm yên ngựa" sang G03; thêm LLO11 (SB02, SB15). Ví dụ dương viết thành phép tính trên VD-C trước H7, VD-A vào ghi chú (SB20); bỏ câu kết luận VD-D không thỏa PL (SB19) |
| F07 — Bảo đảm điểm dừng trên ví dụ bậc bốn | Minh chứng đánh giá cụm F | F01–F06 → bài làm | KH, ĐC | LLO12/CLO2 | Thêm. Sửa: câu (2) chứng minh $\frac12F'^2=2\theta^2F$, suy ra PL với $\mu=2c^2$ trên $\{\lvert\theta\rvert\ge c\}$, không đúng toàn cục (SB19) |
| G01 — Bảng tra các bảo đảm hội tụ | Mười hai phát biểu cần một bảng tra theo giả thiết | T1–T9, T1', T2' → bảng tra có cột mục tiêu | GH | LLO6, LLO8, LLO12 | Thêm. Sửa: liệt kê đủ T1', T2a, T2b, T2'; thêm cột mục tiêu; gom ký hiệu rải rác (SB04, SB14, SB15); ghi "H1 (dạng dưới gradient)" cho T3, T4 (SB18); thêm dòng tổng kết bốn mục tiêu (SB27). Triển khai: gộp thành sáu dòng, cột bước vào ghi chú, cột mục tiêu thay bằng dòng chú thích dưới bảng, để vừa khung 16:9. Bản sửa R19, R63, R71: mặt trang có dòng "Bước:" dưới bảng, ánh xạ mục tiêu trong ghi chú, T5 và T9 "tuyến tính tới sàn nhiễu" |
| G02 — Khuôn chứng minh chung | Luận đề A02 cần được kiểm trên các định lý đã chứng minh | Sợi chỉ chứng minh → bảng sáu bậc | GH | LLO6/CLO1 | Thêm. Sửa: "sáu bậc của sợi chỉ chứng minh", ghi định lý của từng bậc (SB15). Triển khai: bỏ cột số bậc, câu kết luận vào ghi chú. Bản sửa R56, R63, R72: tám dòng (T6, T9 dòng riêng), cột cách giải gồm tổng lồng, co, giải đệ quy, giải đệ quy (quy nạp); câu kết luận trên mặt trang nêu sáu bậc và dạng quyết định cách giải |
| G03 — Phạm vi áp dụng của các bảo đảm | J9, J16, J17, J19; giới hạn không lồi từ F06 | G01, F06 → giới hạn, công cụ ngoài phạm vi có tên | GH | LLO8/CLO2, LLO11/CLO1, LLO12/CLO2 | Thêm. Sửa: nhận giới hạn không lồi; nêu tên công cụ (SB02, SB15) |
| G04 — Câu hỏi tự kiểm, bài tập và tài liệu đọc | Kiểm việc chọn định lý; bài tập ba mức (nhận biết; tính toán hoặc chứng minh; vận dụng vào AI; M03); tài liệu | Toàn bài → câu hỏi, bài tập, tài liệu | GH | LLO6, LLO8, LLO11, LLO12. Câu hỏi (1) đo MT3 (LLO8/CLO2); câu (2), (3) đo MT4 (LLO12/CLO2, LLO11/CLO1) | Thêm. Sửa: thêm ba "Câu hỏi:" tự kiểm; đổi tiêu đề (SB14); đáp án câu (2) nêu điều kiện của T8 (SB26). Học liệu: 10 bài, nhận biết (Bài 1), tính toán hoặc chứng minh (Bài 2–7, 10), vận dụng vào AI (Bài 8–9), đồng bộ outline (M03) |

Số trang của deck là 51. Hai trang của bản đầu đã bỏ, ghi ở đây để truy nguyên (không phải trang của deck):

- B06 cũ "Bất đẳng thức Jensen và Markov": bỏ; Jensen chuyển về D05, Markov về E11, vì ở phần B chưa có nhu cầu trung bình lặp và chưa có kỳ vọng (SB05).
- C05 cũ "Đối chiếu cận dưới tuyến tính trên ví dụ bậc hai": gộp vào C07 mới, vì số VD-C lặp ở C01, C05, C08 cũ (SB03, phương án (a)).

## Hình cần vẽ (`img/lec-05b/`)

Mọi hình là SVG tự dựng từ công thức và số liệu của ví dụ, có `title`, `desc` và `alt`; không dùng màu làm kênh duy nhất; nhãn tiếng Việt. Không sao chép hình nguồn.

| Tệp | Trang | Mô tả | Alt dự kiến |
|---|---|---|---|
| `rates-log-error.svg` | A04 | Ba đường $q^k$, $C/k$, $C/\sqrt k$ trên trục tung log, trục hoành $k$ | "Ba đường sai số theo số bước trên thang log: tuyến tính là đường thẳng, $1/k$ và $1/\sqrt k$ cong và giảm chậm dần" |
| `vdc-measures.svg` | A03, C01 | Ví dụ C, GD bước $\frac17$: $e_k$ (tròn), $d_k^2$ (vuông) và cận $70/k$ trên trục tung log, $k=0,\dots,8$; khung 600×230 (thêm ở rà từng trang 2026-10-08) | "Thang logarit, k từ 0 đến 8: sai số giá trị e_k và bình phương khoảng cách d_k² giảm theo hai đường thẳng song song, từ 1,96 và 1,31 tại k = 1; cận 70/k ở phía trên giảm chậm." |
| `vda-sgd-path.svg` | A03 | Ví dụ A, SGD bước $0{,}1$: $(\theta_k-1)^2$ của một lần chạy (mảnh, xám, hạt giống 1) và $\mathbb E(\theta_k-1)^2$ (đậm), đường ngang $0{,}140$; khung 600×230 (thêm ở rà từng trang 2026-10-08) | "k từ 0 đến 40: bình phương sai lệch của một lần chạy dao động không về 0; kỳ vọng giảm từ 1 về giá trị giới hạn 0,140." |
| `logistic-no-minimizer.svg` | B01 | Đồ thị $\log(1+e^{-s})$, tiệm cận 0, các điểm $s_0,s_1,s_{10},s_{100},s_{1000}$ của GD, nhãn $s_k\approx\ln(4k)\to\infty$ (vẽ lại ở rà từng trang 2026-10-08) | "Đồ thị hàm logistic giảm dần về 0 không đạt giá trị nhỏ nhất; các điểm lặp dịch dần sang phải" |
| `quadratic-sandwich.svg` | B02 | Lát cắt VD-C theo hướng $(1,1)/\sqrt2$, $h(t)=2{,}5t^2$; parabol độ cong $L=7$ phía trên, $\mu=3$ phía dưới, tiếp xúc tại $t=1$ (đổi khi triển khai: theo trục $x_2$ đồ thị trùng parabol trên) | "Đồ thị một hàm lồi mạnh nằm giữa hai parabol tiếp xúc tại cùng một điểm, parabol trên ứng với L và parabol dưới ứng với mu" |
| `one-step-geometry.svg` | B05 | Ba vectơ $x-x^*$, $\eta g$, $x-\eta g-x^*$ và góc giữa $g$ và $x-x^*$ | "Sơ đồ một bước cập nhật: vectơ từ nghiệm tới điểm hiện tại, bước theo g và vectơ từ nghiệm tới điểm mới" |
| `convergence-map.svg` | B06 | Ba nút $d$, $e$, $\lVert\nabla f\rVert$; mũi tên ghi bất đẳng thức, bổ đề và giả thiết (thêm tên bổ đề ở rà từng trang 2026-10-08); khung 820×460, nhãn nội dung cỡ ≥ 29 có viền trắng (R05, N14) | "Bản đồ ba dạng hội tụ: mũi tên giữa khoảng cách, sai số giá trị và chuẩn gradient, mỗi mũi tên ghi giả thiết cần dùng" |
| `telescoping-stack.svg` | C02 | Các đoạn $u_0-u_1,u_1-u_2,\dots$ xếp chồng trong một cột cao $u_0$ | "Các hiệu liên tiếp của một dãy không âm xếp chồng lên nhau và không vượt quá giá trị ban đầu" |
| `vdc-three-bounds.svg` | C07 | Trục log: ba đường cận $70/k$, $62(4/7)^k$, $20(4/7)^k$, hai dãy thật $e_k$, $d_k^2$, đường ngang $0{,}01$ | "Ba cận của hạ gradient trên ví dụ bậc hai so với sai số giá trị và bình phương khoảng cách thật; giá trị thật xuống dưới 0,01 sau 6 bước" |
| `vdb-objective.svg` | D01 | Đồ thị $f$ của VD-B (gãy tại $-1,1,3$) và $J$ của VD-A, cùng cực tiểu tại 1 | "Hàm trị tuyệt đối trung bình gãy khúc tại ba quan sát và hàm bình phương trung bình trơn, cả hai đạt cực tiểu tại 1" |
| `subgradient-supporting-lines.svg` | D02 | Đồ thị VD-B gần $x=1$; ba đường tựa độ dốc $-\frac13,0,\frac13$ | "Tại điểm gãy x bằng 1 có một chùm đường thẳng nằm dưới đồ thị với độ dốc từ âm một phần ba đến một phần ba" |
| `vdb-subgradient-iterates.svg` | D03 | Đồ thị VD-B; lượt bước $4{,}5$ dao động giữa $0$ và $1{,}5$; trung bình lặp $0{,}75$ | "Phương pháp dưới gradient với bước lớn dao động giữa 0 và 1,5 qua điểm gãy, trong khi trung bình lặp 0,75 nằm gần nghiệm 1 hơn mọi điểm lặp" |
| `history-tree.svg` | E02 | Cây hai bước của VD-A, ba nhánh mỗi nút, giá trị $\theta_1$, $\theta_2$ ở các nút; khung 720×440, nhãn nội dung cỡ ≥ 25 (R05, N14) | "Cây lịch sử hai bước của hạ gradient ngẫu nhiên: mỗi nút tách ba nhánh theo quan sát được chọn" |
| `vda-sgd-bound-vs-exact.svg` | E08 | $a_k$ chính xác và cận T5 theo $k$, trục tung tới $1{,}4$ để chứa cận $1{,}267$ tại $k=0$ (R26); hai đường ngang $0{,}140$, $0{,}267$ | "Kỳ vọng bình phương sai lệch chính xác giảm về 0,140 trong khi cận của định lý giảm về 0,267" |
| `step-halving-schedule.svg` | E09 | Bậc thang $\eta$ (chia đôi theo pha) và cận $a_k$ tương ứng | "Lịch bước chia đôi theo pha và cận sai số giảm theo từng pha" |
| `quartic-two-wells.svg` | F01, F02 | $F(\theta)=\frac14(\theta^2-1)^2$ trên $[-2,2]$, điểm dừng $0,\pm1$, hai bước đầu từ $\theta_0=2$ | "Hàm bậc bốn hai đáy với hai cực tiểu tại âm một và một, cực đại địa phương tại 0, và hai bước hạ gradient từ 2" |

Tổng 16 hình (bỏ `vdc-sublinear-bound.svg` khi gộp C05 cũ vào C07; thêm `vdc-measures.svg`, `vda-sgd-path.svg` cho A03 ở rà từng trang 2026-10-08). Phản ví dụ $x^4$ (B06) và các bảng số không cần hình riêng.

## Sai khác có chủ ý so với kế hoạch

- Bài tập "VD-D không PL" chuyển từ phần B sang F07, vì VD-D chỉ được giới thiệu ở F01.
- Nhãn bổ đề B1–B6 đổi thành BĐ1–BĐ6, khuôn D1–D8 đổi thành KH1–KH8, để không trùng mã trang.
- Phần A dùng 5 trang; bài tập "phân loại 4 phát biểu" của A đặt ở B07 câu (3), vì phân loại đầy đủ cần bản đồ mũi tên của B06.
- Phần B còn 7 trang và phần C còn 9 trang theo SB05, SB03; tổng 51 trang, trong khoảng 47–54.
- BĐ5 (Jensen) đặt ở D05, BĐ6 (Markov) ở E11, tức nơi chúng được dùng lần đầu.
- Thêm hai hình ngoài danh sách rủi ro của kế hoạch: `one-step-geometry.svg` là trực quan của BĐ4 (B05); `vdb-objective.svg` đặt mất mát trơn và không trơn trên cùng dữ liệu (D01).

## Bảng đổi mã trang của bản sửa

| Mã cũ | Mã mới | Thay đổi |
|---|---|---|
| A01–A05 | A01–A05 | A02, A03, A04, A05 sửa nội dung |
| B01–B05 | B01–B05 | B01 đổi tiêu đề và nội dung; B02–B05 giữ |
| B06 | — | Bỏ |
| B07 | B06 | Sửa (ba nút) |
| B08 | B07 | Sửa (câu (2), (c)) |
| C01–C04 | C01–C04 | C01, C02, C04 sửa |
| C05 | — | Gộp vào C07 mới |
| C06 | C05 | Giữ |
| C07 | C06 | Sửa |
| C08 | C07 | Gộp, sửa |
| C09 | C08 | Sửa, đổi tiêu đề |
| C10 | C09 | Sửa, đổi tiêu đề |
| D01–D07 | D01–D07 | D02, D03, D04, D05, D07 sửa |
| E01–E12 | E01–E12 | E01, E03, E04, E05, E07, E11 sửa |
| F01–F07 | F01–F07 | F01, F02, F04, F05, F06 sửa; F06 đổi tiêu đề |
| G01–G04 | G01–G04 | G01, G02, G03, G04 sửa; G04 đổi tiêu đề |
