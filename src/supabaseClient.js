import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://dgtxuwizfdysklnbmbfe.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRndHh1d2l6ZmR5c2tsbmJtYmZlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzkyMTM1NjAsImV4cCI6MjA1NDc4OTU2MH0.fiQgIHxlTmS7zLnasq5-lcSlc6MsijwDiJuqV_b86Zw";
export const supabase = createClient(supabaseUrl, supabaseKey);
