# Duyệt deck Bài 12 — Vai 2 `toan-hoc` (độ chính xác toán học và thuật toán)

Ngày: 2026-11-16. Bản đóng băng: `2627-1/lecture-12-hoc-may-rui-ro-thong-ke-tong-quat-hoa.html` (60 trang), `img/lec-12/deck-threshold-risks.svg`, `img/lec-12/deck-labelings-two-points.svg`. Đối chiếu: `materials/lec-12/lecture-note.md`, `materials/lec-12/exercises.md`, `planning/lec-12/storyboard.md` §5. Người duyệt chỉ đọc; tệp này là tệp duy nhất được ghi.

## Cách kiểm

- Đọc toàn bộ mặt trang và ghi chú diễn giả của 60 trang; đối chiếu từng phát biểu với khối cùng số hiệu trong ghi chú (giả thiết, lượng từ, loại bảo đảm, miền).
- Tính lại mọi con số bằng script `/tmp/claude-1000/-data-tqlong-lectures/3d919d23-7082-4f41-9671-9ec3fcf3fa09/scratchpad/lec-12/rv-toan-hoc/verify.py` (numpy, scipy; chạy bằng `.venv`). Kết quả khớp với deck ở mọi mục dưới đây.
- Kiểm tọa độ hai SVG mới theo ánh xạ ghi trong tệp.
- `deck_lint.py`: 0 phát hiện.

### Các phép tính đã kiểm lại (đều đúng)

| Trang | Đại lượng | Giá trị tính lại |
|---|---|---|
| L12-3-01 (ghi chú diễn giả) | $A^\top A$, $\det$, $A^\top y$, $\hat w$, $r$, SSE, $\hat\sigma^2$ | $\begin{pmatrix}3&3\\3&5\end{pmatrix}$, $6$, $(5,6)$, $(\frac76,\frac12)$, $(-\frac16,\frac13,-\frac16)$, $\frac16$, $\frac1{18}$; Bài 01 (Ví dụ 01.5) có đúng phép tính này nên "Nhắc lại:" hợp lệ |
| L12-3-06 | $(2-c)^2+(4-c)^2=2(c-3)^2+2$; tập nghiệm; Bài tập 12.1 câu 6 | đồng nhất thức đúng; $c=\frac73$, SSE $=\frac{14}3$ |
| L12-3-07 | $m_{\log3}(\pm1)$ | $\frac34$, $\frac14$ |
| L12-3-08 (ghi chú) | $-\log0{,}6$, $-\log0{,}9$, $-\log0{,}4$, $-\log0{,}1$ | $0{,}511$; $0{,}105$; $0{,}916$; $2{,}303$ |
| L12-3-10 | $\hat L_2(0)$, $\hat L_2(\log3)$, (5.2), đạo hàm | $0{,}6931$; $0{,}2877$; $\log(1+e^{-w})$; $-1/(1+e^w)$ |
| L12-3-11 | câu 4: $\hat w=(1,2)$, SSE $=0$; câu 2–3 (ghi chú) | $A^\top y=(7,10)$, $\hat w=(\frac56,\frac32)$, $r=(\frac16,-\frac13,\frac16)$, SSE $=\frac16$, $\hat\sigma^2=\frac1{18}$ |
| L12-3-12 | $\hat L_2(w)$, $\hat L_2'(w)$, cận $e^{-w}$ khi $w\ge0$, $\hat L_2(\log3)$ | đạo hàm kiểm bằng sai phân; $\frac12\log\frac{40}{27}=0{,}1965$; cận $\hat L_2\le e^{-w}$ đúng trên $[0,10]$ |
| L12-4-06 | bảng năm ngưỡng | $(\frac14;0{,}1)$, $(0;0{,}05)$, $(0;0)$, $(0;0{,}15)$, $(\frac14;0{,}2)$ |
| L12-4-07 | câu 1–2; câu 3–4 (ghi chú) | $0{,}2$; $0{,}1$; ERM $(-0{,}1;0{,}4]$; $R_f(h_{-0{,}4})=0{,}16$, $R_f(h_{0{,}2})=0{,}11$ (kiểm bằng tích phân số), $\mathbb P_f(X\ge0)=\frac34$ |
| L12-5-02 | $\Delta_S$ của lớp ngưỡng; năm khoảng (ghi chú) | quét lưới bước $10^{-4}$: $0{,}15$; cận trên từng khoảng $0{,}1$; $0{,}15$; $0{,}15$; $0{,}1$; $\to0{,}15$ không đạt |
| L12-5-04 (ghi chú) | phản ví dụ khi bỏ (G3) | $2e^{-2n\varepsilon^2}<1\iff n>\log2/(2\varepsilon^2)$ đúng (xem phát hiện nhẹ về $\varepsilon<1$) |
| L12-5-05 | $\log4000$, $n$, kiểm tra $n=1659$ và $1658$, $\varepsilon_{1000}$, $\log10$ | $8{,}2940$; $1658{,}81$; $0{,}049953$; $0{,}050203$; $0{,}06440$; $2{,}3026$ |
| L12-5-06 (ghi chú) | $2\varepsilon_{1000}$ | $0{,}1288\approx0{,}129$ |
| L12-5-09 | bảng ba nguồn sai số | mọi vế phải và cột cuối đúng; mọi dòng thỏa (7.8) |
| L12-5-10 | $V=n(b-a)^2$, $N_{\mathcal H}(\varepsilon/2,\delta)$ | khớp lời giải `exercises.md` |
| L12-6-02 | $2\log4000/0{,}0025$ | $6635{,}24$, nên $6636$ |
| L12-6-03, L12-6-06 | vector nhãn của hai lớp | quét tham số: lớp affine tạo đủ $4$ vector trên hai điểm, thiếu $101$ và $010$ trên ba điểm; lớp ngưỡng thiếu $10$ |
| L12-6-10 | lớp khoảng có dấu | $8$ vector trên ba điểm; thiếu $1010$, $0101$ trên bốn điểm; $d_{\mathrm{VC}}=3$ |
| L12-7-04 | $p_S(0)$ | $-0{,}09\cdot0{,}49=-0{,}0441$ |
| SVG ngưỡng | $x=385+300t$, $y=440-600r$ | mọi điểm gãy, chấm đặc/rỗng và điểm $(0{,}3;0{,}15)$ đúng tọa độ và đúng quy ước đầu mút |
| SVG gán nhãn | $x=140+48t$ | $t=2\to236$, $t=0\to140$, $t=-2\to44$; ô $10$ với $w=-1,b=0$ mũi tên sang trái, đúng |

