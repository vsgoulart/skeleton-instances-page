const {v4} = require('uuid');

function finishOperation(operation) {
  return {
    ...operation,
    endDate: new Date().toISOString().replace('Z', '+0000'),
    sortValues: [Date.now(), new Date(operation.startDate).getTime()],
    operationsFinishedCount: operation.operationsTotalCount,
  };
}

function operationFactory(type, instancesCount) {
  return {
    id: v4(),
    name: null,
    type,
    startDate: new Date().toISOString().replace('Z', '+0000'),
    endDate: null,
    instancesCount,
    operationsTotalCount: instancesCount,
    operationsFinishedCount: 0,
    sortValues: [9223372036854775807, Date.now()],
  };
}

module.exports = {finishOperation, operationFactory};
