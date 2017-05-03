/**
 * Created by zhangqiong on 17/1/3.
 */
import { prop } from 'lodash/fp';
import {
  CLEAR_COMPLETE,
  GET_TODOS,
  DEL_TODO,
} from '../actions/action';

export const setLocalStroage = ({ getState }) => next => action => {
  switch (prop('type')(action)) {
    case DEL_TODO: {
      localStorage.removeItem(prop('payload')(action));
      break;
    }
    case CLEAR_COMPLETE: {
      const nowdata = getState().todoResult.todos;
      console.log(nowdata);
      for (const todo of nowdata) {
        if (prop('completed')(todo)) {
          localStorage.removeItem(prop('id')(todo));
        }
      }
    }
    break;
    default: {
      const result = next(action);
      const nowdata = getState().todoResult.todos;
      for (const todo of nowdata) {
        const localdata = JSON.stringify(todo);
        localStorage.setItem(todo.id, localdata);
      }
      return result;
    }
  }
  return next(action);
};

export const getLocalStorage = () => next => (action) => {
  if (action.payload.isLocal) {
    for (let i = 0; i < localStorage.length; i++) {
      const data = JSON.parse(localStorage.getItem(localStorage.key(i)));
      const todo = { data, type: GET_TODOS };
      next(todo);
    }
  } else {
    return next(action);
  }
  return null;
};
