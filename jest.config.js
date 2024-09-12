export default {
  testEnvironment: 'jsdom',  // Use jsdom for React components
  setupFilesAfterEnv: ['@testing-library/jest-dom'], // For better DOM assertions
  transform: {
    '^.+\\.jsx?$': 'babel-jest',  // Use babel-jest to handle JSX
  },
  moduleFileExtensions: ['js', 'jsx'],
};
