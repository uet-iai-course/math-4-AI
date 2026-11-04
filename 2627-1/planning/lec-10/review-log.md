# Nhật ký soạn và rà soát Bài 10

Ngày: 2026-11-02. Phạm vi: hoàn thiện ghi chú Bài10, không tạo/sửa bộ trang chiếu, không triển khai các Bài11–14.

## Ủy quyền, tác tử và nguồn

Người dùng đã xác nhận “Dùng Codex toàn bộ”, thay yêu cầu Claude Opus5.5 cho nhiệm vụ này; tiếp tục xác nhận sử dụng textbook Murphy. Các công cụ collaboration.spawn_agent/followup_task được dùng cho ba tác tử, không gọi mô hình qua API/CLI. Các lời gọi không đặt model/effort override, kế thừa phiên Codex; công cụ không cung cấp bằng chứng tên mô hình runtime/effort cụ thể nên không khẳng định phiên bản thực chạy.

| Tác tử | Vai trò và phạm vi ghi | Đầu ra | Quyết định điều phối |
|---|---|---|---|
| probability_draft | Soạn Mục2–3 vào /tmp/lec10-sections-2-3.md; sau đó rà toán Mục4–5 và rà mạch/văn phong bản hợp nhất chỉ đọc | Kết quả10.8–17, Ví dụ10.3–6; báo cáo phát hiện | Yêu cầu sửa rồi chấp nhận: nhắc lại dữ kiện camera và sản phẩm trong từng ví dụ, thêm điều kiện/phạm vi, chuẩn hóa nguồn |
| moments_draft | Soạn Mục4–5 vào /tmp/lec10-sections-4-5.md, không ghi tệp chính | Kết quả10.18–27, Ví dụ10.7–10 | Yêu cầu sửa rồi chấp nhận: nhắc lại dữ kiện10.10, kiểm tra lại10.7–8, phân phần phát biểu, sửa Định nghĩa10.25 |
| sources_exercises | Soạn bài tập vào /tmp/lec10-exercises.md; rà toán độc lập, nguồn và độ bao phủ bản hợp nhất chỉ đọc | BT10.3–9; báo cáo số học và kiểm định cuối | Chấp nhận: đối chiếu W1.2–W1.4 trực tiếp, lời giải đúng, thời lượng đúng |
| Điều phối Codex | Đọc đầu ra, kiểm phép tính, bổ sung đầu/cuối chương và hình, hợp nhất, chạy kiểm tra | Markdown chính, SVG, bản đọc offline, tài liệu quy trình | Chấp nhận sau sửa thuật ngữ moment→mômen và bổ sung định nghĩa độc lập của biến ngẫu nhiên |

Kỹ năng /home/tqlong/.claude/skills/no-ai-slop/SKILL.md và eval.md được đọc. Tác tử soạn và điều phối dùng Edit; tác tử rà dùng Detect. Áp dụng văn phong giáo trình theo AGENTS: giữ “ta/chúng ta” ở câu tính toán/lập kế hoạch, lời khách quan trong phát biểu; giữ giả thiết, chứng minh và tổng kết có chức năng học tập. Bản cuối không có phát hiện còn mở về câu khoa trương, câu dẫn rỗng hoặc nhịp kết luận kịch tính. Đã sửa thuật ngữ không nhất quán và cách nhắc lại dữ kiện thiếu tự chứa.

Nguồn chính là Murphy (2022), Probabilistic Machine Learning: An Introduction. Đã xác minh trang sách tác giả https://probml.github.io/pml-book/book1.html và mục lục MITPress https://mitp-content-server.mit.edu/books/content/sectbyfn?collid=books_pres_0&fn=TOC.pdf&id=14260. Ánh xạ theo mục: Mục1→§2.1/2.2.1/2.2.3; Mục2→§2.2.3–2.2.4/2.3; Mục3→§2.2.1–2.2.2/2.4.1/2.5.1/2.6.1–2.6.2/3.2.1; Mục4→§2.2.5/2.8.1/3.1.1–3.1.3; Mục5→§2.2.3–2.2.4/2.3/3.1. Tuyến diễn giải từ quan sát đến điều kiện/Bayes, mô hình phân phối và mômen giữ cách tiếp cận xác suất của Murphy; đặt Bayes trước biến ngẫu nhiên hình thức để nối mục camera hiện có. Chứng minh và số liệu được viết/tính lại, không dịch hoặc chép hình sách.

