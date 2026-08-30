# Quy trình tạo trang chiếu bài giảng

## Phạm vi

Tệp này áp dụng cho mọi yêu cầu tạo, sửa, rà soát hoặc xuất trang chiếu, ghi chú bài giảng và bài tập đi kèm trong kho này. Sản phẩm trình chiếu mặc định là một bộ trang chiếu RevealJS cho học phần **Cơ sở toán học cho AI**. Điều phối viên phải sử dụng nhiều tác tử con theo quy trình dưới đây; không được tự thực hiện toàn bộ quy trình trong một vai. Có thể bổ sung tác tử chuyên trách khi phạm vi hoặc độ phức tạp của bài giảng yêu cầu.

## Ngôn ngữ và giọng văn

- Viết thuần Việt. Chỉ giữ tiếng Anh cho tên riêng, ký hiệu chuẩn, tên thuật toán hoặc thư viện chưa có cách dịch ổn định, và thuật ngữ xuất hiện lần đầu trong ngoặc sau cách gọi tiếng Việt.
- Khi dùng viết tắt lần đầu, viết đầy đủ bằng tiếng Việt rồi đặt viết tắt trong ngoặc. Có thể giữ dạng viết tắt ở các lần sau.
- Không dùng câu cảm thán, lời ca tụng, khẩu hiệu, câu hỏi tu từ hoặc cách diễn đạt quảng bá.
- Viết trực tiếp, chính xác, học thuật. Ưu tiên câu ngắn, động từ rõ và thuật ngữ nhất quán.
- Không dịch tên người, tên tổ chức, tên phần mềm, tên mô hình hoặc ký hiệu toán học.
- Dùng thuật ngữ `lồi chặt (còn gọi là lồi nghiêm ngặt)` ở lần xuất hiện đầu tiên; các lần sau chỉ dùng `lồi chặt`.
- Trong mọi tệp Markdown, chỉ dùng `$...$` cho công thức nội dòng và `$$...$$` cho công thức khối; không dùng kiểu phân cách LaTeX thay thế.

## Thứ tự ưu tiên nguồn và mẫu

Khi có xung đột, tuân theo thứ tự sau:

1. Chỉ dẫn cụ thể của người dùng cho bộ trang chiếu đang làm.
2. Các trang chiếu mẫu người dùng cung cấp, kể cả khi chúng bằng tiếng Anh.
3. Tài liệu bổ sung người dùng cung cấp.
4. Đề cương học phần và chuẩn đầu ra tương ứng trong kho.
5. Cấu trúc, giao diện và mã RevealJS trong `2526-2-another-course/`.
6. Các quy ước chung trong tệp này.

Phải giữ thứ tự, bố cục, mức độ chi tiết và mạch nội dung của trang chiếu mẫu. Chỉ thay đổi khi cần sửa lỗi, bảo đảm khả năng đọc, đáp ứng chuẩn đầu ra hoặc người dùng yêu cầu rõ. Ghi lại mọi thay đổi có chủ ý so với mẫu trong phần bàn giao.

## Quản lý nguồn

- `sources/` là kho nguồn hiện tại của học phần. Trước mỗi bài, kiểm kê các tệp liên quan và phân loại rõ: đề cương, nguồn nội dung, trang chiếu mẫu, bài tập, lời giải, tài liệu bổ sung hoặc tham chiếu thị giác. Không mặc định dùng tất cả tệp chỉ vì chúng có trong thư mục.
- Dùng đề cương DOCX chính thức có thật trong `sources/`, ưu tiên `sources/UET_Đề cương học phần_UET.AI2012_Cơ sở toán học của Trí tuệ nhân tạo_7460108.01.24.2506 (3).docx` trừ khi người dùng chỉ định một bản khác, để xác định số buổi, phạm vi, kiến thức tiên quyết, chuẩn đầu ra học phần (CLO), chuẩn đầu ra bài học (LLO) và hình thức đánh giá. Không suy diễn một cấu trúc thời lượng cố định như 120 phút giảng và 60 phút bài tập từ kho tham khảo.
- `sources/MIT/` chứa các nguồn MIT hiện có. Khi kiểm kê hoặc lập danh mục, bỏ qua mọi tệp siêu dữ liệu có tiền tố `._`. Chỉ chọn từng tài nguyên khi vai trò của nó trong bài đã được xác định trong bảng ánh xạ nguồn; không ghép toàn bộ kho MIT vào một bài.
- Khi nguồn hiện có còn khoảng trống về khái niệm, chứng minh, ví dụ, bài tập hoặc hình tham chiếu, có thể tìm và tải bổ sung từ trang chính thức của MIT OpenCourseWare tại `https://ocw.mit.edu/`. Ưu tiên trang khóa học, trang tài nguyên và tệp do MIT OpenCourseWare phát hành; không dùng bản sao từ kho lưu trữ không rõ nguồn khi bản chính thức còn truy cập được.
- Trước khi tải, kiểm tra URL nguồn, tác giả hoặc giảng viên, khóa học, học kỳ, loại tài nguyên, điều khoản sử dụng tại `https://ocw.mit.edu/pages/privacy-and-terms-of-use/` và quyền của nội dung bên thứ ba được nhúng trong tài liệu. Giấy phép của trang hoặc khóa học không tự động bao phủ mọi hình, ảnh, bài đọc hay tài sản của bên thứ ba; tài sản không đủ quyền phải được thay bằng nội dung tự tạo, trích dẫn ở phạm vi được phép hoặc loại khỏi bộ trang chiếu.
- Khi tải tài nguyên MIT OpenCourseWare mới, tải trước vào một tệp tạm chưa mang tên đích. Tính checksum SHA-256 của tệp tạm, rồi so sánh checksum, kích thước và tên dự kiến với các tệp hiện có trước khi chuyển vào `sources/MIT/`. Chỉ sau bước kiểm tra mới đặt tên cuối ổn định, có ý nghĩa; không ghi đè tệp hiện có. Nếu nội dung trùng, dùng bản đã có và chỉ bổ sung siêu dữ liệu. Nếu tên dự kiến trùng nhưng checksum khác, giữ cả hai bằng hậu tố phân biệt và giải thích trong danh mục. Xóa tệp tạm sau khi đã đặt tệp cuối hoặc xác nhận bản trùng.
- Tạo hoặc cập nhật `sources/MIT/README.md` trước lần đầu dùng bất kỳ nguồn MIT nào chưa có mục trong danh mục, đồng thời cập nhật mỗi khi bổ sung hoặc tái phân loại nguồn MIT. Với từng tài nguyên, ghi tối thiểu: tên khóa học; mã khóa học nếu có; tiêu đề tài nguyên; URL trang khóa học và URL tài nguyên hoặc URL tải; ngày tải theo ISO `YYYY-MM-DD`; giấy phép; tác giả hoặc giảng viên; vai trò nguồn; bài giảng dự kiến sử dụng; đường dẫn cục bộ; checksum SHA-256; ghi chú về thay đổi, vẽ lại và ghi công. Không lập mục cho tệp `._*`. Không bịa siêu dữ liệu; trường chưa xác minh phải được đánh dấu rõ.
- Nguồn tải thêm không mặc nhiên trở thành mẫu cấu trúc. Tác tử phân tích nguồn phải nêu rõ tài nguyên được dùng để lấp khoảng trống nào, phần nào được kế thừa và vì sao nguồn hiện có chưa đủ.

## Tổ chức theo học kỳ và bài giảng

