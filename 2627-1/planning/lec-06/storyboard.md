# Storyboard Bài giảng 06

## Phạm vi và cơ sở lý thuyết chung

Storyboard mới ngày 2026-09-26 gồm 45 trang trong 7 mạch, xây dựng từ nguồn và mục tiêu buổi học. Toàn bộ trang được thêm khi xây dựng lại tuyến; vòng biên tập sau rà soát ghi riêng quyết định **giữ** hoặc **sửa** cho từng trang; quyết định giữ/sửa/gộp/tách nội dung nguồn nằm ở outline.md, phần Phân tích nguồn và thiết kế nội dung, mục 8. Không coi số trang cũ hoặc HTML hiện có là ràng buộc. Bản này chưa đồng bộ RevealJS.

Vấn đề trung tâm là chọn thành phần huấn luyện cần thay và kiểm điều kiện sử dụng. A02 xác lập sơ đồ thành phần ngay trên tuyến trang; E01 và G01 dùng lại cùng nhãn. Đối tượng chung: dữ liệu, mô hình, mục tiêu F, tham số θ, gradient, điểm đầu, quỹ đạo và quy tắc trả về. Sườn B–D: ví dụ thang đo → mô hình tuyến tính có phạt SPD → thống kê đường chéo → mô hình Taylor/hệ SPD → giải qua Av hoặc xấp xỉ nghịch đảo từ (s,y). Sườn E–F gọi lại các thành phần: phép tính/khối/đầu ra → điểm đầu/họ mục tiêu/phân phối → phương án đánh giá. Không có định lý chung khẳng định mọi can thiệp cải thiện hội tụ mạng sâu.

Giả thiết và giới hạn được phát triển tại chỗ: A04 phân biệt ma trận phạt và Hessian; B07 phân biệt moment với gradient; B08 xét tương tác độ cong; C03–C04 kiểm SPD/hướng giảm; C06 giữ toán tử cố định, C07 tách kiểm phần dư khỏi kiểm hướng; D03 kiểm yᵀs>0; E03 thay mục tiêu độc lập mẫu khi dùng BN; E06,F04,F05 kiểm các giới hạn của trung bình và giai đoạn. Mã HT0–HT13 và phát biểu đầy đủ trong outline.md, phần Phân tích nguồn và thiết kế nội dung, mục 7.

## Chức năng và ranh giới mạch

| Mạch | Chức năng | Đầu vào | Đầu ra và đóng góp vào vấn đề trung tâm | Kiểm tra | Tiết lý thuyết + bài tập |
|---|---|---|---|---|---|
| A: Bài toán và mô hình bước cập nhật | MT1–MT3; xác lập thành phần toàn bài, rồi mô hình bước cho MT1–MT2 | Gradient, hàm bậc hai và bước SGD của Bài 05 | Sơ đồ thành phần huấn luyện; ma trận phạt và nhu cầu ước lượng thang đo | A05 | 0,20 + 0,08 |
| B: Thống kê gradient theo tọa độ | MT1; thống kê gradient theo tọa độ | Mô hình bước với ma trận đường chéo | Ba cơ chế trạng thái và giới hạn tương tác tọa độ | B09 | 0,38 + 0,20 |
| C: Độ cong và hệ Newton | MT2; độ cong và hệ Newton | Giới hạn của thống kê đường chéo | Hệ SPD, hướng Newton và nghiệm CG có phần dư kiểm được | C08 | 0,40 + 0,22 |
| D: Xấp xỉ độ cong từ gradient | MT2; xấp xỉ độ cong từ gradient | Chi phí cung cấp toán tử độ cong trong Newton–CG | Cặp cát tuyến hợp lệ và hướng BFGS; nhu cầu xem các thành phần khác | D05 | 0,24 + 0,12 |
| E: Phép tính mô hình, khối biến và đầu ra | MT3; phép tính mô hình, khối biến và đầu ra | Các giới hạn của việc chỉ thay bước | Phân biệt BN, hạ theo khối, Polyak và đường truyền gradient | E08 | 0,38 + 0,15 |
| F: Huấn luyện theo giai đoạn | MT3; huấn luyện theo giai đoạn | Mô hình, mục tiêu, dữ liệu và điểm đầu của bài toán | Phân biệt chuyển tham số, họ mục tiêu, lịch phân phối; điều kiện mục tiêu đích | F07 | 0,30 + 0,13 |
| G: Lựa chọn và đánh giá phương pháp | MT1–MT3; lựa chọn và đánh giá phương pháp | Kết quả và giới hạn của sáu mạch trước | Phương án có dữ kiện, điều kiện áp dụng và phép kiểm | G02 | 0,10 + 0,10 |

Tổng 2,00 tiết lý thuyết + 1,00 tiết bài tập. Bài tập bao gồm phép tính tay ở trang ví dụ, kiểm tra cá nhân và sản phẩm nhóm G02; không cộng thêm thời gian ngoài đề cương. Hai ranh giới cần giữ rõ: C07→D01 thay đầu vào Av bằng cặp gradient; D05→E01 thay câu hỏi “tính bước” bằng “thành phần nào của quá trình cần điều chỉnh”. E→F chuyển từ thao tác trong một quá trình sang tổ chức nhiều giai đoạn.

## Bản đồ hành trình khái niệm

Thứ tự chuẩn là nhu cầu → trực quan → ví dụ → hình thức/toán học → ứng dụng → bài tập. Khi ví dụ cùng trang nhu cầu, phần dữ kiện xuất hiện trước hình thức hóa. Mỗi cụm dưới ghi riêng đầu vào, sản phẩm, ký hiệu truyền tiếp và lý do gộp. Thời lượng cụm tính theo hợp các trang được tham chiếu; các trang kiểm tra chung xuất hiện trong nhiều cụm nên các tổng cụm không cộng để suy tổng toàn bài.

### KN0. Mô hình bước cục bộ

- **Sáu bước:** nhu cầu A03; trực quan A03; ví dụ A03; hình thức/toán học A04; ứng dụng A04; bài tập A05.
- **Đầu vào và mục tiêu:** Gradient, Hessian và dạng toàn phương; MT1–MT2. Tính bước từ g, M, η và bác bỏ ma trận phạt làm bài toán không bị chặn dưới; kiểm ở A05.
- **Ký hiệu/dữ kiện truyền tiếp:** θ=(1,1), g=(1,9), M=diag(1,9).
- **Gộp hoặc rút gọn:** Nhu cầu và ví dụ dẫn nhập cùng A03: bước vô hướng không cân bằng hai tọa độ. Hình và phép tính dùng đúng một hàm.
- **Câu nối học thuật:** Độ dài lệch nhau → ma trận phạt → bước có công thức.
- **Thời lượng cụm:** 0,15 tiết lý thuyết + 0,08 tiết bài tập theo hợp trang; có chia sẻ trang với cụm khác.

### KN1. AdaGrad

- **Sáu bước:** nhu cầu B01; trực quan B01; ví dụ B02; hình thức/toán học B03; ứng dụng B03; bài tập B09.
- **Đầu vào và mục tiêu:** KN0 và phép toán theo tọa độ; MT1. Tính tổng v và bước d, nối tần suất tọa độ với tốc độ học hiệu dụng; kiểm ở B09.
- **Ký hiệu/dữ kiện truyền tiếp:** g₁=(2,1), g₂=(2,0), v₀=0.
- **Gộp hoặc rút gọn:** Gộp nhu cầu/trực quan trong bảng tần suất B01; ứng dụng đặc trưng thưa nằm cùng thuật toán.
- **Câu nối học thuật:** Lịch sử hoạt động → tổng bình phương → độ dài bước.
- **Thời lượng cụm:** 0,13 tiết lý thuyết + 0,14 tiết bài tập theo hợp trang; có chia sẻ trang với cụm khác.

### KN2. RMSProp

- **Sáu bước:** nhu cầu B03–B04; trực quan B04; ví dụ B04; hình thức/toán học B05; ứng dụng B05; bài tập B09.
- **Đầu vào và mục tiêu:** Tích lũy AdaGrad; MT1. Tính thống kê suy giảm và bước RMSProp, giải thích cơ chế quên khi tọa độ vắng gradient; kiểm ở B09.
- **Ký hiệu/dữ kiện truyền tiếp:** Cùng dãy gradient; ρ=1/2.
- **Gộp hoặc rút gọn:** B04 gộp nhu cầu, hình trọng số và bước số vì chúng giải thích một cơ chế quên.
- **Câu nối học thuật:** Bộ nhớ không quên → trọng số suy giảm → thống kê cục bộ theo thời gian.
- **Thời lượng cụm:** 0,14 tiết lý thuyết + 0,14 tiết bài tập theo hợp trang; có chia sẻ trang với cụm khác.

