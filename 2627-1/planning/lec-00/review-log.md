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

## Rà soát deck theo quy tắc deck hiện hành và đối chiếu ghi chú viết lại (2026-11-13)

**Bối cảnh.** Ghi chú bài giảng và tệp bài tập được viết lại, đánh số lại ngày 2026-11-12; deck chưa cập nhật theo. Đợt này chỉ đọc: kiểm deck theo `AGENTS.md` §"Cấu trúc bộ trang chiếu mặc định" đến §"Văn phong và mật độ mặt trang chiếu", `CLAUDE.md` của học phần và mục "The author's voice" của `../CLAUDE.md`, rồi đối chiếu deck với `materials/lec-00/`.

**Tác tử (theo lời gọi công cụ).** Vai trò: rà soát chỉ đọc (quy tắc deck và đối chiếu ghi chú), một tác tử cho cặp Bài 00–01; loại `general-purpose`, mô hình `opus` (Opus 5.5), effort `high`; `no-ai-slop` chế độ Detect. Không ghi tệp, không commit. Điều phối viên chạy trước một lượt quét cơ học (số mạch, trang tiêu đề mạch, `<style>`, inline style, nhãn cấm, số âm tiết thô) và giao kết quả cho tác tử kiểm lại.

**Quyết định của điều phối viên:** **chấp nhận** báo cáo làm danh sách việc cần sửa, sau khi kiểm lại các phát hiện ghi dưới đây trên tệp gốc. Mọi phát hiện ở trạng thái **mở**; deck chưa được sửa.

**Kết luận:** cần sửa. Ký hiệu, thứ tự khái niệm và căn cứ của $\sigma=1$ chưa đồng bộ với ghi chú viết lại ngày 2026-11-12; mặt trang còn câu xuất xứ dữ liệu và một câu chỉ đường. Phần lớn các lệch B đã được ghi ở mục "Lệch với deck (Q-F)" của nhật ký này và `outline.md:73-80`, nhưng deck chưa sửa theo.

**Điều phối viên kiểm lại:** E04 "$\sigma=1$ chọn để minh họa" (deck) đối với `lecture-note.md:2335` ($\hat\sigma^2=\mathrm{SSE}/m=4/4$); H01 "Dữ liệu được tạo để tính thủ công." (1 lần); "véc-tơ" 33 lần trên deck. Đúng như báo cáo.

