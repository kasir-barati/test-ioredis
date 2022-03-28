import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

import { CacheService } from '@src/packages/cache/service/cache.service';
import { cacheKeys } from '@src/shared/static/cache.key';

@Injectable()
export class AppService implements OnApplicationBootstrap {
    constructor(private cacheService: CacheService) {}

    async onApplicationBootstrap() {
        await this.indexData();
        await this.someCron();
    }

    @Cron(CronExpression.EVERY_5_MINUTES, {
        name: 'partoSession',
    })
    async someCron() {
        const cronLastActivity =
            await this.cacheService.findOne<number>(
                cacheKeys.CRON_JOB_LAST_ACTIVITY,
            );
        const cronLastUpdate =
            await this.cacheService.findOne<number>(
                cacheKeys.CRON_JOB_LAST_UPDATE,
            );

        const now = Math.floor(new Date().getTime() / 1000 / 60);

        if (
            !cronLastActivity ||
            !cronLastUpdate ||
            now - cronLastActivity > 13
        ) {
            // Do Stuff
        }
    }

    async indexData() {
        await this.cacheService.create(
            cacheKeys.CRON_JOB_NAME,
            {
                anything: 1,
            },
            1000000,
        );
        return true;
    }
}
