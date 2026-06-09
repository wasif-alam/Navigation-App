import axios from 'axios';

export const loginUser = async ({ email, password }) => {
  const response = await axios.post(
    'https://dummyjson.com/auth/login',
    {
      username: email.trim(),
      password,
    }
  );

  return response.data;
};