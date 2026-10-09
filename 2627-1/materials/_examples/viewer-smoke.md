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

## Các môi trường giáo trình

::: definition Định nghĩa 99.1 (Hàm lồi)
Hàm $f:\mathbb R^n\to\mathbb R$ là lồi nếu với mọi $x,y\in\mathbb R^n$ và mọi $\theta\in[0,1]$, ta có $f(\theta x+(1-\theta)y)\le\theta f(x)+(1-\theta)f(y)$.
:::

::: theorem Định lý 99.2 (Điều kiện bậc nhất)
Nếu $f$ khả vi trên $\mathbb R^n$ thì $f$ lồi khi và chỉ khi

$$
f(y)\ge f(x)+\nabla f(x)^\top(y-x),\qquad \forall\, x,y\in\mathbb R^n.
$$
:::

::: proposition Mệnh đề 99.3
Tổng của hai hàm lồi $f$ và $g$ là hàm lồi: $(f+g)(x)=f(x)+g(x)$.
:::

::: lemma Bổ đề 99.4
Với mọi $a,b\ge 0$, ta có $ab\le\tfrac12(a^2+b^2)$.
:::

::: corollary Hệ quả 99.5
Nếu $\nabla f(x^\star)=0$ và $f$ lồi khả vi thì $x^\star$ là điểm cực tiểu toàn cục của $f$.
:::

::: remark Nhận xét 99.6
Hàm $f(x)=|x|$ lồi nhưng không khả vi tại $x=0$, nên Định lý 99.2 không áp dụng trực tiếp tại điểm đó.
:::

::: algorithm Thuật toán 99.7 (Hạ gradient)
Đầu vào: điểm đầu $x_0\in\mathbb R^n$, bước $\eta>0$, số vòng $T$.

1. Với $k=0,1,\dots,T-1$, tính $g_k=\nabla f(x_k)$.
2. Cập nhật $x_{k+1}=x_k-\eta\,g_k$.
3. Trả về $x_T$.
:::

::: application Tình huống áp dụng 99.1 (Hồi quy tuyến tính)
Mất mát bình phương $L(w)=\tfrac1m\lVert Xw-y\rVert_2^2$ với $X\in\mathbb R^{m\times n}$ là hàm lồi theo $w$, nên Hệ quả 99.5 áp dụng cho nghiệm của $X^\top Xw=X^\top y$.
:::

::: theorem
Khối không có tiêu đề riêng hiển thị nhãn mặc định; ví dụ $1+1=2$.
:::

## Nội dung HTML phải bị vô hiệu hóa

<script>document.body.dataset.unsafe = "true";</script>

<img src="x" onerror="document.body.dataset.unsafe='true'" alt="Chuỗi kiểm thử không được thực thi"/>
