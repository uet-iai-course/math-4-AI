# Duyệt deck Bài 13 — Vai 1 `sinh-vien`

Deck đóng băng: `2627-1/lecture-13-quyet-dinh-tuan-tu-bat-dinh.html` (57 trang). Đối chiếu: `materials/lec-13/lecture-note.md`, `exercises.md`, `planning/lec-13/storyboard.md`. `no-ai-slop` chế độ Detect cho các nhận xét câu chữ.

## Kiểm tra đã chạy

- `deck_lint.py`: 1 phát hiện, L13-7-04 SYLL60 (63 > 60). Ngoại lệ có lý do trong storyboard §6.8 (đề Bài tập 13.13 nguyên văn, dưới 1,5 lần trần), nên không ghi thành phát hiện.
- `deck_check.py --shots` (1600×900 và 390×844, có ảnh `-end`): console=0, pageerrors=0, failed=0, không `.katex-error`, không OVERFLOW.
- `footer_check.py`: 0 trang chạm chân trang.
- Đo thêm bằng Playwright ở 1600×900: hai hộp `.formula` tràn ngang (L13-4-03: scrollWidth 1261 > clientWidth 1248; L13-5-03: 1254 > 1248). Đo kích thước hiển thị của ba hình SVG để tính cỡ chữ thật.
- Mật độ đếm bằng script (logic của `deck_lint.py`, in số từng trang). Trong 50 trang nội dung (kể cả "Mục tiêu", "Nội dung", bảng tổng kết): 44 trang trên mức nhắm 40 âm tiết, 30 trang từ 55 trở lên, 1 trang vượt trần (L13-7-04, có ngoại lệ). Ghi chú diễn giả: tối đa 128 âm tiết, không trang nào vượt 150.
- Ảnh chụp: `/tmp/claude-1000/-data-tqlong-lectures/3d919d23-7082-4f41-9671-9ec3fcf3fa09/scratchpad/lec-13/rv-sinh-vien/shots/`.

## Bảng mật độ (âm tiết mặt trang / trần)

| Trang | Âm tiết | Trang | Âm tiết | Trang | Âm tiết |
|---|---|---|---|---|---|
| L13-1-02 | 60/60 | L13-3-08 | 58/60 | L13-5-04 | 27/60 |
| L13-1-03 | 80/80 | L13-3-09 | 51/60 | L13-5-05 | 57/60 |
| L13-1-04 | 52/80 | L13-3-10 | 36/60 | L13-5-06 | 48/60 |
| L13-1-05 | 26/60 | L13-3-11 | 46/60 | L13-5-07 | 57/60 |
| L13-1-06 | 59/60 | L13-4-01 | 58/60 | L13-5-08 | 59/60 |
| L13-2-01 | 58/60 | L13-4-02 | 55/60 | L13-6-01 | 60/60 |
| L13-2-02 | 51/60 | L13-4-03 | 52/60 | L13-6-02 | 56/60 |
| L13-2-03 | 60/60 | L13-4-04 | 60/60 | L13-6-03 | 56/60 |
| L13-2-04 | 46/60 | L13-4-05 | 58/60 | L13-6-04 | 53/60 |
| L13-2-05 | 45/60 | L13-4-06 | 55/60 | L13-6-05 | 59/60 |
| L13-3-01 | 57/60 | L13-4-07 | 59/60 | L13-6-06 | 60/60 |
| L13-3-02 | 43/60 | L13-5-01 | 60/60 | L13-7-01 | 64/80 |
| L13-3-03 | 58/60 | L13-5-02 | 59/60 | L13-7-02 | 41/80 |
| L13-3-04 | 60/60 | L13-5-03 | 32/60 | L13-7-03 | 60/60 |
| L13-3-05 | 34/60 | | | L13-7-04 | 63/60 (ngoại lệ) |
| L13-3-06 | 50/60 | | | L13-7-05 | 31/60 |
| L13-3-07 | 45/80 | | | L13-7-06 | 59/60 |
| | | | | L13-7-07 | 49/60 |
| | | | | L13-7-08 | 60/60 |

## Phát hiện

