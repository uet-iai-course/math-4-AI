# Nhật ký nghiệm thu Lecture Note 13

Ngày2026-11-03. Phạm vi: phầnA,E,G của kế hoạch người dùng, chỉ ghi chú Markdown, không tạo hoặc sửa slide. Người dùng yêu cầu tác tử Codex và cho phép commit, push; yêu cầu này thay quy định mô hình Claude trong AGENTS.md cho nhiệm vụ hiện tại. Bài tập được đặt trong cùng note theo kế hoạch, không tạo exercises.md riêng.

## Phân công và duyệt đầu ra

Root điều phối, kiểm nguồn và đọc toàn bộ bản thảo, tính lại số liệu, dựng hai hình, tích hợp và kiểm kỹ thuật. writer soạn13.1–13.3 rồi dừng do lỗi capacity. writer13_continue tiếp tục13.4 và phần cuối sau khi khả năng chạy tác tử được khôi phục. Không có hai tác tử cùng ghi note. math_review chỉ đọc kiểm toán; source_review chỉ đọc kiểm nguồn và bốn góc nhìn sinh viên/chuyên gia/giảng dạy/mạch truyện. Tác tử dùng cơ chế collaboration, kế thừa cấu hình Codex của phiên; công cụ không cung cấp bằng chứng runtime về tên mô hình con, không ghi tên suy đoán. Không gọi mô hình qua API/CLI hoặc đọc bí mật.

| Đầu ra | Quyết định của root | Căn cứ và xử lý |
|---|---|---|
| Inventory nguồn và số liệu đầu | Chấp nhận | Hai PDF bridge, mục lục MurphyII và nguồn bổ trợ local được kiểm; root tính lại bằng phân số |
|13.1–13.2|Chấp nhận sau sửa nhỏ|Đủ Markov có điều khiển cả thưởng; sửa phân tầng13.4 về cốt lõi, diễn đạt chính sách Markov phụ thuộc thời gian, không suy tối ưu từ ba chính sách cùng giá trị|
|13.3|Chấp nhận|Chứng minh co/Cauchy rồi đạt tối ưu và chặn mọi chính sách không vòng tròn; sửa rõ vòng tính toán không là thời điểm robot|
|13.4|Chấp nhận sau sửa nhỏ|MLE với mẫu tại cặp cố định; joint trajectory likelihood có policy factors; sửa ngoại lệ simplex một trạng thái khi không có dữ liệu và diễn đạt quỹ đạo không mặc nhiên i.i.d.|
|Phần cuối|Chấp nhận|Hai ứng dụng tự chứa, ba bài lớp và bốn homework giải được; chỉ số, số liệu và nguồn đúng|
|Rà toán cuối|Chấp nhận|math_review đọc toàn bài và xác minh hash cuối; không còn phát hiện bắt buộc|
|Rà nguồn/mạch/văn phong cuối|Chấp nhận|source_review xác nhận đủ13 thành phần, các sửa hoàn tất, Detect không còn phát hiện|
|Kiểm kỹ thuật|Chấp nhận kiểm tĩnh|829 công thức,73 khối, offline27 tài liệu và hồi quy đạt; giới hạn trình duyệt ghi dưới|

Markdown cuối1060 dòng, khoảng14.400 đơn vị tách bằng khoảng trắng tiếng Việt. Độ dài phục vụ tự học, chứng minh, lời giải và phần mở rộng; không áp số trang cứng. SHA-256 được hai tác tử và root xác minh: `b044be9ed79ab7c519ffd068db36414e8b13a3d3794e37a232057556c26a87b6`.

## Nguồn và vai trò

