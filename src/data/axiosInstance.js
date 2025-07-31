// src/utils/axiosInstance.js
// import axios from 'axios';

// const instance = axios.create({
//   baseURL: 'https://interstellar.cityrose.app:443/api/v1', // 🔁 Change to your real API base URL
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// export default instance;


import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://interstellar.cityrose.app:443/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    const deviceId = localStorage.getItem('device_id');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('🛡️ Using token:', token);
    }

    if (deviceId) {
      config.headers['cityrose-device-uuid'] = deviceId;
      console.log('📱 Using device ID:', deviceId);
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;