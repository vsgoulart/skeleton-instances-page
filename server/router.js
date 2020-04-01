const Router = require('@koa/router');
const {ENDPOINTS} = require('./endpoints');
const {WORKFLOWS, STATISTICS, INSTANCES, OPERATIONS} = require('./mocks');
const {finishOperation, operationFactory} = require('./operations-utils');

const router = new Router();

let finishedOperations = OPERATIONS;
let runningOperations = [];

router.get(ENDPOINTS.workflows, ctx => {
  ctx.body = WORKFLOWS;
});

router.get(ENDPOINTS.statistics, ctx => {
  ctx.body = STATISTICS;
});

router.post(ENDPOINTS.instances, ctx => {
  ctx.body = INSTANCES;
});

router.post(ENDPOINTS.operations, ctx => {
  runningOperations = runningOperations.reduce((accumulator, operation) => {
    if (Math.floor(Math.random() * Math.floor(2))) {
      const finishedOperation = finishOperation(operation);

      finishedOperations = [finishedOperation, ...finishedOperations];
      runningOperations = runningOperations.filter(operation => operation.id !== finishedOperation.id);

      return accumulator;
    }

    return [...accumulator, operation];
  }, []);

  ctx.body = [...runningOperations, ...finishedOperations];
});

router.post(ENDPOINTS.createOperation, ctx => {
  const {operationType} = ctx.request.body;
  const newOperation = operationFactory(operationType, 1);

  runningOperations = [newOperation, ...runningOperations];

  ctx.body = newOperation;
});

router.post(ENDPOINTS.createBatchOperation, ctx => {
  const {operationType, query} = ctx.request.body;
  const newOperation = operationFactory(
    operationType,
    query.ids.length === 0 ? INSTANCES.workflowInstances.length : query.ids.length,
  );

  runningOperations = [newOperation, ...runningOperations];

  ctx.body = newOperation;
});

module.exports = {router};
