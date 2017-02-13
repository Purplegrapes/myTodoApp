/**
 * Created by zhangqiong on 17/1/25.
 */
import { prop } from 'lodash/fp';

// 这里的 state 是 Connect 的组件的
export default state => ({
    todos: prop('todos')(state.todoResult),
    selectedType: prop('selectedType')(state.todoResult),
    typeTodos: prop('typeTodos')(state.todoResult)
});