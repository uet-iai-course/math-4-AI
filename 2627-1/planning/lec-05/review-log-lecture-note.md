# Nhật ký rà soát Bài 05 — ghi chú bài giảng viết lại theo tiêu chuẩn giáo trình

Tệp sản phẩm: `materials/lec-05/lecture-note.md` (viết lại hoàn toàn, ghi đè bản cũ 5 961 từ; bản cũ còn trong git). Hình mới: `img/lec-05/spectral-radius.svg`, `img/lec-05/ill-conditioned-runs.svg`, `img/lec-05/symmetric-vs-random-fit.svg`. Lượt 2 đổi nhãn ba hình dùng chung với deck; lượt 3 hoàn nguyên ba hình đó theo quyết định điều phối viên, nên `two-hidden-units.svg`, `critical-points.svg`, `linear-chain.svg` không bị sửa. Bản đóng gói `material-local-data.js` được cập nhật bằng `scripts/sync-local-materials.py`. Bộ trang chiếu, `exercises.md`, ghi chú 05b, 05c, CSS, viewer và `index.html` không bị sửa. Chưa commit.

## Tác tử

| Vai | Loại tác tử | Mô hình | Effort | Ghi chú |
|---|---|---|---|---|
| Soạn (authoring), lượt 1 | general-purpose | Claude Opus 5.5 (`claude-opus-5-5`) | high | Theo brief của điều phối viên Fable 5.1 ngày 2026-10-10; tác tử tự ghi dòng này, điều phối viên đối chiếu với lời gọi công cụ. |
| Rà toán (math accuracy), lượt 1 | general-purpose | Claude Opus 5.5 (`claude-opus-5-5`) | high | Chỉ đọc; theo ghi nhận của điều phối viên, báo cáo được đối chiếu và hợp nhất vào mục "Phát hiện lượt 1". |
| Rà mạch truyện (storyline), lượt 1 | general-purpose | Claude Opus 5.5 (`claude-opus-5-5`) | high | Chỉ đọc; như trên. |
| Chỉnh sửa (editor), lượt 2 | general-purpose (cùng tác tử soạn, tiếp tục qua SendMessage) | Claude Opus 5.5 (`claude-opus-5-5`) | high | Áp dụng quyết định "yêu cầu sửa" lượt 1; tác tử tự ghi dòng này. |
| Chỉnh sửa, lượt 3 | general-purpose (cùng tác tử, tiếp tục qua SendMessage) | Claude Opus 5.5 (`claude-opus-5-5`) | high | Áp dụng quyết định "chấp nhận sau sửa" lượt 2; tác tử tự ghi dòng này. |
| Rà lại bản lượt 3, vòng 1 | general-purpose | Claude Opus 5.5 (`claude-opus-5-5`) | high | Chỉ đọc; theo ghi nhận của điều phối viên, báo cáo được đối chiếu và hợp nhất vào mục "Phát hiện lượt 3". Điều phối viên đối chiếu loại, mô hình và effort với lời gọi công cụ. |
| Rà lại bản lượt 3, vòng 2 | general-purpose | Claude Opus 5.5 (`claude-opus-5-5`) | high | Chỉ đọc; như trên. |
| Chỉnh sửa, lượt 4 | general-purpose (cùng tác tử, tiếp tục qua SendMessage) | Claude Opus 5.5 (`claude-opus-5-5`) | high | Áp dụng quyết định "chấp nhận sau sửa nhẹ" lượt 3; tác tử tự ghi dòng này. |

Kỹ năng `no-ai-slop` được nạp bằng công cụ `Skill` (chế độ Edit) trước khi soạn; tự đối chiếu `eval.md` ở mục "Tự kiểm `no-ai-slop`".

## Quyết định của điều phối viên

| Lượt | Đầu ra | Quyết định | Lý do |
|---|---|---|---|
| 1 | Bản soạn 32 180 từ (`wc -w`), 134 khối | yêu cầu sửa | Một mục nghiêm trọng A1 và các mục trung bình B1–B11, cùng nhóm no-ai-slop C. Độ dài chấp nhận khoảng 31 500 từ: cắt sâu hơn phá bước 4–5 của các khái niệm trọng tâm; không cắt Mệnh đề 05.2, Bổ đề 05.20(b)(d), chiều cần của Định lý 05.21/05.23, bảng tanh bốn lớp, biến thể phân kỳ của Tình huống 05.2; gói cắt được duyệt nêu ở "Phát hiện lượt 1". |
| 2 | Bản chỉnh sửa 33 608 từ, 134 khối | chấp nhận sau sửa | Hai việc: hoàn nguyên ba hình dùng chung vì đổi nhãn làm hình lệch với 7 trang deck, sửa deck ngoài phạm vi; áp dụng danh sách ứng viên cắt khoảng 1 500 từ với điều kiện giữ đủ tám bước và các phần đã giữ, đích khoảng 32 000 từ. |
| 3 | Bản sửa 33 403 từ, 133 khối | chấp nhận sau sửa nhẹ | Độ dài 33 403 từ được chấp nhận vì cắt thêm phá tám bước; không cắt thêm. Một lỗi KaTeX (`\nuZ_0` ở Bổ đề 05.20(d)) và 17 mục nhẹ, nêu ở "Phát hiện lượt 3". |
| 4 | Bản sửa 33 604 từ, 133 khối | chấp nhận | Điều phối viên Fable 5.1 xác nhận hai tác tử rà lại lượt 3 là general-purpose, Claude Opus 5.5 (`claude-opus-5-5`), effort high (theo lời gọi SendMessage của điều phối viên); kiểm lại tệp: không còn `\nuZ`; Playwright 1600×900 và 390×844 với phép đếm mới `.katex [style*="rgb(204, 0, 0)"]`: 0 chữ đỏ, 0 `.katex-error`, 0 lỗi trang, 133/133 khối, 18/18 hình, không tràn ngang; `sync --check` và `git diff --check` sạch. Độ dài 33 604 từ được chấp nhận vì các phần còn lại đều thuộc tám bước của khái niệm trọng tâm. Ba SVG dùng chung với deck giữ nguyên bản gốc; lệch ký hiệu hình–ghi chú giải thích tại chỗ, chờ sửa deck. Ghi chú này thay thế bản cũ `materials/lec-05/lecture-note.md` khi commit, theo yêu cầu người dùng 2026-10-10. Bài học cho các bài sau: phép kiểm KaTeX phải đếm cả chữ đỏ, vì lệnh không tồn tại không sinh `.katex-error`. |

## Số liệu của bản lượt 4

- 33 604 từ (`wc -w`), tăng 201 từ so với lượt 3, do các mục 4, 5, 6, 14, 15 của "Phát hiện lượt 3" (điều kiện không suy biến, ma trận khối và phân tích Glorot hai lớp đặt trên dòng riêng); không cắt thêm theo quyết định lượt 3.
- 133 khối mở = 133 đóng, không lồng; năm bộ đếm không đổi (05.1–05.40, Ví dụ 05.1–05.30, Bài tập 05.1–05.12, Tình huống 05.1–05.3, Thuật toán 05.1–05.3).
- 21 `proof`, 12 `hint`, 12 `solution`; 18 hình; 3 350 `.katex`, 0 `.katex-error`, 0 phần tử chữ đỏ.

## Số liệu của bản lượt 3

- 33 403 từ (`wc -w`); 133 khối mở = 133 đóng, không lồng.
- Bộ đếm chung 05.1–05.40 không đổi; Ví dụ 05.1–05.30 (bỏ Ví dụ 05.14 lượt 2, đánh số lại theo bảng dưới); Bài tập 05.1–05.12 không đổi; Tình huống, Thuật toán không đổi.
- 21 `proof`, 12 `hint`, 12 `solution`; 18 hình; 3 338 `.katex`, 0 lỗi.

## Số liệu của bản lượt 2

- 33 608 từ (`wc -w`), 2 947 dòng; 134 khối mở = 134 đóng, không lồng.
- Bộ đếm chung 05.1–05.40 không đổi (7 định nghĩa, 4 định lý, 13 mệnh đề, 1 bổ đề, 3 hệ quả, 12 nhận xét). Ví dụ 05.1–05.31 không đổi số hiệu (Ví dụ 05.3 và 05.26 dời vị trí, giữ số). Bài tập 05.1–05.12 (9 trong mục, 3 củng cố), đánh số lại theo bảng dưới.
- 21 `proof`, 12 `hint`, 12 `solution`; 18 hình; bảng ký hiệu 23 dòng (thêm $Q,\Lambda$ và $F$); 12 đoạn "Trong học máy".
- KaTeX 3 334 phần tử, 0 lỗi.

## Số liệu của bản lượt 1

- 32 180 từ (`wc -w`), 2 827 dòng; 134 khối `:::` mở, 134 dòng `:::` đóng, không lồng.
- Bộ đếm chung 05.1–05.40: 7 định nghĩa, 4 định lý, 13 mệnh đề, 1 bổ đề, 3 hệ quả, 12 nhận xét.
- Bộ đếm riêng: Ví dụ 05.1–05.31; Bài tập 05.1–05.12 (9 trong mục, 3 củng cố, một bài cho mỗi mức); Tình huống 05.1–05.3; Thuật toán 05.1–05.3.
- 21 khối `proof`, 12 `hint`, 12 `solution`; 18 hình (15 SVG có sẵn của bộ trang chiếu, 3 SVG mới).
- Bảng ký hiệu 21 dòng; 11 đoạn "Trong học máy"; 5 "Chuỗi suy luận của mục" cùng một chuỗi của toàn chương; 5 "Kết mục".
- Công thức đánh số: (1.1)–(1.5), (2.1)–(2.5), (3.1)–(3.6), (4.1)–(4.6).

## Cấu trúc chương và ánh xạ với bộ trang chiếu

