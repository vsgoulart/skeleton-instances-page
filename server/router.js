const Router = require('@koa/router');
const {ENDPOINTS} = require('./endpoints');
const {WORKFLOWS, STATISTICS, INSTANCES, OPERATIONS} = require('./mocks');

const router = new Router();

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
  ctx.body = OPERATIONS;
});

router.post(ENDPOINTS.createOperation, ctx => {
  ctx.body = {};
});

router.post(ENDPOINTS.createBatchOperation, ctx => {
  ctx.body = {};
});

module.exports = {router};
