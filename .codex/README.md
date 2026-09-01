# Codex điều phối worker qua OpenRouter MCP

Khởi chạy Codex bằng `./codex-orchestrator`. Codex chính vẫn dùng nhà cung cấp
đang cấu hình cho người dùng. Ba worker dự án được gọi bằng các tiến trình CLI
trong `openrouter-mcp/`, không qua `collaboration.spawn_agent`:

- `openrouter_reader` → `openrouter-mcp-reader`;
- `openrouter_reviewer` → `openrouter-mcp-reviewer`;
- `openrouter_writer` → `openrouter-mcp-writer`.

## Khởi chạy

Đặt khóa trong `.env` ở gốc kho; cầu nối chỉ nạp `OPENROUTER_API_KEY` ở phía
điều phối viên và không đưa tệp hoặc giá trị khóa cho worker:

```bash
OPENROUTER_API_KEY="..."
./codex-orchestrator
```

Có thể truyền thẳng câu lệnh hoặc tùy chọn Codex:

```bash
./codex-orchestrator "Dùng các tác tử theo quy trình trong AGENTS.md."
```

Có thể dùng biến môi trường đã export thay cho `.env`. Cài môi trường cầu nối
một lần bằng `cd openrouter-mcp && uv sync`. Mỗi lệnh worker phải dùng `--json`
để trả metadata model/provider cùng nội dung.

Sau khi cài đặt hoặc sửa `AGENTS.md`, mở một phiên Codex mới bằng
`./codex-orchestrator` để dự án và chỉ dẫn điều phối được nạp từ đầu. Cầu nối
này cố ý không khai báo GLM dưới `[agents]`: các worker GLM chạy qua OpenRouter
Chat Completions, còn Codex chính vẫn dùng nhà cung cấp và mô hình của phiên
điều phối.

## Mô hình worker và trách nhiệm điều phối

Mô hình worker hiện tại là `z-ai/glm-5.3-flash`. Mỗi worker chỉ nhận một nhiệm
vụ hẹp, có đầu vào, đầu ra và phạm vi tệp cụ thể. Reader và reviewer chỉ nhận
công cụ đọc. Writer nhận `write_text_file` và `replace_text_file`, nhưng chỉ
ghi được bên trong `--repo-root` của tiến trình. Mọi vai trò đều bị chặn đọc,
tìm kiếm hoặc ghi `.env` và các biến thể `.env.*`.

Codex chính phải đối chiếu `requested_model`, `observed_model` và `provider`
do cầu nối thu từ phản hồi OpenRouter; lời tự khai trong nội dung worker không
phải bằng chứng runtime. Nếu một worker lỗi, dừng giai đoạn phụ thuộc và báo
nguyên văn lỗi. Không gọi worker mặc định thay thế.

Để đổi mô hình, đặt `OPENROUTER_MODEL` hoặc truyền `--model`. Mô hình thay thế
phải hỗ trợ tool calling trên OpenRouter.

Không thêm khóa API, tệp `.env`, lịch sử phiên hoặc dữ liệu xác thực vào kho.

## Kiểm thử khói

Sau khi đã đặt `OPENROUTER_API_KEY`, mở một phiên mới và giao nội dung trong
`.codex/workflow-smoke-test-prompt.md`. Kiểm thử gọi một reader, hai reviewer
song song và một writer chỉ ghi trong `/tmp`, rồi xác nhận kho không phát sinh
thay đổi. Nếu chưa có khóa, có thể chạy bộ kiểm thử cục bộ không gọi mạng:

```bash
cd openrouter-mcp
uv run python -m unittest discover -s tests -v
```
