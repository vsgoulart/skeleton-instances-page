import {combineReducers} from 'redux';
import operationsReducer from './operationsReducer';
import instancesReducer from './instancesReducer';
import statisticsReducer from './statisticsReducer';
import workflowReducer from './workflowReducer';

export default combineReducers({
  operations: operationsReducer,
  instances: instancesReducer,
  statistics: statisticsReducer,
  workflows: workflowReducer,
});
