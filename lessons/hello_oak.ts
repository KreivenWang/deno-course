import { Application, Router } from "https://deno.land/x/oak@v7.5.0/mod.ts";

const app = new Application();

// Logger
app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.headers.get("X-Response-Time");
  console.log(`${ctx.request.method} ${ctx.request.url} - ${rt}`);
});

// Timing
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.response.headers.set("X-Response-Time", `${ms}ms`);
});

// Mock fetching data
app.use(async (ctx, next) => {
  console.log("mock fetching large data");
  await new Promise<void>((resolve) => setTimeout(() => resolve(), 500));
  await next();
  console.log("mock fetching large data done");
});

// Hello World!
app.use((ctx) => {
  ctx.response.body = "Hello Oak!";
});

await app.listen({ port: 8000 });
