# 🍽️ WhatToEat - 스마트 메뉴 추천 서비스

**"오늘 뭐 먹지?" 고민 끝! AI가 당신의 상황에 맞는 완벽한 메뉴를 추천해드립니다.**

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen)](https://whattoeat-drab.vercel.app/)
[![React](https://img.shields.io/badge/React-18.2.0-blue)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Deployed-Vercel-black)](https://vercel.com/)

## 🚀 Live Demo

**👉 [WhatToEat 바로 체험하기](https://whattoeat-drab.vercel.app/)**

## ✨ 주요 기능

### 🎯 스마트 추천 시스템
- **한 번에 3-5개 메뉴 추천** - 다양한 선택지 제공
- **가중치 기반 알고리즘** - 시간대와 날씨에 맞는 메뉴 우선 추천
- **중복 방지** - 최근 선택한 메뉴는 제외하고 추천

### 🎨 맞춤형 필터링
- **🍜 음식 종류**: 15개 카테고리 (한식 4개 세부분류, 아시아음식, 서양음식 등)
- **🌤️ 날씨**: 더운 날/추운 날에 맞는 메뉴
- **⏰ 시간대**: 아침/점심/저녁/야식/간식 자동 감지
- **👥 인원수**: 1명부터 5명까지 적합한 메뉴
- **💭 기분**: 9가지 기분 상태별 추천

### 📊 풍부한 메뉴 데이터베이스
- **총 140개 메뉴** 수록
- **다국적 요리**: 한식, 중식, 일식, 양식, 태국, 베트남, 인도, 멕시칸
- **상세 정보**: 칼로리, 주요 재료, 추천 상황, 적정 인원수

### 💾 편의 기능
- **즐겨찾기** - 좋아하는 메뉴 저장
- **히스토리** - 최근 선택한 메뉴 기록
- **로컬 스토리지** - 데이터 영구 보존

## 🛠️ 기술 스택

### Frontend
- **React 18.2.0** - 컴포넌트 기반 UI 개발
- **Tailwind CSS** - 유틸리티 퍼스트 스타일링
- **Custom Hooks** - 재사용 가능한 로직 분리
- **Local Storage** - 클라이언트 사이드 데이터 저장

### Design & UX
- **Noto Sans KR** - 한글 최적화 폰트
- **반응형 디자인** - 모바일/데스크톱 최적화
- **인터랙티브 UI** - 호버 효과 및 애니메이션
- **직관적 UX** - 사용자 친화적 인터페이스

### Deployment
- **Vercel** - 자동 배포 및 호스팅
- **GitHub** - 버전 관리

## 📂 프로젝트 구조

```
whattoeat/
├── public/                    # 정적 파일
├── src/
│   ├── components/           # React 컴포넌트
│   │   ├── Header.jsx       # 헤더 컴포넌트
│   │   ├── FilterPanel.jsx  # 필터 설정 패널
│   │   ├── RecommendButton.jsx # 추천 버튼
│   │   ├── MenuCard.jsx     # 메뉴 카드 (다중 메뉴 지원)
│   │   ├── HistoryList.jsx  # 히스토리 목록
│   │   └── FavoritesList.jsx # 즐겨찾기 목록
│   ├── data/                # 데이터 관리
│   │   ├── menuData.js      # 140개 메뉴 데이터베이스
│   │   └── constants.js     # 카테고리, 옵션 상수
│   ├── hooks/               # 커스텀 훅
│   │   ├── useCurrentTime.js # 현재 시간 감지
│   │   └── useLocalStorage.js # 로컬스토리지 관리
│   ├── utils/               # 유틸리티 함수
│   │   ├── iconHelpers.js   # 이모지 매핑
│   │   └── menuRecommender.js # 추천 알고리즘
│   ├── App.jsx              # 메인 앱 컴포넌트
│   └── index.css            # 전역 스타일
├── package.json
└── README.md
```

## 🎮 사용 방법

### 1. 필터 설정
- 원하는 음식 종류, 날씨, 시간대, 인원수, 기분 선택
- 실시간으로 조건에 맞는 메뉴 개수 확인

### 2. 메뉴 추천받기
- "🎲 메뉴 추천받기" 버튼 클릭
- 2초간 AI 고민 후 베스트 3-5개 메뉴 제공

### 3. 메뉴 선택
- 추천된 메뉴들을 카드 형태로 비교
- 마음에 드는 메뉴에 ❤️ 즐겨찾기 추가
- 마음에 안 들면 다시 추천받기!

## 🚀 로컬 개발 환경 설정

### 1. 프로젝트 클론
```bash
git clone https://github.com/yourusername/whattoeat.git
cd whattoeat
```

### 2. 의존성 설치
```bash
npm install
```

### 3. 개발 서버 실행
```bash
npm start
```
브라우저에서 `http://localhost:3000` 접속

### 4. 프로덕션 빌드
```bash
npm run build
```

## 🎯 핵심 알고리즘

### 가중치 기반 추천 시스템
```javascript
// 기본 가중치: 1
// 시간대 매칭 시: +2 가중치
// 날씨 매칭 시: +1 가중치
// 가중치가 높을수록 추천 확률 증가
```

### 스마트 히스토리 관리
- 메뉴가 충분할 때: 최근 3개 제외
- 메뉴가 부족할 때: 히스토리 제외 없이 모든 메뉴 포함

## 📱 반응형 디자인

- **모바일**: 1열 그리드 레이아웃
- **태블릿**: 2열 그리드 레이아웃  
- **데스크톱**: 3열 그리드 레이아웃

## 🤝 기여하기

1. 이 저장소를 Fork합니다
2. 새로운 기능 브랜치를 만듭니다 (`git checkout -b feature/새기능`)
3. 변경사항을 커밋합니다 (`git commit -am '새기능 추가'`)
4. 브랜치에 Push합니다 (`git push origin feature/새기능`)
5. Pull Request를 생성합니다

## 📜 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

## 👨‍💻 개발자

**Made with ❤️ by [devdduddu](https://github.com/devdduddu)**

---

### 🎉 지금 바로 체험해보세요!
**👉 [WhatToEat 사용하기](https://whattoeat-drab.vercel.app/)**

*"오늘 뭐 먹지?" 고민은 이제 그만! WhatToEat이 완벽한 답을 드립니다.* 🍽️✨