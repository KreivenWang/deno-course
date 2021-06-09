// lesson 38 39
// $ deno run --allow-net first_web_server.ts
// Download https://deno.land/std@0.97.0/http/server.ts
// Download https://deno.land/std@0.97.0/io/bufio.ts
// Download https://deno.land/std@0.97.0/_util/assert.ts
// Download https://deno.land/std@0.97.0/http/_io.ts
// Download https://deno.land/std@0.97.0/async/mod.ts
// Download https://deno.land/std@0.97.0/io/util.ts
// Download https://deno.land/std@0.97.0/bytes/mod.ts
// Download https://deno.land/std@0.97.0/bytes/bytes_list.ts
// Download https://deno.land/std@0.97.0/async/delay.ts
// Download https://deno.land/std@0.97.0/async/deferred.ts
// Download https://deno.land/std@0.97.0/async/mux_async_iterator.ts
// Download https://deno.land/std@0.97.0/async/pool.ts
// Download https://deno.land/std@0.97.0/http/http_status.ts
// Download https://deno.land/std@0.97.0/textproto/mod.ts
// Download https://deno.land/std@0.97.0/testing/asserts.ts
// Download https://deno.land/std@0.97.0/io/buffer.ts
// Download https://deno.land/std@0.97.0/testing/_diff.ts
// Download https://deno.land/std@0.97.0/fmt/colors.ts
// Download https://deno.land/std@0.97.0/io/types.d.ts
// Check file:///E:/_Dev/GithubRepo/deno-course/first_web_server.ts
// http://localhost:8000/
import { serve } from "https://deno.land/std@0.97.0/http/server.ts";
const server = serve({ port: 8000 });
console.log("http://localhost:8000/");
for await (const req of server) {
  req.respond({ body: "Hello World\n" });
}
