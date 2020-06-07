import React from 'react';
import {TextValidator} from 'react-material-ui-form-validator';

export default function TextField(props) {
  return (
    <TextValidator
      fullWidth={true}
      margin="normal"
      variant="outlined"
      InputLabelProps={{
        shrink: true,
      }}
      {...props}
    />
  )
}


TextField.defaultProps = {
  onChange: () => {}
}