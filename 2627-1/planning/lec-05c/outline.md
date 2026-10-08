# Dàn bài Bài 05c — Xác suất cơ bản, bất đẳng thức tập trung và mất mát trung bình trên nhóm nhỏ

Quy ước thuật ngữ: chuẩn đầu ra bài học (LLO), chuẩn đầu ra học phần (CLO), phương pháp hạ gradient (GD), phương pháp hạ gradient ngẫu nhiên (SGD), độc lập cùng phân phối (independent and identically distributed, i.i.d.), hàm khối xác suất (probability mass function, PMF), hàm phân phối tích lũy (cumulative distribution function, CDF).

## Phạm vi và quyết định thiết kế

Bản đầu ngày 2026-10-08; bản sửa cùng ngày theo cổng storyboard (G1–G22) và quyết định của điều phối viên, xem [review-log.md](review-log.md). Kế hoạch gốc là tệp `lec-05c-plan.md` trong thư mục tạm của phiên. Storyboard ở [storyboard.md](storyboard.md).

- **Sản phẩm.** Chỉ học liệu: `2627-1/materials/lec-05c/lecture-note.md`, `2627-1/materials/lec-05c/exercises.md`, SVG trong `2627-1/img/lec-05c/`. Không có deck `lecture-05c-*.html`. Viewer mở hai tệp với riêng tham số `doc` (`DECKLESS_LECTURES` trong `material-viewer.js`, đã commit).
- **Vị trí.** Bài bổ trợ, đọc sau Bài 05 (mất mát huấn luyện, rủi ro kỳ vọng, gradient nhóm nhỏ), trước hoặc song song Bài 05b. Bài 05c không dùng kết quả của Bài 05b làm tiền đề; Bài 05b chỉ được dẫn ở §G.6 (một câu về dạng tổng quát của giá trị giới hạn) và §G.7 (H6, H6b, BĐ6). §A.3 và §E.7 chỉ nhắc tên $\mathcal F_k$ và tính chất tháp để báo trước chỗ Bài 05b dùng. Tên thư mục `lec-05c` giữ thứ tự `lec-05 < lec-05b < lec-05c < lec-06`.
- **Thời lượng.** Đề cương DOCX có 15 buổi, không buổi nào dành cho xác suất cơ bản; xác suất chỉ xuất hiện ở Buổi 11–14 (mô hình đồ thị xác suất) và trong học phần tiên quyết Xác suất thống kê. Không gán thời lượng cho bài, phần hay tiểu mục.
- **Đối tượng.** Sinh viên chưa nắm chắc xác suất. Ghi chú tự chứa, xây lại mọi khái niệm từ không gian mẫu (quyết định 1). Bài 00 đã ôn xác suất một biến và nhiều biến (`materials/lec-00/lecture-note.md`, dòng 998–1327); ở mỗi khái niệm trùng Bài 00, ghi chú có một câu đối chiếu, trong đó nêu rằng Bài 00 dùng ký hiệu $\Pr$.
- **Phần liên tục.** Chỉ định nghĩa mật độ, ví dụ phân phối đều trên $[0,1]$, phát biểu phân phối Gauss; mọi chứng minh viết cho trường hợp rời rạc, kèm nhận xét rằng kết quả vẫn đúng cho biến có mật độ khi thay tổng bằng tích phân (quyết định 2).
- **Mức trình bày.** Chứng minh đầy đủ: mọi kết quả có cột CM là "có" trong danh mục kết quả. Chỉ phát biểu: Định nghĩa D.4 (phần Gauss), Mệnh đề D.7, Bổ đề F.7 (kết quả chuẩn), Nhận xét F.10 (định lý giới hạn trung tâm), Nhận xét G.5 (Bottou và Bousquet).
- **Độ dài.** Ghi chú 11 000–13 800 từ, bài tập 3 500–4 500 từ, đếm như `wc -w` (quyết định 3). Ví dụ tùy chọn VD-09 (ở §F.6), VD-11 (ở §E.2) giữ trong ghi chú, mỗi ví dụ không quá một đoạn; VD-23 chuyển vào BT5.
- **Thuật ngữ nhóm nhỏ.** Dùng "nhóm nhỏ (minibatch)" như Bài 05 và 05b; một câu ở §A.3 nêu rằng Bài 06 gọi cùng đối tượng là "lô nhỏ". Không sửa Bài 06 (quyết định 5).
- **Ví dụ trò chơi.** VD-08 là phép tính kỳ vọng thuần, không bình luận cờ bạc; quy ước "nhận 10 gồm cả tiền đặt" ghi rõ.

### Quy ước mã và nhãn

| Xuất hiện trong học liệu | Chỉ dùng trong tài liệu lập kế hoạch |
|---|---|
| Nhãn kết quả có kèm loại: "Định nghĩa B.1", "Mệnh đề E.10", "Định lý F.8", "Bổ đề F.7", "Hệ quả F.9", "Nhận xét G.5" | Mã tiểu mục §A.1…§H.3; mã ví dụ VD-00…VD-23; mã khái niệm K1–K15; mã hình H-01…H-11; mã bài tập BT1–BT10; câu hỏi Q1–Q4b khi viết tắt; mã phát hiện |
| Giả thiết G1–G4; tham chiếu Bài 05b bằng tên kết quả (H6, H6b, BĐ6) | Số dòng trong tệp nguồn |
| Tên cố định của ví dụ dùng lại: "ví dụ ba quan sát", "ví dụ hai xúc xắc", "ví dụ thăm dò", "ví dụ xét nghiệm" | |

Mã tiểu mục mang tiền tố `§` để không trùng nhãn kết quả: §B.2 là tiểu mục, "Định nghĩa B.1" và "Mệnh đề B.2" là hai kết quả nằm trong §B.2. Tiêu đề `###` trong ghi chú chỉ gồm tên khái niệm, không có mã, theo mẫu học liệu Bài 05b. Nhãn kết quả đánh theo chữ cái phần (B.1, F.4…) để không trùng T1–T9, BĐ1–BĐ6, H0–H7 của Bài 05b. Mã phát hiện của cổng storyboard (G1–G22 trong review-log) khác giả thiết G1–G4; review-log luôn ghi "phát hiện G…" khi nói về mã phát hiện.

## Chuẩn đầu ra được hỗ trợ

Đề cương không có LLO cho xác suất. Bài 05c hỗ trợ, không thay, các chuẩn sau; điều phối viên đã đối chiếu nội dung LLO11, LLO12, LLO27 với DOCX.

| Chuẩn đầu ra | Nội dung trong đề cương | Tiểu mục hỗ trợ |
|---|---|---|
| LLO11 (CLO1) | khác biệt giữa tối ưu trong học máy và tối ưu thuần túy (Buổi 5) | §G.1 (rủi ro kỳ vọng và rủi ro thực nghiệm, cỡ tập xác thực), §G.6 |
| LLO12 (CLO2) | hiểu và áp dụng SGD, momentum, Nesterov (Buổi 5) | §E.5, §E.6 (phương sai $\sigma_1^2/b$), §G.2–§G.7 |
| LLO27 (CLO4) | suy diễn dựa trên mẫu (Buổi 12) | §F.3, §F.5, §F.6 (ước lượng kỳ vọng bằng trung bình mẫu, cỡ mẫu), chỉ là liên kết về sau |

Câu ghi trong ghi chú (§A.3): "Bài bổ trợ này không có buổi riêng trong đề cương; nó cung cấp nền xác suất cho LLO11, LLO12 (CLO1, CLO2)." Bài tập thuần xác suất không ghi LLO.

**Tiền đề toán.** Tổng hữu hạn, chuỗi hình học, hàm mũ và logarit, khai triển Taylor của $e^x$, đạo hàm một biến, tích phân một biến cơ bản (chỉ ở §D.3).

**Tiền đề học phần.** Bài 04: gradient $L$-Lipschitz và bước $\eta\le1/L$ của GD (dùng ở §G.4). Bài 05 mục A–B: $J$, $R$, gradient nhóm nhỏ, ví dụ ba quan sát. Bài 01 §4: hồi quy logistic với nhãn $y_i\in\{-1,+1\}$ (dùng ở VD-17b).

**Ngoài phạm vi.** $\sigma$-đại số và lý thuyết độ đo (một câu ở §B.2); tích phân nhiều biến; xích Markov; chứng minh định lý giới hạn trung tâm; chứng minh Bổ đề Hoeffding; dạng nhân của Chernoff (một câu ở §F.6); phép xáo trộn theo lượt (chỉ nêu ở §H.2); quy tắc chọn bước theo cỡ nhóm không có nguồn trong `sources/`.

## Khung lý thuyết chung

### Bài toán trung tâm

Một đại lượng cần cho quyết định là một kỳ vọng $\mu=\mathbb EX$: rủi ro $R(\theta)$, gradient $\nabla J(\theta)$, tỉ lệ cử tri, tỉ lệ lỗi phân loại. Không tính được $\mu$ trực tiếp, hoặc tính được nhưng tốn kém. Ước lượng $\mu$ bằng trung bình mẫu $\bar X_n=\frac1n\sum_{i=1}^nX_i$ đặt ra các câu hỏi:

- **Q1 (tâm).** $\bar X_n$ có kỳ vọng bằng $\mu$ hay không (tính không chệch).
- **Q2 (sai số điển hình).** Phương sai và sai số chuẩn của $\bar X_n$ phụ thuộc $n$ thế nào.
- **Q3 (xác suất sai lệch).** $P(\lvert\bar X_n-\mu\rvert\ge\varepsilon)$ bị chặn bởi bao nhiêu (Markov, Chebyshev, Chernoff, Hoeffding).
- **Q4a (trung bình thay tổng).** Mất mát trên nhóm nhỏ lấy trung bình hay tổng, và cách chọn ảnh hưởng thế nào tới ngưỡng bước khi đổi $b$ hoặc $N$.
- **Q4b (nhóm nhỏ thay toàn bộ dữ liệu).** Khi chi phí mỗi bước tỉ lệ với $b$ và gradient được ước lượng lại ở mọi bước SGD, chọn $b$ thế nào dưới một ngân sách tính toán cố định.

E trả lời Q1, Q2; F trả lời Q3; §G.1–§G.3 áp Q1–Q3 cho mất mát và gradient; §G.4 trả lời Q4a; §G.5–§G.6 trả lời Q4b; H gom các câu trả lời vào một bảng.

### Ký hiệu

Theo bảng A.4 của kế hoạch, quyết định 4 và quyết định của điều phối viên sau cổng storyboard. Cột "Giới thiệu ở" là tiểu mục ghi chú định nghĩa ký hiệu lần đầu; §A.3 nêu bảng rút gọn.

