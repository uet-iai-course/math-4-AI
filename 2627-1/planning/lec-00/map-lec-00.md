# Bảng ánh xạ Bài 00: tên mục cũ → số hiệu mới

Tệp nội bộ cho giai đoạn 3 (dẫn chiếu). Lập lại từ bản ghi chú sau vòng biên tập 1 (2026-11-12), không lấy từ `plan.md` §8. Ghi chú Bài 00 cũ (HEAD trước lần viết lại) không có số hiệu; các bài khác dẫn nó theo **tên mục** `##`/`###`/`####` hoặc dẫn chung "Bài 00". Số dòng của các bài khác theo trạng thái ngày 2026-11-11/12 (`grep -n 'Bài 00' materials/*/lecture-note.md`). Deck Bài 00 và deck các bài khác không dẫn số hiệu của ghi chú Bài 00.

Các dải số hiệu dưới đây luôn tách theo loại khối.

## 1. Mục cũ → vị trí và số hiệu mới

| Mục cũ (dòng cũ) | Xử lý | Mục mới | Số hiệu mới | Dẫn chiếu hiện có cần đổi | Trạng thái giai đoạn 3 |
|---|---|---|---|---|---|
| Đoạn mở đầu (3) | viết lại; bỏ câu chỉ đường | đoạn dẫn | — | — | — |
| Mục tiêu và kiến thức tiên quyết (5–7) | tách | Mục tiêu học tập; Kiến thức tiên quyết | — | — | — |
| Quy ước ký hiệu (9–15) | thay bằng bảng; bỏ in đậm | 2. Ký hiệu và giả thiết | — | lec-01:29 (xem §3) | đã thay |
| `##` Đại số tuyến tính (17) | đổi tên | 4. Đại số tuyến tính cho dữ liệu | Mục 4 | — (không bài nào dẫn tên này) | — |
| Số vô hướng; Véc-tơ; Ma trận; Chuyển vị (21–102) | gộp | 4.1 | Định nghĩa 00.2; Ví dụ 00.4 | — | — |
| Phép toán cơ bản: Cộng véc-tơ, Cộng ma trận, Tích vô hướng, Tích trong Frobenius, Tích ma trận–véc-tơ, Tích ma trận–ma trận (104–235) | gộp | 4.1 | Định nghĩa 00.3; Ví dụ 00.3 | — | — |
| Chuẩn véc-tơ; Chuẩn ma trận (136–164) | gộp | 4.1 | Định nghĩa 00.4 | lec-01:415 ("mục 'Chuẩn ma trận'" → Định nghĩa 00.4) | đã thay |
| (không có) Cauchy–Schwarz, bất đẳng thức tam giác | thêm | 4.1 | Mệnh đề 00.5 | lec-02:24 (→ Mệnh đề 00.5); lec-01:415 ("bất đẳng thức Cauchy–Schwarz" → Mệnh đề 00.5); lec-04:35 ("Bất đẳng thức Cauchy–Schwarz", câu không ghi "Bài 00": có thể thêm "Mệnh đề 00.5") | đã thay |
| Không gian cột và hạt nhân (237–279) | tách | 4.2 | Định nghĩa 00.6, 00.7; Mệnh đề 00.8; Ví dụ 00.5 | lec-01:20 (→ Định nghĩa 00.7; Mệnh đề 00.8); lec-04:35 (phần bù trực giao của $\ker A$, $\dim\ker A=n-p$, câu không ghi "Bài 00": có thể thêm "Mệnh đề 00.8, kết luận 1 cho $A^T$ và kết luận 3") | đã thay |
| Hạng của ma trận (281–299) | gộp vào 4.2 | 4.2 | Định nghĩa 00.7; Mệnh đề 00.8; Ví dụ 00.5, 00.6 | lec-01:20 (→ Định nghĩa 00.7); lec-05:26 (hạng–số chiều → Mệnh đề 00.8, kết luận 3) | đã thay |
| Hệ phương trình tuyến tính (301–325) | thành định lý có chứng minh | 4.3 | Định lý 00.9; Ví dụ 00.7 | — | — |
| Định thức (327–354) | tách | 4.3 | Định nghĩa 00.10; Định lý 00.12 | — | — |
| Ma trận nghịch đảo (356–383) | tách | 4.3 | Định nghĩa 00.11; Định lý 00.12; Ví dụ 00.9 | — | — |
| Hệ cơ sở, hệ trực giao và hệ trực chuẩn (385–410) | thành mệnh đề; bỏ Gram–Schmidt | 4.4 | Định nghĩa 00.13; Mệnh đề 00.14; Ví dụ 00.10 | — | — |
| Véc-tơ riêng và giá trị riêng (412–468) | giữ | 4.5 | Định nghĩa 00.15; Ví dụ 00.11 | — | — |
| Các phép phân rã ma trận › Phân rã trị riêng (531–553) | lên 4.5, thành định lý | 4.5 | Định lý 00.16 | lec-02:24, lec-02:1028, lec-11:55, lec-11:1266 (→ Định lý 00.16) | đã thay |
| Các phép phân rã ma trận › Phân rã LU (476–505) | Đọc thêm | 4.8 | Định nghĩa 00.23 | — | — |
| Các phép phân rã ma trận › Phân rã QR (507–529) | Đọc thêm | 4.8 | Định nghĩa 00.24 | — | — |
| (không có) Phân rã Cholesky | thêm | 4.8 | Định nghĩa 00.25 | lec-04:35 ("phân rã Cholesky $Q=R^TR$", hiện không ghi "Bài 00": có thể thêm "Định nghĩa 00.25") | đã thay |
| Các phép phân rã ma trận › Phân rã giá trị kỳ dị (555–585) | Đọc thêm; tách giả nghịch đảo | 4.8 | Định nghĩa 00.26, 00.27 | — | — |
| Dạng toàn phương (587–632) | tách kết quả; thêm thương Rayleigh và hệ quả | 4.6 | Định nghĩa 00.17; Mệnh đề 00.18, 00.20; Hệ quả 00.19; Ví dụ 00.12, 00.13 | lec-01:19 (→ Định nghĩa 00.17; Mệnh đề 00.20); lec-01:467 ("$X^TX\succ0$ (Bài 00, mục 'Dạng toàn phương')" → Mệnh đề 00.20); lec-05:26 (thương Rayleigh → Mệnh đề 00.18; $\lVert Av\rVert\le\lambda_{\max}\lVert v\rVert$ → Hệ quả 00.19); lec-04:35 ($Q\succ0$ khả nghịch → Hệ quả 00.19; $Q^{1/2}\succ0$ → đoạn sau Ví dụ 00.37) | đã thay (lec-04:35: $Q^{1/2}\succ0$ nằm ở đoạn không đánh số trước Định nghĩa 00.71, không dẫn số) |
| `##` Giải tích nhiều biến (634) | đổi tên | 5. Giải tích nhiều biến cho hàm mất mát | Mục 5 | — | — |
| Hàm vô hướng và ánh xạ véc-tơ; Đồ thị, lát cắt và tập mức (638–668) | gộp | 5.1 | Định nghĩa 00.28; Ví dụ 00.15 | — | — |
| Đạo hàm riêng qua lát cắt một biến (670–689) | giữ | 5.2 | Định nghĩa 00.29 | — | — |
| Khả vi của hàm nhiều biến (691–710) | gộp với gradient; điều kiện đủ thành nhận xét | 5.2 | Định nghĩa 00.30; Nhận xét 00.31 | lec-01:415, lec-01:1581 (→ Định nghĩa 00.30) | đã thay |
| Gradient và quy ước véc-tơ cột (712–731) | gộp | 5.2 | Định nghĩa 00.30; Ví dụ 00.16 | — | — |
| Đạo hàm theo hướng (733–752) | thành mệnh đề có chứng minh | 5.3 | Định nghĩa 00.32; Mệnh đề 00.33 | lec-01:1599 (→ Mệnh đề 00.33); lec-04:319 ("Bài 00 chỉ định nghĩa đạo hàm theo hướng cho vector có chuẩn bằng 1" → Định nghĩa 00.32) | đã thay (lec-01:1599 dẫn Định nghĩa 00.30 vì hướng $y-x$ không đơn vị; lec-04:319 → Định nghĩa 00.32) |
| Vi phân, tuyến tính hóa và mặt phẳng tiếp xúc (754–773) | gộp | 5.3; 5.4 | đoạn sau Mệnh đề 00.33; Định nghĩa 00.34; Ví dụ 00.17 | — | — |
| Ma trận Jacobian (775–803) | giữ | 5.4 | Định nghĩa 00.34 | — | — |
| Quy tắc dây chuyền (805–830) | thành định lý | 5.4; 5.5 | Định lý 00.35; Mệnh đề 00.38 (hàm hạn chế) | lec-01:18 (→ Định lý 00.35; Mệnh đề 00.38); lec-01:1758 (→ Mệnh đề 00.38); lec-06:20, lec-06:621 ("Quy tắc dây chuyền dạng Jacobian chuyển vị (Bài 00)" → Định lý 00.35, kết luận 2); lec-04:24 ($\tfrac{d}{dt}f(x+td)$ → Mệnh đề 00.38) | đã thay |
| Tích Jacobian–véc-tơ và véc-tơ–Jacobian (832–848) | gộp vào ví dụ | 5.4 | đoạn sau Định lý 00.35; Ví dụ 00.18 | — | — |
| Đạo hàm riêng bậc hai và ma trận Hessian (850–877) | tách | 5.5 | Định nghĩa 00.36; Định lý 00.37 | lec-01:18 (→ Định nghĩa 00.36) | đã thay |
| Độ cong theo hướng và dạng toàn phương (879–898) | thành mệnh đề có chứng minh | 5.5 | Mệnh đề 00.38; Ví dụ 00.19 | — | — |
| (không có) hiệu hai gradient dạng tích phân | thêm | 5.5 | Hệ quả 00.39 | lec-04:24 ("Gradient thỏa $\nabla f(x+d)-\nabla f(x)=\int_0^1\ldots$" → Hệ quả 00.39) | đã thay |
| Khai triển Taylor bậc nhất và bậc hai (900–922) | thành định lý (phác thảo) | 5.5 | Định lý 00.40 | lec-04:24, lec-06:21, lec-06:877, lec-06b:24 (→ Định lý 00.40) | đã thay |
| Điểm dừng và điều kiện tối ưu bậc nhất (924–938) | tách | 5.6 | Định nghĩa 00.41; Định lý 00.42; Ví dụ 00.20 | lec-01:56, 437, 439, 1021, 1646, 2459, 2637; lec-03:27, 1746, 1770, 1793; lec-04:25, 138; lec-05:205 (→ Định lý 00.42) | đã thay |
| Phân loại điểm dừng bằng Hessian (940–954) | thành định lý và nhận xét | 5.7 | Định lý 00.43; Nhận xét 00.44; Ví dụ 00.21 | lec-01:1019, 2573; lec-06:21, 860, 891 (→ Định lý 00.43) | đã thay |
| Gradient, Hessian và phương trình chuẩn của bình phương nhỏ nhất (980–1016) | thành mệnh đề | 5.8 | Mệnh đề 00.45; Ví dụ 00.22 | — | — |
| Điều kiện tồn tại và tính duy nhất của nghiệm bình phương nhỏ nhất (1018–1035) | lên 4.7, thành định lý | 4.7 | Định nghĩa 00.21; Định lý 00.22; Ví dụ 00.14 | — (Bài 01 tự chứng minh ở Mệnh đề 01.5; Q00-4: Bài 01 dẫn lại Định lý 00.22) | — |
| Một bước gradient và ảnh hưởng của độ dài bước (1037–1064) | giữ; thêm (5.1) | 5.8 | Định nghĩa 00.46; Ví dụ 00.23; Bài tập 00.1 | — | — |
| Tích phân một biến và tích phân nhiều biến (956–978) | tách | 5.9 | Định nghĩa 00.47; Định lý 00.48; Ví dụ 00.24 | — | — |
| `##` Xác suất một biến (1068) | giữ tên; nhiễu và hợp lý chuyển sang 7.3 | 6. Xác suất một biến | Mục 6 | lec-05c:23 (→ "Bài 00, Mục 6 và Mục 7", hoặc các khối 00.49–00.73) | đã thay |
| Phép thử, không gian mẫu, biến cố và không gian xác suất (1072–1084) | nêu đủ tiên đề | 6.1 | Định nghĩa 00.49; Ví dụ 00.25 | lec-05c:213–214 (→ Định nghĩa 00.49) | đã thay |
| Biến ngẫu nhiên và luật phân phối (1086–1102) | giữ | 6.2 | Định nghĩa 00.50; Ví dụ 00.26 | lec-05c:819 (nội dung; tùy chọn → Định nghĩa 00.50) | đã thay (lec-05c:819 → Định nghĩa 00.51, ghi ký hiệu $p_U$) |
| Biến rời rạc và hàm khối xác suất (1104–1122) | giữ; tham số Bernoulli $\pi\to\theta$ | 6.3 | Định nghĩa 00.51; Ví dụ 00.27 | lec-05c:885 (→ Định nghĩa 00.51; xem §3) | đã thay |
| Biến liên tục và hàm mật độ xác suất (1124–1142) | giữ; Gauss tách sang 6.5 | 6.3 | Định nghĩa 00.52; Ví dụ 00.28 | lec-05c:968 (câu về phân phối Gauss → Định nghĩa 00.58) | đã thay |
| Hàm phân phối tích lũy và quan hệ PMF–PDF–CDF (1144–1164) | tách | 6.3 | Định nghĩa 00.53; Mệnh đề 00.54; Ví dụ 00.29 | lec-05c:856 (→ Mệnh đề 00.54) | đã thay |
| Kỳ vọng và kỳ vọng của một hàm (1166–1186) | sửa điều kiện tồn tại | 6.4 | Định nghĩa 00.55; Ví dụ 00.30 | lec-05c:1161 (→ Định nghĩa 00.55); lec-05b:20 (kỳ vọng → Định nghĩa 00.55; "kỳ vọng tuyến tính", $\mathbb E[ZW]=\mathbb EZ\,\mathbb EW$ → Mệnh đề 00.66) | đã thay |
| Phương sai, độ lệch chuẩn và biến đổi affine (1188–1211) | tách | 6.4 | Định nghĩa 00.56; Mệnh đề 00.57; Ví dụ 00.31 | lec-05c:1348 (→ Mệnh đề 00.57); lec-06b:25 ($\operatorname{Var}(aX)$ → Mệnh đề 00.57); lec-05b:20 ($\operatorname{Var}Z=\mathbb EZ^2-(\mathbb EZ)^2$ → Mệnh đề 00.57, kết luận 2) | đã thay |
| Nhiễu Gauss, hàm hợp lý và bình phương nhỏ nhất (1213–1245) | tách; Gauss một biến ở 6.5, phần còn lại sang 7.3 | 6.5; 7.3 | Định nghĩa 00.58 (6.5); Định nghĩa 00.63, 00.64; Mệnh đề 00.65; Ví dụ 00.35 (7.3) | lec-01:706 (→ Mệnh đề 00.65) | đã thay |
| `##` Xác suất nhiều biến (1247) | đổi tên | 7. Vector ngẫu nhiên, nhiễu và phân phối nhiều biến | Mục 7 | lec-05c:23 (như trên) | đã thay |
| Véc-tơ ngẫu nhiên và phân phối đồng thời (1251–1270) | giữ | 7.1 | Định nghĩa 00.59; Ví dụ 00.32 | — | — |
| Phân phối biên, có điều kiện, xác suất toàn phần và Bayes (1272–1302) | tách | 7.1 | Định nghĩa 00.60; Mệnh đề 00.61; Ví dụ 00.33 | lec-05c:577 (→ Mệnh đề 00.61) | đã thay (lec-05c:577 → Mệnh đề 00.61, ghi ký hiệu $p_{U,V}$) |
| Độc lập và độc lập có điều kiện (1304–1316) | mở rộng cho $k$ biến, rời rạc hoặc có mật độ; tính tuyến tính của kỳ vọng thêm ở đầu 7.4 | 7.2; 7.4 | Định nghĩa 00.62; Ví dụ 00.34 (7.2); Mệnh đề 00.66 (7.4) | lec-05c:1007 (→ Định nghĩa 00.62); lec-05b:20, lec-06b:25 (độc lập → Định nghĩa 00.62; kỳ vọng của tích → Mệnh đề 00.66) | đã thay |
| Kỳ vọng véc-tơ, hiệp phương sai, tương quan và biến đổi affine (1318–1356) | tách | 7.4 | Mệnh đề 00.66; Định nghĩa 00.67; Mệnh đề 00.68; Ví dụ 00.36; Nhận xét 00.69 | lec-06b:25 (hiệp phương sai vector → Định nghĩa 00.67, Mệnh đề 00.68) | đã thay |
| Gauss nhiều biến (1358–1385) | thêm phép tính Mahalanobis | 7.5 | Định nghĩa 00.70; Ví dụ 00.37 | — | — |
| Gauss nhiều biến › Khoảng cách Mahalanobis và làm trắng (1387–1399) | thêm chứng minh | 7.5 | Định nghĩa 00.71; Mệnh đề 00.72 | — (Bài 11 tự trình bày, dẫn phân rã trị riêng → Định lý 00.16) | — |
| Nhiễu tương quan và bình phương nhỏ nhất tổng quát (1401–1431) | thành mệnh đề | 7.6 | Mệnh đề 00.73; Ví dụ 00.38 | — | — |
| `##` Mô hình giá nhà với các công cụ đã ôn (1435) | tách khắp bài | 3; 8 | Ví dụ 00.1; Tình huống 00.1, 00.2 | — (không bài nào dẫn tên này) | — |
| Mô hình giá nhà: Bước 1–3 (1439–1514) | dữ liệu lên đầu bài | 3; 4.1 | Ví dụ 00.1, 00.4; Định nghĩa 00.1 | — | — |
| Bước 4 (1516–1542) | tách | 3; 4.3 | Ví dụ 00.2, 00.8 | — | — |
| Bước 5 (1544–1566) | gộp vào kết quả | 7.3; 7.6 | Mệnh đề 00.65, 00.73 | — | — |
| Bước 6–7 (1568–1637) | tách | 4.7; 5.8; 8.1 | Ví dụ 00.14, 00.22, 00.23; Tình huống 00.1 | — | — |
| Bước 8 (1639–1670) | thành tình huống | 8.1 | Tình huống 00.1 | — | — |
| Bước 9 (1672–1700) | thành định nghĩa và tình huống | 8.2 | Định nghĩa 00.74; Tình huống 00.2 | — | — |
| Tài liệu tham khảo (1702–1710) | ba tầng | 11. Tài liệu đọc | — | — | — |
| (mới) | — | 5.8; 8.1; 8.3; 9; 10 | Bài tập 00.1 (khối ở 5.8), Bài tập 00.2 (khối ở 8.1); Tóm tắt (8.3); mục 9 liệt kê Bài tập 00.1, 00.2; Câu hỏi cuối buổi (10) | — | — |