| Mục | Mạch của bộ trang chiếu | Nội dung chính |
|---|---|---|
| 1. Bài toán huấn luyện và tiêu chí đánh giá | A | Định nghĩa 05.1, Mệnh đề 05.2 (khoảng cách $J$–$R$ của mô hình hằng), Định nghĩa 05.4, Mệnh đề 05.5 (xác thực không chệch, lạc quan khi chọn), Định nghĩa 05.7, Mệnh đề 05.8 (phân loại điểm dừng) |
| 2. Ước lượng gradient và hạ gradient ngẫu nhiên | B | Định nghĩa 05.10, Định lý 05.11, Hệ quả 05.12, Mệnh đề 05.14 (kỳ vọng mất mát sau một bước, ngưỡng cỡ nhóm (2.5)), Thuật toán 05.1, Ví dụ 05.15 (sai số bình phương trung bình chính xác), Nhận xét 05.16 (phát biểu lại T5, T8 của Bài 05b) |
| 3. Phương pháp momentum và Nesterov | C | Mệnh đề 05.17 (điều kiện co $0<\eta<2/L$), Thuật toán 05.2, Mệnh đề 05.18, Bổ đề 05.20, Định lý 05.21 (momentum là hệ tuyến tính hai biến, miền $0<\eta L<2(1+\beta)$), Hệ quả 05.22 (tham số Polyak), Thuật toán 05.3, Định lý 05.23 (Nesterov, miền $0<\eta L<2(1+\beta)/(1+2\beta)$, hệ số $1-1/\sqrt\kappa$) |
| 4. Khởi tạo tham số mạng nơ ron | D | Định nghĩa 05.25, Mệnh đề 05.26, Định nghĩa 05.27, Định lý 05.28 (đối xứng bảo toàn, quy nạp theo vòng lặp), Hệ quả 05.29, Mệnh đề 05.31, 05.32, 05.34, 05.35, Định nghĩa 05.36 (Glorot), Mệnh đề 05.37, 05.38 |
| 5. Phối hợp các thành phần của quy trình huấn luyện | E | Bảng bốn quyết định, Nhận xét 05.40 (điều mà mỗi kiểm tra chứng nhận), Ví dụ 05.31 (chẩn đoán) |

## Phát hiện lượt 1 và cách xử lý

Các mục do điều phối viên hợp nhất từ báo cáo rà toán và rà mạch truyện, đã đối chiếu với tệp. Vị trí ghi theo số hiệu lượt 1. Không xóa phát hiện nào.

| # | Mức độ | Vị trí (lượt 1) | Vấn đề | Cách xử lý (lượt 2) | Trạng thái |
|---|---|---|---|---|---|
| A1 | nghiêm trọng | Ví dụ 05.31 "Khởi tạo"; mở Mục 5; "Trong học máy" sau Ví dụ 05.25 | Định nghĩa 05.27 đòi cả $(w,c,a)$ bằng nhau, dữ kiện chỉ cho lớp vào hằng | Thêm dữ kiện lớp ra $128\to10$ cũng hằng $0{,}01$ (cột bằng nhau) ở Ví dụ 05.31 và mở Mục 5; "Khởi tạo" nêu Định lý 05.28 cho hai đơn vị, một đầu ra, mở rộng bằng cùng lập luận; "Trong học máy" viết lại: trọng số vào, độ lệch, trọng số ra bằng nhau, mở rộng $n$ đơn vị và nhiều đầu ra khi các cột lớp sau bằng nhau, kết luận đúng chính xác với Thuật toán 05.1–05.3 hoặc mọi quy tắc xử lý mọi tọa độ như nhau, khi không có nhiễu riêng từng đơn vị | đã sửa |
| B1 | trung bình | Nhận xét 05.30 | Dùng Mệnh đề 05.8 cho ReLU, $J\notin C^2$ | Tách hai trường hợp. Tanh: Hessian khối $\begin{bmatrix}0&0&-\overline{xy}\\0&0&-\bar y\\-\overline{xy}&-\bar y&0\end{bmatrix}$, giá trị riêng $0,\pm\sqrt{\overline{xy}^2+\bar y^2}=\pm\tfrac43\sqrt2\approx\pm1{,}886$ với dữ liệu Tình huống 05.3 (kiểm bằng sai phân hữu hạn, các khối hai đơn vị không liên kết), Mệnh đề 05.8(c). ReLU: hướng $w_j=0$, $a_j=c_j=\tau$, $J(\tau)=1-\tfrac83\tau^2+2\tau^4$, $J(0{,}3)\approx0{,}776<1$ (kiểm số); $\sum y_i<0$ dùng $a_j=-\tau$; gradient bằng $0$ với mọi quy ước $\phi'(0)$ | đã sửa |
| B2 | trung bình | "Trong học máy" §4.4; mục Ứng dụng; sau Nhận xét 05.24 | Khẳng định về thư viện quá rộng | Thay bằng "Một số thư viện, chẳng hạn Keras, dùng dạng đều của (4.5) làm mặc định cho lớp kết nối đầy đủ, không phụ thuộc hàm kích hoạt; thư viện khác dùng thang khác"; thêm đoạn "Cách cài đặt trong thư viện" vào Nhận xét 05.24 (tham số hóa lưu điểm dự báo, đổi biến $\theta\mapsto\theta+\beta v$) | đã sửa |
| B3 | trung bình | Mệnh đề 05.17; mục tiêu 3 | Thuật ngữ lần đầu | "lồi chặt (còn gọi là lồi nghiêm ngặt)" ở lần đầu (đoạn dẫn Mệnh đề 05.17); "hạ gradient ngẫu nhiên (stochastic gradient descent, SGD)" ở mục tiêu 3 | đã sửa |
| B4 | trung bình | Nhiều chỗ | Một chữ nhiều nghĩa | $e$ cơ số → $\mathrm e$; hằng số $C_i$, $C$ → $\Omega_i$, $\Omega$; chỉ số tổng $s$ ở (3.2), Mệnh đề 05.18 → $t'$; sigmoid $\sigma(s)$ → $\sigma(\varsigma)$; hướng $d$, $u$ ở Mệnh đề 05.8, Bài tập 05.2 → $\Delta$; $a_t$ ở Ví dụ 05.15, Bài tập 05.4 → $\mathrm{MSE}_t$; $v(\theta)$ → $V_\ell(\theta)$; dãy của Bổ đề 05.20 và tọa độ trong chứng minh Định lý 05.21, 05.23 → $Z_t$, bỏ $\upsilon$ (tọa độ vận tốc viết $Z_t-Z_{t-1}$); Ví dụ 05.20, 05.22, Tình huống 05.2 dùng $Z_t=[\chi_t]_1$ hoặc $[\chi_t]_i$; Bài tập 05.5 dùng biến $\theta$; hệ số Glorot $F$, $G$ → viết thẳng $n_{\rm in}s^2$, $n_{\rm out}s^2$ (Mệnh đề 05.37, Ví dụ 05.29, Bài tập 05.8); $m$ → $\mathbb EY$ trong chứng minh Mệnh đề 05.2, chỉ số tập xác thực → $i$; biến tích phân và biến giả ở Mệnh đề 05.31, 05.37 → $\varsigma$, $\varpi$ chỉ còn là góc; thêm $Q$, $\Lambda$, $F$ vào bảng; gọi tên $\mathrm i$, góc, $\mathbf 1\{\cdot\}$ tại chỗ; thêm số phức và môđun vào Kiến thức tiên quyết | đã sửa |
| B5 | trung bình | Bốn hình | Thiếu đoạn đọc | Thêm đoạn đọc cho `step-noise`, `linear-chain`, `tanh-saturation`, `variance-forward` | đã sửa |
| B6 | trung bình | Ba SVG | Nhãn lệch ký hiệu | Gắn nhãn lại: `two-hidden-units.svg` ($w_j, c_j$; title), `critical-points.svg` ($\psi(u_1,0)$, $\psi(0,u_2)$, trục $u_1,u_2$, $\omega(u)$), `linear-chain.svg` ($\gamma_1..\gamma_4$); bỏ ba câu "Trên hình…"; câu đọc `critical-points` nêu $\omega$ chỉ có biến $u$. Đã mở deck ở A06, D01, D04, D05 bằng Playwright 1600×900: hình nạp đủ, nhãn không tràn, không chồng, 0 pageerror (ảnh `deck-A06.png`, `deck-D01.png`, `deck-D05.png` đã xem). Hình dùng chung đã đổi nhãn; deck cần cập nhật ký hiệu ở mặt trang và ghi chú diễn giả (grep ở mục "Lệch với bộ trang chiếu") | lượt 2 đã đổi nhãn; lượt 3 hoàn nguyên theo quyết định điều phối viên; lệch ký hiệu hình–ghi chú được giải thích tại chỗ bằng câu đối chiếu sau mỗi hình và trong `alt`; chờ sửa deck cùng lượt đổi ký hiệu. Kết quả kiểm deck ở lượt 2 không còn áp dụng. |
| B7 | trung bình | Nhận xét 05.9; đoạn sau bảng Mục 5.1; "Trong học máy" §1.4 | Tham chiếu sai | "Nhận xét 05.30 nêu lại đối xứng này"; bảng Mục 5.1 nối với "ba giả định ngầm của Bài 04 nêu ở đầu Mục 1"; bỏ Tình huống 05.3 khỏi câu "tính được bằng tay" | đã sửa |
| B8 | trung bình | §1.3, §4.2, §4.3 | Tám bước chưa đủ | §1.3: Ví dụ 05.3 dời lên trước Định nghĩa 05.4 (cột "mất mát trên dữ liệu giữ riêng"), thêm Bài tập 05.1(c) ($K=3$, kỳ vọng $1{,}775$, so $1{,}85$ của $K=2$), "Trong học máy" thêm rò rỉ dữ liệu và lệch phân phối. §4.2: đoạn quan hệ sau Định lý 05.28 (tập bất biến, so với Mục 3, dùng Mệnh đề 05.26, Hệ quả 05.29 lượng hóa). §4.3: Ví dụ 05.26 (bảng $\gamma=\tfrac12$, $2$) và hình dời lên trước Mệnh đề 05.32, câu quan hệ với Mệnh đề 05.26, đoạn "Trong học máy" cho 05.32, Bài tập 05.7 mới ($M=10$, $\gamma=0{,}9$: $0{,}349$; $M=44$; ReLU với $\gamma_1=-0{,}9$ cho độ nhạy $0$) | đã sửa |
| B9 | trung bình | Đoạn đọc sau Định lý 05.11, Mệnh đề 05.17, Định lý 05.21, 05.23; các ví dụ tính | Trình bày sáng sủa | Bốn đoạn đọc thành danh sách theo phần; mỗi phép tính một dòng ở Bài tập 05.5(a) và kiểm tra, Ví dụ 05.20 kiểm tra, Ví dụ 05.22 kiểm tra, Ví dụ 05.24, 05.25 vòng 1–2, Tình huống 05.3 kiểm tra, Tình huống 05.1 gradient tại nghiệm; câu nhiều ngoặc ở bảng ví dụ xuyên suốt, Hệ quả 05.12(c), "Trong học máy" §3.3, Nhận xét 05.33, Tình huống 05.1, kết chương tách câu | đã sửa |
| B10 | trung bình | Nhiều chỗ | Toán, nhẹ | Định lý 05.11 điều kiện áp dụng (đều cho cả hai, độc lập thêm cho kết luận hai); Định lý 05.21 Bước 5 thêm nghiệm kép bằng $0$ ($\beta=0$, $\eta\lambda_i=1$), cận với $\Omega_i=\lvert A\rvert+\lvert B\rvert+\lvert Z_0\rvert$; Định nghĩa 05.7 thêm cực tiểu địa phương chặt; "nửa phương sai thực nghiệm, tức phương sai tính với mẫu số $N=3$"; Tình huống 05.3 Diễn giải nêu quan sát $x=-1$ trong vùng $z_j<0$; Tình huống 05.2 Diễn giải "Nesterov chọn bước học chỉ từ $L$; cả hai cần $\mu$ để chọn $\beta$" | đã sửa |
| B11 | trung bình | Bài tập 05.7(c), 05.8 (lượt 1) | Khuôn trùng bài chính thức | 05.7(c) (nay 05.6(c)) đổi thành bài ngược: tìm $w_2$ để $\partial\ell/\partial w_1=\partial\ell/\partial w_2$ ($w_2=\pm0{,}5$), với $w_2=-0{,}5$ đạo hàm theo $a_j$ ngược dấu; 05.8 đổi thành bài ngược: cho hệ số tiến $1{,}5$ và $n_{\rm out}=100$, tìm $n_{\rm in}=300$, $s^2=0{,}005$, $\alpha\approx0{,}122$, hệ số lùi $0{,}5$, tích $0{,}75$, tiêu chí bình phương cho $s^2=0{,}004$; Bài tập 05.6 lượt 1 gộp thành 05.5(d). Bảng trùng lặp thêm Bài 3(2), 6(3) | đã sửa; `exercises.md` chờ xử lý |
| C | no-ai-slop | Nhiều chỗ | Câu dẫn, nhấn mạnh, nhãn không thống nhất | Bỏ "điều cần chú ý là"; bỏ "Định lý sau là kết quả chính của mục" ở §4.2; thay "Câu hỏi tiếp theo…" (hai chỗ) và "Mục kế tiếp chứng minh điều đó không phải ngẫu nhiên" bằng câu nêu thiếu hụt; "Nó khác $J$ ở quan hệ…"; "Mục 4.4 xác định thang này (Định nghĩa 05.36)"; bỏ hai câu "Mỗi giả thiết có vai trò riêng."; bỏ ẩn dụ "phiếu"; bỏ "Chính"; "kết luận đúng chính xác khi không có nhiễu riêng từng đơn vị"; thêm chủ ngữ ở Nhận xét 05.13; thống nhất nhãn "Trực giác, chưa phải phát biểu hình thức" (tám chỗ); "ví dụ xuyên suốt VD1 của Bài 04 (Ví dụ 04.2–04.7)"; $I\to\mathrm I$; kết chương nêu thứ tự đọc Bài 05c; bỏ colon reveal "Lý do cụ thể:" ở Tình huống 05.3 | đã sửa |
| D | quyết định độ dài | Toàn tệp | Gói cắt được duyệt | Đã cắt: khối "Tốc độ tiệm cận" của Ví dụ 05.22 (giữ bảng, Diễn giải dẫn các hệ số từ hình); "Một bước" và câu đầu "Phần cứng" của Nhận xét 05.15; Bài tập 05.6 lượt 1 gộp vào 05.5(d); ba câu "Trên hình…"; gạch đầu dòng hoán vị của Nhận xét 05.9 rút thành một câu dẫn Nhận xét 05.30; gạch đầu dòng 3 của Nhận xét 05.19; đoạn "Quy tắc cập nhật" của Ví dụ 05.31; mở Mục 4 rút còn một câu có số liệu ($\tfrac16$ và $0$ của Tình huống 05.3); chứng minh Mệnh đề 05.31 rút còn hai bước ngắn; bảng ánh xạ ở đầu "Bài tập củng cố" (giữ trong nhật ký). Kết quả 33 608 từ, vượt đích 31 500 khoảng 2 100 từ, do các bổ sung bắt buộc A1, B1, B5, B8 (hai bài tập, ba đoạn), B9 (danh sách theo dòng), B4 (số phức, bảng) thêm khoảng 2 300 từ | một phần; chờ điều phối viên |

