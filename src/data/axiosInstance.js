// import axios from 'axios';

// const instance = axios.create({
//   baseURL: 'https://interstellar.cityrose.app:443/api/v1',
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// instance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('token');
//     const deviceId = localStorage.getItem('device_id');

//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }

//     if (deviceId) {
//       config.headers['cityrose-device-uuid'] = deviceId;
//     }

//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// export default instance;



// src/data/axiosInstance.js
import axios from 'axios';
import { refreshAccessToken } from '../auth/auth'

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
    }
    if (deviceId) {
      config.headers['cityrose-device-uuid'] = deviceId;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ RESPONSE INTERCEPTOR
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const newAccessToken = await refreshAccessToken();
      if (newAccessToken) {
        // ✅ Update token in original request
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return instance(originalRequest); // 🔁 Retry with new token
      } else {
        console.warn('🔐 Refresh failed. Logging out.');
        localStorage.clear();
        window.location.href = '/login';
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export default instance;