Giới hạn nguồn: toàn văn PDF Murphy từ GitHub chính thức lỗi chuyển hướng URL ký hết hạn trong công cụ. Chỉ xác nhận đối chiếu cấu trúc/chủ đề/số mục với mục lục và kiểm độc lập toán học; không tuyên bố đã kiểm từng dòng chứng minh với toàn văn, không bịa trang hoặc số bài tập Murphy. Hai PDF sources/part2 được đọc trực tiếp bằng pdftotext; chỉ làm nguồn ví dụ/bài tập khởi đầu. Không tải nguồn MITOCW mới, không thêm tài sản bên thứ ba.

## Đối chiếu chất lượng theo năm góc nhìn

| Góc nhìn | Phát hiện, xử lý và kết quả |
|---|---|
| Sinh viên | Đủ tiên quyết, câu đọc công thức, ví dụ số và lời giải. CDF, mật độ, xác suất điểm và hậu nghiệm được phân biệt. Các ví dụ nhắc lại đủ dữ kiện sau sửa. Đạt kiểm tra nội dung; bố cục trình duyệt chưa kiểm được. |
| Chuyên gia | Đủ10.1–10.5; Gaussian nhiều chiều chỉ giới thiệu, chưa dạy MLE/hình học; minh bạch quan hệ với05c/11–14. Sáu mục tiêu gắn CLO2, không gán LLO giả. Murphy là nguồn chính, bài tập điều chỉnh được ghi rõ. |
| Toán học | Hai tác tử tính lại độc lập bảng8 ô, các hậu nghiệm, phương sai, chi phí và lời giải. Không có lỗi chặn/nghiêm trọng còn mở. Đã bổ sung định nghĩa độc lập của biến ngẫu nhiên trước khi dùng và sửa nhãn10.25. |
| Phản biện học thuật, giảng dạy | Nêu giới hạn chuẩn hóa không chứng minh phù hợp thực tế; độc lập không phải xung khắc; cov0 không đủ độc lập; điều kiện liên tục không chia cho xác suất điểm; hậu nghiệm không tự quyết định hành động; tương quan không chứng minh nhân quả. Bài tập có bốn dạng suy diễn/tính toán/AI/kiểm giả thiết. |
| Mạch lập luận | Camera→chuẩn hóa→Bayes→mô hình sản phẩm→biến ngẫu nhiên→mômen→phân phối đồng thời→lấy biên→ước lượng11. Sơ đồ nhu cầu/công cụ/đầu ra trong storyboard. Thêm hình cây để nối nhân dọc nhánh với cộng lấy biên. |

## Mục tiêu, kết quả và bài tập

| Mục tiêu | Kết quả/ví dụ | Bài tập |
|---|---|---|
| 1 Mô hình/tiên đề | 10.1–10.7, Ví dụ10.1–2 | 10.1–2 |
| 2 Điều kiện/Bayes/độc lập | 10.8–10.12, Ví dụ10.3–5 | 10.3,10.5,10.6 |
| 3 Biến/phân phối | 10.13–10.17, Ví dụ10.6 | 10.4,10.7 |
| 4 Mômen | 10.18–10.22, Ví dụ10.7–9 | 10.7–10.9 |
| 5 Biên/điều kiện/kỳ vọng toàn phần | 10.23–10.27, Ví dụ10.10 | 10.6,10.8 |
| 6 Giả thiết/giới hạn | 10.7,10.12,10.22,10.26–10.27 và5.4 | 10.2(d),10.5(c),10.6(d),10.8(d),10.9(d) |

Năm mục lý thuyết15+30+25+25+25=120 phút, ba bài trên lớp30 phút, tự học40+40+50+50=180 phút và đọc thêm khoảng120 phút. Độ dài khoảng17.500 đơn vị tách bằng khoảng trắng tiếng Việt; không áp số trang cứng. Giữ toàn bộ lý thuyết cần tự học, đánh dấu mở rộng ở phần giải thích; chứng minh giải tích/độ đo tổng quát không trình bày như đã được chứng minh bằng mô hình hữu hạn.

## Bằng chứng kiểm tra

