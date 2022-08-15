const $ = (selector) => document.querySelector(selector);
let score = 0;
let scoreBank = 0;
let coloda = [];
let openCards = [];
let bankCards = [];
let gameInProgress = true;

const tosovka = () => {
	openCards = [];
	bankCards = [];
	score = 0;
	scoreBank = 0;
	gameInProgress = true;
	coloda = [];
	$('#status').innerHTML = 'Идёт игра';

	class Card {
		constructor(suit, rank, value) {
			this.suit = suit;
			this.rank = rank;
			this.value = value;
		}
	}

	class Deck {
		constructor() {
			this.cards = [];
		}

		createDeck() {
			let suits = ['clubs', 'diams', 'hearts', 'spades'];
			let ranks = ['6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
			let values = [6, 7, 8, 9, 10, 2, 3, 4, 11];

			for (let i = 0; i < suits.length; i++) {
				for (let j = 0; j < ranks.length; j++) {
					this.cards.push(new Card(suits[i], ranks[j], values[j]));
				}
			}
		}

		shuffleDeck() {
			let location1, location2, tmp;
			for (let i = 0; i < 1000; i++) {
				location1 = Math.floor((Math.random() * this.cards.length));
				location2 = Math.floor((Math.random() * this.cards.length));
				tmp = this.cards[location1];
				this.cards[location1] = this.cards[location2];
				this.cards[location2] = tmp;
			}
		}
	}

	const d = new Deck();
	d.createDeck(); //создать колоду
	d.shuffleDeck(); // тосовать
	coloda = d.cards;

	render();
}

function launchAaa() {
	if (score >= 21 || !gameInProgress) {
		return finish();
	}

	openCards.push(coloda.pop());
	score = openCards.reduce((sum, el) => sum + el.value, 0);

	if (scoreBank < 15 && score <= 21) {
		bankCards.push(coloda.pop());
		scoreBank = bankCards.reduce((sum, el) => sum + el.value, 0);
	}

	if (score >= 21 || !gameInProgress) {
		return finish();
	}

	render();
}

function finish() {
	gameInProgress = false;
	render();
}

function render() {
	if (!gameInProgress) {
		if (score <= 21 && score > scoreBank) {
			$('#status').innerHTML = 'Вы выиграли';
		} else if (score === scoreBank) {
			$('#status').innerHTML = 'Ничья';
		} else {
			$('#status').innerHTML = 'Вы проиграли';
		}
		$('#scoreBank').innerHTML = scoreBank > 21 ? `Перебор ${scoreBank}` : scoreBank;
		$('#bank').classList = ['flex-container'];
	} else {
		$('#scoreBank').innerHTML = '';
		$('#bank').classList = ['flex-container hidden'];
	}

	$('#score').innerHTML = score;
	$('#bank').innerHTML = bankCards.map(elem => `
		<div class="coloda">
			<div>&${elem.suit};<br>${elem.value}</div>
		</div>`
	).join();

	$('#pl').innerHTML = openCards.map(elem => `
		<div class="coloda ${elem.suit}">
			<div>&${elem.suit};<br>${elem.value}</div>
		</div>`
	).join('');
}

tosovka();
