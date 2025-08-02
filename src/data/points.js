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




// import axiosInstance from './axiosInstance';

// export const fetchPoints = async () => {
//   try {
//     const deviceId = localStorage.getItem('device_id');
//     const deviceType = 'web';
//     const limit = 25;
//     const totalResults = 351;
//     const totalPages = Math.ceil(totalResults / limit);

//     const requests = Array.from({ length: totalPages }, (_, i) =>
//       axiosInstance.post('/point/list', {
//         page: i + 1,
//         limit,
//         device_id: deviceId,
//         device_type: deviceType,
//       })
//     );

//     const responses = await Promise.all(requests);

//     const allItems = responses.flatMap(res => res.data?.data || []);

//     const filteredItems = allItems.filter(item => item.hide_home);

//     console.log(`📦 Total fetched items: ${allItems.length}`);
//     console.log(`✅ Filtered items (hide_home == false): ${filteredItems.length}`);
//     console.log('📝 Filtered Items:', filteredItems);

//     return {
//       nearby: filteredItems,
//       mustSee: [],
//       michelin: [],
//       gelato: [],
//       vegan: [],
//     };

//   } catch (error) {
//     console.error('❌ Error fetching points:', error?.response?.data || error.message);
//     return {
//       nearby: [],
//       mustSee: [],
//       michelin: [],
//       gelato: [],
//       vegan: [],
//     };
//   }
// };
