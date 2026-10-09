# CLAUDE.md

This repo holds the RevealJS lecture decks, lecture notes and exercises for **Cơ sở toán học cho AI** (UET.AI2012). The current semester is `2627-1/`.

`AGENTS.md` is the full, authoritative specification, written in Vietnamese. This file tells Claude Code how to apply it: repo layout, commands, the rules most often broken, and how the multi-agent workflow maps onto Claude Code tools. Precedence: the user's instructions first, then `AGENTS.md`, then this file. Read the relevant section of `AGENTS.md` before any deck or materials work.

## Repo map

| Path | Contents |
|---|---|
| `2627-1/lecture-NN-<chu-de>.html` | One RevealJS deck per lecture |
| `2627-1/lecture-style.css` | The **only** course stylesheet, shared by every published deck |
| `2627-1/revealjs/`, `plugin/`, `vendor/katex/` | Local runtime; decks must not load anything from outside `2627-1/` |
| `2627-1/img/lec-NN/` | SVG assets for each lecture |
| `2627-1/planning/lec-NN/` | `outline.md`, `storyboard.md`, `review-log.md` (tracked in git even though `.gitignore` lists them) |
| `2627-1/materials/lec-NN/` | `lecture-note.md`, `exercises.md`, the published sources |
| `2627-1/material-viewer.html`, `material-local-data.js` | Markdown viewer and its bundle for opening under `file://` |
| `2627-1/index.html` | Semester index; links only to finished public decks and materials |
| `2526-2-another-course/` | Structure and visual template; never link to it at runtime |
| `sources/` | Syllabus DOCX, source slides, MIT OCW PDFs (gitignored) |

Lectures 00 and 01 also have older planning files in the `2627-1/` root. Leave them where they are unless the user asks to move them.

## Commands

```bash
python3 -m reloadserver 8765                      # from repo root; port is positional, never --port
# view: http://localhost:8765/2627-1/lecture-NN-<chu-de>.html

python3 2627-1/scripts/sync-local-materials.py    # after ANY edit to materials/*.md
python3 2627-1/scripts/sync-local-materials.py --check
git diff --check
```

Headless Chromium through Python Playwright is installed and is the visual-check tool (see Visual verification).

## Hard rules

- Never read, load or send `.env` or `.env.*`. Never put secrets in prompts, logs or commits.
- Do not use OpenRouter, `openrouter-mcp/`, or direct model API/CLI calls to stand in for sub-agents.
- **CSS:** decks use `2627-1/lecture-style.css` only.
  - No `<style>` blocks, no static `style=""`, no per-lecture CSS files, no JS that injects styles.
  - Styles specific to one lecture go in the shared file, scoped with `:where(html[data-lecture="NN"])` plus a meaningful class or `data-slide-id`.
  - Editing shared CSS means checking every published deck at wide and narrow sizes.
- **RevealJS config:** `lang="vi"`; outer `<section>` = one strand, inner `<section>` = one slide; footer at the end of `.slides`.
  - Settings: `controlsLayout: "edges"`, `slideNumber: true`, `hash: true`, `hashOneBasedIndex: true`.
  - Plugins: `RevealMath.KaTeX`, `RevealNotes`, `RevealHighlight`.
- **Paths** are relative to `2627-1/`, and core assets never come from a CDN.
- **Maths and figures:** in Markdown use only `$...$` and `$$...$$`. Build formulas, tables and code with KaTeX, HTML or code blocks, never as images.
  - Diagrams are local SVGs with `alt` text, or `role="img"` with a `title` when inline.
  - Keep a raster only with a justification recorded in `review-log.md`. No AI-generated images standing in for data or evidence.
- **Index:** `index.html` never links `planning/`, outlines, storyboards, review logs or sources.

## Writing course content (Vietnamese)

Everything a student sees is formal, academic, native Vietnamese: slide text, titles, speaker notes, lecture notes, solutions.

