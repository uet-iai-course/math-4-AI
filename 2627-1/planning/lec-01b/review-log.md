# Nhật ký rà soát Bài 01b: ghi chú bài giảng Bài 01 viết lại theo tiêu chuẩn giáo trình

Tệp được rà: `materials/lec-01b/lecture-note.md`. Bản cũ `materials/lec-01/lecture-note.md`, bộ trang chiếu Bài 01 và `materials/lec-01/exercises.md` không bị sửa.

## Tác tử

| Ngày | Vai trò | Loại tác tử | Mô hình | Effort | Phạm vi ghi | Ghi chú |
|---|---|---|---|---|---|---|
| 2026-10-09 | Tác tử soạn: viết lại toàn bộ ghi chú Bài 01 thành chương giáo trình tự chứa | do điều phối viên tạo; loại tác tử ghi theo lời gọi công cụ của điều phối viên | Opus 5.5 (`claude-opus-5-5`) | high (theo brief) | `materials/lec-01b/lecture-note.md`, `planning/lec-01b/review-log.md`, `material-local-data.js` qua script sync | Không commit. Kỹ năng `no-ai-slop` dùng ở chế độ Edit. |
| 2026-10-09 | Tác tử rà toán (chỉ đọc): tính lại số liệu, kiểm chứng minh và nguồn | general-purpose (theo điều phối viên) | Opus 5.5 | high | không ghi | Báo cáo chuyển qua điều phối viên. |
| 2026-10-09 | Tác tử rà mạch truyện (chỉ đọc): tám bước, móc nối, đoạn kết mục, thuật ngữ, `no-ai-slop` | general-purpose (theo điều phối viên) | Opus 5.5 | high | không ghi | Báo cáo chuyển qua điều phối viên. |
| 2026-10-09 | Điều phối viên: duyệt bản lượt 1 | phiên chính | Fable 5.1 | medium | không ghi | Quyết định: **yêu cầu sửa** (lượt 1), kèm danh sách A1–D22 và quyết định cắt về phạm vi outline. |
| 2026-10-09 | Tác tử chỉnh sửa: thực hiện danh sách sửa lượt 1 | general-purpose, cùng phiên với tác tử soạn (SendMessage) | Opus 5.5 | high | như tác tử soạn | Không commit. `no-ai-slop` chế độ Edit. |

Quyết định của điều phối viên với bản lượt 1: yêu cầu sửa. Quyết định với bản sau chỉnh sửa (lượt 2): chưa có; điều phối viên ghi vào mục này sau khi rà. Loại tác tử của các vai rà soát được ghi theo thông báo của điều phối viên; bằng chứng là lời gọi công cụ của điều phối viên.

## Nguồn đã đọc

`AGENTS.md` (mục "Ngôn ngữ và giọng văn" và toàn bộ "Tiêu chuẩn giáo trình cho ghi chú bài giảng"), `materials/_templates/lecture-note.md`, `materials/README.md` mục "Khối nội dung", `~/.claude/skills/no-ai-slop/SKILL.md` và `eval.md`, `planning/lec-01/outline.md`, `planning/lec-01/storyboard.md`, bộ trang chiếu `lecture-01-gioi-thieu-toi-uu-tap-loi-ham-loi.html` (41 trang, gồm ghi chú diễn giả), `materials/lec-01/lecture-note.md`, `materials/lec-01/exercises.md`, các mục liên quan của `materials/lec-00/lecture-note.md`, tiêu đề và mục lục ghi chú Bài 02 đến Bài 07 để dẫn bài sau.

## Tự kiểm theo bảng kiểm (lượt 1, trước chỉnh sửa)

Số hiệu trong mục này theo bản lượt 1; bản lượt 2 đã đánh số lại (xem mục "Tự kiểm lượt 2").

Bảng kiểm lấy từ mục "Kiểm định ghi chú bài giảng" của `AGENTS.md`. Cột "Cách kiểm" ghi rõ kiểm bằng script hay tự đọc.

