# Nhật ký rà soát Bài 11

## Phạm vi và điều phối

Ngày 2026-11-02. Người dùng yêu cầu chỉ soạn Lecture Note11 theo kế hoạch đính kèm và sau đó chỉ định “sử dụng toàn bộ Codex thay thế”. Chỉ định này thay các yêu cầu mô hình Claude trong AGENTS.md cho nhiệm vụ hiện tại. Không tạo hoặc sửa slide. Bài tập đặt trong cùng lecture-note.md theo yêu cầu người dùng; không tạo exercises.md riêng. Bổ sung SVG tự tạo, bản ngoại tuyến và liên kết học liệu để đọc ghi chú.

Tác tử gốc điều phối và duyệt; writer soạn và tự biên tập; math_review rà toán độc lập; source_review kiểm nguồn, phạm vi và bốn góc nhìn sư phạm. Các tác tử được tạo qua collaboration.spawn_agent, kế thừa mô hình và mức suy luận của phiên Codex; công cụ không cung cấp bằng chứng runtime về tên mô hình con, không ghi tên mô hình suy đoán. Không dùng API/CLI hay bí mật. Mỗi thời điểm chỉ writer chỉnh nội dung note; root tích hợp sau khi writer kết thúc lượt ghi.

## Nguồn

- Kế hoạch người dùng phầnA,C,G là hợp đồng nội dung. Mục tiêu cụ thể hóa CLO2 trong đề cương DOCX chính thức, không gán mã LLO mới.
- Murphy (2022), Probabilistic Machine Learning: An Introduction là nguồn học thuật chính. Đã kiểm trang tác giả https://probml.github.io/pml-book/book1.html và mục lục nhà xuất bản https://mitp-content-server.mit.edu/books/content/sectbyfn?collid=books_pres_0&fn=TOC.pdf&id=14260. Ánh xạ:11.1→§4.1,4.2.1–2,4.3;11.2→§4.2.3;11.3→§4.2.4;11.4→§4.2.5;11.5→§4.2.6,3.2.1–2; mở rộng→§4.6.2,6.2.1/4/5; đọc thêm→§4.7.1–4. Không giả số bài tập hay trang chưa kiểm.
- Giới hạn nguồn: toàn văn PDF Murphy từ liên kết GitHub chính thức lỗi chuyển hướng URL ký hết hạn/cache miss; tải shell lỗi DNS. Đã kiểm chủ đề và số mục qua mục lục, không tuyên bố đối chiếu từng dòng với toàn văn. Chứng minh và số liệu được kiểm độc lập.
- Đã đọc trực tiếp sources/part2/lecture_notes.pdf §6.1–6.5, trang in10–14 và homework.pdf W2.1–4 trang1 bằng pdftotext. Bốn ví dụ nguồn giữ tại Ví dụ11.3/5/7/9. E11.1–3 giữ dữ kiện; E11.4 đổi hình vuông thành dữ liệu tương quan, ghi rõ điều chỉnh.
- SVG gaussian-geometry.svg được tự dựng từ mean(10,20), S=[[2.5,1.5],[1.5,2.5]], eigenvalues4/1; không lấy hình bên thứ ba, không tải thêm MIT OCW.

## Quyết định duyệt

| Đầu ra | Quyết định của root | Căn cứ và xử lý |
|---|---|---|
| Kiểm nguồn ban đầu source_review | Chấp nhận | Hai PDF được đọc trực tiếp; mapping W2.1–4 và CLO2 kiểm lại; bổ sung TOC nhà xuất bản2022 |
| Kiểm số liệu ban đầu math_review | Chấp nhận | Root tính lại covariance, inverse, eigenvalues, Mahalanobis, ratio Bernoulli bằng số hữu tỉ |
| Bản thảo writer | Yêu cầu sửa | Hai ví dụ/tình huống thiếu dữ kiện tại chỗ;2 biểu thức KaTeX có chữ Việt; heading chứa math; vài thuật ngữ và dẫn nguồn chưa cụ thể |
| Lượt sửa writer | Chấp nhận | Nhắc đủ dữ liệu; đổi S không chệch thành S_{n-1}; heading thuần chữ;4ví dụ gốc; dẫn mục chính xác |
| Rà toán cuối math_review | Chấp nhận | Đọc toàn bộ1167dòng; chứng minh,10ví dụ,2tình huống,9bài củng cố/lớp và tính giải được của4homework đạt; không còn phát hiện bắt buộc |
| Rà nguồn/mạch/văn phong cuối source_review | Chấp nhận | Xác nhận đủ13 thành phần kế hoạch, tất cả sửa trung bình/nhẹ hoàn tất, no-ai-slop Detect không còn phát hiện |
| Kiểm kỹ thuật của root | Chấp nhận kiểm tĩnh |791công thức strictKaTeX,72khối, ảnh/nhãn/routing/offline và kiểm hồi quy Lecture10 đạt; giới hạn trình duyệt ghi dưới |

