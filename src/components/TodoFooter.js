/**
 * Created by zhangqiong on 16/12/22.
 */
import React, { Component, PropTypes } from 'react';
import { some, prop } from 'lodash/fp';
import '../containers/app.css';


class TodoFooter extends Component {
  static propTypes = {
    clearComplete: PropTypes.func,
    todos: PropTypes.array.isRequired,
  };

  render() {
    const { todos, clearComplete } = this.props;
    const style = (some(todo => todo.completed)(todos) && prop('length')(todos) !== 0) ? null : { display: 'none' };
    return (
      <footer className="footer">
        <button style={style} className='clear-completed button' onClick={clearComplete}>清除已完成</button>
      </footer>
    );
  }
}
export default TodoFooter;
