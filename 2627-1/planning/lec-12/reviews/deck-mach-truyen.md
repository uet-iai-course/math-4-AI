# Duyệt deck Bài 12 — Vai 5 `mach-truyen` (mạch truyện, liên kết, tập trung của mạch)

- **Deck đã đóng băng:** `2627-1/lecture-12-hoc-may-rui-ro-thong-ke-tong-quat-hoa.html` (60 trang, 7 mạch).
- **Đối chiếu:** `materials/lec-12/lecture-note.md`, `materials/lec-12/exercises.md`, `planning/lec-12/storyboard.md`, deck 11 `lecture-11-hoc-tu-du-lieu-uoc-luong-thong-ke.html`, deck 13 `lecture-13-quyet-dinh-tuan-tu-bat-dinh.html` (bản nháp, chỉ để kiểm tính liên tục).
- **Cách làm:** trích mặt trang và ghi chú diễn giả của ba deck bằng script (`lxml`), đọc toàn bộ; kiểm liên kết bằng Playwright (Chromium, 1600×900): `#/1`–`#/7` và bảy liên kết của trang "Nội dung" mở đúng `L12-1-01`, `L12-2-00`, …, `L12-7-00`; hai liên kết trình xem trên `L12-7-06` trả 200 và mở đúng ghi chú, bài tập của Bài 12, mỗi trang có liên kết quay về deck. `deck_lint.py`: 0 phát hiện. Bảng kiểm liên tục theo phần Outline, Threads, Concept của `quill/references/workflows.md` (không tạo `quill.json`).

## 1. Bảng phát hiện

