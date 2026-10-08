# Nhật ký soạn và rà soát Bài 05c

## Trạng thái ngày 2026-10-08: học liệu soạn xong (lượt soạn 1–3), năm vai rà soát xong, biên tập lượt 1 (R1–R27) xong, chờ điều phối viên duyệt

Mục đích của nhật ký: ghi vai, loại, mô hình và effort của từng tác tử; quyết định của điều phối viên với từng đầu ra; quyết định soạn thảo; phát hiện rà soát cùng trạng thái; kết quả tự kiểm no-ai-slop; việc còn chờ. Không xóa phát hiện đã xử lý.

Bài 05c là bài bổ trợ chỉ có học liệu (`materials/lec-05c/lecture-note.md`, `exercises.md`), không có deck. [outline.md](outline.md) và [storyboard.md](storyboard.md) mô tả 8 phần, 40 tiểu mục `###` (A3, B5, C4, D5, E7, F6, G7, H3) và 10 bài tập, tổng 50 mục storyboard; số tiểu mục không đổi giữa lượt 1, lượt 3 và lượt 4. Ngân sách ghi chú 11 500–13 800 từ kể cả mục tài liệu tham khảo. Cổng storyboard: lượt 1 "chưa đạt" (G1–G22), tái kiểm sau lượt 3 "đạt" (0 nghiêm trọng); năm điểm G23–G27 đã sửa ở lượt 4. Hạ tầng viewer đã commit (acf3ff2, 716a049). Học liệu và 11 SVG đã soạn, chưa commit; chưa có thẻ `index.html`; ba tệp planning đã commit ở b2f6afe, bản sửa sau rà soát chưa commit. Bài không có buổi riêng trong đề cương DOCX; không gán thời lượng ở bất kỳ cấp nào.

## Nhật ký tác tử

Cột "bằng chứng" ghi nguồn xác nhận vai và mô hình. Theo CLAUDE.md, bằng chứng hợp lệ là lời gọi công cụ do điều phối viên ghi, không phải lời tự khai của tác tử; các ô "chờ điều phối viên đối chiếu" do điều phối viên điền.