| mức độ | trang chiếu | vấn đề | bằng chứng | đề xuất sửa |
|---|---|---|---|---|
| nghiêm trọng | E04 | Lệch ghi chú: căn cứ của $\sigma=1$ ngược với ghi chú. | deck html:121 "$\sigma=1$ chọn để minh họa"; ghi chú diễn giả "giả định minh họa, không ước lượng từ bốn mẫu"; `lecture-note.md:2335` "$\sigma^2=1$ trùng ước lượng hợp lý cực đại $\hat\sigma^2=\mathrm{SSE}/m=4/4$" | "Giả thiết: … $\sigma=1$, bằng $\hat\sigma=\sqrt{\mathrm{SSE}/m}$"; bỏ vế "không ước lượng" |
| trung bình | C10–C13, D06 | Lệch ghi chú và quy tắc: hàm hợp lý dùng tính độc lập trước khi định nghĩa; mặt trang có câu chỉ đường. | html:95 "Lưu ý: $\varepsilon_i$ độc lập khi … (xem mạch 6)"; ghi chú đặt nhiễu–hợp lý ở 7.3, sau Định nghĩa 00.62 | Chuyển C11–C14 sang mạch 6 sau D06 (như ghi chú); bỏ "(xem mạch 6)" |
| trung bình | toàn deck | Lệch ghi chú: ký hiệu. | Deck in đậm $\mathbf X,\mathbf w,\boldsymbol\phi$, ghi chú (dòng 99) không in đậm; C04 tham số Bernoulli $\pi$ / Định nghĩa 00.51 dùng $\theta$; C03–C09 dùng $X$ cho biến ngẫu nhiên / ghi chú dùng $U$ ("$X$ chỉ dùng cho ma trận thiết kế"); $D_{\mathbf u}h$ / $D_dh$; $\mathbf H_h$ / $\nabla^2h$; $J$ / $J_{\mathrm{GLS}}$; $\widetilde{\mathbf w}$ / $w_{\mathrm q}$; $g$ (hàm ngoài) / $\chi$ ($g$ dành cho gradient) | Đồng bộ theo bảng ký hiệu §2 của ghi chú |
| trung bình | toàn deck | Lệch ghi chú: thuật ngữ. | Deck "véc-tơ" (33 lần); ghi chú Bài 00, ghi chú và deck Bài 01 viết "vector"; tên mạch 6 khác tên mục 7 | Đổi sang "vector"; đặt tên mạch 6 theo mục 7 |
| trung bình | P01, B16–B17, E07 | Lệch ghi chú: thiếu nội dung lõi. | Ghi chú 6 mục tiêu, deck 4: thiếu Bayes/hiệp phương sai/GLS (mục tiêu 5) và "phân loại điểm dừng bằng Hessian" (mục tiêu 3); deck không có Định lý 00.42, 00.43, 00.16 mà Bài 01 dựa vào (lec-01 note:3, 52-60) | Thêm mục tiêu; thêm trang "điều kiện cần bậc nhất / bậc hai" ở mạch 4 và một dòng trong bảng tổng kết E07 |
| trung bình | H01; ghi chú diễn giả H01, H03, D02, E04, E05 | Quy tắc (văn phong tác giả): câu xuất xứ dữ liệu, rào đón. | html:26 "Dữ liệu được tạo để tính thủ công."; notes "dữ liệu tổng hợp cho mục đích sư phạm, không phải bằng chứng…", "trường hợp biên minh họa…, không phải bằng chứng", "Nguồn: Ví dụ tự xây dựng" | Xóa; xuất xứ ghi vào nhật ký này |
| trung bình | H01, A01, B01, C01, E01 | Quy tắc (tập trung của mạch): trang nội dung đầu mạch không có "Nhu cầu:" nêu câu hỏi của mạch. | A01 "Nhu cầu: biết kiểu và kích thước…" không phải câu hỏi của mạch 3 | Thêm dòng "Nhu cầu:" lấy từ dòng dẫn trang tiêu đề mạch |
| trung bình | A05, A06, C03, C05 | Quy tắc (hành trình khái niệm): mở bằng định nghĩa, chưa có nhu cầu hay trực quan. | A05 "Định nghĩa." ở dòng đầu; A06 "Cho $\mathbf Q$… Định nghĩa." | Thêm "Nhu cầu:" hoặc "Trực quan." trước định nghĩa (ghi chú 6.2 có "dụng cụ đo") |
| trung bình | B12–B13; E02–E05 | Quy tắc (tập trung của mạch): tích phân không phục vụ câu hỏi mạch 4; mạch 7 trộn nội dung mới (Định nghĩa quá khớp) với tổng kết và tài liệu đọc. | html:69-70, 122, 125 | Chuyển tích phân sang đầu mạch 5; tách tổng kết E07 thành mạch kết luận, hoặc ghi ngoại lệ |
| trung bình | E05 | Quy tắc (mật độ): một dòng 33 âm tiết, hai câu. | "Định nghĩa. Quá khớp … SSE huấn luyện thấp hơn không chứng minh…" | Giữ định nghĩa, chuyển câu thứ hai vào ghi chú diễn giả |
| trung bình | (kế hoạch) | Quy tắc: không có `planning/lec-00/storyboard.md`. | `planning/lec-00/` chỉ có map, outline, review-log (storyboard cũ nằm ở `2627-1/lecture-00-storyboard.md`) | Lập storyboard theo khuôn hiện hành |
| nhẹ | E00 | Ghi chú diễn giả tự mâu thuẫn. | "Bảng tổng kết giả thiết và tài liệu đọc chuyển sang Bài 01", nhưng E07 có bảng tổng kết | Bỏ câu |
| nhẹ | B18, B19L | Lệch ghi chú: phát biểu yếu hơn (5.1), thuật ngữ khác. | "khi đổi bước, cần tính lại $f$"; ghi chú (5.1): $f$ giảm khi và chỉ khi $0<\eta<2\eta^\star$; "bước gradient" / "bước hạ gradient" | Nêu $\eta^\star=\lVert g\rVert^2/\lVert Xg\rVert^2\approx0{,}146$; dùng "hạ gradient" |
| nhẹ | C07, B05 | Lệch ghi chú: điều kiện và định nghĩa. | C07 đặt "$\mathbb E\lvert X\rvert<\infty$" trong chính định nghĩa $\mathbb E$ (vòng); ghi chú dùng $\sum\lvert u\rvert p<\infty$; B05 lấy $\nabla h^T\mathbf u$ làm định nghĩa, ghi chú định nghĩa bằng giới hạn (00.32) | Theo Định nghĩa 00.55 và 00.32 |
| nhẹ | C12, E02, D06 | Quy tắc: tương phản nhị phân, nhận xét bên lề. | "Gauss là giả thiết mô hình, không phải kết luận từ bốn mẫu."; hai câu "Lưu ý: … nhân quả" | "Giả thiết: nhiễu Gauss."; bỏ các nhận xét nhân quả |

