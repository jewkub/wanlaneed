import * as Router from '@koa/router';
import * as Reminder from '../models/Reminder';

const router = new Router({
  prefix: '/reminder'
});

router.get('/', async (ctx, next): Promise<void> => {
  ctx.body = 'ok';
});

export default router;