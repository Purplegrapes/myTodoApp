/**
 * Created by zhangqiong on 16/12/21.
 */
import React from 'react';
import ReactDom from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import { Provider } from 'react-redux';
import App from './containers/App';
import todoResult from './reducers/reducer';
import { getTodos } from './actions/action';
import { getLocalStorage, setLocalStroage } from './middlewares/LocalStorage';

const Logger = createLogger();
const store = createStore(
    todoResult,
    applyMiddleware(Logger, getLocalStorage, setLocalStroage),
);
store.dispatch(getTodos());
ReactDom.render(
    <Provider store={store}>
        <App/>
    </Provider>, document.getElementsByClassName('learn-bar')[0]);