## Năm góc nhìn và bằng chứng

| Góc nhìn | Kết quả |
|---|---|
| Sinh viên | Tiên quyết và bảng21ký hiệu;6mục tiêu có6bài củng cố; ví dụ tự chứa, chứng minh chia bước, gợi ý/lời giải gập |
| Chuyên gia | Đủ5mục core15/25/20/25/35=120phút; Bayes và KL tách mở rộng; không lấn PAC/VC hoặc bài hướng dẫn thuật toán |
| Toán học | Bernoulli biên; categorical Lagrange và mặt biên; Gaussian cực đại toàn cục và không tồn tại khi suy biến; hiệu chỉnh không chệch không cần Gaussian; geometry/KL đúng |
| Phản biện học thuật và giảng dạy | Phân biệt density/likelihood/posterior, iid/phụ thuộc, MLE/không chệch, eigenvalue/bán trục, điểm lệch/xác suất bất thường; có trường hợp giả thiết hạng vi phạm |
| Mạch lập luận | Probability10→tham số chưa biết→likelihood→MLE→covariance→geometry→giới hạn trên dữ liệu mới12; không dạy lại Bayes, Lagrange hay tối ưu hồi quy |

## Đối chiếu mục tiêu

| Mục tiêu | Kết quả/ví dụ | Bài kiểm tra |
|---|---|---|
|1Mô hình/mẫu/likelihood|11.1–3,Ví dụ11.1|11.1,E11.1|
|2Bernoulli|Định lý11.4,Nhận xét11.5,Ví dụ11.2–3|11.2,11.7,E11.1|
|3Phân loại|11.6–8,Ví dụ11.4–5|11.3,11.8,E11.2|
|4Gaussian1D/không chệch|11.9–11,Ví dụ11.6–7|11.4,E11.3|
|5Covariance/geometry|11.12–17,Ví dụ11.8–10|11.5,11.9,E11.4|
|6Mất mát/giới hạnAI|11.3,11.13,11.16,Tình huống11.1–2|11.6,E11.1–4|

## Kiểm định sản phẩm cuối

Tệp Markdown1167dòng, khoảng13.093đơn vị tách bằng khoảng trắng tiếng Việt. Độ dài phục vụ việc tự học và các chứng minh; không áp số trang cứng.17số hiệu chung11.1–17,10ví dụ11.1–10,9bài tập11.1–9 liên tục;4homework E11.1–4 riêng.22nhãn công thức không trùng, tham chiếu có đích.13exercise,13hint,9solution: lời giải homework không đặt trong phần chính theo kế hoạch người dùng;9bài củng cố/lớp có đủ lời giải.

- Node VM dùng chính bộ đọc hiện hành: validateDirectives, protectMath, configureMarked;72khối chuyển thành HTML, không còn ::: thô;791biểu thức renderToString với throwOnError và strict:error đạt.
- Tuyến11không cần slide; từ chối đường ngoài phạm vi và số bài lệch. Kiểm hồi quy tuyến05c/07/10 và1.079biểu thức của Lecture10 đạt.
- sync-local-materials.py và --check đạt25tài liệu. So với HEAD chỉ thêm payload11; mọi payload cũ giữ nguyên. Bundle bằng nguồn Markdown hiện tại.
- JavaScript syntax checks đạt; SVG XML hợp lệ;3đường đồng mức được kiểm số theo Mahalanobis (sai số tọa độ làm tròn dưới0.00015). SVG đã raster hóa bằng ImageMagick và xem ảnh để sửa vị trí đường ellipse; kiểm hình này không thay thế kiểm viewer trên trình duyệt.
- Đường hình, heading, phân cách công thức và nhãn được kiểm; index chỉ liên kết tài liệu tồn tại. Không đổi CSS; giữ toàn bộ sửa viewerCSS/HTML/JS có trước, chỉ thêm route11 và cache version vào phần liên quan.
- Chromium qua Playwright không khởi chạy được (TargetClosedError); môi trường cũng chặn tạo socket máy chủ. Chưa kiểm viewer trên màn rộng/hẹp, điều hướng bàn phím hoặc in. Không có tuyên bố đã rà trình duyệt.
- git diff --check đạt. Chỉ staging các đường nhiệm vụ; hai file viewer có thay đổi trước được staging bằng patch riêng, không lấy phần thay đổi của người khác.

