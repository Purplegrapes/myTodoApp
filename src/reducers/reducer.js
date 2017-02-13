/**
 * Created by zhangqiong on 16/12/27.
 */
import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { map, filter, every, concat, remove } from 'lodash/fp';
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
        typeTodos: filter(todo => todo.type === action.payload)(todoResult.todos)
    })},
    [ADD_TODO]: (todosApp, action) => ({
        ...todosApp,
        todos: concat(todosApp.todos.length === 0
        ? {
          id: 0,
          text: action.payload.text,
          completed: false,
          edited: false,
          type: action.payload.type,
        } : {
          id: Math.max(...(map(item => item.id)(todosApp.todos))) + 1,
          text: action.payload.text,
          completed: false,
          edited: false,
          type: action.payload.type,
        })(todosApp.todos),
        typeTodos: concat(todosApp.todos.length === 0
            ? {
                id: 0,
                text: action.payload.text,
                completed: false,
                edited: false,
                type: action.payload.type,
            } : {
                id: Math.max(...(map(item => item.id)(todosApp.todos))) + 1,
                text: action.payload.text,
                completed: false,
                edited: false,
                type: action.payload.type,
            })(todosApp.typeTodos),
    }),
    [GET_TODOS]: (todoResult, action) => {
      return ({
      ...todoResult,
      todos: concat(action.data)(todoResult.todos),
      typeTodos: filter(todo => todo.type === todoResult.selectedType)(concat(action.data)(todoResult.todos))
    })},
    [COMPLETE_TODO]: (todoResult, action) => ({
        ...todoResult,
        todos: map((t) => {
          if (t.id !== action.payload) {
            return t;
          }
          return {
            ...t,
            completed: !t.completed,
          };
          })(todoResult.todos),
        typeTodos: map((t) => {
            if (t.id !== action.payload) {
                return t;
            }
            return {
                ...t,
                completed: !t.completed,
            };
        })(todoResult.typeTodos)

    }),
    [DEL_TODO]: (todoResult, action) => ({
        ...todoResult,
        todos: filter(todo => todo.id !== action.payload)(todoResult.todos),
        typeTodos: filter(todo => todo.id !== action.payload)(todoResult.typeTodos),
    }),
    [CLEAR_COMPLETE]: (todoResult, action) =>({
        ...todoResult,
        todos: remove(todo => todo.completed === true && todo.type === todoResult.selectedType)(todoResult.todos),
        typeTodos: filter(todo => todo.completed === false)(todoResult.typeTodos)
    }),
    [TOGGLE_ALL]: (todoResult) => {
    const areAllMarked = every(todo => todo.completed)(todoResult.typeTodos);
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
        typeTodos: map(todo => ({
            ...todo,
            completed: !areAllMarked,
        }))(todoResult.typeTodos)
    });
  },
  [EDIT_TODO]: (todoResult, action) => ({
      ...todoResult,
      todos: map(t => {
          if (t.id !== action.payload.id) {
              return t;
          }
          return {
              ...t,
              text: action.payload.text,
              edited: false,
          };
      })(todoResult.todos),
      typeTodos: map((t) => {
          if (t.id !== action.payload.id) {
              return t;
          }
          return {
              ...t,
              text: action.payload.text,
              edited: false,
          };
      })(todoResult.typeTodos)
  }),
  [EDIT_STATUS]: (todoResult, action) => ({
      ...todoResult,
      todos: map((t) => {
          if (t.id === action.payload) {
              return {
                  ...t,
                  edited: true,
              }
          }
          else {
              return t;
          }
      })(todoResult.todos),
      typeTodos: map((t) => {
          if (t.id === action.payload) {
              return {
                  ...t,
                  edited: true,
              }
          }
          else {
              return t;

          }
      })(todoResult.typeTodos),
  }),
  },{
    selectedType:'person',
    todos:[],
    typeTodos:[],
  });

const todoResult = combineReducers({
    todoResult:todoReducer,
});

export default todoResult;
