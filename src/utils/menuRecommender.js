// menuData import 제거
export const recommendMenuWithWeights = (filteredMenus, currentTime, currentWeather) => {
    // 가중치 기반 랜덤 선택
    const weightedMenus = filteredMenus.map(menu => {
      let weight = 1;
      
      // 시간대 매칭 보너스
      if (menu.timePreference.includes(currentTime)) weight += 2;
      
      // 날씨 매칭 보너스
      if (currentWeather !== 'any' && menu.weatherPreference === currentWeather) weight += 1;
      
      return { menu, weight };
    });
    
    // 가중치 기반 랜덤 선택
    const totalWeight = weightedMenus.reduce((sum, item) => sum + item.weight, 0);
    let randomWeight = Math.random() * totalWeight;
    
    let selectedMenu = weightedMenus[0].menu;
    for (const item of weightedMenus) {
      randomWeight -= item.weight;
      if (randomWeight <= 0) {
        selectedMenu = item.menu;
        break;
      }
    }
    
    return selectedMenu;
  };