| Ký hiệu | Nghĩa | Đối chiếu bài khác | Giới thiệu ở |
|---|---|---|---|
| $\Omega$, $\omega$ | không gian mẫu, kết cục; $\Omega$ hữu hạn hoặc đếm được, mọi tập con là biến cố | Bài 00 viết $(\Omega,\mathcal F,\Pr)$; 05c không dùng $\mathcal F$ để tránh trùng $\mathcal F_k$ của 05b | §B.1 |
| $A,B,E$ | biến cố | | §B.1 |
| $P(A)$ | xác suất | như Bài 05b; Bài 00 viết $\Pr$ | §B.2 |
| $X,Y,Z$; $x$ | biến ngẫu nhiên (chữ hoa); giá trị (chữ thường) | khác $x_k$ (dãy lặp, 05b) và $x_i$ (đặc trưng, Bài 05) | §D.1 |
| $S$ | tổng (hai xúc xắc, số mặt ngửa) | | §D.1 |
| $p_X(x)$, $F_X(x)$ | PMF hoặc mật độ; CDF | như Bài 00 | §D.1, §D.3 |
| $\mathbb E$, $\operatorname{Var}$, $\operatorname{Cov}$ | kỳ vọng, phương sai, hiệp phương sai | như Bài 00, 05, 05b | §E.1, §E.3 |
| $\mathbf 1\{A\}$, $\mathbf 1_A$ | hàm chỉ thị | 05b dùng $\mathbf 1\{Z\ge\varepsilon\}$ | §E.2 |
| $\mu$, $\sigma_1^2$ | kỳ vọng và phương sai của một quan sát; trong 05c $\mu$ chỉ mang nghĩa kỳ vọng | Bài 05b dùng $\mu$ cho hằng số lồi mạnh; 05c không dùng ký hiệu riêng cho hằng số này (xem dòng "độ cong") | §E.1, §E.5 |
| độ cong (hằng số lồi mạnh) | ở ví dụ ba quan sát $J''(\theta)=1$ | Bài 05b ký hiệu $\mu$; §G.6, §G.7 viết công thức với giá trị 1 và nêu dạng tổng quát bằng lời | §G.6 |
| $\bar X_n$ | trung bình của $n$ quan sát | | §A.2 (không hình thức), §E.5 |
| $N$ | số mẫu của tập dữ liệu | như Bài 05, 05b; Bài 06 dùng $n$ | §A.1 |
| $b$ | cỡ nhóm nhỏ; không dùng $b$ cho cận khoảng | như Bài 05, 05b | §A.1 |
| $I$, $I_1,\dots,I_b$ | chỉ số mẫu ngẫu nhiên | như Bài 05 | §B.4 |
| $\theta$, $d$ | tham số, số chiều của tham số | như Bài 05 | §A.1, §G.3 |
| $g_i(\theta)=\nabla\ell_i(\theta)$, $\widehat g$ | gradient một mẫu, gradient nhóm (trung bình) | như Bài 05; 05b viết $g_k$ | §A.1, §G.2 |
| $\widetilde J=NJ$, $\widetilde g=b\,\widehat g$ | mất mát tổng, gradient nhóm dạng tổng | | §G.4 |
| $\Sigma(\theta)$ | hiệp phương sai gradient một mẫu; $\operatorname{tr}\Sigma$ là phương sai tổng | như Bài 05 | §G.2 |
| $\sigma_b^2=\sigma_1^2/b$ | phương sai gradient nhóm (vô hướng) | bằng hằng số $\sigma^2$ của H6b khi H6b đúng với dấu bằng | §E.5, §G.7 |
| $\eta$ | bước | như Bài 05, 05b | §G.4 |
| $L$ | hằng số Lipschitz của gradient | như Bài 04 | §G.4 |
| $C$, $B$, $K$ | chi phí một gradient mẫu; ngân sách tính bằng số gradient mẫu; số bước $K=\lfloor B/b\rfloor$ | | §G.5, §G.6 |
| $a_K$ | $\mathbb E(\theta_K-1)^2$ trên ví dụ ba quan sát | Bài 05b dùng cùng ký hiệu | §G.6 |
| $T_N$ | số mẫu chưa gặp sau $N$ lần rút có hoàn lại (VD-10); không dùng $U$ vì $U$ là biến trong phản ví dụ của Mệnh đề E.7 | | §F.1 |
| $W_i=2X_i-1$ | biến nhận $\pm1$ (biến Rademacher) trong chứng minh Định lý F.6 | không dùng $R_i$ vì $R$ là rủi ro | §F.4 |
| $[m_i,M_i]$ | khoảng chứa $X_i$ trong Hoeffding | tránh $[a,b]$ vì $b$ là cỡ nhóm | §F.5 |
| $\lambda\ge0$ | tham số Chernoff, phạm vi cục bộ trong F | theo Boyd–Vandenberghe §7.4.2 | §F.4 |
| $\varepsilon$, $\delta$ | độ lệch cho phép, xác suất thất bại | | §F.1, §F.5 |
| $\mathcal P$ | phân phối sinh dữ liệu | Bài 05 viết $P$; §A.3 ghi ánh xạ một lần | §A.3, §G.1 |
| $\mathcal E$, $\mathcal E_{\rm app}$, $\mathcal E_{\rm est}$, $\mathcal E_{\rm opt}$ | sai số dư và ba thành phần theo Bottou và Bousquet | SNW ch. 13 | §G.6 |
| $\mathcal N(\mu,s^2)$ | phân phối Gauss; tham số $s^2$ để không trùng $\sigma_1^2$ | | §D.3 |

### Giả thiết chung

- **G1.** Các quan sát $X_1,\dots,X_n$ i.i.d., hoặc là các lần rút đều có hoàn lại từ một tập hữu hạn. §E.6 và §G.2 xét riêng trường hợp không hoàn lại. Mọi ví dụ có $b>N$ (ví dụ ba quan sát có $N=3$) ghi rõ rút có hoàn lại.
- **G2.** Mômen cần dùng hữu hạn: $\mathbb E\lvert X\rvert<\infty$ cho kỳ vọng; $\sigma_1^2<\infty$ cho Chebyshev và luật số lớn yếu.
- **G3.** Cho Hoeffding: $X_i\in[m_i,M_i]$ hầu chắc chắn.
- **G4.** Cho phần G: tham số $\theta$ cố định, không phụ thuộc nhóm đang lấy.

§A.3 nêu G1–G4 bằng lời; §D.4 viết lại G1 bằng Định nghĩa D.5.

### Chuỗi định nghĩa → kết quả → ứng dụng

1. Không gian xác suất, biến cố, phép đếm (B) → bất đẳng thức hợp.
2. Xác suất có điều kiện, Bayes, độc lập (C) → mô hình rút có hoàn lại.
3. Biến ngẫu nhiên, phân phối, độc lập của biến, i.i.d. (D) → gradient mẫu là một biến ngẫu nhiên có PMF tường minh.
4. Kỳ vọng (tuyến tính, không cần độc lập), phương sai (cộng khi không tương quan) (E) → $\mathbb E\bar X_n=\mu$, $\operatorname{Var}\bar X_n=\sigma_1^2/n$, hệ số $\frac{N-n}{N-1}$ khi không hoàn lại; kỳ vọng có điều kiện.
5. Markov → Chebyshev → luật số lớn yếu; Markov áp cho $e^{\lambda X}$ → Chernoff → Hoeffding → công thức cỡ mẫu (F).
6. Áp 4 và 5 cho $J(\theta)$ và $\widehat g$ (G): ước lượng không chệch, hiệp phương sai $\Sigma/b$, cận xác suất theo $b$; mất mát trung bình giữ ngưỡng bước độc lập với $b$ và $N$; sai số giảm theo $1/\sqrt b$ trong khi chi phí tăng theo $b$; đệ quy $a_{k+1}=(1-\eta)^2a_k+\eta^2\sigma_1^2/b$ dẫn xuất từ Định lý G.2 và Mệnh đề E.12; nối H6, H6b và sàn nhiễu của Bài 05b.

### Giới hạn áp dụng

Nêu ở §H.2, mỗi giới hạn kèm tiểu mục đã gặp nó:

- các kết quả về một tham số cố định (G4); khi $\theta$ được chọn từ chính dữ liệu, tính không chệch đối với $R$ mất (Bài 05 đã nêu). §G.6 vượt G4 vì $\theta_k$ phụ thuộc các nhóm trước; điều kiện thay thế là nhóm ở bước $k$ được rút mới, độc lập với lịch sử, tương ứng H6 của Bài 05b;
- lấy mẫu không hoàn lại theo lượt (epoch) làm các chỉ số phụ thuộc nhau (§E.6);
- chuẩn hóa theo lô (Bài 06) làm mất tính tách theo mẫu của mất mát;
- phân phối đuôi nặng phá G2 (VD-09 và Nhận xét F.11 ở §F.6);
- định lý giới hạn trung tâm là phát biểu giới hạn, không cho cận với $n$ hữu hạn (Nhận xét F.10);
- VD-20 có ba giới hạn: $\eta$ giữ cố định (với $\eta=1$, GD giải ví dụ trong một bước); rút có hoàn lại; mô hình chi phí chỉ đếm gradient mẫu, bỏ qua tính song song của phần cứng.

## Chỗ Bài 05c cung cấp nền cho các bài khác

| Chỗ dùng | Nội dung đang dùng chưa chứng minh từ đầu | Tiểu mục 05c |
|---|---|---|
| Bài 05, Mệnh đề về gradient nhóm | $\mathbb E\widehat g=\nabla J$, $\operatorname{Cov}\widehat g=\Sigma/b$ | §E.2, §E.4 (tuyến tính, $\mathbb E[XY]$, phương sai của tổng); §G.2 đặt lại mệnh đề như hệ quả |
| Bài 05, phương sai $8/3$ và $8/(3b)$, bảng sai số chuẩn | định nghĩa phương sai, sai số chuẩn | §E.3, §E.5; §G.5 |
| Bài 05, mất mát trên tập xác thực | không chệch đối với $R$, độ lệch khi chọn tham số | §G.1 |
| Bài 05, "$N/b$ bước chỉ tương đương $N$ lần đánh giá mẫu, chưa bảo đảm đã gặp mọi mẫu" | tỉ lệ mẫu chưa gặp $(1-1/N)^N\to e^{-1}$ | §E.2 (VD-10), §F.1 |
| Bài 05b, kiến thức nền "(Bài 00)" | kỳ vọng, phương sai, độc lập | B–E |
| Bài 05b, H6, H6a, H6b | kỳ vọng có điều kiện, chặn phương sai | §E.7, §G.7 |
| Bài 05b, Ví dụ A ($\sigma^2=8/(3b)$), sàn nhiễu với $b=4$ | phương sai gradient nhóm, đệ quy và giá trị giới hạn | §E.5, §G.6, §G.7 |
| Bài 05b, BĐ6 (Markov) | Markov cho biến không âm | §F.1 (chứng minh), §G.7 (dẫn) |
| Bài 05b, câu về Bottou và Bousquet | lập luận ngân sách tính toán | §G.6 |
| Bài 06, gradient lô nhỏ; trung bình Polyak | gradient lô nhỏ khác gradient đầy đủ; trung bình giảm dao động | §G.2; §E.5 (một câu: các điểm lặp phụ thuộc nhau, nên $\sigma^2/T$ không áp dụng nguyên dạng) |

## Cấu trúc tám phần

Mỗi phần ứng với một tiêu đề `##` của ghi chú; sau phần H có mục `## Tài liệu tham khảo` (không có tiểu mục `###`). Ngân sách tính theo từ như `wc -w`.

| Phần | Tiêu đề | Chức năng | Đầu vào | Đầu ra | Ngân sách |
|---|---|---|---|---|---|
| A | Ước lượng một kỳ vọng bằng trung bình | Mở đầu: đặt bài toán trung tâm từ ví dụ ba quan sát, câu hỏi chỉ số lặp và lập luận 100 so với 10 000 mẫu; nêu Q1–Q4b, ký hiệu, giả thiết | Bài 05 mục B | Q1–Q4b, câu hỏi chỉ số lặp, bảng ký hiệu rút gọn, G1–G4 | 700–850 |
| B | Không gian xác suất, biến cố và phép đếm | Xác định xác suất của biến cố nào; tiên đề, hệ quả, đếm, bất đẳng thức hợp | A: câu hỏi chỉ số lặp | $P$ trên $\Omega$ hữu hạn hoặc đếm được; Mệnh đề B.4 dùng lại ở §G.3 | 1 300–1 600 |
| C | Xác suất có điều kiện, độc lập và công thức Bayes | Cập nhật xác suất khi có thông tin; định nghĩa độc lập làm nền cho mô hình rút có hoàn lại | B | quy tắc nhân, xác suất toàn phần, Bayes, độc lập của họ biến cố | 1 300–1 600 |
| D | Biến ngẫu nhiên và phân phối | Gán số cho kết cục; phân phối rời rạc, phần liên tục tối thiểu; phân phối đồng thời, i.i.d. | C (độc lập) | $g_I(\theta)$ là biến ngẫu nhiên có PMF tường minh; tổng số mặt ngửa có phân phối nhị thức | 1 150–1 400 |
| E | Kỳ vọng, phương sai và trung bình mẫu | Tóm tắt phân phối bằng hai số; trả lời Q1, Q2 | D | $\mathbb E\bar X_n=\mu$, $\operatorname{Var}\bar X_n=\sigma_1^2/n$, sai số chuẩn, hệ số $\frac{N-n}{N-1}$, kỳ vọng toàn phần | 2 150–2 500 |
| F | Bất đẳng thức xác suất | Trả lời Q3: chuyển mômen thành cận xác suất; so ba cận; cỡ mẫu | E | Định lý F.1, F.3, F.6, F.8 có chứng minh; Hệ quả F.9 | 2 200–2 600 |
| G | Mất mát trung bình trên nhóm nhỏ | Áp E, F cho rủi ro thực nghiệm và gradient nhóm; trả lời Q4a, Q4b | E, F; Bài 04 (bước $1/L$); Bài 05 mục A–B | quy tắc chọn $b$ theo sai số và ngân sách; liên kết H6, H6b | 2 050–2 400 |
| H | Bảng tra, giới hạn và câu hỏi tự kiểm | Kết luận: bảng trả lời Q1–Q4b, phạm vi áp dụng, liên kết về sau | A–G | bảng tra, ba câu hỏi tự kiểm | 500–650 |
| — | Tài liệu tham khảo | danh sách nguồn và câu ghi nguồn | mục "Học liệu và nguồn" | | 150–200 |

