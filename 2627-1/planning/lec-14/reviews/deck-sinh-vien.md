# Duyệt deck Bài 14 — Vai 1 `sinh-vien` (2026-11-16)

Bản deck đóng băng: `2627-1/lecture-14-hoc-bieu-dien-mo-hinh-sinh.html` (60 trang). Đối chiếu: `materials/lec-14/lecture-note.md`, `exercises.md`, `planning/lec-14/storyboard.md` (bảng đếm mật độ, mục 12 Q10, mục "Lệch storyboard khi dựng deck").

Đã chạy (thư mục nháp `/tmp/claude-1000/-data-tqlong-lectures/3d919d23-7082-4f41-9671-9ec3fcf3fa09/scratchpad/lec-14/rv-sinh-vien/`):

- `deck_lint.py`: 9 phát hiện (SYLL60 ×7, LINES6 ×2), đều trùng bảng mật độ dưới đây.
- `deck_check.py --shots` (1600×900 và 390×844, cuộn tới cuối ở màn hẹp): console=0, pageerrors=0, failed=0, không `.katex-error`. OVERFLOW/NARROW-H chỉ ở L14-3-06, 4-04, 4-05, 7-03, 7-05 (đuôi SVG của `\sqrt`, báo động giả đã biết). Lần chụp màn hẹp hết thời gian chờ hai lần ở L14-5-10 và L14-6-00. Phần còn lại (L14-6-00 đến L14-6-07) chụp lại bằng script riêng cùng kích thước, có ảnh `-end`.
- `footer_check.py`: 0 trang chạm chân trang.
- Đo kích thước hiển thị của hai SVG bằng Playwright, đọc `font-size` và `viewBox` trong tệp SVG.
- Đã xem toàn bộ ảnh 1600×900 và 390×844 (kể cả ảnh `-end`). Không kiểm tra điều hướng bàn phím.

## Bảng đếm mật độ (NT17, theo `deck_lint.py`; dòng dài nhất theo `deck_check.py`)

Âm tiết = token cách nhau bởi khoảng trắng, không tính tiêu đề, KaTeX, số trong ô bảng, nhãn hình, ghi chú diễn giả. "Dòng" = `p`, `li`, công thức hiển thị, mỗi bảng một dòng.

