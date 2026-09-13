# Nhật ký rà soát Bài 03 — Khung Đối ngẫu Lagrange

## Phiên bản hiện hành — 2026-09-11

- Yêu cầu: xóa nội dung bộ chiếu cũ, dựng khung theo Bài 02; section đầu chứa tiêu đề; mỗi trang chỉ có tiêu đề và TODO.
- Đã duyệt 7 mạch, 36 trang; thay nội dung HTML tại đường dẫn cũ. Không xóa tài liệu học tập và SVG.
- Mẫu Bài 02 chỉ đọc tại máy; giữ nguyên quy tắc CSS liên quan và cấu hình RevealJS.
- Tác tử lập kế hoạch, phân tích nguồn và soạn TODO đã chạy bằng OpenRouter; requested_model = observed_model = z-ai/glm-5.3-flash; provider = OpenRouter.
- Điều phối bác bỏ đề nghị hỏi lại quyền xóa (người dùng đã yêu cầu), giữ mã nội bộ trên slide, bỏ bản đồ mở đầu, và đồng nhất cận dưới đúng với giá trị nhỏ nhất.
- Đã sửa TODO do writer nhầm khả thi thành khả vi, tên bốn nhóm KKT và độ nhạy của giá trị tối ưu thành độ nhạy của nghiệm.
- Index đánh dấu đang dựng khung; ghi chú cũ có thông báo phiên bản. Bài tập công khai chưa có.
- Kiểm định khung, năm vai rà và kiểm tra RevealJS đã đạt phạm vi skeleton; Codex Slides đã lưu đủ 36 trang và 36 ảnh chụp tương ứng.

## Kiểm định khung và năm vai độc lập — 2026-09-11

**Phạm vi bằng chứng:** reviewer chỉ đọc outline.md đã được cho phép gửi. Điều phối kiểm tra riêng HTML, CSS và trình duyệt tại máy.

- Kiểm định storyboard: đạt 36 trang/7 mạch, không thiếu cầu nối ở mức khung; ghi nhớ kiểm tra Slater khi soạn hồi quy và nối nhân tử tối ưu sang độ nhạy.

### Góc nhìn sinh viên

Runtime: requested_model `z-ai/glm-5.3-flash`; observed_model `z-ai/glm-5.3-flash`; provider `OpenRouter`.

> **Kết luận: ĐẠT trong phạm vi skeleton** (chỉ đọc `2627-1/planning/lec-03/outline.md`, không đọc tệp khác, không sửa).
>
> Kiểm tra theo góc nhìn sinh viên:
>
> 1. **Cấu trúc khung** — Đạt. 36 trang / 7 mạch đúng như storyboard đã kiểm định (dòng 3, 17–86); mỗi trang chỉ tiêu đề + một TODO, không có công thức/hình/lời giải (dòng 9, 12).
>
> 2. **Mạch KKT (S05)** — Đạt đúng thứ tự yêu cầu: S05-01 suy điều kiện + minh họa cân bằng gradient tại ví dụ **trước** S05-03 bốn nhóm điều kiện; S05-04 giải ứng viên ví dụ **trước** S05-05 bảng giả thiết cần/đủ; rồi S05-06 ứng dụng hồi quy, S05-07 bài tập. Không có lỗi.
>
> 3. **Slater (S03-03)** — Đạt: phát biểu với giả thiết lồi, miền toàn không gian, điểm khả thi nghiêm; nội tương đối được đẩy sang đọc mở rộng (dòng 13) — phù hợp, không đòi thêm.
>
> 4. **Độ nhạy (S06)** — Đạt: S06-01/S06-05 nói đúng "thay đổi **giá trị tối ưu**", không lẫn thành thay đổi nghiệm.
>
> 5. **Tiên quyết & tải nhận thức** — Đạt: S01-02 nêu tiên quyết và mục tiêu; mỗi mạch có trang ví dụ xuyên suốt (S02-02) và trang bài tập cuối mạch (S02-08, S03-06, S04-04, S05-07, S06-05), tải đều, không nhảy khái niệm.
>
> **Ghi nhớ khi soạn chi tiết** (không phải lỗi): (a) S05-02 "bù trừ" xuất hiện trước S05-03 — khi soạn cần giới thiệu khái niệm này đủ nhẹ để sinh viên theo được trước bảng 4 nhóm; (b) S03-05 phản ví dụ cần chọn cẩn thận để phân biệt đủ/cần/đạt nghiệm đối ngẫu; (c) giữ ví dụ $x^2+1$ nhất quán, không đưa số liệu lên khung.
>
> Không có lỗi mức nào cần báo.

### Góc nhìn chuyên gia

Runtime: requested_model `z-ai/glm-5.3-flash`; observed_model `z-ai/glm-5.3-flash`; provider `OpenRouter`.

> **Kết quả rà độc lập (phạm vi skeleton): ĐẠT.**
>
> Đã chỉ đọc `2627-1/planning/lec-03/outline.md` (95 dòng), không đọc tệp khác, không sửa tệp.
>
> **Kiểm tra độ bao phủ:**
> - **LLO4** (hàm/bài toán đối ngẫu Lagrange): mạch 2 (S02-04→S02-07) và mạch 3 bao phủ đủ — dòng 25–47.
> - **LLO5** (minh họa hình học): mạch 4 riêng biệt, 4 trang (dòng 49–56) — đạt.
> - **CLO1**: dòng 7 nêu liên quan; dòng 90 ghi nguồn đề cương DOCX — đạt.
> - **Ví dụ xuyên suốt**: dòng 12 — $\min x^2+1$, $(x-2)(x-4)\le0$, $x^*=2$, $p^*=5$, $\lambda^*=2$; được dùng lại ở S02-02, S02-05, S03-02, S03-04, S04, S05-04, S06-02 — nhất quán.
> - **Ứng dụng học máy**: S05-06 (hồi quy có ràng buộc chuẩn), S06-04 (diễn giải nhân tử trong hồi quy) — đạt.
> - **Thuật ngữ**: cận dưới, đối ngẫu yếu/mạnh, Slater, KKT, bù trừ, độ nhạy — đầy đủ, đúng mạch.
>
> **Kiểm tra mạch KKT theo yêu cầu:** S05-01 suy điều kiện từ cận khít + minh họa cân bằng gradient tại ví dụ **trước** S05-03 (bốn nhóm) và S05-04 (giải ứng viên); sau đó S05-05 (giả thiết cần/đủ) → S05-06 (ứng dụng) → S05-07 (bài tập). Trình tự đúng.
>
> **Kiểm tra Slater:** S03-03 phát biểu Slater cơ bản (lồi hữu hạn, toàn không gian, đẳng thức affine, điểm khả thi nghiêm — dòng 44); nội tương đối/tập mở rộng đặt ở kế hoạch đọc mở rộng (dòng 13) — đúng yêu cầu.
>
> **Độ nhạy:** S06-03 gắn với giá trị tối ưu (dòng 74, 76) — đúng.
>
> **Điều cần nhớ khi soạn (không phải lỗi):** giữ ví dụ xuyên suốt nhất quán dấu nhân tử; S03-05 phản ví dụ cần phân biệt rõ "đủ" vs "đạt nghiệm đối ngẫu"; không thêm công thức/hình vào khung ở bước này.

### Độ chính xác toán học

Runtime: requested_model `z-ai/glm-5.3-flash`; observed_model `z-ai/glm-5.3-flash`; provider `OpenRouter`.

> **Kết quả: ĐẠT trong phạm vi skeleton (khung 36 trang / 7 mạch, chỉ tiêu đề + TODO).** Chỉ đọc tệp được phép `2627-1/planning/lec-03/outline.md`; không xem HTML/trình duyệt.
>
> Kiểm tra độ chính xác toán học của các TODO:
>
> 1. **Ví dụ xuyên suốt (dòng 12):** min x²+1, (x−2)(x−4)≤0 ⇒ miền [2,4], x*=2, p*=5. Lagrangian L=x²+1+λ(x−2)(x−4); ∂L/∂x=2x+λ(2x−6)=0 tại x=2 ⇒ λ=2; g(2)=min 3x²−12x+17=5=p*. Cả ba giá trị x*=2, p*=5, λ*=2 đều đúng, cận khít. Không có lỗi.
>
> 2. **Cận dưới đúng (S02-05):** "cận dưới đúng" — đúng, g(λ)≤p* với λ≥0 là cận dưới của giá trị tối ưu, không nhầm với cực tiểu. ✓
>
> 3. **Đối ngẫu yếu (S02-06):** "không cần giả thiết lồi" — đúng. ✓
>
> 4. **Slater (S03-03):** "lồi, miền toàn không gian, điểm khả thi nghiêm" — khớp Slater cơ bản; nội tương đối để mở rộng đúng như ghi dòng 13. ✓
>
> 5. **Thứ tự mạch KKT:** S05-01 minh họa cân bằng gradient tại ví dụ trước S05-03 (bốn nhóm); S05-04 giải ứng viên trước S05-05 (bảng cần/đủ), rồi S05-06 ứng dụng, S05-07 bài tập — đúng trình tự yêu cầu. ✓
>
> 6. **Độ nhạy (S06-01, S06-03):** là của **giá trị tối ưu** — đúng. ✓
>
> **Cần nhớ khi soạn chi tiết (không phải lỗi):** S05-05 cần nêu rõ KKT cần cho bài toán bất kỳ với điều kiện ràng buộc phù hợp, đủ khi lồi; S03-05 phản ví dụ phải phân biệt đủ vs. đối ngẫu mạnh vs. đạt nghiệm đối ngẫu.

### Phản biện học thuật và giảng dạy

Runtime: requested_model `z-ai/glm-5.3-flash`; observed_model `z-ai/glm-5.3-flash`; provider `OpenRouter`.

> **Kết quả rà độc lập KHUNG outline.md (chỉ đọc tệp được phép): ĐẠT trong phạm vi skeleton.**
>
> **Kiểm định cấu trúc**
> - Đúng 36 trang / 7 mạch: 3+8+6+4+7+5+3 = 36 (dòng 17–86), khớp storyboard đã duyệt.
> - Mỗi trang chỉ có tiêu đề + một TODO; không có công thức, hình, lời giải hay ghi chú diễn giả — đúng yêu cầu khung (dòng 3, 9). Ví dụ xuyên suốt chỉ ghi chú nội bộ khi soạn (dòng 12), không lộ lên khung.
>
> **Chu trình pedagogy — hợp lý**
> - Mạch 2: nhu cầu (S02-01) → ví dụ (S02-02) → trực quan cận (S02-03) → hình thức Lagrange/đối ngẫu (S02-04/05) → đối ngẫu yếu (S02-06) → ứng dụng/bài tập (S02-07/08). Đúng trình tự.
> - Mạch KKT: S05-01 minh họa cân bằng gradient **trước** S05-03 bốn nhóm; S05-04 giải ứng viên **trước** S05-05 phân loại cần/đủ; rồi S05-06 ứng dụng hồi quy, S05-07 bài tập. Đúng thứ tự yêu cầu.
> - Độ nhạy nhắm đúng giá trị tối ưu: S06-01 "thay đổi giá trị tối ưu", S06-03 xấp xỉ cục bộ, S06-05 bài tập ước lượng giá trị.
>
> **Slater — đúng phạm vi**
> - S03-03: Slater cơ bản (lồi, miền toàn không gian, điểm khả thi nghiêm). Nội tương đối/tập mở rộng chỉ đặt ở đọc mở rộng (dòng 13) — phù hợp, không mở rộng sớm.
>
> **Điều cần nhớ khi soạn (không phải lỗi khung)**
> 1. S05-05: tách rõ KKT cần (điều kiện thường) và đủ (lồi) — TODO hiện gộp chung.
> 2. S06-03: nêu rõ giả thiết khả vi nghiêm cho xấp xỉ độ nhạy.
> 3. S03-05 phản ví dụ: giữ phân biệt "đối ngẫu mạnh" với "đạt nghiệm đối ngẫu".
>
> Không có lỗi chặn; không xác nhận đã xem HTML/trình duyệt.

### Mạch kể chuyện và điểm kết nối

Runtime: requested_model `z-ai/glm-5.3-flash`; observed_model `z-ai/glm-5.3-flash`; provider `OpenRouter`.

> **ĐẠT trong phạm vi skeleton** (không có lỗi chặn) — chỉ đọc `2627-1/planning/lec-03/outline.md`, không xem HTML/trình duyệt, không sửa tệp.
>
> Kiểm định theo yêu cầu:
>
> 1. **36 trang / 7 mạch**: 3+8+6+4+7+5+3 = 36 trang, 7 mạch có chức năng, đầu vào/đầu ra riêng (mở đầu → cận dưới → Slater → hình học → KKT → độ nhạy → tổng hợp). Đạt.
> 2. **Skeleton đúng yêu cầu**: mỗi trang chỉ tiêu đề + một TODO (dòng 3, 9); không có công thức/hình/lời giải trong khung; ví dụ $x^2+1$ chỉ ghi chú soạn nội bộ (dòng 12). Đạt.
> 3. **Mạch KKT đúng thứ tự**: S05-01 minh họa cân bằng gradient tại ví dụ **trước** S05-03 bốn nhóm; S05-04 giải ứng viên **trước** S05-05 bảng giả thiết cần/đủ; rồi S05-06 ứng dụng, S05-07 bài tập. Đạt.
> 4. **Slater**: S03-03 nêu lồi, miền toàn không gian, đẳng thức affine (hàm ý "đẳng thức affine" qua "miền toàn không gian" — cần nhớ ghi rõ khi soạn), điểm khả thi nghiêm; nội tương đối đặt ở kế hoạch mở rộng (dòng 13). Đạt.
> 5. **Độ nhạy**: S06-03/S06-05 nói về thay đổi **giá trị tối ưu**, đúng đối tượng. Đạt.
> 6. **Kết luận thu hồi**: S07-01/S07-02 thu hồi vấn đề chứng nhận tối ưu bằng cận + KKT. Đạt.
>
> **Cần nhớ khi soạn (không phải lỗi)**: Slater cần nêu tường minh ràng buộc đẳng thức affine; S05-02 "ràng buộc hoạt động có nhân tử bằng không" nên đối chiếu với ví dụ $\lambda^*=2$ (ràng buộc hoạt động, nhân tử khác 0) để tránh hiểu nhầm bù trừ.

### Quyết định của điều phối

| Vấn đề | Trạng thái | Quyết định và bằng chứng |
|---|---|---|
| Writer nhầm cực tiểu/infimum, khả vi/khả thi, bốn nhóm KKT và độ nhạy của nghiệm | Đã sửa trước rà | HTML và outline dùng cận dưới đúng, điểm khả thi nghiêm, bốn nhóm đúng và thay đổi giá trị tối ưu. |
| Reviewer giảng dạy đề nghị “khả vi nghiêm” | Không áp dụng | Khi soạn, dùng khả vi của hàm giá trị cùng đối ngẫu mạnh và nhân tử tối ưu; không có giả thiết “khả vi nghiêm”. |
| Reviewer mạch kể chuyện suy đẳng thức affine từ miền toàn không gian | Bác bỏ suy luận | Hai giả thiết độc lập. Phát biểu Slater khi soạn phải ghi riêng hàm lồi hữu hạn và đẳng thức affine. |
| Reviewer toán mô tả cận dưới đúng chỉ bằng bất đẳng thức cận | Làm rõ | Cận dưới đúng ở S02-05 nghĩa là infimum của hàm Lagrange theo biến gốc; không phải cận tùy ý hoặc cực tiểu mặc nhiên đạt. |
| Giảm từ 41 xuống 36 trang | Đã duyệt | Storyboard có ánh xạ và quyết định gộp/tách/mở rộng. Không đổi tuyến sau năm lượt rà. |

## Kiểm định kỹ thuật phiên bản khung

- HTML tiếng Việt có 7 section ngoài, 36 section trong, 36 ID duy nhất; mỗi trang đúng một h1/h2 và một đoạn TODO. Trang đầu là tiêu đề Bài 03. Không còn aside, công thức, ảnh, bảng hoặc lời giải cũ trong deck.
- Mỗi ID có đúng một hàng trong bảng vai trò storyboard; outline khớp thứ tự 36 tiêu đề/TODO.
- CSS riêng Bài 03 trích nguyên các quy tắc đang dùng từ Bài 02 tại máy. Giữ CSS chung học kỳ và runtime cục bộ; không liên kết CSS riêng Bài 02 hoặc runtime khác học phần.
- Giữ cấu hình 1280×720, margin 0.06, controlsLayout edges, slideNumber, hashOneBasedIndex, hash, transition none, scrollActivationWidth null và KaTeX/Notes/Highlight cục bộ.
- Đã chạy python3 -m reloadserver 8765; cổng đang có máy chủ của kho nên dùng lại, không đổi cổng.
- Chromium duyệt 36/36 trang ở 1280×720 và 390×844: không tràn khỏi canvas, không lỗi JavaScript hoặc tài nguyên HTTP. Đã xem bảng ảnh toàn bộ trang và ảnh riêng tiêu đề/KKT/màn hình hẹp.
- Phép đo kiểm tra vùng chữ so với canvas thực tế, không nhầm nét chữ vượt line box với cắt nội dung. Không sửa CSS hoặc giảm chữ để che lỗi.
- Space đi liên tục đủ 36 trang; Home về mạch đầu, giữ vị trí dọc theo RevealJS; ArrowDown/ArrowRight và hash tới Slater đúng trang.
- Index ghi đang dựng khung, không công bố khung như bài hoàn chỉnh. Ghi chú cũ có thông báo phiên bản; Markdown và SVG cũ không bị sửa. Chưa có bài tập công khai Bài 03.
- Không tải thêm nguồn MIT, không tạo hình minh họa raster. 36 ảnh trong Codex Slides là ảnh kiểm định chụp từ RevealJS, không nhúng vào bài giảng.
- Codex Slides: dự án 20260828104958-lecture-03-i-ng-u-lagrange-v-i-u-ki-n-t--obls lưu 36 tiêu đề/TODO và 36 ảnh tương ứng; đã tải HTML, CSS và outline vào Design Files. Browser tích hợp không có trong phiên; không tuyên bố đã xem trong Browser tích hợp.
- Đã xác minh trực quan giao diện dàn ý Codex Slides bằng Chromium cục bộ: đủ 36 tiêu đề, trang đầu và TODO hiển thị đúng. Giao diện dự án vẫn ở bước dàn ý; không tuyên bố đã kiểm tra chế độ Play của Codex Slides.
- Máy chủ có sẵn sau đó ngừng; đã khởi động lại đúng lệnh tại cổng 8765.
- Giới hạn: nội dung các TODO chưa được triển khai theo đúng yêu cầu khung; ghi chú học tập chưa được viết lại.

## Hồ sơ phiên bản cũ — chỉ để truy nguyên

Các phát biểu “hiện tại”, số trang và kết quả kiểm tra bên dưới chỉ áp dụng cho bản trước ngày 2026-09-11. Không dùng làm bằng chứng cho khung mới.

## Nhật ký trước khi dựng lại

## Hậu kiểm mạch khái niệm và phạm vi định lý — 2026-09-01

- P01, A04, B02, C06, D05, E01, E06 và Z03 đã bỏ tham chiếu mã trang, “trang kế” và mô tả tuyến nội bộ; câu nối hiện dựa trên quan hệ toán học được truyền sang khái niệm sau.
- B01 dùng khoảng $p^*-d^*$ thay cho cặp nhãn “cận lỏng/cận khít”, đồng thời nêu rõ tính lồi chưa tự bảo đảm đối ngẫu mạnh.
- C03 chỉ gọi $t+\lambda u=g(\lambda)$ là đường cận trước khi định nghĩa tập mở rộng. C04 mới gọi nó là đường đỡ và dùng $\operatorname{cl}\mathcal A$ để đúng cả khi infimum không đạt.
- D04 giới hạn rõ ở KKT khả vi. Nhánh không trơn bị bỏ vì dưới gradient của hàm giá trị ở E04 không phải là điều kiện dừng KKT tổng quát.
- Số trang, thứ tự DOM và tài sản không thay đổi. Bộ phân tích xác nhận 41 trang, 41 ghi chú, 7 section ngoài; năm SVG phân tích XML và raster hóa thành công. Contact sheet cho thấy nhãn, trục, đường và điểm cần đọc đều hiển thị đầy đủ.

## 1. Trạng thái bản nháp

- Bản hiện tại gồm 41 trang, đúng 7 section ngoài P/A/B/C/D/E/Z.
- Outline, storyboard, RevealJS và sáu SVG cục bộ đã đồng bộ.
- Đã hợp nhất đủ năm báo cáo rà soát độc lập và áp dụng các quyết định trong Mục 8; thứ tự DOM đã qua cổng storyboard được giữ nguyên.
- Trạng thái hiện tại: hậu kiểm toán học, storyboard, mạch kể chuyện và raster SVG đạt; không còn lỗi chặn hoặc nghiêm trọng. Lượt này không có Browser hoặc Chromium, nên không dùng kết quả trực quan cũ để khẳng định bố cục HTML sau sửa.

## 2. Nguồn và quyết định sử dụng

| Nguồn/tài sản | Vai trò | Quyết định |
|---|---|---|
| Đề cương UET.AI2012 | Buổi 3, LLO4–5/CLO1, 2 tiết LT + 1 tiết BT | nguồn thẩm quyền phạm vi |
| `sources/part1.docx` | Tuần 3 `Duality`, chế độ nghiêm ngặt | khung học thuật, không dùng làm nguồn công thức |
| `sources/bv_cvxbook.pdf`, Chương 5 | Định nghĩa, định lý, Slater, hình học, KKT, độ nhạy, nón | nguồn kiểm chứng toán học chính |
| `sources/dual.pdf` | Mẫu thứ tự MIT Lecture 5 | dùng một bản chuẩn; không dùng hai bản trùng như nguồn độc lập |
| `sources/Bài tập chương 4.pdf` và lời giải PDF | Ví dụ xuyên suốt, đối chiếu bài tập | tự tính lại theo `math-spec.md` |
| `sources/MIT/README.md` | URL, giấy phép, checksum, vai trò MIT | đã có mục Lecture 5; không tải thêm |
| `img/lec-03/*.svg` | Họ Lagrangian, $g$, hình học đường đỡ, hàm giá trị | tự vẽ; không dùng raster nguồn |

MIT 6.079/6.975, *Lecture 5: Duality*, Stephen Boyd, 2009, được phát hành theo CC BY-NC-SA 4.0 trên MIT OpenCourseWare. Deck diễn giải bằng tiếng Việt và vẽ lại hình; không sao chụp tài sản bên thứ ba.

## 3. Quy ước toán đã khóa

- Ví dụ xuyên suốt có $x^*=2$, $p^*=5$, $\lambda^*=2$, $d^*=5$.
- $\operatorname{dom}g=(-1,\infty)$; miền khả thi của bài toán đối ngẫu là $\lambda\ge0$.
- Nhiễu dùng $f_i(x)\le u_i$, do đó $p'(0)=-\lambda^*=-2$.
- Slater tại $x=3$ là điều kiện đủ, không được phát biểu là điều kiện cần.
- KKT phải gồm khả thi gốc, khả thi đối ngẫu, bù trừ và dừng; ngoài bài toán lồi và giả thiết thích hợp, KKT không chứng nhận tối ưu toàn cục.
- Với miền $D$ lồi, điều kiện dừng tổng quát là $0\in\nabla_xL(x^*,\lambda^*,\nu^*)+N_D(x^*)$; khi $D=\mathbb R^n$ thì $N_D(x^*)=\{0\}$ và thu về $\nabla_xL=0$.
- Đối ngẫu mạnh và đạt nghiệm đối ngẫu cho $(-\lambda^*,-\nu^*)\in\partial p^*(0,0)$; chỉ khi $p^*$ khả vi mới đồng nhất cặp này với gradient duy nhất.
- QP chuyển giao có $x^*=(1/2,1/2)$, $\lambda^*=1$ và $p^*=d^*=1/2$; giá trị $1$ này không thuộc ví dụ xuyên suốt.

## 4. Sai khác có chủ ý so với mẫu

- Giữ thứ tự khái niệm của MIT nhưng thay chuỗi ví dụ rời bằng Bài 1 xuyên suốt.
- Lược các đối ngẫu chuyên biệt, hàm liên hợp, chuẩn đối ngẫu, phân hoạch và trust-region không trực tiếp đo LLO4–5.
- Thêm ứng dụng hồi quy có ràng buộc tại D06 và QP chuyển giao tại D07.
- Vẽ lại mọi hình bằng SVG cục bộ; không sao chụp PDF/PPTX.

## 5. Codex Slides

- Dự án bền vững đã được tạo với mã `20260828104958-lecture-03-i-ng-u-lagrange-v-i-u-ki-n-t--obls` và đã gắn nguồn theo vai trò.
- Codex Slides đã sinh outline 30 trang, nhưng outline này ghi sai $\lambda^*=1$ cho ví dụ xuyên suốt. Bản RevealJS dùng `source-map.md` và `math-spec.md` làm thẩm quyền, nên giữ kết quả đã kiểm chứng $\lambda^*=2$.
- Browser tích hợp không khả dụng và dự án chưa render. Vì vậy chưa tuyên bố đã rà trực quan bằng Codex Slides.
- Sau khi nội dung RevealJS vượt các vòng rà soát độc lập, điều phối viên phải đồng bộ lại outline Codex Slides, render và kiểm tra trạng thái bền vững cùng bề mặt hiển thị nếu công cụ cho phép.

## 6. Kiểm tra kỹ thuật bản nháp

