# Nhật ký biên soạn Lecture Note 14

Ngày 2026-11-03. Phạm vi bản thảo của author14: materials/lec-14/lecture-note.md; img/lec-14/pca-projection.svg và vae-paths.svg; ba tệp planning/lec-14. Người dùng chỉ định Codex agents, ghi đè quy định Claude trong AGENTS. Tác tử author14 được tạo bằng collaboration.spawn_agent, kế thừa cấu hình phiên, không gán model/effort cụ thể trong lời gọi; không có bằng chứng runtime để tự khai model. Tác tử không commit, không sửa index/viewer/local-data, không đọc bí mật.

## Nguồn và cách diễn giải

Mỗi mạch và nguồn tương ứng được ghi trong outline.md. Dữ kiện local Week5 đã đọc bằng pdftotext, không chỉ suy từ kế hoạch. Cách dẫn dắt giữ cầu nối toán học: nén→phương sai→phổ→AE→thiếu phân phối→marginal→VI. Thêm chứng minh và mốc Gaussian exact để tự kiểm ELBO. Nguồn Murphy được xác minh tên/số mục qua TOC như outline, không tự nhận đã đọc toàn văn. Root đã cung cấp đọc bổ trợ KingmaWelling §§2–3. Chương không dịch hoặc chép văn textbook.

## Tự kiểm của tác tử soạn

|Hạng mục|Kết quả tự kiểm|
|---|---|
|Phạm vi|Chỉ Bài14 Markdown,không slide,đúng4mạch120phút/3bàilớp30phút/4HW180phút|
|13 thành phần G.2|Có objectives,prereqs,motivation,formal assumptions,notation,proof,worked examples,interpretations,AI,limits,class,homework,reading,summary|
|Mục tiêu|6 mục tiêu có kết quả/ví dụ và6bàicủngcố tương ứng;storyboard ghi mapping|
|PCA|Max variance bằng phổ,full reconstruction identity,k-extension; dữ liệu4điểm,Sdiag2,.5,totalerror2/mean.5|
|AE|Global optimum linear AE proof via column-space B;không đồng nhất coords với principal axes;2prior cho cùngdecoder|
|Latent|Prior/likelihood/marginal/posterior phân biệt;Gaussian2D covdiag2,.5;post mean sqrt1.5*x1/2,var.25|
|VI|KL nonnegative với equality/support;full decomposition hữu hạn;phân biệt KLprior/gap posterior;theta fixed caveat|
|VAE|Diagonal Gaussian KL derive;expected reconstruction có variance;reparam sigma std;gradient condition;phi/theta jointly|
|Limits|Reconstruction không guarantee generation;KL0/boundtight vẫn sai;2applications,một phân phối sai|
|Bài tập|6củngcố và3lớp có hint/solution;4HW có hint và fullsolution phụlục;4 loại reasoning/computation/AI/critical|
|Môi trường|Không lồng directives;proof ngay sau results;chỉ dollar delimiters;số14.1–17liêntục;examples1–7|
|Số liệu|ELBO-1.862086,logp-1.515512,gap.346574;KLprior.818147;N0,4KL.806853;gradientmu2sig.5full(-3,1)|
|Hình|2SVG tự tạo có title/desc/Markdownalt,đường dẫn img/lec-14 theo viewer convention|

## Biên tập no-ai-slop

Đã đọc /home/tqlong/.claude/skills/no-ai-slop/SKILL.md và eval.md. Dùng Edit trên toàn bản thảo, giữ thuật ngữ nhất quán/giọng chúng ta–ta, giả thiết và suy luận. Tự đối chiếu nhóm principles/words/patterns/finalread: đạt sau sửa. Giữ summary và bảng mục tiêu vì chức năng học tập theo AGENTS ưu tiên; không loại các phân biệt toán học chỉ vì chúng có dạng đối chiếu. Không dùng điểm detector hoặc suy đoán tác giả. What changed: bỏ câu meta về Bài15 và kế hoạch user ởpublic; đổi câu khó hiểu phi→theta thành vai trò hai nhóm;chỉnh đường dẫn SVG theo viewer;thêm citations cụ thể.

