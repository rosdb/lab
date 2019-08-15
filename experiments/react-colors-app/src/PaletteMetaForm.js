import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

export default function PaletteMetaForm(props) {
  const [open, setOpen] = React.useState(true);
  const [newPaletteName, setPaletteName] = React.useState('');
  const {palettes, handleSubmit} = props;

  React.useEffect(() => {
    ValidatorForm.addValidationRule('isPaletteNameUnique', val =>
      palettes.every(
        ({paletteName}) => paletteName.toLowerCase() !== val.toLowerCase()
      )
    );
  });

  function handleClose() {
    setOpen(false);
  }

  function handleChangeNamePalette(evt) {
    setPaletteName((evt.target.name = evt.target.value));
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Choose a Palette Name</DialogTitle>
      <ValidatorForm onSubmit={() => handleSubmit(newPaletteName)}>
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
            errorMessages={['enter palette name', 'palette name already used']}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button variant="contained" color="primary" type="submit">
            Save Palette
          </Button>
        </DialogActions>
      </ValidatorForm>
    </Dialog>
  );
}
