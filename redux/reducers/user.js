import { USER_STATE_CHANGE, USER_POSTS_STATE_CHANGE } from '../constants';

const initialState = {
  currentUser: null,
  posts: [],
};

// actions will call upon db, fetch data, send to reducer, which will then update the state
// we use a switch()case to help distinguish between multiple actions
export const user = (state = initialState, action) => {
  switch (action.type) {
    case USER_STATE_CHANGE:
      return {
        ...state,
        currentUser: action.currentUser,
      };
    case USER_POSTS_STATE_CHANGE:
      return {
        ...state,
        posts: action.posts,
      };
    default:
      return state;
  }
};
