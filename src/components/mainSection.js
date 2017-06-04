/**
 * Created by zhangqiong on 16/12/21.
 */
import React, { PropTypes } from 'react';
import { pure, compose, withProps, setPropTypes } from 'recompose';

import TodoItem from './todoItem';
import { prop, every, map, some } from 'lodash/fp';
import '../containers/app.css';

export default compose(
  pure,
  setPropTypes({
    onTodoClick: PropTypes.func,
    editTodo: PropTypes.func,
    editStatus: PropTypes.func,
    toggleTodo: PropTypes.func,
    delTodo: PropTypes.func,
    typeTodos: PropTypes.array,
  }),
  withProps(({ typeTodos }) => ({
    style: (some(todo => todo.completed)(typeTodos) && prop('length')(typeTodos) !== 0) ? null : { display: 'none' },
  })),
)(({
  onTodoClick,
  delTodo,
  editTodo,
  toggleTodo,
  editStatus,
  typeTodos,
  selectedType,
  types,
}) => {
  return (
    <section className="main">
      <input
        className="toggle-all" type="checkBox"
        checked={prop('length')(typeTodos) === 0 ? false : every(todo => prop('completed')(todo))(typeTodos)}
        onChange={toggleTodo}
      />
      <ul className="todo-list">
        {
          map(todo =>
            <TodoItem
              {...todo}
              key={todo.id}
              onTodoClick={onTodoClick}
              delTodo={delTodo}
              editTodo={editTodo}
              editStatus={editStatus}
              selectedType={selectedType}
              types={types}
            />,
          )(typeTodos)
        }
      </ul>
    </section>
  )
});
