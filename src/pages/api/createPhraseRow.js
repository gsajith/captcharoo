import { createClient } from "@supabase/supabase-js";
import { generateShortcode } from "../../utils";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SECRET_KEY
);

export default async function handler(req, res) {
  const { body, method } = req;

  if (method === "POST") {
    // Get the ID of this row
    const { phrase, name } = body;

    // Guard clause checks for first and last name,
    // and returns early if they are not found
    if (!body.phrase) {
      // Sends a HTTP bad request error code
      return res.status(400).json({ data: "Phrase not found." });
    }

    try {
      const { data, error } = await supabase
        .from("phrases")
        .insert([
          {
            phrase: phrase,
            name: name || "",
            user_id: "06739769-9d66-46b7-b06a-3f8c6b4a13af",
            shortcode: generateShortcode(),
          },
        ])
        .select();

      if (!error) {
        // Return 200 if everything is successful
        return res.status(200).json({ data: `${data}` });
      }

      return res.status(422).json({
        message: "Unprocessable request.",
      });
    } catch (error) {
      console.log(error);
      return res.status(422).json({ message: "Something went wrong" });
    }
  }

  // Return 404 if someone pings the API with a method other than
  // POST
  return res.status(404).send("Not found");
}
