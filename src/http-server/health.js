const Router = require('koa-router');

const router = Router();

router.get('/health', async ctx => {
  const {response} = ctx;
  response.status = 200;
  response.body = 'OK';
});

module.exports = router;