import React from 'react';
import { categories, timeOptions, moodOptions } from '../data/constants';
import { getWeatherEmoji, getMoodEmoji } from '../utils/iconHelpers';

const RecommendedMenusList = ({ menus, favorites, onToggleFavorite }) => {
  if (!menus || menus.length === 0) return null;

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        🎲 추천 메뉴 {menus.length}가지
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {menus.map((menu, index) => (
          <div 
            key={menu.id} 
            className="bg-white rounded-xl shadow-lg p-6 transform transition-all duration-300 hover:scale-105 border-2 border-gray-100 hover:border-orange-200"
          >
            {/* 순위 표시 */}
            <div className="flex justify-between items-start mb-3">
              <span className="bg-orange-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                #{index + 1}
              </span>
              <button
                onClick={() => onToggleFavorite(menu.id)}
                className={`text-xl transition-colors ${
                  favorites.includes(menu.id)
                    ? 'text-red-500 hover:text-red-600'
                    : 'text-gray-300 hover:text-red-400'
                }`}
              >
                {favorites.includes(menu.id) ? '💖' : '🤍'}
              </button>
            </div>
            
            {/* 메뉴 이름 */}
            <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">
              {menu.name}
            </h3>
            
            {/* 카테고리와 인원수 */}
            <div className="flex justify-center gap-2 mb-4">
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                {categories[menu.category]}
              </span>
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
                {menu.groupSize[0]}-{menu.groupSize[menu.groupSize.length-1]}명
              </span>
            </div>
            
            {/* 주요 재료 */}
            <div className="bg-gray-50 rounded-lg p-3 mb-4">
              <h4 className="text-sm font-semibold text-gray-700 mb-1">🥘 주요 재료</h4>
              <p className="text-sm text-gray-600">{menu.ingredients.slice(0, 3).join(', ')}</p>
            </div>
            
            {/* 추천 상황 */}
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-gray-700 mb-2">💭 추천 상황</h4>
              <div className="flex flex-wrap gap-1">
                {menu.mood.slice(0, 2).map((mood, moodIndex) => (
                  <span key={moodIndex} className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">
                    {getMoodEmoji(mood)} {moodOptions[mood]}
                  </span>
                ))}
              </div>
            </div>
            
            {/* 상세 정보 */}
            <div className="flex justify-center items-center gap-4 text-xs text-gray-600">
              <span>📊 {menu.calories}kcal</span>
              <span>{getWeatherEmoji(menu.weatherPreference)} 
                {menu.weatherPreference === 'any' ? '사계절' : 
                 menu.weatherPreference === 'hot' ? '더운 날' : '추운 날'}
              </span>
            </div>
          </div>
        ))}
      </div>
      
      {/* 다시 추천받기 안내 */}
      <div className="text-center mt-6">
        <p className="text-sm text-gray-600">
          💡 마음에 드는 메뉴가 없나요? 다시 추천받기 버튼을 눌러보세요!
        </p>
      </div>
    </div>
  );
};

export default RecommendedMenusList;