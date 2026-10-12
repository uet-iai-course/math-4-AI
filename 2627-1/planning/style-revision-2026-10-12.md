# Sửa nguyên tắc văn phong trang chiếu theo MAT1101 (2026-10-12)

## Yêu cầu người dùng

Nguyên văn:

> hãy tham khảo cách trình bày, dẫn dắt, văn phong của các slide ở ../MAT1101; phân tích để chỉnh sửa nguyên tắc viết nội dung slide deck; sau đó hãy tiến hành chỉnh sửa các slide deck 00-07 (các deck chính); ngoài ra, mỗi mạch chính của các slide cần bắt đầu bằng 1 slide tiêu đề cho mạch đó

Đợt sửa này gồm hai bước. Bước một sửa nguyên tắc trong `AGENTS.md`, `CLAUDE.md` và thêm kiểu `.strand-title` vào `2627-1/lecture-style.css`; tệp này ghi lại bước đó. Bước hai sửa các deck 00–07 theo thứ tự ở mục "Thứ tự thực hiện"; mỗi deck ghi quyết định riêng trong `planning/lec-NN/`.

## Bằng chứng từ MAT1101

Nguồn: 14 tệp PPTX trong `/data/tqlong/MAT1101/` (13 deck dùng làm bằng chứng, 532 trang; bản "Bài 8 – old" không dùng). Ký hiệu "B2 S12" là Bài 2, trang 12. Âm tiết đếm bằng số token tách theo khoảng trắng, không tính tiêu đề, bảng và công thức.

### Mật độ chữ

| Số đo (13 deck, 532 trang) | Trung vị | p90 | Lớn nhất |
|---|---:|---:|---:|
| Âm tiết chữ mỗi trang | 20 | 53 | 101 |
| Số dòng chữ mỗi trang | 3 | 6 | 11 (trừ bảng B9 S36–37) |
| Âm tiết mỗi dòng | 6 | 14 | 44 (p99 = 25) |
| Đối tượng công thức mỗi trang (B2, B3, B8) | 6–7 | — | 36 (B8 S12, bảng so sánh) |

Một trang MAT1101 điển hình gồm tiêu đề, 3–5 dòng ngắn và 4–8 công thức.

### Tiêu đề

- Tên khái niệm hoặc kết quả bằng cụm danh từ: "Bất đẳng thức Markov" (B8 S6), "Luật xác suất toàn phần" (B2 S19).
- "Ví dụ: <đối tượng>" ở khoảng 30 % số trang: "Ví dụ: tung 2 xúc sắc" (B2 S9), "Ví dụ: khảo sát ý kiến" (B8 S21).
- "Bài tập" ở 16 % số trang (83/532), phần lớn không có chủ đề.
- "Chứng minh: <kết quả>" cho trang chứng minh riêng (B3 S37–S42, S47–S48).
- Tiêu đề lặp qua nhiều trang khi một khái niệm hay ví dụ kéo dài ("Ví dụ: Đo đạc" × 8, B11 S22–S29).

### Nhãn dẫn dắt

"Định nghĩa:", "Định lý:", "Ý nghĩa:" (B8 S6, S7), "Chứng minh:" một dòng (B8 S7, S11), "Cách khác:", "Dạng khác:", "Lưu ý:" (B2 S28), "Nhớ lại:" (B2 S30), "Diễn giải:" (B8 S21), "Lý do:", "Kết luận:", "Mục tiêu:", "Bước 1", "Câu hỏi:".

### Ví dụ xuyên suốt

- Xét nghiệm dương tính (Bài 2) đi qua xác suất có điều kiện, cây có điều kiện, luật nhân, xác suất toàn phần và công thức Bayes (S4, S12, S15, S20, S26).
- Khảo sát ý kiến (Bài 8) so sánh cận Chebyshev (S21) với định lý giới hạn trung tâm (S37) trên cùng câu hỏi, rồi so sánh số người cần khảo sát (S38).
- "Trễ hẹn", "Đồng xu", "Đo đạc" dùng lại qua Bài 9, 10.1 và 11 để so sánh ước lượng hậu nghiệm cực đại, kỳ vọng hậu nghiệm và hợp lý cực đại bằng số.

