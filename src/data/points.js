// import axiosInstance from './axiosInstance';

// export const fetchPoints = async () => {
//   try {
//     const deviceId = localStorage.getItem('device_id');
//     const deviceType = 'web';

//     if (!deviceId) {
//       console.warn('⚠️ Device ID not found in localStorage');
//       return {
//         nearby: [],
//         mustSee: [],
//         michelin: [],
//         gelato: [],
//         vegan: [],
//       };
//     }

//     const pages = [1, 2, 3, 4, 5];

//     const responses = await Promise.all(
//       pages.map((page) =>
//         axiosInstance.post('/point/list', {
//           page,
//           limit: 25,
//           device_id: deviceId,
//           device_type: deviceType,
//         })
//       )
//     );

//     const [nearby, mustSee, michelin, gelato, vegan] = responses.map(
//       (res) => res.data.data || []
//     );

//     console.log('✅ Nearby Points:', nearby);

//     return {
//       nearby,
//       mustSee,
//       michelin,
//       gelato,
//       vegan,
//     };
//   } catch (error) {
//     console.error('❌ Error fetching points:', error?.response?.data || error.message || error);
//     return {
//       nearby: [],
//       mustSee: [],
//       michelin: [],
//       gelato: [],
//       vegan: [],
//     };
//   }
// };


import axiosInstance from './axiosInstance';

export const fetchPoints = async () => {
  try {
    const deviceId = localStorage.getItem('device_id');
    const deviceType = 'web';

    if (!deviceId) {
      console.warn('⚠️ Device ID not found in localStorage');
      return [];
    }

    let currentPage = 1;
    const limit = 25;
    let allPoints = [];
    let keepFetching = true;

    while (keepFetching) {
      const res = await axiosInstance.post('/point/list', {
        page: currentPage,
        limit,
        device_id: deviceId,
        device_type: deviceType,
      });

      const data = res.data.data || [];

      allPoints = [...allPoints, ...data];

      if (data.length < limit) {
        keepFetching = false;
      } else {
        currentPage++;
      }
    }

    console.log('allPoints', allPoints)
    return allPoints;
  } catch (error) {
    console.error('❌ Error fetching points:', error?.response?.data || error.message || error);
    return [];
  }
};