## 2. Số hiệu của bản nháp draft-v1 → bản sau biên tập vòng 2

Chỉ dùng để đối chiếu các báo cáo rà soát (số hiệu draft-v1, draft-v2 chưa được dẫn ở bài nào khác). Từ draft-v2 sang bản sau vòng 2 chỉ đổi: Mệnh đề 00.63 → 00.66 (chuyển lên đầu 7.4); Định nghĩa 00.64, 00.65 → 00.63, 00.64; Mệnh đề 00.66 → 00.65.

| Loại | draft-v1 → mới |
|---|---|
| Bộ đếm chung | 00.1–00.18 giữ nguyên; (mới) Hệ quả 00.19; 00.19–00.23 → 00.20–00.24; (mới) Định nghĩa 00.25 (Cholesky); 00.24–00.36 → 00.26–00.38; (mới) Hệ quả 00.39; 00.37–00.55 → 00.40–00.58; 00.59–00.62 giữ nguyên; 00.56–00.58 → 00.63–00.65; (mới) Mệnh đề 00.66 (ở đầu 7.4); 00.63–00.70 → 00.67–00.74 |
| Ví dụ | 00.1–00.31 và 00.36–00.38 giữ nguyên; 00.33 → 00.32; 00.34 → 00.33; 00.35 → 00.34; 00.32 → 00.35 |
| Tình huống, Bài tập | giữ nguyên |

