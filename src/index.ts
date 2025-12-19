import { SummaryStore } from "./summary_store";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*", // or replace * with your frontend URL
  "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

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
  "AFGHANISTAN": "AF",
  "ALBANIA": "AL",
  "ALGERIA": "DZ",
  "ANDORRA": "AD",
  "ANGOLA": "AO",
  "ANTIGUA AND BARBUDA": "AG",
  "ARGENTINA": "AR",
  "ARMENIA": "AM",
  "AUSTRALIA": "AU",
  "AUSTRIA": "AT",
  "AZERBAIJAN": "AZ",
  "BAHAMAS": "BS",
  "BAHRAIN": "BH",
  "BANGLADESH": "BD",
  "BARBADOS": "BB",
  "BELARUS": "BY",
  "BELGIUM": "BE",
  "BELIZE": "BZ",
  "BENIN": "BJ",
  "BHUTAN": "BT",
  "BOLIVIA": "BO",
  "BOSNIA AND HERZEGOVINA": "BA",
  "BOTSWANA": "BW",
  "BRAZIL": "BR",
  "BRUNEI": "BN",
  "BULGARIA": "BG",
  "BURKINA FASO": "BF",
  "BURUNDI": "BI",
  "CABO VERDE": "CV",
  "CAMBODIA": "KH",
  "CAMEROON": "CM",
  "CANADA": "CA",
  "CENTRAL AFRICAN REPUBLIC": "CF",
  "CHAD": "TD",
  "CHILE": "CL",
  "CHINA": "CN",
  "COLOMBIA": "CO",
  "COMOROS": "KM",
  "CONGO (CONGO-BRAZZAVILLE)": "CG",
  "CONGO, DEMOCRATIC REPUBLIC OF THE": "CD",
  "COSTA RICA": "CR",
  "CROATIA": "HR",
  "CUBA": "CU",
  "CYPRUS": "CY",
  "CZECHIA (CZECH REPUBLIC)": "CZ",
  "DENMARK": "DK",
  "DJIBOUTI": "DJ",
  "DOMINICA": "DM",
  "DOMINICAN REPUBLIC": "DO",
  "ECUADOR": "EC",
  "EGYPT": "EG",
  "EL SALVADOR": "SV",
  "EQUATORIAL GUINEA": "GQ",
  "ERITREA": "ER",
  "ESTONIA": "EE",
  "ESWATINI (FMR. \"SWAZILAND\")": "SZ",
  "ETHIOPIA": "ET",
  "FIJI": "FJ",
  "FINLAND": "FI",
  "FRANCE": "FR",
  "GABON": "GA",
  "GAMBIA": "GM",
  "GEORGIA": "GE",
  "GERMANY": "DE",
  "GHANA": "GH",
  "GREECE": "GR",
  "GRENADA": "GD",
  "GUATEMALA": "GT",
  "GUINEA": "GN",
  "GUINEA-BISSAU": "GW",
  "GUYANA": "GY",
  "HAITI": "HT",
  "HOLY SEE": "VA",
  "HONDURAS": "HN",
  "HUNGARY": "HU",
  "ICELAND": "IS",
  "INDIA": "IN",
  "INDONESIA": "ID",
  "IRAN": "IR",
  "IRAQ": "IQ",
  "IRELAND": "IE",
  "ISRAEL": "IL",
  "ITALY": "IT",
  "JAMAICA": "JM",
  "JAPAN": "JP",
  "JORDAN": "JO",
  "KAZAKHSTAN": "KZ",
  "KENYA": "KE",
  "KIRIBATI": "KI",
  "KOREA, NORTH": "KP",
  "KOREA, SOUTH": "KR",
  "KUWAIT": "KW",
  "KYRGYZSTAN": "KG",
  "LAOS": "LA",
  "LATVIA": "LV",
  "LEBANON": "LB",
  "LESOTHO": "LS",
  "LIBERIA": "LR",
  "LIBYA": "LY",
  "LIECHTENSTEIN": "LI",
  "LITHUANIA": "LT",
  "LUXEMBOURG": "LU",
  "MADAGASCAR": "MG",
  "MALAWI": "MW",
  "MALAYSIA": "MY",
  "MALDIVES": "MV",
  "MALI": "ML",
  "MALTA": "MT",
  "MARSHALL ISLANDS": "MH",
  "MAURITANIA": "MR",
  "MAURITIUS": "MU",
  "MEXICO": "MX",
  "MICRONESIA": "FM",
  "MOLDOVA": "MD",
  "MONACO": "MC",
  "MONGOLIA": "MN",
  "MONTENEGRO": "ME",
  "MOROCCO": "MA",
  "MOZAMBIQUE": "MZ",
  "MYANMAR (FORMERLY BURMA)": "MM",
  "NAMIBIA": "NA",
  "NAURU": "NR",
  "NEPAL": "NP",
  "NETHERLANDS": "NL",
  "NEW ZEALAND": "NZ",
  "NICARAGUA": "NI",
  "NIGER": "NE",
  "NIGERIA": "NG",
  "NORTH MACEDONIA": "MK",
  "NORWAY": "NO",
  "OMAN": "OM",
  "PAKISTAN": "PK",
  "PALAU": "PW",
  "PALESTINE STATE": "PS",
  "PANAMA": "PA",
  "PAPUA NEW GUINEA": "PG",
  "PARAGUAY": "PY",
  "PERU": "PE",
  "PHILIPPINES": "PH",
  "POLAND": "PL",
  "PORTUGAL": "PT",
  "QATAR": "QA",
  "ROMANIA": "RO",
  "RUSSIA": "RU",
  "RWANDA": "RW",
  "SAINT KITTS AND NEVIS": "KN",
  "SAINT LUCIA": "LC",
  "SAINT VINCENT AND THE GRENADINES": "VC",
  "SAMOA": "WS",
  "SAN MARINO": "SM",
  "SAO TOME AND PRINCIPE": "ST",
  "SAUDI ARABIA": "SA",
  "SENEGAL": "SN",
  "SERBIA": "RS",
  "SEYCHELLES": "SC",
  "SIERRA LEONE": "SL",
  "SINGAPORE": "SG",
  "SLOVAKIA": "SK",
  "SLOVENIA": "SI",
  "SOLOMON ISLANDS": "SB",
  "SOMALIA": "SO",
  "SOUTH AFRICA": "ZA",
  "SOUTH SUDAN": "SS",
  "SPAIN": "ES",
  "SRI LANKA": "LK",
  "SUDAN": "SD",
  "SURINAME": "SR",
  "SWEDEN": "SE",
  "SWITZERLAND": "CH",
  "SYRIA": "SY",
  "TAJIKISTAN": "TJ",
  "TANZANIA": "TZ",
  "THAILAND": "TH",
  "TIMOR-LESTE": "TL",
  "TOGO": "TG",
  "TONGA": "TO",
  "TRINIDAD AND TOBAGO": "TT",
  "TUNISIA": "TN",
  "TURKEY": "TR",
  "TURKMENISTAN": "TM",
  "TUVALU": "TV",
  "UGANDA": "UG",
  "UKRAINE": "UA",
  "UNITED ARAB EMIRATES": "AE",
  "UNITED KINGDOM": "GB",
  "UNITED STATES": "US",
  "URUGUAY": "UY",
  "UZBEKISTAN": "UZ",
  "VANUATU": "VU",
  "VENEZUELA": "VE",
  "VIETNAM": "VN",
  "YEMEN": "YE",
  "ZAMBIA": "ZM",
  "ZIMBABWE": "ZW"
};

