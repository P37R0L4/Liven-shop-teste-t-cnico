// jest.config.js
import nextJest from "next/jest";

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  testEnvironment: "jest-environment-jsdom",
  moduleDirectories: ["node_modules", "<rootDir>/"],
  moduleNameMapper: {
    '^@/components/(.*)$': '<rootDir>/components/$1',
  },
  plugin: [
    '@babel/preset-react',
    'babel/plugin-syntax-jsx'
  ]
};

module.exports = createJestConfig(customJestConfig);
