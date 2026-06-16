// game.js - 冰风空调 / 5 张空调券老虎机抽奖
// 纯逻辑层, 浏览器和 node 通用 (ES module)

// ===== 5 张空调券（按优惠力度从低到高: C1 < C2 < C3 < C4 < C5）=====
// 视觉顺序（左→右 沿弧线）: C1 → C3 → C5 → C4 → C2
export const COUPONS = [
  { id: 'C1', name: '微凉体验券', discount: '9折', prob: 30, weight: 30, rare: false, flavor: '❄️' },
  { id: 'C3', name: '冰爽畅享券', discount: '7折', prob: 20, weight: 20, rare: false, flavor: '🧊' },
  { id: 'C5', name: '半价冰风王', discount: '5折', prob: 10, weight: 10, rare: true,  flavor: '👑' },
  { id: 'C4', name: '极寒狂欢券', discount: '6折', prob: 15, weight: 15, rare: true,  flavor: '🌨️' },
  { id: 'C2', name: '清凉派对券', discount: '8折', prob: 25, weight: 25, rare: false, flavor: '💨' },
];

// 卡位视觉位置顺序（左→右 沿弧线）
export const ARC_ORDER = ['C1', 'C3', 'C5', 'C4', 'C2'];

// 卡位 tier 映射
export const POSITION_TIER = {
  P1: 'outer',  // C1
  P2: 'inner',  // C3
  P3: 'center', // C5
  P4: 'inner',  // C4
  P5: 'outer',  // C2
};

export const TIER_SCALE = { outer: 0.86, inner: 1.00, center: 1.18 };

// ===== 弧形布局：5 张卡在 default 状态的位置（phone canvas 720×405 横屏，百分比）=====
// 视觉上：水平排列，中央略高（5 折最大），跟三联图左图一致
// sprite 宽度不同（82/91/118/90/93），X 位置向画框中间聚拢（避免卡 1/5 被画框切）
// 画框 360×640 中 Y 位置：卡顶 y=66%, 卡底 y=78%，中央卡略高 2%
export const ARC_POSITIONS = {
  P1: { x: 15, y: 73, tier: 'outer'  },  // C1 9折 微凉 最左 (sprite 82×191)
  P2: { x: 32, y: 72, tier: 'inner'  },  // C3 7折 冰爽畅享 左中 (sprite 91×191)
  P3: { x: 50, y: 70, tier: 'center' },  // C5 5折 半价冰风王 中央最大 (sprite 118×191)
  P4: { x: 68, y: 72, tier: 'inner'  },  // C4 6折 极寒狂欢 右中 (sprite 90×191)
  P5: { x: 85, y: 73, tier: 'outer'  },  // C2 8折 清凉派对 最右 (sprite 93×191)
};

// ===== 滚动轨道：snap-to 后的统一布局（参考 godot spec 4.2）=====
// 关键设计：5 张卡水平均分 Y=70%（跟 arc 中段对齐），X 间距 18%
export const TRACK_POSITIONS = {
  P1: { x: 14, y: 70, tier: 'inner' },
  P2: { x: 32, y: 70, tier: 'inner' },
  P3: { x: 50, y: 70, tier: 'inner' },  // 中央
  P4: { x: 68, y: 70, tier: 'inner' },
  P5: { x: 86, y: 70, tier: 'inner' },
};

export const RARE_WEIGHT_THRESHOLD = 15;
export const DAILY_FREE_DRAWS = 3;
export const PITY_THRESHOLD = 10;

// ===== 动画常量（参考 godot spec 4.x）=====
export const ANIM = {
  SNAP_DURATION: 400,        // 拉齐动画 (spec 4.2: 0.4s)
  SNAP_EASING: 'cubic-bezier(0.33, 1, 0.68, 1)',  // EASE_OUT
  SNAP_HOLD: 200,            // 拉齐后停顿 (spec 4.2: 0.2s)
  SPIN_DURATION: 6000,       // 滚动 (spec 4.3: 6000ms)
  SPIN_EASING: 'cubic-bezier(0.22, 1, 0.36, 1)',  // QUINT/EASE_OUT
  REVEAL_DURATION: 700,      // 中奖揭示
};

