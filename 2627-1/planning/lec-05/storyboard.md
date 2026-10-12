# Storyboard Bài 05 — Không gian đặc trưng nhiều chiều

Storyboard lập ngày 2026-10-11 theo thiết kế Lecture A của người dùng, cùng ngày với [dàn bài](outline.md); [nhật ký](review-log.md) ghi vòng lập lại kế hoạch và quyết định của điều phối viên. Dàn bài chứa mặt trang, ghi chú, số liệu, đáp án và thời lượng từng trang; storyboard này ghi lý do tồn tại, quan hệ vào–ra và bước hành trình của từng trang. Storyboard của deck Bài 05 cũ (nay là Bài 06b) nằm ở `planning/lec-06b/storyboard.md` và không ràng buộc bản này.

Quy ước viết tắt: lý thuyết (LT), bài tập (BT), chuẩn đầu ra bài học (LLO), chuẩn đầu ra học phần (CLO), hạ gradient ngẫu nhiên (SGD). Mã trang, thời lượng và mã LLO chỉ dùng trong tài liệu lập kế hoạch.

## Phạm vi và cơ sở lý thuyết chung

Bài gồm 44 trang trong 5 mạch ngoài (43 trang theo kế hoạch đã duyệt; HQ08 tách thành HQ08 và HQ09 sau cổng storyboard 2026-10-11): mở đầu (MD), ba mạch ứng với ba phiên A1–A3 của thiết kế (HQ, LG, CP) và kết luận (KL). Số mạch nằm trong khoảng 5–7; không có ngoại lệ cần ghi. Thời lượng theo đề cương: 2 tiết LT + 1 tiết BT, chia thành ba khối 1 tiết (khối 1 = MD + HQ, khối 2 = LG, khối 3 = CP + KL). Deck được dựng ngày 2026-10-12 (`lecture-05-khong-gian-dac-trung-nhieu-chieu.html`, 44 trang, đúng mã và thứ tự trang của storyboard); các sai lệch về hình và bố cục ghi ở nhật ký, vòng dựng deck.

**Vấn đề trung tâm.** Với mô hình tuyến tính theo đặc trưng và mất mát lồi, xác định điều gì thay đổi khi số đặc trưng $d$ tăng so với kích thước mẫu $n$: cực tiểu của rủi ro thực nghiệm có tồn tại và duy nhất không, có dự đoán tốt trên dữ liệu mới không, và tính nó tốn bao nhiêu phép tính.

**Luận đề xuyên suốt** (yêu cầu người dùng 2026-10-11). Khung của Bài 01–04 (mục tiêu lồi có cực tiểu chính xác, phương pháp tất định hội tụ tới nó) không còn là bức tranh đúng khi $n$ và $d$ lớn, vì (1) tính toán không cho phép dùng toàn bộ dữ liệu ở mỗi bước và (2) cực tiểu chính xác của mất mát huấn luyện $F$ không phải đích, vì $F$ chỉ thay thế cho rủi ro $R$ trên dữ liệu mới. MD03 nêu hai lý do; HQ và LG kiểm chứng lý do (2); CP kiểm chứng lý do (1); KL tổng hợp thành hai giới hạn chuyển sang Bài 06 và bảng điều không còn giữ được / điều còn giữ được. Cột "còn giữ được" gồm: tính giảm mỗi bước của hạ gradient dùng gradient đầy đủ (bổ đề giảm); với SGD, bất đẳng thức một bước có số hạng nhiễu; với $F_\lambda$ lồi mạnh, bước hằng tới lân cận cỡ $\eta\tau^2/\mu$ (Bài 05b T5), bước giảm dần tới cực tiểu, $O(1/k)$ (T6); điểm dừng xấp xỉ theo T7, T8 (có mức nhiễu nền). SGD không bảo đảm $F$ giảm theo kỳ vọng ở mỗi bước (phát hiện của cổng storyboard Bài 06).

**Sườn lý thuyết** (đầy đủ ở dàn bài, mục Khung lý thuyết chung).

- Đối tượng: dữ liệu $(u_i,y_i)$, $x_i=\varphi(u_i)\in\mathbb R^d$ có tọa độ hằng $1$, $X\in\mathbb R^{n\times d}$, $w\in\mathbb R^d$ (hệ số chặn nằm trong $w$, không dùng $b$), $F$, $R$, $F_\lambda$, $L,\mu,\kappa$.
- Giả thiết G1–G5: dữ liệu hữu hạn; mô hình tuyến tính, mất mát bình phương hoặc logistic; huấn luyện, xác thực, kiểm thử cùng phân phối; $\lambda>0$ chọn bằng tập xác thực; đếm chi phí dày đặc, bỏ hằng số.
- Chuỗi: định nghĩa ($F$, $R$, tập xác thực, tập kiểm thử, chế độ nội suy, $\kappa$, tách được, $F_\lambda$) → kết quả (KQ2 nội suy; KQ4–KQ5 tách được và không tồn tại cực tiểu; KQ7 lồi mạnh và cận $L$, $\kappa$ (với $\lVert x_i\rVert\le r$, $r\ge1$); KQ8–KQ9 số bước; KQ10 chi phí) → phương pháp (hạ gradient, Newton, ngưỡng hòa vốn) → quyết định (chọn $d$, $\lambda$, bước dừng, phương pháp).
- Giới hạn: chỉ mô hình tuyến tính và mất mát lồi; chỉ phương pháp tất định dùng toàn bộ dữ liệu; cận số bước là cận trên; chi phí đếm theo bậc; ví dụ năm điểm chỉ minh họa định tính.

## Chức năng và ranh giới mạch

| Mạch | Chức năng | Đầu vào | Đầu ra và đóng góp vào vấn đề trung tâm | Trang kiểm tra | Tiết LT + BT |
|---|---|---|---|---|---|
| MD. Bài toán trung tâm và khung chung | Nêu sự thay đổi bức tranh so với Bài 01–04 và hai lý do; đặt khung, ký hiệu | Khung lồi, phương trình chuẩn, hồi quy logistic, hạ gradient, Newton (Bài 01–04) | Vấn đề trung tâm; ba nhu cầu cho ba mạch giữa; ký hiệu chung | — | 0,10 + 0 |
| HQ. Hồi quy nhiều chiều (A1) | Trả lời nhu cầu: điều gì thay đổi ở nghiệm bình phương nhỏ nhất khi $d$ tăng tới và vượt $n$ | Phương trình chuẩn, điều kiện duy nhất (Bài 01), ridge (Bài 02), trung bình mẫu (Bài 05c) | Ba hệ quả: không duy nhất khi $d>n$, khoảng cách huấn luyện–xác thực, $\kappa$ không giảm (xen kẽ Cauchy); $F$ khác $R$; chính quy hóa sửa tính duy nhất; giới hạn "tồn tại" mở LG | HQ11 | 0,56 + 0,34 |
| LG. Hồi quy logistic và chính quy hóa (A2) | Trả lời nhu cầu: vì sao bài toán học lồi có thể không có cực tiểu, và sửa bài toán để cực tiểu tồn tại, duy nhất | Chế độ nội suy (HQ07), $\kappa$ (HQ09), mất mát logistic (Bài 01) | Tách được ⇒ không có cực tiểu; $F_\lambda$ lồi mạnh, nghiệm duy nhất, $\mu=\lambda$, $\kappa\le1+\lambda_{\max}/(4n\lambda)\le1+r^2/(4\lambda)$; $\lambda$ nhỏ làm $\kappa$ lớn, mở CP | LG11 | 0,67 + 0,33 |
| CP. Độ cong và chi phí tính toán (A3) | Trả lời nhu cầu: chi phí tính toán của một bước cập nhật hội tụ nhanh hơn | $F_\lambda$, $\kappa$ (LG09); hạ gradient, Newton (Bài 04); T2b (Bài 05b) | Số bước theo $\kappa$ và theo hai giai đoạn Newton; chi phí một bước $O(nd)$, $O(nd^2+d^3)$; ngưỡng hòa vốn; mọi bước trả thừa số $n$ (giới hạn (i)) | CP10 | 0,53 + 0,25 |
| KL. Giới hạn của tối ưu tất định | Tổng hợp ba phiên thành luận đề; nêu hai giới hạn chuyển sang Bài 06 | Đầu ra HQ, LG, CP | Dừng sớm có sai số xác thực nhỏ hơn nghiệm chính xác; bằng chứng RCV1; giới hạn (i) chi phí theo $n$ (dẫn CP11) và (ii) XOR; bảng điều không còn giữ được / còn giữ được; đầu vào B1–B3 và E02 của Bài 06 | KL05 | 0,14 + 0,08 |

Tổng 2,00 tiết LT + 1,00 tiết BT. Ba ranh giới cần giữ rõ:

- HQ12 → LG01: bình phương nhỏ nhất luôn có nghiệm, mất mát logistic thì không; chế độ nội suy $\operatorname{rank}X=n$ của HQ07 được dùng lại làm điều kiện đủ cho tách được ở LG04.
- LG12 → CP01: chính quy hóa sửa tồn tại và duy nhất nhưng làm $\kappa$ tăng theo $1/\lambda$; câu hỏi chuyển từ "nghiệm có tồn tại" sang "tính nghiệm tốn bao nhiêu".
- CP11 → KL01: Newton đổi số bước lấy chi phí $d^2$, $d^3$ nhưng không bỏ được thừa số $n$; kết luận ghép giới hạn này với lý do (2) qua dừng sớm.

## Bản đồ hành trình khái niệm

Thứ tự chuẩn là nhu cầu → trực quan → ví dụ → hình thức/toán học → ứng dụng → bài tập. Khi ví dụ dẫn nhập đứng cùng trang nhu cầu, dữ kiện xuất hiện trước hình thức hóa và nhu cầu mà ví dụ làm cụ thể được ghi rõ. Thời lượng cụm lấy từ kế hoạch đã duyệt, điều chỉnh sau cổng storyboard ở KN3 ($+0{,}01$) và KN8 ($-0{,}02$); các trang dùng chung giữa các cụm được chia phần, nên tổng các cụm cộng với các trang chuyển mạch (HQ12 $0{,}07$, LG12, CP11, KL02–KL05) và mạch mở đầu bằng tổng toàn bài.

