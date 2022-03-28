import type { Config } from '@jest/types';

import { compilerOptions } from '../tsconfig.json';
import { pathsToModuleNameMapper } from 'ts-jest/utils';

const config: Config.InitialOptions = {
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
    moduleDirectories: ['node_modules', '.'],
    moduleFileExtensions: ['js', 'json', 'ts'],
    rootDir: '.',
    testEnvironment: 'node',
    testRegex: '.e2e-spec.ts$',
    transform: {
        '^.+\\.(t|j)s$': 'ts-jest',
    },
    verbose: true,
};

export default config;
