// 날씨 이모지
export const getWeatherEmoji = (weather) => {
    const emojis = {
      sunny: '☀️', 
      hot: '🔥', 
      rainy: '🌧️', 
      cold: '❄️', 
      any: '🌤️'
    };
    return emojis[weather] || '🌤️';
  };
  
  // 시간대 이모지
  export const getTimeEmoji = (time) => {
    const emojis = {
      breakfast: '🌅', 
      lunch: '☀️', 
      dinner: '🌆', 
      late: '🌙', 
      snack: '🍪', 
      all: '⏰'
    };
    return emojis[time] || '⏰';
  };
  
  // 기분 이모지 (간결화)
  export const getMoodEmoji = (mood) => {
    const emojis = {
      light: '🌿',
      heavy: '🍖', 
      spicy: '🌶️',
      refreshing: '💧',
      warm: '🔥',
      quick: '⚡',
      special: '✨',
      healthy: '🥗',
      comfort: '🤗'
    };
    return emojis[mood] || '😊';
  };