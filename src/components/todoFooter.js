/**
 * Created by zhangqiong on 16/12/22.
 */
import React, { PropTypes } from 'react';
import {
  pure,
  setDisplayName,
  setPropTypes,
  compose,
  withProps,
} from 'recompose';
import { Button } from 'antd';
import { some, prop } from 'lodash/fp';
import '../containers/app.css';

export default compose(
  pure,
  setDisplayName('TodoFooter'),
  setPropTypes({
    clearComplete: PropTypes.func,
    typeTodos: PropTypes.array.isRequired,
  }),
  withProps(({ typeTodos }) => ({
    style: (some(todo => todo.completed)(typeTodos) && prop('length')(typeTodos) !== 0) ? null : { display: 'none' },
  })),
)(({ style, clearComplete }) => (
  <footer className="footer">
    <Button type='primary' style={style} className='clear-completed' onClick={clearComplete}>清除已完成</Button>
  </footer>
));
