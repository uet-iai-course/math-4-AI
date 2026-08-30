# Kiểm thử trình đọc tài liệu

## Markdown cơ bản

Văn bản có **nhấn mạnh**, danh sách và liên kết tới [trang học kỳ](../../index.html).

| Đại lượng | Giá trị |
|---|---:|
| Số chiều | $n$ |
| Chuẩn | $\lVert x\rVert_2$ |

## Công thức

Công thức nội dòng $f(x)=x^2$ và công thức khối:

$$
\nabla f(x)=2x.
$$

```text
Đoạn mã giữ nguyên ký hiệu $không-render$.
```

## Các khối nội dung

::: example Ví dụ tính được
Với $x=3$, ta có $f(x)=9$.
:::

::: derivation Suy diễn từng bước
Từ $f(x)=x^2$, dùng quy tắc lũy thừa để nhận $f'(x)=2x$.
:::

::: proof Chứng minh ngắn
Thay trực tiếp $x=3$ vào định nghĩa của $f$.
:::

::: exercise Câu hỏi kiểm tra
Tính $f(4)$.
:::

::: hint
Thay $x=4$ vào $x^2$.
:::

::: solution
$f(4)=4^2=16$.
:::

## Nội dung HTML phải bị vô hiệu hóa

<script>document.body.dataset.unsafe = "true";</script>

<img src="x" onerror="document.body.dataset.unsafe='true'" alt="Chuỗi kiểm thử không được thực thi"/>
