import React from 'react'
import { render, fireEvent, wait,waitForDomChange, screen } from '@testing-library/react'
import { MockedProvider } from '@apollo/react-testing';
import Login from "./Login";
import { LOGIN_QUERY } from '../../apolloClient/query/loginSignupQuery';
import { createMemoryHistory } from 'history'
import {Router} from 'react-router-dom'
import { HelmetProvider } from "react-helmet-async";

it('login: it should render and match all the cases (email, password and login submit)', async () => {
    const loginResp = {"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWQxNDhjNzJhOWUyMzcwZTgxOGIxMTEiLCJpYXQiOjE1OTEyNTM3MjN9.8ZGxLIxjd_Axj5XrRsAEcIhrjxgPyQ13QFSJck4VXyQ"};
    const history = createMemoryHistory();
    let gotLoginResp = false;

    const mockProps = {
      setLoggedIn: () => true,
      history: {
        replace: () => true
      }
    }

    const mocks = [
      {
        request: {
          query: LOGIN_QUERY,
          variables: { email: "abc@gmail.com", "password": "abcfdfddf" },
        },
        result: () => {
           gotLoginResp = true
           return {"data":{"login": loginResp}}
        }
      },
    ];
  
    let {container} = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <HelmetProvider>
            <Router history={history}>
                <Login  {...mockProps}/>
            </Router>  
        </HelmetProvider>  
      </MockedProvider>,
    );
  
    
    const emailInput = screen.getByPlaceholderText('Enter your email'); 
    const passwordInput = screen.getByPlaceholderText('Enter your password'); 
    const form = container.querySelector('form');
    
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
      expect(gotLoginResp).toBe(true);
    })
  });