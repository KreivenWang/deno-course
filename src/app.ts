import { Application, send, Status } from "https://deno.land/x/oak@v7.5.0/mod.ts";
import { renderFileToString } from "https://deno.land/x/dejs@0.9.3/mod.ts";
import { goalsRouter } from "./route/goals.ts";

const app = new Application();

// handle any exception
app.use(async (ctx, next) => {
  try {
    console.log(`--> ${ctx.request.method} ${ctx.request.url.href}`);
    await next();
    console.log(`<-- ${ctx.request.method} ${ctx.request.url.href} ${ctx.response.status}`);
    if (ctx.response.status === Status.NotFound) {
      const body = await renderFileToString(Deno.cwd() + "/src/view/404.ejs", {});
      ctx.response.body = body;
    }
  } catch (err) {
    console.log(err);
    ctx.response.body = `Something went wrong, sorry! Please try again later`;
  }
});

// handle resource responses
app.use(async (ctx, next) => {
  if (ctx.request.url.pathname.startsWith("/static")) {
    console.log("respond css resources", ctx.request.url.pathname);
    await send(ctx, ctx.request.url.pathname, {
      gzip: true,
      root: "src",
    });
  }
  await next();
});

app.use(goalsRouter.routes());
app.use(goalsRouter.allowedMethods());

console.log("Starting app at http://localhost:8000");
await app.listen({ port: 8000 });