SHA-256 Markdown cuối: da49381d782ab114b79d9d32ac6c5c83b135209ef113f58d88e0bb26daf3b9c4.

## Phiên bản và giới hạn bàn giao

Commit cục bộ `9b5b9c8` — `feat(materials): complete lecture 11 statistical estimation notes`, nhánh main theo dõi origin/main. Trước commit, origin/main..HEAD rỗng nên không có commit ngoài phạm vi bị gửi kèm. Commit gồm8tệp nhiệm vụ, không gồm sửa giao diện có trước hoặc tệp .DS_Store/._*. Đã kiểm lại chính viewer từ HEAD bằng NodeVM: routing11 và chuyển khối nội dung đạt, không đưa toggle có trước vào commit.

Lệnh push origin main thất bại: `Could not resolve host: github.com`. Chưa có bằng chứng commit hiện diện upstream; bản ghi chú hoàn chỉnh và commit chỉ có cục bộ. Không tuyên bố đã xuất bản lên GitHub Pages. Không sửa lịch sử hay tạo nhánh để xử lý lỗi mạng. Có thể push lại nhánh main khi DNS/mạng hoạt động.

Kiểm toán nghiệm thu: nội dung đáp ứng13 thành phần của kế hoạch; đủ5mục cốt lõi và thời lượng, chứng minh/các trường hợp biên,10ví dụ+2tình huống, hình học/cảm biến, bài tập lớp30phút và4homework180phút, phân mức/nguồn/giới hạn, kết nối bài trước/sau. Không sửa slide. Mục tiêu biên soạn ghi chú hoàn tất; chưa xác minh hiển thị viewer trên trình duyệt và chưa xuất bản từ xa do giới hạn môi trường đã nêu.

## Đổi tiêu đề theo yêu cầu người dùng

Đã đổi tiêu đề thành “Học từ dữ liệu qua ước lượng thống kê” trong heading nguồn, chỉ mục, dàn ý và bản ngoại tuyến. writer thực thi; root duyệt diff xác nhận chỉ đổi chuỗi tiêu đề. Đồng bộ --check và diff --check đạt. Commit dcc672c (fix(materials): shorten lecture 11 title). Hash Markdown ở lần nghiệm thu trên là hash trước đổi tiêu đề; nội dung thân bài giữ nguyên.

## Rà soát theo mẫu statistical-learning-theory và nguồn Murphy (2026-11-04)

Yêu cầu người dùng 2026-11-04: rà soát ghi chú theo nguyên tắc nội dung, văn phong, bố cục, cách diễn giải từng khối (chi tiết, nhất là chứng minh quan trọng), dùng nguồn Murphy; giữa phiên: "dùng mẫu trong statistical-learning-theory". Quyết định chung Q1–Q12: `planning/notes-10-14-slt-template.md`. Điều phối viên: Claude Opus 5.5 (`claude-opus-5-5`). Toàn văn Murphy I (2022) và Murphy II (2023) được tải từ bản PDF tác giả công bố ngày 2026-11-04 (SHA-256 trong tệp quyết định) và đọc trực tiếp; các ghi chú cũ "chỉ kiểm mục lục" được thay bằng đối chiếu toàn văn.

### Tác tử (ghi theo lời gọi công cụ Agent)

| Vai trò | Loại | Mô hình | Effort | Ghi tệp |
|---|---|---|---|---|
| Rà toán và nguồn Murphy | general-purpose | Opus 5.5 (opus) | high | không |
| Rà mẫu–văn phong–mạch truyện | general-purpose | Opus 5.5 (opus) | high | không |

### Vòng rà soát 1 và quyết định của điều phối viên

Báo cáo đầy đủ: scratchpad phiên `reviews/lec-11-math.md`, `reviews/lec-11-text.md`.

