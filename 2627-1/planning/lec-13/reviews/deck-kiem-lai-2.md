# Kiểm lại sau biên tập, Bài 13, lượt 2 (chỉ đọc)

- Deck: `2627-1/lecture-13-quyet-dinh-tuan-tu-bat-dinh.html` (60 trang, sửa lúc 16:47). Hình mới: `img/lec-13/robot-mdp-slide-narrow.svg`; `two-step-paths.svg` sửa lại.
- Không có bản sao của bản lượt 1. Tôi đối chiếu với nội dung lượt 1 đã đọc ở lượt kiểm trước (mặt trang từng trang) và với `\tag` của `materials/lec-13/lecture-note.md`.
- Phạm vi: các trang đổi sau lượt 1 (L13-1-02, L13-1-03, L13-1-06, L13-2-02, L13-2-03, L13-3-02, L13-3-03, L13-3-05, L13-3-07…L13-3-11, L13-4-01…L13-4-06, L13-4-08, L13-5-01…L13-5-06, L13-6-01, L13-6-04, L13-6-07, L13-7-03), cùng hai trang lân cận mỗi bên.
- Văn bản mới hoặc đã sửa được duyệt theo `no-ai-slop`, chế độ Detect.

## 1. Kiểm tra máy (máy chủ tĩnh tạm `http.server` cổng 8781, đã tắt)

| Công cụ | Kết quả |
|---|---|
| `deck_lint.py` | 2 phát hiện, cả hai có ngoại lệ ở storyboard: L13-1-03 `111 > 80` (storyboard d.1086, sau N5) và L13-7-04 `68 > 60`. |
| `footer_check.py` | 0 trang chạm chân trang. |
| `deck_check.py --shots` | slides=60, console=0, pageerrors=0, failed=0, katexErr=0, 0 OVERFLOW, narrowWide=0 trên mọi trang. Cờ SYLL, LINES, LINE20 giống lượt 1. |
| `scrollWidth` của `.formula` và `.table-scroll` | 1600×900: 0 hộp tràn. 390×844: 0 hộp tràn (lượt 1 có 31). Ở màn hẹp không còn công thức cuộn ngang. |

Ảnh ở `scratchpad/lec-13/recheck2/shots/` (159 tệp). Tôi đã xem các ảnh ghép `w1.png`, `w2.png` (18 trang, cỡ 1600×900) và `n1.png`, `n2.png` (9 trang ở 390×844, gồm cả ảnh `-end`). Không thấy chồng chữ hay tràn khung.

## 2. Các điểm phải kiểm

**(a) Công thức tách dòng.** Mọi khối `aligned` vẫn đúng toán và đủ vế khi so với lượt 1 và với ghi chú. Danh sách đã đọc:
- J_k / J_N (L13-1-02);
- (4.1), (4.2), (4.3), (4.4);
- (5.1), (5.2), (5.3), (5.6), (5.7), (5.11), (5.12);
- tổng lồng (L13-3-09); chặn của $P^\pi U$ (L13-3-11);
- (6.1), (6.3), (6.4); chặn của $Q_U-Q_W$ (L13-4-04);
- (6.5), (6.6), (6.7), (6.8), (6.9); phép kẹp (L13-5-02);
- (6.10), (6.11), (7.3), (7.5), (7.6); hai xác suất có điều kiện của Tình huống 13.2.

(6.6) vẫn bỏ vế trung gian $\sum\lVert x_{j+1}-x_j\rVert_\infty$ của ghi chú, như lượt 1. Vế đó là bước 2 trên cùng trang, nên chấp nhận.

**(b) Giả thiết, lượng từ, hằng số.** Không mất gì. Riêng các trang được nêu:
- L13-3-09: bước 4 vẫn ghi "cho $K\to\infty$ (giả thiết O2)"; câu về $\gamma=1$ được gộp vào cuối bước.
- L13-3-11: bước 2 vẫn có "(giả thiết O2)" và chỗ hỏng khi $\gamma=1$.
- L13-3-02: (M1) giữ "với mọi $t,\tau,a$ có $\mathbb P(H_t=\tau,A_t=a)>0$".
- L13-5-05: dòng "Nhắc lại:" đúng câu chữ của D8. Bất đẳng thức then chốt chuyển xuống ghi chú diễn giả và ở đó đủ chuỗi.

