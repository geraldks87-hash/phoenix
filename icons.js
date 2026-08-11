(() => {
  const paths = {
    overview: '<rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/><rect x="3" y="14" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/>',
    wbs: '<path d="M9 6h12M9 12h12M9 18h12"/><circle cx="4" cy="6" r="1"/><circle cx="4" cy="12" r="1"/><circle cx="4" cy="18" r="1"/>',
    team: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
    calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 11h18"/>',
    kanban: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M9 4v16M15 4v16M5.5 8h1M11.5 8h1M17.5 8h1"/>',
    dashboard: '<path d="M4 19V9M10 19V5M16 19v-7M22 19H2"/><path d="m4 6 6-3 6 5 6-5"/>',
    settings: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l-2.83 2.83a1.7 1.7 0 0 0-1.88-.34A1.7 1.7 0 0 0 14 20.93V21h-4v-.09A1.7 1.7 0 0 0 9 19.36a1.7 1.7 0 0 0-1.88.34l-2.83-2.83A1.7 1.7 0 0 0 4.63 15 1.7 1.7 0 0 0 3.08 14H3v-4h.09A1.7 1.7 0 0 0 4.64 9a1.7 1.7 0 0 0-.34-1.88l2.83-2.83A1.7 1.7 0 0 0 9 4.63 1.7 1.7 0 0 0 10 3.08V3h4v.09A1.7 1.7 0 0 0 15 4.64a1.7 1.7 0 0 0 1.88-.34l2.83 2.83A1.7 1.7 0 0 0 19.37 9 1.7 1.7 0 0 0 20.92 10H21v4h-.09A1.7 1.7 0 0 0 19.4 15Z"/>',
    bell: '<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/>',
    help: '<circle cx="12" cy="12" r="9"/><path d="M9.6 9a2.5 2.5 0 1 1 3.5 2.3c-.8.4-1.1.9-1.1 1.7M12 17h.01"/>',
    menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
    filter: '<path d="M4 6h16M7 12h10M10 18h4"/>',
    chart: '<path d="M12 3a9 9 0 1 0 9 9"/><path d="M12 3v9h9"/>',
    check: '<path d="m5 12 4 4L19 6"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    usercheck: '<path d="M15 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8" cy="7" r="4"/><path d="m17 11 2 2 4-4"/>',
    more: '<circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>',
    edit: '<path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z"/>',
    trash: '<path d="M3 6h18M8 6V4h8v2M19 6l-1 15H6L5 6M10 11v6M14 11v6"/>'
  };
  const svg = (name, cls = '') => `<svg class="ui-icon ${cls}" viewBox="0 0 24 24" aria-hidden="true">${paths[name]}</svg>`;
  const set = (selector, icon) => document.querySelectorAll(selector).forEach(el => {
    if (el.dataset.iconReady) return;
    const label = el.querySelector('span')?.outerHTML || el.textContent.trim();
    el.innerHTML = svg(icon) + (label ? `<span>${label.replace(/^\S+\s*/, '')}</span>` : '');
    el.dataset.iconReady = 'true';
  });

  function enhance(root = document) {
    const nav = {'#overview':'overview','#work-breakdown':'wbs','#team':'team','#timeline':'calendar','#kanban':'kanban','#dashboard':'dashboard','#settings':'settings'};
    Object.entries(nav).forEach(([href, icon]) => root.querySelectorAll?.(`a[href="${href}"]`).forEach(el => {
      if (el.dataset.iconReady) return;
      const text = el.querySelector('span')?.textContent || el.textContent.trim();
      el.innerHTML = svg(icon) + `<span>${text}</span>`;
      el.dataset.iconReady = 'true';
    }));
    const direct = [['#menuButton','menu'],['.top-icon','bell'],['.help','help'],['#addTaskButton','plus'],['#timelineAddTask','plus'],['#addMemberButton','plus'],['#addPhaseButton','plus'],['#addStoryButton','plus'],['#filterButton','filter']];
    direct.forEach(([selector, icon]) => set(selector, icon));
    root.querySelectorAll?.('.search').forEach(el => {
      if (el.dataset.iconReady) return;
      [...el.childNodes].filter(n => n.nodeType === 3).forEach(n => n.remove());
      el.insertAdjacentHTML('afterbegin', svg('search'));
      el.dataset.iconReady = 'true';
    });
    const metricIcons = [['.metrics .coral','metric-progress.png','Overall Progress'],['.metrics .blue','metric-completed.png','Tasks completed'],['.metrics .amber','metric-days.png','Days remaining'],['.metrics .violet','metric-team.png','Team members']];
    metricIcons.forEach(([selector, file, label]) => root.querySelectorAll?.(selector).forEach(el => {
      if (el.dataset.iconReady) return;
      el.innerHTML = `<img class="metric-image" src="assets/${file}" alt="${label}">`;
      el.dataset.iconReady = 'true';
    }));
    root.querySelectorAll?.('.icon-btn,.member .edit').forEach(el => {
      if (el.dataset.iconReady) return;
      const icon = el.matches('[data-edit-phase],.member .edit') ? 'edit' : el.matches('[data-delete-task],[data-delete-phase]') ? 'trash' : 'more';
      el.innerHTML = svg(icon);
      el.setAttribute('aria-label', icon === 'trash' ? 'Delete' : icon === 'edit' ? 'Edit' : 'More options');
      el.dataset.iconReady = 'true';
    });
  }
  enhance();
  let queued = false;
  new MutationObserver(() => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => { queued = false; enhance(); });
  }).observe(document.body, {childList:true, subtree:true});
})();
