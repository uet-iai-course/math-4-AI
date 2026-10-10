# Nhật ký rà soát Bài 05c — ghi chú bài giảng viết lại theo tiêu chuẩn giáo trình

Tệp sản phẩm: `materials/lec-05c/lecture-note.md` (viết lại hoàn toàn, ghi đè bản cũ 14 114 từ, mục A–H; bản cũ còn trong git). Lượt 2 sửa thêm `materials/lec-05c/exercises.md` (chỉ nhãn và ký hiệu, theo quyết định điều phối viên A1) và `img/lec-05c/indicator-dominating-functions.svg` (ngưỡng Chernoff $a\to u$). Hình: thêm `img/lec-05c/sorted-vs-shuffled.svg` (mới, cho Tình huống 05c.3); đổi nhãn trong hai hình chỉ ghi chú này dùng: `coin-tail-three-bounds.svg` ("Định lý F.6 (một phía)" → "cận mũ (một phía)", cập nhật `desc`), `budget-u-curve.svg` ("B = 3 000: đường liền", "B = 300: đường đứt" → chú giải có mẫu nét "ngân sách 3 000", "ngân sách 300", chuyển khỏi vùng chồng lên đường đứt; cập nhật `desc`). Chín SVG còn lại giữ nguyên. Không sửa `exercises.md`, bộ trang chiếu khác, CSS, viewer, `index.html`. Chưa chạy `scripts/sync-local-materials.py` (theo brief). Chưa commit.

Kỹ năng `no-ai-slop` được nạp bằng công cụ `Skill` (chế độ Edit) trước khi soạn; tự đối chiếu `eval.md` ở mục "Tự kiểm `no-ai-slop`".

## Tác tử

| Vai | Loại tác tử | Mô hình | Effort | Ghi chú |
|---|---|---|---|---|
| Soạn (authoring), lượt 1 | general-purpose | Claude Opus 5.5 (`claude-opus-5-5`) | high | Theo brief của điều phối viên Fable 5.1 ngày 2026-10-10; tác tử tự ghi dòng này, điều phối viên đối chiếu với lời gọi công cụ. |
| Rà toán (math accuracy), lượt 1 | general-purpose | Claude Opus 5.5 (`claude-opus-5-5`) | high | Chỉ đọc; theo ghi nhận của điều phối viên, báo cáo được đối chiếu và hợp nhất vào "Phát hiện lượt 1". |
| Rà mạch truyện (storyline), lượt 1 | general-purpose | Claude Opus 5.5 (`claude-opus-5-5`) | high | Chỉ đọc; như trên. |
| Chỉnh sửa (editor), lượt 2 | general-purpose (cùng tác tử soạn, tiếp tục qua SendMessage) | Claude Opus 5.5 (`claude-opus-5-5`) | high | Áp dụng quyết định "yêu cầu sửa" lượt 1; tác tử tự ghi dòng này. |
| Rà lại toán, lượt 2 | general-purpose | Claude Opus 5.5 (`claude-opus-5-5`) | high | Chỉ đọc; theo ghi nhận của điều phối viên, hợp nhất vào "Phát hiện lượt 2". |
| Rà lại mạch truyện, lượt 2 | general-purpose | Claude Opus 5.5 (`claude-opus-5-5`) | high | Chỉ đọc; như trên. |
| Chỉnh sửa (editor), lượt 3 | general-purpose (cùng tác tử, tiếp tục qua SendMessage) | Claude Opus 5.5 (`claude-opus-5-5`) | high | Áp dụng quyết định "chấp nhận sau sửa nhẹ" lượt 2; tác tử tự ghi dòng này. |

## Quyết định của điều phối viên

| Lượt | Đầu ra | Quyết định | Lý do |
|---|---|---|---|
| 1 | Bản soạn 33 109 từ, 174 khối | yêu cầu sửa | A1, A2 nghiêm trọng; B1–B8 trung bình; nhóm C nhẹ. Độ dài chấp nhận khoảng 32 300–32 700; gói cắt 3 000 từ bị bác, chỉ cho các cắt an toàn; không xóa khối có số hiệu chung. |
| 2 | Bản chỉnh sửa 33 138 từ, 171 khối | chấp nhận sau sửa nhẹ | Độ dài 33 138 từ chấp nhận; bốn điểm trung bình, sáu điểm nhẹ ở "Phát hiện lượt 2". |
| 3 | | chấp nhận | Điều phối viên Fable 5.1 xác nhận hai tác tử rà lại lượt 2 là general-purpose, Claude Opus 5.5 (`claude-opus-5-5`), effort high; xem hình mới và hai hình đổi nhãn; Playwright 1600×900 và 390×844 cho ghi chú và exercises.md: 0 lỗi trang, 0 `.katex-error`, 0 chữ đỏ KaTeX, 171/171 khối, không tràn ngang; `git diff --check` sạch; `sync` chạy khi commit. Độ dài 33 225 từ chấp nhận (cắt thêm phá tám bước). Ghi chú này thay thế bản cũ `materials/lec-05c/lecture-note.md`; exercises.md chỉ đổi nhãn và ba ký hiệu. Tham chiếu E.9, E.10 trong ghi chú Bài 05 được tác tử 05b cập nhật và commit cùng Bài 05b. |

## Số liệu của bản lượt 3

- 33 225 từ (`wc -w`), tăng 87 từ so với lượt 2 do các bổ sung của "Phát hiện lượt 2".
- 171 khối, không lồng; số hiệu không đổi so với lượt 2 (05c.1–05c.59, Ví dụ 05c.1–05c.39, Bài tập 05c.1–05c.11, Tình huống 05c.1–05c.3, Thuật toán 05c.1); 0 tham chiếu sai loại; 11 hình.

## Phát hiện lượt 2 và cách xử lý

Các mục do điều phối viên hợp nhất từ hai báo cáo rà lại lượt 2. Vị trí theo số dòng bản lượt 2. Không xóa phát hiện nào.

| # | Mức độ | Vị trí | Vấn đề | Cách xử lý (lượt 3) | Trạng thái |
|---|---|---|---|---|---|
| 1 | trung bình | Ví dụ 05c.32, Diễn giải | so sánh ở độ lệch 25 chưa định lượng | "cận mũ lớn hơn xác suất đúng khoảng $13$ lần, cận Chebyshev khoảng $1{,}4\cdot10^5$ lần" ($3{,}73\cdot10^{-6}/2{,}82\cdot10^{-7}\approx13{,}2$; $0{,}04/2{,}82\cdot10^{-7}\approx1{,}42\cdot10^5$) | đã sửa |
| 2 | trung bình | Nhật ký | mục tự kiểm còn số lượt 1 | cập nhật bảng tự kiểm, mục tự chứa, bảng Hình (H-07), dòng Bài 8 của bảng trùng lặp theo bảng đổi số hiệu | đã sửa |
| 3 | trung bình | Nhật ký, bảng trùng lặp | cột Xử lý chưa dứt khoát | Bài 3 câu 1, Bài 4 câu 2, Bài 5 câu 1–2, Bài 7 câu 1, Bài 10 câu 4: "chấp nhận (tiền lệ Bài 02b–06); đổi đề ở exercises.md là việc riêng, chưa giao" | đã sửa |
| 4 | trung bình | ~844 | dẫn Goodfellow §3.2–3.3 cho CDF | bỏ, giữ Koller–Friedman tr. 28 | đã sửa |
| 5 | nhẹ | `outline.md` L243, L404; `storyboard.md` L179 | H-07 còn ghi là dùng | thêm "H-07 `lln-deviation-vs-n.svg` bỏ khỏi ghi chú lượt 2 (cắt an toàn)" | đã sửa |
| 6 | nhẹ | Nhận xét 05c.16, 05c.3 | thiếu bước kết luận; thiếu lý do | thêm "$\ne\tfrac14=P(A_1\mid A_3)P(A_2\mid A_3)$, nên không độc lập có điều kiện"; thêm "không thể gán xác suất nhất quán, đều theo độ dài, cho mọi tập con" | đã sửa |
| 7 | nhẹ | Mục 5.5 mở, "Trong học máy" sau Hệ quả 05c.48 | câu hỏi trực tiếp; đổi đại lượng | đoạn mở viết trần thuật về tỉ lệ lỗi; "Trong học máy" giữ tỉ lệ lỗi $0{,}08\pm0{,}043$, khoảng $[0{,}037;\,0{,}123]$ | đã sửa |
| 8 | nhẹ | Tiên quyết, Mục tiêu | viết tắt; nội dung LLO | "hàm khối xác suất (PMF)"; khôi phục nội dung LLO11, LLO12 | đã sửa |
| 9 | nhẹ | Bổ đề 05c.46 Bước 4; lời giải Bài tập 05c.2 | dòng cuối `aligned` hai quan hệ | tách mỗi dòng một quan hệ | đã sửa |
| 10 | nhẹ | Mục 6.6 hạn chế 1; Ví dụ 05c.33; Tình huống 05c.1; bảng ký hiệu; `exercises.md` Bài 10 | câu, số, ký hiệu | hạn chế 1 viết hai câu; Ví dụ 05c.33 thêm phương sai $\approx3{,}1\cdot10^6$ (tính lại: $3\,145\,285$); Dẫn ngược "cho phép so sánh với Chebyshev"; thêm $u$, $v$ vào danh sách ký hiệu cục bộ; `exercises.md` Bài 10 lời giải câu 2: $L_{\max}\to L$ | đã sửa |

