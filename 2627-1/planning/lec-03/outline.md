# Dàn ý Bài 03 — Đối ngẫu Lagrange

## Ghi chú bài giảng viết lại theo mẫu SLT (2026-11-12)

Ghi chú `materials/lec-03/lecture-note.md` được viết lại theo `planning/notes-10-14-slt-template.md` (Q1–Q15) và quyết định U1–U4 của goal; kế hoạch và quyết định Q03-1 đến Q03-10 của điều phối viên lưu trong nhật ký phiên. Bảng số cũ → mới: `map-lec-03.md`. Phần "Phạm vi và tiêu chí hoàn thành" trở xuống là dàn ý deck, giữ nguyên.

**Câu hỏi trung tâm.** Với một bài toán tối ưu có ràng buộc, làm thế nào sinh cận dưới cho giá trị tối ưu từ chính các hàm của bài toán, khi nào cận tốt nhất bằng giá trị tối ưu, và hệ điều kiện nào cho nghiệm cùng nhân tử mà không cần tính cận đó.

**Câu hỏi mở đầu.** Bài toán $\min x^2+1$ với $(x-2)(x-4)\le0$; với $\lambda\ge0$ nào giá trị nhỏ nhất của $x^2+1+\lambda(x-2)(x-4)$ bằng $p^*=5$. Câu trả lời hấp dẫn: mọi $\lambda$ để điểm cực tiểu khả thi (tức $\lambda\ge2$). Câu trả lời ở câu đọc sau Mệnh đề 03.27 và §10.5: chỉ $\lambda=2$ (bù trừ); $\lambda=8$ cho $g(8)=1$.

| Mục | Nội dung | Khối |
|---|---|---|
| Đoạn dẫn, Câu hỏi mở đầu, Mục tiêu (6), Tiên quyết (+ 3 câu hỏi ôn nhanh) | kết quả kế thừa Bài 00–02 | — |
| 1. Thiết lập bài toán | bài toán gốc (1.1), sáu thành phần của bài toán chứng nhận | — |
| 2. Ký hiệu và giả thiết | bảng ký hiệu; giả thiết (Đ1)–(Đ5) và giả thiết về dữ liệu | — |
| 3. Ví dụ xuyên suốt | bài toán một biến trên đoạn $[2,4]$, nhãn (3.1) | Ví dụ 03.1 |
| 4. Chứng nhận tối ưu và cận dưới (4.1–4.3) | cận dưới, cận khít/cận lỏng, khoảng chứng nhận | 03.1–03.3; Ví dụ 03.2; Bài tập 03.1 |
| 5. Hàm và bài toán đối ngẫu Lagrange (5.1–5.4) | hàm Lagrange (5.1), hàm đối ngẫu (5.2), đối ngẫu yếu (5.3), bài toán đối ngẫu (5.4), đối ngẫu quy hoạch tuyến tính | 03.4–03.11; Ví dụ 03.3–03.6; Bài tập 03.2–03.3 |
| 6. Đối ngẫu mạnh và điều kiện Slater (6.1–6.4) | khoảng dương, độ dư, điều kiện Slater (6.1), bổ đề tách, định lý Slater (6.2), giới hạn | 03.12–03.17; Ví dụ 03.7–03.11; Bài tập 03.4–03.5 |
| 7. Hình học của đối ngẫu (7.1–7.3) | tập giá trị, tập trên, đường cận, siêu phẳng đỡ; bài toán nhiễu (7.1), độ nhạy (7.2), (7.3) | 03.18–03.25; Ví dụ 03.12–03.15; Bài tập 03.6 |
| 8. Điều kiện KKT (8.1–8.4) | bù trừ, hệ KKT (8.1), tính cần và tính đủ; ràng buộc chặn và số hạng phạt; máy vector hỗ trợ (8.2), (8.3) | 03.26–03.38; Ví dụ 03.16–03.19; Bài tập 03.7–03.9 |
| 9. Tổng hợp: quy trình chứng nhận bằng đối ngẫu | Thuật toán 03.39, bảng giả thiết – kết luận | 03.39; Ví dụ 03.20; Bài tập 03.10 |
| 10. Ý nghĩa, tác động và giới hạn | ba tình huống (tình huống thứ ba vi phạm tính lồi), ứng dụng, tóm tắt và câu trả lời câu hỏi mở đầu | Tình huống 03.1–03.3 |
| 11. Bài tập | danh sách 03.1–03.10; 03.11–03.17 theo ba mức; liên kết `exercises.md` thêm ở giai đoạn 2 | Bài tập 03.11–03.17 |
| 12. Câu hỏi cuối buổi và cầu nối | $\min x_1^2+x_2^2$, $x_1+x_2\ge2$ (bài toán cuối buổi Bài 02): đối ngẫu, Slater, KKT, độ nhạy; cầu nối Bài 04, Bài 07 | — |
| 13. Tài liệu đọc | Boyd và Vandenberghe (2004) ch. 5, §2.5.1, §8.6.1; Murphy (2022) §3.4.4, §8.5, §17.3; MIT 6.079 Lecture 5; Rudin (1976) | — |
| Phụ lục A | chứng minh Bổ đề 03.14 | — |

