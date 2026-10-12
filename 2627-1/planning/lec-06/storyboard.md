# Storyboard Bài 06 — Mở rộng mô hình và dữ liệu

## Phạm vi và cơ sở lý thuyết chung

Storyboard lập ngày 2026-10-11 theo thiết kế Lecture B của người dùng (*Scaling Models and Data*) và dàn bài [outline.md](outline.md). Bài gồm 45 trang trong 7 mạch, nằm trong khoảng 5–7 mạch của AGENTS.md. Bản đầu có 43 trang; sau kiểm định storyboard cùng ngày, F02 và F05 cũ được tách, câu hỏi vận dụng của G02 chuyển sang G03, các mã F03, F04, F06 cũ đổi thành F04, F05, F08 (outline.md, mục 1.5). Thiết kế người dùng chỉ quy định ba khối B1–B3, mỗi khối 1 tiết, cùng ba câu hỏi trung tâm; không có trang mẫu. Vì bài được dựng mới, mọi trang có quyết định `thêm`. Storyboard của deck hiện hành (“Các phương pháp tối ưu trong học sâu”, 45 trang) được lưu tại `storyboard.old-2026-10-02.md`. Deck đã được dựng ngày 2026-10-12 và sửa sau vòng rà soát năm vai cùng ngày; mã trang chỉ dùng trong kế hoạch.

**Bài toán trung tâm.** Bài 05 kết thúc với hai giới hạn: mọi phương pháp của Bài 05 trả chi phí của toàn bộ $n$ mẫu ở mỗi bước, và dự đoán tuyến tính theo đặc trưng không biểu diễn được XOR. Khi mô hình phải có đặc trưng học được và dữ liệu lớn đến mức một gradient đầy đủ vượt ngân sách, bài xác định: (1) chi phí tính gradient theo tham số; (2) điều mà một phương pháp dựa trên gradient còn chứng nhận khi mục tiêu không lồi; (3) tốc độ hội tụ khi gradient được thay bằng ước lượng ngẫu nhiên, và lý do tốc độ đó đủ cho mục tiêu thay thế $F$ của rủi ro $R$.

**Luận đề (chỉ dẫn người dùng 2026-10-11).** Lý do tính toán: một gradient đầy đủ tốn $O(np)$, một bước Newton tốn $O(np^2+p^3)$; SGD nhóm nhỏ là phương pháp còn lại khi ngân sách mỗi bước cố định. Lý do thống kê: tại $\theta$ cố định, $F$ ước lượng $R$ với sai số cỡ $1/\sqrt n$ (05c.52), và theo Bottou–Bousquet, với bài toán lồi, giảm sai số tối ưu dưới sai số ước lượng không làm thay đổi bậc của cận sai số dư; vì vậy cực tiểu chính xác của $F$ không cần thiết và có thể không mong muốn, còn dừng sớm và chính quy hóa là một phần của phương pháp. A03 nêu luận đề, E01–E02 và F05 dùng lại, G01 khép lại ở dạng: mất tính chính xác, bảo đảm tất định, gradient đầy đủ; giữ tính giảm mỗi bước của hạ gradient đầy đủ, bất đẳng thức một bước của SGD có số hạng nhiễu $\tfrac{L\eta^2}2\sigma^2$ (SGD không giảm theo kỳ vọng ở mọi bước, phản ví dụ $\tfrac{69}{128}>\tfrac12$ ở F01), bảo đảm điểm dừng và tốc độ theo kỳ vọng (T5, T6, T8). Phạm vi: cận $O(1/\sqrt K)$ của T8 là bảo đảm có được; luận điểm rằng nó đủ dựa trên lập luận đại lượng thay thế (E02) cho bài toán lồi và trên tập xác thực (F06) cho mạng, không dựa trên T8.

**Đối tượng và ký hiệu chung** (outline.md, mục 4.2). Dữ liệu $(x_i,y_i)$, $x_i\in\mathbb R^d$; mạng hai tầng $f(x;\theta)=w_2^\top\sigma(W_1x+b_1)+b_2$, $\theta\in\mathbb R^p$, $p=md+2m+1$; mô hình tuyến tính $f(x;w,c)=w^\top x+c$, $p=d+1$; $\ell_i$, $F=\frac1n\sum_i\ell_i$, $R$; dãy lặp $\theta_k$; nhóm nhỏ $B_k$, kích thước nhóm $b$, gradient nhóm $\widehat g_k$. Bài 05 gộp hệ số chặn vào $w$; Bài 05b viết $x_k$, $f$, $N$; A04 ghi ánh xạ.

