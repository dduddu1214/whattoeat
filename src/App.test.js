import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';

// localStorage mock
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => { store[key] = String(value); },
    removeItem: (key) => { delete store[key]; },
    clear: () => { store = {}; },
  };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

beforeEach(() => {
  window.localStorage.clear();
});

test('앱이 정상적으로 렌더링된다', () => {
  render(<App />);
  expect(screen.getByText(/오늘 뭐 먹지/)).toBeInTheDocument();
  expect(screen.getByText(/맞춤 필터/)).toBeInTheDocument();
});

test('필터 패널이 표시된다', () => {
  render(<App />);
  expect(screen.getByText(/음식 종류/)).toBeInTheDocument();
  expect(screen.getAllByRole('combobox').length).toBeGreaterThanOrEqual(4);
});

test('추천 버튼이 표시된다', () => {
  render(<App />);
  const button = screen.getByRole('button', { name: /추천받기/ });
  expect(button).toBeInTheDocument();
  expect(button).not.toBeDisabled();
});

test('추천 버튼 클릭 시 로딩 상태가 표시된다', () => {
  render(<App />);
  const button = screen.getByRole('button', { name: /추천받기/ });
  fireEvent.click(button);
  expect(screen.getByText(/추천 중/)).toBeInTheDocument();
});

test('추천 완료 후 메뉴 카드가 표시된다', async () => {
  jest.useFakeTimers();
  render(<App />);

  const button = screen.getByRole('button', { name: /추천받기/ });
  fireEvent.click(button);

  jest.advanceTimersByTime(1500);

  await waitFor(() => {
    expect(screen.getByText(/추천 메뉴/)).toBeInTheDocument();
  });

  jest.useRealTimers();
});

test('카테고리 필터를 변경할 수 있다', () => {
  render(<App />);
  const selects = screen.getAllByRole('combobox');
  const categorySelect = selects[0];

  fireEvent.change(categorySelect, { target: { value: 'chinese' } });
  expect(categorySelect.value).toBe('chinese');
});
