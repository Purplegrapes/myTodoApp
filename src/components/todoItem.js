/**
 * Created by zhangqiong on 16/12/21.
 */
import React, { Component, PropTypes } from 'react';

class TodoItem extends Component {
  static propTypes = {
    onTodoClick: PropTypes.func,
    editTodo: PropTypes.func,
    editStatus: PropTypes.func,
    delTodo: PropTypes.func,
    text: PropTypes.string,
    completed: PropTypes.bool,
    id: PropTypes.string,
    edited: PropTypes.bool,
  };
  state = {
    text: this.props.text,
  };

  componentDidUpdate() {
      if (this.props.edited) {
          this.textInput.focus();
      }
  }

  handleKeyDown = () => {
    const { text } = this.state;
    const { id, editTodo } = this.props;
      editTodo(text, id);
  };

  handleChange = (e) => {
    this.setState({
      text: e.target.value,
    });
  };

  render() {
    const { text, completed, edited, editStatus, onTodoClick, id, delTodo } = this.props;
    const inputStyle = edited === true ? 'editing' : null;
    return (
      <li
        className={inputStyle}
      >
        <div className="view">
          <input className="toggle" type="checkBox" checked={completed} onChange={() => onTodoClick(id)} />
          <label onClick={() => editStatus(id)} style={{ textDecoration: completed ? 'line-through' : 'none' }}>{text}</label>
          <button className="destroy" onClick={() => delTodo(id)} />
        </div>
        <input className="edit" value={this.state.text} onChange={this.handleChange} onBlur={this.handleKeyDown} ref={input => this.textInput = input}/>
          {edited ?
              <div className='editBox'>
                  <button className='button' onClick={this.handleKeyDown}>保存</button>
              </div> :
              null
          }
      </li>

    );
  }
}
export default TodoItem;