- 27 số hiệu chung10.1–10.27, 10Ví dụ10.1–10.10, 9Bài tập10.1–10.9: liên tục, không trùng; có9hint và9solution.
- 53 nhãn công thức không trùng; tham chiếu công thức có đích.
- Khối ::: hợp lệ, không lồng; heading không chứa công thức, chỉ dùng phân cách $ và $$.
- KaTeX renderToString với throwOnError kiểm1.079 biểu thức: đạt, không lỗi hay cảnh báo ký tự sau khi chuyển lời tiếng Việt ra ngoài công thức.
- Viewer routing, từ chối số bài lệch, nguồn Markdown và LOCAL_MATERIALS bằng nhau: đạt.
- Script tools/courses/math-4-AI/2627-1/scripts/sync-local-materials.py và --check: đạt24 tài liệu. So với HEAD, chỉ payload lecture10 thay đổi; các bài khác giữ nguyên.
- Hình SVG phân tích XML hợp lệ; đường dẫn hình và2PDF có thật, tương đối từ viewer.
- git diff --check và git diff --cached --check: đạt. Phạm vi staging chỉ Markdown10, SVG10 và bundleoffline; không lấy các sửa viewer/index/CSS/README có trước, không lấy .DS_Store/._*.
- Chromium qua Playwright không khởi chạy được (TargetClosedError, sandbox cấm syscall). Không có kiểm tra màn rộng/hẹp/bàn phím hoặc screenshot, không tuyên bố đã rà trực quan. Đây là giới hạn kiểm định còn lại.

## Phiên bản

Nhánh main theo dõi origin/main. Trước commit nhiệm vụ đã có commit chưa đẩy fb37fa9 (chore: move tooling to shared workspace, split common/course CSS), ngoài phạm vi nhiệm vụ này. Không push main vì sẽ gửi kèm commit ngoài phạm vi; không tạo nhánh hoặc đổi lịch sử. Commit nhiệm vụ chỉ gồm3tệp được staging tường minh; hash ghi sau khi commit. Các tệp planning bị ignore và không ép theo dõi.

Commit cục bộ: `265e7ae` — `feat(materials): complete lecture 10 probability notes`. Chưa push vì commit có trước ngoài phạm vi nêu trên.

## Rà soát theo mẫu statistical-learning-theory và nguồn Murphy (2026-11-04)

Yêu cầu người dùng 2026-11-04: rà soát ghi chú theo nguyên tắc nội dung, văn phong, bố cục, cách diễn giải từng khối (chi tiết, nhất là chứng minh quan trọng), dùng nguồn Murphy; giữa phiên: "dùng mẫu trong statistical-learning-theory". Quyết định chung Q1–Q12: `planning/notes-10-14-slt-template.md`. Điều phối viên: Claude Opus 5.5 (`claude-opus-5-5`). Toàn văn Murphy I (2022) và Murphy II (2023) được tải từ bản PDF tác giả công bố ngày 2026-11-04 (SHA-256 trong tệp quyết định) và đọc trực tiếp; các ghi chú cũ "chỉ kiểm mục lục" được thay bằng đối chiếu toàn văn.

### Tác tử (ghi theo lời gọi công cụ Agent)

| Vai trò | Loại | Mô hình | Effort | Ghi tệp |
|---|---|---|---|---|
| Rà toán và nguồn Murphy | general-purpose | Opus 5.5 (opus) | high | không |
| Rà mẫu–văn phong–mạch truyện | general-purpose | Opus 5.5 (opus) | high | không |
| Người sửa (tái cấu trúc, bài tập) | general-purpose | Opus 5.5 (opus) | medium | có |

### Vòng rà soát 1 và quyết định của điều phối viên

Báo cáo đầy đủ lưu trong scratchpad phiên (`reviews/lec-10-math.md`, `reviews/lec-10-text.md`); bảng dưới tóm tắt phát hiện chặn bàn giao và nghiêm trọng, các phát hiện còn lại được chấp nhận theo nhóm.