## Số liệu của bản lượt 2

- 33 138 từ (`wc -w`), cao hơn khoảng giới hạn 32 700 khoảng 440 từ; xem "Độ dài lượt 2" ở mục Phát hiện.
- 171 khối mở = 171 đóng, không lồng: bộ đếm chung 05c.1–05c.59 không đổi; 39 ví dụ (không đổi); 11 bài tập (bỏ Bài tập 05c.9 lượt 1); 3 tình huống; 1 thuật toán; 36 `proof`; 11 `hint`, 11 `solution`.
- 11 hình (bỏ `lln-deviation-vs-n.svg` khỏi ghi chú; tệp SVG giữ nguyên trong kho).
- Mọi tham chiếu `05c.k` đúng khối, đúng loại; `exercises.md` không còn nhãn cũ (script quét `[B-G]\.[0-9]`, `G1–G4`, "phần A–H": 0).

## Số liệu của bản lượt 1

- 33 109 từ (`wc -w`), vượt trần đích 30 000 khoảng 10 %; xem mục "Độ dài và gói cắt đề xuất".
- 174 khối mở = 174 đóng, không lồng: 16 định nghĩa, 10 định lý, 21 mệnh đề, 1 bổ đề, 4 hệ quả, 7 nhận xét (bộ đếm chung 05c.1–05c.59); 39 ví dụ (Ví dụ 05c.1–05c.39); 12 bài tập (Bài tập 05c.1–05c.12, mỗi bài có `hint` và `solution`); 3 tình huống (Tình huống 05c.1–05c.3); 1 thuật toán (Thuật toán 05c.1); 36 `proof`.
- 12 hình (11 SVG cũ, trong đó 2 đổi nhãn, cộng 1 SVG mới); 17 đoạn "Trong học máy"; 6 mục `##` nội dung, mỗi mục có "Chuỗi suy luận của mục" và "Kết mục".
- Công thức đánh số (1.1)–(1.5), (2.1)–(2.7), (3.1)–(3.6), (4.1)–(4.10), (5.1)–(5.8), (6.1)–(6.6), liên tục.
- Mọi tham chiếu `05c.k` trỏ đúng khối và đúng loại (script kiểm, 0 lỗi).

## Phát hiện lượt 1 và cách xử lý

Các mục do điều phối viên hợp nhất từ báo cáo rà toán và rà mạch truyện. Vị trí theo số dòng của bản lượt 1 trong kho. Không xóa phát hiện nào.

| # | Mức độ | Vị trí | Vấn đề | Cách xử lý (lượt 2) | Trạng thái |
|---|---|---|---|---|---|
| A1 | nghiêm trọng | `exercises.md` | khoảng 60 nhãn cũ B.1–G.4, G1–G4, "phần D", "phần G" không còn tồn tại; ký hiệu lệch $K$, $D_b$, $B$ | ánh xạ toàn bộ theo bảng nhãn (kèm "phần 1–4", "kết luận 1"); G1 → "các lần rút độc lập cùng phân phối (Định nghĩa 05c.23)"; G4 → "tham số cố định, không phụ thuộc nhóm đang rút (Định lý 05c.53)" hoặc "không phụ thuộc tập xác thực (Định lý 05c.52)" theo nghĩa gốc từng chỗ; "phần D" → "Mục 3.2"; "phần G" → "Ví dụ 05c.36" (logistic), "Mục 6.6" (mô hình một hướng), "Mệnh đề 05c.57" (đệ quy); $K\to G$ (Bài 4), $D_b\to U_b$ (Bài 5), $B\to B_{\rm tot}$ (Bài 10); không đổi đề, số liệu, lời giải | đã sửa |
| A2 | nghiêm trọng | ghi chú ~1509, ~1704, Bài tập 05c.8, ~1028, ~1507 | trùng `exercises.md` | ~1509 đổi sang $N=50\,000$, $b=128$, hệ số $49\,872/49\,999\approx0{,}9975$; ~1704 phản ví dụ mới $Z\in\{-3,1\}$ với xác suất $\tfrac14$, $\tfrac34$ ($\mathbb EZ=0$, $P(Z\ge1)=\tfrac34$); Bài tập 05c.8 kiểm tra lại bằng phép thế số; bỏ câu "Tại $\theta=0$…" ở Ví dụ 05c.16; bỏ phép kiểm $n=2$ sau Mệnh đề 05c.36. Các trùng còn lại chấp nhận theo tiền lệ, ghi ở bảng trùng lặp | đã sửa |
| B1 | trung bình | Ví dụ 05c.34 | lập luận "phân biệt hai mô hình" sai | viết "ước lượng tỉ lệ lỗi một mô hình với sai số dưới $0{,}01$ cần khoảng $18\,500$"; phân biệt hai mô hình chênh $1$ điểm: $\varepsilon=0{,}005$ mỗi mô hình, hợp hai biến cố, $N\ge\ln80/(2\cdot0{,}005^2)\approx87\,640{,}5$, tức $87\,641$ (tính lại bằng Python); bỏ "hai vạn" | đã sửa |
| B2 | trung bình | Kiến thức tiên quyết | thiếu nối Bài 00 | thêm mục "Ôn tập xác suất (Bài 00)" phát biểu lại điều Bài 00 cung cấp và giới hạn chương vượt qua | đã sửa |
| B3 | trung bình | toàn tệp | ký hiệu | thêm bảng $\sigma^2$ (hằng số Bài 05b), $\sigma_\ell^2(\theta)$, $w$, $\gamma$, $[m,M]$; $\lambda\in\mathbb R$ (Chernoff $\lambda\ge0$); câu ký hiệu cục bộ $S,T,G,U,V,W,q,\kappa,\nu$. Đổi: điểm Taylor $\xi\to\vartheta$; biến cố điều kiện $C\to H$; số khối sai $B\to Y$; ngưỡng Chernoff $a\to u$ (cả SVG và alt); biến của bổ đề Hoeffding $u\to v$; $Z\sim\mathcal N(0,1)\to Z_0$; số biến cố trong họ $m\to q$; số khối $K\to\kappa$; số bản sao $m\to\nu$; tính không nhớ $k,m\to k,j$; $\varrho^2$ còn cục bộ ở Tình huống 05c.1 | đã sửa |
| B4 | trung bình | ~1042, ~2509, ~2134, ~1807 | phạm vi, bố cục | ~1042 nêu đúng điều kiện nhóm rút mới (Thuật toán 05c.1) và trỏ Mục 6.7; ~2509 tách ba đoạn, viết "trở thành ước lượng chệch", câu $\mu_{\rm c}$ chuyển vào Nhận xét 05c.59; mở Mục 6 nêu tập $1000$ bản sao mỗi giá trị (Ví dụ 05c.39); "$\mathbb EX^k/k!$ là hệ số của $\lambda^k$" | đã sửa |
| B5 | trung bình | nhiều chỗ | toán nhẹ, trích dẫn | gợi ý 05c.2 $\{Q,Q^c\}$; Ví dụ 05c.36 $0{,}0498$; Bài tập 05c.9 lượt 1 đã cắt; `desc` của `budget-u-curve.svg`; đoạn đọc `coin-tail-three-bounds.svg`; Bước 2 Mệnh đề 05c.36 thêm "$\gamma$ chỉ phụ thuộc $v_1,\ldots,v_N$"; Phạm vi 05c.14 thêm $b\ge2$; 05c.25 "nói chung không độc lập"; Phạm vi 05c.44 xác suất đuôi; sau Hệ quả 05c.54 "thừa số logarit tăng thêm $\ln1000\approx6{,}9$"; Nhận xét 05c.50 "đổi lại một độ chệch"; Dẫn ngược Tình huống 05c.2; Goodfellow tr. 110–111 và 110–129; Koller–Friedman Định nghĩa 2.1 chuyển sang câu về tiên đề; CDF tr. 28; hiệp phương sai → Goodfellow §3.8; hội tụ tuyệt đối → Wasserman §3.1 | đã sửa |
| B6 | trung bình | ~557, 724, 730, 891, 926, 1197, 1232, 1626, 1947, 2074, 2355, 2478, 2504, 2549, 2664 | trình bày | công thức hiển thị chuyển `aligned`; tách đoạn ~891, ~926, ~2074; hàm chỉ thị thành dòng định nghĩa `cases`; danh sách ở ~1232, ~2355, ~2478, ~2504; Tóm tắt bốn bất đẳng thức thành `aligned` mỗi dòng | đã sửa |
| B7 | trung bình | lần đầu | thuật ngữ tiếng Anh | concentration inequality, sampling with/without replacement, weak law of large numbers, confidence interval, finite population correction, law of total probability, law of total expectation, heavy tail, moment, accuracy; "(union bound)" và "(Bayes' rule)" chuyển lên mục tiêu học tập (lần đầu); "giá trị dự đoán dương (positive predictive value, precision)" | đã sửa |
| B8 | trung bình | ~223, ~1956 | câu; Gauss | viết lại câu ~223; nêu $e^{\lambda^2s^2/2}$ là hàm sinh mômen của $\mathcal N(0,s^2)$, không chứng minh | đã sửa |
| C | nhẹ | nhiều chỗ | | số $0{,}95^2$ lên đoạn nhu cầu của Định nghĩa 05c.15; Mục 5.5 mở bằng số (tập kiểm thử $1000$ ảnh, $\delta=0{,}05$); thêm "Trong học máy" sau Định lý 05c.45 và sau Hệ quả 05c.48; nhầm lẫn thường gặp về $\mathbb E[X\mid Y]$; ánh xạ mục tiêu sang `exercises.md` ở bảng dưới; bỏ lời bình "Sức mạnh…", "Cận mũ không phải lúc nào cũng thắng", ~1814; khẳng định không nguồn ~2302, ~2351 (viết lại theo Mệnh đề 05c.55), ~2490 (dẫn Goodfellow §8.1.3 tr. 279–280, cỡ nhóm $32$–$256$), ~2097 (bỏ bậc $\log_2n$); đổi khuôn "Trực giác, chưa phải…" ở 9 trong 17 chỗ; tự chứa: Ví dụ 05c.29 gọi tên $S$, Tình huống 05c.1 chép $\nabla\ell_i=-y_ia_is_i$, Ví dụ 05c.34 viết lại (5.8) | đã sửa |
| D | cắt an toàn | | | bỏ hình `lln-deviation-vs-n.svg` và đoạn đọc; bỏ Bài tập 05c.9 lượt 1; bỏ gạch $\varrho^2=0{,}05$ ở Tình huống 05c.1, Diễn giải "nhỏ hơn khoảng $120$ lần" ($200\,000/1659\approx120{,}6$); rút "Không gian không đếm được" ở Nhận xét 05c.3; nén Nhận xét 05c.16; bỏ câu lặp ~2148, ~2359 (giữ ~1440), ~2065 (giữ ~1903), ~2818 | đã sửa |

