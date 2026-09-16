// merge-sort.js —— 归并排序
// 思路：分治。递归地把数组对半拆分，直到每段只剩一个元素，
//       再两两合并成有序序列。
// 时间复杂度：O(n log n)，稳定排序
// 空间复杂度：O(n)
'use strict';

function mergeSort(arr) {
  if (arr.length <= 1) return arr.slice();
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  return merge(left, right);
}

// 合并两个已有序的数组
function merge(left, right) {
  const result = [];
  let i = 0;
  let j = 0;
  while (i < left.length && j < right.length) {
    // 用 <= 保证稳定性：相等时先取左边
    result.push(left[i] <= right[j] ? left[i++] : right[j++]);
  }
  return result.concat(left.slice(i), right.slice(j));
}

require('./test-util')(mergeSort, '归并排序');
