# 오늘 뭐 먹지? (WhatToEat)

매일 반복되는 메뉴 고민을 해결해주는 맞춤 메뉴 추천 웹앱입니다.

[![Live Demo](https://img.shields.io/badge/Demo-whattoeat--drab.vercel.app-orange)](https://whattoeat-drab.vercel.app/)

## 주요 기능

- **맞춤 필터** — 음식 종류, 날씨, 시간대, 인원수, 기분으로 메뉴를 좁혀줍니다
- **가중치 추천** — 현재 시간대와 날씨에 어울리는 메뉴를 우선 추천합니다
- **198개 메뉴** — 한식, 중식, 일식, 양식, 동남아, 인도, 멕시칸, 분식, 디저트
- **즐겨찾기 & 히스토리** — 마음에 드는 메뉴 저장, 최근 추천 기록 확인
- **중복 방지** — 최근 추천된 메뉴는 자동으로 제외됩니다

## 기술 스택

| 영역 | 기술 |
|------|------|
| UI | React 18, Tailwind CSS |
| 폰트 | Pretendard Variable |
| 상태 관리 | useState, useMemo, Custom Hooks |
| 저장 | localStorage (오프라인 지원) |
| 배포 | Vercel |

## 시작하기

```bash
git clone https://github.com/dduddu1214/whattoeat.git
cd whattoeat
npm install
npm start
```

`http://localhost:3000`에서 실행됩니다.

## 프로젝트 구조

```
src/
├── components/          # UI 컴포넌트
│   ├── Header.jsx         # 헤더 (시간대, 날씨 표시)
│   ├── FilterPanel.jsx    # 필터 패널 (접기/펼치기)
│   ├── RecommendButton.jsx
│   ├── MenuCard.jsx       # 추천 메뉴 카드
│   ├── HistoryList.jsx    # 최근 추천 내역
│   ├── FavoritesList.jsx  # 즐겨찾기 목록
│   └── ErrorBoundary.jsx  # 에러 처리
├── data/
│   ├── menuData.js        # 198개 메뉴 데이터
│   └── constants.js       # 필터 옵션 상수
├── hooks/
│   ├── useCurrentTime.js  # 시간대 자동 감지
│   └── useLocalStorage.js # localStorage 래퍼
├── utils/
│   └── iconHelpers.js     # 이모지 매핑
└── App.jsx                # 메인 (필터링 + 추천 알고리즘)
```

## 추천 알고리즘

1. 5가지 필터 조건으로 메뉴 풀을 좁힙니다
2. 각 메뉴에 가중치를 부여합니다 (시간대 매칭 +2, 날씨 매칭 +1)
3. 가중치 기반 랜덤으로 3~5개를 선택합니다
4. 최근 추천된 메뉴는 풀에서 제외됩니다 (메뉴가 부족하면 해제)

## 빌드

```bash
npm run build    # 프로덕션 빌드
npm test         # 테스트 실행
```

## 라이선스

MIT

---

Made by [devdduddu](https://github.com/dduddu1214)
