# Quy ước ghi chú bài giảng và bài tập

Mỗi bài dùng một thư mục `lec-NN/` với hai loại tài liệu công khai:

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

Tải và giải nén đầy đủ kho học phần, rồi nhấp mở `index.html` và chọn học kỳ, bài học. Có thể mở thẳng `2627-1/index.html`. Ghi chú và bài tập đọc được trực tiếp trong trình duyệt, không cần mạng hoặc máy chủ. Giữ nguyên cấu trúc thư mục và những tệp đi kèm, bao gồm CSS ở gốc kho.

Trên GitHub Pages (`github.io`), tiếp tục dùng cùng các trang chỉ mục và đường dẫn tương đối. Không cần cấu hình riêng hoặc CDN.

Nếu muốn xem qua máy chủ local, tại gốc kho chạy:

```text
python3 -m reloadserver 8765
```

URL có dạng:

```text
http://localhost:8765/2627-1/material-viewer.html?doc=materials/lec-03/lecture-note.md&deck=lecture-03-doi-ngau-lagrange.html
```

Khi mở bằng `file://`, trình đọc dùng bản sao Markdown trong `material-local-data.js` để tránh hạn chế đọc tệp của trình duyệt. Khi mở qua HTTP/HTTPS, trình đọc vẫn tải Markdown gốc. Cả hai chế độ đều bảo toàn công thức, chuyển Markdown, làm sạch HTML rồi render KaTeX bằng cùng quy trình.

### Cập nhật bản đọc trực tiếp

Markdown vẫn là nguồn biên soạn. Sau khi sửa tài liệu, người biên soạn chạy tại gốc kho:

```text
python3 2627-1/scripts/sync-local-materials.py
python3 2627-1/scripts/sync-local-materials.py --check
```

Commit `material-local-data.js` cùng tài liệu đã sửa. Người đọc không cần chạy lệnh này. Đây là bước đóng gói bản đọc trực tiếp theo yêu cầu hỗ trợ `file://`; không dùng Node.js hoặc trình sinh HTML. Bản sao chỉ chứa ghi chú và bài tập trong `materials/lec-NN/`, không chứa tài liệu lập kế hoạch.

Đường dẫn ảnh và liên kết nội bộ trong Markdown được giải quyết tương đối từ `material-viewer.html`, không phải từ vị trí tệp Markdown. Vì vậy, dùng dạng `img/lec-NN/<ten-tep>` cho tài sản của bài.

Không đặt công thức trong heading. Khi cần viết ký hiệu tiền tệ, đặt chuỗi tiền trong mã nội dòng để viewer không hiểu nhầm dấu `$` là phân cách công thức.

## Công bố

Chỉ đổi nhãn `Chưa có` trong `2627-1/index.html` thành liên kết sau khi tệp Markdown tồn tại, nguồn đã được kiểm tra và viewer đã vượt kiểm định trên màn hình rộng lẫn hẹp.
