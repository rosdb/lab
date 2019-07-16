import React, { Component } from 'react';
import Card from './Card';
import './Deck.css';
import axios from "axios";
const API_BASE_URL = "https://deckofcardsapi.com/api/deck/";


class Deck extends Component {
  constructor(props) {
    super(props);
    this.state = { deck: null, drawn: [] };
    this.getCard = this.getCard.bind(this);
  }
  async componentDidMount() {
    let deck = await axios.get(`${API_BASE_URL}new/shuffle/`);
    this.setState({ deck: deck.data });
  }
  async getCard() {
    let id = this.state.deck.deck_id;
    try {
      let cardUrl = `${API_BASE_URL}${id}/draw/`
      let cardResp = await axios.get(cardUrl);
      if (!cardResp.data.success) {
        throw new Error('No card remaining!')
      }
      let card = cardResp.data.cards[0];
      this.setState(st => ({
        drawn: [...st.drawn,
        {
          id: card.code,
          image: card.image,
          name: `${card.suit} of ${card.value}`,
        }
        ]
      }));
    } catch (error) {
      alert(error);
    }
  }
  render() {
    const cards = this.state.drawn.map(c => (
      <Card key={c.id} name={c.name} image={c.image} />
    ))
    return (
      <div className="Deck">
        <h1 className="Deck-title">♦ Card Dealer ♦</h1>
        <h2 className="Deck-title subtitle">♦ A little demo made with React ♦</h2>
        <button className='Deck-btn' onClick={this.getCard}>Get Card</button>
        <div className="Deck-cards">{cards}</div>
      </div>
    )
  }
}

export default Deck;
