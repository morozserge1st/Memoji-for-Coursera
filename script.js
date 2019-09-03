const cards = document.querySelectorAll('.memory-card');

const modalWin = document.getElementById('modal-win');
const modalWinContent = document.querySelector('.modal-win-content');
const modalWinButton = document.querySelector('.modal-win-button');

const timer = document.querySelector('.timer');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard;
let secondCard;

let f = 0;
let i = 60;
let time = 0;
let timerOn = false;
let timerOff = false;

// Перемешивание карт, меняем порядок с помощью order

function mixingCards() {
  cards.forEach((card) => {
    const randomCard = Math.floor(Math.random() * 12);
    card.style.order = randomCard;
  });
}

// Сброс игры

function resetCards() {
  cards.forEach((oneCard) => {
    oneCard.classList.remove('right-card');
    oneCard.classList.remove('is-flipped');
  });
  i = 60;
  f = 0;
  [firstCard, secondCard] = [null, null];
  [hasFlippedCard, lockBoard, timerOff, timerOn] = [false, false, false, false];
  setTimeout(mixingCards, 500);

  timer.innerHTML = '';
}

// Модальное окно

function openModal() {
  timer.innerHTML = '';
  clearInterval(time);
  modalWin.style.visibility = 'visible';
  modalWin.style.opacity = '1';
}

function closeModal() {
  resetCards();
  modalWin.style.visibility = 'hidden';
  modalWin.style.opacity = '0';
}

modalWinButton.addEventListener('click', closeModal);


function blockCard() {
  firstCard.classList.add('wrong-card');
  secondCard.classList.add('wrong-card');

  lockBoard = true;
}

// Карта перевернута

function removeCards() {
  firstCard.classList.remove('is-flipped');
  secondCard.classList.remove('is-flipped');

  lockBoard = false;
}

// Проверка статуса карты

function checkingCard() {
  if (firstCard.id === secondCard.id) {
    disableCard();
  } else {
    blockCard();
  }
}

// Переворот карты

function flipCard() {
  if (lockBoard) {
    removeCards();
  }
  if (this === firstCard) return;

  this.classList.add('is-flipped');
  this.classList.remove('wrong-card');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  hasFlippedCard = false;
  secondCard = this;

  checkingCard();
}

// Отключить карту

function disableCard() {
  f += 1;
  if (f === 6) {
    setTimeout(openModal, 500);
    modalWinContent.innerHTML = 'Win';
    modalWinButton.innerHTML = 'Play again';
  }

  firstCard.removeEventListener('click', flipCard);
  firstCard.classList.add('right-card');
  secondCard.removeEventListener('click', flipCard);
  secondCard.classList.add('right-card');
  cards.forEach((oneCard) => {
    oneCard.addEventListener('click', flipCard);
  });
}

// Проверка формата времени

function checkTime() {
  const secondsPerMinutes = 60;
  let seconds = i;
  let minutes = Math.floor(seconds / secondsPerMinutes);

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (seconds > 60) {
    seconds = Math.floor(i / secondsPerMinutes);
  }
  if (seconds === 60) {
    seconds = '00';
  } else if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  timer.innerHTML = `${minutes}:${seconds}`;
  timer.style.cssText = 'margin: 5px; line-height: 36px;font-size: 30px; font-family: Arial; font-weight: bold';
}

// Таймер

function countDown() {
  if (timerOn) return;
  timerOn = true;

  time = setInterval(() => {
    if (i === 0) {
      timerOff = true;
      openModal();
      modalWinContent.innerHTML = 'Lose';
      modalWinButton.innerHTML = 'Try again';
    }
    checkTime();
    if (timerOff) return;
    i -= 1;
  }, 1000);
}

cards.forEach((oneCard) => {
  oneCard.addEventListener('click', flipCard);
  oneCard.addEventListener('click', countDown);
});

// Применяем IIFE

(mixingCards());