- Mỗi học kỳ có một thư mục theo mẫu `YYZZ-H`, trong đó `YYZZ` là hai năm học viết liền và `H` là số học kỳ. Ví dụ: năm học 2026–2027, học kỳ 1 dùng thư mục `2627-1/`.
- Mỗi bài giảng là một tệp HTML trong thư mục học kỳ, đặt tên `lecture-NN-<chu-de>.html`; `NN` có hai chữ số. Tài sản riêng đặt trong `img/lec-NN/` nếu không có quy định khác.
- Với bài mới trong `2627-1/`, đặt ba tệp quy trình tại `2627-1/planning/lec-NN/`: `outline.md`, `storyboard.md` và `review-log.md`. Không tự di chuyển hoặc đổi tên các tệp quy trình cũ; chỉ chuẩn hóa bài mới hoặc di chuyển khi người dùng yêu cầu rõ và các liên kết liên quan đã được kiểm tra.
- Trang chỉ mục của mỗi học kỳ chỉ liên kết đến bộ trang chiếu và tài liệu học tập công khai thực sự tồn tại. Không hiển thị hoặc liên kết các tài liệu làm việc nội bộ như dàn ý, storyboard, ánh xạ nguồn hoặc nhật ký rà soát trên trang chỉ mục.
- Ghi chú bài giảng và bài tập công khai của mỗi bài đặt tại `YYZZ-H/materials/lec-NN/lecture-note.md` và `YYZZ-H/materials/lec-NN/exercises.md`. Markdown là nguồn phát hành; hình và tài sản riêng tiếp tục dùng `img/lec-NN/`.
- Ví dụ bắt buộc: Bài giảng 01 của năm học 2026–2027, học kỳ 1 phải nằm tại `2627-1/lecture-01-<chu-de>.html` và dùng các trang chiếu mẫu trong `sources/MIT/` theo đúng thứ tự `lec01`, `lec02`, `lec03`.
- Với ví dụ trên, ba tệp nguồn hiện có là `sources/MIT/f33960a29683274ff87e352219d54c76_MIT6_079F09_lec01.pdf`, `sources/MIT/26c4c530c9db63a12b898d720dd89a44_MIT6_079F09_lec02.pdf` và `sources/MIT/2ae23d35685ff402473b36011138149a_MIT6_079F09_lec03.pdf`. Bỏ qua các tệp siêu dữ liệu có tiền tố `._`.
- Khi một bài dùng nhiều bộ trang chiếu mẫu, không trộn tùy ý. Tác tử phân tích phải lập bảng ánh xạ theo thứ tự nguồn được giao, chỉ ra phần nào được giữ, gộp hoặc lược và lý do.
- Mọi đường dẫn RevealJS, plugin, CSS và hình phải là đường dẫn tương đối hợp lệ từ thư mục học kỳ. Bộ trang chiếu phải chạy được khi máy chủ được mở tại thư mục gốc của kho theo lệnh ở phần kiểm định.

## Công nghệ bắt buộc

- Sử dụng plugin Codex Slides cho khâu tiếp nhận tài liệu, xây dựng dàn ý, tham chiếu phong cách, rà soát trực quan và kiểm định sau chỉnh sửa.
- Với bộ trang chiếu mới, mở Codex Slides trước, tạo dự án bền vững, đưa các trang chiếu mẫu và tài liệu bổ sung vào đúng vai trò nguồn nội dung, mẫu bố cục, tài sản thương hiệu hoặc tham chiếu trực quan.
- Sản phẩm trong kho phải là RevealJS. Dùng `2526-2-another-course/lecture-template.html` và CSS tương ứng làm mẫu cấu trúc, giao diện và cơ sở để triển khai; không liên kết bộ trang chiếu học kỳ trực tiếp tới tài sản chạy của thư mục mẫu.
- Bộ trang chiếu trong học kỳ `2627-1/` phải chạy bằng tài sản cục bộ của chính thư mục học kỳ: `2627-1/lecture-style.css`, `2627-1/revealjs/`, `2627-1/plugin/` và `2627-1/vendor/katex/`. Mọi đường dẫn trong HTML phải là đường dẫn tương đối hợp lệ từ `2627-1/`; không phụ thuộc runtime chéo sang `2526-2-another-course/` hoặc một kho học phần khác.
- Dùng KaTeX qua `RevealMath.KaTeX` cho công thức, `RevealNotes` cho ghi chú diễn giả, `RevealHighlight` cho mã nguồn và `hash: true` để liên kết trực tiếp đến trang chiếu.
- Giữ `lang="vi"`; dùng `<section>` ngoài cho từng phần và `<section>` trong cho từng trang chiếu; đặt chân trang ở cuối `.slides`. Cấu hình mặc định gồm `controlsLayout: "edges"`, `slideNumber: true`, `hashOneBasedIndex: true` và `hash: true`.
- Không thay Codex Slides bằng công cụ trình chiếu khác. Không để kết quả chỉ tồn tại trong dự án Codex Slides; các thay đổi đã duyệt phải được phản ánh trong tệp RevealJS của kho.
- Nếu Codex Slides không khả dụng, báo rõ giới hạn, tiếp tục bằng RevealJS và thực hiện đầy đủ các vòng rà soát cục bộ. Không tuyên bố đã kiểm tra bằng Codex Slides khi chưa thực hiện.

## Ghi chú bài giảng và bài tập web tĩnh

- Không dùng Node.js, trình sinh trang hoặc bước build cho ghi chú bài giảng và bài tập. Tệp Markdown được tải khi chạy bởi `YYZZ-H/material-viewer.html`; JavaScript và CSS cần thiết phải được lưu cục bộ trong thư mục học kỳ.
- URL viewer chỉ nhận hai tham số cùng bài: `doc=materials/lec-NN/lecture-note.md` hoặc `doc=materials/lec-NN/exercises.md`, và `deck=lecture-NN-<chu-de>.html`. Viewer phải từ chối đường dẫn ngoài quy ước, số bài không khớp và tài nguyên khác nguồn.
- Thứ tự xử lý bắt buộc là bảo toàn công thức → chuyển Markdown bằng Marked → làm sạch HTML bằng DOMPurify → khôi phục công thức dưới dạng nút văn bản → render bằng KaTeX. Không chèn trực tiếp HTML chưa làm sạch vào DOM.
- Chỉ dùng `$...$` và `$$...$$`; cấu hình auto-render phải xử lý `$$` trước `$` và bỏ qua `pre`, `code`, `script`, `style`, `textarea`, `noscript` và `option`.
- Hỗ trợ các khối không lồng nhau `example`, `derivation`, `proof`, `exercise`, `hint` và `solution` bằng cú pháp `::: <loại>`. `hint` và `solution` phải gập mặc định, dùng được bằng bàn phím và được mở khi in.
- Ghi chú bài giảng dùng để mở rộng ví dụ, suy diễn, chứng minh và câu hỏi kiểm tra ngắn. Tệp bài tập chứa bộ bài giao chính thức theo mức nhận biết, tính toán hoặc chứng minh, và vận dụng vào AI. Không sao chép nguyên ghi chú diễn giả thành ghi chú bài giảng.
- Khi trang chiếu thay đổi ký hiệu, giả thiết, ví dụ, kết luận hoặc thứ tự khái niệm, phải rà lại cả ghi chú bài giảng và bài tập của cùng bài. Tài liệu chỉ được công bố trên chỉ mục sau khi nguồn, công thức, liên kết, màn hình rộng, màn hình hẹp và bàn phím đã được kiểm tra.
- Mỗi tệp Markdown phải bắt đầu bằng một heading cấp một. Hình phải có văn bản thay thế; bảng phải có hàng tiêu đề; nguồn phải truy nguyên được theo cùng tiêu chuẩn của bộ trang chiếu.
- Tài sản bên thứ ba cho viewer phải có phiên bản cố định, giấy phép cục bộ, URL tải chính thức, ngày tải, checksum SHA-256 và vai trò được ghi trong `YYZZ-H/vendor/materials/README.md`. Không dùng CDN cho thành phần cốt lõi.

