import { Module } from '@nestjs/common';

import { CacheService } from './service/cache.service';

@Module({
    controllers: [],
    exports: [CacheService],
    providers: [CacheService],
})
export class CacheServiceModule {}
