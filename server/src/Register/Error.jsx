import * as React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';

export default function Error(props) {
  return (
    
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        {props.err}
      </Alert>

  );
}