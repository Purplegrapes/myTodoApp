/**
 * Created by zhangqiong on 16/12/27.
 */
import { createAction } from 'redux-actions';
export const ADD_TODO = 'ADD_TODO';
export const COMPLETE_TODO = 'COMPLETE_TODO';
export const DEL_TODO = 'DEL_TODO';
export const CLEAR_COMPLETE = 'CLEAR_COMPLETE';
export const EDIT_TODO = 'EDIT_TODO';
export const TOGGLE_ALL = 'TOGGLE_ALL';
export const FETCH_TODOS = 'FETCH_TODOS';
export const GET_TODOS = 'GET_TODOS';
export const EDIT_STATUS = 'EDIT_STATUS';
export const SELECT_TYPE = 'SELECT_TYPE';
export const SEARCH_TODO = 'SEARCH_TODO';

export const addTodo = createAction(ADD_TODO, (text, type) => ({ text, type }));
export const editStatus = createAction(EDIT_STATUS);
export const editTodo = createAction(EDIT_TODO, (text, id) => ({ text, id }));
export const completeTodo = createAction(COMPLETE_TODO);
export const delTodo = createAction(DEL_TODO);
export const clearComplete = createAction(CLEAR_COMPLETE);
export const toggleAll = createAction(TOGGLE_ALL);
export const selectType = createAction(SELECT_TYPE);
export const getTodos = createAction(GET_TODOS, () => ({ isLocal: true }));

