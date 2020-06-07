import React from 'react'
import { render, fireEvent, wait, screen } from '@testing-library/react'
import { MockedProvider } from '@apollo/react-testing';
import { FILTER_OPTIONS_QUERY } from "../../../apolloClient/query/characterQuery";
import FilterList from './FilterList';


test('filterList: should render)', async () => {
    let filterListResp = false;
    
    const mockProps = {
        filterData: {
            origin: [],
            species: [],
            gender: []
        }, 
        updateData: () => {}, 
        resetFilterData: () => {}
    }

    const mocks = [
      {
        request: {
          query: FILTER_OPTIONS_QUERY,
          variables: {},
        },
        result: () => {
           filterListResp = true
           return {"data":{"filterOptions":{"species":["Disease"],"origin":["Kyle's Teenyverse"],"gender":["Male","Female","unknown","Genderless"]}}}
        }
      },
    ];
  
    let {container} = render(
      <MockedProvider mocks={mocks} addTypename={false}>
            <FilterList  {...mockProps}/>
      </MockedProvider>,
    );
    
    // wait for filter list resp
    await wait(() => {
        // filter query should call
        expect(filterListResp).toBe(true);
        // match species content render content
        expect(screen.getByText('Disease')).toHaveTextContent('Disease');
        // match origin content render content
        expect(screen.getByText('Kyle\'s Teenyverse')).toHaveTextContent('Kyle\'s Teenyverse');
        // match gender content render content
        expect(screen.getByText('Male')).toHaveTextContent('Male');

        // find checkbox by value 
        let checkbox = screen.getByDisplayValue('Disease');
        fireEvent.click(checkbox);
        expect(checkbox).toBeChecked()
      })
  });