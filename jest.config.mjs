import nextJest from "next/jest";

const createJestConfig = nextJest({
    dir: './',
});

const customJestConfig = {
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    moduleNameMapper: {
        '@/components/(.*)$': '<rootDir>/components/$1',
        '@/pages/(.*)$': '<rootDir>/pages/$1',
    },
    testEnvironment: 'jest-environment-jsdom',
    coveragePathIgnorePatterns: ['src/store', "src/services", 'pages/index.tsx/getServerSideProps', 'pages/index.tsx']
};

export default createJestConfig(customJestConfig);