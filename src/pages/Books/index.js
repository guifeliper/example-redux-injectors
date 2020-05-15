import React from 'react';
import { useInjectReducer, useInjectSaga } from "redux-injectors";
import booksReducer from './booksReducer';
import booksSaga from './booksSaga';

function Books() {
  useInjectReducer({ key: "books", reducer: booksReducer });
  useInjectSaga({ key: "books", saga: booksSaga });

  return <div>Books component!</div>;
}

export default Books;
