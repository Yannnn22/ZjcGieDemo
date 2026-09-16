// test-util.js —— 排序算法共用的自测工具（通过 require('./test-util') 引入）
'use strict';

// 标准答案：用内置排序生成期望结果
function expected(arr) {
  return arr.slice().sort((a, b) => a - b);
}

// 生成一个随机整数数组（含负数）
function randomArray(n) {
  const a = [];
  for (let i = 0; i < n; i++) {
    a.push(Math.floor(Math.random() * 2001) - 1000);
  }
  return a;
}

function runTests(sortFn, name) {
  const samples = [
    ['普通乱序', [5, 2, 8, 1, 9, 3]],
    ['含重复', [3, 3, 1, 2, 1]],
    ['空数组', []],
    ['单元素', [42]],
    ['倒序', [9, 8, 7, 6, 5, 4, 3, 2, 1]],
    ['已有序', [1, 2, 3, 4, 5, 6, 7, 8]],
    ['含负数', [-5, 3, 0, -1, 8, -3, 2]],
    ['大数组(5000)', randomArray(5000)],
  ];

  console.log(`== ${name} ==`);
  let pass = true;
  samples.forEach(([label, s], i) => {
    const got = sortFn(s);
    const want = expected(s);
    const ok = got.length === want.length && got.every((v, k) => v === want[k]);
    pass = pass && ok;
    if (label.startsWith('大数组')) {
      console.log(`样例 ${i + 1} (${label}): ${ok ? '✅ 排序正确' : '❌ 出错'}`);
    } else {
      console.log(`样例 ${i + 1} (${label}): [${s}] -> [${got}] ${ok ? '✅' : '❌'}`);
    }
  });
  console.log(pass ? '全部通过 ✅\n' : '存在失败 ❌\n');
  return pass;
}

module.exports = runTests;
