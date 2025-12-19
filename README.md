# cf_ai_internet_wrapped

AI-powered Internet traffic trends by country, delivered in a chatbot experience 🌍💬

---

## Description

**cf_ai_internet_wrapped** is an AI-powered web app that lets users explore **Internet traffic trends for any country** through a simple chatbot-style interface.

Users enter a **country name or ISO code**, and the app fetches real Internet traffic data from **Cloudflare Radar** for the past 7 days. This data is then summarized using **Workers AI**, producing clear, human-readable insights in a conversational format.

The project is inspired by a “Spotify Wrapped” experience — but for **global Internet traffic trends**.

---

## Features

- 💬 Chat-style user input (country name or ISO code)
- 🌍 Country-specific Internet traffic summaries
- 📊 Real data from Cloudflare Radar (Netflows API)
- 🤖 AI-generated explanations using Workers AI
- 🗂️ Durable Objects for storing summaries
- ⚡ Fully serverless on Cloudflare

---

## How It Works

1. User enters a country (e.g. `China` or `CN`)
2. Cloudflare Worker fetches traffic data for the last 7 days
3. Workers AI summarizes traffic patterns and trends
4. The response is returned in a chatbot-style message

---

## Live Demo

**Frontend (Chat UI):**  
👉 [https://cf-ai-internet-wrapped.pages.dev/](https://cf-ai-internet-wrapped.pages.dev/)

**API (Worker Backend):**  
👉 https://cf_ai_internet_wrapped.trisha-darure.workers.dev

---

## Technologies Used

- Cloudflare Workers
- Cloudflare Pages
- Cloudflare Radar API
- Workers AI (Llama 3.1 Instruct)
- Durable Objects
- TypeScript
- HTML / CSS / JavaScript
- Wrangler CLI

---

## Example Interaction

**User:** India  
**AI:** To provide a summary of the internet traffic trends for IN over the past 7 days, I will analyze the given data. **Overall Traffic Trend:** The overall traffic trend for IN over the past 7 days shows a relatively consistent pattern with some fluctuations. The traffic values range from a low of 0.155811 to a high of 1.0, with an average traffic value of 0.6986. **Daily Traffic Patterns:** Breaking down the traffic data by day, we can observe the following patterns: - **Day 1 (2025-12-12):** The traffic starts with a moderate value of 0.866162, indicating a relatively stable beginning to the week. - **Day 2 (2025-12-13):** The traffic decreases slightly to 0.828794, showing a minor dip in traffic. - **Day 3 (2025-12-14):** The traffic increases to 0.864376, indicating a slight recovery. - **Day 4 (2025-12-15):** The traffic decreases to 0.825526, showing another minor dip. - **Day 5 (2025-12-16):** The traffic increases to 0.844
