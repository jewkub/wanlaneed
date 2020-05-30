import * as path from 'path';
import * as dotenv from 'dotenv';
dotenv.config();
dotenv.config({ path: path.resolve(__dirname, '../../..', '.env')});

import * as Koa from 'koa';
import * as Router from '@koa/router';
import { strict as assert } from 'assert';
import * as logger from 'koa-logger';

import * as mongoose from 'mongoose';
// import * as secret from '../secret.json';
import * as bodyParser from 'koa-bodyparser';

import reminderRouter from './routes/reminder';

const app = new Koa();
const router = new Router();
const
  port: number = +process.env.PORT || 3000,
  ip: string = process.env.IP || '0.0.0.0';

(async () => {
  await mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  app.proxy = true;

  // log all events to the terminal
  if (process.env.NODE_ENV !== 'production') app.use(logger());

  // error handling
  app.use(async (ctx, next) => {
    try {
      await next();
      assert.equal('object', typeof ctx, 'some dev did something wrong'); // should not be happened
    } catch (err) {
      console.error(err.message);
      ctx.status = +err.status || 500;
      ctx.body = { status: ctx.status, message: err.message };
      ctx.app.emit('error', err, ctx);
    }
  });

  // body parser
  app.use(bodyParser());

  router.get('/', (ctx, next) => {
    ctx.body = 'hello';
  });

  app.use(router.routes())
  app.use(router.allowedMethods());

  app.use(reminderRouter.routes());
  app.use(reminderRouter.allowedMethods());

  if (!module.parent) app.listen(port, ip, () => console.log('Server running on http://%s:%s', ip, port));
})().catch(e => {
  console.error(e);
})

export default app;
