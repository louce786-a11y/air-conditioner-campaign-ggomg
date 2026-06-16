A horizontal 16:9 triptych image (1536×864 landscape style) with three equal vertical panels, separated by pure #00FF00 green-screen color bands of ~5px width.

=== LAYER 1: GREENSCREEN ===
Solid #00FF00 chroma key background. Bands are ~5px wide between regions. NO decoration.

=== LAYER 2: REGIONS (3 equal panels) ===
3 vertical panels, each 1/3 of total width:
- LEFT panel: 5 cards in gentle arc, position 3 = center largest - full visual preview
- MIDDLE panel: FULL background layer with: top logo (冰风空调) + subtitle (夏日冰爽特惠) + focus character (Q版小空调机吉祥物) + scene (cool AC showroom, ice blue wall, white AC units, snowflakes, mint leaves, water droplets) + decorations. This is the pure visual base layer. NO interactive elements: NO 5 coupon cards, NO top round help button, NO bottom CTA button, NO highlight glow ring.
- RIGHT panel: pure #00FF00 green-screen - UI element inventory

=== LAYER 3: 9:16 INNER CANVASES ===
Each panel has a vertical 9:16 portrait canvas of ~486px wide × ~864px tall, centered with ~13px greenscreen greenscreen padding on left/right.

=== LAYER 4: CONTENT ===

