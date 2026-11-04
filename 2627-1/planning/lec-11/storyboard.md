# Mạch lập luận của ghi chú Bài 11

Tài liệu chỉ có ghi chú; đây là bảng kiểm mạch khái niệm, không phải storyboard trang chiếu.

| Mạch | Nhu cầu và trực giác | Ví dụ trước/đi cùng hình thức hóa | Đầu ra toán học | Diễn giải AI và giới hạn |
|---|---|---|---|---|
| 11.1 | Tham số ở Bài10 được cho trước; nay phải xác định từ dữ liệu | Rút có hoàn lại, bảy lần thành công trên mười | Mô hình, mẫu, ước lượng, likelihood, log-likelihood, MLE | Hàm mục tiêu tối ưu xuất phát từ mô hình; phụ thuộc làm tích likelihood sai |
| 11.2 | Một tần suất cần được biện minh | Bernoulli7/10 và các mẫu toàn0/toàn1 | Đạo hàm, độ cong, cực đại biên | Mất mát logarit; xác suất0 là nghiệm mẫu, không phải kết luận bất khả |
| 11.3 | Nhiều xác suất phải tổng bằng1 | Counts(2,3,5) | Lagrange, nghiệm trên mặt simplex | Phân loại nhiều nhóm và hiện tượng nhóm chưa thấy |
| 11.4 | Cảm biến có giá trị thực và độ phân tán chưa biết | Dữ liệu(0,1,2,3,4) | Phân rã tổng bình phương, mean/variance MLE, không chệch | Mất mát bình phương có nguồn gốc Gaussian; mẫu hằng làm likelihood không bị chặn |
| 11.5 | Hai cảm biến tương quan cần mô hình chung | Mean(10,20), covariance[[2.5,1.5],[1.5,2.5]] | Covariance MLE, kiểm hạng, eigenpairs, Mahalanobis | Euclid và Mahalanobis xếp hạng khác nhau; mẫu thẳng hàng và sai mô hình |

Bài10 cung cấp các họ phân phối và hiệp phương sai. Bài03 cung cấp nhân tử Lagrange; Bài05 cung cấp góc nhìn tối ưu hàm mất mát. Bài11 dùng các công cụ này để xây dựng nguyên lý ước lượng. Giới hạn còn lại là khớp mẫu chưa bảo đảm dự đoán tốt trên mẫu mới; Bài12 trong kế hoạch xử lý rủi ro và tổng quát hóa.

Mỗi mạch có chứng minh, ví dụ tính tay, giới hạn giả thiết và bài củng cố có gợi ý/lời giải. Hai tình huống áp dụng cuối phần nội dung nêu cả mô hình phù hợp và trường hợp giả thiết bị vi phạm. Mở rộng Bayes/KL được tách khỏi tuyến chính.
