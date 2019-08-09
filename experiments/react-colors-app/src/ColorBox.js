import React, {Component} from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {Link} from 'react-router-dom';
import chroma from 'chroma-js';
import './ColorBox.css';

class ColorBox extends Component {
  constructor(props) {
    super(props);
    this.state = {copied: false};
    this.changeCopyState = this.changeCopyState.bind(this);
  }

  changeCopyState() {
    this.setState({copied: true}, () => {
      setTimeout(() => this.setState({copied: false}), 1500);
    });
  }

  render() {
    const {name, background, paletteId, id} = this.props;
    const {copied} = this.state;

    debugger;
    const isDarkColor = chroma(background).luminance() <= 0.08;
    const isLightColor = chroma(background).luminance() >= 0.7;

    return (
      <CopyToClipboard text={background} onCopy={this.changeCopyState}>
        <div className="ColorBox" style={{background}}>
          <div
            className={`copy-overlay ${copied && 'show'}`}
            style={{background}}
          />
          <div className={`copy-msg ${copied && 'show'}`}>
            <h1>copied!</h1>
            <p className={isLightColor && 'dark-text'}>
              {this.props.background}
            </p>
          </div>
          <div className="copy-container">
            <div className="box-content">
              <span className={isDarkColor && 'light-text'}>
                {name} {chroma(background).luminance()}
              </span>
            </div>
            <button
              type="button"
              className={`copy-button ${isLightColor && 'dark-text'}`}
            >
              Copy
            </button>
          </div>
          <Link
            to={`/palette/${paletteId}/${id}`}
            onClick={e => e.stopPropagation()}
          >
            <span className={`see-more ${isLightColor && 'dark-text'}`}>
              MORE
            </span>
          </Link>
        </div>
      </CopyToClipboard>
    );
  }
}

export default ColorBox;
