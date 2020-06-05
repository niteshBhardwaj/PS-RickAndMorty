import React from 'react';
import { FilterServiceHOC, FilterServiceContext } from './FilterServiceProvider';
import {useHistory} from 'react-router-dom';


function SearchFilterWrapper({children}) {
  let { search } = useHistory().location;
  const {mapQueryData, queryStringParse, ...others} = React.useContext(FilterServiceContext);
  let [queryData, setQueryData] = React.useState({});

  const setQueryCallback = React.useCallback(() => {
      let data = mapQueryData(queryStringParse(search));
      setQueryData(data);
  }, [mapQueryData, queryStringParse, search])

  React.useEffect(() => {
    setQueryCallback();
  }, [setQueryCallback])

  return (
    <>
      {children({queryData, ...others})}
    </>  
  );
}
//query:search, location: location.coords, date, distance 
export default FilterServiceHOC(SearchFilterWrapper);