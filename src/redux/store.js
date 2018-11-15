import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import todoReducer from './Reducer';

const middleware = applyMiddleware(thunk, logger);
const store = createStore(todoReducer, middleware);

export default store;