### KN3. Adam

- **Sáu bước:** nhu cầu B05–B06; trực quan B06; ví dụ B06; hình thức/toán học B07; ứng dụng B07 (kiểm hướng moment), B08 (giới hạn tương tác); bài tập B09.
- **Đầu vào và mục tiêu:** RMSProp và momentum đã học; MT1. Tính hai moment đã hiệu chỉnh và giải thích bước còn khác 0 khi gradient hiện tại bằng 0; kiểm ở B09.
- **Ký hiệu/dữ kiện truyền tiếp:** m₀=v₀=0; β₁=1/2, β₂=3/4.
- **Gộp hoặc rút gọn:** Hai cột moment thô/hiệu chỉnh gộp trực quan với ví dụ; Ghi chú B07 kiểm giới hạn của hướng moment; B08 kiểm riêng thông tin ngoài đường chéo.
- **Câu nối học thuật:** Bộ nhớ độ lớn + bộ nhớ hướng → hiệu chỉnh khởi tạo → giới hạn hướng giảm.
- **Thời lượng cụm:** 0,22 tiết lý thuyết + 0,14 tiết bài tập theo hợp trang; có chia sẻ trang với cụm khác.

### KN4. Newton

- **Sáu bước:** nhu cầu B08, C01; trực quan C01; ví dụ C02; hình thức/toán học C03; ứng dụng C04; bài tập C08.
- **Đầu vào và mục tiêu:** Gradient và Hessian; MT2. Lập hệ Newton, kiểm trị riêng và chọn giảm chấn đủ để có hướng giảm; kiểm ở C08.
- **Ký hiệu/dữ kiện truyền tiếp:** Q=[[2,1],[1,2]], θ=(1,0), g=(2,1).
- **Gộp hoặc rút gọn:** Đổi từ V1 sang V5 có chủ ý để có phần tử ngoài đường chéo; C01 định nghĩa lại dữ kiện đầy đủ.
- **Câu nối học thuật:** Tương tác tọa độ → mô hình Taylor → hệ tuyến tính → kiểm SPD.
- **Thời lượng cụm:** 0,28 tiết lý thuyết + 0,15 tiết bài tập theo hợp trang; có chia sẻ trang với cụm khác.

### KN5. Gradient liên hợp

- **Sáu bước:** nhu cầu C04–C05; trực quan C05; ví dụ C05; hình thức/toán học C06; ứng dụng C07; bài tập C08.
- **Đầu vào và mục tiêu:** Hệ SPD và phần dư mới định nghĩa tại C05; MT2. Tái tạo một vòng CG, tính phần dư, quyết định dừng; khi áp dụng Newton–CG phân biệt thêm kiểm dấu hướng; kiểm ở C08 và G02.
- **Ký hiệu/dữ kiện truyền tiếp:** A=diag(1,4), b=(1,1), d₀=0.
- **Gộp hoặc rút gọn:** C05 hiện phép thế tạo α₀, β₀ và p₁ trước thuật toán; chi tiết vòng thứ hai đặt ghi chú. C06 giữ đủ cập nhật hệ số và hướng trên mặt trang; chi phí và hữu hạn vòng thuộc ghi chú.
- **Câu nối học thuật:** Chi phí giải hệ → hướng liên hợp → thuật toán dùng Av → kiểm phần dư → kiểm dấu hướng trong Newton–CG.
- **Thời lượng cụm:** 0,23 tiết lý thuyết + 0,19 tiết bài tập theo hợp trang; có chia sẻ trang với cụm khác.

### KN6. BFGS

- **Sáu bước:** nhu cầu C07, D01; trực quan D01; ví dụ D02; hình thức/toán học D03; ứng dụng D04; bài tập D05.
- **Đầu vào và mục tiêu:** Gradient tại hai điểm; MT2. Kiểm dấu yᵀs, nhận hoặc bỏ cặp và tính d=−Pg với gradient mới; kiểm ở D05.
- **Ký hiệu/dữ kiện truyền tiếp:** Q của C01, s=(1,0), y=(2,1), P₀=I.
- **Gộp hoặc rút gọn:** Cát tuyến và hình sai phân chung D01; L-BFGS rút gọn trong D04 vì chỉ hỗ trợ chi phí.
- **Câu nối học thuật:** Không có toán tử Hessian → cặp độ cong → SPD → hướng và bộ nhớ.
- **Thời lượng cụm:** 0,29 tiết lý thuyết + 0,12 tiết bài tập theo hợp trang; có chia sẻ trang với cụm khác.

### KN7. Chuẩn hóa theo lô

- **Sáu bước:** nhu cầu E01–E02; trực quan E02; ví dụ E02; hình thức/toán học E03; ứng dụng E03; bài tập E08.
- **Đầu vào và mục tiêu:** Trung bình/phương sai, phép tính một tầng; MT3. Tính phương sai sau chuẩn hóa và phân biệt thống kê huấn luyện/suy luận; kiểm ở E08.
- **Ký hiệu/dữ kiện truyền tiếp:** a=(1,1,5,5), a+4=(5,5,9,9), trung bình 3 và 7, cùng σ²=4.
- **Gộp hoặc rút gọn:** E01 nối thang đầu vào tầng với độ nhạy theo tham số. E02 gộp nhu cầu đưa hai lô về quy ước chung với trục số/ví dụ; ứng dụng tầng ẩn và chế độ suy luận chung E03.
- **Câu nối học thuật:** Thang và vị trí đầu vào tầng → hai lô dịch chuyển → chuẩn hóa có tham số → kiểm phụ thuộc lô.
- **Thời lượng cụm:** 0,14 tiết lý thuyết + 0,09 tiết bài tập theo hợp trang; có chia sẻ trang với cụm khác.

### KN8. Hạ tọa độ/khối

- **Sáu bước:** nhu cầu E04; trực quan E04; ví dụ E04; hình thức/toán học E05; ứng dụng E05; bài tập E08.
- **Đầu vào và mục tiêu:** Đạo hàm riêng, bài toán con; MT3. Giải thích điều kiện mục tiêu không tăng của lượt cập nhật theo khối; kiểm ở E08 từ điểm đã cho.
- **Ký hiệu/dữ kiện truyền tiếp:** F(u,v), (0,0)→(1,0)→(1,1/2).
- **Gộp hoặc rút gọn:** Nhu cầu gắn ngay ví dụ có bài toán con dễ giải; hình đường gấp khúc giải thích cùng dữ kiện.
- **Câu nối học thuật:** Giữ khối → giải bài toán con → mục tiêu không tăng có điều kiện.
- **Thời lượng cụm:** 0,10 tiết lý thuyết + 0,10 tiết bài tập theo hợp trang; có chia sẻ trang với cụm khác.

### KN9. Trung bình Polyak

- **Sáu bước:** nhu cầu E06; trực quan E06; ví dụ E06; hình thức/toán học E06; ứng dụng E06; bài tập E08.
- **Đầu vào và mục tiêu:** Quỹ đạo tham số; MT3. Tính trung bình tham số và dùng phản ví dụ hai miền nghiệm để bác bỏ bảo đảm cải thiện chung; kiểm ở E08.
- **Ký hiệu/dữ kiện truyền tiếp:** 1;3;1,5;2,5 và trung bình 2.
- **Gộp hoặc rút gọn:** Gộp chu trình trên một trang do định nghĩa trung bình quen thuộc; phản ví dụ E06 là ứng dụng kiểm giới hạn. Chứng minh hội tụ không nằm trong mục tiêu.
- **Câu nối học thuật:** Dao động quỹ đạo → chọn đầu ra trung bình → kiểm cùng miền nghiệm.
- **Thời lượng cụm:** 0,07 tiết lý thuyết + 0,10 tiết bài tập theo hợp trang; có chia sẻ trang với cụm khác.

### KN10. Thiết kế đường truyền gradient

