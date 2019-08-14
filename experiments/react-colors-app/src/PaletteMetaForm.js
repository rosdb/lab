import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

export default function PaletteMetaForm(props) {
  const [open, setOpen] = React.useState(false);
  const [newPaletteName, setPaletteName] = React.useState('');
  const {palettes, handleSubmit} = props;

  React.useEffect(() => {
    ValidatorForm.addValidationRule('isPaletteNameUnique', val =>
      palettes.every(
        ({paletteName}) => paletteName.toLowerCase() !== val.toLowerCase()
      )
    );
  });

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function handleChangeNamePalette(evt) {
    setPaletteName((evt.target.name = evt.target.value));
  }

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open form dialog
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>
          <ValidatorForm onSubmit={() => handleSubmit(newPaletteName)}>
            <TextValidator
              label="Palette Name"
              value={newPaletteName}
              name="newPaletteName"
              onChange={handleChangeNamePalette}
              validators={['required', 'isPaletteNameUnique']}
              errorMessages={[
                'enter palette name',
                'palette name already used',
              ]}
            />
            <Button variant="contained" color="primary" type="submit">
              Save Palette
            </Button>
          </ValidatorForm>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
