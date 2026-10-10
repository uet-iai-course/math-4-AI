# Nhật ký rà soát Bài 04 — ghi chú bài giảng viết lại theo tiêu chuẩn giáo trình

Tệp sản phẩm: `materials/lec-04/lecture-note.md` (viết lại hoàn toàn, ghi đè bản cũ 11 400 từ; bản cũ còn trong git). Hình mới: `img/lec-04/deep-linear-saddle.svg`. Bản đóng gói `material-local-data.js` được cập nhật bằng `scripts/sync-local-materials.py`. Bộ trang chiếu, `exercises.md`, CSS, viewer và `index.html` không bị sửa. Chưa commit.

## Tác tử

| Vai | Loại tác tử | Mô hình | Effort | Ghi chú |
|---|---|---|---|---|
| Soạn (authoring), lượt 1 | general-purpose | Claude Opus 5.5 (`claude-opus-5-5`) | high | Theo brief của điều phối viên Fable 5.1 ngày 2026-10-10; tác tử tự ghi dòng này, điều phối viên đối chiếu với lời gọi công cụ. |
| Rà toán (math accuracy), lượt 1 | theo ghi nhận của điều phối viên | Claude Opus 5.5 (`claude-opus-5-5`) | high | Chỉ đọc; báo cáo được điều phối viên đối chiếu với tệp và hợp nhất vào các mục A–E. |
| Rà mạch truyện (storyline), lượt 1 | theo ghi nhận của điều phối viên | Claude Opus 5.5 (`claude-opus-5-5`) | high | Chỉ đọc; như trên. |
| Chỉnh sửa (editor), lượt 2 | general-purpose (cùng tác tử soạn, tiếp tục qua SendMessage) | Claude Opus 5.5 (`claude-opus-5-5`) | high | Áp dụng quyết định "yêu cầu sửa" lượt 1 của điều phối viên; tác tử tự ghi dòng này. |
| Rà toán, rà lại lượt 2 | theo ghi nhận của điều phối viên | Claude Opus 5.5 (`claude-opus-5-5`) | high | Chỉ đọc; xác nhận mọi mục A–C lượt 1 đã đóng. |
| Rà mạch truyện, rà lại lượt 2 | theo ghi nhận của điều phối viên | Claude Opus 5.5 (`claude-opus-5-5`) | high | Chỉ đọc; như trên. |
| Chỉnh sửa nhẹ, lượt 3 | general-purpose (cùng tác tử, tiếp tục qua SendMessage) | Claude Opus 5.5 (`claude-opus-5-5`) | high | Áp dụng 17 mục của quyết định lượt 2; tác tử tự ghi dòng này. |

Kỹ năng `no-ai-slop` được nạp bằng công cụ `Skill` (chế độ Edit) trước khi soạn; tự đối chiếu `eval.md` ở mục "Tự kiểm `no-ai-slop`".

## Quyết định của điều phối viên

| Lượt | Đầu ra | Quyết định | Lý do |
|---|---|---|---|
| 1 | Bản soạn 31 028 từ (`wc -w`), 169 khối | yêu cầu sửa | Ba phát hiện nghiêm trọng A1–A3 và mâu thuẫn A4, cùng các mục trung bình B1–B9; xem "Phát hiện lượt 1 và cách xử lý". |
| 2 | Bản chỉnh sửa 31 346 từ, 159 khối | chấp nhận sau sửa nhẹ | Mọi mục nghiêm trọng đã đóng theo hai lượt rà lại; độ dài 31 346 từ được chấp nhận, cùng mức ghi chú Bài 01, 02 đã công bố; còn 17 mục trung bình và nhẹ ở bảng "Phát hiện lượt 2". |
| 3 | Bản sửa nhẹ 31 727 từ, 159 khối | chấp nhận | Điều phối viên Fable 5.1 kiểm lại bằng tay phản ví dụ mới của Mệnh đề 04.55(d) ($n=2$, $p=1$, $F-F^*=\lVert r\rVert_2^2/(2\varepsilon)$) và đáp số mới của Bài tập 04.3(c) ($\lVert g\rVert_{W,*}=\sqrt{255}/2$, $v_W=(-1,6)/\sqrt{255}$); kiểm trình duyệt Playwright 1600×900 và 390×844: 0 lỗi trang, 0 `.katex-error`, 159/159 khối, 20/20 hình, không tràn ngang; `sync --check` và `git diff --check` sạch. Mục 3 (căn cứ ở câu sau công thức thay vì cột phải vì KaTeX cảnh báo ký tự tiếng Việt trong `\text{}`) và mục 17 (tùy chọn, sửa một phần) được chấp nhận. Ghi chú này thay thế bản cũ `materials/lec-04/lecture-note.md` ngay khi commit, theo yêu cầu người dùng 2026-10-10. |

Sửa kèm của điều phối viên (ngoài ghi chú): `material-viewer.css` thêm quy tắc cho `.katex-html:has(> .tag)` để nhãn `\tag{}` cuộn theo công thức ở màn hẹp thay vì chồng lên ký hiệu cuối (lỗi do tác tử soạn phát hiện ở lượt 1, ảnh hưởng mọi ghi chú có `\tag`); đã kiểm ghi chú 01, 03, 04 ở hai cỡ, bố cục màn rộng không đổi.

## Số liệu của bản lượt 2

- 31 346 từ (`wc -w`), 3 274 dòng; 159 khối `:::` mở, 159 dòng `:::` đóng, không lồng.
- Bộ đếm chung 04.1–04.55 không đổi: 13 định nghĩa, 8 định lý, 14 mệnh đề, 5 bổ đề, 2 hệ quả, 13 nhận xét.
- Bộ đếm riêng: Ví dụ 04.1–04.25, Bài tập 04.1–04.15 (10 trong mục, 5 củng cố), Tình huống 04.1–04.3, Thuật toán 04.1–04.4.
- 27 khối `proof`, 15 `hint`, 15 `solution`; 20 hình (19 SVG có sẵn, 1 SVG mới).
- Bảng ký hiệu 22 dòng (thêm $h(t)$ và $
ho$).

Số liệu lượt 1: 31 028 từ, 3 208 dòng, 169 khối; Ví dụ 04.1–04.26; Bài tập 04.1–04.18; 21 hình; bảng ký hiệu 20 dòng.

## Phát hiện lượt 1 và cách xử lý

Các mục A–E do điều phối viên hợp nhất từ báo cáo rà toán và rà mạch truyện, đã đối chiếu với tệp. Vị trí ghi theo số hiệu lượt 1. Không xóa phát hiện nào.

