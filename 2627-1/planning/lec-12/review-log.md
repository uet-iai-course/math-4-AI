# Nhật ký biên soạn và nghiệm thu Lecture Note 12

Ngày2026-11-03. Phạm vi: kế hoạch người dùng phầnA,D,G, chỉ ghi chú Markdown, không tạo/sửa slide. Người dùng yêu cầu Codexagents, commit&push, bổ sung: lý thuyết VC chỉ làm trên một chiều để minh họa độ phức tạp lớp giả thuyết. Chỉ định Codex thay yêu cầu Claude trong AGENTS.md cho nhiệm vụ này.

## Phân công và quyết định của điều phối viên

Root điều phối, kiểm nguồn, đọc toàn bộ bản thảo, tính lại số liệu, tạo2hình khoa học, duyệt đầu ra và tích hợp. writer thực thi duy nhất note. math_review chỉ đọc kiểm toán; source_review chỉ đọc kiểm nguồn và4góc nhìn sinh viên/chuyên gia/học thuật-giảng dạy/mạch truyện. Dùng collaboration.followup_task trên các tác tử Codex đã tạo; mô hình và suy luận kế thừa, công cụ không cung cấp bằng chứng runtime về modelname nên không ghi tên model suy đoán. Không dùng CLI/API mô hình hoặc bí mật. Root tích hợp sau khi writer ngừng ghi.

| Đầu ra | Quyết định | Xử lý và bằng chứng |
|---|---|---|
|Inventory nguồn source_review|Chấp nhận|HaiPDFbridge đã đọc trực tiếp; UMLfullPDF local đã đọc; nguồnMurphy xác minhTOC|
|Snapshot12.1–3 writer|Yêu cầu sửa nhẹ/trung bình|NhiễuGaussian có điều kiện phải giữ đầyđủ phân phối; nguồnBernoulliCE không dẫnlinearregression; BT12.3 cần nhắc đủ dữ kiện; kerA diễn đạt rõ|
|Snapshot12.4 writer|Chấp nhận toán, yêu cầu sửa trình bày|Uniformconstants/PAC/VC1D/decomposition đúng; Ví dụ12.10 cần chép hai lớp; bỏEnglishunderbrace; finite-risk assumption ởdefinitionDelta|
|Tình huống12.1|Yêu cầu sửa|Lớp giàu phải chứa mọi hàm đo được, gồm ngưỡng thật và hàm ghi nhớ; nêuinfR=RBayes=0 để tách khỏi sai số xấp xỉ|
|Bản cuối writer|Chấp nhận|Tất cả sửa trên hoàn tất, tự biên tập no-ai-slop Edit/eval theo ưu tiên văn phong học thuật|
|math_review cuối|Chấp nhận|Rà toàn1082dòng,20formal,10ví dụ,2apps,9bài củng cố/lớp và tính giải được4homework; không còn lỗi bắt buộc|
|source_review cuối|Chấp nhận|Đủ13thành phần, nguồn/mạch/VC1D đúng; no-ai-slop Detect không còn phát hiện|
|Kỹ thuật root|Chấp nhận kiểm tĩnh|876KaTeXstrict,77blocks,source/offline,routing,index,SVG và hồi quy10/11 đạt; giới hạn trình duyệt ghi dưới|

SHA-256 bản cuối đã được cả2reviewer vàroot kiểm: `7d55a6434a12ba10eda1d537c1c1f2cc2a82dabb71884e873172165c6224f044`.

## Nguồn và quyền sử dụng