| mức độ | vị trí | vấn đề | bằng chứng | quyết định |
|---|---|---|---|---|
| chặn bàn giao | toàn bài | Thiếu đoạn dẫn, Câu hỏi mở đầu, Thiết lập bài toán, Ví dụ xuyên suốt, Câu hỏi cuối buổi, Phụ lục; mục đánh số `## 11.k` | Q1 | chấp nhận |
| chặn bàn giao | d.1039–1144 | 13 bài tập trong ghi chú; E11.1–E11.4 không có lời giải | điều phối viên đọc d.1089–1100: chỉ có đề và gợi ý | chấp nhận |
| chặn bàn giao | d.25–40, tiêu đề bài tập, d.1089, 1148–1167 | Thời lượng, đường dẫn nội bộ, câu rào đón, câu quy trình kiểm nguồn | Q7 | chấp nhận |
| nghiêm trọng | d.349, Định lý 11.7 Bước 2 | Chưa nối điểm dừng của hàm Lagrange với cực đại trên mặt ràng buộc | điều phối viên đọc d.340–356 | chấp nhận |
| nghiêm trọng | Ví dụ 11.2, 11.4, 11.6 | Giải sẵn E11.1–E11.3 | báo cáo | chấp nhận |
| nghiêm trọng | Định nghĩa 11.6, 11.12 | Định nghĩa lại phân phối đã có ở 10.16, 10.17 | báo cáo | chấp nhận: đổi thành nhắc lại hoặc định nghĩa mô hình thống kê |
| nghiêm trọng | khối hình thức, chứng minh | Thiếu độ sâu chứng minh, Lộ trình, câu ý nghĩa; bỏ bước ở 11.9, 11.13, 11.16 | Q3, Q4 | chấp nhận |
| nghiêm trọng | mở đầu | Không có câu hỏi trung tâm; kết luận thứ hai của kế hoạch chỉ ở Bài tập 11.6, mà Bài 12 dẫn bài này | báo cáo | chấp nhận: đưa vào thân bài, cập nhật dẫn chéo ở Bài 12 |
| trung bình | nhiều chỗ | Chứng minh 11.11, 11.13, 11.14, 11.16 thiếu bước; chưa định nghĩa Cov(X) và độc lập của n biến; độ chệch ở Murphy §4.7.6.1 chứ không phải §4.2.5; không dẫn 05c.33–05c.35; E11.4 trùng Ví dụ 11.8, 11.10 | điều phối viên kiểm §4.7.6.1 tại book1.txt d.9778 | chấp nhận |

Số liệu: không sai số.

Tác tử bổ sung: Người sửa (tái cấu trúc, bài tập, ánh xạ dẫn chéo) — general-purpose, Opus 5.5 (opus), medium, ghi tệp; Người rà nhất quán xuyên bài 10–14 — general-purpose, Opus 5.5 (opus), high, chỉ đọc.

### Vòng sửa và tái kiểm

- Vòng sửa 1 (song song với các bài khác theo cho phép của người dùng): tái cấu trúc theo Q1, tạo `exercises.md` (8 bài: 3 trên lớp, 5 tự học, E11.1–E11.4 có lời giải đầy đủ), thêm Định nghĩa 11.12 (ma trận hiệp phương sai), độc lập của n biến trong Định nghĩa 11.1, kết luận thứ hai của kế hoạch người dùng thành Ví dụ 11.6 trong thân bài, độ chệch dẫn Murphy (2022) §4.7.6.1, phần đại số MLE hiệp phương sai sang Phụ lục A.
- Tái kiểm toán vòng 2: 23/23 phát hiện cũ đã sửa; 5 nhẹ mới → yêu cầu sửa. Tái kiểm văn phong vòng 2: 29/33 đã sửa, 4 một phần; mới 3 trung bình (câu dẫn ví dụ, bài tập trùng tình huống/ví dụ, dẫn "Bài tập 11.6" ở Bài 12), 9 nhẹ → yêu cầu sửa (mục Bài 12 giao người sửa Bài 12).
- Vòng sửa 2: sửa mọi mục; ánh xạ dẫn chéo sang Bài 10 theo `map-lec-10.md`; điều phối viên đối chiếu từng dẫn với tiêu đề khối đích bằng script (10/10 đúng).
- Tái kiểm vòng 3: toán — mọi số mới đúng, 3 nhẹ; văn phong — không phát hiện mới, M-12 (số bài Murphy 4.1, 4.7, 4.8) điều phối viên kiểm trong book1.txt dòng 10037, 10164, 10175 → đóng.

