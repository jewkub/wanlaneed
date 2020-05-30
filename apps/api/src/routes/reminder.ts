import * as Router from '@koa/router';
import Reminder from '../models/Reminder';

const router = new Router({
  prefix: '/reminder'
});

router.all('*', async (ctx, next) => {
  ctx.state.route = 'reminder';
  ctx.state.reminder = {
    title: ctx.request.body.title,
    body: ctx.request.body.body,
    cron: ctx.request.body.cron,
  };
  await next();
  ctx.body = ctx.body || 'done';
});

router.post('/create', async (ctx, next) => {
  // console.log(ctx.request.body);
  let reminder = new Reminder(ctx.state.reminder);
  ctx.state.result = await reminder.save();
});

router.get('/list', async (ctx, next) => {
  let list = await Reminder.find();
  // console.log(list);
  let out = [];
  list.forEach((e, i, arr) => {
    out.push({
      id: e._id,
      title: e.title,
      body: e.body,
      cron: e.cron,
    });
  });
  // console.log(out);
  ctx.body = out;
});

router.post('/update', async (ctx, next) => {
  ctx.state.result = await Reminder.updateOne({
    _id: ctx.query.id,
  }, ctx.state.reminder);
});

router.post('/delete', async (ctx, next) => {
  ctx.state.result = await Reminder.deleteOne({
    _id: ctx.query.id
  });
});

router.all('*', async (ctx, next) => {
  // ctx.status = 404;
  ctx.throw(404, 'Command not found');
});

export default router;
