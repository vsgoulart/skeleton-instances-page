import {combineReducers} from 'redux';
import operationsReducer from './operationsReducer';
import instancesReducer from './instancesReducer';
import statisticsReducer from './statisticsReducer';
import pollingReducer from './pollingReducer';

export default combineReducers({
  operations: operationsReducer,
  instances: instancesReducer,
  statistics: statisticsReducer,
  polling: pollingReducer,
});
