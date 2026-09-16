# 拾光笔记 · 个人技术博客

一个用纯原生 HTML5 + CSS + JavaScript 实现的静态博客，无框架、无构建工具、无外部依赖。

## 运行

直接双击 `index.html` 在浏览器打开即可；或使用任意静态服务器：

```bash
python3 -m http.server 8000
# 然后访问 http://localhost:8000
```

## 文件结构

| 文件 | 说明 |
|------|------|
| `index.html` | 页面结构 |
| `style.css` | 响应式样式 + 深色模式 |
| `posts.js` | 文章数据（在这里增删文章） |
| `main.js` | 渲染、筛选、搜索、主题切换逻辑 |

## 功能

- 文章列表 + 标签筛选 + 关键词搜索
- 文章详情阅读（单页切换，无后端）
- 深色 / 浅色主题，记忆用户选择（localStorage）
- 响应式布局，适配桌面 / 平板 / 手机

## 添加文章

在 `posts.js` 的 `POSTS` 数组里追加一个对象即可：

```js
{
  id: "my-new-post",
  title: "标题",
  date: "2026-09-16",
  category: "前端",
  tags: ["JavaScript"],
  summary: "一句话摘要",
  content: `<p>正文 HTML…</p>`
}
```
