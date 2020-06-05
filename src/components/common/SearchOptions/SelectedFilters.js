import React from 'react';
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Chip from '@material-ui/core/Chip'
import { makeStyles } from '@material-ui/core/styles';
import { FilterServiceContext } from '../FilterList/FilterServiceProvider';

const useStyles = makeStyles(theme => ({
    chip: {
        margin: '0 8px 8px 0'
    }
}))

export default function SelectedFilter(props) {
    let {filterData:{species, origin}, updateData} = React.useContext(FilterServiceContext);
    let classes = useStyles();

    const handleDelete = (label, list, type) => {
        let updatedList = list.filter(item => item !== label);
        updateData(type, updatedList);
    }
    
    return (<Grid item xs={12}>
        <Typography variant="h6"> Selected Filter </Typography>
        <Box py={2}>
        {species && species.map(label =>  <Chip
            className={classes.chip}
            label={label}
            onDelete={e => handleDelete(label, species, 'species')}
            variant="outlined"
        />)}
        {origin && origin.map(label =>  <Chip
            className={classes.chip}
            label={label}
            onDelete={e => handleDelete(label, origin, 'origin')}
            variant="outlined"
        />)}
        </Box>
    </Grid>)
}