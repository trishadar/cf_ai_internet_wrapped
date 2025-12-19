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

**User:** China  
**AI:** **Overview** Overall, Internet traffic in China (CN) experienced a moderate increase over the past week, with a slight peak on December 16th and a slight drop on December 18th. The average traffic value remained relatively stable, ranging from 0.8 to 1.0. This suggests a consistent level of online activity throughout the week. **Traffic Trend** Traffic fluctuated throughout the week, with a noticeable spike on December 16th, reaching a peak of 1.0. This spike was followed by a slight drop on December 18th, with traffic values returning to a stable range. The fluctuation can be attributed to the peak on December 16th, which may have been caused by increased online activity during the weekend. **Plain-English Takeaway** For an everyday Internet user in China, this trend means that they can expect a consistent level of online connectivity throughout the week, with occasional peaks in activity on weekends.
