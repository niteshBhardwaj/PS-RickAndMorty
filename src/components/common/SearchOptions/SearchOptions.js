import React from 'react'
import Grid from '@material-ui/core/Grid'
import SearchBar from './SearchBar'
import ShortByDropDown from './ShortByDropDown'
import SelectedFilter from './SelectedFilters'

export default function SearchOption(props) {
    return (<Grid style={{minHeight: "140px"}} container>
    <SelectedFilter />
    <Grid container alignItems="flex-end">
        <Grid item xs={12} md={8}>
            <SearchBar />
        </Grid>
        <Grid item xs={12} md={4}>
            <Grid container justify="flex-end">  
                <ShortByDropDown />
            </Grid>
        </Grid>
    </Grid>
</Grid>)
}