| Mục bảng kiểm | Kết quả | Cách kiểm và bằng chứng |
|---|---|---|
| Mỗi mục tiêu học tập có ít nhất một định lý hoặc ví dụ và một bài tập | Đạt | Bảng ánh xạ ở đầu mục "Bài tập củng cố": MT1 (Định nghĩa 01.11, Ví dụ 01.9; Bài tập 01.5, 01.14, 01.21), MT2 (Mệnh đề 01.2, 01.6, Ví dụ 01.1–01.7; Bài tập 01.1–01.4, 01.16, 01.19), MT3 (Mệnh đề 01.18, 01.19, Định lý 01.24, 01.28, 01.29; Bài tập 01.6–01.10, 01.14, 01.17, 01.18), MT4 (Định lý 01.32, 01.34, 01.35, 01.37; Bài tập 01.11–01.13, 01.15, 01.17, 01.18), MT5 (Mệnh đề 01.43, ba tình huống; Bài tập 01.13, 01.19–01.21). Tự đọc. |
| Mỗi khái niệm trọng tâm của `storyboard.md` đi đủ tám bước | Đạt, có ghi chú | Năm cụm của bản đồ hành trình. Điều khiển: nhu cầu 2 mở mục, trực giác 2.1, Định nghĩa 01.1, Mệnh đề 01.2 và chứng minh, Ví dụ 01.1–01.2, Nhận xét 01.3, Bài tập 01.1. Hồi quy tuyến tính: 3 mở mục, 3.1, Định nghĩa 01.4, Mệnh đề 01.5–01.6 và chứng minh, Ví dụ 01.3–01.5, Nhận xét 01.7, Bài tập 01.2–01.3. Hồi quy logistic: 4 mở mục và 4.1, 4.2, Định nghĩa 01.8, Mệnh đề 01.9 và chứng minh, Ví dụ 01.6–01.7, Nhận xét 01.10, Bài tập 01.4. Tập lồi: 6 mở mục, 6.1, Định nghĩa 01.15–01.16, Mệnh đề 01.17–01.19 và chứng minh, Ví dụ 01.10–01.11, Nhận xét 01.20, Bài tập 01.6–01.7. Hàm lồi và chứng nhận: 7 mở mục, 7.1, Định nghĩa 01.21–01.22, các kết quả 01.23–01.31 và chứng minh, Ví dụ 01.12–01.16, Nhận xét 01.30, Bài tập 01.8–01.10; tiếp ở Mục 8 với Định lý 01.32–01.39, Ví dụ 01.17–01.18, Nhận xét 01.40, Bài tập 01.11–01.12. Ghi chú: trong Ví dụ 01.12 ví dụ có số liệu đứng sau Định nghĩa 01.21; ví dụ cụ thể đứng trước định nghĩa là dây cung của $x^3-3x$ ở 7.1. Tự đọc. |
| Mỗi ký hiệu dùng trong chương có trong bảng ký hiệu | Đạt, có thể còn sót ký hiệu phụ | Bảng 73 hàng; đã bổ sung các ký hiệu phụ ($D$, $k,k'$, $r$, $T_{x,v}$, $K$, $W$, $\varepsilon,\delta$, $P_1,P_2,\beta_0$…). Ký hiệu chỉ dùng trong một bài tập được gom vào hàng "nêu tại chỗ". Tác tử rà nên dò lại. Tự đọc. |
| Mỗi định lý có đủ bốn phần và có chứng minh hoặc nguồn có số trang | Đạt, có ghi chú | Script: mọi khối `theorem`, `proposition`, `lemma`, `corollary` (25 khối) có đủ "Giả thiết", "Kết luận", "Điều kiện áp dụng", "Phạm vi"; 24 khối `proof` đều kết thúc bằng $\square$. Định lý 01.35 (Weierstrass) không chứng minh, dẫn Rudin (1976) Định lý 2.41 và 4.16 kèm ý tưởng chứng minh; chiều cần của (7.3) dẫn Boyd và Vandenberghe (2004) mục 4.2.3. Nguồn dẫn theo số định lý hoặc số mục, chưa ghi số trang vì không có bản sách trong `sources/` để đối chiếu. |
| Mỗi ví dụ có kết quả số và dòng kiểm tra lại; số liệu được tính lại độc lập | Đạt phần tác tử soạn | Script: 18 khối `example` đều có "Kiểm tra lại". Các giá trị logistic, nghiệm chính quy hóa, nghiệm Bài tập 01.4(b) và Hessian của Tình huống 01.3 được tính lại bằng Python trong phiên soạn. Tính lại độc lập là việc của tác tử rà toán. |
| Mỗi bài tập có `hint` và `solution` đầy đủ | Đạt | Script: 21 khối `exercise`, mỗi khối có `hint` rồi `solution` ngay sau. |
| Không có tham chiếu "xem trang chiếu", không câu mảnh, không bước suy diễn bị bỏ | Đạt | Grep không còn "trang chiếu", "slide", "dễ thấy", "suy ra ngay", "hiển nhiên", "...", câu hỏi tu từ (không có dấu "?"). Các bước "hiển nhiên" trong chứng minh Bổ đề 01.26, Định lý 01.28 và Định lý 01.31 đã thay bằng lý do cụ thể. |
| Số hiệu liên tục, tham chiếu chéo đúng, khối không lồng nhau, render đúng ở màn rộng và hẹp | Đạt | Script kiểm số hiệu: bộ đếm chung 01.1–01.43 liên tục; Ví dụ 01.1–01.18, Bài tập 01.1–01.21, Tình huống 01.1–01.3, Thuật toán 01.1 liên tục; mọi tham chiếu "Định nghĩa/Định lý/Mệnh đề/Bổ đề/Hệ quả/Nhận xét/Ví dụ/Bài tập 01.k" trỏ tới đúng loại khối. Đã sửa hai lỗi phát hiện bằng script: thứ tự Nhận xét 01.30 và Định lý 01.31 (Jensen), và một tham chiếu tới ví dụ không tồn tại. Viewer: 152 khối Markdown, 152 `.material-block` trong DOM. |
| Mỗi định nghĩa có đoạn quan hệ với khái niệm đã có; mỗi định lý có đoạn quan hệ với định lý trước và đoạn "Trong học máy"; mỗi mục có chuỗi suy luận dẫn số hiệu; mở và kết chương móc nối bài trước và bài sau | Đạt, có ghi chú | Mở chương nêu Bài 00 cung cấp gradient, Hessian, dạng toàn phương, phương trình chuẩn và giới hạn "gradient bằng không chỉ là điều kiện cần". Kết chương ("Giới hạn còn lại và bài sau") nêu Bài 02, Bài 03, Bài 04. Đoạn "Trong học máy" có sau Mệnh đề 01.2, 01.6, 01.9, Định nghĩa 01.11, Mệnh đề 01.19, 01.23, Hệ quả 01.25, Định lý 01.28, 01.29, 01.31, 01.32–01.33, 01.34, Hệ quả 01.39. Ghi chú: Bài 00 không có số hiệu môi trường, nên kết quả của Bài 00 được dẫn theo tên mục và phát biểu lại. |
| Mỗi mục có đoạn kết nêu kết quả, thiếu hụt và cách mục sau giải quyết; mỗi công thức có câu dẫn và câu đọc; mỗi ký hiệu được gọi tên tại lần đầu | Đạt theo tự đọc | Mục 1–9 đều có đoạn "Chuỗi suy luận của mục" và đoạn kết; đầu mục sau nhắc lại thiếu hụt. Một số công thức trong chứng minh được bao bởi câu nêu căn cứ thay vì câu đọc riêng. Tác tử rà mạch truyện nên kiểm tra lại. |
| Nội dung, ký hiệu, giả thiết nhất quán với bộ trang chiếu; chỗ lệch được ghi | Có chỗ lệch có chủ ý, đã ghi dưới đây | Bộ trang chiếu không bị sửa theo brief. |

### Chỗ lệch có chủ ý so với bộ trang chiếu và outline

1. Phạm vi mở rộng theo brief: bao lồi, tập trên đồ thị, tập mức dưới, Jensen, hàm bức, lồi mạnh và định lý Weierstrass có phát biểu và chứng minh hoặc nguồn. `outline.md` hiện ghi không đưa epigraph, tập mức, Jensen vào tuyến chính của bộ trang chiếu; ghi chú này là bản đầy đủ nên đưa vào.
2. Cấu trúc: bảy mạch của bộ trang chiếu ứng với mục "Vị trí của bài…", "Mục tiêu học tập" và Mục 1 (mạch 1), Mục 2, 3, 4 (mạch 2, 3, 4), Mục 5 (mạch 5), Mục 6, 7, 8 (mạch 6, tách ba vì dài), Mục 9 cùng phần tình huống (mạch 7).
3. Ký hiệu: số ràng buộc là $k,k'$ thay vì $m$; ma trận đơn vị là $I_d$; tập mức dưới là $S_\alpha(f)$ (hình vẽ dùng $L_\alpha$, đã ghi trong đoạn đọc hình); diện tích vết và diện tích quả viết $A_{\mathrm{spot}}$, $A_{\mathrm{fruit}}$ để tránh chữ có dấu trong công thức.
4. Nội dung mới không có trên bộ trang chiếu: chứng minh Mệnh đề 01.2 bằng bù bình phương; Ví dụ 01.7 (dữ liệu không tách được, $w^*=\log2$); Ví dụ 01.8 ($x^3-3x$ trên $[-3,3]$); Hệ quả 01.25 (điều kiện đủ (7.3)) dùng để chứng nhận nghiệm biên; Tình huống 01.2 với số liệu hai đèn, ba vùng; Tình huống 01.3 (mạng một nơ-ron $\tanh$).

### Kiểm tra `no-ai-slop` (chế độ Edit, tự đối chiếu `eval.md`)

Phạm vi: toàn bộ văn xuôi của tệp mới. Đã loại câu dẫn rỗng, cụm "rất", "đáng chú ý", "chính là" không cần thiết, một cặp tương phản "không phải là … : …", và các lời dẫn tiến trình. Gạch ngang dài chỉ còn ở tiêu đề cấp một theo quy ước tên tệp. Các nhãn "Trong học máy", "Kiểm tra lại", "Giả thiết", "Kết luận" được giữ vì có chức năng học tập. Nhịp lặp của các đoạn "Chuỗi suy luận của mục" và đoạn kết mục là cấu trúc bắt buộc của tiêu chuẩn, không phải nhịp khuôn mẫu. Không dùng điểm từ bộ phát hiện AI.

### Kiểm tra kỹ thuật đã chạy

- `python3 2627-1/scripts/sync-local-materials.py` rồi `--check`: OK (19 tệp); diff của `material-local-data.js` chỉ thêm khóa `materials/lec-01b/lecture-note.md`.
- `git diff --check`: không lỗi; tệp mới không có khoảng trắng cuối dòng.
- Playwright Chromium, `material-viewer.html?doc=materials/lec-01b/lecture-note.md`, 1600×900 và 390×844: không `pageerror`; `.katex-error` = 0; không cảnh báo KaTeX; `scrollWidth` của trang ≤ `clientWidth` (1585/1600 và 375/390); 24/24 hình nạp được; 152 khối trong Markdown, 152 `.material-block` trong DOM. Thông báo console duy nhất là lỗi CSP chặn script nội dòng do máy chủ tải lại chèn vào; lỗi này cũng xuất hiện với `lec-05c` nên không do tệp mới. Ảnh chụp ở thư mục scratchpad của phiên, không nằm trong kho.

### Độ dài

`wc -w` cho khoảng 33 500 từ (âm tiết), trong đó khoảng 2 000 từ là văn bản thay thế của 24 hình và khoảng 1 100 từ là bảng ký hiệu. Mức này vượt mục tiêu 10 000–16 000 từ của brief và vượt khoảng thường gặp 8 000–20 000 của `AGENTS.md`. Nguyên nhân: phạm vi brief gồm khoảng mười khái niệm trọng tâm, mỗi khái niệm đi đủ tám bước với chứng minh đầy đủ; ba tình huống giải trọn vẹn; 21 bài tập có lời giải; tiêu chuẩn yêu cầu dài hơn ghi chú diễn giả (phần chữ của bộ trang chiếu kể cả ghi chú khoảng 13 300 từ theo cùng cách đếm). Phương án rút gọn chờ điều phối viên quyết định được nêu trong báo cáo bàn giao.

## Hình thiếu hoặc hạn chế

Ghi chú lượt 2: Tình huống 01.2 chiếu sáng đã được thay bằng tình huống trọng số trộn (cũng chưa có hình riêng, mô tả bằng ma trận $P$ và số liệu); các hình `epigraph-levelset-indicator.svg` và `basic-convex-set-library.svg` nêu dưới đây đã bị bỏ.

- Lượt 1 dùng lại đủ 24 SVG trong `img/lec-01/`; lượt 2 còn 16 SVG sau quyết định cắt C. Không tạo hình mới.
- Không có hình cho: Ví dụ 01.8 ($x^3-3x$ trên $[-3,3]$; hình `local-versus-global-minimum.svg` dùng một hàm khác trên $[-2;0{,}5]$, đoạn đọc hình nói rõ điều này), Ví dụ 01.7 (logistic ba mẫu có nghiệm), Tình huống 01.2 với số liệu hai đèn ba vùng (hình chiếu sáng vẽ ba đèn bốn vùng, đã ghi trong đoạn đọc hình), Tình huống 01.3 (mặt mất mát của mạng $\tanh$ với điểm yên ngựa), Ví dụ 01.18 (đường thẳng nghiệm và nghiệm chính quy hóa). Các nội dung này được mô tả bằng lời và số liệu.
- Một số hình dùng ký hiệu khác chương: `optimization-model-anatomy.svg` ghi số chiều là $n$; `first-second-order-convexity.svg` dùng $d$ cho vector hướng; `epigraph-levelset-indicator.svg` ghi $L_\alpha$ và $t$; `basic-convex-set-library.svg` ghi hằng số nửa không gian là $b$. Mỗi chỗ lệch được nêu trong đoạn đọc hình.
- Trên màn hẹp, hình giữ độ rộng 900 px và cuộn ngang trong đoạn chứa nó theo quy tắc sẵn có của `material-viewer.css`; một số công thức khối dài và bảng cũng cuộn ngang trong khung riêng. Trang không tràn ngang.

## Báo cáo rà soát lượt 1 và quyết định

Các phát hiện dưới đây được ghi theo danh sách điều phối viên chuyển lại ngày 2026-10-09 (mục A–D trong thông báo "yêu cầu sửa"). Mục A7 và A1–A6 thuộc báo cáo rà toán; mục B8–B16 thuộc báo cáo rà mạch truyện. Vị trí ghi theo số hiệu của bản lượt 1; cột cuối nêu vị trí tương ứng trong bản lượt 2. Không phát hiện nào bị xóa.

### Báo cáo rà toán

| mức độ | vị trí (lượt 1) | vấn đề | quyết định | trạng thái |
|---|---|---|---|---|
| nghiêm trọng | "Trong học máy" sau Định lý 01.34 | Khẳng định "lồi chặt thì mọi lần huấn luyện hội tụ về cùng tham số" bỏ qua sự tồn tại; Ví dụ 01.6 là phản ví dụ | chấp nhận | đã sửa: đoạn sau Định lý 01.35 nêu "khi lồi chặt và có nghiệm", tồn tại dẫn Định lý 01.38, Hệ quả 01.41 |
| nghiêm trọng | Tình huống 01.1 "Xác minh giả thiết"; lời giải Bài tập 01.19(a) | Hệ quả 01.25 bị dùng theo chiều cần | chấp nhận | đã sửa: chiều cần dẫn điều kiện bậc nhất của Bài 00 (phát biểu lại); Bài tập 01.19 dùng ma trận xác định dương, Hệ quả 01.27 và tính duy nhất |
| trung bình | Ví dụ 01.13 | Thiếu ca logistic; (b) chưa dẫn nơi chứng minh $J$ lồi | chấp nhận | đã sửa: thêm (c) với Ví dụ 01.7; (b) dẫn Ví dụ 01.13(c) |
| trung bình | Mệnh đề 01.23, Hệ quả 01.33, Định lý 01.34, Định lý 01.37, Mệnh đề 01.17 | "Điều kiện áp dụng: Như giả thiết" không có nội dung | chấp nhận | đã sửa ở Mệnh đề 01.25, Hệ quả 01.34, Định lý 01.35, Định lý 01.38; Mệnh đề 01.17 bị cắt |
| trung bình | nhiều chỗ | Tham chiếu tiến tới nội dung không có trong kho (bao nón, elip ở Bài 02; SVM ở Bài 03; gradient có chiếu ở Bài 05, 05b; "tới điểm thỏa (7.3)") | chấp nhận | đã sửa: bỏ hoặc trỏ tới Boyd và Vandenberghe mục 2.2, 8.6.1; Bài 05b "tới điểm có $\nabla f=0$" |
| trung bình | sau Mệnh đề 01.9 và sau Ví dụ 01.7 | Hai giải thích nhân quả lệch nhau về Ví dụ 01.6 | chấp nhận | đã sửa: $\ell\to0$ cùng dữ liệu tách được là điều kiện để mất mát giảm mãi; độ cong tắt dần giải thích vì sao lồi chặt không ngăn được (Nhận xét 01.43) |
| nhẹ | "Trong học máy" sau Ví dụ 01.13 | "Gradient nhỏ có ý nghĩa toàn cục" | chấp nhận | đã sửa: chỉ gradient bằng không; gradient nhỏ cần lồi mạnh |
| nhẹ | "Trong học máy" sau Hệ quả 01.39 | "không làm mất mát lồi" | chấp nhận | đã sửa: "nói chung không làm mất mát trở thành lồi" |
| nhẹ | Tình huống 01.3 | $\partial^2F/\partial\alpha\partial\beta$ thiếu một hạng | chấp nhận | đã sửa: viết đủ hai hạng rồi thế $(0,0)$ |
| nhẹ | Tình huống 01.2 (chiếu sáng) | Lý do $p_{\max}\ge1$ | chấp nhận | không còn áp dụng: tình huống được thay (quyết định C19) |
| nhẹ | lời giải Bài tập 01.2(b) | Quy tâm với nhiều đặc trưng chưa đủ để $X^TX$ chéo | chấp nhận | đã sửa |
| nhẹ | lời giải Bài tập 01.12(a) | Bất đẳng thức tầm thường | chấp nhận | đã sửa |
| nhẹ | Nhận xét 01.30 | Thiếu phép thử vi phạm (7.1) của $(x^2-1)^2$ | chấp nhận | đã sửa (Nhận xét 01.32: $f(0)=1>0$) |
| nhẹ | tiêu đề Ví dụ 01.17 | Tiêu đề không khớp nội dung | chấp nhận | không còn áp dụng: ví dụ gộp vào chứng minh Mệnh đề 01.46 |
| nhẹ | trước Hệ quả 01.33 | Thiếu câu dẫn nêu đây là hệ quả của Mệnh đề 01.23(b) | chấp nhận | đã sửa |
| nhẹ | sau Định nghĩa 01.36; đọc hình đầu Mục 8 | Ký hiệu $w^*$ và $\ker X$ không khớp Ví dụ 01.5 ($X'$, $w'$) | chấp nhận | đã sửa |
| nhẹ | Thuật toán 01.1 | Bước 7 thiếu "khả vi, $C=\mathbb R^d$"; điều kiện dừng mâu thuẫn | chấp nhận | đã sửa |
| nhẹ | lời giải Bài tập 01.13(a) | Tính đóng chưa có lý do | chấp nhận | đã sửa: giao các tập đóng |
| nhẹ | "Trong học máy" sau Mệnh đề 01.9 | Thiếu "với biên âm lớn" | chấp nhận | đã sửa |
| nhẹ | Hệ quả 01.33 | Thiếu trường hợp $p^*=+\infty$ | chấp nhận | đã sửa |
| nhẹ | Tình huống 01.3 | "nguồn gốc của tính không lồi" quá mạnh | chấp nhận | đã sửa: "một nguồn" |
| nhẹ | Mục 1 | "cận dưới" thay vì "cận dưới đúng" | chấp nhận | đã sửa |
| nhẹ | Nhận xét 01.3 | Điều kiện tại biên cần nói rõ là cần, đủ khi $q$ lồi | chấp nhận | đã sửa |
| nhẹ | tài liệu tham khảo | Nguồn MIT lec03 là trang 3-2 đến 3-15 | chấp nhận | đã sửa |
| nhẹ | chứng minh Mệnh đề 01.6, bước 2 | Dùng $\mathcal R(M)=\ker(M^T)^\perp$ mà chưa nêu | chấp nhận | đã sửa; thêm vào Kiến thức tiên quyết |
| nhẹ | nguồn Rudin, Boyd và Vandenberghe | Thiếu số trang | chấp nhận | đã thêm: Rudin bản 3, Định lý 2.41 trang 40, Định lý 4.16 trang 89; Boyd và Vandenberghe 4.2.3 trang 139, 9.1.2 trang 459 (3.1.8 trang 77 không còn dùng). Số trang theo tác tử rà toán, độ tin cậy trung bình, chưa đối chiếu bản in |
| trung bình | bộ trang chiếu, trang L01B | Câu "Mỗi hệ số $w_j$ biểu diễn mức ảnh hưởng của cột đặc trưng $j$ trong mô hình" diễn giải hệ số như mức ảnh hưởng mà không kèm điều kiện thang đo (ghi chú nêu điều kiện ở Nhận xét 01.7) | ghi nhận | chờ sửa deck |
| nhẹ | bộ trang chiếu, trang F03 | Dùng $[a,b]$, $l\le x\le u$ và $a^Tx\le b$; chữ $u$ trùng tác động điều khiển, $b$ trùng hệ số chặn (ghi chú dùng $\alpha_j,\beta_j$ và $\beta$) | ghi nhận | chờ sửa deck |
| nhẹ | bộ trang chiếu, trang H06 | Viết mất mát logistic là $\ell(s)$ thay vì $\ell(m)$ như Định nghĩa 01.8 | ghi nhận | chờ sửa deck |
| nhẹ | bộ trang chiếu, trang K03 | Ký hiệu $d_i=\ell''(m_i)$ trùng với số chiều $d$ | ghi nhận | chờ sửa deck |
| nhẹ | Ví dụ 01.6, Mệnh đề 01.43(b) | Trùng lời giải với Bài 7–8 của tệp bài tập Bài 01 | giữ, có lý do | giữ vì là ca xuyên suốt của bộ trang chiếu; sẽ cân nhắc đổi dữ liệu trong tệp bài tập sau |

### Báo cáo rà mạch truyện

| mức độ | vị trí (lượt 1) | vấn đề | quyết định | trạng thái |
|---|---|---|---|---|
| nghiêm trọng (điều phối viên nâng mức) | Mục 7.4 | Trực giác và ví dụ tính tay chưa đứng trước Định lý 01.24; thiếu bài tập ngay sau Mục 7.4–7.5 | chấp nhận | đã sửa: trực giác tiếp tuyến và phép tính tay với $q$ tại $u=1$ trước Định lý 01.26; thêm Bài tập 01.10 |
| nghiêm trọng (điều phối viên nâng mức) | Mục 5.2 | Hai khẳng định về loại cực tiểu nằm trong văn xuôi; thiếu nhận xét về nhầm lẫn và bài tập | chấp nhận | đã sửa: Mệnh đề 01.14, Nhận xét 01.15, Bài tập 01.5 |
| trung bình | Ví dụ 01.12(d), Mục 7.1 | Phản ví dụ dùng $x^3$ thay vì dây cung đã dựng; thiếu dây cung thỏa trên $q$ | chấp nhận | đã sửa: Ví dụ 01.11(d) dùng $x^3-3x$; Mục 7.1 thêm dây cung của $q$ |
| trung bình | Mục 7.6; Định lý 01.28; Mệnh đề 01.23; Hệ quả 01.39; Định lý 01.35, 01.37 | Thiếu câu trực giác, câu "cần gì trước", đoạn "mạnh hay yếu hơn", đoạn "Trong học máy" | chấp nhận | đã sửa |
| trung bình | chính quy hóa; tham chiếu "nhận xét sau…"; định nghĩa trong văn xuôi | Chính quy hóa chưa được định nghĩa ở lần dùng đầu; $L_\mu$ không có khối định nghĩa; hai tham chiếu tới đoạn văn không số hiệu; cận dưới đúng và dãy tối ưu hóa nằm trong nhận xét | chấp nhận | đã sửa: Định nghĩa 01.42, Nhận xét 01.23, Nhận xét 01.40, Định nghĩa 01.10 |
| trung bình | thuật ngữ | Ba nghĩa của "biên"; "lề" chưa định nghĩa; infimum/minimum; ridge; ký hiệu $g$; "bình phương tối thiểu" của Bài 00; "véc tơ"; cách nhắc nguồn MIT | chấp nhận | đã sửa |
| nhẹ | `no-ai-slop` | Lặp ý "mô hình là lựa chọn"; mệnh đề "điểm xuất phát của mọi phép chứng nhận"; câu châm ngôn ở Tình huống 01.1; thuật toán không nêu tên ở đoạn về clip | chấp nhận | đã sửa: giữ một lần; bỏ; thay bằng số liệu $\sigma$ $0{,}66\to0{,}98$; nêu WGAN và ngưỡng cắt xác suất |
| nhẹ | bảng ký hiệu | Thiếu ký hiệu ($T$, $g$, $h$, $p$, $r$, $\Delta$, $\alpha_j,\beta_j$, mức $\alpha$, $s_i$, $X'$, $w'$, $w_a$, $w_b$…) | chấp nhận | đã sửa: bảng viết lại; ký hiệu đơn lẻ ghi "nêu tại chỗ"; $t_i$ ở Ví dụ 01.4 đổi thành $s_i$; tên $J_\mu$ của bài tập đổi thành $R_\mu$ để không trùng quy ước của Định nghĩa 01.42 |
| nhẹ | Mục 2.2 | Tương phản nhị phân "Mô hình là quan niệm chủ quan …, không phải một hệ quả của dữ kiện" | chấp nhận | đã sửa ở lượt 2: "Cách gộp hai chi phí do người lập mô hình chọn; dữ kiện không quyết định nó" |

### Quyết định cắt về phạm vi outline (C17–C20, điều phối viên quyết định thực hiện tất cả)

| nhóm | nội dung | trạng thái |
|---|---|---|
| A | Bỏ mục "Vị trí của bài trong học phần và cách đánh giá" (bảng trọng số, ví dụ tính điểm, thông báo 07/09); giữ hai câu về hai phần học phần trong giới thiệu chương | đã làm; chương còn đúng mười phần |
| B | Bỏ Mục 7.7 Jensen, Bài tập 01.10 cũ, hình `convex-preservation-and-jensen.svg`; Bài tập 01.20(a) chuyển sang so sánh trực tiếp bằng (7.1) | đã làm |
| C | Bỏ bao lồi (Định nghĩa 01.16, Mệnh đề 01.17, Ví dụ 01.10 cũ, hình bao nón); $\Delta_k$ định nghĩa một câu ở Ví dụ 01.10(d) | đã làm |
| D | Bỏ năm hình phụ cùng đoạn đọc hình: `basic-convex-set-library`, `convex-set-preservation-map` (cùng tổng Minkowski), `epigraph-levelset-indicator` (cùng hàm chỉ thị), `line-restriction-convex-library`, `psd-cone-and-quadratic-directions` | đã làm |
| E | Bỏ tập trên đồ thị (Mệnh đề 01.23(a) và chứng minh); giữ tập mức dưới; sửa câu cuối lời giải Bài tập 01.8 | đã làm; bỏ luôn thuật ngữ "tựa lồi" ở Bài tập 01.9 |
| F | Bỏ phần lặp: đoạn nối $q$ với (3.1) sau Định nghĩa 01.4 (giữ một mệnh đề), câu đầu đoạn về lựa chọn mô hình, Ví dụ 01.17 cũ (gộp vào chứng minh Mệnh đề 01.46), Bài tập 01.11 cũ, Bài tập 01.16(a) | đã làm |
| G | Thay Tình huống 01.2 chiếu sáng bằng tình huống trọng số trộn trên $\Delta_3$ có số liệu; bỏ hình `lighting-distribution.svg`; thêm Bài tập 01.21 mới (ràng buộc chuẩn với dữ liệu Ví dụ 01.6); bài chiếu sáng nhắc một câu ở "Ứng dụng", dẫn Bài 9 của tệp bài tập | đã làm |
| H | Dọn bảng ký hiệu; rút gọn đoạn đọc hình ở Mục 1 | đã làm |
| đánh số | Đánh số lại toàn bộ; cập nhật tham chiếu, tóm tắt, chuỗi suy luận, bảng ánh xạ bài tập | đã làm; script kiểm tham chiếu không còn lỗi |

### Ngoại lệ độ dài

Bản lượt 2 dài 33 170 từ theo `wc -w`, vượt khoảng thường gặp 8 000–20 000 của `AGENTS.md` và mục tiêu 10 000–16 000 của brief. Điều phối viên chấp nhận ngoại lệ với lý do: ba ca được giải trọn vẹn cùng chuỗi công cụ đầy đủ (định nghĩa, chứng minh, ví dụ, bài tập cho mỗi khái niệm); đơn vị đếm của `wc -w` là âm tiết tiếng Việt cộng với các token LaTeX, nên cao hơn số từ thực.

## Tự kiểm lượt 2 (sau chỉnh sửa)

| Mục bảng kiểm | Kết quả | Bằng chứng |
|---|---|---|
| Mỗi mục tiêu có định lý hoặc ví dụ và bài tập | Đạt | Bảng ánh xạ đầu mục "Bài tập củng cố" (đã cập nhật số hiệu) |
| Tám bước cho mỗi khái niệm trọng tâm | Đạt | Thêm trực giác và ví dụ tính tay trước Định lý 01.26, Bài tập 01.10 sau Mục 7.5, Mệnh đề 01.14, Nhận xét 01.15 và Bài tập 01.5 ở Mục 5.2; trực giác đứng trước Định nghĩa 01.24, 01.37, 01.39 |
| Ký hiệu trong bảng ký hiệu | Đạt | Bảng viết lại |
| Định lý đủ bốn phần, có chứng minh hoặc nguồn có trang | Đạt | Script: 24 khối kết quả đủ bốn phần, 23 khối `proof` kết thúc bằng $\square$; Định lý 01.36 dẫn Rudin có số trang |
| Ví dụ có kết quả số và dòng kiểm tra lại | Đạt | Script: 15/15 ví dụ có "Kiểm tra lại"; số liệu mới liệt kê trong báo cáo bàn giao để tính lại |
| Bài tập có `hint` và `solution` | Đạt | Script: 21/21 |
| Không tham chiếu trang chiếu, không câu mảnh, không bước bị bỏ | Đạt | Grep |
| Số hiệu liên tục, tham chiếu đúng, khối render đúng | Đạt | Bộ đếm chung 01.1–01.46, Ví dụ 01.1–01.15, Bài tập 01.1–01.21, Tình huống 01.1–01.3 liên tục; 151 khối Markdown = 151 `.material-block` |
| Móc nối, chuỗi suy luận, đoạn kết mục | Đạt theo tự đọc | Chuỗi suy luận Mục 6, 7, 8 và tóm tắt chương đã viết lại theo nội dung mới |
| `no-ai-slop` cho văn bản mới | Đạt | Chế độ Edit, đối chiếu `eval.md`; chi tiết ở mục "Rà lại lượt 2 và quyết định" |
| Nhất quán với bộ trang chiếu | Có chỗ lệch có chủ ý | Xem các dòng "chờ sửa deck" ở trên và danh sách chỗ lệch ở lượt 1 (mục 1 về phạm vi nay hẹp lại: không còn tập trên đồ thị, Jensen, bao lồi) |

### Kiểm tra kỹ thuật lượt 2

- `python3 2627-1/scripts/sync-local-materials.py` rồi `--check`: OK (19 tệp).
- `git diff --check`: không lỗi; tệp mới không có khoảng trắng cuối dòng.
- Playwright Chromium ở 1600×900 và 390×844: không `pageerror`; `.katex-error` = 0; không cảnh báo KaTeX; trang không tràn ngang (1585/1600 và 375/390); 16/16 hình nạp được; 151 khối Markdown, 151 `.material-block`. Lỗi CSP duy nhất trên console vẫn là script nội dòng do máy chủ tải lại chèn vào.
- Hình còn dùng: 16 SVG; tám hình bị bỏ theo quyết định C.

## Rà lại lượt 2 và quyết định

| Ngày | Vai trò | Loại tác tử | Mô hình | Effort | Ghi chú |
|---|---|---|---|---|---|
| 2026-10-09 | Tác tử rà toán, rà lại bản lượt 2 | general-purpose, tác tử lượt 1 được tiếp tục bằng SendMessage | Opus 5.5 | high | chỉ đọc |
| 2026-10-09 | Tác tử rà mạch truyện, rà lại bản lượt 2 | general-purpose, tác tử lượt 1 được tiếp tục bằng SendMessage | Opus 5.5 | high | chỉ đọc |
| 2026-10-09 | Điều phối viên | phiên chính | Fable 5.1 | medium | Quyết định lượt 2: **chấp nhận sau sửa nhẹ**; mọi phát hiện nghiêm trọng và trung bình đã đóng |

Phát hiện nhẹ của lượt rà lại và xử lý:

| mức độ | vị trí (lượt 2) | vấn đề | quyết định | trạng thái |
|---|---|---|---|---|
| nhẹ | sau Hệ quả 01.27 | Ví dụ $x^3$ dẫn Ví dụ 01.11(d), nay là $x^3-3x$ | chấp nhận | đã sửa: dẫn Nhận xét 01.32 |
| nhẹ | sau Mệnh đề 01.14 | "không bao giờ đủ" quá mạnh | chấp nhận | đã sửa: dẫn phần Phạm vi và Ví dụ 01.8 |
| nhẹ | Mệnh đề 01.46(a) | Chứng minh vượt phát biểu (phần nghiệm duy nhất khi tồn tại) | chấp nhận | đã sửa: thêm vào Kết luận |
| nhẹ | Bài tập 01.2 | Mô hình $b+at$ không khớp $s_i$ | chấp nhận | đã sửa: $b+as$ |
| nhẹ | Bài tập 01.19 | Chưa nối $R_\mu$ với Định nghĩa 01.42 | chấp nhận | đã sửa: $R_\mu=J_{2\mu}$ |
| nhẹ | chuỗi suy luận Mục 5 | Thiếu Mệnh đề 01.14 và Nhận xét 01.15 | chấp nhận | đã sửa |
| nhẹ | lời giải Bài tập 01.5 | Căn cứ cực tiểu toàn cục chưa viết theo khoảng | chấp nhận | đã sửa |
| nhẹ | Nhận xét 01.3 | Dẫn Hệ quả 01.27 hai lần | chấp nhận | đã sửa: gộp một câu |
| nhẹ | Mục 7.5 | Câu trực giác về $\nabla^2f\succeq0$ đứng sau Định lý 01.30 | chấp nhận | đã sửa: đưa lên trước Bổ đề 01.28, ghi là trực giác, kèm $q''=3>0$ |
| nhẹ | Mục 1 | Mục mở bằng câu dẫn, không bằng bài toán có số liệu | chấp nhận giữ nguyên | Mục 1 là mạch nêu nhu cầu; ba ca ngay sau đó (Mục 2–4) mở bằng bài toán có số liệu |
| nhẹ | Mục 6.2 | Các ví dụ và phản ví dụ của mục trả lời sẵn Bài 2 mục 2–3 của tệp bài tập Bài 01 | chấp nhận giữ nguyên | cùng lý do với Bài 7–8: ví dụ chuẩn của khái niệm; sẽ cân nhắc đổi dữ liệu trong tệp bài tập sau |
| nhẹ | Mục 7.5 | Trực giác bậc hai chưa đứng trước kết quả | chấp nhận | đã sửa ở lượt 2 (xem dòng trên) |

Kiểm `no-ai-slop` cho văn bản mới của lượt 2 và lượt sửa nhẹ (chế độ Edit, đối chiếu `eval.md`): các đoạn thêm mới (Định nghĩa 01.10 và đoạn diễn giải, Mệnh đề 01.14, Nhận xét 01.15, Bài tập 01.5, 01.10, 01.21, Tình huống 01.2, các câu trực giác ở Mục 7, các đoạn "Trong học máy" mới, Định nghĩa 01.42) không có câu dẫn rỗng, lời nhấn mạnh, tương phản nhị phân hay kết luận kịch tính; gạch ngang dài chỉ ở tiêu đề cấp một. Đạt.

## Sửa theo yêu cầu người dùng (2026-10-09, sau commit 93b1f05)

| vị trí | thay đổi | lý do | quyết định |
|---|---|---|---|
| Ba đoạn mở đầu trước "Mục tiêu học tập" | Bỏ hẳn (giới thiệu chương, hai phần học phần, móc nối Bài 00) | Người dùng: "không cần đoạn dài trước Mục tiêu học tập". Thông tin Bài 00 đã có trong "Kiến thức tiên quyết" | Điều phối viên Fable 5.1 thực hiện trực tiếp (xóa văn bản, không sửa toán); kiểm lại: không còn tham chiếu tới phần giới thiệu; sync và trình duyệt đạt |
