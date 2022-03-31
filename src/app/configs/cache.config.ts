import { registerAs } from '@nestjs/config';
import { RedisOptions } from 'ioredis';

export default registerAs(
    'cacheConfig',
    (): RedisOptions => ({
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
    }),
);
