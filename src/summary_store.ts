/// <reference types="@cloudflare/workers-types" />

export class SummaryStore {
  // The Durable Object's state (persistent across requests)
  private state: DurableObjectState;

  constructor(state: DurableObjectState) {
    this.state = state;
  }

  // Handle requests sent to this Durable Object
  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/set" && request.method === "POST") {
      const body = await request.json() as { summary: string };
      await this.state.storage.put("summary", body.summary);
      return new Response("OK");
    }

    if (url.pathname === "/get" && request.method === "GET") {
      const summary = await this.state.storage.get<string>("summary");
      return new Response(JSON.stringify({ summary }));
    }

    return new Response("Not Found", { status: 404 });
  }
}
