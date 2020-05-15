/* eslint-disable default-case */
import produce from 'immer';



export const initialState = {
  open: false,
  message: '',
};


const defaultReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case 'Add_qualquercoisa':
        draft.open = true;
        break;

    }
  });

export default defaultReducer;

