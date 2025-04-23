import { defineConfig } from 'vitest/config';
import dotenv from 'dotenv-safe';
import path from 'path';

dotenv.config({
    allowEmptyValues: true
});

export default defineConfig({
    test: {
        setupFiles: ['allure-vitest/setup'],
        reporters: [
            'verbose',
            [
                'allure-vitest/reporter',
                {
                    resultsDir: 'allure-results-api-integration'
                }
            ]
        ],
        exclude: [],
        include: ['./tests/api-integration-tests/**/?(*.)+(spec|test).[t]s?(x)'],
        testTimeout: 60000,
        environment: 'node'
    },
    resolve: {
        alias: {
            src: path.resolve(__dirname, './src')
        }
    }
});
