import Koa from 'koa'
import superagent from 'superagent'

const app = new Koa();

app.use(async ctx => {
  ctx.body = 'Hello World';
});


app.listen(3000);