| mức độ | trang chiếu | vấn đề | bằng chứng | đề xuất sửa |
|---|---|---|---|---|
| nghiêm trọng | L13-5-04 | NT25: chữ trong hình không đọc được ở cả hai kích thước; công thức vẽ trong SVG; hình mang chú thích phủ định | `img/lec-13/value-iteration.svg` (xuất từ matplotlib) có `font-size` 6,3–13,2 px trong viewBox 800×354. Ở 1600×900 hình hiển thị cao 360 px (hệ số ≈1,02), nên chữ trục, chú giải, nhãn "$V^*(h)=6$", "$v=8/9$" chỉ cao 6–11 px; ở 390×844 hình rộng 336 px, chữ còn ≈3–5 px (ảnh `wide-036-L13-5-04.png`, `narrow-036-L13-5-04.png`). Chú giải vẽ công thức "Q_A(v) = 1 + 0,45v", "T(v) = max{Q_A; Q_B}". Dòng chú thích trong hình: "Thứ tự lựa chọn qua các vòng lặp là kết quả tính toán, không phải một chuỗi hành động của robot." | Vẽ lại một SVG riêng cho trang chiếu (như đã làm với `robot-mdp-slide.svg`): chữ ≥ 16 px ở kích thước hiển thị, bỏ chú giải công thức và câu chú thích trong hình (các số $8/9$, $6$, $1;\,1{,}5;\,1{,}95;\,2{,}355$ đã có trên mặt trang hoặc ghi chú diễn giả). Nếu chỉ giữ được một bảng, giữ bảng trái (hai nhánh và đường chéo). |
| trung bình | L13-4-03 | NT17/NT28: công thức hiển thị (6.4) tràn khung ở 1600×900, nhãn bị cắt thành "(6.4" | Đo: `.formula` scrollWidth 1261 > clientWidth 1248; ảnh `wide-027-L13-4-03.png`. Ở màn rộng không có gợi ý cuộn (gợi ý chỉ bật khi ≤ 760 px). | Tách hai bất đẳng thức thành hai dòng (`aligned`) hoặc bỏ dòng "Ý nghĩa:" để có chỗ cho hai công thức hiển thị riêng. |
| trung bình | L13-5-03 | NT17/NT28: công thức (6.9) tràn khung ở 1600×900, nhãn bị cắt thành "(6.9" | Đo: scrollWidth 1254 > clientWidth 1248; ảnh `wide-035-L13-5-03.png`. | Bỏ vế giữa: $v_{k+1}=\max\{1+0{,}45\,v_k;\ 0{,}6+0{,}9\,v_k\}$ (vế $Q_{V_k}$ đã là tiêu đề cột của bảng). |
| trung bình | L13-6-03 | NT9, NT21: $Q_t$ xuất hiện như "bảng" mà không nói bảng gì; sinh viên dễ lẫn với $Q_U$ của L13-3-06 | Mặt trang: "Với bảng $Q_t$ và chuyển tiếp $(S_t,A_t,R_{t+1},S_{t+1})$, …". Ghi chú §7.4 (d.1455): "bảng *giá trị hành động* (action value) $Q_t(s,a)$, là ước lượng tại thời điểm $t$ của giá trị khi chọn $a$ tại $s$ rồi hành động tối ưu". Không trang nào trước đó nêu thuật ngữ này. | Viết: "Với bảng *giá trị hành động* (action value) $Q_t(s,a)$ và chuyển tiếp …"; câu nghĩa của $Q_t$ để ở ghi chú diễn giả, kèm câu "$Q_t$ được học từ dữ liệu, khác $Q_U$ tính từ mô hình". Giữ âm tiết ≤ 60 (trang đang 56): chuyển "chỉ đổi phần tử $(S_t,A_t)$" sang ghi chú diễn giả nếu cần. |
| nhẹ | L13-1-06, L13-2-01 | NT25: chữ trong hình dưới 16 px ở 390×844 | `robot-mdp-slide.svg` (viewBox rộng 900, chữ 28–38) hiển thị rộng 336 px: chữ ≈10,5–14 px; `two-step-paths.svg` (viewBox 680, chữ 26–30) rộng 336 px: ≈12,8–15 px. Ở 1600×900 cả hai đạt (≈18,5 px và ≈22,7 px). Dữ liệu của hai hình đều có trong danh sách trên mặt trang. | Tăng cỡ chữ trong hai SVG (ví dụ 40–44 cho `robot-mdp-slide.svg`, 34–36 cho `two-step-paths.svg`) hoặc cho hình chiếm hết chiều rộng ở màn hẹp. |
| nhẹ | L13-5-05, L13-7-06 | NT2, NT9: "(6.7) chứa $V^*$" trong khi (6.7) trên L13-4-07 viết bằng $\bar V$; sinh viên phải tự ghép với Định lý 13.19 | L13-5-05: "(6.7) chứa $V^*$ chưa biết."; L13-7-06: "(6.7) chứa $V^*$; …". Ghi chú d.1158: "Chặn (6.7) chứa $\bar V=V^*$ chưa biết". | Viết "(6.7) chứa $\bar V=V^*$ chưa biết" ở cả hai trang. |
| nhẹ | L13-3-01 | NT9: ký hiệu $c$ trong $p(s',c\mid s,a)$ chưa được gọi tên trên mặt trang | Mặt trang: "mô hình chuyển $p(s',c\mid s,a)\ge0$ với $\sum_{s'}\sum_{c}p(s',c\mid s,a)=1$". Ghi chú Định nghĩa 13.5: "với $s'\in\mathcal S$, $c\in\mathcal R$". | "mô hình chuyển $p(s',c\mid s,a)\ge0$, $c\in\mathcal R$, với …". |
| nhẹ | L13-3-08 | Bước nhảy trong ý tưởng chứng minh: số hạng $\gamma^K\lVert U\rVert_\infty$ ở bước 4 không có nguồn gốc trên mặt trang hay trong ghi chú diễn giả | Bước 4: "$V^\rho(s)\le U(s)+\gamma^K\bigl(\lVert U\rVert_\infty+R_{\max}/(1-\gamma)\bigr)$". Ghi chú diễn giả chỉ giải thích trường hợp dấu bằng. | Thêm vào ghi chú diễn giả: "$\lvert\mathbb E_\rho[\gamma^KU(S_K)]\rvert\le\gamma^K\lVert U\rVert_\infty$, phần đuôi chặn bằng $\gamma^KR_{\max}/(1-\gamma)$ theo (5.6)". |
| nhẹ | L13-3-10 | Bước 3 nén lập luận sau dấu hai chấm (Detect: cấu trúc khó theo) | "$W=(I-\gamma P^\pi)^{-1}r^\pi$ thỏa $W=T^\pi W$: (5.11) với dấu bằng, $\rho=\pi$, $U=W$." | "Từ $(I-\gamma P^\pi)W=r^\pi$ có $W=T^\pi W$, nên (5.11) xảy ra dấu bằng với $\rho=\pi$, $U=W$." |
| nhẹ | L13-5-02 | NT9: bước 1 viết $\rho_t$ cho chính sách $\pi^*$ mà không nói $\rho=\pi^*$ | "$\pi^*$ đạt cực đại (O1): $\sum_a\rho_t(a\mid\tau)Q_{\bar V}(s_\tau,a)=\bar V(s_\tau)$" | "Với $\rho=\pi^*$ (O1): $\sum_a\rho_t(a\mid\tau)Q_{\bar V}(s_\tau,a)=\bar V(s_\tau)$ …". |
| nhẹ | L13-4-04 | NT9: dòng "Nhắc lại:" đứng sau các bước đã dùng kỹ thuật; nhắc "cận dưới đúng" trên trang chỉ có cực đại làm sinh viên lúng túng | "Nhắc lại: so với phần tử bất kỳ rồi lấy cận dưới đúng; ở đây lấy cực đại theo $a$." đứng sau bước 3 (kỹ thuật được dùng ở bước 2). Deck 12 có "Kỹ thuật. … so với phần tử bất kỳ rồi lấy cận dưới đúng." | Đưa dòng lên trước bước 2 và nói cụ thể cách áp dụng: "Nhắc lại: so với phần tử bất kỳ rồi lấy cận dưới đúng; ở đây $f(a)\le\max_bg(b)+\delta$ với mọi $a$, rồi lấy cực đại theo $a$." |
| nhẹ | L13-4-06 | NT9, NT11: "tính đầy đủ của $\mathbb R$" dùng ở bước 4 nhưng không có trên mặt trang "Tiên quyết và quy ước" | L13-1-02 chỉ nêu điều này trong ghi chú diễn giả ("Mọi dãy Cauchy số thực hội tụ"). Ghi chú, mục Kiến thức tiên quyết, Giải tích: "mọi dãy Cauchy số thực đều hội tụ (tính đầy đủ của $\mathbb R$)". | Thêm "mọi dãy Cauchy số thực hội tụ" vào gạch đầu dòng thứ ba của L13-1-02. Trang đang 60/60, nên rút chữ ở chỗ khác, ví dụ bỏ "(Bài 10)" sang ghi chú diễn giả. |
| nhẹ | L13-3-09 | NT9: dòng cuối gợi ý phép lặp $V\leftarrow r^\pi+\gamma P^\pi V$ mà chưa có lý do hội tụ; lý do (Mệnh đề 13.16) ở mạch sau | "Khi $\lvert\mathcal S\rvert$ lớn, lặp $V\leftarrow r^\pi+\gamma P^\pi V$." Ghi chú diễn giả dẫn Mệnh đề 13.16. | Chuyển dòng này vào ghi chú diễn giả. |
| nhẹ | L13-6-04 | NT9: ký hiệu $Q^+(s,a)$ chỉ xuất hiện trong lời giải | Lời giải (b): "$Q^+(s,a)=1+0{,}2\,(2{,}5-1)=1{,}3$". | Trong đề (b): "… và phần tử mới $Q^+(s,a)$ theo (7.6), $\alpha=0{,}2$". |
| nhẹ | L13-6-05 | Con số "(1/1024)" trên mặt trang không có nghĩa đi kèm | "$10$ lần thử $A$ tại $h$, cả $10$ lần ở lại $h$ ($1/1024$)." Ghi chú d.1545: "Dưới môi trường thật, biến cố này có xác suất $(1/2)^{10}=1/1024>0$." | "… cả $10$ lần ở lại $h$ (xác suất $(1/2)^{10}=1/1024$)". Trang đang 59/60: rút "Xác định chính sách quy hoạch." thành "Tìm chính sách." hoặc tương tự. |
| nhẹ | L13-6-06 | Detect (cấu trúc khó theo): câu kết của dòng thứ hai khó đọc, chủ ngữ "hàm giá trị theo $X_t$" mơ hồ | "Cùng quan sát $X_1=0$, $G_1$ bằng $0$ hoặc $4/3$: hàm giá trị theo $X_t$ không nhận cả hai." | "Cùng quan sát $X_1=0$, $G_1$ bằng $0$ hoặc $4/3$, mà một hàm giá trị của $X_t$ chỉ gán một số cho $X_1=0$." |
| nhẹ | toàn deck; rõ nhất L13-3-04 | NT17 (mức nhắm ≤ 40): 44/50 trang nội dung trên 40 âm tiết, 30 trang từ 55 trở lên. L13-3-04 xếp sáu thành phần trên một trang (vấn đề, "Trực quan.", Định nghĩa 13.7, $V^*$, Mệnh đề 13.8, "Ý nghĩa:"), 60/60 | Bảng mật độ ở trên; ảnh `wide-016-L13-3-04.png`. | Không bắt buộc (dưới trần). Nếu biên tập viên còn chỗ trong 60 trang: tách L13-3-04 thành "Tổng thưởng chiết khấu" (vấn đề, trực quan, Định nghĩa 13.7, $V^*$) và "Chặn phần đuôi" (Mệnh đề 13.8, Ý nghĩa). |

