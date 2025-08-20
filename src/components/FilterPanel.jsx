import React from 'react';
import { categories, timeOptions, moodOptions } from '../data/constants';
import { getMoodEmoji } from '../utils/iconHelpers';

const FilterPanel = ({ filters, setFilters, filteredMenusCount, showHistoryNote }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">🎯 맞춤 설정</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {/* 음식 종류 */}
        <div className="col-span-full">
          <label className="block text-sm font-medium text-gray-700 mb-2">🍜 음식 종류</label>
          <select 
            value={filters.category}
            onChange={(e) => setFilters(prev => ({...prev, category: e.target.value}))}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            {Object.entries(categories).map(([key, value]) => (
              <option key={key} value={key}>{value}</option>
            ))}
          </select>
        </div>

        {/* 날씨 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">🌤️ 날씨</label>
          <select
            value={filters.weather}
            onChange={(e) => setFilters(prev => ({...prev, weather: e.target.value}))}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            <option value="any">상관없음</option>
            <option value="hot">더운 날씨 ☀️</option>
            <option value="cold">추운 날씨 ❄️</option>
          </select>
        </div>

        {/* 시간대 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">⏰ 시간대</label>
          <select
            value={filters.timeSlot}
            onChange={(e) => setFilters(prev => ({...prev, timeSlot: e.target.value}))}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            {Object.entries(timeOptions).map(([key, value]) => (
              <option key={key} value={key}>{value}</option>
            ))}
          </select>
        </div>

        {/* 인원수 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">👥 몇 명이서? {filters.groupSize}명</label>
          <input
            type="range"
            min="1"
            max="5"
            value={filters.groupSize}
            onChange={(e) => setFilters(prev => ({...prev, groupSize: parseInt(e.target.value)}))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="text-sm text-gray-600 mt-1 flex justify-between">
            <span>1명</span>
            <span>5명</span>
          </div>
        </div>

        {/* 기분 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">💭 지금 기분</label>
          <select
            value={filters.mood}
            onChange={(e) => setFilters(prev => ({...prev, mood: e.target.value}))}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            {Object.entries(moodOptions).map(([key, value]) => (
              <option key={key} value={key}>
                {getMoodEmoji(key)} {value}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 필터 결과 미리보기 */}
      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">
            조건에 맞는 메뉴: <strong className="text-orange-600">{filteredMenusCount}개</strong>
          </span>
          {showHistoryNote && (
            <span className="text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded">
              💡 메뉴가 적어서 최근 선택도 포함됩니다
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;