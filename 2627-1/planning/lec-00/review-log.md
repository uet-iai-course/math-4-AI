# Nhật ký rà soát Bài 00

## Viết lại theo mẫu SLT và chuẩn 2026-11

Căn cứ: `prompt_fix_lecture_notes_00_07.md` (goal 2026-11-11, quyết định người dùng U1–U4, quyết định chung Q-A đến Q-G), mẫu `planning/notes-10-14-slt-template.md` Q1–Q15, mục "The author's voice" của `../CLAUDE.md`. Báo cáo phân tích đầu vào: `prompt_fix_00_07_audit/m4ai-audit-00-07.md` Phần A (không theo dõi trong git).

### Tác tử (lấy từ lời gọi công cụ `Agent`)

Điều phối viên: phiên chính Claude Opus 5.5 (`claude-opus-5-5`). Mọi tác tử con: `subagent_type: general-purpose`, `model: opus`.

| Vai trò | Effort | Ghi chú |
|---|---|---|
| Lập kế hoạch (chỉ đọc) | medium | `plan.md` 15 phần |
| Soạn, rồi biên tập (cùng một tác tử, tiếp tục bằng `SendMessage`) | medium | ghi chú, `outline.md`, `map-lec-00.md`, SVG chỉ của ghi chú |
| Rà 1/5: sinh viên năm hai | high | 0 chặn, 1 nghiêm trọng, 11 trung bình, 24 nhẹ |
| Rà 2/5: chuyên gia miền | high | 0 chặn, 0 nghiêm trọng, 7 trung bình, 23 nhẹ |
| Rà 3/5: độ chính xác toán | high | 0 chặn, 0 nghiêm trọng, 7 trung bình, 16 nhẹ |
| Rà 4/5: phê bình học thuật–sư phạm, `no-ai-slop` Detect | high | 0 chặn, 0 nghiêm trọng, 25 trung bình, 37 nhẹ |
| Rà 5/5: mạch và liên kết | high | 0 chặn, 0 nghiêm trọng, 7 trung bình, 18 nhẹ |
| Kiểm tra lại: độ chính xác (ba vòng, cùng tác tử) | high | vòng 1: 1 trung bình, 10 nhẹ; vòng 2: 3 nhẹ; vòng 3: 2 nhẹ |
| Kiểm tra lại: mạch và liên kết (ba vòng, cùng tác tử) | high | vòng 1: 1 trung bình, 9 nhẹ; vòng 2: 5 nhẹ; vòng 3: 2 nhẹ |

Báo cáo đầy đủ của từng tác tử nằm trong scratchpad của phiên (không đưa vào kho).

### Quyết định của điều phối viên khi duyệt kế hoạch