## Bảng đổi số hiệu (lượt 1 → lượt 2)

Bộ đếm chung 05.1–05.40, Ví dụ 05.1–05.31, Tình huống, Thuật toán không đổi số hiệu.

| Lượt 1 | Lượt 2 | Đối tượng |
|---|---|---|
| Bài tập 05.1–05.5 | Bài tập 05.1–05.5 | 05.1 thêm câu (c); 05.5 thêm câu (d) Nesterov, đổi biến thành $\theta$ |
| Bài tập 05.6 | (gộp vào 05.5(d)) | Momentum và Nesterov từ trạng thái $(0{,}5;\,-1)$ |
| Bài tập 05.7 | Bài tập 05.6 | Mạng tanh; câu (c) đổi thành bài ngược |
| (mới) | Bài tập 05.7 | Chuỗi $M=10$, $\gamma=0{,}9$ và ReLU |
| Bài tập 05.8–05.12 | Bài tập 05.8–05.12 | 05.8 đổi thành bài ngược về Glorot |

## Lượt 3: hoàn nguyên hình và cắt độ dài

| # | Việc | Cách xử lý | Trạng thái |
|---|---|---|---|
| 1 | Hoàn nguyên ba hình dùng chung | `git checkout --` ba tệp; ba câu đối chiếu ký hiệu đặt lại sau `critical-points` ($s$, $r$, $u$, $v$ ứng với $\psi$, $\omega$, $u_1$, $u_2$), `two-hidden-units` ($b_j$ ứng với $c_j$), `linear-chain` ($c_k$ ứng với $\gamma_k$); `alt` viết theo nhãn trên hình kèm đối chiếu; câu đọc `critical-points` giữ ý $\omega$ chỉ có biến $u$ | đã sửa |
| 2a | Rút Nhận xét 05.6 và 05.40 | Gộp phân vai thành một câu; rút "Lỗi và mất mát", câu dẫn và mục 2 của 05.40 | đã sửa |
| 2b | Tình huống 05.1 | Bỏ hàng $b=4$; rút "Giới hạn" | đã sửa |
| 2c | Ví dụ 05.4 | Giữ: sau Mệnh đề 05.5 không còn ví dụ nào khác, nên bỏ sẽ mất bước ví dụ của kết quả này (điều kiện của điều phối viên) | không cắt |
| 2d | "Trong học máy" Mục 5.1, mục Ứng dụng | Rút | đã sửa |
| 2e | Ví dụ 05.14 | Bỏ khối; phép tính một bước tại nghiệm đưa vào đoạn mở Mục 2.6, hình `step-noise` đọc ngay sau đó; Ví dụ 05.15 cũ (nay 05.14) giữ bước ví dụ | đã sửa |
| 2f | Đoạn đọc sau Mệnh đề 05.37, đoạn quan hệ sau Định lý 05.28 | Rút còn một câu mỗi đoạn | đã sửa |
| 2g | "Giới hạn" Tình huống 05.2, 05.3 | Rút | đã sửa |
| 2h | Bài tập 05.12(d), 05.4 | Rút lời giải (d) và dòng kiểm tra của 05.4 | đã sửa |

Kết quả: 33 403 từ, giảm khoảng 200 từ so với lượt 2; ba câu đối chiếu ký hiệu khôi phục thêm khoảng 150 từ, và Ví dụ 05.4 được giữ. Không cắt thêm ngoài danh sách.

### Bảng đổi số hiệu ví dụ (lượt 2 → lượt 3)

| Lượt 2 | Lượt 3 | Đối tượng |
|---|---|---|
| Ví dụ 05.1–05.13 | Ví dụ 05.1–05.13 | không đổi |
| Ví dụ 05.14 | (bỏ) | Phương sai của một bước tại nghiệm |
| Ví dụ 05.15–05.31 | Ví dụ 05.14–05.30 | giảm một; mọi tham chiếu trong ghi chú đã cập nhật bằng script |

Trong các bảng của nhật ký ở trên, số hiệu ví dụ là số hiệu lượt 1 và lượt 2.

## Phát hiện lượt 3 và cách xử lý

