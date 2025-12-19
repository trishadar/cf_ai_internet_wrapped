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

// A simple mapping of country names to ISO codes
const countryNameToCode: Record<string, string> = {
  "Afghanistan": "AF",
  "Albania": "AL",
  "Algeria": "DZ",
  "Andorra": "AD",
  "Angola": "AO",
  "Antigua and Barbuda": "AG",
  "Argentina": "AR",
  "Armenia": "AM",
  "Australia": "AU",
  "Austria": "AT",
  "Azerbaijan": "AZ",
  "Bahamas": "BS",
  "Bahrain": "BH",
  "Bangladesh": "BD",
  "Barbados": "BB",
  "Belarus": "BY",
  "Belgium": "BE",
  "Belize": "BZ",
  "Benin": "BJ",
  "Bhutan": "BT",
  "Bolivia": "BO",
  "Bosnia and Herzegovina": "BA",
  "Botswana": "BW",
  "Brazil": "BR",
  "Brunei": "BN",
  "Bulgaria": "BG",
  "Burkina Faso": "BF",
  "Burundi": "BI",
  "Cabo Verde": "CV",
  "Cambodia": "KH",
  "Cameroon": "CM",
  "Canada": "CA",
  "Central African Republic": "CF",
  "Chad": "TD",
  "Chile": "CL",
  "China": "CN",
  "Colombia": "CO",
  "Comoros": "KM",
  "Congo (Congo-Brazzaville)": "CG",
  "Congo, Democratic Republic of the": "CD",
  "Costa Rica": "CR",
  "Croatia": "HR",
  "Cuba": "CU",
  "Cyprus": "CY",
  "Czechia (Czech Republic)": "CZ",
  "Denmark": "DK",
  "Djibouti": "DJ",
  "Dominica": "DM",
  "Dominican Republic": "DO",
  "Ecuador": "EC",
  "Egypt": "EG",
  "El Salvador": "SV",
  "Equatorial Guinea": "GQ",
  "Eritrea": "ER",
  "Estonia": "EE",
  "Eswatini (fmr. \"Swaziland\")": "SZ",
  "Ethiopia": "ET",
  "Fiji": "FJ",
  "Finland": "FI",
  "France": "FR",
  "Gabon": "GA",
  "Gambia": "GM",
  "Georgia": "GE",
  "Germany": "DE",
  "Ghana": "GH",
  "Greece": "GR",
  "Grenada": "GD",
  "Guatemala": "GT",
  "Guinea": "GN",
  "Guinea-Bissau": "GW",
  "Guyana": "GY",
  "Haiti": "HT",
  "Holy See": "VA",
  "Honduras": "HN",
  "Hungary": "HU",
  "Iceland": "IS",
  "India": "IN",
  "Indonesia": "ID",
  "Iran": "IR",
  "Iraq": "IQ",
  "Ireland": "IE",
  "Israel": "IL",
  "Italy": "IT",
  "Jamaica": "JM",
  "Japan": "JP",
  "Jordan": "JO",
  "Kazakhstan": "KZ",
  "Kenya": "KE",
  "Kiribati": "KI",
  "Korea, North": "KP",
  "Korea, South": "KR",
  "Kuwait": "KW",
  "Kyrgyzstan": "KG",
  "Laos": "LA",
  "Latvia": "LV",
  "Lebanon": "LB",
  "Lesotho": "LS",
  "Liberia": "LR",
  "Libya": "LY",
  "Liechtenstein": "LI",
  "Lithuania": "LT",
  "Luxembourg": "LU",
  "Madagascar": "MG",
  "Malawi": "MW",
  "Malaysia": "MY",
  "Maldives": "MV",
  "Mali": "ML",
  "Malta": "MT",
  "Marshall Islands": "MH",
  "Mauritania": "MR",
  "Mauritius": "MU",
  "Mexico": "MX",
  "Micronesia": "FM",
  "Moldova": "MD",
  "Monaco": "MC",
  "Mongolia": "MN",
  "Montenegro": "ME",
  "Morocco": "MA",
  "Mozambique": "MZ",
  "Myanmar (formerly Burma)": "MM",
  "Namibia": "NA",
  "Nauru": "NR",
  "Nepal": "NP",
  "Netherlands": "NL",
  "New Zealand": "NZ",
  "Nicaragua": "NI",
  "Niger": "NE",
  "Nigeria": "NG",
  "North Macedonia": "MK",
  "Norway": "NO",
  "Oman": "OM",
  "Pakistan": "PK",
  "Palau": "PW",
  "Palestine State": "PS",
  "Panama": "PA",
  "Papua New Guinea": "PG",
  "Paraguay": "PY",
  "Peru": "PE",
  "Philippines": "PH",
  "Poland": "PL",
  "Portugal": "PT",
  "Qatar": "QA",
  "Romania": "RO",
  "Russia": "RU",
  "Rwanda": "RW",
  "Saint Kitts and Nevis": "KN",
  "Saint Lucia": "LC",
  "Saint Vincent and the Grenadines": "VC",
  "Samoa": "WS",
  "San Marino": "SM",
  "Sao Tome and Principe": "ST",
  "Saudi Arabia": "SA",
  "Senegal": "SN",
  "Serbia": "RS",
  "Seychelles": "SC",
  "Sierra Leone": "SL",
  "Singapore": "SG",
  "Slovakia": "SK",
  "Slovenia": "SI",
  "Solomon Islands": "SB",
  "Somalia": "SO",
  "South Africa": "ZA",
  "South Sudan": "SS",
  "Spain": "ES",
  "Sri Lanka": "LK",
  "Sudan": "SD",
  "Suriname": "SR",
  "Sweden": "SE",
  "Switzerland": "CH",
  "Syria": "SY",
  "Tajikistan": "TJ",
  "Tanzania": "TZ",
  "Thailand": "TH",
  "Timor-Leste": "TL",
  "Togo": "TG",
  "Tonga": "TO",
  "Trinidad and Tobago": "TT",
  "Tunisia": "TN",
  "Turkey": "TR",
  "Turkmenistan": "TM",
  "Tuvalu": "TV",
  "Uganda": "UG",
  "Ukraine": "UA",
  "United Arab Emirates": "AE",
  "United Kingdom": "GB",
  "United States": "US",
  "Uruguay": "UY",
  "Uzbekistan": "UZ",
  "Vanuatu": "VU",
  "Venezuela": "VE",
  "Vietnam": "VN",
  "Yemen": "YE",
  "Zambia": "ZM",
  "Zimbabwe": "ZW"
};

export default {
  async fetch(request: Request, env: any) {
    const url = new URL(request.url);

    if (url.pathname === "/summarize-country" && request.method === "POST") {
        try {
            
            // Inside your /summarize-country route
            const body = (await request.json()) as { country: string };
            const userInput = body.country.trim();
            const countryCode = countryNameToCode[userInput] || userInput.toUpperCase();

            if (!countryCode) {
                return new Response(
                    JSON.stringify({ error: `Unknown country: ${body.country}` }),
                    { status: 400, headers: { "Content-Type": "application/json" } }
                );
            }

            // Fetch Radar traffic data for the country
            const radarRes = await fetch(
            `https://api.cloudflare.com/client/v4/radar/netflows/timeseries?name=main&location=${countryCode}&dateRange=7d`,
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
            const aiPrompt = `Summarize the Internet traffic trends for ${countryCode} over the past 7 days using the following data: 
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

