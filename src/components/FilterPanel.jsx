import React, { useState } from 'react';
import { categories, timeOptions, moodOptions } from '../data/constants';
import { getMoodEmoji } from '../utils/iconHelpers';

const FilterPanel = ({ filters, setFilters, filteredMenusCount, showHistoryNote }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="card mb-4 overflow-hidden">
      {/* 접기/펼치기 헤더 */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 pb-3 hover:bg-stone-50/50 transition-colors"
      >
        <span className="section-title">맞춤 필터</span>
        <div className="flex items-center gap-2">
          <span className="text-xs text-stone-500 font-medium">
            {filteredMenusCount}개 메뉴
          </span>
          <svg
            className={`w-4 h-4 text-stone-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {/* 필터 내용 */}
      <div className={`transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
        <div className="px-4 pb-4 space-y-4">
          {/* 음식 종류 - 전체 너비 */}
          <div>
            <label className="block text-xs font-medium text-stone-500 mb-1.5">음식 종류</label>
            <select
              value={filters.category}
              onChange={(e) => setFilters(prev => ({...prev, category: e.target.value}))}
              className="select-input"
            >
              {Object.entries(categories).map(([key, value]) => (
                <option key={key} value={key}>{value}</option>
              ))}
            </select>
          </div>

          {/* 2열 그리드 */}
          <div className="grid grid-cols-2 gap-3">
            {/* 날씨 */}
            <div>
              <label className="block text-xs font-medium text-stone-500 mb-1.5">날씨</label>
              <select
                value={filters.weather}
                onChange={(e) => setFilters(prev => ({...prev, weather: e.target.value}))}
                className="select-input"
              >
                <option value="any">상관없음</option>
                <option value="hot">더운 날 ☀️</option>
                <option value="cold">추운 날 ❄️</option>
              </select>
            </div>

            {/* 시간대 */}
            <div>
              <label className="block text-xs font-medium text-stone-500 mb-1.5">시간대</label>
              <select
                value={filters.timeSlot}
                onChange={(e) => setFilters(prev => ({...prev, timeSlot: e.target.value}))}
                className="select-input"
              >
                {Object.entries(timeOptions).map(([key, value]) => (
                  <option key={key} value={key}>{value}</option>
                ))}
              </select>
            </div>
          </div>

          {/* 2열 그리드 */}
          <div className="grid grid-cols-2 gap-3">
            {/* 인원수 */}
            <div>
              <label className="block text-xs font-medium text-stone-500 mb-1.5">
                인원 <span className="text-orange-600 font-semibold">{filters.groupSize}명</span>
              </label>
              <input
                type="range"
                min="1"
                max="5"
                value={filters.groupSize}
                onChange={(e) => setFilters(prev => ({...prev, groupSize: parseInt(e.target.value)}))}
                className="w-full h-1.5 bg-stone-200 rounded-full appearance-none cursor-pointer slider mt-2"
              />
              <div className="text-[10px] text-stone-400 mt-1 flex justify-between px-0.5">
                <span>1명</span>
                <span>5명+</span>
              </div>
            </div>

            {/* 기분 */}
            <div>
              <label className="block text-xs font-medium text-stone-500 mb-1.5">기분</label>
              <select
                value={filters.mood}
                onChange={(e) => setFilters(prev => ({...prev, mood: e.target.value}))}
                className="select-input"
              >
                {Object.entries(moodOptions).map(([key, value]) => (
                  <option key={key} value={key}>
                    {getMoodEmoji(key)} {value}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* 메뉴 수 안내 */}
          {showHistoryNote && (
            <p className="text-[11px] text-amber-600 bg-amber-50 rounded-lg px-3 py-2">
              메뉴가 적어서 최근 선택도 포함돼요
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