**Độ dài lượt 2.** Sau cắt an toàn, các bổ sung bắt buộc (B1, B2, B5, B7, C, khoảng 650 từ) đưa bản lên 33 450 từ; tác tử chỉnh sửa nén thêm danh mục đọc thêm, mục "Ứng dụng", đoạn mục tiêu và sáu đoạn văn, còn 33 138 từ, vẫn trên khoảng chấp nhận khoảng 440 từ. Không xóa khối có số hiệu chung. Phần vượt chờ điều phối viên quyết.

## Đổi số hiệu bài tập (lượt 1 → lượt 2)

| Lượt 1 | Lượt 2 |
|---|---|
| Bài tập 05c.1–05c.8 | không đổi |
| Bài tập 05c.9 (kiểm bổ đề Hoeffding) | bỏ |
| Bài tập 05c.10 (chọn trong nhiều mô hình) | Bài tập 05c.9 |
| Bài tập 05c.11 (sai số chuẩn mục tiêu) | Bài tập 05c.10 |
| Bài tập 05c.12 (ngân sách $600$) | Bài tập 05c.11 |

Bộ đếm chung 05c.1–05c.59, Ví dụ 05c.1–05c.39, Tình huống 05c.1–05c.3, Thuật toán 05c.1 không đổi.

## Sửa kèm ở `exercises.md` (lượt 2)

Chỉ đổi nhãn và ký hiệu; không đổi đề, số liệu, lời giải. Sao lưu bản trước trong thư mục tạm của phiên.

- Câu dẫn đầu tệp: bỏ "giả thiết G1–G4", ví dụ nhãn đổi sang "Định nghĩa 05c.1, Mệnh đề 05c.36, Định lý 05c.47".
- Toàn bộ nhãn B.x–G.x theo bảng nhãn; "(i)–(iv)", "(1)" → "phần 1–4"; "Mệnh đề G.4 (i)" → "Mệnh đề 05c.55, kết luận 1".
- Bài 4: $K\to G$ cho biến hình học (câu 2, 3, gợi ý, lời giải); "ghi chú phần D" → "ghi chú Mục 3.2".
- Bài 5: $D_b\to U_b$.
- Bài 9: "(G4)", "(G1)" → "tham số cố định, không phụ thuộc nhóm đang rút, và các chỉ số i.i.d. có hoàn lại (Định lý 05c.53, Hệ quả 05c.25)"; "(ghi chú, phần G)" → "(ghi chú, Ví dụ 05c.36)".
- Bài 10: $B\to B_{\rm tot}$; "ở phần G" → "của Mệnh đề 05c.57"; "(ghi chú, phần G)" → "(ghi chú, Mục 6.6)"; câu 4 G1, G4 viết theo nghĩa gốc với số hiệu; mục Nguồn "đệ quy dẫn xuất ở phần G" → "đệ quy của Mệnh đề 05c.57".
- Kiểm: script quét nhãn cũ cho 0 kết quả; `git diff --check` sạch; Playwright 1600×900 và 390×844: 0 `pageerror`, 0 `.katex-error`, 0 chữ đỏ, 395 phần tử KaTeX, 20 khối gập, không cuộn ngang.

## Cấu trúc chương

| Mục | Tiêu đề | Ứng với phần bản cũ | Câu hỏi trung tâm được trả lời |
|---|---|---|---|
| 1 | Ước lượng bằng trung bình và không gian xác suất | A + B | đặt năm câu hỏi; xác suất nhóm có lặp |
| 2 | Xác suất có điều kiện, độc lập và công thức Bayes | C | các lần rút có hoàn lại độc lập |
| 3 | Biến ngẫu nhiên và phân phối | D | gradient mẫu là các biến i.i.d. |
| 4 | Kỳ vọng, phương sai và trung bình mẫu | E | "Tâm", "Sai số điển hình" |
| 5 | Bất đẳng thức tập trung | F | "Xác suất sai lệch", cỡ mẫu, khoảng tin cậy |
| 6 | Mất mát trung bình trên nhóm nhỏ | G | "Trung bình hay tổng", "Cỡ nhóm" |
| — | Tình huống, Tóm tắt, Bài tập củng cố, Đọc thêm | H + Tài liệu tham khảo | |

Phần H cũ (bảng tra) được thay bằng "Tóm tắt chương" theo mẫu; nội dung "Phạm vi áp dụng" của H.2 chuyển vào các đoạn "Trong học máy", Mục 6.7 và Tình huống 05c.2, 05c.3.

## Bảng nhãn cũ → số hiệu mới

Dùng để cập nhật tham chiếu trong `materials/lec-05/lecture-note.md` (hiện dẫn "Định lý E.9", "Mệnh đề E.10" ở dòng 22, 25, 210, 320, 651, 754, 2978 và mục "Cỡ nhóm dưới ngân sách tính toán cố định" ở dòng 980) và trong `materials/lec-05c/exercises.md` (dẫn B.1–G.4 theo nhãn cũ).

