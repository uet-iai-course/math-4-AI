# Dàn ý Bài 02 — Các bài toán tối ưu lồi (58 trang: 39 cốt lõi + 19 mở rộng)

## Định hướng chung
- **Chuẩn đầu ra:** LLO3 — "Hiểu rõ và biết cách vận dụng các khái niệm cơ bản về tối ưu lồi, tối ưu tựa lồi, tối ưu tuyến tính, tối ưu bậc hai, quy hoạch nửa xác định và tối ưu hóa vector" (CLO 1; đánh giá bằng bài tập cá nhân và nhóm). Tựa lồi và nhiều mục tiêu giữ trong tài liệu đọc và bài tập, không loại khỏi LLO3.
- **Đề cương:** 2 tiết lý thuyết và 1 tiết bài tập. Phân bổ nội bộ lần lượt cho sáu mạch chính: 0,40; 0,55; 0,55; 0,65; 0,50; 0,35 tiết (tổng 3 tiết). Không quy đổi sang phút khi chưa xác minh độ dài tiết. Bài tập được bố trí xen kẽ: trong sáu mạch, phần bài tập lần lượt là 0,05; 0,20; 0,20; 0,20; 0,15; 0,20 tiết (tổng 1 tiết); phần lý thuyết còn lại tổng 2 tiết. Phần mở rộng dùng cho đọc và luyện tập thêm.
- **Vai trò nguồn:** Boyd–Vandenberghe (2004) chương 4, §3.1.5 (tập trên đồ thị), §3.4 (tựa lồi), §A.5.5 (bổ đề Schur) là nguồn toán học chính; ghi chú dẫn xuất dầm theo Example 3.1 (IIT KGP) và ví dụ cantilever của Boyd; chuẩn phổ đối chiếu MOSEK §6.2.4; bộ số minh họa từ đề xuất 10/09/2026, đã kiểm tại numerical-check. Nguồn đặt trong aside.notes.
- **Ký hiệu xuyên suốt:** biến quyết định $x\in\mathbb{R}^n$; hàm mục tiêu $f_0$; ràng buộc $f_i(x)\le 0$, $h_j(x)=0$; giá trị tối ưu $p^\star$; nghiệm $x^\star$; biến phụ epigraph $t$; ma trận đối xứng $M\succeq 0$ (nón PSD); hàm log-tổng-mũ ký hiệu $\operatorname{lse}$; LP, QP, QCQP, GP, SDP nêu tên tiếng Việt trước lần đầu; "lồi chặt (còn gọi là lồi nghiêm ngặt)" lần đầu; không dùng SSE, viết "tổng bình phương sai số".
- **Ví dụ xuyên suốt:** hồi quy (LP/QP/QCQP) bắt đầu ở TT3 và phát triển tới TT20; dầm (GP) và phép đo (SDP) là hai mạch ứng dụng lớn.

## Bản đồ khái niệm sáu bước (nhu cầu → trực quan → ví dụ → hình thức → ứng dụng → bài tập), theo cụm
1. **Hồi quy xuyên suốt:** NEW-01 → A02 → C05/C04 → NEW-03/NEW-04 → C07-a/NEW-05 → Z02.
2. **LP phân bổ:** C03-a → C03-b (kèm kiểm tra chuyển giao ngắn).
3. **GP dầm:** D01/D06-a → NEW-06 → D02/D03 → NEW-07/D04-a/b → D06-b/c → D06-c (bài tập tại lớp), D07 (luyện thêm trong phụ lục).
4. **SDP phép đo:** E01-a/b → NEW-08 → E05 → E04 → NEW-09 → NEW-09 (kiểm tra ma trận tại nghiệm), E06-a/b (luyện thêm trong phụ lục).
5. **Tựa lồi (B01–B03):** chu trình đầy đủ ở phụ lục; mạch chính chỉ chỉ đường.
6. **Nhiều mục tiêu (F01–F04):** chu trình đầy đủ ở phụ lục; mạch chính chỉ chỉ đường.

## Sáu mạch chính

| Mạch | Thứ tự mã | Điểm vào và đầu ra |
|---|---|---|
| 1. Đặc tả nhu cầu (TT1–6) | P00, P01, NEW-01, A02, A04-a, NEW-02 | Kiến thức Bài 01 → mô hình hồi quy với miền C và phân biệt khả thi, tồn tại, duy nhất |
| 2. Tiêu chí sai số và LP/QP (TT7–13) | C05, C04, NEW-03, NEW-04, C02, C03-a, C03-b | Mô hình đã đặc tả → giải QP, cải dạng minimax thành LP, chuyển giao sang phân bổ |
| 3. Cải dạng và giới hạn độ nhạy (TT14–20) | A01, A03, C07-a, C07-b, C08, NEW-05, C01 | Các biểu diễn LP/QP → phân biệt đổi yêu cầu với cải dạng, chứng nhận QCQP và so phạt với trần |
| 4. Thiết kế dầm và GP (TT21–30) | D01, D06-a, NEW-06, D02, D03, NEW-07, D04-a, D04-b, D06-b, D06-c | Quy trình mô hình hóa → tích kích thước, cải dạng log, khôi phục nghiệm và thể tích |
| 5. Phép đo và SDP (TT31–36) | E01-a, E01-b, NEW-08, E05, E04, NEW-09 | Mô hình vô hướng → phương sai theo mọi hướng, LMI và xác suất chọn cấu hình |
| 6. Kiểm tra và kết luận (TT37–39) | Z01, Z02, Z03 | Ba tình huống → tự viết mô hình mới, kiểm tra ánh xạ nghiệm và chuẩn bị cho đối ngẫu |

## Nhóm mở rộng TT40–58 (appendix=1, điều hướng riêng: vào theo chủ đề, quay lại kết luận)
- TT40–45: A04-b, C06, C10, C09, D05, D07.
- TT46–49: E02, E03, E06-a, E06-b (Schur với $t=0$ xử lý đúng).
- TT50–54: B01, NEW-10, B02-a, B02-b, B03 (tựa lồi, chu trình sáu bước đầy đủ).
- TT55–58: F01–F04 (nhiều mục tiêu, Pareto, chiều đảo trọng số đã sửa).

## Ràng buộc biên tập
Không nhãn quy trình, không mã trang/thời lượng trên mặt trang; một luận điểm mỗi trang; nguồn truy nguyên; 22 hình SVG cục bộ vẽ từ mô hình và số liệu minh họa, không dùng ảnh cắt từ PDF; dàn ý và storyboard phải được đối chiếu với thứ tự thực trong RevealJS.