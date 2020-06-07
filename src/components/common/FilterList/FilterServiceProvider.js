import React from "react";
import {useHistory} from 'react-router-dom';
import queryString from 'query-string'
import { UserSettingContext } from "../UserSettingProvider";

export const FilterServiceContext = React.createContext({});

const queryStringParse = (search) => queryString.parse(search, {arrayFormat: "comma"});

export default function FilterServiceProvider(props) {
  let history = useHistory();
  let {userSetting} =  React.useContext(UserSettingContext)
  let [query] = React.useState(queryStringParse(history.location.search));
  const replace = (value) => history.replace(value, value);

 const updateHistory = (query) => {
    let {pathname} = history.location;
    let stringified  = queryString.stringify(query, {arrayFormat: "comma"});
    replace(`${pathname}?${stringified}`);
 }

 const updateSearch = (search = "") => {
    query.q = encodeURIComponent(search);
    updateHistory({...query});
 }

 const updateData = (type, data) => {
    query[type] = data;
    updateHistory({...query});
 }

 const resetFilterData = () => {
   updateHistory({});
 }
 const mapFilterData = (query) => {
    return {
      species: typeof query.species === "string"? [query.species] : query.species,
      gender: typeof query.gender === "string"? [query.gender] : query.gender, 
      origin: typeof query.origin === "string"? [query.origin] : query.origin,
      query: decodeURIComponent(query.q || ""),
      sort: (query.sort || userSetting?.preference?.sort) | 0
   }
 }

 let filterData = mapFilterData(query)
  return (
    <FilterServiceContext.Provider value={{
         filterData, 
         updateSearch, 
         updateData, 
         updateHistory, 
         resetFilterData 
      }}>
      {!!userSetting && props.children}
    </FilterServiceContext.Provider>
  );
};

export const FilterServiceHOC = (Comp) => (props) => <FilterServiceProvider> <Comp {...props} /> </FilterServiceProvider>

export const withFilterService = (Comp) => (props) => {
  const data = React.useContext(FilterServiceContext);
  return <Comp {...props} {...data}  />
}