**Đã kiểm, không lỗi:** số liệu B05–B19L, C12, D08, D10B, E03–E05 tính lại khớp ghi chú. Cấu trúc: 7 mạch, trang tiêu đề mạch đúng số, `id`, dòng dẫn.

## Sửa deck theo bảng phát hiện 2026-11-13

**Căn cứ.** Quyết định G1–G10 và D00 của điều phối viên (2026-11-13); bảng phát hiện ở mục trên; `AGENTS.md` §"Cấu trúc bộ trang chiếu mặc định" đến §"Tiêu chuẩn trình bày và khả năng đọc"; mục "Deck structure and content" của `CLAUDE.md` học phần; mục "Writing course content" và "The author's voice" của `../CLAUDE.md`. Chuẩn nội dung: `materials/lec-00/lecture-note.md` và `exercises.md` (chỉ đọc). `no-ai-slop` chế độ Edit cho mặt trang và ghi chú diễn giả.

**Tác tử.** Vai trò: biên tập (worker), một tác tử, ghi `lecture-00-on-tap-nen-tang-toan-hoc.html`, `planning/lec-00/storyboard.md` (tạo mới), `outline.md`, mục này. Loại, mô hình và effort do điều phối viên ghi từ lời gọi công cụ. Không commit.

**Kết quả.** 89 → 93 trang; 7 mạch giữ nguyên. Thêm B11A, B11B, B11C (điều kiện tối ưu) và C14L (lời giải). Chuyển: A08–A10 lên trước A05; A04 sau A05B; A06 sau A12; B12–B13 sang mạch 5; C10 lên đầu mạch 5; C11, C13, C14 sang mạch 6 sau D06; A11 sang mạch 7 trước E05. Không bỏ hay gộp trang. Mã trang giữ nguyên (G7). Chi tiết từng trang trong `storyboard.md`.

**Xuất xứ số liệu (G6).** Bốn căn nhà $(40,1,11)$, $(50,2,12)$, $(60,2,14)$, $(70,3,19)$, bảng $p_{U,V}$ $0{,}30/0{,}20/0{,}10/0{,}40$, các ma trận $\begin{bmatrix}1&0{,}5\\0{,}5&1\end{bmatrix}$ và $\begin{bmatrix}1&0{,}8\\0{,}8&1\end{bmatrix}$, hàm $h$, $F$ là số liệu học phần dựng để tính tay, lấy từ ghi chú bài giảng (Ví dụ 00.1, 00.15, 00.32, 00.37, 00.38). Các câu xuất xứ trên mặt trang và trong ghi chú diễn giả đã bỏ.

**Tính lại các số đổi hoặc mới.** $\eta^\star=34/233\approx0{,}1459$, $2\eta^\star\approx0{,}292$; $Xg=(10{,}5;2{,}5;-2{,}5;-10{,}5)$, $\lVert Xg\rVert^2=233$; $f(w^{(0)}-\eta g)=4{,}5-34\eta+116{,}5\eta^2$ cho $2{,}265$ ($\eta=0{,}1$) và $3{,}09125$ ($\eta=0{,}05$). Điểm dừng của $h$: $(-6/7,5/7)$, $h=-8/7$, giá trị riêng $3\pm\sqrt2\approx1{,}59;\,4{,}41$. $\lVert\phi_1\rVert_2=4{,}25^{1/2}\approx2{,}06$. $\rho=0{,}1/0{,}06^{1/2}\approx0{,}408$; giá trị riêng của $\Sigma_Z$ $0{,}345$ và $0{,}145$. Gauss $\rho=0{,}8$: $10/9$, $10$, tỉ số $e^{40/9}\approx85$. Bài tập 00.2: $\varepsilon=(2,0,0,2)$, $X^T\varepsilon=(4,0,0)$, dải $\sigma=0{,}5$: $[15{,}02;16{,}98]$. $s=u^2-v^2$: Hessian $\operatorname{diag}(2,-2)$ bất định dấu. Taylor của $h$ tại $(0,1)$: $0{,}21$; $\nabla\ell(0,1)=(0,2)$. Mọi số khớp ghi chú.

