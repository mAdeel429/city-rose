import axiosInstance from './axiosInstance';

export const fetchPoints = async () => {
  try {
    const deviceId = localStorage.getItem('device_id');
    const deviceType = 'web';

    if (!deviceId) {
      console.warn('⚠️ Device ID not found in localStorage');
      return {
        nearby: [],
        mustSee: [],
        michelin: [],
        gelato: [],
        vegan: [],
      };
    }

    const pages = [1, 2, 3, 4, 5];

    const responses = await Promise.all(
      pages.map((page) =>
        axiosInstance.post('/point/list', {
          page,
          limit: 25,
          device_id: deviceId,
          device_type: deviceType,
        })
      )
    );

    const [nearby, mustSee, michelin, gelato, vegan] = responses.map(
      (res) => res.data.data || []
    );

    console.log('✅ Nearby Points:', nearby);

    return {
      nearby,
      mustSee,
      michelin,
      gelato,
      vegan,
    };
  } catch (error) {
    console.error('❌ Error fetching points:', error?.response?.data || error.message || error);
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