| mức độ | trang chiếu | vấn đề | bằng chứng | đề xuất sửa |
|---|---|---|---|---|
| trung bình | L12-3-09 (cùng L12-3-04) | NT13, `AGENTS.md` §"Tập trung của mạch" (không trùng lặp với deck liền kề), NT4: trang ý tưởng chứng minh Mệnh đề 12.6 lấy làm công thức then chốt đúng phép so sánh thứ tự mà deck 11 đã chứng minh; phần mới của Mệnh đề 12.6 (nhân tử có điều kiện, $m_\theta\in(0,1)$, tập nghiệm có thể rỗng) không có công thức hiển thị. | L12-3-09: "nhân với $-\frac1n<0$ được (5.1) và đảo thứ tự: $L(\theta)\ge L(\theta')\iff\hat L_n(\theta)\le\hat L_n(\theta')$". Deck 11, HL07: "$L(\theta;D)\ge L(\theta';D)\iff\ell(\theta;D)\ge\ell(\theta';D)$ … nhân với $-1/n<0$ đảo chiều mọi bất đẳng thức". L12-3-04 đã có "Nhắc lại: $\log$ tăng chặt nên giữ tập nghiệm (Mệnh đề 11.3)"; L12-1-02 nhắc lại Mệnh đề 11.3 lần nữa. | Gộp bước "nhân với $-\frac1n$, đảo thứ tự" thành một dòng "Nhắc lại: … (Mệnh đề 11.3)". Dành công thức hiển thị cho phần mới, ví dụ $L(\theta)=\prod_i m_\theta(x_i)^{y_i}[1-m_\theta(x_i)]^{1-y_i}>0$ khi $m_\theta(x_i)\in(0,1)$ (giả thiết). Giữ dòng kết "Hai tập nghiệm trùng nhau, kể cả khi cả hai rỗng". Mật độ không tăng. |
| trung bình | L12-4-02 → L12-5-03 (và L12-7-01) | NT13 (cái còn thiếu, giới hạn tạo bước tiếp phải có trên mặt trang), khung chung của storyboard §2 "Giới hạn áp dụng": mặt trang không có chỗ nào nói hai mất mát của mạch 3 không thỏa (G2). L12-4-02 viết hai mục tiêu huấn luyện thành rủi ro thực nghiệm, rồi mạch 5 dựng cận với (G2). Người học dễ áp các cận của mạch 5 cho hồi quy Gaussian và mô hình logistic. | L12-4-02: "Hai mục tiêu huấn luyện quy về rủi ro thực nghiệm: (4.3) với $\ell(a,y)=(y-a)^2$, (5.1) với entropy chéo." L12-5-03: "(G2) $\ell(a,y)\in[0,1]$". Ghi chú §9.4: "các cận của Mục 7 cần mất mát bị chặn, nên không áp dụng trực tiếp cho mất mát bình phương hay entropy chéo không bị chặn". Ý này chỉ có trong ghi chú diễn giả L12-2-02, L12-5-10, L12-7-01. | Thêm một dòng trên mặt trang, ưu tiên L12-5-03: "Lưu ý: mất mát bình phương và entropy chéo không bị chặn, nên nằm ngoài (G2)." Phương án khác: ô "Hội tụ đều" của L12-7-01 viết "(G1)–(G3), mất mát bị chặn". Đếm lại bằng `deck_lint.py` (L12-7-01 đang ở trần 80). |
| nhẹ | L12-6-01, L12-6-03 (cùng L12-5-10) | NT13: câu hỏi của mạch 6 đứng trước lý do cần đặt câu hỏi. Giới hạn $M<\infty$ của mạch 5 đến mặt trang muộn hai trang. Phần việc (G1) của L12-6-09 không có trong câu hỏi, chỉ có ở từ khóa "dữ liệu triển khai". | L12-6-01: "Câu hỏi: Lớp vô hạn được bảo đảm thế nào?" Lý do chỉ có ở dòng đầu L12-6-03: "$\mathcal H_\uparrow$ vô hạn nên $M$ trong (7.5) không dùng được". Cuối mạch 5 (L12-5-10) không có câu nối; "Giới hạn còn lại: cận cần số hàm $M$ hữu hạn" chỉ có ở ghi chú diễn giả L12-5-00. Bảng mạch của storyboard phân rã câu hỏi thành "độ chính xác/độ tin cậy + số chiều VC thay cho $M$ + giới hạn (G1)". | Chuyển mệnh đề "$\mathcal H_\uparrow$ vô hạn, nên $M$ trong (7.5) không dùng được" lên dòng "Câu hỏi:" của L12-6-01. Thêm vế "và khi nào bảo đảm mất hiệu lực". L12-6-03 mở thẳng bằng "Dữ kiện:" (NT14). Bù mật độ L12-6-01 (đang ở trần) bằng cách chuyển câu "Hệ quả 12.15 có hai mức …" vào ghi chú diễn giả L12-6-01; câu này trùng ý tiêu đề L12-6-02. |
| nhẹ | L12-5-01 | NT13: trang nội dung đầu của mạch 5 chỉ nêu vế thứ nhất của câu hỏi mạch. Vế "rủi ro dư của ERM bị chặn bao nhiêu" lên mặt trang lần đầu ở L12-5-06, trang thứ 6 trên 10 (ngoài từ khóa của L12-5-00). | Bảng mạch: "Khi nào hai rủi ro của hàm chọn từ mẫu gần nhau, và rủi ro dư của ERM bị chặn bao nhiêu?" L12-5-01 chỉ có Nhắc lại (7.1) và "Với $h=\hat h_S$, các mất mát … không độc lập." | Thêm vào cuối L12-5-01 một vế ngắn nêu đích, ví dụ "… kể cả $\hat h_S$, có $\lvert R(h)-\hat R_S(h)\rvert\le\varepsilon$; từ đó chặn được rủi ro của ERM." Nếu vượt trần, đặt câu này ở dòng dẫn hoặc ghi chú diễn giả L12-5-00, và chấp nhận mức hiện tại. |
| nhẹ | L12-3-11 | NT8 (thứ tự hành trình): bài tập kiểm tra cụm A (hợp lý Gaussian) đứng sau toàn bộ cụm B (entropy chéo). Cụm A kết thúc ở L12-3-06 nhưng bước kiểm tra đến sau bốn trang của cụm khác. | Storyboard §7, cụm A, cột "Kiểm tra": "L12-3-06 …, L12-3-11". Thứ tự deck: 3-06 (Ví dụ 12.3) → 3-07…3-10 (cụm B) → 3-11 (Bài tập 12.1 câu 4) → 3-12 (Bài tập 12.2 câu 3). | Chuyển L12-3-11 lên ngay sau L12-3-06. Dòng đầu L12-3-07 vẫn là câu nối Gaussian → Bernoulli. Câu so sánh với dữ liệu tách được trong ghi chú diễn giả L12-3-11 chuyển sang ghi chú diễn giả L12-3-10. Cập nhật thứ tự trong storyboard. |
| nhẹ | L12-3-01 (cùng ghi chú diễn giả L12-3-00) | NT13, NT12 (đầu vào từ mạch trước): mạch 3 không nói nó nhận gì từ mạch 2. Mất mát $\ell$ ở L12-2-02 còn trừu tượng; mạch 3 chọn $\ell$ cho hai mô hình, chuyển từ ví dụ phân loại sang dữ liệu hồi quy và giữ đầu vào cố định. Không câu nào trên mặt trang nêu quan hệ này. | L12-3-01: "Mất mát suy ra từ mô hình của đầu ra; mô hình quyết định nghiệm có tồn tại, duy nhất." Ghi chú diễn giả L12-3-00 chỉ dẫn Bài 11. Thiết kế cố định chỉ có ở ghi chú diễn giả L12-2-02 ("Phần 3 giữ đầu vào cố định"). | Sửa dòng cuối L12-3-01 thành "Mất mát $\ell$ của bài toán học suy ra từ mô hình của đầu ra; …". Ghi chú diễn giả L12-3-00 thêm một câu: mất mát $\ell$ của phần 2 được chọn ở đây, với các đầu vào $x_i$ coi là cố định. |
| nhẹ | L12-1-02, L12-3-08, L12-4-01 | Liên tục với deck 11 (NT9, NT21, cách nhắc lại): deck 11 đã gọi $-\frac1n\sum_i\log p_\theta(x_i)$ là rủi ro thực nghiệm và đã giới thiệu "entropy chéo nhị phân (binary cross-entropy, log loss)". Deck 12 nêu lại cả hai như thuật ngữ mới và không có một lời nào trên mặt trang chỉ ra rằng Bài 11 là trường hợp riêng. | Deck 11, TK01: "Hợp lý cực đại tương đương rủi ro thực nghiệm … $\operatorname{argmax}L=\operatorname{argmin}\hat R_n$". TS07: "Hàm này gọi là entropy chéo nhị phân (binary cross-entropy, log loss)". Deck 12, L12-1-02: "cực đại hợp lý tương đương cực tiểu $-\frac1n\sum_i\log p_\theta(x_i)$ (Mệnh đề 11.3)". L12-3-08: "là entropy chéo nhị phân (binary cross-entropy, log loss)". Câu "Mệnh đề 11.3 là trường hợp riêng" chỉ có ở ghi chú diễn giả L12-4-02. | Trên L12-1-02 viết "… tương đương cực tiểu rủi ro thực nghiệm $-\frac1n\sum_i\log p_\theta(x_i)$ (Mệnh đề 11.3)". Trên L12-3-08 nối bằng vài chữ, ví dụ "entropy chéo nhị phân của Bài 11, nay với $m_\theta(x_i)$ thay cho $p$". Kiểm trần mật độ (L12-3-08 sát trần); nếu vượt, đưa câu nối vào ghi chú diễn giả L12-3-08 và chỉ sửa L12-1-02. |
| nhẹ | L12-5-09, L12-6-08, L12-7-04 | `AGENTS.md` §"Tập trung của mạch" (không trùng lặp trong bài): cùng một kết luận trên cùng ví dụ, "sai số xấp xỉ $0$, rủi ro dư của $g$ là sai số ước lượng", xuất hiện trên ba mặt trang. | L12-5-09: "với $\mathcal H_{\mathrm{all}}$, cận sai số ước lượng $2$ không cho thông tin và $g$ có rủi ro dư $\tfrac12$". L12-6-08: "Hai lớp chứa $h_0$: sai số xấp xỉ $0$; rủi ro dư của $g$ là sai số ước lượng." L12-7-04: "Lớp chứa $h_0$: sai số xấp xỉ $0$, nên toàn bộ rủi ro dư $\tfrac12$ của $g$ là sai số ước lượng." (Ghi chú cũng lặp ở Ví dụ 12.11, Tình huống 12.1 và lời giải Bài tập 12.17.) | Bỏ dòng thứ hai của L12-6-08 khỏi mặt trang, đưa vào ghi chú diễn giả. Câu hỏi của trang này là chọn lớp theo số chiều VC. Giữ L12-5-09 (ví dụ của Mệnh đề 12.16) và L12-7-04 (kết quả của bài tập, NT24). |
| nhẹ | L12-7-03 | NT15 (Tổng kết không có khái niệm mới), NT9: thuật ngữ *quá khớp* (overfitting) xuất hiện lần đầu, in nghiêng như thuật ngữ mới, ở mạch Tổng kết. Ghi chú bài giảng không dùng thuật ngữ này; chỉ đề Bài tập 12.17 trong `exercises.md` dùng. | L12-7-03: "… có thể chọn hàm ghi nhớ và *quá khớp* (overfitting)." `grep "quá khớp" lecture-note.md`: không có kết quả. Nghĩa của từ chỉ có ở ghi chú diễn giả L12-7-03. | Giữ câu chữ đề (NT24). Trên L12-7-04, gắn nghĩa vào dòng kết bằng con số đã có, ví dụ "… là sai số ước lượng: $\hat R_S(h_S)=0$ nhưng $R(g)=\tfrac12$." Đề xuất sửa ghi chú ở mục 6. |
| nhẹ | L12-1-01, L12-1-03, L12-1-04, L12-6-00 | NT21, NT9, NT12: chữ viết tắt PAC và VC xuất hiện trên trang "Nội dung" và trang tiêu đề mạch 6 trước khi có cặp "tên đầy đủ (viết tắt)". Dòng dẫn mạch 6 lấy "Số chiều VC" làm chủ ngữ trước khi khái niệm được định nghĩa ở L12-6-04. | Bìa: "… số chiều Vapnik–Chervonenkis" (không có "(VC)"). L12-1-03 mục 5: "Phân biệt độ chính xác, độ tin cậy" (không có "học gần đúng với xác suất cao"). L12-1-04: "Học PAC và số chiều VC". L12-6-00, dòng dẫn: "Số chiều VC đo độ linh hoạt của một lớp vô hạn …". Phần mở đầu của ghi chú: "học gần đúng với xác suất cao (PAC) và số chiều Vapnik–Chervonenkis (VC)". | Bìa: "… số chiều Vapnik–Chervonenkis (VC)". Mục tiêu 5: "… độ tin cậy trong học gần đúng với xác suất cao (PAC)", bù chữ để giữ 80. Dòng dẫn mạch 6: "Độ linh hoạt của một lớp vô hạn đo bằng số điểm lớn nhất mà lớp gán được mọi nhãn." |
| nhẹ | L12-2-03, L12-5-09, L12-6-08, L12-7-04 (cùng L12-3-01) | `AGENTS.md` §"Ví dụ xuyên suốt" (một tên đối tượng cho một ví dụ): ví dụ phân loại xuyên suốt mang bốn tên. Tên "cảm biến" còn được dùng cho bộ dữ liệu hồi quy khác ở mạch 3. | Cùng một ví dụ: "bốn sản phẩm" (L12-2-01, L12-4-06, L12-5-02), "bộ phân loại cảm biến" (L12-2-03, L12-6-08), "ví dụ cảm biến" (L12-5-09, nhiều ghi chú diễn giả), "Cảm biến:" (L12-7-04). Bộ dữ liệu hồi quy ở L12-3-01 tên là "Ba số đo cảm biến". | Chọn một tên cho ví dụ phân loại, ví dụ "bốn sản phẩm", dùng ở mọi tiêu đề và dòng "Dữ kiện:" (L12-5-09: "Ví dụ: ba nguồn sai số trên bốn sản phẩm"; L12-7-04: "Bốn sản phẩm:"). Tiêu đề L12-6-08 giữ tên của Tình huống 12.1 trong ghi chú. |
| nhẹ | L12-7-07 | NT15 (dòng nối theo §11 của ghi chú): dòng nối bỏ chữ "cố định". Không có chữ đó, nghĩa thành "không i.i.d. theo bất kỳ phân phối nào". | L12-7-07: "Bài 13: hành động đổi phân phối của trạng thái kế tiếp, nên dữ liệu không còn i.i.d. theo một $P$." Ghi chú §11: "… nên dữ liệu không còn i.i.d. theo một $P$ cố định." | Thêm "cố định" vào cuối câu. |

