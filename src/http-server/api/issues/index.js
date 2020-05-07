const Router = require('koa-router');
const synced = require('./synced');

const router = Router();
router.post('/synced', synced);

module.exports = router;
