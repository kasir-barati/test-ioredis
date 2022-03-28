const GLOBAL = 'global:';
const CONFIG = 'config:';
const INDEX = 'index:';

export const cacheKeys = {
    CRON_JOB_NAME: GLOBAL.concat('name:'),
    CRON_JOB_LAST_ACTIVITY: GLOBAL.concat('name:'),
    CRON_JOB_LAST_UPDATE: GLOBAL.concat('name:'),
    GLOBAL_CONF: GLOBAL.concat('name:'),
    INDEX_NAME: INDEX.concat('name:'),
    OTP: 'otp:u-',
    CONF_NAME: CONFIG.concat('conf-name:key-name'),
};

export function sampleKeyGenerator(data: string) {
    return 'name:' + data + ':key';
}
