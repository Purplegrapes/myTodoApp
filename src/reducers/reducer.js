/**
 * Created by zhangqiong on 16/12/27.
 */
import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import uuid from 'uuid';
import { map, filter, every, concat, remove, propEq, flow, } from 'lodash/fp';
import {
  ADD_TODO,
  EDIT_TODO,
  EDIT_STATUS,
  COMPLETE_TODO,
  DEL_TODO,
  CLEAR_COMPLETE,
  SELECT_TYPE,
  TOGGLE_ALL,
  GET_TODOS,
} from '../actions/action';

const todoReducer = handleActions({
    [SELECT_TYPE]: (todoResult, action ) => {
        return({
        ...todoResult,
        selectedType: action.payload,
    })},
    [ADD_TODO]: (todoResult, { payload: { text, type }}) => ({
        ...todoResult,
        todos: concat({
          id: uuid.v4(),
          text,
          completed: false,
          edited: false,
          type,
        })(todoResult.todos),
    }),
    [GET_TODOS]: (todoResult, action) => ({
      ...todoResult,
      todos: concat(action.data)(todoResult.todos),
    }),
    [COMPLETE_TODO]: (todoResult, { payload }) => ({
        ...todoResult,
        todos: map((todo) => {
          if (todo.id === payload) {
            return {
              ...todo,
              completed: !todo.completed,
            };
          }
          return todo;
        })(todoResult.todos),
    }),
    [DEL_TODO]: (todoResult, { payload }) => ({
        ...todoResult,
        todos: filter(todo => todo.id !== payload)(todoResult.todos),
    }),
    [CLEAR_COMPLETE]: (todoResult) =>({
        ...todoResult,
        todos: remove(todo => todo.completed === true && todo.type === todoResult.selectedType)(todoResult.todos),
    }),
    [TOGGLE_ALL]: (todoResult) => {
    const areAllMarked = flow(
      filter(propEq('type',todoResult.selectedType)),
      every(todo => todo.completed),
      )(todoResult.todos);
    return ({
        ...todoResult,
        todos: map(todo => {
            if (todo.type === todoResult.selectedType){
                return({
                    ...todo,
                    completed: !areAllMarked,
                })
            }
            else {
                return todo;
            }})(todoResult.todos),
    });
  },
  [EDIT_TODO]: (todoResult, { payload: { id, text } }) => ({
      ...todoResult,
      todos: map(todo => {
          if (todo.id !== id) {
              return todo;
          }
          return {
              ...todo,
              text,
              edited: false,
          };
      })(todoResult.todos),
  }),
  [EDIT_STATUS]: (todoResult, { payload }) => ({
      ...todoResult,
      todos: map((todo) => {
          if (todo.id === payload) {
              return {
                  ...todo,
                  edited: true,
              }
          }
          else {
              return todo;
          }
      })(todoResult.todos),
  }),
  },{
    selectedType:'person',
    todos:[],
  });

const todoResult = combineReducers({
    todoResult:todoReducer,
});

export default todoResult;
