# Rà soát ghi chú Bài 10–14 theo mẫu statistical-learning-theory

Lập ngày 2026-11-04. Tệp nội bộ của điều phối viên; không liên kết từ chỉ mục.

## Yêu cầu của người dùng

1. 2026-11-04 (`/goal`): rà soát lecture note Bài 10–14 theo các nguyên tắc về nội dung, văn phong, bố cục, cách diễn giải (cần chi tiết, đặc biệt các chứng minh quan trọng) của từng khối như đã thiết lập trong `../CLAUDE.md` và `CLAUDE.md`/`AGENTS.md` của học phần; dùng nguồn Murphy.
2. 2026-11-04 (giữa phiên): "dùng mẫu trong statistical-learning-theory".
3. Kế hoạch gốc của người dùng cho Bài 10–14 (`/home/tqlong/.codex/attachments/3893a558-0387-4fd2-85f7-7193feb41a27/pasted-text-1.txt`): câu hỏi trung tâm, kết quả cần chứng minh, ví dụ xuyên suốt, bài E-NN.1–4, bài trên lớp và bài tự học, lời giải tự học có thể đặt ở phụ lục hoặc tệp riêng, ghi nhận bài điều chỉnh (adapted exercises).

Thứ tự ưu tiên: người dùng → `AGENTS.md` → `CLAUDE.md` học phần → `../CLAUDE.md`. Mẫu SLT là chỉ thị của người dùng nên thay cấu trúc chương của `AGENTS.md` ở chỗ hai bên khác nhau.

## Nguồn

- Murphy I: Kevin P. Murphy (2022), *Probabilistic Machine Learning: An Introduction*, MIT Press. Bản PDF tác giả công bố, tải 2026-11-04 từ `https://github.com/probml/pml-book/releases/latest/download/book1.pdf`, SHA-256 `89749245bc8065d7575f990815c621a091de3facca1585168fc0369542742dcf`.
- Murphy II: Kevin P. Murphy (2023), *Probabilistic Machine Learning: Advanced Topics*, MIT Press. `https://github.com/probml/pml2-book/releases/latest/download/book2.pdf`, SHA-256 `54d6bfa8cc4a367bb553bea1c5127ca63696a9655b2ca1f6137a8584dccfdbaf`.
- Bản PDF và bản text (`pdftotext -layout`) chỉ nằm trong scratchpad của phiên, không đưa vào kho. Từ phiên này toàn văn đã đọc được; các ghi chú "chỉ kiểm mục lục, chưa đọc toàn văn" trong `review-log.md` cũ được thay bằng đối chiếu trực tiếp.
- Mẫu SLT: `../../statistical-learning-theory/2627-1/materials/_templates/{lecture-note,exercises}.md`, `planning/course-plan.md` §3–4, `planning/van-phong.md`, `planning/lec-01/van-phong-tac-gia.md`; ghi chú mẫu `materials/lec-01/lecture-note.md`, `materials/lec-05/lecture-note.md`, bài tập mẫu `materials/lec-01/exercises.md`.

## Quyết định của điều phối viên

**Q1. Cấu trúc chương** (theo mẫu SLT, điều chỉnh cho học phần):

