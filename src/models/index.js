import { combineReducers } from 'redux';
import bookshelf from './bookshelf';

function createReducer(initilaState, reducerMap) {
  return function reducer(state = initilaState, action) {
    const handler = reducerMap[action.type];
    return handler ? handler(state, action) : state;
  };
}

function convertModels(models) {
  return models.reduce((reducerMap, model) => {
    const { namespace, state, reducers } = model;
    reducerMap[namespace] = createReducer(state, reducers);
    return reducerMap;
  }, {});
}

export default combineReducers(convertModels([bookshelf]));
