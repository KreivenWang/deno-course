// import { bgBlue, red, bold } from "https://deno.land/std@0.98.0/fmt/colors.ts";
import { Application, Router } from "https://deno.land/x/oak@v7.5.0/mod.ts";
import { renderFileToString } from "https://deno.land/x/dejs@0.9.3/mod.ts";

const app = new Application();
const router = new Router();

router.get("/", async (ctx, next) => {
  const body = await renderFileToString(Deno.cwd() + "/src/course_goals.ejs", {
    title: "My Goals",
  });
  ctx.response.body = body;
  await next();
});

router.post("/add-goal", async (ctx, next) => {
  const body = ctx.request.body();
  const newGoal = ((await body.value) as URLSearchParams)?.get("new-goal");
  console.log(newGoal);
  ctx.response.redirect("/");
  await next();
});

app.use(async (ctx, next) => {
  console.log("start to use router");
  await next();
});

app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 8000 });