| Nhãn cũ | Nội dung | Số hiệu mới |
|---|---|---|
| Định nghĩa B.1 | không gian xác suất rời rạc | Định nghĩa 05c.1 |
| Mệnh đề B.2 (i)–(iv) | hệ quả của tiên đề | Mệnh đề 05c.2, phần 1–4 |
| Mệnh đề B.3 (i)–(iv) | quy tắc đếm | Mệnh đề 05c.4, phần 1–4 |
| (mục "Chỉ số lặp", không nhãn) | xác suất nhóm có lặp | Định nghĩa 05c.5, Mệnh đề 05c.6 (mới) |
| Mệnh đề B.4 | bất đẳng thức hợp | Mệnh đề 05c.7 |
| Định nghĩa C.1 | xác suất có điều kiện | Định nghĩa 05c.8 |
| Mệnh đề C.2 | quy tắc nhân | Mệnh đề 05c.9 |
| Mệnh đề C.3 | xác suất toàn phần | Mệnh đề 05c.10 |
| Định lý C.4 | công thức Bayes | Định lý 05c.11 |
| Định nghĩa C.5 | độc lập | Định nghĩa 05c.12 |
| Nhận xét C.6 | độc lập từng đôi | Nhận xét 05c.13 |
| (câu sau C.6, không nhãn) | các lần rút có hoàn lại độc lập | Mệnh đề 05c.14 (mới, có chứng minh) |
| Định nghĩa C.7 | độc lập có điều kiện | Định nghĩa 05c.15 |
| — | độc lập không kéo theo độc lập có điều kiện | Nhận xét 05c.16 (mới) |
| Định nghĩa D.1 | biến ngẫu nhiên, PMF | Định nghĩa 05c.17 |
| Định nghĩa D.2 | CDF | Định nghĩa 05c.18; tính chất thành Mệnh đề 05c.19 (mới) |
| Định nghĩa D.3 | phân phối rời rạc thường dùng | Định nghĩa 05c.20 |
| (đoạn tính không nhớ sau D.3) | tính không nhớ của phân phối hình học | đoạn văn cuối Mục 3.2 (không đánh số) |
| Mệnh đề D.4 | tổng Bernoulli độc lập là nhị thức | Mệnh đề 05c.21 |
| Định nghĩa D.5 | mật độ, đều, Gauss | Định nghĩa 05c.22 |
| Định nghĩa D.6 | phân phối đồng thời, độc lập, i.i.d. | Định nghĩa 05c.23 |
| Mệnh đề D.7 | hàm của các khối độc lập (bản cũ không chứng minh) | Mệnh đề 05c.24 (có chứng minh cho biến rời rạc) |
| (mục "Gradient của mẫu được rút") | gradient mẫu i.i.d. | Hệ quả 05c.25 (mới) |
| Định nghĩa E.1 | kỳ vọng | Định nghĩa 05c.26 |
| Mệnh đề E.2 | kỳ vọng của hàm | Mệnh đề 05c.27 |
| Định lý E.3 | tính tuyến tính | Định lý 05c.28 |
| Mệnh đề E.4 (i)–(iii) | chỉ thị, đơn điệu | Mệnh đề 05c.29, phần 1–3 |
| Định nghĩa E.5 | mômen, phương sai, hiệp phương sai | Định nghĩa 05c.30 |
| Mệnh đề E.6 | công thức phương sai | Mệnh đề 05c.31 |
| Mệnh đề E.7 | độc lập kéo theo $\mathbb E[XY]=\mathbb EX\,\mathbb EY$ | Mệnh đề 05c.32 |
| Mệnh đề E.8 | phương sai của tổng | Mệnh đề 05c.33 |
| Định lý E.9 | trung bình mẫu: không chệch, phương sai $\sigma_1^2/n$ | **Định lý 05c.35**; định nghĩa không chệch và sai số chuẩn tách thành Định nghĩa 05c.34 |
| Mệnh đề E.10 | rút không hoàn lại, hệ số $\frac{N-n}{N-1}$ | **Mệnh đề 05c.36** |
| Định nghĩa E.11 | kỳ vọng có điều kiện | Định nghĩa 05c.37 |
| Mệnh đề E.12 (1)–(4) | kỳ vọng toàn phần | Mệnh đề 05c.38, phần 1–4 |
| Định lý F.1 | Markov | Định lý 05c.39 |
| Hệ quả F.2 | Chebyshev | Hệ quả 05c.40 |
| Định lý F.3 | luật số lớn yếu | Định lý 05c.41 |
| — | hàm sinh mômen | Định nghĩa 05c.42 (mới; bản cũ định nghĩa trong ví dụ) |
| Định lý F.4 | Chernoff tổng quát | Định lý 05c.43 |
| Mệnh đề F.5 | hàm sinh mômen của tổng độc lập | Mệnh đề 05c.44 |
| Định lý F.6 | Chernoff cho đồng xu cân đối | Định lý 05c.45 |
| Bổ đề F.7 | bổ đề Hoeffding (bản cũ không chứng minh) | Bổ đề 05c.46 (có chứng minh 5 bước: dây cung, đổi biến, $\varphi''\le\tfrac14$, Taylor) |
| Định lý F.8 | Hoeffding | Định lý 05c.47 |
| Hệ quả F.9 | cỡ mẫu | Hệ quả 05c.48 (thêm phần 2: khoảng tin cậy) |
| Nhận xét F.10 | định lý giới hạn trung tâm | Nhận xét 05c.49 |
| Nhận xét F.11 | đuôi nặng | Nhận xét 05c.50 |
| Định nghĩa G.1 | rủi ro kỳ vọng, rủi ro thực nghiệm | Định nghĩa 05c.51 |
| Định lý G.2 | rủi ro thực nghiệm tại tham số cố định | Định lý 05c.52 |
| Định lý G.3 | gradient nhóm nhỏ | Định lý 05c.53 |
| — | cỡ nhóm cho mọi tọa độ (Hoeffding + cận hợp) | Hệ quả 05c.54 (mới) |
| Mệnh đề G.4 | tổng và trung bình | Mệnh đề 05c.55 |
| Mệnh đề G.5 | hiệu suất giảm dần | **Mệnh đề 05c.56** |
| (derivation "Sai số sau K bước") | đệ quy $a_k$, giá trị giới hạn $\bar a_b$ | Thuật toán 05c.1 và Mệnh đề 05c.57 |
| Nhận xét G.6 | Bottou và Bousquet | Nhận xét 05c.58 |
| Nhận xét G.7 | giả thiết H6, H6b của Bài 05b | Nhận xét 05c.59 (dẫn bằng tên khái niệm, không dùng nhãn H6, H6b, T5, BĐ6) |

Bài 05 dẫn "Định lý E.9" → Định lý 05c.35; "Mệnh đề E.10" → Mệnh đề 05c.36; mục "Cỡ nhóm dưới ngân sách tính toán cố định" → Mục 6.6 (Mệnh đề 05c.57, Ví dụ 05c.39, đáy $b=75$ khi ngân sách $3000$, không đổi); "G.5" → Mệnh đề 05c.56.

### Ví dụ cũ → ví dụ mới