```
# Bài NN — Tên bài
Đoạn dẫn ngắn: câu hỏi trung tâm, kết quả của bài trước được kế thừa (số hiệu + phát biểu lại).
## Câu hỏi mở đầu          hiện tượng cụ thể + câu trả lời hấp dẫn nhưng sai + lý do sai; bài trả lời câu hỏi này
## Mục tiêu học tập        3–6 năng lực quan sát được, chỉ bằng lời (không ký hiệu, không số hiệu); một câu ánh xạ CLO
## Kiến thức tiên quyết    dẫn số hiệu bài trước kèm phát biểu lại; **Câu hỏi ôn nhanh.** 2–3 câu, đáp số trong ::: hint
## 1. Thiết lập bài toán   dữ liệu, cơ chế sinh/lấy mẫu, đại lượng ngẫu nhiên và theo phân phối nào, mục tiêu, đối tượng so sánh
## 2. Ký hiệu và giả thiết bảng ba cột khoảng 20 dòng; tách giả thiết xác suất/thống kê khỏi giả thiết tối ưu/đại số
## 3. Ví dụ xuyên suốt     một ví dụ tính tay + một ứng dụng AI theo kế hoạch người dùng; chỉ nêu đối tượng, phần dùng khái niệm đặt tại khái niệm
## 4. … k.                 các mục nội dung (từ NN.1–NN.k hiện có): nhu cầu và trực giác → định nghĩa → kết quả và chứng minh → ví dụ → nhận xét khi bỏ giả thiết → đoạn kết văn xuôi
## Thuật toán              khi có (Bài 13: lặp giá trị), có thể nằm trong mục nội dung
## Ý nghĩa, tác động và giới hạn   gộp tình huống áp dụng (khối application, ít nhất hai, một khi giả thiết không thỏa) và phần tóm tắt (đoạn kể chuỗi suy luận + danh sách số hiệu chính)
## Bài tập                 danh sách ngắn trỏ sang exercises.md, mỗi bài một dòng mục tiêu đo
## Câu hỏi cuối buổi và cầu nối    **Câu hỏi:** chẩn đoán ngắn + đoạn cầu nối sang bài sau (Bài 14 khép mạch 10–14, không dẫn bài 15)
## Tài liệu đọc            Trước buổi học / Sau buổi học / Mở rộng; Murphy theo số mục đã kiểm trong PDF
## Phụ lục                 chứng minh kỹ thuật dài, tính toán chi tiết (A., B., …)
```

Mục `##` đánh số liên tiếp `## 1.`, `## 2.`, … như mẫu SLT; số hiệu khối giữ dạng `NN.k`.

**Q2. Bài tập** chuyển hết sang `materials/lec-NN/exercises.md` theo mẫu bài tập SLT: `# Bài tập Bài NN — Tên bài`, đoạn dẫn, `## Bài tập trên lớp` (các bài lớp hiện có), `## Bài tập tự học` (bốn bài E-NN.1–4 của kế hoạch người dùng và các bài ở cuối mục hiện có), `## Bài tập chọn từ Murphy` chỉ khi số bài đã kiểm trong PDF. Mỗi bài: `### Bài tập NN.k (Tên ngắn)`, dòng **Mức độ:** … **Mục tiêu:** …, `::: exercise`, một hoặc nhiều `::: hint` tăng dần, `::: solution` có **Kiểm tra lại.** Một bộ đếm `Bài tập NN.k`. Nguồn bài điều chỉnh ghi bằng một câu trung tính ở đoạn dẫn ("điều chỉnh từ bộ bài tập tuần N của học phần"), không ghi đường dẫn tệp.

**Q3. Khối hình thức.** Tiêu đề khối: số hiệu, tên, độ sâu chứng minh (`— chứng minh đầy đủ`, `— phác thảo`, `— đọc thêm`). Phát biểu có dòng in đậm **Giả thiết.** và **Kết luận.**; kết quả xác suất cao hoặc hội tụ (Bài 12 hội tụ đều/PAC, Bài 13 hội tụ lặp giá trị) dùng **Bảo đảm.** và nêu loại bảo đảm. Ba giả thiết hoặc thành phần trở lên thành danh sách có nhãn đậm. "Điều kiện áp dụng" và "Phạm vi" không còn là đoạn trong khối: chuyển thành đoạn đọc sau phát biểu hoặc `remark` "Khi bỏ giả thiết". Một bộ đếm chung cho định nghĩa, kết quả, nhận xét, thuật toán; bộ đếm riêng cho ví dụ. Vai trò: Bổ đề = công cụ chứng minh, Mệnh đề = sự kiện tập trung, Định lý = kết quả chính, Hệ quả = suy ra ngay.