| Vai | Loại tác tử | Mô hình | Effort | Ghi tệp | Phạm vi | Ngày | Bằng chứng | Quyết định của điều phối viên |
|---|---|---|---|---|---|---|---|---|
| (a) Lập kế hoạch | `general-purpose` | Claude Opus 5.5 (`claude-opus-5-5`) | `high` | Không (chỉ đọc) | Vị trí, khung lý thuyết, tám phần, hành trình K1–K15, danh mục kết quả, ví dụ, hình, bài tập, rủi ro, quyết định H.1, hạ tầng viewer | 2026-10-08 | Kết quả là tệp kế hoạch `lec-05c-plan.md` trong thư mục tạm của phiên; loại, mô hình, effort chờ điều phối viên đối chiếu với lời gọi `Agent` | `chấp nhận` (2026-10-08), kèm ghi chú VD-20 |
| (b) Điều phối và kiểm soát chất lượng | Phiên chính | Claude Fable 5.1 (`claude-fable-5-1`) | `medium` | Không | Chia việc, viết brief, duyệt mọi đầu ra | 2026-10-08 | CLAUDE.md, mục "Multi-agent workflow" | Không áp dụng |
| (c) Phân tích nguồn | `general-purpose` | Claude Opus 5.5 (`claude-opus-5-5`) | `high` | Không (chỉ đọc) | `sources/` (KF, GBC, BV, SNW, Niu), học liệu Bài 00, 05, 05b, 06 | 2026-10-08 | Đầu ra `lec-05c-sources.md` trong thư mục tạm; chờ điều phối viên đối chiếu | `chấp nhận` (2026-10-08) |
| (d) Số liệu ví dụ và bài tập | `general-purpose` | Claude Opus 5.5 (`claude-opus-5-5`) | `high` | Không (chỉ đọc; mã kiểm ở thư mục tạm) | Tính lại mọi số của mục D, E, G của kế hoạch; lời giải nháp | 2026-10-08 | Đầu ra `lec-05c-numbers.md`, `lec-05c-numbers.py` trong thư mục tạm; chờ điều phối viên đối chiếu | `chấp nhận` (2026-10-08) |
| (e) Soạn ba tệp planning, lượt 1 | `general-purpose` | Claude Opus 5.5 (`claude-opus-5-5`) | `high` | Có | Chỉ `planning/lec-05c/{outline,storyboard,review-log}.md`; không commit | 2026-10-08 | Brief của điều phối viên; chờ điều phối viên đối chiếu với lời gọi `Agent` | `chấp nhận` (2026-10-08); chuyển cổng storyboard |
| (e) Hạ tầng viewer, lượt 2 | Cùng tác tử (e), tiếp tục qua `SendMessage` | Claude Opus 5.5 (`claude-opus-5-5`) | `high` | Có | `material-viewer.js`, `material-bootstrap.js`, `material-viewer.html`, `materials/README.md`, `AGENTS.md`, `CLAUDE.md`; tệp tạm `materials/lec-05c/lecture-note.md` tạo để kiểm rồi xóa; không `planning/`; không commit | 2026-10-08 | Thông báo giao việc của điều phối viên (`SendMessage`) | Điều phối viên commit acf3ff2 (viewer, README) và 716a049 (`AGENTS.md`, `CLAUDE.md`), đã push |
| (f) Cổng storyboard | `general-purpose` | Claude Opus 5.5 (`claude-opus-5-5`) | `high` | Không (chỉ đọc) | Ba tệp planning lượt 1 | 2026-10-08 | Chờ điều phối viên đối chiếu với lời gọi `Agent` | Kết luận của tác tử: "chưa đạt" (2 nghiêm trọng, 9 trung bình, 11 nhẹ). Điều phối viên: `yêu cầu sửa` toàn bộ, kèm lựa chọn cho từng mục (mục "Quyết định sau cổng storyboard") |
| (e) Sửa planning, lượt 3 (phát hiện G1–G22) | Cùng tác tử (e), tiếp tục qua `SendMessage` | Claude Opus 5.5 (`claude-opus-5-5`) | `high` | Có | Ba tệp planning; không học liệu; không commit | 2026-10-08 | Thông báo yêu cầu sửa của điều phối viên (`SendMessage`) | Chuyển tái kiểm cổng |
| (f) Cổng storyboard, tái kiểm | Cùng tác tử (f) hoặc tác tử mới, theo lời gọi của điều phối viên | Claude Opus 5.5 (`claude-opus-5-5`) | `high` | Không (chỉ đọc) | Ba tệp planning lượt 3 | 2026-10-08 | Chờ điều phối viên đối chiếu với lời gọi | Kết luận: "đạt", 0 nghiêm trọng. Điều phối viên: `chấp nhận` planning sau khi sửa năm điểm G23–G27 |
| (e) Sửa planning, lượt 4 (G23–G27) | Cùng tác tử (e), tiếp tục qua `SendMessage` | Claude Opus 5.5 (`claude-opus-5-5`) | `high` | Có | Ba tệp planning; không học liệu; không commit | 2026-10-08 | Thông báo của điều phối viên (`SendMessage`) | Điều phối viên commit b2f6afe, đã push |
| (e) Soạn ghi chú, lượt soạn 1 (phần A–E) | Cùng tác tử (e), tiếp tục qua `SendMessage` | Claude Opus 5.5 (`claude-opus-5-5`) | `high` | Có | `materials/lec-05c/lecture-note.md` (A–E), `material-local-data.js` (sync), `review-log.md`; không commit | 2026-10-08 | Thông báo giao việc của điều phối viên (`SendMessage`) | `chấp nhận` (2026-10-08); điều phối viên kiểm độc lập bảy số mới |
| (e) Soạn ghi chú, lượt soạn 2 (phần F–H, tài liệu tham khảo) | Cùng tác tử (e), tiếp tục qua `SendMessage` | Claude Opus 5.5 (`claude-opus-5-5`) | `high` | Có | `materials/lec-05c/lecture-note.md` (F–H, tài liệu tham khảo), `material-local-data.js` (sync), `outline.md`, `review-log.md`; không commit | 2026-10-08 | Thông báo giao việc của điều phối viên (`SendMessage`) | `chấp nhận` (2026-10-08); số mới khớp kiểm độc lập của điều phối viên |
| (e) Soạn bài tập và hình, lượt soạn 3 | Cùng tác tử (e), tiếp tục qua `SendMessage` | Claude Opus 5.5 (`claude-opus-5-5`) | `high` | Có | `materials/lec-05c/exercises.md`, 11 SVG trong `img/lec-05c/`, alt H-05 trong ghi chú, `material-local-data.js` (sync), `outline.md`, `storyboard.md`, `review-log.md`; mã sinh hình ngoài kho; không commit | 2026-10-08 | Thông báo giao việc của điều phối viên (`SendMessage`) | Chờ điều phối viên duyệt |
| (h) Rà soát SV (sinh viên) | `general-purpose` | Claude Opus 5.5 (`claude-opus-5-5`) | `high` | Không (chỉ đọc) | Ghi chú, bài tập, 11 SVG | 2026-10-08 | Lời gọi `Agent` của điều phối viên 2026-10-08 (năm lời gọi song song) | Điều phối viên hợp nhất thành R1–R27 và nhóm nhẹ |
| (h) Rà soát CG (chuyên gia) | `general-purpose` | Claude Opus 5.5 (`claude-opus-5-5`) | `high` | Không (chỉ đọc) | Ghi chú, bài tập, 11 SVG | 2026-10-08 | Lời gọi `Agent` của điều phối viên 2026-10-08 (năm lời gọi song song) | Điều phối viên hợp nhất thành R1–R27 và nhóm nhẹ |
| (h) Rà soát TH (chính xác toán học) | `general-purpose` | Claude Opus 5.5 (`claude-opus-5-5`) | `high` | Không (chỉ đọc) | Ghi chú, bài tập, 11 SVG | 2026-10-08 | Lời gọi `Agent` của điều phối viên 2026-10-08 (năm lời gọi song song) | Điều phối viên hợp nhất thành R1–R27 và nhóm nhẹ |
| (h) Rà soát PB (phản biện học thuật, sư phạm, no-ai-slop) | `general-purpose` | Claude Opus 5.5 (`claude-opus-5-5`) | `high` | Không (chỉ đọc) | Ghi chú, bài tập, 11 SVG | 2026-10-08 | Lời gọi `Agent` của điều phối viên 2026-10-08 (năm lời gọi song song) | Điều phối viên hợp nhất thành R1–R27 và nhóm nhẹ |
| (h) Rà soát MC (mạch lập luận) | `general-purpose` | Claude Opus 5.5 (`claude-opus-5-5`) | `high` | Không (chỉ đọc) | Ghi chú, bài tập, 11 SVG | 2026-10-08 | Lời gọi `Agent` của điều phối viên 2026-10-08 (năm lời gọi song song) | Điều phối viên hợp nhất thành R1–R27 và nhóm nhẹ |
| (i) Biên tập lượt 1 (R1–R27) và lượt 2 (T1–T9, thẻ chỉ mục, V1–V5) | `general-purpose` | Claude Opus 5.5 (`claude-opus-5-5`) | `high` | Có | Ghi chú, bài tập, SVG qua mã sinh, `material-viewer.css` (R4), `index.html`, ba tệp planning, sync; không commit | 2026-10-08 | Lời gọi `Agent` và các thông báo `SendMessage` của điều phối viên | Lượt 1 `chấp nhận`; lượt 2 `chấp nhận` (mục "Tái kiểm sau biên tập lượt 1") |
| (h') Tái kiểm sau biên tập lượt 1: CG, TH, MC | `general-purpose` (tiếp tục ba tác tử rà soát tương ứng) | Claude Opus 5.5 (`claude-opus-5-5`) | `high` | Không (chỉ đọc) | Các đoạn đã sửa, ±2 đoạn lân cận, ranh giới phần; số mới | 2026-10-08 | Lời gọi của điều phối viên 2026-10-08 | Đạt, kèm T1–T9 |
| (j) Kiểm định cuối | `general-purpose` (tác tử cổng storyboard (f) tái dụng) | Claude Opus 5.5 (`claude-opus-5-5`) | `high` | Không (chỉ đọc) | Kiểm kỹ thuật, trình duyệt, đồng bộ planning, git | 2026-10-08 | Lời gọi của điều phối viên 2026-10-08 | Kết luận: đạt, năm điểm nhẹ V1–V5 |
| (k) Tái kiểm của điều phối viên | Phiên chính | Claude Fable 5.1 (`claude-fable-5-1`) | `medium` | Không | Duyệt mọi đầu ra của (h), (h'), (i), (j) | 2026-10-08 | Quyết định trong nhật ký này | `chấp nhận` toàn bộ; ký duyệt 2026-10-08 |

## Quyết định điều phối viên 2026-10-08

Quyết định về mục H.1 của kế hoạch, ghi nguyên theo brief của điều phối viên:

1. Viết tự chứa từ không gian mẫu; mỗi khái niệm trùng Bài 00 có một câu đối chiếu (Bài 00 dùng $\Pr$).
2. Phần liên tục tối thiểu: định nghĩa mật độ, ví dụ đều trên $[0,1]$, Gauss chỉ phát biểu; chứng minh viết cho trường hợp rời rạc kèm nhận xét thay tổng bằng tích phân.
3. Độ dài theo mục B của kế hoạch (ghi chú 11 000–13 800 từ, bài tập 3 500–4 500 từ); ví dụ tùy chọn VD-09, VD-11, VD-23 giữ nhưng ngắn.
4. Ký hiệu như bảng A.4: $P$ xác suất, $\mathcal P$ phân phối dữ liệu (ghi ánh xạ sang $P$ của Bài 05 một lần), $\sigma_1^2$ và $\sigma_b^2=\sigma_1^2/b$, $[m_i,M_i]$ trong Hoeffding, $\lambda$ cho Chernoff.
5. Thuật ngữ "nhóm nhỏ (minibatch)"; một câu ánh xạ sang "lô nhỏ" của Bài 06; không sửa Bài 06.
6. Nguồn: Koller–Friedman, Goodfellow–Bengio–Courville, Boyd–Vandenberghe §7.4, Sra–Nowozin–Wright ch. 13; BIMSA chỉ để đối chiếu E.10, không trích dẫn làm nguồn chính; không tải MIT OCW. Các bất đẳng thức ghi "kết quả chuẩn, chứng minh tự xây dựng".
7. Nới hợp đồng viewer: cho phép thiếu `deck` với danh sách bài không deck (`05c`); sửa `material-viewer.js`, chuỗi phiên bản, `materials/README.md`, một câu trong `AGENTS.md` và `CLAUDE.md` (commit `docs(agents)` riêng). Làm ở giai đoạn soạn học liệu, không phải bây giờ.
8. Thẻ `index.html`: nhãn "Bài 05c (bổ trợ)", ô "Bài giảng" ghi trạng thái "Không có bộ trang chiếu"; chỉ thêm sau kiểm định cuối.
9. Ba tệp planning của 05c theo tiền lệ 05b: `git add -f` khi commit.

**Quyết định về kế hoạch:** `chấp nhận`. Ghi chú: VD-20 với $b=100$ chờ giá trị đúng từ tác tử số liệu; kế hoạch ghi $0{,}00322$, điều phối viên tính $\approx0{,}00320$. Bảng số cho $a_{30}=0{,}81^{30}+\frac{8}{5700}(1-0{,}81^{30})\approx0{,}003198$; tác tử soạn tính độc lập được cùng giá trị. Outline dùng $0{,}00320$.

**Quyết định về bảng nguồn và bảng số:** `chấp nhận` cả hai (2026-10-08). Điều phối viên đã đối chiếu LLO11, LLO12, LLO27 với DOCX: đúng nội dung.

**Quyết định về hai số do tác tử soạn đưa vào:** `chấp nhận` nếu kèm phép tính. Outline (mục "Danh mục ví dụ") ghi phép tính: $\cosh1=\frac{e+e^{-1}}2\approx1{,}543\le e^{1/2}\approx1{,}649$; sai số chuẩn thăm dò $\sqrt{\sigma_1^2/n}$ với $\sigma_1^2\le\frac14$, $n=1000$: $\sqrt{0{,}25/1000}\approx0{,}0158$ (không phải công thức của gradient nhóm).

## Quyết định sau cổng storyboard (2026-10-08)

Điều phối viên: `yêu cầu sửa` outline và storyboard theo toàn bộ bảng của cổng, với các lựa chọn:

- $\mu$ chỉ là kỳ vọng. §G.6, §G.7, Nhận xét G.7 viết công thức giá trị giới hạn cho ví dụ ba quan sát với độ cong bằng 1; dạng tổng quát nêu bằng lời kèm dẫn Bài 05b; bảng ký hiệu thêm dòng ánh xạ.
- Dẫn xuất đệ quy $a_{k+1}=(1-\eta)^2a_k+\eta^2\sigma_1^2/b$ trong §G.6 từ Định lý G.3 và Mệnh đề E.12, nâng ngân sách tiểu mục; thêm Bài 04 vào tiền đề; chỉ §G.7 dẫn Bài 05b.
- Sắp lại thứ tự nhu cầu → ví dụ → phát biểu ở §E.2, §E.3, §G.1, §G.2, §D.4; sai số chuẩn chuyển về §E.5.
- VD-08 bỏ cò quay, giữ như phép tính kỳ vọng với quy ước "nhận 10 gồm cả tiền đặt"; VD-09 ngắn với $\min(2^K,2^{20})$; VD-23 sang §E.7 hoặc BT5; VD-11 bỏ $0{,}36788$.
- Thêm Định lý G.2 vào đầu vào §G.6 và câu nối "$J$ chỉ là ước lượng của $R$ với sai số cỡ $1/\sqrt N$…" trước Nhận xét G.6; ghi khác biệt với GBC.
- VD-20 ghi ba giới hạn và quy ước $b=N$ là một bước gradient đầy đủ ($0{,}81$); H-10 vẽ trên các ước của 3000, đánh dấu đáy $b=75$ và $b=10$, $K=\lfloor B/b\rfloor$, alt đủ số.
- "Hoeffding kém Chebyshev ở độ lệch nhỏ" thành "Hoeffding hai phía" kèm ví dụ cụ thể.
- Ký hiệu $\widetilde J$, $\widetilde g$, $W_i$; bổ sung $L$, $C$, $B$, $K$, $a_K$, $\eta$, $d$, $\mathcal E$ vào bảng; VD-05b tính bằng Bayes trực tiếp; VD-17b theo nhãn $\pm1$ của Bài 01 §4; Nhận xét G.7 với $\sup_\theta$.
- Q4 tách Q4a, Q4b ở outline, storyboard, bảng §H.1.
- K6 trỏ BT9 câu (a) và BT4 có câu PMF, CDF số mặt ngửa; BT6 chứng minh E.10 bằng hàm chỉ thị; BT7 bỏ chép chứng minh; VD-16 bổ sung Markov $50/60\approx0{,}833$; cột quyết định có lý do một dòng cho mọi mục; các mục nhẹ còn lại theo đề xuất của cổng.

Trả lời nghi vấn lượt 1: N1 hai cận trùng nhau, sửa thành "trùng"; N2 đúng, ghi "$b=100$ tốt nhất trong các $b$ đã thử; tối ưu trên mọi $b$ nguyên là $b=75$ ($K=40$, $a_K\approx0{,}00209$)"; N3 điều phối viên đã kiểm DOCX.

## Quyết định soạn thảo

Lượt 1:

1. Đơn vị của storyboard là tiểu mục `###` của ghi chú và bài tập: 40 tiểu mục, 10 bài tập.
2. Mã tiểu mục mang tiền tố `§` (§B.2) để không trùng nhãn kết quả của kế hoạch. Tiêu đề `###` trong ghi chú không có mã. Mã phát hiện của cổng (G1–G22) khác giả thiết G1–G4; nhật ký ghi "phát hiện G…".
3. H-05 chuyển về §F.4 và H-07 về §F.6; H-04 đặt ở §E.3, §D.1 dùng bảng PMF.
4. VD-09 xuất hiện lần đầu ở §E.1; Nhận xét F.11 nhắc lại.
5. K15 tách thành hai hành trình sáu bước (Q4a ở §G.4, Q4b ở §G.5–§G.6).
6. Định lý giới hạn trung tâm chỉ có bước trực giác và nhận xét.

Lượt 3 (sửa theo cổng):

7. Ngân sách lượt 3: §G.6 nâng lên 600–650 từ (dẫn xuất đệ quy); §G.7 còn 150–200 từ; §E.1 và §E.2 giảm 50 từ mỗi tiểu mục (bỏ cò quay, chuyển VD-23); §E.5 tăng lên 400–450 (sai số chuẩn); §D.4 tăng lên 250–300 (bảng VD-06); §B.3 giảm, §B.4 tăng 50 (H-01); §F.6 còn 350–400; §H.2 còn 200–250; thêm mục `## Tài liệu tham khảo` 150–200. Tổng 11 450–13 800 từ.
8. Cây hai bước ở §E.7 dựng trên VD-13 ($\theta_0=0$, $\eta=0{,}1$, $b=1$) thay cho cây của Bài 05b, để 05c không dùng kết quả của 05b ở ngoài §G.7.
9. Ứng dụng của K11 ở §F.1 là cận Markov cho số mẫu chưa gặp của VD-10 ($\le0{,}735$), thay cho việc dẫn tên BĐ6; BĐ6 chuyển sang §G.7.
10. BT4 bỏ câu VD-08 (đã giải trong ghi chú), thêm câu PMF và CDF; BT5 câu (b) đổi sang $2N$ lần rút để không chép VD-10; BT5 bỏ câu trùng mũ (VD-11 đã có trong ghi chú) và nhận VD-23.
11. §H.3 chỉ còn câu hỏi tự kiểm; danh sách tài liệu ở mục `## Tài liệu tham khảo`.

Lượt 4 (G23–G27):

12. Ngân sách: §E.1 và §E.2 lên 350–400 từ mỗi tiểu mục; §G.6 còn 500–550 (lấy 100 từ); §A.3 còn 200–250 (lấy 50 từ). Phần A 700–850, E 2 150–2 500, G 2 050–2 400; tổng 11 500–13 800 kể cả mục tài liệu tham khảo.
13. Số mẫu chưa gặp ở §F.1 ký hiệu $T_N$; $U$ giữ cho phản ví dụ của Mệnh đề E.7; thêm dòng $T_N$ vào bảng ký hiệu.
14. VD-09 chuyển sang §F.6, cạnh Nhận xét F.11; §E.1 chỉ nêu điều kiện hội tụ tuyệt đối của Định nghĩa E.1.

## Phát hiện rà soát

Mức độ: `chặn bàn giao`, `nghiêm trọng`, `trung bình`, `nhẹ`; quyết định: `chấp nhận`, `yêu cầu sửa`, `bác bỏ`. Cột "mục" ghi vị trí theo bản lượt 1. Các phát hiện G1–G22 do tác tử (f) nêu; điều phối viên `chấp nhận` toàn bộ và `yêu cầu sửa`.

| mã | vai | mức độ | mục | vấn đề | đề xuất | trạng thái | quyết định |
|---|---|---|---|---|---|---|---|
| G1 | cổng storyboard | nghiêm trọng | Ký hiệu; §G.6, §G.7, Nhận xét G.7 | $\mu$ vừa là kỳ vọng vừa là hằng số lồi mạnh trong $\frac{\eta\sigma_1^2}{b\mu(2-\eta\mu)}$ | Giữ $\mu$ là kỳ vọng; viết công thức với độ cong bằng 1; thêm dòng ánh xạ | Đã sửa: outline bảng ký hiệu (dòng "độ cong"), danh mục G, §G.6, §G.7; storyboard §A.3, §G.6, §G.7 | `chấp nhận`, `yêu cầu sửa` |
| G2 | cổng storyboard | nghiêm trọng | Tiền đề; §G.4, §G.6, BT10 câu (b) | Phụ thuộc chưa khai vào Bài 04 (bước $1/L$) và vào đệ quy $a_K$ của Bài 05b | Dẫn xuất đệ quy trong §G.6 từ G.3 và E.12; thêm Bài 04 vào tiền đề; chỉ §G.7 dẫn Bài 05b | Đã sửa: outline "Vị trí", "Tiền đề học phần", đoạn "Dẫn xuất đệ quy trong §G.6"; §E.7 dùng cây VD-13; storyboard §E.7, §G.4, §G.6, BT10 | `chấp nhận`, `yêu cầu sửa` |
| G3 | cổng storyboard | trung bình | §E.2, §E.3, §G.1, §G.2 | Phát biểu hình thức đứng trước nhu cầu hoặc ví dụ; sai số chuẩn định nghĩa trước Q2 | Sắp lại thứ tự; sai số chuẩn chuyển về §E.5 | Đã sửa: outline bốn hàng tiểu mục, Định nghĩa E.5, Định lý E.9; storyboard bốn mục và K7, K9, K14 | `chấp nhận`, `yêu cầu sửa` |
| G4 | cổng storyboard | trung bình | §D.4; §E.3 | §D.4 mở bằng Định nghĩa D.6 không có ví dụ; đầu vào §E.3 thiếu D.6 | Thêm bảng PMF đồng thời của VD-06 trước D.6; thêm D.6 vào đầu vào §E.3 | Đã sửa | `chấp nhận`, `yêu cầu sửa` |
| G5 | cổng storyboard | trung bình | K6, BT4 | K6 trỏ BT4 nhưng BT4 đo kỳ vọng | K6 trỏ BT9 câu (a); BT4 thêm câu PMF, CDF | Đã sửa: BT4 câu (a), K6 trỏ BT4 câu (a) và BT9 câu (a) | `chấp nhận`, `yêu cầu sửa` |
| G6 | cổng storyboard | trung bình | §E.1, §E.2; VD-23, VD-11 | Hai tiểu mục quá tải | Bỏ cò quay; VD-23 sang BT5; VD-11 bỏ số | Đã sửa | `chấp nhận`, `yêu cầu sửa` |
| G7 | cổng storyboard | trung bình | §G.5–§G.6 | Thiếu bước nối từ Định lý G.2 sang lập luận ngân sách | Thêm G.2 vào đầu vào §G.6 và câu nối trước Nhận xét G.6; ghi khác biệt với GBC | Đã sửa: §G.6 (câu nối), §G.2 (khác biệt với GBC §8.1.3) | `chấp nhận`, `yêu cầu sửa` |
| G8 | cổng storyboard | trung bình | VD-20 | Giới hạn chưa đủ | Ba giới hạn và quy ước $b=N$ | Đã sửa: outline "Giới hạn áp dụng", VD-20; storyboard §G.6, §H.2 | `chấp nhận`, `yêu cầu sửa` |
| G9 | cổng storyboard | trung bình | H-10 | Đáy thật ở $b=75$; alt cũ; đường $B=300$ dừng ở $b=300$ | Vẽ trên các ước của 3000, đánh dấu hai đáy, $K=\lfloor B/b\rfloor$, alt đủ số | Đã sửa | `chấp nhận`, `yêu cầu sửa` |
| G10 | cổng storyboard | trung bình | §F.6, H-06 | "Hoeffding kém Chebyshev" chỉ đúng với cận hai phía | Ghi "Hoeffding hai phía" và ví dụ cụ thể; ghi phía của mọi cận | Đã sửa: §F.6, F.2, F.8, VD-16, H-06, H-07, BT8 | `chấp nhận`, `yêu cầu sửa` |
| G11 | cổng storyboard | trung bình | VD-08, VD-09, câu nối D → E | Kế hoạch cấm bình luận cờ bạc; câu nối D → E dùng trò chơi trong khi nhu cầu của K8 là gradient | VD-08 chỉ là phép tính; câu nối D → E viết lại theo PMF của $g_I(1)$ | Đã sửa | `chấp nhận`, `yêu cầu sửa` |
| G12 | cổng storyboard | nhẹ | Q4 | Q4 gộp hai câu hỏi của người dùng | Tách Q4a, Q4b | Đã sửa: outline, storyboard, §H.1 | `chấp nhận`, `yêu cầu sửa` |
| G13 | cổng storyboard | nhẹ | Ký hiệu $J_\Sigma$, $R_i$; bảng ký hiệu | $R_i$ trùng $R$ (rủi ro); bảng thiếu nhiều ký hiệu | $\widetilde J$, $\widetilde g$, $W_i$; bổ sung $L$, $C$, $B$, $K$, $a_K$, $\eta$, $d$, $\mathcal E$, $S$, $\theta$ | Đã sửa | `chấp nhận`, `yêu cầu sửa` |
| G14 | cổng storyboard | nhẹ | Nhận xét G.7 | $\sigma^2=\operatorname{tr}\Sigma/b$ thiếu cận trên theo $\theta$ | $\sigma^2=\sup_\theta\operatorname{tr}\Sigma(\theta)/b$ | Đã sửa | `chấp nhận`, `yêu cầu sửa` |
| G15 | cổng storyboard | nhẹ | §A.1 → §B.1 | §B.1 nhận câu hỏi chỉ số lặp mà §A.1 chưa đặt | Đặt câu hỏi ($b=32$, $N=1000$) ở §A.1 | Đã sửa | `chấp nhận`, `yêu cầu sửa` |
| G16 | cổng storyboard | nhẹ | §D.2, §D.3, §F.5 | Ngoại lệ thứ tự chưa khai; §F.5 thiếu câu nhu cầu | Thêm nhu cầu và ví dụ trước định nghĩa ở §D.2, §D.3; khai ngoại lệ §F.5; thêm câu nhu cầu | Đã sửa: storyboard mục "Ngoại lệ có chủ ý" | `chấp nhận`, `yêu cầu sửa` |
| G17 | cổng storyboard | nhẹ | Ứng dụng K11 | Ứng dụng chỉ là dẫn tên BĐ6 | Ứng dụng tính được | Đã sửa: cận Markov cho VD-10 ở §F.1 | `chấp nhận`, `yêu cầu sửa` |
| G18 | cổng storyboard | nhẹ | VD-05b; VD-17b | Tỉ số odds chưa định nghĩa; VD-17b chưa nêu quy ước nhãn | Bayes trực tiếp; nhãn $\pm1$ theo Bài 01 §4 | Đã sửa | `chấp nhận`, `yêu cầu sửa` |
| G19 | cổng storyboard | nhẹ | Cột quyết định; §H.3; BT6, BT7 | Nhiều mục chỉ ghi "thêm"; §H.3 trùng danh sách tài liệu; BT6, BT7 yêu cầu chép chứng minh của ghi chú | Lý do một dòng cho mọi mục; §H.3 chỉ còn câu hỏi; BT6 dùng hàm chỉ thị, BT7 giữ dấu bằng và phản ví dụ | Đã sửa: 50 mục storyboard có lý do (kiểm bằng script) | `chấp nhận`, `yêu cầu sửa` |
| G20 | cổng storyboard | nhẹ | H-01; alt H-06 | H-01 tách hai tiểu mục; alt H-06 thiếu số | H-01 đặt ở §B.4; alt H-06 nêu số tại $k=60$, $75$, $80$ | Đã sửa | `chấp nhận`, `yêu cầu sửa` |
| G21 | cổng storyboard | nhẹ | review-log; VD-16; nguồn | Nhật ký thiếu N6–N8; VD-16 thiếu Markov $0{,}833$; KF không trình bày nhị thức; thiếu GBC §3.2–3.3, §3.9.1 | Bổ sung | Đã sửa: N6–N8 dưới đây; VD-16; dòng KF, GBC trong outline (trang GBC kiểm bằng `pdftotext`: §3.2 tr. 56, §3.3.2 tr. 58, §3.9.1 tr. 62) | `chấp nhận`, `yêu cầu sửa` |
| G22 | cổng storyboard | nhẹ | storyboard §A.2 | Cụm "trục của toàn bài" là lời bình chung chung (no-ai-slop) | Nêu cụ thể vai trò | Đã sửa: "Q1–Q4b quyết định phần trả lời của E, F, G và hàng của bảng §H.1" | `chấp nhận`, `yêu cầu sửa` |
| G23 | cổng storyboard (tái kiểm) | nhẹ | §G.6, §H.2 | Dẫn xuất $a_K$ dùng Định lý G.3 tại $\theta_k$ ngẫu nhiên mà chưa nêu vì sao nhiễu độc lập với $\theta_k$; G4 bị vượt | Thêm câu: nhóm ở bước $k$ rút mới, độc lập với lịch sử, nên $\zeta_k$ độc lập với $\theta_k$ (Mệnh đề D.7); §H.2 ghi §G.6 vượt G4 nhờ điều kiện này, tương ứng H6 | Đã sửa: outline đoạn "Dẫn xuất đệ quy", hàng §G.6, "Giới hạn áp dụng"; storyboard §G.6, §H.2 | `chấp nhận`, `yêu cầu sửa` |
| G24 | cổng storyboard (tái kiểm) | nhẹ | outline "Vị trí"; storyboard | Câu "chỉ §G.7 dẫn Bài 05b" mâu thuẫn với câu về dạng tổng quát của giá trị giới hạn ở §G.6 | Ghi "§G.6 (một câu về dạng tổng quát của giá trị giới hạn) và §G.7" | Đã sửa | `chấp nhận`, `yêu cầu sửa` |
| G25 | cổng storyboard (tái kiểm) | nhẹ | BT4 câu (a); BT7 câu (c); §F.1 | BT4 câu (a) trùng ví dụ ba đồng xu của §D.2; BT7 câu (c) dùng $\sigma^2$ và thiếu điều kiện; $U$ ở §F.1 trùng $U$ của Mệnh đề E.7 | Bốn đồng xu cân đối; $\operatorname{Var}X$ với $\operatorname{Var}X\le t^2$; đổi ký hiệu | Đã sửa: BT4 câu (a) $\binom4k/16$, kỳ vọng 2; BT7 câu (c); $T_N$ | `chấp nhận`, `yêu cầu sửa` |
| G26 | cổng storyboard (tái kiểm) | nhẹ | §E.1, §E.2, VD-09 | §E.1, §E.2 vẫn chật; VD-09 minh họa Nhận xét F.11 nhưng đặt ở §E.1 | VD-09 sang §F.6; §E.1, §E.2 lên 350–400 từ, lấy từ §G.6 | Đã sửa (quyết định soạn thảo 12, 14) | `chấp nhận`, `yêu cầu sửa` |
| G27 | cổng storyboard (tái kiểm) | nhẹ | §G.6; review-log | Câu nối viết "không cải thiện sai số tổng" trong khi G.2 chỉ cho bậc; số lượt trong nhật ký không thống nhất | "Không cải thiện bậc của sai số"; thống nhất số lượt | Đã sửa: hàng §G.6 của outline và storyboard; nhật ký dùng lượt 1 (planning), lượt 2 (hạ tầng), lượt 3 (sửa G1–G22), lượt 4 (sửa G23–G27) | `chấp nhận`, `yêu cầu sửa` |

Không có phát hiện nào bị tác tử soạn bác bỏ. Trạng thái cổng storyboard: **đạt** (tái kiểm sau lượt 3, 0 nghiêm trọng); G23–G27 đã sửa ở lượt 4.

## Nghi vấn chuyển điều phối viên

| Mã | Nội dung | Bằng chứng | Trạng thái |
|---|---|---|---|
| N1 | Kế hoạch ghi Định lý F.6 cho "cận tốt hơn" Bổ đề F.7 trên $[-1,1]$ | Với $M-m=2$, F.7 cho $e^{\lambda^2/2}$, trùng cận của F.6 | Đóng: điều phối viên xác nhận; outline ghi "trùng" |
| N2 | VD-20, $B=3000$: đáy trên mọi ước của 3000 là $b=75$ ($0{,}00209$) | Tác tử soạn và bảng số tính cùng kết quả | Đóng: ghi "$b=100$ tốt nhất trong các $b$ đã thử; tối ưu trên mọi $b$ nguyên là $b=75$" |
| N3 | Bảng nguồn không kiểm LLO với DOCX | Bảng nguồn | Đóng: điều phối viên đã kiểm DOCX |
| N4 | Ví dụ ba quan sát ở Bài 05 `:86–92`, không phải `:84–92` | Bảng nguồn, mục 5 | Đóng: outline dùng `:86–92` |
| N5 | Câu Nhận xét G.6 của kế hoạch không có nguyên văn trong SNW ch. 13 | Bảng nguồn, mục 4 | Đóng: outline dùng câu đề xuất của bảng nguồn (cận trên tiệm cận) |
| N6 | VD-16 thiếu cận Markov cho $P(S\ge60)$: $\mathbb ES/60=50/60\approx0{,}833$ | Phát hiện G21; tác tử soạn kiểm $50/60=0{,}8\overline3$ | Đóng: thêm vào VD-16 và alt H-06 |
| N7 | Koller và Friedman không trình bày phân phối nhị thức; GBC §3.9 có Bernoulli, Multinoulli, Gauss, không có nhị thức | Phát hiện G21; mục lục GBC ch. 3 (trang tệp 78–79) | Đóng: Mệnh đề D.4 ghi tự xây dựng; Định nghĩa D.3 dẫn GBC §3.9.1 cho Bernoulli |
| N8 | Dòng GBC thiếu §3.2–3.3 (biến ngẫu nhiên, PMF, mật độ) và §3.9.1 | Phát hiện G21; `pdftotext` trang tệp 72–74, 78: §3.2 và §3.3 tr. 56, §3.3.2 tr. 58, §3.9.1 tr. 62 | Đóng: thêm vào dòng GBC của outline; tác tử nguồn có thể tái kiểm |
| N9 | Thông báo của điều phối viên ghi 716a049 là viewer, README và acf3ff2 là `AGENTS.md`, `CLAUDE.md` | `git show --stat`: acf3ff2 `feat(materials)` (viewer, bootstrap, README), 716a049 `docs(agents)` (`AGENTS.md`, `CLAUDE.md`) | Nhật ký ghi theo `git show` |
| N11 | Viewer ép hình `img/lec-*` rộng tối thiểu 900 px; ở 1600×900 cột nội dung 762–808 px nên mép phải hình bị che, phải cuộn | Đo bằng Playwright trên Bài 05b và 05c | Đóng: điều phối viên quyết sửa CSS chung (R4); đã sửa ở biên tập lượt 1, kiểm hồi quy Bài 04, 05, 05b, 05c |
| N10 | Số mới của lượt 3 cần tái kiểm toán: cận Markov VD-10 $\approx0{,}735$; cây VD-13 ($\theta_1\in\{-0{,}1;0{,}1;0{,}3\}$, $\mathbb Eg=-0{,}9$); BT4 câu (a) (bốn đồng xu: $\frac1{16},\frac4{16},\frac6{16},\frac4{16},\frac1{16}$, kỳ vọng 2); BT5 câu (b) $\approx0{,}1352$; BT7 câu (c); BT9 câu (b); đệ quy $a_K$ và hằng $\frac{8}{57b}$ | Tác tử soạn tính bằng `python3 -I`; phép tính ghi trong outline | Đóng: đã kiểm ở tái kiểm cổng và tái kiểm toán sau biên tập lượt 1 |

## Hạ tầng viewer (quyết định 7)

Lượt 2 của tác tử (e), 2026-10-08. Điều phối viên commit acf3ff2 và 716a049, đã push.

- `material-viewer.js`: hằng `DECKLESS_LECTURES = new Set(["05c"])`; `readRequest` trả `deckPath: null` khi thiếu `deck` và số bài thuộc danh sách, các trường hợp khác giữ hai kiểm cũ; `deckLink.remove()` khi `deckPath === null`.
- Chuỗi phiên bản `20260913-local2` đổi thành `20261008-05c` ở `material-bootstrap.js` (2 chỗ) và `material-viewer.html` (1 chỗ).
- Một câu ngoại lệ trong `materials/README.md`, `AGENTS.md` (tiếng Việt), `CLAUDE.md` (tiếng Anh).

Kiểm Playwright Chromium qua `python3 -m reloadserver 8765`, 1600×900 và 390×844, với tệp tạm `materials/lec-05c/lecture-note.md` (xóa sau khi kiểm, sync lại 16 tệp, `--check` OK):

| Kiểm | Kết quả |
|---|---|
| 05c không có `deck` (HTTP và `file://`) | Hiển thị đúng, không có `#deck-link`, 0 `.katex-error`, không cuộn ngang |
| Hồi quy 05b có `deck`; 05 có `deck` qua `file://` | `#deck-link` có `href` đúng |
| 05 thiếu `deck` | Báo "Đường dẫn tài liệu hoặc bộ trang chiếu không đúng quy ước." |
| 05c kèm deck của 05; 05c kèm `deck=khong-hop-le.html` | Báo "Số bài … không khớp"; báo lỗi mẫu |

Mọi trang mở qua HTTP có một lỗi CSP "inline script" do thẻ `<script>` live-reload mà reloadserver chèn khi phục vụ; tệp trong kho không có script nội dòng, và qua `file://` không có lỗi console. Ảnh chụp ở `/tmp/claude-1000/lec05c-viewer/`.

## Tự kiểm no-ai-slop

Lượt 1 (chế độ Edit, đã đọc `SKILL.md` và `eval.md`; phạm vi `outline.md`, `storyboard.md`, nhật ký này): đạt các nhóm kiểm của `eval.md`; quét không thấy "chúng ta", "hãy", "quan trọng", "then chốt", "lưu ý", "nhấn mạnh", "thực sự", "tiếp theo", dấu chấm than hay câu hỏi tu từ; tiêu đề gọi tên khái niệm; gạch ngang dài chỉ trong tiêu đề "Mã — Tên" và ô trống của bảng. Cổng storyboard phát hiện một lời bình chung chung bị bỏ sót ("trục của toàn bài", phát hiện G22).

Lượt 3 và lượt 4 (chế độ Edit, đọc lại `SKILL.md` và `eval.md`; phạm vi ba tệp): đã thay câu ở phát hiện G22 bằng vai trò cụ thể; quét lại thêm các cụm "trục", "cốt lõi", "toàn diện", "đóng vai trò", "đáng kể"; cột quyết định viết lý do bằng đối tượng và phát hiện, không bằng lời đánh giá; nhịp câu của các trường cố định vẫn lặp theo mẫu Bài 05b (đạt có điều kiện).

## Soạn ghi chú, lượt soạn 1 (phần A–E), 2026-10-08

Phạm vi: `materials/lec-05c/lecture-note.md`, heading `#` và phần A–E, 24 tiểu mục `###` từ §A.1 đến §E.7 theo đúng thứ tự của outline; cuối tệp có `<!-- F–H: lượt sau -->`. Đã chạy `sync-local-materials.py` (17 tệp), `--check` OK; `git diff --check` sạch. Chưa commit.

| Phần | Số từ (`split`) | Ngân sách outline | Ghi chú |
|---|---:|---|---|
| A | 906 | 700–850 | vượt 6,6 % (trong giới hạn 10 %); thêm câu viết đủ LLO, CLO và bảng ký hiệu rút gọn |
| B | 1 376 | 1 300–1 600 | |
| C | 1 298 | 1 300–1 600 | thiếu 2 từ |
| D | 1 181 | 1 150–1 400 | |
| E | 2 474 | 2 150–2 500 | |
| Tổng A–E | 7 261 | 6 600–7 950 | |

Hình đã tham chiếu (SVG vẽ ở lượt sau): `birthday-and-batch-duplicates.svg` (§B.4), `monty-hall-tree.svg` (§C.1), `test-tree-natural-frequencies.svg` (§C.2), `two-dice-pmf.svg` (§E.3), `batch-gradient-pmf.svg` (§E.5). Alt theo storyboard.

Kiểm trình duyệt (Playwright Chromium, `material-viewer.html?doc=materials/lec-05c/lecture-note.md`, không `deck`, qua `http://localhost:8765` và `file://`, 1600×900 và 390×844): 0 `.katex-error` (698 công thức), mục lục 29 mục (5 phần, 24 tiểu mục), 6 khối `hint`/`solution` gập mặc định, không có `#deck-link`, không cuộn ngang, cỡ chữ thân nhỏ nhất 16,64 px. Lỗi console còn lại: 5 lỗi 404 của năm SVG chưa vẽ; qua HTTP thêm lỗi CSP của script live-reload do reloadserver chèn. Ảnh chụp ở `/tmp/claude-1000/lec05c-viewer/note-*.png`, đã xem 1600×900 và 390×844.

Chỗ lệch outline và lý do:

1. Ghi chú không dùng nhãn Q1–Q4b (nhãn lập kế hoạch); §A.2 đánh số năm câu hỏi kèm tên "Tâm", "Sai số điển hình", "Xác suất sai lệch", "Trung bình hay tổng", "Cỡ nhóm".
2. §D.3 không dẫn `img/lec-00/probability-pmf-pdf-cdf.svg`: hình dùng dấu chấm thập phân (0.7, 0.3) và phân phối đều trên $[0,2]$, không khớp ví dụ $[0,1]$ của §D.3.
3. Mệnh đề E.12 thêm ý (3): $X$ độc lập với $Y$ thì $\mathbb E[X\mid Y]=\mathbb EX$. Ý này dùng cho trung bình trong nhánh ở cây hai bước (§E.7) và cho dẫn xuất ở §G.6; chứng minh một dòng từ Định nghĩa C.5.
4. Câu hỏi kiểm tra cuối phần E là $\mathbb E(\theta_1-1)^2\approx0{,}837$ trên cây hai bước, nối với đệ quy $a_1=0{,}81a_0+\frac{8}{300}$ của §G.6.
5. Ví dụ trùng mũ (VD-11) viết thành đoạn văn sau ví dụ $D_b$, không đặt tên biến, để tránh trùng $M$ (Hoeffding), $K$ (số bước), $V$ (phản ví dụ E.7).
6. 317 dấu câu đứng ngay sau công thức nội dòng được chuyển vào trong công thức (dấu hai chấm thành `\text{:}`), để dấu câu không rơi xuống dòng riêng ở màn hẹp, theo cách Bài 05b đã làm. *Sửa ở biên tập lượt 1 (R14): câu này sai, học liệu Bài 05b đặt dấu câu ngoài công thức; các dấu câu đã được chuyển ra ngoài.*
7. "Lượt (epoch)" xuất hiện lần đầu ở §B.4, sớm hơn §H.2 của bảng thuật ngữ.

Số mới chưa có trong bảng số, cần tái kiểm toán: $P(+_2\mid+_1)=0{,}0034/0{,}0509\approx0{,}067$ (§C.4); cận hợp $n=30$: $435/365>1$ (§B.5); cận hợp cho nhóm $b=32$: $496/1000$ (câu hỏi cuối phần B); $\mathbb ES^2=1974/36$, $\operatorname{Var}X_1=91/6-3{,}5^2=35/12$ (§E.1, §E.4); $P(S\le7)=21/36$ (§D.1); xác suất $\pm2$ giảm từ $\tfrac23$ xuống $\tfrac29$ (§E.3); $\mathbb E(\theta_1-1)^2=2{,}51/3\approx0{,}837$ (câu hỏi cuối phần E); lợi nhuận $-\tfrac1{12}$ theo quy ước thắng ròng (lấy từ bảng số, mục 6).

Tự kiểm no-ai-slop (chế độ Edit, `eval.md`): không "chúng ta", "hãy", câu cảm thán, câu hỏi tu từ; đã thay "ta lấy" bằng câu bị động và bỏ cụm "cho thấy điều này rõ hơn" (lời bình); tiêu đề `###` là tên khái niệm, không công thức; câu hỏi dùng khối `exercise`; gạch ngang dài chỉ trong heading `#`. Nhịp câu ở các đoạn "nhu cầu → trực giác → ví dụ → định nghĩa" lặp theo cấu trúc hành trình sáu bước (đạt có điều kiện).

Ghi chú cho lượt sau: bảng ký hiệu của outline ghi $d$ là số chiều tham số "như Bài 05", nhưng Bài 05 dùng $p$ cho số chiều tham số và $d$ cho số chiều đặc trưng; cần chốt trước khi viết §G.3 (VD-17b).

## Soạn ghi chú, lượt soạn 2 (phần F–H và tài liệu tham khảo), 2026-10-08

Phạm vi: thay `<!-- F–H: lượt sau -->` bằng phần F (6 tiểu mục), G (7), H (3) và `## Tài liệu tham khảo`. Ghi chú đủ 40 tiểu mục theo outline. Outline đồng bộ các chỗ lệch của lượt soạn 1 (tên năm câu hỏi, Mệnh đề E.12 ý (3), câu hỏi cuối phần E, bỏ hình Bài 00 ở §D.3, ký hiệu $d$ với câu đối chiếu $p$ của Bài 05) và của lượt này (câu hỏi cuối F, G, ba câu hỏi ở §H.3, bảng VD-20). Chưa commit.

| Phần | Số từ | Ngân sách outline | Ghi chú |
|---|---:|---|---|
| F | 2090 | 2 200–2 600 | thiếu 5 % (trong giới hạn 10 %) |
| G | 2535 | 2 050–2 400 | vượt 5 %: §G.6 có dẫn xuất, bảng VD-20 và ba giới hạn bắt buộc |
| H | 668 | 500–650 | vượt 3 % |
| Tài liệu tham khảo | 189 | 150–200 | |
| Tổng ghi chú | 12764 | 11 500–13 800 | |

Hình đã tham chiếu trong ghi chú: đủ 11 tệp (H-01…H-11), lượt này thêm `indicator-dominating-functions.svg` (§F.4), `coin-tail-three-bounds.svg` và `lln-deviation-vs-n.svg` (§F.6), `sum-vs-mean-contraction.svg` (§G.4), `stderr-and-cost-vs-b.svg` (§G.5), `budget-u-curve.svg` (§G.6). SVG chưa vẽ.

Kiểm trình duyệt (Playwright Chromium, không `deck`, `http://localhost:8765` và `file://`, 1600×900 và 390×844): 0 `.katex-error` (1 292 công thức), mục lục 49 mục (9 mục `##`, 40 tiểu mục), 11 khối `hint`/`solution` gập, không có `#deck-link`, không cuộn ngang trang, cỡ chữ thân nhỏ nhất 16,64 px. Lỗi console còn lại: 404 của 11 SVG chưa vẽ; qua HTTP thêm lỗi CSP do reloadserver. Ở 390 px, bảng và công thức khối rộng cuộn ngang bên trong khối (`overflow-x: auto`), giống Bài 05b (42 công thức khối như vậy); mười công thức rộng nhất (từ 500 px) đã tách thành nhiều dòng `aligned`, công thức rộng nhất còn lại 480 px. Đã xem ảnh chụp chứng minh Định lý F.6 (390 px) và bảng VD-20 (1600 px). `sync` (17 tệp), `--check` OK, `git diff --check` sạch.

Chỗ lệch outline và lý do:

1. §F.1 không dẫn BĐ6 của Bài 05b; theo phạm vi dẫn 05b (G24), BĐ6 chỉ được nhắc ở §G.7.
2. Dạng entropy tương đối của Chernoff (VD-16, $2{,}08\cdot10^{-6}$) không đưa vào ghi chú; chỉ có một câu về dạng nhân (Koller và Friedman, Định lý A.4).
3. Bảng VD-20 trình bày bốn cột theo $b$ (thay chín cột theo kế hoạch) để đọc được ở 390 px; thêm ô $b=75$, $B=300$ ($K=4$, $a_4\approx0{,}432$), ô $b>B$ ghi rõ thay vì để trống.
4. Nhận xét G.6 gọi $\mathcal E_{\rm opt}$ là "sai số tối ưu do tối ưu không chính xác" (SNW dùng sai số tối ưu theo dung sai $\rho$).
5. 250 dấu câu đứng sau công thức nội dòng được chuyển vào công thức, như lượt 1 (đã hoàn tác ở biên tập lượt 1, R14).
6. Phần H kết bằng một câu nêu cách phần G và Bài 05b dùng các kết quả, theo yêu cầu "câu kết một câu".

Số mới cần tái kiểm toán: cận Markov gấp $\tfrac{84}{11}\approx7{,}6$ lần giá trị đúng ("gần tám lần", §F.2); cận Chernoff $3{,}73\cdot10^{-6}$ gấp khoảng 13 lần xác suất đúng và nhỏ hơn $0{,}04$ khoảng $10^4$ lần (§F.4); câu hỏi cuối F: $10\,000$ và $1\,060$; câu hỏi cuối G: $a_{60}\approx0{,}00281$ ($b=50$); $B=300$, $b=75$: $0{,}432$; §H.3: $\sqrt{1/45}\approx0{,}149$, $\sqrt{\ln40/10^4}\approx0{,}0192$, $0{,}0140$ và $0{,}124$ ("gần chín lần"); giá trị giới hạn $b=4$: $\tfrac2{57}\approx0{,}035$ (khớp giá trị giới hạn chính xác của Bài 05b; bản này ghi nhầm là "sàn nhiễu", sửa theo R1).

Tự kiểm no-ai-slop (chế độ Edit, `eval.md`): không "chúng ta", "hãy", câu cảm thán, câu hỏi tu từ; đã thay "không đáng kể" bằng độ lớn cụ thể ($10^{-6}$); chứng minh nêu bước và giả thiết dùng; mọi bảng ghi cận một phía hay hai phía; câu kết phần H là một câu nêu đối tượng dùng kết quả, không khẩu hiệu. Nhịp "nhu cầu → trực giác → ví dụ → phát biểu" lặp theo hành trình sáu bước (đạt có điều kiện).

## Bài tập và hình, lượt soạn 3, 2026-10-08

**Bài tập.** `materials/lec-05c/exercises.md`: 3 320 từ (ngân sách 3 500–4 500, thiếu 5 %); 10 bài, mỗi bài có tiêu đề `## Bài k.`, dòng "Mức độ", khối `exercise`, `hint`, `solution`; mục `## Nguồn` cuối tệp. Mức: nhận biết (Bài 1–3), tính toán hoặc chứng minh (Bài 4–8), vận dụng vào AI (Bài 9 LLO12, CLO2; Bài 10 LLO11, LLO12, CLO1, CLO2). Lời giải ghi nhãn kết quả dùng ở từng bước.

Chỗ lệch storyboard: tham số của các câu trùng ví dụ trong ghi chú được đổi (outline và storyboard đã đồng bộ): Bài 1 dùng "tổng bằng 8" và thêm câu 4 ($P(A\mid C)$); Bài 3 dùng ba biến cố chẵn lẻ trên hai xúc xắc và rút từ $\{1,2,3,4\}$ (Nhận xét C.6 và ví dụ $\{-1,1,3\}$ đã có trong ghi chú); Bài 4 câu 2 giới hạn $2^{10}$, câu 4 Monty Hall bốn cửa; Bài 5 câu 1 $N=200$, $b=50$, câu 2 $2N$ lần rút, bỏ câu trùng mũ (đã có trong ghi chú); Bài 6, 7 thêm câu 4; Bài 8 dùng $k=65$, $70$; Bài 9 tại $\theta=0$, câu 3 với $d=100$, $\varepsilon=0{,}05$, $\delta=0{,}01$, thêm câu 4; Bài 10 dùng $\eta=0{,}05$, $B=1200$, $\varepsilon=0{,}02$, $\delta=0{,}01$.

Số mới cần tái kiểm toán (tác tử soạn tính bằng `python3 -I`): Bài 1: $5/36$, $2/36$, $2/11$, $55/1296$; Bài 3: các xác suất $\tfrac14$, $\tfrac16$; Bài 4: $11$, $\tfrac38$, CDF $\tfrac1{16},\tfrac5{16},\tfrac{11}{16},\tfrac{15}{16}$; Bài 5: $44{,}34$, $0{,}1352$, $7\,485$; Bài 6: $0{,}99575$, $\sqrt{0{,}99575}\approx0{,}9979$; Bài 7: $n\ge1\,000$, Hoeffding $\approx600$; Bài 8: $0{,}769$, $0{,}714$, $0{,}111$, $0{,}0625$, $e^{-4{,}5}\approx0{,}0111$, $e^{-8}\approx3{,}35\cdot10^{-4}$, giá trị đúng $0{,}00176$ và $3{,}93\cdot10^{-5}$ (bảng số mục 3a), tỉ số "10 lần", "khoảng 190 lần", "6 và 9 lần"; Bài 9: PMF tại $\theta=0$, $b\ge7\,923$, $3\,684$; Bài 10: $b>40$, $0{,}00702$, $0{,}00530$, $0{,}0171$, đáy $b=34$ ($a_K\approx0{,}00475$), $6\,623$.

**Hình.** 11 SVG trong `img/lec-05c/`, sinh bằng `/home/tqlong/.claude/jobs/bebeea85/tmp/lec-05c-make-svgs.py` (ngoài kho; chạy `python3 -I lec-05c-make-svgs.py 2627-1/img/lec-05c`). Mọi hình: `viewBox` rộng 600, `role="img"`, `title`, `desc`, nền trắng, mọi chữ 22 đơn vị, tối đa bốn đường mỗi bảng, phân biệt đường bằng nét (liền, đứt, chấm, chấm gạch) và ký hiệu điểm, nhãn trực tiếp. Số liệu tính trong mã từ công thức, khớp bảng số (tổng nhị thức chính xác cho H-06, H-07).

| Mã | Tệp | `viewBox` | Tiểu mục |
|---|---|---|---|
| H-01 | `birthday-and-batch-duplicates.svg` | 600×600 | §B.4 |
| H-02 | `test-tree-natural-frequencies.svg` | 600×420 | §C.2 |
| H-03 | `monty-hall-tree.svg` | 600×440 | §C.1 |
| H-04 | `two-dice-pmf.svg` | 600×400 | §E.3 |
| H-05 | `indicator-dominating-functions.svg` | 600×330 | §F.4 |
| H-06 | `coin-tail-three-bounds.svg` | 600×460 | §F.6 |
| H-07 | `lln-deviation-vs-n.svg` | 600×440 | §F.6 |
| H-08 | `batch-gradient-pmf.svg` | 600×340 | §E.5 |
| H-09 | `stderr-and-cost-vs-b.svg` | 600×600 | §G.5 |
| H-10 | `budget-u-curve.svg` | 600×460 | §G.6 |
| H-11 | `sum-vs-mean-contraction.svg` | 600×420 | §G.4 |

Viewer hiển thị hình `img/lec-*` rộng 900 px ở cả hai cỡ màn hình (CSS chung: `width: 100%; min-width: 900px`), nên chữ 22 đơn vị thành 33 px. Ở 1600×900, cột nội dung rộng 762–808 px, nên mép phải hình bị che và phải cuộn ngang trong đoạn chứa hình; Bài 05b có cùng hiện tượng. Không sửa CSS chung trong lượt này; chuyển điều phối viên quyết (N11).

Kiểm: đã chụp và xem từng SVG ở bề rộng 900 px; sửa vị trí nhãn ở H-03, H-05, H-06, H-07, H-09, H-10, H-11 để chữ không chồng lên đường. Alt H-05 trong ghi chú và storyboard đổi "e^{λ(x−a)}" thành "exp(λ(x−a))" cho khớp nhãn hình; các alt khác khớp nội dung hình. Viewer (`http://localhost:8765` và `file://`, 1600×900 và 390×844): ghi chú 0 `.katex-error`, mục lục 49, 11 hình nạp đủ, 11 khối gập; bài tập 0 `.katex-error`, mục lục 11, 20 khối gập; không `#deck-link`; không cuộn ngang trang; không lỗi console ngoài lỗi CSP do reloadserver chèn script (chỉ qua HTTP). `sync` (18 tệp), `--check` OK, `git diff --check` sạch.

Tự kiểm no-ai-slop (bài tập, chế độ Edit): không "chúng ta", "hãy", câu cảm thán, câu hỏi tu từ; câu hỏi là nhiệm vụ học tập ("Tính", "Chứng minh", "Tìm"); đã thay "chỉ đáng kể khi" bằng "chỉ lớn khi"; lời giải nêu kết quả dùng ở từng bước.

## Rà soát học liệu (năm vai) và biên tập lượt 1, 2026-10-08

Năm vai rà soát chỉ đọc chạy song song trên `lecture-note.md` (1 123 dòng), `exercises.md` (252 dòng) và 11 SVG: SV (sinh viên), CG (chuyên gia), TH (chính xác toán học), PB (phản biện học thuật, sư phạm, no-ai-slop), MC (mạch lập luận). Điều phối viên Fable 5.1 kiểm từng phát hiện, hợp nhất thành R1–R27 và nhóm nhẹ, ghi quyết định (`sửa`, `sửa theo cách khác`, `bác bỏ`) trong tệp hợp nhất `lec-05c-review-merged.md` ở thư mục tạm của phiên. Tác tử biên tập (lượt biên tập 1) thực hiện mọi mục `sửa`; trạng thái dưới đây là của tác tử biên tập, chờ điều phối viên duyệt và tái kiểm toán, mạch. Nhãn trong bảng theo đánh số mới (R12), và nhãn trong các mục cũ của nhật ký này cũng đã đổi theo; số dòng là của bản trước biên tập.

### Nghiêm trọng

| mã | vai | mục | vấn đề | quyết định điều phối viên | trạng thái |
|---|---|---|---|---|---|
| R1 | CG, TH, PB, MC | §G.6, Nhận xét G.7, review-log, outline | Gọi giá trị giới hạn $\frac8{57b}$ là "sàn nhiễu của Bài 05b"; 05b không có dạng tổng quát của giá trị giới hạn cho hàm lồi mạnh. Lỗi bắt nguồn từ brief của điều phối viên | `sửa` | Đã sửa: Nhận xét G.7 nêu $\frac8{57b}$ là giá trị giới hạn chính xác Bài 05b tính cho Ví dụ A ($b=4$: $0{,}035$), sàn nhiễu $\frac4{15b}$ của T5 ($b=4$: $0{,}0667$) là cận trên, gần gấp đôi; câu sau khối dẫn xuất §G.6 nêu dạng $\frac{\eta\sigma^2}{c(2-\eta c)}$ cho hàm bậc hai một chiều độ cong $c$ và cận $\eta\sigma^2/c$ của T5. Khác quyết định: dùng $c$ thay $\mu$ vì trong 05c $\mu$ chỉ là kỳ vọng (quyết định sau cổng, phát hiện G1); ghi "Bài 05b ký hiệu là $\mu$". Outline (chuỗi bậc 6, bảng nền, đoạn sau danh mục G) và câu ở lượt soạn 2 dưới đây đã sửa |
| R2 | CG, MC, SV | §G.6 câu nối trước Nhận xét G.6 | Áp Định lý G.2 ngoài G4; trộn $\nabla J$ với sai số đối với $R$ | `sửa` | Đã sửa: ba câu theo văn bản quyết định (θ cố định; cận đều của Bottou và Bousquet, SNW tr. 357; kết luận về độ chính xác tối ưu $\rho$); Nhận xét G.6 thêm "$\rho$" |
| R3 | SV | §G.6 ví dụ ngân sách, ba hạn chế, Bài tập 10.2 | Ví dụ có $L=1$ nên $\eta=1$ hợp lệ; đường chữ U dễ hiểu ngược | `sửa` | Đã sửa: đoạn khung trước bảng (bước bị chặn bởi $1/L_{\max}$; hướng có độ cong $0{,}1L_{\max}$, $\kappa=10$, hệ số $0{,}9$; GD cần cỡ $\kappa\ln(1/\varepsilon)$ bước vì Bài 04 cho hệ số co $1-1/\kappa$ với bước $1/L$ và $(1-1/\kappa)^k\le e^{-k/\kappa}$); hạn chế thứ nhất viết lại; lời giải Bài 10.2 cùng khung. Bài 04 (`materials/lec-04/lecture-note.md`, mục hội tụ tuyến tính) có hệ số $1-1/\kappa$ nhưng không phát biểu số bước; ghi chú suy ra số bước bằng một dòng |
| R4 | SV, tác tử soạn (N11) | CSS chung `material-viewer.css` | `min-width: 900px` cắt hình ở cột 762–808 px | `sửa` CSS chung | Đã sửa: màn rộng `width:100%; max-width:100%`; `@media (max-width: 1000px)` giữ `min-width: 900px` và cuộn ngang trong đoạn chứa hình (chủ ý của 8abb918). CSS nạp không có `?v=`, nên không đổi chuỗi phiên bản. Kiểm hồi quy ở mục dưới |
| R5 | MC | §H.1 hàng "Cỡ nhóm" | Chỉ liệt kê công cụ | `sửa` | Đã sửa: $1/\sqrt b$ so với $b$; chữ U, đáy $b=75$ khi $B=3000$ ($0{,}00209$) so với $0{,}810$; dữ liệu dư thừa; Nhận xét G.6 |

### Trung bình

| mã | vai | mục | vấn đề | quyết định điều phối viên | trạng thái |
|---|---|---|---|---|---|
| R6 | SV, MC | §G.4 | Lẫn tổng trên dữ liệu với tổng trên nhóm; mốc $b=10$, $b=20$ chưa gọi tên | `sửa` | Đã sửa: Mệnh đề G.4 (iii) $\eta\le1/(bL)$ có chứng minh, (iv) phương sai; câu dẫn nêu kế thừa từ Định lý G.3 (kỳ vọng và độ lệch đều nhân $b$); ví dụ gọi tên $b=10\leftrightarrow\eta b=1/L$, $b>20\leftrightarrow\eta bL>2$; alt và hình H-11 có hai mốc |
| R7 | SV, MC | cuối §H.3 | Đoạn kết chỉ tóm tắt | `sửa` | Đã sửa: hai câu trả lời có số ($\eta\le1/L$, phương sai $1/b$; $1/\sqrt b$ so với $b$, $0{,}00209$ so với $0{,}810$; $1/\sqrt N$); không có câu tổng kết sau |
| R8 | CG | §E.7, §G.7, Nhận xét G.7 | Mệnh đề E.12 (3) không áp trực tiếp cho $g_{I_2}(\theta_1)$ | `sửa` | Đã sửa: Mệnh đề E.12 (4) với chứng minh một dòng; dẫn ở cây hai bước (§E.7), H6 (§G.7) và Nhận xét G.7. Dẫn xuất §G.6 giữ (3) vì $\zeta_k$ độc lập với $\theta_k$ |
| R9 | CG | §B.4, §H.2, Bài tập 10.4 | Khẳng định thực hành không nguồn; câu "các công thức phương sai dùng rút có hoàn lại" mâu thuẫn E.10, G.3 | `sửa` | Đã sửa: §B.4 dẫn GBC §8.1.3 tr. 280–281; §H.2 theo văn bản quyết định; lời giải Bài 10.4 thêm câu về điều kiện theo lịch sử trong lượt |
| R10 | CG | §G.4, bảng §H.1 | "bước đã chọn vẫn dùng được" vượt điều đã chứng minh | `sửa` | Đã sửa: điều kiện ổn định không đổi; giá trị giới hạn gần tỉ lệ với $\eta/b$, bước tốt nhất có thể đổi theo $b$ |
| R11 | CG | §G.1 | Sai nguồn | `sửa` | Đã sửa: GBC §5.3, tr. 121; thêm vào mục Tài liệu tham khảo |
| R12 | PB, SV, CG, MC | phần D, G | Đánh số sai thứ tự; "G.0" | `sửa` | Đã sửa bằng script (bảng ánh xạ D.6→D.4, D.4→D.5, D.5→D.6; G.$k$→G.$(k+1)$, $k=0..6$) trên ghi chú, bài tập, outline, storyboard, nhật ký này; mã tiểu mục `§` không đổi; grep không còn "G.0" và mọi dẫn chiếu D.4–D.7, G.1–G.7 đúng đối tượng |
| R13 | PB, MC | §F.6, Bài tập 8, alt H-06 | Một cận hai tên | `sửa` | Đã sửa: cột "Định lý F.6 (một phía)", câu dẫn ghi một lần trùng F.8 với $[0,1]$; alt và nhãn H-06 đổi theo |
| R14 | PB | dấu câu trong công thức | Ghi chú và bài tập khác quy ước | `sửa theo cách khác` | Đã sửa: script chuyển 569 khoảng công thức nội dòng có dấu câu cuối (40 `\text{:}`) ra ngoài; 0 `\text{:}`, 0 dấu `,` `.` `;` `:` ngay trước `$` đóng; $k=1,2,\dots$ và các tập hợp giữ nguyên. Quy ước: học liệu đặt dấu câu ngoài công thức như Bài 05b, deck đặt trong. Câu sai ở lượt soạn 1 (mục 6) đã ghi chú sửa |
| R15 | PB, SV | bình luận đối chiếu nguồn | Metadiscourse | `sửa` | Đã sửa: giữ trích dẫn ngắn; nhận xét so sánh nguồn chuyển xuống mục "Khác biệt với nguồn" dưới đây |
| R16 | PB | "kết quả chuẩn" lặp | Lặp | `sửa` | Đã sửa: chỉ còn câu ở mục Tài liệu tham khảo; Mệnh đề D.7 và Bổ đề F.7 ghi "không chứng minh" |
| R17 | PB, MC | §E.4 | Thiếu nhu cầu | `sửa` | Đã sửa: đoạn nhu cầu (E.9 cần phương sai của tổng; E.7 chưa đủ; $X_1+X_1$ và $X_1+X_2$) |
| R18 | PB, MC | cầu nối 05b lặp; LN:1084 sai chiều | Lặp | `sửa` | Đã sửa: §G.7 là nơi chính (H6, H6b theo ký hiệu 05c, tính chất tháp); bỏ nhắc 05b ở §E.7 và §H.2 gạch đầu dòng 1; câu §H.2 "Định lý G.3 và Nhận xét G.7 cho điều kiện để H6, H6b của Bài 05b đúng" |
| R19 | PB, MC | §E.5 | Đoạn bốn ý | `sửa` | Đã sửa: tách ba đoạn; vế chi phí còn một câu trỏ sang phần G; câu Polyak chuyển sang §H.2 |
| R20 | PB | §G.6 | Dẫn xuất không trong khối | `sửa` | Đã sửa: `::: derivation Sai số sau K bước` |
| R21 | SV | Nhận xét F.10 | $1{,}96$ xuất hiện trước khi giới thiệu | `sửa` | Đã sửa: Nhận xét F.10 đặt trước ví dụ thăm dò, nêu i.i.d., $0<\sigma_1<\infty$ và $P(\lvert Z\rvert\ge1{,}96)\approx0{,}05$ |
| R22 | SV | "mômen", "hàm sinh mômen" | Thuật ngữ chưa định nghĩa | `sửa` | Đã sửa: mômen bậc $k$ trong Định nghĩa E.5; $M_X(\lambda)$ ở ví dụ một đồng xu, kèm câu nối Bước 1 của F.6; §D.4 nói "các tích $e^{\lambda X_i}$". Khác quyết định ở một chỗ: G2 (§A.3) bỏ chữ "mômen" thay vì định nghĩa sớm |
| R23 | SV | St. Petersburg | Không nói nghịch ở đâu | `sửa` | Đã sửa: hai câu; bậc $\log_2n$ ghi "phát biểu không chứng minh" vì không có nguồn trong `sources/` |
| R24 | SV | phân phối hình học | Bài tập 4.3, 5.3 dùng tính không nhớ chưa có | `sửa` | Đã sửa: đoạn sau Định nghĩa D.3 chứng minh $P(K>k+m\mid K>k)=P(K>m)$; $\mathbb EK=1/p$ để ở Bài tập 4.3 (gợi ý trỏ về đoạn này) |
| R25 | MC | ranh giới F → G | Nhu cầu "số bước" nhận muộn | `sửa` | Đã sửa: câu nối hai vế (tham số cố định; SGD với sai số mỗi bước và số bước) |
| R26 | MC | Bài tập 10.2 | Quy ước $b=1200$ cần $N=1200$ | `sửa` | Đã sửa |
| R27 | MC, SV | Bài tập 9.1 | Gần trùng câu hỏi cuối D và §E.6 | `sửa` | Đã sửa: $b=3$ có hoàn lại tại $\theta=0$: PMF $\frac{1,3,6,7,6,3,1}{27}$ trên $1,\tfrac13,\dots,-3$, phương sai $\tfrac89$; câu 2 so $\tfrac8{27}\approx0{,}296$ với cận $\tfrac89$, và giữ trường hợp dấu bằng $b=2$ không hoàn lại ($\tfrac23$). Số mới cần tái kiểm toán |

### Nhẹ

| vai | nội dung | quyết định | trạng thái |
|---|---|---|---|
| TH | "≈600" → "≈599,1, $n\ge600$"; điểm cắt $n=108$; "$n<25$"; "trong bảng từ $b=32$ (điểm cắt $b=23$)"; $N\ge2$ ở E.10, G.3; "6 và 8,5 lần"; "từ hai lần trở lên"; tách nghìn | `sửa` | Đã sửa; tách nghìn: văn bản và bảng "3 000", công thức bốn chữ số không tách ($5556$), từ năm chữ số dùng `\,` |
| CG | song song phần cứng + GBC tr. 279; BV §7.4.2 tr. 379; KF (12.3) tr. 491 trường hợp Bernoulli; KF A.3 "cùng dạng"; E.7 chứng minh qua tổng trên $\Omega$; quy ước $\mathbb EZ=+\infty$ ở F.4; trường hợp mật độ không chứng minh (D.5, D.6); Bài tập 7.4 (F.8 hai phía $2e^{-5}\approx0{,}0135$, F.9 $n\ge600$, lý do không đạt dấu bằng qua điều kiện của F.1); mục Nguồn bài tập; câu $d$ và số đặc trưng | `sửa` | Đã sửa |
| PB | "giới hạn" → "hạn chế"/"phạm vi" (tiêu đề H đổi thành "Bảng tra, phạm vi áp dụng và câu hỏi tự kiểm"); "rủi ro kỳ vọng", "xác suất đúng"; bỏ câu đối chiếu Bài 00 lặp (giữ §A.3); bỏ lời bình quá trình soạn (§A.3, đầu bài tập); câu dẫn H-05, alt "Ba khung hình"; "Giả sử chỉ biết kỳ vọng của $Z\ge0$"; bỏ lặp chữ ở §F.3; "chỉ ảnh hưởng tới cỡ nhóm qua $\ln d$"; trùng mũ thành khối; §B.1 đảo trực giác; "xếp theo năm câu hỏi"; "trang chiếu", "chương 13"; tên Định nghĩa D.3, D.6; đề Bài 7.2; rút câu giảng lại ở Bài 6, 7, 10 | `sửa` | Đã sửa |
| PB | thêm LLO/CLO cho Bài 1–8 | `bác bỏ`: planning đã quyết chỉ ghi ở bài vận dụng vì đề cương không có LLO xác suất | Không làm |
| SV | bỏ mã LLO/CLO khỏi đề bài | `bác bỏ`: học liệu 05b ghi LLO trong dòng "Mức độ"; giữ nhất quán | Không làm |
| SV | bỏ tham chiếu xuôi $\Sigma/b$ (§C.3); trùng mũ; tách §E.5; H6, H6b bằng ký hiệu 05c; bỏ $\sigma_b^2$; H-05 sau F.4; H-10 tên trục $a_K$ và dời nhãn "b = 10: 0,0158"; chữ Việt trong `\text{}` → ký hiệu $M$ | `sửa` | Đã sửa; ngoài phạm vi nêu, cũng thay `\text{}` chứa chữ không có trong phông KaTeX (gây cảnh báo console): biến cố $E$ (chỉ số lặp), $A_j$ (mẫu $j$ xuất hiện), $\forall$ ở Định nghĩa D.6; ở bài tập Bài 3, 5, 6 |
| MC | §H.2 "$\eta$ cố định"; hàng "Xác suất sai lệch" nêu dạng cận và $\ln(1/\delta)$ so với $1/\delta$; $F_b\to\bar a_b$; "phần D, F và G"; câu nhu cầu §C.2, §F.6; gọi tên câu hỏi ở §E.5, đầu F, §F.3, §G.4, §G.5; số $0{,}0095$ ở §G.1; câu H6a (CG) | `sửa` | Đã sửa |

### Quyết định kèm theo

- **N11 → R4.** Điều phối viên quyết sửa CSS chung cho mọi bài thay vì giữ như 05b. Kiểm hồi quy Playwright (HTTP qua reloadserver), ghi chú Bài 04, 05, 05b, 05c: ở 1600×900 hình rộng bằng cột (808 hoặc 762 px), 0 hình tràn, 0 khối cuộn ngang, 9/8/18/11 hình nạp đủ, 0 `.katex-error`; ở 390×844 hình rộng 900 px trong đoạn cuộn ngang (`overflow-x: auto`), trang không cuộn ngang. Đã xem ảnh chụp một hình mỗi bài ở 1600×900 và ảnh Bài 04, 05c ở 390×844 (`/tmp/claude-1000/lec05c-edit/css-*.png`). Lỗi console duy nhất là CSP của script live-reload do reloadserver chèn.
- **R14.** Quy ước dấu câu: học liệu (ghi chú, bài tập) đặt dấu câu ngoài công thức nội dòng như Bài 05b; deck đặt trong công thức.

### Khác biệt với nguồn (chuyển khỏi ghi chú theo R15)

- Koller và Friedman (Định nghĩa 2.1, tr. 15–16) chỉ đòi cộng tính hữu hạn; Định nghĩa B.1 và Bài 00 dùng cộng tính đếm được; Bài 00 viết bộ ba $(\Omega,\mathcal F,\Pr)$.
- Monty Hall: Goodfellow và cộng sự (§3.1, tr. 54) chỉ nêu bối cảnh của trò chơi; giả thiết về người dẫn và lời giải tự xây dựng.
- Bài 00 dùng cùng các định nghĩa ở §C.2 (dạng Bayes cho biến), §D.1, §E.1 với ký hiệu $\Pr$.
- Niu (2024, trang chiếu 162) có cùng hệ số $\frac{N-n}{N-1}$ trong phân tích lấy mẫu không hoàn lại.
- Koller và Friedman (Bài tập 2.12, tr. 40) phát biểu Markov với $t\ge0$; vế phải chỉ xác định khi $\varepsilon>0$; Boyd và Vandenberghe (§7.4.1) cho dạng chuẩn hóa.
- Koller và Friedman (Phụ lục A.2.1, tr. 1144) nêu luật số lớn bằng lời; chứng minh trong ghi chú dùng Chebyshev.
- Boyd và Vandenberghe (§7.4.2, tr. 379) viết cận Chernoff dưới dạng $\inf_{\lambda\ge0}\mathbb Ee^{\lambda(X-a)}$; (7.20) là dạng lấy logarit.
- Định lý F.6 cùng dạng với Koller và Friedman, Định lý A.3, khi $p=\tfrac12$; dạng Hoeffding cho biến bị chặn bất kỳ (Định lý F.8) không có trong kho.
- Goodfellow và cộng sự (§8.1.3, tr. 280–281) phát biểu tính không chệch cho gradient của sai số tổng quát hóa khi mẫu lấy mới, không dùng lại; Định lý G.3 nói về $\nabla J$ với mẫu rút lại từ tập hữu hạn.

### Biên tập lượt 1: kiểm và số liệu

- **Phạm vi đã sửa.** `materials/lec-05c/lecture-note.md`, `exercises.md`; 4 SVG đổi qua mã sinh `lec-05c-make-svgs.py` ở thư mục tạm (H-05 mô tả "khung hình", H-06 nhãn và mô tả Định lý F.6, H-10 trục $a_K$ và nhãn $b=10$ có đường dẫn, H-11 nhãn hai mốc); 7 SVG còn lại sinh lại giống hệt; `material-viewer.css` (R4); ba tệp planning; `material-local-data.js` qua script sync.
- **Độ dài.** Số cuối sau lượt biên tập 2 và V3: ghi chú 14 114 từ, bài tập 3 452 từ (`wc -w`). Điều phối viên `chấp nhận` sai khác độ dài: ghi chú vượt trần 13 800 khoảng 2 % do các đoạn bắt buộc của R1–R7; bài tập thiếu khoảng 1 % so với sàn 3 500. Số theo phần ở lượt 1: ghi chú 14 073 từ (trần 13 800, vượt khoảng 2 %): A 890, B 1 399, C 1 341, D 1 292, E 2 590, F 2 213, G 3 148, H 904, tài liệu tham khảo 189. Phần G và H vượt ngân sách vì các đoạn bắt buộc của R1–R7 (khối dẫn xuất, đoạn khung, ba câu R2, Mệnh đề G.4 (iii), bảng tra có câu trả lời, đoạn trả lời cuối). Bài tập 3 450 từ.
- **Kiểm.** `sync-local-materials.py` (18 tệp) và `--check` OK; Playwright qua HTTP và `file://`, 1600×900 và 390×844: ghi chú 0 `.katex-error` (1 459 công thức), 11 hình nạp đủ, 11 khối gập, mục lục đủ 9 mục `##` và 40 mục `###`; bài tập 0 `.katex-error` (395 công thức), 20 khối gập; không cuộn ngang trang; không lỗi hay cảnh báo console ngoài CSP của reloadserver (cảnh báo KaTeX về chữ có dấu trong `\text{}` đã hết). Đã xem ảnh khối dẫn xuất §G.6, bảng tra §H.1, lời giải Bài 9 và bốn SVG đã đổi.
- **Số mới cần tái kiểm toán.** Bài tập 9 ($b=3$: PMF, $\mathbb ET^2=2$, phương sai $\tfrac89$, $\tfrac8{27}$); Bài tập 7.4 ($2e^{-5}\approx0{,}0135$); $0{,}0095$ (§G.1); sàn nhiễu $\frac4{15b}$, $b=4$: $0{,}0667$; điểm cắt $n=108$ và $b=23$; $(1{,}96\cdot0{,}5/0{,}03)^2\approx1067{,}1$.
- **Tự kiểm no-ai-slop (chế độ Edit, `eval.md`).** Đã bỏ lời bình nguồn (R15), lời bình quá trình soạn, câu tổng kết cuối (R7), câu "kết quả chuẩn" lặp; không "chúng ta", "hãy", câu cảm thán, câu hỏi tu từ; dấu hai chấm chỉ dẫn danh sách, nhãn hoặc phép tính; đã đổi "Điều kiện này chưa xác định bước tốt nhất: …" thành hai câu. Còn lại: các câu "Câu hỏi "…" của phần A" lặp một mẫu ở bốn chỗ theo yêu cầu MC (đạt có điều kiện).

## Tái kiểm sau biên tập lượt 1 và thẻ chỉ mục, 2026-10-08

Điều phối viên: biên tập lượt 1 `chấp nhận`. Ba tái kiểm (chuyên gia, toán, mạch) đạt, kèm chín điểm T1–T9 giao lại cho tác tử biên tập (lượt biên tập 2).

| mã | vai | mức độ | mục | vấn đề và cách sửa | trạng thái |
|---|---|---|---|---|---|
| T1 | mạch | trung bình | đoạn cuối §H.3 | So $0{,}00209$ với $0{,}810$ kèm "với cùng bước $\eta=0{,}1$ (mô hình một hướng có độ cong nhỏ, mục ngân sách ở phần G)" | đã sửa |
| T2 | chuyên gia | nhẹ | §G.1, Tài liệu tham khảo | Nguồn GBC "§5.3, tr. 121" thay "§5.3.1"; outline, nhật ký đổi theo | đã sửa |
| T3 | chuyên gia | nhẹ | §G.6, đoạn khung trước bảng VD-20 | $(1-1/\kappa)^k\le e^{-k/\kappa}$ chỉ cho điều kiện đủ: "đủ $k\ge\kappa\ln(1/\varepsilon)$ bước; theo đúng hướng đó hệ số co là $0{,}9$ nên cũng cần $\ln(1/\varepsilon)/\ln(10/9)\approx9{,}5\ln(1/\varepsilon)$ bước" ($1/\ln(10/9)\approx9{,}49$) | đã sửa |
| T4 | chuyên gia | nhẹ | §G.6 câu nối trước Nhận xét G.6; đoạn cuối §H.3 | "không cải thiện bậc của cận trên sai số đối với $R$" (sửa cả hai chỗ cùng cụm) | đã sửa |
| T5 | chuyên gia | nhẹ | §F.5; mục Nguồn bài tập | "trùng cỡ mẫu nêu ngay sau công thức (12.3) (tr. 490–491)"; Bài 8: "cùng dạng với Định lý A.3" | đã sửa |
| T6 | chuyên gia | nhẹ | Mệnh đề E.12 (4) | Thêm: $Y$, $I$ có thể nhận giá trị vectơ rời rạc; với $h$ nhận giá trị vectơ, áp theo từng tọa độ | đã sửa |
| T7 | mạch | nhẹ | §D.2; §G.4 | Bỏ vế tham chiếu xuôi "$\mathbb EK=1/p$ … Bài tập 4" (giữ tính không nhớ); §G.4 chỉ nói giá trị giới hạn ở mục ngân sách phụ thuộc cả $\eta$ lẫn $b$ | đã sửa |
| T8 | mạch | nhẹ | §C.2, §C.4, câu hỏi cuối C; Bài tập 2 | $M$ ba nghĩa: biến cố mắc bệnh đổi thành $D$ ($D$ chưa dùng trong phần C; $D_b$ chỉ xuất hiện ở phần E); giữ $M_X$ và $[m,M]$; bảng ký hiệu outline đổi theo. Lần chạy đầu của script thay nhầm cả chữ "M" đầu từ tiếng Việt (Mệnh, Một, Mỗi); đã dựng lại phần C và Bài 2 từ bản sao trong `material-local-data.js` rồi chỉ thay trong công thức; đã kiểm bằng grep | đã sửa |
| T9 | mạch | nhẹ | cuối §G.7 | Bỏ câu lặp Mệnh đề G.4 (iv) "Với mất mát trung bình, hằng số $\sigma^2$ giảm theo $1/b$…" | đã sửa |

**Thẻ `index.html` (quyết định 8).** Thêm sau thẻ Bài 05b: nhãn "Bài 05c (bổ trợ)", tiêu đề theo heading ghi chú, mô tả một câu; ô "Bài giảng" dùng lớp `resource-status` với chữ "Không có bộ trang chiếu"; hai liên kết `material-viewer.html?doc=materials/lec-05c/lecture-note.md` và `…/exercises.md`, không tham số `deck`. Kiểm Playwright ở 1600×900 và 390×844: không cuộn ngang, Tab tới đúng hai liên kết, mở được cả hai tài liệu (0 `.katex-error`); đã xem ảnh thẻ ở hai cỡ (`/tmp/claude-1000/lec05c-edit/idx-*.png`). `index.html` không liên kết `planning/` hay nguồn.

## Việc chờ

| Việc | Vị trí | Trạng thái |
|---|---|---|
| Cổng storyboard | ba tệp planning | Đạt (tái kiểm sau lượt 3); G23–G27 sửa ở lượt 4; chờ điều phối viên kiểm diff và commit |
| Tái kiểm số mới (N10) | outline, mục "Danh mục ví dụ" | Đóng: đã kiểm ở tái kiểm cổng và tái kiểm toán |
| Ký hiệu và thuật ngữ | outline, mục "Thuật ngữ Việt–Anh dùng lần đầu" | Đóng bước rà (1'): bảng ký hiệu A.4 do điều phối viên chốt, đã được CG và MC kiểm khi rà soát |
| Soạn học liệu và SVG | `materials/lec-05c/`, `img/lec-05c/` | Ghi chú, bài tập và 11 SVG xong (lượt soạn 1–3); năm vai rà soát xong; biên tập lượt 1 xong |
| Duyệt lượt biên tập 2 (T1–T9, thẻ chỉ mục); kiểm định cuối | ghi chú, bài tập, `index.html` | Chờ điều phối viên |
| Thẻ `index.html` | `2627-1/index.html`, sau thẻ Bài 05b | Đã thêm (lượt biên tập 2); chờ kiểm định cuối |
| Theo dõi tệp planning | `planning/lec-05c/*.md` | Theo quyết định 9; `git add -f` khi commit |
| Hạ tầng viewer | `material-viewer.js`, README, `AGENTS.md`, `CLAUDE.md` | Xong (acf3ff2, 716a049) |