| # | Mức độ | Vị trí (lượt 1) | Vấn đề | Cách xử lý (lượt 2) | Trạng thái |
|---|---|---|---|---|---|
| A1 | nghiêm trọng | Bài tập 04.18 (c), gợi ý; (b) | Phép đổi biến đúng là $T=\operatorname{diag}(1,10)$, không phải $\operatorname{diag}(1,\tfrac1{10})$; (b) nói "cận số bước tăng 98 lần" | Gợi ý và lời giải (c) viết $\tilde X=X\operatorname{diag}(1,10)$, $\tilde X\tilde w=X(T\tilde w)$, $T=\operatorname{diag}(1,10)$; (b) nói hệ số $\kappa$ của cận tăng khoảng 98 lần, $e_0$ cũng đổi theo thang (nay Bài tập 04.15) | đã sửa |
| A2 | nghiêm trọng | Mệnh đề 04.55(d) và chứng minh | Lập luận bác cận dưới trong khi phát biểu nói cận trên | (d) tách hai ý: $F(u)-F^*$ có thể âm tại điểm chưa khả thi; không có hàm $\omega$ chung với $F-F^*\le\omega(\lVert r\rVert_2)$, phản ví dụ $F=\tfrac\varepsilon2u^2$, $p=0$, $F-F^*=r_d^2/(2\varepsilon)$; chứng minh chia bốn bước có nhãn | đã sửa |
| A3 | nghiêm trọng | §6.1 sau Định nghĩa 04.47 | "Ba phản ví dụ cho thấy tự điều chỉnh không chứa lớp lồi mạnh" sai | Viết lại: hai lớp không chứa nhau; VD2 tự điều chỉnh không lồi mạnh; $f(s)=s^4+\tfrac1{100}s^2$ lồi mạnh ($f''\ge0{,}02$) không tự điều chỉnh, tại $s=0{,}05$ tỷ số $\approx107$, tính tay | đã sửa |
| A4 | nghiêm trọng (mâu thuẫn) | Định lý 04.50, đoạn sau định lý, Nhận xét 04.54, Hệ quả 04.52, Tóm tắt | Giả thiết "đạt cực tiểu" mâu thuẫn với câu "chứng minh không dùng giả thiết đó" | Bỏ "đạt tại một điểm của miền", chỉ giữ $f^*=\inf f>-\infty$ (cũng ở Hệ quả 04.52); Bước 5 thêm trường hợp $y=x$; đoạn sau định lý nói $f^*>-\infty$ suy ra từ $\delta<1$; câu so với B&V: "cùng ý, tham số hóa theo hướng thay vì theo điểm"; sửa Nhận xét 04.54, Bài tập 04.13 cũ (b), Kết mục §6, Tóm tắt | đã sửa |
| B1 | trung bình | Định lý 04.35; đoạn sau Định lý 04.53 | $\eta$ trùng nhân tử bài con; $\gamma$ định nghĩa hai lần | Ngưỡng $\bar g$, mức giảm $\gamma_1$ (Định lý 04.35); $\bar\delta$, $\gamma_2$ (sau Định lý 04.53); giả thiết 04.35 viết "$S$ đóng, và trên $S$: …" | đã sửa |
| B2 | trung bình | Nhiều chỗ | $\rho$ mang năm nghĩa | $\rho$ chỉ còn là hệ số chính quy hóa ridge; phần dư Taylor đổi thành $\xi(t)$; hệ số co của Ví dụ 04.8 thành $c$; bán kính ở Định lý 04.34 thành $\vartheta$; chuẩn phần dư dọc tia ở Mệnh đề 04.45 thành $\Phi(t)$; bảng ký hiệu thêm $\rho$ | đã sửa |
| B3 | trung bình | Ví dụ 04.5, Định nghĩa 04.10, Nhận xét 04.12 | $\phi(t)$ dễ lẫn $\varphi$ | Đổi thành $h(t)$, cùng chữ với hạn chế lên đường thẳng ở Mục 6; bảng ký hiệu thêm $h(t)$ | đã sửa |
| B4 | trung bình | Mở đầu §1; đoạn sau Định nghĩa 04.1; Nhận xét 04.19; hai đoạn "Trong học máy" §2.6, §3.1 | Ký hiệu dùng trước khi gọi tên | Gọi tên $w$, $\mu$, câu đọc công thức; $m$, $D$, $f_i$; Nhận xét 04.19 thêm đoạn "Dữ liệu nhiều mẫu" với $X\in\mathbb R^{N\times n}$, hàng $a_i^T$, nhãn $y_i$, biên $m_i=y_ia_i^Tw$, mất mát là tổng; hai đoạn dẫn về đó. Dùng $N$ cho số mẫu thay $m$ để không trùng biên $m_i$ | đã sửa |
| B5 | trung bình | Mục 7; Kết mục 6 | Mục 7 không mở bằng bài toán có số liệu, thiếu chuỗi suy luận, kết mục thiếu | Mở Mục 7 bằng bài ridge có dữ liệu của Ví dụ 04.25; thêm "Chuỗi suy luận của mục"; kết mục đủ ba ý; Kết mục 6 thêm thiếu hụt về phạm vi lớp hàm và về $\lVert r\rVert_2$ | đã sửa |
| B6 | trung bình | Nhiều chỗ | Trình bày sáng sủa | Chứng minh Bổ đề 04.49 và Mệnh đề 04.55 chia bước; chuỗi nội dòng chuyển sang `aligned` (Mệnh đề 04.15 Bước 5, Mệnh đề 04.31 Bước 4, Ví dụ 04.16, Mệnh đề 04.44 Bước 3–4, Mệnh đề 04.48 Bước 1; Ví dụ 04.12 rút còn hai quan hệ); đoạn nhiều ý tách hoặc thành danh sách (sau Định nghĩa 04.1, sau Mệnh đề 04.2, sau Mệnh đề 04.7, sau Định nghĩa 04.17, sau Bổ đề 04.20, sau Mệnh đề 04.31, sau Định lý 04.34, Tình huống 04.3 Diễn giải); nhãn giai đoạn và mỗi phép tính một dòng ở Tình huống 04.1, 04.2, Ví dụ 04.25; ngoặc lồng tách câu, viết "công thức 9.49", "công thức 9.56". Bài tập 04.6 cũ (chuỗi nội dòng) bị cắt theo D | đã sửa |
| B7 | trung bình | Nhận xét 04.36; Tình huống 04.3 | "Quay lui không bao giờ kết thúc" quá mạnh, căn cứ sai | Nhận xét 04.36: thủ tục chỉ định nghĩa cho $g^Td<0$, có thể không kết thúc hoặc nhận bước làm $f$ tăng. Tình huống 04.3: chứng minh $f(x+td)-f(x)\ge0{,}0377t>0{,}0084t\approx\alpha t\,g^Td$ với mọi $t\in(0,1]$ bằng $0{,}04-a^2=(0{,}2-a)(0{,}2+a)$ trong `aligned` | đã sửa |
| B8 | trung bình | "Trong học máy" cuối §2.5 | Phạm vi của chuẩn hóa dữ liệu | Chia độ lệch chuẩn với mô hình tuyến tính là đổi biến $\tilde w=Sw$, $W=S^2$; trừ trung bình là đổi biến affine giữa trọng số và hệ số chặn; mạng phi tuyến không còn là đổi biến tham số | đã sửa |
| B9 | trung bình | Năm đoạn "So với … Cái giá …" | Khuôn lặp | Viết lại cả năm đoạn và đoạn "So với" sau Định nghĩa 04.10, Định nghĩa 04.30 với cấu trúc câu khác; còn 0 đoạn mở bằng "So với" | đã sửa |
| C1 | nhẹ | Bổ đề 04.23 | $\alpha=\tfrac12$ so với Định nghĩa 04.10 | "Cùng thủ tục với tham số mở rộng $\alpha\in(0,\tfrac12]$; Mệnh đề 04.11 chỉ cần $\alpha<1$" | đã sửa |
| C2 | nhẹ | Mở đầu §6 | Lý do chưa đúng | Nêu $S\approx[0{,}25;\,2{,}587]$, $\mu\approx0{,}149$, $L=16$, $L_H=128$: hằng số tồn tại nhưng phụ thuộc tọa độ và cho cận bi quan | đã sửa |
| C3 | nhẹ | Mệnh đề 04.29(c) | Thiếu "khi $g\ne0$" | Thêm vào phát biểu và chứng minh | đã sửa |
| C4 | nhẹ | Bài tập 04.7 cũ (c) (nay 04.5) | Thiếu lý do bước đầy đủ được nhận về sau | Thêm $\lvert1-s\rvert\le\tfrac12$ và $\varphi(s)-\varphi(2s-s^2)\ge0{,}1(1-s)^2$ trên $[\tfrac12,\tfrac32]$ (kiểm số trên lưới 10 001 điểm) | đã sửa |
| C5 | nhẹ | Bài tập 04.17 cũ (nay 04.14) | Thiếu quỹ đạo trong hình vuông và $L$ | Quỹ đạo $a_k\in(0,1]$ trên đường chéo; tổng trị tuyệt đối mỗi hàng Hessian $\le4$ nên $L=4$ | đã sửa |
| C6 | nhẹ | "Trong học máy" §5, sau Mệnh đề 04.2; Ví dụ 04.1; §3.3 | Diễn đạt | "Từ một điểm bất kỳ thuộc miền của mất mát"; đích là $\nabla f=0$, dừng theo gradient nhỏ cần giả thiết Mục 2.6; "biến đổi đại số thông thường"; Martens (2010) dùng tích Gauss–Newton với vector và gradient liên hợp | đã sửa |
| C7 | nhẹ | Tình huống 04.2 | Tên mô hình trùng $A$; "Bài không ràng buộc $w\ge0$"; thiếu kiểm miền | Đổi thành mô hình 1, 2; "Bài toán không có ràng buộc $w\ge0$"; nêu $c_1^Tw\approx0{,}677$, $c_2^Tw\approx0{,}162$ | đã sửa |
| C8 | nhẹ | Nhiều chỗ | Các mục nhỏ | Sửa đủ: câu so sánh không cùng loại sau Định nghĩa 04.4; $r_p(5,2)=-7=\tfrac12r_p(0,0)$; "về lý thuyết" và dẫn Nhận xét 04.42; ghi chú bảng tốc độ; điều kiện cho hai đoạn "Trong học máy" và $h_i>0$; bỏ câu về đánh số; bỏ colon reveal "Ý chính của chứng minh:"; nhãn "Lý do của cận $\alpha<\tfrac12$"; câu có chủ ngữ ở ba nhầm lẫn của Nhận xét 04.12, Nhận xét 04.36, hai lỗi lập hệ; câu quan hệ cho Mệnh đề 04.48 (với Định lý 01.31) và Bổ đề 04.49 (với Bổ đề 04.18); thêm Định lý 01.36, Hệ quả 03.31, 03.24 vào Kiến thức tiên quyết; bảng ánh xạ thêm bài Newton logistic vào mục tiêu 4 và bài tâm giải tích vào mục tiêu 7; mục "Tốc độ học" ghi "với hàm bậc hai (Ví dụ 04.7, Nhận xét 04.13)". Đoạn nhầm lẫn $\eta$ và $\Delta\nu$ của Nhận xét 04.40 bị bỏ vì trùng Nhận xét 04.46 (theo D) | đã sửa |
| D | quyết định độ dài | Toàn tệp | Cắt 1 200–1 600 từ để về ≤ 30 000 | Đã cắt: Ví dụ 04.23 cũ; Bài tập 04.6 cũ; Nhận xét 04.42 phần "Tốc độ"; đoạn nhầm lẫn trùng ở Nhận xét 04.40 (giữ ở 04.46); hình `self-concordance-equality.svg` khỏi ghi chú (tệp giữ nguyên); Ví dụ 04.8 rút gọn (giữ dạng đóng); danh mục "Ứng dụng" rút gọn. Cắt thêm: Bài tập 04.4 cũ (trùng Nhận xét 04.16), Bài tập 04.13 cũ (trùng phản ví dụ của §6.1 và đoạn sau Định lý 04.50), phần (c) của Bài tập 04.3, đoạn "Các bước sau" của Tình huống 04.2, đoạn sau Ví dụ 04.25, danh sách LLO, rút gọn Nhận xét 04.27, hai mục tài liệu tham khảo. Thử cắt Bài tập 04.5 cũ làm mất bước bài tập của §2.6 nên đã khôi phục (nay Bài tập 04.4). Kết quả 31 346 từ, còn vượt 30 000 khoảng 4,5%: các sửa bắt buộc A2, A3, B4–B7, C2, C4, C5 thêm khoảng 1 300 từ. | một phần; chờ điều phối viên |
| E1 | quyết định không sửa | Ví dụ giải sẵn bài 1–7, 8(a) của `exercises.md` | Trùng lặp | Chấp nhận theo tiền lệ quyết định 2 của Bài 02b/03b; xử lý bằng đổi dữ liệu trong `exercises.md` ở lượt khác. Bảng trùng lặp đầy đủ ở mục dưới. | chờ xử lý (ở `exercises.md`) |
| E2 | quyết định không sửa | Ký hiệu $\delta_N$, $\mu/L$ thay $m/M$, hàm trên tia | Lệch ký hiệu với deck hoặc nguồn | Giữ; hàm trên tia nay là $h(t)$ | giữ |

