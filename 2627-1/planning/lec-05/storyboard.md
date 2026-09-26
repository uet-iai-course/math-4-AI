# Storyboard Bài 05 — Các phương pháp tối ưu trong huấn luyện mô hình học sâu

Bản mới ngày 2026-09-25, cập nhật triển khai ngày 2026-09-26. Bản RevealJS hiện có 37 trang, 5 phần ngoài; đã qua cổng storyboard, năm vai rà và tái kiểm độc lập; kiểm định cuối đạt. [Dàn bài](outline.md) chứa nguồn, công thức, dữ kiện, đáp án và thời lượng từng trang; [nhật ký](review-log.md) ghi trạng thái kiểm định. Không sử dụng nội dung dàn bài trước.

Quy ước thuật ngữ: lý thuyết (LT), bài tập (BT), chuẩn đầu ra bài học (LLO), chuẩn đầu ra học phần (CLO), phương pháp hạ gradient (GD), phương pháp hạ gradient ngẫu nhiên (SGD), phương pháp gradient gia tốc Nesterov (NAG), hàm tuyến tính chỉnh lưu (ReLU).

Quy ước ký hiệu: $\theta_t$ là vectơ ở vòng lặp $t$; $[\theta]_i$ là tọa độ thứ $i$, $\theta_{t,i}=[\theta_t]_i$.

## Vấn đề trung tâm và các kết nối lớn

Thiết lập quy trình huấn luyện từ dữ liệu hữu hạn, giải thích cách lấy gradient, cập nhật tham số và khởi tạo; phân biệt giảm mất mát huấn luyện với dự đoán tốt. Năm phần đều có đầu vào, đầu ra và kiểm tra riêng:

| Phần | Nhận từ trước | Chức năng riêng | Đầu ra được phần sau dùng | LT + BT |
|---|---|---|---|---|
| A — Bài toán huấn luyện và tiêu chí đánh giá | Gradient, tối ưu không ràng buộc ở Bài 04 | Đặt bài toán và tiêu chí; giới hạn diễn giải điểm dừng | $D,f_\theta,\ell,J,R$; nhiệm vụ tính gradient của $J$ | 0.35 + 0.10 giờ |
| B — Ước lượng gradient và phương pháp SGD | Mục tiêu dạng trung bình | Thay tính đủ bằng lấy mẫu có kỳ vọng xác định | $\widehat g_t$, bước học, quy trình theo dõi; nhiễu còn lại | 0.40 + 0.25 giờ |
| C — Phương pháp momentum và Nesterov | Gradient từ B, Taylor/đường mức từ Bài 04 | Giải thích cách lịch sử và điểm đo thay cập nhật | Trạng thái $v_t$, điểm dự báo, quy trình còn cần $\theta_0$ | 0.50 + 0.25 giờ |
| D — Khởi tạo tham số mạng nơ ron | Nhu cầu một điểm đầu phù hợp cho B/C | Xây mạng/dây chuyền, giải thích đối xứng và thang | Cách tạo $\theta_0$ và kiểm tín hiệu/gradient | 0.60 + 0.25 giờ |
| E — Tổng hợp các phương pháp tối ưu | Toàn bộ đầu ra A–D | Phối hợp và kiểm tra chuyển giao; trả lại bài toán mở đầu | Một thiết lập huấn luyện có cơ chế và giới hạn | 0.15 + 0.15 giờ |

Tổng 2 giờ LT + 1 giờ BT; không có dữ kiện để quy đổi ra phút. BT được phân bổ vào A07/B08/C08/D11/E02. Bản trình chiếu hiện tại là một tuyến liên tục; mã và phân bổ nội bộ không được đưa lên mặt trang chiếu hoặc ghi chú diễn giả. Không tách thực hành riêng vì các thao tác cục bộ đã có trong từng phần, sản phẩm phối hợp thuộc E.

## Ba bệ đỡ và bằng chứng sử dụng lại

1. **Trung bình trên dữ liệu:** A03/A04 định nghĩa mất mát và $J$ → B01 đạo hàm qua tổng → B02 gradient mẫu → B03 kỳ vọng/phương sai → B04–B08 cập nhật và chọn tham số. C04/C07 giữ nguyên cách lấy nhóm và thay cách dùng gradient.
2. **Mô hình cục bộ:** C01 gọi lại hàm bậc hai của Bài 04 → C02 dùng Hessian/Taylor giải thích hai hệ số co → C03–C05 giữ đường mức, thêm trạng thái → C06–C08 giữ trạng thái, đổi nơi lấy gradient. Không lấy thang Hessian của ví dụ làm giả thiết toàn mạng.
3. **Hợp phép biến đổi:** D01 dựng mạng → D02 đạo hàm trên chính mạng → D03/D04 dùng các đạo hàm để kiểm đối xứng → D05 dùng lại phép nhân dây chuyền → D07/D08 đổi rõ sang mô hình tuyến tính ngẫu nhiên → D09/D10 chọn và kiểm thang → D11 kiểm giới hạn.