- **Q00-1.** Câu hỏi cuối buổi: điểm dừng của $h$ có là cực tiểu toàn cục; cầu nối sang tính lồi của Bài 01.
- **Q00-2.** Giai đoạn 3 được sửa đúng các câu ở Bài 01, 04, 05b, 05c, 06, 06b nói Bài 00 "không đánh số"/"in đậm": chỉ thay phần khẳng định sai bằng số hiệu mới.
- **Q00-3.** Đổi ký hiệu để mỗi ký hiệu một nghĩa khi bỏ in đậm vector: $U,V$ cho biến ngẫu nhiên chung; $G\sim\mathcal N(0,1)$ vô hướng, vector Gauss $Z$; dạng toàn phương $A$; hàm hạn chế $\gamma$; tập mức $\mathcal L_c$; số chiều $n$. Tham số Bernoulli đổi từ $\pi$ sang $\theta$ (Murphy 2022, §2.4) để khỏi trùng hằng số $\pi$ trong mật độ Gauss; giai đoạn 3 sửa ký hiệu ở Bài 05c.
- **Q00-4.** Bài 00 chứng minh đầy đủ phương trình chuẩn và hợp lý cực đại dưới nhiễu Gauss; Bài 01 sẽ dẫn lại bằng số hiệu (Q-D). Bài 05, 12 không đổi.
- **Q00-5.** Thêm Cauchy–Schwarz, phân tích trực giao, thương Rayleigh (Boyd và Vandenberghe 2004, §A.1.1, §A.5.1, §A.5.2) vì các bài sau dẫn chúng là của Bài 00. Không thêm ma trận Vandermonde (không có nguồn cục bộ; xử lý ở Bài 05).
- **Q00-6.** Điều kiện đủ để khả vi và định lý Fubini không có trong Kupferschmid, Boyd Phụ lục A hay Goodfellow: giữ phát biểu của ghi chú cũ, ghi "— ngoài phạm vi, xem Stewart (2016)" (Nhận xét, Định lý tương ứng). Số mục Stewart chưa kiểm ở mức trang vì không có bản cục bộ.
- **Q00-7.** Hai bài tập tự dựng ở lại ghi chú (Bài tập 00.1 ở 5.8, 00.2 ở 8.1).
- **Q00-8.** Ví dụ khoảng cách Mahalanobis thay câu định tính cũ bằng phép tính trên dữ kiện sẵn có ($10/9$ và $10$).
- **Q00-9.** Các phép phân rã ma trận thành tiểu mục `### 4.8. Đọc thêm: các phép phân rã ma trận`, như Bài 12 §8.3, Bài 13 §7.4.
- **Q00-10.** Lệch thứ tự với deck ghi ở mục "Lệch với deck".
- **Q00-11.** Bỏ câu ánh xạ CLO khỏi mục tiêu học tập (Q-C).
- **Q00-12.** Đích độ dài U4 áp dụng bình thường; bản cuối nằm trong đích nên không cần ngoại lệ bài ôn tập.

### Quyết định sau năm lượt rà (hàng đợi vòng 1)

Điều phối viên đối chiếu mọi phát hiện mức trung bình trở lên với bản cố định và tính lại phần toán. **Mọi phát hiện của năm báo cáo: chấp nhận**, với các lựa chọn sau. Phát hiện nhẹ: chấp nhận; người biên tập báo lại các chỗ không áp dụng (dưới).