| Trang | Âm tiết | Trần | Dòng | CT hiển thị | Dòng dài nhất | Ghi chú |
|---|---:|---:|---:|---:|---:|---|
| L14-1-01 | 76 | bìa | 3 | 0 | 39 | bìa, không áp trần |
| L14-1-02 | 59 | 60 | 5 | 0 | **22** | dòng > 20 |
| L14-1-03 | **94** | 80 | 6 | 0 | 18 | ngoại lệ Q10 (1,18×) |
| L14-1-04 | 38 | 80 | 8 | 0 | 6 | trang "Nội dung", 7 mạch |
| L14-1-05 | 27 | 60 | 1 | 0 | 27 | nguyên văn câu hỏi trung tâm (Q10) |
| L14-2-01 | 52 | 60 | 6 | 0 | 16 | |
| L14-2-02 | 55 | 60 | 5 | 1 | 18 | |
| L14-2-03 | 59 | 60 | 4 | 0 | 17 | |
| L14-2-04 | 43 | 60 | 6 | 1 | 19 | |
| L14-2-05 | 34 | 60 | 5 | 0 | 13 | |
| L14-2-06 | 55 | 60 | 6 | 1 | 15 | |
| L14-2-07 | 45 | 60 | 6 | 1 | 14 | |
| L14-2-08 | 60 | 60 | 6 | 0 | 16 | đúng trần |
| L14-2-09 | 51 | 60 | 5 | 0 | 15 | |
| L14-3-01 | 56 | 60 | 4 | 1 | **21** | dòng > 20 |
| L14-3-02 | 57 | 60 | 6 | 0 | 16 | |
| L14-3-03 | 57 | 60 | 6 | 1 | 19 | |
| L14-3-04 | 47 | 60 | 6 | 0 | 14 | |
| L14-3-05 | 60 | 60 | 5 | 0 | 20 | đúng trần |
| L14-3-06 | 48 | 60 | **7** | 0 | 15 | ngoại lệ 7 dòng (Q10) |
| L14-4-01 | 55 | 60 | 5 | 0 | 18 | |
| L14-4-02 | 44 | 60 | 6 | 2 | 14 | |
| L14-4-03 | 48 | 60 | 6 | 1 | 19 | |
| L14-4-04 | 47 | 60 | 6 | 1 | 14 | |
| L14-4-05 | 47 | 60 | 6 | 1 | 18 | |
| L14-4-06 | **80** | 60 | 5 | 0 | **31** | ngoại lệ âm tiết (1,33×); dòng > 20 chưa ghi ngoại lệ |
| L14-5-01 | 60 | 60 | 4 | 0 | 17 | đúng trần |
| L14-5-02 | 58 | 60 | 5 | 1 | **22** | dòng > 20 |
| L14-5-03 | 48 | 60 | 6 | 1 | 12 | |
| L14-5-04 | 60 | 60 | 5 | 1 | 19 | đúng trần |
| L14-5-05 | 40 | 60 | 6 | 1 | 18 | |
| L14-5-06 | 60 | 60 | 6 | 1 | 14 | đúng trần |
| L14-5-07 | 71 | 80 | 3 | 0 | 18 | bảng so sánh |
| L14-5-08 | 53 | 60 | 6 | 2 | 16 | |
| L14-5-09 | 43 | 60 | 6 | 1 | 14 | |
| L14-5-10 | 32 | 60 | 5 | 0 | 8 | |
| L14-5-11 | **87** | 60 | 4 | 0 | **33** | ngoại lệ ghi 86 (1,45×); dòng > 20 chưa ghi ngoại lệ |
| L14-6-01 | 56 | 60 | 4 | 0 | 17 | |
| L14-6-02 | 59 | 60 | 6 | 1 | 17 | |
| L14-6-03 | 52 | 60 | 6 | 1 | 14 | |
| L14-6-04 | 57 | 60 | 6 | 1 | **21** | dòng > 20 |
| L14-6-05 | 44 | 60 | 5 | 0 | 19 | |
| L14-6-06 | 39 | 60 | **7** | 1 | 13 | ngoại lệ 7 dòng (mục "Lệch storyboard") |
| L14-6-07 | 60 | 60 | 4 | 0 | 18 | đúng trần |
| L14-6-08 | **86** | 60 | 5 | 0 | 18 | ngoại lệ (1,43×) |
| L14-6-09 | 53 | 60 | 5 | 0 | 20 | |
| L14-7-01 | 33 | 80 | 1 | 0 | — | bảng tổng kết |
| L14-7-02 | 55 | 80 | 1 | 0 | — | bảng tổng kết |
| L14-7-03 | 69 | 80 | 4 | 0 | 20 | "Vấn đề trung tâm" của Tổng kết, trần 80 (mục "Lệch storyboard") |
| L14-7-04 | 37 | 60 | 4 | 1 | 16 | |
| L14-7-05 | 35 | 60 | 5 | 0 | 17 | |
| L14-7-06 | 58 | 60 | 3 | 0 | 20 | |
| L14-7-07 | 30 | 80 | 2 | 0 | 6 | |
| L14-7-08 | **69** | 60 | 5 | 0 | 19 | ngoại lệ "tên sách" (ghi dưới mã cũ L14-7-07) |

Trang tiêu đề mạch (dòng dẫn ≤ 25 âm tiết): L14-2-00 16, L14-3-00 20, L14-4-00 17, L14-5-00 23, L14-6-00 19, L14-7-00 23 — đạt.

Không trang nào vượt 1,5 lần trần. Mọi trang vượt trần âm tiết hoặc số dòng đều có ngoại lệ trong storyboard. Phần chưa có ngoại lệ là trần dòng 20 âm tiết và trần hộp chữ (phát hiện 4 và 5 dưới đây). Không trang nào có quá 3 công thức hiển thị.

## Phát hiện

