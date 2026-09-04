# Stand page and agent integrations

## Stand page
- Add `StandFormula` for the static pixel-font formula and scroll-linked chart movement, with reduced-motion support.
- Extend `About` with Stand-only mark, eyebrow, default copy, and formula-panel swap.
- Add a Stand-only “First 30 days” section, compose the new `/stand` page from the existing YC shell, and register the route.
- Load the requested pixel font in the document head and verify the page at desktop and mobile sizes.

## Agent integrations
- After the required access choice is confirmed, expose a small set of fast portfolio tools through an MCP server and validate its manifest.
- Keep this work preview-only until publishing is explicitly requested.

## Assumption
The Stand page takes priority while MCP access remains undecided. No existing page content or behavior will be changed beyond the shared About component gaining opt-in Stand props.