**Q4. Chứng minh.** **Lộ trình.** trước; **Bước k (điều thiết lập).** mỗi bước một đoạn, nêu chỗ dùng giả thiết nào; chuỗi biến đổi trong `aligned`, mỗi quan hệ một dòng, căn cứ ở cột phải hoặc câu ngay sau; không "dễ thấy", không bước bỏ; kết thúc $\square$ và một câu về ý nghĩa với học máy/AI. Các chứng minh trọng tâm theo kế hoạch người dùng phải đầy đủ trong thân bài hoặc Phụ lục:
- Bài 10: quy tắc nhân, xác suất toàn phần, Bayes; độc lập ⇒ hiệp phương sai bằng 0 (chiều ngược sai, phản ví dụ); tuyến tính của kỳ vọng, công thức phương sai, kỳ vọng toàn phần; lấy biên.
- Bài 11: MLE Bernoulli kể cả nghiệm biên; MLE phân loại bằng nhân tử Lagrange; MLE trung bình và hiệp phương sai Gaussian (cực đại toàn cục); độ chệch của ước lượng phương sai; hình học trị riêng/vector riêng và khoảng cách Mahalanobis.
- Bài 12: bình phương tối thiểu từ hợp lý Gaussian; entropy chéo từ hợp lý Bernoulli; rủi ro chính xác của bộ phân loại ngưỡng trên phân phối đều $[-1,1]$; hội tụ đều cho lớp hữu hạn; hệ quả rủi ro dư của ERM; số chiều VC của hai lớp ngưỡng.
- Bài 13: tính co của toán tử Bellman tối ưu (chuẩn vô cùng, $\gamma<1$); điểm bất động duy nhất và hội tụ lặp giá trị; điểm bất động bằng giá trị tối ưu và chính sách tham lam tối ưu.
- Bài 14: PCA = vector riêng ứng trị riêng lớn nhất; tương đương cực đại phương sai và cực tiểu lỗi tái tạo trực giao; quan hệ AE tuyến tính–PCA; KL không âm; phân rã ELBO; KL Gaussian; tái tham số hóa.

**Q5. Ví dụ từng bước** (SLT `van-phong.md` §7a): dữ kiện chép lại trong khối, mỗi phép tính một dòng hoặc đoạn ngắn có kết quả trung gian, `aligned` cho chuỗi nhiều bước, dòng kiểm tra lại, một câu diễn giải gắn câu hỏi của mục.

**Q6. Định nghĩa trước khi dùng.** Thân bài không dẫn số hiệu xuất hiện sau; `python3 ../tools/courses/statistical-learning-theory/scripts/forward_refs.py <note>` (chạy từ thư mục workspace với đường dẫn `math-4-AI/2627-1/materials/lec-NN/lecture-note.md`) phải báo 0. Ngoại lệ: tiêu đề, mục tiêu học tập, câu hỏi cuối buổi và cầu nối, tài liệu đọc.

**Q7. Gỡ khỏi văn bản sinh viên đọc:** mục "Cách đọc và phân bổ thời gian"; mọi thời lượng (kể cả "— 30 phút", "180 phút" trong tiêu đề bài tập; thời lượng chỉ ở `outline.md`); đường dẫn nội bộ (`sources/…`, `homework.pdf`, `lecture_notes.pdf`); câu rào đón ("số liệu giả lập phục vụ học tập", "không gán thành ví dụ nguyên bản của Murphy", "không phải mã chuẩn đầu ra mới"); câu về quy trình kiểm nguồn ("mục lục được xác minh", "không nhận đã đọc toàn văn", "TOC nháp 2021"). Phân biệt ba mức cốt lõi/mở rộng/đọc thêm (kế hoạch người dùng A.2) thể hiện bằng độ sâu chứng minh ở tiêu đề khối và tiền tố "Mở rộng:"/"Đọc thêm:" của tiểu mục.

**Q8. Thuật ngữ và số.** Giữ thuật ngữ của học phần (phân phối, kỳ vọng, ký hiệu, hàm mất mát, hợp lý cực đại) để liền mạch với Bài 00–07 và 05c; mẫu SLT là mẫu cấu trúc và giọng văn, không thay thuật ngữ. Dấu thập phân là dấu phẩy: `0{,}05` trong KaTeX, `0,05` trong văn bản (như Bài 10 và 05c); dãy số dễ nhầm thì ngăn bằng ";".

