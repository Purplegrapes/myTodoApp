/**
 * Created by zhangqiong on 16/12/27.
 */
import React, { Component, PropTypes } from 'react';
import { Icon, Modal, DatePicker, Upload, message } from 'antd';
const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
};

const beforeUpload = (file) => {

  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isLt2M;
};

export default class AddTodo extends Component {
  static propTypes = {
    selectedType:PropTypes.string.isRequired,
    onAddClick: PropTypes.func,
  };
  state = {
    text: '',
    show: false,
    time: null,
    imageUrl: '',
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
  handleChangeImage = (info) => {
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl => this.setState({ imageUrl }));
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
    const imageUrl = this.state.imageUrl;
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
          <Upload
            className="avatar-uploader"
            name="avatar"
            showUploadList={false}
            action="http://localhost:3000/"
            beforeUpload={beforeUpload}
            onChange={this.handleChangeImage}
          >
            {
              imageUrl ?
                <img src={imageUrl} alt="" className="avatar" /> :
                <Icon type="plus" className="avatar-uploader-trigger" />
            }
          </Upload>
        </Modal>
      </div>
    );
  }
}