## Phản hồi ban đầu của root đã xử lý

Root yêu cầu sửa đường dẫn image từ ../../img/ thành img/ (viewer không rebase),đã sửa. Root yêu cầu kiểm label Mệnh đề11.3: đã kiểm đúng title ở note11. Root yêu cầu sửa câu phi/theta, bỏ nhắc Bài15 không tồn tại và chi tiết thời lượng cũ trong public;đã sửa, giữ chênh thời lượng trong planning.

## Trạng thái bàn giao

Đây là tự kiểm tác tử soạn, chưa thay thế rà toán/mạch/nguồn/kỹ thuật độc lập hoặc nghiệm thu root. Các quyết định chấp nhận/yêu cầu sửa và kết quả đồng bộ,visual,git sẽ do root bổ sung sau bằng chứng. Không khẳng định đã commit hoặc push.

## Phản hồi rà toán đầu đã xử lý

math14 và root yêu cầu tăng điều kiện đổi đạo hàm: thay a.e.differentiable bằng F khả vi liên tục trên lân cận mở cho hầu mọi nhiễu,gradient chặn đều bởi hàm khả tích,F khả tích tại1điểm;proof dùng mean value theorem+dominated differencequotient. Đã sửa MĐ14.16 và lời giảiE14.4. Bổ sung prior chuẩn ngay trong đềE14.4 để tính fullELBO tự chứa. Root yêu cầu hình dễ đọc mobile:đổi VAE thành2cột dọcviewBox600x850,font25 và PCAviewBox600x420,font25. Chưa thay thế kiểm visual actual.

## Tự kiểm snapshot cuối author14

Đã sửa phản hồi source_review: VD14.3 dùng “Lỗi tái tạo bằng0” thay “Tái tạo bằng0”. Đã rà lại các sửa root yêu cầu: image paths img/lec-14;Mệnh đề11.3 label đúng;phi/theta diễn đạt theo vai trò;không meta Bài15/thời lượng user trong public;MĐ14.16 điều kiệnC1/gradientdomination/F integrable và proof dominateddifferencequotients;E14.4 có prior chuẩn;SVG2cột dọc chữ25. Chạy parser directives không lồng/đóngđủ và parseXML2SVG đạt. Snapshotnote 947dòng,12561đơn vị táchkhoảngtrắng. SHA-256 `4848c584b052b2a4d8bc177c207bb279ee37184ef7fa26f028c0f7673e0df70d`. Tạm dừng ghi để reviewer và technical kiểm snapshot này;không coi kết quả tựkiểm là nghiệmthu độc lập.

Root yêu cầu tách3điềukiện MĐ14.16 thành bullets theo AGENTS:đã sửa,không đổi toán. Snapshot thay thế:953dòng,SHA-256 `582406bcb737bce8a4dcb0f5c9b64d4fc2f28f9d07b58f3b327938c64eb60a10`. Tác tử dừng ghi.

## Quyết định của điều phối viên trên bản cuối

Bản Markdown cuối: 953 dòng, SHA-256 `582406bcb737bce8a4dcb0f5c9b64d4fc2f28f9d07b58f3b327938c64eb60a10`. Điều phối viên đọc toàn bộ chương, đối chiếu hai PDF Tuần 5, kiểm nguồn bổ trợ Kingma–Welling và tính lại các đại lượng PCA/Gaussian/ELBO/gradient. Mục tiêu chỉ là Bài 14 và tích hợp phát hành, không sửa bài 10–13 hoặc slide.

