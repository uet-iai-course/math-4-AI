# Duyệt bộ trang chiếu Bài 13 — Vai 3 `chuyen-gia` (quá trình quyết định Markov và quy hoạch động)

- **Deck đã đóng băng:** `2627-1/lecture-13-quyet-dinh-tuan-tu-bat-dinh.html` (57 trang, 7 mạch).
- **Đối chiếu:** `materials/lec-13/lecture-note.md` (dẫn "d.N"), `materials/lec-13/exercises.md` (dẫn "bt d.N"), storyboard §2–§5. Nguồn ngoài chỉ dùng để kiểm cách trình bày chuẩn: Sutton và Barto (2018), §3.5–3.6, §4.1, §4.4; Murphy (2023), §34.5–34.6, §35.1–35.2; Bertsekas (2017), tập I, §1.1–1.3. Không chép câu chữ.
- **Phạm vi kiểm:**
  - đối tượng cố định và ngẫu nhiên;
  - giả thiết quyết định (M1–M3, O1–O3) trên mặt trang;
  - trực quan có chuyển kết quả sang trường hợp thiếu giả thiết không;
  - ứng dụng trong AI có dùng thật kết quả không;
  - tên và vai trò của kỹ thuật;
  - điểm then chốt bị bỏ sót.
- **Máy:** `deck_lint.py` cho 1 phát hiện (L13-7-04, SYLL60 63 > 60, ngoại lệ đã ghi ở storyboard §6.8). Đếm âm tiết bằng cùng quy tắc: 30 trang nội dung đang ở mức 55–60 âm tiết, nên mọi đề xuất thêm chữ dưới đây đều kèm chỗ bớt hoặc cách tách trang.
- **Kiểm SVG:** các nhãn chữ của `robot-mdp-slide.svg`, `two-step-paths.svg`, `value-iteration.svg` khớp số liệu của ghi chú. Dòng "ưu tiên B từ vòng lặp thứ hai" của hình khớp "từ $k=1$" trên L13-5-03, vì vòng thứ hai là vòng tính $v_2$ từ $v_1$.

## Nhận định chung

Về chuyên môn, phần cốt lõi của deck đúng và đủ giả thiết:

- Bổ đề so sánh theo từng bước (Bổ đề 13.11) là công cụ chung của Định lý 13.12 và Định lý 13.19. L13-3-08 cho thấy (M1) vào ở Bổ đề 13.10, (M2, O1) vào ở bước kỳ vọng toàn phần theo $H_t$, (O2) vào ở bước phần đuôi.
- Chiều "mọi chính sách, kể cả phụ thuộc lịch sử, không vượt $\bar V$" có trên mặt trang (L13-5-02, bước 2).
- Chỉ số vòng lặp $k$ được tách khỏi thời điểm hành động (L13-5-04, L13-7-06), đúng chỗ người học hay nhầm.
- Chặn phần dư có đúng chỉ số $\gamma$ cho $TV$ và không có $\gamma$ cho $V$. Chặn $2\gamma/(1-\gamma)$ cho chính sách tham lam đúng như (6.11).
- Thuật toán 13.23 có đầu vào, điều kiện dừng và lý do dừng sau hữu hạn vòng.
- Hai phản ví dụ $\gamma=1$ và câu "trạng thái hấp thụ không thay được $\gamma<1$" có trên mặt trang (L13-5-08).
- Tình huống 13.1 dùng thật Hệ quả 13.26, Định lý 13.19 và (5.12) để đo mất mát $46/11$.
- Tình huống 13.2 dùng thật Nhận xét 07.47.

Các phát hiện dưới đây tập trung ở mạch 6 (học từ mẫu) và ở vài câu khái quát hóa vượt giả thiết.

## Bảng phát hiện

