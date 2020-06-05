import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button'
import { Box } from '@material-ui/core';
import { FilterServiceContext } from '../FilterList/FilterServiceProvider';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    border: `1px solid ${theme.palette.grey[400]}`,
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
    height: '100%',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },

}));

export default function SearchBar() {
  const classes = useStyles();
  const {filterData, updateSearch} = React.useContext(FilterServiceContext);
  const [search, handleSearch] = React.useState(filterData.query);

  const onSumbit = (e) => {
      e.preventDefault();
      updateSearch(search);
  }

  return (
    <form onSubmit={onSumbit} className={classes.grow}>
          <Typography className={classes.title} variant="body1">
            Search by name
          </Typography>
          <Box display="flex">
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              value={search}
              onChange={({target}) => handleSearch(target.value)}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
            <Button type="submit" color="primary" variant="contained"> Search </Button>
          </Box>
    </form>
  );
}