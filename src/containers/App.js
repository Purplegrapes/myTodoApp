/**
 * Created by zhangqiong on 16/12/27.
 */
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { pure, compose, setDisplayName, setPropTypes, withProps } from 'recompose';
import mapper from './mapper';
import AddTodo from '../components/AddTodo';
import About from '../components/todoType';
import MainSection from '../components/MainSection';
import { some, prop } from 'lodash/fp';
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
const showType = (selectedType) => {
  switch (selectedType) {
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
};
export default compose(
  pure,
  connect(mapper, {
      addTodo: addTodoAction,
      editTodo: editTodoAction,
      editStatus: editStatusAction,
      completeTodo: completeTodoAction,
      delTodo: delTodoAction,
      clearComplete: clearCompleteAction,
      toggleAll: toggleAllAction,
      selectType: selectTypeAction,
    }
  ),
  setDisplayName('App'),
  setPropTypes({
    typeTodos: PropTypes.array.isRequired,
    todos: PropTypes.array.isRequired,
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
  withProps(({ typeTodos }) => ({
    style: (some(todo => todo.completed)(typeTodos) && prop('length')(typeTodos) !== 0) ? null : { display: 'none' },
}))
)(({
  typeTodos,
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
  style,
}) => (
  <div>
    <div className='searchBox'>
      TodoList
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
        {showType(selectedType)}
        <MainSection
          todos={typeTodos}
          editTodo={editTodo}
          editStatus={editStatus}
          onTodoClick={completeTodo}
          delTodo={delTodo}
          toggleTodo={toggleAll}
          selectedType={selectedType}
        />
        <footer className="footer">
          <button style={style} className='clear-completed button' onClick={clearComplete}>清除已完成</button>
        </footer>
        <AddTodo
          onAddClick={addTodo}
          selectedType={selectedType}
        />
      </div>
    </div>
    <div className="footBox"></div>
  </div>
));