Ứng viên cắt thêm nếu điều phối viên giữ trần 30 000: bỏ Ví dụ 04.8 cùng hình `quadratic-zigzag.svg` (khoảng 300 từ, nội dung ngoài deck); bỏ phần khởi đầu chưa khả thi của Tình huống 04.2 (khoảng 120 từ); rút bảng giảm gradient và đoạn Giới hạn của Tình huống 04.3 (khoảng 80 từ); rút lời giải Bài tập 04.13 và 04.15 (khoảng 150 từ).

## Phát hiện lượt 2 và cách xử lý

Các mục do điều phối viên hợp nhất từ hai báo cáo rà lại lượt 2. Không đổi số hiệu nào ở lượt 3. Độ dài 31 346 từ của lượt 2 được chấp nhận, không cắt thêm; lượt 3 tăng lên 31 727 từ do các bổ sung bắt buộc của mục 1, 2, 3, 13.

| # | Mức độ | Vị trí | Vấn đề | Cách xử lý (lượt 3) | Trạng thái |
|---|---|---|---|---|---|
| 1 | trung bình | Ví dụ 04.25 | Chưa trả lời câu hỏi chọn thuật toán và ý nghĩa của phần dư nhỏ | Thêm nhãn **Diễn giải** bốn ý: chọn Thuật toán 04.4 vì $w=0$ không khả thi; $r=0$ sau một bước; tại điểm khả thi cận theo $\delta_{eq}$ qua $\psi$ (Mệnh đề 04.55(c)) và $\psi$ lồi mạnh vì $\nabla^2J\succeq\rho I$; $\lVert r\rVert_2$ không cho cận (04.55(d)) | đã sửa |
| 2 | trung bình | Chứng minh Hệ quả 04.51 | Chưa chia bước | Bước 1 (đạo hàm), Bước 2 (dấu tại đầu mút), Bước 3 (kết luận và phần cuối) | đã sửa |
| 3 | trung bình | Mệnh đề 04.15 Bước 6, 04.41 Bước 4, 04.45 Bước 2, Định lý 04.50 Bước 2 | Chuỗi nội dòng | Chuyển sang `aligned` mỗi dấu một dòng; căn cứ ở cột phải bằng ký hiệu toán, căn cứ bằng chữ tiếng Việt đặt ở câu ngay sau công thức (KaTeX cảnh báo ký tự tiếng Việt trong `\text` ở chế độ toán) | đã sửa |
| 4 | trung bình | Tình huống 04.2, khởi đầu chưa khả thi | Một đoạn nhiều ý | Danh sách bốn mục: phần dư; bước; nhận bước và $r_p^+=0$; miền và trọng số âm | đã sửa |
| 5 | trung bình | Mục tiêu học tập | Câu bốn ngoặc đơn | Hai mục danh sách, không ngoặc | đã sửa |
| 6 | nhẹ | Ký hiệu số mẫu | $N$ trùng ma trận $N$ của $\ker A$; $m$ ở Ví dụ 04.25 | Số mẫu là $N_s$ ở Nhận xét 04.19, "Trong học máy" §2.6, §3.1, Ví dụ 04.25; bảng ký hiệu thêm $N_s$; Ví dụ 04.25 thêm câu nêu lý do giữ $M$ cho ma trận dữ liệu ridge. Bài tập 04.15 và mở Mục 7 không dùng ký hiệu số mẫu | đã sửa |
| 7 | nhẹ | Chứng minh Bổ đề 04.18 | $h=y-x$ trùng $h(t)$ | Đổi thành $\Delta=y-x$ | đã sửa |
| 8 | nhẹ | Mệnh đề 04.55(d) Bước 4 | $p=0$ trái bảng ký hiệu | Dùng $F=\tfrac\varepsilon2u_1^2+\tfrac12u_2^2$, $u_2=0$, $n=2$, $p=1$; kiểm $u^*=0$, $\nu^*=0$, $F^*=0$; $\lVert r\rVert_2=\varepsilon\lvert u_1\rvert$, $F-F^*=\lVert r\rVert_2^2/(2\varepsilon)$ | đã sửa |
| 9 | nhẹ | Kết mục §6; Kết mục 7 | Phát biểu quá rộng; dẫn bài sau | "dùng chung cho mọi bài, nếu không có giả thiết thêm"; "chuyển cho Bài 05b, còn Bài 05 xử lý gradient trên nhóm nhỏ mẫu" | đã sửa |
| 10 | nhẹ | Ví dụ 04.8 | Thiếu kiểm dạng đóng | Thêm $\frac{200c^{2k}}{1100c^{2k}}=\tfrac2{11}$; alt và SVG giữ nguyên, câu ghi chú $c$ là $\rho$ trên hình giữ | đã sửa |
| 11 | nhẹ | Bài tập 04.3 | Thêm $\lVert g\rVert_{W,*}$, $v_W$ | Câu (c): $\lVert g\rVert_{W,*}=\tfrac{\sqrt{255}}2$, $v_W=(-1,6)^T/\sqrt{255}$, kiểm $v_W^TWv_W=1$ | đã sửa |
| 12 | nhẹ | Ví dụ 04.21, kiểm tra lại | Thiếu kiểm quy tắc nhận bước | Với $\alpha=0{,}1$: $\lVert r^+\rVert_2=0\le0{,}9\sqrt{1997}$, nhận $t=1$ | đã sửa |
| 13 | nhẹ | Lời giải Bài tập 04.5(c) | Bất đẳng thức chưa có căn cứ | Khảo sát $D(u)=0{,}9u^2-u+\log(1+u)$ với $u=1-s$: $D'(u)=u(0{,}8+1{,}8u)/(1+u)$, $D(0)=0$, $D(-\tfrac12)\approx0{,}032$; trình bày trong `aligned` | đã sửa |
| 14 | nhẹ | "Trong học máy" cuối §2.5 | Câu hai chữ "cho"; "thường" | "tạo ra dữ liệu mới"; số điều kiện giảm khi các cột khác nhau chủ yếu về thang đo, tương quan giữa các cột vẫn giữ $\kappa$ lớn (Tình huống 04.1) | đã sửa |
| 15 | nhẹ | Kiến thức tiên quyết, KKT và độ nhạy | Chưa gọi tên hàm giá trị | Gọi tên $p^*(v)$, giá trị tối ưu khi vế phải bị nhiễu thành $Ax-b=v$ | đã sửa |
| 16 | nhẹ | "Trong học máy" §3.3 | Thiếu thuật ngữ gốc, câu dài | Thêm (Hessian-free), (conjugate gradient), tách hai câu | đã sửa |
| 17 | tùy chọn | Bốn đoạn so sánh cùng dạng | Nhịp câu | Đổi đoạn sau Định lý 04.34 thành câu đơn ("đổi phạm vi lấy tốc độ"); ba đoạn còn lại giữ | đã sửa một phần |

## Bảng đổi số hiệu (lượt 1 → lượt 2)

Bộ đếm chung 04.1–04.55 và Tình huống, Thuật toán không đổi.

