/**
 * Created by zhangqiong on 16/12/27.
 */
import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import uuid from 'uuid';
import { map, filter, every, concat, remove, propEq, flow, includes} from 'lodash/fp';
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
  ADD_TYPE,
  CLEAR_ALL_COMPLETED,
} from '../actions/action';

const todoReducer = handleActions({
    [SELECT_TYPE]: (todoResult, action ) => ({
        ...todoResult,
        selectedType: action.payload,
    }),
    [ADD_TYPE]: (todoResult, { payload: { name, color}} ) => {
      return ({
        ...todoResult,
        types: concat({
          id: uuid.v4(),
          name,
          color,
        })(todoResult.types),
      })
    },
    [ADD_TODO]: (todoResult, { payload: { text, type, time }}) => ({
        ...todoResult,
        todos: concat({
          id: uuid.v4(),
          text,
          completed: false,
          edited: false,
          type,
          time,
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
    [CLEAR_ALL_COMPLETED]: (todoResult, { payload }) => {
      debugger;
      return ({
        ...todoResult,
        todos: remove(todo => includes(todo.id, payload))(todoResult.todos),
      })
    },
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
  [EDIT_TODO]: (todoResult, { payload: { id, text, time, type } }) => ({
      ...todoResult,
      todos: map(todo => {
          if (todo.id !== id) {
              return todo;
          }
          return {
              ...todo,
              text,
              time,
              type,
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
    types: [
      { name: '个人', id: 'person', color: '#04A3FF'},
      { name: '工作', id: 'work', color: '#FFA400'},
      { name: '学习', id: 'study', color: '#008B00'},
      { name: '购物', id: 'shopping', color: '#C1232B'},
      { name: '家庭', id: 'home', color: '#27727B'},
    ]
  });

const todoResult = combineReducers({
    todoResult:todoReducer,
});

export default todoResult;
