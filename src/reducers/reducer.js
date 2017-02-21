/**
 * Created by zhangqiong on 16/12/27.
 */
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

const todoResult = handleActions({
    [SELECT_TYPE]: (todoResult, { payload } ) => {
        return({
        ...todoResult,
        selectedType: payload,
        typeTodos: filter(todo => todo.type === payload)(todoResult.todos)
    })},
    [ADD_TODO]: (todoResult, { payload }) => ({
        ...todoResult,
        todos: concat(todoResult.todos.length === 0
        ? {
          id: 0,
          text: payload.text,
          completed: false,
          edited: false,
          type: payload.type,
        } : {
          id: Math.max(...(map(item => item.id)(todoResult.todos))) + 1,
          text: payload.text,
          completed: false,
          edited: false,
          type: payload.type,
        })(todoResult.todos),
        typeTodos: concat(todoResult.todos.length === 0
            ? {
                id: 0,
                text: payload.text,
                completed: false,
                edited: false,
                type: payload.type,
            } : {
                id: Math.max(...(map(item => item.id)(todoResult.todos))) + 1,
                text: payload.text,
                completed: false,
                edited: false,
                type: payload.type,
            })(todoResult.typeTodos),
    }),
    [GET_TODOS]: (todoResult, { data }) => {
      return ({
      ...todoResult,
      todos: concat(data)(todoResult.todos),
      typeTodos: filter(todo => todo.type === todoResult.selectedType)(concat(data)(todoResult.todos))
    })},
    [COMPLETE_TODO]: (todoResult, { payload }) => ({
        ...todoResult,
        todos: map((t) => {
          if (t.id !== payload) {
            return t;
          }
          return {
            ...t,
            completed: !t.completed,
          };
          })(todoResult.todos),
        typeTodos: map((t) => {
            if (t.id !== payload) {
                return t;
            }
            return {
                ...t,
                completed: !t.completed,
            };
        })(todoResult.typeTodos)

    }),
    [DEL_TODO]: (todoResult, { payload }) => ({
        ...todoResult,
        todos: filter(todo => todo.id !== payload)(todoResult.todos),
        typeTodos: filter(todo => todo.id !== payload)(todoResult.typeTodos),
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
  [EDIT_TODO]: (todoResult, { payload }) => ({
      ...todoResult,
      todos: map(t => {
          if (t.id !== payload.id) {
              return t;
          }
          return {
              ...t,
              text: payload.text,
              edited: false,
          };
      })(todoResult.todos),
      typeTodos: map((t) => {
          if (t.id !== payload.id) {
              return t;
          }
          return {
              ...t,
              text: payload.text,
              edited: false,
          };
      })(todoResult.typeTodos)
  }),
  [EDIT_STATUS]: (todoResult, { payload }) => ({
      ...todoResult,
      todos: map((t) => {
          if (t.id === payload) {
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
          if (t.id === payload) {
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
    typeTodos: [],
  });



export default todoResult;
