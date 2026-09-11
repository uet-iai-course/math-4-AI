# Bài 02: Các bài toán tối ưu lồi

**Môn:** Cơ sở toán học cho AI — **Viện Trí tuệ nhân tạo** — Năm học 2026–2027, Học kỳ 1.

Tài liệu này dành cho **tự học**: mỗi ví dụ đi đủ chu trình nhu cầu — dữ liệu/biến — mô hình — suy diễn — chứng minh — tính số — diễn giải — giới hạn — biến thể, kèm bài tự kiểm có lời giải gập. Nguồn chính: bộ slide Bài 02 (liên kết kèm từng mục), Boyd–Vandenberghe (2004), *Convex Optimization*, và đề cương chính thức.

**Ba mục tiêu của bài:**

1. **Nhận dạng:** đọc được quy hoạch tuyến tính (LP), quy hoạch bậc hai (QP), quy hoạch bậc hai với ràng buộc bậc hai (QCQP) và quy hoạch hình học (GP) từ cấu trúc mục tiêu và ràng buộc.
2. **Cải dạng / xấp xỉ:** biến đổi mô hình về dạng lồi hoặc thay mục tiêu, nêu rõ giả thiết và quan hệ với bài gốc.
3. **Chứng nhận:** chứng minh mục tiêu và tập khả thi lồi, rồi diễn giải nghiệm trong ngữ cảnh bài toán ban đầu.

## Phần 1: Mô hình hóa và chứng nhận tính lồi

### Dẫn nhập

Trước khi học các lớp mô hình cụ thể, ta cần xác định những thành phần phải kiểm tra để chứng nhận một bài toán tối ưu lồi. Khung này gồm hai phép kiểm tra độc lập — hàm mục tiêu lồi và tập khả thi lồi — và một cảnh báo quan trọng: tính lồi **không** tự bảo đảm bài toán có nghiệm. Phần này xây khung bằng ba ví dụ nhỏ đủ để tự tính lại toàn bộ.

### Bài toán tối ưu lồi tổng quát

Ta cần chọn điểm $x$ trong tập khả thi $C$ sao cho giá trị mục tiêu nhỏ nhất:

$$\min_{x\in C} f_0(x),$$