Tổng ghi chú: 11 500–13 800 từ kể cả mục tài liệu tham khảo, nằm trong khoảng của quyết định 3. Bài tập: 3 500–4 500 từ, mỗi bài 350–450 từ kể cả gợi ý và lời giải.

### Câu nối giữa các phần

Mỗi câu nêu kết quả kế thừa và giới hạn tạo nhu cầu mới; câu được đặt ở đoạn đầu của phần sau.

| Ranh giới | Kết quả kế thừa | Giới hạn tạo nhu cầu | Câu nối dự kiến |
|---|---|---|---|
| A → B | Q1–Q4b; câu hỏi chỉ số lặp đặt ở §A.1 | Câu "xác suất một nhóm 32 chỉ số có chỉ số lặp" chưa có nghĩa khi chưa xác định tập kết cục | "Xác suất để một nhóm 32 chỉ số rút có hoàn lại từ 1 000 mẫu chứa chỉ số lặp chỉ xác định được sau khi chọn tập các dãy chỉ số có thể xảy ra." |
| B → C | $P$ đồng khả năng, đếm, bất đẳng thức hợp | Đếm đồng khả năng không cho xác suất mới khi đã biết một phần kết cục | "Phép đếm ở phần B cho xác suất trước khi quan sát; một kết quả xét nghiệm dương tính thu hẹp tập kết cục và đổi xác suất mắc bệnh." |
| C → D | Độc lập, rút có hoàn lại | Câu hỏi về tổng hai xúc xắc hay gradient của mẫu được rút liên quan tới một số gán cho kết cục, không phải một biến cố | "Tổng hai xúc xắc và gradient $g_I(\theta)$ là các số gán cho từng kết cục; các biến cố cần xét có dạng giá trị đó bằng hoặc vượt một ngưỡng." |
| D → E | PMF của $g_I(\theta)$ (§D.5), phân phối nhị thức, i.i.d. | PMF liệt kê mọi giá trị; so gradient mẫu với $\nabla J$ cần một số chỉ tâm và một số đo độ trải | "PMF của $g_I(1)$ gán xác suất $\frac13$ cho mỗi giá trị $2,0,-2$; để so gradient mẫu với $\nabla J(1)=0$ cần một số chỉ tâm của PMF và một số đo độ trải quanh tâm đó." |
| E → F | $\operatorname{Var}\bar X_n=\sigma_1^2/n$ | Phương sai chỉ cho sai số bình phương trung bình; câu hỏi về một lần chạy là câu hỏi về xác suất | "Phương sai $\sigma_1^2/n$ đo sai số bình phương trung bình; xác suất để một lần ước lượng lệch quá $\varepsilon$ cần một bất đẳng thức chuyển mômen thành xác suất." |
| F → G | Ba cận, Hệ quả F.9 | Trong SGD mẫu được lấy ở mọi bước và chi phí tỉ lệ $b$, nên cần cân độ chính xác mỗi bước với số bước | "Hệ quả F.9 cho cỡ mẫu của một lần ước lượng; SGD ước lượng gradient ở mọi bước, nên cỡ nhóm $b$ còn quyết định số bước đi được với cùng chi phí." |
| G → H | Định lý G.1, G.2, Mệnh đề G.3, G.4, VD-20 | Tổng hợp | "Các câu hỏi Q1–Q4b có câu trả lời ở các phần E, F, G; bảng dưới đây xếp chúng theo giả thiết cần dùng." |

## Dàn bài theo tiểu mục

Mỗi tiểu mục ứng với một tiêu đề `###`; storyboard có đúng một mục cho mỗi tiểu mục. Cột "Nội dung" liệt kê theo thứ tự xuất hiện.

### A. Ước lượng một kỳ vọng bằng trung bình

| Mã | Tiêu đề `###` | Nội dung | Ngân sách |
|---|---|---|---|
| §A.1 | Gradient nhóm trên ví dụ ba quan sát | VD-00: $y=(-1,1,3)$, $g_i(1)=2,0,-2$, $\nabla J(1)=0$; gradient một mẫu lệch khỏi $\nabla J$; câu hỏi: một nhóm $b=32$ chỉ số rút có hoàn lại từ $N=1000$ mẫu chứa chỉ số lặp với xác suất bao nhiêu; lập luận 100 so với 10 000 mẫu (Goodfellow et al. §8.1.3) | 300–350 |
| §A.2 | Các câu hỏi về trung bình mẫu | $\mu=\mathbb EX$ trong bốn tình huống (rủi ro, gradient, cử tri, tỉ lệ lỗi); $\bar X_n$ không hình thức; Q1–Q4b và phần trả lời từng câu | 200–250 |
| §A.3 | Ký hiệu, giả thiết và vị trí của bài | bảng ký hiệu rút gọn; ánh xạ $\mathcal P$ (05c) với $P$ (Bài 05); $\Pr$ của Bài 00; "lô nhỏ" của Bài 06; G1–G4 bằng lời; câu về đề cương và LLO | 200–250 |

### B. Không gian xác suất, biến cố và phép đếm

| Mã | Tiêu đề `###` | Nội dung | Ngân sách |
|---|---|---|---|
| §B.1 | Kết cục, không gian mẫu và biến cố | nhu cầu: câu hỏi chỉ số lặp của §A.1; trực giác phân bổ một đơn vị khối lượng; VD-01 (36 kết cục, biến cố "tổng bằng 7") | 250–300 |
| §B.2 | Tiên đề xác suất | Định nghĩa B.1; Mệnh đề B.2 có chứng minh; một câu về $\sigma$-đại số khi $\Omega$ không đếm được; đối chiếu Bài 00 | 300–350 |
| §B.3 | Phép đếm và mô hình đồng khả năng | nhu cầu đếm $365^{23}$, $N^b$; cây lựa chọn; VD-02 tính trên cây (bảng $n=23,30,50,70$); Mệnh đề B.3 có chứng minh | 250–300 |
| §B.4 | Chỉ số lặp trong nhóm nhỏ có hoàn lại | VD-03 ($N=1000$, $b=32$, $64$; $N=60\,000$, $b=256$); H-01 (hai bảng: sinh nhật và chỉ số lặp, cùng công thức); ký hiệu $I_1,\dots,I_b$; trả lời câu hỏi của §A.1 | 250–300 |
| §B.5 | Bất đẳng thức hợp | nhu cầu chặn "ít nhất một sự cố"; trực giác diện tích; VD-02 cận hợp $253/365$ so với $0{,}507$; Mệnh đề B.4 có chứng minh quy nạp; Câu hỏi: cuối phần B | 250–350 |

### C. Xác suất có điều kiện, độc lập và công thức Bayes

| Mã | Tiêu đề `###` | Nội dung | Ngân sách |
|---|---|---|---|
| §C.1 | Xác suất có điều kiện | nhu cầu: xét nghiệm dương tính; trực giác thu hẹp $\Omega$ rồi chuẩn hóa; VD-04 Monty Hall trên cây H-03 (giả thiết về người dẫn nêu rõ); Định nghĩa C.1; Mệnh đề C.2 có chứng minh | 400–450 |
| §C.2 | Xác suất toàn phần và công thức Bayes | VD-05 bằng tần số tự nhiên trên 100 000 người (H-02); Mệnh đề C.3, Định lý C.4 có chứng minh; liên hệ $p(Y\mid X)$ của Bài 00 | 350–450 |
| §C.3 | Độc lập của biến cố | nhu cầu: công thức $N^b$ và $\sigma_1^2/b$ đòi các lần rút không ảnh hưởng nhau; VD-06 có và không hoàn lại; Định nghĩa C.5; Nhận xét C.6 (hai đồng xu, biến cố "hai xu khác nhau") | 350–450 |
| §C.4 | Độc lập có điều kiện | tình huống hai xét nghiệm; Định nghĩa C.7; VD-05b tính trực tiếp bằng Định lý C.4 (không dùng tỉ số odds); Câu hỏi: cuối phần C | 200–250 |

### D. Biến ngẫu nhiên và phân phối

| Mã | Tiêu đề `###` | Nội dung | Ngân sách |
|---|---|---|---|
| §D.1 | Biến ngẫu nhiên và hàm khối xác suất | nhu cầu từ C; trực giác hàm gán số, PMF là chiều cao cột; VD-01 tổng hai xúc xắc (bảng PMF); Định nghĩa D.1, D.2; đối chiếu Bài 00 | 300–350 |
| §D.2 | Các phân phối rời rạc thường dùng | nhu cầu: phần F cần PMF của số mặt ngửa; liệt kê 8 kết cục khi tung 3 đồng xu; Định nghĩa D.3 (Bernoulli, nhị thức, đều, hình học); Mệnh đề D.6 có chứng minh; VD-07 ($n=10$, $P(S\ge8)$) | 300–350 |
| §D.3 | Biến liên tục và hàm mật độ | nhu cầu: $\mathcal P$ thường có mật độ; trực giác khối lượng trải liên tục; ví dụ chọn một số đều trong $[0,1]$, $P(\alpha\le X\le\beta)=\beta-\alpha$; Định nghĩa D.4; Gauss $\mathcal N(\mu,s^2)$ chỉ phát biểu; dẫn hình `img/lec-00/probability-pmf-pdf-cdf.svg` nếu tác tử soạn học liệu xác nhận hình phù hợp | 150–200 |
| §D.4 | Phân phối đồng thời và độc lập của biến ngẫu nhiên | nhu cầu: Định lý E.9, Mệnh đề F.5 cần độc lập của biến; trực giác bảng PMF đồng thời là tích các lề; VD-06 dạng bảng $3\times3$ (có hoàn lại: mọi ô $\frac19$; không hoàn lại: ô $(3,3)$ bằng 0); Định nghĩa D.5 (PMF đồng thời, độc lập, i.i.d.); Mệnh đề D.7 chỉ phát biểu; G1 viết lại bằng D.5 | 250–300 |
| §D.5 | Gradient của mẫu được rút | VD-13: $g_I(0)\in\{1,-1,-3\}$ đều, trung bình $-1=J'(0)$; $g_I(1)\in\{2,0,-2\}$; Câu hỏi: cuối phần D | 150–200 |

### E. Kỳ vọng, phương sai và trung bình mẫu

