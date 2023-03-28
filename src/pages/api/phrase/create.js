import { createClient } from "@supabase/supabase-js";
import { generateShortcode } from "../../../utils";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SECRET_KEY
);

export default async function handler(req, res) {
  const { body, method } = req;

  if (method === "POST") {
    // Get the params for this row
    const { phrase, name } = body;

    // Guard clause checks for phrase
    // and returns early if not found
    // TODO: Validate Phrase and Name here
    if (!body.phrase) {
      // Sends a HTTP bad request error code
      return res.status(400).json({ data: "Phrase not found." });
    }

    // Log the CREATE call
    const newDate = new Date();
    const dateString =
      newDate.toDateString() + " " + newDate.toLocaleTimeString("en-US");
    console.log(
      `[${dateString}] Called CREATE with phrase ${phrase} and name ${name}`
    );

    try {
      const { data: createdPhrase, error } = await supabase
        .from("phrases")
        .insert([
          {
            phrase: phrase,
            name: name || "",
            user_id: process.env.SUPABASE_USER_ID,
            shortcode: generateShortcode(),
          },
        ])
        .select();

      // Success
      if (!error) {
        // Return 200 if everything is successful
        return res.status(200).json({ data: createdPhrase });
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
