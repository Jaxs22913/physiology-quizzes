# RPG Campaigns Manifest

One campaign per class comprehensive exam. Each campaign gets a unique genre —
don't reuse a genre already listed here when adding a new campaign.

| Campaign ID | Exam | Genre | Title | File | Status |
|---|---|---|---|---|---|
| `physio-exam3` | Physiology Exam 3 Comprehensive | Noir mystery | Thicker Than Water | `rpg/physio-exam3.html` | Live (demo) |

**Genres used so far:** Noir mystery.

**Genre pool still available:** high fantasy, space opera, pirate voyage, post-apocalyptic, heist, samurai/wuxia, cosmic horror, wild west, time-travel caper.

## Adding a new campaign

1. Inventory that class's existing topic quizzes and comprehensive/master exam(s) — confirm the question schema (`{topic, io, q, opts, c, cite}`) and identify which existing questions may **not** be reused verbatim (anything already in a master exam).
2. Build a 100-question bank: ~50 high-yield existing questions (deduped against every master exam form) + ~50 new questions weighted toward thin IOs, matching that class's own question-framing convention (see each class's existing quizzes — don't assume Physiology's mechanism/cause-effect framing carries over uniformly).
3. Write `<campaignId>-BANK_AUDIT.md` documenting every question's topic/IO/source/rationale, and check it into `rpg/`.
4. Write `STORY.json` (unique genre/setting/protagonist/antagonist, zones = the exam's topic sections, boss `hpSegments` = zone number + 2, final boss gets `finalBossRegen: true`). Zero medical facts in the prose — grep-verify against a list of the class's own content terms before shipping.
5. Design `MAP.json` (grid-authoritative collision, never derived from SVG at runtime) + a matching original SVG generated from the same grid data so visuals and collision can't drift apart.
6. Reuse existing Arcade flashcard decks for that topic as campfire content where they exist; otherwise generate fronts/backs from the zone's question bank.
7. Stamp the shared engine (`rpg/physio-exam3.html`'s embedded `<script>` block is the reference implementation) with the new campaign's JSON — the engine itself should need zero campaign-specific code changes.
8. Add one entry to `RPG_CAMPAIGNS` in `arcade.html` and one row to this table.
9. Run the full QA pass: `tools/check_console_errors.py` site-wide, bank integrity checks (100 unique, ~50/50 split, zero verbatim master-exam overlap, balanced answer keys, no 3-in-a-row), a scripted walkthrough (battle both paths, campfire heal+lock, boss defeat + gate open, elite spawn/resolve), and a byte-diff confirming every pre-existing file is untouched.