| Mã | Tiêu đề `###` | Nội dung | Ngân sách |
|---|---|---|---|
| §E.1 | Kỳ vọng | nhu cầu: một số chỉ tâm của PMF $g_I(\theta)$; trực giác tâm cân bằng, trung bình dài hạn; VD-01 $\mathbb ES=7$; Định nghĩa E.1 (kèm điều kiện hội tụ tuyệt đối, ví dụ biên để ở §F.6); VD-08 (phép tính, $-1/6$, quy ước ghi rõ); Mệnh đề E.2 có chứng minh; nhận xét thay tổng bằng tích phân | 350–400 |
| §E.2 | Tính tuyến tính của kỳ vọng và hàm chỉ thị | nhu cầu: kỳ vọng số chỉ số khác nhau của VD-03 khó tính từ PMF; trực giác đếm bằng tổng chỉ thị; ví dụ $\mathbb E[X_1+X_2]=3{,}5+3{,}5=7$ khớp $\mathbb ES$ của §E.1; Định lý E.3 có chứng minh (không cần độc lập); Mệnh đề E.4; ứng dụng VD-03 ($31{,}51$), VD-10 (nối Bài 05), VD-11 (kỳ vọng bằng 1, chỉ thị phụ thuộc nhau) | 350–400 |
| §E.3 | Phương sai và hiệp phương sai | nhu cầu: gradient một mẫu và gradient nhóm $b=2$ (VD-12) cùng kỳ vọng $0$, khác độ trải; trực giác bình phương độ lệch; VD-01 $\operatorname{Var}S=35/6$, H-04; Định nghĩa E.5 (phương sai, độ lệch chuẩn, hiệp phương sai); Mệnh đề E.6, E.7 có chứng minh (dùng PMF đồng thời của §D.4); phản ví dụ $U$, $V=U^2$ | 350–400 |
| §E.4 | Phương sai của tổng | Mệnh đề E.8 có chứng minh; hai xúc xắc: $35/12+35/12=35/6$ | 150–200 |
| §E.5 | Trung bình mẫu và sai số chuẩn | nhu cầu Q1, Q2; trực giác trung bình nhiều lần đo; VD-12 ($b=1,2,4$ có hoàn lại), H-08; Định lý E.9 có chứng minh, kèm định nghĩa sai số chuẩn (độ lệch chuẩn của ước lượng, Goodfellow et al. §5.4.3); ký hiệu $\sigma_b^2$; câu đặt $n=b$; VD-14 phần sai số chuẩn ($\sqrt{0{,}25/1000}\approx0{,}0158$); một câu về trung bình Polyak của Bài 06 | 400–450 |
| §E.6 | Rút không hoàn lại | VD-12 không hoàn lại $b=2$ (giá trị $1,0,-1$, phương sai $2/3$); Mệnh đề E.10 có chứng minh qua $\operatorname{Cov}(X_i,X_j)=-\sigma_1^2/(N-1)$; trường hợp $n=N$ cho phương sai 0 | 250–300 |
| §E.7 | Kỳ vọng có điều kiện và kỳ vọng toàn phần | nhu cầu: kỳ vọng qua cây hai tầng; trực giác trung bình theo nhánh; Monty Hall theo nhánh (H-03); cây hai bước trên VD-13 ($\theta_0=0$, $\eta=0{,}1$, $b=1$: $\theta_1\in\{-0{,}1;0{,}1;0{,}3\}$, $\mathbb Eg_{I_2}(\theta_1)=-0{,}9$); Định nghĩa E.11; Mệnh đề E.12 có chứng minh; một câu báo trước "Bài 05b gọi là tính chất tháp"; Câu hỏi: cuối phần E | 300–350 |

### F. Bất đẳng thức xác suất

| Mã | Tiêu đề `###` | Nội dung | Ngân sách |
|---|---|---|---|
| §F.1 | Bất đẳng thức Markov | nhu cầu: chỉ biết kỳ vọng; trực giác: kỳ vọng nhỏ thì không có nhiều khối lượng ở xa; VD-15 $P(S\ge11)=1/12$ so với $7/11$; Định lý F.1 có chứng minh và điều kiện dấu bằng; ứng dụng: số mẫu chưa gặp $T_N$ của VD-10, $P(T_N\ge N/2)\le2(1-1/N)^N\approx0{,}735$ với $N=1000$ | 350–400 |
| §F.2 | Bất đẳng thức Chebyshev | nhu cầu: Markov bỏ qua phương sai; trực giác: áp Markov cho $(S-7)^2$; VD-15 $1/6$ so với $35/96$, tính bằng Markov cho $(S-7)^2$ trước phát biểu tổng quát; Hệ quả F.2 có chứng minh | 250–300 |
| §F.3 | Luật số lớn yếu | nhu cầu: câu hỏi về $\bar X_n$ khi $n$ tăng; VD-16 phần luật số lớn (bảng $n=10,\dots,200$, hai cột: xác suất đúng và cận Chebyshev); Định lý F.3 có chứng minh; VD-08 trung bình nhiều ván | 300–350 |
| §F.4 | Cận Chernoff | nhu cầu: VD-16 $n=100$, $P(S\ge75)$ đúng $2{,}82\cdot10^{-7}$, Chebyshev $0{,}04$; trực giác Markov cho $e^{\lambda X}$, H-05 (ba hàm chặn hàm chỉ thị); ví dụ một đồng xu: $W=2X-1$, $\mathbb Ee^{\lambda W}=\cosh\lambda$, $\cosh1\approx1{,}543\le e^{1/2}\approx1{,}649$; Định lý F.4, Mệnh đề F.5, Định lý F.6 có chứng minh | 550–650 |
| §F.5 | Bất đẳng thức Hoeffding và cỡ mẫu | nhu cầu: Định lý F.6 chỉ cho đồng xu cân đối, còn mất mát 0–1 và gradient bị chặn có khoảng khác; Bổ đề F.7 chỉ phát biểu (kết quả chuẩn); Định lý F.8 có chứng minh; Hệ quả F.9 có chứng minh; so với cỡ mẫu Chebyshev | 400–500 |
| §F.6 | So sánh ba cận | VD-16 ba cận (H-06) và luật số lớn với ba đường (H-07); VD-14 cỡ mẫu (Chebyshev $5\,556$, Hoeffding $2\,050$, xấp xỉ giới hạn trung tâm $1\,068$); cận Hoeffding hai phía có thể lớn hơn Chebyshev ở độ lệch nhỏ ($\varepsilon=0{,}03$, $n=1000$: $0{,}331$ so với $0{,}278$; $n=50$ trong VD-16: $0{,}736$ so với $0{,}5$), vì Hoeffding chỉ dùng độ rộng khoảng và hai phía nhân 2; Nhận xét F.10; VD-09 một đoạn (trả $\min(2^K,2^{20})$, $\mathbb E=21$; không giới hạn thì tổng phân kỳ) cạnh Nhận xét F.11; một câu về dạng nhân của Chernoff; Câu hỏi: cuối phần F | 350–400 |

### G. Mất mát trung bình trên nhóm nhỏ

| Mã | Tiêu đề `###` | Nội dung | Ngân sách |
|---|---|---|---|
| §G.1 | Rủi ro kỳ vọng và rủi ro thực nghiệm | nhu cầu: Bài 05 nói mất mát trên tập xác thực ước lượng không chệch rủi ro mà chưa chứng minh và chưa cho cỡ tập; trực giác: $J$ là một cuộc thăm dò; ví dụ: tỉ lệ lỗi phân loại đọc như ví dụ thăm dò; Định nghĩa G.0 (nhắc Bài 05); Định lý G.1 có chứng minh; VD-22 (cỡ tập xác thực) | 300–350 |
| §G.2 | Gradient nhóm nhỏ không chệch | nhu cầu: Mệnh đề Bài 05 dùng tính tuyến tính và độc lập chưa được dựng; VD-12, VD-13 nhắc lại; Định lý G.2 có chứng minh (vectơ qua từng tọa độ); hệ số $\frac{N-b}{N-1}$ khi không hoàn lại; khác biệt với Goodfellow et al. §8.1.3 (ở đó: không chệch cho gradient sai số tổng quát hóa khi mẫu không dùng lại; ở đây: không chệch cho $\nabla J$ tại $\theta$ cố định) | 300–350 |
| §G.3 | Cận xác suất cho sai số gradient nhóm | VD-17 (Chebyshev và Hoeffding theo $b$, xác suất đúng; rút có hoàn lại vì $b>N$); VD-17b (hồi quy logistic với nhãn $\pm1$ của Bài 01 §4, bất đẳng thức hợp trên $d$ tọa độ) | 250–300 |
| §G.4 | Mất mát trung bình và mất mát tổng | nhu cầu Q4a: ngưỡng bước phụ thuộc $N$ và $b$ khi dùng tổng; trực giác gradient tổng phóng lên $b$ lần; VD-18 (hệ số co $1-0{,}1b$; $b=16$ đổi dấu nhưng vẫn co; phân kỳ khi $b>20$); Mệnh đề G.3 có chứng minh (dùng bước $1/L$ của Bài 04); H-11 hoặc bảng | 300–350 |
| §G.5 | Hiệu suất giảm dần theo cỡ nhóm | nhu cầu Q4b: lập luận 100 so với 10 000 mẫu của §A.1; trực giác sai số $1/\sqrt b$, chi phí $b$; VD-21, H-09; VD-19 (dữ liệu lặp); Mệnh đề G.4 có chứng minh | 250–300 |
| §G.6 | Cỡ nhóm dưới ngân sách tính toán cố định | nhu cầu: Mệnh đề G.4 so một bước, còn lựa chọn $b$ phụ thuộc số bước $K=\lfloor B/b\rfloor$; dẫn xuất đệ quy $a_{k+1}=(1-\eta)^2a_k+\eta^2\sigma_1^2/b$ trên ví dụ ba quan sát từ Định lý G.2 và Mệnh đề E.12, với câu nêu nhóm ở bước $k$ được rút mới, độc lập với lịch sử; giá trị giới hạn $\frac{\eta\sigma_1^2}{b(2-\eta)}$ (độ cong bằng 1; một câu nêu dạng tổng quát, dẫn Bài 05b); VD-20 (bảng $B=3000$, $B=300$; H-10) với ba giới hạn; câu nối từ Định lý G.1: $J$ chỉ là ước lượng của $R$ với sai số cỡ $1/\sqrt N$, nên tính $\nabla J$ chính xác hơn bậc đó không cải thiện bậc của sai số; Nhận xét G.5 | 500–550 |
| §G.7 | Gradient nhóm trong giả thiết H6 và H6b | Nhận xét G.6: $\sigma^2=\sup_\theta\operatorname{tr}\Sigma(\theta)/b$; ví dụ ba quan sát $\sigma^2=8/(3b)$, khớp Ví dụ A của Bài 05b; H6 đọc như kỳ vọng có điều kiện theo lịch sử (Mệnh đề E.12); BĐ6 của Bài 05b là Định lý F.1; Câu hỏi: cuối phần G | 150–200 |

### H. Bảng tra, giới hạn và câu hỏi tự kiểm

| Mã | Tiêu đề `###` | Nội dung | Ngân sách |
|---|---|---|---|
| §H.1 | Bảng tra theo các câu hỏi | bảng theo Q1, Q2, Q3, Q4a, Q4b: kết quả, giả thiết, tiểu mục | 200–250 |
| §H.2 | Phạm vi áp dụng | sáu giới hạn của khung; liên kết Bài 05b, Bài 06, Buổi 12 | 200–250 |
| §H.3 | Câu hỏi tự kiểm | ba câu hỏi với nhãn "Câu hỏi:", mỗi câu đo một trong Q2, Q3, Q4b trên số liệu mới | 100–150 |

Mục `## Tài liệu tham khảo` sau phần H liệt kê nguồn theo mục "Học liệu và nguồn"; §H.3 không lặp danh sách này.

## Danh mục kết quả có nhãn

Cột CM: "có" là chứng minh đầy đủ trong ghi chú; "phát biểu" là không chứng minh. Bất đẳng thức Markov, Chebyshev, luật số lớn yếu, Chernoff, Hoeffding ghi trong ghi chú là "kết quả chuẩn, chứng minh tự xây dựng" (quyết định 6).

### Phần B

| Nhãn | Loại | Phát biểu (miền, giả thiết) | CM | Tiểu mục |
|---|---|---|---|---|
| B.1 | Định nghĩa | $\Omega$ hữu hạn hoặc đếm được; $P:2^\Omega\to[0,1]$, $P(\Omega)=1$, cộng tính đếm được trên các biến cố đôi một rời nhau; mô hình đồng khả năng $P(A)=\lvert A\rvert/\lvert\Omega\rvert$ khi $\Omega$ hữu hạn | — | §B.2 |
| B.2 | Mệnh đề | $P(\varnothing)=0$; $P(A^c)=1-P(A)$; $A\subseteq B\Rightarrow P(A)\le P(B)$; $P(A\cup B)=P(A)+P(B)-P(A\cap B)$ | có, từ tiên đề | §B.2 |
| B.3 | Mệnh đề | quy tắc nhân; $N^b$ dãy có hoàn lại; $N(N-1)\cdots(N-b+1)$ chỉnh hợp; $\binom Nk$ tổ hợp | có, bằng cây lựa chọn | §B.3 |
| B.4 | Mệnh đề (bất đẳng thức hợp (union bound)) | $P(\bigcup_{j=1}^mA_j)\le\sum_jP(A_j)$ | có, quy nạp từ B.2 | §B.5 |

### Phần C

