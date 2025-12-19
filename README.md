# cf_ai_internet_wrapped

AI-powered “Internet Wrapped” experience on Cloudflare Workers

---

## Description

This project creates an AI-powered “Internet Wrapped” app that summarizes major trends on the Internet over the past year. It uses **Workers AI (Llama 3.3)** and **Durable Objects** to:

- Provide summaries of global Internet patterns (traffic, AI & bot activity, outages, attacks)
- Track user interactions or preferences to tailor summaries
- Generate AI-powered insights for users in a concise, readable format

The goal is to give users a Spotify Wrapped-style experience, but for Internet trends.

---

## Features

- AI-powered summaries of Internet trends
- Durable Object for storing user interactions or history
- REST API interface (GET / SET endpoints)
- Fully deployable on Cloudflare Workers

---

## Live Demo

Try the app here: [https://cf_ai_internet_wrapped.trisha-darure.workers.dev](https://cf_ai_internet_wrapped.trisha-darure.workers.dev)

---

## Technologies Used

- Cloudflare Workers
- Workers AI (Llama 3.3)
- Durable Objects
- TypeScript
- Wrangler CLI