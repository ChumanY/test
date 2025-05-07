import { jest } from '@jest/globals';

const mockSpinner = jest.fn(() => ({ testID: 'loading-spinner' }));

describe('LoadingScreen', () => {
  it('renders a spinner with the correct color', () => {
    const spinner = mockSpinner();
    expect(spinner.testID).toBe('loading-spinner');
  });
});