| Mức độ | Vị trí (bản nháp 1) | Vấn đề | Quyết định |
|---|---|---|---|
| nghiêm trọng | Lời giải Bài tập 00.1, câu 3 | Lý do sai: dưới ngưỡng $0{,}292$ chỉ bảo đảm $f$ giảm; $f(\eta)=4{,}5-34\eta+116{,}5\eta^2$ chỉ giảm trên $(0;34/233]$, $f(0{,}25)\approx3{,}28>2{,}265$ (điều phối viên tính lại) | chấp nhận: lập luận bằng $\eta^\star=34/233\approx0{,}146$ |
| trung bình | Đoạn sau Mệnh đề hợp lý cực đại | "$L$ là phép biến đổi tăng chặt của $f$" sai chiều: $L$ giảm chặt theo $f$; $-\log L$ tăng | chấp nhận |
| trung bình | Bài tập 00.2 | $\sigma=0{,}5$ mâu thuẫn nhiễu $(2,0,0,2)=4\sigma$ | chấp nhận: tách $\sigma$ khỏi $w_{\mathrm{true}}$, $\sigma=0{,}5$ chỉ dùng ở câu 3 |
| trung bình | Câu hỏi mở đầu, 8.3 | Vế "nên dùng dự đoán nào" không có câu trả lời tường minh | chấp nhận: câu chốt ở 8.3 (dự đoán $16$, dải $[14{,}04;17{,}96]$; SSE bằng $0$ không là căn cứ chọn $15{,}75$); $\hat\sigma^2=\mathrm{SSE}/m=1$ theo Murphy (2022), §11.2.3.6, (11.49) |
| trung bình | 6.5, (P1), Định nghĩa độc lập | Độc lập và mật độ đồng thời dùng trước khi định nghĩa; định nghĩa chỉ cho biến rời rạc | chấp nhận: chuyển tiểu mục nhiễu Gauss–hợp lý ra sau định nghĩa độc lập (thành 7.3), tổng quát định nghĩa cho $k$ biến (Murphy 2022, §2.2.4) |
| trung bình | toàn bài | Kết quả các bài sau gán cho Bài 00 nhưng Bài 00 không có (tuyến tính của kỳ vọng; tính chất định thức; công thức tích phân của gradient; Cholesky; $\lVert Ax\rVert\le\max\lvert\lambda\rvert\lVert x\rVert$) | chấp nhận: thêm, mỗi kết quả có nguồn đã kiểm trong text (Goodfellow §3.8 tr. 60; Murphy §2.2.5.1, §7.1.4, §7.6.3; Boyd §9.5.3, §A.5.2, §C.3.2) |
| trung bình | Ví dụ hiệp phương sai | Dùng tiêu chuẩn Sylvester chưa có trong bài | chấp nhận: thay bằng tính trị riêng |
| trung bình | toàn bài | Ký hiệu nhiều nghĩa: $G$, $S$, $L$, $U,V$, $\widetilde X$, $\varrho$, $g$, $\kappa$, $\delta$ | chấp nhận: đổi tên (ánh xạ ngoài $K$; không gian con $\mathcal W$; biến điều kiện $T$; LU viết $PA=NM$; SVD $Q_1SQ_2^T$; phần dư o nhỏ $\zeta$; mô hình mở rộng $X_{\mathrm q},w_{\mathrm q}$) |
| trung bình | "lát cắt" | Hai nghĩa (dọc trục và theo hướng) | chấp nhận: lát cắt chỉ dọc trục; theo hướng là hàm hạn chế |
| trung bình | 10 chứng minh | Thiếu **Lộ trình.** | chấp nhận |
| trung bình | khoảng 12 câu | Khuôn câu lặp "Tác giả (năm), §x, trình bày cùng …" cho kết quả đã chứng minh | chấp nhận: cắt; giữ câu dẫn cho kết quả không chứng minh |
| trung bình | "dải dự đoán"/"dải nhiễu" | Hai tên một đại lượng | chấp nhận: "dải nhiễu" |
| trung bình | §1 | Phân loại nguồn sai lệch mâu thuẫn; thiếu danh sách cố định/ngẫu nhiên | chấp nhận |
| trung bình | 4.8 | Đoạn nối §4→§5 nằm trong tiểu mục Đọc thêm | chấp nhận: chuyển lên cuối 4.7 |
| trung bình | `map-lec-00.md` | Lập từ số hiệu của kế hoạch, lệch bản nháp | chấp nhận: lập lại từ bản cuối |

Phát hiện không áp dụng (người biên tập báo, điều phối viên chấp nhận lý do):
- Nhãn in đậm "**Trong học máy.**": để điều phối viên quyết; vòng 2 quyết bỏ nhãn đậm, mở đoạn bằng "Trong học máy, …" như Bài 10–14.
- Thêm số mục Stewart §14.5: không có bản cục bộ để kiểm.
- Vector $a\in\mathbb R^n$ trong mệnh đề về tổ hợp tuyến tính và diện tích $a_i$: hai ngữ cảnh tách rời, giữ.
- $F$/$F_U$, $u,v$/$U,V$, biến tích phân $y$ ở 5.9: ghi trong bảng ký hiệu.

### Kiểm tra lại vòng 1 và hàng đợi vòng 2

