import { serve } from "https://deno.land/std@0.98.0/http/server.ts";
import { bgBlue, red, bold } from "https://deno.land/std@0.98.0/fmt/colors.ts";
const server = serve({ port: 8000 });
console.log("http://localhost:8000/");
for await (const req of server) {
  console.log(bgBlue("responding"));
  req.respond({ body: "Hello World\n things changed" });
  console.log(red(bold("responded")));
}
