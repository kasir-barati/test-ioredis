import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';
import { AppService } from './service/app.service';
import { AppController } from './app.controller';
import { ScheduleModule } from '@nestjs/schedule';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { AllHttpExceptionsFilter } from '../shared/jSend';
import { BullModule } from '@nestjs/bull';
import { ThrottlerModule } from '@nestjs/throttler';
import { ThrottlerStorageRedisService } from 'nestjs-throttler-storage-redis';
import { RedisOptions } from 'ioredis';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        CacheModule.register<RedisOptions>({
            isGlobal: true,
            store: redisStore,
            host: process.env.REDIS_HOST,
            port: +process.env.REDIS_PORT,
        }),
        ThrottlerModule.forRoot({
            ttl: 60,
            limit: 10,
            storage: new ThrottlerStorageRedisService({
                host: process.env.REDIS_HOST,
                port: +process.env.REDIS_PORT,
                db: 1,
            }),
        }),
        ScheduleModule.forRoot(),
        BullModule.forRoot({
            redis: {
                host: process.env.REDIS_HOST,
                port: +process.env.REDIS_PORT,
            },
        }),
        EventEmitterModule.forRoot(),
    ],
    controllers: [AppController],
    providers: [AppService, AllHttpExceptionsFilter],
})
export class AppModule {}