- Kiểm tra cấu trúc đạt: 40 ID duy nhất theo đúng thứ tự P00–Z03, 40 khối ghi chú, 7 section ngoài; mỗi ghi chú có đúng hai đoạn và bộ phân tích HTML không phát hiện thẻ mở hoặc đóng sai.
- Sau hậu kiểm cuối, KaTeX cục bộ đã phân tích 279 công thức, gồm 21 công thức khối và 258 công thức nội dòng, với 0 lỗi. Cả bốn SVG được `xml.etree.ElementTree` phân tích thành công; mọi đường dẫn CSS, JS và ảnh đều tồn tại.
- Kiểm tra dữ kiện SVG đạt: ba đường Lagrangian cùng qua $(2,5)$ và $(4,17)$; mẫu $g$ có đỉnh duy nhất tại $(2,5)$; đường $t=5-2u$ đi qua điểm $(0,5)$ trên nhánh dưới; đường độ nhạy $5-2u$ đi qua $(0,5)$ của hàm giá trị.
- `git diff --check --no-index` không báo lỗi khoảng trắng ở HTML và ba tệp planning. Lệnh `xmllint` không có trong môi trường, nên kiểm tra XML dùng bộ phân tích chuẩn của Python.
- Kiểm tra Chromium ở khung 1600×900 phát hiện công thức Slater tại B04 và công thức từng đoạn tại E05 bị cắt bên phải.
- B04 dùng công thức `aligned` ba dòng để tách khả thi affine, bất đẳng thức phi affine và bất đẳng thức affine. E05 đặt công thức từng đoạn toàn chiều rộng và chia kết quả thành ba thẻ.
- Chromium r3 đã duyệt đủ 40/40 trang ở cả khung rộng và hẹp: không có tràn hiển thị hoặc lỗi KaTeX. Contact sheet đã được xem trực tiếp và không phát hiện chồng lấn; lỗi mạng duy nhất là favicon 404, không ảnh hưởng bộ trang chiếu.

## 7. Kiểm định storyboard

| Mức độ | Trang/cụm | Vấn đề | Bằng chứng | Quyết định | Trạng thái/bằng chứng sửa |
|---|---|---|---|---|---|
| nghiêm trọng | P02 | LLO4 bị mở rộng bằng KKT và độ nhạy thay vì trích đúng đề cương | Bản cũ ghép “kiểm tra điều kiện tối ưu và độ nhạy” vào LLO4 | Trích nguyên LLO4–5; tách sản phẩm bổ trợ | đã sửa trong HTML, outline, storyboard |
| nghiêm trọng | B01–B04 | Hình thức xuất hiện trước ví dụ khít nên nhu cầu chưa được cụ thể hóa | Thứ tự cũ B01→B02→B03 | Đổi thành B01→B03→B02→B04→B05→B06 | đã sửa; thứ tự DOM được kiểm tra lại |
| nghiêm trọng | C01–C04 | Tập $\mathcal G$ được định nghĩa trước trực quan đường đỡ | Thứ tự cũ C01→C02→C03 | Đổi thành C01→C03→C02→C04→C05→C06 | đã sửa; C03 dẫn trực tiếp sang C02 |
| nghiêm trọng | D01–D05 | KKT bắt đầu bằng bù trừ/hình thức, thiếu ví dụ tạo nhu cầu | D05 đứng sau toàn bộ phát biểu | Đổi thành D01→D05→D02→D03→D04→D06→D07; viết D05 thành so sánh ứng viên | đã sửa; D05 dẫn vào bốn phép kiểm tra |
| trung bình | E02–E05 | Hành trình độ nhạy mở bằng định nghĩa, ví dụ đến quá muộn | Thứ tự vai trò cũ: hình thức → định lý → local → ví dụ | E02 ví dụ/trực quan; E03 định nghĩa+cận; E04 local; E05 áp dụng đủ | đã sửa đồng bộ |
| trung bình | Z02 | Hành trình E thiếu bài tập tính toán | Z02 cũ chỉ hỏi dấu | Thêm tính $p^{*\prime}(0)$ và xấp xỉ $p^*(0{,}1)$; ánh xạ bài tập E sang Z02 | đã sửa; đáp án ở notes |
| trung bình | C06 | Bài đọc hình không hiển thị hình tại điểm đánh giá | Chỉ có bảng phương trình | Nhúng `dual-geometry.svg` thu nhỏ và giữ bảng | đã sửa; có `alt` cụ thể |
| trung bình | D07 | Lặp lại nhiệm vụ lập $L,g$ đã làm ở A08 | Câu hỏi cũ yêu cầu làm lại toàn tuyến | Dùng kết quả A08; chỉ đo Slater, bốn nhóm KKT và giả thiết kết luận | đã sửa |
| trung bình | E06 | Mở rộng theo nón thiếu nhu cầu và cầu nối từ bài trước | Trang cũ mở ngay bằng ký hiệu nón | Mở bằng giới hạn nhân tử vô hướng; nối SDP Bài 02 và nhân tử ma trận $Z$ | đã sửa |
| nhẹ | A08 | Điều kiện $\lambda\ge0$ chưa được nhắc ngay trong câu hỏi QP | Chỉ xuất hiện ở công thức tổng quát phía trên | Ghi rõ miền trong câu hỏi và notes | đã sửa |
| nghiêm trọng | B04, E05 | Công thức bị cắt phải ở Chromium 1600×900 | Quan sát trực quan của điều phối viên | Ngắt B04; chuyển E05 sang toàn chiều rộng | đã sửa mã; chờ chụp kiểm tra lại |

Sau thay đổi thứ tự, storyboard và outline đã dùng cùng thứ tự vật lý. Kiểm định storyboard phải chạy lại các trang bị ảnh hưởng, hai trang lân cận mỗi phía và toàn bộ ranh giới B/C/D/E trước khi đóng cổng này.

## 8. Năm báo cáo rà soát độc lập

### 8.1. Góc nhìn sinh viên

| Mức độ | Trang | Vấn đề | Bằng chứng | Quyết định | Trạng thái |
|---|---|---|---|---|---|
| trung bình | toàn bài, màn hình hẹp | Footer và controls có thể chồng nội dung khi lưới xếp một cột | CSS cũ vẫn hiển thị hai lớp cố định dưới 760 px | Ẩn footer và controls dưới 760 px; giữ điều hướng bàn phím và swipe của RevealJS | đã áp dụng; Chromium r3 hẹp đạt |
| nhẹ | h3 có KaTeX | Quy tắc viết hoa tiêu đề có thể đổi chữ thường trong công thức | KaTeX nằm bên trong h3 kế thừa `text-transform` | Thêm override cục bộ cho KaTeX trong h3 | đã áp dụng |
| trung bình | B04, E05 | Công thức từng bị cắt ở 1600×900 | Lượt Chromium trước vòng hợp nhất | Giữ bố cục compact/toàn chiều rộng và rà lại sau các bổ sung mới | đã sửa; Chromium r3 rộng và hẹp đều đạt |

### 8.2. Góc nhìn chuyên gia

| Mức độ | Trang | Vấn đề | Bằng chứng | Quyết định | Trạng thái |
|---|---|---|---|---|---|
| nghiêm trọng | A04–A08 | Lẫn miền định nghĩa của $L,g$ với miền khả thi đối ngẫu | A04 cũ ghi $\lambda\in\mathbb R_+^m$, trong khi A06 xét $-1<\lambda<0$ | Định nghĩa cho $\lambda\in\mathbb R^m$; chỉ A07–A08 yêu cầu $\lambda\ge0$ | đã áp dụng |
| nghiêm trọng | C03, E05 | Hình đường đỡ/tiếp tuyến không qua điểm được công bố | SVG Bézier cũ không đi qua $(0,5)$ | Vẽ lại từ công thức bằng polyline lấy mẫu và phép đổi tọa độ cố định | đã áp dụng |
| trung bình | P02 | Báo cáo đề nghị trích lại LLO4–5 | P02 hiện đã ghi “Trích đề cương” và tách sản phẩm bổ trợ | Không áp dụng thêm; nội dung hiện tại đã đúng trước vòng hợp nhất | giữ |
| trung bình | A08, D07 | QP chuyển giao có nguy cơ bị hiểu là lặp | D07 hiện đã ghi dùng kết quả A08, nhưng A08 cũ chưa thực sự tối đa hóa $g$ | Bổ sung kết quả $\lambda^*=1$, $x^*=(1/2,1/2)$ ở A08; giữ D07 chỉ kiểm tra Slater/KKT | đã áp dụng |

### 8.3. Độ chính xác toán học

| Mức độ | Trang | Vấn đề | Bằng chứng | Quyết định | Trạng thái |
|---|---|---|---|---|---|
| nghiêm trọng | B04, B06 | Slater tinh chỉnh thiếu điều kiện cho bất đẳng thức affine | Công thức cũ chỉ ghi phi affine chặt | Thêm $x\in\operatorname{relint}D$, $Ax=b$, phi affine chặt và affine không dương; sửa bài tập | đã áp dụng |
| nghiêm trọng | A03, B03, C03, E05 | Bốn SVG dùng đường Bézier ước lượng | Không bảo toàn chính xác giao điểm, cực đại hoặc tiếp xúc | Lấy mẫu trực tiếp $L_0,L_1,L_2$, $g(\lambda)$, $(f_1(x),f_0(x))$ và $p^*(u)$ | đã áp dụng; chờ kiểm tra hình |
| trung bình | C05 | Cầu nối từ hệ số góc sang KKT thiếu pháp tuyến | Chỉ nói $-\lambda^*$ “xuất hiện lại” | Nêu pháp tuyến $(\lambda^*,1)$ và hạng $\lambda^*\nabla f(x^*)$ | đã áp dụng |
| trung bình | D05 | Thế $x=2,4$ trước khi nêu phương trình dừng chung | Hai phương trình số thiếu nguồn đạo hàm | Thêm $\partial_xL=2x+\lambda(2x-6)=0$ | đã áp dụng |
| trung bình | E05 | Ký hiệu $\lambda^*$ không chỉ rõ bài nhiễu | Nhân tử bằng 2 tại $u=0$ nhưng bằng 0 khi $u\ge8$ | Dùng $\lambda^*(0)=2$ và $\lambda^*(u)=0$ khi $u\ge8$ | đã áp dụng |
| trung bình | E06 | Mở rộng SDP chưa đo được nón chứa nhân tử | Trang chỉ nêu công thức | Thêm câu hỏi về $Z\in\mathbb S_+^r$ và $\operatorname{tr}(ZF(x))$ | đã áp dụng |

### 8.4. Phản biện học thuật và giảng dạy

| Mức độ | Trang/cụm | Vấn đề | Bằng chứng | Quyết định | Trạng thái |
|---|---|---|---|---|---|
| nghiêm trọng | C, D | Báo cáo đọc thứ tự theo mã và đề nghị đổi ví dụ lên trước hình thức | DOM hiện là C01→C03→C02→C04 và D01→D05→D02→D03→D04 | Không đổi DOM; cổng storyboard đã đặt trực quan/ví dụ trước hình thức | không áp dụng |
| nghiêm trọng | E | Báo cáo cho rằng E mở bằng ba trang hình thức trước ví dụ | E02 hiện đã đảm nhiệm ví dụ/trực quan trước E03–E04; storyboard ghi rõ vai | Không đổi DOM; giữ tuyến đã qua cổng storyboard | không áp dụng |
| trung bình | toàn bài | Lo ngại tải nội dung cho 2 tiết LT + 1 tiết BT | 40 trang nhưng có phân bổ nội bộ và các trang bài tập đóng cụm | Giữ 40 trang theo đặc tả; tiếp tục rà tràn và nhịp bằng Chromium | giữ; Chromium r3 không phát hiện tràn |
| trung bình | A08–D07 | Bài tập lặp có thể làm mờ tiến triển | A08 và D07 dùng cùng QP | Giữ chiến lược giàn giáo; A08 giải đối ngẫu, D07 dùng kết quả để kiểm tra KKT | đã làm rõ |

### 8.5. Mạch kể chuyện và điểm kết nối

| Mức độ | Trang/cụm | Vai trò | Kết nối vào | Kết nối ra | Điểm nhấn | Quyết định và trạng thái |
|---|---|---|---|---|---|---|
| trung bình | C05→D01 | Chuyển từ hình học sang KKT | Đường đỡ khít | Cân bằng gradient | Cùng nhân tử trong ba biểu diễn | Nêu hệ số góc, pháp tuyến và $\lambda^*\nabla f$; đã áp dụng |
| trung bình | E06→Z01 | Mở rộng chứng nhận từ vô hướng sang nón | Độ nhạy của nhân tử vô hướng | Tổng kết toàn pipeline | SDP dùng nhân tử trong nón đối ngẫu | Thêm câu hỏi ở E06 và thu hồi trong notes Z01; đã áp dụng |
| nhẹ | A08→D07 | Dữ kiện chuyển giao chưa được đóng tại A08 | Hàm đối ngẫu của QP | Kiểm tra Slater/KKT | $\lambda^*=1$, $x^*=(1/2,1/2)$ | Bổ sung tối đa hóa ở A08; đã áp dụng |
| nhẹ | toàn bộ ranh giới | Hai báo cáo đề nghị đổi thứ tự dựa trên thứ tự ID | ID truy nguyên không phản ánh DOM sau cổng storyboard | Giữ các câu nối đã đồng bộ | DOM là bằng chứng trình chiếu | Không đổi thứ tự; hậu kiểm storyboard/mạch kể chuyện đạt |

## 9. Hậu kiểm cuối

- **Toán học:** không còn lỗi chặn hoặc nghiêm trọng. Một lỗi trung bình tại E05 đã được sửa bằng cách phân biệt điểm suy biến $u=8$ — ràng buộc vẫn hoạt động nhưng $\lambda^*(8)=0$ — với miền $u>8$, nơi ràng buộc không hoạt động. Hai lỗi nhẹ đã được sửa: A04 nêu $D\ne\varnothing$ trước khi dùng; E06 nêu $F(x)\in\mathbb S^r$ và $Z\in\mathbb S_+^r$ cùng cấp $r$ trước công thức ghép.
- **Storyboard và mạch kể chuyện:** đạt. Outline, storyboard và HTML thống nhất vai trò A04, trường hợp biên E05 và kiểu/kích thước ở E06; thứ tự DOM và các câu nối không đổi.
- **Chromium r4:** sau ba sửa đổi hậu kiểm, đã duyệt lại đủ 40/40 trang ở 1600×900 và 720×1280; 0 trang tràn hiển thị, 0 lỗi KaTeX. Lỗi duy nhất là favicon 404 vô hại.
- **Codex Slides:** dự án bền vững `20260828104958-lecture-03-i-ng-u-lagrange-v-i-u-ki-n-t--obls` đã được thay dàn ý bằng đúng 40 trang và thứ tự của RevealJS. Lệnh kết xuất 40 trang không trả trạng thái sau hơn bốn phút nên đã dừng; Browser tích hợp vẫn không khả dụng. Vì vậy, không tuyên bố đã rà trực quan bằng Codex Slides; cổng trực quan dùng Chromium cục bộ và contact sheet.
- Hai trang chỉ mục đã được bổ sung liên kết Bài 03; commit và push do điều phối viên thực hiện sau cổng cuối.

## 10. Hậu kiểm bổ sung sau phản biện điều kiện miền

- D03, D04 và ghi chú D05 đã được đồng bộ theo điều kiện dừng tổng quát trên miền $D$: dùng nón pháp tuyến, nêu trường hợp $D=\mathbb R^n$, và khóa đủ giả thiết của bài toán lồi gồm miền lồi, bất đẳng thức lồi, đẳng thức affine, cùng dạng khả vi hoặc dưới vi phân phù hợp.
- E04 đã được sửa để nêu đủ đối ngẫu mạnh và đạt nghiệm đối ngẫu trước quan hệ dưới gradient; chỉ trường hợp khả vi mới dùng gradient duy nhất.
- `math-spec.md` phân biệt đúng $u=8$ là ràng buộc hoạt động suy biến với $\lambda^*(8)=0$, còn chỉ $u>8$ mới không hoạt động.
- `plan.md`, outline, storyboard, source map và HTML giữ nguyên thứ tự DOM cuối gồm 40 ID, 7 section ngoài và 40 khối ghi chú. Mục Lecture 5 trong `sources/MIT/README.md` được ghi là trạng thái do điều phối viên xác minh; tác tử GLM không đọc tệp đó.
- Lượt chỉnh sửa này chưa chạy lại Chromium hoặc Codex Slides. Các trang D03, D04, D05 và E04 cần được điều phối viên kiểm tra hiển thị ở cổng trực quan cuối; không dùng kết quả Chromium r4 trước chỉnh sửa làm bằng chứng cho bố cục mới.

## 11. Hợp nhất phản biện về tiên quyết và mã nội bộ

- Phần mở đầu báo trước nội tương đối và dưới gradient là khái niệm sẽ được định nghĩa tại chỗ. Trang Slater định nghĩa $\operatorname{relint}D$ là nội trong bao affine; trang độ nhạy định nghĩa dưới gradient bằng bất đẳng thức đường đỡ trước khi dùng nhân tử.
- Ví dụ KKT một biến dùng $\nabla_xL=0$ và không nhắc nón pháp tuyến trước khi khái niệm này được định nghĩa. Điều kiện bù trừ nêu rõ nghiệm gốc, nghiệm đối ngẫu, tính đạt và $p^*=d^*$.
- Ghi chú QP phân biệt $\operatorname{dom}g=\mathbb R$ với miền khả thi đối ngẫu $\lambda\ge0$. Ghi chú hình học nối Slater với siêu phẳng đỡ có hệ số mục tiêu khác 0 và hệ số góc hữu hạn sau chuẩn hóa.
- Mọi mã vị trí nội bộ đã được loại khỏi mặt trang chiếu và ghi chú diễn giả; mã chỉ còn trong `data-slide-id` và tài liệu planning.
- Mục 8 của kế hoạch đã khớp DOM: ví dụ A02 đi trước trực quan A03; B01→B03→B02 và C01→C03→C02 là thứ tự có chủ ý; A08 gộp ứng dụng với bài tập.

## 12. Kiểm định kỹ thuật cuối ngày 2026-08-30

- Bỏ `maximum-scale` và `user-scalable` khỏi viewport để không chặn phóng đại hỗ trợ tiếp cận; thêm favicon dữ liệu rỗng để loại lỗi 404 không liên quan.
- Cổng 8765 đang được một kho khác sử dụng nên không bị dừng hoặc thay đổi. Kiểm định HTTP dùng cổng tạm 8876; HTML, bốn SVG cục bộ, RevealJS, plugin, KaTeX và phông đều trả 200 hoặc 304.
- Chromium duyệt đúng 40 cặp chỉ số RevealJS ở 1280 × 720, 800 × 600 và 720 × 900. Không có lỗi bảng điều khiển, lỗi trang hoặc yêu cầu thất bại.
- Kiểm tra trực quan riêng P01, B04, C05, D03, D04, D05, E04, E05, E06 và Z02. Các định nghĩa mới tại B04/E04 nằm trọn khung; E05 hiển thị đủ ba miền; E06 sát đáy nhưng không cắt nội dung.
- Cảnh báo hộp đo hình học tại B04/E06 đến từ phần điều khiển/biên thẻ gần đáy; `scrollWidth` và `scrollHeight` đều không vượt vùng chứa, ảnh chụp xác nhận nội dung nhìn thấy không tràn.
- Tái kiểm sinh viên, toán học và mạch kể chuyện sau sửa đều đạt bằng GLM 5.3 Flash qua OpenRouter. Codex Slides vẫn không khả dụng; không dùng nó làm bằng chứng kiểm định.

## 13. Ghi chú bài giảng và SVG ngày 2026-08-31

- Ghi chú công khai được xây thành 6 mạch A–F và 15 chủ đề. Hai chủ đề bổ sung là điểm yên ngựa của hàm Lagrange và nón pháp tuyến; chúng nối lần lượt đối ngẫu mạnh với KKT và điều kiện dừng với miền biến tổng quát.
- Mỗi chủ đề có mục tiêu đọc hiểu, định nghĩa và giả thiết, trực quan, ví dụ tính được, ứng dụng trong AI, điểm dễ nhầm, câu hỏi kiểm tra và đầu ra. Phần định lý và chứng minh được tách khỏi tuyến giải thích chính.
- Rà soát toán học đã sửa miền $x\in D$ trong hàm giá trị, giả thiết hữu hạn trước khi dùng dưới vi phân, phiên bản Slater tinh chỉnh, dấu độ nhạy và giả thiết nón proper. Hậu kiểm toán học đạt.
- Rà soát mạch đọc đã bỏ một tiêu đề tạo mạch thứ bảy, rút phần QP lặp lại thành phép tái sử dụng kết quả và chỉ nhúng hình KKT một lần. Hậu kiểm mạch kể chuyện và văn phong đạt.
- Năm SVG của bài được đối chiếu với công thức và raster hóa ở 900 px và 600 px. Đã sửa nhãn độ nhạy bị cắt, bổ sung tập mở rộng trong hình học đối ngẫu, sửa phía tô của nửa không gian KKT và đồng nhất tỉ lệ hai trục. Cả năm hình phân tích XML thành công, có `role`, `title`, `desc`, không dùng script, `foreignObject`, ảnh nhúng hoặc tài nguyên mạng.
- Máy chủ HTTP cục bộ tại cổng tạm 8877 trả 200 cho viewer, Markdown và năm SVG. Không có Browser tích hợp trong lượt này, nên không tuyên bố đã kiểm tra bề mặt bằng Codex Slides; cổng hình dùng raster cục bộ và kiểm tra HTTP.
- Liên kết ghi chú Bài 03 chỉ được mở trên trang chỉ mục sau khi các cổng nội dung, công thức, khối Markdown, tài sản và HTTP đều đạt.

## 14. Đồng bộ slide với ghi chú và bổ sung điểm yên ngựa ngày 2026-09-01

- Hai lượt đọc trước soạn phát hiện khoảng trống chính: ghi chú đã có định nghĩa, ví dụ và định lý về điểm yên ngựa của hàm Lagrange nhưng deck chuyển thẳng từ hình học đường đỡ sang KKT. Quyết định thêm đúng một trang C07 sau C06, giữ 7 mạch và mọi trang cũ.
- Tác tử soạn OpenRouter được gọi với mô hình yêu cầu z-ai/glm-5.3-flash, phạm vi sáu tệp Bài 03 và khóa từ .env. API trả HTTP 200 nhưng worker kết thúc mà không trả JSON hoàn tất; nó sửa dở năm tệp. Điều phối viên kiểm tra diff, sửa lỗi gạch chéo kép và hoàn thiện bằng bản vá cục bộ. Không có api_transport_error.
- Deck hiện có 41 ID duy nhất, 41 khối ghi chú và 7 section ngoài. Thứ tự DOM là P00–P03, A01–A08, B01→B03→B02→B04–B06, C01→C03→C02→C04–C07, D01→D05→D02–D04→D06–D07, E01–E06 và Z01–Z03.
- C07 định nghĩa đúng hai phía của điểm yên ngựa, dùng ví dụ $(x^*,\lambda^*)=(2,2)$ với $L(2,\lambda)=5$ và $L(x,2)=3(x-2)^2+5$, rồi nối định lý tương đương nghiệm đạt và $p^*=d^*$ sang KKT. Chứng minh đầy đủ tiếp tục nằm trong ghi chú bài giảng.
- Các sửa tiên quyết cục bộ: A04 chỉ định nghĩa $L$ và báo A05 mới định nghĩa $g$; A07 giải nghĩa khả thi đối ngẫu bằng $\lambda\ge0$; C03 gọi tên đường đỡ; C05 dùng $\lambda_i^*\nabla f_i(x^*)$ cho ràng buộc hoạt động; D04 báo trước trường hợp không khả vi và chỉ tới định nghĩa dưới gradient ở E04; E06 định nghĩa $\mathbb S^r$, $\mathbb S_+^r$ và $K^*$ trước khi dùng.
- Năm phản biện độc lập đều dùng z-ai/glm-5.3-flash qua OpenRouter. Vai chuyên gia và toán học PASS ngay. Vai sinh viên, sư phạm và mạch kể chuyện yêu cầu các sửa nhỏ về câu nối C05→C06→C07, E06→Z01, ký hiệu ma trận, cụm “khả thi đối ngẫu”, đường đỡ và câu D01 trong outline; mọi mục đã được áp dụng.
- Hậu kiểm toán học sau sửa PASS cho A05, A07, C03, C05, C07 và E06. Hậu kiểm mạch kể chuyện sau sửa PASS cho 41 ID, 7 mạch và sáu nối A04→A05, C05→C06, C06→C07, C07→D01, D04→E04, E06→Z01.
- Cổng tĩnh đạt: git diff --check sạch; bộ phân tích HTML xác nhận thẻ cân bằng; không còn chuỗi LaTeX bị gạch chéo kép; HTML, CSS, RevealJS, bốn plugin, KaTeX đúng đường dẫn vendor/katex/dist/ và bốn SVG của deck đều trả HTTP 200 trên máy chủ chỉ gắn 127.0.0.1. Một lần dò nhầm vendor/katex/katex.min.js trả 404; đây không phải URL mà plugin tải và lần kiểm tra đúng vendor/katex/dist/katex.min.js trả 200.
- Dự án Codex Slides bền vững 20260828104958-lecture-03-i-ng-u-lagrange-v-i-u-ki-n-t--obls đã được mở lại và thay dàn ý bằng đúng 41 tiêu đề theo thứ tự RevealJS. Hậu kiểm canonical bằng get_project trả 41 slide, trạng thái draft và handoff tại checkpoint outline. Bề mặt Browser tích hợp và trình duyệt headless không có trong môi trường hiện tại, nên không tuyên bố đã xem trực quan C07/E06 hoặc kiểm tràn bằng Codex Slides/Chromium trong lượt này. Các bằng chứng trực quan cũ không được dùng thay cho kiểm tra sau sửa.

## 14. Chỉnh sửa theo AGENTS.md — thêm C07 và các sửa cục bộ

