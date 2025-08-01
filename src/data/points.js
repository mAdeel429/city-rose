// import axiosInstance from './axiosInstance';

// export const fetchPoints = async () => {
//   try {
//     const deviceId = localStorage.getItem('device_id');
//     const deviceType = 'web';

//     const response = await axiosInstance.post('/point/list', {
//       page: 1,
//       limit: 25,
//       device_id: deviceId,
//       device_type: deviceType,
//     });

//     const response2 = await axiosInstance.post('/point/list', {
//       page: 2,
//       limit: 25,
//       device_id: deviceId,
//       device_type: deviceType,
//     });

//     console.log('Points API Response Page 2:', response2.data);
//     console.log('✅ Points API Response:', response.data);
//     return response.data.data || [];
//   } catch (error) {
//     console.error('❌ Error fetching points:', error?.response?.data || error.message);
//     return [];
//   }
// };



import axiosInstance from './axiosInstance';

export const fetchPoints = async () => {
  try {
    const deviceId = localStorage.getItem('device_id');
    const deviceType = 'web';

    const [res1, res2, res3, res4, res5] = await Promise.all([
      axiosInstance.post('/point/list', {
        page: 1,
        limit: 25,
        device_id: deviceId,
        device_type: deviceType,
      }),
      axiosInstance.post('/point/list', {
        page: 2,
        limit: 25,
        device_id: deviceId,
        device_type: deviceType,
      }),
      axiosInstance.post('/point/list', {
        page: 3,
        limit: 25,
        device_id: deviceId,
        device_type: deviceType,
      }),
      axiosInstance.post('/point/list', {
        page: 4,
        limit: 25,
        device_id: deviceId,
        device_type: deviceType,
      }),
      axiosInstance.post('/point/list', {
        page: 5,
        limit: 25,
        device_id: deviceId,
        device_type: deviceType,
      }),
    ]);

    return {
      nearby: res1.data.data || [],
      mustSee: res2.data.data || [],
      michelin: res3.data.data || [],
      gelato: res4.data.data || [],
      vegan: res5.data.data || [],
    };
    console.log('nearby', res1.data.data)
  } catch (error) {
    console.error('❌ Error fetching points:', error?.response?.data || error.message);
    return {
      nearby: [],
      mustSee: [],
      michelin: [],
      gelato: [],
      vegan: [],
    };
  }
};
