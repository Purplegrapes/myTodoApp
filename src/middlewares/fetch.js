/**
 * Created by zhangqiong on 16/12/30.
 */
import 'whatwg-fetch';
import { FETCH_TODOS } from '../actions/action';

export const fetchRender = () => next => (action) => {
  const url = 'http://192.168.1.108:8889/todos';
  if (action.payload.isAPI) {
    return fetch(url)
      .then(res => res.json())
      .then((data) => {
        const todo = { data, type: FETCH_TODOS };
        next(todo);
      });
  }
  return next(action);
}
export const logger = () => next => (action) => {
  const result = next(action);
  return result;
}
