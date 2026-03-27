const emojis = ["🍎","🍌","🍇","🍉","🍒","🥝","🍍","🍓"];

let cards = [];
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchedPairs = 0;

const game = document.getElementById("game");

function startGame() {
  // reset values
  game.innerHTML = "";
  cards = [...emojis, ...emojis];
  cards.sort(() => 0.5 - Math.random());

  firstCard = null;
  secondCard = null;
  lockBoard = false;
  matchedPairs = 0;

  // create cards
  cards.forEach((emoji) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.emoji = emoji;
    card.innerHTML = "?";

    card.addEventListener("click", () => flipCard(card));

    game.appendChild(card);
  });
}

function flipCard(card) {
  if (lockBoard || card === firstCard) return;

  card.classList.add("flipped");
  card.innerHTML = card.dataset.emoji;

  if (!firstCard) {
    firstCard = card;
    return;
  }

  secondCard = card;
  checkMatch();
}

function checkMatch() {
  if (firstCard.dataset.emoji === secondCard.dataset.emoji) {
    matchedPairs++;

    // 🎉 Win condition
    if (matchedPairs === emojis.length) {
      setTimeout(() => {
        alert("🎉 Hurray! You Won!");
        startGame(); // restart game
      }, 500);
    }

    resetTurn();
  } else {
    lockBoard = true;
    setTimeout(() => {
      firstCard.classList.remove("flipped");
      secondCard.classList.remove("flipped");

      firstCard.innerHTML = "?";
      secondCard.innerHTML = "?";

      resetTurn();
    }, 800);
  }
}

function resetTurn() {
  firstCard = null;
  secondCard = null;
  lockBoard = false;
}

// start game on load
startGame();