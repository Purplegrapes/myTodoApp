/**
 * Created by zhangqiong on 16/12/27.
 */
import React, {  PropTypes } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { Icon, Popover, Timeline } from 'antd';
import {
  compose,
  pure,
  setPropTypes,
  setDisplayName,
  withProps,
  withState,
  withHandlers,
} from 'recompose';
import { prop, filter, propEq, flow, find, map, reject, sortBy } from 'lodash/fp';
import AddTodo from '../components/addTodo';
import About from '../components/type';
import MainSection from '../components/mainSection';
import TodoFooter from '../components/todoFooter';
import CheckDone from '../components/checkDone';
import CheckUnDone from '../components/checkUnDone';
import ShowTimeLine from '../components/showTimeLine';
import '../main.css';
import {
  addTodo as addTodoAction,
  editTodo as editTodoAction,
  editStatus as editStatusAction,
  completeTodo as completeTodoAction,
  delTodo as delTodoAction,
  clearComplete as clearCompleteAction,
  toggleAll as toggleAllAction,
  selectType as selectTypeAction,
  addType as addTypeAction,
  clearAllCompleted as clearAllCompletedAction,
} from '../actions/action';
import './app.css';

const Item = Timeline.Item;

export default compose(
  pure,
  connect(createSelector(
    prop('todoResult.todos'),
    prop('todoResult.selectedType'),
    prop('todoResult.types'),

    (todos, selectedType, types) => ({
      todos,
      typeTodos: filter(propEq('type',selectedType))(todos),
      selectedType,
      types,
    })), {
    addTodo: addTodoAction,
    editTodo: editTodoAction,
    editStatus: editStatusAction,
    completeTodo: completeTodoAction,
    delTodo: delTodoAction,
    clearComplete: clearCompleteAction,
    toggleAll: toggleAllAction,
    selectType: selectTypeAction,
    addType: addTypeAction,
    clearAllCompleted: clearAllCompletedAction,
  }),
  setPropTypes({
    todos: PropTypes.array.isRequired,
    typeTodos: PropTypes.array.isRequired,
    selectedType: PropTypes.string,

    addTodo: PropTypes.func.isRequired,
    editTodo: PropTypes.func.isRequired,
    editStatus: PropTypes.func.isRequired,
    completeTodo: PropTypes.func.isRequired,
    delTodo: PropTypes.func.isRequired,
    clearComplete: PropTypes.func.isRequired,
    toggleAll: PropTypes.func.isRequired,
    selectType: PropTypes.func,
  }),
  setDisplayName('App'),
  withState('show', 'setShow', false),
  withState('list', 'setList', []),
  withState('line', 'setLine', false),
  withState('done', 'setDone', false),
  withHandlers({
    showModal: ({ setShow, setList }) => (todo) => {
      setList(todo);
      setShow(true);

    },
    hideModal: ({ setShow }) => () => {
      setShow(false);
    },
    showDone: ({ setDone })  => {
      setDone(true);
    },
    hideDone: ({ setDone }) => () => {
      setDone(false);
    },
    showLine: ({ setLine }) => () => {
      setLine(true);

    },
    hideLine: ({ setLine }) => () => {
      setLine(false);
    },
    clearAllCompletedHandler: ({ clearAllCompleted, setShow }) => (ids) => {
      clearAllCompleted(ids);
      setShow(false);
    }
  }),
  withProps(({ todos, types, selectedType}) => ({
    completedTodos: filter(todo => todo.completed)(todos),
    unCompletedTodos: reject(todo => todo.completed)(todos),
    timeTodos: sortBy('time')(todos),
    color: flow(
      find(propEq('id', selectedType )),
      prop('color'),
    )(types),
  })),
  withProps(({ selectedType, types, showLine, showModal, showDone, completedTodos, unCompletedTodos }) => ({
    name: flow(
      find(propEq('id', selectedType)),
      prop('name'),
    )(types),
    content: (
      <div>
        <div className="setting2" onClick={() => showDone()}>
          <Icon type="check" className="Icon"/>
          <div className="text">已完成任务</div>
        </div>
        <div className="setting2" onClick={() => showModal()}>
          <Icon type="exclamation" className="Icon"/>
          <div className="text">未完成任务</div>
        </div>
        <div className="setting2" onClick={showLine}>
          <Icon type="edit" className="Icon" />
          <div className="text">按截止时间查看</div>
        </div>
      </div>
    ),
  })),

)(({
  todos,
  selectedType,
  addTodo,
  editStatus,
  editTodo,
  completeTodo,
  delTodo,
  clearComplete,
  toggleAll,
  selectType,
  typeTodos,
  showType,
  addType,
  types,
  name,
  showModal,
  hideModal,
  showLine,
  hideLine,
  list,
  show,
  content,
  line,
  timeTodos,
  clearAllCompletedHandler,
  hideDone,
  done,
  unCompletedTodos,
  completedTodos,
  color,
}) => (
  <div>
    <div className='Header'>
      备忘录
      <Popover placement="bottomRight" content={content} >
        <Icon type="ellipsis" style={{ float: "right", margin: "10px 15px 0 0"}}/>
      </Popover>
    </div>
    <CheckDone
      done={done}
      completedTodos={completedTodos}
      clearAllCompletedHandler={clearAllCompletedHandler}
      hideDone={hideDone}
      completeTodo={completeTodo}
    />
    <CheckUnDone
      show={show}
      unCompletedTodos={unCompletedTodos}
      hideModal={hideModal}
      completeTodo={completeTodo}
    />
    <ShowTimeLine
      line={line}
      timeTodos={timeTodos}
      hideLine={hideLine}
    />

    <div className='appBox'>
      <About
        selectType={selectType}
        typeTodos={typeTodos}
        todos={todos}
        types={types}
        addType={addType}
      >
      </About>
      <div className='todoapp'>
        <h1 style={{ color }}>{name}</h1>
        <MainSection
          typeTodos={typeTodos}
          editTodo={editTodo}
          editStatus={editStatus}
          onTodoClick={completeTodo}
          delTodo={delTodo}
          toggleTodo={toggleAll}
          clearComplete={clearComplete}
          selectedType={selectedType}
          types={types}
        />
        <TodoFooter
          typeTodos={typeTodos}
          clearComplete={clearComplete}
        />
        <AddTodo
          onAddClick={addTodo}
          selectedType={selectedType}
        />
      </div>
    </div>
  </div>
));
