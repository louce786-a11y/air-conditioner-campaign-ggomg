#!/usr/bin/env python3
"""
v4 切图（最终版）：从 preview.png 自动检测 5 张卡 → cream 卡身透明化
- 找 cream 米白像素 (RGB > 220, 215, 200, 三通道接近)
- 列密度找卡位 x 边界
- 行密度找卡位 y 边界（避开 CTA 按钮）
- cream 像素 → alpha=0 (透明)，其他 → alpha=255 (不透明)
- 输出 RGBA 透明 PNG
"""
import numpy as np
from PIL import Image
from pathlib import Path

HERE = Path(__file__).parent
DEMO = HERE / "demo"
CARDS = DEMO / "cards"
CARDS.mkdir(exist_ok=True)

src = DEMO / "preview.png"
img = Image.open(src)
arr = np.array(img)
H, W = arr.shape[:2]
print(f"📐 preview.png: {W}×{H}")

# === 1. 自动检测卡身 cream 米白 ===
r, g, b = arr[:,:,0], arr[:,:,1], arr[:,:,2]
is_card_body = (r > 230) & (g > 225) & (b > 215) & (np.abs(r.astype(int) - g.astype(int)) < 12) & (np.abs(g.astype(int) - b.astype(int)) < 25)
exclude_blueish = (b.astype(int) - r.astype(int)) > 15
exclude_woodish = (r.astype(int) - b.astype(int)) > 25
is_card_body_strict = is_card_body & ~exclude_blueish & ~exclude_woodish

# === 2. 列密度找卡位 x 边界 ===
Y_TOP, Y_BOT = 560, 680  # 限制 y 范围，避开 CTA
col_density = is_card_body_strict[Y_TOP:Y_BOT, :].sum(axis=0)
threshold = 20
segments = []
in_card = False
start = 0
for x in range(W):
    if col_density[x] > threshold and not in_card:
        start = x; in_card = True
    elif col_density[x] <= threshold and in_card:
        if x - start > 15:
            segments.append((start, x - 1))
        in_card = False
if in_card and W - start > 15:
    segments.append((start, W - 1))
assert len(segments) == 5, f"Expected 5 segments, got {len(segments)}: {segments}"

print("5 张卡自动检测边界:")
for i, (s, e) in enumerate(segments):
    print(f"  Card {i+1}: x={s}-{e} (w={e-s+1}, 中心 {(s+e)//2}px = {(s+e)//2/W*100:.1f}%)")

# === 3. 切图 y 范围：570-680（避开卡外米白场景和 CTA） ===
Y_CUT_TOP, Y_CUT_BOT = 570, 680

# === 4. 切每张卡 + cream 透明化 ===
for i, (sx, ex) in enumerate(segments):
    sprite_arr = arr[Y_CUT_TOP:Y_CUT_BOT+1, sx:ex+1].copy()
    sh, sw = sprite_arr.shape[:2]
    
    # cream mask
    sr, sg, sb = sprite_arr[:,:,0], sprite_arr[:,:,1], sprite_arr[:,:,2]
    is_cream_local = (sr > 220) & (sg > 215) & (sb > 200) & (np.abs(sr.astype(int) - sg.astype(int)) < 20) & (np.abs(sg.astype(int) - sb.astype(int)) < 30)
    ex_blue = (sb.astype(int) - sr.astype(int)) > 15
    ex_wood = (sr.astype(int) - sb.astype(int)) > 25
    is_cream_local = is_cream_local & ~ex_blue & ~ex_wood
    
    alpha = np.where(is_cream_local, 0, 255).astype(np.uint8)
    rgba = np.dstack([sprite_arr, alpha])
    sprite = Image.fromarray(rgba, mode="RGBA")
    
    out_path = CARDS / f"card-{i+1}.png"
    sprite.save(out_path, optimize=True)
    print(f"  ✅ card-{i+1}.png: {sw}x{sh}, RGBA, 比例 1:{sh/sw:.2f}, cream={is_cream_local.sum()/(sh*sw)*100:.0f}%")

print("\n🎉 v4 切图完成（cream 卡身透明化）")
