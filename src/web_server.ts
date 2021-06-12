import {
  Application,
  Router,
  send,
} from "https://deno.land/x/oak@v7.5.0/mod.ts";
import { renderFileToString } from "https://deno.land/x/dejs@0.9.3/mod.ts";

interface Goal {
  id: string;
  name: string;
}

const app = new Application();
const router = new Router();

const courseGoals: Goal[] = [];

router.get("/", async (ctx, next) => {
  const body = await renderFileToString(Deno.cwd() + "/src/course_goals.ejs", {
    title: "All Goals",
    goals: courseGoals,
  });
  ctx.response.body = body;
  await next();
});

router.post("/add-goal", async (ctx, next) => {
  const body = ctx.request.body();
  const params = (await body.value) as URLSearchParams;
  const goalName = params?.get("new-goal") || "";
  const newGoal: Goal = { id: new Date().toUTCString(), name: goalName };
  courseGoals.push(newGoal);
  ctx.response.redirect("/");
  await next();
});

app.use(async (ctx, next) => {
  if (ctx.request.url.pathname.endsWith(".css")) {
    console.log("serve css", ctx.request.url.pathname);
    await send(ctx, ctx.request.url.pathname, { gzip: true, root: "src" });
  }
  await next();
});

app.use(router.routes());
app.use(router.allowedMethods());

console.log("App started at http://localhost:8000");
await app.listen({ port: 8000 });
