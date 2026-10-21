# Storyboard Bài 06 — Mở rộng mô hình và dữ liệu

## Phạm vi và cơ sở lý thuyết chung

Storyboard lập ngày 2026-10-11 theo thiết kế Lecture B của người dùng (*Scaling Models and Data*) và dàn bài [outline.md](outline.md). Bài gồm 73 trang trong 7 mạch từ 2026-10-22 (F02, F02b, F03 bỏ theo yêu cầu người dùng; 76 trang trước đó, sau khi F01c thêm theo yêu cầu người dùng cùng ngày; 75 trang từ 2026-10-21: A04b tách từ A04, A03b tách từ A03, yêu cầu người dùng; 73 trang từ đợt rà soát thuật ngữ 2026-10-12, D04b tách từ D04; 72 trang sau đợt sửa văn phong cùng ngày, 45 trang trước đó), nằm trong khoảng 5–7 mạch của AGENTS.md. Bản đầu có 43 trang; sau kiểm định storyboard cùng ngày, F02 và F05 cũ được tách, câu hỏi vận dụng của G02 chuyển sang G03, các mã F03, F04, F06 cũ đổi thành F04, F05, F08 (outline.md, mục 1.5). Thiết kế người dùng chỉ quy định ba khối B1–B3, mỗi khối 1 tiết, cùng ba câu hỏi trung tâm; không có trang mẫu. Vì bài được dựng mới, mọi trang có quyết định `thêm`. Storyboard của deck hiện hành (“Các phương pháp tối ưu trong học sâu”, 45 trang) được lưu tại `storyboard.old-2026-10-02.md`. Deck đã được dựng ngày 2026-10-12 và sửa sau vòng rà soát năm vai cùng ngày; mã trang chỉ dùng trong kế hoạch.

**Bài toán trung tâm.** Bài 05 kết thúc với hai giới hạn: mọi phương pháp của Bài 05 trả chi phí của toàn bộ $n$ mẫu ở mỗi bước, và dự đoán tuyến tính theo đặc trưng không biểu diễn được XOR. Khi mô hình phải có đặc trưng học được và dữ liệu lớn đến mức một gradient đầy đủ vượt ngân sách, bài xác định: (1) chi phí tính gradient theo tham số; (2) điều mà một phương pháp dựa trên gradient còn chứng nhận khi mục tiêu không lồi; (3) tốc độ hội tụ khi gradient được thay bằng ước lượng ngẫu nhiên, và lý do tốc độ đó đủ cho mục tiêu thay thế $F$ của rủi ro $R$.

**Luận đề (chỉ dẫn người dùng 2026-10-11).** Lý do tính toán: một gradient đầy đủ tốn $O(np)$, một bước Newton tốn $O(np^2+p^3)$; SGD nhóm nhỏ là phương pháp còn lại khi ngân sách mỗi bước cố định. Lý do thống kê: tại $\theta$ cố định, $F$ ước lượng $R$ với sai số bậc $1/\sqrt n$ (05c.52), và theo Bottou–Bousquet, với bài toán lồi, giảm sai số tối ưu dưới sai số ước lượng không làm thay đổi bậc của cận sai số vượt; vì vậy cực tiểu chính xác của $F$ không cần thiết và có thể không mong muốn, còn dừng sớm và chính quy hóa là một phần của phương pháp. A03 nêu luận đề, E01–E02 và F05 dùng lại, G01 khép lại ở dạng: mất tính chính xác, bảo đảm tất định, gradient đầy đủ; giữ tính giảm mỗi bước của hạ gradient đầy đủ, bất đẳng thức một bước của SGD có số hạng nhiễu $\tfrac{L\eta^2}2\sigma^2$ (SGD không giảm theo kỳ vọng ở mọi bước, phản ví dụ $\tfrac{69}{128}>\tfrac12$ ở F01), bảo đảm điểm dừng và tốc độ theo kỳ vọng của T8 (từ 2026-10-22, T5, T6 và mức nhiễu nền không còn trên deck). Phạm vi: cận $O(1/\sqrt K)$ của T8 là bảo đảm có được; luận điểm rằng nó đủ dựa trên ước lượng rủi ro kỳ vọng bằng rủi ro thực nghiệm (E02) cho bài toán lồi và trên tập xác thực (F06) cho mạng, không dựa trên T8.

**Đối tượng và ký hiệu chung** (outline.md, mục 4.2). Dữ liệu $(x_i,y_i)$, $x_i\in\mathbb R^d$; mạng hai tầng $f(x;\theta)=w_2^\top\sigma(W_1x+b_1)+b_2$, $\theta\in\mathbb R^p$, $p=md+2m+1$; mô hình tuyến tính $f(x;w,c)=w^\top x+c$, $p=d+1$; $\ell_i$, $F=\frac1n\sum_i\ell_i$, $R$; dãy lặp $\theta_k$; nhóm nhỏ $B_k$, kích thước nhóm $b$, gradient nhóm $\widehat g_k$. Bài 05 gộp hệ số chặn vào $w$; Bài 05b viết $x_k$, $f$, $N$; A04 ghi ánh xạ.