| mức độ | vị trí | vấn đề | bằng chứng | quyết định |
|---|---|---|---|---|
| nghiêm trọng | d.1144–1184, Định nghĩa 10.25 | Lấy biên (chứng minh trọng tâm Q4) chỉ là định nghĩa, không có mệnh đề và chứng minh | Điều phối viên đọc lại d.1144–1170: (5.2) đặt trong khối definition | chấp nhận: thêm mệnh đề có chứng minh |
| nghiêm trọng | d.1–23 | Thiếu câu hỏi trung tâm và Câu hỏi mở đầu | Không có câu hỏi trung tâm của kế hoạch người dùng | chấp nhận |
| nghiêm trọng | d.59–509 | Camera và sản phẩm lỗi là hai mô hình rời nhau, chưa thành ví dụ xuyên suốt | d.509 | chấp nhận, chọn phương án giữ camera (yêu cầu cũ "Giữ Mục 1 hiện có"), nối hai mô hình cùng cấu trúc, dùng lại camera sau phần Bayes |
| nghiêm trọng | toàn bài | Trùng 05c.9–05c.38 nhưng chỉ dẫn 05c.8, 05c.11 | báo cáo mẫu–văn phong | chấp nhận: giữ chứng minh trọng tâm theo kế hoạch người dùng, thêm móc nối số hiệu 05c, thay phản ví dụ trùng |
| nghiêm trọng | 10.19, 10.22, 10.24 | Phát biểu cả trường hợp mật độ nhưng chỉ chứng minh rời rạc | báo cáo | chấp nhận: ghi độ sâu theo trường hợp hoặc chứng minh đủ |
| nghiêm trọng | d.1554–1557 | Liên kết tới `../sources/part2/*.pdf` (thư mục gitignore, liên kết hỏng khi công bố) | grep | chấp nhận |
| nghiêm trọng | mục 1.6, phần bài tập, phụ lục | Bài tập trong thân bài | Q2 | chấp nhận: chuyển sang `exercises.md` |
| nghiêm trọng | — | Thiếu mục Ý nghĩa, tác động và giới hạn với hai tình huống áp dụng | Q1 | chấp nhận |
| nghiêm trọng | Bài 11 | Bài 11 dẫn số hiệu Bài 10, sẽ đổi khi đánh lại số | grep lec-11 | chấp nhận: ánh xạ số hiệu, người sửa Bài 11 cập nhật |
| trung bình (11 + 27) | nhiều chỗ | Lập luận vòng P(∅)=0; quy tắc nhân sơ lược; tuyến tính chỉ cho Ω hữu hạn; kỳ vọng toàn phần dùng phân hoạch hữu hạn trên tổng đếm được; Var(X\|S) chưa định nghĩa; độc lập có điều kiện chưa chứng minh tương đương; E10.1(d) thiếu phản ví dụ; bốn số mục Murphy sai (§2.2.3→§2.1.3.4, §2.2.4→§2.1.3.5, §2.6.1→§2.2.2.1, §2.6.2→§2.2.2.2); tham chiếu tiến d.978, d.1015; văn phong, khối hình thức | điều phối viên kiểm §2.1.3.4 tại book1.txt d.2578 và §2.2.3 "Sets of related random variables" d.2758 | chấp nhận |

Số liệu: người rà toán chạy 102 phép kiểm bằng phân số, không sai số.

### Vòng sửa 1–2 (người sửa, Opus 5.5, effort medium) và tái kiểm

- Vòng sửa 1: tái cấu trúc theo Q1, tạo `exercises.md` (12 bài: 3 trên lớp, 6 tự học, 3 chọn từ Murphy I: Bài tập 2.9, 3.1, 3.2, số bài kiểm trong PDF), sửa mọi phát hiện chặn, nghiêm trọng, trung bình vòng 1. Ví dụ xuyên suốt theo quyết định: camera là ví dụ tính tay, hệ thống sản phẩm lỗi là ứng dụng AI; camera dùng lại ở Ví dụ 10.5. Ánh xạ số hiệu cũ → mới: scratchpad `reviews/map-lec-10.md` (chép vào cuối mục này khi commit).
- Tái kiểm toán vòng 2: 28/28 phát hiện cũ đã sửa; 149 phép kiểm số bằng phân số không sai; 40 lần dẫn Murphy và 25 số hiệu 05c đúng. Mới: 1 trung bình (dòng 765 gán cho 05c.19 nhiều hơn nội dung), 5 nhẹ → yêu cầu sửa.
- Tái kiểm văn phong vòng 2: N1 (Bài 11–14 dẫn số hiệu cũ của Bài 10) → chấp nhận, điều phối viên xử lý bằng bước ánh xạ chung trước khi commit; N2–N5 trung bình, N6–N18 nhẹ → yêu cầu sửa.
- Vòng sửa 2: đã sửa mọi mục trên, số hiệu không đổi.
- Lệch Murphy có chủ đích (Q11): Murphy I §2.2.2.2 định nghĩa mật độ là đạo hàm của hàm phân phối tích lũy; ghi chú định nghĩa mật độ qua tích phân $\mathbb P(a\le X\le b)=\int_a^bf_X$ (công thức (6.7)), vì cách này không đòi hỏi $F_X$ khả vi tại mọi điểm và khớp với cách dùng mật độ ở Bài 11–14; đẳng thức $f_X=F_X'$ được nêu tại các điểm $f_X$ liên tục.
- Tái kiểm vòng 3 (toán và văn phong, chỉ đọc, high): mọi mục vòng 2 đã sửa đúng; còn hai lỗi nhẹ (mục tiêu Bài tập 10.11; dẫn tiến ở dòng ~1349) → vòng sửa 3 đã sửa, điều phối viên kiểm lại bất đẳng thức $\mathbb E[X^2\mid S=s]\le\mathbb E[X^2]/\mathbb P(S=s)$. Kết luận điều phối viên: **chấp nhận** nội dung Bài 10; còn bước ánh xạ dẫn chéo ở Bài 11–14 trước khi commit.

