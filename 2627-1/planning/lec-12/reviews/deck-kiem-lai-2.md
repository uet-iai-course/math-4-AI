# Kiểm lại sau biên tập, Bài 12, lượt 2 (2026-11-16)

Vai: người kiểm lại (chỉ đọc). Lượt này so deck hiện tại với bản đã kiểm ở lượt 1. Bản lượt 1 là chữ trích theo trang, lưu ở `scratchpad/lec-12/recheck/new.txt` khi kiểm lượt 1. Phép so dùng cùng công cụ trích và `diff` theo `data-slide-id`.

Có 18 trang đổi so với lượt 1:
- đổi mặt trang: L12-1-03, L12-1-04, L12-2-02, L12-2-03, L12-3-02, L12-3-11, L12-4-01, L12-4-02, L12-5-01, L12-6-00, L12-6-01, L12-7-04, L12-7-06;
- chỉ đổi ghi chú diễn giả: L12-1-01, L12-3-08, L12-4-01, L12-4-02, L12-5-03, L12-6-01.

Đọc thêm 2 trang lân cận mỗi bên và mục "Lượt sửa sau kiểm lại 1" của storyboard. Văn bản đã sửa đọc theo `no-ai-slop` chế độ Detect.

## 1. Kiểm tra máy

Máy chủ tĩnh tạm `http.server 8776` tại gốc REPO, đã tắt sau khi chạy.

| Công cụ | Kết quả |
|---|---|
| `deck_lint.py` | 2 phát hiện. L12-1-03: 119 > 80 (ngoại lệ ≤ 120 đã duyệt). L12-7-06: 62 > 60 (ngoại lệ ghi trong storyboard, mục "Lượt sửa sau kiểm lại 1") |
| `footer_check.py` (1600×900) | 0 trang |
| `deck_check.py --shots` | 60 trang, console 0, pageerrors 0, failed 0, `.katex-error` 0. OVERFLOW/NARROW-H chỉ ở L12-5-03 và L12-5-05 (đuôi SVG của `\sqrt`, báo động giả đã biết) |
| Đo riêng 390×844, mọi trang | 0 vùng `.formula`/`.katex-display`/`.table-scroll` cuộn ngang; 0 công thức nội dòng vượt mép |

Đã xem ảnh 1600×900 và 390×844 (cả ảnh `-end`) của các trang đổi. Ảnh đặt trong `scratchpad/lec-12/recheck/r2/`.

## 2. Trạng thái K1–K16

| Phát hiện | Trạng thái | Bằng chứng |
|---|---|---|
| K1 tên mạch 6 | đã sửa | Ba nơi cùng tên "Học gần đúng với xác suất cao và số chiều VC": L12-1-04, L12-6-00 `h2`, L12-7-06 ô "Mục". PAC xuất hiện lần đầu trên mặt trang ở L12-6-01, kèm tên đầy đủ "(probably approximately correct, PAC)". VC có tên đầy đủ trên bìa |
| K2 L12-3-02 | đã sửa | "Mỗi $\theta\in\Theta$ và mỗi đầu vào $x$ cho phân phối $p_\theta(\cdot\mid x)$; $\theta$ dùng chung cho mọi $x$." Khớp ghi chú dòng 173 |
| K3 L12-4-02 | đã sửa | "Với $\mathcal H$ chọn trước (G3), …"; câu giải thích về cận dưới đúng chuyển sang ghi chú diễn giả, nhưng làm hỏng lại S22 (R1) |
| K4 L12-4-01 | đã sửa | "(expected risk, population risk)"; làm hỏng lại S21 (R2) |
| K5 L12-5-03, ghi chú diễn giả | sửa chưa đủ | xem R3 |
| K6 L12-2-02 | đã sửa | "(independent and identically distributed, i.i.d.)". Dòng 25 âm tiết, có trong ngoại lệ |
| K7 L12-3-11 | đã sửa | `$\sum_ir_i^2=0.$` |
| K8 $m_i$ | đã sửa | ghi chú diễn giả L12-3-08: "$m_i$ là $\mu_i$ của Bài tập 12.9" |
| K9 L12-1-01, ghi chú diễn giả | đã sửa | "Các cận còn cần mất mát bị chặn (G2), như mất mát $0$–$1$." |
| K10 L12-7-04 | đã sửa | "với bốn sản phẩm $h_S=g$, $\hat R_S(g)=0$ nhưng $R(g)=\tfrac12$" |
| K11 L12-6-01 | đã sửa | "Câu hỏi: $\mathcal H_\uparrow$ vô hạn: thay $M$ bằng gì, và bảo đảm có giữ khi phân phối đổi?" |
| K12 L12-2-03 | đã sửa | "nên bốn sản phẩm cho phép so tác động của độ linh hoạt" |
| K13 L12-3-09 | đã xử lý | Giữ hai dòng; storyboard ghi số đo: một dòng thì cuộn 14 px ở 390 px |
| K14 storyboard §7 | đã sửa | cụm E: "L12-6-04 (Định lý 12.19)" |
| K15 L12-1-03 | đã sửa | mục 1 có "hợp lý cực đại"; mục 3, 4 theo câu chữ điều phối viên chốt; xem R4 |
| K16 L12-5-01 | đã sửa | "chặn rủi ro của nghiệm ERM" |