| Mức độ | Vị trí (bản nháp 2) | Vấn đề | Quyết định |
|---|---|---|---|
| trung bình | Tình huống 00.2 | $w_2$ (vector mở rộng) trùng thành phần $w_2$ của $w$; $\phi_{2,i}$ dễ nhầm $\phi_2$ | chấp nhận: $X_{\mathrm q}$, $w_{\mathrm q}$, $\phi_{\mathrm q,i}$; sửa hình `housing-model-comparison.svg` |
| trung bình | cuối 6.5 | "hàm hợp lý" dùng trước định nghĩa | chấp nhận |
| nhẹ | 8.3, `housing-prediction-uncertainty.svg` | Viết $\sigma=\mathrm{SSE}/m$; đúng là $\hat\sigma^2=\mathrm{SSE}/m$ | chấp nhận |
| nhẹ | 8.3 | Câu nói về văn bản "Do đó câu hỏi mở đầu có câu trả lời." | chấp nhận: cắt |
| nhẹ | Mệnh đề tuyến tính của kỳ vọng | Đứng xa chỗ dùng đầu tiên | chấp nhận: chuyển lên đầu 7.4, đánh số lại |
| nhẹ | Định nghĩa độc lập, mật độ đồng thời | Thiếu nguồn; mật độ đồng thời chỉ cho hai biến | chấp nhận: Murphy (2022) §2.2.4 (2.21)–(2.23); Koller và Friedman (2009) §2.1.6.2, Định nghĩa 2.8, tr. 29 |
| nhẹ | Mệnh đề tính chất CDF | Tính liên tục phải, hai giới hạn, độ nhảy không có nguồn | chấp nhận phương án lập luận từ tiên đề cộng tính đếm được (không giáo trình cục bộ nào nêu); tiêu đề khối đổi thành "— phác thảo" |
| nhẹ | các chỗ khác (9 + 10 phát hiện) | thứ tự liệt kê, lặp câu, in nghiêng lần đầu, ký hiệu tích phân, `map-lec-00.md` thiếu lec-05c:23 | chấp nhận |
| — | 10 đoạn | Nhãn in đậm "**Trong học máy.**" | quyết định: bỏ nhãn, mở đoạn "Trong học máy, …" như Bài 10–14 |

### Kiểm tra lại vòng 2 và 3

| Mức độ | Vị trí | Vấn đề | Quyết định |
|---|---|---|---|
| nhẹ | sau Mệnh đề 00.38 | "Bước 2 còn cho …" mất tiền ngữ sau khi chuyển đoạn | chấp nhận: "Bước 2 của chứng minh Mệnh đề 00.38 …" |
| nhẹ | trước Định nghĩa 00.67 | Câu trực giác bị Mệnh đề 00.66 tách khỏi định nghĩa | chấp nhận: chuyển câu |
| nhẹ | Định nghĩa 00.59 | Mật độ đồng thời $n$ chiều cần nguồn; tích phân $n$ lớp chưa định nghĩa | chấp nhận: dẫn Koller và Friedman (2009) §2.1.6.2, Định nghĩa 2.8, tr. 29; thêm vế tích phân trên hình hộp vào Định nghĩa 00.47 và đổi tiêu đề |
| nhẹ | Mệnh đề 00.54 | Nhãn "phác thảo" không có khối phác thảo; "định lý cơ bản của giải tích" chưa có trong tiên quyết | chấp nhận: khối "Phác thảo chứng minh Mệnh đề 00.54" có Lộ trình, bốn bước; bước 4 ước lượng trực tiếp (công thức Newton–Leibniz ở tiên quyết không cho đạo hàm của tích phân, người biên tập báo, điều phối viên chấp nhận); người rà toán xác nhận đúng |
| nhẹ | 4.8, 5.8 | "số điều kiện" in nghiêng sai lần | chấp nhận |
| nhẹ | `housing-prediction-uncertainty.svg` | $\varphi^*$ khác ký hiệu văn bản | chấp nhận: $\phi_{\mathrm{new}}$ |
| nhẹ | phác thảo 00.54 | $\epsilon$ gần $\varepsilon$ (nhiễu) | chấp nhận: đổi thành $\varpi$ |

