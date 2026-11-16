# Duyệt deck Bài 14 — Vai 2 `toan-hoc` (độ chính xác toán học và thuật toán)

Ngày 2026-11-16. Deck đóng băng `2627-1/lecture-14-hoc-bieu-dien-mo-hinh-sinh.html` (60 trang, đọc cả ghi chú diễn giả), SVG `img/lec-14/pca-projection.svg`, `vae-paths-wide.svg`. Đối chiếu: `materials/lec-14/lecture-note.md`, `exercises.md` (Bài tập 14.5, 14.8, 14.9), `planning/lec-14/storyboard.md` §5 (E1–E18), §11.

## Phạm vi đã tính lại

Script `/tmp/claude-1000/-data-tqlong-lectures/3d919d23-7082-4f41-9671-9ec3fcf3fa09/scratchpad/lec-14/rv-toan-hoc/recheck.py` (numpy, chạy bằng `.venv`) tính lại mọi con số trên mặt trang, trong ghi chú diễn giả và trên SVG:

- $S=\operatorname{diag}(2,\tfrac12)$; mã, tái tạo, lỗi $0,0,1,1$ (trung bình $\tfrac12$) và $4,4,0,0$ (trung bình $2$); tỉ lệ $4/5$; $\operatorname{tr}S=\tfrac52$.
- Nhận xét 14.5 và phép đổi đơn vị: $\operatorname{diag}(100,10^6)$, $\operatorname{diag}(10^8,1)$.
- Ví dụ 14.3: $B'A'=\operatorname{diag}(1,0)$, phương sai mã $2$ và $8$.
- Bài tập 14.1: $S$, trị riêng $\{1,4\}$, mã, tái tạo, lỗi $0$ và $2$, lỗi trung bình $1$, $c=1/\sqrt2$, $\det\operatorname{Cov}(X)=\tau^2(\tau^2+\tfrac12)$.
- Ví dụ 14.5 (hoàn bình phương, biên, hậu nghiệm, $\mathbb E[X_1^2]=2$) và công thức tổng quát của trang "Hoàn bình phương", gồm $\int e^{-a(z-c)^2}dz=\sqrt{\pi/a}$.
- $100^{10}=10^{20}$; bất đối xứng KL $0{,}0966$, $0{,}1534$.
- Ví dụ 14.6 ($-2{,}3947$, $-\log\pi\approx-1{,}1447$); Ví dụ 14.7 ($1{,}1022$; $-2{,}5837$; $-2{,}2655$; khe hở $0{,}3181$, hiệu số làm tròn $0{,}3182$; kiểm tra bằng (7.4)).
- Bài tập 14.2 ($0{,}8181$; $-1{,}8621$; $-1{,}5155$; $\tfrac12\log2$; $0{,}2216$; câu 5 khớp $\log p_\theta(1)$ chính xác).
- Ví dụ 14.8 và Bài tập 14.3 (bảng ba mẫu, trung bình $-1$, $-4/3$, $-7/6$, $-7/6$, gradient chính xác).
- Bài tập 14.4 ($-2{,}1121$; $0{,}3829$; $1{,}6121$); Tình huống 14.2 ($-6{,}3379$); Bài tập 14.5 (kiểm tra $C=\operatorname{diag}(2,\tfrac12)=S$).
- SVG `pca-projection.svg`: gốc $(300,205)$, thang $100$ px/đơn vị; bốn điểm, hai đoạn nét đứt dài $1$, nhãn "Tổng lỗi: 2; lỗi trung bình: 1/2" đều đúng. `vae-paths-wide.svg` không có số hay công thức; hai đường tính khớp Hình 14.2.

Mọi con số đều khớp ghi chú và storyboard §5. Các phát hiện dưới đây là phát biểu, không phải số.

## Bảng phát hiện

