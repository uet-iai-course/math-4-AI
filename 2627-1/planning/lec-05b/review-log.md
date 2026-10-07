# Nhật ký soạn và rà soát Bài 05b

## Trạng thái ngày 2026-10-07

Bản sửa sau cổng kiểm định storyboard. [outline.md](outline.md) và [storyboard.md](storyboard.md) mô tả **51 trang, 7 phần ngoài** (A5, B7, C9, D7, E12, F7, G4). Mỗi mã trang trong outline có đúng một mục trong storyboard; đã kiểm bằng script so mã và tiêu đề. Cổng kiểm định storyboard lượt 1 cho SB01–SB15; tái kiểm (lượt 2) kết luận "đạt có điều kiện" và nêu SB16–SB29. Lượt 3 của tác tử soạn đã sửa SB16–SB28 trong phạm vi trang, không đổi số trang; SB29 do điều phối viên xử lý. Chưa có deck HTML, hình SVG, học liệu hay mục `index.html`.

Bài bổ trợ không có buổi riêng trong đề cương DOCX; không gán thời lượng ở bất kỳ cấp nào.

Bản đầu có 53 trang; SB03 (gộp C05 vào C08 cũ, −1) và SB05 (bỏ B06, −1) cho 51. Điều phối viên đã xác nhận 51 trang (N9 đóng). A05 chưa tách (SB04).

## Nhật ký tác tử

Cột "bằng chứng" ghi nguồn xác nhận vai và mô hình. Theo CLAUDE.md, bằng chứng hợp lệ là lời gọi công cụ do điều phối viên ghi, không phải lời tự khai của tác tử.

| Vai | Loại tác tử | Mô hình | Effort | Ghi tệp | Phạm vi | Ngày | Bằng chứng | Quyết định của điều phối viên |
|---|---|---|---|---|---|---|---|---|
| (a) Lập kế hoạch | `general-purpose` | Claude Fable 5.1 (`claude-fable-5-1`) | `max` | Không (chỉ đọc) | Phạm vi, khung lý thuyết, bảy phần, sổ định lý, ví dụ dẫn, rủi ro, khoảng trống J1–J19 | 2026-10-07 | Brief của điều phối viên cho tác tử soạn; kế hoạch đã duyệt `lec-05b-plan-approved.md` trong thư mục tạm của phiên | `chấp nhận` sau khi sửa hai số liệu: chỉ số lặp ở VD-B ($x_0,\dots,x_3=0,\frac16,\frac13,\frac12$ với $K=4$); điểm giao lịch bước ở VD-A ($k\ge20$ so với giá trị giới hạn, $k\ge16$ so với quỹ đạo thật) |
| (b) Điều phối và kiểm soát chất lượng | Phiên chính | Claude Fable 5.1 (`claude-fable-5-1`) | `medium` | Không | Chia việc, viết brief, duyệt mọi đầu ra | 2026-10-07 | CLAUDE.md, mục "Multi-agent workflow" | Không áp dụng |
| (c) Soạn và triển khai, lượt 1 (bản đầu) | `general-purpose` | Claude Opus 5.5 (`claude-opus-5-5`) | `high` | Có | Chỉ ba tệp `planning/lec-05b/{outline,storyboard,review-log}.md`; không deck, không học liệu, không script, không `index.html`, không commit | 2026-10-07 | Brief của điều phối viên; điều phối viên đối chiếu với lời gọi `Agent` | Chuyển sang cổng kiểm định storyboard |
| (d) Kiểm định storyboard | `general-purpose` | Claude Opus 5.5 (`claude-opus-5-5`) | `high` | Không (chỉ đọc) | Ba tệp planning của bản đầu | 2026-10-07 | Lời gọi `Agent` của điều phối viên: `subagent_type: general-purpose`, `model: opus`, `effort: high` | Kết luận của tác tử: "chưa đạt". Điều phối viên: `chấp nhận` toàn bộ phát hiện, chọn phương án cho SB03 |
| (c) Soạn và triển khai, lượt 2 (bản sửa) | Cùng tác tử (c), tiếp tục qua `SendMessage` | Claude Opus 5.5 (`claude-opus-5-5`) | `high` | Có | Như lượt 1; sửa theo SB01–SB15 | 2026-10-07 | Thông báo yêu cầu sửa của điều phối viên (`SendMessage`) | `chấp nhận` (2026-10-07). Điều phối viên kiểm: 51 mã khớp 51 mục; 7 phần; các số N10 tính lại đúng ($c=\frac{25}{28}$, $k\ge78$; $d_2^2,d_3^2$; $e_k$ VD-B và trung bình $\frac14$; PL cho VD-C). Gửi tái kiểm storyboard |
| (d) Kiểm định storyboard, lượt 2 (tái kiểm) | Cùng tác tử (d), tiếp tục qua `SendMessage` | Claude Opus 5.5 (`claude-opus-5-5`) | `high` | Không (chỉ đọc) | Ba tệp planning của bản sửa lượt 2 | 2026-10-07 | Thông báo của điều phối viên cho tác tử soạn | Kết luận của tác tử: "đạt có điều kiện". Điều phối viên: `chấp nhận` toàn bộ phát hiện còn lại SB16–SB29 |
| (c) Soạn và triển khai, lượt 3 | Cùng tác tử (c), tiếp tục qua `SendMessage` | Claude Opus 5.5 (`claude-opus-5-5`) | `high` | Có | Như lượt 1; sửa SB16–SB28 trong phạm vi trang, giữ 51 trang | 2026-10-07 | Thông báo yêu cầu sửa của điều phối viên (`SendMessage`) | `chấp nhận` (2026-10-07). Điều phối viên kiểm C01, C04/C05, D03/D06, E04, F06, F07, G01, G04 và các trường Nguồn; không còn mã trang ở trường lên mặt trang |

