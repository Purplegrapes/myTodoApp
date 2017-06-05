/**
 * Created by zhangqiong on 16/12/21.
 */
import React, { Component, PropTypes } from 'react';
import { Icon, Modal, DatePicker, Tooltip, Select } from 'antd';
import { prop, find, propEq, flow, map } from 'lodash/fp';
const Option = Select.Option;


class TodoItem extends Component {
  static propTypes = {
    onTodoClick: PropTypes.func,
    editTodo: PropTypes.func,
    delTodo: PropTypes.func,
    text: PropTypes.string,
    completed: PropTypes.bool,
    id: PropTypes.string,
  };
  state = {
    text: this.props.text,
    visible: false,
    time: this.props.time,
    edit: false,
    type: this.props.selectedType,
  };



  handleKeyDown = () => {
    const { text, type, time} = this.state;
    const { id, editTodo } = this.props;
      editTodo(text, id, time, type);
    this.setState({
      edit: false,
    });
  };
  changeDate = () => {
    const { time, text } = this.state;
    const { id, editTodo } = this.props;
    editTodo(text,id, time);
    this.setState({
      visible: false,
    });
  };

  handleChange = (e) => {
    this.setState({
      text: e.target.value,
    });
  };
  showModal = () => {
    this.setState({
      visible: true,
    });
  };
  hideModal = () => {
    this.setState({
      visible: false,
    });
  };
  showEdit = () => {
    this.setState({
      edit: true,
    });
  };
  hideEdit = () => {
    this.setState({
      edit: false,
    });
  };
  setDate = (date, dateString) => {
    this.setState({
      time: dateString,
    });

  };
  getContent = (id) => {
    const { onTodoClick, delTodo} = this.props;
    return <div className="setting">
      <Icon type="check-circle-o" onClick={() => onTodoClick(id)}/>
      <Icon type="edit" onClick={this.showEdit}/>
      <Icon type="calendar" onClick={this.showModal}/>
      <Icon type="close-square-o" onClick={() => delTodo(id)}/>
    </div>
  };

  onSelect = (id) => {
    this.setState({
      type: id,
    });
  };

  render() {
    const {
      text,
      completed,
      onTodoClick,
      id,
      time,
      delTodo,
      selectedType,
      types,
    } = this.props;
    const defaultType = flow(
      find(propEq('id', selectedType)),
      prop('name'),
    )(types);
    return (
      <li
      >
          <div>
            <input className="toggle" type="checkBox" checked={completed} onChange={() => onTodoClick(id)} />

            <Tooltip
              title={this.getContent(id)}
              overlayClassName="view"
              placement="bottomLeft"
            >
              <label
              style={{ textDecoration: completed ? 'line-through' : 'none' }}
            >
              {text}
            </label>
            </Tooltip>

            <button className="destroy" onClick={() => delTodo(id)} />
          </div>

        <Modal
          title="更改截止日期"
          visible={this.state.visible}
          onOk={()=>this.changeDate(id)}
          onCancel={this.hideModal}
        >
          <div style={{ marginTop: "10px"}}>
            <DatePicker
              placeholder="请选择截止日期"
              onChange={this.setDate}
            />
          </div>
        </Modal>
        <Modal
          title="编辑任务"
          visible={this.state.edit}
          onOk={this.handleKeyDown}
          onCancel={this.hideEdit}
        >
          <div style={{ marginTop: "10px"}}>
            <input
              style={{ height: "30px", width: "100%", fontSize: "18px", paddingLeft:"10px"}}
              value={this.state.text} onChange={this.handleChange}/>
            <div className="Editing">
              <div>
                <Icon type="exception" className="Icon" />
                <span>分类</span>
              </div>
              <Select
                showSearch
                defaultValue={defaultType}
                style={{ width: 80, marginTop: 5 }}
                onSelect={this.onSelect}
              >
                {map(({ id, name }) =>
                  <Option key={id} value={id}>{name}</Option>
                )(types)}
              </Select>
            </div>
            <div style={{ marginTop: "10px", padding: "0 10px", fontSize: "15px"}} className="Flex">
              {time}
              <DatePicker
                placeholder="请修改日期"
                onChange={this.setDate}
              />
            </div>
          </div>
        </Modal>
      </li>

    );
  }
}
export default TodoItem;
