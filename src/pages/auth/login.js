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
      <div className='flex flex-col max-w px-16 py-16 items-center'>
        <div className='card rounded-xl flex flex-col gap-2 p-10 shadow-lg w-128 h-128'>
          <h1 className='text-2xl font-bold text-center'>Trying to check-in? <a className='text-[#BBDEF0]'>Checkm8</a>.</h1>
          <hr className="min-h-[2px] m-2 rounded-lg border-none bg-[#FFD200]" />

          <h3 className='text-center'>Sounds familiar, works familiar.</h3>
          <p className='text-center text-clip'>Based off of UC Irvine's own ICS Check-in system, checkm8 extends this functionality to more users. </p>


          <hr className="min-h-[2px] m-2 rounded-lg border-none bg-[#FFD200]" />
          <h3 className='text-center'>All your events, at a glance.</h3>
          <a className='text-center'>A dynamic dashboard, helping you keep track of created and attending events.</a>
          <hr className="min-h-[2px] m-2 rounded-lg border-none bg-[#FFD200]" />

          <a className='text-center'>A new way for event management.</a>
          <hr className="min-h-[2px] m-2 rounded-lg border-none bg-[#FFD200]" />

          <div className='text-center'><button onClick={GoogleAuth}><img src={GoogleButton} alt="Continue with Google" /></button></div>
        </div>
      </div>
    </div>
  );
}

export default Login;
