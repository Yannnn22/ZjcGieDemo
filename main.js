// main.js —— 交互与渲染逻辑（依赖 posts.js 中的全局 POSTS）
'use strict';

(function () {
  const postList = document.getElementById('post-list');
  const searchInput = document.getElementById('search-input');
  const tagFilter = document.getElementById('tag-filter');
  const themeToggle = document.getElementById('theme-toggle');
  const listView = document.getElementById('list-view');
  const postDetail = document.getElementById('post-detail');
  const backToList = document.getElementById('back-to-list');

  // 当前筛选状态
  const state = { tag: 'all', keyword: '' };

  // ---------- 工具 ----------
  // 转义 HTML 特殊字符，防止文本内容破坏结构或注入脚本
  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function debounce(fn, delay) {
    let timer = null;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, args), delay);
    };
  }

  // ---------- 主题 ----------
  function saveTheme(theme) {
    try {
      localStorage.setItem('blog-theme', theme);
    } catch (e) {
      // 存储不可用（隐私模式等）时静默降级，仅本次会话生效
    }
  }

  function updateThemeButton(theme) {
    themeToggle.textContent = theme === 'dark' ? '☀️ 浅色' : '🌙 深色';
  }

  function initTheme() {
    // data-theme 已由 <head> 内联脚本在渲染前设置，这里只同步按钮文案
    const theme = document.documentElement.getAttribute('data-theme') || 'light';
    updateThemeButton(theme);
  }

  function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    saveTheme(next);
    updateThemeButton(next);
  }

  // ---------- 标签筛选 ----------
  function collectTags() {
    const set = new Set();
    POSTS.forEach((p) => p.tags.forEach((t) => set.add(t)));
    return ['all', ...set];
  }

  function renderTags() {
    const tags = collectTags();
    tagFilter.innerHTML = '';
    tags.forEach((tag) => {
      const btn = document.createElement('button');
      btn.className = 'tag-btn' + (state.tag === tag ? ' active' : '');
      btn.textContent = tag === 'all' ? '全部' : tag;
      btn.addEventListener('click', () => {
        state.tag = tag;
        renderTags();
        renderPosts();
      });
      tagFilter.appendChild(btn);
    });
  }

  // ---------- 列表渲染 ----------
  function filterPosts() {
    const kw = state.keyword.trim().toLowerCase();
    return POSTS
      .filter((p) => {
        const matchTag = state.tag === 'all' || p.tags.includes(state.tag);
        const matchKw = !kw ||
          p.title.toLowerCase().includes(kw) ||
          p.summary.toLowerCase().includes(kw);
        return matchTag && matchKw;
      })
      .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0)); // 按日期倒序
  }

  function renderPosts() {
    const posts = filterPosts();
    if (posts.length === 0) {
      postList.innerHTML = '<p class="empty">没有找到相关文章，换个关键词试试～</p>';
      return;
    }
    postList.innerHTML = posts
      .map((p) => `
        <article class="card" data-id="${escapeHtml(p.id)}"
          role="button" tabindex="0" aria-label="阅读文章：${escapeHtml(p.title)}">
          <div class="card-meta">
            <span class="category">${escapeHtml(p.category)}</span>
            <time datetime="${escapeHtml(p.date)}">${escapeHtml(p.date)}</time>
          </div>
          <h2 class="card-title">${escapeHtml(p.title)}</h2>
          <p class="card-summary">${escapeHtml(p.summary)}</p>
          <div class="card-tags">${p.tags.map((t) => `<span class="tag">${escapeHtml(t)}</span>`).join('')}</div>
        </article>
      `)
      .join('');
  }

  // ---------- 详情 ----------
  function openPost(id) {
    const post = POSTS.find((p) => p.id === id);
    if (!post) return;
    document.getElementById('detail-title').textContent = post.title;
    document.getElementById('detail-meta').textContent = `${post.date} · ${post.category}`;
    document.getElementById('detail-tags').innerHTML =
      post.tags.map((t) => `<span class="tag">${escapeHtml(t)}</span>`).join('');
    // 正文 content 为受控 HTML，信任边界见 posts.js 头部注释
    document.getElementById('detail-content').innerHTML = post.content;

    listView.classList.add('hidden');
    postDetail.classList.remove('hidden');
    window.scrollTo({ top: 0 });
  }

  function closePost() {
    postDetail.classList.add('hidden');
    listView.classList.remove('hidden');
  }

  // ---------- 初始化 ----------
  function init() {
    initTheme();
    renderTags();
    renderPosts();

    themeToggle.addEventListener('click', toggleTheme);
    backToList.addEventListener('click', closePost);

    // 列表事件委托：点击卡片打开详情（避免每次渲染重复绑定）
    postList.addEventListener('click', (e) => {
      const card = e.target.closest('.card');
      if (card) openPost(card.dataset.id);
    });

    // 键盘可达性：回车 / 空格打开聚焦的卡片
    postList.addEventListener('keydown', (e) => {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      const card = e.target.closest('.card');
      if (card) {
        e.preventDefault();
        openPost(card.dataset.id);
      }
    });

    // 搜索防抖，避免连续输入频繁重渲染
    searchInput.addEventListener('input', debounce(() => {
      state.keyword = searchInput.value;
      renderPosts();
    }, 200));
  }

  document.addEventListener('DOMContentLoaded', init);
})();
