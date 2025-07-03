const API_URL = "https://poc-apocalipssi-production.up.railway.app/api";

export const uploadPDF = async (file, charLimit = 1000) => {
  const formData = new FormData();
  formData.append('pdf', file);
  formData.append('charLimit', charLimit);
  
  try {
    const response = await fetch(`${API_URL}/docs/upload`, {
      method: 'POST',
      body: formData,
      mode: 'cors',
    });
    
    if (!response.ok) {
      let errorMessage = 'Error uploading PDF';
      try {
        const errorData = await response.json();
        errorMessage = errorData.error || errorMessage;
      } catch (e) {
        errorMessage = response.statusText || errorMessage;
      }
      throw new Error(errorMessage);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error uploading PDF:', error);
    throw error;
  }
};

export const processText = async (text, charLimit = 1000) => {
  try {
    const response = await fetch(`${API_URL}/docs/text`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text, charLimit }),
      mode: 'cors',
    });
    
    if (!response.ok) {
      let errorMessage = 'Error processing text';
      try {
        const errorData = await response.json();
        errorMessage = errorData.error || errorMessage;
      } catch (e) {
        errorMessage = response.statusText || errorMessage;
      }
      throw new Error(errorMessage);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error processing text:', error);
    throw error;
  }
};

export const getHistory = async () => {
  try {
    const response = await fetch(`${API_URL}/docs/history`, {
      method: 'GET',
      mode: 'cors',
    });
    
    if (!response.ok) {
      let errorMessage = 'Error fetching history';
      try {
        const errorData = await response.json();
        errorMessage = errorData.error || errorMessage;
      } catch (e) {
        errorMessage = response.statusText || errorMessage;
      }
      throw new Error(errorMessage);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching history:', error);
    throw error;
  }
};

export const deleteHistoryItem = async (id) => {
  try {
    const response = await fetch(`${API_URL}/docs/history/${id}`, {
      method: 'DELETE',
      mode: 'cors',
    });
    
    if (!response.ok) {
      let errorMessage = 'Error deleting document';
      try {
        const errorData = await response.json();
        errorMessage = errorData.error || errorMessage;
      } catch (e) {
        errorMessage = response.statusText || errorMessage;
      }
      throw new Error(errorMessage);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error deleting document:', error);
    throw error;
  }
};