**Q9. Giọng văn:** SLT `van-phong.md` (toàn bộ, nhất là §7a, §9a và danh sách kiểm §14), mục "The author's voice" của `../CLAUDE.md`, giọng "chúng ta/ta" của `CLAUDE.md` học phần, `no-ai-slop` (Edit cho người viết, Detect cho người rà). Đoạn nối cuối mục theo `AGENTS.md` ("Như vậy … Tuy nhiên … Trong Mục k+1 …") vẫn bắt buộc; quy tắc "cắt chỉ dẫn điều hướng" của `../CLAUDE.md` áp dụng cho chỉ dẫn thừa, không cho đoạn nối này.

**Q10. Các quy tắc `AGENTS.md` vẫn giữ** vì không mâu thuẫn với mẫu: công thức có câu dẫn và câu đọc; ký hiệu gọi tên tại chỗ; đoạn "Trong học máy" sau kết quả chính; nhầm lẫn thường gặp; đoạn móc nối khái niệm–định lý; ví dụ tự chứa dữ kiện; một ý một đoạn; hình SVG có `alt`; khối không lồng nhau.

**Q11. Murphy** là nguồn diễn giải: thứ tự dẫn dắt, ví dụ chuẩn, cảnh báo, mức chặt chẽ. Không dịch hoặc chép đoạn. Dẫn theo số mục đã kiểm trong PDF; số trang chỉ khi ghi rõ là bản trực tuyến của tác giả. Chỗ ghi chú lệch Murphy về ký hiệu hoặc thứ tự được ghi lý do trong `review-log.md`.

**Q12. Chỉ mục:** thẻ Bài 10–14 trong `2627-1/index.html` thêm liên kết "Bài tập" (`material-viewer.html?doc=materials/lec-NN/exercises.md`) sau khi tệp bài tập qua rà soát.

## Quy trình

Theo `../CLAUDE.md` §Sub-agents và `CLAUDE.md` học phần (người rà `high`, người viết `medium`, mô hình Opus 5.5):

1. Rà soát độc lập (chỉ đọc, song song): mỗi bài một người rà toán và nguồn Murphy, một người rà mẫu–văn phong–mạch truyện.
2. Điều phối viên kiểm các phát hiện, ghi `chấp nhận | yêu cầu sửa | bác bỏ` vào `planning/lec-NN/review-log.md`.
3. Một người sửa cho mỗi bài: tái cấu trúc ghi chú theo Q1, tạo `exercises.md`, sửa phát hiện. Người dùng cho phép 2026-11-04 chạy song song các người sửa vì mỗi người ghi tệp riêng ("có thể làm song song các bài vì ghi vào các tệp khác nhau"). Dẫn chéo sang Bài 10–13 giữ số hiệu cũ trong lúc sửa và được ánh xạ một lần bằng `map-lec-KK.md` sau khi bài được dẫn đã đánh lại số.
4. Tái kiểm (chỉ đọc): toán trên nội dung đổi; mẫu–mạch truyện toàn chương vì cấu trúc đổi.
5. Điều phối viên chạy kiểm tra: `forward_refs.py`, đồng bộ học liệu `--check`, `git diff --check`, kiểm tra trình duyệt (1600×900, 390×844, in), cập nhật chỉ mục, commit và push từng bài.

## Trạng thái

