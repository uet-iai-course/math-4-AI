# Nhật ký soạn và rà soát Bài 05c

## Trạng thái ngày 2026-10-08: planning lượt 3 và lượt 4 (sửa theo cổng storyboard), cổng đạt, điều phối viên `chấp nhận`

Mục đích của nhật ký: ghi vai, loại, mô hình và effort của từng tác tử; quyết định của điều phối viên với từng đầu ra; quyết định soạn thảo; phát hiện rà soát cùng trạng thái; kết quả tự kiểm no-ai-slop; việc còn chờ. Không xóa phát hiện đã xử lý.

Bài 05c là bài bổ trợ chỉ có học liệu (`materials/lec-05c/lecture-note.md`, `exercises.md`), không có deck. [outline.md](outline.md) và [storyboard.md](storyboard.md) mô tả 8 phần, 40 tiểu mục `###` (A3, B5, C4, D5, E7, F6, G7, H3) và 10 bài tập, tổng 50 mục storyboard; số tiểu mục không đổi giữa lượt 1, lượt 3 và lượt 4. Ngân sách ghi chú 11 500–13 800 từ kể cả mục tài liệu tham khảo. Cổng storyboard: lượt 1 "chưa đạt" (G1–G22), tái kiểm sau lượt 3 "đạt" (0 nghiêm trọng); năm điểm G23–G27 đã sửa ở lượt 4. Hạ tầng viewer đã commit (acf3ff2, 716a049). Chưa có học liệu, SVG hay thẻ `index.html`. Ba tệp planning chưa commit. Bài không có buổi riêng trong đề cương DOCX; không gán thời lượng ở bất kỳ cấp nào.

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
| (e) Sửa planning, lượt 4 (G23–G27) | Cùng tác tử (e), tiếp tục qua `SendMessage` | Claude Opus 5.5 (`claude-opus-5-5`) | `high` | Có | Ba tệp planning; không học liệu; không commit | 2026-10-08 | Thông báo của điều phối viên (`SendMessage`) | Chờ điều phối viên kiểm diff và commit |

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

