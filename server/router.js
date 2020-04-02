const Router = require('@koa/router');
const {ENDPOINTS} = require('./endpoints');
const {WORKFLOWS, STATISTICS, INSTANCES, OPERATIONS} = require('./mocks');
const {finishOperation, operationFactory} = require('./operations-utils');
const {startInstanceOperation, endInstanceOperation} = require('./instances-utils');

const router = new Router();

let finishedOperations = OPERATIONS;
let runningOperations = [];
let instances = INSTANCES;

function handleOperationFinish() {
  runningOperations = runningOperations.reduce((accumulator, operation) => {
    if (Math.floor(Math.random() * Math.floor(2))) {
      const finishedOperation = finishOperation(operation);

      finishedOperations = [finishedOperation, ...finishedOperations];
      runningOperations = runningOperations.filter(operation => operation.id !== finishedOperation.id);

      instances = {
        ...instances,
        workflowInstances: instances.workflowInstances.map(instance => {
          if (
            instance.operations.every(
              operationId => !runningOperations.map(operation => operation.id).includes(operation.id),
            )
          ) {
            return endInstanceOperation(instance);
          }

          return instance;
        }),
      };

      return accumulator;
    }

    return [...accumulator, operation];
  }, []);
}

router.get(ENDPOINTS.workflows, ctx => {
  ctx.body = WORKFLOWS;
});

router.get(ENDPOINTS.statistics, ctx => {
  ctx.body = STATISTICS;
});

router.post(ENDPOINTS.instances, ctx => {
  handleOperationFinish();

  ctx.body = instances;
});

router.post(ENDPOINTS.operations, ctx => {
  handleOperationFinish();

  ctx.body = [...runningOperations, ...finishedOperations];
});

router.post(ENDPOINTS.createOperation, ctx => {
  const {operationType} = ctx.request.body;
  const {instanceId} = ctx.params;
  const newOperation = operationFactory(operationType, 1);

  runningOperations = [newOperation, ...runningOperations];

  instances = {
    ...instances,
    workflowInstances: instances.workflowInstances.map(instance => {
      if (instanceId === instance.id) {
        return startInstanceOperation(instance, newOperation.id);
      }

      return instance;
    }),
  };

  ctx.body = newOperation;
});

router.post(ENDPOINTS.createBatchOperation, ctx => {
  const {operationType, query} = ctx.request.body;
  const newOperation = operationFactory(
    operationType,
    query.ids.length === 0 ? instances.workflowInstances.length : query.ids.length,
  );

  runningOperations = [newOperation, ...runningOperations];

  if (query.ids.length === 0) {
    instances = {
      ...instances,
      workflowInstances: instances.workflowInstances.map(instance => startInstanceOperation(instance, newOperation.id)),
    };
  } else {
    instances = {
      ...instances,
      workflowInstances: instances.workflowInstances.map(instance => {
        if (query.ids.includes(instance.id)) {
          return startInstanceOperation(instance, newOperation.id);
        }

        return instance;
      }),
    };
  }

  ctx.body = newOperation;
});

module.exports = {router};
