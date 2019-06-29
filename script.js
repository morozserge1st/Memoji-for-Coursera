const cards = document.querySelectorAll('.memory-card');


let hasFlippedCard = false;
let firstCard, secondCard;

cards.forEach(function(oneCard){
   oneCard.addEventListener("click", flipCard);
});

// Перерворот карты
function flipCard(){
   this.classList.add('is-flipped');

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
   secondCard.removeEventListener("click", flipCard);
}

function checkingCard() {
   if (firstCard.id === secondCard.id) {
      disableCard();
      return;
   }
   else {
      setTimeout(function(){
         firstCard.classList.remove('is-flipped');
         secondCard.classList.remove('is-flipped');
      }, 700);

   } 

}

function removeCard() {
	
}

// Перемешивание карт, меняем порядок с помощью order
(function mixingCards () {
	cards.forEach(function(mixCard){
		var randomCard = Math.floor(Math.random()*12);
   		mixCard.style.order = randomCard;
	});
})()

