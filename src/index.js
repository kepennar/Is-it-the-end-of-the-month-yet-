const Koa = require('koa');
const KoaRouter = require('koa-router');
const serve = require('koa-static');
const views = require('koa-views');

const conf = require('./config');
const calculator = require('./core-calculator');

const app = new Koa();
const router = KoaRouter();

app.use(views(conf.views.path, conf.views.opts))
.use(serve(conf.statics.path, conf.statics.opts))
.use(async (ctx, next) => { // Error handler
  try {
    await next();
  } catch (err) {
    console.error('error:', err);
    ctx.body = {message: err.message};
    ctx.status = err.status || 500;
  }
})
.use(router.routes())
.use(router.allowedMethods());

router.get('/', async ctx => {
  await ctx.render('index', calculator.itIsTheEndOfTheMonth());
});

router.get('/it-is-end-of-the-month', async ctx => {
  ctx.body = calculator.itIsTheEndOfTheMonth();
});

const port = process.env.PORT || 3000;
app.listen(port);

console.log('Listening on port:', port);