**NT2.** So từng dòng các trang đổi, không mất giả thiết, lượng từ hay hằng số nào. L12-6-01 vẫn giữ "mọi $\varepsilon,\delta\in(0,1)$ có $N(\varepsilon,\delta)$: mọi $P$ khả thực, mọi $n\ge N$" và "cùng lượng từ" cho (8.2). L12-2-02 đã bỏ "chỉ dùng $S$" khỏi dòng quy tắc học (ghi chú §1, mục 7: "quy tắc chỉ dùng $S$, không dùng $P$"). Ý này còn trên mặt trang L12-2-00 ("Quy tắc học chọn hàm dự đoán từ mẫu") và trong ghi chú diễn giả L12-2-02. Đây là phương án tôi đề xuất ở K6, nên không tính là phát hiện; điều phối viên có thể yêu cầu trả lại nếu muốn giữ đúng chữ của ghi chú.

## 3. Phát hiện còn mở

| mức độ | trang chiếu | vấn đề | bằng chứng | đề xuất sửa |
|---|---|---|---|---|
| nhẹ | L12-4-02 | R1. Lỗi cũ quay lại (S22, NT20): "có nghĩa" có hai cách đọc, "có ý nghĩa" hoặc "nghĩa là". Khi sửa K3, biên tập viên bỏ vế "chỉ dùng cận dưới đúng" mà S22 đã sửa. | "(6.5) có nghĩa cả khi cực tiểu không đạt (dữ liệu tách được)." | "(6.5) áp dụng được cả khi cực tiểu không đạt (dữ liệu tách được)." (trang 53 âm tiết) |
| nhẹ | L12-4-01 | R2. Lỗi cũ quay lại (S21, NT20): vế sau của "Trực quan." lặp chính nó ("trung bình mẫu … trên mẫu"). | "Trực quan. Kỳ vọng tính trên mọi quan sát theo $P$; trung bình mẫu chỉ trên mẫu." | "…; trung bình mẫu chỉ trên $n$ quan sát đã thấy." Trang 57 → 60 âm tiết, vẫn trong trần |
| nhẹ | L12-5-03 (ghi chú diễn giả) | R3. K5/S32 sửa chưa đủ (NT22). Câu S32 đề nghị bỏ đã quay lại, và lặp ý "không phụ thuộc $P$" của câu trước. Câu S32 đề nghị thêm (đọc thứ tự lượng từ) đã bị bỏ. | Đoạn 1: "… và $N_{\mathcal H}$ không phụ thuộc $P$." Đoạn 2: "Cận phụ thuộc $n$, $\log M$ và $\log(1/\delta)$, không phụ thuộc $P$." | Đoạn 2 mở bằng: "Cỡ mẫu $N_{\mathcal H}$ chọn trước khi biết $P$, nên cùng một $n$ dùng được cho mọi phân phối." Giữ câu về Hoeffding và câu về $M=1$ |
| nhẹ | L12-1-03 | R4. F9 (đúng nghĩa ghi chú), NT20. Mục 1 không còn nêu tên hai mất mát. Mục 5 thiếu "của". Dòng mục 3 dài 27 âm tiết nhưng chưa có trong danh sách dòng vượt 20 âm tiết. | Mục 1: "Suy ra hai mất mát từ hợp lý có điều kiện"; ghi chú dòng 36: "mất mát bình phương … và entropy chéo nhị phân". Mục 5: "chứng minh số chiều VC hai lớp ngưỡng". | Mục 1: "Suy ra bình phương sai số, entropy chéo từ hợp lý có điều kiện; …" (trang vẫn ≤ 120). Mục 5: "… số chiều VC của hai lớp ngưỡng." Ghi dòng 27 âm tiết vào ngoại lệ của storyboard |

Mạch truyện quanh các trang đổi (±2) không đứt:
- L12-1-04 khớp trang tiêu đề mạch L12-6-00.
- Câu hỏi L12-6-01 nối với L12-5-10 qua $M$ và báo trước L12-6-09 bằng vế "phân phối đổi".
- L12-7-06 khớp tên mạch.
- L12-3-02 → L12-3-03 giữ $m_\theta(x_i)$.

Văn bản mới trên L12-2-03, L12-5-01, L12-6-01, L12-7-04 đạt Detect.

## 4. Kết luận

Còn mở: 0 chặn bàn giao, 0 nghiêm trọng, 0 trung bình, 4 nhẹ (R1–R4). Kiểm tra máy đạt. **Kết luận: đạt.** Bốn mục nhẹ sửa được trong một lượt biên tập ngắn, không cần kiểm lại toàn bộ.