### KN1. Rủi ro thực nghiệm, rủi ro kỳ vọng và quá khớp

- **Sáu bước:** nhu cầu + ví dụ dẫn nhập HQ01; trực quan HQ03; ví dụ HQ04; hình thức HQ05; ứng dụng HQ10, KL01; bài tập HQ11(d) (chọn $d$ theo cột xác thực, nêu tập báo cáo cuối), KL05(c).
- **Ví dụ dẫn nhập:** năm mẫu VD-A1 với đặc trưng đa thức phục vụ nhu cầu "xác định điều gì thay đổi khi $d$ tăng".
- **Đầu vào và mục tiêu:** phương trình chuẩn (Bài 01), kỳ vọng và trung bình mẫu (Bài 05c); MT1, LLO11 → CLO1. Sản phẩm: phân biệt $F$ với $R$, đọc sai số huấn luyện và sai số trên tập xác thực, chọn $\lambda$ đúng quy tắc.
- **Ký hiệu/dữ kiện truyền tiếp:** $u=(-1,-\tfrac12,0,\tfrac12,1)$, $y=u+\varepsilon$, bốn điểm $u=\pm\tfrac14,\pm\tfrac34$; $F$, $R$, tập xác thực, tập kiểm thử. Dữ liệu truyền sang HQ06–HQ10 và KL01.
- **Gộp hoặc rút gọn:** HQ01 gộp nhu cầu và ví dụ dẫn nhập, hợp lệ theo AGENTS.md. Ứng dụng có hai trang: HQ10 (chọn $\lambda$) và KL01 (chọn bước dừng).
- **Câu nối học thuật:** sai số huấn luyện giảm theo $d$ vì tập mô hình lồng nhau (HQ03) → sai số trên bốn điểm ngoài mẫu tăng 389 lần từ $d=2$ đến $d=5$ (HQ04) → cần tách đại lượng tối ưu $F$ khỏi đại lượng cần nhỏ $R$, và tách tập chọn khỏi tập báo cáo (HQ05) → $\lambda$ chọn theo cột xác thực (HQ10).
- **Thời lượng cụm:** 0,25 tiết LT + 0,15 tiết BT.

### KN2. Chế độ nội suy và tính không duy nhất

- **Sáu bước:** nhu cầu HQ03 (số $0$ tại $d=5$); trực quan HQ06; ví dụ HQ06; hình thức HQ07; ứng dụng HQ07 (chọn nghiệm chuẩn nhỏ nhất), LG04; bài tập HQ11(a).
- **Đầu vào và mục tiêu:** Mệnh đề 01.6 (Bài 01), định lý hạng–số chiều; MT1, LLO11 → CLO1. Sản phẩm: xác định hạng, số chiều tập nghiệm và $\min F$.
- **Ký hiệu/dữ kiện truyền tiếp:** KQ2; $\ker X$, $z=(0,\tfrac14,0,-\tfrac54,0,1)$, $w_{\rm mn}$. KQ2 được dùng lại ở LG04.
- **Gộp hoặc rút gọn:** HQ06 gộp trực quan và ví dụ: đếm năm phương trình, năm ẩn là ý trực quan, đa thức nội suy là ví dụ tính được.
- **Câu nối học thuật:** MSE huấn luyện bằng $0$ tại $d=n$ (HQ03) → $X$ vuông khả nghịch nên $Xw=y$ có nghiệm đúng (HQ06) → khi $\operatorname{rank}X=n$ mọi nhãn được nội suy và tập nghiệm có chiều $d-n$ (HQ07) → dữ liệu huấn luyện không phân biệt được các nghiệm, cần tiêu chí ngoài dữ liệu.
- **Thời lượng cụm:** 0,13 tiết LT + 0,10 tiết BT.

### KN3. Số điều kiện

- **Sáu bước:** nhu cầu HQ08 (thí nghiệm độ nhạy); trực quan HQ08 (đường mức); ví dụ HQ09 (bảng $\kappa$ theo $d$); hình thức HQ09 (định nghĩa, $\kappa_F=\kappa(X^TX)$, cận độ nhạy, nhận xét xen kẽ Cauchy); ứng dụng HQ10, CP03; bài tập HQ11(c).
- **Đầu vào và mục tiêu:** trị riêng ma trận đối xứng (Bài 00), Hessian của $F$ (HQ02); MT1, MT3, LLO11 → CLO1. Sản phẩm: tính $\kappa(X^TX)$, nối $\kappa$ với độ nhạy và với $L/\mu$.
- **Ký hiệu/dữ kiện truyền tiếp:** $\delta y_3=0{,}01$, $\lVert\delta w\rVert=0{,}002$ và $0{,}0648$; $\kappa(X^TX)=\kappa_F$; bảng $1;2;9{,}50;50{,}5;553{,}7;\infty$; dùng ở LG09 và CP.
- **Gộp hoặc rút gọn:** sau cổng storyboard, trang gộp bốn bước của kế hoạch được tách thành hai trang (HQ08: nhu cầu + trực quan; HQ09: ví dụ + hình thức), vì trên một trang nhu cầu đứng sau định nghĩa và trang mang ba khối nội dung.
- **Câu nối học thuật:** đổi một nhãn $0{,}01$ làm $w$ đổi $0{,}002$ ở $d=2$ nhưng $0{,}0648$ ở $d=5$, và elip mức dẹt dần (HQ08) → bảng $\kappa$ theo $d$, định nghĩa và $\kappa_F=\kappa(X^TX)$; $\kappa$ không giảm khi thêm đặc trưng (HQ09) → ridge thay $\infty$ bằng $189{,}5$ ở $d=8$ (HQ10); $\kappa$ là cận trên quyết định số bước hạ gradient ở CP03–CP04.
- **Thời lượng cụm:** 0,11 tiết LT + 0,09 tiết BT (tăng $0{,}01$ LT do tách trang; HQ12 giảm từ $0{,}08$ xuống $0{,}07$).

### KN4. Tách được tuyến tính và sự không tồn tại cực tiểu

- **Sáu bước:** nhu cầu + ví dụ dẫn nhập LG01; trực quan LG03; ví dụ LG03; hình thức LG04 (định nghĩa, KQ4), LG05 (định lý KQ5), LG06 (KQ6, kết quả đối chứng); ứng dụng LG10 (dòng $\lambda=0$: chế độ $d\ge n$ làm hồi quy logistic mất cực tiểu với mọi nhãn); bài tập LG11(a, b).
- **Ví dụ dẫn nhập:** ba điểm $u=(-1,0,1)$, $y=(-1,+1,-1)$ phục vụ nhu cầu "biết bài toán logistic nào có nghiệm".
- **Đầu vào và mục tiêu:** KQ2 (HQ07), mất mát logistic (Bài 01), Định lý Weierstrass và hàm bức (Bài 01); MT2, LLO11 → CLO1. Sản phẩm: nhận dạng dữ liệu tách được, chứng minh không tồn tại cực tiểu, phân loại hai trường hợp.
- **Ký hiệu/dữ kiện truyền tiếp:** $m_i$, $\bar w=(1,0,-2)$, $F(t\bar w)=\log(1+e^{-t})$; KQ4–KQ6. LG02 cung cấp gradient và Hessian dạng ma trận làm công cụ nền.
- **Gộp hoặc rút gọn:** LG03 gộp trực quan và ví dụ: tia $t\bar w$ vừa là hình ảnh vừa là phép tính. Bước hình thức trải trên ba trang vì định nghĩa, định lý và kết quả đối chứng là ba luận điểm. Theo cổng storyboard, LG06 là phát biểu hình thức thứ hai chứ không phải ứng dụng; bước ứng dụng chuyển sang LG10, sau LG06 nên thứ tự sáu bước được giữ.
- **Câu nối học thuật:** đặc trưng $(1,u)$ không tách được, thêm $u^2$ thì tách được (LG01) → dọc tia $t\bar w$, $F$ giảm về $0$ mà không đạt (LG03) → định nghĩa tách được và hệ quả của chế độ nội suy (LG04) → định lý: không có cực tiểu, dãy cực tiểu hóa phân kỳ (LG05) → trường hợp đối chứng có cực tiểu (LG06) → với $\operatorname{rank}X=n$, dữ liệu dẫn nhập và mọi cách gán nhãn năm mẫu VD-A1 ở $d=5$ đều mất cực tiểu (LG10).
- **Thời lượng cụm:** 0,28 tiết LT + 0,13 tiết BT.

### KN5. Chính quy hóa bậc hai và tính lồi mạnh

- **Sáu bước:** nhu cầu LG05 (giới hạn: không có cực tiểu); trực quan LG07; ví dụ LG07; hình thức LG08; ứng dụng LG10; bài tập LG11(c).
- **Đầu vào và mục tiêu:** Hệ quả 01.41 (Bài 01); MT2, LLO11 → CLO1, CLO2. Sản phẩm: chứng nhận $F_\lambda$ lồi mạnh, có nghiệm duy nhất, chặn $\lVert w_\lambda\rVert$.
- **Ký hiệu/dữ kiện truyền tiếp:** $F_\lambda$, $w_\lambda$, $\mu=\lambda$, $\lVert w_\lambda\rVert\le\sqrt{2\log2/\lambda}$; bảng VD-A2b truyền sang CP.
- **Gộp hoặc rút gọn:** LG07 gộp trực quan và ví dụ: đường $F_\lambda(t\bar w)$ có cực tiểu tính được tại $t^*$.
- **Câu nối học thuật:** trên dữ liệu tách được không có cực tiểu (LG05) → hạng phạt làm mục tiêu dọc tia tăng trở lại (LG07) → tính lồi mạnh cho tồn tại, duy nhất và cận chuẩn với mọi dữ liệu (LG08) → áp dụng trên chính ba điểm của LG01 (LG10).
- **Thời lượng cụm:** 0,18 tiết LT + 0,10 tiết BT.

### KN6. Hằng số trơn và số điều kiện của $F_\lambda$