### Chứng minh và bài tập

- Chứng minh một ý đặt ngay dưới phát biểu (B8 S7: Chebyshev từ Markov, một dòng). Chứng minh nhiều bước tách thành trang riêng, mỗi trang một kết quả (B3 S37–S42).
- Lời giải bài tập gõ ngay trên trang, mỗi dòng một bước lập luận, kết thúc bằng một kết luận ngắn (B3 S16–S20, B8 S22, B9 S31–S37).
- Đề bài thường là ảnh chụp sách (B3 S15; B8 S16, S44; B9 S30, S33, S47); điểm này không áp dụng cho học phần.

Ghi chú diễn giả gần như vắng (9/532 trang, phần lớn là "TODO"). Mục "Những điểm của MAT1101 không áp dụng" trong `AGENTS.md` liệt kê các điểm không bắt chước.

## Hiện trạng deck 00–07

Số đo trên HTML, bỏ tiêu đề, công thức, SVG nội dòng và ghi chú diễn giả; chữ trong bảng vẫn được tính.

| Deck | Mạch/trang | Âm tiết chữ/trang: trung vị (p90) | Âm tiết/dòng: trung vị (p90) | Trang > 60 âm tiết | Ghi chú diễn giả: trung vị âm tiết | Trang có "Câu hỏi:" | Trang có nhãn "Ví dụ" |
|---|---|---|---|---|---|---|---|
| MAT1101 | — /532 | 20 (53) | 6 (14) | 7 % | ~0 | ~1 % | ~30 % |
| 00 | 7/73 | 32 (67) | 6 (20) | 14 % | 49 | 11 % | 11 % |
| 01 | 7/41 | 44 (74) | 7 (17) | 22 % | 234 | 24 % | 7 % |
| 02 | 6/74 | 28 (60) | 9 (17) | 9 % | 262 | 12 % | 5 % |
| 03 | 6/47 | 30 (57) | 7 (13) | 6 % | 211 | 11 % | 17 % |
| 04 | 7/54 | 50 (75) | 9 (22) | 30 % | 213 | 15 % | 7 % |
| 05 | 5/44 | 54 (103) | 15 (32) | 39 % | 156 | 9 % | 20 % |
| 06 | 7/45 | 59 (116) | 14,5 (34) | 49 % | 181 | 13 % | 29 % |
| 07 | 6/37 | 59 (93) | 14 (28) | 49 % | 255 | 16 % | 11 % |

Deck 02, 03, 00 gần MAT1101 về mật độ. Deck 05, 06, 07 dày gần gấp ba, và deck 05, 06 gắn lớp `.dense` cho hầu hết trang.

## Quyết định của master về nguyên tắc

Tác tử phân tích đề xuất các đoạn C.1–C.8; master chấp nhận và điều chỉnh sáu điểm sau.