- Kế hoạch attachmenta25a4da1-9bba-448f-9320-b1976fa4e52d/pasted-text-1.txt là hợp đồng nội dung. Đề cương DOCX chính thức cung cấp CLO2,CLO4; không tạo mãLLO mới.
- Murphy (2023), Probabilistic Machine Learning: Advanced Topics là nguồn chính. Đã kiểm trang tác giả https://probml.github.io/pml-book/book2.html và mục lục nhà xuất bản https://mitp-content-server.mit.edu/books/content/sectbyfn/books_pres_0/14319/TOC_MurphyPMLv2.pdf. Ánh xạ:13.1→§2.6.1;13.2→§34.5.1/3/4;13.3→§34.5.5/34.6.1;13.4→§2.6.3/35.1.1/4/5/35.2.2/5; trạng thái quan sát một phần→§34.5.2.
- Liên kết toàn văn Murphy từ GitHub lỗi URL ký hết hạn; chỉ xác minh số mục với TOC, không tuyên bố đã đối chiếu từng dòng với toàn văn. Chứng minh và số liệu được kiểm độc lập; không gán số định lý hoặc số bài tập nguồn chưa kiểm.
- Sutton và Barto (2018), Reinforcement Learning: An Introduction, bản nháp tác giả local trong statistical-learning-theory/sources/supp/, §§3.1,3.3,3.5–3.6,4.1,4.4 được đọc bổ trợ. Không thay Murphy làm giáo trình chính, không chép hoặc công bố lại PDF.
- sources/part2/lecture_notes.pdf Tuần4,§8.1–8.4,trang in19–21 đã đọc trực tiếp: giữ ví dụ xích hai trạng thái tại13.1 và robot tại13.5. homework.pdf W4.1–W4.4 là nguồn E13.1–E13.4 điều chỉnh, ghi rõ nguồn và thay đổi thời lượng.
- Bài07,Định lý07.49 là nền Bellman tất định hữu hạn; Bài13 đổi cực tiểu chi phí sang cực đại thưởng, thêm kỳ vọng và chiết khấu vô hạn. Bài11,Định lý11.7 cung cấp categoricalMLE; Bài12 giúp tách giải đúng mô hình với học mô hình đúng.

## Năm góc nhìn

| Góc nhìn | Bằng chứng |
|---|---|
|Sinh viên|Sáu mục tiêu, tiên quyết, bảng22 ký hiệu; ví dụ và bài tự chứa; chứng minh chia bước và lời giải gập|
|Chuyên gia|Bốn mạch25/25/40/30=120 phút; ba bài lớp10+10+10=30 phút; homework40/60/45/35=180 phút; phần dư và phản ví dụ phân tầng mở rộng|
|Toán học|Markov khác độc lập; controlled kernel gồm thưởng; Bellman theo chính sách, co và tính tối ưu đủ chứng minh; chặn phần dư đúng chỉ số; MLE và target đúng giả thiết|
|Học thuật/giảng dạy|Phân biệt giá trị với thưởng, fixed point với optimality, vòng tính toán với quỹ đạo, mô hình thật với ước lượng, exact planning với stochastic learning; không tự suy hội tụ Q-learning/deepRL|
|Mạch truyện|Chuỗi xác suất→hành động→chính sách→giá trị→Bellman/co→tối ưu→học từ dữ liệu; nối07/11/12 và14, không lặp cả chương tối ưu hoặc xác suất|

no-ai-slop đã được writer và writer13_continue áp dụng chế độ Edit, tự đối chiếu eval.md theo ưu tiên văn phong học thuật; source_review dùng Detect chỉ đọc. Không còn câu hỏi tu từ, lời ca tụng hoặc câu dẫn rỗng cần sửa. Các phân biệt toán học và tổng kết có chức năng học tập được giữ.

## Mục tiêu và bằng chứng nghiệm thu

| Mục tiêu | Kết quả/ví dụ | Bài tập |
|---|---|---|
|1Markov và truyền phân phối|13.1–13.3,Ví dụ13.1–2|13.1,13.7,E13.1|
|2MDP/chính sách/tổng thưởng|13.4–13.8,Ví dụ13.3–4|13.2,E13.2|
|3Bellman tối ưu|13.9–13.12,Ví dụ13.5|13.3,13.8,E13.2|
|4Co/hội tụ/sai số|13.10–13.14,Ví dụ13.6–7|13.4,E13.2q4–6|
|5Học mô hình/target|13.15–13.18,Ví dụ13.8–9|13.5,13.9,E13.3|
|6Giới hạn giả thiết|13.14,13.18,Tình huống13.1–2|13.6,E13.4|

Hai ứng dụng: mười lần quan sát thuận lợi làm hàngMLE sai và chính sách kém trong môi trường thật; cảm biến nhị phân không đủ Markov, sửa bằng cặp trạng thái. Có đầy đủ mô hình, tính toán, kết luận và giới hạn. Ba dạng khó và bốn dạng kỹ năng của homework được ghi rõ. Lời giải đầy đủ của homework không đặt trong phần chính theo G.3;13exercise,13hint,9solution, trong đó chín bài củng cố/lớp đều có lời giải.

## Kiểm định kỹ thuật và số liệu

