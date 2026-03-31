import React from 'react';
import { categories, moodOptions } from '../data/constants';
import { getWeatherEmoji, getMoodEmoji } from '../utils/iconHelpers';

const MenuCard = ({ menus, favorites, onToggleFavorite }) => {
  if (!menus || menus.length === 0) return null;

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4 px-1">
        <h2 className="section-title">
          추천 메뉴 {menus.length}가지
        </h2>
        <span className="text-xs text-stone-400">마음에 드는 메뉴를 저장하세요</span>
      </div>

      <div className="space-y-3">
        {menus.map((menu, index) => (
          <div
            key={menu.id}
            className="card p-4 animate-fade-in-up"
            style={{ animationDelay: `${index * 80}ms` }}
          >
            <div className="flex items-start justify-between gap-3">
              {/* 왼쪽: 메뉴 정보 */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-orange-600 text-white text-xs font-bold flex items-center justify-center">
                    {index + 1}
                  </span>
                  <h3 className="text-base font-semibold text-stone-900 truncate">
                    {menu.name}
                  </h3>
                </div>

                {/* 태그들 */}
                <div className="flex flex-wrap gap-1.5 mb-2.5">
                  <span className="badge bg-stone-100 text-stone-600">
                    {categories[menu.category]}
                  </span>
                  <span className="badge bg-stone-100 text-stone-600">
                    {menu.groupSize[0]}-{menu.groupSize[menu.groupSize.length-1]}명
                  </span>
                  <span className="badge bg-stone-100 text-stone-600">
                    {menu.calories}kcal
                  </span>
                  <span className="badge bg-stone-100 text-stone-600">
                    {getWeatherEmoji(menu.weatherPreference)}
                    {menu.weatherPreference === 'any' ? '사계절' :
                     menu.weatherPreference === 'hot' ? '더운 날' : '추운 날'}
                  </span>
                </div>

                {/* 재료 */}
                <p className="text-xs text-stone-500 leading-relaxed">
                  {menu.ingredients.slice(0, 4).join(' · ')}
                </p>

                {/* 기분 태그 */}
                <div className="flex flex-wrap gap-1 mt-2">
                  {menu.mood.slice(0, 2).map((mood, moodIndex) => (
                    <span key={moodIndex} className="badge bg-orange-50 text-orange-700">
                      {getMoodEmoji(mood)} {moodOptions[mood]}
                    </span>
                  ))}
                </div>
              </div>

              {/* 오른쪽: 즐겨찾기 */}
              <button
                onClick={() => onToggleFavorite(menu.id)}
                className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 ${
                  favorites.includes(menu.id)
                    ? 'bg-red-50 text-red-500 scale-100'
                    : 'bg-stone-50 text-stone-300 hover:bg-stone-100 hover:text-stone-400'
                }`}
                aria-label={favorites.includes(menu.id) ? '즐겨찾기 해제' : '즐겨찾기 추가'}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill={favorites.includes(menu.id) ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      <p className="text-center text-xs text-stone-400 mt-4">
        마음에 안 드시면 다시 추천받아 보세요
      </p>
    </div>
  );
};

export default MenuCard;