Đây là tổng hợp sư phạm dựa trên cách DL và Boyd giữ đối tượng toán, không phải tên một cấu trúc do các tác giả đặt. Boyd cung cấp mẫu tái dùng công cụ/ví dụ; DL cung cấp các cơ chế SGD, momentum, Nesterov, khởi tạo. Không đưa đối ngẫu hoặc Newton thành nội dung mới của Bài 05.

## Bản đồ hành trình khái niệm

Các bước trên một trang được thực hiện theo thứ tự nêu trong dàn bài. Ví dụ dẫn nhập trước trực quan chỉ dùng khi đã nêu rõ nhu cầu. Kiểm tra riêng mỗi phần đo cả các tiểu chuỗi của phần đó; không cần một trang riêng cho từng bước.

| Cụm và sản phẩm học tập | Nhu cầu → trực quan → ví dụ → hình thức → ứng dụng → bài tập | Đầu vào; ký hiệu/dữ kiện truyền tiếp | Câu nối, bước gộp và thời lượng |
|---|---|---|---|
| KN1 — phân biệt huấn luyện/đánh giá; MT1, LLO11/CLO1 | A03 → A03/A04 → A03, A05 → A04 → A05/A06 → A07 | Mất mát bình phương, gradient, kỳ vọng; $y=(-1,1,3)$ tạo $\ell_i,J$; $f_\theta,\ell$ giữ khi chuyển sang $R$ | Ví dụ A03 đứng cùng nhu cầu chọn dự đoán từ dữ liệu, trước sơ đồ phân phối A04. A05 dùng số liệu giả lập khác chỉ để chọn theo tiêu chí, không gán khái quát hóa cho VD1. A06 là mở rộng giới hạn điểm dừng. 0.35 LT + 0.10 BT, gồm định vị A01/A02 |
| KN2 — tính gradient nhóm, bước và biến thiên; MT2, LLO12/CLO2 | B01 → B02 → B02 → B03 → B04–B07 → B08 | HT1; $g_i=\theta-y_i$ cùng dữ liệu VD1; $(2,0,-2)$ chuyển thành kỳ vọng 0 và phương sai $8/3$, rồi thành bước cập nhật | “Không tính đủ thì thông tin mẫu liên hệ mục tiêu thế nào” dẫn B03; “kỳ vọng đúng còn từng bước ra sao” dẫn B04. SGD được tính tay B04 trước giả mã B05. 0.40 LT + 0.25 BT |
| KN3a — tích lũy hướng bằng momentum; MT1/MT2, LLO11/CLO1 và LLO12/CLO2 | C01/C02 → C01/C03 → C02/C03 → C04 → C05 → C08 | Gradient/Taylor B04; $q=\tfrac12(3[\theta]_1^2+7[\theta]_2^2)$ và điểm $(2,4)$ giữ nguyên; bước C02 là $1/4$, từ C03 công bố $\eta=1/20,\beta=1/2$ | Giảm bước tránh vượt trục nhưng làm ngắn tiến triển; C03 thử giữ thành phần hướng nhất quán. C05 mới đối chứng tác dụng trạng thái bằng cùng bước $1/20$; không so C02/C03 để chứng minh momentum. Hình thức C04 khai triển tổng, ứng dụng C05 giữ cùng đối chứng. Không mô tả quỹ đạo $\eta=1/20$ là dao động mạnh. 0.36 LT; dùng 0.12 BT của C08 |
| KN3b — tính đúng điểm gradient Nesterov; MT2, LLO12/CLO2 | C06 → C06 → C06 → C07 → C07 → C08 | $\theta_1,v_1,\eta,\beta$ của momentum, giữ cùng hàm/đối chứng; $\widetilde\theta=\theta+\beta v$ là dữ kiện mới | Dịch chuyển quán tính làm đổi độ dốc: $\nabla q(\theta+\beta v)-\nabla q(\theta)=H\beta v=(-0.45,-4.9)^T$. Nhu cầu là tính hướng hiệu chỉnh tại điểm dự báo, không chỉ đổi chỗ đo tùy ý. C06 gộp trực quan với bước tính vì cùng một điểm trung tâm; C07 ghép lại gradient nhóm bằng quy trình đã học. Không tuyên bố luôn tốt hơn. 0.14 LT; dùng 0.13 BT của C08 |
| KN4 — dây chuyền và đối xứng; MT3, LLO13/CLO2 | D01 → D01/D02 → D01/D02 → D02/D03 → D03/D04 → D11 | Hàm hợp vô hướng; $z_j,h_j,a_j,w_j,b_j,e$ được đặt trước; cấu hình đầu ra 2 cho đạo hàm 2, dùng tiếp để kiểm hai nhánh sau bước | D01/D02 đi qua số trước công thức HT7; D03 kiểm một bước rồi rút bất biến; D04 đổi trọng số và dùng HT7 để thấy gradient khác. D11 đo thao tác độc lập với $x=2,y=1,w_j=0.5,a_j=1,b_j=0$: sinh viên tự tính hai đạo hàm theo $w_j$ trước giải thích đối xứng. Đối xứng tham số A06 được giải nghĩa trên mạng cụ thể. 0.23 LT; dùng 0.10 BT của D11 |
| KN5a — độ nhạy và phương sai qua tầng; MT1/MT3, LLO11/CLO1 và LLO13/CLO2 | Cuối D04 → D05/D06 → D05/D07 → D07/D08 → D08 → D11 | Dây chuyền D02; thông báo đổi sang chuỗi tuyến tính, rồi $W\in\mathbb R^{n_{out}\times n_{in}}$; số thừa số biến thành số hạng của tổng phương sai | “Khác nhau chưa đủ, cần độ lớn nào” nối D04→D05. D06 dùng vùng tanh gần tuyến tính để chuẩn bị mô hình tính thang. D07 đặt $q>0$ là phương sai; sau nhu cầu và giả thiết, ví dụ bốn đầu vào đứng trước công thức tổng quát; D08 nêu mất mát phụ thuộc $h$ qua $z=Wh$, rồi định nghĩa $\delta_z=\nabla_z\ell$, $\delta_h=\nabla_h\ell$, dùng dây chuyền từng thành phần trước ma trận, rồi nêu $\mathbb E\delta_{z,j}=0$, phương sai $r>0$ và độc lập với toàn bộ $W$. Nhu cầu giữ thang xuất hiện trước công thức. 0.23 LT; dùng 0.07 BT của D11 |
| KN5b — chọn và kiểm Glorot; MT3, LLO13/CLO2 | D08 → D08 → D08 → D09 → D09/D10 → D11 | Kết quả tiến $n_{in}s^2q$ và lùi $n_{out}s^2r$; lớp $4\rightarrow2$ cho hai yêu cầu mâu thuẫn, rồi phương sai $1/3$ | D08 gộp xung đột với ví dụ $1/4$ và $1/2$; D09 thỏa hiệp và tính biên đều; D10 dùng lại công thức để tính hệ quả qua chuỗi ba lớp. D11 đổi sang $8\rightarrow4$, yêu cầu tự làm; D10 tính hệ quả mô hình nhiều lớp dưới độc lập giữa các ma trận, không hứa số đo thực nghiệm. 0.14 LT; dùng 0.08 BT của D11 |
| Tổng hợp — thiết lập và biện minh; MT1–MT3 | E01 → E01 → E02 → không áp dụng → E01/E02 → E02; E03 kết luận | Các đối tượng A–D, không có định nghĩa trọng tâm mới | Chu trình rút gọn hợp lý vì chỉ phối hợp công cụ đã kiểm; E02 là nhiệm vụ chuyển giao, E03 không thêm lý thuyết. 0.15 LT + 0.15 BT |

