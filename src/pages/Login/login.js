import Header from '../../components/Heading'

import supabase from '../../api/supabase';
import GoogleButton from '../../assets/google-login.svg';


async function GoogleAuth() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      queryParams: {
        prompt: 'consent',
      },
    },
  })
  console.log(data)
  return data, error
}

function Login() {
  return (
    <div>
      <Header />
      <div className='flex flex-col max-w px-36 py-36 items-center'>
        <div className='card rounded-xl flex flex-col gap-2 p-10 shadow-lg'>
          <h1 className='text-2xl font-bold text-center'>Trying to check-in? <a className='text-[#BBDEF0]'>Checkm8</a>.</h1>
          <hr class="min-h-[3px] my-2 rounded-lg border-[#BBDEF0]"></hr>
          <label className='font-semibold'>Email</label>
          <input className="border border-gray-300 rounded-md"></input>
          <label className='font-semibold'>Password</label>
          <input className="border border-gray-300 rounded-md" type='password'></input>
          <button className='login-box mt-2'>Login</button>
          <button className='login-box mt-2'>Sign up</button>
          <hr class="min-h-[3px] my-2 rounded-lg border-[#BBDEF0]"></hr>
          <div className='text-center'><button onClick={GoogleAuth}><img src={GoogleButton} alt="Continue with Google" /></button></div>
        </div>
      </div>

    </div>
  );
}

export default Login;