| # | Mức độ | Vị trí | Vấn đề | Cách xử lý | Trạng thái |
|---|---|---|---|---|---|
| 0 | nghiêm trọng | Bổ đề 05.20(d) | `$Z_1=\nuZ_0$`: lệnh `\nuZ` không tồn tại, sót từ lượt đổi tên $\chi\to Z$; KaTeX hiện chữ đỏ, không gắn `.katex-error`, nên kiểm tra cũ không bắt được | Sửa thành `\nu Z_0`. Quét toàn tệp mọi lệnh `\[a-zA-Z]+` trong công thức (`katexscan.py`): ngoài `\nuZ` không có lệnh lạ, kể cả các dạng dính tên như `\etaZ`, `\betaZ`, `\lambdaZ`, `\varsigmaZ`. Thêm vào kiểm tra Playwright chuẩn số đếm `.katex [style*="rgb(204, 0, 0)"]`; đối chứng: chèn `\nuZ_0` vào trang viewer cho 2 phần tử đỏ và 0 `.katex-error` | đã sửa |
| 1 | nhẹ | Chứng minh Mệnh đề 05.18, Bước 2 | "số hạng $s=t$" dùng chỉ số không có trong tổng | "số hạng $t'=t$" | đã sửa |
| 2 | nhẹ | Chứng minh Mệnh đề 05.17, Bước 1 | Hướng ký hiệu $d$, lệch quy ước $\Delta$ | Đổi thành $\Delta\in\mathbb R^p$ | đã sửa |
| 3 | nhẹ | Chứng minh Bổ đề 05.20, Bước 6 | $\gamma=\zeta_2/\zeta_1$ trùng $\gamma_k$ của Mục 4.3 | Đổi thành $\varrho$ (không dùng ở nơi khác; bán kính phổ là $\rho$) | đã sửa |
| 4 | nhẹ | Nhận xét 05.30 | "Điểm này không là cực tiểu địa phương" thiếu điều kiện; ma trận khối nội dòng | Câu dẫn nêu điều kiện không suy biến, định nghĩa $\overline{xy}$, $\bar y$ trước danh sách và đặt ma trận khối $3\times3$ trên dòng `$$` riêng; ý tanh nêu "khi $(\overline{xy},\bar y)\ne0$", ý ReLU nêu "điều kiện là $\sum_iy_i\ne0$" | đã sửa |
| 5 | nhẹ | Chuỗi suy luận Mục 5 | Liệt kê Mệnh đề 05.18 trong khi Ví dụ 05.30 không dùng | Bỏ Mệnh đề 05.18; thêm câu: ví dụ kiểm ba trong bốn quyết định, quy tắc cập nhật được tính ở Tình huống 05.2 | đã sửa |
| 6 | nhẹ | Ví dụ 05.30, "Khởi tạo" | Chỉ sửa lớp ẩn, lớp ra vẫn hằng $0{,}01$ | Cả hai lớp theo Glorot, mỗi lớp một dòng: lớp ẩn $s^2\approx0{,}00219$, $\alpha\approx0{,}0811$; lớp ra $s^2=\tfrac2{138}\approx0{,}0145$, $\alpha=\sqrt{6/138}\approx0{,}209$; nêu lý do: lớp ẩn ngẫu nhiên đủ phá đối xứng, lớp ra cần thang thỏa Mệnh đề 05.34, 05.35. Dòng kiểm tra thêm $\tfrac6{138}\approx0{,}0435$, $\sqrt{0{,}0435}\approx0{,}209$ (tính lại bằng Python: $0{,}014493$; $0{,}20851$) | đã sửa |
| 7 | nhẹ | Mở Mục 2.3 | "độ dài bước $t$ của Bài 04" gợi $t$ là chỉ số vòng | "độ dài bước của Bài 04 (ở đó ký hiệu $t$)" | đã sửa |
| 8 | nhẹ | Trước Định lý 05.11 | Câu "Định lý sau là kết quả chính của mục" | Bỏ | đã sửa |
| 9 | nhẹ | Nhận xét 05.15 | Tiêu đề không khớp nội dung | "(Ngân sách cố định và phần cứng)" | đã sửa |
| 10 | nhẹ | Mục Ứng dụng, "Dừng sớm và chọn siêu tham số" | Ý không có vị ngữ | Thêm vị ngữ: Thuật toán 05.1 chọn bản lưu theo mất mát xác thực; Mệnh đề 05.5 cho giá trị xác thực của bản được chọn là ước lượng lạc quan | đã sửa |
| 11 | nhẹ | "Trong học máy" Mục 4.3 | Thiếu tên tiếng Anh ở lần đầu | "(singular value)", "(vanishing/exploding gradient)" | đã sửa |
| 12 | nhẹ | Nhận xét 05.24 | "Các thư viện" khái quát quá | "Một số thư viện, chẳng hạn PyTorch và Keras" | đã sửa |
| 13 | nhẹ | "Trong học máy" Mục 4.2 | Dấu hai chấm nối kết luận | Câu mới "Vì vậy trọng số phải…"; đoạn tách đôi để không quá bốn câu | đã sửa |
| 14 | nhẹ | Mở Mục 2.6 | Phương sai một bước nội dòng | $\operatorname{Var}(\theta_{t+1}\mid\theta_t=1)=\eta_t^2\tfrac8{3b}$ trên dòng riêng | đã sửa |
| 15 | nhẹ | Ví dụ 05.21, "Kiểm tra lại" | Hai dòng $Z_2$ tách rời | Gộp thành một khối `aligned`, mỗi dấu một dòng; hai hệ số $1{,}275$, $0{,}425$ tính sẵn ở câu dẫn để dòng đầu không bị cắt ở 390×844 (ảnh `s-n-ex21.png` đã xem) | đã sửa |
| 16 | nhẹ | Bài tập 05.8 | "đo được" lệch bản chất bài ngược | "cho trước" | đã sửa |
| 17 | nhẹ | Tóm tắt, chuỗi suy luận toàn chương, điểm 4 | Thiếu Mệnh đề 05.32 | Thêm "Mệnh đề 05.32 cho độ nhạy qua chuỗi" | đã sửa |

## Giáo trình đã tham khảo

Số trang Goodfellow, Bengio và Courville (2016) là trang in, đọc từ `sources/Deep Learning by Ian Goodfellow, Yoshua Bengio, Aaron Courville (z-lib.org).pdf` bằng `pdftotext` (trang in = trang PDF − 16 trong chương 5–8): mục 5.2 bắt đầu tr. 110, 5.3 tr. 120, 7.8 tr. 246, 8.1 tr. 275, 8.1.3 tr. 277, 8.2.1 tr. 282, 8.2.2 tr. 283, 8.2.3 tr. 285, 8.2.4 tr. 288, 8.2.5 tr. 289, 8.3.1 tr. 294, 8.3.2 tr. 296 (thuật toán 8.2 tr. 298, công thức 8.17 tr. 298), 8.3.3 tr. 300 (thuật toán 8.3), 8.4 tr. 301–305 (công thức 8.23 tr. 303); các trang 297, 298, 301–303 được đọc trực tiếp. Boyd và Vandenberghe (2004) được dẫn theo các trang đã kiểm trong nhật ký Bài 04 (mục 9.3.1–9.3.2, tr. 466–470), không mở lại PDF trong lượt này. Không có PDF cục bộ của Nocedal và Wright (2006), Wasserman (2004) và các bài báo Polyak (1964), Nesterov (1983), Sutskever và cộng sự (2013), Glorot và Bengio (2010), He và cộng sự (2015), Lessard, Recht và Packard (2016), Bottou, Curtis và Nocedal (2018); các nguồn này được dẫn theo cấu trúc đã biết, chưa kiểm số trang. Không dịch hoặc chép đoạn văn nào.

| Mục của chương | Nguồn và mục | Điều học được và chuyển vào ghi chú |
|---|---|---|
| 1.1–1.2 (mất mát huấn luyện, rủi ro) | DL 5.2 (tr. 110–114), 8.1 (tr. 275–276); Wasserman ch. 3 | Thứ tự: dữ liệu → rủi ro thực nghiệm → rủi ro kỳ vọng; ký hiệu $J^*$ của DL đổi thành $R$ như bộ trang chiếu. Mệnh đề 05.2 là phép tính chuẩn về phương sai mẫu chệch ($\tfrac{N-1}N$) đặt vào ngôn ngữ huấn luyện/kiểm thử; DL nêu hiện tượng bằng lời, ghi chú cho công thức đóng. |
| 1.3 (xác thực, kiểm thử) | DL 5.3 (tr. 120–122), 7.8 (tr. 246–252), 8.1.2 (tr. 276) | Phân vai ba tập dữ liệu; mất mát thay thế. Mệnh đề 05.5(b) là phát biểu hình thức của nhận xét trong ghi chú diễn giả của bộ trang chiếu về giá trị xác thực của ứng viên được chọn. |
| 1.4 (điểm dừng) | DL 4.3 (tr. 82–86), 8.2.2–8.2.3 (tr. 283–288) | Phân loại điểm dừng bằng dấu giá trị riêng; đối xứng hoán vị đơn vị ẩn làm có nhiều cực tiểu cùng giá trị. |
| 2.1–2.2 (gradient nhóm) | DL 8.1.3 (tr. 277–280), 5.9 (tr. 151); Wasserman ch. 3, 6; Bài 05c Định lý E.9, Mệnh đề E.10 | Cách đọc sai số chuẩn $\sigma/\sqrt n$ và hiệu suất giảm dần; không chệch cho $\nabla R$ chỉ trong lượt đầu qua dữ liệu (DL tr. 280). |
| 2.3 (một bước SGD) | Bottou, Curtis và Nocedal (2018), mục 4.1 | Bất đẳng thức một bước theo kỳ vọng (Mệnh đề 05.14) cùng dạng bổ đề của nguồn; chứng minh viết lại từ Bổ đề 04.18 và Hệ quả 05.12. |
| 2.4–2.6 (thuật toán, cỡ nhóm, bước học) | DL thuật toán 8.1 (tr. 294), 8.3.1 (tr. 294–296); Bài 05b T5, T8; Bài 05c "Cỡ nhóm dưới ngân sách tính toán cố định" | Thuật toán 05.1 giữ quy tắc dừng sớm của bộ trang chiếu; Ví dụ 05.15 tính đúng sai số bình phương trung bình (cùng phép tính có ở Bài 05c) và nối với ngưỡng (2.5). |
| 3.1 (bước gradient trên hàm bậc hai) | B&V 9.3.1–9.3.2 (tr. 466–470); Nocedal và Wright 3.3; DL 4.3.1, 8.2.1 (tr. 282–283) | Tách tọa độ theo vectơ riêng; hệ số $(\kappa-1)/(\kappa+1)$; Mệnh đề 05.17 chứng minh đầy đủ điều Nhận xét 04.13 chỉ phát biểu. |
| 3.2–3.3 (momentum) | DL 8.3.2 (tr. 296–300, công thức 8.15–8.17, hình 8.5); Polyak (1964); Lessard, Recht và Packard (2016) | Tên "vận tốc", vận tốc tới hạn $\eta/(1-\beta)$ (công thức 8.17). DL dùng cách đọc vật lý; ghi chú dùng phân tích phổ trên hàm bậc hai (Bổ đề 05.20, Định lý 05.21), là cách chuẩn trong tài liệu tối ưu, và tham số Polyak (Hệ quả 05.22). |
| 3.4 (Nesterov) | DL 8.3.3 (tr. 300, thuật toán 8.3); Sutskever và cộng sự (2013); Nesterov (1983) | Quy ước trạng thái: vận tốc cộng vào $\theta_t$; Định lý 05.23 tính đa thức đặc trưng và miền ổn định; bảo đảm $O(1/t^2)$ chỉ dẫn, không chứng minh. |
| 4.1–4.2 (dây chuyền, đối xứng) | DL 6.5 (tr. 204–), 8.4 (tr. 301–302) | Câu "đơn vị cùng đầu vào, cùng tham số ban đầu thì được cập nhật như nhau" của DL tr. 301 được viết thành Định lý 05.28 với giả thiết đầy đủ và chứng minh quy nạp; Mệnh đề 05.31 hình thức hóa "khởi tạo ngẫu nhiên phá đối xứng". |
| 4.3 (độ nhạy, bão hòa) | DL 8.2.4–8.2.5 (tr. 288–290), 6.3.2 | Tích các thừa số qua lớp; bão hòa tanh làm đạo hàm nhỏ; Ví dụ 05.27 thêm chuỗi tanh bốn lớp để cho thấy hai cơ chế cùng lúc. |
| 4.4 (phương sai, Glorot) | DL 8.4 (tr. 302–305, công thức 8.23); Glorot và Bengio (2010); He và cộng sự (2015) | DL nêu Glorot là thỏa hiệp giữa phương sai kích hoạt và phương sai gradient dưới giả thiết mạng tuyến tính; ghi chú suy diễn đầy đủ hai hệ số, tiêu chí trung bình cộng bằng 1 (Mệnh đề 05.37(a)) và tích không vượt 1 (05.37(c)). Hệ số $\tfrac12$ của ReLU (Nhận xét 05.39) chỉ nêu như giới hạn, không thêm công thức He theo quyết định của dàn bài. |
| 5 và tình huống | DL 8.1–8.4; Bài 04 Tình huống 04.1, 04.3 | Thứ tự chạy khác thứ tự phân tích (theo ghi chú diễn giả E01); dữ liệu Tình huống 05.2 dựng theo ý của Bài tập 04.15 (thang đặc trưng làm $\kappa$ lớn). |