Tổng các tiểu chuỗi C: 0.36+0.14=0.50 LT, 0.12+0.13=0.25 BT. Tổng các tiểu chuỗi D: 0.23+0.23+0.14=0.60 LT, 0.10+0.07+0.08=0.25 BT. Đây là phân vai trong cùng trang kiểm tra, không tạo thời lượng mới.

Khái niệm hỗ trợ A06 (yên ngựa và nhiều cực tiểu), D06 (bão hòa) dùng chu trình rút gọn: nhu cầu giới hạn diễn giải → ví dụ/công thức tại trang → kiểm ranh giới ở A07, D11/E02. Không dành một chu trình đầy đủ cho từng loại điểm tới hạn hoặc từng hàm kích hoạt vì bài không yêu cầu thuật toán chuyên xử lý chúng.

## Bảng theo từng trang

Mọi trang mang quyết định **thêm mới** trong lần xây lại; lý do không dựa vào việc trang từng có ở bản cũ. Các quyết định giữ/sửa/gộp/tách dưới đây là đối với nguồn, không đối với lịch sử đã loại bỏ. Mỗi trang có đúng một luận điểm trung tâm trong outline.

| Trang và tiêu đề | Lý do tồn tại / nhu cầu được giải quyết | Nhận → tạo cho trang sau | Minh chứng | Quyết định có căn cứ |
|---|---|---|---|---|
| A01 — Các phương pháp tối ưu trong huấn luyện mô hình học sâu | Định vị học phần và nhiệm vụ của buổi | Bài trước → chủ đề Bài 05 | MT1–MT3, định vị | Thêm mới; bắt buộc mở đầu |
| A02 — Nội dung bài giảng | Cho người học biết các phần cùng giải quyết việc gì | Chủ đề → bản đồ năm thành phần | MT1–MT3 | Thêm mới; không biến thành danh sách tên thuật toán rời nhau |
| A03 — Bài toán huấn luyện mô hình | Tạo nhu cầu chọn tham số từ dữ liệu trước ký hiệu tổng quát | Ba quan sát → mất mát/$J$ | LLO11/CLO1 | Thêm mới; ví dụ tự xây dựng theo khung DL §5.10 |
| A04 — Mất mát huấn luyện và rủi ro kỳ vọng | Ngăn đồng nhất tối ưu dữ liệu với mục tiêu dự báo | Cùng $f,\ell$ → $J$ và $R$ | A07, LLO11/CLO1 | Giữ ý §8.1, đổi $J^*$ sang $R$ để tránh xung đột |
| A05 — Tiêu chí đánh giá mô hình | Biến phân biệt thành quyết định chọn mô hình | $J,R$ → mất mát thay thế/xác thực | A07, LLO11/CLO1 | Gộp §8.1.2 với nền §5.3, giữ ranh giới kiểm thử |
| A06 — Điểm dừng và chất lượng nghiệm | Chặn suy luận sai khi chuyển từ lồi sang mạng | Gradient và tiêu chí → giới hạn điểm dừng | A07, LLO11/CLO1 | Gộp các ý §8.2.2–8.2.3/8.2.7–8.2.8; giữ ví dụ kiểm được |
| A07 — Đánh giá kết quả huấn luyện | Đo khả năng phân biệt trước học thuật toán mới | A04–A06 → tiêu chí chọn đã được kiểm | Kiểm tra riêng A, LLO11/CLO1 | Thêm bài tập mới, có lý do và đáp án |
| B01 — Chi phí của gradient đầy đủ | Tạo nhu cầu lấy mẫu có căn cứ tính toán | $J$ dạng tổng → gradient dạng tổng | LLO12/CLO2 | Giữ chuỗi §5.9/8.1.3, bỏ lời khẳng định tăng tốc phần cứng |
| B02 — Gradient của từng quan sát | Làm hiện rõ các đóng góp khác nhau tại cùng điểm | VD1 → $(2,0,-2)$ và trung bình | B08, LLO12/CLO2 | Thêm phép tính dùng lại VD1 |
| B03 — Ước lượng gradient không chệch | Nối thông tin mẫu với mục tiêu đúng | Gradient mẫu → kỳ vọng/hiệp phương sai | B08, LLO12/CLO2 | Chuẩn hóa giả thiết độc lập, phân phối đều có hoàn lại; không gộp với rủi ro tổng thể |
| B04 — Một bước gradient ngẫu nhiên | Kiểm ranh giới của tính không chệch bằng phản ví dụ | Ước lượng → tham số 0.8, $J$ tăng 0.02 | B08, LLO11–12/CLO1–2 | Tách bước tính trước thuật toán; ví dụ mới |
| B05 — Phương pháp hạ gradient ngẫu nhiên | Cho quy trình có thể thực hiện sau khi đã tính tay | B04 → đầu vào/lặp/dừng/đầu ra | B08/E02, LLO12/CLO2 | Giữ thuật toán 8.1, bổ sung cách theo dõi cụ thể |
| B06 — Kích thước nhóm nhỏ | Dùng kết quả phương sai để chọn đánh đổi | HT2 → biến thiên/chi phí/bộ nhớ | B08/E02, LLO12/CLO2 | Gộp các yếu tố cần thiết §8.1.3, bỏ cỡ nhóm mặc định lịch sử |
| B07 — Bước học và dao động gần nghiệm | Giải thích điều chỉnh bước bằng nhiễu còn lại | B03/B06 → phương sai cập nhật tỷ lệ $\eta^2$ | B08, LLO12/CLO2 | Giữ động cơ §8.3.1; không đưa định lý thiếu giả thiết |
| B08 — Cập nhật từ một nhóm quan sát | Đo phối hợp lấy mẫu, bước và kỳ vọng | B02–B07 → thao tác độc lập đã kiểm | Kiểm tra riêng B, LLO12/CLO2 | Thêm bài tập; đề chứa đủ $y=(-1,1,3)$, mất mát và $J$ trung bình trước dữ kiện nhóm |
| C01 — Mặt mất mát bậc hai | Mở giới hạn hình học ngay cả khi gradient chính xác | Gradient B + B04 → hình/hàm cố định | LLO11–12/CLO1–2 | Giữ đúng VD2 B04; không gọi điều kiện cực kỳ kém |
| C02 — Độ cong và độ dài bước | Tái sử dụng Hessian để đọc chuyển động | VD2 → hai hệ số khác dấu với $\eta=1/4$ | C08, LLO11/CLO1 | Nhắc kết quả B04 trước cơ chế momentum |
| C03 — Tích lũy hướng cập nhật | Cho $v,\beta$ nghĩa tính toán trước quy tắc | Độ cong → hai vectơ và bước có lịch sử | C08, LLO12/CLO2 | Thêm tính tay; công bố đổi $\eta$ sang $1/20$ |
| C04 — Phương pháp momentum | Tổng quát hóa bước cụ thể, có trạng thái/dừng | C03 → HT5 và giả mã | C08/E02, LLO12/CLO2 | Giữ §8.3.2, lược cơ học/lực cản dài |
| C05 — Quỹ đạo của phương pháp momentum | Kiểm cùng bài toán khi thay quy tắc | HT5 → đối chứng quỹ đạo/giá trị hàm | LLO12/CLO2 | Kế thừa cách Boyd giữ ví dụ, không chọn hình có lợi riêng |
| C06 — Điểm đánh giá gradient | Tạo nhu cầu hiệu chỉnh theo độ dốc thay đổi dọc dịch chuyển quán tính | $\theta,v$ → điểm đo mới và hiệu chỉnh | C08, LLO12/CLO2 | Tách ví dụ/nhìn hình trước giả mã; HI 20–21 |
| C07 — Phương pháp Nesterov | Xác lập thứ tự cập nhật và ghép lại nhóm nhỏ | C06 → HT6, một điểm đo rõ ràng | C08/E02, LLO12/CLO2 | Giữ thuật toán 8.3, giới hạn bảo đảm được nói rõ |
| C08 — Cập nhật có trạng thái trên hàm bậc hai | Đo đúng trạng thái ở dữ kiện chưa tính | C03–C07 → hai phép cập nhật độc lập | Kiểm tra riêng C, LLO12/CLO2 | Thêm bài tập với $\theta=(1,1)$ và ghi nguyên hàm $q$ trên đề, tránh chép nguyên ví dụ |
| D01 — Mạng hai đơn vị ẩn | Bổ sung tiên quyết chưa được dạy ở Bài 04 | Quy trình cần $\theta_0$ → mạng và tham số | LLO13/CLO2 | Thêm có căn cứ, rút nền chương 6 xuống mạng nhỏ |
| D02 — Quy tắc dây chuyền trong mạng | Cho thấy gradient sinh ra qua cấu trúc tầng | Truyền xuôi D01 → đạo hàm từng tham số | D11, LLO13/CLO2 | Tách khỏi công thức khởi tạo; ví dụ trước quy tắc |
| D03 — Đối xứng giữa các đơn vị ẩn | Dùng đạo hàm để giải thích sự đồng nhất | Gradient bằng nhau → cập nhật bằng nhau | D11/E02, LLO13/CLO2 | Nối §8.2.2 với §8.4 sau khi đã có mạng |
| D04 — Khởi tạo ngẫu nhiên và phá đối xứng | Dùng HT7 cho quyết định khởi tạo khác nhau | Đối xứng → hai gradient ra khác nhau | D11/E02, LLO13/CLO2 | Giữ §8.4, không nói mọi độ lệch phải ngẫu nhiên |
| D05 — Độ nhạy qua nhiều lớp | Tạo nghĩa tính toán cho “độ sâu đồ thị” | Dây chuyền → tích $1/16$ hoặc 16 | LLO11/CLO1, LLO13/CLO2 | Dời §8.2.5 tới sau D02; công bố mô hình tuyến tính mới |
| D06 — Bão hòa của hàm kích hoạt | Ngăn giải pháp sai “cứ tăng trọng số” | Tích đạo hàm → giới hạn phi tuyến | D11, LLO11/CLO1 | Gộp nền tanh với cảnh báo §8.4; không thêm danh mục kích hoạt |
| D07 — Phương sai qua một lớp tuyến tính | Tạo cơ sở tính thang theo số đầu vào | Chuỗi D05 → tổng ngẫu nhiên và phương sai tiến | D11, LLO13/CLO2 | Bổ sung suy ngắn, nêu kích thước/độc lập trước công thức |
| D08 — Phương sai của gradient truyền ngược | Tạo nhu cầu thỏa hiệp Glorot | Cùng $W$ → phương sai lùi và hai yêu cầu khác nhau | D11, LLO13/CLO2 | Tách hai chiều để không nhồi; nêu độc lập gradient là giả thiết |
| D09 — Khởi tạo Glorot | Biến yêu cầu thang thành phân phối có thể dùng | $n_{in},n_{out}$ → $s^2,a$ | D10/D11, LLO13/CLO2 | Giữ (8.23), không thêm He thiếu nhu cầu/phạm vi |
| D10 — Thang phương sai qua nhiều lớp | Ứng dụng có hướng dẫn khác kiểm tra cuối phần | HT9/HT10 → bảng hệ quả phương sai qua ba lớp | LLO13/CLO2 | Thêm mô hình tính được theo quy trình §8.4; không giả dữ liệu thực nghiệm |
| D11 — Đối xứng và thang khởi tạo | Đo tự tính đạo hàm, đối xứng và chuyển công thức sang kích thước mới | D02–D03/D07–D09 → hai đạo hàm và khởi tạo có điều kiện | Kiểm tra riêng D, LLO13/CLO2 | Đề tự chứa mạng, mất mát, dữ kiện mới và giả thiết tuyến tính; giữ tổng 0.25 BT |
| E01 — Cấu hình quy trình huấn luyện | Trả các kết quả về đúng thứ tự chạy | A–D → sơ đồ vận hành thống nhất | MT1–MT3 | Tổng hợp, không thêm kỹ thuật mới |
| E02 — Chẩn đoán một phiên huấn luyện | Đo chuyển giao nhiều công cụ vào một tình huống | E01 → lựa chọn có lý do và điểm gradient | Kiểm tra riêng E, LLO11–13/CLO1–2 | Thêm nhiệm vụ mới, không đòi cỡ nhóm tối ưu thiếu dữ kiện |
| E03 — Kết luận và tài liệu đọc | Khép vấn đề/mục tiêu và ranh giới bài sau | Bằng chứng E02 → việc làm được và giới hạn | MT1–MT3 | Gộp tổng kết với nguồn đọc, không thêm luận điểm mới |