| Nhãn | Loại | Phát biểu | CM | Tiểu mục |
|---|---|---|---|---|
| C.1 | Định nghĩa | $P(A\mid B)=P(A\cap B)/P(B)$ với $P(B)>0$ | — | §C.1 |
| C.2 | Mệnh đề | quy tắc nhân $P(A\cap B)=P(A\mid B)P(B)$; dạng chuỗi cho $m$ biến cố | có | §C.1 |
| C.3 | Mệnh đề (xác suất toàn phần) | $B_1,\dots,B_m$ phân hoạch $\Omega$, $P(B_j)>0$: $P(A)=\sum_jP(A\mid B_j)P(B_j)$ | có | §C.2 |
| C.4 | Định lý (Bayes) | cùng giả thiết, $P(A)>0$: $P(B_j\mid A)=\dfrac{P(A\mid B_j)P(B_j)}{\sum_iP(A\mid B_i)P(B_i)}$ | có | §C.2 |
| C.5 | Định nghĩa | $A,B$ độc lập nếu $P(A\cap B)=P(A)P(B)$; họ $A_1,\dots,A_m$ độc lập nếu đẳng thức tích đúng với mọi họ con | — | §C.3 |
| C.6 | Nhận xét | độc lập từng đôi không kéo theo độc lập: hai đồng xu cân đối, $P(A\cap B\cap C)=0\ne\frac18$ | tính trực tiếp | §C.3 |
| C.7 | Định nghĩa | độc lập có điều kiện theo $C$ và theo $C^c$ | — | §C.4 |

### Phần D

| Nhãn | Loại | Phát biểu | CM | Tiểu mục |
|---|---|---|---|---|
| D.1 | Định nghĩa | biến ngẫu nhiên rời rạc $X:\Omega\to\mathbb R$; PMF $p_X(x)=P(X=x)$, $\sum_xp_X(x)=1$ | — | §D.1 |
| D.2 | Định nghĩa | CDF $F_X(x)=P(X\le x)$; không giảm, giới hạn 0 và 1 | một dòng cho tính không giảm | §D.1 |
| D.3 | Định nghĩa | Bernoulli$(p)$, nhị thức$(n,p)$, đều trên $\{1,\dots,N\}$, hình học$(p)$ | — | §D.2 |
| D.4 | Định nghĩa | mật độ $p_X\ge0$, $P(\alpha\le X\le\beta)=\int_\alpha^\beta p_X$; đều trên $[0,1]$; Gauss $\mathcal N(\mu,s^2)$ | phát biểu | §D.3 |
| D.5 | Định nghĩa | PMF đồng thời; $X,Y$ độc lập nếu $p_{X,Y}(x,y)=p_X(x)p_Y(y)$ với mọi $x,y$; họ i.i.d. | — | §D.4 |
| D.6 | Mệnh đề | số thành công trong $n$ phép thử Bernoulli$(p)$ độc lập: $P(S=k)=\binom nkp^k(1-p)^{n-k}$ | có, đếm và độc lập | §D.2 |
| D.7 | Mệnh đề | hàm của các biến độc lập, lấy trên các khối biến rời nhau, là độc lập | phát biểu | §D.4 |

### Phần E

| Nhãn | Loại | Phát biểu | CM | Tiểu mục |
|---|---|---|---|---|
| E.1 | Định nghĩa | $\mathbb EX=\sum_xx\,p_X(x)$ khi $\sum_x\lvert x\rvert p_X(x)<\infty$; có mật độ: $\int xp_X(x)\,dx$ | — | §E.1 |
| E.2 | Mệnh đề | $\mathbb Eh(X)=\sum_xh(x)p_X(x)=\sum_\omega h(X(\omega))P(\{\omega\})$ | có, nhóm theo giá trị | §E.1 |
| E.3 | Định lý (tuyến tính) | $\mathbb E[aX+cY]=a\mathbb EX+c\mathbb EY$ khi hai kỳ vọng tồn tại; không cần độc lập | có, tổng trên $\Omega$ | §E.2 |
| E.4 | Mệnh đề | $\mathbb E\mathbf 1_A=P(A)$; $X\ge0\Rightarrow\mathbb EX\ge0$; $X\le Y\Rightarrow\mathbb EX\le\mathbb EY$ | có | §E.2 |
| E.5 | Định nghĩa | $\operatorname{Var}X=\mathbb E(X-\mu)^2$; độ lệch chuẩn; $\operatorname{Cov}(X,Y)$ | — | §E.3 |
| E.6 | Mệnh đề | $\operatorname{Var}X=\mathbb EX^2-\mu^2$; $\operatorname{Var}(aX+c)=a^2\operatorname{Var}X$ | có | §E.3 |
| E.7 | Mệnh đề | $X,Y$ độc lập, kỳ vọng hữu hạn $\Rightarrow\mathbb E[XY]=\mathbb EX\,\mathbb EY$, nên $\operatorname{Cov}(X,Y)=0$; chiều ngược sai ($U$ đều trên $\{-1,0,1\}$, $V=U^2$) | có, qua PMF đồng thời | §E.3 |
| E.8 | Mệnh đề | $\operatorname{Var}\sum_iX_i=\sum_i\operatorname{Var}X_i+2\sum_{i<j}\operatorname{Cov}(X_i,X_j)$; không tương quan đôi một thì phương sai cộng | có, khai triển bình phương | §E.4 |
| E.9 | Định lý (trung bình mẫu) | $X_1,\dots,X_n$ không tương quan đôi một, cùng $\mu$, cùng $\sigma_1^2<\infty$: $\mathbb E\bar X_n=\mu$, $\operatorname{Var}\bar X_n=\sigma_1^2/n$; sai số chuẩn, tức độ lệch chuẩn của ước lượng (Goodfellow et al. §5.4.3), bằng $\sigma_1/\sqrt n$ | có, từ E.3, E.6, E.8 | §E.5 |
| E.10 | Mệnh đề (không hoàn lại) | tập $\{v_1,\dots,v_N\}$, trung bình $\bar v$, $\sigma_1^2=\frac1N\sum(v_i-\bar v)^2$; rút đều không hoàn lại $n\le N$ phần tử: $\mathbb E\bar X_n=\bar v$, $\operatorname{Var}\bar X_n=\dfrac{\sigma_1^2}{n}\cdot\dfrac{N-n}{N-1}$ | có, đối xứng và $\operatorname{Var}\sum_{i=1}^NX_i=0$ | §E.6 |
| E.11 | Định nghĩa | $\mathbb E[X\mid Y=y]=\sum_xx\,P(X=x\mid Y=y)$; biến ngẫu nhiên $\mathbb E[X\mid Y]$ | — | §E.7 |
| E.12 | Mệnh đề (kỳ vọng toàn phần) | $\mathbb E\bigl[\mathbb E[X\mid Y]\bigr]=\mathbb EX$; $\mathbb E[h(Y)X\mid Y]=h(Y)\mathbb E[X\mid Y]$ | có, rời rạc | §E.7 |

Kiểm E.10 trên ví dụ ba quan sát, $b=2$ không hoàn lại: $\frac83\cdot\frac12\cdot\frac12=\frac23$, khớp liệt kê ba cặp (gradient nhóm $1,0,-1$). Niu (BIMSA) slide 162 cho cùng hệ số; chỉ dùng để đối chiếu. Lập luận đối xứng cần rút đều; không áp dụng cho lấy mẫu có trọng số.

### Phần F

| Nhãn | Loại | Phát biểu | CM | Tiểu mục |
|---|---|---|---|---|
| F.1 | Định lý (Markov) | $Z\ge0$, $\mathbb EZ<\infty$, $\varepsilon>0$: $P(Z\ge\varepsilon)\le\mathbb EZ/\varepsilon$; dấu bằng khi $Z\in\{0,\varepsilon\}$ hầu chắc chắn | có, $Z\ge\varepsilon\mathbf 1\{Z\ge\varepsilon\}$ | §F.1 |
| F.2 | Hệ quả (Chebyshev) | $\operatorname{Var}X<\infty$, $t>0$: $P(\lvert X-\mu\rvert\ge t)\le\operatorname{Var}X/t^2$ (cận hai phía) | có, F.1 với $Z=(X-\mu)^2$ | §F.2 |
| F.3 | Định lý (luật số lớn yếu) | G1, G2: $P(\lvert\bar X_n-\mu\rvert\ge\varepsilon)\le\dfrac{\sigma_1^2}{n\varepsilon^2}\to0$ với mọi $\varepsilon>0$ | có, E.9 và F.2 | §F.3 |
| F.4 | Định lý (Chernoff, dạng tổng quát) | $P(X\ge a)\le\inf_{\lambda\ge0}e^{-\lambda a}\mathbb Ee^{\lambda X}$, vế phải có thể bằng $+\infty$ | có, F.1 với $Z=e^{\lambda X}$ | §F.4 |
| F.5 | Mệnh đề | $X_1,\dots,X_n$ độc lập: $\mathbb Ee^{\lambda\sum X_i}=\prod\mathbb Ee^{\lambda X_i}$ | có, D.7 và E.7, quy nạp | §F.4 |
| F.6 | Định lý (Chernoff cho đồng xu cân đối) | $X_i$ i.i.d. Bernoulli$(\frac12)$, $S=\sum X_i$, $\varepsilon>0$: $P(S-\frac n2\ge n\varepsilon)\le e^{-2n\varepsilon^2}$ | có, qua $W_i=2X_i-1$, $\cosh\lambda\le e^{\lambda^2/2}$ vì $(2k)!\ge2^kk!$, chọn $\lambda=2\varepsilon$ | §F.4 |
| F.7 | Bổ đề (Hoeffding) | $Y\in[m,M]$ hầu chắc chắn, $\mathbb EY=0$: $\mathbb Ee^{\lambda Y}\le e^{\lambda^2(M-m)^2/8}$ với mọi $\lambda\in\mathbb R$ | phát biểu, kết quả chuẩn | §F.5 |
| F.8 | Định lý (Hoeffding) | $X_i$ độc lập, G3, $\varepsilon>0$: $P(\bar X_n-\mathbb E\bar X_n\ge\varepsilon)\le\exp\Bigl(-\dfrac{2n^2\varepsilon^2}{\sum_i(M_i-m_i)^2}\Bigr)$; cận hai phía nhân 2 | có, F.4, F.5, F.7, chọn $\lambda$ tối ưu | §F.5 |
| F.9 | Hệ quả (cỡ mẫu) | cùng khoảng $[m,M]$: $n\ge\dfrac{(M-m)^2\ln(2/\delta)}{2\varepsilon^2}$ đủ để $P(\lvert\bar X_n-\mu\rvert\ge\varepsilon)\le\delta$; Chebyshev cần $n\ge\dfrac{\sigma_1^2}{\delta\varepsilon^2}$ | có | §F.5 |
| F.10 | Nhận xét | định lý giới hạn trung tâm (central limit theorem) cho xấp xỉ $n\approx(1{,}96\,\sigma_1/\varepsilon)^2$; là giới hạn, không phải cận với $n$ hữu hạn | phát biểu | §F.6 |
| F.11 | Nhận xét (đuôi nặng) | khi $\mathbb E\lvert X\rvert=\infty$ hoặc $\sigma_1^2=\infty$, E.9, F.2, F.3 không áp dụng; VD-09 đặt cạnh nhận xét này | — | §F.6 |

Chernoff được chứng minh trọn vẹn ở dạng F.6 vì dạng này không cần bổ đề ngoài; F.8 dùng F.7 chỉ phát biểu. Với $W_i\in[-1,1]$, F.7 cho $\mathbb Ee^{\lambda W_i}\le e^{\lambda^2\cdot4/8}=e^{\lambda^2/2}$, trùng cận $\cosh\lambda\le e^{\lambda^2/2}$ của F.6; F.6 là trường hợp của F.7 được chứng minh trực tiếp. F.6 là trường hợp $p=\frac12$ của Koller và Friedman, Định lý A.3. Mọi bảng số ghi rõ cận một phía hay hai phía.

### Phần G

