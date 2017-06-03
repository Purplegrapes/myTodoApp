/**
 * Created by zhangqiong on 16/12/27.
 */
import React, {  PropTypes } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { compose, pure, setPropTypes, setDisplayName, withProps } from 'recompose';
import { prop, filter, propEq, map, flow, find } from 'lodash/fp';
import AddTodo from '../components/addTodo';
import About from '../components/type';
import MainSection from '../components/mainSection';
import TodoFooter from '../components/todoFooter';
import '../main.css';
import {
  addTodo as addTodoAction,
  editTodo as editTodoAction,
  editStatus as editStatusAction,
  completeTodo as completeTodoAction,
  delTodo as delTodoAction,
  clearComplete as clearCompleteAction,
  toggleAll as toggleAllAction,
  selectType as selectTypeAction,
  addType as addTypeAction,
} from '../actions/action';
import './app.css';
export default compose(
  pure,
  connect(createSelector(
    prop('todoResult.todos'),
    prop('todoResult.selectedType'),
    prop('todoResult.types'),

    (todos, selectedType, types) => ({
      todos,
      typeTodos: filter(propEq('type',selectedType))(todos),
      selectedType,
      types,
    })), {
    addTodo: addTodoAction,
    editTodo: editTodoAction,
    editStatus: editStatusAction,
    completeTodo: completeTodoAction,
    delTodo: delTodoAction,
    clearComplete: clearCompleteAction,
    toggleAll: toggleAllAction,
    selectType: selectTypeAction,
    addType: addTypeAction,
  }),
  setPropTypes({
    todos: PropTypes.array.isRequired,
    typeTodos: PropTypes.array.isRequired,
    selectedType: PropTypes.string,

    addTodo: PropTypes.func.isRequired,
    editTodo: PropTypes.func.isRequired,
    editStatus: PropTypes.func.isRequired,
    completeTodo: PropTypes.func.isRequired,
    delTodo: PropTypes.func.isRequired,
    clearComplete: PropTypes.func.isRequired,
    toggleAll: PropTypes.func.isRequired,
    selectType: PropTypes.func,
  }),
  setDisplayName('App'),
  withProps(({ selectedType, types }) => ({
    name: flow(
      find(propEq('id', selectedType)),
      prop('name'),
    )(types)
  })),
)(({
  todos,
  selectedType,
  addTodo,
  editStatus,
  editTodo,
  completeTodo,
  delTodo,
  clearComplete,
  toggleAll,
  selectType,
  typeTodos,
  showType,
  addType,
  types,
  name,
}) => (
  <div>
    <div className='Header'>
      备忘录
    </div>
    <div className='appBox'>
      <About selectType={selectType}
             typeTodos={typeTodos}
             todos={todos}
             types={types}
             addType={addType}
      >
      </About>
      <div className='todoapp'>
        <h1>{name}</h1>
        <MainSection
          typeTodos={typeTodos}
          editTodo={editTodo}
          editStatus={editStatus}
          onTodoClick={completeTodo}
          delTodo={delTodo}
          toggleTodo={toggleAll}
          clearComplete={clearComplete}
        />
        <TodoFooter
          typeTodos={typeTodos}
          clearComplete={clearComplete}
        />
        <AddTodo
          onAddClick={addTodo}
          selectedType={selectedType}
        />
      </div>
    </div>
    <div className="footBox"></div>
  </div>
));
