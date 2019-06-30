const cards = document.querySelectorAll('.memory-card');


let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

cards.forEach(function(oneCard){
   oneCard.addEventListener("click", flipCard);
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
	firstCard.removeEventListener("click", flipCard);
   firstCard.classList.add('right-card');
   secondCard.removeEventListener("click", flipCard);
   secondCard.classList.add('right-card');
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
   [firstCard, secondCard]=[null, null];
   [hasFlippedCard, lockBoard]=[false, false];
   firstCard.classList.remove('right-card');
   secondCard.classList.remove('right-card');
}


let timer = document.querySelector('.timer');
let timerOn = false;
if (!timerOn) {
   countDown();
}

function countDown() {
   let i = 60;
   timer.innerHTML = i;

   setInterval(function() {

      if (timerOn) return;
      
      i--;
      timer.innerHTML = i;
   
      if (i <= 0) {
         timerOn = true;
         openModal();
      };
   }, 1000);
}

let modalWin = document.getElementById('modal-win');
let resetButton = document.querySelector('.notgo');

resetButton.addEventListener("click", closeModal);


function openModal(){
    modalWin.style.visibility = 'visible';
    modalWin.style.opacity = '1';
}

function closeModal(){
    modalWin.style.visibility = 'hidden';
    modalWin.style.opacity = '0';
}

// Перемешивание карт, меняем порядок с помощью order
// Применяем IIFE
(function mixingCards () {
	cards.forEach(function(mixCard){
		var randomCard = Math.floor(Math.random()*12);
   		mixCard.style.order = randomCard;
	});
})()