### Rà nhất quán xuyên bài 10–14 và vòng sửa cuối

- Người rà xuyên bài (Opus 5.5, high, chỉ đọc): 0 chặn, 2 nghiêm trọng (ký hiệu $p_\theta$ ba nghĩa ở Bài 11–12; "rủi ro tổng thể" và "rủi ro kỳ vọng" cho cùng đại lượng), 12 trung bình, 13 nhẹ → chấp nhận tất cả; quyết định Q13–Q15 ghi trong `planning/notes-10-14-slt-template.md`.
- Vòng sửa cuối (năm người sửa song song): áp dụng Q13–Q15; Câu hỏi cuối buổi theo câu hỏi đánh giá §4 của kế hoạch người dùng, có lời giải dẫn số hiệu; lời mở nhận lại cầu nối của bài trước; mục Bài tập đồng dạng.
- Kiểm cuối xuyên bài: mọi phát hiện cũ đã sửa; 6 nhẹ mới → chấp nhận 1, 2, 4, 5, 6 (đã sửa); bác bỏ "chỉ một câu hỏi cuối buổi" vì mẫu SLT Bài 01 có "Câu hỏi phụ", và bác bỏ việc gộp tiểu mục 9.1–9.4 của Bài 12 vì không trái mẫu. Điều phối viên kiểm lại các số mới: $2/13<1/6<198/437$ (Bài 10), $V=32/13$ cho chính sách trộn (Bài 13).
- Kiểm tra kỹ thuật của điều phối viên: không ký tự điều khiển, không lệnh LaTeX mất dấu gạch chéo; forward_refs 0; khối `:::` cân bằng; `git diff --check` sạch; đồng bộ học liệu `--check` đạt; Playwright trên máy chủ tĩnh: 20 lượt (10 tệp × 1600×900 và 390×844) không lỗi console, không yêu cầu hỏng, không `.katex-error`, không tràn ngang trang; in PDF chứa nội dung các khối chứng minh (mở khi in); phím Enter mở được khối thu gọn. Hình ở màn hẹp cuộn ngang trong đoạn theo thiết kế của `material-viewer-course.css`.
- Phát hiện bố cục của điều phối viên: 402 công thức hiển thị tràn ở 390 px trên năm bài (quy tắc ngắt bằng `aligned` của `../CLAUDE.md`) → vòng bố cục giao người sửa từng bài.

### Vòng bố cục: công thức hiển thị ở 390 px

Điều phối viên đo bằng Playwright (390×844, mọi khối mở): 58+19 công thức hiển thị tràn khung trước vòng này (ghi chú + bài tập). Người sửa ngắt bằng `aligned`/`gathered`, căn cứ từng dòng chuyển xuống câu sau công thức; `\times` chỉ giữa thừa số vô hướng. Sau vòng: không công thức nào tràn quá 40 px, `katex-error` 0; số còn tràn ≤ 40 px chủ yếu do bề rộng nhãn `\tag`. Điều phối viên so mã TeX đã chuẩn hóa trước/sau (bỏ markup ngắt dòng) để xác nhận không đổi nội dung toán; các điều kiện chuyển khỏi công thức được kiểm còn nêu trong câu dẫn.

### Ánh xạ số hiệu cũ → mới

#### Khối định nghĩa, kết quả, nhận xét

