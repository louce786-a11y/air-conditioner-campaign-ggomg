# ❄️ 冰风空调 · 夏日冰爽特惠

> Campaign Agent Kit v1.0 demo #5 — 空调主题 5 折老虎机抽奖 H5

**品牌：** 冰风空调 · 夏日冰爽特惠
**风格：** 夏日清凉空调风 / 冰爽薄荷 / kawaii 萌系
**配色：** 冰蓝 #1E88E5 + 冰白 #F0F8FF + 薄荷绿 #A8E6CF + 金色 #F4C95D

---

## 🎯 5 张券

| ID | 折扣 | 券名 | 概率 | 稀有度 |
|---|---|---|---|---|
| C1 | 9折 | 微凉体验券 | 30% | common |
| C3 | 7折 | 冰爽畅享券 | 20% | common |
| **C5** | **5折** | **半价冰风王** | **10%** | **rare** ⭐ |
| C4 | 6折 | 极寒狂欢券 | 15% | rare ⭐ |
| C2 | 8折 | 清凉派对券 | 25% | common |

**视觉排序（沿弧线左→右）：**
```
P1(outer) ──→ P2(inner) ──→ P3(CENTER, 5折最大) ──→ P4(inner) ──→ P5(outer)
  C1 9折        C3 7折           C5 5折                  C4 6折          C2 8折
```

---

## 📂 项目结构

```
air-conditioner/
├── brief.json              # Campaign Brief（brand spec + 5 coupons）
├── meta-prompt.md          # Meta-Prompt v2.9（triptych prompt 生成器）
├── compile_prompt.py       # brief → triptych-prompt.md 编译器
├── triptych-prompt.md      # 编译后的三联图 prompt（喂给 opencli）
├── cut_assets.py           # 三联图 → preview/background/elements 切图
├── cut_elements.py         # elements → 5 张 sprite 卡（去绿幕）
├── triptych.png            # 1536×864 三联图原始图（git ignored）
├── demo/
│   ├── index.html          # H5 主页面（手机 9:16 框）
│   ├── game.js             # 抽奖逻辑（ES module，可单测）
│   ├── test.mjs            # Node 测试
│   ├── preview.png         # 完整视觉预览
│   ├── background.png      # 背景图（中 panel）
│   ├── background-hires.png # 2× 高分辨率背景
│   ├── elements.png        # UI 元素货架（右 panel）
│   ├── elements-transparent.png # 去绿幕版
│   ├── element-bboxes.json # 切图坐标
│   └── cards/              # 5 张 sprite 卡
│       ├── card-1.png      # P1: 9折 微凉体验券
│       ├── card-2.png      # P2: 7折 冰爽畅享券
│       ├── card-3.png      # P3: 5折 半价冰风王（中央最大）
│       ├── card-4.png      # P4: 6折 极寒狂欢券
│       └── card-5.png      # P5: 8折 清凉派对券
└── README.md
```

---

## 🚀 运行流程

### 1. 编译三联图 prompt
```bash
cd air-conditioner
python3 compile_prompt.py
```

### 2. 生成三联图（人工确认）
```bash
opencli chatgpt image "$(cat triptych-prompt.md)" \
  --op /Users/omg/.openclaw/workspace/campaign-test/air-conditioner \
  --window background
# → 输出 chatgpt_*.png，重命名为 triptych.png
```

### 3. 切图
```bash
python3 cut_assets.py
python3 cut_elements.py
```

### 4. 跑测试
```bash
cd demo && node test.mjs
```

### 5. 启动 sandbox
```bash
cd demo && python3 -m http.server 7786
# 浏览器打开 http://127.0.0.1:7786/index.html
```

---

## ❄️ 主题特点

- **吉祥物：** Q版小空调机（白色方形机体，正面圆角笑脸，蓝色出风口，挂着小雪花/冰晶，微笑挥手）
- **场景：** 夏日清凉空调展厅，墙面冰蓝渐变，白色壁挂式空调展示机，飘着雪花，薄荷叶点缀，水滴冰晶散落
- **配色氛围：** 冰蓝 + 薄荷绿，传达清凉 + 夏日舒爽
- **目标受众：** 夏天想装空调/买空调的年轻消费者

---

## 📜 协议

- **play_type:** `five_coupon_arc_draw`（v1.0 锁定）
- **runtime_type:** `image_h5`（image-first / 老虎机玩法）
- **template:** `Campaign Agent Kit v1.0`（见 `campaign-spec-v1.0.md`）
- **风格版本:** s1
- **资源包版本:** a1