## Đặc tả hình và việc giữ đối chứng

- VD1: nhãn $y_i$, $\theta$, $g_i$ giữ từ A03 đến B08. Hình B04 có hai hàm được ghi tên: mất mát mẫu và $J$; không dùng cùng một đường để ám chỉ cả hai.
- VD2: trục $[\theta]_1,[\theta]_2$, hàm $q$, điểm đầu và đường mức giữ nguyên C01–C07. C02 ghi $\eta=1/4$ trên bảng cấu hình; C03–C07 ghi $\eta=1/20,\beta=1/2$. Quỹ đạo so sánh dùng gradient đầy đủ; chưa có nguồn nhiễu nào trên hình đó. C05/C06 ghi thay đổi gradient đúng bằng $H\beta v$. NAG không được vẽ như luôn tốt hơn momentum, vì phép tính bước hai của ví dụ không cho kết luận ấy.
- VD3: cùng sơ đồ hai đơn vị ở D01–D04, chỉ đổi trọng số khi công bố D04. Mũi tên truyền xuôi/đạo hàm có nhãn chữ. D05 ghi rõ “mô hình tuyến tính minh họa” để không lẫn với ReLU.
- Phương sai: hình D07 biểu diễn lớp $4\to2$ qua $W$; D08 dùng công thức $W^T$ và bảng hai lựa chọn trên cùng lớp. Bỏ hình mạng lùi lặp ở D08 theo quyết định điều phối ngày 2026-09-26 để bảng không chạm chân trang; toàn bộ giả thiết và kết luận được giữ. D09 dẫn tới hệ quả nhiều lớp ở D10; D10 ghi độc lập giữa các ma trận lớp và với đầu vào. Các giá trị được tính theo mô hình, không phải số đo mạng thật; việc đo kích hoạt/gradient chỉ nêu như bước vận hành tiếp theo.
- Hình đang dùng là SVG tự dựng, có nhãn trục và mô tả thay thế; công thức/bảng dùng KaTeX/HTML. Năm SVG bậc hai đã được sửa cùng tỷ lệ 36 điểm SVG trên mỗi đơn vị ở cả hai trục; giữ hàm và mọi tọa độ. Việc đọc nhãn sau sửa cần kiểm lại trên bản dựng.

