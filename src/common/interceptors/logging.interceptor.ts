import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { Logger } from 'winston'; // 👈 este es el tipo correcto

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly logger: Logger) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const { method, originalUrl } = req;
    const user = req.user;

    const userInfo = user
      ? `userId=${user.userId} email=${user.email ?? 'N/A'}`
      : 'user=anonymous';

    const start = Date.now();

    return next.handle().pipe(
      tap({
        next: () => {
          const duration = Date.now() - start;
          this.logger.info(`[${method}] ${originalUrl} - ${duration}ms`, {
            user: userInfo,
          });
        },
        error: (error) => {
          const duration = Date.now() - start;
          this.logger.error(`[${method}] ${originalUrl} - "${error.message}"`, {
            user: userInfo,
            stack: error.stack,
            context: {
              method,
              url: originalUrl,
              ip: req.ip,
              headers: req.headers,
              query: req.query,
              statusCode: 500,
            },
          });
        },
      }),
    );
  }
}