1. **Phạm vi chèn.** Áp dụng C.1, C.2, C.3, C.4(a)(b)(c), C.5, C.6, C.7, C.8 đúng vị trí đề xuất. Giữ nguyên các quy tắc cứng hiện hành; chỉ thêm hoặc thay đúng đoạn đã nêu.
2. **Trần mật độ.** Nhắm ≤ 40 âm tiết mỗi trang nội dung, trần cứng 60; trần 80 cho trang mục tiêu, nội dung, tổng kết và bảng so sánh; ≤ 6 dòng; ≤ 20 âm tiết mỗi dòng; ≤ 3 khối công thức hiển thị. Ngoại lệ phải ghi trong `storyboard.md` kèm lý do. Tác tử rà soát xếp trang vượt trần không có ngoại lệ ở mức `trung bình`, vượt 1,5 lần trần ở mức `nghiêm trọng`.
3. **Độ dài ghi chú diễn giả.** Khoảng 40–150 âm tiết (tới khoảng 250 cho chứng minh hoặc lời giải) là khuyến nghị; vượt khoảng này chỉ là phát hiện mức `nhẹ`. Ghi chú vẫn phải đủ giả thiết, diễn giải, phân biệt dễ nhầm và lời giải. Giữ lệnh cấm mở ghi chú bằng "Trang này …" hoặc câu lấy tài liệu làm chủ ngữ.
4. **Trang tiêu đề mạch.** Số thứ tự dùng chữ số ("2.", "3.", …) cho mọi deck, kể cả deck 07 đang dùng "A."–"D.". Nhãn phần bằng chữ cái A, B, C vẫn được dùng trong storyboard, dàn ý, học liệu và mã trang, không trên mặt trang tiêu đề mạch. Trang bìa là trang tiêu đề của mạch mở đầu.
5. **Mã nội bộ của bài khác trên mặt trang** (H2, T7, VD1…). Mặt trang phát biểu bằng lời và gọi ví dụ bằng tên đối tượng; được kèm số hiệu kết quả của ghi chú bài giảng dạng "(Định lý 05b.41)" tối đa một lần mỗi trang; mã "T7", "H2", "VD1" không xuất hiện trên mặt trang. Học liệu không bắt buộc đổi mã trong đợt này.
6. **CSS.** Chèn khối `.strand-title` vào `2627-1/lecture-style.css` ngay sau khối `.reveal .advanced-badge`: không scoped theo bài, không `!important`, không `display:flex` trên `<section>`, có khối `@media (max-width: 760px)`. Không sửa luật nào khác.

## Mạch và tên mạch đề xuất cho từng deck

Cột "Trang đầu hiện tại" là `data-slide-id` của trang đầu `<section>` ngoài trước đợt sửa. Tên mạch và dòng dẫn còn được storyboard của từng deck chốt lại.

**Deck 00** (7 mạch; bìa `P00` là trang tiêu đề mạch 1; trang "Nội dung" gộp vào `P02`)

| Số | Trang đầu hiện tại | Mã đề xuất | Tên mạch | Dòng dẫn gợi ý |
|---|---|---|---|---|
| 1 | `P00` | (bìa) | Mở đầu | — |
| 2 | `H01` | `H00` | Dự đoán giá nhà và phần dư | Muốn đo một dự đoán sai bao nhiêu trên bốn căn nhà đã quan sát. |
| 3 | `A01` | `A00` | Đại số tuyến tính cho dữ liệu | Nhu cầu: viết bốn mẫu thành một hệ $\mathbf X\mathbf w=\mathbf y$ và bài toán bình phương nhỏ nhất. |
| 4 | `B01` | `B00` | Giải tích nhiều biến cho hàm mất mát | Nhu cầu: tìm trọng số làm gradient của mất mát bằng không. |
| 5 | `C01` | `C00` | Xác suất một biến và nhiễu | Muốn mô tả phần giá không giải thích được bằng một biến ngẫu nhiên. |
| 6 | `D01` | `D00` | Véc-tơ ngẫu nhiên và phân phối nhiều biến | Nhu cầu: mô tả nhiễu đồng thời của nhiều căn nhà. |
| 7 | `E01` | `E00` | Tổng hợp mô hình giá nhà | Nhu cầu: ghép biểu diễn, tối ưu và bất định thành một dự đoán. |

**Deck 01** (7 mạch, theo `planning/lec-01/storyboard.md`; chưa có trang "Nội dung", thêm vào `M02` hoặc tách trang)

| Số | Trang đầu hiện tại | Mã đề xuất | Tên mạch | Ghi chú |
|---|---|---|---|---|
| 1 | `M01` | (bìa) | Mở đầu và ba nhu cầu | — |
| 2 | `D01` | `D00` | Điều khiển một bước | Đổi tiêu đề `D01` (đang trùng tên mạch), ví dụ "Dữ kiện của bài toán điều khiển" |
| 3 | `L01` | `L00` | Hồi quy tuyến tính | — |
| 4 | `G00` | `GT` | Hồi quy logistic | Mã `G00` đã có |
| 5 | `T01` | `T00` | Dạng tổng quát của bài toán tối ưu | Không dùng "Khuôn chung" |
| 6 | `F01` | `F00` | Tập lồi và hàm lồi | Mạch có hai tiền tố F, H |
| 7 | `K01` | `K00` | Chứng nhận ba bài toán | — |

