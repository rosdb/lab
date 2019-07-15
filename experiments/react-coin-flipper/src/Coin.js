import React, { Component } from 'react';
import './Coin.css';


class Coin extends Component {
  render() {
    return (
      <div className="Coins">
        <img className="Coin" src={this.props.isHead ? "https://i.postimg.cc/43Jb4Srn/italy1euro-head.jpg" : "https://i.postimg.cc/7Y2NK73P/1euro-tail.jpg"} alt="coinAlt" />
      </div>
    )
  };
};

export default Coin;