- **Sáu bước:** nhu cầu E07; trực quan Không áp dụng riêng; ví dụ E07; hình thức/toán học E07; ứng dụng E07; bài tập E08.
- **Đầu vào và mục tiêu:** Quy tắc dây chuyền từ Bài 05; MT3. Xác định tích đạo hàm là một thừa số của gradient mất mát, kiểm giới hạn tăng theo độ sâu; kiểm ở E08.
- **Ký hiệu/dữ kiện truyền tiếp:** h₀, h₅; tích 0,1⁵ và 1,1⁵ là hệ số trong ∂ℒ/∂h₀, rồi nhân ∂h₀/∂w để nhận gradient tham số tầng trước.
- **Gộp hoặc rút gọn:** Chu trình hỗ trợ rút gọn nhu cầu → hình thức → kiểm; sơ đồ có trong ví dụ, không cần trang trực quan riêng.
- **Câu nối học thuật:** Tích đạo hàm nhỏ → thay đường đạo hàm → kiểm giới hạn theo độ sâu.
- **Thời lượng cụm:** 0,07 tiết lý thuyết + 0,07 tiết bài tập theo hợp trang; có chia sẻ trang với cụm khác.

### KN11. Tiền huấn luyện có giám sát

- **Sáu bước:** nhu cầu F01; trực quan F01; ví dụ F01; hình thức/toán học F02; ứng dụng F02; bài tập F07.
- **Đầu vào và mục tiêu:** Mất mát bình phương và gradient; MT3. Xác định phần tham số được chuyển, tính gradient và bước tinh chỉnh trên mục tiêu đích; kiểm ở F07.
- **Ký hiệu/dữ kiện truyền tiếp:** F=(ab−3)²/2; gradient tại (0,0) bằng 0, tại (2,1) bằng (−1,−2); nhãn đích 3, η=0,1.
- **Gộp hoặc rút gọn:** Nhu cầu/ví dụ dẫn nhập chung F01: điểm đầu (0,0) không có tín hiệu gradient; điểm chuyển (2,1) cho một quỹ đạo khác cần đánh giá trên mục tiêu đích.
- **Câu nối học thuật:** Điểm đầu mất tín hiệu gradient → tham số học ở nhiệm vụ phụ → chuyển hợp lệ → tinh chỉnh mục tiêu đích.
- **Thời lượng cụm:** 0,09 tiết lý thuyết + 0,09 tiết bài tập theo hợp trang; có chia sẻ trang với cụm khác.

### KN12. Tiếp diễn

- **Sáu bước:** nhu cầu F03; trực quan F03; ví dụ F03; hình thức/toán học F04; ứng dụng F04; bài tập F07.
- **Đầu vào và mục tiêu:** Đạo hàm cấp một và cấp hai của đa thức bậc bốn; MT3. Dùng đạo hàm đã cho để kiểm điểm dừng có tồn tại qua lịch λ và giải thích giới hạn truyền nghiệm; kiểm ở F07.
- **Ký hiệu/dữ kiện truyền tiếp:** F₀=(θ²−1)²; λ=3→1,5→0.
- **Gộp hoặc rút gọn:** Ba đồ thị cùng một họ nên gộp trực quan/ví dụ; cơ chế mục tiêu đổi và điểm dừng được kiểm trong F04.
- **Câu nối học thuật:** Họ mục tiêu dễ hơn → truyền nghiệm → kiểm điểm dừng và mục tiêu cuối.
- **Thời lượng cụm:** 0,10 tiết lý thuyết + 0,09 tiết bài tập theo hợp trang; có chia sẻ trang với cụm khác.

### KN13. Học theo chương trình

- **Sáu bước:** nhu cầu F05; trực quan F05; ví dụ F05; hình thức/toán học F05; ứng dụng F06; bài tập F07.
- **Đầu vào và mục tiêu:** Trung bình có trọng số, hồi quy một biến; MT3. Đối chiếu nghiệm theo q với phân phối đích và chỉ ra thời điểm lịch vẫn giải mục tiêu khác; kiểm ở F07/G02.
- **Ký hiệu/dữ kiện truyền tiếp:** Hai mẫu E,H; q=0→1/4→1/2.
- **Gộp hoặc rút gọn:** Ví dụ dẫn nhập cụ thể hóa việc đổi thành phần lô; định nghĩa chỉ là tổng có trọng số đã biết nên cùng trang, chi tiết đạo hàm trong ghi chú.
- **Câu nối học thuật:** Độ nhạy khác nhau → lịch lấy mẫu → mục tiêu đích và đánh giá.
- **Thời lượng cụm:** 0,11 tiết lý thuyết + 0,09 tiết bài tập theo hợp trang; có chia sẻ trang với cụm khác.

## Vai trò từng trang

Mỗi trang dưới có đúng một mục tương ứng với dàn bài. Mã là dữ liệu nội bộ, không xuất hiện trên mặt trang hoặc trong ghi chú diễn giả.

### A01. Các phương pháp tối ưu trong học sâu

- **Lý do tồn tại và nhu cầu học tập:** Phân biệt phạm vi bài mới với các quy tắc SGD và momentum đã học; thiếu trang này sẽ không xác lập được chủ đề và đơn vị học phần.
- **Kế thừa, đầu ra và vị trí trong sườn:** Nhận mục tiêu huấn luyện từ Bài 05; A02 phân chia các quyết định cần học.
- **LLO/CLO hoặc minh chứng:** LLO14–16; CLO2–4. Xác lập phạm vi Bài 06; MT1–MT3.
- **Quyết định và lý do:** Giữ trang nhận diện ngắn để dành thời lượng cho ví dụ và kiểm tra. Đặc tả tại A01 trong outline.md.
- **Thời lượng và hoạt động:** 0,02 tiết lý thuyết + 0,00 tiết bài tập; nhận diện chủ đề, học phần và phạm vi đọc.

### A02. Nội dung và mục tiêu học tập

- **Lý do tồn tại và nhu cầu học tập:** Người học cần biết đầy đủ các thành phần có thể điều chỉnh trước khi xét thuật toán; sơ đồ chung cho phép nối cả ba mục tiêu của bài.
- **Kế thừa, đầu ra và vị trí trong sườn:** A01 xác lập phạm vi; sơ đồ thành phần là cơ sở toàn bài. A03–A04 xét riêng một bước trên quỹ đạo, E01 và G01 dùng lại cùng các thành phần để phân biệt can thiệp.
- **LLO/CLO hoặc minh chứng:** LLO14–16; CLO2–4. Bản đồ nội dung; MT1–MT3.
- **Quyết định và lý do:** Sửa sơ đồ ba nhánh thành sơ đồ thành phần, giữ ba nhóm mục tiêu và bổ sung LLO16. Đặc tả tại A02 trong outline.md.
- **Thời lượng và hoạt động:** 0,03 tiết lý thuyết + 0,00 tiết bài tập; đọc sơ đồ thành phần, phân biệt ba nhóm quyết định và tiên quyết.

### A03. Sai lệch thang đo trong bước cập nhật

- **Lý do tồn tại và nhu cầu học tập:** Hai giá trị bước trên cùng hàm làm rõ hạn chế của tốc độ học vô hướng trước khi đưa ma trận phạt.
- **Kế thừa, đầu ra và vị trí trong sườn:** A02 đặt nhiệm vụ chọn bước; các độ dài lệch nhau tạo nhu cầu về ma trận phạt tại A04.
- **LLO/CLO hoặc minh chứng:** LLO14/CLO2,3; LLO15/CLO2,3. Vai trò đánh giá: Nhu cầu, trực quan và ví dụ dẫn nhập cho HT1; MT1–MT2.
- **Quyết định và lý do:** Sửa ký hiệu điểm hiện tại để không dùng một chỉ số cho cả tọa độ lẫn vòng lặp. Đặc tả tại A03 trong outline.md.
- **Thời lượng và hoạt động:** 0,08 tiết lý thuyết + 0,00 tiết bài tập; so sánh hai bước và ba giá trị mục tiêu trên đồ thị đồng mức.

### A04. Mô hình cục bộ của bước cập nhật

- **Lý do tồn tại và nhu cầu học tập:** Cần một phép suy ra bước chung để đối chiếu các thuật toán B–D và chỉ ra nơi dùng tính xác định dương.
- **Kế thừa, đầu ra và vị trí trong sườn:** A02 xác lập các thành phần huấn luyện; A03 cung cấp dữ kiện để xét một bước trên quỹ đạo. B dùng thống kê gradient để dựng ma trận đường chéo, C dùng Hessian; E–F gọi lại sơ đồ để thay thành phần khác.
- **LLO/CLO hoặc minh chứng:** LLO14/CLO2,3; LLO15/CLO2,3. Vai trò đánh giá: Hình thức hóa và ứng dụng HT1; MT1–MT2.
- **Quyết định và lý do:** Sửa kết nối: mô hình này cụ thể hóa một bước của sơ đồ A02, không thay thế toàn bộ cơ sở huấn luyện. Đặc tả tại A04 trong outline.md.
- **Thời lượng và hoạt động:** 0,07 tiết lý thuyết + 0,00 tiết bài tập; đạo hàm theo d, kiểm nghiệm duy nhất và áp dụng ma trận phạt chéo.