| phát hiện | xử lý | trang | ghi chú |
|---|---|---|---|
| F1 nghiêm trọng: căn cứ của $\sigma=1$ ngược ghi chú | sửa: "Giả thiết: (P1) với $\sigma^2=1$, bằng $\hat\sigma^2=\mathrm{SSE}/m=4/4$"; ghi chú diễn giả dẫn Murphy §11.2.3.6, bỏ vế "không ước lượng từ bốn mẫu" | E04 | viết bằng phương sai để tránh căn bậc hai trên mặt trang |
| F2 trung bình: hợp lý dùng độc lập trước định nghĩa; "(xem mạch 6)" | sửa: C11, C13, C14 (+C14L) chuyển sang mạch 6 sau D06; D06 định nghĩa độc lập cho $k$ biến và có "Nhu cầu:" nối sang hợp lý; bỏ câu chỉ đường; C12 thành trang Gauss một biến ở mạch 5 theo §6.5 | C11, C12, C13, C14, D06 | — |
| F3 trung bình: ký hiệu lệch bảng §2 | sửa toàn deck: bỏ in đậm; $X$ chỉ cho ma trận thiết kế, biến ngẫu nhiên $U$, $V$; $\pi\to\theta$; $D_{\mathbf u}h\to D_dh$; $\mathbf H_h\to\nabla^2h$; $J\to J_{\mathrm{GLS}}$; $\widetilde{\mathbf w}\to w_{\mathrm q}$; $g\to\chi$; $\varphi\to\gamma$; $Q,d\to A,x$ ở dạng toàn phương; $G,\Sigma_G\to Z,\Sigma$ ở Gauss nhiều biến; bỏ $\Phi$; nhãn SVG nội tuyến (A13, C04, C12, D09) đổi theo | toàn deck | ký hiệu vi phân $\mathrm dh$, $\mathrm dr$ (ghi chú không dùng) bỏ ở B06, B14 |
| F4 trung bình: "véc-tơ"; tên mạch 6 | sửa: "vector" (42 chỗ); tên mạch 5 "Xác suất một biến", mạch 6 "Vector ngẫu nhiên, nhiễu và phân phối nhiều biến" theo mục 6, 7 | P02, C00, D00, toàn deck | — |
| F5 trung bình: thiếu mục tiêu và Định lý 00.42, 00.43, 00.16 | sửa: P01 năm dòng phủ sáu mục tiêu (75 âm tiết); thêm B11A (Định lý 00.42), B11B (Định lý 00.43), B11C (Ví dụ 00.20–00.21); B17 kết luận bằng điều kiện bậc hai; E07 thêm dòng cực tiểu địa phương chặt; D05 phát biểu Bayes tổng quát với tiên nghiệm, hậu nghiệm | P01, B11A–B11C, B17, D05, E07 | Định lý 00.16 dẫn trong ghi chú diễn giả A06 (trị riêng của $X^TX$); không thêm trang trị riêng vì Bài 00 là bài ôn và mục tiêu không đo phân rã |
| F6 trung bình: câu xuất xứ, rào đón | sửa: bỏ "Dữ liệu được tạo để tính thủ công.", "dữ liệu tổng hợp cho mục đích sư phạm…", "trường hợp biên minh họa…", mọi "Nguồn: Ví dụ tự xây dựng/tự tính", "Bài tập tổng hợp từ…"; nguồn trỏ khối của ghi chú | H01, H03, D02, E04, E05 và các trang có nguồn tự dựng | xuất xứ ghi ở đoạn trên |
| F7 trung bình: trang đầu mạch thiếu "Nhu cầu:" nêu câu hỏi mạch | sửa: thêm "Nhu cầu:" lấy từ dòng dẫn | H01, A01, B01, C10 (đầu mạch 5), D01, E01 | — |
| F8 trung bình: mở bằng định nghĩa | sửa: A05 thêm "Nhu cầu:" và "Trực quan." ($Xw$ là tổ hợp các cột); A06 "Nhu cầu:" theo §4.6; C03 "Trực quan." (dụng cụ đo, §6.2); C05 "Nhu cầu:" (xác suất từng điểm bằng $0$) | A05, A06, C03, C05 | — |
| F9 trung bình: tích phân lạc mạch 4; mạch 7 trộn nội dung mới với tổng kết | sửa: B12–B13 sang mạch 5 ngay trước C05 (đề xuất là "đầu mạch 5"; đặt cạnh hàm mật độ vì đó là nơi dùng); B00 đổi từ khóa. Mạch 7: ghi ngoại lệ trong `storyboard.md` (mạch 7 là mạch kết luận; tách mạch thứ tám vượt trần 7 mạch) | B00, B12, B13, E00–E07 | — |
| F10 trung bình: E05 một dòng 33 âm tiết | sửa: khung chỉ giữ Định nghĩa 00.74; câu SSE chuyển vào ghi chú diễn giả | E05 | 53 → 44 âm tiết |
| F11 trung bình: thiếu `storyboard.md` | sửa: lập `planning/lec-00/storyboard.md` theo khuôn hiện hành (bảng mạch có câu hỏi trung tâm, bản đồ hành trình, 93 mục) | — | storyboard cũ giữ nguyên (D00) |
| F12 nhẹ: ghi chú E00 tự mâu thuẫn | sửa: bỏ câu "chuyển sang Bài 01" | E00 | — |
| F13 nhẹ: phát biểu yếu hơn (5.1); "bước gradient" | sửa: B18 nêu $\eta^\star=34/233\approx0{,}146$ và $f$ giảm khi và chỉ khi $0<\eta<2\eta^\star$; "hạ gradient" ở B18, B19, B19L, E06 | B18, B19, B19L, E06 | — |
| F14 nhẹ: điều kiện vòng ở kỳ vọng; định nghĩa đạo hàm theo hướng | sửa: C07 theo Định nghĩa 00.55 ($\sum\lvert u\rvert p_U<\infty$); B05 định nghĩa bằng giới hạn (00.32), công thức $\nabla h^Td$ là mệnh đề (00.33) | C07, B05 | — |
| F15 nhẹ: tương phản nhị phân, nhận xét bên lề | sửa: bỏ "Gauss là giả thiết mô hình, không phải kết luận từ bốn mẫu"; bỏ hai "Lưu ý:" nhân quả (E02, D06) và câu nhân quả trong ghi chú B15 | C12, E02, D06, B15 | — |