với $x\in\mathbb R^n$, $f_0:C\to\mathbb R$ là hàm lồi và $C\subseteq\mathbb R^n$ là tập lồi. Hai thành phần này phải được kiểm tra **riêng biệt**: mục tiêu lồi chưa đủ, tập khả thi lồi chưa đủ; cần cả hai. (Trang chiếu: [Bài toán tối ưu lồi tổng quát](lecture-02-cac-bai-toan-toi-uu-loi.html#/bai-toan-toi-uu-tong-quat).)

### Dạng phổ biến: ràng buộc bất đẳng thức và đẳng thức

Trong thực hành, $C$ thường được mô tả gián tiếp:

$$\begin{aligned}
\min_{x\in\mathbb R^n}\;& f_0(x)\\
\text{với}\quad & f_i(x)\le 0,\quad i=1,\ldots,m,\\
& Ax=b,
\end{aligned}$$

trong đó $f_0,f_1,\ldots,f_m$ là các hàm lồi, $A\in\mathbb R^{p\times n}$, $b\in\mathbb R^p$. (Trang chiếu: [Dạng phổ biến của tối ưu lồi](lecture-02-cac-bai-toan-toi-uu-loi.html#/dang-toan-hoc).)

::: proof
**Chứng minh tập khả thi $C$ lồi.** Đặt

$$C=\{x\in\mathbb R^n \mid f_i(x)\le 0,\ i=1,\ldots,m,\ Ax=b\}.$$

Bước 1 — tập mức dưới lồi. Với mỗi $i$, xét $C_i=\{x\mid f_i(x)\le 0\}$. Lấy $u,v\in C_i$ và $\theta\in[0,1]$. Vì $f_i$ lồi:

$$f_i(\theta u+(1-\theta)v)\le \theta f_i(u)+(1-\theta)f_i(v)\le \theta\cdot 0+(1-\theta)\cdot 0=0.$$

Vậy $\theta u+(1-\theta)v\in C_i$, tức $C_i$ lồi.

Bước 2 — tập đẳng thức affine lồi. Tập $E=\{x\mid Ax=b\}$: nếu $Au=b$, $Av=b$ thì $A(\theta u+(1-\theta)v)=\theta b+(1-\theta)b=b$, nên $E$ lồi (thực chất là tập affine).

Bước 3 — giao các tập lồi vẫn lồi. Lấy $u,v\in C=\bigcap_i C_i\cap E$ và $\theta\in[0,1]$. Theo bước 1–2, $\theta u+(1-\theta)v$ thuộc mọi $C_i$ và thuộc $E$, nên thuộc $C$.

Bước 4 — vai trò của miền xác định. Các hàm $f_i$ chỉ xác định trên miền $\mathcal D_i$ của chúng; tập mức dưới phải hiểu là $C_i=\{x\in\mathcal D_i\mid f_i(x)\le0\}$. Giao với các miền xác định (mỗi miền là tập lồi trong các ví dụ dưới đây) vẫn bảo toàn tính lồi. Nếu bỏ miền xác định, phát biểu "tập mức dưới lồi" không có nghĩa.
:::

**Cảnh báo:** đây là *một* biểu diễn chuẩn. Một tập khả thi lồi vẫn có thể được mô tả bằng các hàm không lồi; vì vậy không được đồng nhất "tập lồi" với "mọi cách biểu diễn lồi". Hơn nữa, chứng nhận lồi **không** đồng nghĩa với có nghiệm hoặc nghiệm duy nhất — ba ví dụ dưới đây minh họa đúng điều đó.

### Ví dụ 1.1: hàm bậc hai trên đoạn

**Nhu cầu.** Ta muốn chọn $x$ gần mốc 2 nhất theo bình phương độ lệch, nhưng chỉ được chọn trong đoạn $[0,1]$ — ví dụ mốc 2 là thông số lý tưởng, còn $[0,1]$ là dải thiết bị cho phép.

**Dữ liệu, biến, miền, đầu ra.** Dữ liệu: mốc $2$ và hai cận $0,1$. Biến quyết định: $x\in\mathbb R$. Miền khả thi: $C=[0,1]$. Đầu ra: điểm $x^\star$ và giá trị $f_0(x^\star)$.

**Mô hình.**

$$\min_{0\le x\le 1}\ (x-2)^2.$$

(Trang chiếu: [Ví dụ: hàm bậc hai](lecture-02-cac-bai-toan-toi-uu-loi.html#/vi-du-bac-hai).)

![Parabol (x−2)²; nét đậm ứng với 0≤x≤1. Điểm tối ưu là (1,1) trên đồ thị, còn đỉnh (2,0) nằm ngoài miền khả thi.](img/lec-02/note-quadratic.svg)

::: derivation
**Cách trực tiếp và chứng nhận.**

Bước 1 — chứng nhận mục tiêu lồi: $f_0(x)=(x-2)^2$ có $f_0''(x)=2>0$ trên toàn $\mathbb R$, nên $f_0$ lồi chặt (còn gọi là lồi nghiêm ngặt): $f_0(\theta u+(1-\theta)v)<\theta f_0(u)+(1-\theta)f_0(v)$ với mọi $u\ne v$ và $\theta\in(0,1)$; với hàm bậc hai, điều này tương đương phần bậc hai xác định dương.

Bước 2 — chứng nhận tập khả thi: $C=[0,1]$ là đoạn lồi; hoặc viết qua dạng phổ biến bằng hai ràng buộc affine $-x\le0$ và $x-1\le0$.

Bước 3 — tìm nghiệm. Nếu bỏ ràng buộc, ta chọn $x=2$ (điểm nhỏ nhất của parabol), nhưng $2\notin[0,1]$. Trên $[0,1]$, hàm $(x-2)^2$ giảm vì $f_0'(x)=2(x-2)<0$ khi $x<2$; do đó giá trị nhỏ nhất đạt tại biên phải $x=1$.

Bước 4 — chứng nhận bằng bất đẳng thức: với mọi $x\in[0,1]$,

$$(x-2)^2\ge 1 \iff |x-2|\ge 1 \iff x\le 1 \text{ hoặc } x\ge 3,$$

và trên $[0,1]$ điều kiện $x\le1$ luôn đúng, dấu bằng chỉ khi $x=1$. Vậy $x^\star=1$, $f_0(x^\star)=1$.
:::

**Diễn giải.** Nghiệm nằm **trên biên** của tập khả thi: ràng buộc đang "kéo" nghiệm. Đây là tình huống điển hình của tối ưu có ràng buộc — nghiệm tự do của bài không ràng buộc là $x=2$ (điểm $(2,0)$ trên đồ thị), không khả thi.

**Giới hạn.** Ví dụ này có nghiệm vì tập khả thi $[0,1]$ bị chặn và đóng, còn mục tiêu liên tục trên đó. Tính lồi của mục tiêu không phải lý do có nghiệm.

**Biến thể.** Đổi $C$ thành $[0,3]$: khi đó $2\in C$, nghiệm tự do khả thi, $x^\star=2$, giá trị $0$. Bài tập tự kiểm:

::: exercise
Giải $\min_{1\le x\le 4}(x-2)^2$ và $\min_{1\le x\le 4}(x-5)^2$. Nghiệm nào nằm trên biên?
:::

::: solution
Bài một: $2\in[1,4]$ nên $x^\star=2$, giá trị $0$ (nghiệm trong miền). Bài hai: parabol nhỏ nhất tại $5\notin[1,4]$, hàm giảm trên $[1,4]$, nên $x^\star=4$, giá trị $(4-5)^2=1$ — nghiệm trên biên, cùng cơ chế với ví dụ chính.
:::

### Ví dụ 1.2: hàm giá trị tuyệt đối

**Nhu cầu.** Cùng mốc 2, nhưng đo độ lệch bằng trị tuyệt đối và cho phép $x$ thuộc toàn bộ $\mathbb R$.

**Dữ liệu, biến, miền, đầu ra.** Dữ liệu: mốc 2. Biến: $x\in\mathbb R$. Miền: $C=\mathbb R$. Đầu ra: $x^\star$ và giá trị.

**Mô hình.**

$$\min_{x\in\mathbb R}\ |x-2|.$$

(Trang chiếu: [Ví dụ: hàm giá trị tuyệt đối](lecture-02-cac-bai-toan-toi-uu-loi.html#/vi-du-gia-tri-tuyet-doi).)

![Đồ thị hình chữ V của |x−2|, đạt giá trị nhỏ nhất bằng 0 tại x=2, nơi hàm không khả vi.](img/lec-02/note-absolute.svg)

::: proof
**Chứng minh tính lồi bằng bất đẳng thức tam giác.** Lấy $u,v\in\mathbb R$ và $\theta\in[0,1]$. Viết $\theta u+(1-\theta)v-2=\theta(u-2)+(1-\theta)(v-2)$. Áp dụng bất đẳng thức tam giác $|s+t|\le|s|+|t|$ và tính thuần nhất $|\theta s|=\theta|s|$ với $\theta\ge0$:

$$|\theta u+(1-\theta)v-2|=\big|\theta(u-2)+(1-\theta)(v-2)\big|\le \theta|u-2|+(1-\theta)|v-2|.$$

Vậy $f_0(x)=|x-2|$ lồi. Lưu ý hàm **không khả vi** tại $x=2$: đạo hàm trái bằng $-1$, đạo hàm phải bằng $+1$.
:::

::: derivation
**Tìm nghiệm.** Vì $|x-2|\ge0$ với mọi $x$ và dấu bằng xảy ra khi và chỉ khi $x=2$, ta có $x^\star=2$, giá trị $0$. Không cần đạo hàm: bất đẳng thức dưới đã chặn giá trị từ dưới và điểm đạt được.
:::

**Diễn giải.** Tính lồi không đòi hỏi hàm trơn; đây là lý do các tiêu chí chuẩn một (phần 2, 3) vẫn thuộc tối ưu lồi dù không khả vi tại 0.

**Biến thể.** Thay $C$ bằng $[3,5]$: trên $[3,5]$ hàm $|x-2|=x-2$ tăng, nên $x^\star=3$, giá trị $1$ — lại là nghiệm biên. Bài tập tự kiểm:

::: exercise
Chứng minh $g(x)=|x|$ lồi mà không dùng đạo hàm, rồi giải $\min_{x\ge 1}|x|$.
:::

::: solution
Với $u,v\in\mathbb R$, $\theta\in[0,1]$: $|\theta u+(1-\theta)v|\le|\theta u|+|(1-\theta)v|=\theta|u|+(1-\theta)|v|$, nên $g$ lồi. Với $\min_{x\ge1}|x|$: trên $[1,\infty)$, $|x|=x$ tăng, nên $x^\star=1$, giá trị $1$.
:::

### Ví dụ 1.3: hàm nghịch đảo — bài lồi không có nghiệm

**Nhu cầu.** Muốn làm đại lượng $1/x$ nhỏ nhất khi $x$ dương — ví dụ tối thiểu hóa nghịch đảo của một hiệu suất.

**Dữ liệu, biến, miền, đầu ra.** Biến: $x\in\mathbb R$. Miền xác định và tập khả thi cùng là $C=(0,+\infty)$; không có ràng buộc bổ sung. **Không được** thay miền $x>0$ bằng $x\ge0$, vì hàm không xác định tại $0$. Đầu ra: giá trị nhỏ nhất (nếu có) và điểm đạt.

**Mô hình.**

$$\min_{x>0}\ \frac{1}{x}.$$

(Trang chiếu: [Ví dụ: hàm nghịch đảo](lecture-02-cac-bai-toan-toi-uu-loi.html#/vi-du-nghich-dao).)

![Đồ thị 1/x trên x>0 giảm về 0 khi x tăng ra vô cùng; đường cong không chạm trục hoành.](img/lec-02/note-reciprocal.svg)

::: proof
**Chứng nhận lồi.** $f_0(x)=1/x$ khả vi trên $(0,\infty)$ với $f_0'(x)=-1/x^2$, $f_0''(x)=2/x^3>0$ trên miền dương, nên $f_0$ lồi trên $C$. Tập $C=(0,\infty)$ lồi. Bài toán được chứng nhận lồi.
:::

::: derivation
**Phân tích giá trị tối ưu.**

Bước 1 — bị chặn dưới: với mọi $x>0$, $1/x>0$, nên $0$ là cận dưới.

Bước 2 — cận dưới không đạt: xét dãy $x_k=k$, $k=1,2,\ldots$; khi đó $1/x_k=1/k\to0$. Vậy $\inf_{x>0}1/x=0$.

Bước 3 — kết luận: không có điểm khả thi nào có $1/x=0$, nên **không có nghiệm tối ưu**; ký hiệu $+\infty$ không phải một nghiệm. Phân biệt: bài toán vẫn **bị chặn dưới**; "không đạt cận dưới" khác với "không bị chặn dưới" (khi đó $\inf=-\infty$).
:::

**Diễn giải.** Đây là minh chứng trực tiếp cho cảnh báo đầu phần: chứng nhận lồi **không** đồng nghĩa với có nghiệm. Khi báo cáo kết quả, phải nói rõ "cận dưới 0, không đạt" thay vì ghi nghiệm $x^\star=+\infty$.

**Giới hạn.** Nếu chặn miền trên bằng một cận hữu hạn, nghiệm có thể xuất hiện lại — xem biến thể. Chú ý cận trên hữu hạn **không** làm tập khả thi trở thành tập đóng trong $\mathbb R$: tập $(0,M]$ không đóng vì điểm $0$ là điểm giới hạn của tập nhưng không thuộc tập. Ngược lại, trên tập compact không rỗng (đóng và bị chặn trong không gian hữu hạn chiều, ví dụ $[0,1]$) và với mục tiêu liên tục, nghiệm chắc chắn tồn tại — ví dụ 1.1 đúng theo lối này.

**Biến thể.** Thêm $x\le M$ với $M>0$: tập $C=(0,M]$ lồi, hàm giảm trên miền, nên $x^\star=M$, giá trị $1/M$ — nghiệm tồn tại vì hàm giảm và điểm lớn nhất $M$ thuộc tập khả thi. Bài tập tự kiểm:

::: exercise
Xét $\min_{x\ge1}1/x$ và $\min_{x>0}(-\log x)$. Bài nào bị chặn dưới, bài nào không? Có bài nào có nghiệm không?
:::

::: solution
Bài một: $1/x$ giảm trên $[1,\infty)$, nên $\inf_{x\ge1}1/x=0$ khi $x\to+\infty$; vì $1/x>0$ với mọi $x$ hữu hạn, cận dưới $0$ **không đạt** — bài bị chặn dưới nhưng **không có nghiệm** (miền mới vẫn không có cận trên cho $x$). Bài hai: $-\log x\to+\infty$ khi $x\to0^+$ và $-\log x\to-\infty$ khi $x\to+\infty$, nên bài **không bị chặn dưới**, $\inf=-\infty$, không có nghiệm và cũng không có cận dưới hữu hạn. Đạo hàm thứ hai $( -\log x)''=1/x^2>0$ cho thấy $-\log x$ vẫn lồi trên $(0,\infty)$ — lại một bài lồi không có nghiệm, và không có cận dưới hữu hạn.
:::

### Tự kiểm tổng hợp phần 1

::: exercise
Cho bài toán $\min_{x\in C}f_0(x)$ với $f_0(x)=x^2-4x+5$ và $C=[2,+\infty)$. (a) Chứng nhận bài toán lồi. (b) Tìm nghiệm hoặc cận dưới. (c) Nếu đổi $C=[0,1]$ thì nghiệm là gì?
:::

::: solution
(a) $f_0''=2>0$ nên $f_0$ lồi; $C$ là nửa đường thẳng lồi. (b) $f_0(x)=(x-2)^2+1\ge1$ với dấu bằng tại $x=2\in C$, nên $x^\star=2$, giá trị $1$. (c) Trên $[0,1]$ hàm giảm (đỉnh tại 2 nằm ngoài), nên $x^\star=1$, giá trị $(1-2)^2+1=2$ — nghiệm biên.
:::

### Chuyển tiếp

Ba ví dụ đã cho khung chứng nhận: kiểm mục tiêu, kiểm tập khả thi, và kiểm tra riêng sự tồn tại nghiệm. Phần tiếp theo áp dụng khung này cho lớp mô hình có mục tiêu và ràng buộc **tuyến tính** — quy hoạch tuyến tính — nơi phép cải dạng bằng biến phụ trở thành công cụ chính.

## Phần 2: Quy hoạch tuyến tính

### Dẫn nhập

Phần 1 đã chứng nhận rằng hàm mục tiêu và tập khả thi của bài toán tối ưu lồi là lồi. Nay xét mô hình trong đó hàm mục tiêu và các ràng buộc đều **affine** — quy hoạch tuyến tính (LP). Ta bắt đầu từ một nhu cầu pha trộn nguyên liệu, rồi học cách cải dạng hai bài toán hồi quy về LP bằng biến phụ. Nguồn: Boyd–Vandenberghe (2004), §4.3.

### Ví dụ 2.1: pha trộn cho một vườn ươm

**Nhu cầu.** Một vườn ươm chuẩn bị hỗn hợp bón cho một luống cây. Hỗn hợp cần cung cấp đủ lượng nitơ và phốtpho theo yêu cầu. Nguyên liệu I nhiều nitơ hơn trong mỗi kg nhưng giá cao hơn; nguyên liệu II rẻ hơn theo kg nhưng cần dùng nhiều hơn để đủ nitơ. Người phụ trách có thể mua và phối trộn hai loại với lượng tùy chọn, kể cả phần lẻ của một kg. Cần quyết định: dùng bao nhiêu kg mỗi loại để đủ dinh dưỡng với chi phí thấp nhất.

**Dữ liệu, biến, miền, đơn vị, đầu ra.** Đây là tình huống và dữ liệu minh họa **tự tạo**; chưa ấn định tổng khối lượng hỗn hợp; các thành phần cộng được và chi phí tỷ lệ với lượng dùng.

| Nguyên liệu | Giá (10 nghìn đ/kg) | Nitơ (g/kg) | Phốtpho (g/kg) |
|---|---|---|---|
| I | 3 | 2 | 1 |
| II | 2 | 1 | 2 |

Biến: $x_1,x_2$ — số kg nguyên liệu I, II, không âm. Đầu ra: $(x_1^\star,x_2^\star)$ và chi phí.

**Mô hình.** Cần ít nhất 4 g nitơ và 5 g phốtpho:

$$\begin{aligned}
\min\;& 3x_1+2x_2\\
\text{với}\quad & 2x_1+x_2\ge 4,\\
& x_1+2x_2\ge 5,\\
& x_1,x_2\ge 0.
\end{aligned}$$

(Trang chiếu: [Pha trộn cho một vườn ươm](lecture-02-cac-bai-toan-toi-uu-loi.html#/lp-cau-chuyen-pha-tron), [Mô hình pha trộn](lecture-02-cac-bai-toan-toi-uu-loi.html#/lp-pha-tron).)

::: derivation
**Phương án ban đầu và chứng nhận dạng LP.**

Bước 1 — phương án ban đầu: chỉ dùng II. Cần $x_2\ge4$ cho nitơ và $x_2\ge2{,}5$ cho phốtpho, nên lấy $x_2=4$ (lấy max của 4 và 2,5). Chi phí $2\cdot4=8$ đơn vị (10 nghìn đ), tức **80 nghìn đồng**. Khả thi nhưng chưa chắc tối ưu.

Bước 2 — chứng nhận dạng LP: chi phí $3x_1+2x_2$ và hàm lượng $2x_1+x_2$, $x_1+2x_2$ đều tuyến tính theo $(x_1,x_2)$; ràng buộc $\ge$ và $x\ge0$ đều affine. Theo khung phần 1, mục tiêu affine lồi và tập khả thi là giao các nửa không gian — bài là LP lồi.
:::

**Diễn giải.** Tỷ lệ chi phí trên hàm lượng quyết định nguyên liệu nào hiệu quả hơn: II rẻ hơn mỗi kg nhưng cho ít nitơ hơn. Phương án ban đầu chỉ là nghiệm khả thi.

### Dạng phổ biến và dạng chuẩn của LP

**Dạng phổ biến.** Biến $x\in\mathbb R^n$; dữ liệu $c\in\mathbb R^n$, $G\in\mathbb R^{m\times n}$, $h\in\mathbb R^m$, $A\in\mathbb R^{p\times n}$, $b\in\mathbb R^p$:

$$\begin{aligned}
\min\;& c^Tx\\
\text{với}\quad & Gx\le h,\quad Ax=b.
\end{aligned}$$

Mục tiêu affine nên lồi; tập khả thi là giao các nửa không gian và siêu phẳng affine, lồi. Bài pha trộn đưa về dạng này bằng đổi dấu: $2x_1+x_2\ge4$ thành $-2x_1-x_2\le-4$, $x_1+2x_2\ge5$ thành $-x_1-2x_2\le-5$, $x\ge0$ thành $-x\le0$. Hằng số cộng vào mục tiêu bỏ được khi tìm nghiệm; nếu cần giá trị đúng, ghi nhận giá trị dịch riêng. (Trang chiếu: [Dạng phổ biến của quy hoạch tuyến tính](lecture-02-cac-bai-toan-toi-uu-loi.html#/lp-dang-pho-bien).)

**Dạng chuẩn.** Từ $\min c^Tx$ với $Gx\le h$, $Ax=b$:

$$\min_{z\ge0}\ d^Tz\quad\text{với}\quad Bz=e,\qquad z=(x^+,x^-,s)\in\mathbb R^{2n+m},$$

qua ba phép chuyển: biến tự do $x=x^+-x^-$ với $x^+,x^-\ge0$; bất đẳng thức $Gx+s=h$ với biến dư $s\ge0$; giữ đẳng thức $Ax=b$. Ma trận và vectơ dữ liệu mới:

$$B=\begin{bmatrix}G & -G & I_m\\ A & -A & 0_{p\times m}\end{bmatrix},\qquad e=\begin{bmatrix}h\\ b\end{bmatrix},\qquad d=\begin{bmatrix}c\\ -c\\ 0_m\end{bmatrix}.$$

(Trang chiếu: [Dạng chuẩn của quy hoạch tuyến tính](lecture-02-cac-bai-toan-toi-uu-loi.html#/lp-chuan-tac).)

::: proof
**Chứng minh tương đương hai chiều (giá trị và khôi phục, không một-một).**

Chiều từ bài gốc sang bài chuẩn: với mọi $x$ khả thi, chọn $x^+_j=\max(x_j,0)$, $x^-_j=\max(-x_j,0)$, $s=h-Gx\ge0$. Khi đó $x^+-x^-=x$, và

$$Bz=\begin{bmatrix}G(x^+-x^-)+s\\ A(x^+-x^-)\end{bmatrix}=\begin{bmatrix}Gx+s\\ Ax\end{bmatrix}=\begin{bmatrix}h\\ b\end{bmatrix}=e,$$

vì hàng trên cho $G(x^+-x^-)+s=Gx+s=h$ và hàng dưới cho $A(x^+-x^-)=Ax=b$. Ngoài ra $z\ge0$ và $d^Tz=c^T(x^+-x^-)=c^Tx$. Vậy giá trị tối ưu bài chuẩn $\le$ giá trị bài gốc.

Chiều ngược: với mọi $z=(x^+,x^-,s)\ge0$ khả thi, đặt $x=x^+-x^-$. Từ $Bz=e$ suy $Gx+s=h$ nên $Gx\le h$, và $Ax=b$. Mục tiêu $d^Tz=c^T(x^+-x^-)=c^Tx$. Vậy giá trị bài gốc $\le$ giá trị bài chuẩn.

Kết luận: hai bài **cùng giá trị tối ưu** và từ nghiệm của một bài khôi phục được nghiệm của bài kia. **Không** khẳng định tương ứng một-một: cách tách $x=x^+-x^-$ không duy nhất (cộng cùng hằng số vào cả $x^+$ và $x^-$), nên ánh xạ nghiệm không đơn ánh.

Bài chuẩn là bài lồi: $Bz=e$ affine, $z\ge0$ tập lồi, $d^Tz$ affine.
:::

**Biến thể xử lý:** ràng buộc dạng $\ge$ đổi dấu trước khi chuyển; biến đã không âm không cần tách; bài cực đại đổi dấu mục tiêu rồi đổi dấu lại giá trị khi báo cáo. Ví dụ: $2x_1+x_2\ge4$ đổi thành đẳng thức $2x_1+x_2-s_1=4$, $s_1\ge0$ (tương đương $-2x_1-x_2+s_1=-4$).

### Ví dụ 2.2: nghiệm của bài pha trộn

**Mô hình và dữ liệu** như Ví dụ 2.1. (Trang chiếu: [Nghiệm của bài toán pha trộn](lecture-02-cac-bai-toan-toi-uu-loi.html#/lp-nghiem-pha-tron).)

![Miền khả thi của bài pha trộn và đường chi phí 7. Hai biên dinh dưỡng giao tại nghiệm (1,2); miền tiếp tục về phía trên và phải.](img/lec-02/lp-mixture.svg)

**Suy diễn ứng viên.** Trước khi chứng nhận, tìm ứng viên: nghiệm chặt của hai ràng buộc dinh dưỡng là nghiệm hệ

$$2x_1+x_2=4,\qquad x_1+2x_2=5.$$

Nhân phương trình đầu với 2: $4x_1+2x_2=8$; trừ phương trình thứ hai: $3x_1=3$, nên $x_1=1$; thay vào: $x_2=4-2\cdot1=2$. Ứng viên $(1,2)$, chi phí $3\cdot1+2\cdot2=7$.

::: proof
**Chứng minh $x^\star=(1,2)$ tối ưu bằng tổ hợp tuyến tính hệ số không âm.**

Bước 1 — biểu diễn mục tiêu: kiểm tra trực tiếp

$$3x_1+2x_2=\tfrac{4}{3}(2x_1+x_2)+\tfrac{1}{3}(x_1+2x_2),$$

vì $\tfrac43\cdot2+\tfrac13\cdot1=3$ và $\tfrac43\cdot1+\tfrac13\cdot2=2$. Hai hệ số $\tfrac43,\tfrac13$ **không âm**; tổng của chúng là $\tfrac43+\tfrac13=\tfrac53\ne1$ — đây là tổ hợp tuyến tính hệ số không âm, **không** phải tổ hợp lồi, và điều kiện cần chỉ là tính không âm.

Bước 2 — cận dưới: với mọi nghiệm khả thi, $2x_1+x_2\ge4$ và $x_1+2x_2\ge5$, nên

$$3x_1+2x_2\ge \tfrac43\cdot4+\tfrac13\cdot5=\tfrac{16}{3}+\tfrac53=\tfrac{21}{3}=7.$$

Bước 3 — đạt cận: điểm $x^\star=(1,2)$ khả thi ($2+2=4$, $1+4=5$, không âm) và cho chi phí $3\cdot1+2\cdot2=7$. Vậy $x^\star$ tối ưu, chi phí 7 đơn vị = **70 nghìn đồng**; nitơ $=4$ g, phốtpho $=5$ g, đủ đúng yêu cầu. Đường cùng chi phí $3x_1+2x_2=\alpha$ với $\alpha=7$ tiếp xúc miền khả thi tại $(1,2)$.
:::

**Diễn giải.** So với phương án ban đầu 80 nghìn, pha trộn tiết kiệm 10 nghìn. Kỹ thuật "viết mục tiêu là tổ hợp của các ràng buộc" là chứng nhận tối ưu tổng quát cho LP.

**Biến thể (giá I tăng 3 → 4).** Mục tiêu $4x_1+2x_2=2(2x_1+x_2)\ge2\cdot4=8$. Điểm $(0,4)$ khả thi ($0+4=4\ge4$, $0+8=8\ge5$) và đạt $8$; điểm $(1,2)$ cũng đạt $4+4=8$. Mọi điểm trên đoạn nối $(0,4)$–$(1,2)$ là tổ hợp lồi của hai nghiệm tối ưu nên cũng đạt 8 — bài có **nhiều nghiệm tối ưu**. Bài tập tự kiểm:

::: exercise
Với giá I là 3, chứng minh $(0,4)$ không tối ưu, và tìm giá trị mục tiêu tại $(0,4)$.
:::

::: solution
$(0,4)$ khả thi nhưng chi phí $2\cdot4=8>7$ = giá trị tối ưu đã chứng minh, nên không tối ưu. Giá trị tại đó là 8 (đơn vị 10 nghìn đ).
:::

### Ví dụ 2.3: hồi quy với sai số tuyệt đối

**Nhu cầu.** Dự đoán đầu ra từ một đặc trưng, đánh giá tổng độ lệch tuyệt đối thay vì bình phương — hồi quy sai số tuyệt đối.

**Dữ liệu, biến, miền, đầu ra.** Dữ liệu minh họa tự tạo, đã chuẩn hóa:

| $u_i$ | $-2$ | $-1$ | $0$ | $1$ | $2$ |
|---|---|---|---|---|---|
| $y_i$ | $-2$ | $-1$ | $3$ | $1$ | $2$ |

Mô hình dự đoán $\hat y_i=au_i+b$, tức $w=(a,b)$. Ma trận $X\in\mathbb R^{5\times2}$ có hàng thứ $i$ là $(u_i,1)$; $y\in\mathbb R^5$; phần dư $r=Xw-y$. Đầu ra: $w$ giảm tổng sai số. Đường thử $\hat y=u+1$ có tổng sai số 6 — cần chọn lại hệ số.

**Mô hình.**

$$\min_w\ \sum_{i=1}^5 |r_i|.$$

(Trang chiếu: [Hồi quy với sai số tuyệt đối](lecture-02-cac-bai-toan-toi-uu-loi.html#/lp-hoi-quy-tuyet-doi).)

![Năm điểm dữ liệu và đường dự đoán thử ŷ=u+1. Các đoạn thẳng đứng biểu diễn phần dư tại cùng giá trị u.](img/lec-02/lp-data.svg)

::: proof
**Chứng nhận lồi và nhận dạng.** $r=Xw-y$ là affine theo $w$; hợp của hàm lồi $|\cdot|$ với hàm affine là lồi, nên mỗi $|r_i|$ lồi; tổng các hàm lồi là lồi. Vậy mục tiêu lồi. Tuy nhiên $|\cdot|$ không phải hàm tuyến tính, nên mục tiêu **chưa ở dạng LP**. Không dùng đạo hàm tại 0 vì hàm không khả vi; thay vào đó thêm biến phụ.
:::

### Biến phụ cho giá trị tuyệt đối và chứng minh tương đương

Với một số vô hướng $r$: $t\ge|r| \iff t\ge r$ và $t\ge -r$. Với $m$ điểm, đặt **một biến $t_i$ cho mỗi phần dư** $r_i$; ghép thành $t\in\mathbb R^m$ (khác với một biến vô hướng minh họa):

$$\begin{aligned}
\min_{w,\,t}\;& \mathbf{1}^Tt\\
\text{với}\quad & -t\le Xw-y\le t.
\end{aligned}$$

(Trang chiếu: [Biến phụ cho giá trị tuyệt đối](lecture-02-cac-bai-toan-toi-uu-loi.html#/lp-bien-phu).)

![Miền phía trên chữ V thỏa t≥|r|, là giao hai nửa không gian t≥r và t≥−r.](img/lec-02/lp-epigraph.svg)

::: proof
**Chứng minh tương đương hai chiều.** Ký hiệu hai bài: (G) $\min_w\sum_i|r_i|$ và (LP) $\min_{w,t}\mathbf1^Tt$ với $-t\le Xw-y\le t$.

Chiều G → LP: với mọi $w$, chọn $t_i=|r_i|$. Khi đó $t_i\ge r_i$ và $t_i\ge-r_i$ đúng, nên $(w,t)$ khả thi với mục tiêu $\sum_i|r_i|$. Suy ra giá trị tối ưu LP $\le$ giá trị G.

Chiều LP → G: với mọi $(w,t)$ khả thi, $t_i\ge|r_i|$ với mọi $i$, nên $\sum_i t_i\ge\sum_i|r_i|$. Suy ra giá trị G $\le$ giá trị LP.

Vậy hai giá trị tối ưu **bằng nhau**. Tại nghiệm tối ưu: nếu $t_i>|r_i|$ tại một thành phần thì giảm $t_i$ xuống $|r_i|$ vẫn khả thi và giảm mục tiêu — mâu thuẫn; do đó $t_i^\star=|r_i^\star|$, và từ $w^\star$ khôi phục được nghiệm gốc.

**Cảnh báo quan trọng:** $t\ge|r|$ chỉ ép đẳng thức **tại nghiệm tối ưu** của bài có mục tiêu $\min\mathbf1^Tt$; một cặp $(w,t)$ khả thi bất kỳ hoàn toàn có thể có $t_i>|r_i|$. Miền $\{(r,t)\mid t\ge|r|\}$ là tập trên đồ thị của $|\cdot|$.

Mục tiêu và ràng buộc mới đều affine nên bài cải dạng là LP. Đây **không phải xấp xỉ**: chỉ thêm biến, tương đương chính xác. Biến $t$ không phải tham số dự đoán, chỉ phục vụ cải dạng.
:::

### Ví dụ 2.4: nghiệm hồi quy sai số tuyệt đối

**Dữ liệu** như Ví dụ 2.3. (Trang chiếu: [Nghiệm hồi quy với sai số tuyệt đối](lecture-02-cac-bai-toan-toi-uu-loi.html#/lp-nghiem-hoi-quy).)

![Đường hồi quy ŷ=u đi qua bốn điểm; điểm (0,3) có sai số theo trục tung bằng 3.](img/lec-02/lp-lad.svg)

**Kết quả:** $w^\star=(1,0)$, tức $\hat y=u$; $r=(0,0,-3,0,0)$; tổng sai số tuyệt đối $3$; $t^\star=(0,0,3,0,0)$.

::: proof
**Chứng minh tối ưu (dùng tính chất riêng của bộ dữ liệu).** Đặt $d=a-1$, tức $a=1+d$. Phần dư tại từng điểm:

- $u=-2$: $r_1=-2(1+d)+b-(-2)=b-2d$;
- $u=-1$: $r_2=b-d$;
- $u=0$: $r_3=b-3$;
- $u=1$: $r_4=b+d$;
- $u=2$: $r_5=b+2d$.

Bước 1 — các cặp đối xứng. Bất đẳng thức tam giác cho

$$|b-d|+|b+d|\ge |(b-d)+(b+d)|=|2b|=2|b|,$$

vì dấu **cộng** trong $|(b-d)+(b+d)|$ triệt tiêu $d$; nếu dùng dấu trừ thì $|(b-d)-(b+d)|=2|d|$, không cho cận theo $b$. Tương tự với cặp thứ hai:

$$|b-2d|+|b+2d|\ge |(b-2d)+(b+2d)|=2|b|.$$

Bước 2 — điểm $u=0$: $|b-3|\ge3-|b|$ (vì $|b-3|\ge|3|-|b|$ theo tam giác).

Bước 3 — ghép: tổng sai số

$$\sum_i|r_i|\ge 2|b|+2|b|+(3-|b|)=3|b|+3\ge 3.$$

Bước 4 — đạt cận: tại $b=0$, $d=0$ (tức $w=(1,0)$), phần dư là $(0,0,-3,0,0)$, tổng đúng 3. Vậy $w^\star=(1,0)$ tối ưu.

Bước 5 — duy nhất (theo lập luận này): nếu $w$ tối ưu thì tổng $=3$, mà tổng $\ge3+3|b|$ buộc $b=0$; khi đó tổng $=6|d|+3$ buộc $d=0$. Vậy nghiệm duy nhất $(1,0)$.

Lưu ý: đây là **tính chất riêng của bộ dữ liệu này** (các điểm $\pm1,\pm2$ đối xứng quanh 0), không phải khẳng định tổng quát.
:::

**Diễn giải.** Điểm $(0,3)$ là ngoại lệ; hồi quy sai số tuyệt đối cho phép nó sai 3 còn bốn điểm còn lại khớp chính xác — sai số tuyệt đối không phạt nặng điểm lệch xa như bình phương.

**Chuyển tiếp:** nếu muốn giảm **sai số lớn nhất** thì đổi tiêu chí sang giá trị sai số tệ nhất — tiêu chí minimax dưới đây.

### Ví dụ 2.5: hồi quy với sai số lớn nhất (minimax)

**Dữ liệu** như trên; mục tiêu ban đầu $\min_w\max_i|r_i|$ — giảm sai số tệ nhất. Một biến phụ **chung** $t\in\mathbb R$:

$$\begin{aligned}
\min_{w,\,t}\;& t\\
\text{với}\quad & -t\mathbf{1}\le Xw-y\le t\mathbf{1}.
\end{aligned}$$

(Trang chiếu: [Hồi quy với sai số lớn nhất](lecture-02-cac-bai-toan-toi-uu-loi.html#/lp-sai-so-lon-nhat).)

![Đường tối ưu ŷ=u+1,5 và dải sai số ±1,5 theo trục tung. Cả năm điểm có sai số tuyệt đối bằng 1,5.](img/lec-02/lp-minimax.svg)

::: proof
**Chứng nhận và tương đương.** Mục tiêu và ràng buộc tuyến tính nên bài là LP. Mọi cặp $(w,t)$ khả thi có $t\ge\max_i|r_i|$. Tương đương hai chiều với $t=\max_i|r_i|$: với $w$ bất kỳ, $t$ nhỏ nhất thỏa ràng buộc là đúng $\max_i|r_i|$ (mỗi $|r_i|\le t$ với mọi $i$ ⇔ $t\ge\max_i|r_i|$); tối thiểu hóa $t$ theo $(w,t)$ cho cùng giá trị với tối thiểu hóa $\max_i|r_i|$ theo $w$.

**Chứng minh cận $t\ge1{,}5$ và nghiệm.** Đặt $d=a-1$. Phần dư tại $\pm1$ là $b-d$ và $b+d$. Nếu mọi $|r_i|\le t$ thì

$$|b|=\left|\frac{(b-d)+(b+d)}{2}\right|\le\frac{|b-d|+|b+d|}{2}\le t.$$

Điểm $u=0$ cho $|b-3|\le t$. Do đó

$$3=|b+(3-b)|\le|b|+|b-3|\le 2t\quad\Rightarrow\quad t\ge\tfrac32.$$

Đạt tại $w=(1,1{,}5)$: phần dư $r=Xw-y$ tính trực tiếp từng điểm:

- $u=-2$: $-2+1{,}5-(-2)=1{,}5$;
- $u=-1$: $-1+1{,}5-(-1)=1{,}5$;
- $u=0$: $0+1{,}5-3=-1{,}5$;
- $u=1$: $1+1{,}5-1=1{,}5$;
- $u=2$: $2+1{,}5-2=1{,}5$.

Vậy $r=(1{,}5;\,1{,}5;\,-1{,}5;\,1{,}5;\,1{,}5)$, giá trị lớn nhất đúng $1{,}5$ và tổng sai số tuyệt đối $1{,}5\cdot4+1{,}5=7{,}5$ — kiểm được từ bảng phần dư. Vậy $w^\star=(1,1{,}5)$, $t^\star=1{,}5$.
:::

**Diễn giải.** Đánh đổi rõ ràng: tổng sai số tăng từ 3 lên 7,5 nhưng sai số tệ nhất giảm từ 3 xuống 1,5. Riêng bộ dữ liệu này mọi điểm sai lệch đúng 1,5 — không khẳng định tính chất này tổng quát.

### Nhận dạng quy hoạch tuyến tính (3 biến thể tự kiểm)

::: exercise
Phân loại ba biến thể và giải thích tính lồi: (1) thêm $a\ge0$ vào bài hồi quy sai số tuyệt đối; (2) buộc $x_1,x_2$ nguyên trong bài pha trộn; (3) đổi mục tiêu hồi quy sang $\sum_i(au_i+b-y_i)^2$.
:::

::: solution
(1) Thêm $a\ge0$ chỉ thêm ràng buộc tuyến tính; bài vẫn là LP và lồi. (2) Ràng buộc nguyên làm tập khả thi không lồi: $(1,2)$ và $(2,2)$ khả thi nhưng trung điểm $(1{,}5;2)$ không nguyên — đây là quy hoạch nguyên, không còn là LP. (3) Mục tiêu không còn tuyến tính, nhưng là tổng các bình phương của hàm affine nên lồi; đây là quy hoạch bậc hai, không phải LP. Cách tổng quát: $\sum_i(au_i+b-y_i)^2=\|Xw-y\|_2^2$ có Hessian $2X^TX$ nửa xác định dương vì $v^T(2X^TX)v=2\|Xv\|^2\ge0$ với mọi $v$.
:::

### Chuyển tiếp

Phần 2 cho thấy biến phụ biến mục tiêu không tuyến tính thành LP một cách chính xác. Phần tiếp theo giữ cùng dữ liệu hồi quy nhưng đổi cách đo sai số sang tổng bình phương — dẫn tự nhiên đến quy hoạch bậc hai, rồi thêm cơ chế chính quy hóa kiểm soát hệ số.

## Phần 3: Quy hoạch bậc hai và chính quy hóa

### Dẫn nhập

Tiếp nối phần 2, ta giữ cùng dữ liệu nhưng đổi cách đo sai số và thêm cơ chế kiểm soát hệ số. Phần 2 dùng sai số tuyệt đối; phần 3 đổi sang tổng bình phương sai số — một tiêu chí khác, dẫn tự nhiên đến quy hoạch bậc hai (QP). Sau khi có nghiệm, ta thêm chính quy hóa để phạt hệ số, cho cả hai tiêu chí. Nguồn: Boyd–Vandenberghe (2004), §4.4, §6.3.2.

### Ví dụ 3.1: hồi quy với tổng bình phương sai số

**Nhu cầu.** Chọn đường dự đoán cho cùng năm điểm dữ liệu ở phần 2, sao cho giảm được sai số lớn nhờ phép bình phương.

**Dữ liệu, biến, miền, đầu ra.** Dữ liệu $u=(-2,-1,0,1,2)$, $y=(-2,-1,3,1,2)$; $w=(a,b)\in\mathbb R^2$, $\hat y_i=au_i+b$; mục tiêu $E(w)=\sum_{i=1}^5(au_i+b-y_i)^2$. Đầu ra: $w$ và giá trị $E$.

**Mô hình.**

$$\min_w\ E(w)=\sum_{i=1}^{5}(au_i+b-y_i)^2.$$

(Trang chiếu: [Hồi quy với tổng bình phương sai số](lecture-02-cac-bai-toan-toi-uu-loi.html#/qp-hoi-quy).)

![Đường nét đứt ŷ=u và đường nét liền ŷ=u+0,6. Các đoạn thẳng đứng là phần dư của đường nét liền.](img/lec-02/qp-ls.svg)

::: derivation
**Hai ứng viên thử, tính từng bước.**

Ứng viên 1 — đường $\hat y=u$ (tức $a=1,b=0$): phần dư $r_i=au_i+b-y_i$ là

$$r=(0,\ 0,\ -3,\ 0,\ 0),\qquad E=0^2+0^2+(-3)^2+0^2+0^2=9.$$

Ứng viên 2 — đường $\hat y=u+\tfrac35$ (tức $a=1,b=\tfrac35$): phần dư

$$\begin{aligned}
r_1&=-2+\tfrac35+2=\tfrac35,\\
r_2&=-1+\tfrac35+1=\tfrac35,\\
r_3&=0+\tfrac35-3=-\tfrac{12}{5},\\
r_4&=1+\tfrac35-1=\tfrac35,\\
r_5&=2+\tfrac35-2=\tfrac35,
\end{aligned}$$

tức $r=(\tfrac35,\tfrac35,-\tfrac{12}{5},\tfrac35,\tfrac35)$. Tổng bình phương:

$$E=4\cdot\left(\tfrac35\right)^2+\left(\tfrac{12}{5}\right)^2=\tfrac{4\cdot9}{25}+\tfrac{144}{25}=\tfrac{36+144}{25}=\tfrac{180}{25}=\tfrac{36}{5}=7{,}2.$$

Chưa tuyên bố nghiệm — chỉ so hai ứng viên: $36/5<9$. Bình phương phạt nặng điểm lệch xa, nên đường dự đoán được kéo về phía các điểm có sai số lớn. Lưu ý: đổi tiêu chí này **không phải** cải dạng từ bài sai số tuyệt đối; đây là bài toán khác ngay từ đầu.
:::

### Dạng bậc hai của bình phương sai số

$X\in\mathbb R^{m\times n}$, $w\in\mathbb R^n$, $y\in\mathbb R^m$, $r=Xw-y$:

$$\|Xw-y\|_2^2=w^TX^TXw-2y^TXw+y^Ty.$$

(Trang chiếu: [Dạng bậc hai của bình phương sai số](lecture-02-cac-bai-toan-toi-uu-loi.html#/qp-khai-trien).)

::: proof
**Khai triển từng phép nhân.** Viết $\|Xw-y\|_2^2=(Xw-y)^T(Xw-y)$. Khai triển tích hai tổng:

$$(Xw)^T(Xw)-(Xw)^Ty-y^T(Xw)+y^Ty=w^TX^TXw-2y^TXw+y^Ty,$$

dùng $(Xw)^Ty=y^T(Xw)$ vì cả hai là số vô hướng. Ba thành phần: bậc hai $w^TX^TXw$, bậc nhất $-2y^TXw$, hằng số $y^Ty$.

**Chứng nhận lồi qua Hessian.** Gradient: $\nabla E=2X^TXw-2X^Ty$; Hessian: $2X^TX$. Với mọi $v\in\mathbb R^n$:

$$v^T(2X^TX)v=2(Xv)^T(Xv)=2\|Xv\|_2^2\ge0,$$

nên Hessian nửa xác định dương với **mọi** $X$ — mục tiêu lồi. Nếu $X$ có hạng đầy cột thì $X^TX$ xác định dương và mục tiêu lồi chặt; điều kiện hạng đầy cột **không cần** để có tính lồi — nửa xác định dương đủ rồi.
:::

### Dạng phổ biến của QP

$$\begin{aligned}
\min_{x\in\mathbb R^n}\;&\tfrac12x^TPx+q^Tx+r_0\\
\text{với}\quad&Gx\le h,\quad Ax=b,
\end{aligned}$$

với $P=P^T\succeq0$; kích thước $P\in\mathbb R^{n\times n}$, $q\in\mathbb R^n$, $r_0\in\mathbb R$, $G\in\mathbb R^{m\times n}$, $h\in\mathbb R^m$, $A\in\mathbb R^{p\times n}$, $b\in\mathbb R^p$. Mục tiêu lồi vì $P\succeq0$; tập khả thi là giao các nửa không gian và siêu phẳng, lồi. Hồi quy bình phương tối thiểu khớp với $x=w$, $P=2X^TX$, $q=-2X^Ty$, $r_0=y^Ty$, không có ràng buộc. Khi $P=0$, bài trở thành LP. Lưu ý: **không mọi QP đều lồi hoặc có nghiệm**. (Trang chiếu: [Dạng phổ biến của quy hoạch bậc hai](lecture-02-cac-bai-toan-toi-uu-loi.html#/qp-dang-pho-bien).)

### Ví dụ 3.2: nghiệm hồi quy bình phương tối thiểu

**Dữ liệu** như trên. Tính $X^TX$ và $X^Ty$ từ các tổng:

$$\sum_i u_i^2=4+1+0+1+4=10,\qquad \sum_i u_i=0,\qquad \sum_i y_i=-2-1+3+1+2=3,$$

$$\sum_i u_iy_i=(-2)(-2)+(-1)(-1)+0\cdot3+1\cdot1+2\cdot2=4+1+0+1+4=10,\qquad \sum_i y_i^2=4+1+9+1+4=19.$$

Vì cột thứ hai của $X$ toàn số 1: $X^TX=\begin{pmatrix}\sum u_i^2&\sum u_i\\ \sum u_i&5\end{pmatrix}=\operatorname{diag}(10,5)$ và $X^Ty=\begin{pmatrix}\sum u_iy_i\\ \sum y_i\end{pmatrix}=(10,3)$; $y^Ty=19$. (Trang chiếu: [Nghiệm hồi quy bình phương tối thiểu](lecture-02-cac-bai-toan-toi-uu-loi.html#/qp-nghiem-hoi-quy).)

![Các đường đồng mức elip quanh nghiệm (1;0,6). Miền a≤0,5 được tô nhạt, có nghiệm ràng buộc (0,5;0,6).](img/lec-02/qp-geometry.svg)

::: derivation
**Hoàn thành bình phương, từng bước.**

Bước 1 — khai triển theo $w=(a,b)$:

$$E(w)=w^TX^TXw-2y^TXw+y^Ty=10a^2+5b^2-20a-6b+19.$$

Bước 2 — hoàn thành bình phương:

$$\begin{aligned}10a^2-20a&=10(a-1)^2-10,\\5b^2-6b&=5\left(b-\tfrac35\right)^2-\tfrac95.\end{aligned}$$

Bước 3 — ghép:

$$E(w)=10(a-1)^2+5\left(b-\tfrac35\right)^2+19-10-\tfrac95=10(a-1)^2+5\left(b-\tfrac35\right)^2+\tfrac{36}{5}.$$

Bước 4 — nghiệm: mỗi thành phần bình phương không âm, nên $E$ nhỏ nhất khi $a=1$, $b=3/5$; giá trị nhỏ nhất $E(w^\star)=36/5$. Dự đoán $\hat y=u+0{,}6$ — trùng ứng viên thứ hai ở trên, giờ được chứng nhận tối ưu.
:::

**Biến thể $a\le1/2$.** Nghiệm tự do $(1,3/5)$ vi phạm $a\le1/2$. Với $a$ cố định trong $(-\infty,1/2]$, tối ưu theo $b$ vẫn cho $b=3/5$ (số hạng $5(b-3/5)^2$ không phụ thuộc $a$ và đã đạt giá trị nhỏ nhất $0$); còn $E$ theo $a$ là

$$E=10(a-1)^2+\tfrac{36}{5},$$

giảm khi $a$ tăng về 1, nên trên miền chọn $a=1/2$. Nghiệm $(1/2,\,3/5)$ với

$$E=10\left(\tfrac12-1\right)^2+\tfrac{36}{5}=\tfrac{10}{4}+\tfrac{36}{5}=\tfrac{50+144}{20}=\tfrac{97}{10}.$$

Nghiệm bị đẩy lên **mép** miền khả thi, đúng như hình đồng mức. Khi $X$ hạng đầy cột, nghiệm tự do duy nhất; với ràng buộc đang xét, nghiệm tồn tại và nằm trên biên. Tiêu chí bình phương không "tốt hơn" sai số tuyệt đối — chỉ là lựa chọn tiêu chí khác.

### Chính quy hóa — khung

Cần vừa khớp dữ liệu, vừa kiểm soát độ lớn hệ số:

$$\min_w\ L(w)+\lambda R(w),\quad\lambda\ge0,$$

với sai số $L(w)=\|r\|_1$ hoặc $\|r\|_2^2$ và hình phạt $R(w)=\|w\|_1$ hoặc $\|w\|_2^2$. (Trang chiếu: [Chính quy hóa trong hồi quy](lecture-02-cac-bai-toan-toi-uu-loi.html#/qp-chinh-quy-hoa).)

![Hình thoi |a|+|b|=0,8 và đường tròn a²+b²=0,64 trên hai trục cùng tỷ lệ; các đỉnh hình thoi nằm trên trục.](img/lec-02/qp-penalties.svg)

**Giả thiết phải ghi kèm:** chính quy hóa **thay đổi mô hình**; sau cải dạng phải bảo toàn mô hình mới, không quay về mô hình cũ. $\lambda$ là **dữ liệu** do người xây dựng mô hình chọn; $w$ là biến. Ta phạt cả $w=(a,b)$, kể cả hệ số chặn — lựa chọn của ví dụ, không phải quy ước mặc định. Hình thoi (chuẩn một) có đỉnh nằm trên trục, đường tròn (bình phương chuẩn hai) tròn đều — hình dạng vùng phạt quyết định nghiệm được kéo về đâu; hình thoi có thể cho một số hệ số bằng 0, không phải lúc nào cả vectơ cũng bằng 0. Chuẩn một có thể cho $w=0$ nhưng không luôn như vậy; thang đo đặc trưng ảnh hưởng mức phạt. Không khẳng định chính quy hóa luôn cải thiện dự đoán ngoài mẫu. Phương án trực tiếp là giữ nghiệm không phạt, $\lambda=0$.

### Ví dụ 3.3: sai số tuyệt đối + phạt chuẩn một ($\ell_1+\ell_1$, LP)

**Mô hình.** Với $\lambda\ge0$, $r=Xw-y$:

$$\min_w\ \|r\|_1+\lambda\|w\|_1.$$

Thêm biến phụ $t\in\mathbb R^5$ cho sai số, $v\in\mathbb R^2$ cho hệ số:

$$\begin{aligned}
\min_{w,t,v}\;&\mathbf1^Tt+\lambda\mathbf1^Tv\\
\text{với}\quad&-t\le Xw-y\le t,\quad -v\le w\le v.
\end{aligned}$$

(Trang chiếu: [Sai số tuyệt đối và chính quy hóa chuẩn một](lecture-02-cac-bai-toan-toi-uu-loi.html#/qp-lad-l1).)

::: proof
**Chứng nhận lồi và tương đương hai chiều.** Mục tiêu và ràng buộc affine: LP lồi. Chiều thuận: mọi $w$ tạo được $t=|r|$, $v=|w|$ cùng giá trị mục tiêu. Chiều ngược: mọi cặp khả thi có $\mathbf1^Tt\ge\|r\|_1$ và $\mathbf1^Tv\ge\|w\|_1$, nhân với $\lambda\ge0$ bảo toàn bất đẳng thức, nên mục tiêu $\ge$ mục tiêu gốc. Vậy cùng giá trị tối ưu; lấy khối $w$ khôi phục nghiệm. Tại tối ưu $t=|r|$; $v=|w|$ nếu $\lambda>0$, còn $\lambda=0$ không cần $v$ chặt.
:::

::: derivation
**Cận dưới và nghiệm cho $\lambda=4$ và $\lambda=8$.**

Bước 1 — cận cho sai số, chứng minh riêng bằng hiệu hai số hạng. Với $d=a-1$, các cặp phần dư ở Ví dụ 2.4 thỏa

$$|b-d|+|b+d|\ge|(b-d)-(b+d)|=2|d|=2|a-1|,\qquad |b-2d|+|b+2d|\ge|(b-2d)-(b+2d)|=4|d|=4|a-1|,$$

vì dấu **trừ** triệt tiêu $b$ và giữ $d$. Cộng hai bất đẳng thức với phần dư tại $u=0$:

$$\|r\|_1\ \ge\ 2|a-1|+4|a-1|+|b-3|\ =\ 6|a-1|+|b-3|\ \ge\ 6|a-1|+3-|b|.$$

Đây là cận riêng cho bộ dữ liệu này, chứng minh bằng hiệu cặp — không trỏ về chứng minh dùng tổng ở Ví dụ 2.4 (cận đó cho $2|b|$, khác mục đích). Thêm $\lambda(|a|+|b|)$:

$$\|r\|_1+\lambda\|w\|_1\ \ge\ 6|a-1|+\lambda|a|+3+(\lambda-1)|b|.$$

Bước 2 — $\lambda=4$: cận là $6|a-1|+4|a|+3+3|b|$. Xét hàm một biến $6|a-1|+4|a|$: trên $a\le0$ là $6-10a$ giảm; trên $0\le a\le1$ là $6-2a$ giảm; trên $a\ge1$ là $10a-6$ tăng. Giá trị nhỏ nhất tại $a=1$: $0+4=4$. Phần $b$: $3+3|b|\ge3$, dấu bằng tại $b=0$. Vậy mục tiêu $\ge4+3=7$, đạt tại $w^\star=(1,0)$ — kiểm tra: sai số 3, phạt $4\cdot1=4$, tổng 7. **Mục tiêu 7.**

Bước 3 — $\lambda=8$: cận là $6|a-1|+8|a|+3+7|b|$. Hàm $6|a-1|+8|a|$: trên $a\le0$ là $6-14a$ giảm; trên $0\le a\le1$ là $6+2a$ tăng; trên $a\ge1$ là $14a-6$ tăng. Giá trị nhỏ nhất tại $a=0$: $6$. Phần $b$: $3+7|b|\ge3$, dấu bằng tại $b=0$. Vậy mục tiêu $\ge6+3=9$, đạt tại $w^\star=(0,0)$ — kiểm tra: sai số $\|y\|_1=9$, phạt 0, tổng 9. **Mục tiêu 9.**

Bước 4 — chỉ rõ dấu bằng: với $\lambda=4$, dấu bằng cần $a=1$ (từ $6|a-1|+4|a|=4$), $b=0$; khi đó $d=0$ nên các bất đẳng thức hiệu cặp ở bước 1 đạt đẳng thức. Tương tự $\lambda=8$ với $a=b=0$.
:::

**Diễn giải.** $\lambda$ lớn hơn đẩy nghiệm về $(0,0)$: phạt đắt hơn lợi ích khớp. Lấy $w$ sau khi giải để dự đoán $au+b$; $t,v$ chỉ phục vụ biểu diễn.

### Ví dụ 3.4: sai số tuyệt đối + phạt bình phương chuẩn hai ($\ell_1+\ell_2^2$, QP)

**Mô hình.**

$$\min_w\ \|r\|_1+\lambda\|w\|_2^2
\quad\Longleftrightarrow\quad
\begin{aligned}\min_{w,t}\;&\mathbf1^Tt+\lambda w^Tw\\ \text{với}\;&-t\le Xw-y\le t.\end{aligned}$$

(Trang chiếu: [Sai số tuyệt đối và chính quy hóa bậc hai](lecture-02-cac-bai-toan-toi-uu-loi.html#/qp-lad-l2).)

::: proof
**Chứng nhận lồi và nghiệm duy nhất.** Với thứ tự biến $(w,t)$, Hessian của mục tiêu trong bài cải dạng là

$$\operatorname{diag}(2\lambda I_n,0_{m\times m})\succeq0.$$

Các ràng buộc affine nên bài cải dạng là QP lồi. Khối ứng với $t$ bằng không, vì vậy Hessian này không xác định dương.

Hàm gốc $\|Xw-y\|_1+\lambda\|w\|_2^2$ có thể không khả vi tại điểm có phần dư bằng không. Ta chứng minh tính lồi chặt bằng quy tắc cộng hàm. Với $u\ne v$ và $0<\theta<1$,

$$\|\theta u+(1-\theta)v\|_2^2=\theta\|u\|_2^2+(1-\theta)\|v\|_2^2-\theta(1-\theta)\|u-v\|_2^2.$$

Khi $\lambda>0$, nhân đẳng thức này với $\lambda$ và cộng bất đẳng thức lồi của $\|Xw-y\|_1$ cho bất đẳng thức lồi nghiêm của tổng. Hơn nữa, mục tiêu liên tục và không nhỏ hơn $\lambda\|w\|_2^2$, nên tăng ra vô cùng khi $\|w\|_2\to\infty$. Do đó nghiệm tồn tại và duy nhất, không cần giả thiết $X$ có hạng đầy cột.

**Tương đương hai chiều.** Với mọi $w$, chọn $t=|Xw-y|$ thì bài có biến phụ khả thi và giữ nguyên mục tiêu. Ngược lại, mọi $(w,t)$ khả thi thỏa $\mathbf1^Tt\ge\|Xw-y\|_1$, nên mục tiêu mới không nhỏ hơn mục tiêu gốc tại $w$. Hai bài có cùng giá trị tối ưu; lấy $w$ từ nghiệm QP khôi phục nghiệm gốc. Khi $\lambda=0$, bài trở về LP của hồi quy sai số tuyệt đối.
:::

::: derivation
**Nghiệm cho $\lambda=4$.**

Bước 1 — tách hàm mục tiêu. Từ bước 1 của Ví dụ 3.3: $\|r\|_1\ge6|a-1|+3-b$ (dùng $|b-3|\ge3-b$, với dấu bằng trong bất đẳng thức này khi $b\le3$). Cận tổng thu được đúng với mọi $a,b$. Thêm phạt $4(a^2+b^2)$:

$$\Phi(a,b):=\|r\|_1+4\|w\|_2^2\ \ge\ 6|a-1|+4a^2+4b^2+3-b.$$

Bước 2 — phần theo $b$, hoàn thành bình phương:

$$4b^2-b=4\left(b-\tfrac18\right)^2-\tfrac1{16},$$

nhỏ nhất tại $b=\tfrac18$ với giá trị $-\tfrac1{16}$.

Bước 3 — phần theo $a$, đặt $g(a)=6|a-1|+4a^2$, xét hai vùng:

- Vùng $a\le1$: $g(a)=6(1-a)+4a^2=4a^2-6a+6=4\left(a-\tfrac34\right)^2+\tfrac{15}{4}$, nhỏ nhất tại $a=\tfrac34\le1$ với giá trị $\tfrac{15}{4}$.
- Vùng $a\ge1$: $g(a)=6(a-1)+4a^2=4a^2+6a-6$; đạo hàm $8a+6>0$ trên vùng, hàm tăng, nhỏ nhất tại $a=1$ với giá trị $4$.

So sánh: $\tfrac{15}{4}<4$, nên phần $a$ nhỏ nhất là $\tfrac{15}{4}$ tại $a=\tfrac34$.

Bước 4 — ghép cận dưới: giá trị nhỏ nhất của cận là

$$\tfrac{15}{4}-\tfrac1{16}+3=\tfrac{60-1+48}{16}=\tfrac{107}{16}\quad(\text{vùng } a\le1),$$

Trên vùng $a\ge1$, giá trị nhỏ nhất của cận là $4-\tfrac1{16}+3=\tfrac{111}{16}>\tfrac{107}{16}$. Vậy cận dưới toàn cục là $\tfrac{107}{16}$, ứng viên $w=(\tfrac34,\tfrac18)$.

Bước 5 — kiểm tra điều kiện dấu bằng tại ứng viên. Với $a\le1$, đặt $\delta=1-a\ge0$. Nếu $|b|\le\delta$ thì $b-\delta\le0\le b+\delta$ và $b-2\delta\le0\le b+2\delta$. Do đó

$$\begin{aligned}
|b-\delta|+|b+\delta|&=(\delta-b)+(\delta+b)=2\delta,\\
|b-2\delta|+|b+2\delta|&=(2\delta-b)+(2\delta+b)=4\delta.
\end{aligned}$$

Tại $a=3/4$, $b=1/8$, ta có $\delta=1/4$, $|b|\le\delta$ và $b\le3$, nên cả ba bất đẳng thức tạo cận đều đạt dấu bằng. Vì cận $107/16$ đúng trên toàn miền và đạt được tại ứng viên, $w^\star=(3/4,1/8)$ là nghiệm tối ưu. Không cần cận đạt dấu bằng tại những điểm khác.

Bước 6 — số liệu cuối. Phần dư $r=Xw-y$ với $a=\tfrac34$, $b=\tfrac18$:

$$\begin{aligned}
r_1&=-\tfrac32+\tfrac18+2=\tfrac58,\\
r_2&=-\tfrac34+\tfrac18+1=\tfrac38,\\
r_3&=\tfrac18-3=-\tfrac{23}{8},\\
r_4&=\tfrac34+\tfrac18-1=-\tfrac18,\\
r_5&=\tfrac32+\tfrac18-2=-\tfrac38,
\end{aligned}$$

tức $r=(\tfrac58,\tfrac38,-\tfrac{23}{8},-\tfrac18,-\tfrac38)$. Tổng sai số tuyệt đối:

$$L=\|r\|_1=\tfrac58+\tfrac38+\tfrac{23}{8}+\tfrac18+\tfrac38=\tfrac{35}{8}.$$

Phạt $4\left(\tfrac{9}{16}+\tfrac1{64}\right)=4\cdot\tfrac{37}{64}=\tfrac{37}{16}$. Mục tiêu:

$$J=L+\text{phạt}=\tfrac{35}{8}+\tfrac{37}{16}=\tfrac{70+37}{16}=\tfrac{107}{16},$$

khớp đúng cận dưới ở bước 4 — chứng nhận hoàn chỉnh.
:::

**Diễn giải.** Phạt bậc hai "mềm" hơn chuẩn một ở vùng hệ số nhỏ, nên nghiệm không triệt tiêu hoàn toàn như $\ell_1+\ell_1$.

### Ví dụ 3.5: tổng bình phương sai số + phạt chuẩn một ($\ell_2^2+\ell_1$, QP)

**Mô hình.**

$$\min_w\ \|r\|_2^2+\lambda\|w\|_1
\quad\Longleftrightarrow\quad
\begin{aligned}\min_{w,v}\;&\|Xw-y\|_2^2+\lambda\mathbf1^Tv\\ \text{với}\;&-v\le w\le v.\end{aligned}$$

(Trang chiếu: [Tổng bình phương sai số và chính quy hóa chuẩn một](lecture-02-cac-bai-toan-toi-uu-loi.html#/qp-ls-l1).)

::: proof
**Chứng nhận.** Với thứ tự $(w,v)$, ma trận bậc hai $P=\operatorname{diag}(2X^TX,0_{n\times n})\succeq0$ và các ràng buộc affine: QP lồi. Mỗi $w$ chọn $v=|w|$ cho cùng mục tiêu; ngược lại mọi cặp khả thi có $\mathbf1^Tv\ge\|w\|_1$, nhân với $\lambda\ge0$ bảo toàn bất đẳng thức — cải dạng tương đương, lấy lại $w$. Với $\lambda=0$, $v$ không cần chặt. $X$ hạng đầy cột đủ để $w$ duy nhất (phần bình phương lồi chặt); hàm gốc không trơn nhưng cải dạng là QP trơn.
:::

::: derivation
**Công thức nghiệm theo ngưỡng — chỉ cho dữ liệu này.**

Bước 1 — tách theo thành phần. Từ Ví dụ 3.2, $\|r\|_2^2=10(a-1)^2+5(b-3/5)^2+36/5$. Bài tách thành hai bài một biến độc lập:

$$\min_a\ 10(a-1)^2+\lambda|a|,\qquad \min_b\ 5\left(b-\tfrac35\right)^2+\lambda|b|.$$

Bước 2 — bài một biến $\min_s\ \alpha(s-\mu)^2+\lambda|s|$ với $\alpha,\mu>0$, $\lambda\ge0$. Xét ba vùng:

- Vùng $s<0$: hàm bằng $\alpha(s-\mu)^2-\lambda s$; đạo hàm $2\alpha(s-\mu)-\lambda$. Vì $s<0<\mu$ nên $2\alpha(s-\mu)<0$, cộng $-\lambda\le0$: đạo hàm **âm**, hàm giảm trên toàn vùng — không có điểm nhỏ nhất trong vùng mở $s<0$.
- Vùng $s>0$: đạo hàm $2\alpha(s-\mu)+\lambda=0\Rightarrow s^\ast=\mu-\tfrac{\lambda}{2\alpha}$, hợp lệ (dương) khi và chỉ khi $\lambda<2\alpha\mu$.
- Điểm $s=0$: giá trị $\alpha\mu^2$. Nếu $\lambda\ge2\alpha\mu$ thì trên $s>0$ đạo hàm $2\alpha(s-\mu)+\lambda\ge2\alpha(s-\mu)+2\alpha\mu=2\alpha s>0$, hàm tăng từ giá trị tại $0$, nên nhỏ nhất tại $s=0$. Nếu $\lambda<2\alpha\mu$, so sánh giá trị tại $s^\ast$ với tại $0$:

$$\alpha\left(\tfrac{\lambda}{2\alpha}\right)^2+\lambda\left(\mu-\tfrac{\lambda}{2\alpha}\right)=\tfrac{\lambda^2}{4\alpha}+\lambda\mu-\tfrac{\lambda^2}{2\alpha}=\lambda\mu-\tfrac{\lambda^2}{4\alpha}\ \le\ \alpha\mu^2,$$

tương đương $0\le\alpha\mu^2-\lambda\mu+\tfrac{\lambda^2}{4\alpha}=\alpha\left(\mu-\tfrac{\lambda}{2\alpha}\right)^2\ge0$ — không âm, và dương khi $\lambda<2\alpha\mu$. Vậy

$$s^\star=\max\left(\mu-\tfrac{\lambda}{2\alpha},\,0\right).$$

Bước 3 — áp dụng: $a$: $\alpha=10,\mu=1\Rightarrow a_\lambda=\max(1-\lambda/20,0)$; $b$: $\alpha=5,\mu=3/5\Rightarrow b_\lambda=\max(3/5-\lambda/10,0)$. Công thức ngưỡng **chỉ** dùng cho cấu trúc $X^TX=\operatorname{diag}(10,5)$; không áp cho mọi ma trận dữ liệu.

Bước 4 — $\lambda=4$: $w^\star=(1-4/20,\,3/5-4/10)=(4/5,\,1/5)$. Tổng bình phương sai số:

$$10\left(\tfrac45-1\right)^2+5\left(\tfrac15-\tfrac35\right)^2+\tfrac{36}{5}=\tfrac{10}{25}+\tfrac{20}{25}+\tfrac{180}{25}=\tfrac{210}{25}=\tfrac{42}{5}.$$

Phạt $4(4/5+1/5)=4$. Mục tiêu $42/5+4=62/5$.

Bước 5 — ngưỡng triệt tiêu: $b=0$ khi $\lambda\ge6$; $a=0$ khi $\lambda\ge20$. Với $\lambda=8$: $w=(3/5,0)$ — thành phần $b$ bằng 0, minh họa tính thưa, nhưng điều này **không đúng với mọi dữ liệu**. Thành phần $b$ về 0 trước vì ngưỡng của $b$ ($\lambda=6$) nhỏ hơn của $a$ ($\lambda=20$), đọc trực tiếp từ công thức.
:::

### Ví dụ 3.6: tổng bình phương sai số + phạt bình phương chuẩn hai ($\ell_2^2+\ell_2^2$, Tikhonov)

**Mô hình.**

$$\min_w\ \|r\|_2^2+\lambda\|w\|_2^2,\qquad P=2(X^TX+\lambda I)\succeq0.$$

Không cần biến phụ: QP lồi. (Trang chiếu: [Tổng bình phương sai số và chính quy hóa bậc hai](lecture-02-cac-bai-toan-toi-uu-loi.html#/qp-ls-l2).)

::: proof
**Chứng minh xác định dương và nghiệm duy nhất.** Khai triển: mục tiêu $=w^T(X^TX+\lambda I)w-2y^TXw+y^Ty$ — phép khai triển tương đương với mô hình **có** phạt, không với bài chưa phạt. Với mọi $d\ne0$:

$$d^T(X^TX+\lambda I)d=\|Xd\|_2^2+\lambda\|d\|_2^2>0\quad\text{nếu }\lambda>0,$$

nên $X^TX+\lambda I$ xác định dương, mục tiêu lồi chặt, nghiệm duy nhất. Khi $\lambda=0$ chỉ cần $X$ hạng đầy cột. Nếu chỉ phạt một phần hệ số thì ma trận không tự động xác định dương; ở đây ta phạt cả $a$ và $b$ — lựa chọn minh họa.
:::

::: derivation
**Nghiệm cho $\lambda=10$.** Điều kiện dừng của hàm bậc hai: $\nabla=2(X^TX+10I)w-2X^Ty=0$, tức $(X^TX+10I)w=X^Ty$. Theo thành phần: $(10+10)a=10\Rightarrow a=1/2$; $(5+10)b=3\Rightarrow b=1/5$. Vậy $w^\star=(1/2,1/5)$.

Giá trị các thành phần, dùng công thức hoàn thành bình phương của Ví dụ 3.2:

$$E=10\left(\tfrac12-1\right)^2+5\left(\tfrac15-\tfrac35\right)^2+\tfrac{36}{5}=\tfrac{10}{4}+5\cdot\tfrac{4}{25}+\tfrac{36}{5}=\tfrac52+\tfrac45+\tfrac{36}{5}=\tfrac52+8=\tfrac{21}{2}.$$

Phạt $10\left(\tfrac14+\tfrac1{25}\right)=10\cdot\tfrac{29}{100}=\tfrac{29}{10}$. Mục tiêu:

$$J=\tfrac{21}{2}+\tfrac{29}{10}=\tfrac{105+29}{10}=\tfrac{67}{5}.$$

Đây là cực tiểu toàn cục duy nhất vì Hessian xác định dương.
:::

### Bảng tổng hợp bốn tổ hợp

Cùng dữ liệu, bốn lựa chọn sai số và hình phạt (Trang chiếu: [Nghiệm hồi quy có chính quy hóa](lecture-02-cac-bai-toan-toi-uu-loi.html#/qp-so-sanh-chinh-quy)):

![Bốn đường hồi quy cho bốn tổ hợp sai số và hình phạt trên cùng năm điểm dữ liệu; từng khung ghi các hệ số và tham số phạt.](img/lec-02/qp-regularized.svg)

| Sai số + phạt | $\lambda$ | $w^\star$ | Dạng | Mục tiêu |
|---|---|---|---|---|
| $\ell_1+\ell_1$ | 4 | $(1,0)$ | LP | 7 |
| $\ell_1+\ell_2^2$ | 4 | $(3/4,1/8)$ | QP | $107/16$ |
| $\ell_2^2+\ell_1$ | 4 | $(4/5,1/5)$ | QP | $62/5$ |
| $\ell_2^2+\ell_2^2$ | 10 | $(1/2,1/5)$ | QP | $67/5$ |

Chỉ hàng đầu cải dạng thành LP; ba hàng còn lại thành QP với $\lambda>0$ đang xét. Mỗi giá trị đã được kiểm theo mục tiêu của chính nó; **không so chéo** các số này như cùng một thước đo. Các $\lambda$ được chọn để minh họa, chưa phải kết quả chọn tham số trên tập kiểm định.

**Biến thể $\lambda=0$:** hai hàng đầu trở về hồi quy sai số tuyệt đối, nghiệm $(1,0)$; hai hàng cuối về bình phương tối thiểu, nghiệm $(1,3/5)$. **Biến thể $\lambda=8$:** hàng 1 cho $(0,0)$, hàng 3 cho $(3/5,0)$ — ví dụ một số hệ số bằng 0, không phải bảo đảm cho mọi dữ liệu.

### Ví dụ 3.7: trần cứng độ lớn hệ số (QCQP riêng)

**Nhu cầu.** Thay phạt mềm bằng trần cứng — giới hạn trực tiếp độ lớn hệ số. (Trang chiếu: [Hồi quy với giới hạn độ lớn hệ số](lecture-02-cac-bai-toan-toi-uu-loi.html#/qp-gioi-han-he-so).)

![Miền hình tròn a²+b²≤0,29. Đồng mức sai số 10,5 chạm miền tại (0,5;0,2); nghiệm không ràng buộc (1;0,6) nằm ngoài.](img/lec-02/qp-bound.svg)

**Mô hình.** Trên cùng dữ liệu, $w\in\mathbb R^2$:

$$\begin{aligned}
\min_w\;&E(w)\\
\text{với}\quad&\|w\|_2^2\le\tfrac{29}{100}.
\end{aligned}$$

**Kết quả:** $w^\star=(1/2,1/5)$, $E(w^\star)=21/2$.

::: proof
**Chứng nhận ràng buộc lồi.** Đặt $g(w)=w^Tw-29/100$; Hessian của $g$ là $2I$ xác định dương nên $g$ lồi; tập mức dưới $g(w)\le0$ là tập lồi (theo khung phần 1). Mục tiêu $E$ lồi (đã chứng minh). Bài là QCQP lồi. Chú ý đơn vị: $29/100$ là **bình phương** bán kính; bán kính của hình tròn là $R=\sqrt{29}/10$, đúng bằng $\|w^\star\|_2$.

**Chứng nhận tối ưu bằng hình phạt $\lambda=10$.** Từ Ví dụ 3.6, $w^\star=(1/2,1/5)$ là nghiệm toàn cục của $\min_w\big(E(w)+10\|w\|_2^2\big)$, nên với mọi $w$:

$$E(w)+10\|w\|_2^2\ \ge\ E(w^\star)+10\|w^\star\|_2^2=E(w^\star)+10\cdot\tfrac{29}{100}.$$

Suy ra với mọi $w$ khả thi ($\|w\|_2^2\le29/100$):

$$E(w)\ \ge\ E(w^\star)+10\left(\tfrac{29}{100}-\|w\|_2^2\right)\ \ge\ E(w^\star).$$

Và $w^\star$ khả thi vì $\|w^\star\|_2^2=1/4+1/25=29/100$. Vậy $w^\star$ tối ưu cho bài trần cứng.

**Giới hạn của lập luận:** không tự khẳng định $\lambda=R$ nói chung; đúng hơn, **tồn tại** tham số đã chọn ($\lambda=10$) cho nghiệm cùng $w^\star$. Bán kính được chọn bằng chuẩn của nghiệm bài $\lambda=10$ — mang tính chủ đích minh họa, và cách dùng chứng nhận này không phải là thuật toán tìm $\lambda$ tổng quát.
:::

**Biến thể.** Nếu $R=0$ thì miền chỉ có $w=0$, nghiệm $w=0$. Cần $R^2\ge34/25$ để nghiệm bình phương tối thiểu $(1,3/5)$ khả thi: $\|w^\star\|^2=1+9/25=34/25$. Ràng buộc tròn này là trường hợp riêng của cấu trúc tổng quát — mục tiếp theo.

::: exercise
Với $R\ge0$, chứng minh trực tiếp tập $C=\{w:\|w\|_2^2\le R^2\}$ lồi bằng tổ hợp lồi của hai điểm khả thi.
:::

::: solution
Lấy $u,v\in C$ và $\theta\in[0,1]$. Từ tính lồi của bình phương chuẩn hai,

$$\|\theta u+(1-\theta)v\|_2^2\le\theta\|u\|_2^2+(1-\theta)\|v\|_2^2\le\theta R^2+(1-\theta)R^2=R^2.$$

Vậy $\theta u+(1-\theta)v\in C$. Trường hợp $R=0$ cũng đúng: tập chỉ gồm vectơ không.
:::

### QCQP tổng quát

$$\begin{aligned}
\min_{x\in\mathbb R^n}\;&\tfrac12x^TP_0x+q_0^Tx+r_0\\
\text{với}\quad&\tfrac12x^TP_ix+q_i^Tx+r_i\le0,\quad i=1,\ldots,m,\\
&Ax=b,
\end{aligned}$$

với $P_i=P_i^T\succeq0$ với $i=0,\ldots,m$; kích thước $x\in\mathbb R^n$, $P_i\in\mathbb R^{n\times n}$ đối xứng, $q_i\in\mathbb R^n$, $r_i\in\mathbb R$, $A\in\mathbb R^{p\times n}$, $b\in\mathbb R^p$. Mục tiêu lồi; các bất đẳng thức lồi và đẳng thức affine xác định tập khả thi lồi. Giới hạn trước của ta là trường hợp riêng: $P_0=2X^TX$, $q_0=-2X^Ty$, $r_0=y^Ty$; còn $P_1=2I$, $q_1=0$, $r_1=-29/100$ cho ràng buộc tròn. Nếu $P_i=0$ với mọi $i\ge1$ thì các ràng buộc affine và QCQP suy thành QP. Điều kiện $P_i\succeq0$ chứng nhận tính lồi của từng hàm bậc hai. Nếu thiếu điều kiện này, biểu diễn hiện tại chưa chứng nhận được tính lồi; cần kiểm tra riêng mục tiêu và tập khả thi. (Trang chiếu: [Quy hoạch bậc hai với ràng buộc bậc hai](lecture-02-cac-bai-toan-toi-uu-loi.html#/qp-rang-buoc-bac-hai).)

### Nhận dạng và chứng nhận bài toán bậc hai (3 biến thể tự kiểm)

::: exercise
(1) Thêm $\|w\|_1\le R$, $R\ge0$, vào hồi quy tổng bình phương sai số có chính quy hóa chuẩn một. (2) Đổi giới hạn thành $\|w\|_2^2\ge R^2$, $R>0$. (3) Đặt $\lambda=0$ trong cải dạng $\ell_2^2+\ell_1$: có buộc $v=|w|$ tại nghiệm tối ưu không?
:::

::: solution
(1) Đúng, vẫn QP: đặt $v\ge w$ và $v\ge-w$, thêm $\mathbf1^Tv\le R$; mục tiêu bậc hai lồi, ràng buộc affine. Với $w$ gốc khả thi, chọn $v=|w|$ khả thi cho bài mới; ngược lại mọi cặp mới có $\|w\|_1\le\mathbf1^Tv\le R$; giá trị tối ưu được bảo toàn vì hệ số phạt không âm. (2) Không lồi: miền $\|w\|_2^2\ge R^2$ là phần ngoài hình tròn; lấy hai điểm đối nhau trên biên bán kính $R$, trung điểm là gốc $0$ không thuộc miền — tập không lồi. (3) Không: với $\lambda=0$ hệ số của $v$ trong mục tiêu bằng 0, nên $v$ có thể lớn hơn $|w|$ tại nghiệm tối ưu, nhưng vẫn khôi phục được $w$ đúng; $v$ chỉ là biến phụ.
:::

### Chuyển tiếp

Khi biến ban đầu không lộ rõ tính lồi, ta cần xét các phép đổi biến; nhưng không phải mọi bài toán không lồi đều cải dạng được. Phần 4 xét quy hoạch hình học — lớp mô hình có tích và tỷ số của các đại lượng dương, nơi phép đổi biến logarit tạo ra bài toán lồi tương đương.

## Phần 4: Quy hoạch hình học

### Dẫn nhập

Ở các mô hình trước, ta nhận ra tính lồi theo biến ban đầu hoặc thêm biến phụ. Một số bài toán có **tích và tỷ số** của các đại lượng dương cần thêm phép đổi biến. Hai ví dụ — thiết kế hộp và phân bổ công suất — sẽ cho thấy khi nào phép đổi biến logarit tạo ra bài toán lồi tương đương. Nguồn: Boyd–Vandenberghe (2004), §4.5, tr. 160–163.

### Ví dụ 4.1: hộp đựng và chi phí vật liệu

**Nhu cầu.** Cần thiết kế hộp kín có dung tích $8\,\mathrm{dm}^3$: chọn chiều dài, chiều rộng và chiều cao để dùng ít vật liệu nhất. Cùng một vật liệu cho mọi mặt, nên chi phí tỷ lệ với diện tích bề mặt. Bỏ qua độ dày, mép ghép và hao hụt cắt; giá trên một đơn vị diện tích giống nhau ở cả sáu mặt.

**Dữ liệu, biến, đơn vị, đầu ra.** Lấy $1\,\mathrm{dm}$ làm đơn vị chiều dài; $a,b,c$ là giá trị số của kích thước theo đơn vị đó — nhờ vậy có thể lấy logarit của các số không thứ nguyên. Đầu ra cần báo cáo vẫn là ba kích thước thật theo dm và diện tích theo dm². Biến quyết định: $a,b,c>0$.

**Mô hình.**

$$\begin{aligned}
\min_{a,b,c>0}\;&S(a,b,c)=2(ab+ac+bc)\\
\text{với}\quad&abc=8.
\end{aligned}$$

Hai ứng viên: hộp $(1,2,4)$ có $S=28$; hộp $(2,2,2)$ có $S=24$ — cùng thể tích 8 dm³ nhưng diện tích khác nhau. Thử vài bộ kích thước gợi ý hộp cân đối hơn tiết kiệm vật liệu, nhưng chưa chứng minh được tối ưu. (Trang chiếu: [Hộp đựng và chi phí vật liệu](lecture-02-cac-bai-toan-toi-uu-loi.html#/gp-hop-cau-chuyen), [Mô hình thiết kế hộp](lecture-02-cac-bai-toan-toi-uu-loi.html#/gp-hop-mo-hinh).)

![Hộp chữ nhật kín có ba cạnh a, b, c và thể tích 8 dm³; mô hình bỏ qua độ dày và mép ghép.](img/lec-02/gp-box.svg)

::: proof
**Chứng minh bài toán không lồi theo biến gốc.**

Bước 1 — tập khả thi không lồi: hai điểm $(1,2,4)$ và $(4,2,1)$ cùng khả thi vì tích đều bằng 8; trung điểm $(5/2,\,2,\,5/2)$ có tích $\tfrac52\cdot2\cdot\tfrac52=\tfrac{25}{2}\ne8$, nên không thuộc tập khả thi. Vậy tập khả thi không lồi.

Bước 2 — hàm mục tiêu không lồi: $S=2ab+2ac+2bc$; Hessian của $S$ theo $(a,b,c)$ là

$$\nabla^2S=\begin{bmatrix}0&2&2\\2&0&2\\2&2&0\end{bmatrix},$$

có trị riêng $4$ (vectơ $(1,1,1)$) và $-2$ (bội hai, ví dụ $(1,-1,0)$). Có trị riêng âm nên $S$ không lồi. Đây là kiểm tra Hessian của hàm trên miền dương, không phải khẳng định có điểm dừng hoặc điểm yên ngựa khả thi.
:::

**Diễn giải.** Ta sẽ **giữ yêu cầu thể tích và chi phí này**, thay cách biểu diễn tích kích thước — đó là vai trò của quy hoạch hình học.

### Đơn thức và tổng đơn thức dương

Miền $x\in\mathbb R_{++}^n$: mọi thành phần $x_i>0$.

$$m(x)=c\prod_{i=1}^n x_i^{\alpha_i},\qquad c>0,\quad\alpha_i\in\mathbb R$$

là **đơn thức**; ví dụ $2x_1^{-1}x_2^{1/2}$ là một đơn thức. Tổng hữu hạn các đơn thức

$$f(x)=\sum_{k=1}^{K}c_k\prod_{i=1}^n x_i^{\alpha_{ik}},\qquad c_k>0$$

là **tổng đơn thức dương** (posynomial). (Trang chiếu: [Đơn thức và tổng đơn thức dương](lecture-02-cac-bai-toan-toi-uu-loi.html#/gp-don-thuc).)

**Giải thích định nghĩa.** Định nghĩa mở rộng đơn thức đại số quen thuộc: hệ số dương, số mũ **thực** bất kỳ, biến dương. Ví dụ $x_1+2x_2/x_1$ là tổng hai đơn thức dương. Trong mô hình hộp, $abc/8$ là đơn thức; $2ab+2ac+2bc$ là tổng ba đơn thức dương. "Tổng đơn thức dương" **không** có nghĩa là mọi đa thức nhận giá trị dương: các hệ số trong biểu diễn phải dương. Các số hạng hệ số 0 được bỏ đi. Ở đây $n,K$ là số nguyên dương; $c_k,\alpha_{ik}$ là dữ liệu.

### Dạng chuẩn GP và các quy tắc cải dạng

**Dạng chuẩn** (Boyd (4.43)):

$$\begin{aligned}
\min_{x\in\mathbb R_{++}^n}\;&f_0(x)\\
\text{với}\quad&f_i(x)\le1,\quad i=1,\ldots,m,\\
&h_j(x)=1,\quad j=1,\ldots,p,
\end{aligned}$$

với $f_0,\ldots,f_m$ là các tổng đơn thức dương và $h_1,\ldots,h_p$ là các đơn thức. Đây là dạng chuẩn của quy hoạch hình học; dạng chuẩn này **không nhất thiết lồi** theo biến $x$. Số $m$ hoặc $p$ có thể bằng 0. Hộp đã có mục tiêu đúng lớp; chuẩn hóa đẳng thức thành $abc/8=1$ là đủ đưa về dạng GP — nhưng điều này chưa chứng nhận mô hình lồi theo kích thước. (Trang chiếu: [Dạng chuẩn của quy hoạch hình học](lecture-02-cac-bai-toan-toi-uu-loi.html#/gp-dang-chuan).)

**Quy tắc cải dạng** (với $f$: tổng đơn thức dương; $g,h,h_1,h_2$: đơn thức; mọi biến dương):

$$f(x)\le g(x)\iff f(x)/g(x)\le1,\qquad h_1(x)=h_2(x)\iff h_1(x)/h_2(x)=1,$$

$$\max_x h(x)\ \longleftrightarrow\ \min_x h(x)^{-1}.$$

(Trang chiếu: [Cải dạng về quy hoạch hình học](lecture-02-cac-bai-toan-toi-uu-loi.html#/gp-cai-dang-chuan).)

::: proof
**Chứng minh các quy tắc.** Vì mẫu số là đơn thức nhận giá trị **dương**, chia không đổi chiều bất đẳng thức; phép biến đổi ngược là nhân lại, nên các tương đương là hai chiều đúng nghĩa. Cấu trúc: chia tổng đơn thức dương cho một đơn thức vẫn cho tổng đơn thức dương, theo quy tắc **trừ số mũ**:

$$\frac{c\prod_i x_i^{\alpha_i}}{d\prod_i x_i^{\beta_i}}=\frac{c}{d}\prod_i x_i^{\alpha_i-\beta_i},$$

với $c/d>0$ và số mũ $\alpha_i-\beta_i$ thực bất kỳ — vẫn đúng lớp tổng đơn thức dương. Thương và nghịch đảo của các đơn thức vẫn là đơn thức. Với cực đại: $h$ giảm chặt theo $h^{-1}$ trên số dương (nghịch đảo là hàm giảm chặt trên $(0,\infty)$), nên điểm tối đa hóa $h$ chính là điểm tối thiểu hóa $1/h$ trên cùng miền; **giá trị hai mục tiêu là nghịch đảo nhau, không phải bằng nhau**. Quy tắc này không tự áp dụng cho cực đại một tổng đơn thức dương (nghịch đảo của tổng không phải tổng đơn thức dương).

**Áp dụng cụ thể:** với hộp, $abc=8$ thành $abc/8=1$. Giới hạn trên $f(x)\le M$, $M>0$, thành $f(x)/M\le1$. Ràng buộc cận dưới đơn thức $h(x)\ge L>0$ thành $L/h(x)\le1$.
:::

### Đổi biến logarit

Đặt $z_i=\log x_i$, tức $x_i=e^{z_i}$, với $i=1,\ldots,n$ (logarit tự nhiên, áp dụng theo từng thành phần). Phép đổi là **song ánh** giữa $\mathbb R_{++}^n$ và $\mathbb R^n$. Khi đó:

$$\log m(e^z)=\alpha^Tz+\log c,$$

$$\log f(e^z)=\log\left(\sum_{k=1}^{K}e^{\alpha_k^Tz+\beta_k}\right),\quad\beta_k=\log c_k.$$

(Trang chiếu: [Phép đổi biến logarit](lecture-02-cac-bai-toan-toi-uu-loi.html#/gp-doi-bien).)

::: derivation
**Đổi log từng bước.** Bước 1 — đơn thức: $m(e^z)=c\prod_i e^{\alpha_iz_i}=c\,e^{\alpha^Tz}=e^{\alpha^Tz+\log c}$ (dùng $c=e^{\log c}$, hợp lệ vì $c>0$); lấy logarit thu được hàm **affine**. Bước 2 — tổng đơn thức dương: $f(e^z)=\sum_k e^{\alpha_k^Tz+\beta_k}$; hệ số dương được hấp thụ vào số mũ qua $\beta_k=\log c_k$; **logarit của tổng không bằng tổng các logarit** — phải giữ nguyên dạng logarit tổng hàm mũ (log-sum-exp). Bước 3 — bảo toàn thứ tự: do mọi hàm trong dạng chuẩn nhận giá trị dương và logarit tăng chặt, $f_i(x)\le1\iff\log f_i(x)\le0$ và $h_j(x)=1\iff\log h_j(x)=0$.
:::

### Dạng lồi sau đổi biến và chứng minh logarit tổng hàm mũ lồi

Sau đổi biến, bài GP trở thành:

$$\begin{aligned}
\min_{z\in\mathbb R^n}\;&F_0(z)\\
\text{với}\quad&F_i(z)\le0,\quad i=1,\ldots,m,\\
&\gamma_j^Tz+\delta_j=0,\quad j=1,\ldots,p,
\end{aligned}$$

trong đó $F_i(z)=\log\sum_{k=1}^{K_i}\exp(\alpha_{ik}^Tz+\beta_{ik})$ với dữ liệu $\alpha_{ik}\in\mathbb R^n$, $\beta_{ik}\in\mathbb R$; và nếu $h_j(x)=d_j\prod_\ell x_\ell^{\gamma_{j\ell}}$, $d_j>0$, thì $\delta_j=\log d_j$. (Trang chiếu: [Dạng lồi của quy hoạch hình học](lecture-02-cac-bai-toan-toi-uu-loi.html#/gp-dang-loi).)

::: proof
**Chứng minh logarit tổng hàm mũ lồi.** Xét

$$F(z)=\log\sum_{k=1}^{K}e^{\alpha_k^Tz+\beta_k},\qquad z,\alpha_k\in\mathbb R^n,\quad\beta_k\in\mathbb R.$$

Bước 1 — đặt $Z(z)=\sum_{k=1}^Ke^{\alpha_k^Tz+\beta_k}>0$ và $\pi_k=e^{\alpha_k^Tz+\beta_k}/Z(z)$. Khi đó $\pi_k>0$, $\sum_k\pi_k=1$. Quy tắc đạo hàm logarit cho

$$\nabla F(z)=\frac{\sum_k e^{\alpha_k^Tz+\beta_k}\alpha_k}{Z(z)}=\sum_k\pi_k\alpha_k=: \bar\alpha.$$

Bước 2 — đạo hàm từng trọng số bằng quy tắc tỷ số:

$$\begin{aligned}
\nabla\pi_k
&=\frac{e^{\alpha_k^Tz+\beta_k}\alpha_k Z-e^{\alpha_k^Tz+\beta_k}\nabla Z}{Z^2}\\
&=\pi_k\left(\alpha_k-\frac{\nabla Z}{Z}\right)
=\pi_k(\alpha_k-\bar\alpha).
\end{aligned}$$

Bước 3 — đạo hàm gradient và thu gọn:

$$\begin{aligned}
\nabla^2F
&=\sum_k\alpha_k(\nabla\pi_k)^T\\
&=\sum_k\pi_k\alpha_k\alpha_k^T-\left(\sum_k\pi_k\alpha_k\right)\bar\alpha^T\\
&=\sum_k\pi_k\alpha_k\alpha_k^T-\bar\alpha\bar\alpha^T.
\end{aligned}$$

Để đưa về các tích bình phương, khai triển biểu thức tâm hóa:

$$\begin{aligned}
\sum_k\pi_k(\alpha_k-\bar\alpha)(\alpha_k-\bar\alpha)^T
&=\sum_k\pi_k\alpha_k\alpha_k^T-\bar\alpha\bar\alpha^T-\bar\alpha\bar\alpha^T+\bar\alpha\bar\alpha^T\\
&=\sum_k\pi_k\alpha_k\alpha_k^T-\bar\alpha\bar\alpha^T
=\nabla^2F.
\end{aligned}$$

Ở đây đã dùng $\sum_k\pi_k\alpha_k=\bar\alpha$ và $\sum_k\pi_k=1$ để thu gọn các số hạng. Ma trận này cũng là ma trận hiệp phương sai của các vectơ $\alpha_k$ với trọng số $\pi_k$.

Bước 4 — kiểm dạng toàn phương. Với mọi $v\in\mathbb R^n$,

$$v^T\nabla^2Fv=\sum_k\pi_k\bigl[v^T(\alpha_k-\bar\alpha)\bigr]^2\ge0.$$

Mọi trọng số đều dương và mọi bình phương đều không âm. Hàm $F$ khả vi hai lần trên toàn bộ $\mathbb R^n$, nên Hessian nửa xác định dương tại mọi điểm chứng minh $F$ lồi.

**Cảnh báo:** đây là chứng minh trực tiếp; **logarit của một hàm lồi bất kỳ không nhất thiết lồi** — không được suy tính lồi từ "log là hàm tăng". Trường hợp riêng: nếu tất cả các hàm chỉ có một đơn thức thì các $F_i$ affine, nên dạng sau đổi biến là **quy hoạch tuyến tính**.
:::

**Quan hệ nghiệm và giá trị.** Mỗi điểm khả thi $x$ tạo điểm khả thi $z=\log x$ và ngược lại (song ánh); logarit tăng chặt nên thứ tự giá trị mục tiêu được giữ nguyên. Nếu nghiệm tối ưu tồn tại, $x^\star=e^{z^\star}$ là nghiệm gốc và $f_0(x^\star)=e^{F_0(z^\star)}$. **Không đồng nhất hai giá trị mục tiêu**; cải dạng cũng không tự bảo đảm tồn tại nghiệm.

### Ví dụ 4.2: hộp sau đổi biến

Đặt $A=\log a$, $B=\log b$, $C=\log c$:

$$\begin{aligned}
\min_{A,B,C\in\mathbb R}\;&\log\left(2e^{A+B}+2e^{A+C}+2e^{B+C}\right)\\
\text{với}\quad&A+B+C=\log8.
\end{aligned}$$

Mục tiêu lồi (tổng ba hàm mũ với số mũ affine, lấy log — thuộc lớp vừa chứng minh); yêu cầu thể tích trở thành một mặt phẳng. Khôi phục kích thước: $(a,b,c)=(e^A,e^B,e^C)$. (Trang chiếu: [Cải dạng bài toán thiết kế hộp](lecture-02-cac-bai-toan-toi-uu-loi.html#/gp-hop-log).)

![Đường đồng mức trong tọa độ logarit A, B sau khi thay C=log 8−A−B; nghiệm tại A=B=log 2.](img/lec-02/gp-box-contour.svg)

::: derivation
**Cải dạng từng bước.** Bắt đầu từ dạng chuẩn $abc/8=1$: thay biến và lấy logarit cho $A+B+C-\log8=0$. Mục tiêu: diện tích sau thay biến là $2e^{A+B}+2e^{A+C}+2e^{B+C}$, mỗi số hạng viết được $e^{A+B+\log2}$; lấy logarit giữ nguyên điểm cực tiểu vì diện tích luôn dương. Không thay yêu cầu thể tích hoặc xấp xỉ vật liệu trong bước cải dạng. Hai chiều khả thi theo phép đổi song ánh; diện tích thật theo dm² bằng hàm mũ của giá trị mục tiêu đã đổi. Bài toán không lồi theo kích thước đã được biểu diễn thành bài toán lồi theo logarit kích thước.
:::

### Ví dụ 4.3: kích thước hộp tối ưu

**Kết quả:** $A^\star=B^\star=C^\star=\log2$ — hộp lập phương cạnh $2\,\mathrm{dm}$; $V=8\,\mathrm{dm}^3$, $S_{\min}=24\,\mathrm{dm}^2$. (Trang chiếu: [Kích thước hộp tối ưu](lecture-02-cac-bai-toan-toi-uu-loi.html#/gp-hop-nghiem).)

::: proof
**Chứng nhận độc lập bằng bất đẳng thức trung bình cộng–trung bình nhân (AM–GM).** Với ba số dương $ab,ac,bc$, AM–GM cho

$$\frac{ab+ac+bc}{3}\ \ge\ \sqrt[3]{(ab)(ac)(bc)},$$

với dấu bằng khi và chỉ khi $ab=ac=bc$. Suy ra

$$ab+ac+bc\ \ge\ 3\sqrt[3]{(abc)^2}=3(abc)^{2/3}=3\cdot8^{2/3}=3\cdot4=12.$$

Dấu bằng khi $ab=ac=bc$; do các kích thước dương, chia cho $abc>0$ cho $1/c=1/b=1/a$, tương đương $a=b=c$. Vậy $S=2(ab+ac+bc)\ge24$, và ứng viên lập phương $(2,2,2)$ đạt cận dưới: $S_{\min}=24$. So với hộp $(1,2,4)$, cùng dung tích nhưng giảm diện tích từ 28 xuống 24 dm². Hình dùng $C=\log8-A-B$ để nhìn bài trên hai biến; các đường đồng mức bao quanh $A=B=\log2$.
:::

**Biến thể $abc\ge8$.** Ràng buộc $abc\ge8$ viết thành $8/(abc)\le1$, vẫn là GP. Cận trên cho diện tích của một ứng viên và bất đẳng thức AM–GM cho thấy nghiệm tối ưu vẫn đạt thể tích 8 và cạnh 2 (nếu $abc>8$, thu nhỏ đều ba kích thước giảm diện tích và vẫn đủ 8). Khái quát: với thể tích cố định $V>0$, cạnh tối ưu $V^{1/3}$ và diện tích nhỏ nhất $6V^{2/3}$ theo cùng hệ đơn vị. Bài tập tự kiểm:

::: exercise
Chứng minh trực tiếp bằng AM–GM rằng với thể tích $V$, diện tích nhỏ nhất là $6V^{2/3}$.
:::

::: solution
$ab+ac+bc\ge3(abc)^{2/3}=3V^{2/3}$, dấu bằng khi $a=b=c=V^{1/3}$. Khi đó $S=2\cdot3V^{2/3}=6V^{2/3}$, đạt được tại lập phương. Vậy $S_{\min}=6V^{2/3}$.
:::

### Ví dụ 4.4: phân bổ công suất cho hai đường truyền

**Nhu cầu.** Hai đường truyền dùng chung một kênh vô tuyến; tăng công suất vừa tăng tín hiệu có ích, vừa gây nhiễu cho đường còn lại. Chọn cách chia công suất để cải thiện đường truyền **yếu nhất**. Không thể đánh giá từng công suất tách khỏi công suất còn lại; do mức gây nhiễu không đối xứng, chia đều ngân sách chưa chắc cho chất lượng cân bằng.

**Dữ liệu, biến, đơn vị, đầu ra.** Biến: hai công suất $p_1,p_2>0$ (đơn vị công suất chuẩn hóa, liên tục). Dữ liệu: ma trận hệ số truyền $G=\begin{pmatrix}1&1/4\\3/2&1\end{pmatrix}$ ($G_{ij}$: hệ số từ bộ phát $j$ tới bộ thu $i$; đường liền là tín hiệu chính, đường đứt là nhiễu chéo), nhiễu nền $\sigma_1=\sigma_2=1$, ngân sách $P=6$. Đầu ra: cách chia công suất và chất lượng thấp nhất đạt được. Dữ liệu và hình tự xây dựng, không phải kết quả đo hoặc tham số thiết bị thực tế. (Trang chiếu: [Phân bổ công suất cho hai đường truyền](lecture-02-cac-bai-toan-toi-uu-loi.html#/gp-cong-suat-cau-chuyen).)

![Hai cặp phát–thu có tín hiệu chính hệ số 1 và nhiễu chéo hệ số 1/4, 3/2; mỗi bộ thu có tạp âm nền bằng 1.](img/lec-02/gp-wireless.svg)

**Mô hình.** Tỷ số tín hiệu trên nhiễu và tạp âm (SINR) — mẫu số gồm tạp âm nền bằng 1 và nhiễu từ đường còn lại:

$$S_1(p)=\frac{p_1}{1+p_2/4},\qquad S_2(p)=\frac{p_2}{1+3p_1/2},$$

$$\begin{aligned}
\max_{p_1,p_2>0}\;&\min\{S_1(p),S_2(p)\}\\
\text{với}\quad&p_1+p_2\le6.
\end{aligned}$$

Chia đều $(3,3)$: $S_1=3/(1+3/4)=12/7$, $S_2=3/(1+9/2)=6/11$ — chất lượng yếu nhất chỉ $6/11$. Tăng riêng công suất thứ hai giúp đường thứ hai nhưng làm giảm chất lượng thứ nhất; cần tối ưu giá trị nhỏ hơn của hai tỷ số. SINR là tỷ số không thứ nguyên, dùng làm đại lượng chất lượng. (Trang chiếu: [Mô hình chất lượng đường truyền](lecture-02-cac-bai-toan-toi-uu-loi.html#/gp-cong-suat-mo-hinh).)

### Cải dạng GP qua ngưỡng $t$

Ngưỡng $t>0$: $t\le S_1(p)\iff t(1+p_2/4)\le p_1$; tương tự cho $S_2$:

$$\begin{aligned}
\min_{p_1,p_2,t>0}\;&t^{-1}\\
\text{với}\quad&tp_1^{-1}+\tfrac14tp_2p_1^{-1}\le1,\\
&tp_2^{-1}+\tfrac32tp_1p_2^{-1}\le1,\\
&(p_1+p_2)/6\le1.
\end{aligned}$$

Mục tiêu là đơn thức; mỗi bất đẳng thức là tổng đơn thức dương. (Trang chiếu: [Cải dạng bài phân bổ công suất](lecture-02-cac-bai-toan-toi-uu-loi.html#/gp-cong-suat-chuan).)

::: proof
**Chứng minh tương đương max–min qua ngưỡng.**

Chiều từ $p$: với mỗi $p$ khả thi, chọn $t=\min\{S_1(p),S_2(p)\}>0$; khi đó cả hai bất đẳng thức ngưỡng thỏa và $(p,t)$ khả thi cho bài GP với mục tiêu $t^{-1}$.

Chiều từ $(p,t)$: một cặp $(p,t)$ khả thi có chất lượng nhỏ nhất của $p$ không dưới $t$ (vì $t\le S_1$ và $t\le S_2$).

Tại tối ưu ngưỡng phải chạm chất lượng nhỏ nhất: nếu $t<\min\{S_1,S_2\}$ thì có thể tăng $t$, giảm $t^{-1}$ — mâu thuẫn. Vậy cực đại theo ngưỡng và bài max–min có cùng chất lượng tối ưu; lấy khối $p$ khôi phục phương án gốc.

**Biến đổi cụ thể:** $t\le p_1/(1+p_2/4)$ tương đương $t(1+p_2/4)\le p_1$, rồi chia cho $p_1>0$ cho $tp_1^{-1}+\tfrac14tp_2p_1^{-1}\le1$; tương tự đường thứ hai. Điều kiện dương bảo đảm mọi phép nhân/chia giữ nguyên quan hệ khả thi. Do $t>0$, tối đa hóa $t$ tương đương tối thiểu hóa $t^{-1}$; **giá trị tối ưu GP là nghịch đảo của chất lượng tối ưu**. Cả ba bất đẳng thức đều đúng lớp GP.

**Trường hợp $p_i=0$:** nếu mô hình cho phép $p_i=0$, công suất 0 ở một đường làm chất lượng nhỏ nhất bằng 0; trong ví dụ này vẫn có phương án dương khả thi đạt chất lượng dương, nên giới hạn biến dương không bỏ nghiệm tối ưu. Lập luận này không tự đúng cho mọi bài toán khác.
:::

### Dạng lồi của bài công suất

Đặt $z_1=\log p_1$, $z_2=\log p_2$, $\tau=\log t$:

$$\begin{aligned}
\min_{z_1,z_2,\tau\in\mathbb R}\;&-\tau\\
\text{với}\quad&\log\left(e^{\tau-z_1}+\tfrac14e^{\tau+z_2-z_1}\right)\le0,\\
&\log\left(e^{\tau-z_2}+\tfrac32e^{\tau+z_1-z_2}\right)\le0,\\
&\log\left(e^{z_1}+e^{z_2}\right)\le\log6.
\end{aligned}$$

Mục tiêu affine; các hàm bất đẳng thức là logarit tổng hàm mũ — lồi. (Trang chiếu: [Dạng lồi của bài phân bổ công suất](lecture-02-cac-bai-toan-toi-uu-loi.html#/gp-cong-suat-log).)

::: derivation
**Đổi log từng bước.** Thay $p_i=e^{z_i}$, $t=e^\tau$, rồi lấy logarit mục tiêu và các vế dương. Với ngân sách: $\log\big((e^{z_1}+e^{z_2})/6\big)\le0$ được viết tương đương bằng cách chuyển $\log6$ sang vế phải. Các hệ số $1/4$ và $3/2$ dương được hấp thụ vào số mũ qua $\log(1/4)$ và $\log(3/2)$, nên các vế trái thuộc đúng lớp đã chứng minh lồi. Bài **không phải LP**: các ràng buộc không affine. Ánh xạ song ánh giữ điểm khả thi và thứ tự mục tiêu GP; khôi phục $p_i^\star=e^{z_i^\star}$, $t^\star=e^{\tau^\star}$. Nếu giá trị nhỏ nhất của bài log là $v^\star=-\tau^\star$, chất lượng gốc là $e^{-v^\star}$, **không phải** $v^\star$.
:::

### Ví dụ 4.5: nghiệm phân bổ công suất

**Kết quả:** $p^\star=(2,4)$, $t^\star=1$; hai đường đạt cùng SINR bằng 1; mục tiêu log bằng 0. So với chia đều $(3,3)$ chỉ đạt $6/11$. (Trang chiếu: [Nghiệm phân bổ công suất](lecture-02-cac-bai-toan-toi-uu-loi.html#/gp-cong-suat-nghiem).)

![Chất lượng hai đường truyền khi p₂=6−p₁. Tại p₁=2, p₂=4, hai tỷ số tín hiệu trên nhiễu và tạp âm đều bằng 1.](img/lec-02/gp-power.svg)

::: proof
**Chứng nhận tối ưu không cần thuật toán.**

Bước 1 — nghiệm log: $(\log2,\log4,0)$; lấy hàm mũ cho $(p_1,p_2,t)=(2,4,1)$. Thay vào mô hình gốc: $S_1=2/(1+4/4)=1$ và $S_2=4/(1+3)=1$.

Bước 2 — cận dưới từ ngưỡng $t=1$: để đạt $t=1$, phải có $p_1\ge1+p_2/4$ và $p_2\ge1+3p_1/2$. Thế hai bất đẳng thức vào nhau:

$$p_1\ge1+\tfrac14\left(1+\tfrac32p_1\right)=\tfrac54+\tfrac38p_1\ \Rightarrow\ \tfrac58p_1\ge\tfrac54\ \Rightarrow\ p_1\ge2,$$

$$p_2\ge1+\tfrac32\cdot2=4.$$

Bước 3 — ngân sách ép nghiệm: $p_1+p_2\le6$ với $p_1\ge2$, $p_2\ge4$ buộc $p=(2,4)$.

Bước 4 — loại $t>1$: nếu $t>1$, ta có $p_1>1+p_2/4$ và $p_2>1+3p_1/2$. Thế tiếp cho $p_1>5/4+3p_1/8$, nên $p_1>2$ và $p_2>4$, mâu thuẫn $p_1+p_2\le6$. Vậy không phương án nào đạt chất lượng lớn hơn 1.

Bước 5 — nghiệm dùng hết ngân sách, chứng minh bằng công thức. Với $\alpha>1$, thay $p$ bằng $\alpha p$:

$$S_i(\alpha p)=\frac{G_{ii}\,\alpha p_i}{\sigma_i+\sum_{j\ne i}G_{ij}\,\alpha p_j}=\frac{G_{ii}\,p_i}{\sigma_i/\alpha+\sum_{j\ne i}G_{ij}p_j}\ >\ \frac{G_{ii}\,p_i}{\sigma_i+\sum_{j\ne i}G_{ij}p_j}=S_i(p),$$

vì $\alpha>1$ làm $\sigma_i/\alpha<\sigma_i$ ở mẫu số. Nếu ngân sách chưa dùng hết, tức $\sum_i p_i<P$, chọn $\alpha=P/\sum_i p_i>1$ và thay $p$ bằng $\alpha p$: mọi SINR tăng chặt và ngân sách vừa đủ. Do đó nghiệm phải dùng hết ngân sách.
:::

**Biến thể $t=\bar t$ cố định.** Cố định ngưỡng $\bar t>0$: $p_1\ge\bar t(1+p_2/4)$ và $p_2\ge\bar t(1+3p_1/2)$ đều **tuyến tính** theo $p$, cùng ngân sách — bài còn lại là hệ bất đẳng thức tuyến tính. Khi ngưỡng là biến, các tích với công suất cần cải dạng GP như trên.

**Khái quát $n$ đường.** Với $G_{ii}>0$, $G_{ij}\ge0$, $\sigma_i>0$, ngân sách $P>0$:

$$\frac{t\left(\sigma_i+\sum_{j\ne i}G_{ij}p_j\right)}{G_{ii}p_i}\le1,\qquad \sum_i\frac{p_i}{P}\le1.$$

Các số hạng hệ số 0 được bỏ đi; còn lại là tổng đơn thức dương — đúng lớp GP.

### Nhận dạng và giới hạn cải dạng (3 biến thể tự kiểm)

::: exercise
Hai câu đầu xét $x,y>0$. (1) $x+y\le xy$: đưa về dạng chuẩn GP. Đảo chiều bất đẳng thức thì sao? (2) $x+y=1$: có là đẳng thức đơn thức không? Có lồi theo $(x,y)$ không? (3) $\min x$ với $0\le x\le1$: đổi $x=e^z$ có giữ nghiệm tối ưu không?
:::

::: solution
(1) Chia cho $xy>0$ được $1/x+1/y\le1$ — tổng hai đơn thức dương so với 1, đúng dạng GP. Đảo chiều cho $1/x+1/y\ge1$, **không** phải chiều bất đẳng thức GP chuẩn; không thể dùng quy tắc chia để tuyên bố bài đã là GP, cần phân tích riêng — và không suy rằng mọi ràng buộc sai dạng đều không lồi. (2) $x+y$ là **tổng hai đơn thức**, không phải một đơn thức, nên không dùng làm đẳng thức GP chuẩn. Tuy vậy $x+y=1$ là đẳng thức affine theo biến gốc và tạo tập khả thi lồi trên miền dương. Sau đổi log, $\log(e^{z_1}+e^{z_2})=0$ không phải đẳng thức affine — ví dụ phân biệt cấu trúc GP với khái niệm tính lồi. (3) Nghiệm gốc là $x^\star=0$. Đổi $x=e^z$ chỉ xét $x>0$, nên bài mới có cận dưới 0 khi $z\to-\infty$ nhưng **không có nghiệm đạt cận** — không được bỏ điều kiện về miền khi khẳng định tương đương.
:::

### Chuyển tiếp

GP được cải dạng **tương đương** khi thỏa các điều kiện cấu trúc. Khi không có cải dạng như vậy, ta có thể thay hàm mục tiêu hoặc mở rộng tập khả thi. Phần 5 xét hai ví dụ giúp xác định những bảo đảm còn giữ được và cách đánh giá nghiệm theo bài toán gốc.

## Phần 5: Xấp xỉ lồi và nới lỏng bài toán không lồi

### Dẫn nhập

Quy hoạch hình học ở phần trước được cải dạng tương đương khi thỏa các điều kiện cấu trúc. Khi không có cải dạng như vậy, ta có thể **thay hàm mục tiêu** hoặc **mở rộng tập khả thi**. Hai ví dụ tiếp theo — phân loại bằng ngưỡng và chọn gói dữ liệu — giúp xác định những bảo đảm còn giữ được và cách đánh giá nghiệm theo bài toán gốc.

### Ví dụ 5.1: phân loại bằng ngưỡng

**Nhu cầu.** Chọn ngưỡng cho bộ phân loại ảnh chỉ dùng một đặc trưng chuẩn hóa $u$; nhãn $y=+1$ là nhóm cần tìm, $y=-1$ là nhóm còn lại. Dữ liệu minh họa tự xây dựng, nhãn xen kẽ trên trục $u$:

| $u_i$ | $-2$ | $-1$ | $1$ | $2$ |
|---|---|---|---|---|
| $y_i$ | $-1$ | $+1$ | $-1$ | $+1$ |

Hệ số của $u$ cố định bằng 1 để ví dụ số dễ tính; $\theta\in\mathbb R$ là biến quyết định. Dự đoán theo dấu điểm số $s_\theta(u)=u-\theta$: dương chọn nhóm cần tìm, âm chọn nhóm còn lại; **điểm số bằng 0 được tính là lỗi** (không quyết định). Mục tiêu: chọn $\theta$ giảm số lỗi trên dữ liệu đã gán nhãn; không hứa tổng quát hóa sang dữ liệu mới. (Trang chiếu: [Phân loại bằng ngưỡng](lecture-02-cac-bai-toan-toi-uu-loi.html#/ap-phan-loai).)

**Mô hình.** Trong ví dụ này, $E(\theta)$ là số lỗi phân loại, khác với tổng bình phương sai số $E(w)$ ở phần hồi quy. Biên có dấu và hàm mất mát đếm lỗi:

$$r_i(\theta)=y_i(u_i-\theta),\qquad
\ell_{01}(r)=\begin{cases}1,&r\le0,\\0,&r>0,\end{cases}$$

$$\min_{\theta\in\mathbb R}\ \underbrace{\sum_{i=1}^{4}\ell_{01}\big(r_i(\theta)\big)}_{E(\theta)}.$$

(Trang chiếu: [Mô hình giảm số lỗi phân loại](lecture-02-cac-bai-toan-toi-uu-loi.html#/ap-dem-loi).)

![Bốn điểm trên trục đặc trưng u tại −2, −1, 1, 2, có nhãn lần lượt −1, +1, −1, +1.](img/lec-02/ap-data.svg)

::: derivation
**Bảng số lỗi theo từng khoảng và mốc.** Biên có dấu $r_i(\theta)=y_i(u_i-\theta)$: dương nghĩa là đúng; không dương (kể cả bằng 0 theo quy ước) là lỗi. Xét từng điểm:

- $u=-2,y=-1$: $r_1=(-1)(-2-\theta)=2+\theta$; lỗi khi $2+\theta\le0\iff\theta\le-2$.
- $u=-1,y=+1$: $r_2=-1-\theta$; lỗi khi $\theta\ge-1$.
- $u=1,y=-1$: $r_3=\theta-1$; lỗi khi $\theta\le1$.
- $u=2,y=+1$: $r_4=2-\theta$; lỗi khi $\theta\ge2$.

Ghép theo khoảng $\theta$ (quy ước: tại đúng mốc, điểm có $r=0$ được tính là lỗi):

| Khoảng $\theta$ | Điểm lỗi | Số lỗi $E(\theta)$ |
|---|---|---|
| $\theta<-2$ | 1, 3 | 2 |
| $\theta=-2$ | 1, 3 | 2 |
| $-2<\theta<-1$ | 3 | 1 |
| $\theta=-1$ | 2, 3 | 2 |
| $-1<\theta<1$ | 2, 3 | 2 |
| $\theta=1$ | 2, 3 | 2 |
| $1<\theta<2$ | 2 | 1 |
| $\theta=2$ | 2, 4 | 2 |
| $\theta>2$ | 2, 4 | 2 |

Kiểm tra hai giá trị cụ thể: $\theta=-1{,}5$ nằm trong $(-2,-1)$, chỉ điểm 3 lỗi, $E=1$; $\theta=0$ nằm trong $(-1,1)$, điểm 2 và 3 lỗi, $E=2$. Giá trị tối ưu $E=1$, đạt trên các khoảng mở $(-2,-1)$ hoặc $(1,2)$.
:::

::: proof
**Chứng minh $E$ không lồi.** $E$ là hàm bậc thang. Phản ví dụ trung điểm: $E(-1{,}5)=E(1{,}5)=1$ nhưng $E(0)=2>1$; nếu $E$ lồi thì $E(0)\le\frac12E(-1{,}5)+\frac12E(1{,}5)=1$ — mâu thuẫn. Nhãn xen kẽ khiến một ngưỡng không phân loại đúng cả bốn điểm, nên bài toán tối thiểu hóa $E$ không lồi. Ví dụ nhỏ có thể giải bằng cách xét các khoảng ngưỡng; trong mô hình nhiều đặc trưng, cách liệt kê này khó mở rộng — ta xét một hàm lồi thay cho mất mát đếm lỗi.
:::

### Hàm mất mát bản lề

$$\ell_h(r)=\max(0,1-r),\qquad \ell_{01}(r)\le\ell_h(r)\quad\forall r\in\mathbb R.$$

$H(\theta)=\sum_i\ell_h(y_i(u_i-\theta))$ lồi theo $\theta$. (Trang chiếu: [Hàm mất mát bản lề](lecture-02-cac-bai-toan-toi-uu-loi.html#/ap-ban-le).)

![Mất mát đếm lỗi và mất mát bản lề theo biên có dấu r. Hàm bản lề luôn nằm trên hoặc bằng mất mát đếm lỗi.](img/lec-02/ap-hinge.svg)

::: proof
**Chứng minh chặn trên và tính lồi.**

Bước 1 — $\ell_{01}\le\ell_h$ mọi $r$, hai trường hợp: khi $r\le0$, $\ell_{01}=1\le1-r\le\max(0,1-r)=\ell_h$; khi $r>0$, $\ell_{01}=0\le\ell_h$. Tại $r=0$, hai mất mát cùng bằng 1 theo quy ước tính điểm trên ngưỡng là lỗi.

Bước 2 — chứng minh $\ell_h$ lồi. Lấy $r,s\in\mathbb R$, $\eta\in[0,1]$ và đặt $M=\eta\ell_h(r)+(1-\eta)\ell_h(s)$. Vì $\ell_h(r)\ge0$ và $\ell_h(r)\ge1-r$, ta có

$$M\ge0,\qquad M\ge\eta(1-r)+(1-\eta)(1-s)=1-[\eta r+(1-\eta)s].$$

Do đó

$$\ell_h(\eta r+(1-\eta)s)=\max(0,1-[\eta r+(1-\eta)s])\le M=\eta\ell_h(r)+(1-\eta)\ell_h(s).$$

Đây chính là bất đẳng thức lồi.

Bước 3 — $H$ lồi: mỗi $\ell_h(y_i(u_i-\theta))$ là hợp của hàm lồi với hàm affine theo $\theta$, nên lồi; tổng các hàm lồi là lồi. Bài $\min_\theta H(\theta)$ là bài toán lồi một biến.

**Lưu ý quan trọng:** $H$ chỉ là **hàm thay thế**; giá trị $H(\theta)$ không phải số lỗi $E(\theta)$, và mối liên hệ giữa nghiệm của hai bài toán sẽ được kiểm tra bằng số liệu ở phần so sánh nghiệm.
:::

### Cải dạng hàm bản lề thành LP

Biến phụ $\xi_i$ biểu diễn từng số hạng bản lề:

$$\begin{aligned}
\min_{\theta,\,\xi}\;&\sum_{i=1}^{4}\xi_i\\
\text{với}\quad&\xi_i\ge1-y_i(u_i-\theta),\quad i=1,\ldots,4,\\
&\xi_i\ge0,\quad i=1,\ldots,4.
\end{aligned}$$

(Trang chiếu: [Cải dạng hàm bản lề thành LP](lecture-02-cac-bai-toan-toi-uu-loi.html#/ap-ban-le-lp).)

::: proof
**Chứng nhận tương đương hai chiều với $H$ — chính xác cho $H$, không cho $E$.**

Chiều thuận: với mọi $\theta$, lấy $\xi_i=\max(0,1-y_i(u_i-\theta))=\ell_h(y_i(u_i-\theta))$; mọi ràng buộc thỏa và mục tiêu bằng $H(\theta)$. Suy ra giá trị tối ưu LP $\le\min_\theta H$.

Chiều ngược: với mọi điểm khả thi $(\theta,\xi)$, mỗi $\xi_i\ge\ell_h(y_i(u_i-\theta))$, nên mục tiêu $\sum\xi_i\ge H(\theta)$. Suy ra $\min_\theta H\le$ giá trị tối ưu LP.

Vậy hai giá trị bằng nhau. Mục tiêu và ràng buộc đều affine theo $(\theta,\xi)$, nên đây là LP. Cải dạng này chính xác cho hàm bản lề $H$, **không phải** cho số lỗi $E$: bước thêm biến phụ không hoàn tác việc thay mục tiêu $E$ bằng $H$. Khi trình bày kết quả, lấy $\theta$ về mô hình phân loại; giá trị tối ưu của LP là $H$, không phải số lỗi $E$.
:::

### Ví dụ 5.2: nghiệm của hàm thay thế

Ta giải bài có mất mát bản lề, rồi tính lại số lỗi tại nghiệm để đánh giá kết quả theo yêu cầu phân loại ban đầu.

(Trang chiếu: [Nghiệm của hàm thay thế](lecture-02-cac-bai-toan-toi-uu-loi.html#/ap-nghiem-phan-loai).)

![Số lỗi E và tổng mất mát bản lề H theo ngưỡng. Ngưỡng tối ưu cho H không đạt số lỗi nhỏ nhất của E.](img/lec-02/ap-threshold.svg)

| $\theta$ | $H(\theta)$ | $E(\theta)$ |
|---|---|---|
| $-1{,}5$ | $4{,}5$ | $1$ |
| $0$ | $4$ | $2$ |

$$\min_{\theta\in\mathbb R}H(\theta)=4;\qquad \text{mọi }\theta\in[-1,1]\text{ tối ưu cho }H.$$

::: proof
**Chứng minh $\min H=4$ với bốn số hạng tường minh.** Với dữ liệu bốn điểm:

$$H(\theta)=\max(0,-1-\theta)+\max(0,2+\theta)+\max(0,2-\theta)+\max(0,\theta-1).$$

Bước 1 — hai số hạng giữa: $\max(0,2+\theta)+\max(0,2-\theta)$. Với $|\theta|\le2$ tổng là $(2+\theta)+(2-\theta)=4$; với $\theta<-2$ tổng là $0+(2-\theta)>4$; với $\theta>2$ tổng là $(2+\theta)+0>4$. Vậy tổng hai số hạng giữa $\ge4$ với mọi $\theta$, dấu bằng khi $|\theta|\le2$.

Bước 2 — hai số hạng ngoài: $\max(0,-1-\theta)$ dương khi $\theta<-1$; $\max(0,\theta-1)$ dương khi $\theta>1$. Trên $[-1,1]$ cả hai bằng 0, nên $H=4$.

Bước 3 — ngoài $[-1,1]$: ít nhất một số hạng ngoài dương, nên $H>4$. Kết hợp: $\min H=4$ và **mọi** $\theta\in[-1,1]$ đều tối ưu cho $H$.
:::

::: derivation
**So sánh với bài gốc.** Tính trực tiếp từng số hạng:

$$H(-1{,}5)=\max(0,0{,}5)+\max(0,0{,}5)+\max(0,3{,}5)+\max(0,-2{,}5)=0{,}5+0{,}5+3{,}5+0=4{,}5,$$

$$H(0)=\max(0,-1)+\max(0,2)+\max(0,2)+\max(0,-1)=0+2+2+0=4.$$

Số lỗi tương ứng: $E(-1{,}5)=1$ (chỉ điểm 3 lỗi), $E(0)=2$ (điểm 2 và 3 lỗi). Trong các nghiệm của $H$, $\theta=0$ có $E=2$, nhưng $E$ tối ưu bằng 1, đạt chẳng hạn tại $\theta=-1{,}5$ — tức **một nghiệm của hàm thay thế không tối ưu cho bài toán gốc**.

**Nguyên tắc chung:** $E(\theta)\le H(\theta)$ tại mọi $\theta$ **không** suy ra $\arg\min E=\arg\min H$; quan hệ đúng là $\min E\le\min H$, nên tối ưu $H$ không tự cung cấp cận dưới cho giá trị nhỏ nhất của $E$. Có thể đánh giá $E$ tại nghiệm đã học để biết số lỗi thật. Không tuyên bố mọi nghiệm của hàm bản lề cho cùng một bộ phân loại, vì cách xử lý trường hợp điểm số bằng 0 có thể khác nhau giữa các nghiệm trong $[-1,1]$.
:::

### Phân loại nhiều đặc trưng (QP)

Khi dùng nhiều đặc trưng, điểm số tuyến tính thay cho ngưỡng một chiều. Hình phạt bậc hai kiểm soát độ lớn các hệ số, còn biến phụ giữ cách biểu diễn mất mát bản lề đã xây dựng.

$u_i\in\mathbb R^d$, $y_i\in\{\pm1\}$; chọn trước $\lambda\ge0$; biến $w\in\mathbb R^d$, $b\in\mathbb R$, $\xi\in\mathbb R^m$. Với $i=1,\ldots,m$, đặt

$$H(w,b)=\sum_{i=1}^m\max(0,1-y_i(w^Tu_i+b)).$$

Mô hình có phạt là

$$\min_{w,b}\ H(w,b)+\frac{\lambda}{2}\|w\|_2^2
\quad\Longleftrightarrow\quad
\begin{aligned}
\min_{w,b,\,\xi}\;&\frac{\lambda}{2}\|w\|_2^2+\sum_{i=1}^{m}\xi_i\\
\text{với}\quad&y_i(w^Tu_i+b)\ge1-\xi_i,\quad i=1,\ldots,m,\\
&\xi_i\ge0,\quad i=1,\ldots,m.
\end{aligned}$$

(Trang chiếu: [Phân loại nhiều đặc trưng](lecture-02-cac-bai-toan-toi-uu-loi.html#/ap-phan-loai-tong-quat).)

::: proof
**Chứng nhận QP và các bước chuyển biến phụ.** Bài gốc theo $(w,b)$ có mục tiêu $H(w,b)+\tfrac{\lambda}{2}\|w\|_2^2$: $H$ là tổng các hàm bản lề lồi, phạt bậc hai lồi, nên mục tiêu lồi; nhưng $H$ không trơn nên chưa ở dạng QP. Ba bước chuyển: (1) thêm biến $\xi_i\ge0$ thay từng số hạng bản lề, ràng buộc $\xi_i\ge1-y_i(w^Tu_i+b)$; (2) mục tiêu đổi thành $\tfrac{\lambda}{2}\|w\|_2^2+\sum_i\xi_i$; (3) kiểm tra tương đương hai chiều như mô hình ngưỡng: với mọi $(w,b)$ chọn $\xi_i=\ell_h(y_i(w^Tu_i+b))$ cho cùng mục tiêu; ngược lại mọi bộ khả thi có $\sum\xi_i\ge H(w,b)$ — hai giá trị tối ưu bằng nhau và lấy $(w,b)$ khôi phục nghiệm. Mục tiêu mới gồm phạt $\lambda\|w\|_2^2/2$ cộng tổng biến phụ; ràng buộc affine. Hessian theo thứ tự $(w,b,\xi)$ là khối $\operatorname{diag}(\lambda I,0,0)$ nửa xác định dương, nên đây là QP; khi $\lambda=0$ mục tiêu tuyến tính, thành LP. Đây là cải dạng **chính xác của hàm bản lề cộng phạt**, không phải của số lỗi 0–1. Không khẳng định nghiệm duy nhất khi $b$ không bị phạt. Với ví dụ một đặc trưng, $w=1$ và $b=-\theta$ khôi phục đúng mô hình ngưỡng. Lưu ý hệ số $\lambda/2$ là quy ước thang đo để đạo hàm gọn; $b$ không bị phạt. Khi $H=0$ thì $E=0$ chỉ trên tập huấn luyện; không bảo đảm gì trên dữ liệu mới.
:::

### Ví dụ 5.3: chọn các gói dữ liệu

Ở ví dụ phân loại, ta thay hàm mục tiêu. Ví dụ này giữ nguyên chi phí cần tối thiểu hóa và nới lỏng điều kiện mua nguyên gói.

**Nhu cầu.** Nhóm phát triển mô hình nhận diện người đi bộ cần mua ảnh đã gán nhãn, đủ ba bối cảnh. Mỗi gói là một bộ ảnh đã gán nhãn; giá 2 triệu đồng mỗi gói chỉ là giả định minh họa, không phải dữ liệu thực. Chưa xét số lượng ảnh trong gói, chất lượng ảnh hay mức tổng quát hóa; **không có đại lượng "số lượng ảnh" nào được dùng trong mô hình**. Quy ước bối cảnh: ngày khô và đêm khô đều là những lúc không mưa; nhóm mưa gồm mọi ảnh chụp khi mưa, bất kể ngày hay đêm. Hai gói cùng phủ một bối cảnh không có nghĩa là ảnh trùng nhau.

| Gói | Ảnh có sẵn | Giá (triệu đồng) |
|---|---|---|
| 1 | Ngày khô, đêm khô | 2 |
| 2 | Đêm khô, trời mưa | 2 |
| 3 | Ngày khô, trời mưa | 2 |

Mua trọn gói, mỗi gói tối đa một lần; chọn các gói đủ ba bối cảnh với tổng chi phí thấp nhất. Mua cả ba gói đủ ba bối cảnh nhưng tốn 6 triệu; mục tiêu là tiết kiệm. Khó khăn nằm ở điều kiện mua nguyên gói. (Trang chiếu: [Chọn các gói dữ liệu](lecture-02-cac-bai-toan-toi-uu-loi.html#/ap-goi-du-lieu).)

**Mô hình nhị phân.** $x_j=1$ nếu mua trọn gói $j$, $x_j=0$ nếu không mua, $j=1,2,3$:

$$\begin{aligned}
\min_{x}\;&2(x_1+x_2+x_3)\quad\text{(triệu đồng)}\\
\text{với}\quad&x_1+x_3\ge1\quad(\text{ngày khô}),\\
&x_1+x_2\ge1\quad(\text{đêm khô}),\\
&x_2+x_3\ge1\quad(\text{trời mưa}),\\
&x_j\in\{0,1\},\quad j=1,2,3.
\end{aligned}$$

Ảnh ngày khô có trong gói 1 hoặc gói 3, nên $x_1+x_3\ge1$; hai dòng còn lại tương tự. Số 1 ở vế phải nghĩa là cần ít nhất một gói chứa bối cảnh đó, không phải một ảnh. (Trang chiếu: [Mô hình chọn gói dữ liệu](lecture-02-cac-bai-toan-toi-uu-loi.html#/ap-mo-hinh-nhi-phan).)

::: proof
**Liệt kê tập khả thi và chứng minh không lồi.** Mục tiêu và ràng buộc đều affine, nhưng **không được gọi đây là LP**, vì biến bị giới hạn nhị phân. Kiểm tra từng bộ nhị phân:

- $(0,0,0)$: mọi ràng buộc vi phạm — loại.
- $(1,0,0)$: mưa $x_2+x_3=0<1$ — loại.
- $(0,1,0)$: ngày khô $x_1+x_3=0<1$ — loại.
- $(0,0,1)$: đêm khô $x_1+x_2=0<1$ — loại.
- $(1,1,0)$: $1\ge1$, $2\ge1$, $1\ge1$ — khả thi, chi phí 4.
- $(1,0,1)$: $2\ge1$, $1\ge1$, $1\ge1$ — khả thi, chi phí 4.
- $(0,1,1)$: $1\ge1$, $1\ge1$, $2\ge1$ — khả thi, chi phí 4.
- $(1,1,1)$: khả thi, chi phí 6.

Tập khả thi $F=\{(1,1,0),(1,0,1),(0,1,1),(1,1,1)\}$ — rời rạc, không lồi: trung điểm của $(1,1,0)$ và $(1,0,1)$ là $(1;\tfrac12;\tfrac12)$, không nhị phân, không thuộc $F$. Chi phí affine vẫn chưa đủ để dùng LP, vì vấn đề nằm ở **miền khả thi**.
:::

### Nới lỏng điều kiện nhị phân

Thay $x_j\in\{0,1\}$ bằng $0\le x_j\le1$, giữ nguyên mục tiêu và ba ràng buộc phủ — thu được LP:

$$\begin{aligned}
\min_{x}\;&2(x_1+x_2+x_3)\\
\text{với}\quad&x_1+x_3\ge1,\qquad x_1+x_2\ge1,\qquad x_2+x_3\ge1,\\
&0\le x_j\le1,\quad j=1,2,3.
\end{aligned}$$

(Trang chiếu: [Nới lỏng điều kiện nhị phân](lecture-02-cac-bai-toan-toi-uu-loi.html#/ap-noi-long-lp).)

::: proof
**Quan hệ tập khả thi và cận.** Phép nới lỏng chỉ thay điều kiện biến bằng khoảng $[0,1]$, không đổi mục tiêu và không đổi ba ràng buộc phủ. Mọi phương án nhị phân khả thi đều khả thi cho bài nới lỏng, nên với $F$ là tập khả thi gốc và $R$ là tập mới: $F\subseteq R\subseteq\mathbb R^3$ và $R$ lồi. Vì mọi ràng buộc affine và biến liên tục, bài nới lỏng là LP đúng nghĩa. Hệ quả: giá trị tối ưu trên tập lớn hơn không thể lớn hơn giá trị trên tập nhỏ hơn, tức $\min_R f\le\min_F f$. Lưu ý: $x_j=0{,}5$ không phải tỷ lệ ảnh hay xác suất mua; đó chỉ là giá trị của biến trong bài nới lỏng.
:::

### Ví dụ 5.4: nghiệm phân số của bài nới lỏng

Giải LP cho một cận dưới của chi phí mua nguyên gói; sau đó cần kiểm tra nghiệm có dùng trực tiếp được hay không.

$$x^R=\left(\tfrac12,\tfrac12,\tfrac12\right),\qquad 2\left(\tfrac12+\tfrac12+\tfrac12\right)=3\ \text{triệu đồng}.$$

(Trang chiếu: [Nghiệm phân số của bài nới lỏng](lecture-02-cac-bai-toan-toi-uu-loi.html#/ap-nghiem-phan-so).)

::: proof
**Chứng minh $L=3$ hai chiều.** Giả thiết: ba ràng buộc phủ và biên $[0,1]$.

Bước 1 — cận dưới: cộng cả ba bất đẳng thức phủ vế theo vế:

$$(x_1+x_3)+(x_1+x_2)+(x_2+x_3)\ge3\ \Rightarrow\ 2(x_1+x_2+x_3)\ge3\ \Rightarrow\ 2\sum_jx_j\ge3.$$

Vậy chi phí $2\sum_jx_j\ge3$ với mọi điểm khả thi của bài nới lỏng.

Bước 2 — đạt cận: điểm $x^R=(1/2,1/2,1/2)$ khả thi — kiểm tra: ngày khô $x_1+x_3=1$; đêm khô $x_1+x_2=1$; trời mưa $x_2+x_3=1$; biên $0\le1/2\le1$ — và đạt chi phí 3.

Bước 3 — kết luận: $x^R$ là nghiệm tối ưu LP với giá trị $L=3$. Chứng minh này độc lập với việc giải số, nên cận dưới được chứng nhận chắc chắn. Nhưng nghiệm là **phân số**: ba tọa độ bằng một nửa chỉ thuộc bài nới lỏng; không được diễn giải là mua nửa gói trong bài gốc — nhà cung cấp không bán lẻ, nên nghiệm này không thể dùng trực tiếp.
:::

### Ví dụ 5.5: khôi phục phương án mua

Từ $x^R=(1/2,1/2,1/2)$: làm tròn lên cho $(1,1,1)$, mua cả ba gói, chi phí 6 triệu đồng. (Trang chiếu: [Khôi phục phương án mua](lecture-02-cac-bai-toan-toi-uu-loi.html#/ap-khoi-phuc).)

| Phương án | Đủ ba bối cảnh | Chi phí (triệu đồng) |
|---|---|---|
| $(0,0,0)$ — làm tròn xuống | Không | 0 |
| $(1,1,1)$ — làm tròn lên | Có | 6 |
| $(1,1,0)$ — bỏ gói 3 | Có | 4 |

::: derivation
**Kiểm tra từng phương án.** Làm tròn xuống cho $(0,0,0)$: không mua gói nào, cả ba bối cảnh đều thiếu — bất khả thi. Làm tròn lên cho $(1,1,1)$: khả thi nhưng chi phí 6 triệu, cao hơn mức cần thiết. Ở bài phủ này, mua thêm gói không làm mất phủ, nên phương án làm tròn lên vẫn hợp lệ; nhưng **không được khẳng định làm tròn lên luôn tốt**. Vì $x^R$ không cho biết duy nhất nên bỏ gói nào, ta kiểm tra lại ba ràng buộc phủ cho từng phương án: bỏ gói 3 còn $(1,1,0)$ — gói 1 có ngày khô và đêm khô, gói 2 bổ sung trời mưa — vẫn đủ ba bối cảnh với chi phí 4. Do đó, làm tròn đơn không bảo đảm luôn khả thi và không bảo đảm luôn tối ưu; cần kiểm tra lại ba yêu cầu trước khi chấp nhận phương án.
:::

### Ví dụ 5.6: cận dưới và chứng nhận $p^\star=4$

Ghép cận dưới từ LP với một phương án mua khả thi để chứng nhận chi phí nhỏ nhất của bài gốc.

$p^\star$: chi phí nhỏ nhất khi mua nguyên gói, tính bằng triệu đồng (khác với vectơ công suất ở ví dụ trước). (Trang chiếu: [Cận dưới và chứng nhận nghiệm](lecture-02-cac-bai-toan-toi-uu-loi.html#/ap-chung-nhan-can).)

$$3\le p^\star\le4;\qquad p^\star=4.$$

::: proof
**Khép khoảng bằng cấu trúc chi phí.**

Bước 1 — khung chung. Định nghĩa: $F$ là tập khả thi của bài gốc, $R$ là tập khả thi của bài nới lỏng, $F\subseteq R$; $\hat x\in F$ là một phương án mua khả thi. Khung tổng quát:

$$L=\inf_{x\in R}f(x)\ \le\ p^\star=\inf_{x\in F}f(x)\ \le\ U=f(\hat x),\qquad f(x)=2\sum_jx_j;$$

nếu $L$ hữu hạn thì $U-p^\star\le U-L$. Với ví dụ này: $L=3$ (đã chứng minh), $U=4$ (phương án $(1,1,0)$), nên $3\le p^\star\le4$.

Bước 2 — lập luận bội của 2 (bắt buộc): mỗi gói giá 2 triệu đồng nên mọi chi phí khả thi là **bội của 2**; trong khoảng $[3,4]$ chỉ có 4 là bội của 2, nên $p^\star=4$. Chỉ riêng $3\le p^\star$ chưa đủ để kết luận $p^\star=4$, vì khoảng $[3,4]$ còn chứa các giá trị không phải bội của 2; không được cho rằng không đạt được 3 thì tự động là 4 mà bỏ qua lập luận bội của 2.

Bước 3 — phân vai cận: $L=3$ là **cận dưới** vì đó là giá trị tối ưu LP; chi phí 6 của phương án làm tròn lên **không phải cận dưới**, chỉ là một cận trên. Nếu nghiệm tối ưu LP tình cờ nhị phân thì nó tối ưu luôn cho bài gốc; nếu LP bất khả thi thì bài gốc bất khả thi. Với bài nhị phân tổng quát, chiều ngược lại không được bảo đảm: ràng buộc $x=1/2$ khả thi khi $0\le x\le1$ nhưng không có nghiệm $x\in\{0,1\}$. Riêng bài phủ này luôn có phương án mua cả ba gói. Với bài **cực đại hóa**, giá trị tối ưu bài nới lỏng cho cận **trên**; chiều cận phải gắn với chiều tối ưu. Trong ví dụ này ta mở rộng tập khả thi, giữ nguyên chi phí; quan hệ này khác với thay hàm mục tiêu ở bài phân loại.
:::

### Phân biệt ba cách xử lý

(Trang chiếu: [Phân biệt ba cách xử lý](lecture-02-cac-bai-toan-toi-uu-loi.html#/ap-so-sanh).)

| Cách xử lý | Bảo toàn | Ý nghĩa nghiệm |
|---|---|---|
| Cải dạng chính xác ($H$ → LP) | Giá trị $H$ | Khôi phục ngưỡng tối ưu cho $H$ |
| Hàm thay thế ($E\to H$) | Không giữ mục tiêu | Đánh giá $E$ riêng tại nghiệm đã học |
| Nới lỏng ($F\to R$) | Giữ mục tiêu; mở rộng miền | Cần khôi phục phương án |

Ba kỹ thuật dễ bị lẫn, đặt cạnh nhau. Thứ nhất, **cải dạng chính xác**: bài LP với biến phụ $\xi_i$ có giá trị nhỏ nhất theo $\xi$ đúng bằng $H(\theta)$ tại mỗi $\theta$; nghiệm của nó là nghiệm đúng của bài tối ưu hóa $H$, theo ánh xạ lấy lại $\theta$. Thứ hai, **hàm thay thế**: thay mục tiêu số lỗi $E$ bằng $H$ là đổi mục tiêu, không phải đổi biến; ta chỉ được đánh giá $E$ tại nghiệm đã học; việc $E\le H$ tại mỗi điểm không suy ra điểm nhỏ nhất $H$ cũng nhỏ nhất $E$. Thứ ba, **nới lỏng**: mở tập khả thi từ $F$ sang $R$; giá trị tối ưu LP cho cận dưới, còn nghiệm phân số phải được khôi phục và kiểm tra, nếu không phương án có thể bất khả thi.

### Đánh giá nghiệm theo bài toán gốc (3 câu tự kiểm)

::: exercise
(1) Với một tập dữ liệu khác, hàm bản lề có $H=0$: có suy ra $E=0$ trên tập huấn luyện? Trên dữ liệu mới thì sao? (2) Phương án khả thi LP với chi phí 6: có phải cận dưới của bài gốc không? (3) Nếu nghiệm tối ưu LP đã nhị phân thì kết luận gì?
:::

::: solution
(1) Nếu $H=0$ tại nghiệm thì vì $E\le H$, số lỗi trên tập huấn luyện bằng 0. Nhưng điều này chỉ đúng trên tập huấn luyện; không có bảo đảm gì cho dữ liệu mới — đó là vấn đề tổng quát hóa, không phải của phép xấp xỉ. (2) Không. Trong ví dụ này, điểm $(1,1,1)$ có chi phí 6 và cũng khả thi cho bài gốc, nên 6 là một **cận trên**. Một điểm chỉ khả thi cho LP chưa đủ để cho cận trên của bài gốc, và giá trị của nó cũng không tự cho cận dưới; giá trị tối ưu LP bằng 3 mới là cận dưới đã chứng nhận. (3) Nếu nghiệm tối ưu LP đã nhị phân thì nó khả thi cho bài gốc và giá trị của nó bằng cận dưới, nên nó tối ưu cho bài gốc; trong ví dụ của ta nghiệm LP là phân số nên cần bước khôi phục. Tổng kết: xấp xỉ và nới lỏng cho ta bài toán giải được cùng các chứng nhận kèm theo, nhưng mỗi chứng nhận phải được đọc đúng vai.
:::

### Chuyển tiếp

Ba cách xử lý đều cho thông tin, nhưng loại thông tin khác nhau. Phần cuối tổng hợp lại toàn bộ các kỹ thuật cải dạng đã học và tự kiểm một bài toán mới với đầy đủ chu trình.

## Phần 6: Tổng hợp và vận dụng

### Dẫn nhập

Phần cuối vận dụng các dạng đã học vào bài chọn đặc trưng. Kết quả của phần 5 giúp phân biệt bước cải dạng tương đương với việc thay mục tiêu hoặc nới lỏng miền trong mô hình mới. Ba năng lực cần tổng hợp: (1) nhận dạng LP/QP/GP từ cấu trúc; (2) cải dạng hoặc xấp xỉ kèm giả thiết và quan hệ với bài gốc; (3) chứng nhận mục tiêu và miền lồi, rồi kiểm tra nghiệm trong ngữ cảnh. Phần này đi theo ba nhóm: ôn bảng dạng chuẩn, một biến thể mới về giới hạn số đặc trưng, rồi bài tập kiểm tra.

### Bảng các dạng bài toán đã học

Biến $x\in\mathbb R^n$. Ký hiệu chung: $f_i(x)=\tfrac12x^TP_ix+q_i^Tx+r_i$ với $P_i=P_i^T$, dùng cho mục tiêu ($i=0$) và các ràng buộc bất đẳng thức ($i=1,\dots,m$).

| Dạng | Mục tiêu và ràng buộc | Chứng nhận |
|---|---|---|
| LP | $\min c^Tx$ với $Gx\le h$, $Ax=b$ | hàm affine, tập khả thi là đa diện lồi |
| QP | $\min f_0(x)$ với $Gx\le h$, $Ax=b$ | $P_0\succeq0$ |
| QCQP | $\min f_0(x)$ với $f_i(x)\le0$ ($i=1,\dots,m$), $Ax=b$ | $P_i\succeq0$ với mọi $i=0,\dots,m$ |

(Trang chiếu: [Các dạng bài toán đã học](lecture-02-cac-bai-toan-toi-uu-loi.html#/tong-hop-dang-bai).)

::: proof
**Chứng nhận từng dạng.** Các điều kiện trong bảng **đủ** để chứng nhận tính lồi của các dạng đang xét: kiểm tra $P_i\succeq0$ (nửa xác định dương, tức $v^TP_iv\ge0$ với mọi $v$) là cách chứng nhận tính lồi của từng thành phần bậc hai; LP là trường hợp đặc biệt với hàm affine, tức $P_i=0$. Kích thước: $c,q_i\in\mathbb R^n$, $r_i\in\mathbb R$, $P_i\in\mathbb R^{n\times n}$; $G\in\mathbb R^{r\times n}$, $h\in\mathbb R^r$; $A\in\mathbb R^{p\times n}$, $b\in\mathbb R^p$; trong QCQP, $i=1,\ldots,m$ đánh số các bất đẳng thức. Nối lại các ví dụ: bài pha trộn và hồi quy sai số tuyệt đối là LP; hồi quy bình phương tối thiểu và chính quy hóa chuẩn hai là QP; giới hạn cứng độ lớn hệ số dẫn tới QCQP. Các mô hình trong bảng lồi theo biến đang dùng; với GP, cần thêm bước đổi biến để có chứng nhận tương tự.
:::

### Ôn quy hoạch hình học và đổi biến

GP dạng tổng đơn thức:

$$\begin{aligned}
\min_{x}\ & f_0(x)\\
\text{với } & f_i(x)\le 1,\qquad g_j(x)=1,\qquad x>0,
\end{aligned}$$

với $f_i$: tổng đơn thức dương; $g_j$: đơn thức. Sau đổi biến $z=\log x$:

$$\begin{aligned}
\min_{z}\ & \log f_0(\exp z)\\
\text{với } & \log f_i(\exp z)\le 0,\qquad \log g_j(\exp z)=0,\qquad z\in\mathbb R^n.
\end{aligned}$$

Sau đổi biến: mục tiêu và các bất đẳng thức lồi, các đẳng thức affine. (Trang chiếu: [Quy hoạch hình học và đổi biến](lecture-02-cac-bai-toan-toi-uu-loi.html#/tong-hop-gp).)

::: derivation
**Điều kiện áp dụng và quan hệ nghiệm.** Miền trước đổi biến là $x>0$; sau đổi biến $z=\log x$, tức $x=\exp z$, miền là toàn bộ $z\in\mathbb R^n$. Đơn thức $c\,x_1^{a_1}\cdots x_n^{a_n}$ với hệ số $c>0$ và số mũ thực bất kỳ; tổng đơn thức dương là tổng các đơn thức như vậy. Mỗi đơn thức trở thành $\exp(a^Tz+b)$, nên $\log$ của nó là affine; mỗi tổng đơn thức trở thành tổng các $\exp$ của hàm affine, và $\log$ của tổng đó là lồi (logarit tổng hàm mũ — đã chứng minh ở phần 4). Điều kiện áp dụng: **biến dương, hệ số dương, số mũ thực bất kỳ**. Quan hệ nghiệm: nếu $z^\star$ là nghiệm của dạng lồi thì $x^\star=\exp z^\star$ là nghiệm của GP gốc; khi giá trị tối ưu đạt được, $p^\star=\exp v^\star$ với $v^\star$ là giá trị tối ưu của dạng lồi. Nối lại hai ví dụ đã học: thiết kế hộp kín thể tích cho trước và phân bổ công suất hai đường truyền — cả hai đều về được dạng này.
:::

### Bốn bước chứng nhận một bài toán lồi

(Trang chiếu: [Chứng nhận một bài toán lồi](lecture-02-cac-bai-toan-toi-uu-loi.html#/tong-hop-chung-nhan).)

1. Xác định biến và miền xác định.
2. Chứng minh $f_0$ lồi: Hessian nửa xác định dương, hoặc quy tắc cấu tạo.
3. Chứng minh tập khả thi lồi: bất đẳng thức hàm lồi $\le0$, đẳng thức affine.
4. Nếu cải dạng: giải thích quan hệ với bài gốc và cách khôi phục nghiệm.

::: exercise
Mục tiêu lồi đã đủ để kết luận bài toán lồi chưa?
:::

::: solution
**Chưa đủ.** Phải xét cả miền xác định và tập khả thi. Ví dụ đã gặp: $f_0(x)=x_1^2+x_2^2$ lồi nhưng bài toán vẫn có thể không lồi nếu ràng buộc không lồi. Nếu dùng tiêu chuẩn Hessian, hàm phải khả vi hai lần trên miền mở lồi đang xét. Có thể chọn cách chứng nhận từ các ví dụ đã học: (1) giá trị tuyệt đối $\max(x,-x)$ lồi theo bất đẳng thức tam giác; (2) hàm bậc hai với $P\succeq0$ kiểm Hessian; (3) GP dạng log tổng các mũ — bước 2 gộp với đổi biến. Nhấn mạnh: cần cả mục tiêu lẫn tập khả thi; **không khẳng định ngược** rằng nếu một $f_i$ không lồi thì tập khả thi không lồi — tập khả thi vẫn có thể lồi qua một biểu diễn khác.
:::

### Giới hạn số đặc trưng

**Nhu cầu.** Bộ phân loại ảnh chỉ dùng tối đa $k$ đặc trưng để giảm chi phí tính toán.

**Dữ liệu, biến.** Dữ liệu cho trước: $u_i\in\mathbb R^d$, $y_i\in\{\pm1\}$, $i=1,\dots,m$; và $k\in\{1,\dots,d-1\}$ với $d\ge2$. Biến: $w\in\mathbb R^d$, $b\in\mathbb R$.

**Mô hình.**

$$H(w,b)=\sum_{i=1}^m \max\bigl(0,\,1-y_i(w^Tu_i+b)\bigr),$$

$$\min_{w,b}\ H(w,b)\quad\text{với}\quad \|w\|_0\le k.$$

$\|w\|_0=\#\{j: w_j\ne0\}$ — **đếm** số đặc trưng được dùng, không phải chuẩn. (Trang chiếu: [Giới hạn số đặc trưng](lecture-02-cac-bai-toan-toi-uu-loi.html#/tong-hop-gioi-han-dac-trung).)

Ký hiệu $\|w\|_0$ không phải một chuẩn: với vectơ đơn vị $e_1$, ta có $\|2e_1\|_0=1\ne2\|e_1\|_0=2$, nên không thỏa tính thuần nhất của chuẩn.

**Giả thiết:** mất mát bản lề $H$ là tổng mất mát trên các mẫu huấn luyện. Chỉ giới hạn $w$, không đếm $b$ — $b$ là hệ số chặn, không phải đặc trưng. Giả thiết $k\le d-1$ để ràng buộc thực sự hạn chế. Trong chứng minh miền không lồi dưới đây, $b$ giữ bằng 0 để tập khả thi chỉ phụ thuộc $w$; các phản ví dụ về tối ưu phía sau để $b$ **tự do**.

::: derivation
**Cách làm trực tiếp.** Liệt kê mọi tập chỉ số có độ lớn không quá $k$ (mọi tập hỗ trợ khả dĩ), cố định các hệ số ngoài tập bằng 0 rồi giải bài lồi theo các hệ số trong tập và hệ số chặn, rồi chọn tốt nhất. Số bài con:

$$\sum_{j=0}^{k}\binom{d}{j}$$

— khó khi $m,d$ lớn. Đây là mô hình thưa theo nghĩa chi phí chỉ phụ thuộc số đặc trưng được dùng. Mục tiếp kiểm tra ngay tập khả thi của ràng buộc đếm này.
:::

### Miền giới hạn đặc trưng không lồi

(Trang chiếu: [Miền giới hạn đặc trưng không lồi](lecture-02-cac-bai-toan-toi-uu-loi.html#/tong-hop-mien-khong-loi).)

![Hai trục w₁, w₂ tạo tập chỉ dùng tối đa một đặc trưng. Hai điểm A=(1,0), B=(0,1) khả thi nhưng trung điểm M=(0,5;0,5) không khả thi.](img/lec-02/feature-cardinality.svg)

Với $d=2$, $k=1$: $F=\{w:\|w\|_0\le1\}$ là hợp của hai trục. $A=(1,0)$, $B=(0,1)$: mỗi điểm có 1 hệ số khác 0, thuộc $F$. $M=(A+B)/2=(0{,}5;0{,}5)$: có 2 hệ số khác 0, $M\notin F$. Suy ra $F$ không lồi.

::: proof
**Chứng minh $F$ không lồi bằng trung điểm (trường hợp $d=2,k=1$).** $A=(1,0)$ có $\|A\|_0=1\le1$ nên $A\in F$; $B=(0,1)$ có $\|B\|_0=1$ nên $B\in F$. Trung điểm $M=(\tfrac12,\tfrac12)$ có cả hai thành phần khác 0 nên $\|M\|_0=2>1$, tức $M\notin F$. Vì tồn tại hai điểm thuộc $F$ có trung điểm không thuộc $F$, $F$ không lồi.

**Khái quát $1\le k<d$.** Chọn hai vectơ có tập chỉ số khác không lần lượt là $S_1=\{1,\ldots,k\}$ và $S_2=\{1,\ldots,k-1\}\cup\{k+1\}$; đặt các hệ số trên mỗi tập bằng 1, các hệ số còn lại bằng 0. Mỗi vectơ dùng đúng $k$ đặc trưng. Trung điểm có hệ số 1 tại $k-1$ vị trí chung và hệ số $1/2$ tại hai vị trí riêng, nên dùng $k+1$ đặc trưng — vi phạm ràng buộc đếm. Khi $k=1$, phần chung rỗng và $S_2=\{2\}$. Giữ hệ số chặn bằng 0 ở cả hai phương án; trung điểm vẫn vi phạm ràng buộc đếm. Do đó tập khả thi không lồi. Với $k=0$ tập hệ số chỉ gồm vectơ không; với $k=d$ là toàn không gian: hai trường hợp này đều lồi.

**Điểm mấu chốt:** hàm mất mát $H$ là lồi (tổng các hàm bản lề lồi), nhưng ràng buộc mới $\|w\|_0\le k$ làm tập khả thi không lồi — nên bài toán tổng thể **không phải bài toán lồi**. Vì miền không lồi, ta chuyển sang một bài toán thay thế có phạt.
:::

### Thay bằng hình phạt chuẩn một

**Nhu cầu:** vừa giữ mất mát nhỏ, vừa khuyến khích hệ số bằng 0.

$$\min_{w,b}\ H(w,b)+\lambda\|w\|_1,\qquad\lambda\ge0\ \text{chọn trước};\ w,b\ \text{tự do}.$$

$H$ và chuẩn một đều lồi, nên mục tiêu lồi. Bảng minh họa ý nghĩa:

| Vectơ | $\|w\|_1$ | Số hệ số khác 0 |
|---|---|---|
| $(2,0)$ | 2 | 1 |
| $(1,1)$ | 2 | 2 |

Mô hình thay thế lồi; **không bảo đảm** dùng tối đa $k$ đặc trưng. (Trang chiếu: [Thay bằng hình phạt chuẩn một](lecture-02-cac-bai-toan-toi-uu-loi.html#/tong-hop-phat-chuan-mot).)

::: proof
**Cải dạng LP và chứng minh tương đương hai chiều.** Viết hệ đầy đủ với biến $w\in\mathbb R^d$, $b\in\mathbb R$, $\xi\in\mathbb R^m$, $t\in\mathbb R^d$:

$$\begin{aligned}
\min_{w,b,\,\xi,\,t}\;&\sum_{i=1}^m\xi_i+\lambda\sum_{j=1}^dt_j\\
\text{với}\quad&\xi_i\ge0,\quad \xi_i\ge1-y_i(w^Tu_i+b),\quad i=1,\ldots,m,\\
&t_j\ge w_j,\quad t_j\ge-w_j,\quad j=1,\ldots,d.
\end{aligned}$$

Mục tiêu và mọi ràng buộc affine: đây là LP.

Chiều thuận: với mọi $(w,b)$, chọn $\xi_i$ bằng phần bản lề $\max(0,1-y_i(w^Tu_i+b))$ và $t_j=|w_j|$ — mọi ràng buộc thỏa và mục tiêu bằng $H(w,b)+\lambda\|w\|_1$.

Chiều ngược: mọi bộ $(w,b,\xi,t)$ khả thi có mục tiêu không nhỏ hơn $H(w,b)+\lambda\|w\|_1$, vì $\xi_i\ge\max(0,1-y_i(w^Tu_i+b))$ và $\sum_jt_j\ge\|w\|_1$, nhân với $\lambda\ge0$ bảo toàn bất đẳng thức.

Vậy hai bài có cùng giá trị tối ưu, và từ nghiệm LP lấy $(w,b)$ khôi phục nghiệm của bài $H+\lambda\|w\|_1$. Khi $\lambda=0$, biến $t$ không nhất thiết bằng $|w|$ tại mọi nghiệm tối ưu. Khôi phục này **chỉ dành cho bài có phạt**; với bài giới hạn cứng $\|w\|_0\le k$ phải kiểm tra riêng, không dùng chung nghiệm.

Bảng $(2,0)$ và $(1,1)$ chỉ minh họa ý nghĩa: cùng chuẩn một nhưng số đặc trưng khác nhau — **không phải chứng minh về nghiệm tối ưu**.
:::

::: proof
**Chứng minh lồi trực tiếp của $H+\lambda\|w\|_1$.** Với $\lambda\ge0$: $H(w,b)$ là tổng các hàm $\max(0,1-y_i(w^Tu_i+b))$, mỗi hàm là hợp của hàm lồi $\max(0,\cdot)$ với hàm affine, nên lồi; $\lambda\|w\|_1=\lambda\sum_j|w_j|$ là tổng các hàm lồi nhân với hệ số không âm, nên lồi. Tổng các hàm lồi là lồi. Vậy mục tiêu $H+\lambda\|w\|_1$ lồi với mọi $\lambda\ge0$ — không cần biến phụ để chứng nhận tính lồi; biến phụ chỉ phục vụ cải dạng LP.
:::

::: proof
**Phản ví dụ số: phạt $\lambda=1$ không bảo đảm $\|w\|_0\le1$.** Dữ liệu bốn điểm tự xây dựng để minh họa (không phải số đo ảnh thật):

$$u_1=(1,0),y_1=1;\quad u_2=(-1,0),y_2=-1;\quad u_3=(0,1),y_3=1;\quad u_4=(0,-1),y_4=-1.$$

Bước 1 — cận dưới theo từng tọa độ. Với $w=(w_1,w_2)$ và $b$ tự do, điểm 1 và 2 cho hai bản lề $\max(0,1-w_1-b)$ và $\max(0,1-w_1+b)$. Chứng minh cận của cặp: đặt $a=1-w_1-b$, $c=1-w_1+b$; khi đó $a+c=2(1-w_1)$ và

$$\max(0,a)+\max(0,c)\ \ge\ 0,\qquad \max(0,a)+\max(0,c)\ \ge\ a+c=2(1-w_1),$$

nên tổng không nhỏ hơn $\max(0,a+c)$. Với $\phi(s)=\max(0,s)$, ta được

$$\max(0,a)+\max(0,c)\ \ge\ 2\,\phi\!\left(\tfrac{a+c}{2}\right)=2\max(0,1-w_1).$$

Tương tự, điểm 3 và 4 cho $\ge2\max(0,1-w_2)$. Vậy

$$H(w,b)\ \ge\ \sum_{j=1}^2 2\max(0,1-w_j).$$

Bước 2 — bất đẳng thức ba trường hợp. Với mọi $w_j$:

- $w_j<0$: $2\max(0,1-w_j)+|w_j|=2(1-w_j)+(-w_j)=2-3w_j>2\ge1$;
- $0\le w_j\le1$: $2(1-w_j)+w_j=2-w_j\ge1$;
- $w_j>1$: $0+w_j=w_j>1$.

Vậy $2\max(0,1-w_j)+|w_j|\ge1$ với mọi $w_j$.

Bước 3 — ghép với $\lambda=1$:

$$H(w,b)+\|w\|_1\ \ge\ \sum_j\bigl[2\max(0,1-w_j)+|w_j|\bigr]\ \ge\ 2.$$

Bước 4 — đạt cận: tại $w=(1,1)$, $b=0$: bản lề từng điểm là $\max(0,1-1)=0$, nên $H=0$; $\|w\|_1=2$; tổng đúng 2. Vậy giá trị tối ưu bằng 2. Xét nghiệm đạt cận: tổng hai thành phần ở bước 3 bằng 2 buộc mỗi thành phần bằng 1; theo ba trường hợp ở bước 2, dấu bằng chỉ xảy ra khi $w_j=1$ (trường hợp $0\le w_j\le1$ với $2-w_j=1$; hai trường hợp còn lại cho giá trị nghiêm). Vậy mọi nghiệm có $w_1=w_2=1$. Với $w=(1,1)$, bản lề điểm 1 là $\max(0,1-(1+b))=\max(0,-b)$, điểm 2 là $\max(0,1-(-1)(-1+b))=\max(0,b)$; tổng hai điểm là $\max(0,-b)+\max(0,b)=|b|$. Tương tự điểm 3, 4 cho $|b|$. Vậy $H((1,1),b)=2|b|$ và mục tiêu $J(b)=2+2|b|$, nhỏ nhất duy nhất tại $b=0$ với giá trị $2$.

Bước 5 — kết luận: nghiệm duy nhất là $w=(1,1)$, $b=0$, có **2 hệ số khác 0**, vi phạm giới hạn $k=1$. Đây là phản ví dụ mạnh cho ý "phạt $\lambda>0$ bảo đảm $\|w\|_0\le k$". Dữ liệu minh họa do người soạn tự xây; nguyên lý thay giới hạn đếm bằng phạt chuẩn một tham chiếu Boyd–Vandenberghe (2004), §6.2, tr. 304–305 và §6.3.2.
:::

### Kiểm tra các biến thể (3 câu tự kiểm)

::: exercise
(1) Thay giới hạn cứng bằng $|w_1|+|w_2|\le2$: tập khả thi có lồi không? Điểm $(1,1)$ có được phép? (2) Phạt $\lambda>0$ có bảo đảm $\|w\|_0\le1$ không? (3) Tìm được nghiệm $(w,b)$ của bài có phạt: cần kiểm tra gì ở bài gốc?
:::

::: solution
(a) Tập $\{w:|w_1|+|w_2|\le2\}$ là hình thoi — lồi. Điểm $(1,1)$ có $|w_1|+|w_2|=2$ nên được phép; lưu ý nó dùng 2 đặc trưng, khác với giới hạn đếm $\|w\|_0\le1$. (b) Không. Dùng ví dụ số đã dẫn ở mục hình phạt: với dữ liệu bốn điểm và $\lambda=1$, nghiệm của $H+\|w\|_1$ là $w=(1,1)$, $b=0$, có 2 hệ số khác 0 — vi phạm $\|w\|_0\le1$. Hình phạt chỉ khuyến khích thưa, không bảo đảm đếm. (c) Không được chỉ đọc giá trị có phạt. Phải: (i) kiểm tra số đặc trưng thực dùng của $w$; (ii) đánh giá lại mất mát $H(w,b)$ và số lỗi của bài gốc — hai giá trị $H$ và $H+\lambda\|w\|_1$ không cùng thước đo, không so sánh trực tiếp. Nếu cắt bớt đặc trưng để giữ đúng $k$, phải tính lại mất mát trên tập đặc trưng còn lại, và không có bảo đảm nghiệm còn tối ưu. Các bước kiểm tra này bảo đảm kết quả được đánh giá bằng đúng mục tiêu và ràng buộc ban đầu.
:::

### Tổng kết bài giảng

(Trang chiếu: [Tổng kết bài giảng](lecture-02-cac-bai-toan-toi-uu-loi.html#/tong-ket-bai).)

1. **Nhận dạng:** đọc LP/QP/GP từ cấu trúc mục tiêu và ràng buộc.
2. **Cải dạng/xấp xỉ:** nêu rõ giả thiết và quan hệ với bài gốc.
3. **Chứng nhận:** chứng nhận tính lồi và diễn giải nghiệm trong bài toán ban đầu.

Khi giải một mô hình mới, cần xác định **dữ liệu, biến, mục tiêu và ràng buộc**; thực hiện phép biến đổi kèm điều kiện; **chứng nhận tính lồi**, kiểm tra nghiệm và diễn giải kết quả theo nhu cầu ban đầu.

### Tài liệu tham khảo

Boyd–Vandenberghe (2004), *Convex Optimization*: chương 4 cho các dạng chuẩn (LP §4.3, QP/QCQP §4.4, GP §4.5); §6.1.1 cho hồi quy chuẩn; §6.2 cho xấp xỉ chuẩn một; §6.3.2 cho chính quy hóa; §6.5.4 về biểu diễn thưa và §8.6.1 về phân loại tuyến tính. Các phản ví dụ số (giới hạn đặc trưng, phạt chuẩn một với dữ liệu bốn điểm) do người soạn tự xây dựng để minh họa, không trích từ sách.
