import { SummaryStore } from "./summary_store";

type RadarTrafficResponse = {
  success: boolean;
  errors: any[];
  result: {
    main: {
      timestamps: string[];
      values: string[];
    };
    meta: {
      dateRange: { startTime: string; endTime: string }[];
      normalization: string;
      aggInterval: string;
    };
  };
};

export default {
  async fetch(request: Request, env: any) {
    const url = new URL(request.url);

    if (url.pathname === "/summarize-country" && request.method === "POST") {
        try {
            
            const body = (await request.json()) as { country: string };
            const country = body.country.toUpperCase(); // e.g., "US", "CN"
            console.log("Country:", country);

            // Fetch Radar traffic data for the country
            const radarRes = await fetch(
            `https://api.cloudflare.com/client/v4/radar/netflows/timeseries?name=main&location=${country}&dateRange=7d`,
            {
                headers: {
                "Authorization": `Bearer ${env.CF_API_TOKEN}`,
                },
            }
            );

            const radarData: RadarTrafficResponse = await radarRes.json() as RadarTrafficResponse;

            const timestamps = radarData.result.main.timestamps;
            const values = radarData.result.main.values;

            // Prepare a prompt for the AI summarizer
            const aiPrompt = `Summarize the Internet traffic trends for ${country} over the past 7 days using the following data: 
            Timestamps: ${timestamps.join(", ")}
            Traffic values: ${values.join(", ")}`;

            // Call Workers AI to summarize
            const aiResponse = await env.AI.run("@cf/meta/llama-3.1-8b-instruct", {
                prompt: aiPrompt,
            });
            console.log("AI Response:", aiResponse);

            // aiResponse contains the model’s output among other things
            const summary = aiResponse.response || aiResponse.output_text || "";
            console.log("Summary to store:", summary);

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


    // Route for summary via AI
    if (url.pathname === "/summarize" && request.method === "POST") {
        try {
            const body = (await request.json()) as { text: string };
            console.log("POST body:", body);
            const text = body.text;

            // Call the model via env.AI.run
            const aiResponse = await env.AI.run("@cf/meta/llama-3.1-8b-instruct", {
                prompt: text,
            })
            console.log("AI Response:", aiResponse);

            // aiResponse contains the model’s output among other things
            const summary = aiResponse.response || aiResponse.output_text || "";
            console.log("Summary to store:", summary);

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

