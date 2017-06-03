/**
 * Created by zhangqiong on 16/12/27.
 */
import React, { Component, PropTypes } from 'react';
import { Icon, Modal, DatePicker } from 'antd';
import '../containers/app.css';

const { MonthPicker, RangePicker } = DatePicker;

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
      this.setState({
        show: false,
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
        <div onClick={this.showInput} className='addBox'>
          <Icon type="plus" />
          <a className='add'>添加任务</a>
        </div>
        <Modal
          title="添加任务"
          visible={this.state.show}
          onOk={this.addTodo}
          onCancel={this.hideInput}
        >
          <input
            style={{ height: "30px", width: "80%"}}
            type="text"
            value={this.state.text}
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown}
          />
          <div>
            <DatePicker />
          </div>
        </Modal>
      </div>
    );
  }
}