| Mã cũ | Ví dụ | Vị trí mới |
|---|---|---|
| VD-00 | ví dụ ba quan sát | Ví dụ 05c.1; dùng lại ở 05c.9, 05c.16, 05c.21, 05c.23, 05c.25, 05c.35, 05c.37–05c.39 |
| VD-01 | hai xúc xắc | Ví dụ 05c.2, 05c.11, 05c.17, 05c.18, 05c.20, 05c.26, 05c.28 |
| VD-02 | bài toán sinh nhật | Ví dụ 05c.3, 05c.5 |
| VD-03 | chỉ số lặp | Ví dụ 05c.4; số chỉ số khác nhau ở Ví dụ 05c.19 |
| VD-04 | Monty Hall | Ví dụ 05c.6, 05c.24 |
| VD-05 | xét nghiệm | Ví dụ 05c.7 |
| VD-05b | hai xét nghiệm | Ví dụ 05c.10 |
| VD-06 | rút có, không hoàn lại | Ví dụ 05c.9, 05c.15 |
| VD-07 | số mặt ngửa | Ví dụ 05c.12 ($n=3$); $n=10$ trong đoạn sau Mệnh đề 05c.21 |
| VD-08 | trò chơi hai xúc xắc | bỏ; thay bằng kỳ vọng mất mát 0–1 (đoạn sau Định nghĩa 05c.26) và Ví dụ 05c.13 |
| VD-09 | St. Petersburg | Ví dụ 05c.33 |
| VD-10 | quan sát chưa gặp | Ví dụ 05c.19; cận Markov ở Ví dụ 05c.27 |
| VD-11 | trùng mũ | một câu ở Mục 4.2, không đánh số |
| VD-12 | gradient nhóm tại $\theta=1$ | Ví dụ 05c.16, 05c.21, 05c.23 |
| VD-13 | $\theta=0$ và cây hai bước | Ví dụ 05c.16, 05c.25 |
| VD-14 | thăm dò | Ví dụ 05c.22 (sai số chuẩn tỉ lệ lỗi), Ví dụ 05c.31 (cỡ mẫu) |
| VD-15 | Markov, Chebyshev trên hai xúc xắc | Ví dụ 05c.26, 05c.28 |
| VD-16 | đồng xu, ba cận | Ví dụ 05c.29, 05c.32 |
| VD-17 | hai cận cho gradient nhóm | Ví dụ 05c.35 |
| VD-17b | gradient logistic | Ví dụ 05c.36 |
| VD-18 | mất mát tổng | Ví dụ 05c.37 |
| VD-19 | dữ liệu lặp | Ví dụ 05c.38 |
| VD-20 | ngân sách cố định | Ví dụ 05c.39 |
| VD-21 | sai số chuẩn theo $b$ | câu mở Mục 6.5, dẫn Ví dụ 05.13 của Bài 05 (cùng bảng) |
| VD-22 | cỡ tập xác thực | Ví dụ 05c.34 |
| VD-23 | bộ sưu tập | không có trong ghi chú (thuộc Bài 5 của `exercises.md`) |

Ví dụ mới: 05c.8 (bộ lọc thư rác), 05c.13 (số lỗi trên mười ảnh), 05c.14 (đều trên $[0,1]$, tách từ D.5), 05c.30 (hàm sinh mômen của một đồng xu, tách từ F), 05c.27 (Markov cho quan sát chưa gặp, tách từ F.1). Câu hỏi kiểm tra cũ: cận hợp → Bài tập 05c.1; $\mathbb E(\theta_1-1)^2$ → Bài tập 05c.4; $B=3000$, $b=50$ → Bài tập 05c.7; Câu hỏi 1 → Bài tập 05c.11; Câu hỏi 3 → Bài tập 05c.12; hai câu còn lại bỏ vì gần trùng `exercises.md` (Bài 8.2, Bài 10.3).

## Giáo trình đã tham khảo

Không đọc PDF của Wasserman và Blitzstein–Hwang (không có trong `sources/`); hai nguồn được dẫn theo số chương, số mục, không dẫn số trang. Số trang của Koller–Friedman, Goodfellow et al., Boyd–Vandenberghe, Sra–Nowozin–Wright giữ theo bản cũ (đã được tác tử nguồn kiểm ngày 2026-10-08, phát hiện N7, N8 trong `review-log.md`).

| Mục | Nguồn và mục | Điều học được và chuyển vào ghi chú |
|---|---|---|
| 1 | Koller–Friedman §2.1.1 (tr. 15–16); Blitzstein–Hwang ch. 1 (§1.3–1.4); Wasserman ch. 1 (§1.2–1.4) | thứ tự kết cục → biến cố → tiên đề → hệ quả; "định nghĩa ngây thơ" chỉ đúng khi đồng khả năng; bài toán sinh nhật như ví dụ đếm chuẩn |
| 2 | Koller–Friedman §2.1.2 (tr. 18–19, Ví dụ 2.2), §2.1.4 (tr. 23–24); Blitzstein–Hwang ch. 2; Wasserman §1.5–1.7; Goodfellow §3.11 (tr. 70) | Monty Hall với giả thiết người dẫn ghi rõ; tần số tự nhiên trước công thức Bayes; độc lập là tính chất của $P$; độc lập từng đôi không đủ; độc lập có điều kiện cho hai xét nghiệm |
| 3 | Koller–Friedman §2.1.3–2.1.5 (tr. 20–28); Goodfellow §3.2–3.3, 3.7, 3.9.1 (tr. 56–62); Blitzstein–Hwang ch. 3; Wasserman ch. 2 | biến ngẫu nhiên là hàm; PMF, CDF; mật độ có thể lớn hơn 1; độc lập của biến qua thừa số hóa PMF đồng thời |
| 4 | Koller–Friedman §2.1.7 (tr. 31–33, Mệnh đề 2.4–2.6); Blitzstein–Hwang ch. 4 (§4.2 tuyến tính, §4.4 chỉ thị, trả mũ), ch. 7 (hiệp phương sai); Wasserman ch. 3 (§3.5 kỳ vọng có điều kiện); Goodfellow §5.4.3 (tr. 128) | tuyến tính không cần độc lập; cầu nối chỉ thị–xác suất; không tương quan không kéo theo độc lập (phản ví dụ $Y=X^2$); sai số chuẩn của trung bình |
| 5 | Boyd–Vandenberghe §7.4.1–7.4.2 (tr. 374–379); Wasserman ch. 4 (§4.1, chứng minh Hoeffding), ch. 5 (§5.3, 5.4); Koller–Friedman Phụ lục A.2 (tr. 1143–1146), §12.1.2 (tr. 490–491); Blitzstein–Hwang ch. 10; Goodfellow (5.47) tr. 128 | ba hàm chặn chỉ thị; Chernoff qua Markov cho $e^{\lambda X}$; bổ đề Hoeffding chứng minh bằng dây cung và Taylor theo hướng của Wasserman; khoảng tin cậy theo Hoeffding |
| 6 | Goodfellow §8.1.3 (tr. 277–282), §5.2–5.3 (tr. 109–121); Sra–Nowozin–Wright ch. 13 (13.2), §13.2.3, §13.3.2 (tr. 352–362) | 100 so với 10 000 mẫu; dữ liệu lặp; phần cứng song song; xáo trộn theo lượt và độ chệch từ lượt thứ hai; phân tích sai số xấp xỉ–ước lượng–tối ưu |
| Tình huống | Wasserman ch. 4 (khoảng tin cậy Hoeffding cho tỉ lệ) | Tình huống 05c.2 |

Không có đoạn nào dịch hoặc chép nguyên văn từ giáo trình.

## Ánh xạ mục tiêu học tập – kết quả – bài tập

| Mục tiêu | Kết quả và ví dụ | Bài tập |
|---|---|---|
| 1 (Mục 1) | Định nghĩa 05c.1, 05c.5; Mệnh đề 05c.2, 05c.4, 05c.6, 05c.7; Ví dụ 05c.2–05c.5 | Bài tập 05c.1; Bài tập 05c.8 câu 1 |
| 2 (Mục 2) | Định nghĩa 05c.8, 05c.12, 05c.15; Mệnh đề 05c.9, 05c.10, 05c.14; Định lý 05c.11; Ví dụ 05c.6–05c.10 | Bài tập 05c.2 |
| 3 (Mục 3; LLO12) | Định nghĩa 05c.17, 05c.18, 05c.20, 05c.22, 05c.23; Mệnh đề 05c.19, 05c.21, 05c.24; Hệ quả 05c.25; Ví dụ 05c.11–05c.16 | Bài tập 05c.3 |
| 4 (Mục 4; LLO12) | Định lý 05c.28, 05c.35; Mệnh đề 05c.31–05c.33, 05c.36, 05c.38; Ví dụ 05c.17–05c.25 | Bài tập 05c.4, 05c.5; Bài tập 05c.8 câu 2, 3, 5 |
| 5 (Mục 5; LLO11) | Định lý 05c.39, 05c.41, 05c.43, 05c.45, 05c.47; Bổ đề 05c.46; Hệ quả 05c.40, 05c.48; Ví dụ 05c.26–05c.33 | Bài tập 05c.6; Bài tập 05c.8 câu 4 |
| 6 (Mục 6; LLO11, LLO12) | Định lý 05c.52, 05c.53; Hệ quả 05c.54; Mệnh đề 05c.55–05c.57; Thuật toán 05c.1; Ví dụ 05c.34–05c.39 | Bài tập 05c.7, 05c.9, 05c.10, 05c.11; Bài tập 05c.8 câu 6 |
| 7 (Tình huống) | Tình huống 05c.1–05c.3 | Bài tập 05c.5 (quan sát tương quan), Bài tập 05c.9 (chọn trong nhiều mô hình) |

