/**
 * Created by zhangqiong on 16/12/21.
 */
import React, { Component, PropTypes } from 'react';
import TodoItem from './TodoItem';
import { prop, every, map } from 'lodash/fp';
class MainSection extends Component {
  static propTypes = {
    onTodoClick: PropTypes.func,
    editTodo: PropTypes.func,
    editStatus: PropTypes.func,
    toggleTodo: PropTypes.func,
    todos: PropTypes.array.isRequired,
    delTodo: PropTypes.func,
  };

  render() {
    const { todos, onTodoClick, delTodo, editTodo, toggleTodo, editStatus } = this.props;
    return (
      <section className="main">
        <input
          className="toggle-all" type="checkBox"
          checked={prop('length')(todos) === 0 ? false : every(todo => prop('completed')(todo))(todos)}
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
              />,
            )(todos)
          }
        </ul>
      </section>
    );
  }
}
export default MainSection;
