import Link from "next/link";
import Dialog from "../components/Dialog";

const About = () => {
  return (
    <Dialog
      title="About Captcharoo"
      message={
        <>
          <p>
            Captcharoo is a simple and secure way to verify that you&apos;re
            talking to a human being and not a bot. It&apos;s the world&apos;s
            first <strong>Proof of Humanity as a Service</strong> (PoHaaS).
          </p>
          <hr />
          <p>
            <h2>
              <strong>How it works</strong>
            </h2>
            <ol>
              <li>
                On the home page, you can write a secret phrase and
                &quot;lock&quot; it behind a Captcha.
              </li>
              <li>
                Captcharoo will generate a unique link that you can share with
                anyone you want to verify as a human.
              </li>
              <li>
                When they open the link, they&apos;ll be presented with the
                Captcha. Upon solving it, they can see your secret phrase.
              </li>
              <li>
                If they say your secret phrase back to you, you can be
                reasonably sure you&apos;re speaking to a human (until Captcha
                is defeated by the AI&apos;s 🥲).
              </li>
            </ol>
          </p>
          <hr />
          <p>
            <h2>
              <strong>Just a heads up</strong>
            </h2>
            <br />
            Any phrase you lock with Captcharoo will be encrypted and stored in
            our database. They won&apos;t be stored as plain text, but it would
            still be best to not write anything sensitive as your secret phrase.
            <br />
            <br />
            No identifying information about you is stored, other than the name
            field, if you chose to provide it.
          </p>
          <hr />
          <p>
            <h2>
              <strong>Why I created Captcharoo</strong>
            </h2>
            <br />
            The inspiration for Captcharoo came when I saw articles about{" "}
            <a
              target="_blank"
              href="https://www.vice.com/en/article/m7bjqp/great-dating-apps-are-getting-more-hellish-thanks-to-ai-chatbots"
              rel="noopener noreferrer">
              CupidBot
            </a>
            , an AI-powered bot that pretends to be a human on dating apps:
            <blockquote>
              <i>
                The AI algorithm will “swipe on girls that are just your type
                and constantly works to get high quality matches,” and then a
                chatbot talks with the women, until they agree to go on a date
                and arrange a time and place to meet. The date then gets added
                to the CupidBot user&apos;s calendar.
              </i>{" "}
              —{" "}
              <a
                target="_blank"
                href="https://www.vice.com/en/article/m7bjqp/great-dating-apps-are-getting-more-hellish-thanks-to-ai-chatbots"
                rel="noopener noreferrer">
                Vice article
              </a>
            </blockquote>
            I&apos;m want to fight against the AI-ificiation of our human
            interactions, so that&apos;s where Captcharoo comes in. Next time
            you&apos;re chatting with someone on a dating app, slide them a
            Captcharoo!
            <br />
            <br />
            Captcharoo was built by{" "}
            <a
              target="_blank"
              href="https://twitter.com/GuamHat"
              rel="noopener noreferrer">
              @GuamHat
            </a>
            , follow me on Twitter.
          </p>
        </>
      }
      buttonText="About"
    />
  );
};

export default About;