**Deck 02** (6 mạch; đã có trang tiêu đề `S02`–`S06`, đổi sang định dạng `strand-title`)

| Số | Mã | Tên mạch (khớp `S01-02`) | Việc cần làm |
|---|---|---|---|
| 1 | `S01-01` (bìa) | Mô hình hóa và chứng nhận tính lồi | — |
| 2 | `S02` | Quy hoạch tuyến tính | Đổi markup, thêm dòng dẫn, rút ghi chú |
| 3 | `S03` | Quy hoạch bậc hai và ràng buộc bậc hai | Sửa tên cho khớp "Nội dung" |
| 4 | `S04` | Quy hoạch hình học | Như mạch 2 |
| 5 | `S05` | Xấp xỉ lồi và nới lỏng | Thống nhất tên với `S01-02` |
| 6 | `S06` | Tổng hợp và vận dụng | Thay câu "Phần cuối: …" bằng dòng dẫn "Nhu cầu: …" |

**Deck 03** (6 mạch; trang "Nội dung" `S01-03` đã đánh số "Mở đầu" là mục 1; mạch 6 đang mang `id="mach-7"`, sửa thành `mach-6`)

| Số | Trang đầu hiện tại | Mã mới | Tên mạch | Tiêu đề mới cho trang đầu cũ |
|---|---|---|---|---|
| 2 | `S02-01` | `S02-00` | Hàm và bài toán đối ngẫu Lagrange | Cận dưới cho giá trị tối ưu |
| 3 | `S03-01` | `S03-00` | Đối ngẫu mạnh và điều kiện Slater | Khoảng đối ngẫu |
| 4 | `S04-01` | `S04-00` | Hình học của đối ngẫu | Mặt phẳng giá trị |
| 5 | `S05-01` | `S05-00` | Điều kiện Karush–Kuhn–Tucker | Dấu bằng trong chuỗi đối ngẫu yếu |
| 6 | `S07-01` | `S07-00` | Tổng hợp và vận dụng | Ba bước chứng nhận |

**Deck 04** (7 mạch, theo `planning/lec-04/storyboard.md`; trang `RP03` đổi thành danh sách đánh số khớp 7 mạch hoặc thêm trang "Nội dung")

| Số | Trang đầu hiện tại | Mã đề xuất | Tên mạch |
|---|---|---|---|
| 1 | `RP00` | (bìa) | Điều kiện tối ưu và bước lặp |
| 2 | `RG01` | `RG00` | Hướng giảm và độ dài bước |
| 3 | `RN01` | `RN00` | Phương pháp Newton |
| 4 | `RE01` | `RE00` | Newton giữ ràng buộc đẳng thức |
| 5 | `RR01` | `RR00` | Newton từ điểm chưa khả thi |
| 6 | `RS01` | `RS00` | Tính tự điều chỉnh và cận sai số (không ghi "Tự học" trên mặt trang) |
| 7 | `RZ01` | `RZ00` | Tổng hợp và chuyển giao |

**Deck 05** (5 mạch; `MD03` đang liệt kê 3 mạch giữa)

| Số | Trang đầu hiện tại | Mã đề xuất | Tên mạch |
|---|---|---|---|
| 1 | `MD01` | (bìa) | Bài toán trung tâm và khung chung |
| 2 | `HQ01` | `HQ00` | Hồi quy nhiều chiều |
| 3 | `LG01` | `LG00` | Hồi quy logistic và chính quy hóa |
| 4 | `CP01` | `CP00` | Độ cong và chi phí tính toán |
| 5 | `KL01` | `KL00` | Giới hạn của tối ưu tất định |

**Deck 06** (7 mạch; `A02` đang liệt kê 5 mạch giữa)

