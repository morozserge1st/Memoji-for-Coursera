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


   if (firstCard.dataset.emoji === secondCard.dataset.emoji) {
   	disableCard;
   }
   else {
   	setTimeout(function(){
   		firstCard.classList.remove('is-flipped');
   		secondCard.classList.remove('is-flipped');
   	}, 1500);

   }
};

function disableCard() {
	firstCard.removeEventListener("click", flipCard);
   	secondCard.removeEventListener("click", flipCard);
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
