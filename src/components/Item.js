/**
 * Created by zhangqiong on 16/12/21.
 */
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router'
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
      <div>
        <h5>
          233
        </h5>
      </div>

    );
  }
}
export default TodoItem;