- **English:** only for proper names, standard symbols and established algorithm or library names. A new term's English name goes in parentheses at first use.
- **Abbreviations:** spell out in Vietnamese first, abbreviation in parentheses.
- **Banned tone:** no exclamations, praise, slogans or rhetorical questions.
  - No simulated speech or instructor directions, e.g. "chúng ta hãy…", "nhấn mạnh với sinh viên", "chuyển sang trang sau".
  - Learning tasks ("Tính", "Xác định", "Chứng minh") are fine.
- **Terminology:** write `lồi chặt (còn gọi là lồi nghiêm ngặt)` the first time, `lồi chặt` afterwards.
- **Titles:** name the concept. No questions ("Tại sao…?") and no progress phrasing ("Từ … đến …").
- **Bullets:** at most two lines each; move explanation into the notes.
- **Keep off the slide face and out of speaker notes:**
  - slide codes (`RP02`, `A01`…), workflow badges ("Giảng chính", "Tự học"), timings, and "MIT 6.079…" source footers;
  - sources go in the notes or on a references slide.
- **Questions on slides** use the label **"Câu hỏi:"**.
- **Speaker notes** are short academic explanation: the assumptions, what a formula or figure means, easy confusions, the link to the next result, and hints or solutions. They must not just repeat the slide.
- **no-ai-slop is mandatory.** It is installed as the user-level Claude skill `no-ai-slop` (`~/.claude/skills/no-ai-slop/`). Load it with the `Skill` tool, or read `SKILL.md` and `eval.md` there, before editing or reviewing text. Sub-agents must load it too.
  - Editors use Edit mode, then self-check against `eval.md`.
  - Read-only reviewers use Detect mode: quote the problem line and propose a fix.
  - Academic register and mathematical precision take priority over the skill's voice and humour advice.

## Deck structure and content

- **Strands:** 5–7 outer sections, including an opening and a conclusion.
  - Each strand has its own function, an input from the strand before, and an output the next one uses.
  - Going outside 5–7 needs an explicit user request, recorded in `storyboard.md` and `review-log.md`.
- **Common theoretical frame:** one per lecture, fixed in `outline.md` and `storyboard.md` before slides are finalised.
  - It covers the central problem, shared objects and notation, assumptions, the chain definition → result → method, and the limits of applicability.
- **Concept journey for every core concept:** need → intuition → example → formal statement → application → exercise.
  - A lead-in example may sit with the need.
  - Steps may share a slide, but may not be reordered or silently dropped.
  - Never open a core concept with a definition before its need and intuition exist.
- **One central point per slide.** Split long derivations; never shrink text to fit.
  - Body text is ≥ 0.75em; below 0.65em only for unavoidable short captions.
- **Formal statements:** state domain, assumptions, dimensions and types before use.
  - Label definitions, theorems, remarks, intuition and examples.
  - For theorems and algorithms, give inputs, outputs, conditions and conclusion.
  - Distinguish =, ≈, ∝, convergence and equivalence.
- **Slide links** say which result is inherited, which assumption changes, and which limit creates the next need. Signposts like "tiếp theo chúng ta…" don't count.
- **Storyboard entries:** every slide has exactly one entry in `planning/lec-NN/storyboard.md`.
  - Each entry gives: why the slide exists, the need or gap it fills, input and output, its place in the frame, the LLO/CLO it supports, and a decision (`thêm | giữ | sửa | gộp | tách | bỏ`) with a reason.
  - The storyboard also carries the concept-journey map.
- **Sources:**
  - **Syllabus:** the official DOCX in `sources/` fixes sessions, scope, LLO/CLO and assessment. Never invent timings.
  - **User-supplied template slides:** keep their order and layout unless fixing an error.
  - **MIT OCW:** add resources only through the procedure in `AGENTS.md`: official URL, licence and third-party check, temp download, SHA-256 dedupe, no overwrite, and an entry in `sources/MIT/README.md`. Ignore `._*` files.

## Multi-agent workflow in Claude Code

`AGENTS.md` requires an orchestrator plus sub-agents; don't do the whole workflow in one role.

This model assignment is a standing user instruction (2026-10-07) and matches `AGENTS.md` §"Điều phối mô hình trong dự án".