| mức độ | trang chiếu | vấn đề | bằng chứng | đề xuất sửa |
|---|---|---|---|---|
| trung bình | L14-6-01 | NT25: hình `vae-paths-wide.svg` mất chiều mũi tên ở 5/6 đoạn nối. Sinh viên không đọc được hướng của hai đường tính (quan sát → bộ mã hóa → … và tiên nghiệm → … → x mới), mà hướng là nội dung chính của hình. | Tệp SVG: `<g stroke="#334155" stroke-width="2.5" marker-end="url(#a)"><path d="M190 108H226M420 108H456M765 108H801M190 298H226M420 298H456M765 298H801"/></g>`. Một `path` nhiều đoạn con chỉ nhận `marker-end` ở đỉnh cuối. Ảnh 1600×900 chỉ có một đầu mũi tên, giữa "Bộ giải mã" và "Lấy mẫu x mới". | Tách thành sáu `<path>`, mỗi đoạn một `marker-end` (hoặc thêm `marker-start`/`marker-mid` phù hợp). Kiểm lại ảnh. |
| trung bình | L14-6-01 (390×844) | NT25: chữ trong hình dưới 16 px ở màn hẹp, không đọc được. | `font-size="28"` trên `viewBox` rộng 990. Ảnh hiển thị rộng 336 px ở 390×844, nên chữ cao ≈ 28·336/990 ≈ 9,5 px. Ở 1600×900, hình rộng 698 px, chữ ≈ 19,7 px (đạt). Ảnh `narrow-L14-6-01.png`: các nhãn "Trung bình μφ(x)", "Độ lệch chuẩn σφ(x)" không đọc được. | Ở màn hẹp dùng bản dọc `img/lec-14/vae-paths.svg` (600×850, đã có), qua `<picture><source media="(max-width: …)">` hoặc lớp CSS do điều phối viên thêm vào `lecture-course.css`. Đo lại cỡ chữ ở 390 px. |
| trung bình | L14-5-02 | NT20, NT2: dòng "Trực quan." mô tả sai cơ chế. Hàm dưới dấu tích phân $q\log(q/p)$ có thể âm tại từng điểm, và trang ý tưởng chứng minh kế tiếp nói đúng điều đó ("phần âm bị chặn bởi $p$"). Người đọc lần đầu sẽ thấy hai trang liền nhau mâu thuẫn. | L14-5-02: "**Trực quan.** $\log t\le t-1$ làm mỗi điểm của tích phân thành số hạng không âm." L14-5-03, bước 2: "$q\log\frac qp=q\,\psi(t)+q-p\ge-p$: phần âm bị chặn bởi $p$ khả tích". Ghi chú dòng 701: "Phần âm của hàm dưới dấu tích phân vì vậy bị chặn bởi $p$". | "**Trực quan.** Viết $q\log\frac qp=q\,\psi(p/q)+(q-p)$: số hạng đầu không âm tại mỗi điểm, số hạng sau có tích phân không âm." Câu này không dùng ký hiệu mới ngoài $\psi$. Nếu muốn tránh $\psi$ trước L14-5-03, viết "$q\log\frac qp\ge q-p$ (vì $\log t\le t-1$), và $\int(q-p)\ge0$." |
| trung bình | 390×844: L14-2-04, 2-06, 2-07, 3-01, 3-03, 4-02, 4-03, 4-04, 4-05, 5-02, 5-03, 5-04, 5-05, 5-06, 5-08, 5-09, 6-02, 6-03, 6-04, 6-06, 7-04 | `../CLAUDE.md` "Display formulas" và AGENTS §"Tiêu chuẩn trình bày" ("Công thức trung tâm … không bị cắt"): ở màn hẹp, công thức hiển thị bị cắt ở mép phải và chỉ cuộn ngang được. Phần bị che thường là kết luận, nên người học chỉ thấy vế trái. Số hiệu (4.4), (6.1), (7.3)… cũng không thấy. | Ảnh `narrow-011-L14-2-06.png`: chỉ thấy "$\widehat J(U)=\frac1n\sum\|y_i-UU^\top y_i\|_2^2=$", mất "$\operatorname{tr}(S)-\operatorname{tr}(U^\top SU)$" và "(4.4)". `narrow-009-L14-2-04`: mất "$\ge0$". `narrow-034-L14-5-05`: (7.3) dừng ở "$\mathrm{KL}(q_\phi$". `narrow-037-L14-5-08`: (7.4), (7.5) mất nửa phải. `narrow-L14-6-06`: $\widehat{\mathcal L}_i$ mất số hạng lỗi và KL. | Với các công thức là kết quả của trang ((4.4), (5.1), (6.1), (7.2)–(7.6), (8.3), $\widehat{\mathcal L}_i$, bất đẳng thức then chốt ở L14-2-04, L14-3-03), viết `aligned` một quan hệ mỗi dòng sao cho vừa 390 px, rồi kiểm lại `footer_check.py` ở 1600×900. Khi không ngắt được, đặt số hiệu ở đầu dòng chữ đứng trước công thức. |
| trung bình | L14-4-06, L14-5-11, L14-6-08, L14-7-04 | NT17: trần "≤ 1 hộp chữ ≤ 2 câu" bị vượt, và storyboard chỉ ghi ngoại lệ về âm tiết hoặc số dòng cho các trang này. Theo quy tắc chung: vượt trần không có ngoại lệ thì xếp `trung bình`. | Đếm `class="check"`: L14-4-06 có 2 hộp (mỗi hộp 2 câu); L14-5-11 có 2 hộp (hộp (4) 3 câu: "Tính biên … Tính KL … Mô tả …"); L14-6-08 có 1 hộp 5 câu; L14-7-04 có 1 hộp 3 câu. Storyboard, bảng đếm: "ngoại lệ: đề Bài tập 14.1 câu 3–4 giữ câu chữ" (chỉ nói âm tiết). | Ghi ngoại lệ hộp chữ vào storyboard (lý do NT24: giữ câu chữ đề) cho bốn trang. Hoặc giữ một hộp "Câu hỏi:" và đặt câu (4), (5) thành đoạn thường ngay dưới. |
| nhẹ | L14-1-02, L14-3-01, L14-5-02, L14-6-04; L14-4-06, L14-5-11 | NT17: dòng quá 20 âm tiết. Ở hai trang bài tập, ngoại lệ chỉ nói về tổng âm tiết. | L14-1-02 (22): "Nhiễu Gaussian phương sai cố định cho âm log-hợp lý tỉ lệ với tổng bình phương sai số, sai khác hằng số." L14-3-01 (21): "Trực quan. Gần một đường cong, bộ mã hóa gán tọa độ dọc đường cong; bộ giải mã dựng lại điểm." L14-5-02 (23): dòng Bổ đề 14.13. L14-6-04 (21): bước 3. L14-4-06 (32, 26), L14-5-11 (35, 34): các dòng đề. | L14-1-02: "Nhiễu Gaussian phương sai cố định: âm log-hợp lý bằng tổng bình phương sai số chia hằng số, cộng hằng số" hoặc tách Giả thiết/Kết luận thành hai dòng. L14-5-02: tách "Giả thiết:" và "Kết luận:" của Bổ đề 14.13 thành hai dòng. L14-3-01, L14-6-04: rút một hai từ ("dọc đường cong" → "dọc nó"; bỏ "(dominated convergence theorem)" vì đã có ở ghi chú, hoặc giữ và tách dòng). Hai trang bài tập: mở rộng ngoại lệ Q10 sang trần dòng. |
| nhẹ | L14-1-03 | Đọc lần đầu, các mục tiêu rút gọn khó hiểu. Một chữ đổi nghĩa so với ghi chú. | Mục 4: "tách phân kỳ tới tiên nghiệm, hậu nghiệm" (ghi chú dòng 37: "phân biệt phân kỳ tới tiên nghiệm với phân kỳ tới hậu nghiệm"). "Tách" đọc như "phân rã". Mục 6: "chẩn đoán mô hình sinh kém dù lỗi, phân kỳ nhỏ" (ghi chú: "lỗi tái tạo nhỏ hoặc phân kỳ nhỏ vẫn đi cùng một mô hình sinh kém"). Mục 5: "Tính cận dưới Gaussian" bỏ "phân kỳ giữa các phân phối Gaussian, kỳ vọng tái tạo". | Mục 4: "… phân biệt phân kỳ tới tiên nghiệm với phân kỳ tới hậu nghiệm." Mục 6: "… chẩn đoán mô hình sinh kém khi lỗi tái tạo hoặc phân kỳ nhỏ." Trang đã có ngoại lệ (storyboard ghi 100 âm tiết), nên thêm vài âm tiết vẫn dưới 1,5 lần trần. |
| nhẹ | L14-2-08 | NT9: dòng "Trực quan." dùng $V_k$ trước khi "Giả thiết:" ngay dưới định nghĩa nó. | "**Trực quan.** $V_k$ giữ $k$ trị riêng lớn nhất; …" đứng trước "Giả thiết: … $V_k=(v_1,\ldots,v_k)$". | "**Trực quan.** $k$ vector riêng đầu giữ $k$ trị riêng lớn nhất; quay trong không gian con giữ nguyên phép chiếu." |
| nhẹ | L14-3-03 | Ý tưởng chứng minh nhảy bước: bất đẳng thức thứ nhất của bước 3 dựa trên "ảnh của $U$ chứa $W$", nhưng ý này chỉ có trong ghi chú diễn giả. | Mặt trang: "Bổ sung cơ sở trực chuẩn của $W$ thành $U$, $U^\top U=I_k$; Định lý 14.6 cho $\widehat J(A,B)\ge\frac1n\sum\|y_i-UU^\top y_i\|_2^2\ge\sum_{j>k}\lambda_j$." Ghi chú diễn giả: "thay $P_W$ bằng $UU^\top$ (ảnh của $U$ chứa $W$)". | Thêm vào bước 3: "ảnh của $U$ chứa $W$ nên hình chiếu lên ảnh $U$ gần hơn;". |
| nhẹ | L14-4-05 | Ví dụ chưa đủ chậm: không thấy tại sao $(x_1-wz)^2$ có hệ số $1$. | Mặt trang: "Với hằng số chuẩn hóa $C$ và $w^2=3/2$: $\log p(x,z)=C-\frac{z^2}2-(x_1-wz)^2-x_2^2$". Hệ số $1/(2\tau^2)=1$ chỉ có ở ghi chú diễn giả. | "Với $1/(2\tau^2)=1$, hằng số chuẩn hóa $C$ và $w^2=3/2$:". |
| nhẹ | L14-4-06 | NT9: đề nhắc "hai hàm $f,g$", nhưng trang chỉ cho $g$. $f$ nằm ở L14-3-06, cách năm trang. | "Bài tập 14.1. Dữ liệu …; $g(z)=(z/2,z/2)^\top$, $X=g(Z)$." Đề câu (3): "Giải thích vì sao hai hàm $f,g$ chưa chỉ định một phân phối sinh." | Thêm "$f(x)=x_1+x_2$," vào dòng dữ liệu. |
| nhẹ | L14-5-01 | Câu "Trực quan." có hai cách đọc: "nên" là "cần" hay "do đó". Lý do của yêu cầu chưa có trên trang. | "**Trực quan.** Phân phối dễ lấy mẫu nên đặt khối lượng nơi hậu nghiệm lớn." | "**Trực quan.** Phân phối dễ lấy mẫu cần đặt khối lượng nơi hậu nghiệm lớn." |
| nhẹ | L14-6-01 | NT9: $(\mu_i,s_i)$ chưa được gọi tên trên mặt trang. | "Mỗi $x_i$ một cặp $(\mu_i,s_i)$: số biến tăng theo $n$." Ghi chú dòng 1116: "một cặp tham số $(\mu_i,s_i)$ cho hậu nghiệm xấp xỉ". | "Mỗi $x_i$ một hậu nghiệm xấp xỉ riêng, tham số $(\mu_i,s_i)$: số biến tăng theo $n$." |
| nhẹ | L14-6-03 | NT2: "hình cầu mở $\mathcal B$" thiếu tâm, nên người đọc không biết $\mathcal B$ nằm ở đâu. | Mặt trang: "khả vi liên tục theo $\vartheta$ trên hình cầu mở $\mathcal B$". Ghi chú dòng 1172: "trên một hình cầu mở $\mathcal B$ quanh điểm đang xét". | "… trên một hình cầu mở $\mathcal B$ quanh điểm đang xét". |
| nhẹ | L14-6-07 | "vùng đó" không có tiền ngữ rõ. Dòng cuối nối hai dấu hai chấm, khó theo. | "Sinh mẫu từ $p(z)$: cần kiểm tra bộ giải mã trên vùng đó, dữ liệu mới." "Bộ giải mã cũng bỏ qua $z$: cận chặt, biến ẩn bị bỏ: suy sụp hậu nghiệm (posterior collapse)." Ghi chú dòng 1357: "ở vùng mã mà tiên nghiệm sinh ra và kiểm tra mô hình trên dữ liệu mới". | "Sinh mẫu lấy mã từ $p(z)$: cần kiểm tra bộ giải mã trên vùng mã của $p(z)$ và trên dữ liệu mới." "Bộ giải mã cũng bỏ qua $z$ thì cận chặt nhưng biến ẩn không được dùng; hiện tượng này gọi là suy sụp hậu nghiệm (posterior collapse)." |
| nhẹ | L14-2-05 (390×844) | NT25: nhãn trong `pca-projection.svg` dưới 16 px ở màn hẹp. Ở 1600×900 đạt (≈ 24,7 px). | `font-size="25"`, `viewBox` rộng 600, hình hiển thị khoảng 300 px ở 390 px → ≈ 12,5 px. Ảnh `narrow-010-L14-2-05-end.png`: "Tổng lỗi: 2; lỗi trung bình: 1/2" rất nhỏ. Các số này có trong chữ trên mặt trang, nên không mất thông tin. | Tăng `font-size` lên ≥ 32, hoặc cho hình rộng hết khung ở màn hẹp. |
| nhẹ | storyboard, bảng đếm mật độ | Sau khi tách L14-7-01, mã trang trong bảng đếm không còn khớp deck. Ngoại lệ của trang "Tài liệu tham khảo" vẫn ghi dưới mã cũ. | Bảng: "L14-7-07 | 69 | … ngoại lệ: tên sách và số mục". Deck: trang này là L14-7-08; L14-7-07 là "Bài tập về nhà" (30 âm tiết). | Biên tập viên cập nhật bảng đếm theo mã mới (L14-7-01…08) khi sửa storyboard. |