- **Lý do thay đổi:** đưa khái niệm điểm yên ngựa của hàm Lagrange từ lecture note vào deck và nối đối ngẫu mạnh với KKT; đồng thời áp dụng các sửa cục bộ đã chốt. Giữ nguyên 7 mạch P/A/B/C/D/E/Z và thứ tự mọi slide hiện có; chỉ chèn đúng một slide C07 sau C06, trước D01. Tổng số trang tăng từ 40 lên 41.
- **C07 (mới):** tiêu đề "Điểm yên ngựa của hàm Lagrange"; định nghĩa $L(x^*,\lambda,\nu)\le L(x^*,\lambda^*,\nu^*)\le L(x,\lambda^*,\nu^*)$ với mọi $x\in D$, $\lambda\ge0$, $\nu\in\mathbb R^p$; giải thích cực đại theo nhân tử và cực tiểu theo biến gốc; ví dụ xuyên suốt $x^*=2$, $\lambda^*=2$ với $L(2,\lambda)=5$ và $L(x,2)=3(x-2)^2+5$; định lý ngắn: điểm yên ngựa tương đương nghiệm gốc và đối ngẫu đều đạt cùng $p^*=d^*$. Notes giải thích hai phía và nối sang KKT. Nguồn: Boyd & Vandenberghe (2004), Ch. 5, §5.4; lecture note. Một luận điểm duy nhất, không quá tải.
- **Sửa cục bộ đã áp dụng:**
  - A04: không nhắc $g$ như đã định nghĩa; nói $g$ xuất hiện ở trang kế tiếp.
  - A05: notes thêm chứng minh lõm một câu bằng bất đẳng thức infimum của tổ hợp lồi.
  - B04: notes nói đường chứng minh Slater dùng định lý tách cho tập mở rộng lồi, chi tiết ở lecture note.
  - C05: notes nói $\lambda^*\nabla f$ sẽ được hình thức hóa bởi điều kiện dừng ở mạch D.
  - D04: mặt trang không dùng dưới vi phân như kiến thức đã biết; nói trường hợp không khả vi cần điều kiện dừng tổng quát và dưới gradient được định nghĩa ở E04; notes thêm phản ví dụ phi lồi $\min_{[-1,1]}-x^2$ với $x=0$ dừng nhưng không tối ưu toàn cục.
  - E04: notes thêm ví dụ $q(u)=|u|$, $\partial q(0)=[-1,1]$.
  - E06: định nghĩa rõ $K^*=\{z:\langle z,y\rangle\ge0\text{ với mọi }y\in K\}$; dùng $\lambda\in K^*$; notes chứng minh $\langle\lambda,f(x)\rangle\le0$ cho $x$ khả thi và nêu nón PSD tự đối ngẫu, không tuyên bố nón đối ngẫu đã là tiên quyết.
  - Z01: thêm điểm yên ngựa vào bước Giải thích và notes.
- **Đồng bộ planning:** plan.md, outline.md, storyboard.md và source-map.md đã cập nhật từ 40 thành 41 trang, dải C01–C07, danh sách DOM chèn C07, bản đồ hành trình/định lý, câu nối C06→C07→D01 và nguồn C07 (Boyd §5.4, lecture note). Không xóa lịch sử cũ trong nhật ký này.
- **Trạng thái:** chờ 5 phản biện độc lập (sinh viên, chuyên gia, độ chính xác toán học, học thuật–giảng dạy, mạch kể chuyện) và kiểm định kỹ thuật (Chromium 16:9 và màn hình hẹp, KaTeX, ghi chú, tràn hiển thị) trước khi đóng cổng bàn giao.

## 15. Rà văn phong và mạch khái niệm ngày 2026-09-01

- Đã đọc lại toàn bộ 41 trang và ghi chú bài giảng theo tiêu chí `no-ai-slop`. Ghi chú diễn giả không còn các cụm `Chuyển ý:`, tham chiếu mã mạch, lời mô tả “trang này/trang sau”, hay chỉ dẫn tới lecture note và `math-spec.md`.
- Các cầu nối được viết bằng quan hệ toán học: cận trên từ điểm khả thi dẫn tới nhu cầu cận dưới; Slater dẫn tới tiếp xúc đường đỡ; pháp tuyến dẫn tới KKT; điểm yên ngựa liên kết nghiệm gốc và đối ngẫu.
- Dòng nguồn trên slide chỉ giữ nguồn truy nguyên. Các câu xác nhận “được tính/kiểm tra trong math-spec” được chuyển về hồ sơ kiểm định thay vì lặp trên từng trang.
- Ghi chú bài giảng bỏ các dòng `Đầu ra` lặp mục tiêu đọc hiểu và bỏ tham chiếu tới tệp planning nội bộ. Định nghĩa, ví dụ, định lý, chứng minh, ứng dụng AI và câu hỏi kiểm tra được giữ nguyên.
- Kiểm định tĩnh đạt: 41 mã duy nhất, 41 ghi chú, 7 section ngoài; thẻ `section` và `aside` cân bằng; mọi tài sản tồn tại; SVG hợp lệ theo XML; `git diff --check` đạt.
- Codex Slides xác nhận dự án `20260828104958-lecture-03-i-ng-u-lagrange-v-i-u-ki-n-t--obls` ở trạng thái draft với đúng 41 trang. Phiên hiện tại không có Browser hoặc trình duyệt headless nên không tuyên bố có vòng rà trực quan mới.
- Hậu kiểm toàn khóa thay câu mô tả “mạch đo LLO5” bằng quan hệ giữa biến quyết định và không gian giá trị; nội dung toán và thứ tự trang không đổi.

## 16. Đồng bộ nón, thuật ngữ và nội dung công khai ngày 2026-09-01

- P02 bỏ các nhãn biên soạn “trích đề cương” và “sản phẩm bổ trợ”; P03 đổi thành “Chuỗi lập luận đối ngẫu”. Ghi chú P03, E01 và Z03 chỉ giữ nguồn học thuật, không còn đường dẫn tệp nội bộ hay mô tả quy trình dựng tài sản.
- C05, D01 và D05 dùng “ràng buộc khít” hoặc phương trình biên $f_i(x)=0$. D02 là điểm đầu tiên định nghĩa thuật ngữ “ràng buộc hoạt động”, rồi mới dùng nó trong bù trừ và các trang sau.
- E06 và lecture note dùng cùng khuôn: $f(x)\preceq_K0$, $\lambda\in K^*$, $L=f_0+\langle\lambda,f\rangle$; trường hợp ma trận nêu $F(x)\in\mathbb S^r$, $Z\in\mathbb S_+^r$ cùng cấp và $\langle Z,F(x)\rangle=\operatorname{tr}(ZF(x))$.
- Sao chép hình thứ tự theo nón thành `img/lec-03/cone-induced-orders.svg` và đổi liên kết lecture note sang tài sản của Bài 03; tài liệu công khai không còn phụ thuộc ảnh trong `img/lec-02/`.
- Chuẩn hóa toàn bộ nội dung công khai Bài 03 từ “vector” thành “véc-tơ”. Outline và storyboard đã cập nhật vai trò P02, P03, C05, D01, D05, D02, E01, E06 và Z03.
- Codex Slides đã mở lại dự án `20260828104958-lecture-03-i-ng-u-lagrange-v-i-u-ki-n-t--obls` và xác nhận 41 trang ở trạng thái draft. Phiên này không có công cụ điều khiển Browser, nên không ghi nhận kiểm trực quan HTML bằng giao diện Codex Slides.
- Cổng tĩnh sau sửa đạt: 41 ID duy nhất, 41 khối ghi chú, 7 section ngoài và thẻ section cân bằng; mọi đường dẫn deck/note tồn tại; 25 khối mở rộng Markdown mở/đóng cân bằng; `git diff --check` sạch. KaTeX cục bộ phân tích toàn bộ công thức trong deck và lecture note mà không có lỗi cú pháp.
- Sáu SVG đều hợp lệ theo bộ phân tích XML và chuyển thành PNG thành công. Contact sheet cho thấy nhãn, trục, mũi tên và vùng tô không bị cắt. Riêng bố cục HTML 16:9 và màn hình hẹp chỉ qua kiểm tra cấu trúc tĩnh vì môi trường không có Browser hoặc Chromium.
### Hậu kiểm trực quan sau đồng bộ mạch

- Chromium ở khung $1280\times720$ phát hiện hai thẻ D02 chồng chữ và hộp cuối E06 bị cắt. D02 tách nhãn chữ khỏi công thức bù trừ; E06 gộp cận dưới vào cùng câu hỏi kiểm tra để giảm tải chiều dọc.
- Kết xuất lại D02 và E06 sau sửa; công thức, hai thẻ và câu hỏi đều nằm trong khung.

## 2026-09-12 — Triển khai bài giảng hoàn chỉnh (đang kiểm định)

Yêu cầu hiện hành: diễn giải đối ngẫu Lagrange, Slater và KKT ở mức sinh viên đại học, theo 7 mạch đã duyệt. Yêu cầu mới về phiên bản: chỉ commit cục bộ, không push. Các báo cáo khung phía trên không được dùng làm bằng chứng hoàn thành nội dung mới.

### Tiếp nhận, kế hoạch và nguồn

- Đã đọc lại đề cương DOCX chính thức và chương 5 của `sources/bv_cvxbook.pdf` tại máy; xác nhận buổi 3, LLO4–5/CLO1 và phân bổ 2 tiết lý thuyết + 1 tiết bài tập.
- Giữ dự án Codex Slides `20260828104958-lecture-03-i-ng-u-lagrange-v-i-u-ki-n-t--obls`; trạng thái đầu lượt là 36 trang khung. Chưa coi trạng thái này là bản nội dung mới đã kiểm định.
- Reader lập kế hoạch trước bước soạn; kế hoạch được chấp nhận về thứ tự giai đoạn nhưng không chấp nhận công thức g sai trong đề xuất. Điều phối tự tính lại trước khi giao writer.
- Reader phân tích nguồn chỉ đọc `outline.md` đã được cho phép. Runtime: requested_model = observed_model = `z-ai/glm-5.3-flash`, provider = `OpenRouter`; kết quả ở `/tmp/lec03-full/source-reader.json`. Chấp nhận ánh xạ mạch, bác các phép tính sai: tại λ=0 cực tiểu L đạt ở x=0, không phải mọi x; tại x=4 điều kiện dừng cho λ=−4, không phải −8/3; tung độ cắt là g(λ); độ nhạy tại 0 là −2. Điều phối sửa đặc tả trước bước soạn.
- Writer được cấp riêng `/tmp/lec03-full/writer`, chỉ soạn nội dung mới từ đặc tả toán, không đọc mẫu Bài 02. Runtime: requested_model = observed_model = `z-ai/glm-5.3-flash`, provider = `OpenRouter`; kết quả `/tmp/lec03-full/writer.json` và `writer/content.json`.
- Không tải thêm nguồn MIT; không gửi tệp mẫu Bài 02 tới OpenRouter. Các nguồn mẫu được đọc và ghép bố cục tại máy.

### Biên tập và sửa toán trước rà soát độc lập

- 38 trang, 7 mạch. Thêm S02-05b để tách phép hoàn thành bình phương khỏi định nghĩa inf; thêm S05-05b để chứng minh tính đủ của KKT và chỉ ra chỗ dùng tính lồi. Giữ thứ tự các trang còn lại từ khung.
- Sửa lời giải bài tập `min (x−2)², x≤1`: L phải chứa λ(x−1); g=λ−λ²/4; không bỏ hằng số −λ.
- Sửa hình học: trên G là bất đẳng thức t+λu≥g, không phải mọi điểm nằm trên đường cận. Đường cận được nâng cao nhất từ dưới lên, không hạ thấp nhất. Không khẳng định G lồi; không đồng nhất đối ngẫu mạnh với sự tồn tại đường cận hữu hạn đạt tiếp xúc khi thiếu giả thiết đạt nghiệm.
- Sửa Slater: nêu rõ f0,…,fm lồi hữu hạn trên toàn không gian; giữ đẳng thức affine; kiểm tra p* hữu hạn. Không chuyển bài toán thành ràng buộc nghiêm. Không coi điểm Slater là nghiệm tối ưu.
- Sửa KKT hồi quy: hoạt động không kéo theo λ>0; có thể λ=0. Nêu đủ chiều cần và đủ; không yêu cầu Slater cho chiều KKT đủ. Loại lời tổng kết trong bản nháp khẳng định bỏ Slater thì chứng nhận sai.
- Sửa độ nhạy bài tổng hợp: tăng yêu cầu x1+x2≥1+ε là siết; q′(0)=+1, chi phí tăng. Quy ước nới f1≤u tương ứng u=−ε.
- Viết lại tài liệu đọc theo 7 mạch, thêm 8 bài tập nhiều mức có lời giải. Nội tương đối và đối ngẫu theo nón chuyển sang đọc mở rộng, không là tiên quyết bài tập chính.

### Tài sản và phong cách

Sáu SVG mới tự vẽ từ công thức: `intro-feasible.svg`, `bound-family.svg`, `dual-bound.svg`, `value-plane-1.svg`, `value-plane-2.svg`, `value-sensitivity.svg`. Tất cả có mô tả thay thế, trục và nhãn; phân biệt đường bằng nét liền/nét đứt ngoài màu. Hình học và công thức kiểm tra theo Boyd–Vandenberghe chương 5; không cắt ảnh PDF, không dùng ảnh raster. Hình cũ giữ để truy nguyên nhưng không nhúng trong bản nội dung mới.

Kế thừa kiểu chữ, màu, hộp, lưới và cấu trúc RevealJS của Bài 02. Chỉ bổ sung kích thước ảnh và bảng riêng trong `lecture-03-style.css`; không sửa CSS hoặc runtime dùng chung.

### Các cổng còn phải hoàn tất

Kiểm định storyboard; năm báo cáo độc lập; sửa và rà lại; kiểm tra toàn bộ slide và tài liệu trên máy chủ cổng 8765 ở khung rộng/hẹp, bàn phím và công thức; đồng bộ bản nội dung vào Codex Slides và kiểm tra bền vững/hiển thị; cập nhật chỉ mục sau khi đạt; kiểm tra diff và commit cục bộ. Chưa đánh dấu hoàn thành.

### Kết quả kiểm định storyboard và năm vai độc lập

Bảy lượt chỉ đọc (storyboard, sinh viên, chuyên gia, toán học, giảng dạy, mạch kể chuyện, rà lại) đều trả PASS. Bản gốc từng báo cáo được lưu bên dưới; đây là hồ sơ nhận xét, không phải tài liệu học tập. Điều phối đã đối chiếu độc lập và không coi mọi gợi ý của reviewer là đúng.

| Vấn đề | Quyết định | Bằng chứng xử lý |
|---|---|---|
| S03-04 mất dấu đạo hàm và ký tự x̄ bị escape sai trong bản dựng đầu | Sửa bắt buộc | Dùng ký hiệu prime rõ; kiểm tra C0 và ảnh kết xuất trang 16: f0″=f1″=2, x̄=3 hiển thị đúng |
| p* dùng trước định nghĩa | Sửa | S02-01 định nghĩa giá trị tối ưu ngay khi dùng; cận 4,5 được nêu là giả định trước ví dụ |
| x(0) diễn đạt vòng; làm tròn hồi quy không thống nhất | Sửa | Notes S02-05b nêu cực tiểu duy nhất; S06-04 dùng 1,90357 và sai số 0,00357 |
| Metadata reason cũ ghi năm bước | Sửa | Đồng bộ reason với bảng storyboard; bốn quyết định trên S07-01 giữ nguyên |
| Đề xuất bỏ tính lồi f0 khỏi Slater | Bác | Định lý trong Boyd §5.2.3 cần bài toán lồi, gồm f0. Reviewer rà lại xác nhận quyết định bác đúng |
| Đề xuất đưa mã LLO lên mặt trang | Bác | Trái quy tắc không hiển thị nhãn điều phối nội bộ; ánh xạ đã có trong storyboard và ghi chú |
| Mã lặp trong bản đồ sáu bước | Giữ có giải thích | Đây là ánh xạ nhiều bước được gộp trên cùng trang, không phải tuyến trình chiếu lặp; reviewer rà lại xác nhận |
| Cận toàn cục khi bài nhiễu vô nghiệm | Làm rõ | Ghi chú §6.1 quy ước p(u)=+∞; không thu hẹp sai phạm vi cận toàn cục |
| Bài đầu cho sẵn λ=2 | Giữ theo mức hỗ trợ | Bài 2 tài liệu và bài tổng hợp yêu cầu tự tối ưu nhân tử; bài đầu trên slide tập trung dựng cận và kiểm tra |
| Nhãn SVG nhỏ hoặc chạm đường cong | Sửa | Tăng cỡ nhãn, rút chú giải, tách nhãn tung độ cắt bằng đường dẫn; rà lại hai hình mặt phẳng giá trị |

<details>
<summary>Kiểm định storyboard — PASS — 2026-09-12</summary>

Runtime: requested_model=`z-ai/glm-5.3-flash`, observed_model=`z-ai/glm-5.3-flash`, provider=`OpenRouter`. Vai trò chỉ đọc.

**KẾT LUẬN: PASS** (có vài lỗi nhỏ cần sửa kỹ thuật, không chặn duyệt nội dung).

Tôi xác nhận đã đọc **toàn bộ** slides.json (268 dòng, đủ 38 trang: S01×3, S02×9 gồm 05b, S03×6, S04×4, S05×8 gồm 05b, S06×5, S07×3) và toàn bộ storyboard.md (72 dòng, đủ bảng 38 trang + 7 mạch), kể cả mọi trường `notes` và `reason`. Chỉ dùng mô tả/đường dẫn hình, không xem ảnh trực quan (phần đó thuộc điều phối).

**Kiểm tra tổng thể**
- 7 mạch khớp agenda S01-03; tổng thời lượng 0,10+0,75+0,45+0,35+0,75+0,35+0,25 = **3,00 tiết**, đúng đề cương.
- Mỗi trang có lý do tồn tại, quan hệ trước–sau liên tục S01-01 → S07-03, không đứt mạch; trang bài tập cuối mỗi cụm làm minh chứng đánh giá; hai trang tách thêm (S02-05b, S05-05b) có lý do giảm tải hợp lệ.
- Mức đại học phù hợp: định nghĩa/định lý phát biểu đúng, chứng minh ngắn trong notes, bài tập chuyển giao; tải nhận thức mỗi trang 1 khái niệm chính, công thức nặng đã tách trang.
- Đối chiếu số học thực tế (không phải thẩm định chính, nhưng phát hiện): S02-03 (2(x−1,5)²+4,5), S02-05b (x(λ)=3λ/(1+λ), g=10−λ−9/(1+λ), g(0)=1, g(1)=4,5, g(2)=5), S03-02 (3(x−2)²+5), S03-05 (−1/4λ), S04-01 (bốn điểm đúng), S04-02 (chạm (1,25; 3,25)), S05-01 (f₀′=4, λf₁′=−4), S05-04, S05-07, S06-02 (p(0,1)≈4,807; p′(0)=−2), S06-04 (v′(1)=−1; v(1,1)≈1,9036), S07-02 (d*=1/2, chứng nhận (x₁−½)²+(x₂−½)²+½) — **đều đúng**.

**Vấn đề cụ thể (mức độ: nhỏ / kỹ thuật)**
1. **S03-04 — kỹ thuật, cần sửa**: chuỗi `$\bar x=3$` trong HTML chỉ có một dấu backslash; trong JSON `\b` là escape backspace, làm hỏng ký tự khi render (các trang khác dùng `\\` đúng). Đề xuất: đổi thành `$\\bar{x}=3$` (2 chỗ trong html của S03-04).
2. **S03-04 — nhỏ, mặt slide**: dòng "$f_0=f_1=2>0$: hai hàm lồi" dễ đọc nhầm là "f₀ bằng f₁ bằng 2". Ý là f₀″=f₁″=2>0. Đề xuất: viết "$f_0''=f_1''=2>0$".
3. **Storyboard, bảng bản đồ mạch 2 — nhỏ, nhất quán nội tại**: chuỗi ghi "S02-01 → S02-03 → S02-02–03" nhưng phần diễn giải cùng ô (và thứ tự trình chiếu) khẳng định S02-02 đứng trước S02-03. Đề xuất: sửa chuỗi thành "S02-01 → S02-02 → S02-03 → …".
4. **Storyboard, mạch 3 và 4 — nhỏ, hình thức**: các chuỗi lặp mã ("S03-01 → S03-01", "S04-01 → S04-01 → S04-01–02") gây nhiễu; đề xuất rút gọn một mã mỗi bước.
5. **S04-04 — nhỏ, chính tả**: "Đường t=4,5−u **đỡ** và chạm G" — có lẽ là "nằm dưới và chạm". Đề xuất sửa từ.

**Ghi chú phân biệt**: các nội dung như lời giải bài tập (S02-08, S03-06, S04-04, S05-07, S06-05, S07-02), ví dụ phi lồi min(−x²), ví dụ phản chứng Slater — chỉ nằm ở notes, đúng thiết kế "lời giải ở ghi chú", không tính là thiếu trên mặt slide. Không thấy lỗi công thức thực sự; các công thức do điều phối kiểm tra nhưng kết quả đối chiếu của tôi đều khớp.

Không yêu cầu viết lại; 5 mục trên là mức tối thiểu cần xử lý (mục 1 bắt buộc vì lỗi escape).

</details>

<details>
<summary>Sinh viên — PASS — 2026-09-12</summary>

Runtime: requested_model=`z-ai/glm-5.3-flash`, observed_model=`z-ai/glm-5.3-flash`, provider=`OpenRouter`. Vai trò chỉ đọc.

# Báo cáo đánh giá độc lập — Bài 03: Đối ngẫu Lagrange, Slater, KKT

**Vai trò:** sinh viên đại học, tự luyện từ notes + slides + exercises. **Phạm vi đã đọc:** toàn bộ `slides.json` (38 trang, gồm S02-05b và S05-05b), `lecture-note.md` (393 dòng), `exercises.md` (210 dòng). **Chưa kiểm tra:** `storyboard.md`, các ảnh SVG (chỉ đọc alt/mô tả [HÌNH], không xem ảnh), runtime cục bộ, nguồn mẫu ngoài.

## Kết luận: **PASS** (không có lỗi chặn; vài vấn đề nhỏ nên sửa khi có dịp)

## Điểm đã kiểm tra đúng

- **Số học xuyên suốt:** L(x,1)=2(x−1,5)²+4,5; g(λ)=10−λ−9/(1+λ) (đã kiểm tra lại đồng nhất thức (1+8λ)(1+λ)−9λ²=1+9λ−λ²); g(0)=1, g(1)=4,5, g(2)=5; λ*=2; L(x,2)=3(x−2)²+5. Đúng.
- **Độ nhạy:** p(u)=11+u−6√(1+u); p′(0)=−2=−λ*; p(0,1)≈4,80715; p(1)=12−6√2≈3,51472; cận p(u)≥5−2u đúng tại cả hai điểm. Đúng, nhất quán giữa note, slide S06-02/04/05 và bài tập 7.
- **Bài tập:** Bài 2 (g=λ−λ²/4, λ*=2, Slater x̄=0), Bài 3 (ν*=−1, λᵢ*=0), Bài 4 (g(λ)=−1/(4λ), sup không đạt), Bài 6 (w=−1 cho λ=−2), Bài 8 (g=λ−λ²/2, q(ε)=(1+ε)²/2, q′(0)=1, nhất quán dấu với quy ước u=−ε). Tất cả tính lại đúng.
- **Khái niệm:** phân biệt khoảng cặp vs khoảng tối ưu (S03-01, bài tập 5); Slater là điều kiện đủ, không bảo đảm nghiệm gốc tồn tại (S03-03); ví dụ biên x²≤0 tách ba mệnh đề (S03-05, bài 4); "hoạt động ⇏ nhân tử dương" (S05-02); chiều đủ không cần Slater, chiều cần cần Slater (S05-05, S05-05b); cảnh báo không áp lại ràng buộc khi lấy inf (S02-05). Đủ tiên quyết được nêu (gradient, lồi, hoàn thành bình phương — S01-02).
- **Ký hiệu:** inf/sup được định nghĩa ngay khi dùng (note §2.3, S02-05); o(|ε|) được giải thích (note §6.2); I là ma trận đơn vị được nói rõ (note §5.5).

## Bảng vấn đề

| Mã | Mức độ | Bằng chứng | Cách sửa |
|---|---|---|---|
| S02-01 | Nhỏ | Slide dùng $p^*$ và "phương án khả thi có chi phí 5" trước khi ví dụ và ký hiệu p* được giới thiệu (S02-02 mới định nghĩa). | Thêm một cụm "gọi p* là giá trị tối ưu (định nghĩa ở trang sau)" hoặc đảo thứ tự giới thiệu ví dụ lên trước. |
| S07-01 | Nhỏ | Notes và reason ghi "Checklist **năm** bước" nhưng slide chỉ liệt kê **4** mục (Lập cận, Cận khít, Chứng nhận, Độ nhạy). | Sửa thành "bốn bước" hoặc thêm mục thứ năm (ví dụ "Kiểm tra giả thiết trước khi kết luận"). |
| S06-04 | Nhỏ | Notes ghi v(1,1)≈1,904 và "sai lệch nhỏ 0,004"; note bài giảng §6.3 và exercises bài 7 ghi 1,90357 (sai lệch thực ≈0,00357). Không mâu thuẫn nhưng làm tròn không nhất quán giữa hai tài liệu. | Thống nhất một mức làm tròn (1,9036 hoặc 1,904) và nêu sai số cùng độ chính xác. |
| S02-05b | Nhỏ | Notes: "Khi lambda bằng 0, nghiệm của bài toán bên trong là x bằng 0, **không phải mọi x**" — đúng về mặt tính toán (x(0)=0) nhưng dễ đọc nhầm thành cảnh báo; câu này có thể gây bối rối vì với λ=0, L=x²+1 đạt cực tiểu duy nhất tại 0. | Viết rõ: "x(0)=0 là điểm cực tiểu duy nhất của L(x,0); đây không phải nghiệm gốc vì x=0 không khả thi." |
| S05-01 | Nhỏ | Slide ghi "$f_0'=4$, $\lambda^*f_1'=-4$" mà chưa ghi rõ f₁′(2)=−2 và λ*=2 đã biết từ trước; sinh viên đọc slide riêng có thể không theo được con số −4. | Ghi tắt "f₁′(2)=−2, λ*=2 nên λ*f₁′=−4" trên slide hoặc để chi tiết trong notes (hiện notes đã có, chỉ cần slide tự chứa đủ). |

