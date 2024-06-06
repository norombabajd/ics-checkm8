import Header from '../../components/Heading'

import { supabase } from '../../api/supabase';
import GoogleButton from '../../assets/google-login.svg';

export var userid = null;

const postNewUser = async () => {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    
    const {user_metadata:{name}} = user
    const {user_metadata:{email}} = user
    if (error) {
      throw error;
    }
    const response = await fetch('http://localhost:4000/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ fullName :name, id: user.id, email:email }),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    
  } catch (error) {
    console.error('Error fetching events:', error.message);
  }
};
postNewUser();

async function GoogleAuth() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      queryParams: {
        prompt: 'consent',
      },
    },
  })

  if (data) {
    userid = data||null 
  }


  return { data, error }
}

function Login() {
  return (
    <div>
      <Header />
      <div className='flex flex-col max-w px-36 py-36 items-center'>
        <div className='card rounded-xl flex flex-col gap-2 p-10 shadow-lg'>
          <h1 className='text-2xl font-bold text-center'>Trying to check-in? <a className='text-[#BBDEF0]'>Checkm8</a>.</h1>
          <div className='text-center'><button onClick={GoogleAuth}><img src={GoogleButton} alt="Continue with Google" /></button></div>
        </div>
      </div>
    </div>
  );
}

export default Login;
