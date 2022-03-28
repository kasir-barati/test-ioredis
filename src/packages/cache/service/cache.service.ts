import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { promisify } from 'util';

export var Autocomplete = {};

@Injectable()
export class CacheService {
    private redisClient;

    constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {
        // FIXME: R&D about this section IDK
        this.redisClient = this.cacheManager.store['getClient']();
    }

    async create(
        key: string,
        data: any,
        ttl: number = -1,
    ): Promise<boolean> {
        if (ttl < 0) {
            await this.cacheManager.set(key, data, {
                ttl: 2 * 365 * 24 * 60 * 60,
            });
        } else {
            await this.cacheManager.set(key, data, { ttl: ttl });
        }

        return true;
    }

    async deleteOne(key: string) {
        await this.cacheManager.del(key);
    }

    async deleteBranch(key: string) {
        let keys = promisify(this.redisClient.keys).bind(
            this.redisClient,
        );
        let del = promisify(this.redisClient.del).bind(
            this.redisClient,
        );
        let keysResults = await keys('*'.concat(key).concat('*'));

        if (keysResults && keysResults.length > 0) {
            await del(keysResults);
        }
    }

    async findOne<T>(key: string): Promise<T> {
        return await this.cacheManager.get(key);
    }

    async createIndex(key: string, data: any) {
        await this.redisClient.zadd(key, 1, JSON.stringify(data));
    }

    async searchWithPaginate(
        key: string,
        start: number = 0,
        end: number = 15,
    ) {
        let zrange = promisify(this.redisClient.zrange).bind(
            this.redisClient,
        );
        let result: string[] = await zrange(key, start, end);

        return result.map((item) => {
            return JSON.parse(item);
        });
    }
}
