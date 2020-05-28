import * as Koa from 'koa';
import * as Router from '@koa/router';
import { strict as assert } from 'assert';
import * as logger from 'koa-logger';

const app = module.exports = new Koa();
const router = new Router();
const
  port: number = +process.env.PORT || 3000,
  ip: string = process.env.IP || '0.0.0.0';

app.proxy = true;

// log all events to the terminal
if (process.env.NODE_ENV !== 'production') app.use(logger());

// error handling
app.use(async (ctx, next) => {
  try {
    await next();
    assert.equal('object', typeof ctx, 'some dev did something wrong'); // should not be happened
  } catch (err) {
    ctx.status = +err.status || 500;
    ctx.body = { error: err.message };
    ctx.app.emit('error', err, ctx);
  }
});

router.get('/', (ctx, next) => {
  ctx.body = 'hello';
});

app.use(router.routes())
app.use(router.allowedMethods());

import routineRouter from './routes/routine';
app.use(routineRouter.routes());
app.use(routineRouter.allowedMethods());

if (!module.parent) app.listen(port, ip, () => console.log('Server running on http://%s:%s', ip, port));