| Tác tử / vai trò | Cơ chế, cấu hình | Quyết định và căn cứ |
|---|---|---|
| author14 — soạn và sửa | Codex collaboration, kế thừa phiên; không chỉ định model/effort riêng | Chấp nhận sau sửa. Đủ bốn mạch 30/25/25/40 phút, 6 bài củng cố, 3 bài lớp, 4 bài tự học và lời giải; sửa điều kiện gradient, tiên nghiệm tại chỗ, lỗi diễn đạt và hình mobile. |
| math14 — rà toán độc lập | Codex collaboration, kế thừa phiên | Chấp nhận bản cuối. Rà toàn bộ bảy chứng minh, bảy ví dụ, mọi bài tập và hai tình huống; tính lại số liệu độc lập. Hai phát hiện đã đóng và hash cuối đã xác nhận. |
| source_plan14 — nguồn và bốn góc nhìn | Codex collaboration, kế thừa phiên | Chấp nhận bản cuối. Đối chiếu đủ 13 thành phần người dùng; góc nhìn sinh viên, chuyên gia, học thuật/giảng dạy và mạch truyện, cùng Detect văn phong. Lỗi “tái tạo bằng 0” đã đổi thành “lỗi tái tạo bằng 0”; ghi tắt tương ứng trong storyboard cũng đã sửa. |
| technical14 — tích hợp, đóng gói và kiểm kỹ thuật | Codex collaboration, kế thừa phiên | Tích hợp và kiểm tĩnh được chấp nhận; kiểm trực quan và bản staging được ghi bổ sung sau khi có kết quả. |

Không có bằng chứng runtime tên mô hình con; nhật ký không suy đoán tên mô hình hoặc mức suy luận. Các lượt bị lỗi hạn mức đã được tiếp tục trên cùng tác tử, không bỏ phần rà còn thiếu. Các báo cáo chi tiết độc lập được lưu trong `/tmp/lec14-math-review.md` và `/tmp/lec14-source-review.md`; các kết luận và phát hiện được lưu lại tại đây.

### Đối chiếu mục tiêu và năm góc nhìn

Sáu mục tiêu có đủ kết quả/ví dụ và Bài tập 14.1–14.6 tương ứng như bảng trong storyboard. Cả 13 thành phần G.2 đều có: mục tiêu/tiên quyết, động cơ, thiết lập, ký hiệu, chứng minh, ví dụ, diễn giải hình học/xác suất, kết nối AI, giới hạn, bài lớp, bài tự học phân mức, nguồn theo mục, tổng kết/liên hệ. Mỗi bài có gợi ý và lời giải; bốn lời giải tự học nằm trong phụ lục cùng tài liệu.

- Người học: nhu cầu nén xuất hiện trước ký hiệu; dữ kiện bài tập tự chứa, cốt lõi/mở rộng/đọc thêm được phân biệt.
- Chuyên gia: không đồng nhất AE với các trục PCA, không đồng nhất hai KL, không suy chất lượng sinh từ lỗi tái tạo hoặc KL riêng lẻ.
- Toán học: chứng minh phổ, chiếu trực giao, giá trị tối ưu AE, KL không âm, phân rã ELBO, KL Gaussian và gradient theo đường mẫu đều đã rà. Điều kiện gradient đã tăng lên khả vi liên tục trên lân cận, hàm chặn gradient khả tích và tính khả tích tại một điểm; chứng minh dùng thương sai phân.
- Học thuật/giảng dạy: 120 phút lý thuyết, 30 phút bài lớp, bốn bài 45/35/65/35 phút; dữ kiện hai PDF giữ nguyên, bài mở rộng được nhận là điều chỉnh, không gán số bài Murphy.
- Mạch truyện: nén → phương sai → phổ → AE → thiếu phân phối → biến ẩn → tích phân khó → KL/ELBO → gradient/VAE. Hai tình huống kiểm cả áp dụng đúng lẫn sai giả thiết mô hình.

no-ai-slop: author14 dùng Edit và tự kiểm eval.md; source_plan14 dùng Detect toàn chương. Điều phối viên chấp nhận, giữ các đoạn phân biệt toán học và tổng kết có chức năng học tập. Không dùng điểm detector hay suy đoán tác giả.

### Kiểm tĩnh và phạm vi staging

