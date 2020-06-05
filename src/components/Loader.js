import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    center: {
        display: 'flex', 
        justifyContent:'center', 
        marginTop: '40px',
        width: '100%'
    },    
    fixedCenter: {
        position: 'fixed',
        top: 0,
        left:0,
        right:0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(180,180,180,.1)',
        zIndex: 2100,
    },    
    loaderStyle: {
        background: "rgba(250,250,250, 1)",
        borderRadius: "100%",
        boxShadow: "0 0 2px 0px #303030",
    } 
});

function Loader(props) {
    let {fixed, classes, ...others} = props;    
    return (
        <div className={fixed? classes.fixedCenter: classes.center}> 
            <CircularProgress className={fixed? classes.loaderStyle: null} color="secondary" {...others} /> 
        </div>
    )
}

export default withStyles(styles)(Loader)