export default {
  async fetch(request: Request, env: any) {
    const url = new URL(request.url);

    // Handle CORS preflight requests
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: CORS_HEADERS });
    }

    if (url.pathname === "/summarize-country" && request.method === "POST") {
        try {
            
            // Inside your /summarize-country route
            const body = (await request.json()) as { country: string };
            const userInput = body.country.trim().toUpperCase();
            const countryCode = countryNameToCode[userInput] || userInput;

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
            const aiPrompt = `You are an Internet analytics assistant.

            Analyze Internet traffic data for the country ${countryCode} over the past 7 days.

            Use the data below to generate a clear, user-friendly summary.

            Data provided:
            - Timestamps (chronological): ${timestamps.join(", ")}
            - Traffic values (corresponding to each timestamp): ${values.join(", ")}

            Output format requirements:
            1. Overview
            Give a 2–3 sentence high-level summary of how Internet traffic behaved overall during the past week.

            2. Traffic Trend
            In 2-3 sentences, describe whether traffic increased, decreased, fluctuated, or remained stable. Mention any noticeable spikes or drops and approximately when they occurred.

            4. Plain-English Takeaway
            End with one short sentence explaining what this trend means for an everyday Internet user in this country.
            `;

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
                { headers: { "Content-Type": "application/json", ...CORS_HEADERS } }
            );

        } catch (err) {
            console.error(err);
            return new Response("Internal Server Error", { status: 500, headers: CORS_HEADERS });
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
                { headers: { "Content-Type": "application/json", ...CORS_HEADERS } }
            );

        } catch (err) {
            console.error(err);
            return new Response("Internal Server Error", { status: 500, headers: CORS_HEADERS });
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
            return new Response("Internal Server Error", { status: 500, headers: CORS_HEADERS });
        }
    }
    
    return new Response("Not Found", { status: 404, headers: CORS_HEADERS });
},

};

export { SummaryStore };