**Sửa thêm ngoài bảng.**

- Bỏ `\text{…}` tiếng Việt trong KaTeX (A14, B17, C05): 36 cảnh báo console "No character metrics" về 0.
- Thay $\sqrt{\cdot}$ trên mặt trang bằng lũy thừa $1/2$ (A02, B10, C08, C12, D08): hình SVG của dấu căn trong KaTeX rộng 400em và bị `deck_check.py` tính là OVERFLOW ở năm trang trước đợt sửa.
- A06, E07 tràn khung 16:9 sau khi thêm nội dung: rút chữ (A06 bỏ tên tiếng Anh sang ghi chú, ví dụ viết một dòng; E07 rút ô bảng, bỏ dòng gradient không có giả thiết riêng).
- Bài tập: B19 bỏ câu tích phân (chuyển sang C09), thêm câu phân loại điểm dừng; C09 thêm câu dải $0{,}95$ của $\mathcal N(16,1)$; C14 thay bốn câu hỏi bằng lời bằng Bài tập 00.2 câu 1–2; E06 câu 4 thành Bài tập 00.2 câu 3 (câu cũ trùng C14).
- Ghi chú diễn giả: bỏ các câu chỉ đường ("ở mạch sau", "sẽ", "xem mạch 6", "trang bất định của giá") và các khẳng định về trạng thái của văn bản.