Không phát hiện: tiên quyết thiếu, ký hiệu chưa định nghĩa trong tuyến chính, công thức sai, bài tập chưa được chuẩn bị bởi nội dung bài giảng (mỗi bài tập slide S02-08, S03-06, S04-04, S05-07, S06-05, S07-02 đều có lời giải tương ứng trong exercises.md bài 2, 3, 5, 6, 7, 8), hay lỗi escape JSON (các chuỗi `\\` trong file là escape đúng của JSON; nội dung LaTeX thật là `\le`, `\lambda`,… — đã kiểm tra nội dung, không nhầm với cách hiển thị công cụ).

## Nhận xét về khả năng tự luyện

Sinh viên có thể tự học trọn vẹn: mọi bài tập chỉ dùng hoàn thành bình phương, đạo hàm và các định lý đã phát biểu; lời giải gập trong `::: solution`; các cạm bẫy (bỏ hằng số −λ, đồng nhất x(λ) với nghiệm gốc, dùng xấp xỉ tuyến tính ngoài vùng nhỏ) được cảnh báo cả trên slide lẫn notes. Phạm vi được khoanh rõ: không đòi nội tương đối, phân tách Slater hay tối ưu số — phù hợp yêu cầu "đúng giả thiết và vận dụng" ở mức đại học.

**Kết luận cuối: PASS.** Năm vấn đề nhỏ nêu trên là chỉnh sửa văn phong/nhất quán, không chặn việc sử dụng tài liệu.

</details>

<details>
<summary>Chuyên gia — PASS — 2026-09-12</summary>

Runtime: requested_model=`z-ai/glm-5.3-flash`, observed_model=`z-ai/glm-5.3-flash`, provider=`OpenRouter`. Vai trò chỉ đọc.

# Báo cáo rà soát — Bài 03: Đối ngẫu Lagrange (slides.json 38 trang, lecture-note.md)

## Kết luận: **PASS**

## Phạm vi đã kiểm tra (đọc đầy đủ cả hai tệp)

**Định nghĩa & phép tính:**
- S02-04/05: định nghĩa L, g, inf trên toàn Rⁿ — đúng, có cảnh báo "không áp lại ràng buộc" và g có thể −∞.
- S02-05b: L=(1+λ)(x−3λ/(1+λ))²+1+8λ−9λ²/(1+λ); kiểm tra đại số g(λ)=10−λ−9/(1+λ) ✓; g(0)=1, g(1)=4,5, g(2)=5 ✓.
- S02-03: L(x,1)=2x²−6x+9=2(x−1,5)²+4,5 ✓.
- S03-02: L(x,2)=3x²−12x+17=3(x−2)²+5 ✓.

**Định lý:**
- Đối ngẫu yếu (S02-06, note §2.5): chuỗi g≤L≤f₀ với đúng chỗ dùng tính khả thi ✓; không đòi lồi ✓.
- Slater (S03-03, note §3.2): giả thiết lồi + hữu hạn trên Rⁿ, một điểm nghiêm cho mọi bất đẳng thức, đẳng thức giữ đúng; kết luận hai phần (d*=p* và đối ngẫu đạt nghiệm), p* hữu hạn, không bảo đảm nghiệm gốc đạt — phát biểu đúng mức đại học, không đòi chứng minh phân tách ✓.
- Cần/đủ KKT (S05-05, note §5.4): chiều đủ không cần Slater; chiều cần = lồi + Slater + nghiệm tồn tại ⇒ tồn tại nhân tử — đúng ✓. Chứng minh chiều đủ (S05-05b) đúng điểm dùng tính lồi ✓.

**Ví dụ phản chứng:** S03-05 (min x, x²≤0): g(λ)=−1/(4λ), sup=0 không đạt ✓ — phân biệt ba mệnh đề đúng.

**Hình học:** S04-01: bốn điểm (8,1),(0,5),(−1,10),(0,17) đều đúng f₁, f₀ ✓. S04-02: λ=1 chạm tại (1,25; 3,25) ✓. S04-03: t+2u−5=3(x−2)²≥0 ✓. Cảnh báo "G không nhất thiết lồi" đúng ✓.

**KKT:** S05-04: bảng lọc ứng viên (0,0) loại vì f₁(0)=8; (2,2) hợp lệ; (4,−4) loại dấu ✓. S05-02: ví dụ min x², x≤0 với (0,0), dừng 2x+λ=0 ✓ — chặn đúng hiểu lầm "active ⇒ λ>0". S05-06: Xᵀ(Xw−y)+2λw=0 ✓, Slater w=0 với τ>0 ✓, không giả định hạng X ✓.

**Độ nhạy:** S06-02: x*(u)=3−√(1+u), p(u)=11+u−6√(1+u); p(0,1)≈4,807; p(1)=12−6√2≈3,5147; p′(0)=−2=−λ* ✓; vùng hợp lệ −1≤u≤8 và nhánh u≥8 cho p=1 (note) ✓. S06-03: cận toàn cục p(u)≥p(0)−λ*u suy luận đúng (λ*≥0, f₁≤u) ✓; tách cận toàn cục / xấp xỉ cục bộ ✓. S06-04: v(τ)=½(3−√τ)², v′(1)=−1, v(1,1)≈1,9036 ✓.

**Bài tập (notes):** S02-08 (g=λ−λ²/4, g(2)=1) ✓; S03-06 (Slater (1,1), p*=0,5) ✓; S05-07 (w*=1, λ*=1, mất mát 2) ✓; S07-02 (g=λ−λ²/2, d*=1/2, L(x,1)=(x₁−½)²+(x₂−½)²+½, q′(0)=1, dấu u=−ε khớp) ✓.

## Bảng vấn đề

| Mã | Mức độ | Bằng chứng | Cách sửa |
|---|---|---|---|
| S07-01 (reason) | Nhỏ | reason viết "Checklist năm bước" nhưng slide liệt kê 4 mục | Sửa reason thành "bốn bước" (chỉ metadata, không ảnh hưởng nội dung giảng) |
| S02-06 (html) | Nhỏ | "Không cần tính lồi" — cụm tối nghĩa, ý là "định lý đúng cho cả bài toán phi lồi" | Đổi thành "Đúng cho cả bài toán phi lồi" |

Không tìm thấy lỗi toán học, lỗi giả thiết Slater/KKT, lỗi dấu, lỗi escape JSON, hay lệch số giữa slides và lecture-note.

