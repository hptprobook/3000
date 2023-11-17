const BASE_URL = 'http://127.0.0.1:8000/api/posts'; // Replace with your API URL

export const uploadFileToServer = async (file) => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${BASE_URL}/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('File upload failed');
    }

    const data = await response.json();
    return data; // Replace with the response format from your server
  } catch (error) {
    throw error;
  }
};