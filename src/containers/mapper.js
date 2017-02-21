/**
 * Created by zhangqiong on 17/1/25.
 */
import { prop } from 'lodash/fp';

import { createSelector } from 'reselect';

// 这里的 state 是 Connect 的组件的
const todosSelector = createSelector(
    prop('todos'),

    todos => todos,
);
const selectedTypeSelector = createSelector(
    prop('selectedType'),

    selectedType => selectedType
);
const typeTodosSelector = createSelector(
    prop('typeTodos'),

    typeTodos => typeTodos
);
export default createSelector(
    todosSelector,
    selectedTypeSelector,
    typeTodosSelector,

    (todos, selectedType, typeTodos) => {
        return ({
        todos,
        selectedType,
        typeTodos,
    })}
)