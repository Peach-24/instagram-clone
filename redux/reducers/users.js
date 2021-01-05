// Dedicated to other users

import {
  USERS_DATA_STATE_CHANGE,
  USERS_POSTS_STATE_CHANGE,
} from '../constants';

const initialState = {
  users: [],
  usersLoaded: [],
};

// actions will call upon db, fetch data, send to reducer, which will then update the state
// we use a switch()case to help distinguish between multiple actions
export const users = (state = initialState, action) => {
  switch (action.type) {
    case USERS_DATA_STATE_CHANGE:
      return {
        ...state,
        users: [...state.users, action.user],
      };
    case USERS_POSTS_STATE_CHANGE:
      return {
        ...state,
        posts: action.posts,
      };
    default:
      return state;
  }
};