### Rà nhất quán xuyên bài 10–14 và vòng sửa cuối

- Người rà xuyên bài (Opus 5.5, high, chỉ đọc): 0 chặn, 2 nghiêm trọng (ký hiệu $p_\theta$ ba nghĩa ở Bài 11–12; "rủi ro tổng thể" và "rủi ro kỳ vọng" cho cùng đại lượng), 12 trung bình, 13 nhẹ → chấp nhận tất cả; quyết định Q13–Q15 ghi trong `planning/notes-10-14-slt-template.md`.
- Vòng sửa cuối (năm người sửa song song): áp dụng Q13–Q15; Câu hỏi cuối buổi theo câu hỏi đánh giá §4 của kế hoạch người dùng, có lời giải dẫn số hiệu; lời mở nhận lại cầu nối của bài trước; mục Bài tập đồng dạng.
- Kiểm cuối xuyên bài: mọi phát hiện cũ đã sửa; 6 nhẹ mới → chấp nhận 1, 2, 4, 5, 6 (đã sửa); bác bỏ "chỉ một câu hỏi cuối buổi" vì mẫu SLT Bài 01 có "Câu hỏi phụ", và bác bỏ việc gộp tiểu mục 9.1–9.4 của Bài 12 vì không trái mẫu. Điều phối viên kiểm lại các số mới: $2/13<1/6<198/437$ (Bài 10), $V=32/13$ cho chính sách trộn (Bài 13).
- Kiểm tra kỹ thuật của điều phối viên: không ký tự điều khiển, không lệnh LaTeX mất dấu gạch chéo; forward_refs 0; khối `:::` cân bằng; `git diff --check` sạch; đồng bộ học liệu `--check` đạt; Playwright trên máy chủ tĩnh: 20 lượt (10 tệp × 1600×900 và 390×844) không lỗi console, không yêu cầu hỏng, không `.katex-error`, không tràn ngang trang; in PDF chứa nội dung các khối chứng minh (mở khi in); phím Enter mở được khối thu gọn. Hình ở màn hẹp cuộn ngang trong đoạn theo thiết kế của `material-viewer-course.css`.
- Phát hiện bố cục của điều phối viên: 402 công thức hiển thị tràn ở 390 px trên năm bài (quy tắc ngắt bằng `aligned` của `../CLAUDE.md`) → vòng bố cục giao người sửa từng bài.

### Vòng bố cục: công thức hiển thị ở 390 px

Điều phối viên đo bằng Playwright (390×844, mọi khối mở): 100+23 công thức hiển thị tràn khung trước vòng này (ghi chú + bài tập). Người sửa ngắt bằng `aligned`/`gathered`, căn cứ từng dòng chuyển xuống câu sau công thức; `\times` chỉ giữa thừa số vô hướng. Sau vòng: không công thức nào tràn quá 40 px, `katex-error` 0; số còn tràn ≤ 40 px chủ yếu do bề rộng nhãn `\tag`. Điều phối viên so mã TeX đã chuẩn hóa trước/sau (bỏ markup ngắt dòng) để xác nhận không đổi nội dung toán; các điều kiện chuyển khỏi công thức được kiểm còn nêu trong câu dẫn.

### Ánh xạ số hiệu cũ → mới

#### Mục `##`

| cũ | mới | tên |
|---|---|---|
| Mục tiêu học tập; Kiến thức tiên quyết; Cách đọc và phân bổ thời gian; Bảng ký hiệu | Câu hỏi mở đầu (mới); Mục tiêu học tập; Kiến thức tiên quyết; 1. Thiết lập bài toán (mới); 2. Ký hiệu và giả thiết; 3. Ví dụ xuyên suốt (mới) | mục "Cách đọc…" bị gỡ |
| Mục 1 | Mục 4 | Thí nghiệm ngẫu nhiên, biến cố và mô hình xác suất |
| Mục 2 | Mục 5 | Xác suất có điều kiện, độc lập và định lý Bayes |
| Mục 3 | Mục 6 | Biến ngẫu nhiên và phân phối xác suất |
| Mục 4 | Mục 7 | Kỳ vọng, phương sai và hàm của biến ngẫu nhiên |
| Mục 5 | Mục 8 | Phân phối đồng thời, lấy biên và suy luận |
| 5.4 + Tóm tắt chương | 9. Ý nghĩa, tác động và giới hạn | thêm Tình huống 10.1, 10.2 |
| Bài tập trên lớp / tự học / Phụ lục lời giải | 10. Bài tập (danh sách) → `exercises.md` | |
| — | 11. Câu hỏi cuối buổi và cầu nối | mới |
| Hướng dẫn đọc thêm | 12. Tài liệu đọc | |
| — | Phụ lục A (phân rã phương sai), B (trường hợp có mật độ), C (kỳ vọng, phương sai Gaussian) | mới |