**Kiểm tra.** `deck_check.py --shots` (server 8810): 93 trang, console 0, pageerror 0, request lỗi 0, KaTeX lỗi 0, OVERFLOW 0; cờ còn lại: `P02` LINES (ngoại lệ 7 dòng, ghi trong storyboard); NARROW-H ở các trang có công thức hoặc bảng rộng (vùng cuộn ngang có gợi ý, `docScrollW` bằng bề rộng 390 px ở mọi trang; có từ trước đợt sửa). Đã xem ảnh 1600×900 của A06, E07, B05, B11A–B11C, B14, B18, C03, C07, C12, C13, C14L, D06, D09, D10, E04, E05 và ảnh 390×844 của A05, B11C, C12, C13, D10, D10B, E07. `git diff --check` sạch.

**Đề nghị sửa ghi chú.** Không có.

### Lượt sửa sau kiểm lại

**Căn cứ.** Danh sách 27 mục đã duyệt và quyết định của điều phối viên trong `tools/courses/math-4-AI/2627-1/deck-fix-2026-11-13/merge-00.md` (kiểm lại toán và kiểm lại mạch). Cùng tác tử biên tập, cùng phạm vi tệp; không commit.

**Quyết định điều phối viên đã thực hiện.** Hoàn lại dấu căn $\sqrt{\cdot}$ ở A02, B10, C08, C12, D08 (và ghi chú D11); cờ OVERFLOW của `deck_check.py` trên phần SVG của dấu căn KaTeX là báo nhầm, được chấp nhận. Mục "Sửa thêm ngoài bảng" ở trên về lũy thừa $1/2$ không còn hiệu lực.

| mục | xử lý | trang |
|---|---|---|
| 1 | dòng dải nhiễu: "(P1), $\sigma$ đã biết; $w=w_{\mathrm{LS}}$" | E07 |
| 2, 23 | ghi chú: "nhiễu Gauss độc lập, cùng phương sai"; khung OLS/GLS chuyển vào ghi chú | E01 |
| 3 | "một bước hạ gradient" | E06 |
| 4, 26 | "$w$ không duy nhất"; ghi chú định nghĩa $\operatorname{Ker}(X)$, nêu $\operatorname{Ker}(X)=\{0\}$ (Ví dụ 00.6) | A14 |
| 5 | "Cho $h\in C^2$ trên một tập mở chứa $x$" | B10 |
| 6 | vế phải $c$; $\operatorname{Col}(A)=\{Ax:x\in\mathbb R^n\}$ | A04, A05B |
| 7 | $0{,}4$ bọc `{,}` | D08 (ghi chú) |
| 8 | bộ số có thập phân dùng ";" (32 bộ, bằng script trên các khối KaTeX, đã duyệt danh sách) | A02, A15, A15L, B06, B11, B15, B18, B19, C14, E05, E06L và các ghi chú liên quan |
| 9 | giữ $\Sigma_Z$, lý do ghi trong storyboard | D08 |
| 10 | nhãn hình $p_V(v)$, $F_U(t)=t/2$ | C04, C06 |
| 11 | hình: trục tung tại $x=0$, $\psi(0)=1$, $\psi(1)=3$ đúng tỉ lệ (chiều cao 40 và 120 đơn vị SVG), thêm nhãn 1, 3 | B12 |
| 12, 16 | B13 gộp vào ghi chú diễn giả B12 (`gộp`); C09 câu 2 thành $\int_0^2u^2p_U(u)\,du=4/3$ | B12, B13, C09 |
| 13 | "khác với ví dụ căn 2 (Ví dụ 00.35)" | C14 |
| 14 | D07 thêm "Nhu cầu:" (từ (P1) sang nhiễu tương quan); D08 thêm "Trực quan." (§7.4); $\rho$ viết một dòng để hết tràn 84 px | D07, D08 |
| 15 | dòng dẫn và "Nhu cầu:" thêm "và chọn giữa hai mô hình"; A11 thêm "Nhu cầu:", bỏ khung lặp vector đặc trưng | E00, E01, A11 |
| 17 | thêm "Trực quan.": tập $q(x)=\tau>0$ là elip với $A=\operatorname{diag}(1,4)$ | A06 |
| 18 | ghi ngoại lệ trong storyboard (bài ôn tập, các bước chung một trang) | A04, A05, A05B, A06, B03D–B06, C01, C03–C05, D04–D06 |
| 19 | "Nhu cầu:" lặp đủ câu hỏi mạch; storyboard sửa câu hỏi mạch 4 | A01, D01, B00, B01 |
| 20 | ghi chú mở bằng bài toán $\min\tfrac12\lVert Xw-y\rVert_2^2$ | A13 |
| 21 | câu 4 thành Bài tập 00.10(b)–(c) (Rosenbrock); lời giải trong ghi chú: $200(z_2-2z_1)^2+2z_1^2>0$ | B19 |
| 22 | "Trực quan." dùng $\tfrac12\Delta^T\nabla^2h(x^*)\Delta$ | B11B |
| 24 | "Nhu cầu: viết phân phối đồng thời của bốn nhiễu từ các phân phối biên." | D06 |
| 25 | ghi chú thêm kiểm số $-\log L(w^{(0)})+\log L(w_{\mathrm{LS}})=(9-4)/2=2{,}5$ với $\sigma=1$ | C13 |
| 27 | cắt câu tự mô tả P01, câu ký hiệu B08, C03; B03D dẫn Nhận xét 00.31; H04, H05 viết lại câu nhân quả trực tiếp | P01, B03D, B08, C03, H04, H05 |

