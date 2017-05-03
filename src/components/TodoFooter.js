/**
 * Created by zhangqiong on 16/12/22.
 */
import React, { Component, PropTypes } from 'react';
import { some, prop } from 'lodash/fp';
import '../containers/app.css';


class TodoFooter extends Component {
  static propTypes = {
    clearComplete: PropTypes.func,
    typeTodos: PropTypes.array.isRequired,
  };

  render() {
    const { typeTodos, clearComplete } = this.props;
    const style = (some(todo => todo.completed)(typeTodos) && prop('length')(typeTodos) !== 0) ? null : { display: 'none' };
    return (
      <footer className="footer">
        <button style={style} className='clear-completed button' onClick={clearComplete}>清除已完成</button>
      </footer>
    );
  }
}
export default TodoFooter;