## Bốn quyết định của người dùng (chốt ngày 2026-10-07)

Người dùng chấp nhận cả bốn khuyến nghị của kế hoạch. Không mở lại các quyết định này.

| # | Quyết định | Lý do ghi nhận |
|---|---|---|
| 1 | Ký hiệu $x_k$ (chỉ số dưới), $\eta_k$, $f^*$ (ghi rõ $f^*=p^*$ của Bài 02–03), $D=\lVert x_0-x^*\rVert$; không dùng $R$ | Chỉ số trên dễ lẫn với lũy thừa khi cận có dạng $q^k$; học liệu Bài 04 đã lẫn $x^{(k)}$ và $x^k$ (J10). $\eta_k$ khớp Bài 05–06. $R$ đã là rủi ro kỳ vọng ở Bài 05 |
| 2 | Tệp `2627-1/lecture-05b-hoi-tu-ha-gradient-va-sgd.html`, `planning/lec-05b/`, `materials/lec-05b/`, `img/lec-05b/`; nhãn `index.html` "Bài 05b (bổ trợ)"; sửa bộ lọc trong `scripts/sync-local-materials.py` | Mã "05b" giữ vị trí sau Bài 05 mà không đổi số các bài sau. Bộ lọc hiện chỉ nhận hai chữ số nên học liệu `lec-05b` sẽ bị bỏ qua nếu không sửa |
| 3 | Lồi mạnh: trên trang dùng T5 (bước hằng) và hệ quả lịch chia đôi bước; T6 chỉ phát biểu, chứng minh quy nạp trong học liệu và bài tập | Giảm rủi ro quá tải chín định lý; T5 chỉ cần giải đệ quy KT14, còn quy nạp KT15 hợp với dạng bài tập viết |
| 4 | Giữ phần D (dưới gradient), rút còn khoảng 7 trang | T4 kế thừa nguyên dòng chứng minh T3; bỏ D thì E thiếu bậc trung gian giữa GD và SGD. Rút gọn để kiểm soát số trang |

## Quyết định soạn thảo

1. Số trang 51, trong khoảng 47–54 của kế hoạch (bản đầu 53).
2. Đổi nhãn bổ đề B1–B6 thành BĐ1–BĐ6 và khuôn D1–D8 thành KH1–KH8 để không trùng mã trang; nội dung không đổi.
3. Bài tập về PL của VD-D chuyển từ phần B sang F07 vì VD-D xuất hiện lần đầu ở F01; từ lượt 3, câu này chứng minh $\frac12F'^2=2\theta^2F$ và PL trên $\{\lvert\theta\rvert\ge c\}$ (SB19). Bài tập "phân loại 4 phát biểu" của phần A đặt ở B07 vì cần bản đồ mũi tên B06.
4. Thêm hai hình ngoài danh sách của kế hoạch: `one-step-geometry.svg` (B05) và `vdb-objective.svg` (D01). Sau khi gộp C05 cũ, tổng 14 SVG.
5. A05 chỉ còn ký hiệu và H0–H4. Phương án dự phòng nếu vẫn tràn khung 16:9: tách thành hai trang (tổng 52), cập nhật outline và storyboard; không thu nhỏ chữ.
6. Trên mặt trang A01 ghi "Bài 05b"; nhãn "bổ trợ" chỉ ở `index.html`.
7. Bản sửa thêm mục "Quy ước nhãn" vào outline (SB09) và bảng đổi mã trang vào storyboard.

## Phát hiện rà soát

Nguồn: tác tử kiểm định storyboard (d), lượt 1 cho SB01–SB15 và lượt 2 (tái kiểm) cho SB16–SB29; quyết định của điều phối viên. Với SB16–SB29, mã trang là mã của bản sửa lượt 2 (51 trang). Không xóa phát hiện đã xử lý. Mã trang trong cột "trang chiếu" là mã của bản đầu; mã mới ghi trong cột "đề xuất sửa" khi khác.

