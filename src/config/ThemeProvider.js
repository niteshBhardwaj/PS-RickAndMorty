
import React from 'react'
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';

export const colors = {  
  typography: {
    useNextVariants: true,
  },
  overrides: {
    MuiButton: {
      root: {
        textTransform: 'inherit'
      },
    },
    MuiCssBaseline: {
      '@global': {
        body: {}
      },
    },
  },
} 

export const theme = createMuiTheme(colors);
// if(process.env.NODE_ENV !== "production") {
//   window.theme = theme;
// }
// export const muiHeader = getMuiTheme({
//   palette: {
//     primary1Color: '#fff'
//   }
// })

export default function({children, ...others}) {
  theme.props = {...others};
  return (<>
    <CssBaseline />
    <MuiThemeProvider theme = { theme }>
      {children}
    </MuiThemeProvider>
  </>)
}