- $\mu$ chỉ là kỳ vọng. §G.6, §G.7, Nhận xét G.6 viết công thức giá trị giới hạn cho ví dụ ba quan sát với độ cong bằng 1; dạng tổng quát nêu bằng lời kèm dẫn Bài 05b; bảng ký hiệu thêm dòng ánh xạ.
- Dẫn xuất đệ quy $a_{k+1}=(1-\eta)^2a_k+\eta^2\sigma_1^2/b$ trong §G.6 từ Định lý G.2 và Mệnh đề E.12, nâng ngân sách tiểu mục; thêm Bài 04 vào tiền đề; chỉ §G.7 dẫn Bài 05b.
- Sắp lại thứ tự nhu cầu → ví dụ → phát biểu ở §E.2, §E.3, §G.1, §G.2, §D.4; sai số chuẩn chuyển về §E.5.
- VD-08 bỏ cò quay, giữ như phép tính kỳ vọng với quy ước "nhận 10 gồm cả tiền đặt"; VD-09 ngắn với $\min(2^K,2^{20})$; VD-23 sang §E.7 hoặc BT5; VD-11 bỏ $0{,}36788$.
- Thêm Định lý G.1 vào đầu vào §G.6 và câu nối "$J$ chỉ là ước lượng của $R$ với sai số cỡ $1/\sqrt N$…" trước Nhận xét G.5; ghi khác biệt với GBC.
- VD-20 ghi ba giới hạn và quy ước $b=N$ là một bước gradient đầy đủ ($0{,}81$); H-10 vẽ trên các ước của 3000, đánh dấu đáy $b=75$ và $b=10$, $K=\lfloor B/b\rfloor$, alt đủ số.
- "Hoeffding kém Chebyshev ở độ lệch nhỏ" thành "Hoeffding hai phía" kèm ví dụ cụ thể.
- Ký hiệu $\widetilde J$, $\widetilde g$, $W_i$; bổ sung $L$, $C$, $B$, $K$, $a_K$, $\eta$, $d$, $\mathcal E$ vào bảng; VD-05b tính bằng Bayes trực tiếp; VD-17b theo nhãn $\pm1$ của Bài 01 §4; Nhận xét G.6 với $\sup_\theta$.
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
| G1 | cổng storyboard | nghiêm trọng | Ký hiệu; §G.6, §G.7, Nhận xét G.6 | $\mu$ vừa là kỳ vọng vừa là hằng số lồi mạnh trong $\frac{\eta\sigma_1^2}{b\mu(2-\eta\mu)}$ | Giữ $\mu$ là kỳ vọng; viết công thức với độ cong bằng 1; thêm dòng ánh xạ | Đã sửa: outline bảng ký hiệu (dòng "độ cong"), danh mục G, §G.6, §G.7; storyboard §A.3, §G.6, §G.7 | `chấp nhận`, `yêu cầu sửa` |
| G2 | cổng storyboard | nghiêm trọng | Tiền đề; §G.4, §G.6, BT10 câu (b) | Phụ thuộc chưa khai vào Bài 04 (bước $1/L$) và vào đệ quy $a_K$ của Bài 05b | Dẫn xuất đệ quy trong §G.6 từ G.2 và E.12; thêm Bài 04 vào tiền đề; chỉ §G.7 dẫn Bài 05b | Đã sửa: outline "Vị trí", "Tiền đề học phần", đoạn "Dẫn xuất đệ quy trong §G.6"; §E.7 dùng cây VD-13; storyboard §E.7, §G.4, §G.6, BT10 | `chấp nhận`, `yêu cầu sửa` |
| G3 | cổng storyboard | trung bình | §E.2, §E.3, §G.1, §G.2 | Phát biểu hình thức đứng trước nhu cầu hoặc ví dụ; sai số chuẩn định nghĩa trước Q2 | Sắp lại thứ tự; sai số chuẩn chuyển về §E.5 | Đã sửa: outline bốn hàng tiểu mục, Định nghĩa E.5, Định lý E.9; storyboard bốn mục và K7, K9, K14 | `chấp nhận`, `yêu cầu sửa` |
| G4 | cổng storyboard | trung bình | §D.4; §E.3 | §D.4 mở bằng Định nghĩa D.5 không có ví dụ; đầu vào §E.3 thiếu D.5 | Thêm bảng PMF đồng thời của VD-06 trước D.5; thêm D.5 vào đầu vào §E.3 | Đã sửa | `chấp nhận`, `yêu cầu sửa` |
| G5 | cổng storyboard | trung bình | K6, BT4 | K6 trỏ BT4 nhưng BT4 đo kỳ vọng | K6 trỏ BT9 câu (a); BT4 thêm câu PMF, CDF | Đã sửa: BT4 câu (a), K6 trỏ BT4 câu (a) và BT9 câu (a) | `chấp nhận`, `yêu cầu sửa` |
| G6 | cổng storyboard | trung bình | §E.1, §E.2; VD-23, VD-11 | Hai tiểu mục quá tải | Bỏ cò quay; VD-23 sang BT5; VD-11 bỏ số | Đã sửa | `chấp nhận`, `yêu cầu sửa` |
| G7 | cổng storyboard | trung bình | §G.5–§G.6 | Thiếu bước nối từ Định lý G.1 sang lập luận ngân sách | Thêm G.1 vào đầu vào §G.6 và câu nối trước Nhận xét G.5; ghi khác biệt với GBC | Đã sửa: §G.6 (câu nối), §G.2 (khác biệt với GBC §8.1.3) | `chấp nhận`, `yêu cầu sửa` |
| G8 | cổng storyboard | trung bình | VD-20 | Giới hạn chưa đủ | Ba giới hạn và quy ước $b=N$ | Đã sửa: outline "Giới hạn áp dụng", VD-20; storyboard §G.6, §H.2 | `chấp nhận`, `yêu cầu sửa` |
| G9 | cổng storyboard | trung bình | H-10 | Đáy thật ở $b=75$; alt cũ; đường $B=300$ dừng ở $b=300$ | Vẽ trên các ước của 3000, đánh dấu hai đáy, $K=\lfloor B/b\rfloor$, alt đủ số | Đã sửa | `chấp nhận`, `yêu cầu sửa` |
| G10 | cổng storyboard | trung bình | §F.6, H-06 | "Hoeffding kém Chebyshev" chỉ đúng với cận hai phía | Ghi "Hoeffding hai phía" và ví dụ cụ thể; ghi phía của mọi cận | Đã sửa: §F.6, F.2, F.8, VD-16, H-06, H-07, BT8 | `chấp nhận`, `yêu cầu sửa` |
| G11 | cổng storyboard | trung bình | VD-08, VD-09, câu nối D → E | Kế hoạch cấm bình luận cờ bạc; câu nối D → E dùng trò chơi trong khi nhu cầu của K8 là gradient | VD-08 chỉ là phép tính; câu nối D → E viết lại theo PMF của $g_I(1)$ | Đã sửa | `chấp nhận`, `yêu cầu sửa` |
| G12 | cổng storyboard | nhẹ | Q4 | Q4 gộp hai câu hỏi của người dùng | Tách Q4a, Q4b | Đã sửa: outline, storyboard, §H.1 | `chấp nhận`, `yêu cầu sửa` |
| G13 | cổng storyboard | nhẹ | Ký hiệu $J_\Sigma$, $R_i$; bảng ký hiệu | $R_i$ trùng $R$ (rủi ro); bảng thiếu nhiều ký hiệu | $\widetilde J$, $\widetilde g$, $W_i$; bổ sung $L$, $C$, $B$, $K$, $a_K$, $\eta$, $d$, $\mathcal E$, $S$, $\theta$ | Đã sửa | `chấp nhận`, `yêu cầu sửa` |
| G14 | cổng storyboard | nhẹ | Nhận xét G.6 | $\sigma^2=\operatorname{tr}\Sigma/b$ thiếu cận trên theo $\theta$ | $\sigma^2=\sup_\theta\operatorname{tr}\Sigma(\theta)/b$ | Đã sửa | `chấp nhận`, `yêu cầu sửa` |
| G15 | cổng storyboard | nhẹ | §A.1 → §B.1 | §B.1 nhận câu hỏi chỉ số lặp mà §A.1 chưa đặt | Đặt câu hỏi ($b=32$, $N=1000$) ở §A.1 | Đã sửa | `chấp nhận`, `yêu cầu sửa` |
| G16 | cổng storyboard | nhẹ | §D.2, §D.3, §F.5 | Ngoại lệ thứ tự chưa khai; §F.5 thiếu câu nhu cầu | Thêm nhu cầu và ví dụ trước định nghĩa ở §D.2, §D.3; khai ngoại lệ §F.5; thêm câu nhu cầu | Đã sửa: storyboard mục "Ngoại lệ có chủ ý" | `chấp nhận`, `yêu cầu sửa` |
| G17 | cổng storyboard | nhẹ | Ứng dụng K11 | Ứng dụng chỉ là dẫn tên BĐ6 | Ứng dụng tính được | Đã sửa: cận Markov cho VD-10 ở §F.1 | `chấp nhận`, `yêu cầu sửa` |
| G18 | cổng storyboard | nhẹ | VD-05b; VD-17b | Tỉ số odds chưa định nghĩa; VD-17b chưa nêu quy ước nhãn | Bayes trực tiếp; nhãn $\pm1$ theo Bài 01 §4 | Đã sửa | `chấp nhận`, `yêu cầu sửa` |
| G19 | cổng storyboard | nhẹ | Cột quyết định; §H.3; BT6, BT7 | Nhiều mục chỉ ghi "thêm"; §H.3 trùng danh sách tài liệu; BT6, BT7 yêu cầu chép chứng minh của ghi chú | Lý do một dòng cho mọi mục; §H.3 chỉ còn câu hỏi; BT6 dùng hàm chỉ thị, BT7 giữ dấu bằng và phản ví dụ | Đã sửa: 50 mục storyboard có lý do (kiểm bằng script) | `chấp nhận`, `yêu cầu sửa` |
| G20 | cổng storyboard | nhẹ | H-01; alt H-06 | H-01 tách hai tiểu mục; alt H-06 thiếu số | H-01 đặt ở §B.4; alt H-06 nêu số tại $k=60$, $75$, $80$ | Đã sửa | `chấp nhận`, `yêu cầu sửa` |
| G21 | cổng storyboard | nhẹ | review-log; VD-16; nguồn | Nhật ký thiếu N6–N8; VD-16 thiếu Markov $0{,}833$; KF không trình bày nhị thức; thiếu GBC §3.2–3.3, §3.9.1 | Bổ sung | Đã sửa: N6–N8 dưới đây; VD-16; dòng KF, GBC trong outline (trang GBC kiểm bằng `pdftotext`: §3.2 tr. 56, §3.3.2 tr. 58, §3.9.1 tr. 62) | `chấp nhận`, `yêu cầu sửa` |
| G22 | cổng storyboard | nhẹ | storyboard §A.2 | Cụm "trục của toàn bài" là lời bình chung chung (no-ai-slop) | Nêu cụ thể vai trò | Đã sửa: "Q1–Q4b quyết định phần trả lời của E, F, G và hàng của bảng §H.1" | `chấp nhận`, `yêu cầu sửa` |
| G23 | cổng storyboard (tái kiểm) | nhẹ | §G.6, §H.2 | Dẫn xuất $a_K$ dùng Định lý G.2 tại $\theta_k$ ngẫu nhiên mà chưa nêu vì sao nhiễu độc lập với $\theta_k$; G4 bị vượt | Thêm câu: nhóm ở bước $k$ rút mới, độc lập với lịch sử, nên $\zeta_k$ độc lập với $\theta_k$ (Mệnh đề D.7); §H.2 ghi §G.6 vượt G4 nhờ điều kiện này, tương ứng H6 | Đã sửa: outline đoạn "Dẫn xuất đệ quy", hàng §G.6, "Giới hạn áp dụng"; storyboard §G.6, §H.2 | `chấp nhận`, `yêu cầu sửa` |
| G24 | cổng storyboard (tái kiểm) | nhẹ | outline "Vị trí"; storyboard | Câu "chỉ §G.7 dẫn Bài 05b" mâu thuẫn với câu về dạng tổng quát của giá trị giới hạn ở §G.6 | Ghi "§G.6 (một câu về dạng tổng quát của giá trị giới hạn) và §G.7" | Đã sửa | `chấp nhận`, `yêu cầu sửa` |
| G25 | cổng storyboard (tái kiểm) | nhẹ | BT4 câu (a); BT7 câu (c); §F.1 | BT4 câu (a) trùng ví dụ ba đồng xu của §D.2; BT7 câu (c) dùng $\sigma^2$ và thiếu điều kiện; $U$ ở §F.1 trùng $U$ của Mệnh đề E.7 | Bốn đồng xu cân đối; $\operatorname{Var}X$ với $\operatorname{Var}X\le t^2$; đổi ký hiệu | Đã sửa: BT4 câu (a) $\binom4k/16$, kỳ vọng 2; BT7 câu (c); $T_N$ | `chấp nhận`, `yêu cầu sửa` |
| G26 | cổng storyboard (tái kiểm) | nhẹ | §E.1, §E.2, VD-09 | §E.1, §E.2 vẫn chật; VD-09 minh họa Nhận xét F.11 nhưng đặt ở §E.1 | VD-09 sang §F.6; §E.1, §E.2 lên 350–400 từ, lấy từ §G.6 | Đã sửa (quyết định soạn thảo 12, 14) | `chấp nhận`, `yêu cầu sửa` |
| G27 | cổng storyboard (tái kiểm) | nhẹ | §G.6; review-log | Câu nối viết "không cải thiện sai số tổng" trong khi G.1 chỉ cho bậc; số lượt trong nhật ký không thống nhất | "Không cải thiện bậc của sai số"; thống nhất số lượt | Đã sửa: hàng §G.6 của outline và storyboard; nhật ký dùng lượt 1 (planning), lượt 2 (hạ tầng), lượt 3 (sửa G1–G22), lượt 4 (sửa G23–G27) | `chấp nhận`, `yêu cầu sửa` |

