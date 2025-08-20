import React from 'react';
import { menuData } from '../data/menuData';
import { categories } from '../data/constants';

const FavoritesList = ({ favorites, onRemoveFavorite }) => {
  if (favorites.length === 0) return null;

  const favoriteMenus = menuData.filter(menu => favorites.includes(menu.id));

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">💖 즐겨찾기 메뉴</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {favoriteMenus.map(menu => (
          <div key={menu.id} className="bg-gray-50 rounded-lg p-4 flex justify-between items-center">
            <div>
              <h3 className="font-medium text-gray-800">{menu.name}</h3>
              <p className="text-sm text-gray-600">{categories[menu.category]}</p>
            </div>
            <button
              onClick={() => onRemoveFavorite(menu.id)}
              className="text-red-500 hover:text-red-700 transition-colors"
            >
              ❌
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoritesList;