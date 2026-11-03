# Bài 13 — Ra quyết định tuần tự dưới điều kiện bất định

## Mục tiêu học tập

Sau bài này, người học có thể:

1. Phát biểu tính Markov, phân biệt nó với độc lập, lập ma trận chuyển và tính phân phối trạng thái sau nhiều bước theo quy ước vector hàng.
2. Mô hình hóa một quá trình quyết định Markov hữu hạn; xác định trạng thái, hành động, chuyển trạng thái, phần thưởng, chính sách và tổng thưởng chiết khấu.
3. Suy ra phương trình Bellman cho một chính sách và chứng minh vì sao điểm bất động của toán tử tối ưu chính là giá trị tối ưu, thay vì chỉ là một nghiệm đại số.
4. Chứng minh tính co, tính duy nhất và hội tụ của lặp giá trị; dùng chặn sai số và kiểm tra các giả thiết cần thiết.
5. Phân biệt quy hoạch khi biết mô hình với học từ trải nghiệm; ước lượng một hàng chuyển tiếp từ số đếm và tính một mục tiêu Bellman.
6. Phân tích giới hạn khi trạng thái không đủ thông tin, khi không có chiết khấu hoặc khi chỉ có dữ liệu tương tác; giải thích vì sao chứng minh cho lặp giá trị chính xác chưa phải chứng minh hội tụ của một thuật toán học.

Các mục tiêu cụ thể hóa năng lực xây dựng mô hình học máy thuộc CLO2 và năng lực nhận dạng bài toán tối ưu trong AI thuộc CLO4 của đề cương học phần. Đây là các mục tiêu biên soạn, không phải các mã chuẩn đầu ra bài học mới. Các Bài tập 13.1–13.6 kiểm tra sáu nhóm mục tiêu; bài trên lớp và bài tự học yêu cầu phối hợp mô hình hóa, tính toán và lập luận.

## Kiến thức tiên quyết và liên hệ với các bài trước

- **Quy hoạch động tất định.** Bài 07, Định nghĩa 07.46 mô tả trạng thái, điều khiển và chi phí theo giai đoạn; Định lý 07.49 cho phương trình Bellman hữu hạn tất định. Ta thay trạng thái kế tiếp xác định bằng một phân phối có điều kiện, rồi thay chi phí hữu hạn bằng tổng thưởng chiết khấu vô hạn. Dấu tối ưu đổi từ cực tiểu chi phí sang cực đại phần thưởng.
- **Xác suất.** Cần biết xác suất có điều kiện, xác suất toàn phần và kỳ vọng toàn phần trong Bài 10. Phép lấy tổng theo trạng thái kế tiếp sẽ là phần xác suất của bước Bellman.
- **Ước lượng.** Định lý 11.7 cho MLE của một vector xác suất phân loại từ các số đếm. Cùng công thức sẽ được dùng để ước lượng một hàng của mô hình chuyển tiếp khi có dữ liệu phù hợp.
- **Học và tối ưu.** Bài 12 phân biệt sai số tối ưu trên mô hình đang dùng với hạn chế biểu diễn và sai số do lấy mẫu. Ở đây, lặp giá trị giải bài toán quy hoạch với một mô hình cố định; nếu mô hình được học, sai số của nó là một vấn đề bổ sung.
- **Giải tích và đại số tuyến tính.** Cần biết tổng cấp số nhân, vector hữu hạn, nhân ma trận, chuẩn cực đại và khái niệm dãy Cauchy. Tính đầy đủ của không gian hữu hạn chiều được dùng trong chứng minh hội tụ; không cần định lý xác suất tiệm cận cho các thuật toán học tăng cường.

Trong Bài 07, trạng thái đủ thông tin cho phép chia bài toán thành những bài toán đuôi độc lập với cách đã đến trạng thái đó. Với chuyển trạng thái ngẫu nhiên, cùng yêu cầu đủ thông tin trở thành giả thiết Markov có điều kiện theo hành động. Kỳ vọng mô tả tương lai chưa biết, còn chiết khấu cho phép kiểm soát tổng thưởng qua vô hạn bước.

## Cách đọc và phân bổ thời gian

| Nội dung lý thuyết | Thời gian |
|---|---:|
| 13.1. Quá trình ngẫu nhiên và xích Markov | 25 phút |
| 13.2. Mô hình quyết định, chính sách và chiết khấu | 25 phút |
| 13.3. Bellman tối ưu và lặp giá trị | 40 phút |
| 13.4. Biết mô hình và học từ trải nghiệm | 30 phút |
| **Tổng lý thuyết** | **120 phút** |

Ba bài trên lớp chiếm 30 phút riêng. Bốn bài tự học cần khoảng 180 phút; khoảng hai giờ còn lại dành cho đọc sách và kiểm tra các phép suy diễn, tổng cộng khoảng năm giờ tự học.

Phần **cốt lõi** gồm các mô hình hữu hạn, phương trình Bellman, chứng minh tính co, tính tối ưu của điểm bất động, ví dụ tính lặp bằng tay, ước lượng chuyển tiếp từ số đếm và phân biệt quy hoạch với học từ trải nghiệm. Phần **mở rộng** gồm chặn sai số theo phần dư Bellman và phản ví dụ khi bỏ chiết khấu. Phần **đọc thêm** dẫn tới các phương pháp học giá trị; công thức cập nhật Q chỉ dùng để phân biệt phép lấy kỳ vọng chính xác với một phép cập nhật từ mẫu, không triển khai toàn bộ lý thuyết hội tụ.

Mọi số liệu dưới đây là số liệu giả lập phục vụ học tập. Ví dụ 13.1 giữ ma trận và phân phối đầu của ví dụ xích Markov trong `sources/part2/lecture_notes.pdf`, Tuần 4. Ví dụ 13.5 giữ mô hình hai trạng thái, hai hành động của nguồn đó. Các ví dụ khác được biên soạn hoặc điều chỉnh để làm rõ giả thiết và phép tính; không gán chúng thành ví dụ hay bài tập nguyên bản của Murphy.

## Bảng ký hiệu

