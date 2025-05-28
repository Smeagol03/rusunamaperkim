<<<<<<< HEAD
// Konfigurasi Supabase
const supabaseUrl = "https://olxnjpbvyjeuqjemgpab.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9seG5qcGJ2eWpldXFqZW1ncGFiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgwODMxMTAsImV4cCI6MjA2MzY1OTExMH0.LYKrxxQOGSDTzN4_VDuVhJCL8YOmDm7BqbGED3BvXrY";

// Buat single instance Supabase client
const supabase = window.supabase.createClient(supabaseUrl, supabaseAnonKey);

// Export supabase agar bisa digunakan di file lain
window.supabase = supabase;
=======
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

export { supabase };
>>>>>>> 2466d3184865b72c4b91faae2d1cb5ecffd9f7d2