## 3. Câu phải sửa nội dung (không chỉ thay số), theo Q00-2 và Q00-3

| Vị trí | Câu hiện tại (tóm tắt) | Việc ở giai đoạn 3 | Trạng thái giai đoạn 3 |
|---|---|---|---|
| lec-01:29 | "Khác với Bài 00, chương này viết vector và ma trận bằng chữ thường, không in đậm." | bỏ vế so sánh với Bài 00 | đã thay: bỏ "Khác với Bài 00," |
| lec-04:22 | "Bài 00 không đánh số nên các kết quả của nó được phát biểu lại …" | thay bằng dẫn số hiệu `00.k` | đã thay |
| lec-05b:18 | "Ghi chú Bài 00 được dẫn bằng tên khái niệm." | thay bằng dẫn số hiệu `00.k` | đã thay |
| lec-05c:21 | "Ghi chú Bài 00 không đánh số, nên các kết quả của nó được dẫn theo tên mục." | thay bằng dẫn số hiệu `00.k` | đã thay |
| lec-06:18 | "Ghi chú Bài 00 được dẫn bằng tên khái niệm." | thay bằng dẫn số hiệu `00.k` | đã thay |
| lec-06b:22 | "Ghi chú Bài 00 không đánh số, nên các kết quả của nó được phát biểu lại." | thay bằng dẫn số hiệu `00.k` | đã thay |
| lec-05c:885 | đối chiếu ký hiệu tham số Bernoulli $\pi$ của Bài 00 | Bài 00 nay viết $\theta$ (Định nghĩa 00.51) | đã thay |
| lec-05:26 | gán cho Bài 00 "ma trận Vandermonde … khả nghịch" | Bài 00 không có kết quả này (Q00-5): tách khỏi "(Bài 00 …)", giữ nguồn Strang (2016) | đã thay một phần: "(Bài 00, Mệnh đề 00.8, 00.18 và Hệ quả 00.19; Strang 2016)", Vandermonde để nguồn Strang |
| lec-05c:23 | "Bài 00 nêu định nghĩa … kèm ví dụ nhưng không chứng minh các quy tắc tính" | sai với bản mới (Mệnh đề 00.57, 00.61 chứng minh đầy đủ; Mệnh đề 00.54 phác thảo, 00.66 ngoài phạm vi): thay bằng câu nêu đúng phần Bài 00 chứng minh, hoặc bỏ vế này | đã thay: "kèm ví dụ và chứng minh các quy tắc tính ở Mệnh đề 00.57 và 00.61, nhưng không nối …" |
| lec-05c:71 | "Bài 00 viết xác suất là $\Pr$." | vẫn đúng; không đổi | không đổi (vẫn đúng) |
| lec-06:604 | "Đây mới là mô tả trực quan; …" | ngoài phạm vi giai đoạn 3 của Bài 00; xử lý khi viết lại Bài 06 | không đổi (ngoài phạm vi); đã thêm "(Định lý 00.35)" cho dẫn chiếu |

## 4. Dẫn chiếu chung không dẫn tên mục

lec-01:15, lec-01:2861, lec-05c:2904 dẫn "Bài 00" chung; không cần đổi. lec-01:437, 439, 1021, 1646, 2637 nói "điều kiện cần … của Bài 00": thêm "(Định lý 00.42)". lec-03:27, lec-04:25 dẫn "Bài 00, nhắc lại ở Nhận xét 01.15": thêm "Định lý 00.42". Bài 01 dùng $\mathcal R$, $\ker$, $X\in\mathbb R^{n\times d}$; Bài 00 dùng $\operatorname{Col}$, $\operatorname{Ker}$, $X\in\mathbb R^{m\times n}$: khi viết lại Bài 01, bảng ký hiệu ghi một dòng đối chiếu.