#### Khối định nghĩa / kết quả / nhận xét / thuật toán

| cũ | mới | tên |
|---|---|---|
| Định nghĩa 10.1 | Định nghĩa 10.1 | Thí nghiệm ngẫu nhiên và không gian mẫu |
| Định nghĩa 10.2 | Định nghĩa 10.2 | Biến cố và các phép toán biến cố |
| Định nghĩa 10.3 | Định nghĩa 10.3 | Không gian xác suất |
| — | Bổ đề 10.4 | Tập rỗng, cộng tính hữu hạn và tính đơn điệu (mới) |
| Mệnh đề 10.4 | Mệnh đề 10.5 | Xây dựng mô hình xác suất hữu hạn |
| Mệnh đề 10.5 | Mệnh đề 10.6 | Phần bù và hợp hai biến cố ($\mathbb P(\varnothing)=0$ chuyển sang Bổ đề 10.4) |
| Hệ quả 10.6 | Hệ quả 10.7 | Bất đẳng thức hợp (union bound) |
| Nhận xét 10.7 | Nhận xét 10.8 | Giới hạn của mô hình hữu hạn |
| Định nghĩa 10.8 | Định nghĩa 10.9 | Xác suất có điều kiện |
| Mệnh đề 10.9 | Mệnh đề 10.10 | Quy tắc nhân |
| Định lý 10.10 | Định lý 10.11 | Xác suất toàn phần và Bayes |
| Định nghĩa 10.11 | Định nghĩa 10.12 | Độc lập (của biến cố) |
| Định nghĩa 10.12 (phần biến cố) | Định nghĩa 10.13 | Độc lập có điều kiện của biến cố |
| Định nghĩa 10.12 (phần biến rời rạc $U\perp V\mid W$) | Định nghĩa 10.16 (gạch thứ hai) | Độc lập và độc lập có điều kiện của biến ngẫu nhiên |
| Định nghĩa 10.13 (biến ngẫu nhiên, phân phối) | Định nghĩa 10.14 | Biến ngẫu nhiên và phân phối |
| Định nghĩa 10.13 (đoạn độc lập của hai biến) | Định nghĩa 10.16 (gạch thứ nhất) | Độc lập của biến ngẫu nhiên |
| Định nghĩa 10.14 | Định nghĩa 10.15 | Hàm khối xác suất và hàm phân phối tích lũy |
| — | Mệnh đề 10.17 | Dạng tương đương của độc lập có điều kiện (mới) |
| Định nghĩa 10.15 | Định nghĩa 10.18 | Phân phối có mật độ |
| Định nghĩa 10.16 | Định nghĩa 10.19 | Phân phối Bernoulli và phân phối phân loại |
| Định nghĩa 10.17 | Định nghĩa 10.20 | Phân phối Gaussian |
| Định nghĩa 10.18 | Định nghĩa 10.21 | Kỳ vọng |
| Mệnh đề 10.19 | Mệnh đề 10.22 | Kỳ vọng của hàm và tính tuyến tính |
| Mệnh đề 10.20 (phần định nghĩa) | Định nghĩa 10.23 | Phương sai và độ lệch chuẩn |
| Mệnh đề 10.20 (phần công thức) | Mệnh đề 10.24 | Công thức tính phương sai |
| Định nghĩa 10.21 | Định nghĩa 10.25 | Hiệp phương sai và hệ số tương quan |
| công thức (4.10) không số hiệu khối | Mệnh đề 10.26 | Phương sai của tổng (mới, dạng $n$ biến) |
| Mệnh đề 10.22 | Mệnh đề 10.27 | Độc lập kéo theo không tương quan |
| Định nghĩa 10.23 | Định nghĩa 10.28 | Kỳ vọng có điều kiện theo một biến rời rạc ($m(s)$ đổi thành $\psi(s)$) |
| Định lý 10.24 | Định lý 10.29 | Kỳ vọng toàn phần |
| công thức (4.13) không số hiệu khối | Mệnh đề 10.30 | Phân rã phương sai |
| Định nghĩa 10.25 (phần đồng thời) | Định nghĩa 10.31 | Phân phối đồng thời |
| Định nghĩa 10.25 (phần biên, (5.2)–(5.3)) | Mệnh đề 10.32 | Lấy biên (mới là mệnh đề có chứng minh) |
| Mệnh đề 10.26 | Mệnh đề 10.33 | Phân phối có điều kiện từ phân phối đồng thời |
| Mệnh đề 10.27 | Mệnh đề 10.34 | Phân tích nhân tử và lấy biên trên biến chưa quan sát |
| — | Thuật toán 10.35 | Suy luận bằng lấy biên và chuẩn hóa (mới) |