**Số phát hiện:** chặn bàn giao 0; nghiêm trọng 0; trung bình 2; nhẹ 10.

## 2. Rà tập trung từng mạch

### Mạch 1 — Mở đầu (L12-1-01 … L12-1-05)

**Câu hỏi của mạch:** đặt câu hỏi trung tâm của bài, nhắc lại những gì bài cần từ các bài trước.

| ID | chức năng thực tế | phần việc phục vụ | vai trò trong mạch | kết nối vào | kết nối ra | đề xuất |
|---|---|---|---|---|---|---|
| L12-1-01 | bìa, luận điểm một câu có hai điều kiện và loại bảo đảm | luận điểm của bài | mở bài | Bài 11 (ghi chú diễn giả: hợp lý cực đại trên mẫu) | hai điều kiện được trả lời ở L12-7-02 | thêm "(VC)" vào phụ đề (phát hiện PAC/VC) |
| L12-1-02 | Nhắc lại Mệnh đề 11.3, 05.3, Hệ quả 10.7, Định lý 05c.47; ký hiệu | tiên quyết | đầu vào cho mạch 3, 5 | Bài 05, 05c, 10, 11 | L12-3-04, L12-3-05, L12-5-01, L12-5-04 | gọi tên "rủi ro thực nghiệm" như deck 11 |
| L12-1-03 | sáu mục tiêu của ghi chú | mục tiêu | mở bài | — | ánh xạ mục tiêu ↔ bài tập ở L12-7-06 | thêm "(PAC)" |
| L12-1-04 | danh sách 7 mạch, `#/1`–`#/7` | nội dung | mở bài | — | liên kết đúng (đã kiểm bằng Playwright) | — |
| L12-1-05 | một hộp "Câu hỏi:", đúng câu in đậm của ghi chú | vấn đề trung tâm | mở bài | — | L12-2-01, L12-7-02 | — |

