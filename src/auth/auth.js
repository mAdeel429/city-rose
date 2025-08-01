// src/utils/auth.js
export const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem('refresh_token');
    if (!refreshToken) return null;
  
    try {
      const res = await fetch('https://interstellar.cityrose.app/api/v1/auth/refresh', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'device-name': 'web',
        },
        body: JSON.stringify({ refresh_token: refreshToken }),
      });
  
      const data = await res.json();
  
      if (!res.ok || !data.access_token) return null;
  
      // Save new token
      localStorage.setItem('token', data.access_token);
      localStorage.setItem('refresh_token', data.refresh_token || refreshToken);
      localStorage.setItem('token_type', data.token_type || 'Bearer');
      localStorage.setItem('expires_in', data.expires_in?.toString() || '');
  
      return data.access_token; // ✅ MUST RETURN
    } catch (err) {
      return null;
    }
  };
  
  
  export async function fetchWithAuth(url, options = {}, retry = true) {
    const token = localStorage.getItem('token');
    const tokenType = localStorage.getItem('token_type') || 'Bearer';
  
    const authOptions = {
      ...options,
      headers: {
        ...(options.headers || {}),
        Authorization: `${tokenType} ${token}`,
      },
    };
  
    const response = await fetch(url, authOptions);
  
    if (response.status === 401 && retry) {
      const newToken = await refreshAccessToken();
      if (newToken) {
        return fetchWithAuth(url, options, false); // Retry once
      } else {
        console.warn("Session expired. Logging out...");
        localStorage.clear();
        window.location.href = '/auth';
      }
    }
  
    return response;
  }
  