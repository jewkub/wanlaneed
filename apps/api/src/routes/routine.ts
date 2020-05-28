import * as Router from '@koa/router';

const router = new Router({
  prefix: '/routine'
});

router.get('/', async (ctx, next): Promise<void> => {
  ctx.body = 'ok';
});

export default router;