### Mạch 2 — Bài toán học có giám sát (L12-2-00 … L12-2-03)

**Câu hỏi của mạch:** cần những đối tượng nào để so sánh ba bộ phân loại trên sản phẩm mới? Câu hỏi nằm trên mặt trang L12-2-01 ("Câu hỏi: Ba bộ phân loại dự đoán tốt đến mức nào …") và L12-2-02 ("So sánh trên sản phẩm mới cần $P$, $\mathcal H$, $\ell$ và quy tắc học").

| ID | chức năng thực tế | phần việc phục vụ | vai trò trong mạch | kết nối vào | kết nối ra | đề xuất |
|---|---|---|---|---|---|---|
| L12-2-00 | tiêu đề mạch, dòng dẫn trần thuật | khung | điểm vào | câu hỏi trung tâm | — | — |
| L12-2-01 | câu hỏi mở đầu của ghi chú, dữ kiện liệt kê | vấn đề (ví dụ cụ thể) | mở khái niệm | L12-1-05 | L12-2-02; trả lời ở L12-4-06, L12-6-08, L12-7-02 | — |
| L12-2-02 | $P$, $S$, $\ell$, $\mathcal H$, quy tắc học, (G1)–(G3) | các đối tượng | phát biểu khung | L12-2-01 | (G1)–(G3) dùng ở L12-5-03, L12-6-09 | — |
| L12-2-03 | ba lớp lồng nhau, mất mát $0$–$1$ | ví dụ xuyên suốt | đầu ra của mạch | L12-2-02 | L12-4-06, L12-5-02, L12-5-09, L12-6-08 | thống nhất tên ví dụ |

### Mạch 3 — Mất mát từ hợp lý có điều kiện (L12-3-00 … L12-3-12)

**Câu hỏi của mạch:** mất mát huấn luyện suy ra từ mô hình xác suất nào, và nghiệm của nó tồn tại, duy nhất khi nào? Câu hỏi nằm trên mặt trang L12-3-01 (trang nội dung đầu), dạng câu khẳng định.

