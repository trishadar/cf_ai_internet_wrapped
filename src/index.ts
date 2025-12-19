import { SummaryStore } from "./summary_store";

export default {
  async fetch(request: Request, env: any) {
    // Get the Durable Object namespace from environment
    const id = env.SUMMARY_STORE.idFromName("default");
    const obj = env.SUMMARY_STORE.get(id);

    // Forward the request to the Durable Object
    const response = await obj.fetch(request);
    return response;
  },
};

export { SummaryStore };