| mức độ | trang chiếu | vấn đề | bằng chứng | đề xuất sửa |
|---|---|---|---|---|
| trung bình | L13-6-03 | NT9, NT4, NT20. **Trang không nói $Q_t$ là gì và không nói kỳ vọng của $Y_t$ ứng với phép Bellman nào.** Mặt trang viết "Với bảng $Q_t$ …" mà không nêu $Q_t$ ước lượng đại lượng gì; ký hiệu dễ lẫn với giá trị nhìn trước $Q_U$ của L13-3-06. Kết quả then chốt nối mục tiêu từ mẫu với toán tử $T$ chỉ có trong ghi chú diễn giả. Câu "hội tụ của Q-learning cần thêm giả thiết" cũng chỉ có ở đó. Mặt trang đặt cập nhật (7.6) ngay sau các bảo đảm tất định của mạch 4–5 mà không có dòng nào chặn cách hiểu "Q-learning hội tụ như lặp giá trị". Đây đúng là kiểu chuyển bảo đảm của lặp giá trị sang học từ mẫu. Dòng dẫn của mạch 6 chỉ nói về mô hình ước lượng (học dựa trên mô hình), không phủ trường hợp này. | Mặt trang: "Với bảng $Q_t$ và chuyển tiếp …". Ghi chú d.1455: "bảng *giá trị hành động* (action value) $Q_t(s,a)$, là ước lượng tại thời điểm $t$ của giá trị khi chọn $a$ tại $s$ rồi hành động tối ưu". d.1480: "kỳ vọng của mục tiêu từ mẫu là phép Bellman tối ưu áp dụng cho bảng hiện tại". d.1501 (Nhận xét 13.29, mục 3): "Hội tụ của Q-learning dạng bảng cần thêm giả thiết …". | Tách thành hai trang (57 → 58 trang, dưới trần 60). **Trang 1:** giữ Định nghĩa 13.27. **Trang 2:** Định nghĩa 13.28, mở bằng "bảng *giá trị hành động* (action value) $Q_t$: ước lượng giá trị khi chọn $a$ tại $s$ rồi hành động tối ưu", giữ (7.5) và (7.6), rồi thêm hai dòng: "**Ý nghĩa:** $\mathbb E[Y_t\mid H_t,A_t=a]=r(S_t,a)+\gamma\sum_{s'}P(s'\mid S_t,a)\max_{a'}Q_t(s',a')$: phép Bellman tối ưu áp cho $Q_t$." và "**Lưu ý:** Hệ quả 13.18 nói về lặp chính xác; hội tụ của Q-learning dạng bảng cần thêm giả thiết (Nhận xét 13.29)." Ghi chú diễn giả giữ điều kiện "$Q_t$ đã xác định bởi lịch sử trước chuyển tiếp" và nói rõ mục này là đọc thêm. |
| trung bình | L13-3-00 (dòng dẫn), L13-3-01 (dòng đầu) | NT2, NT12. **Dòng dẫn mở rộng Định lý 13.12 ra ngoài giả thiết.** Dòng dẫn nói giá trị của *mọi* cách chọn cố định là nghiệm của một hệ tuyến tính. Định lý 13.12 chỉ đúng cho chính sách Markov dừng. Với một chính sách cố định nhưng phụ thuộc lịch sử, dãy $(S_t)$ không còn là xích Markov, và $V^\rho$ không phải nghiệm của một hệ $\lvert\mathcal S\rvert$ ẩn. | L13-3-00: "Giá trị của một cách chọn hành động cố định là nghiệm của một hệ phương trình tuyến tính." L13-3-01: "cần giá trị dài hạn của một cách chọn cố định". Ghi chú d.713 (Giả thiết của Định lý 13.12): "$\pi$ là chính sách Markov dừng". d.446: "Với chính sách phụ thuộc lịch sử, riêng dãy $(S_t)$ nói chung không còn là xích Markov". | Dòng dẫn: "Nếu hành động chỉ phụ thuộc trạng thái hiện tại, giá trị của cách chọn đó là nghiệm của một hệ phương trình tuyến tính." (25 âm tiết, chỉ dùng từ thông thường như NT12 yêu cầu). L13-3-01: "… cần giá trị dài hạn của một cách chọn hành động." |
| trung bình | L13-4-01 | NT9, NT2. **Câu mở dùng trước kết luận của Định lý 13.19.** Câu mở trang ngầm coi tập cần so sánh là các chính sách tất định dừng. Chỉ Định lý 13.19 (mạch 5) mới cho phép thu hẹp như vậy. Trước định lý đó, $V^*$ là cận trên đúng theo mọi chính sách tổng quát (L13-3-04). Mặt trang bỏ vế "chính sách phụ thuộc lịch sử còn nhiều hơn" của ghi chú; vế này chỉ còn trong ghi chú diễn giả của L13-3-11. | L13-4-01: "Liệt kê cần so $\prod_s\lvert\mathcal A(s)\rvert$ chính sách tất định dừng." Ghi chú d.796: "số chính sách tất định dừng là $\prod_s\lvert\mathcal A(s)\rvert$, tăng theo hàm mũ của số trạng thái, và tập chính sách phụ thuộc lịch sử còn lớn hơn". d.1105: "… nên chỉ cần tìm trong các chính sách tất định dừng" (kết luận của Định lý 13.19). | "Có $\prod_s\lvert\mathcal A(s)\rvert$ chính sách tất định dừng; chính sách phụ thuộc lịch sử còn nhiều hơn." Để giữ trần 60 (hiện 58), rút dòng "Câu hỏi:" thành "**Câu hỏi:** $U=TU$ có nghiệm duy nhất, và lặp $U\leftarrow TU$ hội tụ khi nào?". |
| trung bình | L13-6-01 (và toàn deck) | NT2, NT20; phạm vi vai 3. **Mặt trang không nói đại lượng nào cố định, đại lượng nào ngẫu nhiên theo dữ liệu.** Ghi chú §1 phân ba loại: cố định; ngẫu nhiên theo quỹ đạo; ngẫu nhiên theo dữ liệu. Deck chỉ nói phân loại này trong ghi chú diễn giả (L13-3-01; L13-7-02). Ở mạch 6, chỗ $P$ cố định được thay bằng $\hat P$ ngẫu nhiên, mặt trang không có dòng nào nói $\hat P$ phụ thuộc dữ liệu nên ngẫu nhiên và có sai số lấy mẫu. Đây là lý do gốc của Tình huống 13.1. | L13-6-01: "Robot thật chưa biết $P(\cdot\mid h,A)$. **Trực quan.** Mỗi lần thử là một mẫu; tần suất ước lượng hàng." Ghi chú d.72–76 (bảng ba loại đại lượng). d.1374: "Khác với $P,r$ của Định nghĩa 13.5, các bảng $\hat P,\hat r$ phụ thuộc dữ liệu, nên ngẫu nhiên và có sai số lấy mẫu." | Thay dòng đầu L13-6-01 (giữ 60 âm tiết) bằng "$P(\cdot\mid h,A)$ cố định nhưng chưa biết; $\hat P$ tính từ dữ liệu nên ngẫu nhiên. **Trực quan.** Mỗi lần thử là một mẫu của hàng." |
| nhẹ | L13-4-04 | NT6. **Nhãn (O2) đặt sai bước.** Bất đẳng thức của bước 1 có hệ số $\gamma$ với mọi $\gamma\ge0$; (O2) chỉ cần để hệ số co nhỏ hơn $1$, tức ở kết luận "ánh xạ co". | L13-4-04, bước 1: "Một hành động (giả thiết O2): $r(s,a)$ triệt tiêu; …". Ghi chú d.902: "Nghĩa là $T$ và $T^\pi$ là ánh xạ co với hệ số $\gamma$" (cùng $\gamma\in[0,1)$ của Định nghĩa 13.5). | Bỏ "(giả thiết O2)" ở bước 1; viết dòng cuối thành "Hệ số $\gamma<1$ (giả thiết O2) làm $T$, $T^\pi$ co; với $\gamma=1$, bước một chỉ cho hệ số $1$." |
| nhẹ | L13-6-05 | NT20 ("con số đứng tại chỗ được gọi tên"). **Số $1/1024$ không có tên.** Mặt trang không nói $1/1024$ là xác suất gì. Ý chuyên môn cần giữ: ước lượng là đúng MLE, còn kết quả xấu đến từ một biến cố lấy mẫu có xác suất dương. | L13-6-05: "… cả $10$ lần ở lại $h$ ($1/1024$)." Ghi chú d.1545: "Dưới môi trường thật, biến cố này có xác suất $(1/2)^{10}=1/1024>0$." | "… cả $10$ lần ở lại $h$, xác suất $(1/2)^{10}=1/1024$ dưới robot thật." |
| nhẹ | L13-4-07 hoặc L13-5-06 | NT8 (bước ứng dụng). **Ứng dụng của Hệ quả 13.18 chỉ có trong ghi chú diễn giả.** Mạch 4 không có bước ứng dụng trên mặt trang. Ghi chú có một con số chuyên gia hay nhấn: khi $\gamma$ gần $1$, số vòng lặp tăng mạnh. | Ghi chú d.1041: "với $\gamma=0{,}99$, cần khoảng $230$ vòng để giảm sai số đi $10$ lần ($0{,}99^{230}\approx0{,}099$). Sai số do lấy mẫu và do xấp xỉ hàm nằm ngoài Hệ quả 13.18". | L13-5-06 đang có 48 âm tiết và 6 dòng. Gộp vào dòng chi phí: "Chi phí mỗi vòng: bậc $\lvert\mathcal S\rvert^2\max_s\lvert\mathcal A(s)\rvert$; với $\gamma=0{,}99$, khoảng $230$ vòng để giảm sai số $10$ lần." |
| nhẹ | L13-7-02 (hàng "Bellman tối ưu") | NT15 (giữ đủ giả thiết không được bỏ). **Hàng thiếu giả thiết (O1).** Tập hành động hữu hạn bảo đảm cực đại đạt được, nên chính sách tham lam tất định tồn tại. Nếu bỏ (O1), cận trên theo hành động có thể không đạt và kết luận "có chính sách tối ưu tất định dừng" hỏng. | L13-7-02: "$\bar V=T\bar V$; $\gamma<1$". Ghi chú d.831: "Cực đại trong (6.1) được đạt vì $\mathcal A(s)$ hữu hạn (giả thiết O1), nên chính sách tham lam luôn tồn tại." | "$\bar V=T\bar V$; $\mathcal A(s)$ hữu hạn; $\gamma<1$". |
| nhẹ | L13-7-03 (gạch đầu dòng 1) | NT21. **Thuật ngữ rút gọn sai phạm vi.** "Chính sách dừng" bỏ chữ "Markov". Ghi chú dùng "chính sách Markov dừng" cho đúng lớp chính sách của Định lý 13.12. | L13-7-03: "Chính sách dừng: giá trị là nghiệm duy nhất của $V=r^\pi+\gamma P^\pi V$." Ghi chú d.713, d.1588. | "Chính sách Markov dừng: …". |
| nhẹ | L13-7-07 (hoặc ghi chú diễn giả L13-5-01) | NT9. **Bài tập về nhà dùng ký hiệu chưa nối với deck.** Bài tập 13.7, 13.10, 13.12 dùng giá trị hành động tối ưu $q_*$; tệp bài tập định nghĩa $q_*(s,a)=Q_{V^*}(s,a)$. Deck không nối $q_*$ với $Q_U$ ở chỗ nào. Người học làm bài sẽ thiếu cầu nối giữa phương trình (6.8) và phương trình cho $q_*$. Cầu nối này cũng là chỗ mạch 6 cần, vì Q-learning ước lượng chính $q_*$. | bt d.8–14: "$q_\pi(s,a)=Q_{V^\pi}(s,a)$, $q_*(s,a)=Q_{V^*}(s,a)$". L13-7-07 xếp 13.7, 13.10 vào mạch 5 và 13.12 vào mạch 4. | Thêm vào ghi chú diễn giả của L13-5-01 một câu: "Tệp bài tập viết $q_*(s,a)=Q_{V^*}(s,a)$; chính sách tham lam theo $V^*$ chọn $\operatorname{argmax}_aq_*(s,a)$." Nếu sửa L13-6-03 như phát hiện đầu, nối $Q_t$ với $q_*$ ở trang đó. |

