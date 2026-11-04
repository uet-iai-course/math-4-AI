# Mạch khái niệm của ghi chú Bài 10

Đây là storyboard của ghi chú, không phải kế hoạch tạo slide.

| Mục | Nhu cầu, dữ kiện đầu vào | Công cụ và kết quả | Ví dụ, kiểm tra và giới hạn |
|---|---|---|---|
| 1 | Camera có bốn loại kết quả, cần xác suất lỗi | Không gian mẫu → biến cố → tiên đề → hợp/phần bù | Camera: đồng thời khác có điều kiện; BT10.1–10.2 |
| 2 | Đã có cảnh báo nhưng chưa biết nhãn | Điều kiện → nhân → toàn phần → Bayes; độc lập có điều kiện | Hai nhà cung cấp, lỗi và cảnh báo; BT10.3,10.5,10.6 |
| 3 | Cần mô tả nhãn và tín hiệu số | Biến ngẫu nhiên → PMF/CDF/PDF → Bernoulli/phân loại/Gaussian | Ngưỡng CDF, mật độ trên khoảng; BT10.4,10.7 |
| 4 | Cần trung bình chi phí và độ phân tán | Kỳ vọng và hàm biến → tuyến tính → phương sai/covariance → kỳ vọng toàn phần | Chỉ báo lỗi, phụ thuộc phi tuyến; BT10.7–10.9 |
| 5 | Nhà cung cấp không được quan sát | Đồng thời → lấy biên → có điều kiện → tổng trên biến ẩn | P(S,Y,A), hậu nghiệm nguồn hàng; BT10.6,10.8 |
| Cuối chương | Cần trả lời hai câu hỏi suy luận và chuẩn bị ước lượng | Tổng hợp Bayes và lấy biên, phân biệt mô hình/ước lượng/quyết định | Ba bài trên lớp, bốn bài tự học, lời giải phụ lục |

Các chứng minh và phép tính được đặt ngay sau kết quả. Giữ camera ở phần đã có, chuyển minh bạch sang sản phẩm lỗi ở Mục 2; không đổi bảng số của phần hiện có. Hình SVG tự tạo minh họa nhân theo nhánh và cộng lấy biên, không sao chép hình Murphy. Phần Gaussian nhiều chiều chỉ nêu mật độ và giả thiết, không chứng minh hình học của Bài11. Kết quả concentration Bài05c được dẫn và phát biểu lại chỗ cần dùng, không tái tạo chương đó.
