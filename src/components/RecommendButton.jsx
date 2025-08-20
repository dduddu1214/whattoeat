import React from 'react';

const RecommendButton = ({ onClick, isSpinning, disabled, menuCount }) => {
  return (
    <div className="text-center mb-8">
      <button
        onClick={onClick}
        disabled={isSpinning || disabled}
        className={`px-8 py-4 text-xl font-bold rounded-full transition-all duration-300 ${
          isSpinning || disabled
            ? 'bg-gray-400 cursor-not-allowed' 
            : 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 transform hover:scale-105 shadow-lg'
        } text-white`}
      >
        {isSpinning ? '🎲 AI가 고민 중...' : disabled ? '❌ 조건을 조정해주세요' : '🎲 메뉴 추천받기'}
      </button>
      
      {/* 적은 메뉴 개수 안내 */}
      {menuCount > 0 && menuCount <= 5 && (
        <p className="mt-3 text-sm text-gray-600">
          💡 조건에 맞는 메뉴가 {menuCount}개뿐이에요. 
          {menuCount <= 3 ? ` ${menuCount}개 모두 추천해드릴게요!` : ' 필터를 조정하면 더 많은 선택지를 볼 수 있어요.'}
        </p>
      )}
      {menuCount > 5 && (
        <p className="mt-3 text-sm text-gray-600">
          🎯 조건에 맞는 {menuCount}개 메뉴 중 베스트 5가지를 추천해드려요!
        </p>
      )}
    </div>
  );
};

export default RecommendButton;