import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import { Link } from 'react-router-dom'
import { UserSettingContext } from '../UserSettingProvider'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  title: {
    flex: 1,
    textAlign: 'center',
    [theme.breakpoints.down('xs')]: {
      textAlign: 'left'
    }
  }
}))

export default function Header() {
    let classes = useStyles();
    let {loggedIn, userSetting} = React.useContext(UserSettingContext);
    return (
        <AppBar elevation={1} position="relative" color="transparent">
          <Toolbar>
            <Typography className={classes.title} variant="h5">The Rick and Morty </Typography>
            {loggedIn && <Box textAlign="right" position="absolute" right={16} display="flex" flexDirection="column" justifyContent="center">
                <Typography variant="body2"> Nitesh Bhardwaj</Typography>
                <Link to="/logout"> Logout </Link>
            </Box>}
          </Toolbar>
        </AppBar>
    )
}