Ánh xạ mục tiêu sang `exercises.md` (lượt 2): mục tiêu 1 → Bài 1; mục tiêu 2 → Bài 2, Bài 3 câu 1; mục tiêu 3 → Bài 3 câu 2, Bài 4 câu 1; mục tiêu 4 → Bài 4 câu 3–4, Bài 5, Bài 6; mục tiêu 5 → Bài 7, Bài 8; mục tiêu 6 → Bài 9, Bài 10 câu 1–3; mục tiêu 7 → Bài 10 câu 4.

## Tự kiểm theo bảng kiểm "Kiểm định ghi chú bài giảng"

| Tiêu chí | Kết quả |
|---|---|
| Mỗi mục tiêu có kết quả và bài tập | đạt (bảng trên) |
| Tám bước cho mỗi khái niệm trọng tâm K1–K15 | đạt với các ngoại lệ đã có trong storyboard: định lý giới hạn trung tâm chỉ có nhận xét; Mục 3.3 là trường hợp của K6. Mỗi khái niệm mở bằng nhu cầu và câu "Trực giác, chưa phải định nghĩa/phát biểu" (17 câu), ví dụ đứng trước định nghĩa |
| Mỗi ký hiệu xuyên suốt có trong bảng ký hiệu | đạt; ký hiệu cục bộ ($A_n$, $A_{jk}$, $Q$, $E_1$, $E_2$, $H$, $U_b$, $T_N$, $G$, $W_i$, $V$, $Y$, $q$, $u$, $v$, $\kappa$, $\nu$, $\vartheta$, $Z_0$, $\varrho^2$, $\mu_{\rm c}$, $\alpha$, $\tau$, $\varphi$, $\zeta_k$; lượt 3) được giới thiệu tại chỗ |
| Định lý bốn phần, có chứng minh | đạt cho mọi định lý, mệnh đề, bổ đề, hệ quả; ngoại lệ có nguồn: định lý giới hạn trung tâm (Nhận xét 05c.49), phiên bản mật độ của các kết quả |
| Ví dụ có kết quả số và "Kiểm tra lại" | đạt (lượt 3: 53 dòng "Kiểm tra lại"); mọi số tính lại bằng `python3 -I` với phân số chính xác hoặc đếm toàn bộ, không mô phỏng |
| Bài tập có `hint`, `solution` | đạt, 11/11 (lượt 3) |
| Không "trang chiếu", câu mảnh, bước bị bỏ | đạt; bỏ "hiển nhiên" ở ba chỗ, thay bằng lý do |
| Trình bày sáng sủa | chứng minh dài chia bước có nhãn; chuỗi $\ge3$ quan hệ đặt trong `aligned` hoặc tách câu (script kiểm 21 chỗ nội dòng, đã tách hết); không đoạn văn quá bốn câu theo script đếm dấu chấm câu |
| Số hiệu liên tục, tham chiếu đúng, không lồng | đạt (script) |
| Móc nối khái niệm, định lý, "Trong học máy", chuỗi suy luận mỗi mục, mở và kết chương | đạt: mở chương nối Định lý 05.11, Ví dụ 05.1; kết chương nối Bài 05b (sàn nhiễu, giảm bước học) và Bài 06 (bộ tối ưu thích ứng, chuẩn hóa theo lô) |
| Kết mục ba ý | đạt cho sáu mục |
| Giáo trình theo mục | đạt (bảng trên) |
| Nhất quán với bộ trang chiếu | không áp dụng (bài không có bộ trang chiếu) |

## Kiểm định số liệu (tác tử soạn tự tính, chờ tác tử rà toán tính lại độc lập)

| Đại lượng | Giá trị | Cách tính |
|---|---|---|
| Sinh nhật $n=23,30,50,70$ | $0{,}5073$; $0{,}7063$; $0{,}9704$; $0{,}9992$ | tích chính xác |
| Có lặp $N=1000$, $b=32/64$; $N=60\,000$, $b=256$ | $0{,}394$; $0{,}873$; $0{,}420$ | (1.4) |
| Cận hợp $b=32$ | $0{,}496$ | $\binom{32}2/1000$ |
| $P(D\mid+)$; hai xét nghiệm; $P(+_2\mid+_1)$ | $95/5090\approx0{,}0187$; $0{,}265$; $0{,}067$ | phân số |
| Thư rác một từ; hai từ, tiên nghiệm $0{,}4$ và $0{,}1$ | $0{,}893$; $0{,}888$; $0{,}568$ | phân số |
| Nhị thức$(10;0{,}1)$: $P(S\ge3)$ | $0{,}0702$ | tổng chính xác |
| $\mathbb ES$, $\mathbb ES^2$, $\operatorname{Var}S$ | $7$; $329/6$; $35/6$ | phân số |
| $\mathbb EU_{32}$ ($N=1000$); $(1-1/N)^N$ | $31{,}51$; $0{,}296/0{,}349/0{,}3677$ | trực tiếp |
| Phương sai gradient nhóm $b=1,2,4$; không hoàn lại $b=2$ | $8/3$, $4/3$, $2/3$; $2/3$ | đếm $3^b$ dãy |
| Cây SGD hai bước; $\mathbb E(\theta_1-1)^2$ | $-0{,}9$; $0{,}8367$ | trực tiếp |
| Tần suất mặt ngửa $\varepsilon=0{,}1$, $n=10..200$ | $0{,}754$; $0{,}503$; $0{,}203$; $0{,}0569$; $0{,}00569$ | tổng nhị thức chính xác |
| $P(S\ge60)$, $P(S\ge75)$, $P(S\ge80)$, $n=100$ | $0{,}0284$; $2{,}82\cdot10^{-7}$; $5{,}58\cdot10^{-10}$ | tổng chính xác |
| Điểm cắt Hoeffding/Chebyshev | $n=108$; $b=23$ | tìm trên số nguyên, trong vùng cả hai cận $<1$ |
| Cỡ mẫu thăm dò $\varepsilon=0{,}03$, $\delta=0{,}05$ | $5556$; $2050$; $1068$ (xấp xỉ chuẩn) | (5.8) |
| Cỡ tập xác thực $\varepsilon=0{,}01$, $\delta=0{,}05$ | $18\,445$; $50\,000$ | (5.8) |
| Gradient nhóm $\lvert\widehat g\rvert\ge1$, $b=4,16,32,64$ | $0{,}370$; $0{,}0199$; $6{,}2\cdot10^{-4}$; $8{,}1\cdot10^{-7}$ | đếm chính xác theo tổng |
| Logistic $d=1000$, $\varepsilon=0{,}1$, $\delta=0{,}05$; $d=20$, $\delta=0{,}01$; $K=1000$ bước | $2120$; $1659$; $3041$ | (6.4) |
| Ngân sách $3000$: $b=1,10,30,75,100,300,1000,3000$ | $0{,}140$; $0{,}0140$; $0{,}00468$; $0{,}00209$; $0{,}00320$; $0{,}122$; $0{,}532$; $0{,}810$ | (6.6); cực tiểu trên mọi $b$ nguyên tại $b=75$ |
| Ngân sách $300$; $600$ | đáy $b=10$ ($0{,}0158$); đáy $b=18$ ($0{,}0087$) | quét mọi $b$ nguyên |
| $\bar a_b$; cận Bài 05b ($\eta=0{,}1$, $b=4$) | $8/(57b)$; $0{,}0351$ so với $4/(15b)=0{,}0667$ | công thức |
| Tình huống 05c.2: $\varepsilon_{2000}$; 50 mô hình; khối 100 | $0{,}0304$; $0{,}0436$; xác suất thật $0{,}193$, $\varepsilon=0{,}136$ | nhị thức$(100;0{,}08)$, $B\le4$ hoặc $B\ge12$ |
| Tình huống 05c.3: $\theta_{10},\theta_{20},\theta_{30}$ | $-0{,}6513$; $0{,}4242$; $2{,}1019$; $e_{30}^2=1{,}214$ | đệ quy chính xác; so $a_{30}=0{,}0032$ |
| Bài tập 05c.9 (lượt 2; lượt 1 là 05c.10) | $2952$; $6636$ | (5.8) với $\ln(2k/\delta)$ |
| Lượt 2: Ví dụ 05c.34 hai mô hình | $87\,641$ | $\ln80/(2\cdot0{,}005^2)$ |
| Lượt 2: hệ số $N=50\,000$, $b=128$ | $0{,}9975$ | $49\,872/49\,999$ |
| Lượt 2: Tình huống 05c.1, tỉ số Chebyshev/Hoeffding | $\approx120{,}6$ | $200\,000/1659$ |
| Lượt 2: tập $1000$ ảnh, độ chính xác $0{,}92$ | $\varepsilon_{1000}\approx0{,}043$, khoảng $[0{,}877;\,0{,}963]$ | Hệ quả 05c.48 phần 2 |

