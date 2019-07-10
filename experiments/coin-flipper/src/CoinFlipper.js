import React, { Component } from 'react';
import Coin from './Coin';


class CoinFlipper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flipsNum: 0,
      headsNum: 0,
      tailsNum: 0,
      isHead: false
    };
    this.updateFlips = this.updateFlips.bind(this);
  }
  updateFlips() {
    let rand = Boolean(Math.round(Math.random()));
    this.setState(st => {
      return {
        flipsNum: this.state.flipsNum + 1,
        isHead: rand,
        headsNum: this.state.headsNum + (rand ? 1 : 0),
        tailsNum: this.state.tailsNum + (!rand ? 1 : 0)
      }
    })
  }
  render() {
    return (
      <div className="CoinFlipper">
        <h1>Let's flip a coin</h1>
        <Coin isHead={this.state.isHead} />
        <button onClick={this.updateFlips}>Flip me!</button>
        <p>{`Out of ${this.state.flipsNum} flips, there have been ${this.state.headsNum} heads and ${this.state.tailsNum} tails.`}</p>
      </div>
    )
  };
};

export default CoinFlipper;
