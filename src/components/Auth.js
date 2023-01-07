import React from 'react';
import useSignup from '../hooks/useAuth';

const Signup = () => {
  const { auth, inputs, setInputs, isLogin, setIsLogin } = useSignup();

  console.log('signup error: ', auth.error);
  return (
    <div>
      <h1>{isLogin ? 'Login' : 'Signup'} Page</h1>

      <input
        placeholder="email"
        type="email"
        required
        value={inputs.email}
        onChange={e =>
          setInputs(prev => ({ ...prev, email: e.target.value || '' }))
        }
      />

      <input
        placeholder="password"
        type={'password'}
        required
        minLength={8}
        value={inputs.password}
        onChange={e =>
          setInputs(prev => ({ ...prev, password: e.target.value || '' }))
        }
      />

      <button onClick={() => auth.mutate()}>
        {!isLogin ? 'Signup' : 'Login'}
      </button>

      {auth.error && <h2>{auth.error.error.message}</h2>}
    </div>
  );
};

export default Signup;
