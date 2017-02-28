/**
 * Created by zhangqiong on 17/1/25.
 */
import { prop } from 'lodash/fp';
import { createSelector } from 'reselect';
export default createSelector(
  prop('todos'),
  prop('selectedType'),
  prop('typeTodos'),

  (todos, selectedType, typeTodos) => ({
      todos,
      selectedType,
      typeTodos,
    })
)