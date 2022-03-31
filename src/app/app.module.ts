import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';
import { AppService } from './service/app.service';
import { AppController } from './app.controller';
import { ScheduleModule } from '@nestjs/schedule';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { AllHttpExceptionsFilter } from '../shared/jSend';
import { BullModule } from '@nestjs/bull';
import { ThrottlerModule } from '@nestjs/throttler';

import { RedisOptions } from 'ioredis';

import { validate } from './validators/env.validator';
import webAppConfig from './configs/web-app.config';
import corsConfig from './configs/cors.config';
import helmetConfig from './configs/helmet.config';
import cacheConfig from './configs/cache.config';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: ['.env'],
            load: [webAppConfig, corsConfig, helmetConfig],
            cache: true,
            validate,
        }),
        CacheModule.registerAsync<RedisOptions>({
            imports: [ConfigModule],
            inject: [ConfigService],
            isGlobal: true,
            useFactory: cacheConfig,
            // store: redisStore,
        }),
        ThrottlerModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: 
        }),
        ScheduleModule.forRoot(),
        BullModule.forRoot({
            redis: {
                host: process.env.REDIS_HOST,
                port: +(process.env as any).REDIS_PORT,
            },
        }),
        EventEmitterModule.forRoot(),
    ],
    controllers: [AppController],
    providers: [AppService, AllHttpExceptionsFilter],
})
export class AppModule {}
