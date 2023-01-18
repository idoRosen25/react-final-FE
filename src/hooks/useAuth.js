import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
import { apiKeys } from '../API/apiKeys';
import { useNavigate } from 'react-router';

const initialInputs = {
  email: '',
  password: '',
};

const useAuth = () => {
  const [inputs, setInputs] = useState(initialInputs);
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const auth = useMutation(
    apiKeys.auth(),
    async () => {
      const { email, password } = inputs;
      const res = await fetch(
        !isLogin
          ? process.env.REACT_APP_SIGNUP_URL
          : process.env.REACT_APP_LOGIN_URL,
        {
          method: 'POST',
          body: JSON.stringify({ email, password, returnSecureToken: true }),
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      console.log('res: ', res);

      if (!res.ok) {
        throw await res.json();
      }
      return res.json();
    },
    {
      onSuccess: (userCreds) => {
        console.log('signup userCreds: ', userCreds);
        queryClient.setQueryData(apiKeys.current(), userCreds);
        navigate('/');
      },
      onError: ({ error }) => {
        console.log('signup error: ', error);
        //TODO: display error message to user
      },
    },
  );

  return { auth, inputs, setInputs, isLogin, setIsLogin };
};

export default useAuth;
