// lesson 32
// # deno run --allow-net --allow-write fetch_web_contents.ts
const buffer = new Uint8Array(1024);

console.log('Please enter a URL');
await Deno.stdin.read(buffer);

const decoder = new TextDecoder();
const url = decoder.decode(buffer);

const response = await fetch(url);
const content = await response.text();

const encoder = new TextEncoder();
const data = encoder.encode(content);

Deno.writeFile('website-content.html', data);
