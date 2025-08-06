// redeemOffer.js
import axiosInstance from './axiosInstance';

/**
 * Redeems an offer and logs the full response (including potential QR code).
 * @param {string|number} offerId - The ID of the offer to redeem
 * @returns {object} Redeem API response data
 */
export const redeemOffer = async (offerId) => {
  try {
    const deviceId = localStorage.getItem('device_id');

    const response = await axiosInstance.post(`/offer/redeem/${offerId}`, null, {
      params: {
        no_device: deviceId || 1, // fallback to 1 if deviceId not found
      },
    });

    console.log('✅ 🎁 Offer Redeem Successful');
    console.log('🔍 Full Response Data:', response.data);

    return response.data;

  } catch (error) {
    console.error('❌ Failed to redeem offer:', error?.response?.data || error.message);
    throw error;
  }
};