| Số | Trang đầu hiện tại | Mã đề xuất | Tên mạch |
|---|---|---|---|
| 1 | `A01` | (bìa) | Bài toán huấn luyện khi mô hình và dữ liệu lớn |
| 2 | `B01` | `B00` | Biểu diễn phi tuyến và mạng hai tầng |
| 3 | `C01` | `C00` | Lan truyền ngược trên đồ thị tính toán |
| 4 | `D01` | `D00` | Điểm dừng và bảo đảm của gradient khi không lồi (khác tiêu đề `D01`) |
| 5 | `E01` | `E00` | Gradient nhóm nhỏ và chi phí mỗi bước |
| 6 | `F01` | `F00` | Tốc độ hội tụ dưới nhiễu và dừng sớm |
| 7 | `G01` | `G00` | Tổng hợp và lựa chọn phương pháp |

**Deck 07** (6 mạch; `A01`–`D01` đổi sang định dạng trang tiêu đề mạch, giữ mã; nhãn "A."–"D." trên mặt trang đổi thành "2."–"5." theo quyết định 4)

| Số | Trang đầu hiện tại | Mã | Tên mạch | Việc cần làm |
|---|---|---|---|---|
| 1 | `P00` | (bìa) | Mở đầu | Thêm danh sách "Nội dung" (chưa có) |
| 2 | `A01` | `A01` | Mô hình hóa quy hoạch tuyến tính | "A." → "2."; giữ câu "Muốn …" làm dòng dẫn; chuyển ba gạch đầu dòng định nghĩa sang `A02` hoặc ghi chú |
| 3 | `B01` | `B01` | Đa diện và dạng chuẩn | "B." → "3."; như mạch 2 |
| 4 | `C01` | `C01` | Điểm cực biên và bảo đảm tối ưu | "C." → "4."; như mạch 2 |
| 5 | `D01` | `D01` | Quy hoạch động | "D." → "5."; bảng so sánh LP–DP chuyển sang `D02` |
| 6 | `Z01` | `Z00` | Tổng kết và chuyển tiếp | Thêm mới |

Số trang sau khi chỉ thêm trang tiêu đề mạch: 00: 73 → 79; 01: 41 → 47; 02: 74 (đổi định dạng 5 trang); 03: 47 → 52; 04: 54 → 60; 05: 44 → 48; 06: 45 → 51; 07: 37 → 38 (thêm `Z00`, đổi định dạng 4 trang). Phần tách trang theo trần mật độ chưa tính, ước lượng thêm 4–8 trang mỗi deck 04–07.

## Thứ tự thực hiện

1. Sửa nguyên tắc trong `AGENTS.md` và `CLAUDE.md` (bản sửa ghi trong tệp này). Commit `docs(agents)`.
2. Thêm khối `.strand-title` vào `lecture-style.css` và chạy hồi quy trực quan mọi deck đang công bố ở 1600×900 và 390×844. Chỉ một tác tử ghi vào tệp CSS tại một thời điểm.
3. Làm thử trên deck 03 (khối lượng nhẹ): thêm 5 trang tiêu đề mạch, đổi tiêu đề trang đầu mạch, áp trần mật độ; kiểm định storyboard, tái kiểm toán và mạch lập luận, kiểm trình duyệt. Master hiệu chỉnh trần 40/60 âm tiết nếu tỏ ra quá chặt.
4. Làm thử trên deck 06 (khối lượng nặng) để kiểm phương án tách trang và bỏ mã T/H trên mặt trang; đồng bộ `materials/lec-06` nếu cần.
5. Các deck còn lại theo khối lượng tăng dần: 02 → 00 → 01 → 07 → 05 → 04. Deck 04 làm cuối vì "VD1/VD2" xuất hiện 105 lần trong `materials/lec-04`. Mỗi deck một commit sau kiểm; các deck là tệp khác nhau nên có thể giao song song, còn `lecture-style.css` chỉ một tác tử ghi.
6. Với mỗi deck: cập nhật `outline.md`, `storyboard.md`, `review-log.md` (mã trang mới, số âm tiết trước và sau cho trang vượt trần, quyết định), đồng bộ học liệu bằng `sync-local-materials.py`, kiểm trình duyệt hai kích thước, `git diff --check`.

## Tệp sửa trong bước một

