import { createClient } from '@supabase/supabase-js';

const supabase = createClient("https://rpnukhbkfykwutyntnkw.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJwbnVraGJrZnlrd3V0eW50bmt3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQwNzU0MzUsImV4cCI6MjAyOTY1MTQzNX0.c9PQXsg2ADUdpNtyY8_eLmKDpfSr11W4jXdHp0BBQG4");
export default supabase;
