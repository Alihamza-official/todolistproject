
import React from 'react';
import Button from '@material-ui/core/Button';
import { SnackbarProvider, useSnackbar } from 'notistack';

function MyApp({message}) {
  const { enqueueSnackbar } = useSnackbar();

  const handleClick = ( variant) => {
    enqueueSnackbar(variant, { variant: 'error'} );
  };

  const handleClickVariant = (message, variant) => () => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar('This is a success message!', { variant });
  };

  return (
    <React.Fragment>

      {handleClick(message, 'success')}
      {/* <Button onClick={handleClick}>Show snackbar</Button>
      <Button onClick={handleClickVariant('success')}>Show success snackbar</Button> */}
    </React.Fragment>
  );
}

export default MyApp;