**Số phát hiện:** chặn bàn giao 0; nghiêm trọng 0; trung bình 4; nhẹ 6.

## Kiểm theo phạm vi vai

- **Cố định và ngẫu nhiên:**
  - Các trang sau tách đúng: L13-3-02 ($R_{t+1}$ quan sát được, $r(s,a)$ là trung bình) và L13-3-04 ($V^\rho$ là kỳ vọng của $G_0$).
  - Ở dữ liệu, $\hat P$ ngẫu nhiên không được nói trên mặt trang (phát hiện 4).
- **Giả thiết quyết định:**
  - Thưởng bị chặn (M2) và $\gamma<1$ (O2): có trên L13-3-01 và L13-3-08.
  - Mô hình biết trước và tính chính xác (O3): có trên L13-4-07 và L13-5-06.
  - Lấy mẫu độc lập (M3): có trên L13-6-01.
  - Ba điều kiện của câu trả lời trung tâm có trên L13-7-03.
- **Trực quan gây hiểu sai:** dòng dẫn mạch 3 (phát hiện 2) và câu mở L13-4-01 (phát hiện 3) khái quát vượt giả thiết. Trang Q-learning có nguy cơ chuyển bảo đảm của lặp giá trị sang học từ mẫu (phát hiện 1).
- **Ứng dụng trong AI:**
  - Đánh giá chính sách: L13-3-09.
  - Quy hoạch có chứng nhận: L13-5-06.
  - Học dựa trên mô hình, có số liệu mất mát: L13-6-05.
  - Chọn trạng thái: L13-6-06.
  - Các trang này dùng thật kết quả của bài. Riêng mạch 4 thiếu ứng dụng trên mặt trang (phát hiện 7).
