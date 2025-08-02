// src/data/city.js
import axiosInstance from './axiosInstance';

export const fetchCities = async () => {
    console.log('📢 fetchCities called'); // ✅ yeh zarur likhein
  
    try {
      const deviceId = localStorage.getItem('device_id');
      const deviceType = 'web';
  
      const response = await axiosInstance.post('/city/list', {
        id: 1,
        search_text: "",
        page: 1,
        limit: 25,
        device_id: deviceId,
        device_type: deviceType,
      });
  
      const cities = response.data.data || [];
  
      console.log('📍 Fetched Cities:', cities);
  
      return cities;
    } catch (error) {
      console.error('❌ Error fetching cities:', error?.response?.data || error.message);
      return [];
    }
  };
  