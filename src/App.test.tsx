import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

describe('App component', () => {
  it('renders without crashing', () => {
      render(<App />);
  });

  // Add more test cases here
});