| số hiệu cũ | số hiệu mới | tên (mới) |
|---|---|---|
| Định nghĩa 11.1 | Định nghĩa 11.1 | Mô hình thống kê tham số, mẫu ngẫu nhiên và bộ ước lượng (thêm định nghĩa độc lập của $n$ biến/vector) |
| Định nghĩa 11.2 | Định nghĩa 11.2 | Hàm hợp lý và ước lượng hợp lý cực đại |
| Mệnh đề 11.3 | Mệnh đề 11.3 | Hợp lý cực đại và tối thiểu hóa rủi ro thực nghiệm |
| Định lý 11.4 | Định lý 11.4 | Ước lượng Bernoulli, kể cả nghiệm biên |
| Nhận xét 11.5 | Nhận xét 11.5 | Miền tham số mở và số đếm bằng không |
| Định nghĩa 11.6 | Định nghĩa 11.6 | Đơn hình xác suất và hàm hợp lý phân loại (không định nghĩa lại Cat; nhắc Định nghĩa 10.16) |
| Định lý 11.7 | Định lý 11.7 | Ước lượng phân loại |
| Nhận xét 11.8 | Nhận xét 11.8 | Nhóm không xuất hiện trong mẫu |
| Định lý 11.9 | Định lý 11.9 | Ước lượng Gaussian một chiều |
| Định nghĩa 11.10 | Định nghĩa 11.10 | Độ chệch và tính không chệch |
| Mệnh đề 11.11 | Mệnh đề 11.11 | Hiệu chỉnh phương sai mẫu |
| — (mới) | Định nghĩa 11.12 | Vector kỳ vọng và ma trận hiệp phương sai |
| Định nghĩa 11.12 | Định nghĩa 11.13 | Trung bình mẫu và hiệp phương sai mẫu (bỏ phần mật độ Gaussian; nhắc (3.9) của Định nghĩa 10.17) |
| Định lý 11.13 | Định lý 11.14 | Ước lượng Gaussian nhiều chiều và điều kiện tồn tại |
| Hệ quả 11.14 | Hệ quả 11.15 | Hiệp phương sai mẫu không chệch |
| Định nghĩa 11.15 | Định nghĩa 11.16 | Khoảng cách Mahalanobis |
| Mệnh đề 11.16 | Mệnh đề 11.17 | Hướng và độ dài của đường đồng mức Gaussian |
| Nhận xét 11.17 | Nhận xét 11.18 | Giới hạn của cách đọc hình học |
| Tình huống 11.1 | Tình huống 11.1 | Chấm điểm lệch cho quan sát cảm biến hai chiều |
| Tình huống 11.2 | Tình huống 11.2 | Hai đặc trưng trùng thông tin |

#### Ví dụ

| số hiệu cũ | số hiệu mới | tên (mới) |
|---|---|---|
| Ví dụ 11.1 | Ví dụ 11.1 | Sáu cờ cảnh báo dưới hai cơ chế lấy mẫu (nội dung đổi: tính xác suất của chuỗi dưới hai cơ chế) |
| — (mới) | Ví dụ 11.2 | So sánh hai giá trị tham số trên sáu cờ cảnh báo |
| Ví dụ 11.2 (9/12) | bỏ | dữ liệu chỉ còn ở Bài tập 11.4 |
| Ví dụ 11.3 | Ví dụ 11.3 | Mười cờ cảnh báo |
| Ví dụ 11.4 ((3,5,12)) | bỏ | dữ liệu chỉ còn ở Bài tập 11.5 |
| Ví dụ 11.5 ((2,3,5)) | Ví dụ 11.4 | Ba chế độ tải trong mười bản ghi |
| Ví dụ 11.6 ((1,1,2,4)) | bỏ | dữ liệu chỉ còn ở Bài tập 11.6 |
| Ví dụ 11.7, phần MLE | Ví dụ 11.5 | Năm độ lệch nhiệt độ |
| Bài tập 11.6 | Ví dụ 11.6 | Nhiễu Gaussian và nhiễu Laplace trên cùng dữ liệu (kết luận thứ hai của kế hoạch người dùng, trong thân bài) |
| Ví dụ 11.7, phần $n-1$ | Ví dụ 11.7 | Hai mẫu số trên năm độ lệch nhiệt độ |
| Ví dụ 11.8 | Ví dụ 11.8 + Ví dụ 11.9 | 11.8: Hiệp phương sai mẫu của dữ liệu cảm biến nền; 11.9: Gaussian đã khớp cho dữ liệu cảm biến nền |
| Ví dụ 11.9 | Ví dụ 11.10 | Bốn điểm hai chiều với phương sai khác nhau |
| Ví dụ 11.10 | Ví dụ 11.11 | Hai quan sát mới của dây chuyền |

#### Bài tập (nay trong exercises.md)