## Phân phối lại nguồn và giới hạn

Nguồn DL đi theo §§8.1 → 8.2 → 8.3 → 8.4. Bản này giữ mục tiêu của các mục nhưng phân phối §8.2 tới chỗ dùng: nhiều cực tiểu/yên ngựa/cục bộ–toàn cục ở A06, gradient lấy mẫu ở B, độ cong ở C, độ sâu/bão hòa/vách dốc ở D. Các quyết định giữ, gộp, lược được ghi theo từng mục trong outline; không bỏ ngầm các thách thức LLO11 yêu cầu.

Mỗi đoạn bỏ có lý do phạm vi: chứng minh độ khó tổng quát, phân tích cơ học momentum, khởi tạo trực giao/thưa và các dạng khởi tạo từ học trước không cần để đo ba LLO trong 2LT+1BT. Không tạo tuyến tự học bằng badge trên slide; tài liệu đọc ở E03 là chỉ dẫn nguồn.

Bản này phản ánh HTML đã dựng và những sửa được duyệt. Tái kiểm toán, mạch kể chuyện, hiển thị và đồng bộ Codex Slides sau sửa đều đã đạt. HTML dùng CSS tự viết chung tại `2627-1/lecture-style.css`, giới hạn bằng `data-lecture="05"`. Trạng thái và bằng chứng nằm trong review-log.

