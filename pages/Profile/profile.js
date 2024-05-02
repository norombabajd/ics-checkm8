import { supabase } from '../../index.js';

const { data: { user } } = await supabase.auth.getUser()
console.log(data);