| Nhãn | Loại | Phát biểu | CM | Tiểu mục |
|---|---|---|---|---|
| G.0 | Định nghĩa (nhắc Bài 05) | $R(\theta)=\mathbb E_{(X,Y)\sim\mathcal P}\,\ell(f_\theta(X),Y)$; $J(\theta)=\frac1N\sum_i\ell_i(\theta)$ | — | §G.1 |
| G.1 | Định lý | G4; $(x_i,y_i)$ i.i.d. theo $\mathcal P$: $\mathbb EJ(\theta)=R(\theta)$, $\operatorname{Var}J(\theta)=\operatorname{Var}\ell/N$; khi $\ell\in[0,1]$ (mất mát 0–1), F.8 cho cỡ tập xác thực | có, E.9 và F.8 | §G.1 |
| G.2 | Định lý (gradient nhóm nhỏ) | $I_1,\dots,I_b$ i.i.d. đều có hoàn lại, G4: $\mathbb E[\widehat g\mid\theta]=\nabla J(\theta)$, $\operatorname{Cov}\widehat g=\Sigma(\theta)/b$, $\mathbb E\lVert\widehat g-\nabla J\rVert^2=\operatorname{tr}\Sigma(\theta)/b$; không hoàn lại: nhân $\frac{N-b}{N-1}$ | có, E.3, E.7–E.10 cho từng tọa độ | §G.2 |
| G.3 | Mệnh đề (tổng và trung bình) | $\widetilde J=NJ$, $\widetilde g=b\,\widehat g$: (i) bước $\eta$ với $\widetilde g$ bằng bước $\eta b$ với $\widehat g$; (ii) gradient $L$-Lipschitz của $J$ cho hằng số $NL$ của $\widetilde J$, ngưỡng $\eta\le1/L$ (Bài 04) thành $\eta\le1/(NL)$; (iii) $\operatorname{Var}\widetilde g=b\,\sigma_1^2$ | có | §G.4 |
| G.4 | Mệnh đề (hiệu suất giảm dần) | sai số chuẩn $\sigma_1/\sqrt b$ với chi phí $bC$; tăng $b$ lên $k^2$ lần giảm sai số chuẩn $k$ lần | có, từ E.9 | §G.5 |
| G.5 | Nhận xét | Bottou và Bousquet: $\mathcal E=\mathcal E_{\rm app}+\mathcal E_{\rm est}+\mathcal E_{\rm opt}$, với $\mathcal E$ là kỳ vọng của sai số dư theo tập huấn luyện; khi ràng buộc chính là thời gian tính toán, giảm sai số tối ưu $\rho$ xuống dưới bậc của sai số ước lượng không cải thiện bậc của cận (13.6), và thời gian tiết kiệm được dùng để xử lý thêm mẫu. Phát biểu về cận trên tiệm cận, không về một lần chạy; SGD trong Bảng 13.2 dùng một mẫu mỗi vòng | phát biểu, dẫn SNW §13.2.3, §13.3.2 | §G.6 |
| G.6 | Nhận xét (nối Bài 05b) | hằng số của H6b: $\sigma^2=\sup_\theta\operatorname{tr}\Sigma(\theta)/b$ khi cận trên này hữu hạn; ở ví dụ ba quan sát $\operatorname{tr}\Sigma=8/3$ với mọi $\theta$, nên $\sigma^2=8/(3b)$ | có, từ G.2 | §G.7 |

Giá trị giới hạn trong §G.6 viết cho ví dụ ba quan sát, độ cong bằng 1: $\lim_Ka_K=\dfrac{\eta\sigma_1^2}{b(2-\eta)}$; với $\eta=0{,}1$, $\sigma_1^2=8/3$ được $\dfrac{8}{57b}\approx\dfrac{0{,}1404}{b}$. Ghi chú nêu bằng lời rằng Bài 05b có dạng tổng quát với hằng số lồi mạnh (ký hiệu $\mu$ ở Bài 05b), ở ví dụ này bằng 1.

**Dẫn xuất đệ quy trong §G.6.** Với $g_i(\theta)=\theta-y_i$ và $\nabla J(\theta)=\theta-1$, gradient nhóm có dạng $\widehat g_k=(\theta_k-1)-\zeta_k$, trong đó $\zeta_k$ là trung bình của $y_{I_r}-1\in\{-2,0,2\}$ trên nhóm thứ $k$. Các chỉ số của nhóm thứ $k$ được rút mới, độc lập với các nhóm trước; $\theta_k$ chỉ phụ thuộc các nhóm trước, nên $\zeta_k$ độc lập với $\theta_k$ (Mệnh đề D.7). Điều kiện này thay cho G4, vì $\theta_k$ không cố định, và tương ứng H6 của Bài 05b. Từ đó $\mathbb E[\zeta_k\mid\theta_k]=\mathbb E\zeta_k=0$ và $\mathbb E[\zeta_k^2\mid\theta_k]=\sigma_1^2/b$ (Định lý G.2 tại $\theta=1$). Từ $\theta_{k+1}-1=(1-\eta)(\theta_k-1)+\eta\zeta_k$, Mệnh đề E.12 (rút đại lượng đã biết) triệt tiêu số hạng chéo, rồi lấy kỳ vọng toàn phần: $a_{k+1}=(1-\eta)^2a_k+\eta^2\sigma_1^2/b$. Với $\eta=0{,}1$, $a_0=(\theta_0-1)^2=1$: $a_{k+1}=0{,}81a_k+\frac{8}{300b}$, nên $a_K=0{,}81^K+\frac{8}{57b}(1-0{,}81^K)$.

## Danh mục ví dụ

Số khớp bảng số của tác tử số liệu (điều phối viên `chấp nhận` ngày 2026-10-08). Cột "Trạng thái số": "bảng số" là số đã có trong bảng số; "mới" là số do tác tử soạn đưa vào, có phép tính kèm theo, cần tái kiểm toán. Không dùng mô phỏng ngẫu nhiên.

| Mã | Ví dụ | Tiểu mục | Số liệu chính | Trạng thái số |
|---|---|---|---|---|
| VD-00 | Ví dụ ba quan sát (Bài 05 `:86–92`) | §A.1, §D.5, §E.5, §G.2–§G.7 | $y=(-1,1,3)$; $g_i(1)=2,0,-2$; $\nabla J(1)=0$; $J''=1$; với $b>N=3$ (VD-12 $b=4$, VD-17, VD-21) ghi rõ rút có hoàn lại | Bài 05 |
| VD-01 | Ví dụ hai xúc xắc | §B.1, §D.1, §E.1–§E.4 | 36 kết cục; $\mathbb ES=7$, $\operatorname{Var}S=35/6$; một xúc xắc $3{,}5$ và $35/12$ | bảng số |
| VD-02 | Bài toán sinh nhật | §B.3, §B.4 (H-01), §B.5 | $n=23$: $0{,}5073$; $30$: $0{,}7063$; $50$: $0{,}9704$; $70$: $0{,}9992$; cận hợp $253/365\approx0{,}693$ | bảng số |
| VD-03 | Chỉ số lặp trong nhóm nhỏ | §B.4, §E.2 | $N=1000$, $b=32$: $0{,}394$; $b=64$: $0{,}873$; $N=60\,000$, $b=256$: $0{,}420$; số chỉ số khác nhau kỳ vọng $31{,}51$; giả thiết rút có hoàn lại (xáo trộn theo lượt cho xác suất lặp bằng 0) | bảng số |
| VD-04 | Monty Hall | §C.1, §E.7 | đổi cửa thắng $2/3$, giữ $1/3$; người dẫn luôn mở một cửa có dê, chọn đều khi có hai cửa dê (GBC §3.1 chỉ nêu bối cảnh; giả thiết và lời giải tự xây dựng) | bảng số |
| VD-05 | Ví dụ xét nghiệm (Koller và Friedman, Ví dụ 2.2) | §C.2 | tỉ lệ mắc $0{,}001$, độ nhạy và độ đặc hiệu $0{,}95$: $P(+)=0{,}0509$, $P(\text{bệnh}\mid+)\approx0{,}0187$; tần số 100; 95; 99 900; 4 995; $95/5090$ | bảng số |
| VD-05b | Hai xét nghiệm độc lập có điều kiện | §C.4 | Định lý C.4 trực tiếp: $\dfrac{0{,}001\cdot0{,}95^2}{0{,}001\cdot0{,}95^2+0{,}999\cdot0{,}05^2}\approx0{,}265$; tỉ lệ mắc $0{,}01$, một lần: $\approx0{,}161$; độc lập có điều kiện theo cả "mắc" và "không mắc" | bảng số |
| VD-06 | Rút có và không hoàn lại từ $\{-1,1,3\}$ | §C.3, §D.4, §E.6 | 9 cặp đồng khả năng; bảng PMF đồng thời $3\times3$; không hoàn lại: $P(\text{lần 2}=3\mid\text{lần 1}=3)=0\ne\frac13$ | bảng số |
| VD-07 | Số mặt ngửa | §D.2 | $n=3$: PMF $\frac18,\frac38,\frac38,\frac18$; $n=10$: $P(S\ge8)=0{,}0547$ | bảng số ($n=10$); mới ($n=3$, liệt kê) |
| VD-08 | Trò chơi hai xúc xắc | §E.1, §F.3 | trả 1, nhận 10 (gồm cả tiền đặt) khi tổng $\ge11$ ($P=3/36$): lợi nhuận kỳ vọng $10\cdot\frac3{36}-1=-\frac16$; quy ước ghi rõ trong ghi chú | bảng số |
| VD-09 | Nghịch lý St. Petersburg (tùy chọn, một đoạn) | §F.6, BT4 | không giới hạn: $\sum_k2^k2^{-k}$ phân kỳ; trả $\min(2^K,2^{20})$: $\mathbb E=20+1=21$ | bảng số |
| VD-10 | Mẫu chưa gặp sau $N$ lần rút | §E.2, §F.1 | tỉ lệ kỳ vọng $(1-1/N)^N$: $0{,}296$; $0{,}349$; $0{,}3677$ ($N=1000$); giới hạn $e^{-1}\approx0{,}3679$; Markov: $P(T_N\ge N/2)\le2(1-1/N)^N\approx0{,}735$ với $N=1000$ | bảng số; mới (cận Markov) |
| VD-11 | Trùng mũ (tùy chọn, một đoạn) | §E.2 | kỳ vọng số người đúng mũ bằng 1 với mọi $n$ | bảng số |
| VD-12 | Phân phối gradient nhóm, $\theta=1$ | §E.3 (nhu cầu), §E.5, §E.6, §G.2 | có hoàn lại $b=1,2,4$: phương sai $8/3$, $4/3$, $2/3$; $b=2$ tần số $1,2,3,2,1$; không hoàn lại $b=2$: $2/3$; $b=3$: $0$ | bảng số |
| VD-13 | Gradient mẫu tại $\theta=0$ và cây hai bước | §D.5, §E.7, §G.2 | $g_I(0)\in\{1,-1,-3\}$, trung bình $-1=J'(0)$; $\eta=0{,}1$: $\theta_1=0-0{,}1g_I(0)\in\{-0{,}1;0{,}1;0{,}3\}$; $\mathbb E[g_{I_2}(\theta_1)\mid\theta_1]=\theta_1-1$; $\mathbb Eg_{I_2}(\theta_1)=-0{,}9$ | bảng số ($\theta=0$); mới (cây) |
| VD-14 | Ví dụ thăm dò | §E.5, §F.6, §G.1 | $n=1000$, $\sigma_1^2\le\frac14$: sai số chuẩn $\le\sqrt{0{,}25/1000}\approx0{,}0158$; $\varepsilon=0{,}03$: Chebyshev $0{,}278$, Hoeffding hai phía $0{,}331$; $\varepsilon=0{,}05$: $0{,}100$, $0{,}0135$; cỡ mẫu $\varepsilon=0{,}03$, $\delta=0{,}05$: $5\,556$, $2\,050$, $1\,068$ | bảng số; mới (sai số chuẩn) |
| VD-15 | Markov và Chebyshev trên tổng hai xúc xắc | §F.1, §F.2 | $P(S\ge11)=1/12$, Markov $7/11$; $P(\lvert S-7\rvert\ge4)=1/6$, Chebyshev $35/96$ | bảng số |
| VD-16 | Tung đồng xu: ba cận | §F.3, §F.4, §F.6 | $n=100$, $P(S\ge75)$: đúng $2{,}82\cdot10^{-7}$, Markov $50/75\approx0{,}667$, Chebyshev (hai phía) $0{,}04$, Hoeffding (một phía) $3{,}73\cdot10^{-6}$; $P(S\ge60)$: đúng $0{,}0284$, Markov $50/60\approx0{,}833$, Chebyshev $0{,}25$, Hoeffding $0{,}135$; luật số lớn $P(\lvert\bar X_n-\frac12\rvert\ge0{,}1)$, $n=10,20,50,100,200$: đúng $0{,}754$; $0{,}503$; $0{,}203$; $0{,}0569$; $0{,}00569$; Chebyshev $2{,}5$; $1{,}25$; $0{,}5$; $0{,}25$; $0{,}125$; Hoeffding hai phía $1{,}64$; $1{,}34$; $0{,}736$; $0{,}271$; $0{,}0366$ | bảng số; Markov $0{,}833$ do điều phối viên bổ sung |
| VD-17 | Sai số gradient nhóm theo $b$ | §G.3 | độ rộng 4, $\varepsilon=1$, hai phía; $b=4$: đúng $10/27\approx0{,}370$, Chebyshev $2/3$, Hoeffding $1{,}21$; $b=16,32,64$: đúng $0{,}0199$; $6{,}2\cdot10^{-4}$; $8{,}1\cdot10^{-7}$; Chebyshev $1/6$; $1/12$; $1/24$; Hoeffding $0{,}271$; $0{,}0366$; $6{,}7\cdot10^{-4}$; rút có hoàn lại | bảng số |
| VD-17b | Gradient logistic bị chặn, $d$ tọa độ | §G.3 | nhãn $y\in\{-1,+1\}$ (Bài 01 §4), đặc trưng trong $[-1,1]$, mỗi tọa độ gradient trong $[-1,1]$; $d=1000$, $\varepsilon=0{,}1$, $\delta=0{,}05$: $b\ge2\ln(2d/\delta)/\varepsilon^2\approx2\,120$ | bảng số |
| VD-18 | Mất mát tổng | §G.4 | hệ số co phần tất định $1-0{,}1b$: $b=1$: $0{,}9$; $4$: $0{,}6$; $16$: $-0{,}6$ (đổi dấu, vẫn co); $32$: $-2{,}2$ (phân kỳ); phân kỳ khi $b>20$, $b=20$ cho $-1$; mất mát trung bình: $0{,}9$ với mọi $b$ | bảng số |
| VD-19 | Dữ liệu lặp (Goodfellow et al. §8.1.3, tr. 278) | §G.5 | $N=3m$, $m$ bản sao mỗi giá trị; $m=10^6$, $b=30$: sai số chuẩn $\sqrt{8/90}\approx0{,}298$ với chi phí $30$ so với $3\cdot10^6$ | bảng số |
| VD-20 | Ngân sách cố định | §G.6 | $N=3000$, $\theta_0=0$, $\eta=0{,}1$, $K=\lfloor B/b\rfloor$; quy ước $b=N$ là một bước gradient đầy đủ, $a_1=0{,}81$. $B=3000$: $b=1$: $0{,}140$; $10$: $0{,}0140$; $30$: $0{,}00468$; $75$: $0{,}00209$ (đáy trên mọi $b$ nguyên); $100$: $0{,}00320$; $300$: $0{,}122$; $1000$: $0{,}532$; $3000$: $0{,}810$. $B=300$: đáy $b=10$ ($0{,}0158$); $b=300$: $0{,}810$. Ba giới hạn: $\eta$ cố định; rút có hoàn lại; chi phí chỉ đếm gradient mẫu | bảng số |
| VD-21 | Sai số chuẩn theo $b$ | §G.5 | $\sqrt{8/(3b)}$: $b=1$: $1{,}633$; $4$: $0{,}816$; $16$: $0{,}408$; $64$: $0{,}204$; $100$: $0{,}163$; $10\,000$: $0{,}0163$ | bảng số |
| VD-22 | Cỡ tập xác thực | §G.1 | mất mát 0–1, $\varepsilon=0{,}01$, $\delta=0{,}05$: Hoeffding $\ln40/(2\cdot10^{-4})\approx18\,445$; Chebyshev $50\,000$; tập xác thực phải độc lập với $\theta$ (G4) | bảng số |
| VD-23 | Bộ sưu tập | BT5 | $N=1000$: $NH_N\approx7\,485$ | bảng số |