## Bổ sung sau các lượt rà đã duyệt

B03 định nghĩa hiệp phương sai và kích thước trước khi dùng; B05 giữ $p$ cho số tham số, dùng duy nhất $K_{\mathrm{stop}}$ cho số lần chờ và định nghĩa ngân sách $T$. B06 chỉ đặc tả đồ thị sai số chuẩn $\sqrt{8/(3b)}$ tại tham số cố định, không gọi là đường hội tụ. A02 hiển thị tên đầy đủ của phương pháp hạ gradient ngẫu nhiên trước viết tắt. E02 ghi tiểu bài toán Nesterov trong $\mathbb R^2$ là độc lập với toàn bộ tham số mạng. Các câu hỏi B08/C08/D11 phải hiển thị đủ dữ liệu và hàm, không chỉ viện dẫn mã ví dụ. Năm phần, 37 trang và tổng 2 giờ LT + 1 giờ BT giữ nguyên.

Các phần sửa C01–C08 và D04–D11 cần tái kiểm toán học/mạch kể chuyện cùng hai trang lân cận và các ranh giới phần liên quan; trạng thái từng phát hiện được giữ trong review-log.

## Bố cục thực tế sau sửa ngày 2026-09-26

Bảng này bổ sung cột bố cục cho 37 mục ở bảng theo từng trang phía trên; không tạo thêm trang hoặc mã. Thứ tự nguồn đọc trên màn hình là từ trên xuống, rồi trái sang phải; ở khung hẹp các cột xếp dọc và vùng công thức/bảng cuộn ngang bằng bàn phím. Chỉ tiêu đề D11 thay đổi.

