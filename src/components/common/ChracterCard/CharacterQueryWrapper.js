import React from 'react'
import { useQuery } from '@apollo/react-hooks';
import { CHARACTER_LIST_QUERY } from '../../../apolloClient/query/characterQuery'
import { FilterServiceContext } from '../FilterList/FilterServiceProvider';
import CharacterCard from './CharacterCard'
import Loader from '../../Loader';


export default function CharacterQueryWrapper() {
    const {filterData} = React.useContext(FilterServiceContext);
    const { loading, data } = useQuery(CHARACTER_LIST_QUERY, {
        variables: {
            ...filterData
        }
    });
    if(loading) return <Loader />
    if(!data) return null;
    return (
        data.characterList.map((item) => <CharacterCard key={item.id} item={item} />)
    )
}