Static audit của technical14 đạt: 850 biểu thức toán, 72 khối không lồng, 17 số hiệu kết quả liên tục, 7 ví dụ, 13 khối bài tập/gợi ý/lời giải tương ứng, 15 nhãn công thức không trùng, hai SVG XML hợp lệ. Ba cảnh báo về nhãn bài lớp 14.A–14.C là ngoại lệ đặt tên có chủ ý, không phải thiếu số hiệu.

Đồng bộ bằng `python3 ../tools/courses/math-4-AI/2627-1/scripts/sync-local-materials.py` từ gốc kho và `--check` đạt 28 tài liệu; 27 payload cũ giữ nguyên. Route 14 không cần deck; chỉ mục liên kết ghi chú có thật, bài tập ghi “Trong ghi chú”, không thêm slide giả hoặc liên kết planning.

Staging gồm đúng tám tệp nhiệm vụ: note, hai SVG, index, bootstrap, local-data và hai hunk riêng route/cache trong viewer JS/HTML. Những thay đổi TOC có trước trong JS/HTML/CSS được giữ nguyên trong worktree và loại khỏi staging. `git diff --check` và `git diff --cached --check` đạt. Bản release overlay trong `/tmp` dùng đúng viewer JS/HTML được staging và CSS HEAD để kiểm bản sẽ commit.

## Nghiệm thu kỹ thuật và trực quan cuối

Điều phối viên chấp nhận báo cáo cuối của technical14 `/tmp/lec14-release-final-audit.json`, errors rỗng, và tự đối chiếu hash Markdown cùng bytes viewer JS/HTML với staging. Đã xem ảnh thật: đoạn ứng dụng rộng, mục VI hẹp, VAE rộng, hai phía của hình VAE hẹp và thẻ chỉ mục hẹp. Tài liệu đọc được, không tràn toàn trang.

Firefox 141 chạy qua Playwright với bản driver tương thích tạm trong `/tmp`; chỉ bỏ các thuộc tính viewport không được Firefox cũ hỗ trợ, không sửa dependency gốc hoặc mã sản phẩm. Chromium bị sandbox từ chối; Firefox thực sự chạy và render trang.

Bốn cấu hình 1600×900 và 390×844, mở `file://` và HTTP được chặn yêu cầu rồi phục vụ bằng `route.fulfill` từ file local, đều đạt:

- 850 biểu thức KaTeX biên dịch strict không lỗi; không còn directive thô; 72 khối render đúng.
- Bảo toàn 49.815 ký tự văn bản chuẩn hóa so với nguồn sau khi loại công thức; không mất câu, bài tập hoặc chứng minh.
- Hai SVG được kiểm sau `decode()`, complete và kích thước nội tại dương; không có ảnh hỏng. Hai cảnh báo ban đầu ở file-mode là kiểm trước khi ảnh tải xong, được giữ trong báo cáo raw và kiểm lại sau tải, không bỏ kiểm.
- Không lỗi JavaScript, console, request hoặc tràn ngang toàn trang. Công thức dài có vùng cuộn ngang.
- Theo CSS đã có của học phần, hình ở màn hẹp giữ 900px trong vùng 332px; kiểm scrollLeft tới 568 và xem ảnh hai phía. Không sửa CSS chung chỉ để thay hành vi đã phát hành.
- Enter mở khối gập; sự kiện beforeprint mở toàn bộ lời giải/chứng minh. Đây là kiểm hành vi trước in, không phải kiểm PDF xuất ra.
- Note13 hồi quy vẫn mở; đường dẫn vượt thư mục, bài không có deckless và số bài deck/doc lệch đều bị từ chối.

Giới hạn: bind máy chủ thật bằng reloadserver8765 bị PermissionError do sandbox, nên HTTP dùng route interception, không tuyên bố đã kiểm máy chủ thực. Mã nguồn Markdown là sản phẩm được yêu cầu; không tạo PDF hoặc slide. Các kiểm tĩnh, đồng bộ và trực quan nêu trên đủ bằng chứng cho nội dung, đóng gói và viewer trong phạm vi kiểm được. Bước commit/push được ghi sau đây; chưa coi toàn bộ mục tiêu hoàn thành trước xác minh upstream.

