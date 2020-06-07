import React from 'react'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import FormGroup from '@material-ui/core/FormGroup';


export default function CheckboxList({name, list, checkedFilter, handleChange, maxShow=4, itemLength}) {
    let [show, handleShow] = React.useState(false);
    if(!show && itemLength > maxShow) {
        list = list.slice(0, maxShow)
    }
    return (<>
    <FormGroup>
    {list.map((label) => <FormControlLabel key={label}
        control={<Checkbox checked={checkedFilter(name, label)} value={label} onChange={handleChange} name={name} />}
        label={label}
    />)}
    </FormGroup>
    {itemLength > maxShow && <Button onClick={e => handleShow(!show)} color="primary"> {show? 'Hide':`${itemLength - maxShow} More`} </Button>}
</>)
}