Không còn phát hiện chặn bàn giao, nghiêm trọng hay trung bình sau vòng 3.

### Độ dài

Ghi chú cũ: 15 418 âm tiết (`wc -w`). Bản nháp 1: 23 732. Bản sau vòng 2: 25 152. Bản cuối: 25 431. Trong đích 20 000–28 000 của U4.

### Nguồn gốc số liệu và đính chính

- Bốn căn nhà (diện tích, số phòng, giá theo đơn vị 100 triệu đồng) và căn nhà mới $65\,\mathrm m^2$ là dữ liệu giả sử của deck Bài 00 (ghi chú cũ và deck dùng cùng số); văn bản sinh viên đọc viết "Giả sử …".
- $\sigma=1$ trong Tình huống 00.1 trùng ước lượng hợp lý cực đại $\hat\sigma^2=\mathrm{SSE}/m=4/4$ của mô hình ba trọng số (Murphy 2022, §11.2.3.6, (11.49)).
- Đính chính so với ghi chú cũ (đã được tác tử rà toán xác nhận): "gần chắc chắn" (cũ dòng 1209), kết luận ở cũ dòng 611, 944, 1022, 1170, $G$ chưa định nghĩa ở cũ dòng 1653; lý do ở Bài tập 00.1 câu 3; chiều đơn điệu của $L$ theo $f$; dữ kiện Bài tập 00.2.

### Giáo trình đã tham khảo theo mục

- §4 Đại số tuyến tính: Boyd và Vandenberghe (2004) Phụ lục A (§A.1.1, §A.5.1–A.5.2, §C.3.2); Goodfellow, Bengio và Courville (2016) ch. 2; Murphy (2022) §7.1–7.6.
- §5 Giải tích nhiều biến: Boyd và Vandenberghe (2004) §A.4, §9.5.3; Goodfellow và cộng sự (2016) §4.3; Kupferschmid; Stewart (2016) cho hai kết quả ngoài phạm vi (Q00-6).
- §6–7 Xác suất: Murphy (2022) ch. 2–3, §11.2.3.6; Koller và Friedman (2009) §2.1; Goodfellow và cộng sự (2016) ch. 3.

### Lệch với deck (Q-F, để đồng bộ deck sau)

- Ký hiệu: vector không in đậm; tham số Bernoulli $\theta$ (deck $\pi$); các đổi tên của Q00-3 và vòng 1.
- Thứ tự: ghi chú mở bằng câu hỏi dùng hai mô hình (deck mạch 2 mở bằng dữ liệu); tiểu mục nhiễu Gauss–hợp lý nằm sau định nghĩa độc lập (deck C10–C13 đặt trong mạch xác suất một biến); hệ phương trình–nghịch đảo đứng sau hạng (deck A04, A05); dạng toàn phương sau ma trận thiết kế (deck A06, A08–A10); tích phân sau mất mát bình phương (deck B12–B13, B14–B18).
- Tên mục: ghi chú "Vector ngẫu nhiên, nhiễu và phân phối nhiều biến"; deck "Véc-tơ ngẫu nhiên …".
- Hình dùng chung với deck không sửa: `calculus-graph-slice-level-set.svg` (chưa có trong ghi chú với ký hiệu mới); `probability-*` dùng chung còn nhãn "p(u)" và "không phải dữ liệu đo".

### Kiểm của điều phối viên và kiểm tra trình duyệt (bản cuối)

