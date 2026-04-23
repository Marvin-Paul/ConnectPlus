import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
dotenv.config();

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

async function test() {
  const { data, error } = await supabase.from("Post").select("count");
  if (error) {
    console.error("Supabase Client Error:", error);
  } else {
    console.log("Supabase Client Success, count:", data);
  }
}

test();
