/* eslint-disable default-case */
import produce from 'immer';

export const initialState = {
  open: false,
};


const defaultReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case 'SET_OPEN_TRUE':
        draft.open = true;
        break;
    }
  });

export default defaultReducer;

