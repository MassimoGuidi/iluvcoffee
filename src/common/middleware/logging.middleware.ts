/* eslint-disable prettier/prettier */
import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
    use(req: any, res: any, next: () => void) {
        console.time('Request-response time');
        console.log('Hi from middle!');

        res.on('finish', () => console.timeEnd('Request-response time'));
        next();
    }
}
