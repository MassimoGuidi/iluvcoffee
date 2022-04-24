/* eslint-disable prettier/prettier */
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { ApiKeyGuard } from './common/guards/api-key.guard';
import { TimeoutInterceptor } from './common/interceptors/timeout.interceptor';
import { WrapResponseInterceptor } from './common/interceptors/wrap-response.interceptor';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
            transformOptions: {
                enableImplicitConversion: true,
            },
        }),
    );
    app.useGlobalFilters(new HttpExceptionFilter());
    app.useGlobalInterceptors(
        new WrapResponseInterceptor(),
        new TimeoutInterceptor()
    );

    //app.useGlobalGuards(new ApiKeyGuard());
    
    const options = new DocumentBuilder()
        .setTitle('ILuvCoffee')
        .setDescription('Coffee app')
        .setVersion('1.0')
        .build();
    const document = SwaggerModule.createDocument(app, options);    
    
    SwaggerModule.setup('api', app, document);

    await app.listen(3000);
}
bootstrap();
