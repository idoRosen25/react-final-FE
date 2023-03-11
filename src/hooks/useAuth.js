/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { apiKeys } from '../API/apiKeys';
import { useNavigate } from 'react-router-dom';
import useLocalStorage from './useLocalStorage';

const initialInputs = {
  email: '',
  password: '',
};

const useAuth = () => {
  const [inputs, setInputs] = useState(initialInputs);
  const [isLogin, setIsLogin] = useState(true);
  const { setValue } = useLocalStorage();
  const [notify, setNotify] = useState(false);

  const navigate = useNavigate();

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

      if (!res.ok) {
        throw await res.json();
      }
      return res.json();
    },
    {
      onSuccess: (userCreds) => {
        setValue(apiKeys.current()[0], userCreds);
        navigate('/');
      },
      onError: ({ error }) => {
        // console.error('signup error: ', error);
        setNotify(true);
        return error;
      },
    },
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    auth.mutate();
  };

  useEffect(() => {
    if (auth.isError && notify) {
      setNotify(true);
    }
    let timeout = setTimeout(() => {
      setNotify(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, [auth.isError, auth.error, notify, auth]);

  useEffect(() => {
    notify && setNotify(false);
  }, [isLogin]);
  return { auth, inputs, setInputs, isLogin, setIsLogin, handleSubmit, notify };
};

export default useAuth;
