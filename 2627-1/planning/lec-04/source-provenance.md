# Truy nguyên nguồn Bài giảng04

## Kiểm chứng bản lập kế hoạch 2026-09-24

Kiểm kê hiện hành đọc đúng các tệp dưới; vai trò, vị trí đã đọc, URL và giới hạn quyền dùng ở source-map.md. ST là bản tải tạm để đối chiếu, không phải tài sản của bộ trang chiếu. Không có nguồn MIT tải mới trong lần này.

| Mã | Đường dẫn đọc | Kích thước byte | SHA-256 |
|---|---|---:|---|
| DC | `sources/UET_Đề cương học phần_UET.AI2012_Cơ sở toán học của Trí tuệ nhân tạo_7460108.01.24.2506 (3).docx` | 1677068 | `b8e5b9fb29a33d169f5a17b3c9ee08118077013d85b9d7461e721f1d909b6ec7` |
| M16 | `sources/b9e5d6e835bcd8071edc67771e5362e7_MIT6_079F09_lec16.pdf` | 498331 | `bfacc5ec5826b58fbb30435e91a80f9e4ce26ecbd68b07b695b4ab4b9b18ee8d` |
| M17 | `sources/4c428302acfe82bee62cf037829a8abd_MIT6_079F09_lec17.pdf` | 183694 | `c095477564ed820a1b4d813a0d729ec44d5c85fa39c070f2bc82913b7eab0b36` |
| BV | `sources/bv_cvxbook.pdf` | 6881335 | `40d976c83c18cce1900eff8c41bd5ad408c102b813af39d05ff85678ccf8d76e` |
| ST | `/tmp/lec04-stanford-hd.pdf` | 1735601 | `6526aed198647f05f4a7afb96d1ec6b5b37b3edb323d7276bab45192969fde1b` |

## Lịch sử trước 2026-09-24

Phần dưới mô tả bản HTML40trang cũ; không chứng nhận bản dàn bài46trang đã triển khai.

# Ghi chú nguồn MIT cho Bài giảng 04

## Quyết định nguồn

- Dùng MIT 6.079 / 6.975, Fall 2009, Lecture 16 của Stephen Boyd làm mẫu thứ tự và nguồn nội dung cho tối ưu không ràng buộc, tìm kiếm đường, gradient, Newton và hàm tự điều chỉnh.
- Dùng Lecture 17 của cùng khóa học làm mẫu thứ tự và nguồn nội dung cho khử đẳng thức, hệ Newton–KKT, Newton khởi đầu khả thi và không khả thi.
- Nguồn hiện có đã bao phủ đúng hai cụm của kế hoạch Bài 04; không có khoảng trống cụ thể cần một tài nguyên MIT OCW khác, nên không tải thêm.

## Định danh và toàn vẹn tệp

| Tài nguyên | Bản cục bộ chuẩn | Kích thước | SHA-256 | Bản trùng |
|---|---|---:|---|---|
| Lecture 16: Unconstrained minimization | `sources/b9e5d6e835bcd8071edc67771e5362e7_MIT6_079F09_lec16.pdf` | 498331 byte | `bfacc5ec5826b58fbb30435e91a80f9e4ce26ecbd68b07b695b4ab4b9b18ee8d` | `sources/b9e5d6e835bcd8071edc67771e5362e7_MIT6_079F09_lec16 (1).pdf` và `sources/lecture16-unconstrained -opt.pdf` có cùng kích thước, checksum |
| Lecture 17: Equality constrained minimization | `sources/4c428302acfe82bee62cf037829a8abd_MIT6_079F09_lec17.pdf` | 183694 byte | `c095477564ed820a1b4d813a0d729ec44d5c85fa39c070f2bc82913b7eab0b36` | Không phát hiện bản trùng trong `sources/` |

Tên, tác giả và nội dung đầu tệp khớp metadata PDF và trang tài nguyên MIT OCW. Ngày tải ban đầu của các bản cục bộ chưa xác minh; ngày kiểm tra nguồn là 2026-08-28.

## URL và quyền sử dụng

