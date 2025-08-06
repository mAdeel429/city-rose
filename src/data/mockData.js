import axiosInstance from './axiosInstance';

export const fetchPointDetailsWithPhotos = async (pointId) => {
  try {
    const res = await axiosInstance.get(`/point/${pointId}?expand=photos`);
    return res.data;
  } catch (error) {
    console.error('❌ Error fetching point with photos:', error?.response?.data || error.message);
    return null;
  }
};