## Phiên bản và bước còn lại

Commit cục bộ `83570e2d6b4779d5513f0fcb36daac0f9a51713c` — `feat(materials): add lecture 14 representation and generative notes`, nhánh `main` theo dõi `origin/main`. Commit gồm đúng tám tệp nhiệm vụ, không lấy TOC/CSS có trước, metadata hệ điều hành hoặc planning bị ignore. Trước commit không có commit ngoài phạm vi chưa đẩy. Sau commit, root xác minh các thay đổi viewer có trước còn nguyên.

`git push origin main` thất bại: `Could not resolve host: github.com`. Chưa xác minh commit xuất hiện trên remote. Nhánh local ahead upstream cache một commit; upstream cache không được dùng làm bằng chứng push thành công. Nội dung và commit đã hoàn tất, bước push và xác minh remote vẫn còn. Khi DNS/mạng hoạt động, chạy lại `git push origin main`, sau đó đối chiếu HEAD với `git ls-remote origin refs/heads/main`. Không đổi remote, nhánh, lịch sử hoặc dùng bí mật để lách môi trường.

## Rà soát theo mẫu statistical-learning-theory và nguồn Murphy (2026-11-04)

Yêu cầu người dùng 2026-11-04: rà soát ghi chú theo nguyên tắc nội dung, văn phong, bố cục, cách diễn giải từng khối (chi tiết, nhất là chứng minh quan trọng), dùng nguồn Murphy; giữa phiên: "dùng mẫu trong statistical-learning-theory". Quyết định chung Q1–Q12: `planning/notes-10-14-slt-template.md`. Điều phối viên: Claude Opus 5.5 (`claude-opus-5-5`). Toàn văn Murphy I (2022) và Murphy II (2023) được tải từ bản PDF tác giả công bố ngày 2026-11-04 (SHA-256 trong tệp quyết định) và đọc trực tiếp; các ghi chú cũ "chỉ kiểm mục lục" được thay bằng đối chiếu toàn văn.

### Tác tử (ghi theo lời gọi công cụ Agent)

| Vai trò | Loại | Mô hình | Effort | Ghi tệp |
|---|---|---|---|---|
| Rà toán và nguồn Murphy | general-purpose | Opus 5.5 (opus) | high | không |
| Rà mẫu–văn phong–mạch truyện | general-purpose | Opus 5.5 (opus) | high | không |

### Vòng rà soát 1 và quyết định của điều phối viên

Báo cáo đầy đủ: scratchpad phiên `reviews/lec-14-math.md`, `reviews/lec-14-text.md`.

| mức độ | vị trí | vấn đề | bằng chứng | quyết định |
|---|---|---|---|---|
| nghiêm trọng | Mệnh đề 14.16 Bước 1 | Suy "kỳ vọng theo $q_\phi$ bằng kỳ vọng theo nhiễu" chỉ từ hiệp phương sai chéo; thiếu luật của $\mu+\sigma\varepsilon$, độc lập tọa độ, đổi biến | báo cáo | chấp nhận |
| nghiêm trọng | Mệnh đề 14.3 Bước 1, Bước 3 | Thiếu tính vuông góc, $\lVert Py\rVert^2=\lVert U^\top y\rVert^2$; trường hợp $k>1$ thiếu chứng minh $\operatorname{tr}(U^\top SU)=\sum_j\lambda_jb_j$, $\sum_jb_j=k$; Mệnh đề 14.6 thừa hưởng | báo cáo | chấp nhận |
| nghiêm trọng | toàn bài | Thiếu câu hỏi trung tâm, đoạn dẫn, Câu hỏi mở đầu, ôn nhanh, Thiết lập bài toán, Ví dụ xuyên suốt, Câu hỏi cuối buổi; cầu nối không nối lời hứa của Bài 13 | Q1 | chấp nhận |
| nghiêm trọng | d.953 | Ba phân biệt PCA/AE/VAE chỉ nằm trong Tài liệu đọc | báo cáo | chấp nhận: đưa vào Ý nghĩa và Câu hỏi cuối buổi |
| nghiêm trọng | d.67, 380 | PCA và suy luận biến phân không có định nghĩa | báo cáo | chấp nhận |
| nghiêm trọng | d.24–38, 745–789, 947–951 và rải rác | Q7, Q2 | grep | chấp nhận |
| trung bình | nhiều chỗ | 14.6 chưa chứng minh mọi nghiệm có $BA=V_kV_k^\top$; Bổ đề 14.11 chưa chặt (tích phân xác định, điểm $p=0<q$, "hầu khắp nơi"); 14.14 không tính từng số hạng; dùng "tổng Gaussian độc lập là Gaussian" không có nguồn (thay bằng hoàn bình phương); hai chỗ dẫn Murphy II §21.2.2 sai nội dung; số trang Murphy II lệch bản trực tuyến; Ví dụ 14.4 trùng nghiệm PCA xác suất (Murphy I §20.2.2) nên dẫn; ví dụ trùng bài tập; Hình 14.2 xuất hiện trước (14.14); Mệnh đề 14.3 mạnh hơn Định lý 14.2 (vai trò nhãn) | báo cáo | chấp nhận |