| Tệp | Chỗ sửa |
|---|---|
| `AGENTS.md` | "Cấu trúc bộ trang chiếu mặc định": danh sách 1–7 (C.1), đoạn storyboard cho trang tiêu đề mạch và trang vượt trần (C.6), tiểu mục "Trang tiêu đề mạch" (C.2); "Tiêu chuẩn nội dung": gạch đầu dòng bài tập (C.5); mục mới "Văn phong và mật độ mặt trang chiếu" (C.3); "Tiêu chuẩn trình bày": tiêu đề, badge, độ dài ghi chú (C.4); §5, §6, §9 của quy trình đa tác tử (C.7) |
| `CLAUDE.md` | "Repo map": dòng cho tệp này; "Writing course content": tiêu đề; "Deck structure and content": trang tiêu đề mạch, mở bài, mật độ, câu trên mặt trang, trang kết quả, ví dụ, bài tập, nhãn, mã nội bộ, độ dài ghi chú (C.8) |
| `2627-1/lecture-style.css` | Khối `.strand-title` sau `.reveal .advanced-badge` (D.4) |

## Nhật ký tác tử

| Vai | Loại tác tử | Mô hình | Mức suy luận | Ghi tệp | Đầu ra | Quyết định của master |
|---|---|---|---|---|---|---|
| Tác tử phân tích nguồn và mẫu | `general-purpose` | `claude-opus-5-5` | `high` | Không (chỉ đọc) | Báo cáo phân tích MAT1101 và đề xuất C.1–C.8, D, E | `chấp nhận`, kèm sáu điều chỉnh ở mục "Quyết định của master về nguyên tắc" |
| Tác tử chỉnh sửa tài liệu quy trình và CSS dùng chung | `general-purpose` | `claude-opus-5-5` | `high` | `AGENTS.md`, `CLAUDE.md`, `2627-1/lecture-style.css`, tệp này | Bản sửa bước một | Chờ master |

## Quyết định của master về bản sửa này

<!-- Master điền: chấp nhận | yêu cầu sửa | bác bỏ, kèm lý do. -->

Master (Claude Fable 5.1, effort medium) đã đọc toàn bộ diff của `AGENTS.md`, `CLAUDE.md`, `lecture-style.css` và tệp này; đối chiếu các nhận định của báo cáo phân tích với tệp thật (trang tiêu đề mạch sẵn có ở deck 02 và 07, 13 badge "Tự học" ở deck 04, mã T/H ở deck 06, `id="mach-7"` ở deck 03, 18 ghi chú mở bằng "Trang này" ở deck 02). Quyết định: `chấp nhận`, với một điều chỉnh do master tự ghi: câu cấm trên mặt trang bỏ "ta có" khỏi danh sách và cho phép "ta" trong dòng tính toán khi không bỏ được, vì giọng tính toán của học phần (ghi chú bài giảng) dùng "ta". Kiểm tra: `git diff --check` sạch; deckcheck trên deck 02 và 06 không lỗi console, các cờ tràn ngang trùng với bản HEAD. Commit `docs(agents)` ngay sau mục này.

## Kết quả thực hiện (master Fable 5.1 ghi, 2026-10-12)

| Deck | Trang trước → sau | Mạch | Trang tiêu đề mạch | Commit |
|---|---|---|---|---|
| 00 | 73 → 88 | 7 | H00, A00, B00, C00, D00, E00 | ca4191f |
| 01 | 41 → 52 | 7 | D00, L00, GT, T00, F00, K00 | fecae84 |
| 02 | 74 → 80 | 6 | S02–S06 (đổi mẫu) | a640a0b |
| 03 | 47 → 57 | 6 | S02-00, S03-00, S04-00, S05-00, S07-00 | 1823d1a |
| 04 | 54 → 75 | 7 | RG00, RN00, RE00, RR00, RS00, RZ00 | 0083fd0 |
| 05 | 44 → 67 | 5 | HQ00, LG00, CP00, KL00 | b00899c |
| 06 | 45 → 72 | 7 | B00, C00, D00, E00, F00, G00 | f714748 |
| 07 | 37 → 53 | 6 | A01–D01 (đổi mẫu, chữ số), Z00 | 9f7a5ba |

