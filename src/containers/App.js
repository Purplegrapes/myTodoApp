/**
 * Created by zhangqiong on 16/12/27.
 */
import React, {  PropTypes } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { compose, pure, setPropTypes, setDisplayName, withHandlers } from 'recompose';
import { prop, filter, propEq } from 'lodash/fp';
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
} from '../actions/action';
import './app.css';
export default compose(
  pure,
  connect(createSelector(
    prop('todoResult.todos'),
    prop('todoResult.selectedType'),

    (todos, selectedType) => ({
      todos,
      typeTodos: filter(propEq('type',selectedType))(todos),
      selectedType,
    })), {
    addTodo: addTodoAction,
    editTodo: editTodoAction,
    editStatus: editStatusAction,
    completeTodo: completeTodoAction,
    delTodo: delTodoAction,
    clearComplete: clearCompleteAction,
    toggleAll: toggleAllAction,
    selectType: selectTypeAction,
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
  withHandlers({
    showType: ({ selectedType }) => () => {
      switch (selectedType){
        case 'home':
          return <h1>家庭</h1>;
        case 'work':
          return <h1>工作</h1>;
        case 'shopping':
          return <h1>购物</h1>;
        case 'study':
          return <h1>学习</h1>;
        default:
          return <h1>个人</h1>;

      }
    },
  }),
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
}) => (
  <div>
    <div className='Header'>
      备忘录
    </div>
    <div className='appBox'>
      <About selectType={selectType}
             typeTodos={typeTodos}
             todos={todos}
      >
        <span name="个人" id="person"></span>
        <span name="工作" id="work"></span>
        <span name="学习" id="study"></span>
        <span name="购物" id="shopping"></span>
        <span name="家庭" id="home"></span>
      </About>
      <div className='todoapp'>
        {showType()}
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
