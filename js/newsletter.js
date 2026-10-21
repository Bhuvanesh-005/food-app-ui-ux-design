const previewButtons = [...document.querySelectorAll('.preview-btn')];
const shell = document.getElementById('newsletter-shell');

previewButtons.forEach((button) => {
  button.addEventListener('click', () => {
    previewButtons.forEach((item) => item.classList.toggle('active', item === button));
    const view = button.dataset.view;
    shell.classList.toggle('mobile-view', view === 'mobile');
    shell.classList.toggle('desktop-view', view === 'desktop');
  });
});