### A05. Kiểm tra mô hình bước cập nhật

- **Lý do tồn tại và nhu cầu học tập:** Kiểm người học có tính được bước và phát hiện ma trận phạt không hợp lệ trước khi ước lượng thang đo từ dữ liệu.
- **Kế thừa, đầu ra và vị trí trong sườn:** A04 cho công thức; kết quả A05 đặt nhu cầu ước lượng thang đo khi chưa biết Hessian tại B01.
- **LLO/CLO hoặc minh chứng:** LLO14/CLO2,3; LLO15/CLO2,3. Vai trò đánh giá: Kiểm tra riêng mạch A; MT1–MT2.
- **Quyết định và lý do:** Sửa đề thành bài toán tự đủ công thức; giữ riêng minh chứng đầu mạch. Đặc tả tại A05 trong outline.md.
- **Thời lượng và hoạt động:** 0,00 tiết lý thuyết + 0,08 tiết bài tập; tính hai bước, giải thích tính không bị chặn dưới và đối chiếu đáp án.

### B01. Thống kê gradient theo tọa độ

- **Lý do tồn tại và nhu cầu học tập:** Cần quan sát tọa độ hoạt động nhiều hoặc ít để lựa chọn thống kê bình phương trước công thức AdaGrad.
- **Kế thừa, đầu ra và vị trí trong sườn:** A05 cần ước lượng thang đo; B02 dùng chính dãy gradient để tính một bước AdaGrad.
- **LLO/CLO hoặc minh chứng:** LLO14/CLO2,3. Vai trò đánh giá: Nhu cầu và trực quan KN1; MT1.
- **Quyết định và lý do:** Giữ bảng hai gradient vì đủ tạo nhu cầu mà chưa thêm mô hình dữ liệu. Đặc tả tại B01 trong outline.md.
- **Thời lượng và hoạt động:** 0,04 tiết lý thuyết + 0,00 tiết bài tập; lập bảng bình phương, tổng và tần suất hoạt động tọa độ.

### B02. Ví dụ cập nhật AdaGrad

- **Lý do tồn tại và nhu cầu học tập:** Một cập nhật số giúp phân biệt tốc độ học hiệu dụng với độ dài bước trước khi đọc thuật toán.
- **Kế thừa, đầu ra và vị trí trong sườn:** B01 cho dãy; B03 tổng quát hóa cùng $v_t$, $g_t$ và quy định xử lý mẫu bằng 0.
- **LLO/CLO hoặc minh chứng:** LLO14/CLO2,3. Vai trò đánh giá: Ví dụ tính tay KN1; MT1.
- **Quyết định và lý do:** Giữ riêng ví dụ hai vòng để thứ tự cập nhật thống kê có thể kiểm bằng tay. Đặc tả tại B02 trong outline.md.
- **Thời lượng và hoạt động:** 0,03 tiết lý thuyết + 0,03 tiết bài tập; tính v₁, v₂ và bước; đối chiếu tọa độ có gradient bằng 0.

### B03. Thuật toán AdaGrad

- **Lý do tồn tại và nhu cầu học tập:** Ví dụ số chưa cho quy tắc xử lý mẫu bằng 0 hoặc cách dùng tần suất đặc trưng; thuật toán phải khép kín và có ứng dụng cụ thể.
- **Kế thừa, đầu ra và vị trí trong sườn:** B02 cung cấp cơ chế; tích lũy không quên dẫn tới nhu cầu B04 khi gradient thay đổi phân bố.
- **LLO/CLO hoặc minh chứng:** LLO14/CLO2,3. Vai trò đánh giá: Hình thức hóa và ứng dụng KN1/HT2; MT1.
- **Quyết định và lý do:** Sửa ứng dụng đặc trưng thưa bằng hai tốc độ hiệu dụng đã tính từ dãy chung. Đặc tả tại B03 trong outline.md.
- **Thời lượng và hoạt động:** 0,06 tiết lý thuyết + 0,00 tiết bài tập; đối chiếu đầu vào, thứ tự cập nhật và tốc độ hiệu dụng của tọa độ thưa.

### B04. Ví dụ cập nhật RMSProp

- **Lý do tồn tại và nhu cầu học tập:** Tổng tích lũy giữ thông tin quá khứ; ví dụ trọng số suy giảm chuẩn bị cơ chế quên của RMSProp.
- **Kế thừa, đầu ra và vị trí trong sườn:** B03 tích lũy toàn lịch sử; B04 thay tổng bằng bộ nhớ suy giảm, B05 nêu thuật toán.
- **LLO/CLO hoặc minh chứng:** LLO14/CLO2,3. Vai trò đánh giá: Nhu cầu, trực quan và ví dụ KN2; MT1.
- **Quyết định và lý do:** Giữ cùng dãy gradient để thay đổi duy nhất cách thống kê. Đặc tả tại B04 trong outline.md.
- **Thời lượng và hoạt động:** 0,03 tiết lý thuyết + 0,03 tiết bài tập; tính trung bình mũ và đọc trọng số theo độ trễ.

### B05. Thuật toán RMSProp

- **Lý do tồn tại và nhu cầu học tập:** Cần quy tắc tổng quát và một hệ quả sau công thức để giải thích bộ nhớ quên khi đặc trưng tạm vắng.
- **Kế thừa, đầu ra và vị trí trong sườn:** B04 cho phép tính; B06 bổ sung moment bậc nhất để kết hợp lịch sử hướng với lịch sử độ lớn.
- **LLO/CLO hoặc minh chứng:** LLO14/CLO2,3. Vai trò đánh giá: Hình thức hóa và ứng dụng KN2/HT3; MT1.
- **Quyết định và lý do:** Sửa rho, nguồn ST và ứng dụng thống kê giảm; giữ epsilon dương trong hệ quả. Đặc tả tại B05 trong outline.md.
- **Thời lượng và hoạt động:** 0,05 tiết lý thuyết + 0,00 tiết bài tập; đọc đồ thị trọng số, tính tọa độ mất gradient và giới hạn suy luận.

### B06. Ví dụ hiệu chỉnh moment trong Adam

- **Lý do tồn tại và nhu cầu học tập:** Moment khởi tạo bằng 0 cần được đối chiếu với tổng trọng số trước khi xuất hiện phép hiệu chỉnh Adam.
- **Kế thừa, đầu ra và vị trí trong sườn:** B05 cung cấp moment bậc hai; B06 cần thêm moment bậc nhất và hiệu chỉnh, B07 nêu đầy đủ thứ tự.
- **LLO/CLO hoặc minh chứng:** LLO14/CLO2,3. Vai trò đánh giá: Nhu cầu, trực quan và ví dụ KN3; MT1.
- **Quyết định và lý do:** Giữ bảng thô/hiệu chỉnh để tránh đưa toàn bộ giả mã trước nhu cầu. Đặc tả tại B06 trong outline.md.
- **Thời lượng và hoạt động:** 0,05 tiết lý thuyết + 0,03 tiết bài tập; tính hai moment và hiệu chỉnh vòng đầu; phân biệt với giả thiết không chệch.

### B07. Thuật toán Adam

- **Lý do tồn tại và nhu cầu học tập:** Cần kết hợp hai trạng thái thành thuật toán và kiểm điều kiện dùng tử số moment để không gán bảo đảm hướng giảm sai.
- **Kế thừa, đầu ra và vị trí trong sườn:** B06 xác lập hiệu chỉnh; B07 phân biệt moment và gradient hiện tại. B08 xét riêng thông tin tương tác mà thống kê đường chéo không chứa.
- **LLO/CLO hoặc minh chứng:** LLO14/CLO2,3. Vai trò đánh giá: Hình thức hóa và ứng dụng kiểm giới hạn KN3/HT4; MT1.
- **Quyết định và lý do:** Sửa ghi chú: nhận phản ví dụ dấu từ B08 và gắn nguyên nhân với bộ nhớ hướng. Đặc tả tại B07 trong outline.md.
- **Thời lượng và hoạt động:** 0,07 tiết lý thuyết + 0,00 tiết bài tập; theo dõi lưu đồ cập nhật; kiểm phản ví dụ moment ngược gradient.

### B08. Giới hạn của chuẩn hóa theo tọa độ

