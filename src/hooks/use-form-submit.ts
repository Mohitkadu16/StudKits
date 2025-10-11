import { useState } from 'react';

export const useFormSubmit = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (url: string, data: any) => {
    try {
      setIsLoading(true);
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return { success: response.ok };
    } catch (error) {
      return { success: false };
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, handleSubmit };
};
