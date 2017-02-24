import {
  SET_SEARCH,
} from './actions';

// Action handlers
const ACTION_HANDLERS = {
  [SET_SEARCH]: (state, action) => ({
    search: action.str
  }),
};

// Setup initial state
const initialState = {
  search: '',
};

// Reducing function
export default (state = initialState, action) => {
  if (!action || !action.type) return state;

  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
};