| Lượt 1 | Lượt 2 | Đối tượng |
|---|---|---|
| Ví dụ 04.23 | (bỏ) | Bước $t=\tfrac12$ của Newton phần dư |
| Ví dụ 04.24, 04.25, 04.26 | Ví dụ 04.23, 04.24, 04.25 | Tỷ số độ cong VD2; cận sai số VD2; hồi quy ridge |
| Bài tập 04.1–04.3 | Bài tập 04.1–04.3 | không đổi |
| Bài tập 04.4 | (bỏ) | Hướng dốc nhất với $W=\operatorname{diag}(1,4)$ |
| Bài tập 04.5 | Bài tập 04.4 | Bước cố định trên VD1 |
| Bài tập 04.6 | (bỏ) | Quay lui $\alpha=\tfrac12$, $\beta=\tfrac14$ |
| Bài tập 04.7–04.12 | Bài tập 04.5–04.10 | Newton từ $s^0=3$; logistic; VD3 từ $(8,6)$; bài ba biến; VD3 từ $(4,2)$; hàm chắn |
| Bài tập 04.13 | (bỏ) | $e^s$, $-\log s$, $-\log s+cs$ |
| Bài tập 04.14–04.18 | Bài tập 04.11–04.15 | Đúng hay sai; tâm giải tích; ma trận khối; gradient không lồi; thang đo đặc trưng |

## Giáo trình đã tham khảo

Số trang Boyd và Vandenberghe (2004) là trang in, đọc từ `sources/bv_cvxbook.pdf` (trang in = trang PDF − 14) bằng `pdftotext`. Các trang đọc trực tiếp: 457–458, 464–465, 469, 476, 486, 488–491, 501–502, 526, 532. Các mục khác được định vị bằng tìm kiếm tiêu đề mục và số công thức trong văn bản trích xuất. MIT 6.079 bài giảng 16 và 17 là `sources/b9e5d6e835bcd8071edc67771e5362e7_MIT6_079F09_lec16.pdf` và `sources/4c428302acfe82bee62cf037829a8abd_MIT6_079F09_lec17.pdf` (đọc tiêu đề từng trang). Goodfellow, Bengio và Courville (2016) đọc mục lục và số trang in từ PDF trong `sources/`. Không có PDF cục bộ của Nocedal và Wright (2006); các mục của sách này được dẫn theo cấu trúc sách đã biết, chưa kiểm số trang. Không dịch hoặc chép đoạn văn nào.

| Mục của chương | Nguồn và mục | Điều học được và chuyển vào ghi chú |
|---|---|---|
| 1 (KKT rút gọn, cấu trúc bước lặp) | B&V 9.1, tr. 457–458; 10.1, tr. 521–522; 9.2, tr. 463–464 (Thuật toán 9.1); Strang (2016) mục 4.1 | Bài toán (9.1)–(9.2) và nhu cầu thuật toán lặp; KKT của bài có đẳng thức; khung "hướng – tìm bước – cập nhật – dừng" thành Định nghĩa 04.4. Chiều cần của Mệnh đề 04.2(b) chứng minh trực tiếp qua $(\ker A)^\perp$ thay vì qua Slater, để chương tự chứa. |
| 2.1–2.4 (đạo hàm hướng, hướng gradient, Armijo, số điều kiện) | B&V 9.2, tr. 463–466 (Thuật toán 9.2, hình 9.1, cận $\alpha<0{,}5$); 9.3.2, tr. 469–470; Nocedal và Wright mục 3.1 | Cách đọc điều kiện Armijo như đường thẳng thoải hơn tiếp tuyến; ví dụ kinh điển $\tfrac12(x_1^2+\gamma x_2^2)$ với $\gamma=10$ dùng lại ở Ví dụ 04.8 (tính lại toàn bộ). Thứ tự đổi so với B&V: chương đưa hướng gradient như nghiệm của mô hình $Q_I$ trước, theo bộ trang chiếu. |
| 2.5 (hướng dốc nhất) | B&V 9.4, tr. 475–477 (công thức (9.24), chuẩn bậc hai 9.4.1) | Quy ước độ dài $\Delta x_{sd}=\lVert g\rVert_*\Delta x_{nsd}$; hướng dốc nhất theo chuẩn bậc hai là $-P^{-1}g$; diễn giải bằng đổi biến. Chương giải bài con bằng KKT bốn nhóm như bộ trang chiếu, B&V chỉ nêu kết quả. |
| 2.6 (hội tụ giảm gradient) | B&V 9.1.2, tr. 459–463 ((9.9)); 9.3.1, tr. 466–469; Beck (2017) Định lý 10.21 | Cận (2.5) là (9.9) của B&V; tốc độ tuyến tính theo 9.3.1. Cận $O(1/k)$ không có trong B&V; chứng minh tổng lồng viết đầy đủ trong chương, dẫn Beck theo trí nhớ. |
| 3 (Newton) | B&V 9.5.1, tr. 484–487 (hình 9.18, bất biến affine, độ giảm Newton (9.29)); 9.5.3, tr. 488–491 ((9.36), (9.38)); Nocedal và Wright mục 3.3–3.4; Goodfellow mục 8.6, tr. 310–317 | Hai cách đọc hướng Newton (cực tiểu mô hình, nghiệm của đạo hàm đã tuyến tính hóa); chứng minh bất biến affine; hằng số $\eta$, $\gamma$, $\varepsilon_0$ của Định lý 04.35 được đối chiếu trên tr. 489–491. Chứng minh hội tụ bậc hai cục bộ (Định lý 04.34) viết theo dạng tích phân của Nocedal và Wright, giữ từ bản ghi chú cũ. |
| 4 (Newton khả thi, khử biến) | B&V 10.1.1–10.1.2, tr. 522–524; 10.2.1, tr. 526–527 ((10.10), (10.11)); 10.2.3, tr. 528–529; 10.4, tr. 542–546; MIT 6.079 bài 17, tr. 3–9; Nocedal và Wright mục 16.1–16.2 | Bài con (10.10) và hệ (10.11); quan hệ Newton khả thi – Newton trên hàm rút gọn; bài phân bổ tài nguyên của MIT bài 17 tr. 5 dùng ở đoạn "Trong học máy". Điều kiện khả nghịch "$H$ xác định dương trên $\ker A$" và quán tính của ma trận KKT theo Nocedal và Wright mục 16.2. |
| 5 (Newton từ điểm chưa khả thi) | B&V 10.3.1, tr. 531–533 ((10.19), diễn giải gốc – đối ngẫu); 10.3.2, tr. 534–536; 10.3.3, tr. 536–540 | Hệ (10.19) viết lại theo số gia $\Delta\nu$ như bộ trang chiếu; đạo hàm của $\lVert r\rVert_2$ dọc hướng Newton; phần dư khả thi co theo $1-t$. |
| 6 (tự điều chỉnh) | B&V 9.6.1–9.6.4, tr. 497–505 ((9.45)–(9.50), (9.56)); MIT 6.079 bài 16, tr. 24–27; Bach (2010) | Định nghĩa, phép bảo toàn, cận (9.49) và cận $\lambda^2$ khi $\lambda\le0{,}68$. Chứng minh Định lý 04.50 trong chương chuẩn hóa hướng theo $\lVert\cdot\rVert_H$ rồi cực tiểu theo độ dài, một biến thể của lập luận B&V tr. 501–502; Hệ quả 04.51 được chứng minh bằng khảo sát hàm (B&V chỉ nêu). |
| 7 và Tình huống | B&V 5.5.3, tr. 243–244; Goodfellow mục 4.3, tr. 82–93 và 8.2, tr. 282–294; Martens (2010) | Bảng tổng hợp theo trang tổng hợp của bộ trang chiếu; điểm yên ngựa và Hessian không xác định dương trong mạng sâu cho Tình huống 04.3. |

## Ánh xạ mục tiêu học tập – kết quả – bài tập (số hiệu lượt 2)

| Mục tiêu (LLO/CLO) | Kết quả và ví dụ | Bài tập |
|---|---|---|
| 1. Hệ KKT rút gọn (LLO6, LLO9; CLO1) | Mệnh đề 04.2, Nhận xét 04.3; Ví dụ 04.2, 04.17 | 04.1, 04.11 |
| 2. Bài con và các hướng (LLO6; CLO1) | Mệnh đề 04.9, 04.15, 04.29; Định lý 04.39; Ví dụ 04.4, 04.9, 04.14, 04.18 | 04.3, 04.11, 04.13 |
| 3. Thực hiện một lượt, nhận bước, dừng (LLO8; CLO2) | Mệnh đề 04.11; Thuật toán 04.1, 04.2; Ví dụ 04.6, 04.15; Nhận xét 04.32 | 04.2, 04.5, 04.6, 04.12 |
| 4. Cận hội tụ (LLO8; CLO2) | Định lý 04.22, 04.24, 04.26, 04.34, 04.35; Ví dụ 04.10–04.12, 04.16 | 04.4, 04.6, 04.14 |
| 5. Tự điều chỉnh và cận sai số (LLO7; CLO1) | Định nghĩa 04.47; Mệnh đề 04.48; Định lý 04.50; Hệ quả 04.51, 04.52; Ví dụ 04.23, 04.24 | 04.10, 04.11, 04.12 |
| 6. Hai hệ Newton có đẳng thức (LLO9, LLO10; CLO1, CLO2) | Định lý 04.39; Mệnh đề 04.41, 04.44, 04.45; Thuật toán 04.3, 04.4; Ví dụ 04.18–04.22 | 04.7, 04.8, 04.9, 04.12, 04.13 |
| 7. Vận dụng vào mô hình học (LLO6–LLO10; CLO1, CLO2) | Tình huống 04.1–04.3; Ví dụ 04.25; Mệnh đề 04.55 | 04.6, 04.12, 04.14, 04.15 |

