import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [req, res] = context.getArgs();
    console.log('___Before__', req.host);
    return next
      .handle()
      .pipe(tap((value) => console.log(`Respuesta=>`, value)));
  }
}