- **Sáu bước:** nhu cầu LG08 (đầu ra $\mu=\lambda$, còn thiếu $L$); trực quan + ví dụ LG09 (độ cong một chiều $F_\lambda''\in(\lambda,\tfrac14+\lambda]$, đặt đầu trang); hình thức LG09 (Mệnh đề 4, đặt sau ví dụ); ứng dụng LG10, CP04; bài tập LG11(c).
- **Đầu vào và mục tiêu:** KN3, cận $S\preceq\tfrac14I$ (LG02); MT2, MT3, LLO11 → CLO1. Sản phẩm: tính $L$, $\kappa$ của $F_\lambda$; đọc ảnh hưởng của $\lambda$ lên $\kappa$.
- **Ký hiệu/dữ kiện truyền tiếp:** $L=\lambda_{\max}(X^TX)/(4n)+\lambda$, $\kappa\le1+\lambda_{\max}/(4n\lambda)$; với $\lVert x_i\rVert\le r$: $\kappa\le1+r^2/(4\lambda)$, $r^2=2$ khi phần đặc trưng ngoài tọa độ hằng có chuẩn $\le1$; $\kappa=1{,}5;6;51;501$ của ví dụ một chiều truyền sang CP02–CP03.
- **Gộp hoặc rút gọn:** LG09 gộp trực quan, ví dụ và hình thức vì chỉ có một luận điểm (hai cận Hessian). Sau cổng storyboard, mặt trang đặt ví dụ một chiều (đồ thị độ cong và bốn giá trị $\kappa$) trước mệnh đề để giữ thứ tự ví dụ → hình thức.
- **Câu nối học thuật:** tính lồi mạnh cho $\mu=\lambda$ (LG08) → $S\preceq\tfrac14I$ cho $L$ (LG09) → $\kappa$ tăng theo $1/\lambda$ (LG09, LG12) → T2b của Bài 05b cho tốc độ $e_k\le(1-1/\kappa)^ke_0$ (CP04).
- **Thời lượng cụm:** 0,15 tiết LT + 0,10 tiết BT.

### KN7. Số bước của hạ gradient và Newton

- **Sáu bước:** nhu cầu CP01; trực quan CP01; ví dụ CP02, CP03; hình thức CP04 (hạ gradient), CP05 (Newton); ứng dụng CP08; bài tập CP10(a).
- **Đầu vào và mục tiêu:** quy tắc cập nhật và hội tụ (Bài 04), T2b (Bài 05b); MT3, LLO15 (Newton) → CLO4, LLO11. Sản phẩm: tính bước Newton, so số bước theo $\kappa$, phát biểu đúng điều kiện của hai cận.
- **Ký hiệu/dữ kiện truyền tiếp:** VD-A3 ($F_\lambda(w)=\log(1+e^{-w})+\frac\lambda2w^2$, $w_0=0$, $\varepsilon=10^{-8}$); cận $\kappa\log(e_0/\varepsilon)$; $\log_2\log_2(\varepsilon_0/\varepsilon)$; $N_{\rm N}$.
- **Gộp hoặc rút gọn:** CP01 gộp nhu cầu và trực quan: hình đường mức của hàm bậc hai minh họa vừa nêu nhu cầu (một bước chung cho mọi hướng) vừa cho trực quan (Newton chia theo độ cong). Bước ví dụ trải trên hai trang: một giá trị $\lambda$ chi tiết, rồi ba giá trị $\lambda$ đối chứng.
- **Câu nối học thuật:** $\kappa$ lớn làm hạ gradient chậm theo hướng phẳng (LG12, CP01) → Newton đạt $10^{-8}$ sau 5 bước so với 71 bước (CP02) → số bước hạ gradient tăng theo $\kappa$ nhưng chậm hơn $\kappa$ ($\times37$ so với $\times83{,}5$), theo sát số điều kiện cục bộ $L/F''_\lambda(w_\lambda)$ ($\times35{,}5$); cận theo $\kappa$ là cận trên; Newton chỉ tăng nhẹ, 4, 5, 7 (CP03) → hai định lý với đầy đủ giả thiết, chỉ giai đoạn bậc hai không chứa $\kappa$ (CP04, CP05).
- **Thời lượng cụm:** 0,25 tiết LT + 0,12 tiết BT.

### KN8. Chi phí một bước và tổng chi phí

- **Sáu bước:** nhu cầu CP05 (ghi chú: mỗi bước Newton cần Hessian và một hệ $d\times d$), CP06 (chuyển từ CP03 sau rà soát 2026-10-12); trực quan CP06; ví dụ CP06; hình thức CP07, CP08; ứng dụng CP08, CP09; bài tập CP10(b, c).
- **Đầu vào và mục tiêu:** đếm phép tính (Bài 00), KN6, KN7; MT3, LLO15 → CLO4. Sản phẩm: đếm chi phí một bước, so tổng chi phí, chọn phương pháp theo $(n,d,\kappa,\varepsilon)$.
- **Ký hiệu/dữ kiện truyền tiếp:** $O(nd)$, $O(nd^2+d^3)$, $O(n^2d+n^3)$ khi $d>n$; ngưỡng hòa vốn khi $\kappa$ cỡ vài trăm ($548$ khi bỏ hằng số) tại $n=10^5$, $d=10^3$; kích thước RCV1 truyền sang KL02; giới hạn (i) truyền sang KL03.
- **Gộp hoặc rút gọn:** CP06 gộp nhu cầu, trực quan và ví dụ: giả mã với số phép tính cụ thể tại $n=10^5$, $d=10^3$. CP08 vừa là hình thức (tổng chi phí) vừa là ứng dụng (ngưỡng hòa vốn).
- **Câu nối học thuật:** Newton cần ít bước nhưng mỗi bước cần Hessian và một hệ tuyến tính (CP05) → giả mã cho số phép tính từng dòng (CP06) → mệnh đề chi phí một bước (CP07) → tổng chi phí và ngưỡng hòa vốn (CP08) → ba quy mô, đến 17,8 GB cho Hessian (CP09) → mọi bước đều có thừa số $n$ (CP11).
- **Thời lượng cụm:** 0,23 tiết LT + 0,13 tiết BT (CP09 nhường $0{,}02$ tiết LT cho KL03 sau cổng storyboard).

### Khái niệm hỗ trợ: dừng sớm

- **Chu trình rút gọn:** nhu cầu + ví dụ + định nghĩa KL01 → kiểm tra KL05(c).
- **Lý do rút gọn:** bài chỉ cần kết luận định tính rằng dừng sớm cho sai số ngoài mẫu nhỏ hơn nghiệm chính xác; lý thuyết (tương đương gần đúng với chính quy hóa bậc hai) thuộc Goodfellow §7.8 và Bài 06. Trên trang chỉ có định nghĩa một dòng (chọn bước có sai số xác thực nhỏ nhất); không có định lý; ghi chú KL01 trích nguồn, phép so sánh định lượng thuộc F05 của Bài 06.
- **Đầu vào và mục tiêu:** KN1 (tập xác thực chọn bước dừng), KN3 ($\kappa=553{,}7$), KN7 (số bước hạ gradient); LLO11 → CLO1.
- **Ký hiệu/dữ kiện truyền tiếp:** bảng dừng sớm VD-A1 ($k=79$, $0{,}001084$; MSE huấn luyện $\le10^{-6}$ từ bước 2701, MSE xác thực $0{,}0480$ tại đó; $F\le10^{-6}$ từ bước 2509); đầu vào B3 của Bài 06.
- **Câu nối học thuật:** cực tiểu chính xác của $F$ không phải đích (MD03, HQ05) và mỗi bước đều tốn $O(nd)$ (CP11) → dừng ở bước 79 cho sai số xác thực nhỏ hơn 45 lần so với giới hạn khi $k\to\infty$ → KL05(c) kiểm tra tập dùng để chọn bước dừng và tập dùng để báo cáo.
- **Thời lượng cụm:** 0,05 tiết LT + 0,03 tiết BT.

## Mục theo từng trang

Mọi trang mang quyết định **thêm**: bài được xây lại theo thiết kế Lecture A của người dùng, không kế thừa trang nào của deck hiện hành. Lý do tồn tại của từng trang dựa trên vai trò trong lập luận, không dựa trên việc trang từng có ở bản cũ.

### MD. Bài toán trung tâm và khung chung

#### MD01 — Không gian đặc trưng nhiều chiều

- **Lý do tồn tại:** định vị bài trong học phần và gắn tên bài với đối tượng mới là sự phụ thuộc vào $d$ và $n$.
- **Nhu cầu/khoảng trống lấp:** người học cần biết bài dùng lại mô hình tuyến tính của Bài 01–02 và hai phương pháp của Bài 04.
- **Đầu vào:** Bài 04 (hạ gradient, Newton).
- **Đầu ra:** chủ đề Bài 05 cho MD02.
- **Vị trí trong khung:** ngoài chuỗi định nghĩa–kết quả; trang định vị.
- **LLO/CLO:** định vị MT1–MT3, không đo trực tiếp.
- **Bước hành trình:** không áp dụng.
- **Quyết định:** thêm; trang tiêu đề bắt buộc theo cấu trúc mặc định của AGENTS.md.

#### MD02 — Mục tiêu học tập

- **Lý do tồn tại:** nêu ba hành vi kiểm tra được mà ba mạch giữa và trang tổng kết KL05 đo lại.
- **Nhu cầu/khoảng trống lấp:** người học cần biết sản phẩm học tập trước khi gặp ví dụ.
- **Đầu vào:** chủ đề từ MD01.
- **Đầu ra:** MT1 (hồi quy nhiều chiều), MT2 (logistic và chính quy hóa), MT3 (chi phí) cho MD03 và KL05.
- **Vị trí trong khung:** ánh xạ chuỗi định nghĩa–kết quả–phương pháp sang ba mục tiêu.
- **LLO/CLO:** LLO11, LLO15 (Newton) → CLO1, CLO2, CLO4.
- **Bước hành trình:** không áp dụng.
- **Quyết định:** thêm; mục tiêu học tập là thành phần bắt buộc (mục 2 cấu trúc mặc định).

#### MD03 — Vấn đề trung tâm

