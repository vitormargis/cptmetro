export default (event) => {
  if (event === 'enter') {
    document.querySelector('.wrapper').classList.remove('leave-route');
    document.querySelector('.wrapper').classList.add('enter-route');
    setTimeout(() => document.querySelector('.wrapper').classList.remove('enter-route'), 300);
  } else if (event === 'leave') {
    document.querySelector('.wrapper').classList.add('leave-route');
  }
};
