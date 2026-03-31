import React, { useState, useMemo, useCallback } from 'react';
import Header from './components/Header';
import FilterPanel from './components/FilterPanel';
import RecommendButton from './components/RecommendButton';
import MenuCard from './components/MenuCard';
import HistoryList from './components/HistoryList';
import FavoritesList from './components/FavoritesList';
import { useCurrentTime } from './hooks/useCurrentTime';
import { useLocalStorage } from './hooks/useLocalStorage';
import { menuData } from './data/menuData';
import './index.css';

// 추천 알고리즘 상수
const RECOMMEND_MIN = 3;
const RECOMMEND_MAX = 5;
const HISTORY_LIMIT = 10;
const HISTORY_EXCLUDE_COUNT = 3;
const TIME_WEIGHT_BONUS = 2;
const WEATHER_WEIGHT_BONUS = 1;
const THINKING_DELAY_MS = 1200;

function App() {
  const [recommendedMenus, setRecommendedMenus] = useState([]);
  const [isSpinning, setIsSpinning] = useState(false);
  const [noResultMessage, setNoResultMessage] = useState('');
  const [filters, setFilters] = useState({
    category: 'all',
    weather: 'any',
    timeSlot: 'all',
    groupSize: 1,
    mood: 'all'
  });

  const [history, setHistory] = useLocalStorage('whattoeat-history', []);
  const [favorites, setFavorites] = useLocalStorage('whattoeat-favorites', []);
  const currentTime = useCurrentTime();

  // 필터링된 메뉴 가져오기 (useMemo로 최적화)
  const filteredMenus = useMemo(() => {
    const baseFiltered = menuData.filter(menu => {
      const categoryMatch = filters.category === 'all' || menu.category === filters.category;
      const weatherMatch = filters.weather === 'any' || menu.weatherPreference === 'any' || menu.weatherPreference === filters.weather;
      const timeMatch = filters.timeSlot === 'all' || menu.timePreference.includes(filters.timeSlot);
      const groupMatch = menu.groupSize.includes(filters.groupSize);
      const moodMatch = filters.mood === 'all' || menu.mood.includes(filters.mood);

      return categoryMatch && weatherMatch && timeMatch && groupMatch && moodMatch;
    });

    if (baseFiltered.length <= HISTORY_EXCLUDE_COUNT) {
      return baseFiltered;
    }

    const recentHistory = history.slice(-HISTORY_EXCLUDE_COUNT);
    const filteredWithoutHistory = baseFiltered.filter(menu => !recentHistory.includes(menu.id));

    return filteredWithoutHistory.length > 0 ? filteredWithoutHistory : baseFiltered;
  }, [filters, history]);

  // 랜덤 메뉴 추천 (여러개) - 개선된 버전
  const recommendMenus = useCallback(() => {
    if (filteredMenus.length === 0) {
      setNoResultMessage('조건에 맞는 메뉴가 없습니다. 필터를 조정해주세요!');
      setTimeout(() => setNoResultMessage(''), 3000);
      return;
    }

    setNoResultMessage('');
    setIsSpinning(true);

    setTimeout(() => {
      const recommendCount = Math.min(RECOMMEND_MAX, Math.max(RECOMMEND_MIN, filteredMenus.length));
      const selectedMenus = [];
      const availableMenus = [...filteredMenus];

      for (let i = 0; i < recommendCount && availableMenus.length > 0; i++) {
        const weightedMenus = availableMenus.map(menu => {
          let weight = 1;
          if (menu.timePreference.includes(currentTime)) weight += TIME_WEIGHT_BONUS;
          if (filters.weather !== 'any' && menu.weatherPreference === filters.weather) weight += WEATHER_WEIGHT_BONUS;
          return { menu, weight };
        });

        const totalWeight = weightedMenus.reduce((sum, item) => sum + item.weight, 0);
        let randomWeight = Math.random() * totalWeight;

        let chosenItem = weightedMenus[0];
        for (const item of weightedMenus) {
          randomWeight -= item.weight;
          if (randomWeight <= 0) {
            chosenItem = item;
            break;
          }
        }

        const chosenMenu = chosenItem.menu;
        const chosenIndex = availableMenus.findIndex(menu => menu.id === chosenMenu.id);

        selectedMenus.push(chosenMenu);
        availableMenus.splice(chosenIndex, 1);
      }

      setRecommendedMenus(selectedMenus);
      // 추천된 메뉴 전체를 히스토리에 추가
      setHistory(prev => [...prev, ...selectedMenus.map(m => m.id)].slice(-HISTORY_LIMIT));
      setIsSpinning(false);
    }, THINKING_DELAY_MS);
  }, [filteredMenus, currentTime, filters.weather, setHistory]);

  // 즐겨찾기 토글
  const toggleFavorite = (menuId) => {
    setFavorites(prev =>
      prev.includes(menuId)
        ? prev.filter(id => id !== menuId)
        : [...prev, menuId]
    );
  };

  // 즐겨찾기 제거
  const removeFavorite = (menuId) => {
    setFavorites(prev => prev.filter(id => id !== menuId));
  };

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="max-w-lg mx-auto px-4 pb-8">
        <Header currentTime={currentTime} currentWeather={filters.weather} />

        <FilterPanel
          filters={filters}
          setFilters={setFilters}
          filteredMenusCount={filteredMenus.length}
          showHistoryNote={filteredMenus.length <= 3 && filteredMenus.length > 0}
        />

        {/* 필터 결과 없음 인라인 메시지 */}
        {noResultMessage && (
          <div className="mb-4 p-3 bg-red-50 border border-red-100 rounded-2xl animate-fade-in-up">
            <p className="text-red-500 text-sm text-center">{noResultMessage}</p>
          </div>
        )}

        <RecommendButton
          onClick={recommendMenus}
          isSpinning={isSpinning}
          disabled={filteredMenus.length === 0}
          menuCount={filteredMenus.length}
        />

        <MenuCard
          menus={recommendedMenus}
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
        />

        <HistoryList history={history} />

        <FavoritesList
          favorites={favorites}
          onRemoveFavorite={removeFavorite}
        />

        {/* Footer */}
        <footer className="text-center mt-10 py-6">
          <p className="text-stone-400 text-xs">
            Made by <span className="font-medium text-stone-500">devdduddu</span>
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
