import axios from 'axios';

const base_url = 'https://dummyjson.com';

export { base_url };

const instance = axios.create({
  baseURL: base_url,
  headers: {
    agent: 'browser',
  },
  timeout: 1000 * 60,
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (
      error?.response?.status === 403 ||
      error?.response?.data?.message === 'You are not logged in'
    ) {
    } else if (error.code === 'ERR_NETWORK') {
    } else {
      const err = error?.response?.data;
    }
    return Promise.reject(error);
  }
);

export { instance };
