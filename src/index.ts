export default {
  async fetch(request: Request) {
    return new Response("Hello, Cloudflare Worker!", { status: 200 });
  },
};
