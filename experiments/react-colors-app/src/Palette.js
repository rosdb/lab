import React, {Component} from 'react';
import ColorBox from './ColorBox';
import './Palette.css';

class Palette extends Component {
  render() {
    const colorBoxes = this.props.palette.colors.map(color => (
      <ColorBox background={color.color} name={color.name} />
    ));

    return (
      <div className="Palette">
        {/* Navbar */}
        <div className="Palette-colors">{colorBoxes}</div>
        {/* Footer */}
      </div>
    );
  }
}

export default Palette;
