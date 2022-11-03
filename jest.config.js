/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleNameMapper: {
        "@tests/(.*)": "<rootDir>/src/__tests__/$1",
        "@src/(.*)": "<rootDir>/src/$1",
        "@routers/(.*)": "<rootDir>/src/routers/$1",
        "@controllers/(.*)": "<rootDir>/src/controllers/$1",
    },
    testPathIgnorePatterns : [
        "<rootDir>/src/__tests__/utils/*"
    ],
    testMatch: [
        "<rootDir>/src/__tests__/*"
    ]
};