--- LEFT PANEL (full visual preview) ---
On the Cool summer air conditioner showroom interior, ice blue gradient wall, white AC wall-mounted units on display, frosty snowflakes floating, mint green leaves, refreshing cool breeze effect, water droplets and ice crystals scattered, light wood floor, soft sky-blue glow, kawaii style.
- Top: brand logo "冰风空调" — layout is FLEXIBLE (round badge / horizontal banner / rectangle plaque / simple text), styled with #1E88E5 text + #A8E6CF border. Position: top center. Below logo: subtitle "夏日冰爽特惠" (smaller font, themed).
- Top-right: Single small round button "说明" (#A8E6CF "?" 36x36).
- Center: Focus character Q版小空调机吉祥物（白色方形机体，正面圆角笑脸，蓝色出风口，挂着小雪花/冰晶，微笑挥手） (character stands naturally on the store floor / scene ground, NO wooden pedestal, NO cartoon stage, NO display platform, NO podium), soft glow, NOT blocking Logo/cards/buttons.
- Middle-lower: 5 coupon cards in a STRAIGHT HORIZONTAL ROW, side by side, left to right:
  - Position 1 (leftmost, smallest, no highlight): 微凉体验券 9折, card x range 8%-24% (中心 x ~16%)
  - Position 2 (inner left, mid, no highlight): 冰爽畅享券 7折, card x range 26%-42% (中心 x ~34%)
  - Position 3 (CENTER, LARGEST, gold border for visual distinction, NO highlight glow, NO star sparkles): 半价冰风王 5折, card x range 44%-56% (中心 x ~50%)
  - Position 4 (inner right, mid, NO highlight glow, NO sparkles): 极寒狂欢券 6折, card x range 58%-74% (中心 x ~66%)
  - Position 5 (rightmost, smallest, no highlight): 清凉派对券 8折, card x range 76%-92% (中心 x ~84%)
  All cards: #F0F8FF bg, #1E88E5 bold text, #A8E6CF border. Position 3 has gold border (#F4C95D) instead of accent border, but NO glow, NO sparkles, NO halo, NO aura. Position 4 uses standard accent border like common cards.
  Cards MUST NOT overlap each other. Maintain at least 20px spacing.
  Each card shows ONLY: name + discount. NO probability text on cards. NO C1/C2/C3/C4/C5 labels.
- Bottom: Big rounded "立即抽奖" button (#A8E6CF bg + #F0F8FF text + soft glow).

--- MIDDLE PANEL (FULL background layer, NOT just character!) ---
FULL background layer with: top logo (冰风空调) + subtitle (夏日冰爽特惠) + focus character (Q版小空调机吉祥物) + scene (cool AC showroom, ice blue wall, white AC units, snowflakes, mint leaves, water droplets) + decorations. This is the pure visual base layer. NO interactive elements: NO 5 coupon cards, NO top round help button, NO bottom CTA button, NO highlight glow ring..
This panel MUST include:
- Top: brand logo "冰风空调" in the SAME style/position/size as LEFT panel
- Below logo: subtitle "夏日冰爽特惠" in the SAME style/position as LEFT panel
- Center-top: focus character (Q版小空调机吉祥物（白色方形机体，正面圆角笑脸，蓝色出风口，挂着小雪花/冰晶，微笑挥手）) in the SAME position as LEFT panel
- Background: Cool summer air conditioner showroom interior, ice blue gradient wall, white AC wall-mounted units on display, frosty snowflakes floating, mint green leaves, refreshing cool breeze effect, water droplets and ice crystals scattered, light wood floor, soft sky-blue glow, kawaii style, in the EXACT SAME style/colors/composition as LEFT panel
This panel MUST NOT include:
- 5 coupon cards
- Top round help button ("?")
- Bottom CTA button ("立即抽奖")
- Highlight glow ring
This panel IS the base visual layer that LEFT panel composites the interactive elements on top of. Keep logo, subtitle, character, scene pixel-aligned with LEFT panel for clean compositing.

--- RIGHT PANEL (UI element inventory, MUST match LEFT panel EXACTLY in position) ---
9:16 phone canvas with pure #00FF00 green-screen INSIDE canvas. NO background, NO character, NO decorations.
This panel is the UI ELEMENT INVENTORY of LEFT panel. CRITICAL: every element in RIGHT panel MUST match LEFT panel EXACTLY in position and size:
- 5 coupon cards: SAME x, y, width, HEIGHT as LEFT panel (pixel-perfect, same height is mandatory)
- top_button (small round button): SAME size (e.g. 36x36), SAME position as LEFT panel
- cta_button (rounded CTA): SAME size, SAME position as LEFT panel
No offset, no gap, no re-arrangement. ONE-TO-ONE mirror.
CRITICAL — NO magenta cut guides: There is NO 2px #FF00FF magenta border around any element in this panel. NO cutting guide lines. NO purple/pink/violet lines anywhere. Just clean element shapes on green-screen.

Use the SAME 3-tier scale as LEFT panel:
- coupon_position_1 (OUTER, S1 ≈ 0.86x of BaseCard, smallest, no highlight, accent border) = matches LEFT panel position 1 EXACTLY
- coupon_position_2 (INNER, S2 ≈ 1.00x of BaseCard, mid, no highlight, accent border) = matches LEFT panel position 2 EXACTLY
- coupon_position_3 (CENTER, S3 ≈ 1.18x of BaseCard, LARGEST, gold border for visual distinction, NO highlight glow, NO star sparkles) = matches LEFT panel position 3 EXACTLY
- coupon_position_4 (INNER, S2 ≈ 1.00x of BaseCard, mid, NO highlight glow, NO sparkles, accent border) = matches LEFT panel position 4 EXACTLY
- coupon_position_5 (OUTER, S1 ≈ 0.86x of BaseCard, smallest, no highlight, accent border) = matches LEFT panel position 5 EXACTLY

Arrange these 7 elements (no #FF00FF cutting guide, no highlight_glow element), independent, non-overlapping. ALL elements MUST match LEFT panel in size and position:
1. top_button: #A8E6CF ? round button (36x36, SAME size as LEFT panel) — labeled "说明"
2. coupon_position_1: 微凉体验券 9折 (SAME height as LEFT panel position 1)
3. coupon_position_2: 冰爽畅享券 7折 (SAME height as LEFT panel position 2)
4. coupon_position_3: 半价冰风王 5折 (largest, gold border, NO glow, NO sparkles, SAME height as LEFT panel position 3)
5. coupon_position_4: 极寒狂欢券 6折 (NO glow, NO sparkles, SAME height as LEFT panel position 4)
6. coupon_position_5: 清凉派对券 8折 (SAME height as LEFT panel position 5)
7. cta_button: #A8E6CF rounded "立即抽奖" button, #F0F8FF text (SAME size as LEFT panel cta_button)

=== ABSOLUTE CONSTRAINTS ===
- TOTAL IMAGE: horizontal 16:9 landscape (not square, not 4:3). Three panels equal width.
- INNER CANVAS: vertical 9:16 portrait (not square, not horizontal).
- NO 排行, 记录, 我的 UI elements.
- NO real QR codes, no real coupon codes.
- All Chinese text crisp: 冰风空调, 夏日冰爽特惠, 9折, 8折, 7折, 6折, 5折, 立即抽奖.
- 半价冰风王 5折 MUST be in CENTER (Position 3), MUST be the LARGEST card.
- All cards SAME border style (#F0F8FF bg + #1E88E5 text + #A8E6CF border), EXCEPT Position 3 (center) which uses #F4C95D gold border for visual distinction. NO highlight glow, NO star sparkles, NO halo, NO aura on any card. NO highlight_glow element anywhere.
- NO C1/C2/C3/C4/C5 labels visible on cards. Only show: name + discount. NO probability text on cards.
- NO card icons inside coupon slots — only text.
- Cards MUST NOT overlap. Maintain 20px spacing minimum.
- No full-screen glow, no over-exposure, no UI overlap, no element overflow.
- 夏日清凉空调风 / 冰爽薄荷 / kawaii 萌系, soft gradient, high quality, commercial-grade product design.