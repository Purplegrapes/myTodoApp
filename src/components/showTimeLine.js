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
import { Modal, Timeline } from 'antd';
import { map } from 'lodash/fp';
import '../containers/app.css';

const Item = Timeline.Item;
export default compose(
  pure,
  setDisplayName('TodoFooter'),
  setPropTypes({
    hideLine: PropTypes.func,
    timeTodos: PropTypes.array.isRequired,
  }),
)(({ hideLine, line, timeTodos}) => (
  <Modal
    title="按截止时间查看"
    visible={line}
    onCancel={hideLine}
    footer={null}
  >
    <Timeline>
      {map(({ text, id, completed, time }) => <div className="view" key={id}>

        <Item
          style={{ textDecoration: completed ? 'line-through' : 'none' }}
        >
          {text} <span style={{ color: '#7d0f0f'}}>截止时间：{time}</span>
        </Item>
      </div>)(timeTodos)}
    </Timeline>
  </Modal>
));
