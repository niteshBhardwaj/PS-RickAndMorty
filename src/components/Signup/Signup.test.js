import React from 'react'
import { render, fireEvent, wait, screen } from '@testing-library/react'
import { MockedProvider } from '@apollo/react-testing';
import Signup from "./Signup";
import { SIGNUP_QUERY } from '../../apolloClient/query/loginSignupQuery';
import { createMemoryHistory } from 'history'
import {Router} from 'react-router-dom'
import { HelmetProvider } from "react-helmet-async";
import {
    toBeDisabled,
  } from '@testing-library/jest-dom'

expect.extend({toBeDisabled})

it('signup: it should render and match all the cases (email, password and login submit)', async () => {
    const history = createMemoryHistory();
    let setSignupResp = false;

    const mockProps = {
      history: {
        replace: () => true
      }
    }

    const mocks = [
      {
        request: {
          query: SIGNUP_QUERY,
          variables: { name: "Username", email: "abc@gmail.com", "password": "abcfdfddf" },
        },
        result: () => {
            setSignupResp = true
           return {"data":{"signup": null}}
        }
      },
    ];
  
    let {container} = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <HelmetProvider>
            <Router history={history}>
                <Signup  {...mockProps}/>
            </Router>  
        </HelmetProvider>  
      </MockedProvider>,
    );
  
    const nameInput = screen.getByPlaceholderText('Enter Your Full Name'); 
    const emailInput = screen.getByPlaceholderText('Enter Your email.'); 
    const passwordInput = screen.getByPlaceholderText('Enter Your Password'); 
    const form = container.querySelector('form');
    
    // check name value
    fireEvent.change(nameInput, { target: { value: 'Username' } })
    expect(nameInput.value).toBe('Username')

    // check email value
    fireEvent.change(emailInput, { target: { value: 'abc@gmail.com' } })
    expect(emailInput.value).toBe('abc@gmail.com')

    // check password value
    fireEvent.change(passwordInput, { target: { value: 'abcfdfddf' } })
    expect(passwordInput.value).toBe('abcfdfddf')
    
    // submit login form
    fireEvent.submit(form)
   
    //const button = form.querySelector('[type="submit"]');
    //expect(button).toBeDisabled();

    await wait(() => {
      expect(setSignupResp).toBe(true);
    })
  });