Về số liệu robot ở L13-3-02 (D10, "khi còn chỗ"): trang đã chạm 6 dòng (46 âm tiết), nên thêm một dòng riêng sẽ vượt trần. Hai trang định nghĩa còn lại (L13-3-01, L13-3-03) vẫn có robot. Việc chuyển xuống ghi chú diễn giả vì thế chấp nhận được theo NT4. Tuy vậy, hai số này đặt được ngay trong dòng nêu (5.2) mà không thêm dòng (xem P1).

**(c) Số hiệu công thức.** Mọi số hiệu khớp `\tag` của ghi chú. Các số chuyển vào dòng chữ:
- (6.5) "có (6.5):" và (6.6) "cho (6.6), với $\ell>k$:" đứng ngay trước đúng một khối công thức. Đạt.
- (5.2) và (6.10), (6.11) là chỗ yếu (P1, P3).

**(d) Thứ tự đọc ở màn hẹp.** Hợp lý trên mọi trang đã xem, trừ L13-3-02 (P1) và L13-5-03 (P2). Ở bản rộng, L13-5-02 đặt phép kẹp ở đầu cột phải, ngang hàng bước 1; dòng dẫn "Kẹp, …:" nằm cuối cột trái. Ở màn hẹp thứ tự đúng, nên chấp nhận.

**(e) N1–N9 của lượt 1.**

| Phát hiện | Trạng thái | Bằng chứng |
|---|---|---|
| N1 L13-4-04 $\delta$ | đã sửa | "với $\delta=\max_a\lvert f(a)-g(a)\rvert$, …". |
| N2 L13-7-03 | đã sửa | "Liệt kê không khả thi: … chưa kể chính sách theo lịch sử."; "luôn chọn $A$ được $20/11$". |
| N3 L13-6-04 điều kiện Q-learning | đã sửa | Ghi chú diễn giả: "Nhận xét 13.29, mục 3: … mọi cặp được thăm vô hạn lần và bước học giảm dần thích hợp". |
| N4 L13-5-06 câu ghép | đã sửa | Tách thành hai câu. |
| N5 L13-1-03 | đã sửa | "phương trình Bellman tối ưu"; 111 âm tiết, ngoại lệ ghi ở storyboard d.1086. |
| N6 chữ SVG ở 390 px | đã sửa | `robot-mdp-slide-narrow.svg`: viewBox 900, chữ 44 và 56, hiển thị rộng 336 px, tức ≈ 16,4 px; nhãn trùng bản rộng. `two-step-paths.svg`: chữ 34 và 36, tức ≈ 16,8 px. |
| N7 câu lặp trong ghi chú diễn giả | sửa chưa đủ | Câu Banach ở L13-4-07 và câu thu thập ở L13-6-06 đã bỏ. Chứng minh Bổ đề 13.15 vẫn có ở ghi chú L13-4-03 ("Chứng minh Bổ đề 13.15: với mọi $a$, $f(a)\le g(a)+\delta\le\max_bg(b)+\delta$, …, rồi đổi vai $f$, $g$."), đồng thời có ở mặt trang và ghi chú L13-4-04. |
| N8 L13-3-05 "để mô phỏng" | đã sửa | "Trong học máy: khi cắt một quỹ đạo sau $K$ bước, …". |
| N9 storyboard d.32 | đã sửa | Có từ khóa thứ năm và 21,5 phút. |

## 3. Phát hiện còn mở

