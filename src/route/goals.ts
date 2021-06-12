import { renderFileToString } from "https://deno.land/x/dejs@0.9.3/mod.ts";
import { Router } from "https://deno.land/x/oak@v7.5.0/mod.ts";
import { Goal } from "../model/goal.ts";

const router = new Router();

const courseGoals: Goal[] = [];

router.get("/", async (ctx, next) => {
  const body = await renderFileToString(
    Deno.cwd() + "/src/view/course_goals.ejs",
    {
      title: "All Goals",
      goals: courseGoals,
    }
  );
  ctx.response.body = body;
  await next();
});

router.post("/add-goal", async (ctx, next) => {
  const body = ctx.request.body();
  const params = (await body.value) as URLSearchParams;
  const goalName = params?.get("new-goal") || "";
  if (goalName.trim().length === 0) {
    return ctx.response.redirect("/");
  }
  const newGoal: Goal = { id: new Date().toUTCString(), name: goalName };
  courseGoals.push(newGoal);
  ctx.response.redirect("/");
  await next();
});

export const goalsRouter = router;