// ===== 老虎机常量 =====
export const SLOT_TOTAL_CARDS = 40;
export const SLOT_WINNER_INDEX = 35;
export const REEL_CARD_WIDTH = 60;       // 滚动轨道上卡宽（适配 16:9 横屏 720×405）
export const REEL_CARD_MARGIN = 8;       // 卡间距
export const REEL_STEP = REEL_CARD_WIDTH + REEL_CARD_MARGIN;  // 68

// ===== 加权随机抽 =====
export function weightedPick(coupons = COUPONS, rand = Math.random) {
  const total = coupons.reduce((s, c) => s + c.weight, 0);
  let r = rand() * total;
  for (const c of coupons) {
    r -= c.weight;
    if (r <= 0) return c;
  }
  return coupons[coupons.length - 1];
}

// ===== 保底逻辑 =====
export class PityCounter {
  constructor(threshold = PITY_THRESHOLD) {
    this.threshold = threshold;
    this.sinceRare = 0;
  }
  apply(expected, rand = Math.random) {
    this.sinceRare += 1;
    if (expected.rare) {
      this.sinceRare = 0;
      return expected;
    }
    if (this.sinceRare >= this.threshold) {
      const rares = COUPONS.filter(c => c.rare);
      const forced = rares[Math.floor(rand() * rares.length)];
      this.sinceRare = 0;
      return forced;
    }
    return expected;
  }
  reset() { this.sinceRare = 0; }
  get state() { return { sinceRare: this.sinceRare, threshold: this.threshold }; }
}

// ===== 每日次数限制 =====
export class DailyLimit {
  static key = 'acDrawLimit_v1';
  static today() {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  }
  static load(store) {
    try { return JSON.parse(store.getItem(DailyLimit.key) || '{}'); }
    catch { return {}; }
  }
  static remaining(state, dateStr = DailyLimit.today()) {
    const used = (state[dateStr]?.free || 0) + (state[dateStr]?.bonus || 0);
    return Math.max(0, DAILY_FREE_DRAWS - used);
  }
  static consume(state, dateStr = DailyLimit.today(), kind = 'free') {
    const cur = state[dateStr] || { free: 0, bonus: 0 };
    cur[kind] = (cur[kind] || 0) + 1;
    state[dateStr] = cur;
    return state;
  }
}

// ===== 老虎机 reel 布局（参考 godot spec 4.3）====
//
// 关键设计：reel 是一个 flex 容器，所有卡排列在水平轨道上
// 整个 reel 通过 translateX 滚动
// winner 卡的中心要对齐 viewport 中心（reel 中轴）
//
export class SlotLayout {
  static build(winnerId, total = SLOT_TOTAL_CARDS) {
    const ordered = ARC_ORDER.map(id => COUPONS.find(c => c.id === id));
    const cards = [];
    for (let i = 0; i < total; i++) {
      const idx = i % ordered.length;
      const c = ordered[idx];
      const posKey = `P${idx + 1}`;
      cards.push({
        id: c.id,
        position: posKey,
        tier: POSITION_TIER[posKey],
      });
    }
    // 重排最后 5 张, 让 winner 落在 SLOT_WINNER_INDEX
    const winnerInOrder = ARC_ORDER.indexOf(winnerId);
    if (winnerInOrder > 0) {
      const last5 = cards.slice(-5);
      const rotated = new Array(5);
      for (let k = 0; k < 5; k++) {
        rotated[k] = last5[(k + winnerInOrder) % 5];
      }
      cards.splice(-5, 5, ...rotated);
    }
    return cards;
  }

  /**
   * 修正后的 finalOffset：让 winner 卡中心精确对齐 reel 中轴
   * @param cardWidth 单卡显示宽度
   * @param cardMargin 卡间距
   * @param winnerIndex 中奖卡在 reel 上的索引
   * @param total reel 总卡数
   * @returns translateX 偏移量（负数 = 向左）
   */
  static finalOffset(cardWidth, cardMargin, winnerIndex, total) {
    const step = cardWidth + cardMargin;
    const reelWidth = total * step;
    return reelWidth / 2 - winnerIndex * step - cardWidth / 2;
  }
}
