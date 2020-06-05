import React from 'react';
import Grid from '@material-ui/core/Grid';
import CharacterQueryWrapper from '../common/ChracterCard/CharacterQueryWrapper';
import { FilterServiceHOC } from '../common/FilterList/FilterServiceProvider';
import FilterList from '../common/FilterList';
import SearchOptions from '../common/SearchOptions';
import { Helmet } from "react-helmet-async";


const Home = (props) => {
   return(<>
      <Helmet>
         <title>Home - Ricky And Monty</title>
      </Helmet>
      <Grid container spacing={3}>
         <Grid item xs={12} sm={5} md={3}>
            <FilterList />
         </Grid>
         <Grid item xs={12} sm={7} md={9}>
            <Grid container>
               <SearchOptions />
               <Grid container spacing={2} style={{paddingTop: 16}} alignItems="center">
                  <CharacterQueryWrapper />
               </Grid>
            </Grid>
         </Grid>
      </Grid>
   </>)
}

export default FilterServiceHOC(Home);