| Ký hiệu | Ý nghĩa | Miền hoặc kiểu |
|---|---|---|
| $t,k,N$ | thời điểm, chỉ số vòng lặp, số bước hữu hạn | số nguyên không âm |
| $\mathcal S$, $s,s'$ | tập trạng thái; trạng thái hiện tại và kế tiếp | tập hữu hạn khác rỗng; phần tử của tập |
| $S_t$ | trạng thái ngẫu nhiên tại thời điểm $t$ | biến ngẫu nhiên trên $\mathcal S$ |
| $\mu_t$ | phân phối của $S_t$ | vector hàng xác suất |
| $P_{ij}$ | xác suất chuyển từ trạng thái $i$ sang $j$ trong xích | phần tử của ma trận hàng ngẫu nhiên |
| $\mathcal A(s)$, $a$ | tập hành động khả thi tại $s$; một hành động | tập hữu hạn khác rỗng; phần tử của tập |
| $A_t$ | hành động được chọn tại thời điểm $t$ | thuộc $\mathcal A(S_t)$ |
| $H_t$ | lịch sử quan sát đến trạng thái $S_t$ | chuỗi trạng thái, hành động và phần thưởng |
| $P(s'\mid s,a)$ | mô hình chuyển trạng thái có điều khiển | không âm, tổng theo $s'$ bằng $1$ |
| $R_{t+1}$ | phần thưởng ngẫu nhiên sau hành động $A_t$ | số thực bị chặn |
| $r(s,a)$ | phần thưởng kỳ vọng một bước | $\mathbb E[R_{t+1}\mid S_t=s,A_t=a]$ theo mô hình |
| $R_{\max}$ | chặn trị tuyệt đối phần thưởng | số hữu hạn không âm |
| $\gamma$ | hệ số chiết khấu | $0\le\gamma<1$ trong các định lý chính |
| $\rho$, $\pi$ | chính sách tổng quát; chính sách Markov dừng | quy tắc chọn hành động theo lịch sử; theo trạng thái |
| $P^\pi$, $r^\pi$ | ma trận chuyển và vector thưởng dưới chính sách dừng | ma trận $|\mathcal S|\times|\mathcal S|$; vector cột |
| $G_t$ | tổng thưởng chiết khấu từ thời điểm $t$ | biến ngẫu nhiên hữu hạn |
| $V^\rho$, $V^\pi$, $V^*$ | giá trị của chính sách; giá trị tối ưu | hàm $\mathcal S\to\mathbb R$ |
| $V_k$, $T$, $T^\pi$ | giá trị lặp; toán tử tối ưu; toán tử theo chính sách | vector; ánh xạ trên $\mathbb R^{|\mathcal S|}$ |
| $Q_V(s,a)$, $Q(s,a)$ | giá trị nhìn trước theo $V$; bảng giá trị hành động được học | số thực; hàm trên cặp trạng thái–hành động |
| $\|V\|_\infty$ | chuẩn cực đại $\max_s|V(s)|$ | số không âm |
| $N(s,a,s')$, $N(s,a)$ | số chuyển tiếp và số lần quan sát một cặp | số nguyên không âm |
| $\alpha$, $\varepsilon$ | bước học; mức sai số mong muốn | số dương; số dương |

## 13.1. Quá trình ngẫu nhiên và xích Markov

Một robot có thể đang hoạt động hoặc đang ở chế độ nghỉ. Trạng thái ngày mai chưa biết chắc, nhưng phụ thuộc vào trạng thái hiện tại. Để tính khả năng robot còn hoạt động sau hai bước, chúng ta cần một mô hình cho cả cách chuyển trạng thái lẫn phân phối trạng thái ban đầu.

Một cách trực quan, trạng thái hiện tại được dùng như bản tóm tắt quá khứ đủ để dự đoán bước kế tiếp. Đây là trực giác về tính Markov; nó không nói các thời điểm độc lập và cũng không bảo đảm một quan sát cảm biến bất kỳ đã là một trạng thái đủ thông tin.

### Trạng thái đủ cho dự đoán một bước

::: definition Định nghĩa 13.1 (Quá trình ngẫu nhiên và xích Markov thuần nhất)
Một **quá trình ngẫu nhiên rời rạc theo thời gian** là một dãy $S_0,S_1,\ldots$ các biến ngẫu nhiên. Trong bài này, chúng nhận giá trị trên cùng tập hữu hạn $\mathcal S$.

Quá trình có **tính Markov** nếu phân phối của $S_{t+1}$ có điều kiện theo toàn bộ trạng thái quá khứ chỉ phụ thuộc $S_t$:

$$
\mathbb P(S_{t+1}=s'\mid S_0=s_0,\ldots,S_t=s)
=\mathbb P(S_{t+1}=s'\mid S_t=s),
\tag{13.1}
$$

với mọi lịch sử có xác suất dương. Một **xích Markov thuần nhất theo thời gian** còn có xác suất chuyển không phụ thuộc $t$. Khi đó một ma trận $P$ xác định mô hình:

$$
P_{ij}=\mathbb P(S_{t+1}=j\mid S_t=i),
\qquad P_{ij}\ge0,\qquad\sum_jP_{ij}=1.
\tag{13.2}
$$

Ma trận như vậy được gọi là **ma trận hàng ngẫu nhiên**: mỗi hàng là một phân phối trên trạng thái kế tiếp.
:::

Định nghĩa 13.1 dùng độc lập có điều kiện của Bài 10: khi biết $S_t$, các trạng thái cũ hơn không còn đổi phân phối của $S_{t+1}$. Nó khác độc lập không điều kiện giữa $S_t$ và $S_{t+1}$. Tính thuần nhất cũng là giả thiết riêng; một xích có thể có tính Markov nhưng dùng các ma trận chuyển $P_t$ thay đổi theo thời gian.

Trong học máy, trạng thái là đối tượng mô hình hóa cần được chọn, không nhất thiết là toàn bộ dữ liệu thô hay chỉ một số đo đơn lẻ. Nếu pin và vị trí cùng ảnh hưởng tới bước kế tiếp của robot, chỉ ghi vị trí có thể làm mất tính Markov. Việc thêm biến vào trạng thái có thể giúp mô hình đủ thông tin nhưng cũng làm tăng số trạng thái cần ước lượng.

### Truyền phân phối và quy ước vector hàng

Giả sử $\mathcal S$ có $m$ trạng thái được xếp theo một thứ tự cố định. Ta biểu diễn phân phối bằng vector hàng $\mu_t=(\mathbb P(S_t=1),\ldots,\mathbb P(S_t=m))$. Về mặt trực quan, xác suất đến một trạng thái mới là tổng xác suất đi qua từng trạng thái hiện tại; đây là phép lấy biên qua trạng thái chưa quan sát.

Mệnh đề tiếp theo dùng xác suất toàn phần và giả thiết thuần nhất trong Định nghĩa 13.1. Cơ sở đọc là Murphy (2023), tập II, §2.6.1 về tham số hóa xích Markov.

::: proposition Mệnh đề 13.2 (Phân phối sau nhiều bước)
**Giả thiết.** $S_t$ là xích Markov hữu hạn thuần nhất với ma trận chuyển hàng $P$ và phân phối ban đầu $\mu_0$.

**Kết luận.**

$$
\mu_{t+1}=\mu_tP,
\qquad
\mu_t=\mu_0P^t.
\tag{13.3}
$$

Các vector này đều có phần tử không âm và tổng bằng $1$.

**Điều kiện áp dụng.** Thứ tự trạng thái trong các vector và trong hàng, cột của ma trận phải thống nhất. Công thức lũy thừa dùng cùng một ma trận ở mọi bước.

**Phạm vi.** Với ma trận thay đổi theo thời gian, công thức tương ứng là $\mu_t=\mu_0P_0P_1\cdots P_{t-1}$, không phải $\mu_0P^t$.
:::

::: proof Chứng minh Mệnh đề 13.2
**Bước 1 (một bước).** Với mỗi trạng thái $j$, xác suất toàn phần cho

$$
\mathbb P(S_{t+1}=j)
=\sum_i\mathbb P(S_t=i)\mathbb P(S_{t+1}=j\mid S_t=i)
=\sum_i\mu_t(i)P_{ij}.
$$

Đó là tọa độ thứ $j$ của $\mu_tP$.

**Bước 2 (chuẩn hóa).** Các số hạng đều không âm. Đổi thứ tự hai tổng hữu hạn và dùng tổng mỗi hàng của $P$ bằng $1$ cho

$$
\sum_j\mu_{t+1}(j)
=\sum_i\mu_t(i)\sum_jP_{ij}
=\sum_i\mu_t(i)=1.
$$

**Bước 3 (lặp).** Thay liên tiếp công thức một bước cho $\mu_t=\mu_0P^t$, với $P^0=I_m$. $\square$
:::

Trong học máy, (13.3) truyền một phân phối trạng thái chưa biết chắc qua mô hình chuyển tiếp đã biết. Đây là phép suy luận xác suất, chưa phải một bài toán chọn hành động. Phần điều khiển chỉ xuất hiện khi hành động cho phép thay đổi hàng chuyển tiếp đang dùng.

::: example Ví dụ 13.1 (Xích hai trạng thái, điều chỉnh từ nguồn khởi đầu)
**Mô hình.** Hai trạng thái được xếp theo thứ tự $A,B$. Cho

$$
P=\begin{pmatrix}0.8&0.2\\0.35&0.65\end{pmatrix},
\qquad \mu_0=(1,0).
$$

**Tính một bước.** $\mu_1=(1,0)P=(0.8,0.2)$.

**Tính hai bước.**

$$
\mu_2=(0.8,0.2)P
=(0.8\cdot0.8+0.2\cdot0.35,\ 0.8\cdot0.2+0.2\cdot0.65)
=(0.71,0.29).
$$

**Kiểm tra và diễn giải.** Các hàng của $P$ và các vector $\mu_t$ đều không âm, có tổng bằng $1$. Xác suất ở $A$ sau hai bước bằng $0.71$; không bằng $0.8^2=0.64$ vì còn có đường đi $A\to B\to A$ đóng góp $0.2\cdot0.35=0.07$.
:::

::: example Ví dụ 13.2 (Xác suất chuyển khác xác suất đồng thời)
**Dữ kiện.** Cho hai trạng thái $A,B$ với cùng ma trận $P=\begin{pmatrix}0.8&0.2\\0.35&0.65\end{pmatrix}$. Tại thời điểm đang xét, $\mu_t=(0.4,0.6)$.

**Tính.** Mô hình cho $\mathbb P(S_{t+1}=B\mid S_t=A)=0.2$. Xác suất đồng thời là

$$
\mathbb P(S_t=A,S_{t+1}=B)=0.4\cdot0.2=0.08.
$$

Phân phối bước sau là $\mu_{t+1}=(0.53,0.47)$.

**Kiểm tra độc lập.** Nếu hai trạng thái liên tiếp độc lập thì xác suất đồng thời vừa tính phải bằng $0.4\cdot0.47=0.188$, nhưng thực tế bằng $0.08$. Vì vậy tính Markov không khiến hai thời điểm độc lập.
:::

::: remark Nhận xét 13.3 (Những giả thiết khác nhau)
1. Tính Markov nói về phân phối có điều kiện theo hiện tại; tính độc lập nói về việc biết một biến có thay đổi phân phối của biến khác hay không. Chúng không đồng nhất.
2. Thuần nhất nói mô hình chuyển không đổi theo thời gian. Nếu một thiết bị hao mòn nhưng trạng thái không ghi mức hao mòn, một ma trận cố định có thể không còn mô tả đúng dữ liệu.
3. Tổng mỗi hàng của $P$ bằng $1$; tổng mỗi cột không nhất thiết bằng $1$. Nếu dùng vector cột thay vì vector hàng, phép truyền phải được viết với ma trận chuyển vị tương ứng.
:::

::: exercise Bài tập 13.1 (Củng cố: phân phối trạng thái)
Một xích có trạng thái $A,B$, ma trận chuyển hàng $P=\begin{pmatrix}0.8&0.2\\0.35&0.65\end{pmatrix}$ và phân phối đầu $\mu_0=(0,1)$. Tính $\mu_1,\mu_2$ và xác suất đồng thời $\mathbb P(S_0=B,S_1=A)$. Phân biệt số này với $P_{BA}$ về định nghĩa, dù chúng trùng giá trị trong dữ kiện này.
:::

::: hint Gợi ý Bài tập 13.1
Nhân vector hàng từ bên trái. Xác suất đồng thời còn chứa xác suất trạng thái đầu; ở đây trạng thái đầu đã chắc chắn bằng $B$.
:::

::: solution Lời giải Bài tập 13.1
Ta có $\mu_1=(0.35,0.65)$ và

$$
\mu_2=(0.35\cdot0.8+0.65\cdot0.35,\ 0.35\cdot0.2+0.65\cdot0.65)
=(0.5075,0.4925).
$$

Xác suất đồng thời là $1\cdot0.35=0.35$. Phần tử $P_{BA}=0.35$ là xác suất có điều kiện khi đã biết $S_0=B$; hai số trùng nhau vì xác suất của điều kiện bằng $1$, không phải vì hai khái niệm đồng nhất.
:::

Định nghĩa 13.1 nêu điều kiện đủ thông tin của trạng thái và điều kiện mô hình không đổi theo thời gian. Mệnh đề 13.2 dùng các điều kiện đó để truyền phân phối, còn Nhận xét 13.3 tách chúng khỏi độc lập và các quy ước ma trận. Khi robot có thể chọn cách vận hành, phân phối bước sau phải phụ thuộc thêm hành động; ta cần một mô hình quyết định thay vì một xích cố định.

## 13.2. Mô hình quyết định, chính sách và tổng thưởng chiết khấu

Một robot có thể chọn cách vận hành mang lại phần thưởng lớn ngay nhưng dễ dừng hoạt động, hoặc cách ổn định nhận ít hơn mỗi bước và tiếp tục lâu hơn. Chỉ so phần thưởng của bước hiện tại bỏ qua ảnh hưởng của hành động lên những lần nhận thưởng sau. Chúng ta cần mô hình hóa đồng thời lựa chọn, chuyển trạng thái và tiêu chuẩn cho cả chuỗi tương lai.

Một cách trực quan, một hành động chọn một phân phối của trạng thái kế tiếp và một cơ chế nhận thưởng. Chính sách quy định cách lựa chọn hành động; giá trị của nó là kỳ vọng tổng thưởng dài hạn. Đây là trực giác điều khiển, chưa xác định trạng thái nào đủ thông tin hay tổng vô hạn có tồn tại hay không.

### Trạng thái, hành động và phần thưởng

::: definition Định nghĩa 13.4 (Quá trình quyết định Markov hữu hạn)
Một **quá trình quyết định Markov** (Markov decision process, MDP) hữu hạn trong bài này gồm:

- Tập trạng thái hữu hạn khác rỗng $\mathcal S$.
- Tập hành động hữu hạn khác rỗng $\mathcal A(s)$ tại mỗi $s$.
- Một mô hình thuần nhất cho trạng thái kế tiếp $S_{t+1}$ và phần thưởng $R_{t+1}$ khi biết trạng thái hiện tại $S_t=s$ và hành động $A_t=a$.
- Hệ số chiết khấu $0\le\gamma<1$.

Đặt lịch sử $H_t=(S_0,A_0,R_1,S_1,\ldots,A_{t-1},R_t,S_t)$. **Giả thiết Markov có điều khiển** yêu cầu phân phối chung của $(S_{t+1},R_{t+1})$ có điều kiện theo $H_t,A_t$ chỉ phụ thuộc cặp $(S_t,A_t)$, không phụ thuộc thời gian hoặc phần còn lại của lịch sử.

Ký hiệu các đại lượng của mô hình là

$$
P(s'\mid s,a)=\mathbb P(S_{t+1}=s'\mid S_t=s,A_t=a),
\qquad \sum_{s'}P(s'\mid s,a)=1,
$$

$$
r(s,a)=\mathbb E[R_{t+1}\mid S_t=s,A_t=a].
\tag{13.4}
$$

Giả sử phần thưởng bị chặn gần chắc chắn: $|R_{t+1}|\le R_{\max}<\infty$ với mọi cặp khả thi. Các điều kiện phân phối được hiểu đối với lịch sử và hành động có thể xảy ra, hoặc như các hạt nhân chuyển được cho trước cho mọi cặp khả thi.
:::

Định nghĩa 13.4 mở rộng Định nghĩa 13.1 bằng một biến điều khiển. Yêu cầu Markov không chỉ áp dụng cho trạng thái kế tiếp mà còn cho cơ chế phần thưởng: một biến ẩn ảnh hưởng tới phần thưởng tương lai cũng cần được đưa vào trạng thái nếu muốn dùng mô hình này. Đại lượng $R_{t+1}$ là quan sát ngẫu nhiên, còn $r(s,a)$ là trung bình của mô hình; chúng không được dùng thay nhau trong một phép cập nhật từ dữ liệu.

Nếu mô hình cho phần thưởng xác định theo cả trạng thái kế tiếp, viết $r(s,a,s')$, thì $r(s,a)=\sum_{s'}P(s'\mid s,a)r(s,a,s')$. Công thức (13.4) cũng cho phép phần thưởng và trạng thái kế tiếp cùng ngẫu nhiên và có tương quan. Khi tối ưu kỳ vọng tổng thưởng, tính tuyến tính của kỳ vọng cho phép dùng trung bình $r(s,a)$ mà không cần giả sử hai đại lượng này độc lập.

### Chính sách và xích được tạo ra khi cố định lựa chọn

::: definition Định nghĩa 13.5 (Chính sách tổng quát và chính sách Markov dừng)
Một **chính sách** tổng quát $\rho$ chọn một phân phối $\rho_t(a\mid H_t)$ trên $\mathcal A(S_t)$ ở mỗi thời điểm. Nó có thể phụ thuộc thời gian, toàn lịch sử và có thể ngẫu nhiên hóa.

Một **chính sách Markov dừng** $\pi$ chỉ dùng trạng thái hiện tại và không thay đổi theo thời gian: $\pi(a\mid s)$. Nó là tất định nếu tại mỗi trạng thái chọn một hành động duy nhất, ký hiệu $\pi(s)$.

Với một chính sách Markov dừng, mô hình tạo ra xích thuần nhất với

$$
P^\pi(s,s')=\sum_{a\in\mathcal A(s)}\pi(a\mid s)P(s'\mid s,a),
\qquad
r^\pi(s)=\sum_{a\in\mathcal A(s)}\pi(a\mid s)r(s,a).
\tag{13.5}
$$
:::

Định nghĩa 13.5 tách quy luật môi trường khỏi quy tắc chọn hành động. Khi chính sách là Markov dừng, lấy tổng theo hành động cho một ma trận $P^\pi$ có tổng mỗi hàng bằng $1$, nên có thể dùng Mệnh đề 13.2. Với chính sách Markov phụ thuộc thời gian, ma trận có thể thay đổi theo bước; với chính sách phụ thuộc lịch sử, riêng dãy $S_t$ nói chung không còn là xích Markov. Giả thiết môi trường Markov có điều khiển không tự loại bỏ sự phụ thuộc lịch sử do chính sách tạo ra.

::: example Ví dụ 13.3 (Một chính sách ngẫu nhiên tạo một xích)
**MDP.** Hai trạng thái là $s$ đang hoạt động và $z$ hấp thụ. Tại $s$, hành động $A$ có thưởng $1$ và xác suất trở lại $s$ bằng $1/2$; hành động $B$ có thưởng $0.6$ và luôn trở lại $s$. Các xác suất còn lại đi tới $z$. Tại $z$, chỉ có một hành động với thưởng $0$ và ở lại $z$.

**Chính sách.** Chọn $A$ hoặc $B$ với xác suất $1/2$ tại mỗi lần ở $s$, độc lập với lịch sử khi biết trạng thái hiện tại. Đặt $\gamma=0.9$.

**Tính mô hình dưới chính sách.** Theo (13.5), với thứ tự trạng thái $s,z$,

$$
P^\pi=\begin{pmatrix}0.75&0.25\\0&1\end{pmatrix},
\qquad
r^\pi=\begin{pmatrix}0.8\\0\end{pmatrix}.
$$

**Kiểm tra và diễn giải.** Xác suất ở lại $s$ là $\frac12\cdot\frac12+\frac12\cdot1=3/4$. Thưởng kỳ vọng là $\frac12\cdot1+\frac12\cdot0.6=0.8$. Khi đã cố định chính sách, việc truyền phân phối dùng ma trận này; trước khi chọn chính sách, không có một ma trận chuyển duy nhất cho robot.
:::

### Giá trị của một chuỗi quyết định

Nếu chỉ cộng phần thưởng vô hạn mà không có điều kiện bổ sung, tổng có thể không hữu hạn. Chiết khấu làm phần đuôi xa bị chặn bởi một cấp số nhân. Một cách trực quan, nó giảm trọng số của phần thưởng đến muộn; đây là trực giác về tiêu chuẩn, không phải một giả thiết rằng mọi ứng dụng buộc phải có cùng một cách đánh giá thời gian.

::: definition Định nghĩa 13.6 (Tổng thưởng chiết khấu và hàm giá trị)
Với $0\le\gamma<1$, **tổng thưởng chiết khấu** từ thời điểm $t$ là

$$
G_t=\sum_{j=0}^{\infty}\gamma^jR_{t+j+1}.
\tag{13.6}
$$

Với một chính sách tổng quát $\rho$ được bắt đầu từ $S_0=s$, **hàm giá trị** là $V^\rho(s)=\mathbb E_\rho[G_0\mid S_0=s]$. Giá trị tối ưu được định nghĩa bằng cận trên đúng trên mọi chính sách tổng quát:

$$
V^*(s)=\sup_\rho V^\rho(s).
\tag{13.7}
$$

Với chính sách Markov dừng $\pi$, ký hiệu tương ứng là $V^\pi$. Khi $\gamma=0$, tổng thưởng chỉ còn phần thưởng đầu tiên; dùng quy ước $\gamma^0=1$ trong (13.6).
:::

Định nghĩa 13.6 gán giá trị cho cả chuỗi lựa chọn, khác với thưởng một bước $r(s,a)$ trong Định nghĩa 13.4. Định nghĩa tối ưu (13.7) chưa giả sử rằng một chính sách dừng là đủ hoặc cận trên được đạt; điều đó sẽ được chứng minh ở Mục 13.3.

Mệnh đề tiếp theo dùng chặn phần thưởng trong Định nghĩa 13.4 và tổng cấp số nhân. Cơ sở là Murphy (2023), tập II, §34.5.3–34.5.4.

::: proposition Mệnh đề 13.7 (Tồn tại giá trị và chặn phần đuôi)
**Giả thiết.** $|R_{t+1}|\le R_{\max}<\infty$, $0\le\gamma<1$, và $\rho$ là một chính sách khả thi bất kỳ.

**Kết luận.** Tổng thưởng hội tụ tuyệt đối trên mọi quỹ đạo thỏa chặn phần thưởng, và

$$
|G_t|\le\frac{R_{\max}}{1-\gamma},
\qquad
|V^\rho(s)|\le\frac{R_{\max}}{1-\gamma}.
\tag{13.8}
$$

Với $N\ge1$, phần đuôi từ bước $N$ bị chặn bởi $R_{\max}\gamma^N/(1-\gamma)$. Đặc biệt, mọi $V^\rho(s)$ và $V^*(s)$ trong (13.7) hữu hạn.

**Điều kiện áp dụng.** Chặn phần thưởng phải đúng chung cho mọi thời điểm và mọi hành động khả thi.

**Phạm vi.** Không suy ra cùng kết luận cho $\gamma=1$ hoặc phần thưởng không bị chặn mà không có giả thiết khác.
:::

::: proof Chứng minh Mệnh đề 13.7
**Bước 1 (tổng tuyệt đối).** Ta có $\sum_{j=0}^\infty\gamma^j|R_{t+j+1}|\le R_{\max}\sum_{j=0}^\infty\gamma^j=R_{\max}/(1-\gamma)$. Vì tổng vế phải hữu hạn, tổng thưởng hội tụ tuyệt đối và thỏa chặn thứ nhất.

**Bước 2 (kỳ vọng và phần đuôi).** Lấy kỳ vọng của chặn tuyệt đối cho chặn giá trị. Thay tổng từ $j=0$ bằng tổng từ $j=N$ cho phần đuôi không quá $R_{\max}\gamma^N/(1-\gamma)$; nó tiến về $0$ khi $N\to\infty$. Mọi chính sách có cùng chặn, nên cận trên đúng theo chính sách cũng hữu hạn. $\square$
:::

Trong học máy, chiết khấu cùng phần thưởng bị chặn cho phép so sánh các chính sách bằng những số hữu hạn và kiểm soát sai số khi cắt một chuỗi dài. Hệ số $\gamma$ gần $1$ làm phần đuôi giảm chậm hơn; vì thế ảnh hưởng dài hạn và yêu cầu tính toán đều có thể tăng. Giá trị của $\gamma$ thuộc về tiêu chuẩn mô hình hóa, không chỉ là một tham số kỹ thuật để chứng minh hội tụ.

### Phương trình Bellman khi đã cố định chính sách

Đẳng thức $G_t=R_{t+1}+\gamma G_{t+1}$ tách bước đầu khỏi phần còn lại. Với chính sách Markov dừng, giá trị của phần còn lại khi biết trạng thái kế tiếp là cùng một hàm $V^\pi$; đó là chỗ dùng cả trạng thái đủ thông tin lẫn tính dừng của chính sách.

Định lý sau dựa trên Định nghĩa 13.4–13.6 và Mệnh đề 13.7. Nguồn chính là Murphy (2023), tập II, §34.5.4; đối chiếu bổ trợ với Sutton và Barto (2018), §3.5 và §4.1.

::: theorem Định lý 13.8 (Bellman và đánh giá chính sách dừng)
**Giả thiết.** MDP hữu hạn thỏa Định nghĩa 13.4; $\pi$ là một chính sách Markov dừng. Biểu diễn giá trị và thưởng bằng vector cột theo cùng thứ tự trạng thái.

**Kết luận.** Hàm giá trị là nghiệm duy nhất của

$$
V^\pi(s)=r^\pi(s)+\gamma\sum_{s'}P^\pi(s,s')V^\pi(s'),
\qquad
V^\pi=r^\pi+\gamma P^\pi V^\pi.
\tag{13.9}
$$

Nó có thể được tính bằng hệ tuyến tính $(I-\gamma P^\pi)V^\pi=r^\pi$.

**Điều kiện áp dụng.** Phần thưởng kỳ vọng và mô hình chuyển trong (13.5) thuộc đúng chính sách đang đánh giá. Vector giá trị là vector cột, còn phân phối trạng thái ở Mục 13.1 là vector hàng.

**Phạm vi.** Đây là phương trình cho một chính sách cố định, chưa phải một phương trình tối ưu theo hành động.
:::

::: proof Chứng minh Định lý 13.8
**Bước 1 (tách tổng thưởng).** Mệnh đề 13.7 bảo đảm tổng và các kỳ vọng hữu hạn. Tách $G_0=R_1+\gamma G_1$, lấy kỳ vọng khi $S_0=s$, rồi dùng kỳ vọng toàn phần theo hành động và trạng thái kế tiếp. Tính Markov của môi trường và tính dừng của $\pi$ cho kỳ vọng phần thưởng đầu bằng $r^\pi(s)$ và giá trị kỳ vọng của phần đuôi bằng $\sum_{s'}P^\pi(s,s')V^\pi(s')$. Suy ra (13.9).

**Bước 2 (tính duy nhất).** Nếu $V,W$ đều là nghiệm, $V-W=\gamma P^\pi(V-W)$. Vì mỗi hàng $P^\pi$ là một phân phối,

$$
\|V-W\|_\infty\le\gamma\|V-W\|_\infty.
$$

Do $\gamma<1$, suy ra $V=W$. Giá trị được định nghĩa bằng kỳ vọng đã cho một nghiệm, nên hệ có nghiệm duy nhất. Cũng có thể thấy $I-\gamma P^\pi$ khả nghịch: phương trình thuần nhất chỉ có nghiệm $0$ và ma trận là vuông. $\square$
:::

Trong học máy, Định lý 13.8 cho cách đánh giá một quy tắc điều khiển nếu mô hình đã biết. Nó giải thích vì sao tổng thưởng dài hạn có thể được tính bằng một phương trình nhất quán một bước. Tính duy nhất của giá trị dưới một chính sách không hàm ý chính sách đó tối ưu.

::: example Ví dụ 13.4 (So sánh ba chính sách của robot)
**MDP.** Hai trạng thái là $s,z$, trong đó $z$ hấp thụ và luôn thưởng $0$. Tại $s$, $A$ thưởng $1$ và ở lại $s$ với xác suất $1/2$; $B$ thưởng $0.6$ và luôn ở lại $s$. Các xác suất còn lại tới $z$; đặt $\gamma=0.9$.

**Luôn chọn $A$.** Do $V(z)=0$, (13.9) cho $V^A(s)=1+0.45V^A(s)$, nên $V^A(s)=1/0.55=20/11\approx1.8182$.

**Luôn chọn $B$.** Ta có $V^B(s)=0.6+0.9V^B(s)$, nên $V^B(s)=6$.

**Trộn đều hai hành động.** Chính sách chọn mỗi hành động với xác suất $1/2$ có thưởng kỳ vọng $0.8$ và xác suất ở lại $s$ bằng $0.75$. Vì vậy $V^{\mathrm{mix}}(s)=0.8+0.675V^{\mathrm{mix}}(s)$, cho $V^{\mathrm{mix}}(s)=32/13\approx2.4615$.

**Kiểm tra và giới hạn.** Thế lại từng số vào phương trình tương ứng đều cho đẳng thức. Chính sách luôn chọn thưởng tức thời lớn nhất là $A$, nhưng giá trị của nó thấp hơn $B$. Việc so sánh ba chính sách này chưa tự chứng minh $B$ tốt hơn mọi chính sách có thể phụ thuộc lịch sử; điều đó cần định lý tối ưu ở Mục 13.3.
:::

::: exercise Bài tập 13.2 (Củng cố: chính sách và tổng thưởng)
Một MDP có trạng thái $s,z$, $z$ hấp thụ với thưởng $0$, hệ số $\gamma=1/2$. Tại $s$, hành động $A$ thưởng $2$ rồi chắc chắn đến $z$; hành động $B$ thưởng $1$ rồi chắc chắn trở lại $s$. Tính giá trị của hai chính sách tất định dừng. Nếu chọn $A,B$ mỗi hành động với xác suất $1/2$ tại $s$, viết ma trận chuyển, thưởng kỳ vọng và giá trị của chính sách này.
:::

::: hint Gợi ý Bài tập 13.2
Dùng $V(z)=0$, rồi viết một phương trình một biến cho $V(s)$ theo Định lý 13.8.
:::

::: solution Lời giải Bài tập 13.2
Chính sách luôn chọn $A$ cho $V^A(s)=2$. Chính sách luôn chọn $B$ cho $V^B(s)=1+\frac12V^B(s)$, nên $V^B(s)=2$.

Với chính sách trộn đều, theo thứ tự $s,z$,

$$
P^\pi=\begin{pmatrix}1/2&1/2\\0&1\end{pmatrix},
\qquad r^\pi=\begin{pmatrix}3/2\\0\end{pmatrix}.
$$

Ta có $V^\pi(s)=3/2+\frac14V^\pi(s)$, suy ra $V^\pi(s)=2$. Ba chính sách khác nhau có cùng giá trị trong ví dụ này; điều đó không làm mất tính duy nhất của nghiệm đánh giá dưới mỗi chính sách. Việc đánh giá một chính sách và việc xác định tính duy nhất của chính sách là hai vấn đề khác nhau.
:::

Định nghĩa 13.4 bổ sung hành động và cơ chế phần thưởng vào mô hình Markov; Định nghĩa 13.5 cho cách biến một chính sách dừng thành xích thuần nhất. Định nghĩa 13.6 và Mệnh đề 13.7 làm tiêu chuẩn dài hạn xác định được, còn Định lý 13.8 biến đánh giá chính sách thành một hệ tuyến tính. Vấn đề còn lại là lựa chọn hành động để tối ưu thay vì chỉ đánh giá một lựa chọn có sẵn.

## 13.3. Bellman tối ưu và lặp giá trị

Định lý 13.8 đánh giá một chính sách đã cố định. Nếu liệt kê mọi chính sách rồi giải từng hệ, số phương án có thể tăng nhanh theo số trạng thái; cho phép phụ thuộc lịch sử còn tạo một phạm vi lựa chọn lớn hơn. Chúng ta cần một phương trình chọn hành động theo giá trị tương lai mà vẫn chứng minh được lựa chọn đó là tối ưu cho toàn chuỗi.

Một cách trực quan, phần thưởng của một bước được cộng với kỳ vọng giá trị ở trạng thái kế tiếp, rồi ta chọn hành động tốt nhất trong các tổng đó. Đây là trực giác của bước Bellman, kế thừa Định lý 07.49 nhưng thay một trạng thái kế tiếp tất định bằng tổng có trọng số xác suất. Trực giác này chưa đủ để nhận một nghiệm điểm bất động là giá trị tối ưu; phần chứng minh phải xác lập cả sự tồn tại lẫn ý nghĩa quyết định của nghiệm.

![Robot có trạng thái hoạt động s và trạng thái hấp thụ z; hành động A thưởng 1 và chỉ có xác suất 0.5 tiếp tục, hành động B thưởng 0.6 và luôn tiếp tục; z luôn thưởng 0.](img/lec-13/robot-mdp.svg)

*Hình 13.1. Mô hình dùng trong các Ví dụ 13.3–13.5. Với $\gamma=0.9$, hành động có thưởng tức thời cao hơn chưa chắc cho tổng thưởng kỳ vọng lớn hơn, vì xác suất còn hoạt động để nhận thưởng tiếp theo khác nhau.*

### Toán tử một bước và phép lấy cực đại

::: definition Định nghĩa 13.9 (Toán tử Bellman)
Với MDP hữu hạn trong Định nghĩa 13.4 và một hàm $V:\mathcal S\to\mathbb R$, đặt

$$
Q_V(s,a)=r(s,a)+\gamma\sum_{s'}P(s'\mid s,a)V(s').
\tag{13.10}
$$

**Toán tử Bellman tối ưu** $T$ và **toán tử Bellman theo chính sách dừng** $T^\pi$ được định nghĩa bởi

$$
(TV)(s)=\max_{a\in\mathcal A(s)}Q_V(s,a),
\qquad
(T^\pi V)(s)=\sum_{a\in\mathcal A(s)}\pi(a\mid s)Q_V(s,a).
\tag{13.11}
$$

Cả hai là ánh xạ từ $\mathbb R^{|\mathcal S|}$ vào chính nó. Chuẩn dùng trong phân tích là $\|V\|_\infty=\max_s|V(s)|$.
:::

Định nghĩa 13.9 tổng quát hóa vế phải của (13.9): toán tử theo chính sách lấy trung bình hành động, còn toán tử tối ưu lấy cực đại. Đại lượng $Q_V$ là giá trị nhìn trước một bước khi dùng $V$ cho phần đuôi; nó chưa phải giá trị hành động tối ưu nếu $V$ chưa được xác định là $V^*$. Tập hành động hữu hạn bảo đảm cực đại trong (13.11) được đạt tại mỗi trạng thái.

Để kiểm soát toán tử $T$, ta cần biết phép lấy cực đại có thể khuếch đại sai số bao nhiêu. Bổ đề sau là một bất đẳng thức hữu hạn được dùng trong chứng minh tính co; phương pháp đối chiếu với Murphy (2023), tập II, §34.6.1.

::: lemma Bổ đề 13.10 (Sai khác của hai cực đại)
**Giả thiết.** $(u_a)$ và $(v_a)$ là hai họ số thực trên cùng tập hữu hạn khác rỗng $\mathcal A$.

**Kết luận.**

$$
\left|\max_a u_a-\max_a v_a\right|
\le\max_a|u_a-v_a|.
\tag{13.12}
$$

**Điều kiện áp dụng.** Hai cực đại được lấy trên cùng một tập chỉ số.

**Phạm vi.** Bất đẳng thức so sánh các giá trị cực đại; hai chỉ số đạt cực đại có thể khác nhau.
:::

::: proof Chứng minh Bổ đề 13.10
Đặt $d=\max_a|u_a-v_a|$. Với mọi $a$, $u_a\le v_a+d\le\max_bv_b+d$, nên $\max_au_a\le\max_av_a+d$. Đổi vai $u,v$ cho bất đẳng thức chiều ngược lại, rồi ghép hai chiều để được (13.12). $\square$
:::

### Tính co, điểm bất động và hội tụ

Một toán tử là ánh xạ co nếu nó làm khoảng cách giữa hai đầu vào giảm bởi một hệ số nhỏ hơn $1$. Với (13.11), phép lấy kỳ vọng không tăng chuẩn cực đại và chiết khấu cung cấp hệ số $\gamma$. Bổ đề 13.10 cho phép giữ chặn đó sau khi chọn hành động cực đại.

Định lý tiếp theo phát triển lặp Bellman của Bài 07 sang không gian vector giá trị hữu hạn với chiết khấu. Cơ sở là Murphy (2023), tập II, §34.6.1; đối chiếu bổ trợ với Sutton và Barto (2018), §4.4. Chứng minh điểm bất động được trình bày bằng dãy Cauchy, là trường hợp hữu hạn chiều của định lý ánh xạ co Banach.

::: theorem Định lý 13.11 (Tính co và hội tụ của lặp giá trị)
**Giả thiết.** MDP hữu hạn có phần thưởng bị chặn và $0\le\gamma<1$, toán tử $T$ được cho bởi (13.11).

**Kết luận.** Với mọi $V,W$,

$$
\|TV-TW\|_\infty\le\gamma\|V-W\|_\infty.
\tag{13.13}
$$

Toán tử có một điểm bất động duy nhất $\bar V=T\bar V$. Với mọi $V_0\in\mathbb R^{|\mathcal S|}$, dãy **lặp giá trị** $V_{k+1}=TV_k$ hội tụ tới $\bar V$ và

$$
\|V_k-\bar V\|_\infty\le\gamma^k\|V_0-\bar V\|_\infty,
\qquad k\ge1.
\tag{13.14}
$$

**Điều kiện áp dụng.** Mỗi hàng xác suất chuyển chuẩn hóa bằng $1$; các phép lấy kỳ vọng và cực đại được tính chính xác theo mô hình cố định.

**Phạm vi.** Định lý xác lập một điểm bất động và thuật toán tìm nó. Việc chứng minh $\bar V$ là giá trị tối ưu được thực hiện riêng trong Định lý 13.12.
:::

::: proof Chứng minh Định lý 13.11
**Bước 1 (chặn một hành động).** Với mỗi $s,a$, phần thưởng triệt tiêu khi lấy hiệu, và

$$
\begin{aligned}
|Q_V(s,a)-Q_W(s,a)|
&=\gamma\left|\sum_{s'}P(s'\mid s,a)(V(s')-W(s'))\right|\\
&\le\gamma\sum_{s'}P(s'\mid s,a)|V(s')-W(s')|\\
&\le\gamma\|V-W\|_\infty.
\end{aligned}
$$

Bước cuối dùng các xác suất không âm và có tổng bằng $1$.

**Bước 2 (chặn sau khi tối ưu hành động).** Áp dụng Bổ đề 13.10 cho hai họ $Q_V(s,a),Q_W(s,a)$, rồi lấy cực đại theo $s$, cho (13.13).

**Bước 3 (tồn tại khi $0<\gamma<1$).** Đặt $d_0=\|V_1-V_0\|_\infty$. Lặp (13.13) cho $\|V_{j+1}-V_j\|_\infty\le\gamma^jd_0$. Với $m>k$,

$$
\|V_m-V_k\|_\infty
\le\sum_{j=k}^{m-1}\|V_{j+1}-V_j\|_\infty
\le\frac{\gamma^k}{1-\gamma}d_0.
$$

Vế phải tiến về $0$, nên dãy là Cauchy. Không gian hữu hạn chiều với chuẩn cực đại là đầy đủ, do đó dãy có giới hạn $\bar V$. Tính co kéo theo tính liên tục của $T$, nên lấy giới hạn trong $V_{k+1}=TV_k$ cho $\bar V=T\bar V$.

**Bước 4 (tính duy nhất và tốc độ).** Nếu $U$ cũng là điểm bất động, (13.13) cho $\|U-\bar V\|_\infty\le\gamma\|U-\bar V\|_\infty$, nên $U=\bar V$. Lặp (13.13) với $W=\bar V$ cho (13.14).

**Bước 5 (trường hợp $\gamma=0$).** Khi đó $(TV)(s)=\max_ar(s,a)$ không phụ thuộc $V$. Sau đúng một bước ta có điểm bất động; nó duy nhất và (13.14) đúng với mọi $k\ge1$. $\square$
:::

Trong học máy, Định lý 13.11 giải thích hội tụ của một phép quy hoạch khi bảng mô hình được biết và các bước Bellman được tính chính xác. Sai số khởi tạo giảm theo $\gamma^k$; khi $\gamma$ gần $1$, sự giảm này chậm hơn. Định lý chưa phân tích sai số do lấy mẫu hoặc xấp xỉ hàm, vì các bước đó chưa xuất hiện trong toán tử đang xét.

### Vì sao điểm bất động là giá trị tối ưu

Một phương trình có nghiệm duy nhất vẫn cần được nối với bài toán quyết định gốc. Chúng ta chứng minh hai chiều: có một chính sách đạt $\bar V$, và không chính sách nào, kể cả phụ thuộc toàn lịch sử, có giá trị cao hơn. Chính tính Markov có điều khiển cho phép thực hiện bước so sánh này ở mọi lịch sử.

Nguồn chính của kết quả là Murphy (2023), tập II, §34.5.5 và §34.6.1; chứng minh dưới đây dùng Định lý 13.8, 13.11 và chặn phần đuôi của Mệnh đề 13.7.

::: theorem Định lý 13.12 (Bellman tối ưu và chính sách đạt tối ưu)
**Giả thiết.** MDP thỏa Định nghĩa 13.4, và $\bar V$ là điểm bất động trong Định lý 13.11. Với mỗi trạng thái, chọn một hành động

$$
\pi^*(s)\in\underset{a\in\mathcal A(s)}{\operatorname{argmax}}
\left[r(s,a)+\gamma\sum_{s'}P(s'\mid s,a)\bar V(s')\right].
\tag{13.15}
$$

**Kết luận.** Chính sách tất định Markov dừng $\pi^*$ đạt $V^{\pi^*}=\bar V=V^*$. Do đó giá trị tối ưu là nghiệm duy nhất của phương trình Bellman

$$
V^*(s)=\max_{a\in\mathcal A(s)}
\left[r(s,a)+\gamma\sum_{s'}P(s'\mid s,a)V^*(s')\right].
\tag{13.16}
$$

**Điều kiện áp dụng.** Cực đại được đạt vì tập hành động hữu hạn; giả thiết Markov có điều khiển áp dụng cho cả trạng thái kế tiếp và phần thưởng.

**Phạm vi.** Tối ưu trong (13.7) xét cả chính sách ngẫu nhiên phụ thuộc lịch sử, nhưng tồn tại một chính sách tất định dừng đạt cùng giá trị. Giá trị tối ưu duy nhất không bắt buộc chính sách tối ưu duy nhất.
:::

::: proof Chứng minh Định lý 13.12
**Bước 1 (có một chính sách đạt điểm bất động).** Chọn $\pi^*$ theo (13.15). Ta có $T^{\pi^*}\bar V=T\bar V=\bar V$. Theo Định lý 13.8, phương trình đánh giá chính sách $V=T^{\pi^*}V$ có nghiệm duy nhất là $V^{\pi^*}$. Vì thế $V^{\pi^*}=\bar V$.

**Bước 2 (so sánh tại một lịch sử bất kỳ).** Cho một chính sách tổng quát $\rho$. Với $H_t$ có trạng thái cuối bằng $s$, tính Markov có điều khiển cho

$$
\begin{aligned}
\mathbb E_\rho[R_{t+1}+\gamma\bar V(S_{t+1})\mid H_t]
&=\sum_a\rho_t(a\mid H_t)
\left[r(s,a)+\gamma\sum_{s'}P(s'\mid s,a)\bar V(s')\right]\\
&\le(T\bar V)(s)=\bar V(s).
\end{aligned}
$$

Bất đẳng thức đúng vì một trung bình theo hành động không vượt giá trị cực đại.

**Bước 3 (cộng các bước và triệt tiêu phần giữa).** Bắt đầu từ $S_0=s$, nhân bất đẳng thức ở bước $t$ với $\gamma^t$, lấy kỳ vọng và cộng từ $t=0$ đến $N-1$. Các kỳ vọng của $\bar V(S_t)$ ở những thời điểm giữa triệt tiêu, cho

$$
\mathbb E_\rho\left[\sum_{t=0}^{N-1}\gamma^tR_{t+1}
+\gamma^N\bar V(S_N)\,\middle|\,S_0=s\right]
\le\bar V(s).
$$

**Bước 4 (cho số bước tăng).** Vì $\bar V$ là vector hữu hạn, $|\gamma^N\bar V(S_N)|\le\gamma^N\|\bar V\|_\infty\to0$. Chặn phần đuôi trong Mệnh đề 13.7 cho kỳ vọng tổng thưởng hữu hạn bước tiến tới $V^\rho(s)$. Do đó $V^\rho(s)\le\bar V(s)$ với mọi $\rho$. Kết hợp Bước 1, cận trên này được đạt bởi $\pi^*$, nên $V^*=\bar V$. Thay vào phương trình điểm bất động cho (13.16). $\square$
:::

Trong học máy, Định lý 13.12 biến một chứng nhận đại số thành một quy tắc điều khiển có bảo đảm. Chọn hành động cực đại theo $V^*$ không phải chọn thưởng tức thời lớn nhất, vì vế phải còn chứa giá trị ở các trạng thái kế tiếp. Chứng minh cũng cho biết vì sao không cần tìm trong toàn bộ các quy tắc phụ thuộc lịch sử khi đúng giả thiết MDP hữu hạn chiết khấu.

::: example Ví dụ 13.5 (Lặp giá trị và đổi hành động; điều chỉnh từ nguồn khởi đầu)
**Mô hình đầy đủ.** Hai trạng thái là $s$ đang hoạt động và $z$ hấp thụ. Tại $z$, thưởng $0$ và ở lại $z$. Tại $s$, $A$ thưởng $1$ rồi ở lại $s$ với xác suất $0.5$, đến $z$ với xác suất $0.5$; $B$ thưởng $0.6$ rồi chắc chắn ở lại $s$. Đặt $\gamma=0.9$, $V_0(s)=V_0(z)=0$.

**Rút về một biến.** Mọi vòng lặp giữ $V_k(z)=0$. Đặt $v_k=V_k(s)$; bước Bellman là

$$
v_{k+1}=\max\{1+0.45v_k,\ 0.6+0.9v_k\}.
\tag{13.17}
$$

**Tính từng bước.**

| $k$ | $v_k$ | $Q_{V_k}(s,A)$ | $Q_{V_k}(s,B)$ | Hành động đạt cực đại | $v_{k+1}$ |
|---:|---:|---:|---:|---|---:|
| 0 | 0 | 1 | 0.6 | $A$ | 1 |
| 1 | 1 | 1.45 | 1.50 | $B$ | 1.50 |
| 2 | 1.50 | 1.675 | 1.950 | $B$ | 1.950 |
| 3 | 1.95 | 1.8775 | 2.355 | $B$ | 2.355 |

**Giải và kiểm tra điểm bất động.** Ứng viên từ hành động $B$ thỏa $v=0.6+0.9v$, cho $v=6$. Tại $v=6$, nhánh $A$ bằng $1+0.45\cdot6=3.7<6$, nên $6$ thỏa đúng phương trình có cực đại. Định lý 13.11 bảo đảm đây là điểm bất động duy nhất; Định lý 13.12 cho $V^*(s)=6$ và chính sách tối ưu chọn $B$ tại $s$.

**Diễn giải.** Nhánh $B$ thắng khi $0.6+0.9v\ge1+0.45v$, tương đương $v\ge8/9$. Vòng đầu chỉ thấy thưởng trước mắt nên chọn $A$; sau khi có giá trị phần đuôi đủ lớn, lựa chọn đổi thành $B$. Chỉ số $k$ là vòng tính toán, không phải thời điểm robot thực hiện hành động; bảng không mô tả một quỹ đạo bắt đầu bằng $A$ rồi chuyển sang $B$. Với bài toán chỉ còn hai bước, lựa chọn tối ưu là $B$ ở bước đầu và $A$ ở bước cuối nếu robot còn hoạt động. Quy tắc luôn chọn thưởng tức thời lớn nhất là $A$, có giá trị $20/11$ theo Ví dụ 13.4, thấp hơn giá trị tối ưu $6$.
:::

![Hai nhánh Bellman 1 cộng 0.45v và 0.6 cộng 0.9v tạo ánh xạ cực đại có điểm bất động 6; dãy lặp từ 0 tăng qua 1, 1.5, 1.95 và tiến tới 6.](img/lec-13/value-iteration.svg)

*Hình 13.2. Nhánh có độ dốc lớn hơn giữ giá trị tương lai tốt hơn. Hai nhánh đổi thứ tự tại $v=8/9$; giao của ánh xạ cực đại với đường $v_{k+1}=v_k$ là giá trị tối ưu $6$. Đồ thị dãy lặp minh họa hội tụ của Ví dụ 13.5.*

### Mở rộng: sai số tính toán và điều kiện dừng

Chặn (13.14) chứa $\bar V=V^*$ chưa biết, nên chưa luôn dùng trực tiếp để dừng thuật toán. Tuy nhiên, chênh lệch giữa $TV$ và $V$ tính được khi mô hình đã biết. Nó đo mức vi phạm phương trình Bellman của vector đang xét.

Hệ quả sau được suy trực tiếp từ tính co của Định lý 13.11; nguồn nền là Murphy (2023), tập II, §34.6.1. Đây là một chứng minh bổ sung để xác định rõ chỉ số của vector được chứng nhận.

::: corollary Hệ quả 13.13 (Chặn bằng phần dư Bellman)
**Giả thiết.** MDP thỏa Định lý 13.11. Với một vector $V$, đặt $\beta(V)=\|TV-V\|_\infty$.

**Kết luận.**

$$
\|V-V^*\|_\infty\le\frac{\beta(V)}{1-\gamma},
\qquad
\|TV-V^*\|_\infty\le\frac{\gamma\beta(V)}{1-\gamma}.
\tag{13.18}
$$

**Điều kiện áp dụng.** Phần dư được tính bằng toán tử chính xác của cùng mô hình. Điều kiện $\beta(V)\le(1-\gamma)\varepsilon$ đủ để chứng nhận $V$ có sai số không quá $\varepsilon$.

**Phạm vi.** Đây là chặn sai số giá trị, chưa phải chặn riêng cho mất mát giá trị của một chính sách lấy cực đại từ một vector gần đúng.
:::

::: proof Chứng minh Hệ quả 13.13
Bất đẳng thức tam giác và tính co cho

$$
\|V-V^*\|_\infty
\le\|V-TV\|_\infty+\|TV-TV^*\|_\infty
\le\beta(V)+\gamma\|V-V^*\|_\infty.
$$

Chuyển vế và chia cho $1-\gamma>0$ cho chặn thứ nhất. Áp dụng tính co thêm một lần cho $TV$ cho chặn thứ hai. $\square$
:::

::: algorithm Thuật toán 13.1 (Lặp giá trị với chứng nhận sai số)
**Đầu vào.** Một MDP hữu hạn đã biết $P,r$, $0\le\gamma<1$, vector $V_0$ và sai số mong muốn $\varepsilon>0$.

**Đầu ra.** Một vector $V_k$ có $\|V_k-V^*\|_\infty\le\varepsilon$ theo mô hình đang xét.

1. Tính đồng thời $W=TV_k$ từ toàn bộ vector cũ $V_k$.
2. Tính $\beta_k=\|W-V_k\|_\infty$.
3. Nếu $\beta_k\le(1-\gamma)\varepsilon$, trả về $V_k$; nếu chưa đạt, đặt $V_{k+1}=W$ và lặp.

**Điều kiện dừng.** Với tính toán chính xác, Định lý 13.11 cho $\beta_k\to0$, nên tiêu chuẩn đạt sau hữu hạn vòng. Khi $\gamma=0$, nhiều nhất một lần thay vector đưa đến nghiệm chính xác.

**Chi phí mỗi vòng.** Với bảng chuyển dày, phép tính trực tiếp cần bậc $|\mathcal S|^2\max_s|\mathcal A(s)|$ phép toán; với bảng thưa có thể cộng chỉ trên các trạng thái kế tiếp có xác suất khác $0$.
:::

Trong học máy, Hệ quả 13.13 tách mức chính xác của phép quy hoạch khỏi mức đúng của mô hình. Một phần dư nhỏ chứng nhận việc gần giải đúng phương trình của $P,r$ đang dùng. Nó không chứng nhận rằng những bảng này mô tả chính xác robot ngoài thực tế.

::: example Ví dụ 13.6 (Kiểm tra chỉ số trong chặn sai số)
**Mô hình và vector đang xét.** Hai trạng thái là $s,z$; $z$ hấp thụ với thưởng $0$. Tại $s$, $A$ thưởng $1$ và ở lại $s$ với xác suất $0.5$, $B$ thưởng $0.6$ và luôn ở lại $s$; đặt $\gamma=0.9$. Xét $V(s)=1.95$, $V(z)=0$, giá trị từ ba bước lặp của Ví dụ 13.5.

**Tính phần dư.** $TV(s)=\max(1.8775,2.355)=2.355$, $TV(z)=0$, nên $\beta(V)=0.405$.

**Chứng nhận và kiểm tra.** Hệ quả 13.13 cho $\|V-V^*\|_\infty\le0.405/0.1=4.05$. Giá trị thật bằng $6$, nên sai số đúng bằng $6-1.95=4.05$. Với vector sau cập nhật, chặn là $0.9\cdot0.405/0.1=3.645$, cũng đúng bằng $6-2.355$.

**Diễn giải.** Cùng một chênh lệch hai vòng cho hai chặn khác nhau tùy chứng nhận vector trước hay vector sau cập nhật. Không được đổi chỉ số mà giữ nguyên hệ số $\gamma$ một cách tùy ý.
:::

### Khi bỏ giả thiết chiết khấu

::: remark Nhận xét 13.14 (Điểm bất động, chiết khấu và chân trời)
1. Nếu $\gamma=1$, lập luận chuẩn chỉ cho hệ số không vượt $1$, không cho ánh xạ co. Giá trị có thể vô hạn hoặc phương trình Bellman có nhiều nghiệm.
2. Một bài toán hữu hạn bước có thể không cần chiết khấu và vẫn giải bằng truy hồi theo thời gian như Bài 07. Đây là một thiết lập khác với bài toán vô hạn bước ở Định lý 13.11.
3. Trạng thái hấp thụ với thưởng $0$ không tự bảo đảm mọi chính sách đều kết thúc. Trong ví dụ robot, hành động $B$ giữ robot ở $s$ mãi; vì thế không thể thay $\gamma<1$ bằng lập luận “mô hình có trạng thái kết thúc”.
:::

::: example Ví dụ 13.7 (Hai phản ví dụ khi hệ số bằng một)
**Mô hình thứ nhất.** Một trạng thái $s$, một hành động, luôn quay lại $s$, nhận thưởng $1$ mỗi bước và đặt $\gamma=1$. Tổng thưởng bằng $+\infty$; phương trình Bellman $V(s)=1+V(s)$ không có nghiệm thực. Lặp từ $V_0(s)=0$ cho $V_k(s)=k$, không hội tụ tới giá trị hữu hạn.

**Mô hình thứ hai.** Giữ một trạng thái tự lặp và $\gamma=1$ nhưng thưởng luôn bằng $0$. Tổng thưởng đúng bằng $0$, trong khi toán tử là $TV=V$. Mọi số thực đều là điểm bất động; phương trình không còn xác định duy nhất giá trị từ tiêu chuẩn tổng thưởng.

**Kiểm tra.** Cả hai mô hình đều hữu hạn và có phần thưởng bị chặn. Giả thiết bị bỏ là chiết khấu nhỏ hơn $1$, nên chúng không mâu thuẫn Định lý 13.11–13.12.
:::

::: exercise Bài tập 13.3 (Củng cố: Bellman tối ưu)
Một MDP có hai trạng thái $s,z$, $z$ hấp thụ với thưởng $0$, hệ số $\gamma=1/2$. Tại $s$, $A$ thưởng $2$ rồi đến $z$ chắc chắn, $B$ thưởng $1$ rồi trở lại $s$ chắc chắn. Viết toán tử Bellman theo $v=V(s)$ khi $V(z)=0$, tìm điểm bất động và tất cả các hành động đạt cực đại ở đó. Nêu kết quả nào cho phép nhận điểm bất động là giá trị tối ưu đối với cả chính sách phụ thuộc lịch sử.
:::

::: hint Gợi ý Bài tập 13.3
Giải $v=\max(2,1+v/2)$ và kiểm tra cả hai nhánh tại ứng viên. Tách tính duy nhất của điểm bất động khỏi tính tối ưu.
:::

::: solution Lời giải Bài tập 13.3
Ta có $Tv=\max(2,1+v/2)$. Điểm $v=2$ thỏa cả hai nhánh đều bằng $2$, nên là điểm bất động. Toán tử co với hệ số $1/2$ theo Định lý 13.11, do đó không có điểm bất động khác. Định lý 13.12 cho $V^*(s)=2$ và cho phép chọn một trong hai hành động; chứng minh so sánh mọi chính sách phụ thuộc lịch sử bảo đảm không chính sách nào vượt giá trị này.
:::

::: exercise Bài tập 13.4 (Củng cố: chứng minh co và đọc phần dư)
Với một MDP hữu hạn có $\gamma=0.8$, phần thưởng bị chặn và ma trận chuyển chuẩn hóa, chứng minh $\|TV-TW\|_\infty\le0.8\|V-W\|_\infty$. Nếu một vector $V$ có phần dư Bellman chính xác $\|TV-V\|_\infty=0.02$, cho chặn sai số của $V$ và của $TV$ so với $V^*$.
:::

::: hint Gợi ý Bài tập 13.4
Chặn riêng từng hành động, rồi dùng Bổ đề 13.10. Chứng nhận hai vector bằng hai bất đẳng thức của Hệ quả 13.13.
:::

::: solution Lời giải Bài tập 13.4
Với mọi $s,a$, hiệu các giá trị một bước có trị tuyệt đối không quá $0.8\sum_{s'}P(s'\mid s,a)\|V-W\|_\infty=0.8\|V-W\|_\infty$. Bổ đề 13.10 giữ nguyên chặn khi lấy cực đại theo hành động; lấy cực đại theo trạng thái cho kết luận.

Sai số của $V$ không quá $0.02/(1-0.8)=0.1$. Sai số của $TV$ không quá $0.8\cdot0.02/(1-0.8)=0.08$. Đây là chặn theo mô hình, không phải một xác suất đúng của mô hình.
:::

Định nghĩa 13.9 xây toán tử từ thưởng và phân phối bước sau; Bổ đề 13.10 cùng chuẩn hóa xác suất cho tính co trong Định lý 13.11. Định lý 13.12 bổ sung ý nghĩa tối ưu bằng một chính sách đạt điểm bất động và phép so sánh với mọi chính sách tổng quát. Hệ quả 13.13 chuyển hội tụ thành chứng nhận tính được, còn Nhận xét 13.14 xác định vì sao các kết luận có thể hỏng khi bỏ chiết khấu. Tất cả các bước đó vẫn giả sử mô hình được biết; dữ liệu tương tác tạo thêm bài toán ước lượng và thu thập thông tin.

## 13.4. Biết mô hình và học từ trải nghiệm

Trong ví dụ robot, bảng xác suất của mỗi hành động đã được cho trước. Một hệ thống mới thường chỉ ghi được những lần thử: trạng thái hiện tại, hành động đã chọn, phần thưởng và trạng thái kế tiếp. Chúng ta cần phân biệt việc giải một mô hình đã xác định với việc học mô hình hoặc giá trị khi các đại lượng ấy chưa biết.

Một cách trực quan, quy hoạch tính kỳ vọng bằng một bảng xác suất, còn dữ liệu tương tác chỉ cung cấp những kết quả ngẫu nhiên của bảng chưa biết đó. Nhiều lần thử có thể giúp ước lượng, nhưng chính sách quyết định những cặp trạng thái–hành động nào được thử. Đây là trực giác về việc học từ trải nghiệm; nó chưa phải một bảo đảm rằng mọi hàng chuyển tiếp đều được học chính xác.

### Ước lượng một hàng chuyển tiếp từ số đếm

Giả sử có thể khởi tạo lại hệ thống tại cùng trạng thái $s$, thực hiện hành động $a$ và ghi trạng thái kế tiếp. Nếu những lần thử độc lập và môi trường không đổi, các trạng thái kế tiếp là một mẫu phân loại với cùng vector xác suất $P(\cdot\mid s,a)$. Định lý 11.7 vì vậy áp dụng trực tiếp, không cần xây dựng lại phép tối ưu Lagrange.

::: definition Định nghĩa 13.15 (Số đếm và mô hình chuyển tiếp ước lượng)
Với dữ liệu gồm các chuyển tiếp $(s_i,a_i,r_i,s'_i)$, đặt

$$
N(s,a,s')=\sum_i\mathbf1_{\{s_i=s,\ a_i=a,\ s'_i=s'\}},
\qquad
N(s,a)=\sum_{s'}N(s,a,s').
\tag{13.19}
$$

Một mô hình ước lượng gồm các hàng xác suất $\hat P(\cdot\mid s,a)$ và các phần thưởng kỳ vọng ước lượng $\hat r(s,a)$. Khi $N(s,a)>0$, trung bình phần thưởng quan sát tại cặp đó là

$$
\hat r(s,a)=\frac{1}{N(s,a)}\sum_{i:s_i=s,\ a_i=a}r_i.
\tag{13.20}
$$

Nếu $N(s,a)=0$, các công thức chia theo số lần quan sát chưa được xác định. Việc đặt một giá trị mặc định hoặc thêm tiên nghiệm phải được ghi thành một giả thiết bổ sung.
:::

Định nghĩa 13.15 biến dữ liệu thành các đại lượng của một MDP đã khớp. Khác với ma trận được cho chính xác trong Định nghĩa 13.4, các hàng này còn có sai số lấy mẫu. Một hàng chuẩn hóa hợp lệ chưa chứng minh nó gần hàng của môi trường thật.

Mệnh đề sau chuyên biệt hóa Định lý 11.7 cho một cặp cố định và một quy trình lấy mẫu được nêu rõ. Nguồn chính là Murphy (2023), tập II, §2.6.3 về ước lượng chuyển trạng thái và §35.1.4 về học tăng cường dựa trên mô hình.

::: proposition Mệnh đề 13.16 (MLE chuyển tiếp tại một cặp được thử độc lập)
**Giả thiết.** Một cặp $(s,a)$ được thử độc lập $n\ge1$ lần trong một môi trường không đổi. Các trạng thái kế tiếp có phân phối phân loại $P(\cdot\mid s,a)$ trên tập hữu hạn $\mathcal S$; không gian tham số là đơn hình đóng.

**Kết luận.** Hàng chuyển tiếp MLE duy nhất là

$$
\hat P(s'\mid s,a)=\frac{N(s,a,s')}{N(s,a)},
\qquad N(s,a)=n.
\tag{13.21}
$$

**Điều kiện áp dụng.** Những lần thử dùng cùng cặp trạng thái–hành động và được lấy độc lập theo mô hình đang xét. Trạng thái kế tiếp chưa xuất hiện nhận xác suất MLE bằng $0$.

**Phạm vi.** Với $n=0$, hợp lý không chứa thông tin về hàng đó: mọi hàng xác suất khả thi đều là MLE. Nếu $|\mathcal S|\ge2$, nghiệm không duy nhất; nếu chỉ có một trạng thái, chuẩn hóa đã xác định hàng duy nhất $(1)$. Trong cả hai trường hợp không dùng thương $0/0$.
:::

::: proof Chứng minh Mệnh đề 13.16
Với số đếm $n_{s'}=N(s,a,s')$, hợp lý của các lần thử độc lập là $\prod_{s'}P(s'\mid s,a)^{n_{s'}}$. Đây đúng là bài toán phân loại của Định lý 11.7 trên đơn hình đóng, nên nghiệm duy nhất bằng $n_{s'}/n$, kể cả khi một số số đếm bằng $0$. Nếu không có lần thử nào, tích rỗng bằng $1$ với mọi hàng xác suất; không thể phân biệt các hàng bằng dữ liệu đó. $\square$
:::

Trong học máy, (13.21) là một bước học mô hình môi trường. Sau bước này, lặp giá trị có thể chạy với $\hat P,\hat r$, nhưng kết luận của Định lý 13.11 lúc đó thuộc về MDP ước lượng. Muốn đánh giá chính sách trong môi trường thật, còn cần phân tích sai số mô hình và cách dữ liệu đã được thu thập.

::: example Ví dụ 13.8 (Từ số đếm đến mục tiêu Bellman)
**Dữ liệu và giả thiết.** Tại một cặp $(s,a)$, có $12$ lần thử độc lập: $9$ lần đến $s_1$ và $3$ lần đến $s_2$. Cho phần thưởng kỳ vọng đã biết $r(s,a)=2$, hệ số $\gamma=0.8$, và một vector tiếp diễn cố định với $V(s_1)=5$, $V(s_2)=1$.

**Ước lượng.** Mệnh đề 13.16 cho $\hat P(s_1\mid s,a)=3/4$, $\hat P(s_2\mid s,a)=1/4$.

**Tính mục tiêu.** Giá trị nhìn trước theo mô hình ước lượng là

$$
\hat Q_V(s,a)
=2+0.8\left(\frac34\cdot5+\frac14\cdot1\right)
=2+0.8\cdot4=5.2.
\tag{13.22}
$$

**Kiểm tra và giới hạn.** Hai xác suất không âm, tổng bằng $1$. Giá trị tiếp diễn trung bình là $4$, nằm giữa $1$ và $5$. Số $5.2$ là mục tiêu theo mô hình đã khớp; nó chưa phải giá trị tối ưu và chưa chứng minh xác suất thật đúng bằng $3/4,1/4$.
:::

### Dữ liệu quỹ đạo và vai trò của thăm dò

Các trạng thái trên một quỹ đạo nói chung không độc lập cùng phân phối; không thể mặc nhiên áp dụng giả thiết i.i.d. Mệnh đề 13.16 đã chọn các lần thử độc lập tại một cặp để giữ giả thiết ước lượng minh bạch. Với dữ liệu từ tương tác liên tục, phải dùng quy luật có điều kiện của quỹ đạo thay vì coi toàn bộ các bộ chuyển tiếp là một mẫu i.i.d.

Chẳng hạn, nếu chính sách thu thập dữ liệu chỉ dùng lịch sử trạng thái–hành động, với xác suất $\rho_t(a_t\mid h_t)$ đã xác định, và không xét phần thưởng trong phép lập hợp lý này, xác suất của một quỹ đạo trạng thái–hành động có dạng

$$
\mathbb P_\theta(s_0,a_0,\ldots,a_{T-1},s_T)
=\mu_0(s_0)\prod_{t=0}^{T-1}
\rho_t(a_t\mid h_t)P_\theta(s_{t+1}\mid s_t,a_t).
\tag{13.23}
$$

Ở đây $h_t=(s_0,a_0,\ldots,a_{t-1},s_t)$. Nếu $\mu_0$ và quy tắc thu thập không phụ thuộc tham số tự do $\theta$, các nhân tử chính sách không ảnh hưởng nghiệm cực đại theo $\theta$ khi giữ dữ liệu đã thấy cố định. Các nhân tử chuyển tiếp còn lại có thể được nhóm theo số đếm. Điều này giải thích sự xuất hiện của cùng công thức tần suất trong nhiều bài toán học mô hình từ quỹ đạo, nhưng không biến các trạng thái thành độc lập.

Công thức (13.23) là xác suất **chung** của trạng thái và hành động. Không được thay nó bằng một đẳng thức có điều kiện theo toàn bộ chuỗi hành động mà bỏ mẫu số: các hành động tương lai có thể tiết lộ thông tin về các trạng thái trước đó khi chính sách dùng dữ liệu để lựa chọn.

Một chính sách luôn chọn cùng một hành động có thể không cung cấp dữ liệu về những hành động khác. Vì vậy cần **thăm dò** (exploration): lựa chọn hành động để thu thập thông tin, cùng với **khai thác** (exploitation): dùng thông tin hiện có để nhận phần thưởng. Sự đánh đổi này thuộc Murphy (2023), §35.1.5. Không thể kết luận một hàng chưa được thăm là xấu chỉ vì nó chưa có phần thưởng quan sát được.

### Học dựa trên mô hình và học trực tiếp giá trị

::: definition Định nghĩa 13.17 (Hai cách sử dụng trải nghiệm)
Trong **học tăng cường dựa trên mô hình** (model-based reinforcement learning), hệ thống học hoặc duy trì $\hat P,\hat r$, rồi dùng một phép quy hoạch để lựa chọn hành động theo mô hình đó.

Trong **học tăng cường không xây dựng mô hình chuyển tiếp tường minh** (model-free reinforcement learning), hệ thống có thể học trực tiếp giá trị hoặc chính sách từ các chuyển tiếp quan sát, thay vì ước lượng toàn bộ bảng $P$ trước khi quy hoạch. “Không xây dựng mô hình tường minh” không có nghĩa thuật toán không có giả thiết về môi trường hoặc dữ liệu.

Một **mục tiêu Bellman từ mẫu** là một giá trị tính từ phần thưởng và trạng thái kế tiếp thực sự quan sát. Với một bảng $Q_t$ cho cặp trạng thái–hành động, mục tiêu dùng trong Q-learning là

$$
Y_t=R_{t+1}+\gamma\max_{a'\in\mathcal A(S_{t+1})}Q_t(S_{t+1},a').
\tag{13.24}
$$
:::

Định nghĩa 13.17 tách đối tượng được học khỏi đối tượng cần tối ưu. Một phương pháp dựa trên mô hình vẫn phải học từ dữ liệu; một phương pháp học trực tiếp giá trị vẫn phải đối mặt với sai số lấy mẫu, thăm dò và lựa chọn cách biểu diễn trạng thái. Nguồn chính là Murphy (2023), §35.1.1, §35.1.4 và §35.2.2–35.2.5.

Với bước học $0<\alpha_t\le1$, phép cập nhật minh họa Q-learning là

$$
Q_{t+1}(S_t,A_t)
=Q_t(S_t,A_t)+\alpha_t\bigl[Y_t-Q_t(S_t,A_t)\bigr],
\tag{13.25}
$$

các phần tử khác giữ nguyên. Nếu $Q_t$ đã được xác định bởi lịch sử trước lần chuyển tiếp và môi trường thỏa giả thiết Markov, kỳ vọng của mục tiêu khi biết lịch sử và hành động dùng đúng mô hình chuyển tại cặp hiện tại. Tuy vậy một lần cập nhật chỉ dùng một kết quả ngẫu nhiên và thường chỉ đổi một phần tử, khác với phép tính đồng thời mọi kỳ vọng của lặp giá trị chính xác.

::: example Ví dụ 13.9 (Một mục tiêu từ mẫu khác kỳ vọng)
**Dữ kiện.** Tại cặp $(s,a)$, thưởng quan sát luôn bằng $2$, xác suất thật đi tới $s_1,s_2$ lần lượt $3/4,1/4$, và $\gamma=0.8$. Bảng hiện tại có $\max_{a'}Q_t(s_1,a')=5$, $\max_{a'}Q_t(s_2,a')=1$, $Q_t(s,a)=2$. Dùng $\alpha_t=1/4$.

**Hai kết quả có thể xảy ra.** Nếu quan sát $s_1$, mục tiêu bằng $2+0.8\cdot5=6$, nên phần tử được cập nhật thành $2+\frac14(6-2)=3$. Nếu quan sát $s_2$, mục tiêu bằng $2+0.8\cdot1=2.8$, nên phần tử mới bằng $2+\frac14(2.8-2)=2.2$.

**Kiểm tra bằng kỳ vọng.** Kỳ vọng mục tiêu là $\frac34\cdot6+\frac14\cdot2.8=5.2$. Kỳ vọng phần tử mới là $\frac34\cdot3+\frac14\cdot2.2=2.8$, cũng bằng $2+\frac14(5.2-2)$.

**Diễn giải.** Kỳ vọng liên hệ với một phép Bellman theo bảng hiện tại, nhưng kết quả một lần cập nhật vẫn ngẫu nhiên. Phép tính này không chứng minh chuỗi các bảng Q hội tụ.
:::

::: remark Nhận xét 13.18 (Phạm vi bảo đảm của quy hoạch và của học)
1. Định lý 13.11–13.12 chứng minh hội tụ và tối ưu cho phép lặp chính xác trên một MDP hữu hạn, cố định. Khi dùng $\hat P,\hat r$, chúng chứng minh kết quả cho MDP ước lượng.
2. Một hàng không có dữ liệu không được số đếm phân biệt với các hàng khả thi khác; chỉ những ràng buộc mô hình đã biết có thể xác định nó mà không cần quan sát. Chính sách thu thập dữ liệu cần bao phủ các cặp quan trọng cho quyết định, chứ không chỉ tối ưu trên những cặp đã thấy.
3. Phân tích hội tụ của Q-learning cần các giả thiết riêng về bước học, việc thăm các cặp và nhiễu cập nhật. Xấp xỉ hàm hoặc mạng sâu tạo thêm các vấn đề ổn định; tính co của phép Bellman chính xác không tự giải quyết chúng.
4. Trạng thái sai hoặc môi trường thay đổi làm vi phạm mô hình đang dùng. Giảm phần dư số học không sửa được những sai lệch mô hình ấy.
:::

::: exercise Bài tập 13.5 (Củng cố: số đếm và mục tiêu từ mẫu)
Một cặp $(s,a)$ được thử độc lập $8$ lần, tới $u$ trong $6$ lần và tới $v$ trong $2$ lần. Cho $r(s,a)=1$, $\gamma=1/2$, $V(u)=4$, $V(v)=0$. Tính hàng chuyển MLE và mục tiêu theo mô hình ước lượng. Nếu một lần thử mới cho thưởng đúng bằng $1$ và trạng thái kế tiếp là $v$, tính mục tiêu từ lần thử đó. Nêu sự khác nhau giữa hai đại lượng.
:::

::: hint Gợi ý Bài tập 13.5
Chuẩn hóa số đếm theo $8$. Kỳ vọng theo mô hình dùng cả hai trạng thái; mục tiêu từ một mẫu chỉ dùng trạng thái vừa được quan sát.
:::

::: solution Lời giải Bài tập 13.5
Hàng MLE là $(3/4,1/4)$. Mục tiêu theo mô hình bằng $1+\frac12(\frac34\cdot4+\frac14\cdot0)=2.5$. Nếu quan sát thưởng $1$ và trạng thái $v$, mục tiêu từ mẫu là $1+\frac12\cdot0=1$. Hai số khác nhau vì một số là kỳ vọng theo hàng đã khớp, còn một số dùng một kết quả chuyển tiếp cụ thể.
:::

::: exercise Bài tập 13.6 (Củng cố: kiểm tra một lời khẳng định hội tụ)
Một hệ thống có hai trạng thái $s,z$, $z$ hấp thụ với thưởng $0$, và hai hành động tại $s$. Môi trường có hệ số $\gamma=0.9$. Nhật ký chỉ chứa các lần dùng hành động $A$; hành động $B$ chưa được thử. Nhóm xây dựng hệ thống tự đặt hàng chuyển của $B$, chạy lặp giá trị đến phần dư bằng $10^{-6}$, rồi kết luận chính sách là tối ưu trong môi trường thật. Xác định điều được chứng nhận bởi phần dư và ít nhất hai điều chưa được chứng nhận.
:::

::: hint Gợi ý Bài tập 13.6
Áp dụng Hệ quả 13.13 cho đúng toán tử được tính. Kiểm tra nguồn gốc của hàng chuyển chưa được quan sát và giả thiết trạng thái đủ thông tin.
:::

::: solution Lời giải Bài tập 13.6
Với toán tử của mô hình đã đặt, chặn sai số giá trị so với điểm bất động của chính mô hình đó là $10^{-6}/(1-0.9)=10^{-5}$. Phần dư không chứng nhận hàng chuyển của $B$ đúng với môi trường thật vì không có dữ liệu cho hàng đó. Nó cũng không chứng nhận các hàng khác được ước lượng đủ chính xác, trạng thái đang dùng thỏa Markov hoặc chính sách tốt trong môi trường thật. Chứng minh co vẫn có thể đúng cho bảng giả định trong khi quyết định dựa trên bảng đó sai.
:::

Định nghĩa 13.15 và Mệnh đề 13.16 nối ước lượng phân loại với từng hàng chuyển tiếp khi quy trình lấy mẫu phù hợp. Định nghĩa 13.17 phân biệt việc học mô hình với học trực tiếp giá trị; Ví dụ 13.9 tách một mục tiêu ngẫu nhiên khỏi kỳ vọng của nó. Nhận xét 13.18 giữ phạm vi của các bảo đảm: giải một phương trình chính xác theo mô hình đang có và học được một mô hình hoặc chính sách tốt từ tương tác là hai yêu cầu cần được kiểm tra riêng.

## 13.5. Tình huống áp dụng và giới hạn của mô hình

### Quy hoạch chính xác trên một mô hình ước lượng sai

::: application Tình huống 13.1 (Robot và mười lần thử thuận lợi)
**Môi trường thật.** Có hai trạng thái $s,z$, với $z$ hấp thụ và luôn thưởng $0$. Tại $s$, $A$ thưởng $1$ rồi ở lại $s$ với xác suất $1/2$, còn $B$ thưởng $0.6$ và chắc chắn ở lại $s$; đặt $\gamma=0.9$. Mô hình của $B$ được biết từ thiết kế, còn xác suất của $A$ cần được ước lượng.

**Dữ liệu.** Một bộ mô phỏng cho phép khởi tạo lại tại $s$. Thực hiện $A$ trong $10$ lần thử độc lập và tình cờ cả $10$ lần đều trở lại $s$. Mệnh đề 13.16 cho $\hat P(s\mid s,A)=1$, $\hat P(z\mid s,A)=0$. Dưới môi trường thật, biến cố dữ liệu này có xác suất $(1/2)^{10}=1/1024>0$.

**Quy hoạch trên mô hình đã khớp.** Toán tử rút gọn là $\hat Tv=\max(1+0.9v,0.6+0.9v)$. Nhánh $A$ luôn lớn hơn, nên điểm bất động bằng $10$ và chính sách tối ưu của mô hình ước lượng chọn $A$. Tại $v=10$, hai nhánh lần lượt bằng $10$ và $9.6$, xác nhận lựa chọn này.

**Triển khai và đối chiếu.** Trong môi trường thật, chính sách luôn chọn $A$ có giá trị $1/(1-0.45)=20/11$, còn luôn chọn $B$ có giá trị $0.6/(1-0.9)=6$. Định lý 13.12 cho $B$ tối ưu thật, như có thể kiểm bằng $\max(1+0.45\cdot6,0.6+0.9\cdot6)=6$. Chính sách được quy hoạch từ mẫu thuận lợi có giá trị thấp hơn tối ưu thật một lượng $6-20/11=46/11$.

**Giới hạn của chứng nhận.** Lặp giá trị hội tụ đúng trên mô hình ước lượng theo Định lý 13.11. Sai lệch nằm ở hàng chuyển tiếp chứ không ở phép giải phương trình. Một xác suất MLE bằng $0$ cho sự kiện chưa thấy không chứng minh sự kiện đó bất khả; đây là cùng giới hạn đã xuất hiện trong ước lượng phân loại của Bài 11.
:::

### Một quan sát chưa đủ làm trạng thái

::: application Tình huống 13.2 (Cảm biến nhị phân bỏ mất thông tin quá khứ)
**Cơ chế đầy đủ.** Một thiết bị có hai bit khởi đầu $Z_0,Z_1$ độc lập, mỗi bit có phân phối Bernoulli$(1/2)$. Sau đó thiết bị lặp lại theo quy luật $Z_{t+1}=Z_{t-1}$ với $t\ge1$. Chỉ có một hành động khả thi. Cảm biến tại thời điểm $t$ chỉ ghi $Z_t$; thưởng ở bước kế tiếp là $R_{t+1}=Z_{t+1}$, với $\gamma=1/2$.

**Kiểm tra tính Markov của quan sát.** Hai lịch sử $(Z_0,Z_1)=(0,0)$ và $(1,0)$ đều có xác suất $1/4$ và cùng quan sát hiện tại $Z_1=0$. Tuy nhiên,

$$
\mathbb P(Z_2=1\mid Z_0=0,Z_1=0)=0,
\qquad
\mathbb P(Z_2=1\mid Z_0=1,Z_1=0)=1.
\tag{13.26}
$$

Phân phối bước sau còn phụ thuộc bit cũ; riêng $Z_t$ không thỏa Định nghĩa 13.1.

**Hậu quả với giá trị.** Sau lịch sử $(0,0)$, mọi thưởng tương lai bằng $0$, nên tổng thưởng từ thời điểm $1$ bằng $0$. Sau lịch sử $(1,0)$, các thưởng từ bước kế tiếp là $1,0,1,0,\ldots$, nên tổng thưởng là $1+(1/2)^2+(1/2)^4+\cdots=4/3$. Một giá trị chỉ theo quan sát hiện tại $0$ không thể biểu diễn đồng thời hai giá trị có điều kiện theo lịch sử đó.

**Sửa trạng thái.** Với $t\ge1$, đặt trạng thái mở rộng $S_t=(Z_{t-1},Z_t)\in\{0,1\}^2$. Khi đó $S_{t+1}=(Z_t,Z_{t-1})$ xác định từ $S_t$, và thưởng kế tiếp là tọa độ thứ nhất của $S_t$. Mô hình mở rộng có bốn trạng thái, thưởng bị chặn và chiết khấu nhỏ hơn $1$, nên các định lý Bellman áp dụng được. Nếu hai bit không quan sát được, vấn đề còn cần một mô hình quan sát và suy luận về trạng thái ẩn; xem Murphy (2023), §34.5.2.

**Diễn giải AI.** Tính co có thể đúng cho một bảng chuyển tiếp tùy ý trên các quan sát $0,1$, nhưng bảng ấy chưa mô tả đúng cơ chế dự đoán theo lịch sử. Lựa chọn biểu diễn trạng thái là một phần của việc xây dựng mô hình, cần kiểm tra trước khi diễn giải giá trị hoặc chính sách từ bảng.
:::

Các công cụ của bài phục vụ những phần việc khác nhau: Mệnh đề 13.2 truyền bất định theo một mô hình; Định lý 13.8 đánh giá một chính sách; Định lý 13.12 lựa chọn tối ưu trong MDP đã xác định; Mệnh đề 13.16 học một phần của mô hình từ dữ liệu. Trong điều khiển robot và phân bổ tài nguyên tuần tự, phải xác định bước nào đang được thực hiện và giả thiết nào được bảo đảm. Khi quan sát không bộc lộ trạng thái đầy đủ, suy luận về biến ẩn trở thành một nhu cầu bổ sung, nối với góc nhìn biểu diễn xác suất của Bài 14 trong kế hoạch.

## 13.6. Tóm tắt chương

Chúng ta bắt đầu từ việc truyền một phân phối qua xích Markov, rồi thêm hành động để mô hình hóa lựa chọn có hậu quả dài hạn. Chính sách Markov dừng tạo một xích và một phương trình Bellman riêng cho giá trị của nó. Chiết khấu cùng chặn phần thưởng làm tổng vô hạn và các kỳ vọng được xác định. Toán tử tối ưu là ánh xạ co, nên có một điểm bất động duy nhất và lặp giá trị hội tụ từ mọi vector ban đầu. Chính sách tham lam đạt điểm đó, còn mọi chính sách phụ thuộc lịch sử đều không vượt nó; vì vậy điểm bất động có ý nghĩa tối ưu chứ không chỉ là một nghiệm đại số. Ví dụ robot cho thấy thưởng tức thời lớn hơn có thể dẫn đến giá trị dài hạn thấp hơn. Khi mô hình chưa biết, số đếm, dữ liệu tương tác và thăm dò tạo thêm một bài toán thống kê mà chứng minh hội tụ của quy hoạch chính xác chưa giải quyết.

| Mạch nội dung | Kết quả cần tra lại |
|---|---|
| Xích và phân phối trạng thái | Định nghĩa 13.1; Mệnh đề 13.2; Nhận xét 13.3 |
| Mô hình và chính sách | Định nghĩa 13.4–13.6; Mệnh đề 13.7; Định lý 13.8 |
| Bellman tối ưu | Định nghĩa 13.9; Bổ đề 13.10; Định lý 13.11–13.12 |
| Sai số quy hoạch và giới hạn | Hệ quả 13.13; Thuật toán 13.1; Nhận xét 13.14 |
| Học từ trải nghiệm | Định nghĩa 13.15; Mệnh đề 13.16; Định nghĩa 13.17; Nhận xét 13.18 |

Các công thức cần nhớ là phép truyền (13.3), Bellman theo chính sách (13.9), Bellman tối ưu (13.16), chặn phần dư (13.18) và ước lượng từ số đếm (13.21). Các giả thiết dễ bị bỏ quên là trạng thái đủ thông tin, chuẩn hóa từng hàng xác suất, thưởng bị chặn, $\gamma<1$ và phân biệt mô hình thật với mô hình ước lượng. Biết có một trạng thái hấp thụ chưa đủ để bỏ chiết khấu; một chính sách vẫn có thể không bao giờ tới trạng thái ấy.

## 13.7. Bài tập trên lớp: 30 phút

Ba bài dưới đây dành cho 30 phút riêng; các lời giải được dùng để đối chiếu sau khi hoàn thành. Chúng tách khỏi bốn bài tự học ở Mục 13.8.

::: exercise Bài tập 13.7 (Trên lớp, 10 phút: truyền phân phối)
Một xích có hai trạng thái $A,B$, ma trận chuyển hàng $P=\begin{pmatrix}0.7&0.3\\0.2&0.8\end{pmatrix}$ và phân phối đầu $\mu_0=(1,0)$. Tính $\mu_1,\mu_2$. Giải thích vì sao xác suất ở $A$ sau hai bước không chỉ bằng $0.7^2$.
:::

::: hint Gợi ý Bài tập 13.7
Liệt kê hai đường đi từ $A$ tới $A$ sau hai bước và kiểm tra tổng của vector phân phối.
:::

::: solution Lời giải Bài tập 13.7
Ta có $\mu_1=(0.7,0.3)$ và $\mu_2=(0.7\cdot0.7+0.3\cdot0.2,\ 0.7\cdot0.3+0.3\cdot0.8)=(0.55,0.45)$. Tổng các tọa độ bằng $1$. Đường $A\to A\to A$ đóng góp $0.49$, còn đường $A\to B\to A$ đóng góp $0.06$; cả hai tạo xác suất $0.55$.
:::

::: exercise Bài tập 13.8 (Trên lớp, 10 phút: lặp và điểm bất động)
Một MDP có hai trạng thái $s,z$, $z$ hấp thụ và thưởng $0$, với $\gamma=1/2$. Tại $s$, hành động $A$ thưởng $1$ rồi chắc chắn tới $z$; $B$ thưởng $0.6$ rồi chắc chắn trở lại $s$. Bắt đầu bằng $V_0(s)=V_0(z)=0$. Tính ba giá trị lặp đầu tại $s$, ghi hành động dùng để tạo từng giá trị, rồi tìm giá trị tối ưu.
:::

::: hint Gợi ý Bài tập 13.8
Viết $v_{k+1}=\max(1,0.6+v_k/2)$ và kiểm tra nhánh cực đại tại điểm bất động.
:::

::: solution Lời giải Bài tập 13.8
Ta có $v_1=1$ từ $A$, $v_2=1.1$ từ $B$ và $v_3=1.15$ từ $B$. Ứng viên nhánh $B$ thỏa $v=0.6+v/2$, cho $v=1.2$; nhánh $A$ tại đó bằng $1<1.2$. Theo Định lý 13.11–13.12, đây là điểm bất động duy nhất và là giá trị tối ưu. Các hành động vừa ghi thuộc các vòng tính toán; chúng không yêu cầu robot thực hiện $A$ rồi $B$ trên một quỹ đạo.
:::

::: exercise Bài tập 13.9 (Trên lớp, 10 phút: mục tiêu kỳ vọng và mục tiêu mẫu)
Tại một cặp $(s,a)$, năm lần thử độc lập tới $u$ trong bốn lần và tới $v$ trong một lần. Cho thưởng luôn bằng $1$, $\gamma=1/2$, $V(u)=3$, $V(v)=-1$. Tính hàng MLE và mục tiêu Bellman theo mô hình. Nếu lần thử kế tiếp tới $u$, bảng giá trị hành động hiện tại có $Q(s,a)=1$ và các giá trị cực đại ở trạng thái kế tiếp bằng các giá trị $V$ vừa cho, tính một cập nhật Q-learning với $\alpha=0.2$.
:::

::: hint Gợi ý Bài tập 13.9
Tính kỳ vọng trước, rồi tính mục tiêu của riêng kết quả $u$; chỉ mục tiêu sau được dùng cho lần cập nhật từ mẫu.
:::

::: solution Lời giải Bài tập 13.9
Hàng MLE là $(4/5,1/5)$. Giá trị tiếp diễn kỳ vọng bằng $(4/5)3+(1/5)(-1)=2.2$, nên mục tiêu theo mô hình là $1+(1/2)2.2=2.1$. Khi quan sát $u$, mục tiêu mẫu bằng $1+(1/2)3=2.5$, cho giá trị mới $Q^+(s,a)=1+0.2(2.5-1)=1.3$. Một lần cập nhật này không thay thế phép lấy kỳ vọng $2.1$.
:::

## 13.8. Bốn bài tự học: khoảng 180 phút

Các bài được điều chỉnh từ W4.1–W4.4 trong `sources/part2/homework.pdf`. Mức **cơ bản** kiểm tra mô hình hóa và tính toán; mức **trung bình** cần suy diễn hoặc chứng minh; mức **vận dụng** yêu cầu kiểm tra giả thiết và diễn giải quyết định AI. Bốn bài bao phủ tính toán, suy diễn, kết nối AI và lập luận phản biện. Các gợi ý không thay thế lời giải cần trình bày của người học.

::: exercise E13.1 (Cơ bản đến trung bình; xích Markov, 40 phút)
Một xích hai trạng thái $A,B$ có ma trận chuyển hàng $P=\begin{pmatrix}0.8&0.2\\0.35&0.65\end{pmatrix}$ và phân phối đầu $\mu_0=(0,1)$.

1. Tính $\mu_1,\mu_2$ bằng nhân ma trận, ghi rõ thứ tự trạng thái và kiểm tra chuẩn hóa.
2. Liệt kê các đường đóng góp vào $\mathbb P(S_2=A)$ và kiểm tra kết quả bằng xác suất toàn phần.
3. Tính $\mathbb P(S_0=B,S_1=A,S_2=B)$. Phân biệt tích xác suất này với một phần tử đơn lẻ của ma trận chuyển.
4. Với phân phối hiện tại $(0.4,0.6)$, tính xác suất đồng thời $\mathbb P(S_t=A,S_{t+1}=B)$ và xác suất có điều kiện tương ứng. Dùng một phép kiểm số để xác định hai thời điểm có độc lập không.
5. Nếu dùng một ma trận mới ở bước thứ hai, giải thích công thức $\mu_0P^2$ cần được thay đổi như thế nào.
:::

::: hint Gợi ý E13.1
Mỗi tọa độ bước sau lấy tổng theo mọi trạng thái hiện tại. Với câu 3, dùng phân tích xác suất theo thứ tự thời gian; không giả sử các thời điểm độc lập.
:::

::: exercise E13.2 (Trung bình đến vận dụng; Bellman và giá trị dài hạn, 60 phút)
Xét robot với trạng thái $s$ hoạt động và $z$ hấp thụ. Tại $z$, thưởng luôn $0$ và ở lại $z$. Tại $s$, $A$ thưởng $1$, ở lại $s$ với xác suất $1/2$ và tới $z$ với xác suất $1/2$; $B$ thưởng $0.6$ và luôn ở lại $s$. Cho $\gamma=0.9$, $V_0(s)=V_0(z)=0$.

1. Viết MDP, toán tử Bellman và công thức rút gọn theo $v_k=V_k(s)$.
2. Tính $v_1,v_2,v_3,v_4$ cùng hai giá trị hành động ở mỗi vòng. Giải thích đúng chỉ số của hành động dùng để tạo $v_{k+1}$.
3. Tìm điểm bất động của toán tử cực đại và xác định hành động tối ưu ở đó. Tính giá trị của chính sách luôn chọn $A$; diễn giải vì sao phần thưởng tức thời cao nhất không đủ để tối ưu tổng thưởng.
4. Chứng minh toán tử là ánh xạ co trong chuẩn cực đại. Nêu vì sao tính co chưa tự xác nhận ý nghĩa tối ưu nếu thiếu lập luận đạt được và chặn mọi chính sách.
5. Chứng minh $v_k=6-5(0.9)^{k-1}$ với mọi $k\ge1$. Từ đó tìm một số vòng đủ để sai số tại $s$ không quá $0.1$.
6. Nếu thay $\gamma$ bằng $1$, phân tích giá trị của chính sách luôn chọn $B$ và chỉ ra giả thiết nào của chứng minh hội tụ không còn đúng.
:::

::: hint Gợi ý E13.2
Hai nhánh bằng nhau khi $v=8/9$. Sau vòng đầu, kiểm tra rằng nhánh $B$ tiếp tục được chọn, rồi giải truy hồi tuyến tính quanh điểm $6$. Không nhầm vòng tính toán với thời gian robot.
:::

::: exercise E13.3 (Trung bình; học mô hình và mục tiêu Bellman, 45 phút)
Một bộ mô phỏng cho phép thử độc lập cùng cặp $(s,a)$ trong $12$ lần. Có $9$ lần tới $s_1$, $3$ lần tới $s_2$. Cho $r(s,a)=2$, $\gamma=0.8$, $V(s_1)=5$, $V(s_2)=1$.

1. Lập hợp lý của hàng chuyển trên đơn hình và suy ra MLE; có thể dùng Định lý 11.7 sau khi nêu đúng đối tượng.
2. Tính mục tiêu Bellman theo mô hình ước lượng. Phân biệt nó với $V^*(s)$ và với mục tiêu từ một lần chuyển tiếp.
3. Giả sử thưởng quan sát luôn bằng $2$. Liệt kê hai mục tiêu mẫu có thể nhận và kiểm tra kỳ vọng theo hàng ước lượng.
4. Một hành động $b$ tại cùng trạng thái chưa được thử lần nào. Mô tả tập các hàng MLE của hành động đó và giải thích vì sao không thể dùng tỉ số số đếm để chọn duy nhất một hàng.
5. Nếu thay bộ mô phỏng bằng một quỹ đạo do chính sách thu thập, nêu điều cần kiểm tra trước khi gọi dữ liệu là i.i.d. Phân biệt phân tích nhân tử của xác suất quỹ đạo chung với điều kiện theo toàn bộ các hành động tương lai.
:::

::: hint Gợi ý E13.3
Công thức tần suất cần mẫu và miền tham số được xác định. Câu 4 xét hợp lý khi tích dữ liệu là tích rỗng; câu 5 dùng quy tắc nhân có điều kiện chứ không giả định độc lập của trạng thái.
:::

::: exercise E13.4 (Vận dụng; giả thiết và bảo đảm, 35 phút)
Hai hệ thống cùng có tập trạng thái và hành động hữu hạn, thưởng bị chặn và $\gamma=0.9$. Hệ thống thứ nhất biết chính xác $P,r$ và dùng cập nhật đồng thời $V_{k+1}=TV_k$. Hệ thống thứ hai chỉ nhận các bộ $(S_t,A_t,R_{t+1},S_{t+1})$, cập nhật một phần tử Q bằng mục tiêu từ mẫu và có thể dùng một mạng để biểu diễn Q.

1. Viết một đoạn 4–6 câu phân biệt thông tin đã biết, đại lượng cần học và vai trò của thăm dò ở hai hệ thống.
2. Liệt kê giả thiết và kết luận của định lý co áp dụng cho hệ thống thứ nhất. Giải thích vì sao không được coi định lý đó là một chứng minh hội tụ đầy đủ cho hệ thống thứ hai.
3. Nêu một ví dụ trạng thái quan sát không đủ tính Markov, chỉ rõ hai lịch sử có cùng quan sát hiện tại nhưng phân phối bước sau khác nhau. Đề xuất một thay đổi biểu diễn hoặc một mô hình quan sát phù hợp.
4. Phân biệt sai số quy hoạch số học, sai số mô hình do dữ liệu hữu hạn và hạn chế của cách biểu diễn giá trị. Giải thích tại sao chỉ giảm phần dư Bellman trên một mô hình đã khớp chưa kiểm soát mọi nguồn sai số này.
:::

::: hint Gợi ý E13.4
Dẫn đúng Định lý 13.11–13.12 và Nhận xét 13.18. Phân tích trạng thái bằng phân phối có điều kiện theo lịch sử, không chỉ bằng mô tả rằng môi trường “có trí nhớ”.
:::

## 13.9. Hướng dẫn đọc thêm và tài liệu tham khảo

Tài liệu chính là Kevin P. Murphy (2023), *Probabilistic Machine Learning: Advanced Topics*, MIT Press. [Trang sách do tác giả cung cấp](https://probml.github.io/pml-book/book2.html) và [mục lục do nhà xuất bản cung cấp](https://mitp-content-server.mit.edu/books/content/sectbyfn/books_pres_0/14319/TOC_MurphyPMLv2.pdf) xác định các chương và số mục dưới đây. Các phép tính và chứng minh được biên soạn lại cho mô hình hữu hạn của bài; không gán số trang, số định lý hoặc số bài tập Murphy chưa đối chiếu trực tiếp.

| Phần của bài | Mục đọc chính xác ở Murphy II | Mục đích |
|---|---|---|
| 13.1 | §2.6.1 | Tham số hóa xích Markov, ma trận chuyển và quy ước xác suất |
| 13.2 | §34.5.1, §34.5.3–34.5.4 | MDP, tổng thưởng và hàm giá trị |
| 13.3 | §34.5.5, §34.6.1 | Giá trị và chính sách tối ưu, lặp giá trị |
| 13.4, học mô hình | §2.6.3, §35.1.1, §35.1.4 | Ước lượng chuyển tiếp và học tăng cường dựa trên mô hình |
| 13.4, thu thập dữ liệu | §35.1.5 | Thăm dò và khai thác khi chính sách ảnh hưởng dữ liệu |
| 13.4, mục tiêu từ mẫu | §35.2.2, §35.2.5 | Học sai phân thời gian và Q-learning; chỉ lấy phần diễn giải nhập môn |
| Đọc thêm về trạng thái không quan sát đầy đủ | §34.5.2 | MDP quan sát một phần và nhu cầu suy luận trạng thái |

Định lý 13.11 có chứng minh hữu hạn chiều bằng tính co, dãy Cauchy và tính đầy đủ; đó là trường hợp cụ thể của định lý điểm bất động Banach. Định lý 13.12 bổ sung chứng minh đạt tối ưu bởi chính sách dừng và chặn mọi chính sách phụ thuộc lịch sử. Hệ quả 13.13 được suy từ tính co để tránh nhầm chỉ số trong điều kiện dừng. Các phát biểu này làm rõ những giả thiết cần cho cách tiếp cận Bellman và lặp giá trị, không nhận mọi chi tiết chứng minh bổ sung là phát biểu nguyên dạng trong giáo trình.

Tài liệu bổ trợ là Richard S. Sutton và Andrew G. Barto (2018), *Reinforcement Learning: An Introduction*, ấn bản 2, MIT Press, bản nháp tác giả trong kho `statistical-learning-theory/sources/supp/sutton-barto-2018-draft.pdf`. Các mục §3.1, §3.3, §3.5–3.6 và §4.1, §4.4 hỗ trợ cách diễn giải MDP, tổng thưởng, Bellman và lặp giá trị; chúng không thay Murphy làm nguồn chính. Lý thuyết hội tụ của các thuật toán học từ mẫu và xấp xỉ hàm được dành cho đọc sâu hơn, không dùng như một bảo đảm đã chứng minh ở bài này.

Nguồn khởi đầu là *Probability: Mathematical Foundations for AI — Five-week bridge*, `sources/part2/lecture_notes.pdf`, Tuần 4, §8.1–8.4, trang in 19–21. Ví dụ 13.1 giữ ma trận hai trạng thái và phân phối đầu $(1,0)$; Ví dụ 13.5 giữ mô hình robot với hai hành động và sự thay đổi nhánh Bellman theo giá trị tiếp diễn. Các phép chứng minh, kiểm tra chỉ số và tình huống giới hạn được bổ sung trong ghi chú này. Không tự bổ sung tác giả hoặc năm xuất bản cho tệp khi nguồn chưa cung cấp căn cứ.

Nguồn bài tự học là *Five-Week Homework — Probability and Probabilistic AI — UET.AI2012*, bản sinh viên trong `sources/part2/homework.pdf`, Tuần 4. E13.1 giữ dữ kiện W4.1 và thêm phân biệt xác suất chuyển với xác suất quỹ đạo; E13.2 giữ mô hình W4.2, thêm chứng minh co, công thức truy hồi và giới hạn khi bỏ chiết khấu; E13.3 giữ số đếm W4.3 và thêm phân tích hàng chưa được thử, mục tiêu mẫu và quy trình thu thập; E13.4 điều chỉnh W4.4 thành phân tích giả thiết và ba nguồn sai số. Đây là các bài tập điều chỉnh, không gán số bài tập nguyên bản của Murphy hoặc Sutton–Barto. Thời lượng được phân lại thành $40+60+45+35=180$ phút.

Bài 14 tiếp tục việc xây dựng mô hình xác suất, nhưng chuyển từ trạng thái phục vụ quyết định sang biến ẩn phục vụ biểu diễn và sinh dữ liệu. Nhu cầu suy luận về đại lượng không quan sát đầy đủ vẫn còn, trong khi mục tiêu và công cụ tối ưu sẽ thay đổi theo mô hình được chọn.