Không có phát hiện nào bị tác tử soạn bác bỏ. Trạng thái cổng storyboard: **đạt** (tái kiểm sau lượt 3, 0 nghiêm trọng); G23–G27 đã sửa ở lượt 4.

## Nghi vấn chuyển điều phối viên

| Mã | Nội dung | Bằng chứng | Trạng thái |
|---|---|---|---|
| N1 | Kế hoạch ghi Định lý F.6 cho "cận tốt hơn" Bổ đề F.7 trên $[-1,1]$ | Với $M-m=2$, F.7 cho $e^{\lambda^2/2}$, trùng cận của F.6 | Đóng: điều phối viên xác nhận; outline ghi "trùng" |
| N2 | VD-20, $B=3000$: đáy trên mọi ước của 3000 là $b=75$ ($0{,}00209$) | Tác tử soạn và bảng số tính cùng kết quả | Đóng: ghi "$b=100$ tốt nhất trong các $b$ đã thử; tối ưu trên mọi $b$ nguyên là $b=75$" |
| N3 | Bảng nguồn không kiểm LLO với DOCX | Bảng nguồn | Đóng: điều phối viên đã kiểm DOCX |
| N4 | Ví dụ ba quan sát ở Bài 05 `:86–92`, không phải `:84–92` | Bảng nguồn, mục 5 | Đóng: outline dùng `:86–92` |
| N5 | Câu Nhận xét G.5 của kế hoạch không có nguyên văn trong SNW ch. 13 | Bảng nguồn, mục 4 | Đóng: outline dùng câu đề xuất của bảng nguồn (cận trên tiệm cận) |
| N6 | VD-16 thiếu cận Markov cho $P(S\ge60)$: $\mathbb ES/60=50/60\approx0{,}833$ | Phát hiện G21; tác tử soạn kiểm $50/60=0{,}8\overline3$ | Đóng: thêm vào VD-16 và alt H-06 |
| N7 | Koller và Friedman không trình bày phân phối nhị thức; GBC §3.9 có Bernoulli, Multinoulli, Gauss, không có nhị thức | Phát hiện G21; mục lục GBC ch. 3 (trang tệp 78–79) | Đóng: Mệnh đề D.6 ghi tự xây dựng; Định nghĩa D.3 dẫn GBC §3.9.1 cho Bernoulli |
| N8 | Dòng GBC thiếu §3.2–3.3 (biến ngẫu nhiên, PMF, mật độ) và §3.9.1 | Phát hiện G21; `pdftotext` trang tệp 72–74, 78: §3.2 và §3.3 tr. 56, §3.3.2 tr. 58, §3.9.1 tr. 62 | Đóng: thêm vào dòng GBC của outline; tác tử nguồn có thể tái kiểm |
| N9 | Thông báo của điều phối viên ghi 716a049 là viewer, README và acf3ff2 là `AGENTS.md`, `CLAUDE.md` | `git show --stat`: acf3ff2 `feat(materials)` (viewer, bootstrap, README), 716a049 `docs(agents)` (`AGENTS.md`, `CLAUDE.md`) | Nhật ký ghi theo `git show` |
| N10 | Số mới của lượt 3 cần tái kiểm toán: cận Markov VD-10 $\approx0{,}735$; cây VD-13 ($\theta_1\in\{-0{,}1;0{,}1;0{,}3\}$, $\mathbb Eg=-0{,}9$); BT4 câu (a) (bốn đồng xu: $\frac1{16},\frac4{16},\frac6{16},\frac4{16},\frac1{16}$, kỳ vọng 2); BT5 câu (b) $\approx0{,}1352$; BT7 câu (c); BT9 câu (b); đệ quy $a_K$ và hằng $\frac{8}{57b}$ | Tác tử soạn tính bằng `python3 -I`; phép tính ghi trong outline | Chờ tái kiểm cổng hoặc tác tử số liệu |

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

## Việc chờ

| Việc | Vị trí | Trạng thái |
|---|---|---|
| Cổng storyboard | ba tệp planning | Đạt (tái kiểm sau lượt 3); G23–G27 sửa ở lượt 4; chờ điều phối viên kiểm diff và commit |
| Tái kiểm số mới (N10) | outline, mục "Danh mục ví dụ" | Chờ |
| Ký hiệu và thuật ngữ | outline, mục "Thuật ngữ Việt–Anh dùng lần đầu" | Bảng tạm; bước rà ký hiệu và thuật ngữ (1') của kế hoạch chưa chạy |
| Soạn học liệu và SVG | `materials/lec-05c/`, `img/lec-05c/` | Sau khi cổng đạt |
| Thẻ `index.html` | `2627-1/index.html`, sau thẻ Bài 05b | Theo quyết định 8; chỉ thêm sau kiểm định cuối |
| Theo dõi tệp planning | `planning/lec-05c/*.md` | Theo quyết định 9; `git add -f` khi commit |
| Hạ tầng viewer | `material-viewer.js`, README, `AGENTS.md`, `CLAUDE.md` | Xong (acf3ff2, 716a049) |
