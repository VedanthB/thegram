/* eslint-disable prettier/prettier */
import { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import FirebaseContext from '../context/firebase';
import * as ROUTES from '../constants/routes'

export default function Login() {
  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);

  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');
  const isInvalid = password === '' || emailAddress === '';

  const handleLogin = async (e) => {
     e.preventDefault();
      
     try {
      await firebase.auth().signInWithEmailAndPassword(emailAddress, password);
         history.push(ROUTES.DASHBOARD)
     } catch (error) {
         setPassword('')
         setEmailAddress('')
         setError(error.message)
     }
  };

  useEffect(() => {
    document.title = 'Login - OG Gram';
  }, []);
  return (
    <div className="container flex mx-auto max-w-screen-md items-center h-screen">
      <div className='flex w-3/5'>
          <img src='/images/iphone-with-profile.jpg' alt='iphone with the og gram app' />
      </div>

      <div className='flex w-2/5 flex-col'>
         <div className='flex flex-col items-center bg-white p-4 border border-grey-primary mb-4 rounded '>
          <h1 className='flex justify-center w-full'>
              <img src='/images/logo.png' alt='logo' className='mt-2 w-6/12 mb-4 ' />
          </h1>

          {error && <p className='mb-4 text-xs text-red-primary '>{error}</p> }

          <form onSubmit={handleLogin} method='POST'>
              <input
               aria-label='Enter your email address'
               type='text'
               placeholder='Email address'
               onChange={({target}) => setEmailAddress(target.value) }
               className='text-sm text-grey-base w-full mr-3 py-5 px-4 h-2 border border-grey-primary outline-none rounded-full mb-2'
               />

              <input
               aria-label='Enter your email password'
               type='password'
               placeholder='Password'
               onChange={({target}) => setPassword(target.value) }
               className='text-sm text-grey-base w-full mr-3 py-5 px-4 h-2 border border-grey-primary outline-none rounded-full mb-2'
               />

               <button
               disabled={isInvalid}
               type='submit'
               className={`bg-blue-medium w-full text-white  rounded h-8 font-bold ${isInvalid && 'opacity-50'}`}
               >
                Log In
               </button>
          </form>
        </div>

        <div className="flex justify-center items-center flex-col w-full bg-white p-4 border border-grey-primary rounded " >
            <p>Dont have an Account? {` `}
              <Link to='/signup' className='font-bold text-blue-medium'>
                  Sign up
              </Link>
             </p>
        </div>
      </div>
    </div> 
  );
}

 // TODO

// text-blue-medium -> hex value   
// text-red-primary -> hex value
// text-grey-base  -> hex value
// border-grey-primary -> hex value
// bg-blue-medium -> hex value