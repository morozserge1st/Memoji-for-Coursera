const cards = document.querySelectorAll('.memory-card');


let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

cards.forEach(function(oneCard){
   oneCard.addEventListener("click", flipCard);
});

// Перерворот карты
function flipCard(){
   if (lockBoard) return;
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
      removeCard();
   } 

}

function removeCard() {
   lockBoard = true;

   firstCard.classList.add('wrong-card');
   secondCard.classList.add('wrong-card');

   setTimeout(function(){
      firstCard.classList.remove('is-flipped');
      secondCard.classList.remove('is-flipped');

      lockBoard = false;
   }, 700);
	
}

function resetCards() {
   [firstCard, secondCard]=[null, null];
   [hasFlippedCard, lockBoard]=[false, false];
   firstCard.classList.remove('right-card');
   secondCard.classList.remove('right-card');
}

// Перемешивание карт, меняем порядок с помощью order
// Применяем IIFE
(function mixingCards () {
	cards.forEach(function(mixCard){
		var randomCard = Math.floor(Math.random()*12);
   		mixCard.style.order = randomCard;
	});
})()