Số liệu: không sai số. Lưu ý từ người rà toán: không chép công thức KL của Murphy II (10.49)–(10.50) vì có lỗi dấu và thiếu hằng số; dùng phép tính riêng của ghi chú.

Tác tử bổ sung: Người sửa (tái cấu trúc, bài tập, ánh xạ dẫn chéo) — general-purpose, Opus 5.5 (opus), medium, ghi tệp; Người rà nhất quán xuyên bài 10–14 — general-purpose, Opus 5.5 (opus), high, chỉ đọc.

### Vòng sửa và tái kiểm

- Vòng sửa 1: tái cấu trúc theo Q1, `exercises.md` 11 bài; Định nghĩa 14.2 (PCA), 14.16 (suy luận biến phân); Mệnh đề 14.3 (PCA một chiều) và Định lý 14.6 (hạng k, Phụ lục A) — lý do nhãn: trường hợp hạng k không suy ra tức thì từ trường hợp một chiều nên không gắn Hệ quả; Mệnh đề 14.8 ($BA=V_kV_k^\top$), Bổ đề 14.13 (KL không âm, chặt), Bổ đề 14.17 (KL hai Gaussian), Mệnh đề 14.18, 14.20 (tái tham số hóa, hàm chặn cho đổi đạo hàm–kỳ vọng, Phụ lục B), Thuật toán 14.21; bỏ số trang Murphy (2023), sửa hai chỗ dẫn §21.2.2; ví dụ không trùng bài tập.
- Tái kiểm toán vòng 2: 20/20 phát hiện cũ đã sửa, mọi số đúng; 5 nhẹ. Tái kiểm văn phong vòng 2: 40/48 đã sửa, 8 một phần; 3 trung bình (nhãn công thức Bài 10 viết trần; tên tiếng Anh của tái tham số hóa; ELBO hai tên) → yêu cầu sửa.
- Vòng sửa 2 và tái kiểm vòng 3: mọi mục đã sửa; Bài tập 14.11 dữ kiện mới đúng; còn 3 nhẹ → gộp vào bước ánh xạ.
- Ánh xạ dẫn chéo sang Bài 10–13 kèm nhãn công thức có tên bài; điều phối viên đối chiếu bằng script (14/14 khối đúng) và đọc các nhãn (6.11), (6.12), (8.4) của Bài 10, (8.3) của Bài 11, (4.3) của Bài 12.

### Rà nhất quán xuyên bài 10–14 và vòng sửa cuối

