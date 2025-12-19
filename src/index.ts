import { SummaryStore } from "./summary_store";

export default {
  async fetch(request: Request, env: any) {
    const url = new URL(request.url);

    // Route for summary via AI
    if (url.pathname === "/summarize" && request.method === "POST") {
      const { text } = await request.json()

      // Call the model via env.AI.run
      const aiResponse = await env.AI.run("@cf/meta/llama-3.1-8b-instruct", {
        prompt: text,
      })

      // aiResponse contains the model’s output among other things
      const summary = aiResponse.output_text || ""

      // Store summary in Durable Object
        const id = env.SUMMARY_STORE.idFromName("default");
        const obj = env.SUMMARY_STORE.get(id);
        await obj.fetch(new Request("/set", {
        method: "POST",
        body: JSON.stringify({ summary }),
        headers: { "Content-Type": "application/json" }
      }));

      return new Response(JSON.stringify({ summary }), {
        headers: { "Content-Type": "application/json" },
      });
    }

    // Otherwise, forward requests to Durable Object
    const id = env.SUMMARY_STORE.idFromName("default")
    const obj = env.SUMMARY_STORE.get(id)
    return obj.fetch(request)
  },
};

export { SummaryStore };

