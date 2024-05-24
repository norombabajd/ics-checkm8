import Header from '../../components/Heading'
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../../api/supabase";
import { useEffect } from 'react';



function SignOut() {
    const navigate = useNavigate();
  
    useEffect(() => {
        async function EndSession() {
            const { error } = await supabase.auth.signOut();
            if (!error){navigate("/login");}
        }
        EndSession();
    }, []);

  return (
    <div>
      <Header />
    </div>
  );
}

export default SignOut;