- Người rà xuyên bài (Opus 5.5, high, chỉ đọc): 0 chặn, 2 nghiêm trọng (ký hiệu $p_\theta$ ba nghĩa ở Bài 11–12; "rủi ro tổng thể" và "rủi ro kỳ vọng" cho cùng đại lượng), 12 trung bình, 13 nhẹ → chấp nhận tất cả; quyết định Q13–Q15 ghi trong `planning/notes-10-14-slt-template.md`.
- Vòng sửa cuối (năm người sửa song song): áp dụng Q13–Q15; Câu hỏi cuối buổi theo câu hỏi đánh giá §4 của kế hoạch người dùng, có lời giải dẫn số hiệu; lời mở nhận lại cầu nối của bài trước; mục Bài tập đồng dạng.
- Kiểm cuối xuyên bài: mọi phát hiện cũ đã sửa; 6 nhẹ mới → chấp nhận 1, 2, 4, 5, 6 (đã sửa); bác bỏ "chỉ một câu hỏi cuối buổi" vì mẫu SLT Bài 01 có "Câu hỏi phụ", và bác bỏ việc gộp tiểu mục 9.1–9.4 của Bài 12 vì không trái mẫu. Điều phối viên kiểm lại các số mới: $2/13<1/6<198/437$ (Bài 10), $V=32/13$ cho chính sách trộn (Bài 13).
- Kiểm tra kỹ thuật của điều phối viên: không ký tự điều khiển, không lệnh LaTeX mất dấu gạch chéo; forward_refs 0; khối `:::` cân bằng; `git diff --check` sạch; đồng bộ học liệu `--check` đạt; Playwright trên máy chủ tĩnh: 20 lượt (10 tệp × 1600×900 và 390×844) không lỗi console, không yêu cầu hỏng, không `.katex-error`, không tràn ngang trang; in PDF chứa nội dung các khối chứng minh (mở khi in); phím Enter mở được khối thu gọn. Hình ở màn hẹp cuộn ngang trong đoạn theo thiết kế của `material-viewer-course.css`.
- Phát hiện bố cục của điều phối viên: 402 công thức hiển thị tràn ở 390 px trên năm bài (quy tắc ngắt bằng `aligned` của `../CLAUDE.md`) → vòng bố cục giao người sửa từng bài.

### Vòng bố cục: công thức hiển thị ở 390 px

Điều phối viên đo bằng Playwright (390×844, mọi khối mở): 43+17 công thức hiển thị tràn khung trước vòng này (ghi chú + bài tập). Người sửa ngắt bằng `aligned`/`gathered`, căn cứ từng dòng chuyển xuống câu sau công thức; `\times` chỉ giữa thừa số vô hướng. Sau vòng: không công thức nào tràn quá 40 px, `katex-error` 0; số còn tràn ≤ 40 px chủ yếu do bề rộng nhãn `\tag`. Điều phối viên so mã TeX đã chuẩn hóa trước/sau (bỏ markup ngắt dòng) để xác nhận không đổi nội dung toán; các điều kiện chuyển khỏi công thức được kiểm còn nêu trong câu dẫn.

### Ánh xạ số hiệu cũ → mới

#### Công thức

| cũ | mới | nội dung |
|---|---|---|
| (14.1) | (4.1) | hiệp phương sai $S$ |
| — | (4.2) | PCA hạng $k$ |
| (14.2) | (4.3) | PCA một chiều |
| (14.3) | (4.4) | lỗi tái tạo = vết |
| (14.4) | (5.1) | mục tiêu AE |
| (14.5) | (6.1) | mật độ đồng thời và biên |
| (14.6) | (6.2) | lựa chọn Gaussian |
| (14.7) | (6.3) | hậu nghiệm |
| (14.8) | (7.1) | KL |
| (14.9) | (7.2) | ELBO |
| (14.10) | (7.3) | phân rã ELBO |
| — | (7.4) | KL hai Gaussian một chiều |
| (14.11) | (7.5) | KL Gaussian chéo |
| (14.12) | (7.6) | kỳ vọng tái tạo Gaussian |
| (14.13) | (8.1) | mục tiêu VAE |
| (14.14) | (8.2) | tái tham số hóa |
| (14.15) | (8.3) | gradient qua kỳ vọng |

#### Bài tập (exercises.md)

