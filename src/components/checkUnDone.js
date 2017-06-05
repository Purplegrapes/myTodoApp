/**
 * Created by zhangqiong on 16/12/22.
 */
import React, { PropTypes } from 'react';
import {
  pure,
  setDisplayName,
  setPropTypes,
  compose,
} from 'recompose';
import { Button, Modal } from 'antd';
import { some, prop, map } from 'lodash/fp';
import '../containers/app.css';

export default compose(
  pure,
  setDisplayName('TodoFooter'),
  setPropTypes({
    hideModal: PropTypes.func,
    unCompletedTodos: PropTypes.array.isRequired,
  }),
)(({ hideModal, show, unCompletedTodos, completeTodo}) => (
  <Modal
    title={"未完成任务"}
    visible={show}
    onCancel={hideModal}
    footer={unCompletedTodos.length === 0 ? null :
      <Button
        style={{color: "rgba(150, 23, 23, 0.79)"}}
      >完成所有任务</Button>}
  >
    {unCompletedTodos.length === 0 ?
      <span style={{ textAlign: 'center'}}>暂无数据</span> : map(({ text, id, completed }) => <div className="view" key={id}>
        <input className="toggle" type="checkBox" checked={completed} onChange={() => completeTodo(id)} />
        <label
          style={{ textDecoration: completed ? 'line-through' : 'none' }}
        >
          {text}
        </label>
      </div>)(unCompletedTodos)}
  </Modal>
));