**Thay đổi so với ghi chú cũ.** Hai thuật toán vào bộ đếm chung (Thuật toán 03.1 → 03.36, 03.2 → 03.39), nên Mệnh đề 03.36 → 03.37, Nhận xét 03.37 → 03.38; mọi số 03.1–03.35 giữ nguyên. Nhãn công thức đánh lại theo mục mới. Thuật ngữ theo deck: "đường cận" (đường đỡ khi tiếp xúc), "cận khít", "cận lỏng". Ký hiệu: $J$ thay $E$; $w_0$ (hệ số chặn), $\eta_i$, $\Psi$ cho máy vector hỗ trợ; $w(0)$ cho nghiệm bình phương nhỏ nhất; $\rho_{\mathrm{lo}},\rho_{\mathrm{hi}},\rho_{\mathrm{mid}}$; $\vartheta$ cho trọng số tổ hợp lồi; $\ge$ thay $\succeq$ cho vector; $\sigma_j$ trong Ví dụ 03.7 và Nhận xét 03.7; $(\tilde\lambda,\tilde\nu,\kappa)$, $\gamma$ trong chứng minh Định lý 03.15; $\mathcal S_1,\mathcal S_2,\zeta,\zeta',\bar e,\mathcal U,\mathcal H_e$ trong Bổ đề 03.14; $\pi,\theta_i,\nu_1,\nu_2,\omega$ trong Bài tập 03.15. Định nghĩa 03.29, Định lý 03.30 phát biểu cho $D$ mở; Định lý 03.32 cho $D$ mở, lồi (Boyd §5.5.3). Bỏ: SMO/Platt, phương pháp điểm trong, nhánh – cận, hạt nhân, trường hợp $X$ thiếu hạng, câu Nocedal–Wright, nón pháp tuyến $N_D$. Độ nhạy (§7.3) giữ trong ghi chú; trên deck chỉ nêu trong ghi chú diễn giả S04-04b (quyết định người dùng 2026-11-13). Hai SVG chỉ dùng trong ghi chú được sửa tại chỗ: `kkt-active-projection.svg` (ô khả thi gốc $Ax^*=b$, ô dừng $\nabla_xL=0$), `dual-geometry.svg` (nhãn "Tập trên A", tiêu đề "đường cận").

---

**Trạng thái:** bản nội dung 59 trang, 6 mạch, sau đợt sửa deck theo bảng phát hiện 2026-11-13 và lượt sửa sau kiểm lại (57 → 59 trang: thêm S02-07c, S03-01b, S05-06c; bỏ S03-02). Deck theo ký hiệu, mục tiêu và ví dụ của ghi chú viết lại ngày 2026-11-12; sáu dòng mục tiêu trên S01-02 gộp từ sáu mục tiêu của ghi chú, trừ phần đọc độ nhạy (quyết định người dùng).

## Phạm vi và tiêu chí hoàn thành

Buổi 3 theo đề cương DOCX chính thức: Chương 4, Đối ngẫu; 2 tiết lý thuyết và 1 tiết bài tập. Chuẩn đầu ra bài học (LLO) 4: “Hiểu được hàm đối ngẫu và bài toán đối ngẫu Lagrange”; LLO5: “Thể hiện được minh họa hình học của hàm đối ngẫu”; cùng liên quan chuẩn đầu ra học phần (CLO) 1. Đánh giá qua bài tập cá nhân và nhóm. Tiên quyết: gradient, hàm lồi và hoàn thành bình phương.

Tiêu chí: sinh viên có thể tự tạo cận, kiểm tra Slater, giải và kiểm tra bốn nhóm KKT, giải thích hình học, vận dụng cho nhiều biến và phân biệt tính cần với tính đủ của KKT. RevealJS, ghi chú diễn giả, ghi chú bài giảng và tệp bài tập phải nhất quán; năm bài tập trên lớp của deck lấy từ khối bài tập của ghi chú (Bài tập 03.2, 03.4, 03.6, 03.9, 03.10).

Bài 02 là mẫu bố cục và phong cách do người dùng chỉ định, được đọc tại máy. Giữ cấu trúc ngoài–trong, bảng màu, kiểu chữ, hộp, lưới hai cột, chân trang và runtime cục bộ. Giữ sáu mạch; độ nhạy và giá bóng chỉ nêu trong ghi chú diễn giả cuối mạch 4 (quyết định người dùng 2026-11-13); thêm S02-05b (phép tính g) và S05-05b (chứng minh tính đủ KKT) để tách lập luận, không thu nhỏ chữ. Ví dụ chính: $\min x^2+1$ với $(x-2)(x-4)\le0$, kết quả $x^*=2$, $p^*=5$, $\lambda^*=2$.

## Danh sách mạch và trang

Mỗi trang có một mục trong `storyboard.md`; bảng dưới chỉ ghi vai trò.

### 1. Mở đầu

| Mã | Tiêu đề | Vai trò |
|---|---|---|
| S01-01 | Bài 03: Đối ngẫu Lagrange | Đặt vấn đề chứng nhận nghiệm bằng cận dưới. |
| S01-02 | Mục tiêu học tập | Sáu mục tiêu theo ghi chú. |
| S01-03 | Nội dung | Sáu mạch đánh số. |

### 2. Hàm và bài toán đối ngẫu Lagrange

| Mã | Tiêu đề | Vai trò |
|---|---|---|
| S02-00 | 2. Hàm và bài toán đối ngẫu Lagrange | Trang tiêu đề mạch: nhu cầu cận dưới của $p^*$. |
| S02-01 | Cận dưới cho giá trị tối ưu | "Nhắc lại:" tập khả thi, $p^*$; "Nhu cầu:" cận dưới. |
| S02-02 | Ví dụ: bài toán một biến trên đoạn [2,4] | Ví dụ xuyên suốt, $x^*=2$, $p^*=5$. |
| S02-03 | Họ hàm tạo cận dưới | Trực quan: cộng $\lambda f_1$, cận 4,5 và 5. |
| S02-04 | Hàm Lagrange | Định nghĩa; $A\in\mathbb R^{p\times n}$, $\nu\in\mathbb R^p$. |
| S02-05 | Hàm đối ngẫu | Định nghĩa $g$. |
| S02-05c | Tính lõm của hàm đối ngẫu | Mệnh đề, ý nghĩa, ý chứng minh. |
| S02-05d | Chứng minh: tính lõm của hàm đối ngẫu | Hai bước, trọng số $\vartheta$. |
| S02-05a | Ví dụ: bài toán một biến, lập hàm Lagrange | Gom hệ số theo $x$. |
| S02-05b | Ví dụ: bài toán một biến, tính hàm đối ngẫu | $g(\lambda)=10-\lambda-\frac9{1+\lambda}$. |
| S02-06 | Đối ngẫu yếu | $g\le L\le f_0$, không cần tính lồi. |
| S02-07 | Bài toán đối ngẫu | Định nghĩa $d^*$, nghiệm đối ngẫu. |
| S02-07c | Ví dụ: bài toán một biến, giải bài toán đối ngẫu | $\lambda^*=2$, $d^*=p^*=5$ (Ví dụ 03.4). |
| S02-07a | Ví dụ: bài toán hai biến, tính hàm đối ngẫu | Hai nhân tử (Ví dụ 03.6). |
| S02-07b | Ví dụ: bài toán hai biến, giải bài toán đối ngẫu | Chứng nhận $x^*=(1,2)$. |
| S02-08 | Bài tập: đối ngẫu của hàm tuyến tính trên hình tròn | Bài tập 03.2. |
| S02-08b | Bài tập: đối ngẫu của hàm tuyến tính trên hình tròn | Lời giải trên mặt trang. |

### 3. Đối ngẫu mạnh và điều kiện Slater

| Mã | Tiêu đề | Vai trò |
|---|---|---|
| S03-00 | 3. Đối ngẫu mạnh và điều kiện Slater | Trang tiêu đề mạch: nhu cầu điều kiện bảo đảm $d^*=p^*$. |
| S03-01 | Khoảng đối ngẫu và đối ngẫu mạnh | "Nhu cầu:" và ba định nghĩa. |
| S03-01b | Ví dụ: khoảng đối ngẫu dương | Bài toán chọn gói, $d^*=3<4=p^*$ (Ví dụ 03.7). |
| S03-03 | Điều kiện Slater | Định nghĩa, định lý (a) và dạng yếu (b). |
| S03-02b | Trực quan của điều kiện Slater | Độ dư quanh $\bar x=3$. |
| S03-03a | Chứng minh: định lý Slater | Bốn bước, $(\tilde\lambda,\tilde\nu,\kappa)$, $\mathcal A$, $\mathcal B$. |
| S03-03b | Chứng minh: định lý Slater, hệ số bất đẳng thức | Dấu chặt buộc $\tilde\lambda=0$. |
| S03-03c | Chứng minh: định lý Slater, hệ số đẳng thức | Các hàng độc lập buộc $\tilde\nu=0$. |
| S03-04 | Ví dụ: điều kiện Slater cho bài toán một biến | Kiểm tra ba giả thiết. |
| S03-05 | Ví dụ: bài toán không có điểm Slater | $\min x_1+x_2$, $x_1^2+x_2^2\le0$ (Ví dụ 03.10). |
| S03-06 | Bài tập: điều kiện Slater cho ba bài toán | Bài tập 03.4. |
| S03-06b | Bài tập: điều kiện Slater cho ba bài toán | Lời giải trên mặt trang. |

### 4. Hình học của đối ngẫu

| Mã | Tiêu đề | Vai trò |
|---|---|---|
| S04-00 | 4. Hình học của đối ngẫu | Trang tiêu đề mạch: nhân tử là độ dốc, cận dưới là tung độ gốc. |
| S04-01 | Mặt phẳng giá trị | "Nhu cầu:" và hai trục. |
| S04-01a | Điểm và tập giá trị | Bốn điểm của $G$. |
| S04-01b | Hàm Lagrange trong mặt phẳng giá trị | Định nghĩa đường cận. |
| S04-02 | Đường cận trong mặt phẳng giá trị | $\lambda=1$, điểm tiếp xúc không khả thi. |
| S04-03 | Tiếp xúc và đối ngẫu mạnh | $\lambda=2$, tiếp xúc tại $(0,5)$. |
| S04-04 | Bài tập: tập giá trị và đường cận | Bài tập 03.6, câu (a), (b). |
| S04-04b | Bài tập: tập giá trị và đường cận | Lời giải trên mặt trang; ghi chú diễn giả nêu độ nhạy, giá bóng. |

### 5. Điều kiện Karush–Kuhn–Tucker

| Mã | Tiêu đề | Vai trò |
|---|---|---|
| S05-00 | 5. Điều kiện Karush–Kuhn–Tucker | Trang tiêu đề mạch: tìm nghiệm không cần $g$. |
| S05-01 | Dấu bằng trong chuỗi đối ngẫu yếu | "Nhu cầu:" và Mệnh đề 03.27. |
| S05-02 | Ràng buộc hoạt động và bù trừ | Định nghĩa bù trừ; Nhận xét 03.28. |
| S05-03 | Bốn nhóm điều kiện KKT | Định nghĩa hệ KKT. |
| S05-04 | Ví dụ: hệ KKT của bài toán một biến | Ba ứng viên, lọc. |
| S05-05 | Điều kiện cần và điều kiện đủ | Bảng giả thiết – kết luận. |
| S05-05b | Chứng minh: điều kiện đủ của KKT | Tính lồi. |
| S05-05c | Chứng minh: điều kiện cần của KKT | Slater cho nghiệm đối ngẫu. |
| S05-05a | Ví dụ: nghiệm tối ưu không có nhân tử KKT | Bài toán của S03-05. |
| S05-06 | KKT trong hồi quy có ràng buộc chuẩn | $J=\|Xw-y\|_2^2$, hệ KKT. |
| S05-06a | Giải hệ KKT của hồi quy | $w(\rho)$, $w(0)$, hai trường hợp, quan hệ hệ số 2. |
| S05-06b | Ví dụ: hồi quy hai trọng số | Ví dụ 03.19: $\lambda^*=2$, mất mát 8. |
| S05-06c | Ví dụ: vector hỗ trợ đọc từ nhân tử | Tình huống 03.1, $\rho=1$: $\alpha^*=(0,\tfrac12,\tfrac12,0)$. |
| S05-07 | Bài tập: hồi quy ba trọng số với ràng buộc chuẩn | Bài tập 03.9, câu (a), (b). |
| S05-07b | Bài tập: hồi quy ba trọng số với ràng buộc chuẩn | Lời giải trên mặt trang. |

