// bubble-sort.js —— 冒泡排序
// 思路：重复遍历数组，每次比较相邻两元素，顺序错误就交换。
//       每轮把当前最大的元素「冒泡」到末尾。
// 时间复杂度：O(n²) 平均/最坏，O(n) 最好（已有序且提前退出）
// 空间复杂度：O(1)，原地排序
'use strict';

function bubbleSort(arr) {
  const a = arr.slice(); // 拷贝一份，不修改原数组
  const n = a.length;
  for (let i = 0; i < n - 1; i++) {
    let swapped = false;
    // 每轮结束后，末尾 i 个元素已经排好，无需再比较
    for (let j = 0; j < n - 1 - i; j++) {
      if (a[j] > a[j + 1]) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
        swapped = true;
      }
    }
    if (!swapped) break; // 本轮没有发生交换，说明已经有序
  }
  return a;
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
    const got = bubbleSort(s);
    const want = s.slice().sort((x, y) => x - y); // 用内置排序作为标准答案
    const ok = JSON.stringify(got) === JSON.stringify(want);
    pass = pass && ok;
    console.log(`样例 ${i + 1}: [${s}] -> [${got}] ${ok ? '✅' : '❌'}`);
  });
  console.log(pass ? '\n全部通过 ✅' : '\n存在失败 ❌');
}

main();
