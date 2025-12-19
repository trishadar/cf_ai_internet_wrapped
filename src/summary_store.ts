export class SummaryStore {
  // The Durable Object's state (persistent across requests)
  state: DurableObjectState;

  constructor(state: DurableObjectState) {
    this.state = state;
  }

  // Handle requests sent to this Durable Object
  async fetch(request: Request) {
    const url = new URL(request.url);

    if (url.pathname === "/get") {
      // Placeholder: return current state as JSON
      const data = await this.state.storage.get("summary") || {};
      return new Response(JSON.stringify(data), { status: 200 });
    }

    if (url.pathname === "/set" && request.method === "POST") {
      const body = await request.json();
      await this.state.storage.put("summary", body);
      return new Response("Stored summary!", { status: 200 });
    }

    return new Response("Not Found", { status: 404 });
  }
}