- Khóa học: `https://ocw.mit.edu/courses/6-079-introduction-to-convex-optimization-fall-2009/`.
- Lecture 16: `https://ocw.mit.edu/courses/6-079-introduction-to-convex-optimization-fall-2009/resources/mit6_079f09_lec16/`.
- Lecture 17: `https://ocw.mit.edu/courses/6-079-introduction-to-convex-optimization-fall-2009/resources/mit6_079f09_lec17/`.
- Điều khoản: `https://ocw.mit.edu/pages/privacy-and-terms-of-use/`.
- Giấy phép được công bố: Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International, CC BY-NC-SA 4.0.

Lecture 04 được phép tham khảo và chuyển thể trong phạm vi phi thương mại khi ghi công và chia sẻ tương tự. Nội dung sẽ được diễn giải bằng tiếng Việt; hình, đồ thị và sơ đồ kỹ thuật phải được tự vẽ lại, ghi nguồn và nêu thay đổi. Không mặc định giấy phép khóa học bao phủ tài sản bên thứ ba; không sao chụp hoặc dùng trực tiếp tài sản có quyền riêng khi chưa xác minh.

## Tài sản bản triển khai 46 trang — 2026-09-24

Mười lăm SVG được tự dựng từ công thức và ba ví dụ số đã chốt; tham khảo ý nghĩa hình học trong Boyd–Vandenberghe, Chương 9–10 và MIT Lecture 16–17. Không cắt ảnh tài liệu, không giữ tài sản raster hoặc dùng hình như số liệu thực nghiệm. Đường dẫn dưới là các tài sản thực sự được HTML sử dụng; các tài sản cũ không dùng không bị xóa trong nhiệm vụ này.

| Đường dẫn | SHA-256 |
|---|---|
| `2627-1/img/lec-04/armijo-window.svg` | `daa5182df5e0862651fccaf8bc887963a870282c289168224295a4a47bd69a92` |
| `2627-1/img/lec-04/descent-directions.svg` | `511f0fb9af1d8d0fb4a843bff1e444258225125dde69512a155d32c8f2a056a1` |
| `2627-1/img/lec-04/equality-feasible-step.svg` | `339546f1de397ade4d278a1369a4515d0d28132f9fedb1ee0e02ed0c3331c3d8` |
| `2627-1/img/lec-04/equality-infeasible-start.svg` | `9db5521c07cd95ea511a6c8a90e8b49b30f9da5789949509c007f868c01e81e9` |
| `2627-1/img/lec-04/equality-start-new.svg` | `bb7a155920e7ff40319d72ea75fbf342027ed819a411dd3680dbd6aeade645ba` |
| `2627-1/img/lec-04/equality-violation.svg` | `87b996df9648c7ac80521fc5e37cbae4030d278d9d6880624c98a3139a14678b` |
| `2627-1/img/lec-04/euclidean-unit.svg` | `01a5c746572e83d028a51dc5f7274e203b5314a8feb42d569a55c206da63b84b` |
| `2627-1/img/lec-04/gradient-fixed-step.svg` | `7e59ca664b0d9605f2a444eec6f50ea8bda0a008e52ebacc87b2fa72b1d4b177` |
| `2627-1/img/lec-04/log-curvature.svg` | `0a5bbd16e5f4acdfd2f78574b26d5e19cf9e5cb5627f9cdacd559f2683be05c4` |
| `2627-1/img/lec-04/metric-transform.svg` | `8aedf44fb48b2150cdb7b595acf210470b2b76bab63a0d7638fa495659c69552` |
| `2627-1/img/lec-04/phi-newton.svg` | `30d374b764e5f9c33bbbd8dfeba1a8cfae113cb4122f16b407f9cfcb3445d178` |
| `2627-1/img/lec-04/quadratic-local-model.svg` | `7e1dc36c884cd83fced8526a72130102d13091554e6aa2f77739c05c1b49b3b0` |
| `2627-1/img/lec-04/quadratic-start.svg` | `75b4d7da7d0613a56da9f58fe10cf3c2f069d14f54bbabe2a5433d123c183279` |
| `2627-1/img/lec-04/self-concordance-equality.svg` | `42ca48db109ca943f3688b0d95dd754558230af342ae1fde52a8beaae921a4c1` |
| `2627-1/img/lec-04/weighted-unit.svg` | `1dc2ee2362e3db9414641034d160ae6ac04d346575ebc86a3b63b5edbf4ec52e` |
