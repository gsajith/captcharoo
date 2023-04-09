# Captcharoo — bot checker

Captcharoo is the world's first **Proof of Humanity as a Service** (PoHaaS). It is a simple and secure way to verify that you're talking to a human being and not a bot.

## Background

I made this project in response to the prevalence of GPT-based/similar AI chat systems in our day-to-day life, and the fear that you may never know if you're really talking to a human.

The inspiration for Captcharoo came when I saw articles about [CupidBot](https://www.vice.com/en/article/m7bjqp/great-dating-apps-are-getting-more-hellish-thanks-to-ai-chatbots), an AI-powered bot which pretends to be a human on dating apps:

> _The AI algorithm will “swipe on girls that are just your type and constantly works to get high quality matches,” and then a chatbot talks with the women, until they agree to go on a date and arrange a time and place to meet. The date then gets added to the CupidBot user's calendar._ — [Vice article](https://www.vice.com/en/article/m7bjqp/great-dating-apps-are-getting-more-hellish-thanks-to-ai-chatbots)

I'm in favor of building tools which fight against the AI-ificiation of our human interactions, so that's where Captcharoo comes in. Next time you're chatting with someone on a dating app, slide them a Captcharoo!

Captcharoo was built by [@GuamHat](https://twitter.com/GuamHat), follow me on Twitter.

## How it works

1.  On the Home page, you can write a secret phrase and _lock it_ behind a Captcha.
2.  Captcharoo will generate a unique link that you can share to anyone you want to verify as human.
3.  When they click on the link, they'll be presented with the Captcha.
4.  If they solve it correctly, they'll be able to see your secret phrase.
5.  If they say your secret phrase back to you, you can be reasonably sure you're not speaking to a bot (until Captcha is defeated by the AI's 🥲).

## Technical Reasoning

- I chose NextJS because I want SSR for the created Captcharoo pages, so that the link preview will show "Captcharoo from \<person\>"
- I didn't use any styling library for this, just default CSS modules. The project isn't complex enough to need something like Tailwind CSS or even styled-components.
- I chose Supabase as the backend DB. I'm using the platform for the first time and mostly just wanted to try it out. It seemed like a simple serverless DB platform that plays well with NextJS.
- Any phrase you lock with Captcharoo will be encrypted and stored in our database. They won't be stored as plain text, but it would still be best to not write anything sensitive as your secret phrase.

## Dev instructions (frontend)

Clone the repo, `cd` into it, and run `npm install`.

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the home page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

## Dev instructions (backend)

You need to set up a Supabase DB to store the data. Instructions tbd.

## TODO

- Validate the Phrase and Name in phrase creation api
- Encrypt phrase and name info on backend
