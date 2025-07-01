const API_URL = 'http://localhost:3000/api';

export const uploadPDF = async (file, charLimit = 1000) => {
  const formData = new FormData();
  formData.append('pdf', file);
  formData.append('charLimit', charLimit);
  
  try {
    const response = await fetch(`${API_URL}/docs/upload`, {
      method: 'POST',
      body: formData,
      // Add mode to handle CORS issues
      mode: 'cors',
    });
    
    if (!response.ok) {
      let errorMessage = 'Error uploading PDF';
      try {
        const errorData = await response.json();
        errorMessage = errorData.error || errorMessage;
      } catch (e) {
        // If we can't parse the error as JSON, just use the status text
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
      // Add mode to handle CORS issues
      mode: 'cors',
    });
    
    if (!response.ok) {
      let errorMessage = 'Error processing text';
      try {
        const errorData = await response.json();
        errorMessage = errorData.error || errorMessage;
      } catch (e) {
        // If we can't parse the error as JSON, just use the status text
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