## Tự kiểm theo bảng kiểm "Kiểm định ghi chú bài giảng"

| Tiêu chí | Kết quả | Bằng chứng |
|---|---|---|
| Mỗi mục tiêu có định lý hoặc ví dụ và bài tập | đạt | Bảng ánh xạ ở trên; bảng ánh xạ trong ghi chú ở đầu "Bài tập củng cố". |
| Tám bước cho mỗi khái niệm trọng tâm | đạt | Hướng giảm: §2.1 nhu cầu, trực giác, Định nghĩa 04.6, Mệnh đề 04.7, chứng minh, Ví dụ 04.3, đoạn phản ví dụ $g^Td=0$, Bài tập 04.2. Quay lui Armijo: Ví dụ 04.5, Định nghĩa 04.10, Mệnh đề 04.11, Ví dụ 04.6, Nhận xét 04.12, Bài tập 04.2. Hướng dốc nhất: hai hình đơn vị, Định nghĩa 04.14, Mệnh đề 04.15, Ví dụ 04.9, Nhận xét 04.16, Bài tập 04.3. Hội tụ gradient: Định nghĩa 04.17, Bổ đề 04.18–04.23, Định lý 04.22–04.26, Ví dụ 04.10–04.12, Nhận xét 04.27, Bài tập 04.4. Newton: Ví dụ 04.13, Định nghĩa 04.28, Mệnh đề 04.29, Ví dụ 04.14, Định nghĩa 04.30, Mệnh đề 04.31, Ví dụ 04.15, Nhận xét 04.32, Định lý 04.34–04.35, Ví dụ 04.16, Nhận xét 04.36, Bài tập 04.5–04.6. Newton khả thi: Ví dụ 04.17, Mệnh đề 04.37, Định nghĩa 04.38, Định lý 04.39, Ví dụ 04.18, Nhận xét 04.40, Mệnh đề 04.41, Ví dụ 04.19, Nhận xét 04.42, Bài tập 04.7–04.8. Newton phần dư: Định nghĩa 04.43, Ví dụ 04.20, Mệnh đề 04.44, Ví dụ 04.21–04.22, Mệnh đề 04.45, Nhận xét 04.46, Bài tập 04.9. Tự điều chỉnh: hình độ cong, Ví dụ 04.23, Định nghĩa 04.47, phản ví dụ, Mệnh đề 04.48, Bổ đề 04.49, Định lý 04.50, Ví dụ 04.24, Hệ quả 04.51–04.52, Nhận xét 04.54, Bài tập 04.10. Số hiệu theo lượt 2. |
| Ký hiệu trong bảng | đạt | 22 dòng ở lượt 2, thêm $h(t)$, $\rho$; ký hiệu của một ví dụ hay chứng minh ($q$, $\xi$, $\vartheta$, $\Phi$, $c$, $\omega$, $\zeta$, $L_s$, $L_m$, $J$, $M$, $c_j$, $\bar g$, $\gamma_1$, $\bar\delta$, $\gamma_2$) giới thiệu tại chỗ. |
| Định lý đủ bốn phần, có chứng minh hoặc nguồn | đạt | Script: 29 khối định lý/mệnh đề/bổ đề/hệ quả đều có bốn phần; 27 khối `proof` đứng ngay sau kết quả và kết thúc bằng $\square$. Hai định lý không chứng minh (04.35, 04.53) ghi "Chứng minh nằm ngoài phạm vi học phần" với nguồn có số trang và một đoạn ý chính. |
| Ví dụ có kết quả số và "Kiểm tra lại" | đạt | Script lượt 2: 25 ví dụ và 3 tình huống có nhãn "Kiểm tra lại". Số liệu tính lại bằng Python với phân số chính xác (mục "Kiểm tra kỹ thuật"). |
| Bài tập có `hint` và `solution` | đạt | 15 bài ở lượt 2, mỗi bài theo sau đúng một `hint` rồi một `solution`; mọi lời giải có "Kiểm tra lại". |
| Không "xem trang chiếu", không câu mảnh, không bước bỏ | đạt | Script tìm "trang chiếu", "xem bài giảng", mã trang RP/RG/RN/RE/RR/RS/RZ, "chúng ta", "dễ thấy", "suy ra ngay": không có. |
| Trình bày sáng sủa | đạt, cần rà mạch truyện xác nhận | Chứng minh dài chia bước có nhãn trên dòng riêng; chuỗi nhiều dấu đặt trong `aligned`; trường hợp và kết luận (a), (b), (c) thành danh sách; script đếm câu: không đoạn diễn giải nào quá bốn câu (một cảnh báo còn lại là mục danh sách của Mệnh đề 04.44, không phải đoạn văn). Chưa có script đếm ngoặc đơn mỗi câu. |
| Số hiệu liên tục, tham chiếu đúng | đạt | Lượt 2: 447 tham chiếu; lượt 1: 446 tham chiếu `04.k` trỏ đúng khối, đúng loại (script); mọi số hiệu `01.k`, `03.k` được dẫn (27 kết quả, kể cả Định nghĩa 01.22, 01.24 và Định lý 01.35 trong danh sách tiên quyết) đều có trong `materials/lec-01`, `lec-03` (đối chiếu bằng `grep`). |
| Móc nối khái niệm, định lý, "Trong học máy", chuỗi suy luận, mở và kết chương | đạt | Đoạn quan hệ sau mỗi định nghĩa; câu dẫn trước và đoạn so sánh sau các định lý chính; mười đoạn "Trong học máy" (sau Mệnh đề 04.2, Thuật toán 04.1, §2.5, §2.6, Mệnh đề 04.29, §3.3, Định lý 04.39, §4.3, §5, §6); mỗi mục có "Chuỗi suy luận của mục" và "Kết mục"; mở chương nối Định lý 03.32, Ví dụ 03.19; kết chương (trong Tóm tắt) nối Bài 05 và Bài 05b. |
| Đoạn kết ba ý, công thức có câu dẫn và câu đọc, ký hiệu gọi tên lần đầu | đạt theo tự kiểm | Kiểm thủ công theo từng mục. |
| Giáo trình ghi theo mục, dẫn tại chỗ | đạt | Bảng "Giáo trình đã tham khảo"; dẫn tại chỗ ở Nhận xét 04.12, Ví dụ 04.8, Định lý 04.22, 04.26, 04.35, 04.53, Nhận xét 04.36, 04.40, 04.46, 04.54. |
| Nhất quán với bộ trang chiếu | đạt, có lệch ghi dưới | VD1, VD2, VD3, mọi số liệu của các trang và đáp án câu hỏi trùng deck; ký hiệu $g$, $H$, $d$, $t$, $W$, $Q_W$, $\zeta$, $\delta_N$, $\delta_{eq}$, $\nu$, $\eta$, $\Delta\nu$, $r_d$, $r_p$, $N$, $\psi$ như deck. |

## Lệch với bộ trang chiếu và với brief

Không lệch nào cần sửa deck; các mục dưới là lựa chọn có chủ ý, chờ điều phối viên quyết.