Số mới, mỗi số kèm phép tính để tái kiểm: $\cosh1=\frac{e+e^{-1}}2\approx1{,}543\le e^{1/2}\approx1{,}649$ (§F.4); sai số chuẩn thăm dò $\sqrt{\sigma_1^2/n}$ với $\sigma_1^2\le\frac14$, $n=1000$: $\sqrt{0{,}25/1000}\approx0{,}0158$ (§E.5, §G.1); cận Markov cho VD-10: $\mathbb ET_N=N(1-1/N)^N$, $P(T_N\ge N/2)\le2(1-1/N)^N=2\cdot0{,}3677\approx0{,}735$; cây VD-13: $\theta_1=-0{,}1g_I(0)$, $\mathbb E(\theta_1-1)=\frac13(-1{,}1-0{,}9-0{,}7)=-0{,}9$; PMF $n=3$ liệt kê 8 kết cục; BT4 câu (a) với 4 đồng xu: $\binom4k/16$ cho $k=0,\dots,4$, kỳ vọng $4\cdot\frac12=2$; BT5 câu (b): $(1-1/N)^{2N}\approx0{,}1352$ với $N=1000$, giới hạn $e^{-2}\approx0{,}1353$.

## Danh mục hình

Quy ước theo hình Bài 05b: `viewBox` rộng 600, chữ từ 22 đơn vị, `role="img"`, `title` và `desc`, `alt` nêu đủ số liệu, không dùng màu làm tín hiệu duy nhất. Tệp đặt ở `2627-1/img/lec-05c/`; Markdown tham chiếu `img/lec-05c/<tệp>.svg`. Số liệu của hình lấy từ bảng số. Kiểm đọc được ở 390 px.

| Mã | Tệp | Nội dung | Tiểu mục | Ví dụ |
|---|---|---|---|---|
| H-01 | `birthday-and-batch-duplicates.svg` | hai bảng cùng công thức $1-\prod_{i<n}(1-i/M)$: (a) xác suất trùng ngày sinh theo $n=0..70$, đánh dấu $n=23$; (b) xác suất chỉ số lặp theo $b=0..100$ với $N=1000$, đánh dấu $b=32$ | §B.4 | VD-02, VD-03 |
| H-02 | `test-tree-natural-frequencies.svg` | cây hai tầng mắc/không mắc → dương/âm, số người trên mỗi nhánh | §C.2 | VD-05 |
| H-03 | `monty-hall-tree.svg` | tầng 1: vị trí xe; tầng 2: cửa được mở; lá ghi "đổi thắng" hoặc "giữ thắng" | §C.1, §E.7 | VD-04 |
| H-04 | `two-dice-pmf.svg` | PMF tổng hai xúc xắc, vạch $\mathbb ES=7$, đoạn $7\pm\sqrt{35/6}$ | §E.3 | VD-01 |
| H-05 | `indicator-dominating-functions.svg` | ba bảng: hàm chỉ thị bị chặn bởi $z/\varepsilon$, $((x-\mu)/t)^2$, $e^{\lambda(x-a)}$ | §F.4 (gom ba chứng minh khi hàm chặn thứ ba xuất hiện) | ký hiệu |
| H-06 | `coin-tail-three-bounds.svg` | $n=100$, $k=55..80$, trục tung logarit $10^{-10}..1$; xác suất đúng, Markov, Chebyshev (hai phía), Hoeffding (một phía); nhãn ghi phía | §F.6 | VD-16 |
| H-07 | `lln-deviation-vs-n.svg` | $P(\lvert\bar X_n-\frac12\rvert\ge0{,}1)$ theo $n$; đúng, Chebyshev, Hoeffding hai phía; vùng cận lớn hơn 1 ghi "cận vô nghĩa" | §F.6 (§F.3 dùng bảng hai cột vì Hoeffding chưa có) | VD-16 |
| H-08 | `batch-gradient-pmf.svg` | PMF gradient nhóm, ba bảng $b=1,2,4$ có hoàn lại | §E.5 | VD-12 |
| H-09 | `stderr-and-cost-vs-b.svg` | trục hoành logarit $b=1..10^4$: sai số chuẩn $\sqrt{8/(3b)}$ và chi phí tương đối $b$ | §G.5 | VD-21 |
| H-10 | `budget-u-curve.svg` | điểm trên các ước của 3000 (kể cả $b=75$), $K=\lfloor B/b\rfloor$; trục hoành logarit $b=1..3000$, trục tung logarit $a_K$; đường $B=3000$ (đến $b=3000$) và $B=300$ (đến $b=300$); đánh dấu đáy $b=75$ và $b=10$; $b=N$ là một bước gradient đầy đủ | §G.6 | VD-20 |
| H-11 | `sum-vs-mean-contraction.svg` (tùy chọn, có thể thay bằng bảng) | hệ số co $1-0{,}1b$ và hằng $0{,}9$ theo $b=1..32$; dải $\lvert\cdot\rvert<1$ | §G.4 | VD-18 |

## Bài tập

Mười bài, ba mức, cùng dạng `materials/lec-05b/exercises.md`: tiêu đề `## Bài k. <tên>`, dòng "Mức độ:", khối `exercise`, `hint`, `solution`; mục `## Nguồn` cuối tệp. Chỉ bài vận dụng vào AI ghi LLO/CLO. Bài tập không chép lại ví dụ hay chứng minh đã có trong ghi chú; mỗi câu đổi tham số hoặc kỹ thuật. Không trùng nguyên văn Bài 05 Bài 2 và Bài 05b Bài 9.

| Mã | Tên dự kiến | Mức độ | Nội dung | Khái niệm | Đáp số | LLO/CLO |
|---|---|---|---|---|---|---|
| BT1 | Biến cố trên hai xúc xắc | nhận biết | liệt kê "tổng bằng 7", "ít nhất một mặt 6"; tính xác suất; kiểm Mệnh đề B.2 và cận hợp | K1, K2, K3 | $6/36$; $11/36$; cận hợp $12/36$ | không gán |
| BT2 | Xét nghiệm với tỉ lệ mắc 2% | nhận biết | $P(\text{bệnh}\mid+)$ với độ nhạy $0{,}9$, độ đặc hiệu $0{,}95$; sau hai lần dương tính độc lập có điều kiện (Định lý C.4 trực tiếp) | K4 | $18/67\approx0{,}269$; $324/373\approx0{,}869$ | không gán |
| BT3 | Độc lập từng đôi và độc lập | nhận biết | hai đồng xu và biến cố "khác nhau"; rút hai lần không hoàn lại từ $\{-1,1,3\}$ | K5 | Nhận xét C.6; VD-06 | không gán |
| BT4 | Phân phối, kỳ vọng và kỳ vọng toàn phần | tính toán | (a) PMF, CDF và kỳ vọng của số mặt ngửa khi tung 4 đồng xu cân đối; (b) St. Petersburg trả $\min(2^K,2^{20})$; (c) kỳ vọng phân phối hình học; (d) Monty Hall bằng kỳ vọng toàn phần | K6, K7, K10 | (a) $\frac1{16},\frac4{16},\frac6{16},\frac4{16},\frac1{16}$; CDF $\frac1{16},\frac5{16},\frac{11}{16},\frac{15}{16},1$; kỳ vọng $2$; (b) $21$; (c) $1/p$; (d) $2/3$ | không gán |
| BT5 | Hàm chỉ thị và chỉ số trong nhóm nhỏ | tính toán | (a) số chỉ số khác nhau trong nhóm $b$ có hoàn lại; (b) tỉ lệ mẫu chưa gặp sau $2N$ lần rút; (c) bộ sưu tập: số lần rút kỳ vọng để gặp đủ $N$ mẫu (dùng BT4 câu (c)) | K7, K2 | (a) $N(1-(1-1/N)^b)$; (b) $(1-1/N)^{2N}\approx0{,}135$ ($N=1000$); (c) $NH_N\approx7\,485$ | không gán |
| BT6 | Rút không hoàn lại bằng hàm chỉ thị | chứng minh | chứng minh lại Mệnh đề E.10 bằng cách viết tổng mẫu $\sum_jv_j\mathbf 1\{j\text{ được chọn}\}$, với $P(j\text{ được chọn})=n/N$ và $P(j,k\text{ cùng được chọn})=\frac{n(n-1)}{N(N-1)}$; kiểm trên ví dụ ba quan sát, $b=2$ và $b=3$ | K8, K9 | $2/3$; $0$ | không gán |
| BT7 | Dấu bằng và giả thiết của Markov, Chebyshev | chứng minh | (a) mọi phân phối đạt dấu bằng trong Định lý F.1; (b) phản ví dụ khi bỏ giả thiết $Z\ge0$; (c) phân phối ba điểm đạt dấu bằng trong Hệ quả F.2 | K11, K12 | (a) $Z\in\{0,\varepsilon\}$; (c) với $\operatorname{Var}X\le t^2$: $P(X=\mu\pm t)=\frac{\operatorname{Var}X}{2t^2}$ mỗi điểm, $P(X=\mu)=1-\frac{\operatorname{Var}X}{t^2}$ | không gán |
| BT8 | Ba cận cho đồng xu và cỡ mẫu thăm dò | tính toán | so ba cận với giá trị đúng (cho sẵn) cho $P(S\ge60)$, $P(S\ge75)$, ghi phía của từng cận; cỡ mẫu $\varepsilon=0{,}02$, $\delta=0{,}05$ | K12, K13 | VD-16; $12\,500$ và $4\,612$ | không gán |
| BT9 | Gradient nhóm trên ví dụ ba quan sát | vận dụng vào AI | (a) PMF gradient nhóm $b=2$ có và không hoàn lại; (b) Chebyshev so với giá trị đúng; (c) chọn $b$ cho gradient logistic bị chặn trên $d$ tọa độ | K6, K14, K3, K13 | (a) VD-12; (b) có hoàn lại: $P(\lvert\widehat g\rvert\ge1)=2/3$, cận $4/3$; không hoàn lại: $2/3$, cận $2/3$ (dấu bằng); (c) VD-17b | LLO12, CLO2 |
| BT10 | Mất mát tổng, ngân sách và tập xác thực | vận dụng vào AI | (a) $b$ làm phần tất định phân kỳ, bước tương đương với mất mát trung bình; (b) $a_K$ với $B=3000$, $b\in\{1,30,300,3000\}$, $b=3000$ là một bước gradient đầy đủ; (c) cỡ tập xác thực; (d) hai giả thiết bị vi phạm khi duyệt theo lượt hoặc dùng tập xác thực để chọn mô hình | K15, K14 | (a) $b>20$; (b) $0{,}140$; $0{,}00468$; $0{,}122$; $0{,}810$; (c) $18\,445$; (d) G1, G4 | LLO11, LLO12; CLO1, CLO2 |

