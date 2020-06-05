import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import { SAVE_PREFERENCE_QUERY } from '../../../apolloClient/query/userQuery';
import { useMutation } from '@apollo/react-hooks';
import { FilterServiceContext } from '../FilterList/FilterServiceProvider';

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

export default function ShortByDropDown(props) {
    let classes = useStyles();
    const {filterData, updateData} = React.useContext(FilterServiceContext);
    const [sortValue, handleSort] = React.useState(filterData.sort);
    const [savePreference] = useMutation(SAVE_PREFERENCE_QUERY);
    const handleChange = ({target}) => {
        let {name, value} = target;
        handleSort(value);
        setTimeout(() => updateData(name, value));
        // save preference on change
        savePreference({variables: {sort: Number(value)}})
        .catch((e) => console.log(e))
    }   

    return (<FormControl className={classes.formControl}>
        <NativeSelect
          className={classes.selectEmpty}
          value={sortValue}
          name="sort"
          inputProps={{ 'aria-label': 'sort by id' }}
          onChange={handleChange}
        >
          <option value={0} disabled>
            Short by ID
          </option>
          <option value={1}>Ascending</option>
          <option value={-1}>Descending</option>
        </NativeSelect>
    </FormControl>)
}