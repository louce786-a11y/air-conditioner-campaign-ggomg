import { COUPONS, weightedPick, PityCounter, SlotLayout, ARC_ORDER, ARC_POSITIONS, TRACK_POSITIONS } from './game.js';
console.log('=== 测试抽奖逻辑 ===');
const pity = new PityCounter();
for (let i = 0; i < 5; i++) {
  const expected = weightedPick();
  const result = pity.apply(expected);
  console.log(`第 ${i+1} 次: ${result.discount} ${result.name} (rare=${result.rare})`);
}
console.log('\n=== snap-to 位置 ===');
console.log('TRACK Y 统一:', Object.values(TRACK_POSITIONS).every(p => p.y === 50));
console.log('TRACK scale 统一:', Object.values(TRACK_POSITIONS).every(p => p.tier === 'inner'));
console.log('P3 中央 50%:', TRACK_POSITIONS.P3.x === 50);
console.log('\n=== finalOffset 修正 ===');
const offset = SlotLayout.finalOffset(78, 8, 35, 40);
console.log(`offset = ${offset}px`);
const cardCenter = offset + 35*86 + 39 - 40*86/2;
console.log(`winner 卡中心相对中轴偏差: ${cardCenter}px (应为 0)`);
