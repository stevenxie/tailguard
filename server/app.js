const Koa = require("koa");
// const Router = require("@koa/router");

async function createApp() {
  const app = new Koa();

  // Define error handler.
  app.use(async (ctx, next) => {
    try {
      await next();
    } catch ({ message, status }) {
      ctx.body = { error: message };
      ctx.status = status ?? 500;
    }
  });

  // Register GraphQL server.
  {
    const { createServer } = require("./api/graphql");
    const server = await createServer();
    app.use(
      server.getMiddleware({
        path: "/api/graphql",
      })
    );
  }

  // Define routes.
  // const root = new Router();
  // app.use(root.routes(), root.allowedMethods());
  return app;
}

module.exports = { createApp };
