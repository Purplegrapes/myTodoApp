/**
 * Created by zhangqiong on 16/12/27.
 */
import { createAction } from 'redux-actions';

export const ADD_TODO = 'ADD_TODO';
export const COMPLETE_TODO = 'COMPLETE_TODO';
export const DEL_TODO = 'DEL_TODO';
export const CLEAR_COMPLETE = 'CLEAR_COMPLETE';
export const EDIT_TODO = 'EDIT_TODO';
export const EDIT_STATUS = 'EDIT_STATUS';
export const TOGGLE_ALL = 'TOGGLE_ALL';
export const FETCH_TODOS = 'FETCH_TODOS';
export const GET_TODOS = 'GET_TODOS';
export const SELECT_TYPE = 'SELECT_TYPE';
export const ADD_TYPE = 'ADD_TYPE';
export const CLEAR_ALL_COMPLETED = 'CLEAR_ALL_COMPLETED';

export const addTodo = createAction(ADD_TODO, (text,type, time) => ({text,type, time}));
export const editStatus = createAction(EDIT_STATUS);
export const editTodo = createAction(EDIT_TODO, (text, id, time, type) => ({ text, id, time, type }));
export const completeTodo = createAction(COMPLETE_TODO);
export const delTodo = createAction(DEL_TODO);
export const clearComplete = createAction(CLEAR_COMPLETE);
export const clearAllCompleted = createAction(CLEAR_ALL_COMPLETED);
export const toggleAll = createAction(TOGGLE_ALL);
export const selectType = createAction(SELECT_TYPE);
export const addType = createAction(ADD_TYPE, (name, color) => ({ name, color}));
export const getTodos = createAction(GET_TODOS, () => ({ isLocal: true }));

