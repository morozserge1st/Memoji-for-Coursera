var cards = document.querySelectorAll('.memory-card');


var hasFlippedCard = false;
var firstCard, secondCard;

cards.forEach(function(oneCard){
   oneCard.addEventListener("click", flipCard);
});

// Перерворот карты
function flipCard(){
   this.classList.add('is-flipped');

   if (!hasFlippedCard) {
   	hasFlippedCard = true;
   	firstCard = this;
   }
   else {
   	hasFlippedCard = false;
   	secondCard = this;
   }
};

