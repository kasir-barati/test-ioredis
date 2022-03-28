import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { json } from 'express';
import helmet from 'helmet';

import { AppModule } from './app/app.module';
import {
    AllHttpExceptionsFilter,
    HttpValidationException,
    JsendInterceptor,
} from './shared/jSend';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            validationError: {
                target: true,
                value: true,
            },
            transform: true,
            exceptionFactory: (errors) =>
                new HttpValidationException(errors),
        }),
    );

    const filter = app.get<AllHttpExceptionsFilter>(
        AllHttpExceptionsFilter,
    );
    app.useGlobalFilters(filter);
    app.useGlobalInterceptors(new JsendInterceptor());

    app.setGlobalPrefix('api/v1');
    app.use(json({ limit: '20mb' }));
    app.use(helmet());

    const options = new DocumentBuilder()
        .setTitle('name')
        .setDescription('RESTFull API - Backend of the name website')
        .setVersion('1.0')
        .addBearerAuth({
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
            in: 'header',
        })
        .build();
    const doc = SwaggerModule.createDocument(app, options);

    if (process.env.SWAGGER) {
        SwaggerModule.setup('doc', app, doc);
    }
    app.enableCors({
        origin: process.env.CORS_ORIGIN,
    });
    await app.listen(process.env.SERVER_PORT ?? 9000);
}

bootstrap();