## Cấu trúc bộ trang chiếu mặc định

Nếu mẫu người dùng không quy định khác, bộ trang chiếu gồm:

1. Trang tiêu đề: tên học phần, số buổi hoặc chương, chủ đề, đơn vị.
2. Mục tiêu học tập có thể quan sát hoặc đánh giá được, liên kết với LLO/CLO phù hợp.
3. Bản đồ nội dung và một câu hỏi trung tâm viết dưới dạng vấn đề cần giải quyết, không dùng câu hỏi tu từ.
4. Các phần kiến thức được tổ chức thành hành trình khái niệm theo thứ tự mặc định **nhu cầu → trực quan → ví dụ → hình thức/toán học → ứng dụng → bài tập**. Ví dụ dẫn nhập có thể đặt cùng hoặc ngay sau nhu cầu, trước trực quan, theo chuỗi hợp lệ **nhu cầu + ví dụ dẫn nhập → trực quan → hình thức/toán học → ứng dụng → bài tập**. Storyboard phải ghi rõ ví dụ dẫn nhập phục vụ nhu cầu nào. Không mở đầu một khái niệm trọng tâm bằng định nghĩa hoặc ký hiệu nếu nhu cầu, đại lượng và trực giác chưa được thiết lập.
5. Câu hỏi kiểm tra hiểu biết hoặc bài tập ngắn sau mỗi cụm khái niệm lớn.
6. Tổng kết theo mục tiêu học tập, câu hỏi tự kiểm tra, bài tập và tài liệu đọc.

Toàn bộ bài phải được tổ chức thành từ 5 đến 7 mạch nội dung lớn, mỗi mạch tương ứng với một `<section>` ngoài của RevealJS; số này bao gồm mạch mở đầu và mạch kết luận. Mỗi mạch phải có một chức năng riêng trong việc giải quyết vấn đề trung tâm, một điểm vào nhận kết quả hoặc câu hỏi từ mạch trước và một đầu ra đủ rõ để mạch sau sử dụng. Không chia một mạch liền lạc hoặc tạo mạch trang trí chỉ để đạt đủ số lượng. Chỉ dùng ngoài khoảng 5–7 khi mẫu hoặc yêu cầu cụ thể của người dùng quy định rõ, và phải ghi lý do cùng ảnh hưởng đến mạch kể chuyện trong `storyboard.md` và `review-log.md`.

Mỗi trang chiếu chỉ nên có một luận điểm trung tâm. Tách phép suy diễn dài thành nhiều trang chiếu; không thu nhỏ chữ để nhồi nội dung.

Mỗi bộ trang chiếu mới phải có `storyboard.md` tại `2627-1/planning/lec-NN/storyboard.md`. Mỗi trang chiếu phải có một mục tương ứng, nêu rõ:

- lý do trang chiếu cần tồn tại trong mạch bài;
- nhu cầu học tập hoặc khoảng trống nhận thức mà trang giải quyết;
- quan hệ với trang trước và trang sau;
- LLO/CLO hoặc minh chứng đánh giá mà trang hỗ trợ;
- quyết định `thêm`, `giữ`, `sửa`, `gộp`, `tách` hoặc `bỏ`, kèm lý do.

Không giữ một trang chỉ vì nó có trong tài liệu mẫu. Nếu lý do tồn tại không đủ vững, phải sửa vai trò hoặc nội dung, gộp với trang khác, tách để làm rõ một bước suy luận, hoặc bỏ trang. Có thể thêm trang khi storyboard chứng minh một khoảng trống về tiên quyết, lập luận, ví dụ, luyện tập hoặc chuyển ý mà không thể xử lý rõ bằng cách sửa trang hiện có hay ghi chú diễn giả. Không thêm trang để bù số lượng, trang trí hoặc lặp lại kết luận. Mọi thay đổi số lượng hay thứ tự so với mẫu phải được ghi trong `storyboard.md` và nhật ký rà soát.

Ngoài bảng theo từng trang, `storyboard.md` phải có **bản đồ hành trình khái niệm**. Với mỗi khái niệm hoặc cụm khái niệm, bản đồ phải chỉ ra:

- mã các trang thực hiện lần lượt sáu bước `nhu cầu`, `trực quan`, `ví dụ`, `hình thức/toán học`, `ứng dụng`, `bài tập`; nếu ví dụ dẫn nhập đứng trước trực quan, ghi rõ nhu cầu mà ví dụ làm cụ thể;
- đầu vào bắt buộc, sản phẩm học tập và LLO/CLO được đo;
- ký hiệu hoặc dữ kiện được truyền từ ví dụ sang phát biểu hình thức;
- bước nào được gộp trên một trang hoặc được ghi `không áp dụng`, cùng lý do sư phạm;
- câu nối giữa các bước và tổng thời lượng của cụm.

Không bắt buộc sáu bước tương ứng với sáu trang riêng. Có thể gộp hai bước khi trang vẫn có một luận điểm trung tâm và mối nối được thể hiện rõ. Không được đảo thứ tự hoặc bỏ ngầm một bước. Với khái niệm phụ hoặc phần tự học, có thể dùng chu trình rút gọn `nhu cầu → hình thức → kiểm tra`, nhưng storyboard phải giải thích vì sao không cần chu trình đầy đủ.

## Tiêu chuẩn nội dung cho học phần Cơ sở toán học cho AI

Bộ trang chiếu phải hỗ trợ ít nhất một trong các năng lực của học phần: nhận dạng dạng bài toán tối ưu; vận dụng thuật toán; xây dựng mô hình từ bài toán thực tế; phân tích độ phức tạp hoặc tốc độ hội tụ; lựa chọn và đánh giá mô hình hoặc thuật toán trong AI.

Với mỗi khái niệm toán học quan trọng:

- Phát triển theo chu trình bắt buộc `nhu cầu → trực quan → ví dụ → hình thức/toán học → ứng dụng → bài tập`. Nhu cầu phải xuất phát từ một quyết định, một bài toán hoặc giới hạn của công cụ trước; trực quan phải biểu diễn đúng quan hệ đang học; ví dụ phải tính hoặc kiểm tra được; ứng dụng phải thực sự dùng kết quả vừa xây dựng; bài tập phải đo khả năng tái tạo hoặc chuyển giao kiến thức.
- Dùng cùng ký hiệu từ ví dụ sang phát biểu hình thức, hoặc nêu ánh xạ ký hiệu rõ ràng. Không để bài tập đòi hỏi kỹ thuật, giả thiết hoặc khái niệm chưa xuất hiện trong tuyến học hay phần chuẩn bị bắt buộc.
- Nêu miền xác định, giả thiết, ký hiệu và kiểu hoặc kích thước của đại lượng trước khi sử dụng.
- Phân biệt định nghĩa, định lý, hệ quả, nhận xét, trực giác và ví dụ bằng nhãn rõ.
- Với định lý hoặc thuật toán, nêu đầu vào, đầu ra, điều kiện áp dụng và kết luận; không lược bỏ giả thiết quyết định tính đúng.
- Với chứng minh, trình bày mục tiêu, ý tưởng, các bước then chốt và điểm dùng giả thiết. Chuyển chi tiết đại số dài sang trang chiếu tiếp theo hoặc ghi chú diễn giả.
- Có ít nhất một ví dụ tính được và, khi phù hợp, một phản ví dụ hoặc trường hợp biên.
- Nối công thức với ý nghĩa hình học, xác suất, tính toán hoặc vai trò trong mô hình AI. Không chỉ liệt kê công thức.
- Với thuật toán, có giả mã hoặc sơ đồ, tiêu chuẩn dừng, chi phí chính, điều kiện hội tụ và giới hạn thực hành khi các nội dung này phù hợp.
- Dùng ký hiệu nhất quán trong toàn bộ trang chiếu; định nghĩa lại nếu chuyển ngữ cảnh có thể gây nhầm.
- Phân biệt rõ đẳng thức, xấp xỉ, tỷ lệ, hội tụ và tương đương; ghi điều kiện xảy ra dấu bằng nếu có.
- Nguồn phải truy nguyên được. Ưu tiên giáo trình, bài báo gốc và tài liệu chính thức; ghi tác giả, năm, chương, mục hoặc trang khi có thể. Không tạo nguồn hoặc số liệu.
- Bài tập nên có các mức nhận biết, tính toán hoặc chứng minh, và vận dụng vào AI; đáp án hoặc gợi ý đặt trong ghi chú diễn giả khi phù hợp.

Khi dùng lịch sử để phát triển một khái niệm, trình bày theo quan hệ **vấn đề hoặc giới hạn trước đó → nhu cầu mới → ý tưởng được đưa ra → hệ quả còn dùng hiện nay**. Không dùng danh sách năm, tên người và thuật toán tách rời khỏi mạch nhân quả. Chỉ giữ mốc thời gian khi nó giải thích sự thay đổi phương pháp; chuyển chi tiết không phục vụ lập luận sang ghi chú hoặc tài liệu đọc. Không dùng lịch sử để ca tụng cá nhân, tổ chức hoặc thuật toán.

Nội dung toàn học phần phải nhất quán với các cụm chủ đề trong đề cương: tối ưu lồi và đối ngẫu; tối ưu có hoặc không có ràng buộc; tối ưu cho học sâu; quy hoạch tuyến tính, đơn hình, luồng mạng và quy hoạch nguyên; mô hình đồ thị xác suất, suy diễn và học tham số.

## Tiêu chuẩn trình bày và khả năng đọc

- Kế thừa màu, khoảng cách, chân trang, thẻ, lưới và cách chia phần từ `2526-2-another-course/`. Không tạo một hệ giao diện mới nếu mẫu không yêu cầu.
- Ưu tiên nền sáng, tương phản cao và màu có ý nghĩa nhất quán. Không dùng màu làm tín hiệu duy nhất.
- Văn bản thân bài nên từ `0.75em` trở lên. Chỉ dùng dưới `0.65em` cho chú thích ngắn không thể tách; nếu phải dùng, tác tử rà soát sinh viên phải xác nhận vẫn đọc được khi trình chiếu.
- Giữ tiêu đề ngắn, trực tiếp và gọi đúng khái niệm. Không đặt tiêu đề dưới dạng câu hỏi như “Tại sao...?”, “Vì sao...?” hoặc kể tiến trình như “Từ ... đến ...”; dùng tên khái niệm, chẳng hạn `Định nghĩa tập lồi`, và đặt động cơ hoặc chuyển ý trong nội dung hay ghi chú. Mỗi gạch đầu dòng nên không quá hai dòng. Tránh đoạn văn dài trên trang chiếu; chuyển diễn giải sang ghi chú diễn giả.
- Mã vị trí nội bộ như `A01`, `B02`, `C03` chỉ xuất hiện trong `data-slide-id`, storyboard, dàn ý và nhật ký khi cần truy nguyên; không xuất hiện trên mặt trang chiếu hoặc trong ghi chú diễn giả. Nhãn phần `A`, `B`, `C` được phép giữ.
- Không hiển thị badge hoặc nhãn quy trình như `Giảng chính`, `Tự học`, `Bài tập`, thống kê phân tuyến hay tiên quyết theo mã trên mặt trang chiếu. Ghi chú diễn giả cũng không chứa mã trang, tuyến hoặc chỉ dẫn điều phối nội bộ; các dữ liệu này chỉ nằm trong storyboard và dàn ý.
- Bộ trang chiếu mặc định phải tạo một tuyến liên tục có thể trình chiếu từ đầu đến cuối. Phân loại nội bộ không được tạo ra các tuyến mà tệp RevealJS không có cơ chế điều hướng riêng để thực hiện; nếu cần nhiều tuyến, phải thiết kế và kiểm định cơ chế điều hướng rõ ràng.
- Mọi lời mời tương tác trên mặt trang chiếu dùng nhãn **“Câu hỏi:”**. Không dùng “Điểm dừng:” hoặc gắn số phút vào nhãn.
- Không hiển thị hoặc gợi ý thời lượng trên mặt trang chiếu hay trong ghi chú diễn giả, trừ khi người dùng yêu cầu rõ. Phân bổ thời gian chỉ được giữ trong tài liệu lập kế hoạch nội bộ như storyboard hoặc dàn ý.
- Công thức trung tâm phải đủ lớn, có khoảng trắng và không bị cắt. Căn các bước biến đổi để người học theo dõi được.
- Hình, đồ thị và sơ đồ phải có nhãn trục, chú giải, đơn vị, mô tả thay thế và ghi nguồn nếu không phải tài sản tự tạo.
- Không dùng ảnh trang trí không hỗ trợ lập luận. Không dùng ảnh sinh bởi AI để minh họa dữ liệu hoặc kết quả thực nghiệm nếu có thể khiến người học hiểu đó là bằng chứng thật.
- Mỗi trang chiếu nội dung cần ghi chú diễn giả trong `<aside class="notes">` khi phần nói có giả thiết, diễn giải, đáp án, chuyển ý hoặc chi tiết không nên đặt lên màn chiếu.
- Không hiển thị chú thích nguồn dạng “MIT 6.079 …” ở cuối từng trang chiếu. Đặt nguồn trong ghi chú diễn giả hoặc một trang tài liệu tham khảo.
- Ghi chú diễn giả phải tạo thành mạch nói ngắn, thuần Việt, trực tiếp và học thuật: ý chính; giải thích công thức hoặc hình; điểm dễ nhầm; chuyển ý; gợi ý hoặc đáp án đối với bài tập. Không chỉ ghi metadata và không lặp nguyên văn nội dung hiển thị.
- Bộ trang chiếu phải dùng được bằng bàn phím, không có tài nguyên hỏng và không phụ thuộc mạng cho các thành phần cốt lõi.
- Trước khi bàn giao, kiểm tra và sửa tràn nội dung ở khung 16:9 và màn hình hẹp; không che lỗi bằng cách cắt nội dung hoặc thu nhỏ thân bài dưới ngưỡng quy định.

## Vẽ lại hình và quản lý tài sản

