const navTabs = [...document.querySelectorAll('.nav-tab')];
const screens = [...document.querySelectorAll('.screen')];
const likeButtons = [...document.querySelectorAll('.like-btn')];
const saveButtons = [...document.querySelectorAll('.save-btn')];

navTabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    const screenName = tab.dataset.screen;

    navTabs.forEach((item) => item.classList.toggle('active', item === tab));
    screens.forEach((screen) => {
      screen.classList.toggle('active', screen.dataset.screen === screenName);
    });
  });
});

likeButtons.forEach((button) => {
  button.addEventListener('click', () => {
    button.textContent = button.textContent === '♡' ? '♥' : '♡';
  });
});

saveButtons.forEach((button) => {
  button.addEventListener('click', () => {
    button.textContent = button.textContent === '🔖' ? '📌' : '🔖';
  });
});
