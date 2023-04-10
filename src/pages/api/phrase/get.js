import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SECRET_KEY
);

export default async function handler(req, res) {
  const { body, method } = req;

  if (method === "POST") {
    // Get the shortcode of this row
    const { shortcode, includePhrase } = body;

    // Log the GET call
    const newDate = new Date();
    const dateString =
      newDate.toDateString() + " " + newDate.toLocaleTimeString("en-US");
    console.log(
      `[${dateString}] Called GET with code ${shortcode} and includePhrase ${includePhrase}`
    );

    // Get the row from the database
    try {
      let { data: phrases, error } = await supabase
        .from("decrypted_phrases")
        .select(
          "inserted_at, ttl, name" + (includePhrase ? ", decrypted_phrase" : "")
        )
        .eq("shortcode", shortcode);

      // Invalid shortcode or malformed URL
      if (!phrases || typeof phrases === "undefined" || phrases.length === 0) {
        return res.status(422).json({ message: "Invalid URL" });
      }

      // Success
      if (!error) {
        // Return 200 if everything is successful
        return res.status(200).json({ data: phrases[0] });
      }

      // Some other error
      return res.status(422).json({
        message: "Unprocessable request.",
      });
    } catch (error) {
      return res.status(422).json({ message: "Something went wrong" });
    }
  }
  // Return 404 if someone pings the API with a method other than
  // POST
  return res.status(404).send("Not found");
}