- **Lý do tồn tại và nhu cầu học tập:** Giới hạn của thống kê đường chéo tạo nhu cầu dùng thông tin tương tác độ cong ở C01.
- **Kế thừa, đầu ra và vị trí trong sườn:** B07 cho công thức; B09 kiểm tra thống kê và C01 sử dụng tương tác độ cong còn thiếu.
- **LLO/CLO hoặc minh chứng:** LLO14–15; CLO2,3. MT1; chuẩn bị MT2 tại C01, chưa là minh chứng đánh giá riêng.
- **Quyết định và lý do:** Sửa để chỉ xét hạng tương tác; chuyển phản ví dụ một chiều sang B07 vì khác nguyên nhân. Đặc tả tại B08 trong outline.md.
- **Thời lượng và hoạt động:** 0,05 tiết lý thuyết + 0,00 tiết bài tập; đối chiếu dạng toàn phương có hạng chéo và elip nghiêng.

### B09. Kiểm tra thuật toán thích ứng

- **Lý do tồn tại và nhu cầu học tập:** Ba thuật toán dùng cùng gradient nhưng lưu trạng thái khác nhau; bài riêng kiểm được lỗi thứ tự và hiệu chỉnh.
- **Kế thừa, đầu ra và vị trí trong sườn:** B08 giới hạn lựa chọn; C01 thay thống kê gradient bằng mô hình độ cong.
- **LLO/CLO hoặc minh chứng:** LLO14/CLO2,3. Vai trò đánh giá: Kiểm tra riêng mạch B; MT1.
- **Quyết định và lý do:** Giữ đề hai vòng; sửa dòng kiến thức đo đúng ba cơ chế, bỏ ngoại lệ A05. Đặc tả tại B09 trong outline.md.
- **Thời lượng và hoạt động:** 0,00 tiết lý thuyết + 0,11 tiết bài tập; tính bước thứ hai và giải thích moment còn tạo dịch chuyển.

### C01. Tương tác độ cong giữa các tọa độ

- **Lý do tồn tại và nhu cầu học tập:** Sau giới hạn đường chéo, cần một Hessian có tương tác thật để hình dung thông tin độ cong còn thiếu.
- **Kế thừa, đầu ra và vị trí trong sườn:** B08 để lại tương tác ngoài đường chéo; C02 tính bước dùng toàn bộ Q.
- **LLO/CLO hoặc minh chứng:** LLO15/CLO2,3. Vai trò đánh giá: Nhu cầu và trực quan KN4; MT2.
- **Quyết định và lý do:** Giữ ma trận nghiêng thay ma trận chéo của mở bài; dữ kiện được định nghĩa lại đầy đủ. Đặc tả tại C01 trong outline.md.
- **Thời lượng và hoạt động:** 0,05 tiết lý thuyết + 0,00 tiết bài tập; xác định gradient, trục riêng và hướng tới nghiệm.

### C02. Ví dụ bước Newton

- **Lý do tồn tại và nhu cầu học tập:** Giải một hệ cụ thể làm rõ vai trò của Hessian trước mô hình Taylor tổng quát.
- **Kế thừa, đầu ra và vị trí trong sườn:** C01 cho độ cong; C03 tổng quát hóa khi Hessian thay đổi theo tham số.
- **LLO/CLO hoặc minh chứng:** LLO15/CLO2,3. Vai trò đánh giá: Ví dụ tính tay KN4; MT2.
- **Quyết định và lý do:** Giữ phép khử ẩn riêng để không trộn suy diễn tổng quát với ví dụ số. Đặc tả tại C02 trong outline.md.
- **Thời lượng và hoạt động:** 0,04 tiết lý thuyết + 0,03 tiết bài tập; giải hai phương trình và kiểm giá trị mục tiêu sau bước.

### C03. Phương pháp Newton

- **Lý do tồn tại và nhu cầu học tập:** Cần nêu điều kiện nào biến nghiệm hệ thành hướng giảm và điều kiện nào chỉ bảo đảm hội tụ cục bộ.
- **Kế thừa, đầu ra và vị trí trong sườn:** C02 minh họa nghiệm mô hình; C04 kiểm tra giả thiết H xác định dương.
- **LLO/CLO hoặc minh chứng:** LLO15/CLO2,3. Vai trò đánh giá: Hình thức hóa KN4/HT5; MT2.
- **Quyết định và lý do:** Giữ phát biểu, chứng minh dấu và điều kiện hội tụ; không mở chứng minh tốc độ dài. Đặc tả tại C03 trong outline.md.
- **Thời lượng và hoạt động:** 0,08 tiết lý thuyết + 0,00 tiết bài tập; suy ra hệ từ Taylor và kiểm chỗ dùng Hessian xác định dương.

### C04. Giảm chấn cho hệ Newton

- **Lý do tồn tại và nhu cầu học tập:** Hessian phi lồi có thể phá kết luận trước; phản ví dụ buộc kiểm giả thiết trước khi dùng Newton.
- **Kế thừa, đầu ra và vị trí trong sườn:** C03 cần SPD; C04 tạo hệ SPD nhưng chi phí lưu/giải còn lớn, dẫn đến C05.
- **LLO/CLO hoặc minh chứng:** LLO15/CLO2,3. Vai trò đánh giá: Trường hợp biên và ứng dụng KN4; MT2.
- **Quyết định và lý do:** Giữ yên ngựa và dịch trị riêng để tạo hệ hợp lệ cho CG. Đặc tả tại C04 trong outline.md.
- **Thời lượng và hoạt động:** 0,06 tiết lý thuyết + 0,00 tiết bài tập; tính hai hướng, dấu đạo hàm và điều kiện giảm chấn.

### C05. Ví dụ gradient liên hợp

- **Lý do tồn tại và nhu cầu học tập:** Sinh viên chưa học CG cần thấy hệ số và hướng thứ hai được sinh ra bằng phép tính, không chỉ nhận đáp số.
- **Kế thừa, đầu ra và vị trí trong sườn:** C04 tạo hệ A; C05 dùng một hệ SPD nhỏ, C06 tổng quát hóa cùng r,p,α,β.
- **LLO/CLO hoặc minh chứng:** LLO15/CLO2,3. Vai trò đánh giá: Nhu cầu, trực quan và ví dụ KN5; MT2.
- **Quyết định và lý do:** Sửa để hiện α₀, β₀ và p₁; chi tiết vòng hai ở ghi chú, giữ kết quả hình hai đoạn. Đặc tả tại C05 trong outline.md.
- **Thời lượng và hoạt động:** 0,05 tiết lý thuyết + 0,07 tiết bài tập; tối thiểu trên đường, dùng điều kiện liên hợp, thế số và kiểm phần dư.

### C06. Thuật toán gradient liên hợp tuyến tính

- **Lý do tồn tại và nhu cầu học tập:** Ví dụ hai chiều cần được tổng quát thành vòng lặp có đầy đủ đầu vào, cập nhật hướng và kiểm dừng.
- **Kế thừa, đầu ra và vị trí trong sườn:** C05 giải hai chiều; C07 dùng cùng thuật toán cho hệ Newton giảm chấn.
- **LLO/CLO hoặc minh chứng:** LLO15/CLO2,3. Vai trò đánh giá: Hình thức hóa KN5/HT6; MT2.
- **Quyết định và lý do:** Sửa để giữ β,p trên mặt trang; dẫn SH cho đúng truy hồi và ghi biến thể ngưỡng dừng. Đặc tả tại C06 trong outline.md.
- **Thời lượng và hoạt động:** 0,07 tiết lý thuyết + 0,00 tiết bài tập; đọc tuần tự giả mã, kiểm r₀=0, dừng trước phép chia và cập nhật hướng.

### C07. Giải gần đúng hệ Newton

- **Lý do tồn tại và nhu cầu học tập:** Bộ giải hệ chưa tự cho quy tắc bước ngoài; cần nối phần dư với hướng sử dụng trong Newton–CG.
- **Kế thừa, đầu ra và vị trí trong sườn:** C06 cung cấp bộ giải; D01 sẽ bỏ yêu cầu tích Hessian–vectơ và học độ cong từ chênh lệch gradient.
- **LLO/CLO hoặc minh chứng:** LLO15/CLO2,3. Vai trò đánh giá: Ứng dụng KN4–KN5; MT2.
- **Quyết định và lý do:** Sửa ứng dụng dùng d₀=0, xử lý g=0 và kiểm dấu hướng ngoài tiêu chí phần dư. Đặc tả tại C07 trong outline.md.
- **Thời lượng và hoạt động:** 0,05 tiết lý thuyết + 0,00 tiết bài tập; phân biệt vòng trong/ngoài, giữ toán tử cố định và kiểm hướng trước tìm bước.