| Bài | Rà soát | Sửa | Tái kiểm | Kiểm tra | Commit |
|---|---|---|---|---|---|
| 10 | xong (toán–Murphy; mẫu–văn phong; xuyên bài) | xong (tái cấu trúc, bài tập, ánh xạ, bố cục 390 px) | xong (đến vòng 3–4) | đạt (forward_refs 0, đồng bộ, Playwright 1600×900 và 390×844, in, file://) | b20e756 |
| 11 | xong (toán–Murphy; mẫu–văn phong; xuyên bài) | xong (tái cấu trúc, bài tập, ánh xạ, bố cục 390 px) | xong (đến vòng 3–4) | đạt (forward_refs 0, đồng bộ, Playwright 1600×900 và 390×844, in, file://) | b20e756 |
| 12 | xong (toán–Murphy; mẫu–văn phong; xuyên bài) | xong (tái cấu trúc, bài tập, ánh xạ, bố cục 390 px) | xong (đến vòng 3–4) | đạt (forward_refs 0, đồng bộ, Playwright 1600×900 và 390×844, in, file://) | b20e756 |
| 13 | xong (toán–Murphy; mẫu–văn phong; xuyên bài) | xong (tái cấu trúc, bài tập, ánh xạ, bố cục 390 px) | xong (đến vòng 3–4) | đạt (forward_refs 0, đồng bộ, Playwright 1600×900 và 390×844, in, file://) | b20e756 |
| 14 | xong (toán–Murphy; mẫu–văn phong; xuyên bài) | xong (tái cấu trúc, bài tập, ánh xạ, bố cục 390 px) | xong (đến vòng 3–4) | đạt (forward_refs 0, đồng bộ, Playwright 1600×900 và 390×844, in, file://) | b20e756 |

## Quyết định sau lượt rà xuyên bài (2026-11-04)

Báo cáo: scratchpad phiên `reviews/cross-10-14.md` (0 chặn, 2 nghiêm trọng, 12 trung bình, 13 nhẹ). Tất cả được chấp nhận, với các lựa chọn sau.

**Q13. Thuật ngữ rủi ro.** Tên chuẩn là *rủi ro kỳ vọng* (như Bài 00, 05, 05c, 06, 06b, 10, 14). Bài 12 giới thiệu một lần "rủi ro kỳ vọng (expected risk; còn gọi là rủi ro tổng thể, population risk)", sau đó chỉ dùng "rủi ro kỳ vọng"; tiêu đề mục đổi theo.

**Q14. Ký hiệu.** Trong Bài 12, xác suất nhãn 1 viết $m_\theta(x)=\mathbb P_\theta(Y=1\mid X=x)$ (cũng là trung bình có điều kiện), bỏ $p_\theta(x)$; $p_\theta$ chỉ dùng cho mật độ hoặc hàm khối. Trong mỗi bài, một ký hiệu một nghĩa; hàm hợp lý viết $L$ như Bài 11 trừ khi trùng ký hiệu trong bài (khi đó nói rõ). KL viết $\mathrm{KL}(q\,\|\,p)$, tên "phân kỳ Kullback–Leibler (Kullback–Leibler divergence)" ở lần đầu mỗi bài; Bài 14 giữ chứng minh tính không âm (kế hoạch người dùng) và thêm một câu nối với cách dùng KL ở Bài 11.

**Q15. Đồng dạng giữa năm bài.**
- Tiểu mục: `### k.m. Tên` (có dấu chấm sau số).
- Dẫn Murphy: "Murphy (2022), §x.y" cho tập I, "Murphy (2023), §x.y" cho tập II; trong Tài liệu đọc ghi đủ tên sách một lần.
- `## Câu hỏi cuối buổi và cầu nối`: **Câu hỏi.** (câu hỏi đánh giá của bài theo kế hoạch người dùng §4, phát biểu như câu hỏi kiểm tra, không tu từ) + khối `::: solution Lời giải câu hỏi cuối buổi` + đoạn cầu nối; theo mẫu SLT Bài 01. Câu mở của bài sau nhận lại câu hỏi còn mở ở cầu nối của bài trước.
- `## Bài tập` của ghi chú: một câu dẫn có liên kết tệp bài tập, rồi danh sách đánh số `**Bài tập NN.k** (tên): mục tiêu đo.`, chia "Trên lớp" và "Tự học".
- Tệp bài tập: dòng `**Mức độ:** … **Mục tiêu:** …` cùng dạng; mỗi bài ít nhất hai gợi ý tăng dần khi bài có từ hai bước suy luận trở lên.
- Nhãn giả thiết dạng (T1), (G1)… chỉ có nghĩa trong bài; mỗi bài dùng tiền tố chữ riêng không trùng nghĩa với bài liền kề.
- Câu hỏi mở đầu luôn có câu trả lời hấp dẫn nhưng sai và lý do sai, không trả lời luôn câu hỏi chính ngay tại đó.
