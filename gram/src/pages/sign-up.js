/* eslint-disable prettier/prettier */
import { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import FirebaseContext from '../context/firebase';
import * as ROUTES from '../constants/routes';
import { doesUsernameExist } from '../services/firebase'

export default function SignUp() {
  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);

  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');

  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState('');
  const isInvalid = password === '' || emailAddress === '';
  

  const handleSignUp = async (e) => {
     e.preventDefault();
      
     const usernameExists = await doesUsernameExist(username);

     if (!usernameExists.length) {
       try {
         const createdUserResult = await firebase
           .auth()
           .createUserWithEmailAndPassword(emailAddress, password);
 
         // authentication
         // -> emailAddress & password & username (displayName)
         await createdUserResult.user.updateProfile({
           displayName: username
         });
 
         // firebase user collection (create a document)
         await firebase
           .firestore()
           .collection('users')
           .add({
             userId: createdUserResult.user.uid,
             username: username.toLowerCase(),
             fullName,
             emailAddress: emailAddress.toLowerCase(),
             following: [],
             followers: [],
             dateCreated: Date.now()
           });
 
         history.push(ROUTES.DASHBOARD);
       } catch (error) {
         setFullName('');
         setEmailAddress('');
         setPassword('');
         setError(error.message);
       }
       
     } else {
       setUsername('');
       setError('That username is already taken, please try another.');
     }
  };

  useEffect(() => {
    document.title = 'Sign up - OG Gram';
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

          <form onSubmit={handleSignUp} method='POST'>
              <input
               aria-label='Enter your username'
               type='username'
               placeholder='Username'
               value={username}
               onChange={({target}) => setUsername(target.value) }
               className='text-sm text-grey-base w-full mr-3 py-5 px-4 h-2 border border-grey-primary outline-none rounded-full mb-2'
               />

              <input
               aria-label='Enter your full name'
               type='text'
               value={fullName}
               placeholder='Full name'
               onChange={({target}) => setFullName(target.value) }
               className='text-sm text-grey-base w-full mr-3 py-5 px-4 h-2 border border-grey-primary outline-none rounded-full mb-2'
               />

              <input
               aria-label='Enter your Email Address'
               type='text'
               value={emailAddress}
               placeholder='Email Address'
               onChange={({target}) => setEmailAddress(target.value) }
               className='text-sm text-grey-base w-full mr-3 py-5 px-4 h-2 border border-grey-primary outline-none rounded-full mb-2'
               /> 

              <input
               aria-label='Enter your password'
               type='password'
               value={password}
               placeholder='Password'
               onChange={({target}) => setPassword(target.value) }
               className='text-sm text-grey-base w-full mr-3 py-5 px-4 h-2 border border-grey-primary outline-none rounded-full mb-2'
               /> 

               <button
               disabled={isInvalid}
               type='submit'
               className={`bg-blue-medium w-full text-white  rounded h-8 font-bold ${isInvalid && 'opacity-50'}`}
               >
                Sign Up
               </button>
          </form>
        </div>

        <div className="flex justify-center items-center flex-col w-full bg-white p-4 border border-grey-primary rounded " >
            <p>Already have an Account? {` `}
              <Link to={ROUTES.LOGIN} className='font-bold text-blue-medium'>
                  Login
              </Link>
             </p>
        </div>
      </div>
    </div> 
  );
}