## Ánh xạ mục tiêu học tập – kết quả – bài tập

| Mục tiêu (LLO/CLO) | Kết quả và ví dụ | Bài tập |
|---|---|---|
| 1. Huấn luyện, rủi ro, xác thực, kiểm thử (LLO11; CLO1) | Định nghĩa 05.1, 05.4; Mệnh đề 05.2, 05.5; Ví dụ 05.1–05.4 | 05.1, 05.10 |
| 2. Phân loại điểm dừng (LLO11; CLO1) | Định nghĩa 05.7; Mệnh đề 05.8; Ví dụ 05.5, 05.6; Nhận xét 05.9 | 05.2, 05.10 |
| 3. Gradient nhóm và bước SGD (LLO12; CLO2) | Định lý 05.11; Hệ quả 05.12; Mệnh đề 05.14; Thuật toán 05.1; Ví dụ 05.7–05.15; Tình huống 05.1 | 05.3, 05.4, 05.10 |
| 4. Momentum và Nesterov (LLO11, LLO12; CLO1, CLO2) | Mệnh đề 05.17, 05.18; Bổ đề 05.20; Định lý 05.21, 05.23; Hệ quả 05.22; Ví dụ 05.16–05.22; Tình huống 05.2 | 05.5, 05.10 |
| 5. Dây chuyền và đối xứng (LLO13; CLO2) | Mệnh đề 05.26, 05.31; Định lý 05.28; Hệ quả 05.29; Ví dụ 05.23–05.25; Tình huống 05.3 | 05.6, 05.10, 05.11 |
| 6. Độ nhạy, phương sai và Glorot (LLO13; CLO2) | Mệnh đề 05.32, 05.34, 05.35, 05.37, 05.38; Định nghĩa 05.36; Ví dụ 05.26–05.30 | 05.7, 05.8, 05.10, 05.12 |
| 7. Phối hợp và chẩn đoán (LLO11–LLO13; CLO1, CLO2) | Nhận xét 05.40; Ví dụ 05.31; ba tình huống | 05.9, 05.12 |

Bảng ánh xạ bài tập theo mục tiêu (bỏ khỏi ghi chú ở lượt 2): mục tiêu 1: 05.1, 05.10; mục tiêu 2: 05.2, 05.10; mục tiêu 3: 05.3, 05.4, 05.10; mục tiêu 4: 05.5, 05.10; mục tiêu 5: 05.6, 05.10, 05.11; mục tiêu 6: 05.7, 05.8, 05.10, 05.12; mục tiêu 7: 05.9, 05.12.

## Tự kiểm theo bảng kiểm "Kiểm định ghi chú bài giảng"

| Tiêu chí | Kết quả | Bằng chứng |
|---|---|---|
| Mỗi mục tiêu có định lý hoặc ví dụ và bài tập | đạt | Bảng ánh xạ trên; bảng ánh xạ trong ghi chú ở đầu "Bài tập củng cố". |
| Tám bước cho mỗi khái niệm trọng tâm | đạt theo tự kiểm | KN1 huấn luyện/đánh giá: Ví dụ 05.1 (nhu cầu), đoạn trực giác §1.2, Định nghĩa 05.1, Mệnh đề 05.2 + chứng minh, Ví dụ 05.2, Nhận xét 05.3, Bài tập 05.1; xác thực: Định nghĩa 05.4, Mệnh đề 05.5 + chứng minh, Ví dụ 05.3–05.4, Nhận xét 05.6. Điểm dừng: Tình huống 04.3 (nhu cầu), trực giác, Định nghĩa 05.7, Mệnh đề 05.8, Ví dụ 05.5–05.6, Nhận xét 05.9, Bài tập 05.2. KN2 gradient nhóm: Ví dụ 05.7–05.8, trực giác, Định nghĩa 05.10, Định lý 05.11, Hệ quả 05.12, Ví dụ 05.9–05.11, Nhận xét 05.13, Mệnh đề 05.14, Bài tập 05.3–05.4. KN3a momentum: Ví dụ 05.16–05.17, trực giác, Ví dụ 05.18, Thuật toán 05.2, Mệnh đề 05.18, Ví dụ 05.19, Nhận xét 05.19, Bổ đề 05.20, Định lý 05.21, Ví dụ 05.20, Hệ quả 05.22, Bài tập 05.5. KN3b Nesterov: nhu cầu đầu §3.4, Ví dụ 05.21, Thuật toán 05.3, Định lý 05.23, Ví dụ 05.22, Nhận xét 05.24, Bài tập 05.6. KN4 dây chuyền và đối xứng: Ví dụ 05.23, Định nghĩa 05.25, Mệnh đề 05.26, Ví dụ 05.24, trực giác, Định nghĩa 05.27, Định lý 05.28, Hệ quả 05.29, Nhận xét 05.30, Mệnh đề 05.31, Ví dụ 05.25, Bài tập 05.7. KN5 thang: Mệnh đề 05.32, Ví dụ 05.26–05.27, Nhận xét 05.33, Ví dụ 05.28, Mệnh đề 05.34–05.35, Định nghĩa 05.36, Mệnh đề 05.37, Ví dụ 05.29, Mệnh đề 05.38, Ví dụ 05.30, Nhận xét 05.39, Bài tập 05.8. |
| Ký hiệu trong bảng | đạt | 21 dòng, mỗi chữ một nghĩa trong chương; ký hiệu cục bộ ($\psi$, $\omega$, $u$, $\theta^\circ$, $\widehat\theta$, $\xi$, $\upsilon$, $\pi_1,\pi_0$, $\nu$, $A,B$, $\varpi$, $Q$, $\Lambda$, $\Gamma$, $B_{\rm tot}$, $m_i$, $\sigma$, $F,G$, $J_1^*$, $a_t$, $\mathrm I$) giới thiệu tại chỗ. Chữ $I$ có chỉ số chỉ dùng cho chỉ số rút; ma trận đơn vị viết $\mathrm I$. |
| Định lý đủ bốn phần, có chứng minh hoặc nguồn | đạt | Script: 21 khối định lý/mệnh đề/bổ đề/hệ quả đều có bốn phần; 21 khối `proof` đứng ngay sau kết quả và kết thúc bằng $\square$. Không định lý nào bỏ chứng minh; các định lý của Bài 05b chỉ được phát biểu lại trong Nhận xét 05.16, có dẫn. |
| Ví dụ có kết quả số và "Kiểm tra lại" | đạt | 31 ví dụ và 3 tình huống có nhãn "Kiểm tra lại" (script). Số liệu tính lại bằng Python (mục "Kiểm tra kỹ thuật"). |
| Bài tập có `hint` và `solution` | đạt | 12 bài, mỗi bài theo sau đúng một `hint` rồi một `solution`; mọi lời giải có "Kiểm tra lại". |
| Không "xem trang chiếu", không câu mảnh, không bước bỏ | đạt | Script tìm "trang chiếu", "xem bài giảng", mã trang A01–E03, "chúng ta", "hãy", "dễ thấy", "suy ra ngay", dấu "?" và "!": không có. |
| Trình bày sáng sủa | đạt theo tự kiểm | Chứng minh chia bước có nhãn; chuỗi từ ba dấu quan hệ trở lên đặt trong `aligned` mỗi dấu một dòng (script nội dòng và hiển thị, đã sửa khoảng 40 chỗ trong lượt tự kiểm); trường hợp thành danh sách; script đếm câu: không đoạn văn nào quá bốn câu. Chưa có script đếm ngoặc đơn mỗi câu. |
| Số hiệu liên tục, tham chiếu đúng | đạt | Năm bộ đếm liên tục; 498 tham chiếu `05.k` trỏ đúng khối, đúng loại (script). Số hiệu của bài trước được dẫn: 01.8, 01.9, 01.27, 01.30, 01.39, 01.40, 04.2, 04.7, 04.13, 04.17, 04.18, 04.19, 04.20, 04.22, 04.26, Tình huống 04.1, 04.3, Bài tập 04.15 (đối chiếu bằng `grep` với `materials/lec-01`, `lec-04`). Ghi chú 05b và 05c không đánh số `05b.k`, `05c.k`; nhãn riêng T5, T8 (05b) và E.9, E.10, G.5 (05c) được giữ nguyên và phát biểu lại. |
| Móc nối khái niệm, định lý, "Trong học máy", chuỗi suy luận, mở và kết chương | đạt theo tự kiểm | Đoạn quan hệ sau mỗi định nghĩa; câu dẫn trước và đoạn so sánh sau các định lý chính; 11 đoạn "Trong học máy"; mở chương nối Bổ đề 04.20, Định lý 04.26; kết chương (Tóm tắt) nối Bài 05b, 05c, 06. |
| Đoạn kết ba ý, công thức có câu dẫn và câu đọc, ký hiệu gọi tên lần đầu | đạt theo tự kiểm | Kiểm thủ công theo từng mục. |
| Giáo trình ghi theo mục, dẫn tại chỗ | đạt | Bảng "Giáo trình đã tham khảo"; dẫn tại chỗ trong các đoạn "Trong học máy", Nhận xét 05.6, 05.9, 05.13, 05.15, 05.24, 05.33, 05.39, Hệ quả 05.22. |
| Nhất quán với bộ trang chiếu | đạt, có lệch ghi dưới | Mọi ví dụ chính của bộ trang chiếu được giữ đúng số liệu (A03–A06, B01–B07, C01–C07, D01–D10, E01); các trang câu hỏi A07, B08, C08, D11, E02 không chép dữ kiện. |

## Lệch với bộ trang chiếu: chờ sửa deck

Ghi chú đổi một số ký hiệu để mỗi chữ có một nghĩa trong toàn chương. Ba hình dùng chung (`two-hidden-units.svg`, `critical-points.svg`, `linear-chain.svg`) giữ nhãn của deck sau khi hoàn nguyên ở lượt 3; ghi chú đối chiếu ký hiệu tại chỗ. Đề xuất sửa deck và ba hình theo ký hiệu của ghi chú trong cùng một lượt.

Kết quả grep trong deck ở lượt 2, dùng cho lượt sửa deck sau này: `b_j` 18 lần, `b_1` và `b_2` mỗi chữ 1 lần (D01–D04, D11 và ghi chú diễn giả); `s(u,v)` 5 lần, `s(u,0)` 2 lần, `s(0,v)` 2 lần (A06, A07 và ghi chú); `r(u)` 3 lần (A06 và ghi chú D08); `c_l` 10 lần (D05). Cần cập nhật mặt trang và ghi chú diễn giả của các trang này cho khớp hình mới.

