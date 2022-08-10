

let score, scoreBank, coloda, card, p;
let openСards = [];
////////////tosovka///////////////
function tosovka() {
    document.querySelector('#btn1').innerHTML = 'взять';
    document.querySelector('#btn2').innerHTML = 'пас';
    openСards.length = 0;
    score = 0;
    scoreBank = 0;
    coloda = [];
    card = 0;
    document.querySelector('#result').innerHTML = 'идёт игра';
    document.querySelector('#pl').innerHTML = '';
    document.querySelector('#bank').innerHTML = '';
    document.querySelector('#score').innerHTML = '';
    document.querySelector('#scoreBank').innerHTML = '';

    class Card {
        constructor(suit, rank, value) {
            this.suit = suit;
            this.rank = rank;
            this.value = value;
        }
    }

    //let сard = new Card("an awesome Suit", "Joker", 100);
    //console.log(сard);

    class Deck {
        constructor() {
            this.cards = [];
        }

        createDeck() {
            let suits = ['&clubs;', '&diams;', '&hearts;', '&spades;'];
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
    //console.log(d.cards);

}
///////////////////////////////

////////////bankir//////////

function bankir() {

    let cardBankir = Object.entries(coloda[0]);
    cardBankir = cardBankir.map(elem => elem[1]);
    openСards.push(cardBankir);
    //console.log(openСards);

    //--------------------

    let divCard = document.querySelector('#bank');
    p = document.createElement('div');
    p.classList.add("coloda");
    p.style.background = 'radial-gradient(#000 0%, #7B1672 100%)';
    //p.innerHTML = `<div>${cardBankir[0]}<br>${cardBankir[1]}</div>`;
    //openСards.push(`<div>${cardBankir[0]}<br>${cardBankir[1]}</div>`);
    divCard.append(p);

    //------------------

    coloda.shift();

    scoreBank = scoreBank + cardBankir[2];
    if (scoreBank > 21) {
    
        //p.style.background = 'radial-gradient(#FFFFE0 0%, #BDB76B 70%)'

        showСards();


        document.querySelector('#scoreBank').innerHTML = `перебор ${scoreBank}`;
        document.querySelector('#result').innerHTML = 'вы выиграли';

    } else if (scoreBank > 14 && scoreBank <= 21) {


        document.querySelector('#scoreBank').innerHTML = `пас`;//  ${scoreBank} ;


    } else {

        //document.querySelector('#scoreBank').innerHTML = scoreBank;

    }

}

///////////////////////
function launchBankir() {

    if (scoreBank < 15) {

        bankir();
        launchBankir();
        // setTimeout(function() {

        // bankir();
        //  launchBankir();

        //  }, 500);


    }
}
//////aaa/////

function aaa() {

    card = Object.entries(coloda[0]);
    //console.log(card);

    card = card.map(elem => elem[1]);

    //console.log(card);
    let divCard = document.querySelector('#pl');
    //divCard.innerHTML = 

    //////////////////////////////

    let p = document.createElement('div');
    p.classList.add("coloda");
    p.style.background = 'radial-gradient(#FFFFE0 0%, #BDB76B 70%)';
    p.innerHTML = `<div>${card[0]}<br>${card[1]}</div>`;
    divCard.append(p);

    //////////////////////////////
    coloda.shift();
    score = score + card[2];
    if (score <= 21) {
        document.querySelector('#score').innerHTML = score;
    } else {

        showСards();

        document.querySelector('#score').innerHTML = `перебор ${score}`;
        document.querySelector('#result').innerHTML = 'вы проиграли';
        cardBankir = '';
        card = '';
    }

    if (scoreBank < 15 && score <= 21) {

        bankir();
        //setTimeout(bankir, 500);

    }

}
////////////////

///////launchAaa/////

function launchAaa() {

    if (card !== '') {

        aaa();

    }

}

///////

///////pas/////////////

function pas() {

    document.querySelector('#score').innerHTML = `пас ${score}`;
    card = '';

    launchBankir();

    //console.log(openСards);

    showСards();

    /////////////

    function compare() {

        if (score > scoreBank || scoreBank > 21) {

            document.querySelector('#result').innerHTML = 'вы выиграли';
            p.style.background = 'radial-gradient(#FFFFE0 0%, #BDB76B 70%)';
        } else if (score < scoreBank) {

            document.querySelector('#result').innerHTML = 'вы проиграли';
            p.style.background = 'radial-gradient(#FFFFE0 0%, #BDB76B 70%)';
        } else {

            document.querySelector('#result').innerHTML = 'ничья';
            p.style.background = 'radial-gradient(#FFFFE0 0%, #BDB76B 70%)';
        }

    }
    compare();
    //setTimeout(compare, 2500);

}
///////pasLaunch/////
function pasLaunch() {

    if (score <= 21) {
        //pas();
        setTimeout(pas, 500);

    }

}

function showСards() {

    let divCard = document.querySelector('#bank');
    divCard.innerHTML = '';
    document.querySelector('#scoreBank').innerHTML = scoreBank;
    openСards.forEach(function (elem) {

        let p = document.createElement('div');
        p.classList.add("coloda");
        p.style.background = 'radial-gradient(#FFFFE0 0%, #BDB76B 70%)';
        p.innerHTML = `<div>${elem[0]}<br>${elem[1]}</div>`;
        divCard.append(p);
    });


}	
