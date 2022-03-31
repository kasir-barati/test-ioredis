import { plainToClass } from 'class-transformer';
import {
    IsEnum,
    IsInt,
    IsOptional,
    IsString,
    validateSync,
} from 'class-validator';

import { NodeEnv } from '../types/web-app.type';

class EnvironmentVariables {
    @IsString()
    REDIS_HOST: string;

    @IsInt()
    REDIS_PORT: number;

    @IsEnum(NodeEnv)
    NODE_ENV: NodeEnv;

    @IsOptional()
    @IsString()
    SA_USERNAME?: string;

    @IsOptional()
    @IsString()
    SA_PASSWORD?: string;

    @IsString()
    APP_HOST: string;

    @IsInt()
    APP_PORT: number;

    @IsInt()
    APP_EXPOSED_PORT: number;

    @IsOptional()
    @IsString()
    SWAGGER_PATH?: string;
}

export function validate(config: Record<string, unknown>) {
    const validatedConfigs = plainToClass(
        EnvironmentVariables,
        config,
        { enableImplicitConversion: true },
    );
    const validatedConfigsErrors = validateSync(validatedConfigs, {
        skipMissingProperties: false,
    });

    if (validatedConfigsErrors.length > 0) {
        console.dir({
            errors: validatedConfigsErrors.map((error) => ({
                value: error.value,
                property: error.property,
                message: Object.values(error.constraints!)[0],
            })),
            message:
                'Application could not load required environment variables',
        });
        throw new Error(validatedConfigsErrors.toString());
    }

    return validatedConfigs;
}
