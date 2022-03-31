import { registerAs } from '@nestjs/config';
import { ThrottlerStorageRedisService } from 'nestjs-throttler-storage-redis';
import {
    ThrottlerModuleOptions,
    ThrottlerOptionsFactory,
} from '@nestjs/throttler';
import { RedisOptions } from 'ioredis';

export default registerAs(
    'throttlerConfig',
    (): ThrottlerOptionsFactory => ({
        createThrottlerOptions: (): ThrottlerModuleOptions => {
            return {
                ttl: 60,
                limit: 10,
                storage: new ThrottlerStorageRedisService({
                    host: process.env.REDIS_HOST,
                    port: process.env.REDIS_PORT,
                    db: 1,
                }),
            };
        },
    }),
);