Số phát hiện: chặn bàn giao 0, nghiêm trọng 0, trung bình 5, nhẹ 11.

Điểm đạt theo góc nhìn sinh viên, ghi lại để biên tập viên không sửa nhầm:

- Ví dụ xuyên suốt bốn quan sát được nhắc lại dữ kiện ở mỗi lần dùng (L14-2-01, 2-05, 3-04, 4-01, 4-05, 7-03, 7-05), mỗi lần trả lời một câu hỏi mới.
- Các con số đã tính lại tay đều khớp: L14-2-05, L14-3-04, L14-4-05, L14-5-09, L14-5-10, L14-5-11 (câu 3–5), L14-6-05, L14-6-09.
- Ký hiệu viết tắt PCA, AE, KL, ELBO, VAE, PPCA được giới thiệu trước khi dùng.
- Ở 1600×900, mọi trang vừa khung, không trang nào chạm chân trang.

## Đề xuất sửa ghi chú

Không có.

## Kết luận

**đạt khi sửa**: sửa hình L14-6-01 (mũi tên, cỡ chữ màn hẹp), dòng "Trực quan." của L14-5-02, công thức bị cắt ở 390 px, và ghi ngoại lệ hộp chữ (hoặc bố trí lại) cho bốn trang bài tập. Các phát hiện nhẹ sửa trong cùng lượt biên tập.
