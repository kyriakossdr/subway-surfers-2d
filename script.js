const character = document.querySelector('#hero');
const block = document.querySelector('#blocks');
const score = document.querySelector('#score');
const highScore = document.querySelector('#top-score');

let lost = true;

const moveRight = () => {
  if (lost) {
    lost = false;
  }
  let left = character.offsetLeft;
  if (left != 220) {
    left += 110;
  }
  character.style.left = left + 'px';
};

const moveLeft = () => {
  if (lost) {
    lost = false;
  }
  let left = character.offsetLeft;
  if (left != 0) {
    left -= 110;
  }
  character.style.left = left + 'px';
};

const topScoreHandler = (score, topScore) => {
  if (score > topScore) {
    localStorage.setItem('High Score', score);
    highScore.innerText = localStorage.getItem('High Score');
  }
};

window.addEventListener('keydown', (e) => {
  if (e.key == 'ArrowRight' || e.key == 'd') {
    moveRight();
  } else if (e.key == 'ArrowLeft' || e.key == 'a') {
    moveLeft();
  }
});

block.addEventListener('animationiteration', () => {
  let rand = Math.floor(Math.random() * 3); // 0 1 2
  block.style.left = rand * 110 + 'px';

  if (!lost) {
    score.innerText = parseInt(score.innerText) + 1;
  }
});

setInterval(() => {
  let characterLeftPos = parseInt(
    window.getComputedStyle(character).getPropertyValue('left')
  );
  let blockLeftPos = parseInt(
    window.getComputedStyle(block).getPropertyValue('left')
  );

  let blockTopPos = parseInt(
    window.getComputedStyle(block).getPropertyValue('top')
  );

  if (
    characterLeftPos == blockLeftPos &&
    blockTopPos > 420 &&
    blockTopPos < 530
  ) {
    character.style.left = 110 + 'px';
    lost = true;
    topScoreHandler(parseInt(score.innerText), parseInt(highScore.innerText));
    score.innerText = 0;
  }
});

window.addEventListener('load', () => {
  if (localStorage.getItem('High Score')) {
    highScore.innerText = localStorage.getItem('High Score');
  } else {
    localStorage.setItem('High Score', 0);
    highScore.innerText = localStorage.getItem('High Score');
  }
});
