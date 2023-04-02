# Captcharoo — bot checker

Captcharoo is the first **Proof-of-Humanity-as-a-Service (PoHaaS)**. Captcharoo is an app which lets you store a secret passphrase behind a Captcha, and generates a shortlink you can share to anyone you think might be a bot.

## Background

I made this project in response to the prevalence of GPT-based/similar AI chat systems in our day-to-day life, and the fear that you may never know if you're really talking to a human.

## Technical Reasoning

* I chose NextJS because I want SSR for the created Captcharoo pages, so that the link preview will show "Captcharoo from \<person\>"
* I didn't use any styling library for this, just default CSS modules. The project isn't complex enough to need something like Tailwind CSS or even styled-components.
* I chose Supabase as the backend DB. I'm using the platform for the first time and mostly just wanted to try it out. It seemed like a simple serverless DB platform that plays well with NextJS.

## Dev instructions (frontend)

Clone the repo, `cd` into it, and run `npm install`.

Then, run the development server:

```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the home page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

## Dev instructions (backend)

You need to set up a Supabase DB to store the data.

## TODO

- Clean up more code
- TTL slider
- Generating from a page with error keeps the error query
- SEO / image preview metadata
- Error states
- Try out https://ui.shadcn.com/