| mức độ | trang chiếu | vấn đề | bằng chứng | đề xuất sửa |
|---|---|---|---|---|
| trung bình | L13-3-02 | P1. NT20 ("A formula stands where it is named"), NT9. Câu gọi tên hai đại lượng và dẫn (5.2) bị tách khỏi công thức của chúng bởi khối (M1) và (5.1). Hai công thức không còn số hiệu. Ở 390 px, thứ tự đọc là: câu "(5.2)" → (M1) → (5.1) → $P(s'\mid s,a)$ → $r(s,a)$. Người đọc dễ hiểu hai công thức cuối là phần tiếp của (M1). | "*Xác suất chuyển* và *phần thưởng kỳ vọng một bước* suy từ mô hình $p$ theo (5.2)." nằm ở cột trái; hai công thức nằm trong `grid2` thứ hai, sau (5.1); ảnh `narrow-014-L13-3-02*.png`. Ghi chú §5.1: câu "Từ mô hình chuyển, *xác suất chuyển* và *phần thưởng kỳ vọng một bước* là" đứng liền trước khối `\tag{5.2}`. | Đưa câu (5.2) xuống ngay trên `grid2` thứ hai, hoặc đặt (M1) lên trước. Ghi lại "(5.2)" ở cuối khối $r(s,a)$, như các công thức khác của deck. Nếu muốn giữ số liệu robot của D10 mà không thêm dòng, nối vào cùng câu: "…theo (5.2); robot: $P(h\mid h,A)=1/2$, $r(h,A)=1$." |
| nhẹ | L13-5-03 | P2. NT23 (dữ kiện → tính → kết quả với "Diễn giải:"). "Diễn giải:" nay đứng trước bảng tính. Câu này nói về "vòng đầu" và "từ $k=1$", nên người đọc đọc kết luận trước phép tính ở cả hai cỡ màn hình. | Cột phải: (6.9) rồi "**Diễn giải:** vòng đầu chọn $A$ …", sau đó mới đến bảng; ảnh `wide-037`, `narrow-037-L13-5-03*.png`. Ở lượt 1, dòng này đứng sau bảng và vẫn vừa khung. | Đặt "Diễn giải:" sau bảng, dưới dạng một dòng toàn chiều rộng. Nếu chạm chân trang, rút "Tính $v_1,\ldots,v_4$." thành "Tính $v_1..v_4$." hoặc đưa $V_k(z)=0$ xuống ghi chú diễn giả (ghi chú diễn giả đã có lý do của nó). |
| nhẹ | L13-5-05 | P3. Số hiệu nằm trong dòng chữ "(6.10) và (6.11):", sau đó là hai khối không số. Người đọc phải tự hiểu rằng khối hai dòng là (6.10) và khối bên phải là (6.11). Họ có thể hiểu nhầm là mỗi dòng một số. L13-5-07 dẫn cả hai số. | "**Bảo đảm:** chặn tất định theo mô hình $P,r$ đang dùng, (6.10) và (6.11):" | Gắn "(6.10)" và "(6.11)" vào dòng cuối của từng khối `aligned`, như (5.6) và (6.4) trong cùng deck. |
| nhẹ | L13-4-03 (ghi chú diễn giả) | P4 = N7, sửa chưa đủ (NT22, D11). | Xem bảng ở mục 2(e). | Bỏ câu "Chứng minh Bổ đề 13.15: …" khỏi ghi chú diễn giả của L13-4-03. |

Tổng: 0 chặn bàn giao, 0 nghiêm trọng, 1 trung bình, 3 nhẹ.

## 4. Kết luận

**đạt khi sửa.** Toán trong mọi công thức tách dòng đúng và đủ vế. Không mất giả thiết hay lượng từ nào. Màn hẹp không còn công thức cuộn ngang. Các kiểm tra máy đều sạch. N1–N6, N8 và N9 đã sửa đúng. Còn phải sửa P1 (L13-3-02: thứ tự đọc và vị trí của (5.2)); P2–P4 là nhẹ. Sau khi sửa, cần kiểm lại riêng L13-3-02 và L13-5-03 ở cả hai cỡ màn hình.