| số hiệu cũ | số hiệu mới | tên (mới) |
|---|---|---|
| Bài tập 11.7 | Bài tập 11.1 | Nghiệm trong và nghiệm biên của mô hình Bernoulli |
| Bài tập 11.8 | Bài tập 11.2 | Nhân tử Lagrange trên một mặt của đơn hình (gộp ý so sánh tỉ số hợp lý của Bài tập 11.3 cũ) |
| Bài tập 11.9 | Bài tập 11.3 | Hình học Gaussian theo hướng riêng |
| E11.1 | Bài tập 11.4 | Hợp lý Bernoulli, nghiệm biên và cơ chế lấy mẫu |
| E11.2 | Bài tập 11.5 | Ước lượng phân loại và entropy chéo |
| E11.3 | Bài tập 11.6 | Phương sai hợp lý cực đại và phương sai không chệch |
| E11.4 | Bài tập 11.7 | Ma trận hiệp phương sai, đường đồng mức và dữ liệu suy biến (dữ liệu mới) |
| — (mới) | Bài tập 11.8 | Mất mát từ mô hình nhiễu có phương sai khác nhau |
| Bài tập 11.1 | bỏ, gộp | vào Bài tập 11.4(d) |
| Bài tập 11.2 | bỏ, gộp | vào Bài tập 11.1(b), 11.4(c) |
| Bài tập 11.3 | bỏ, gộp | vào Bài tập 11.2 |
| Bài tập 11.4 | bỏ, gộp | vào Bài tập 11.6 |
| Bài tập 11.5 | bỏ, gộp | vào Tình huống 11.2 (dạng đặc trưng trùng thông tin); Bài tập 11.7(e) nay xét $n\le d$ |
| Bài tập 11.6 | Ví dụ 11.6 | xem bảng Ví dụ |

#### Nhãn công thức

| cũ | mới | nội dung |
|---|---|---|
| (11.1) | (4.1) | hàm hợp lý, log-hợp lý |
| (11.2) | (4.2) | tập argmax |
| (11.3) | (4.3) | tương đương với rủi ro thực nghiệm |
| (11.4) | (5.1) | hợp lý Bernoulli |
| (11.5) | (5.2) | $\hat p=s/n$ |
| (11.6) | (5.3) | trung bình hậu nghiệm Beta |
| (11.7) | (6.1) | hợp lý phân loại |
| (11.8) | (6.2) | $\hat\pi_k=n_k/n$ |
| (11.9) | (6.3) | entropy chéo = $H(q)$ + KL |
| (11.10) | (7.1) | log-hợp lý Gaussian một chiều |
| (11.11) | (7.2) | $\hat\mu=\bar x$, $\hat\sigma^2=Q/n$ |
| (11.12) | (7.3) | đẳng thức tách tổng bình phương |
| (11.13) | (7.4) | $\mathbb E[Q_X]=(n-1)\sigma^2$ |
| (11.14) | bỏ nhãn | mật độ Gaussian nhiều chiều, nay nhắc lại (3.9) của Bài 10 |
| — | (8.1) | $\operatorname{Cov}(X)$ |
| — | (8.2) | $\operatorname{Var}(w^\top X)=w^\top\operatorname{Cov}(X)w$ |
| (11.15) | (8.3) | $S_n$ |
| (11.16) | (8.4) | $w^\top S_nw\ge0$ |
| (11.17) | (8.5) | log-hợp lý Gaussian nhiều chiều |
| (11.18) | (8.6) | $\hat\mu=\bar x$, $\hat\Sigma=S_n$ |
| (11.19) | bỏ nhãn | $S_4$ của ví dụ cảm biến |
| (11.20) | (8.7) | $\mathbb E[S_n]$, $S_{n-1}$ |
| (11.21) | (8.8) | khoảng cách Mahalanobis |
| (11.22) | (8.9) | $d_\Sigma^2=\sum_jz_j^2/\lambda_j$ |

#### Dẫn chiếu từ Bài 12 (bản HEAD) cần cập nhật

| dòng Bài 12 | dẫn cũ | dẫn mới |
|---|---|---|
| 19 | Mệnh đề 11.3, Định lý 11.9, Định lý 11.4 | không đổi |
| 89 | Định nghĩa 11.2 | không đổi |
| 103, 448 | Mệnh đề 11.3 | không đổi |
| 136 | "như Bài tập 11.6" | "như Ví dụ 11.6" (nội dung: nhiễu Laplace cho tổng trị tuyệt đối, nay trong thân Bài 11) |
| 209 | Định lý 11.9 | không đổi |

Vòng 2 (2026-11-04): không đổi số hiệu nào của Bài 11.

### Bàn giao

Kết luận điều phối viên: **chấp nhận**. Mọi phát hiện chặn bàn giao và nghiêm trọng đã được giải quyết và kiểm lại. Commit `b20e756` (`fix(materials): Bài 10–14 rà soát theo mẫu statistical-learning-theory và nguồn Murphy`) đã push lên `origin/main` và được xác nhận bằng `git fetch` và `git branch -r --contains HEAD`.
