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
        usersLoaded: (state.usersLoaded += 1),
        // if a user is found within these constraints, then we are going to update the users array
        // first return of the ternary will make it so that attaches the posts array from our query, to the user object that matches the condition
        // if no user is found, we'll just return the user without any changes.
        users: state.users.map((user) =>
          user.uid === action.uid ? { ...user, posts: action.posts } : user
        ),
      };
    default:
      return state;
  }
};
