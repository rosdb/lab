import React from 'react';
import {withStyles} from '@material-ui/styles';
import style from './styles/PaletteFooterStyles';

function PaletteFooter(props) {
  const {paletteName, emoji, classes} = props;
  return (
    <footer className={classes.Footer}>
      {paletteName}
      <span className={classes.Emoji}>{emoji}</span>
    </footer>
  );
}

export default withStyles(style)(PaletteFooter);