#### Ví dụ

| cũ | mới | tên |
|---|---|---|
| Ví dụ 10.1 | Ví dụ 10.1 | Hai lần tung đồng xu |
| Ví dụ 10.2 | Ví dụ 10.2 | Bảng tình huống của camera |
| Ví dụ 10.3 | Ví dụ 10.3 | Đọc lại cảnh báo của camera |
| Ví dụ 10.4 | Ví dụ 10.4 | Cập nhật xác suất sản phẩm lỗi |
| — | Ví dụ 10.5 | Kiểm tra độc lập trên bảng camera (mới) |
| Ví dụ 10.5 | Ví dụ 10.6 | Độc lập trong từng nhóm, phụ thuộc khi gộp |
| Ví dụ 10.6 | Ví dụ 10.7 | Biến ba giá trị và xác suất vượt ngưỡng |
| Ví dụ 10.7 | Ví dụ 10.8 | Chi phí kỳ vọng của một bộ cảnh báo |
| Ví dụ 10.8 | Ví dụ 10.9 | Kỳ vọng của một hàm phi tuyến |
| Ví dụ 10.9 ($X$ đều trên $\{-1,0,1\}$, $Z=X^2$; trùng 05c) | Ví dụ 10.10 | Độ lệch kích thước và nhãn lỗi (phản ví dụ mới) |
| số liệu phân rã phương sai trong văn xuôi | Ví dụ 10.11 | Phân rã phương sai của nhãn lỗi |
| Ví dụ 10.10 | Ví dụ 10.12 | Suy luận từ bảng phân phối đồng thời |
| — | Tình huống 10.1, 10.2 | Quyết định sau cảnh báo; Tỉ lệ lỗi thay đổi khi triển khai (mới) |

#### Bài tập (nay trong `exercises.md`)

| cũ | mới | tên |
|---|---|---|
| Bài tập 10.3 (camera, bảng trùng Ví dụ 10.3) | Bài tập 10.1 | Đọc điều kiện trên bảng camera (dữ liệu mới: 0,09; 0,01; 0,18; 0,72) |
| Bài tập 10.4 | Bài tập 10.2 | Mật độ đều và xác suất trên khoảng |
| Bài tập 10.5 | Bài tập 10.3 | Độc lập trước và sau khi quan sát (vòng 2: đổi từ $W=U\oplus V$ sang $W=U\cdot V$) |
| Bài tập 10.1 | Bài tập 10.4 | Không gian mẫu đều với hai xúc xắc |
| Bài tập 10.2 | Bài tập 10.5 | Xác suất lỗi của camera dưới quy trình lấy mẫu khác |
| Bài tập 10.6 (E10.1) | Bài tập 10.6 | Bayes trong kiểm định sản phẩm |
| Bài tập 10.7 (E10.2) | Bài tập 10.7 | Phân phối rời rạc ba giá trị |
| Bài tập 10.8 (E10.3) | Bài tập 10.8 | Phân phối đồng thời và lấy biên |
| Bài tập 10.9 (E10.4) | Bài tập 10.9 | Hiệp phương sai bằng không nhưng phụ thuộc |
| — | Bài tập 10.10 | Murphy I, Bài tập 2.9 (mới) |
| — | Bài tập 10.11 | Murphy I, Bài tập 3.1 (mới) |
| — | Bài tập 10.12 | Murphy I, Bài tập 3.2 (mới) |

#### Nhãn công thức

