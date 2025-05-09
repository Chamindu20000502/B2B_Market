import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function TextInput(props) {
  return (
    <Box
      component="form"
      sx={{ '& > :not(style)': { m: 1, width: '13rem' } }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" label={props.title} variant="outlined" size='small' />
    </Box>
  );
}