# Mạch khái niệm của ghi chú Bài 13

Tài liệu chỉ có ghi chú, không có trang chiếu.

| Mạch | Nhu cầu và ví dụ | Công cụ và chứng minh | Kết quả cùng giới hạn |
|---|---|---|---|
| 13.1 | Trạng thái robot thay đổi ngẫu nhiên; xích hai trạng thái | Markov, thuần nhất, xác suất toàn phần, truyền vector hàng | Phân phối sau nhiều bước; chuyển tiếp khác xác suất đồng thời; Markov khác độc lập |
| 13.2 | Hành động đổi khả năng nhận thưởng về sau; robot A/B | MDP có điều khiển, chính sách, tổng thưởng, Bellman theo chính sách | Giá trị hữu hạn nhờ thưởng bị chặn và chiết khấu; chính sách phụ thuộc lịch sử cần phân biệt với chính sách dừng |
| 13.3 | Thưởng tức thời cao chưa tối ưu dài hạn | Bất đẳng thức cực đại → tính co → điểm bất động → chính sách đạt được và chặn mọi chính sách | Giá trị tối ưu6; lặp từ0 cho1,1.5,1.95,2.355; chỉ số vòng tính toán khác thời điểm hành động |
| 13.4 | Chuyển tiếp thường chưa biết; chỉ có dữ liệu tương tác | MLE từng hàng khi lấy mẫu phù hợp; xác suất quỹ đạo; mục tiêu Bellman từ mẫu | Thăm dò và bao phủ; mô hình ước lượng khác môi trường thật; không chuyển bảo đảm VI sang Q-learning |

Hình robot-mdp.svg phân biệt trạng thái tròn với ô hành động. Hình value-iteration.svg cho hai nhánh Bellman, điểm bất động và dãy lặp. Cả hai có alt trong note và title/desc trong SVG; đoạn đọc hình nối với ví dụ cụ thể.

Hai tình huống cuối nội dung phải giải trọn vẹn và nhắc đủ dữ kiện; ít nhất một tình huống nêu giả thiết bị vi phạm. Bài tập gồm suy diễn, tính toán, kết nối AI và phản biện; phân biệt bài lớp30 phút với homework180 phút.

Mở bài nối với Bellman tất định07.49. Kết bài giữ câu hỏi về cách chọn mô hình và trạng thái đủ thông tin, dẫn sang biến ẩn và biểu diễn ở Bài14 trong kế hoạch. Không dạy lại Bayes, Lagrange hoặc toàn bộ lý thuyết tối ưu của các bài trước.
