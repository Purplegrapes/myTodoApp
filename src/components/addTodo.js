/**
 * Created by zhangqiong on 16/12/27.
 */
import React, { Component, PropTypes } from 'react';
import { Icon } from 'antd';
import '../containers/app.css';

export default class AddTodo extends Component {
  static propTypes = {
    selectedType:PropTypes.string.isRequired,
    onAddClick: PropTypes.func,
  };
  state = {
    text: '',
    show: false,
  };
  handleKeyDown = (e) => {
    const { text } = this.state;
    const { onAddClick, selectedType } = this.props;
    if (e.keyCode === 13 && e.target.value !== '') {
      onAddClick(text,selectedType);
      this.setState({
        text: '',
      });
    }
  };
  addTodo = () => {
    const { text } = this.state;
    const { onAddClick,selectedType } = this.props;
    if (text !== '') {
      onAddClick(text,selectedType);
      this.setState({
        text: '',
      });
    }
  };
  handleChange = ({ target: { value } }) => {
    this.setState({ text: value });
  };

  showInput = () => {
      this.setState({
          text: '',
          show: true,
      });
  };

  hideInput = () => {
      this.setState({
          show: false,
      });
  };

  render() {
    return (
      <div className="header">
          {this.state.show ?
              <div>
                <input
                    className="new-todo" type="text"
                    placeholder="例如：周三15点开会 "
                    value={this.state.text}
                    onChange={this.handleChange}
                    onKeyDown={this.handleKeyDown}
                />
                <button className='button' onClick={this.addTodo}>添加任务</button>
                <a className='cancel' onClick={this.hideInput}>取消</a>
              </div> :
              null
          }
        <div onClick={this.showInput} className='addBox'>
          <Icon type="plus" />
          <a className='add'>添加任务</a>
        </div>

      </div>
    );
  }
}