-18 số hiệu chung13.1–13.18,9ví dụ13.1–13.9,9bài13.1–13.9 liên tục;4homework riêng;26 nhãn công thức không trùng, tham chiếu có đích. Heading không công thức, chỉ dùng$/$$, không lồng khối.
- NodeVM dùng chính validateDirectives/protectMath/configureMarked của viewer:73 khối chuyển thànhHTML không còn::: thô.829 biểu thức KaTeXrenderToString với throwOnError và strict:error đạt.
- sync-local-materials.py và--check đạt27 tài liệu; bản ngoại tuyến bằng nguồn. So với HEAD chỉ thêm payload13, các payload cũ giữ nguyên. Kiểm hồi quy12(876 công thức),10(1079 công thức), routing05c/07/10/11/12/13 và từ chối số bài lệch đạt; JavaScript syntax đạt.
- HaiSVG tự tạo từ đúng mô hình robot, không dùng hình bên thứ ba. robot-mdp.svg là SVG gốc, value-iteration.svg dựng bằngMatplotlib. Đã xem PNG để sửa mũi tên và bố trí; XML hợp lệ, alt/title/desc có đủ. Kiểm hình không thay thế kiểm viewer trên trình duyệt.
- Root tính lại bằng phân số các vector chuyển, bảng robot, V^A20/11,V^B6,Vmix32/13,target5.2. BàiE13.2 cần39 vòng để sai số≤.1; hai tác tử rà mọi số liệu, gồm rare-event1/1024, policy loss46/11, hidden-state history value4/3 và cập nhậtQ^+=1.3.
- ChromiumPlaywright không khởi chạy được trong sandbox(TargetClosedError). Chưa có rà viewer trên màn rộng/hẹp, bàn phím hoặc in; không tuyên bố đã kiểm các mục này. Các kiểm tĩnh còn lại đã thực hiện.
- Root lưu trước viewerJS/HTML có thay đổi của người khác; sau khi bỏ đúng route13/cacheversion, nội dung bằng bản trước. Không sửa CSS. Staging sẽ chỉ lấy patch riêng của nhiệm vụ, không lấy TOCtoggle hoặc tệp .DS_Store/._*.

## Trạng thái phiên bản

Bản ghi chú và đóng gói đã hoàn tất, chờ ghi kết quả commit, push và đối chiếu upstream ở phần bổ sung bên dưới. Mục tiêu người dùng gồm push nên chưa đánh dấu hoàn thành trước khi có bằng chứng remote.

## Kết quả phiên bản

Commit cục bộ `46a7109` — `feat(materials): add lecture 13 sequential decision notes`, nhánhmain theo dõiorigin/main. Trước commit không có commit ngoài phạm vi chưa đẩy. Commit gồm9 tệp nhiệm vụ; không gồm chỉnh sửa TOCtoggle/CSS có trước hoặc .DS_Store/._*. Đã kiểm chính viewer được stage: routing13 và chuyển Markdown đạt, không lấy phần giao diện ngoài phạm vi.

`git push origin main` thất bại với lỗi `Could not resolve host: github.com`. Chưa có bằng chứng commit hiện diện trên upstream; không tuyên bố đã xuất bản lên GitHub Pages. Cần tiếp tục push chính nhánhmain và đối chiếu HEAD với upstream khi DNS/mạng hoạt động. Không đổi remote, lịch sử hoặc dùng bí mật/API để lách giới hạn môi trường.

Kiểm toán nội dung và đóng gói đã đạt đầy đủ phạm vi kế hoạch; bước push trong mục tiêu vẫn chưa hoàn thành. Mục tiêu thread chưa được đánh dấu hoàn tất vì chưa xác minh remote.

## Rà soát theo mẫu statistical-learning-theory và nguồn Murphy (2026-11-04)

Yêu cầu người dùng 2026-11-04: rà soát ghi chú theo nguyên tắc nội dung, văn phong, bố cục, cách diễn giải từng khối (chi tiết, nhất là chứng minh quan trọng), dùng nguồn Murphy; giữa phiên: "dùng mẫu trong statistical-learning-theory". Quyết định chung Q1–Q12: `planning/notes-10-14-slt-template.md`. Điều phối viên: Claude Opus 5.5 (`claude-opus-5-5`). Toàn văn Murphy I (2022) và Murphy II (2023) được tải từ bản PDF tác giả công bố ngày 2026-11-04 (SHA-256 trong tệp quyết định) và đọc trực tiếp; các ghi chú cũ "chỉ kiểm mục lục" được thay bằng đối chiếu toàn văn.

### Tác tử (ghi theo lời gọi công cụ Agent)

| Vai trò | Loại | Mô hình | Effort | Ghi tệp |
|---|---|---|---|---|
| Rà toán và nguồn Murphy | general-purpose | Opus 5.5 (opus) | high | không |
| Rà mẫu–văn phong–mạch truyện | general-purpose | Opus 5.5 (opus) | high | không |