1. **Tên chương.** Brief ghi "Tối ưu trơn và ràng buộc đẳng thức" nhưng yêu cầu giữ tên như thẻ trên `index.html`; thẻ và tiêu đề deck là "Tối ưu không ràng buộc và ràng buộc đẳng thức". Ghi chú dùng tên của thẻ.
2. **Ký hiệu độ giảm Newton.** Brief nêu $\lambda(x)$; deck dùng $\delta_N$ và $\delta$. Ghi chú theo deck.
3. **Hàm trên tia.** Deck dùng $\varphi(t)$ cho $f(x^0+td_G)$ và $\varphi(s)$ cho VD2; ghi chú lượt 2 dùng $h(t)$ cho hàm trên tia, cùng chữ với hạn chế lên đường thẳng ở Mục 6 (lượt 1 dùng $\phi(t)$, xem B3).
4. **Định nghĩa lồi mạnh.** Deck định nghĩa bằng bất đẳng thức bậc nhất; ghi chú dùng Định nghĩa 01.39 của Bài 01 và suy ra dạng bậc nhất ở Mệnh đề 04.25(a), để không có hai định nghĩa trong học phần.
5. **Tham số $\alpha=\tfrac12$.** Định nghĩa 04.10 lấy $\alpha\in(0,\tfrac12)$ như deck; Bổ đề 04.23 và Định lý 04.24 cho phép $\alpha=\tfrac12$ như trang hội tụ với quay lui của deck. Ghi chú nêu rõ ngoại lệ ở phần "Điều kiện áp dụng".
6. **Nội dung thêm so với deck.** Ví dụ 04.8 (ví dụ kinh điển $\gamma=10$ của B&V với tìm kiếm đường chính xác, dùng hình có sẵn `quadratic-zigzag.svg`); chứng minh đầy đủ của Định lý 04.34, Định lý 04.50 (deck nêu không chứng minh), Hệ quả 04.51, Mệnh đề 04.48; Mệnh đề 04.31(c) về bất biến affine (deck chỉ nhắc trong ghi chú diễn giả); Mệnh đề 04.55 viết thành mệnh đề từ trang tổng hợp.
7. **Hồi quy ridge có ràng buộc.** Trang ứng dụng cuối của deck kiểm số với $M=\operatorname{diag}(1,2)$, $y=0$, trùng VD3 và trùng dữ liệu bài 8 của `exercises.md`. Ví dụ 04.25 (lượt 1: 04.26) dùng dữ liệu khác ($M$ cỡ $3\times2$, $y=(1,2,0)$, $b=1$) để không giải sẵn bài 8(b).
8. **Bài 05.** Brief nhắc Adam; ghi chú Bài 05 hiện có không xét Adam (chỉ nhóm nhỏ, momentum, Nesterov, khởi tạo), nên kết chương chỉ dẫn các nội dung đó.
9. **Độ dài.** Lượt 1: 31 028 từ; lượt 2: 31 346 từ (xem mục D). Ở lượt 1, bản vượt trần 30 000 của brief khoảng 3,4%. Lý do: deck có 54 trang gồm 13 trang tự học có chứng minh (hội tụ giảm gradient, tốc độ Newton, tự điều chỉnh) mà ghi chú phải viết đầy đủ; ba tình huống áp dụng. Đã cắt hai bài tập, một ví dụ và nhiều đoạn nhận xét trong lượt tự kiểm (từ 32 066 xuống 31 028). Chờ điều phối viên quyết giữ hay cắt thêm.

## Trùng lặp với `exercises.md`

`exercises.md` dựng tám bài giao từ đúng các ví dụ xuyên suốt của deck, mà ghi chú bắt buộc phải bao trùm. Các bài sau bị giải sẵn một phần hoặc toàn bộ trong ghi chú, cùng loại với quyết định 2 của Bài 02b và Bài 03b:

| Bài giao | Chỗ trong ghi chú (số hiệu lượt 2) | Mức |
|---|---|---|
| Bài 1 (a), (b) | Ví dụ 04.4 ($d_G$, $g^Td_G=-820$), Ví dụ 04.6 (bảng Armijo $\alpha=\tfrac1{10}$, $\beta=\tfrac12$) | toàn bộ (a), (b); (c) được giải thích ở đoạn sau Định nghĩa 04.10 |
| Bài 2 | Mệnh đề 04.15 và chứng minh (bốn nhóm KKT, $\zeta>0$, ràng buộc hoạt động, $d=-W^{-1}g$); Ví dụ 04.9 ($W=\operatorname{diag}(3,7)$); đoạn kiểm bằng Cauchy–Schwarz | phần lớn |
| Bài 3 | Ví dụ 04.13, 04.14, 04.15 | toàn bộ |
| Bài 4 | Mệnh đề 04.29(a), (b), 04.31(a), Nhận xét 04.5 | toàn bộ |
| Bài 5 | Ví dụ 04.17, 04.18, 04.19 | toàn bộ |
| Bài 6 | Ví dụ 04.20, 04.21, 04.22; Mệnh đề 04.44(c) cho $\nu^+=(1-t)\nu+t\eta$ ở (d) | phần lớn; phép tính tại $t=\tfrac12$ của (d) không còn trong ghi chú sau khi cắt Ví dụ 04.23 cũ |
| Bài 7 | Ví dụ 04.23 cho (a); đoạn phản ví dụ sau Định nghĩa 04.47 và Nhận xét 04.54 cho (b); Ví dụ 04.24 và Nhận xét 04.54 cho (c) | toàn bộ |
| Bài 8 | Ví dụ 04.25 cho (a) (gradient, Hessian, $H\succ0$, hệ khối) | (a) toàn bộ; (b) không, vì dữ liệu khác |

Quyết định E1 của điều phối viên (lượt 1): chấp nhận theo tiền lệ quyết định 2 của Bài 02b/03b; hướng xử lý là đổi dữ liệu trong `exercises.md` ở một lượt khác. Trạng thái: chờ xử lý.

Bài tập trong ghi chú không trùng đề với tám bài giao: các bài dùng hàm, điểm đầu hoặc dữ liệu khác ($x_1^2+4x_2^2$; điểm $x^1$; VD2 từ $s^0=3$; mất mát logistic không chính quy hóa; VD3 từ $(8,6)$, $(4,2)$; bài ba biến; hàm chắn $-\log s-\log(1-s)$; bài tâm giải tích; ma trận khối với $H$ không xác định dương; giảm gradient không lồi; thang đo đặc trưng). Bài tập 04.3, 04.4, 04.7, 04.9 (số hiệu lượt 2) dùng dữ kiện của các câu hỏi trên trang kiểm tra của deck, không có trong `exercises.md`.

## Hình

- Lượt 2 dùng 19 SVG có sẵn của `img/lec-04/` (lượt 1: 20), mỗi hình có đoạn đọc hình trước hoặc sau. `self-concordance-equality.svg` được bỏ khỏi ghi chú ở lượt 2 vì trùng `self-concordance-ratio.svg`; tệp giữ nguyên.
- Không dùng `armijo-backtracking.svg` (số liệu $55-200t$ của bản cũ, không khớp VD1), `quadratic-local-model.svg` (hàm $s^4/4+s^2/2$ không xuất hiện trong chương), `quadratic-start.svg` (trùng `descent-directions.svg`), `newton-model.svg` (sơ đồ tổng quát trùng `phi-local-model.svg`), `self-concordant-curvature.svg` (dữ liệu $s^0=\tfrac12$ không dùng trong chương).
- Hình mới `deep-linear-saddle.svg` (SVG thuần, sinh bằng script Python trong scratchpad, đã xem ảnh render): đường mức của $\tfrac12(ab-1)^2$, tập cực tiểu $ab=1$, điểm yên ngựa, quỹ đạo giảm gradient từ $(1,-1)$ với các điểm tính đúng theo $a^+=a(1-\tfrac14(1+a^2))$, mũi tên hướng Newton tại $(0{,}2;\,0{,}2)$ tới $(-0{,}018;\,-0{,}018)$. Có `title`, `desc`, chú giải năm dòng; không raster.

## Tự kiểm `no-ai-slop` (eval.md)

| Nhóm kiểm | Kết quả | Ghi chú |
|---|---|---|
| Nguyên tắc biên tập | đạt | Mọi khẳng định có chứng minh, nguồn có số trang hoặc phép tính; số liệu tính lại được; động từ cụ thể ("giải hệ", "co theo hệ số", "loại điểm thử"). |
| Từ cần cắt | đạt | Quét các cụm "quan trọng", "đáng chú ý", "rõ ràng", "hiển nhiên", "điều này cho thấy", "nói cách khác", "tóm lại": đã thay ba chỗ ("mới quan trọng", "hiển nhiên", "không đáng kể"). Còn hai chữ "rất" mang nghĩa định lượng ("giảm rất ít", "hằng số rất bi quan" kèm số $375$). |
| Mẫu cần cắt | đạt | Không câu hỏi tu từ, không dấu chấm than, không câu kết kịch tính; gạch dài chỉ ở tiêu đề chương theo mẫu. Lượt 1 có 5 đoạn "So với … Cái giá là …" lặp khuôn; lượt 2 viết lại cả năm (B9), không còn đoạn mở bằng "So với". Lượt 2 cũng bỏ colon reveal "Ý chính của chứng minh:". |
| Đọc lại toàn bài | đạt theo tự kiểm | Văn phong học thuật ưu tiên hơn gợi ý giọng nói của kỹ năng, theo AGENTS.md. |

## Kiểm tra kỹ thuật đã chạy (lượt 3)