- `forward_refs.py`: 0 tham chiếu tiến. Bộ đếm chung 00.1–00.74, Ví dụ 00.1–00.38, Tình huống 00.1–00.2, Bài tập 00.1–00.2 liên tục; không khối lồng; mỗi `exercise` có một `hint` và một `solution`. Grep các mẫu cấm của goal: 0. Đồng bộ học liệu `--check` đạt; `git diff --check` sạch.
- Playwright (Chromium, venv chung), `material-viewer.html?doc=materials/lec-00/lecture-note.md&deck=lecture-00-on-tap-nen-tang-toan-hoc.html`: 1600×900 và 390×844 (cuộn tới cuối), `file://` 1600×900. 0 `.katex-error` (2 821 công thức), 0 lỗi console và trang (trừ cảnh báo CSP của script nạp lại do `reloadserver` chèn), 0 request lỗi, trang không tràn ngang (hình rộng 900 px nằm trong khung cuộn riêng theo `material-viewer-course.css`). Bản in PDF chứa đủ 21 chứng minh và các lời giải đang thu gọn. Điều phối viên đã xem ảnh chụp.
- SVG sửa (chỉ của ghi chú, không có trong deck nào): 14 hình trong `img/lec-00/`; hình dùng chung với deck không sửa.

## Tệp bài tập theo chuẩn 2026-11

Bài 00 trước đây chưa có `exercises.md`. Tệp mới gồm 14 bài giáo trình, Bài tập 00.3–00.16, nối tiếp Bài tập 00.1–00.2 của ghi chú (U2, U3). Liên kết thêm ở §9 của ghi chú và thẻ Bài 00 trong `index.html` (Q-G).

### Tác tử (lấy từ lời gọi công cụ `Agent`; `general-purpose`, `model: opus`)

| Vai trò | Effort | Kết quả |
|---|---|---|
| Lập danh sách bài (chỉ đọc) | medium | 14 bài, đã kiểm số bài và trang trong PDF |
| Soạn, rồi biên tập (cùng tác tử) | medium | `exercises.md`, liên kết ghi chú, thẻ chỉ mục |
| Rà độ chính xác (hai vòng) | high | vòng 1: 0 chặn, 0 nghiêm trọng, 1 trung bình, 5 nhẹ; vòng 2: 2 nhẹ |
| Rà sinh viên năm hai | high | 0 chặn, 1 nghiêm trọng, 6 trung bình, 9 nhẹ |
| Rà sư phạm và văn phong, `no-ai-slop` Detect (hai vòng) | high | vòng 1: 0 chặn, 1 nghiêm trọng, 6 trung bình, 15 nhẹ; vòng 2: 4 nhẹ |

Điều phối viên tự mở PDF kiểm số bài và đề của Kupferschmid 28.9.6, 28.9.10, 28.9.15, 10.9.33; Boyd 2.5, 6.2; Koller 2.1, 2.2; Murphy (2022) 2.6 trước khi duyệt danh sách.

### Danh sách bài và nguồn

| Bài tập | Mức | Nguồn (trang in) | Lời giải trong nguồn |
|---|---|---|---|
| 00.3 Hai tích $AB$, $BA$ | nhận biết | Kupferschmid, Bài 28.9.10, tr. 957 | không |
| 00.4 Tích trong, tích ngoài | nhận biết | Kupferschmid, Bài 28.9.15, tr. 958 (nhãn "(d)" trùng trong sách đổi thành (e)) | không |
| 00.5 Ma trận $3\times3$ hạng 2 | nhận biết | Kupferschmid, Bài 28.9.22(b)(c), tr. 958 | không |
| 00.6 Ma trận đơn vị, ma trận $0$ | nhận biết | Kupferschmid, Bài 10.9.31, tr. 372 | không |
| 00.7 Xác định dương của ma trận $2\times2$ | tính toán | Kupferschmid, Bài 11.7.24(a)(b), tr. 391 (bỏ định thức con và Gerschgorin) | không |
| 00.8 Gradient của $x^TAx$ với $A$ không đối xứng | tính toán | Kupferschmid, Bài 28.9.6, tr. 957 | không |
| 00.9 Xấp xỉ Taylor bậc hai | tính toán | Kupferschmid, Bài 10.9.2, tr. 370 | không |
| 00.10 Hessian Rosenbrock | tính toán | Kupferschmid, Bài 10.9.33, tr. 372, gộp 11.7.22(a), tr. 390 | không |
| 00.11 Tính chất suy từ tiên đề xác suất | chứng minh | Koller và Friedman, Bài 2.1, tr. 39 | không |
| 00.12 Phương sai của tổng | tính toán | Murphy (2022), Bài 2.6, tr. 75 | không |
| 00.13 Xấp xỉ bằng vector hằng theo chuẩn $\ell_2$ | vận dụng | Boyd và Vandenberghe, Bài 6.2, tr. 344 (chỉ phần $\ell_2$) | có |
| 00.14 Khoảng cách hai siêu phẳng song song | vận dụng | Boyd và Vandenberghe, Bài 2.5, tr. 60 (đề nêu định nghĩa khoảng cách hai tập) | có |
| 00.15 Phương trình chuẩn dạng ma trận và dạng vô hướng | vận dụng | Kupferschmid, Bài 8.8.28, tr. 332 (định nghĩa chép từ §8.6.1, tr. 307–308) | không |
| 00.16 Độc lập của hai biến nhị phân | vận dụng | Koller và Friedman, Bài 2.2, tr. 39 | không |

