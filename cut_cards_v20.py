#!/usr/bin/env python3
"""
v20 切图（最终版）：从 triptych.png 左 panel 切 sprite，RGB 不透明
- 硬编码 5 张卡的 X 边界（基于 triptych 左 panel 实际 cream 范围 + 4px padding）
- 切图 y 范围：570-760（从 triptych 偏移 PAD_Y=38）
- RGB 不透明保留 cream 卡身 + 米白场景（sprite 跟米白场景自然融合）
- 输出 RGB 卡片 PNG（不是 RGBA，因为 cream 卡身保留）
"""
import numpy as np
from PIL import Image
from pathlib import Path

HERE = Path(__file__).parent
DEMO = HERE / "demo"
CARDS = DEMO / "cards"
CARDS.mkdir(exist_ok=True)

# triptych.png 左 panel 中 5 张卡的 X 边界（cream 范围 + 4px padding 给边框外扩）
CARD_X_TRIPTYCH = [
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

for i, (sx, ex) in enumerate(CARD_X_TRIPTYCH):
    sprite_arr = arr[PAD_Y+Y_CUT_TOP:PAD_Y+Y_CUT_BOT+1, sx:ex+1].copy()
    sh, sw = sprite_arr.shape[:2]
    sprite = Image.fromarray(sprite_arr, mode="RGB")  # RGB 不透明
    
    out_path = CARDS / f"card-{i+1}.png"
    sprite.save(out_path, optimize=True)
    print(f"  ✅ card-{i+1}.png: {sw}x{sh}, RGB, 比例 1:{sh/sw:.2f}")

print("\n🎉 v20 切图完成（RGB 不透明，每张卡宽度足够）")