| ID | chức năng thực tế | phần việc phục vụ | vai trò trong mạch | kết nối vào | kết nối ra | đề xuất |
|---|---|---|---|---|---|---|
| L12-3-00 | tiêu đề mạch | khung | điểm vào | Bài 11 (ghi chú diễn giả) | — | ghi chú diễn giả nêu $\ell$ của mạch 2 |
| L12-3-01 | ba số đo, Nhắc lại nghiệm Bài 01 | vấn đề cụm A | mở khái niệm | Bài 01 (Nhắc lại), L12-2-02 | L12-3-02 | dòng cuối gọi tên $\ell$ |
| L12-3-02 | Trực quan, Định nghĩa 12.1, mô hình (4.2) | nguồn gốc mất mát | trực quan + định nghĩa | L12-3-01 | L12-3-03 | — |
| L12-3-03 | Mệnh đề 12.2 | nguồn gốc (bình phương) | phát biểu | L12-3-02 | L12-3-04 | — |
| L12-3-04 | ý tưởng chứng minh 12.2, bỏ (E1) | nguồn gốc; tồn tại | chứng minh | L12-3-03, Mệnh đề 11.3 | L12-3-11 (bỏ (E1)) | — |
| L12-3-05 | Mệnh đề 12.3 | tính duy nhất | phát biểu | (4.3), Mệnh đề 05.3 | L12-3-06 | — |
| L12-3-06 | Ví dụ 12.3 hạng thiếu | tính duy nhất | ví dụ, ứng dụng | L12-3-05 | dự đoán mới không duy nhất → mạch 4 (ngầm) | — |
| L12-3-07 | câu nối Gaussian → Bernoulli, Định nghĩa 12.5 | nguồn gốc (entropy chéo) | mở cụm B | L12-3-06, Định lý 11.4 | L12-3-08 | — |
| L12-3-08 | Mệnh đề 12.6 | nguồn gốc (entropy chéo) | phát biểu | L12-3-07 | L12-3-09 | nối với entropy chéo Bài 11 |
| L12-3-09 | ý tưởng chứng minh 12.6 | nguồn gốc | chứng minh | L12-3-08 | L12-3-10 | công thức then chốt trùng deck 11 (trung bình) |
| L12-3-10 | Ví dụ 12.5, Nhận xét 12.7 | sự tồn tại | ví dụ, ứng dụng (chính quy hóa) | L12-3-08 | L12-3-12, (6.5) ở L12-4-02 | — |
| L12-3-11 | Bài tập 12.1 câu 4 | tồn tại (Gaussian) | kiểm tra cụm A | L12-3-04 | — | chuyển lên sau L12-3-06 |
| L12-3-12 | Bài tập 12.2 câu 3 | tồn tại (Bernoulli) | kiểm tra cụm B | L12-3-10 | mạch 4 (ghi chú diễn giả L12-4-00) | — |

### Mạch 4 — Rủi ro kỳ vọng và tối thiểu hóa rủi ro thực nghiệm (L12-4-00 … L12-4-07)

**Câu hỏi của mạch:** đại lượng nào đo sai số trên quan sát mới, và hàm chọn bằng rủi ro thực nghiệm nhỏ nhất có rủi ro đó nhỏ không? Vế 1 nằm trên L12-4-01 (dòng đầu); vế 2 nằm trên L12-4-03 ("Câu hỏi: Tại sao không đo chất lượng …"), trang thứ 3 trên 7, trước nửa sau của mạch.

| ID | chức năng thực tế | phần việc phục vụ | vai trò trong mạch | kết nối vào | kết nối ra | đề xuất |
|---|---|---|---|---|---|---|
| L12-4-00 | tiêu đề mạch | khung | điểm vào | hai mục tiêu huấn luyện (ghi chú diễn giả) | — | — |
| L12-4-01 | Định nghĩa 12.8, $R^*_{\mathcal H}$, $R^*$ | vế 1 | phát biểu | L12-2-01 (ba bộ phân loại) | L12-4-02, L12-5-08 | — |
| L12-4-02 | Định nghĩa 12.10, (6.5) | vế 2 (quy tắc) | phát biểu, câu nối với mạch 3 | (4.3), (5.1) | (E2) ở L12-5-06 | thêm giới hạn (G2) (trung bình; hoặc ở L12-5-03) |
| L12-4-03 | Ví dụ 12.7 | vế 2 (khoảng cách $\tfrac12$) | ví dụ | L12-4-02 | L12-5-01 (giới hạn của (7.1)) | — |
| L12-4-04 | Mệnh đề 12.11 | vế 2 trên lớp ngưỡng | phát biểu | L12-2-03 | L12-4-05, L12-4-06 | — |
| L12-4-05 | ý tưởng chứng minh 12.11 | như trên | chứng minh | L12-4-04 | — | — |
| L12-4-06 | Ví dụ 12.8, bảng, hình | vế 2 (ERM không phân biệt các ngưỡng) | ví dụ, ứng dụng | L12-4-04 | $R(h_{0{,}3})=0{,}15$ → L12-5-02, L12-6-08 | — |
| L12-4-07 | Bài tập 12.3 câu 1–2 | vế 1, 2 | kiểm tra | L12-4-04 | — | — |

### Mạch 5 — Hội tụ đều và rủi ro dư (L12-5-00 … L12-5-10)

**Câu hỏi của mạch:** khi nào hai rủi ro của hàm chọn từ mẫu gần nhau, và rủi ro dư của ERM bị chặn bao nhiêu? Vế 1 nằm trên L12-5-01; vế 2 lên mặt trang ở L12-5-06 (trang thứ 6 trên 10, phát hiện nhẹ).