| mức độ | trang chiếu | vấn đề | bằng chứng | đề xuất sửa |
|---|---|---|---|---|
| nghiêm trọng | L14-5-02 | NT2, NT20: "Trực quan." sai về toán. Hàm dưới dấu tích phân $q\log(q/p)$ không không âm tại từng điểm; chỉ $q\,\psi(t)$ không âm, còn $q-p$ chỉ không âm sau khi lấy tích phân. Câu trên mặt trang mâu thuẫn với chính Bước 2 ở trang L14-5-03 ("phần âm bị chặn bởi $p$"). | Deck: "**Trực quan.** $\log t\le t-1$ làm mỗi điểm của tích phân thành số hạng không âm." Ghi chú dòng 701: "hàm $q\log(q/p)$ không nhỏ hơn $-p$. Phần âm của hàm dưới dấu tích phân …". Phản ví dụ: $q=\mathcal N(0,1)$, $p=\mathcal N(0,\tfrac12)$, tại $z=0$ có $q\log(q/p)\approx-0{,}138$. | "**Trực quan.** $\log t\le t-1$ cho $q\log\frac qp\ge q-p$ tại mỗi điểm, và $\int(q-p)\ge0$." |
| nghiêm trọng | L14-5-06 (ghi chú diễn giả) | NT2: đường Jensen viết thành đẳng thức trong khi ghi chú có bất đẳng thức. $\log\mathbb E_q[p_\theta(x,Z)/q(Z)]=\log\int_{\{q>0\}}p_\theta(x,z)\,dz$, đại lượng này chỉ $\le\log p_\theta(x)$, và dấu bằng hỏng khi miền hỗ trợ của $q$ nhỏ hơn miền mà $p_\theta(x,\cdot)>0$. Giả thiết miền hỗ trợ của Định lý 14.15 chỉ cho chiều ngược lại. | Deck: "Đường Jensen viết $\mathcal L\le\log\mathbb E_q[p_\theta(x,Z)/q(Z)]=\log p_\theta(x)$ và chỉ cho cận". Ghi chú dòng 814: "$\mathcal L\le\log\mathbb E_{q}[p_\theta(x,Z)/q(Z)]=\log\int_{\{q>0\}}p_\theta(x,z)\,dz\le\log p_\theta(x)$". | Chép đúng chuỗi của ghi chú: "$\mathcal L\le\log\mathbb E_q[p_\theta(x,Z)/q(Z)]=\log\int_{\{q>0\}}p_\theta(x,z)\,dz\le\log p_\theta(x)$". |
| trung bình | L14-3-03 | NT2: lập luận đảo vai trò. Các bất đẳng thức thành đẳng thức vì $(A,B)$ tối ưu; giả thiết bổ sung chỉ dùng sau đó để suy ra $UU^\top=V_kV_k^\top$ và $BA=V_kV_k^\top$. | Deck, bước 4: "giả thiết bổ sung biến các bất đẳng thức thành đẳng thức." Ghi chú dòng 431: "Giả sử $(A,B)$ tối ưu và các giả thiết bổ sung đúng. Khi đó ba bất đẳng thức của Bước 2 là đẳng thức." Ghi chú diễn giả của chính trang này lại nêu đúng vai trò của từng giả thiết. | "Đạt chặn tại $(V_k^\top,V_k)$; $(BR^{-1})(RA)=BA$; tại nghiệm tối ưu, các bất đẳng thức là đẳng thức, và giả thiết bổ sung cho $BA=V_kV_k^\top$." |
| trung bình | L14-6-07 | NT2, loại bảo đảm: trang ghép "KL tới tiên nghiệm nhỏ: $q_\phi\approx p(z)$" với "Bộ giải mã cũng bỏ qua $z$: cận chặt". Khi bộ giải mã bỏ qua $z$, hậu nghiệm bằng tiên nghiệm và khe hở bằng $\mathrm{KL}(q_\phi\,\|\,p)$, nên với $q_\phi\approx p$ thì cận chỉ gần chặt. Cận chặt cần $q_\phi=p(z)$. | Ghi chú dòng 1359: "hậu nghiệm thật bằng tiên nghiệm, nên chọn $q_\phi=p(z)$ làm KL tới hậu nghiệm bằng $0$ và cận (7.3) chặt". | "Bộ giải mã cũng bỏ qua $z$: hậu nghiệm bằng $p(z)$; $q_\phi=p(z)$ cho cận chặt, biến ẩn không được dùng: suy sụp hậu nghiệm (posterior collapse)." |
| trung bình | L14-1-02 | NT2: dòng nhắc lại Mệnh đề 11.3 bỏ giả thiết mẫu độc lập cùng phân phối. Không có giả thiết này, log-hợp lý không phải tổng $\sum_i\log p_\theta(x_i)$. | Deck: "Hợp lý cực đại: cực tiểu $-\frac1n\sum_i\log p_\theta(x_i)$." Ghi chú dòng 7: "ước lượng hợp lý cực đại … trên mẫu độc lập cùng phân phối tương đương cực tiểu …". | "Hợp lý cực đại trên mẫu độc lập cùng phân phối: cực tiểu $-\frac1n\sum_i\log p_\theta(x_i)$." |
| trung bình | L14-5-02 (ghi chú diễn giả) | NT1: thêm một khẳng định dễ đọc sai. Tính tuyệt đối liên tục chỉ loại trường hợp quy ước $+\infty$; KL vẫn có thể bằng $+\infty$ khi tích phân phân kỳ (ví dụ $q$ Cauchy, $p$ Gaussian). Ghi chú không có câu này. | Deck: "$q$ tuyệt đối liên tục … đối với $p$ …; khi đó trường hợp $+\infty$ không xảy ra." Bổ đề 14.13 chỉ cho giá trị trong $[0,+\infty]$. | "…; khi đó quy ước $+\infty$ của định nghĩa không được dùng đến." Hoặc bỏ mệnh đề sau dấu chấm phẩy. |
| nhẹ | L14-5-03 | NT2: bước 4 bỏ "hầu khắp nơi" và bỏ kết luận ngoài miền hỗ trợ. | Deck: "nên $p=q$ trên $\mathcal S_q$, và $\int_{\{q=0\}}p=0$." Ghi chú dòng 716: "$p=q$ hầu khắp nơi trên $\mathcal S_q$ … nên $p=0=q$ hầu khắp nơi ngoài $\mathcal S_q$". | "nên $p=q$ hầu khắp nơi trên $\mathcal S_q$; $\int_{\{q=0\}}p=0$ cho $p=0=q$ hầu khắp nơi ngoài $\mathcal S_q$." |
| nhẹ | L14-2-09 | NT2: ký hiệu. Sau khi đổi đơn vị, biến mới là $1000N$ với giá trị $\pm1000$, nên "$\operatorname{Var}(N)=10^6$" mâu thuẫn với "$N\in\{-1,1\}$, $\operatorname{Var}(N)=1$" hai dòng trên. Con số đúng (storyboard E3). | Deck: "Đổi $N$ từ mét sang milimét: $\operatorname{Var}(N)=10^6$, $S=\operatorname{diag}(100,10^6)$". | "Đổi $N$ từ mét sang milimét: $\operatorname{Var}(1000N)=10^6$, $S=\operatorname{diag}(100,10^6)$, PCA một chiều giữ $N$." |
| nhẹ | L14-4-05, L14-7-04 | NT2 (một ký hiệu một nghĩa): $C$ là hằng số chuẩn hóa ở L14-4-05 và ma trận hiệp phương sai $WW^\top+\tau^2I_d$ ở L14-7-04 và L14-7-05. Ghi chú viết "hằng số" bằng chữ. | Deck L14-4-05: "Với hằng số chuẩn hóa $C$ …: $\log p(x,z)=C-\dots$"; L14-7-04: "biên $\mathcal N(\mu,C)$, $C=WW^\top+\tau^2I_d$". | Ở L14-4-05 viết "$\log p(x,z)=\text{const}-\dots$" theo chữ của ghi chú (bằng chữ ngoài KaTeX), hoặc dùng $c_0$. |
| nhẹ | L14-5-07 (ghi chú diễn giả) | Bài tập được dẫn kiểm tra chiều ngược lại. Bài tập 14.2 câu 5 cho cận chặt khi KL tới tiên nghiệm dương; nó không cho ví dụ KL tới tiên nghiệm nhỏ mà cận không chặt. | Deck: "Nhầm lẫn dễ gặp: KL tới tiên nghiệm nhỏ không có nghĩa cận chặt; bài tập cuối mạch kiểm tra điểm này." Đề Bài tập 14.2 câu 5: "phân biệt cận chặt với KL tới tiên nghiệm nhỏ". | "Nhầm lẫn dễ gặp: cận chặt và KL tới tiên nghiệm nhỏ là hai điều khác nhau; câu 5 của bài tập cuối mạch cho cận chặt với KL tới tiên nghiệm dương." |
| nhẹ | L14-7-01 (ghi chú diễn giả) | Phát biểu quá mạnh: bỏ $\lambda_k>\lambda_{k+1}$ hoặc điều kiện $y_i$ sinh $\mathbb R^d$ thì kết luận về mọi nghiệm không còn được bảo đảm. Nó vẫn có thể đúng cho một dữ liệu cụ thể. | Deck: "thiếu $\lambda_k&gt;\lambda_{k+1}$ hoặc $y_i$ sinh $\mathbb R^d$ thì kết luận về mọi nghiệm … không còn đúng." Ghi chú dòng 442: "chỉ được bảo đảm trên không gian con do các $y_i$ sinh ra". | "… thì kết luận về mọi nghiệm … không còn được bảo đảm." |

