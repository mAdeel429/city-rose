// import axiosInstance from './axiosInstance';

// export const redeemOffer = async (offerId) => {
//   try {
//     const response = await axiosInstance.post(`/offer/redeem/${offerId}`);
//     console.log('🎉 Offer Redeem Response:', response.data);
//     return response.data;
//   } catch (error) {
//     console.error('❌ Error redeeming offer:', error?.response?.data || error.message);
//     return null;
//   }
// };

// export const getOfferById = async (offerId) => {
//   try {
//     const response = await axiosInstance.get(`/offer/${offerId}`, {
//       params: { no_device: 1 },
//     });
//     console.log('📦 GET /offer/:id Response:', response.data);
//     return response.data;
//   } catch (err) {
//     console.error('❌ Error fetching offer by ID:', err.response?.data || err.message);
//   }
// };


// export const bookmarkOffer = async (offerId, bookmarked = true) => {
//   try {
//     const response = await axiosInstance.post(
//       `/bookmark/offer/${offerId}`,
//       { bookmarked },
//       {
//         params: {
//           no_device: 1,
//         },
//       }
//     );

//     console.log('🔖 Bookmark API Response:', response.data);
//     return response.data;
//   } catch (error) {
//     console.error('❌ Error bookmarking offer:', error?.response?.data || error.message);
//     return null;
//   }
// };
