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
  withHandlers,
} from 'recompose';
import { some, prop, filter } from 'lodash/fp';
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
  withHandlers({
    showCompleted: ({ typeTodos }) => () => filter(todo => todo.completed)(typeTodos)
  }),
)(({ style, clearComplete, showCompleted }) => (
  <footer className="footer">
    <button onClick={showCompleted} className='clear-completed button'>已完成</button>
    <button onClick={showCompleted} className='button'>未完成</button>
    <button style={style} className='clear-completed button' onClick={clearComplete}>清除已完成</button>
  </footer>
));