| ID | chức năng thực tế | phần việc phục vụ | vai trò trong mạch | kết nối vào | kết nối ra | đề xuất |
|---|---|---|---|---|---|---|
| L12-5-00 | tiêu đề mạch | khung | điểm vào | L12-4-03 (ghi chú diễn giả) | giới hạn $M<\infty$ (chỉ ghi chú diễn giả) | — |
| L12-5-01 | Nhắc lại (7.1), vì sao hỏng với $\hat h_S$, Định nghĩa 12.12 | vế 1 | vấn đề, trực quan, định nghĩa | L12-4-03, Định lý 05c.52 | L12-5-02, L12-5-03 | thêm vế đích (rủi ro của ERM) |
| L12-5-02 | Ví dụ 12.9 | vế 1 trên ba lớp | ví dụ | L12-2-03, L12-4-06 | cột $2\Delta_S$ ở L12-5-09 | — |
| L12-5-03 | Định lý 12.13, (7.3) | vế 1 (lớp hữu hạn) | phát biểu | L12-5-01 | L12-5-04…06 | nơi đặt "Lưu ý:" về (G2) |
| L12-5-04 | ý tưởng chứng minh 12.13 | vế 1 | chứng minh, kỹ thuật | Hệ quả 10.7, (7.1) | L12-5-10 | — |
| L12-5-05 | Ví dụ 12.10 | vế 1 (cỡ mẫu) | ví dụ, ứng dụng (lưới siêu tham số) | L12-5-03 | $0{,}0644$ ở ghi chú diễn giả L12-5-06, L12-6-02 | — |
| L12-5-06 | Hệ quả 12.15, Trực quan nối hai mục tiêu | vế 2 | phát biểu | L12-5-03, (6.5) | L12-6-01 ("Hệ quả 12.15 có hai mức") | — |
| L12-5-07 | ý tưởng chứng minh 12.15 (Bổ đề 12.14) | vế 2 | chứng minh, kỹ thuật | L12-5-06 | tên kỹ thuật dùng ở deck 13 | — |
| L12-5-08 | Mệnh đề 12.16 | vế 2 (so với Bayes) | phát biểu | Bổ đề 12.14 | L12-5-09 | — |
| L12-5-09 | Ví dụ 12.11 | vế 2 trên ba lớp | ví dụ | L12-5-02 | L12-6-08, L12-7-02 | — |
| L12-5-10 | Bài tập 12.10 | vế 1, 2 | kiểm tra | L12-5-04, L12-5-07 | — (thiếu câu nối $M<\infty$ trên mặt trang) | xem phát hiện mạch 6 |

### Mạch 6 — Học PAC và số chiều VC (L12-6-00 … L12-6-10)

**Câu hỏi của mạch:** lớp vô hạn được bảo đảm thế nào (và bảo đảm mất hiệu lực khi nào)? Câu hỏi nằm trên L12-6-01; lý do của nó nằm trên L12-6-03 (phát hiện nhẹ).

| ID | chức năng thực tế | phần việc phục vụ | vai trò trong mạch | kết nối vào | kết nối ra | đề xuất |
|---|---|---|---|---|---|---|
| L12-6-00 | tiêu đề mạch | khung | điểm vào | Hệ quả 12.15, lớp vô hạn (ghi chú diễn giả) | — | dòng dẫn không dùng "Số chiều VC" làm chủ ngữ |
| L12-6-01 | câu hỏi mạch, Định nghĩa 12.17 | loại bảo đảm | vấn đề, phát biểu | L12-5-06 | L12-6-02; (8.1) dùng ở Bài tập 12.5 | đưa lý do $M$ không dùng được lên đây |
| L12-6-02 | đọc $\varepsilon$, $\delta$; ví dụ $6636$ | loại bảo đảm | ví dụ, diễn giải | L12-6-01, Ví dụ 12.10 | L12-7-05 câu 3 | — |
| L12-6-03 | Ví dụ 12.12 | độ phức tạp lớp vô hạn | ví dụ trước định nghĩa (theo §8.2) | L12-5-03 ($M$) | L12-6-04 | mở thẳng bằng "Dữ kiện:" |
| L12-6-04 | Định nghĩa 12.18 | độ phức tạp | trực quan, định nghĩa | L12-6-03 | L12-6-05 | — |
| L12-6-05 | Định lý 12.19 | độ phức tạp | phát biểu | L12-6-04 | L12-6-06…08 | — |
| L12-6-06 | ý tưởng chứng minh 12.19 | độ phức tạp | chứng minh, kỹ thuật | L12-6-03 | L12-6-10 | — |
| L12-6-07 | Định lý 12.20 (đọc thêm) | bảo đảm cho lớp vô hạn | phát biểu | L12-6-05, L12-5-03 | (8.5) ở L12-6-08 | — |
| L12-6-08 | Tình huống 12.1 | ứng dụng | ứng dụng | L12-4-06, L12-5-09, (8.5) | L12-7-02 | bỏ dòng trùng về sai số ước lượng |
| L12-6-09 | Tình huống 12.2 | giới hạn (G1) | ứng dụng, giới hạn | L12-2-02 (G1), L12-6-05 | L12-7-02 ("phân phối đổi"), L12-7-07 | đưa giới hạn vào câu hỏi mạch |
| L12-6-10 | Bài tập 12.11 | độ phức tạp | kiểm tra | L12-6-06 | — | — |

### Mạch 7 — Tổng kết (L12-7-00 … L12-7-07)

**Câu hỏi của mạch:** trả lời câu hỏi trung tâm cho cả bài, với giả thiết không được bỏ. Thành phần theo NT15: bảng tổng kết, "Vấn đề trung tâm", bài tập tổng hợp có lời giải, câu hỏi tự kiểm tra, bài tập về nhà, "Tài liệu tham khảo". Thứ tự đúng.

