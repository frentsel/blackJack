const $ = (selector) => document.querySelector(selector);
let score = 0;
let scoreBank = 0;
let coloda = [];
let openCards = [];
let bankCards = [];
let gameInProgress = true;

const Card = function(suit, rank, value) {
	return { suit, rank, value };
}

class Deck {
	constructor() {
		this.cards = [];
	}

	createDeck() {
		let suits = ['clubs', 'diams', 'hearts', 'spades'];
		let ranks = ['6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
		let values = [6, 7, 8, 9, 10, 2, 3, 4, 11];

		suits.forEach((suit) => {
			ranks.forEach((rank, n) => {
				this.cards.push(new Card(suit, rank, values[n]));
			});
		});
	}

	shuffleDeck() {
		const cards = [];
		const count = this.cards.length;

		for (let i = 0; i < count; i++) {
			const index = Math.floor(Math.random() * this.cards.length);
			cards.push(this.cards[index]);
			this.cards.splice(index, 1);
		}
		this.cards = cards;
	}
}

const tosovka = () => {
	openCards = [];
	bankCards = [];
	score = 0;
	scoreBank = 0;
	gameInProgress = true;
	coloda = [];
	$('#status').innerHTML = 'Идёт игра';

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