## Học liệu và nguồn

Theo quyết định 6. Số trang (trang in) theo bảng nguồn của tác tử nguồn, điều phối viên `chấp nhận` ngày 2026-10-08.

| Mã | Tài liệu | Vị trí | Vai trò |
|---|---|---|---|
| DC | Đề cương UET.AI2012, DOCX trong `sources/` | danh sách buổi; LLO11, LLO12 (Buổi 5), LLO27 (Buổi 12) | xác nhận không có buổi riêng; chuẩn đầu ra (điều phối viên đã kiểm) |
| KF | Koller và Friedman (2009), *Probabilistic Graphical Models*, MIT Press, `sources/Koller-and-friedman-probabilistic-graphical-models-2009.pdf` | §2.1 (tr. 15–34; Ví dụ 2.2 tr. 19); §2.1.7 (Mệnh đề 2.5 tr. 32, Định lý 2.1 tr. 33–34); Bài tập 2.12–2.13 (tr. 40); §12.1.2, (12.3) (tr. 490–491); §17.6.2.1 (tr. 771–772); Phụ lục A.2 (tr. 1143–1146) | đối chiếu B, C, E, F; VD-05; F.6 là trường hợp $p=\frac12$ của Định lý A.3; nguồn trực tiếp của F.9 với $[0,1]$ và VD-22; VD-17b. KF không trình bày phân phối nhị thức: Mệnh đề D.6 tự xây dựng |
| GBC | Goodfellow, Bengio và Courville (2016), *Deep Learning*, MIT Press | §3.2–3.3 (biến ngẫu nhiên, PMF, mật độ, tr. 56–58); §3.5–3.8 (tr. 59–62); §3.9.1 (Bernoulli, tr. 62); §3.11 (tr. 70–71); §5.4.2–5.4.3 (tr. 124–129; (5.46), (5.47) tr. 128); §8.1.3 (tr. 277–282; 100 so với 10 000 mẫu và dữ liệu dư thừa tr. 278; không chệch cho sai số tổng quát hóa ở lượt đầu tr. 280–281); §8.3.1 (tr. 294–296) | D.1–D.4, Định nghĩa D.3 (Bernoulli); Định lý E.9 (sai số chuẩn); hệ số $1{,}96$ của F.10; §A.1, Mệnh đề G.4, VD-19; khác biệt ghi ở §G.2 |
| BV | Boyd và Vandenberghe (2004), *Convex Optimization*, `sources/bv_cvxbook.pdf` | §7.4 (tr. 374–383); §7.4.1 (tr. 374–375); §7.4.2, (7.20) (tr. 379) | đối chiếu F.1, F.2 (dạng chuẩn hóa), F.4 |
| SNW | Sra, Nowozin và Wright (biên tập, 2011), *Optimization for Machine Learning*, ch. 13 (Bottou và Bousquet); bản `(Neural Information Processing series) … (2011).pdf` | §13.2 ((13.1) tr. 353; (13.2)–(13.3) tr. 354; Bảng 13.1 tr. 355); §13.3.2 (tr. 359–362; Bảng 13.2 tr. 362) | Nhận xét G.5, §G.6; chọn bản 2011 như Bài 05b |
| Niu | Niu (2024), *Optimization Methods for Machine Learning*, BIMSA, `sources/optimization-methods-bimsa.pdf` | slide 160–169 (lấy mẫu không hoàn lại, Bổ đề 36) | chỉ đối chiếu Mệnh đề E.10; không trích làm nguồn chính |
| B00, B01, B04, B05, B05b, B06 | học liệu của học phần | xem mục "Chỗ Bài 05c cung cấp nền"; Bài 01 §4.2 (nhãn $\pm1$); Bài 04 (bước $1/L$); ví dụ ba quan sát ở Bài 05 `:86–92` | đối chiếu ký hiệu, ví dụ ba quan sát, H6, H6b, BĐ6 |

Khác biệt với nguồn giữ trong học liệu: Koller và Friedman chỉ đòi cộng tính hữu hạn, Định nghĩa B.1 đòi cộng tính đếm được như Bài 00; Koller và Friedman phát biểu Markov với $t\ge0$, Định lý F.1 dùng $\varepsilon>0$; luật số lớn yếu không được phát biểu trong KF và BV (GBC (17.5) nêu dạng mạnh, không chứng minh), nên Định lý F.3 ghi "kết quả chuẩn"; Hoeffding cho biến bị chặn tổng quát (Định lý F.8), Bổ đề F.7, dạng entropy tương đối của Chernoff không có trong kho; Bảng 13.2 của SNW có bốn thuật toán và SGD ở đó dùng một mẫu mỗi vòng.

Câu ghi trong ghi chú: "Markov, Chebyshev, luật số lớn yếu, Chernoff và Hoeffding là kết quả chuẩn; chứng minh trong ghi chú tự xây dựng; phát biểu đối chiếu Koller và Friedman §2.1.7, Bài tập 2.12–2.13, Phụ lục A.2 và Boyd và Vandenberghe §7.4." Bổ đề F.7 ghi "kết quả chuẩn, không chứng minh trong bài". Bài toán sinh nhật, Monty Hall, St. Petersburg, trùng mũ, bộ sưu tập ghi "ví dụ kinh điển, số liệu tính trực tiếp". Cách dẫn theo mẫu Bài 05b: dẫn trong dòng ngay sau phát biểu có nguồn, mục `## Tài liệu tham khảo` cuối ghi chú, mục `## Nguồn` cuối bài tập. Không tải MIT OCW; không thêm nguồn ngoài `sources/`.

## Thuật ngữ Việt–Anh dùng lần đầu

Bảng tạm, chờ rà ký hiệu và thuật ngữ.

| Tiếng Việt | Tiếng Anh (trong ngoặc ở lần đầu) | Tiểu mục |
|---|---|---|
| nhóm nhỏ | minibatch | §A.1 |
| không gian mẫu, kết cục, biến cố | sample space, outcome, event | §B.1 |
| bất đẳng thức hợp | union bound | §B.5 |
| xác suất có điều kiện; công thức Bayes | conditional probability; Bayes' rule | §C.1, §C.2 |
| độc lập; độc lập từng đôi; độc lập có điều kiện | independence; pairwise independence; conditional independence | §C.3, §C.4 |
| biến ngẫu nhiên | random variable | §D.1 |
| độc lập cùng phân phối | independent and identically distributed, i.i.d. | §D.4 (viết tắt đã có ở §A.3) |
| kỳ vọng; phương sai; hiệp phương sai; độ lệch chuẩn | expectation; variance; covariance; standard deviation | §E.1, §E.3 |
| hàm chỉ thị | indicator function | §E.2 |
| ước lượng không chệch; sai số chuẩn | unbiased estimator; standard error | §E.5 |
| kỳ vọng có điều kiện; kỳ vọng toàn phần | conditional expectation; law of total expectation | §E.7 |
| luật số lớn yếu | weak law of large numbers | §F.3 |
| hàm sinh mômen; biến Rademacher | moment generating function; Rademacher variable | §F.4 |
| rủi ro thực nghiệm | empirical risk | §G.1 |
| lượt | epoch | §H.2 |

Mệnh đề E.2 trong ghi chú gọi là "công thức kỳ vọng của hàm một biến ngẫu nhiên"; tên viết tắt tiếng Anh LOTUS chỉ dùng trong tài liệu lập kế hoạch.

## Kế hoạch thực hiện

Mọi tác tử con: `Agent` với `subagent_type: "general-purpose"`, `model: "opus"`, `effort: "high"`; không dùng `fork`. Chỉ một tác tử ghi tệp tại một thời điểm. Điều phối viên Fable 5.1 duyệt mọi đầu ra và ghi quyết định vào review-log.

| Bước | Vai | Ghi tệp | Đầu ra | Điều kiện hoàn thành | Trạng thái 2026-10-08 |
|---|---|---|---|---|---|
| 0 | Điều phối viên: quyết định H.1 | — | chín quyết định | đủ chín điểm | xong |
| 1 | Phân tích nguồn (chỉ đọc) | Không | bảng nguồn | mọi trích dẫn có tệp và trang | xong, `chấp nhận` |
| 1'' | Số liệu ví dụ và bài tập (chỉ đọc) | Không | bảng số | mọi số khớp phép tính độc lập | xong, `chấp nhận` |
| 2 | Soạn ba tệp planning | Có | `outline.md`, `storyboard.md`, `review-log.md` | mỗi mục storyboard đủ sáu trường | lượt 1 `chấp nhận`; lượt 3 sửa theo cổng; cổng lượt 3 đạt, `chấp nhận` sau năm điểm G23–G27 |
| 2' | Hạ tầng viewer (quyết định 7) | Có | `material-viewer.js`, chuỗi phiên bản, `materials/README.md`, `AGENTS.md`, `CLAUDE.md` | bốn kiểm Playwright đạt | xong, commit 716a049, acf3ff2 |
| 3 | Cổng storyboard (chỉ đọc) | Không | báo cáo `mức độ | mục | vấn đề | bằng chứng | đề xuất sửa` | không còn `chặn bàn giao`, `nghiêm trọng` | lượt 1 "chưa đạt"; tái kiểm "đạt" |
| 4 | Soạn học liệu và SVG | Có (tuần tự) | ghi chú A–H, 10 bài tập, 10–11 hình; sync | `--check` đạt; tự kiểm `eval.md` | chưa bắt đầu |
| 5 | Năm vai rà soát (chỉ đọc, song song) | Không | năm báo cáo | đủ năm vai | chưa bắt đầu |
| 6 | Biên tập | Có | sửa tệp, ghi đề xuất bị bác | mọi `chặn bàn giao`, `nghiêm trọng` đã xử lý | chưa bắt đầu |
| 7 | Tái kiểm toán và mạch (chỉ đọc) | Không | hai báo cáo | không lỗi mới | chưa bắt đầu |
| 8 | Kiểm định cuối | Không | ảnh chụp 1600×900 và 390×844, `file://`, sync, `git diff --check` | điều phối viên ký duyệt | chưa bắt đầu |
| 9 | Thẻ `index.html`, commit, push | Có | `feat(materials): Bài 05c …`; planning thêm bằng `git add -f` | `git branch -r --contains HEAD` có `origin/main` | chưa bắt đầu |
