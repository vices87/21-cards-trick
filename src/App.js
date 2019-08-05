import React, { useState, useEffect } from "react"
import "./App.css"

export default function App() {
  const [deck, setDeck] = useState([])
  const [myCard, setCard] = useState(null)
  const [pile1, setPile1] = useState([])
  const [pile2, setPile2] = useState([])
  const [pile3, setPile3] = useState([])
  const [round, setRound] = useState(0)

  useEffect(() => {
    async function fetchApi() {
      const response = await fetch(
        "https://deckofcardsapi.com/api/deck/new/draw/?count=21"
      )
      const data = await response.json()
      setDeck(data.cards)
    }
    fetchApi();
  }, []);

  function arrangeCards() {

    var pile1 = [];
    var pile2 = [];
    var pile3 = [];
    var a = [];

    for (var i = 0; i < 20; i = i + 3) {
      pile1.push(deck[i])
      pile2.push(deck[i + 1])
      pile3.push(deck[i + 2])
    }
    setPile1(pile1)
    setPile2(pile2)
    setPile3(pile3)

    a = pile1.concat(pile2, pile3)
    setDeck(a)
  }

  function select1() {

    var a = [];
    a = pile2.concat(pile1, pile3)
    var p1 = [];
    var p2 = [];
    var p3 = [];

    for (var i = 0; i < 20; i = i + 3) {
      p1.push(a[i])
      p2.push(a[i + 1])
      p3.push(a[i + 2])
    }

    setPile1(p1)
    setPile2(p2)
    setPile3(p3)
    setDeck(a)
  }

  function select2() {

    var a = [];
    a = pile1.concat(pile2, pile3)
    var p1 = [];
    var p2 = [];
    var p3 = [];

    for (var i = 0; i < 20; i = i + 3) {
      p1.push(a[i])
      p2.push(a[i + 1])
      p3.push(a[i + 2])
    }

    setPile1(p1)
    setPile2(p2)
    setPile3(p3)
    setDeck(a)
  }

  function select3() {

    var a = [];
    a = pile1.concat(pile3, pile2)
    var p1 = [];
    var p2 = [];
    var p3 = [];

    for (var i = 0; i < 20; i = i + 3) {
      p1.push(a[i])
      p2.push(a[i + 1])
      p3.push(a[i + 2])
    }

    setPile1(p1)
    setPile2(p2)
    setPile3(p3)
    setDeck(a)
  }


  //console.log("deck", deck)
  //console.log("pile1 =", pile1)
  //console.log("pile2 =", pile2)
  //console.log("pile3 =", pile3)
  //console.log("myCard=", myCard)
  //console.log("round", round)

  return (

    <nav>

      {myCard == null ?
        <div>
          {deck.map(card => (
            <img src={card.image} alt="nada" height="120" width="100"
              onClick={() => {
                setCard(card.code)
                arrangeCards()

              }}
            />
          ))}
          <h1>Memorize a card, then click on any of the cards above.</h1>
          <h1>I will try to find out which card you chose.</h1>
          <h1>You may click on any card to shuffle the deck. Even if it's not the one you picked.</h1>

        </div>
        : null}

      {myCard != null && round < 3 ?
        <div>

          <header>
            <h1>Now, select which pile your card is located at. Use the buttons 1, 2 or 3.</h1>
            <h1>When the shuffle is done, select again.</h1>
            <h1>Repeat 3 times</h1>
          </header>
          <div class="div1">

            <button onClick={() => { select1(); setRound(round + 1) }}>
              1
</button>

            {pile1.map(card => (
              <img src={card.image} alt="nada" height="120" width="100" />
            ))}

          </div>
          <div class="div1">

            <button onClick={() => { select2(); setRound(round + 1) }}>
              2
</button>

            {pile2.map(card => (
              <img src={card.image} alt="nada" height="120" width="100" />
            ))}

          </div>
          <div class="div1">

            <button onClick={() => { select3(); setRound(round + 1) }}>
              3
</button>

            {pile3.map(card => (
              <img src={card.image} alt="nada" height="120" width="100" />
            ))}

          </div>
        </div>
        : null}

      {round === 3 ?
        <div>
          <h1> This is your card! </h1>
          <h1><img src={deck[10].image} alt="nada" height="150" width="120" /></h1>
        </div>
        : null}

    </nav>

  );
}