1. **Độ lệch $b_j\to c_j$.** Deck D01–D04, D11 và `two-hidden-units.svg` dùng $b_j$, trùng cỡ nhóm $b$.
2. **Chuỗi tuyến tính.** Deck D05 và `linear-chain.svg` dùng $c_l$ cho hệ số, $L$ cho số lớp, $l$ cho chỉ số lớp; ghi chú dùng $\gamma_k$, $M$, $k$ vì $L$ là hằng số Lipschitz và $c_j$ là độ lệch.
3. **Phương sai.** Deck D07, D08, D10, D11 dùng $q$ cho phương sai đầu vào (trùng hàm $q$), $r$ cho phương sai gradient (trùng $r(u)$ và chỉ số nhóm $r$), $q_l$ cho phương sai lớp; ghi chú dùng $V_h$, $V_\delta$, $V^{(k)}$.
4. **Hai hàm minh họa.** Deck A06, A07 và `critical-points.svg` dùng $s(u,v)$ (trùng phương sai $s^2$, và $v$ trùng vận tốc) và $r(u)$; ghi chú dùng $\psi(u_1,u_2)$, $\omega(u)$.
5. **Ngưỡng dừng sớm $\delta\to\varepsilon$.** Deck B05 dùng $\delta$, trùng gradient $\delta_z$, $\delta_h$ của D08.
6. **Biên phân phối đều $a\to\alpha$.** Deck D09, D11 dùng $a$, trùng trọng số ra $a_j$.
7. **Ma trận đơn vị.** Deck C02 viết $I_2$, trùng chữ với chỉ số rút $I_r$; ghi chú viết $\mathrm I$.
8. **Mất mát xác thực.** Ghi chú diễn giả A05 dùng $V_k$; ghi chú dùng $\widehat R_{\rm val}$; phương sai mất mát trong Mệnh đề 05.5 là $V_\ell(\theta)$.
9. **Dấu thập phân.** Deck dùng dấu chấm ($0.8$); ghi chú dùng dấu phẩy như các ghi chú Bài 01–04.
10. **Nội dung thêm so với deck.** Mệnh đề 05.2, 05.5 (dạng hình thức), 05.8, 05.14, 05.31, 05.37; Bổ đề 05.20, Định lý 05.21, 05.23, Hệ quả 05.22 (momentum và Nesterov như hệ tuyến tính, theo yêu cầu của brief); Định lý 05.28 với chứng minh quy nạp; Ví dụ 05.15, 05.20, 05.22, 05.27 (chuỗi tanh); Nhận xét 05.40; ba tình huống. Deck có thể thêm một trang tự học về miền ổn định (hình `spectral-radius.svg`).
11. **Trích dẫn mục.** Ghi chú diễn giả D05 dẫn "§8.2.5" cho vách dốc; trong DL, vách dốc ở mục 8.2.4 (tr. 288) và tích qua nhiều bước ở 8.2.5 (tr. 289). Ghi chú dẫn "8.2.4–8.2.5".

## Trùng lặp với `exercises.md`

`exercises.md` dựng mười bài giao trên chính các ví dụ của deck, mà ghi chú bắt buộc phải bao trùm. Các bài sau bị giải sẵn một phần hoặc toàn bộ, cùng loại với quyết định E1 của Bài 04 và quyết định 2 của Bài 02b, 03b.

| Bài giao | Chỗ trong ghi chú | Mức |
|---|---|---|
| Bài 1 | (1) Ví dụ 05.1; (3) Ví dụ 05.5 | (1), (3) toàn bộ; (2) không, vì ghi chú dùng bảng của trang A05, không dùng bảng A/B |
| Bài 2 | Định lý 05.11 và chứng minh | toàn bộ |
| Bài 3 | (2): Mệnh đề 05.14(b) cho $\mathbb E[J(\theta^+)-J(1)]$ bằng một phép thế với $b=2$; Ví dụ 05.11 dùng $b=1$ | một phần: (2) giải sẵn bằng công thức; phân phối của $\widehat g$ với $b=2$ và nhóm $\{-1,1\}$ không có trong ghi chú |
| Bài 4 | Mệnh đề 05.17, Ví dụ 05.17 | (1), (2), bước đầu của (3); trường hợp biên $\eta=\tfrac27$ chỉ có trong chứng minh tổng quát Bước 3 |
| Bài 5 | Ví dụ 05.18, 05.19, Mệnh đề 05.18 | toàn bộ |
| Bài 6 | (2) đẳng thức $H\beta v$ ở Ví dụ 05.21 với dữ kiện khác; (3) trường hợp $\beta=0$ và việc cộng điểm dự báo hai lần ở đoạn sau Thuật toán 05.3 | một phần: (3) giải sẵn bằng lời; trạng thái $(1,1)$, $(-0{,}2;\,0{,}2)$ không có trong ghi chú |
| Bài 7 | (2) Định lý 05.28; (3) Ví dụ 05.25 | (2), (3) toàn bộ; (1) với $x=2$, $y=1$ không có |
| Bài 8 | Ví dụ 05.26, 05.27, Nhận xét 05.33 | toàn bộ (1), (2); một phần (3) |
| Bài 9 | (1) Mệnh đề 05.34, 05.35; (3) Ví dụ 05.30; (4) Nhận xét 05.39 | (1), (3), (4) toàn bộ; (2) lớp $8\to4$ không có |
| Bài 10 | Ví dụ 05.12, 05.31 với số liệu khác | phương pháp có sẵn, số liệu khác |

Đề xuất xử lý: đổi dữ liệu các bài 1(1), 3(2), 4, 5, 6(3), 7(3), 8, 9(3) trong `exercises.md` ở một lượt khác; trạng thái: chờ xử lý ở `exercises.md`.

Bài tập trong ghi chú không trùng đề với mười bài giao: $N=5$, $\operatorname{Var}Y=2$; hàm $u_1^3-3u_1+u_2^2$; bước SGD từ $\theta=0$ với $\eta=0{,}5$, $b=2$; mức giới hạn với $\eta=0{,}2$, $b=4$; momentum trên $2\chi^2$ với $\eta=\beta=0{,}25$; trạng thái Nesterov $(0{,}5;\,-1)$, $(0{,}4;\,0{,}2)$; mạng tanh với $w_j=0{,}5$, $a_j=0{,}5$; lớp $5\to3$; ba lỗi của một báo cáo huấn luyện; câu đúng sai; $J_1^*=\tfrac1{21}$; mạng $784\to256\to10$.

## Hình

- Dùng 15 SVG có sẵn của `img/lec-05/`, đúng 15 hình của bộ trang chiếu; mỗi hình có đoạn đọc hình và `alt` không chứa dấu ngoặc vuông (dấu ngoặc vuông trong `alt` làm hỏng cú pháp ảnh Markdown; đã thay "[θ]₁" bằng "tọa độ thứ nhất").
- Không dùng: `gradient-chain.svg`, `ill-conditioning.svg`, `minibatch-unbiased-variance.svg` (dữ liệu khác chương, độ lệch tổng 17), `momentum-lookahead.svg` (dùng $q_t$ cho điểm dự báo), `risk-curves.svg` (đường giả lập không số liệu), `saddle.svg` (trùng `critical-points.svg`), `variance-flow.svg` (nhắc công thức He, ngoài phạm vi).
- Ba hình mới, SVG thuần sinh bằng script Python trong scratchpad (`mkfig.py`), có `title`, `desc`, đã xem ảnh render:
  - `spectral-radius.svg`: bán kính phổ theo $\eta\lambda$ của giảm gradient, momentum và Nesterov với $\beta=0{,}5$, tính từ nghiệm của các đa thức đặc trưng của Định lý 05.21, 05.23; hai vạch đứng tại $0{,}15$ và $0{,}35$.
  - `ill-conditioned-runs.svg`: $\log_{10}J$ theo $t$ của Tình huống 05.2, mô phỏng chính xác ba phương pháp.
  - `symmetric-vs-random-fit.svg`: hàm học được sau 1000 vòng của Tình huống 05.3 với hai khởi tạo.

## Tự kiểm `no-ai-slop` (eval.md)

| Nhóm kiểm | Kết quả | Ghi chú |
|---|---|---|
| Nguyên tắc biên tập | đạt | Mọi khẳng định có chứng minh, nguồn hoặc phép tính; số liệu tính lại được; động từ cụ thể ("co theo hệ số", "triệt tiêu", "phóng đại"). Một khẳng định quá mạnh ở đoạn "Trong học máy" §1.2 đã được viết lại thành "có xu hướng thấp hơn rủi ro" kèm cơ chế. |
| Từ cần cắt | đạt | Quét "quan trọng", "rõ ràng", "hiển nhiên", "điều này cho thấy", "nói cách khác", "tóm lại", "đáng chú ý", "then chốt", "thực chất": không có. Còn một chữ "rất" mang nghĩa định lượng ("gradient rất lớn" ở vách dốc); hai chữ khác đã bỏ. |
| Mẫu cần cắt | đạt | Không câu hỏi tu từ, không dấu chấm than, không câu kết kịch tính; gạch dài chỉ ở tiêu đề chương theo mẫu. Các đoạn so sánh giữa định lý dùng cấu trúc câu khác nhau, không mở cùng một cụm. Nhãn "Trực giác, chưa phải định nghĩa" lặp ở năm chỗ theo yêu cầu của tiêu chuẩn (nêu rõ đây là trực giác). |
| Lượt 2 | đạt theo tự kiểm | Sửa đủ nhóm C của quyết định lượt 1; quét lại "điều cần chú ý", "Câu hỏi tiếp theo", "không phải ngẫu nhiên", "Mỗi giả thiết có vai trò riêng", "phiếu", "Lý do cụ thể:": không còn. |
| Lượt 4 | đạt theo tự kiểm | Chỉ sửa các câu trong "Phát hiện lượt 3"; câu mới viết theo chế độ Edit, đối chiếu lại `eval.md`: không câu hỏi tu từ, không từ đệm, không chuỗi cấm ("trang chiếu", "xem bài giảng", "dễ thấy", "suy ra ngay", "chúng ta", "hãy": 0 lần). |
| Đọc lại toàn bài | đạt theo tự kiểm | Văn phong học thuật ưu tiên hơn gợi ý giọng nói của kỹ năng, theo AGENTS.md. |

## Kiểm tra kỹ thuật đã chạy (lượt 4)

