import { SummaryStore } from "./summary_store";

export default {
  async fetch(request: Request, env: any) {
    const url = new URL(request.url);
    const DO_URL = "https://summary-store";

    // Route for summary via AI
    if (url.pathname === "/summarize" && request.method === "POST") {
        try {
            const body = (await request.json()) as { text: string };
            const text = body.text;

            // Call the model via env.AI.run
            const aiResponse = await env.AI.run("@cf/meta/llama-3.1-8b-instruct", {
                prompt: text,
            })

            // aiResponse contains the model’s output among other things
            const summary = aiResponse.output_text || ""

            // Store summary in Durable Object
                const id = env.SUMMARY_STORE.idFromName("default");
                const obj = env.SUMMARY_STORE.get(id);
                await obj.fetch("https://example.com/set", {
                    method: "POST",
                    body: JSON.stringify({ summary }),
                    headers: { "Content-Type": "application/json" }
                });
           
                return new Response(
                    JSON.stringify({ summary }),
                    { headers: { "Content-Type": "application/json" } }
                );

        } catch (err) {
            console.error(err);
            return new Response("Internal Server Error", { status: 500 });
        }
    }

    if (url.pathname === "/get" && request.method === "GET") {
        try {
            const id = env.SUMMARY_STORE.idFromName("default");
            const obj = env.SUMMARY_STORE.get(id);

            const res = await obj.fetch("https://example.com/get");
            return res;
        } catch (err) {
            console.error(err);
            return new Response("Internal Server Error", { status: 500 });
        }
    }
    
    return new Response("Not Found", { status: 404 });
},

};

export { SummaryStore };