| mức độ | trang chiếu | vấn đề | bằng chứng | đề xuất sửa | trạng thái | quyết định |
|---|---|---|---|---|---|---|
| chặn bàn giao (SB01) | A05, D02, D04, F06 | A05 đưa H1 dạng dưới gradient, H5, H7 trước khi có dưới gradient, chặn $G$ và nhu cầu PL | Outline bản đầu, A05 và mục "Giả thiết có tên": H0 "hoặc lồi khi dùng dưới gradient", H1 với $g\in\partial f(x)$ | A05: H1 dạng khả vi, bỏ mệnh đề dưới gradient khỏi H0, không đưa H5, H7. D02 mở rộng H1 cho $\partial f$; H5 vào phát biểu T3 (D04); H7 vào F06 | Đã sửa; chờ tái kiểm | Chấp nhận |
| nghiêm trọng (SB02) | A05, F06 | PL thiếu nhu cầu, trực quan và ví dụ dương; F06 gộp PL với giới hạn không lồi | Bản đồ KN6 bản đầu; F06 mở bằng H7 | Bỏ PL khỏi A05. F06 đổi tiêu đề "Điều kiện Polyak–Łojasiewicz"; thêm trực quan (gradient chỉ nhỏ khi giá trị gần tối ưu, sai tại $\theta=0$ của VD-D) và ví dụ dương (VD-C với $\mu=3$, VD-A với $\mu=1$, theo BĐ3); chuyển giới hạn "không nói tới cực tiểu nào, không loại điểm yên ngựa" sang G03; cập nhật bản đồ KN6 | Đã sửa; chờ tái kiểm | Chấp nhận |
| nghiêm trọng (SB03) | C01, C05, C08 | Số VD-C lặp ba lần; C01 nêu cận $62(4/7)^k$ trước khi T2 được phát biểu | Outline bản đầu C01 (bảng ba giá trị, hai cận), C05 (bảng bốn giá trị), C08 (bảng ba cận) | Phương án (a): gộp C05 vào C08 (mới là C07). C01 bỏ bảng, dẫn lại A03, chỉ nêu ba khoảng trống chứng minh. Nhu cầu dùng $\mu$ đến từ C04 với ví dụ $x_1^2$. "7000 so với 6" và "16" chỉ ở C07 | Đã sửa; chờ tái kiểm. Đánh lại mã C06→C05, C07→C06, C08→C07, C09→C08, C10→C09 | Chấp nhận, chọn phương án (a) |
| trung bình (SB04) | A05 | Trang quá tải; "tám giả thiết" không khớp số nhãn | A05 bản đầu có 16 ký hiệu và tám dòng giả thiết; nhãn thực có mười (H0–H7, H6a, H6b) | Chỉ giữ ký hiệu và H0–H4 cho A–C; $f_{\inf}$ ở B01, $a_k,G,\sigma^2$ ở E, $\Delta_0$ ở F02; G01 gom lại. Ghi "mười nhãn; A05 nêu năm nhãn H0–H4". Tách A05 chỉ khi vẫn quá tải | Đã sửa; chưa tách; chờ kiểm định trình duyệt | Chấp nhận |
| trung bình (SB05) | B06 | Jensen và Markov đặt ở B khi chưa có trung bình lặp và kỳ vọng | Outline bản đầu B06; Jensen dùng lần đầu ở D05, Markov ở E11 | Chuyển Jensen về D (nhu cầu ở D03, phát biểu ở D05), Markov về E11. B còn 7 trang; B07→B06, B08→B07 | Đã sửa; chờ tái kiểm | Chấp nhận |
| trung bình (SB06) | D03 | Lượt chạy bước $\frac12$ đơn điệu, không cho thấy vì sao cần lặp tốt nhất và trung bình lặp | Bản đầu D03: $x_k=0,\frac16,\frac13,\frac12$ đều trên một khúc tuyến tính | Thêm lượt $x_0=0$, $\eta=4{,}5$: $x=0;1{,}5;0;1{,}5$, $f$ tăng từ $1{,}5$ lên $\frac53$, $\bar x_4=0{,}75$, sai số $\frac1{12}<\frac16$. Giữ $\eta=\frac12$ cho D06 | Đã sửa; chờ tái kiểm | Chấp nhận (số do điều phối viên kiểm) |
| trung bình (SB07) | C09, C10 | T2' không có bài tập áp dụng; ví dụ ngưỡng lặp giữa C09 và C10 câu (3) | Bản đầu C09 có ví dụ $\frac L2x^2$; C10 câu (1) là chứng minh T1 với quay lui (đã có ở Bài 04) | C10 (mới C09) câu (1) áp T2' trên VD-C với $\alpha,\beta$ cho trước; bỏ ví dụ ngưỡng khỏi C09 (mới C08); C09 mới câu (3) giữ ngưỡng | Đã sửa; chờ tái kiểm | Chấp nhận |
| trung bình (SB08) | D07 | Câu (2) dùng $\frac c{\sqrt{k+1}}$ mà không nối với điều kiện Robbins–Monro vừa học | Bản đầu D07 câu (2) | Thêm câu (2b): $\frac c{k+1}$ thỏa Robbins–Monro, $\frac c{\sqrt{k+1}}$ không, nhưng cận vẫn về 0 với tốc độ $\ln K/\sqrt K$ | Đã sửa; chờ tái kiểm | Chấp nhận |
| trung bình (SB09) | Nhiều trang (trường "Ý chính") | Mã trang và nhãn planning (KT, mã trang Bài 04/05) nằm trong nội dung dự kiến lên mặt trang | Ví dụ bản đầu: A03 "Bài 05 B07", E03 "KT13", F05 "KT12, KT13" | Thay mã bằng tên kết quả; thêm mục "Quy ước nhãn" vào outline | Đã sửa; đã quét trường "Ý chính" bằng biểu thức chính quy, không còn mã; chờ tái kiểm | Chấp nhận |
| trung bình (SB10) | A05, E01, phần E | $D$ của bài này trùng $D$ tập dữ liệu của Bài 05; thiếu cặp $K$/$T$ | Bài 05 HT1 dùng $D$ cho tập dữ liệu, $T$ cho số bước | A05 và ghi chú E01: "Bài 05 dùng $D$ cho tập dữ liệu; ở bài này $D$ là khoảng cách đầu"; phần E viết "tập dữ liệu" bằng chữ; thêm "$K$ (Bài 05 viết $T$)" | Đã sửa; chờ tái kiểm | Chấp nhận |
| trung bình (SB11) | A04, E03, E07, F04, F05, C07 | Năm trang quá tải hoặc mang hai luận điểm | Bản đầu: A04 có công thức số bước; E03 có ví dụ VD-B; E07 có đại số giải đệ quy; F05 gộp chứng minh và chọn bước; C07 có nhận xét PL trên trang | A04 chuyển số bước vào ghi chú; E03 bỏ VD-B; E07 giải đệ quy vào ghi chú; F04 nhận hệ quả chọn bước, F05 chỉ chứng minh; C07 (mới C06) nhận xét PL vào ghi chú, T2b một dòng | Đã sửa; chờ tái kiểm | Chấp nhận |
| trung bình (SB12) | B08, C10, E03, E12 | Bài tập lặp lại số đã giải trên trang; E03 lộ đáp án E12 câu (3) | B08 (2) kiểm tại $x_0$ như B03–B04; C10 (2) dùng $k=1,2$ như C08; E03 nêu VD-B ngẫu nhiên với $G=1$ | B08 (mới B07) câu (2) dùng $x=(1,-1)$: $3\le5\le9{,}67\le11{,}67\le16{,}33$; C10 (mới C09) câu (2) dùng $k=2,3$; E12 giữ, E03 không nêu đáp án | Đã sửa; chờ tái kiểm | Chấp nhận (chuỗi số do điều phối viên kiểm) |
| trung bình (SB13) | B06, E04, F01, nguồn | Lấy dữ kiện từ Bài 06, bài học sau Bài 05b | Bản đầu B06 dùng bốn điểm của Bài 06 E06; VD-D dẫn Bài 06 E06 | Ví dụ tự chứa; VD-D lấy nguồn Bài 05 A06 ($r(u)=(u^2-1)^2$); Bài 06 chỉ là liên kết về sau | Đã sửa; chờ tái kiểm | Chấp nhận |
| trung bình (SB14) | G01, G04 | Phần G không nối kết quả với mục tiêu; thiếu câu hỏi tự kiểm | Bản đầu G01 không có cột mục tiêu; G04 chỉ liệt kê nhóm bài | G01 thêm cột mục tiêu (ghi bằng hành vi); G04 thêm ba "Câu hỏi:" tự kiểm, đổi tiêu đề thành "Câu hỏi tự kiểm, bài tập và tài liệu đọc" | Đã sửa; ba câu hỏi là nội dung mới, chờ kiểm toán | Chấp nhận |
| nhẹ (SB15) | B01, C02, C08, C10, E05, F01, F06, G01, G02, G03, A02 | Câu nối, tiêu đề và cách đếm chưa chính xác | Bản đầu: B01 tiêu đề chỉ một phản ví dụ; "sáu định lý" ở G02; tiêu đề C08, C10 gần nhau; F01, F06 thiếu LLO11 | Câu nối B01→B02 (cận trên rồi chiều ngược); câu nối E05→E06 nêu ba giới hạn của T4; tiêu đề B01 "Hội tụ giá trị và hội tụ dãy lặp", C09 mới "Quay lui, co và ngưỡng bước"; G01, G02 ghi đủ T1', T2'; "sáu bậc của sợi chỉ chứng minh"; A02 "mọi bảo đảm được chứng minh trong bài"; G03 nêu tên công cụ; C02 luận điểm bao hai mẫu; F01, F06 thêm LLO11/CLO1 | Đã sửa; chờ tái kiểm | Chấp nhận |
| trung bình (SB16) | C01, J4 | Ba khoảng trống của C01 không khớp Bài 04: Bài 04 đã có chứng minh đầy đủ trong học liệu mục B | Học liệu Bài 04 mục B (định lý $O(1/k)$ có chứng minh); C01 lượt 2 nói "chứng minh mới ở mức ý chính" và "$\inf$ không đạt chưa được loại trừ" | Viết lại: (1) chưa có cận cho $d_k$ và tính không tăng của $d_k$; (2) chưa có dạng bước $\eta\le1/L$ (T1'), mặt trang Bài 04 chỉ nêu ý chính, chứng minh đầy đủ ở học liệu mục B; (3) chưa chỉ ra bước dùng giả thiết đạt cực tiểu (B01: thiếu nó thì $e_k\to0$ mà $x_k\to\infty$). Sửa J4 khớp | Đã sửa C01 (luận điểm, ý chính, hình thức hóa, ghi chú), J4; C04 ghi chú nêu bước dùng H4; chờ duyệt | Chấp nhận |
| trung bình (SB17) | Storyboard câu nối C→D, D→E, KN2; outline B01, E07, các trường Nguồn | Mã trang trong văn bản sẽ chép sang ghi chú | "Hằng số $L$ vào chứng minh C04…", "Chứng minh D05…", "B02, B03 chặn…", "(E03)", "Bài 04 RG15" | Thay bằng tên kết quả hoặc mục học liệu; mở rộng "Quy ước nhãn" cho trường Hình thức hóa, câu nối trong Kết nối, Nguồn | Đã sửa; quét các trường Ý chính, Hình thức hóa, Nguồn và câu nối trong ngoặc kép: không còn mã trang, KT, KH, MT, N, VD-; mã KT và N6 trong Nguồn chuyển sang tên kết quả và Ghi chú soạn; câu nối E→F đổi "E" thành "SGD lồi"; chờ duyệt | Chấp nhận |
| trung bình (SB18) | Sổ định lý, E04, G01 | T4 dùng dưới gradient nhưng ghi "H1" không kèm dạng như T3 | Sổ định lý lượt 2: T3 "H1 (dạng dưới gradient)", T4 "H1" | Ghi "H1 (dạng dưới gradient)" cho T4 ở sổ định lý, E04, G01 | Đã sửa; chờ duyệt | Chấp nhận |
| trung bình (SB19) | F06, F07 | F06 kết luận "Ví dụ D không thỏa PL với mọi $\mu>0$" trùng đáp án F07 (2); bài tập chỉ phủ định | Outline lượt 2 F06 câu cuối Ý chính; F07 câu (2) | Bỏ câu kết luận khỏi F06; F07 (2): chứng minh $\frac12F'(\theta)^2=2\theta^2F(\theta)$, suy ra PL với $\mu=2c^2$ trên $\{\lvert\theta\rvert\ge c\}$, không đúng toàn cục | Đã sửa F06, F07 (ý chính, đáp án), VD-D, bản đồ KN6; đẳng thức do điều phối viên kiểm; chờ duyệt | Chấp nhận |
| trung bình (SB20) | F06 | Trang quá tải; ví dụ dương viết "thỏa PL" trước khi phát biểu H7 | Outline lượt 2 F06: "Ví dụ C thỏa với $\mu=3$, Ví dụ A với $\mu=1$" đứng trước H7 | Ví dụ dương viết thành phép tính $\lVert\nabla f\rVert^2=9x_1^2+49x_2^2\ge6e$; VD-A vào ghi chú | Đã sửa F06 và bản đồ KN6; chờ duyệt | Chấp nhận |
| trung bình (SB21) | C04, C05 | Dòng nhu cầu với $x_1^2$ đặt cuối trang chứng minh, làm C04 mang hai luận điểm | Outline lượt 2 C04 "Dòng cuối: cận phải đúng cho $x_1^2$…" | Chuyển dòng nhu cầu lên đầu C05 trước phát biểu T2; C04 chỉ chứng minh; sửa câu nối KN3 | Đã sửa C04, C05, storyboard C04, C05, KN3; chờ duyệt | Chấp nhận |
| trung bình (SB22) | D03, D05, D06 | D03 mang hai lượt chạy; D05 mang phép kiểm Jensen trên trang | Outline lượt 2 D03 (bước $\frac12$ và $4{,}5$), D05 (kiểm Jensen) | D03 chỉ giữ lượt bước $4{,}5$; lượt bước $\frac12$ sang D06 (kiểm cận); phép kiểm Jensen ở D05 vào ghi chú | Đã sửa D03, D05, D06, hình `vdb-subgradient-iterates.svg`, bản đồ KN4; chờ duyệt | Chấp nhận |
| nhẹ (SB23) | D03 | "nhỏ hơn sai số $\frac16$ của mọi điểm lặp" sai nghĩa vì các điểm lặp có sai số khác nhau | Sai số tại $0$ là $\frac13$, tại $1{,}5$ là $\frac16$ | "nhỏ hơn sai số của mọi điểm lặp (nhỏ nhất là $\frac16$)" | Đã sửa; chờ duyệt | Chấp nhận |
| nhẹ (SB24) | Storyboard, khái niệm phụ | Markov và Jensen thiếu lý do riêng cho cách xử lý | Đoạn "Khái niệm phụ dùng chu trình rút gọn" lượt 2 | Markov ghi lý do riêng (công cụ xác suất tiên quyết, chứng minh một dòng, chỉ dùng ở E11); Jensen ghi hình D03 làm trực quan trong KN4 | Đã sửa đoạn khái niệm phụ và cột trực quan KN4; chờ duyệt | Chấp nhận |
| nhẹ (SB25) | B06 | Câu "Trung bình lặp và xác suất được thêm vào bản đồ ở D và E" không chỉ nơi thực hiện | Outline lượt 2 B06 Kết nối | Ghi rõ: ghi chú D05, ghi chú E11, dòng gom G01 | Đã sửa outline B06, G01 và storyboard B06; chờ duyệt | Chấp nhận |
| nhẹ (SB26) | G04 | Đáp án câu (2) áp T8 cho mạng nơ ron mà không nêu điều kiện | Outline lượt 2 G04 đáp án (2) "T8; …" | "T8 nếu H0, H2, H6, H6b đúng; cần kiểm các giả thiết này trước; kể cả khi đúng, T8 không nói tới cực tiểu nào…" | Đã sửa; chờ duyệt | Chấp nhận |
| nhẹ (SB27) | G01, G04 | Thiếu ánh xạ câu hỏi tự kiểm sang mục tiêu; G01 thiếu dòng tổng kết mục tiêu | Storyboard lượt 2 G04 chỉ ghi LLO | Storyboard ghi câu (1) đo MT3, câu (2), (3) đo MT4; thêm dòng tổng kết bốn mục tiêu ở G01 | Đã sửa outline G01, G04 (ghi chú soạn), storyboard G04; chờ duyệt | Chấp nhận |
| nhẹ (SB28) | C07 → C08 | Câu nối không nêu giới hạn tạo nhu cầu cho quay lui | Outline lượt 2 C07 Kết nối "C08 bỏ yêu cầu biết $L$" | Câu nối: "T1, T2 dùng bước $1/L$, tức phải biết $L$" | Đã sửa outline C07 và câu nối KN3; chờ duyệt | Chấp nhận |
| nhẹ (SB29) | Nhật ký tác tử | Dòng bằng chứng của tác tử (d) | Do điều phối viên nêu | Điều phối viên tự sửa | Điều phối viên xử lý; tác tử soạn không sửa dòng này | Chấp nhận |

## Nghi vấn cần điều phối viên xác nhận

Tác tử soạn không phát hiện hằng số sai trong sổ định lý. Đã kiểm lại bằng phép tính tay và Python: T1, T1', T2a, T2b, T5 (đệ quy và chuỗi hình học), T6 (quy nạp với $a_1\le G^2/\mu^2$ và bước quy nạp $\frac{k-1}{k}+\frac1{k+1}\le1$), T8 (cả hai trường hợp của $\min$), chuỗi kẹp dưới H2 + H3, mọi số của VD-A, VD-B, VD-C, VD-D trong kế hoạch.

| Mã | Nội dung | Đề xuất | Trạng thái |
|---|---|---|---|
| N1 | Kế hoạch ghi "T1 trên VD-C (7000 so với 6)" không giải thích. Tác tử soạn hiểu là số bước để $e_k\le0{,}01$: cận $70/k$ cần $7000$; giá trị thật cần $6$ ($6(16/49)^6\approx0{,}0073$, $6(16/49)^5\approx0{,}022$) | Xác nhận cách hiểu | Đã dùng ở C07 theo SB03; chờ xác nhận |
| N2 | VD-D: $L=11$ chỉ đúng trên $[-2,2]$. T7 áp dụng được vì phép lặp bước $\frac1{11}$ đưa $[-2,2]$ vào $[-\frac{16}{11},\frac{16}{11}]$. T8, T9 cần H2 toàn cục, nên F07 câu (3) ghi "giả sử H2 với $L=11$" | Xác nhận cách ghi | Mở |
| N3 | Số mới ở ghi chú E10: VD-A với $\eta_k=\frac1{k+1}$ có $\theta_k\in[-1,3]$, H6a đúng trên vùng với $G^2=\frac{20}3$; cận T6 $\frac{20}{3k}$ so với $\frac8{3k}$ | Xác nhận trước khi đưa vào ghi chú diễn giả | Mở |
| N4 | Số mới do tác tử soạn tính ở bản đầu: B03 ($820\le868$; $f(x_1)\le\frac{24}7$); B04 ($30\le62\le136{,}7$; $d\le19{,}1$); B05 ($124\ge62$); B06 ($x^4$ tại $0{,}1$); C07 (bảng $k=1,5,10$, $k\ge15{,}6$); D07 ($x_0=2$: $2,\frac{11}6,\frac53,\frac32$; $\bar x_4=\frac74$); E02 ($\mathbb E[g_1\mid\mathcal F_1]=-0{,}9$); E11 ($\approx0{,}31$); E12 câu (3) ($\eta=0{,}1$, cận $0{,}1$); F01 ($-0{,}5625<0{,}1406$); F02 ($\theta_1=\frac{16}{11}$, $F(\theta_1)\approx0{,}311$); F07 ($\eta\approx0{,}064$, cận $\approx1{,}41$) | Giao tác tử toán kiểm lại | Điều phối viên đã kiểm toàn bộ, đúng; tác tử toán kiểm lại ở vòng rà soát |
| N5 | A04 định nghĩa hội tụ tuyến tính theo nghĩa cận ($u_k\le Cq^k$); kế hoạch không chốt | Xác nhận | Mở |
| N6 | Kế hoạch không chỉ nguồn cụ thể cho T5, T6, T8, T9; outline ghi "chứng minh trực tiếp" với bối cảnh SNW | Chọn nguồn hoặc chấp nhận "suy trực tiếp" | Mở |
| N7 | Chưa đối chiếu SNW Mệnh đề 4.5 với T3; D04 chỉ dẫn §4.1.2 | Giao tác tử nguồn nếu cần số mệnh đề | Mở |
| N8 | Dòng (a) ghi Claude Fable 5.1 effort `max` theo brief; CLAUDE.md hiện hành quy định tác tử con dùng Claude Opus 5.5 effort `high` | Điều phối viên quyết định có ghi ngoại lệ hay không | Mở |
| N9 | Điều phối viên dự kiến 52 trang; áp SB03 và SB05 vào 53 trang cho 51 | Xác nhận 51 trang, hoặc chỉ ra trang cần thêm | Đóng: điều phối viên xác nhận 51 trang; ước tính 52 trước đó đã cộng thừa việc tách A05 |
| N10 | Số mới của bản sửa (ngoài số điều phối viên đã kiểm): C09 câu (1) $c=\frac{25}{28}\approx0{,}893$ với $\alpha=\frac14$, $\beta=\frac12$ ($2\mu\alpha=1{,}5$, $2\beta\alpha\mu/L=\frac3{28}$), cần $k\ge78$ để $62c^k\le0{,}01$ ($62c^{77}\approx0{,}01006$, $62c^{78}\approx0{,}00898$); C09 câu (2) $d_2^2=\frac{1024}{2401}\approx0{,}427\le6{,}53$, $d_3^2\approx0{,}139\le3{,}73$; VD-B bước $\frac12$: $e_k=\frac13,\frac5{18},\frac29,\frac16$, trung bình $\frac14$ bằng sai số tại $\bar x_4$ (Jensen dấu bằng); VD-B bước $4{,}5$: trung bình các sai số $\frac14$ so với sai số $\frac1{12}$ tại $\bar x_4$; F06: VD-C có $\lVert\nabla f\rVert^2=9x_1^2+49x_2^2\ge9x_1^2+21x_2^2=2\cdot3\cdot e$ | Giao tác tử toán kiểm lại | Điều phối viên đã kiểm toàn bộ, đúng; tác tử toán kiểm lại ở vòng rà soát |
| N11 | G04 có ba câu hỏi tự kiểm mới (logistic có chính quy; SGD cho mạng nơ ron; Markov với $\mathbb E\le0{,}2$, đáp án $0{,}2$). Câu (1) cần hằng số $L$ của logistic có chính quy, để trong học liệu | Kiểm nội dung và đáp án | Mở |

## Tự kiểm no-ai-slop

Phạm vi: `outline.md`, `storyboard.md`, nhật ký này, ba lượt. Chế độ Edit, đã đọc `SKILL.md` và `eval.md` trước mỗi lượt. Văn phong học thuật và độ chính xác toán học được ưu tiên hơn gợi ý về giọng nói.

| Nhóm kiểm trong `eval.md` | Lượt 1 | Lượt 2 | Lượt 3 | Ghi chú |
|---|---|---|---|---|
| Giữ ý, không thêm khẳng định ngoài nguồn | Đạt | Đạt | Đạt | Số mới ghi ở N3, N4, N10; nội dung mới ở N11; nguồn chưa chắc ở N6, N7 |
| Từ cấm, cụm rỗng, trạng từ rỗng | Đạt | Đạt | Đạt | Quét các cụm tiếng Việt: "quan trọng", "then chốt", "đáng chú ý", "lưu ý", "thực sự", "rất", "hoàn toàn", "nhấn mạnh", "chúng ta", "hãy": không có |
| Câu cảm thán, câu hỏi tu từ, tiêu đề dạng câu hỏi, "Từ … đến …" | Đạt | Đạt | Đạt | Không có dấu chấm than hay dấu hỏi trong outline và storyboard; tiêu đề trang gọi tên khái niệm |
| Đối lập nhị phân, câu dẫn rỗng, lời bình định hướng người đọc | Đạt | Đạt | Đạt | Câu nối nêu kết quả kế thừa, giả thiết đổi, giới hạn |
| Đổi từ đồng nghĩa tùy tiện | Đạt | Đạt | Đạt | Một tên cho mỗi đối tượng: "trung bình lặp", "lặp tốt nhất", "cận dừng", "hàm thế", "dưới gradient", "bổ đề tách phương sai" |
| Nhịp câu khuôn mẫu | Đạt có điều kiện | Đạt có điều kiện | Đạt có điều kiện | Trường cố định của từng trang lặp cấu trúc theo mẫu `lec-05`. Lượt 2 viết luận điểm của năm trang bài tập theo kỹ năng được đo; mở đầu "Bài tập đo việc…" vẫn lặp theo trường cố định |
| Định dạng, gạch ngang dài | Đạt | Đạt | Đạt | Gạch ngang dài chỉ trong định dạng "Mã — Tiêu đề" của mẫu |
| Kết bằng điểm cụ thể | Đạt | Đạt | Đạt | Không có đoạn kết tóm tắt |

Sửa trong lượt 1: bỏ một dấu hỏi và cụm "(kiểm ở ghi chú soạn)" ở F01; viết lại câu mô tả hình ở B05; đổi ví dụ $x^4$ ở ghi chú trang đối chiếu VD-C (không $L$-trơn toàn cục) thành $x_1^2$; làm gọn mô tả hình ở D01, F06; viết lại câu mô tả pha ở E09.

Sửa trong lượt 2: thay "bổ đề E03" trong trường "Ý chính" của F05 bằng "bổ đề tách phương sai"; bỏ công thức hằng số $L$ chưa kiểm khỏi ghi chú G04; xóa các cụm "(mã cũ …)" khỏi tiêu đề trong bảng theo trang, chuyển sang bảng đổi mã.

Sửa trong lượt 3: chuyển các mã trang, KT và N6 khỏi trường Nguồn, Hình thức hóa và câu nối trong ngoặc kép sang tên kết quả hoặc Ghi chú soạn; đổi "VD-A", "VD-C" trong đáp án sang "Ví dụ A", "Ví dụ C"; viết lại ba khoảng trống của C01 theo đúng nội dung Bài 04; tách câu kết luận PL của VD-D khỏi F06 để không lặp đáp án F07. Lượt 3 không có số mới; đẳng thức $\frac12F'^2=2\theta^2F$ do điều phối viên kiểm.

## Việc hạ tầng còn chờ

| Việc | Vị trí | Ghi chú |
|---|---|---|
| Sửa bộ lọc học liệu để nhận `lec-05b` | `2627-1/scripts/sync-local-materials.py`, khoảng dòng 52–58 (kiểm `len(name) == 6` và hai chữ số) | Sau khi sửa chạy `--check` trên toàn bộ bài cũ; `material-viewer.html` không kiểm tên |
| Thêm mục "Bài 05b (bổ trợ)" | `2627-1/index.html` | Chỉ thêm khi deck và học liệu hoàn tất; không liên kết `planning/` |
| J10: ký hiệu $x^{(k)}$ và $x^k$ lẫn trong học liệu Bài 04 | `2627-1/materials/lec-04/lecture-note.md`, dòng 461–535 | Việc của Bài 04; nêu ở bàn giao, không sửa trong phạm vi Bài 05b |
| Vẽ 14 SVG | `2627-1/img/lec-05b/` | Danh sách và alt trong storyboard |
| Soạn học liệu | `2627-1/materials/lec-05b/lecture-note.md`, `exercises.md` | Gồm chứng minh T1', T5-pha, T6 (quy nạp KT15), Jensen quy nạp; 8–10 bài tập ba mức, có một bài Markov; đáp án câu hỏi tự kiểm G04 |
