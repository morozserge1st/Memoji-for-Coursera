const cards = document.querySelectorAll('.memory-card');

let modalWinContent = document.querySelector('.modal-win-content');
let modalWinButton = document.querySelector('.modal-win-button')

let modalWin = document.getElementById('modal-win');

let timer = document.querySelector('.timer');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

let timerOff = false;

let i = 60;
let time;
let timerOn = false;

let f = 0;

modalWinButton.addEventListener("click", closeModal);

cards.forEach(function(oneCard){
   oneCard.addEventListener("click", flipCard);
   oneCard.addEventListener("click", countDown);
});

// Перерворот карты
function flipCard(){
   if (lockBoard) {
      removeCards();
   };

   if (this === firstCard) return;

   this.classList.add('is-flipped');
   this.classList.remove('wrong-card');

   if (!hasFlippedCard) {
   	hasFlippedCard = true;
   	firstCard = this;
      return;
   }
   else {
   	hasFlippedCard = false;
   	secondCard = this;
   }

   checkingCard();
};

function disableCard() {
  f++;
  if (f == 1){
    setTimeout(openModal, 500);
    modalWinContent.innerHTML = 'Win';
    modalWinButton.innerHTML = 'Play again'; 
  }

	firstCard.removeEventListener("click", flipCard);
   firstCard.classList.add('right-card');
   secondCard.removeEventListener("click", flipCard);
   secondCard.classList.add('right-card');
   cards.forEach(function(oneCard){
    oneCard.addEventListener("click", flipCard);
  });
}

function checkingCard() {

   if (firstCard.id === secondCard.id) {
      disableCard();
      return;
   }
   else {
      blockCard();
   } 

}

function blockCard() {
   lockBoard = true;

   firstCard.classList.add('wrong-card');
   secondCard.classList.add('wrong-card');


}

function removeCards(){
      firstCard.classList.remove('is-flipped');
      secondCard.classList.remove('is-flipped');

      lockBoard = false;
}


function resetCards() {
  cards.forEach(function(oneCard){
    oneCard.classList.remove('right-card');
    oneCard.classList.remove('is-flipped');
  });
  i = 60;
  f = 0;
  [firstCard, secondCard]=[null, null];
  [hasFlippedCard, lockBoard, timerOff, timerOn]=[false, false, false, false];
  setTimeout(mixingCards, 500);
}


function checkTime(){
  let secondsPerMinutes = 60;
  let seconds = i;
  let minutes = Math.floor(seconds/secondsPerMinutes);
  let countID;

  if (minutes<10) {
    minutes = '0'+ minutes;
  }
  if (seconds>60) {
    seconds = Math.floor(i/secondsPerMinutes);
  } 
  if (seconds == 60){
    seconds = '00';
  } else if (seconds<10) {
    seconds = '0'+ seconds;
  }
  timer.innerHTML = minutes + ':' + seconds
}

function countDown() {
  if (timerOn) return;
  timerOn = true;
   
  countID = setInterval(function() {
    if (i == 0) {
      timerOff = true;
      openModal();
      modalWinContent.innerHTML = 'Lose'; 
      modalWinButton.innerHTML = 'Try again';
    };
    checkTime();
    if (timerOff) return;
    i--;
   }, 1000);
}


function openModal(){
  modalWin.style.visibility = 'visible';
  modalWin.style.opacity = '1';

  timer.innerHTML = "";
  clearInterval(countID);
    // Сделать функцию для выбора сообщения

}


function closeModal(){
    resetCards();
    modalWin.style.visibility = 'hidden';
    modalWin.style.opacity = '0';

}

function mixingCards () {
  cards.forEach(function(mixCard){
    var randomCard = Math.floor(Math.random()*12);
      mixCard.style.order = randomCard;
  });
}
// Перемешивание карт, меняем порядок с помощью order
// Применяем IIFE
(function mixingCards () {
  cards.forEach(function(mixCard){
    var randomCard = Math.floor(Math.random()*12);
      mixCard.style.order = randomCard;
  });
})()

