import React, {Component} from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {Link} from 'react-router-dom';
import style from './styles/ColorBoxStyles';
import {withStyles} from '@material-ui/styles';

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
    const {
      name,
      background,
      paletteId,
      id,
      classes,
      showingFullPalette,
    } = this.props;
    const {copied} = this.state;

    return (
      <CopyToClipboard text={background} onCopy={this.changeCopyState}>
        <div className={classes.colorBox} style={{background}}>
          <div
            className={`${classes.copyOverlay} ${copied &&
              classes.showOverlay}`}
            style={{background}}
          />
          <div
            className={`${classes.copyMessage} ${copied &&
              classes.showMessage}`}
          >
            <h1>copied!</h1>
            <p className={classes.copyText}>{this.props.background}</p>
          </div>
          <div>
            <div className={classes.boxContent}>
              <span className={classes.colorName}>{name}</span>
            </div>
            <button type="button" className={classes.copyButton}>
              Copy
            </button>
          </div>
          {showingFullPalette && (
            <Link
              to={`/palette/${paletteId}/${id}`}
              onClick={e => e.stopPropagation()}
            >
              <span className={classes.seeMore}>MORE</span>
            </Link>
          )}
        </div>
      </CopyToClipboard>
    );
  }
}

export default withStyles(style)(ColorBox);
