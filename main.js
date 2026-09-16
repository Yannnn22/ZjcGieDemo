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

  // ---------- 主题 ----------
  function updateThemeButton(theme) {
    themeToggle.textContent = theme === 'dark' ? '☀️ 浅色' : '🌙 深色';
  }

  function initTheme() {
    const saved = localStorage.getItem('blog-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = saved || (prefersDark ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', theme);
    updateThemeButton(theme);
  }

  function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('blog-theme', next);
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
    return POSTS.filter((p) => {
      const matchTag = state.tag === 'all' || p.tags.includes(state.tag);
      const matchKw = !kw ||
        p.title.toLowerCase().includes(kw) ||
        p.summary.toLowerCase().includes(kw);
      return matchTag && matchKw;
    });
  }

  function renderPosts() {
    const posts = filterPosts();
    if (posts.length === 0) {
      postList.innerHTML = '<p class="empty">没有找到相关文章，换个关键词试试～</p>';
      return;
    }
    postList.innerHTML = posts
      .map((p) => `
        <article class="card" data-id="${p.id}">
          <div class="card-meta">
            <span class="category">${p.category}</span>
            <time datetime="${p.date}">${p.date}</time>
          </div>
          <h2 class="card-title">${p.title}</h2>
          <p class="card-summary">${p.summary}</p>
          <div class="card-tags">${p.tags.map((t) => `<span class="tag">${t}</span>`).join('')}</div>
        </article>
      `)
      .join('');

    postList.querySelectorAll('.card').forEach((card) => {
      card.addEventListener('click', () => openPost(card.dataset.id));
    });
  }

  // ---------- 详情 ----------
  function openPost(id) {
    const post = POSTS.find((p) => p.id === id);
    if (!post) return;
    document.getElementById('detail-title').textContent = post.title;
    document.getElementById('detail-meta').textContent = `${post.date} · ${post.category}`;
    document.getElementById('detail-tags').innerHTML =
      post.tags.map((t) => `<span class="tag">${t}</span>`).join('');
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
    searchInput.addEventListener('input', () => {
      state.keyword = searchInput.value;
      renderPosts();
    });
  }

  document.addEventListener('DOMContentLoaded', init);
})();
