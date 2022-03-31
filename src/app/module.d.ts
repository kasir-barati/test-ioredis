import { NodeEnv } from './src/shared/types/web-app.type';

namespace NodeJS {
    interface ProcessEnv {
        NODE_ENV: NodeEnv;
        APP_HOST: string;
        APP_PORT: string;
        API_VERSION: string;
    }
}
