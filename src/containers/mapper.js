/**
 * Created by zhangqiong on 17/1/25.
 */
import { prop, filter, propEq } from 'lodash/fp';
import { createSelector } from 'reselect';

// 这里的 state 是 Connect 的组件的

export default createSelector(
  prop('todoResult.todos'),
  prop('todoResult.selectedType'),

  (todos, selectedType) => ({
      todos,
      typeTodos: filter(propEq('type',selectedType))(todos),
      selectedType,
  })
)