- Kế hoạch attachmenteeccd251-3e5f-4452-b0af-c631574630ab/pasted-text-1.txt và chỉ đạo VC1D của người dùng là hợp đồng phạm vi.
- Đề cương DOCX chính thức trong sources/: mục tiêu cụ thể hóa CLO2,CLO4, không tự tạo mãLLO.
- Murphy2022, Probabilistic Machine Learning: An Introduction: trang tác giả https://probml.github.io/pml-book/book1.html vàTOC nhà xuất bản https://mitp-content-server.mit.edu/books/content/sectbyfn?collid=books_pres_0&fn=TOC.pdf&id=14260 được kiểm. 12.1→§4.2.7/11.2.2;12.2→§4.2.3/4.3/10.2.3;12.3→§5.1/5.4.1;12.4→§5.4.4. Toàn vănGitHub lỗi chuyển hướng URL ký hết hạn, shellDNSlỗi; không nhận đã đối chiếu từng dòng với toàn vănMurphy.
- Shalev-Shwartz&Ben-David2014, Understanding Machine Learning: From Theory to Algorithms, PDFcó thật ởstatistical-learning-theory/sources/uml/: đã đọc trực tiếp§§3.1–3.2,4.1–4.2,5.2,6.1–6.5. Thm6.8§6.4 xác nhậnsharpUC samplecomplexity C(d+log1/delta)/epsilon²; proofCh28 ngoài phạmvi. Không gánboundstrong choThm6.11weakMarkov. Không sao chép/commit/re-publishPDF hoặc lời giải của sách.
- sources/part2/lecture_notes.pdf §7.1–7.4,trangin15–18: giữ4vdở12.1/4/7/10; homework.pdf W3.1–4,trangin2: E12.1–4điều chỉnh rõnguồn, không gánsốbàiMurphy/UML giả.
- Bài11Mệnhđề11.3/Địnhlý11.9: nềnlikelihood;Bài05cMệnhđề05c.7/Địnhlý05c.47/52: unionbound/Hoeffding, không chứngminh lạiconcentration.
- Hìnhthreshold-risks.svg vàvc-one-dimensional.svg tự tạo bằngMatplotlib từ số liệu của bài; đãxemPNG để sửa bốtrí nhãn, thêmtitle/desc/role vàoSVG. Không lấy tài sản bên thứ ba hoặc tảiMITOCW.

## Năm góc nhìn

| Góc nhìn | Kết quả |
|---|---|
|Sinh viên|6mục tiêu,tiênquyết,bảng21kýhiệu;ví dụ/bài tự chứa;chứngminh chia bước,gợiý/lờigiải gập|
|Chuyên gia|4mạch30/25/30/35=120phút;3lớp10+10+10=30phút;4homework50/40/45/45=180phút;đọc thêm120phút;phân mức/4dạngskills|
|Toán học|ConditionalGaussian/BCE đúng;normal-equations hạngthiếu;SSE0+unknownvariance/noMLE;logisticseparable;uniform2Mexp(-2neps²);ERM2eps+eta;decompositionupperbound;VC1D1/2;appshift0vs1|
|Học thuật/giảng dạy|Phân biệt probability/confidence,finitefit/population,targetP,approx vs empiricaloptimization;không ápHoeffding trực tiếp choCE/squaredloss unbounded;casegiảthiết vi phạm rõ|
|Mạch truyện|Bài11likelihood→conditionalloss→risk/ERM→data-selectedh→uniform→PAC→VC1Dcomplexity→3sources;Bài13quyếtđịnhtuầntự;không dạy lại tối ưu/concentration|

Toàn bộVCdefinitions/theorems/proofs/examples/exercises vàhình chỉ dùngXsubsetR. Hai lớp cùng nhận một đầu vào nhưngVC1/2; classallmeasurable1D minh họa ghi nhớ. Không triển khaiVCđa chiều hoặcnetworkVC. Địnhlý12.20đọc thêm ngoài35phút,proof sâu dẫnCh28.

## Mục tiêu, bằng chứng và bài kiểm tra

|Mục tiêu|Kết quả/ví dụ|Bài tập|
|---|---|---|
|1Gaussianloss/normal equations|12.1–4,Vd12.1–2|12.1,12.7,E12.1|
|2BCE/logistic existence|12.5–7,Vd12.3–4|12.2,E12.2|
|3Risk/ERM|12.8–11,Vd12.5–7|12.3,12.8,E12.3|
|4PACaccuracy/confidence|12.17|12.4,E12.4|
|5Uniform/approxERM|12.12–15,Vd12.8|12.5,E12.4q3|
|6VC1D/3errors|12.16,12.18–20,Vd12.9–10,Apps12.1–2|12.6,12.9,E12.4q1–5|

