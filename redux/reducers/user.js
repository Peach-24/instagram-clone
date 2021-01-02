const initialState = {
  currentUser: null,
};
// actions will call upon db, fetch data, send to reducer, which will then update the state
export const user = (state = initialState, action) => {
  return {
    ...state,
    currentUser: action.currentUser,
  };
};
