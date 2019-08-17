import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import 'emoji-mart/css/emoji-mart.css';
import {Picker} from 'emoji-mart';

export default function PaletteMetaForm(props) {
  const [stage, setStage] = React.useState('form');
  const [newPaletteName, setPaletteName] = React.useState('');
  const {palettes, hideForm, handleSubmit} = props;

  React.useEffect(() => {
    ValidatorForm.addValidationRule('isPaletteNameUnique', val =>
      palettes.every(
        ({paletteName}) => paletteName.toLowerCase() !== val.toLowerCase()
      )
    );
  });

  function handleChangeNamePalette(evt) {
    setPaletteName((evt.target.name = evt.target.value));
  }

  function showEmojiPicker() {
    setStage('emoji');
  }

  function savePalette(emoji) {
    const newPalette = {paletteName: newPaletteName, emoji: emoji.native};
    handleSubmit(newPalette);
  }

  return (
    <div>
      <Dialog open={stage === 'emoji'}>
        <DialogTitle id="form-dialog-title">Choose a Palette Emoji</DialogTitle>
        <Picker onSelect={savePalette} title="Pick a Palette Emoji" />
      </Dialog>
      <Dialog
        open={stage === 'form'}
        onClose={hideForm}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Choose a Palette Name</DialogTitle>
        <ValidatorForm onSubmit={showEmojiPicker}>
          <DialogContent>
            <DialogContentText>
              Please enter a name for your new beautiful palette. Make sure it's
              unique!
            </DialogContentText>
            <TextValidator
              label="Palette Name"
              value={newPaletteName}
              name="newPaletteName"
              onChange={handleChangeNamePalette}
              fullWidth
              margin="normal"
              validators={['required', 'isPaletteNameUnique']}
              errorMessages={[
                'enter palette name',
                'palette name already used',
              ]}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={hideForm} color="primary">
              Cancel
            </Button>
            <Button variant="contained" color="primary" type="submit">
              Save Palette
            </Button>
          </DialogActions>
        </ValidatorForm>
      </Dialog>
    </div>
  );
}
