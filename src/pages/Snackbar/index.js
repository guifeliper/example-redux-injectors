import React from 'react';
import { useInjectReducer, useInjectSaga } from "redux-injectors";
import SnackReducer from './snackbarReducer';
import SnackSaga from './snackbarSaga';

function SnackBar() {
  useInjectReducer({ key: "snackbar", reducer: SnackReducer });
  useInjectSaga({ key: "snackbar", saga: SnackSaga });

  return <div>Snack component!</div>;
}

export default SnackBar;