| ID | chức năng thực tế | phần việc phục vụ | vai trò trong mạch | kết nối vào | kết nối ra | đề xuất |
|---|---|---|---|---|---|---|
| L12-7-00 | tiêu đề "7. Tổng kết" | khung | điểm vào | mọi mạch | — | — |
| L12-7-01 | bảng 8 kết quả × giả thiết × công thức | tổng hợp | bảng | mạch 3–6 | — | ô "Hội tụ đều" là phương án đặt giới hạn mất mát bị chặn |
| L12-7-02 | "Vấn đề trung tâm": bốn câu trả lời cho cả bài | trả lời | trả lời | L12-1-05, L12-5-02, L12-6-08, L12-6-09 | khớp luận điểm bìa (hai điều kiện) | — |
| L12-7-03 | Bài tập 12.17, đề | tổng hợp | kiểm tra | ERM, (7.8), Tình huống 12.1 | L12-7-04 | thuật ngữ "quá khớp" mới (nhẹ) |
| L12-7-04 | lời giải 12.17 | tổng hợp | lời giải | L12-7-03 | — | gắn nghĩa "quá khớp" bằng $\hat R_S=0$, $R=\tfrac12$ |
| L12-7-05 | bốn câu hỏi tự kiểm tra | kiểm tra | kiểm tra | L12-3-03, L12-4-01, L12-6-02, L12-6-06 | — | mỗi câu trả lời được từ mặt trang hoặc ghi chú |
| L12-7-06 | bảng `Mục \| Bài tập`, hai liên kết trình xem | bài tập về nhà | bài tập | `exercises.md`, §10 | trình xem (đã kiểm) | — |
| L12-7-07 | tài liệu theo §12, dòng nối Bài 13 | tham khảo, cầu nối | kết bài | §11, §12 | deck 13 | thêm "cố định" |

## 3. Đối chiếu trang → mục ghi chú

| Trang | Mục ghi chú | Khối |
|---|---|---|
| L12-1-01 … L12-1-05 | đoạn mở đầu, Mục tiêu học tập, Kiến thức tiên quyết, §12 | — |
| L12-2-01 | Câu hỏi mở đầu | — |
| L12-2-02 | §1, §2 | (G1)–(G3) |
| L12-2-03 | §3 | Ví dụ 12.1 |
| L12-3-01 | §4 (đoạn mở), §4.3 | Ví dụ 12.2 (Nhắc lại) |
| L12-3-02 … L12-3-04 | §4.1, §4.2 | Định nghĩa 12.1, Mệnh đề 12.2, Nhận xét 12.4 |
| L12-3-05, L12-3-06 | §4.3 | Mệnh đề 12.3, Ví dụ 12.3 |
| L12-3-07 … L12-3-10 | §5 (đoạn mở), §5.1–§5.3 | Định nghĩa 12.5, Mệnh đề 12.6, Ví dụ 12.5, Nhận xét 12.7 |
| L12-3-11, L12-3-12 | §10 | Bài tập 12.1 câu 4, 12.2 câu 3 |
| L12-4-01 | §6 (đoạn mở), §6.1 | Định nghĩa 12.8 (Mệnh đề 12.9 ở ghi chú diễn giả) |
| L12-4-02, L12-4-03 | §6.3 | Định nghĩa 12.10, Ví dụ 12.7 |
| L12-4-04 … L12-4-06 | §6.4 | Mệnh đề 12.11, Ví dụ 12.8 |
| L12-4-07 | §10 | Bài tập 12.3 câu 1–2 |
| L12-5-01, L12-5-02 | §7.1, §7.2 | (7.1), Định nghĩa 12.12, Ví dụ 12.9 |
| L12-5-03 … L12-5-05 | §7.3 | Định lý 12.13, Ví dụ 12.10 |
| L12-5-06, L12-5-07 | §7.4 | Hệ quả 12.15, Bổ đề 12.14 |
| L12-5-08, L12-5-09 | §7.5 | Mệnh đề 12.16, Ví dụ 12.11 |
| L12-5-10 | `exercises.md` | Bài tập 12.10 |
| L12-6-01, L12-6-02 | §8 (đoạn mở), §8.1 | Định nghĩa 12.17 |
| L12-6-03 … L12-6-06 | §8.2 | Ví dụ 12.12, Định nghĩa 12.18, Định lý 12.19 |
| L12-6-07 | §8.3 | Định lý 12.20 |
| L12-6-08, L12-6-09 | §9.1, §9.2 | Tình huống 12.1, 12.2 |
| L12-6-10 | `exercises.md` | Bài tập 12.11 |
| L12-7-01, L12-7-02 | §9.4, §11 | — |
| L12-7-03, L12-7-04 | `exercises.md` | Bài tập 12.17 |
| L12-7-05 … L12-7-07 | §10, §11, §12 | — |

Thứ tự khái niệm và thứ tự mạch khớp thứ tự mục của ghi chú. Chỉ có hai chỗ đảo: Bổ đề 12.14 nằm trong trang ý tưởng chứng minh của Hệ quả 12.15 (storyboard Q7, đã chấp nhận), và Ví dụ 12.2 được nhắc lại ở đầu §4 thay vì sau Mệnh đề 12.3 (Q2, đã chấp nhận; đầu §4 của ghi chú cũng mở bằng đúng ba điểm này). Không mạch nào dẫn kết quả của trang sau.

## 4. Bảng `Mục | Bài tập` (L12-7-06)

Đủ 17 bài (12.1–12.17), không bài nào lặp. Vị trí theo quy tắc "mạch cung cấp kiến thức cuối cùng bài cần":

- **Mạch 3:** 12.1, 12.6, 12.7, 12.8, 12.9.
- **Mạch 4:** 12.2 (câu 2 cần rủi ro thực nghiệm $0$–$1$, câu 5 cần rủi ro kỳ vọng), 12.3 (câu 4 dùng Ví dụ 12.7), 12.12 (tỉ lệ phân loại sai trên tập huấn luyện).
- **Mạch 5:** 12.10.
- **Mạch 6:** 12.4, 12.5 (dùng (8.1)), 12.11, 12.13, 12.14, 12.15 (Tình huống 12.2), 12.16 (cần (7.8) và số chiều VC), 12.17 (dùng $R(g)=\tfrac12$ của Tình huống 12.1).