| cũ | mới | tên |
|---|---|---|
| Bài trên lớp 14.A | Bài tập 14.1 | PCA của bốn quan sát trên hai trục (dữ kiện mới $(0,\pm3),(\pm1,0)$) |
| Bài trên lớp 14.B | Bài tập 14.2 | Mô hình sinh từ bộ tự mã hóa trục ngang |
| Bài tập 14.4 | Bài tập 14.3 | Hai vai trò của KL trong phân rã ELBO |
| Bài trên lớp 14.C + Bài tập 14.5 | Bài tập 14.4 | KL tới tiên nghiệm và tái tham số hóa (gộp) |
| Bài tập 14.1 | Bài tập 14.5 | Phương sai mã và lỗi tái tạo theo góc |
| E14.1 | Bài tập 14.6 | PCA của dữ liệu theo đường chéo (dữ kiện mới, không trùng Ví dụ 14.2) |
| Bài tập 14.2 | Bài tập 14.7 | Mã, tái tạo và xác suất của một miền |
| E14.2 | Bài tập 14.8 | Bộ tự mã hóa theo đường chéo (dữ kiện mới, không trùng Ví dụ 14.3–14.4) |
| E14.3 + Bài tập 14.3 | Bài tập 14.9 | KL Gaussian, kỳ vọng tái tạo và ELBO (giữ dữ kiện E14.3; gộp câu sinh mẫu của Bài tập 14.3 cũ) |
| E14.4 | Bài tập 14.10 | Mẫu tái tham số hóa và ước lượng gradient |
| Bài tập 14.6 | Bài tập 14.11 | KL bằng không, mômen khớp và mô hình sai (vòng 2: dữ kiện mới ±2, bộ giải mã N(0,4)) |

### Bàn giao

Kết luận điều phối viên: **chấp nhận**. Mọi phát hiện chặn bàn giao và nghiêm trọng đã được giải quyết và kiểm lại. Commit `b20e756` (`fix(materials): Bài 10–14 rà soát theo mẫu statistical-learning-theory và nguồn Murphy`) đã push lên `origin/main` và được xác nhận bằng `git fetch` và `git branch -r --contains HEAD`.

### Kiểm định cuối độc lập trên commit 2caee87

Người kiểm định cuối mới (general-purpose, Opus 5.5 (opus), high, chỉ đọc), kiểm bản đã commit theo tám mục: cấu trúc Q1, chứng minh trọng tâm Q4, khối hình thức, tính lại số bằng phân số, dẫn Murphy trong toàn văn, dẫn chéo, văn phong (no-ai-slop Detect), định nghĩa trước khi dùng. Kết quả: 140 phép kiểm số, 0 sai; 35 chỗ dẫn Murphy, 0 sai; Kingma–Welling 4/4; chứng minh trọng tâm đạt. 0 chặn, 0 nghiêm trọng, 3 trung bình (ký hiệu $d$ hai nghĩa; thiếu 'Trong học máy' sau Định lý 14.15; câu về $AA^\top=I_k$ bỏ qua phép quay trực giao), 6 nhẹ. Quyết định: chấp nhận mọi phát hiện trung bình và nhẹ → vòng sửa sau kiểm định.

### Vòng sửa sau kiểm định cuối và tái kiểm

Người sửa của bài xử lý mọi phát hiện trung bình và nhẹ của kiểm định cuối; chính người kiểm định đó tái kiểm diff so với HEAD `9edae80`/`2caee87`: không còn phát hiện từ mức trung bình trở lên sau vòng sửa nhỏ cuối. Điều phối viên tự kiểm các số mới (Bài 12: hạng thiếu $w_0+w_1=7/3$, tổng bình phương sai số $14/3$; Bài 11: hậu nghiệm Beta $2/3$; Bài 13: giao điểm $v=8/9$ trên hình) và chạy lại: forward_refs 0, khối `:::` cân bằng, không ký tự điều khiển, SVG hợp lệ, `git diff --check` sạch, đồng bộ `--check` đạt, Playwright 20 lượt (10 tệp × 2 khổ) không lỗi, không công thức tràn quá 40 px ở 390 px. Kết luận: **chấp nhận**.