- Script cấu trúc: 133 khối mở = 133 đóng, không lồng; năm bộ đếm liên tục; 511 tham chiếu `05.k` đúng khối, đúng loại; không chuỗi cấm, không mã trang; 18 hình; không đoạn quá bốn câu.
- Quét lệnh KaTeX (`katexscan.py`, mọi `\[a-zA-Z]+` trong công thức): 1 lệnh lạ trước khi sửa (`\nuZ`), 0 sau khi sửa; lệnh mới duy nhất là `\varrho`.
- `sync-local-materials.py` rồi `--check`: OK (18 tệp). `git diff --check`: sạch.
- Playwright ghi chú, 1600×900 và 390×844, mở mọi khối gập: 0 pageerror, 0 cảnh báo console, 0 `.katex-error`, **0 phần tử chữ đỏ** (`.katex [style*="rgb(204, 0, 0)"]`, kiểm tra chuẩn từ lượt này), 3 350 `.katex`, 133 khối, 18/18 hình, không tràn ngang (1585/1600, 375/390), không `$` hay `:::` thô. Ảnh đã xem: `s-n-r30.png` (Nhận xét 05.30, 390×844), `s-w-ex30.png` (Ví dụ 05.30, 1600×900), `s-n-ex21.png` (Ví dụ 05.21, 390×844).

## Kiểm tra kỹ thuật đã chạy (lượt 2)

- Script cấu trúc: 134 khối mở = 134 đóng, không lồng; năm bộ đếm liên tục sau đánh số lại bài tập; 513 tham chiếu `05.k` đúng khối, đúng loại; không chuỗi cấm, không mã trang; 18 hình; không đoạn quá bốn câu; không chuỗi nội dòng từ ba dấu quan hệ; grep không còn $\upsilon$, $C_i$, $F/G$ của Glorot, $a_t$, $v(\theta)$, $x'_m$.
- Số liệu mới tính lại bằng Python: Hessian tại $0$ của mạng tanh trên dữ liệu Tình huống 05.3 (sai phân hữu hạn, khối $\pm\tfrac43$); $J(\tau)=1-\tfrac83\tau^2+2\tau^4$ với ReLU; Nesterov trên $2\theta^2$ với $\eta=\beta=0{,}25$ ($\theta_t=0$ với $t\ge1$, miền $\eta<\tfrac5{12}$); $0{,}9^{10}$, $0{,}9^{43}$, $0{,}9^{44}$; Bài tập 05.6(c) ($-0{,}3932$; $\tanh w_2\approx1{,}54$ vô nghiệm); Bài tập 05.8 ($n_{\rm in}=300$, $\alpha\approx0{,}1225$, $s^2=0{,}004$); Bài tập 05.1(c) ($1{,}775$, $1{,}85$).
- `sync-local-materials.py` rồi `--check`: OK (18 tệp). `git diff --check`: sạch.
- Playwright ghi chú, 1600×900 và 390×844, mở mọi khối gập: 0 pageerror, 0 cảnh báo console, 0 `.katex-error`, 3 334 `.katex`, 134 khối, 18/18 hình, không tràn ngang, không `$` thô. Ảnh đã xem: `s-n-zero.png`, `s-w-zero.png` (Nhận xét 05.30 mới).
- Playwright deck (không còn áp dụng sau khi hoàn nguyên ở lượt 3), 1600×900, các trang chứa ba hình đổi nhãn: A06, D01, D04, D05; hình nạp đủ, khung không tràn (scrollHeight bằng clientHeight), 0 pageerror. Ảnh đã xem: `deck-A06.png`, `deck-D01.png`, `deck-D05.png`; ảnh riêng ba SVG `fig-critical-points.png`, `fig-two-hidden-units.png`, `fig-linear-chain.png`.

## Kiểm tra kỹ thuật đã chạy (lượt 1)

- Script cấu trúc `struct_check.py` (scratchpad): 134 khối mở, 134 đóng, không lồng; năm bộ đếm liên tục; 498 tham chiếu `05.k` đúng khối, đúng loại; không chuỗi cấm; 18 hình tồn tại; bốn phần, $\square$, "Kiểm tra lại", `hint` rồi `solution` đạt; không đoạn quá bốn câu; không chuỗi nội dòng từ ba dấu quan hệ (sau sửa); chuỗi hiển thị nhiều dấu đều trong `aligned`.
- Số liệu tính lại bằng Python thuần (`fractions.Fraction`, `cmath`; scratchpad `c1.py`–`c8.py`): ví dụ ba quan sát ($J(0)=\tfrac{11}6$, $J(0{,}8)-J(1)=\tfrac1{50}$, $\mathbb E\Delta J=\tfrac1{75}$, ngưỡng $\tfrac8{57}$, $a_t$ tại $t=10,20,40$ với $\eta=0{,}1$ và $0{,}05$, Bài tập 05.3 bằng liệt kê chín cặp: $-\tfrac5{24}$); phân phối $\{-1,1,3,5\}$ ($R(1)=3$, $\mathbb EJ(\widehat\theta)=\tfrac53$, $\mathbb ER(\widehat\theta)=\tfrac{10}3$, kiểm bằng liệt kê 64 bộ); quỹ đạo sáu bước của giảm gradient, momentum, Nesterov trên $q$ với phân số chính xác; nghiệm và môđun đa thức đặc trưng; miền ổn định momentum $2(1+\beta)$ và Nesterov $\tfrac{2(1+\beta)}{1+2\beta}$ kiểm trên lưới $\eta\lambda$ với $\beta=0;0{,}25;0{,}5;0{,}9$; nghiệm dạng đóng Ví dụ 05.20 khớp quỹ đạo tới $t=6$; tham số Polyak cho $q$; Tình huống 05.1 ($\theta^*\approx1{,}0120$, kỳ vọng đúng bằng liệt kê 8, 64, 4096 dãy chỉ số; mức tăng tại nghiệm); Tình huống 05.2 (424, 56, 59 bước tới $10^{-4}$; đỉnh 687 tại $t=4$; nghiệm kép; phân kỳ với $\eta=0{,}04$); Tình huống 05.3 (mô phỏng 3000 vòng cho hai khởi tạo, không tiền kích hoạt nào bằng 0; vòng đầu tính tay khớp); chuỗi tanh bốn lớp; ví dụ phá đối xứng hai vòng; Bài tập 05.7 bước một.
- `python3 2627-1/scripts/sync-local-materials.py` rồi `--check`: "OK: material-local-data.js is up to date (18 file(s))". `git diff --check`: sạch; ba SVG mới không có khoảng trắng cuối dòng.
- Playwright Chromium, `file://…/material-viewer.html?doc=materials/lec-05/lecture-note.md&deck=lecture-05-toi-uu-bac-nhat-cho-hoc-may.html`, 1600×900 và 390×844, mở mọi khối gập: không `pageerror`, không lỗi hay cảnh báo console (không cảnh báo KaTeX về ký tự tiếng Việt trong `\text`); `.katex-error` = 0; 3 187 phần tử `.katex`; 134 `.material-block`; 18/18 hình nạp đủ; không tràn ngang (scrollWidth 1585/1600 và 375/390); không còn dấu `$` hay `:::` thô. Ảnh đã xem trong scratchpad: `v-narrow-lemma.png` (Bổ đề 05.20 ở 390×844), `s-n-th1.png` (Tình huống 05.1 ở 390×844), `s-w-glorot.png` (Định nghĩa 05.36, Mệnh đề 05.37 ở 1600×900), `fig-*.png` (ba hình mới).

## Độ dài

Lượt 2: 33 608 từ; xem mục D của bảng phát hiện lượt 1. Ứng viên cắt thêm nếu cần về 31 500 (khoảng 1 500 từ, không chạm các mục điều phối viên giữ): rút Nhận xét 05.6 và 05.40 (khoảng 250 từ); bỏ hàng $b=4$ và đoạn "Giới hạn" của Tình huống 05.1 (khoảng 150 từ); bỏ Ví dụ 05.4 vì Bài tập 05.1(c) đã có cùng cơ chế (khoảng 230 từ); rút đoạn "Trong học máy" của Mục 5.1 và mục Ứng dụng (khoảng 200 từ); bỏ Ví dụ 05.14 vì Ví dụ 05.15 bao trùm (khoảng 200 từ); rút đoạn đọc sau Mệnh đề 05.37 và đoạn quan hệ sau Định lý 05.28 (khoảng 150 từ); rút "Giới hạn" của Tình huống 05.2, 05.3 (khoảng 150 từ); rút Bài tập 05.12(d) và Bài tập 05.4 xuống một câu (khoảng 150 từ).

Lượt 1: bản lượt 1 có 32 180 từ, vượt trần 30 000 của brief khoảng 7%. Bản nháp đầu có 33 482 từ; lượt tự kiểm đã cắt Bài tập về kỳ vọng của momentum với gradient nhóm, Bài tập phương sai qua ba lớp Glorot, bài tập chuyển SGD sang momentum, Ví dụ tham số Polyak cho $q$, Ví dụ hồi quy tuyến tính hai tham số, các câu (c) của ba bài tập, bảng dừng sớm của Ví dụ 05.31 và rút gọn mục "Kiến thức tiên quyết". Lý do còn vượt: brief yêu cầu tự chứa các suy diễn mà deck chỉ nêu (momentum và Nesterov như hệ tuyến tính với chứng minh cả hai chiều, Glorot, đối xứng bằng quy nạp), cùng ba tình huống giải trọn vẹn.

Ứng viên cắt thêm nếu điều phối viên giữ trần 30 000 (tổng khoảng 2 300 từ):

1. Mệnh đề 05.2, chứng minh và hai đoạn đọc (khoảng 850 từ; nội dung ngoài deck, có thể thay bằng một câu dẫn Ví dụ 05.2).
2. Bổ đề 05.20(d) cùng chiều cần của Định lý 05.21(b), 05.23(b) (khoảng 450 từ; giữ chiều đủ, nêu chiều cần như nhận xét có dẫn).
3. Ví dụ 05.22, bảng ba phương pháp sáu bước (khoảng 300 từ; hình `spectral-radius.svg` và Tình huống 05.2 đã cho cùng kết luận).
4. Bảng chuỗi tanh bốn lớp trong Ví dụ 05.27 (khoảng 200 từ).
5. Nhận xét 05.15 (khoảng 200 từ; nội dung có ở Bài 05c).
6. Biến thể phân kỳ của Tình huống 05.2 (khoảng 150 từ).
7. Bài tập 05.6 (khoảng 300 từ; Bài tập 05.10(vii) vẫn kiểm điều kiện Nesterov).

## Điểm còn phân vân (chuyển điều phối viên và tác tử rà toán)

