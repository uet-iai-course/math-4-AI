# Quy ước ghi chú bài giảng và bài tập

Mỗi bài dùng một thư mục `lec-NN/` với tối đa hai tệp công khai:

- `lecture-note.md`: ghi chú bài giảng mở rộng nội dung của bộ trang chiếu;
- `exercises.md`: bộ bài tập riêng của buổi học.

Sao chép mẫu tương ứng từ `_templates/` khi bắt đầu một tài liệu. Tệp phải bắt đầu bằng heading cấp một. Trong Markdown, chỉ dùng `$...$` cho công thức nội dòng và `$$...$$` cho công thức khối.

## Khối nội dung

Trình đọc hỗ trợ sáu khối không lồng nhau:

```markdown
::: example
Nội dung ví dụ.
:::
```

Thay `example` bằng `derivation`, `proof`, `exercise`, `hint` hoặc `solution`. Có thể đặt tiêu đề sau tên khối, chẳng hạn `::: proof Chiều thuận`. Hai khối `hint` và `solution` được hiển thị dưới dạng nội dung gập.

## Xem cục bộ

Tại gốc kho, chạy:

```text
python3 -m reloadserver 8765
```

URL có dạng:

```text
http://localhost:8765/2627-1/material-viewer.html?doc=materials/lec-03/lecture-note.md&deck=lecture-03-doi-ngau-lagrange.html
```

Không mở viewer bằng `file://`, vì trình duyệt thường chặn yêu cầu tải Markdown cục bộ.

Đường dẫn ảnh và liên kết nội bộ trong Markdown được giải quyết tương đối từ `material-viewer.html`, không phải từ vị trí tệp Markdown. Vì vậy, dùng dạng `img/lec-NN/<ten-tep>` cho tài sản của bài.

Không đặt công thức trong heading. Khi cần viết ký hiệu tiền tệ, đặt chuỗi tiền trong mã nội dòng để viewer không hiểu nhầm dấu `$` là phân cách công thức.

## Công bố

Chỉ đổi nhãn `Chưa có` trong `2627-1/index.html` thành liên kết sau khi tệp Markdown tồn tại, nguồn đã được kiểm tra và viewer đã vượt kiểm định trên màn hình rộng lẫn hẹp.
