import axiosInstance from './axiosInstance';

export const fetchMacros = async () => {
  try {
    const deviceId = localStorage.getItem('device_id');
    const deviceType = 'web';

    const response = await axiosInstance.post('/macro/list', {
      id: 1,
      search_text: '',
      page: 1,
      limit: 25,
    }, {
      params: {
        no_device: deviceId,
      },
    });

    console.log('📦  Fetched Macros:', response.data);
    // console.log('📦 Fetched Macros:', response.data?.data);

    return response.data?.data || [];
  } catch (error) {
    console.error('❌ Error fetching macros:', error?.response?.data || error.message);
    return [];
  }
};
