import React from 'react';
import {ValidatorForm} from 'react-material-ui-form-validator';

ValidatorForm.addValidationRule('passwordLength', (value="") => {
    return value.length >= 6 && value.length <= 20
});

ValidatorForm.addValidationRule('email', (value) => {
    return /\S+@\S+\.\S+/.test(value);
});


export default function FormCont(props) {
  return (
    <ValidatorForm
      {...props}
    />
  )
}
