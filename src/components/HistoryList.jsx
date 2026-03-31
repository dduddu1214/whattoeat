import React from 'react';
import { menuData } from '../data/menuData';

const HistoryList = ({ history }) => {
  if (history.length === 0) return null;

  // 중복 제거하며 최근 5개만 표시
  const recentIds = [...new Set(history.slice().reverse())].slice(0, 5);

  return (
    <div className="card p-4 mb-4">
      <h2 className="section-title mb-3">최근 추천</h2>
      <div className="flex flex-wrap gap-2">
        {recentIds.map((menuId, index) => {
          const menu = menuData.find(m => m.id === menuId);
          if (!menu) return null;
          return (
            <span
              key={`${menuId}-${index}`}
              className="badge bg-stone-100 text-stone-600"
            >
              {menu.name}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default HistoryList;