Bài không có lời giải trong `sources/` do tác tử soạn tự giải; tác tử rà toán giải lại độc lập hai vòng (U3). Bản lời giải Boyd in sai phần $\ell_\infty$ của Bài 6.2 ("$(\max-\min)/2$"); bài chỉ dùng phần $\ell_2$. Phản ví dụ ở 00.16(b), (c) do người soạn dựng và người rà toán kiểm. Bài đã loại: Boyd 2.10 (cần tập lồi), Koller 2.11 và Murphy 3.4(a) (trùng kết quả ghi chú), Murphy 2.9, 2.10, 3.1, 3.2 (đã dùng ở Bài 10), Murphy 4.1 (thuộc Bài 11).

### Quyết định

| Mức độ | Vị trí | Vấn đề | Quyết định |
|---|---|---|---|
| nghiêm trọng | mọi bài nhiều bước | Một khối gợi ý; nhiều gợi ý lộ lời giải (Q15) | chấp nhận: `Gợi ý 1`, `Gợi ý 2` tăng dần cho 00.5, 00.7–00.16 |
| trung bình | bảng mục tiêu | Bảng che vế chưa có bài | chấp nhận: tách theo vế, ghi "—" |
| trung bình | 00.5 | Mục tiêu 2 "số nghiệm" không có bài | chấp nhận: thêm câu (c) trên ma trận của sách |
| trung bình | 00.14 | Gán sai mục tiêu 2 | chấp nhận: gán mục tiêu 1 (phép toán trên vector); nhãn vế "tích vô hướng và chuẩn" không có nguyên văn trong mục tiêu 1, giữ vì là phép toán trên vector của mục tiêu đó |
| trung bình | 00.12 | Gợi ý nêu đường tắt qua Mệnh đề 00.68 (lặp ghi chú) | chấp nhận: bỏ đường tắt |
| trung bình | 00.9, 00.16(c), 00.6 | Ký hiệu điểm khai triển; biến nhị phân; "ma trận không" đọc nhầm | chấp nhận |
| nhẹ | 00.16(b) | Phản ví dụ giữ $V$ nhị phân trái đề | chấp nhận: hai biến ba giá trị |
| nhẹ | 00.15, 00.16 | Đề xuất đổi mức | bác bỏ: giữ phân mức và số hiệu đã duyệt |
| nhẹ | bảng, vế "độc lập" ở mục tiêu 5 | Vế không có nguyên văn trong mục tiêu | giữ: độc lập là quan hệ giữa phân phối đồng thời và phân phối biên của mục tiêu 5 |
| nhẹ | các chỗ khác | dẫn Định lý 00.12, Hessian đối xứng, "tăng chặt", tên tiếng Anh, dấu `\"` thừa, câu gợi ý 00.16(b) | chấp nhận |

