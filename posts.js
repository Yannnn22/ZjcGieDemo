// posts.js —— 文章数据层（纯静态数据，直接在这里增删文章即可）
// 字段说明：
//   id       唯一标识（用于跳转详情）
//   title    标题
//   date     日期，格式 YYYY-MM-DD
//   category 分类（如 前端 / 后端 / 工具）
//   tags     标签数组
//   summary  一句话摘要
//   content  正文，HTML 片段（支持 h2 / p / ul / code / pre / blockquote）
const POSTS = [
  {
    id: "static-blog",
    title: "从零搭建静态博客：HTML + CSS + JS 就够了",
    date: "2026-09-12",
    category: "前端",
    tags: ["HTML", "CSS", "JavaScript"],
    summary: "不用框架、不用构建工具，三个文件就能搭出一个能用的个人博客。",
    content: `
<p>很多人以为搭博客要学框架、配构建工具、折腾服务器。其实一个能用的个人博客，用最基础的 HTML、CSS、JavaScript 就够了。</p>
<h2>为什么是纯静态</h2>
<p>静态博客没有后端，页面就是普通的 HTML 文件。它的好处是：部署简单（任意静态托管都能放）、加载快、几乎不可能被攻击。</p>
<h2>三个文件搞定</h2>
<p>把文章数据写进一个 JS 文件，用另一个 JS 负责渲染，再用 CSS 负责好看，结构就出来了：</p>
<pre><code>&lt;script src="posts.js" defer&gt;&lt;/script&gt;
&lt;script src="main.js" defer&gt;&lt;/script&gt;</code></pre>
<p>剩下的交给 <code>DOM</code> 操作即可，无需任何第三方库。</p>
<h2>写在最后</h2>
<p>先让它跑起来，再谈优化。功能越简单，越容易坚持写下去。</p>
`
  },
  {
    id: "js-closure",
    title: "JavaScript 闭包：从作用域说起",
    date: "2026-09-08",
    category: "前端",
    tags: ["JavaScript"],
    summary: "闭包是 JS 绕不开的概念，理解它得先理解作用域链。",
    content: `
<p>闭包是 JavaScript 里绕不开的概念。要真正理解它，得先从作用域说起。</p>
<h2>作用域链</h2>
<p>函数可以访问定义它的外层作用域里的变量，这种「记住」外层变量的能力，就是闭包。</p>
<pre><code>function counter() {
  let n = 0;
  return function () {
    return ++n;
  };
}
const c = counter();
c(); // 1
c(); // 2</code></pre>
<p>内层函数即使在外层函数返回后，仍然能访问 <code>n</code>，因为它的作用域链指向了 counter 的变量对象。</p>
<h2>常见用途</h2>
<p>闭包常用于封装私有变量、实现工厂函数、以及防抖节流等场景。理解它，很多框架源码就好读多了。</p>
`
  },
  {
    id: "css-vars-dark-mode",
    title: "CSS 变量与深色模式实战",
    date: "2026-09-05",
    category: "前端",
    tags: ["CSS", "设计"],
    summary: "用 CSS 变量做主题切换，是最省事、最干净的方式。",
    content: `
<p>深色模式现在几乎是标配。用 CSS 变量做主题切换，是最省事、最干净的方式。</p>
<h2>定义变量</h2>
<p>把所有会变的颜色抽成变量，放在 <code>:root</code> 里：</p>
<pre><code>:root {
  --bg: #ffffff;
  --fg: #1f2328;
}
html[data-theme="dark"] {
  --bg: #0f141a;
  --fg: #e6e9ee;
}</code></pre>
<h2>一行切换</h2>
<p>JS 只需要给 <code>html</code> 加一个属性，整个页面就换肤了：</p>
<pre><code>document.documentElement.setAttribute('data-theme', 'dark');</code></pre>
<p>再配合 <code>localStorage</code> 记住用户选择，体验就完整了。</p>
`
  },
  {
    id: "git-workflow",
    title: "Git 功能分支工作流与提交规范",
    date: "2026-08-28",
    category: "工具",
    tags: ["Git", "工作流"],
    summary: "一条清晰的分支策略，能省下大量返工和沟通成本。",
    content: `
<p>混乱的提交历史是团队协作的噩梦。一条清晰的分支策略能省下大量返工。</p>
<h2>功能分支</h2>
<p>每个需求从主分支切出独立分支，完成后再合并回去：</p>
<pre><code>git checkout -b feature/add-search
# 开发、提交……
git checkout main
git merge feature/add-search</code></pre>
<h2>提交信息规范</h2>
<p>用 <code>类型: 描述</code> 的格式，一眼看懂每次改动做了什么：</p>
<ul>
  <li><code>feat</code>：新功能</li>
  <li><code>fix</code>：修复</li>
  <li><code>docs</code>：文档</li>
  <li><code>refactor</code>：重构</li>
</ul>
<h2>铁律</h2>
<p>不要 force push，不要改写已经推送的历史——团队协作里，可预测比炫技更重要。</p>
`
  },
  {
    id: "fetch-best-practice",
    title: "用 fetch 调用 REST API 的正确姿势",
    date: "2026-08-20",
    category: "后端",
    tags: ["JavaScript", "API"],
    summary: "几个小习惯，避开 fetch 使用中的大部分坑。",
    content: `
<p>调用后端接口是前端日常。用 <code>fetch</code> 加上几个好习惯，能避开大部分坑。</p>
<h2>基本姿势</h2>
<pre><code>const res = await fetch('/api/posts');
if (!res.ok) throw new Error(res.statusText);
const data = await res.json();</code></pre>
<p>先检查 <code>res.ok</code>，再 <code>json()</code>，是第一步。</p>
<h2>错误处理</h2>
<p>用 <code>try/catch</code> 包住整个请求，网络异常和业务错误都要有兜底提示，而不是让页面静默失败。</p>
<h2>抽成函数</h2>
<p>把重复逻辑封装成 <code>request(url, options)</code>，统一处理超时、错误提示和返回格式，代码会清爽很多。</p>
`
  },
  {
    id: "lazy-loading",
    title: "图片懒加载入门：IntersectionObserver",
    date: "2026-08-12",
    category: "前端",
    tags: ["性能", "JavaScript"],
    summary: "图片往往是页面体积的大头，懒加载能让首屏快上不少。",
    content: `
<p>图片往往是页面体积的大头。懒加载能让首屏快上不少。</p>
<h2>原生方案</h2>
<p>浏览器原生就支持懒加载，一行搞定：</p>
<pre><code>&lt;img src="photo.jpg" loading="lazy" alt="照片"&gt;</code></pre>
<h2>更精细的控制</h2>
<p>需要占位、动画或自定义触发时机时，可以用 <code>IntersectionObserver</code>：</p>
<pre><code>const io = new IntersectionObserver((entries) =&gt; {
  entries.forEach((e) =&gt; {
    if (e.isIntersecting) {
      e.target.src = e.target.dataset.src;
      io.unobserve(e.target);
    }
  });
});</code></pre>
<p>图片进入视口才真正加载，既省流量又提速度。</p>
`
  }
];