| cũ | mới | nội dung |
|---|---|---|
| (1.1) | (4.1) | $\Omega$ hai lần tung |
| (1.2) | (4.2) | $\Omega$ camera |
| (1.3) | (4.3) | các biến cố camera |
| (1.4) | (4.4) | (P3) cộng tính đếm được |
| (1.5) | (4.5) | tổng trọng số bằng 1 |
| (1.6) | (4.6) | $\mathbb P(E)=\sum_{\omega\in E}p(\omega)$ |
| (1.7) | (4.7) | mô hình đều |
| (1.8) | (4.8) | phần bù ($\mathbb P(\varnothing)=0$ sang Bổ đề 10.4, không nhãn) |
| (1.9) | (4.9) | hợp hai biến cố |
| (1.10) | (4.10) | bất đẳng thức hợp |
| (1.11) | (4.11) | biến cố phản hồi sai, nay ký hiệu $M$ (cũ $L$) |
| (2.1) | (5.1) | xác suất có điều kiện |
| (2.2) | Mệnh đề 10.10, phần 1 (không nhãn) | quy tắc nhân hai biến cố |
| (2.3) | (5.2) | quy tắc chuỗi ba biến cố |
| (2.4) | (5.3) | xác suất toàn phần |
| (2.5) | (5.4) | Bayes |
| — | (5.5) | dạng tỉ lệ $\propto$ (mới) |
| (2.6) | (5.6) | tham số nhà cung cấp; nay gồm cả độ nhạy và cảnh báo nhầm |
| (2.7) | (5.7) | $A\perp S\mid Y$ dạng biến cố |
| (2.8) | (5.8) | $\mathbb P(A=1)=0{,}0874$ |
| (2.9) | (5.9) | hậu nghiệm $198/437$ |
| (2.10) | (5.10) | độc lập |
| (2.11) | (5.11) | độc lập có điều kiện của biến cố |
| (2.12) | (6.5) | $U\perp V\mid W$ cho biến rời rạc |
| (3.1) | (6.1) | phân phối |
| (3.2) | (6.2) | PMF |
| (3.3) | (6.3) | CDF |
| — | (6.4) | độc lập của biến (mới) |
| — | (6.6) | dạng tương đương của độc lập có điều kiện (mới) |
| (3.4) | (6.7) | mật độ |
| (3.5) | (6.8) | CDF qua mật độ |
| (3.6) | (6.9) | Bernoulli |
| (3.7) | (6.10) | phân loại |
| (3.8) | (6.11) | Gaussian một chiều |
| (3.9) | (6.12) | Gaussian nhiều chiều |
| (4.1) | (7.1) | kỳ vọng rời rạc |
| (4.2) | (7.2) | kỳ vọng có mật độ |
| (4.3) | (7.3) | kỳ vọng của hàm, rời rạc |
| (4.4) | (7.4) | kỳ vọng của hàm, có mật độ |
| (4.5) | (7.5) | tính tuyến tính |
| (4.6) | (7.6) | định nghĩa phương sai |
| (4.7) | (7.7) | công thức phương sai |
| (4.8) | (7.8) | phương sai Bernoulli |
| (4.9) | (7.9) | hiệp phương sai (đẳng thức thứ hai nay ở đoạn sau định nghĩa) |
| — | (7.10) | hệ số tương quan (mới có nhãn) |
| (4.10) | (7.11) | phương sai của tổng, nay cho $n$ biến |
| (4.11) | (7.12) | kỳ vọng có điều kiện |
| (4.12) | (7.13) | kỳ vọng toàn phần |
| (4.13) | (7.14) | phân rã phương sai |
| (5.1) | (8.1) | PMF đồng thời |
| — | (8.2) | mật độ đồng thời (mới có nhãn) |
| (5.2) | (8.3) | lấy biên rời rạc |
| (5.3) | (8.4) | lấy biên có mật độ |
| (5.4) | (8.5) | PMF có điều kiện |
| (5.5) | (8.6) | mật độ có điều kiện |
| (5.6) | (5.6) | tham số mô hình sản phẩm (§8.3 dẫn lại (5.6), không nhãn riêng) |
| (5.7) | (8.7) | phân tích nhân tử |
| (5.8) | (8.8) | hậu nghiệm khi thiếu nguồn hàng |

#### Dẫn chiếu từ bài sau cần cập nhật (bản đã commit)

| tệp, dòng | cũ | mới |
|---|---|---|
| lec-11 d.18 | Định nghĩa 10.11 (độc lập) | Định nghĩa 10.12 |
| lec-11 d.18 | Định nghĩa 10.16 (Bernoulli, phân loại) | Định nghĩa 10.19 |
| lec-11 d.18, d.658 | Định nghĩa 10.17 (Gaussian) | Định nghĩa 10.20 |
| lec-11 d.19 | Định nghĩa 10.18 (kỳ vọng) | Định nghĩa 10.21 |
| lec-11 d.19 | Định nghĩa 10.21 (hiệp phương sai) | Định nghĩa 10.25 |
| lec-11 d.23 | Định lý 10.10 (toàn phần, Bayes) | Định lý 10.11 |
| lec-11 d.942 | "phản ví dụ của Bài 10" | Ví dụ 10.10 (độ lệch kích thước) hoặc Bài tập 10.9 |
| lec-13 d.19, d.99; lec-14 d.20, d.340, d.512 | dẫn bằng tên khái niệm, không số hiệu | không đổi (có thể thêm Định lý 10.11, Mệnh đề 10.32, Định nghĩa 10.13/10.16, Định lý 10.29, Định nghĩa 10.20) |