## Kiểm định kỹ thuật và số liệu

- 1082dòng,khoảng14.800đơnvị tách khoảng trắng tiếngViệt; độ dài phục vụ tự học,chứng minh/lời giải/đọc thêm; không áp sốtrang cứng.
- 20formal12.1–20,10example12.1–10,9bài12.1–9liên tục;4homeworkE12.1–4riêng;27nhãneqkhôngtrùng/thamchiếucóđích.13exercise/13hint/9solution:4homework cógợiý,lờigiảiđầyđủkhôngđặttại phần chính theo yêu cầuG.3.
- NodeVM chạy chínhvalidateDirectives/protectMath/configureMarked:77khối chuyển thànhHTMLkhôngcòn:::thô;876công thứcKaTeXrenderToString với throwOnError+strict:error đạt. Heading khôngmath,delimiters chỉ$/$$.
- sync-local-materials.py và--check đạt26tài liệu;bundlebằngnguồn. SoHEADchỉthêmpayload12,mọipayloadcũgiữnguyên.
- Hồi quyviewer10/11,routing05c/07/10/11/12,mismatchrejection,JSsyntax đạt. Linkindex12 cóMarkdownthật;2ảnhSVGlocalthật/XMLvalid,alt/title/desc có. Khônglộplanningtrênindex.
- Tínhlại bằngphânsố:regressionresiduals±1/6,1/3;logisticlog2/log4/3;thresholdboundaries;HoeffdingM100eps.05delta.05n1659. Hai tác tử vàroot xác minhindependent.
- Hìnhriskstep dùngprestep vàopen/closedmarkers: t=-.2empirical.25,t=.3empirical0. HìnhVC2points3patterns vs4patterns,rootxempreviewxácminh khôngchồngnhãn.
- ChromiumPlaywright khôngkhởichạy(TargetClosedError); socketmáychủ cũng bịsandboxchặn. Chưa kiểmviewerwide/narrow/keyboard/print, không nhận đã kiểmtrìnhduyệt. KiểmhìnhPNGchỉchứngminhhìnhđúng,không thay ràviewer.
- Root lưu trướcdirtyviewerJS/HTML, kiểm sau khi bỏđúngthayđổiroute/version thìbyte-equal. KhôngsửaCSScótrước;commit sẽdùngpatchriêngchỉroute12 vàcacheversion, khônglấyTOCtoggle cótrước.
- gitdiff--checkđạt;việccommit/push vàxácminhupstream ghi tiếp saukhi thựchiện.

## Commit, push và kiểm toán nghiệm thu

SVGdoMatplotlibtạo có khoảng trắng cuối dòng trongpath; gitdiff--cached--check phát hiện, root đã loại chỉ khoảng trắng và kiểmXML lại. Sau sửa, diff--check/diff--cached--check đạt. Không thay đổi hình học hay nguồnMarkdown.

Commitcục bộ `090d9a9` — `feat(materials): add lecture 12 risk and generalization notes`, nhánhmain theo dõiorigin/main. Trướccommit không cócommitngoàiphạmvi chưađẩy. Commitgồm9tệp nhiệm vụ;viewerJS/HTMLchỉstageroute12/cacheversion bằngpatch, khônggồmTOCtoggle/CSScótrước. ĐãchạyNodeVMtrênviewerđãstage xác nhậnroute12/renderđạt vàkhôngchứaphầnTOCngoàiphạmvi.

Lệnh `git push origin main` thấtbại: `Could not resolve host: github.com`. Chưa xác minhcommittrênupstream, chưa tuyênbốđãxuấtbản. Bảnnguồn/bundle/hình/indexvàcommit hoànchỉnhcục bộ; bướcpushcòn chưahoànthành doDNS/mạng của môi trường. Không đổi remote, không dùngAPI/tokensecrets hoặc láchhạnchếmạng. Khi môi trường cómạng, tiếp tục pushchínhnhánhmain vàđốichiếuHEADvớiupstream.

