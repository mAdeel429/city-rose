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

// import axiosInstance from './axiosInstance';

// export const fetchPointsByMacroId = async (macroId, geo = null) => {
//   try {
//     const deviceId = localStorage.getItem('device_id');
//     const deviceType = 'web';

//     const body = {
//       macro_id: macroId,
//       device_id: deviceId,
//       device_type: deviceType,
//       page: 1,
//       limit: 50,
//     };

//     if (geo) {
//       body.geo = geo;
//     }

//     const res = await axiosInstance.post('/point/list', body);
//     console.log(`📥 Response for macro ${macroId}:`, res.data);
//     return res.data.data || [];
//   } catch (error) {
//     console.error(`❌ Error fetching points for macroId ${macroId}:`, error);
//     return [];
//   }
// };