- Số liệu: 31 727 từ (`wc -w`), 3 365 dòng; 159 khối mở, 159 đóng, không lồng; năm bộ đếm liên tục (không đổi số hiệu); 458 tham chiếu `04.k` trỏ đúng khối, đúng loại; không chuỗi cấm; 20 hình; bảng ký hiệu 22 dòng. Đếm câu: một cảnh báo còn lại là mục danh sách (b) của Mệnh đề 04.44.
- Số liệu mới tính lại: $D(u)\ge0$ trên $[-\tfrac12,\tfrac12]$ (đạo hàm và $D(-\tfrac12)=0{,}225+0{,}5-\log2$); $v_W=(-1,6)^T/\sqrt{255}$ với $v_W^TWv_W=(3+252)/255=1$; phản ví dụ mới của Mệnh đề 04.55(d).
- `sync-local-materials.py` rồi `--check`: OK (18 tệp). `git diff --check`: sạch.
- Playwright Chromium, `file://`, 1600×900 và 390×844, mở mọi khối gập: không `pageerror`, không lỗi hay cảnh báo console; `.katex-error` = 0; 3 594 `.katex`; 159 `.material-block`; 20/20 hình; không tràn ngang; không dấu `$` thô. Lần chạy đầu sau khi chuyển sang `aligned` cho cảnh báo KaTeX về ký tự tiếng Việt trong `\text`; đã chuyển các căn cứ bằng chữ ra câu sau công thức và chạy lại sạch. Ảnh đã xem: `r3-narrow-vd25.png` (phần Diễn giải của Ví dụ 04.25 ở 390×844).

## Kiểm tra kỹ thuật đã chạy (lượt 2)

- Script cấu trúc: 159 khối mở, 159 đóng, không lồng; bộ đếm chung 04.1–04.55, Ví dụ 04.1–04.25, Bài tập 04.1–04.15, Tình huống 04.1–04.3, Thuật toán 04.1–04.4 liên tục; 447 tham chiếu `04.k` trỏ đúng khối, đúng loại; không chuỗi cấm; 20 hình đều tồn tại; bốn phần, $\square$, "Kiểm tra lại", `hint` rồi `solution` đạt. Đếm câu: không đoạn văn nào quá bốn câu; một cảnh báo còn lại là mục danh sách (b) của Mệnh đề 04.44.
- Số liệu mới tính lại bằng Python: $f(s)=s^4+\tfrac1{100}s^2$ tại $s=0{,}05$ cho tỷ số $\approx107{,}3$; tập mức dưới của VD2 $[0{,}25;\,2{,}587]$ ($\varphi(2{,}587)\approx1{,}6365$); chặn $f(x+td)-f(x)\ge0{,}0377t$ của Tình huống 04.3 (cực tiểu trên lưới $0{,}0389t$, ngưỡng tăng $0{,}0084t$); $\varphi(s)-\varphi(2s-s^2)-0{,}1(1-s)^2\ge0$ trên $[\tfrac12,\tfrac32]$; $\eta=\tfrac{13}6-\tfrac{19}{78}=\tfrac{25}{13}$ ở Tình huống 04.2.
- `sync-local-materials.py` rồi `--check`: OK (18 tệp). `git diff --check`: sạch.
- Playwright Chromium, `file://`, 1600×900 và 390×844, mở mọi khối gập: không `pageerror`, không lỗi console; `.katex-error` = 0; 3 539 `.katex`; 159 `.material-block`; 20/20 hình; không tràn ngang; không dấu `$` thô. Ảnh đã xem: `r2-prop55.png` (danh sách lồng của Mệnh đề 04.55 hiển thị đúng), `r2-th3.png` (chuỗi `aligned` của Tình huống 04.3).
- Sự cố trong lượt 2: một lần áp dụng sửa bằng script với khối thay thế rỗng đã chèn nhầm văn bản vào hai chỗ; phát hiện bằng `grep "@@@"`, sửa tay, kiểm lại bằng script cấu trúc và ảnh chụp.

## Kiểm tra kỹ thuật đã chạy (lượt 1)