- **Master and quality controller:** this session runs Claude Fable 5.1 (`claude-fable-5-1`) at effort `medium`.
  - It splits the work, writes the briefs, merges results, and accepts or rejects every sub-agent output.
  - It does not take a sub-agent role itself. Drafting, reviewing and editing go to sub-agents.
  - If the session runs another model or effort, say so before delegating, and ask the user to switch (`/model`, effort setting). Do not treat that session as a valid master.
- **Sub-agents:** every workflow role, including agents spawned by sub-agents, runs Claude Opus 5.5 (`claude-opus-5-5`) at effort `high`.
- **Quality control of every output:** no sub-agent output reaches the next stage, a repo file or the user until the Fable 5.1 master has reviewed it.
  - **Plans and reports:** check every finding and claim against the cited file or line. Re-derive the maths and constants.
  - **Written files:** read the diff. Run the checks listed in this file (visual check, `--check` sync, `git diff --check`).
  - **Decision:** record `chấp nhận | yêu cầu sửa | bác bỏ` with a reason in `review-log.md`. Send the requested fixes back to the same agent with `SendMessage`, and review the result again.
  - Only Fable 5.1 approval counts. A sub-agent reviewing another sub-agent does not count as quality control.
- **Creating agents:** use the `Agent` tool with `model: "opus"` and `effort: "high"`.
  - Do not use `subagent_type: "fork"`: a fork inherits the master's model (Fable) and ignores the model override. Use `general-purpose`, or a `.claude/agents/` definition pinned to `claude-opus-5-5` at `high` once one exists.
  - Never assign a workflow role to an agent type pinned to another model.
  - Continue an existing agent with `SendMessage` rather than spawning a new one.
- **Stopping rule:** if no Opus 5.5 sub-agent can be created, say so and stop the dependent work. The master does not do that work itself.
- **Concurrency:** read-only agents may run in parallel. **Only one agent writes files at a time.**
- **Every brief states:** role, inputs, output, file scope, done condition, and "do not commit".
- **Logging:** record each agent's role, type, model and effort in `review-log.md`, using the tool call as evidence rather than the agent's own claim. Also record the master's review decision for each output.

| Stage | Role(s) | Writes files? |
|---|---|---|
| Plan | Planning agent: scope, phases, frame, concept map, risks | No |
| Source analysis | Template-to-content mapping, syllabus cross-check, gaps | No |
| Draft | Authoring agent: outline, storyboard, review log, deck, notes | Yes |
| Storyboard gate | Checks every slide's reason to exist and the six-step journeys | No |
| Review | Five independent roles: student, expert, math accuracy, academic/pedagogical critique, storyline and linking | No |
| Revise | Editor merges the reports, fixes, records rejected suggestions | Yes |
| Recheck | Math on changed content. Storyline on the changed slides, ±2 neighbours and section boundaries; the whole deck if the opening, conclusion or thesis changed | No |
| Final check | Opus 5.5 verifier runs technical, visual, planning-sync and git checks; the Fable 5.1 master reviews the evidence and signs off | — |

After every stage, the Fable 5.1 master reviews the output before the next stage starts.

- **Report format:** reviews return findings as `mức độ | trang chiếu | vấn đề | bằng chứng | đề xuất sửa`.
  - Severities are `chặn bàn giao`, `nghiêm trọng`, `trung bình` and `nhẹ`.
  - Every blocking and serious finding must be resolved.
- **Logging findings:** record each one in `review-log.md` with its status and decision. Never delete resolved findings.
- **Scaling to small edits:** a one-slide edit still goes editor → math and storyline rechecks on the affected slides → browser check → log. The full five-role review isn't needed.

## Visual verification

Required after every deck change. Only claim a visual check you actually ran.

1. Start `python3 -m reloadserver 8765` in the background from the repo root.
2. With Playwright Chromium, open the deck and jump to a slide by ID. Use `Reveal.getIndices(document.querySelector('section[data-slide-id="X"]'))`, then `Reveal.slide(h, v, 99)`, where `99` reveals all fragments.
3. Capture **1600×900** (16:9) and **390×844** (narrow).
   - On narrow screens the content scrolls inside `.lecture-viewport`; scroll it to the end and capture again.