## Các điểm đã kiểm và đạt

- **Phát biểu kết quả (NT2, NT5).** Mệnh đề 14.3, 14.4, 14.8, 14.18, 14.20, Định lý 14.6, 14.15, Bổ đề 14.13, 14.17 và Định nghĩa 14.1, 14.2, 14.7, 14.10, 14.11, 14.12, 14.14, 14.16, 14.19 giữ đủ giả thiết, lượng từ, miền và loại bảo đảm. Định lý 14.6 viết "nghiệm khi và chỉ khi $UU^\top=V_kV_k^\top$, tức $U=V_kQ$"; hai điều kiện tương đương thật, nên câu đúng.
- **Ý tưởng chứng minh.** L14-2-04, L14-2-07, L14-5-03 (trừ hai điểm trong bảng), L14-5-06, L14-6-04 có đúng các bước, đúng bất đẳng thức then chốt, và giả thiết vào đúng bước: $\|u\|_2=1$ ở bước 2; $U^\top U=I_k$ ở bước 1; giả thiết miền hỗ trợ và tính hữu hạn ở bước 1–2; $\sigma>0$ ở bước 1, với giá trị trung bình và hội tụ trội.
- **Thuật toán 14.21 (L14-6-06).** Đầu vào, bốn bước, công thức $\widehat{\mathcal L}_i$, cập nhật đi lên đồng thời, đầu ra và điều kiện dừng "sau $T$ vòng lặp" khớp ghi chú. Khởi tạo và chi phí nằm trong ghi chú diễn giả.
- **Kỹ thuật "Hoàn bình phương" (L14-4-04).** Công thức, phương sai hậu nghiệm $1/(2a)$ và tích phân Gaussian đều đúng. Với $a=2$, $b=2wx_1$ ta được đúng Ví dụ 14.5.
- **Phân biệt =, ≈, ∝.** Các giá trị gần đúng đều dùng $\approx$; (7.3) và (8.3) được nêu là đẳng thức; không chỗ nào dùng ∝ hay hội tụ sai.
- **Bảng tổng kết.** L14-7-01 và L14-7-02 ghi đúng giả thiết không được bỏ. Bảng `Mục | Bài tập` ở L14-7-07 xếp đúng mạch theo nội dung của 14.5, 14.8, 14.9 (đã đối chiếu `exercises.md`).

## Đề xuất sửa ghi chú

Không có. Mọi con số, đẳng thức và bước chứng minh của ghi chú mà deck dùng đều đã tính lại và kiểm. Đã kiểm thêm chặn $G$ của Bài tập 14.3 câu 4 và nghiệm PCA xác suất trong Ví dụ 14.5; cả hai đều đúng.

## Kết luận

**đạt khi sửa.** Không có phát hiện chặn bàn giao. Hai phát hiện nghiêm trọng (L14-5-02 "Trực quan." sai về toán trên mặt trang; L14-5-06 ghi chú diễn giả viết đẳng thức thay cho bất đẳng thức của ghi chú) phải sửa trước bàn giao. Bốn phát hiện trung bình nên sửa cùng đợt.