**Giả thiết.** Nhãn của Bài 05b: H0, H2, H3, H4, H6, H6a, H6b. Ba giả thiết cục bộ: M1 (mạng ReLU, quy ước tính toán $\sigma'(0)=0$), M2 (mất mát lồi theo $f$, mặc định bình phương), M3 (nhóm chọn đều, độc lập với lịch sử). H6b chỉ đúng trên vùng bị chặn chứa dãy lặp. H2 đúng trên vùng bị chặn cho mạng có hàm kích hoạt trơn (tanh, softplus) hoặc mạng tuyến tính (D02); với ReLU, $\nabla F$ gián đoạn tại điểm gãy nên H2 không đúng trên vùng nào chứa điểm gãy, và T7, T8 chỉ dùng làm định hướng (nêu trên mặt trang D05, F04, G02). Ký hiệu $\sigma$ ở mạch B–C là hàm kích hoạt, $\sigma^2$ ở mạch E–F là chặn phương sai.

**Chuỗi định nghĩa → kết quả → phương pháp.** (1) Tách được tuyến tính → Mệnh đề 1 (B02). (2) Mạng hai tầng (B06) → Mệnh đề 2 (B08) → Mệnh đề 3 (B09). (3) Thuật toán lan truyền ngược (C04) → chi phí cùng bậc truyền xuôi (C05). (4) Điểm dừng, điểm yên ngựa, điều kiện bậc hai (D01, D03) → bổ đề giảm (D04) → T7 (D05). (5) Định lý 05c.53 (E04) → SGD nhóm nhỏ (E05) → bất đẳng thức một bước có số hạng nhiễu và T5 (F02), T6 (F03), T8 (F04) → so sánh dưới ngân sách cố định (F05) → dừng sớm (F06) và quan hệ với chính quy hóa $\ell_2$ (F07). (6) Lựa chọn phương pháp theo $(n,p)$ và tính lồi (G02).

**Giới hạn áp dụng.** Mọi bảo đảm là về điểm dừng hoặc kỳ vọng; SGD không giảm $F$ theo kỳ vọng ở mọi bước; T7, T8 cần $F$ trơn, chặn bình phương chuẩn gradient của dãy lặp, không chặn khoảng cách tới cực tiểu hay $R$ của tham số chọn theo tập xác thực; các cận là cận trên, có thể bi quan nhiều bậc (D07, F01–F02); tương đương dừng sớm và chính quy hóa $\ell_2$ chỉ đúng cho mục tiêu bậc hai và gần đúng khi $\eta\alpha$ nhỏ và $\alpha$ nhỏ so với $\lambda$ ($\alpha$ là trị riêng, $\lambda$ là hệ số chính quy hóa); bảng chi phí bỏ hằng số và song song phần cứng.

**Hình dùng lại (đường dẫn gốc).** `img/lec-05b/vda-sgd-bound-vs-exact.svg` (F01, dữ liệu Ví dụ A), `img/lec-06b/risk-curves.svg` (F06). Theo quyết định Q4 của điều phối viên, hai tệp này đã được sao chép vào `img/lec-06/` khi dựng deck (2026-10-12), kèm dòng xuất xứ trong `review-log.md`; hai hình tùy chọn `step-halving-schedule.svg` (F02) và `rates-log-error.svg` (F04) không được dùng.

**Dựng deck (2026-10-12).** Deck `lecture-06-mo-rong-mo-hinh-va-du-lieu.html` dựng đủ 45 trang theo storyboard này, mã và tiêu đề không đổi. Điều chỉnh khi dựng (outline.md, mục 1.6): nhãn kết quả của Bài 05c theo số hiệu hiện hành (Định lý 05c.52, 05c.53, Mệnh đề 05c.56, Nhận xét 05c.58, 05c.59); điều kiện $\alpha\ll\lambda$ bổ sung cho F07, F08(c); vị trí hình ở B02, B05–B06, F02, F04, F05; bản hình cho màn hẹp ở B04, C02, C03, D06.

**Sửa sau vòng rà soát năm vai (2026-10-12).** A03 nêu trên mặt trang hai giới hạn của Bài 05, (i) chi phí và (ii) biểu diễn, cùng bốn vấn đề của bài; vấn đề (1) “biểu diễn XOR và hệ quả” là đầu vào của mạch B. Bảng của A03 và G01 có cùng bốn dòng, cùng thứ tự với Bài 05 KL04; G01 dùng hai nhãn điều kiện (i) chi phí, (ii) biểu diễn và câu chữ của KL04 hiện hành (T5 tới lân cận, $\mathbb E\lVert\theta_k-\theta^*\rVert^2$ cỡ $\eta\sigma^2/\mu$, T6 tới cực tiểu $O(1/k)$). B02 là nhắc lại Bài 05 (định nghĩa tách được tuyến tính, Mệnh đề 1); nội dung mới của trang là ví dụ bình phương nhỏ nhất. Bước ví dụ của quy tắc dừng sớm (KN9) là Bài 05, phần kết luận (KL01). F05 kết luận theo điều kiện $\mathcal B<(n-b)^2/2$; G02 dòng 5 dùng cùng điều kiện. E06 thêm câu 5 làm bài tập cho Định lý 05c.53 (KN7). Ghi chú gọi tên phần thay cho chữ cái mạch. Chi tiết trong review-log.md.

## Chức năng và ranh giới mạch

| Mạch | Khối | Chức năng | Đầu vào | Đầu ra và đóng góp vào bài toán trung tâm | Kiểm tra | Tiết LT + BT |
|---|---|---|---|---|---|---|
| A. Bài toán huấn luyện khi mô hình và dữ liệu lớn | B1 (mở đầu) | Nhận hai giới hạn của Bài 05, nêu luận đề, cố định ký hiệu | Kết luận Bài 05: chi phí $O(nd)$, $O(nd^2+d^3)$; XOR; chính quy hóa $\ell_2$ | Ba câu hỏi của bài và khung ký hiệu | không | 0,12 + 0,00 |
| B. Biểu diễn phi tuyến và mạng hai tầng | B1 | Nhu cầu: dự đoán tuyến tính có giới hạn biểu diễn. Dựng mạng hai tầng và chỉ ra chi phí | Giới hạn (ii) của A03 | $f(x;\theta)$; $F(\theta)$ không lồi, nhiều cực tiểu đối xứng | B10 | 0,55 + 0,33 |
| C. Lan truyền ngược trên đồ thị tính toán | B2 (phần 1) | Nhu cầu: tính $\nabla F(\theta)\in\mathbb R^p$ với chi phí cùng bậc truyền xuôi | $f$, $F$ của mạch B; quy tắc dây chuyền Bài 00 | Thuật toán, chi phí $O(p)$ một mẫu, một bước hạ gradient | C07 | 0,36 + 0,14 |
| D. Điểm dừng và bảo đảm của gradient khi không lồi | B2 (phần 2) | Nhu cầu: xác định điều gradient bằng 0 hoặc gradient nhỏ chứng nhận khi $F$ không lồi | Gradient từ C; tính không lồi từ B | Phân loại điểm dừng; bổ đề giảm và T7: bảo đảm có được là điểm dừng xấp xỉ | D07 | 0,32 + 0,18 |
| E. Gradient nhóm nhỏ và chi phí mỗi bước | B3 (phần 1) | Nhu cầu: một gradient đầy đủ vượt ngân sách và $F$ chỉ là đại lượng thay thế | T7 (D05); chi phí của C | Ước lượng không chệch, phương sai, thuật toán SGD, chi phí mỗi bước độc lập với $n$ | E06 | 0,30 + 0,14 |
| F. Tốc độ hội tụ dưới nhiễu và dừng sớm | B3 (phần 2) | Nhu cầu: xác định tốc độ hội tụ khi gradient có nhiễu, phạm vi của bảo đảm và quy tắc dừng | SGD và phương sai của E | Bất đẳng thức một bước có nhiễu; T5, T6, T8 phát biểu lại với phạm vi; so sánh dưới ngân sách cố định; dừng sớm và quan hệ với chính quy hóa | F08 | 0,30 + 0,13 |
| G. Tổng hợp và lựa chọn phương pháp | B3 (kết luận) | Khép luận đề; chọn phương pháp theo $(n,p)$ và tính lồi | Kết quả của B–F | Bảng quyết định có điều kiện áp dụng | G03 | 0,05 + 0,08 |

Tổng 2,00 tiết lý thuyết + 1,00 tiết bài tập; mỗi khối 1,00 tiết (outline.md, mục 5 và 7). Mỗi khối của thiết kế ứng với các mạch giữa: B1 là mạch B, B2 tách thành C và D, B3 tách thành E và F; không mạch nào gộp hai khối. Bốn ranh giới phải giữ rõ: B10→C01 chuyển từ mô hình sang cách tính gradient của nó; C06→D01 chuyển từ “tính được” sang “chứng nhận được”; D07→E01 giữ T7 nhưng thay giả thiết gradient đầy đủ bằng ngân sách cố định; E06→F01 chuyển từ một bước sang tốc độ sau $K$ bước.

## Bản đồ hành trình khái niệm

Thứ tự chuẩn là nhu cầu → trực quan → ví dụ → hình thức/toán học → ứng dụng → bài tập; khi ví dụ dẫn nhập đứng cùng nhu cầu, chuỗi hợp lệ là nhu cầu + ví dụ dẫn nhập → trực quan → hình thức → ứng dụng → bài tập. Thời lượng cụm tính theo hợp các trang được tham chiếu (bảng thời lượng trong outline.md, mục 7); trang dùng chung giữa các cụm được tính ở mỗi cụm, nên tổng các cụm lớn hơn tổng toàn bài.

### KN1. Tách được tuyến tính và giới hạn của dự đoán tuyến tính

- **Sáu bước:** nhu cầu B01 (ví dụ dẫn nhập XOR); trực quan B01 (bốn điểm), B02 (hai đường chéo có trung điểm chung); ví dụ B01 (ví dụ dẫn nhập: mô hình $f(x;w,c)$ với ngưỡng $\tfrac12$ trên bốn điểm) và B02 (hệ quả số: nghiệm bình phương nhỏ nhất affine $w=0$, $c=\tfrac12$, $F=\tfrac18$); hình thức B02 (nhắc lại Bài 05: định nghĩa tách được tuyến tính ở phần hồi quy logistic, Mệnh đề 1 ở phần kết luận; trang thêm đối chiếu $y_\pm=2y-1$, $g=f-\tfrac12$); ứng dụng B03 (đặc trưng $x_1x_2$, số đặc trưng $\binom{d+q}{q}$); bài tập B10(a).
- **Đầu vào:** giới hạn (ii) của Bài 05; bình phương nhỏ nhất và hệ phương trình chuẩn (Bài 00, Bài 05 khối A1).
- **Sản phẩm học tập và LLO/CLO:** chứng minh XOR không tách được tuyến tính, tính nghiệm bình phương nhỏ nhất affine, khớp XOR bằng đặc trưng $x_1x_2$; CLO1, CLO2.
- **Ký hiệu, dữ kiện truyền tiếp:** bốn điểm $\{0,1\}^2$, nhãn $y=(0,1,1,0)$, $f(x;w,c)$, $g(x)=w^\top x+c$; đẳng thức $g(1,0)+g(0,1)=g(0,0)+g(1,1)$ đi thẳng từ bốn điểm vào chứng minh.
- **Gộp, rút gọn:** nhu cầu, ví dụ dẫn nhập và trực quan cùng B01 vì bốn điểm vừa là dữ liệu vừa là hình; ví dụ dẫn nhập làm cụ thể nhu cầu kiểm dự đoán tuyến tính trên một nhiệm vụ cụ thể. B02 gộp phần hình thức với phép tính bình phương nhỏ nhất vì phép tính là hệ quả số trên cùng dữ liệu, kiểm tra thủ công trong ghi chú.
- **Câu nối:** mô hình tuyến tính thất bại trên bốn điểm → định nghĩa và chứng minh thất bại đó → sửa bằng đặc trưng thủ công, làm số chiều tăng.
- **Thời lượng cụm:** 0,18 tiết LT + 0,24 tiết BT (gồm B10 dùng chung).

### KN2. Mạng hai tầng (đặc trưng học được)

- **Sáu bước:** nhu cầu B03; trực quan B04; ví dụ B05 ($\theta_A$, bảng truyền xuôi); hình thức B06; ứng dụng B07 (huấn luyện mạng XOR là cực tiểu hóa $F$ trên $\mathbb R^9$); bài tập B10(b), (d).
- **Đầu vào:** KN1; chi phí theo số đặc trưng (Bài 05 khối A3).
- **Sản phẩm học tập và LLO/CLO:** dựng mạng biểu diễn XOR, tính truyền xuôi, đếm $p$; CLO2.
- **Ký hiệu, dữ kiện truyền tiếp:** $W_1,b_1,w_2,b_2,\sigma,z,h,p$; trọng số $\theta_A$ của B05 trở thành trường hợp $d=m=2$, $p=9$ của định nghĩa B06 và là điểm xuất phát của B08.
- **Gộp, rút gọn:** mỗi bước một trang; B03 dùng chung với KN1 vì ứng dụng của KN1 (chi phí đặc trưng thủ công) chính là nhu cầu của KN2.
- **Câu nối:** đặc trưng thủ công tốn số chiều → lớp ẩn tạo đặc trưng → trọng số tường minh → định nghĩa tổng quát → bài toán huấn luyện trên $\mathbb R^p$.
- **Thời lượng cụm:** 0,29 tiết LT + 0,26 tiết BT.

### KN3. Đối xứng hoán vị và tính không lồi

- **Sáu bước:** nhu cầu B07 (quy tắc hợp thành lồi không áp dụng); trực quan B08 (đổi chỗ hai đơn vị ẩn); ví dụ B08 ($\theta_B\neq\theta_A$, $F(\theta_B)=0$); hình thức B08 (Mệnh đề 2) và B09 (Mệnh đề 3); ứng dụng B09 (phép kiểm tra trung điểm trên XOR: $F(\theta(t))=t^2$ rồi $(1-t)^2$, $F(\theta(\tfrac12))=\tfrac14$) và D02 (đối xứng đổi dấu của mạng tuyến tính, trung điểm $F=\tfrac12$); bài tập B10(c).
- **Đầu vào:** KN2; tập cực tiểu của hàm lồi là tập lồi (Bài 01); quy tắc hợp thành lồi (Bài 02).
- **Sản phẩm học tập và LLO/CLO:** chỉ ra hai cực tiểu đối xứng và bác bỏ tính lồi bằng giá trị tại trung điểm; LLO11; CLO1.
- **Ký hiệu, dữ kiện truyền tiếp:** $\theta_A,\theta_B$, ma trận hoán vị $P$, đường $\theta(t)=(1-t)\theta_A+t\theta_B$.
- **Gộp, rút gọn:** B08 gộp trực quan, ví dụ và Mệnh đề 2; khi dựng deck, bảng $\theta_A$, $\theta_B$ đứng trước Mệnh đề 2 để phát biểu tổng quát hóa phép đổi chỗ vừa thấy. Trên B09, phép tính $F(\theta(t))$ là ứng dụng của Mệnh đề 3 vào XOR; kế hoạch gốc ghi phép tính này là ví dụ, storyboard ghi là ứng dụng để thứ tự sáu bước không bị đảo.
- **Câu nối:** tham số vào phi tuyến → hai tham số khác nhau cho cùng một hàm → tập cực tiểu không lồi → $F$ không lồi; đặc trưng học được khắc phục giới hạn biểu diễn nhưng làm mất tính lồi, còn đặc trưng thủ công làm số chiều tăng.
- **Thời lượng cụm:** 0,25 tiết LT + 0,28 tiết BT.

### KN4. Lan truyền ngược

- **Sáu bước:** nhu cầu C01; trực quan C02 (đồ thị tính toán); ví dụ C02 (truyền xuôi) và C03 (truyền ngược, mọi đại lượng trung gian); hình thức C04; ứng dụng C05 (chi phí) và C06 (một bước hạ gradient); bài tập C07, E06 (chuyển giao sang SGD).
- **Đầu vào:** KN2; quy tắc dây chuyền dạng Jacobian chuyển vị (Bài 00).
- **Sản phẩm học tập và LLO/CLO:** tính gradient một mẫu thủ công, đếm chi phí hai chiều; LLO11 (độ sâu đồ thị tính toán); CLO1, CLO4.
- **Ký hiệu, dữ kiện truyền tiếp:** tham số chung $W_1=\begin{psmallmatrix}1&\tfrac12\\\tfrac12&-1\end{psmallmatrix}$, $b_1=(-\tfrac12,1)$, $w_2=(1,-2)$, $b_2=\tfrac12$ dùng ở C02–C07 và E06; $e,\delta_h,\delta_z$; $\lVert\nabla\ell\rVert^2=\tfrac{69}{16}$ truyền sang C06.
- **Gộp, rút gọn:** trực quan và phần xuôi của ví dụ cùng C02 vì đồ thị chỉ có nghĩa khi gắn giá trị.
- **Câu nối:** sai phân tốn cỡ $p^2$ → lưu giá trị trung gian → nhân ngược đạo hàm cục bộ → quy tắc chung $\delta_{\text{trước}}=J^\top\delta_{\text{sau}}$ → chi phí $O(p)$ → một bước cho thấy độ dài bước phải gắn với độ cong.
- **Thời lượng cụm:** 0,36 tiết LT + 0,22 tiết BT.

### KN5. Điểm dừng, điểm yên ngựa và phân loại bậc hai

- **Sáu bước:** nhu cầu C07 (gradient bằng 0 cục bộ) và D01 (đối chiếu với trường hợp lồi); hình thức phần định nghĩa D01; trực quan D02 (đường mức); ví dụ D02 (Hessian, trị riêng $\pm1$ tại gốc; $0$ và $2$ tại $(1,1)$); hình thức phần kết quả D03 (điều kiện bậc hai); ứng dụng D06 (bình nguyên gần điểm yên ngựa); bài tập D07(a), (b).
- **Ngoại lệ thứ tự và lý do:** D01 nêu định nghĩa điểm dừng, điểm dừng $\varepsilon$-xấp xỉ và điểm yên ngựa trước trực quan và ví dụ D02. Ba lý do: ví dụ D02 thể hiện cả ba hiện tượng trên một hàm và cần tên để gọi; các định nghĩa là thuật ngữ đã có (điểm yên ngựa, ví dụ $u^2-v^2$, và phép thử Hessian đã học ở Bài 00; điểm dừng đã dùng ở Bài 02, 04), không chứa kết quả mới, và D03 là phát biểu nhắc lại Bài 00; nhu cầu đã có trước (C07 cho gradient bằng 0 cục bộ, D01 đối chiếu với chứng nhận cực tiểu toàn cục của Bài 02, 04). Phần hình thức mang nội dung của cụm là điều kiện bậc hai ở D03, đứng sau trực quan và ví dụ, nên thứ tự sáu bước của kết quả không bị đảo.
- **Đầu vào:** KN3, KN4; khai triển Taylor bậc hai (Bài 00).
- **Sản phẩm học tập và LLO/CLO:** phân loại điểm dừng bằng trị riêng Hessian, nhận ra trường hợp phép kiểm tra không kết luận; LLO11; CLO1.
- **Ký hiệu, dữ kiện truyền tiếp:** $F(u,v)=\tfrac12(uv-1)^2$, các điểm $(0,0)$, $(1,1)$, $(2,\tfrac12)$; hàm này đi tiếp vào D04–D07.
- **Câu nối:** gradient bằng 0 không còn chứng nhận cực tiểu → tên cho các loại điểm dừng → một hàm hai biến có đủ ba hiện tượng → điều kiện bậc hai và giới hạn khi có trị riêng 0 → gradient nhỏ có thể xuất hiện xa cực tiểu.
- **Thời lượng cụm:** 0,21 tiết LT + 0,24 tiết BT.

### KN6. Bảo đảm chỉ dùng gradient (bổ đề giảm, T7)

- **Sáu bước:** nhu cầu C06 (bước 0,25 làm mất mát tăng) và D03 (Hessian có $p^2$ phần tử, không dùng được làm quy tắc dừng); trực quan D04 (parabol chặn trên của $\varphi(\eta)$); ví dụ D04 (bảo đảm giảm $0{,}0703\le$ giảm thực $0{,}1422$) và D06; hình thức D04 (bổ đề giảm, nhắc lại) và D05 (T7); ứng dụng D06; bài tập D07(c), (d).
- **Đầu vào:** bổ đề giảm (Bài 04; Bài 05b); T7 (Bài 05b, mạch F, trang F03).
- **Sản phẩm học tập và LLO/CLO:** áp bổ đề giảm trên một vùng, tính số bước theo T7, nêu điều T7 không khẳng định; CLO1.
- **Ký hiệu, dữ kiện truyền tiếp:** $L=2$ trên $[0,1]^2$, $\theta_0=(\tfrac12,\tfrac12)$, $\Delta_0=0{,}28125$, $\min_{k<K}\lVert\nabla F(\theta_k)\rVert^2$; các số này dùng lại ở D07(c).
- **Gộp, rút gọn:** D04 gộp trực quan, ví dụ và phát biểu bổ đề giảm. Bổ đề đã được chứng minh ở Bài 04 và 05b; trang chỉ nhắc phát biểu để kiểm trên D02, nên phần hình thức mới của cụm là T7 ở D05, đứng sau trực quan và ví dụ.
- **Câu nối:** bước nào luôn giảm → bổ đề giảm chỉ cần tính trơn → cộng theo $k$ thành T7 → điều T7 chứng nhận có thể là một điểm gần yên ngựa.
- **Thời lượng cụm:** 0,26 tiết LT + 0,17 tiết BT.

### KN7. Gradient nhóm nhỏ và SGD

- **Sáu bước:** nhu cầu E01 (chi phí ba quy mô) và E02 ($F$ là đại lượng thay thế); trực quan E03 (sáu mũi tên gradient nhóm quanh $\nabla F(\theta_0)$); ví dụ E03 (bảng sáu nhóm); hình thức E04 (Định lý 05c.53) và E05 (thuật toán); ứng dụng E05 (chi phí mỗi lượt), F05, G02; bài tập E06.
- **Đầu vào:** KN4 (lan truyền ngược), KN6 (T7); Bài 05c (Định lý 05c.52, 05c.53).
- **Sản phẩm học tập và LLO/CLO:** tính gradient nhóm, kiểm tính không chệch và phương sai, thực hiện một bước SGD trên mạng; LLO12; CLO1, CLO2.
- **Ký hiệu, dữ kiện truyền tiếp:** $B_k$, $b$, $\widehat g_k$, $\operatorname{tr}\Sigma$; dữ liệu $x=(-1,0,1,2)$, $y=(1,0,1,4)$, mô hình $wx+c$ đi từ E03 sang E04 (kiểm $\tfrac{59}{12}$) và F01 (tại $\theta^*=(1,1)$).
- **Gộp, rút gọn:** trực quan và ví dụ cùng E03 vì hình vẽ đúng sáu vector của bảng.
- **Câu nối:** T7 cần gradient đầy đủ → gradient đầy đủ vượt ngân sách và không cần chính xác → gradient nhóm trên bốn điểm → không chệch, phương sai giảm theo $b$ → thuật toán chi phí $O(bp)$ mỗi bước.
- **Thời lượng cụm:** 0,38 tiết LT + 0,18 tiết BT.

### KN8. Tốc độ hội tụ dưới nhiễu

- **Sáu bước:** nhu cầu F01; trực quan F01 (hình kỳ vọng sai số co về mức dương, dữ liệu Ví dụ A của 05b, ghi rõ trên chú thích); ví dụ F01 (dữ liệu E03 tại $\theta^*$: $\operatorname{tr}\Sigma(\theta^*)=\tfrac52$, $\mathbb EF(\theta_1)=\tfrac{69}{128}>\tfrac12$), F02 và F03 (Ví dụ A); hình thức F02 (bất đẳng thức một bước có số hạng nhiễu, T5), F03 (T6), F04 (T8); ứng dụng F05; bài tập F08(a), (b).
- **Đầu vào:** KN7; T5, T6, T8 của Bài 05b.
- **Sản phẩm học tập và LLO/CLO:** đọc và áp các cận với đủ giả thiết và phạm vi, so sánh lịch bước, tính $K$ theo hệ quả T8; LLO12; CLO1.
- **Ký hiệu, dữ kiện truyền tiếp:** $\sigma^2$ (chặn phương sai, khác hàm kích hoạt $\sigma$ của mạch B–C), mức nhiễu nền $\eta\sigma^2/\mu$, $O(1/k)$, $O(1/\sqrt K)$ cho trung bình kỳ vọng bình phương chuẩn gradient. Dữ kiện đổi một lần, có nói rõ: số của F01 lấy từ dữ liệu E03; hình F01 và số của F02, F03, F08(a) lấy từ Ví dụ A. Lý do đổi: trên dữ liệu E03, $\operatorname{tr}\Sigma(\theta)$ tăng không bị chặn theo $\theta$ nên H6b chỉ đúng trên vùng, còn Ví dụ A có $\sigma^2=\tfrac83$ không đổi nên H6b đúng trên toàn trục. Câu nối F01→F02 nêu lý do này.
- **Gộp, rút gọn:** nhu cầu, trực quan và ví dụ cùng F01 vì hiện tượng thấy ngay từ một phép tính trên dữ liệu đã có. F02, F03 mỗi trang một định lý kèm số của Ví dụ A để đối chiếu cận với giá trị chính xác; bước ví dụ của cụm đã thực hiện ở F01.
- **Câu nối:** tại nghiệm gradient nhóm vẫn khác 0 và $F$ tăng theo kỳ vọng → điều còn giữ là bất đẳng thức một bước có số hạng nhiễu; lồi mạnh: mức nhiễu nền với bước hằng → bước giảm dần cho $O(1/k)$ → không lồi và trơn: T8 thay T7 → đặt hai cận vào cùng ngân sách.
- **Thời lượng cụm:** 0,24 tiết LT + 0,12 tiết BT (F01–F05, F08).

### KN9. Dừng sớm theo tập xác thực

- **Sáu bước:** nhu cầu E02, F05; trực quan F06 (đường mất mát huấn luyện và xác thực, định tính); ví dụ của quy tắc dừng là Bài 05, phần kết luận (định nghĩa dừng sớm, sai số xác thực nhỏ nhất tại bước 79; bước kế thừa), ví dụ của nhận xét là F07 (bảng tỉ lệ giữ); hình thức F06 (quy tắc dừng) và F07 (nhận xét DL (7.40), (7.42), (7.44)); ứng dụng F07 (dừng sớm tác động như chính quy hóa $\ell_2$) và G02; bài tập F08(c). Bước lưu tham số tốt nhất trong thuật toán E05 thuộc phần hình thức của KN7 (thuật toán), không phải bước ứng dụng của KN9; F06 giải thích bước đó sau nhu cầu và trực quan.
- **Thứ tự và lý do:** sau kiểm định storyboard, cụm được tách thành hai trang thay cho một trang gộp. Trên F06, trực quan (hình) đứng trước quy tắc vận hành; trên F07, bảng số đứng trước nhận xét. Quy tắc trên F06 là phần hình thức của thao tác dừng; nhận xét trên F07 là phần hình thức của quan hệ với chính quy hóa, và ví dụ của nó đứng trước nó trên cùng trang. Dừng sớm là một phần của phương pháp theo luận đề; cụm không có trang định nghĩa riêng vì tập xác thực và tập kiểm thử đã được định nghĩa ở Bài 05 HQ05 và Bài 05 KL01 đã có quan sát số trên dữ liệu khối A1 (điểm hòa giải 5; quyết định phân chia nguồn của điều phối viên); phép so sánh định lượng thuộc F07.
- **Đầu vào:** Bài 05 (khối A1: khớp quá; khối A2: chính quy hóa $\ell_2$; HQ05: tập xác thực; KL01: quan sát số); Định lý 05c.52 của 05c.
- **Sản phẩm học tập và LLO/CLO:** áp quy tắc dừng sớm, tính và giải thích tỉ lệ giữ; LLO11; CLO1, CLO2.
- **Ký hiệu, dữ kiện truyền tiếp:** chu kỳ đánh giá $s$, ngưỡng kiên nhẫn $r$; trị riêng $\alpha$, hệ số chính quy hóa $\lambda\approx1/(\eta k)$; tỉ lệ giữ $1-(1-\eta\alpha)^k$ và $\alpha/(\alpha+\lambda)$; số $\eta=0{,}5$, $k=20$, $\alpha=0{,}1$ đi từ F07 vào F08(c).
- **Câu nối:** không cần cực tiểu chính xác → dừng theo tập xác thực (F06) → trên mục tiêu bậc hai, dừng sớm tác động như chính quy hóa $\ell_2$ (F07).
- **Thời lượng cụm:** 0,20 tiết LT + 0,13 tiết BT (E02, F05–F08, G02).

### Câu nối giữa các cụm

KN1 → KN2: đặc trưng thủ công tốn số chiều → đặc trưng học được. KN2 → KN3: tham số vào phi tuyến → phản ví dụ cho tính lồi. KN3 → KN4: mục tiêu không lồi vẫn cần gradient → tính gradient. KN4 → KN5, KN6: gradient tính được → gradient chứng nhận được điều gì. KN6 → KN7: T7 cần gradient đầy đủ → gradient nhóm. KN7 → KN8: ước lượng có phương sai → tốc độ hội tụ. KN8 → KN9: không cần cực tiểu chính xác → quy tắc dừng.

## Vai trò từng trang

Mỗi trang của outline.md có đúng một mục dưới đây, cùng mã và cùng tiêu đề. Mã là dữ liệu nội bộ, không xuất hiện trên mặt trang hoặc trong ghi chú diễn giả.

### A01. Mở rộng mô hình và dữ liệu

- **Lý do tồn tại:** trang nhận diện bắt buộc của cấu trúc mặc định: học phần, số bài, tên bài, phụ đề tạm (Q1), đơn vị.
- **Nhu cầu hoặc khoảng trống được lấp:** người học cần nhận ra bài này nối tiếp kết luận Bài 05; thiếu trang này deck không có điểm nhận diện.
- **Đầu vào:** kết luận Bài 05 (hai giới hạn, nêu trong ghi chú diễn giả).
- **Đầu ra:** tên bài và phạm vi cho A02.
- **Vị trí trong khung:** ngoài chuỗi lập luận; mở mạch A.
- **LLO/CLO:** chung, không đo riêng.
- **Bước hành trình:** không áp dụng.
- **Quyết định:** `thêm` — trang nhận diện bắt buộc; bài dựng mới theo thiết kế Lecture B, không có trang mẫu để giữ.

### A02. Mục tiêu học tập và bản đồ bài

- **Lý do tồn tại:** nêu ba mục tiêu đo được tương ứng ba khối B1–B3 và bản đồ năm mạch nội dung B–F.
- **Nhu cầu hoặc khoảng trống được lấp:** người học cần biết ba sản phẩm học tập (chứng minh rủi ro thực nghiệm của mạng biểu diễn XOR không lồi; tính gradient bằng lan truyền ngược và phân loại điểm dừng; chọn phương pháp theo $(n,p)$ và tính lồi kèm bảo đảm dưới nhiễu) trước nội dung; thiếu bản đồ thì ranh giới giữa ba khối không được thấy.
- **Đầu vào:** A01; tiên quyết Bài 00 (dây chuyền), Bài 04 (bổ đề giảm), kết luận Bài 05.
- **Đầu ra:** ba mục tiêu mà G03 đối chiếu; bản đồ mạch dùng lại ở các ranh giới mạch.
- **Vị trí trong khung:** cấu trúc của bài toán trung tâm thành bốn vấn đề (A03).
- **LLO/CLO:** LLO11, LLO12 (một phần); CLO1, CLO2, CLO4.
- **Bước hành trình:** không áp dụng.
- **Quyết định:** `thêm` — cấu trúc mặc định yêu cầu mục tiêu đo được gắn LLO/CLO trước nội dung.

### A03. Giả thiết lồi của Bài 01–04 và hai giới hạn khi mở rộng quy mô

- **Lý do tồn tại:** nêu luận đề của người dùng lần đầu, ở dạng đối chiếu giữa bức tranh lồi của Bài 01–04 và bài toán quy mô lớn, kèm hai lý do; G01 quay lại cùng bảng.
- **Nhu cầu hoặc khoảng trống được lấp:** nếu hai lý do không được nêu sớm, SGD ở mạch E–F dễ bị hiểu là lựa chọn “nhanh hơn” và dừng sớm bị hiểu là thất bại hội tụ.
- **Đầu vào:** hai giới hạn trong kết luận Bài 05: chi phí $O(nd)$ và $O(nd^2+d^3)$ đều quét toàn bộ $n$ mẫu; XOR không biểu diễn được bằng dự đoán tuyến tính; kết quả khối A1, A2 của Bài 05.
- **Đầu ra:** lý do tính toán; lý do thống kê kèm hệ quả “dừng sớm và chính quy hóa là một phần của phương pháp”; đối chiếu “giảm mỗi bước / bất đẳng thức giảm có số hạng nhiễu”; bốn vấn đề của bài (biểu diễn XOR và hệ quả, chi phí tính gradient, điều gradient chứng nhận khi không lồi, tốc độ hội tụ dưới nhiễu), mỗi vấn đề là nhu cầu của một phần; bảng có nhãn dòng Đích (lý do thống kê), Biểu diễn (giới hạn (ii)), Chi phí (lý do tính toán, giới hạn (i)).
- **Vị trí trong khung:** bài toán trung tâm và luận đề.
- **LLO/CLO:** LLO11; CLO1.
- **Bước hành trình:** nhu cầu của toàn bài, đứng trước KN1–KN9.
- **Quyết định:** `thêm` — chỉ dẫn người dùng 2026-10-11 yêu cầu nêu luận đề sớm theo dạng “mất gì, giữ gì”; ghi chú phát biểu Newton theo Bài 05 CP05, không viết “Newton không phụ thuộc $\kappa$” vô điều kiện (điểm hòa giải 2); sau kiểm định storyboard, mặt trang không khẳng định SGD giảm theo kỳ vọng, không dùng $p$ trước A04 và dùng nhãn “Vấn đề của bài” thay cho “Câu hỏi”.

### A04. Bài toán huấn luyện và ký hiệu chung

- **Lý do tồn tại:** cố định đối tượng và ký hiệu chung trước khi phát biểu lại kết quả của 05b, 05c.
- **Nhu cầu hoặc khoảng trống được lấp:** 05b viết $x_k$, $f$, $N$; 05c viết $J$ và dùng $d$ cho số chiều tham số; Bài 05 gộp hệ số chặn vào $w$ và viết $w_k$. Không có ánh xạ, T5–T8, 05c.52, 05c.53 sẽ trùng chữ với dữ liệu $x_i$ và với kích thước nhóm $b$.
- **Đầu vào:** bốn vấn đề của A03; ký hiệu của Bài 05, 05b, 05c.
- **Đầu ra:** $(x_i,y_i)$, $f(x;\theta)$, $\theta\in\mathbb R^p$, $\ell_i$, $F$, $R$, dãy lặp $\theta_{k+1}=\theta_k-\eta_kg_k$; quy ước $c$ cho hệ số chặn, $b_1,b_2$ cho độ lệch mạng, $b$ cho kích thước nhóm; ánh xạ ký hiệu với Bài 05, 05b, 05c, gồm dòng đối xứng với MD04 của Bài 05: Bài 05 viết đầu vào thô $u$, đặc trưng $x=\varphi(u)\in\mathbb R^d$ có tọa độ hằng 1 và hệ số chặn trong $w$, nên $d$ của Bài 05 bằng $p=d+1$ của Bài 06 với mô hình tuyến tính; câu nhắc $\sigma$ (hàm kích hoạt ở mạch B–C; Bài 05 dùng $\sigma$ cho hàm sigmoid) khác $\sigma^2$ (chặn phương sai ở mạch E–F).
- **Vị trí trong khung:** đối tượng và ký hiệu chung.
- **LLO/CLO:** CLO1.
- **Bước hành trình:** nền cho mọi KN, không thuộc bước riêng.
- **Quyết định:** `thêm` — khung ký hiệu phải cố định trước khi dẫn định lý có ký hiệu khác; câu ánh xạ quy ước hệ số chặn của Bài 05 theo điểm hòa giải 1.

### B01. Bài toán XOR

- **Lý do tồn tại:** cung cấp một dữ liệu tính thủ công được cho nhu cầu của mạch B, trước mọi định nghĩa.
- **Nhu cầu hoặc khoảng trống được lấp:** giới hạn (ii) ở A03 mới là một phát biểu; người học cần một nhiệm vụ cụ thể để kiểm.
- **Đầu vào:** giới hạn (ii) của A03; ký hiệu A04.
- **Đầu ra:** bốn điểm, nhãn $\{0,1\}$, mô hình $f(x;w,c)$, ngưỡng $\tfrac12$; mất mát bình phương được nêu là lựa chọn để tính thủ công.
- **Vị trí trong khung:** mở bước 1 của chuỗi (tách được tuyến tính → Mệnh đề 1).
- **LLO/CLO:** CLO2.
- **Bước hành trình:** KN1 nhu cầu + ví dụ dẫn nhập + trực quan.
- **Quyết định:** `thêm` — cần một dữ liệu tính thủ công được trước định nghĩa; nêu nhãn $\{0,1\}$ và mất mát bình phương là lựa chọn để tính thủ công, ghi chú nối với nhãn $\pm1$ của Bài 05 KL03 (điểm hòa giải 4).

### B02. Tính không tách được tuyến tính của XOR

- **Lý do tồn tại:** chứng minh trên trang rằng không hàm affine nào phân lớp đúng bốn điểm, kèm nghiệm bình phương nhỏ nhất là hằng $\tfrac12$.
- **Nhu cầu hoặc khoảng trống được lấp:** B01 chỉ đặt nhiệm vụ; giới hạn (ii) cần trở thành một mệnh đề có chứng minh.
- **Đầu vào:** dữ liệu B01; bình phương nhỏ nhất (Bài 00, Bài 05 khối A1).
- **Đầu ra:** Định nghĩa tách được tuyến tính; Mệnh đề 1; nghiệm $w=0$, $c=\tfrac12$, $F=\tfrac18$.
- **Vị trí trong khung:** bước 1 của chuỗi.
- **LLO/CLO:** CLO1.
- **Bước hành trình:** KN1 trực quan (hai đường chéo) + ví dụ (hệ quả bình phương nhỏ nhất) + hình thức.
- **Quyết định:** `thêm` — chứng minh ngắn đủ đặt trên trang; tiêu đề viết thành cụm danh từ thay cho mệnh đề “XOR không tách được tuyến tính”.

### B03. Đặc trưng thủ công và chi phí theo số chiều

- **Lý do tồn tại:** cho thấy đặc trưng $x_1x_2$ sửa được XOR và đo chi phí của cách sửa này theo $\binom{d+q}{q}$.
- **Nhu cầu hoặc khoảng trống được lấp:** sau Mệnh đề 1, cách sửa trực tiếp là đổi không gian đặc trưng; cần chi phí của cách sửa để có lý do chuyển sang đặc trưng học được.
- **Đầu vào:** Mệnh đề 1; chi phí mỗi bước theo số đặc trưng (Bài 05 khối A3); hệ quả thống kê khi $d$ tăng (khối A1).
- **Đầu ra:** $f=x_1+x_2-2x_1x_2$; bảng số đơn thức; nhận xét đặc trưng thủ công đòi hỏi biết trước dạng tương tác.
- **Vị trí trong khung:** ứng dụng bước 1; nhu cầu của bước 2.
- **LLO/CLO:** CLO2, CLO4.
- **Bước hành trình:** KN1 ứng dụng; KN2 nhu cầu.
- **Quyết định:** `thêm` — nối chi phí của đặc trưng thủ công với khối A1, A3 của Bài 05.

### B04. Lớp ẩn như một phép biến đổi đặc trưng

- **Lý do tồn tại:** trực quan cho đặc trưng học được: hai đơn vị ReLU đưa XOR sang không gian $h$ nơi hai lớp tách được tuyến tính.
- **Nhu cầu hoặc khoảng trống được lấp:** định nghĩa mạng ở B06 cần một hình ảnh về việc lớp ẩn làm gì với dữ liệu.
- **Đầu vào:** nhu cầu ở B03; bốn điểm B01.
- **Đầu ra:** ánh xạ $x\mapsto h$; đường $h_1+h_2=\tfrac12$; hai điểm lớp 0 bị gộp vào một điểm.
- **Vị trí trong khung:** bước 2 (trực quan).
- **LLO/CLO:** CLO2.
- **Bước hành trình:** KN2 trực quan.
- **Quyết định:** `thêm` — trực quan phải đứng trước định nghĩa mạng.

### B05. Mạng hai đơn vị ẩn biểu diễn XOR

- **Lý do tồn tại:** viết đầy đủ trọng số $\theta_A$ và bảng truyền xuôi tại bốn đầu vào.
- **Nhu cầu hoặc khoảng trống được lấp:** B04 chỉ ra phép biến đổi; cần một ví dụ có tham số tường minh làm điểm tựa cho định nghĩa B06 và cho phản ví dụ B08–B09.
- **Đầu vào:** phép biến đổi B04.
- **Đầu ra:** $\theta_A$, $f(x;\theta_A)=\lvert x_1-x_2\rvert$ trên $\{0,1\}^2$, $F(\theta_A)=0$; ghi nhận tiền kích hoạt bằng 0 tại $(0,0)$ và $(1,1)$.
- **Vị trí trong khung:** bước 2 (ví dụ).
- **LLO/CLO:** CLO2.
- **Bước hành trình:** KN2 ví dụ.
- **Quyết định:** `thêm` — cần trọng số tường minh và truyền xuôi cho bốn đầu vào.

### B06. Mạng nơ ron hai tầng

- **Lý do tồn tại:** định nghĩa mạng hai tầng có miền, kích thước và số tham số; nhận xét $\sigma$ tuyến tính đưa mạng về hàm affine.
- **Nhu cầu hoặc khoảng trống được lấp:** B05 là trường hợp $d=m=2$; $F(\theta)$, lan truyền ngược và bảng chi phí cần định nghĩa tổng quát theo $p$.
- **Đầu vào:** B05.
- **Đầu ra:** $f(x;\theta)=w_2^\top\sigma(W_1x+b_1)+b_2$, $p=md+2m+1$; ký hiệu $W_1,b_1,w_2,b_2,\sigma,z,h$ dùng tới cuối bài.
- **Vị trí trong khung:** định nghĩa mạng hai tầng (bước 2 của chuỗi).
- **LLO/CLO:** CLO2.
- **Bước hành trình:** KN2 hình thức.
- **Quyết định:** `thêm` — định nghĩa phải có miền và kích thước theo tiêu chuẩn nội dung.

### B07. Rủi ro thực nghiệm theo tham số mạng

- **Lý do tồn tại:** tách bước “quy tắc hợp thành lồi không áp dụng” khỏi bước phản ví dụ.
- **Nhu cầu hoặc khoảng trống được lấp:** người học dễ suy ra rằng mất mát lồi theo $f$ kéo theo $F$ lồi theo $\theta$; trang chỉ ra hàm trong $\theta\mapsto f(x_i;\theta)$ không affine.
- **Đầu vào:** định nghĩa B06; quy tắc hợp thành lồi (Bài 02; BV §3.2).
- **Đầu ra:** huấn luyện mạng XOR là cực tiểu hóa $F$ trên $\mathbb R^9$; tính lồi không còn được bảo đảm, chờ phản ví dụ.
- **Vị trí trong khung:** nối định nghĩa mạng với Mệnh đề 2–3.
- **LLO/CLO:** LLO11; CLO1.
- **Bước hành trình:** KN2 ứng dụng; KN3 nhu cầu.
- **Quyết định:** `thêm` — tránh nhảy kết luận từ “không được bảo đảm” sang “không lồi”; ghi chú kiểm kết luận không lồi với mất mát logistic (điểm hòa giải 4, Q5).

### B08. Đối xứng hoán vị các đơn vị ẩn

- **Lý do tồn tại:** chỉ ra nguồn gốc cụ thể của nhiều cực tiểu là phép hoán vị đơn vị ẩn.
- **Nhu cầu hoặc khoảng trống được lấp:** B07 để mở câu hỏi về tính lồi; muốn bác bỏ tính lồi cần hai cực tiểu phân biệt cụ thể.
- **Đầu vào:** $\theta_A$ (B05); định nghĩa B06.
- **Đầu ra:** Mệnh đề 2; $\theta_B\neq\theta_A$ với $F(\theta_B)=0$; $m!$ cách sắp xếp; hệ quả cho khởi tạo đối xứng (chỉ nêu trong ghi chú).
- **Vị trí trong khung:** Mệnh đề 2 (bước 2 của chuỗi).
- **LLO/CLO:** LLO11.
- **Bước hành trình:** KN3 trực quan + ví dụ + hình thức (Mệnh đề 2).
- **Quyết định:** `thêm` — nguồn gốc của nhiều cực tiểu phải được chỉ ra trước khi kết luận không lồi.

### B09. Tính không lồi của rủi ro thực nghiệm

- **Lý do tồn tại:** lập luận trung điểm với $F(\theta(t))$ tính tường minh bác bỏ tính lồi của $F$.
- **Nhu cầu hoặc khoảng trống được lấp:** biến “tính lồi không được bảo đảm” (B07) thành “$F$ không lồi” bằng một phép kiểm tra có chứng minh.
- **Đầu vào:** $\theta_A,\theta_B$ (B08); tập cực tiểu của hàm lồi là tập lồi (Bài 01).
- **Đầu ra:** Mệnh đề 3; $F(\theta(t))=t^2$ trên $[0,\tfrac12]$, $(1-t)^2$ trên $[\tfrac12,1]$; $F(\theta(\tfrac12))=\tfrac14$; nhận xét lớp ẩn thay cho việc tăng số đặc trưng thủ công, đổi lại $F$ không lồi.
- **Vị trí trong khung:** Mệnh đề 3, kết quả chính của khối B1; đầu vào của mạch D.
- **LLO/CLO:** LLO11; CLO1.
- **Bước hành trình:** KN3 hình thức (Mệnh đề 3) + ứng dụng (phép kiểm tra trên XOR).
- **Quyết định:** `thêm` — lập luận trung điểm cần một đường $F(\theta(t))$ tính được tường minh.

### B10. Biểu diễn XOR và đối xứng của mạng

- **Lý do tồn tại:** trang kiểm tra riêng của mạch B; đo khả năng tái tạo ba kết quả trên nghiệm XOR khác (DL (6.4)–(6.6)).
- **Nhu cầu hoặc khoảng trống được lấp:** cần minh chứng người học tái tạo được KN1–KN3 trước khi chuyển sang tính gradient.
- **Đầu vào:** B02, B03, B05–B09.
- **Đầu ra:** đáp án $(0,1,1,-2)$; bảng truyền xuôi nghiệm DL; $F=\tfrac{27}{32}$ tại trung điểm; $p=78\,601$ dùng ở C01.
- **Vị trí trong khung:** kiểm tra bước 1–2.
- **LLO/CLO:** LLO11; CLO1, CLO2.
- **Bước hành trình:** KN1, KN2, KN3 bài tập.
- **Quyết định:** `thêm` — mỗi mạch có trang kiểm tra riêng; câu (d) chuẩn bị nhu cầu của C01.

### C01. Chi phí của gradient theo mọi tham số

- **Lý do tồn tại:** đặt nhu cầu của lan truyền ngược bằng một chi phí đo được.
- **Nhu cầu hoặc khoảng trống được lấp:** mọi phương pháp bậc nhất cần $\nabla F\in\mathbb R^p$; sai phân hữu hạn cần $p+1$ lần truyền xuôi, tổng cỡ $p^2$, quá đắt với $p=78\,601$.
- **Đầu vào:** $p$ từ B10(d); $F$ từ B07.
- **Đầu ra:** mục tiêu của mạch: gradient chính xác với chi phí cùng bậc một lần truyền xuôi.
- **Vị trí trong khung:** mở bước 3 (lan truyền ngược).
- **LLO/CLO:** LLO11 (độ sâu đồ thị tính toán); CLO1.
- **Bước hành trình:** KN4 nhu cầu.
- **Quyết định:** `thêm` — nhu cầu phải xuất phát từ một chi phí đo được.

### C02. Đồ thị tính toán và truyền xuôi

- **Lý do tồn tại:** gộp trực quan (đồ thị tính toán) với phần truyền xuôi của ví dụ số.
- **Nhu cầu hoặc khoảng trống được lấp:** lan truyền ngược dùng lại các giá trị trung gian; người học cần thấy giá trị nào được tính và lưu.
- **Đầu vào:** định nghĩa B06; nhu cầu C01.
- **Đầu ra:** tham số chung của mạch C; mẫu $x=(1,1)$, $y=0$: $z=(1,\tfrac12)$, $h=(1,\tfrac12)$, $f=\tfrac12$, $\ell=\tfrac18$; ghi chú điểm gãy tại đầu vào $(0,1)$.
- **Vị trí trong khung:** bước 3 (trực quan, ví dụ).
- **LLO/CLO:** CLO1.
- **Bước hành trình:** KN4 trực quan + ví dụ (phần xuôi).
- **Quyết định:** `thêm` — đồ thị chỉ có nghĩa khi gắn giá trị, nên hai bước cùng trang.

### C03. Truyền ngược trên ví dụ

- **Lý do tồn tại:** tính mọi đạo hàm trung gian từ $\ell$ về $\theta$ trên cùng đồ thị và kiểm một thành phần bằng sai phân trung tâm.
- **Nhu cầu hoặc khoảng trống được lấp:** trước thuật toán tổng quát, người học cần thấy mỗi đạo hàm là tích của đạo hàm phía sau với một đạo hàm cục bộ đã có từ truyền xuôi.
- **Đầu vào:** giá trị truyền xuôi C02.
- **Đầu ra:** $e$, $\nabla_{b_2}$, $\nabla_{w_2}$, $\delta_h$, $\delta_z$, $\nabla_{W_1}$, $\nabla_{b_1}$; $\lVert\nabla\ell\rVert^2=\tfrac{69}{16}$ dùng ở C06.
- **Vị trí trong khung:** bước 3 (ví dụ).
- **LLO/CLO:** CLO1.
- **Bước hành trình:** KN4 ví dụ (phần ngược).
- **Quyết định:** `thêm` — ví dụ số phải có đủ mọi đại lượng trung gian.

### C04. Thuật toán lan truyền ngược

- **Lý do tồn tại:** phát biểu thuật toán với đầu vào, đầu ra, quy ước $\sigma'(0)=0$ và dạng tổng quát $\delta_{\text{trước}}=J^\top\delta_{\text{sau}}$.
- **Nhu cầu hoặc khoảng trống được lấp:** C03 xử lý một mẫu cụ thể; cần quy tắc dùng cho mọi mẫu và cho gradient của $F$.
- **Đầu vào:** C03; quy tắc dây chuyền (Bài 00).
- **Đầu ra:** thuật toán; phân biệt lan truyền ngược (tính gradient) với thuật toán tối ưu.
- **Vị trí trong khung:** bước 3 (thuật toán).
- **LLO/CLO:** LLO11; CLO1.
- **Bước hành trình:** KN4 hình thức.
- **Quyết định:** `thêm` — thuật toán phải có đầu vào, đầu ra và điều kiện.

### C05. Chi phí của lan truyền ngược

- **Lý do tồn tại:** đếm phép nhân của hai chiều và so sánh với sai phân hữu hạn.
- **Nhu cầu hoặc khoảng trống được lấp:** trả lời nhu cầu C01 bằng con số; chi phí $O(p)$ một mẫu là đầu vào của bảng chi phí E01.
- **Đầu vào:** C04; quy mô $d=784$, $m=100$.
- **Đầu ra:** truyền xuôi $78\,500$, truyền ngược $78\,600$ phép nhân; gradient đầy đủ $O(np)$; bộ nhớ $O(bm)$.
- **Vị trí trong khung:** nhận xét về chi phí (bước 3).
- **LLO/CLO:** CLO1, CLO4.
- **Bước hành trình:** KN4 ứng dụng.
- **Quyết định:** `thêm` — cần kết luận định lượng “chi phí lan truyền ngược cùng bậc truyền xuôi”.

### C06. Một bước hạ gradient trên mạng

- **Lý do tồn tại:** dùng chính gradient vừa tính cho một bước với hai độ dài bước.
- **Nhu cầu hoặc khoảng trống được lấp:** gradient chưa đủ để giảm mất mát: $\eta=0{,}02$ giảm, $\eta=0{,}25$ làm tăng; độ dài bước phải gắn với độ cong.
- **Đầu vào:** tham số C02; gradient C03.
- **Đầu ra:** $\ell$: $0{,}125\to0{,}0536$ với $\eta=0{,}02$; $\ell=\tfrac{2809}{2048}$ với $\eta=0{,}25$; câu hỏi về bước luôn giảm chuyển sang mạch D.
- **Vị trí trong khung:** nối bước 3 với bước 4 (bổ đề giảm).
- **LLO/CLO:** LLO12 (một phần); CLO1.
- **Bước hành trình:** KN4 ứng dụng; KN6 nhu cầu.
- **Quyết định:** `thêm` — ứng dụng phải dùng chính gradient vừa tính.

### C07. Lan truyền ngược khi một đơn vị không hoạt động

- **Lý do tồn tại:** trang kiểm tra riêng của mạch C trên mẫu có đơn vị ẩn bị chặn.
- **Nhu cầu hoặc khoảng trống được lấp:** đo khả năng áp thuật toán khi $\sigma'(z_1)=0$ và $x=0$, và khả năng nêu quy ước tại điểm gãy.
- **Đầu vào:** tham số C02; thuật toán C04.
- **Đầu ra:** đáp án (a)–(d); quan sát gradient bằng 0 cục bộ, dẫn sang D01.
- **Vị trí trong khung:** kiểm tra bước 3.
- **LLO/CLO:** CLO1.
- **Bước hành trình:** KN4 bài tập; KN5 nhu cầu.
- **Quyết định:** `thêm` — mỗi mạch có trang kiểm tra riêng.

### D01. Điểm dừng khi mục tiêu không lồi

- **Lý do tồn tại:** định nghĩa điểm dừng, điểm dừng $\varepsilon$-xấp xỉ và điểm yên ngựa, đối chiếu với trường hợp lồi.
- **Nhu cầu hoặc khoảng trống được lấp:** Bài 02, 04 dùng $\nabla F=0$ để chứng nhận cực tiểu toàn cục; với $F$ không lồi (B09) chiều suy ra này mất, cần tên cho những gì còn lại.
- **Đầu vào:** B09 (không lồi); C07 (gradient bằng 0 cục bộ); tiêu chí dừng $\lVert\nabla F\rVert\le\varepsilon$ (Bài 04).
- **Đầu ra:** định nghĩa; ba loại điểm dừng; tiêu chí dừng giữ nguyên nhưng đổi ý nghĩa.
- **Vị trí trong khung:** bước 4 (định nghĩa).
- **LLO/CLO:** LLO11; CLO1.
- **Bước hành trình:** KN5 nhu cầu + hình thức (định nghĩa); ngoại lệ thứ tự giải thích ở KN5.
- **Quyết định:** `thêm` — nhu cầu và tên gọi phải có trước phép phân loại.

### D02. Mạng tuyến tính một đơn vị: điểm yên ngựa và cực tiểu đối xứng

- **Lý do tồn tại:** cung cấp một hàm hai biến tính thủ công được, sinh từ mạng, có cả điểm yên ngựa và đường cực tiểu đối xứng.
- **Nhu cầu hoặc khoảng trống được lấp:** D01 chỉ đặt tên; cần ví dụ có trị riêng Hessian cụ thể gắn với mạng.
- **Đầu vào:** D01; mạng hai tầng B06 với $d=m=1$, $\sigma(z)=z$, không độ lệch.
- **Đầu ra:** $F(u,v)=\tfrac12(uv-1)^2$, $\nabla F$, $\nabla^2F$; gốc là điểm yên ngựa (trị riêng $\pm1$); $(1,1)$ có trị riêng $0$ và $2$; hàm dùng lại ở D03–D07.
- **Vị trí trong khung:** ví dụ cho bước 4; ứng dụng của Mệnh đề 3 cho mạng tuyến tính.
- **LLO/CLO:** LLO11.
- **Bước hành trình:** KN5 trực quan + ví dụ; KN3 ứng dụng.
- **Quyết định:** `thêm` — ví dụ hai chiều có trị riêng Hessian, gắn trực tiếp với mạng.

### D03. Phân loại điểm dừng bằng Hessian

- **Lý do tồn tại:** phát biểu điều kiện bậc hai và giới hạn của nó khi Hessian có trị riêng 0.
- **Nhu cầu hoặc khoảng trống được lấp:** D02 cho số; cần công cụ tổng quát, và cần biết công cụ không kết luận được tại $(1,1)$ dù đó là cực tiểu toàn cục.
- **Đầu vào:** D02; khai triển Taylor bậc hai (Bài 00).
- **Đầu ra:** mệnh đề (i)–(iii); nhận xét Hessian có $p^2$ phần tử nên không là quy tắc dừng thực hành.
- **Vị trí trong khung:** bước 4 (kết quả).
- **LLO/CLO:** LLO11; CLO1.
- **Bước hành trình:** KN5 hình thức; KN6 nhu cầu.
- **Quyết định:** `thêm` — tách công cụ phân loại khỏi ví dụ để mỗi trang một luận điểm.

### D04. Bổ đề giảm khi không lồi

- **Lý do tồn tại:** chỉ ra bổ đề giảm chỉ dùng tính trơn, nên vẫn cho giảm mỗi bước khi $F$ không lồi, và kiểm trên D02.
- **Nhu cầu hoặc khoảng trống được lấp:** C06 và D03 để lại câu hỏi bước nào bảo đảm giảm mà không cần Hessian.
- **Đầu vào:** bổ đề giảm (Bài 04; 05b); $F(u,v)$ trên $[0,1]^2$ với $L=2$.
- **Đầu ra:** bất đẳng thức giảm; số $0{,}0703\le0{,}1422$; nhận xét $L$ chỉ tồn tại trên vùng, và với ReLU không tồn tại trên vùng chứa điểm gãy; giải thích bước 0,25 ở C06 (dọc đoạn không có điểm gãy, hằng số Lipschitz trên đoạn lớn hơn 8).
- **Vị trí trong khung:** bước 4 (bổ đề giảm dưới H2).
- **LLO/CLO:** CLO1.
- **Bước hành trình:** KN6 trực quan + ví dụ + hình thức (bổ đề, nhắc lại).
- **Quyết định:** `thêm` — cần phát biểu rằng bổ đề giảm vẫn cho giảm mỗi bước khi không lồi.

### D05. Hội tụ của chuẩn gradient

- **Lý do tồn tại:** phát biểu lại T7 của 05b với nhãn, chứng minh một dòng và nêu rõ những điều không được khẳng định.
- **Nhu cầu hoặc khoảng trống được lấp:** biến giảm mỗi bước (D04) thành bảo đảm sau $K$ bước, tức câu trả lời của khối B2.
- **Đầu vào:** D04; T7 (05b, mạch F, trang F03); H0, H2.
- **Đầu ra:** $\min_{0\le k<K}\lVert\nabla F(\theta_k)\rVert^2\le2L\Delta_0/K$; danh sách điều không khẳng định; phạm vi trên mặt trang (hàm kích hoạt trơn hoặc mạng tuyến tính; với ReLU là định hướng); điểm xuất phát của T8 ở F04.
- **Vị trí trong khung:** bước 4 (T7), kết quả trung tâm của khối B2.
- **LLO/CLO:** CLO1.
- **Bước hành trình:** KN6 hình thức.
- **Quyết định:** `thêm` — cần dẫn T7 có nhãn và phát biểu lại, không chứng minh lại.

### D06. Bình nguyên gần điểm yên ngựa

- **Lý do tồn tại:** một dãy lặp tính được cho thấy điểm dừng xấp xỉ được T7 chứng nhận có thể nằm xa cực tiểu.
- **Nhu cầu hoặc khoảng trống được lấp:** D05 nêu T7 là bảo đảm về điểm dừng khi không lồi; cần một dãy cụ thể để thấy giới hạn của chứng nhận đó.
- **Đầu vào:** D02 với $\theta_0=(0{,}01;\,0{,}01)$, $\eta=\tfrac12$; T7 (D05); $L=2$ hợp lệ vì dãy ở trong $[0,1]^2$.
- **Đầu ra:** dòng bốn giá trị $F(\theta_k)$ tại $k=0,5,10,13$ và hình bình nguyên $k=0,\dots,15$; nhận xét với $\varepsilon^2=2\cdot10^{-4}$, $\theta_0$ đã là điểm dừng $\varepsilon$-xấp xỉ trong khi $F(\theta_0)\approx0{,}4999$, gần giá trị tại điểm yên ngựa.
- **Vị trí trong khung:** giới hạn áp dụng của bước 4.
- **LLO/CLO:** LLO11; CLO1.
- **Bước hành trình:** KN5 ứng dụng; KN6 ứng dụng.
- **Quyết định:** `thêm` — cần một phép tính chứng tỏ điểm dừng xấp xỉ không nhất thiết là cực tiểu.

### D07. Phân loại điểm dừng và số bước theo T7

- **Lý do tồn tại:** trang kiểm tra riêng của mạch D.
- **Nhu cầu hoặc khoảng trống được lấp:** đo khả năng phân loại điểm dừng và đọc cận T7 so với số bước thực tế.
- **Đầu vào:** D02–D06.
- **Đầu ra:** đáp án: điểm dừng là $(0,0)$ và mọi điểm $uv=1$; Hessian tại $(2,\tfrac12)$ có trị riêng $0$ và $4{,}25$; cận T7 cho $K=113$, thực tế $K=4$.
- **Vị trí trong khung:** kiểm tra bước 4; khép khối B2.
- **LLO/CLO:** LLO11; CLO1.
- **Bước hành trình:** KN5, KN6 bài tập.
- **Quyết định:** `thêm` — mỗi mạch có trang kiểm tra riêng.

### E01. Chi phí một bước của ba phương pháp ở ba quy mô

- **Lý do tồn tại:** đưa lý do tính toán của luận đề về số cụ thể ở ba quy mô.
- **Nhu cầu hoặc khoảng trống được lấp:** T7 cần $\nabla F(\theta_k)$ ở mỗi bước với chi phí $O(np)$ (C05); cần đo khi nào một bước như vậy vượt ngân sách.
- **Đầu vào:** C05 ($O(p)$ một mẫu); chi phí Newton $O(np^2+p^3)$ (Bài 04; Bài 05 khối A3); giới hạn (i) của A03.
- **Đầu ra:** bảng chi phí GD, Newton, SGD ở ba quy mô; nhận xét một lượt dữ liệu tốn $np$ cho cả GD và SGD.
- **Vị trí trong khung:** lý do tính toán; mở bước 5 (SGD).
- **LLO/CLO:** LLO11, LLO15 (chi phí Newton); CLO4.
- **Bước hành trình:** KN7 nhu cầu.
- **Quyết định:** `thêm` — luận đề yêu cầu chỉ ra SGD bị buộc bởi chi phí; ghi chú chỉ so chi phí một bước, phát biểu Newton theo Bài 05 CP05 (điểm hòa giải 2).

### E02. Rủi ro thực nghiệm như đại lượng thay thế

- **Lý do tồn tại:** nêu lại lý do thống kê với Định lý 05c.52 của 05c và số liệu RCV1 (SNW Bảng 13.3).
- **Nhu cầu hoặc khoảng trống được lấp:** E01 chỉ cho thấy gradient đầy đủ đắt; cần lý do để chấp nhận một ước lượng nhiễu thay cho cực tiểu chính xác.
- **Đầu vào:** Định lý 05c.52 (05c); Bài 05 khối A1, A2; SNW Bảng 13.3, tr. 363, chỉ các hàng mất mát bản lề (hinge loss) (SVMLight 23 642 s, SVMPerf 66 s, SGD 1,4 s); các hàng mất mát logistic thuộc Bài 05 KL02, ghi chú E02 dẫn tới KL02.
- **Đầu ra:** tại $\theta$ cố định, sai số $F-R$ cỡ $1/\sqrt n$; kết luận Bottou–Bousquet cho bài toán lồi (không đổi bậc của cận), không khẳng định “không cải thiện $R$”; phân tách sai số xấp xỉ, ước lượng, tối ưu (ghi chú); thí nghiệm RCV1 làm minh họa có nguồn.
- **Vị trí trong khung:** lý do thống kê; nhu cầu của F05, F06.
- **LLO/CLO:** LLO11; CLO1.
- **Bước hành trình:** KN7 nhu cầu; KN9 nhu cầu.
- **Quyết định:** `thêm` — luận đề yêu cầu lý do thứ hai được nêu lại với số liệu; tiêu đề viết thành cụm danh từ. Phân chia Bảng 13.3 với Bài 05 KL02 theo quyết định của điều phối viên: E02 giữ các hàng hinge, KL02 giữ các hàng logistic.

### E03. Gradient nhóm nhỏ trên dữ liệu bốn điểm

- **Lý do tồn tại:** ví dụ số đặt trước Định lý 05c.53: sáu nhóm hai mẫu cho sáu gradient khác nhau có trung bình bằng gradient đầy đủ, và một nhóm làm $F$ tăng.
- **Nhu cầu hoặc khoảng trống được lấp:** trước phát biểu về tính không chệch và phương sai, người học cần thấy gradient nhóm thay đổi theo nhóm.
- **Đầu vào:** E01–E02; mô hình tuyến tính có hệ số chặn $c$ (A04).
- **Đầu ra:** bảng sáu nhóm với $\widehat g$ và $F(\theta_1)$; kỳ vọng $\tfrac{503}{384}$ so với $\tfrac{133}{128}$ của bước đầy đủ; $\theta^*=(1,1)$.
- **Vị trí trong khung:** bước 5 (trực quan và ví dụ cho Định lý 05c.53).
- **LLO/CLO:** LLO12; CLO1.
- **Bước hành trình:** KN7 trực quan + ví dụ.
- **Quyết định:** `thêm` — cần một bước số trên dữ liệu nhỏ với $b=2$, đặt trước phát biểu hình thức.

### E04. Tính không chệch và phương sai của gradient nhóm

- **Lý do tồn tại:** phát biểu lại Định lý 05c.53 của 05c và kiểm trên E03.
- **Nhu cầu hoặc khoảng trống được lấp:** E03 cho thấy hiện tượng trên một ví dụ; cần phát biểu tổng quát với giả thiết chọn đều và hệ số không hoàn lại.
- **Đầu vào:** E03; Định lý 05c.53 (05c).
- **Đầu ra:** $\mathbb E\widehat g=\nabla F(\theta)$; $\mathbb E\lVert\widehat g-\nabla F(\theta)\rVert^2=\frac{\operatorname{tr}\Sigma(\theta)}{b}\cdot\frac{n-b}{n-1}$ khi chọn không hoàn lại; kiểm $\tfrac{59}{12}$; liên hệ M3 với H6, H6b.
- **Vị trí trong khung:** bước 5 (Định lý 05c.53).
- **LLO/CLO:** LLO12; CLO1.
- **Bước hành trình:** KN7 hình thức.
- **Quyết định:** `thêm` — dẫn 05c có nhãn, phát biểu lại, không chứng minh lại.

### E05. Thuật toán hạ gradient ngẫu nhiên nhóm nhỏ

- **Lý do tồn tại:** phát biểu thuật toán với đầu vào, đầu ra, quy tắc lưu tham số tốt nhất theo tập xác thực và chi phí.
- **Nhu cầu hoặc khoảng trống được lấp:** ghép ước lượng E04 với lan truyền ngược C04 thành một phương pháp chạy được.
- **Đầu vào:** E04; C04; tập xác thực (Bài 05 HQ05).
- **Đầu ra:** thuật toán SGD nhóm nhỏ; chi phí $O(bp)$ mỗi bước, $O(np)$ mỗi lượt; ghi chú về xáo trộn theo lượt và M3; nhận xét T8 bảo đảm cho dãy lặp, còn thuật toán trả về tham số tốt nhất theo tập xác thực.
- **Vị trí trong khung:** bước 5 (phương pháp).
- **LLO/CLO:** LLO12; CLO2.
- **Bước hành trình:** KN7 hình thức (thuật toán) + ứng dụng (chi phí mỗi lượt).
- **Quyết định:** `thêm` — thuật toán phải có đầu vào, đầu ra và chi phí.

### E06. Một bước SGD trên mạng XOR

- **Lý do tồn tại:** trang kiểm tra riêng của mạch E, chuyển giao lan truyền ngược sang SGD.
- **Nhu cầu hoặc khoảng trống được lấp:** đo khả năng tính gradient nhóm bằng lan truyền ngược và thực hiện một bước cập nhật trên mạng.
- **Đầu vào:** tham số C02; gradient mẫu $((1,1),0)$ từ C03; thuật toán E05.
- **Đầu ra:** đáp án: gradient mẫu $((1,0),1)$; $\widehat g$; $\theta^+$; mất mát nhóm $\tfrac{37}{16}\to1{,}9202$.
- **Vị trí trong khung:** kiểm tra bước 3 và bước 5.
- **LLO/CLO:** LLO12; CLO2.
- **Bước hành trình:** KN7 bài tập; KN4 bài tập chuyển giao.
- **Quyết định:** `thêm` — bài tập chuyển giao giữa lan truyền ngược và SGD.

### F01. Nhiễu của gradient nhóm tại nghiệm

- **Lý do tồn tại:** một hiện tượng tính được tạo nhu cầu cho các định lý tốc độ: tại $\theta^*$ gradient đầy đủ bằng 0 còn gradient nhóm thì không, và một bước từ $\theta^*$ làm $F$ tăng theo kỳ vọng.
- **Nhu cầu hoặc khoảng trống được lấp:** E05 cho thuật toán; cần biết dãy lặp hội tụ theo nghĩa nào và điều gì của tính giảm còn giữ được, bắt đầu từ việc bước hằng không dừng tại $\theta^*$.
- **Đầu vào:** dữ liệu E03 tại $\theta^*$; E04; hình dùng lại, đường dẫn gốc `img/lec-05b/vda-sgd-bound-vs-exact.svg` (dữ liệu Ví dụ A của 05b, ghi rõ trên chú thích; sao chép vào `img/lec-06/` ở giai đoạn dựng deck).
- **Đầu ra:** $\operatorname{tr}\Sigma(\theta^*)=\tfrac52$; $\mathbb E\lVert\widehat g\rVert^2=\tfrac56$; một bước dời trung bình bình phương $\tfrac5{96}$; $\mathbb EF(\theta_1)=\tfrac{69}{128}>\tfrac12$, phản ví dụ cho “giảm theo kỳ vọng”; lý do chuyển sang Ví dụ A.
- **Vị trí trong khung:** mở phần tốc độ của bước 5; giới hạn của tính giảm khi gradient có nhiễu.
- **LLO/CLO:** LLO12; CLO1.
- **Bước hành trình:** KN8 nhu cầu + trực quan + ví dụ.
- **Quyết định:** `thêm` — nhu cầu của định lý phải là hiện tượng tính được trên ví dụ đã có; sau kiểm định storyboard, trang mang phản ví dụ $\tfrac{69}{128}$ và nói rõ dữ liệu của hình.

### F02. Mức nhiễu nền của bước hằng

- **Lý do tồn tại:** phát biểu bất đẳng thức một bước có số hạng nhiễu và định lý T5 của 05b, kèm số của Ví dụ A.
- **Nhu cầu hoặc khoảng trống được lấp:** định lượng hiện tượng F01: điều còn giữ của tính giảm là bất đẳng thức có số hạng $\tfrac{L\eta^2}2\sigma^2$, và với lồi mạnh, bước hằng chỉ đưa kỳ vọng sai số về mức nhiễu nền.
- **Đầu vào:** F01; cận trên bậc hai và H6b; T5 (05b, phần SGD cho hàm lồi mạnh); Ví dụ A; hình tùy chọn `img/lec-05b/step-halving-schedule.svg` không dùng khi dựng deck.
- **Đầu ra:** $\mathbb E[F(\theta_{k+1})\mid\theta_k]\le F(\theta_k)-\eta(1-\tfrac{L\eta}2)\lVert\nabla F(\theta_k)\rVert^2+\tfrac{L\eta^2}2\sigma^2$, kiểm trên dữ liệu bốn điểm trong ghi chú ($0{,}547\ge\tfrac{69}{128}$ tại $\theta^*$; $1{,}3188\ge\tfrac{503}{384}$ tại $\theta_0$); mức nhiễu nền $\eta\sigma^2/\mu$; số $0{,}81^k+\tfrac8{57}(1-0{,}81^k)$ và cận $0{,}9^k+0{,}267$.
- **Vị trí trong khung:** bước 5 (bất đẳng thức một bước, T5).
- **LLO/CLO:** LLO12; CLO1.
- **Bước hành trình:** KN8 hình thức + ví dụ (đối chiếu cận với giá trị chính xác).
- **Quyết định:** `thêm` — tách từ F02 cũ theo kiểm định storyboard để mỗi trang một định lý; bất đẳng thức một bước thay cho khẳng định sai “giảm theo kỳ vọng”.

### F03. Bước giảm dần cho hàm lồi mạnh

- **Lý do tồn tại:** phát biểu lại T6 của 05b: bước $\tfrac1{\mu(k+1)}$ bỏ mức nhiễu nền với tốc độ $O(1/k)$.
- **Nhu cầu hoặc khoảng trống được lấp:** F02 để lại mức nhiễu nền không giảm theo $k$; cần lịch bước cho kỳ vọng sai số về 0, cho các bài toán lồi mạnh của Bài 05 sau chính quy hóa.
- **Đầu vào:** F02; T6 (05b, phần SGD cho hàm lồi mạnh); Ví dụ A.
- **Đầu ra:** $\mathbb E\lVert\theta_k-\theta^*\rVert^2\le\tfrac{G^2}{\mu^2k}$; giá trị chính xác $\tfrac8{3k}$ trên Ví dụ A, nhỏ hơn quỹ đạo bước hằng từ $k=16$; các lịch bước khác trong ghi chú.
- **Vị trí trong khung:** bước 5 (T6).
- **LLO/CLO:** LLO12; CLO1.
- **Bước hành trình:** KN8 hình thức + ví dụ.
- **Quyết định:** `thêm` — tách từ F02 cũ theo kiểm định storyboard; cần phát biểu lại tốc độ lồi mạnh $O(1/k)$ kèm giả thiết và hằng số.

### F04. Hạ gradient ngẫu nhiên cho hàm không lồi

- **Lý do tồn tại:** phát biểu lại T8 và hệ quả chọn bước, cùng phạm vi áp dụng cho mạng.
- **Nhu cầu hoặc khoảng trống được lấp:** mạng không thỏa H3 (B09, D02); cần bảo đảm thay cho T7 khi gradient đầy đủ được thay bằng gradient nhóm, và cần nói rõ bảo đảm đó áp dụng cho loại mạng nào.
- **Đầu vào:** T7 (D05); F02; T8 (05b, phần hạ gradient cho hàm không lồi); M1 và giới hạn về H2 với ReLU (outline.md, mục 4.3); hình tùy chọn `img/lec-05b/rates-log-error.svg` không dùng khi dựng deck.
- **Đầu ra:** cận $\frac{2\Delta_0}{\eta K}+L\eta\sigma^2$; $O(1/\sqrt K)$ cho trung bình kỳ vọng bình phương chuẩn gradient, $O(K^{-1/4})$ cho chuẩn (ghi chú); bảng $0{,}303$; $0{,}0285$; $0{,}00283$; phạm vi: hàm kích hoạt trơn hoặc mạng tuyến tính, với ReLU là định hướng; bảo đảm thuộc về dãy lặp, không thuộc tham số chọn theo tập xác thực.
- **Vị trí trong khung:** bước 5 (T8); bảo đảm có được của khối B3.
- **LLO/CLO:** LLO12; CLO1.
- **Bước hành trình:** KN8 hình thức.
- **Quyết định:** `thêm` — cần phát biểu lại tốc độ không lồi theo bình phương chuẩn gradient (điểm hòa giải 3), với giả thiết H2 trên tập chứa mọi dãy lặp và phạm vi ReLU trên mặt trang (kiểm định storyboard).

### F05. Tốc độ dưới ngân sách tính toán cố định

- **Lý do tồn tại:** điểm trung tâm của khối B3: đặt cận T7 và T8 vào cùng ngân sách số gradient mẫu.
- **Nhu cầu hoặc khoảng trống được lấp:** theo số bước, T8 chậm hơn T7; cần so trên cùng đơn vị chi phí để thấy SGD bị buộc bởi chi phí, và cần nói rõ luận điểm “đủ” dựa vào đâu.
- **Đầu vào:** E01, E02, D05, F04; $\sigma^2=\sigma_1^2/b$ (05c).
- **Đầu ra:** bảng hai quy mô với $\mathcal B=10n$ và cận hệ quả T8 đầy đủ; số hạng chính không phụ thuộc $b$; điểm chuyển cỡ $10^5$–$10^6$ (SNW Bảng 13.2, bậc độ lớn) làm chỉ báo bổ sung ở G03; phạm vi: $O(1/\sqrt K)$ trên $\lVert\nabla F\rVert^2$ là bảo đảm có được, luận điểm “đủ” dựa trên E02 (bài toán lồi) và tập xác thực (mạng), không dựa trên T8.
- **Vị trí trong khung:** so sánh dưới ngân sách cố định (bước 5); khép lý do tính toán.
- **LLO/CLO:** LLO11, LLO12; CLO1, CLO4.
- **Bước hành trình:** KN7 ứng dụng; KN8 ứng dụng; KN9 nhu cầu.
- **Quyết định:** `thêm` — luận đề yêu cầu trình bày SGD là phương án bị buộc bởi chi phí; sau kiểm định storyboard, dòng kết luận nêu phạm vi của luận điểm “đủ”.

### F06. Dừng sớm theo tập xác thực

- **Lý do tồn tại:** nêu quy tắc dừng sớm sau trực quan về đường mất mát huấn luyện và xác thực.
- **Nhu cầu hoặc khoảng trống được lấp:** E02 và F05 cho thấy không cần cực tiểu chính xác và mức đủ dùng phải được quyết định bằng dữ liệu; cần quy tắc vận hành xác định điểm dừng.
- **Đầu vào:** E02, F05; tập xác thực và tập kiểm thử của Bài 05 HQ05 (dẫn lại, không định nghĩa lại); quan sát số về dừng sớm ở Bài 05 KL01; quy tắc lưu tham số tốt nhất của E05; hình dùng lại, đường dẫn gốc `img/lec-06b/risk-curves.svg`.
- **Đầu ra:** quy tắc dừng (chu kỳ $s$, ngưỡng kiên nhẫn $r$, trả về tham số tốt nhất); nhận xét tham số trả về nhắm tới $R$, khác dãy lặp mà T8 bảo đảm.
- **Vị trí trong khung:** quy tắc dừng sớm (bước 5); khép lý do thống kê.
- **LLO/CLO:** LLO11; CLO1, CLO2.
- **Bước hành trình:** KN9 trực quan + hình thức (quy tắc).
- **Quyết định:** `thêm` — tách từ F05 cũ theo kiểm định storyboard; dừng sớm phải được trình bày là đánh giá trên dữ liệu xác thực, không phải thất bại hội tụ; dẫn tập xác thực của Bài 05 HQ05 (điểm hòa giải 5).

### F07. Dừng sớm và chính quy hóa $\ell_2$ trên mục tiêu bậc hai

- **Lý do tồn tại:** so sánh định lượng tỉ lệ giữ của dừng sớm và của chính quy hóa $\ell_2$ trên mục tiêu bậc hai.
- **Nhu cầu hoặc khoảng trống được lấp:** F06 cho quy tắc nhưng chưa giải thích vì sao dừng sớm tác động như chính quy hóa; luận đề cần quan hệ này để coi dừng sớm là một phần của phương pháp.
- **Đầu vào:** F06; chính quy hóa $\ell_2$ (Bài 05 khối A2); DL §7.8, (7.43)–(7.45); phân chia nguồn với Bài 05 KL01 (KL01 chỉ nêu quan sát số và tên DL §7.8; phép so sánh định lượng thuộc F07); hình mới `early-stopping-shrinkage.svg`.
- **Đầu ra:** bảng tỉ lệ giữ theo trị riêng $\alpha$ với $\eta=0{,}5$, $k=20$, $\lambda=0{,}1$; nhận xét $\lambda\approx1/(\eta k)$, khớp khi $\eta\alpha$ nhỏ và $\alpha$ nhỏ so với $\lambda$.
- **Vị trí trong khung:** quan hệ dừng sớm và chính quy hóa (bước 5).
- **LLO/CLO:** LLO11; CLO1, CLO2.
- **Bước hành trình:** KN9 ví dụ + hình thức (nhận xét) + ứng dụng.
- **Quyết định:** `thêm` — tách từ F05 cũ theo kiểm định storyboard để mỗi trang một luận điểm; trị riêng viết $\alpha$, hệ số chính quy hóa viết $\lambda$ như Bài 05.

### F08. Lịch bước, cận không lồi và dừng sớm

- **Lý do tồn tại:** trang kiểm tra riêng của mạch F.
- **Nhu cầu hoặc khoảng trống được lấp:** đo khả năng đọc và dùng T5, T6, hệ quả T8 và tỉ lệ giữ của dừng sớm.
- **Đầu vào:** F02, F03, F04, F07.
- **Đầu ra:** đáp án: so sánh hai lịch bước tại $k=10$ và $k=20$; $K=80\,400$; tỉ lệ giữ $0{,}6415$ và $0{,}5$.
- **Vị trí trong khung:** kiểm tra bước 5.
- **LLO/CLO:** LLO12; CLO1.
- **Bước hành trình:** KN8, KN9 bài tập.
- **Quyết định:** `thêm` — mỗi mạch có trang kiểm tra riêng (F06 trong bản 43 trang).

### G01. Điều không còn giữ được và điều còn giữ được

- **Lý do tồn tại:** khép luận đề ở dạng “mất gì, giữ gì” với nhãn kết quả, quay lại đúng bảng A03.
- **Nhu cầu hoặc khoảng trống được lấp:** bốn vấn đề nêu ở A03 cần câu trả lời có tham chiếu tới kết quả, không chỉ danh sách chủ đề.
- **Đầu vào:** A03; Mệnh đề 3, D01, D03, D04, F01, F02, T5, T6, T7, T8, Định lý 05c.52, 05c.53, F06.
- **Đầu ra:** bảng bốn dòng (cùng thứ tự với A03 và Bài 05 KL04) đối chiếu điều mất, điều kiện mất ((i) chi phí, (ii) biểu diễn) và điều còn giữ, nhãn kết quả ghi bằng tên kết quả, không bằng mã trang; dòng tính giảm nêu đúng: giảm mỗi bước với gradient đầy đủ, bất đẳng thức có số hạng nhiễu với SGD; dòng bảo đảm nêu điều kiện $F$ trơn và việc bảo đảm thuộc về dãy lặp; đầu vào của G02.
- **Vị trí trong khung:** tổng hợp và giới hạn áp dụng.
- **LLO/CLO:** LLO11; CLO1.
- **Bước hành trình:** tổng hợp, không thuộc cụm riêng.
- **Quyết định:** `thêm` — luận đề yêu cầu kết luận dạng “mất gì, giữ gì” có nhãn kết quả; tiêu đề theo Bài 05 KL04; dòng tính giảm sửa theo kiểm định storyboard.

### G02. Lựa chọn giữa hạ gradient đầy đủ, Newton và SGD

- **Lý do tồn tại:** biến các kết quả thành bảng quyết định có điều kiện áp dụng.
- **Nhu cầu hoặc khoảng trống được lấp:** CLO4 yêu cầu chọn thuật toán theo dạng bài toán; G01 chưa cho quy tắc chọn.
- **Đầu vào:** G01; E01, F05; Newton (Bài 04; Bài 05, phần độ cong và chi phí); T1, T2 (05b).
- **Đầu ra:** bảng năm tình huống theo $(n,p)$ và tính lồi, với dòng (2) ghi “lồi mạnh và trơn” cho tốc độ tuyến tính, dòng (4), (5) ghi điều kiện $F$ trơn và phạm vi ReLU; hằng số Hessian viết $m_H,M_H,L_H$ trong ghi chú.
- **Vị trí trong khung:** bước 6 của chuỗi (lựa chọn phương pháp).
- **LLO/CLO:** LLO15 (chi phí Newton), LLO12; CLO4.
- **Bước hành trình:** ứng dụng tổng hợp KN7, KN8, KN9.
- **Quyết định:** `thêm` — cần bảng quyết định theo $(n,p)$ và tính lồi; dòng Newton phát biểu theo Bài 05 CP05 (điểm hòa giải 2); câu hỏi vận dụng chuyển sang G03 theo kiểm định storyboard.

### G03. Tổng kết, câu hỏi tự kiểm tra và tài liệu đọc

- **Lý do tồn tại:** cấu trúc mặc định yêu cầu tổng kết theo mục tiêu, câu hỏi tự kiểm tra và tài liệu đọc; trang cũng nhận câu hỏi vận dụng bảng G02.
- **Nhu cầu hoặc khoảng trống được lấp:** đo khả năng dùng bảng G02 trên ba tình huống có đủ dữ kiện ($\kappa=10$, $\rho=10^{-6}$ ở tình huống hai), đối chiếu ba mục tiêu của A02 với kết quả và chỉ tài liệu đọc cho các phần được dẫn từ 05b, 05c.
- **Đầu vào:** A02, G01, G02; điểm chuyển cỡ $10^5$–$10^6$ từ ghi chú F05 (chỉ báo bổ sung).
- **Đầu ra:** đáp án ba tình huống; ba dòng tổng kết; bốn câu hỏi tự kiểm tra; danh mục đọc.
- **Vị trí trong khung:** khép bài.
- **LLO/CLO:** LLO11, LLO12, LLO15; CLO4.
- **Bước hành trình:** bài tập vận dụng tổng hợp KN7, KN8, KN9; bài tập tự kiểm.
- **Quyết định:** `thêm` — cấu trúc mặc định yêu cầu tổng kết, câu hỏi tự kiểm tra và tài liệu đọc; câu hỏi vận dụng chuyển từ G02 để mỗi trang một luận điểm.
