# Mạch khái niệm Bài 12

Ghi chú có4mạch, không có trang chiếu.

| Mạch | Nhu cầu→trực quan→ví dụ | Hình thức và chứng minh | Ứng dụng/giới hạn và bài tập |
|---|---|---|---|
|12.1|Dự đoán đầu ra thực từx; nhiễu quanhmean;3cặp(0,1),(1,2),(2,2)|Hợp lý có điều kiện→NLLGaussian→squaredloss; phương trìnhchuẩn vàfullrank|Thay mô hình nhiễu đổi mất mát;SSE0+varianceunknown không cóMLE; củng cố/E12.1|
|12.2|Nhãn0/1; đầu vào ảnh hưởngprobability;2điểm±1|Hợp lýBernoulli→BCE, sigmoid;separability nofiniteMLE|Confidence khác decisionthreshold; giảmtrainCE không chứng minh giảmtestrisk; củng cố/E12.2|
|12.3|Nhiều nghiệmkhớp4mẫu nhưng dự đoánkhác|Populationrisk vs empiricalrisk,ERM;R(ht)=abs(t)/2,zeroERM(-.2,.3]|Hìnhthreshold-risks.svg; cố địnhh khác hchọn bằng dữliệu; củng cố/E12.3|
|12.4|Chọnh trênmẫu cần kiểmsoát nhiều ứngviên; classcomplexity|PAC,finiteH Hoeffding+union,2epsilon+eta;shattering vàVC1D1/2|Hìnhvc-one-dimensional.svg, cùnginput1D nhưng lớp khác; boundchỉ cho loss có điều kiện; approximation+estimation+optimization; củng cố/E12.4|

Mở bài nhắc Mệnh đề11.3: tối ưu likelihood xác định mục tiêu tính được. Hồi quy/logistic mở rộng sang tham số có điều kiện. Ví dụthreshold dẫn đến nhu cầu hội tụ đều;VC1D mô tả độ linh hoạt của lớp thay vì số chiều dữ liệu. Kết nối tối ưu các bài03–06 với thống kê: giảm sai số tối ưu thực nghiệm chỉ xử lý một thành phần. Bài13 trong kế hoạch tiếp tục sang quyết định có hậu quả dài hạn.

Hai tình huống ứng dụng cuối nội dung cần giải trọnvẹn; một tình huống có giả thiết bị vi phạm. Bốn dạng homework: suy diễn,tính toán,kết nốiAI,phảnbiện; ba mức nhận biết/tính-toán-chứng-minh/vận-dụng. Hình tự tạo và nội dung tiếng Việt; mọi ví dụ/tình huống nhắc dữ kiện tại chỗ.
