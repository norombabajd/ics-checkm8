// index.js - login-screen related functions for checkm8

// https://github.com/supabase/examples-archive/tree/main/supabase-js-v1/auth/javascript-auth
// https://supabase.com/docs/reference/javascript/

/*
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";


export const supabase = createClient(
  "https://rpnukhbkfykwutyntnkw.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJwbnVraGJrZnlrd3V0eW50bmt3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQwNzU0MzUsImV4cCI6MjAyOTY1MTQzNX0.c9PQXsg2ADUdpNtyY8_eLmKDpfSr11W4jXdHp0BBQG4",
);
*/

const create = document.getElementById("oauth");

// https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
create.addEventListener("click", () => {
  
  /* const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google'
  }) */
  
  window.location.href = '/pages/Dashboard/dashboard.html'
});