### C08. Kiểm tra hệ Newton và phần dư

- **Lý do tồn tại và nhu cầu học tập:** Bài kiểm tra phải yêu cầu chọn hệ hợp lệ trước khi chạy CG và dùng phần dư để quyết định dừng.
- **Kế thừa, đầu ra và vị trí trong sườn:** C07 tạo nghiệm gần đúng; D01 đặt bài toán khi không có toán tử Hessian.
- **LLO/CLO hoặc minh chứng:** LLO15/CLO2,3. Vai trò đánh giá: Kiểm tra riêng mạch C; MT2.
- **Quyết định và lý do:** Giữ ma trận trùng ví dụ vì chọn giảm chấn và kiểm ngưỡng tạo nhiệm vụ mới. Đặc tả tại C08 trong outline.md.
- **Thời lượng và hoạt động:** 0,00 tiết lý thuyết + 0,12 tiết bài tập; chọn giảm chấn, tính một vòng và so chuẩn phần dư với ngưỡng.

### D01. Thông tin độ cong từ chênh lệch gradient

- **Lý do tồn tại và nhu cầu học tập:** Khi không có toán tử Hessian–vectơ, cần xác định thông tin độ cong nào có thể lấy từ hai gradient.
- **Kế thừa, đầu ra và vị trí trong sườn:** C07 cần toán tử Hessian–vectơ; D01 thay đầu vào bằng hai gradient, D02 kiểm một cặp số.
- **LLO/CLO hoặc minh chứng:** LLO15/CLO2,3. Vai trò đánh giá: Nhu cầu và trực quan KN6; MT2.
- **Quyết định và lý do:** Giữ bước sai phân riêng để tạo cặp cát tuyến trước công thức BFGS. Đặc tả tại D01 trong outline.md.
- **Thời lượng và hoạt động:** 0,05 tiết lý thuyết + 0,00 tiết bài tập; lập s,y, kiểm y=Qs trên hàm bậc hai và giới hạn một hướng.

### D02. Ví dụ cập nhật BFGS

- **Lý do tồn tại và nhu cầu học tập:** Cần kiểm đồng thời cát tuyến và xác định dương bằng số trước cập nhật tổng quát.
- **Kế thừa, đầu ra và vị trí trong sườn:** D01 cho cặp cát tuyến; D02 xác lập hai điều kiện, D03 giải thích phép cập nhật bảo toàn chúng.
- **LLO/CLO hoặc minh chứng:** LLO15/CLO2,3. Vai trò đánh giá: Ví dụ KN6; MT2.
- **Quyết định và lý do:** Giữ ma trận cho sẵn và chuẩn hóa thuật ngữ cát tuyến; không gọi kiểm ma trận là suy ra toàn bộ Hessian. Đặc tả tại D02 trong outline.md.
- **Thời lượng và hoạt động:** 0,04 tiết lý thuyết + 0,03 tiết bài tập; nhân P₁y và kiểm hai định thức con đầu.

### D03. Cập nhật nghịch đảo BFGS

- **Lý do tồn tại và nhu cầu học tập:** Hai điều kiện đã kiểm bằng số cần một công thức bảo toàn để dùng lặp lại qua nhiều bước.
- **Kế thừa, đầu ra và vị trí trong sườn:** D02 đã kiểm số; D04 dùng P để tạo hướng và quyết định nhận hoặc bỏ cặp cập nhật.
- **LLO/CLO hoặc minh chứng:** LLO15/CLO2,3. Vai trò đánh giá: Hình thức hóa KN6/HT7; MT2.
- **Quyết định và lý do:** Giữ công thức trung tâm với giả thiết trước, phác thảo dạng toàn phương trong ghi chú. Đặc tả tại D03 trong outline.md.
- **Thời lượng và hoạt động:** 0,08 tiết lý thuyết + 0,00 tiết bài tập; ánh xạ s,y,ρ vào công thức và kiểm tính xác định dương.

### D04. Thuật toán BFGS và bộ nhớ giới hạn

- **Lý do tồn tại và nhu cầu học tập:** Cập nhật ma trận chỉ hữu ích khi có quy trình tạo hướng, tìm bước, kiểm cặp và đánh giá chi phí.
- **Kế thừa, đầu ra và vị trí trong sườn:** D03 cho phép cập nhật hợp lệ; E01 xem xét giới hạn mà chỉ đổi quy tắc cập nhật chưa xử lý.
- **LLO/CLO hoặc minh chứng:** LLO15/CLO2,3. Vai trò đánh giá: Ứng dụng KN6/HT7; MT2.
- **Quyết định và lý do:** Sửa lần đầu tên BFGS với bộ nhớ giới hạn; giữ nội dung hỗ trợ, không thêm đệ quy. Đặc tả tại D04 trong outline.md.
- **Thời lượng và hoạt động:** 0,07 tiết lý thuyết + 0,00 tiết bài tập; theo dõi đầu vào, hướng, bước và bộ nhớ ma trận/cặp.

### D05. Kiểm tra điều kiện BFGS

- **Lý do tồn tại và nhu cầu học tập:** Cần tách khả năng nhận cặp độ cong khỏi khả năng tạo hướng bằng một gradient mới.
- **Kế thừa, đầu ra và vị trí trong sườn:** D04 kết thúc nhóm cập nhật; E01 mở các thành phần còn lại của bài toán.
- **LLO/CLO hoặc minh chứng:** LLO15/CLO2,3. Vai trò đánh giá: Kiểm tra riêng mạch D; MT2.
- **Quyết định và lý do:** Sửa đề ghi đầy đủ P₁ và đổi gradient thành (1,0) để tránh chép lại P₁y=s. Đặc tả tại D05 trong outline.md.
- **Thời lượng và hoạt động:** 0,00 tiết lý thuyết + 0,09 tiết bài tập; kiểm dấu hai cặp, tính hướng mới và đạo hàm theo hướng.

### E01. Các thành phần của quá trình huấn luyện

- **Lý do tồn tại và nhu cầu học tập:** Sau nhóm thay bước, người học cần gọi lại các thành phần còn lại để hiểu ranh giới can thiệp mô hình, khối và đầu ra.
- **Kế thừa, đầu ra và vị trí trong sườn:** D05 kết thúc thay bước; E02 xét đầu vào của các tầng trước khi có gradient.
- **LLO/CLO hoặc minh chứng:** LLO16/CLO3,4. Vai trò đánh giá: Nhu cầu và bản đồ KN7–KN10; MT3.
- **Quyết định và lý do:** Sửa thành hồi chiếu sơ đồ A02; đặt nhu cầu thang đầu vào tầng trước ví dụ BN. Đặc tả tại E01 trong outline.md.
- **Thời lượng và hoạt động:** 0,03 tiết lý thuyết + 0,00 tiết bài tập; định vị ba can thiệp trên sơ đồ chung và nối độ nhạy tham số với phép tính tầng.

### E02. Ví dụ chuẩn hóa theo lô

- **Lý do tồn tại và nhu cầu học tập:** Cần một nhiệm vụ chuẩn hóa có dữ kiện trước công thức BN; hai lô dịch chuyển cho phép kiểm cả quy ước chung và phụ thuộc lô.
- **Kế thừa, đầu ra và vị trí trong sườn:** E01 xác định phép tính mô hình; E03 tổng quát hóa và phân biệt chế độ huấn luyện/suy luận.
- **LLO/CLO hoặc minh chứng:** LLO16/CLO3,4. Vai trò đánh giá: Nhu cầu, trực quan và ví dụ KN7; MT3.
- **Quyết định và lý do:** Sửa nhu cầu/trực quan dùng a và a+4; không suy tốc độ hội tụ từ phép tính. Đặc tả tại E02 trong outline.md.
- **Thời lượng và hoạt động:** 0,04 tiết lý thuyết + 0,02 tiết bài tập; tính trung bình, phương sai và so đầu ra cùng giá trị trong hai lô.

### E03. Chuẩn hóa theo lô

- **Lý do tồn tại và nhu cầu học tập:** Ví dụ chưa phân biệt thống kê lúc học và lúc suy luận hoặc tác động epsilon; định nghĩa phải nêu đúng hai chế độ.
- **Kế thừa, đầu ra và vị trí trong sườn:** E02 cho số; E04 xét can thiệp nhóm biến thay vì phép tính tầng.
- **LLO/CLO hoặc minh chứng:** LLO16/CLO3,4. Vai trò đánh giá: Hình thức hóa và ứng dụng KN7/HT8; MT3.
- **Quyết định và lý do:** Giữ hai nhánh và mục tiêu kỳ vọng theo lô để phân biệt mục tiêu độc lập mẫu với mục tiêu phụ thuộc lô. Đặc tả tại E03 trong outline.md.
- **Thời lượng và hoạt động:** 0,07 tiết lý thuyết + 0,00 tiết bài tập; ánh xạ dữ kiện vào công thức; kiểm phương sai và chế độ suy luận.