Dòng "12.2 (câu 3 trên lớp)" nằm ở mạch 4 trong khi lời giải câu 3 ở L12-3-12 (mạch 3). Vị trí này đúng quy tắc, không cần sửa. Hai liên kết trình xem đúng tham số `doc` và `deck`.

## 5. Tính liên tục (Outline, Threads, Concept)

**Các mạch mở và nơi khép:**

- Câu hỏi trung tâm: mở ở L12-1-05, khép ở L12-7-02. Câu trả lời khớp luận điểm bìa: hai điều kiện "lớp đủ hẹp so với cỡ mẫu" và "cùng phân phối".
- Câu hỏi mở đầu: mở ở L12-2-01, khép ở L12-4-06 ($R(h_{0{,}3})=0{,}15$), L12-6-08 ($R(g)=\tfrac12$) và L12-7-02.
- "Mô hình quyết định nghiệm có tồn tại, duy nhất": mở ở L12-3-01, khép ở L12-3-05, L12-3-06 (duy nhất) và L12-3-10, L12-3-12 (tồn tại).
- (7.1) không áp dụng cho $\hat h_S$: mở ở L12-5-01, khép ở L12-5-03.
- $M<\infty$: mở ở L12-5-03, khép ở L12-6-03 và L12-6-07. Câu nối đến muộn (phát hiện nhẹ).
- (G1): mở ở L12-2-02, vi phạm ở L12-6-09, nhắc lại ở L12-7-02.
- (G2) và mất mát không bị chặn: mở ở L12-2-02. Mạch này **không khép trên mặt trang** (phát hiện trung bình).

**Khái niệm và trang giới thiệu:** mọi ký hiệu trên mặt trang có trang giới thiệu hoặc dòng "Nhắc lại:" đứng trước. Danh sách ký hiệu đã kiểm: $\mathbf 1_{\{p\}}$, $P$, $S$, $\ell$, $\mathcal H$, $m_\theta$, $\hat L_n$, $R$, $\hat R_S$, $R^*_{\mathcal H}$, $R^*$, ERM, $\eta$, $x_\pm$, $\Delta_S$, $\varepsilon_n$, $N_{\mathcal H}$, $\tilde h$, $\eta_S$, $\mathcal H_{\mathrm{aff}}$, $d_{\mathrm{VC}}$, $c_0$. Ngoại lệ: PAC/VC trên trang tổng quan và "quá khớp" (phát hiện nhẹ). Không trang nào xem trước Bài 13. L12-7-07 nêu cầu nối bằng lời, đúng NT15.

**Deck 11 → deck 12:**

- Cầu nối khớp: TK05 của deck 11 ("tham số của phân phối phụ thuộc đầu vào … dự đoán quan sát mới tốt đến đâu") ứng với ghi chú diễn giả L12-1-01 và L12-2-00.
- Lệch: tên "rủi ro thực nghiệm" và "entropy chéo nhị phân" được nêu lại như thuật ngữ mới (nhẹ).
- Trùng: phép chứng minh thứ tự của Mệnh đề 11.3 lặp trên L12-3-09 (trung bình).
- Hiện tượng hợp lý không bị chặn ở L12-3-04 và L12-3-11 dùng dữ liệu khác deck 11 (TK04 câu 3); ghi chú diễn giả L12-3-11 đã nối với Bài 11. Đây không phải trùng lặp.

**Deck 12 → deck 13:**

- Tên kỹ thuật trùng nguyên văn. L12-5-07: "Chèn một đại lượng trung gian rồi chuyển vế; so với phần tử bất kỳ rồi lấy cận dưới đúng". Deck 13: "Nhắc lại: so với phần tử bất kỳ rồi lấy cận dưới đúng …", "Nhắc lại: chèn một đại lượng trung gian rồi chuyển vế …".
- Deck 13 nối ngược đúng ý: "dữ liệu không còn độc lập cùng phân phối như ở Bài 12".
- Hai deck không trùng ví dụ hay bảng.

## 6. Đề xuất sửa ghi chú (NT3)

- **D-MT1.** Thuật ngữ *quá khớp* (overfitting) xuất hiện trong đề Bài tập 12.17 (`exercises.md`, dòng 636–640) nhưng ghi chú bài giảng không định nghĩa hay dùng nó. Đề xuất: gọi tên hiện tượng tại Ví dụ 12.7 hoặc Tình huống 12.1, ví dụ "rủi ro thực nghiệm $0$ trong khi rủi ro kỳ vọng $\tfrac12$: *quá khớp* (overfitting)". Như vậy bài tập tổng hợp không đưa thuật ngữ mới vào mạch Tổng kết của deck.
- Ngoài ý trên, không thấy khoảng trống mạch lập luận nào của ghi chú. Phần lặp "sai số ước lượng của $g$" (Ví dụ 12.11, Tình huống 12.1, lời giải Bài tập 12.17) là chủ ý của ví dụ xuyên suốt và không cần sửa ở ghi chú.

## 7. Kết luận

**đạt khi sửa.** Hai phát hiện trung bình cần sửa: công thức then chốt của L12-3-09 trùng deck 11; giới hạn "mất mát bị chặn" chưa có trên mặt trang. Mười phát hiện nhẹ là câu nối, thứ tự trang và tên gọi, sửa được trong trần mật độ. Không có phát hiện chặn bàn giao hay nghiêm trọng. Câu hỏi của mọi mạch đều có trên mặt trang trước nửa sau của mạch, và Tổng kết trả lời câu hỏi trung tâm cho cả bài.
