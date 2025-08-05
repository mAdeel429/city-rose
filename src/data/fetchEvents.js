// import axiosInstance from './axiosInstance';

// export const fetchEvents = async () => {
//   try {
//     const geo = {
//       lat: 0.0,
//       lng: 0.0,
//       radius: 5,
//       only_distance: false,
//     };

//     const requestBody = (page) => ({
//       id: 1,
//       search_text: '',
//       geo,
//       macro_id: 1,
//       value_ids: [1],
//       tag_ids: [1],
//       bookmarked: false,
//       featured: [0, 1, 2],
//       page,
//       limit: 25,
//     });

//     const [res1, res2, res3] = await Promise.all([
//       axiosInstance.post('/event/list', requestBody(1)),
//       axiosInstance.post('/event/list', requestBody(2)),
//       axiosInstance.post('/event/list', requestBody(3)),
//     ]);

//     return {
//       page1: res1.data.data || [],
//       page2: res2.data.data || [],
//       page3: res3.data.data || [],
//     };
//   } catch (error) {
//     console.error('❌ Error fetching events:', error?.response?.data || error.message);
//     return {
//       page1: [],
//       page2: [],
//       page3: [],
//     };
//   }
// };




import axiosInstance from './axiosInstance';

export const fetchEvents = async () => {
  try {
    const res = await axiosInstance.post('/event/list', {
      page: 1,
      limit: 25,
    });
    const events = Array.isArray(res.data?.data) ? res.data.data : [];
    return {
      page1: events,
    };
  } catch (error) {
    console.error('❌ Error fetching events:', error);
    return {
      page1: [],
    };
  }
};
