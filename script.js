const pages = [...document.querySelectorAll('.page')];
const links = [...document.querySelectorAll('[data-page]')];
const sidebar = document.querySelector('.sidebar');
const menu = document.querySelector('.mobile-menu');

function showPage(id) {
  const target = pages.some(page => page.id === id) ? id : 'home';
  pages.forEach(page => page.classList.toggle('active', page.id === target));
  document.querySelectorAll('.nav-link').forEach(link => link.classList.toggle('active', link.dataset.page === target));
  sidebar.classList.remove('open');
  menu.setAttribute('aria-expanded', 'false');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

links.forEach(link => link.addEventListener('click', event => {
  const page = link.dataset.page;
  if (page) {
    event.preventDefault();
    history.pushState({}, '', `#${page}`);
    showPage(page);
  }
}));

menu.addEventListener('click', () => {
  const open = sidebar.classList.toggle('open');
  menu.setAttribute('aria-expanded', String(open));
});

window.addEventListener('popstate', () => showPage(location.hash.slice(1)));
showPage(location.hash.slice(1) || 'home');

const dialog = document.querySelector('#photo-dialog');
document.querySelectorAll('.photo-card').forEach(card => card.addEventListener('click', () => {
  dialog.querySelector('h3').textContent = card.dataset.title;
  dialog.querySelector('p').textContent = card.dataset.meta;
  dialog.querySelector('.dialog-image').style.background = card.style.getPropertyValue('--image');
  dialog.showModal();
}));
dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