- **Kỹ thuật:**
  - Nguyên lý ánh xạ co được giới thiệu lần đầu đúng chỗ (L13-4-07) và gọi đúng là trường hợp hữu hạn chiều của Banach (trong ghi chú diễn giả).
  - "Kẹp" hai chiều (L13-5-02) và tổng lồng (L13-3-08) gọi đúng tên và vai trò.
  - Chèn đại lượng trung gian (L13-5-05) gọi đúng tên và vai trò.
  - Mẹo "chặn từng phần tử rồi lấy cực đại" của Bổ đề 13.15 khớp với mẹo "phần tử bất kỳ rồi lấy cận dưới đúng" của deck 12; đã kiểm chuỗi này có trong `lecture-12-*.html`.

## Đề xuất sửa ghi chú

| mức độ | vị trí | vấn đề | bằng chứng | đề xuất sửa |
|---|---|---|---|---|
| nhẹ | Kiến thức tiên quyết, d.42 | **Mục tiên quyết không dùng ở đâu.** "Ba nguồn sai số (Mệnh đề 12.16)" được liệt kê nhưng không xuất hiện ở thân bài. Ví dụ: Tình huống 13.1 không dẫn nó. Deck vì vậy bỏ mục này ở L13-1-02. | `grep "12.16" lecture-note.md` chỉ cho d.42. | Bỏ mục khỏi Kiến thức tiên quyết. Cách khác: dẫn Mệnh đề 12.16 ở d.1553 (Tình huống 13.1), nơi sai lệch nằm ở mô hình ước lượng chứ không ở phép giải. Lựa chọn thuộc về tác giả. |
| nhẹ | §7.2, d.1437 và Phụ lục A, d.1658 | **Hai chỗ nêu điều kiện của chính sách thu thập khác nhau.** §7.2 chỉ yêu cầu chính sách thu thập và phân phối ban đầu không phụ thuộc tham số chuyển tiếp. Phụ lục A thêm "chính sách không dùng phần thưởng". Điều kiện thêm này cần cho (A.1): nếu chính sách dùng phần thưởng quá khứ, $\mathbb P(A_t=a\mid\sigma)$ phải lấy tổng theo các phần thưởng, và có thể phụ thuộc $\theta$ khi phần thưởng tương quan với trạng thái kế tiếp. Deck (L13-6-02) theo §7.2 trên mặt trang và theo Phụ lục A trong ghi chú diễn giả. | d.1437: "Giả sử chính sách thu thập và phân phối ban đầu không phụ thuộc các tham số chuyển tiếp …". d.1658: "chính sách không dùng phần thưởng và không phụ thuộc $\theta$". | Thêm vào §7.2: "chính sách thu thập không dùng phần thưởng và, cùng phân phối ban đầu, không phụ thuộc các tham số chuyển tiếp". Sau khi ghi chú sửa, đồng bộ gạch đầu dòng thứ hai của L13-6-02. |

## Kết luận

**đạt khi sửa.** Không có phát hiện chặn bàn giao hay nghiêm trọng. Bốn phát hiện trung bình cần sửa trước bàn giao:

- L13-6-03 (Q-learning và kỳ vọng của mục tiêu từ mẫu);
- dòng dẫn L13-3-00;
- câu mở L13-4-01;
- dòng cố định/ngẫu nhiên ở L13-6-01.

Cách sửa đề xuất giữ trần mật độ; riêng phát hiện đầu cần thêm một trang (58, dưới trần 60).
