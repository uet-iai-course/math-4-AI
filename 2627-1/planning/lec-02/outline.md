# Dàn ý Bài 02 — Khung bảy phần

Cập nhật ngày 2026-09-11 theo yêu cầu xóa toàn bộ trang chiếu hiện tại và tạo khung để cùng người dùng xây dựng từng phần.

## Cấu trúc hiện tại

1. Mô hình hóa và chứng nhận bài toán tối ưu lồi.
2. Quy hoạch tuyến tính.
3. Quy hoạch bậc hai.
4. Quy hoạch hình học và phép đổi biến làm lộ tính lồi.
5. Tối ưu nón và quy hoạch nửa xác định: ràng buộc trên chuẩn và ma trận.
6. Xấp xỉ lồi và nới lỏng bài toán không lồi.
7. Tổng hợp: lựa chọn biểu diễn và đánh giá nghiệm.

Phần 1 hiện có bảy trang: cả bảy trang đã có nội dung. Phần 2 có 12 trang đã triển khai; các phần 3–7 mỗi phần có một trang tiêu đề. Tổng cộng 24 trang trong bảy section ngoài; đây không phải số trang cuối cùng.

## Phần 1 hiện tại

1. Bài 02: Các bài toán tối ưu lồi — thông tin học phần, Viện Trí tuệ nhân tạo, năm học và học kỳ.
2. Nội dung chính — liệt kê các chủ đề đã chốt.
3. Bài toán tối ưu lồi tổng quát — mục tiêu lồi và tập khả thi lồi.
4. Dạng phổ biến của tối ưu lồi — biến $x\in\mathbb{R}^n$, mục tiêu và các hàm bất đẳng thức lồi, đẳng thức affine.
5. Ví dụ: hàm bậc hai — tối thiểu hóa $(x-2)^2$ trên $[0,1]$, nghiệm ở biên.
6. Ví dụ: hàm giá trị tuyệt đối — tối thiểu hóa $|x-2|$ trên $\mathbb{R}$, nghiệm tại điểm không khả vi.
7. Ví dụ: hàm nghịch đảo — tối thiểu hóa $1/x$ trên $(0,+\infty)$, cận dưới không đạt được.

Trang điều kiện riêng được bỏ theo yêu cầu người dùng vì nội dung đã nằm ở trang dạng toán học. Nguồn đã dùng: Boyd và Vandenberghe (2004), *Convex Optimization*, §4.2, trang 136–138. Nguồn cho các ví dụ: §3.1.3, §3.1.5 và Ví dụ 4.1, trang 128. Ba ví dụ có công thức, đồ thị SVG tự vẽ, chứng nhận tính lồi và kết luận về nghiệm; chứng minh chi tiết và biến thể kiểm tra hiểu nằm trong ghi chú diễn giả. CSS riêng Bài 02 tham khảo các bài trong `../rl-plan/2627-1/`.

## Quy ước triển khai tiếp

- Giữ thứ tự bảy mạch và chuỗi chín bước cho mỗi ví dụ trong storyboard.
- Thêm các trang nội dung vào section ngoài tương ứng khi xây dựng từng mạch.
- Tựa lồi, nhiều mục tiêu, dữ liệu ví dụ và số trang chi tiết còn chờ chốt.
- Ghi chú bài giảng và bài tập của bản cũ được giữ để tham khảo nhưng tạm ngừng liên kết trên chỉ mục trong thời gian đồng bộ lại.
- Bản trình chiếu trước khi xóa nội dung truy xuất tại commit `774112d`.

## Phần 2 đã triển khai

1. Quy hoạch tuyến tính.
2. Pha trộn cho một vườn ươm — câu chuyện, nhu cầu dinh dưỡng, lựa chọn nguyên liệu.
3. Mô hình pha trộn — dữ liệu, biến, chi phí và ràng buộc.
4. Dạng phổ biến của quy hoạch tuyến tính — nhận dạng và chứng nhận tính lồi.
5. Dạng chuẩn của quy hoạch tuyến tính — đẳng thức, biến không âm và cách chuyển từ bài toán tổng quát.
6. Nghiệm của bài toán pha trộn — hình học, nghiệm (1,2), chi phí 70 nghìn đồng.
7. Hồi quy với sai số tuyệt đối — năm điểm dữ liệu và mô hình tuyến tính.
8. Biến phụ cho giá trị tuyệt đối — một cận trên cho mỗi phần dư.
9. Tính tương đương của phép cải dạng — hai chiều, giá trị tối ưu, khôi phục nghiệm.
10. Nghiệm hồi quy với sai số tuyệt đối — đường dự đoán y=u, tổng sai số 3.
11. Hồi quy với sai số lớn nhất — đường dự đoán y=u+1,5, sai số lớn nhất 1,5.
12. Nhận dạng quy hoạch tuyến tính — ba biến thể kiểm tra và chuyển sang quy hoạch bậc hai.

Giữ kế hoạch 10 trang đã duyệt, bổ sung trang chuẩn tắc theo yêu cầu và tách câu chuyện khỏi mô hình theo yêu cầu mô tả bối cảnh. Các mã cũ giữ nguyên; hai mã mới là S02-01b và S02-03b. Không bổ sung thời lượng. Nguồn và quyết định từng trang ở [storyboard.md](storyboard.md).