Không phát hiện chặn bàn giao. Các trang còn lại hiểu được tại chỗ: ví dụ robot đủ chậm (L13-2-01, L13-3-11, L13-5-03, L13-5-04), các số tôi kiểm lại khớp (L13-4-05: $x_k$ và sai số; L13-5-03: bảng $Q$; L13-5-04: ngưỡng $8/9$; L13-5-06: $k=39$, $v_{39}\approx5{,}9088$; L13-5-07: $0{,}1$, $0{,}08$, $0{,}8$; L13-6-04: $2{,}1$, $2{,}5$, $1{,}3$; L13-6-06: $G_1=4/3$). Ý tưởng chứng minh ở L13-4-06 và L13-4-04 không có bước nhảy đáng kể.

## Đề xuất sửa ghi chú

- Hình 13.2 (`img/lec-13/value-iteration.svg`) dùng chung với ghi chú: chữ 6,3–13,2 px trong viewBox rộng 800 nên trong trình xem ghi chú (cột chữ khoảng 700 px) chữ cũng dưới 12 px, và chú giải vẽ công thức. Đề xuất tác giả cho vẽ lại hình với chữ lớn hơn và chú giải bằng lời, công thức để ở chú thích Markdown.

## Kết luận

**đạt khi sửa** — 0 chặn bàn giao, 1 nghiêm trọng (L13-5-04), 3 trung bình (L13-4-03, L13-5-03, L13-6-03), 13 nhẹ.