### Vòng rà soát 1 và quyết định của điều phối viên

Báo cáo đầy đủ: scratchpad phiên `reviews/lec-13-math.md`, `reviews/lec-13-text.md`.

| mức độ | vị trí | vấn đề | bằng chứng | quyết định |
|---|---|---|---|---|
| nghiêm trọng | d.364–366, Định lý 13.8 Bước 1 | Phép dịch thời gian $\mathbb E[G_1\mid H_1]=V^\pi(S_1)$ và phép đổi kỳ vọng với tổng vô hạn bị nén vào một câu; Định lý 13.12 thừa hưởng | điều phối viên đọc d.364–374 | chấp nhận: bổ đề so sánh theo từng bước như bản nháp của báo cáo toán |
| nghiêm trọng | d.575, Định lý 13.12 Bước 3 | Bỏ phép tổng lồng và kỳ vọng toàn phần | báo cáo | chấp nhận |
| nghiêm trọng | d.471 | Ánh xạ co và điểm bất động chưa có khối định nghĩa; Banach chỉ nhắc tên | báo cáo | chấp nhận |
| nghiêm trọng | d.1–14 | Thiếu đoạn dẫn, Câu hỏi mở đầu, câu hỏi trung tâm | Q1 | chấp nhận |
| nghiêm trọng | d.26–36, 40, 1040–1054 | Vi phạm Q7, gồm đường dẫn sang kho khác | grep | chấp nhận |
| nghiêm trọng | bài tập | 13 khối bài tập trong thân bài; E13.1–E13.4 không có lời giải | báo cáo | chấp nhận |
| trung bình | nhiều chỗ | Bước 3–4 của 13.12; kỳ vọng có điều kiện với phần thưởng thực vượt khung Bài 10 (giả thiết phần thưởng hữu hạn giá trị); tính đầy đủ của $\mathbb R^{\lvert\mathcal S\rvert}$; Thuật toán 13.1 không trả chính sách, thiếu chặn $2\gamma\varepsilon/(1-\gamma)$; thiếu công thức xác suất quỹ đạo; khối hình thức theo Q3/Q4; ký hiệu trạng thái và hành động cùng tên $A,B$; "chính sách tham lam" chưa định nghĩa; dẫn Murphy §2.6.4.1, §34.5.5 | báo cáo | chấp nhận |

Số liệu: không sai số. Murphy chỉ nêu tính co mà không chứng minh; chứng minh của ghi chú được giữ và hoàn thiện.

Tác tử bổ sung: Người sửa (tái cấu trúc, bài tập, ánh xạ dẫn chéo) — general-purpose, Opus 5.5 (opus), medium, ghi tệp; Người rà nhất quán xuyên bài 10–14 — general-purpose, Opus 5.5 (opus), high, chỉ đọc.

### Vòng sửa và tái kiểm

- Vòng sửa 1: tái cấu trúc theo Q1, `exercises.md` 11 bài; Bổ đề 13.10–13.11 (kỳ vọng một bước, so sánh từng bước có tổng lồng và chặn đuôi) phục vụ Định lý 13.12 và 13.19; Định nghĩa 13.14 (ánh xạ co), Bổ đề 13.15, Định lý 13.17 (điểm bất động, Cauchy theo tọa độ); Nhận xét 13.20 (Định lý 07.49 là trường hợp riêng); Mệnh đề 13.22 (chặn $2\gamma\varepsilon/(1-\gamma)$); Thuật toán 13.23 theo mẫu SLT; ký hiệu trạng thái $h,n$ và $h,z$ tách khỏi hành động $A,B$; hai SVG đổi ký hiệu.
- Tái kiểm toán vòng 2: 26/26 phát hiện cũ đã sửa, mọi số đúng; 9 nhẹ → yêu cầu sửa. Tái kiểm văn phong vòng 2: 38/42 đã sửa, 4 một phần; mới 2 trung bình (bài tự học lặp ví dụ; bình luận nguồn trong thân bài) → yêu cầu sửa.
- Vòng sửa 2: dữ kiện mới cho 13.4–13.6; điều phối viên kiểm $V^*(h)=8$, $k=42$.
- Tái kiểm vòng 3: văn phong phát hiện **nghiêm trọng** — lời giải Bài tập 13.7(3) so hai thời điểm khác nhau nên chỉ cho thấy không thuần nhất, không vi phạm (4.1); người rà toán xác nhận độc lập (mức trung bình). Chấp nhận. Vòng sửa 3: ví dụ chu trình pin chu kỳ 3 với pha đều; điều phối viên kiểm tại $t=1$: $\mathbb P(S_2=n\mid S_0=h,S_1=h)=1$, $\mathbb P(S_2=n\mid S_0=n,S_1=h)=0$, $\mathbb P(S_2=n\mid S_1=h)=1/2$. Đổi hằng số $d\to\delta$ trong Bổ đề 13.15.
- Ánh xạ dẫn chéo sang Bài 10–12: điều phối viên đối chiếu bằng script (9/9 đúng).

