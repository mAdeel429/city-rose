// src/data/city.js
import axiosInstance from './axiosInstance';

export const fetchCities = async () => {
  
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
  
      console.log('cities',response.data)
      const cities = response.data.data || [];
  
  
      return cities;
    } catch (error) {
      console.error('❌ Error fetching cities:', error?.response?.data || error.message);
      return [];
    }
  };
  