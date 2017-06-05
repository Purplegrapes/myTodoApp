/**
 * Created by zhangqiong on 16/12/27.
 */
import React, { Component, PropTypes } from 'react';
import { Icon, Modal, DatePicker } from 'antd';

export default class AddTodo extends Component {
  static propTypes = {
    selectedType:PropTypes.string.isRequired,
    onAddClick: PropTypes.func,
  };
  state = {
    text: '',
    show: false,
    time: null,
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
    const { text, time } = this.state;
    const { onAddClick,selectedType } = this.props;
    if (text !== '') {
      debugger;
      onAddClick(text,selectedType,time);
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

  setDate = (date, dateString) => {
    this.setState({
      time: dateString,
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
          <textarea
            style={{ height: "30px", width: "80%"}}
            type="text"
            value={this.state.text}
            placeholder="例如，周日野营需要准备的东西"
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown}
          />
          <div style={{ marginTop: "10px"}}>
            <DatePicker
              placeholder="请选择截止日期"
              onChange={this.setDate}
            />
          </div>
        </Modal>
      </div>
    );
  }
}
