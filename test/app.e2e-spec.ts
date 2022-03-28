import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';

import { AppModule } from '@src/app/app.module';

describe('AppController (e2e)', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleFixture: TestingModule =
            await Test.createTestingModule({
                imports: [AppModule],
            }).compile();

        app = moduleFixture.createNestApplication();
        // app.useLogger(new TestLogger()) // more on this line is below
        await app.init();
    });

    it('call `/api/v*/index` endpoint (GET)', () => {
        return request(app.getHttpServer()).get('/index').expect(200);
    });
});
