const Koa = require('koa');
const logger = require('koa-logger');
const bodyparser = require('koa-bodyparser');
const {router} = require('./router');

const app = new Koa();

app
  .use(logger())
  .use(bodyparser())
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(8080);