### E04. Ví dụ hạ theo tọa độ

- **Lý do tồn tại và nhu cầu học tập:** Cần thấy vì sao chọn một nhóm biến có thể làm bài toán con dễ giải trước thuật toán hạ khối.
- **Kế thừa, đầu ra và vị trí trong sườn:** E03 thay phép tính mạng; E04 chuyển sang tập biến cập nhật, E05 nêu quy trình và giới hạn.
- **LLO/CLO hoặc minh chứng:** LLO16/CLO3,4. Vai trò đánh giá: Nhu cầu, trực quan và ví dụ KN8; MT3.
- **Quyết định và lý do:** Giữ hàm bậc hai hai biến và đường gấp khúc tính được. Đặc tả tại E04 trong outline.md.
- **Thời lượng và hoạt động:** 0,04 tiết lý thuyết + 0,03 tiết bài tập; tối thiểu lần lượt u,v và kiểm ba giá trị mục tiêu.

### E05. Hạ theo tọa độ và theo khối

- **Lý do tồn tại và nhu cầu học tập:** Một lượt số chưa chứng minh tính không tăng hoặc mô tả cập nhật nhiều khối; cần điều kiện khả thi và nghiệm con.
- **Kế thừa, đầu ra và vị trí trong sườn:** E04 cho một lượt; E06 xét cách chọn đầu ra từ các điểm đã sinh.
- **LLO/CLO hoặc minh chứng:** LLO16/CLO3,4. Vai trò đánh giá: Hình thức hóa và ứng dụng KN8/HT9; MT3.
- **Quyết định và lý do:** Giữ chứng minh ngắn và một lượt áp dụng nữa, không suy hội tụ mạng sâu. Đặc tả tại E05 trong outline.md.
- **Thời lượng và hoạt động:** 0,06 tiết lý thuyết + 0,00 tiết bài tập; giải thích không tăng qua lựa chọn cũ và áp dụng thêm một lượt.

### E06. Trung bình Polyak

- **Lý do tồn tại và nhu cầu học tập:** Quỹ đạo có dao động tạo nhu cầu chọn đầu ra khác điểm cuối, nhưng trung bình cần được kiểm bằng phản ví dụ.
- **Kế thừa, đầu ra và vị trí trong sườn:** E05 sinh quỹ đạo; E06 thay quy tắc trả về; E07 xét yếu tố trước cả gradient là kiến trúc.
- **LLO/CLO hoặc minh chứng:** LLO16/CLO3,4. Vai trò đánh giá: Nhu cầu, trực quan, ví dụ và hình thức hóa KN9; MT3.
- **Quyết định và lý do:** Sửa nguồn trung bình đều; giữ gộp ví dụ/định nghĩa vì phép trung bình đã quen. Đặc tả tại E06 trong outline.md.
- **Thời lượng và hoạt động:** 0,07 tiết lý thuyết + 0,03 tiết bài tập; tính trung bình, cập nhật trực tuyến và kiểm hai nghiệm khác miền.

### E07. Thiết kế đường truyền gradient

- **Lý do tồn tại và nhu cầu học tập:** Thay thuật toán không thay các đạo hàm do mô hình tạo; cần nối hệ số qua khối với gradient mất mát thực dùng.
- **Kế thừa, đầu ra và vị trí trong sườn:** E06 thay đầu ra; E07 đặt giới hạn mà chỉ đổi thuật toán cập nhật chưa xử lý; F01 xét cách xây điểm đầu qua nhiệm vụ phụ.
- **LLO/CLO hoặc minh chứng:** LLO16/CLO3,4. Vai trò đánh giá: Khái niệm hỗ trợ KN10; MT3.
- **Quyết định và lý do:** Sửa bổ sung h₀,h₅ vô hướng, mất mát ℒ và tham số tầng trước; giữ mức hỗ trợ quy tắc dây chuyền. Đặc tả tại E07 trong outline.md.
- **Thời lượng và hoạt động:** 0,07 tiết lý thuyết + 0,00 tiết bài tập; tính hai tích và xác định vị trí của chúng trong gradient tham số.

### E08. Kiểm tra can thiệp trong huấn luyện

- **Lý do tồn tại và nhu cầu học tập:** Cần phân biệt bốn can thiệp bằng đầu ra và giới hạn riêng, không chỉ nhớ tên.
- **Kế thừa, đầu ra và vị trí trong sườn:** E02–E07 cho công cụ; F01 mở các thay đổi theo giai đoạn.
- **LLO/CLO hoặc minh chứng:** LLO16/CLO3,4. Vai trò đánh giá: Kiểm tra riêng mạch E; MT3.
- **Quyết định và lý do:** Sửa giảm tải: một phép tính BN, ba đối chiếu có kết quả trung gian và đề tự đủ. Đặc tả tại E08 trong outline.md.
- **Thời lượng và hoạt động:** 0,00 tiết lý thuyết + 0,07 tiết bài tập; tính phương sai; giải thích không tăng, phản ví dụ trung bình và giới hạn nối tắt.

### F01. Khởi tạo qua nhiệm vụ có nhãn

- **Lý do tồn tại và nhu cầu học tập:** Điểm đầu có thể làm gradient mất tín hiệu ngay cả khi mô hình đã cố định; cần một phép chuyển tham số có thể kiểm bằng số.
- **Kế thừa, đầu ra và vị trí trong sườn:** E07 cho vai trò kiến trúc; F01 dùng kiến trúc tăng dần để xây điểm đầu, F02 tổng quát hóa quy trình.
- **LLO/CLO hoặc minh chứng:** LLO16/CLO3,4. Vai trò đánh giá: Nhu cầu, trực quan và ví dụ KN11; MT3.
- **Quyết định và lý do:** Sửa đối chiếu (0,0) với (2,1), giữ bước tinh chỉnh để minh họa quỹ đạo khác nhau. Đặc tả tại F01 trong outline.md.
- **Thời lượng và hoạt động:** 0,04 tiết lý thuyết + 0,02 tiết bài tập; tính hai gradient tại điểm đầu và một bước tinh chỉnh mục tiêu đích.

### F02. Tiền huấn luyện có giám sát

- **Lý do tồn tại và nhu cầu học tập:** Ví dụ chuyển một hệ số cần quy trình cho phần giữ, phần mới và mục tiêu được tối ưu sau chuyển.
- **Kế thừa, đầu ra và vị trí trong sườn:** F01 cho phép chuyển cụ thể; F03 xét trường hợp giữ không gian tham số nhưng thay mục tiêu theo giai đoạn.
- **LLO/CLO hoặc minh chứng:** LLO16/CLO3,4. Vai trò đánh giá: Hình thức hóa và ứng dụng KN11/HT11; MT3.
- **Quyết định và lý do:** Giữ ánh xạ T và tiêu chí tinh chỉnh; không đồng nhất mọi tiền huấn luyện với học từng tầng. Đặc tả tại F02 trong outline.md.
- **Thời lượng và hoạt động:** 0,05 tiết lý thuyết + 0,00 tiết bài tập; xác định dữ liệu phụ/đích, tham số chuyển và khối tinh chỉnh.

### F03. Ví dụ họ mục tiêu tiếp diễn

- **Lý do tồn tại và nhu cầu học tập:** Sau cách đổi điểm đầu, cần thấy một họ mục tiêu trên cùng tham số có cấu trúc nghiệm thay đổi theo lịch.
- **Kế thừa, đầu ra và vị trí trong sườn:** F02 thay điểm đầu; F03 cho mục tiêu đổi có tham số λ, F04 kiểm điều kiện và giới hạn truyền nghiệm.
- **LLO/CLO hoặc minh chứng:** LLO16/CLO3,4. Vai trò đánh giá: Nhu cầu, trực quan và ví dụ KN12; MT3.
- **Quyết định và lý do:** Giữ họ phạt tính được bằng đạo hàm một biến, không thêm xác suất Gaussian. Đặc tả tại F03 trong outline.md.
- **Thời lượng và hoạt động:** 0,04 tiết lý thuyết + 0,02 tiết bài tập; so ba đồ thị và các điểm cực tiểu theo λ.

### F04. Phương pháp tiếp diễn

