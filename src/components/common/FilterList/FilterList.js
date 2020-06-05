import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { FILTER_OPTIONS_QUERY } from '../../../apolloClient/query/characterQuery';
import { useQuery } from '@apollo/react-hooks';
import { Divider, Button } from '@material-ui/core';
import { FilterServiceContext } from './FilterServiceProvider';
import CheckboxList from './CheckboxList';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    formControl: {
      margin: theme.spacing(3),
    //   overflowY: 'auto'
    },
    formLabel: {
        textTransform: 'capitalize'
    }
  }));

const filterListNames = ['species', 'gender', 'origin'];

export default function FilterList(props) {
    let classes = useStyles();
    const { data } = useQuery(FILTER_OPTIONS_QUERY);
    let {filterData, updateData, resetFilterData} = React.useContext(FilterServiceContext);
    let [filterList, setFilterList] = React.useState(filterData);
    if(!data) return null;
    let {filterOptions} = data;

    const handleChange = (e) => {
        let {name, value} = e.target;
        let list = filterList[name] || [];
        let index = list.indexOf(value);
        if(index >= 0) {
            list.splice(index, 1);
        } else {
            list.push(value)
        }
        filterList[name] = list;
        setFilterList({...filterList});
        setTimeout(() => updateData(name, list));
    }

    const checkedFilter = (name, label) => {
        let list = filterList[name];
        if(list) {
            return list.indexOf(label) >= 0
        }
        return false;
    }
    return (<>
        <Box mx={3} display="flex" justifyContent="space-between"> 
            <Typography variant="h6"> Filters </Typography>
            <Button onClick={resetFilterData}> Clear Filter </Button>
        </Box>
        {filterListNames.map((name) => <div key={name}> 
            <Divider />
            <FormControl key={name} component="fieldset" className={classes.formControl}>
                <FormLabel className={classes.formLabel} component="legend">{name}</FormLabel>
                
                <CheckboxList
                    name={name} 
                    handleChange={handleChange}
                    list={filterOptions[name]}
                    checkedFilter={checkedFilter} 
                    itemLength={filterOptions[name].length}
                />
                
            </FormControl>
        </div>)
        }
        
    </>)
}