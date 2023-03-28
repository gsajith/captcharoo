import Head from "next/head";
import styles from "@/styles/Home.module.css";
import ReCAPTCHA from "react-google-recaptcha";
import { testCaptcha } from "../utils";

export default function Home() {
  // Handles the submit event on form submit.
  const handleSubmit = async (event: any) => {
    // Stop the form from submitting and refreshing the page.
    event.preventDefault();

    // Get data from the form.
    const data = {
      phrase: event.target.phrase.value,
      name: event.target.name.value,
    };

    // Send the data to the server in JSON format.
    const JSONdata = JSON.stringify(data);

    // API endpoint where we send form data.
    const endpoint = "/api/phrase/create";

    // Form the request for sending data to the server.
    const options = {
      // The method is POST because we are sending data.
      method: "POST",
      // Tell the server we're sending JSON.
      headers: {
        "Content-Type": "application/json",
      },
      // Body of the request is the JSON data we created above.
      body: JSONdata,
    };

    // Send the form data to our forms API on Vercel and get a response.
    const response = await fetch(endpoint, options);

    // Get the response data from server as JSON.
    // If server returns the name submitted, that means the form works.
    const result = await response.json();
    alert(`Is this your full name: ${JSON.stringify(result)}`);
  };

  return (
    <>
      <Head>
        <title>Captcharoo</title>
        <meta name="description" content="Bot or not?" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.center}>
          <form onSubmit={handleSubmit}>
            <label htmlFor="phrase">Phrase: </label>
            <input
              required
              maxLength={20}
              type="text"
              id="phrase"
              name="phrase"
            />
            <br />
            <br />
            <label htmlFor="name">Name: </label>
            <input type="text" id="name" name="name" />
            <br />
            <br />

            <ReCAPTCHA
              asyncScriptOnLoad={() => console.log("load")}
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
              onChange={(code) => testCaptcha(code, () => alert("ok"))}
            />
            <br />

            <button type="submit">Submit</button>
          </form>
        </div>
      </main>
    </>
  );
}