## Trùng lặp với `exercises.md`

| Bài trong `exercises.md` | Nội dung gần nhất trong ghi chú | Xử lý |
|---|---|---|
| Bài 1 (biến cố hai xúc xắc, "ít nhất một mặt 6") | ví dụ sau Mệnh đề 05c.2 | đổi biến cố thành "tổng $\ge10$" và "hai mặt bằng nhau" để không giải sẵn Bài 1 câu 2 |
| Bài 2 (xét nghiệm tỉ lệ mắc 2 %, hai lần) | Ví dụ 05c.7, 05c.10 (tỉ lệ $0{,}001$) | khác số liệu; giữ như bản cũ |
| Bài 3 (độc lập từng đôi với xúc xắc; không hoàn lại từ $\{1,2,3,4\}$) | Nhận xét 05c.13 (đồng xu), Ví dụ 05c.9 ($\{-1,1,3\}$) | câu 1 đẳng cấu Nhận xét 05c.13: chấp nhận (tiền lệ Bài 02b–06); đổi đề ở exercises.md là việc riêng, chưa giao |
| Bài 4 (St. Petersburg trần $2^{10}$; Monty bốn cửa; $\mathbb EG=1/p$) | Ví dụ 05c.33 (trần $2^{20}$), Ví dụ 05c.6 (ba cửa); không tính $\mathbb EG$ | câu 2 chỉ thế số: chấp nhận (tiền lệ Bài 02b–06); đổi đề ở exercises.md là việc riêng, chưa giao. Câu 3 dùng tính không nhớ, giữ ở đoạn cuối Mục 3.2 |
| Bài 5 ($\mathbb EU_b$, $N=200$, $b=50$; sau $2N$ lần; bộ sưu tập) | Ví dụ 05c.19 ($N=1000$, $b=32$; sau $N$ lần) | câu 1–2 chỉ thế số vào công thức của ví dụ: chấp nhận (tiền lệ Bài 02b–06); đổi đề ở exercises.md là việc riêng, chưa giao |
| Bài 6 (không hoàn lại bằng chỉ thị; kiểm $v=(2,0,-2)$, $n=2,3$; $N=60\,000$, $n=256$) | chứng minh Mệnh đề 05c.36 bằng trường hợp $n=N$; Ví dụ 05c.23 | khác kỹ thuật; lượt 2 bỏ phép kiểm $n=2$ sau mệnh đề và đổi số ở "Trong học máy" sang $N=50\,000$, $b=128$ |
| Bài 7 (dấu bằng Markov, Chebyshev; biến nhận giá trị âm) | Định lý 05c.39 nêu điều kiện dấu bằng | câu 1: chấp nhận (tiền lệ Bài 02b–06); đổi đề ở exercises.md là việc riêng, chưa giao; lượt 2 đổi phản ví dụ $Z\ge0$ của ghi chú sang $Z\in\{-3,1\}$ và bỏ việc dựng phân phối đạt dấu bằng ở Bài tập 05c.8 |
| Bài 8 (ba cận $S\ge65$, $70$; thăm dò $\varepsilon=0{,}02$) | Ví dụ 05c.32 ($S\ge60$, $75$), Ví dụ 05c.31 ($\varepsilon=0{,}03$) | khác số liệu; Bài tập 05c.9 (lượt 1 là 05c.10) đổi $\varepsilon$ từ $0{,}02$ sang $0{,}025$ để không trùng đáp số $4612$ |
| Bài 9 (gradient nhóm $\theta=0$, $b=3$; logistic $d=100$) | Ví dụ 05c.16, 05c.35 ($\theta=1$), Ví dụ 05c.36 ($d=1000$), Tình huống 05c.1 ($d=20$) | khác số liệu |
| Bài 10 (mất mát tổng $\eta=0{,}05$; ngân sách $1200$; tập xác thực $\varepsilon=0{,}02$; giả thiết bị vi phạm) | Ví dụ 05c.37 ($\eta=0{,}1$), Ví dụ 05c.39 ($3000$, $300$), Bài tập 05c.11 ($600$), Ví dụ 05c.34 ($\varepsilon=0{,}01$), Mục 6.7 | câu 1–3 khác số liệu; câu 4 trùng ý Mục 6.7: chấp nhận (tiền lệ Bài 02b–06); đổi đề ở exercises.md là việc riêng, chưa giao |

Lượt 2 đã cập nhật mọi nhãn cũ trong `exercises.md` (mục "Sửa kèm ở `exercises.md`").

## Ví dụ và bài tập tự chứa

Mọi khối `example`, `application`, `exercise` dùng số liệu của khối khác đều mở bằng **Dữ kiện.** chép lại hàm, số liệu, tham số và kết quả cần dùng kèm số hiệu nguồn (45 đoạn "Dữ kiện"). Các khối kiểm riêng: Ví dụ 05c.5 (sinh nhật), 05c.10 (xét nghiệm), 05c.16 và 05c.21 (gradient mẫu $2,0,-2$), 05c.17–05c.20 (PMF tổng hai xúc xắc), 05c.24 (Monty Hall), 05c.25 (ví dụ ba quan sát, $\theta_0=0$, $\eta=0{,}1$), 05c.26–05c.28 ($\mathbb ES=7$, $\operatorname{Var}S=35/6$), 05c.33, 05c.36–05c.39; Bài tập 05c.2, 05c.4, 05c.7, 05c.10, 05c.11 (số hiệu lượt 3); Tình huống 05c.1 (chép $\nabla\ell_i=-y_ia_is_i$), 05c.3 (tập lặp, đệ quy). Ví dụ mở đầu của mỗi khái niệm không dựa vào khối khác.

## Hình

| Hình | Dùng ở | Trạng thái |
|---|---|---|
| `birthday-and-batch-duplicates.svg` | Mục 1.4 | giữ |
| `monty-hall-tree.svg` | Mục 2.1 | giữ |
| `test-tree-natural-frequencies.svg` | Mục 2.2 | giữ (nhãn trong hình làm tròn $0{,}0187$) |
| `two-dice-pmf.svg` | Mục 4.3 | giữ |
| `batch-gradient-pmf.svg` | Mục 4.5 | giữ |
| `indicator-dominating-functions.svg` | Mục 5.3 | lượt 2 đổi nhãn ngưỡng $a\to u$ |
| `coin-tail-three-bounds.svg` | Mục 5.6 | đổi nhãn "Định lý F.6" → "cận mũ" |
| `lln-deviation-vs-n.svg` (H-07) | — | bỏ khỏi ghi chú lượt 2 (cắt an toàn); tệp giữ trong kho |
| `sum-vs-mean-contraction.svg` | Mục 6.4 | giữ |
| `stderr-and-cost-vs-b.svg` | Mục 6.5 | giữ |
| `budget-u-curve.svg` | Mục 6.6 | đổi chú giải "B = …" → "ngân sách …", có mẫu nét; xem ảnh chụp đã kiểm |
| `sorted-vs-shuffled.svg` | Tình huống 05c.3 | mới; sinh bằng Python từ đệ quy chính xác, $\theta_0=0$, $\eta=0{,}1$, $b=100$; dải $\pm$ một độ lệch chuẩn $\sqrt{\bar a_{100}(1-0{,}81^k)}\le0{,}0375$ |

Mỗi hình có đoạn đọc hình và `alt` nêu số liệu chính.

## Tự kiểm `no-ai-slop` (eval.md)

| Nhóm kiểm | Kết quả |
|---|---|
| Giữ ý, không thêm khẳng định không nguồn | đạt; mọi số liệu tính lại được, mọi nguồn có chương hoặc mục |
| Từ rỗng, cụm thừa | quét "đáng chú ý", "quan trọng", "rõ ràng", "thực ra", "đơn giản", "nói cách khác", "mấu chốt", "hiển nhiên", "chúng ta", "hãy", "dễ thấy": còn 0 (đã sửa ba chỗ "hiển nhiên") |
| Tương phản nhị phân, câu hỏi tu từ, mở đầu rào đón | không có; các câu hỏi trong bài tập đổi thành yêu cầu "Tính", "Xác định" |
| Colon reveal, kết luận kịch tính, ẩn dụ | không có; dấu hai chấm chỉ dẫn danh sách, công thức hoặc giải thích |
| Lời bình về văn bản ("điều này quan trọng") | không có |
| Đổi từ đồng nghĩa | giữ cố định: "nhóm nhỏ", "gradient nhóm", "rút có hoàn lại", "sai số chuẩn", "sàn nhiễu" |
| Nhịp câu khuôn mẫu | các khối ví dụ dùng cùng nhãn giai đoạn theo quy định của `AGENTS.md`; văn xuôi xen kẽ độ dài câu |
| Gạch ngang dài | không dùng trong văn xuôi (chỉ ở tiêu đề chương) |