**Kiểm tra.** `deck_check.py --shots --out …/check-00/r1`: 92 trang, console 0, pageerror 0, request lỗi 0, KaTeX lỗi 0. OVERFLOW chỉ còn ở A02, B10, C08, C12, D08 và đều là phần tử SVG của dấu căn KaTeX (báo nhầm đã được chấp nhận); không trang nào tràn thật. `P02` LINES là ngoại lệ đã ghi. Đã xem ảnh 1600×900 của A06, A11, B12, B19, C04, C06, D07, D08 và ảnh 390×844 của A06, A11, B12, C04, D08. Storyboard: 92 mục khớp thứ tự DOM. `git diff --check` sạch.

**Lượt sửa 2 (bốn chỗ nhẹ sau rà nhanh).** Ghi chú C09: nguồn câu 2 dẫn Ví dụ 00.31 thay 00.24. Storyboard, bản đồ hành trình: hàng "Dạng toàn phương" ghi trực quan A06 (elip $q(x)=\tau$), bỏ câu "gộp"; hàng hiệp phương sai ghi nhu cầu D07, D09, D10 và trực quan D08, D09; hàng hợp lý thêm ví dụ ở ghi chú C13 ($2{,}5$). `git diff --check` sạch.

### Kiểm lại và duyệt của điều phối viên (2026-11-13)

| Vai trò | Loại tác tử | Mô hình | Effort | Kết luận |
|---|---|---|---|---|
| Người sửa | `general-purpose` | `opus` (Opus 5.5) | medium | Sửa theo bảng; hai lượt sửa sau kiểm lại |
| Kiểm lại A (toán học) | `general-purpose` | `opus` (Opus 5.5) | high | cần sửa (E07 mất giả thiết Gauss, trung bình) → đạt |
| Kiểm lại B (mạch truyện, `no-ai-slop` Detect) | `general-purpose` | `opus` (Opus 5.5) | high | cần sửa (hành trình hiệp phương sai, câu hỏi mạch 7, B13, A06) → đạt |

Quyết định của điều phối viên: lập `planning/lec-00/storyboard.md` mới theo khuôn hiện hành (bản cũ `2627-1/lecture-00-storyboard.md` giữ nguyên); mạch 7 định vai thành mạch kết luận (như Bài 01); Định lý 00.16 chỉ dẫn trong ghi chú diễn giả A06; **yêu cầu sửa** việc người sửa đổi $\sqrt{\cdot}$ thành lũy thừa $1/2$ để né cờ OVERFLOW báo nhầm — đã hoàn lại.

Kiểm của điều phối viên: đọc diff; 92 trang; `deck_check.py` (cổng 8810): 0 lỗi console, 0 lỗi trang, 0 request lỗi, 0 `.katex-error`; P02 LINES (ngoại lệ đã ghi); cờ OVERFLOW/NARROW-H ở A02, B10, C08, C12, D08 là đuôi SVG dấu căn KaTeX bị cắt (báo nhầm). Đã xem ảnh 1600×900 và 390×844 của P01, A06, A11, B11B, B12, C12, D07, D08, E04, E07: vừa khung.

Quyết định: **chấp nhận**; mọi phát hiện của bảng 2026-11-13 đã đóng.
