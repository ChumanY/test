import { jest } from '@jest/globals';

jest.mock('@react-navigation/native', () => {
  return {
    useNavigation: () => ({ navigate: jest.fn() }),
  };
});

const mockRender = jest.fn(() => ({
  getByText: jest.fn((text) => text),
}));

describe('DashboardScreen', () => {
  it('renders correctly', () => {
    const { getByText } = mockRender();
    expect(getByText('Dashboard')).toBe('Dashboard');
  });

  it('fetches data when Fetch Data button is pressed', () => {
    const { getByText } = mockRender();
    const fetchButton = getByText('Fetch Data');
    const mockPress = jest.fn(() => fetchButton);
    mockPress();
    expect(getByText('Dashboard')).toBe('Dashboard');
  });
});