- Mặc định vẽ lại sơ đồ, đồ thị, cây, mạng, hình hình học và hình kỹ thuật thành SVG cục bộ thay vì cắt ảnh từ PDF hoặc PPTX. Lưu SVG của bài tại `2627-1/img/lec-NN/`; SVG nhỏ dùng một lần có thể đặt nội dòng khi cách này giúp bố cục hoặc khả năng tiếp cận rõ hơn.
- Giữ đúng dữ liệu, quan hệ, tỷ lệ có ý nghĩa, nhãn, chiều mũi tên, chú giải và thông điệp của hình nguồn. Không thay đổi kết luận của hình để làm bố cục đẹp hơn. Ghi nguồn và việc vẽ lại trong ghi chú diễn giả hoặc trang tài liệu tham khảo, đồng thời truy nguyên trong `review-log.md`.
- Mỗi SVG phải có mô tả thay thế cụ thể; khi nhúng bằng thẻ ảnh, dùng `alt`, còn SVG nội dòng dùng `role="img"` cùng `title` hoặc `aria-labelledby`. Không dùng màu làm tín hiệu duy nhất.
- Dựng công thức, bảng, giả mã và mã nguồn bằng KaTeX, HTML hoặc khối mã; không chuyển chúng thành ảnh.
- Có thể giữ ảnh raster đối với ảnh chụp, ảnh lịch sử, ảnh chụp màn hình, bản quét hoặc tài sản mà việc vẽ lại sẽ làm mất thông tin hay sai lệch chứng cứ. Ngoại lệ phải có lý do sư phạm hoặc tính xác thực, nguồn, giấy phép hoặc quyền sử dụng, đường dẫn cục bộ, văn bản thay thế và quyết định giữ ảnh trong `review-log.md`. Không cần xin riêng người dùng nếu quyền và phạm vi dùng đã rõ; nếu quyền chưa rõ hoặc tài sản bên thứ ba có hạn chế, phải dừng phần đó và xin chỉ dẫn.
- Không dùng ảnh sinh bởi AI để thay cho dữ liệu, kết quả thực nghiệm, tài liệu lịch sử hoặc hình được trình bày như bằng chứng thật.

## Quy trình đa tác tử

### 1. Điều phối và tiếp nhận

Tác tử điều phối thực hiện các việc sau:

- Đọc toàn bộ chỉ dẫn, trang chiếu mẫu và danh mục tài liệu; xác định tệp nào là mẫu cấu trúc, mẫu thị giác, nguồn nội dung hoặc tài liệu bổ sung.
- Đọc đề cương DOCX chính thức trong `sources/` trước khi xác nhận buổi học. Trích đúng phạm vi, LLO/CLO, kiến thức tiên quyết và hình thức đánh giá; mọi thời lượng phải lấy từ đề cương hoặc yêu cầu cụ thể của người dùng, không áp một phân bổ mặc định từ học phần khác.
- Xác nhận thư mục học kỳ, số bài, tên tệp đầu ra và thứ tự các mẫu trước khi soạn. Nếu người dùng chưa cung cấp mẫu đã hứa cung cấp, dừng ở bước kiểm kê và yêu cầu mẫu; không tự chọn mẫu thay thế.
- Chỉ hỏi người dùng khi thiếu thông tin làm thay đổi đáng kể kết quả, chẳng hạn buổi học, thời lượng, đối tượng, phạm vi hoặc mẫu bắt buộc.
- Giao việc lập kế hoạch cho tác tử lập kế hoạch; điều phối viên kiểm tra và phê duyệt kế hoạch trước khi triển khai.
- Mở dự án Codex Slides và duy trì dự án này trong quá trình làm. Với mỗi thay đổi bằng công cụ, kiểm tra lại trạng thái bền vững và bề mặt hiển thị tương ứng.

### 2. Tác tử lập kế hoạch

Giao một tác tử riêng lập kế hoạch trước khi phân tích chi tiết hoặc sửa tệp. Tác tử này phải:

- Xác định mục tiêu, phạm vi, đối tượng, thời lượng theo đề cương hoặc yêu cầu người dùng, sản phẩm đầu ra và tiêu chí hoàn thành.
- Chia công việc thành các giai đoạn: kiểm kê nguồn, ánh xạ mẫu, dàn ý, triển khai RevealJS, rà soát độc lập, chỉnh sửa và kiểm định cuối.
- Xác định quan hệ phụ thuộc giữa các việc, việc nào có thể chạy song song và việc nào phải chạy tuần tự.
- Lập danh mục khái niệm trọng tâm và bản đồ sáu bước `nhu cầu → trực quan → ví dụ → hình thức/toán học → ứng dụng → bài tập` trước khi chốt số trang; phát hiện bước thiếu trước khi triển khai.
- Chỉ định tác tử, đầu vào, đầu ra và điều kiện hoàn thành cho từng việc.
- Đề xuất các tác tử chuyên trách bổ sung nếu nội dung có nhu cầu đặc biệt.
- Nêu các rủi ro chính như thiếu nguồn, xung đột giữa mẫu, công thức khó kiểm chứng, quá tải nội dung, thiếu hình hoặc nguy cơ tràn trang chiếu.
- Không sửa tệp trình chiếu. Bàn giao kế hoạch ngắn, có thứ tự và có thể kiểm tra được cho điều phối viên.

### 3. Tác tử phân tích nguồn và mẫu

Giao một tác tử riêng:

- Lập bảng ánh xạ từng trang chiếu hoặc cụm trang chiếu mẫu sang nội dung mới.
- Trích mục tiêu học tập, định nghĩa, định lý, ví dụ, bài tập, nguồn và ràng buộc về thứ tự.
- Đối chiếu đề cương DOCX chính thức với các nguồn được chọn; ghi rõ nguồn nào phục vụ buổi, LLO/CLO và khoảng trống nào. Nếu cần bổ sung MIT OpenCourseWare, bàn giao truy vấn, URL chính thức, quyền sử dụng và vai trò dự kiến cho tác tử nghiên cứu nguồn; không tự tải tràn lan.
- Chỉ ra chỗ tài liệu mâu thuẫn, thiếu giả thiết hoặc dùng ký hiệu không nhất quán.
- Không tự sửa bộ trang chiếu ở bước này; bàn giao bản đặc tả cho tác tử soạn.

### 4. Tác tử soạn và triển khai

Giao một tác tử xây dựng dàn ý và tệp RevealJS theo đặc tả đã duyệt. Tác tử này phải:

- Tạo và duy trì `2627-1/planning/lec-NN/outline.md`, `storyboard.md` và `review-log.md` cho bài mới; cập nhật đồng bộ ba tệp khi cấu trúc, nguồn hoặc quyết định biên tập thay đổi.
- Giữ thứ tự và bố cục của mẫu.
- Viết nội dung thuần Việt theo quy tắc ngôn ngữ.
- Vẽ lại hoặc tái sử dụng hình minh họa cục bộ theo quy tắc tài sản, thêm ghi chú diễn giả và nguồn.
- Không sửa các tệp dùng chung ngoài phạm vi cần thiết. Nếu cần thay đổi `lecture-style.css`, xác minh không làm hỏng các bộ trang chiếu hiện có.

### 5. Tác tử kiểm định storyboard

Trước vòng rà soát sinh viên, chuyên gia, toán học, phản biện học thuật–giảng dạy và mạch kể chuyện, giao một tác tử chỉ đọc kiểm định `storyboard.md` và bộ trang chiếu. Tác tử này phải:

- rà từng trang, không chỉ rà theo phần;
- kiểm tra lý do tồn tại có cụ thể, kiểm chứng được và khác với việc mô tả nội dung hay không;
- kiểm tra trang có tạo một bước tiến trong lập luận, cung cấp tiên quyết, trực giác, phát biểu hình thức, ví dụ, luyện tập, chuyển ý hoặc tổng kết cần thiết hay không;
- kiểm tra ở cấp cụm rằng mỗi khái niệm trọng tâm hoàn thành đúng thứ tự sáu bước; không chấp nhận một cụm chỉ có định nghĩa, định lý và công thức dù từng trang riêng lẻ đều đúng;
- kiểm tra ví dụ dùng được để dẫn tới phát biểu hình thức, ứng dụng sử dụng đúng kết quả vừa xây dựng, bài tập đo đúng LLO/CLO và tổng thời lượng của cụm khả thi;
- phát hiện trang trùng ý, trang chỉ làm nhiệm vụ trang trí, trang quá tải nhiều vai trò, và khoảng trống cần thêm trang;
- đối chiếu thời lượng, tuyến giảng chính, LLO/CLO, mẫu nguồn và quan hệ trước–sau;
- đề xuất cho từng mã một quyết định `thêm`, `giữ`, `sửa`, `gộp`, `tách` hoặc `bỏ`, kèm bằng chứng và tác động đến các trang lân cận; với quyết định `thêm`, phải chỉ rõ vị trí, mã dự kiến, khoảng trống được giải quyết và lý do không thể xử lý bằng cách sửa trang hiện có.

Tác tử kiểm định storyboard không sửa tệp. Tác tử soạn hoặc tác tử chỉnh sửa phải cập nhật đồng bộ `storyboard.md`, dàn ý, RevealJS và ghi chú diễn giả theo các quyết định được duyệt. Sau thay đổi số lượng hoặc thứ tự trang, phải chạy lại kiểm định storyboard cho các trang bị ảnh hưởng và hai trang lân cận mỗi phía.

Phân mức riêng cho hành trình khái niệm: `chặn bàn giao` nếu bài tập dùng kiến thức chưa chuẩn bị hoặc phát biểu hình thức dùng đại lượng chưa xác lập; `nghiêm trọng` nếu khái niệm trọng tâm thiếu nhu cầu, trực quan, ví dụ hay bài tập mà không có lý do; `trung bình` nếu ứng dụng chỉ được nêu tên, ví dụ không nối được với công thức hoặc câu chuyển bị đứt; `nhẹ` nếu chuỗi đúng nhưng nhãn vai trò chưa rõ.

### 6. Năm tác tử rà soát độc lập

Sau bản nháp đầu tiên, chạy song song năm vai. Các tác tử này không sửa tệp; mỗi tác tử chỉ trả về danh sách vấn đề có cấu trúc gồm `mức độ`, `trang chiếu`, `vấn đề`, `bằng chứng`, `đề xuất sửa`.

- **Góc nhìn sinh viên:** kiểm tra kiến thức tiên quyết, tải nhận thức, nhịp giảng, khả năng đọc từ cuối lớp, độ rõ của ký hiệu, ví dụ, chuyển ý, câu hỏi kiểm tra và khả năng tự học từ bộ trang chiếu.
- **Góc nhìn chuyên gia:** kiểm tra độ bao phủ, chiều sâu, thuật ngữ, mạch học thuật, liên kết với AI, LLO/CLO, nguồn và tính phù hợp với thời lượng buổi học.
- **Độ chính xác toán học:** kiểm tra từng định nghĩa, giả thiết, lượng từ, miền, kích thước, chỉ số, dấu, đạo hàm, chuyển vị, chuẩn, xác suất, điều kiện lồi, điều kiện tối ưu, bước biến đổi, kết quả ví dụ, hội tụ và độ phức tạp. Tự tính lại các ví dụ số quan trọng.
- **Phản biện học thuật và giảng dạy:** kiểm tra mỗi khái niệm hình thức có đủ nhu cầu, trực quan, ví dụ và tiên quyết; thứ tự hiện tại có hỗ trợ suy luận trên lớp; ứng dụng và bài tập có đóng vòng học tập; các lựa chọn lược, gộp hoặc thêm so với mẫu có được biện minh. Phải chỉ ra trường hợp nội dung đúng riêng lẻ nhưng đặt sai trình tự, thiếu cầu nối sư phạm hoặc không phục vụ LLO/CLO.
- **Mạch kể chuyện và điểm kết nối:** kiểm tra xương sống lập luận của toàn bài, điểm xuất phát, đích đến, các điểm nhấn và sự tích lũy ý nghĩa qua từng phần; xác nhận bài có từ 5 đến 7 mạch nội dung lớn tương ứng với các `<section>` ngoài, gồm mạch mở đầu và mạch kết luận, trừ ngoại lệ đã được người dùng yêu cầu rõ và ghi nhận. Với mỗi mạch, kiểm tra chức năng riêng, điểm nối vào, đầu ra cho mạch sau và đóng góp cụ thể vào việc giải quyết vấn đề trung tâm; với mỗi trang, xác định vai trò cụ thể trong câu chuyện và kiểm tra câu nối với trang liền trước, trang liền sau. Phải phát hiện bước nhảy lập luận, chuyển phần đột ngột, mạch hoặc trang đứng riêng lẻ, mạch lặp chức năng, tuyến không tiến triển, điểm nhấn đặt sai chỗ, cao trào không được chuẩn bị, kết luận không thu hồi vấn đề mở đầu hoặc nhiều trang cùng tranh vai trò trung tâm. Vai này không thay thế kiểm định storyboard về lý do tồn tại và hành trình sáu bước, không kiểm tra lại tính đúng toán học, độ bao phủ chuyên môn hay tải nhận thức trừ khi các vấn đề đó trực tiếp làm đứt mạch kể chuyện. Báo cáo phải nêu thêm `vai trò trong câu chuyện`, `kết nối vào`, `kết nối ra` và `điểm nhấn` cho mỗi vấn đề hoặc cụm trang bị ảnh hưởng; ở cấp mạch, phải nêu `chức năng`, `đầu vào`, `đầu ra` và `đóng góp cho vấn đề trung tâm`.

Mức độ gồm `chặn bàn giao`, `nghiêm trọng`, `trung bình`, `nhẹ`. Mọi lỗi `chặn bàn giao` và `nghiêm trọng` phải được xử lý.

Đối với vai mạch kể chuyện, phân mức `chặn bàn giao` khi thiếu mạch mở đầu hoặc mạch kết luận, số mạch ngoài khoảng 5–7 mà không có yêu cầu rõ của người dùng, không thể xác định được luận đề hoặc tuyến chính của bài, hay kết luận mâu thuẫn với vấn đề đã thiết lập; `nghiêm trọng` khi một mạch không có chức năng riêng, lặp chức năng của mạch khác, không tạo tiến triển cho vấn đề trung tâm, hoặc một phần trọng tâm bị đứt khỏi tuyến chính khiến quan hệ nhân quả hay lập luận không thể theo dõi; `trung bình` khi điểm vào hoặc đầu ra giữa hai mạch còn mờ, chuyển trang hay chuyển phần đột ngột, vai trò một trang chưa rõ hoặc nhịp nhấn làm loãng luận điểm; `nhẹ` khi mạch đúng nhưng tên mạch, câu nối, tín hiệu chuyển ý hoặc thứ bậc nhấn có thể rõ hơn.

Lưu đủ năm báo cáo hoặc bản hợp nhất có truy nguyên từng vai trong `2627-1/planning/lec-NN/review-log.md`. Không xóa vấn đề đã sửa; ghi trạng thái, quyết định và bằng chứng kiểm tra lại. Sau khi thêm, bỏ, gộp, tách, đổi thứ tự trang, đổi điểm nhấn chính hoặc sửa câu chuyển có ảnh hưởng đến mạch bài, phải giao lại vai mạch kể chuyện rà các trang bị ảnh hưởng, hai trang lân cận mỗi phía và toàn bộ ranh giới phần liên quan; nếu thay đổi mở bài, kết bài hoặc luận đề trung tâm, phải rà lại toàn bộ bộ trang chiếu.

