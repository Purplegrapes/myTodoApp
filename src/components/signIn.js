/**
 * Created by zhangqiong on 16/12/22.
 */
import React, { PropTypes, Component } from 'react';

import { Button, Form, Icon, Input, Modal } from 'antd';
import { Link } from 'react-router';
import { some, prop, map } from 'lodash/fp';
import '../containers/app.css';

const FormItem = Form.Item;
class SignIn extends Component {
  handleSubmit = (e) => {
    const { hideSubmit, setValue } = this.props;
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        setValue(values.userName)
      }
    });
    hideSubmit();
  };
  render() {
    const { submit, hideSubmit } = this.props;
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Modal
          title={"登录"}
          visible={submit}
          onCancel={hideSubmit}
          footer={null}
        >
          <Form onSubmit={this.handleSubmit} className="login-form">
            <FormItem>
              {getFieldDecorator('userName', {
                rules: [{ required: true, message: 'Please input your username!' }],
              })(
                <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Username" />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please input your Password!' }],
              })(
                <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" />
              )}
            </FormItem>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Log in
            </Button>
          </Form>
        </Modal>
      </div>
    );
  }
}
const  WrappedHorizontalLoginForm = Form.create()(SignIn);
export default WrappedHorizontalLoginForm;
