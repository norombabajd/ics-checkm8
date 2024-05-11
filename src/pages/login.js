import Header from '../components/Heading'
import supabase from '../api/supabase';

async function GoogleAuth(){
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
    <div className="WebsiteBody">
        <Header/>
        <div className='justify-center items-center p-15'>
            <h1>Trying to check-in? <a>Checkm8.</a></h1>
            <button class="login-box" onClick={GoogleAuth}>Login or Sign up with Google</button>
        </div>
        
      </div>
          
  );
}

export default Login;