Nghiệmthu nội dung:13thànhphần kếhoạch đãđượcđốichiếu;4core120phút,3bàilớp30phút,4homework180phút;10vídụ/2apps,proofs/nguồn/giảthiết/giới hạn/previous-nextconnections đềuđủ. ChỉđạoVC1D đượcgiữtrongđịnhnghĩa,phátbiểu,chứngminh,vídụ,bàitậpvàhình. Khôngtạo/sửa slide. Mục tiêu threadgồmcommit&push nên chưađánh dấuhoànthànhkhipushchưađượcxácnhận.

## Rà soát theo mẫu statistical-learning-theory và nguồn Murphy (2026-11-04)

Yêu cầu người dùng 2026-11-04: rà soát ghi chú theo nguyên tắc nội dung, văn phong, bố cục, cách diễn giải từng khối (chi tiết, nhất là chứng minh quan trọng), dùng nguồn Murphy; giữa phiên: "dùng mẫu trong statistical-learning-theory". Quyết định chung Q1–Q12: `planning/notes-10-14-slt-template.md`. Điều phối viên: Claude Opus 5.5 (`claude-opus-5-5`). Toàn văn Murphy I (2022) và Murphy II (2023) được tải từ bản PDF tác giả công bố ngày 2026-11-04 (SHA-256 trong tệp quyết định) và đọc trực tiếp; các ghi chú cũ "chỉ kiểm mục lục" được thay bằng đối chiếu toàn văn.

### Tác tử (ghi theo lời gọi công cụ Agent)

| Vai trò | Loại | Mô hình | Effort | Ghi tệp |
|---|---|---|---|---|
| Rà toán và nguồn Murphy/UML | general-purpose | Opus 5.5 (opus) | high | không |
| Rà mẫu–văn phong–mạch truyện | general-purpose | Opus 5.5 (opus) | high | không |

### Vòng rà soát 1 và quyết định của điều phối viên

Báo cáo đầy đủ: scratchpad phiên `reviews/lec-12-math.md`, `reviews/lec-12-text.md`.

| mức độ | vị trí | vấn đề | bằng chứng | quyết định |
|---|---|---|---|---|
| nghiêm trọng | d.863, 882, 1074 | Ghi UML Chương 28 chứng minh chặn định lượng (12.27); thực ra §28.1 chỉ chứng minh chặn lỏng hơn có thừa số $d\log(d/\varepsilon)$, chặn chặt cần chaining và nằm ngoài sách | điều phối viên đọc UML trang PDF 392 | chấp nhận |
| nghiêm trọng | E12.1–E12.4 | Chỉ có gợi ý, chưa có lời giải | báo cáo | chấp nhận |
| nghiêm trọng | mở đầu | Thiếu câu hỏi trung tâm và Câu hỏi mở đầu | Q1 | chấp nhận |
| nghiêm trọng | Ví dụ 12.9 | Chưa có ví dụ AI xuyên suốt; ba nguồn sai số minh họa bằng số giả định | báo cáo | chấp nhận; các giá trị $\Delta_S$ mới phải được người rà toán kiểm lại |
| nghiêm trọng | d.25–39 và tham khảo | Vi phạm Q7 | grep | chấp nhận |
| trung bình | nhiều chỗ | Bổ đề 12.12 chưa viết lại Hoeffding, giả thiết "gần chắc chắn" so với 05c.47 rời rạc; cận hợp cho M biến cố chưa có căn cứ; chứng minh 12.2, 12.6, 12.9 thiếu bước; thiếu dẫn Murphy §5.4.4.1, §5.4.1.1; 12.3 lặp 05.3 và 12.12 lặp 05c.52 không ghi Nhắc lại; hệ quả ERM và cỡ mẫu PAC chỉ ở văn xuôi; ký hiệu $h^*$, $R^*$ hai nghĩa; bài tập trùng ví dụ; dấu thập phân | báo cáo | chấp nhận |