## Phạm vi chưa kiểm tra
- Các tệp SVG hình minh họa (img/lec-03/*.svg) — chỉ đối chiếu mô tả alt/notes với phép tính, không xem nội dung đồ thị.
- exercises.md, storyboard.md (ngoài phạm vi được giao).
- Tính đúng đắn của liên kết ngoài (Boyd, MIT OCW) ở mức URL hoạt động.

</details>

<details>
<summary>Toán học — PASS — 2026-09-12</summary>

Runtime: requested_model=`z-ai/glm-5.3-flash`, observed_model=`z-ai/glm-5.3-flash`, provider=`OpenRouter`. Vai trò chỉ đọc.

# Báo cáo kiểm tra toán độc lập — Bài 03: Đối ngẫu Lagrange

**Phạm vi đã đọc đầy đủ:** slides.json (38 slide, gồm S02-05b và S05-05b), lecture-note.md (393 dòng), exercises.md (210 dòng). Tự tính lại mọi phép tính, không dựa vào kết quả có sẵn.

## Các phép tính đã kiểm tra lại và xác nhận đúng

| Vị trí | Kiểm chứng độc lập |
|---|---|
| S02-05b, note §2.4 | $L=(1+\lambda)x^2-6\lambda x+1+8\lambda$; hoàn thành bình phương cho cực tiểu tại $x=3\lambda/(1+\lambda)$, $g=1+8\lambda-\frac{9\lambda^2}{1+\lambda}=10-\lambda-\frac{9}{1+\lambda}$. Đã kiểm tra đồng nhất thức: $(1+8\lambda)(1+\lambda)-9\lambda^2=1+9\lambda-\lambda^2=(1+\lambda)(10-\lambda)-9$. ✓ |
| Giá trị $g(0)=1$, $g(1)=4{,}5$, $g(2)=5$ (S02-07, note) | Thay trực tiếp: đúng cả ba. ✓ |
| $g'=-1+\frac{9}{(1+\lambda)^2}$, $g''=-\frac{18}{(1+\lambda)^3}<0$, cực đại tại $\lambda=2$ (note §2.5) | ✓ |
| $L(x,2)=3x^2-12x+17=3(x-2)^2+5$ (S03-02, S04-03, note) | ✓ |
| Slater: $f_1=(x-3)^2-1$, $\bar x=3$ cho $f_1(3)=-1<0$; $f_0''=f_1''=2>0$ (S03-04) | ✓ |
| Ví dụ phản chứng $x^2\le0$: $g(\lambda)=-\frac{1}{4\lambda}$ ($\lambda>0$), $g(0)=-\infty$, $\sup g=0=p^*$ không đạt; dừng KKT $1+2\lambda\cdot0=0$ vô nghiệm (S03-05, note §3.4, bài tập 4) | Hoàn thành bình phương $\lambda(x+\frac{1}{2\lambda})^2-\frac{1}{4\lambda}$ đúng. ✓ |
| Hình học: $(u,t)$ tại $x=0,2,3,4$ là $(8,1),(0,5),(-1,10),(0,17)$; $\lambda=1$ chạm tại $(1{,}25;3{,}25)$; $t+2u-5=3(x-2)^2\ge0$ (S04-01→04, note §4, bài tập 5) | Tính lại $f_1(1{,}5)=(-0{,}5)(-2{,}5)=1{,}25$, $f_0(1{,}5)=3{,}25$. ✓ |
| KKT ví dụ chính: $\lambda=0\Rightarrow x=0$ (khả thi sai, $f_1(0)=8$); $x=2\Rightarrow\lambda=2$; $x=4\Rightarrow\lambda=-4$ loại (S05-04, note §5.3) | ✓ |
| Bài tập 2: $L=(x-2-\lambda/2)^2\cdot$… kiểm tra lại $L=(x-2)^2+\lambda(x-1)=(x-2+\lambda/2)^2+\lambda-\lambda^2/4$ (hạng bù $+\lambda$ đúng); $g(2)=1$; Slater $\bar x=0$; KKT $\lambda=2$ | ✓ |
| Bài tập 3: Slater $(1/2,1/2)$, $\nu^*=-1$, $p^*=1/2$ | ✓ |
| Bài tập 6: $\lambda^*(\tau)=\frac{3-\sqrt\tau}{2\sqrt\tau}>0$ với $0<\tau<9$; $\tau\ge9$: $w^*=3,\lambda=0$; tại $\tau=9$ hoạt động nhưng $\lambda=0$ | ✓ |
| Độ nhạy: $p(u)=11+u-6\sqrt{1+u}$ (kiểm tra $(3-\sqrt{1+u})^2+1$); $p'(0)=-2$; $p(0{,}1)=4{,}80715$; $p(1)=12-6\sqrt2=3{,}51472$; $u\ge8\Rightarrow p=1$; $u<-1$ vô nghiệm (S06-02/03/05, note §6, bài tập 7) | ✓ |
| Cận toàn cục $p(u)\ge5-2u$: tự kiểm chứng đại số $\iff u^2\ge0$, đúng trên toàn miền $u\ge-1$. ✓ |
| Hồi quy: $v(\tau)=\frac12(3-\sqrt\tau)^2$, $v'(1)=-1$, $v(1{,}1)\approx1{,}90357$ (S06-04, note §6.3, bài tập 7) | Tính lại $\sqrt{1{,}1}\approx1{,}048809$. ✓ |
| Bài tập 8: $g=\lambda-\lambda^2/2$, $d^*=1/2$ tại $\lambda=1$; chứng nhận $L(x,1)=(x_1-\frac12)^2+(x_2-\frac12)^2+\frac12$; $q(\varepsilon)=(1+\varepsilon)^2/2$, $q'(0)=1$, nhất quán $u=-\varepsilon$ | ✓ |

## Các điểm khái niệm đã kiểm tra đúng

- **inf/sup vs. đạt nghiệm:** phân biệt nhất quán và đúng ở S02-05, S02-07, S03-05, note §2.3/§3.4, bài tập 1.6, 4. Đặc biệt đúng: ví dụ $x^2\le0$ cho đối ngẫu mạnh nhưng sup không đạt, và không có nhân tử KKT — ba mệnh đề tách bạch rõ.
- **Cận vs. xấp xỉ:** S06-03 và note §6.2 tách đúng cận toàn cục $p(u)\ge p(0)-\lambda^*u$ (chỉ cần đối ngẫu mạnh + nhân tử tối ưu) với xấp xỉ cục bộ (cần $p$ khả vi); bài tập 5/7 chặn đúng lỗi "khoảng cặp ≠ khoảng đối ngẫu tối ưu".
- **Giả thiết Slater:** phát biểu đúng (lồi + hữu hạn trên $\mathbb R^n$, đẳng thức affine, một điểm nghiêm chung, $p^*$ hữu hạn); ghi rõ tính đủ, không bảo đảm nghiệm gốc đạt; không đòi chứng minh phân tách, chỉ dẫn §5.3.2. Đúng yêu cầu.
- **Chiều đủ KKT không cần Slater** (S05-05, S05-05b, note §5.4): chứng minh đúng, đúng chỗ dùng tính lồi và dấu nhân tử.
- **Bù trừ:** chiều "không hoạt động ⇒ $\lambda=0$" và phản ví dụ $\min x^2$, $x\le0$ với $(0,0)$ đúng (S05-02, note §5.2).
- JSON escape: các công thức trong slides.json đều escape đúng (`\\lambda` v.v.), không có lỗi cấu trúc.

## Vấn đề phát hiện

| Mã | Mức độ | Bằng chứng | Cách sửa |
|---|---|---|---|
| S02-05b (notes) | Nhỏ | "Khi lambda bằng 0, nghiệm của bài toán bên trong là x bằng 0, không phải mọi x" — đúng, nhưng dễ đọc nhầm thành "không phải mọi $x$" mang nghĩa phủ định rộng; câu hơi tối nghĩa. | Viết rõ: "tại $\lambda=0$, $L=x^2+1$ đạt cực tiểu duy nhất tại $x=0$." |
| S06-03 / note §6.2 | Nhỏ | Cận toàn cục $p(u)\ge p(0)-\lambda^*u$ phát biểu "cho mọi $u$" mà không nói rõ chỉ áp dụng khi bài nhiễu khả thi ($u\ge-1$ trong ví dụ); với $u<-1$, $p(u)=+\infty$ và bất đẳng thức vẫn đúng nhưng nên nêu. | Thêm một mệnh đề "với mọi $u$ mà bài toán nhiễu khả thi" (note đã ngầm hiểu; slide có thể thêm 3 từ). |
| Bài tập 1.5 | Nhỏ | Câu "Đúng trong dạng bài đang học" — chính xác, nhưng người học có thể khái quát hóa ra bài toán lồi có miền $D\ne\mathbb R^n$. | Thêm chú thích "giả thiết hữu hạn trên toàn không gian là phần của 'dạng bài đang học'". |

Không có vấn đề mức chặn hoặc nghiêm trọng.

## Phạm vi chưa kiểm tra

- Các tệp SVG (`img/lec-03/*.svg`) và `storyboard.md`: không thuộc phạm vi được yêu cầu, chưa đọc; tính đúng đắn hình học chỉ kiểm tra qua tọa độ số trong văn bản.
- Tính chính xác của liên kết ngoài (Stanford, MIT OCW) và metadata runtime: ngoài phạm vi, do điều phối kiểm tra riêng.

## Kết luận: **PASS**

Toàn bộ hệ số, dấu đạo hàm, giá trị inf/sup, các ví dụ biên ($x^2\le0$, $\tau=9$, $u\ge8$, $u<-1$) và phân biệt cận/xấp xỉ đều tự tính lại và khớp. Ba ghi chú mức nhỏ là tinh chỉnh diễn đạt, không bắt buộc để duyệt.

</details>

<details>
<summary>Phản biện giảng dạy — PASS — 2026-09-12</summary>

Runtime: requested_model=`z-ai/glm-5.3-flash`, observed_model=`z-ai/glm-5.3-flash`, provider=`OpenRouter`. Vai trò chỉ đọc.

# Báo cáo phản biện độc lập — Bài 03: Đối ngẫu Lagrange

## Phạm vi đã kiểm tra
Đã đọc toàn bộ `slides.json` (38 trang, đủ 7 mạch, gồm S02-05b và S05-05b), `storyboard.md` (72 dòng) và `exercises.md` (8 bài + lời giải). Đã kiểm tra lại độc lập các phép tính chính: hoàn thành bình phương ở S02-03, S02-05b (g(λ)=10−λ−9/(1+λ) ≡ (1+9λ−λ²)/(1+λ), g(1)=4,5; g(2)=5), S03-02 (L(x,2)=3(x−2)²+5), bảng KKT S05-04, p(u)=11+u−6√(1+u) ở S06-02, v(τ) ở S06-04, và toàn bộ lời giải exercises 2–8. Toàn bộ toán học **đúng**. JSON escape đúng (các `\\\\` là chuỗi JSON hợp lệ cho `\\` LaTeX), không có lỗi cú pháp.

## Điểm đã kiểm tra đúng
- **Ví dụ trước ký hiệu**: S02-01 dùng con số 5/4,5 trước khi định nghĩa L, g (S02-04–05) — đúng chu trình nhu cầu → trực quan → hình thức → bài tập.
- **Mục tiêu đo được**: S01-02 dùng động từ đo được (tính, kiểm tra, đọc, diễn giải); mỗi mạch có slide bài tập làm minh chứng (S02-08, S03-06, S04-04, S05-07, S06-05, S07-02), khớp storyboard.
- **Phân biệt LLO4/LLO5**: storyboard gán LLO5 cho mạch hình học (S04-01→04), LLO4 cho cận/Slater/KKT, CLO1 cho độ nhạy — phân định rõ năng lực hỗ trợ (đọc hình) với mục tiêu chính.
- **Giả thiết Slater đúng mức**: S03-03 phát biểu đúng (lồi, hữu hạn trên toàn Rⁿ, một điểm nghiêm chung); S03-05 cho phản ví dụ x²≤0 tách ba mệnh đề (đối ngẫu mạnh / đạt nghiệm / Slater) — không đòi phân tách Slater quá mức. S05-05b chứng minh tính đủ KKT không cần Slater — chính xác.
- **Chặn hiểu lầm chủ động**: khoảng của cặp ≠ khoảng đối ngẫu (S03-01, S04-04 câu 3); active ⇏ λ>0 (S05-02); xấp xỉ tuyến tính ≠ sai phân chính xác (S06-03, S06-05, exercise 1.6).
- **Tải nhận thức**: hai trang tách b (S02-05b, S05-05b) hợp lý; notes chứa chi tiết mở rộng (ví dụ phản chứng, giải thích kinh tế) không bị đẩy lên màn chiếu.

## Bảng vấn đề

| Mã | Mức độ | Bằng chứng | Cách sửa |
|---|---|---|---|
| S01-02 | Nhỏ | Slide mục tiêu không gắn mã LLO4/LLO5/CLO1; chỉ notes (dòng 13) nói "hỗ trợ chuẩn đầu ra bài học 4/5". Sinh viên không tự phân biệt mục tiêu chính với năng lực hỗ trợ. | Thêm nhãn gọn trên slide, ví dụ "(LLO4)" sau mục tiêu 1–2, 4; "(LLO5)" sau mục tiêu 3. |
| S02-01 | Nhỏ | "Chứng minh mọi phương án khả thi đều có chi phí ít nhất 4,5" nhưng tại thời điểm này chưa có cơ chế sinh cận; con số 4,5 treo không nguồn. | Thêm một câu dẫn: "bằng một hàm phụ được chọn hợp lý (sẽ thấy ở S02-03)" để con số không giống như tiên đề. |
| S02-08 | Nhỏ | Câu 3 chỉ sẵn "Dùng λ=2", làm mất bước tự chọn nhân tử — một kỹ năng LLO4 cần đo. | Đổi thành "tìm λ sao cho cận khít với nghiệm x=1, và chứng nhận"; giữ đáp án λ=2 trong notes. |
| Storyboard, bảng mạch 3–5 | Nhỏ | Lỗi soạn thảo lặp mã: "S03-01 → S03-01", "S04-01 → S04-01 → S04-01–02", "S05-01 → S05-01 → S05-01–02" — tự trỏ chính mình, mâu thuẫn cột "Trước → sau" ở bảng trang (S03-01: S02-08 → S03-02). | Sửa chuỗi thành S03-01 → S03-02 → S03-03…, S04-01 → S04-02…, S05-01 → S05-02… cho nhất quán. |
| S06 mạch (storyboard dòng 25, 65–69) | Nhỏ | Toàn mạch độ nhạy chỉ gán CLO1 (chuẩn học phần), không có LLO riêng; S06-05 là minh chứng nhưng không ánh xạ về mục tiêu bài học nào ở S01-02 ngoài mục 4 chung chung. | Gắn mục tiêu 4 của S01-02 với mạch 6 một cách tường minh (ví dụ ghi "CLO1/LLO4-độ nhạy") để đánh giá không bị mồ côi chuẩn. |
| exercises.md bài 3 | Nhỏ | Đề yêu cầu "tìm một bộ KKT và chứng nhận nghiệm tối ưu" nhưng lời giải dùng λ₁=λ₂=0 do ràng buộc không hoạt động — sinh viên dễ bỏ qua việc lập luận "không hoạt động ⇒ λ=0" nếu chưa học kỹ S05-02; đề không nhắc kiểm tra chiều này. | Thêm gợi ý trong `::: hint` (bài 3 hiện không có hint): "hai ràng buộc bất đẳng thức tại x* không hoạt động; suy ra gì về λᵢ?". |

Không phát hiện vấn đề mức **chặn** hoặc **nghiêm trọng**: không có sai công thức, sai giả thiết, sai dấu, hay khẳng định quá mức của định lý.

## Phạm vi chưa kiểm tra
- Các tệp hình `img/lec-03/*.svg` và `lecture-note.md` không nằm trong phạm vi được cấp/đọc — tính đúng đắn của hình minh họa (S02-02, S02-03, S04-02/03, S06-02) chỉ được kiểm tra gián tiếp qua alt-text và notes.
- Metadata runtime (requested/observed model) thuộc hệ thống điều phối bên ngoài, không tự khai.
- Tính hiển thị CSS của các class (`box`, `example-grid`, `grid2`) không đánh giá được.

## Kết luận: **PASS**
Nội dung đủ chuẩn vận hành: mục tiêu đo được, ví dụ trước ký hiệu, chu trình học kín (mỗi mạch khép bằng bài tập có lời giải), toán học chính xác, giả thiết Slater và KKT phát biểu đúng giới hạn. Sáu vấn đề nêu trên đều mức nhỏ, sửa được bằng biên tập, không yêu cầu tái cấu trúc.

</details>

<details>
<summary>Mạch kể chuyện — PASS — 2026-09-12</summary>

Runtime: requested_model=`z-ai/glm-5.3-flash`, observed_model=`z-ai/glm-5.3-flash`, provider=`OpenRouter`. Vai trò chỉ đọc.

# Báo cáo review — Mạch kể chuyện Bài 03 (slides.json 38 trang + storyboard.md)

## Phạm vi đã kiểm tra
- Đọc toàn bộ storyboard.md (72 dòng) và slides.json (268 dòng, 38 đối tượng slide, gồm S02-05b và S05-05b).
- Đếm mã trang: S01 (3) + S02 (9, gồm 05b) + S03 (6) + S04 (4) + S05 (8, gồm 05b) + S06 (5) + S07 (3) = **38, khớp**.
- Kiểm tra từng công thức chính bằng tay; kiểm tra chuỗi trước–sau trong bảng "Quyết định theo từng trang" và bản đồ hành trình.

## Điểm đã kiểm tra đúng

**1. Bảy mạch liên tục, mỗi trang có vai trò riêng.** Bảng 7 mạch có cột Đầu vào/Đầu ra rõ ràng; bảng 38 trang có cột "Trước → sau" tạo chuỗi liên tục S01-01 → … → S07-03, không đứt gãy. Các trang bài tập (S02-08, S03-06, S04-04, S05-07, S06-05, S07-02) đều là điểm chuyển mạch, đúng vai trò minh chứng.

**2. Câu chuyển và ví dụ xuyên suốt.** Chuỗi kết nối g → Slater → hình học → KKT → độ nhạy được dẫn bằng chính ví dụ f₀=x²+1, f₁=(x−2)(x−4):
- S02-05b tính g(λ)=10−λ−9/(1+λ); kiểm tra: g(0)=1, g(1)=4,5, g(2)=5 — khớp S02-07 và S03-01.
- S03-02: L(x,2)=3x²−12x+17=3(x−2)²+5 ✓, nối sang Slater ở S03-03.
- S04-01: bốn điểm (8,1),(0,5),(−1,10),(0,17) đúng f₁, f₀; S04-03: t+2u−5=3(x−2)²≥0 ✓, khớp g(2)=5.
- S05-01: f₀′(2)=4, λ*f₁′=2·(−2)=−4 ✓; S05-04 bảng ứng viên (0,0)/(2,2)/(4,−4) đúng, λ*=2 khớp phân tích đối ngẫu.
- S06-02: p(u)=11+u−6√(1+u) ✓; p′(0)=−2=−λ* ✓; p(0,1)≈4,807 ✓; S06-05 p(1)=12−6√2≈3,5147 ✓.

**3. Toán đúng ở các điểm nhạy cảm:**
- S02-05b hoàn thành bình phương: (1+λ)(x−3λ/(1+λ))²+1+8λ−9λ²/(1+λ) ≡ 10−λ−9/(1+λ) ✓ (đã kiểm đại số).
- S02-08: g(λ)=λ−λ²/4, g(2)=1=p* ✓.
- S03-05 phản ví dụ x²≤0: g(λ)=−1/(4λ), sup=0 không đạt ✓; tách đúng ba mệnh đề (đối ngẫu mạnh / Slater / đạt nghiệm).
- S05-05/05b: chiều đủ không cần Slater, chiều cần có Slater — đúng Boyd 5.5.3; ví dụ phi lồi min(−x²) tại 0 trong notes hợp lệ.
- S05-06: ∇f₁=2w, phương trình dừng Xᵀ(Xw−y)+2λw=0 ✓; Slater w=0 nghiêm khi τ>0 ✓.
- S06-04: v(τ)=½(3−√τ)², v′(1)=−1 ✓; v(1,1)≈1,9036 khớp "1,90357".
- S07-02: g(λ)=λ−λ²/2, d*=1/2, q(ε)=(1+ε)²/2, q′(0)=1, quy ước u=−ε khớp dấu p′(0)=−λ* ✓.

**4. Gộp bước có lý do.** Hai trang hậu tố b (S02-05b, S05-05b) có lý do "giảm tải lập luận" trong storyboard; các cụm gộp (S03-01 gộp nhu cầu+trực quan, S04-01 gộp đổi tọa độ+ví dụ, S06-02 gộp hình+công thức) đều được nêu lý do trong bản đồ hành trình. Ví dụ dẫn nhập S02-02 đứng trước trực quan S02-03 có lý do rõ ("làm cụ thể nhu cầu cận dưới") — chấp nhận được theo tiêu chí.

**5. Chi tiết notes không bị ép lên màn chiếu.** Các phản ví dụ (S03-05, S05-05, S05-05b), lời giải bài tập (S02-08, S03-06, S05-07, S06-05, S07-02) chỉ nằm trong notes; slide chỉ giữ đề bài. Đúng yêu cầu.

**6. JSON hợp lệ.** Toàn bộ 38 mục parse được; các escape `\\\\`, `\(`… là kết quả json.dumps đúng, nội dung công thức thật đọc ra chuẩn (đã đối chiếu nhiều công thức: S02-05b, S04-03, S06-02, S07-02).

## Bảng vấn đề

| Mã | Mức độ | Bằng chứng | Cách sửa |
|---|---|---|---|
| S03-03 | Nhỏ | Giả thiết viết "$f_0,\ldots,f_m$ lồi" — định lý Slater (Boyd 5.2.3) chỉ đòi $f_1,\ldots,f_m$ lồi; $f_0$ không cần lồi cho kết luận $d^*=p^*$. | Sửa thành "$f_1,\ldots,f_m$ lồi, hữu hạn trên $\mathbb R^n$" (hoặc ghi chú $f_0$ không cần lồi). Không chặn vì giả thiết mạnh hơn vẫn cho kết luận đúng. |
| S04-01 (storyboard dòng 23) | Nhỏ | Chuỗi "S04-01 → S04-01 → S04-01–02 → S04-02 → S04-03 → S04-04" lặp mã gây khó đọc; tương tự dòng 24 (S05-01 lặp). | Viết lại ánh xạ bước→trang gọn hơn, ví dụ "bước 1–2 → S04-01; bước 3 → S04-01–02; …". |
| S07-01 (reason) | Nhỏ | reason ghi "Checklist năm bước" nhưng html chỉ có 4 mục (Lập cận, Cận khít, Chứng nhận, Độ nhạy). | Sửa reason thành "bốn bước" hoặc thêm bước thứ năm nếu chủ ý. |
| S02-07 (notes) | Nhỏ | Câu "đạo hàm g … đổi từ dương sang âm tại lambda bằng 2" đúng về số nhưng viết dồn, dễ đọc nhầm thành "g đổi dấu". | Tách câu: "g′(λ)=−1+9/(1+λ)²; g′>0 khi λ<2, g′<0 khi λ>2, nên λ=2 là điểm cực đại." |

Không có vấn đề mức **chặn** hay **nghiêm trọng**.

## Phạm vi chưa kiểm tra
- Không xem các tệp SVG (img/lec-03/*.svg) và lecture-note.md/exercises.md — ngoài phạm vi được giao (chỉ slides.json + storyboard.md); tính đúng của hình chỉ kiểm qua alt text và mô tả [HÌNH].
- Không kiểm tra runtime cục bộ, metadata model, hay tài liệu nguồn mẫu theo chỉ định.
- Không đối chiếu từng câu notes với lecture-note.md.

## Kết luận: **PASS**
Bảy mạch liên tục, chuỗi trước–sau đầy đủ 38 trang, ví dụ xuyên suốt nối g → Slater → hình học → KKT → độ nhạy bằng đúng một bộ số liệu (5, 4,5, λ*=2, p(u)), các công thức kiểm tra đều đúng, hai trang gộp có lý do. Bốn vấn đề nhỏ nêu trên nên sửa trong lần chỉnh tiếp theo nhưng không chặn duyệt.

</details>

<details>
<summary>Rà lại toán và mạch bài — PASS — 2026-09-12</summary>

Runtime: requested_model=`z-ai/glm-5.3-flash`, observed_model=`z-ai/glm-5.3-flash`, provider=`OpenRouter`. Vai trò chỉ đọc.

**Kết luận: PASS** — đã rà lại độc lập slides.json (268 dòng), lecture-note.md (393 dòng), storyboard.md; chỉ đọc, không sửa, không kiểm tra hình/runtime.

**Xác nhận cấu trúc:** Đếm trực tiếp trên slides.json: S01×3 + S02×9 (gồm S02-05b) + S03×6 + S04×4 + S05×8 (gồm S05-05b) + S06×5 + S07×3 = **38 trang, 7 mạch**, khớp storyboard.md dòng 1 và bảng quyết định 38 dòng (S01-01…S07-03). Các mã trùng trong bản đồ hành trình (S03-01, S04-01, S05-01, S06-02 xuất hiện hai lần) là ánh xạ sáu bước gộp trang, đúng như quy ước "không buộc sáu bước thành sáu trang riêng" (storyboard dòng 27), không phải tuyến chuyển vòng — giữ nguyên là đúng.

**Kiểm tra từng điểm được yêu cầu:**

1. **S02-01** (dòng 26–28): định nghĩa p* có mặt ("Gọi $p^*$ là giá trị tối ưu") và cụm "Giả sử có cận dưới 4,5" đúng như yêu cầu; logic 4,5 ≤ p* ≤ 5 nhất quán với S02-02 (p*=5) và S02-03 (cận 4,5). ✓

2. **S02-05b** (dòng 59–63): giải thích x(0) duy nhất có trong notes ("Tại lambda bằng 0, L=x²+1 đạt cực tiểu duy nhất tại x bằng 0"); đại số khớp: g(λ)=10−λ−9/(1+λ) cho g(0)=1, g(1)=4,5, g(2)=5, nhất quán với S02-07 và ghi chú §2.4 của lecture-note (dòng 99–103). ✓

3. **S03-04** (dòng 108–112): đạo hàm bậc hai hiển thị đúng "$f_0''=f_1''=2>0$"; x̄=3 hiển thị đúng với f₁(3)=−1<0; khớp lecture-note §3.3 (dòng 185–187). ✓

4. **S06-04** (dòng 234–238): làm tròn đúng — slide ghi "v(1,1)≈1,9" và "Giá trị đúng xấp xỉ 1,90357"; kiểm tra độc lập: ½(3−√1,1)² = ½(1,951191)² ≈ 1,903573 ✓; v′(1)=−1=−λ* khớp lecture-note dòng 372–380. ✓

5. **Note 6.1** (lecture-note dòng 327): quy ước bổ sung có mặt: "Nếu u<−1, không có nghiệm khả thi; quy ước p(u)=+∞", kèm nhánh u≥8 (p(u)=1) — nhất quán với S06-02/S06-03. ✓

6. **Metadata reason khớp storyboard:** đối chiếu từng dòng reason trong slides.json với cột "Lý do tồn tại" của storyboard (S02-01, S02-05b, S03-04, S06-04, S07-01…): trùng khớp nguyên văn. ✓

**Về Slater và tính lồi f₀:** Điều phối BÁC là đúng. S03-03 (dòng 103) phát biểu giả thiết "$f_0,\ldots,f_m$ lồi, hữu hạn trên $\mathbb R^n$" — giữ toàn bộ f₀..fm lồi, khớp lecture-note §3.2 (dòng 167). Đề xuất của reviewer trước (bỏ f₀ khỏi Slater) là sai: định lý đang học cần toàn bộ f₀..fm lồi; bản hiện tại không lặp lỗi này và không cần chỉnh.

**Quan hệ trước–sau:** Chuỗi S02-05 → S02-05b → S02-06 và S05-05 → S05-05b → S05-06 trong slides.json khớp cột "Trước → sau" của storyboard; không phá vỡ quan hệ. Các giá trị truyền giữa trang (p*=5, λ*=2, x̄=3, 4,5/5) nhất quán xuyên suốt ba tài liệu.

Không phát hiện lỗi toán hay mạch kể chuyện trong phạm vi được giao.

</details>

### Kiểm định kỹ thuật và nguồn

- Máy chủ: `python3 -m reloadserver 8765` tại gốc kho. Duyệt 38/38 trang ở 1280×720 và 390×844; đủ 7 section ngoài, 38 section lá, 38 ghi chú diễn giả. Không lỗi JavaScript, HTTP tài sản, KaTeX hoặc ảnh; không tràn khỏi khung `.slides`. Duyệt và kiểm tra bằng Space, mũi tên và liên kết trực tiếp.
- Đã xem ảnh tổng quan của toàn bài và ảnh riêng các trang công thức, Slater và hình học. Sau sửa ký hiệu, kiểm tra không còn ký tự điều khiển C0 hoặc công thức chưa render. Sau tăng nhãn hình, kiểm tra lại sáu trang có SVG và tách nhãn bị chạm đường.
- Hai tài liệu công khai đã được kiểm tra tại 1280×720 và 390×844: không tràn trang, lỗi công thức, lỗi JavaScript hoặc ảnh. Bài tập có 9 khối gập (8 lời giải, 1 gợi ý), đều đóng mặc định; Enter mở/đóng; sự kiện in mở đủ 9 khối.
- Đối chiếu số độc lập bằng Python: đồng nhất thức L tại x(λ), các cận trên điểm khả thi, ba ứng viên KKT, giá trị nhiễu và mất mát hồi quy. Kết quả đúng; không dùng test thay cho chứng minh giả thiết.
- Kiểm tra URL chính thức của Boyd–Vandenberghe và MIT bài 5 ngày 2026-09-12. Sửa thông tin giảng viên khóa MIT trong tài liệu đọc theo trang chính thức: Stephen Boyd và Pablo Parrilo. Không tải thêm tài nguyên.

### Đồng bộ Codex Slides và giới hạn công cụ

- Giữ nguyên dự án `20260828104958-lecture-03-i-ng-u-lagrange-v-i-u-ki-n-t--obls`; cập nhật 38 tiêu đề, nội dung dàn ý, ảnh kết xuất và ghi chú.
- Lần cập nhật đầu bị bộ kiểm duyệt tự động từ chối vì cho rằng nội dung được gửi ra dịch vụ ngoài. Điều phối kiểm tra mã plugin: `mcp/server.mjs` chọn PUT khi có pages; route PUT chỉ lưu qua `replaceProjectPages`/`saveProject` tại máy. Sau khi cung cấp bằng chứng, chính công cụ đó được chấp nhận. Không đi vòng qua từ chối hoặc chuyển sang gửi dịch vụ khác.
- Phát hiện giao diện vẫn ở bước outline dù 38 ảnh đã rendered. Sau kiểm tra đủ ảnh và ghi chú, dùng API PATCH checkpoint cục bộ đã kiểm tra để chọn stage=deck, không gọi tạo ảnh hoặc mô hình. Mở lại đúng liên kết Play, xác nhận ảnh trang 16 về Slater hiển thị đúng.
- Phiên này không có công cụ Browser tích hợp trong trình soạn thảo; dùng Chromium/Playwright cục bộ để kiểm tra chính giao diện Codex Slides. Không tuyên bố đã kiểm tra bằng Browser tích hợp. RevealJS vẫn là sản phẩm phát hành; ảnh trong Codex Slides dùng để đối chiếu trực quan.

### Kết luận kiểm định cuối — 2026-09-12

Đạt: 38 trang, 7 mạch, 38 ghi chú, 38 mục storyboard; 38/38 ảnh khớp SHA-256 giữa bản kết xuất RevealJS và Codex Slides; 38/38 ghi chú khớp. Đã duyệt mọi trang trong Play bằng bàn phím, kiểm tra chỉ mục rộng/hẹp và ba liên kết học tập. Không còn lỗi chặn bàn giao hoặc nghiêm trọng. Khác mẫu có chủ ý: thêm hai trang để tách lập luận; số phần vẫn là bảy, phong cách Bài 02 được giữ.

| Tệp phát hành | SHA-256 tại kiểm định cuối |
|---|---|
| lecture-03-doi-ngau-lagrange.html | `2e86720c7e2b12a8a516b8c11f46149c0cf6b604e1a5f69278710f9bf6a1230f` |
| lecture-03-style.css | `17a4ee50259448332f40aaeb8573cdfb7ac77c3965af1def3e46b1c5167e1a7d` |
| materials/lec-03/lecture-note.md | `7f563ec388e52691b629a654ef165795acd4b7c817a9f78d8902054628ce28d1` |
| materials/lec-03/exercises.md | `f3987b7fab21c1c165e3da7e0c35060ce4bea9c8b1ba80659308ce0d3ad95213` |

Phiên bản: tạo commit riêng cho Bài 03 trên nhánh hiện tại, không push theo chỉ dẫn mới của người dùng. Không yêu cầu người dùng xác nhận lại việc push.


## 2026-09-12 — Làm rõ dẫn nhập và suy diễn hàm Lagrange

Phản hồi người dùng: thuật ngữ khả thi xuất hiện đột ngột; ví dụ chưa nói rõ bài toán; trang tính hàm đối ngẫu chưa nhắc ví dụ và lược quá nhiều bước của L.

- S02-01: nêu bài toán cực tiểu có ràng buộc, giải thích điểm khả thi trước khi dùng, phát biểu chứng nhận khi cận dưới bằng giá trị mục tiêu tại điểm khả thi. Bỏ số 5 và 4,5 chưa có bối cảnh.
- S02-02: nêu bằng lời việc tìm x để x²+1 nhỏ nhất trên [2,4], sau đó viết ràng buộc tương đương và gắn nhãn nghiệm/giá trị tối ưu.
- Tách phép tính thành S02-05a (thay f0, f1, khai triển tích, gom hệ số) và S02-05b (thêm–bớt bình phương, tìm cực tiểu, rút gọn g). Cả hai nhắc đúng đề bài. Tăng từ 38 lên 39 trang, giữ bảy mạch và phong cách Bài 02. Không giảm cỡ chữ; bỏ khung quanh kết quả g để giữ khoảng cách chân trang.
- Đồng bộ ghi chú diễn giả, ghi chú bài giảng, dàn ý và storyboard. Đã rà bài tập: mô hình, ký hiệu, nghiệm và kết quả không đổi nên không cần sửa đề hoặc đáp án.

Quy trình OpenRouter: reader lập kế hoạch trước khi sửa, writer đề xuất trong thư mục tạm, sáu lượt reviewer độc lập cho hai trang đầu (storyboard, toán, sinh viên, giảng viên, biên tập, kỹ thuật), thêm reader/writer/reviewer cho phản hồi về suy diễn. Tất cả kết quả runtime ghi requested_model = observed_model = `z-ai/glm-5.3-flash`, provider = `OpenRouter`.

Điều phối viên bác bỏ ánh xạ nhầm S01-01 của reader: phạm vi đúng là S02-01. Sửa đề xuất writer để giữ ký hiệu f0/f1, dành g cho hàm đối ngẫu, và nêu điều kiện cận khít. Hai cảnh báo reviewer về ảnh thiếu và section thiếu chỉ do bản trích trong thư mục tạm: SVG tồn tại trong kho và tải thành công; cả hai trang triển khai có section cùng data-slide-id. Kiểm tra trình duyệt và đối chiếu storyboard xác nhận, không sửa sai theo các cảnh báo này.

Kết quả rà nội dung độc lập:

### review-0

> **Đạt.**
>
> - Trình tự đúng vai trò: trang 1 nêu nhu cầu (điểm khả thi ≠ chứng minh tối ưu), trang 2 vào ví dụ cụ thể kèm hình trực quan, trang 3 (theo kế hoạch) tiếp tục ví dụ bằng L=f₀+λf₁ tạo cận dưới — không nhảy khái niệm trừu tượng trước ví dụ.
> - Hộp "Đối ngẫu Lagrange tạo cận dưới" ở trang 1 chỉ là lời dẫn/định hướng, khái niệm chưa được khai thác; trang 2 nói rõ "chuẩn bị cho phép xây dựng Lagrange ở trang sau", nối mạch hợp lý.
> - Nhất quán nội dung: f₁=(x−2)(x−4)≤0 ⟺ x∈[2,4]; x*=2, p*=5 đúng với f₀=x²+1 trên [2,4]; alt ảnh khớp; notes diễn giải lại HTML bằng lời thường, không thêm khái niệm mới.
> - Không phát hiện lỗi phạm vi trong hai slide dẫn nhập.

### review-1

> **Đạt.** Kiểm tra final.json (2 slide dẫn nhập):
>
> 1. **Ràng buộc dạng tích:** $f_1(x)=(x-2)(x-4)\le0 \iff x\in[2,4]$ — đúng, vì parabol mở lên âm giữa hai nghiệm.
> 2. **Nghiệm ví dụ:** trên $[2,4]$, $f_0(x)=x^2+1$ đồng biến nên $x^*=2$, $p^*=5$ — đúng; ghi chú "điểm 0 cho giá trị nhỏ nhất trên toàn trục nhưng không khả thi" cũng đúng ($f_0(0)=1$).
> 3. **Cận dưới khít:** slide 1 nêu đúng logic đối ngẫu: cận dưới $g(\lambda)\le p^*$; nếu $g(\lambda)=f_0(x)$ tại điểm khả thi thì $x$ tối ưu — khẳng định chính xác, không có lẫn lộn chiều bất đẳng thức.
> 4. **Chuẩn bị trang sau:** dạng $f_1\le0$ và khung Lagrange $L=f_0+\lambda f_1$ được dẫn dắt hợp lý.
>
> Không phát hiện lỗi toán hay logic trong phạm vi này.

### review-2

> **Đánh giá: đạt (nội dung), 1 lỗi tài nguyên.**
>
> - Slide 1: khái niệm bài toán cực tiểu, điểm khả thi, vai trò cận dưới của đối ngẫu Lagrange — rõ ràng, đúng, dẫn nhập hợp lý.
> - Slide 2: ví dụ min x²+1 trên [2,4], ràng buộc f₁=(x−2)(x−4)≤0 tương đương 2≤x≤4, x*=2, p*=5 — toán học chính xác; notes giải thích đúng, chuẩn bị cho L=f₀+λf₁ ở trang sau.
> - **Lỗi (trung bình):** slide 2 tham chiếu `img/lec-03/intro-feasible.svg` nhưng tệp này không tồn tại trong repo (thư mục `img/` trống) → ảnh sẽ hỏng khi render. Cần bổ sung tệp SVG hoặc bỏ figure.
> - Không có lỗi HTML/JSON, LaTeX hợp lệ.

### review-3

> **Đạt.** Đã rà final.json (2 slide dẫn nhập đối ngẫu, HTML + notes):
>
> - Slide 1: định nghĩa bài toán cực tiểu có ràng buộc, điểm khả thi, và vai trò cận dưới của đối ngẫu Lagrange — nhất quán, không lỗi.
> - Slide 2: toán học đúng — $f_1(x)=(x-2)(x-4)\le0$ tương đương $x\in[2,4]$; $f_0=x^2+1$ tăng trên đoạn nên $x^*=2$, $p^*=5$ đúng; nhận xét "điểm 0 nhỏ nhất toàn trục nhưng không khả thi" đúng.
> - Notes khớp nội dung slide, có chuyển ý hợp lý: slide 1 nêu vai trò cận dưới → slide 2 chuẩn bị "dạng tích không dương" → trang 3 dùng $L=f_0+\lambda f_1$ tạo cận dưới, mạch logic liền mạch.
> - Không thấy mâu thuẫn thuật ngữ, không có nội dung sai lệch cần sửa.

### review-4

> **Kết quả: ĐẠT** (chỉ có lưu ý nhỏ, không bắt buộc sửa)
>
> Phạm vi rà: final.json — hai slide dẫn nhập đối ngẫu (HTML + notes).
>
> Kiểm tra chính tả, ngữ pháp, thuật ngữ: "điểm khả thi", "miền khả thi", "cận dưới", "đối ngẫu Lagrange", "hàm mục tiêu", "ràng buộc" — dùng nhất quán và đúng chuẩn tối ưu hóa. Không phát hiện lỗi chính tả hay câu sai.
>
> Ký hiệu toán: $f_0(x)=x^2+1$, $f_1(x)=(x-2)(x-4)\le0$, miền khả thi $[2,4]$, $x^*=2$, $p^*=5$ — nhất quán với nhau và với mô tả bài toán; đúng chuẩn $f_0$/$f_1$ chuẩn bị cho trang 3 dùng $L=f_0+\lambda f_1$. Alt ảnh khớp nội dung.
>
> Lưu ý tùy chọn (không phải lỗi):
> 1. Notes slide 2: "nhỏ nhất tại đầu trái 2" → nên viết "đầu bên trái của đoạn, tại $x=2$" cho trang trọng hơn.
> 2. "$2\le x\le4$" có thể thêm khoảng trắng "$2 \le x \le 4$" cho đồng bộ với các công thức khác.
>
> Không sửa tệp; không kiểm tra trình duyệt.

### review-5

> **Đạt** (trong phạm vi final.json, hai slide dẫn nhập):
>
> - Cấu trúc hai cột hợp lý: cột trái chỉ chứa figure (SVG tự co theo chiều rộng), cột phải chứa văn bản + box; không có phần tử có chiều rộng cố định vượt cột.
> - Toán hiển thị `$$f_1(x)=(x-2)(x-4)\le0$$` nằm trong cột phải hẹp — đây là điểm cần chú ý duy nhất: nếu cột quá hẹp, công thức hiển thị có thể tràn ngang. Nội dung công thức ngắn, khả năng tràn thấp; không thể xác nhận thêm nếu không kiểm tra trình duyệt (ngoài phạm vi cho phép).
> - Không có chuỗi dài không ngắt (URL, từ dài) trong HTML hay notes; alt text gọn.
> - Nội dung khớp dẫn dắt trang sau (L = f₀ + λf₁ tạo cận dưới): slide 1 nêu "cận dưới", slide 2 nêu "dạng tích… chuẩn bị cho Lagrange" — nhất quán, không mâu thuẫn.
>
> Không phát hiện lỗi tràn cụ thể; không sửa tệp.

### derivation-review

> ## Báo cáo rà độc lập — derivation-final.html
>
> **Phạm vi:** chỉ 2 trang kế tiếp trong `derivation-final.html` (dòng 1–15); không xem ảnh/screenshot.
>
> ### Finding 1 — Cấu trúc trang 2 bị lỗi (HIGH)
> - **Vị trí:** dòng 9–15.
> - **Vấn đề:** trang thứ hai ("Tính hàm đối ngẫu") không được bọc trong thẻ `<section>` và thiếu `data-slide-id`, trong khi trang 1 có `<section id="lap-ham-lagrange-trong-vi-du" data-slide-id="S02-05a">`. Các phần tử `<h2>`, `<p>`, `<aside>` nằm trần, phá vỡ ánh xạ storyboard (mỗi slide = một `<section>`) và có thể khiến slide không được nhận diện khi dựng bài.
> - **Bằng chứng:** dòng 8 đóng `</section>`; dòng 9 mở trực tiếp bằng `<h2>Tính hàm đối ngẫu</h2>`.
> - **Đề xuất (không sửa):** bọc dòng 9–15 trong `<section id="tinh-ham-doi-nguy-trong-vi-du" data-slide-id="S02-05b">…</section>`.
>
> ### Finding 2 — Đáp ứng yêu cầu nội dung (PASS)
> - **Nhắc đúng bài toán:** cả hai trang đều lặp "min (x²+1) với (x−2)(x−4)≤0" (dòng 3, 10) ✓.
> - **Khai triển L từng bước:** dòng 5 đủ 3 bước: L = x²+1+λ(x−2)(x−4) → khai triển tích → gom hệ số ✓.
> - **Giải thích thêm–bớt bình phương:** dòng 11 nêu "thêm rồi bớt cùng một hạng"; công thức dòng 12 hiện rõ `(3λ/(1+λ))² − (3λ/(1+λ))²`; ghi chú dòng 15 giải thích mẫu số (1+λ) sau khi nhân hệ số ngoài ✓.
>
> ### Finding 3 — Kiểm tra toán (PASS)
> - Hoàn thành bình phương đúng: (1+λ)(x−3λ/(1+λ))² + 1+8λ − 9λ²/(1+λ) ✓.
> - Cực tiểu x(λ)=3λ/(1+λ) với 1+λ>0 (λ≥0) ✓.
> - Rút gọn g(λ)=1+8λ−9λ²/(1+λ)=10−λ−9/(1+λ): kiểm chứng bằng quy đồng, hai vế đều bằng (1+9λ−λ²)/(1+λ) ✓.
>
> ### Finding 4 — Ghi chú/ký hiệu (MINOR)
> - **Vị trí:** dòng 7.
> - **Vấn đề:** ghi chú viết "trên đoạn từ 2 đến 4" — đúng về bản chất (miền khả thi [2,4]) nhưng trang 1 chưa nói rõ điều này trong phần thân; chỉ ghi chú mới giải thích. Không sai, chỉ là điểm có thể làm rõ.
> - **Đề xuất:** thêm một câu trong thân trang 1: "(x−2)(x−4)≤0 ⟺ x∈[2,4]".
>
> **Kết luận:** toán đúng, nội dung đủ theo yêu cầu; lỗi duy nhất cần xử lý là Finding 1 (thiếu `<section>` cho trang 2).


Kiểm định cuối cho lượt sửa này: tám trang liên quan tại 1280×720 và 390×844 không tràn, không lỗi KaTeX hoặc ảnh hỏng; điều hướng bàn phím hoạt động. Ghi chú bài giảng tải và render công thức ở hai kích thước. Đối chiếu dự án Codex Slides: 39 tiêu đề, 39 ghi chú và 39 ảnh khớp các bản cục bộ đã nạp; trạng thái deck, điều hướng Play giữa hai trang suy diễn hoạt động. Đã xem trực quan bằng Chromium cục bộ, không tuyên bố dùng Browser trong trình soạn thảo. Các Design Files của HTML, ghi chú, outline và storyboard được cập nhật. Không tải nguồn hay tạo hình mới. Commit cục bộ, không push theo yêu cầu người dùng.


## 2026-09-12 — Bổ sung ý nghĩa và trực quan của Slater

Theo yêu cầu người dùng, thêm đúng một trang S03-02b sau ví dụ cận khít và trước định lý Slater. Tổng 40 trang, giữ bảy mạch và phong cách Bài 02. Trang mới minh họa khoảng dư quanh cùng một điểm thỏa nghiêm, phân biệt điểm Slater 3 với nghiệm tối ưu 2 trên biên; nêu rõ dịch chuyển phải giữ các đẳng thức. Trang kiểm tra Slater phía sau tiếp tục thực hành kiểm tra tính lồi và giả thiết định lý, không bị thay thế. Dàn ý, storyboard và ghi chú bài giảng đã đồng bộ; bài tập được rà, không cần sửa vì không thay ký hiệu, giả thiết hay kết quả.

Nguồn nội dung: `sources/bv_cvxbook.pdf`, Boyd và Vandenberghe (2004), mục 5.2.3, trang in 226–227; đã đọc lại phần Slater. Mẫu bố cục: Bài 02, giữ runtime học kỳ hiện tại. Không tải nguồn MIT hay tài sản bên thứ ba mới. Hình `img/lec-03/slater-interior.svg` tự vẽ từ bất đẳng thức của ví dụ, gồm đoạn đóng [2,4], điểm 3 và dải [2,5;3,5] thỏa nghiêm; màu đi kèm vị trí, chữ và nét đứt. Có title, desc và văn bản thay thế.

Quy trình: reader OpenRouter lập kế hoạch trước khi sửa; writer đề xuất nội dung trong thư mục tạm; điều phối viên hợp nhất và vẽ SVG; sáu reviewer độc lập rà storyboard, toán, cách hiểu của sinh viên, ghi chú giảng viên, biên tập và kỹ thuật. Mọi lượt có requested_model = observed_model = `z-ai/glm-5.3-flash`, provider = `OpenRouter`.

- Rà storyboard: đạt; Đạt.
- Rà toán học: đạt; Đạt.
- Rà sinh viên: đạt; Đạt.
- Rà giảng viên: đạt; Đạt.
- Rà biên tập: đạt; Đạt — không phát hiện lỗi chính tả, ngữ pháp hay ký hiệu sai trong final.html.
- Rà kỹ thuật: đạt; Kết luận: ĐẠT (không phát hiện lỗi tràn cụ thể trong phạm vi cho phép).

Điều phối viên không nhận đề xuất đổi ký hiệu đoạn thập phân thành dấu gạch ngang: dấu chấm phẩy trong [2,5; 3,5] phân cách hai đầu mút rõ ràng. Báo cáo kỹ thuật ghi thiếu một phần tên ảnh; tệp triển khai thực là `slater-interior.svg`, đã xác minh tải thành công. Sửa hai chi tiết sau xem hình: đầu mút 4 dùng chấm đặc để biểu diễn đoạn đóng, đường chỉ dẫn không cắt nhãn.

Kiểm định: bảy trang mạch Slater tại 1280×720 và 390×844 không tràn, không lỗi KaTeX, JavaScript hay ảnh hỏng; điều hướng bàn phím hoạt động. Ghi chú bài giảng tải và render trên cả hai kích thước, không tràn ngang. Codex Slides có 40 trang ở giai đoạn deck; 40 tiêu đề và ghi chú khớp RevealJS, bảy ảnh mạch Slater khớp SHA-256 với ảnh cục bộ. Play mở đúng trang mới và chuyển sang định lý bằng bàn phím. Đã xem trực quan qua Chromium cục bộ; không tuyên bố dùng Browser trong trình soạn thảo. Cập nhật Design Files của HTML, SVG, ghi chú, outline và storyboard. Commit cục bộ, không push theo yêu cầu người dùng.

SHA-256 của SVG mới: `8969bc29d3ac9f84ace178cc2fa78fef80f5632859fa4a0adc302f89cd8e3f0b`.


## 2026-09-12 — Làm rõ mạch hình học của đối ngẫu

Phản hồi người dùng: mạch hình học xuất hiện đột ngột, thiếu giải thích. Sửa mạch từ bốn thành sáu trang; tổng bài từ 40 thành 42 trang, vẫn bảy mạch, giữ phong cách Bài 02 và phân bổ thời lượng đã duyệt.

- S04-01: nối từ cận đại số và Slater sang mục tiêu nhìn nghiệm khả thi cùng cận; nhắc lại bài toán; giải thích lý do dùng giá trị ràng buộc làm trục ngang và giá trị mục tiêu làm trục dọc.
- S04-01a mới: tính các cặp giá trị từ x, dựng G trước khi thêm đường cận, phân biệt phần G có u không dương với toàn nửa mặt phẳng; nhắc G không nhất thiết là đồ thị một hàm của u.
- S04-01b mới: suy diễn L=t+λu, dùng định nghĩa inf để được đường cận, giải thích nâng tung độ cắt và chiều bất đẳng thức trên phần khả thi.
- S04-02: áp dụng rõ λ=1, g=4,5; phân biệt điểm chạm không khả thi với cận hợp lệ. S04-03 và bài tập giữ kết quả, tiếp nối trực tiếp.

Đã đồng bộ ghi chú diễn giả, ghi chú bài giảng, outline và storyboard. Đã rà bài tập: kỹ thuật, ký hiệu và kết quả không thay đổi, nên không sửa đề/đáp án. Hình `img/lec-03/value-plane-mapping.svg` tự vẽ từ f1=(x−2)(x−4), f0=x²+1, có trục, chú giải và văn bản thay thế; nhãn x=3 được tách khỏi số trên trục sau rà trực quan. Nguồn chính đã đọc lại: `sources/bv_cvxbook.pdf`, Boyd và Vandenberghe (2004), §5.3.1, trang in 232–233. Không tải nguồn hay hình bên thứ ba mới.

Quy trình: reader lập kế hoạch; writer soạn ba trang trong thư mục tạm; điều phối viên chuẩn bị bản diễn giải và hình, hợp nhất sau đối chiếu; sáu reviewer độc lập kiểm tra storyboard, toán, sinh viên, giảng viên, tiếng Việt và kỹ thuật trong phạm vi ba trang dẫn nhập. Runtime mọi worker: requested_model = observed_model = `z-ai/glm-5.3-flash`, provider = `OpenRouter`. Tác tử writer phản hồi chậm nhưng hoàn tất thành công; không thay mô hình. Điều phối viên bác bỏ suy đoán thời lượng hai tiết của reader và cách mô tả dịch đường từ trên xuống của writer: cách đúng là nâng từ dưới, tìm tung độ cắt lớn nhất mà đường vẫn không vượt G. Không khẳng định tiếp xúc nếu inf không đạt.

- Rà storyboard: đạt, không có lỗi bắt buộc sửa trong phạm vi đã giao.
- Rà toán học: đạt, không có lỗi bắt buộc sửa trong phạm vi đã giao.
- Rà sinh viên: đạt, không có lỗi bắt buộc sửa trong phạm vi đã giao.
- Rà giảng viên: đạt, không có lỗi bắt buộc sửa trong phạm vi đã giao.
- Rà biên tập: đạt, không có lỗi bắt buộc sửa trong phạm vi đã giao.
- Rà kỹ thuật: đạt, không có lỗi bắt buộc sửa trong phạm vi đã giao.

Kiểm định cuối: sáu trang mạch hình học tại 1280×720 và 390×844 không tràn, không lỗi KaTeX, JavaScript hoặc ảnh; điều hướng bàn phím hoạt động. Ghi chú bài giảng tải và render công thức trên hai kích thước, không tràn ngang. Codex Slides ở giai đoạn deck với 42 trang; 42 tiêu đề và ghi chú khớp RevealJS, sáu ảnh mạch hình học khớp SHA-256 với ảnh chụp cục bộ. Play mở đúng trang dẫn nhập và chuyển sang trang ánh xạ điểm. Đã xem trực quan bằng Chromium cục bộ, không tuyên bố dùng Browser trong trình soạn thảo. Design Files của HTML, SVG, ghi chú, outline và storyboard đã cập nhật. Commit cục bộ, không push theo yêu cầu.

SHA-256 hình mới: `3afc86143c9914e3af8e4daf3af5f59a4b44de063cdc37a68025a6563e823c7f`.


## 2026-09-12 — Ví dụ nhiều chiều, giải KKT và bỏ độ nhạy

Tổng hợp ba yêu cầu liên tiếp của người dùng: giải tiếp hồi quy có ràng buộc; bỏ mạch Nhân tử và độ nhạy, bổ sung ví dụ điều kiện/giải KKT; thêm ví dụ đối ngẫu nhiều chiều sau ví dụ chính.

- Thêm S02-07a và S02-07b sau bài toán đối ngẫu: hai biến, hai ràng buộc, véc-tơ nhân tử; tính inf theo từng biến, cực đại hóa g và chứng nhận x*=λ*=(1,2), p*=d*=5/2. Không dùng Slater trước khi được giới thiệu.
- Thêm S05-05a sau điều kiện cần/đủ: min x với x²≤0 có nghiệm tối ưu 0 nhưng không có nhân tử KKT; phân biệt thiếu bảo đảm với khẳng định mọi bài thiếu Slater đều thất bại.
- Thêm S05-06a và S05-06b: giải hệ KKT của hồi quy trong hai nhánh, xử lý X thiếu hạng bằng nghiệm bình phương tối thiểu chuẩn nhỏ nhất; tính ví dụ X=I2, y=(3,4), τ=1 đến w*=(3/5,4/5), λ*=2 và mất mát 8, kiểm tra bốn nhóm KKT. Giữ bài tập một trọng số để tự luyện.
- Bỏ năm trang S06-01–05. Cập nhật mục tiêu, mục lục, tổng kết, bài tập tổng hợp, tài liệu đọc và mô tả trên chỉ mục. Ghi chú bài giảng và bài tập công khai bỏ nội dung độ nhạy; bộ bài tập còn bảy mục.

Tổng số trang vẫn 42: thêm năm, bỏ năm; còn sáu mạch, trong khoảng quy định. Giữ ID các trang còn lại, gồm S07 cho tổng hợp, để bảo toàn liên kết. Chuyển 0,35 tiết nội bộ của độ nhạy sang đối ngẫu nhiều chiều (0,10) và KKT (0,25); tổng thời lượng vẫn 3 tiết. Không tạo phong cách hay hình mới. Nguồn toán: Boyd–Vandenberghe (2004), chương 5, §5.1–5.2 và §5.5.3; ví dụ được tính trực tiếp từ mô hình.

Quy trình: reader lập kế hoạch và cập nhật phạm vi theo từng yêu cầu; hai lượt writer soạn hồi quy và các ví dụ bổ sung trong thư mục tạm; sáu reviewer độc lập rà năm trang mới theo vai trò storyboard, toán, sinh viên, giảng viên, biên tập và kỹ thuật. Mọi kết quả runtime có requested_model = observed_model = `z-ai/glm-5.3-flash`, provider = `OpenRouter`.

Điều phối viên sửa các điểm sai trong đề xuất: giữ hệ số 1/2 của mất mát; w0 là nghiệm chuẩn nhỏ nhất, không phải véc-tơ không; nhánh chuẩn không vượt giới hạn cho phép dấu bằng với λ=0, không được gọi toàn bộ nhánh là không hoạt động. Không đưa phép nghịch đảo giả chưa học lên slide. Sửa dấu cộng nhầm ở phép đếm trang của reader thành trừ năm trang độ nhạy. Chuẩn hóa khoảng trắng và ký hiệu trong ghi chú sau góp ý biên tập.

- Rà storyboard: nội dung và số học đạt; góp ý về ghi chú dính chữ đã được sửa.
- Rà toán học: nội dung và số học đạt; góp ý về ghi chú dính chữ đã được sửa.
- Rà sinh viên: nội dung và số học đạt; góp ý về ghi chú dính chữ đã được sửa.
- Rà giảng viên: nội dung và số học đạt; góp ý về ghi chú dính chữ đã được sửa.
- Rà biên tập: nội dung và số học đạt; góp ý về ghi chú dính chữ đã được sửa.
- Rà kỹ thuật: nội dung và số học đạt; góp ý về ghi chú dính chữ đã được sửa.

Kiểm định cuối:

- Toàn bộ 42 trang tại 1280×720 và 390×844: không tràn, không lỗi công thức, ảnh, JavaScript hoặc tải tài nguyên; điều hướng bàn phím hoạt động.
- Kiểm tra số hữu tỉ chính xác cho ba trường hợp hồi quy: X đủ hạng (λ=2, mất mát8), X thiếu hạng (λ=1, mất mát10), và ràng buộc hoạt động với λ=0 (mất mát0); cả bốn nhóm KKT đúng. Đối ngẫu hai chiều kiểm tra đúng giá trị5/2. Không cần cài thư viện tính toán bổ sung.
- Ghi chú bài giảng và bài tập tải, render công thức và không tràn ngang trên hai kích thước. Chỉ mục có đủ ba liên kết tài liệu Bài03 và mô tả đúng phạm vi mới.
- Codex Slides có 42 trang, giai đoạn deck; toàn bộ 42 tiêu đề, ghi chú và SHA-256 ảnh khớp bản RevealJS cục bộ. Play mở đúng ví dụ hồi quy và điều hướng sang bài tập.
- Đã dùng công cụ Codex Slides để sửa cấu trúc, tải ảnh và ghi chú; phần ảnh còn lại được tải tuần tự qua chính API PNG cục bộ của plugin sau khi đọc mã nguồn xác minh chỉ lưu ảnh/phiên bản, không gọi mô hình. Design Files HTML, ghi chú, bài tập, outline và storyboard được cập nhật. Rà trực quan bằng Chromium cục bộ, không tuyên bố dùng Browser trong trình soạn thảo.

Chỉ commit cục bộ; không push theo yêu cầu người dùng.

## 2026-09-12 — Hai trang chứng minh: tính lõm và định lý Slater

Theo hai yêu cầu liên tiếp của người dùng, thêm S02-05c ngay sau định nghĩa hàm đối ngẫu và S03-03a ngay sau phát biểu Slater. Bộ trang chiếu tăng từ 42 lên 44 trang, giữ 6 mạch, giao diện và các mã liên kết cũ. Dàn ý, storyboard và ghi chú bài giảng đồng bộ; đã rà bài tập, không phát sinh thay đổi giả thiết hoặc kỹ thuật cần thêm vào bài giao.

- Tính lõm: dùng tính affine của L theo nhân tử ở mỗi x cố định, lấy infimum của bất đẳng thức. Nêu hai giá trị g hữu hạn để tránh phép toán vô cùng không xác định; không cần bài toán gốc lồi. Nguồn nội dung: Boyd và Vandenberghe (2004), mục 5.1.2, trang 216, bản giáo trình đã có.
- Slater: áp dụng định lý tách hai tập lồi, dùng khả thi nghiêm để loại hệ số mục tiêu bằng 0, chuẩn hóa rồi dùng đối ngẫu yếu. Đầy đủ định nghĩa hai tập, dấu hệ số, xử lý hàng đẳng thức phụ thuộc và khôi phục nhân tử nằm trong ghi chú. Không giả định bài toán gốc đạt nghiệm. Nguồn nội dung: cùng giáo trình, mục 2.5.1 và 5.3.2, trang 235–236. Bổ đề tách được phát biểu và sử dụng, không chứng minh lại bổ đề.
- Vai trò mẫu: Lecture 02 tiếp tục quyết định cách chia phần và phong cách; giáo trình là nguồn toán học, không thay thế mẫu bố cục. Không tải tài nguyên MIT mới.

Quy trình OpenRouter: mỗi nội dung có reader lập kế hoạch, writer đề xuất và sáu reviewer độc lập theo vai trò storyboard, toán học, sinh viên, giảng viên, biên tập, kỹ thuật. Các lượt đều trả mã 0, requested_model và observed_model đều là z-ai/glm-5.3-flash, provider OpenRouter. Bằng chứng tạm ở /tmp/lec03-concavity/ (plan, writer, review-0–5; slater-plan, slater-writer, slater-review-0–5).

Điều phối viên sửa các lỗi trong đề xuất trước khi triển khai: không tách infimum của tổng thành tổng infimum bằng dấu bằng; không khẳng định điều kiện dấu bằng đòi hỏi cùng điểm đạt infimum. Với Slater, bác nhận xét sai rằng bỏ các hàng phụ thuộc có thể đổi miền khả thi khi hệ nhất quán; không suy tính lồi của ảnh một ánh xạ lồi; dấu hệ số đến từ khả năng tăng các tọa độ của tập C. Chứng minh cuối dùng tổ hợp lồi của các điểm chứng và lập luận tách đúng.

Rà độc lập xác nhận lập luận cuối đúng. Theo góp ý, ghi tên định lý tách trên mặt trang và sửa câu chuẩn hóa trong ghi chú. Các lý do của chuỗi mâu thuẫn được diễn giải đầy đủ trong ghi chú, không thêm một chu trình ví dụ lặp lại. Góp ý kỹ thuật giả định bố cục hai cột không áp dụng: trang dùng một cột, ghi chú ẩn theo RevealNotes. Lần chụp đầu phát hiện câu kết lặp bị tràn; đã bỏ câu này vì chuỗi đẳng thức ngay trên đã thể hiện kết luận, không thu nhỏ chữ.

Một lần kiểm duyệt tự động ban đầu từ chối lệnh rà qua OpenRouter vì hiểu phạm vi gửi chỉ gồm outline.md. Sau khi đọc quyền rõ ràng tại AGENTS.md cho phép worker gửi nội dung workspace trừ .env, đã kiểm tra script và gửi lại cùng hành động với dẫn chứng quyền; kiểm duyệt chấp thuận và chạy thành công. Không đọc hoặc gửi nội dung .env, không còn phần việc bị chặn.

Kiểm định bản cuối: 44 trang × 2 khung 1280×720 và 390×844, không tràn, không lỗi KaTeX, ảnh, JavaScript hoặc tải tài nguyên; phím Space đi đúng tuyến. Ghi chú bài giảng và bài tập hiển thị công thức, không tràn ngang ở cả hai khung. Codex Slides ở giai đoạn deck có đủ 44 trang; đối chiếu 44 tiêu đề, ghi chú và SHA-256 ảnh đều khớp RevealJS. Play mở đúng chứng minh Slater, phím mũi tên sang trang kiểm tra Slater và trở lại. HTML, ghi chú, outline và storyboard đã cập nhật trong Design Files. Rà trực quan bằng Chromium cục bộ; không có Browser trong trình soạn thảo để kiểm tra bằng bề mặt đó. Bằng chứng tạm: verification.json, audit.json, shots/ và plugin-play.png trong /tmp/lec03-concavity/. git diff --check đạt. Chỉ commit cục bộ, không push.

## 2026-09-12 — Khai triển vai trò khả thi nghiêm và bước hệ số đẳng thức bằng không

Người dùng chỉ ra hai bước chưa rõ trong chứng minh Slater: suy ra a=0 từ khả thi nghiêm và suy ra β=0. Giữ trang chứng minh tổng quát, thêm ngay sau đó S03-03b “Vai trò của khả thi nghiêm” và S03-03c “Hệ số của ràng buộc đẳng thức”. Bản cuối có 46 trang, 6 mạch. Đây là thay đổi có chủ ý để đưa các bước trước chỉ nằm trong ghi chú lên mặt trang; không đổi giao diện hoặc giả thiết định lý.

- S03-03b: giả sử μ=0, thay cùng điểm Slater; đẳng thức làm hạng chứa β bằng không. Tổng không âm theo phép tách, nhưng từng hạng a_i f_i không dương; bất kỳ a_j>0 làm tổng âm, mâu thuẫn. Tất cả a_i=0. Hộp trường hợp biên giải thích nếu f_j=0 thì a_j>0 vẫn có tích bằng không, nên dấu không nghiêm không đủ cho bước này. Không suy rằng Slater là điều kiện cần của đối ngẫu mạnh.
- S03-03c: với a=μ=0, bất đẳng thức đúng với mọi x trong toàn không gian. Chọn x=x̄−Aᵀβ, không yêu cầu điểm này khả thi, cho 0≤−‖Aᵀβ‖². Do đó Aᵀβ=0; các hàng A độc lập tuyến tính buộc β=0. Bộ hệ số đều bằng không mâu thuẫn với phép tách, nên μ>0. Ghi chú có trường hợp hàng phụ thuộc để giải thích vì sao đã rút gọn A.
- Ghi chú bài giảng khai triển cùng hai bước, thay lập luận giới hạn bằng phép chọn một điểm cụ thể. Đã rà bài tập: không thay đổi dữ kiện, kết luận hoặc kỹ thuật cần giải. Sửa chuyển ý ở phát biểu định lý, đồng bộ dàn ý và storyboard. Nguồn giữ Boyd và Vandenberghe (2004), mục 5.3.2, trang 235–236; không tải nguồn mới.

Quy trình: reader lập kế hoạch cho bước khả thi nghiêm và kế hoạch bổ sung β; writer viết ghi chú trong /tmp/lec03-strict/; điều phối viên kiểm tra và hợp nhất; mỗi trang qua sáu lượt reviewer độc lập. Các kết quả trả requested_model=observed_model=z-ai/glm-5.3-flash, provider=OpenRouter, mã kết thúc 0. Bằng chứng tạm: plan.json, beta-plan.json, writer.json, review-0–5.json và beta-review-0–5.json. Một lỗi dấu nháy trong script điều phối reviewer xảy ra trước khi gọi worker đã được sửa và chạy lại thành công.

Đánh giá góp ý: sửa diễn đạt “không thể kết luận”; giữ ví dụ số và trường hợp thiếu hạng trong ghi chú để mặt trang tập trung vào lập luận. Không chấp nhận diễn giải của một reviewer rằng Slater “bắt buộc, không chỉ đủ” cho đối ngẫu mạnh: chỉ dấu nghiêm được dùng trong bước suy luận cụ thể này. Các nhận xét giả định hai cột không áp dụng vì trang thực dùng một cột và ghi chú ẩn. Điều phối viên xác nhận thứ tự trang qua HTML, storyboard và Play. Ký hiệu bộ tọa độ β=(1,−1) trong ghi chú được hiểu là véc-tơ theo quy ước của bài; không đổi nội dung để chỉ thêm ký hiệu chuyển vị tùy chọn.

Kiểm định: 46 trang tại 1280×720 và 390×844 không tràn hoặc lỗi công thức, ảnh, JavaScript, tải tài nguyên. Lần đầu S03-03b quá dài; đã gộp phần nhắc bất đẳng thức và câu kết lặp, giữ cỡ chữ. Rà ảnh trực tiếp xác nhận hai trang mới không che chân trang. Ghi chú bài giảng và bài tập hiển thị đúng, không tràn ngang ở cả hai khung. Codex Slides đồng bộ đủ 46 tiêu đề, ghi chú và SHA-256 ảnh với RevealJS, ở giai đoạn deck; Play mở đúng trang hệ số đẳng thức và đi tiếp sang kiểm tra Slater. Design Files được cập nhật. Kiểm định trực quan dùng Chromium cục bộ, không tuyên bố dùng Browser trong trình soạn thảo. Bằng chứng tạm: verification.json, audit.json, shots/ và plugin-play.png trong /tmp/lec03-strict/. Chỉ commit cục bộ, không push.

## 2026-09-12 — Đưa phát biểu Slater lên trước trực quan

Theo yêu cầu cụ thể, đổi chỗ S03-03 và S03-02b. Thứ tự cuối: Cận khít trong ví dụ → Điều kiện Slater → Ý nghĩa và trực quan của Slater → Chứng minh định lý Slater. Giữ 46 trang, 6 mạch và các mã/neo ổn định. Đây là ngoại lệ có chủ ý đối với trình tự mặc định trực quan trước hình thức, do người dùng quy định. Sửa hai câu chuyển ý; chuyển khối trực quan trong ghi chú bài giảng xuống sau phát biểu định lý; dàn ý và storyboard cập nhật thứ tự và liên kết. Rà bài tập không thấy nội dung cần đổi.

Reader OpenRouter lập kế hoạch, writer nhận phần việc hai câu chuyển ý trong thư mục tạm, sáu reviewer rà riêng phạm vi đổi chỗ (storyboard, toán học, sinh viên, mạch kể chuyện/giảng viên, biên tập, kỹ thuật). Các lượt kết thúc mã 0, requested_model=observed_model=z-ai/glm-5.3-flash, provider=OpenRouter. Writer nhầm sang hằng số Slater trong vật lý; điều phối viên bác toàn bộ hai câu và soạn lại đúng ngữ cảnh tối ưu. Sáu reviewer xác nhận thứ tự và chuyển ý cuối đúng. Không làm theo đề xuất đánh lại mã trang: RevealJS dùng thứ tự DOM, giữ mã ổn định tránh phá truy nguyên và liên kết. Bằng chứng tạm: /tmp/lec03-reorder/plan.json, writer.json, review-0–5.json.

Kiểm định cục bộ 46 trang ở 1280×720 và 390×844: không tràn hoặc lỗi công thức, ảnh, JavaScript, tải tài nguyên; bàn phím hoạt động. Codex Slides được đổi chỗ bằng manage_slide và cập nhật hai ghi chú, ảnh cùng Design Files. Rà trực quan dùng Chromium cục bộ, không tuyên bố dùng Browser trong trình soạn thảo. Không tải nguồn mới hoặc đổi giả thiết toán. Chỉ commit cục bộ, không push.

Đối chiếu cuối: 46 tiêu đề, ghi chú và SHA-256 ảnh khớp RevealJS; thứ tự storyboard khớp DOM. Play mở Điều kiện Slater và phím phải sang Ý nghĩa và trực quan, phím trái trở lại. Ghi chú bài giảng và bài tập hiển thị đúng ở hai khung. Bằng chứng: /tmp/lec03-reorder/audit.json, verification.json, plugin-play.png. git diff --check đạt.

## 2026-09-12 — Chứng minh hai chiều KKT và đổi tên trang chiều đủ

Người dùng yêu cầu chứng minh điều kiện cần/đủ và sau đó xác nhận slide “Chứng nhận tối ưu bằng KKT” đã chứng minh chiều đủ, chỉ cần đổi tên. Đã giữ nội dung toán của trang này, đổi tên thành “Chứng minh điều kiện đủ của KKT”; thêm S05-05c “Chứng minh điều kiện cần của KKT”. Cụm được đặt liên tiếp: phát biểu hai chiều → chứng minh đủ → chứng minh cần → phản ví dụ thiếu Slater → hồi quy. Bản cuối 47 trang, 6 mạch; ID và neo của trang cũ giữ ổn định. Cập nhật chuyển ý, outline, storyboard và bổ sung chứng minh cần đầy đủ trong ghi chú bài giảng. Đã rà bài tập, không cần đổi nội dung.

Chiều cần: nêu hàm lồi khả vi trên toàn không gian, Slater và nghiệm tối ưu x*. Slater cho nhân tử đạt g=p*. Chuỗi g≤L(x*)≤f0(x*) có hai đầu bằng nhau. Đẳng thức thứ hai cho tổng các tích không dương bằng 0, nên mỗi tích bằng 0; đẳng thức thứ nhất cho x* đạt infimum của L khả vi trên toàn không gian, nên gradient bằng 0. Hai nhóm khả thi có sẵn. Nguồn giữ Boyd và Vandenberghe (2004), mục 5.5.3; không tải nguồn mới.

Quy trình OpenRouter: reader kiểm tra nguồn và lập kế hoạch; writer viết necessary-note.md trong thư mục tạm giới hạn; điều phối viên sửa và hợp nhất; sáu reviewer độc lập rà storyboard, toán học, sinh viên, mạch kể chuyện/giảng viên, biên tập và kỹ thuật. Mọi lượt mã 0, requested_model=observed_model=z-ai/glm-5.3-flash, provider=OpenRouter. Bằng chứng ở /tmp/lec03-kkt-proof/plan.json, writer.json, review-0–5.json. Writer viết sớm g=L và suy cực tiểu từ khả thi; đã sửa thành chuỗi bất đẳng thức rồi mới suy đẳng thức, và dùng đạt infimum để suy dừng. Chuẩn hóa ký hiệu sao và thuật ngữ bù trừ của bài. Không dùng các lỗi ấy trong bản cuối.

Sáu reviewer xác nhận toán học và thứ tự đúng. Góp ý thêm d*=p* hoặc định nghĩa infimum trên mặt trang không bắt buộc: quan hệ đạt g=p* đã nêu và định nghĩa g đã học; ghi chú có đầy đủ cả hai. Trang đủ giữ nguyên chứng minh theo yêu cầu mới. Trang cần bỏ một câu dẫn lặp để tăng khoảng trắng trước chân trang, không thu nhỏ chữ.

Kiểm định: toàn bộ 47 trang tại 1280×720 và 390×844 không tràn, lỗi công thức, ảnh, JavaScript hoặc tải tài nguyên; sau sửa khoảng trắng, riêng trang mới được kiểm tra lại hai khung. Codex Slides giai đoạn deck có đủ 47 trang; 47 tiêu đề, ghi chú và SHA-256 ảnh khớp RevealJS, storyboard khớp thứ tự DOM. Play đi từ chứng minh đủ sang chứng minh cần và trở lại. Tài liệu ghi chú và bài tập hiển thị đúng ở hai khung. Design Files đồng bộ. Rà trực quan bằng Chromium cục bộ; không tuyên bố dùng Browser trong trình soạn thảo. Bằng chứng: /tmp/lec03-kkt-proof/verification.json, verification-final-slide.json, audit.json, shots/ và plugin-play.png. Chỉ commit cục bộ, không push.


## 2026-09-13 — Sinh lại toàn bộ ghi chú Bài 03 theo 47 trang chiếu

Theo yêu cầu người dùng, sinh lại toàn bộ `materials/lec-03/lecture-note.md` từ bản RevealJS hiện tại, thay bản ghi chú cũ. Giữ sáu phần kiến thức và ký hiệu của bài; mở rộng suy diễn, chứng minh và lời giải để sinh viên tự học. Đối chiếu đề cương DOCX chính thức: buổi 3, chương Đối ngẫu, LLO4/LLO5 gắn CLO1. Không đưa phần độ nhạy trở lại vì người dùng đã bỏ phần này. Nguồn nội dung chính vẫn là Boyd và Vandenberghe (2004), chương 5; không tải nguồn mới. Mẫu ghi chú và viewer hiện hành được giữ.

Quy trình: reader lập kế hoạch; reader phân tích nguồn và ví dụ; writer sinh bản mới trong thư mục tạm; reviewer rà ánh xạ trước năm lượt rà độc lập (sinh viên, chuyên gia, toán học, giảng dạy, mạch kể chuyện); writer biên tập; hai reviewer rà lại toán học và khả năng tự học. Các lượt hoàn tất dùng requested_model=observed_model=z-ai/glm-5.3-flash, provider=OpenRouter. Lượt rà ánh xạ đầu vượt giới hạn 10 lần gọi công cụ; chạy lại cùng vai với giới hạn 24 và hoàn tất. Lần mở reader ban đầu gặp hết thời gian duyệt, sau đó bị tự động từ chối vì phạm vi gửi tệp; đã đối chiếu quyền gửi nội dung workspace tại AGENTS.md dòng 298, kiểm tra phạm vi và chạy lại được duyệt. Không gửi tệp môi trường hoặc bí mật. Bằng chứng tác tử lưu tại `/tmp/lec03-regenerate-note/`.

Điều phối viên kiểm tra và sửa các lỗi bản sinh trước khi phát hành: đối ngẫu yếu dùng L≤f0, không mặc định bằng nhau; chứng minh tách dùng mâu thuẫn với cận dưới; phân biệt định nghĩa supremum và đối ngẫu yếu; giải thích khả thi nghiêm và bước hệ số đẳng thức bằng 0; chuẩn hóa khối Markdown được viewer hỗ trợ. Bổ sung ví dụ Slater nhưng nghiệm gốc không đạt, giải thích đường cận có thể chạm tập giá trị tại điểm không khả thi, phân biệt sai số thật với cận sai số. Trong hồi quy, xét đúng bình phương chuẩn, loại nhánh nhân tử bằng 0 trước khi dùng bù trừ; ký hiệu trị riêng là η để tránh nhầm với giá trị kỳ dị. Hai lượt rà cuối không tìm thấy lỗi thực chất. Bài tập chính thức được đối chiếu và giữ nguyên.

Kiểm định trực tiếp tệp phát hành bằng Chromium cục bộ tại 1280×720 và 390×844: 896 nút công thức KaTeX, 7 hình có mô tả thay thế, 13 khối gập; không lỗi công thức, JavaScript, tải tài nguyên hoặc tràn ngang toàn trang. Bàn phím mở/đóng lời giải được; khi in mở toàn bộ và khôi phục sau in. Đã xem ảnh màn hình rộng và hẹp, kiểm tra liên kết chỉ mục → ghi chú → bài tập và trạng thái tải. Bằng chứng: `verification-final.json`, `arithmetic-checks.json`, `links-final.json`, các ảnh `note-*.png` trong thư mục tạm trên.

Codex Slides: tải bản mới vào Design Files `uploaded/lecture-note-10.md`, đọc lại và đối chiếu SHA-256 với tệp phát hành; mở đúng tệp trên giao diện cục bộ, bằng chứng `plugin-note.png`. Công cụ upload trả liên kết tệp cũ ở trường file; đã dùng danh sách trả về để chọn đúng tệp mới và kiểm tra nội dung. Không tuyên bố kiểm tra bằng Browser trong trình soạn thảo vì công cụ đó không khả dụng.

SHA-256 bản cuối: ghi chú `59506cdb58f0b2de643571270fa3d7a7469e786e168bfc83bb769461c029617f`; bộ trang chiếu nguồn không đổi `98379a706141c17716e910957fe04abacf0d7c5de836319b3ab5537b04b32a7c`; bài tập không đổi `be677cda5fb848f3981a095deae728c5d0a2775106c970447c043022928129ab`. Chỉ commit cục bộ, không push.

### Ánh xạ nội dung ghi chú với bộ trang chiếu hiện tại

| ID | Heading trong lecture-note.md |
|---|---|
| S01-01 | Bài 03 — Đối ngẫu Lagrange (H1), đoạn mở đầu giới thiệu Slater và KKT |
| S01-02 | Mục tiêu học tập và kiến thức tiên quyết |
| S01-03 | Đoạn mở đầu nêu sáu phần, hệ thống heading; Phần 6 tổng hợp quy trình vận dụng |
| S02-01 | Phần 1 — Nhu cầu chứng nhận tối ưu và cận dưới → Bài toán có ràng buộc và điểm khả thi |
| S02-02 | Phần 1 → Ví dụ xuyên suốt của bài học (example) |
| S02-03 | Phần 1 → Họ hàm tạo cận dưới + derivation Tính một cận cụ thể với λ=1 |
| S02-04 | Phần 2 → Định nghĩa tổng quát → Định nghĩa hàm Lagrange |
| S02-05 | Phần 2 → Hàm đối ngẫu: inf trên toàn không gian → Định nghĩa hàm đối ngẫu |
| S02-05c | Phần 2 → Tính lõm của g theo nhân tử → proof Mệnh đề g lõm theo θ |
| S02-05a | Phần 2 → Tính g trong ví dụ xuyên suốt → derivation Bước 1 (lập L) |
| S02-05b | Phần 2 → derivation Tính g(λ) đầy đủ (Bước 2–3: hoàn thành bình phương, g(λ)=10−λ−9/(1+λ)) |
| S02-06 | Phần 2 → Đối ngẫu yếu → proof Định lý đối ngẫu yếu |
| S02-07 | Phần 2 → Bài toán đối ngẫu (d*, g(0)=1, g(1)=4,5, g(2)=5, λ*=2) |
| S02-07a | Phần 2 → Ví dụ hai chiều → example Đối ngẫu cho bài toán hai chiều (phần lập L, g) |
| S02-07b | Phần 2 → example Đối ngẫu cho bài toán hai chiều (phần hoàn thành bình phương, λ*=(1,2), d*=p*=5/2) |
| S02-08 | Phần 2 → exercise Bài tập tự luyện: xây dựng cận dưới (+ hint, solution) |
| S03-01 | Phần 3 → Hai khái niệm khoảng cần phân biệt |
| S03-02 | Phần 3 → Cận khít trong ví dụ (λ=2, L=3(x−2)²+5) |
| S03-03 | Phần 3 → Định nghĩa Điều kiện Slater và định lý đối ngẫu mạnh |
| S03-02b | Phần 3 → Trực quan về khoảng dư (hình slater-interior.svg) |
| S03-03a | Phần 3 → proof Chứng minh định lý Slater, từng bước (tập C, B, tách, chuẩn hóa) |
| S03-03b | Phần 3 → proof Chứng minh Slater, Bước 2 (vai trò khả thi nghiêm, a=0) |
| S03-03c | Phần 3 → proof Chứng minh Slater, Bước 2 (hệ số đẳng thức: x=x̄−Aᵀβ, −‖Aᵀβ‖², β=0) |
| S03-04 | Phần 3 → Kiểm tra Slater trong ví dụ xuyên suốt (f₀″=f₁″=2>0, x̄=3, p* hữu hạn) |
| S03-05 | Phần 3 → example Thiếu Slater, đối ngẫu mạnh vẫn đúng nhưng không đạt |
| S03-06 | Phần 3 → Kiểm tra điều kiện Slater ở hai chiều (exercise và solution), nối bài tổng hợp ở Phần 6 |
| S04-01 | Phần 4 → Biểu diễn quyết định bằng cặp giá trị |
| S04-01a | Phần 4 → Tập giá trị G (bảng x=0,2,3,4; hình value-plane-mapping.svg) |
| S04-01b | Phần 4 → Hàm Lagrange trên mặt phẳng giá trị (t=g(λ)−λu) |
| S04-02 | Phần 4 → example Đường cận với λ=1 (value-plane-1.svg) |
| S04-03 | Phần 4 → example Đường cận với λ=2: tiếp xúc và chứng nhận (value-plane-2.svg) |
| S04-04 | Phần 4 → exercise Bài tập tự luyện: đọc hình đối ngẫu (+ hint, solution) |
| S05-01 | Phần 5 → Cân bằng gradient và bù trừ |
| S05-02 | Phần 5 → Ràng buộc hoạt động và bù trừ |
| S05-03 | Phần 5 → Định nghĩa Hệ KKT (bốn nhóm) |
| S05-04 | Phần 5 → derivation Giải hệ KKT của ví dụ xuyên suốt (ba nhánh) |
| S05-05 | Phần 5 → Hai chiều của điều kiện tối ưu (bảng giả thiết và kết luận) |
| S05-05b | Phần 5 → proof Chứng minh chiều đủ: bài toán lồi + KKT ⇒ tối ưu toàn cục |
| S05-05c | Phần 5 → proof Chứng minh chiều cần: lồi + Slater + nghiệm tối ưu tồn tại ⇒ nhân tử KKT |
| S05-05a | Phần 5 → example Nghiệm tối ưu không thỏa KKT (min x, x²≤0) |
| S05-06 | Phần 5 → Hồi quy có ràng buộc chuẩn → Mô hình và hệ KKT |
| S05-06a | Phần 5 → Hồi quy có ràng buộc chuẩn → Giải hệ theo hai nhánh (w₀, hai nhánh, XᵀX+2λI xác định dương, chia đôi nhân tử) |
| S05-06b | Phần 5 → Hồi quy có ràng buộc chuẩn → example Hồi quy hai trọng số, kiểm tra đủ bốn nhóm KKT (λ*=2, w*=(3/5,4/5), mất mát 8) |
| S05-07 | Phần 5 → Hồi quy có ràng buộc chuẩn → exercise Bài tập tự luyện: một trọng số (+ hint, solution) |
| S07-01 | Phần 6 — Tổng hợp và vận dụng (ba bước lập cận / cận khít / chứng nhận) |
| S07-02 | Phần 6 → example Bài tổng hợp: hai biến, một ràng buộc (x*=(1/2,1/2), λ*=1, p*=1/2) |
| S07-03 | Phần 6 → Tài liệu tham khảo + Bài tập chính thức (liên kết material-viewer) |

Ghi chú: các câu hỏi "Tự kiểm tra" xen kẽ có ở phần 1, 2, 3, 5, 6; bài tự luyện đọc hình ở phần 4; mục "Quy trình vận dụng" (phần 6) phục vụ tự học, không ánh xạ riêng theo ID. Hình dùng: intro-feasible.svg, bound-family.svg, dual-bound.svg, slater-interior.svg, value-plane-mapping.svg, value-plane-1.svg, value-plane-2.svg (tất cả tự vẽ theo công thức, có alt cụ thể).
Nguồn chính của ghi chú là Boyd và Vandenberghe. MIT OpenCourseWare 6.079 được slide S07-03 giới thiệu như nguồn đọc bổ sung; bản ghi chú không khai sử dụng trực tiếp một tài nguyên MIT mới và không tải thêm nguồn. Các nguồn đọc thêm trong ghi chú trỏ tới cùng giáo trình đã dùng.

Rà cuối: Phần 6 có thêm câu hỏi chứng nhận từ cặp (x=(1,1), λ=0) và cặp khít đã giải, không dùng dữ kiện ngoài bài. Chỉnh diễn đạt về đường cận của ví dụ x²≤0: các đường có thể chạm G ngoài miền khả thi, nhưng không nhân tử hữu hạn nào cho đường qua nghiệm tối ưu.


## 2026-09-13 — Mở tài liệu trực tiếp và trên GitHub Pages

Người dùng báo lỗi Marked khi nhấp mở tệp local, yêu cầu đi qua index.html và vẫn xem được trên github.io. Đã tái hiện bằng Chromium file://: SRI chặn năm tài sản vì không có CORS; fetch Markdown cũng không dùng được trong chế độ này. Thay các thẻ nạp bằng material-bootstrap.js: nạp tuần tự, giữ SRI trên HTTP/HTTPS, bỏ SRI chỉ với file://, giữ thứ tự CSS. Không đổi CSP hoặc chuỗi bảo toàn công thức → Marked → DOMPurify → khôi phục nút văn bản → KaTeX.

Chế độ file:// đọc Markdown từ material-local-data.js; HTTP/HTTPS vẫn fetch Markdown gốc và không tải bản đóng gói. Bản đóng gói chứa 11 tài liệu công khai theo tên quy ước, được sinh bằng tiện ích Python stdlib và có --check phát hiện lệch. Đây là ngoại lệ đóng gói dữ liệu cần thiết theo yêu cầu nhấp mở không máy chủ; Markdown vẫn là nguồn, không sinh HTML hoặc dùng Node.js. Đã bổ sung quy trình đồng bộ vào AGENTS.md và materials/README.md. Người đọc tải cả kho để giữ CSS gốc và các tài sản. Liên kết tương đối trong học kỳ được giữ ở file://; vẫn từ chối đường dẫn tài liệu sai và số bài không khớp.

Reader OpenRouter lập kế hoạch, writer viết tiện ích trong thư mục tạm giới hạn, reviewer rà độc lập mã cuối; requested_model=observed_model=z-ai/glm-5.3-flash, provider=OpenRouter. Không chấp nhận đề xuất XHR fallback vì không đáp ứng Chrome file://. Reviewer xác nhận nạp tuần tự, SRI HTTP, không fetch ở file, chuỗi làm sạch và kiểm tra đường dẫn đúng. Đã sửa hướng dẫn tải cả kho (CSS chung nằm ở gốc), chạy --check khớp 11 tài liệu. Không ẩn liên kết Markdown gốc vì chức năng đúng là mở/tải nguồn; giữ mục lục cấp cao theo thiết kế. Liên kết tới sources ngoài học kỳ trong bài tập 02 chưa công bố không thuộc 10 liên kết chỉ mục; không sao chép nguồn nội bộ vào tài sản công khai để né kiểm tra đường dẫn.

Kiểm định: cả 10 liên kết tài liệu trên chỉ mục mở được bằng file:// và HTTP localhost. Riêng ghi chú Bài 03 tại 1280×720 và 390×844 có 896 nút KaTeX, hình tải đúng, không tràn ngang; lời giải dùng bàn phím và liên kết sang bài tập hoạt động. Đường dẫn vượt thư mục và số bài không khớp bị từ chối. Mô phỏng HTTPS với thư mục con /math-4-AI/ như GitHub Pages, dùng tài sản repo qua Playwright route: 5 thuộc tính SRI, tải Markdown gốc, không tải snapshot, không lỗi console. Đây là kiểm định tương thích, không tuyên bố đã triển khai lên github.io. Bằng chứng tại /tmp/material-local-fix/: plan.json, writer.json, review.json, verification.json, pages-verification.json và ảnh màn hình. Chỉ commit, không push.


## 2026-09-13 — Bản tải về đồng bộ sau báo lỗi Load failed

Người dùng cung cấp URL file:///Volumes/files/math-4-AI/2627-1/material-viewer.html. Bản mã hiện tại không fetch Markdown khi chạy file://; chưa truy cập được thư mục máy Mac để xác minh phiên bản tại đó. Đọc GitHub Pages thực tế thấy viewer vẫn không có nhánh LOCAL_MATERIALS, HTML chưa dùng bootstrap và URL bootstrap trả 404: bản web chưa chứa sửa đổi local đã commit. Không kết luận lỗi máy Mac chỉ từ trạng thái web.

Thêm tham số phiên bản vào bootstrap, viewer và dữ liệu đóng gói để tránh tái sử dụng JavaScript cũ khi cập nhật tệp. Tạo /tmp/math-4-AI-local.zip gồm 328 tệp học tập và runtime công khai, không gồm planning, .git hoặc tệp môi trường; dùng nội dung workspace mới nhất. Hướng dẫn giải nén thành thư mục mới và mở index.html. Không triển khai hoặc push. Không có WebKit trong môi trường nên không tuyên bố đã kiểm tra Safari.

Kiểm định bản cuối: cả 10 liên kết chỉ mục qua file:// và HTTP đạt; bản ZIP giải nén độc lập đi được từ index gốc → học kỳ → ghi chú 03, có 896 nút KaTeX và không lỗi console.


## 2026-09-13 — Bổ sung bổ đề tách hai tập lồi vào ghi chú

Phạm vi người dùng yêu cầu: ghi chú Bài 03, trước chứng minh Slater; không thay đổi trang chiếu, dàn ý hay số trang. Đề cương DOCX chính thức: buổi 3, LLO4–5/CLO1. Nguồn đối chiếu tại máy: Boyd–Vandenberghe (2004), mục 2.5.1, trang in 46–49; không tải thêm MIT, không thêm hình.

Người dùng đã xác nhận gửi lecture-note.md và outline.md tới OpenRouter; reader đọc hai tệp này, writer/reviewer chỉ đọc ghi chú. Mọi worker: requested_model=observed_model=z-ai/glm-5.3-flash, provider=OpenRouter. Reader lập kế hoạch riêng, writer soạn, năm reviewer chạy độc lập, writer khác lượt chỉnh sửa.

Điều phối viên chấp nhận vị trí bổ sung nhưng bác đề xuất thêm trang S03-03z và sửa cấu trúc outline vì ngoài phạm vi; bác bước lấy dãy cặp gần nhau rồi mặc nhiên suy ra siêu phẳng. Duyệt phương án tập hiệu → bao lồi hữu hạn → điểm gần gốc → giao hữu hạn các tập đóng trên mặt cầu compact → chọn c qua sup/inf. Bản đồ học tập: nhu cầu chứng minh Slater → trực quan siêu phẳng → ví dụ hai đoạn → phát biểu và chứng minh → ánh xạ q=(a,beta,mu) → câu hỏi chuẩn hóa và bao đóng.

### Báo cáo năm vai trên bản nháp

#### Sinh viên

## Báo cáo rà soát độc lập — lecture-note.md, dòng 293–400

**Phạm vi:** chỉ đọc `lecture-note.md`, dòng 293–400 (kèm ngữ cảnh tối thiểu). Góc nhìn: sinh viên tự học.

### 1. Lỗi logic dấu trong ví dụ phản例 tách nghiêm — **Mức độ: Trung bình (cần sửa)**
- **Vị trí:** dòng 365.
- **Bằng chứng:** văn bản viết: *"Lấy $w = 0 \in B$: cần $c < 0$."* Nhưng dạng tách nghiêm được giả sử là $q^Tz > c > q^Tw$; với $w=0$, $q^Tw = 0$ (vì $q>0$ đã chuẩn hóa), nên điều kiện đúng là **$c > 0$**, không phải $c<0$.
- **Ảnh hưởng:** kết luận phản chứng vẫn đúng (lấy $z\downarrow 0$ trong $C=(0,1)$ cho $0 \ge c$, mâu thuẫn với $c>0$), nhưng lập luận trung gian hiện sai dấu, gây rối cho người tự học.
- **Sửa cụ thể:** thay bằng: *"Lấy $w=0\in B$: cần $c>0$. Nhưng lấy $z\in C$ tiến về $0$: cần $qz>c$ với mọi $z>0$, cho $z\downarrow0$ được $0\ge c$, mâu thuẫn với $c>0$."*

### 2. Diễn đạt gây hiểu lầm ở câu hỏi/lời giải tự kiểm tra — **Mức độ: Nhẹ**
- **Vị trí:** dòng 369 và 374.
- **Bằng chứng:** câu hỏi hỏi *"Vì sao không thể thay giả thiết … bằng cl C và cl B rời nhau"*; lời giải viết *"giả thiết của bổ đề (dạng mạnh hơn) bị vi phạm"*. Cụm "(dạng mạnh hơn)" không rõ đối chiếu với gì; về logic, thay bằng giả thiết mạnh hơn **được phép** nếu nó thỏa — vấn đề là giả thiết mạnh thường **không thỏa** (cl C ∩ cl B ≠ ∅).
- **Sửa cụ thể:** câu hỏi đổi thành: *"Vì sao giả thiết thay thế 'cl C và cl B rời nhau' thường không thể kiểm chứng được / có thể sai dù C, B rời nhau?"*; lời giải bỏ cụm "(dạng mạnh hơn)", viết: *"giả thiết thay thế này không được bảo đảm bởi giả thiết gốc; ví dụ dưới đây cho thấy nó có thể sai."*

### 3. Các điểm đã kiểm chứng và **đạt**
- **Phát biểu bổ đề (297–301):** đúng, điều kiện tối thiểu (khác rỗng, lồi, rời nhau), ghi rõ "phiên bản yếu".
- **Chứng minh (303–363):** từng bước đúng — $E=C-B$ lồi, $0\notin E$; $K=\operatorname{conv}(F)$ compact và $K\subset E$; điểm gần gốc nhất $p$ cho $p^Tz\ge\|p\|^2$; chuyển hữu hạn→toàn bộ $E$ bằng compactness của $S$ và phủ con hữu hạn (tường minh, đúng); Bước 5 chọn $c\in[s,t]$ với lập luận sup/inf đúng chiều. Ký hiệu $q_F, H_z, S, \Delta_k$ đều định nghĩa trước khi dùng. Ghi chú công cụ (dòng 362) phù hợp người tự học, không bỏ bước topological ngầm.
- **Bước đầu chứng minh Slater (377–400):** tập $C,B$ lồi, rời nhau đúng; suy ra $a\ge0,\ \mu\ge0$ bằng cách tăng $u_i,t$ đúng; $c\ge\mu p^*$ bằng $t\uparrow p^*$ đúng; (1) đúng. Dòng 404: $0\le a^Tf(\bar x)\le0$ và suy ra $a=0$ đúng nhờ dấu nghiêm.
- **Ví dụ minh họa (295):** $C=[1,2]$, $B=[-2,0]$, $q=1$, $c=1/2$ — kiểm tra đúng.

### Kết luận
Một lỗi dấu cần sửa (mục 1), một lỗi diễn đạt nhẹ (mục 2); phần còn lại của đoạn 293–400 **đạt** về tính đúng đắn, ký hiệu và khả năng tự học.

#### Chuyên gia

## Báo cáo rà soát độc lập — `lecture-note.md`, dòng 293–400

**Kết luận chung:** Toán học của bổ đề và các bước chứng minh (Bước 1–5) là **đúng**, lập luận compact + phủ con hữu hạn chặt chẽ, không lẫn tách yếu/tách nghiêm ở phần bổ đề. Ví dụ 365 về giới hạn tách nghiêm đúng. Tuy nhiên có vài điểm cần chỉnh:

---

**1. (Nhẹ) Dòng 369–374 — lời giải bài tập 2 dễ gây hiểu sai.**
- Vị trí: `::: solution`, mục 2.
- Bằng chứng: câu hỏi "Vì sao không thể thay giả thiết... bằng cl C, cl B rời nhau" và lời giải "không thể áp dụng bổ đề cho các bao đóng" dễ đọc thành "bổ đề không đúng cho bao đóng". Thực tế nếu cl C ∩ cl B = ∅ thì bổ đề áp dụng được cho hai bao đóng (chúng lồi, rời nhau); điểm đúng là giả thiết bao đóng **không cần** và **có thể không thỏa** dù C, B rời nhau.
- Sửa: viết lại lời giải thành: "Thay giả thiết bằng cl C, cl B rời nhau là (a) không cần thiết — bổ đề yếu chỉ cần C, B rời nhau; (b) không phải lúc nào cũng khả dụng — ví dụ C=(0,1), B={0} có bao đóng giao nhau nên giả thiết mạnh không được thỏa; khi bao đóng rời nhau thì bổ đề vẫn áp dụng được cho bao đóng."

**2. (Nhẹ) Dòng 402–406 — ngầm giả thiết m ≥ 1.**
- Bằng chứng: Bước 2 suy μ>0 từ sự tồn tại x̄ với f_i(x̄)<0 cho **mọi** i; nếu không có ràng buộc bất đẳng thức (m=0) lập luận này rỗng (dòng 382 chỉ nói "nếu không có đẳng thức thì bỏ v,β,ν", không nói trường hợp không có bất đẳng thức).
- Sửa: thêm một câu tại đầu Bước 2: "Giả thiết Slater đòi hỏi m ≥ 1 (nếu m = 0, cần lập luận riêng/điều kiện khác); ở đây m ≥ 1."

**3. (Nhẹ) Dòng 379 — nhận định về nguồn có thể quá mạnh.**
- Bằng chứng: "lập luận bao lồi hữu hạn kết hợp tính compact ở đây là phần khai triển cho trường hợp tổng quát do ghi chú biên soạn". Kỹ thuật bao lồi hữu hạn + phủ con hữu hạn trên mặt cầu đơn vị là lập luận cổ điển (tương đương chứng minh định lý Farkas / Hahn–Banach hình học) và có trong nhiều tài liệu, không phải mới.
- Sửa: đổi thành "trình bày theo kỹ thuật tiêu chuẩn (tương tự chứng minh bổ đề Farkas); Boyd–Vandenberghe trình bày phiên bản dùng khoảng cách đạt được."

**4. (Rất nhẹ) Dòng 365 — diễn đạt "đúng như bổ đề yếu dự đoán".**
- Bổ đề yếu không "dự đoán" gì về sự vắng mặt của tách nghiêm; nó chỉ không bảo đảm điều đó.
- Sửa: "điều này minh họa rằng bổ đề yếu không kéo theo tách nghiêm."

**Các điểm đã kiểm chứng đạt:** bổ đề phát biểu đúng cho hai tập lồi khác rỗng rời nhau bất kỳ (không cần đóng/bị chặn) — đúng; E = C−B lồi và 0∉E (dòng 308–310) đúng; Bước 3 (tính chất điểm gần nhất) đúng; Bước 4 (FIP trên S compact, dạng phản chứng) đúng; Bước 5 (chọn c ∈ [s,t]) đúng; phân biệt tách yếu/tách nghiêm nhất quán; C và B ở dòng 386–392 khác rỗng, lồi, rời nhau được xác lập đúng; suy ra a≥0, μ≥0 và c ≥ μp* đúng; Bước 2 dùng dấu nghiêm f_i(x̄)<0 có chú giải đúng chỗ (dòng 406). Thuật ngữ "tách yếu / tách nghiêm ngặt" phù hợp chuẩn (Boyd §2.5.1).

#### Toán học

## Báo cáo kiểm chứng độc lập — lecture-note.md, dòng 293–400

Đã đọc toàn bộ đoạn 293–400 (và lướt ngữ cảnh 280–292, 401–409 chỉ để hiểu nối tiếp). Kiểm từng dấu, lượng từ, tính hữu hạn của sup/inf, lập luận compact và phản ví dụ. Kết quả:

### Lỗi tìm thấy (1 lỗi)

**[Trung bình] Dòng 365 — sai dấu trong phản ví dụ tách nghiêm, lập luận như viết tự mâu thuẫn nội bộ.**
- **Vị trí:** đoạn "Giới hạn: tách yếu không cho tách nghiêm", câu: *"Lấy $w = 0 \in B$: cần $c < 0$."*
- **Bằng chứng:** dạng tách nghiêm được giả sử là $q^T z > c > q^T w$. Với $w=0\in B$, $q^Tw = 0$, nên điều kiện là $c > 0$, **không phải** $c<0$. Tiếp đó, $z\downarrow 0$ trong $C=(0,1)$ cho $0 \ge c$ — mâu thuẫn với $c>0$, không mâu thuẫn với "$c<0$" như văn bản đang viết. Kết luận cuối (tách nghiêm không tồn tại) vẫn đúng, nhưng chuỗi lập luận khi viết ra là sai dấu và không tạo ra mâu thuẫn.
- **Sửa cụ thể:** thay câu trên bằng: *"Lấy $w=0\in B$: cần $c > q^Tw = 0$, tức $c>0$. Nhưng lấy $z\in C$ tiến về $0$: cần $qz>c$ với mọi $z>0$, cho $z\downarrow0$ được $0\ge c$, mâu thuẫn với $c>0$."*

### Các điểm đã kiểm và đạt

- **Dòng 295 (ví dụ minh họa):** $C=[1,2]$, $B=[-2,0]$, $q=1$, $c=1/2$: $z\ge1>1/2\ge w$ đúng với mọi cặp.
- **Bước 1 (304–310):** tính lồi của $E=C-B$ và $0\notin E$ chứng đúng; lượng từ và tổ hợp lồi chính xác.
- **Bước 2 (312–318):** $\Delta_k$ đóng bị chặn ⇒ compact; ảnh liên tục của compact là compact; $K\subset E$ đúng vì $E$ lồi; $0\notin K$ đúng.
- **Bước 3 (320–341):** cực tiểu $\|x\|$ trên $K$ compact đạt được; khai triển $\|p+t(z-p)\|^2$ đúng; chia $t>0$ và cho $t\downarrow0$ hợp lệ (bất đẳng thức đúng mọi $t\in(0,1]$); $p^Tz\ge\|p\|^2>0$ và chuẩn hóa $q_F=p/\|p\|$ đúng.
- **Bước 4 (342–350):** $H_z$ đóng trong $S$ (preimage của $[0,\infty)$ qua hàm liên tục) đúng; giao hữu hạn khác rỗng nhờ Bước 3 đúng; lập luận phản chứng + phủ con hữu hạn trên $S$ compact chặt chẽ, không bỏ bước.
- **Bước 5 (352–360):** sup/inf được lập luận hữu hạn tường minh ($s\le q^Tz_0<+\infty$, $t\ge q^Tw_0>-\infty$); thứ tự lấy sup theo $w$ rồi inf theo $z$ cho $t\ge s$ đúng; chọn $c\in[s,t]$ và hai cận $q^Tz\ge t\ge c\ge s\ge q^Tw$ đúng từng dấu.
- **Dòng 365 (phần chuẩn hóa dấu):** việc đổi $(q,c)\to(-q,-c)$ giữ dạng tách nghiêm — kiểm đúng.
- **Dòng 367–375 (exercise/solution):** giải thích chuẩn hóa và phản ví dụ bao đóng chính xác.
- **Dòng 384–400 (Bước 1 chứng minh Slater):** $C$, $B$ lồi, rời nhau (lập luận qua infimum, không cần nghiệm đạt) đúng; suy ra $a\ge0$, $\mu\ge0$ bằng cách tăng tọa độ đúng; $c\ge\mu p^*$ từ $t\uparrow p^*$ đúng; bất đẳng thức (1) suy ra đúng dấu.

**Kết luận:** toàn đoạn đạt trừ một lỗi dấu tại dòng 365 nêu trên; sau khi sửa theo đề xuất, đoạn đạt về mặt toán học.

#### Học thuật và giảng dạy

# Báo cáo phản biện — lecture-note.md, dòng 293–400 (mở rộng đến hết chứng minh Slater, dòng 419)

## Lỗi 1 — Mức độ: Cao (lỗi toán trong ví dụ phản例)
- **Vị trí:** dòng 365, ví dụ $C=(0,1)$, $B=\{0\}$.
- **Bằng chứng:** "Lấy $w = 0 \in B$: cần $c < 0$." Theo định nghĩa tách nghiêm $q^Tz > c > q^Tw$, với $w=0$ ta có $c > q^Tw = 0$, tức **$c > 0$**, không phải $c<0$.
- **Sửa:** thay "cần $c<0$" bằng "cần $c>0$"; và "mâu thuẫn với $c<0$" bằng "mâu thuẫn với $c>0$". Kết luận (mâu thuẫn, tách nghiêm không tồn tại) vẫn đúng vì $z\downarrow 0$ cho $0\ge c$.

## Lỗi 2 — Mức độ: Trung bình (lỗi sư phạm ở bài tập)
- **Vị trí:** dòng 369 (câu hỏi 2) và lời giải dòng 374.
- **Bằng chứng:** Câu hỏi hỏi "vì sao không thể thay giả thiết '$C,B$ rời nhau' bằng '$\operatorname{cl}C$, $\operatorname{cl}B$ rời nhau'". Nhưng đây là giả thiết **mạnh hơn**, hoàn toàn có thể thay — bổ đề vẫn áp dụng được. Lời giải thực chất nói điều khác (bao đóng có thể chạm nhau nên giả thiết mạnh bị vi phạm), không trả lời đúng câu hỏi như phát biểu.
- **Sửa:** phát biểu lại câu hỏi thành: "Vì sao không thể **yếu hóa** giả thiết thành '$\operatorname{cl}C$ và $\operatorname{cl}B$ rời nhau là điều kiện cần' / hoặc: 'vì sao không thể áp dụng bổ đề cho $\operatorname{cl}C,\operatorname{cl}B$ khi chỉ biết $C\cap B=\emptyset$?'" — khi đó lời giải hiện tại khớp.

## Lỗi 3 — Mức độ: Nhẹ (diễn đạt sai về logic)
- **Vị trí:** dòng 365, cuối đoạn.
- **Bằng chứng:** "đúng như bổ đề yếu dự đoán, vì $C$ và $B$ chạm nhau tại điểm biên $0$". Bổ đề yếu không "dự đoán" điều gì; nó chỉ không bảo đảm tách nghiêm. Việc tách nghiêm thất bại là do $0\in\operatorname{cl}C\cap B$, không phải hệ quả của bổ đề.
- **Sửa:** thay bằng "phù hợp với giới hạn đã nêu: bổ đề yếu không bảo đảm tách nghiêm khi hai tập chạm nhau tại biên".

## Điểm đã kiểm chứng, đạt
- Bổ đề tách yếu (dòng 297–301): phát biểu đúng; chứng minh Bước 1–5 (dòng 304–360) chặt chẽ: $E$ lồi, $0\notin E$; $K=\operatorname{conv}(F)$ compact; điểm gần gốc $p$; bất đẳng thức $p^Tz\ge\|p\|^2$; lập luận compact của $S$ + phủ con hữu hạn chuyển từ giao hữu hạn sang giao đầy đủ — đều đúng.
- Bước 5: chuyển "mọi cặp" thành hai cận qua $s=\sup$, $t=\inf$, chọn $c\in[s,t]$ — đúng.
- Ứng dụng Slater (dòng 384–418): $C,B$ lồi, rời nhau đúng; suy ra $a\ge0,\mu\ge0$, $c\ge\mu p^*$ đúng; Bước 2 ($\mu>0$) và bước chọn $x=\bar x-A^T\beta$ cho $-\|A^T\beta\|^2\ge0\Rightarrow\beta=0$ đúng; lưu ý rút gọn hạng $A$ hợp lý.
- Ví dụ $q=1,c=1/2$ (dòng 295) và lời giải bài tập 1 (dòng 373) đúng.
- Trích dẫn Boyd–Vandenberghe (dòng 379, 457) phù hợp, không phát hiện sai.

**Kết luận:** cần sửa Lỗi 1 (bắt buộc) và Lỗi 2 (khuyến nghị mạnh); Lỗi 3 là chỉnh văn phong. Sau khi sửa, mục đạt yêu cầu học thuật và giảng dạy.

#### Mạch kể chuyện

## Báo cáo rà soát lecture-note.md, dòng 293–400 (bổ đề tách hai tập lồi)

**Kết luận chung: ĐẠT.** Không phát hiện lỗi toán học hay lỗi mạch kể chuyện trong phạm vi yêu cầu. Dưới đây là các điểm xác nhận và hai gợi ý nhỏ (không bắt buộc).

### 1. Vai mạch kể chuyện và kết nối — đạt
- Dòng 295 đặt bổ đề đúng vị trí: ngay sau phát biểu + giới hạn Slater (282–291), trước chứng minh Slater (377), với câu dẫn "Chứng minh định lý Slater ở mục sau cần một công cụ" — chuyển ý rõ, không lệch vai.
- Dòng 379 liên kết ngược về bổ đề ("đã phát biểu và chứng minh ở mục trên") — vòng kết nối đóng đúng.
- Đầu vào/đầu ra nhất quán: bổ đề nhận $C,B$ khác rỗng, lồi, rời nhau trong $\mathbb R^d$ (297), trả về $q\ne0$, $c$ (299); ứng dụng ở 394–396 khớp chính xác ($d=m+r+1\ge1$, $q=(a,\beta,\mu)$).

### 2. Kiểm chứng toán học — đạt
- Bước 1 (308–310): $E$ lồi, $0\notin E$ — đúng.
- Bước 2 (312–318): $K=\mathrm{conv}(F)$ compact qua ảnh liên tục của $\Delta_k$; $K\subset E$; $0\notin K$ — đúng.
- Bước 3 (320–340): khai triển $\|p+t(z-p)\|^2$, chia $t>0$, cho $t\downarrow0$ — đại số đúng; chuẩn hóa $q_F=p/\|p\|$ hợp lý.
- Bước 4 (342–350): lập luận compact của $S$ + phủ con hữu minh, tường minh, không bỏ bước — đúng.
- Bước 5 (352–360): chuyển "mọi cặp" thành hai cận qua $\sup/\inf$, chọn $c\in[s,t]$ — đúng ($t\ge s$ lập luận đúng thứ tự).
- Ứng dụng (384–400): $C,B$ lồi, rời nhau (392, đúng cả khi nghiệm gốc không đạt), suy ra $a\ge0,\ \mu\ge0$, $c\ge\mu p^*$, bất đẳng thức (1) — đúng. Ví dụ tách $\mathbb R$ (295) và ví dụ tách nghiêm thất bại (365) đều kiểm tra lại đúng.

### 3. Gợi ý nhỏ (không phải lỗi)
1. **[Thấp | dòng 295]** Câu "$q^T z = z \ge 1 > 1/2 \ge w$" đúng nhưng viết "$\ge w$" khi thực tế $w\le0<1/2$; có thể viết "$1/2 > 0 \ge w$" cho chặt hơn. *Sửa:* thay "$1/2 \ge w = q^Tw$" bằng "$1/2 > 0 \ge w = q^Tw$".
2. **[Thấp | dòng 369, 374]** Câu hỏi tự kiểm tra 2 hơi dễ gây hiểu nhầm: bổ đề không yêu cầu bao đóng; phần lời giải "giả thiết của bổ đề (dạng mạnh hơn) bị vi phạm" cần nói rõ đó là giả thiết **nếu áp dụng bổ đề cho các bao đóng**, không phải giả thiết gốc. *Sửa:* thêm một cụm "khi áp dụng bổ đề cho $\operatorname{cl}C,\operatorname{cl}B$, giả thiết rời nhau của bao đóng bị vi phạm".

### 4. Phạm vi
Chỉ ghi chú trong lecture-note.md; không đề xuất thay slides hay số phần; không đọc/sửa tệp khác.

### Quyết định hợp nhất của điều phối viên

- Nghiêm trọng: phản ví dụ nháp viết c<0 sai, còn phép đổi (q,c) thành (-q,-c) không giữ chiều với cùng C,B. Reviewer toán phát hiện lỗi c nhưng chấp nhận nhầm đổi dấu; reviewer chuyên gia và mạch kể chuyện bỏ sót lỗi này. Bác các kết luận đạt ở phần phản ví dụ; yêu cầu thay bằng c>0 và dãy z_k=1/(k+1) để suy ra 0>=c, không đổi dấu.
- Trung bình: câu hỏi thay giả thiết bằng bao đóng rời nhau gây hiểu nhầm. Viết lại thành câu hỏi có luôn áp dụng bổ đề cho bao đóng được không; phân biệt giả thiết mạnh hơn với giả thiết gốc.
- Trung bình: bổ sung kiến thức compact và phủ mở trước chứng minh, bỏ đoạn tự đánh giá cùng từ tiếng Anh không cần thiết; ghi rõ q thuộc không gian d chiều và cả hai cận s,t hữu hạn.
- Bác đề xuất chuyên gia thêm m>=1 vào Slater: khi m=0, véc-tơ a rỗng bằng 0 và lập luận còn lại vẫn đúng. Không thêm điều kiện không cần thiết vào định lý.
- Giữ trích dẫn nguồn đã kiểm tại máy; không gán phương pháp cho bổ đề Farkas khi chưa có nguồn xác minh. Cụm do ghi chú biên soạn chỉ chỉ cách trình bày, không khẳng định phát minh mới.
- Không đổi thứ tự trang chiếu hay mẫu: đây là bổ sung chứng minh trong tài liệu học tập, không thay đổi RevealJS.

### Rà lại và kiểm định cuối

**Kết luận: bản hiện tại đã sửa đúng; không còn lỗi bản chất.** Các điểm kiểm tra (dòng 293–448):

- **Giả thiết đủ:** bổ đề yêu cầu $C,B$ khác rỗng, lồi, rời nhau trong $\mathbb R^d$, $d\ge1$ (d.297) — bước Slater xác nhận đủ (d.394), và không yêu cầu $m\ge1$; tổng rỗng $a=0$ không làm sai (chỉ có vai trò ở Bước 2, d.402–406).
- **Hữu hạn/compact:** Bước 2–3 dùng $\Delta_k$ compact, ảnh liên tục compact, $K$ compact (d.318–322); Bước 4 dùng $S$ compact + phủ con hữu hạn (d.344–352). Đúng.
- **$q\ne0$:** $q\in S$, $\|q\|=1$ (d.352); trong Slater $(a,\beta,\mu)\ne0$ (d.394). Đúng.
- **$c$ hữu hạn:** $q^Tw_0\le s\le t\le q^Tz_0$ (d.358) — đúng, và không còn dấu vết của $c<0$ hay đổi dấu $q$ trong bản nháp cũ.
- **Phản ví dụ tách nghiêm (d.365):** $C=(0,1)$, $B=\{0\}$; lập luận $c>0$, dãy $z_k=1/(k+1)\to0$ cho $0\ge c$, mâu thuẫn — đúng, không cần $q>0$, không đổi chiều bất đẳng thức. Đã sửa đúng.
- **Câu hỏi bao đóng (d.369) và lời giải (d.374):** đúng — $\operatorname{cl}C\cap\operatorname{cl}B=\{0\}\ne\emptyset$.
- **Câu nối Slater (d.379, 394):** gọi bổ đề đúng phiên bản yếu; chuỗi $p^*\le g\le d^*\le p^*$ (d.416) đúng.

**Lỗi nhỏ duy nhất còn lại (cosmetic, không phải bản chất):** d.365 viết lẫn "$qz$" và "$q^T w=0$" — nên thống nhất thành $q^Tz>c>q^Tw=0$ và $q^Tz_k>c$ cho nhất quán ký hiệu.

Trạng thái: **ĐẠT**.

Điều phối viên chấp nhận kết quả đạt. Giữ ký hiệu nhân vô hướng qz trong ví dụ một chiều: ở đây chuyển vị của số thực không làm thay đổi giá trị. Đã sửa thống nhất véc-tơ và tách rõ ví dụ q=1,c=0 khỏi ứng dụng Slater. Đã đối chiếu bài tập cùng bài tại máy; không thay giả thiết hay kết quả của Slater/KKT.

Kiểm định Chromium: đi từ chỉ mục học kỳ tới ghi chú qua file:// và HTTP localhost:8765; kích thước 1280×720 và 390×844; cả bốn trường hợp có 1101 nút KaTeX, không lỗi công thức, không lỗi JavaScript, không tràn ngang, hình tải đủ, lời giải dùng được bằng bàn phím. Tiện ích sync-local-materials.py đã chạy và --check đạt, 11 tài liệu khớp bản đóng gói. git diff --check đạt. Bằng chứng: /tmp/lec03-separation/verification.json và các ảnh file/http.

Codex Slides: mở đúng dự án Bài 03, đọc danh mục Design Files, tải ghi chú mới vào uploaded/lecture-note-11.md. Phản hồi upload trỏ nhầm tệp cũ; đã xác minh danh mục, mở lại đúng filePath và kiểm tra bản bền vững khớp từng byte với Markdown nguồn (SHA-256: 34e86054b2767c36ad2178023175c513d27a75e6c80dfc69ca919edfcfc684ed). Dùng Chromium cục bộ xem Design Files; phiên này không có Browser nhúng trong Codex. Viewer của kho là nơi kiểm tra KaTeX và các khối proof/solution; không tuyên bố tài liệu Markdown đã được render thành trang chiếu. RevealJS giữ nguyên.


## 2026-09-13 — Gập chứng minh bổ đề tách hai tập lồi

Người dùng yêu cầu gập chứng minh, rồi commit và push. Đổi đúng một chỉ thị proof thành solution với tiêu đề Chứng minh bổ đề tách yếu, sử dụng khối details có sẵn của viewer. Nội dung toán học không đổi, không thay runtime. Reader lập kế hoạch, writer sửa đúng một lần, reviewer chỉ đọc vùng bị ảnh hưởng; requested_model=observed_model=z-ai/glm-5.3-flash, provider=OpenRouter.

**Xác nhận đạt yêu cầu** (lecture-note.md, dòng 299–367):

1. **Thẻ đúng:** Dòng 305 mở `::: solution Chứng minh bổ đề tách yếu`, dòng 363 đóng `:::` — viewer render `<details>` mặc định đóng.
2. **Không lồng:** Trong đoạn 305–363 không có thẻ `:::` nào khác; khối đóng gọn một dòng.
3. **Đóng trước Giới hạn:** Khối kết thúc ở dòng 363, trước đoạn "**Giới hạn: tách yếu không cho tách nghiêm.**" (dòng 365) — đoạn này nằm ngoài details.
4. **Tiêu đề rõ:** "Chứng minh bổ đề tách yếu" nêu rõ là chứng minh, khớp nội dung Bước 1–5 và dấu `■` dòng 362.

Không cần sửa.

Kiểm định cục bộ: nguồn chỉ đổi một dòng; bản đóng gói chỉ thay mục ghi chú Bài 03; sync-local-materials.py và --check đạt. Chromium kiểm tra file:// và HTTP tại 1280×720, 390×844: khối đóng mặc định, Enter mở/đóng, công thức đủ và không lỗi, không tràn ngang; beforeprint mở và afterprint khôi phục trạng thái. Ảnh và báo cáo tại /tmp/lec03-collapse/. Đồng bộ Codex Slides Design Files vào uploaded/lecture-note-12.md và xác minh khớp từng byte. Kiểm tra trực quan cách gập thực hiện tại viewer của kho.
