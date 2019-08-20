import React from 'react';
import clsx from 'clsx';
import {useTheme} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Button from '@material-ui/core/Button';
import arrayMove from 'array-move';
import PaletteFormNav from './PaletteFormNav';
import ColorPickerForm from './ColorPickerForm';
import DraggableColorList from './DraggableColorList';
import useStyles from './styles/NewPaletteFormStyles';

export default function NewPaletteForm(props) {
  const classes = useStyles();
  const theme = useTheme();
  const {maxColor = 20} = props;
  const palettes = props.palette;
  const [open, setOpen] = React.useState(false);
  const [colors, addColor] = React.useState(palettes[0].colors);
  const paletteIsFull = colors.length >= maxColor;

  function handleDrawerOpen() {
    setOpen(true);
  }

  function handleDrawerClose() {
    setOpen(false);
  }

  function addNewColor(newColor) {
    addColor([...colors, newColor]);
  }

  function handleSubmit(newPalette) {
    newPalette.id = newPalette.paletteName.toLowerCase().replace(/ /g, '-');
    newPalette.colors = colors;
    props.savePalette(newPalette);
    props.history.push('/');
  }

  function removeColor(colorName) {
    const colorFiltered = colors.filter(color => color.name !== colorName);
    addColor([...colorFiltered]);
  }

  function onSortEnd({oldIndex, newIndex}) {
    addColor(arrayMove(colors, oldIndex, newIndex));
  }

  function clearColors() {
    addColor([]);
  }

  function addRandomColor() {
    const allColors = palettes.map(p => p.colors).flat();
    const rand = Math.floor(Math.random() * allColors.length);
    const randomColor = allColors[rand];
    addColor([...colors, randomColor]);
  }

  return (
    <div className={classes.root}>
      <PaletteFormNav
        open={open}
        classes={classes}
        palettes={palettes}
        handleDrawerOpen={handleDrawerOpen}
        handleSubmit={handleSubmit}
      />
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <div className={classes.container}>
          <Typography variant="h4" gutterBottom>
            Design your Palette
          </Typography>
          <div className={classes.buttons}>
            <Button
              variant="contained"
              color="secondary"
              onClick={clearColors}
              className={classes.button}
            >
              Clear Palette
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={addRandomColor}
              disabled={paletteIsFull}
              className={classes.button}
            >
              Random Color
            </Button>
          </div>
          <ColorPickerForm
            paletteIsFull={paletteIsFull}
            addNewColor={addNewColor}
            colors={colors}
          />
        </div>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        <DraggableColorList
          colors={colors}
          removeColor={removeColor}
          axis="xy"
          onSortEnd={onSortEnd}
          distance={20}
        />
      </main>
    </div>
  );
}