Số liệu: không sai số.

Tác tử bổ sung: Người sửa (tái cấu trúc, bài tập, ánh xạ dẫn chéo) — general-purpose, Opus 5.5 (opus), medium, ghi tệp; Người rà nhất quán xuyên bài 10–14 — general-purpose, Opus 5.5 (opus), high, chỉ đọc.

### Vòng sửa và tái kiểm

- Vòng sửa 1: tái cấu trúc theo Q1, `exercises.md` 9 bài; câu hỏi mở đầu $h_0$, $h_{0{,}3}$, hàm ghi nhớ; ví dụ xuyên suốt ba lớp $\mathcal H_{\mathrm c}\subset\mathcal H_\uparrow\subset\mathcal H_{\mathrm{all}}$ với $\Delta_S=0;\ 0{,}15;\ 1$; Hoeffding phát biểu lại, cận hợp chứng minh quy nạp; Định lý 12.3, Bổ đề 12.12 cũ thành khối Nhắc lại; Hệ quả 12.15; sửa phát biểu về UML §28.1; SVG `threshold-risks.svg` chỉ đổi dấu thập phân.
- Tái kiểm toán vòng 2: mọi phát hiện cũ đã sửa; $\Delta_S$ và mọi số tính lại độc lập đúng; 6 nhẹ → chấp nhận 1, 2, 4, 5, 6; mục 3 ("khoảng 95 lần") giữ vì là cách đọc của tác giả và cận "xác suất ít nhất 0,95" vẫn được nêu. Tái kiểm văn phong vòng 2: 3 trung bình (Bài tập 12.5 trùng Ví dụ 12.5; Bài tập 12.7 giải lại Định lý 12.19; "độ chính xác" hai nghĩa), 12 nhẹ → yêu cầu sửa.
- Vòng sửa 2–3: sửa mọi mục; điều phối viên kiểm $\tfrac12\log\tfrac{40}{27}\approx0{,}1965$. Quyết định: Bài tập 12.7 gồm (a) số chiều VC của hai lớp ngưỡng dùng để suy ra giới hạn tổng quát hóa — đúng E12.4 của kế hoạch người dùng — và (b) lớp khoảng; lệch so với kế hoạch chỉ ở phần (b) bổ sung.
- Ánh xạ dẫn chéo: Hệ quả 10.6 → 10.7, Bài tập 11.6 → Ví dụ 11.6; điều phối viên đối chiếu bằng script (6/6 đúng). Tái kiểm toán vòng 4: 12.7(a) đúng; 3 nhẹ về diễn đạt → gộp vào vòng sửa cuối.

### Rà nhất quán xuyên bài 10–14 và vòng sửa cuối

- Người rà xuyên bài (Opus 5.5, high, chỉ đọc): 0 chặn, 2 nghiêm trọng (ký hiệu $p_\theta$ ba nghĩa ở Bài 11–12; "rủi ro tổng thể" và "rủi ro kỳ vọng" cho cùng đại lượng), 12 trung bình, 13 nhẹ → chấp nhận tất cả; quyết định Q13–Q15 ghi trong `planning/notes-10-14-slt-template.md`.
- Vòng sửa cuối (năm người sửa song song): áp dụng Q13–Q15; Câu hỏi cuối buổi theo câu hỏi đánh giá §4 của kế hoạch người dùng, có lời giải dẫn số hiệu; lời mở nhận lại cầu nối của bài trước; mục Bài tập đồng dạng.
- Kiểm cuối xuyên bài: mọi phát hiện cũ đã sửa; 6 nhẹ mới → chấp nhận 1, 2, 4, 5, 6 (đã sửa); bác bỏ "chỉ một câu hỏi cuối buổi" vì mẫu SLT Bài 01 có "Câu hỏi phụ", và bác bỏ việc gộp tiểu mục 9.1–9.4 của Bài 12 vì không trái mẫu. Điều phối viên kiểm lại các số mới: $2/13<1/6<198/437$ (Bài 10), $V=32/13$ cho chính sách trộn (Bài 13).
- Kiểm tra kỹ thuật của điều phối viên: không ký tự điều khiển, không lệnh LaTeX mất dấu gạch chéo; forward_refs 0; khối `:::` cân bằng; `git diff --check` sạch; đồng bộ học liệu `--check` đạt; Playwright trên máy chủ tĩnh: 20 lượt (10 tệp × 1600×900 và 390×844) không lỗi console, không yêu cầu hỏng, không `.katex-error`, không tràn ngang trang; in PDF chứa nội dung các khối chứng minh (mở khi in); phím Enter mở được khối thu gọn. Hình ở màn hẹp cuộn ngang trong đoạn theo thiết kế của `material-viewer-course.css`.
- Phát hiện bố cục của điều phối viên: 402 công thức hiển thị tràn ở 390 px trên năm bài (quy tắc ngắt bằng `aligned` của `../CLAUDE.md`) → vòng bố cục giao người sửa từng bài.