- **Lý do tồn tại và nhu cầu học tập:** Truyền nghiệm giữa giai đoạn có thể giữ nguyên một điểm dừng; cần kiểm giới hạn trước khi vận dụng tiếp diễn.
- **Kế thừa, đầu ra và vị trí trong sườn:** F03 tạo họ mục tiêu; F04 nêu giới hạn; F05 thay phân phối dữ liệu để tạo họ mục tiêu theo cơ chế khác.
- **LLO/CLO hoặc minh chứng:** LLO16/CLO3,4. Vai trò đánh giá: Hình thức hóa và ứng dụng KN12/HT12; MT3.
- **Quyết định và lý do:** Giữ đạo hàm và đường θ=0 để tránh suy ưu thế từ hình họ mục tiêu. Đặc tả tại F04 trong outline.md.
- **Thời lượng và hoạt động:** 0,06 tiết lý thuyết + 0,00 tiết bài tập; kiểm đạo hàm cấp một/cấp hai và đường điểm dừng qua lịch.

### F05. Học theo chương trình

- **Lý do tồn tại và nhu cầu học tập:** Lịch lấy mẫu phải được viết thành mục tiêu trung bình để phân biệt thay phân phối với chỉ đổi thứ tự dữ liệu.
- **Kế thừa, đầu ra và vị trí trong sườn:** F04 thay hàm trực tiếp; F05 thay trọng số mẫu, F06 so sánh các can thiệp theo đúng dữ kiện.
- **LLO/CLO hoặc minh chứng:** LLO16/CLO3,4. Vai trò đánh giá: Nhu cầu, trực quan, ví dụ và hình thức hóa KN13; MT3.
- **Quyết định và lý do:** Giữ hai mẫu có độ nhạy tính được và phân phối đích xác định. Đặc tả tại F05 trong outline.md.
- **Thời lượng và hoạt động:** 0,06 tiết lý thuyết + 0,02 tiết bài tập; lập tổng có trọng số, tính nghiệm theo q và đối chiếu đích.

### F06. Điều kiện đánh giá huấn luyện theo giai đoạn

- **Lý do tồn tại và nhu cầu học tập:** Ba chiến lược giai đoạn cần cùng tiêu chí đánh giá để không nhầm thay mục tiêu hoặc tăng ngân sách với cải thiện phương pháp.
- **Kế thừa, đầu ra và vị trí trong sườn:** F02,F04,F05 cung cấp cơ chế; F07 kiểm áp dụng bằng số, G01 dùng hồ sơ để lựa chọn có điều kiện.
- **LLO/CLO hoặc minh chứng:** LLO16/CLO3,4. Vai trò đánh giá: Ứng dụng KN11–KN13; MT3.
- **Quyết định và lý do:** Giữ hồ sơ dữ liệu, mục tiêu và chi phí làm ứng dụng chung của ba cơ chế. Đặc tả tại F06 trong outline.md.
- **Thời lượng và hoạt động:** 0,05 tiết lý thuyết + 0,00 tiết bài tập; đối chiếu đối tượng thay, tiêu chí chuyển và ngân sách toàn bộ.

### F07. Kiểm tra huấn luyện theo giai đoạn

- **Lý do tồn tại và nhu cầu học tập:** Cần kiểm phân biệt khởi tạo, điểm dừng và phân phối đích bằng dữ kiện thay vì tên chiến lược.
- **Kế thừa, đầu ra và vị trí trong sườn:** F06 đặt điều kiện đánh giá; G01 tổng hợp theo giới hạn đã chứng minh.
- **LLO/CLO hoặc minh chứng:** LLO16/CLO3,4. Vai trò đánh giá: Kiểm tra riêng mạch F; MT3.
- **Quyết định và lý do:** Sửa đề tự đủ và giảm tính lặp: một bước tinh chỉnh, hai đối chiếu từ đạo hàm/nghiệm cho sẵn. Đặc tả tại F07 trong outline.md.
- **Thời lượng và hoạt động:** 0,00 tiết lý thuyết + 0,07 tiết bài tập; tính bước đích; giải thích mắc điểm dừng và sai khác mục tiêu cuối.

### G01. Lựa chọn phương pháp theo điều kiện bài toán

- **Lý do tồn tại và nhu cầu học tập:** Các kết quả riêng cần được chuyển thành tiêu chí lựa chọn trả lời vấn đề mở bài.
- **Kế thừa, đầu ra và vị trí trong sườn:** F07 đã phân biệt các giai đoạn; G02 buộc phối hợp ba chuẩn đầu ra trong một tình huống.
- **LLO/CLO hoặc minh chứng:** LLO14–16; CLO2–4. Vai trò đánh giá: Tổng hợp kết quả; MT1–MT3.
- **Quyết định và lý do:** Sửa gọi lại cùng nhãn sơ đồ A02 để kết nối lựa chọn với thành phần huấn luyện. Đặc tả tại G01 trong outline.md.
- **Thời lượng và hoạt động:** 0,06 tiết lý thuyết + 0,00 tiết bài tập; đối chiếu dữ kiện, cơ chế, giả thiết và phép kiểm trên sơ đồ chung.

### G02. Kiểm tra lựa chọn phối hợp

- **Lý do tồn tại và nhu cầu học tập:** Minh chứng cuối phải phối hợp chi phí, độ cong và mục tiêu đích trong một phương án có điều kiện.
- **Kế thừa, đầu ra và vị trí trong sườn:** G01 cung cấp tiêu chí; G03 chỉ tài liệu để đối chiếu sau bài.
- **LLO/CLO hoặc minh chứng:** LLO14–16; CLO2–4. Vai trò đánh giá: Kiểm tra riêng mạch G và tổng hợp; MT1–MT3.
- **Quyết định và lý do:** Sửa đề bỏ mã ví dụ; thêm kiểm hướng và trường hợp g=0 cho Newton–CG. Đặc tả tại G02 trong outline.md.
- **Thời lượng và hoạt động:** 0,00 tiết lý thuyết + 0,10 tiết bài tập; lập ba hàng phương án, trình bày điều kiện và đối chiếu phép kiểm.

### G03. Tài liệu đối chiếu

- **Lý do tồn tại và nhu cầu học tập:** Người học cần truy nguyên biến thể và giả thiết sau khi kết thúc các phép kiểm trong bài.
- **Kế thừa, đầu ra và vị trí trong sườn:** G02 hoàn tất minh chứng; nguồn phục vụ kiểm công thức và đọc giới hạn.
- **LLO/CLO hoặc minh chứng:** LLO14–16; CLO2–4. Vai trò đánh giá: Kết thúc và truy nguyên; MT1–MT3.
- **Quyết định và lý do:** Sửa ghi chú nguồn BV/SH, giữ danh mục hiển thị ngắn để không tạo trang kết luận mới. Đặc tả tại G03 trong outline.md.
- **Thời lượng và hoạt động:** 0,04 tiết lý thuyết + 0,00 tiết bài tập; đối chiếu nhóm kết quả với nguồn và vị trí đọc tiếp.

## Quyết định biên tập và cổng kiểm định

Không có ánh xạ mã trang cũ–mới vì người dùng yêu cầu bỏ tuyến cũ và làm lại từ đầu. Chỉ bảo toàn lịch sử trong review-log.md. So với giáo trình, tách ví dụ khỏi thuật toán ở B–D, thêm kiểm tra riêng cho từng mạch, đưa §8.7.5 vào E07 trước tiền huấn luyện §8.7.4 để nối kiến trúc với điểm đầu; các thay đổi được biện minh ở outline.md, phần Phân tích nguồn và thiết kế nội dung, mục 8.

Không bỏ ngầm bước của khái niệm trọng tâm. KN10 là hỗ trợ nên dùng chu trình rút gọn đã ghi; L-BFGS chỉ hỗ trợ chi phí BFGS và không có bài tập đòi đệ quy chưa dạy. Nhu cầu và ví dụ dẫn nhập được gộp có chủ ý ở A03,E04,F01,F03,F05. Những trang gộp nhiều bước giữ một luận điểm; phép suy diễn phụ đặt ghi chú khi triển khai.

Bản đồ và 45 mục trang đã được biên tập theo cổng storyboard và năm báo cáo độc lập; đang chờ điều phối viên cùng các vai liên quan rà lại sửa đổi được ghi ở review-log.md. Chỉ khi các lỗi chặn/nghiêm trọng được xử lý mới chốt kế hoạch. Việc dựng và kiểm định trực quan RevealJS, đồng bộ tài liệu học tập và xác nhận phiên bản Codex Slides là các bước riêng, không được suy ra từ storyboard này.
