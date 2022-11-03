/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    preset: 'ts-jest',
    globals: {
        'ts-jest': {
          tsConfig: 'tsconfig.test.json'
        }
    },
    testEnvironment: 'node',
    moduleNameMapper: {
        "@tests/(.*)": "<rootDir>/__tests__/$1",
        "@src/(.*)": "<rootDir>/src/$1",
        "@routers/(.*)": "<rootDir>/src/routers/$1",
        "@models/(.*)": "<rootDir>/src/models/$1",
        "@controllers/(.*)": "<rootDir>/src/controllers/$1",
    },
    testPathIgnorePatterns : [
        "<rootDir>/__tests__/utils/*"
    ],
    testMatch: [
        "<rootDir>/__tests__/*"
    ]
};