### Vòng bố cục: công thức hiển thị ở 390 px

Điều phối viên đo bằng Playwright (390×844, mọi khối mở): 41+12 công thức hiển thị tràn khung trước vòng này (ghi chú + bài tập). Người sửa ngắt bằng `aligned`/`gathered`, căn cứ từng dòng chuyển xuống câu sau công thức; `\times` chỉ giữa thừa số vô hướng. Sau vòng: không công thức nào tràn quá 40 px, `katex-error` 0; số còn tràn ≤ 40 px chủ yếu do bề rộng nhãn `\tag`. Điều phối viên so mã TeX đã chuẩn hóa trước/sau (bỏ markup ngắt dòng) để xác nhận không đổi nội dung toán; các điều kiện chuyển khỏi công thức được kiểm còn nêu trong câu dẫn.

### Ánh xạ số hiệu cũ → mới

#### Khối có số

| số hiệu cũ | số hiệu mới | tên |
|---|---|---|
| Định nghĩa 12.1 | Định nghĩa 12.1 | Mô hình đầu ra có điều kiện |
| Mệnh đề 12.2 | Mệnh đề 12.2 | Hợp lý Gaussian dẫn tới mất mát bình phương |
| Định lý 12.3 | "Nhắc lại (Mệnh đề 05.3)" (không số) + Mệnh đề 12.3 | Phương trình chuẩn; Tập nghiệm bình phương tối thiểu và vector khớp |
| Nhận xét 12.4 | Nhận xét 12.4 | Phương sai chưa biết, thay đổi, không Gaussian |
| Định nghĩa 12.5 | Định nghĩa 12.5 | Mô hình Bernoulli có điều kiện và logistic |
| Mệnh đề 12.6 | Mệnh đề 12.6 | Hợp lý Bernoulli dẫn tới entropy chéo |
| Nhận xét 12.7 | Nhận xét 12.7 | Dữ liệu tách được |
| Định nghĩa 12.8 | Định nghĩa 12.8 | Rủi ro tổng thể, thực nghiệm và rủi ro Bayes (thêm $R_{\mathcal H}^*$, $R^*$) |
| Mệnh đề 12.9 | Mệnh đề 12.9 | Quy tắc Bayes cho mất mát 0–1 |
| Định nghĩa 12.10 | Định nghĩa 12.10 | ERM và ERM gần đúng ($R_{\mathcal H}^*$ chuyển sang 12.8) |
| Mệnh đề 12.11 | Mệnh đề 12.11 | Rủi ro và tập nghiệm ERM của lớp ngưỡng (phát biểu tổng quát, $t\in\mathbb R$) |
| Bổ đề 12.12 | "Nhắc lại (Định lý 05c.52, viết theo ký hiệu rủi ro)" (không số) | Độ lệch tại một hàm cố định |
| Định nghĩa 12.13 | Định nghĩa 12.12 | Độ lệch đều và tính hội tụ đều |
| Định lý 12.14 | Định lý 12.13 | Hội tụ đều cho lớp hữu hạn |
| Định lý 12.15 | Bổ đề 12.14 | Rủi ro dư trên biến cố xấp xỉ đều |
| (mới) | Hệ quả 12.15 | Rủi ro dư của ERM trên lớp hữu hạn |
| Mệnh đề 12.16 | Mệnh đề 12.16 | Cận rủi ro dư theo ba nguồn sai số |
| Định nghĩa 12.17 | Định nghĩa 12.17 | Học PAC trong hai thiết lập |
| Định nghĩa 12.18 | Định nghĩa 12.18 | Phá vỡ tập điểm và số chiều VC |
| Định lý 12.19 | Định lý 12.19 | Số chiều VC của hai lớp ngưỡng một chiều |
| Định lý 12.20 | Định lý 12.20 | Hội tụ đều theo số chiều VC (đọc thêm) |
| (mới) | Ví dụ 12.1 | Phân loại sản phẩm lỗi từ bốn quan sát cảm biến (ví dụ xuyên suốt) |
| Ví dụ 12.1 | Ví dụ 12.2 | Hồi quy từ ba số đo |
| Ví dụ 12.2 | Ví dụ 12.3 | Vector khớp khi hạng thiếu |
| Ví dụ 12.3 | Ví dụ 12.4 | Entropy chéo của hai mô hình cùng nhãn |
| Ví dụ 12.4 | Ví dụ 12.5 | Hai nhãn đối xứng |
| Ví dụ 12.5 | Ví dụ 12.6 | Rủi ro Bayes trên một phân phối có nhiễu nhãn |
| Ví dụ 12.6 | Ví dụ 12.7 | Hàm ghi nhớ trên nhãn nhiễu |
| Ví dụ 12.7 | Ví dụ 12.8 | Hai loại rủi ro của các ngưỡng trên mẫu bốn điểm |
| (mới) | Ví dụ 12.9 | Độ lệch đều của ba lớp trên mẫu bốn điểm |
| Ví dụ 12.8 | Ví dụ 12.10 | Cỡ mẫu cho một lớp 100 bộ phân loại |
| Ví dụ 12.9 | Ví dụ 12.11 | Ba nguồn sai số trên ví dụ cảm biến (thay số giả định bằng phép tính) |
| Ví dụ 12.10 | Ví dụ 12.12 | Các cách gán nhãn của hai lớp trên hai điểm (đặt trước Định nghĩa 12.18) |
| Tình huống 12.1 | Tình huống 12.1 | Ngưỡng cảm biến và quy tắc ghi nhớ |
| Tình huống 12.2 | Tình huống 12.2 | Chỉ quan sát một vùng của cảm biến |
| Hình 12.1, 12.2 | Hình 12.1, 12.2 | không đổi |