- **Lý do tồn tại:** nêu luận đề xuyên suốt và vấn đề trung tâm ngay ở mở đầu, như người dùng yêu cầu ngày 2026-10-11.
- **Nhu cầu/khoảng trống lấp:** người học đến từ Bài 01–04 với khung "mục tiêu lồi có cực tiểu chính xác"; cần thấy hai lý do khiến khung này phải được kiểm tra lại trước khi đi vào chi tiết.
- **Đầu vào:** khung lồi và hai phương pháp tất định của Bài 01–04.
- **Đầu ra:** vấn đề trung tâm, hai lý do, danh sách ba phần kèm nhu cầu cho HQ, LG, CP (trên mặt trang gọi phần bằng tên, không dùng mã; đầu ra của từng phần nêu trong ghi chú diễn giả, vì bảng ba dòng làm trang vượt khung 16:9).
- **Vị trí trong khung:** vấn đề trung tâm của sườn lý thuyết.
- **LLO/CLO:** LLO11 → CLO1.
- **Bước hành trình:** nhu cầu chung của KN1, KN4, KN7.
- **Quyết định:** thêm; bản đồ nội dung kèm vấn đề trung tâm là thành phần bắt buộc, và luận đề phải được nêu sớm.

#### MD04 — Khung chung và ký hiệu

- **Lý do tồn tại:** đặt ký hiệu chung một lần, kèm ánh xạ với Bài 01, 05b, 05c, trước khi trang đầu tiên của HQ dùng chúng.
- **Nhu cầu/khoảng trống lấp:** các bài liên quan dùng ký hiệu khác nhau ($a_i$, $N$, $x_k$, $\mu$ cho hệ số chính quy hóa; Bài 06 dùng $x$ cho đầu vào thô và tách hệ số chặn); thiếu ánh xạ sẽ gây nhầm ở LG08, CP04 và ở chỗ nối với Bài 06.
- **Đầu vào:** vấn đề trung tâm từ MD03.
- **Đầu ra:** $(u_i,y_i)$, $x_i$, $X$, $w$, $F$, $R$, $F_\lambda$, $L,\mu,\kappa$, $w_k$ cho toàn bài; ánh xạ với Bài 06 ở ghi chú ($u$ ở đây là $x$ của Bài 06; $d$ ở đây bằng số tham số $p=d_{06}+1$ của Bài 06).
- **Vị trí trong khung:** đối tượng, ký hiệu và giả thiết G1–G5.
- **LLO/CLO:** nền cho MT1–MT3.
- **Bước hành trình:** không áp dụng.
- **Quyết định:** thêm; sườn lý thuyết chung phải hiện trước khi dùng (AGENTS.md).

### HQ. Hồi quy nhiều chiều (phiên A1)

#### HQ01 — Dữ liệu và đặc trưng đa thức

- **Lý do tồn tại:** cho dữ liệu cụ thể để câu hỏi "điều gì thay đổi khi $d$ tăng" có số liệu kiểm tra được.
- **Nhu cầu/khoảng trống lấp:** người học cần thấy tăng $d$ là thêm cột vào $X$ trước khi gặp bất kỳ công thức nào.
- **Đầu vào:** mô hình tuyến tính Bài 01; ký hiệu MD04.
- **Đầu ra:** VD-A1 (năm mẫu, bốn điểm ngoài mẫu), $\varphi_d$, $X$ dạng Vandermonde cho HQ02–HQ10.
- **Vị trí trong khung:** đối tượng (dữ liệu, ánh xạ đặc trưng).
- **LLO/CLO:** MT1; LLO11 → CLO1.
- **Bước hành trình:** KN1 nhu cầu + ví dụ dẫn nhập; KN2 nhu cầu.
- **Quyết định:** thêm; nhu cầu và dữ liệu phải đi trước công thức.

#### HQ02 — Phương trình chuẩn

- **Lý do tồn tại:** cung cấp công cụ chung để tính $w$ cho mọi $d$ trong mạch, ở đúng dạng trung bình $\frac1{2n}$ của bài.
- **Nhu cầu/khoảng trống lấp:** Bài 01 dùng $\lVert Xw-y\rVert^2$; hệ số $\frac1{2n}$ không đổi nghiệm nhưng đổi $L$, $\mu$ mà HQ09 cần.
- **Đầu vào:** Mệnh đề 01.6 (Bài 01); VD-A1.
- **Đầu ra:** $\nabla F$, $\nabla^2F=\frac1nX^TX$, nghiệm $d=2$ tính thủ công cho HQ03.
- **Vị trí trong khung:** kết quả KQ1 (phát biểu lại).
- **LLO/CLO:** MT1; LLO11 → CLO1.
- **Bước hành trình:** tiên quyết nhắc lại (Bài 01), không tính vào sáu bước; công cụ chung của KN1 và KN2 (sửa nhãn theo cổng storyboard).
- **Quyết định:** thêm; nhắc lại có tính toán để cả mạch dùng chung một công cụ.

#### HQ03 — Sai số huấn luyện theo số chiều

- **Lý do tồn tại:** cho trực quan "tập mô hình lồng nhau nên sai số huấn luyện không tăng" bằng một bảng số.
- **Nhu cầu/khoảng trống lấp:** người học cần thấy sai số huấn luyện giảm tới $0$ trước khi thấy nó không đo được dự đoán.
- **Đầu vào:** công cụ HQ02, VD-A1.
- **Đầu ra:** bảng MSE huấn luyện $d=1..5$; số $0$ tại $d=5$ cho HQ06; giới hạn "huấn luyện chưa đo dự đoán" cho HQ04.
- **Vị trí trong khung:** chuẩn bị định nghĩa $F$ (đại lượng tối ưu).
- **LLO/CLO:** MT1; LLO11 → CLO1.
- **Bước hành trình:** KN1 trực quan; KN2 nhu cầu.
- **Quyết định:** thêm; bước trực quan của KN1 cần trang riêng trước ví dụ đối chứng.

#### HQ04 — Sai số ngoài mẫu theo số chiều

- **Lý do tồn tại:** đối chứng định lượng: cùng các nghiệm, sai số trên bốn điểm ngoài mẫu (về sau là tập xác thực) tăng 389 lần từ $d=2$ đến $d=5$.
- **Nhu cầu/khoảng trống lấp:** lý do thứ hai của MD03 cần một ví dụ tính được trước định nghĩa hình thức.
- **Đầu vào:** các nghiệm của HQ03; bốn điểm ngoài mẫu.
- **Đầu ra:** bảng hai cột huấn luyện / ngoài mẫu; nhu cầu định nghĩa $R$ và tập xác thực cho HQ05. Tiêu đề dùng "ngoài mẫu" vì thuật ngữ tập xác thực được định nghĩa ở HQ05.
- **Vị trí trong khung:** ví dụ cho cặp định nghĩa $F$, $R$.
- **LLO/CLO:** MT1; LLO11 → CLO1.
- **Bước hành trình:** KN1 ví dụ.
- **Quyết định:** thêm; ví dụ phải đi trước định nghĩa hình thức.

#### HQ05 — Rủi ro thực nghiệm và rủi ro kỳ vọng

- **Lý do tồn tại:** định nghĩa $F$, $R$, tập xác thực và tập kiểm thử; đây là tiêu chí đánh giá dùng đến cuối bài và được Bài 06 dẫn lại.
- **Nhu cầu/khoảng trống lấp:** HQ04 cho thấy cực tiểu $F$ không bảo đảm $R$ nhỏ; người học cần định nghĩa hai đại lượng và quy tắc tách tập chọn khỏi tập báo cáo.
- **Đầu vào:** HQ04; kỳ vọng và trung bình mẫu (Bài 05c).
- **Đầu ra:** $F$, $R$, quá khớp, tập xác thực (chọn $d$, $\lambda$, bước dừng), tập kiểm thử (báo cáo $R$) cho HQ10, LG10, KL01 và Bài 06.
- **Vị trí trong khung:** định nghĩa đầu tiên của chuỗi; lý do thứ hai của luận đề.
- **LLO/CLO:** MT1; LLO11 → CLO1.
- **Bước hành trình:** KN1 hình thức.
- **Quyết định:** thêm; theo điểm hòa giải 5, cả tập xác thực và tập kiểm thử được định nghĩa trên mặt trang.

#### HQ06 — Nội suy khi số chiều bằng kích thước mẫu

- **Lý do tồn tại:** giải thích số $0$ của HQ03 bằng phép đếm phương trình và ẩn, với nghiệm cụ thể.
- **Nhu cầu/khoảng trống lấp:** trước mệnh đề tổng quát, người học cần một trường hợp $d=n$ tính được và kiểm tra được tại các nút.
- **Đầu vào:** số $0$ tại $d=5$ (HQ03); VD-A1.
- **Đầu ra:** $w=X^{-1}y$ cho $d=5$; nhu cầu xét $d>n$ cho HQ07.
- **Vị trí trong khung:** ví dụ cho định nghĩa chế độ nội suy.
- **LLO/CLO:** MT1; LLO11 → CLO1.
- **Bước hành trình:** KN2 trực quan + ví dụ.
- **Quyết định:** thêm; ví dụ cụ thể cần đứng trước mệnh đề HQ07.

#### HQ07 — Chế độ nội suy và tập nghiệm

- **Lý do tồn tại:** phát biểu và chứng minh KQ2, kết quả mới mà LG04 dùng lại.
- **Nhu cầu/khoảng trống lấp:** thiết kế của người dùng đặt chế độ $d\ge n$ vào A1; Bài 01 chỉ có trường hợp $\operatorname{rank}X=d$.
- **Đầu vào:** HQ06; Mệnh đề 01.6 (Bài 01); định lý hạng–số chiều.
- **Đầu ra:** KQ2; $\ker X$, $w_{\rm mn}$; họ nghiệm $d=6$ với sai số ngoài mẫu khác nhau; đầu vào LG04.
- **Vị trí trong khung:** định nghĩa chế độ nội suy và kết quả KQ2.
- **LLO/CLO:** MT1; LLO11 → CLO1.
- **Bước hành trình:** KN2 hình thức + ứng dụng.
- **Quyết định:** thêm; chế độ $d\ge n$ là nội dung mới theo thiết kế của người dùng.

#### HQ08 — Độ nhạy của nghiệm

