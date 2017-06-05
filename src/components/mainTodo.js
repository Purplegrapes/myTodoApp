/**
 * Created by zhangqiong on 16/12/22.
 */
import React, { PropTypes } from 'react';
import {
  pure,
  setDisplayName,
  setPropTypes,
  compose,
} from 'recompose';
import { some, prop, map } from 'lodash/fp';
import AddTodo from './addTodo';
import About from './type';
import MainSection from './mainSection';
import TodoFooter from './todoFooter';

export default compose(
  pure,
  setPropTypes({
    hideDone: PropTypes.func,
    completedTodos: PropTypes.array,
  }),
)(({
  selectType,
  typeTodos,
  todos,
  types,
  addType,
  editTodo,
  completeTodo,
  delTodo,
  toggleAll,
  clearComplete,
  selectedType,
  addTodo,
  color,
  name,
}) => (
  <div className='appBox'>
    <About
      selectType={selectType}
      typeTodos={typeTodos}
      todos={todos}
      types={types}
      addType={addType}
    >
    </About>
    <div className='todoapp'>
      <h1 style={{ color }}>{name}</h1>
      <MainSection
        typeTodos={typeTodos}
        editTodo={editTodo}
        onTodoClick={completeTodo}
        delTodo={delTodo}
        toggleTodo={toggleAll}
        clearComplete={clearComplete}
        selectedType={selectedType}
        types={types}
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
));
