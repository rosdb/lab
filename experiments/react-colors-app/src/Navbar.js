import React, {Component} from 'react';
import 'rc-slider/assets/index.css';
import Slider from 'rc-slider';
import './Navbar.css';

class Navbar extends Component {
  render() {
    const {level, changeLevel} = this.props;
    return (
      <header className="Navbar">
        <div className="Logo">
          <a href="#">reactcolorpicker</a>
        </div>
        <div className="Slider">
          <span>Level: {level}</span>
          <Slider
            defaultValue={level}
            min={100}
            max={900}
            onAfterChange={changeLevel}
            step={100}
          />
        </div>
      </header>
    );
  }
}

export default Navbar;