- **Lý do tồn tại:** tạo nhu cầu đo điều kiện hóa bằng một thí nghiệm tính được và cho trực quan đường mức dẹt, trước khi định nghĩa $\kappa$.
- **Nhu cầu/khoảng trống lấp:** thiết kế của người dùng yêu cầu nêu điều kiện hóa; người học chưa thấy nghiệm bình phương nhỏ nhất nhạy với nhiễu khi $d$ tăng, dù $d\le n$.
- **Đầu vào:** nghiệm $d=2$, $d=5$ (HQ02, HQ06); hướng phẳng khi $d>n$ (HQ07).
- **Đầu ra:** $\lVert\delta w\rVert=0{,}002$ và $0{,}0648$; hình elip gần tròn và elip dẹt; nhu cầu một đại lượng của $X$ đo độ nhạy, cho HQ09.
- **Vị trí trong khung:** chuẩn bị định nghĩa $\kappa(X^TX)$.
- **LLO/CLO:** MT1, MT3; LLO11 → CLO1.
- **Bước hành trình:** KN3 nhu cầu + trực quan.
- **Quyết định:** thêm; tách từ HQ08 của kế hoạch theo cổng storyboard 2026-10-11, vì trên trang gộp nhu cầu (độ nhạy) đứng sau định nghĩa và trang mang ba khối nội dung.

#### HQ09 — Số điều kiện

- **Lý do tồn tại:** định nghĩa $\kappa(X^TX)$, nối nó với $\kappa=L/\mu$ mà CP dùng, và chứng minh nhận xét "$\kappa$ không giảm khi thêm đặc trưng" mà HQ12 cần.
- **Nhu cầu/khoảng trống lấp:** HQ08 đặt nhu cầu đo độ nhạy; người học chưa thấy cùng một số $\kappa$ đo cả độ nhạy lẫn tốc độ hạ gradient, và hệ quả (c) của HQ12 cần căn cứ chung chứ không chỉ một ví dụ.
- **Đầu vào:** HQ08; Hessian $\frac1nX^TX$ (HQ02); VD-A1.
- **Đầu ra:** bảng $\kappa$ theo $d$; $\kappa_F=\kappa(X^TX)$; cận độ nhạy ($0{,}632$; $8{,}39$); nhận xét xen kẽ Cauchy; đầu vào HQ10, HQ12, LG09, CP03–CP04.
- **Vị trí trong khung:** định nghĩa $\kappa(X^TX)$, kết quả KQ3.
- **LLO/CLO:** MT1, MT3; LLO11 → CLO1.
- **Bước hành trình:** KN3 ví dụ + hình thức (bảng số đặt trước định nghĩa).
- **Quyết định:** thêm; tách từ HQ08 của kế hoạch theo cổng storyboard 2026-10-11; thứ tự trên mặt trang giữ ví dụ trước hình thức.

#### HQ10 — Chính quy hóa bậc hai và chọn mô hình

- **Lý do tồn tại:** áp dụng ba kết quả vừa có: ridge sửa tính duy nhất, giảm $\kappa$, và $\lambda$ được chọn bằng tập xác thực.
- **Nhu cầu/khoảng trống lấp:** sau HQ07 và HQ09, người học cần một phép sửa có số liệu và một quy tắc chọn tham số.
- **Đầu vào:** Mệnh đề 02.21 (Bài 02); HQ05 (quy tắc chọn); HQ09 ($\kappa$).
- **Đầu ra:** bảng ridge $d=5$, $d=8$; $\lambda=0{,}01$ chọn theo cột xác thực; câu nối "với phân loại, vấn đề tồn tại xuất hiện trước" cho HQ12.
- **Vị trí trong khung:** quyết định chọn $d$, $\lambda$; kết quả KQ12.
- **LLO/CLO:** MT1; LLO11 → CLO1.
- **Bước hành trình:** KN1 ứng dụng; KN3 ứng dụng.
- **Quyết định:** thêm; bước ứng dụng phải dùng kết quả vừa xây dựng.

#### HQ11 — Câu hỏi về hồi quy nhiều chiều

- **Lý do tồn tại:** đo khả năng tái tạo các kết quả của mạch trên dữ liệu mới và khả năng chọn mô hình đúng quy tắc.
- **Nhu cầu/khoảng trống lấp:** mỗi cụm khái niệm lớn cần một kiểm tra hiểu biết (cấu trúc mặc định mục 5); KN1 cần câu đo đúng sản phẩm của nó (câu d, thêm sau cổng storyboard).
- **Đầu vào:** HQ02, HQ04–HQ05, HQ07, HQ09.
- **Đầu ra:** bằng chứng MT1 (hạng, nội suy, $\kappa$, chọn $d$ bằng tập xác thực và nêu tập báo cáo cuối).
- **Vị trí trong khung:** kiểm tra KQ1, KQ2, KQ3 và định nghĩa tập xác thực, tập kiểm thử.
- **LLO/CLO:** MT1; LLO11 → CLO1.
- **Bước hành trình:** KN1 bài tập (d); KN2 bài tập (a); KN3 bài tập (c); câu (b) luyện công cụ phương trình chuẩn.
- **Quyết định:** thêm; trang kiểm tra của mạch HQ.

#### HQ12 — Ba hệ quả của việc tăng số chiều

- **Lý do tồn tại:** gom đầu ra của phiên A1 thành ba hệ quả có số và nêu giới hạn mở LG.
- **Nhu cầu/khoảng trống lấp:** ranh giới HQ → LG cần một đầu ra rõ; người học cần thấy bình phương nhỏ nhất luôn có nghiệm còn mất mát logistic thì không.
- **Đầu vào:** HQ03–HQ10; nhận xét xen kẽ Cauchy (HQ09) làm căn cứ cho hệ quả (c).
- **Đầu ra:** hệ quả (a) không duy nhất, (b) khoảng cách huấn luyện–xác thực, (c) $\kappa$ không giảm, bằng $\infty$ khi $d>n$; giới hạn "tồn tại" (hình chiếu luôn tồn tại với bình phương nhỏ nhất, không có cấu trúc này với logistic) cho LG01; (c) cho CP.
- **Vị trí trong khung:** đầu ra (a) của giao diện A–B.
- **LLO/CLO:** MT1; LLO11 → CLO1.
- **Bước hành trình:** chuyển KN2 sang KN4.
- **Quyết định:** thêm; mạch cần đầu ra rõ cho mạch sau.

### LG. Hồi quy logistic và chính quy hóa (phiên A2)

#### LG01 — Ba điểm với hai bộ đặc trưng

- **Lý do tồn tại:** nối A1 với A2 bằng một ví dụ: thêm một đặc trưng biến dữ liệu không tách được thành tách được, đúng chế độ nội suy của HQ07.
- **Nhu cầu/khoảng trống lấp:** người học cần thấy câu hỏi "bài toán logistic nào có nghiệm" xuất hiện từ chính việc tăng $d$.
- **Đầu vào:** HQ07, HQ12.
- **Đầu ra:** VD-A2a, $\bar w=(1,0,-2)$; nhu cầu của mạch.
- **Vị trí trong khung:** ví dụ dẫn nhập cho định nghĩa tách được.
- **LLO/CLO:** MT2; LLO11 → CLO1.
- **Bước hành trình:** KN4 nhu cầu + ví dụ dẫn nhập.
- **Quyết định:** thêm; ví dụ dẫn nhập nối hai phiên.

#### LG02 — Mất mát logistic trung bình

- **Lý do tồn tại:** cung cấp gradient và Hessian dạng ma trận, với cận $S_{ii}\le\tfrac14$ mà LG09 cần.
- **Nhu cầu/khoảng trống lấp:** Bài 01 trình bày mất mát logistic dạng tổng và chưa có dạng $\frac1nX^TSX$.
- **Đầu vào:** Định nghĩa 01.8, Mệnh đề 01.9 (Bài 01); VD-A2a.
- **Đầu ra:** $F>0$, $F(0)=\log2$, $\nabla F$, $\nabla^2F=\frac1nX^TSX$ cho LG03, LG09, CP06.
- **Vị trí trong khung:** đối tượng (mất mát logistic) của giả thiết G2.
- **LLO/CLO:** MT2; LLO11 → CLO1.
- **Bước hành trình:** tiên quyết nhắc lại (Bài 01), không tính vào sáu bước; công cụ chung của KN4–KN6 (sửa nhãn theo cổng storyboard).
- **Quyết định:** thêm; nhắc lại có chủ đích vì dạng ma trận là mới.

#### LG03 — Mất mát dọc một tia

- **Lý do tồn tại:** cho trực quan và phép tính của hiện tượng "giảm mãi mà không đạt" trên dữ liệu tách được, kèm đối chứng có cực tiểu.
- **Nhu cầu/khoảng trống lấp:** định lý LG05 cần một trường hợp cụ thể đã tính được trước đó.
- **Đầu vào:** LG01, LG02.
- **Đầu ra:** $F(t\bar w)=\log(1+e^{-t})$; cực tiểu $F^*=\tfrac13\log\tfrac{27}4$ với đặc trưng $(1,u)$; nhu cầu định nghĩa tách được.
- **Vị trí trong khung:** ví dụ cho KQ5 và KQ6.
- **LLO/CLO:** MT2; LLO11 → CLO1.
- **Bước hành trình:** KN4 trực quan + ví dụ.
- **Quyết định:** thêm; ví dụ tính được trước định lý.

#### LG04 — Tách được tuyến tính

- **Lý do tồn tại:** định nghĩa tách được và chứng minh KQ4, cầu nối hình thức giữa chế độ nội suy và mất mát logistic.
- **Nhu cầu/khoảng trống lấp:** LG03 dùng tính tách được mà chưa định nghĩa; người học cần thấy $\operatorname{rank}X=n$ đủ cho mọi cách gán nhãn.
- **Đầu vào:** KQ2 (HQ07); LG03.
- **Đầu ra:** định nghĩa; KQ4; đầu vào của định lý LG05.
- **Vị trí trong khung:** định nghĩa tách được; kết quả KQ4.
- **LLO/CLO:** MT2; LLO11 → CLO1.
- **Bước hành trình:** KN4 hình thức (định nghĩa).
- **Quyết định:** thêm; định nghĩa và định lý là hai luận điểm, cần hai trang. Nhãn trên trang: Mệnh đề 2.