#### Bài tập (nay trong exercises.md)

| số hiệu cũ | số hiệu mới | tên |
|---|---|---|
| Bài tập 12.7 (trên lớp) | Bài tập 12.1 | Suy ra và giải mục tiêu hồi quy từ ba số đo |
| Bài tập 12.8 (trên lớp) | Bài tập 12.2 | Tập nghiệm ERM và hai loại rủi ro của lớp ngưỡng |
| Bài tập 12.9 (trên lớp) | Bài tập 12.3 | Các cách gán nhãn của hai lớp ngưỡng trên hai điểm |
| E12.1 | Bài tập 12.4 | Hợp lý Gaussian, phương trình chuẩn và tồn tại nghiệm hợp lý cực đại |
| E12.2 | Bài tập 12.5 | Entropy chéo, cực tiểu không đạt được và nhãn đổi |
| E12.3 | Bài tập 12.6 | Rủi ro chính xác dưới hai phân phối đầu vào (câu 2–3 dùng mẫu của Bài tập 12.3 cũ) |
| E12.4 | Bài tập 12.7 | Số chiều VC, giới hạn tổng quát hóa và lớp khoảng (vòng 3: phần (a) hai lớp ngưỡng, phần (b) lớp khoảng) |
| Bài tập 12.4 | Bài tập 12.8 | Tham số độ chính xác và độ tin cậy |
| Bài tập 12.5 | Bài tập 12.9 | Hội tụ đều và nghiệm ERM gần đúng |
| Bài tập 12.1 | gộp vào Bài tập 12.4, câu 4 | trùng dữ liệu $(1,3,5)$ |
| Bài tập 12.2 | gộp vào Bài tập 12.5, câu 1–3 | trùng |
| Bài tập 12.3 | gộp vào Bài tập 12.6, câu 1–2 | trùng |
| Bài tập 12.6 | gộp vào Bài tập 12.7, câu 2 | trùng |

