#!/usr/bin/env python3
"""
v19 切图（最终版）：硬编码 X 边界（基于 triptych.png 左 panel 实际 cream 范围）
- 5 张卡的 X 边界基于实际 AI 生成的 cream 范围观察
- 从 triptych.png 左 panel 切 sprite（最完整 9:16，不被中间 panel 切）
- cream 米白卡身 → alpha=0 (透明)，边框+文字保留
- 输出 RGBA 透明 PNG
"""
import numpy as np
from PIL import Image
from pathlib import Path

HERE = Path(__file__).parent
DEMO = HERE / "demo"
CARDS = DEMO / "cards"
CARDS.mkdir(exist_ok=True)

# 硬编码 triptych.png 左 panel 中 5 张卡的 X 边界（含 4px padding 给边框外扩）
CARD_X = [
    (50, 131),    # 卡 1 (微凉 9折)
    (141, 231),   # 卡 2 (冰爽畅享 7折)
    (241, 358),   # 卡 3 (半价冰风王 5折, 中央最大)
    (369, 458),   # 卡 4 (极寒狂欢 6折)
    (457, 549),   # 卡 5 (清凉派对 8折)
]
PAD_X, PAD_Y = 35, 38  # preview.png 在 triptych.png 中的偏移
Y_CUT_TOP, Y_CUT_BOT = 570, 760

src = DEMO.parent / "triptych.png"
img = Image.open(src)
arr = np.array(img)
H, W = arr.shape[:2]
print(f"📐 triptych.png: {W}×{H}")

for i, (s, e) in enumerate(CARD_X):
    sprite_arr = arr[PAD_Y+Y_CUT_TOP:PAD_Y+Y_CUT_BOT+1, s:e+1].copy()
    sh, sw = sprite_arr.shape[:2]
    
    # cream 透明化
    sr, sg, sb = sprite_arr[:,:,0], sprite_arr[:,:,1], sprite_arr[:,:,2]
    is_cream = (sr > 220) & (sg > 215) & (sb > 200) & (np.abs(sr.astype(int) - sg.astype(int)) < 20) & (np.abs(sg.astype(int) - sb.astype(int)) < 30)
    is_cream = is_cream & ~((sb.astype(int) - sr.astype(int)) > 15) & ~((sr.astype(int) - sb.astype(int)) > 25)
    
    alpha = np.where(is_cream, 0, 255).astype(np.uint8)
    rgba = np.dstack([sprite_arr, alpha])
    sprite = Image.fromarray(rgba, mode="RGBA")
    
    out_path = CARDS / f"card-{i+1}.png"
    sprite.save(out_path, optimize=True)
    print(f"  ✅ card-{i+1}.png: {sw}x{sh}, RGBA, 比例 1:{sh/sw:.2f}")

print("\n🎉 v19 切图完成")