#### LG05 — Định lý không tồn tại cực tiểu

- **Lý do tồn tại:** trả lời trực tiếp câu hỏi trung tâm của phiên A2 bằng một định lý có chứng minh ba bước.
- **Nhu cầu/khoảng trống lấp:** Bài 01 chỉ có trường hợp $d=1$ (VD 01.6); người học cần trường hợp tổng quát và lý do dãy lặp có chuẩn tăng mãi.
- **Đầu vào:** LG04; Định lý Weierstrass (Bài 01).
- **Đầu ra:** KQ5; nhu cầu sửa bài toán cho LG07.
- **Vị trí trong khung:** kết quả trung tâm của mạch LG.
- **LLO/CLO:** MT2; LLO11 → CLO1.
- **Bước hành trình:** KN4 hình thức (định lý); KN5 nhu cầu.
- **Quyết định:** thêm; chứng minh nằm trên trang vì nó là câu trả lời của phiên. Nhãn trên trang: Định lý 1.

#### LG06 — Dữ liệu không tách được

- **Lý do tồn tại:** cho trường hợp đối chứng có điều kiện đủ, để người học phân loại được hai trường hợp.
- **Nhu cầu/khoảng trống lấp:** không có LG06, người học có thể hiểu sai rằng mất mát logistic không bao giờ có cực tiểu.
- **Đầu vào:** LG05; ĐL 01.38 về hàm bức (Bài 01); cực tiểu đã tính ở LG03.
- **Đầu ra:** KQ6; nhận xét: sự tồn tại do dữ liệu quyết định, không kiểm soát được khi $d$ lớn.
- **Vị trí trong khung:** kết quả KQ6; giới hạn áp dụng của KQ5.
- **LLO/CLO:** MT2; LLO11 → CLO1.
- **Bước hành trình:** KN4 hình thức (kết quả thứ hai, đối chứng với Định lý 1). Theo cổng storyboard, bước ứng dụng của KN4 chuyển sang LG10.
- **Quyết định:** thêm; cần trường hợp đối chứng có điều kiện đủ cụ thể. Nhãn trên trang: Mệnh đề 3.

#### LG07 — Hạng phạt dọc một tia

- **Lý do tồn tại:** cho trực quan của phép sửa trên đúng tia đã dùng ở LG03.
- **Nhu cầu/khoảng trống lấp:** trước định lý lồi mạnh, người học cần thấy hạng phạt làm mục tiêu tăng trở lại và tạo cực tiểu hữu hạn.
- **Đầu vào:** LG03, LG05.
- **Đầu ra:** $F_\lambda(t\bar w)$, $t^*=2{,}128$ và $0{,}6748$; nhu cầu phát biểu tổng quát cho LG08.
- **Vị trí trong khung:** ví dụ cho định nghĩa $F_\lambda$.
- **LLO/CLO:** MT2; LLO11 → CLO1; CLO2.
- **Bước hành trình:** KN5 nhu cầu + trực quan + ví dụ.
- **Quyết định:** thêm; trực quan và ví dụ phải đi trước định lý.

#### LG08 — Chính quy hóa bậc hai và tính lồi mạnh

- **Lý do tồn tại:** phát biểu KQ7a: $F_\lambda$ lồi mạnh, có nghiệm duy nhất với mọi dữ liệu, kèm cận chuẩn mới.
- **Nhu cầu/khoảng trống lấp:** người học cần kết luận áp dụng cho mọi dữ liệu, không chỉ dọc một tia.
- **Đầu vào:** Hệ quả 01.41 (Bài 01); LG07.
- **Đầu ra:** $F_\lambda$, $w_\lambda$, $\mu=\lambda$, $\lVert w_\lambda\rVert\le\sqrt{2\log2/\lambda}$; bảng VD-A2b cho LG09 và CP.
- **Vị trí trong khung:** định nghĩa $F_\lambda$; kết quả KQ7a.
- **LLO/CLO:** MT2; LLO11 → CLO1; CLO2.
- **Bước hành trình:** KN5 hình thức; KN6 nhu cầu.
- **Quyết định:** thêm; phát biểu lại kết quả Bài 01 ở dạng trung bình và bổ sung cận chuẩn. Nhãn trên trang: Định lý 2; dữ liệu của bảng kiểm tra (một mẫu $x_1=1$, $y_1=+1$) nêu lại ngay trên trang.

#### LG09 — Hằng số trơn và số điều kiện của $F_\lambda$

- **Lý do tồn tại:** chứng minh KQ7b, mảnh còn thiếu để áp dụng định lý hội tụ của Bài 05b và để CP đếm số bước.
- **Nhu cầu/khoảng trống lấp:** LG08 cho $\mu$ nhưng chưa cho $L$; giao diện A2 → A3 cần $\kappa$ của $F_\lambda$.
- **Đầu vào:** $S\preceq\tfrac14I$ (LG02); $\kappa$ (HQ09); $\mu=\lambda$ (LG08).
- **Đầu ra:** $L$, $\kappa\le1+\lambda_{\max}(X^TX)/(4n\lambda)$; với $\lVert x_i\rVert\le r$: $L\le r^2/4+\lambda$, $\kappa\le1+r^2/(4\lambda)$, $r\ge1$ vì có tọa độ hằng; $\kappa=1{,}5;6;51;501$ cho CP02–CP03; $r^2=2$ cho CP08 và LG11(c).
- **Vị trí trong khung:** định nghĩa $L,\mu,\kappa$ của $F_\lambda$; kết quả KQ7b.
- **LLO/CLO:** MT2, MT3; LLO11 → CLO1.
- **Bước hành trình:** KN6 trực quan + ví dụ (độ cong một chiều, đầu trang) + hình thức (Mệnh đề 4); nhu cầu nhận từ LG08.
- **Quyết định:** thêm; ba bước gộp một trang vì cùng một luận điểm (hai cận Hessian). Sau cổng storyboard: ví dụ đặt trước mệnh đề; giả thiết $\lVert x_i\rVert\le1$ (mâu thuẫn với tọa độ hằng $1$) thay bằng $\lVert x_i\rVert\le r$.

#### LG10 — Ví dụ ba điểm có chính quy hóa

- **Lý do tồn tại:** áp dụng Định lý 1 (khi $\lambda=0$) và LG08–LG09 (khi $\lambda>0$) vào chính ví dụ dẫn nhập LG01, khép vòng của mạch.
- **Nhu cầu/khoảng trống lấp:** người học cần thấy nghiệm hữu hạn, xác suất dự đoán không còn tiến về $0$ hoặc $1$, và một cận tốc độ tính được trên dữ liệu đã biết.
- **Đầu vào:** VD-A2a; LG08, LG09.
- **Đầu ra:** kết luận không có cực tiểu khi $\lambda=0$ cho dữ liệu dẫn nhập và cho mọi cách gán nhãn năm mẫu VD-A1 ở $d=5$; $w_\lambda$, $P(y=+1\mid u)$, $L$, $\kappa$ cho $\lambda=0{,}1$ và $0{,}01$; quy tắc chọn $\lambda$ theo tập xác thực (HQ05).
- **Vị trí trong khung:** ứng dụng KQ7a, KQ7b.
- **LLO/CLO:** MT2; LLO11 → CLO1; CLO2.
- **Bước hành trình:** KN4 ứng dụng (dòng $\lambda=0$, chuyển từ LG06 theo cổng storyboard); KN5 ứng dụng; KN6 ứng dụng.
- **Quyết định:** thêm; bước ứng dụng phải dùng kết quả vừa xây dựng. Trang có nguy cơ dày (R8): nếu vượt khung 16:9, chuyển dòng $X^TX$ xuống ghi chú.

#### LG11 — Câu hỏi về tách được và chính quy hóa

- **Lý do tồn tại:** đo khả năng nhận dạng dữ liệu tách được, kết luận về tồn tại cực tiểu và tính hằng số của $F_\lambda$.
- **Nhu cầu/khoảng trống lấp:** kiểm tra hiểu biết sau cụm khái niệm lớn; câu (a) cũng cho thấy $\operatorname{rank}X=n$ không cần cho tách được.
- **Đầu vào:** LG04–LG10.
- **Đầu ra:** bằng chứng MT2.
- **Vị trí trong khung:** kiểm tra KQ4–KQ7.
- **LLO/CLO:** MT2; LLO11 → CLO1; CLO2.
- **Bước hành trình:** KN4, KN5, KN6 bài tập.
- **Quyết định:** thêm; trang kiểm tra của mạch LG.

#### LG12 — Hệ số chính quy hóa và số điều kiện

- **Lý do tồn tại:** gom đầu ra của phiên A2 và nêu giới hạn mở CP: nghiệm gần bài toán gốc hơn thì $\kappa$ lớn hơn.
- **Nhu cầu/khoảng trống lấp:** ranh giới LG → CP cần chuyển câu hỏi từ "có nghiệm không" sang "tính nghiệm tốn bao nhiêu".
- **Đầu vào:** LG08–LG10, bảng VD-A2b.
- **Đầu ra:** $\sigma(w_\lambda)$: $0{,}663\to0{,}997$; $\kappa$: $1{,}5\to501$; nhu cầu so sánh phương pháp cho CP01.
- **Vị trí trong khung:** đầu ra (b) của giao diện A–B.
- **LLO/CLO:** MT2, MT3; LLO11 → CLO1.
- **Bước hành trình:** chuyển KN6 sang KN7.
- **Quyết định:** thêm; mạch cần đầu ra rõ cho mạch sau. Tiêu đề đổi theo cổng storyboard; đặc tả ghi chú thay siêu dữ liệu quy trình bằng nội dung (độ gần bài toán gốc và $\kappa$ kéo ngược nhau).

### CP. Độ cong và chi phí tính toán (phiên A3)

#### CP01 — Hai quy tắc cập nhật

