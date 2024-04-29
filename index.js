// Project setup derived from supabase examples
// https://github.com/supabase/examples-archive/tree/main/supabase-js-v1/auth/javascript-auth
// https://supabase.com/docs/reference/javascript/installing
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabase = createClient(
  "https://rpnukhbkfykwutyntnkw.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJwbnVraGJrZnlrd3V0eW50bmt3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQwNzU0MzUsImV4cCI6MjAyOTY1MTQzNX0.c9PQXsg2ADUdpNtyY8_eLmKDpfSr11W4jXdHp0BBQG4",
);

const login = document.getElementById("login");
const create = document.getElementById("createaccount");

// https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
create.addEventListener("click", async () => {
  const password = document.getElementById("password");
  console.log(alert(password));
});
