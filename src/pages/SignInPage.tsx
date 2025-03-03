import { useNavigate } from 'react-router-dom';

const SignInPage = () => {
  const navigate = useNavigate();

  const handleCreateAccount = () => {
    navigate('/create-account');
  };

  return (
    <div className='mt-20'>
      <h1>Sign In</h1>
      {/* Your sign-in form here */}
      <button onClick={handleCreateAccount}>Create Account</button>
    </div>
  );
};

export default SignInPage;
