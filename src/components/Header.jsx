import React from 'react';
import { getTimeEmoji, getWeatherEmoji } from '../utils/iconHelpers';
import { timeOptions } from '../data/constants';

const Header = ({ currentTime, currentWeather }) => {
  return (
    <header className="text-center mb-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-2">🍽️ WhatToEat</h1>
      <p className="text-gray-600 text-lg">스마트 점심 메뉴 추천 서비스</p>
      <div className="mt-4 flex justify-center gap-4 text-sm text-gray-600">
        <span>{getTimeEmoji(currentTime)} 현재: {timeOptions[currentTime] || '시간 확인 중'}</span>
        <span>{getWeatherEmoji(currentWeather)} 날씨 설정: {currentWeather === 'any' ? '상관없음' : currentWeather}</span>
      </div>
    </header>
  );
};

export default Header;