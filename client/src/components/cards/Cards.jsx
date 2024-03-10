import React, { Component } from 'react';
import Card from '../card/Card.jsx';
import './cards.css';

class Cards extends Component {
  render() {
    return (
      <div className="div-cards">
        {this.props.visibleCharacters.map((character) => (
          <div key={character.id} className="cards">
            <Card character={character} />
          </div>
        ))}
      </div>
    );
  }
}

export default Cards;