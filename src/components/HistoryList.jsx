import React from 'react';
import { menuData } from '../data/menuData';

const HistoryList = ({ history }) => {
  if (history.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">📝 최근 선택한 메뉴</h2>
      <div className="flex flex-wrap gap-2">
        {history.slice(-5).map(menuId => {
          const menu = menuData.find(m => m.id === menuId);
          return (
            <span
              key={menuId}
              className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
            >
              {menu?.name}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default HistoryList;