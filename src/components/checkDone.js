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
  setPropTypes({
    hideDone: PropTypes.func,
    completedTodos: PropTypes.array,
  }),
)(({ hideDone, done, completedTodos, clearAllCompletedHandler, completeTodo}) => (
  <Modal
    title={"已完成任务"}
    visible={done}
    onCancel={hideDone}
    footer={completedTodos.length === 0 ? null :
      <Button
        style={{color: "rgba(150, 23, 23, 0.79)"}}
        onClick={() => clearAllCompletedHandler(map(prop('id'))(completedTodos))}>清除已完成</Button>}
  >
    {completedTodos.length === 0 ?
      <span style={{ textAlign: 'center'}}>暂无数据</span> : map(({ text, id, completed }) => <div className="view" key={id}>
        <input className="toggle" type="checkBox" checked={completed} onChange={() => completeTodo(id)} />
        <label
          style={{ textDecoration: completed ? 'line-through' : 'none' }}
        >
          {text}
        </label>
      </div>)(completedTodos)}
  </Modal>
));
