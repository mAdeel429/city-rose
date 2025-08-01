import axiosInstance from './axiosInstance';

export const fetchOffers = async (page = 1, limit = 25) => {
    try {
      const deviceId = localStorage.getItem('device_id');
  
      const response = await axiosInstance.post('/offer/list', {
        device_id: deviceId,
        device_type: 'web',
        only_active: true,
        page,
        limit,
      });
  
      console.log('📡 Offer API raw response:', response.data);
      return response.data.data;
  
    } catch (error) {
      console.error('❌ Error fetching offers:', error?.response?.data || error.message);
      return [];
    }
  };
  