### 6. Tổng hợp và vận dụng

| Mã | Tiêu đề | Vai trò |
|---|---|---|
| S07-00 | 6. Tổng hợp và vận dụng | Trang tiêu đề mạch, `id="mach-6"`. |
| S07-01 | Ba bước chứng nhận | Bảng kết quả – giả thiết – công thức; bốn vai trò của nhân tử. |
| S07-02 | Bài tập: quy trình chứng nhận cho một bài toán chiếu | Bài tập 03.10, tự làm. |
| S07-03 | Tài liệu và nội dung mở rộng | Nguồn, máy vector hỗ trợ, chủ đề mở rộng. |

## Nguồn đã kiểm kê và vai trò

| Tài nguyên | Vai trò | Phần sử dụng |
|---|---|---|
| DOCX đề cương UET.AI2012 chính thức trong sources/ | Đề cương | Buổi 3, phạm vi Chương 4, LLO4–5/CLO1, 2 tiết lý thuyết + 1 tiết bài tập |
| Bài 02 HTML và lecture-02-style.css | Mẫu cấu trúc và thị giác | Chia phần, tiêu đề, lưới, hộp, màu, runtime; chỉ đọc tại máy |
| sources/bv_cvxbook.pdf, Boyd–Vandenberghe (2004) | Nguồn nội dung | §5.1–5.3, §5.5; đọc và đối chiếu tại máy |
| sources/dual.pdf và bản trùng bài 5 MIT | Nguồn tham khảo trình tự khái niệm | Lagrange → đối ngẫu → hình học → tối ưu; phần độ nhạy của nguồn chỉ dùng trong ghi chú diễn giả S04-04b; không sao chép hình |
| sources/Bài tập chương 4.pdf và bản lời giải | Nguồn ví dụ cũ | Ví dụ bậc hai được tự tính lại; không mặc định lời giải nguồn đúng |
| Ghi chú và hình của Bài 03 phiên bản trước | Tài liệu cũ cần đồng bộ | Viết lại ghi chú; không dùng hình cũ cho tuyến mới |

Không tải thêm MIT. Hình mới tự vẽ từ công thức kiểm tra được, không có ngoại lệ raster. Nguồn chính thức: [Boyd–Vandenberghe](https://web.stanford.edu/~boyd/cvxbook/), [MIT 6.079 bài 5](https://ocw.mit.edu/courses/6-079-introduction-to-convex-optimization-fall-2009/resources/mit6_079f09_lec05/). Nội tương đối, nón pháp tuyến, điểm yên ngựa và đối ngẫu theo nón chuyển sang đọc mở rộng; không phải tiên quyết của bài tập chính.

Các tệp plan.md, source-map.md, math-spec.md giữ để truy nguyên phiên bản trước; bản hiện hành là outline.md, storyboard.md và review-log.md. Tài liệu công khai: materials/lec-03/lecture-note.md và exercises.md.

Điều chỉnh thứ tự theo yêu cầu người dùng: S03-02 → S03-03 → S03-02b → S03-03a. Phát biểu điều kiện và định lý trước, sau đó minh họa trực quan rồi chứng minh; yêu cầu này ưu tiên hơn trình tự mặc định trực quan trước hình thức. Thời lượng đã phân bổ giữ nguyên.

Cụm hai chiều KKT: S05-05 → S05-05b (chứng minh điều kiện đủ đã có, đổi tên theo yêu cầu) → S05-05c (chứng minh điều kiện cần mới) → S05-05a (giới hạn khi thiếu Slater) → S05-06 (hồi quy). Giữ nội dung chứng minh đủ, không tạo trang trùng.

Đợt sửa văn phong 2026-10-12: thêm trang tiêu đề mạch S02-00, S03-00, S04-00, S05-00, S07-00 (id `mach-2`…`mach-6`); trang đầu mạch cũ đổi tiêu đề; S02-05c tách chứng minh sang S02-05d; bốn bài tập có lời giải mẫu trên trang kế tiếp; S07-01 thành bảng tổng kết. Chi tiết trong storyboard.md và review-log.md.
