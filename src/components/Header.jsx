import React from 'react';
import { getTimeEmoji, getWeatherEmoji } from '../utils/iconHelpers';
import { timeOptions } from '../data/constants';

const Header = ({ currentTime, currentWeather }) => {
  return (
    <header className="pt-6 pb-8 px-1">
      <div className="flex items-center justify-center gap-2 mb-1">
        <span className="text-3xl">🍽️</span>
        <h1 className="text-2xl font-bold text-stone-900 tracking-tight">
          오늘 뭐 먹지?
        </h1>
      </div>
      <p className="text-center text-stone-500 text-sm mb-5">
        198가지 메뉴 중 딱 맞는 식사를 추천해드려요
      </p>
      <div className="flex justify-center gap-3">
        <span className="badge bg-stone-100 text-stone-600">
          {getTimeEmoji(currentTime)} {timeOptions[currentTime] || '확인 중'}
        </span>
        <span className="badge bg-stone-100 text-stone-600">
          {getWeatherEmoji(currentWeather)} {currentWeather === 'any' ? '날씨 무관' : currentWeather === 'hot' ? '더운 날' : '추운 날'}
        </span>
      </div>
    </header>
  );
};

export default Header;