## Kiểm tra kỹ thuật đã chạy (lượt 2)

- Script cấu trúc: 171 khối mở = 171 đóng, không lồng; số hiệu liên tục (59, 39, 11, 3, 1); 0 tham chiếu sai loại; 0 đoạn quá bốn câu; 0 chuỗi nội dòng từ ba quan hệ trở lên; không `\text{}` chữ Việt; lệnh KaTeX đều hợp lệ (thêm `\kappa`, `\nu`, `\vartheta`, `\begin{cases}`); quét "hiển nhiên", "chúng ta", "hai vạn", "Một số chương trình": 0.
- `git diff --check` trên `materials/lec-05c` và `img/lec-05c`: sạch.
- Playwright 1600×900 và 390×844, ghi chú: 0 `pageerror`, 0 `.katex-error`, 0 chữ đỏ, 3 256 phần tử KaTeX, 11/11 ảnh, 58 khối gập, không cuộn ngang trang; `exercises.md`: như mục "Sửa kèm". Thông báo CSP của `reloadserver` như lượt 1. Đã xem ảnh chụp Tình huống 05c.1–Mục 5.5 ở 390 px, phần đầu `exercises.md` ở 1600 px, và hình `indicator-dominating-functions.svg` sau đổi nhãn.
- Không chạy `scripts/sync-local-materials.py`.

## Kiểm tra kỹ thuật đã chạy (lượt 1)

- Script tự kiểm (`calc/check.py` trong thư mục tạm): 174 khối mở = 174 đóng, không lồng; bộ đếm chung 59, ví dụ 39, bài tập 12, tình huống 3, thuật toán 1, đều liên tục; 0 tham chiếu sai loại; 0 đoạn văn quá bốn câu; 0 chuỗi nội dòng có từ ba quan hệ trở lên ở mức ngoài cùng; không `\text{...}` chứa chữ Việt; mọi lệnh KaTeX thuộc danh sách hợp lệ (`\Bigl`, `\binom`, `\operatorname`, `\xrightarrow`, `\varrho`…); 12 hình tồn tại.
- `git diff --check` trên `materials/lec-05c` và `img/lec-05c`: sạch.
- Playwright Chromium qua `http://localhost:8765/2627-1/material-viewer.html?doc=materials/lec-05c/lecture-note.md`, 1600×900 và 390×844: 0 `pageerror`; 0 `.katex-error`; 0 phần tử KaTeX màu đỏ `rgb(204, 0, 0)`; 3 227 phần tử `.katex`; không còn `$` hay lệnh `\…` thô trong văn bản hiển thị; 12/12 ảnh tải được; chiều rộng tài liệu 1585 ≤ 1600 và 375 ≤ 390 (không cuộn ngang trang); 60 khối gập (`proof`, `hint`, `solution`) mở được. Ở 390 px, 12 ảnh rộng 900 px nằm trong khung cuộn ngang của đoạn chứa, cùng hành vi với ghi chú Bài 06 (đối chứng cùng phiên). Một thông báo console "Executing inline script violates … Content Security Policy" xuất hiện cả ở Bài 06; đó là đoạn script của `reloadserver`, không phải lỗi trang.
- Ảnh chụp đã xem: 1600×900 phần đầu, Tình huống 05c.3 cùng hình mới, hình ngân sách và hình ba cận; 390×844 Bổ đề 05c.46 (nhãn công thức cuộn theo công thức), hình ngân sách. Ảnh lưu trong thư mục tạm của phiên, không đưa vào kho.
- Không chạy `scripts/sync-local-materials.py` theo brief; `material-local-data.js` chưa cập nhật.

## Độ dài và gói cắt đề xuất (lượt 1; gói cắt bị điều phối viên bác, xem "Phát hiện lượt 1" mục D)

Bản 33 109 từ vượt trần đích 30 000. Đã cắt trong lượt soạn (từ 37 346 từ): bỏ Bài tập cận dưới cho xác suất có lặp, Bài tập phần bù của biến cố độc lập (giữ ý trong gợi ý Bài tập 05c.2), Bài tập số lỗi trên hai mươi ảnh, Mệnh đề tính không nhớ và ví dụ lớp hiếm (giữ một đoạn văn), Ví dụ trả mũ (giữ một câu), Bài tập cận bậc bốn, Ví dụ bảng sai số chuẩn (trùng Ví dụ 05.13), Bài tập nhóm bằng nửa tập dữ liệu, Bài tập chọn bất đẳng thức; rút gọn khoảng 70 đoạn văn.

Gói cắt thêm đề xuất cho điều phối viên, khoảng 3 000 từ, nếu cần đưa về dưới 30 000:

1. Nhận xét 05c.3 và đoạn sau Định nghĩa 05c.1 về mô hình đồng khả năng: gộp còn hai câu (khoảng 150 từ).
2. Ví dụ 05c.15 (bảng đồng thời) gộp vào đoạn sau Định nghĩa 05c.23 vì trùng dữ liệu Ví dụ 05c.9 (khoảng 150 từ).
3. Mệnh đề 05c.19 (tính chất CDF) chuyển thành một đoạn văn không đánh số (khoảng 250 từ).
4. Ví dụ 05c.24 (Monty Hall theo nhánh) thay bằng câu trực giác, giữ Ví dụ 05c.25 (khoảng 200 từ).
5. Nhận xét 05c.16 gộp thành một câu sau Định nghĩa 05c.15 (khoảng 100 từ).
6. Mục 5.6: bỏ hình `lln-deviation-vs-n.svg` và đoạn đọc hình, giữ đoạn so sánh Hoeffding với Chebyshev (khoảng 200 từ).
7. Tình huống 05c.1: bỏ cột Chebyshev với $\varrho^2=0{,}05$ và phần "Nhiều bước" (khoảng 250 từ).
8. Bài tập 05c.9 và 05c.12 của lượt 1 (khoảng 550 từ), vì Bài tập 05c.7 và Ví dụ 05c.39 đã phủ cùng mục tiêu.
9. Rút gọn "Tóm tắt chương" còn danh sách theo mục và công thức (khoảng 300 từ).
10. Ví dụ 05c.14 gộp vào đoạn trực giác Mục 3.3 (khoảng 120 từ), Ví dụ 05c.30 gộp vào chứng minh Định lý 05c.45 (khoảng 150 từ), Ví dụ 05c.18 gộp vào câu dẫn Định lý 05c.28 (khoảng 80 từ).

## Điểm còn phân vân (chuyển điều phối viên và tác tử rà toán)

1. Bổ đề Hoeffding (bản cũ chỉ phát biểu) nay có chứng minh đầy đủ theo hướng Wasserman ch. 4; tác tử rà toán cần kiểm Bước 4 ($\varphi''=\tau(1-\tau)$) và trường hợp suy biến ở Bước 1.
2. Mệnh đề 05c.24 nay có chứng minh cho biến rời rạc; Bước 1 dùng việc cộng (3.5) theo các biến ngoài khối.
3. Số trang Wasserman và Blitzstein–Hwang không kiểm được vì không có PDF; ghi chú chỉ dẫn chương, mục. Các mục dẫn: Wasserman §1.2–1.7, §3.5, §3.6, §4.1, §5.3, §5.4; Blitzstein–Hwang §1.3–1.4, §4.2, §4.4.
4. Hằng số Bài 05b được dẫn qua Nhận xét 05.16 của Bài 05 (dạng phát biểu lại của định lý lồi mạnh), không dẫn nhãn T5 của Bài 05b vì Bài 05b đang được viết lại.
5. Bài 7 câu 1 của `exercises.md` gần trùng điều kiện dấu bằng trong Định lý 05c.39 (kế thừa bản cũ).
6. `exercises.md` và `materials/lec-05/lecture-note.md` dẫn nhãn cũ; chưa sửa theo phạm vi brief.