### Rà nhất quán xuyên bài 10–14 và vòng sửa cuối

- Người rà xuyên bài (Opus 5.5, high, chỉ đọc): 0 chặn, 2 nghiêm trọng (ký hiệu $p_\theta$ ba nghĩa ở Bài 11–12; "rủi ro tổng thể" và "rủi ro kỳ vọng" cho cùng đại lượng), 12 trung bình, 13 nhẹ → chấp nhận tất cả; quyết định Q13–Q15 ghi trong `planning/notes-10-14-slt-template.md`.
- Vòng sửa cuối (năm người sửa song song): áp dụng Q13–Q15; Câu hỏi cuối buổi theo câu hỏi đánh giá §4 của kế hoạch người dùng, có lời giải dẫn số hiệu; lời mở nhận lại cầu nối của bài trước; mục Bài tập đồng dạng.
- Kiểm cuối xuyên bài: mọi phát hiện cũ đã sửa; 6 nhẹ mới → chấp nhận 1, 2, 4, 5, 6 (đã sửa); bác bỏ "chỉ một câu hỏi cuối buổi" vì mẫu SLT Bài 01 có "Câu hỏi phụ", và bác bỏ việc gộp tiểu mục 9.1–9.4 của Bài 12 vì không trái mẫu. Điều phối viên kiểm lại các số mới: $2/13<1/6<198/437$ (Bài 10), $V=32/13$ cho chính sách trộn (Bài 13).
- Kiểm tra kỹ thuật của điều phối viên: không ký tự điều khiển, không lệnh LaTeX mất dấu gạch chéo; forward_refs 0; khối `:::` cân bằng; `git diff --check` sạch; đồng bộ học liệu `--check` đạt; Playwright trên máy chủ tĩnh: 20 lượt (10 tệp × 1600×900 và 390×844) không lỗi console, không yêu cầu hỏng, không `.katex-error`, không tràn ngang trang; in PDF chứa nội dung các khối chứng minh (mở khi in); phím Enter mở được khối thu gọn. Hình ở màn hẹp cuộn ngang trong đoạn theo thiết kế của `material-viewer-course.css`.
- Phát hiện bố cục của điều phối viên: 402 công thức hiển thị tràn ở 390 px trên năm bài (quy tắc ngắt bằng `aligned` của `../CLAUDE.md`) → vòng bố cục giao người sửa từng bài.

### Vòng bố cục: công thức hiển thị ở 390 px

Điều phối viên đo bằng Playwright (390×844, mọi khối mở): 74+15 công thức hiển thị tràn khung trước vòng này (ghi chú + bài tập). Người sửa ngắt bằng `aligned`/`gathered`, căn cứ từng dòng chuyển xuống câu sau công thức; `\times` chỉ giữa thừa số vô hướng. Sau vòng: không công thức nào tràn quá 40 px, `katex-error` 0; số còn tràn ≤ 40 px chủ yếu do bề rộng nhãn `\tag`. Điều phối viên so mã TeX đã chuẩn hóa trước/sau (bỏ markup ngắt dòng) để xác nhận không đổi nội dung toán; các điều kiện chuyển khỏi công thức được kiểm còn nêu trong câu dẫn.

### Ánh xạ số hiệu cũ → mới

#### Nhãn công thức

