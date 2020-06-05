import React from 'react';
import RouteList from './routeConfig'
import ThemeProvider from './config/ThemeProvider'
import Toaster from './components/Toaster'
import NoSsr from '@material-ui/core/NoSsr';
import Header from './components/common/Header/Header';

const AppWrapper = () => (
    <ThemeProvider>
        <Header />
        <RouteList />
        <NoSsr>
            <Toaster />
        </NoSsr>
      </ThemeProvider>
)

export default AppWrapper;