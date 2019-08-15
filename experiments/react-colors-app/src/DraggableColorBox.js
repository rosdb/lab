import React from 'react';
import {withStyles} from '@material-ui/styles';
import {SortableElement} from 'react-sortable-hoc';
import DeleteIcon from '@material-ui/icons/Delete';
import style from './styles/DraggableColorBoxStyles';

const DraggableColorBox = SortableElement(props => {
  const {classes, color, nameColor, handleClick} = props;
  return (
    <div className={classes.root} style={{backgroundColor: color}}>
      <div className={classes.boxContent}>
        <span>{nameColor}</span>
        <DeleteIcon className={classes.deleteIcon} onClick={handleClick} />
      </div>
    </div>
  );
});

export default withStyles(style)(DraggableColorBox);