1. **Bổ đề 05.20(d).** Chứng minh trường hợp hai nghiệm cùng môđun dùng lập luận hiệu hai số hạng liên tiếp; cần rà toán xác nhận, đặc biệt trường hợp nghiệm phức có môđun đúng bằng $1$. Lượt 2: rà toán xác nhận phần (d) đúng, kể cả ca hai nghiệm cùng môđun; đóng.
2. **Định lý 05.23(b).** Miền ổn định của Nesterov $0<\eta L<\tfrac{2(1+\beta)}{1+2\beta}$ được suy từ tiêu chuẩn Schur–Cohn và kiểm bằng số; chưa đối chiếu với một nguồn in.
3. **Định lý 05.23(c).** Hệ số $1-\tfrac1{\sqrt\kappa}$ với $\eta=\tfrac1L$, $\beta=\tfrac{\sqrt\kappa-1}{\sqrt\kappa+1}$ chứng minh trên hàm bậc hai; nhận xét về tính chặt tại $\lambda=\mu$ (nghiệm kép) dựa trên tính toán trong chứng minh.
4. **Hệ quả 05.22, phạm vi.** Phản ví dụ của Lessard, Recht và Packard (2016) được dẫn theo trí nhớ (heavy ball với tham số tối ưu cho hàm bậc hai không hội tụ trên một hàm lồi mạnh một chiều có gradient Lipschitz); cần xác minh nguồn.
5. **Mệnh đề 05.14.** Cần gradient Lipschitz trên đoạn nối $\theta$ với mọi điểm $\theta^+$ có thể; ghi chú nêu ở "Điều kiện áp dụng". Dẫn Bottou, Curtis và Nocedal (2018, mục 4.1) theo trí nhớ.
6. **Tình huống 05.3.** Bộ giá trị khởi tạo $w=(0{,}9;\,-1{,}1)$, $a=(0{,}6;\,0{,}8)$ được chọn sẵn trong đoạn Glorot, nói rõ là "đóng vai một lần lấy mẫu"; cần xác nhận cách trình bày này phù hợp với yêu cầu không dùng số liệu bịa như bằng chứng.
7. **Nguồn chưa kiểm số trang.** Nocedal và Wright mục 3.3; Wasserman chương 3, 6; các bài báo Polyak, Nesterov, Sutskever, Glorot, He, Lessard, Bottou; DL mục 4.3 tr. 82–86 và 6.5 tr. 204 (trang đầu mục đọc từ PDF, trang cuối chưa kiểm).
8. **Trùng lặp với `exercises.md`.** Như bảng trên; chờ quyết định.
9. **Độ dài.** 32 180 từ; xem mục "Độ dài".


## Lượt sửa ví dụ tự chứa (2026-10-10)

**Tác tử.** Chỉnh sửa, loại `general-purpose`, Claude Opus 5.5 (`claude-opus-5-5`), effort high, theo brief của điều phối viên Fable 5.1. Bản kiểm kê đầu vào do tác tử rà soát chỉ đọc cùng mô hình lập. Căn cứ: `AGENTS.md`, mục "Ví dụ và bài tập tự chứa tại chỗ" (yêu cầu người dùng 2026-10-10). Mọi giá trị trong đoạn "Dữ kiện" được đối chiếu với khối nguồn trong cùng tệp trước khi chèn; không đổi số hiệu, không đổi kết quả, không sửa phần ngoài các khối được kiểm kê.

| Khối | Khối bị tham chiếu | Cách xử lý | Sai lệch so với đề xuất kiểm kê |
|---|---|---|---|
| Bài tập 05.1 | Mệnh đề 05.2, (1.4) | Đoạn Dữ kiện | Không |
| Ví dụ 05.8 | Ví dụ 05.1, (1.1) | Bổ sung đoạn Dữ kiện có sẵn | Không |
| Ví dụ 05.10 | Ví dụ 05.1, (1.1) | Bổ sung đoạn Dữ kiện có sẵn | Không |
| Ví dụ 05.11 | Ví dụ 05.8, Mệnh đề 05.14 | Bổ sung đoạn Dữ kiện có sẵn | Không |
| Bài tập 05.3 | Ví dụ 05.1, 05.8, 05.9, Mệnh đề 05.14 | Đoạn Dữ kiện | Không |
| Ví dụ 05.14 | Ví dụ 05.8, 05.9, 05.11 | Bổ sung đoạn Dữ kiện có sẵn | Không |
| Bài tập 05.4 | Ví dụ 05.14 | Đoạn Dữ kiện | Không |
| Ví dụ 05.15 | (3.1) | Thay "Hàm (3.1)" bằng công thức | Không |
| Ví dụ 05.16 | (3.1), Mệnh đề 05.17 | Đoạn Dữ kiện | Không |
| Ví dụ 05.17 | (3.1), Thuật toán 05.2 | Bổ sung đoạn Dữ kiện có sẵn | Không |
| Ví dụ 05.18 | (3.1), Thuật toán 05.2 | Bổ sung đoạn Dữ kiện có sẵn | Không |
| Ví dụ 05.19 | Ví dụ 05.17, 05.18, (3.4), Định lý 05.21(c) | Bổ sung đoạn Dữ kiện có sẵn | Không; giữ ký hiệu $Z_t=[\chi_t]_1$ của tệp |
| Ví dụ 05.20 | (3.1), Thuật toán 05.3, Ví dụ 05.17, 05.18 | Bổ sung đoạn Dữ kiện có sẵn | Không |
| Ví dụ 05.21 | Ví dụ 05.18, 05.20, (3.6), hình bán kính phổ | Thay đoạn Dữ kiện có sẵn | Không; bán kính phổ $0{,}652$, $0{,}707$, $0{,}85$ được tính lại từ hai đa thức đặc trưng trước khi chép |
| Bài tập 05.5 (gợi ý) | (3.4), (3.6), Định lý 05.21(b), 05.23(b) | Chèn vào gợi ý | Không |
| Ví dụ 05.23 | Ví dụ 05.22, Định nghĩa 05.25 | Bổ sung đoạn Dữ kiện có sẵn | Không |
| Ví dụ 05.24 | Ví dụ 05.22, (4.1) | Bổ sung đoạn Dữ kiện có sẵn | Không |
| Bài tập 05.6 | Định nghĩa 05.25, (4.1) | Đoạn Dữ kiện | Không |
| Ví dụ 05.26 | (4.2) | Đoạn Dữ kiện | Không |
| Ví dụ 05.28 | Định nghĩa 05.36, Mệnh đề 05.37 | Đoạn Dữ kiện | Đề xuất gán công thức $\alpha$ cho Mệnh đề 05.37(d); nguồn định nghĩa $\alpha$ là Định nghĩa 05.36, đoạn mới dẫn Định nghĩa 05.36 |
| Bài tập 05.8 | Định nghĩa 05.36, Mệnh đề 05.37 | Đoạn Dữ kiện | Chép đầy đủ thay vì "như Ví dụ 05.28" |
| Ví dụ 05.4 (phụ) | (1.5) | Viết lại tại chỗ dẫn | Không |
| Bài tập 05.7 (c) (phụ) | (4.2) | Viết lại tại chỗ dẫn | Không |
| Bài tập 05.9 (gợi ý, phụ) | (1.5), (2.4), (2.5) | Viết lại tại chỗ dẫn | Không |

Tổng: 21 khối bảng chính, 3 khối bảng phụ; không khối nào bỏ qua.

**Kiểm tra kỹ thuật.** Playwright Chromium, `material-viewer.html?doc=materials/lec-05/lecture-note.md&deck=lecture-05-toi-uu-bac-nhat-cho-hoc-may.html`, ở 1600×900 và 390×844: 3520 phần tử `.katex`, 0 `.katex-error`, 0 phần tử KaTeX tô đỏ (`rgb(204, 0, 0)`), 0 lỗi trang (lỗi CSP duy nhất trên console đến từ đoạn script do `reloadserver` chèn, không thuộc trang), không tràn ngang trang; số khối `:::` không đổi (133). Quét lệnh LaTeX trong mọi dòng mới: chỉ dùng lệnh chuẩn, không có `\text{}`. `python3 2627-1/scripts/sync-local-materials.py` rồi `--check`: OK; `git diff --check`: sạch.

**Số từ.** Trước 33604, sau 34282 (`wc -w`).

Quyết định của điều phối viên:


### Rà soát độc lập và lượt sửa bổ sung (2026-10-10)

**Tác tử rà soát.** Chỉ đọc, loại `general-purpose`, Claude Opus 5.5 (`claude-opus-5-5`), effort high; đối chiếu 146 đoạn của Bài 01–05 với khối nguồn: mọi số liệu khớp. Điều phối viên Fable 5.1 xác nhận các phát hiện dưới đây và quyết định: yêu cầu sửa nhỏ rồi chấp nhận. Tác tử chỉnh sửa (như trên) thực hiện các sửa đổi.

| Mức độ | Khối | Vấn đề | Đề xuất sửa | Trạng thái |
|---|---|---|---|---|
| trung bình | Bài tập 05.7 | (4.2) chép trong câu (c), thiếu mô hình chuỗi | Thêm đoạn Dữ kiện đầu khối ($h^{(k)}=\phi(\gamma_kh^{(k-1)})$ và (4.2)); câu (c) chỉ giữ quy ước ReLU | đã sửa |
| nhẹ | Ví dụ 05.11 | "dấu bằng xảy ra" lặp hai lần, (2.4) chép sau khi đã dùng | Chép (2.4) và (b) trước, rồi "$J''=L=1$, nên (b) áp dụng" | đã sửa |
| nhẹ | Bài tập 05.6(b) | Quy tắc momentum chưa viết lại | Chép $v_{t+1}=\beta v_t-\eta\nabla\ell(\theta_t)$, $\theta_{t+1}=\theta_t+v_{t+1}$ | đã sửa |
| nhẹ | Ví dụ 05.21 | Ba quy tắc dồn trong một câu | Tách thành danh sách | đã sửa |

**Kiểm tra lại sau lượt sửa.** Playwright ở 1600×900 và 390×844: 0 `.katex-error`, 0 phần tử KaTeX tô đỏ, 0 lỗi trang, không tràn ngang trang, số khối không đổi (133). Quét lệnh LaTeX trên các dòng mới: chỉ lệnh chuẩn. Sync và `--check`: OK; `git diff --check`: sạch. Số từ cuối: 34292.

Quyết định của điều phối viên: chấp nhận (Fable 5.1, 2026-10-10). Căn cứ: tác tử rà soát chỉ đọc đối chiếu 146 đoạn Dữ kiện của năm bài, số liệu khớp; hai phát biểu chép thiếu điều kiện (Mệnh đề 02.11(c), Slater dạng yếu) đã sửa và điều phối viên kiểm lại trong tệp; Playwright 1600×900 và 390×844: 0 lỗi trang, 0 `.katex-error`, 0 chữ đỏ KaTeX, số khối không đổi; `sync --check` và `git diff --check` sạch.