| Mã | Bố cục hiện tại và quyết định |
|---|---|
| A01 | Một cột; tiêu đề lớn trên, tên học phần/bài/đơn vị dưới. Giữ trang định vị ít nội dung. |
| A02 | Một cột; danh sách năm phần, khối mục tiêu ba thao tác dưới. Sửa lời mục tiêu để đầu ra hiện trên màn chiếu. |
| A03 | Câu nhu cầu trên; hai cột hình ba quan sát trái, mô hình/mất mát/trung bình/ví dụ phải. Sửa động cơ trước phép tính. |
| A04 | Miền/ký hiệu và sơ đồ dữ liệu trên; hai khối huấn luyện/kỳ vọng dưới. Sửa khối trái để định nghĩa mất mát mẫu trước trung bình. |
| A05 | Bảng hai thời điểm và khối lựa chọn; lời giải thích tiêu chí dưới. Giữ phép quyết định ngắn. |
| A06 | Hai cột; hình hai loại điểm và các công thức/nhận xét tương ứng. Giữ hai phản ví dụ trong một luận điểm về giới hạn điểm dừng. |
| A07 | Nhãn câu hỏi, bảng hai thời điểm rồi hai yêu cầu lựa chọn bản lưu/phân loại gốc. Giữ hai minh chứng đánh giá của phần A. |
| B01 | Công thức gradient đầy đủ trên, đối chiếu chi phí dưới. Giữ nhu cầu trước kỹ thuật lấy mẫu. |
| B02 | Hai cột; hình âm gradient trái, công thức/bảng gradient phải. Giữ cùng điểm tham số khi so các mẫu. |
| B03 | Giả thiết và định nghĩa trên; hai khối kỳ vọng/hiệp phương sai; ví dụ vô hướng dưới. Sửa miền của cỡ nhóm. |
| B04 | Hai cột; đồ thị hai mất mát và phép tính bước/giá trị. Giữ phản ví dụ nhìn và tính được. |
| B05 | Đầu vào trên; hai cột cho thao tác cập nhật và theo dõi/dừng. Sửa miền nguyên dương trong đầu vào. |
| B06 | Hai cột; hình sai số chuẩn trái, bảng và định nghĩa phải; khối chi phí dưới. Sửa định nghĩa để nối trực tiếp với phương sai. |
| B07 | Hai cột; hình bước ngẫu nhiên và công thức phương sai cập nhật. Giữ cùng điểm để cô lập tác dụng của bước học. |
| B08 | Đề tự chứa phía trên, hai khối nhóm đã quan sát/trước lấy nhóm. Giữ phân biệt hiện thực và kỳ vọng. |
| C01 | Hai cột; đường mức trái, hàm/Hessian/điểm đầu phải; kết luận gradient dưới. Sửa tỷ lệ hình; giải nghĩa số điều kiện trong notes. |
| C02 | Hai cột; quỹ đạo trái, hai hệ số và điều kiện bước phải; công thức Taylor dưới. Giữ bước 1/4 được công bố. |
| C03 | Cấu hình trên; hai cột hình ghép vectơ và phép tính từng bước. Giữ ví dụ trước công thức momentum. |
| C04 | Đầu vào trên; hai khối cập nhật/tổng tích lũy; chi phí và dừng dưới. Sửa bước cố định. |
| C05 | Hai cột; quỹ đạo đối chứng trái, bảng kết quả phải; trường hợp gradient hằng dưới. Giữ cùng cấu hình. |
| C06 | Hai cột; hình điểm đo trái, điểm dự báo/gradient/cập nhật phải; đối chiếu giá trị dưới. Giữ đầy đủ phép tính Nesterov. |
| C07 | Lời mở nêu bước cố định; hai cột so điểm đo và trình tự cập nhật; dừng/đầu ra dưới. Giữ gốc cập nhật rõ. |
| C08 | Đề tự chứa và trạng thái mới; bảng đối chiếu các đại lượng cần tính của momentum/Nesterov. Giữ bài kiểm chuyển giao. |
| D01 | Hai cột; hình hai đơn vị trái, tham số/truyền xuôi/mất mát phải. Giữ nền mạng tối thiểu. |
| D02 | Dữ kiện trên; hai cột ví dụ số/quy tắc; đường biến với đạo hàm trên cạnh dưới. Sửa sự lẫn nút biến và đạo hàm. |
| D03 | Bảng hai đơn vị trước/sau; khối bất biến và nhận xét hoán vị dưới. Sửa phạm vi khả vi trên mặt trang. |
| D04 | Hai cột; hình mạng trái, cấu hình trọng số mới và đạo hàm đầu ra phải; kết luận phá đối xứng dưới. Giữ tính lại đạo hàm theo trọng số ra. |
| D05 | Mô hình chuỗi trên; hình chuỗi và tích đạo hàm; hai cấu hình số. Giữ thông báo đổi mô hình. |
| D06 | Hai cột; hình tanh/đạo hàm trái, công thức/bảng phải; xấp xỉ gần 0 dưới. Giữ cầu nối mô hình tuyến tính. |
| D07 | Nhu cầu và kích thước trên; giả thiết/ví dụ bốn đầu vào trái, hình lớp phải; công thức tổng quát cuối. Sửa trình tự để ví dụ chuẩn bị tổng quát hóa. |
| D08 | Phụ thuộc mất mát/kích thước gradient trên; cột trái dây chuyền → giả thiết mô hình → phương sai; cột phải bảng 4→2 và kết luận xung đột. Sửa bố cục, bỏ hình mạng lùi trùng để đủ chữ 28 px. |
| D09 | Hai cột; quy tắc phương sai/phân phối và ví dụ 4→2; định nghĩa phân phối đều dưới. Giữ thỏa hiệp sau bảng xung đột. |
| D10 | Giả thiết/mạng trên, công thức lặp và bảng ba lớp, khối độc lập dưới. Giữ bảng mô hình có thể tính lại. |
| D11 | Nhãn câu hỏi ghi hai tiểu bài toán độc lập; hai khối đối xứng/thang. Sửa duy nhất tiêu đề, thêm phạm vi khả vi; giữ mã/vị trí. |
| E01 | Sơ đồ vận hành trên, bảng quyết định/đối tượng/đại lượng, khối vòng lặp dưới. Giữ đúng thứ tự thực thi. |
| E02 | Hai khối; dữ liệu/khởi tạo trái, bảng xác thực/tiểu bài vectơ phải. Giữ tách các mô hình trong đề. |
| E03 | Bảng ba kết quả học tập, khối nguồn đọc dưới. Giữ đối chiếu mục tiêu và ranh giới bài sau. |

Đơn vị thời lượng được đính chính theo bảng “Số giờ/buổi” của đề cương DOCX: 2 giờ LT + 1 giờ BT; giữ nguyên mọi phân số phân bổ, không quy đổi phút. Các phát hiện SB01–SB03, M01–M06, AC01, SV01–SV03, ST01–ST04, EX01–EX05 và MM01–MM04 đã có quyết định sửa trong nhật ký; trạng thái hiện tại là tái kiểm đạt, đã đóng; xem mục kiểm định cuối trong nhật ký.