## Kế hoạch phần 3 — Quy hoạch bậc hai (dự kiến 10 trang, chưa triển khai)

Người dùng yêu cầu sửa tiêu đề mạch 3 thành "Quy hoạch bậc hai" và sửa kế hoạch; đề xuất dưới đây gồm 10 trang; chưa thêm bất kỳ trang nội dung nào vào HTML. Toàn bài vẫn 24 trang trong bảy section. Ký hiệu dùng lại từ phần 2: dữ liệu $u=(-2,-1,0,1,2)$, $y=(-2,-1,3,1,2)$, $X$ có hàng thứ $i$ là $(u_i,1)$, $w=(a,b)$, phần dư $r=Xw-y$.

1. `S03` Quy hoạch bậc hai — trang tiêu đề hiện có, chỉ đổi h2.
2. `S03-01` Hồi quy với tổng bình phương sai số — cùng dữ liệu phần 2; nhu cầu dự đoán và ưu tiên giảm sai số lớn qua bình phương; đường thử $y=u$, miền $\mathbb{R}^2$.
3. `S03-02` Dạng bậc hai của bình phương sai số — khai triển $\|Xw-y\|_2^2=w^TX^TXw-2y^TXw+y^Ty$; $P=2X^TX$ nửa xác định dương, Hessian; cải dạng tương đương, không phải xấp xỉ.
4. `S03-03` Dạng phổ biến của quy hoạch bậc hai — $\min \tfrac12 x^TPx+q^Tx+r_0$ với $Gx\le h$, $Ax=b$, $x\in\mathbb{R}^n$, $P$ đối xứng nửa xác định dương; $P=0$ thu LP. Chứng nhận; không nói mọi QP đều lồi, không lấy $P$ nửa xác định dương làm điều kiện cần trên mọi miền ràng buộc.
5. `S03-04` Nghiệm hồi quy bình phương tối thiểu — $w=(1,3/5)$, tổng bình phương sai số $=36/5$; so với các tiêu chí phần 2 trên cùng dữ liệu, không coi đổi tiêu chí là cải dạng. Đồ thị đường dự đoán và mức mục tiêu trong $(a,b)$. Biến thể $a\le 1/2$ vẫn QP, nghiệm $(1/2,3/5)$, tổng bình phương sai số $=97/10$; suy diễn vào notes.
6. `S03-05` Hồi quy với hình phạt bậc hai — nhu cầu giảm độ nhạy dự đoán với nhiễu đầu vào/giữ hệ số nhỏ; $\min \|Xw-y\|_2^2+\lambda\|w\|_2^2$, $\lambda\ge0$; phạt cả hệ số chặn trong ví dụ để minh họa, không tuyên bố thông lệ mọi mô hình hoặc đảm bảo tổng quát hóa. $P=2(X^TX+\lambda I)$; $\lambda>0$ đảm bảo xác định dương, nghiệm duy nhất; nếu chỉ phạt một phần không kết luận tự động.
7. `S03-06` Ảnh hưởng của hệ số phạt — giữ dữ liệu; $\lambda=10$ cho $w=(1/2,1/5)$, tổng bình phương sai số $=21/2$, toàn mục tiêu $=67/5$. Đồ thị sự co hệ số và đường dự đoán; $\lambda=0$ kiểm lại bài trước. Thay $\lambda$ âm không còn bảo đảm lồi, phải kiểm Hessian.
8. `S03-07` Hồi quy với giới hạn độ lớn hệ số — nhu cầu mức trần cứng thay chi phí mềm; $\min \|Xw-y\|_2^2$ với $\|w\|_2^2\le R^2$, $R\ge0$. Miền hình tròn, nghiệm tự do ngoài/vào miền. Chọn $R$ và tính nghiệm số khi triển khai; chứng nhận hàm ràng buộc Hessian $2I$, không khẳng định tương đương bài phạt nếu chưa xác lập tham số. Kiểm $R=0$ và $R$ đủ lớn.
9. `S03-08` Quy hoạch bậc hai với ràng buộc bậc hai — QCQP dạng min bậc hai, các bất đẳng thức bậc hai lồi, đẳng thức affine; các $P_i$ nửa xác định dương kể cả $P_0$. Tổng quát từ giới hạn chuẩn; so sánh QP và QCQP. QCQP nói chung có thể không lồi.
10. `S03-09` Nhận dạng và chứng nhận bài toán bậc hai — bài tập đổi ràng buộc chuẩn thành $\|w\|_2^2\ge R^2$ ($R>0$) hoặc $=R^2$; đổi $\lambda$; phân loại và chứng nhận theo mô hình. Nối phần 4: không thấy cấu trúc lồi theo biến gốc sẽ cần tìm phép đổi biến.

Chi tiết từng trang, bảng lý do tồn tại/khoảng trống, kết nối trước–sau, minh chứng LLO3/CLO1 và ánh xạ chín bước ở [storyboard.md](storyboard.md). Các con số minh họa là dự kiến tự tính, không phải dữ liệu thực nghiệm. Không gán thời lượng; chưa phân bổ.
