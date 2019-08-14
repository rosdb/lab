import React from 'react';
import {ChromePicker} from 'react-color';
import Button from '@material-ui/core/Button';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

export default function ColorPickerForm(props) {
  const {paletteIsFull, addNewColor, colors} = props;
  const [currentColor, setColor] = React.useState('teal');
  const [newColorName, setColorName] = React.useState('');

  React.useEffect(() => {
    ValidatorForm.addValidationRule('isColorNameUnique', val =>
      colors.every(({name}) => name.toLowerCase() !== val.toLowerCase())
    );
    ValidatorForm.addValidationRule('isColorUnique', () =>
      colors.every(({color}) => color !== currentColor)
    );
  });

  function updateCurrentColor(newColor) {
    setColor(newColor.hex);
  }

  function handleChangeNameColor(evt) {
    setColorName((evt.target.name = evt.target.value));
  }

  function handleSubmit() {
    const newColor = {color: currentColor, name: newColorName};
    addNewColor(newColor);
    setColorName('');
  }

  return (
    <div>
      <ChromePicker
        color={currentColor}
        onChangeComplete={updateCurrentColor}
      />
      <ValidatorForm onSubmit={handleSubmit}>
        <TextValidator
          value={newColorName}
          name="newColorName"
          onChange={handleChangeNameColor}
          validators={['required', 'isColorNameUnique', 'isColorUnique']}
          errorMessages={[
            'this field is required',
            'color name must be unique',
            'color already used',
          ]}
        />
        <Button
          variant="contained"
          color="primary"
          disabled={paletteIsFull}
          style={{backgroundColor: paletteIsFull ? 'grey' : currentColor}}
          type="submit"
        >
          {paletteIsFull ? 'Palette Full' : 'Add Color'}
        </Button>
      </ValidatorForm>
    </div>
  );
}
