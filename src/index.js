const Koa = require('koa');
const KoaRouter = require('koa-router');
const serve = require('koa-static');
const views = require('koa-views');

const moment = require('moment');

const conf = require('./config');

const app = new Koa();
const router = KoaRouter();

console.log('views path', conf.views.path);
console.log('views opts', conf.views.opts);
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
  await ctx.render('index', itIsTheEndOfTheMonth());
});

router.get('/it-is-end-of-the-month', async ctx => {
  ctx.body = itIsTheEndOfTheMonth();
});

const port = process.env.PORT || 3000;
app.listen(port);

console.log('Listening on port:', port);

function itIsTheEndOfTheMonth() {
  const m = moment();

  const currentDay = m.date();
  const endOfMonth = m.endOf('month');
  const interval = endOfMonth.date() - currentDay;
  return {
    response: interval < 2,
    distance: interval < 15 ? `It is in ${interval} days` : `It was ${currentDay} days ago`
  };
}
