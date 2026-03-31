import React from 'react';

const RecommendButton = ({ onClick, isSpinning, disabled, menuCount }) => {
  return (
    <div className="mb-6">
      <button
        onClick={onClick}
        disabled={isSpinning || disabled}
        className={`w-full py-4 text-base font-semibold rounded-2xl transition-all duration-200 ${
          isSpinning
            ? 'bg-orange-100 text-orange-600 cursor-wait'
            : disabled
            ? 'bg-stone-100 text-stone-400 cursor-not-allowed'
            : 'btn-primary w-full'
        }`}
      >
        {isSpinning ? (
          <span className="inline-flex items-center gap-2">
            <span className="animate-pulse-soft">추천 중...</span>
          </span>
        ) : disabled ? (
          '조건에 맞는 메뉴가 없어요'
        ) : (
          `추천받기 (${menuCount}개 중)`
        )}
      </button>
    </div>
  );
};

export default RecommendButton;