### 7. Tác tử chỉnh sửa

Giao một tác tử chỉnh sửa riêng nhận bản nháp và năm báo cáo. Tác tử này:

- Hợp nhất các vấn đề trùng lặp, ưu tiên tính đúng, khả năng học và khả năng đọc.
- Sửa trực tiếp tệp RevealJS và tài sản liên quan; không thay đổi thứ tự hoặc bố cục mẫu nếu lỗi có thể sửa cục bộ.
- Ghi quyết định đối với đề xuất không áp dụng, kèm lý do cụ thể.
- Sau thay đổi nội dung đáng kể, yêu cầu tác tử kiểm tra toán học rà soát lại phần bị ảnh hưởng.
- Sau thay đổi thứ tự, cấu trúc phần, câu chuyển, điểm nhấn hoặc vai trò của trang, yêu cầu tác tử mạch kể chuyện rà soát lại theo phạm vi quy định ở mục 6.

### 8. Các tác tử chuyên trách tùy chọn

Tác tử lập kế hoạch hoặc điều phối viên có thể bổ sung các vai sau khi có lý do cụ thể và đầu ra rõ:

- **Tác tử nghiên cứu nguồn:** tìm và đối chiếu giáo trình, bài báo gốc, tài liệu chính thức, số liệu hoặc trích dẫn còn thiếu. Khi lấy thêm tài nguyên MIT OpenCourseWare, tác tử này phải tuân thủ toàn bộ quy tắc URL chính thức, quyền bên thứ ba, chống trùng, checksum, không ghi đè và cập nhật `sources/MIT/README.md`.
- **Tác tử ký hiệu và thuật ngữ:** lập bảng thuật ngữ Việt–Anh, kiểm tra lần xuất hiện đầu tiên, viết tắt và tính nhất quán của ký hiệu.
- **Tác tử ví dụ và bài tập:** xây dựng ví dụ số, phản ví dụ, câu hỏi kiểm tra, bài tập nhiều mức và đáp án; tự tính lại kết quả trước khi bàn giao.
- **Tác tử hình hóa:** thiết kế đồ thị, sơ đồ hoặc hình học minh họa; bảo đảm nhãn, đơn vị, mô tả thay thế và nguồn.
- **Tác tử ghi chú diễn giả:** viết phần diễn giải, chuyển ý, gợi ý giảng dạy và đáp án nằm ngoài phần hiển thị.
- **Tác tử khả năng tiếp cận:** kiểm tra tương phản, khả năng đọc, điều hướng bàn phím, văn bản thay thế và việc không dùng màu làm tín hiệu duy nhất.
- **Tác tử kiểm thử kỹ thuật:** kiểm tra HTML, KaTeX, plugin, tài nguyên, liên kết, lỗi trình duyệt và hiển thị trên các kích thước màn hình.
- **Tác tử đối chiếu mẫu:** so sánh bản triển khai với mẫu theo từng trang chiếu và ghi các sai khác có chủ ý hoặc ngoài ý muốn.
- **Tác tử biên tập storyboard:** chuyển báo cáo kiểm định storyboard thành quyết định biên tập, kiểm tra tính liên tục sau khi gộp, tách, thêm hoặc bỏ trang, và duy trì truy nguyên mã cũ–mới.
- **Tác tử kiến trúc học tập:** lập và rà bản đồ hành trình khái niệm, bảo đảm nhu cầu xuất hiện trước ký hiệu, trực quan và ví dụ chuẩn bị trực tiếp cho hình thức toán học, còn ứng dụng và bài tập đóng vòng học tập.
- **Tác tử lịch sử khái niệm:** đối chiếu nguồn lịch sử, chọn các mốc có quan hệ nhân quả với sự phát triển phương pháp và loại bỏ chi tiết chỉ có tính niên biểu.

Không tạo tác tử chỉ để lặp lại nhiệm vụ đã có. Mỗi tác tử tùy chọn phải có phạm vi độc lập, đầu vào xác định và sản phẩm bàn giao cụ thể. Các tác tử chỉ đọc có thể chạy song song; các tác tử sửa tệp phải chạy tuần tự để tránh xung đột.

### 9. Kiểm định cuối

Tác tử điều phối hoặc một tác tử kiểm định riêng phải:

- Kiểm tra HTML, đường dẫn nội bộ, ảnh, plugin, KaTeX, ghi chú diễn giả, số trang chiếu và liên kết từ trang chỉ mục nếu có.
- Kiểm tra mọi mã trang chiếu đều có đúng một mục trong `2627-1/planning/lec-NN/storyboard.md`, lý do tồn tại đã được tác tử storyboard chấp nhận, và quyết định biên tập khớp với bản RevealJS hiện tại.
- Kiểm tra `outline.md`, `storyboard.md` và `review-log.md` cùng phản ánh bản RevealJS hiện tại; rà mọi ảnh raster và chỉ chấp nhận ngoại lệ đã được ghi đủ nguồn, quyền, lý do và văn bản thay thế.
- Kiểm tra đủ năm báo cáo hoặc bản hợp nhất có truy nguyên từng vai; mọi vấn đề về vai trò trang, kết nối vào–ra, điểm nhấn và tuyến kể chuyện đã có trạng thái, quyết định và bằng chứng rà lại phù hợp.
- Kiểm tra bài có 5–7 `<section>` ngoài gồm mở đầu và kết luận, hoặc có ngoại lệ do người dùng yêu cầu rõ; đối chiếu chức năng, đầu vào, đầu ra và đóng góp của từng mạch với `storyboard.md`, `review-log.md` và bản RevealJS hiện tại.
- Tại thư mục gốc của kho, chạy `python3 -m reloadserver 8765`. Cổng là đối số vị trí; không dùng tùy chọn `--port`. Không thay đổi cổng nếu người dùng không yêu cầu. Ví dụ truy cập Bài giảng 01 qua `http://localhost:8765/2627-1/lecture-01-<chu-de>.html`.
- Mở đúng URL, duyệt mọi trang chiếu và các trang chiếu dọc; kiểm tra tràn chữ, chữ quá nhỏ, phần tử chồng lấn, công thức lỗi, ảnh vỡ, tương phản và điều hướng bàn phím.
- Kiểm tra riêng ở tỷ lệ 16:9 và một màn hình hẹp; tách hoặc rút gọn nội dung nếu có tràn.
- Dùng Codex Slides để rà soát trực quan sau cùng. Sau mọi chỉnh sửa hoặc kết xuất, xác minh thay đổi vừa bền vững trong dự án vừa hiển thị đúng ở trang chiếu tương ứng.
- Lặp lại vòng chỉnh sửa nếu còn lỗi chặn bàn giao hoặc nghiêm trọng. Không bàn giao chỉ dựa trên việc tệp HTML mở được.

## Cập nhật `index.html`

