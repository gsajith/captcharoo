import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SECRET_KEY
);

export default async function handler(req, res) {
  const { body, method } = req;

  // Get the ID of this row
  const { id } = body;

  if (method === "POST") {
    try {
      let { data: phrases, error } = await supabase
        .from("phrases")
        .select("phrase, name")
        .eq("shortcode", id);

      if (!phrases || typeof phrases === "undefined" || phrases.length === 0) {
        return res.status(422).json({ message: "Invalid URL" });
      }

      if (!error) {
        // Replace this with the API that will save the data received
        // to your backend
        // Return 200 if everything is successful
        return res.status(200).json({ data: phrases });
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