- **Lý do tồn tại:** đặt hai quy tắc cập nhật cạnh nhau trên một hình, để thấy điểm khác nhau là cách dùng độ cong.
- **Nhu cầu/khoảng trống lấp:** LG12 cho thấy $\kappa$ lớn; người học cần thấy vì sao một bước chung cho mọi hướng chậm và Newton sửa điều đó.
- **Đầu vào:** quy tắc cập nhật Bài 04; LG12.
- **Đầu ra:** hai quy tắc; hình 12 bước hạ gradient và một bước Newton; nhu cầu so số bước trên $F_\lambda$.
- **Vị trí trong khung:** phương pháp (hạ gradient, Newton).
- **LLO/CLO:** MT3; LLO15 (Newton) → CLO4; LLO11.
- **Bước hành trình:** KN7 nhu cầu + trực quan.
- **Quyết định:** thêm; nhu cầu của mạch cần một hình trực quan trước bảng số.

#### CP02 — Hai phương pháp trên ví dụ một chiều

- **Lý do tồn tại:** cho phép tính cụ thể của hai phương pháp trên $F_\lambda$ đã biết, gồm một bước Newton tính thủ công.
- **Nhu cầu/khoảng trống lấp:** trên hàm không bậc hai Newton không còn đúng sau một bước; người học cần thấy giai đoạn tắt dần và giai đoạn bậc hai trên số liệu.
- **Đầu vào:** VD-A2b, $\kappa=51$ (LG09).
- **Đầu ra:** bảng $k=0..5$; 5 bước Newton so với 71 bước hạ gradient; ghi chú: quay lui nhận bước đầy đủ ở mọi bước, nên bảng khớp với giả thiết của định lý CP05.
- **Vị trí trong khung:** ví dụ cho KQ8, KQ9.
- **LLO/CLO:** MT3; LLO15 → CLO4.
- **Bước hành trình:** KN7 ví dụ.
- **Quyết định:** thêm; ví dụ trước định lý.

#### CP03 — Số bước theo số điều kiện

- **Lý do tồn tại:** đối chứng theo $\kappa$: ba giá trị $\lambda$ cho thấy số bước hạ gradient tăng theo $\kappa$ nhưng chậm hơn $\kappa$ ($\times37$ so với $\times83{,}5$), theo sát số điều kiện cục bộ $L/F''_\lambda(w_\lambda)$ ($\times35{,}5$); Newton chỉ tăng nhẹ (4, 5, 7); cận theo $\kappa$ là cận trên, bi quan 9–20 lần.
- **Nhu cầu/khoảng trống lấp:** một giá trị $\lambda$ chưa tách được ảnh hưởng của $\kappa$; người học cần biết cận số bước lớn hơn số bước thực 9–20 lần.
- **Đầu vào:** CP02; bảng $\kappa$ của LG09.
- **Đầu ra:** bảng ba dòng; tỉ số $L/F''_\lambda(w_\lambda)$; nhu cầu hai phát biểu hình thức.
- **Vị trí trong khung:** ví dụ đối chứng cho KQ8, KQ9; giới hạn "cận là cận trên".
- **LLO/CLO:** MT3; LLO15 → CLO4; LLO11.
- **Bước hành trình:** KN7 ví dụ (đối chứng). Nhu cầu của KN8 đặt ở CP05 (sửa sau rà soát 2026-10-12).
- **Quyết định:** thêm; đối chứng theo $\kappa$ cần trang riêng. Điểm trung tâm sửa theo cổng storyboard (bỏ "gần tỉ lệ với $\kappa$").

#### CP04 — Số bước của hạ gradient

- **Lý do tồn tại:** phát biểu lại T2b của Bài 05b với đầy đủ giả thiết và áp dụng cho $F_\lambda$.
- **Nhu cầu/khoảng trống lấp:** bảng CP03 cần cận có điều kiện; người học cần biết kết quả nào được dùng lại và ánh xạ $x_k\mapsto w_k$.
- **Đầu vào:** T2b (Bài 05b); LG09.
- **Đầu ra:** $e_k\le(1-1/\kappa)^ke_0$, điều kiện $k\ge\kappa\log(e_0/\varepsilon)$ cho CP08.
- **Vị trí trong khung:** kết quả KQ8.
- **LLO/CLO:** MT3; LLO11 → CLO1.
- **Bước hành trình:** KN7 hình thức (hạ gradient); KN6 ứng dụng.
- **Quyết định:** thêm; nêu rõ kết quả nào được dùng lại, không chứng minh lại.

#### CP05 — Hội tụ bậc hai của Newton

- **Lý do tồn tại:** phát biểu lại định lý hai giai đoạn của Newton với giả thiết, và nói chính xác phần nào không chứa $\kappa$.
- **Nhu cầu/khoảng trống lấp:** tránh phát biểu sai "Newton không phụ thuộc $\kappa$" (rủi ro R1, điểm hòa giải 2).
- **Đầu vào:** Bài 04 (hội tụ bậc hai); Boyd §9.5.3.
- **Đầu ra:** cận $\frac{f(x_0)-f^*}{\gamma}+\log_2\log_2\frac{\varepsilon_0}\varepsilon$; tính bất biến affine; câu nối "ít bước nhưng mỗi bước đắt" cho CP06.
- **Vị trí trong khung:** kết quả KQ9.
- **LLO/CLO:** MT3; LLO15 → CLO4.
- **Bước hành trình:** KN7 hình thức (Newton); KN8 nhu cầu (mỗi bước cần Hessian và một hệ $d\times d$; chuyển từ CP03 sau rà soát 2026-10-12).
- **Quyết định:** thêm; phát biểu có điều kiện cần trang riêng để không vượt khung.

#### CP06 — Các phép tính trong một bước

- **Lý do tồn tại:** cho giả mã có số phép tính từng dòng, để chi phí một bước được đếm chứ không được khẳng định.
- **Nhu cầu/khoảng trống lấp:** thuật toán cần giả mã, tiêu chuẩn dừng và chi phí chính (AGENTS.md); người học chưa đếm chi phí lập $X^TSX$ và giải hệ $d\times d$.
- **Đầu vào:** CP05; $\nabla F$, $\nabla^2F$ (LG02).
- **Đầu ra:** số phép tính tại $n=10^5$, $d=10^3$; tiêu chuẩn dừng; số liệu cho CP07.
- **Vị trí trong khung:** phương pháp (giả mã hai thuật toán).
- **LLO/CLO:** MT3; LLO15 → CLO4.
- **Bước hành trình:** KN8 nhu cầu + trực quan + ví dụ.
- **Quyết định:** thêm; giả mã với số cụ thể là bước trực quan và ví dụ của KN8.

#### CP07 — Chi phí một bước

- **Lý do tồn tại:** phát biểu KQ10, đầu ra (c) của giao diện A–B.
- **Nhu cầu/khoảng trống lấp:** CP06 tính trên một cặp $(n,d)$; người học cần dạng tổng quát và các trường hợp $d>n$, dữ liệu thưa.
- **Đầu vào:** CP06.
- **Đầu ra:** $O(nd)$, $O(nd^2+d^3)$, bộ nhớ thêm $O(n+d)$ và $O(d^2+n)$; Nhận xét $d>n$: $O(n^2d+n^3)$; tỉ số $d+d^2/n$; thừa số $n$ chung cho CP08, CP11.
- **Vị trí trong khung:** kết quả KQ10.
- **LLO/CLO:** MT3; LLO15 → CLO4.
- **Bước hành trình:** KN8 hình thức.
- **Quyết định:** thêm; phát biểu chi phí là đầu ra bắt buộc của giao diện.

#### CP08 — Tổng chi phí và ngưỡng hòa vốn

- **Lý do tồn tại:** ghép số bước (CP04, CP05) với chi phí một bước (CP07) thành tiêu chí chọn phương pháp.
- **Nhu cầu/khoảng trống lấp:** MT3 yêu cầu chọn phương pháp theo $(n,d,\kappa,\varepsilon)$; người học cần một ngưỡng tính được và lời cảnh báo về cận bi quan.
- **Đầu vào:** CP04, CP05, CP07; CP03 (độ bi quan của cận).
- **Đầu ra:** ngưỡng hòa vốn khi $\kappa$ cỡ vài trăm ($548$ khi bỏ hằng số, $137$ khi tính hằng số); ảnh hưởng của $\lambda$ lên tổng chi phí với $r^2=2$ ($\kappa\le501$ và $50\,001$; cận hạ gradient $\approx9{,}2\cdot10^{11}$ và $9{,}2\cdot10^{13}$).
- **Vị trí trong khung:** phương pháp và quyết định chọn phương pháp.
- **LLO/CLO:** MT3; LLO15 → CLO4.
- **Bước hành trình:** KN8 hình thức (tổng chi phí) + ứng dụng; KN7 ứng dụng.
- **Quyết định:** thêm; ứng dụng phải dùng các kết quả vừa xây dựng.

#### CP09 — Chi phí theo ba quy mô

- **Lý do tồn tại:** đưa chi phí về các quy mô cụ thể, đến kích thước RCV1, để thấy Hessian dày không còn khả thi.
- **Nhu cầu/khoảng trống lấp:** câu hỏi của phiên A3 về chi phí của bước nhanh hơn cần câu trả lời định lượng ở quy mô thật.
- **Đầu vào:** CP07, CP08.
- **Đầu ra:** bảng ba quy mô; 17,8 GB cho Hessian; dòng RCV1 cho KL02.
- **Vị trí trong khung:** ứng dụng KQ10; giới hạn áp dụng của Newton thuần.
- **LLO/CLO:** MT3; LLO15 → CLO4.
- **Bước hành trình:** KN8 ứng dụng.
- **Quyết định:** thêm; ứng dụng ở quy mô thật cần trang riêng. Thời lượng giảm từ $0{,}06$ xuống $0{,}04$ tiết để KL03 có $0{,}05$ tiết.

#### CP10 — Câu hỏi về chi phí và số bước

- **Lý do tồn tại:** đo khả năng tính bước Newton, so tổng chi phí và xử lý trường hợp $d>n$.
- **Nhu cầu/khoảng trống lấp:** kiểm tra hiểu biết sau cụm khái niệm lớn.
- **Đầu vào:** CP02–CP09.
- **Đầu ra:** bằng chứng MT3.
- **Vị trí trong khung:** kiểm tra KQ8–KQ10.
- **LLO/CLO:** MT3; LLO15 → CLO4.
- **Bước hành trình:** KN7, KN8 bài tập.
- **Quyết định:** thêm; trang kiểm tra của mạch CP.