### Mục tiêu không có bài giáo trình

Mỗi mục tiêu 1–6 có ít nhất một bài (ghi chú hoặc tệp). Các vế sau không có bài giáo trình phù hợp trong nguồn U3 không trùng Bài 10–11: ma trận Jacobian; kỳ vọng và phương sai từ PMF, PDF, CDF; hợp lý cực đại dưới nhiễu Gauss dẫn tới bình phương nhỏ nhất; công thức Bayes (Murphy 2.9 đã dùng ở Bài 10); điều kiện dùng bình phương nhỏ nhất tổng quát; quá khớp khi số trọng số bằng số mẫu. Phân biệt nhiễu với phần dư và dải nhiễu dựa vào Bài tập 00.2 của ghi chú; các vế còn lại dựa vào ví dụ có lời giải trong ghi chú.

## Cập nhật dẫn chiếu tới Bài 00 sau khi đánh số (giai đoạn 3)

Tác tử ánh xạ dẫn chiếu: `general-purpose`, `model: opus`, effort `medium` (lấy từ lời gọi công cụ), tiếp tục một lần bằng `SendMessage` để sửa ba chỗ điều phối viên trả lại.

- 63 chỗ (60 dòng) dẫn Bài 00 theo tên mục ở 10 ghi chú (01, 02, 03, 04, 05, 05b, 05c, 06, 06b, 11) đổi sang số hiệu mới theo `map-lec-00.md` (cột "Trạng thái giai đoạn 3"). Không tệp `exercises.md` nào dẫn Bài 00. Deck chỉ nhắc "Bài 00" theo khái niệm, không dẫn tên mục hay số hiệu: không sửa deck.
- Theo Q00-2 (mở rộng khi duyệt diff): sửa phần khẳng định đã thành sai về Bài 00 ở lec-01:29 ("Khác với Bài 00, …"), lec-04:22, lec-05b:18, lec-05c:21, lec-05c:23 ("không chứng minh các quy tắc tính" → chứng minh ở Mệnh đề 00.57, 00.61), lec-06:18, lec-06b:22, lec-05c:577 (ký hiệu của Mệnh đề 00.61), lec-05c:819 (Bài 00 viết $p_U$); theo Q00-3: lec-05c:885 tham số Bernoulli $\theta$.
- Quyết định khi duyệt diff: lec-01:1599 dẫn Định nghĩa 00.30 thay Mệnh đề 00.33 (hướng $y-x$ không đơn vị; Mệnh đề 00.38 đòi $C^2$, chứng minh ở Bài 01 chỉ giả thiết khả vi) — `chấp nhận`.
- Không gán số: lec-05:26 (ma trận Vandermonde không có ở Bài 00; giữ nguồn Strang); lec-04:35 ($Q^{1/2}\succ0$ nằm ở đoạn đọc không đánh số sau Định nghĩa 00.25). Ghi để Bài 04, 05 xử lý khi viết lại.
- Điều phối viên kiểm diff (word-diff): chỉ phần dẫn và các câu nêu trên đổi; mọi số được dẫn tồn tại, đúng loại khối và đúng nội dung câu dẫn (đối chiếu tiêu đề 34 khối được dẫn). Đồng bộ học liệu `--check` đạt, `git diff --check` sạch. Viewer (`file://`, 1600×900) mở 10 ghi chú đã sửa: 0 `.katex-error`, 0 lỗi console.

## Sửa ký hiệu vector toàn một (2026-11-12)

`\mathbb 1` hiển thị thành chữ số "1" thường trong KaTeX; đổi thành `\mathbf 1` (ngoại lệ của quy ước vector không in đậm). Chi tiết và số chỗ đổi ở `planning/lec-02/review-log.md`, mục "Sửa chung Bài 00–02: vector toàn một".
