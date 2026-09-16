// quick-sort.js —— 快速排序
// 思路：分治。用「三数取中」选基准 pivot，把其余元素分成「小于基准」与「大于等于基准」两部分，
//       递归排序两部分后再拼接。
// 时间复杂度：O(n log n) 平均，最坏 O(n²)（三数取中已大幅降低退化概率）
// 空间复杂度：O(log n) 递归栈（本实现用辅助数组，额外空间 O(n)）
'use strict';

function quickSort(arr) {
  if (arr.length <= 1) return arr.slice();

  const a = arr.slice();
  const last = a.length - 1;

  // 三数取中：比较首/中/尾三个位置，把中位数换到末尾作为基准
  const mid = a.length >> 1;
  const pivotIdx = medianOfThreeIndex(a, 0, mid, last);
  [a[pivotIdx], a[last]] = [a[last], a[pivotIdx]];
  const pivot = a[last];

  const left = [];
  const right = [];
  for (let i = 0; i < last; i++) {
    (a[i] < pivot ? left : right).push(a[i]);
  }
  return [...quickSort(left), pivot, ...quickSort(right)];
}

// 返回 a[i]、a[j]、a[k] 三个值中「中位数」所在的下标
function medianOfThreeIndex(a, i, j, k) {
  const ai = a[i];
  const aj = a[j];
  const ak = a[k];
  if ((ai <= aj && aj <= ak) || (ak <= aj && aj <= ai)) return j;
  if ((aj <= ai && ai <= ak) || (ak <= ai && ai <= aj)) return i;
  return k;
}

require('./test-util')(quickSort, '快速排序');
