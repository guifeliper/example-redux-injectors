/* eslint-disable default-case */
import produce from 'immer';



export const initialState = {
  open: false,
  message: '',
};


const snackbarReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case 'SHOW':
        draft.open = true;
        draft.message = action.payload.message;
        break;
      case 'HIDE_SNACKBAR':
        draft.open = false;
        draft.message = '';
        break;
    }
  });

export default snackbarReducer;

