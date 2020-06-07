import React from 'react'
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { withApollo, graphql } from '@apollo/react-hoc';
import gql from 'graphql-tag';
import {withRouter} from 'react-router-dom'

const GET_SERVER_MESSAGE = gql `
  {
    messageInfo @client {
      open,
      variant,
      key,
      message
    }
  }
`;

function Toaster(props) {
  let {messageInfo, writeData} = props;
  return (        
        <Snackbar
        key={messageInfo.key}
        variant={messageInfo.variant}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={messageInfo.open}
        autoHideDuration={6000}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        onClose={_ => writeData({open: false})}
        message={<span id="message-id">{messageInfo.message}</span>}
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            onClick={_ => writeData({open: false})}
          >
            <CloseIcon />
          </IconButton>,
        ]}
      />                
    )
}

export default withApollo(graphql(GET_SERVER_MESSAGE, {
  props: ({ data: { messageInfo }, ownProps: { client }}) => ({
    messageInfo,
    writeData: (data) => client.writeData({data: {messageInfo: {...messageInfo, ...data}}}),
  }),
})(withRouter(Toaster)));
