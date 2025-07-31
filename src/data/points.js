// import axiosInstance from './axiosInstance';

// export const fetchPoints = async () => {
//     try {
//         const response = await axiosInstance.post('/point/list', {
//             id: 1,
//             search_text: '',
//             geo: {
//                 lat: 0.0,
//                 lng: 0.0,
//                 radius: 5,
//                 only_distance: false,
//             },
//             macro_id: 1,
//             value_ids: [1],
//             tag_ids: [1],
//             bookmarked: false,
//             featured: [0, 1, 2],
//             page: 1,
//             limit: 25,

//             device_id: 'web-debug-device',
//             device_type: 'web'
//         });

//         return response.data.items || [];
//     } catch (error) {
//         console.error('Error fetching points:', error?.response?.data || error.message);
//         return [];
//     }
// };




import axiosInstance from './axiosInstance';

export const fetchPoints = async () => {
    try {
      const deviceId = localStorage.getItem('device_id');
      const deviceType = 'web';
  
      const response = await axiosInstance.post('/point/list', {
        page: 1,
        limit: 25,
        device_id: deviceId,
        device_type: deviceType,
      });
  
      console.log('✅ Points API Response:', response.data);
      return response.data.items || [];
    } catch (error) {
      console.error('❌ Error fetching points:', error?.response?.data || error.message);
      return [];
    }
  };
  