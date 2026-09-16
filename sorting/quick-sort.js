// quick-sort.js —— 快速排序
// 思路：分治。选一个基准 pivot，把其余元素分成「小于基准」与「大于等于基准」两部分，
//       递归排序两部分后再拼接。
// 时间复杂度：O(n log n) 平均，O(n²) 最坏（基准每次都取到极值）
// 空间复杂度：O(log n) 递归栈（本实现用辅助数组，额外空间 O(n)）
'use strict';

function quickSort(arr) {
  if (arr.length <= 1) return arr.slice();
  const pivot = arr[arr.length - 1]; // 取最后一个元素为基准
  const left = [];
  const right = [];
  for (let i = 0; i < arr.length - 1; i++) {
    (arr[i] < pivot ? left : right).push(arr[i]);
  }
  return [...quickSort(left), pivot, ...quickSort(right)];
}

// ---------- 演示与自测 ----------
function main() {
  const samples = [
    [5, 2, 8, 1, 9, 3],
    [3, 3, 1, 2, 1],
    [],
    [42],
    [9, 8, 7, 6, 5, 4, 3, 2, 1],
  ];

  let pass = true;
  samples.forEach((s, i) => {
    const got = quickSort(s);
    const want = s.slice().sort((x, y) => x - y);
    const ok = JSON.stringify(got) === JSON.stringify(want);
    pass = pass && ok;
    console.log(`样例 ${i + 1}: [${s}] -> [${got}] ${ok ? '✅' : '❌'}`);
  });
  console.log(pass ? '\n全部通过 ✅' : '\n存在失败 ❌');
}

main();
