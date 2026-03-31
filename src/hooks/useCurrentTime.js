import { useState, useEffect } from 'react';

export const useCurrentTime = () => {
  const [currentTime, setCurrentTime] = useState('all');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 7 && hour < 11) setCurrentTime('breakfast');
    else if (hour >= 11 && hour < 15) setCurrentTime('lunch');
    else if (hour >= 15 && hour < 17) setCurrentTime('snack');
    else if (hour >= 17 && hour < 21) setCurrentTime('dinner');
    else if (hour >= 21 || hour < 7) setCurrentTime('late');
    else setCurrentTime('snack');
  }, []);

  return currentTime;
};