4. Check: no console or page errors, no `.katex-error`, content height ≤ frame at 16:9, no horizontal overflow, body font sizes above the minimum, keyboard navigation works, no overlaps.
   - Ignore `.katex-mathml`, which is visually hidden.
5. View the screenshots yourself before reporting.
6. Keep screenshots under `/tmp/claude-1000/` or the session scratchpad, not in the repo.

Known quirk: `.lec-grid` centres its columns vertically (`align-items: center`), so column headings can sit at different heights. Changing that means a shared-CSS regression pass across every deck.

## Lecture notes and exercises

- **Viewer contract:** `material-viewer.html?doc=materials/lec-NN/{lecture-note,exercises}.md&deck=lecture-NN-<chu-de>.html`, with both parameters naming the same lecture. The one exception is a supplementary lecture that has materials but no deck, or a rewritten note kept for comparison (currently 05c and 01b, listed in `DECKLESS_LECTURES` in `material-viewer.js`): it opens with `doc` alone.
- **No build step:** no Node.js, no HTML generation. The pipeline is: protect maths → Marked → DOMPurify → restore maths → KaTeX.
- **Textbook standard for `lecture-note.md`:** `AGENTS.md` §"Tiêu chuẩn giáo trình cho ghi chú bài giảng" is binding. A note is a self-contained textbook chapter a student can understand by reading alone: problem before tool, every formula wrapped in prose, numbered definitions/theorems/examples, full proofs or a paged source, worked examples with a check line, linking paragraphs between concepts, between theorems and to AI applications ("Trong học máy"), application scenarios, chapter summary and exercises with solutions. Use `materials/_templates/lecture-note.md`.
- **Blocks:** `::: definition|theorem|proposition|lemma|corollary|remark|algorithm|example|application|derivation|proof|exercise|hint|solution Optional title`, closed by `:::`, not nested. A title replaces the default Vietnamese label. The list lives only in `DIRECTIVE_LABELS` in `material-viewer.js`. `proof`, `hint` and `solution` are collapsed by default.
- **Format:** each file starts with one `#` heading. Tables need header rows, figures need alt text.
- **Keeping slides and materials in sync:** when a deck changes notation, assumptions, examples, conclusions or concept order, review that lecture's note and exercises too. Then run the sync script and commit `material-local-data.js` with the Markdown.

## Git

- **Standing permission:** the user allows commit **and push** after each substantial, checked milestone without asking again. This covers decks, materials, infrastructure and `AGENTS.md`/`CLAUDE.md`.
- **Branch:** `main` tracks `origin/main`.
  - Never create or switch branches, rebase, amend, force-push or delete remote branches.
- **Before committing:**
  - Run `git status --short` and `git diff --check`.
  - Stage explicit paths only; never `git add .` or `-A`.
  - Then run `git diff --cached --check`.
- **Commit scope:** only files from the finished work. For a deck that means the deck HTML, `img/lec-NN/`, the tracked `planning/lec-NN/` files, the related `index.html` entry, and shared files that truly had to change. Never stage someone else's pending changes.
- **Commit prefixes:**
  - `feat(slides)` / `fix(slides)` for decks;
  - `feat(materials)` / `fix(materials)` for notes, exercises and viewer;
  - `docs(agents)` for `AGENTS.md`/`CLAUDE.md`.
  - The message must name the lecture or topic, and may be in Vietnamese.
- **After pushing:** confirm with `git fetch` and `git branch -r --contains HEAD`. If the push fails, report the local hash and the error, and do not claim the work is delivered.

## Done means

- Every blocking and serious finding is resolved and logged.
- `outline.md`, `storyboard.md` and `review-log.md` match the current deck.
- The browser check passed at both sizes.
- Materials are in sync, and `index.html` is updated for completed lectures only.
- Commits are pushed and verified.

The handoff lists: deck file and local URL, main sources, redrawn figures and raster exceptions, checks run, intended deviations from the template, commit hash, push verification, and remaining limits.
