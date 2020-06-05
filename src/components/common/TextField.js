import React from 'react';
import {TextValidator} from 'react-material-ui-form-validator';

export default function TextField(props) {
  let {getValue, readOnlyValue, initialVal, ...others} = props;
  const [value, setValue] = React.useState(readOnlyValue || initialVal);
    
  function handleChange({target}) {
    let {name, value} = target;
    setValue(value)
    if(!!getValue) {
      getValue(value, name);
    }
  }
  return (
    <TextValidator
      onChange={handleChange}
      value={readOnlyValue || value}
      fullWidth={true}
      margin="normal"
      variant="outlined"
      InputLabelProps={{
        shrink: true,
      }}
      {...others}
    />
  )
}


TextField.defaultProps = {
  getValue: () => {}
}