| cũ | mới | nội dung |
|---|---|---|
| (13.1) | (4.1) | tính Markov |
| (13.2) | (4.2) | ma trận chuyển |
| (13.3) | (4.3) | $\mu_t=\mu_0P^t$ |
| — | (4.4) | xác suất quỹ đạo |
| (13.4) | (5.2) | $P(s'\mid s,a)$, $r(s,a)$ (mô hình chung (5.1) mới) |
| (13.5) | (5.3) | $P^\pi$, $r^\pi$ |
| (13.6) | (5.4) | $G_t$ |
| (13.7) | (5.5) | $V^*=\sup_\rho V^\rho$ |
| (13.8) | (5.6) | chặn giá trị và phần đuôi |
| (13.10) | (5.7) | $Q_U(s,a)$ |
| (13.11), phần $T^\pi$ | (5.8), (5.9) | $T^\pi$ |
| — | (5.10), (5.11) | bổ đề một bước, điều kiện so sánh |
| (13.9) | (5.12) | Bellman cho chính sách dừng |
| (13.11), phần $T$ | (6.1) | $T$ |
| — | (6.2) | chính sách tham lam |
| (13.12) | (6.3) | hai cực đại |
| (13.13) | (6.4) | tính co |
| — | (6.5), (6.6) | điểm bất động, dãy Cauchy |
| (13.14) | (6.7) | tốc độ lặp giá trị |
| (13.15) | (6.2) | $\pi^*$ tham lam (gộp vào định nghĩa) |
| (13.16) | (6.8) | Bellman tối ưu |
| (13.17) | (6.9) | truy hồi robot |
| (13.18) | (6.10) | chặn phần dư |
| — | (6.11) | chặn chính sách tham lam |
| (13.19) | (7.1) | số đếm |
| (13.20) | (7.2) | $\hat r$ |
| (13.21) | (7.3) | MLE hàng chuyển |
| (13.22) | (7.4) | $\hat Q_V$ |
| (13.23) | (A.1) | xác suất quỹ đạo trạng thái–hành động (Phụ lục A) |
| (13.24) | (7.5) | mục tiêu từ mẫu $Y_t$ |
| (13.25) | (7.6) | cập nhật Q-learning |
| (13.26) | bỏ nhãn | hai xác suất có điều kiện của Tình huống 13.2 |

### Bàn giao

Kết luận điều phối viên: **chấp nhận**. Mọi phát hiện chặn bàn giao và nghiêm trọng đã được giải quyết và kiểm lại. Commit `b20e756` (`fix(materials): Bài 10–14 rà soát theo mẫu statistical-learning-theory và nguồn Murphy`) đã push lên `origin/main` và được xác nhận bằng `git fetch` và `git branch -r --contains HEAD`.

### Kiểm định cuối độc lập trên commit 2caee87

Người kiểm định cuối mới (general-purpose, Opus 5.5 (opus), high, chỉ đọc), kiểm bản đã commit theo tám mục: cấu trúc Q1, chứng minh trọng tâm Q4, khối hình thức, tính lại số bằng phân số, dẫn Murphy trong toàn văn, dẫn chéo, văn phong (no-ai-slop Detect), định nghĩa trước khi dùng. Kết quả: 102 phép kiểm số, 0 sai; 31 chỗ dẫn Murphy, 0 sai; 37 dẫn chéo, 0 sai; chứng minh trọng tâm đạt; hai hình khớp số. 0 chặn, 0 nghiêm trọng, 1 trung bình (thiếu 'Trong học máy' sau Định lý 13.19), 14 nhẹ. Quyết định: chấp nhận mọi phát hiện trung bình và nhẹ → vòng sửa sau kiểm định.

### Vòng sửa sau kiểm định cuối và tái kiểm

Người sửa của bài xử lý mọi phát hiện trung bình và nhẹ của kiểm định cuối; chính người kiểm định đó tái kiểm diff so với HEAD `9edae80`/`2caee87`: không còn phát hiện từ mức trung bình trở lên sau vòng sửa nhỏ cuối. Điều phối viên tự kiểm các số mới (Bài 12: hạng thiếu $w_0+w_1=7/3$, tổng bình phương sai số $14/3$; Bài 11: hậu nghiệm Beta $2/3$; Bài 13: giao điểm $v=8/9$ trên hình) và chạy lại: forward_refs 0, khối `:::` cân bằng, không ký tự điều khiển, SVG hợp lệ, `git diff --check` sạch, đồng bộ `--check` đạt, Playwright 20 lượt (10 tệp × 2 khổ) không lỗi, không công thức tràn quá 40 px ở 390 px. Kết luận: **chấp nhận**.

- Sửa nhỏ sau tái kiểm vòng 3 trên `e3fcaae` (cả năm bài không còn phát hiện từ mức trung bình trở lên): dấu phẩy ở Bước 1 Mệnh đề 13.2; $\alpha,\beta,\gamma$ thay $a,b,c$ ở câu nhắc tính tuyến tính của Bài 11 (dòng 50). Diff một cụm chữ, điều phối viên đọc lại.


## Rà nhẹ theo quy tắc 2026-11-09 và làm lại tệp bài tập từ giáo trình (2026-11-12)

Yêu cầu của người dùng: "rà math-4-AI 10–14 và rl-plan 01–10: chỉ cần một lượt nhẹ, gồm rà theo quy tắc 09/11 và làm lại exercises.md từ giáo trình", rồi "chỉ làm lecture note và exercise" (không sửa deck).

**Tác tử** (lấy từ lời gọi công cụ): mọi vai là `Agent`, `subagent_type: general-purpose`, `model: opus` (Claude Opus 5.5), `effort: high`.
- Người rà chỉ đọc (`no-ai-slop` Detect), sau đó cũng tác tử đó làm biên tập viên (`no-ai-slop` Edit), tiếp tục bằng `SendMessage` để giữ ngữ cảnh.
- Người kiểm tra độc lập chỉ đọc (tác tử mới): đối chiếu đề với PDF, giải lại mọi bài trước khi đọc lời giải, rà các hunk đã đổi của ghi chú; sau đó kiểm lại phần đã sửa.

**Rà ghi chú:** 36 phát hiện (0 chặn bàn giao, 0 nghiêm trọng, 11 trung bình, 25 nhẹ): mã CLO (L37), "Đáp số" (L53), câu "chưa phải định nghĩa" (L153, L339, L770, L1276), câu "chưa nói/chưa xét/chưa cho biết" (L380, L761, L1005), rào đón không có số hoặc điều kiện (L496, L1076). Điều phối viên chấp nhận: cả 36 (bỏ mã CLO theo Q-C/Q7 của mẫu SLT; "Đáp số" thành "Lời giải").

**Nguồn bài tập:** Murphy (2022, 2023) không có bài về xích Markov hay quá trình quyết định Markov (tập II không có bài tập), nên dùng Sutton và Barto (2018), ấn bản 2 (PDF, SHA-256 2dd0d71d…), sách ghi chú đã dẫn; đề đối chiếu với trang PDF (trang in = trang PDF − 22). Mười một bài 13.4–13.14: SB 3.9, 3.4, 3.11, 3.25–3.28 (gộp), 3.14, 3.29, 3.23, 3.15, 4.10, 3.22 (thêm các vòng lặp giá trị trên dữ kiện sách), 3.24. Ba bài tự dựng cũ (13.1, 13.10, 13.3) chuyển về ghi chú thành Bài tập 13.1 (cuối §4), 13.2 (cuối §6.4), 13.3 (cuối §7) vì kiểm mục tiêu không có bài sách; tám bài tự dựng còn lại bị bỏ.

**Kiểm tra độc lập:** 0 chặn bàn giao, 1 nghiêm trọng (L486: vế "có thể không đạt tại chính sách nào" mâu thuẫn Định lý 13.19), 3 trung bình (L1451 gán "hàng chuyển" cho học không dựa trên mô hình; 13.6 thiếu phân phối đầu và câu nối sang Bổ đề 13.10; 13.12(b), (c) là chứng minh tự thêm, không phải phép tính trên dữ kiện SB 4.10, nên bị bỏ), 6 nhẹ; không lời giải sai; giải lại $V^*=(180/19;\,162/19;\,200/19)$ và $24{,}419$. Điều phối viên chấp nhận mọi phát hiện; biên tập viên sửa; kiểm lại: đạt, không phát hiện mới. Mục tiêu 6 còn dựa vào Bài tập 13.3 của ghi chú.

### Cũ → mới

| Cũ (`exercises.md` trước lượt này) | Mới | Vị trí mới | Ghi chú |
|---|---|---|---|
| 13.1 Truyền phân phối hai bước | 13.1 | ghi chú, cuối §4 (sau Nhận xét 13.4) | tự dựng, giữ vì mục tiêu 1 không có bài giáo trình; gộp hai gợi ý thành một |
| 13.2 Lặp giá trị và điểm bất động | bỏ | — | mục tiêu 5 có SB 3.22, 3.24 |
| 13.3 Mục tiêu theo mô hình và mục tiêu từ một mẫu | 13.3 | ghi chú, cuối §7 (sau Nhận xét 13.29) | tự dựng, giữ cho mục tiêu 6 |
| 13.4 Xích Markov, xác suất quỹ đạo | bỏ | — | trùng số liệu Ví dụ 13.2–13.3 |
| 13.5 Lặp giá trị cho robot | bỏ | — | |
| 13.6 Học mô hình và mục tiêu Bellman | bỏ | — | |
| 13.7 Giả thiết và bảo đảm | bỏ | — | |
| 13.8 Giá trị của chính sách dừng | bỏ | — | |
| 13.9 Hai hành động cùng tối ưu | bỏ | — | |
| 13.10 Tính co và phần dư Bellman | 13.2 | ghi chú, cuối §6.4 (sau Ví dụ 13.7) | tự dựng, giữ cho mục tiêu 4 |
| 13.11 Kiểm tra một khẳng định hội tụ | bỏ | — | |
| (mới) | 13.4 | `exercises.md` | SB Bài 3.9, §3.3, tr. 56 |
| (mới) | 13.5 | `exercises.md` | SB Bài 3.4, §3.1, tr. 53 |
| (mới) | 13.6 | `exercises.md` | SB Bài 3.11, §3.5, tr. 58 |
| (mới) | 13.7 | `exercises.md` | SB Bài 3.25–3.28, §3.6, tr. 67 |
| (mới) | 13.8 | `exercises.md` | SB Bài 3.14, §3.5, tr. 60 |
| (mới) | 13.9 | `exercises.md` | SB Bài 3.29, §3.6, tr. 67 |
| (mới) | 13.10 | `exercises.md` | SB Bài 3.23, §3.6, tr. 67 |
| (mới) | 13.11 | `exercises.md` | SB Bài 3.15, §3.5, tr. 61 |
| (mới) | 13.12 | `exercises.md` | SB Bài 4.10, §4.4, tr. 84; chỉ giữ câu của sách (bỏ hai câu phụ tự thêm theo phát hiện của người kiểm), nên chỉ phủ mục tiêu 4 |
| (mới) | 13.13 | `exercises.md` | SB Bài 3.22, §3.6, tr. 66 (thêm câu (b): ba vòng lặp giá trị trên dữ kiện sách) |
| (mới) | 13.14 | `exercises.md` | SB Bài 3.24, §3.6, tr. 67 |

SB = Sutton và Barto (2018), ấn bản 2. Trang in = trang PDF − 22; số, dấu và ký hiệu đã đối chiếu trên PDF các trang in 52–53, 56, 58, 60–61, 65–67, 84.

### Mục tiêu không có bài giáo trình (ghi nhật ký, không ghi vào tệp)

- Mục tiêu 1: chỉ có Bài tập 13.1 trong ghi chú.
- Mục tiêu 4, vế tính co: Bài tập 13.2 trong ghi chú (sau vòng sửa được đặt ở cuối §6.4, sau Ví dụ 13.7, theo phát hiện của người kiểm).
- Mục tiêu 6: chỉ có Bài tập 13.3 trong ghi chú; tệp bài tập không có bài cho mục tiêu này sau khi bỏ 13.12(c).

### Dẫn chiếu đã cập nhật trong phạm vi

- `math-4-AI/2627-1/materials/lec-13/lecture-note.md` §9 Bài tập: viết lại theo số mới, kèm câu liên kết tới tệp bài tập.
- `math-4-AI/2627-1/materials/lec-13/exercises.md`: viết lại toàn bộ; bảng mục tiêu ↔ bài tập ở đoạn mở.

### Dẫn chiếu ngoài phạm vi còn dùng số cũ

- `math-4-AI/2627-1/planning/lec-13/outline.md` dòng 48–58: liệt kê Bài tập 13.1–13.11 với tên cũ.
- `math-4-AI/2627-1/planning/lec-13/review-log.md` dòng 112: "Bài tập 13.7(3)" (bản ghi lịch sử).
- `math-4-AI/2627-1/material-local-data.js`: bản chép của hai tệp Markdown, cần chạy script đồng bộ.
- Deck: repo không có deck Bài 13. Tệp ghi chú, bài tập của bài khác không dẫn `Bài tập 13.k`; `lec-14/lecture-note.md` chỉ dẫn Tình huống 13.2 và Định lý 13.19 (không đổi).

**Số liệu:** ghi chú 17 303 âm tiết (`wc -w`); `git diff --check` sạch; `forward_refs.py` báo 0; mỗi `exercise` có đúng một `hint` và một `solution` (ghi chú 3, cộng một khối gợi ý của câu hỏi ôn nhanh; tệp 11).

**Kiểm tra trình duyệt (điều phối viên):** cổng 8791, 1600×900 và 390×844: 0 `.katex-error`, 0 `:::` sót, 0 lỗi console (trừ CSP của reloadserver), 0 request lỗi, không tràn ngang trang. Tệp bài tập: 0 công thức tràn khung ở 390 px. Ghi chú: 17 công thức có sẵn từ trước tràn khung ở 390 px (ngoài lượt nhẹ, quy tắc D3). Bài 13 không có deck. `material-local-data.js` đồng bộ trong một commit riêng sau khi cả năm bài 10–14 xong.

Quyết định của điều phối viên: **chấp nhận**; commit `fix(materials): Bài 13 rà theo quy tắc 2026-11-09, làm lại bài tập từ giáo trình`.
