const Router = require('koa-router');
const issues = require('./issues');

const router = Router();

router.use('/api/issues', issues.routes(), issues.allowedMethods());

module.exports = router;