Quy trình mỗi deck: tác tử biên tập (general-purpose, claude-opus-5-5, high) → master kiểm density/deckcheck/ảnh → hai tác tử tái kiểm chỉ đọc (toán; mạch kể; cùng cấu hình) → vòng sửa theo chỉ thị master → master duyệt lần cuối, ghi `chấp nhận` vào review-log của bài, commit và push. Tổng cộng 8 tác tử biên tập, 16 tác tử tái kiểm, 1 tác tử phân tích, 1 tác tử sửa tài liệu, 1 tác tử đổi thuật ngữ. Số trang vượt trần 60 âm tiết: trước 10/9/7/2/16/17/22/18, sau chỉ còn các trang mục tiêu/nội dung/tổng kết/bảng so sánh trong trần 80, có ngoại lệ ghi storyboard. Không deck nào còn `.dense`, badge "Tự học", mã VD/T/H trên mặt trang.

Bổ sung theo yêu cầu người dùng cùng ngày: thuật ngữ "cưỡng bức (coercive)" thay "bức" ở Bài 01, 02, 05; Bài 05 định nghĩa lại hàm cưỡng bức (LG06) và $F_\lambda$ (LG07) trước lần dùng đầu (commit 8beea89).

Hồi quy CSS dùng chung: deck 05b, 06b, 06c chạy deckcheck 0 lỗi, 0 cờ. Gói học liệu cục bộ đồng bộ. `index.html` không đổi (không chứa số trang).

Việc còn treo (đợt học liệu sau): tên mục của `lecture-note.md` Bài 02, 03 theo tên mạch mới; `materials/lec-03/exercises.md` bài 5 (cận trên do điểm khả thi, "độ dốc"); `materials/lec-04` còn mã VD1/VD2/VD3 và năm bài tập mới của deck chưa có trong `exercises.md`; `materials/lec-05/exercises.md` câu dẫn "ở trang tổng kết"; `materials/lec-06/exercises.md` còn mã T5–T8; `materials/lec-07` chưa có `exercises.md`; CSS: luật `.ai-philosophy`, hai luật scoped A03/A05 của Bài 07 và các luật `.dense` không còn dùng ở 05/06 (05b vẫn dùng); ký hiệu $t$ trùng ở Bài 01; đề xuất `.l01-slide .mini-data` 0,84em.

## Bổ sung sau bàn giao lần một (cùng ngày)

Kiểm bao phủ trang tiêu đề mạch bằng một phép kiểm duy nhất trên tám deck: 51 mạch, mỗi mạch trừ mạch mở đầu bắt đầu bằng đúng một `section.strand-title`, số thứ tự liên tục 2…N khớp `#/N`; kết luận đạt. Đợt đồng bộ học liệu đã hoàn thành: Bài 01 tách ký hiệu $t$/$s$ và tham số $c$ (379705a); Bài 02 tên mục (91bdfa3); Bài 03 tên mục, "độ dốc", cận trên do phương án khả thi, lời giải trùng deck (a8f7416); Bài 04 bỏ 96 mã VD, thêm Bài 9–13 (0df08a3); Bài 05 (7b398ce); Bài 06 bỏ mã T5–T8, ngưỡng ngân sách tổng quát (0c87b8e); Bài 07 thêm `exercises.md` 13 bài, thẻ index, gói cục bộ 23 tệp (99a9038). Tái kiểm toán các bài tập mới của Bài 04 và 07 đạt. Viewer 15 trang (index và 14 tệp học liệu) 0 lỗi. Còn treo có chủ ý: nhãn giả thiết H0–H6b trong ghi chú Bài 05, 06 (được định nghĩa trong ghi chú, chỉ cấm trên mặt trang deck); tên §1, §6 của ghi chú Bài 02 khác tên mạch (tên mục giáo trình không bắt buộc trùng); luật CSS không còn dùng (`.ai-philosophy`, hai luật scoped A03/A05 của Bài 07) để lại cho đợt dọn CSS.
