import React from 'react';
import { menuData } from '../data/menuData';
import { categories } from '../data/constants';

const FavoritesList = ({ favorites, onRemoveFavorite }) => {
  if (favorites.length === 0) return null;

  const favoriteMenus = menuData.filter(menu => favorites.includes(menu.id));

  return (
    <div className="card p-4 mb-4">
      <h2 className="section-title mb-3">
        저장한 메뉴 <span className="text-stone-400 font-normal text-sm">{favoriteMenus.length}</span>
      </h2>
      <div className="space-y-2">
        {favoriteMenus.map(menu => (
          <div key={menu.id} className="flex items-center justify-between py-2 px-3 bg-stone-50 rounded-xl">
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-stone-800 truncate">{menu.name}</p>
              <p className="text-xs text-stone-400">{categories[menu.category]}</p>
            </div>
            <button
              onClick={() => onRemoveFavorite(menu.id)}
              className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-stone-300 hover:text-red-400 hover:bg-red-50 transition-all"
              aria-label={`${menu.name} 즐겨찾기 해제`}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoritesList;