- Với học kỳ 2026–2027, học kỳ 1, cập nhật `2627-1/index.html` khi một bài giảng mới đã vượt kiểm định và tệp HTML đích thực sự tồn tại. Không thêm bài chưa hoàn thành hoặc liên kết dự kiến.
- Kế thừa cấu trúc và hành vi phù hợp từ `../deep-learning/2627-1/index.html`: tài liệu HTML tiếng Việt có thiết lập viewport; dùng bảng kiểu chung `../index-pages.css`; phần giới thiệu (`hero`) nêu đúng học kỳ, năm học và tên **Cơ sở toán học cho AI**; có mô tả ngắn về danh mục; có liên kết phụ quay về `../index.html`; phần bài giảng dùng lưới `term-grid`; cuối trang có chân trang nhận diện đúng học phần và học kỳ.
- Mỗi bài đã hoàn thành dùng một `article.term-card` theo thứ tự số bài, gồm nhãn `Bài N`, tiêu đề, mô tả một câu và một hàng ba tài nguyên: `Bài giảng`, `Ghi chú bài giảng`, `Bài tập`. `Bài giảng` liên kết tới `lecture-NN-<chu-de>.html`; hai tài liệu còn lại liên kết qua `material-viewer.html` khi Markdown đích đã vượt kiểm định. Tài liệu chưa có phải hiển thị `Chưa có` dưới dạng trạng thái, không phải liên kết giả.
- Giữ giao diện, lớp CSS và hành vi điều hướng nhất quán với mẫu chỉ mục trên, nhưng không sao chép tên học phần, danh sách bài, mô tả hoặc đường dẫn bài giảng của kho tham khảo. Không tạo kiểu nội dòng thay cho bảng kiểu chung nếu chưa có nhu cầu được kiểm chứng.
- Trang chỉ mục chỉ liên kết bộ trang chiếu và Markdown học tập công khai qua viewer. Không hiển thị hoặc liên kết `outline.md`, `storyboard.md`, `review-log.md`, thư mục `planning/`, nguồn nội bộ hoặc tệp làm việc.
- Sau khi sửa, kiểm tra tiêu đề trang, nhãn học kỳ, liên kết quay lại, thứ tự thẻ, đường dẫn tương đối, khả năng dùng bàn phím và hiển thị ở màn hình rộng lẫn hẹp.

## Quản lý phiên bản

- Mỗi bộ trang chiếu phải có một commit riêng và được đẩy lên kho từ xa trước khi bàn giao. Chỉ thực hiện bước này sau khi bộ trang chiếu đã vượt kiểm định cuối, `index.html` đã được cập nhật đúng và không còn lỗi `chặn bàn giao` hoặc `nghiêm trọng`.
- Phạm vi commit chỉ gồm các tệp thuộc đúng bộ trang chiếu: tệp `lecture-NN-<chu-de>.html`, tài sản trong `img/lec-NN/`, ba tệp trong `planning/lec-NN/`, mục tương ứng trong `index.html` và những thay đổi tệp dùng chung thực sự cần thiết cho bộ trang chiếu. Không đưa thay đổi không liên quan vào commit.
- Trước khi tạo commit, chạy `git status --short`, kiểm tra diff chưa staging trong phạm vi công việc và chạy `git diff --check`. Staging từng đường dẫn tường minh; không dùng `git add .`, `git add -A` hoặc lệnh tương đương có thể thu nạp ngoài phạm vi. Sau khi staging, kiểm tra lại `git status --short`, `git diff --cached` và `git diff --cached --check` trước khi commit.
- Không lấy vào commit, sửa, xóa hoặc hoàn tác các thay đổi đã có trước nhiệm vụ hay thuộc công việc của người khác. Nếu một tệp cần sửa đang có thay đổi ngoài phạm vi, chỉ staging đúng phần liên quan khi có thể xác định chắc chắn; nếu không thể tách an toàn thì dừng và báo rõ xung đột.
- Dùng thông điệp `feat(slides): <mô tả ngắn>` cho bộ trang chiếu mới hoặc phần nội dung mới đáng kể; dùng `fix(slides): <mô tả ngắn>` cho sửa lỗi một bộ trang chiếu hiện có. Thông điệp phải nêu được bài giảng hoặc chủ đề được thay đổi.
- Dùng `feat(materials): <mô tả ngắn>` cho hạ tầng hoặc tài liệu học tập mới và `fix(materials): <mô tả ngắn>` cho sửa lỗi ghi chú bài giảng, bài tập hoặc viewer. Commit tài liệu phải gồm Markdown nguồn, tài sản riêng, thay đổi chỉ mục và thay đổi viewer thực sự cần thiết; không đưa tệp planning bị bỏ qua vào commit.
- Đẩy nhánh hiện tại lên upstream của chính nhánh đó. Trạng thái kho được kỳ vọng hiện nay là `main` theo dõi `origin/main`; phải kiểm tra lại trước khi đẩy. Không tự đổi nhánh, tạo nhánh, rebase, sửa commit đã có hoặc force-push.
- Sau khi đẩy, xác minh commit cục bộ đã hiện diện trên upstream. Nếu push thất bại, giữ nguyên commit cục bộ, báo hash commit, thông báo lỗi và hướng xử lý đề xuất; không tuyên bố đã đẩy hoặc đã hoàn thành bàn giao.

## Tiêu chí hoàn thành

Chỉ coi bộ trang chiếu hoàn thành khi:

- Tuân theo trang chiếu mẫu và tài liệu người dùng theo đúng thứ tự ưu tiên.
- Toàn bộ nội dung chính bằng tiếng Việt và đạt giọng văn quy định.
- Năm báo cáo rà soát đã có và các lỗi bắt buộc đã được xử lý.
- Ba tệp quy trình của bài mới nằm trong `2627-1/planning/lec-NN/`; `storyboard.md` bao phủ toàn bộ trang chiếu và không còn trang có lý do tồn tại yếu hoặc chưa được xử lý.
- Mọi khái niệm trọng tâm hoàn thành hành trình `nhu cầu → trực quan → ví dụ → hình thức/toán học → ứng dụng → bài tập`, hoặc có ngoại lệ được giải thích và được tác tử kiểm định storyboard chấp nhận.
- Bài có 5–7 mạch nội dung lớn tương ứng với các `<section>` ngoài, gồm mở đầu và kết luận; mỗi mạch có chức năng riêng, điểm nối vào–ra và đóng góp kiểm chứng được cho vấn đề trung tâm, hoặc có ngoại lệ do người dùng yêu cầu rõ và đã được ghi nhận.
- Các công thức, ví dụ số, giả thiết và nguồn đã được kiểm tra.
- Bộ trang chiếu chạy tại cổng `8765`, không có tài nguyên hỏng hoặc lỗi hiển thị nghiêm trọng.
- `2627-1/index.html` liên kết đúng tới bài đã hoàn thành, dùng cấu trúc chỉ mục quy định và không lộ tài liệu quy trình nội bộ.
- Bản RevealJS trong kho và phiên bản đã rà soát trong Codex Slides phản ánh cùng nội dung được duyệt.
- Bộ trang chiếu có một commit riêng, phạm vi commit đã được kiểm tra, commit đã được đẩy thành công lên upstream của nhánh hiện tại và commit cục bộ đã được xác minh có trên upstream.

Khi bàn giao, nêu ngắn gọn: tệp trang chiếu, URL xem cục bộ, nguồn chính, nguồn MIT OpenCourseWare bổ sung nếu có, hình đã vẽ lại và ngoại lệ raster, các kiểm tra đã chạy, sai khác có chủ ý so với mẫu, hash và thông điệp commit, nhánh cùng upstream đã đẩy, kết quả xác minh sau push và các giới hạn còn lại. Nếu push thất bại, không bàn giao như một bộ trang chiếu đã hoàn thành; báo hash commit cục bộ, lỗi và hướng xử lý đề xuất.
