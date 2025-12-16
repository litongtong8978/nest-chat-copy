import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class WsAuthMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    next();
  }
}
