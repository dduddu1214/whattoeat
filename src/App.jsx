import React, { useState } from 'react';
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

function App() {
  const [recommendedMenus, setRecommendedMenus] = useState([]);
  const [isSpinning, setIsSpinning] = useState(false);
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

  // 필터링된 메뉴 가져오기 (히스토리 제외 로직 개선)
  const getFilteredMenus = () => {
    const baseFiltered = menuData.filter(menu => {
      const categoryMatch = filters.category === 'all' || menu.category === filters.category;
      const weatherMatch = filters.weather === 'any' || menu.weatherPreference === 'any' || menu.weatherPreference === filters.weather;
      const timeMatch = filters.timeSlot === 'all' || menu.timePreference.includes(filters.timeSlot);
      const groupMatch = menu.groupSize.includes(filters.groupSize);
      const moodMatch = filters.mood === 'all' || menu.mood.includes(filters.mood);
      
      return categoryMatch && weatherMatch && timeMatch && groupMatch && moodMatch;
    });

    // 히스토리 제외 로직 개선
    const filteredWithoutHistory = baseFiltered.filter(menu => !history.slice(-3).includes(menu.id));
    
    // 필터링된 메뉴가 3개 이하면 히스토리 제외 없이 모든 메뉴 반환
    if (baseFiltered.length <= 3) {
      return baseFiltered;
    }
    
    // 히스토리 제외 후에도 충분한 메뉴가 있으면 히스토리 제외된 메뉴 반환
    return filteredWithoutHistory.length > 0 ? filteredWithoutHistory : baseFiltered;
  };


// 랜덤 메뉴 추천 (여러개) - 개선된 버전
  const recommendMenus = () => {
    const filteredMenus = getFilteredMenus();
    if (filteredMenus.length === 0) {
      alert('조건에 맞는 메뉴가 없습니다. 필터를 조정해주세요!');
      return;
    }

    setIsSpinning(true);
    
    setTimeout(() => {
      // 추천할 메뉴 개수 결정 (최소 3개, 최대 5개, 필터된 메뉴 개수에 따라 조정)
      const recommendCount = Math.min(5, Math.max(3, filteredMenus.length));
      const selectedMenus = [];
      const availableMenus = [...filteredMenus];

      // 가중치 기반으로 여러 메뉴 선택 - 개선된 로직
      for (let i = 0; i < recommendCount && availableMenus.length > 0; i++) {
        const weightedMenus = availableMenus.map(menu => {
          let weight = 1;
          
          // 시간대 매칭 보너스
          if (menu.timePreference.includes(currentTime)) weight += 2;
          
          // 날씨 매칭 보너스
          if (filters.weather !== 'any' && menu.weatherPreference === filters.weather) weight += 1;
          
          return { menu, weight };
        });
        
        // 가중치 기반 랜덤 선택
        const totalWeight = weightedMenus.reduce((sum, item) => sum + item.weight, 0);
        let randomWeight = Math.random() * totalWeight;
        
        // 선택된 메뉴 찾기
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
        availableMenus.splice(chosenIndex, 1); // 선택된 메뉴는 제거하여 중복 방지
      }
      
      setRecommendedMenus(selectedMenus);
      // 첫 번째 메뉴만 히스토리에 추가
      setHistory(prev => [...prev, selectedMenus[0].id].slice(-10));
      setIsSpinning(false);
    }, 2000);
  };

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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 p-4">
      <div className="max-w-6xl mx-auto">
        <Header currentTime={currentTime} currentWeather={filters.weather} />
        
        <FilterPanel 
          filters={filters} 
          setFilters={setFilters} 
          filteredMenusCount={getFilteredMenus().length}
          showHistoryNote={getFilteredMenus().length <= 3 && getFilteredMenus().length > 0}
        />
        
        <RecommendButton 
          onClick={recommendMenus}
          isSpinning={isSpinning}
          disabled={getFilteredMenus().length === 0}
          menuCount={getFilteredMenus().length}
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
        <footer className="text-center mt-12 py-6 border-t border-gray-200">
          <p className="text-gray-500 text-sm">
            Made by <strong className="text-orange-600">devdduddu</strong>❤️
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;