Các ý tưởng chứng minh (L12-3-04, L12-3-09, L12-4-05, L12-5-04, L12-5-07, L12-6-06): bước đúng thứ tự ghi chú, bất đẳng thức then chốt đúng tên (bất đẳng thức hợp, Hoeffding qua (7.1), chuỗi bốn bất đẳng thức của Bổ đề 12.14), giả thiết vào đúng bước ((E1) ở bước 3; $m_\theta\in(0,1)$ ở bước 2; giả thiết mẫu hai loại điểm ở bước 4; (G3) ở bước 2; (E2) ở bất đẳng thức thứ hai). Phân biệt $=$, $\le$, $\approx$, "giảm chặt về $0$, không đạt" đúng trên mọi trang.

## Bảng phát hiện

| mức độ | trang chiếu | vấn đề | bằng chứng | đề xuất sửa |
|---|---|---|---|---|
| nghiêm trọng | L12-7-01 | NT15, NT2: hàng Định lý 12.13 của bảng tổng kết bỏ giả thiết lớp hữu hạn, đúng giả thiết mà mạch 6 phải thay bằng số chiều VC. (G3) của ghi chú chỉ là "lớp chọn trước", không chứa tính hữu hạn. | Deck: "Hội tụ đều (Định lý 12.13) \| (G1)–(G3); $\mathbb P\ge1-\delta$". Ghi chú §7.3: "**Lớp giả thuyết.** (G3): $\mathcal H$ gồm $M\ge1$ hàm đo được, cố định trước khi lấy mẫu"; §2: "(G3) Lớp chọn trước. $\mathcal H$ được cố định trước khi xem $S$." | Sửa ô thành "(G1)–(G3); $\mathcal H$ hữu hạn, $M$ hàm; xác suất $\ge1-\delta$ theo $S$" (hoặc đổi tên hàng thành "Hội tụ đều cho lớp hữu hạn (Định lý 12.13)"). Hàng Hệ quả 12.15 ("như trên") kế thừa sửa này. |
| trung bình | L12-7-01 | NT15, NT2: hàng Mệnh đề 12.3 ghi "hạng cột đầy đủ" là giả thiết không được bỏ của cả mệnh đề. Theo ghi chú, kết luận 1 (tập nghiệm $\hat w+\ker A$, vector khớp duy nhất) đúng không cần hạng đầy đủ; hạng đầy đủ chỉ cần cho (4.5). Ô hiện tại đảo ý chính của mệnh đề (L12-3-05, L12-3-06). | Deck: "Bình phương tối thiểu (Mệnh đề 12.3) \| hạng cột đầy đủ \| (4.4), (4.5)". Ghi chú, Mệnh đề 12.3: "**Giả thiết.** $A\in\mathbb R^{n\times p}$, $y\in\mathbb R^n$ … 2. Nếu $A$ có hạng cột đầy đủ, nghiệm duy nhất là (4.5)". | Ô giả thiết: "không cần hạng đầy đủ cho vector khớp; hạng cột đầy đủ cho nghiệm duy nhất (4.5)". |
| trung bình | L12-7-01 | NT15, NT2: hàng Mệnh đề 12.11 bỏ quy tắc nhãn $Y=\mathbf 1_{\{X\ge0\}}$ và miền của phân phối đều; (6.6) phụ thuộc cả hai (Bài tập 12.3 câu 3 cho thấy đổi mật độ là đổi công thức). | Deck: "Rủi ro ngưỡng (Mệnh đề 12.11) \| phân phối đều; mẫu hai loại điểm". Ghi chú: "**Phân phối đích.** $X\sim\operatorname{Uniform}[-1,1]$, $Y=\mathbf 1_{\{X\ge0\}}$". | "$X$ đều trên $[-1,1]$, $Y=\mathbf 1_{\{X\ge0\}}$; mẫu có điểm âm và không âm". |
| trung bình | L12-3-03 | NT2: dòng "Ý nghĩa:" phát biểu chiều ngược của Mệnh đề 12.2 và mâu thuẫn Nhận xét 12.4 ý 3 (mất mát bình phương vẫn dùng được khi nhiễu không Gaussian). Mệnh đề chỉ nói nhiễu Gaussian kéo theo mất mát bình phương dưới hợp lý cực đại. | Deck: "**Ý nghĩa:** chọn mất mát bình phương là chọn nhiễu Gaussian có phương sai chung." Ghi chú: "mất mát bình phương là hệ quả của giả thiết nhiễu Gaussian có phương sai chung"; "Nghĩa là chọn mất mát bằng hợp lý thì cũng là chọn một mô hình nhiễu"; Nhận xét 12.4 ý 3: "mất mát bình phương vẫn là tiêu chuẩn hợp lý … khi nhiễu không Gaussian, nhưng khi đó nó không còn là âm log-hợp lý". | "**Ý nghĩa:** dưới hợp lý cực đại, nhiễu Gaussian có phương sai chung cho mất mát bình phương." |
| trung bình | L12-6-01 | NT2 (lượng từ): dòng thiết lập không giả định khả thực bỏ cấu trúc lượng từ "với mọi $\varepsilon,\delta$ tồn tại $N(\varepsilon,\delta)$ … mọi $n\ge N$", chỉ giữ "mọi $P$". Mặt trang cũng bỏ điều kiện quy tắc học nhận $S$ i.i.d. và trả về $\hat h_S\in\mathcal H$. | Deck: "*Không giả định khả thực* (agnostic): mọi $P$ trên $\mathcal X\times\{0,1\}$ thỏa $\mathbb P_S(R(\hat h_S)\le R_{\mathcal H}^*+\varepsilon)\ge1-\delta$ (8.2)." Ghi chú, Định nghĩa 12.17: "nếu với mọi $\varepsilon,\delta\in(0,1)$ tồn tại $N(\varepsilon,\delta)$ sao cho với mọi phân phối $P$ trên $\mathcal X\times\{0,1\}$ và mọi $n\ge N(\varepsilon,\delta)$". | "*Không giả định khả thực* (agnostic): cùng $\varepsilon,\delta$, $N(\varepsilon,\delta)$; mọi $P$ trên $\mathcal X\times\{0,1\}$, mọi $n\ge N$ thỏa … (8.2)." Thêm "quy tắc $S\mapsto\hat h_S\in\mathcal H$, $S$ i.i.d." vào câu định nghĩa nếu còn chỗ (trang đang 60 âm tiết; có thể đổi dòng "Hệ quả 12.15 có hai mức …" sang ghi chú diễn giả). |
| nhẹ | L12-1-02 | NT2: nhắc lại Mệnh đề 05.3 bỏ "luôn có nghiệm" và đổi "khi và chỉ khi" thành "khi". | Deck: "phương trình chuẩn $A^\top Aw=A^\top y$ có nghiệm duy nhất khi hạng cột đầy đủ". Ghi chú: "phương trình này luôn có nghiệm, và nghiệm duy nhất khi và chỉ khi $\operatorname{rank}X=d$". | "… luôn có nghiệm; nghiệm duy nhất khi và chỉ khi hạng cột đầy đủ". |
| nhẹ | L12-5-04 (ghi chú diễn giả) | Phản ví dụ khi bỏ (G3) cần $\varepsilon<1$: với $\varepsilon\ge1$, $\mathbb P_S(\Delta_S>\varepsilon)=0$ và (7.4) không bị vi phạm. Phép tính khác đều đúng. | "Khi đó $M=1$ nhưng $\Delta_S=1$ với xác suất $1$, trong khi vế phải của (7.4) bằng $2e^{-2n\varepsilon^2}<1$ khi $n>\log2/(2\varepsilon^2)$." | Thêm "với $\varepsilon\in(0,1)$": "… nên $\mathbb P_S(\Delta_S>\varepsilon)=1$ với mọi $\varepsilon\in(0,1)$, trong khi …". |
| nhẹ | L12-5-07 | Dòng "Kỹ thuật." gọi sai thao tác: chuỗi bất đẳng thức chèn rủi ro thực nghiệm làm đại lượng trung gian và dùng độ lệch đều hai lần; không có bước chuyển vế. | Deck: "**Kỹ thuật.** Chèn một đại lượng trung gian rồi chuyển vế; so với phần tử bất kỳ rồi lấy cận dưới đúng." Ghi chú, chứng minh Bổ đề 12.14: "Dòng thứ nhất dùng $\Delta_S\le\varepsilon$ cho $\hat h_S$, … dòng thứ tư dùng $\Delta_S\le\varepsilon$ cho $h$." | "**Kỹ thuật.** Chèn rủi ro thực nghiệm làm đại lượng trung gian; so với phần tử bất kỳ rồi lấy cận dưới đúng." |
| nhẹ | L12-4-06 (`deck-threshold-risks.svg`) | NT25 (nhãn trục): trục tung có vạch tại $r=0{,}25$ và $r=0{,}5$ ($y=290$, $y=140$) nhưng không có số; trục hoành có vạch tại $t=0$ ($x=385$) không có nhãn. Người đọc không đọc được giá trị $\frac14$, $\frac12$ của bậc thang và đỉnh chữ V từ hình. | `<line x1="73" y1="140" …/>`, `<line x1="73" y1="290" …/>`, `<line x1="385" y1="440" x2="385" y2="452"/>` không có `<text>` tương ứng; chỉ có nhãn "0,15". | Thêm nhãn "0,5", "0,25" cạnh hai vạch tung và "0" dưới vạch $t=0$ (chữ ≥ 16 px ở kích thước hiển thị). |

Tổng: 0 chặn bàn giao, 1 nghiêm trọng, 4 trung bình, 4 nhẹ.

Không phát hiện sai số, sai hằng số hay sai tọa độ nào: mọi con số trên mặt trang, trong ghi chú diễn giả và trong hai SVG khớp phép tính lại và khớp ghi chú, `exercises.md`, storyboard §5.

## Đề xuất sửa ghi chú

Không có. Mọi số và lập luận của ghi chú và `exercises.md` mà deck dùng đều tính lại khớp (kể cả Phụ lục A, Bài tập 12.1–12.3, 12.10, 12.11, 12.15, 12.17).

## Kết luận

**đạt khi sửa** — sửa phát hiện nghiêm trọng ở L12-7-01 (lớp hữu hạn của Định lý 12.13) và bốn phát hiện trung bình (L12-7-01 hai ô, L12-3-03, L12-6-01); sau đó recheck toán trên các trang đó.