- Script cấu trúc `struct_check.py` (scratchpad của phiên): 169 khối mở, 169 đóng, không lồng; năm bộ đếm liên tục; 446 tham chiếu `04.k` trỏ đúng khối, đúng loại; không chuỗi cấm; 21 hình đều tồn tại, `alt` đủ dài; không công thức trong heading; bốn phần, $\square$, "Kiểm tra lại", `hint` rồi `solution` đạt.
- Số liệu tính lại bằng Python thuần với `fractions.Fraction` (scratchpad `check1.py`–`check5.py`): VD1 (bảng Armijo với $\alpha=\tfrac1{10},\tfrac3{10},\tfrac12$ và $\beta=\tfrac12,\tfrac14$; năm điểm bước $\tfrac14$; $\tfrac{96}{49}$; $6(\tfrac{16}{49})^k$, $k=6$; $15{,}6$; $20{,}4$), VD2 (ba phép trừ $0{,}28125$, $0{,}37212$, $0{,}63629$; bước hai $\tfrac{63}{256}$, $\tfrac{175}{256}$; cận tại $s=\tfrac14$, $\tfrac32$; Bài tập 04.7, 04.12), VD3 (bốn hệ khối, $\psi$, ba điểm chưa khả thi, $t=\tfrac12$), Bài tập 04.2, 04.10, 04.15, Ví dụ 04.1 ($J'(0{,}2865)$), Ví dụ 04.26, Tình huống 04.1 (Newton 4 bước, giảm gradient 580 bước, $\kappa\approx241$), Tình huống 04.2 ($\tfrac{13}9$, $\tfrac{25}{13}$, $\tfrac1{13}$, $\tfrac1{2113}$, khởi đầu chưa khả thi), Tình huống 04.3 (quỹ đạo đường chéo, $f$ tại năm bước thử Newton).
- `python3 2627-1/scripts/sync-local-materials.py` rồi `--check`: "OK: material-local-data.js is up to date (18 file(s))". `git diff --check`: sạch; tệp SVG mới không có khoảng trắng cuối dòng.
- Playwright Chromium, `file://…/material-viewer.html?doc=materials/lec-04/lecture-note.md&deck=lecture-04-toi-uu-tron-va-rang-buoc-dang-thuc.html`, 1600×900 và 390×844, mở mọi khối gập: không `pageerror`, không lỗi hay cảnh báo console; `.katex-error` = 0; 3 538 phần tử `.katex`; 169 `.material-block`; 21/21 hình nạp đủ; không tràn ngang trang; không còn dấu `$` thô. Ảnh đã xem: `shot-wide-fig.png` (hình mới), `shot-narrow-thm.png`, `shot-wide-th3.png` trong `scratchpad/lec04/`.
- Hạn chế hiển thị quan sát được: ở 390×844, số hiệu `\tag{6.1}` của công thức hiển thị đè lên vế phải công thức trong Định lý 04.50; đây là cách KaTeX đặt `\tag` khi khung hẹp, cùng cơ chế với các công thức có `\tag` ở ghi chú Bài 03; không sửa viewer vì ngoài phạm vi.

## Điểm còn phân vân (chuyển điều phối viên và tác tử rà toán)

1. **Định lý 04.50, chứng minh.** Viết theo biến thể chuẩn hóa $v^THv=1$ và cực tiểu $\tau(1-\delta)-\log(1+\tau)$. Lượt 2 đã bỏ giả thiết đạt cực tiểu (A4); cần rà toán xác nhận lại Bước 5 với trường hợp $y=x$.
2. **Bổ đề 04.23 và Định lý 04.24.** Cho phép $\alpha=\tfrac12$ ngoài khoảng của Định nghĩa 04.10; cần xác nhận cách trình bày ngoại lệ.
3. **Hệ quả 04.51.** Giá trị $q(0{,}68)\approx0{,}0030$ tính bằng số; lập luận dùng hình dạng tăng rồi giảm của $q$.
4. **Định lý 04.35.** Hằng số chép từ B&V tr. 489–491 sau khi đổi $m,M,L$ thành $\mu,L,L_H$; cần đối chiếu lại dạng bất đẳng thức pha bậc hai.
5. **Nguồn chưa kiểm số trang.** Beck (2017) Định lý 10.21, Bach (2010) tr. 384–414 và các mục 3.1, 3.3, 3.4, 16.1, 16.2 của Nocedal và Wright (2006) được dẫn theo trí nhớ, không có PDF cục bộ.
6. **Nhận xét 04.40.** Câu "ma trận khối có đúng $p$ giá trị riêng âm" dẫn Nocedal và Wright mục 16.2, không chứng minh trong chương.
7. **Tình huống 04.2.** Bước khởi đầu chưa khả thi cho một trọng số tạm âm ($-0{,}192$); ghi chú giải thích bằng việc bài chỉ có đẳng thức. Cần xác nhận cách diễn giải này phù hợp với mục tiêu sư phạm.
8. **Trùng lặp với `exercises.md`.** Đã có quyết định E1: chấp nhận, chờ đổi dữ liệu `exercises.md`.
9. **Độ dài lượt 2.** 31 346 từ; xem mục D và danh sách ứng viên cắt thêm.
10. **Mệnh đề 04.55(d).** Phát biểu "không có hàm $\omega$ với $\omega(0)=0$ cho mọi bài" được chứng minh bằng họ $\tfrac\varepsilon2u^2$, $p=0$; cần rà toán xác nhận cách phát biểu đủ chính xác.


## Lượt sửa ví dụ tự chứa (2026-10-10)

**Tác tử.** Chỉnh sửa, loại `general-purpose`, Claude Opus 5.5 (`claude-opus-5-5`), effort high, theo brief của điều phối viên Fable 5.1. Bản kiểm kê đầu vào do tác tử rà soát chỉ đọc cùng mô hình lập. Căn cứ: `AGENTS.md`, mục "Ví dụ và bài tập tự chứa tại chỗ" (yêu cầu người dùng 2026-10-10). Mọi giá trị trong đoạn "Dữ kiện" được đối chiếu với khối nguồn trong cùng tệp trước khi chèn; không đổi số hiệu, không đổi kết quả, không sửa phần ngoài các khối được kiểm kê.

| Khối | Khối bị tham chiếu | Cách xử lý | Sai lệch so với đề xuất kiểm kê |
|---|---|---|---|
| Ví dụ 04.4 | VD1, Định nghĩa 04.8, (2.1) | Đoạn Dữ kiện | Không |
| Ví dụ 04.5 | VD1, Ví dụ 04.4 | Đoạn Dữ kiện | Không |
| Ví dụ 04.6 | VD1, Ví dụ 04.5 | Bổ sung đoạn Dữ kiện có sẵn | Không |
| Ví dụ 04.7 | VD1, Ví dụ 04.6 | Đoạn Dữ kiện | Không |
| Ví dụ 04.9 | VD1, Định nghĩa 04.14, Mệnh đề 04.15 | Bổ sung đoạn Dữ kiện có sẵn | Thêm Mệnh đề 04.9(c) |
| Bài tập 04.3 | VD1, Ví dụ 04.6, (2.1) | Đoạn Dữ kiện | Bỏ Mệnh đề 04.9(c) vì bài không dùng |
| Ví dụ 04.10 | VD1, Bổ đề 04.20 | Đoạn Dữ kiện | Không |
| Ví dụ 04.11 | VD1, Ví dụ 04.10, (2.4) | Đoạn Dữ kiện | Không |
| Ví dụ 04.12 | VD1, Ví dụ 04.5, Bổ đề 04.23, Định lý 04.24 | Đoạn Dữ kiện | Không |
| Bài tập 04.4 | VD1, Ví dụ 04.11, Nhận xét 04.13 | Đoạn Dữ kiện | Thêm công thức bước tối ưu của Nhận xét 04.13 |
| Ví dụ 04.13 | VD2 | Bổ sung đoạn Dữ kiện có sẵn | Không |
| Ví dụ 04.14 | VD2, Ví dụ 04.13, (3.1) | Đoạn Dữ kiện | Không |
| Ví dụ 04.15 | VD2, Ví dụ 04.14, 04.9 | Đoạn Dữ kiện | Không |
| Ví dụ 04.16 | Định lý 04.34, (3.2) | Đoạn Dữ kiện và chèn vào Kiểm tra lại | Kiểm kê chỉ đề xuất chèn vào Kiểm tra lại; thêm đoạn Dữ kiện (VD2, Định nghĩa 04.33) vì khối không nêu $\varphi$ và $s^*$ |
| Bài tập 04.5 | VD2, Thuật toán 04.2 | Đoạn Dữ kiện | Không |
| Bài tập 04.6 | Ví dụ 04.15 | Chèn vào câu cuối lời giải | Không |
| Ví dụ 04.17 | VD3 | Đoạn Dữ kiện | Thêm (1.2) |
| Ví dụ 04.18 | VD3, Ví dụ 04.17 | Đoạn Dữ kiện | Thêm (4.1) |
| Ví dụ 04.19 | VD3, Ví dụ 04.18 | Đoạn Dữ kiện | Thêm (4.2) |
| Bài tập 04.7 | VD3, Ví dụ 04.18, (4.1), (4.2) | Đoạn Dữ kiện | Không |
| Ví dụ 04.20 | VD3, Định nghĩa 04.43 | Bổ sung đoạn Dữ kiện có sẵn | Không |
| Ví dụ 04.21 | VD3, Ví dụ 04.20 | Đoạn Dữ kiện | Thêm (5.1) |
| Ví dụ 04.22 | VD3 | Thay đoạn Dữ kiện có sẵn | Thêm (5.1) và Mệnh đề 04.44(c), (d), dùng ở Kiểm tra lại |
| Bài tập 04.9 | VD3, (5.1), Thuật toán 04.4 | Đoạn Dữ kiện | Thêm quy tắc nhận bước của Thuật toán 04.4, dùng ở câu (b) |
| Ví dụ 04.23 | VD2, Định nghĩa 04.47 | Đoạn Dữ kiện | Không |
| Ví dụ 04.24 | VD2, Ví dụ 04.15, (6.1) | Đoạn Dữ kiện | Không |
| Bài tập 04.11 (vii) | VD2 | Chèn vào lời giải | Không |
| Bài tập 04.14 | Tình huống 04.3, VD1, Bổ đề 04.20 | Đoạn Dữ kiện | Không |
| Bài tập 04.1 (phụ) | (1.1), (1.2) | Viết lại tại chỗ dẫn | Không |
| Bài tập 04.8, 04.13 (phụ) | (4.1), (4.2), Định lý 04.39 | Viết lại tại chỗ dẫn | Không |
| Bài tập 04.10 (phụ) | (6.1), Mệnh đề 04.48 | Viết lại tại chỗ dẫn | Chép thêm nội dung Mệnh đề 04.48 |
| Bài tập 04.12 (phụ) | (1.2), (4.1), Hệ quả 04.52 | Viết lại tại chỗ dẫn | Không |

Ký hiệu ma trận đơn vị giữ $I$ như tệp. Tổng: 28 khối bảng chính, 5 khối bảng phụ; không khối nào bỏ qua; không phát hiện giá trị sai trong đề xuất kiểm kê.

**Kiểm tra kỹ thuật.** Playwright Chromium, `material-viewer.html?doc=materials/lec-04/lecture-note.md&deck=lecture-04-toi-uu-tron-va-rang-buoc-dang-thuc.html`, ở 1600×900 và 390×844: 3905 phần tử `.katex`, 0 `.katex-error`, 0 phần tử KaTeX tô đỏ (`rgb(204, 0, 0)`), 0 lỗi trang (lỗi CSP duy nhất trên console đến từ đoạn script do `reloadserver` chèn, không thuộc trang), không tràn ngang trang; số khối `:::` không đổi (159). Quét lệnh LaTeX trong mọi dòng mới: chỉ dùng lệnh chuẩn, không có `\text{}`. `python3 2627-1/scripts/sync-local-materials.py` rồi `--check`: OK; `git diff --check`: sạch.

**Số từ.** Trước 31727, sau 32707 (`wc -w`).

Quyết định của điều phối viên:


### Rà soát độc lập và lượt sửa bổ sung (2026-10-10)

**Tác tử rà soát.** Chỉ đọc, loại `general-purpose`, Claude Opus 5.5 (`claude-opus-5-5`), effort high; đối chiếu 146 đoạn của Bài 01–05 với khối nguồn: mọi số liệu khớp. Điều phối viên Fable 5.1 xác nhận các phát hiện dưới đây và quyết định: yêu cầu sửa nhỏ rồi chấp nhận. Tác tử chỉnh sửa (như trên) thực hiện các sửa đổi.

| Mức độ | Khối | Vấn đề | Đề xuất sửa | Trạng thái |
|---|---|---|---|---|
| trung bình | Bài tập 04.2(c) | (2.2) chỉ dẫn số | Chép $f(x+td)\le f(x)+\alpha t\,g^Td$ | đã sửa |
| nhẹ | Ví dụ 04.21 | Bước Lập hệ lặp giá trị đã có trong Dữ kiện | Rút thành "Với các giá trị trên, hệ (5.1) là" | đã sửa |
| nhẹ | Bài tập 04.10(a) | Mệnh đề 04.48 chép với $f$, trùng hàm $f$ của đề | Dùng $h$, $h_1$, $h_2$ | đã sửa |

**Kiểm tra lại sau lượt sửa.** Playwright ở 1600×900 và 390×844: 0 `.katex-error`, 0 phần tử KaTeX tô đỏ, 0 lỗi trang, không tràn ngang trang, số khối không đổi (159). Quét lệnh LaTeX trên các dòng mới: chỉ lệnh chuẩn. Sync và `--check`: OK; `git diff --check`: sạch. Số từ cuối: 32708.

Quyết định của điều phối viên: chấp nhận (Fable 5.1, 2026-10-10). Căn cứ: tác tử rà soát chỉ đọc đối chiếu 146 đoạn Dữ kiện của năm bài, số liệu khớp; hai phát biểu chép thiếu điều kiện (Mệnh đề 02.11(c), Slater dạng yếu) đã sửa và điều phối viên kiểm lại trong tệp; Playwright 1600×900 và 390×844: 0 lỗi trang, 0 `.katex-error`, 0 chữ đỏ KaTeX, số khối không đổi; `sync --check` và `git diff --check` sạch.