**Giả thiết.** Nhãn của Bài 05b: H0, H2, H3, H4, H6, H6a, H6b. Ba giả thiết cục bộ: M1 (mạng ReLU, quy ước tính toán $\sigma'(0)=0$), M2 (mất mát lồi theo $f$, mặc định bình phương), M3 (nhóm chọn đều, độc lập với lịch sử). H6b chỉ đúng trên vùng bị chặn chứa dãy lặp. H2 đúng trên vùng bị chặn cho mạng có hàm kích hoạt trơn (tanh, softplus) hoặc mạng tuyến tính (D02); với ReLU, $\nabla F$ gián đoạn tại điểm gãy nên H2 không đúng trên vùng nào chứa điểm gãy, và T7, T8 chỉ dùng làm định hướng (nêu trên mặt trang D05b, F04b, G01b, G02). Ký hiệu $\sigma$ ở mạch B–C là hàm kích hoạt, $\sigma^2$ ở mạch E–F là chặn phương sai.

**Chuỗi định nghĩa → kết quả → phương pháp.** (1) Tách được tuyến tính → Mệnh đề 1 (B02). (2) Mạng hai tầng (B06) → Mệnh đề 2 (B08) → Mệnh đề 3 (B09). (3) Thuật toán lan truyền ngược (C04) → chi phí cùng bậc truyền xuôi (C05). (4) Điểm dừng, điểm yên ngựa, điều kiện bậc hai (D01, D03) → bổ đề giảm (D04) → T7 (D05). (5) Định lý 05c.53 (E04) → SGD nhóm nhỏ (E05) → bất đẳng thức một bước có số hạng nhiễu (F01b, chứng minh F01c) và T8 (F04, F04b) (T5 ở F02, T6 ở F03: đã thay 2026-10-22) → so sánh dưới ngân sách cố định (F05) → dừng sớm (F06) và quan hệ với chính quy hóa $\ell_2$ (F07). (6) Lựa chọn phương pháp theo $(n,p)$ và tính lồi (G02).

**Giới hạn áp dụng.** Mọi bảo đảm là về điểm dừng hoặc kỳ vọng; SGD không giảm $F$ theo kỳ vọng ở mọi bước; T7, T8 cần $F$ trơn, chặn bình phương chuẩn gradient của dãy lặp, không chặn khoảng cách tới cực tiểu hay $R$ của tham số chọn theo tập xác thực; các cận là cận trên, có thể bi quan nhiều bậc (D07, F01–F02); tương đương dừng sớm và chính quy hóa $\ell_2$ chỉ đúng cho mục tiêu bậc hai và gần đúng khi $\eta\alpha$ nhỏ và $\alpha$ nhỏ so với $\lambda$ ($\alpha$ là trị riêng, $\lambda$ là hệ số chính quy hóa); bảng chi phí bỏ hằng số và song song phần cứng.

**Hình dùng lại (đường dẫn gốc).** `img/lec-05b/vda-sgd-bound-vs-exact.svg` (F02b từ 2026-10-12, trước đó F01; từ 2026-10-22 F02b bỏ, deck không còn dùng hình này; dữ liệu Ví dụ A, trên deck gọi là ví dụ ba quan sát), `img/lec-06b/risk-curves.svg` (F06). Theo quyết định Q4 của điều phối viên, hai tệp này đã được sao chép vào `img/lec-06/` khi dựng deck (2026-10-12), kèm dòng xuất xứ trong `review-log.md`; hai hình tùy chọn `step-halving-schedule.svg` (F02) và `rates-log-error.svg` (F04) không được dùng.

**Dựng deck (2026-10-12).** Deck `lecture-06-mo-rong-mo-hinh-va-du-lieu.html` dựng đủ 45 trang theo storyboard này, mã và tiêu đề không đổi. Điều chỉnh khi dựng (outline.md, mục 1.6): nhãn kết quả của Bài 05c theo số hiệu hiện hành (Định lý 05c.52, 05c.53, Mệnh đề 05c.56, Nhận xét 05c.58, 05c.59); điều kiện $\alpha\ll\lambda$ bổ sung cho F07, F08(c); vị trí hình ở B02, B05–B06, F02, F04, F05; bản hình cho màn hẹp ở B04, C02, C03, D06.

**Sửa sau vòng rà soát năm vai (2026-10-12).** A03 nêu trên mặt trang hai giới hạn của Bài 05, (i) chi phí và (ii) biểu diễn, cùng bốn vấn đề của bài; vấn đề (1) “biểu diễn XOR và hệ quả” là đầu vào của mạch B. Bảng của A03 và G01 có cùng bốn dòng, cùng thứ tự với Bài 05 KL04; G01 dùng hai nhãn điều kiện (i) chi phí, (ii) biểu diễn và câu chữ của KL04 hiện hành (T5 tới lân cận, $\mathbb E\lVert\theta_k-\theta^*\rVert^2$ có bậc $\eta\sigma^2/\mu$, T6 tới cực tiểu $O(1/k)$). B02 là nhắc lại Bài 05 (định nghĩa tách được tuyến tính, Mệnh đề 1); nội dung mới của trang là ví dụ bình phương nhỏ nhất. Bước ví dụ của quy tắc dừng sớm (KN9) là Bài 05, phần kết luận (KL01). F05 kết luận theo điều kiện $\mathcal B<(n-b)^2/2$; G02 dòng 5 dùng cùng điều kiện. E06 thêm câu 5 làm bài tập cho Định lý 05c.53 (KN7). Ghi chú gọi tên phần thay cho chữ cái mạch. Chi tiết trong review-log.md.

**Sửa theo nguyên tắc văn phong và mật độ (2026-10-12).** Theo mục “Văn phong và mật độ mặt trang chiếu” và “Trang tiêu đề mạch” của AGENTS.md (yêu cầu người dùng 2026-10-12, số đo MAT1101), deck tăng từ 45 lên 72 trang, vẫn 7 mạch. Thêm 6 trang tiêu đề mạch `B00`, `C00`, `D00`, `E00`, `F00`, `G00` (`id="mach-2"`…`mach-7"`; bìa A01 là trang tiêu đề của mạch 1), trang “Nội dung” `A02b` đánh số 1–7, và 20 trang tách để mọi trang về trần 60 âm tiết (trần 80 cho trang mục tiêu, nội dung, tổng kết, bảng so sánh): `B02b`, `B09b`, `B10b`, `C07b`, `D01b`, `D05b`, `D07b`, `E02b`, `E03b`, `E06b`, `E06c`, `F01b`, `F02b`, `F04b`, `F05b`, `F06b`, `F07b`, `F08b`, `G01b`, `G04`. Mã cũ giữ nguyên với trang mang nội dung cũ; trang mới mang hậu tố `b`/`c`. Lớp `.dense` đã gỡ khỏi mọi trang. Mã định lý T1–T8 và mã giả thiết H0–H6b không còn trên mặt trang lẫn ghi chú: kết quả được phát biểu bằng lời, kèm số hiệu một lần mỗi trang (Bổ đề 05b.6, Định lý 05b.36, 05b.39, 05b.41, 05b.43, Hệ quả 05b.44, Định lý 05c.52, 05c.53); “Ví dụ A” của 05b gọi là “ví dụ ba quan sát”. A04 thành trang “Ngữ cảnh” bốn dòng; bảng đối chiếu ký hiệu chuyển xuống ghi chú A04. Năm bài tập có lời giải trên mặt trang (B10b, C07b, D07b, E06b, F08b; E06c có lời giải dạng fragment), lời giải C07b và E06b–E06c trùng Bài 3 và Bài 7 của `materials/lec-06/exercises.md`. Ngoại lệ mật độ: A02b có 7 dòng (trang Nội dung phải liệt kê đủ 7 mạch); G02 có bảng 5 hàng × 5 cột (bộ đo đếm 8 dòng theo ô chữ), 78 âm tiết sau vòng tái kiểm (9 dòng theo bộ đo, gồm chú thích), dưới trần 80 của bảng so sánh. Bảng âm tiết trước/sau nằm ở từng mục dưới đây và trong review-log.md.

## Chức năng và ranh giới mạch

| Mạch | Trang tiêu đề | Khối | Chức năng | Đầu vào | Đầu ra và đóng góp vào bài toán trung tâm | Kiểm tra | Tiết LT + BT |
|---|---|---|---|---|---|---|---|
| A. Bài toán huấn luyện khi mô hình và dữ liệu lớn | A01 (bìa) | B1 (mở đầu) | Nhận hai giới hạn của Bài 05, nêu luận đề, cố định ký hiệu | Kết luận Bài 05: chi phí $O(nd)$, $O(nd^2+d^3)$; XOR; chính quy hóa $\ell_2$ | Ba câu hỏi của bài và khung ký hiệu | không | 0,12 + 0,00 |
| B. Biểu diễn phi tuyến và mạng hai tầng | B00 | B1 | Nhu cầu: dự đoán tuyến tính có giới hạn biểu diễn. Dựng mạng hai tầng và chỉ ra chi phí | Giới hạn (ii) của A03b | $f(x;\theta)$; $F(\theta)$ không lồi, nhiều cực tiểu đối xứng | B10, B10b | 0,55 + 0,33 |
| C. Lan truyền ngược trên đồ thị tính toán | C00 | B2 (phần 1) | Nhu cầu: tính $\nabla F(\theta)\in\mathbb R^p$ với chi phí cùng bậc truyền xuôi | $f$, $F$ của mạch B; quy tắc dây chuyền Bài 00 | Thuật toán, chi phí $O(p)$ một mẫu, một bước hạ gradient | C07, C07b | 0,36 + 0,14 |
| D. Điểm dừng và bảo đảm của gradient khi không lồi | D00 | B2 (phần 2) | Nhu cầu: xác định điều gradient bằng 0 hoặc gradient nhỏ chứng nhận khi $F$ không lồi | Gradient từ C; tính không lồi từ B | Phân loại điểm dừng; bổ đề giảm và T7: bảo đảm có được là điểm dừng xấp xỉ | D07, D07b | 0,32 + 0,18 |
| E. Gradient nhóm nhỏ và chi phí mỗi bước | E00 | B3 (phần 1) | Nhu cầu: một gradient đầy đủ vượt ngân sách và $F$ chỉ là đại lượng thay thế | T7 (D05); chi phí của C | Ước lượng không chệch, phương sai, thuật toán SGD, chi phí mỗi bước độc lập với $n$ | E06, E06b, E06c | 0,30 + 0,14 |
| F. Tốc độ hội tụ dưới nhiễu và dừng sớm | F00 | B3 (phần 2) | Nhu cầu: chặn chuẩn gradient của hạ gradient ngẫu nhiên sau $K$ bước và chọn thời điểm dừng (câu hỏi trung tâm, sửa 2026-10-22; trước: xác định tốc độ hội tụ khi gradient có nhiễu, phạm vi của bảo đảm và quy tắc dừng | SGD và phương sai của E | Bất đẳng thức một bước có nhiễu và chứng minh; T8 phát biểu lại với phạm vi; so sánh dưới ngân sách cố định; dừng sớm và quan hệ với chính quy hóa (T5, T6 bỏ 2026-10-22) | F08, F08b | 0,24 + 0,12 |
| G. Tổng hợp và lựa chọn phương pháp | G00 | B3 (kết luận) | Khép luận đề; chọn phương pháp theo chi phí một bước, giả thiết, bảo đảm hội tụ | Kết quả của B–F | Bảng quyết định có điều kiện áp dụng | G04 | 0,05 + 0,08 |

Tổng 2,00 tiết lý thuyết + 1,00 tiết bài tập; mỗi khối 1,00 tiết (outline.md, mục 5 và 7). Mỗi khối của thiết kế ứng với các mạch giữa: B1 là mạch B, B2 tách thành C và D, B3 tách thành E và F; không mạch nào gộp hai khối. Bốn ranh giới phải giữ rõ (từ 2026-10-12 mỗi ranh giới có trang tiêu đề mạch xen giữa): B10b→C01 chuyển từ mô hình sang cách tính gradient của nó; C07b→D01b chuyển từ “tính được” sang “chứng nhận được”; D07b→E01 giữ T7 nhưng thay giả thiết gradient đầy đủ bằng ngân sách cố định; E06c→F01 chuyển từ một bước sang tốc độ sau $K$ bước.

## Bản đồ hành trình khái niệm

Thứ tự chuẩn là nhu cầu → trực quan → ví dụ → hình thức/toán học → ứng dụng → bài tập; khi ví dụ dẫn nhập đứng cùng nhu cầu, chuỗi hợp lệ là nhu cầu + ví dụ dẫn nhập → trực quan → hình thức → ứng dụng → bài tập. Thời lượng cụm tính theo hợp các trang được tham chiếu (bảng thời lượng trong outline.md, mục 7); trang dùng chung giữa các cụm được tính ở mỗi cụm, nên tổng các cụm lớn hơn tổng toàn bài.

### KN1. Tách được tuyến tính và giới hạn của dự đoán tuyến tính

- **Sáu bước:** nhu cầu B01 (nhãn “Nhu cầu:” và ví dụ dẫn nhập XOR); trực quan B01 (bốn điểm), B02 (hai đường chéo có trung điểm chung); ví dụ B01 (ví dụ dẫn nhập: mô hình $f(x;w,c)$ với ngưỡng $\tfrac12$ trên bốn điểm) và B02b (hệ quả số, tách từ B02 ngày 2026-10-12: nghiệm bình phương nhỏ nhất affine $w=0$, $c=\tfrac12$, $F=\tfrac18$); hình thức B02 (nhắc lại Bài 05: định nghĩa tách được tuyến tính ở phần hồi quy logistic, Mệnh đề 1 ở phần kết luận; trang thêm đối chiếu $y_\pm=2y-1$, $g=f-\tfrac12$); ứng dụng B03 (đặc trưng $x_1x_2$, số đặc trưng $\binom{d+q}{q}$); bài tập B10(a), lời giải trên mặt trang B10b.
- **Đầu vào:** giới hạn (ii) của Bài 05; bình phương nhỏ nhất và hệ phương trình chuẩn (Bài 00, Bài 05 khối A1).
- **Sản phẩm học tập và LLO/CLO:** chứng minh XOR không tách được tuyến tính, tính nghiệm bình phương nhỏ nhất affine, khớp XOR bằng đặc trưng $x_1x_2$; CLO1, CLO2.
- **Ký hiệu, dữ kiện truyền tiếp:** bốn điểm $\{0,1\}^2$, nhãn $y=(0,1,1,0)$, $f(x;w,c)$, $g(x)=w^\top x+c$; đẳng thức $g(1,0)+g(0,1)=g(0,0)+g(1,1)$ đi thẳng từ bốn điểm vào chứng minh.
- **Gộp, rút gọn:** nhu cầu, ví dụ dẫn nhập và trực quan cùng B01 vì bốn điểm vừa là dữ liệu vừa là hình; ví dụ dẫn nhập làm cụ thể nhu cầu kiểm dự đoán tuyến tính trên một nhiệm vụ cụ thể. Bước ví dụ của KN1 do B01 đảm nhận (ví dụ dẫn nhập); B02b (tách từ B02 ngày 2026-10-12) là hệ quả số của Mệnh đề 1 trên cùng dữ liệu, kiểm tra thủ công trong ghi chú.
- **Câu nối:** mô hình tuyến tính thất bại trên bốn điểm → định nghĩa và chứng minh thất bại đó → sửa bằng đặc trưng thủ công, làm số chiều tăng.
- **Thời lượng cụm:** 0,18 tiết LT + 0,24 tiết BT (gồm B10 dùng chung).

### KN2. Mạng hai tầng (đặc trưng học được)

- **Sáu bước:** nhu cầu B03; trực quan B04; ví dụ B05 ($\theta_A$, bảng truyền xuôi); hình thức B06; ứng dụng B07 (huấn luyện mạng XOR là cực tiểu hóa $F$ trên $\mathbb R^9$); bài tập B10(b), (d), lời giải B10b. Trang tiêu đề B00 nêu nhu cầu của mạch (đặc trưng học được), không thay bước nhu cầu B03 của KN2.
- **Đầu vào:** KN1; chi phí theo số đặc trưng (Bài 05 khối A3).
- **Sản phẩm học tập và LLO/CLO:** dựng mạng biểu diễn XOR, tính truyền xuôi, đếm $p$; CLO2.
- **Ký hiệu, dữ kiện truyền tiếp:** $W_1,b_1,w_2,b_2,\sigma,z,h,p$; trọng số $\theta_A$ của B05 trở thành trường hợp $d=m=2$, $p=9$ của định nghĩa B06 và là điểm xuất phát của B08.
- **Gộp, rút gọn:** mỗi bước một trang; từ vòng tái kiểm 2026-10-12, B03 có dòng “Nhu cầu:” trên mặt trang (phép biến đổi đặc trưng có tham số, học từ dữ liệu); B03 dùng chung với KN1 vì ứng dụng của KN1 (chi phí đặc trưng thủ công) chính là nhu cầu của KN2.
- **Câu nối:** đặc trưng thủ công tốn số chiều → tầng ẩn tạo đặc trưng → trọng số tường minh → định nghĩa tổng quát → bài toán huấn luyện trên $\mathbb R^p$.
- **Thời lượng cụm:** 0,29 tiết LT + 0,26 tiết BT.

### KN3. Đối xứng hoán vị và tính không lồi

- **Sáu bước:** nhu cầu B07 (quy tắc hợp thành lồi không áp dụng); trực quan B08 (đổi chỗ hai đơn vị ẩn); ví dụ B08 ($\theta_B\neq\theta_A$, $F(\theta_B)=0$); hình thức B08 (Mệnh đề 2) và B09 (Mệnh đề 3); ứng dụng B09b (tách từ B09 ngày 2026-10-12; phép kiểm tra trung điểm trên XOR: $F(\theta(t))=t^2$ rồi $(1-t)^2$, $F(\theta(\tfrac12))=\tfrac14$) và D02 (đối xứng đổi dấu của mạng tuyến tính, trung điểm $F=\tfrac12$); bài tập B10(c), lời giải B10b.
- **Đầu vào:** KN2; tập cực tiểu của hàm lồi là tập lồi (Bài 01); quy tắc hợp thành lồi (Bài 02).
- **Sản phẩm học tập và LLO/CLO:** chỉ ra hai cực tiểu đối xứng và bác bỏ tính lồi bằng giá trị tại trung điểm; LLO11; CLO1.
- **Ký hiệu, dữ kiện truyền tiếp:** $\theta_A,\theta_B$, ma trận hoán vị $P$, đường $\theta(t)=(1-t)\theta_A+t\theta_B$.
- **Gộp, rút gọn:** B08 gộp trực quan, ví dụ và Mệnh đề 2; khi dựng deck, bảng $\theta_A$, $\theta_B$ đứng trước Mệnh đề 2 để phát biểu tổng quát hóa phép đổi chỗ vừa thấy. Trên B09b (tách từ B09 ngày 2026-10-12), phép tính $F(\theta(t))$ là ứng dụng của Mệnh đề 3 vào XOR; kế hoạch gốc ghi phép tính này là ví dụ, storyboard ghi là ứng dụng để thứ tự sáu bước không bị đảo.
- **Câu nối:** tham số vào phi tuyến → hai tham số khác nhau cho cùng một hàm → tập cực tiểu không lồi → $F$ không lồi; đặc trưng học được khắc phục giới hạn biểu diễn nhưng làm mất tính lồi, còn đặc trưng thủ công làm số chiều tăng.
- **Thời lượng cụm:** 0,25 tiết LT + 0,28 tiết BT.

### KN4. Lan truyền ngược

- **Sáu bước:** nhu cầu C00 (dòng dẫn của trang tiêu đề mạch) và C01 (ví dụ dẫn nhập: sai phân tốn khoảng $p^2$); trực quan C02 (đồ thị tính toán); ví dụ C02 (truyền xuôi) và C03 (truyền ngược, mọi đại lượng trung gian); hình thức C04; ứng dụng C05 (chi phí) và C06 (một bước hạ gradient); bài tập C07 với lời giải trên mặt trang C07b, E06–E06b (chuyển giao sang SGD).
- **Đầu vào:** KN2; quy tắc dây chuyền dạng Jacobian chuyển vị (Bài 00).
- **Sản phẩm học tập và LLO/CLO:** tính gradient một mẫu thủ công, đếm chi phí hai chiều; LLO11 (độ sâu đồ thị tính toán); CLO1, CLO4.
- **Ký hiệu, dữ kiện truyền tiếp:** tham số chung $W_1=\begin{psmallmatrix}1&\tfrac12\\\tfrac12&-1\end{psmallmatrix}$, $b_1=(-\tfrac12,1)$, $w_2=(1,-2)$, $b_2=\tfrac12$ dùng ở C02–C07 và E06; $e,\delta_h,\delta_z$; $\lVert\nabla\ell\rVert^2=\tfrac{69}{16}$ truyền sang C06.
- **Gộp, rút gọn:** trực quan và phần xuôi của ví dụ cùng C02 vì đồ thị chỉ có nghĩa khi gắn giá trị.
- **Câu nối:** sai phân tốn khoảng $p^2$ → lưu giá trị trung gian → nhân ngược đạo hàm cục bộ → quy tắc chung $\delta_{\text{trước}}=J^\top\delta_{\text{sau}}$ → chi phí $O(p)$ → một bước cho thấy độ dài bước phải gắn với độ cong.
- **Thời lượng cụm:** 0,36 tiết LT + 0,22 tiết BT.

### KN5. Điểm dừng, điểm yên ngựa và phân loại bậc hai

- **Sáu bước:** nhu cầu C07 (gradient bằng 0 cục bộ) và D00 (dòng dẫn); nhắc lại tên gọi và định nghĩa điểm dừng $\varepsilon$-xấp xỉ D01b (tách từ D01 ngày 2026-10-12; từ đợt rà soát thuật ngữ 2026-10-12 đứng trước D01); nhu cầu tiếp D01 (đối chiếu với trường hợp lồi, dùng các tên vừa nhắc lại); trực quan D02 (đường mức); ví dụ D02 (Hessian, trị riêng $\pm1$ tại gốc; $0$ và $2$ tại $(1,1)$); hình thức phần kết quả D03 (điều kiện bậc hai); ứng dụng D06 (bình nguyên gần điểm yên ngựa); bài tập D07(a), (b), lời giải D07b.
- **Thứ tự (vòng tái kiểm 2026-10-12):** D01b ghi “Nhắc lại (Bài 00):” cho điểm dừng và điểm yên ngựa (thuật ngữ đã học ở Bài 00, dùng ở Bài 02, 04) và “Định nghĩa.” chỉ cho điểm dừng $\varepsilon$-xấp xỉ, tức tên gọi cho điều mà tiêu chí dừng của Bài 04 kiểm tra. Vì vậy D01b không mở một khái niệm trọng tâm bằng định nghĩa; phần hình thức mang nội dung của cụm là điều kiện bậc hai ở D03, đứng sau trực quan và ví dụ D02. Không còn ngoại lệ thứ tự. Lựa chọn này thay cho phương án đưa D02 lên trước D01b, vì D02 cần tên “điểm yên ngựa” để gọi hiện tượng tại gốc.
- **Đầu vào:** KN3, KN4; khai triển Taylor bậc hai (Bài 00).
- **Sản phẩm học tập và LLO/CLO:** phân loại điểm dừng bằng trị riêng Hessian, nhận ra trường hợp phép kiểm tra không kết luận; LLO11; CLO1.
- **Ký hiệu, dữ kiện truyền tiếp:** $F(u,v)=\tfrac12(uv-1)^2$, các điểm $(0,0)$, $(1,1)$, $(2,\tfrac12)$; hàm này đi tiếp vào D04–D07.
- **Câu nối:** gradient bằng 0 không còn chứng nhận cực tiểu → tên cho các loại điểm dừng → một hàm hai biến có đủ ba hiện tượng → điều kiện bậc hai và giới hạn khi có trị riêng 0 → gradient nhỏ có thể xuất hiện xa cực tiểu.
- **Thời lượng cụm:** 0,21 tiết LT + 0,24 tiết BT.

### KN6. Bảo đảm chỉ dùng gradient (bổ đề giảm, T7)

- **Sáu bước:** nhu cầu C06 (bước 0,25 làm mất mát tăng) và D03 (Hessian có $p^2$ phần tử, không dùng được làm quy tắc dừng); trực quan D04b (parabol chặn trên của $\varphi(\eta)$); ví dụ D04b (bảo đảm giảm $0{,}0703\le$ giảm thực $0{,}1422$; tách từ D04 trong đợt rà soát thuật ngữ 2026-10-12) và D06; hình thức D04 (bổ đề giảm, nhắc lại, kèm định nghĩa gradient $L$-Lipschitz), D05 (định lý hội tụ chuẩn gradient, Định lý 05b.41) và D05b (phạm vi, tách từ D05 ngày 2026-10-12); ứng dụng D06; bài tập D07(c), (d), lời giải D07b.
- **Đầu vào:** bổ đề giảm (Bài 04; Bài 05b); T7 (Bài 05b, mạch F, trang F03).
- **Sản phẩm học tập và LLO/CLO:** áp bổ đề giảm trên một vùng, tính số bước theo T7, nêu điều T7 không khẳng định; CLO1.
- **Ký hiệu, dữ kiện truyền tiếp:** $L=2$ trên $[0,1]^2$, $\theta_0=(\tfrac12,\tfrac12)$, $\Delta_0=0{,}28125$, $\min_{k<K}\lVert\nabla F(\theta_k)\rVert^2$; các số này dùng lại ở D07(c).
- **Gộp, rút gọn:** từ 2026-10-12 D04 chỉ nhắc phát biểu bổ đề giảm và định nghĩa gradient $L$-Lipschitz, D04b mang trực quan và ví dụ; bổ đề đứng trước ví dụ vì là kết quả nhắc lại, không phải khái niệm mới. Bổ đề đã được chứng minh ở Bài 04 và 05b; trang chỉ nhắc phát biểu để kiểm trên D02, nên phần hình thức mới của cụm là T7 ở D05, đứng sau trực quan và ví dụ.
- **Câu nối:** bước nào luôn giảm → bổ đề giảm chỉ cần tính trơn → cộng theo $k$ thành T7 → điều T7 chứng nhận có thể là một điểm gần yên ngựa.
- **Thời lượng cụm:** 0,26 tiết LT + 0,17 tiết BT.

### KN7. Gradient nhóm nhỏ và SGD

- **Sáu bước:** nhu cầu E00 (dòng dẫn), E01 (chi phí ba quy mô), E02 ($F$ là đại lượng thay thế) và E02b (ví dụ RCV1, tách từ E02 ngày 2026-10-12); trực quan E03 (sáu mũi tên gradient nhóm quanh $\nabla F(\theta_0)$); ví dụ E03 và E03b (bảng sáu nhóm, tách từ E03 ngày 2026-10-12); hình thức E04 (Định lý 05c.53) và E05 (thuật toán); ứng dụng E05 (chi phí mỗi lượt), F05, G02; bài tập E06 (lời giải E06b) và E06c (phương sai nhóm ba mẫu, lời giải fragment).
- **Đầu vào:** KN4 (lan truyền ngược), KN6 (T7); Bài 05c (Định lý 05c.52, 05c.53).
- **Sản phẩm học tập và LLO/CLO:** tính gradient nhóm, kiểm tính không chệch và phương sai, thực hiện một bước SGD trên mạng; LLO12; CLO1, CLO2.
- **Ký hiệu, dữ kiện truyền tiếp:** $B_k$, $b$, $\widehat g_k$, $\operatorname{tr}\Sigma$; dữ liệu $x=(-1,0,1,2)$, $y=(1,0,1,4)$, mô hình $wx+c$ đi từ E03 sang E04 (kiểm $\tfrac{59}{12}$) và F01 (tại $\theta^*=(1,1)$).
- **Gộp, rút gọn:** trực quan và ví dụ cùng E03 vì hình vẽ đúng sáu vector của bảng.
- **Câu nối:** T7 cần gradient đầy đủ → gradient đầy đủ vượt ngân sách và không cần chính xác → gradient nhóm trên bốn điểm → không chệch, phương sai giảm theo $b$ → thuật toán chi phí $O(bp)$ mỗi bước.
- **Thời lượng cụm:** 0,38 tiết LT + 0,18 tiết BT.

### KN8. Tốc độ hội tụ dưới nhiễu

- **Sáu bước:** nhu cầu F00 (dòng dẫn) và F01; ví dụ F01 (dữ liệu E03 tại $\theta^*$: $\operatorname{tr}\Sigma(\theta^*)=\tfrac52$, $\mathbb EF(\theta_1)=\tfrac{69}{128}>\tfrac12$); trực quan F01 (dòng “Trực quan.”: dãy bước hằng dao động quanh $\theta^*$, không dừng tại đó); hình thức F01b (bất đẳng thức một bước có số hạng nhiễu) và chứng minh F01c (thêm 2026-10-22), F04 (Định lý 05b.43) và F04b (hệ quả chọn bước); ứng dụng và kiểm tra định lý F04b (ba giá trị của cận), F05, F05b; bài tập F08 câu 1 (bất đẳng thức một bước), câu 2 (hệ quả chọn bước), lời giải F08b. Từ 2026-10-22, F02 (Định lý 05b.36), F02b (ví dụ ba quan sát) và F03 (Định lý 05b.39) bỏ theo yêu cầu người dùng.
- **Đầu vào:** KN7; T8 của Bài 05b (T5, T6 bỏ khỏi deck 2026-10-22).
- **Sản phẩm học tập và LLO/CLO:** đọc và áp bất đẳng thức một bước và cận không lồi với đủ giả thiết và phạm vi, tính $K$ theo hệ quả T8; LLO12; CLO1.
- **Ký hiệu, dữ kiện truyền tiếp:** $\sigma^2$ (chặn phương sai, khác hàm kích hoạt $\sigma$ của mạch B–C), $O(1/\sqrt K)$ cho trung bình kỳ vọng bình phương chuẩn gradient. Số của F01 lấy từ dữ liệu E03. (Trước 2026-10-22: mức nhiễu nền $\eta\sigma^2/\mu$, $O(1/k)$ và ví dụ ba quan sát ở F02b, F03, F08 câu 1; đã bỏ.)
- **Gộp, rút gọn:** nhu cầu, ví dụ và trực quan cùng F01 vì hiện tượng thấy ngay từ một phép tính trên dữ liệu đã có. F01b, F04, F04b mỗi trang một kết quả; F01c là chứng minh của F01b.
- **Câu nối:** tại nghiệm gradient nhóm vẫn khác 0 và $F$ tăng theo kỳ vọng → điều còn giữ là bất đẳng thức một bước có số hạng nhiễu (chứng minh F01c) → không lồi và trơn: cộng theo $k$, T8 thay T7 → đặt hai cận vào cùng ngân sách.
- **Thời lượng cụm:** 0,18 tiết LT + 0,11 tiết BT (F01–F05, F08; trừ thời lượng F02, F02b, F03 ngày 2026-10-22).

### KN9. Dừng sớm theo tập xác thực

- **Sáu bước:** nhu cầu E02, F00 (dòng dẫn: thời điểm dừng), F05b; trực quan F06 (đường mất mát huấn luyện và xác thực, định tính); ví dụ của quy tắc dừng là Bài 05, mạch giới hạn của tối ưu tất định (KL01, KL01a; định nghĩa dừng sớm, sai số xác thực nhỏ nhất tại bước 79; bước kế thừa), ví dụ của nhận xét là F07 (bảng tỉ lệ giữ); hình thức F06b (thuật toán dừng sớm, tách từ F06 ngày 2026-10-12) và F07b (nhận xét DL (7.43)–(7.45), tách từ F07); ứng dụng F07b (dừng sớm tác động như chính quy hóa $\ell_2$) và G02; bài tập F08(c), lời giải F08b. Bước lưu tham số tốt nhất trong thuật toán E05 thuộc phần hình thức của KN7 (thuật toán), không phải bước ứng dụng của KN9; F06 giải thích bước đó sau nhu cầu và trực quan.
- **Thứ tự và lý do (cập nhật 2026-10-12):** dừng sớm theo tập xác thực: trực quan F06 (hình) đứng trước thuật toán F06b. Quan hệ với chính quy hóa $\ell_2$: ví dụ dẫn nhập F07 (bảng tỉ lệ giữ) → “Trực quan.” đầu F07b (cả hai giữ hướng có độ cong lớn, nén hướng có độ cong nhỏ) → “Nhận xét.” F07b (điều kiện $\lambda\approx1/(\eta k)$, $\eta\alpha\ll1$, $\alpha\ll\lambda$) → “Lưu ý:” phạm vi. Dừng sớm là một phần của phương pháp theo luận đề; cụm không có trang định nghĩa riêng vì tập xác thực và tập kiểm thử đã được định nghĩa ở Bài 05 HQ05a và Bài 05 KL01 đã có quan sát số trên dữ liệu khối A1 (điểm hòa giải 5).
- **Đầu vào:** Bài 05 (khối A1: khớp quá; khối A2: chính quy hóa $\ell_2$; HQ05a: tập xác thực; KL01: quan sát số); Định lý 05c.52 của 05c.
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
- **Sửa 2026-10-12 (văn phong và mật độ):** `sửa` — 31 → 31 âm tiết; gỡ `.dense`; ghi chú bỏ câu mô tả phụ đề và câu lấy bài làm chủ ngữ; mặt trang giữ nguyên.
- **Sửa vòng tái kiểm 2026-10-12:** ghi chú mở bằng đối tượng (“Hai giới hạn của các phương pháp ở Bài 05”), bỏ câu lấy bài làm chủ ngữ.
- **Sửa 2026-10-12 (rà soát thuật ngữ):** `sửa` — phụ đề “mạng nơ ron” → “mạng nơ-ron” (31 → 30 âm tiết theo bộ đếm vì gạch nối gộp hai token).

### A02. Mục tiêu học tập

- **Lý do tồn tại:** nêu ba mục tiêu đo được, mỗi mục tiêu ứng với một năng lực toán học của bài: chứng minh tính không lồi, tính gradient và phân loại điểm dừng, chọn phương pháp tối ưu (bản 2026-10-21; bản đồ mạch đã chuyển sang A02b từ 2026-10-12).
- **Nhu cầu hoặc khoảng trống được lấp:** người học cần biết ba sản phẩm học tập trước nội dung và tiêu chí đạt của từng sản phẩm: chứng minh rủi ro thực nghiệm của mạng XOR không lồi bằng phản ví dụ theo định nghĩa; tính gradient bằng lan truyền ngược và chỉ ra điểm có $\nabla F=0$ nhưng không là cực tiểu địa phương; chọn hạ gradient đầy đủ, Newton hay hạ gradient ngẫu nhiên theo chi phí, giả thiết, bảo đảm hội tụ.
- **Đầu vào:** A01; tiên quyết Bài 00 (dây chuyền), Bài 04 (bổ đề giảm), kết luận Bài 05.
- **Đầu ra:** ba mục tiêu mà G03 đối chiếu từng dòng; ánh xạ mục tiêu → mạch → bài tập đo (B10, C07, D07, E06, F08, G04 câu 1) trong ghi chú diễn giả.
- **Vị trí trong khung:** cấu trúc của bài toán trung tâm thành bốn vấn đề (A03).
- **LLO/CLO:** một phần LLO11, một phần LLO12, phần so sánh chi phí của LLO15 (phương pháp Newton; thêm 2026-10-21); CLO1, CLO2, CLO4.
- **Bước hành trình:** không áp dụng.
- **Quyết định:** `thêm` — cấu trúc mặc định yêu cầu mục tiêu đo được gắn LLO/CLO trước nội dung.
- **Sửa 2026-10-12 (văn phong và mật độ):** `tách` — 133 → 52 âm tiết; gỡ `.dense`; bản đồ năm mạch chuyển sang trang Nội dung A02b, câu “Vấn đề trung tâm” chuyển sang trang Ngữ cảnh A04; trang chỉ còn ba mục tiêu; ghi chú bỏ mã T7, T8, nêu LLO/CLO. Tiêu đề cũ: “Mục tiêu học tập và bản đồ bài”.
- **Sửa 2026-10-12 (rà soát thuật ngữ):** `sửa` — chỉ ghi chú: LLO/CLO viết đầy đủ ở lần đầu (chuẩn đầu ra bài học, chuẩn đầu ra học phần); “phép thử Hessian” → “phép kiểm tra bậc hai”. Mặt trang không đổi (52).
- **Sửa 2026-10-21 (mục tiêu theo năng lực toán học):** `sửa` — yêu cầu người dùng 2026-10-21; ba vòng sửa theo quyết định của master (review-log.md). Mặt trang cuối, câu thường, không in đậm như mục tiêu của Bài 01–05: (1) “Chứng minh rủi ro thực nghiệm của mạng XOR không lồi bằng phản ví dụ theo định nghĩa.”; (2) “Tính gradient bằng lan truyền ngược; chỉ ra điểm có $\nabla F=0$ nhưng không là cực tiểu địa phương.”; (3) “Chọn hạ gradient đầy đủ, Newton hay hạ gradient ngẫu nhiên theo chi phí, giả thiết, bảo đảm hội tụ.” Mật độ: 52 → 62 âm tiết (trần 80), 4 dòng (trần 6), mỗi dòng 7/18/17/20 âm tiết (trần 20), 0 công thức hiển thị. Ghi chú diễn giả viết lại: mục tiêu 1 ↔ mạch 2 (phản ví dụ = hai điểm, trung điểm, bất đẳng thức lồi bị vi phạm; hai cực tiểu đối xứng $\theta_A$, $\theta_B$ với $F=\tfrac14$ tại trung điểm ở B09b, $\tfrac{27}{32}$ ở B10 câu 3); mục tiêu 2 ↔ mạch 3, 4 (C07; D07 câu 1: gốc không là cực tiểu địa phương; câu 2: $(2,\tfrac12)$ là cực tiểu toàn cục, phép kiểm tra bậc hai không kết luận); mục tiêu 3 ↔ mạch 5, 6, G02 (chi phí, giả thiết, bảo đảm theo từng phương pháp; với SGD không lồi, $O(1/\sqrt K)$ là cho trung bình kỳ vọng bình phương chuẩn gradient) và G04 câu 1; câu LLO/CLO thêm phần so sánh chi phí của LLO15. Tên tiếng Anh của hạ gradient ngẫu nhiên nêu trong ghi chú; chữ viết tắt SGD vẫn giới thiệu ở E01.
- **Sửa 2026-10-22 (bỏ F02, F02b, F03):** `sửa` — chỉ ghi chú: mục tiêu 3 chỉ nêu bảo đảm không lồi của SGD (cận $O(1/\sqrt K)$ với bước hằng chọn theo $K$); bỏ câu về bảo đảm lồi mạnh.
- **Sửa 2026-10-22 (vòng 11, S11-11):** `sửa` — chỉ ghi chú: “Bài tập cuối mạch 5 và mạch 6 đo từng tiêu chí (chi phí một bước, bảo đảm hội tụ); câu 1 của câu hỏi tự kiểm tra đo lựa chọn; …”.

### A02b. Nội dung

- **Lý do tồn tại:** trang “Nội dung” bắt buộc theo AGENTS.md (cấu trúc mặc định, ý 3), liệt kê đánh số 1–7 mọi mạch với tên trùng trang tiêu đề mạch.
- **Nhu cầu hoặc khoảng trống được lấp:** trước đây bản đồ chỉ liệt kê năm mạch giữa (A02, nhãn A–E); người học cần số mạch khớp chỉ số ngang `#/N` và trang tiêu đề mạch.
- **Đầu vào:** A02 (mục tiêu); danh sách mạch của storyboard.
- **Đầu ra:** bảy tên mạch; ghi chú nêu vai trò từng phần và tài liệu đọc trước.
- **Vị trí trong khung:** ngoài chuỗi lập luận; cấu trúc của bài.
- **LLO/CLO:** chung, không đo riêng.
- **Bước hành trình:** không áp dụng.
- **Quyết định:** `thêm` — yêu cầu người dùng 2026-10-12; tách khỏi A02 vì AGENTS.md không cho gộp Nội dung với mục tiêu. Ngoại lệ: 7 dòng (trần 6) vì phải liệt kê đủ 7 mạch. Ngoại lệ tên: mục 1 mang tên mạch mở đầu “Bài toán huấn luyện khi mô hình và dữ liệu lớn”, còn trang tiêu đề của mạch này là bìa A01 mang tên bài; giữ vì “Mở đầu” không nêu nhiệm vụ của mạch. Mật độ: 61 âm tiết (trang mới, 2026-10-12).
- **Sửa vòng tái kiểm 2026-10-12:** ghi chú viết theo mục, không lấy “Phần …” làm chủ ngữ; ghi ngoại lệ tên mục 1.

### A04. Ngữ cảnh: dữ liệu, mô hình và rủi ro

- **Lý do tồn tại:** cố định đối tượng và ký hiệu chung trước khi phát biểu lại kết quả của 05b, 05c.
- **Nhu cầu hoặc khoảng trống được lấp:** 05b viết $x_k$, $f$, $N$; 05c viết $J$ và dùng $d$ cho số chiều tham số; Bài 05 gộp hệ số chặn vào $w$ và viết $w_k$. Không có ánh xạ, T5–T8, 05c.52, 05c.53 sẽ trùng chữ với dữ liệu $x_i$ và với kích thước nhóm $b$.
- **Đầu vào:** A02b (danh sách mạch); ký hiệu của Bài 05, 05b, 05c. (Bản trước 2026-10-21 ghi “bốn vấn đề của A03”; A04 đứng trước A03 từ 2026-10-12.)
- **Đầu ra (bản 2026-10-21, vòng 6):** dữ liệu $\{(x_i,y_i)\}_{i=1}^n$ (không đặt tên $D$: tên tập dữ liệu không dùng lại, còn $D=\lVert\theta_0-\theta^*\rVert$ ở F02), $f(x;\theta)$, $\theta\in\mathbb R^p$, vai trò của $d$ và $p$, $\ell_i$, $F$, $R$ và $P$; ánh xạ ký hiệu với Bài 05, 05b, 05c trong ghi chú. Dãy lặp $\theta_{k+1}=\theta_k-\eta_kg_k$, tập xác thực, quy ước $b$ và $\sigma$ chuyển sang A04b.
- **Vị trí trong khung:** đối tượng và ký hiệu chung.
- **LLO/CLO:** CLO1.
- **Bước hành trình:** nền cho mọi KN, không thuộc bước riêng.
- **Quyết định:** `thêm` — khung ký hiệu phải cố định trước khi dẫn định lý có ký hiệu khác; câu ánh xạ quy ước hệ số chặn của Bài 05 theo điểm hòa giải 1.
- **Sửa 2026-10-12 (văn phong và mật độ):** `sửa` — 74 → 29 âm tiết; gỡ `.dense`; thành trang Ngữ cảnh bốn dòng (ký hiệu, $F$ và $R$, dãy lặp, “Nhu cầu:”); khung “Đối chiếu ký hiệu” chuyển xuống ghi chú theo AGENTS.md mục Cấu trúc, ý 4; ghi chú bỏ mã H6b. Ghi chú bài giảng Bài 06 đã có mục ký hiệu nên không cần sửa học liệu. Tiêu đề cũ: “Bài toán huấn luyện và ký hiệu chung”.
- **Sửa vòng tái kiểm 2026-10-12:** ghi chú thêm ánh xạ $\tau^2$ (Bài 05) ↔ $\sigma^2$.
- **Sửa 2026-10-12 (rà soát thuật ngữ):** `sửa` — đứng ngay sau A02b (quyết định B3); thêm hai dòng “$F$: rủi ro thực nghiệm (empirical risk); $R$: rủi ro kỳ vọng (Bài 05).” (B4) và “Tập xác thực: mẫu tách riêng, không dùng tính gradient, dùng để ước lượng $R$.” (B5, phương án 1). 29 → 54 âm tiết, 6 dòng. Ghi chú: rủi ro kỳ vọng (expected risk), tập xác thực (validation set), độ chệch (bias) cho $b_1,b_2$, kích thước nhóm (batch size), nhóm nhỏ (minibatch).
- **Sửa 2026-10-21 (tách A04):** `tách` — yêu cầu người dùng 2026-10-21 (“tách làm hai, trình bày rõ ràng hơn”). A04 giữ dữ liệu $D=\{(x_i,y_i)\}_{i=1}^n$, mô hình $f(x;\theta)$, dòng “Lưu ý:” về $d$ (số chiều đầu vào) và $p$ (số tham số học được), hai công thức hiển thị $F$ (giữ $\ell_i$ vì E04, E05 dùng) và $R=\mathbb E_{(X,Y)\sim P}\ell$, mỗi công thức một dòng diễn giải; dãy lặp, tập xác thực và “Nhu cầu:” chuyển sang A04b. Ghi chú: rủi ro kỳ vọng (expected risk), vai trò của $d$ và $p$, mất mát bình phương, đối chiếu ký hiệu Bài 05/05b/05c. Mật độ: 53 âm tiết (trần 60), 6 dòng (trần 6), 2 công thức hiển thị, mỗi dòng ≤ 19 âm tiết. **Ngoại lệ:** trang Ngữ cảnh 6 dòng (AGENTS.md: tối đa bốn dòng) vì nội dung do người dùng chỉ định gồm hai công thức hiển thị, mỗi công thức kèm một dòng diễn giải; gộp hai dòng diễn giải sẽ vượt 20 âm tiết một dòng. Tiêu đề cũ: “Ngữ cảnh: bài toán huấn luyện”.
- **Sửa 2026-10-21 (vòng 5):** `sửa` — dòng $R$ thêm “(expected risk; Bài 05)”, tên tiếng Anh rời khỏi ghi chú; ghi chú mất mát logistic thêm “phản ví dụ trung điểm vẫn dùng được, dù không có cực tiểu khi không chính quy hóa”; dòng $F$ thành hai hàng `aligned` để không cắt ở khổ hẹp. Mật độ: 55 âm tiết (trần 60), 6 dòng, 2 công thức hiển thị.
- **Sửa 2026-10-21 (vòng 6):** `sửa` — “dữ liệu $D=\{(x_i,y_i)\}$” → “dữ liệu $\{(x_i,y_i)\}_{i=1}^n$”: tên $D$ không dùng lại, còn F02 dùng $D=\lVert\theta_0-\theta^*\rVert$ và $D^2$ trong cận. Mật độ: 55 âm tiết.

### A04b. Ngữ cảnh: bài toán huấn luyện và dãy lặp

- **Lý do tồn tại:** phát biểu bài toán huấn luyện và dạng chung của dãy lặp mà mọi phương pháp của bài là trường hợp riêng, sau khi A04 đã đặt tên $F$, $R$.
- **Nhu cầu hoặc khoảng trống được lấp:** trước 2026-10-21 dãy lặp, tập xác thực và dòng nhu cầu nằm chung trang với ký hiệu và rủi ro (6 dòng); người dùng yêu cầu tách để trình bày rõ hơn. Không có dạng chung $\theta_{k+1}=\theta_k-\eta_kg_k$, hạ gradient đầy đủ và hạ gradient ngẫu nhiên xuất hiện như hai thuật toán rời nhau.
- **Đầu vào:** $F$, $R$, $\theta\in\mathbb R^p$ của A04.
- **Đầu ra:** dãy lặp đóng khung (KaTeX `\boxed`, vì `lecture-style.css` không có lớp công thức trọng tâm cho Bài 06); $g_k$ là gradient đầy đủ hoặc ước lượng trên nhóm mẫu, $\eta_k>0$ là bước; tập xác thực; dòng “Nhu cầu:” dẫn A03. Ghi chú: hai lựa chọn của $g_k$, tập xác thực (validation set), quy ước chữ $b$ và $\sigma$, kích thước nhóm (batch size), nhóm nhỏ (minibatch).
- **Vị trí trong khung:** bài toán trung tâm và phương pháp chung.
- **LLO/CLO:** CLO1.
- **Bước hành trình:** nền cho mọi KN, không thuộc bước riêng.
- **Quyết định:** `tách` — từ A04, yêu cầu người dùng 2026-10-21. Mật độ: 51 âm tiết (trần 60), 5 dòng, 1 công thức hiển thị, mỗi dòng ≤ 14 âm tiết. **Ngoại lệ:** trang Ngữ cảnh 5 dòng (tối đa bốn) vì người dùng chỉ định cả năm thành phần (bài toán, dãy lặp, $g_k$, tập xác thực, nhu cầu).
- **Sửa 2026-10-21 (vòng 5):** `sửa` — dòng 1 thành “Huấn luyện: cực tiểu hóa $F$ trên $\mathbb R^p.$ Dãy lặp dạng chung:”. Mật độ: 49 âm tiết, 5 dòng, 1 công thức hiển thị.

### A03. Giả thiết lồi và hai giới hạn khi mở rộng quy mô

- **Lý do tồn tại:** nêu luận đề của người dùng lần đầu, ở dạng đối chiếu giữa bức tranh lồi của Bài 01–04 và bài toán quy mô lớn, kèm hai lý do; G01 quay lại cùng bảng.
- **Nhu cầu hoặc khoảng trống được lấp:** nếu hai lý do không được nêu sớm, SGD ở mạch E–F dễ bị hiểu là lựa chọn “nhanh hơn” và dừng sớm bị hiểu là thất bại hội tụ.
- **Đầu vào:** $F$, $R$, dãy lặp và tập xác thực của A04, A04b; hai giới hạn trong kết luận Bài 05: chi phí $O(nd)$ và $O(nd^2+d^3)$ đều quét toàn bộ $n$ mẫu; XOR không biểu diễn được bằng dự đoán tuyến tính; kết quả khối A1, A2 của Bài 05.
- **Đầu ra:** lý do tính toán; lý do thống kê kèm hệ quả “dừng sớm và chính quy hóa là một phần của phương pháp”; đối chiếu “giảm mỗi bước / bất đẳng thức giảm có số hạng nhiễu”; bốn vấn đề của bài (biểu diễn XOR và hệ quả, chi phí tính gradient, điều gradient chứng nhận khi không lồi, tốc độ hội tụ dưới nhiễu), mỗi vấn đề là nhu cầu của một phần; bảng có nhãn dòng Đích (lý do thống kê), Biểu diễn (giới hạn (ii)), Chi phí (lý do tính toán, giới hạn (i)).
- **Vị trí trong khung:** bài toán trung tâm và luận đề.
- **LLO/CLO:** LLO11; CLO1.
- **Bước hành trình:** nhu cầu của toàn bài, đứng trước KN1–KN9.
- **Quyết định:** `thêm` — chỉ dẫn người dùng 2026-10-11 yêu cầu nêu luận đề sớm theo dạng “mất gì, giữ gì”; ghi chú phát biểu Newton theo Bài 05 CP04 (Định lý 4, số bước của Newton), không viết “Newton không phụ thuộc $\kappa$” vô điều kiện (điểm hòa giải 2); sau kiểm định storyboard, mặt trang không khẳng định SGD giảm theo kỳ vọng, không dùng $p$ trước A04 và dùng nhãn “Vấn đề của bài” thay cho “Câu hỏi”.
- **Sửa 2026-10-12 (văn phong và mật độ):** `sửa` — 140 → 77 âm tiết; gỡ `.dense`; bảng ba cột có nhãn dòng Đích, Bảo đảm, Biểu diễn (ii), Chi phí (i); bỏ dòng “Vấn đề của bài” (nay là trang Nội dung) và câu dài về hai giới hạn; ô “SGD” đổi thành “theo kỳ vọng” vì SGD chưa được định nghĩa; ghi chú rút còn khoảng 255 âm tiết, bỏ đoạn Newton (đã có ở E01, G02). Ngoại lệ trần 60: bảng so sánh, trần 80.
- **Sửa 2026-10-12 (rà soát thuật ngữ):** `sửa` — đứng sau A04 (thứ tự A02b → A04 → A03, quyết định B3) để $F$, $R$ và tập xác thực có tên trước bảng; ô “Đích” thành “$F$ chỉ ước lượng $R$”, ô “Biểu diễn (ii)” thành “không lồi: chỉ chặn được $\lVert\nabla F\rVert$” (hai khái niệm chưa định nghĩa là đại lượng thay thế và điểm dừng xấp xỉ rời mặt trang); ghi chú thêm “đại lượng thay thế (surrogate)” và câu bảo đảm chỉ chặn chuẩn gradient. 75 → 67 âm tiết (trần 80, bảng so sánh).
- **Sửa 2026-10-21 (văn phong học thuật, tách A03b):** `tách` — yêu cầu người dùng 2026-10-21 (“điều chỉnh, ngôn ngữ học thuật không văn nói”). Tiêu đề cũ: “Giả thiết lồi của Bài 01–04 và hai giới hạn khi mở rộng quy mô”. Bảng bốn dòng “Khía cạnh | Bài toán nhỏ, lồi (Bài 01–04) | Mô hình và dữ liệu lớn” với nhãn dòng Mục tiêu (thay Đích), Gradient (dòng mới), Bảo đảm, Chi phí; dòng Biểu diễn (ii) cũ thành dòng Bảo đảm, hai giới hạn chuyển sang A03b. Tách vì bảng (≈ 63 âm tiết) cộng hai dòng giới hạn (40 âm tiết) vượt trần 80 của bảng so sánh. Ghi chú: một đoạn cho mỗi dòng (lý do thống kê, gradient có nhiễu, bảo đảm, lý do tính toán), khả năng tổng quát hóa (generalization). Mật độ: khoảng 63 âm tiết (trần 80, bảng so sánh), 0 công thức hiển thị. Lưu ý cho master: ô “thường chỉ điểm dừng xấp xỉ” và “nhóm nhỏ” dùng thuật ngữ được định nghĩa ở D01b và E, trái với quyết định sau kiểm định 2026-10-12 (không dùng khái niệm chưa định nghĩa trên mặt trang); giữ theo brief vòng 3 của master.
- **Sửa 2026-10-21 (vòng 5):** `sửa` — chỉ ghi chú: câu chuyển “Dòng Bảo đảm và dòng Chi phí là hệ quả của hai giới hạn của Bài 05, nêu riêng ở trang sau.” Liên kết A04b → A03 → A03b. Tiêu đề và thứ tự giữ theo thiết kế của người dùng (đề xuất đổi tiêu đề, thứ tự của tái kiểm mạch kể bị bác bỏ).
- **Sửa 2026-10-22 (bỏ F02, F02b, F03):** `sửa` — chỉ ghi chú: câu về bảo đảm lồi mạnh của gradient nhóm dẫn thẳng Định lý 05b.39 của Bài 05b, không còn ngụ ý deck trình bày kết quả đó.

### A03b. Hai giới hạn: biểu diễn và chi phí

- **Lý do tồn tại:** nêu riêng hai giới hạn của Bài 05 mà bảng A03 tóm lược, giữ nhãn (i) chi phí, (ii) biểu diễn mà B00, E01, G01, G01b dùng lại.
- **Nhu cầu hoặc khoảng trống được lấp:** bảng A03 so sánh bốn khía cạnh nhưng không nêu cơ chế của hai giới hạn: điều kiện bậc nhất chỉ đủ khi $F$ lồi, và chi phí một bước tỉ lệ với $n$.
- **Đầu vào:** bảng A03; điều kiện bậc nhất của hàm lồi (Bài 02, 04); chi phí $O(nd)$ của Bài 05.
- **Đầu ra:** “Nhắc lại:” với $F$ lồi, khả vi trên $\mathbb R^p$, điểm dừng là cực tiểu toàn cục, công thức hiển thị $\nabla F(\theta^*)=0\Longrightarrow\theta^*\in\arg\min F$; “Giới hạn (ii), biểu diễn: khi $F$ không lồi, kéo theo này không còn đúng.”; “Giới hạn (i), chi phí: một bước hạ gradient trên $n$ mẫu tốn $O(nd)$ với mô hình tuyến tính, $O(np)$ với mạng.” Nhãn “Giới hạn (i)”, “Giới hạn (ii)” như ghi chú A03b và E01. Ghi chú: hai giới hạn theo Bài 05, XOR chứng minh ở mạch 2, $O(p)$ của lan truyền ngược ở mạch 3; thứ tự xử lý (biểu diễn ở mạch 2–4, chi phí ở mạch 5–6).
- **Vị trí trong khung:** bài toán trung tâm; nhu cầu của mạch 2 và mạch 5.
- **LLO/CLO:** LLO11; CLO1.
- **Bước hành trình:** nhu cầu của toàn bài.
- **Quyết định:** `tách` — từ A03, yêu cầu người dùng 2026-10-21. Mật độ: 40 âm tiết (trần 60), 2 dòng, mỗi dòng 20 âm tiết (bản đầu).
- **Sửa 2026-10-21 (yêu cầu sửa của master, theo bản phác của người dùng):** `sửa` — bỏ ngoặc cuối “(ii, biểu diễn)”, “(i, chi phí)”; bố cục bốn dòng: “Nhắc lại:”, công thức hiển thị, dòng “Giới hạn (ii), biểu diễn: …”, dòng “Giới hạn (i), chi phí: …”. Phần “là cực tiểu toàn cục” đặt ngoài KaTeX (chữ Việt trong `\text{}` gây cảnh báo KaTeX về ký tự Unicode), công thức viết $\theta^*\in\arg\min_{\theta\in\mathbb R^p}F(\theta)$; “mạng $p$ tham số” rút thành “mạng” để dòng chi phí ≤ 20 âm tiết ($p$ đã định nghĩa ở A04; ghi chú nêu lại). Mật độ: 47 âm tiết, 4 dòng (14/–/14/19), 1 công thức hiển thị; mỗi đoạn ≤ 2 dòng hiển thị ở 1600×900.
- **Sửa 2026-10-21 (vòng 5, tái kiểm toán học và mạch kể):** `sửa` — giới hạn (ii) là “dự đoán tuyến tính theo đặc trưng cố định không biểu diễn được XOR”; tính không lồi là hệ quả của cách khắc phục. Mặt trang: “Nhắc lại: với $F$ lồi, khả vi, điểm dừng là cực tiểu toàn cục:”; công thức $\nabla F(\theta^*)=0\Longrightarrow\theta^*\in\arg\min F$; “Giới hạn (ii), biểu diễn: dự đoán tuyến tính theo đặc trưng cố định không biểu diễn được XOR.”; “Đặc trưng học được khắc phục nhưng làm $F$ không lồi; kéo theo trên mất bảo đảm.”; “Giới hạn (i), chi phí: một bước hạ gradient trên $n$ mẫu tốn $O(np).$” Rút gọn so với brief để giữ trần 60: bỏ “trên $\mathbb R^p$” ở dòng nhắc lại, bỏ “điều này”, “không còn được bảo đảm” → “mất bảo đảm”, dòng chi phí viết chung $O(np)$ (với mô hình tuyến tính $p=d+1$; ghi chú nêu $O(nd)$). Ghi chú: nhận bảng A03; (ii) nêu trước (i) vì mạch 2–4 xử lý trước; tính không lồi là hệ quả của cách khắc phục. Liên kết A03 → A03b → B00. Mật độ: 60 âm tiết (trần 60), 5 dòng, 1 công thức hiển thị, mỗi dòng ≤ 19.
- **Sửa 2026-10-21 (vòng 6):** `sửa` — giới hạn (ii) nói về đầu vào gốc, vì B03 cho thấy đặc trưng thủ công biểu diễn được XOR: “Giới hạn (ii), biểu diễn: dự đoán tuyến tính theo đầu vào gốc không biểu diễn được XOR.”; “Mô hình phi tuyến theo $\theta$ khắc phục được nhưng làm $F$ không lồi; kéo theo trên không còn được bảo đảm.”; dòng nhắc lại rút thành “với $F$ lồi, khả vi:”. Ghi chú: đặc trưng thủ công giữ mô hình tuyến tính theo $\theta$, $F$ vẫn lồi; tính không lồi đến từ mô hình phi tuyến theo $\theta$. Mật độ: 56 âm tiết (trần 60), 5 dòng (6/–/18/20/12), 1 công thức hiển thị.

### B00. Biểu diễn phi tuyến và mạng hai tầng (trang tiêu đề mạch)

- **Lý do tồn tại:** trang tiêu đề mạch bắt buộc (yêu cầu người dùng 2026-10-12); đánh dấu ranh giới A04 → B01, từ khung ký hiệu sang giới hạn biểu diễn.
- **Nhu cầu hoặc khoảng trống được lấp:** người học cần biết mạch mới xử lý giới hạn (ii) trước khi gặp bài toán XOR.
- **Đầu vào:** giới hạn (ii) của A03; ký hiệu A04.
- **Đầu ra:** nhiệm vụ “biểu diễn XOR bằng đặc trưng học được” cho B01–B10b.
- **Vị trí trong khung:** điểm vào mạch 2; dòng dẫn nêu nhu cầu của KN2 (đặc trưng học được), không phải của KN1, nên ghi “ngoài hành trình khái niệm”.
- **LLO/CLO:** không đo trực tiếp; hỗ trợ mục tiêu 1 của A02.
- **Bước hành trình:** ngoài hành trình khái niệm.
- **Quyết định:** `thêm` — theo yêu cầu người dùng; không xử lý bằng sửa B01 vì B01 mang nhu cầu và ví dụ dẫn nhập của KN1. Mật độ: 37 âm tiết (trang mới, 2026-10-12).
- **Sửa vòng tái kiểm 2026-10-12:** ghi chú mở bằng kết quả kế thừa.
- **Sửa 2026-10-12 (rà soát thuật ngữ):** `sửa` — ghi chú “một lớp ẩn” → “một tầng ẩn”.

### B01. Bài toán XOR

- **Lý do tồn tại:** cung cấp một dữ liệu tính thủ công được cho nhu cầu của mạch B, trước mọi định nghĩa.
- **Nhu cầu hoặc khoảng trống được lấp:** giới hạn (ii) ở A03 mới là một phát biểu; người học cần một nhiệm vụ cụ thể để kiểm.
- **Đầu vào:** giới hạn (ii) của A03; ký hiệu A04.
- **Đầu ra:** bốn điểm, nhãn $\{0,1\}$, mô hình $f(x;w,c)$, ngưỡng $\tfrac12$; mất mát bình phương được nêu là lựa chọn để tính thủ công.
- **Vị trí trong khung:** mở bước 1 của chuỗi (tách được tuyến tính → Mệnh đề 1).
- **LLO/CLO:** CLO2.
- **Bước hành trình:** KN1 nhu cầu + ví dụ dẫn nhập + trực quan.
- **Quyết định:** `thêm` — cần một dữ liệu tính thủ công được trước định nghĩa; nêu nhãn $\{0,1\}$ và mất mát bình phương là lựa chọn để tính thủ công, ghi chú nối với nhãn $\pm1$ của Bài 05 KL03 (điểm hòa giải 4). Từ 2026-10-15 deck Bài 05 không còn trang XOR (KL03a bỏ, KL03 nêu ba điểm $-,+,-$); ghi chú B01 dẫn Mệnh đề 05.40 của ghi chú bài giảng.
- **Sửa 2026-10-12 (văn phong và mật độ):** `sửa` — 31 → 27 âm tiết; gỡ `.dense`; panel “Ví dụ dẫn nhập.” (nhãn không trong danh sách) thay bằng dòng “Nhu cầu:” đầu trang; điều kiện ngưỡng chuyển xuống dưới hình.

### B02. Tính không tách được tuyến tính của XOR

- **Lý do tồn tại:** chứng minh trên trang rằng không hàm affine nào phân lớp đúng bốn điểm, kèm nghiệm bình phương nhỏ nhất là hằng $\tfrac12$.
- **Nhu cầu hoặc khoảng trống được lấp:** B01 chỉ đặt nhiệm vụ; giới hạn (ii) cần trở thành một mệnh đề có chứng minh.
- **Đầu vào:** dữ liệu B01; bình phương nhỏ nhất (Bài 00, Bài 05 khối A1).
- **Đầu ra:** Định nghĩa tách được tuyến tính; Mệnh đề 1; nghiệm $w=0$, $c=\tfrac12$, $F=\tfrac18$.
- **Vị trí trong khung:** bước 1 của chuỗi.
- **LLO/CLO:** CLO1.
- **Bước hành trình:** KN1 trực quan (hai đường chéo) + ví dụ (hệ quả bình phương nhỏ nhất) + hình thức.
- **Quyết định:** `thêm` — chứng minh ngắn đủ đặt trên trang; tiêu đề viết thành cụm danh từ thay cho mệnh đề “XOR không tách được tuyến tính”.
- **Sửa 2026-10-12 (văn phong và mật độ):** `tách` — 70 → 42 âm tiết; gỡ `.dense`; ví dụ bình phương nhỏ nhất chuyển sang B02b theo mẫu trang ví dụ; nhãn “Nhắc lại (Bài 05):”; câu nối $g=f-\tfrac12$ chuyển xuống ghi chú.
- **Sửa 2026-10-12 (rà soát thuật ngữ):** `sửa` — ghi chú: “biên $y_ix_i^Tw>0$” → “biên có dấu (signed margin, còn gọi là lề có dấu)” (quyết định liên bài 1).

### B02b. Ví dụ: bình phương nhỏ nhất trên dữ liệu XOR

- **Lý do tồn tại:** tách ví dụ bình phương nhỏ nhất khỏi trang mệnh đề để mỗi trang một luận điểm (AGENTS.md, trang phát biểu kết quả không kèm ví dụ).
- **Nhu cầu hoặc khoảng trống được lấp:** Mệnh đề 1 nói không hàm affine nào phân lớp đúng; người học cần thấy mô hình affine tốt nhất theo bình phương nhỏ nhất làm gì trên bốn điểm.
- **Đầu vào:** Mệnh đề 1 (B02); hệ phương trình chuẩn (Bài 00).
- **Đầu ra:** $A^\top A$, $A^\top y$, nghiệm $w=0$, $c=\tfrac12$, $F=\tfrac18$; diễn giải “cùng một dự đoán cho mọi đầu vào”.
- **Vị trí trong khung:** bước 1 của chuỗi (ví dụ số của Mệnh đề 1).
- **LLO/CLO:** CLO1, CLO2.
- **Bước hành trình:** KN1 ví dụ.
- **Quyết định:** `tách` từ B02 (70 âm tiết trước khi sửa); dữ kiện và thứ tự ví dụ không đổi so với ghi chú bài giảng. Mật độ: 46 âm tiết (trang mới, 2026-10-12).

### B03. Đặc trưng thủ công và chi phí theo số chiều

- **Lý do tồn tại:** cho thấy đặc trưng $x_1x_2$ sửa được XOR và đo chi phí của cách sửa này theo $\binom{d+q}{q}$.
- **Nhu cầu hoặc khoảng trống được lấp:** sau Mệnh đề 1, cách sửa trực tiếp là đổi không gian đặc trưng; cần chi phí của cách sửa để có lý do chuyển sang đặc trưng học được.
- **Đầu vào:** Mệnh đề 1; chi phí mỗi bước theo số đặc trưng (Bài 05 khối A3); hệ quả thống kê khi $d$ tăng (khối A1).
- **Đầu ra:** $f=x_1+x_2-2x_1x_2$; bảng số đơn thức; nhận xét đặc trưng thủ công đòi hỏi biết trước dạng tương tác.
- **Vị trí trong khung:** ứng dụng bước 1; nhu cầu của bước 2.
- **LLO/CLO:** CLO2, CLO4.
- **Bước hành trình:** KN1 ứng dụng; KN2 nhu cầu.
- **Quyết định:** `thêm` — nối chi phí của đặc trưng thủ công với khối A1, A3 của Bài 05.
- **Sửa 2026-10-12 (văn phong và mật độ):** `sửa` — 54 → 33 âm tiết; gỡ `.dense`; bỏ mệnh đề diễn giải dài ở dòng đầu và dòng cuối (chuyển xuống ghi chú).
- **Sửa vòng tái kiểm 2026-10-12:** thêm dòng “Nhu cầu:” (bước nhu cầu của KN2 trên mặt trang); 51 âm tiết.
- **Sửa 2026-10-12 (rà soát thuật ngữ):** `sửa` — ghi chú “cỡ $p^3$” → “khoảng $p^3$” (quyết định liên bài 8).
- **Sửa 2026-10-21 (nhận xét về đặc trưng thủ công):** `sửa` — yêu cầu người dùng 2026-10-21. Thêm “**Nhận xét.** Đặc trưng thủ công khắc phục giới hạn biểu diễn nhưng làm $p$ tăng nhanh, tăng chi phí và nguy cơ quá khớp (overfitting).” sau dòng chi phí, trước “Nhu cầu:”; đây là lần đầu “quá khớp” xuất hiện trong deck nên tên tiếng Anh đặt trên mặt trang. Dòng chi phí rút thành “Mỗi bước: $O(np)$ (hạ gradient), $O(np^2+p^3)$ (Newton, Bài 05).” với $p=\binom{d+q}{q}$ là số đặc trưng, theo quy ước $d$/$p$ mới của A04; dòng số đơn thức viết lại “Số đặc trưng (đơn thức bậc $\le q$ của $d$ biến): $p=\binom{d+q}{q}$”. Dòng ví dụ $\varphi(x)=(x_1,x_2,x_1x_2)$ chuyển xuống ghi chú để giữ trần 60. Ghi chú: thêm đoạn hai loại chi phí (tính toán: $np$, $p^3$; thống kê: quá khớp, Bài 05 phần hồi quy nhiều chiều). Mật độ: 51 → 59 âm tiết (trần 60; vòng sửa của master 2026-10-21: “kéo theo chi phí” → “tăng chi phí”), 4 dòng chữ và một bảng, vừa khung 1600×900 (chiều cao nội dung 673/675 px). **Ngoại lệ:** câu nhận xét 25 âm tiết, hai dòng hiển thị (trần 20 một dòng) vì nội dung người dùng yêu cầu gồm cả giới hạn biểu diễn, số chiều và hai loại chi phí trong một câu.
- **Sửa 2026-10-21 (vòng 5):** `sửa` — dòng đầu “Số tham số (đơn thức bậc $\le q$ của $d$ biến): $p=\binom{d+q}{q}$”, bỏ dấu hai chấm thứ hai. Quy ước đếm: $\binom{d+q}{q}$ đếm mọi đơn thức bậc không quá $q$, kể cả đơn thức hằng $1$, nên $p$ là số tham số tính cả hệ số chặn (ghi chú nêu; viết “kể cả hằng số $1$” trên mặt trang làm mặt trang 63 âm tiết, vượt trần). Mật độ: 59 âm tiết.
- **Sửa 2026-10-21 (vòng 6):** `sửa` — chỉ ghi chú: “số đặc trưng là $p=501\,501$” → “số tham số là $p=501\,501$”; “khi số đặc trưng tăng với $n$ cố định” → “khi số tham số $p$ tăng với $n$ cố định”. Mặt trang không đổi (59).

### B04. Phép biến đổi đặc trưng bằng tầng ẩn

- **Lý do tồn tại:** trực quan cho đặc trưng học được: hai đơn vị ReLU đưa XOR sang không gian $h$ nơi hai lớp tách được tuyến tính.
- **Nhu cầu hoặc khoảng trống được lấp:** định nghĩa mạng ở B06 cần một hình ảnh về việc tầng ẩn làm gì với dữ liệu.
- **Đầu vào:** nhu cầu ở B03; bốn điểm B01.
- **Đầu ra:** ánh xạ $x\mapsto h$; đường $h_1+h_2=\tfrac12$; hai điểm lớp 0 bị gộp vào một điểm.
- **Vị trí trong khung:** bước 2 (trực quan).
- **LLO/CLO:** CLO2.
- **Bước hành trình:** KN2 trực quan.
- **Quyết định:** `thêm` — trực quan phải đứng trước định nghĩa mạng.
- **Sửa 2026-10-12 (văn phong và mật độ):** `giữ` — 11 → 11 âm tiết; gỡ `.dense`; nội dung giữ nguyên.
- **Sửa 2026-10-12 (rà soát thuật ngữ):** `sửa` — tiêu đề “Lớp ẩn …” → “Tầng ẩn như một phép biến đổi đặc trưng” (“lớp” dành cho lớp nhãn); ghi chú thêm “tầng ẩn (hidden layer)”; nhãn `img/lec-06/two-layer-network.svg` đổi theo. Mặt trang 11 → 11.
- **Sửa 2026-10-21 (tiêu đề):** `sửa` — yêu cầu người dùng 2026-10-21: tiêu đề cũ “Tầng ẩn như một phép biến đổi đặc trưng” (“như một” là sao phỏng “as a”) → “Phép biến đổi đặc trưng bằng tầng ẩn”. Mặt trang và ghi chú khác không đổi; mục 2.3 của ghi chú bài giảng đổi tên theo.

### B05. Ví dụ: mạng hai đơn vị ẩn biểu diễn XOR

- **Lý do tồn tại:** viết đầy đủ trọng số $\theta_A$ và bảng truyền xuôi tại bốn đầu vào.
- **Nhu cầu hoặc khoảng trống được lấp:** B04 chỉ ra phép biến đổi; cần một ví dụ có tham số tường minh làm điểm tựa cho định nghĩa B06 và cho phản ví dụ B08–B09.
- **Đầu vào:** phép biến đổi B04.
- **Đầu ra:** $\theta_A$, $f(x;\theta_A)=\lvert x_1-x_2\rvert$ trên $\{0,1\}^2$, $F(\theta_A)=0$; ghi nhận tiền kích hoạt bằng 0 tại $(0,0)$ và $(1,1)$.
- **Vị trí trong khung:** bước 2 (ví dụ).
- **LLO/CLO:** CLO2.
- **Bước hành trình:** KN2 ví dụ.
- **Quyết định:** `thêm` — cần trọng số tường minh và truyền xuôi cho bốn đầu vào.
- **Sửa 2026-10-12 (văn phong và mật độ):** `sửa` — 23 → 21 âm tiết; gỡ `.dense`; tiêu đề theo mẫu “Ví dụ: …”, bỏ nhãn “Ví dụ.” trùng tiêu đề. Tiêu đề cũ: “Mạng hai đơn vị ẩn biểu diễn XOR”.
- **Sửa vòng tái kiểm 2026-10-12:** thêm yêu cầu “Tính $f$ tại bốn đầu vào” theo mẫu trang ví dụ.
- **Sửa 2026-10-12 (rà soát thuật ngữ):** `sửa` — “(hàm tuyến tính chỉnh lưu, ReLU; …)” → “(hàm ReLU; …)”; thêm “(mỗi hàng của $W_1$ là một đơn vị ẩn)” (B6, phần tùy chọn, dưới 40). 26 → 30 âm tiết. Ghi chú: đơn vị tuyến tính chỉnh lưu (rectified linear unit, ReLU).

### B06. Mạng nơ-ron hai tầng

- **Lý do tồn tại:** định nghĩa mạng hai tầng có miền, kích thước và số tham số; nhận xét $\sigma$ tuyến tính đưa mạng về hàm affine.
- **Nhu cầu hoặc khoảng trống được lấp:** B05 là trường hợp $d=m=2$; $F(\theta)$, lan truyền ngược và bảng chi phí cần định nghĩa tổng quát theo $p$.
- **Đầu vào:** B05.
- **Đầu ra:** $f(x;\theta)=w_2^\top\sigma(W_1x+b_1)+b_2$, $p=md+2m+1$; ký hiệu $W_1,b_1,w_2,b_2,\sigma,z,h$ dùng tới cuối bài.
- **Vị trí trong khung:** định nghĩa mạng hai tầng (bước 2 của chuỗi).
- **LLO/CLO:** CLO2.
- **Bước hành trình:** KN2 hình thức.
- **Quyết định:** `thêm` — định nghĩa phải có miền và kích thước theo tiêu chuẩn nội dung.
- **Sửa 2026-10-12 (văn phong và mật độ):** `giữ` — 33 → 33 âm tiết; gỡ `.dense`; nội dung giữ nguyên.
- **Sửa 2026-10-12 (rà soát thuật ngữ):** `sửa` — tiêu đề “Mạng nơ-ron hai tầng”; thêm dòng “**Ký hiệu:** $\sigma$ là hàm kích hoạt; $m$ là số đơn vị ẩn; $z=W_1x+b_1$ là tiền kích hoạt.” (B6). 32 → 47 âm tiết, 5 dòng. Ghi chú: mạng nơ-ron (neural network), hàm kích hoạt (activation function).

### B07. Rủi ro thực nghiệm theo tham số mạng

- **Lý do tồn tại:** tách bước “quy tắc hợp thành lồi không áp dụng” khỏi bước phản ví dụ.
- **Nhu cầu hoặc khoảng trống được lấp:** người học dễ suy ra rằng mất mát lồi theo $f$ kéo theo $F$ lồi theo $\theta$; trang chỉ ra hàm trong $\theta\mapsto f(x_i;\theta)$ không affine.
- **Đầu vào:** định nghĩa B06; quy tắc hợp thành lồi (Bài 02; BV §3.2).
- **Đầu ra:** huấn luyện mạng XOR là cực tiểu hóa $F$ trên $\mathbb R^9$; tính lồi không còn được bảo đảm, chờ phản ví dụ.
- **Vị trí trong khung:** nối định nghĩa mạng với Mệnh đề 2–3.
- **LLO/CLO:** LLO11; CLO1.
- **Bước hành trình:** KN2 ứng dụng; KN3 nhu cầu.
- **Quyết định:** `thêm` — tránh nhảy kết luận từ “không được bảo đảm” sang “không lồi”; ghi chú kiểm kết luận không lồi với mất mát logistic (điểm hòa giải 4, Q5).
- **Sửa 2026-10-12 (văn phong và mật độ):** `sửa` — 59 → 53 âm tiết; gỡ `.dense`; bỏ nhãn “Ứng dụng.” (không trong danh sách); rút ô bảng.

### B08. Đối xứng hoán vị các đơn vị ẩn

- **Lý do tồn tại:** chỉ ra nguồn gốc cụ thể của nhiều cực tiểu là phép hoán vị đơn vị ẩn.
- **Nhu cầu hoặc khoảng trống được lấp:** B07 để mở câu hỏi về tính lồi; muốn bác bỏ tính lồi cần hai cực tiểu phân biệt cụ thể.
- **Đầu vào:** $\theta_A$ (B05); định nghĩa B06.
- **Đầu ra:** Mệnh đề 2; $\theta_B\neq\theta_A$ với $F(\theta_B)=0$; $m!$ cách sắp xếp; hệ quả cho khởi tạo đối xứng (chỉ nêu trong ghi chú).
- **Vị trí trong khung:** Mệnh đề 2 (bước 2 của chuỗi).
- **LLO/CLO:** LLO11.
- **Bước hành trình:** KN3 trực quan + ví dụ + hình thức (Mệnh đề 2).
- **Quyết định:** `thêm` — nguồn gốc của nhiều cực tiểu phải được chỉ ra trước khi kết luận không lồi.
- **Sửa 2026-10-12 (văn phong và mật độ):** `giữ` — 45 → 45 âm tiết; gỡ `.dense`; nội dung giữ nguyên.
- **Sửa 2026-10-12 (rà soát thuật ngữ):** `sửa` — Mệnh đề 2 thêm “(mỗi hàng, mỗi cột có đúng một số $1$)” cho ma trận hoán vị (B9); ghi chú nêu đủ định nghĩa (phần tử $0$ hoặc $1$). 44 → 52 âm tiết.

### B09. Tính không lồi của rủi ro thực nghiệm

- **Lý do tồn tại:** lập luận trung điểm với $F(\theta(t))$ tính tường minh bác bỏ tính lồi của $F$.
- **Nhu cầu hoặc khoảng trống được lấp:** biến “tính lồi không được bảo đảm” (B07) thành “$F$ không lồi” bằng một phép kiểm tra có chứng minh.
- **Đầu vào:** $\theta_A,\theta_B$ (B08); tập cực tiểu của hàm lồi là tập lồi (Bài 01).
- **Đầu ra:** Mệnh đề 3; $F(\theta(t))=t^2$ trên $[0,\tfrac12]$, $(1-t)^2$ trên $[\tfrac12,1]$; $F(\theta(\tfrac12))=\tfrac14$; nhận xét tầng ẩn thay cho việc tăng số đặc trưng thủ công, đổi lại $F$ không lồi.
- **Vị trí trong khung:** Mệnh đề 3, kết quả chính của khối B1; đầu vào của mạch D.
- **LLO/CLO:** LLO11; CLO1.
- **Bước hành trình:** KN3 hình thức (Mệnh đề 3) + ứng dụng (phép kiểm tra trên XOR).
- **Quyết định:** `thêm` — lập luận trung điểm cần một đường $F(\theta(t))$ tính được tường minh.
- **Sửa 2026-10-12 (văn phong và mật độ):** `tách` — 69 → 59 âm tiết; gỡ `.dense`; Mệnh đề 3 viết thành hai dòng ngắn và hai hệ quả; chứng minh một dòng trên mặt trang; phép kiểm tra trên XOR cùng hình chuyển sang B09b; câu “Tầng ẩn thay cho … đổi lại, $F$ không lồi” chuyển xuống ghi chú B09b.
- **Sửa vòng tái kiểm 2026-10-12:** khôi phục giả thiết “Giả sử $\theta^*$ là cực tiểu toàn cục có hai đơn vị ẩn mang tham số khác nhau” (phát hiện nghiêm trọng của hai vai tái kiểm); “(Bài 01)” chuyển xuống ghi chú; 59 âm tiết.

### B09b. Ví dụ: đoạn nối hai cực tiểu của mạng XOR

- **Lý do tồn tại:** áp phép kiểm tra của Mệnh đề 3 vào $\theta_A$, $\theta_B$ trên XOR, kèm hình $F(\theta(t))$.
- **Nhu cầu hoặc khoảng trống được lấp:** Mệnh đề 3 chỉ cho phép kiểm tra; cần một phép tính cụ thể bác bỏ tính lồi.
- **Đầu vào:** Mệnh đề 3 (B09); $\theta_A$, $\theta_B$ (B05, B08).
- **Đầu ra:** $f=\lvert1-2t\rvert\,\lvert x_1-x_2\rvert$, $F(\theta(\tfrac12))=\tfrac14>0$; kết luận $F$ không lồi trên $\mathbb R^9$.
- **Vị trí trong khung:** bước 2 của chuỗi (ứng dụng Mệnh đề 3).
- **LLO/CLO:** LLO11; CLO1.
- **Bước hành trình:** KN3 ứng dụng.
- **Quyết định:** `tách` từ B09 (69 âm tiết trước khi sửa); dữ kiện không đổi. Mật độ: 16 âm tiết (trang mới, 2026-10-12).
- **Sửa 2026-10-12 (rà soát thuật ngữ):** `sửa` — ghi chú “lớp ẩn” → “tầng ẩn”.

### B10. Bài tập: biểu diễn XOR và đối xứng của mạng

- **Lý do tồn tại:** trang kiểm tra riêng của mạch B; đo khả năng tái tạo ba kết quả trên nghiệm XOR khác (DL (6.4)–(6.6)).
- **Nhu cầu hoặc khoảng trống được lấp:** cần minh chứng người học tái tạo được KN1–KN3 trước khi chuyển sang tính gradient.
- **Đầu vào:** B02, B03, B05–B09.
- **Đầu ra:** đáp án $(0,1,1,-2)$; bảng truyền xuôi nghiệm DL; $F=\tfrac{27}{32}$ tại trung điểm; $p=78\,601$ dùng ở C01.
- **Vị trí trong khung:** kiểm tra bước 1–2.
- **LLO/CLO:** LLO11; CLO1, CLO2.
- **Bước hành trình:** KN1, KN2, KN3 bài tập.
- **Quyết định:** `thêm` — mỗi mạch có trang kiểm tra riêng; câu (d) chuẩn bị nhu cầu của C01.
- **Sửa 2026-10-12 (văn phong và mật độ):** `tách` — 48 → 38 âm tiết; gỡ `.dense`; tiêu đề “Bài tập: …”; câu 3 rút gọn; đáp án chuyển lên mặt trang B10b, ghi chú B10 còn gợi ý. Tiêu đề cũ: “Biểu diễn XOR và đối xứng của mạng”.

### B10b. Bài tập: biểu diễn XOR và đối xứng của mạng

- **Lý do tồn tại:** lời giải mẫu trên mặt trang cho bài tập của cụm KN1–KN3 (AGENTS.md, mỗi cụm khái niệm lớn có ít nhất một bài tập có lời giải trên mặt trang).
- **Nhu cầu hoặc khoảng trống được lấp:** người học tự kiểm câu trả lời B10 trên lớp mà không cần mở ghi chú.
- **Đầu vào:** câu hỏi B10.
- **Đầu ra:** bốn đáp án: $(0,1,1,-2)$; bảng $z,h,f$; $F=\tfrac{27}{32}$ tại trung điểm; $p=78\,601$.
- **Vị trí trong khung:** kiểm tra cuối mạch 2.
- **LLO/CLO:** LLO11; CLO1, CLO2.
- **Bước hành trình:** KN1–KN3 bài tập (lời giải).
- **Quyết định:** `tách` từ ghi chú B10; dữ kiện câu 1 dùng nhãn $\{0,1\}$ và câu 4 dùng $d=784$, khác Bài 1 của `exercises.md` (nhãn $\pm1$, $d=3072$), nên không phải cùng bài; đáp án khớp ghi chú cũ. Mật độ: 18 âm tiết (trang mới, 2026-10-12).

### C00. Lan truyền ngược trên đồ thị tính toán (trang tiêu đề mạch)

- **Lý do tồn tại:** trang tiêu đề mạch bắt buộc (yêu cầu người dùng 2026-10-12); đánh dấu ranh giới B10b → C01, chuyển từ mô hình sang cách tính gradient của nó.
- **Nhu cầu hoặc khoảng trống được lấp:** người học cần biết mạch mới trả lời nhiệm vụ nào trước khi gặp sai phân hữu hạn ở C01.
- **Đầu vào:** $f(x;\theta)$, $F(\theta)$ không lồi, $p=md+2m+1$ (mạch 2).
- **Đầu ra:** nhiệm vụ “gradient một mẫu với chi phí $O(p)$” cho C01.
- **Vị trí trong khung:** điểm vào mạch 3; đảm nhận bước `nhu cầu` của KN4 qua dòng dẫn.
- **LLO/CLO:** không đo trực tiếp; hỗ trợ mục tiêu 2 của A02.
- **Bước hành trình:** KN4 nhu cầu (cùng C01).
- **Quyết định:** `thêm` — theo yêu cầu người dùng; không xử lý bằng sửa C01 vì C01 mang ví dụ sai phân và phép đếm chi phí. Mẫu HTML và mục này theo D.3, D.6 của báo cáo phân tích MAT1101. Mật độ: 30 âm tiết (trang mới, 2026-10-12).
- **Sửa vòng tái kiểm 2026-10-12:** ghi chú mở bằng kết quả kế thừa.
- **Sửa 2026-10-12 (rà soát thuật ngữ):** `sửa` — ghi chú thêm “lan truyền ngược (backpropagation)” (chuyển từ ghi chú C04, A12).

### C01. Chi phí của gradient theo mọi tham số

- **Lý do tồn tại:** đặt nhu cầu của lan truyền ngược bằng một chi phí đo được.
- **Nhu cầu hoặc khoảng trống được lấp:** mọi phương pháp bậc nhất cần $\nabla F\in\mathbb R^p$; sai phân hữu hạn cần $p+1$ lần truyền xuôi, tổng khoảng $p^2$, quá đắt với $p=78\,601$.
- **Đầu vào:** $p$ từ B10(d); $F$ từ B07.
- **Đầu ra:** mục tiêu của mạch: gradient chính xác với chi phí cùng bậc một lần truyền xuôi.
- **Vị trí trong khung:** mở bước 3 (lan truyền ngược).
- **LLO/CLO:** LLO11 (độ sâu đồ thị tính toán); CLO1.
- **Bước hành trình:** KN4 nhu cầu.
- **Quyết định:** `thêm` — nhu cầu phải xuất phát từ một chi phí đo được.
- **Sửa 2026-10-12 (văn phong và mật độ):** `sửa` — 54 → 48 âm tiết; gỡ `.dense`; panel “Mục tiêu.” (nhãn không trong danh sách) thay bằng dòng “Kết luận:” về chi phí $p^2$; nhu cầu $O(p)$ nằm ở dòng dẫn C00.
- **Sửa 2026-10-12 (rà soát thuật ngữ):** `sửa` — mặt trang “cỡ” → “khoảng” (ba chỗ, 48 → 48 âm tiết); ghi chú: sai phân hữu hạn (finite difference), “sai số cắt” → “sai số chặt cụt (truncation error)”, bỏ “cỡ”.

### C02. Đồ thị tính toán và truyền xuôi

- **Lý do tồn tại:** gộp trực quan (đồ thị tính toán) với phần truyền xuôi của ví dụ số.
- **Nhu cầu hoặc khoảng trống được lấp:** lan truyền ngược dùng lại các giá trị trung gian; người học cần thấy giá trị nào được tính và lưu.
- **Đầu vào:** định nghĩa B06; nhu cầu C01.
- **Đầu ra:** tham số chung của mạch C; mẫu $x=(1,1)$, $y=0$: $z=(1,\tfrac12)$, $h=(1,\tfrac12)$, $f=\tfrac12$, $\ell=\tfrac18$; ghi chú điểm gãy tại đầu vào $(0,1)$.
- **Vị trí trong khung:** bước 3 (trực quan, ví dụ).
- **LLO/CLO:** CLO1.
- **Bước hành trình:** KN4 trực quan + ví dụ (phần xuôi).
- **Quyết định:** `thêm` — đồ thị chỉ có nghĩa khi gắn giá trị, nên hai bước cùng trang.
- **Sửa 2026-10-12 (văn phong và mật độ):** `giữ` — 15 → 15 âm tiết; gỡ `.dense`; nội dung giữ nguyên.
- **Sửa 2026-10-12 (rà soát thuật ngữ):** `sửa` — ghi chú “không chạm điểm gãy” → “không rơi vào điểm gãy”.

### C03. Ví dụ: truyền ngược trên đồ thị tính toán

- **Lý do tồn tại:** tính mọi đạo hàm trung gian từ $\ell$ về $\theta$ trên cùng đồ thị và kiểm một thành phần bằng sai phân trung tâm.
- **Nhu cầu hoặc khoảng trống được lấp:** trước thuật toán tổng quát, người học cần thấy mỗi đạo hàm là tích của đạo hàm phía sau với một đạo hàm cục bộ đã có từ truyền xuôi.
- **Đầu vào:** giá trị truyền xuôi C02.
- **Đầu ra:** $e$, $\nabla_{b_2}$, $\nabla_{w_2}$, $\delta_h$, $\delta_z$, $\nabla_{W_1}$, $\nabla_{b_1}$; $\lVert\nabla\ell\rVert^2=\tfrac{69}{16}$ dùng ở C06.
- **Vị trí trong khung:** bước 3 (ví dụ).
- **LLO/CLO:** CLO1.
- **Bước hành trình:** KN4 ví dụ (phần ngược).
- **Quyết định:** `thêm` — ví dụ số phải có đủ mọi đại lượng trung gian.
- **Sửa 2026-10-12 (văn phong và mật độ):** `sửa` — 28 → 25 âm tiết; gỡ `.dense`; tiêu đề theo mẫu “Ví dụ: …”; bỏ nhãn “Kiểm tra.”, công thức sai phân trung tâm ở ghi chú. Tiêu đề cũ: “Truyền ngược trên ví dụ”.
- **Sửa vòng tái kiểm 2026-10-12:** thêm yêu cầu “Tính gradient theo mọi tham số”.
- **Sửa 2026-10-12 (rà soát thuật ngữ):** `sửa` — ghi chú thêm “sai phân trung tâm (central difference)”.

### C04. Thuật toán lan truyền ngược

- **Lý do tồn tại:** phát biểu thuật toán với đầu vào, đầu ra, quy ước $\sigma'(0)=0$ và dạng tổng quát $\delta_{\text{trước}}=J^\top\delta_{\text{sau}}$.
- **Nhu cầu hoặc khoảng trống được lấp:** C03 xử lý một mẫu cụ thể; cần quy tắc dùng cho mọi mẫu và cho gradient của $F$.
- **Đầu vào:** C03; quy tắc dây chuyền (Bài 00).
- **Đầu ra:** thuật toán; phân biệt lan truyền ngược (tính gradient) với thuật toán tối ưu.
- **Vị trí trong khung:** bước 3 (thuật toán).
- **LLO/CLO:** LLO11; CLO1.
- **Bước hành trình:** KN4 hình thức.
- **Quyết định:** `thêm` — thuật toán phải có đầu vào, đầu ra và điều kiện.
- **Sửa 2026-10-12 (văn phong và mật độ):** `sửa` — 41 → 27 âm tiết; gỡ `.dense`; bỏ panel bọc thuật toán; dòng “Dạng chung” $\delta_u=J_g^\top\delta_v$ chuyển xuống ghi chú để trang còn 6 dòng.
- **Sửa 2026-10-12 (rà soát thuật ngữ):** `sửa` — ghi chú bỏ “(backpropagation)”, đã chuyển lên C00.

### C05. Chi phí của lan truyền ngược

- **Lý do tồn tại:** đếm phép nhân của hai chiều và so sánh với sai phân hữu hạn.
- **Nhu cầu hoặc khoảng trống được lấp:** trả lời nhu cầu C01 bằng con số; chi phí $O(p)$ một mẫu là đầu vào của bảng chi phí E01.
- **Đầu vào:** C04; quy mô $d=784$, $m=100$.
- **Đầu ra:** truyền xuôi $78\,500$, truyền ngược $78\,600$ phép nhân; gradient đầy đủ $O(np)$; bộ nhớ $O(bm)$.
- **Vị trí trong khung:** nhận xét về chi phí (bước 3).
- **LLO/CLO:** CLO1, CLO4.
- **Bước hành trình:** KN4 ứng dụng.
- **Quyết định:** `thêm` — cần kết luận định lượng “chi phí lan truyền ngược cùng bậc truyền xuôi”.
- **Sửa 2026-10-12 (văn phong và mật độ):** `sửa` — 67 → 39 âm tiết; gỡ `.dense`; ô “sai phân hữu hạn” ghi số phép nhân $(p+1)(md+m)\approx6{,}2\cdot10^9$; câu “nhân với $\sigma'$ là phép chọn” và chi tiết bộ nhớ chuyển xuống ghi chú.

### C06. Ví dụ: một bước hạ gradient trên mạng

- **Lý do tồn tại:** dùng chính gradient vừa tính cho một bước với hai độ dài bước.
- **Nhu cầu hoặc khoảng trống được lấp:** gradient chưa đủ để giảm mất mát: $\eta=0{,}02$ giảm, $\eta=0{,}25$ làm tăng; độ dài bước phải gắn với độ cong.
- **Đầu vào:** tham số C02; gradient C03.
- **Đầu ra:** $\ell$: $0{,}125\to0{,}0536$ với $\eta=0{,}02$; $\ell=\tfrac{2809}{2048}$ với $\eta=0{,}25$; câu hỏi về bước luôn giảm chuyển sang mạch D.
- **Vị trí trong khung:** nối bước 3 với bước 4 (bổ đề giảm).
- **LLO/CLO:** LLO12 (một phần); CLO1.
- **Bước hành trình:** KN4 ứng dụng; KN6 nhu cầu.
- **Quyết định:** `thêm` — ứng dụng phải dùng chính gradient vừa tính.
- **Sửa 2026-10-12 (văn phong và mật độ):** `sửa` — 40 → 24 âm tiết; gỡ `.dense`; tiêu đề theo mẫu “Ví dụ: …”; bỏ hai panel (chỉ một khung được phép); câu kết thành “Diễn giải:”, phần hằng số Lipschitz ở ghi chú. Tiêu đề cũ: “Một bước hạ gradient trên mạng”.
- **Sửa vòng tái kiểm 2026-10-12:** thêm yêu cầu; bỏ đậm ở “Bước $\eta=\dots$”.

### C07. Bài tập: lan truyền ngược khi một đơn vị không hoạt động

- **Lý do tồn tại:** trang kiểm tra riêng của mạch C trên mẫu có đơn vị ẩn bị chặn.
- **Nhu cầu hoặc khoảng trống được lấp:** đo khả năng áp thuật toán khi $\sigma'(z_1)=0$ và $x=0$, và khả năng nêu quy ước tại điểm gãy.
- **Đầu vào:** tham số C02; thuật toán C04.
- **Đầu ra:** đáp án (a)–(d); quan sát gradient bằng 0 cục bộ, dẫn sang D01.
- **Vị trí trong khung:** kiểm tra bước 3.
- **LLO/CLO:** CLO1.
- **Bước hành trình:** KN4 bài tập; KN5 nhu cầu.
- **Quyết định:** `thêm` — mỗi mạch có trang kiểm tra riêng.
- **Sửa 2026-10-12 (văn phong và mật độ):** `tách` — 40 → 40 âm tiết; gỡ `.dense`; tiêu đề “Bài tập: …”; đáp án chuyển lên mặt trang C07b, ghi chú C07 còn gợi ý. Tiêu đề cũ: “Lan truyền ngược khi một đơn vị không hoạt động”.
- **Sửa vòng tái kiểm 2026-10-12:** nêu lại dữ kiện mạng $W_1,b_1,w_2,b_2$ trên mặt trang.

### C07b. Bài tập: lan truyền ngược khi một đơn vị không hoạt động

- **Lý do tồn tại:** lời giải mẫu trên mặt trang cho bài tập của cụm KN4.
- **Nhu cầu hoặc khoảng trống được lấp:** người học kiểm từng bước lan truyền ngược khi một đơn vị không hoạt động và khi tiền kích hoạt rơi vào điểm gãy.
- **Đầu vào:** câu hỏi C07.
- **Đầu ra:** bốn đáp án, gồm $\delta_z=(0,3)$, $\nabla_{W_1}\ell=0$ và nhận xét vector trả về tại điểm gãy không phải gradient.
- **Vị trí trong khung:** kiểm tra cuối mạch 3; nối sang nhu cầu của mạch 4 (gradient bằng 0 chứng nhận gì).
- **LLO/CLO:** LLO11; CLO1.
- **Bước hành trình:** KN4 bài tập (lời giải).
- **Quyết định:** `tách` từ ghi chú C07; trùng Bài 3 của `materials/lec-06/exercises.md` (cùng dữ kiện), lời giải trên mặt trang khớp lời giải Bài 3. Mật độ: 30 âm tiết (trang mới, 2026-10-12).
- **Sửa vòng tái kiểm 2026-10-12:** câu 4: $\ell$ không khả vi theo $W_1,b_1$; $\delta_z=0$ là kết quả của quy ước.

### D00. Điểm dừng và bảo đảm của gradient khi không lồi (trang tiêu đề mạch)

- **Lý do tồn tại:** trang tiêu đề mạch bắt buộc; đánh dấu ranh giới C07b → D01, từ “tính được gradient” sang “gradient chứng nhận được gì”.
- **Nhu cầu hoặc khoảng trống được lấp:** C07b kết thúc ở gradient bằng 0 dù mất mát lớn; người học cần nhiệm vụ của mạch trước bảng đối chiếu D01.
- **Đầu vào:** $\nabla\ell$ với chi phí $O(p)$ (mạch 3); $F$ không lồi (mạch 2).
- **Đầu ra:** nhiệm vụ “điều mà $\nabla F=0$ và $\lVert\nabla F\rVert$ nhỏ chứng nhận” cho D01–D07b.
- **Vị trí trong khung:** điểm vào mạch 4; dòng dẫn nêu nhu cầu của KN5.
- **LLO/CLO:** không đo trực tiếp; hỗ trợ mục tiêu 2 của A02.
- **Bước hành trình:** KN5 nhu cầu (cùng C07, D01).
- **Quyết định:** `thêm` — theo yêu cầu người dùng; tên mạch khác tiêu đề D01 (D01 đổi thành “Gradient bằng không khi mục tiêu không lồi”). Mật độ: 32 âm tiết (trang mới, 2026-10-12).
- **Sửa vòng tái kiểm 2026-10-12:** ghi chú mở bằng kết quả kế thừa.
- **Sửa 2026-10-12 (rà soát thuật ngữ):** `sửa` — từ khóa “phép thử Hessian” → “phép kiểm tra bậc hai”. 28 → 30 âm tiết.

### D01b. Điểm dừng và điểm yên ngựa

- **Lý do tồn tại:** định nghĩa điểm dừng, điểm dừng $\varepsilon$-xấp xỉ và điểm yên ngựa trên trang riêng.
- **Nhu cầu hoặc khoảng trống được lấp:** D01 cho thấy $\nabla F=0$ chứng nhận ít hơn khi không lồi; cần tên cho những gì còn lại trước ví dụ D02.
- **Đầu vào:** D01; tiêu chí dừng của Bài 04.
- **Đầu ra:** ba định nghĩa; tiêu chí dừng chỉ xác nhận điểm dừng $\varepsilon$-xấp xỉ.
- **Vị trí trong khung:** bước 4 (định nghĩa).
- **LLO/CLO:** LLO11; CLO1.
- **Bước hành trình:** KN5 hình thức (định nghĩa); ngoại lệ thứ tự giải thích ở KN5.
- **Quyết định:** `tách` từ D01 (94 âm tiết trước khi sửa). Mật độ: 46 âm tiết (trang mới, 2026-10-12).
- **Sửa vòng tái kiểm 2026-10-12:** “Nhắc lại (Bài 00):” cho điểm dừng và điểm yên ngựa, “Định nghĩa.” chỉ cho điểm dừng $\varepsilon$-xấp xỉ (KN5).
- **Sửa 2026-10-12 (rà soát thuật ngữ):** `sửa` — đứng ngay sau D00, trước D01 (quyết định B7, phương án 1): điểm yên ngựa và cực trị địa phương được nhắc lại trước khi bảng D01 dùng. Ghi chú: câu cuối nối sang phép đối chiếu với trường hợp lồi của D01. Mặt trang không đổi (48).

### D01. Gradient bằng không khi mục tiêu không lồi

- **Lý do tồn tại:** định nghĩa điểm dừng, điểm dừng $\varepsilon$-xấp xỉ và điểm yên ngựa, đối chiếu với trường hợp lồi.
- **Nhu cầu hoặc khoảng trống được lấp:** Bài 02, 04 dùng $\nabla F=0$ để chứng nhận cực tiểu toàn cục; với $F$ không lồi (B09) chiều suy ra này mất, cần tên cho những gì còn lại.
- **Đầu vào:** B09 (không lồi); C07 (gradient bằng 0 cục bộ); tiêu chí dừng $\lVert\nabla F\rVert\le\varepsilon$ (Bài 04).
- **Đầu ra:** định nghĩa; ba loại điểm dừng; tiêu chí dừng giữ nguyên nhưng đổi ý nghĩa.
- **Vị trí trong khung:** bước 4 (định nghĩa).
- **LLO/CLO:** LLO11; CLO1.
- **Bước hành trình:** KN5 nhu cầu + hình thức (định nghĩa); ngoại lệ thứ tự giải thích ở KN5.
- **Quyết định:** `thêm` — nhu cầu và tên gọi phải có trước phép phân loại.
- **Sửa 2026-10-12 (văn phong và mật độ):** `tách` — 94 → 46 âm tiết; gỡ `.dense`; đổi tiêu đề (khác tên mạch 4); định nghĩa chuyển sang D01b; bảng rút gọn ô. Tiêu đề cũ: “Điểm dừng khi mục tiêu không lồi”.
- **Sửa 2026-10-12 (rà soát thuật ngữ):** `sửa` — đứng sau D01b (B7); ghi chú nhận câu nối sang D02 (“Mạng tuyến tính một đơn vị cho một hàm hai biến có đủ …”), câu cuối gọi “ba loại điểm dừng vừa nhắc lại”. Mặt trang không đổi (43).

### D02. Ví dụ: mạng tuyến tính một đơn vị

- **Lý do tồn tại:** cung cấp một hàm hai biến tính thủ công được, sinh từ mạng, có cả điểm yên ngựa và đường cực tiểu đối xứng.
- **Nhu cầu hoặc khoảng trống được lấp:** D01 chỉ đặt tên; cần ví dụ có trị riêng Hessian cụ thể gắn với mạng.
- **Đầu vào:** D01; mạng hai tầng B06 với $d=m=1$, $\sigma(z)=z$, không độ chệch.
- **Đầu ra:** $F(u,v)=\tfrac12(uv-1)^2$, $\nabla F$, $\nabla^2F$; gốc là điểm yên ngựa (trị riêng $\pm1$); $(1,1)$ có trị riêng $0$ và $2$; hàm dùng lại ở D03–D07.
- **Vị trí trong khung:** ví dụ cho bước 4; ứng dụng của Mệnh đề 3 cho mạng tuyến tính.
- **LLO/CLO:** LLO11.
- **Bước hành trình:** KN5 trực quan + ví dụ; KN3 ứng dụng.
- **Quyết định:** `thêm` — ví dụ hai chiều có trị riêng Hessian, gắn trực tiếp với mạng.
- **Sửa 2026-10-12 (văn phong và mật độ):** `sửa` — 22 → 20 âm tiết; gỡ `.dense`; tiêu đề theo mẫu “Ví dụ: …”; bỏ nhãn “Ví dụ.”; ghi chú bỏ mã T7. Tiêu đề cũ: “Mạng tuyến tính một đơn vị: điểm yên ngựa và cực tiểu đối xứng”.
- **Sửa vòng tái kiểm 2026-10-12:** thêm yêu cầu “Xác định và phân loại điểm dừng”.
- **Sửa 2026-10-12 (rà soát thuật ngữ):** `sửa` — thêm dòng “**Nhắc lại:** $A$ đối xứng, $A\succ0$ (xác định dương) khi $v^\top Av>0$ mọi $v\ne0$, tức mọi trị riêng dương; $A\succeq0$ khi chúng không âm.” (B8 và quyết định liên bài 10), đặt ở cột phải dưới hình vì cột trái đã kín khung 16:9. 27 → 45 âm tiết, 5 dòng. Ghi chú “không có độ lệch” → “không có độ chệch”.

### D03. Phân loại điểm dừng bằng Hessian

- **Lý do tồn tại:** phát biểu điều kiện bậc hai và giới hạn của nó khi Hessian có trị riêng 0.
- **Nhu cầu hoặc khoảng trống được lấp:** D02 cho số; cần công cụ tổng quát, và cần biết công cụ không kết luận được tại $(1,1)$ dù đó là cực tiểu toàn cục.
- **Đầu vào:** D02; khai triển Taylor bậc hai (Bài 00).
- **Đầu ra:** mệnh đề (i)–(iii); nhận xét Hessian có $p^2$ phần tử nên không là quy tắc dừng thực hành.
- **Vị trí trong khung:** bước 4 (kết quả).
- **LLO/CLO:** LLO11; CLO1.
- **Bước hành trình:** KN5 hình thức; KN6 nhu cầu.
- **Quyết định:** `thêm` — tách công cụ phân loại khỏi ví dụ để mỗi trang một luận điểm.
- **Sửa 2026-10-12 (văn phong và mật độ):** `sửa` — 77 → 50 âm tiết; gỡ `.dense`; phát biểu ba mục rút gọn; ghi chú về điều kiện cần là phần thêm so với Bài 00 và trường hợp $(0,0)$ chuyển xuống ghi chú.
- **Sửa vòng tái kiểm 2026-10-12:** nguồn “(Bài 00; mục 3 bổ sung)”.
- **Sửa 2026-10-12 (rà soát thuật ngữ):** `sửa` — “(Bài 00; mục 3 bổ sung)” → “(Bài 00; ý 3 là phần bổ sung)” (“mục” dành cho mạch); ghi chú “Mục 3” → “Ý 3”. 51 → 53 âm tiết.

### D04. Bổ đề giảm khi không lồi

- **Lý do tồn tại:** chỉ ra bổ đề giảm chỉ dùng tính trơn, nên vẫn cho giảm mỗi bước khi $F$ không lồi, và kiểm trên D02.
- **Nhu cầu hoặc khoảng trống được lấp:** C06 và D03 để lại câu hỏi bước nào bảo đảm giảm mà không cần Hessian.
- **Đầu vào:** bổ đề giảm (Bài 04; 05b); $F(u,v)$ trên $[0,1]^2$ với $L=2$.
- **Đầu ra:** bất đẳng thức giảm; số $0{,}0703\le0{,}1422$; nhận xét $L$ chỉ tồn tại trên vùng, và với ReLU không tồn tại trên vùng chứa điểm gãy; giải thích bước 0,25 ở C06 (dọc đoạn không có điểm gãy, hằng số Lipschitz trên đoạn lớn hơn 8).
- **Vị trí trong khung:** bước 4 (bổ đề giảm dưới H2).
- **LLO/CLO:** CLO1.
- **Bước hành trình:** KN6 trực quan + ví dụ + hình thức (bổ đề, nhắc lại).
- **Quyết định:** `thêm` — cần phát biểu rằng bổ đề giảm vẫn cho giảm mỗi bước khi không lồi.
- **Sửa 2026-10-12 (văn phong và mật độ):** `sửa` — 50 → 33 âm tiết; gỡ `.dense`; nhãn “(Bổ đề 05b.6)”; ví dụ tách hai dòng, chú thích $L=2$ và giá trị trùng $F(\theta_0)$ chuyển xuống ghi chú.
- **Sửa vòng tái kiểm 2026-10-12:** nhãn “Nhắc lại:” cho bổ đề giảm.
- **Sửa 2026-10-12 (rà soát thuật ngữ):** `tách` — “Nhắc lại:” thêm định nghĩa gradient $L$-Lipschitz trên tập lồi $C$: $\lVert\nabla F(u)-\nabla F(v)\rVert\le L\lVert u-v\rVert$ với mọi $u,v\in C$ (B1, nghiêm trọng). Thêm dòng này làm trang hai cột vượt khung 16:9 (đáy nội dung 726 px logic, khung 675), nên phần ví dụ và hình chuyển sang D04b; trang còn khung bổ đề và dòng $\eta=1/L$. 35 → 24 âm tiết. Ghi chú: bổ đề giảm (descent lemma); “tập mức” → “tập mức dưới (sublevel set)”; đoạn ví dụ chuyển sang D04b.

### D04b. Ví dụ: bổ đề giảm trên mạng tuyến tính một đơn vị

- **Lý do tồn tại:** kiểm bổ đề giảm của D04 trên mạng tuyến tính một đơn vị với số cụ thể.
- **Nhu cầu hoặc khoảng trống được lấp:** D04 chỉ phát biểu bổ đề; người học cần thấy mức giảm bảo đảm và mức giảm thực trên cùng một bước, và vì sao $L$ chỉ đặt được trên một vùng.
- **Đầu vào:** D04 (bổ đề, $\eta=1/L$); $F(u,v)=\tfrac12(uv-1)^2$ của D02; $L=2$ trên $[0,1]^2$.
- **Đầu ra:** $\lVert\nabla F(\theta_0)\rVert^2=\tfrac9{32}$, bảo đảm $\ge0{,}0703$, giảm thực $0{,}1422$; hình `descent-bound-product.svg`; các số dùng lại ở D07(c).
- **Vị trí trong khung:** bước 4 (bổ đề giảm dưới giả thiết trơn), ví dụ.
- **LLO/CLO:** CLO1.
- **Bước hành trình:** KN6 trực quan (parabol chặn trên trong hình) + ví dụ.
- **Quyết định:** `tách` từ D04 (rà soát thuật ngữ 2026-10-12): định nghĩa gradient $L$-Lipschitz thêm vào “Nhắc lại:” của D04 làm trang hai cột vượt khung 16:9. Trang theo mẫu ví dụ: dữ kiện → “Tính …” → hai dòng bước → “Diễn giải:”. Mật độ: 32 âm tiết, 5 dòng (trang mới). Ghi chú là đoạn ví dụ cũ của D04 ($L$ trên các vùng $[0,1]^2$, $[-1,1]^2$, $[-2,2]^2$; số liệu một bước; mô tả hình).

### D05. Hội tụ của chuẩn gradient

- **Lý do tồn tại:** phát biểu lại T7 của 05b với nhãn, chứng minh một dòng và nêu rõ những điều không được khẳng định.
- **Nhu cầu hoặc khoảng trống được lấp:** biến giảm mỗi bước (D04) thành bảo đảm sau $K$ bước, tức câu trả lời của khối B2.
- **Đầu vào:** D04; T7 (05b, mạch F, trang F03); H0, H2.
- **Đầu ra:** $\min_{0\le k<K}\lVert\nabla F(\theta_k)\rVert^2\le2L\Delta_0/K$; danh sách điều không khẳng định; phạm vi trên mặt trang (hàm kích hoạt trơn hoặc mạng tuyến tính; với ReLU là định hướng); điểm xuất phát của T8 ở F04.
- **Vị trí trong khung:** bước 4 (T7), kết quả trung tâm của khối B2.
- **LLO/CLO:** CLO1.
- **Bước hành trình:** KN6 hình thức.
- **Quyết định:** `thêm` — cần dẫn T7 có nhãn và phát biểu lại, không chứng minh lại.
- **Sửa 2026-10-12 (văn phong và mật độ):** `tách` — 76 → 43 âm tiết; gỡ `.dense`; định lý phát biểu bằng lời (bỏ T7, H0, H2), kèm (Định lý 05b.41); thêm “Ý nghĩa:”; chứng minh một dòng; “Không khẳng định” và “Phạm vi” chuyển sang D05b.
- **Sửa vòng tái kiểm 2026-10-12:** “Ý nghĩa:” viết theo $K$ điểm lặp đầu.
- **Sửa 2026-10-12 (rà soát thuật ngữ):** `sửa` — ghi chú “triệt tiêu (tổng lồng)” → “triệt tiêu liên tiếp (telescoping)”.

### D05b. Phạm vi của bảo đảm theo chuẩn gradient

- **Lý do tồn tại:** nêu những điều định lý hội tụ chuẩn gradient không khẳng định và phạm vi giả thiết gradient Lipschitz.
- **Nhu cầu hoặc khoảng trống được lấp:** phát biểu định lý D05 dễ bị đọc thành “dãy hội tụ tới cực tiểu”; với ReLU giả thiết không đúng.
- **Đầu vào:** D05.
- **Đầu ra:** danh sách điều không khẳng định; phạm vi (mạng tuyến tính, hàm kích hoạt trơn; ReLU chỉ định hướng).
- **Vị trí trong khung:** bước 4, giới hạn áp dụng của Định lý 05b.41.
- **LLO/CLO:** CLO1.
- **Bước hành trình:** KN6 hình thức (phạm vi).
- **Quyết định:** `tách` từ D05 (76 âm tiết trước khi sửa); AGENTS.md không cho đặt định lý, chứng minh và nhận xét phạm vi trên cùng trang. Mật độ: 60 âm tiết (trang mới, 2026-10-12).
- **Sửa vòng tái kiểm 2026-10-12:** gradient Lipschitz chỉ trên vùng bị chặn chứa dãy lặp (nhất quán ghi chú D04); 56 âm tiết.

### D06. Bình nguyên gần điểm yên ngựa

- **Lý do tồn tại:** một dãy lặp tính được cho thấy điểm dừng xấp xỉ được T7 chứng nhận có thể nằm xa cực tiểu.
- **Nhu cầu hoặc khoảng trống được lấp:** D05 nêu T7 là bảo đảm về điểm dừng khi không lồi; cần một dãy cụ thể để thấy giới hạn của chứng nhận đó.
- **Đầu vào:** D02 với $\theta_0=(0{,}01;\,0{,}01)$, $\eta=\tfrac12$; T7 (D05); $L=2$ hợp lệ vì dãy ở trong $[0,1]^2$.
- **Đầu ra:** dòng bốn giá trị $F(\theta_k)$ tại $k=0,5,10,13$ và hình bình nguyên $k=0,\dots,15$; nhận xét với $\varepsilon^2=2\cdot10^{-4}$, $\theta_0$ đã là điểm dừng $\varepsilon$-xấp xỉ trong khi $F(\theta_0)\approx0{,}4999$, gần giá trị tại điểm yên ngựa.
- **Vị trí trong khung:** giới hạn áp dụng của bước 4.
- **LLO/CLO:** LLO11; CLO1.
- **Bước hành trình:** KN5 ứng dụng; KN6 ứng dụng.
- **Quyết định:** `thêm` — cần một phép tính chứng tỏ điểm dừng xấp xỉ không nhất thiết là cực tiểu.
- **Sửa 2026-10-12 (văn phong và mật độ):** `sửa` — 51 → 37 âm tiết; gỡ `.dense`; tách định nghĩa và dữ kiện thành hai dòng; công thức đệ quy và dãy giá trị $F(\theta_k)$ chuyển xuống ghi chú (hình đã thể hiện) để không tràn khung; ghi chú bỏ mã T7.

### D07. Bài tập: phân loại điểm dừng và số bước của hạ gradient

- **Lý do tồn tại:** trang kiểm tra riêng của mạch D.
- **Nhu cầu hoặc khoảng trống được lấp:** đo khả năng phân loại điểm dừng và đọc cận T7 so với số bước thực tế.
- **Đầu vào:** D02–D06.
- **Đầu ra:** đáp án: điểm dừng là $(0,0)$ và mọi điểm $uv=1$; Hessian tại $(2,\tfrac12)$ có trị riêng $0$ và $4{,}25$; cận T7 cho $K=113$, thực tế $K=4$.
- **Vị trí trong khung:** kiểm tra bước 4; khép khối B2.
- **LLO/CLO:** LLO11; CLO1.
- **Bước hành trình:** KN5, KN6 bài tập.
- **Quyết định:** `thêm` — mỗi mạch có trang kiểm tra riêng.
- **Sửa 2026-10-12 (văn phong và mật độ):** `tách` — 46 → 49 âm tiết; gỡ `.dense`; tiêu đề “Bài tập: …” không mã T7; câu 3, 4 gọi tên định lý; đáp án lên mặt trang D07b. Tiêu đề cũ: “Phân loại điểm dừng và số bước theo T7”.
- **Sửa vòng tái kiểm 2026-10-12:** ghi chú mở bằng kỹ năng được kiểm tra.
- **Sửa 2026-10-21 (đo mục tiêu 2):** `sửa` — câu 1 thành “Xác định mọi điểm dừng; chỉ ra một điểm dừng không là cực tiểu địa phương.”, để bài tập đo phần “điểm có $\nabla F=0$ nhưng không là cực tiểu địa phương” của mục tiêu 2 ở A02; ghi chú nêu hai trường hợp phân loại. 59 âm tiết theo bộ đếm token có chữ (trần 60), 6 dòng.

### D07b. Bài tập: phân loại điểm dừng và số bước của hạ gradient

- **Lý do tồn tại:** lời giải mẫu trên mặt trang cho bài tập của cụm KN5–KN6.
- **Nhu cầu hoặc khoảng trống được lấp:** người học kiểm phép phân loại bằng Hessian và phép tính $K$ theo cận so với số bước thực tế.
- **Đầu vào:** câu hỏi D07.
- **Đầu ra:** điểm dừng; Hessian tại $(2,\tfrac12)$ với trị riêng $0$ và $4{,}25$; $K=113$ theo cận, $K=4$ thực tế; điều định lý không cho.
- **Vị trí trong khung:** kiểm tra cuối mạch 4.
- **LLO/CLO:** LLO11; CLO1.
- **Bước hành trình:** KN5, KN6 bài tập (lời giải).
- **Quyết định:** `tách` từ ghi chú D07; dữ kiện khác Bài 5 của `exercises.md` (Bài 5 dùng $(4,\tfrac14)$ và $\theta_0=(\tfrac14,\tfrac14)$), nên không phải cùng bài; đáp án khớp ghi chú cũ. Mật độ: 43 âm tiết (trang mới, 2026-10-12).
- **Sửa 2026-10-12 (rà soát thuật ngữ):** `sửa` — “không loại điểm gần yên ngựa” → “không loại khả năng dừng gần điểm yên ngựa”. 42 → 45 âm tiết.
- **Sửa 2026-10-21 (đo mục tiêu 2):** `sửa` — lời giải câu 1 thêm ${F(t,t)=\tfrac12(t^2-1)^2<\tfrac12=F(0,0)}$ với $t\ne0$ nhỏ, nên gốc không là cực tiểu địa phương; lập luận bằng giá trị của $F$, không dùng Hessian, để không lặp D02. Ghi chú câu 1 nêu khoảng $0<\lvert t\rvert<\sqrt2$. 55 âm tiết (trần 60), 5 dòng, mỗi dòng ≤ 20.

### E00. Gradient nhóm nhỏ và chi phí mỗi bước (trang tiêu đề mạch)

- **Lý do tồn tại:** trang tiêu đề mạch bắt buộc; đánh dấu ranh giới D07b → E01, giữ định lý hội tụ chuẩn gradient nhưng đặt ngân sách mỗi bước.
- **Nhu cầu hoặc khoảng trống được lấp:** người học cần thấy mạch mới xử lý giới hạn (i) chi phí.
- **Đầu vào:** Định lý 05b.41 (D05); chi phí $O(np)$ của gradient đầy đủ (mạch 3).
- **Đầu ra:** nhiệm vụ “mỗi bước tốn ít hơn $O(np)$ với ước lượng không chệch” cho E01–E06c.
- **Vị trí trong khung:** điểm vào mạch 5; dòng dẫn nêu nhu cầu của KN7.
- **LLO/CLO:** không đo trực tiếp; hỗ trợ mục tiêu 3 của A02.
- **Bước hành trình:** KN7 nhu cầu (cùng E01, E02).
- **Quyết định:** `thêm` — theo yêu cầu người dùng. Mật độ: 33 âm tiết (trang mới, 2026-10-12).
- **Sửa vòng tái kiểm 2026-10-12:** ghi chú mở bằng kết quả kế thừa.
- **Sửa 2026-10-22 (từ khóa):** `sửa` — từ khóa “đại lượng thay thế” → “ước lượng rủi ro kỳ vọng”, khớp tiêu đề mới của E02 (yêu cầu người dùng 2026-10-22).
- **Sửa 2026-10-22 (ghi chú, U1):** `sửa` — “tính chất thay thế của $F$ giải thích …” → “Việc $F$ chỉ ước lượng $R$, tại $\theta$ cố định với sai lệch bậc $1/\sqrt n$, giải thích vì sao không cần cực tiểu hóa $F$ chính xác.”, khớp tiêu đề mới của E02. Mặt trang không đổi.

### E01. Chi phí một bước của ba phương pháp ở ba quy mô

- **Lý do tồn tại:** đưa lý do tính toán của luận đề về số cụ thể ở ba quy mô.
- **Nhu cầu hoặc khoảng trống được lấp:** T7 cần $\nabla F(\theta_k)$ ở mỗi bước với chi phí $O(np)$ (C05); cần đo khi nào một bước như vậy vượt ngân sách.
- **Đầu vào:** C05 ($O(p)$ một mẫu); chi phí Newton $O(np^2+p^3)$ (Bài 04; Bài 05 khối A3); giới hạn (i) của A03.
- **Đầu ra:** bảng chi phí GD, Newton, SGD ở ba quy mô; nhận xét một lượt dữ liệu tốn $np$ cho cả GD và SGD.
- **Vị trí trong khung:** lý do tính toán; mở bước 5 (SGD).
- **LLO/CLO:** LLO11, LLO15 (chi phí Newton); CLO4.
- **Bước hành trình:** KN7 nhu cầu.
- **Quyết định:** `thêm` — luận đề yêu cầu chỉ ra SGD bị buộc bởi chi phí; ghi chú chỉ so chi phí một bước, phát biểu Newton theo Bài 05 CP04 (Định lý 4, số bước của Newton) (điểm hòa giải 2).
- **Sửa 2026-10-12 (văn phong và mật độ):** `sửa` — 98 → 56 âm tiết; gỡ `.dense`; câu dẫn bỏ mã T7 và viết đầy đủ “hạ gradient ngẫu nhiên (SGD)” ở lần đầu trên mặt trang; panel “Lý do tính toán” thay bằng “Kết luận:”; chú thích rút gọn; ghi chú rút đoạn so sánh bảng với Bài 05.
- **Sửa 2026-10-12 (rà soát thuật ngữ):** `sửa` — ghi chú: tên đầy đủ của RCV1 (Reuters Corpus Volume I) ở lần đầu.

### E02. Ước lượng rủi ro kỳ vọng bằng rủi ro thực nghiệm

- **Lý do tồn tại:** nêu lại lý do thống kê với Định lý 05c.52 của 05c và số liệu RCV1 (SNW Bảng 13.3).
- **Nhu cầu hoặc khoảng trống được lấp:** E01 chỉ cho thấy gradient đầy đủ đắt; cần lý do để chấp nhận một ước lượng nhiễu thay cho cực tiểu chính xác.
- **Đầu vào:** Định lý 05c.52 (05c); Bài 05 khối A1, A2; SNW Bảng 13.3, tr. 363, chỉ các hàng mất mát bản lề (hinge loss) (SVMLight 23 642 s, SVMPerf 66 s, SGD 1,4 s); các hàng mất mát logistic thuộc Bài 05 KL02, ghi chú E02 dẫn tới KL02. Từ 2026-10-15 KL02 bỏ khỏi deck Bài 05; ghi chú E02b dẫn Ví dụ 05.25 của ghi chú bài giảng Bài 05.
- **Đầu ra:** tại $\theta$ cố định, sai số $F-R$ có bậc $1/\sqrt n$; kết luận Bottou–Bousquet cho bài toán lồi (không đổi bậc của cận), không khẳng định “không cải thiện $R$”; phân tách sai số xấp xỉ, ước lượng, tối ưu (ghi chú); thí nghiệm RCV1 làm minh họa có nguồn.
- **Vị trí trong khung:** lý do thống kê; nhu cầu của F05, F06.
- **LLO/CLO:** LLO11; CLO1.
- **Bước hành trình:** KN7 nhu cầu; KN9 nhu cầu.
- **Quyết định:** `thêm` — luận đề yêu cầu lý do thứ hai được nêu lại với số liệu; tiêu đề viết thành cụm danh từ. Phân chia Bảng 13.3 với Bài 05 KL02 theo quyết định của điều phối viên: E02 giữ các hàng hinge, KL02 giữ các hàng logistic.
- **Sửa 2026-10-12 (văn phong và mật độ):** `tách` — 113 → 54 âm tiết; gỡ `.dense`; định lý 05c.52 phát biểu bằng lời thành hai dòng và công thức; “Lý do thống kê” thành “Ý nghĩa:” và một dòng Bottou–Bousquet; số liệu RCV1 chuyển sang E02b.
- **Sửa vòng tái kiểm 2026-10-12:** ghi chú bỏ mệnh đề lặp.
- **Sửa 2026-10-12 (rà soát thuật ngữ):** `sửa` — “$F$ lệch $R$ cỡ $1/\sqrt n$” → “sai lệch giữa $F$ và $R$ có bậc $1/\sqrt n$”; “sai số dư” → “sai số vượt” (A2). Tiếng Anh “(excess error)” và phân rã ba thành phần nằm trong ghi chú vì dòng Bottou–Bousquet đã 21 âm tiết và thêm phân rã sẽ vượt 60. 54 → 58 âm tiết. Ghi chú: định nghĩa sai số vượt, “đại lượng thay thế (surrogate)”.
- **Sửa 2026-10-22 (tiêu đề):** `sửa` — tiêu đề theo yêu cầu người dùng 2026-10-22; tiêu đề cũ “Rủi ro thực nghiệm như đại lượng thay thế”. Tiêu đề mới nêu đúng nội dung định lý: tại $\theta$ cố định, $F(\theta)$ là ước lượng không chệch của $R(\theta)$, sai số bậc $1/\sqrt n$. Mặt trang và ghi chú không đổi; ghi chú vẫn giải thích “đại lượng thay thế (surrogate)”. Từ khóa E00 đổi theo.

### E02b. Ví dụ: ba phương pháp trên tập RCV1

- **Lý do tồn tại:** trình bày số liệu thực nghiệm có nguồn (Sra, Nowozin và Wright, 2011, Bảng 13.3) minh họa lý do thống kê.
- **Nhu cầu hoặc khoảng trống được lấp:** lý do thống kê ở E02 là lập luận tiệm cận; người học cần một trường hợp số cụ thể.
- **Đầu vào:** E02 (Định lý 05c.52, Bottou–Bousquet).
- **Đầu ra:** bảng ba phương pháp, lỗi kiểm thử $6{,}02\,\%$, $6{,}03\,\%$, $6{,}02\,\%$; thời gian chênh bốn bậc.
- **Vị trí trong khung:** luận đề (lý do thống kê).
- **LLO/CLO:** LLO12; CLO4.
- **Bước hành trình:** KN7 nhu cầu (ví dụ dẫn nhập của lý do thống kê).
- **Quyết định:** `tách` từ E02 (113 âm tiết trước khi sửa); số liệu SVMPerf $6{,}03\,\%$ giữ nguyên. Mật độ: 47 âm tiết (trang mới, 2026-10-12).
- **Sửa 2026-10-22 (bỏ F02, F02b, F03):** `sửa` — chỉ ghi chú: lịch bước của thí nghiệm RCV1 so với Định lý 05b.39 dẫn thẳng Bài 05b, bỏ “ở phần tốc độ hội tụ dưới nhiễu”.

### E03. Ví dụ: gradient nhóm nhỏ trên dữ liệu bốn điểm, sáu gradient nhóm

- **Lý do tồn tại:** ví dụ số đặt trước Định lý 05c.53: sáu nhóm hai mẫu cho sáu gradient khác nhau có trung bình bằng gradient đầy đủ, và một nhóm làm $F$ tăng.
- **Nhu cầu hoặc khoảng trống được lấp:** trước phát biểu về tính không chệch và phương sai, người học cần thấy gradient nhóm thay đổi theo nhóm.
- **Đầu vào:** E01–E02; mô hình tuyến tính có hệ số chặn $c$ (A04).
- **Đầu ra:** bảng sáu nhóm với $\widehat g$ và $F(\theta_1)$; kỳ vọng $\tfrac{503}{384}$ so với $\tfrac{133}{128}$ của bước đầy đủ; $\theta^*=(1,1)$.
- **Vị trí trong khung:** bước 5 (trực quan và ví dụ cho Định lý 05c.53).
- **LLO/CLO:** LLO12; CLO1.
- **Bước hành trình:** KN7 trực quan + ví dụ.
- **Quyết định:** `thêm` — cần một bước số trên dữ liệu nhỏ với $b=2$, đặt trước phát biểu hình thức.
- **Sửa 2026-10-12 (văn phong và mật độ):** `tách` — 24 → 22 âm tiết; gỡ `.dense`; tiêu đề theo mẫu ví dụ nhiều trang (“…, sáu gradient nhóm”); bảng sáu nhóm và các giá trị $F(\theta_1)$ chuyển sang E03b để không tràn khung; sửa thẻ `</p>` thừa. Tiêu đề cũ: “Gradient nhóm nhỏ trên dữ liệu bốn điểm”.

### E03b. Ví dụ: gradient nhóm nhỏ trên dữ liệu bốn điểm, một bước theo từng nhóm

- **Lý do tồn tại:** bảng sáu nhóm với $\widehat g$ và $F(\theta_1)$, kỳ vọng $\tfrac{503}{384}$ so với bước đầy đủ.
- **Nhu cầu hoặc khoảng trống được lấp:** E03 chỉ ra trung bình sáu gradient nhóm bằng $\nabla F$; cần thấy một bước theo từng nhóm có thể làm $F$ tăng.
- **Đầu vào:** E03.
- **Đầu ra:** bảng sáu nhóm; $F(\theta_1)=1{,}039$ với gradient đầy đủ; nhóm $\{1,2\}$ làm $F$ tăng.
- **Vị trí trong khung:** bước 5 (ví dụ của gradient nhóm).
- **LLO/CLO:** LLO12; CLO1.
- **Bước hành trình:** KN7 ví dụ.
- **Quyết định:** `tách` từ E03: trang gộp hình, dữ kiện và bảng tràn khung 16:9 sau khi gỡ `.dense`; dữ kiện và thứ tự không đổi. Mật độ: 32 âm tiết (trang mới, 2026-10-12).

### E04. Tính không chệch và phương sai của gradient nhóm

- **Lý do tồn tại:** phát biểu lại Định lý 05c.53 của 05c và kiểm trên E03.
- **Nhu cầu hoặc khoảng trống được lấp:** E03 cho thấy hiện tượng trên một ví dụ; cần phát biểu tổng quát với giả thiết chọn đều và hệ số không hoàn lại.
- **Đầu vào:** E03; Định lý 05c.53 (05c).
- **Đầu ra:** $\mathbb E\widehat g=\nabla F(\theta)$; $\mathbb E\lVert\widehat g-\nabla F(\theta)\rVert^2=\frac{\operatorname{tr}\Sigma(\theta)}{b}\cdot\frac{n-b}{n-1}$ khi chọn không hoàn lại; kiểm $\tfrac{59}{12}$; liên hệ M3 với H6, H6b.
- **Vị trí trong khung:** bước 5 (Định lý 05c.53).
- **LLO/CLO:** LLO12; CLO1.
- **Bước hành trình:** KN7 hình thức.
- **Quyết định:** `thêm` — dẫn 05c có nhãn, phát biểu lại, không chứng minh lại.
- **Sửa 2026-10-12 (văn phong và mật độ):** `sửa` — 58 → 52 âm tiết; gỡ `.dense`; định lý phát biểu bằng lời kèm (Định lý 05c.53); bỏ panel; dòng kiểm tra không dùng nhãn “Kiểm tra”; ghi chú bỏ mã H6, H6b.
- **Sửa 2026-10-12 (rà soát thuật ngữ):** `sửa` — ghi chú “độ lệch của bốn gradient mẫu” → “sai lệch …” (A22).

### E05. Thuật toán hạ gradient ngẫu nhiên nhóm nhỏ

- **Lý do tồn tại:** phát biểu thuật toán với đầu vào, đầu ra, quy tắc lưu tham số tốt nhất theo tập xác thực và chi phí.
- **Nhu cầu hoặc khoảng trống được lấp:** ghép ước lượng E04 với lan truyền ngược C04 thành một phương pháp chạy được.
- **Đầu vào:** E04; C04; tập xác thực (Bài 05 HQ05a).
- **Đầu ra:** thuật toán SGD nhóm nhỏ; chi phí $O(bp)$ mỗi bước, $O(np)$ mỗi lượt; ghi chú về xáo trộn theo lượt và M3; nhận xét T8 bảo đảm cho dãy lặp, còn thuật toán trả về tham số tốt nhất theo tập xác thực.
- **Vị trí trong khung:** bước 5 (phương pháp).
- **LLO/CLO:** LLO12; CLO2.
- **Bước hành trình:** KN7 hình thức (thuật toán) + ứng dụng (chi phí mỗi lượt).
- **Quyết định:** `thêm` — thuật toán phải có đầu vào, đầu ra và chi phí.
- **Sửa 2026-10-12 (văn phong và mật độ):** `sửa` — 78 → 57 âm tiết; gỡ `.dense`; bỏ panel; bước 3–4 gộp; dòng chi phí không nhãn, phần “một lượt dữ liệu” ở ghi chú; ghi chú bỏ mã H6.
- **Sửa vòng tái kiểm 2026-10-12:** ghi chú bỏ câu chỉ đường cuối.
- **Sửa 2026-10-12 (rà soát thuật ngữ):** `sửa` — bước 1 “Chọn đều ngẫu nhiên $b$ chỉ số làm $B_k$, độc lập với các nhóm trước.” (A18); “lỗi xác thực” → “sai số xác thực” (A16). 57 → 60 âm tiết (đúng trần). Ghi chú thêm lịch bước (step-size schedule).
- **Sửa 2026-10-22 (bỏ F02, F02b, F03):** `sửa` — chỉ ghi chú: “Các định lý hội tụ ở phần tốc độ hội tụ dưới nhiễu” → “Định lý hội tụ không lồi ở phần tốc độ hội tụ dưới nhiễu”.

### E06. Bài tập: một bước hạ gradient ngẫu nhiên trên mạng XOR

- **Lý do tồn tại:** trang kiểm tra riêng của mạch E, chuyển giao lan truyền ngược sang SGD.
- **Nhu cầu hoặc khoảng trống được lấp:** đo khả năng tính gradient nhóm bằng lan truyền ngược và thực hiện một bước cập nhật trên mạng.
- **Đầu vào:** tham số C02; gradient mẫu $((1,1),0)$ từ C03; thuật toán E05.
- **Đầu ra:** đáp án: gradient mẫu $((1,0),1)$; $\widehat g$; $\theta^+$; mất mát nhóm $\tfrac{37}{16}\to1{,}9202$.
- **Vị trí trong khung:** kiểm tra bước 3 và bước 5.
- **LLO/CLO:** LLO12; CLO2.
- **Bước hành trình:** KN7 bài tập; KN4 bài tập chuyển giao.
- **Quyết định:** `thêm` — bài tập chuyển giao giữa lan truyền ngược và SGD.
- **Sửa 2026-10-12 (văn phong và mật độ):** `tách` — 73 → 52 âm tiết; gỡ `.dense`; tiêu đề “Bài tập: …” (viết đầy đủ “hạ gradient ngẫu nhiên”); câu 5 (phương sai nhóm ba mẫu) tách sang E06c; đáp án câu 1–4 lên mặt trang E06b. Tiêu đề cũ: “Một bước SGD trên mạng XOR”.
- **Sửa vòng tái kiểm 2026-10-12:** nêu lại dữ kiện mạng của ví dụ đồ thị tính toán. Câu 4 giữ nguyên để khớp Bài 7 của `exercises.md` (gợi ý đổi câu 4 của vai mạch kể không áp dụng).

### E06b. Bài tập: một bước hạ gradient ngẫu nhiên trên mạng XOR

- **Lý do tồn tại:** lời giải mẫu trên mặt trang cho bài tập chuyển giao KN4 → KN7.
- **Nhu cầu hoặc khoảng trống được lấp:** người học kiểm một bước SGD trên mạng: gradient mẫu thứ hai, gradient nhóm, $\theta^+$ và vai trò quy ước $\sigma'(0)$.
- **Đầu vào:** câu hỏi E06.
- **Đầu ra:** đáp án câu 1–4; mất mát trung bình nhóm $2{,}3125\to1{,}9202$.
- **Vị trí trong khung:** kiểm tra mạch 5.
- **LLO/CLO:** LLO11, LLO12; CLO1, CLO2.
- **Bước hành trình:** KN4, KN7 bài tập (lời giải).
- **Quyết định:** `tách` từ ghi chú E06; trùng câu 1–4 của Bài 7 trong `exercises.md`, lời giải khớp. Mật độ: 23 âm tiết (trang mới, 2026-10-12).
- **Sửa vòng tái kiểm 2026-10-12:** thêm $\nabla_{b_1}\ell=\delta_z$ (câu 1) và $\nabla_{W_1}$ trung bình (câu 2); khớp Bài 7.

### E06c. Bài tập: phương sai của gradient nhóm ba mẫu

- **Lý do tồn tại:** bài tập riêng cho Định lý 05c.53, có câu hỏi và lời giải (fragment) trên cùng trang.
- **Nhu cầu hoặc khoảng trống được lấp:** câu 5 cũ của E06 dùng dữ liệu khác (bốn điểm, mô hình $wx+c$) và làm trang E06 vượt trần.
- **Đầu vào:** Định lý 05c.53 (E04); dữ liệu bốn điểm.
- **Đầu ra:** $\operatorname{tr}\Sigma=\tfrac{23}4$, $\mathbb E\lVert\widehat g-\nabla F\rVert^2=\tfrac{23}{36}$.
- **Vị trí trong khung:** kiểm tra mạch 5.
- **LLO/CLO:** LLO12; CLO1.
- **Bước hành trình:** KN7 bài tập.
- **Quyết định:** `tách` từ E06 (73 âm tiết trước khi sửa); trùng câu 5 của Bài 7 trong `exercises.md`, lời giải khớp. Mật độ: 27 âm tiết (trang mới, 2026-10-12).
- **Sửa 2026-10-12 (rà soát thuật ngữ):** `sửa` — ghi chú “Độ lệch của bốn gradient mẫu” → “Sai lệch …”.

### F00. Tốc độ hội tụ dưới nhiễu và dừng sớm (trang tiêu đề mạch)

- **Lý do tồn tại:** trang tiêu đề mạch bắt buộc; đánh dấu ranh giới E06c → F01, từ một bước sang tốc độ sau $K$ bước.
- **Nhu cầu hoặc khoảng trống được lấp:** người học cần biết mạch mới hỏi dãy tiến tới đâu và khi nào dừng.
- **Đầu vào:** thuật toán nhóm nhỏ, phương sai $\operatorname{tr}\Sigma/b$ (mạch 5).
- **Đầu ra:** nhiệm vụ “tốc độ sau $K$ bước và quy tắc dừng” cho F01–F08b.
- **Vị trí trong khung:** điểm vào mạch 6; dòng dẫn nêu nhu cầu của KN8 và KN9.
- **LLO/CLO:** không đo trực tiếp; hỗ trợ mục tiêu 3 của A02.
- **Bước hành trình:** KN8 nhu cầu (cùng F01).
- **Quyết định:** `thêm` — theo yêu cầu người dùng. Mật độ: 35 âm tiết (trang mới, 2026-10-12).
- **Sửa vòng tái kiểm 2026-10-12:** dòng dẫn “Muốn chặn sai số của hạ gradient ngẫu nhiên sau $K$ bước và chọn thời điểm dừng.”; ghi chú mở bằng kết quả kế thừa.
- **Sửa 2026-10-22 (bỏ F02, F02b, F03):** `sửa` — từ khóa “Mức nhiễu nền · bước giảm dần · cận không lồi · ngân sách cố định · dừng sớm” → “Bất đẳng thức một bước · cận không lồi · ngân sách cố định · dừng sớm”; ghi chú: mạch nêu bất đẳng thức một bước và chứng minh, rồi định lý không lồi của Bài 05b, so sánh ngân sách và dừng sớm. 30 âm tiết.
- **Sửa 2026-10-22 (vòng 11, M11-5, S11-13):** `sửa` — dòng dẫn “Muốn chặn sai số …” → “Muốn chặn chuẩn gradient của hạ gradient ngẫu nhiên sau $K$ bước và chọn thời điểm dừng.”; ghi chú: “cận của hạ gradient đầy đủ và cận của nhóm nhỏ được đặt vào cùng một ngân sách tính toán”; phương sai “không quá $\operatorname{tr}\Sigma/b$”.

### F01. Nhiễu của gradient nhóm tại nghiệm

- **Lý do tồn tại:** một hiện tượng tính được tạo nhu cầu cho các định lý tốc độ: tại $\theta^*$ gradient đầy đủ bằng 0 còn gradient nhóm thì không, và một bước từ $\theta^*$ làm $F$ tăng theo kỳ vọng.
- **Nhu cầu hoặc khoảng trống được lấp:** E05 cho thuật toán; cần biết dãy lặp hội tụ theo nghĩa nào và điều gì của tính giảm còn giữ được, bắt đầu từ việc bước hằng không dừng tại $\theta^*$.
- **Đầu vào:** dữ liệu E03 tại $\theta^*$; E04; hình dùng lại, đường dẫn gốc `img/lec-05b/vda-sgd-bound-vs-exact.svg` (dữ liệu Ví dụ A của 05b, ghi rõ trên chú thích; sao chép vào `img/lec-06/` ở giai đoạn dựng deck).
- **Đầu ra:** $\operatorname{tr}\Sigma(\theta^*)=\tfrac52$; $\mathbb E\lVert\widehat g\rVert^2=\tfrac56$; một bước dời trung bình bình phương $\tfrac5{96}$; $\mathbb EF(\theta_1)=\tfrac{69}{128}>\tfrac12$, phản ví dụ cho “giảm theo kỳ vọng”; lý do chuyển sang Ví dụ A.
- **Vị trí trong khung:** mở phần tốc độ của bước 5; giới hạn của tính giảm khi gradient có nhiễu.
- **LLO/CLO:** LLO12; CLO1.
- **Bước hành trình:** KN8 nhu cầu + trực quan + ví dụ.
- **Quyết định:** `thêm` — nhu cầu của định lý phải là hiện tượng tính được trên ví dụ đã có; sau kiểm định storyboard, trang mang phản ví dụ $\tfrac{69}{128}$ và nói rõ dữ liệu của hình.
- **Sửa 2026-10-12 (văn phong và mật độ):** `tách` — 61 → 31 âm tiết; gỡ `.dense`; hình ví dụ ba quan sát chuyển sang F02b; câu kết thành “Kết luận:”; ghi chú bỏ đoạn về hình.
- **Sửa vòng tái kiểm 2026-10-12:** câu cuối thành “Trực quan.” (bước trực quan của KN8).
- **Sửa 2026-10-22 (vòng 11, S11-14, đóng S5):** `sửa` — thêm dòng đầu “Nhu cầu: chặn chuẩn gradient sau $K$ bước khi gradient có nhiễu.” Mật độ 41 âm tiết, 6 dòng, 1 công thức hiển thị; 452 px ở 1600×900.

### F01b. Bất đẳng thức một bước có số hạng nhiễu

- **Lý do tồn tại:** phát biểu bất đẳng thức một bước có số hạng nhiễu $\tfrac{L\eta^2}2\sigma^2$ trên trang riêng.
- **Nhu cầu hoặc khoảng trống được lấp:** F01 cho thấy $F$ tăng theo kỳ vọng tại nghiệm; cần công thức giải thích điều SGD còn giữ.
- **Đầu vào:** F01; gradient Lipschitz, không chệch, chặn phương sai.
- **Đầu ra:** bất đẳng thức; điều kiện giảm theo kỳ vọng.
- **Vị trí trong khung:** bước 5 (hình thức của tính giảm có nhiễu).
- **LLO/CLO:** LLO12; CLO1.
- **Bước hành trình:** KN8 hình thức.
- **Quyết định:** `tách` từ F02 (91 âm tiết trước khi sửa); bất đẳng thức là một bước trong chứng minh Định lý 05b.43. Mật độ: 28 âm tiết (trang mới, 2026-10-12).
- **Sửa vòng tái kiểm 2026-10-12:** “bảo đảm giảm theo kỳ vọng khi …” (điều kiện đủ, không phải “chỉ khi”).
- **Sửa 2026-10-22 (tách chứng minh):** `sửa` — yêu cầu người dùng 2026-10-22 “Thêm gợi ý chứng minh”; theo quyết định của master, chứng minh đặt ở trang riêng F01c. Mặt trang F01b không đổi (34 âm tiết theo bộ đếm token có chữ, bỏ công thức). Ghi chú bỏ phần kể lại chứng minh, nêu vai trò của bất đẳng thức (bước trong chứng minh Định lý 05b.43, giải thích phản ví dụ tại nghiệm) và vai trò của hai giả thiết; giữ phép kiểm tra số trên dữ liệu bốn điểm.
- **Sửa 2026-10-22 (tái kiểm vòng 8, M1, S3):** `sửa` — ghi chú đoạn 1 bỏ câu về vị trí trang, câu chỉ trang sau và liên hệ cộng theo $k$ (chỉ còn ở F01c); sửa ánh xạ giả thiết → số hạng: tính trơn cho cận trên bậc hai nên $L$ có mặt ở cả hai số hạng, tính không chệch cho $-\eta\lVert\nabla F\rVert^2$, chặn phương sai cho $\sigma^2$. Mặt trang không đổi (34 âm tiết).

### F01c. Chứng minh: bất đẳng thức một bước có số hạng nhiễu

- **Lý do tồn tại:** chứng minh bất đẳng thức của F01b theo bản phác của người dùng (2026-10-22): cận trên bậc hai, kỳ vọng có điều kiện, tách bình phương chuẩn, thế vào.
- **Nhu cầu hoặc khoảng trống được lấp:** F01b chỉ phát biểu kết quả; người học cần thấy mỗi giả thiết (gradient Lipschitz, không chệch, chặn phương sai) được dùng ở đâu, và vì sao số hạng nhiễu $\tfrac{L\eta^2}2\sigma^2$ xuất hiện.
- **Đầu vào:** F01b; cận trên bậc hai (Bổ đề 04.18 của Bài 04; dạng tổng quát đứng sau bổ đề giảm ở D04, với bước bất kỳ thay cho $-\eta\nabla F$); gradient nhóm $\widehat g_k$ của E05; giả thiết không chệch và chặn phương sai (E04, F01b).
- **Đầu ra:** chứng minh ba bước; công thức đóng khung lặp lại bất đẳng thức của F01b. Ghi chú: $\theta_k$ là hằng số khi biết $\theta_k$; nơi dùng từng giả thiết; đẳng thức $\mathbb E\lVert X\rVert^2=\lVert\mathbb EX\rVert^2+\mathbb E\lVert X-\mathbb EX\rVert^2$; lấy kỳ vọng toàn phần và cộng theo $k$ cho Định lý 05b.43.
- **Vị trí trong khung:** bước 5 (hình thức của tính giảm có nhiễu), phần chứng minh.
- **LLO/CLO:** LLO12; CLO1.
- **Bước hành trình:** KN8 hình thức (chứng minh).
- **Quyết định:** `thêm` — yêu cầu người dùng 2026-10-22; master quyết định đặt trang riêng vì CLAUDE.md đặt chứng minh dài hơn một dòng trên trang “Chứng minh: <kết quả>”, và bốn dòng thêm vào F01b sẽ vượt trần 3 công thức hiển thị, 6 dòng và khung 675 px. Thuật ngữ: bước 1 là “cận trên bậc hai”, không phải “bổ đề giảm” (bổ đề giảm là hệ quả cho gradient đầy đủ, D04). Mật độ: 25 âm tiết (trần 60), 6 dòng, 3 công thức hiển thị (trần 3), mỗi dòng ≤ 15; chiều cao nội dung 605/675 px ở 1600×900.
- **Sửa 2026-10-22 (tái kiểm vòng 8, S1, S2):** `sửa` — mặt trang: “biến số hạng chéo thành $\lVert\nabla F(\theta_k)\rVert^2$” → “biến $-\eta\nabla F(\theta_k)^\top\widehat g_k$ thành $-\eta\lVert\nabla F(\theta_k)\rVert^2$”; “số hạng chéo” chỉ còn dùng cho phép tách trong ghi chú. Ghi chú thêm câu về cận trên bậc hai (Bổ đề 04.18) là dạng tổng quát đứng sau bổ đề giảm. Mật độ: 22 âm tiết, 6 dòng, 3 công thức hiển thị.

### F04. Hạ gradient ngẫu nhiên cho hàm không lồi

- **Lý do tồn tại:** phát biểu lại T8 và hệ quả chọn bước, cùng phạm vi áp dụng cho mạng.
- **Nhu cầu hoặc khoảng trống được lấp:** mạng không thỏa H3 (B09, D02); cần bảo đảm thay cho T7 khi gradient đầy đủ được thay bằng gradient nhóm, và cần nói rõ bảo đảm đó áp dụng cho loại mạng nào.
- **Đầu vào:** T7 (D05); F01b, F01c (bất đẳng thức một bước; F02 trước 2026-10-22); T8 (05b, phần hạ gradient cho hàm không lồi); M1 và giới hạn về H2 với ReLU (outline.md, mục 4.3); hình tùy chọn `img/lec-05b/rates-log-error.svg` không dùng khi dựng deck.
- **Đầu ra:** cận $\frac{2\Delta_0}{\eta K}+L\eta\sigma^2$; $O(1/\sqrt K)$ cho trung bình kỳ vọng bình phương chuẩn gradient, $O(K^{-1/4})$ cho chuẩn (ghi chú); bảng $0{,}303$; $0{,}0285$; $0{,}00283$; phạm vi: hàm kích hoạt trơn hoặc mạng tuyến tính, với ReLU là định hướng; bảo đảm thuộc về dãy lặp, không thuộc tham số chọn theo tập xác thực.
- **Vị trí trong khung:** bước 5 (T8); bảo đảm có được của khối B3.
- **LLO/CLO:** LLO12; CLO1.
- **Bước hành trình:** KN8 hình thức.
- **Quyết định:** `thêm` — cần phát biểu lại tốc độ không lồi theo bình phương chuẩn gradient (điểm hòa giải 3), với giả thiết H2 trên tập chứa mọi dãy lặp và phạm vi ReLU trên mặt trang (kiểm định storyboard).
- **Sửa 2026-10-12 (văn phong và mật độ):** `tách` — 89 → 55 âm tiết; gỡ `.dense`; định lý phát biểu bằng lời (bỏ T8, H0, H2, H6, H6b) kèm (Định lý 05b.43); hệ quả chọn bước, số liệu và phạm vi chuyển sang F04b; thêm “Ý nghĩa:”.
- **Sửa vòng tái kiểm 2026-10-12:** nêu lại $\Delta_0$; “phương sai có điều kiện”; “$K$ lớn đòi hỏi bước hằng nhỏ hơn”.
- **Sửa 2026-10-22 (vòng 11, S11-5):** `sửa` — dòng chứng minh “Với $\eta\le1/L$, $1-\tfrac{L\eta}2\ge\tfrac12$; cộng bất đẳng thức một bước theo $k<K$, dùng $F(\theta_K)\ge F_{\inf}$.”; ghi chú “chứng minh đầy đủ ở Bài 05b”. Mật độ 60 âm tiết (trần 60), 5 dòng; 569 px.

### F04b. Bước hằng chọn theo số bước

- **Lý do tồn tại:** phát biểu hệ quả chọn bước (Hệ quả 05b.44) và đọc bậc $O(1/\sqrt K)$ bằng số.
- **Nhu cầu hoặc khoảng trống được lấp:** F04 cho cận phụ thuộc $\eta$; cần quy tắc chọn $\eta$ theo $K$ và phạm vi ReLU.
- **Đầu vào:** F04.
- **Đầu ra:** bước $\eta=\min\{1/L,\sqrt{2\Delta_0/(L\sigma^2K)}\}$, cận $O(1/\sqrt K)$, ba giá trị số, lưu ý ReLU.
- **Vị trí trong khung:** bước 5 (hệ quả).
- **LLO/CLO:** LLO12; CLO1.
- **Bước hành trình:** KN8 hình thức (hệ quả).
- **Quyết định:** `tách` từ F04 (89 âm tiết trước khi sửa). Mật độ: 32 âm tiết (trang mới, 2026-10-12).
- **Sửa vòng tái kiểm 2026-10-12:** thêm $\sigma>0$.
- **Sửa 2026-10-12 (rà soát thuật ngữ):** `sửa` — ghi chú “Ví dụ D của Bài 05b” → “ví dụ bậc bốn của Bài 05b”.

### F05. Tốc độ dưới ngân sách tính toán cố định

- **Lý do tồn tại:** điểm trung tâm của khối B3: đặt cận T7 và T8 vào cùng ngân sách số gradient mẫu.
- **Nhu cầu hoặc khoảng trống được lấp:** theo số bước, T8 chậm hơn T7; cần so trên cùng đơn vị chi phí để thấy SGD bị buộc bởi chi phí, và cần nói rõ luận điểm “đủ” dựa vào đâu.
- **Đầu vào:** E01, E02, D05, F04; $\sigma^2=\sigma_1^2/b$ (05c).
- **Đầu ra:** bảng hai quy mô với $\mathcal B=10n$ và cận hệ quả T8 đầy đủ; số hạng chính không phụ thuộc $b$; điểm chuyển trong khoảng $10^5$–$10^6$ (SNW Bảng 13.2, bậc độ lớn) làm chỉ báo bổ sung ở G03; phạm vi: $O(1/\sqrt K)$ trên $\lVert\nabla F\rVert^2$ là bảo đảm có được, luận điểm “đủ” dựa trên E02 (bài toán lồi) và tập xác thực (mạng), không dựa trên T8.
- **Vị trí trong khung:** so sánh dưới ngân sách cố định (bước 5); khép lý do tính toán.
- **LLO/CLO:** LLO11, LLO12; CLO1, CLO4.
- **Bước hành trình:** KN7 ứng dụng; KN8 ứng dụng; KN9 nhu cầu.
- **Quyết định:** `thêm` — luận đề yêu cầu trình bày SGD là phương án bị buộc bởi chi phí; sau kiểm định storyboard, dòng kết luận nêu phạm vi của luận điểm “đủ”.
- **Sửa 2026-10-12 (văn phong và mật độ):** `tách` — 97 → 30 âm tiết; gỡ `.dense`; dòng mở đầu rút gọn; kết luận về ngưỡng $\mathcal B<(n-b)^2/2$ chuyển sang F05b; cột SGD gọi “nhóm nhỏ”.

### F05b. Ngưỡng ngân sách giữa hai cận

- **Lý do tồn tại:** nêu kết luận của phép so sánh dưới ngân sách cố định: ngưỡng $\mathcal B<L\Delta_0(n-b)^2/(2\sigma_1^2)$, tức $(n-b)^2/2$ khi $L=\Delta_0=\sigma_1^2=1$.
- **Nhu cầu hoặc khoảng trống được lấp:** bảng F05 cho hai trường hợp; cần điều kiện tổng quát và lưu ý “so sánh cận trên”.
- **Đầu vào:** F05.
- **Đầu ra:** ngưỡng tổng quát và dạng với hằng số bằng $1$, ví dụ $n=10^3$, $b=10$ cho $490\,050$; mức chính xác do tập xác thực quyết định.
- **Vị trí trong khung:** ứng dụng của bước 5; nhu cầu của dừng sớm.
- **LLO/CLO:** LLO12; CLO4.
- **Bước hành trình:** KN8 ứng dụng; KN9 nhu cầu.
- **Quyết định:** `tách` từ F05 (97 âm tiết trước khi sửa); điều kiện ngân sách giữ nguyên. Mật độ: 48 âm tiết (trang mới, 2026-10-12).
- **Sửa vòng tái kiểm 2026-10-12:** ngưỡng tổng quát $\mathcal B<L\Delta_0(n-b)^2/(2\sigma_1^2)$; dạng $(n-b)^2/2$ ghi kèm giả thiết $L=\Delta_0=\sigma_1^2=1$ trên mặt trang; 50 âm tiết.
- **Sửa 2026-10-12 (rà soát thuật ngữ):** `sửa` — “dưới cỡ $n/2$” → “dưới khoảng $n/2$” (47 → 47); ghi chú bỏ “cỡ”.

### F06. Dừng sớm theo tập xác thực

- **Lý do tồn tại:** nêu quy tắc dừng sớm sau trực quan về đường mất mát huấn luyện và xác thực.
- **Nhu cầu hoặc khoảng trống được lấp:** E02 và F05 cho thấy không cần cực tiểu chính xác và mức đủ dùng phải được quyết định bằng dữ liệu; cần quy tắc vận hành xác định điểm dừng.
- **Đầu vào:** E02, F05; tập xác thực và tập kiểm thử của Bài 05 HQ05a (dẫn lại, không định nghĩa lại); quan sát số về dừng sớm ở Bài 05 KL01; quy tắc lưu tham số tốt nhất của E05; hình dùng lại, đường dẫn gốc `img/lec-06b/risk-curves.svg`.
- **Đầu ra:** quy tắc dừng (chu kỳ $s$, ngưỡng kiên nhẫn $r$, trả về tham số tốt nhất); nhận xét tham số trả về nhắm tới $R$, khác dãy lặp mà T8 bảo đảm.
- **Vị trí trong khung:** quy tắc dừng sớm (bước 5); khép lý do thống kê.
- **LLO/CLO:** LLO11; CLO1, CLO2.
- **Bước hành trình:** KN9 trực quan + hình thức (quy tắc).
- **Quyết định:** `thêm` — tách từ F05 cũ theo kiểm định storyboard; dừng sớm phải được trình bày là đánh giá trên dữ liệu xác thực, không phải thất bại hội tụ; dẫn tập xác thực của Bài 05 HQ05a (điểm hòa giải 5).
- **Sửa 2026-10-12 (văn phong và mật độ):** `tách` — 84 → 53 âm tiết; gỡ `.dense`; trang giữ trực quan, nhắc lại định nghĩa của Bài 05 và nhu cầu đánh giá thưa; quy tắc chuyển sang F06b dưới nhãn “Thuật toán.”.
- **Sửa 2026-10-12 (rà soát thuật ngữ):** `sửa` — “đạt đáy rồi tăng” → “giảm tới cực tiểu rồi tăng” (A4). 52 → 54 âm tiết. Tập xác thực từ nay được nhắc lại trên mặt trang A04 (B5, phương án 1), nên ghi chú dẫn Bài 05 giữ nguyên; ghi chú thêm dừng sớm (early stopping).

### F06b. Thuật toán dừng sớm

- **Lý do tồn tại:** phát biểu quy tắc dừng sớm dưới nhãn “Thuật toán.” với đầu vào, ba bước, đầu ra.
- **Nhu cầu hoặc khoảng trống được lấp:** F06 cho trực quan và nhắc định nghĩa của Bài 05; cần thủ tục có chu kỳ đánh giá và ngưỡng kiên nhẫn cho SGD.
- **Đầu vào:** F06.
- **Đầu ra:** thuật toán với $s$, $r$, $\widehat R$.
- **Vị trí trong khung:** bước 5 (phương pháp: dừng sớm).
- **LLO/CLO:** LLO11; CLO1, CLO2.
- **Bước hành trình:** KN9 hình thức.
- **Quyết định:** `tách` từ F06 (84 âm tiết trước khi sửa). Mật độ: 46 âm tiết (trang mới, 2026-10-12).
- **Sửa 2026-10-12 (rà soát thuật ngữ):** `sửa` — ghi chú thêm “ngưỡng kiên nhẫn (patience)”.
- **Sửa 2026-10-22 (vòng 11, S11-4):** `sửa` — chỉ ghi chú: “… là ví dụ tỉ lệ giữ” → “… ở trang so sánh dừng sớm với chính quy hóa”.

### F07. Dừng sớm so với chính quy hóa

- **Lý do tồn tại:** so sánh định lượng tỉ lệ giữ của dừng sớm và của chính quy hóa $\ell_2$ trên mục tiêu bậc hai.
- **Nhu cầu hoặc khoảng trống được lấp:** F06 cho quy tắc nhưng chưa giải thích vì sao dừng sớm tác động như chính quy hóa; luận đề cần quan hệ này để coi dừng sớm là một phần của phương pháp.
- **Đầu vào:** F06; chính quy hóa $\ell_2$ (Bài 05 khối A2); DL §7.8, (7.43)–(7.45); phân chia nguồn với Bài 05 KL01 (KL01 chỉ nêu quan sát số và tên DL §7.8; phép so sánh định lượng thuộc F07); hình mới `early-stopping-shrinkage.svg`. (Hình `early-stopping-shrinkage.svg` thuộc F07b từ 2026-10-12; đã thay 2026-10-22.)
- **Đầu ra:** bảng tỉ lệ giữ theo trị riêng $\alpha$ với $\eta=0{,}5$, $k=20$, $\lambda=0{,}1$; dòng “Diễn giải:”. Nhận xét $\lambda\approx1/(\eta k)$ và hình `early-stopping-shrinkage.svg` thuộc F07b từ 2026-10-12 (ghi chú cũ “nhận xét” ở đây đã thay 2026-10-22).
- **Vị trí trong khung:** quan hệ dừng sớm và chính quy hóa (bước 5).
- **LLO/CLO:** LLO11; CLO1, CLO2.
- **Bước hành trình:** KN9 ví dụ dẫn nhập (nhận xét và phạm vi ở F07b).
- **Quyết định:** `thêm` — tách từ F05 cũ theo kiểm định storyboard để mỗi trang một luận điểm; trị riêng viết $\alpha$, hệ số chính quy hóa viết $\lambda$ như Bài 05.
- **Sửa 2026-10-12 (văn phong và mật độ):** `tách` — 59 → 45 âm tiết; gỡ `.dense`; trang thành “Ví dụ: …” với nhãn “Thiết lập.” bỏ đi; nhận xét, ý nghĩa, phạm vi và hình chuyển sang F07b. Tiêu đề cũ: “Dừng sớm và chính quy hóa $\ell_2$ trên mục tiêu bậc hai”.
- **Sửa 2026-10-12 (rà soát thuật ngữ):** `sửa` — “với chính quy hóa hệ số $\lambda$” → “với cực tiểu của mục tiêu cộng thêm $\tfrac\lambda2\lVert\theta\rVert^2$” (B10: $F_\lambda$ chỉ định nghĩa ở G01). 44 → 46 âm tiết. Ghi chú: tỉ lệ giữ còn gọi là hệ số co (shrinkage factor).
- **Sửa 2026-10-22 (tiêu đề):** `sửa` — yêu cầu người dùng 2026-10-22, đúng nguyên văn: tiêu đề cũ “Ví dụ: tỉ lệ giữ của dừng sớm và chính quy hóa $\ell_2$” → “Dừng sớm so với chính quy hóa”. Trang vẫn là trang ví dụ về chức năng (dữ kiện, phép tính, dòng “Diễn giải:” ở cuối); tiền tố “Ví dụ:” bỏ theo yêu cầu người dùng. Mặt trang khác và ghi chú không đổi.
- **Sửa 2026-10-22 (vòng 11, S11-2, S11-3):** `sửa` — nhãn “Ví dụ.” trước “Tính hai tỉ lệ …”; dòng “Diễn giải:” thành “với $\alpha=0{,}01$, dừng sau $20$ bước giữ gần như $\lambda=0{,}1$; chọn $k$ đóng vai chọn $\lambda$” (“co như” → “giữ gần như” theo S11-16) (bản dài hơn của brief làm trang 712 px, vượt khung; rút gọn còn 671/675 px). Hình và nhận xét $\lambda\approx1/(\eta k)$ thuộc F07b.

### F07b. Tương ứng giữa số bước dừng và hệ số chính quy hóa

- **Lý do tồn tại:** nhận xét tổng quát về tương đương gần đúng giữa dừng sớm và chính quy hóa $\ell_2$, kèm hình tỉ lệ giữ theo $k$.
- **Nhu cầu hoặc khoảng trống được lấp:** F07 cho bảng số; cần điều kiện $\lambda\approx1/(\eta k)$, $\eta\alpha\ll1$, $\alpha\ll\lambda$ và phạm vi.
- **Đầu vào:** F07.
- **Đầu ra:** nhận xét, ý nghĩa, lưu ý phạm vi; hình.
- **Vị trí trong khung:** bước 5 (quan hệ dừng sớm và chính quy hóa).
- **LLO/CLO:** LLO11; CLO1.
- **Bước hành trình:** KN9 hình thức và ứng dụng.
- **Quyết định:** `tách` từ F07 (59 âm tiết, nhưng có nhãn “Thiết lập.” không trong danh sách và dòng 32 âm tiết); giữ tiêu đề cũ của F07. Mật độ: 47 âm tiết (trang mới, 2026-10-12).
- **Sửa vòng tái kiểm 2026-10-12:** “Trực quan.” đứng trước “Nhận xét.” (thay “Ý nghĩa:”).
- **Sửa 2026-10-22 (vòng 11, S11-1, S11-4):** `sửa` — tiêu đề “Dừng sớm và chính quy hóa $\ell_2$ trên mục tiêu bậc hai” → “Tương ứng giữa số bước dừng và hệ số chính quy hóa” (khớp “Nhận xét.” $\lambda\approx1/(\eta k)$ và “Lưu ý:” $k\leftrightarrow1/(\eta\lambda)$); ghi chú “Trong bảng của ví dụ” → “Trong bảng của trang trước”.

### F08. Bài tập: bất đẳng thức một bước, cận không lồi và dừng sớm

- **Lý do tồn tại:** trang kiểm tra riêng của mạch F.
- **Nhu cầu hoặc khoảng trống được lấp:** đo khả năng dùng bất đẳng thức một bước, hệ quả T8 và tỉ lệ giữ của dừng sớm (trước: “T5, T6, hệ quả T8 …”, đã thay 2026-10-22).
- **Đầu vào:** F01b, F04, F04b, F07 (F02, F03 trước 2026-10-22).
- **Đầu ra:** đáp án: $\eta<\tfrac23$; $K=80\,400$; tỉ lệ giữ $0{,}401$ và $0{,}5$ tại $k=10$ (trước: so sánh hai lịch bước; $0{,}6415$ tại $k=20$; đã thay 2026-10-22).
- **Vị trí trong khung:** kiểm tra bước 5.
- **LLO/CLO:** LLO12; CLO1.
- **Bước hành trình:** KN8, KN9 bài tập.
- **Quyết định:** `thêm` — mỗi mạch có trang kiểm tra riêng (F06 trong bản 43 trang).
- **Sửa 2026-10-12 (văn phong và mật độ):** `tách` — 63 → 41 âm tiết; gỡ `.dense`; tiêu đề “Bài tập: …”; ba câu rút gọn, bỏ mã T5, T8; đáp án lên mặt trang F08b. Tiêu đề cũ: “Lịch bước, cận không lồi và dừng sớm”.
- **Sửa 2026-10-22 (bỏ F02, F02b, F03):** `sửa` — tiêu đề “Bài tập: lịch bước, cận không lồi và dừng sớm” → “Bài tập: bất đẳng thức một bước, cận không lồi và dừng sớm” (một dòng ở 1600×900); câu 1 (ví dụ ba quan sát) thay bằng “Với $L=\sigma^2=1$ và $\lVert\nabla F(\theta_k)\rVert^2=\tfrac12$: tìm mọi $\eta>0$ để bất đẳng thức một bước bảo đảm giảm theo kỳ vọng.”; gợi ý câu 1 đổi theo. Câu 2, 3 giữ. 42 âm tiết, 4 dòng.
- **Sửa 2026-10-22 (vòng 11, S11-6):** `sửa` — câu 3: $k=20$ → $k=10$ để không trùng hàng giữa của F07; gợi ý câu 3 xét ba điều kiện.

### F08b. Bài tập: bất đẳng thức một bước, cận không lồi và dừng sớm

- **Lý do tồn tại:** lời giải mẫu trên mặt trang cho bài tập của cụm KN8–KN9.
- **Nhu cầu hoặc khoảng trống được lấp:** người học kiểm điều kiện giảm theo kỳ vọng của bất đẳng thức một bước, phép tính $K$ theo hệ quả và tỉ lệ giữ (trước: so sánh hai lịch bước; đã thay 2026-10-22).
- **Đầu vào:** câu hỏi F08.
- **Đầu ra:** đáp án ba câu: $\eta<\tfrac23$; $K=80\,400$; $0{,}401$ và $0{,}5$ tại $k=10$ (trước: hai lịch bước, $0{,}642$; đã thay 2026-10-22).
- **Vị trí trong khung:** kiểm tra cuối mạch 6.
- **LLO/CLO:** LLO11, LLO12; CLO1, CLO2.
- **Bước hành trình:** KN8, KN9 bài tập (lời giải).
- **Quyết định:** `tách` từ ghi chú F08; dữ kiện khác Bài 9 của `exercises.md` (bản 2026-10-22: câu 1 dùng $\lVert\nabla F\rVert^2=1$ thay $\tfrac12$; ngưỡng $0{,}02$; $\alpha=0{,}05$; trước: $k=15, 30$, đã thay), nên không phải cùng bài; đáp án khớp ghi chú cũ. Mật độ: 26 âm tiết (trang mới, 2026-10-12).
- **Sửa 2026-10-22 (bỏ F02, F02b, F03):** `sửa` — tiêu đề như F08; lời giải 1: “$-\eta(1-\tfrac\eta2)\tfrac12+\tfrac{\eta^2}2<0$ khi và chỉ khi $\eta<\tfrac23$.”; ghi chú câu 1: phép biến đổi $\tfrac\eta2(\tfrac{3\eta}2-1)$ thay phần ví dụ ba quan sát. 17 âm tiết.
- **Sửa 2026-10-22 (vòng 11, S11-6, M11-3 = S11-15):** `sửa` — lời giải 3: “Dừng sớm $1-0{,}95^{10}\approx0{,}401$, chính quy hóa $0{,}5$; $\lambda\ne1/(\eta k)=0{,}2$ và $\alpha/\lambda=1$ không nhỏ.”; ghi chú câu 3 với giá trị chính xác $0{,}40126$; ghi chú câu 1: “Khi đó $\mathbb E[F(\theta_{k+1})\mid\theta_k]$ vẫn có thể nhỏ hơn $F(\theta_k)$, vì bất đẳng thức chỉ là một cận trên.”

### G00. Tổng hợp và lựa chọn phương pháp (trang tiêu đề mạch)

- **Lý do tồn tại:** trang tiêu đề mạch bắt buộc; đánh dấu ranh giới F08b → G01, từ kết quả từng phần sang tổng hợp.
- **Nhu cầu hoặc khoảng trống được lấp:** người học cần biết mạch cuối khép luận đề và đưa ra quy tắc chọn phương pháp.
- **Đầu vào:** kết quả của mạch 2–6.
- **Đầu ra:** nhiệm vụ “chọn phương pháp theo chi phí một bước, giả thiết và bảo đảm hội tụ” cho G01–G04 (sửa 2026-10-21; trước: “theo $n$, $p$ và tính lồi”).
- **Vị trí trong khung:** điểm vào mạch 7.
- **LLO/CLO:** không đo trực tiếp; hỗ trợ mục tiêu 3 của A02.
- **Bước hành trình:** ngoài hành trình khái niệm (tổng hợp).
- **Quyết định:** `thêm` — theo yêu cầu người dùng. Mật độ: 33 âm tiết (trang mới, 2026-10-12).
- **Sửa vòng tái kiểm 2026-10-12:** ghi chú mở bằng kết quả kế thừa.
- **Sửa 2026-10-21 (đồng bộ mục tiêu 3):** `sửa` — dòng dẫn “Nhu cầu: chọn phương pháp theo chi phí một bước, giả thiết và bảo đảm hội tụ.” (17 âm tiết, trần 25) thay “theo số mẫu $n,$ số tham số $p$ và tính lồi”; ghi chú: quy tắc chọn theo chi phí một bước (phụ thuộc $n$, $p$, $b$), giả thiết và bảo đảm hội tụ. 30 âm tiết.

### G01. Điều không còn giữ được và điều còn giữ được

- **Lý do tồn tại:** khép luận đề ở dạng “mất gì, giữ gì” với nhãn kết quả, quay lại đúng bảng A03.
- **Nhu cầu hoặc khoảng trống được lấp:** bốn vấn đề nêu ở A03 cần câu trả lời có tham chiếu tới kết quả, không chỉ danh sách chủ đề.
- **Đầu vào:** A03; Mệnh đề 3, D01, D03, D04, F01, F01b, T7, T8, Định lý 05c.52, 05c.53, F06 (F02, T5, T6 bỏ khỏi deck 2026-10-22).
- **Đầu ra:** bảng bốn dòng (cùng thứ tự với A03; Bài 05 KL04 cũ, bỏ 2026-10-15) đối chiếu điều mất, điều kiện mất ((i) chi phí, (ii) biểu diễn) và điều còn giữ, nhãn kết quả ghi bằng tên kết quả, không bằng mã trang; dòng tính giảm nêu đúng: giảm mỗi bước với gradient đầy đủ, bất đẳng thức có số hạng nhiễu với SGD; dòng bảo đảm nêu điều kiện $F$ trơn và việc bảo đảm thuộc về dãy lặp; đầu vào của G02.
- **Vị trí trong khung:** tổng hợp và giới hạn áp dụng.
- **LLO/CLO:** LLO11; CLO1.
- **Bước hành trình:** tổng hợp, không thuộc cụm riêng.
- **Quyết định:** `thêm` — luận đề yêu cầu kết luận dạng “mất gì, giữ gì” có nhãn kết quả; tiêu đề theo Bài 05 KL04; dòng tính giảm sửa theo kiểm định storyboard.
- **Sửa 2026-10-15 (rà soát mạch 5 Bài 05):** chỉ ghi chú; bỏ câu "cùng cách viết với bảng kết luận của Bài 05", câu về nhãn "không lồi" của bảng Bài 05 và ánh xạ $\tau^2$ (Bài 05) ↔ $\sigma^2$, vì KL04, KL04a bỏ khỏi deck Bài 05. Bảng G01 là nơi duy nhất phát biểu điều mất và điều còn giữ.
- **Sửa 2026-10-12 (văn phong và mật độ):** `tách` — 134 → 75 âm tiết; gỡ `.dense`; bảng bốn dòng chia hai trang: G01 (Đích, Tốc độ tuyến tính) và G01b (Cực tiểu toàn cục, Chi phí); bỏ mã T5–T8 trong ô (tên kết quả ở ghi chú); số liệu lân cận $\mathbb E\lVert\theta_k-\theta^*\rVert^2$ có bậc $\eta\sigma^2/\mu$ giữ nguyên. Ngoại lệ trần 60: bảng so sánh, trần 80.
- **Sửa vòng tái kiểm 2026-10-12:** dòng điều kiện giữ nhãn “(i) chi phí”, “(ii) biểu diễn” như A03 (ghi chú nêu Bài 05 KL04 gọi (ii) là “không lồi”, cùng nội dung); “Gradient đầy đủ, $\eta\le1/L$: $F$ không tăng (bổ đề giảm)”; “(đã mất ở Bài 05)” chuyển xuống ghi chú; 76 âm tiết.
- **Sửa 2026-10-12 (rà soát thuật ngữ):** `sửa` — ô “Sai số giảm theo cấp số nhân (hội tụ tuyến tính), tất định (Bài 05; khi (i) hoặc (ii))” (B11); để giữ trần 80, dòng mở bỏ chữ “nhỏ” (“gradient nhóm thay gradient đầy đủ”) và ô phải viết “$\limsup_k\mathbb E\lVert\theta_k-\theta^*\rVert^2\le\eta\sigma^2/\mu$” thay “… cỡ $\eta\sigma^2/\mu$”. 74 → 79 âm tiết. Ghi chú “Bài 05 KL04” → “bảng kết luận của Bài 05”, bỏ “cỡ”.
- **Sửa 2026-10-21 (mật độ):** `sửa` — ô “Mục tiêu là nghiệm tối ưu của $F$” → “Mục tiêu: nghiệm tối ưu của $F$”, “Mục tiêu là $R$ nhỏ:” → “Mục tiêu: $R$ nhỏ;”. Mật độ: 80 âm tiết theo bộ đếm token có chữ (dòng dẫn 18, bảng 62; trần 80 của bảng so sánh); dòng dẫn giữ nguyên.
- **Sửa 2026-10-21 (vòng 6):** `sửa` — ô phải bỏ “Mục tiêu:” thứ hai (“$R$ nhỏ; …”); ô bước hằng thêm điều kiện “bước hằng $\eta\le1/L$ tới lân cận”. Mật độ: 78 âm tiết (trần 80).
- **Sửa 2026-10-22 (U2):** `sửa` — ô phải “$F$ chỉ thay thế cho $R;$” → “$F$ chỉ ước lượng $R;$”; ghi chú “$F$ chỉ thay thế cho $R$, nên …” → “$F$ chỉ ước lượng $R$, nên …”, khớp tiêu đề mới của E02. Mật độ: 77 âm tiết (trần 80).
- **Sửa 2026-10-22 (bỏ F02, F02b, F03):** `sửa` — ô phải dòng 2 bỏ vế lồi mạnh của gradient nhóm: “Gradient đầy đủ, $\eta\le1/L$: $F$ không tăng (bổ đề giảm). Gradient nhóm: bất đẳng thức một bước với số hạng nhiễu $\tfrac{L\eta^2}2\sigma^2$”; ghi chú đoạn 2 bỏ Định lý 05b.39, 05b.36 và mức nhiễu nền, chỉ giữ việc tốc độ tuyến tính mất dưới (i) hoặc (ii). 76 âm tiết (trần 80).

### G01b. Điều không còn giữ được và điều còn giữ được

- **Lý do tồn tại:** hai dòng cuối của bảng “mất gì, giữ gì” (cực tiểu toàn cục, chi phí), cùng thứ tự với A03 (Bài 05 KL04 cũ, bỏ 2026-10-15).
- **Nhu cầu hoặc khoảng trống được lấp:** bảng bốn dòng trên một trang vượt trần 80 của bảng so sánh.
- **Đầu vào:** G01; Mệnh đề 3, Định lý 05b.41, 05b.43, 05c.53.
- **Đầu ra:** dòng 3–4 của bảng; lưu ý ReLU.
- **Vị trí trong khung:** tổng hợp và giới hạn áp dụng.
- **LLO/CLO:** LLO11; CLO1.
- **Bước hành trình:** tổng hợp, không thuộc cụm riêng.
- **Quyết định:** `tách` từ G01 (134 âm tiết trước khi sửa); cùng tiêu đề với G01 theo quy tắc trang tiếp nối. Mật độ: 47 âm tiết (trang mới, 2026-10-12).
- **Sửa vòng tái kiểm 2026-10-12:** ghi chú gọi tên dòng (“dòng cực tiểu toàn cục”, “dòng chi phí”).
- **Sửa 2026-10-21 (đồng bộ G00):** `sửa` — chỉ ghi chú: câu cuối “quy tắc theo $n$, $p$ và tính lồi” → quy tắc chọn theo chi phí một bước, giả thiết và bảo đảm hội tụ; $n$, $p$ quyết định chi phí một bước, tính lồi là giả thiết. Mặt trang không đổi.

### G02. Lựa chọn giữa hạ gradient đầy đủ, Newton và SGD

- **Lý do tồn tại:** biến các kết quả thành bảng quyết định có điều kiện áp dụng.
- **Nhu cầu hoặc khoảng trống được lấp:** CLO4 yêu cầu chọn thuật toán theo dạng bài toán; G01 chưa cho quy tắc chọn.
- **Đầu vào:** G01; E01, F05; Newton (Bài 04; Bài 05, phần độ cong và chi phí); T1, T2 (05b).
- **Đầu ra:** bảng năm tình huống theo $(n,p)$ và tính lồi, với dòng (2) ghi “lồi mạnh và trơn” cho tốc độ tuyến tính, dòng (4), (5) ghi điều kiện $F$ trơn và phạm vi ReLU; hằng số Hessian viết $m_H,M_H,L_H$ trong ghi chú.
- **Vị trí trong khung:** bước 6 của chuỗi (lựa chọn phương pháp).
- **LLO/CLO:** LLO15 (chi phí Newton), LLO12; CLO4.
- **Bước hành trình:** ứng dụng tổng hợp KN7, KN8, KN9.
- **Quyết định:** `thêm` — cần bảng quyết định theo $(n,p)$ và tính lồi; dòng Newton phát biểu theo Bài 05 CP04 (Định lý 4, số bước của Newton) (điểm hòa giải 2); câu hỏi vận dụng chuyển sang G03 theo kiểm định storyboard.
- **Sửa 2026-10-12 (văn phong và mật độ):** `sửa` — 82 → 72 âm tiết; gỡ `.dense`; bỏ mã T2, T6, T7, T8 trong ô; bỏ chú “(so sánh dưới ngân sách cố định)”. Ngoại lệ: bảng so sánh 5 hàng, 72 âm tiết dưới trần 80; bộ đo đếm 8 dòng theo số ô chữ, ghi ngoại lệ vì bảng quyết định cần đủ năm tình huống.
- **Sửa vòng tái kiểm 2026-10-12:** dòng 4 ghi “$O(1/\sqrt K)$, trung bình theo $k$”, bước “$\eta$ theo $K$”; dòng 5 “không lồi, $\mathcal B>\mathcal B^*$ (so sánh dưới ngân sách cố định)”, chú thích dưới bảng $\mathcal B^*=L\Delta_0(n-b)^2/(2\sigma_1^2)$, “dòng 4–5 cần $F$ trơn; ReLU: định hướng” (bảng ghi ngưỡng ngay trong ô làm trang tràn khung 16:9: 744 px); 78 âm tiết, cao 658/675 px.
- **Sửa 2026-10-12 (rà soát thuật ngữ):** `sửa` — “quét hết dữ liệu” → “toàn bộ $n$ mẫu” (A3; bản “… mỗi bước” làm ô ba dòng và bảng vượt khung, cột đã tên “Mỗi bước”). 77 → 76 âm tiết. Ghi chú bỏ “cỡ”.
- **Sửa 2026-10-22 (bỏ F02, F02b, F03):** `sửa` — bỏ dòng 3 (“$n$ lớn; lồi mạnh”, SGD bước $\tfrac1{\mu(k+1)}$); chú thích “dòng 4–5” → “dòng 3–4”; ghi chú đánh số lại và bỏ câu về Định lý 05b.39. Dòng Newton và hạ gradient đầy đủ giữ “lồi mạnh” (nhắc lại từ Bài 04, 05). 67 âm tiết.
- **Sửa 2026-10-22 (vòng 11, M11-2):** `sửa` — chỉ ghi chú: thêm “(Bổ đề 05b.8(b))”.

### G03. Tổng kết theo mục tiêu học tập

- **Lý do tồn tại:** bảng tổng kết “kết quả | giả thiết không được bỏ | công thức hoặc thuật toán” mà AGENTS.md (mục Mở bài và kết bài) yêu cầu cho mạch kết luận, một dòng cho mỗi mục tiêu của A02.
- **Nhu cầu hoặc khoảng trống được lấp:** người học cần thấy ba kết quả chính cùng giả thiết không được bỏ (tính bị chặn dưới, gradient Lipschitz, $\eta\le1/L$, nhóm độc lập, chặn phương sai) trước khi tự kiểm ở G04.
- **Đầu vào:** A02; Mệnh đề 3; thuật toán lan truyền ngược; Định lý 05b.41, 05b.43, 05c.53; G01, G01b, G02.
- **Đầu ra:** ba dòng tổng kết có giả thiết và công thức; đầu vào của G04.
- **Vị trí trong khung:** khép bài.
- **LLO/CLO:** LLO11, LLO12; CLO1, CLO4.
- **Bước hành trình:** tổng hợp, không thuộc cụm riêng.
- **Quyết định:** `tách` — trang cũ gộp tổng kết, câu hỏi tự kiểm tra và tài liệu đọc; câu hỏi và tài liệu đọc chuyển sang G04, câu hỏi vận dụng bảng G02 nằm ở G04 câu 1.
- **Sửa 2026-10-12 (văn phong và mật độ):** `tách` — 123 → 74 âm tiết; gỡ `.dense`; thành bảng tổng kết “kết quả | giả thiết không được bỏ | công thức hoặc thuật toán” theo AGENTS.md mục Mở bài và kết bài; câu hỏi tự kiểm tra và tài liệu đọc chuyển sang G04. Trần 80 của trang tổng kết. Tiêu đề cũ: “Tổng kết, câu hỏi tự kiểm tra và tài liệu đọc”.
- **Sửa vòng tái kiểm 2026-10-12:** cột giả thiết thêm $F$ bị chặn dưới, $\eta\le1/L$; dòng 3 “như dòng trên”; 80 âm tiết (trần 80).
- **Sửa 2026-10-21 (đồng bộ A02):** `sửa` — chỉ ghi chú: câu cuối thay bằng hai câu ứng với mục tiêu 2 (gốc của mạng tuyến tính một đơn vị, một điểm yên ngựa) và mục tiêu 3 (chọn theo chi phí, giả thiết và bảo đảm hội tụ, tổng kết ở bảng lựa chọn phương pháp). Mặt trang không đổi; ba dòng vẫn ứng từng dòng với ba mục tiêu.
- **Sửa 2026-10-22 (bỏ F02, F02b, F03):** `sửa` — chỉ ghi chú: dòng 3 bỏ vế lồi mạnh (mức nhiễu nền, bước giảm dần). Mặt trang không đổi (683 px ở 1600×900 như trước).

### G04. Câu hỏi tự kiểm tra và tài liệu đọc

- **Lý do tồn tại:** bốn câu hỏi tự kiểm tra (đáp án trong ghi chú) và danh mục đọc.
- **Nhu cầu hoặc khoảng trống được lấp:** G03 nay là bảng tổng kết; câu hỏi và tài liệu đọc cần trang riêng để không vượt trần.
- **Đầu vào:** G02, G03.
- **Đầu ra:** bốn câu hỏi; tài liệu đọc.
- **Vị trí trong khung:** khép bài.
- **LLO/CLO:** LLO11, LLO12, LLO15; CLO4.
- **Bước hành trình:** bài tập vận dụng tổng hợp KN7–KN9 (tự làm, đáp án trong ghi chú).
- **Quyết định:** `tách` từ G03 (123 âm tiết trước khi sửa); câu hỏi trùng Bài 11 của `exercises.md`, đáp án trong ghi chú khớp lời giải Bài 11. Trần 80 của trang tổng kết. Mật độ: 77 âm tiết (trang mới, 2026-10-12).
- **Sửa 2026-10-12 (rà soát thuật ngữ):** `sửa` — “ch. 13” → “chương 13”; ghi chú “Đáp án 1.–4.” → “Lời giải: câu 1, …”, “Câu 2–4”; bỏ “cỡ”; “sai số dư” → “sai số vượt”.
- **Sửa 2026-10-21 (đồng bộ mục tiêu 3):** `sửa` — chỉ ghi chú: lời giải câu 1 nêu cho mỗi trường hợp (a)–(c) chi phí một bước, giả thiết và bảo đảm hội tụ. Mặt trang không đổi.
- **Sửa 2026-10-22 (bỏ F02, F02b, F03):** `sửa` — câu 4 “Nêu khi nào bước hằng hợp lý dù có mức nhiễu nền.” → “Nêu giới hạn của cận không lồi khi $K\to\infty$ với $\eta$ cố định và cách chọn $\eta$ theo $K$.”; lời giải câu 4 (cận tiến về $L\eta\sigma^2$; $\eta\propto1/\sqrt K$ theo Hệ quả 05b.44 cho $O(1/\sqrt K)$); lời giải câu 1(b) chuyển sang bảo đảm không lồi (Hệ quả 05b.44) với đủ giả thiết, thêm $F-F^*\le\lVert\nabla F\rVert^2/(2\mu)$ cho mục tiêu lồi mạnh. 72 âm tiết; chiều cao 474 px.
- **Sửa 2026-10-22 (vòng 11, M11-2, M11-4, S11-12):** `sửa` — câu 4 “Nêu giá trị giới hạn của vế phải cận không lồi khi $K\to\infty$ với $\eta$ cố định, và cách chọn $\eta$ theo $K$.”; ghi chú 1(b) thêm “(Bổ đề 05b.8(b))” và “(so bậc cho SGD trên hàm lồi mạnh)”. 76 âm tiết; 514 px.

## Trang đã bỏ (2026-10-22)

Ba mục dưới đây không còn trong deck; giữ để truy vết.

### F02. Mức nhiễu nền của bước hằng

- **Lý do tồn tại:** phát biểu bất đẳng thức một bước có số hạng nhiễu và định lý T5 của 05b, kèm số của Ví dụ A.
- **Nhu cầu hoặc khoảng trống được lấp:** định lượng hiện tượng F01: điều còn giữ của tính giảm là bất đẳng thức có số hạng $\tfrac{L\eta^2}2\sigma^2$, và với lồi mạnh, bước hằng chỉ đưa kỳ vọng sai số về mức nhiễu nền.
- **Đầu vào:** F01; cận trên bậc hai và H6b; T5 (05b, phần SGD cho hàm lồi mạnh); Ví dụ A; hình tùy chọn `img/lec-05b/step-halving-schedule.svg` không dùng khi dựng deck.
- **Đầu ra:** $\mathbb E[F(\theta_{k+1})\mid\theta_k]\le F(\theta_k)-\eta(1-\tfrac{L\eta}2)\lVert\nabla F(\theta_k)\rVert^2+\tfrac{L\eta^2}2\sigma^2$, kiểm trên dữ liệu bốn điểm trong ghi chú ($0{,}547\ge\tfrac{69}{128}$ tại $\theta^*$; $1{,}3188\ge\tfrac{503}{384}$ tại $\theta_0$); mức nhiễu nền $\eta\sigma^2/\mu$; số $0{,}81^k+\tfrac8{57}(1-0{,}81^k)$ và cận $0{,}9^k+0{,}267$.
- **Vị trí trong khung:** bước 5 (bất đẳng thức một bước, T5).
- **LLO/CLO:** LLO12; CLO1.
- **Bước hành trình:** KN8 hình thức + ví dụ (đối chiếu cận với giá trị chính xác).
- **Quyết định:** `thêm` — tách từ F02 cũ theo kiểm định storyboard để mỗi trang một định lý; bất đẳng thức một bước thay cho khẳng định sai “giảm theo kỳ vọng”.
- **Sửa 2026-10-12 (văn phong và mật độ):** `tách` — 91 → 36 âm tiết; gỡ `.dense`; bất đẳng thức một bước chuyển sang F01b; ví dụ ba quan sát cùng hình chuyển sang F02b; định lý phát biểu bằng lời (bỏ T5, H2, H3, H4, H6, H6b) kèm (Định lý 05b.36); “Ý nghĩa:” nêu mức nhiễu nền.
- **Sửa 2026-10-12 (rà soát thuật ngữ):** `sửa` — “$F$ là $\mu$-lồi mạnh, tức $F-\tfrac\mu2\lVert\theta\rVert^2$ lồi” (B2, nghiêm trọng). 36 → 38 âm tiết. Ghi chú: lồi mạnh (strongly convex), tương đương $\nabla^2F\succeq\mu I$ khi $F\in C^2$; bỏ “cỡ”.
- **Sửa 2026-10-22 (tái kiểm vòng 8, S4):** `sửa` — “gradient nhóm như trên” → “gradient nhóm không chệch, phương sai không quá $\sigma^2$” (cách viết của master) trên mặt trang và trong câu mở ghi chú: F01c chen giữa F01b và F02 nên “như trên” không còn chỉ đúng trang; cách viết mới nêu thẳng hai giả thiết, không dẫn ngược. Mật độ: 42 âm tiết (trần 60), 4 dòng, 1 công thức hiển thị; dòng định lý 20 âm tiết (trần 20).
- **Quyết định 2026-10-22:** `bỏ` — yêu cầu người dùng 2026-10-22 (“bỏ từ slide Mức nhiễu nền của bước hằng đến slide Bước giảm dần cho hàm lồi mạnh vì hàm lồi không quan trọng ở đây nữa”); kết quả lồi mạnh của SGD nằm ngoài mạch kể của bài, deck chỉ giữ bảo đảm không lồi (F04, F04b). Kết quả vẫn có trong ghi chú bài giảng và Bài 05b.

### F02b. Ví dụ: ba quan sát với bước hằng

- **Lý do tồn tại:** đối chiếu cận mức nhiễu nền với giá trị chính xác trên ví dụ ba quan sát (Ví dụ A của 05b), kèm hình.
- **Nhu cầu hoặc khoảng trống được lấp:** F02 cho cận; người học cần thấy cận lớn gần gấp đôi giới hạn thật.
- **Đầu vào:** F02; dữ liệu $y=(-1,1,3)$, $\sigma^2=\tfrac83$.
- **Đầu ra:** đệ quy $0{,}81$, giới hạn $\tfrac8{57}\approx0{,}140$, cận $0{,}9^k+0{,}267$; hình (chuyển từ F01).
- **Vị trí trong khung:** bước 5 (ví dụ của mức nhiễu nền).
- **LLO/CLO:** LLO12; CLO1.
- **Bước hành trình:** KN8 ví dụ và trực quan.
- **Quyết định:** `tách` từ F02; hình chuyển từ F01 sang đây (thứ tự hình thay đổi, dữ kiện không đổi). “Ví dụ A” gọi là “ví dụ ba quan sát” như Bài 9 của `exercises.md`. Mật độ: 26 âm tiết (trang mới, 2026-10-12).
- **Sửa 2026-10-12 (rà soát thuật ngữ):** `sửa` — “rút đều” → “chọn đều” (A17), 26 → 26 âm tiết; ghi chú “Ví dụ A của Bài 05b” → “ví dụ cùng tên của Bài 05b”.
- **Quyết định 2026-10-22:** `bỏ` — yêu cầu người dùng 2026-10-22 (“bỏ từ slide Mức nhiễu nền của bước hằng đến slide Bước giảm dần cho hàm lồi mạnh vì hàm lồi không quan trọng ở đây nữa”); kết quả lồi mạnh của SGD nằm ngoài mạch kể của bài, deck chỉ giữ bảo đảm không lồi (F04, F04b). Kết quả vẫn có trong ghi chú bài giảng và Bài 05b.

### F03. Bước giảm dần cho hàm lồi mạnh

- **Lý do tồn tại:** phát biểu lại T6 của 05b: bước $\tfrac1{\mu(k+1)}$ bỏ mức nhiễu nền với tốc độ $O(1/k)$.
- **Nhu cầu hoặc khoảng trống được lấp:** F02 để lại mức nhiễu nền không giảm theo $k$; cần lịch bước cho kỳ vọng sai số về 0, cho các bài toán lồi mạnh của Bài 05 sau chính quy hóa.
- **Đầu vào:** F02; T6 (05b, phần SGD cho hàm lồi mạnh); Ví dụ A.
- **Đầu ra:** $\mathbb E\lVert\theta_k-\theta^*\rVert^2\le\tfrac{G^2}{\mu^2k}$; giá trị chính xác $\tfrac8{3k}$ trên Ví dụ A, nhỏ hơn quỹ đạo bước hằng từ $k=16$; các lịch bước khác trong ghi chú.
- **Vị trí trong khung:** bước 5 (T6).
- **LLO/CLO:** LLO12; CLO1.
- **Bước hành trình:** KN8 hình thức + ví dụ.
- **Quyết định:** `thêm` — tách từ F02 cũ theo kiểm định storyboard; cần phát biểu lại tốc độ lồi mạnh $O(1/k)$ kèm giả thiết và hằng số.
- **Sửa 2026-10-12 (văn phong và mật độ):** `sửa` — 41 → 36 âm tiết; gỡ `.dense`; định lý phát biểu bằng lời (bỏ T6, H3, H4, H6, H6a) kèm (Định lý 05b.39); “Ví dụ A” gọi là ví dụ ba quan sát.
- **Quyết định 2026-10-22:** `bỏ` — yêu cầu người dùng 2026-10-22 (“bỏ từ slide Mức nhiễu nền của bước hằng đến slide Bước giảm dần cho hàm lồi mạnh vì hàm lồi không quan trọng ở đây nữa”); kết quả lồi mạnh của SGD nằm ngoài mạch kể của bài, deck chỉ giữ bảo đảm không lồi (F04, F04b). Kết quả vẫn có trong ghi chú bài giảng và Bài 05b.