#### Nhãn công thức

| cũ | mới | nội dung |
|---|---|---|
| (12.1) | (4.1) | hợp lý có điều kiện |
| (12.2) | (4.2) | mô hình hồi quy Gaussian |
| (12.3) | (4.3) | âm log-hợp lý Gaussian |
| (12.4) | (4.4) | phương trình chuẩn |
| (12.5) | (4.5) | nghiệm hạng đầy đủ |
| (12.6) | (bỏ nhãn) | mô hình logistic, nằm trong Định nghĩa 12.5 |
| (12.7) | (5.1) | entropy chéo nhị phân |
| (12.8) | (5.2) | $\hat L_2(w)=\log(1+e^{-w})$ |
| (12.9) | (6.1) | rủi ro tổng thể |
| (12.10) | (6.2) | rủi ro thực nghiệm |
| (12.11) | (6.3) | quy tắc Bayes và $R^*$ |
| (12.12) | (6.4) | ERM |
| (12.13) | (6.5) | ERM gần đúng |
| (12.14) | (6.6) | $R(h_t)=\min\{\lvert t\rvert,1\}/2$ |
| (12.15) | (6.7) | tập nghiệm ERM $(a,b]$ (tổng quát) |
| (12.16) | (7.1) | Hoeffding tại hàm cố định (dấu $\ge$) |
| (12.17) | (7.2) | độ lệch đều $\Delta_S$ |
| (12.18) | (7.3) | hội tụ đều |
| (12.19) | (7.4) | $\mathbb P(\Delta_S>\varepsilon)\le2Me^{-2n\varepsilon^2}$ |
| (12.20) | (7.5) | $\varepsilon_n(M,\delta)$ |
| (12.21) | (7.6) | rủi ro dư trên biến cố xấp xỉ đều |
| (mới) | (7.7) | rủi ro dư của ERM trên lớp hữu hạn |
| (12.22) | (7.8) | ba nguồn sai số |
| (12.23) | (8.1) | PAC khả thực |
| (12.24) | (8.2) | PAC không giả định khả thực |
| (12.25) | (8.3) | hai lớp $\mathcal H_\uparrow$, $\mathcal H_{\mathrm{aff}}$ |
| (12.26) | (8.4) | số chiều VC 1 và 2 |
| (12.27) | (8.5) | hội tụ đều theo VC |

Ghi chú: mục `##` cũ 12.1–12.9 nay là `## 1.`–`## 12.` + Phụ lục (hồi quy §4, logistic §5, rủi ro §6, hội tụ đều §7, PAC/VC §8). Thuật ngữ cho số hạng $2\Delta_S$: "sai số ước lượng (còn gọi là sai số do lấy mẫu)", khớp với cách Bài 13 dòng 21 (bản HEAD) gọi "sai số do lấy mẫu".

### Bàn giao

Kết luận điều phối viên: **chấp nhận**. Mọi phát hiện chặn bàn giao và nghiêm trọng đã được giải quyết và kiểm lại. Commit `b20e756` (`fix(materials): Bài 10–14 rà soát theo mẫu statistical-learning-theory và nguồn Murphy`) đã push lên `origin/main` và được xác nhận bằng `git fetch` và `git branch -r --contains HEAD`.