#### CP11 — Thừa số $n$ trong mọi bước

- **Lý do tồn tại:** gom đầu ra của phiên A3 thành giới hạn (i): mọi phương pháp của bài trả chi phí tỉ lệ với $n$ ở mỗi bước.
- **Nhu cầu/khoảng trống lấp:** ranh giới CP → KL cần một giới hạn rõ mà Bài 06 (B3) dùng làm điểm xuất phát.
- **Đầu vào:** CP04, CP05, CP07.
- **Đầu ra:** giới hạn (i), kèm số RCV1 ($3{,}7\cdot10^{10}$ phép nhân–cộng cho một gradient đầy đủ; $nd^2+d^3\approx1{,}8\cdot10^{15}$ và 17,8 GB cho một bước Newton dày), cho KL01; KL03(i) dẫn lại, không phát biểu lại.
- **Vị trí trong khung:** đầu ra (c) của giao diện A–B; lý do thứ nhất của luận đề.
- **LLO/CLO:** MT3; LLO15 → CLO4; LLO11.
- **Bước hành trình:** KN8, trang kết của cụm.
- **Quyết định:** thêm; mạch cần đầu ra rõ cho mạch kết luận. Đặc tả ghi chú thay siêu dữ liệu quy trình bằng nội dung (tổng chi phí là tích hai thừa số; một lượt dữ liệu là đơn vị chi phí nhỏ nhất của mỗi lần cập nhật).

### KL. Giới hạn của tối ưu tất định

#### KL01 — Nghiệm chính xác và nghiệm dừng sớm

- **Lý do tồn tại:** cho bằng chứng định lượng của lý do thứ hai trên chính dữ liệu A1 và định nghĩa dừng sớm: dừng ở bước 79 cho sai số xác thực nhỏ hơn 45 lần so với giới hạn khi $k\to\infty$, trong khi MSE huấn luyện $\le10^{-6}$ chỉ đạt từ bước 2701; dừng ở bước 79 tốn ít hơn khoảng 34 lần số lượt qua dữ liệu.
- **Nhu cầu/khoảng trống lấp:** luận đề yêu cầu dừng sớm được trình bày là thành phần của phương pháp, không phải thất bại của nó.
- **Đầu vào:** VD-A1, $\kappa=553{,}7$ (HQ09), T2b (CP04), quy tắc tập xác thực (HQ05).
- **Đầu ra:** bảng dừng sớm; kết luận dùng cả ba phiên cho KL02, KL04. Trang chỉ nêu quan sát số trên dữ liệu A1 và gọi tên Goodfellow §7.8 trong ghi chú; phép so sánh định lượng về độ co của nghiệm thuộc F05 của Bài 06 (phân công nguồn chung, quyết định của điều phối viên 2026-10-11).
- **Vị trí trong khung:** quyết định "dừng sớm" của chuỗi; lý do thứ hai của luận đề.
- **LLO/CLO:** LLO11 → CLO1.
- **Bước hành trình:** khái niệm hỗ trợ "dừng sớm", nhu cầu + ví dụ + định nghĩa.
- **Quyết định:** thêm; luận đề yêu cầu dừng sớm là thành phần của phương pháp. Thêm dòng định nghĩa và gọi bốn điểm là tập xác thực theo cổng storyboard.

#### KL02 — Số liệu trên tập RCV1

- **Lý do tồn tại:** cho bằng chứng có nguồn cho cả hai lý do của MD03 ở quy mô thật: SGD được dùng vì chi phí mỗi bước không phụ thuộc $n$, và đạt cùng mức lỗi kiểm thử.
- **Nhu cầu/khoảng trống lấp:** ví dụ năm điểm chỉ minh họa định tính; người học cần một thí nghiệm công bố cho thấy chi phí theo $n$ quyết định thời gian và chênh lệch mục tiêu nhỏ không đổi lỗi kiểm thử.
- **Đầu vào:** dòng RCV1 của CP09; SNW Bảng 13.3.
- **Đầu ra:** ba dòng TRON / SGD (các hàng mất mát logistic của SNW Bảng 13.3); hai quan sát cho KL03, KL04; đầu vào của E02 trong Bài 06, nơi trình bày các hàng mất mát hinge và dẫn lại KL02 (phân công nguồn chung, quyết định của điều phối viên 2026-10-11).
- **Vị trí trong khung:** kiểm chứng giới hạn áp dụng của phương pháp tất định.
- **LLO/CLO:** LLO11 → CLO1; CLO4.
- **Bước hành trình:** khái niệm hỗ trợ.
- **Quyết định:** thêm; bằng chứng có nguồn cho luận đề (ứng viên gộp vào ghi chú KL01 nếu quá tải, R7). Thời lượng giảm từ $0{,}02$ xuống $0{,}01$ tiết để KL03 có $0{,}05$ tiết.

#### KL03 — Giới hạn của mô hình tuyến tính và phương pháp tất định

- **Lý do tồn tại:** phát biểu hai giới hạn mà giao diện A–B chuyển sang Bài 06: (i) chi phí theo $n$, (ii) XOR không biểu diễn được bằng dự đoán tuyến tính.
- **Nhu cầu/khoảng trống lấp:** Bài 06 mở từ hai giới hạn này; XOR cần đúng bốn điểm và nhãn như B01 của Bài 06 (điểm hòa giải 4).
- **Đầu vào:** CP11 (dẫn lại cho dòng (i)); LG01 (dạng một chiều của XOR); HQ12 (hệ quả của $d$ lớn).
- **Đầu ra:** giới hạn (i) cho B3, giới hạn (ii) cho B1–B2 của Bài 06 (KL03 chứng minh bằng đẳng thức tổng; Bài 06 nhắc lại và dùng); số đơn thức $\binom{r+q}q$; dòng (i) chốt luận đề: $n$ lớn với ngân sách cố định buộc thay gradient đầy đủ bằng SGD.
- **Vị trí trong khung:** giới hạn áp dụng của khung (mô hình tuyến tính, phương pháp tất định).
- **LLO/CLO:** LLO11 → CLO1; CLO4.
- **Bước hành trình:** nhu cầu mở cho Bài 06.
- **Quyết định:** thêm; giao diện A–B bắt buộc. Theo cổng storyboard: đổi tiêu đề, rút dòng (i) thành một dòng dẫn CP11, rút XOR về phát biểu và đẳng thức, tăng thời lượng lên $0{,}05$ tiết.

#### KL04 — Điều không còn giữ được và điều còn giữ được

- **Lý do tồn tại:** phát biểu luận đề ở dạng mà người dùng yêu cầu cho kết luận A và mở đầu B: điều không còn giữ được và điều còn giữ được.
- **Nhu cầu/khoảng trống lấp:** người học cần thấy SGD được buộc bởi chi phí và đủ cho mục tiêu thay thế, không chỉ "nhanh hơn".
- **Đầu vào:** MD03; KL01–KL03.
- **Đầu ra:** bảng hai cột, cột "còn giữ được" gồm tính giảm mỗi bước của hạ gradient dùng gradient đầy đủ (bổ đề giảm), bất đẳng thức một bước có số hạng nhiễu của SGD; với $F_\lambda$ lồi mạnh, bước hằng tới lân cận cỡ $\eta\tau^2/\mu$ (T5), bước giảm dần tới cực tiểu (T6); điểm dừng xấp xỉ (T7, T8, có mức nhiễu nền); ước lượng không chệch của gradient (Bài 05c); cho B3 của Bài 06. Không viết SGD giảm $F$ theo kỳ vọng ở mỗi bước.
- **Vị trí trong khung:** tổng hợp chuỗi và giới hạn áp dụng thành luận đề.
- **LLO/CLO:** LLO11 → CLO1.
- **Bước hành trình:** tổng hợp.
- **Quyết định:** thêm; luận đề yêu cầu bảng này ở kết luận. Cột "còn giữ được" bổ sung theo cổng storyboard Bài 05 và chính xác hóa theo cổng storyboard Bài 06.

#### KL05 — Tổng kết, bài tập và tài liệu đọc

- **Lý do tồn tại:** tổng kết theo MT1–MT3 và kiểm tra chuyển giao trên một tình huống $d>n$ ghép cả ba phiên và dừng sớm.
- **Nhu cầu/khoảng trống lấp:** cấu trúc mặc định yêu cầu tổng kết theo mục tiêu, câu hỏi tự kiểm tra, bài tập và tài liệu đọc; khái niệm dừng sớm cần một kiểm tra.
- **Đầu vào:** MD02; đầu ra của HQ, LG, CP, KL01–KL04.
- **Đầu ra:** bằng chứng MT1–MT3; danh sách bài tập; tài liệu đọc dẫn sang Bài 05b, 05c, 06.
- **Vị trí trong khung:** khép vấn đề trung tâm.
- **LLO/CLO:** MT1–MT3; LLO11, LLO15 → CLO1, CLO2, CLO4.
- **Bước hành trình:** bài tập tổng hợp; kiểm tra của khái niệm dừng sớm (câu c, thêm sau cổng storyboard) và của KN1.
- **Quyết định:** thêm; cấu trúc mặc định mục 6 của AGENTS.md.

## Thay đổi so với deck hiện hành

Bài được xây lại theo thiết kế của người dùng, không theo cấu trúc của deck Bài 05 cũ (từ ngày 2026-10-12 là Bài 06b, `lecture-06b-toi-uu-bac-nhat-cho-hoc-may.html`; 37 trang, các phần A–E về SGD, momentum, Nesterov và khởi tạo). Không trang nào được giữ; các nội dung momentum, Nesterov và khởi tạo được đề xuất chuyển sang bài bổ trợ "06b" (dàn bài, mục Nội dung đề cương không còn; quyết định D2 của người dùng). Số trang tăng từ 37 lên 44 (43 theo kế hoạch đã duyệt, cộng một trang do tách HQ08 sau cổng storyboard) vì bài mới có ba phiên, mỗi phiên một cụm hai đến ba khái niệm với trang kiểm tra riêng, cộng mạch kết luận năm trang mang luận đề.
