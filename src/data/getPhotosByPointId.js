// import axiosInstance from './axiosInstance';

// export const getPhotosByPointId = async (pointId) => {
//   try {
//     const response = await axiosInstance.get(`/media`, {
//       params: {
//         entity: 'point',
//         entity_id: pointId,
//       },
//     });

//     return response.data || [];
//   } catch (error) {
//     console.error('❌ Error fetching photos:', error?.response?.data || error.message || error);
//     return [];
//   }
// };